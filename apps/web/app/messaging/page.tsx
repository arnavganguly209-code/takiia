import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = { title: "Messaging" };

export default function MessagingPage() {
  return (
    <>
      <PageHero
        eyebrow="Messaging"
        title="Workspace chat that belongs to you."
        lede="Takiia messaging is built-in. It is not a WhatsApp connector and it does not proxy another chat network."
      />
      <section className="mx-auto max-w-6xl columns-1 gap-5 px-5 pb-24 md:columns-2">
        {[
          "Direct and group conversations scoped to a workspace.",
          "Messages persist with author, timestamps, and membership checks.",
          "Socket.IO rooms exist for live delivery after a session is verified.",
          "Attachments are modeled with size and storage keys; downloads stay authenticated.",
          "Search and presence can be added without inventing delivery guarantees."
        ].map((text) => (
          <p key={text} className="mb-5 break-inside-avoid rounded-3xl border border-white/10 bg-pine-800/40 p-6">
            {text}
          </p>
        ))}
      </section>
    </>
  );
}
