import type { Metadata } from "next";
import { HomeView, type PlatformService } from "@/components/home/HomeView";
import { apiUrl } from "@/lib/site";
import { readSiteContent } from "@/lib/site-store";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const content = await readSiteContent();
  return {
    title: `${content.brand.name} — Chat, meet, and manage social media in one workspace`,
    description: content.brand.tagline
  };
}

async function loadPlatform(): Promise<PlatformService[]> {
  try {
    const response = await fetch(`${apiUrl}/platform`, { cache: "no-store", signal: AbortSignal.timeout(1500) });
    if (!response.ok) {
      return [];
    }
    const body = (await response.json()) as { services?: PlatformService[] };
    return Array.isArray(body.services) ? body.services : [];
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const [content, services] = await Promise.all([readSiteContent(), loadPlatform()]);
  return <HomeView content={content} services={services} />;
}
