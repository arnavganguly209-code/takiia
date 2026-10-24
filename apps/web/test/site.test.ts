import { describe, expect, it } from "vitest";
import { nav, productLinks, publicPaths, site } from "../lib/site";
import { defaultSiteContent, mergeSiteContent, sectionOrder } from "../lib/site-content";
import { verifyOrbitPasskey, verifyOrbitSession } from "../lib/orbit-auth";

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
    expect(publicPaths.some((path) => path.startsWith("/orbit"))).toBe(false);
    expect(publicPaths).toEqual(
      expect.arrayContaining(["/", "/scheduling", "/files", "/solutions", "/terms", "/billing"])
    );
  });
});

describe("home hero", () => {
  it("uses one seamless hero scene instead of framed device images", async () => {
    const fs = await import("node:fs/promises");
    const hero = await fs.readFile(new URL("../components/home/HomeHero.tsx", import.meta.url), "utf8");
    const defaults = await fs.readFile(new URL("../lib/site-content.ts", import.meta.url), "utf8");
    expect(defaults).toContain("All in One Place.");
    expect(defaults).toContain("/brand/takiia-hero-blend.jpg");
    expect(hero).not.toContain("takiia-laptop.jpg");
    expect(hero).not.toContain("takiia-hero-scene.jpg");
  });

  it("keeps the long-form homepage section order", async () => {
    const source = await import("node:fs/promises").then((fs) =>
      fs.readFile(new URL("../components/home/HomeView.tsx", import.meta.url), "utf8")
    );
    let last = -1;
    for (const id of sectionOrder) {
      const index = source.indexOf(`id="${id}"`);
      expect(index).toBeGreaterThan(last);
      last = index;
    }
  });
});

describe("site content merge", () => {
  it("keeps new default sections when saved JSON is older", () => {
    const merged = mergeSiteContent(defaultSiteContent, { hero: { line3: "All in One Place." } });
    expect(merged.sections.why.title).toBe(defaultSiteContent.sections.why.title);
    expect(merged.hero.line3).toBe("All in One Place.");
    expect(merged.hero.imageSrc).toBe("/brand/takiia-hero-blend.jpg");
  });
});

describe("orbit passkey", () => {
  it("rejects an empty or missing passkey without using a hardcoded fallback", () => {
    const previous = process.env.ORBIT_PASSKEY;
    delete process.env.ORBIT_PASSKEY;
    expect(verifyOrbitPasskey("anything")).toBe(false);
    process.env.ORBIT_PASSKEY = "unit-test-only";
    expect(verifyOrbitPasskey("wrong")).toBe(false);
    expect(verifyOrbitPasskey("unit-test-only")).toBe(true);
    expect(verifyOrbitSession("bad-token")).toBe(false);
    if (previous === undefined) {
      delete process.env.ORBIT_PASSKEY;
    } else {
      process.env.ORBIT_PASSKEY = previous;
    }
  });
});
