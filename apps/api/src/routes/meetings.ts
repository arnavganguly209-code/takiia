import { Router } from "express";
import { meetingCreateSchema } from "@takiia/shared";
import { featureFlagsFromEnv, type ApiEnv } from "../env.js";
import { handleZod, sendError } from "../lib/http.js";
import { prisma } from "../lib/prisma.js";
import type { AuthedRequest } from "../middleware/auth.js";
import { requireWorkspaceMember } from "../middleware/auth.js";

export function meetingsRouter(env: ApiEnv) {
  const router = Router();

  router.get("/workspaces/:workspaceId/meetings", async (req: AuthedRequest, res) => {
    if (!req.user) {
      return sendError(res, 401, "Authentication required");
    }
    const workspaceId = String(req.params.workspaceId);
    const member = await requireWorkspaceMember(req.user.id, workspaceId);
    if (!member) {
      return sendError(res, 403, "Not a member of this workspace");
    }
    const meetings = await prisma.meeting.findMany({
      where: { workspaceId },
      include: { participants: true, callSession: true },
      orderBy: { startsAt: "asc" }
    });
    const flags = featureFlagsFromEnv(env);
    return res.json({
      meetings,
      media: {
        configured: flags.webrtcCalls || flags.livekitMeetings,
        note: "Call media is not started unless TURN or LiveKit credentials are configured and verified."
      }
    });
  });

  router.post("/workspaces/:workspaceId/meetings", async (req: AuthedRequest, res) => {
    if (!req.user) {
      return sendError(res, 401, "Authentication required");
    }
    const workspaceId = String(req.params.workspaceId);
    const member = await requireWorkspaceMember(req.user.id, workspaceId);
    if (!member) {
      return sendError(res, 403, "Not a member of this workspace");
    }
    try {
      const input = meetingCreateSchema.parse(req.body);
      const meeting = await prisma.meeting.create({
        data: {
          workspaceId,
          title: input.title,
          startsAt: new Date(input.startsAt),
          endsAt: input.endsAt ? new Date(input.endsAt) : null,
          participants: { create: { userId: req.user.id } }
        }
      });
      return res.status(201).json({ meeting });
    } catch (error) {
      return handleZod(res, error);
    }
  });

  router.post("/meetings/:meetingId/join", async (req: AuthedRequest, res) => {
    if (!req.user) {
      return sendError(res, 401, "Authentication required");
    }
    const meeting = await prisma.meeting.findUnique({
      where: { id: String(req.params.meetingId) },
      include: { workspace: { include: { members: true } } }
    });
    if (!meeting) {
      return sendError(res, 404, "Meeting not found");
    }
    const allowed = meeting.workspace.members.some((item) => item.userId === req.user?.id);
    if (!allowed) {
      return sendError(res, 403, "Not a member of this workspace");
    }

    await prisma.meetingParticipant.upsert({
      where: { meetingId_userId: { meetingId: meeting.id, userId: req.user.id } },
      update: {},
      create: { meetingId: meeting.id, userId: req.user.id }
    });

    const flags = featureFlagsFromEnv(env);
    if (!flags.webrtcCalls && !flags.livekitMeetings) {
      return res.status(409).json({
        error: "Media infrastructure is not configured",
        meeting: { id: meeting.id, title: meeting.title, status: meeting.status },
        media: { configured: false }
      });
    }

    return res.json({
      meeting: { id: meeting.id, title: meeting.title, status: meeting.status },
      media: { configured: true }
    });
  });

  return router;
}
