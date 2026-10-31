import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const paths = [
  "/",
  "/features",
  "/pricing",
  "/customers",
  "/blog",
  "/blog/three-way-matching-explained",
  "/about",
  "/contact",
];

test.describe("accessibility", () => {
  test.skip(({ browserName }) => browserName !== "chromium", "axe runs once, in Chromium");
  test.use({ reducedMotion: "reduce" });

  for (const path of paths) {
    test(`${path} has no serious or critical axe violations`, async ({ page }) => {
      await page.goto(path);
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
        .analyze();
      const serious = results.violations.filter(
        (v) => v.impact === "serious" || v.impact === "critical",
      );
      expect(
        serious.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(", ")}`),
      ).toEqual([]);
    });
  }

  test("skip link moves focus to main content", async ({ page, isMobile }) => {
    test.skip(isMobile, "keyboard flow");
    await page.goto("/");
    await page.keyboard.press("Tab");
    const skip = page.getByRole("link", { name: "Skip to content" });
    await expect(skip).toBeFocused();
    await skip.press("Enter");
    await expect(page.locator("#main")).toBeFocused();
  });
});
