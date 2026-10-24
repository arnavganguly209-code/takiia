import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = { title: "FAQ" };

const faqs = [
  ["What is Takiia?", "A workspace for team messaging, meeting records, and social scheduling."],
  ["Does it send WhatsApp messages?", "No. Messaging is native to the workspace."],
  ["Can I publish to Instagram today?", "Only after Meta credentials and app review are configured. Until then posts queue locally."],
  ["Are video meetings production-ready?", "Scheduling is. Media is not claimed until TURN or LiveKit is verified."],
  ["How do payments work?", "Plan records exist. Checkout returns unconfigured until a provider is wired and tested."],
  ["Where does data live?", "In the Takiia PostgreSQL database. Local development must use a separate database."]
];

export default function FaqPage() {
  return (
    <>
      <PageHero eyebrow="FAQ" title="Direct answers." lede="No invented customer counts. No assumed provider approvals." />
      <section className="mx-auto max-w-3xl space-y-4 px-5 pb-24">
        {faqs.map(([q, a]) => (
          <details key={q} className="rounded-2xl border border-white/10 bg-pine-900/40 p-5">
            <summary className="cursor-pointer font-medium">{q}</summary>
            <p className="mt-3 text-sm leading-7 text-parchment-100/70">{a}</p>
          </details>
        ))}
      </section>
    </>
  );
}
