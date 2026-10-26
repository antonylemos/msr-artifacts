---
schema: 1
id: 1145815182
full_name: fudoyoki/ai-portal-mfe-example
commit: f1fd5b0a988c45334a49d3992ebc84cb6ea5ae94
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 128 — fudoyoki/ai-portal-mfe-example

## Mined constructs

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| src-remote-import | apps/shell/src/App.tsx:7 | apps/shell | dynamic-loading | Yes | `React.lazy` loads at runtime module `mfeDashboard/DashboardApp`, exposed by apps/mfe-dashboard (apps/mfe-dashboard/vite.config.ts:12-17); remote `mfeDashboard` points to the `remoteEntry.js` on port 3001 or the CDN (apps/shell/vite.config.ts:17-23 and 30-31). Active: the component is rendered in the `/dashboard/*` route (apps/shell/src/App.tsx:167-176), and `App` is mounted at apps/shell/src/main.tsx:8-16. |

## Constructs outside mining

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| manual | apps/shell/src/App.tsx:165 | apps/shell | host-relationship | Yes | The shell route table declares `/dashboard/*` for remote `DashboardApp` (apps/shell/src/App.tsx:165-179); `/chat/*` and `/tools/*` only render local placeholder `ComingSoon` (apps/shell/src/App.tsx:177-178). `AppRoutes` is used by `App` at apps/shell/src/App.tsx:184-189. |
| manual | apps/shell/src/App.tsx:172 | apps/shell | runtime-composition | Yes | Renders remote component `DashboardApp` from apps/mfe-dashboard inside `MfeErrorBoundary` and `Suspense` (apps/shell/src/App.tsx:170-174), passing `user` from the shell’s `AuthContext` and `basePath="/dashboard"`; the component comes from `React.lazy` at apps/shell/src/App.tsx:7. |

## Summary

Constructs participating in composition: 3 (dynamic-loading: 1, host-relationship: 1, runtime-composition: 1).

## Notes

- Besides the mined row, the step 4 search found only `import('tailwindcss')` in JSDoc type comments (apps/shell/tailwind.config.js:1, apps/mfe-dashboard/tailwind.config.js:1), which are not composition constructs.
- The `mfeChat`, `mfeTools` and `mfeAdmin` remotes are only commented out at apps/shell/vite.config.ts:32-35, without code in the snapshot.
