import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import { siteMetadata } from './src/site-metadata';

import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  site: siteMetadata.siteUrl,
  output: 'hybrid',
  integrations: [mdx(), sitemap(), tailwind({
    applyBaseStyles: false
  }), react({
    include: ['**/react/*']
  })],
  adapter: vercel()
});