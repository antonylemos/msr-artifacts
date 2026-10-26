---
schema: 1
id: 1238664148
full_name: LaurineLeNet/microfrontend-angular-angular
commit: 342c92dff482f1ee0a4bcc05f9302361a7354352
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

# 349 — LaurineLeNet/microfrontend-angular-angular

## Repository overview

An Angular example with three independent workspaces connected through **Native Federation** (`@angular-architects/native-federation`): host `shell` and remotes `athletes` (a simulated race between two athletes, with list and detail) and `ranking` (live standings). Shell reads `federation.manifest.json` before bootstrap (shell/src/main.ts:3-5); the manifest points each remote to a `remoteEntry.json` on its own Cloudflare Worker (shell/public/federation.manifest.json:2-3), and each worker's name matches the URL host (athletes/wrangler.jsonc:3; ranking/wrangler.jsonc:3). Shell itself exposes nothing (shell/federation.config.js:3-8).

Shell consumes each remote in two ways. Through routes: `athletes` enters as child routes (`./Routes`, shell/src/app/app.routes.ts:10-14), and `ranking` as a route component (`./Component`, shell/src/app/app.routes.ts:15-19). Through the dashboard, the default route (shell/src/app/app.routes.ts:6-9, 20-24): `DashboardComponent` loads both `./Component` modules in parallel and mounts them with `createComponent` in two side-by-side panels (shell/src/app/dashboard/dashboard.ts:54-79). The shell navigation bar links all three routes (shell/src/app/app.html:3-5). To be loaded as routes, athletes wraps its screens in its own `App` component (athletes/src/app/shell.routes.ts:7-17), alongside the routes used when running independently (athletes/src/app/app.routes.ts:6-10).

Both remotes communicate without passing through shell: athletes' `RaceComponent` publishes positions on a `BroadcastChannel` named `athletes-positions` (athletes/src/app/race/race.ts:11, 36, 46, 55), and ranking's `App` listens to the same channel (ranking/src/app/app.ts:11, 41-48). Because `BroadcastChannel` only delivers messages under the same origin, exchange occurs when both are loaded in shell, as on the dashboard. The same channel has an internal receiver in athletes (athletes/src/app/athlete-detail/athlete-detail.ts:83-89), not becoming a relationship. Remotes' `main.ts` files call `initFederation()` without a manifest (athletes/src/main.ts:3), only to run independently. There is no other composition mechanism.

## Relationships

| # | Source | Target | Type | Direction | Mechanism | In snapshot | Active | Configuration | Code |
|---|---|---|---|---|---|---|---|---|---|
| 1 | shell | athletes | host → remote | source → target | native-federation | Yes | Yes | shell/public/federation.manifest.json:2 (`athletes` → `https://mf-angular-athletes.lenetlaurine.workers.dev/remoteEntry.json`); athletes/federation.config.js:4-9 (`name: 'athletes'`, exposes `./Component` and `./Routes`); athletes/wrangler.jsonc:3 (worker `mf-angular-athletes`) | shell/src/app/app.routes.ts:1; shell/src/app/app.routes.ts:13; shell/src/app/dashboard/dashboard.ts:10; shell/src/app/dashboard/dashboard.ts:56; shell/src/main.ts:1; shell/src/main.ts:3; shell/src/app/app.routes.ts:5; shell/src/app/dashboard/dashboard.ts:70 |
| 2 | shell | ranking | host → remote | source → target | native-federation | Yes | Yes | shell/public/federation.manifest.json:3 (`ranking` → `https://mf-angular-ranking.lenetlaurine.workers.dev/remoteEntry.json`); ranking/federation.config.js:4-8 (`name: 'ranking'`, exposes `./Component`); ranking/wrangler.jsonc:3 (worker `mf-angular-ranking`) | shell/src/app/app.routes.ts:1; shell/src/app/app.routes.ts:18; shell/src/app/dashboard/dashboard.ts:10; shell/src/app/dashboard/dashboard.ts:57; shell/src/main.ts:1; shell/src/main.ts:3; shell/src/app/app.routes.ts:5; shell/src/app/dashboard/dashboard.ts:75 |
| 3 | athletes | ranking | communication | source → target | events | Yes | Yes | — | athletes/src/app/race/race.ts:36; athletes/src/app/race/race.ts:46; athletes/src/app/race/race.ts:55; ranking/src/app/app.ts:38; ranking/src/app/app.ts:41 |

## Observations

**1. shell → athletes.** Shell loads `./Routes` from `athletes` at route `athletes` and uses `m.routes` (shell/src/app/app.routes.ts:11-13), and loads `./Component` in the dashboard, mounting `RaceComponent` (shell/src/app/dashboard/dashboard.ts:56, 59, 70). Name and both keys match athletes/federation.config.js:4-9, and exported names exist in the target (athletes/src/app/shell.routes.ts:7; athletes/src/app/race/race.ts:19). The manifest URL (shell/public/federation.manifest.json:2) points to worker `mf-angular-athletes`, publishing `./dist/athletes/browser` (athletes/wrangler.jsonc:3, 14). The route table (shell/src/app/app.routes.ts:5) supports both shell relationships because it declares the dashboard and both remotes' routes.

**2. shell → ranking.** Same flow for `ranking`: `./Component` with `m.App` at route `ranking` (shell/src/app/app.routes.ts:16-18) and in the dashboard (shell/src/app/dashboard/dashboard.ts:57, 60, 75). Name and key match ranking/federation.config.js:4-7, and `App` is exported in ranking/src/app/app.ts:19. The manifest URL (shell/public/federation.manifest.json:3) points to worker `mf-angular-ranking`, publishing `./dist/ranking/browser` (ranking/wrangler.jsonc:3, 14).

**3. athletes → ranking.** `RaceComponent` opens channel `athletes-positions` (athletes/src/app/race/race.ts:11, 36) and sends name, distance and `finished` on each advance and reset (athletes/src/app/race/race.ts:46, 55); ranking's `App` opens the same channel and updates its position map on each message (ranking/src/app/app.ts:11, 38, 41-48). Ranking only receives and never sends, hence direction `source → target`. Mechanism is `events`, as message exchange through `BroadcastChannel`, without shared state. No configuration declares the channel: its name is a constant repeated in both units. Exchange depends on both units being under the same origin, which occurs when shell loads both (relationships 1 and 2).

## Summary

Relationships: 3 (host → remote: 2, communication: 1). Active: 3. Target outside the snapshot: 0.
Units without a relationship: none.

