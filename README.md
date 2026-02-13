# LinLib — Wine Education

A minimal, focused wine education platform built with Astro.

LinLib provides thoughtful essays and practical guides to help people understand, appreciate, and enjoy wine.

**Features:**

- ✅ Wine education articles and guides
- ✅ Search functionality
- ✅ RSS feed (linlib.com/rss.xml)
- ✅ Tagging system for topic organization
- ✅ SEO-optimized
- ✅ 100/100 Lighthouse performance
- ✅ Minimal, clean design

## 🚀 Project Structure

```text
├── public/
│   └── logos/             # Brand assets (linlib_logo.webp)
├── src/
│   ├── assets/images/     # Wine images (placeholder)
│   ├── components/        # Reusable UI components
│   ├── content/blog/      # Wine education articles
│   ├── layouts/           # Page templates
│   ├── pages/             # Routes (/, /writing, /about, /tags, /rss.xml)
│   └── styles/            # Global CSS
├── astro.config.mjs
├── package.json
└── README.md
```

**Key Routes:**
- `/` — Home page with hero and latest articles
- `/writing` — Blog listing with pagination
- `/writing/[slug]` — Individual wine education articles
- `/about` — About LinLib and contact
- `/tags` — Article tags
- `/rss.xml` — RSS feed

## 🧞 Commands

All commands are run from the root of the project:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:3000`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |

## 📝 Adding Wine Articles

Create a new directory in `src/content/blog/` with the format `YYYY_MM_DD_slug/`:

```
src/content/blog/2026_01_25_wine_basics/
├── index.md
└── (optional: image.jpg)
```

**Frontmatter example:**

```yaml
---
title: 'Wine Basics: Understanding the Fundamentals'
description: 'A beginner's guide to wine terminology and tasting'
pubDate: 2026-01-25
category: Wine Basics
tags: ['wine', 'education', 'fundamentals']
---
```

## 🔗 Deployment

Deploy to Netlify, Vercel, or any static hosting:

```bash
npm run build
```

The `dist/` folder contains your static site.

## 👤 About

LinLib is created and maintained by Leon Lin. Learn more at [leonlins.com](https://leonlins.com).
