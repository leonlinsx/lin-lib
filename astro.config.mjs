// @ts-check
import mdx from '@astrojs/mdx';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import remarkFootnotes from 'remark-footnotes';
import { SITE_URL } from './src/consts.ts';
import preact from '@astrojs/preact';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  site: SITE_URL,
  integrations: [
    sitemap({
      // Exclude low-value / non-indexable pages from the sitemap.
      filter: (page) =>
        !page.includes('/writing/search') &&
        !page.startsWith('https://linlib.com/tags/'),
    }),
    mdx(),
    preact(),
  ],
  markdown: {
    // @ts-expect-error - remarkFootnotes typing mismatch
    remarkPlugins: [[remarkFootnotes, { inlineNotes: true }]],
  },

  // ✅ Redirects must be an object
  redirects: {
    '/writing': { destination: '/writing/1', status: 308 },
    '/writing/category/:category': {
      destination: '/writing/category/:category/1',
      status: 308,
    },
    '/newsletter': '/',
  },

  vite: {
    plugins: [
      visualizer({
        filename: 'dist/stats.html',
        template: 'treemap', // or 'sunburst', 'network'
      }),
    ],
  },
});
