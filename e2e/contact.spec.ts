import { expect, test, type Page } from "@playwright/test";

async function fill(page: Page, email: string) {
  await page.getByLabel("Full name").fill("Dana Reyes");
  await page.getByRole("textbox", { name: "Company" }).fill("Acme Logistics");
  await page.getByLabel("Work email").fill(email);
  await page.getByLabel("Documents per month").selectOption("500 – 2,000");
  await page
    .getByLabel("What documents do you process?")
    .fill("Around 900 supplier invoices a month.");
  await page.getByRole("checkbox").check();
}

test.describe("contact form", () => {
  test("validates required fields", async ({ page }) => {
    await page.goto("/contact");
    await page.getByRole("button", { name: "Send message" }).click();
    await expect(page.getByText("Please fix the 6 highlighted fields.")).toBeVisible();
    await expect(page.getByLabel("Work email")).toHaveAttribute("aria-invalid", "true");
  });

  test("shows the success state after a valid submission", async ({ page }) => {
    await page.goto("/contact");
    await fill(page, "dana@company.com");
    await page.getByRole("button", { name: "Send message" }).click();
    await expect(page.getByRole("button", { name: /Sending/ })).toBeDisabled();
    await expect(page.getByRole("heading", { name: "Message received." })).toBeFocused();
  });

  test("shows the error state when the fake server fails", async ({ page }) => {
    await page.goto("/contact");
    await fill(page, "dana@fail.test");
    await page.getByRole("button", { name: "Send message" }).click();
    await expect(page.getByText(/your message was not sent/i)).toBeVisible();
    await expect(page.getByRole("button", { name: "Try again" })).toBeVisible();
  });
});
