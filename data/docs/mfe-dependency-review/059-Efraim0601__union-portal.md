---
schema: 1
id: 1297539319
full_name: Efraim0601/union-portal
commit: b11a3e3aa55aff8195e0cde0026ccbd45245266d
inspection:
  output: data/inspections/mfe-dependencies-001
  version: "1"
  config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-21
---

# 059 — Efraim0601/union-portal

## Dependencies

| Manifest:line | Section | Package | Version | Technology | Configured | Evidence (artifact:line) |
|---|---|---|---|---|---|---|
| package.json:28 | dependencies | @softarc/native-federation-node | ^3.3.4 | native-federation | No | no import or invocation of `@softarc/native-federation-node` in the snapshot code and build files (literal search, excluding lockfiles); only declared in package.json:28; projects/shell/src/main.ts:1-5 (uses another package, `@angular-architects/native-federation`) |
| package.json:39 | devDependencies | @angular-architects/native-federation | 21.2.5 | native-federation | Yes | angular.json:51-64 (the build target invokes builder `@angular-architects/native-federation:build`); angular.json:76-80 (shell entry point); projects/shell/src/main.ts:1-5 (imports and invokes `initFederation` before bootstrap); projects/shell/src/app/app.routes.ts:2-18 (imports and invokes `loadRemoteModule`); projects/shell/src/app/app.config.ts:7-10 (registers the routes) |

## Notes

- The match lists are identical for both packages, but their imports and builders use @angular-architects/native-federation. This does not demonstrate direct use of @softarc/native-federation-node.
- The projects/shell/, projects/promote/ and projects/diaspora/ directories have no package.json of their own; they belong to the root package.
- On 2026-10-21 the pilot mfe-dependencies-001 configuration was revised to separate `native-federation` from `module-federation` (the history of hashes and previous outputs was in the original project document `docs/mfe-config-revisions.md`, which is not included in this package). Only the Technology column of the two rows changed; the answers and evidence are the same.

