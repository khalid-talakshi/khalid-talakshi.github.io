// @ts-check
import { defineConfig } from "astro/config";

import react from "@astrojs/react";

import mdx from "@astrojs/mdx";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  integrations: [react(), mdx()],

  site: 'http://khalidtalakshi.com',
  base: '/khalid-talakshi.github.com',
  vite: {
    plugins: [tailwindcss()],
  },
});
