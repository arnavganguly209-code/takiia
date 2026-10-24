import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { AdsPreview } from "@/components/home/Previews";

export const metadata: Metadata = {
  title: "Google Ads",
  description:
    "Takiia can review Google Ads campaigns after an official developer token, OAuth client, and customer permission exist. Ad spend stays on Google."
};

export default function AdsPage() {
  return (
    <>
      <PageHero
        eyebrow="Google Ads"
        title="Manage campaigns only after Google authorizes the connection."
        lede="This page describes the intended workspace. Live metrics, budget edits, and campaign launches stay off until the official Google Ads API is configured and tested."
      />
      <section className="site-wrap grid gap-8 pb-24 lg:grid-cols-2">
        <div className="space-y-4 text-sm leading-7 text-muted">
          <p>Required before any account is shown as connected: a Google Cloud OAuth client, a Google Ads developer token, customer access, and server-side token storage.</p>
          <p>Advertising costs are billed through the Google Ads account. They are not included in the Takiia subscription price.</p>
          <p>Takiia will not create, launch, or increase a paid campaign without an explicit customer confirmation on an implemented API operation.</p>
          <Link href="/signup" className="btn-primary mt-4 px-6 py-3">
            Get Started
          </Link>
        </div>
        <AdsPreview />
      </section>
    </>
  );
}
