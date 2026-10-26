---
schema: 1
id: 1098942873
full_name: Tutul33/mf-workspace
commit: eb6d1cc782f44fa05b6a6d83c23edf20487af9db
inspection:
  output: data/inspections/mfe-dependencies-001
  version: "1"
  config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 316 — Tutul33/mf-workspace

## Dependencies

| Manifest:line | Section | Package | Version | Technology | Configured | Evidence (artifact:line) |
|---|---|---|---|---|---|---|
| package.json:30 | dependencies | @softarc/native-federation-node | ^3.3.4 | native-federation | No | no import or invocation of `@softarc/native-federation-node` in the snapshot code and build files (literal search, excluding package-lock.json); only declared in package.json:30; projects/host-app/src/main.ts:1 and projects/host-app/src/app/app.routes.ts:2 import another package (`@angular-architects/native-federation`) |
| package.json:36 | devDependencies | @angular-architects/native-federation | ^20.1.7 | native-federation | Yes | angular.json:17-29, angular.json:130-142 and angular.json:243-255 (target `build` of the three projects invokes builder `@angular-architects/native-federation:build`); angular.json:62, angular.json:175 and angular.json:288 (entry points `browser` of the projects); projects/customer-app/federation.config.js:1-10 and projects/orders-app/federation.config.js:1-10 (`withNativeFederation` with `exposes`); projects/host-app/src/main.ts:1-8 (imports and invokes `initFederation` before bootstrap); projects/host-app/src/app/app.routes.ts:2-19 (imports and invokes `loadRemoteModule`); projects/host-app/src/app/app.config.ts:4-10 (registers the routes) |

## Notes

- The match lists are identical for both packages, but the imports, `require` in `federation.config.js` and builders use `@angular-architects/native-federation`. This does not demonstrate direct use of `@softarc/native-federation-node`.
- The `projects/host-app/`, `projects/customer-app/` and `projects/orders-app/` directories have no `package.json` of their own; they belong to the root package.

