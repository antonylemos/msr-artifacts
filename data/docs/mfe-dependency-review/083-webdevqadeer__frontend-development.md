---
schema: 1
id: 1116305586
full_name: webdevqadeer/frontend-development
commit: f8d264873c9182d4f3a0628f18f7618b019a2f79
inspection:
  output: data/inspections/mfe-dependencies-001
  version: "1"
  config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 083 — webdevqadeer/frontend-development

## Dependencies

| Manifest:line | Section | Package | Version | Technology | Configured | Evidence (artifact:line) |
|---|---|---|---|---|---|---|
| react/mv-marketplace/apps/admin/package.json:18 | devDependencies | @originjs/vite-plugin-federation | ^1.4.1 | module-federation | Yes | react/mv-marketplace/apps/admin/vite.config.js:3-18 (the default Vite configuration imports `federation` and invokes it in plugins with `name: "admin_app"`, `exposes` and `shared`); react/mv-marketplace/apps/admin/package.json:8 (`"build": "vite build"`, with no alternative configuration) |
| react/mv-marketplace/apps/buyer/package.json:18 | devDependencies | @originjs/vite-plugin-federation | ^1.4.1 | module-federation | Yes | react/mv-marketplace/apps/buyer/vite.config.js:3-18 (the default Vite configuration imports `federation` and invokes it in plugins with `name: "buyer_app"`, `exposes` and `shared`); react/mv-marketplace/apps/buyer/package.json:8 (`"build": "vite build"`, with no alternative configuration) |
| react/mv-marketplace/apps/payment/package.json:18 | devDependencies | @originjs/vite-plugin-federation | ^1.4.1 | module-federation | Yes | react/mv-marketplace/apps/payment/vite.config.js:3-16 (the default Vite configuration imports `federation` and invokes it in plugins with `name: "payment-app"`, `exposes` and `shared`); react/mv-marketplace/apps/payment/package.json:8 (`"build": "vite build"`, with no alternative configuration) |
| react/mv-marketplace/apps/seller/package.json:18 | devDependencies | @originjs/vite-plugin-federation | ^1.4.1 | module-federation | Yes | react/mv-marketplace/apps/seller/vite.config.js:3-16 (the default Vite configuration imports `federation` and invokes it in plugins with `name: "seller_app"`, `exposes` and `shared`); react/mv-marketplace/apps/seller/package.json:8 (`"build": "vite build"`, with no alternative configuration) |
| react/mv-marketplace/apps/shell/package.json:19 | devDependencies | @originjs/vite-plugin-federation | ^1.4.1 | module-federation | Yes | react/mv-marketplace/apps/shell/vite.config.js:3-19 (the default Vite configuration imports `federation` and invokes it in plugins with `name: "shell_app"`, `remotes` for ports 5001–5005 and `shared`); react/mv-marketplace/apps/shell/package.json:8 (`"build": "vite build"`, with no alternative configuration) |

## Notes

- Grep for the package name in the snapshot's `.js`, `.jsx`, `.ts`, `.mjs`, `.cjs` and `.json` files (excluding lockfiles and `node_modules/`) found only the five `vite.config.js` files and five manifest declarations; there is no use outside the inspection lists.
- `react/mv-marketplace/package.json:15` builds the five applications by workspace, calling each one's `build` script.
- The `package` remote (`localhost:5005`) declared in the five `vite.config.js` files is not served by any target; this does not change the row judgments, because each configuration invokes the plugin with its own `name` and concrete `exposes` or `remotes`.

