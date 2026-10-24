import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = { title: "Privacy" };

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Privacy"
        title="Your workspace data stays in your database."
        lede="Takiia stores account, message, meeting, and queue records in the isolated PostgreSQL database you provision. This page describes that design, not a legal opinion."
      />
      <section className="mx-auto max-w-3xl space-y-6 px-5 pb-24 leading-8 text-muted">
        <p>
          Registration stores an email, display name, and password hash. Messages and meetings are scoped to the
          workspace you belong to.
        </p>
        <p>
          Social tokens, if later connected, belong in a dedicated server-side field. They are never written to
          application logs or shown in the browser.
        </p>
        <p>Contact inquiries are saved as database rows. Email delivery happens only if SMTP is configured.</p>
        <p>Operators should publish a jurisdiction-specific policy before collecting customer data in production.</p>
      </section>
    </>
  );
}
