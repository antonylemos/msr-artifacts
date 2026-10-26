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
  inspection:
    output: data/inspections/mfe-dependencies-001
    version: "1"
    config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 381 — kamulupraneeth/nextjs-mfe-platform

## Repository overview

A demonstration platform with three independent Next.js applications joined by Next.js Multi-Zones, without workspace or shared package. Each app has its own `package.json` and port: `host-shell` (3000), with homepage and global navigation; `analytics-dashboard` (3001), a telemetry dashboard; and `workspace-document` (3002), a document editor (host-shell/package.json:6, analytics-dashboard/package.json:6, workspace-document/package.json:6).

Composition occurs through server routes rather than page mounting. `host-shell` declares in `rewrites()`, in phase `beforeFiles`, that `/analytics`, `/analytics/api/metrics`, `/analytics/:path` and assets `/analytics-assets/_next/:path*` go to `ANALYTICS_URL`, and `/workspace`, `/workspace/:path*` and `/workspace-assets/_next/:path*` go to `WORKSPACE_URL` (host-shell/next.config.ts:10-46). Both URLs are `PRODUCTION_ANALYTICS_URL` and `PRODUCTION_WORKSPACE_URL` or default to `http://localhost:3001` and `http://localhost:3002` (host-shell/next.config.ts:3-6). Each zone responds at the path declared by its `basePath` and serves chunks under its own `assetPrefix` (analytics-dashboard/next.config.ts:5-6; workspace-document/next.config.ts:5, 7), to coexist under shell's origin. Each zone renders the entire page with its own layout. As in 013, 237 and 273, none of types `host → remote`, `root-config → application`, `application → custom-element` or `page → embedded-frontend` describes this entry form, hence both relationships are `other`.

Routing particularities: shell also forwards a zone API route, `/analytics/api/metrics` (host-shell/next.config.ts:19-23), the SSE stream opened by the dashboard page with `new EventSource("/analytics/api/metrics")` (analytics-dashboard/src/app/page.tsx:68), served by analytics-dashboard/src/app/api/metrics/route.ts. This is the zone communicating with its own backend through shell's origin, rather than inter-unit communication. Pattern `/analytics/:path` (host-shell/next.config.ts:26) covers one segment, without the `*` present in `/workspace/:path*` (host-shell/next.config.ts:40).

What did not become a relationship: navigation between zones uses full-page links, with `<a href>` to `/analytics` and `/workspace` in the global bar (host-shell/src/components/GlobalNavbar.tsx:12-13, 41-43; the comment at :38 says `Link` was replaced by `<a>`) and `<Link href={app.path}>` in homepage cards (host-shell/src/app/page.tsx:11, 19, 74-75); links are not a relationship type. `postMessage` in analytics-dashboard occurs between the page and the unit's own filtering Web Worker (analytics-dashboard/src/app/page.tsx:30, 41, 97), and workspace-document's `indexedDB` holds the unit's own draft (workspace-document/src/utils/indexedDB.ts:11). There is no shared state or message exchange between zones.

## Relationships

| # | Source | Target | Type | Direction | Mechanism | In snapshot | Active | Configuration | Code |
|---|---|---|---|---|---|---|---|---|---|
| 1 | host-shell | analytics-dashboard | other | source → target | other | Yes | Yes | host-shell/next.config.ts:3-4, 14-33 (`ANALYTICS_URL`, default `http://localhost:3001`; `/analytics`, `/analytics/api/metrics`, `/analytics/:path`, `/analytics-assets/_next/:path*`); analytics-dashboard/next.config.ts:5-6 (`basePath: "/analytics"`, `assetPrefix: "/analytics-assets"`); analytics-dashboard/package.json:6 (port 3001) | host-shell/next.config.ts:10 |
| 2 | host-shell | workspace-document | other | source → target | other | Yes | Yes | host-shell/next.config.ts:5-6, 35-46 (`WORKSPACE_URL`, default `http://localhost:3002`; `/workspace`, `/workspace/:path*`, `/workspace-assets/_next/:path*`); workspace-document/next.config.ts:5, 7 (`basePath: "/workspace"`, `assetPrefix: "/workspace-assets"`); workspace-document/package.json:6 (port 3002) | host-shell/next.config.ts:10 |

## Observations

**1. host-shell → analytics-dashboard.** Shell forwards `/analytics`, `/analytics/api/metrics`, `/analytics/:path` and `/analytics-assets/_next/:path*` to `ANALYTICS_URL` (host-shell/next.config.ts:14-33). The target was resolved through path: `/analytics` is the `basePath` and `/analytics-assets` the `assetPrefix` of `analytics-dashboard` (analytics-dashboard/next.config.ts:5-6), and route `/api/metrics` exists in the zone (analytics-dashboard/src/app/api/metrics/route.ts). Default `http://localhost:3001` (host-shell/next.config.ts:4) and the `dev` script's port (analytics-dashboard/package.json:6) only corroborate. Type and mechanism are `other`: shell neither loads zone modules nor registers it in an orchestrator; it forwards the request to another application, responding with the entire page (Next.js Multi-Zones through `rewrites`). Direction follows forwarding. Active `Yes` through the manual `host-relationship` source code review line (host-shell/next.config.ts:10).

**2. host-shell → workspace-document.** Same pattern with `/workspace`, `/workspace/:path*` and `/workspace-assets/_next/:path*` to `WORKSPACE_URL` (host-shell/next.config.ts:35-46). `/workspace` is the `basePath` and `/workspace-assets` the `assetPrefix` of `workspace-document` (workspace-document/next.config.ts:5, 7); default `http://localhost:3002` (host-shell/next.config.ts:6) and port 3002 (workspace-document/package.json:6) corroborate. The same code line supports relationships 1 and 2.

## Summary

Relationships: 2 (other: 2). Active: 2. Target outside the snapshot: 0.
Units without a relationship: none.

