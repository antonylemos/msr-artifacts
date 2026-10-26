---
schema: 1
id: 1297539319
full_name: Efraim0601/union-portal
commit: b11a3e3aa55aff8195e0cde0026ccbd45245266d
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
  date: 2026-10-21
---

# 059 — Efraim0601/union-portal

## Repository overview

A production portal with French text and comments, consisting of an Angular `shell` and two remotes, `promote` and `diaspora`, linked by **Native Federation** (`@angular-architects/native-federation`, esbuild build). It is the only one of the 15 repositories analyzed in the pilot classified as production. The shell reads `federation.manifest.json` before bootstrap (projects/shell/src/main.ts:3-5) and loads each remote's exposed routes at the `promote` and `diaspora` routes; the empty route goes to `diaspora/home` (projects/shell/src/app/app.routes.ts:9-20).

Builds are separate per unit, each with its own `base-href` (Dockerfile:20-22), but deployment is joint: one nginx image combines the three artifacts, with the shell at the root and each remote under `/remotes/<nome>/` (English translation of the path placeholder: name) (Dockerfile:38-41; deploy/nginx.conf:3-4, 31-32); the remainder falls back to the shell's `index.html` (deploy/nginx.conf:125-130). In the image, the development manifest with `localhost` URLs is replaced by the production manifest (Dockerfile:42-43), pointing to `/remotes/promote/remoteEntry.json` and `/remotes/diaspora/remoteEntry.json` (deploy/federation.manifest.prod.json:2-3). This manifest connects deployment to remote loading; the Configuration column records both development and production manifests.

The diaspora unit embeds a legacy account-opening flow through `iframe`, whose URL comes from a configurable global or a default relative path (projects/diaspora/src/app/pages/legacy-onboarding.ts:15-24); the legacy application is absent from the snapshot. There is also a `projects/auth` library with a `ClientAuthStore` for shared sessions, imported by no application, and an Express OTP server, which is not a frontend unit.

## Relationships

| # | Source | Target | Type | Direction | Mechanism | In snapshot | Active | Configuration | Code |
|---|---|---|---|---|---|---|---|---|---|
| 1 | projects/shell | projects/diaspora | host → remote | source → target | native-federation | Yes | Yes | projects/shell/public/federation.manifest.json:3 (`diaspora` → `http://localhost:4202/remoteEntry.json`); deploy/federation.manifest.prod.json:3 (`diaspora` → `/remotes/diaspora/remoteEntry.json`); projects/diaspora/federation.config.js:4-10 (`name: 'diaspora'`, exposes `./Routes`); angular.json:391 (port 4202 of project diaspora) | projects/shell/src/app/app.routes.ts:2; projects/shell/src/app/app.routes.ts:18; projects/shell/src/main.ts:1; projects/shell/src/main.ts:3; projects/shell/src/app/app.routes.ts:9 |
| 2 | projects/shell | projects/promote | host → remote | source → target | native-federation | Yes | Yes | projects/shell/public/federation.manifest.json:2 (`promote` → `http://localhost:4201/remoteEntry.json`); deploy/federation.manifest.prod.json:2 (`promote` → `/remotes/promote/remoteEntry.json`); projects/promote/federation.config.js:4-10 (`name: 'promote'`, exposes `./Routes`); angular.json:264 (port 4201 of project promote) | projects/shell/src/app/app.routes.ts:2; projects/shell/src/app/app.routes.ts:13; projects/shell/src/main.ts:1; projects/shell/src/main.ts:3; projects/shell/src/app/app.routes.ts:9 |
| 3 | projects/diaspora | /open-account-flow-test | page → embedded-frontend | source → target | iframe | Undetermined | Undetermined | — | projects/diaspora/src/app/pages/legacy-onboarding.ts:31 |

## Observations

**1. projects/shell → projects/diaspora.** The shell loads `./Routes` from `diaspora` (projects/shell/src/app/app.routes.ts:16-18), resolved through the manifest. The name and module match projects/diaspora/federation.config.js:4-9; port 4202 only corroborates. In production, the manifest points to `/remotes/diaspora/`, where the image installs the unit's build (Dockerfile:41; deploy/federation.manifest.prod.json:3).

**2. projects/shell → projects/promote.** The same flow for `promote` (projects/shell/src/app/app.routes.ts:11-13). The name and module match projects/promote/federation.config.js:4-9; port 4201 only corroborates. In production, `/remotes/promote/` (Dockerfile:40; deploy/federation.manifest.prod.json:2).

**3. projects/diaspora → /open-account-flow-test.** The iframe uses `__LEGACY_ONBOARDING_URL__` when defined, otherwise the relative `/open-account-flow-test` path (projects/diaspora/src/app/pages/legacy-onboarding.ts:19-24, 53-54). There is no override or implementation of this path in the snapshot, and nginx would send it to the shell (deploy/nginx.conf:128-130). Therefore In snapshot and Active remain Undetermined.

## Summary

Relationships: 3 (host → remote: 2, page → embedded-frontend: 1). Active: 2. Target outside the snapshot: 0.
Units without a relationship: none.

