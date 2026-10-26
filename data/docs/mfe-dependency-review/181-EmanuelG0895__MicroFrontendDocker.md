---
schema: 1
id: 1009817207
full_name: EmanuelG0895/MicroFrontendDocker
commit: 137ba29996f64553efd3401f8ad619646d8a78e5
inspection:
  output: data/inspections/mfe-dependencies-001
  version: "1"
  config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 181 — EmanuelG0895/MicroFrontendDocker

## Dependencies

| Manifest:line | Section | Package | Version | Technology | Configured | Evidence (artifact:line) |
|---|---|---|---|---|---|---|
| MF-CharacterDetail/package.json:29 | dependencies | @module-federation/enhanced | ^0.8.9 | module-federation | Yes | MF-CharacterDetail/rspack.config.ts:5 (`ModuleFederationPlugin` imported from `@module-federation/enhanced/rspack`); MF-CharacterDetail/rspack.config.ts:86 (`new ModuleFederationPlugin(mfConfig)`); MF-CharacterDetail/module-federation.config.ts:1-10 (`exposes` `./CharacterInfo` and `./View`); MF-CharacterDetail/package.json:5 and :8 (`rspack build` / `rspack serve`, which use rspack.config.ts) |
| MF-Characters/package.json:29 | dependencies | @module-federation/enhanced | ^0.8.9 | module-federation | Yes | MF-Characters/rspack.config.ts:5 (`ModuleFederationPlugin` imported from `@module-federation/enhanced/rspack`); MF-Characters/rspack.config.ts:81 (`new ModuleFederationPlugin(mfConfig)`); MF-Characters/module-federation.config.ts:1-8 (`exposes` `./Vista`); MF-Characters/package.json:5 and :8 (`rspack build` / `rspack serve`) |
| MF-Shell/package.json:29 | dependencies | @module-federation/enhanced | ^0.8.9 | module-federation | Yes | MF-Shell/rspack.config.ts:5 (`ModuleFederationPlugin` imported from `@module-federation/enhanced/rspack`); MF-Shell/rspack.config.ts:98 (`new ModuleFederationPlugin(mfConfig)`); MF-Shell/module-federation.config.ts:3-6 (`remotes` `MF_CharacterDetail` and `MF_Characters`); MF-Shell/package.json:5 and :8 (`rspack build` / `rspack serve`); MF-Shell/src/App.tsx:6-7 (`import("MF_CharacterDetail/View")`) |

## Notes

- The three projects have their own `package.json` and there is no workspace; each row was judged by its own package's `rspack.config.ts`. The `other_package_matches` occurrences are the same configuration viewed from the other packages.
- `MF-Characters/webpack.config.js:2` and `MF-CharacterDetail/webpack.config.js:2` are in `same_package_matches`, but import `ModuleFederationPlugin` from `require('webpack').container`, not from this package; furthermore, no `package.json` script uses webpack (`package.json:5-9`, only `rspack`). They were not used as evidence.
- `MF-Shell/@mf-types/index.d.ts:11` declares the `@module-federation/enhanced/runtime` module in generated types; this is a type declaration, not use.

