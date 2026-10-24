import type { NextFunction, Request, Response } from "express";
import { createHmac, timingSafeEqual } from "node:crypto";
import type { ApiEnv } from "../env.js";

const CSRF_COOKIE = "takiia_csrf";
const SESSION_COOKIE = "takiia_session";

export { CSRF_COOKIE, SESSION_COOKIE };

export function csrfToken(secret: string, sessionToken: string): string {
  return createHmac("sha256", secret).update(sessionToken).digest("base64url");
}

export function createCsrfGuard(env: ApiEnv) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (["GET", "HEAD", "OPTIONS"].includes(req.method)) {
      return next();
    }
    const cookie = req.cookies?.[CSRF_COOKIE] as string | undefined;
    const header = req.get("x-csrf-token");
    if (!cookie || !header) {
      return res.status(403).json({ error: "CSRF token missing" });
    }
    const left = Buffer.from(cookie);
    const right = Buffer.from(header);
    if (left.length !== right.length || !timingSafeEqual(left, right)) {
      return res.status(403).json({ error: "CSRF token mismatch" });
    }
    return next();
  };
}

export function cookieOptions(env: ApiEnv, extras: { maxAge?: number } = {}) {
  return {
    httpOnly: true as const,
    secure: Boolean(env.COOKIE_SECURE || env.NODE_ENV === "production"),
    sameSite: "lax" as const,
    path: "/",
    domain: env.COOKIE_DOMAIN || undefined,
    ...extras
  };
}

export function attachCsrfCookie(res: Response, env: ApiEnv, sessionToken: string) {
  const token = csrfToken(env.CSRF_SECRET, sessionToken);
  res.cookie(CSRF_COOKIE, token, {
    ...cookieOptions(env),
    httpOnly: false
  });
  return token;
}
