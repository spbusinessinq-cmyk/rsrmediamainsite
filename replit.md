# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Contains the RSR Media website — a full command-console-style media and intelligence-network brand site — plus a shared API server and design canvas.

## Artifacts

### RSR Media (`artifacts/rsr-media`)
- **Type**: React + Vite static SPA
- **Preview Path**: `/`
- **Stack**: React 19, Vite, TypeScript, Tailwind CSS 4, Framer Motion, Wouter, React Hook Form + Zod

### Pages / Routes
| Route | Page |
|---|---|
| `/` | Home (hero, network cards, reports preview, tip line + armory CTAs) |
| `/about` | About RSR Media (what we are, editorial principles, network fit) |
| `/mission` | Our Promise (core principles, will/won't do list) |
| `/reports` | Reports (searchable, filterable archive — backed by API) |
| `/reports/:slug` | Report Detail (full body, PDF embed/download, source links, tags) |
| `/doctrine-library` | Doctrine Library (Policy Files + Sovereignty Briefs + featured) |
| `/network` | RSR Network (ecosystem map + external system cards) |
| `/pacific-systems` | Pacific Systems (amber accents, data infrastructure, external link) |
| `/black-dog` | Black Dog Security (crimson accents, external link) |
| `/armory` | RSR Armory (external link → rsrarmory.store) |
| `/tip-line` | Tip Line (structured mailto form, phone, source protection info) |
| `/contact` | Contact (contact cards by topic, hotline, newsroom email) |
| `/admin` | Admin Dashboard (owner-only, backend pending) |
| `/admin/reports` | Admin → Report Manager |
| `/admin/tips` | Admin → Tip Intake Queue |
| `/admin/settings` | Admin → System Settings (shows site.ts values) |
| `/*` | 404 ("Signal Lost") |

### Design System
- **Fonts**: Orbitron (headings / `font-serif` class), IBM Plex Mono (monospace), Inter (body)
- **Colors**: Near-black base (#0a0a0a), emerald primary, ice-blue accent, amber for Pacific Systems, crimson for Black Dog
- **Effects**: Boot sequence (sessionStorage skip), scanline overlay, animated grid, corner brackets, terminal ticker
- **Motion**: Framer Motion entry animations, prefers-reduced-motion respected

### Key Files
- `src/config/site.ts` — All official URLs + contact constants (SITE_PHONE, SITE_EMAIL, RSR_INTEL_URL, PACIFIC_SYSTEMS_URL, BLACK_DOG_URL, ARMORY_URL)
- `src/types/report.ts` — Report type definition
- `src/hooks/useReports.ts` — `usePublishedReports`, `useAllReports`, `useReportBySlug` (backed by API)
- `src/hooks/useAdminAuth.ts` — cookie-session admin auth via API
- `src/data/networkLinks.ts` — NETWORK_LINKS array with all 4 external network properties
- `src/data/missionPrinciples.ts` — CORE_PRINCIPLES, WILL_DO, WONT_DO for Mission page
- `src/lib/formatPhone.ts` — getDisplayPhone() / getPhoneHref() helpers (safe placeholder handling)
- `src/lib/analytics.ts` — trackPageView, trackOutboundClick, trackTipClick, trackReportView stubs
- `src/lib/seo.ts` — useSEO hook (sets page title + meta)
- `src/services/admin.ts` — Admin API stubs (backend pending)
- `src/components/ui-system/` — CommandButton, SectionHeader, StatusPill, TerminalTicker, ExternalSystemCard, GlassPanel, LogoWatermark
- `src/components/reports/ReportCard.tsx` — Report card for grid layouts
- `src/components/admin/` — AdminShell (new /admin routes), StatsPanel, ArticleEditorMock
- `public/rsr-logo.png` — RSR logo (used in header, footer, watermark)
- `public/robots.txt` — Disallows /admin, references sitemap
- `public/_redirects` — SPA fallback for EdgeOne deployment

### Backend (live)
- Reports are persisted in Postgres (`reports` table, `lib/db/src/schema/reports.ts`) and served by `@workspace/api-server`.
- PDF + hero image uploads go through Replit Object Storage via admin-only presigned URLs (`POST /api/storage/uploads/request-url`).
- Admin auth is a signed httpOnly cookie. Default passcode `4451` (dev only) — set `ADMIN_PASSCODE` and `SESSION_SECRET` env vars in production (server fails to boot if missing in prod).
- 4 seed Policy Files/Sovereignty Briefs are inserted on first boot if the table is empty.

### To Configure
1. **Set phone number**: change `SITE_PHONE` in `src/config/site.ts` to the real RSR hotline number.
2. **Set admin secrets in production**: `ADMIN_PASSCODE` (login code), `SESSION_SECRET` (cookie signing key).
3. **Wire analytics**: implement stubs in `src/lib/analytics.ts` (Plausible/Umami).
4. **Publish reports**: log in at `/admin` with the passcode and create reports via the Report Editor (upload PDF + optional hero image, set Published).

### Removed / Cleaned Up (500-point correction pass)
- Deleted: `src/lib/constants.ts`, `src/lib/articles.ts`, `src/components/articles/`
- Deleted pages: LiveDesk, ArticleList, ArticleDetailPage, Broadcasts, SubmitTip, PressCorps
- Removed routes: /live-desk, /articles, /articles/:slug, /broadcasts, /submit-tip, /press-corps, /operator
- Admin route renamed from /operator to /admin

### Deployment (EdgeOne)
- Build output: `dist/`
- SPA fallback: `public/_redirects` → `/* /index.html 200`
- `public/robots.txt` configured for rsrmedia.org

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
