---
schema: 1
id: 969679126
full_name: Ba5ik7/seed-mfe-remote
commit: 3565dd875bd5bd89f14f88b1325e00aeb11cdf96
inspection:
  output: data/inspections/mfe-dependencies-001
  version: "1"
  config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 368 — Ba5ik7/seed-mfe-remote

## Dependencies

| Manifest:line | Section | Package | Version | Technology | Configured | Evidence (artifact:line) |
|---|---|---|---|---|---|---|
| package.json:14 | dependencies | @angular-architects/module-federation | ^19.0.3 | module-federation | Yes | projects/seed-mfe-remote/webpack.config.js:1-15 (`withModuleFederationPlugin({ name: 'seedMfeRemote', exposes: { './RemoteWidget': ... }, shared: shareAll(...) })`, imported from `@angular-architects/module-federation/webpack`); projects/demo/webpack.config.js:1-13 (`withModuleFederationPlugin({ remotes: { "seedMfeRemote": "http://localhost:4202/remoteEntry.js" }, ... })`); angular.json:18 and angular.json:39 (builder `ngx-build-plus:browser` and `extraWebpackConfig` of the remote), angular.json:82 (serve), angular.json:123, angular.json:144 and angular.json:187 (same for `demo`); angular.json:57, :72, :162 and :177 (`webpack.prod.config.js`, which reuses the configuration in projects/demo/webpack.prod.config.js:1 and projects/seed-mfe-remote/webpack.prod.config.js:1); projects/demo/src/app/app.component.ts:1 and `:26-36` (`loadRemoteModule` and `createComponent` in the root component, initialized in projects/demo/src/bootstrap.ts:5, entry `main` in angular.json:143); projects/demo/src/app/app.routes.ts:2 and `:5-13` (route `remote` with `loadRemoteModule`, registered by `provideRouter(routes)` in projects/demo/src/app/app.config.ts:7) |

## Notes

- All occurrences are in `same_package_matches`; `other_package_matches` is empty. `projects/demo/` and `projects/seed-mfe-remote/` have no `package.json` of their own and belong to the root package.
- The search outside the lists (grep in `*.ts`, `*.js`, `*.json`, excluding the lockfile) found no other use. `package.json:10` (script `run:all` with `mf-dev-server.js`) mentions the package without using it.

