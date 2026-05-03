# RSR Media — rsrmedia.org

Command-console-style news and public media site for Red State Rhetoric Media.

---

## Deploy — EdgeOne (Production)

### Install

```
npm install
```

### Build

```
npm run build
```

### Output

```
dist/
```

Point EdgeOne to the `dist/` directory. The `_redirects` file (`public/_redirects`) is automatically copied into `dist/` at build time:

```
/* /index.html 200
```

This ensures all client-side routes (React Router / Wouter) resolve correctly on direct navigation and refresh.

---

## Domain

**rsrmedia.org**

DNS will be pointed to EdgeOne after deployment. No backend required — this is a fully static SPA.

---

## Analytics

The analytics panel in `/admin/analytics` is scaffolded with local event tracking only (dev-mode console logs). For live production stats, connect one of:

- **Plausible** — drop the script tag into `index.html`
- **Umami** — drop the script tag into `index.html`
- **EdgeOne Serverless Analytics** — wire up an EdgeOne Function endpoint and POST events from `src/lib/analytics.ts`

No real analytics data is shown to site visitors. The admin panel clearly labels all figures as scaffolded.

---

## Admin Console

Path: `/admin`  
Passcode: set in `src/config/site.ts` → `ADMIN_PASSCODE`

The admin console is client-only. All data (reports, tips) is stored in `localStorage`. No backend required for basic operation.

---

## Stack

- React 19 + Vite
- Tailwind CSS 4
- Wouter (client-side routing)
- Framer Motion
- TypeScript strict
- pnpm monorepo

---

## Local Dev

```
pnpm install
PORT=3000 BASE_PATH=/ pnpm --filter @workspace/rsr-media run dev
```
