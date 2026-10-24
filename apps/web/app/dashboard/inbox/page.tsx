"use client";

import { FormEvent, useEffect, useState } from "react";
import { apiFetch, csrfFromDocument } from "@/lib/api";

type Conversation = {
  id: string;
  title: string | null;
  kind: string;
  lastMessage: { body: string } | null;
};

export default function InboxPage() {
  const [workspaceId, setWorkspaceId] = useState<string | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [active, setActive] = useState<string | null>(null);
  const [messages, setMessages] = useState<Array<{ id: string; body: string; author: { displayName: string } }>>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const list = await apiFetch<{ workspaces: Array<{ id: string }> }>("/workspaces");
        const first = list.workspaces[0];
        if (!first) {
          setError("Create a workspace before opening inbox.");
          return;
        }
        setWorkspaceId(first.id);
        const inbox = await apiFetch<{ conversations: Conversation[] }>(`/workspaces/${first.id}/conversations`);
        setConversations(inbox.conversations);
        const firstConversation = inbox.conversations[0];
        if (firstConversation) {
          setActive(firstConversation.id);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Inbox failed to load");
      }
    }
    void load();
  }, []);

  useEffect(() => {
    if (!active) {
      return;
    }
    apiFetch<{ messages: typeof messages }>(`/conversations/${active}/messages`)
      .then((result) => setMessages(result.messages))
      .catch((err: unknown) => setError(err instanceof Error ? err.message : "Messages failed"));
  }, [active]);

  async function send(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!active) {
      return;
    }
    const form = event.currentTarget;
    const body = String(new FormData(form).get("body") ?? "");
    const csrf = csrfFromDocument();
    const result = await apiFetch<{ message: (typeof messages)[number] }>(`/conversations/${active}/messages`, {
      method: "POST",
      headers: csrf ? { "x-csrf-token": csrf } : undefined,
      body: JSON.stringify({ body })
    });
    setMessages((current) => [...current, result.message]);
    form.reset();
  }

  if (error) {
    return (
      <section className="mx-auto max-w-lg px-5 py-24 text-center">
        <h1 className="text-4xl font-semibold text-navy">Inbox</h1>
        <p className="mt-4 text-muted">{error}</p>
      </section>
    );
  }

  return (
    <section className="grid gap-6 py-4 lg:grid-cols-[280px_1fr]">
      <aside className="glass rounded-3xl p-4">
        <h1 className="px-2 text-3xl font-semibold text-navy">Inbox</h1>
        {conversations.length === 0 ? (
          <p className="mt-6 px-2 text-sm text-muted">No conversations yet. Start one from the API or a later compose flow.</p>
        ) : (
          <ul className="mt-4 space-y-2">
            {conversations.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => setActive(item.id)}
                  className={`w-full rounded-2xl px-3 py-3 text-left ${active === item.id ? "bg-pale" : ""}`}
                >
                  <span className="block text-sm text-navy">{item.title ?? item.kind}</span>
                  <span className="block truncate text-xs text-muted">{item.lastMessage?.body ?? "No messages"}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </aside>
      <div className="glass rounded-3xl p-5">
        {active ? (
          <>
            <ul className="min-h-64 space-y-3">
              {messages.map((message) => (
                <li key={message.id} className="rounded-2xl bg-pale px-4 py-3">
                  <p className="text-xs font-semibold text-brand-500">{message.author.displayName}</p>
                  <p className="mt-1">{message.body}</p>
                </li>
              ))}
            </ul>
            <form className="mt-6 flex gap-3" onSubmit={(event) => void send(event)}>
              <input name="body" required className="field flex-1" placeholder="Write a message" />
              <button className="btn-primary" type="submit">
                Send
              </button>
            </form>
            {!workspaceId ? null : <p className="sr-only">Workspace {workspaceId}</p>}
          </>
        ) : (
          <p className="text-muted">Select a conversation when one exists.</p>
        )}
      </div>
    </section>
  );
}
