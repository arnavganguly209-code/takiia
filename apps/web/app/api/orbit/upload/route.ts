import { randomBytes } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import { cookies } from "next/headers";
import path from "node:path";
import { NextResponse } from "next/server";
import { ORBIT_COOKIE, verifyOrbitSession } from "@/lib/orbit-auth";
import { siteUploadsDir } from "@/lib/site-store";

export const dynamic = "force-dynamic";

const types: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp"
};

export async function POST(request: Request) {
  const jar = await cookies();
  if (!verifyOrbitSession(jar.get(ORBIT_COOKIE)?.value)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Choose an image file." }, { status: 400 });
  }
  const ext = types[file.type];
  if (!ext) {
    return NextResponse.json({ error: "Use a JPG, PNG, or WebP image." }, { status: 400 });
  }
  if (file.size > 8 * 1024 * 1024) {
    return NextResponse.json({ error: "Image must be 8 MB or smaller." }, { status: 400 });
  }
  const name = `${randomBytes(8).toString("hex")}.${ext}`;
  const dir = siteUploadsDir();
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, name), Buffer.from(await file.arrayBuffer()));
  return NextResponse.json({ url: `/api/site-media/${name}` });
}
