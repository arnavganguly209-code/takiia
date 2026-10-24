import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ORBIT_COOKIE, verifyOrbitSession } from "@/lib/orbit-auth";
import { readSiteContent, writeSiteContent } from "@/lib/site-store";

export const dynamic = "force-dynamic";

async function requireOrbit() {
  const jar = await cookies();
  return verifyOrbitSession(jar.get(ORBIT_COOKIE)?.value);
}

export async function GET() {
  if (!(await requireOrbit())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json(await readSiteContent());
}

export async function PUT(request: Request) {
  if (!(await requireOrbit())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await request.json().catch(() => null);
  const next = await writeSiteContent(body);
  return NextResponse.json(next);
}
