import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel/serverless";
import tailwind from "@astrojs/tailwind";
import keystaticAstro from "@keystatic/astro";
import htmx from "astro-htmx";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";

import alpinejs from "@astrojs/alpinejs";

// https://astro.build/config
export default defineConfig({
  site: "https://navbar.tech",
  integrations: [tailwind(), react(), mdx(), htmx(), keystaticAstro(), alpinejs()],
  output: "hybrid",
  adapter: vercel()
});