"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { apiFetch, csrfFromDocument } from "@/lib/api";

const links = [
  ["/dashboard", "Home"],
  ["/dashboard/inbox", "Inbox"],
  ["/dashboard/inbox", "Messages"],
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
  const [user, setUser] = useState<{ displayName: string; email: string } | null>(null);
  const [workspace, setWorkspace] = useState<string>("Workspace");

  useEffect(() => {
    void apiFetch<{ user: { displayName: string; email: string } }>("/auth/me")
      .then((result) => setUser(result.user))
      .catch(() => setUser(null));
    void apiFetch<{ workspaces: Array<{ name: string }> }>("/workspaces")
      .then((result) => {
        if (result.workspaces[0]) {
          setWorkspace(result.workspaces[0].name);
        }
      })
      .catch(() => undefined);
  }, []);

  async function logout() {
    const csrf = csrfFromDocument();
    await fetch(`${process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:3033"}/auth/logout`, {
      method: "POST",
      credentials: "include",
      headers: csrf ? { "x-csrf-token": csrf } : undefined
    });
    window.location.href = "/login";
  }

  return (
    <div className="min-h-screen border-t border-line bg-mist">
      <div className="sticky top-0 z-30 border-b border-line bg-white/90 px-4 py-3 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center gap-3">
          <button type="button" className="btn-secondary md:hidden" onClick={() => setOpen((value) => !value)}>
            Menu
          </button>
          <p className="hidden text-sm font-bold text-navy sm:block">{workspace}</p>
          <label className="sr-only" htmlFor="workspace-search">
            Search workspace
          </label>
          <input
            id="workspace-search"
            className="field max-w-md flex-1 py-2 text-sm"
            placeholder="Search conversations and meetings"
          />
          <p className="hidden text-xs text-muted lg:block">Notices appear after workspace events exist</p>
          {user ? (
            <button type="button" onClick={() => void logout()} className="text-sm font-semibold text-navy">
              {user.displayName}
            </button>
          ) : (
            <Link href="/login" className="text-sm font-semibold text-navy">
              Sign in
            </Link>
          )}
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl gap-6 px-5 py-6">
        <aside className={`${open ? "block" : "hidden"} w-full shrink-0 rounded-3xl border border-line bg-white p-4 shadow-soft md:block md:w-56`}>
          <p className="px-3 text-xs font-semibold uppercase tracking-[0.16em] text-brand-500">Workspace</p>
          <nav className="mt-3 grid gap-1 text-sm">
            {links.map(([href, label], index) => (
              <Link
                key={`${href}-${label}-${index}`}
                href={href}
                className={`rounded-xl px-3 py-2 ${pathname === href && label !== "Messages" ? "bg-pale font-semibold text-brand-500" : "text-navy hover:bg-pale"}`}
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
