---
schema: 1
id: 1131085284
full_name: marcos-roberto-dev/poc-mfe-custom-root
commit: 6ae6565dc49a391729b62588c5fccf37d2be104b
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 254 — marcos-roberto-dev/poc-mfe-custom-root

## Workspace

No workspace declaration.

## Units

| Directory | Markers | Manifest | Entry | Build | Workspace | Deploy | Frontend unit | Rationale |
|---|---|---|---|---|---|---|---|---|
| content-app | content-app/index.html;content-app/package.json;content-app/vite.config.ts | content-app/package.json | content-app/index.html:11 (`<script type="module" src="/src/main.ts">`, Vite entry); content-app/src/main.ts:8-22 (`singleSpaVue({ createApp, appOptions: { render() { return h(App) } } })` and exported lifecycles) | content-app/vite.config.ts:1-7 + content-app/package.json:8 (`"build": "vue-tsc -b && vite build"`) | — | — | Yes | single-spa Vue application with its own entry and Vite build. |
| root-app | root-app/index.html;root-app/package.json;root-app/vite.config.ts | root-app/package.json | root-app/index.html:43 (`<script type="module" src="/src/main.ts">`, Vite entry); root-app/src/main.ts:5 (`createApp(App).mount('#app')`) | root-app/vite.config.ts:1-7 + root-app/package.json:8 (`"build": "vue-tsc -b && vite build"`) | — | — | Yes | Vue host with its own entry and Vite build. |
| root-classic | root-classic/package.json;root-classic/webpack.config.js | root-classic/package.json | root-classic/webpack.config.js:7-9 (`singleSpaDefaults({ orgName, projectName: "root-config", ... })`, `src/org-root-config.ts` entry by `webpack-config-single-spa-ts` convention); root-classic/webpack.config.js:18-20 (`HtmlWebpackPlugin` with `template: "src/index.ejs"`); root-classic/src/org-root-config.ts:9-20 (registers applications, activates the layout and calls `start()`) | root-classic/webpack.config.js:1-28 + root-classic/package.json:10-11 (`"build": "concurrently npm:build:*"`, `"build:webpack": "webpack --mode=production"`) | — | — | Yes | single-spa root config with its own entry and webpack build. |
| topbar-app | topbar-app/index.html;topbar-app/package.json;topbar-app/vite.config.ts | topbar-app/package.json | topbar-app/index.html:11 (`<script type="module" src="/src/main.ts">`, Vite entry); topbar-app/vite.config.ts:10 (`input: 'src/main.ts'`); topbar-app/src/main.ts:8-22 (`singleSpaVue(...)` and exported lifecycles) | topbar-app/vite.config.ts:8-19 (`rollupOptions` with `format: "system"` and `entryFileNames: 'app.js'`) + topbar-app/package.json:8 (`"build": "vue-tsc -b && vite build"`) | — | — | Yes | single-spa Vue application with its own entry and Vite build. |

## Summary

Frontend applications in the snapshot: 4 (content-app, root-app, root-classic, topbar-app).

## Notes

- The count matches the classification’s `frontend_units: 4` (two alternative hosts and two remotes).
- There is no `package.json` at the root; the `package.json` and `tsconfig*.json` files marked as `workspace-config` in `artifacts.csv` declare neither `workspaces` nor projects, and there are no `ws-*`, `ops-*` or `ci-*` occurrences in `matches.csv`. There is no Dockerfile, CI or hosting configuration in the snapshot; `root-classic/.husky/pre-commit:4` only runs formatting, tests and lint.
- In the remotes, `content-app/src/main.ts:6` and `topbar-app/src/main.ts:6` leave `createApp(App).mount('#app')` commented out: the entry only exports lifecycles and does not mount the UI on its own. The entry starts the UI when a host calls `mount`, as in the single-spa remotes in other reviews.
- `root-app/src/modules/Topbar/` has a copy of topbar without `package.json` or build and is not in `units.csv`; its import is commented out (`root-app/src/App.vue:3` and `7`). It is part of `root-app` and is not a missing unit.
