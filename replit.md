# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Contains the RSR Media website — a dark, intelligence-network-style media brand site — plus a shared API server and design canvas.

## Artifacts

### RSR Media (`artifacts/rsr-media`)
- **Type**: React + Vite static SPA
- **Preview Path**: `/`
- **Description**: Full public-facing website for RSR Media — 10 pages covering the organization, its ecosystem (RSR Intelligence Network, Pacific Systems, Press Corps), broadcasts, reports, tip submission, and contact.
- **Pages**: Home, About, Network, Pacific Systems, Press Corps, Broadcasts, Reports, Submit Tip, Contact, 404
- **Stack**: React 19, Vite, TypeScript, Tailwind CSS 4, Framer Motion, Wouter, React Hook Form + Zod
- **Design**: Dark charcoal base, emerald/ice-blue accents, JetBrains Mono labels, Playfair Display headlines, Inter body, animated grid, scanlines, glass panels

### API Server (`artifacts/api-server`)
- **Type**: Express 5 API
- **Preview Path**: `/api`
- **Description**: Shared backend server. Currently serves only a health check endpoint. No database-backed features yet.

### Canvas (`artifacts/mockup-sandbox`)
- **Type**: Design sandbox
- **Preview Path**: `/__mockup`

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM (provisioned but no schema yet)
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
