---
schema: 1
id: 1043375878
full_name: mrmechazilla/host-app
commit: 38ab4eb46b2edf72c07604bbbe2b0ff744c8f3b8
inspection:
  output: data/inspections/mfe-dependencies-001
  version: "1"
  config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-19
---

# 008 — mrmechazilla/host-app

## Dependencies

| Manifest:line | Section | Package | Version | Technology | Configured | Evidence (artifact:line) |
|---|---|---|---|---|---|---|
| package.json:14 | dependencies | @angular-architects/module-federation | ^19.0.0 | module-federation | Yes | webpack.config.js:1-3 (`withModuleFederationPlugin` imported from the package); angular.json:18 (builder `ngx-build-plus:browser`); angular.json:42 and angular.json:88 (`extraWebpackConfig: webpack.config.js` in build and serve); angular.json:63 and angular.json:78 (`webpack.prod.config.js`, which reuses the configuration in webpack.prod.config.js:1); src/main.ts:2-4 (`loadManifest` from the package; `main` in angular.json:41); src/app/app.routes.ts:1 and src/app/app.routes.ts:8-12 (`loadRemoteModule` of `users-mfe`, registered by `provideRouter(routes)` in src/app/app.config.ts:13) |

## Notes

- All 17 occurrences are in `same_package_matches`; `other_package_matches` is empty. `src/` has no `package.json` of its own and belongs to the root package, despite having `src/index.html`.
- `src/app/shared/utils/remote-loader.ts:1` and `:14` are in the list, but the entire file is commented out (`/*` on line 1, `*/` on line 28); it was not used as evidence.
- These mention the package without using it: `package.json:10` (script `run:all` with `mf-dev-server.js`) and `angular.json:45` (`allowedCommonJsDependencies`). The inspection correctly does not count the script as a dependency.

