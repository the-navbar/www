import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel/serverless";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: "https://navbar.tech",
  integrations: [tailwind()],
  output: "hybrid",
  adapter: vercel(),
});
