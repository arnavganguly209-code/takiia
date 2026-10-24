import Link from "next/link";
import { HeroStage } from "./HeroStage";
import { LineIcon } from "./Section";

const heroFeatures = [
  { label: "Team Messaging", d: "M5 8h10M5 12h6M7 17l-2 3 4-2h7a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7a3 3 0 0 0-3 3v7a3 3 0 0 0 3 3z" },
  { label: "Online Meetings", d: "M15 10l4-2v8l-4-2M5 8h10v8H5z" },
  { label: "Social Publishing", d: "M8 12h8M12 8v8M7 5h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z" },
  { label: "Team Collaboration", d: "M12 12a3 3 0 1 0-3-3 3 3 0 0 0 3 3zm-7 8a5 5 0 0 1 10 0M17 11a2.5 2.5 0 1 0-1-4.8" }
];

export function HomeHero() {
  return (
    <section className="relative overflow-hidden bg-hero">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(34,199,232,0.18),transparent_36%),radial-gradient(circle_at_88%_10%,rgba(103,232,197,0.2),transparent_34%)]" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 pb-20 pt-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-8 lg:pb-28 lg:pt-14">
        <div className="max-w-xl">
          <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-navy/70">All-in-one workspace</p>
          <h1 className="mt-4 text-[2.15rem] font-semibold leading-[1.08] tracking-tight text-navy sm:text-5xl lg:text-[3.4rem]">
            Chat, Meet and Manage{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-mint-400 bg-clip-text text-transparent">Social Media</span>{" "}
            — All in One Place.
          </h1>
          <p className="mt-5 max-w-lg text-base leading-7 text-muted sm:text-lg sm:leading-8">
            Bring your conversations, online meetings, team collaboration and social publishing together in one simple
            workspace. Spend less time switching tools and more time getting work done.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/signup" className="btn-primary gap-2 px-6 py-3">
              Get Started
              <span aria-hidden="true">→</span>
            </Link>
            <Link href="#workspace" className="btn-secondary gap-2 px-6 py-3">
              <span aria-hidden="true" className="flex h-5 w-5 items-center justify-center rounded-full bg-navy text-[10px] text-white">
                ▶
              </span>
              Watch Demo
            </Link>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-3 text-sm sm:max-w-lg">
            {heroFeatures.map((item) => (
              <div key={item.label} className="glass-soft flex items-center gap-3 rounded-2xl px-3 py-3 font-semibold text-navy">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-pale text-brand-500">
                  <LineIcon d={item.d} />
                </span>
                {item.label}
              </div>
            ))}
          </div>
        </div>
        <HeroStage />
      </div>
    </section>
  );
}
