---
schema: 1
id: 1106098608
full_name: Stevenjsg/vue-microfrontends-ecosystem
commit: 8501b8bd6e1d2491eb7838ae38b264a826f4c453
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

# 322 — Stevenjsg/vue-microfrontends-ecosystem

## Repository overview

A Module Federation demonstration with Vue 3 and Vite (`@originjs/vite-plugin-federation`), in a pnpm + Turborepo monorepo (README.mkd:1-9; package.json:6-10). `apps/shell` is the host. It declares three remotes, `dashboard`, `cms` and `kanban`, with URLs `http://localhost:500N/assets/remoteEntry.js` (apps/shell/vite.config.ts:19-27). Each remote generates a `remoteEntry.js` and exposes a component: `./Widget` in apps/dashboard (apps/dashboard/vite.config.ts:18-25), `./Cms` in apps/cms (apps/cms/vite.config.ts:16-23) and `./Kanban` in apps/kanban (apps/kanban/vite.config.ts:16-23). All four share `vue`.

Only one of the three connections reaches code. The shell's root component loads `dashboard/Widget` with `defineAsyncComponent` (apps/shell/src/App.vue:5-7) and renders it inside `<Suspense>`, with fallback "Cargando microfrontend..." (English translation: "Loading microfrontend...") (apps/shell/src/App.vue:21-28). No shell code imports `cms/...` or `kanban/...`, so those two remotes remain only declared in configuration; their exposures have no consumer. The README says applications share "diseño, lógica y estado" (English translation: "design, logic and state") (README.mkd:5), but the snapshot has no message exchange or shared state between units. What the shell actually shares is library `packages/ui-kit`, imported by workspace path (apps/shell/src/App.vue:3, :14-15). It is not a unit in the structural review, so does not enter as a relationship.

## Relationships

| # | Source | Target | Type | Direction | Mechanism | In snapshot | Active | Configuration | Code |
|---|---|---|---|---|---|---|---|---|---|
| 1 | apps/shell | apps/dashboard | host → remote | source → target | module-federation | Yes | Yes | apps/shell/vite.config.ts:22 (remote `dashboard` at `http://localhost:5001/assets/remoteEntry.js`); apps/dashboard/vite.config.ts:19-23 (`name: "dashboard_app"`, `filename: "remoteEntry.js"`, exposes `./Widget`); apps/dashboard/vite.config.ts:8 (port 5001) | apps/shell/src/App.vue:6; apps/shell/src/App.vue:23 |
| 2 | apps/shell | apps/cms | host → remote | source → target | module-federation | Yes | No | apps/shell/vite.config.ts:23 (remote `cms` at `http://localhost:5002/assets/remoteEntry.js`); apps/cms/vite.config.ts:17-21 (`name: "cms_app"`, `filename: "remoteEntry.js"`, exposes `./Cms`); apps/cms/vite.config.ts:8 (port 5002) | — |
| 3 | apps/shell | apps/kanban | host → remote | source → target | module-federation | Yes | No | apps/shell/vite.config.ts:24 (remote `kanban` at `http://localhost:5003/assets/remoteEntry.js`); apps/kanban/vite.config.ts:17-21 (`name: "kanban_app"`, `filename: "remoteEntry.js"`, exposes `./Kanban`); apps/kanban/vite.config.ts:8 (port 5003) | — |

## Observations

**1. apps/shell → apps/dashboard.** Specifier `dashboard/Widget` (apps/shell/src/App.vue:6) uses the remote key declared in apps/shell/vite.config.ts:22. The key differs from the remote's `name: "dashboard_app"` (apps/dashboard/vite.config.ts:19). The match comes from the requested file, `remoteEntry.js` declared in apps/dashboard/vite.config.ts:20, and exposed module `./Widget` (apps/dashboard/vite.config.ts:21-23, `./src/components/WidgetDinero.vue`). Port 5001 (apps/dashboard/vite.config.ts:8) only corroborates. The dashboard development server also points to the shell as origin (`origin: "http://localhost:5000"`, apps/dashboard/vite.config.ts:11). Both constructs are `Yes`: `App.vue` with `<DashboardWidget />` (apps/shell/src/App.vue:23) is the root component mounted by the shell entry point (apps/shell/src/main.ts:3-5). The shell manually declares the remote module's type (apps/shell/src/vite-env.d.ts:3-7). The exposed widget has only local state, a balance counter (apps/dashboard/src/components/WidgetDinero.vue:1-19).

**2. apps/shell → apps/cms.** Remote `cms` (apps/shell/vite.config.ts:23) matches apps/cms through `remoteEntry.js` declared in apps/cms/vite.config.ts:18. Key `cms` is also the directory name, and the remote's `name` is `cms_app` (apps/cms/vite.config.ts:17). Port 5002 (apps/cms/vite.config.ts:8) only corroborates. No code imports `cms/Cms`, so the relationship exists only in configuration (Active `No`). The exposed module is the remote's entire `App.vue` (apps/cms/vite.config.ts:20).

**3. apps/shell → apps/kanban.** Same case as relationship 2. Remote `kanban` (apps/shell/vite.config.ts:24) matches apps/kanban through `remoteEntry.js` (apps/kanban/vite.config.ts:18), with the key equaling the directory name and `name: "kanban_app"` (apps/kanban/vite.config.ts:17). Port 5003 (apps/kanban/vite.config.ts:8) only corroborates. Exposure `./Kanban` (apps/kanban/vite.config.ts:20) has no consumer in code, so the relationship is Active `No`.

## Summary

Relationships: 3 (host → remote: 3). Active: 1. Target outside the snapshot: 0.
Units without a relationship: none.

