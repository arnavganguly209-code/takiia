import { readFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { isSafeUploadName, siteUploadsDir } from "@/lib/site-store";

export const dynamic = "force-dynamic";

const types: Record<string, string> = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp"
};

export async function GET(_request: Request, context: { params: Promise<{ name: string }> }) {
  const { name } = await context.params;
  if (!isSafeUploadName(name)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  try {
    const data = await readFile(path.join(siteUploadsDir(), name));
    const ext = name.split(".").pop()?.toLowerCase() ?? "jpg";
    return new NextResponse(new Uint8Array(data), {
      headers: {
        "Content-Type": types[ext] ?? "application/octet-stream",
        "Cache-Control": "public, max-age=31536000, immutable"
      }
    });
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}
