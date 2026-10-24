"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  ["/dashboard", "Home"],
  ["/dashboard/inbox", "Inbox"],
  ["/dashboard/meetings", "Meetings"],
  ["/dashboard/social", "Social Media"],
  ["/dashboard/ads", "Google Ads"],
  ["/dashboard/calendar", "Calendar"],
  ["/dashboard/files", "Files"],
  ["/dashboard/teams", "Teams"],
  ["/dashboard/analytics", "Analytics"],
  ["/dashboard/billing", "Billing"],
  ["/dashboard/settings", "Settings"]
];

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className="border-t border-line bg-mist">
      <div className="mx-auto flex max-w-7xl gap-6 px-5 py-6">
        <button type="button" className="btn-secondary md:hidden" onClick={() => setOpen((value) => !value)}>
          Menu
        </button>
        <aside className={`${open ? "block" : "hidden"} glass w-full shrink-0 rounded-3xl p-4 md:block md:w-56`}>
          <p className="px-3 text-xs font-semibold uppercase tracking-[0.16em] text-brand-500">Workspace</p>
          <nav className="mt-3 grid gap-1 text-sm">
            {links.map(([href, label]) => (
              <Link
                key={href}
                href={href}
                className={`rounded-xl px-3 py-2 ${pathname === href ? "bg-pale font-semibold text-brand-500" : "text-navy hover:bg-pale"}`}
                onClick={() => setOpen(false)}
              >
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
