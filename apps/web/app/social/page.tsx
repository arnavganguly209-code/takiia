import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = { title: "Social media" };

export default function SocialPage() {
  return (
    <>
      <PageHero
        eyebrow="Social media"
        title="Plan once. Publish across connected channels."
        lede="Composer, calendar, queue, retries, and audit logs are in the product model. Automatic publishing waits on official Facebook, Instagram, and TikTok credentials."
      />
      <section className="mx-auto grid max-w-7xl gap-5 px-5 pb-24 md:grid-cols-2">
        {[
          "Create drafts, upload supported media, and schedule posts.",
          "Queue status, failed-job retry, and idempotency guards live in the API.",
          "Tokens are never collected as platform passwords and are never shown in the browser.",
          "No account is shown as connected unless an authorized connection exists.",
          "Per-plan account and post quotas are enforced on the server.",
          "App review and platform permissions may still be required before live publishing."
        ].map((text) => (
          <p key={text} className="glass rounded-3xl p-6 leading-7 text-muted">
            {text}
          </p>
        ))}
      </section>
    </>
  );
}
