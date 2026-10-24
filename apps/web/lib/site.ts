export const site = {
  name: "Takiia",
  tagline: "Bring conversations, online meetings, team collaboration, and social publishing together in one workspace.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://127.0.0.1:3034"
};

export const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:3033";

export const nav = [
  { href: "/features", label: "Features" },
  { href: "/solutions", label: "Solutions" },
  { href: "/pricing", label: "Pricing" }
];

export const productLinks = [
  { href: "/messaging", label: "Messaging" },
  { href: "/meetings", label: "Meetings" },
  { href: "/social", label: "Social Media" },
  { href: "/teams", label: "Team Collaboration" },
  { href: "/scheduling", label: "Calendar & Scheduling" },
  { href: "/files", label: "File Sharing" }
];

export const resourceLinks = [
  { href: "/faq", label: "Help Center" },
  { href: "/contact", label: "Contact" }
];

export const publicPaths = [
  "/",
  "/features",
  "/messaging",
  "/meetings",
  "/social",
  "/teams",
  "/scheduling",
  "/files",
  "/solutions",
  "/pricing",
  "/security",
  "/privacy",
  "/terms",
  "/billing",
  "/faq",
  "/contact",
  "/login",
  "/signup"
];
