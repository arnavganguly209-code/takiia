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
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-500">Contact</p>
      <h1 className="mt-4 text-5xl font-semibold text-navy">Write to Takiia</h1>
      <p className="mt-4 text-muted">
        Inquiries are stored in the database. Email delivery is reported honestly from the API feature flags.
      </p>
      <form className="mt-8 grid gap-4" onSubmit={onSubmit}>
        <label className="grid gap-2 text-sm text-navy">
          Name
          <input required name="name" className="field" />
        </label>
        <label className="grid gap-2 text-sm text-navy">
          Email
          <input required type="email" name="email" className="field" />
        </label>
        <label className="grid gap-2 text-sm text-navy">
          Topic
          <select name="topic" className="field">
            <option value="sales">Sales</option>
            <option value="support">Support</option>
            <option value="security">Security</option>
            <option value="other">Other</option>
          </select>
        </label>
        <label className="grid gap-2 text-sm text-navy">
          Message
          <textarea required minLength={10} name="message" rows={6} className="field" />
        </label>
        <button disabled={pending} className="btn-primary disabled:opacity-60" type="submit">
          {pending ? "Saving…" : "Send inquiry"}
        </button>
        {status ? <p className="text-sm text-brand-500">{status}</p> : null}
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
      </form>
    </section>
  );
}
