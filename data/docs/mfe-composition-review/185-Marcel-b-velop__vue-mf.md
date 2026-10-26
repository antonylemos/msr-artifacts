---
schema: 1
id: 1101991974
full_name: Marcel-b-velop/vue-mf
commit: ed270d34b0542cb1a0ce26aafc2aeba4bca994e1
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

# 185 — Marcel-b-velop/vue-mf

## Repository overview

An experiment with four Vue 3 + Vite applications in a pnpm workspace, joined by Module Federation
(`@originjs/vite-plugin-federation`). `host` is the shell: it maintains navigation and `<RouterView />`
(host/src/App.vue:8-9) and declares three remotes, `remote-app1`, `remote-app2` and `remote-lib`
(host/vite.config.ts:15-19). It enters the units in two ways: global components
created by `defineAsyncComponent` in host/src/main.ts:12-14 and registered in host/src/main.ts:19-21,
and routes importing remote pages (host/src/router/index.ts:7-8). Route `/` shows `App1`
from app-1 (host/src/views/Home.vue:1); `/login` and `/register` show app-2's forms.
`host` also has `filename: "remoteEntry.js"` and the comment "Modules to expose"
(host/vite.config.ts:13-14), but exposes nothing.

`lib` acts as a remote for shared components and services: it exposes the `Confirm` dialog,
`apiClient` and types (lib/vite.config.ts:21-25). App-1 is also a host for `lib`: it loads
`Confirm` (app-1/src/main.ts:11, :16) and imports `apiClient` statically
(app-1/src/main.ts:8; app-1/src/composables/api.ts:1). The `<Confirm>` in app-1/src/App.vue:33 has
no local import; it is resolved through the global component of the app mounting `App1`, namely
app-1/src/main.ts:16 when app-1 runs independently and host/src/main.ts:21 when it runs inside the
host. App-2 declares `remote-lib` (app-2/vite.config.ts:21-23), but no app-2 file
imports it.

Excluded from active relationships: app-2's `App2` is registered as `AppTwo`
(host/src/main.ts:13, :20) without any `<AppTwo>` in a template (a `No` source code review
line); app-2's `./App2` and `./Home` exposures (app-2/vite.config.ts:16-17) have no
other consumer; event `auth:logout` circulates only within app-2
(app-2/src/services/authService.ts:57, :99; app-2/src/App.vue:24); and store
host/src/stores/authStore.ts:3-17, also reading and writing `accessToken`, is not imported. The session
connects units through `localStorage`: app-2 writes the token (app-2/src/services/authService.ts:67,
:76) and lib's `apiClient` reads it on each request (lib/src/services/apiClient.ts:15) and, on a 401,
deletes it and redirects to `/login` (lib/src/services/apiClient.ts:33-35), which in the host is
app-2's `LoginForm`, itself reading the token on every request
(app-2/src/services/authService.ts:40). There is also a .NET API and IdentityServer in `Api/`, which are not frontend
units.

## Relationships

| # | Source | Target | Type | Direction | Mechanism | In snapshot | Active | Configuration | Code |
|---|---|---|---|---|---|---|---|---|---|
| 1 | app-1 | lib | host → remote | source → target | module-federation | Yes | Yes | app-1/vite.config.ts:18-20 (remote `remote-lib` at `http://localhost:5177/assets/remoteEntry.js`); lib/vite.config.ts:18-19 (`name: "remote-lib"`, `filename: "remoteEntry.js"`); lib/vite.config.ts:22-23 (exposes `./Confirm` and `./apiClient`); lib/package.json:9 (`vite preview --port 5177`) | app-1/src/main.ts:11; app-1/src/App.vue:33 |
| 2 | host | app-1 | host → remote | source → target | module-federation | Yes | Yes | host/vite.config.ts:16 (remote `remote-app1` at `http://localhost:5174/assets/remoteEntry.js`); app-1/vite.config.ts:12-13 (`name: "remote-app1"`, `filename: "remoteEntry.js"`); app-1/vite.config.ts:16 (exposes `./App1`); app-1/package.json:10 (`vite preview --port 5174`) | host/src/main.ts:12; host/src/router/index.ts:4; host/src/views/Home.vue:1 |
| 3 | host | lib | host → remote | source → target | module-federation | Yes | Yes | host/vite.config.ts:18 (remote `remote-lib` at `http://localhost:5177/assets/remoteEntry.js`); lib/vite.config.ts:18-19 (`name: "remote-lib"`, `filename: "remoteEntry.js"`); lib/vite.config.ts:22 (exposes `./Confirm`); lib/package.json:9 (`vite preview --port 5177`) | host/src/main.ts:14; app-1/src/App.vue:33 |
| 4 | host | app-2 | host → remote | source → target | module-federation | Yes | Yes | host/vite.config.ts:17 (remote `remote-app2` at `http://localhost:5175/assets/remoteEntry.js`); app-2/vite.config.ts:12-13 (`name: "remote-app2"`, `filename: "remoteEntry.js"`); app-2/vite.config.ts:18-19 (exposes `./LoginForm` and `./RegisterForm`); app-2/vite.config.ts:40 (port 5175) | host/src/router/index.ts:7; host/src/router/index.ts:8; host/src/router/index.ts:4 |
| 5 | app-2 | lib | communication | bidirectional | other | Yes | Yes | — | app-2/src/services/authService.ts:67 |
| 6 | app-2 | lib | host → remote | source → target | module-federation | Yes | No | app-2/vite.config.ts:21-23 (remote `remote-lib` at `http://localhost:5177/assets/remoteEntry.js`); lib/vite.config.ts:18-19 (`name: "remote-lib"`, `filename: "remoteEntry.js"`) | — |

## Observations

**1. app-1 → lib.** App-1's `remote-lib` remote (app-1/vite.config.ts:19) matches
unit lib through `name` (lib/vite.config.ts:18), and `./Confirm` is exposed in lib/vite.config.ts:22;
port 5177 of lib's `preview` (lib/package.json:9) only corroborates. App-1 loads `Confirm` in
app-1/src/main.ts:11, registers it globally in app-1/src/main.ts:16 and uses it in
app-1/src/App.vue:33 when running independently (app-1/src/main.ts:21). The static import of
`remote-lib/apiClient` (app-1/src/main.ts:8; app-1/src/composables/api.ts:1), exposed in
lib/vite.config.ts:23, is the same relationship but did not enter as a source code review row,
so appears only here and in Configuration.

**2. host → app-1.** `remote-app1` (host/vite.config.ts:16) matches app-1 through `name` and
the exposed `./App1` (app-1/vite.config.ts:12, :16); port 5174 of app-1's `preview`
(app-1/package.json:10) only corroborates, since app-1 fixes no `server` port. `App1` is loaded
in host/src/main.ts:12, registered as `AppOne` (host/src/main.ts:19) and rendered in
host/src/views/Home.vue:1, the component of route `/` in the route table (host/src/router/index.ts:4-5),
so host/src/router/index.ts:4 also enters here. The relationship is active: `/` is the initial route,
displayed by `<RouterView />` in host/src/App.vue:9.

**3. host → lib.** The host's `remote-lib` (host/vite.config.ts:18) matches lib through `name`
(lib/vite.config.ts:18). The host loads `Confirm` in host/src/main.ts:14 and registers it
globally in host/src/main.ts:21, but no host template uses `<Confirm>`; its user is
app-1's `App1` rendered inside the host (app-1/src/App.vue:33), resolved through that registration.
Hence app-1/src/App.vue:33 enters this relationship and 1. Source remains `host`, which loads
and registers the component.

**4. host → app-2.** `remote-app2` (host/vite.config.ts:17) matches app-2 through `name`
(app-2/vite.config.ts:12) and exposures `./LoginForm` and `./RegisterForm`
(app-2/vite.config.ts:18-19), those imported in routes `/login` and `/register`
(host/src/router/index.ts:7-8); port 5175 (app-2/vite.config.ts:40) only corroborates. Table
`routes` (host/src/router/index.ts:4) is passed to the router in host/src/main.ts:23-28, and `/login` is
reached through the menu (host/src/components/Navigation.vue:17-19). `App2` is also loaded
(host/src/main.ts:13), but the source code review marked it `No` because it is unused; it does not
change the row.

**5. app-2 ↔ lib.** The exchange uses shared state in `localStorage`, rather than events, hence
`other`. App-2 writes `accessToken` on registration and login (app-2/src/services/authService.ts:67,
:76) and deletes it on 401 and logout (:56, :98); lib's `apiClient` interceptor reads the key and
assembles the `Authorization` header (lib/src/services/apiClient.ts:15-19). The reverse direction also
exists: on a 401, lib's `apiClient` deletes `accessToken` (lib/src/services/apiClient.ts:34), and
app-2's `authClient` interceptor reads the same key on each request
(app-2/src/services/authService.ts:40), hence `bidirectional`. Lib uses the client in `Confirm`
(lib/src/components/Confirm.vue:7, :22) and provides it to app-1. The key is the same only because, in the host, `LoginForm`/`RegisterForm` and `Confirm` run on the
host page under one origin; independently each unit has its own port and
`localStorage`. Configuration remains `—`: no declaration connects both units through this channel.

**6. app-2 → lib.** App-2 declares `remote-lib` (app-2/vite.config.ts:22), matching lib
through `name` (lib/vite.config.ts:18), but no app-2 file imports `remote-lib/...` (searching
for `remote-lib` in app-2 finds only app-2/vite.config.ts:22). The relationship exists only in configuration,
hence `Active = No` and Code `—`.

## Summary

Relationships: 6 (host → remote: 5, communication: 1). Active: 5. Target outside the snapshot: 0.
Units without a relationship: none.

