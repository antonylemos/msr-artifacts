---
schema: 1
id: 1028839722
full_name: mrgleam/mf-tanstack-demo
commit: a7175973b0594cecfd32126b0bb65e71c627a6c3
inspection:
  output: data/inspections/mfe-dependencies-001
  version: "1"
  config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-19
---

# 045 — mrgleam/mf-tanstack-demo

## Dependencies

| Manifest:line | Section | Package | Version | Technology | Configured | Evidence (artifact:line) |
|---|---|---|---|---|---|---|
| shell/package.json:16 | devDependencies | @originjs/vite-plugin-federation | ^1.4.1 | module-federation | Yes | shell/vite.config.ts:2-14 (the default Vite configuration imports `federation` and invokes it in plugins with remotes and shared); shell/package.json:5-8 (the build runs `vite build` with no alternative configuration) |
| shop/package.json:17 | devDependencies | @originjs/vite-plugin-federation | ^1.4.1 | module-federation | Yes | shop/vite.config.ts:2-15 (the default Vite configuration imports `federation` and invokes it in plugins with exposes and shared); shop/package.json:5-8 (the build runs `vite build` with no alternative configuration) |
