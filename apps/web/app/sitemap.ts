import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

const paths = [
  "/",
  "/features",
  "/messaging",
  "/meetings",
  "/social",
  "/pricing",
  "/security",
  "/privacy",
  "/faq",
  "/contact",
  "/login",
  "/signup"
];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.map((path) => ({
    url: `${site.url}${path}`,
    lastModified: new Date()
  }));
}
