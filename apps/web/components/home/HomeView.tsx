import Link from "next/link";
import { defaultPlanCatalog } from "@takiia/shared";
import { FeatureCards } from "./FeatureCards";
import { HomeHero } from "./HomeHero";
import {
  CalendarPreview,
  FilesPreview,
  MeetingPreview,
  MessagingPreview,
  SecurityPreview,
  SocialPreview,
  TeamPreview,
  WorkflowPreview,
  WorkspacePreview
} from "./Previews";
import { LineIcon, Section } from "./Section";

const capabilities = [
  { label: "Messages", href: "#messaging", d: "M5 8h10M5 12h6M7 17l-2 3 4-2h7a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7a3 3 0 0 0-3 3v7a3 3 0 0 0 3 3z" },
  { label: "Meetings", href: "#meetings", d: "M15 10l4-2v8l-4-2M5 8h10v8H5z" },
  { label: "Social Media", href: "#social", d: "M8 12h8M12 8v8M7 5h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z" },
  { label: "Teams", href: "#teams", d: "M12 12a3 3 0 1 0-3-3 3 3 0 0 0 3 3zm-7 8a5 5 0 0 1 10 0" },
  { label: "Files", href: "#files", d: "M7 4h7l4 4v12H7zM14 4v4h4" },
  { label: "Events", href: "#schedule", d: "M7 4v3M17 4v3M5 9h14M6 6h12a2 2 0 0 1 2 2v11H4V8a2 2 0 0 1 2-2z" },
  { label: "Notifications", href: "#workflow", d: "M12 6a5 5 0 0 1 5 5v4l2 2H5l2-2v-4a5 5 0 0 1 5-5zM10 20h4" },
  { label: "Scheduling", href: "#schedule", d: "M7 4v3M17 4v3M5 10h14M8 14h3M8 18h8" }
];

const faqs = [
  ["What is Takiia?", "Takiia is a workspace for team messaging, meeting records, calendars, files, and social scheduling."],
  ["Which tools does Takiia bring together?", "Inbox, meeting records, workspace membership, file attachments, and a social publishing queue share one signed-in workspace."],
  ["Can I manage Facebook, Instagram and TikTok from one dashboard?", "Those platforms are modeled in the product. Live publishing needs official OAuth credentials, token storage, and platform review."],
  ["Does every social platform support automatic publishing?", "No. Each official API has its own account, media, and permission rules. Missing credentials are shown as unconfigured, not as a successful post."],
  ["Can I create team conversations?", "Yes. Direct messages, group conversations, roles, and workspace isolation are implemented in the API."],
  ["How do online meetings work?", "You can create meetings, store participants, and keep events on the workspace calendar. Plan participant limits are enforced."],
  ["Are audio and video calling available?", "Join records exist. Live audio and video are not treated as production calling until ICE, TURN or LiveKit, and a verified network path are configured and tested."],
  ["What happens when my subscription limit is reached?", "The API rejects the extra member, post, file, or meeting. The UI should offer an upgrade path rather than inventing capacity."],
  ["Can I upgrade or cancel my plan?", "Plan records exist. Checkout, renewals, and cancellations stay pending until a payment provider is configured."],
  ["Are WhatsApp Business messages included?", "No. Takiia messaging is its own service and does not send WhatsApp messages."],
  ["How are attachments protected?", "Uploads use type and size checks. Downloads are authenticated and membership-checked. They are not public links."],
  ["Which payment methods are supported?", "No payment provider is configured yet, so card, wallet, or invoice checkout is not offered."]
];

export function HomeView() {
  return (
    <div>
      <HomeHero />

      <section className="border-y border-line bg-white">
        <div className="site-wrap grid grid-cols-2 gap-3 py-6 sm:grid-cols-4 lg:grid-cols-8">
          {capabilities.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="flex flex-col items-center gap-2 rounded-2xl border border-line bg-mist/70 px-2 py-4 text-center text-[12px] font-bold text-navy transition hover:border-brand-500/30 hover:bg-white"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-brand-500 shadow-soft">
                <LineIcon d={item.d} />
              </span>
              {item.label}
            </Link>
          ))}
        </div>
      </section>

      <Section
        id="why"
        eyebrow="Why Takiia"
        title="Everything Your Team Needs, Without the Constant Switching."
        copy="Bring conversations, meetings, social publishing and team collaboration into one organized workspace."
      >
        <div className="grid gap-5 md:grid-cols-3">
          {[
            {
              n: "01",
              title: "Too Many Tools",
              body: "Chat, meetings, and publishing often live in separate products. Switching tabs adds context you have to rebuild every time.",
              surface: "bg-pale"
            },
            {
              n: "02",
              title: "Scattered Work",
              body: "Messages, drafts, and schedules fragment across inboxes. Takiia keeps those records in one workspace membership model.",
              surface: "bg-white"
            },
            {
              n: "03",
              title: "Limited Visibility",
              body: "A centralized view of conversations, meetings, and publishing status is useful only when it reads authorized workspace data.",
              surface: "bg-mintsoft"
            }
          ].map((item) => (
            <article key={item.title} className={`card-hover rounded-[1.6rem] border border-line p-7 ${item.surface}`}>
              <p className="text-sm font-bold text-transparent bg-gradient-to-r from-cyan-400 to-mint-400 bg-clip-text">{item.n}</p>
              <h3 className="mt-3 text-xl font-bold text-navy">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted">{item.body}</p>
            </article>
          ))}
        </div>
        <p className="mt-8 text-sm leading-7 text-muted">
          Takiia is one signed-in workspace. It does not replace every outside service, and it does not invent time-saved
          claims.
        </p>
      </Section>

      <Section
        id="workspace"
        tone="mist"
        eyebrow="One connected workspace"
        title="One Clear View of Your Team’s Work."
        copy="See conversations, upcoming meetings, scheduled posts and team activity in one organized workspace."
      >
        <WorkspacePreview />
      </Section>

      <Section
        id="messaging"
        eyebrow="Messaging"
        title="Conversations That Keep Work Moving."
        copy="Stay connected through direct messages, group conversations and team channels in one organized interface."
        action={{ href: "/messaging", label: "Explore Messaging" }}
      >
        <div className="grid items-start gap-8 lg:grid-cols-2">
          <FeatureCards
            items={[
              {
                title: "Direct and group chat",
                body: "Conversations stay scoped to a workspace, with membership-checked reads.",
                tile: "bg-[#E8F3FF]",
                ink: "text-[#2F6FE4]",
                d: "M5 8h10M5 12h6M7 17l-2 3 4-2h7a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7a3 3 0 0 0-3 3v7a3 3 0 0 0 3 3z"
              },
              {
                title: "History and search",
                body: "Message history, pagination, search, and unread counts stay with the inbox.",
                tile: "bg-[#E6F8FF]",
                ink: "text-[#14B4D4]",
                d: "M11 5h8M5 5h2M5 12h14M5 19h8"
              },
              {
                title: "Authenticated files",
                body: "Image and document attachments download only after a signed-in, authorized request.",
                tile: "bg-[#F4ECFF]",
                ink: "text-[#8B5CF6]",
                d: "M7 4h7l4 4v12H7zM14 4v4h4"
              },
              {
                title: "Workspace access",
                body: "In-app notifications and server-side access controls follow workspace membership.",
                tile: "bg-[#E8FBF4]",
                ink: "text-[#14B981]",
                d: "M12 12a3 3 0 1 0-3-3 3 3 0 0 0 3 3zm-6 8a6 6 0 0 1 12 0"
              }
            ]}
          />
          <MessagingPreview />
        </div>
      </Section>

      <Section
        id="social"
        tone="mist"
        eyebrow="Social media management"
        title="Plan Once. Publish Across Your Connected Channels."
        copy="Create content, organize your publishing calendar and manage supported social accounts from one workspace. Automatic publishing waits on official Facebook, Instagram, and TikTok credentials."
        action={{ href: "/social", label: "Explore Social Media Management" }}
      >
        <div className="grid items-start gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <FeatureCards
            items={[
              {
                title: "Connect supported accounts",
                body: "Facebook, Instagram, and TikTok appear as connected only after official credentials exist.",
                tile: "bg-[#E8F3FF]",
                ink: "text-[#2F6FE4]",
                d: "M8 12h8M12 8v8M7 5h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z"
              },
              {
                title: "Drafts and media",
                body: "Create drafts, edit captions, and upload supported media before anything is queued.",
                tile: "bg-[#F4ECFF]",
                ink: "text-[#8B5CF6]",
                d: "M8 7h8v10H8zM10 10h4M10 13h4"
              },
              {
                title: "Calendar and queue",
                body: "Schedule content and watch publishing status, retries, and failures in one place.",
                tile: "bg-[#E6F8FF]",
                ink: "text-[#14B4D4]",
                d: "M7 4v3M17 4v3M5 9h14M6 6h12a2 2 0 0 1 2 2v11H4V8a2 2 0 0 1 2-2z"
              },
              {
                title: "Analytics when live",
                body: "Charts stay sample-only until a connected account can supply real publishing data.",
                tile: "bg-[#E8FBF4]",
                ink: "text-[#14B981]",
                d: "M5 19V9M10 19V5M15 19v-7M20 19V8"
              }
            ]}
          />
          <SocialPreview />
        </div>
      </Section>

      <Section
        id="meetings"
        eyebrow="Online meetings"
        title="Bring Everyone Together, Wherever They Work."
        copy="Plan meetings, invite participants and keep join records next to the workspace inbox. Live audio, video, mute, camera, and screen share stay marked planned until a verified media path exists."
        action={{ href: "/meetings", label: "Explore Meetings" }}
      >
        <div className="grid items-start gap-8 lg:grid-cols-2">
          <FeatureCards
            items={[
              {
                title: "Meeting records",
                body: "Create meetings, store hosts and participants, and keep join records with the inbox.",
                tile: "bg-[#E6F8FF]",
                ink: "text-[#14B4D4]",
                d: "M15 10l4-2v8l-4-2M5 8h10v8H5z"
              },
              {
                title: "Calendar scheduling",
                body: "Meetings land on the workspace calendar. Participant limits come from the plan.",
                tile: "bg-[#E8F3FF]",
                ink: "text-[#2F6FE4]",
                d: "M7 4v3M17 4v3M5 10h14M8 14h3M8 18h8"
              },
              {
                title: "Live media path",
                body: "Audio, video, mute, camera, and screen share wait on a verified TURN or LiveKit path.",
                tile: "bg-[#F4ECFF]",
                ink: "text-[#8B5CF6]",
                d: "M12 6a5 5 0 0 1 5 5v4l2 2H5l2-2v-4a5 5 0 0 1 5-5z"
              },
              {
                title: "Reminders",
                body: "In-app reminders send when notification delivery is configured. Email waits on SMTP.",
                tile: "bg-[#E8FBF4]",
                ink: "text-[#14B981]",
                d: "M12 6a5 5 0 0 1 5 5v4l2 2H5l2-2v-4a5 5 0 0 1 5-5zM10 20h4"
              }
            ]}
          />
          <MeetingPreview />
        </div>
      </Section>

      <Section
        id="teams"
        tone="mist"
        eyebrow="Team collaboration"
        title="Your Team, Connected Around the Work."
        copy="Keep your people, conversations, shared workspaces and everyday coordination organized. Task boards are not part of the current product."
        action={{ href: "/teams", label: "Explore Teams" }}
      >
        <div className="grid items-start gap-8 lg:grid-cols-2">
          <FeatureCards
            items={[
              {
                title: "Members and roles",
                body: "Owners, admins, and members stay behind workspace membership checks.",
                tile: "bg-[#E8F3FF]",
                ink: "text-[#2F6FE4]",
                d: "M12 12a3 3 0 1 0-3-3 3 3 0 0 0 3 3zm-6 8a6 6 0 0 1 12 0"
              },
              {
                title: "Invites",
                body: "The first account creates a workspace you can invite others into.",
                tile: "bg-[#E6F8FF]",
                ink: "text-[#14B4D4]",
                d: "M4 8h16M4 12h10M4 16h7"
              },
              {
                title: "Shared files",
                body: "Documents stay attached to conversations and the workspace that owns them.",
                tile: "bg-[#F4ECFF]",
                ink: "text-[#8B5CF6]",
                d: "M7 4h7l4 4v12H7z"
              },
              {
                title: "Audit events",
                body: "Membership and access events stay in the workspace record. No invented activity feed stats.",
                tile: "bg-[#E8FBF4]",
                ink: "text-[#14B981]",
                d: "M5 12h14M12 5v14"
              }
            ]}
          />
          <TeamPreview />
        </div>
      </Section>

      <Section
        id="schedule"
        eyebrow="Calendar & scheduling"
        title="Keep Every Important Moment on Schedule."
        copy="Bring supported meetings, events and social publishing schedules into one clear calendar. External calendar sync is not configured."
        action={{ href: "/scheduling", label: "Explore Scheduling" }}
      >
        <CalendarPreview />
      </Section>

      <Section
        id="files"
        tone="mist"
        eyebrow="Files & attachments"
        title="Share the Files Your Team Needs."
        copy="Keep shared documents and media connected to the conversations and workspaces where they belong. End-to-end encryption is not claimed."
        action={{ href: "/files", label: "Explore File Sharing" }}
      >
        <FilesPreview />
      </Section>

      <Section
        id="integrations"
        eyebrow="Integrations"
        title="Connect the Platforms You Already Use."
        copy="Bring supported social publishing workflows into your Takiia workspace. No account is shown as connected unless an authorized connection exists."
      >
        <div className="grid gap-5 md:grid-cols-3">
          {[
            ["Facebook", "Page and post publishing after official app review.", "bg-[#E8F3FF]", "text-[#2F6FE4]"],
            ["Instagram", "Supported media and permissions after official credentials.", "bg-[#F4ECFF]", "text-[#8B5CF6]"],
            ["TikTok", "Account connection and publishing after official approval.", "bg-[#E8FBF4]", "text-[#142033]"]
          ].map(([name, body, tile, ink]) => (
            <article key={name} className="rounded-[1.6rem] border border-line bg-white p-7 shadow-soft">
              <span className={`flex h-12 w-12 items-center justify-center rounded-2xl text-lg font-black ${tile} ${ink}`}>
                {name.slice(0, 1)}
              </span>
              <h3 className="mt-5 text-xl font-bold text-navy">{name}</h3>
              <p className="mt-3 text-sm leading-7 text-muted">{body}</p>
              <p className="mt-5 text-[11px] font-bold uppercase tracking-[0.16em] text-[#7C93AA]">
                Requires credentials or approval
              </p>
            </article>
          ))}
        </div>
      </Section>

      <Section
        id="workflow"
        tone="mist"
        eyebrow="Smarter workflows"
        title="Less Manual Coordination. More Organized Work."
        copy="Available today: scheduled social jobs, queue status, meeting records, in-app notices, and usage-limit errors from the API. An advanced automation builder is not implemented."
      >
        <WorkflowPreview />
      </Section>

      <Section
        id="security"
        eyebrow="Security & privacy"
        title="Your Workspace. Your Data. Your Control."
        copy="These controls sit in the request path. No certifications, compliance badges, or guarantees are claimed here."
        action={{ href: "/security", label: "Read security details" }}
      >
        <SecurityPreview />
      </Section>

      <Section
        id="how"
        tone="mist"
        eyebrow="Get started"
        title="Start Working Together in Four Simple Steps."
      >
        <ol className="grid gap-4 md:grid-cols-4">
          {[
            ["Create your account", "Sign up with an email and a 12-character password."],
            ["Set up your workspace", "The first account creates a workspace you can invite others into."],
            ["Connect supported social accounts", "Only after official Facebook, Instagram, or TikTok credentials exist."],
            ["Start messaging, scheduling and collaborating", "Inbox, meeting records, and drafts are available after sign-in."]
          ].map(([title, body], index) => (
            <li key={title} className="relative rounded-[1.6rem] border border-line bg-white p-6 shadow-soft">
              <span className="text-3xl font-black text-transparent bg-gradient-to-r from-cyan-400 to-mint-400 bg-clip-text">
                0{index + 1}
              </span>
              <p className="mt-4 font-bold text-navy">{title}</p>
              <p className="mt-2 text-sm leading-6 text-muted">{body}</p>
            </li>
          ))}
        </ol>
        <Link href="/signup" className="btn-primary mt-10 px-7 py-3">
          Get Started
        </Link>
      </Section>

      <Section
        id="pricing"
        eyebrow="Plans & pricing"
        title="Choose a Plan That Fits Your Workflow."
        copy="Start with the capabilities you need and choose a plan with clear usage limits. Amounts are proposed commercial defaults until a payment provider is wired."
        action={{ href: "/pricing", label: "View Full Pricing" }}
      >
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {Object.entries(defaultPlanCatalog).map(([key, plan]) => (
            <article
              key={key}
              className={`rounded-[1.6rem] border p-6 ${
                key === "pro" ? "border-cyan-400/50 bg-pale shadow-glass" : "border-line bg-white shadow-soft"
              }`}
            >
              {key === "pro" ? (
                <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.16em] text-brand-500">Recommended default</p>
              ) : (
                <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.16em] text-transparent">Plan</p>
              )}
              <h3 className="text-xl font-bold text-navy">{plan.name}</h3>
              <p className="mt-2 text-3xl font-bold text-navy">
                ${plan.proposedMonthlyUsd}
                <span className="text-sm font-medium text-muted"> / month</span>
              </p>
              <p className="mt-3 min-h-16 text-sm leading-6 text-muted">{plan.description}</p>
              <ul className="mt-5 space-y-2.5 text-sm text-muted">
                <li>{plan.limits.members} members</li>
                <li>{plan.limits.socialAccounts} social accounts</li>
                <li>{plan.limits.scheduledPostsPerMonth} scheduled posts / month</li>
                <li>{plan.limits.storageMb} MB storage</li>
                <li>{plan.limits.meetingsPerMonth} meetings / month</li>
                <li>Checkout unconfigured until a payment provider is added</li>
              </ul>
              <Link href="/signup" className={key === "pro" ? "btn-primary mt-6 w-full" : "btn-secondary mt-6 w-full"}>
                Get Started
              </Link>
            </article>
          ))}
        </div>
      </Section>

      <Section id="faq" tone="mist" eyebrow="FAQ" title="Questions? We’re Here to Help.">
        <div className="grid gap-3 lg:grid-cols-2">
          {faqs.map(([q, a]) => (
            <details key={q} className="rounded-2xl border border-line bg-white px-5 py-4 shadow-soft">
              <summary className="cursor-pointer font-bold text-navy">{q}</summary>
              <p className="mt-3 text-sm leading-7 text-muted">{a}</p>
            </details>
          ))}
        </div>
      </Section>

      <section className="bg-[#0B1730] px-5 py-20">
        <div className="site-wrap overflow-hidden rounded-[2rem] bg-[linear-gradient(135deg,rgba(34,199,232,0.16),rgba(62,230,180,0.12))] px-8 py-14 md:px-14">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#7C93AA]">Start in one workspace</p>
          <h2 className="mt-3 max-w-3xl text-4xl font-bold tracking-tight text-white">
            Bring Your Conversations and Workflows Together.
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/70">
            Manage communication, meetings, team collaboration and social publishing from one organized workspace.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/signup" className="btn-primary px-7 py-3">
              Get Started
            </Link>
            <Link href="/pricing" className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3 text-sm font-bold text-[#0B1730]">
              View Pricing
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
