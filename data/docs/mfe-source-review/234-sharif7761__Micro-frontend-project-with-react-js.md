---
schema: 1
id: 1158060733
full_name: sharif7761/Micro-frontend-project-with-react-js
commit: cb2083fd77ddcb4d6493af653e0ce523ba0be010
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 234 — sharif7761/Micro-frontend-project-with-react-js

## Mined constructs

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| src-remote-import | core_simple/src/App.tsx:9 | core_simple | dynamic-loading | Yes | `lazy(() => import('users_simple/UserList'))` loads at runtime the module exposed by unit users_simple (`'./UserList': './src/App.tsx'` at users_simple/rsbuild.config.ts:11-13), resolved by remote `users_simple@http://localhost:3002/remoteEntry.js` (core_simple/rsbuild.config.ts:13); rendered in route `/users` at core_simple/src/App.tsx:59, inside `Suspense` (:56-61). App is mounted at core_simple/src/bootstrap.tsx:5-10, loaded by core_simple/src/index.tsx:1 |
| src-async-bootstrap | core_simple/src/index.tsx:1 | core_simple | dynamic-loading | No | `import('./bootstrap')` loads its own bootstrap (core_simple/src/bootstrap.tsx); internal to the unit |
| src-async-bootstrap | users_simple/src/index.tsx:1 | users_simple | dynamic-loading | No | `import('./bootstrap')` loads its own bootstrap (users_simple/src/bootstrap.tsx); internal to the unit |

## Constructs outside mining

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| manual | core_simple/src/App.tsx:15 | core_simple | runtime-composition | Yes | Renders `<Card>`, a component of unit common_simple, in the shell’s `Home` page (core_simple/src/App.tsx:15-23); comes from static import `common_simple/Card` at core_simple/src/App.tsx:6, resolved by remote `common_simple@http://localhost:3001/remoteEntry.js` (core_simple/rsbuild.config.ts:12) and exposed at common_simple/rsbuild.config.ts:13. `Home` is the element of route `/` (core_simple/src/App.tsx:58) |
| manual | core_simple/src/App.tsx:24 | core_simple | runtime-composition | Yes | Second rendering of `<Card>`, a component of unit common_simple, on the same `Home` page (core_simple/src/App.tsx:24-26), independent of :15; uses the same static import `common_simple/Card` (core_simple/src/App.tsx:6) |
| manual | core_simple/src/App.tsx:57 | core_simple | host-relationship | Yes | `Routes` declares where shell uses the other unit: `/` → local `Home` and `/users` → `UserList` from users_simple (core_simple/src/App.tsx:57-60), inside `BrowserRouter` and `Suspense` (:46, :56); navigation links at :49-50. App mounted at core_simple/src/bootstrap.tsx:5-10 |
| manual | users_simple/src/App.tsx:40 | users_simple | runtime-composition | Yes | Renders `<Button>`, a component of unit common_simple (users_simple/src/App.tsx:40-42); comes from static import `common_simple/Button` at users_simple/src/App.tsx:3, resolved by remote `common_simple@http://localhost:3001/remoteEntry.js` (users_simple/rsbuild.config.ts:15) and exposed at common_simple/rsbuild.config.ts:12. App is mounted at users_simple/src/bootstrap.tsx:5-10 and also exposed as `./UserList` (users_simple/rsbuild.config.ts:12) |
| manual | users_simple/src/App.tsx:49 | users_simple | runtime-composition | Yes | Renders `<Card>`, a component of unit common_simple, for each user (users_simple/src/App.tsx:48-53); comes from static import `common_simple/Card` at users_simple/src/App.tsx:5, resolved by the remote at users_simple/rsbuild.config.ts:15 and exposed at common_simple/rsbuild.config.ts:13 |

## Summary

Constructs participating in composition: 6 (dynamic-loading: 1, runtime-composition: 4, host-relationship: 1).

## Notes

- core_simple imports `common_simple/Button` (core_simple/src/App.tsx:4), but never renders `<Button>` in the file; there is therefore no Button row in shell.
- The step 4 search found only the three mining rows; no `public/index.html` has a `<script>` or `<iframe>`, and there are no custom elements or communication mechanism between units.
- common_simple does not consume other units: its App uses only local components (common_simple/src/App.tsx:2-3).
