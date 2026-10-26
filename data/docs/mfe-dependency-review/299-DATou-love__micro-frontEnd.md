---
schema: 1
id: 1088828444
full_name: DATou-love/micro-frontEnd
commit: 8e52e7d4fee1bc193922a8bea0f5ede7a0cb9942
inspection:
  output: data/inspections/mfe-dependencies-001
  version: "1"
  config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 299 — DATou-love/micro-frontEnd

## Dependencies

| Manifest:line | Section | Package | Version | Technology | Configured | Evidence (artifact:line) |
|---|---|---|---|---|---|---|
| main-vue3/package.json:12 | dependencies | qiankun | ^2.10.16 | qiankun | Yes | main-vue3/src/main.ts:3 (imports `registerMicroApps, start` from `'qiankun'`); main-vue3/src/main.ts:10-23 (invokes `registerMicroApps` with `sub-vue2` and `sub-react16`); main-vue3/src/main.ts:26-36 (invokes `start` with `strictStyleIsolation: true`); main-vue3/index.html:11 (the host entry point loads `/src/main.ts`) |

## Notes

- The sub-app side (`sub-vue2/src/main.js`, `sub-vue2/vue.config.js`) does not import the `qiankun` package; it only follows the contract (lifecycles, UMD output), and `sub-vue2/package.json` does not declare the package. The answer relies solely on the host.

