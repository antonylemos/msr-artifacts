---
schema: 1
id: 1134331975
full_name: andreea-lipan/cozy-desk-micro-frontends
commit: 7050669405cfdce6e0bf593fdfdb4d94ef5ad5dc
inspection:
  output: data/inspections/mfe-dependencies-001
  version: "1"
  config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 139 — andreea-lipan/cozy-desk-micro-frontends

## Dependencies

| Manifest:line | Section | Package | Version | Technology | Configured | Evidence (artifact:line) |
|---|---|---|---|---|---|---|
| sticky-notes/package.json:26 | dependencies | @angular-architects/native-federation | ^21.0.4 | native-federation | Yes | sticky-notes/angular.json:16-39 (targets `build` and `serve` invoke builder `@angular-architects/native-federation:build`); sticky-notes/angular.json:43-46 (target `esbuild` with entry point `browser: src/main.ts`); sticky-notes/federation.config.js:1-12 (imports and invokes `withNativeFederation`, `exposes: { './App': './src/app/app.ts' }`); sticky-notes/src/main.ts:1-6 (imports and invokes `initFederation()` before bootstrap) |
| sticky-notes/package.json:34 | dependencies | @softarc/native-federation-node | ^3.3.4 | native-federation | No | no import or invocation of `@softarc/native-federation-node` in the snapshot code and build files (literal search, excluding lockfiles); only declared in sticky-notes/package.json:34; sticky-notes/src/main.ts:1 and sticky-notes/federation.config.js:1 (use another package, `@angular-architects/native-federation`) |
| tea-tracker/package.json:26 | dependencies | @angular-architects/native-federation | ^21.0.4 | native-federation | Yes | tea-tracker/angular.json:16-39 (targets `build` and `serve` invoke builder `@angular-architects/native-federation:build`); tea-tracker/angular.json:43-46 (target `esbuild` with entry point `browser: src/main.ts`); tea-tracker/federation.config.js:1-12 (imports and invokes `withNativeFederation`, `exposes: { './App': './src/app/app.ts' }`); tea-tracker/src/main.ts:1-6 (imports and invokes `initFederation()` before bootstrap) |
| tea-tracker/package.json:34 | dependencies | @softarc/native-federation-node | ^3.3.4 | native-federation | No | no import or invocation of `@softarc/native-federation-node` in the snapshot code and build files (literal search, excluding lockfiles); only declared in tea-tracker/package.json:34; tea-tracker/src/main.ts:1 and tea-tracker/federation.config.js:1 (use another package, `@angular-architects/native-federation`) |
| test-base/package.json:26 | dependencies | @angular-architects/native-federation | ^21.0.4 | native-federation | Yes | test-base/angular.json:16-39 (targets `build` and `serve` invoke builder `@angular-architects/native-federation:build`); test-base/angular.json:43-46 (target `esbuild` with entry point `browser: src/main.ts`); test-base/src/main.ts:1-6 (imports and invokes `initFederation('federation.manifest.json')` before bootstrap); test-base/src/app/app.routes.ts:3-19 (imports and invokes `loadRemoteModule` in routes `tea-tracker` and `sticky-notes`); test-base/src/app/app.config.ts:4-9 (registers the routes with `provideRouter`); test-base/federation.config.js:1-8 (imports and invokes `withNativeFederation`) |
| test-base/package.json:34 | dependencies | @softarc/native-federation-node | ^3.3.4 | native-federation | No | no import or invocation of `@softarc/native-federation-node` in the snapshot code and build files (literal search, excluding lockfiles); only declared in test-base/package.json:34; test-base/src/main.ts:1 and test-base/src/app/app.routes.ts:3 (use another package, `@angular-architects/native-federation`) |

## Notes

- The three projects (`test-base/`, `tea-tracker/`, `sticky-notes/`) have their own `package.json`, with no root manifest; each row was judged by its own package's evidence. Each package's `same_package_matches` lists coincide with the files in its directory.
- The match lists are identical for `@angular-architects/native-federation` and `@softarc/native-federation-node`, but all snapshot imports, `require` calls and builders use `@angular-architects/native-federation`. The search for `softarc` finds only the declarations in the three `package.json` files.
- `federation.config.js` is not explicitly referenced in `angular.json`; the remotes' `Yes` relies on the builder invoked by `angular.json` and on `initFederation()` in the `src/main.ts` entry point.

