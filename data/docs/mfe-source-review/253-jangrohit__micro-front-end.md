---
schema: 1
id: 1176812762
full_name: jangrohit/micro-front-end
commit: c6c0dbc9fb78b8baab20e74394647ca40b521355
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 253 — jangrohit/micro-front-end

## Mined constructs

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| src-async-bootstrap | packages/container/src/index.js:1 | packages/container | dynamic-loading | No | packages/container/src/index.js:1 imports the unit’s own bootstrap (`import("./bootstrap")`). |
| src-async-bootstrap | packages/marketing/src/index.js:1 | packages/marketing | dynamic-loading | No | packages/marketing/src/index.js:1 imports the unit’s own bootstrap (`import("./bootstrap")`). |
| src-mount-export | packages/marketing/src/bootstrap.js:17 | packages/marketing | runtime-composition | Yes | Exports `mount` (defined at packages/marketing/src/bootstrap.js:5-7, renders `App` on the received element), exposed as `./MarketingApp` at packages/marketing/config/webpack.prod.js:22-23 (and webpack.dev.js:18-19) and consumed by the host at packages/container/src/components/MarketingApp.js:3 and :9. |
| src-mount-call | packages/container/src/components/MarketingApp.js:9 | packages/container | runtime-composition | Yes | Mounts unit packages/marketing in the wrapper’s `div` (`mount(ref.current)`), with `mount` imported from `marketing/MarketingApp` at :3; remote declared at packages/container/config/webpack.prod.js:21-22; wrapper rendered at packages/container/src/App.js:19, App started at packages/container/src/bootstrap.js:5 and bootstrap loaded by packages/container/src/index.js:1. The wrapper only passes the element, without callbacks. |
| src-mount-import | packages/container/src/components/MarketingApp.js:3 | packages/container | runtime-composition | Yes | Imports `mount` from remote `marketing/MarketingApp` (unit packages/marketing); invoked at packages/container/src/components/MarketingApp.js:9, active through the chain described in the preceding row. |

## Constructs outside mining

No additional constructs.

## Summary

Constructs participating in composition: 3 (runtime-composition: 3).

## Notes

- The step 4 search in the two units’ `.js` and `.html` files found only the already mined rows and packages/marketing/src/bootstrap.js:12 (`mount(devRoot)`), the unit’s own isolated development mount (packages/marketing/src/bootstrap.js:9-13), which is not composition. There is no remote `import()`, custom element, iframe or communication mechanism.
- `<MarketingApp />` at packages/container/src/App.js:19 renders the host’s local wrapper, whose remote mount is already the src-mount-call row; the host has no route table naming units, so there is no `host-relationship` row.
- packages/auth and packages/dashboard are `No` in the structural review and have no source code in the snapshot.
