import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SiteChrome } from "@/components/SiteChrome";
import { SiteProvider } from "@/components/SiteProvider";
import { site } from "@/lib/site";
import { readSiteContent } from "@/lib/site-store";
import "./globals.css";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans"
});

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Chat, meet, and manage social media in one workspace`,
    template: `%s · ${site.name}`
  },
  description: site.tagline,
  openGraph: {
    title: site.name,
    description: site.tagline,
    url: site.url,
    siteName: site.name,
    type: "website",
    images: [{ url: "/brand/takiia-hero.jpg" }]
  },
  robots: {
    googleBot: {
      index: true,
      follow: true
    }
  }
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const content = await readSiteContent();
  return (
    <html lang="en">
      <body className={`${sans.variable} font-sans`}>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-brand-500 focus:px-3 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <SiteProvider initial={content}>
          <SiteChrome>{children}</SiteChrome>
        </SiteProvider>
      </body>
    </html>
  );
}
