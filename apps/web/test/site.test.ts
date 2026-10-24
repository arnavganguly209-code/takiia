import { describe, expect, it } from "vitest";
import { nav, productLinks, publicPaths, site } from "../lib/site";

describe("site metadata", () => {
  it("keeps the product name", () => {
    expect(site.name).toBe("Takiia");
  });

  it("includes core marketing routes", () => {
    expect(nav.map((item) => item.href)).toEqual(expect.arrayContaining(["/features", "/solutions", "/pricing"]));
    expect(productLinks.map((item) => item.href)).toEqual(
      expect.arrayContaining(["/messaging", "/meetings", "/social", "/teams", "/scheduling", "/files"])
    );
  });

  it("does not publish private dashboard routes in the sitemap list", () => {
    expect(publicPaths.some((path) => path.startsWith("/dashboard"))).toBe(false);
    expect(publicPaths).toEqual(
      expect.arrayContaining(["/", "/scheduling", "/files", "/solutions", "/terms", "/billing"])
    );
  });
});

describe("home hero", () => {
  it("uses one seamless hero scene instead of framed device images", async () => {
    const fs = await import("node:fs/promises");
    const hero = await fs.readFile(new URL("../components/home/HomeHero.tsx", import.meta.url), "utf8");
    expect(hero).toContain("All in One Place.");
    expect(hero).toContain("/brand/takiia-hero-devices.jpg");
    expect(hero).not.toContain("takiia-laptop.jpg");
    expect(hero).not.toContain("takiia-hero-scene.jpg");
  });

  it("keeps the long-form homepage section order", async () => {
    const source = await import("node:fs/promises").then((fs) =>
      fs.readFile(new URL("../components/home/HomeView.tsx", import.meta.url), "utf8")
    );
    const order = [
      "id=\"why\"",
      "id=\"workspace\"",
      "id=\"messaging\"",
      "id=\"social\"",
      "id=\"meetings\"",
      "id=\"teams\"",
      "id=\"schedule\"",
      "id=\"files\"",
      "id=\"integrations\"",
      "id=\"workflow\"",
      "id=\"security\"",
      "id=\"how\"",
      "id=\"pricing\"",
      "id=\"faq\""
    ];
    let last = -1;
    for (const id of order) {
      const index = source.indexOf(id);
      expect(index).toBeGreaterThan(last);
      last = index;
    }
  });
});
