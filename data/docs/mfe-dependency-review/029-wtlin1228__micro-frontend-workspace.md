---
schema: 1
id: 1043597864
full_name: wtlin1228/micro-frontend-workspace
commit: 9b81d2c5b6156084e0e9a4a3ecfdd89494d0b692
inspection:
  output: data/inspections/mfe-dependencies-001
  version: "1"
  config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-19
---

# 029 — wtlin1228/micro-frontend-workspace

## Dependencies

| Manifest:line | Section | Package | Version | Technology | Configured | Evidence (artifact:line) |
|---|---|---|---|---|---|---|
| packages/app-mf-1/package.json:17 | devDependencies | @module-federation/rsbuild-plugin | ^0.18.3 | module-federation | Yes | packages/app-mf-1/rsbuild.config.ts:1-11 (the default Rsbuild build configuration imports and invokes `pluginModuleFederation`); packages/app-mf-1/module-federation.config.ts:1-13 (`createModuleFederationConfig` configures exposes and shared); packages/app-mf-1/package.json:5-8 (Rsbuild build) |
| packages/app-mf-2/package.json:17 | devDependencies | @module-federation/rsbuild-plugin | ^0.18.3 | module-federation | Yes | packages/app-mf-2/rsbuild.config.ts:1-11 (the default Rsbuild build configuration imports and invokes `pluginModuleFederation`); packages/app-mf-2/module-federation.config.ts:1-13 (`createModuleFederationConfig` configures exposes and shared); packages/app-mf-2/package.json:5-8 (Rsbuild build) |
| packages/host/package.json:11 | dependencies | @module-federation/enhanced | ^0.18.3 | module-federation | Yes | packages/host/src/app-loaders/module-federation.ts:1-4 and packages/host/src/app-loaders/module-federation.ts:27-43 (imports and invokes `registerRemotes` and `loadRemote` from `@module-federation/enhanced/runtime`); packages/host/src/routes/apps.$baseRoute.tsx:7-24 (the route imports the manager and calls `getRemote`); packages/host/src/routes/apps.$baseRoute.tsx:39-55 (renders the remote component) |
| packages/host/package.json:13 | dependencies | qiankun | ^2.10.16 | qiankun | Yes | packages/host/src/app-loaders/qiankun.ts:2-26 (imports and invokes `registerMicroApps` and `start`); packages/host/src/app-loaders/index.ts:2 (re-exports `registerQiankunApps`); packages/host/src/App.tsx:3-11 (the main component calls registration in `useEffect`) |
| packages/host/package.json:19 | devDependencies | @module-federation/rsbuild-plugin | ^0.18.3 | module-federation | Yes | packages/host/rsbuild.config.ts:1-8 (the default Rsbuild build configuration imports and invokes `pluginModuleFederation`); packages/host/module-federation.config.ts:1-16 (`createModuleFederationConfig` configures the host); packages/host/package.json:5-8 (Rsbuild build) |

## Notes

- The host remotes object is empty; actual registrations are made through the runtime API with APP_CONFIGS (packages/host/src/configs/apps.ts:9-34). Each answer uses the import of the corresponding package, without transferring evidence between the plugin and runtime.

