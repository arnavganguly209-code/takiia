"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

export function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const orbit = pathname.startsWith("/orbit");

  return (
    <>
      {orbit ? null : <SiteHeader />}
      <main id="main">{children}</main>
      {orbit ? null : <SiteFooter />}
    </>
  );
}
