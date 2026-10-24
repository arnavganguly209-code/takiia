"use client";

import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import { apiFetch, csrfFromDocument, rememberCsrf } from "@/lib/api";

type Workspace = {
  id: string;
  name: string;
  role: string;
  memberCount: number;
  conversationCount: number;
  plan: { name: string; status: string } | null;
};

export default function DashboardPage() {
  const [user, setUser] = useState<{ displayName: string; email: string } | null>(null);
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const me = await apiFetch<{ user: { displayName: string; email: string }; csrfToken?: string }>("/auth/me");
        rememberCsrf(me.csrfToken);
        const list = await apiFetch<{ workspaces: Workspace[] }>("/workspaces");
        setUser(me.user);
        setWorkspaces(list.workspaces);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unable to load dashboard");
      } finally {
        setLoading(false);
      }
    }
    void load();
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

  if (loading) {
    return <EmptyState title="Loading workspace…" body="Checking your session against the API." />;
  }

  if (error) {
    return (
      <EmptyState
        title="Dashboard unavailable"
        body={error}
        action={
          <Link href="/login" className="text-brass-300">
            Sign in
          </Link>
        }
      />
    );
  }

  return (
    <section className="mx-auto max-w-5xl px-5 py-14">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-brass-400">Dashboard</p>
          <h1 className="mt-3 font-display text-5xl">{user?.displayName}</h1>
          <p className="mt-2 text-sm text-parchment-100/60">{user?.email}</p>
        </div>
        <button type="button" onClick={() => void logout()} className="text-sm text-parchment-100/70">
          Sign out
        </button>
      </div>
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        <DashLink href="/dashboard/inbox" title="Inbox" body="Conversations in the selected workspace." />
        <DashLink href="/dashboard/meetings" title="Meetings" body="Scheduled records. Media stays gated." />
        <DashLink href="/dashboard/social" title="Social queue" body="Drafts stored until providers connect." />
      </div>
      <h2 className="mt-12 font-display text-3xl">Workspaces</h2>
      {workspaces.length === 0 ? (
        <p className="mt-4 text-parchment-100/60">No workspaces yet.</p>
      ) : (
        <ul className="mt-5 grid gap-4">
          {workspaces.map((workspace) => (
            <li key={workspace.id} className="rounded-2xl border border-white/10 bg-pine-900/50 p-5">
              <p className="font-medium">{workspace.name}</p>
              <p className="mt-1 text-sm text-parchment-100/60">
                {workspace.role} · {workspace.memberCount} members · {workspace.conversationCount} conversations
                {workspace.plan ? ` · ${workspace.plan.name} (${workspace.plan.status})` : ""}
              </p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

function DashLink({ href, title, body }: { href: string; title: string; body: string }) {
  return (
    <Link href={href} className="rounded-2xl border border-white/10 p-5 hover:border-brass-400">
      <h2 className="font-display text-2xl">{title}</h2>
      <p className="mt-2 text-sm text-parchment-100/65">{body}</p>
    </Link>
  );
}

function EmptyState({
  title,
  body,
  action
}: {
  title: string;
  body: string;
  action?: ReactNode;
}) {
  return (
    <section className="mx-auto max-w-lg px-5 py-24 text-center">
      <h1 className="font-display text-4xl">{title}</h1>
      <p className="mt-4 text-parchment-100/70">{body}</p>
      {action ? <div className="mt-6">{action}</div> : null}
    </section>
  );
}
