import { z } from "zod";

const booleanFlag = z
  .enum(["true", "false", "1", "0", ""])
  .optional()
  .transform((value) => value === "true" || value === "1");

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  HOST: z.string().default("127.0.0.1"),
  PORT: z.coerce.number().int().min(1).max(65535).default(3033),
  DATABASE_URL: z
    .string()
    .min(1, "DATABASE_URL is required")
    .refine((url) => url.startsWith("postgresql://") || url.startsWith("postgres://"), {
      message: "DATABASE_URL must be a PostgreSQL connection string"
    }),
  SESSION_SECRET: z.string().min(32, "SESSION_SECRET must be at least 32 characters"),
  CSRF_SECRET: z.string().min(32, "CSRF_SECRET must be at least 32 characters"),
  WEB_ORIGIN: z.string().url(),
  COOKIE_DOMAIN: z.string().optional().default(""),
  COOKIE_SECURE: booleanFlag,
  PAYMENTS_ENABLED: booleanFlag,
  EMAIL_DELIVERY_ENABLED: booleanFlag,
  SOCIAL_PUBLISH_ENABLED: booleanFlag,
  WEBRTC_CALLS_ENABLED: booleanFlag,
  LIVEKIT_MEETINGS_ENABLED: booleanFlag,
  STRIPE_SECRET_KEY: z.string().optional().default(""),
  SMTP_URL: z.string().optional().default(""),
  META_APP_ID: z.string().optional().default(""),
  META_APP_SECRET: z.string().optional().default(""),
  TIKTOK_CLIENT_KEY: z.string().optional().default(""),
  TIKTOK_CLIENT_SECRET: z.string().optional().default(""),
  LIVEKIT_URL: z.string().optional().default(""),
  LIVEKIT_API_KEY: z.string().optional().default(""),
  LIVEKIT_API_SECRET: z.string().optional().default(""),
  TURN_URL: z.string().optional().default(""),
  TURN_USERNAME: z.string().optional().default(""),
  TURN_PASSWORD: z.string().optional().default("")
});

export type ApiEnv = z.infer<typeof envSchema>;

export function loadEnv(source: NodeJS.ProcessEnv = process.env): ApiEnv {
  const parsed = envSchema.safeParse(source);
  if (!parsed.success) {
    const fields = parsed.error.issues.map((issue) => issue.path.join(".")).join(", ");
    throw new Error(`Invalid API environment: ${fields}`);
  }

  const env = parsed.data;
  if (env.NODE_ENV === "production" && env.HOST !== "127.0.0.1") {
    throw new Error("Production API must bind to 127.0.0.1");
  }
  if (env.PAYMENTS_ENABLED && !env.STRIPE_SECRET_KEY) {
    throw new Error("PAYMENTS_ENABLED requires STRIPE_SECRET_KEY");
  }
  if (env.EMAIL_DELIVERY_ENABLED && !env.SMTP_URL) {
    throw new Error("EMAIL_DELIVERY_ENABLED requires SMTP_URL");
  }
  if (env.SOCIAL_PUBLISH_ENABLED && !env.META_APP_SECRET && !env.TIKTOK_CLIENT_SECRET) {
    throw new Error("SOCIAL_PUBLISH_ENABLED requires configured provider credentials");
  }
  return env;
}

export function webOrigins(env: ApiEnv): string[] {
  const origins = new Set<string>([env.WEB_ORIGIN, "http://127.0.0.1:3034", "http://localhost:3034"]);
  if (env.WEB_ORIGIN === "https://takiia.com") {
    origins.add("https://www.takiia.com");
  }
  return [...origins];
}

export function featureFlagsFromEnv(env: ApiEnv) {
  return {
    payments: Boolean(env.PAYMENTS_ENABLED && env.STRIPE_SECRET_KEY),
    emailDelivery: Boolean(env.EMAIL_DELIVERY_ENABLED && env.SMTP_URL),
    socialPublish: Boolean(env.SOCIAL_PUBLISH_ENABLED),
    webrtcCalls: Boolean(env.WEBRTC_CALLS_ENABLED && env.TURN_URL),
    livekitMeetings: Boolean(
      env.LIVEKIT_MEETINGS_ENABLED && env.LIVEKIT_URL && env.LIVEKIT_API_KEY && env.LIVEKIT_API_SECRET
    )
  };
}
