---
schema: 1
id: 1197367428
full_name: lkovari/monorepo-nx-mf-dyn-modfed
commit: 16f0962945720a521bac32e4a43913af1494b61b
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 362 — lkovari/monorepo-nx-mf-dyn-modfed

## Mined constructs

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| src-async-bootstrap | nx-mf-df/apps/main-host/src/main.ts:5 | nx-mf-df/apps/main-host | dynamic-loading | No | `import('./bootstrap')` after `initFederation('federation.manifest.json')` (nx-mf-df/apps/main-host/src/main.ts:3-5): loads the unit’s own local bootstrap (nx-mf-df/apps/main-host/src/bootstrap.ts:5). |
| src-async-bootstrap | nx-mf-df/apps/mf_remote_a/src/main.ts:5 | nx-mf-df/apps/mf_remote_a | dynamic-loading | No | `import('./bootstrap')` after `initFederation()` (nx-mf-df/apps/mf_remote_a/src/main.ts:3-5): loads the unit’s own local bootstrap (nx-mf-df/apps/mf_remote_a/src/bootstrap.ts:5). |
| src-async-bootstrap | nx-mf-df/apps/mf_remote_b/src/main.ts:5 | nx-mf-df/apps/mf_remote_b | dynamic-loading | No | `import('./bootstrap')` after `initFederation()` (nx-mf-df/apps/mf_remote_b/src/main.ts:3-5): loads the unit’s own local bootstrap (nx-mf-df/apps/mf_remote_b/src/bootstrap.ts:5). |
| src-async-bootstrap | nx-mf-df/apps/mf_remote_c/src/main.ts:5 | nx-mf-df/apps/mf_remote_c | dynamic-loading | No | `import('./bootstrap')` after `initFederation()` (nx-mf-df/apps/mf_remote_c/src/main.ts:3-5): loads the unit’s own local bootstrap (nx-mf-df/apps/mf_remote_c/src/bootstrap.ts:5). |
| src-load-remote | nx-mf-df/apps/main-host/src/app/app.routes.ts:2 | nx-mf-df/apps/main-host | remote-resolution | Yes | Import of `loadRemoteModule`, used in routes `mf_remote_a`, `mf_remote_b` and `mf_remote_c` (nx-mf-df/apps/main-host/src/app/app.routes.ts:14, 19, 24). |
| src-load-remote | nx-mf-df/apps/main-host/src/app/app.routes.ts:14 | nx-mf-df/apps/main-host | remote-resolution | Yes | `loadComponent` of route `mf_remote_a` resolves `loadRemoteModule('mf_remote_a', './Component')` and uses `m.App` (exposed at nx-mf-df/apps/mf_remote_a/federation.config.js:9 → nx-mf-df/apps/mf_remote_a/src/app/app.ts:30); routes registered by `provideRouter(appRoutes)` at nx-mf-df/apps/main-host/src/app/app.config.ts:30, from nx-mf-df/apps/main-host/src/bootstrap.ts:5. Target: mf_remote_a. |
| src-load-remote | nx-mf-df/apps/main-host/src/app/app.routes.ts:19 | nx-mf-df/apps/main-host | remote-resolution | Yes | `loadComponent` of route `mf_remote_b` resolves `loadRemoteModule('mf_remote_b', './Component')` and uses `m.App` (exposed at nx-mf-df/apps/mf_remote_b/federation.config.js:9); same activation chain as line 14. Target: mf_remote_b. |
| src-load-remote | nx-mf-df/apps/main-host/src/app/app.routes.ts:24 | nx-mf-df/apps/main-host | remote-resolution | Yes | `loadComponent` of route `mf_remote_c` resolves `loadRemoteModule('mf_remote_c', './Component')` and uses `m.App` (exposed at nx-mf-df/apps/mf_remote_c/federation.config.js:9); same activation chain as line 14. Target: mf_remote_c. |
| src-load-remote | nx-mf-df/apps/main-host/src/main.ts:1 | nx-mf-df/apps/main-host | remote-resolution | Yes | Import of `initFederation`, used with the manifest on line 3. |
| src-load-remote | nx-mf-df/apps/main-host/src/main.ts:3 | nx-mf-df/apps/main-host | remote-resolution | Yes | `initFederation('federation.manifest.json')` before bootstrap; the manifest maps `mf_remote_a`, `mf_remote_b` and `mf_remote_c` to `remoteEntry.json` at `localhost:4201-4203` (nx-mf-df/apps/main-host/public/federation.manifest.json:2-4), rewritten during the GitHub Pages build to each remote’s subdirectory (nx-mf-df/scripts/gh-build.mjs:57-64). Targets: mf_remote_a, mf_remote_b and mf_remote_c. |
| src-load-remote | nx-mf-df/apps/mf_remote_a/src/main.ts:1 | nx-mf-df/apps/mf_remote_a | remote-resolution | No | Import of `initFederation`, used only in the `initFederation()` without a manifest on line 3, which does not resolve another unit. |
| src-load-remote | nx-mf-df/apps/mf_remote_a/src/main.ts:3 | nx-mf-df/apps/mf_remote_a | remote-resolution | No | `initFederation()` without a manifest or remotes; mf_remote_a only exposes `./Component` (nx-mf-df/apps/mf_remote_a/federation.config.js:8-10), loaded by the host without executing this main. |
| src-load-remote | nx-mf-df/apps/mf_remote_b/src/main.ts:1 | nx-mf-df/apps/mf_remote_b | remote-resolution | No | Import of `initFederation`, used only in the `initFederation()` without a manifest on line 3, which does not resolve another unit. |
| src-load-remote | nx-mf-df/apps/mf_remote_b/src/main.ts:3 | nx-mf-df/apps/mf_remote_b | remote-resolution | No | `initFederation()` without a manifest or remotes; mf_remote_b only exposes `./Component` (nx-mf-df/apps/mf_remote_b/federation.config.js:8-10), loaded by the host without executing this main. |
| src-load-remote | nx-mf-df/apps/mf_remote_c/src/main.ts:1 | nx-mf-df/apps/mf_remote_c | remote-resolution | No | Import of `initFederation`, used only in the `initFederation()` without a manifest on line 3, which does not resolve another unit. |
| src-load-remote | nx-mf-df/apps/mf_remote_c/src/main.ts:3 | nx-mf-df/apps/mf_remote_c | remote-resolution | No | `initFederation()` without a manifest or remotes; mf_remote_c only exposes `./Component` (nx-mf-df/apps/mf_remote_c/federation.config.js:8-10), loaded by the host without executing this main. |

## Constructs outside mining

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| manual | nx-mf-df/apps/main-host/src/app/app.routes.ts:6 | nx-mf-df/apps/main-host | host-relationship | Yes | Host route table declares root route `Home` and routes `mf_remote_a`, `mf_remote_b` and `mf_remote_c` (nx-mf-df/apps/main-host/src/app/app.routes.ts:6-26); registered by nx-mf-df/apps/main-host/src/app/app.config.ts:30; navigation links at nx-mf-df/apps/main-host/src/app/shared/components/header/header.html:13-16 and `<router-outlet>` at nx-mf-df/apps/main-host/src/app/shared/components/main/main.html:2. |
| manual | nx-mf-df/apps/main-host/src/app/app.config.ts:31 | nx-mf-df/apps/main-host | communication | Yes | `provideBus(...)` from `@lkovari/microfrontend-platform-communication/angular` creates the platform message bus in the host (`appId: SHELL_HOST_ID`, topic registry and validators, nx-mf-df/apps/main-host/src/app/app.config.ts:31-42), and `provideHostBridge` exposes it to remotes `MF_REMOTE_A_ID`, `MF_REMOTE_B_ID` and `MF_REMOTE_C_ID` (:43-47). On the composed page, the host executes `providePlatformMessageListenerBootstrap()` and the h2r query and command handler bootstraps (:50-53). These handlers subscribe on behalf of the three remote IDs and process requests in the host (nx-mf-df/libs/common-ui-lib/src/lib/platform-messaging/services/demo-shell-h2r-query-remote-handler.service.ts:74-80, :112-122; nx-mf-df/libs/common-ui-lib/src/lib/platform-messaging/services/demo-shell-h2r-command-remote-handler.service.ts:74-80, :112-121); query responses and command acknowledgements are published on the same bus by this host execution (nx-mf-df/libs/common-ui-lib/src/lib/platform-messaging/services/demo-query-queue.service.ts:121-134; nx-mf-df/libs/common-ui-lib/src/lib/platform-messaging/services/demo-shell-h2r-command-remote-handler.service.ts:129-142). Federated components do not execute their standalone `app.config.ts` files: routes load only `m.App` (nx-mf-df/apps/main-host/src/app/app.routes.ts:11-25; nx-mf-df/apps/mf_remote_a/federation.config.js:8-10). Each remote component provides `WELCOME_REMOTE_PARTICIPANT_ID` with its ID and `PlatformWelcomeLastMessageService` (nx-mf-df/apps/mf_remote_a/src/app/app.ts:25-28; nx-mf-df/apps/mf_remote_b/src/app/app.ts:25-28; nx-mf-df/apps/mf_remote_c/src/app/app.ts:25-28); this service consumes `PLATFORM_MESSAGE_V1` through inherited `BUS_TOKEN` or, alternatively, through the global bridge via `RemotePlatformBusService`, subscribing with the remote ID (nx-mf-df/libs/common-ui-lib/src/lib/platform-messaging/services/platform-welcome-last-message.service.ts:35-36, :62-75; nx-mf-df/libs/common-ui-lib/src/lib/platform-messaging/services/remote-platform-bus.service.ts:52-57). Host publishes through composer `lib-platform-messaging-trigger` and sends queries/commands through the header’s `lib-demo-shell-h2r-query-suite` (nx-mf-df/apps/main-host/src/app/shared/components/header/header.html:19-20). Targets: mf_remote_a, mf_remote_b and mf_remote_c. |

## Summary

Constructs participating in composition: 8 (remote-resolution: 6, host-relationship: 1, communication: 1).

## Notes

- Host chain: nx-mf-df/apps/main-host/src/main.ts:3-5 → nx-mf-df/apps/main-host/src/bootstrap.ts:5 → nx-mf-df/apps/main-host/src/app/app.config.ts:30 → nx-mf-df/apps/main-host/src/app/app.routes.ts:6-26. The remotes’ `initFederation()` calls without a manifest are internal to the standalone flow.
- The step 4 search found no `customElements`, `<iframe`, `postMessage`, `CustomEvent`, `BroadcastChannel`, `<script>` injection, `registerApplication` or `registerMicroApps`; the only other `import(` occurrences are `await import('jsonc-eslint-parser')` in library ESLint configurations, outside application code.
- Communication uses external package `@lkovari/microfrontend-platform-communication` (nx-mf-df/package.json:89); publishing and subscribing services are in nx-mf-df/libs/common-ui-lib (a `No` unit in the structural review), and contracts (topics, participant ids, bridge access token) in nx-mf-df/libs/contracts-platform-messaging. Publishing and subscription points cited in the manual row did not become their own rows, as usage points of the same bus.
