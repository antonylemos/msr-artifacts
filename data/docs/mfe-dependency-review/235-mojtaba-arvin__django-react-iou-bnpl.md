---
schema: 1
id: 989410278
full_name: mojtaba-arvin/django-react-iou-bnpl
commit: bf4da7610d2a1343b2f97eab1dfeb6b026e50e19
inspection:
  output: data/inspections/mfe-dependencies-001
  version: "1"
  config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 235 — mojtaba-arvin/django-react-iou-bnpl

## Dependencies

| Manifest:line | Section | Package | Version | Technology | Configured | Evidence (artifact:line) |
|---|---|---|---|---|---|---|
| frontend/package.json:40 | devDependencies | @module-federation/typescript | ^3.1.3 | module-federation | Undetermined | frontend/shell/tsconfig.build.json:17-24 (`compilerOptions.plugins` with `"name": "@module-federation/typescript"` and `configPath: ./webpack.config.js`), file used by the build in frontend/shell/webpack.config.js:44-47 (`ts-loader` with `configFile: "tsconfig.build.json"`); frontend/shell/tsconfig.json:25-32 (same entry); no build or code file imports or invokes the package: the three `webpack.config.js` obtain the `ModuleFederationPlugin` from `webpack` (frontend/shell/webpack.config.js:3, frontend/customer-app/webpack.config.js:3, frontend/merchant-app/webpack.config.js:3) (grep for `@module-federation` and `FederatedTypes` in `frontend/`, excluding the lockfile) |

## Notes

- `same_package_matches` is empty. The `other_package_matches` items are the `ModuleFederationPlugin`, `remotes`, `exposes` and `shared` lines of the three `webpack.config.js` files (`:3`, `59-94` in the shell; `:3`, `81-116` in the remotes), all with webpack 5's native plugin, not this package.
- The only reference to the package outside the manifest is in `compilerOptions.plugins` of the shell's `tsconfig` files. `frontend/shell/tsconfig.build.json` is used by `ts-loader`, but the entry declares the package as a TypeScript compiler plugin, and there is no invocation of it in the webpack build. Since it is not possible to confirm that this entry affects the build, the row remains `Undetermined`, rather than `Yes`. `frontend/customer-app` and `frontend/merchant-app` do not have this entry in their `tsconfig` files.
- `frontend/package.json:70` (`dependenciesDocumentation`) says the package provides `ModuleFederationPlugin`, which contradicts the `webpack.config.js` files, which import the plugin from `webpack`. This is documentation, not use.
- The webpack 5 Module Federation configuration itself (without a separate package) is recorded in the classification.

