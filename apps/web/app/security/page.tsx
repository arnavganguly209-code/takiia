import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = { title: "Security" };

export default function SecurityPage() {
  return (
    <>
      <PageHero
        eyebrow="Security"
        title="Controls that sit in the request path."
        lede="Takiia uses hashed passwords, hashed session tokens, CSRF on mutating routes, workspace authorization, and localhost-only production binds."
      />
      <section className="mx-auto grid max-w-5xl gap-4 px-5 pb-24">
        {[
          ["Sessions", "Tokens are random, stored as SHA-256 hashes, and expire."],
          ["CSRF", "Cookie plus header comparison on state-changing API calls after login."],
          ["Authorization", "Workspace and conversation membership is checked on the server."],
          ["Secrets", "DATABASE_URL and provider keys stay in VPS env files, never NEXT_PUBLIC_*."],
          ["Network", "Production API binds 127.0.0.1:3033. PostgreSQL is not exposed publicly."]
        ].map(([title, body]) => (
          <article key={title} className="grid gap-2 rounded-2xl border border-white/10 px-6 py-5 md:grid-cols-[180px_1fr]">
            <h2 className="font-medium text-brass-300">{title}</h2>
            <p className="text-parchment-100/75">{body}</p>
          </article>
        ))}
      </section>
    </>
  );
}
