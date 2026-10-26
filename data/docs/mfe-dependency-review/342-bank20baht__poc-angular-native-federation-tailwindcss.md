---
schema: 1
id: 1050538328
full_name: bank20baht/poc-angular-native-federation-tailwindcss
commit: d2f9722e77b754318c831138d54aebbfd093ee1e
inspection:
  output: data/inspections/mfe-dependencies-001
  version: "1"
  config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 342 — bank20baht/poc-angular-native-federation-tailwindcss

## Dependencies

| Manifest:line | Section | Package | Version | Technology | Configured | Evidence (artifact:line) |
|---|---|---|---|---|---|---|
| host/package.json:23 | dependencies | @angular-architects/native-federation | 20.1.6 | native-federation | Yes | host/angular.json:16-29 (target `build` invokes builder `@angular-architects/native-federation:build`, which delegates to `host:esbuild`); host/angular.json:57-60 (target `esbuild` with entry point `src/main.ts`); host/federation.config.js:1-3 (`require('@angular-architects/native-federation/config')` and `withNativeFederation`); host/src/main.ts:1-7 (imports and invokes `initFederation` with the remote before `import('./bootstrap')`); host/src/app/app.routes.ts:1-28 (imports and invokes `loadRemoteModule` in routes `''` and `flights`); host/src/app/app.config.ts:4-10 (registers the routes with `provideRouter(routes)`) |
| host/package.json:31 | dependencies | @softarc/native-federation-node | ^2.0.10 | native-federation | No | no import or invocation of `@softarc/native-federation-node` in the snapshot code and build files (literal search for `@softarc`, excluding lockfiles); only declared in host/package.json:31; host/src/main.ts:1 and host/federation.config.js:1 (use another package, `@angular-architects/native-federation`) |
| remote/package.json:23 | dependencies | @angular-architects/native-federation | 20.1.6 | native-federation | Yes | remote/angular.json:16-31 (target `build` invokes builder `@angular-architects/native-federation:build`, which delegates to `remote:esbuild`); remote/angular.json:58-61 (target `esbuild` with entry point `src/main.ts`); remote/federation.config.js:1-10 (`withNativeFederation` with `name: 'remote'` and `exposes` `./Component` and `./routes`); remote/src/main.ts:1-6 (imports and invokes `initFederation` before `import('./bootstrap')`) |
| remote/package.json:31 | dependencies | @softarc/native-federation-node | ^2.0.10 | native-federation | No | no import or invocation of `@softarc/native-federation-node` in the snapshot code and build files (literal search for `@softarc`, excluding lockfiles); only declared in remote/package.json:31; remote/src/main.ts:1 and remote/federation.config.js:1 (use another package, `@angular-architects/native-federation`) |

## Notes

- The match lists for the `@softarc/native-federation-node` rows are the same as those for the `@angular-architects/native-federation` rows of the same package; all imports and builders cited in them use `@angular-architects/native-federation`. This does not demonstrate direct use of `@softarc/native-federation-node`.
- `host/` and `remote/` are independent packages, each with its own `package.json`; each row's evidence was taken from its own package.

