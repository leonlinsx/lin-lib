# AGENTS.md

LinLib is a minimal, focused wine education site (Astro, linlib.com). Keep Markdown content consistent with existing posts, reuse existing patterns in `src/` before introducing new ones, and avoid reformatting unrelated files.

## Content

- Blog articles live in `src/content/blog/YYYY_MM_DD_slug/`, each with an `index.md` following the frontmatter of nearby posts.
- `src/content/config.ts` defines two collections. `blog` requires `title` and `pubDate` and supports `description`, `updatedDate`, `category`, `tags`, `featured`, `heroImage`, `readingTime`, `slug`, `hubRefs`, and `primaryHub`. `hubs` requires `title` and `hubType` (`regions`, `grapes`, `styles`, or `producers`), and lives under `src/content/{regions,grapes,styles,producers}`.
- A slug comes from the folder name with a leading `YYYY_MM_DD_` removed, or from the frontmatter `slug` (trimmed, no leading or trailing slashes); colliding slugs get a `-YYYY` suffix (see `src/pages/writing/[slug].astro` and `src/utils/slug-helpers.ts`).
- Co-locate images with the post and prefer WebP. `heroImage` accepts a relative path such as `./img.webp`, resolved against the post folder (`src/utils/hero.ts`), or a full URL.
- Posts use Markdown; MDX is available through `@astrojs/mdx` but should be used only when needed. Footnotes use `remark-footnotes` inline notes.

## Verification

- `npm test` runs the TypeScript test suite, `npm run build` is the production validation, and `npm run linkcheck:internal` / `npm run linkcheck:external` check links. `npm run debug:tags` inspects tags.
- ESLint is configured in `eslint.config.js` but has no npm script; `package.json` scripts are the canonical commands.
- Inspect the final diff.
