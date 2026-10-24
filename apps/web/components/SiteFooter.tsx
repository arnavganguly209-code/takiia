import Link from "next/link";
import { Logo } from "./Logo";

const columns = [
  {
    title: "Product",
    links: [
      ["/messaging", "Messaging"],
      ["/meetings", "Meetings"],
      ["/social", "Social Media Management"],
      ["/teams", "Team Collaboration"],
      ["/scheduling", "Calendar & Scheduling"],
      ["/files", "File Sharing"]
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
    title: "Resources",
    links: [
      ["/faq", "Help Center"],
      ["/contact", "Contact"]
    ]
  },
  {
    title: "Company",
    links: [
      ["/solutions", "About Takiia"],
      ["/contact", "Contact"],
      ["/pricing", "Pricing"]
    ]
  }
] as const;

const legalLinks = [
  ["/privacy", "Privacy Policy"],
  ["/terms", "Terms of Service"],
  ["/billing", "Billing & Cancellation"]
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-mist">
      <div className="site-wrap grid gap-12 py-16 md:grid-cols-2 xl:grid-cols-6">
        <div className="xl:col-span-2">
          <Logo />
          <p className="mt-4 max-w-sm text-sm leading-7 text-muted">
            Takiia brings messaging, meetings, team collaboration and social publishing together in one organized
            workspace.
          </p>
          <div className="mt-5 h-1 w-16 rounded-full bg-gradient-to-r from-cyan-400 to-mint-400" />
        </div>
        {columns.map((group) => (
          <div key={group.title}>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-navy">{group.title}</p>
            <ul className="mt-4 space-y-2 text-sm text-muted">
              {group.links.map(([href, label]) => (
                <li key={`${href}-${label}`}>
                  <Link href={href} className="transition hover:text-navy">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-line">
        <div className="site-wrap flex flex-col gap-3 py-5 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Takiia. All rights reserved.</p>
          <ul className="flex flex-wrap gap-4">
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
