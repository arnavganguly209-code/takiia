import type { Metadata } from "next";
import { defaultPlanCatalog } from "@takiia/shared";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = { title: "Pricing" };

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title="Plans follow the database, not a brochure."
        lede="The catalog below is the default seed used when the database has no custom prices. Live checkout stays disabled until a payment provider is configured."
      />
      <section className="mx-auto grid max-w-6xl gap-5 px-5 pb-10 md:grid-cols-2 xl:grid-cols-4">
        {Object.entries(defaultPlanCatalog).map(([key, plan]) => (
          <article key={key} className="rounded-3xl border border-white/10 bg-pine-900/50 p-6">
            <h2 className="font-display text-3xl">{plan.name}</h2>
            <p className="mt-3 min-h-16 text-sm text-parchment-100/70">{plan.description}</p>
            <ul className="mt-6 space-y-2 text-sm text-parchment-100/80">
              <li>{plan.limits.members} members</li>
              <li>{plan.limits.socialAccounts} social accounts</li>
              <li>{plan.limits.scheduledPostsPerMonth} queued posts / month</li>
              <li>{plan.limits.storageMb} MB storage</li>
              <li>{plan.limits.meetingsPerMonth} meetings / month</li>
            </ul>
          </article>
        ))}
      </section>
      <p className="mx-auto max-w-6xl px-5 pb-24 text-sm text-parchment-100/55">
        No currency amounts are shown here because billed prices must come from a configured provider and legal entity.
      </p>
    </>
  );
}
