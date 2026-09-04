import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://dw-tec.co.kr",
  output: "static",
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
