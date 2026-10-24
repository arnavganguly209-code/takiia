import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ORBIT_COOKIE } from "@/lib/orbit-auth";

export const dynamic = "force-dynamic";

export async function POST() {
  const jar = await cookies();
  jar.delete(ORBIT_COOKIE);
  return NextResponse.json({ ok: true });
}
