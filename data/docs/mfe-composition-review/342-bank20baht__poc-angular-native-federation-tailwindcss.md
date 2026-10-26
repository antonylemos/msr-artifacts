---
schema: 1
id: 1050538328
full_name: bank20baht/poc-angular-native-federation-tailwindcss
commit: d2f9722e77b754318c831138d54aebbfd093ee1e
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

# 342 — bank20baht/poc-angular-native-federation-tailwindcss

## Repository overview

An Angular 20 proof of concept with two units, `host` and `remote`, each with its own Angular workspace, connected through **Native Federation** (`@angular-architects/native-federation`). The host registers the remote before bootstrap, pointing to `http://localhost:4201/remoteEntry.json` (host/src/main.ts:3-5), and loads it at two routes: the empty route mounts exposed component `./Component`, and route `flights` mounts exposed route set `./routes` (host/src/app/app.routes.ts:7-29). The remote declares `name: 'remote'` and exposes both modules (remote/federation.config.js:5-10); the result appears in the host's `<router-outlet>` (host/src/app/app.html:2). Each load has a local fallback if the remote does not respond (host/src/app/app.routes.ts:13-16, 24-27). A demonstration repository, without Dockerfile, CI or hosting configuration; URLs are for local development.

The project's declared topic is styling: the host's Tailwind scans remote source code (host/src/styles.css:4) to generate classes used by remote templates when mounted inside the host. This is build coupling at CSS level, rather than a runtime composition relationship, and did not become a table row. The host also declares module `remote/Styles?inline` (host/src/remote.d.ts:1), imported by no file and not exposed by the remote (remote/federation.config.js:7-10). The remote's `initFederation()` (remote/src/main.ts:3) does not resolve another unit. There is no inter-unit message exchange.

## Relationships

| # | Source | Target | Type | Direction | Mechanism | In snapshot | Active | Configuration | Code |
|---|---|---|---|---|---|---|---|---|---|
| 1 | host | remote | host → remote | source → target | native-federation | Yes | Yes | host/src/main.ts:3-5 (`initFederation` with `remote` → `http://localhost:4201/remoteEntry.json`); remote/federation.config.js:5-10 (`name: 'remote'`, exposes `./Component` and `./routes`); remote/angular.json:108 (port 4201 of the remote) | host/src/app/app.routes.ts:1; host/src/app/app.routes.ts:11; host/src/app/app.routes.ts:22; host/src/main.ts:1; host/src/main.ts:3; host/src/app/app.routes.ts:7 |

## Observations

**1. host → remote.** Name `remote` used in `initFederation` (host/src/main.ts:4) and `loadRemoteModule` (host/src/app/app.routes.ts:11, 22) matches `name: 'remote'` in remote/federation.config.js:5, and requested modules `./Component` and `./routes` match `exposes` in remote/federation.config.js:8-9, pointing to `App` (remote/src/app/app.ts:10) and `APP_ROUTES` (remote/src/app/modules/home/home.routes.ts:3); port 4201 (remote/angular.json:108) only corroborates. Both loads yield the same trio and remain in one row. Active `Yes`: routes are registered by `provideRouter(routes)` (host/src/app/app.config.ts:10), and source code review lines supporting the relationship are all `Yes`. Local fallbacks change neither direction nor target.

## Summary

Relationships: 1 (host → remote: 1). Active: 1. Target outside the snapshot: 0.
Units without a relationship: none.

