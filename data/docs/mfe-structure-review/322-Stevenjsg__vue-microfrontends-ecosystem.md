---
schema: 1
id: 1106098608
full_name: Stevenjsg/vue-microfrontends-ecosystem
commit: 8501b8bd6e1d2491eb7838ae38b264a826f4c453
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 322 — Stevenjsg/vue-microfrontends-ecosystem

## Workspace

`pnpm-workspace.yaml:1-3` declares the packages `apps/*` and `packages/*` (pnpm workspaces); `turbo.json:3-13` defines Turborepo tasks `dev`, `build` and `lint` over this workspace.

## Units

| Directory | Markers | Manifest | Entry | Build | Workspace | Deploy | Frontend unit | Rationale |
|---|---|---|---|---|---|---|---|---|
| . | package.json | package.json:1-20 (root manifest, only devDependencies `concurrently` and `turbo`) | — | package.json:8 (`turbo build`, only delegates to workspace packages) | — | — | No | pnpm workspace root, with neither entry nor build configuration of its own. |
| apps/cms | apps/cms/package.json;apps/cms/vite.config.ts | apps/cms/package.json:1-26 (own manifest) | apps/cms/index.html:10-11 (`<div id="app">` and `<script type="module" src="/src/main.ts">`); apps/cms/src/main.ts:3-5 (`createApp(App).mount('#app')`) | apps/cms/vite.config.ts:6-32 (own Vite configuration, `federation` `cms_app` at :16-23, port 5002 at :8 and :12); apps/cms/package.json:8 (`vue-tsc -b && vite build`) | pnpm-workspace.yaml:2 (`apps/*`) | — | Yes | Vue 3 remote with its own UI-mounting entry and Vite build. |
| apps/dashboard | apps/dashboard/package.json;apps/dashboard/vite.config.ts | apps/dashboard/package.json:1-26 (own manifest) | apps/dashboard/index.html:10-11 (`<div id="app">` and `<script type="module" src="/src/main.ts">`); apps/dashboard/src/main.ts:3-5 (`createApp(App).mount('#app')`) | apps/dashboard/vite.config.ts:6-34 (own Vite configuration, `federation` `dashboard_app` at :18-25, port 5001 at :8 and :14); apps/dashboard/package.json:8 (`vue-tsc -b && vite build`) | pnpm-workspace.yaml:2 (`apps/*`) | — | Yes | Vue 3 remote with its own UI-mounting entry and Vite build. |
| apps/kanban | apps/kanban/package.json;apps/kanban/vite.config.ts | apps/kanban/package.json:1-26 (own manifest) | apps/kanban/index.html:10-11 (`<div id="app">` and `<script type="module" src="/src/main.ts">`); apps/kanban/src/main.ts:3-5 (`createApp(App).mount('#app')`) | apps/kanban/vite.config.ts:6-32 (own Vite configuration, `federation` `kanban_app` at :16-23, port 5003 at :8 and :12); apps/kanban/package.json:8 (`vue-tsc -b && vite build`) | pnpm-workspace.yaml:2 (`apps/*`) | — | Yes | Vue 3 remote with its own UI-mounting entry and Vite build. |
| apps/shell | apps/shell/package.json;apps/shell/vite.config.ts | apps/shell/package.json:1-26 (own manifest) | apps/shell/index.html:10-11 (`<div id="app">` and `<script type="module" src="/src/main.ts">`); apps/shell/src/main.ts:3-5 (`createApp(App).mount('#app')`) | apps/shell/vite.config.ts:7-35 (own Vite configuration, `federation` `shell` with `remotes` at :19-27, port 5000 at :9 and :13); apps/shell/package.json:8 (`vue-tsc -b && vite build`) | pnpm-workspace.yaml:2 (`apps/*`) | — | Yes | Vue 3 host with its own UI-mounting entry and Vite build. |
| packages/ui-kit | packages/ui-kit/package.json | packages/ui-kit/package.json:1-21 (own manifest, `@repo/ui-kit`) | — (packages/ui-kit/src/index.ts:1-4 only exports `MyButton` and `setupMsg`, with no application entry) | — (packages/ui-kit/package.json:5-7 has only the `lint` script) | pnpm-workspace.yaml:3 (`packages/*`) | — | No | Shared component library, with neither application entry nor build. |

## Summary

Frontend applications in the snapshot: 4 (apps/cms, apps/dashboard, apps/kanban, apps/shell).

## Notes

- N = 4 matches the classification’s `frontend_units: 4`.
- The only `ops-*` occurrence in `matches.csv` is `ops-cors` in `apps/dashboard/vite.config.ts:10` (`cors: true` for the development server), which is not a deployment artifact. There is no Dockerfile, CI workflow or hosting configuration in the snapshot.
- `packages/ui-kit/package.json:4` declares `"main": "index.ts"`, a file missing at the package root; the shell imports through the path `@repo/ui-kit/src/index.ts` (`apps/shell/src/App.vue:3`). This does not change the row’s answer, which is already `No`.
