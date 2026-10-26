---
schema: 1
id: 1366618635
full_name: tonoizer/react-mf-patch-skew-repro
commit: 92739d5e61a09a9b31e6b53f0662f6f9e71b5e3a
inspection:
  output: data/inspections/mfe-dependencies-001
  version: "1"
  config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 309 — tonoizer/react-mf-patch-skew-repro

## Dependencies

| Manifest:line | Section | Package | Version | Technology | Configured | Evidence (artifact:line) |
|---|---|---|---|---|---|---|
| host/package.json:15 | devDependencies | @module-federation/vite | 1.21.6 | module-federation | Yes | host/vite.config.js:3 (`import { federation } from '@module-federation/vite'`); host/vite.config.js:19-36 (the default Vite configuration invokes `federation({ name: 'host', remotes: { remote_a, remote_b }, shared, ... })` in plugins); host/package.json:6 (the build runs `vite build` with no alternative configuration) |
| remote_a/package.json:15 | devDependencies | @module-federation/vite | 1.21.6 | module-federation | Yes | remote_a/vite.config.js:3 (`import { federation } from '@module-federation/vite'`); remote_a/vite.config.js:19-35 (the default Vite configuration invokes `federation({ name: 'remote_a', filename: 'remoteEntry.js', exposes: { './App' }, remotes: { remote_c }, shared, ... })`); remote_a/package.json:6 (the build runs `vite build` with no alternative configuration) |
| remote_b/package.json:15 | devDependencies | @module-federation/vite | 1.21.6 | module-federation | Yes | remote_b/vite.config.js:3 (`import { federation } from '@module-federation/vite'`); remote_b/vite.config.js:19-28 (the default Vite configuration invokes `federation({ name: 'remote_b', filename: 'remoteEntry.js', exposes: { './App' }, shared, ... })`); remote_b/package.json:6 (the build runs `vite build` with no alternative configuration) |
| remote_c/package.json:15 | devDependencies | @module-federation/vite | 1.21.6 | module-federation | Yes | remote_c/vite.config.js:3 (`import { federation } from '@module-federation/vite'`); remote_c/vite.config.js:19-28 (the default Vite configuration invokes `federation({ name: 'remote_c', filename: 'remoteEntry.js', exposes: { './App' }, shared, ... })`); remote_c/package.json:6 (the build runs `vite build` with no alternative configuration) |

## Notes

- The inspection lists cite lines 5-10 of each `vite.config.js`, which are the `shared` object (React singletons), rather than the import; the import is on line 3, outside the lists.
- Outside the `vite.config.js` files, the scope name appears only in `README.md:1` and `:24`, in `evidence/RESULT.json` and as the key of `Symbol.for('module-federation.shared-cache-owners')` in `host/src/App.jsx:11` and `scripts/capture.mjs:62`; none of these imports the package.
- The repository is a defect reproduction: the production build is the subject of the experiment and, according to `evidence/RESULT.json`, fails at runtime. This does not change the row judgment, which only asks whether the plugin is configured and in use in the build.

