import { describe, expect, it } from "vitest";
import { nav, site } from "../lib/site";

describe("site metadata", () => {
  it("keeps the product name", () => {
    expect(site.name).toBe("Takiia");
  });

  it("includes core marketing routes", () => {
    expect(nav.map((item) => item.href)).toEqual(
      expect.arrayContaining(["/messaging", "/meetings", "/social", "/pricing"])
    );
  });
});
