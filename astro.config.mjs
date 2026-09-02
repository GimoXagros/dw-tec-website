import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://dw-tec.co.kr",
  output: "static",
  build: { inlineStylesheets: "always" },
  trailingSlash: "always",
  integrations: [sitemap()],
  devToolbar: { enabled: false },
});
