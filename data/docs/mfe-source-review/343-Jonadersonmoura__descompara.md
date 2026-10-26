---
schema: 1
id: 1316095122
full_name: Jonadersonmoura/descompara
commit: 3dd51466a7d9eece3bcb46e0663ad5ad614daf32
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 343 — Jonadersonmoura/descompara

## Mined constructs

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| src-async-bootstrap | admin/src/main.ts:5 | admin | dynamic-loading | No | Imports the local admin bootstrap after initFederation (admin/src/main.ts:3-5); internal to the unit. |
| src-async-bootstrap | intranet/src/main.ts:5 | intranet | dynamic-loading | No | Imports the local intranet bootstrap after initFederation (intranet/src/main.ts:3-5); internal to the unit. |
| src-async-bootstrap | marAberto/src/main.ts:5 | marAberto | dynamic-loading | No | Imports the local marAberto bootstrap after initFederation (marAberto/src/main.ts:3-5); internal to the unit. |
| src-async-bootstrap | shell/src/main.ts:5 | shell | dynamic-loading | No | Imports host shell’s local bootstrap after initFederation (shell/src/main.ts:3-5); internal to the unit. |
| src-load-remote | admin/src/main.ts:1 | admin | remote-resolution | No | Imports initFederation for the call at admin/src/main.ts:3, which only registers admin itself; does not resolve another unit. |
| src-load-remote | admin/src/main.ts:3 | admin | remote-resolution | No | `initFederation({ admin: './remoteEntry.json' })` maps only its own name to its own remoteEntry (admin/src/main.ts:3); admin only exposes ./Routes (admin/federation.config.mjs:4 and :9) and declares no remotes. Prepares the unit’s standalone runtime. |
| src-load-remote | intranet/src/main.ts:1 | intranet | remote-resolution | No | Imports initFederation for the call at intranet/src/main.ts:3, which only registers intranet itself; does not resolve another unit. |
| src-load-remote | intranet/src/main.ts:3 | intranet | remote-resolution | No | `initFederation({ intranet: './remoteEntry.json' })` maps only its own name to its own remoteEntry (intranet/src/main.ts:3); intranet only exposes ./Routes (intranet/federation.config.mjs:4 and :9) and declares no remotes. Prepares the unit’s standalone runtime. |
| src-load-remote | marAberto/src/main.ts:1 | marAberto | remote-resolution | No | Imports initFederation for the call at marAberto/src/main.ts:3, which only registers marAberto itself; does not resolve another unit. |
| src-load-remote | marAberto/src/main.ts:3 | marAberto | remote-resolution | No | `initFederation({ marAberto: './remoteEntry.json' })` maps only its own name to its own remoteEntry (marAberto/src/main.ts:3); marAberto only exposes ./Routes (marAberto/federation.config.mjs:4 and :9) and declares no remotes. Prepares the unit’s standalone runtime. |
| src-load-remote | shell/src/app/app.routes.ts:2 | shell | remote-resolution | Yes | Imports loadRemoteModule used in the three routes at shell/src/app/app.routes.ts:8, :13 and :18. |
| src-load-remote | shell/src/app/app.routes.ts:8 | shell | remote-resolution | Yes | `loadRemoteModule('marAberto', './Routes')` in the `loadChildren` of route `''` (shell/src/app/app.routes.ts:5-9); resolves the ./Routes exposed by marAberto (marAberto/federation.config.mjs:9) through the manifest URL (shell/public/federation.manifest.json:4). Routes registered by `provideRouter(appRoutes)` at shell/src/app/app.config.ts:9, chain shell/src/main.ts:3-5 → shell/src/bootstrap.ts:2-5. |
| src-load-remote | shell/src/app/app.routes.ts:13 | shell | remote-resolution | Yes | `loadRemoteModule('intranet', './Routes')` in route `intranet` (shell/src/app/app.routes.ts:10-14); target intranet (intranet/federation.config.mjs:9; shell/public/federation.manifest.json:3). |
| src-load-remote | shell/src/app/app.routes.ts:18 | shell | remote-resolution | Yes | `loadRemoteModule('admin', './Routes')` in route `admin` (shell/src/app/app.routes.ts:15-19); target admin (admin/federation.config.mjs:9; shell/public/federation.manifest.json:2). |
| src-load-remote | shell/src/main.ts:1 | shell | remote-resolution | Yes | Imports initFederation used with a manifest at shell/src/main.ts:3. |
| src-load-remote | shell/src/main.ts:3 | shell | remote-resolution | Yes | `initFederation('/federation.manifest.json')` loads the manifest naming admin, intranet and marAberto (shell/public/federation.manifest.json:2-4, ports 4203, 4202 and 4201); shell bootstrap runs only afterward (shell/src/main.ts:5). |

## Constructs outside mining

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| manual | shell/src/app/app.routes.ts:4 | shell | host-relationship | Yes | The `appRoutes` table declares where each remote enters shell: marAberto at root `''`, intranet at `intranet` and admin at `admin` (shell/src/app/app.routes.ts:4-20); registered by `provideRouter(appRoutes)` at shell/src/app/app.config.ts:9. |
| manual | libs/shared/data-access/src/lib/auth.service.ts:8 | — | communication | Undetermined | `AuthService` (`providedIn: 'root'`, libs/shared/data-access/src/lib/auth.service.ts:6-7) stores the user in a `signal` (:8), changed by `login`/`logout`/`setRole` (:17-27). Written by the marAberto, intranet and admin login (marAberto/src/app/login/login.ts:19, intranet/src/app/login/login.ts:19, admin/src/app/login/login.ts:19) and header logout (intranet/src/app/header/header.ts:17, admin/src/app/header/header.ts:17); read by `roleGuard` (libs/shared/guards/src/lib/role.guard.ts:14-17), protecting intranet and admin routes (intranet/src/app/remote-entry/entry.routes.ts:12, admin/src/app/remote-entry/entry.routes.ts:12). It would be an inter-unit channel only if the same instance were shared between federated builds; see Notes. |

## Summary

Constructs participating in composition: 7 (remote-resolution: 6, host-relationship: 1).

## Notes

- The three remotes’ `initFederation` calls receive a map with only their own name and `./remoteEntry.json`; they serve each remote’s standalone flow rather than resolving another unit.
- The `import('./remote-entry/entry.routes')` calls at admin/src/app/app.routes.ts:7, intranet/src/app/app.routes.ts:7 and marAberto/src/app/app.routes.ts:7 load local files of each remote (routes used when running alone) and did not become rows.
- `AuthService` remained `Undetermined`: the `federation.config.mjs` files only use `shareAll(...)` on packages (for example: shell/federation.config.mjs:7-18), without explicit `sharedMappings`, and README asserts a single instance only for `@angular/core`, `rxjs` etc. (README.md:52). The snapshot does not show whether `@descompara/shared-data-access` (tsconfig.base.json:25-26) becomes a shared singleton between shell and remotes. Each remote writes and reads its own login within its routes; the inter-unit effect (login in admin allowing intranet’s guard) depends on this single instance.
- README.md:56 describes a configuration different from the snapshot (no login screen, guards on shell routes; history has a single commit and does not confirm an earlier version); in the snapshot guards are on routes exposed by remotes and shell uses neither `AuthService` nor `roleGuard`.
- The step 4 search found no `customElements`, `<iframe`, `postMessage`, `CustomEvent`, `BroadcastChannel`, `<script>` injection, `registerRemotes`, `registerApplication` or `registerMicroApps` in the units’ code.
