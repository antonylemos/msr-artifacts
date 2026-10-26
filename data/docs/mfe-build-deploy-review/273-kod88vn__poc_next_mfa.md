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
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 273 — kod88vn/poc_next_mfa

## Repository overview

npm monorepo with `workspaces` `apps/*` and `packages/*` (package.json:4-7), orchestrated by Turborepo. Root `build` only calls `turbo build` (package.json:9), and task `build` in `turbo.json` runs each package build after its dependencies’ builds (`dependsOn: ["^build"]`) and saves each `.next/**` and `dist/**` as output (turbo.json:6-10). All three Next.js apps have the same script `build: next build` (apps/shell/package.json:6; apps/shop/package.json:6; apps/duda/package.json:6), generating each `.next` in its directory. Library `packages/ui` has no build script (packages/ui/package.json:13-16) and is compiled within each app through `transpilePackages: ['@repo/ui']` (apps/shell/next.config.js:9; apps/shop/next.config.js:23; apps/duda/next.config.js:8). README says pipeline ensures `packages/ui` is built before apps (README.md:84), but without package script `build`, `^build` has nothing to run there. All three `next.config.js` files load root `.env` through `load-root-env.js` (e.g.: apps/shell/next.config.js:2; load-root-env.js:4-28), only for variables such as `DUDA_ORIGIN` (turbo.json:4).

No deployment artifact is present in snapshot: no Dockerfile, compose, CI workflow, hosting manifest or proxy configuration. The `matches.csv` has no `ops-*`, `ci-*` or `cfg-public-path` occurrences (only header). The `.gitignore` ignores `.vercel` (.gitignore:31-32), but this is not hosting configuration. What exists is for local execution: each app starts with `next dev` or `next start` on a fixed port — 3000 for shell, 3001 for shop and 3002 for duda (apps/shell/package.json:7, 9; apps/shop/package.json:7, 9; apps/duda/package.json:7, 9) — and shell forwards `/duda` and `/shop` to `http://localhost:3002` and `http://localhost:3001` (apps/shell/next.config.js:25-43). Zones enable CORS for `http://localhost:3000`, and shop comment requests changing to actual origin "In a production deployment" (apps/shop/next.config.js:26-38; apps/duda/next.config.js:10-19). README discusses "independent deployability" (README.md:3), but documentation does not decide Deploy column.

## Applications

| # | Application | Build | Deploy | Where served | Versioning | Artifacts |
|---|---|---|---|---|---|---|
| 1 | apps/duda | separate | not observed | `/duda` through shell (apps/shell/next.config.js:28-31); `http://localhost:3002/duda` (apps/duda/next.config.js:6; apps/duda/package.json:7, 9) | No | apps/duda/package.json:6 (`next build`); apps/duda/next.config.js:5-23 (`basePath: '/duda'`, `transpilePackages`); package.json:9 (`turbo build`); turbo.json:6-10 (task `build`, output `.next/**`) |
| 2 | apps/shell | separate | not observed | `http://localhost:3000/` (apps/shell/package.json:7, 9) | No | apps/shell/package.json:6 (`next build`); apps/shell/next.config.js:5-44 (`transpilePackages`, `rewrites()` to zones); package.json:9 (`turbo build`); turbo.json:6-10 (task `build`, output `.next/**`) |
| 3 | apps/shop | separate | not observed | `/shop` and `/shop/:path*` through shell (apps/shell/next.config.js:32-41); `http://localhost:3001/shop` (apps/shop/next.config.js:19; apps/shop/package.json:7, 9) | No | apps/shop/package.json:6 (`next build`); apps/shop/next.config.js:5-42 (`basePath: '/shop'`, `transpilePackages`); package.json:9 (`turbo build`); turbo.json:6-10 (task `build`, output `.next/**`) |

## Observations

**1. apps/duda.** Own build through `next build` (apps/duda/package.json:6), with `basePath: '/duda'` (apps/duda/next.config.js:6); generated `.next` belongs only to it, although root `turbo build` triggers all three builds (package.json:9). Code from `@repo/ui` enters its artifact through `transpilePackages` (apps/duda/next.config.js:8), shared code rather than joint build with another application. No artifact packages or publishes it: only scripts `dev`/`start` on port 3002 (apps/duda/package.json:7, 9), hence deploy `not observed`. User reaches it through shell rewrite at `/duda` (apps/shell/next.config.js:28-31). The `version: "0.0.1"` is unused in publication, in a `private` package (apps/duda/package.json:3-4).

**2. apps/shell.** Own build through `next build` (apps/shell/package.json:6). The `rewrites()` resides in its configuration and points to fixed `localhost` addresses (apps/shell/next.config.js:25-43), so routing only works with zones running on same machine, on script ports; no variable replaces these addresses. No deployment artifact; starts on port 3000 through `next dev`/`next start` (apps/shell/package.json:7, 9). The `version: "0.0.1"` is unused (apps/shell/package.json:3-4).

**3. apps/shop.** Own build through `next build` (apps/shop/package.json:6), with `basePath: '/shop'` (apps/shop/next.config.js:19). No deployment artifact; starts on port 3001 (apps/shop/package.json:7, 9) and is reached through shell at `/shop` and `/shop/:path*` (apps/shell/next.config.js:32-41). Fixed CORS header at `http://localhost:3000`, with comment about production replacement (apps/shop/next.config.js:26-38), confirms local execution configuration. The `version: "0.0.1"` is unused (apps/shop/package.json:3-4).

## Summary

Applications: 3. Build (separate: 3). Deploy (not observed: 3). Independent versioning: 0.
