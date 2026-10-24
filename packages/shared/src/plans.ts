export const planKeys = ["starter", "pro", "business", "agency"] as const;
export type PlanKey = (typeof planKeys)[number];

export type PlanLimits = {
  members: number;
  socialAccounts: number;
  scheduledPostsPerMonth: number;
  storageMb: number;
  meetingsPerMonth: number;
};

export const defaultPlanCatalog: Record<
  PlanKey,
  { name: string; description: string; proposedMonthlyUsd: number; limits: PlanLimits }
> = {
  starter: {
    name: "Starter",
    description: "One user with workspace chat, a light publishing queue, and Google Ads setup when credentials exist.",
    proposedMonthlyUsd: 9,
    limits: {
      members: 1,
      socialAccounts: 3,
      scheduledPostsPerMonth: 60,
      storageMb: 2048,
      meetingsPerMonth: 10
    }
  },
  pro: {
    name: "Pro",
    description: "One user with higher storage, more scheduled posts, and expanded analytics where a provider supplies them.",
    proposedMonthlyUsd: 19,
    limits: {
      members: 1,
      socialAccounts: 10,
      scheduledPostsPerMonth: 300,
      storageMb: 10240,
      meetingsPerMonth: 40
    }
  },
  business: {
    name: "Business",
    description: "Up to five members with team roles, higher quotas, and advertising management after official API access.",
    proposedMonthlyUsd: 49,
    limits: {
      members: 5,
      socialAccounts: 25,
      scheduledPostsPerMonth: 1000,
      storageMb: 51200,
      meetingsPerMonth: 120
    }
  },
  agency: {
    name: "Agency",
    description: "Up to fifteen members for client workspaces, larger queues, and reporting after providers connect.",
    proposedMonthlyUsd: 99,
    limits: {
      members: 15,
      socialAccounts: 50,
      scheduledPostsPerMonth: 3000,
      storageMb: 204800,
      meetingsPerMonth: 400
    }
  }
};
