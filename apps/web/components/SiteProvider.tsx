"use client";

import { createContext, useContext, type ReactNode } from "react";
import { defaultSiteContent, type SiteContent } from "@/lib/site-content";

const SiteContext = createContext<SiteContent>(defaultSiteContent);

export function SiteProvider({ initial, children }: { initial: SiteContent; children: ReactNode }) {
  return <SiteContext.Provider value={initial}>{children}</SiteContext.Provider>;
}

export function useSite() {
  return useContext(SiteContext);
}
