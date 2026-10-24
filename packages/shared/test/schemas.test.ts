import { describe, expect, it } from "vitest";
import { loginSchema, passwordSchema, registerSchema } from "../src/schemas.js";

describe("passwordSchema", () => {
  it("rejects short passwords", () => {
    expect(passwordSchema.safeParse("Ab1").success).toBe(false);
  });

  it("accepts a long mixed password", () => {
    expect(passwordSchema.safeParse("CorrectHorse9battery").success).toBe(true);
  });
});

describe("registerSchema", () => {
  it("normalizes email", () => {
    const parsed = registerSchema.parse({
      email: "Owner@Takiia.com",
      password: "WorkspaceKey12",
      displayName: "Arnav"
    });
    expect(parsed.email).toBe("owner@takiia.com");
  });
});

describe("loginSchema", () => {
  it("requires password", () => {
    expect(
      loginSchema.safeParse({ email: "owner@takiia.com", password: "" }).success
    ).toBe(false);
  });
});
