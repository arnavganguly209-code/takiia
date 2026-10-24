import type { Response } from "express";
import { ZodError } from "zod";

export function sendError(res: Response, status: number, message: string, details?: unknown) {
  return res.status(status).json({ error: message, details: details ?? null });
}

export function handleZod(res: Response, error: unknown) {
  if (error instanceof ZodError) {
    return sendError(
      res,
      400,
      "Validation failed",
      error.issues.map((issue) => ({ path: issue.path.join("."), message: issue.message }))
    );
  }
  return sendError(res, 400, "Invalid request");
}

export function publicUser(user: { id: string; email: string; displayName: string; createdAt: Date }) {
  return {
    id: user.id,
    email: user.email,
    displayName: user.displayName,
    createdAt: user.createdAt.toISOString()
  };
}
