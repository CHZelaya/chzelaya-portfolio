# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
pnpm dev          # Start Next.js dev server at localhost:3000
pnpm build        # Production build
pnpm lint         # Run ESLint
pnpm typegen      # Extract Sanity schema → src/sanity/extract.json, then generate TypeScript types → src/sanity/types.ts
```

Run `pnpm typegen` after any change to files in `src/sanity/schemaTypes/`.

## Site mechanic — three-panel horizontal SPA

The homepage (`src/app/page.tsx`) is a single-page app with three full-viewport panels arranged horizontally. Navigation is intentional — arrow buttons, keyboard arrows, touch swipe (50px threshold). The panel strip animates via `transform: translateX()`. **Center panel (About) is the landing state.**

Panel order:
- **Panel 0** — Software Engineering 
- **Panel 1** — About / Center 
- **Panel 2** — Photography & Film 

Navigation UI (all fixed to viewport):
- Left/right arrow buttons, vertically centered — left hidden on Panel 0, right hidden on Panel 2
- Zone label top-center, updates per panel
- Three dots bottom-center, active dot color matches current panel accent

Content animation: when a panel becomes active, its children animate in with staggered delays — `opacity: 0→1`, `translateY: 16px→0`. Children are invisible while the panel is inactive.

Each panel scrolls independently on its Y axis when content overflows. The horizontal stage itself never scrolls.

## App Router structure

```
src/
  app/
    (frontend)/
        page.tsx                  ← three-panel SPA (RSC, fetches all data)
        layout.tsx                ← root layout, fonts               ← route group; layout mounts <SanityLive />
    projects/
      page.tsx                ← full project library (SSR)
      [slug]/page.tsx         ← project detail (SSR)
    photography/
      page.tsx                ← photography library (SSR)
      [slug]/page.tsx         ← media detail (SSR)
    studio/[[...tool]]/
      page.tsx                ← embedded Sanity Studio at /studio
  components/
    panels/                   ← DevPanel, CenterPanel, PhotoPanel
    ui/                       ← NavArrows, ZoneDots, Cursor
    cards/                    ← ProjectCard, PhotoCard
  lib/
    types.ts
    utils.ts
```

All routes under `/projects` and `/photography` are standard SSR MPA pages. Only the homepage is the SPA.

## Data fetching rule

The homepage RSC fetches all data in parallel and passes results as props to client components. **Never fetch inside client components.**

```ts
const [about, featuredProjects, featuredMedia] = await Promise.all([
  sanityFetch({ query: aboutQuery }),
  sanityFetch({ query: featuredProjectsQuery }),
  sanityFetch({ query: featuredMediaQuery }),
])
```

## Sanity integration

- **Config**: `sanity.config.ts` — Studio base path, project/dataset, schema, plugins
- **Env**: `src/sanity/env.ts` — reads `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `NEXT_PUBLIC_SANITY_API_VERSION`
- **Client/live**: `src/sanity/lib/client.ts`, `src/sanity/lib/live.ts` — use `sanityFetch` for all queries
- **Queries**: `src/sanity/lib/queries.ts` — all GROQ queries live here, use `defineQuery`
- **Structure**: `src/sanity/structure.ts` — `about` is a singleton (fixed `documentId: 'about'`)

### Content schema (`src/sanity/schemaTypes/`)

| Type Notes   |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `about`      | Singleton. name, slug, shortBio, photo, resumeFile, socials (github/linkedin/instagram)                                                                                                                                                        |
| `Project`    | Case study. title, slug, featured, coverImage, summary, year, `caseStudyBody` (portableText sections: problem/constraints/approach/execution/outcome/reflection), `caseStudyImages`, `technologies` (refs to Technology), githubLink, liveLink |
| `Technology` | Referenced by `Project.technologies`                                                                                                                                                                                                           |
| `media`      | Photography/film media asset                                                                                                                                                                                                                   |

Generated types live in `src/sanity/types.ts` — **do not edit manually**. Do not hand-write query result types; always run `pnpm typegen`.

## TypeScript rules

- No `any` types
- Sanity TypeGen provides all query result types
- `pnpm typegen` must be run after every schema change

## Custom cursor

Small dot (follows mouse precisely) + larger ring (follows with lag). Scales up on interactive elements. Uses `mix-blend-mode: difference`. Implemented as a client component at `src/components/ui/Cursor.tsx`.

## Branching strategy

Gitflow-lite: `feature/*` → `dev` (PR) → `main` (PR). GitHub Actions CI runs on push.

## Key dependencies

- **Next.js 16.2.1** with React Compiler enabled (`reactCompiler: true`)
- **Tailwind CSS v4** via `@tailwindcss/postcss`
- **next-sanity v11** — `defineLive`, `SanityLive`, `sanityFetch`
- **Sanity v4** — embedded Studio, TypeGen


## Typography

- Display:    Bebas Neue — hero text, names, section titles
- Monospace:  JetBrains Mono (300, 400) — UI labels, code, metadata, handles
- Serif:      Cormorant Garamond (300, 300 italic) — captions, taglines, editorial moments

Google Fonts import:
https://fonts.googleapis.com/css2?family=Bebas+Neue&family=JetBrains+Mono:wght@300;400&family=Cormorant+Garamond:ital,wght@0,300;1,300&display=swap

<!-- convex-ai-start -->
This project uses [Convex](https://convex.dev) as its backend for the guestbook specific functionality.

When working on Convex code, **always read `convex/_generated/ai/guidelines.md` first** for important guidelines on how to correctly use Convex APIs and patterns. The file contains rules that override what you may have learned about Convex from training data.

Convex agent skills for common tasks can be installed by running `npx convex ai-files install`.
<!-- convex-ai-end -->
