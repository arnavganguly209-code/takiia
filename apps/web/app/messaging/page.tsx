import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = { title: "Messaging" };

export default function MessagingPage() {
  return (
    <>
      <PageHero
        eyebrow="Messaging"
        title="Conversations that keep work moving."
        lede="Takiia messaging is built-in. It is not a WhatsApp connector and it does not send WhatsApp Business messages."
      />
      <section className="mx-auto grid max-w-7xl gap-5 px-5 pb-24 md:grid-cols-2">
        {[
          "One-to-one and group conversations scoped to a workspace.",
          "History, pagination, timestamps, and membership-checked reads.",
          "Unread counts and conversation filtering.",
          "Authenticated attachments with type and size checks.",
          "Block, report, and in-app notifications.",
          "Socket.IO rooms deliver live messages only after a verified session.",
          "Presence and typing indicators depend on an active socket connection.",
          "Responsive desktop and mobile inbox layouts."
        ].map((text) => (
          <p key={text} className="glass rounded-3xl p-6 leading-7 text-muted">
            {text}
          </p>
        ))}
      </section>
    </>
  );
}
