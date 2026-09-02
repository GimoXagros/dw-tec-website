import tseslint from "typescript-eslint";
import astro from "eslint-plugin-astro";
import { defineConfig } from "eslint/config";

export default defineConfig(
  {
    ignores: [
      "dist/**",
      ".astro/**",
      "local-only/**",
      "node_modules/**",
      "test-results/**",
      "playwright-report/**",
    ],
  },
  ...tseslint.configs.recommended,
  ...astro.configs.recommended,
);
