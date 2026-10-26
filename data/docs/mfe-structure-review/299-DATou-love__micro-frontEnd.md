---
schema: 1
id: 1088828444
full_name: DATou-love/micro-frontEnd
commit: 8e52e7d4fee1bc193922a8bea0f5ede7a0cb9942
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 299 — DATou-love/micro-frontEnd

## Workspace

No workspace declaration.

## Units

| Directory | Markers | Manifest | Entry | Build | Workspace | Deploy | Frontend unit | Rationale |
|---|---|---|---|---|---|---|---|---|
| main-vue3 | main-vue3/index.html;main-vue3/package.json;main-vue3/vite.config.ts | main-vue3/package.json:1-24 (own manifest) | main-vue3/index.html:10-11 (`<div id="app">` and `<script type="module" src="/src/main.ts">`, Vite entry); main-vue3/src/main.ts:6-7 and main-vue3/src/main.ts:38 (creates and mounts the Vue 3 app) | main-vue3/vite.config.ts:6-17 (own configuration) + main-vue3/package.json:8 (`"build": "vue-tsc -b && vite build"`) | — | — | Yes | Vue 3 host with its own HTML entry and Vite build. |
| sub-vue2 | sub-vue2/package.json | sub-vue2/package.json:1-44 (own manifest) | sub-vue2/src/main.js:10-17 and sub-vue2/src/main.js:27-29 (`src/main.js` entry by Vue CLI convention; mounts the Vue 2 app outside qiankun); sub-vue2/public/index.html:17 (`<div id="app">`, Vue CLI HTML template) | sub-vue2/vue.config.js:3-23 (`defineConfig` with `configureWebpack`) + sub-vue2/package.json:7 (`"build": "vue-cli-service build"`) | — | — | Yes | Vue 2 sub-app with its own entry and `vue-cli-service` build. |

## Summary

Frontend applications in the snapshot: 2 (main-vue3, sub-vue2).

## Notes

- The classification records `frontend_units: 3`; the third unit, `sub-react16` (`main-vue3/src/main.ts:17-22`, `entry: '//localhost:3000'`), has no code in the snapshot and is therefore not a row.
- There is no `package.json` at the root; the `package.json` files marked as `workspace-config` in `artifacts.csv` have no `workspaces` field.
- The only `ops-*` occurrence in `matches.csv` is `ops-cors` in `main-vue3/vite.config.ts:10` (`cors: true` for the development server), which is not a deployment artifact. There is no Dockerfile, CI or hosting configuration in the snapshot.
