import { Router } from "express";
import { scheduledPostCreateSchema } from "@takiia/shared";
import { featureFlagsFromEnv, type ApiEnv } from "../env.js";
import { handleZod, sendError } from "../lib/http.js";
import { prisma } from "../lib/prisma.js";
import type { AuthedRequest } from "../middleware/auth.js";
import { requireWorkspaceMember } from "../middleware/auth.js";

export function socialRouter(env: ApiEnv) {
  const router = Router();

  router.get("/workspaces/:workspaceId/social", async (req: AuthedRequest, res) => {
    if (!req.user) {
      return sendError(res, 401, "Authentication required");
    }
    const workspaceId = String(req.params.workspaceId);
    const member = await requireWorkspaceMember(req.user.id, workspaceId);
    if (!member) {
      return sendError(res, 403, "Not a member of this workspace");
    }

    const [accounts, posts] = await Promise.all([
      prisma.socialAccount.findMany({ where: { workspaceId } }),
      prisma.scheduledPost.findMany({
        where: { workspaceId },
        orderBy: { scheduledFor: "asc" },
        take: 50
      })
    ]);

    return res.json({
      accounts: accounts.map((account) => ({
        id: account.id,
        provider: account.provider,
        displayLabel: account.displayLabel,
        status: account.status
      })),
      posts,
      publishing: {
        configured: featureFlagsFromEnv(env).socialPublish,
        note: "OAuth connect and live publishing stay disabled until provider credentials and app review are in place."
      }
    });
  });

  router.post("/workspaces/:workspaceId/social/posts", async (req: AuthedRequest, res) => {
    if (!req.user) {
      return sendError(res, 401, "Authentication required");
    }
    const workspaceId = String(req.params.workspaceId);
    const member = await requireWorkspaceMember(req.user.id, workspaceId);
    if (!member) {
      return sendError(res, 403, "Not a member of this workspace");
    }

    try {
      const input = scheduledPostCreateSchema.parse(req.body);
      const post = await prisma.scheduledPost.create({
        data: {
          workspaceId,
          provider: input.provider,
          body: input.body,
          scheduledFor: new Date(input.scheduledFor),
          status: "queued"
        }
      });
      return res.status(201).json({
        post,
        publishing: {
          configured: featureFlagsFromEnv(env).socialPublish,
          note: featureFlagsFromEnv(env).socialPublish
            ? "Queued for the publisher worker."
            : "Saved locally. External publishing is not configured."
        }
      });
    } catch (error) {
      return handleZod(res, error);
    }
  });

  router.post("/workspaces/:workspaceId/social/connect/:provider", async (req: AuthedRequest, res) => {
    if (!req.user) {
      return sendError(res, 401, "Authentication required");
    }
    return res.status(409).json({
      error: "Social OAuth is not configured",
      provider: req.params.provider,
      configured: featureFlagsFromEnv(env).socialPublish
    });
  });

  return router;
}
