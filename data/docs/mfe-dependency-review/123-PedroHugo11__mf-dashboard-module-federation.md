---
schema: 1
id: 1135167821
full_name: PedroHugo11/mf-dashboard-module-federation
commit: 184ec1b1762b6ea93f1f8f8de44118412a9ab6a8
inspection:
  output: data/inspections/mfe-dependencies-001
  version: "1"
  config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 123 — PedroHugo11/mf-dashboard-module-federation

## Dependencies

| Manifest:line | Section | Package | Version | Technology | Configured | Evidence (artifact:line) |
|---|---|---|---|---|---|---|
| mfe-counter/package.json:13 | dependencies | @originjs/vite-plugin-federation | ^1.4.1 | module-federation | Yes | mfe-counter/vite.config.ts:3 (`import federation from "@originjs/vite-plugin-federation"`); mfe-counter/vite.config.ts:12-21 (the default Vite configuration invokes `federation` in plugins with `name: "counter"`, `filename: "remoteEntry.js"`, `exposes` and `shared`); mfe-counter/package.json:6-10 (`dev`, `build` and `preview` run `vite` with no alternative configuration) |
| mfe-weather/package.json:13 | dependencies | @originjs/vite-plugin-federation | ^1.4.1 | module-federation | Yes | mfe-weather/vite.config.ts:3 (`import federation from "@originjs/vite-plugin-federation"`); mfe-weather/vite.config.ts:12-21 (the default Vite configuration invokes `federation` in plugins with `name: "weather"`, `filename: "remoteEntry.js"`, `exposes` and `shared`); mfe-weather/package.json:6-10 (`dev`, `build` and `preview` run `vite` with no alternative configuration) |
| shell/package.json:13 | dependencies | @originjs/vite-plugin-federation | ^1.4.1 | module-federation | Yes | shell/vite.config.ts:3 (`import federation from "@originjs/vite-plugin-federation"`); shell/vite.config.ts:12-20 (the default Vite configuration invokes `federation` in plugins with `remotes` weather/counter and `shared`); shell/package.json:6-10 (`dev`, `build` and `preview` run `vite` with no alternative configuration); shell/src/App.tsx:3-4 (`import("weather/Widget")` and `import("counter/Widget")`) |

## Notes

- Each package has its own `vite.config.ts` using the plugin; the `other_package_matches` occurrences belong to the other two packages and were not used as evidence for the row.
- The `grep` for `vite-plugin-federation` outside lockfiles found only the three manifests and three `vite.config.ts:3` files.

