import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = { title: "Social" };

export default function SocialPage() {
  return (
    <>
      <PageHero
        eyebrow="Social"
        title="A publishing queue, not a pretend network."
        lede="Facebook, Instagram, and TikTok exist as first-class providers in the schema. Connect and publish stay blocked until official apps are approved."
      />
      <section className="mx-auto max-w-6xl px-5 pb-24">
        <div className="grid gap-5 md:grid-cols-3">
          {["Facebook", "Instagram", "TikTok"].map((name) => (
            <article key={name} className="rounded-3xl bg-parchment-100 p-6 text-pine-950">
              <h2 className="font-display text-3xl">{name}</h2>
              <p className="mt-3 text-sm leading-6">
                Structure is ready. OAuth and live publishing require developer credentials and platform review.
              </p>
              <p className="mt-6 text-xs uppercase tracking-[0.2em] text-copper-600">Unconfigured</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
