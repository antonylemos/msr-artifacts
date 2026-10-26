---
schema: 1
id: 1208265953
full_name: kod88vn/poc_next_mfa
commit: d20db8260825dc17ad4c68ac6df0595c1c59df23
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 273 — kod88vn/poc_next_mfa

## Mined constructs

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| src-iframe | apps/duda/lib/duda-landing.ts:387 | apps/duda | none | No | Regular expression that **removes** `<iframe>` blocks from the external Duda page HTML (`sanitizeLandingHtml`, apps/duda/lib/duda-landing.ts:363, together with `<script>` and `<noscript>` at :385-386); does not embed any unit, this is content sanitization |

## Constructs outside mining

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| manual | apps/shell/next.config.js:25 | apps/shell | host-relationship | Yes | `async rewrites()` declares which applications shell uses and under which paths: `/duda` to `http://localhost:3002/duda`, `/shop` to `http://localhost:3001/shop` and `/shop/:path*` to `http://localhost:3001/shop/:path*` (apps/shell/next.config.js:25-43); the targets are apps `apps/duda` and `apps/shop`, started on those ports (apps/duda/package.json:7,9; apps/shop/package.json:7,9) and responding at the path declared by their `basePath` (apps/duda/next.config.js:6, apps/shop/next.config.js:19). Config exported at apps/shell/next.config.js:46 |
| manual | apps/shop/app/actions.ts:26 | apps/shop | communication | Yes | The Server Action `addToCart` writes cookie `mfe_cart_count` with `path: '/'` (apps/shop/app/actions.ts:26-31), sharing cart count with the other zones under the same shell origin; triggered by the `<form action={addToCart}>` forms at apps/shop/app/page.tsx:124 and apps/shop/app/[id]/page.tsx:141. The cookie is read by the other units at apps/shell/app/layout.tsx:30 and apps/duda/app/layout.tsx:25 (also apps/shop/app/layout.tsx:33) and passed as `cartCount` to `Header` from `@repo/ui` (apps/shell/app/layout.tsx:58, apps/duda/app/layout.tsx:82) |

## Summary

Constructs participating in composition: 2 (host-relationship: 1, communication: 1).

## Notes

- The only `src-*` row in `matches.csv` is a `src-iframe` false positive. Multi-zone composition appears in `cfg-*` occurrences: `cfg-route-rewrites` at apps/shell/next.config.js:25 (rewrites `/duda` to `http://localhost:3002/duda`, `/shop` and `/shop/:path*` to `http://localhost:3001/shop...`, :26-42) and `cfg-zone-path` at apps/shop/next.config.js:19 (`basePath: '/shop'`) and apps/duda/next.config.js:6 (`basePath: '/duda'`).
- The step 4 search (`import(`, `React.lazy`, `loadRemote*`, `customElements`, `registerApplication`, `<iframe`, `postMessage`, `CustomEvent`, `BroadcastChannel`, `createElement('script'`) found only the mining row: there is no loading, mounting or embedding of one unit within another in source code.
- Navigation between zones uses full-page links (`<a href="/shop">`, `<a href="/duda">` at apps/shell/app/page.tsx:68,74 and in the shared `Header`, packages/ui/src/Header.tsx:74,81). Navigation links are not among the step 4 types, so they did not become rows.
- `Header` comes from library `@repo/ui` (`packages/ui`, `No` in the structural review), compiled in each app through `transpilePackages`; shared code rather than a unit mounted in another.
- apps/duda fetches on the server the HTML of an external Duda builder site (`DUDA_ORIGIN`, default `https://pocmfe.multiscreensite.com/`, apps/duda/lib/duda-landing.ts:4; `fetchText(DUDA_LANDING_URL)`, :488) and injects it through `dangerouslySetInnerHTML` (apps/duda/app/page.tsx:13), after removing scripts and iframes. This is third-party site content rather than a frontend unit of the system, so it did not become a row.
- Researcher decision (24/10/2026), valid for all repositories: when the host’s `rewrites()` declares a remote app under a path (`cfg-route-rewrites` in `matches.csv`), option B decided in 013-nikJovanovic__ita-vaje applies; apps/shell/next.config.js:25 therefore entered as a manual `host-relationship` / `Yes` row despite being a `cfg-route-rewrites` occurrence in `matches.csv`.
