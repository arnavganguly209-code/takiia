"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { apiFetch, rememberCsrf } from "@/lib/api";

export default function SignupPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError(null);
    const form = new FormData(event.currentTarget);
    try {
      const result = await apiFetch<{ csrfToken?: string }>("/auth/register", {
        method: "POST",
        body: JSON.stringify({
          displayName: form.get("displayName"),
          email: form.get("email"),
          password: form.get("password"),
          workspaceName: form.get("workspaceName")
        })
      });
      rememberCsrf(result.csrfToken);
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setPending(false);
    }
  }

  return (
    <section className="mx-auto max-w-md px-5 py-16">
      <h1 className="font-display text-5xl">Create a workspace</h1>
      <p className="mt-3 text-sm text-parchment-100/70">Password must be at least 12 characters and include a letter and a number.</p>
      <form className="mt-8 grid gap-4" onSubmit={onSubmit}>
        <label className="grid gap-2 text-sm">
          Your name
          <input required name="displayName" autoComplete="name" className="rounded-xl border border-white/15 bg-pine-900 px-4 py-3" />
        </label>
        <label className="grid gap-2 text-sm">
          Workspace name
          <input name="workspaceName" className="rounded-xl border border-white/15 bg-pine-900 px-4 py-3" />
        </label>
        <label className="grid gap-2 text-sm">
          Email
          <input required type="email" name="email" autoComplete="email" className="rounded-xl border border-white/15 bg-pine-900 px-4 py-3" />
        </label>
        <label className="grid gap-2 text-sm">
          Password
          <input required type="password" name="password" autoComplete="new-password" className="rounded-xl border border-white/15 bg-pine-900 px-4 py-3" />
        </label>
        <button disabled={pending} className="rounded-full bg-copper-500 px-5 py-3 text-sm font-medium" type="submit">
          {pending ? "Creating…" : "Create account"}
        </button>
        {error ? <p className="text-sm text-copper-400">{error}</p> : null}
      </form>
      <p className="mt-6 text-sm text-parchment-100/60">
        Already registered? <Link href="/login" className="text-brass-300">Sign in</Link>
      </p>
    </section>
  );
}
