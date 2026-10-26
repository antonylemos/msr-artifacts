---
schema: 1
id: 1350705751
full_name: karthik5656/Catalog.App
commit: 1982e0f3dae5a8508d354f9db91a089ba96d4bd6
inspection:
  output: data/inspections/mfe-dependencies-001
  version: "1"
  config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 332 — karthik5656/Catalog.App

## Dependencies

| Manifest:line | Section | Package | Version | Technology | Configured | Evidence (artifact:line) |
|---|---|---|---|---|---|---|
| src/frontend/apps/ui-catalog-consumer/package.json:13 | dependencies | @originjs/vite-plugin-federation | ^1.4.1 | module-federation | Yes | src/frontend/apps/ui-catalog-consumer/vite.config.ts:5 (`import federation from "@originjs/vite-plugin-federation"`); src/frontend/apps/ui-catalog-consumer/vite.config.ts:16-23 (`federation({ name: "consumerApp", filename: "remoteEntry.js", exposes: { "./App": "./src/App" }, shared })`); src/frontend/apps/ui-catalog-consumer/package.json:8 (the build runs `vite build`, which reads the default configuration `vite.config.ts`) |
| src/frontend/apps/ui-catalog-merchant/package.json:13 | dependencies | @originjs/vite-plugin-federation | ^1.4.1 | module-federation | Yes | src/frontend/apps/ui-catalog-merchant/vite.config.ts:5 (`import federation from "@originjs/vite-plugin-federation"`); src/frontend/apps/ui-catalog-merchant/vite.config.ts:16-23 (`federation({ name: "consumerApp", filename: "remoteEntry.js", exposes: { "./App": "./src/App" }, shared })`); src/frontend/apps/ui-catalog-merchant/package.json:8 (the build runs `vite build`, which reads the default configuration `vite.config.ts`) |
| src/frontend/apps/ui-catalog/package.json:13 | dependencies | @originjs/vite-plugin-federation | ^1.4.1 | module-federation | Yes | src/frontend/apps/ui-catalog/vite.config.ts:5 (`import federation from '@originjs/vite-plugin-federation'`); src/frontend/apps/ui-catalog/vite.config.ts:85-89 (`federation({ name: 'app', remotes: federationRemotes, shared })`, with `federationRemotes` assembled from `remotes.json` in `:10-17`); src/frontend/apps/ui-catalog/package.json:8 (the build runs `tsc -noemit && vite build`, which reads the default configuration `vite.config.ts`) |

## Notes

- The `grep` for `@originjs/vite-plugin-federation` outside lockfiles finds only the three `package.json:13` and three `vite.config.ts:5` files; there is no use in application code.
- Both remotes declare themselves as `name: "consumerApp"` (`ui-catalog-merchant/vite.config.ts:17` and `ui-catalog-consumer/vite.config.ts:17`), as already recorded in the classification. This does not change the judgment: in each one the plugin is imported, invoked and used by the build.

