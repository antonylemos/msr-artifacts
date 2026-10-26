---
schema: 1
id: 1174301349
full_name: UserTharushi/companion-disease-risk-ai
commit: 373de0e6083b86b2707913da037735130c8f5503
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

# 355 — UserTharushi/companion-disease-risk-ai

## Repository overview

An academic monorepo project with a shell and seven React/Vite micro-frontends joined by Module Federation (`@originjs/vite-plugin-federation`). `apps/shell` is the host: it declares seven remotes at `http://localhost:3001` through `3007` (apps/shell/vite.config.ts:9-21), and each `mfe-*` app declares itself a remote with its own `name`, `filename: "remoteEntry.js"` and `exposes` (for example apps/mfe-pet-profile/vite.config.ts:8-18). Shell loads six through `lazy(() => import("<remote>/App"))` (apps/shell/src/App.tsx:18-23) and fits them as child routes of `ShellLayout` (apps/shell/src/App.tsx:47-54). Each remote exposes, besides `./App`, individual pages (for example apps/mfe-admin/vite.config.ts:11-18) not imported by shell; only `./App` is consumed.

The distinctive feature is `apps/mfe-auth`. Shell declares remote `mfeAuth` (apps/shell/vite.config.ts:12) and module `mfeAuth/App` (apps/shell/src/federation.d.ts:1), and mfe-auth exposes `./App`, `./LoginPage` and `./RegisterPage` (apps/mfe-auth/vite.config.ts:12-16), but no shell code imports this remote. Instead, route `/auth/*` and absence of a token take the browser to another page: `window.location.replace("http://localhost:3001...")` (apps/shell/src/App.tsx:8-13, :44; apps/shell/src/layouts/ShellLayout.tsx:22-26). The code's own comment says "Auth MFE runs standalone at localhost:3001 – redirect to it instead of federating" (apps/shell/src/App.tsx:8). That redirect is page navigation rather than composition and did not become a relationship; shell → mfe-auth remains only in configuration.

The README confirms this picture: the application actually used is `apps/mfe-auth` (port 3001), and "The shell + other MFEs are scaffold" (README.md:80). Shell reads the token in `localStorage` with key `companion_ai_access_token` (apps/shell/src/layouts/ShellLayout.tsx:5-8), also written by mfe-auth, but, as the source code review recorded, this is not one of the listed communication mechanisms, and both units run on different ports. There are no custom elements, iframes, events or orchestrator.

## Relationships

| # | Source | Target | Type | Direction | Mechanism | In snapshot | Active | Configuration | Code |
|---|---|---|---|---|---|---|---|---|---|
| 1 | apps/shell | apps/mfe-pet-profile | host → remote | source → target | module-federation | Yes | Yes | apps/shell/vite.config.ts:13 (remote `mfePetProfile` at `http://localhost:3002/assets/remoteEntry.js`); apps/mfe-pet-profile/vite.config.ts:9-12 (`name: "mfePetProfile"`, `filename: "remoteEntry.js"`, exposes `./App`); apps/mfe-pet-profile/package.json:7 (port 3002) | apps/shell/src/App.tsx:18; apps/shell/src/App.tsx:42 |
| 2 | apps/shell | apps/mfe-symptom-checker | host → remote | source → target | module-federation | Yes | Yes | apps/shell/vite.config.ts:14 (remote `mfeSymptom` at `http://localhost:3003/assets/remoteEntry.js`); apps/mfe-symptom-checker/vite.config.ts:9-12 (`name: "mfeSymptom"`, `filename: "remoteEntry.js"`, exposes `./App`); apps/mfe-symptom-checker/package.json:7 (port 3003) | apps/shell/src/App.tsx:19; apps/shell/src/App.tsx:42 |
| 3 | apps/shell | apps/mfe-risk-results | host → remote | source → target | module-federation | Yes | Yes | apps/shell/vite.config.ts:15 (remote `mfeRiskResults` at `http://localhost:3004/assets/remoteEntry.js`); apps/mfe-risk-results/vite.config.ts:9-12 (`name: "mfeRiskResults"`, `filename: "remoteEntry.js"`, exposes `./App`); apps/mfe-risk-results/package.json:7 (port 3004) | apps/shell/src/App.tsx:20; apps/shell/src/App.tsx:42 |
| 4 | apps/shell | apps/mfe-vet-discovery | host → remote | source → target | module-federation | Yes | Yes | apps/shell/vite.config.ts:16 (remote `mfeVetDiscover` at `http://localhost:3005/assets/remoteEntry.js`); apps/mfe-vet-discovery/vite.config.ts:9-12 (`name: "mfeVetDiscover"`, `filename: "remoteEntry.js"`, exposes `./App`); apps/mfe-vet-discovery/package.json:7 (port 3005) | apps/shell/src/App.tsx:21; apps/shell/src/App.tsx:42 |
| 5 | apps/shell | apps/mfe-vaccination | host → remote | source → target | module-federation | Yes | Yes | apps/shell/vite.config.ts:17 (remote `mfeVaccination` at `http://localhost:3006/assets/remoteEntry.js`); apps/mfe-vaccination/vite.config.ts:9-12 (`name: "mfeVaccination"`, `filename: "remoteEntry.js"`, exposes `./App`); apps/mfe-vaccination/package.json:7 (port 3006) | apps/shell/src/App.tsx:22; apps/shell/src/App.tsx:42 |
| 6 | apps/shell | apps/mfe-admin | host → remote | source → target | module-federation | Yes | Yes | apps/shell/vite.config.ts:18 (remote `mfeAdmin` at `http://localhost:3007/assets/remoteEntry.js`); apps/mfe-admin/vite.config.ts:9-12 (`name: "mfeAdmin"`, `filename: "remoteEntry.js"`, exposes `./App`); apps/mfe-admin/package.json:7 (port 3007) | apps/shell/src/App.tsx:23; apps/shell/src/App.tsx:42 |
| 7 | apps/shell | apps/mfe-auth | host → remote | source → target | module-federation | Yes | No | apps/shell/vite.config.ts:12 (remote `mfeAuth` at `http://localhost:3001/assets/remoteEntry.js`); apps/mfe-auth/vite.config.ts:10-16 (`name: "mfeAuth"`, `filename: "remoteEntry.js"`, exposes `./App`, `./LoginPage`, `./RegisterPage`); apps/mfe-auth/package.json:7 (port 3001) | — |

## Observations

**1. apps/shell → apps/mfe-pet-profile.** Shell remote `mfePetProfile` (apps/shell/vite.config.ts:13) matches apps/mfe-pet-profile through `name` and `remoteEntry.js` (apps/mfe-pet-profile/vite.config.ts:9-10), and `./App` imported in apps/shell/src/App.tsx:18 is exposed in apps/mfe-pet-profile/vite.config.ts:12; port 3002 (apps/mfe-pet-profile/package.json:7) only corroborates. Active through the import and route `pets/*` (apps/shell/src/App.tsx:48). The remote also exposes `./PetListPage`, `./PetDetailPage` and `./AddPetPage` (apps/mfe-pet-profile/vite.config.ts:13-15), without consumers.

**2. apps/shell → apps/mfe-symptom-checker.** `mfeSymptom` (apps/shell/vite.config.ts:14) resolves to apps/mfe-symptom-checker through `name` and `exposes` (apps/mfe-symptom-checker/vite.config.ts:9-12); the remote name does not repeat the directory name, but the match through `name` is explicit. Active through the import in apps/shell/src/App.tsx:19 and route `symptom/*` (apps/shell/src/App.tsx:49).

**3. apps/shell → apps/mfe-risk-results.** `mfeRiskResults` (apps/shell/vite.config.ts:15) resolves to apps/mfe-risk-results (apps/mfe-risk-results/vite.config.ts:9-12). Active through the import in apps/shell/src/App.tsx:20 and route `risk-results/*` (apps/shell/src/App.tsx:50). The route does not appear in layout navigation items (apps/shell/src/layouts/ShellLayout.tsx:11-16), but is declared in `Routes`.

**4. apps/shell → apps/mfe-vet-discovery.** `mfeVetDiscover` (apps/shell/vite.config.ts:16) resolves to apps/mfe-vet-discovery through `name` (apps/mfe-vet-discovery/vite.config.ts:9-12). Active through the import in apps/shell/src/App.tsx:21 and route `vet-discovery/*` (apps/shell/src/App.tsx:51).

**5. apps/shell → apps/mfe-vaccination.** `mfeVaccination` (apps/shell/vite.config.ts:17) resolves to apps/mfe-vaccination (apps/mfe-vaccination/vite.config.ts:9-12). Active through the import in apps/shell/src/App.tsx:22 and route `vaccination/*` (apps/shell/src/App.tsx:52).

**6. apps/shell → apps/mfe-admin.** `mfeAdmin` (apps/shell/vite.config.ts:18) resolves to apps/mfe-admin (apps/mfe-admin/vite.config.ts:9-12). Active through the import in apps/shell/src/App.tsx:23 and route `admin/*` (apps/shell/src/App.tsx:53); like 3, absent from navigation items (apps/shell/src/layouts/ShellLayout.tsx:11-16).

**7. apps/shell → apps/mfe-auth.** Remote `mfeAuth` (apps/shell/vite.config.ts:12) matches apps/mfe-auth through `name`, `filename` and `exposes` (apps/mfe-auth/vite.config.ts:10-16), and shell even declares type `mfeAuth/App` (apps/shell/src/federation.d.ts:1), hence In snapshot `Yes`. No source code review line supports the relationship: shell does not import the remote and sends the user to `http://localhost:3001` through `window.location.replace` (apps/shell/src/App.tsx:12; apps/shell/src/layouts/ShellLayout.tsx:24). The relationship exists only in configuration, hence Active `No`.

## Summary

Relationships: 7 (host → remote: 7). Active: 6. Target outside the snapshot: 0.
Units without a relationship: none.

