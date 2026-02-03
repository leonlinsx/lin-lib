# AGENTS.md

Guidance for AI agents working in this repository.

## Repository overview
- Project: Astro-based site
- Content: Blog posts in `src/content/blog/`
- Public assets: `public/`

## Primary workflows
- Install deps: `npm ci`
- Dev server: `npm run dev`
- Build: `npm run build`
- Preview: `npm run preview`
- Lint: `npm run lint`

## Code conventions
- Prefer minimal, focused changes.
- Keep Markdown content consistent with existing posts.
- Avoid reformatting unrelated files.
- Use existing patterns in `src/` before introducing new ones.

## Content guidelines
- Blog posts live under `src/content/blog/YYYY_MM_DD_slug/`.
- Each post uses an `index.md` in its folder.
- Follow existing frontmatter structure in nearby posts.

## Content schema (Astro collections)
- Schema file: `src/content/config.ts`.
- Required frontmatter: `title` (string), `pubDate` (date).
- Optional frontmatter: `description`, `updatedDate`, `category`, `tags` (array), `featured`, `heroImage`, `readingTime`, `slug`.

## Images & media
- Prefer co-locating images in the post folder (e.g. `src/content/blog/.../img.webp`).
- `heroImage` supports relative paths like `./img.webp` or a full URL.
- Relative `heroImage` paths resolve against the post folder (see `src/utils/hero.ts`).
- Use WebP when possible; existing posts use `.webp`.

## Slug & date rules
- Slug is derived from the folder name after removing a leading `YYYY_MM_DD_` prefix.
- Override with frontmatter `slug` (trimmed, no leading/trailing slashes).
- If two posts resolve to the same slug, the build appends `-YYYY` (see `src/pages/writing/[slug].astro` and `src/utils/slug-helpers.ts`).

## Markdown / MDX rules
- MDX is enabled via `@astrojs/mdx` (see `astro.config.mjs`).
- Posts currently use Markdown (`.md`); use MDX only when needed.
- Footnotes are supported via `remark-footnotes` with inline notes.

## Testing & validation
- Run `npm run lint` for JS/TS changes.
- Run `npm run build` for production validation when relevant.

## Notes for agents
- Check `package.json` scripts for the current canonical commands.
- If instructions conflict, prefer repository-local docs and existing patterns.
