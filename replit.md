# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Contains the RSR Media website — a full command-console-style media and intelligence-network brand site — plus a shared API server and design canvas.

## Artifacts

### RSR Media (`artifacts/rsr-media`)
- **Type**: React + Vite static SPA
- **Preview Path**: `/`
- **Stack**: React 19, Vite, TypeScript, Tailwind CSS 4, Framer Motion, Wouter, React Hook Form + Zod

### Pages
| Route | Page |
|---|---|
| `/` | Home (command-console hero, network modules, articles, armory CTA) |
| `/live-desk` | Live Desk (newsroom hub, article feed, search/filter) |
| `/articles` | Article List (all articles, X Dispatches section) |
| `/articles/:slug` | Article Detail (full article, source links, confidence label) |
| `/reports` | Reports & Publications (Investigations, Briefs, Field Notes, Special Reports) |
| `/broadcasts` | Broadcasts & Shows (7 shows + Nothing Personal) |
| `/network` | RSR Intelligence Network (ecosystem map) |
| `/pacific-systems` | Pacific Systems (amber/orange accents, data infrastructure) |
| `/press-corps` | Press Corps (field standards, contributor CTA) |
| `/armory` | RSR Armory (links to rsrarmory.store) |
| `/submit-tip` | Submit Tip (mailto form, source protection) |
| `/contact` | Contact (6 contact cards + form) |
| `/operator` | Admin Dashboard (scaffolded, backend not connected) |
| `/*` | 404 (themed "Signal Lost") |

### Design System
- **Fonts**: Orbitron (headings/nav/buttons), IBM Plex Mono (data/status), Inter (body)
- **Colors**: Near-black base, emerald primary, ice-blue accent, amber for Pacific Systems only
- **Effects**: Boot sequence (sessionStorage), scanline overlay, animated grid, corner brackets, terminal ticker
- **Motion**: Framer Motion entry animations, prefers-reduced-motion supported

### Key Files
- `src/lib/constants.ts` — SITE_PHONE, SITE_EMAIL, ARMORY_URL (edit these to configure)
- `src/lib/articles.ts` — Article data model + ARTICLES array (add articles here)
- `src/lib/analytics.ts` — Analytics abstraction (wire to Plausible/Umami/custom)
- `src/lib/seo.ts` — useSEO hook (sets page title + meta per page)
- `src/services/` — Stubbed articleService, xImportService, analyticsService (backend ready)
- `src/components/ui-system/` — CommandButton, SectionHeader, StatusPill, TerminalTicker, etc.
- `src/components/articles/` — ArticleCard, ArticleDetail
- `src/components/admin/` — AdminShell, StatsPanel, ArticleEditorMock
- `public/robots.txt` — Disallows /operator, references sitemap
- `public/_redirects` — SPA fallback for EdgeOne deployment

### Deployment (EdgeOne)
- Build output: `dist/`
- SPA fallback: `public/_redirects` → `/* /index.html 200`
- `public/robots.txt` configured for rsrmedia.org

### To Configure
1. Set phone number: edit `SITE_PHONE` in `src/lib/constants.ts`
2. Add articles: add entries to `ARTICLES` array in `src/lib/articles.ts`
3. Wire analytics: implement stubs in `src/lib/analytics.ts`

---

### API Server (`artifacts/api-server`)
- **Type**: Express 5 API
- **Preview Path**: `/api`

### Canvas (`artifacts/mockup-sandbox`)
- **Type**: Design sandbox
- **Preview Path**: `/__mockup`

## Stack
- **Monorepo tool**: pnpm workspaces
- **Node.js**: 24
- **TypeScript**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM (provisioned, no schema yet)
- **Build**: esbuild (CJS bundle)
