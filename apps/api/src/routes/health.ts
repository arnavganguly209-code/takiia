import { Router } from "express";
import { featureFlagsFromEnv, type ApiEnv } from "../env.js";
import { prisma } from "../lib/prisma.js";

export function healthRouter(env: ApiEnv) {
  const router = Router();

  router.get("/health", (_req, res) => {
    res.json({
      status: "ok",
      service: "takiia-api",
      time: new Date().toISOString()
    });
  });

  router.get("/ready", async (_req, res) => {
    try {
      await prisma.$queryRaw`SELECT 1`;
      res.json({
        status: "ready",
        database: "up",
        time: new Date().toISOString()
      });
    } catch {
      res.status(503).json({
        status: "not_ready",
        database: "down",
        time: new Date().toISOString()
      });
    }
  });

  router.get("/features", (_req, res) => {
    res.json({ features: featureFlagsFromEnv(env) });
  });

  return router;
}
