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

## Workspace

`package.json:4-7` with `workspaces` (`apps/*`, `packages/*`), orchestrated by `turbo.json:5-26`.

## Units

| Directory | Markers | Manifest | Entry | Build | Workspace | Deploy | Frontend unit | Rationale |
|---|---|---|---|---|---|---|---|---|
| . | package.json | package.json:1-27 (root manifest, devDependencies `tsx` and `turbo`) | — | package.json:9 (`turbo build`, only delegates to workspace packages) | — | — | No | npm workspace root, with neither entry nor build configuration of its own. |
| apps/duda | apps/duda/next.config.js;apps/duda/package.json | apps/duda/package.json | apps/duda/app/layout.tsx:15 (`DudaLayout`, App Router); apps/duda/app/page.tsx:9 (`DudaPage` page under `basePath: '/duda'`) | apps/duda/next.config.js:5-23 (`basePath: '/duda'`, `transpilePackages`); apps/duda/package.json:6 (`next build`) | package.json:5 (`apps/*`) | — | Yes | Next.js app with its own entry and build |
| apps/shell | apps/shell/next.config.js;apps/shell/package.json | apps/shell/package.json | apps/shell/app/layout.tsx:22 (`RootLayout`, App Router); apps/shell/app/page.tsx:46 (`HomePage` page, route `/`) | apps/shell/next.config.js:5-44 (`rewrites()` for `/shop` and `/duda`); apps/shell/package.json:6 (`next build`) | package.json:5 (`apps/*`) | — | Yes | Next.js app with its own entry and build |
| apps/shop | apps/shop/next.config.js;apps/shop/package.json | apps/shop/package.json | apps/shop/app/layout.tsx:25 (`ShopLayout`, App Router); apps/shop/app/page.tsx:65 (`ShopPage` page under `basePath: '/shop'`) | apps/shop/next.config.js:5-42 (`basePath: '/shop'`, `transpilePackages`); apps/shop/package.json:6 (`next build`) | package.json:5 (`apps/*`) | — | Yes | Next.js app with its own entry and build |
| packages/ui | packages/ui/package.json | packages/ui/package.json | — (packages/ui/package.json:5-11 `main`/`exports` point to `./src/index.ts`, library) | — (packages/ui/package.json:13-16 only `lint`/`type-check`; compiled by the apps through `transpilePackages`) | package.json:6 (`packages/*`) | — | No | Shared library `@repo/ui`, with no application entry. |

## Summary

Frontend applications in the snapshot: 3 (apps/duda, apps/shell, apps/shop).

## Notes

- N = 3 matches the classification’s `frontend_units: 3`.
- `matches.csv` has no `ci-*` occurrences; it has 1 `ws-workspaces` (package.json:4), 3 `ws-path-alias` (for example apps/duda/tsconfig.json:24) and 2 `ops-cors` (apps/duda/next.config.js:16 and apps/shop/next.config.js:35); the `workspaces` declaration was confirmed by opening `package.json:4-7`.
- There is no Dockerfile, CI workflow or hosting configuration in the snapshot; the apps start on fixed local ports (apps/*/package.json:7 and `:9`).
- In the Next.js apps, the entry follows the App Router convention (`app/layout.tsx` + `page.tsx`), invoked by `next build`.
