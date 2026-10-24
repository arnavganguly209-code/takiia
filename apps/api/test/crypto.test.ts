import { describe, expect, it } from "vitest";
import { hashPassword, slugify, tokensEqual, verifyPassword } from "../src/lib/crypto.js";
import { parseCookieHeader } from "../src/lib/cookies.js";

describe("password hashing", () => {
  it("verifies a matching password", async () => {
    const hash = await hashPassword("WorkspaceKey12");
    expect(hash).not.toContain("WorkspaceKey12");
    await expect(verifyPassword("WorkspaceKey12", hash)).resolves.toBe(true);
    await expect(verifyPassword("wrong-password-1", hash)).resolves.toBe(false);
  });
});

describe("helpers", () => {
  it("compares tokens in constant-looking time", () => {
    expect(tokensEqual("abc", "abc")).toBe(true);
    expect(tokensEqual("abc", "xyz")).toBe(false);
  });

  it("builds unique workspace slugs", () => {
    expect(slugify("Takiia HQ")).toMatch(/^takiia-hq-[a-f0-9]+$/);
  });

  it("parses cookie headers", () => {
    expect(parseCookieHeader("takiia_session=abc; takiia_csrf=def")).toEqual({
      takiia_session: "abc",
      takiia_csrf: "def"
    });
  });
});
