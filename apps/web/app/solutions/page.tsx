import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = { title: "Solutions" };

const items = [
  {
    id: "individuals",
    title: "Individuals",
    body: "Create one workspace, keep your inbox and drafts together, and invite others when the work needs a team. A separate consumer social app is not claimed."
  },
  {
    id: "teams",
    title: "Teams",
    body: "Owners, admins, and members stay isolated by workspace. Conversations, files, and meeting records follow membership checks on the server."
  },
  {
    id: "agencies",
    title: "Agencies",
    body: "The Agency plan raises member, account, post, storage, and meeting limits. Client workspaces stay separate. Live multi-client publishing still needs official platform credentials."
  }
];

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Solutions"
        title="The same workspace, different plan limits."
        lede="Individuals, teams, and agencies use the same product. What changes is membership, storage, and publishing quota—not a different invented feature set."
      />
      <section className="site-wrap grid gap-5 pb-24 md:grid-cols-3">
        {items.map((item) => (
          <article id={item.id} key={item.id} className="scroll-mt-28 rounded-3xl border border-line bg-white p-7">
            <h2 className="text-2xl font-semibold text-navy">{item.title}</h2>
            <p className="mt-3 leading-7 text-muted">{item.body}</p>
          </article>
        ))}
      </section>
    </>
  );
}
