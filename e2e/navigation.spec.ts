import { expect, test } from "@playwright/test";

const pages = [
  { path: "/", title: /Inkwise — Paperwork in\. Clean data out\./, h1: /Paperwork in/ },
  { path: "/features", title: /Features — Inkwise/, h1: /messy middle/ },
  { path: "/pricing", title: /Pricing — Inkwise/, h1: /Pay for pages/ },
  { path: "/customers", title: /Customers — Inkwise/, h1: /stopped retyping/ },
  { path: "/blog", title: /Blog — Inkwise/, h1: /back office/ },
  { path: "/about", title: /About — Inkwise/, h1: /make decisions/ },
  { path: "/contact", title: /Contact — Inkwise/, h1: /your documents/ },
  {
    path: "/blog/three-way-matching-explained",
    title: /Three-way matching/,
    h1: /Three-way matching/,
  },
  {
    path: "/customers/logistics-month-end-close",
    title: /closed the books/,
    h1: /closed the books/,
  },
];

for (const page of pages) {
  test(`renders ${page.path} without runtime errors`, async ({ page: p }) => {
    const errors: string[] = [];
    p.on("pageerror", (e) => errors.push(e.message));
    await p.goto(page.path);
    await expect(p).toHaveTitle(page.title);
    await expect(p.getByRole("heading", { level: 1 })).toHaveAccessibleName(page.h1);
    await expect(p.getByRole("contentinfo")).toContainText("concept brand");
    expect(errors).toEqual([]);
  });
}

test("main navigation reaches every section", async ({ page, isMobile }) => {
  test.skip(isMobile, "Desktop navigation only");
  await page.goto("/");
  const nav = page.getByRole("navigation", { name: "Main" });
  await nav.getByRole("link", { name: "Pricing" }).click();
  await expect(page).toHaveURL(/\/pricing$/);
  await expect(nav.getByRole("link", { name: "Pricing" })).toHaveAttribute("aria-current", "page");
  await nav.getByRole("link", { name: "Blog" }).click();
  await expect(page).toHaveURL(/\/blog$/);
});

test("unknown routes show the branded 404", async ({ page }) => {
  const response = await page.goto("/does-not-exist");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("isn't here");
  await page.getByRole("link", { name: "Back to home" }).click();
  await expect(page).toHaveURL(/\/$/);
});

test("serves SEO files", async ({ request }) => {
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.ok()).toBe(true);
  expect(await sitemap.text()).toContain("/blog/three-way-matching-explained");
  const robots = await request.get("/robots.txt");
  expect(await robots.text()).toContain("Sitemap:");
  const og = await request.get("/opengraph-image");
  expect(og.headers()["content-type"]).toContain("image/png");
});
