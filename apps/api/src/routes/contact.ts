import { Router } from "express";
import { contactSchema } from "@takiia/shared";
import { featureFlagsFromEnv, type ApiEnv } from "../env.js";
import { handleZod } from "../lib/http.js";
import { prisma } from "../lib/prisma.js";

export function contactRouter(env: ApiEnv) {
  const router = Router();

  router.post("/", async (req, res) => {
    try {
      const input = contactSchema.parse(req.body);
      const inquiry = await prisma.contactInquiry.create({ data: input });
      return res.status(201).json({
        id: inquiry.id,
        stored: true,
        emailDelivery: featureFlagsFromEnv(env).emailDelivery,
        note: featureFlagsFromEnv(env).emailDelivery
          ? "Stored and queued for email delivery."
          : "Stored in the database. Outbound email is not configured."
      });
    } catch (error) {
      return handleZod(res, error);
    }
  });

  return router;
}
