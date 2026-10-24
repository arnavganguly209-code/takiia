export const site = {
  name: "Takiia",
  tagline: "Chat, meet, and schedule social work in one workspace.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://127.0.0.1:3034"
};

export const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:3033";

export const nav = [
  { href: "/features", label: "Product" },
  { href: "/messaging", label: "Messaging" },
  { href: "/meetings", label: "Meetings" },
  { href: "/social", label: "Social" },
  { href: "/pricing", label: "Pricing" },
  { href: "/security", label: "Security" }
];
