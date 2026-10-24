import { describe, expect, it } from "vitest";
import { nav, site } from "../lib/site";

describe("site metadata", () => {
  it("keeps the product name", () => {
    expect(site.name).toBe("Takiia");
  });

  it("includes core marketing routes", () => {
    expect(nav.map((item) => item.href)).toEqual(
      expect.arrayContaining(["/messaging", "/meetings", "/social", "/teams", "/pricing"])
    );
  });
});

describe("home hero", () => {
  it("builds the hero from UI instead of pasting the brand photograph", async () => {
    const home = await import("../components/home/HomeView");
    const stage = await import("../components/home/HeroStage");
    expect(home.HomeView.toString()).not.toContain("takiia-hero.jpg");
    expect(stage.HeroStage.name).toBe("HeroStage");
  });
});
