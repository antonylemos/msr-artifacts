---
schema: 1
id: 1009749841
full_name: AlanOlimpio/list
commit: 6ff9bfa3a94bb5920f60aabacc8f56298cbf4326
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-21
---

# 040 — AlanOlimpio/list

## Mined constructs

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| src-remote-import | src/components/ListRoutes/ListRoutes.js:5 | . | dynamic-loading | Yes | React.lazy imports RegisterApp/ModalRegister at src/components/ListRoutes/ListRoutes.js:5; component used by the route at src/components/ListRoutes/ListRoutes.js:11; ListRoutes is mounted by the entry at src/bootstrap.js:5-12. |
| src-async-bootstrap | src/index.js:1 | . | dynamic-loading | No | src/index.js:1 imports the unit’s own local bootstrap. |

## Constructs outside mining

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| manual | src/components/ListRoutes/ListRoutes.js:9 | . | host-relationship | Yes | Routes declares the /register point for the remote ModalRegister component (src/components/ListRoutes/ListRoutes.js:9-12); router and ListRoutes are started at src/bootstrap.js:9-13. |
| manual | src/components/ListRoutes/ListRoutes.js:11 | . | runtime-composition | Yes | The route’s element renders ModalRegister, imported from the external unit at src/components/ListRoutes/ListRoutes.js:5; the content is placed in Outlet in the List layout at src/components/List/List.js:82-84. |

## Summary

Constructs participating in composition: 3 (dynamic-loading: 1, host-relationship: 1, runtime-composition: 1).

## Notes

- The external RegisterApp unit has a URL at webpack.config.js:52-54 and is not in the snapshot. The Unit of the rows is ., corresponding to the local application rather than the external remote.
- webpack.config.js:49-50 exposes ListRoutes, but there is no consumer of this module in the snapshot. The ordinary ListRoutes export was not added as a second composition relationship without an observable consumer.
- The active chain is src/index.js:1 → src/bootstrap.js:5-12 → src/components/ListRoutes/index.js:1-2 → src/components/ListRoutes/ListRoutes.js:5-11. No point of doubt about loading ModalRegister.
