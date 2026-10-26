---
schema: 1
id: 994642993
full_name: ayushpandey241626/microfrontend-demo
commit: ec39a278ec6951feeb8d7ff7688cb4f056be589b
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

# 229 — ayushpandey241626/microfrontend-demo

## Repository overview

An Angular demonstration workspace, with four projects in `projects/` and one root `package.json`.
`host-app` is the shell (port 4200, angular.json:76). The other three are Module Federation
remotes, each with a single route exposure: `mfe1` exposes `./ContactsModule`
(projects/mfe1/webpack.config.js:7-11), `mfe2` exposes `./AdminModule`
(projects/mfe2/webpack.config.js:7-11), and `login-mfe-app` exposes `./LoginModule`
(projects/login-mfe-app/webpack.config.js:7-11). Remotes configure federation with
`withModuleFederationPlugin` from `@angular-architects/module-federation`; the host uses webpack's
`ModuleFederationPlugin` directly (projects/host-app/webpack.config.js:6, :20), and all
four configurations share all dependencies as singletons (`shareAll`, for example
projects/host-app/webpack.config.js:26-32).

The host loads all three remotes in the router, with `loadRemoteModule({ type: 'module', ... })` and the
fixed `remoteEntry.js` URL on `localhost`: `contacts` → mfe1, `admin` → mfe2 and `login` →
login-mfe-app (projects/host-app/src/app/app.routes.ts:13-41). The empty route redirects to
`login` (:8-12). Routes are registered by `provideRouter(routes)`
(projects/host-app/src/app/app.config.ts:12), and the host menu navigates to `/contacts` and `/admin`
(projects/host-app/src/app/app.component.ts:29, :34). The static `remotes` in the host's
`webpack.config.js` (projects/host-app/webpack.config.js:21-25) are used by no
`import('mfe1/...')`; loading uses only URLs. Hence key `loginMfeApp`
(projects/host-app/webpack.config.js:24), differing from `name: "login-mfe-app"`
(projects/login-mfe-app/webpack.config.js:7), does not prevent loading.

Besides federation, login connects units through the `isLoggedIn` key in `localStorage`: the
login form writes the key and navigates to `/contacts`
(projects/login-mfe-app/src/app/login/login-form/login-form.component.ts:63-64), and the host's `AuthGuard`
reads it to unlock `contacts` and `admin` (projects/host-app/src/app/auth.guard.ts:11;
projects/host-app/src/app/app.routes.ts:15, :25). Host logout only navigates to `/login`, without
deleting the key (projects/host-app/src/app/app.component.ts:71-74).

Each project's `import('./bootstrap')` (for example
projects/host-app/src/main.ts:1), internal to the unit, did not become a relationship, nor did key `contacts` in
`localStorage`, read and written only by mfe1. Script `run:all` (package.json:10) points to the
federation package's development server and declares no relationship. Every `Yes` unit in the
structural review participates in at least one relationship.

## Relationships

| # | Source | Target | Type | Direction | Mechanism | In snapshot | Active | Configuration | Code |
|---|---|---|---|---|---|---|---|---|---|
| 1 | projects/host-app | projects/login-mfe-app | host → remote | source → target | module-federation | Yes | Yes | projects/host-app/webpack.config.js:24 (remote `loginMfeApp@http://localhost:4203/remoteEntry.js`); projects/login-mfe-app/webpack.config.js:7 (`name: "login-mfe-app"`); projects/login-mfe-app/webpack.config.js:10-11 (exposes `./LoginModule`); angular.json:383 (port 4203) | projects/host-app/src/app/app.routes.ts:3; projects/host-app/src/app/app.routes.ts:36; projects/host-app/src/app/app.routes.ts:7 |
| 2 | projects/host-app | projects/mfe1 | host → remote | source → target | module-federation | Yes | Yes | projects/host-app/webpack.config.js:22 (remote `mfe1@http://localhost:4201/remoteEntry.js`); projects/mfe1/webpack.config.js:7 (`name: "mfe1"`); projects/mfe1/webpack.config.js:10-11 (exposes `./ContactsModule`); angular.json:177 (port 4201) | projects/host-app/src/app/app.routes.ts:3; projects/host-app/src/app/app.routes.ts:17; projects/host-app/src/app/app.routes.ts:7 |
| 3 | projects/host-app | projects/mfe2 | host → remote | source → target | module-federation | Yes | Yes | projects/host-app/webpack.config.js:23 (remote `mfe2@http://localhost:4202/remoteEntry.js`); projects/mfe2/webpack.config.js:7 (`name: "mfe2"`); projects/mfe2/webpack.config.js:10-11 (exposes `./AdminModule`); angular.json:278 (port 4202) | projects/host-app/src/app/app.routes.ts:3; projects/host-app/src/app/app.routes.ts:27; projects/host-app/src/app/app.routes.ts:7 |
| 4 | projects/login-mfe-app | projects/host-app | communication | source → target | other | Yes | Yes | — | projects/login-mfe-app/src/app/login/login-form/login-form.component.ts:63 |

## Observations

**1. projects/host-app → projects/login-mfe-app.** Route `login` calls `loadRemoteModule` with
`exposedModule: './LoginModule'` and `remoteEntry: 'http://localhost:4203/remoteEntry.js'`
(projects/host-app/src/app/app.routes.ts:33-40). The module matches the only exposure in
projects/login-mfe-app/webpack.config.js:10-11, pointing to login form routes
(projects/login-mfe-app/src/app/login/login-form.routes.ts:4). Port 4203 (angular.json:383)
only corroborates. The host's static remote (projects/host-app/webpack.config.js:24) uses key
`loginMfeApp`, not matching remote `name` (projects/login-mfe-app/webpack.config.js:7);
because loading uses a URL, the discrepancy does not change the relationship, and the declaration enters Configuration only
for connecting the two units. All three federation relationships share the first `Code`
(the import at app.routes.ts:3), so their order follows Target alphabetically.
The manual `routes` table line (app.routes.ts:7) enters relationships 1 to 3.

**2. projects/host-app → projects/mfe1.** Route `contacts` loads `./ContactsModule` from
`http://localhost:4201/remoteEntry.js` (projects/host-app/src/app/app.routes.ts:14-21), protected
by `AuthGuard` (:15). The module matches the exposure in projects/mfe1/webpack.config.js:10-11,
and static remote `mfe1@` (projects/host-app/webpack.config.js:22) matches `name` in
projects/mfe1/webpack.config.js:7. Port 4201 (angular.json:177) only corroborates.

**3. projects/host-app → projects/mfe2.** Route `admin` loads `./AdminModule` from
`http://localhost:4202/remoteEntry.js` (projects/host-app/src/app/app.routes.ts:23-31), also
protected by `AuthGuard` (:25). The module matches the exposure in
projects/mfe2/webpack.config.js:10-11, and static remote `mfe2@`
(projects/host-app/webpack.config.js:23) matches `name` in projects/mfe2/webpack.config.js:7.
Port 4202 (angular.json:278) only corroborates.

**4. projects/login-mfe-app → projects/host-app.** The exchange uses shared state in
`localStorage`, rather than events, hence mechanism `other`. The login form writes
`isLoggedIn = 'true'` (projects/login-mfe-app/src/app/login/login-form/login-form.component.ts:63),
and the host's `AuthGuard` reads the same key (projects/host-app/src/app/auth.guard.ts:11) to unlock
routes `contacts` and `admin` (projects/host-app/src/app/app.routes.ts:15, :25). Only
login-mfe-app writes the key and only the host reads it; no code deletes it, including logout
(projects/host-app/src/app/app.component.ts:71-74). Hence direction is `source → target`. The
key is the same only when the form runs inside the host page under one origin; independently
on port 4203 (angular.json:383), login-mfe-app has its own `localStorage`. No configuration
declaration connects units through this channel, and Configuration remains `—`.

## Summary

Relationships: 4 (host → remote: 3, communication: 1). Active: 4. Target outside the snapshot: 0.
Units without a relationship: none.

