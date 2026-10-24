import { EventEmitter } from "node:events";
import { createApp } from "./app.js";
import type { ApiEnv } from "./env.js";

class FakeIo extends EventEmitter {
  to() {
    return this;
  }

  override emit(event: string, ...args: unknown[]) {
    return super.emit(event, ...args);
  }
}

export function testEnv(overrides: Partial<ApiEnv> = {}): ApiEnv {
  return {
    NODE_ENV: "test",
    HOST: "127.0.0.1",
    PORT: 3033,
    DATABASE_URL: "postgresql://takiia_dev:local@127.0.0.1:5432/takiia_dev",
    SESSION_SECRET: "test-session-secret-value-32chars-min",
    CSRF_SECRET: "test-csrf-secret-value-32chars-minxx",
    WEB_ORIGIN: "http://127.0.0.1:3034",
    COOKIE_DOMAIN: "",
    COOKIE_SECURE: false,
    PAYMENTS_ENABLED: false,
    EMAIL_DELIVERY_ENABLED: false,
    SOCIAL_PUBLISH_ENABLED: false,
    WEBRTC_CALLS_ENABLED: false,
    LIVEKIT_MEETINGS_ENABLED: false,
    STRIPE_SECRET_KEY: "",
    SMTP_URL: "",
    META_APP_ID: "",
    META_APP_SECRET: "",
    TIKTOK_CLIENT_KEY: "",
    TIKTOK_CLIENT_SECRET: "",
    LIVEKIT_URL: "",
    LIVEKIT_API_KEY: "",
    LIVEKIT_API_SECRET: "",
    TURN_URL: "",
    TURN_USERNAME: "",
    TURN_PASSWORD: "",
    GOOGLE_ADS_ENABLED: false,
    GOOGLE_ADS_DEVELOPER_TOKEN: "",
    GOOGLE_ADS_CLIENT_ID: "",
    GOOGLE_ADS_CLIENT_SECRET: "",
    ...overrides
  };
}

export function createTestApp(env = testEnv()) {
  return createApp(env, new FakeIo() as never);
}
