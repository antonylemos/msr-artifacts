---
schema: 1
id: 1033705813
full_name: hscale/adx-core-k
commit: 683dec7ebc233c685f97166a135032d5668070c1
inspection:
  output: data/inspections/mfe-dependencies-001
  version: "1"
  config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 060 — hscale/adx-core-k

## Dependencies

| Manifest:line | Section | Package | Version | Technology | Configured | Evidence (artifact:line) |
|---|---|---|---|---|---|---|
| adx-core/apps/auth/package.json:41 | devDependencies | @originjs/vite-plugin-federation | ^1.3.5 | module-federation | Yes | adx-core/apps/auth/vite.config.ts:3-28 (the default Vite configuration imports `federation` and invokes it in plugins with `name: 'auth_app'`, `filename: 'remoteEntry.js'`, exposes and shared); adx-core/apps/auth/package.json:7-9 (`vite --port 3001 --host`, `tsc && vite build`, with no alternative configuration) |
| adx-core/apps/file/package.json:26 | devDependencies | @originjs/vite-plugin-federation | ^1.3.5 | module-federation | Yes | adx-core/apps/file/vite.config.ts:3-26 (imports `federation` and invokes it with `name: 'file_app'`, exposes and shared); adx-core/apps/file/package.json:7-9 (`vite --port 3003 --host`, `tsc && vite build`) |
| adx-core/apps/module/package.json:39 | devDependencies | @originjs/vite-plugin-federation | ^1.3.5 | module-federation | Yes | adx-core/apps/module/vite.config.ts:3-28 (imports `federation` and invokes it with `name: 'module_app'`, exposes and shared); adx-core/apps/module/package.json:7-9 (`vite --port 3006 --host`, `tsc && vite build`) |
| adx-core/apps/shell/package.json:40 | devDependencies | @originjs/vite-plugin-federation | ^1.3.5 | module-federation | Yes | adx-core/apps/shell/vite.config.ts:3-53 (imports `federation` and invokes it with `name: 'shell'`, remotes for the six apps and shared); adx-core/apps/shell/package.json:7-9 (`vite --port 3000 --host`, `tsc && vite build`); adx-core/apps/shell/src/App.tsx:16-21 (`React.lazy(() => import('auth_app/App'))` and other remotes) |
| adx-core/apps/tenant/package.json:36 | devDependencies | @originjs/vite-plugin-federation | ^1.3.5 | module-federation | Yes | adx-core/apps/tenant/vite.config.ts:3-27 (imports `federation` and invokes it with `name: 'tenant_app'`, exposes and shared); adx-core/apps/tenant/package.json:7-9 (`vite --port 3002 --host`, `tsc && vite build`) |
| adx-core/apps/user/package.json:26 | devDependencies | @originjs/vite-plugin-federation | ^1.3.5 | module-federation | Yes | adx-core/apps/user/vite.config.ts:3-26 (imports `federation` and invokes it with `name: 'user_app'`, exposes and shared); adx-core/apps/user/package.json:7-9 (`vite --port 3004 --host`, `tsc && vite build`) |
| adx-core/apps/workflow/package.json:26 | devDependencies | @originjs/vite-plugin-federation | ^1.3.5 | module-federation | Yes | adx-core/apps/workflow/vite.config.ts:3-26 (imports `federation` and invokes it with `name: 'workflow_app'`, exposes and shared); adx-core/apps/workflow/package.json:7-9 (`vite --port 3005 --host`, `tsc && vite build`) |

## Notes

- The `other_package_matches` for each row are the `vite.config.ts` files of the other six apps; each has
  its own `package.json` with the same dependency, so each row's evidence comes only from
  its own app's `vite.config.ts`.
- Outside the lists, the search for `vite-plugin-federation` in `.ts`, `.tsx`, `.js`, `.mjs` and `.json`
  found only the seven `vite.config.ts` and seven `package.json` files.
- The plugin configuration is used by each app's build, but several `exposes` point to
  files absent from the snapshot (e.g.: `adx-core/apps/file/vite.config.ts:13-15`,
  `adx-core/apps/user/vite.config.ts:13-15`, `adx-core/apps/workflow/vite.config.ts:13-15`,
  `adx-core/apps/tenant/vite.config.ts:13`, `adx-core/apps/module/vite.config.ts:15-17`), and
  `file`, `tenant`, `user` and `workflow` have no `index.html`. This affects build execution, not
  package configuration; the classification already records this gap.

