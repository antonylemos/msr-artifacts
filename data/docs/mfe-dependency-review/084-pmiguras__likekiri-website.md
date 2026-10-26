---
schema: 1
id: 1329274714
full_name: pmiguras/likekiri-website
commit: 4b8c5fd5053751aba70fcd4859a38fd33062c8d3
inspection:
  output: data/inspections/mfe-dependencies-001
  version: "1"
  config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 084 — pmiguras/likekiri-website

## Dependencies

| Manifest:line | Section | Package | Version | Technology | Configured | Evidence (artifact:line) |
|---|---|---|---|---|---|---|
| apps/admin-shell/package.json:14 | dependencies | @module-federation/runtime | 2.8.2 | module-federation | Yes | apps/admin-shell/src/federation.ts:1 (`import { init, loadRemote, registerRemotes } from '@module-federation/runtime'`); apps/admin-shell/src/federation.ts:34-46 (`init`/`registerRemotes` with `remoteEntry` of the route and `loadRemote`); apps/admin-shell/src/views/ModulePage.tsx:4 and 25 (imports and calls `loadRemoteComponent`); apps/admin-shell/src/App.tsx:226 (renders `ModulePage`); apps/admin-shell/src/main.tsx:3-9 and apps/admin-shell/index.html:13 (SPA entry point) |
| apps/web-shell/package.json:13 | dependencies | @module-federation/runtime | 2.8.2 | module-federation | Yes | apps/web-shell/src/islands.ts:1 (`import { init, loadRemote } from '@module-federation/runtime'`); apps/web-shell/src/islands.ts:54-56 and 90-107 (`loadRemote` and `init` with the island remotes); apps/web-shell/vite.config.ts:21-23 (`islands.ts` is the client build entry point, `islands.js`); apps/web-shell/src/entry-server.tsx:181 (`bootstrapModules: ['/assets/islands.js']`) |
| modules/chat/package.json:19 | devDependencies | @module-federation/vite | 1.20.5 | module-federation | Yes | modules/chat/vite.config.ts:3 and 8-16 (`federation({ name: 'chat', filename: 'remoteEntry.js', exposes, shared })` in `plugins`); modules/chat/package.json:8 (`vite build` uses the default configuration) |
| modules/clientes/package.json:18 | devDependencies | @module-federation/vite | 1.20.5 | module-federation | Yes | modules/clientes/vite.config.ts:3 and 22-36 (`federation({ name: 'clientes', ... exposes ... })` in the client build; the SSR build at 11-17 does not use the plugin); modules/clientes/package.json:8 (`vite build && vite build --ssr ...`) |
| modules/cuentas/package.json:18 | devDependencies | @module-federation/vite | 1.20.5 | module-federation | Yes | modules/cuentas/vite.config.ts:3 and 8-20 (`federation({ name: 'cuentas', ... })` in `plugins`); modules/cuentas/package.json:8 (`vite build`) |
| modules/ejemplo-admin/package.json:18 | devDependencies | @module-federation/vite | 1.20.5 | module-federation | Yes | modules/ejemplo-admin/vite.config.ts:3 and 10-21 (`federation({ name: 'ejemplo-admin', ... })` in `plugins`); modules/ejemplo-admin/package.json:8 (`vite build`) |
| modules/ejemplo-web/package.json:18 | devDependencies | @module-federation/vite | 1.20.5 | module-federation | Yes | modules/ejemplo-web/vite.config.ts:3 and 11-21 (`federation({ name: 'ejemplo-web', ... })` in `plugins`); modules/ejemplo-web/package.json:8 (`vite build`) |
| modules/hello/package.json:17 | devDependencies | @module-federation/vite | 1.20.5 | module-federation | Yes | modules/hello/vite.config.ts:3 and 10-21 (`federation({ name: 'hello', ... })` in `plugins`); modules/hello/package.json:8 (`vite build`) |
| modules/media/package.json:19 | devDependencies | @module-federation/vite | 1.20.5 | module-federation | Yes | modules/media/vite.config.ts:3 and 8-18 (`federation({ name: 'media', ... })` in `plugins`); modules/media/package.json:8 (`vite build`) |
| modules/ops/package.json:10 | devDependencies | @module-federation/vite | 1.20.5 | module-federation | Yes | modules/ops/vite.config.ts:3 and 8-13 (`federation({ name: 'ops', ... })` in `plugins`); modules/ops/package.json:7 (`"build": "vite build"`) |
| modules/registry/package.json:18 | devDependencies | @module-federation/vite | 1.20.5 | module-federation | Yes | modules/registry/vite.config.ts:3 and 8-18 (`federation({ name: 'registry', ... })` in `plugins`); modules/registry/package.json:8 (`vite build`) |
| modules/sitio/package.json:18 | devDependencies | @module-federation/vite | 1.20.5 | module-federation | Yes | modules/sitio/vite.config.ts:3 and 8-18 (`federation({ name: 'sitio', ... })` in `plugins`); modules/sitio/package.json:8 (`vite build`) |

## Notes

- Runtime use in web-shell (`apps/web-shell/src/islands.ts:1`) is absent from the inspection lists; it appeared only in the search for `@module-federation` in the snapshot. The lists cite `apps/admin-shell/src/federation.ts` as `other_package_matches` for the web-shell row, but that file belongs to another package and does not support the row.
- web-shell's `islands.js` is not loaded by static HTML: it is the SSR bootstrap, rendered by core from `dist/server/entry-server.js` (`apps/core/src/shell/shell.service.ts:57` and 86).

