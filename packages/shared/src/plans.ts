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
  { name: string; description: string; limits: PlanLimits }
> = {
  starter: {
    name: "Starter",
    description: "Small teams starting with workspace chat and a light publishing queue.",
    limits: {
      members: 5,
      socialAccounts: 2,
      scheduledPostsPerMonth: 30,
      storageMb: 2048,
      meetingsPerMonth: 10
    }
  },
  pro: {
    name: "Pro",
    description: "Growing teams that need more seats, storage, and scheduled posts.",
    limits: {
      members: 20,
      socialAccounts: 6,
      scheduledPostsPerMonth: 300,
      storageMb: 10240,
      meetingsPerMonth: 50
    }
  },
  business: {
    name: "Business",
    description: "Multi-team workspaces with higher quotas and admin controls.",
    limits: {
      members: 75,
      socialAccounts: 20,
      scheduledPostsPerMonth: 1500,
      storageMb: 51200,
      meetingsPerMonth: 200
    }
  },
  agency: {
    name: "Agency",
    description: "Agencies managing multiple client workspaces and publishing queues.",
    limits: {
      members: 200,
      socialAccounts: 60,
      scheduledPostsPerMonth: 5000,
      storageMb: 204800,
      meetingsPerMonth: 800
    }
  }
};
