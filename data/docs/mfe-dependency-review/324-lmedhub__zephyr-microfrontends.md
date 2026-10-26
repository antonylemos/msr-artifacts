---
schema: 1
id: 990877766
full_name: lmedhub/zephyr-microfrontends
commit: c6e6a9f7d59a3b422002af26c57617d6c486a532
inspection:
  output: data/inspections/mfe-dependencies-001
  version: "1"
  config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 324 — lmedhub/zephyr-microfrontends

## Dependencies

| Manifest:line | Section | Package | Version | Technology | Configured | Evidence (artifact:line) |
|---|---|---|---|---|---|---|
| frontend/package.json:59 | dependencies | @module-federation/enhanced | ^0.8.9 | module-federation | No | no import or require of `@module-federation/enhanced` in `frontend/` (grep in `*.ts`, `*.tsx`, `*.js`, `*.json`, `*.vue`; the only occurrence is the declaration in frontend/package.json:59); the four builds use Rspack’s built-in plugin: frontend/apps/host/rspack.config.ts:1 (`require("@rspack/core")`), :82 (`new rspack.container.ModuleFederationPlugin({`); same in frontend/apps/remote-header/rspack.config.ts:73, frontend/apps/remote-footer/rspack.config.ts:73 and frontend/apps/url-shortener/rspack.config.ts:74 |

## Notes

- All `other_package_matches` items are the `ModuleFederationPlugin` from `@rspack/core` (`rspack.container.ModuleFederationPlugin`), not the one from the `@module-federation/enhanced` package. Module Federation is configured and in use, but through Rspack; the package declared at the root is unused.
- The app manifests (`frontend/apps/*/package.json`) do not declare `@module-federation/enhanced`; only the root `frontend/package.json` declares it.

