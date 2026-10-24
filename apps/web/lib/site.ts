export const site = {
  name: "Takiia",
  tagline: "Bring conversations, online meetings, team collaboration, and social publishing together in one workspace.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://127.0.0.1:3034"
};

export const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:3033";

export const nav = [
  { href: "/features", label: "Product" },
  { href: "/messaging", label: "Messaging" },
  { href: "/meetings", label: "Meetings" },
  { href: "/social", label: "Social Media" },
  { href: "/teams", label: "Teams" },
  { href: "/pricing", label: "Pricing" }
];

export const productLinks = [
  { href: "/messaging", label: "Messaging" },
  { href: "/meetings", label: "Meetings" },
  { href: "/social", label: "Social publishing" },
  { href: "/teams", label: "Teams" },
  { href: "/features", label: "Integrations" }
];

export const resourceLinks = [
  { href: "/faq", label: "Help Center" },
  { href: "/contact", label: "Documentation" }
];
