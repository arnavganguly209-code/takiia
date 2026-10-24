import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = { title: "Product" };

const items = [
  ["Messaging", "Direct and group conversations with membership-checked reads and authenticated attachments."],
  ["Workspaces", "Members, roles, and isolated queues per team. Cross-workspace access is denied on the server."],
  ["Meetings", "Calendar records and join attempts. Live media stays gated until TURN or LiveKit is verified."],
  ["Social", "Account and scheduled-post models for Facebook, Instagram, and TikTok. Publishing waits on official OAuth."],
  ["Google Ads", "Workspace area and sample preview only. Live campaigns wait on a developer token, OAuth, and tested API operations. Ad spend stays on Google."],
  ["Files", "Type and size checks, storage quotas, and authenticated downloads."],
  ["Plans", "Quotas stored in PostgreSQL. Proposed list prices are defaults until a payment provider is configured."],
  ["Notifications", "In-app notices for workspace activity. Email delivery stays off without SMTP."],
  ["Audit", "Admin actions write audit events for later review."]
];

export default function FeaturesPage() {
  return (
    <>
      <PageHero
        eyebrow="Product"
        title="What Takiia actually includes."
        lede="Each area below maps to a real API and data model. Provider-backed features stay clearly unconfigured until credentials exist."
      />
      <section className="mx-auto grid max-w-7xl gap-5 px-5 pb-24 md:grid-cols-2">
        {items.map(([title, body]) => (
          <article key={title} className="glass rounded-3xl p-7">
            <h2 className="text-2xl font-semibold text-navy">{title}</h2>
            <p className="mt-3 leading-7 text-muted">{body}</p>
          </article>
        ))}
      </section>
    </>
  );
}
