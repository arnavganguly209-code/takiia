"use client";

import { FormEvent, useEffect, useState } from "react";
import { apiFetch, csrfFromDocument } from "@/lib/api";

export default function DashboardSocialPage() {
  const [workspaceId, setWorkspaceId] = useState<string | null>(null);
  const [posts, setPosts] = useState<Array<{ id: string; provider: string; body: string; status: string }>>([]);
  const [note, setNote] = useState("Loading queue…");

  useEffect(() => {
    async function load() {
      try {
        const list = await apiFetch<{ workspaces: Array<{ id: string }> }>("/workspaces");
        const first = list.workspaces[0];
        if (!first) {
          setNote("No workspace available.");
          return;
        }
        setWorkspaceId(first.id);
        const result = await apiFetch<{
          posts: Array<{ id: string; provider: string; body: string; status: string }>;
          publishing: { note: string };
        }>(`/workspaces/${first.id}/social`);
        setPosts(result.posts);
        setNote(result.publishing.note);
      } catch (err) {
        setNote(err instanceof Error ? err.message : "Unable to load social queue");
      }
    }
    void load();
  }, []);

  async function queue(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!workspaceId) {
      return;
    }
    const form = new FormData(event.currentTarget);
    const csrf = csrfFromDocument();
    const result = await apiFetch<{ post: { id: string; provider: string; body: string; status: string } }>(
      `/workspaces/${workspaceId}/social/posts`,
      {
        method: "POST",
        headers: csrf ? { "x-csrf-token": csrf } : undefined,
        body: JSON.stringify({
          provider: form.get("provider"),
          body: form.get("body"),
          scheduledFor: new Date(String(form.get("scheduledFor"))).toISOString()
        })
      }
    );
    setPosts((current) => [...current, result.post]);
    event.currentTarget.reset();
  }

  return (
    <section className="mx-auto max-w-3xl px-5 py-14">
      <h1 className="font-display text-5xl">Social queue</h1>
      <p className="mt-4 text-sm text-parchment-100/65">{note}</p>
      <form className="mt-8 grid gap-3" onSubmit={(event) => void queue(event)}>
        <select name="provider" className="rounded-xl border border-white/15 bg-pine-900 px-4 py-3">
          <option value="facebook">Facebook</option>
          <option value="instagram">Instagram</option>
          <option value="tiktok">TikTok</option>
        </select>
        <textarea required name="body" rows={4} className="rounded-xl border border-white/15 bg-pine-900 px-4 py-3" />
        <input required type="datetime-local" name="scheduledFor" className="rounded-xl border border-white/15 bg-pine-900 px-4 py-3" />
        <button className="rounded-full bg-copper-500 px-5 py-3" type="submit">
          Queue draft
        </button>
      </form>
      {posts.length === 0 ? (
        <p className="mt-8 text-parchment-100/60">No queued posts.</p>
      ) : (
        <ul className="mt-8 space-y-3">
          {posts.map((post) => (
            <li key={post.id} className="rounded-2xl border border-white/10 px-4 py-3">
              {post.provider} · {post.status} · {post.body}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
