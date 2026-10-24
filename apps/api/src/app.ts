import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import type { Server as SocketServer } from "socket.io";
import { webOrigins, type ApiEnv } from "./env.js";
import { createAuthRequired } from "./middleware/auth.js";
import { authLimiter, writeLimiter } from "./middleware/rate-limit.js";
import { createCsrfGuard } from "./middleware/security.js";
import { adsRouter } from "./routes/ads.js";
import { authRouter } from "./routes/auth.js";
import { billingRouter, plansRouter } from "./routes/billing.js";
import { contactRouter } from "./routes/contact.js";
import { conversationsRouter } from "./routes/conversations.js";
import { healthRouter } from "./routes/health.js";
import { meetingsRouter } from "./routes/meetings.js";
import { platformRouter } from "./routes/platform.js";
import { profileRouter } from "./routes/profile.js";
import { socialRouter } from "./routes/social.js";
import { workspacesRouter } from "./routes/workspaces.js";

export function createApp(env: ApiEnv, io: SocketServer) {
  const app = express();
  const authRequired = createAuthRequired();

  app.disable("x-powered-by");
  app.set("trust proxy", 1);
  app.use(
    helmet({
      crossOriginResourcePolicy: { policy: "cross-origin" }
    })
  );
  app.use(
    cors({
      origin: webOrigins(env),
      credentials: true
    })
  );
  app.use(express.json({ limit: "512kb" }));
  app.use(cookieParser());
  app.use(writeLimiter);

  app.use(healthRouter(env));
  app.use(platformRouter(env));
  app.use(adsRouter(env));
  app.use("/auth/register", authLimiter);
  app.use("/auth/login", authLimiter);
  app.use("/auth", authRouter(env));
  app.use("/contact", contactRouter(env));
  app.use(plansRouter(env));

  app.use(createCsrfGuard(env));
  app.use("/profile", authRequired, profileRouter());
  app.use("/workspaces", authRequired, workspacesRouter());
  app.use(authRequired, conversationsRouter(io));
  app.use(authRequired, meetingsRouter(env));
  app.use(authRequired, socialRouter(env));
  app.use(authRequired, billingRouter(env));

  app.use((_req, res) => {
    res.status(404).json({ error: "Not found" });
  });

  app.use((error: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    void error;
    void _next;
    return res.status(500).json({ error: "Internal server error" });
  });

  return app;
}
