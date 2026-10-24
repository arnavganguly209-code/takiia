import Link from "next/link";
import { HeroDevices } from "./HeroDevices";

const features = [
  { label: "Team Messaging", color: "bg-[#E8F3FF] text-[#2563EB]", d: "M7 8h10M7 12h6M8 17l-2 3 4-2h8a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2z" },
  { label: "Online Meetings", color: "bg-[#E7F8FF] text-[#0EA5C6]", d: "M15 10l4-2v8l-4-2M5 8h10v8H5z" },
  { label: "Social Publishing", color: "bg-[#F3EEFF] text-[#7C3AED]", d: "M8 7h8v10H8zM10 10h4M10 13h4" },
  { label: "Team Collaboration", color: "bg-[#E9FFF6] text-[#059669]", d: "M12 12a3 3 0 1 0-3-3 3 3 0 0 0 3 3zm-6 8a6 6 0 0 1 12 0" }
];

export function HomeHero() {
  return (
    <section className="relative h-[calc(100svh-5.25rem)] overflow-hidden bg-[linear-gradient(180deg,#f4f9ff_0%,#ffffff_68%)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_16%,rgba(34,199,232,0.16),transparent_34%),radial-gradient(circle_at_8%_88%,rgba(103,232,197,0.12),transparent_28%)]" />
      <svg className="pointer-events-none absolute right-[6%] top-[8%] hidden h-28 w-[42%] text-[#22C7E8]/35 lg:block" viewBox="0 0 600 160" fill="none" aria-hidden="true">
        <path d="M0 90C80 40 140 130 220 80C300 30 380 120 460 70C520 36 560 50 600 40" stroke="currentColor" strokeWidth="2" />
        <path d="M20 120C110 70 170 140 250 96C340 46 410 130 520 86" stroke="currentColor" strokeWidth="1.5" />
      </svg>
      <div className="relative mx-auto grid h-full max-w-[1280px] grid-rows-[auto_minmax(0,1fr)] items-center gap-1 px-4 py-2 sm:px-6 lg:grid-cols-[minmax(0,0.86fr)_minmax(0,1.14fr)] lg:grid-rows-1 lg:gap-3 lg:py-3">
        <div className="min-w-0">
          <p className="inline-flex rounded-full bg-white/80 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#14264A]/70">
            All-in-one workspace
          </p>
          <h1 className="mt-2 text-[clamp(1.55rem,4.5vh,3.05rem)] font-semibold leading-[1.02] tracking-tight text-[#14264A]">
            <span className="block">Chat, Meet and</span>
            <span className="block">Manage Social Media</span>
            <span className="block bg-gradient-to-r from-[#22C7E8] to-[#3dE8B0] bg-clip-text text-transparent">All in One Place.</span>
          </h1>
          <p className="mt-2 max-w-md text-[clamp(0.78rem,1.65vh,0.98rem)] leading-snug text-[#66758B]">
            Bring your conversations, online meetings, team collaboration and social publishing together in one simple
            workspace. Spend less time switching tools and more time getting work done.
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-2.5">
            <Link href="/signup" className="btn-primary gap-2 px-5 py-2">
              Get Started
              <span aria-hidden="true">→</span>
            </Link>
            <Link href="#workspace" className="inline-flex items-center gap-2 rounded-full border border-[#E5ECF5] bg-white px-4 py-2 text-sm font-semibold text-[#14264A] shadow-soft">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#14264A] text-[9px] text-white" aria-hidden="true">
                ▶
              </span>
              Watch Video
            </Link>
          </div>
          <ul className="mt-3 grid max-w-md grid-cols-4 gap-1.5 text-center">
            {features.map((item) => (
              <li key={item.label}>
                <span className={`mx-auto flex h-9 w-9 items-center justify-center rounded-xl ${item.color}`}>
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                    <path d={item.d} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="mt-1 block text-[10px] font-semibold leading-3 text-[#14264A] sm:text-[11px]">{item.label}</span>
              </li>
            ))}
          </ul>
        </div>
        <HeroDevices />
      </div>
    </section>
  );
}
