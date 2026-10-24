import { Router } from "express";
import { defaultPlanCatalog } from "@takiia/shared";
import { featureFlagsFromEnv, type ApiEnv } from "../env.js";
import { sendError } from "../lib/http.js";
import { prisma } from "../lib/prisma.js";
import type { AuthedRequest } from "../middleware/auth.js";
import { requireWorkspaceMember } from "../middleware/auth.js";

export function plansRouter(env: ApiEnv) {
  const router = Router();

  router.get("/plans", async (_req, res) => {
    try {
      const stored = await prisma.plan.findMany({ orderBy: { membersLimit: "asc" } });
      return res.json({
        plans: stored.length
          ? stored
          : Object.entries(defaultPlanCatalog).map(([key, plan]) => ({
              key,
              name: plan.name,
              description: plan.description,
              membersLimit: plan.limits.members,
              socialAccountsLimit: plan.limits.socialAccounts,
              scheduledPostsPerMonth: plan.limits.scheduledPostsPerMonth,
              storageMb: plan.limits.storageMb,
              meetingsPerMonth: plan.limits.meetingsPerMonth,
              proposedMonthlyUsd: plan.proposedMonthlyUsd,
              source: "catalog-fallback"
            })),
        payments: {
          configured: featureFlagsFromEnv(env).payments,
          note: "Checkout is unavailable until a payment provider is configured and tested."
        }
      });
    } catch {
      return res.json({
        plans: Object.entries(defaultPlanCatalog).map(([key, plan]) => ({
          key,
          name: plan.name,
          description: plan.description,
          membersLimit: plan.limits.members,
          socialAccountsLimit: plan.limits.socialAccounts,
          scheduledPostsPerMonth: plan.limits.scheduledPostsPerMonth,
          storageMb: plan.limits.storageMb,
          meetingsPerMonth: plan.limits.meetingsPerMonth,
          proposedMonthlyUsd: plan.proposedMonthlyUsd,
          source: "catalog-fallback"
        })),
        payments: {
          configured: featureFlagsFromEnv(env).payments,
          note: "Plan catalog served from code because the database is not reachable."
        }
      });
    }
  });

  return router;
}

export function billingRouter(env: ApiEnv) {
  const router = Router();

  router.post("/workspaces/:workspaceId/billing/checkout", async (req: AuthedRequest, res) => {
    if (!req.user) {
      return sendError(res, 401, "Authentication required");
    }
    const member = await requireWorkspaceMember(req.user.id, String(req.params.workspaceId), [
      "owner",
      "admin"
    ]);
    if (!member) {
      return sendError(res, 403, "Billing is limited to workspace owners and admins");
    }
    if (!featureFlagsFromEnv(env).payments) {
      return res.status(409).json({
        error: "Payments are not configured",
        configured: false
      });
    }
    return res.status(501).json({
      error: "Checkout session creation is reserved for a configured payment provider"
    });
  });

  return router;
}
