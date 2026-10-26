---
schema: 1
id: 1238664148
full_name: LaurineLeNet/microfrontend-angular-angular
commit: 342c92dff482f1ee0a4bcc05f9302361a7354352
inspection:
  output: data/inspections/mfe-dependencies-001
  version: "1"
  config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 349 — LaurineLeNet/microfrontend-angular-angular

## Dependencies

| Manifest:line | Section | Package | Version | Technology | Configured | Evidence (artifact:line) |
|---|---|---|---|---|---|---|
| athletes/package.json:14 | dependencies | @angular-architects/native-federation | ^21.2.3 | native-federation | Yes | athletes/angular.json:16-29 (target `build` invokes builder `@angular-architects/native-federation:build`, which delegates to `athletes:esbuild`); athletes/angular.json:43-46 (target `esbuild` with `browser: src/main.ts`); athletes/federation.config.js:1-9 (`require('@angular-architects/native-federation/config')`, `withNativeFederation` with `name: 'athletes'` and `exposes` `./Component` and `./Routes`); athletes/src/main.ts:1-5 (imports and invokes `initFederation` before `import('./bootstrap')`) |
| athletes/package.json:22 | dependencies | @softarc/native-federation-node | ^3.3.4 | native-federation | No | no import or invocation of `@softarc/native-federation-node` in the snapshot code and build files (literal search for `@softarc`, excluding lockfiles); only declared in athletes/package.json:22; athletes/src/main.ts:1 and athletes/federation.config.js:1 (use another package, `@angular-architects/native-federation`) |
| ranking/package.json:14 | dependencies | @angular-architects/native-federation | ^21.2.3 | native-federation | Yes | ranking/angular.json:16-29 (target `build` invokes builder `@angular-architects/native-federation:build`, which delegates to `ranking:esbuild`); ranking/angular.json:43-46 (target `esbuild` with `browser: src/main.ts`); ranking/federation.config.js:1-8 (`require('@angular-architects/native-federation/config')`, `withNativeFederation` with `name: 'ranking'` and `exposes` `./Component`); ranking/src/main.ts:1-5 (imports and invokes `initFederation` before `import('./bootstrap')`) |
| ranking/package.json:22 | dependencies | @softarc/native-federation-node | ^3.3.4 | native-federation | No | no import or invocation of `@softarc/native-federation-node` in the snapshot code and build files (literal search for `@softarc`, excluding lockfiles); only declared in ranking/package.json:22; ranking/src/main.ts:1 and ranking/federation.config.js:1 (use another package, `@angular-architects/native-federation`) |
| shell/package.json:14 | dependencies | @angular-architects/native-federation | ^21.2.3 | native-federation | Yes | shell/angular.json:16-29 (target `build` invokes builder `@angular-architects/native-federation:build`, which delegates to `shell:esbuild`); shell/angular.json:43-46 (target `esbuild` with `browser: src/main.ts`); shell/federation.config.js:1-8 (`withNativeFederation` with `name: 'shell'` and `shareAll`); shell/src/main.ts:1-5 (imports and invokes `initFederation('federation.manifest.json')` before `import('./bootstrap')`); shell/src/app/app.routes.ts:1-19 (imports and invokes `loadRemoteModule` in routes `athletes` and `ranking`); shell/src/app/app.config.ts:9 (registers the routes with `provideRouter(routes)`); shell/src/app/dashboard/dashboard.ts:10, 56-57 (imports and invokes `loadRemoteModule` for both `./Component`, component for route `dashboard` in shell/src/app/app.routes.ts:6-9) |
| shell/package.json:22 | dependencies | @softarc/native-federation-node | ^3.3.4 | native-federation | No | no import or invocation of `@softarc/native-federation-node` in the snapshot code and build files (literal search for `@softarc`, excluding lockfiles); only declared in shell/package.json:22; shell/src/main.ts:1, shell/src/app/app.routes.ts:1 and shell/federation.config.js:1 (use another package, `@angular-architects/native-federation`) |

## Notes

- The match lists for the `@softarc/native-federation-node` rows are the same as those for the `@angular-architects/native-federation` rows of the same package; all imports and builders cited in them use `@angular-architects/native-federation`. This does not demonstrate direct use of `@softarc/native-federation-node`.
- `athletes/`, `ranking/` and `shell/` are independent packages, each with its own `package.json`; each row's evidence was taken from its own package.

