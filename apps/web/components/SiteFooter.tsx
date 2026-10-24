import Link from "next/link";
import { Logo } from "./Logo";

const groups = [
  {
    title: "Product",
    links: [
      ["/features", "Overview"],
      ["/messaging", "Messaging"],
      ["/meetings", "Meetings"],
      ["/social", "Social"]
    ]
  },
  {
    title: "Company",
    links: [
      ["/pricing", "Pricing"],
      ["/security", "Security"],
      ["/privacy", "Privacy"],
      ["/faq", "FAQ"]
    ]
  },
  {
    title: "Access",
    links: [
      ["/contact", "Contact"],
      ["/login", "Sign in"],
      ["/signup", "Sign up"],
      ["/dashboard", "Dashboard"]
    ]
  }
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-pine-900/70">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-4">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-6 text-parchment-100/70">
            A workspace for team messaging, scheduled meetings, and social publishing queues.
          </p>
        </div>
        {groups.map((group) => (
          <div key={group.title}>
            <p className="text-xs uppercase tracking-[0.2em] text-brass-400">{group.title}</p>
            <ul className="mt-4 space-y-2 text-sm text-parchment-100/75">
              {group.links.map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="hover:text-white">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10 px-5 py-5 text-center text-xs text-parchment-100/50">
        © {new Date().getFullYear()} Takiia. All rights reserved.
      </div>
    </footer>
  );
}
