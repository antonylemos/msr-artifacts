---
schema: 1
id: 1101991974
full_name: Marcel-b-velop/vue-mf
commit: ed270d34b0542cb1a0ce26aafc2aeba4bca994e1
inspection:
  output: data/inspections/mfe-dependencies-001
  version: "1"
  config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 185 — Marcel-b-velop/vue-mf

## Dependencies

| Manifest:line | Section | Package | Version | Technology | Configured | Evidence (artifact:line) |
|---|---|---|---|---|---|---|
| app-1/package.json:14 | dependencies | @originjs/vite-plugin-federation | ^1.4.1 | module-federation | Yes | app-1/vite.config.ts:2 (`import federation from "@originjs/vite-plugin-federation"`); app-1/vite.config.ts:11-27 (`federation({ name: "remote-app1", ... exposes: { "./App1": ... }, remotes: { "remote-lib": ... }, shared })` in `plugins`); app-1/package.json:8 (the build runs `vite build`, which reads the default configuration); app-1/src/main.ts:8 (consumes `remote-lib/apiClient`) |
| app-2/package.json:14 | dependencies | @originjs/vite-plugin-federation | ^1.4.1 | module-federation | Yes | app-2/vite.config.ts:2 (`import federation from "@originjs/vite-plugin-federation"`); app-2/vite.config.ts:11-30 (`federation({ name: "remote-app2", ... exposes: { "./App2", "./Home", "./LoginForm", "./RegisterForm" }, remotes: { "remote-lib": ... }, shared })` in `plugins`); app-2/package.json:8 (the build runs `vite build`, which reads the default configuration) |
| host/package.json:24 | devDependencies | @originjs/vite-plugin-federation | ^1.4.1 | module-federation | Yes | host/vite.config.ts:2 (`import federation from "@originjs/vite-plugin-federation"`); host/vite.config.ts:11-26 (`federation({ name: "host-app", remotes: { "remote-app1", "remote-app2", "remote-lib" }, shared })` in `plugins`); host/package.json:8 (the build runs `vite build`, which reads the default configuration); host/src/main.ts:12-14 (`import("remote-app1/App1")`, `remote-app2/App2`, `remote-lib/Confirm`) |
| lib/package.json:20 | dependencies | @originjs/vite-plugin-federation | ^1.4.1 | module-federation | Yes | lib/vite.config.ts:2 (`import federation from "@originjs/vite-plugin-federation"`); lib/vite.config.ts:17-32 (`federation({ name: "remote-lib", ... exposes: { "./Confirm", "./apiClient", "./types" }, shared })` in `plugins`); lib/package.json:11 (the build runs `vite build`, which reads the default configuration) |

## Notes

- The search for the package name outside the inspection lists (grep in the snapshot, excluding lockfiles and `lib/playwright-report/`) finds only the four `package.json` and four `vite.config.ts` files already listed.
- `lib/vite.config.ts:1` imports `defineConfig` from `vitest/config`, which also serves `vite build`; it does not change the judgment.

