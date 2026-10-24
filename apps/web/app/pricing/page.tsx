import type { Metadata } from "next";
import { defaultPlanCatalog } from "@takiia/shared";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = { title: "Pricing" };

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title="A plan that fits the way you work."
        lede="Monthly amounts are proposed commercial defaults. Live prices, yearly discounts, and entitlements come from database-backed plans. Checkout stays disabled until a payment provider is configured."
      />
      <section className="mx-auto grid max-w-7xl gap-5 px-5 pb-10 md:grid-cols-2 xl:grid-cols-4">
        {Object.entries(defaultPlanCatalog).map(([key, plan]) => (
          <article
            key={key}
            className={`rounded-3xl border p-6 ${key === "pro" ? "border-brand-500 bg-pale shadow-glass" : "glass"}`}
          >
            <h2 className="text-2xl font-semibold text-navy">{plan.name}</h2>
            <p className="mt-3 text-3xl font-semibold text-navy">
              ${plan.proposedMonthlyUsd}
              <span className="text-sm font-medium text-muted"> / month</span>
            </p>
            <p className="mt-3 min-h-16 text-sm text-muted">{plan.description}</p>
            <ul className="mt-6 space-y-2 text-sm text-muted">
              <li>{plan.limits.members} members</li>
              <li>{plan.limits.socialAccounts} social accounts</li>
              <li>{plan.limits.scheduledPostsPerMonth} queued posts / month</li>
              <li>{plan.limits.storageMb} MB storage</li>
              <li>{plan.limits.meetingsPerMonth} meetings / month</li>
            </ul>
          </article>
        ))}
      </section>
      <p className="mx-auto max-w-7xl px-5 pb-24 text-sm text-muted">
        Quota enforcement happens on the server. A browser button cannot mark a subscription paid.
      </p>
    </>
  );
}
