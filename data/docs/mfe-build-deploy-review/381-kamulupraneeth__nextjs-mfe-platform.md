---
schema: 1
id: 1254311775
full_name: kamulupraneeth/nextjs-mfe-platform
commit: 750571ab7142f074b39122b82f94eaf5dc4181fa
inputs:
  mining:
    output: data/mining/mfe-mining-001
    version: "1"
    config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 381 — kamulupraneeth/nextjs-mfe-platform

## Repository overview

Three Next.js applications in sibling directories, without root `package.json` or workspace declaration: each has its own `package.json` and `package-lock.json` and is built separately. All three `package.json` files have identical create-next-app-generated scripts — `build: next build` and `start: next start` — differing only in port of `dev`: 3000 in `host-shell`, 3001 in `analytics-dashboard` and 3002 in `workspace-document` (host-shell/package.json:5-10; analytics-dashboard/package.json:5-10; workspace-document/package.json:5-10). Each `next build` generates application’s own `.next`, ignored by each `.gitignore` (host-shell/.gitignore:17; analytics-dashboard/.gitignore:17; workspace-document/.gitignore:17). No script triggers all three builds together.

No deployment artifact is present in snapshot: no Dockerfile, compose, CI workflow, hosting manifest (`vercel.json`, `netlify.toml`) or proxy configuration. All 12 `ops-hosting` occurrences in `matches.csv` are standard create-next-app text in all three application READMEs, lines 21, 30, 32 and 34 of each (e.g.: host-shell/README.md:32-34, "Deploy on Vercel"); no `ci-*` or `cfg-public-path` occurrences exist. The `.gitignore` files ignore `.vercel` (host-shell/.gitignore:36-37 and same lines in other two), also not hosting configuration.

Configuration anticipates a production environment without describing it: `host-shell` forwards zone routes to `PRODUCTION_ANALYTICS_URL` and `PRODUCTION_WORKSPACE_URL`, defaulting to `http://localhost:3001` and `http://localhost:3002` (host-shell/next.config.ts:3-6, 10-46). This assumes zones published at their own addresses, but no snapshot artifact defines these addresses or publishes applications. Snapshot execution is local: `next dev` on fixed ports, and `next start` without `--port`, leaving all three on default Next.js port if started in production without other configuration.

## Applications

| # | Application | Build | Deploy | Where served | Versioning | Artifacts |
|---|---|---|---|---|---|---|
| 1 | analytics-dashboard | separate | not observed | `/analytics` and `/analytics-assets` through shell (host-shell/next.config.ts:14-33); `PRODUCTION_ANALYTICS_URL`, default `http://localhost:3001` (host-shell/next.config.ts:3-4); `http://localhost:3001/analytics` (analytics-dashboard/package.json:6; analytics-dashboard/next.config.ts:5) | No | analytics-dashboard/package.json:7 (`next build`); analytics-dashboard/next.config.ts:3-7 (`basePath: "/analytics"`, `assetPrefix: "/analytics-assets"`) |
| 2 | host-shell | separate | not observed | `http://localhost:3000/` (host-shell/package.json:6) | No | host-shell/package.json:7 (`next build`); host-shell/next.config.ts:8-50 (`rewrites()` to zones) |
| 3 | workspace-document | separate | not observed | `/workspace`, `/workspace/:path*` and `/workspace-assets` through shell (host-shell/next.config.ts:35-46); `PRODUCTION_WORKSPACE_URL`, default `http://localhost:3002` (host-shell/next.config.ts:5-6); `http://localhost:3002/workspace` (workspace-document/package.json:6; workspace-document/next.config.ts:5) | No | workspace-document/package.json:7 (`next build`); workspace-document/next.config.ts:3-8 (`basePath: "/workspace"`, `assetPrefix: "/workspace-assets"`) |

## Observations

**1. analytics-dashboard.** Own build through `next build` (analytics-dashboard/package.json:7), with `basePath: "/analytics"` and `assetPrefix: "/analytics-assets"` (analytics-dashboard/next.config.ts:5-6), allowing serving under shell origin without collision with its chunks. No artifact packages or publishes it; only `dev` on port 3001 and `start` (analytics-dashboard/package.json:6, 8), hence deploy `not observed`. Production address exists only as a shell variable name (`PRODUCTION_ANALYTICS_URL`, host-shell/next.config.ts:4). Besides pages, shell forwards zone API route, `/analytics/api/metrics` (host-shell/next.config.ts:20-23), so its SSE backend is also served at this address. The `version: "0.1.0"` is unused in publication, in a `private` package (analytics-dashboard/package.json:3-4).

**2. host-shell.** Own build through `next build` (host-shell/package.json:7). The `rewrites()` reside in its configuration (host-shell/next.config.ts:10-46) and, unlike fixed addresses, read zone URLs from environment variables (host-shell/next.config.ts:3-6), defined by no snapshot file (`.env*` is in `.gitignore`, host-shell/.gitignore:34). No deployment artifact; starts on port 3000 through `next dev` (host-shell/package.json:6). The `version: "0.1.0"` is unused (host-shell/package.json:3-4).

**3. workspace-document.** Own build through `next build` (workspace-document/package.json:7), with `basePath: "/workspace"` and `assetPrefix: "/workspace-assets"` (workspace-document/next.config.ts:5, 7). No deployment artifact; starts on port 3002 through `next dev` (workspace-document/package.json:6) and is reached through shell at `/workspace` and `/workspace/:path*` (host-shell/next.config.ts:35-42), with production address named only as `PRODUCTION_WORKSPACE_URL` (host-shell/next.config.ts:6). The `version: "0.1.0"` is unused (workspace-document/package.json:3-4).

## Summary

Applications: 3. Build (separate: 3). Deploy (not observed: 3). Independent versioning: 0.
