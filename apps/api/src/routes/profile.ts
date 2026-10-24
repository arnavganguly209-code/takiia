import { Router } from "express";
import { profileUpdateSchema } from "@takiia/shared";
import { handleZod, publicUser, sendError } from "../lib/http.js";
import { prisma } from "../lib/prisma.js";
import type { AuthedRequest } from "../middleware/auth.js";

export function profileRouter() {
  const router = Router();

  router.patch("/", async (req: AuthedRequest, res) => {
    if (!req.user) {
      return sendError(res, 401, "Authentication required");
    }
    try {
      const input = profileUpdateSchema.parse(req.body);
      const user = await prisma.user.update({
        where: { id: req.user.id },
        data: { displayName: input.displayName }
      });
      return res.json({ user: publicUser(user) });
    } catch (error) {
      return handleZod(res, error);
    }
  });

  return router;
}
