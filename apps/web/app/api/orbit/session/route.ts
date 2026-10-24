import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ORBIT_COOKIE, verifyOrbitSession } from "@/lib/orbit-auth";

export const dynamic = "force-dynamic";

export async function GET() {
  const jar = await cookies();
  const ok = verifyOrbitSession(jar.get(ORBIT_COOKIE)?.value);
  return NextResponse.json({ ok });
}
