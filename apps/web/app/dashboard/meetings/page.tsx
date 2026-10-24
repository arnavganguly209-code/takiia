"use client";

import { FormEvent, useEffect, useState } from "react";
import { apiFetch, csrfFromDocument } from "@/lib/api";

export default function DashboardMeetingsPage() {
  const [workspaceId, setWorkspaceId] = useState<string | null>(null);
  const [meetings, setMeetings] = useState<Array<{ id: string; title: string; status: string; startsAt: string }>>([]);
  const [note, setNote] = useState("Loading meetings…");

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
          meetings: Array<{ id: string; title: string; status: string; startsAt: string }>;
          media: { note: string };
        }>(`/workspaces/${first.id}/meetings`);
        setMeetings(result.meetings);
        setNote(result.media.note);
      } catch (err) {
        setNote(err instanceof Error ? err.message : "Unable to load meetings");
      }
    }
    void load();
  }, []);

  async function create(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!workspaceId) {
      return;
    }
    const form = new FormData(event.currentTarget);
    const csrf = csrfFromDocument();
    const result = await apiFetch<{ meeting: { id: string; title: string; status: string; startsAt: string } }>(
      `/workspaces/${workspaceId}/meetings`,
      {
        method: "POST",
        headers: csrf ? { "x-csrf-token": csrf } : undefined,
        body: JSON.stringify({
          title: form.get("title"),
          startsAt: new Date(String(form.get("startsAt"))).toISOString()
        })
      }
    );
    setMeetings((current) => [...current, result.meeting]);
    event.currentTarget.reset();
  }

  return (
    <section className="py-4">
      <h1 className="text-4xl font-semibold text-navy">Meetings</h1>
      <p className="mt-4 text-sm text-muted">{note}</p>
      <form className="mt-8 grid gap-3 md:grid-cols-[1fr_1fr_auto]" onSubmit={(event) => void create(event)}>
        <input required name="title" placeholder="Title" className="field" />
        <input required type="datetime-local" name="startsAt" className="field" />
        <button className="btn-primary" type="submit">
          Schedule
        </button>
      </form>
      {meetings.length === 0 ? (
        <p className="mt-8 text-muted">No meetings scheduled.</p>
      ) : (
        <ul className="mt-8 space-y-3">
          {meetings.map((meeting) => (
            <li key={meeting.id} className="glass rounded-2xl px-4 py-3">
              {meeting.title} · {meeting.status} · {new Date(meeting.startsAt).toLocaleString()}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
