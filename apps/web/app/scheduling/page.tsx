import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = { title: "Scheduling" };

export default function SchedulingPage() {
  return (
    <>
      <PageHero
        eyebrow="Calendar & scheduling"
        title="Keep meetings, events and content on schedule."
        lede="Meetings, publishing jobs, and team events share one calendar idea. Google, Outlook, or other third-party calendar sync is not configured."
      />
      <section className="site-wrap grid gap-5 pb-24 md:grid-cols-2">
        {[
          "Upcoming meetings and participant limits stay with the workspace.",
          "Scheduled social posts remain drafts or queued until a connected account can accept them.",
          "Date and time are stored with the record. A dedicated timezone engine is not advertised as a separate product.",
          "Reminders use in-app notices. Email delivery waits on SMTP."
        ].map((text) => (
          <p key={text} className="rounded-3xl border border-line bg-white p-6 leading-7 text-muted">
            {text}
          </p>
        ))}
      </section>
    </>
  );
}
