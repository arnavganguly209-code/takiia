import Link from "next/link";

const features = [
  { label: "Team Messaging", color: "bg-[#E8F3FF] text-[#2F6BFF]", d: "M7 8h10M7 12h6M8 17l-2 3 4-2h8a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2z" },
  { label: "Online Meetings", color: "bg-[#E6F8FF] text-[#0EA5C6]", d: "M15 10l4-2v8l-4-2M5 8h10v8H5z" },
  { label: "Social Publishing", color: "bg-[#F3EEFF] text-[#7C3AED]", d: "M8 7h8v10H8zM10 10h4M10 13h4" },
  { label: "Team Collaboration", color: "bg-[#E8FFF6] text-[#10B981]", d: "M12 12a3 3 0 1 0-3-3 3 3 0 0 0 3 3zm-6 8a6 6 0 0 1 12 0" }
];

export function HomeHero() {
  return (
    <section className="relative h-[calc(100svh-4.75rem)] overflow-hidden bg-[#e7f4fb]">
      <img
        src="/brand/takiia-hero-devices.jpg"
        alt="Takiia workspace on a laptop beside a team meeting on a phone"
        width={2560}
        height={1440}
        className="pointer-events-none absolute right-0 top-1/2 h-auto max-h-[88%] w-auto max-w-[63%] -translate-y-1/2 object-contain [mask-image:linear-gradient(90deg,transparent,#000_16%)]"
      />
      <div className="relative z-10 flex h-full items-center px-5 sm:px-8 lg:w-[48%] lg:px-12 xl:px-16">
        <div className="w-full max-w-[36rem]">
          <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#8AA0B8]">All-in-one workspace</p>
          <h1 className="mt-3 text-[clamp(1.85rem,5vh,3.45rem)] font-black leading-[0.96] tracking-[-0.04em] text-[#0B1730]">
            <span className="block">Chat, Meet and</span>
            <span className="block">Manage Social Media</span>
            <span className="block bg-gradient-to-r from-[#22C7E8] to-[#3EE6B4] bg-clip-text text-transparent">All in One Place.</span>
          </h1>
          <p className="mt-3 max-w-[32rem] text-[clamp(0.82rem,1.8vh,1.05rem)] leading-relaxed text-[#5E7086]">
            Bring your conversations, online meetings, team collaboration and social publishing together in one simple
            workspace. Spend less time switching tools and more time getting work done.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 rounded-full bg-[linear-gradient(90deg,#2F6BFF_0%,#22C7E8_55%,#3EE6B4_100%)] px-6 py-3 text-sm font-bold text-white shadow-[0_12px_28px_rgba(47,107,255,0.28)]"
            >
              Get Started
              <span aria-hidden="true">→</span>
            </Link>
            <Link
              href="#workspace"
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-[#0B1730] shadow-[0_10px_24px_rgba(15,40,70,0.1)]"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0B1730] text-[10px] text-white" aria-hidden="true">
                ▶
              </span>
              Watch Video
            </Link>
          </div>
          <ul className="mt-5 grid max-w-[30rem] grid-cols-4 gap-2 text-center">
            {features.map((item) => (
              <li key={item.label}>
                <span className={`mx-auto flex h-12 w-12 items-center justify-center rounded-2xl ${item.color}`}>
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                    <path d={item.d} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="mt-2 block text-[11px] font-semibold leading-3 text-[#1B2942]">{item.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
