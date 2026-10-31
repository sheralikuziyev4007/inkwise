import { expect, test } from "@playwright/test";

test.describe("pricing page", () => {
  test("billing toggle switches prices", async ({ page }) => {
    await page.goto("/pricing");
    const team = page.getByTestId("price-team");
    await expect(team).toHaveText("$399");
    await page.getByRole("button", { name: "Monthly" }).click();
    await expect(team).toHaveText("$499");
    await expect(page.getByTestId("price-starter")).toHaveText("$149");
  });

  test("FAQ accordion opens one answer at a time", async ({ page }) => {
    await page.goto("/pricing");
    const first = page.getByRole("button", { name: "What counts as a page?" });
    const second = page.getByRole("button", { name: "Can we switch plans later?" });
    await expect(first).toHaveAttribute("aria-expanded", "true");
    await second.click();
    await expect(second).toHaveAttribute("aria-expanded", "true");
    await expect(first).toHaveAttribute("aria-expanded", "false");
    await expect(page.getByText("Upgrades apply immediately")).toBeVisible();
  });

  test("comparison table is reachable", async ({ page }) => {
    await page.goto("/pricing");
    await expect(page.getByRole("table")).toContainText("Pages per month");
  });
});
