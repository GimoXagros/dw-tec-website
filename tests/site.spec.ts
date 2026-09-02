import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const routes = [
  "/",
  "/company/",
  "/company/history/",
  "/company/capabilities/",
  "/business/",
  "/business/electrical/",
  "/business/mechanical/",
  "/business/scaffolding/",
  "/business/fire-protection/",
  "/portfolio/",
  "/contact/",
  "/privacy/",
  "/404.html",
];
for (const width of [360, 768, 1440]) {
  test(`all pages, links and accessibility at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });
    for (const route of routes) {
      const response = await page.goto(route);
      expect(response?.status()).toBe(200);
      await expect(page.locator("html")).toHaveAttribute("lang", "ko");
      await expect(page.locator("h1")).toHaveCount(1);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
        true,
      );
      const images = await page.locator("img").evaluateAll((images) =>
        images.map((img) => ({
          alt: img.getAttribute("alt"),
          width: img.getAttribute("width"),
          height: img.getAttribute("height"),
          loaded: img instanceof HTMLImageElement && img.complete && img.naturalWidth > 0,
        })),
      );
      for (const img of images) {
        expect(img.alt).toBeTruthy();
        expect(img.width).toBeTruthy();
        expect(img.height).toBeTruthy();
        expect(img.loaded).toBe(true);
      }
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
        "href",
        `https://dw-tec.co.kr${route}`,
      );
      await expect(page.locator('footer a[href="tel:054-783-9170"]')).toBeVisible();
      await expect(page.locator('footer a[href="mailto:dwtec@dw-tec.co.kr"]')).toBeVisible();
      await expect(page.locator("footer")).toContainText("팩스 054-783-9171");
      const a11y = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze();
      expect(a11y.violations, `${route} accessibility`).toEqual([]);
    }
    expect(errors.filter((error) => !error.includes("404"))).toEqual([]);
  });
}

test("mobile menu keyboard, close and navigation", async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 800 });
  await page.goto("/");
  const toggle = page.locator(".menu-button");
  await toggle.focus();
  await page.keyboard.press("Enter");
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Tab");
  await expect(
    page
      .getByRole("navigation", { name: "주 메뉴" })
      .getByRole("link", { name: "회사소개", exact: true }),
  ).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(toggle).toBeFocused();
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await toggle.click();
  await page
    .getByRole("navigation", { name: "주 메뉴" })
    .getByRole("link", { name: "사업영역", exact: true })
    .click();
  await expect(page).toHaveURL(/\/business\/$/);
  await expect(page.getByRole("button", { name: "메뉴 열기" })).toHaveAttribute(
    "aria-expanded",
    "false",
  );
});

test("unknown page and sitemap", async ({ page, request }) => {
  expect((await page.goto("/does-not-exist/"))?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("404");
  const sitemap = await request.get("/sitemap-0.xml");
  expect(sitemap.ok()).toBe(true);
  expect(await sitemap.text()).toContain("https://dw-tec.co.kr/business/fire-protection/");
  expect(await (await request.get("/robots.txt")).text()).toContain(
    "https://dw-tec.co.kr/sitemap-index.xml",
  );
});
