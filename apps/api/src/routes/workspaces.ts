import { Router } from "express";
import { workspaceCreateSchema } from "@takiia/shared";
import { slugify } from "../lib/crypto.js";
import { handleZod, sendError } from "../lib/http.js";
import { prisma } from "../lib/prisma.js";
import type { AuthedRequest } from "../middleware/auth.js";

export function workspacesRouter() {
  const router = Router();

  router.get("/", async (req: AuthedRequest, res) => {
    if (!req.user) {
      return sendError(res, 401, "Authentication required");
    }
    const memberships = await prisma.workspaceMember.findMany({
      where: { userId: req.user.id },
      include: {
        workspace: {
          include: {
            subscription: { include: { plan: true } },
            _count: { select: { members: true, conversations: true } }
          }
        }
      },
      orderBy: { createdAt: "asc" }
    });
    return res.json({
      workspaces: memberships.map((item) => ({
        id: item.workspace.id,
        name: item.workspace.name,
        slug: item.workspace.slug,
        role: item.role,
        memberCount: item.workspace._count.members,
        conversationCount: item.workspace._count.conversations,
        plan: item.workspace.subscription?.plan
          ? {
              key: item.workspace.subscription.plan.key,
              name: item.workspace.subscription.plan.name,
              status: item.workspace.subscription.status
            }
          : null
      }))
    });
  });

  router.post("/", async (req: AuthedRequest, res) => {
    if (!req.user) {
      return sendError(res, 401, "Authentication required");
    }
    try {
      const input = workspaceCreateSchema.parse(req.body);
      const workspace = await prisma.workspace.create({
        data: {
          name: input.name,
          slug: slugify(input.name),
          members: { create: { userId: req.user.id, role: "owner" } }
        }
      });
      await prisma.auditEvent.create({
        data: {
          workspaceId: workspace.id,
          actorId: req.user.id,
          action: "workspace.created"
        }
      });
      return res.status(201).json({ workspace: { id: workspace.id, name: workspace.name, slug: workspace.slug } });
    } catch (error) {
      return handleZod(res, error);
    }
  });

  return router;
}
