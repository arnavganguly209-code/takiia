import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  ORBIT_COOKIE,
  clearOrbitLogin,
  orbitCookieOptions,
  orbitLoginAllowed,
  orbitPasskeyConfigured,
  signOrbitSession,
  verifyOrbitPasskey
} from "@/lib/orbit-auth";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (!orbitLoginAllowed(ip)) {
    return NextResponse.json({ error: "Too many attempts. Try again later." }, { status: 429 });
  }
  if (!orbitPasskeyConfigured()) {
    return NextResponse.json({ error: "Orbit passkey is not configured." }, { status: 503 });
  }
  const body = (await request.json().catch(() => ({}))) as { passkey?: string };
  if (!verifyOrbitPasskey(String(body.passkey ?? ""))) {
    return NextResponse.json({ error: "Passkey was not accepted." }, { status: 401 });
  }
  clearOrbitLogin(ip);
  const jar = await cookies();
  jar.set(ORBIT_COOKIE, signOrbitSession(), orbitCookieOptions());
  return NextResponse.json({ ok: true });
}
