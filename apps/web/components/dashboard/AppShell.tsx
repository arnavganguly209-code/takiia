import type { ReactNode } from "react";
import Link from "next/link";

const links = [
  ["/dashboard", "Overview"],
  ["/dashboard/inbox", "Inbox"],
  ["/dashboard/meetings", "Meetings"],
  ["/dashboard/social", "Social"]
];

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="border-t border-line bg-mist">
      <div className="mx-auto flex max-w-7xl gap-6 px-5 py-8">
        <aside className="glass hidden w-56 shrink-0 rounded-3xl p-4 md:block">
          <p className="px-3 text-xs font-semibold uppercase tracking-[0.16em] text-brand-500">Workspace</p>
          <nav className="mt-3 grid gap-1 text-sm">
            {links.map(([href, label]) => (
              <Link key={href} href={href} className="rounded-xl px-3 py-2 text-navy hover:bg-pale">
                {label}
              </Link>
            ))}
          </nav>
        </aside>
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </div>
  );
}
