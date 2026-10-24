import Link from "next/link";

const features = [
  {
    label: "Team Messaging",
    tile: "bg-[#E7F2FF]",
    ink: "text-[#2F6FE4]",
    d: "M5 7.5A2.5 2.5 0 0 1 7.5 5h6A2.5 2.5 0 0 1 16 7.5v4A2.5 2.5 0 0 1 13.5 14H9l-3 2.5V14H7.5A2.5 2.5 0 0 1 5 11.5z"
  },
  {
    label: "Online Meetings",
    tile: "bg-[#E5F8FF]",
    ink: "text-[#14B4D4]",
    d: "M4.5 8.5h9.5v7H4.5zM14 10.2l5-2.2v8l-5-2.2z"
  },
  {
    label: "Social Publishing",
    tile: "bg-[#F3EAFF]",
    ink: "text-[#8B5CF6]",
    d: "M7 5.5h10v3H7zM6 10h12v3H6zM7.5 14.5h9v3h-9z"
  },
  {
    label: "Team Collaboration",
    tile: "bg-[#E7FBF4]",
    ink: "text-[#14B981]",
    d: "M9 11a2.2 2.2 0 1 0-2.2-2.2A2.2 2.2 0 0 0 9 11zm6.2.4a1.8 1.8 0 1 0-1.8-1.8 1.8 1.8 0 0 0 1.8 1.8zM4.2 17.2a4.2 4.2 0 0 1 8.2 0M12.2 17.2a3.4 3.4 0 0 1 5.6-2.6"
  }
];

export function HomeHero() {
  return (
    <section className="relative h-[calc(100svh-4.75rem)] overflow-hidden bg-[#d7eaf6]">
      <img
        src="/brand/takiia-devices-clean.jpg"
        alt="Takiia workspace on a laptop beside a team meeting on a phone"
        width={2560}
        height={1440}
        className="absolute bottom-0 right-0 top-0 h-full w-auto max-w-[70%] object-contain object-right"
      />
      <div className="relative z-10 flex h-full items-center px-6 sm:px-10 lg:px-14">
        <div className="w-full max-w-[34rem]">
          <p className="text-[12px] font-bold uppercase tracking-[0.22em] text-[#7C93AA]">All-in-one workspace</p>
          <h1 className="mt-3 text-[clamp(2rem,5.2vh,3.6rem)] font-black leading-[0.96] tracking-[-0.045em] text-[#0B1730]">
            <span className="block">Chat, Meet and</span>
            <span className="block">Manage Social Media</span>
            <span className="block bg-gradient-to-r from-[#21C6EA] to-[#3DE8B6] bg-clip-text text-transparent">All in One Place.</span>
          </h1>
          <p className="mt-4 max-w-[31rem] text-[clamp(0.9rem,1.8vh,1.05rem)] font-medium leading-relaxed text-[#5C6E84]">
            Bring your conversations, online meetings, team collaboration and social publishing together in one simple
            workspace. Spend less time switching tools and more time getting work done.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 rounded-full bg-[linear-gradient(90deg,#2F6BFF_0%,#22C7E8_52%,#3EE6B4_100%)] px-7 py-3 text-[15px] font-bold text-white shadow-[0_12px_28px_rgba(47,107,255,0.28)]"
            >
              Get Started
              <span aria-hidden="true">→</span>
            </Link>
            <Link
              href="#workspace"
              className="inline-flex items-center gap-2.5 rounded-full bg-white px-5 py-3 text-[15px] font-bold text-[#0B1730] shadow-[0_10px_24px_rgba(15,40,70,0.1)]"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0B1730] text-[11px] text-white" aria-hidden="true">
                ▶
              </span>
              Watch Video
            </Link>
          </div>
          <ul className="mt-6 grid max-w-[32rem] grid-cols-4 gap-3 text-center">
            {features.map((item) => (
              <li key={item.label}>
                <span className={`mx-auto flex h-[3.25rem] w-[3.25rem] items-center justify-center rounded-[1.05rem] ${item.tile} ${item.ink}`}>
                  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
                    <path d={item.d} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="mt-2 block text-[13px] font-bold leading-4 text-[#142033]">{item.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
