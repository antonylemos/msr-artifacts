---
schema: 1
id: 1181945275
full_name: Lnx117/single_spa_main
commit: 112c73b7d0bc4739bcab53de03b404ce2fbde05a
inspection:
  output: data/inspections/mfe-dependencies-001
  version: "1"
  config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 176 — Lnx117/single_spa_main

## Dependencies

| Manifest:line | Section | Package | Version | Technology | Configured | Evidence (artifact:line) |
|---|---|---|---|---|---|---|
| package.json:16 | dependencies | single-spa | ^6.0.3 | single-spa | Yes | src/main.ts:3 (`import { registerApplication, start } from 'single-spa'`); src/main.ts:13-17 and src/main.ts:21-25 (`registerApplication` for `menu` and `base`); src/main.ts:29 (`start()`); index.html:20 (`<script type="module" src="/src/main.ts">`, Vite entry point) |
| package.json:20 | devDependencies | vite-plugin-single-spa | ^1.1.0 | single-spa | Yes | vite.config.ts:3 (`import vitePluginSingleSpa from 'vite-plugin-single-spa'`); vite.config.ts:12-15 (`vitePluginSingleSpa({ type: 'root', cssStrategy: 'multiMife' })` in `plugins`); package.json:7-8 (`vite` and `vite build`, which load `vite.config.ts`) |

## Notes

- Both rows contain the same `same_package_matches` (`src/main.ts:13` and `:21`), which are `single-spa` calls, not plugin calls. Evidence for `vite-plugin-single-spa` appears only outside the lists, in `vite.config.ts:3` and `:12-15` (grep).
- `index.html:12` and `:17` have the `single-spa-application:menu` and `single-spa-application:base` containers; they mention the technology name but do not import a package.

