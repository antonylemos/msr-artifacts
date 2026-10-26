---
schema: 1
id: 1104733457
full_name: riponcc/Group4COMP308Project
commit: 59db8c8172c1e0efde31fe32c5135226a41cd044
inspection:
  output: data/inspections/mfe-dependencies-001
  version: "1"
  config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 232 — riponcc/Group4COMP308Project

## Dependencies

| Manifest:line | Section | Package | Version | Technology | Configured | Evidence (artifact:line) |
|---|---|---|---|---|---|---|
| client/issue-app/package.json:15 | dependencies | @originjs/vite-plugin-federation | ^1.3.5 | module-federation | Yes | client/issue-app/vite.config.js:4 (`import federation from '@originjs/vite-plugin-federation'`); client/issue-app/vite.config.js:14-26 (the default Vite configuration invokes `federation` with `name: 'issueApp'`, `exposes: { './App': './src/App' }` and shared); client/issue-app/package.json:7-10 (dev, build and preview run `vite` with no alternative configuration) |
| client/shell-app/package.json:14 | dependencies | @originjs/vite-plugin-federation | ^1.3.5 | module-federation | Yes | client/shell-app/vite.config.js:30 (`import federation from '@originjs/vite-plugin-federation'`); client/shell-app/vite.config.js:36-50 (the default Vite configuration invokes `federation` with `name: 'shellApp'`, remotes `userApp` and `issueApp` and shared); client/shell-app/package.json:7-10 (dev, build and preview run `vite` with no alternative configuration) |
| client/user-app/package.json:15 | dependencies | @originjs/vite-plugin-federation | ^1.4.1 | module-federation | Yes | client/user-app/vite.config.js:5 (`import federation from '@originjs/vite-plugin-federation'`); client/user-app/vite.config.js:10-17 (the default Vite configuration invokes `federation` with `name: 'userApp'`, `exposes: { './App': './src/App' }` and shared); client/user-app/package.json:7-10 (dev, build and preview run `vite` with no alternative configuration) |

## Notes

- `client/shell-app/vite.config.js:1-26` is an earlier version of the configuration, entirely commented out (only `userApp` in remotes). The inspection matches at `:9`, `:11` and `:15-19` fall in that block; the active configuration is at `:28-56`.

