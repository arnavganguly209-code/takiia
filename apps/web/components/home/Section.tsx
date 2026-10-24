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
      <div className="site-wrap py-20">
        {eyebrow ? <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-500">{eyebrow}</p> : null}
        <div className="mt-3 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-semibold tracking-tight text-navy sm:text-4xl">{title}</h2>
            {copy ? <p className="mt-4 max-w-2xl text-base leading-8 text-muted">{copy}</p> : null}
          </div>
          {action ? (
            <Link href={action.href} className="btn-secondary shrink-0">
              {action.label}
            </Link>
          ) : null}
        </div>
        {children ? <div className="mt-10">{children}</div> : null}
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
