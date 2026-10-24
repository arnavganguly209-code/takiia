"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { apiFetch, rememberCsrf } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError(null);
    const form = new FormData(event.currentTarget);
    try {
      const result = await apiFetch<{ csrfToken?: string }>("/auth/login", {
        method: "POST",
        body: JSON.stringify({
          email: form.get("email"),
          password: form.get("password")
        })
      });
      rememberCsrf(result.csrfToken);
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign in failed");
    } finally {
      setPending(false);
    }
  }

  return (
    <section className="mx-auto max-w-md px-5 py-16">
      <h1 className="font-display text-5xl">Sign in</h1>
      <p className="mt-3 text-sm text-parchment-100/70">
        Sessions are stored as hashed tokens. Use an account created on this environment.
      </p>
      <form className="mt-8 grid gap-4" onSubmit={onSubmit}>
        <label className="grid gap-2 text-sm">
          Email
          <input required type="email" name="email" autoComplete="email" className="rounded-xl border border-white/15 bg-pine-900 px-4 py-3" />
        </label>
        <label className="grid gap-2 text-sm">
          Password
          <input required type="password" name="password" autoComplete="current-password" className="rounded-xl border border-white/15 bg-pine-900 px-4 py-3" />
        </label>
        <button disabled={pending} className="rounded-full bg-copper-500 px-5 py-3 text-sm font-medium" type="submit">
          {pending ? "Checking…" : "Enter workspace"}
        </button>
        {error ? <p className="text-sm text-copper-400">{error}</p> : null}
      </form>
      <p className="mt-6 text-sm text-parchment-100/60">
        No account yet? <Link href="/signup" className="text-brass-300">Create one</Link>
      </p>
    </section>
  );
}
