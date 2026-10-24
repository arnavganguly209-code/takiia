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
      <div className="glass rounded-3xl p-8">
        <h1 className="text-4xl font-semibold text-navy">Get Started</h1>
        <p className="mt-3 text-sm text-muted">Password must be at least 12 characters and include a letter and a number.</p>
        <form className="mt-8 grid gap-4" onSubmit={onSubmit}>
          <label className="grid gap-2 text-sm text-navy">
            Your name
            <input required name="displayName" autoComplete="name" className="field" />
          </label>
          <label className="grid gap-2 text-sm text-navy">
            Workspace name
            <input name="workspaceName" className="field" />
          </label>
          <label className="grid gap-2 text-sm text-navy">
            Email
            <input required type="email" name="email" autoComplete="email" className="field" />
          </label>
          <label className="grid gap-2 text-sm text-navy">
            Password
            <input required type="password" name="password" autoComplete="new-password" className="field" />
          </label>
          <button disabled={pending} className="btn-primary" type="submit">
            {pending ? "Creating…" : "Create account"}
          </button>
          {error ? <p className="text-sm text-red-600">{error}</p> : null}
        </form>
        <p className="mt-6 text-sm text-muted">
          Already registered?{" "}
          <Link href="/login" className="font-medium text-brand-500">
            Log in
          </Link>
        </p>
      </div>
    </section>
  );
}
