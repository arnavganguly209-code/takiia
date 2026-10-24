import type { Server as HttpServer } from "node:http";
import { Server } from "socket.io";
import type { ApiEnv } from "./env.js";
import { hashToken } from "./lib/crypto.js";
import { prisma } from "./lib/prisma.js";
import { parseCookieHeader } from "./lib/cookies.js";

export function createSocketServer(httpServer: HttpServer, env: ApiEnv) {
  const io = new Server(httpServer, {
    path: "/socket.io/",
    cors: {
      origin: env.WEB_ORIGIN,
      credentials: true
    }
  });

  io.use(async (socket, next) => {
    const cookies = parseCookieHeader(socket.handshake.headers.cookie);
    const token = cookies.takiia_session;
    if (!token) {
      next(new Error("Authentication required"));
      return;
    }
    const session = await prisma.session.findUnique({
      where: { tokenHash: hashToken(token) }
    });
    if (!session || session.expiresAt.getTime() < Date.now()) {
      next(new Error("Session expired"));
      return;
    }
    socket.data.userId = session.userId;
    next();
  });

  io.on("connection", (socket) => {
    socket.join(`user:${socket.data.userId}`);

    socket.on("conversation:join", async (conversationId: string) => {
      if (typeof conversationId !== "string") {
        return;
      }
      const membership = await prisma.conversationMember.findUnique({
        where: {
          conversationId_userId: {
            conversationId,
            userId: socket.data.userId
          }
        }
      });
      if (membership) {
        await socket.join(`conversation:${conversationId}`);
      }
    });
  });

  return io;
}
