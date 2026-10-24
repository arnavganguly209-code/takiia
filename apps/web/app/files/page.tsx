import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = { title: "File sharing" };

export default function FilesPage() {
  return (
    <>
      <PageHero
        eyebrow="Files & attachments"
        title="Share the files your team needs."
        lede="Profile photos, chat attachments, and social uploads use type and size checks, authenticated downloads, and storage quotas. End-to-end encryption is not implemented."
      />
      <section className="site-wrap grid gap-5 pb-24 md:grid-cols-2">
        {[
          "Supported images and documents are checked before storage.",
          "Downloads require a signed-in member of the owning workspace.",
          "Private URLs are not public links.",
          "Storage quotas come from the workspace plan and are enforced by the API."
        ].map((text) => (
          <p key={text} className="rounded-3xl border border-line bg-white p-6 leading-7 text-muted">
            {text}
          </p>
        ))}
      </section>
    </>
  );
}
