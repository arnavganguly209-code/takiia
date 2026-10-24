import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = { title: "FAQ" };

const faqs = [
  ["What is Takiia?", "A workspace for team messaging, meeting records, and social scheduling."],
  ["Can I manage messages and social posts in one dashboard?", "Yes. Those surfaces share the signed-in workspace."],
  ["Which social platforms are supported?", "Facebook, Instagram, and TikTok are modeled. Live publishing needs official credentials."],
  ["Does every platform support automatic publishing?", "No. Each official API has its own rules and review process."],
  ["Can I create teams and group conversations?", "Yes. Workspaces, roles, and group conversations are implemented."],
  ["How do meetings work?", "Scheduling is available. Live media is not claimed until TURN or LiveKit is verified."],
  ["What happens when my plan limit is reached?", "The API rejects the extra action and the UI should offer an upgrade path."],
  ["Can I change or cancel a subscription?", "Plan records exist. Checkout stays pending until a payment provider is configured."],
  ["Are WhatsApp Business messages included?", "No. Messaging is native to the workspace."],
  ["Is audio/video recording included?", "No. Recording is a separately configurable feature and is off."],
  ["How are customer files and social tokens protected?", "Downloads are authenticated. Tokens stay on the server."]
];

export default function FaqPage() {
  return (
    <>
      <PageHero eyebrow="FAQ" title="Direct answers." lede="No invented customer counts. No assumed provider approvals." />
      <section className="mx-auto max-w-3xl space-y-3 px-5 pb-24">
        {faqs.map(([q, a]) => (
          <details key={q} className="glass rounded-2xl p-5">
            <summary className="cursor-pointer font-medium text-navy">{q}</summary>
            <p className="mt-3 text-sm leading-7 text-muted">{a}</p>
          </details>
        ))}
      </section>
    </>
  );
}
