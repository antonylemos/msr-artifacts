---
schema: 1
id: 1350705751
full_name: karthik5656/Catalog.App
commit: 1982e0f3dae5a8508d354f9db91a089ba96d4bd6
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

# 332 — karthik5656/Catalog.App

## Repository overview

A catalog project with .NET backends and three React + Vite frontends in `src/frontend/apps/`: shell `ui-catalog` (port 3000) and two remotes, `ui-catalog-merchant` (3001) and `ui-catalog-consumer` (3002). Composition uses Module Federation through `@originjs/vite-plugin-federation`. The shell treats `remotes.json` as its single source: each entry carries `scope`, `remoteEntry.js` URL, module `./App`, route and label (src/frontend/apps/ui-catalog/remotes.json:2-15). The shell's `vite.config.ts` builds federation's `remotes` map from this (src/frontend/apps/ui-catalog/vite.config.ts:14-17, 85-89). A custom plugin generates, at `buildStart`, file `src/remoteApps.generated.tsx`, with one `React.lazy(() => import("<scope>/App"))` per remote (src/frontend/apps/ui-catalog/vite.config.ts:26-59). This file is ignored by Git (src/frontend/apps/ui-catalog/.gitignore:15-16) and absent from the snapshot. The shell's `App` creates a `<route>/*` route per remote and renders the component inside `Suspense` (src/frontend/apps/ui-catalog/src/App.tsx:14-28). The menu lists the same routes (src/frontend/apps/ui-catalog/src/components/ShellLayout.tsx:27-31). Everything runs under `BrowserRouter` with `basename="/ui-catalog"` (src/frontend/apps/ui-catalog/src/main.tsx:9).

Both remotes expose `./App` as `remoteEntry.js` (src/frontend/apps/ui-catalog-merchant/vite.config.ts:16-23; src/frontend/apps/ui-catalog-consumer/vite.config.ts:16-23). Both `vite.config.ts` files are identical except for port (:9, :12): both declare `name: "consumerApp"` (:17). Thus the shell's scope `merchantApp` matches no unit's `name`, while scope `consumerApp` matches both units' `name`. By the researcher's decision for this repository, the `name`/filename declared by both units, together with the URL port, counts as an explicit match: the port 3002 entry resolves to `src/frontend/apps/ui-catalog-consumer`, and the port 3001 entry to `src/frontend/apps/ui-catalog-merchant`, both with In snapshot `Yes` (see relationships 1 and 2). This matches classification's port mapping, which recorded the name inconsistency as ambiguous.

Both remotes have a plugin that, in `vite build --watch`, calls `http://localhost:3000/__fullReload` at build completion (src/frontend/apps/ui-catalog-merchant/vite.config.ts:24-45; src/frontend/apps/ui-catalog-consumer/vite.config.ts:24-45), handled by middleware in the shell development server (src/frontend/apps/ui-catalog/vite.config.ts:90-102). This is development tooling, rather than message exchange between applications at runtime, and did not become a relationship. There is no inter-unit communication in code.

## Relationships

| # | Source | Target | Type | Direction | Mechanism | In snapshot | Active | Configuration | Code |
|---|---|---|---|---|---|---|---|---|---|
| 1 | src/frontend/apps/ui-catalog | src/frontend/apps/ui-catalog-consumer | host → remote | source → target | module-federation | Yes | Yes | src/frontend/apps/ui-catalog/remotes.json:9-15 (scope `consumerApp`, `http://localhost:3002/assets/remoteEntry.js`, module `./App`, route `consumer`); src/frontend/apps/ui-catalog/vite.config.ts:14-17 (map `remotes` built from `remotes.json`); src/frontend/apps/ui-catalog/vite.config.ts:85-89 (`federation({ name: 'app', remotes: federationRemotes })`); src/frontend/apps/ui-catalog-consumer/vite.config.ts:9 (port 3002); src/frontend/apps/ui-catalog-consumer/vite.config.ts:16-23 (`name: "consumerApp"`, `filename: "remoteEntry.js"`, `exposes: { "./App" }`); src/frontend/apps/ui-catalog-merchant/vite.config.ts:16-23 (same `name: "consumerApp"`, `filename` and `exposes`) | src/frontend/apps/ui-catalog/vite.config.ts:37; src/frontend/apps/ui-catalog/remotes.json:3; src/frontend/apps/ui-catalog/src/App.tsx:26 |
| 2 | src/frontend/apps/ui-catalog | src/frontend/apps/ui-catalog-merchant | host → remote | source → target | module-federation | Yes | Yes | src/frontend/apps/ui-catalog/remotes.json:2-8 (scope `merchantApp`, `http://localhost:3001/assets/remoteEntry.js`, module `./App`, route `merchant`); src/frontend/apps/ui-catalog/vite.config.ts:14-17 (map `remotes` built from `remotes.json`); src/frontend/apps/ui-catalog/vite.config.ts:85-89 (`federation({ name: 'app', remotes: federationRemotes })`); src/frontend/apps/ui-catalog-merchant/vite.config.ts:9 (port 3001); src/frontend/apps/ui-catalog-merchant/vite.config.ts:16-23 (`name: "consumerApp"`, `filename: "remoteEntry.js"` at :18, `exposes: { "./App" }`) | src/frontend/apps/ui-catalog/vite.config.ts:37; src/frontend/apps/ui-catalog/remotes.json:3; src/frontend/apps/ui-catalog/src/App.tsx:26 |

## Observations

**1. src/frontend/apps/ui-catalog → src/frontend/apps/ui-catalog-consumer.** The second `remotes.json` entry declares scope `consumerApp` with `http://localhost:3002/assets/remoteEntry.js` and module `./App` (src/frontend/apps/ui-catalog/remotes.json:9-15). The shell transforms this into remote `consumerApp` (src/frontend/apps/ui-catalog/vite.config.ts:14-17, 85-89) and `import("consumerApp/App")` generated by the template (src/frontend/apps/ui-catalog/vite.config.ts:37), rendered at route `consumer/*` (src/frontend/apps/ui-catalog/src/App.tsx:17, 26). `name: "consumerApp"` appears in both remote units, and `filename` and `exposes` are also identical in both (src/frontend/apps/ui-catalog-consumer/vite.config.ts:16-23; src/frontend/apps/ui-catalog-merchant/vite.config.ts:16-23), so the name alone identifies no single unit. By the researcher's decision for this case, the common `name` together with port counts as an explicit match: `ui-catalog-consumer` declares `name: "consumerApp"` (src/frontend/apps/ui-catalog-consumer/vite.config.ts:17) and serves on port 3002 (src/frontend/apps/ui-catalog-consumer/vite.config.ts:9), the same as the URL. The target is `src/frontend/apps/ui-catalog-consumer`, and In snapshot is `Yes`. Active `Yes`: all three source code review lines are `Yes`, and each covers both `remotes.json` entries (line src/frontend/apps/ui-catalog/remotes.json:3 cites the entire record, :2-15, in the source code review). Dynamic import exists only in the file generated at build time, outside the snapshot; the snapshot contains the generator and its input.

**2. src/frontend/apps/ui-catalog → src/frontend/apps/ui-catalog-merchant.** The first `remotes.json` entry declares scope `merchantApp` with `http://localhost:3001/assets/remoteEntry.js`, module `./App` and route `merchant` (src/frontend/apps/ui-catalog/remotes.json:2-8). It follows the same path as relationship 1 to generated `import("merchantApp/App")` (src/frontend/apps/ui-catalog/vite.config.ts:37) and route `merchant/*` (src/frontend/apps/ui-catalog/src/App.tsx:17, 26). No unit declares itself `merchantApp`: `ui-catalog-merchant` is named `consumerApp` (src/frontend/apps/ui-catalog-merchant/vite.config.ts:17). The URL's filename `remoteEntry.js` is declared by both units (src/frontend/apps/ui-catalog-merchant/vite.config.ts:18; src/frontend/apps/ui-catalog-consumer/vite.config.ts:18). By the researcher's decision for this case, that common filename together with port counts as an explicit match: `ui-catalog-merchant` serves on port 3001 (src/frontend/apps/ui-catalog-merchant/vite.config.ts:9), the same as the URL. The target is `src/frontend/apps/ui-catalog-merchant`, and In snapshot is `Yes`. Route and label `merchant`/`Merchant` (src/frontend/apps/ui-catalog/remotes.json:6-7) resemble the directory name but did not enter resolution. The federation plugin fetches the remote by URL, so the divergent `name` may not prevent loading; this was not verified by execution. Active `Yes` through the same three `Yes` lines as relationship 1.

## Summary

Relationships: 2 (host → remote: 2). Active: 2. Target outside the snapshot: 0.
Units without a relationship: none.

