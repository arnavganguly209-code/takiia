import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = { title: "Meetings" };

export default function MeetingsPage() {
  return (
    <>
      <PageHero
        eyebrow="Meetings"
        title="Bring everyone together, wherever they work."
        lede="Scheduling, participants, and join records are implemented. Production WebRTC calling is not claimed until TURN or LiveKit is configured and tested."
      />
      <section className="mx-auto grid max-w-7xl gap-5 px-5 pb-24 md:grid-cols-2">
        {[
          ["Available", "Create meetings, invite participants, apply plan limits, and keep events on the workspace calendar."],
          ["Planned", "Mute, camera, screen share, device selection, and group media routing wait on a verified media path."],
          ["Recording", "Recording and transcription are separate configurable features and are off."],
          ["Honesty", "A join button that cannot complete media setup is treated as incomplete, not as a live Zoom replacement."]
        ].map(([title, body]) => (
          <article key={title} className="glass rounded-3xl p-6">
            <h2 className="text-xl font-semibold text-navy">{title}</h2>
            <p className="mt-3 leading-7 text-muted">{body}</p>
          </article>
        ))}
      </section>
    </>
  );
}
