---
schema: 1
id: 1033705813
full_name: hscale/adx-core-k
commit: 683dec7ebc233c685f97166a135032d5668070c1
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

# 060 — hscale/adx-core-k

## Repository overview

A platform example ("ADX CORE") in which a React/Vite shell composes six domain micro frontends through Module Federation (`@originjs/vite-plugin-federation`). The shell (`name: 'shell'`) declares six remotes, one per app, at `http://localhost:300N/assets/remoteEntry.js` (adx-core/apps/shell/vite.config.ts:10-18). Each app in `adx-core/apps/` declares itself as `<app>_app`, generates `remoteEntry.js` and exposes `./App` → `./src/App.tsx` (e.g.: adx-core/apps/auth/vite.config.ts:9-12). The shell loads all six `./App` modules with `React.lazy(() => import('<app>_app/App'))` (adx-core/apps/shell/src/App.tsx:16-21) and mounts each under a route prefix (`/auth/*`, `/tenant/*`, `/files/*`, `/users/*`, `/workflows/*`, `/modules/*`, adx-core/apps/shell/src/App.tsx:46-55). Composition has only one level: no remote loads another, and the shell exposes nothing.

The configuration is more complete than the code. Besides `./App`, the remotes expose domain components, and several of those files are absent from the snapshot (e.g.: adx-core/apps/file/vite.config.ts:13-15, adx-core/apps/tenant/vite.config.ts:13, adx-core/apps/module/vite.config.ts:15-17); `file`, `user` and `workflow` have only `src/App.tsx`. None of those components is consumed by the shell, so they do not become relationships; only each remote's `./App` is loaded, and it exists in all six. Among targets, only `adx-core/apps/auth` is `Yes` in the structural review; the other five are `Undetermined` because of missing `index.html` or absent exposes.

Each remote's `App.tsx` mounts its own provider stack and `BrowserRouter` (e.g.: adx-core/apps/auth/src/App.tsx:2,30-32; adx-core/apps/file/src/App.tsx:26-28), while the shell already wraps the routes in a `BrowserRouter` (adx-core/apps/shell/src/App.tsx:41). In other words, the remotes were written to run independently and are inserted as they stand; in react-router-dom 6 (`requiredVersion: '^6.8.1'`, adx-core/apps/shell/vite.config.ts:28-31), a router nested inside another is not accepted at runtime, limiting execution of the composition without changing the declared and loaded relationship. This also means each remote has its own `EventBusProvider` (e.g.: adx-core/apps/auth/src/App.tsx:31), separate from the shell's (adx-core/apps/shell/src/App.tsx:40).

There is no `communication` relationship. The shell declares the packages `singleton`: `@adx-core/shared-context`, `@adx-core/event-bus` and `@adx-core/i18n` (adx-core/apps/shell/vite.config.ts:40-51); all six remotes declare `singleton` for `@adx-core/shared-context` and `@adx-core/event-bus` (e.g.: adx-core/apps/auth/vite.config.ts:24-25), but not `@adx-core/i18n`, and add `@adx-core/bff-client`, which the shell does not declare (e.g.: adx-core/apps/auth/vite.config.ts:26). Even with those shared packages, all inter-unit event constructs in the source code review are `No`: the files firing or listening for events are reached by no unit. The BFFs in `adx-core/bff-services/` and the Rust backend are outside frontend composition.

## Relationships

| # | Source | Target | Type | Direction | Mechanism | In snapshot | Active | Configuration | Code |
|---|---|---|---|---|---|---|---|---|---|
| 1 | adx-core/apps/shell | adx-core/apps/auth | host → remote | source → target | module-federation | Yes | Yes | adx-core/apps/shell/vite.config.ts:12 (remote `auth_app` at `http://localhost:3001/assets/remoteEntry.js`); adx-core/apps/auth/vite.config.ts:9-12 (`name: 'auth_app'`, `filename: 'remoteEntry.js'`, exposes `./App`); adx-core/apps/auth/vite.config.ts:35-36 (port 3001) | adx-core/apps/shell/src/App.tsx:16; adx-core/apps/shell/src/App.tsx:46 |
| 2 | adx-core/apps/shell | adx-core/apps/tenant | host → remote | source → target | module-federation | Yes | Yes | adx-core/apps/shell/vite.config.ts:13 (remote `tenant_app` at `http://localhost:3002/assets/remoteEntry.js`); adx-core/apps/tenant/vite.config.ts:9-12 (`name: 'tenant_app'`, `filename: 'remoteEntry.js'`, exposes `./App`); adx-core/apps/tenant/vite.config.ts:34-35 (port 3002) | adx-core/apps/shell/src/App.tsx:17; adx-core/apps/shell/src/App.tsx:46 |
| 3 | adx-core/apps/shell | adx-core/apps/file | host → remote | source → target | module-federation | Yes | Yes | adx-core/apps/shell/vite.config.ts:14 (remote `file_app` at `http://localhost:3003/assets/remoteEntry.js`); adx-core/apps/file/vite.config.ts:9-12 (`name: 'file_app'`, `filename: 'remoteEntry.js'`, exposes `./App`); adx-core/apps/file/vite.config.ts:28 (port 3003) | adx-core/apps/shell/src/App.tsx:18; adx-core/apps/shell/src/App.tsx:46 |
| 4 | adx-core/apps/shell | adx-core/apps/user | host → remote | source → target | module-federation | Yes | Yes | adx-core/apps/shell/vite.config.ts:15 (remote `user_app` at `http://localhost:3004/assets/remoteEntry.js`); adx-core/apps/user/vite.config.ts:9-12 (`name: 'user_app'`, `filename: 'remoteEntry.js'`, exposes `./App`); adx-core/apps/user/vite.config.ts:28 (port 3004) | adx-core/apps/shell/src/App.tsx:19; adx-core/apps/shell/src/App.tsx:46 |
| 5 | adx-core/apps/shell | adx-core/apps/workflow | host → remote | source → target | module-federation | Yes | Yes | adx-core/apps/shell/vite.config.ts:16 (remote `workflow_app` at `http://localhost:3005/assets/remoteEntry.js`); adx-core/apps/workflow/vite.config.ts:9-12 (`name: 'workflow_app'`, `filename: 'remoteEntry.js'`, exposes `./App`); adx-core/apps/workflow/vite.config.ts:28 (port 3005) | adx-core/apps/shell/src/App.tsx:20; adx-core/apps/shell/src/App.tsx:46 |
| 6 | adx-core/apps/shell | adx-core/apps/module | host → remote | source → target | module-federation | Yes | Yes | adx-core/apps/shell/vite.config.ts:17 (remote `module_app` at `http://localhost:3006/assets/remoteEntry.js`); adx-core/apps/module/vite.config.ts:9-12 (`name: 'module_app'`, `filename: 'remoteEntry.js'`, exposes `./App`); adx-core/apps/module/vite.config.ts:35-36 (port 3006) | adx-core/apps/shell/src/App.tsx:21; adx-core/apps/shell/src/App.tsx:46 |

## Observations

**1. adx-core/apps/shell → adx-core/apps/auth.** The shell's `auth_app` remote (adx-core/apps/shell/vite.config.ts:12) matches the unit through `name: 'auth_app'` and `remoteEntry.js` (adx-core/apps/auth/vite.config.ts:9-10); port 3001 only corroborates. The `./App` imported in adx-core/apps/shell/src/App.tsx:16 exists (adx-core/apps/auth/src/App.tsx:53, `export default App`) and is mounted at `/auth/*` (adx-core/apps/shell/src/App.tsx:48). This is the only pair with a `Yes` target in the structural review, and the only remote whose exposes are all present (adx-core/apps/auth/src/components/), confirming the classification's caveat that this pair supports composition.

**2. adx-core/apps/shell → adx-core/apps/tenant.** `tenant_app` (adx-core/apps/shell/vite.config.ts:13) matches adx-core/apps/tenant/vite.config.ts:9-10. The `./App` loaded in adx-core/apps/shell/src/App.tsx:17 exists (adx-core/apps/tenant/src/App.tsx:51) and is mounted at `/tenant/*` (adx-core/apps/shell/src/App.tsx:49). The unit is `Undetermined` in the structural review (no `index.html`; the `./TenantSwitcher` expose, adx-core/apps/tenant/vite.config.ts:13, points to an absent file); this affects neither the match nor `./App` loading.

**3. adx-core/apps/shell → adx-core/apps/file.** `file_app` (adx-core/apps/shell/vite.config.ts:14) matches adx-core/apps/file/vite.config.ts:9-10. `./App` (adx-core/apps/file/src/App.tsx:43) is loaded in adx-core/apps/shell/src/App.tsx:18 and mounted at `/files/*` (adx-core/apps/shell/src/App.tsx:50). The directory has only `src/App.tsx`; the three other exposes (adx-core/apps/file/vite.config.ts:13-15) do not exist, and the unit is `Undetermined` in the structural review.

**4. adx-core/apps/shell → adx-core/apps/user.** `user_app` (adx-core/apps/shell/vite.config.ts:15) matches adx-core/apps/user/vite.config.ts:9-10. `./App` (adx-core/apps/user/src/App.tsx:43) is loaded in adx-core/apps/shell/src/App.tsx:19 and mounted at `/users/*` (adx-core/apps/shell/src/App.tsx:51). The same situation as `file`: only `src/App.tsx`, absent component exposes (adx-core/apps/user/vite.config.ts:13-15), `Undetermined` unit.

**5. adx-core/apps/shell → adx-core/apps/workflow.** `workflow_app` (adx-core/apps/shell/vite.config.ts:16) matches adx-core/apps/workflow/vite.config.ts:9-10. `./App` (adx-core/apps/workflow/src/App.tsx:43) is loaded in adx-core/apps/shell/src/App.tsx:20 and mounted at `/workflows/*` (adx-core/apps/shell/src/App.tsx:52). Only `src/App.tsx`, absent exposes (adx-core/apps/workflow/vite.config.ts:13-15), `Undetermined` unit.

**6. adx-core/apps/shell → adx-core/apps/module.** `module_app` (adx-core/apps/shell/vite.config.ts:17) matches adx-core/apps/module/vite.config.ts:9-10. `./App` (adx-core/apps/module/src/App.tsx:54) is loaded in adx-core/apps/shell/src/App.tsx:21 and mounted at `/modules/*` (adx-core/apps/shell/src/App.tsx:53). Unlike the other incomplete remotes, `./App` itself imports absent components (adx-core/apps/module/src/App.tsx:10-12, `ModuleInstaller`, `ModuleSettings`, `ModuleDeveloper`), so the module loaded by the shell cannot be fully resolved in the snapshot; the relationship remains `Active = Yes` because the supporting source code review lines are `Yes`.

## Summary

Relationships: 6 (host → remote: 6). Active: 6. Target outside the snapshot: 0.
Units without a relationship: none.

