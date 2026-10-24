import type { NextFunction, Request, Response } from "express";
import type { ApiEnv } from "../env.js";
import { hashToken } from "../lib/crypto.js";
import { prisma } from "../lib/prisma.js";
import { sendError } from "../lib/http.js";
import { SESSION_COOKIE } from "./security.js";

export type AuthedRequest = Request & {
  user?: {
    id: string;
    email: string;
    displayName: string;
    createdAt: Date;
  };
  sessionToken?: string;
};

export function createAuthRequired() {
  return async (req: AuthedRequest, res: Response, next: NextFunction) => {
    const token = req.cookies?.[SESSION_COOKIE] as string | undefined;
    if (!token) {
      return sendError(res, 401, "Authentication required");
    }

    const session = await prisma.session.findUnique({
      where: { tokenHash: hashToken(token) },
      include: { user: true }
    });

    if (!session || session.expiresAt.getTime() < Date.now()) {
      return sendError(res, 401, "Session expired");
    }

    req.user = session.user;
    req.sessionToken = token;
    return next();
  };
}

export async function requireWorkspaceMember(
  userId: string,
  workspaceId: string,
  roles?: Array<"owner" | "admin" | "member">
) {
  const member = await prisma.workspaceMember.findUnique({
    where: { workspaceId_userId: { workspaceId, userId } }
  });
  if (!member) {
    return null;
  }
  if (roles && !roles.includes(member.role)) {
    return null;
  }
  return member;
}

export function optionalEnv(_env: ApiEnv) {
  return _env;
}
