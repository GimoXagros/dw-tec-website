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
  "/en/",
  "/en/company/",
  "/en/company/history/",
  "/en/company/capabilities/",
  "/en/business/",
  "/en/business/electrical/",
  "/en/business/mechanical/",
  "/en/business/scaffolding/",
  "/en/business/fire-protection/",
  "/en/portfolio/",
  "/en/contact/",
  "/en/privacy/",
  "/404.html",
];
for (const width of [360, 390, 768, 1024, 1440, 1920]) {
  test(`all pages, links and accessibility at ${width}px`, async ({ page }) => {
    test.setTimeout(120_000);
    await page.setViewportSize({ width, height: 1000 });
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });
    for (const route of routes) {
      const response = await page.goto(route);
      expect(response?.status()).toBe(200);
      const language = route.startsWith("/en/") ? "en" : "ko";
      await expect(page.locator("html")).toHaveAttribute("lang", language);
      await expect(page.locator("h1")).toHaveCount(1);
      await page.evaluate(() => document.fonts.ready);
      for (const image of await page.locator("img").all()) {
        await image.scrollIntoViewIfNeeded();
        await expect(image).toHaveJSProperty("complete", true);
      }
      await page.evaluate(() => window.scrollTo(0, 0));
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
      if (route !== "/404.html") {
        const koRoute = route.startsWith("/en/") ? route.replace(/^\/en/, "") : route;
        const enRoute = route.startsWith("/en/") ? route : route === "/" ? "/en/" : `/en${route}`;
        await expect(page.locator('link[rel="alternate"][hreflang="ko"]')).toHaveAttribute(
          "href",
          `https://dw-tec.co.kr${koRoute}`,
        );
        await expect(page.locator('link[rel="alternate"][hreflang="en"]')).toHaveAttribute(
          "href",
          `https://dw-tec.co.kr${enRoute}`,
        );
        await expect(page.locator('link[rel="alternate"][hreflang="x-default"]')).toHaveAttribute(
          "href",
          `https://dw-tec.co.kr${koRoute}`,
        );
      }
      await expect(page.locator('footer a[href="tel:054-783-9170"]')).toBeVisible();
      await expect(page.locator('footer a[href="mailto:dwtec@dw-tec.co.kr"]')).toBeVisible();
      await expect(page.locator("footer")).toContainText(
        `${language === "ko" ? "팩스" : "FAX"} 054-783-9171`,
      );
      for (const element of await page.locator("[data-reveal]").all()) {
        await element.scrollIntoViewIfNeeded();
        await expect(element).toHaveCSS("opacity", "1");
      }
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForFunction(() =>
        document.getAnimations().every((animation) => animation.playState !== "running"),
      );
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
  await page.goto("/business/electrical/");
  await page.locator(".menu-button").click();
  await page.locator(".mobile-language a[href='/en/business/electrical/']").click();
  await expect(page).toHaveURL(/\/en\/business\/electrical\/$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
});

test("navigation traps focus, locks scroll and supports desktop dropdowns", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const toggle = page.locator(".menu-button");
  await toggle.click();
  await expect(page.locator("body")).toHaveCSS("overflow", "hidden");
  await expect(page.locator("main")).toHaveAttribute("inert", "");
  await toggle.focus();
  await page.keyboard.press("Shift+Tab");
  await expect(page.locator(".mobile-contact a").last()).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(toggle).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden");
  await expect(page.locator("main")).not.toHaveAttribute("inert", "");
  await page.setViewportSize({ width: 1440, height: 1000 });
  const companyLink = page.locator(".nav-item-top a[href='/company/']");
  await companyLink.focus();
  await expect(page.locator("#sub-company")).toBeVisible();
  await page.locator("#sub-company a[href='/company/history/']").focus();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/\/company\/history\/$/);
  await page.goBack();
  await expect(page).toHaveURL(/\/$/);
  await page.goForward();
  await expect(page).toHaveURL(/\/company\/history\/$/);
});

test("scroll state, reveal final state and repeat initialization", async ({ page }) => {
  await page.goto("/");
  await page.waitForTimeout(4700);
  await expect(page.locator("[data-reveal]").last()).toHaveClass(/reveal-pending/);
  await expect(page.locator("[data-reveal]").last()).toHaveCSS("opacity", "0");
  await expect(page.locator(".site-header")).not.toHaveClass(/is-scrolled/);
  await page.evaluate(() => window.scrollTo(0, 600));
  await expect(page.locator(".site-header")).toHaveClass(/is-scrolled/);
  for (const element of await page.locator("[data-reveal]").all()) {
    await element.scrollIntoViewIfNeeded();
    await expect(element).toHaveCSS("opacity", "1");
    await expect(element).toHaveClass(/is-visible/);
  }
  await page.evaluate(() => {
    document.dispatchEvent(new Event("astro:page-load"));
    document.dispatchEvent(new Event("astro:page-load"));
  });
  await expect(page.locator(".header-sentinel")).toHaveCount(1);
  await page.setViewportSize({ width: 360, height: 800 });
  await page.locator(".menu-button").click();
  await expect(page.locator(".menu-button")).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Escape");
});

test("reduced motion preserves content without transforms", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  for (const el of await page.locator("[data-reveal]").all()) {
    await expect(el).toHaveCSS("opacity", "1");
    await expect(el).toHaveCSS("transform", "none");
  }
  await expect(page.locator(".corporate-hero-image")).toHaveCSS("animation-name", "none");
  await expect(page.locator(".hero-caption")).toHaveCount(0);
  await expect(page.locator(".corporate-hero-image")).toHaveAttribute("alt", /산업 플랜트/);
});

test("all routes readable without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 360, height: 800 },
  });
  const page = await context.newPage();
  for (const route of routes) {
    await page.goto(`http://127.0.0.1:4322${route}`);
    await expect(page.locator("h1")).toBeVisible();
    const businessHref = route.startsWith("/en/") ? "/en/business/" : "/business/";
    await expect(page.locator(`.nav-item-top a[href='${businessHref}']`)).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true,
    );
    for (const el of await page.locator("[data-reveal]").all())
      await expect(el).toHaveCSS("opacity", "1");
  }
  await page.locator(".nav-item-top a[href='/business/']").click();
  await expect(page).toHaveURL(/\/business\/$/);
  await context.close();
});

test("privacy and 404 are motion-free; observer failure keeps content available", async ({
  page,
}) => {
  for (const route of ["/privacy/", "/404.html"]) {
    await page.goto(route);
    await expect(page.locator("main [data-reveal]")).toHaveCount(0);
    await expect(page.locator("main h1")).toHaveCSS("animation-name", "none");
  }
  await page.addInitScript(() => {
    Object.defineProperty(window, "IntersectionObserver", { value: undefined, configurable: true });
  });
  await page.goto("/");
  for (const el of await page.locator("[data-reveal]").all())
    await expect(el).toHaveCSS("opacity", "1");
  await page.addInitScript(() => {
    class SilentObserver {
      observe() {}
      unobserve() {}
      disconnect() {}
    }
    Object.defineProperty(window, "IntersectionObserver", {
      value: SilentObserver,
      configurable: true,
    });
  });
  await page.goto("/");
  await page.waitForTimeout(5000);
  for (const el of await page.locator("[data-reveal]").all())
    await expect(el).toHaveCSS("opacity", "1");
});

test("unknown page and sitemap", async ({ page, request }) => {
  expect((await page.goto("/does-not-exist/"))?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("404");
  const sitemap = await request.get("/sitemap-0.xml");
  expect(sitemap.ok()).toBe(true);
  expect(await sitemap.text()).toContain("https://dw-tec.co.kr/business/fire-protection/");
  expect(await sitemap.text()).toContain("https://dw-tec.co.kr/en/business/fire-protection/");
  expect(await (await request.get("/robots.txt")).text()).toContain(
    "https://dw-tec.co.kr/sitemap-index.xml",
  );
});

test("language switch preserves the route and partner section is complete", async ({ page }) => {
  await page.goto("/business/electrical/");
  const languageToggle = page.locator(".language-switch .submenu-toggle");
  await languageToggle.focus();
  await page.keyboard.press("Enter");
  await expect(languageToggle).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Escape");
  await expect(languageToggle).toBeFocused();
  await expect(languageToggle).toHaveAttribute("aria-expanded", "false");
  await languageToggle.click();
  await page.locator("#lang-switch-menu a[href='/en/business/electrical/']").click();
  await expect(page).toHaveURL(/\/en\/business\/electrical\/$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await page.locator(".language-switch .submenu-toggle").click();
  await page.locator("body").click({ position: { x: 20, y: 200 } });
  await expect(page.locator(".language-switch .submenu-toggle")).toHaveAttribute(
    "aria-expanded",
    "false",
  );
  await page.goto("/en/company/history/");
  await page.locator(".language-switch .submenu-toggle").click();
  await page.locator("#lang-switch-menu a[href='/company/history/']").click();
  await expect(page).toHaveURL(/\/company\/history\/$/);
  await page.goto("/en/contact/");
  await expect(page.locator("#lang-switch-menu a[href='/contact/']")).toHaveCount(1);
  await page.goto("/en/");
  const partners = page.locator(".partners-section");
  const organizationLinks = partners.locator(".organization-logo-link");
  await expect(organizationLinks).toHaveCount(15);
  for (const [name, website] of [
    ["Korea Hydro & Nuclear Power", "https://www.khnp.co.kr/main/index.do"],
    ["KEPCO KPS", "https://www.kps.co.kr/web/index.do"],
    ["Soosan ENS", "https://www.soosanens.co.kr/"],
    ["Soosan Industries", "https://www.soosanind.co.kr/main/index.html"],
    ["Geumhwa PSC", "https://www.geumhwa.co.kr/main"],
    ["Gyeongsangbuk-do Office of Education", "https://www.gbe.kr/main/main.do"],
    ["Hyundai Engineering & Construction", "https://www.hdec.kr/"],
    ["First Keepers", "https://www.firstkeepers.co.kr/"],
    ["Optimal Energy Service", "http://www.oes.kr/"],
    ["E2S", "https://e2s.co.kr/"],
    ["Daewon General ENG", "http://dwf119.co.kr/"],
    ["International Electric", "https://www.ieckr.com/"],
    ["Yurim Technology", "http://www.yurimtech.co.kr/"],
    ["BK Vision", "http://www.bkvision.co.kr/"],
    ["Moojin Machinery", "https://newmoojin.co.kr/"],
  ]) {
    const link = partners.locator(`a[href="${website}"]`);
    await expect(link).toHaveCount(1);
    await expect(link).toHaveAttribute("href", website);
    await expect(link).toHaveAttribute("target", "_blank");
    await expect(link.locator("img")).toHaveAttribute("alt", name);
  }
  await expect(page.locator('link[rel="alternate"][hreflang="ko"]')).toHaveAttribute(
    "href",
    "https://dw-tec.co.kr/",
  );
  await expect(page.locator('link[rel="alternate"][hreflang="en"]')).toHaveAttribute(
    "href",
    "https://dw-tec.co.kr/en/",
  );
});
