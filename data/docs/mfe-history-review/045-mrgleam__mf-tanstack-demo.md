---
schema: 1
id: 1028839722
full_name: mrgleam/mf-tanstack-demo
commit: a7175973b0594cecfd32126b0bb65e71c627a6c3
inputs:
  clone: data/samples/mfe-sample-001/repos/mrgleam__mf-tanstack-demo
annotation:
  method: manual
  status: final
  date: 2026-10-21
---

# 045 — mrgleam/mf-tanstack-demo

## Repository overview

History up to snapshot has 5 commits, from 2025-07-30 to 2025-08-01, without merges.
- **`04bfb96` (2025-07-30, "first commit"):** first observed project record.
- **Next two commits, same day:** change how shell receives shop routes.
- **`75fe189` (2025-08-01):** message announces SSL and port changes in Kong.
- **`a717597` (2025-08-01, snapshot):** creates `shell/src/moduleLoader.ts` and modifies `shell/src/router.tsx`. Message announces loader with caching and "retry logic" and asynchronous loading of federated modules.

Previous `router.tsx` versions are unavailable (e.g.: `1816f5b:shell/src/router.tsx` fails because of missing object).

## Points

| # | Point | Origin | Question | Commits | Result |
|---|---|---|---|---|---|
| 1 | Shell reads `default.routes` of remote module, while shop only exports named `routes` | 3.4.4 (shell/src/router.tsx:64); 3.4.7 #5 | conflicting stages | 04bfb96 2025-07-30 first commit; 5633835 2025-07-30 Remove unused shopRoute definition from router.tsx and adjust shopRoutes import handling.; 1816f5b 2025-07-30 Add utility function to replace parent routes in router and update ShopRoutes import; a717597 2025-08-01 Add Module Federation Loader with caching and retry logic; enhance router to load federated modules asynchronously | inconclusive |
| 2 | Loader announces "retry logic", but attempts await same promise | 3.4.7 #7 | conflicting stages | a717597 2025-08-01 Add Module Federation Loader with caching and retry logic; enhance router to load federated modules asynchronously | clarified |

## Observations

**1. Shell reads `default.routes` of remote module, while shop only exports named `routes`.** The `shop/src/routes/ShopRoutes.tsx` has not changed since first commit, and that commit’s version, available in clone, already exports only named `routes` and `shopRouter`. Thus shop never had a default export. Shell `router.tsx` changed in four commits, last being snapshot commit alongside loader creation. Messages of `5633835` and `1816f5b` announce adjustments to importing `ShopRoutes`, but previous `router.tsx` versions are unavailable. Whether earlier shell read named export and mismatch arose in `a717597` cannot be known.

**2. Loader announces "retry logic", but attempts await same promise.** The `shell/src/moduleLoader.ts` is created in `a717597`, snapshot commit, without another historical version. Retry loop awaiting same promise belongs to file’s only version. Commit message and opening comment announce "retry", and code never repeated import. No stage where retry worked exists.

## Commands

```
docs/mfe-history-review/tools/hist.sh mrgleam__mf-tanstack-demo rev-list --count a7175973b0594cecfd32126b0bb65e71c627a6c3
docs/mfe-history-review/tools/hist.sh mrgleam__mf-tanstack-demo rev-list --count --merges a7175973b0594cecfd32126b0bb65e71c627a6c3
docs/mfe-history-review/tools/hist.sh mrgleam__mf-tanstack-demo log --reverse --format='%h %ad %s' --date=short a7175973b0594cecfd32126b0bb65e71c627a6c3
docs/mfe-history-review/tools/hist.sh mrgleam__mf-tanstack-demo log --format='%h %ad' --date=short a7175973b0594cecfd32126b0bb65e71c627a6c3 -- shop/src/routes/ShopRoutes.tsx
docs/mfe-history-review/tools/hist.sh mrgleam__mf-tanstack-demo show 04bfb96:shop/src/routes/ShopRoutes.tsx
docs/mfe-history-review/tools/hist.sh mrgleam__mf-tanstack-demo log --format='%h %ad' --date=short a7175973b0594cecfd32126b0bb65e71c627a6c3 -- shell/src/router.tsx
docs/mfe-history-review/tools/hist.sh mrgleam__mf-tanstack-demo show 04bfb96:shell/src/router.tsx   # failure: missing object
docs/mfe-history-review/tools/hist.sh mrgleam__mf-tanstack-demo show 5633835:shell/src/router.tsx   # failure: missing object
docs/mfe-history-review/tools/hist.sh mrgleam__mf-tanstack-demo show 1816f5b:shell/src/router.tsx   # failure: missing object
docs/mfe-history-review/tools/hist.sh mrgleam__mf-tanstack-demo log --format='%h %ad' --date=short a7175973b0594cecfd32126b0bb65e71c627a6c3 -- shell/src/moduleLoader.ts
docs/mfe-history-review/tools/hist.sh mrgleam__mf-tanstack-demo show --name-status --no-renames --format='== %h' a717597
```

## Summary

Commits up to the snapshot: 5 (2025-07-30 to 2025-08-01). Points: 2 (clarified: 1, inconclusive: 1, resolved by the snapshot: 0).
