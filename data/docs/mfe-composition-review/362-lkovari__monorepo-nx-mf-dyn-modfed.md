---
schema: 1
id: 1197367428
full_name: lkovari/monorepo-nx-mf-dyn-modfed
commit: 16f0962945720a521bac32e4a43913af1494b61b
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

# 362 — lkovari/monorepo-nx-mf-dyn-modfed

## Repository overview

An Angular 21 proof of concept with Nx, in a single workspace at `nx-mf-df/`, for **Native Federation** (`@angular-architects/native-federation`) with messaging between micro frontends mediated by the host (README.md:3, :5). Shell `main-host` registers all three remotes before bootstrap, through a manifest mapping `mf_remote_a`, `mf_remote_b` and `mf_remote_c` to `remoteEntry.json` at `localhost:4201-4203` (nx-mf-df/apps/main-host/src/main.ts:3-5; nx-mf-df/apps/main-host/public/federation.manifest.json:2-4), and loads each at its own route through exposed component `./Component` (nx-mf-df/apps/main-host/src/app/app.routes.ts:11-25). Content appears in the host's `<router-outlet>` (nx-mf-df/apps/main-host/src/app/shared/components/main/main.html:2), with navigation links in the header (nx-mf-df/apps/main-host/src/app/shared/components/header/header.html:13-16). Each remote declares its `name` and exposes only the root component (e.g.: nx-mf-df/apps/mf_remote_a/federation.config.js:4, :8-10). On deployment to GitHub Pages, the build script rewrites the manifest to each remote's subdirectory (nx-mf-df/scripts/gh-build.mjs:57-64).

The project's topic is communication. The host creates a message bus from package `@lkovari/microfrontend-platform-communication`, by the same owner, and exposes it to all three remotes through a global bridge (nx-mf-df/apps/main-host/src/app/app.config.ts:31-47); the README says there is one physical bus per tab, created by the host, to which remotes connect through `window.__MFE_BRIDGE__` (README.md:13, :19, :25). Publishing and subscribing code is in library `nx-mf-df/libs/common-ui-lib`, and contracts (topics, participant ids) in `nx-mf-df/libs/contracts-platform-messaging`, both `No` units in the structural review. Hence communication relationships connect applications using that code: the host, mounting the message composer and query/command suite in its header (header.html:19-20), and exposed remote components, subscribing to the bus and displaying the last message and history (nx-mf-df/apps/mf_remote_a/src/app/app.ts:25-28; nx-mf-df/apps/mf_remote_a/src/app/app.html:3, :5).

What did not become a relationship: remotes' `initFederation()` calls without a manifest (e.g.: nx-mf-df/apps/mf_remote_a/src/main.ts:3) and their `app.config.ts` files (e.g.: nx-mf-df/apps/mf_remote_a/src/app/app.config.ts:19-30) serve each remote's standalone mode; inside host, only the exposed component is loaded, without its own bootstrap (README.md:19). Libraries enter apps through `tsconfig` aliases, rather than federation, and are not units.

## Relationships

| # | Source | Target | Type | Direction | Mechanism | In snapshot | Active | Configuration | Code |
|---|---|---|---|---|---|---|---|---|---|
| 1 | nx-mf-df/apps/main-host | nx-mf-df/apps/mf_remote_a | host → remote | source → target | native-federation | Yes | Yes | nx-mf-df/apps/main-host/public/federation.manifest.json:2 (`mf_remote_a` → `http://localhost:4201/remoteEntry.json`); nx-mf-df/scripts/gh-build.mjs:58 (`mf_remote_a` → `${base}mf_remote_a/remoteEntry.json` on deployment); nx-mf-df/apps/mf_remote_a/federation.config.js:4 (`name: 'mf_remote_a'`); nx-mf-df/apps/mf_remote_a/federation.config.js:9 (exposes `./Component`) | nx-mf-df/apps/main-host/src/app/app.routes.ts:2; nx-mf-df/apps/main-host/src/app/app.routes.ts:14; nx-mf-df/apps/main-host/src/main.ts:1; nx-mf-df/apps/main-host/src/main.ts:3; nx-mf-df/apps/main-host/src/app/app.routes.ts:6 |
| 2 | nx-mf-df/apps/main-host | nx-mf-df/apps/mf_remote_b | host → remote | source → target | native-federation | Yes | Yes | nx-mf-df/apps/main-host/public/federation.manifest.json:3 (`mf_remote_b` → `http://localhost:4202/remoteEntry.json`); nx-mf-df/scripts/gh-build.mjs:59 (`mf_remote_b` → `${base}mf_remote_b/remoteEntry.json` on deployment); nx-mf-df/apps/mf_remote_b/federation.config.js:4 (`name: 'mf_remote_b'`); nx-mf-df/apps/mf_remote_b/federation.config.js:9 (exposes `./Component`) | nx-mf-df/apps/main-host/src/app/app.routes.ts:2; nx-mf-df/apps/main-host/src/app/app.routes.ts:19; nx-mf-df/apps/main-host/src/main.ts:1; nx-mf-df/apps/main-host/src/main.ts:3; nx-mf-df/apps/main-host/src/app/app.routes.ts:6 |
| 3 | nx-mf-df/apps/main-host | nx-mf-df/apps/mf_remote_c | host → remote | source → target | native-federation | Yes | Yes | nx-mf-df/apps/main-host/public/federation.manifest.json:4 (`mf_remote_c` → `http://localhost:4203/remoteEntry.json`); nx-mf-df/scripts/gh-build.mjs:60 (`mf_remote_c` → `${base}mf_remote_c/remoteEntry.json` on deployment); nx-mf-df/apps/mf_remote_c/federation.config.js:4 (`name: 'mf_remote_c'`); nx-mf-df/apps/mf_remote_c/federation.config.js:9 (exposes `./Component`) | nx-mf-df/apps/main-host/src/app/app.routes.ts:2; nx-mf-df/apps/main-host/src/app/app.routes.ts:24; nx-mf-df/apps/main-host/src/main.ts:1; nx-mf-df/apps/main-host/src/main.ts:3; nx-mf-df/apps/main-host/src/app/app.routes.ts:6 |
| 4 | nx-mf-df/apps/main-host | nx-mf-df/apps/mf_remote_a | communication | source → target | events | Yes | Yes | — | nx-mf-df/apps/main-host/src/app/app.config.ts:31 |
| 5 | nx-mf-df/apps/main-host | nx-mf-df/apps/mf_remote_b | communication | source → target | events | Yes | Yes | — | nx-mf-df/apps/main-host/src/app/app.config.ts:31 |
| 6 | nx-mf-df/apps/main-host | nx-mf-df/apps/mf_remote_c | communication | source → target | events | Yes | Yes | — | nx-mf-df/apps/main-host/src/app/app.config.ts:31 |

## Observations

**1. nx-mf-df/apps/main-host → nx-mf-df/apps/mf_remote_a.** Name `mf_remote_a` in `loadRemoteModule('mf_remote_a', './Component')` (nx-mf-df/apps/main-host/src/app/app.routes.ts:14) and manifest entry (nx-mf-df/apps/main-host/public/federation.manifest.json:2) matches `name: 'mf_remote_a'` in nx-mf-df/apps/mf_remote_a/federation.config.js:4, and the requested module matches `exposes` at line 9, pointing to `App` (nx-mf-df/apps/mf_remote_a/src/app/app.ts:30), the same `m.App` used in the route. Manifest port 4201 and deployment subdirectory `mf_remote_a/` (nx-mf-df/scripts/gh-build.mjs:54, :58) only corroborate. Active `Yes`: the manifest is loaded before bootstrap (nx-mf-df/apps/main-host/src/main.ts:3-5), and routes are registered by `provideRouter(appRoutes)` (nx-mf-df/apps/main-host/src/app/app.config.ts:30); all Code lines are `Yes`. Shared lines (app.routes.ts:2, :6 and main.ts:1, :3) also support relationships 2 and 3.

**2. nx-mf-df/apps/main-host → nx-mf-df/apps/mf_remote_b.** Same form as relationship 1: `loadRemoteModule('mf_remote_b', './Component')` (nx-mf-df/apps/main-host/src/app/app.routes.ts:19) and manifest entry (nx-mf-df/apps/main-host/public/federation.manifest.json:3) match `name: 'mf_remote_b'` and `exposes` `./Component` in nx-mf-df/apps/mf_remote_b/federation.config.js:4, :9. Port 4202 and deployment subdirectory (nx-mf-df/scripts/gh-build.mjs:59) only corroborate. Active `Yes` through the same chain as relationship 1.

**3. nx-mf-df/apps/main-host → nx-mf-df/apps/mf_remote_c.** Same form as relationship 1: `loadRemoteModule('mf_remote_c', './Component')` (nx-mf-df/apps/main-host/src/app/app.routes.ts:24) and manifest entry (nx-mf-df/apps/main-host/public/federation.manifest.json:4) match `name: 'mf_remote_c'` and `exposes` `./Component` in nx-mf-df/apps/mf_remote_c/federation.config.js:4, :9. Port 4203 and deployment subdirectory (nx-mf-df/scripts/gh-build.mjs:60) only corroborate. Active `Yes` through the same chain as relationship 1.

**4. nx-mf-df/apps/main-host → nx-mf-df/apps/mf_remote_a.** A publish/subscribe bus created in the host by `provideBus` and exposed by `provideHostBridge` to `MF_REMOTE_A_ID` (nx-mf-df/apps/main-host/src/app/app.config.ts:31-47), whose value `'mf_remote_a'` (nx-mf-df/libs/contracts-platform-messaging/src/lib/participant-ids.ts:3) is the remote name in relationship 1. Message exchange through a shared service (topics, `subscribe`, `publish`), hence `events`; there is no `CustomEvent` or `postMessage`, and the bridge is object `window.__MFE_BRIDGE__` (nx-mf-df/libs/common-ui-lib/src/lib/platform-messaging/mfe-window-bridge.util.ts:7). The remote side is the exposed component: it provides `PlatformWelcomeLastMessageService` (nx-mf-df/apps/mf_remote_a/src/app/app.ts:27), subscribing to the bus through `BUS_TOKEN` or the bridge (nx-mf-df/libs/common-ui-lib/src/lib/platform-messaging/services/platform-welcome-last-message.service.ts:35-36, :46), and displays history (nx-mf-df/apps/mf_remote_a/src/app/app.html:5). Direction `source → target`: the only message sending point is the composer, mounted only in the host header (nx-mf-df/apps/main-host/src/app/shared/components/header/header.html:20 → nx-mf-df/libs/common-ui-lib/src/lib/platform-messaging/message-composer/message-composer.component.ts:242), using the id inferred from the current route as sender (nx-mf-df/apps/main-host/src/app/shared/components/header/header.ts:37-39; nx-mf-df/libs/contracts-platform-messaging/src/lib/participant-ids.ts:18-33). Responses to queries and commands (nx-mf-df/libs/common-ui-lib/src/lib/platform-messaging/services/demo-shell-h2r-command-remote-handler.service.ts:134; nx-mf-df/libs/common-ui-lib/src/lib/platform-messaging/services/demo-query-queue.service.ts:121) come from handlers registered, on the composed page, by host providers (nx-mf-df/apps/main-host/src/app/app.config.ts:52-53), responding on behalf of all remotes when `BUS_TOKEN` exists (nx-mf-df/libs/common-ui-lib/src/lib/platform-messaging/services/demo-shell-h2r-command-remote-handler.service.ts:79-81). The remote's exposed component publishes nothing; hence I did not mark `bidirectional`. Configuration `—`: the connection passes through global `window`, rather than a configuration declaration.

**5. nx-mf-df/apps/main-host → nx-mf-df/apps/mf_remote_b.** Same form as relationship 4, with `MF_REMOTE_B_ID` = `'mf_remote_b'` (nx-mf-df/apps/main-host/src/app/app.config.ts:44; nx-mf-df/libs/contracts-platform-messaging/src/lib/participant-ids.ts:5). Mf_remote_b's exposed component provides the same `PlatformWelcomeLastMessageService` (nx-mf-df/apps/mf_remote_b/src/app/app.ts:27), without a composer; direction follows relationship 4.

**6. nx-mf-df/apps/main-host → nx-mf-df/apps/mf_remote_c.** Same form as relationship 4, with `MF_REMOTE_C_ID` = `'mf_remote_c'` (nx-mf-df/apps/main-host/src/app/app.config.ts:44; nx-mf-df/libs/contracts-platform-messaging/src/lib/participant-ids.ts:7). Mf_remote_c's exposed component provides the same `PlatformWelcomeLastMessageService` (nx-mf-df/apps/mf_remote_c/src/app/app.ts:27), without a composer; direction follows relationship 4.

## Summary

Relationships: 6 (host → remote: 3, communication: 3). Active: 6. Target outside the snapshot: 0.
Units without a relationship: none.

