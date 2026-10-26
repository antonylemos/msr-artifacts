---
schema: 1
id: 1088828444
full_name: DATou-love/micro-frontEnd
commit: 8e52e7d4fee1bc193922a8bea0f5ede7a0cb9942
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

# 299 — DATou-love/micro-frontEnd

## Repository overview

qiankun example with two independent projects, without root `package.json` or workspace: Vue 3/Vite host `main-vue3` and Vue 2/Vue CLI sub-application `sub-vue2`. Each has its own `package.json`, `package-lock.json` and build script: `vue-tsc -b && vite build` in host (main-vue3/package.json:8) and `vue-cli-service build` in sub-app (sub-vue2/package.json:7). No script triggers both builds together.

Everything present is development configuration. Host runs Vite server on port 7100 with `cors: true` (main-vue3/vite.config.ts:8-11), the only `ops-*` occurrence in `matches.csv` (`ops-cors` at main-vue3/vite.config.ts:10), not a deployment artifact. Sub-app runs Vue CLI dev server on port 8081 with `Access-Control-Allow-Origin: *` (sub-vue2/vue.config.js:5-10) and generates a UMD bundle `subVue2` (sub-vue2/vue.config.js:12-20); `publicPath: '/sub-vue2/'` is commented out (sub-vue2/vue.config.js:22). Host points to sub-apps only through `localhost` addresses (main-vue3/src/main.ts:11-22). No Dockerfile, compose, CI workflow, proxy or hosting configuration is present in snapshot, and `matches.csv` has no `ci-*` or `cfg-public-path` occurrences.

Third unit registered by host, `sub-react16` (`//localhost:3000`, main-vue3/src/main.ts:17-22), has no snapshot code and is not a structural review row.

## Applications

| # | Application | Build | Deploy | Where served | Versioning | Artifacts |
|---|---|---|---|---|---|---|
| 1 | main-vue3 | separate | not observed | — | No | main-vue3/package.json:8 (`vue-tsc -b && vite build`); main-vue3/vite.config.ts:6-17 (own Vite configuration) |
| 2 | sub-vue2 | separate | not observed | — | No | sub-vue2/package.json:7 (`vue-cli-service build`); sub-vue2/vue.config.js:12-20 (bundle UMD `subVue2`) |

## Observations

**1. main-vue3.** Host has its own Vite build, generating its own artifact (main-vue3/package.json:8, main-vue3/vite.config.ts:6-17). No snapshot artifact packages or publishes this build; scripts `dev` and `preview` (main-vue3/package.json:7, main-vue3/package.json:9) and server on port 7100 (main-vue3/vite.config.ts:9) are for development, hence Deploy `not observed` and no publication address. The `version: "0.0.0"` (main-vue3/package.json:4) is unused in publication, and package is `private` (main-vue3/package.json:3).

**2. sub-vue2.** Sub-app has its own build with `vue-cli-service build` (sub-vue2/package.json:7), configured to output as UMD library `subVue2` with own `chunkLoadingGlobal` (sub-vue2/vue.config.js:15-18), as qiankun expects. Port 8081 (sub-vue2/vue.config.js:6), matching host `entry: '//localhost:8081'` (main-vue3/src/main.ts:13), belongs to dev server (`serve`, sub-vue2/package.json:6), so counts neither as deploy nor publication address. The `version: "0.1.0"` (sub-vue2/package.json:3) has no publication use, and package is `private` (sub-vue2/package.json:4).

## Summary

Applications: 2. Build (separate: 2). Deploy (not observed: 2). Independent versioning: 0.
