---
schema: 1
id: 996744917
full_name: varshinir07/mfe-onehub-shell-app
commit: 1ddddc4241157e335c1b6e39372f050aa1705c1d
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 211 — varshinir07/mfe-onehub-shell-app

## Mined constructs

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| src-remote-import | src/pages/Dashboard.jsx:3 | . | dynamic-loading | Yes | `React.lazy(() => import('remote1/ModemAuthorization'))` loads the module of remote `remote1`, mapped to `subscription@http://localhost:3001/remoteEntry.js` (src/webpack.config.js:76), a unit outside the snapshot. Active: Dashboard imported at src/App.js:3 (alias `@` at src/webpack.config.js:99) and rendered at src/App.js:8; App rendered at entry src/index.js:8-12 (`entry` at src/webpack.config.js:10). |
| src-remote-import | src/pages/Dashboard.jsx:4 | . | dynamic-loading | Yes | `React.lazy(() => import('remote1/SecurityPackage'))` loads the module of remote `remote1` (`subscription`, src/webpack.config.js:76), outside the snapshot; same active chain at src/App.js:3,8 and src/index.js:8-12. |
| src-remote-import | src/pages/Dashboard.jsx:6 | . | dynamic-loading | Yes | `React.lazy(() => import('remote2/LabourHourHold'))` loads the module of remote `remote2`, mapped to `ownership@http://localhost:3002/remoteEntry.js` (src/webpack.config.js:77), outside the snapshot; same active chain at src/App.js:3,8 and src/index.js:8-12. |
| src-remote-import | src/pages/Dashboard.jsx:7 | . | dynamic-loading | Yes | `React.lazy(() => import('remote2/MobileService'))` loads the module of remote `remote2` (`ownership`, src/webpack.config.js:77), outside the snapshot; same active chain at src/App.js:3,8 and src/index.js:8-12. |
| src-remote-import | src/pages/Dashboard.jsx:9 | . | dynamic-loading | Yes | `React.lazy(() => import('remote1/Card'))` loads component Card from remote `remote1` (`subscription`, src/webpack.config.js:76), outside the snapshot; same active chain at src/App.js:3,8 and src/index.js:8-12. |

## Constructs outside mining

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| manual | src/pages/Dashboard.jsx:16 | . | runtime-composition | Yes | Renders `<ModemAuthorization />` from remote `remote1` inside `React.Suspense` (src/pages/Dashboard.jsx:15-26); loaded at src/pages/Dashboard.jsx:3. |
| manual | src/pages/Dashboard.jsx:17 | . | runtime-composition | Yes | Renders `<SecurityPackage />` from remote `remote1` inside `React.Suspense` (src/pages/Dashboard.jsx:15-26); loaded at src/pages/Dashboard.jsx:4. |
| manual | src/pages/Dashboard.jsx:18 | . | runtime-composition | Yes | Renders `<LabourHourHold />` from remote `remote2` inside `React.Suspense` (src/pages/Dashboard.jsx:15-26); loaded at src/pages/Dashboard.jsx:6. |
| manual | src/pages/Dashboard.jsx:19 | . | runtime-composition | Yes | Renders `<MobileService />` from remote `remote2` inside `React.Suspense` (src/pages/Dashboard.jsx:15-26); loaded at src/pages/Dashboard.jsx:7. |
| manual | src/pages/Dashboard.jsx:22 | . | runtime-composition | Yes | Renders `<Card>` from remote `remote1` with props `topic` and `description` (src/pages/Dashboard.jsx:22-25); loaded at src/pages/Dashboard.jsx:9. |

## Summary

Constructs participating in composition: 10 (dynamic-loading: 5, runtime-composition: 5).

## Notes

- The files are in `src`, which the structural review judged `No` (part of application `.`); the unit is therefore `.`.
- Target units `subscription` (`remote1`) and `ownership` (`remote2`) are outside the snapshot and only appear at src/webpack.config.js:76-77.
- The step 4 search found no other constructs: no `customElements`, `iframe`, `postMessage`, `CustomEvent`, `BroadcastChannel` or script loading in src/ and public/; public/index.html has no script or tag from another unit.
