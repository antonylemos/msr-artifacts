---
schema: 1
id: 1206226526
full_name: vigneshwaran-chandrasekaran/microfrontend
commit: 28c70f8b2b748f07872a8dd1f56240d8a3415c05
inspection:
  output: data/inspections/mfe-dependencies-001
  version: "1"
  config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 078 — vigneshwaran-chandrasekaran/microfrontend

## Dependencies

| Manifest:line | Section | Package | Version | Technology | Configured | Evidence (artifact:line) |
|---|---|---|---|---|---|---|
| angular-mfe/package.json:21 | devDependencies | @angular-architects/module-federation | ^16.0.4 | module-federation | Yes | angular-mfe/webpack.config.js:11-14 (`shareAll` and `withModuleFederationPlugin` imported from `@angular-architects/module-federation/webpack`); angular-mfe/webpack.config.js:23-30 (`withModuleFederationPlugin` with `name: 'angularMfe'`, `remoteEntry.js` and `exposes './mount'`); angular-mfe/angular.json:13-17 (builder `@angular-builders/custom-webpack:browser` with `customWebpackConfig.path: ./webpack.config.js`); angular-mfe/angular.json:51-52 (serve with `@angular-builders/custom-webpack:dev-server`) |

## Notes

- `other_package_matches` points to `host/`, `react-mfe-1/`, `react-mfe-2/` and `vue-mfe/`, which use webpack's own `ModuleFederationPlugin` (`require('webpack/lib/container/ModuleFederationPlugin')`, for example `host/webpack.config.js:3`), not this package; they were not used as evidence.
- These mention the package without using it: `angular-mfe/webpack.config.js:7` (comment) and `host/webpack.config.js:26` (comment about the Angular remote output format).

