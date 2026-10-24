import Link from "next/link";
import { Logo } from "./Logo";

const groups = [
  {
    title: "Product",
    links: [
      ["/features", "Features"],
      ["/messaging", "Messaging"],
      ["/meetings", "Meetings"],
      ["/social", "Social"],
      ["/teams", "Teams"]
    ]
  },
  {
    title: "Company",
    links: [
      ["/pricing", "Pricing"],
      ["/security", "Security"],
      ["/privacy", "Privacy"],
      ["/faq", "FAQ"],
      ["/contact", "Contact"]
    ]
  },
  {
    title: "Access",
    links: [
      ["/login", "Log in"],
      ["/signup", "Get Started"],
      ["/dashboard", "Dashboard"]
    ]
  }
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-mist">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:grid-cols-4">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-6 text-muted">
            A workspace for team messaging, scheduled meetings, and social publishing queues. Payments and third-party
            publishing stay off until those providers are configured.
          </p>
        </div>
        {groups.map((group) => (
          <div key={group.title}>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-navy">{group.title}</p>
            <ul className="mt-4 space-y-2 text-sm text-muted">
              {group.links.map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="hover:text-navy">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-line px-5 py-5 text-center text-xs text-muted">
        © {new Date().getFullYear()} Takiia. All rights reserved.
      </div>
    </footer>
  );
}
