import Link from "next/link";

const pillars = [
  {
    title: "Team messaging",
    body: "Direct and group conversations live in the workspace. Messages persist in PostgreSQL, not a third-party inbox."
  },
  {
    title: "Meetings with honest status",
    body: "Schedule meetings and store participants now. Live media starts only after TURN or LiveKit is configured and verified."
  },
  {
    title: "Social queues",
    body: "Draft and schedule posts against Facebook, Instagram, and TikTok models. Publishing stays queued until OAuth credentials exist."
  }
];

export default function HomePage() {
  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="grid-fade pointer-events-none absolute inset-0" />
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-20 pt-16 lg:grid-cols-[1.1fr_0.9fr] lg:pt-24">
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-brass-400">One workspace. Fewer tabs.</p>
            <h1 className="mt-5 font-display text-5xl leading-[1.05] text-parchment-50 sm:text-7xl">
              Chat, meet, and manage social work without the tool pile.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-parchment-100/75">
              Takiia keeps conversations, meeting records, and publishing queues in one product. Features that need
              outside providers stay clearly unconfigured until credentials are in place.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/signup"
                className="rounded-full bg-copper-500 px-6 py-3 text-sm font-medium text-parchment-50 hover:bg-copper-400"
              >
                Create a workspace
              </Link>
              <Link
                href="/features"
                className="rounded-full border border-white/15 px-6 py-3 text-sm text-parchment-50 hover:border-brass-400"
              >
                See what is built
              </Link>
            </div>
          </div>
          <aside className="rounded-[2rem] border border-white/10 bg-pine-800/80 p-6 shadow-insetcard">
            <p className="text-xs uppercase tracking-[0.24em] text-fern-400">Workspace preview</p>
            <div className="mt-5 space-y-4">
              <PreviewRow label="Inbox" value="Persisted conversations" />
              <PreviewRow label="Meetings" value="Schedule first, media later" />
              <PreviewRow label="Social" value="Queued until providers connect" />
              <PreviewRow label="Billing" value="Plans from the database" />
            </div>
            <p className="mt-6 text-sm text-parchment-100/60">
              This panel describes implemented surfaces. It does not show invented customer data.
            </p>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-20">
        <div className="rule mb-10 h-px" />
        <div className="grid gap-6 md:grid-cols-3">
          {pillars.map((item) => (
            <article key={item.title} className="rounded-3xl border border-white/10 bg-pine-900/60 p-6">
              <h2 className="font-display text-2xl text-parchment-50">{item.title}</h2>
              <p className="mt-3 text-sm leading-7 text-parchment-100/70">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-24">
        <div className="rounded-[2.2rem] bg-parchment-50 px-8 py-12 text-pine-950 md:px-14">
          <p className="text-xs uppercase tracking-[0.24em] text-copper-600">How it works</p>
          <ol className="mt-6 grid gap-6 md:grid-cols-4">
            {[
              "Create an account",
              "Open your workspace",
              "Message the team",
              "Queue social drafts"
            ].map((step, index) => (
              <li key={step}>
                <span className="font-display text-3xl text-copper-500">0{index + 1}</span>
                <p className="mt-2 font-medium">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </div>
  );
}

function PreviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-pine-950/50 px-4 py-3">
      <span className="text-sm text-parchment-100/70">{label}</span>
      <span className="text-sm text-brass-300">{value}</span>
    </div>
  );
}
