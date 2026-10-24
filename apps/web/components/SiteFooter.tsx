"use client";

import Link from "next/link";
import { Logo } from "./Logo";
import { useSite } from "./SiteProvider";

const columns = [
  {
    title: "Product",
    links: [
      ["/messaging", "Messaging"],
      ["/meetings", "Meetings"],
      ["/social", "Social Media"],
      ["/ads", "Google Ads"],
      ["/teams", "Teams"],
      ["/files", "Files"]
    ]
  },
  {
    title: "Features",
    links: [
      ["/features", "All features"],
      ["/scheduling", "Calendar"],
      ["/security", "Security"]
    ]
  },
  {
    title: "Solutions",
    links: [
      ["/solutions#individuals", "Individuals"],
      ["/solutions#teams", "Teams"],
      ["/solutions#agencies", "Agencies"]
    ]
  },
  {
    title: "Integrations",
    links: [
      ["/social", "Facebook"],
      ["/social", "Instagram"],
      ["/social", "TikTok"],
      ["/ads", "Google Ads"]
    ]
  },
  {
    title: "Resources",
    links: [
      ["/pricing", "Pricing"],
      ["/faq", "Help Center"],
      ["/contact", "Contact"]
    ]
  },
  {
    title: "Company",
    links: [
      ["/solutions", "About Takiia"],
      ["/contact", "Contact"],
      ["/billing", "Billing"]
    ]
  }
] as const;

const legalLinks = [
  ["/privacy", "Privacy Policy"],
  ["/terms", "Terms of Service"],
  ["/billing", "Billing & Cancellation"]
] as const;

export function SiteFooter() {
  const site = useSite();
  return (
    <footer className="border-t border-line bg-mist">
      <div className="site-wrap grid gap-10 py-16 md:grid-cols-2 xl:grid-cols-7">
        <div className="xl:col-span-1">
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-7 text-muted">{site.footer.blurb}</p>
          <Link href={site.footer.ctaHref} className="btn-primary mt-6 px-5 py-2.5">
            {site.footer.ctaLabel}
          </Link>
        </div>
        {columns.map((group) => (
          <div key={group.title}>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-navy">{group.title}</p>
            <ul className="mt-4 space-y-2.5 text-sm text-muted">
              {group.links.map(([href, label]) => (
                <li key={`${group.title}-${href}-${label}`}>
                  <Link href={href} className="font-medium transition hover:text-navy">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-line bg-white">
        <div className="site-wrap flex flex-col gap-3 py-5 text-xs font-medium text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Takiia. All rights reserved.</p>
          <ul className="flex flex-wrap gap-5">
            {legalLinks.map(([href, label]) => (
              <li key={href}>
                <Link href={href} className="hover:text-navy">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
