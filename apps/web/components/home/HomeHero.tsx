import Link from "next/link";

const features = [
  { label: "Team Messaging", color: "bg-[#E7F1FF] text-[#3B82F6]", d: "M7 8h10M7 12h6M8 17l-2 3 4-2h8a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2z" },
  { label: "Online Meetings", color: "bg-[#E5F7FF] text-[#0EA5E9]", d: "M15 10l4-2v8l-4-2M5 8h10v8H5z" },
  { label: "Social Publishing", color: "bg-[#F3EAFF] text-[#8B5CF6]", d: "M8 7h8v10H8zM10 10h4M10 13h4" },
  { label: "Team Collaboration", color: "bg-[#E7FBF4] text-[#10B981]", d: "M12 12a3 3 0 1 0-3-3 3 3 0 0 0 3 3zm-6 8a6 6 0 0 1 12 0" }
];

export function HomeHero() {
  return (
    <section className="relative h-[calc(100svh-5.25rem)] overflow-hidden bg-[#e8f5fc]">
      <img
        src="/brand/takiia-hero-stage.jpg"
        alt="Takiia workspace on a laptop beside a team meeting on a phone"
        width={2560}
        height={1440}
        className="pointer-events-none absolute bottom-0 right-0 h-[96%] w-[min(68%,820px)] object-contain object-right-bottom sm:w-[min(64%,980px)] lg:w-[58%]"
      />
      <div className="relative z-10 flex h-full items-center px-5 sm:px-8 lg:px-12">
        <div className="w-full max-w-[34rem]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#7E93AB]">All-in-one workspace</p>
          <h1 className="mt-2 text-[clamp(1.7rem,4.6vh,3.35rem)] font-extrabold leading-[0.98] tracking-[-0.035em] text-[#0C1B36]">
            <span className="block">Chat, Meet and</span>
            <span className="block">Manage Social Media</span>
            <span className="block bg-gradient-to-r from-[#2EC8EE] to-[#3CE0B0] bg-clip-text text-transparent">All in One Place.</span>
          </h1>
          <p className="mt-3 max-w-[30rem] text-[clamp(0.8rem,1.7vh,1.02rem)] leading-snug text-[#66788C]">
            Bring your conversations, online meetings, team collaboration and social publishing together in one simple
            workspace. Spend less time switching tools and more time getting work done.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 rounded-full bg-[linear-gradient(90deg,#3B82F6_0%,#22C7E8_48%,#3CE0B0_100%)] px-6 py-2.5 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(34,199,232,0.35)]"
            >
              Get Started
              <span aria-hidden="true">→</span>
            </Link>
            <Link
              href="#workspace"
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#0C1B36] shadow-[0_8px_24px_rgba(15,40,70,0.08)]"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[linear-gradient(180deg,#2EC8EE,#3B82F6)] text-[10px] text-white" aria-hidden="true">
                ▶
              </span>
              Watch Video
            </Link>
          </div>
          <ul className="mt-4 grid max-w-[28rem] grid-cols-4 gap-2 text-center">
            {features.map((item) => (
              <li key={item.label}>
                <span className={`mx-auto flex h-11 w-11 items-center justify-center rounded-2xl shadow-[0_6px_16px_rgba(15,40,70,0.04)] ${item.color}`}>
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                    <path d={item.d} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="mt-1.5 block text-[11px] font-semibold leading-3 text-[#1E3354]">{item.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
