import { expect, test } from "@playwright/test";

test.describe("reduced motion", () => {
  test.use({ reducedMotion: "reduce" });

  test("content is visible immediately and smooth scroll is off", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("html")).not.toHaveClass(/motion-ok/);
    await expect(page.locator("html")).not.toHaveClass(/lenis/);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.locator("[data-hero-stage]")).toBeVisible();
    // Headline words are static: no entrance animation runs.
    const animation = await page
      .locator("h1 .word")
      .first()
      .evaluate((el) => getComputedStyle(el).animationName);
    expect(animation).toBe("none");
  });
});

test.describe("full motion", () => {
  test.use({ reducedMotion: "no-preference" });

  test("hero animation completes and leaves accessible text", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("html")).toHaveClass(/motion-ok/);
    const heading = page.getByRole("heading", { level: 1 });
    await expect(heading).toHaveAccessibleName("Paperwork in. Clean data out.");
    await expect(page.locator("[data-sync]")).toBeVisible({ timeout: 6000 });
  });

  test("animations are cleaned up across client-side navigation", async ({ page, isMobile }) => {
    test.skip(isMobile, "desktop navigation");
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    await page.goto("/");
    const nav = page.getByRole("navigation", { name: "Main" });
    for (const name of ["Features", "Pricing", "Customers", "Blog", "About"]) {
      await nav.getByRole("link", { name }).click();
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    }
    await page.goBack();
    await page.goBack();
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    // Pin spacers from the home page must not survive on other routes.
    expect(await page.locator(".pin-spacer").count()).toBe(0);
    expect(errors).toEqual([]);
  });
});
