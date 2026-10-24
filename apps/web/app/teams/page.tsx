import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = { title: "Teams" };

export default function TeamsPage() {
  return (
    <>
      <PageHero
        eyebrow="Teams"
        title="Your team, your workspace, one clear workflow."
        lede="Invite members, assign roles, and keep conversations, files, and billing inside the workspace that owns them."
      />
      <section className="mx-auto grid max-w-7xl gap-5 px-5 pb-24 md:grid-cols-2">
        {[
          ["Roles", "Owner, admin, and member roles are enforced by the API, not by a value in the browser."],
          ["Invites", "Members join a workspace. They cannot open another workspace’s private inbox."],
          ["Shared work", "Channels, files, and events stay behind membership checks."],
          ["Admin controls", "Privileged actions write audit events."]
        ].map(([title, body]) => (
          <article key={title} className="glass rounded-3xl p-7">
            <h2 className="text-2xl font-semibold text-navy">{title}</h2>
            <p className="mt-3 leading-7 text-muted">{body}</p>
          </article>
        ))}
      </section>
    </>
  );
}
