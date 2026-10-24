import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = { title: "Product" };

const items = [
  ["Messaging", "One-to-one and group conversations with membership-checked reads."],
  ["Workspaces", "Members, roles, and isolated queues per team."],
  ["Meetings", "Calendar records and join attempts; media is gated by infrastructure flags."],
  ["Social", "Account and scheduled-post models for Meta and TikTok."],
  ["Plans", "Quotas stored in PostgreSQL, not hardcoded marketing claims."],
  ["Audit", "Admin actions write audit events for later review."]
];

export default function FeaturesPage() {
  return (
    <>
      <PageHero
        eyebrow="Product"
        title="What Takiia actually includes."
        lede="The platform is a workspace, not a bundle of widgets. Each area below maps to a real API and data model."
      />
      <section className="mx-auto grid max-w-6xl gap-5 px-5 pb-24 md:grid-cols-2">
        {items.map(([title, body]) => (
          <article key={title} className="rounded-3xl border border-white/10 bg-pine-900/50 p-7">
            <h2 className="font-display text-3xl">{title}</h2>
            <p className="mt-3 text-parchment-100/70">{body}</p>
          </article>
        ))}
      </section>
    </>
  );
}
