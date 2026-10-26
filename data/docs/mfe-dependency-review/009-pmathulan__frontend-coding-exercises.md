---
schema: 1
id: 979173938
full_name: pmathulan/frontend-coding-exercises
commit: 89a3c271484ece4e37f719db9093c9157721a240
inspection:
  output: data/inspections/mfe-dependencies-001
  version: "1"
  config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-19
---

# 009 — pmathulan/frontend-coding-exercises

## Dependencies

| Manifest:line | Section | Package | Version | Technology | Configured | Evidence (artifact:line) |
|---|---|---|---|---|---|---|
| microfrontend-workspace/package.json:14 | dependencies | @angular-architects/module-federation | ^19.0.3 | module-federation | Yes | microfrontend-workspace/projects/shell/webpack.config.js:1-16 (`withModuleFederationPlugin` and `shareAll` imported and invoked); microfrontend-workspace/angular.json:18 and microfrontend-workspace/angular.json:41-42 (builder `ngx-build-plus:browser` and shell configuration); microfrontend-workspace/angular.json:60 (production configuration); microfrontend-workspace/projects/shell/webpack.prod.config.js:1 (reuses `webpack.config`) |

## Notes

- The mfe2 route in microfrontend-workspace/projects/shell/src/app/app.routes.ts:14-21 is commented out. The mfe1 route at :5-12 uses loadRemoteModule; the judgment is already supported by the active build configuration.
- projects/shell/ and projects/mfe1/ have no package.json of their own in the snapshot; they belong to the microfrontend-workspace/ package.

