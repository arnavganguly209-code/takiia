import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = { title: "FAQ" };

const faqs = [
  ["What is Takiia?", "A workspace for team messaging, meeting records, calendars, files, and social scheduling."],
  ["Which tools does Takiia bring together?", "Inbox, meeting records, workspace membership, file attachments, and a social publishing queue."],
  ["Can I manage Facebook, Instagram and TikTok from one dashboard?", "Those platforms are modeled. Live publishing needs official credentials and review."],
  ["Does every social platform support automatic publishing?", "No. Each official API has its own rules. Missing credentials are not treated as success."],
  ["Can I create team conversations?", "Yes. Workspaces, roles, and group conversations are implemented."],
  ["How do online meetings work?", "Scheduling and participant records are available. Live media waits on a verified path."],
  ["Are audio and video calling available?", "Not as production calling until TURN or LiveKit is configured and tested."],
  ["What happens when my subscription limit is reached?", "The API rejects the extra action. The UI should offer an upgrade path."],
  ["Can I upgrade or cancel my plan?", "Plan records exist. Checkout stays pending until a payment provider is configured."],
  ["Are WhatsApp Business messages included?", "No. Messaging is native to the workspace."],
  ["How are attachments protected?", "Downloads are authenticated and membership-checked."],
  ["Which payment methods are supported?", "None yet. No payment provider is configured."]
];

export default function FaqPage() {
  return (
    <>
      <PageHero eyebrow="FAQ" title="Questions? We’re here to help." lede="Answers match the current implementation. No invented customer counts." />
      <section className="mx-auto max-w-3xl space-y-3 px-5 pb-24">
        {faqs.map(([q, a]) => (
          <details key={q} className="rounded-2xl border border-line bg-white p-5">
            <summary className="cursor-pointer font-semibold text-navy">{q}</summary>
            <p className="mt-3 text-sm leading-7 text-muted">{a}</p>
          </details>
        ))}
      </section>
    </>
  );
}
