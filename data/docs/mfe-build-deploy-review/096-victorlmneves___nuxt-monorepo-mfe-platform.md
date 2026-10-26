---
schema: 1
id: 1253620135
full_name: victorlmneves/_nuxt-monorepo-mfe-platform
commit: 84ffc2429b311b3c7565ffd35de4de48dafd5929
inputs:
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

## Repository overview

pnpm monorepo (pnpm-workspace.yaml:1-3) orchestrated by Turborepo. Root `build` script is `turbo run build` (package.json:19-20), triggering `build` for each workspace package; Turborepo `build` task declares outputs `.output/**`, `.nuxt/**` and `dist/**` (turbo.json:8-11), ignored by git (.gitignore:5-13). Each Vue remote has its own `webpack --config webpack.config.js --mode production` (for example apps/mfe-vue2-checkout/package.json:7), generating its own `dist/` with `remoteEntry.js` (apps/mfe-vue2-checkout/webpack.config.js:11-16, :66-69). Nuxt shell has `nuxt build` and `start: node .output/server/index.mjs` (apps/shell/package.json:7-8). All four `webpack.config.js` files import aliases from scripts/webpack.aliases.js:13-17, pointing `@mfe/shared` to source code in `packages/shared`; this package has no own build and enters the bundle of each application using it.

No deployment artifact is present in the snapshot: no Dockerfile, compose, CI workflow, deployment manifest, hosting configuration or proxy. Existing artifacts are for local execution. scripts/start-local.sh:18-22 starts all five development servers in parallel, with addresses `localhost:3000` to `3004` listed in scripts/start-local.sh:9-13. The `dev:remote:*` scripts (package.json:26-30) serve each remote’s already-built `dist/` on its own port through a static server with CORS (scripts/dev-remote-server.js:32-53), described as useful for running shell in development against prebuilt remotes (scripts/dev-remote-server.js:4-6). scripts/health-check.js:14-19 queries each remote’s `remoteEntry.js`, with URLs replaceable through environment variables, and its comment says it should run before starting shell "in production/CI" (scripts/health-check.js:5), but no snapshot artifact calls it or publishes applications. README only records `pnpm build:all` (README.md:99-103).

All `matches.csv` occurrences come from remote webpack configuration: all four `cfg-public-path` occurrences are fixed `output.publicPath` at `http://localhost:300x/` (apps/mfe-vue2-admin/webpack.config.js:14; apps/mfe-vue2-checkout/webpack.config.js:14; apps/mfe-vue3-dashboard/webpack.config.js:13; apps/mfe-vue3-profile/webpack.config.js:13), and all four `ops-cors` occurrences are the `Access-Control-Allow-Origin` header of `devServer` (apps/mfe-vue2-admin/webpack.config.js:77; apps/mfe-vue2-checkout/webpack.config.js:79; apps/mfe-vue3-dashboard/webpack.config.js:67; apps/mfe-vue3-profile/webpack.config.js:67). No `ci-*` occurrence is present. Fixed `publicPath` at `localhost` enters production build, whereas shell registry only allows replacing the `remoteEntry.js` URL through an environment variable (packages/shared/src/registry.ts:3-9), as already recorded in the composition review. Overall this is a demonstration and development configuration, without publication in the snapshot.

## Applications

| # | Application | Build | Deploy | Where served | Versioning | Artifacts |
|---|---|---|---|---|---|---|
| 1 | apps/mfe-vue2-admin | separate | not observed | `http://localhost:3002/` (apps/mfe-vue2-admin/webpack.config.js:14, :75; package.json:27) | No | apps/mfe-vue2-admin/webpack.config.js:8-79 (own webpack configuration, output `dist`, `ModuleFederationPlugin` `mfe_admin` with `remoteEntry.js`); apps/mfe-vue2-admin/package.json:7 (`webpack --mode production`); package.json:19 (`turbo run build`) |
| 2 | apps/mfe-vue2-checkout | separate | not observed | `http://localhost:3001/` (apps/mfe-vue2-checkout/webpack.config.js:14, :77; package.json:26) | No | apps/mfe-vue2-checkout/webpack.config.js:8-81 (own webpack configuration, output `dist`, `ModuleFederationPlugin` `mfe_checkout` with `remoteEntry.js`); apps/mfe-vue2-checkout/package.json:7 (`webpack --mode production`); package.json:19 (`turbo run build`) |
| 3 | apps/mfe-vue3-dashboard | separate | not observed | `http://localhost:3004/` (apps/mfe-vue3-dashboard/webpack.config.js:13, :65; package.json:29) | No | apps/mfe-vue3-dashboard/webpack.config.js:7-69 (own webpack configuration, output `dist`, `ModuleFederationPlugin` `mfe_dashboard` with `remoteEntry.js`); apps/mfe-vue3-dashboard/package.json:7 (`webpack --mode production`); package.json:19 (`turbo run build`) |
| 4 | apps/mfe-vue3-profile | separate | not observed | `http://localhost:3003/` (apps/mfe-vue3-profile/webpack.config.js:13, :65; package.json:28) | No | apps/mfe-vue3-profile/webpack.config.js:7-69 (own webpack configuration, output `dist`, `ModuleFederationPlugin` `mfe_profile` with `remoteEntry.js`); apps/mfe-vue3-profile/package.json:7 (`webpack --mode production`); package.json:19 (`turbo run build`) |
| 5 | apps/shell | separate | not observed | `http://localhost:3000` in development (apps/shell/package.json:6; scripts/start-local.sh:9) | No | apps/shell/nuxt.config.ts:58-91 (own Nuxt configuration, `ssr: true`); apps/shell/package.json:7-8 (`nuxt build`, `start` of server `.output`); turbo.json:8-11 (outputs `.output/**`, `.nuxt/**`); package.json:19 (`turbo run build`) |

## Observations

**1. apps/mfe-vue2-admin.** Build `separate`: own `webpack --mode production` (apps/mfe-vue2-admin/package.json:7) uses application configuration, with output in `apps/mfe-vue2-admin/dist` (apps/mfe-vue2-admin/webpack.config.js:11-16) and container `mfe_admin` in `remoteEntry.js` (apps/mfe-vue2-admin/webpack.config.js:64-71); root `turbo run build` only triggers this build. Code from `packages/shared` enters bundle through aliases (apps/mfe-vue2-admin/webpack.config.js:4), but is not an application. Deploy `not observed`: the only server of `dist` is `dev:remote:admin` on port 3002 (package.json:27), a development script, and port 3002 of `devServer` (apps/mfe-vue2-admin/webpack.config.js:74-78) is also for development. Address `http://localhost:3002/` comes from fixed `publicPath` (apps/mfe-vue2-admin/webpack.config.js:14), matching shell registry’s default URL. Version `1.0.0` in a `private` package (apps/mfe-vue2-admin/package.json:3-4), unused in publication: Versioning `No`.

**2. apps/mfe-vue2-checkout.** Same arrangement as application 1: own build (apps/mfe-vue2-checkout/package.json:7) with output `dist` and container `mfe_checkout` (apps/mfe-vue2-checkout/webpack.config.js:11-16, :66-73), served locally by `dev:remote:checkout` on port 3001 (package.json:26) or by `devServer` (apps/mfe-vue2-checkout/webpack.config.js:76-80). No artifact publishes `dist`. Version `1.0.0` of a `private` package unused (apps/mfe-vue2-checkout/package.json:3-4).

**3. apps/mfe-vue3-dashboard.** Vue 3 remote with the same structure: own build (apps/mfe-vue3-dashboard/package.json:7), output `dist` and container `mfe_dashboard` (apps/mfe-vue3-dashboard/webpack.config.js:10-15, :53-61), served locally on port 3004 by `dev:remote:dashboard` (package.json:29) or by `devServer` (apps/mfe-vue3-dashboard/webpack.config.js:64-68). Deploy `not observed`; version `1.0.0` of a `private` package unused (apps/mfe-vue3-dashboard/package.json:3-4).

**4. apps/mfe-vue3-profile.** Same as application 3: own build (apps/mfe-vue3-profile/package.json:7), output `dist` and container `mfe_profile` (apps/mfe-vue3-profile/webpack.config.js:10-15, :53-56), served locally on port 3003 by `dev:remote:profile` (package.json:28) or by `devServer` (apps/mfe-vue3-profile/webpack.config.js:64-68). Deploy `not observed`; version `1.0.0` of a `private` package unused (apps/mfe-vue3-profile/package.json:3-4).

**5. apps/shell.** Build `separate`: `nuxt build` (apps/shell/package.json:7) generates shell-only `.output` (turbo.json:10); no remote enters it, because shell does not import remotes and loads them at runtime through `remoteEntry.js` (apps/shell/nuxt.config.ts:64-66). With `ssr: true` (apps/shell/nuxt.config.ts:59), shell is a Node server, started by `start` (apps/shell/package.json:8; package.json:21). This script runs the built server, but does not package or publish application, and no snapshot artifact uses it in deployment: Deploy `not observed`. The only snapshot address is port 3000 of `nuxt dev` (apps/shell/package.json:6), repeated in scripts/start-local.sh:9. Version `1.0.0` of a `private` package unused (apps/shell/package.json:3-4).

## Summary

Applications: 5. Build (separate: 5). Deploy (not observed: 5). Independent versioning: 0.
