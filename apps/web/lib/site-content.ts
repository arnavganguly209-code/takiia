export type NavItem = { href: string; label: string };
export type TextCard = { title: string; body: string };
export type FaqItem = { q: string; a: string };

export type SiteSection = {
  eyebrow: string;
  title: string;
  copy: string;
  actionLabel?: string;
  actionHref?: string;
  imageSrc?: string;
  note?: string;
  cards: TextCard[];
};

export type SiteContent = {
  brand: {
    name: string;
    logoSrc: string;
    tagline: string;
  };
  header: {
    productLabel: string;
    resourcesLabel: string;
    loginLabel: string;
    ctaLabel: string;
    ctaHref: string;
    nav: NavItem[];
    product: NavItem[];
    resources: NavItem[];
  };
  hero: {
    eyebrow: string;
    line1: string;
    line2: string;
    line3: string;
    body: string;
    primaryLabel: string;
    primaryHref: string;
    secondaryLabel: string;
    secondaryHref: string;
    imageSrc: string;
    imageAlt: string;
    features: string[];
  };
  capabilities: NavItem[];
  sections: {
    why: SiteSection;
    workspace: SiteSection;
    messaging: SiteSection;
    social: SiteSection;
    meetings: SiteSection;
    teams: SiteSection;
    schedule: SiteSection;
    files: SiteSection;
    integrations: SiteSection;
    workflow: SiteSection;
    security: SiteSection;
    how: SiteSection;
    pricing: SiteSection;
    faq: SiteSection;
  };
  faqs: FaqItem[];
  cta: {
    eyebrow: string;
    title: string;
    copy: string;
    primaryLabel: string;
    primaryHref: string;
    secondaryLabel: string;
    secondaryHref: string;
  };
  footer: {
    blurb: string;
    ctaLabel: string;
    ctaHref: string;
  };
};

export const defaultSiteContent: SiteContent = {
  brand: {
    name: "Takiia",
    logoSrc: "/brand/takiia-logo.png",
    tagline: "Bring conversations, online meetings, team collaboration, and social publishing together in one workspace."
  },
  header: {
    productLabel: "Product",
    resourcesLabel: "Resources",
    loginLabel: "Log in",
    ctaLabel: "Get Started",
    ctaHref: "/signup",
    nav: [
      { href: "/features", label: "Features" },
      { href: "/solutions", label: "Solutions" },
      { href: "/pricing", label: "Pricing" }
    ],
    product: [
      { href: "/messaging", label: "Messaging" },
      { href: "/meetings", label: "Meetings" },
      { href: "/social", label: "Social Media" },
      { href: "/teams", label: "Team Collaboration" },
      { href: "/scheduling", label: "Calendar & Scheduling" },
      { href: "/files", label: "File Sharing" }
    ],
    resources: [
      { href: "/faq", label: "Help Center" },
      { href: "/contact", label: "Contact" }
    ]
  },
  hero: {
    eyebrow: "All-in-one workspace",
    line1: "Chat, Meet and",
    line2: "Manage Social Media",
    line3: "All in One Place.",
    body: "Bring your conversations, online meetings, team collaboration and social publishing together in one simple workspace. Spend less time switching tools and more time getting work done.",
    primaryLabel: "Get Started",
    primaryHref: "/signup",
    secondaryLabel: "Watch Video",
    secondaryHref: "#workspace",
    imageSrc: "/brand/takiia-hero-blend.jpg",
    imageAlt: "Takiia workspace on a laptop beside a team meeting on a phone",
    features: ["Team Messaging", "Online Meetings", "Social Publishing", "Team Collaboration"]
  },
  capabilities: [
    { href: "#messaging", label: "Messages" },
    { href: "#meetings", label: "Meetings" },
    { href: "#social", label: "Social Media" },
    { href: "#teams", label: "Teams" },
    { href: "#files", label: "Files" },
    { href: "#schedule", label: "Events" },
    { href: "#workflow", label: "Notifications" },
    { href: "#schedule", label: "Scheduling" }
  ],
  sections: {
    why: {
      eyebrow: "Why Takiia",
      title: "Everything Your Team Needs, Without the Constant Switching.",
      copy: "Bring conversations, meetings, social publishing and team collaboration into one organized workspace.",
      note: "Takiia is one signed-in workspace. It does not replace every outside service, and it does not invent time-saved claims.",
      cards: [
        {
          title: "Too Many Tools",
          body: "Chat, meetings, and publishing often live in separate products. Switching tabs adds context you have to rebuild every time."
        },
        {
          title: "Scattered Work",
          body: "Messages, drafts, and schedules fragment across inboxes. Takiia keeps those records in one workspace membership model."
        },
        {
          title: "Limited Visibility",
          body: "A centralized view of conversations, meetings, and publishing status is useful only when it reads authorized workspace data."
        }
      ]
    },
    workspace: {
      eyebrow: "One connected workspace",
      title: "One Clear View of Your Team’s Work.",
      copy: "See conversations, upcoming meetings, scheduled posts and team activity in one organized workspace.",
      cards: []
    },
    messaging: {
      eyebrow: "Messaging",
      title: "Conversations That Keep Work Moving.",
      copy: "Stay connected through direct messages, group conversations and team channels in one organized interface.",
      actionLabel: "Explore Messaging",
      actionHref: "/messaging",
      cards: [
        { title: "Direct and group chat", body: "Conversations stay scoped to a workspace, with membership-checked reads." },
        { title: "History and search", body: "Message history, pagination, search, and unread counts stay with the inbox." },
        { title: "Authenticated files", body: "Image and document attachments download only after a signed-in, authorized request." },
        { title: "Workspace access", body: "In-app notifications and server-side access controls follow workspace membership." }
      ]
    },
    social: {
      eyebrow: "Social media management",
      title: "Plan Once. Publish Across Your Connected Channels.",
      copy: "Create content, organize your publishing calendar and manage supported social accounts from one workspace. Automatic publishing waits on official Facebook, Instagram, and TikTok credentials.",
      actionLabel: "Explore Social Media Management",
      actionHref: "/social",
      cards: [
        { title: "Connect supported accounts", body: "Facebook, Instagram, and TikTok appear as connected only after official credentials exist." },
        { title: "Drafts and media", body: "Create drafts, edit captions, and upload supported media before anything is queued." },
        { title: "Calendar and queue", body: "Schedule content and watch publishing status, retries, and failures in one place." },
        { title: "Analytics when live", body: "Charts stay sample-only until a connected account can supply real publishing data." }
      ]
    },
    meetings: {
      eyebrow: "Online meetings",
      title: "Bring Everyone Together, Wherever They Work.",
      copy: "Plan meetings, invite participants and keep join records next to the workspace inbox. Live audio, video, mute, camera, and screen share stay marked planned until a verified media path exists.",
      actionLabel: "Explore Meetings",
      actionHref: "/meetings",
      cards: [
        { title: "Meeting records", body: "Create meetings, store hosts and participants, and keep join records with the inbox." },
        { title: "Calendar scheduling", body: "Meetings land on the workspace calendar. Participant limits come from the plan." },
        { title: "Live media path", body: "Audio, video, mute, camera, and screen share wait on a verified TURN or LiveKit path." },
        { title: "Reminders", body: "In-app reminders send when notification delivery is configured. Email waits on SMTP." }
      ]
    },
    teams: {
      eyebrow: "Team collaboration",
      title: "Your Team, Connected Around the Work.",
      copy: "Keep your people, conversations, shared workspaces and everyday coordination organized. Task boards are not part of the current product.",
      actionLabel: "Explore Teams",
      actionHref: "/teams",
      cards: [
        { title: "Members and roles", body: "Owners, admins, and members stay behind workspace membership checks." },
        { title: "Invites", body: "The first account creates a workspace you can invite others into." },
        { title: "Shared files", body: "Documents stay attached to conversations and the workspace that owns them." },
        { title: "Audit events", body: "Membership and access events stay in the workspace record. No invented activity feed stats." }
      ]
    },
    schedule: {
      eyebrow: "Calendar & scheduling",
      title: "Keep Every Important Moment on Schedule.",
      copy: "Bring supported meetings, events and social publishing schedules into one clear calendar. External calendar sync is not configured.",
      actionLabel: "Explore Scheduling",
      actionHref: "/scheduling",
      cards: []
    },
    files: {
      eyebrow: "Files & attachments",
      title: "Share the Files Your Team Needs.",
      copy: "Keep shared documents and media connected to the conversations and workspaces where they belong. End-to-end encryption is not claimed.",
      actionLabel: "Explore File Sharing",
      actionHref: "/files",
      cards: []
    },
    integrations: {
      eyebrow: "Integrations",
      title: "Connect the Platforms You Already Use.",
      copy: "Bring supported social publishing workflows into your Takiia workspace. No account is shown as connected unless an authorized connection exists.",
      cards: [
        { title: "Facebook", body: "Page and post publishing after official app review." },
        { title: "Instagram", body: "Supported media and permissions after official credentials." },
        { title: "TikTok", body: "Account connection and publishing after official approval." }
      ]
    },
    workflow: {
      eyebrow: "Smarter workflows",
      title: "Less Manual Coordination. More Organized Work.",
      copy: "Available today: scheduled social jobs, queue status, meeting records, in-app notices, and usage-limit errors from the API. An advanced automation builder is not implemented.",
      cards: []
    },
    security: {
      eyebrow: "Security & privacy",
      title: "Your Workspace. Your Data. Your Control.",
      copy: "These controls sit in the request path. No certifications, compliance badges, or guarantees are claimed here.",
      actionLabel: "Read security details",
      actionHref: "/security",
      cards: []
    },
    how: {
      eyebrow: "Get started",
      title: "Start Working Together in Four Simple Steps.",
      copy: "",
      cards: [
        { title: "Create your account", body: "Sign up with an email and a 12-character password." },
        { title: "Set up your workspace", body: "The first account creates a workspace you can invite others into." },
        { title: "Connect supported social accounts", body: "Only after official Facebook, Instagram, or TikTok credentials exist." },
        { title: "Start messaging, scheduling and collaborating", body: "Inbox, meeting records, and drafts are available after sign-in." }
      ]
    },
    pricing: {
      eyebrow: "Plans & pricing",
      title: "Choose a Plan That Fits Your Workflow.",
      copy: "Start with the capabilities you need and choose a plan with clear usage limits. Amounts are proposed commercial defaults until a payment provider is wired.",
      actionLabel: "View Full Pricing",
      actionHref: "/pricing",
      cards: []
    },
    faq: {
      eyebrow: "FAQ",
      title: "Questions? We’re Here to Help.",
      copy: "",
      cards: []
    }
  },
  faqs: [
    { q: "What is Takiia?", a: "Takiia is a workspace for team messaging, meeting records, calendars, files, and social scheduling." },
    { q: "Which tools does Takiia bring together?", a: "Inbox, meeting records, workspace membership, file attachments, and a social publishing queue share one signed-in workspace." },
    { q: "Can I manage Facebook, Instagram and TikTok from one dashboard?", a: "Those platforms are modeled in the product. Live publishing needs official OAuth credentials, token storage, and platform review." },
    { q: "Does every social platform support automatic publishing?", a: "No. Each official API has its own account, media, and permission rules. Missing credentials are shown as unconfigured, not as a successful post." },
    { q: "Can I create team conversations?", a: "Yes. Direct messages, group conversations, roles, and workspace isolation are implemented in the API." },
    { q: "How do online meetings work?", a: "You can create meetings, store participants, and keep events on the workspace calendar. Plan participant limits are enforced." },
    { q: "Are audio and video calling available?", a: "Join records exist. Live audio and video are not treated as production calling until ICE, TURN or LiveKit, and a verified network path are configured and tested." },
    { q: "What happens when my subscription limit is reached?", a: "The API rejects the extra member, post, file, or meeting. The UI should offer an upgrade path rather than inventing capacity." },
    { q: "Can I upgrade or cancel my plan?", a: "Plan records exist. Checkout, renewals, and cancellations stay pending until a payment provider is configured." },
    { q: "Are WhatsApp Business messages included?", a: "No. Takiia messaging is its own service and does not send WhatsApp messages." },
    { q: "How are attachments protected?", a: "Uploads use type and size checks. Downloads are authenticated and membership-checked. They are not public links." },
    { q: "Which payment methods are supported?", a: "No payment provider is configured yet, so card, wallet, or invoice checkout is not offered." }
  ],
  cta: {
    eyebrow: "Start in one workspace",
    title: "Bring Your Conversations and Workflows Together.",
    copy: "Manage communication, meetings, team collaboration and social publishing from one organized workspace.",
    primaryLabel: "Get Started",
    primaryHref: "/signup",
    secondaryLabel: "View Pricing",
    secondaryHref: "/pricing"
  },
  footer: {
    blurb: "Takiia brings messaging, meetings, team collaboration and social publishing together in one organized workspace.",
    ctaLabel: "Get Started",
    ctaHref: "/signup"
  }
};

export const sectionOrder = [
  "why",
  "workspace",
  "messaging",
  "social",
  "meetings",
  "teams",
  "schedule",
  "files",
  "integrations",
  "workflow",
  "security",
  "how",
  "pricing",
  "faq"
] as const;

export type SectionId = (typeof sectionOrder)[number];

export function mergeSiteContent(base: SiteContent, incoming: unknown): SiteContent {
  if (!incoming || typeof incoming !== "object") {
    return structuredClone(base);
  }
  return deepMerge(structuredClone(base), incoming) as SiteContent;
}

function deepMerge(base: unknown, incoming: unknown): unknown {
  if (Array.isArray(incoming)) {
    return incoming.map((item) => (item && typeof item === "object" ? structuredClone(item) : item));
  }
  if (!incoming || typeof incoming !== "object" || Array.isArray(base) || !base || typeof base !== "object") {
    return incoming === undefined ? base : incoming;
  }
  const out: Record<string, unknown> = { ...(base as Record<string, unknown>) };
  for (const [key, value] of Object.entries(incoming as Record<string, unknown>)) {
    if (!(key in out)) {
      out[key] = value;
      continue;
    }
    out[key] = deepMerge(out[key], value);
  }
  return out;
}
