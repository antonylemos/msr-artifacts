---
schema: 1
id: 973277755
full_name: Hariharan-s-99/microFrontend
commit: 902273771afdb4f52006aeed0bcb3cd0e6c33cee
inspection:
  output: data/inspections/mfe-dependencies-001
  version: "1"
  config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 319 — Hariharan-s-99/microFrontend

## Dependencies

| Manifest:line | Section | Package | Version | Technology | Configured | Evidence (artifact:line) |
|---|---|---|---|---|---|---|
| container/package.json:29 | dependencies | @module-federation/enhanced | ^0.8.9 | module-federation | Yes | container/rspack.config.ts:5 (`ModuleFederationPlugin` imported from `@module-federation/enhanced/rspack`); container/rspack.config.ts:94 (`new ModuleFederationPlugin(mfConfig)` in `plugins`); container/module-federation.config.ts:1-8 (`name: "container"`, remotes `settings` and `home`); container/package.json:5 and container/package.json:8 (`rspack build` / `rspack serve`, which read `rspack.config.ts`) |
| home/package.json:29 | dependencies | @module-federation/enhanced | ^0.8.9 | module-federation | Yes | home/rspack.config.ts:5 (`ModuleFederationPlugin` imported from `@module-federation/enhanced/rspack`); home/rspack.config.ts:94 (`new ModuleFederationPlugin(mfConfig)` in `plugins`); home/module-federation.config.ts:1-8 (`name: "home"`, `filename: "remoteEntry.js"`, exposes `./app`); home/package.json:5 and home/package.json:8 (`rspack build` / `rspack serve`) |
| settings/package.json:28 | dependencies | @module-federation/enhanced | ^0.8.9 | module-federation | Yes | settings/rspack.config.ts:5 (`ModuleFederationPlugin` imported from `@module-federation/enhanced/rspack`); settings/rspack.config.ts:93 (`new ModuleFederationPlugin(mfConfig)` in `plugins`); settings/module-federation.config.ts:1-8 (`name: "settings"`, `filename: "remoteEntry.js"`, exposes `./app`); settings/package.json:5 and settings/package.json:8 (`rspack build` / `rspack serve`) |

## Notes

- Each package uses its own plugin copy; the `other_package_matches` occurrences are the equivalent configurations in the other two packages and were not used as evidence for the row.
- Grep outside the lists found no other package use (only `rspack.config.ts` and `package.json` files). `advancedWebpack/` neither declares nor uses the package.
- The host consumes the remotes in container/src/Home.tsx:1 (`import { mount } from "home/app"`) and container/src/Settings.tsx:1 (`import { mount } from "settings/app"`).

