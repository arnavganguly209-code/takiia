import { createHmac, timingSafeEqual } from "node:crypto";

export const ORBIT_COOKIE = "takiia_orbit";

export function orbitPasskeyConfigured() {
  return Boolean(process.env.ORBIT_PASSKEY);
}

export function verifyOrbitPasskey(input: string) {
  const expected = process.env.ORBIT_PASSKEY ?? "";
  if (!expected || !input) {
    return false;
  }
  const left = Buffer.from(input);
  const right = Buffer.from(expected);
  if (left.length !== right.length) {
    timingSafeEqual(left, Buffer.alloc(left.length));
    return false;
  }
  return timingSafeEqual(left, right);
}

function sessionSecret() {
  return process.env.ORBIT_SESSION_SECRET || process.env.ORBIT_PASSKEY || "orbit-session-unconfigured";
}

export function signOrbitSession() {
  return createHmac("sha256", sessionSecret()).update("takiia-orbit-v1").digest("hex");
}

export function verifyOrbitSession(token: string | undefined) {
  if (!token || !orbitPasskeyConfigured()) {
    return false;
  }
  const expected = Buffer.from(signOrbitSession());
  const received = Buffer.from(token);
  if (expected.length !== received.length) {
    return false;
  }
  return timingSafeEqual(expected, received);
}

const attempts = new Map<string, { count: number; reset: number }>();

export function orbitLoginAllowed(ip: string) {
  const now = Date.now();
  const row = attempts.get(ip);
  if (!row || row.reset < now) {
    attempts.set(ip, { count: 1, reset: now + 15 * 60 * 1000 });
    return true;
  }
  if (row.count >= 8) {
    return false;
  }
  row.count += 1;
  return true;
}

export function clearOrbitLogin(ip: string) {
  attempts.delete(ip);
}

export function orbitCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12
  };
}
