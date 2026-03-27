// @ts-check
import mdx from '@astrojs/mdx';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import remarkFootnotes from 'remark-footnotes';
import { SITE_URL } from './src/consts.ts';
import preact from '@astrojs/preact';
import { visualizer } from 'rollup-plugin-visualizer';
import fs from 'fs';
import path from 'path';

// Build a slug → ISO date map from blog post frontmatter so sitemap
// lastmod reflects real publish/updated dates instead of build time.
function getBlogPostDates() {
  const contentDir = path.join(process.cwd(), 'src/content/blog');
  /** @type {Record<string, string>} */
  const dateMap = {};
  try {
    const dirs = fs.readdirSync(contentDir, { withFileTypes: true });
    for (const dirent of dirs) {
      if (!dirent.isDirectory()) continue;
      const indexPath = path.join(contentDir, dirent.name, 'index.md');
      if (!fs.existsSync(indexPath)) continue;
      const content = fs.readFileSync(indexPath, 'utf-8');

      // Use explicit slug from frontmatter, otherwise derive from directory name
      const slugMatch = content.match(/^slug:\s*(.+)$/m);
      let slug = slugMatch?.[1]?.trim();
      if (!slug) {
        slug = dirent.name.replace(/^\d{4}_\d{2}_\d{2}_/, '');
      }

      const updatedMatch = content.match(/^updatedDate:\s*(.+)$/m);
      const pubMatch = content.match(/^pubDate:\s*(.+)$/m);
      const dateStr = (updatedMatch?.[1] || pubMatch?.[1])?.trim();
      if (dateStr && slug) {
        try {
          dateMap[slug] = new Date(dateStr).toISOString();
        } catch (_) {}
      }
    }
  } catch (_) {}
  return dateMap;
}

const blogDates = getBlogPostDates();

export default defineConfig({
  site: SITE_URL,
  integrations: [
    sitemap({
      serialize(item) {
        // Blog post URLs: /writing/<slug>
        const writingMatch = item.url.match(/\/writing\/([^/]+)\/?$/);
        if (writingMatch) {
          const date = blogDates[writingMatch[1]];
          if (date) return { ...item, lastmod: date };
        }
        // Static and listing pages: omit lastmod rather than use build time
        return item;
      },
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
