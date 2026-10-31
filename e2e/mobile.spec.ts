import { expect, test } from "@playwright/test";

test.describe("mobile menu", () => {
  test.skip(({ isMobile }) => !isMobile, "mobile only");

  test("opens, navigates and closes with Escape", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Open menu" }).click();
    const dialog = page.getByRole("dialog", { name: "Site menu" });
    await expect(dialog).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();

    await page.getByRole("button", { name: "Open menu" }).click();
    await dialog.getByRole("link", { name: "Customers" }).click();
    await expect(page).toHaveURL(/\/customers$/);
    await expect(dialog).toBeHidden();
  });

  test("pages do not scroll horizontally", async ({ page }) => {
    for (const path of ["/", "/pricing", "/features", "/blog", "/contact"]) {
      await page.goto(path);
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - window.innerWidth,
      );
      expect(overflow, path).toBeLessThanOrEqual(0);
    }
  });
});
