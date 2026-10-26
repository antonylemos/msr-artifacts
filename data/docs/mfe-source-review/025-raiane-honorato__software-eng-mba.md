---
schema: 1
id: 1247892038
full_name: raiane-honorato/software-eng-mba
commit: c569ccc6582475495a637d44ceed33c62c0f6e86
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 025 — raiane-honorato/software-eng-mba

## Mined constructs

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| src-remote-import | apps/repack-poc/host/App.tsx:26 | apps/repack-poc/host | dynamic-loading | Yes | `React.lazy(() => import('remote/HelloScreen'))` loads at runtime the module exposed by unit apps/repack-poc/remote (`exposes: { './HelloScreen' }` at apps/repack-poc/remote/rspack.config.mjs:40); remote declared as `remote@http://localhost:9001/${platform}/mf-manifest.json` at apps/repack-poc/host/rspack.config.mjs:45; active chain apps/repack-poc/host/rspack.config.mjs:21 (`entry: './index.js'`) → apps/repack-poc/host/index.js:9 → apps/repack-poc/host/App.tsx:21. |
| src-remote-import | apps/repack/packages/host/src/screens/CheckInTab.tsx:12 | apps/repack/packages/host | dynamic-loading | Yes | `import('checkin/CheckInStack')` inside `React.lazy` (apps/repack/packages/host/src/screens/CheckInTab.tsx:11-13) loads at runtime the module exposed by unit apps/repack/packages/check-in (`exposes: { './CheckInStack' }` at apps/repack/packages/check-in/rspack.config.mjs:46); remote `checkin@http://localhost:9001/${platform}/mf-manifest.json` at apps/repack/packages/host/rspack.config.mjs:50; active chain apps/repack/packages/host/rspack.config.mjs:22 → apps/repack/packages/host/index.js:9 → apps/repack/packages/host/App.tsx:20 → apps/repack/packages/host/src/navigation/RootNavigator.tsx:53. |
| src-remote-import | apps/repack/packages/host/src/screens/DashboardTab.tsx:9 | apps/repack/packages/host | dynamic-loading | Yes | `import('dashboard/DashboardStack')` inside `React.lazy` (apps/repack/packages/host/src/screens/DashboardTab.tsx:8-10) loads at runtime the module exposed by unit apps/repack/packages/dashboard (`exposes: { './DashboardStack' }` at apps/repack/packages/dashboard/rspack.config.mjs:44); remote `dashboard@http://localhost:9002/${platform}/mf-manifest.json` at apps/repack/packages/host/rspack.config.mjs:51; same chain as CheckInTab, tab at apps/repack/packages/host/src/navigation/RootNavigator.tsx:52. |
| src-html-external-script | UX/confirma_o_de_check_in/code.html:15 | — | none | No | `<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries">` loads the Tailwind CDN in a UI mockup rather than another unit’s bundle; UX/ is not an application directory in the structural review. |
| src-html-external-script | UX/dashboard_check_in_ativo_4/code.html:7 | — | none | No | The same `<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries">` from the Tailwind CDN in a UI mockup. |
| src-html-external-script | UX/dashboard_p_s_treino_2/code.html:7 | — | none | No | The same `<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries">` from the Tailwind CDN in a UI mockup. |
| src-html-external-script | UX/dashboard_p_s_treino_menu_unificado/code.html:7 | — | none | No | The same `<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries">` from the Tailwind CDN in a UI mockup. |
| src-html-external-script | UX/finaliza_o_de_treino/code.html:7 | — | none | No | The same `<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries">` from the Tailwind CDN in a UI mockup. |
| src-html-external-script | UX/listagem_de_academias/code.html:7 | — | none | No | The same `<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries">` from the Tailwind CDN in a UI mockup. |

## Constructs outside mining

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| manual | apps/repack-poc/host/App.tsx:35 | apps/repack-poc/host | runtime-composition | Yes | Mounts `<HelloScreen />`, a component of unit apps/repack-poc/remote, inside `ErrorBoundary` + `Suspense` (apps/repack-poc/host/App.tsx:33-37); the component comes from the import at apps/repack-poc/host/App.tsx:26. |
| manual | apps/repack/packages/host/src/screens/CheckInTab.tsx:21 | apps/repack/packages/host | runtime-composition | Yes | Mounts `<CheckInStack />`, a component of unit apps/repack/packages/check-in, inside `ErrorBoundary` + `React.Suspense` (apps/repack/packages/host/src/screens/CheckInTab.tsx:19-23); the component comes from the import at apps/repack/packages/host/src/screens/CheckInTab.tsx:12. |
| manual | apps/repack/packages/host/src/screens/DashboardTab.tsx:16 | apps/repack/packages/host | runtime-composition | Yes | Mounts `<DashboardStack />`, a component of unit apps/repack/packages/dashboard, inside `ErrorBoundary` + `React.Suspense` (apps/repack/packages/host/src/screens/DashboardTab.tsx:14-18); the component comes from the import at apps/repack/packages/host/src/screens/DashboardTab.tsx:9. |
| manual | apps/repack/packages/host/src/navigation/RootNavigator.tsx:52 | apps/repack/packages/host | host-relationship | Yes | The `Tab.Navigator` declares where each mini-app enters the host UI: `Home` tab → `DashboardTab` and `FindGyms` tab → `CheckInTab` (apps/repack/packages/host/src/navigation/RootNavigator.tsx:52-53), the two wrappers that load the `dashboard` and `checkin` remotes; navigator mounted at apps/repack/packages/host/App.tsx:19-21. |
| manual | apps/repack/packages/store/src/checkInStore.ts:33 | — | communication | Yes | `useCheckInStore` (Zustand) is the shared state channel between units: declared a Module Federation singleton for host and mini-apps at apps/repack/packages/shared-deps/sharedDeps.mjs:53 and 76, provided eager by the host (apps/repack/packages/host/rspack.config.mjs:54) and consumed eager:false by the mini-apps (apps/repack/packages/check-in/rspack.config.mjs:48, apps/repack/packages/dashboard/rspack.config.mjs:46); written by check-in in the `startCheckIn` call at apps/repack/packages/check-in/src/screens/CheckInConfirmationScreen.tsx:52 (action obtained from the store at apps/repack/packages/check-in/src/screens/CheckInConfirmationScreen.tsx:36, defined with `set({...})` at apps/repack/packages/store/src/checkInStore.ts:41-48) and read by dashboard at apps/repack/packages/dashboard/src/navigation/DashboardStack.tsx:12-13, which chooses the screen according to check-in state (apps/repack/packages/dashboard/src/navigation/DashboardStack.tsx:15-16). |

## Summary

Constructs participating in composition: 8 (dynamic-loading: 3, runtime-composition: 3, host-relationship: 1, communication: 1).

## Notes

- The repository has four application sets (README.md:27-33): the monolith × Turborepo × Re.Pack comparison and the `apps/repack-poc/` PoC. Only the Re.Pack versions (`apps/repack/packages/` and `apps/repack-poc/`) compose units at runtime; the Turborepo version integrates features at build-time through workspace package imports (apps/turborepo/apps/mygym/src/navigation/RootNavigator.tsx:1-2), and the `@mygym/feature-*` packages are `No` in the structural review, so they do not generate rows.
- The six `src-html-external-script` occurrences are all from the same Tailwind CDN in `UX/` UI mockups, a recurring false positive of the pattern in this repository; `UX/kinetic_velocity` has only `DESIGN.md`, without HTML.
- The target units of the loads are in the snapshot, but the remote URLs are `localhost:9001`/`localhost:9002`, resolved through per-platform `mf-manifest.json` files generated during the build; there is no versioned manifest in the snapshot.
- Under step 4, the following remain outside the table: the `ErrorBoundary` around each remote (apps/repack/packages/host/src/ErrorBoundary.tsx), the `export` of the exposed stacks (exposure is in the `rspack.config.mjs`) and the other `useCheckInStore` usage points in the check-in and dashboard screens, already covered by the mechanism row.
- The units are React Native apps rather than web apps; the mobile × web scope decision remains open in the classification (docs/mfe-classification/025-raiane-honorato__software-eng-mba.md) and does not change the constructs recorded here.
