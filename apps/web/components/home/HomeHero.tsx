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
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#f7fbff_0%,#ffffff_70%)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(34,199,232,0.18),transparent_32%),radial-gradient(circle_at_12%_80%,rgba(103,232,197,0.12),transparent_28%)]" />
      <svg className="pointer-events-none absolute right-0 top-8 hidden h-40 w-[46%] text-[#22C7E8]/30 lg:block" viewBox="0 0 600 160" fill="none" aria-hidden="true">
        <path d="M0 90C80 40 140 130 220 80C300 30 380 120 460 70C520 36 560 50 600 40" stroke="currentColor" strokeWidth="2" />
        <path d="M20 120C110 70 170 140 250 96C340 46 410 130 520 86" stroke="currentColor" strokeWidth="1.5" />
      </svg>
      <div className="relative mx-auto grid max-w-[1180px] items-center gap-8 px-5 py-8 sm:py-12 lg:grid-cols-[0.86fr_1.14fr] lg:gap-6 lg:py-14">
        <div className="max-w-xl">
          <p className="inline-flex rounded-full bg-white/80 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.22em] text-[#14264A]/70">
            All-in-one workspace
          </p>
          <h1 className="mt-4 text-[2.05rem] font-semibold leading-[1.02] tracking-tight text-[#14264A] sm:text-5xl lg:text-[3.05rem]">
            <span className="block">Chat, Meet and</span>
            <span className="block">Manage Social Media</span>
            <span className="block bg-gradient-to-r from-[#22C7E8] to-[#3dE8B0] bg-clip-text text-transparent">All in One Place.</span>
          </h1>
          <p className="mt-4 max-w-md text-[15px] leading-7 text-[#66758B] sm:text-base">
            Bring your conversations, online meetings, team collaboration and social publishing together in one simple
            workspace. Spend less time switching tools and more time getting work done.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link href="/signup" className="btn-primary gap-2 px-6 py-3">
              Get Started
              <span aria-hidden="true">→</span>
            </Link>
            <Link href="#workspace" className="inline-flex items-center gap-2 rounded-full border border-[#E5ECF5] bg-white px-5 py-3 text-sm font-semibold text-[#14264A] shadow-soft">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#14264A] text-[10px] text-white" aria-hidden="true">
                ▶
              </span>
              Watch Video
            </Link>
          </div>
          <ul className="mt-7 grid grid-cols-4 gap-2 text-center sm:max-w-lg">
            {features.map((item) => (
              <li key={item.label}>
                <span className={`mx-auto flex h-11 w-11 items-center justify-center rounded-2xl ${item.color}`}>
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                    <path d={item.d} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="mt-2 block text-[11px] font-semibold leading-4 text-[#14264A] sm:text-xs">{item.label}</span>
              </li>
            ))}
          </ul>
        </div>
        <HeroDevices />
      </div>
    </section>
  );
}
