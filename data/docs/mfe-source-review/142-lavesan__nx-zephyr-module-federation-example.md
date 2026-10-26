---
schema: 1
id: 999205690
full_name: lavesan/nx-zephyr-module-federation-example
commit: 766b6a2c04c1ef39201ad05ed1b5970d4cb10436
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 142 — lavesan/nx-zephyr-module-federation-example

## Mined constructs

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| src-remote-import | apps/shell/src/App.tsx:6 | apps/shell | dynamic-loading | Yes | `lazy(() => import("courses/App"))` loads at runtime module `./App` of unit apps/courses (exposed at apps/courses/module-federation.config.ts:7-9), resolved by remote `courses@${COURSES_URL}/remoteEntry.js` at apps/shell/module-federation.config.ts:21. Active: apps/shell/src/index.tsx:1 → apps/shell/src/bootstrap.tsx:3,10 → `Courses` rendered at apps/shell/src/App.tsx:20. |
| src-remote-import | apps/shell/src/App.tsx:7 | apps/shell | dynamic-loading | Yes | `lazy(() => import("profile/App"))` loads at runtime module `./App` of unit apps/profile (exposed at apps/profile/module-federation.config.ts:7-9), resolved by remote `profile@${PROFILE_URL}/remoteEntry.js` at apps/shell/module-federation.config.ts:22. Active through the same chain; `Profile` rendered at apps/shell/src/App.tsx:21. |
| src-async-bootstrap | apps/courses/src/index.tsx:1 | apps/courses | dynamic-loading | No | `import('./bootstrap')` loads its own bootstrap (apps/courses/src/bootstrap.tsx:5-13); internal to the unit. |
| src-async-bootstrap | apps/shell/src/index.tsx:1 | apps/shell | dynamic-loading | No | `import("./bootstrap")` loads its own bootstrap (apps/shell/src/bootstrap.tsx:5-13); internal to the unit. |

## Constructs outside mining

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| manual | apps/shell/src/App.tsx:18 | apps/shell | host-relationship | Yes | `Routes` declares the paths where shell uses the other units: `/courses*` → `Courses` and `/profile*` → `Profile`, with a redirect from `/` to `/courses` (apps/shell/src/App.tsx:18-22), inside `BrowserRouter` and `Suspense` (apps/shell/src/App.tsx:13-17); App mounted at apps/shell/src/bootstrap.tsx:10. Navigation links are at apps/shell/src/components/Header.tsx:16-43. |
| manual | apps/shell/src/App.tsx:20 | apps/shell | runtime-composition | Yes | The route element renders `<Courses />`, a component of unit apps/courses resolved through the remote import at apps/shell/src/App.tsx:6. |
| manual | apps/shell/src/App.tsx:21 | apps/shell | runtime-composition | Yes | The route element renders `<Profile />`, a component of unit apps/profile resolved through the remote import at apps/shell/src/App.tsx:7. |

## Summary

Constructs participating in composition: 5 (dynamic-loading: 2, host-relationship: 1, runtime-composition: 2).

## Notes

- apps/profile/src/index.tsx:1 imports `./bootstrap` statically (`import "./bootstrap"`), so it does not appear as `src-async-bootstrap`; it is not a composition construct.
- There is no communication mechanism between units (no `CustomEvent`, `postMessage`, `BroadcastChannel` or shared bus) in the three units’ code files.
- The remote URLs come from `VITE_COURSES_URL`/`VITE_PROFILE_URL` or the defaults at apps/shell/module-federation.config.ts:7-15; both targets are in the snapshot (apps/courses, apps/profile).
