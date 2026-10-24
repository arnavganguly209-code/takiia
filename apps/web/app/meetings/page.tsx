import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = { title: "Meetings" };

export default function MeetingsPage() {
  return (
    <>
      <PageHero
        eyebrow="Meetings"
        title="Schedule first. Media when the path is real."
        lede="You can create meetings, store participants, and attempt a join. Voice and video do not claim success without TURN or LiveKit."
      />
      <section className="mx-auto grid max-w-4xl gap-6 px-5 pb-24">
        <article className="rounded-3xl border border-dashed border-brass-400/40 bg-pine-900/40 p-8">
          <h2 className="font-display text-3xl">Current foundation</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-parchment-100/75">
            <li>Meeting records with start time, status, and workspace scope.</li>
            <li>Join endpoint that records attendance.</li>
            <li>Unconfigured media returns HTTP 409 instead of a fake call.</li>
          </ul>
        </article>
        <article className="rounded-3xl border border-white/10 p-8">
          <h2 className="font-display text-3xl">Not claimed yet</h2>
          <p className="mt-3 text-parchment-100/70">
            Group rooms, screen sharing, and production TURN routing stay behind feature flags until those providers
            are configured and tested on a real network.
          </p>
        </article>
      </section>
    </>
  );
}
