---
schema: 1
id: 1208265953
full_name: kod88vn/poc_next_mfa
commit: d20db8260825dc17ad4c68ac6df0595c1c59df23
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

# 273 — kod88vn/poc_next_mfa

## Repository overview

A Next.js 16 Multi-Zones proof of concept in an npm workspaces + Turborepo monorepo (README.md:1, 3). Three Next.js applications: `apps/shell` (port 3000), the host with the homepage and global navigation (README.md:18; apps/shell/package.json:7, 9); `apps/shop` (port 3001), product listing and detail under `basePath: '/shop'` (apps/shop/next.config.js:19; apps/shop/package.json:7, 9); and `apps/duda` (port 3002), under `basePath: '/duda'` (apps/duda/next.config.js:6; apps/duda/package.json:7, 9). Library `packages/ui` (`@repo/ui`) provides the common `Header` and is compiled into each app through `transpilePackages` (apps/shell/next.config.js:9); it is shared code, not a unit.

Composition occurs through routes on the server, rather than mounting on the page. The shell declares in `rewrites()` that `/duda` goes to `http://localhost:3002/duda` and `/shop` and `/shop/:path*` go to `http://localhost:3001/shop...` (apps/shell/next.config.js:25-43); the comment calls this "MULTI-ZONE ROUTING — the core MFE \"string\"" (apps/shell/next.config.js:12). Zones respond at the path declared by their `basePath` and allow CORS for the shell's origin (apps/shop/next.config.js:29-41; apps/duda/next.config.js:10-22). Each zone renders the entire page with its own layout. As in 013 and 237, none of types `host → remote`, `root-config → application`, `application → custom-element` or `page → embedded-frontend` describes this entry form, so both route relationships are `other`.

The second connection is the cart counter. Shop's Server Action `addToCart` writes cookie `mfe_cart_count` with `path: '/'` (apps/shop/app/actions.ts:26-31), and shell and duda layouts read it and pass it as `cartCount` to `Header` (apps/shell/app/layout.tsx:29-32, 58; apps/duda/app/layout.tsx:24-27, 82). The README describes the cookie as shared "by both zones" (README.md:13, 72), written before the duda zone, which also reads it.

What did not become a relationship: navigation between zones is through full-page links (`<a href="/shop">` and `<a href="/duda">` in apps/shell/app/page.tsx:67-78 and in the shared `Header`, packages/ui/src/Header.tsx:73-85), which is not a relationship type. The duda zone fetches HTML from an external Duda builder website on the server and injects it into the page (apps/duda/app/page.tsx:10-13); that website is not a repository unit, and the only occurrence of `<iframe` in code is sanitization removing iframes from that HTML (apps/duda/lib/duda-landing.ts:387). A particularity of duda's rewrite: it covers only `/duda`, without the `/duda/:path*` form that shop has (apps/shell/next.config.js:29 and 39).

## Relationships

| # | Source | Target | Type | Direction | Mechanism | In snapshot | Active | Configuration | Code |
|---|---|---|---|---|---|---|---|---|---|
| 1 | apps/shell | apps/duda | other | source → target | other | Yes | Yes | apps/shell/next.config.js:28-31 (`/duda` → `http://localhost:3002/duda`); apps/duda/next.config.js:6 (`basePath: '/duda'`); apps/duda/package.json:7, 9 (port 3002) | apps/shell/next.config.js:25 |
| 2 | apps/shell | apps/shop | other | source → target | other | Yes | Yes | apps/shell/next.config.js:32-41 (`/shop` and `/shop/:path*` → `http://localhost:3001/shop...`); apps/shop/next.config.js:19 (`basePath: '/shop'`); apps/shop/package.json:7, 9 (port 3001) | apps/shell/next.config.js:25 |
| 3 | apps/shop | apps/duda | communication | source → target | other | Yes | Yes | — | apps/shop/app/actions.ts:26 |
| 4 | apps/shop | apps/shell | communication | source → target | other | Yes | Yes | — | apps/shop/app/actions.ts:26 |

## Observations

**1. apps/shell → apps/duda.** The shell forwards `/duda` to `http://localhost:3002/duda` (apps/shell/next.config.js:28-31). The target was resolved through the path: `/duda` is the `basePath` of `apps/duda` (apps/duda/next.config.js:6), whose `DudaPage` page responds at that route (apps/duda/app/page.tsx:9); port 3002 in scripts `dev`/`start` (apps/duda/package.json:7, 9) only corroborates. Type and mechanism are `other`: the shell neither loads zone modules nor registers it in an orchestrator; it forwards the request to another application, which responds with the entire page (Next.js Multi-Zones through `rewrites`), as in 013 and 237. Direction follows forwarding. Only route `/duda` is in the rewrite; the zone has a single page.

**2. apps/shell → apps/shop.** Same pattern with `/shop` and `/shop/:path*` to `http://localhost:3001/shop` and `http://localhost:3001/shop/:path*` (apps/shell/next.config.js:32-41). Prefix `/shop` is the `basePath` of `apps/shop` (apps/shop/next.config.js:19), and the zone's comment says that the shell rewrite forwards `localhost:3000/shop/*` to it (apps/shop/next.config.js:13-14); port 3001 (apps/shop/package.json:7, 9) corroborates. The same code line supports relationships 1 and 2.

**3. apps/shop → apps/duda.** Server Action `addToCart` writes cookie `mfe_cart_count` with `path: '/'` (apps/shop/app/actions.ts:26-31), triggered by forms `<form action={addToCart}>` (apps/shop/app/page.tsx:124; apps/shop/app/[id]/page.tsx:141). The duda layout reads the cookie (apps/duda/app/layout.tsx:24-27) and passes the count to `Header` (apps/duda/app/layout.tsx:82). Mechanism `other`: this is state shared through a cookie, rather than event exchange, as in cookie relationships in 013; there is no `events` channel in this repository. Reading was not recorded as a construct in the source code review, so direction follows writing, the only recorded construct.

**4. apps/shop → apps/shell.** The same cookie, read by the shell layout (apps/shell/app/layout.tsx:29-32) and passed to `Header` (apps/shell/app/layout.tsx:58). The same observation on mechanism and direction applies. Shop itself also reads the cookie in its layout (apps/shop/app/layout.tsx:32-35), which is not an inter-unit relationship.

## Summary

Relationships: 4 (other: 2, communication: 2). Active: 4. Target outside the snapshot: 0.
Units without a relationship: none.

