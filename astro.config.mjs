import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://dw-tec.co.kr",
  output: "static",
  security: {
    csp: {
      directives: [
        "default-src 'none'",
        "base-uri 'none'",
        "object-src 'none'",
        "form-action 'none'",
        "frame-src 'none'",
        "connect-src 'self'",
        "img-src 'self'",
        "font-src 'self'",
        "manifest-src 'self'",
        "upgrade-insecure-requests",
      ],
      scriptDirective: {
        resources: ["'self'", { resource: "'none'", kind: "attribute" }],
      },
      styleDirective: {
        resources: ["'self'", { resource: "'none'", kind: "attribute" }],
      },
    },
  },
  build: { inlineStylesheets: "always" },
  trailingSlash: "always",
  integrations: [sitemap()],
  i18n: {
    defaultLocale: "ko",
    locales: ["ko", "en"],
    routing: { prefixDefaultLocale: false, redirectToDefaultLocale: false },
  },
  devToolbar: { enabled: false },
});
