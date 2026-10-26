---
schema: 1
id: 1158060733
full_name: sharif7761/Micro-frontend-project-with-react-js
commit: cb2083fd77ddcb4d6493af653e0ce523ba0be010
inspection:
  output: data/inspections/mfe-dependencies-001
  version: "1"
  config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 234 — sharif7761/Micro-frontend-project-with-react-js

## Dependencies

| Manifest:line | Section | Package | Version | Technology | Configured | Evidence (artifact:line) |
|---|---|---|---|---|---|---|
| common_simple/package.json:16 | devDependencies | @module-federation/rsbuild-plugin | ^0.8.12 | module-federation | Yes | common_simple/rsbuild.config.ts:1 (`import { pluginModuleFederation } from '@module-federation/rsbuild-plugin'`); common_simple/rsbuild.config.ts:8-26 (the default Rsbuild configuration invokes `pluginModuleFederation` with `name: 'common_simple'`, exposes `./Button` and `./Card` and shared); common_simple/package.json:7-9 (dev, build and preview run `rsbuild` with no alternative configuration) |
| core_simple/package.json:17 | devDependencies | @module-federation/rsbuild-plugin | ^0.8.12 | module-federation | Yes | core_simple/rsbuild.config.ts:1 (`import { pluginModuleFederation } from '@module-federation/rsbuild-plugin'`); core_simple/rsbuild.config.ts:8-29 (the default Rsbuild configuration invokes `pluginModuleFederation` with `name: 'core_simple'`, remotes `common_simple` and `users_simple` and shared); core_simple/package.json:7-9 (dev, build and preview run `rsbuild` with no alternative configuration) |
| users_simple/package.json:17 | devDependencies | @module-federation/rsbuild-plugin | ^0.8.12 | module-federation | Yes | users_simple/rsbuild.config.ts:1 (`import { pluginModuleFederation } from '@module-federation/rsbuild-plugin'`); users_simple/rsbuild.config.ts:8-31 (the default Rsbuild configuration invokes `pluginModuleFederation` with `name: 'users_simple'`, `exposes: { './UserList': './src/App.tsx' }`, remote `common_simple` and shared); users_simple/package.json:7-9 (dev, build and preview run `rsbuild` with no alternative configuration) |
