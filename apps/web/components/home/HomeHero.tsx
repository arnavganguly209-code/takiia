import Link from "next/link";
import { defaultSiteContent, type SiteContent } from "@/lib/site-content";

const featureMeta = [
  { tile: "bg-[#E8F3FF]", ink: "text-[#2F6FE4]", d: "M5 8h10M5 12h6M7 17l-2 3 4-2h7a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7a3 3 0 0 0-3 3v7a3 3 0 0 0 3 3z" },
  { tile: "bg-[#E6F8FF]", ink: "text-[#14B4D4]", d: "M15 10l4-2v8l-4-2M5 8h10v8H5z" },
  { tile: "bg-[#F4ECFF]", ink: "text-[#8B5CF6]", d: "M8 7h8v10H8zM10 10h4M10 13h4" },
  { tile: "bg-[#E8FBF4]", ink: "text-[#14B981]", d: "M12 12a3 3 0 1 0-3-3 3 3 0 0 0 3 3zm-6 8a6 6 0 0 1 12 0" }
];

export function HomeHero({ hero = defaultSiteContent.hero }: { hero?: SiteContent["hero"] }) {
  return (
    <section className="relative h-[calc(100svh-4.75rem)] overflow-hidden bg-[#edf6fb]">
      <img
        src={hero.imageSrc}
        alt={hero.imageAlt}
        width={2560}
        height={1440}
        className="absolute inset-0 h-full w-full object-cover object-[76%_82%]"
      />
      <div className="relative z-10 flex h-full items-center px-6 sm:px-10 lg:w-[46%] lg:px-14">
        <div className="w-full max-w-[36rem]">
          <p className="text-[12px] font-bold uppercase tracking-[0.22em] text-[#7C93AA]">{hero.eyebrow}</p>
          <h1 className="mt-3 text-[clamp(2rem,5.2vh,3.5rem)] font-black tracking-[-0.04em] text-[#0B1730]">
            <span className="block leading-none">{hero.line1}</span>
            <span className="mt-[0.28em] block leading-none">{hero.line2}</span>
            <span className="mt-[0.28em] block bg-gradient-to-r from-[#21C6EA] to-[#3DE8B6] bg-clip-text leading-none text-transparent">
              {hero.line3}
            </span>
          </h1>
          <p className="mt-5 max-w-[31rem] text-[clamp(0.9rem,1.8vh,1.05rem)] font-medium leading-7 text-[#5C6E84]">{hero.body}</p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              href={hero.primaryHref}
              className="inline-flex items-center gap-2 rounded-full bg-[linear-gradient(90deg,#2F6BFF_0%,#22C7E8_52%,#3EE6B4_100%)] px-7 py-3 text-[15px] font-bold text-white shadow-[0_12px_28px_rgba(47,107,255,0.28)]"
            >
              {hero.primaryLabel}
              <span aria-hidden="true">→</span>
            </Link>
            <Link
              href={hero.secondaryHref}
              className="inline-flex items-center gap-2.5 rounded-full bg-white px-5 py-3 text-[15px] font-bold text-[#0B1730] shadow-[0_10px_24px_rgba(15,40,70,0.1)]"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0B1730] text-[11px] text-white" aria-hidden="true">
                ▶
              </span>
              {hero.secondaryLabel}
            </Link>
          </div>
          <ul className="mt-7 grid max-w-[34rem] grid-cols-4 gap-4 text-center">
            {hero.features.map((label, index) => (
              <li key={label} className="min-w-0">
                <span className={`mx-auto flex h-12 w-12 items-center justify-center rounded-2xl ${featureMeta[index % featureMeta.length].tile} ${featureMeta[index % featureMeta.length].ink}`}>
                  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
                    <path d={featureMeta[index % featureMeta.length].d} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="mt-2 block text-[12px] font-bold leading-4 text-[#142033]">{label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
