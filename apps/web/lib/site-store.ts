import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { defaultSiteContent, mergeSiteContent, type SiteContent } from "./site-content";

export function siteDataDir() {
  return process.env.TAKIIA_SITE_DATA_DIR || path.join(process.cwd(), "data");
}

export function siteJsonPath() {
  return path.join(siteDataDir(), "site.json");
}

export function siteUploadsDir() {
  return path.join(siteDataDir(), "uploads");
}

export async function readSiteContent(): Promise<SiteContent> {
  try {
    const raw = await readFile(siteJsonPath(), "utf8");
    return mergeSiteContent(defaultSiteContent, JSON.parse(raw) as unknown);
  } catch {
    return structuredClone(defaultSiteContent);
  }
}

export async function writeSiteContent(incoming: unknown) {
  const next = mergeSiteContent(defaultSiteContent, incoming);
  await mkdir(siteDataDir(), { recursive: true });
  await writeFile(siteJsonPath(), `${JSON.stringify(next, null, 2)}\n`, "utf8");
  return next;
}

export function isSafeUploadName(name: string) {
  return /^[a-z0-9]{16}\.(jpg|jpeg|png|webp)$/i.test(name);
}
