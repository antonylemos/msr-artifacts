---
schema: 1
id: 1028839722
full_name: mrgleam/mf-tanstack-demo
commit: a7175973b0594cecfd32126b0bb65e71c627a6c3
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-21
---

# 045 — mrgleam/mf-tanstack-demo

## Mined constructs

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| src-remote-import | shell/src/moduleLoader.ts:130 | shell | dynamic-loading | Yes | Imports shop/ShopRoutes at shell/src/moduleLoader.ts:127-136; registry used by shell/src/router.tsx:52-57, reached from the shell/src/main.tsx:4-7 entry. |

## Constructs outside mining

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| manual | shell/src/moduleLoader.ts:127 | shell | host-relationship | Yes | MODULE_CONFIGS declares shop/ShopRoutes as a module used by the shell and defines a fallback (shell/src/moduleLoader.ts:127-136); configuration selected at shell/src/router.tsx:52-57. |
| manual | shell/src/router.tsx:52 | shell | remote-resolution | Yes | Requests the configured shop module from ModuleLoader, with caching and failure handling at shell/src/moduleLoader.ts:26-98; function reached through shell/src/router.tsx:87 and shell/src/router.tsx:116. |
| manual | shell/src/router.tsx:64 | shell | runtime-composition | Undetermined | Attempts to extract result.module.default.routes from the remote module (shell/src/router.tsx:61-68), but shop/src/routes/ShopRoutes.tsx:49-53 only exports routes and shopRouter by name, without default. Compatibility for integrating the routes is not established. |

## Summary

Constructs participating in composition: 3 (dynamic-loading: 1, host-relationship: 1, remote-resolution: 1).

## Notes

- The active chain is shell/src/main.tsx:4-7 → shell/src/router.tsx:116 → createRouterAsync/loadFederatedModules → MODULE_CONFIGS.shop at shell/src/moduleLoader.ts:127-136. The remote import occurrence is Yes: the module is requested regardless of the compatibility of the exported routes.
- Point of doubt: the consumer requires default.routes, but shop/src/routes/ShopRoutes.tsx:49-53 does not provide export default. The file is exposed directly at shop/vite.config.ts:12. The intended route integration therefore remains Undetermined; the classification was not changed.
- The shop’s own routes and its standalone mount at shop/src/main.tsx:4-7 are internal to the unit. No event-based communication between units was found in the searches.
- Under the criteria for constructs outside mining (method step 4), integration of the remote routes is one row (shell/src/router.tsx:64); subsequent steps, reassignment through `replaceParentRoute` at shell/src/router.tsx:92 and addition to the tree at shell/src/router.tsx:99-103, depend on the same incompatible extraction.
