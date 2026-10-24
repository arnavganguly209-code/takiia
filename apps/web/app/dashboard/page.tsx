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
          <Link href="/login" className="font-medium text-brand-500">
            Sign in
          </Link>
        }
      />
    );
  }

  return (
    <section className="py-4">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-500">Overview</p>
          <h1 className="mt-3 text-4xl font-semibold text-navy">{user?.displayName}</h1>
          <p className="mt-2 text-sm text-muted">{user?.email}</p>
        </div>
        <button type="button" onClick={() => void logout()} className="text-sm text-muted">
          Sign out
        </button>
      </div>
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        <DashLink href="/dashboard/inbox" title="Inbox" body="Conversations in the selected workspace." />
        <DashLink href="/dashboard/meetings" title="Meetings" body="Scheduled records. Media stays gated." />
        <DashLink href="/dashboard/social" title="Social queue" body="Drafts stored until providers connect." />
      </div>
      <h2 className="mt-12 text-3xl font-semibold text-navy">Workspaces</h2>
      {workspaces.length === 0 ? (
        <p className="mt-4 text-muted">No workspaces yet.</p>
      ) : (
        <ul className="mt-5 grid gap-4">
          {workspaces.map((workspace) => (
            <li key={workspace.id} className="glass rounded-2xl p-5">
              <p className="font-medium text-navy">{workspace.name}</p>
              <p className="mt-1 text-sm text-muted">
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
    <Link href={href} className="glass rounded-2xl p-5 hover:border-brand-500">
      <h2 className="text-2xl font-semibold text-navy">{title}</h2>
      <p className="mt-2 text-sm text-muted">{body}</p>
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
      <h1 className="text-4xl font-semibold text-navy">{title}</h1>
      <p className="mt-4 text-muted">{body}</p>
      {action ? <div className="mt-6">{action}</div> : null}
    </section>
  );
}
