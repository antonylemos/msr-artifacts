---
schema: 1
id: 1042592063
full_name: Jyotisaini1234/moduleFederation
commit: 8df0f2a8d23cd31eebd2f54463cd0b665fe1fe29
inspection:
  output: data/inspections/mfe-dependencies-001
  version: "1"
  config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 172 — Jyotisaini1234/moduleFederation

## Dependencies

| Manifest:line | Section | Package | Version | Technology | Configured | Evidence (artifact:line) |
|---|---|---|---|---|---|---|
| mfe1/package.json:15 | dependencies | @module-federation/node | ^2.7.14 | module-federation | No | no import, plugin or invocation of `@module-federation/node` in the snapshot code and build files (grep for `module-federation` in all files, excluding lockfiles); only declared in mfe1/package.json:15. The inspection occurrences refer to webpack’s built-in plugin: mfe1/webpack.config.ts:5, 11-12 and 74 (`import webpackPkg from 'webpack'`; `const { ModuleFederationPlugin } = container`; `new ModuleFederationPlugin({...})`) |

## Notes

- `same_package_matches` (mfe1/webpack.config.ts:12, 74, 76, 79, 81, 85) and `other_package_matches` (mfe2/webpack.config.ts:7, 37, 40, 41) point to the `ModuleFederationPlugin` from `webpack.container` (mfe1/webpack.config.ts:11-12; mfe2/webpack.config.ts:6-7), not to `@module-federation/node`. Module Federation is configured, but through another package; this is already in the classification.
- The SSR server in `mfe1/src/server/server.ts` also does not import `@module-federation/node`.

