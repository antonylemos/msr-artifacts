---
schema: 1
id: 985556796
full_name: dvreddy007/mfe-sample
commit: d4cef45fce1d97c3d4d80d232dc9e9fbad9cfd1a
inspection:
  output: data/inspections/mfe-dependencies-001
  version: "1"
  config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 245 — dvreddy007/mfe-sample

## Dependencies

| Manifest:line | Section | Package | Version | Technology | Configured | Evidence (artifact:line) |
|---|---|---|---|---|---|---|
| package.json:12 | devDependencies | lerna | ^8.1.9 | monorepo-tool | Undetermined | lerna.json:1-4 (only `$schema` and `version: "0.0.0"`); the only invocation of `lerna` is in the script in package.json:8 (`dev`: `lerna run dev`), which does not count as use; package.json:4-6 (`workspaces`, matched by the inspection) is an npm feature, not a lerna feature; .github/workflows/main_vdumpavue3.yml:26-30 runs `npm install` and `npm run build --if-present` at the root, without calling `lerna` (grep, excluding the lockfile) |
| packages/app-1/package.json:16 | devDependencies | @module-federation/vite | ^1.2.2 | module-federation | Yes | packages/app-1/vite.config.js:3 and 9-16 (`federation({ name: 'app1', filename: 'remoteEntry.js', exposes: { './entry': './src/entry.js' }, shared: ['vue'] })` in `plugins`); packages/app-1/package.json:7-8 (`vite` and `vite build` use the default configuration) |
| packages/app-2/package.json:16 | devDependencies | @module-federation/vite | ^1.2.2 | module-federation | Yes | packages/app-2/vite.config.js:3 and 9-16 (`federation({ name: 'app2', filename: 'remoteEntry.js', exposes: { './entry': './src/entry.js' }, shared: ['vue'] })` in `plugins`); packages/app-2/package.json:7-8 (`vite` and `vite build` use the default configuration) |
| packages/host/package.json:18 | devDependencies | @module-federation/runtime | ^0.8.9 | module-federation | Yes | packages/host/src/plugins/federationPlugin.js:1 (`import { init, loadRemote as _loadRemote } from '@module-federation/runtime'`); packages/host/src/plugins/federationPlugin.js:15-18 and 29 (`init({ name: 'host', remotes: mfRemotes })` and `_loadRemote(`${module}/entry`)`); packages/host/src/main.js:5 and 15 (`app.use(federationPlugin, getRemotes())`); packages/host/src/components/Loader.vue:8 and 70 (`moduleFederation.loadRemote(mfeConfig.module)`), component for all routes (packages/host/src/router/index.js:11); packages/host/index.html:11 (entry point `/src/main.js`) |
| packages/host/package.json:19 | devDependencies | @module-federation/vite | ^1.2.2 | module-federation | Yes | packages/host/vite.config.js:3 and 10-14 (`federation({ name: 'host', filename: 'remoteEntry.js', shared: ['vue'] })` in `plugins`, without `remotes` defined statically); packages/host/package.json:7-8 (`vite` and `vite build` use the default configuration) |

## Notes

- `lerna`: follows 096 and 128 (configuration present, invocation only in a script). The `lerna.json` here is minimal; the inspection match in `package.json:4` is npm's `workspaces` block.
- `@module-federation/runtime`: the `Loader.vue:70` and `:96` occurrences in `same_package_matches` are calls to local functions named `loadRemote` (the `useModuleFederation` wrapper and the component's own function), not directly to the package; package use is in `federationPlugin.js`, which those excerpts call.
- The host uses the Vite plugin only with `shared`; remotes are registered at runtime by `init`, from `packages/host/src/routeManifest.js:1-35`.

