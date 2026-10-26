---
schema: 1
id: 1253620135
full_name: victorlmneves/_nuxt-monorepo-mfe-platform
commit: 84ffc2429b311b3c7565ffd35de4de48dafd5929
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 096 — victorlmneves/_nuxt-monorepo-mfe-platform

## Workspace

`pnpm-workspace.yaml:1-3` declares the packages `apps/*` and `packages/*` (pnpm workspaces); `turbo.json:3-18` defines Turborepo tasks over this workspace.

## Units

| Directory | Markers | Manifest | Entry | Build | Workspace | Deploy | Frontend unit | Rationale |
|---|---|---|---|---|---|---|---|---|
| . | package.json | package.json:1-52 (root manifest, only tooling devDependencies) | — | package.json:19 (`turbo run build`, only delegates to workspace packages) | — | — | No | pnpm workspace root, with neither entry nor build configuration of its own. |
| apps/mfe-vue2-admin | apps/mfe-vue2-admin/package.json;apps/mfe-vue2-admin/webpack.config.js | apps/mfe-vue2-admin/package.json:1-32 (own manifest) | apps/mfe-vue2-admin/webpack.config.js:9 (`entry: './src/index.js'`); apps/mfe-vue2-admin/src/index.js:1-8 (`import('./bootstrap')` and `mount` at `#mfe-app`); apps/mfe-vue2-admin/src/bootstrap.js:32-38 (`new Vue(...)` with `h(App)` and `.$mount(el)`); apps/mfe-vue2-admin/webpack.config.js:52-54 (`HtmlWebpackPlugin` with `./public/index.html`) | apps/mfe-vue2-admin/webpack.config.js:8-79 (own webpack configuration, `ModuleFederationPlugin` `mfe_admin` at :64-71, port 3002 at :75); apps/mfe-vue2-admin/package.json:7 (`webpack --config webpack.config.js --mode production`) | pnpm-workspace.yaml:2 (`apps/*`) | — | Yes | Vue 2 remote with its own UI-mounting entry and webpack build. |
| apps/mfe-vue2-checkout | apps/mfe-vue2-checkout/package.json;apps/mfe-vue2-checkout/webpack.config.js | apps/mfe-vue2-checkout/package.json:1-33 (own manifest) | apps/mfe-vue2-checkout/webpack.config.js:9 (`entry: './src/index.js'`); apps/mfe-vue2-checkout/src/index.js:5-18 (`import('./bootstrap')` and `mount` at `#mfe-app`); apps/mfe-vue2-checkout/src/bootstrap.js:40-46 (`new Vue(...)` with `h(App)` and `.$mount(el)`); apps/mfe-vue2-checkout/webpack.config.js:54-58 (`HtmlWebpackPlugin` with `./public/index.html`) | apps/mfe-vue2-checkout/webpack.config.js:8-81 (own webpack configuration, `ModuleFederationPlugin` `mfe_checkout` at :66-73, port 3001 at :77); apps/mfe-vue2-checkout/package.json:7 (`webpack --config webpack.config.js --mode production`) | pnpm-workspace.yaml:2 (`apps/*`) | — | Yes | Vue 2 remote with its own UI-mounting entry and webpack build. |
| apps/mfe-vue3-dashboard | apps/mfe-vue3-dashboard/package.json;apps/mfe-vue3-dashboard/webpack.config.js | apps/mfe-vue3-dashboard/package.json:1-32 (own manifest) | apps/mfe-vue3-dashboard/webpack.config.js:8 (`entry: './src/index.js'`); apps/mfe-vue3-dashboard/src/index.js:1-8 (`import('./bootstrap')` and `mount` at `#mfe-app`); apps/mfe-vue3-dashboard/src/bootstrap.js:31-33 (`createApp(App, ...)` and `app.mount(el)`); apps/mfe-vue3-dashboard/webpack.config.js:47-49 (`HtmlWebpackPlugin` with `./public/index.html`) | apps/mfe-vue3-dashboard/webpack.config.js:7-69 (own webpack configuration, `ModuleFederationPlugin` `mfe_dashboard` at :53-61, port 3004 at :65); apps/mfe-vue3-dashboard/package.json:7 (`webpack --config webpack.config.js --mode production`) | pnpm-workspace.yaml:2 (`apps/*`) | — | Yes | Vue 3 remote with its own UI-mounting entry and webpack build. |
| apps/mfe-vue3-profile | apps/mfe-vue3-profile/package.json;apps/mfe-vue3-profile/webpack.config.js | apps/mfe-vue3-profile/package.json:1-32 (own manifest) | apps/mfe-vue3-profile/webpack.config.js:8 (`entry: './src/index.js'`); apps/mfe-vue3-profile/src/index.js:1-8 (`import('./bootstrap')` and `mount` at `#mfe-app`); apps/mfe-vue3-profile/src/bootstrap.js:38-40 (`createApp(App, ...)` and `app.mount(el)`); apps/mfe-vue3-profile/webpack.config.js:47-49 (`HtmlWebpackPlugin` with `./public/index.html`) | apps/mfe-vue3-profile/webpack.config.js:7-69 (own webpack configuration, `ModuleFederationPlugin` `mfe_profile` at :53-61, port 3003 at :65); apps/mfe-vue3-profile/package.json:7 (`webpack --config webpack.config.js --mode production`) | pnpm-workspace.yaml:2 (`apps/*`) | — | Yes | Vue 3 remote with its own UI-mounting entry and webpack build. |
| apps/shell | apps/shell/package.json | apps/shell/package.json:1-35 (own manifest) | apps/shell/app.vue:1-5 (Nuxt root with `<NuxtPage />`, Nuxt convention); pages per route in apps/shell/pages/index.vue:1-3 and apps/shell/pages/app/[...mfe].vue:2-3 | apps/shell/nuxt.config.ts:58-91 (`defineNuxtConfig` with `ssr: true` and modules); apps/shell/package.json:7 (`nuxt build`) | pnpm-workspace.yaml:2 (`apps/*`) | — | Yes | Nuxt 3 host with its own conventional entry and Nuxt build. |
| packages/shared | packages/shared/package.json | packages/shared/package.json:1-11 (own manifest) | — (packages/shared/package.json:5-10 exports `./src/index.ts`, `./auth` and `./types`, with no application entry) | — | pnpm-workspace.yaml:3 (`packages/*`) | — | No | Shared package of types, authentication events and registry, with no application entry. |
| scripts | scripts/webpack.aliases.js | — | — | — | — | — | No | Build and development utilities (webpack aliases, dist server, health check), not frontend. |

## Summary

Frontend applications in the snapshot: 5 (apps/mfe-vue2-admin, apps/mfe-vue2-checkout, apps/mfe-vue3-dashboard, apps/mfe-vue3-profile, apps/shell).

## Notes

- The count matches the classification’s `frontend_units: 5` (shell plus four remotes); no unit is outside the snapshot.
- `scripts/webpack.aliases.js:13-17` is imported by the four `webpack.config.js` files (for example, apps/mfe-vue2-checkout/webpack.config.js:4); marking `scripts` as a candidate comes from this auxiliary configuration file.
- Deploy: there is no Dockerfile, CI workflow or hosting configuration in the snapshot. The `ops-cors` occurrences (for example, apps/mfe-vue2-checkout/webpack.config.js:79) are in `devServer`, and the scripts in package.json:26-29 serve each `dist` locally with scripts/dev-remote-server.js; none is a separate deployment artifact.
- The remotes’ `src/index.js` entry is standalone development execution (apps/mfe-vue2-checkout/src/index.js:1-3); the shell loads `./App` → `src/bootstrap.js` exposed by `ModuleFederationPlugin`. Both go through the same `mount` that starts the UI.
