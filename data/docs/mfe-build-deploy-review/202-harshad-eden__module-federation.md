---
schema: 1
id: 1015183048
full_name: harshad-eden/module-federation
commit: dde74e678a749ccbf3951e173bf980649034c5d4
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

# 202 — harshad-eden/module-federation

## Repository overview

pnpm monorepo (`apps/*` and `packages/*`, package.json:6-9) with four React/Vite applications, each with its own `vite.config.ts` and `build` script (`tsc && vite build`, for example apps/shell/package.json:7). Root `build` first builds shared packages `shared-types` and `shared-ui`, then triggers each application’s build in its directory in parallel (package.json:16-22). There is also `preview` per application, each on its own port (package.json:23-27; for example apps/sales-portal/package.json:8), and a `yarn:build` variant building all workspaces (package.json:31). Each application therefore generates its own `dist`. Remotes generate `remoteEntry.js` (for example apps/sales-portal/vite.config.ts:9-13).

No deployment artifact is present in snapshot: no CI workflow, Dockerfile, compose or `vercel.json`. Everything present is development configuration. Ports 3000–3004 belong to Vite servers and `preview` (for example apps/shell/vite.config.ts:23-25). CORS headers identified by `ops-cors` belong to development server `server` block of remotes (apps/sales-portal/vite.config.ts:25-31; apps/underwriter-portal/vite.config.ts:25-31; apps/product-config/vite.config.ts:25-31). Shell fetches remotes through fixed `localhost` URLs (apps/shell/vite.config.ts:10-14).

All `ops-hosting` occurrences are in `DEPLOYMENT_GUIDE.md`, a Vercel publication guide. It describes three strategies: one Vercel project per application with its own domain (DEPLOYMENT_GUIDE.md:35-46, 134-157); a monorepo with root `vercel.json` and another per application (DEPLOYMENT_GUIDE.md:161-214); and a single project with subdirectories and rewrites (DEPLOYMENT_GUIDE.md:221-232). Guide also proposes environment variables for remote URLs (DEPLOYMENT_GUIDE.md:52-64, 257-267). None of these files exists in snapshot, and URLs remain fixed at `localhost`. Guide also includes `employer-portal` and `service-provider` (DEPLOYMENT_GUIDE.md:44, 46, 140, 142), which do not exist. As documentation, it does not decide Deploy column and is deferred to 3.4.7. README discusses independent deployment of each domain (README.md:3, 7), also without supporting artifact.

## Applications

| # | Application | Build | Deploy | Where served | Versioning | Artifacts |
|---|---|---|---|---|---|---|
| 1 | apps/product-config | separate | not observed | `http://localhost:3004`, development server and `preview` (apps/product-config/vite.config.ts:26; apps/product-config/package.json:6, 8); `remoteEntry.js` fetched by shell at `http://localhost:3004/dist/assets/remoteEntry.js` (apps/shell/vite.config.ts:13) | No | apps/product-config/vite.config.ts:5-33 (own configuration, `remoteEntry.js`); apps/product-config/package.json:7 (`tsc && vite build`); package.json:22 (`build:product` triggers build in directory) |
| 2 | apps/sales-portal | separate | not observed | `http://localhost:3001`, development server and `preview` (apps/sales-portal/vite.config.ts:26; apps/sales-portal/package.json:6, 8); `remoteEntry.js` fetched by shell at `http://localhost:3001/dist/assets/remoteEntry.js` (apps/shell/vite.config.ts:11) | No | apps/sales-portal/vite.config.ts:5-33 (own configuration, `remoteEntry.js`); apps/sales-portal/package.json:7 (`tsc && vite build`); package.json:20 (`build:sales` triggers build in directory) |
| 3 | apps/shell | separate | not observed | `http://localhost:3000`, development server and `preview` (apps/shell/vite.config.ts:24; apps/shell/package.json:6, 8) | No | apps/shell/vite.config.ts:5-26 (own configuration, host); apps/shell/package.json:7 (`tsc && vite build`); package.json:19 (`build:shell` triggers build in directory) |
| 4 | apps/underwriter-portal | separate | not observed | `http://localhost:3002`, development server and `preview` (apps/underwriter-portal/vite.config.ts:26; apps/underwriter-portal/package.json:6, 8); `remoteEntry.js` fetched by shell at `http://localhost:3002/dist/assets/remoteEntry.js` (apps/shell/vite.config.ts:12) | No | apps/underwriter-portal/vite.config.ts:5-33 (own configuration, `remoteEntry.js`); apps/underwriter-portal/package.json:7 (`tsc && vite build`); package.json:21 (`build:underwriter` triggers build in directory) |

## Observations

**1. apps/product-config.** Own build: a `vite build` in application directory, with own output and `remoteEntry.js` declared in federation (apps/product-config/vite.config.ts:8-15). Root script only triggers it (package.json:22). Deploy is `not observed`: the only address is local server on port 3004. Guide proposes a Vercel project `insurance-product.vercel.app` (DEPLOYMENT_GUIDE.md:45, 141), but without snapshot artifact. Version `1.0.0` (apps/product-config/package.json:3) is unused in any publication.

**2. apps/sales-portal.** Same arrangement as product-config: own build (apps/sales-portal/package.json:7; apps/sales-portal/vite.config.ts:8-15), triggered by root (package.json:20), and deploy `not observed`, with only local server on port 3001, in `dev` using `--strictPort` (apps/sales-portal/package.json:6). Guide’s Vercel domain (DEPLOYMENT_GUIDE.md:42, 138) has no artifact. Version is unused.

**3. apps/shell.** Host with own build (apps/shell/package.json:7) and neither `filename` nor `exposes` (apps/shell/vite.config.ts:8-16). Remote addresses are embedded in build as `localhost` URLs (apps/shell/vite.config.ts:11-13). A shell build would therefore only work with remotes served locally. Guide proposes replacing them with environment variables (DEPLOYMENT_GUIDE.md:52-59), which has not been done. Deploy is `not observed`, and version is unused.

**4. apps/underwriter-portal.** Like other remotes: own build (apps/underwriter-portal/package.json:7; apps/underwriter-portal/vite.config.ts:8-15), triggered by root (package.json:21), local server on port 3002 and deploy `not observed`. Guide’s domain (DEPLOYMENT_GUIDE.md:43, 139) has no artifact. Version is unused.

## Summary

Applications: 4. Build (separate: 4). Deploy (not observed: 4). Independent versioning: 0.
