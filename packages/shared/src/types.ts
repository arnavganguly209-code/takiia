export const workspaceRoles = ["owner", "admin", "member"] as const;
export type WorkspaceRole = (typeof workspaceRoles)[number];

export const conversationKinds = ["direct", "group"] as const;
export type ConversationKind = (typeof conversationKinds)[number];

export const meetingStatuses = ["scheduled", "live", "ended", "cancelled"] as const;
export type MeetingStatus = (typeof meetingStatuses)[number];

export const socialProviders = ["facebook", "instagram", "tiktok"] as const;
export type SocialProvider = (typeof socialProviders)[number];

export const scheduledPostStatuses = [
  "draft",
  "queued",
  "publishing",
  "published",
  "failed",
  "cancelled"
] as const;
export type ScheduledPostStatus = (typeof scheduledPostStatuses)[number];

export const subscriptionStatuses = [
  "incomplete",
  "trialing",
  "active",
  "past_due",
  "cancelled"
] as const;
export type SubscriptionStatus = (typeof subscriptionStatuses)[number];

export const featureFlags = [
  "payments",
  "emailDelivery",
  "socialPublish",
  "webrtcCalls",
  "livekitMeetings"
] as const;
export type FeatureFlagName = (typeof featureFlags)[number];

export type PublicUser = {
  id: string;
  email: string;
  displayName: string;
  createdAt: string;
};

export type HealthPayload = {
  status: "ok";
  service: "takiia-api";
  time: string;
};

export type ReadinessPayload = {
  status: "ready" | "not_ready";
  database: "up" | "down";
  time: string;
};
