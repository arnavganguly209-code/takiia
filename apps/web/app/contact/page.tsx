"use client";

import { FormEvent, useState } from "react";
import { apiFetch } from "@/lib/api";

export default function ContactPage() {
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError(null);
    setStatus(null);
    const form = new FormData(event.currentTarget);
    try {
      const result = await apiFetch<{ note: string }>("/contact", {
        method: "POST",
        body: JSON.stringify({
          name: form.get("name"),
          email: form.get("email"),
          topic: form.get("topic"),
          message: form.get("message")
        })
      });
      setStatus(result.note);
      event.currentTarget.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to store the inquiry");
    } finally {
      setPending(false);
    }
  }

  return (
    <section className="mx-auto max-w-xl px-5 py-16">
      <p className="text-xs uppercase tracking-[0.28em] text-brass-400">Contact</p>
      <h1 className="mt-4 font-display text-5xl">Write to Takiia</h1>
      <p className="mt-4 text-parchment-100/70">
        Inquiries are stored in the database. Email delivery is reported honestly from the API feature flags.
      </p>
      <form className="mt-8 grid gap-4" onSubmit={onSubmit}>
        <label className="grid gap-2 text-sm">
          Name
          <input required name="name" className="rounded-xl border border-white/15 bg-pine-900 px-4 py-3" />
        </label>
        <label className="grid gap-2 text-sm">
          Email
          <input required type="email" name="email" className="rounded-xl border border-white/15 bg-pine-900 px-4 py-3" />
        </label>
        <label className="grid gap-2 text-sm">
          Topic
          <select name="topic" className="rounded-xl border border-white/15 bg-pine-900 px-4 py-3">
            <option value="sales">Sales</option>
            <option value="support">Support</option>
            <option value="security">Security</option>
            <option value="other">Other</option>
          </select>
        </label>
        <label className="grid gap-2 text-sm">
          Message
          <textarea required minLength={10} name="message" rows={6} className="rounded-xl border border-white/15 bg-pine-900 px-4 py-3" />
        </label>
        <button
          disabled={pending}
          className="rounded-full bg-copper-500 px-5 py-3 text-sm font-medium disabled:opacity-60"
          type="submit"
        >
          {pending ? "Saving…" : "Send inquiry"}
        </button>
        {status ? <p className="text-sm text-fern-400">{status}</p> : null}
        {error ? <p className="text-sm text-copper-400">{error}</p> : null}
      </form>
    </section>
  );
}
