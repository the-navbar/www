import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel/serverless";
import tailwind from "@astrojs/tailwind";
import keystaticAstro from "@keystatic/astro";
import htmx from "astro-htmx";

import react from "@astrojs/react";
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  site: "https://navbar.tech",
  integrations: [tailwind(), react(), mdx(), htmx(), keystaticAstro()],
  output: "hybrid",
  adapter: vercel(),
  image: {
    domains: ["avatars.githubusercontent.com"],
    remotePatterns: [{ protocol: "https" }],
  },
});
