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
  it("builds the hero as interface markup instead of a pasted scene", async () => {
    const hero = await import("../components/home/HomeHero");
    const source = hero.HomeHero.toString();
    expect(source).toContain("All in One Place.");
    expect(source).not.toContain("takiia-hero-scene.jpg");
    expect(source).not.toContain("<img");
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
