import type { ReactNode } from "react";
import Link from "next/link";

export function Section({
  id,
  eyebrow,
  title,
  copy,
  children,
  tone = "paper",
  action
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  copy?: string;
  children?: ReactNode;
  tone?: "paper" | "mist";
  action?: { href: string; label: string };
}) {
  return (
    <section id={id} className={`${tone === "mist" ? "bg-mist" : "bg-paper"} bg-section-lines`}>
      <div className="site-wrap py-20 sm:py-24 lg:py-28">
        {eyebrow ? <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#7C93AA]">{eyebrow}</p> : null}
        <div className="mt-3 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <h2 className="text-[1.85rem] font-bold tracking-tight text-navy sm:text-4xl lg:text-[2.6rem] lg:leading-tight">
              {title}
            </h2>
            {copy ? <p className="mt-4 max-w-2xl text-base leading-8 text-muted">{copy}</p> : null}
          </div>
          {action ? (
            <Link href={action.href} className="btn-secondary shrink-0">
              {action.label}
            </Link>
          ) : null}
        </div>
        {children ? <div className="mt-12">{children}</div> : null}
      </div>
    </section>
  );
}

export function ProductBand({
  id,
  index,
  section,
  children,
  tone = "paper"
}: {
  id: string;
  index: number;
  section: { eyebrow: string; title: string; copy?: string; cards: Array<{ title: string; body: string }>; actionHref?: string; actionLabel?: string };
  children: ReactNode;
  tone?: "paper" | "mist";
}) {
  return (
    <section id={id} className={tone === "mist" ? "bg-mist" : "bg-white"}>
      <div className="site-wrap grid items-center gap-12 py-20 lg:grid-cols-12 lg:py-28">
        <div className="lg:col-span-5">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#7C93AA]">
            {String(index).padStart(2, "0")} · {section.eyebrow}
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-navy sm:text-[2.4rem] sm:leading-tight">{section.title}</h2>
          {section.copy ? <p className="mt-4 text-base leading-8 text-muted">{section.copy}</p> : null}
          {section.cards.length ? (
            <ul className="mt-8 space-y-4">
              {section.cards.map((card) => (
                <li key={card.title} className="border-l-2 border-cyan-400 pl-4">
                  <p className="font-bold text-navy">{card.title}</p>
                  <p className="mt-1 text-sm leading-6 text-muted">{card.body}</p>
                </li>
              ))}
            </ul>
          ) : null}
          {section.actionHref && section.actionLabel ? (
            <Link href={section.actionHref} className="btn-primary mt-8 px-6 py-3">
              {section.actionLabel}
            </Link>
          ) : null}
        </div>
        <div className="lg:col-span-7">{children}</div>
      </div>
    </section>
  );
}

export function DemoLabel({ children }: { children: ReactNode }) {
  return <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-500">{children}</p>;
}

export function LineIcon({ d }: { d: string }) {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d={d} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
