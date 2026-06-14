# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
yarn dev          # Start dev server (localhost:4321)
yarn build        # Build + run pagefind indexing (postbuild step)
yarn preview      # Preview production build
yarn check        # TypeScript check via astro check
yarn format       # Prettier format all files including .astro
```

No test suite is configured.

## Architecture

This is an **Astro 4** personal blog site (antoniomarcal.pt) using MDX content, Tailwind CSS, and static output.

### Content layer

Blog posts live in `src/content/post/` as `.md` or `.mdx` files. The schema is defined in `src/content/config.ts` — required frontmatter: `title` (max 60), `description` (50–160 chars), `publishDate`. Optional: `updatedDate`, `coverImage`, `draft`, `tags`, `ogImage`. Tags are auto-lowercased and deduplicated.

Draft posts are included in dev but excluded from production builds (`PROD` env check in `src/data/post.ts`).

### Key config

- **`src/site.config.ts`** — single source of truth for site metadata (`siteConfig`) and nav links (`menuLinks`). Edit here to change author name, description, locale, webmentions endpoint, and header/footer navigation.
- **`astro.config.ts`** — integrations (MDX, Tailwind, Sitemap, expressive-code, astro-icon), remark/rehype plugins, prefetch, and a Vite plugin that inlines `.ttf`/`.woff` fonts as raw buffers (used for OG image generation).

### OG image generation

`src/pages/og-image/[slug].png.ts` generates per-post OG images at build time using **satori** + **@resvg/resvg-js**. Fonts from `src/assets/` are loaded as raw buffers via the Vite font plugin.

### Search

Full-text search is powered by **pagefind**, which runs after `astro build` via the `postbuild` script. The `src/components/Search.astro` component loads the pagefind UI from `/pagefind/`.

### Webmentions

`src/utils/webmentions.ts` fetches mentions from webmention.io. The endpoint domain is configured in `siteConfig.webmentions.link`.

### Path aliases

`@/` resolves to `src/` (configured in `tsconfig.json`).
