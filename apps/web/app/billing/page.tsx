import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = { title: "Billing & cancellation" };

export default function BillingPage() {
  return (
    <>
      <PageHero
        eyebrow="Billing"
        title="Plans exist. Checkout is not configured."
        lede="Proposed prices and quotas come from the shared plan catalog. A payment provider has not been connected, so charges, refunds, and self-serve cancellation are not available."
      />
      <section className="site-wrap max-w-3xl space-y-5 pb-24 leading-8 text-muted">
        <p>When a quota is reached, the API rejects the extra action. Expired billing does not invent unlimited access.</p>
        <p>Message history is not deleted only because a plan lapses. Deletion follows operator-configured retention once that policy is implemented.</p>
        <p>Until checkout is wired, upgrades and cancellations are operational tasks, not customer self-serve billing events.</p>
      </section>
    </>
  );
}
