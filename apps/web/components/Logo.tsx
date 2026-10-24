"use client";

import { useSite } from "./SiteProvider";

export function Logo({ compact = false }: { compact?: boolean }) {
  const site = useSite();
  return (
    <span className="inline-flex items-center gap-2.5 text-navy">
      <img src={site.brand.logoSrc} alt="" className={compact ? "h-8 w-auto" : "h-10 w-auto"} />
      {compact ? <span className="sr-only">{site.brand.name}</span> : null}
    </span>
  );
}
