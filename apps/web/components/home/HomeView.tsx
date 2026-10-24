import Link from "next/link";
import { defaultPlanCatalog } from "@takiia/shared";
import { defaultSiteContent, type SiteContent, type SiteSection } from "@/lib/site-content";
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

const capabilityIcons = [
  "M5 8h10M5 12h6M7 17l-2 3 4-2h7a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7a3 3 0 0 0-3 3v7a3 3 0 0 0 3 3z",
  "M15 10l4-2v8l-4-2M5 8h10v8H5z",
  "M8 12h8M12 8v8M7 5h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z",
  "M12 12a3 3 0 1 0-3-3 3 3 0 0 0 3 3zm-7 8a5 5 0 0 1 10 0",
  "M7 4h7l4 4v12H7zM14 4v4h4",
  "M7 4v3M17 4v3M5 9h14M6 6h12a2 2 0 0 1 2 2v11H4V8a2 2 0 0 1 2-2z",
  "M12 6a5 5 0 0 1 5 5v4l2 2H5l2-2v-4a5 5 0 0 1 5-5zM10 20h4",
  "M7 4v3M17 4v3M5 10h14M8 14h3M8 18h8"
];

const cardLooks = [
  { tile: "bg-[#E8F3FF]", ink: "text-[#2F6FE4]", d: "M5 8h10M5 12h6M7 17l-2 3 4-2h7a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7a3 3 0 0 0-3 3v7a3 3 0 0 0 3 3z" },
  { tile: "bg-[#E6F8FF]", ink: "text-[#14B4D4]", d: "M11 5h8M5 5h2M5 12h14M5 19h8" },
  { tile: "bg-[#F4ECFF]", ink: "text-[#8B5CF6]", d: "M7 4h7l4 4v12H7zM14 4v4h4" },
  { tile: "bg-[#E8FBF4]", ink: "text-[#14B981]", d: "M12 12a3 3 0 1 0-3-3 3 3 0 0 0 3 3zm-6 8a6 6 0 0 1 12 0" }
];

function actionOf(section: SiteSection) {
  return section.actionHref && section.actionLabel ? { href: section.actionHref, label: section.actionLabel } : undefined;
}

function SectionImage({ src }: { src?: string }) {
  if (!src) {
    return null;
  }
  return <img src={src} alt="" className="mb-10 h-[22rem] w-full rounded-[2rem] object-cover shadow-glass sm:h-[28rem]" />;
}

export function HomeView({ content = defaultSiteContent }: { content?: SiteContent }) {
  const s = content.sections;
  return (
    <div>
      <HomeHero hero={content.hero} />

      <section className="border-y border-line bg-white">
        <div className="site-wrap grid grid-cols-2 gap-3 py-6 sm:grid-cols-4 lg:grid-cols-8">
          {content.capabilities.map((item, index) => (
            <Link
              key={`${item.label}-${item.href}`}
              href={item.href}
              className="flex flex-col items-center gap-2 rounded-2xl border border-line bg-mist/70 px-2 py-4 text-center text-[12px] font-bold text-navy transition hover:border-brand-500/30 hover:bg-white"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-brand-500 shadow-soft">
                <LineIcon d={capabilityIcons[index % capabilityIcons.length]} />
              </span>
              {item.label}
            </Link>
          ))}
        </div>
      </section>

      <Section id="why" eyebrow={s.why.eyebrow} title={s.why.title} copy={s.why.copy}>
        <SectionImage src={s.why.imageSrc} />
        <div className="grid gap-5 md:grid-cols-3">
          {s.why.cards.map((item, index) => (
            <article
              key={item.title}
              className={`card-hover rounded-[1.6rem] border border-line p-7 ${index === 0 ? "bg-pale" : index === 2 ? "bg-mintsoft" : "bg-white"}`}
            >
              <p className="text-sm font-bold text-transparent bg-gradient-to-r from-cyan-400 to-mint-400 bg-clip-text">0{index + 1}</p>
              <h3 className="mt-3 text-xl font-bold text-navy">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted">{item.body}</p>
            </article>
          ))}
        </div>
        {s.why.note ? <p className="mt-8 text-sm leading-7 text-muted">{s.why.note}</p> : null}
      </Section>

      <Section id="workspace" tone="mist" eyebrow={s.workspace.eyebrow} title={s.workspace.title} copy={s.workspace.copy}>
        <SectionImage src={s.workspace.imageSrc} />
        <WorkspacePreview />
      </Section>

      <Section id="messaging" eyebrow={s.messaging.eyebrow} title={s.messaging.title} copy={s.messaging.copy} action={actionOf(s.messaging)}>
        <SectionImage src={s.messaging.imageSrc} />
        <div className="grid items-start gap-8 lg:grid-cols-2">
          <FeatureCards items={s.messaging.cards.map((card, index) => ({ ...card, ...cardLooks[index % cardLooks.length] }))} />
          <MessagingPreview />
        </div>
      </Section>

      <Section id="social" tone="mist" eyebrow={s.social.eyebrow} title={s.social.title} copy={s.social.copy} action={actionOf(s.social)}>
        <SectionImage src={s.social.imageSrc} />
        <div className="grid items-start gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <FeatureCards items={s.social.cards.map((card, index) => ({ ...card, ...cardLooks[index % cardLooks.length] }))} />
          <SocialPreview />
        </div>
      </Section>

      <Section id="meetings" eyebrow={s.meetings.eyebrow} title={s.meetings.title} copy={s.meetings.copy} action={actionOf(s.meetings)}>
        <SectionImage src={s.meetings.imageSrc} />
        <div className="grid items-start gap-8 lg:grid-cols-2">
          <FeatureCards items={s.meetings.cards.map((card, index) => ({ ...card, ...cardLooks[index % cardLooks.length] }))} />
          <MeetingPreview />
        </div>
      </Section>

      <Section id="teams" tone="mist" eyebrow={s.teams.eyebrow} title={s.teams.title} copy={s.teams.copy} action={actionOf(s.teams)}>
        <SectionImage src={s.teams.imageSrc} />
        <div className="grid items-start gap-8 lg:grid-cols-2">
          <FeatureCards items={s.teams.cards.map((card, index) => ({ ...card, ...cardLooks[index % cardLooks.length] }))} />
          <TeamPreview />
        </div>
      </Section>

      <Section id="schedule" eyebrow={s.schedule.eyebrow} title={s.schedule.title} copy={s.schedule.copy} action={actionOf(s.schedule)}>
        <SectionImage src={s.schedule.imageSrc} />
        <CalendarPreview />
      </Section>

      <Section id="files" tone="mist" eyebrow={s.files.eyebrow} title={s.files.title} copy={s.files.copy} action={actionOf(s.files)}>
        <SectionImage src={s.files.imageSrc} />
        <FilesPreview />
      </Section>

      <Section id="integrations" eyebrow={s.integrations.eyebrow} title={s.integrations.title} copy={s.integrations.copy}>
        <SectionImage src={s.integrations.imageSrc} />
        <div className="grid gap-5 md:grid-cols-3">
          {s.integrations.cards.map((item, index) => (
            <article key={item.title} className="rounded-[1.6rem] border border-line bg-white p-7 shadow-soft">
              <span className={`flex h-12 w-12 items-center justify-center rounded-2xl text-lg font-black ${cardLooks[index % cardLooks.length].tile} ${cardLooks[index % cardLooks.length].ink}`}>
                {item.title.slice(0, 1)}
              </span>
              <h3 className="mt-5 text-xl font-bold text-navy">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted">{item.body}</p>
              <p className="mt-5 text-[11px] font-bold uppercase tracking-[0.16em] text-[#7C93AA]">Requires credentials or approval</p>
            </article>
          ))}
        </div>
      </Section>

      <Section id="workflow" tone="mist" eyebrow={s.workflow.eyebrow} title={s.workflow.title} copy={s.workflow.copy}>
        <SectionImage src={s.workflow.imageSrc} />
        <WorkflowPreview />
      </Section>

      <Section id="security" eyebrow={s.security.eyebrow} title={s.security.title} copy={s.security.copy} action={actionOf(s.security)}>
        <SectionImage src={s.security.imageSrc} />
        <SecurityPreview />
      </Section>

      <Section id="how" tone="mist" eyebrow={s.how.eyebrow} title={s.how.title} copy={s.how.copy}>
        <SectionImage src={s.how.imageSrc} />
        <ol className="grid gap-4 md:grid-cols-4">
          {s.how.cards.map((item, index) => (
            <li key={item.title} className="relative rounded-[1.6rem] border border-line bg-white p-6 shadow-soft">
              <span className="text-3xl font-black text-transparent bg-gradient-to-r from-cyan-400 to-mint-400 bg-clip-text">0{index + 1}</span>
              <p className="mt-4 font-bold text-navy">{item.title}</p>
              <p className="mt-2 text-sm leading-6 text-muted">{item.body}</p>
            </li>
          ))}
        </ol>
        <Link href="/signup" className="btn-primary mt-10 px-7 py-3">
          Get Started
        </Link>
      </Section>

      <Section id="pricing" eyebrow={s.pricing.eyebrow} title={s.pricing.title} copy={s.pricing.copy} action={actionOf(s.pricing)}>
        <SectionImage src={s.pricing.imageSrc} />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {Object.entries(defaultPlanCatalog).map(([key, plan]) => (
            <article
              key={key}
              className={`rounded-[1.6rem] border p-6 ${key === "pro" ? "border-cyan-400/50 bg-pale shadow-glass" : "border-line bg-white shadow-soft"}`}
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

      <Section id="faq" tone="mist" eyebrow={s.faq.eyebrow} title={s.faq.title} copy={s.faq.copy}>
        <div className="grid gap-3 lg:grid-cols-2">
          {content.faqs.map((item) => (
            <details key={item.q} className="rounded-2xl border border-line bg-white px-5 py-4 shadow-soft">
              <summary className="cursor-pointer font-bold text-navy">{item.q}</summary>
              <p className="mt-3 text-sm leading-7 text-muted">{item.a}</p>
            </details>
          ))}
        </div>
      </Section>

      <section className="bg-[#0B1730] px-5 py-20">
        <div className="site-wrap overflow-hidden rounded-[2rem] bg-[linear-gradient(135deg,rgba(34,199,232,0.16),rgba(62,230,180,0.12))] px-8 py-14 md:px-14">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#7C93AA]">{content.cta.eyebrow}</p>
          <h2 className="mt-3 max-w-3xl text-4xl font-bold tracking-tight text-white">{content.cta.title}</h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/70">{content.cta.copy}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={content.cta.primaryHref} className="btn-primary px-7 py-3">
              {content.cta.primaryLabel}
            </Link>
            <Link href={content.cta.secondaryHref} className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3 text-sm font-bold text-[#0B1730]">
              {content.cta.secondaryLabel}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
