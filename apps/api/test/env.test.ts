import { describe, expect, it } from "vitest";
import { featureFlagsFromEnv, loadEnv } from "../src/env.js";
import { testEnv } from "../src/test-app.js";

describe("loadEnv", () => {
  it("accepts a complete local configuration", () => {
    const env = loadEnv({
      NODE_ENV: "development",
      HOST: "127.0.0.1",
      PORT: "3033",
      DATABASE_URL: "postgresql://takiia_dev:local@127.0.0.1:5432/takiia_dev",
      SESSION_SECRET: "local-session-secret-value-32chars",
      CSRF_SECRET: "local-csrf-secret-value-32charsxxxx",
      WEB_ORIGIN: "http://127.0.0.1:3034"
    });
    expect(env.PORT).toBe(3033);
    expect(env.PAYMENTS_ENABLED).toBe(false);
  });

  it("rejects a production bind that is not localhost", () => {
    expect(() =>
      loadEnv({
        NODE_ENV: "production",
        HOST: "0.0.0.0",
        PORT: "3033",
        DATABASE_URL: "postgresql://takiia_app:x@127.0.0.1:5432/takiia_db",
        SESSION_SECRET: "prod-session-secret-value-32charsx",
        CSRF_SECRET: "prod-csrf-secret-value-32charsxxxx",
        WEB_ORIGIN: "https://takiia.com"
      })
    ).toThrow(/127.0.0.1/);
  });

  it("keeps payment flag false without credentials", () => {
    const flags = featureFlagsFromEnv(testEnv());
    expect(flags.payments).toBe(false);
    expect(flags.socialPublish).toBe(false);
    expect(flags.emailDelivery).toBe(false);
  });
});
