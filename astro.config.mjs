import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import react from '@astrojs/react'
import { SITE_METADATA } from './src/data/consts.ts'

// https://astro.build/config
export default defineConfig({
  site: SITE_METADATA.siteUrl,

  integrations: [
    mdx(),
    sitemap(),
    tailwind({
      applyBaseStyles: false
    }),
    react({ include: ['**/react/*'] })
  ]
})
