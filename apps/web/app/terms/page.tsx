import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = { title: "Terms of Service" };

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Terms"
        title="Use of the Takiia workspace."
        lede="This page describes the current product boundary. It is not a substitute for counsel and does not invent a registered legal entity."
      />
      <section className="site-wrap max-w-3xl space-y-5 pb-24 leading-8 text-muted">
        <p>Accounts must use a valid email and a password that meets the application rules.</p>
        <p>Workspace data belongs to the workspace that created it. Members cannot read another workspace’s inbox, files, or billing records.</p>
        <p>Social publishing and live calling stay limited to what is configured. The product does not promise third-party approvals.</p>
        <p>Operators should replace this summary with a counsel-reviewed agreement before collecting paying customers.</p>
      </section>
    </>
  );
}
