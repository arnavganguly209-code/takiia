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
      <div className="glass rounded-3xl p-8">
        <h1 className="text-4xl font-semibold text-navy">Log in</h1>
        <p className="mt-3 text-sm text-muted">Sessions are stored as hashed tokens. Use an account created on this environment.</p>
        <form className="mt-8 grid gap-4" onSubmit={onSubmit}>
          <label className="grid gap-2 text-sm text-navy">
            Email
            <input required type="email" name="email" autoComplete="email" className="field" />
          </label>
          <label className="grid gap-2 text-sm text-navy">
            Password
            <input required type="password" name="password" autoComplete="current-password" className="field" />
          </label>
          <button disabled={pending} className="btn-primary" type="submit">
            {pending ? "Checking…" : "Enter workspace"}
          </button>
          {error ? <p className="text-sm text-red-600">{error}</p> : null}
        </form>
        <p className="mt-6 text-sm text-muted">
          No account yet?{" "}
          <Link href="/signup" className="font-medium text-brand-500">
            Get Started
          </Link>
        </p>
      </div>
    </section>
  );
}
