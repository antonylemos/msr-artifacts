---
schema: 1
id: 1316095122
full_name: Jonadersonmoura/descompara
commit: 3dd51466a7d9eece3bcb46e0663ad5ad614daf32
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

# 343 — Jonadersonmoura/descompara

## Repository overview

An insurance portal proof of concept in an Nx workspace with Angular, composed through **Native Federation** (`@angular-architects/native-federation`). `shell` is the host: before bootstrap, it loads manifest `/federation.manifest.json` (shell/src/main.ts:3-5), associating names `admin`, `intranet` and `marAberto` with `remoteEntry.json` URLs on ports 4203, 4202 and 4201 (shell/public/federation.manifest.json:2-4). Shell imports nothing statically from remotes: its route table loads each one's `./Routes` with `loadRemoteModule`, `marAberto` at the root route, `intranet` at `intranet` and `admin` at `admin` (shell/src/app/app.routes.ts:4-20), and is registered by `provideRouter(appRoutes)` (shell/src/app/app.config.ts:9). Each remote declares its own `name` and exposes only `./Routes` (for example admin/federation.config.mjs:4 and :8-10). URLs are for local development; there is no Dockerfile or hosting configuration.

All three remotes also run independently: each one's `initFederation` receives a map with only its own name (for example admin/src/main.ts:3), resolving no other unit and not becoming a relationship. Libraries in `libs/shared/` (types, UI, services, guards, theme) are not units and enter through `tsconfig.base.json` aliases (tsconfig.base.json:22-29).

The distinctive feature is login. `AuthService` from `libs/shared/data-access` (`providedIn: 'root'`) holds the user in a `signal` (libs/shared/data-access/src/lib/auth.service.ts:6-8), changed by `login` and `logout` (:17-23). Each remote has its own login screen, writing a different role: `publico` in marAberto, `gerente` in intranet and `admin` in admin (marAberto/src/app/login/login.ts:19; intranet/src/app/login/login.ts:19; admin/src/app/login/login.ts:19). Intranet and admin headers display the user and log out (intranet/src/app/header/header.html:5-6, intranet/src/app/header/header.ts:17; admin/src/app/header/header.html:5-6, admin/src/app/header/header.ts:17), and `roleGuard` reads the role (libs/shared/guards/src/lib/role.guard.ts:14-17) to protect intranet's home (`gerente` or `admin`) and admin's (`admin`) (intranet/src/app/remote-entry/entry.routes.ts:12; admin/src/app/remote-entry/entry.routes.ts:12). If remotes mounted in the shell share a service instance, login in one remote applies to the others; for example, admin login unlocks intranet's home. The `federation.config.mjs` files use `shareAll` with `singleton: true` (shell/federation.config.mjs:7-18; admin/federation.config.mjs:12-23), but the snapshot does not show whether local library `@descompara/shared-data-access` enters this sharing, and the source code review left the line `Undetermined`. This became relationships 4 through 6, with Active `Undetermined`. Shell uses neither service nor guard. The README describes a different configuration, without a login screen and with guards in shell routes (README.md:56), not matching the snapshot; history has a single commit and does not confirm it is an earlier version.

## Relationships

| # | Source | Target | Type | Direction | Mechanism | In snapshot | Active | Configuration | Code |
|---|---|---|---|---|---|---|---|---|---|
| 1 | shell | admin | host → remote | source → target | native-federation | Yes | Yes | shell/public/federation.manifest.json:2 (`admin` → `http://localhost:4203/remoteEntry.json`); admin/federation.config.mjs:4 (`name: 'admin'`); admin/federation.config.mjs:8-10 (exposes `./Routes`); admin/project.json:131 (port 4203 of `serve-original`) | shell/src/app/app.routes.ts:2; shell/src/app/app.routes.ts:18; shell/src/main.ts:1; shell/src/main.ts:3; shell/src/app/app.routes.ts:4 |
| 2 | shell | intranet | host → remote | source → target | native-federation | Yes | Yes | shell/public/federation.manifest.json:3 (`intranet` → `http://localhost:4202/remoteEntry.json`); intranet/federation.config.mjs:4 (`name: 'intranet'`); intranet/federation.config.mjs:8-10 (exposes `./Routes`); intranet/project.json:131 (port 4202 of `serve-original`) | shell/src/app/app.routes.ts:2; shell/src/app/app.routes.ts:13; shell/src/main.ts:1; shell/src/main.ts:3; shell/src/app/app.routes.ts:4 |
| 3 | shell | marAberto | host → remote | source → target | native-federation | Yes | Yes | shell/public/federation.manifest.json:4 (`marAberto` → `http://localhost:4201/remoteEntry.json`); marAberto/federation.config.mjs:4 (`name: 'marAberto'`); marAberto/federation.config.mjs:8-10 (exposes `./Routes`); marAberto/project.json:131 (port 4201 of `serve-original`) | shell/src/app/app.routes.ts:2; shell/src/app/app.routes.ts:8; shell/src/main.ts:1; shell/src/main.ts:3; shell/src/app/app.routes.ts:4 |
| 4 | marAberto | admin | communication | source → target | events | Yes | Undetermined | shell/federation.config.mjs:7-18 (`shareAll` singleton); marAberto/federation.config.mjs:12-23 (same); admin/federation.config.mjs:12-23 (same); tsconfig.base.json:25-27 (alias `@descompara/shared-data-access`) | libs/shared/data-access/src/lib/auth.service.ts:8 |
| 5 | admin | intranet | communication | bidirectional | events | Yes | Undetermined | shell/federation.config.mjs:7-18 (`shareAll` singleton); admin/federation.config.mjs:12-23 (same); intranet/federation.config.mjs:12-23 (same); tsconfig.base.json:25-27 (alias `@descompara/shared-data-access`) | libs/shared/data-access/src/lib/auth.service.ts:8 |
| 6 | marAberto | intranet | communication | source → target | events | Yes | Undetermined | shell/federation.config.mjs:7-18 (`shareAll` singleton); marAberto/federation.config.mjs:12-23 (same); intranet/federation.config.mjs:12-23 (same); tsconfig.base.json:25-27 (alias `@descompara/shared-data-access`) | libs/shared/data-access/src/lib/auth.service.ts:8 |

## Observations

**1. shell → admin.** Name `admin` requested in `loadRemoteModule('admin', './Routes')` (shell/src/app/app.routes.ts:18) matches `name: 'admin'` in admin/federation.config.mjs:4, and module `./Routes` matches `exposes` in admin/federation.config.mjs:8-10, pointing to `entry.routes.ts` (admin/src/app/remote-entry/entry.routes.ts:7). The URL comes from the shell manifest (shell/public/federation.manifest.json:2), loaded by `initFederation` (shell/src/main.ts:3); port 4203 (admin/project.json:131) only corroborates. Lines for importing `loadRemoteModule` (shell/src/app/app.routes.ts:2), `initFederation` (shell/src/main.ts:1, :3) and table `appRoutes` (shell/src/app/app.routes.ts:4) serve all three loading relationships and appear in all three. Active `Yes`: all code lines are `Yes` in the source code review.

**2. shell → intranet.** Same resolution as relationship 1: `loadRemoteModule('intranet', './Routes')` (shell/src/app/app.routes.ts:13) matches intranet/federation.config.mjs:4 and :8-10; URL in shell/public/federation.manifest.json:3, port 4202 in intranet/project.json:131. Shell route `intranet` mounts remote routes, whose home is protected by `roleGuard` (intranet/src/app/remote-entry/entry.routes.ts:12).

**3. shell → marAberto.** `loadRemoteModule('marAberto', './Routes')` (shell/src/app/app.routes.ts:8) matches marAberto/federation.config.mjs:4 and :8-10; URL in shell/public/federation.manifest.json:4, port 4201 in marAberto/project.json:131. This is the remote mounted at shell root route `''` (shell/src/app/app.routes.ts:6), the public page the user first sees.

**4. marAberto → admin.** A channel through shared reactive service `AuthService` (libs/shared/data-access/src/lib/auth.service.ts:6-8). MarAberto only writes: its login writes role `publico` (marAberto/src/app/login/login.ts:19), and no marAberto file reads the service. Admin reads the role through its home's `roleGuard('admin')` (admin/src/app/remote-entry/entry.routes.ts:12; libs/shared/guards/src/lib/role.guard.ts:14-17) and the user in the header (admin/src/app/header/header.html:5-6). Hence `source → target`. The effect would be replacing a user logged into admin with a `publico`, blocked by admin's guard. Mechanism `events`, as a shared reactive service. Active `Undetermined`, because the only source code review line is `Undetermined`: the channel exists only if shell and remotes share the same `@descompara/shared-data-access` instance, and the `shareAll` calls cited in Configuration do not show this for the local library.

**5. admin ↔ intranet.** Both units write and read the same service. Admin writes role `admin` (admin/src/app/login/login.ts:19) and logs out (admin/src/app/header/header.ts:17); intranet writes `gerente` (intranet/src/app/login/login.ts:19) and logs out (intranet/src/app/header/header.ts:17). Each reads the role in its own guard (intranet/src/app/remote-entry/entry.routes.ts:12; admin/src/app/remote-entry/entry.routes.ts:12) and header. With a single instance, admin login passes intranet's guard (`roleGuard('gerente', 'admin')`), and logout from either logs the other out; hence `bidirectional`, with Source and Target in alphabetical order. Active `Undetermined` for the same reason as relationship 4.

**6. marAberto → intranet.** As in relationship 4: marAberto only writes role `publico` (marAberto/src/app/login/login.ts:19), while intranet reads it in the home guard (intranet/src/app/remote-entry/entry.routes.ts:12) and header (intranet/src/app/header/header.html:5-6), also displaying the user on the homepage (intranet/src/app/home/home.ts:29). Active `Undetermined` for the same reason as relationship 4.

## Summary

Relationships: 6 (host → remote: 3, communication: 3). Active: 3. Target outside the snapshot: 0.
Units without a relationship: none.

