import { Router } from "express";
import { conversationCreateSchema, messageCreateSchema } from "@takiia/shared";
import { handleZod, sendError } from "../lib/http.js";
import { prisma } from "../lib/prisma.js";
import type { AuthedRequest } from "../middleware/auth.js";
import { requireWorkspaceMember } from "../middleware/auth.js";
import type { Server as SocketServer } from "socket.io";

export function conversationsRouter(io: SocketServer) {
  const router = Router();

  router.get("/workspaces/:workspaceId/conversations", async (req: AuthedRequest, res) => {
    if (!req.user) {
      return sendError(res, 401, "Authentication required");
    }
    const workspaceId = String(req.params.workspaceId);
    const member = await requireWorkspaceMember(req.user.id, workspaceId);
    if (!member) {
      return sendError(res, 403, "Not a member of this workspace");
    }

    const conversations = await prisma.conversation.findMany({
      where: {
        workspaceId,
        members: { some: { userId: req.user.id } }
      },
      include: {
        members: { include: { user: { select: { id: true, displayName: true, email: true } } } },
        messages: { orderBy: { createdAt: "desc" }, take: 1 }
      },
      orderBy: { updatedAt: "desc" }
    });

    return res.json({
      conversations: conversations.map((conversation) => ({
        id: conversation.id,
        kind: conversation.kind,
        title: conversation.title,
        members: conversation.members.map((item) => item.user),
        lastMessage: conversation.messages[0] ?? null
      }))
    });
  });

  router.post("/workspaces/:workspaceId/conversations", async (req: AuthedRequest, res) => {
    if (!req.user) {
      return sendError(res, 401, "Authentication required");
    }
    const workspaceId = String(req.params.workspaceId);
    const member = await requireWorkspaceMember(req.user.id, workspaceId);
    if (!member) {
      return sendError(res, 403, "Not a member of this workspace");
    }

    try {
      const input = conversationCreateSchema.parse(req.body);
      const uniqueIds = Array.from(new Set([req.user.id, ...input.memberIds]));
      const workspaceMembers = await prisma.workspaceMember.findMany({
        where: { workspaceId, userId: { in: uniqueIds } }
      });
      if (workspaceMembers.length !== uniqueIds.length) {
        return sendError(res, 400, "Every participant must belong to the workspace");
      }

      const conversation = await prisma.conversation.create({
        data: {
          workspaceId,
          kind: input.kind,
          title: input.title,
          members: { create: uniqueIds.map((userId) => ({ userId })) }
        }
      });
      return res.status(201).json({ conversation: { id: conversation.id, kind: conversation.kind, title: conversation.title } });
    } catch (error) {
      return handleZod(res, error);
    }
  });

  router.get("/conversations/:conversationId/messages", async (req: AuthedRequest, res) => {
    if (!req.user) {
      return sendError(res, 401, "Authentication required");
    }
    const conversationId = String(req.params.conversationId);
    const membership = await prisma.conversationMember.findUnique({
      where: { conversationId_userId: { conversationId, userId: req.user.id } }
    });
    if (!membership) {
      return sendError(res, 403, "Not a member of this conversation");
    }

    const messages = await prisma.message.findMany({
      where: { conversationId },
      include: { author: { select: { id: true, displayName: true } } },
      orderBy: { createdAt: "asc" },
      take: 200
    });
    await prisma.conversationMember.update({
      where: { id: membership.id },
      data: { lastReadAt: new Date() }
    });
    return res.json({ messages });
  });

  router.post("/conversations/:conversationId/messages", async (req: AuthedRequest, res) => {
    if (!req.user) {
      return sendError(res, 401, "Authentication required");
    }
    const conversationId = String(req.params.conversationId);
    const membership = await prisma.conversationMember.findUnique({
      where: { conversationId_userId: { conversationId, userId: req.user.id } }
    });
    if (!membership) {
      return sendError(res, 403, "Not a member of this conversation");
    }

    try {
      const input = messageCreateSchema.parse(req.body);
      const message = await prisma.message.create({
        data: {
          conversationId,
          authorId: req.user.id,
          body: input.body
        },
        include: { author: { select: { id: true, displayName: true } } }
      });
      await prisma.conversation.update({
        where: { id: conversationId },
        data: { updatedAt: new Date() }
      });
      io.to(`conversation:${conversationId}`).emit("message:new", message);
      return res.status(201).json({ message });
    } catch (error) {
      return handleZod(res, error);
    }
  });

  return router;
}
