import type { Metadata } from "next";
import { HomeView } from "@/components/home/HomeView";
import { readSiteContent } from "@/lib/site-store";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const content = await readSiteContent();
  return {
    title: `${content.brand.name} — Chat, meet, and manage social media in one workspace`,
    description: content.brand.tagline
  };
}

export default async function HomePage() {
  const content = await readSiteContent();
  return <HomeView content={content} />;
}
