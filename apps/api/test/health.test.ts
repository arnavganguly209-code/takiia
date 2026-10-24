import request from "supertest";
import { describe, expect, it } from "vitest";
import { createTestApp } from "../src/test-app.js";

describe("health endpoints", () => {
  it("returns liveness without a database", async () => {
    const app = createTestApp();
    const response = await request(app).get("/health");
    expect(response.status).toBe(200);
    expect(response.body.status).toBe("ok");
    expect(response.body.service).toBe("takiia-api");
  });

  it("returns feature flags as disabled by default", async () => {
    const app = createTestApp();
    const response = await request(app).get("/features");
    expect(response.status).toBe(200);
    expect(response.body.features.payments).toBe(false);
    expect(response.body.features.socialPublish).toBe(false);
    expect(response.body.features.googleAds).toBe(false);
  });

  it("exposes the Node platform catalog without secrets", async () => {
    const app = createTestApp();
    const response = await request(app).get("/platform");
    expect(response.status).toBe(200);
    expect(response.body.runtime).toBe("node");
    expect(response.body.services.map((item: { id: string }) => item.id)).toEqual(
      expect.arrayContaining(["messaging", "meetings", "social", "ads", "billing"])
    );
    expect(JSON.stringify(response.body)).not.toMatch(/secret|token|password/i);
  });

  it("keeps Google Ads disconnected until credentials exist", async () => {
    const app = createTestApp();
    const response = await request(app).get("/ads/status");
    expect(response.status).toBe(200);
    expect(response.body.configured).toBe(false);
    expect(response.body.campaigns).toEqual([]);
    expect(response.body.spendIncludedInSubscription).toBe(false);
  });

  it("rejects unauthenticated private routes", async () => {
    const app = createTestApp();
    const response = await request(app).get("/workspaces");
    expect(response.status).toBe(401);
  });
});
