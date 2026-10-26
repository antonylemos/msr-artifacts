---
schema: 1
id: 1015183048
full_name: harshad-eden/module-federation
commit: dde74e678a749ccbf3951e173bf980649034c5d4
inspection:
  output: data/inspections/mfe-dependencies-001
  version: "1"
  config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 202 — harshad-eden/module-federation

## Dependencies

| Manifest:line | Section | Package | Version | Technology | Configured | Evidence (artifact:line) |
|---|---|---|---|---|---|---|
| apps/product-config/package.json:23 | devDependencies | @originjs/vite-plugin-federation | ^1.3.5 | module-federation | Yes | apps/product-config/vite.config.ts:3-15 (the default Vite configuration imports `federation` and invokes it in plugins with `name: "productConfig"`, `exposes` and `shared`); apps/product-config/package.json:5-9 (`dev`/`build` run `vite`/`vite build` with no alternative configuration) |
| apps/sales-portal/package.json:23 | devDependencies | @originjs/vite-plugin-federation | ^1.3.5 | module-federation | Yes | apps/sales-portal/vite.config.ts:3-15 (the default Vite configuration imports `federation` and invokes it in plugins with `name: "salesPortal"`, `exposes` and `shared`); apps/sales-portal/package.json:5-9 (`dev`/`build` run `vite`/`vite build` with no alternative configuration) |
| apps/shell/package.json:24 | devDependencies | @originjs/vite-plugin-federation | ^1.3.5 | module-federation | Yes | apps/shell/vite.config.ts:3-16 (the default Vite configuration imports `federation` and invokes it in plugins with `name: "shell"`, `remotes` and `shared`); apps/shell/package.json:5-9 (`dev`/`build` run `vite`/`vite build` with no alternative configuration) |
| apps/underwriter-portal/package.json:23 | devDependencies | @originjs/vite-plugin-federation | ^1.3.5 | module-federation | Yes | apps/underwriter-portal/vite.config.ts:3-15 (the default Vite configuration imports `federation` and invokes it in plugins with `name: "underwriterPortal"`, `exposes` and `shared`); apps/underwriter-portal/package.json:5-9 (`dev`/`build` run `vite`/`vite build` with no alternative configuration) |
