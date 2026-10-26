---
schema: 1
id: 994642993
full_name: ayushpandey241626/microfrontend-demo
commit: ec39a278ec6951feeb8d7ff7688cb4f056be589b
inspection:
  output: data/inspections/mfe-dependencies-001
  version: "1"
  config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 229 — ayushpandey241626/microfrontend-demo

## Dependencies

| Manifest:line | Section | Package | Version | Technology | Configured | Evidence (artifact:line) |
|---|---|---|---|---|---|---|
| package.json:31 | devDependencies | @angular-architects/module-federation | ^19.0.3 | module-federation | Yes | projects/host-app/webpack.config.js:2-5 (`shareAll`, `SharedMappings` imported from `@angular-architects/module-federation/webpack`), used in projects/host-app/webpack.config.js:8-9 and :26-34; projects/mfe1/webpack.config.js:1-4 and :6-21, projects/mfe2/webpack.config.js:1-4 and :6-21, projects/login-mfe-app/webpack.config.js:1-4 and :6-21 (`withModuleFederationPlugin` with `exposes`); angular.json:14, :115, :216, :321 (builder `ngx-build-plus:browser`) and angular.json:35, :136, :237, :342 (`extraWebpackConfig` of each project); projects/host-app/src/app/app.routes.ts:3 and :16-40 (`loadRemoteModule` in routes `contacts`, `admin`, `login`), registered by `provideRouter(routes)` in projects/host-app/src/app/app.config.ts:12 |

## Notes

- All inspection occurrences are in `same_package_matches`; `other_package_matches` is empty. `projects/*` have no `package.json` of their own and belong to the root package.
- `package.json:10` (script `run:all` with `mf-dev-server.js`) mentions the package without using it; it was not counted as evidence.
- The host uses `ModuleFederationPlugin` directly from webpack (projects/host-app/webpack.config.js:6), with only `shareAll`/`SharedMappings` coming from the package; the remotes use the package's `withModuleFederationPlugin`.
- The `webpack.prod.config.js` files only re-export the project's `webpack.config.js` (for example, projects/mfe1/webpack.prod.config.js:1).

