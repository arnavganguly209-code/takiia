import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { defaultPlanCatalog } from "@takiia/shared";

const capabilities = ["Messages", "Meetings", "Social Media", "Teams", "Files", "Events", "Notifications", "Scheduling"];

const problems = [
  {
    title: "Too many disconnected tools",
    body: "Chat, meetings, and publishing often live in separate products. Takiia keeps those workflows in one workspace without claiming that every outside service becomes unnecessary."
  },
  {
    title: "Scattered messages and tasks",
    body: "Direct messages, groups, and workspace membership stay in one inbox model, with access checked on the server."
  },
  {
    title: "Social publishing without a unified queue",
    body: "Drafts and schedules can live here. Automatic posting to Facebook, Instagram, or TikTok starts only after official OAuth credentials and platform approval exist."
  }
];

const faqs = [
  ["What is Takiia?", "Takiia is a workspace for team messaging, meeting records, calendars, files, and social scheduling."],
  ["Can I manage messages and social posts in one dashboard?", "Yes. Inbox, meetings, and social queues share the same signed-in workspace."],
  ["Which social platforms are supported?", "The data model includes Facebook, Instagram, and TikTok. Live publishing needs official app credentials and review."],
  ["Does every platform support automatic publishing?", "No. Each platform has its own API rules. Unsupported formats and missing permissions are shown as errors, not silent success."],
  ["Can I create teams and group conversations?", "Yes. Workspaces, roles, and group conversations are implemented in the API."],
  ["How do meetings work?", "You can create and join meeting records. Live audio and video are not claimed as production-ready until TURN or LiveKit is configured and tested."],
  ["What happens when my plan limit is reached?", "The API enforces member, account, post, storage, and meeting quotas. The UI should offer an upgrade path rather than inventing extra capacity."],
  ["Can I change or cancel a subscription?", "Plan records exist. Checkout, renewals, and cancellations stay pending until a payment provider is configured for the business."],
  ["Are WhatsApp Business messages included?", "No. Takiia messaging is its own service. It does not send WhatsApp messages."],
  ["Is audio/video recording included?", "No. Recording is a separately configurable feature and is not enabled."],
  ["How are customer files and social tokens protected?", "Downloads are authenticated and membership-checked. Provider tokens belong on the server and are never shown in the browser."]
];

export function HomeView() {
  return (
    <div>
      <section className="relative overflow-hidden bg-hero">
        <div className="pointer-events-none absolute -left-20 top-10 h-64 w-64 rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="pointer-events-none absolute right-0 top-0 h-72 w-72 rounded-full bg-mint-400/20 blur-3xl" />
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 pb-16 pt-14 lg:grid-cols-[1.05fr_0.95fr] lg:pt-20">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-500">
              One workspace. Better collaboration.
            </p>
            <h1 className="mt-5 text-5xl font-semibold leading-[1.05] text-navy sm:text-6xl">
              Chat, Meet and Manage Social Media — All in One Place.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-muted">
              Bring your conversations, online meetings, team collaboration and social publishing together in one simple
              workspace. Spend less time switching tools and more time getting work done.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/signup" className="btn-primary px-6 py-3">
                Get Started
              </Link>
              <Link href="/features" className="btn-secondary px-6 py-3">
                Explore the Platform
              </Link>
            </div>
            <p className="mt-4 text-sm text-muted">
              One signed-in workspace for inbox, meetings, and publishing queues. No invented customer counts.
            </p>
            <div className="mt-8 grid max-w-xl grid-cols-2 gap-3 text-sm">
              {["Team Messaging", "Online Meetings", "Social Publishing", "Shared Workspaces"].map((item) => (
                <div key={item} className="glass rounded-2xl px-4 py-3 font-medium text-navy">
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-cyan-400/20 via-transparent to-mint-400/20 blur-2xl" />
            <div className="glass relative overflow-hidden rounded-[2rem] p-3">
              <Image
                src="/brand/takiia-hero.jpg"
                alt="Takiia workspace preview across desktop and mobile"
                width={1600}
                height={1000}
                priority
                quality={95}
                className="h-auto w-full rounded-[1.5rem] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap gap-3 px-5 py-6">
          {capabilities.map((item) => (
            <span key={item} className="rounded-full border border-line bg-mist px-4 py-2 text-sm text-navy">
              {item}
            </span>
          ))}
        </div>
      </section>

      <Section
        id="problem"
        eyebrow="The problem"
        title="Everything Your Team Needs, Without the Constant Switching."
        copy="Separate chat, meeting, and publishing tools create extra tabs and extra context. Takiia brings the supported workflows into one dashboard. External platforms can still be required for publishing or live media."
      >
        <div className="grid gap-5 md:grid-cols-3">
          {problems.map((item) => (
            <article key={item.title} className="glass rounded-3xl p-6">
              <h3 className="text-xl font-semibold text-navy">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted">{item.body}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section
        id="messaging"
        tone="mist"
        eyebrow="Messaging"
        title="Conversations That Keep Work Moving."
        copy="Takiia messaging is its own service. It is not WhatsApp and does not send WhatsApp Business messages."
      >
        <div className="grid gap-8 lg:grid-cols-2">
          <ul className="space-y-3 text-sm leading-7 text-muted">
            {[
              "One-to-one direct messages and group conversations",
              "Workspace-scoped history with pagination",
              "Read and unread state with unread counts",
              "Timestamps, replies, and conversation context",
              "Authenticated image and document attachments",
              "Search, filtering, block and report controls",
              "In-app notifications and responsive layouts",
              "Presence and typing indicators where the live socket session is connected"
            ].map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="glass rounded-3xl p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-500">Demo preview</p>
            <div className="mt-4 space-y-3">
              <ChatBubble name="Asha" text="The campaign draft is in the social queue." />
              <ChatBubble name="Rohit" text="I moved the client review to Thursday 10:00." align="end" />
              <ChatBubble name="Asha" text="Perfect. I will keep the inbox thread with the brief." />
            </div>
            <p className="mt-4 text-xs text-muted">Sample names for the public preview only. Signed-in inboxes load real workspace data.</p>
          </div>
        </div>
      </Section>

      <Section
        id="meetings"
        eyebrow="Meetings"
        title="Bring Everyone Together, Wherever They Work."
        copy="Meeting records, invites, and join links are in the product. Live audio and video need ICE, TURN or LiveKit, and a verified network path before they are treated as production calling."
      >
        <div className="grid gap-6 md:grid-cols-2">
          <article className="glass rounded-3xl p-6">
            <h3 className="font-semibold text-navy">Available now</h3>
            <p className="mt-3 text-sm leading-7 text-muted">
              Create meetings, store participants, apply plan participant limits, and keep calendar events next to the
              workspace inbox.
            </p>
          </article>
          <article className="glass rounded-3xl p-6">
            <h3 className="font-semibold text-navy">Planned until infrastructure is verified</h3>
            <p className="mt-3 text-sm leading-7 text-muted">
              Mute, camera, screen share, device selection, and recording stay marked planned. Recording is a separate
              configurable feature and is off.
            </p>
          </article>
        </div>
      </Section>

      <Section
        id="social"
        tone="mist"
        eyebrow="Social publishing"
        title="Plan Once. Publish Across Your Connected Channels."
        copy="Composer, calendar, queue, retries, and audit logs are part of the product model. Facebook, Instagram, and TikTok publishing wait on official OAuth, token storage, and platform review."
      >
        <div className="grid gap-4 md:grid-cols-3">
          {["Calendar and queue", "Composer and previews", "Status, retry, and audit"].map((title) => (
            <article key={title} className="glass rounded-3xl p-6">
              <h3 className="font-semibold text-navy">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted">
                Posts stay in draft or queued states until a connected account with valid permissions can accept them.
              </p>
            </article>
          ))}
        </div>
      </Section>

      <Section
        id="teams"
        eyebrow="Teams"
        title="Your Team, Your Workspace, One Clear Workflow."
        copy="Owners, admins, and members stay isolated by workspace. A user cannot read another workspace’s conversations, files, connected accounts, or billing records."
      >
        <div className="glass rounded-3xl p-6 text-sm leading-7 text-muted">
          Invite members, assign roles, share channels, and keep files behind membership checks. Admin actions write
          audit events.
        </div>
      </Section>

      <Section
        id="schedule"
        tone="mist"
        eyebrow="Scheduling"
        title="Keep Meetings, Events and Content on Schedule."
        copy="Meetings, publishing jobs, and team events share one calendar idea. External calendar sync is not shown as active because it is not configured."
      />

      <Section
        id="files"
        eyebrow="Files"
        title="Share the Files Your Team Needs."
        copy="Profile photos, chat attachments, and social media uploads use type and size checks, authenticated downloads, and storage quotas. Private URLs are not public links."
      />

      <Section
        id="dashboard"
        tone="mist"
        eyebrow="Dashboard"
        title="One Dashboard. A Clearer View of Everything."
        copy="The public preview below is labelled demo data. The signed-in dashboard loads the current user’s authorized records only."
      >
        <div className="grid gap-4 md:grid-cols-3">
          {[
            ["Inbox", "Unread threads from the selected workspace"],
            ["Meetings", "Upcoming records, media gated"],
            ["Social queue", "Drafts until providers connect"]
          ].map(([title, body]) => (
            <article key={title} className="glass rounded-3xl p-6">
              <h3 className="font-semibold text-navy">{title}</h3>
              <p className="mt-2 text-sm text-muted">{body}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section eyebrow="How it works" title="Four clear steps.">
        <ol className="grid gap-4 md:grid-cols-4">
          {[
            "Create your account",
            "Set up your team and workspace",
            "Connect supported social accounts when credentials exist",
            "Start messaging, scheduling, and collaborating"
          ].map((step, index) => (
            <li key={step} className="glass rounded-3xl p-5">
              <span className="text-2xl font-semibold text-brand-500">0{index + 1}</span>
              <p className="mt-3 font-medium text-navy">{step}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section
        tone="mist"
        eyebrow="Integrations"
        title="Connect the Platforms You Already Use."
        copy="Facebook, Instagram, and TikTok are modeled. None are shown as connected unless an authorized account exists."
      >
        <div className="grid gap-4 md:grid-cols-3">
          {[
            ["Facebook", "Requires credentials or approval"],
            ["Instagram", "Requires credentials or approval"],
            ["TikTok", "Requires credentials or approval"]
          ].map(([name, state]) => (
            <article key={name} className="glass rounded-3xl p-6">
              <h3 className="font-semibold text-navy">{name}</h3>
              <p className="mt-2 text-sm text-muted">{state}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section
        id="pricing"
        eyebrow="Pricing"
        title="A Plan That Fits the Way You Work."
        copy="Amounts below are proposed commercial defaults. Live billed prices, yearly discounts, and entitlements come from the database-backed plan records. Checkout stays unconfigured until a payment provider is wired."
      >
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {Object.entries(defaultPlanCatalog).map(([key, plan]) => (
            <article
              key={key}
              className={`rounded-3xl border p-6 ${key === "pro" ? "border-brand-500 bg-pale shadow-glass" : "glass"}`}
            >
              <h3 className="text-xl font-semibold text-navy">{plan.name}</h3>
              <p className="mt-2 text-3xl font-semibold text-navy">
                ${plan.proposedMonthlyUsd}
                <span className="text-sm font-medium text-muted"> / month</span>
              </p>
              <p className="mt-3 text-sm text-muted">{plan.description}</p>
              <ul className="mt-5 space-y-2 text-sm text-muted">
                <li>{plan.limits.members} members</li>
                <li>{plan.limits.socialAccounts} social accounts</li>
                <li>{plan.limits.scheduledPostsPerMonth} scheduled posts / month</li>
                <li>{plan.limits.storageMb} MB storage</li>
                <li>{plan.limits.meetingsPerMonth} meetings / month</li>
              </ul>
            </article>
          ))}
        </div>
        <p className="mt-6 text-sm text-muted">
          When a quota is reached, the API rejects the extra action. Expired or failed billing does not invent unlimited
          access. Message history is not deleted just because a plan lapses.
        </p>
      </Section>

      <Section
        tone="mist"
        eyebrow="Trust"
        title="Security and workspace privacy."
        copy="No invented testimonials, ratings, or customer logos. Access control, CSRF-protected sessions, and membership checks are part of the product."
      />

      <Section eyebrow="FAQ" title="Practical questions.">
        <div className="space-y-3">
          {faqs.map(([q, a]) => (
            <details key={q} className="glass rounded-2xl p-5">
              <summary className="cursor-pointer font-medium text-navy">{q}</summary>
              <p className="mt-3 text-sm leading-7 text-muted">{a}</p>
            </details>
          ))}
        </div>
      </Section>

      <section className="px-5 pb-20">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-navy px-8 py-14 text-white md:px-14">
          <h2 className="text-4xl font-semibold">Bring Your Conversations and Workflows Together.</h2>
          <p className="mt-4 max-w-2xl text-white/80">
            Start with the tools your team needs and grow with a plan that fits your workflow.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/signup" className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-navy">
              Get Started
            </Link>
            <Link href="/pricing" className="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold">
              View Pricing
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function Section({
  id,
  eyebrow,
  title,
  copy,
  children,
  tone = "paper"
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  copy?: string;
  children?: ReactNode;
  tone?: "paper" | "mist";
}) {
  return (
    <section id={id} className={tone === "mist" ? "bg-mist" : "bg-paper"}>
      <div className="mx-auto max-w-7xl px-5 py-16">
        {eyebrow ? <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-500">{eyebrow}</p> : null}
        <h2 className="mt-3 max-w-3xl text-3xl font-semibold text-navy sm:text-4xl">{title}</h2>
        {copy ? <p className="mt-4 max-w-3xl text-base leading-8 text-muted">{copy}</p> : null}
        {children ? <div className="mt-8">{children}</div> : null}
      </div>
    </section>
  );
}

function ChatBubble({ name, text, align }: { name: string; text: string; align?: "end" }) {
  return (
    <div className={align === "end" ? "ml-8 rounded-2xl bg-brand-500 px-4 py-3 text-white" : "mr-8 rounded-2xl bg-pale px-4 py-3"}>
      <p className="text-xs font-semibold">{name}</p>
      <p className="mt-1 text-sm">{text}</p>
    </div>
  );
}
