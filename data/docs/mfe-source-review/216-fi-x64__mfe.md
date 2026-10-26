---
schema: 1
id: 1133729895
full_name: fi-x64/mfe
commit: fa4088ae3313734c98a027db5fccfee4db34a46d
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 216 — fi-x64/mfe

## Mined constructs

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| src-async-bootstrap | packages/container/src/index.js:1 | packages/container | dynamic-loading | No | `import('./bootstrap')` loads the container’s own local bootstrap (packages/container/src/bootstrap.js:1-5); internal to the unit. |
| src-async-bootstrap | packages/marketing/src/index.js:1 | packages/marketing | dynamic-loading | No | `import('./bootstrap')` loads marketing’s own local bootstrap (packages/marketing/src/bootstrap.js:1-22); internal to the unit. |
| src-mount-export | packages/marketing/src/bootstrap.js:22 | packages/marketing | runtime-composition | Yes | Exports `mount(el)`, which renders the marketing App on the received element (packages/marketing/src/bootstrap.js:6-8); `./src/bootstrap` is exposed as `./MarketingApp` at packages/marketing/config/webpack.prod.js:16-18 and packages/marketing/config/webpack.dev.js:19-21 and consumed by container at packages/container/src/components/MarketingApp.js:1 and :8. |
| src-mount-call | packages/container/src/components/MarketingApp.js:8 | packages/container | runtime-composition | Yes | Mounts remote `marketing` on the wrapper’s `ref`, inside `useEffect` (packages/container/src/components/MarketingApp.js:5-11); remote declared at packages/container/config/webpack.prod.js:17-19 (`${domain}/marketing/latest/remoteEntry.js`) and packages/container/config/webpack.dev.js:18-20 (`http://localhost:8081/remoteEntry.js`); wrapper rendered at packages/container/src/App.js:11, App rendered at packages/container/src/bootstrap.js:5, loaded by entry packages/container/src/index.js:1. |
| src-mount-import | packages/container/src/components/MarketingApp.js:1 | packages/container | runtime-composition | Yes | Imports `mount` from remote `marketing/MarketingApp`, used at packages/container/src/components/MarketingApp.js:8. |

## Constructs outside mining

No additional constructs.

## Summary

Constructs participating in composition: 3 (runtime-composition: 3).

## Notes

- Container renders wrapper `<MarketingApp />` below `<Header />` (packages/container/src/App.js:10-11), without a route table naming the units; remote mounting is already in the packages/container/src/components/MarketingApp.js:8 row, and rendering the local wrapper does not become a row.
- The `mount(devRoot)` at packages/marketing/src/bootstrap.js:16 is the isolated marketing development mount (`#_marketing-dev-root`, packages/marketing/public/index.html:5) and is not in `matches.csv`; it does not become a row.
- `Header` accepts `signedIn` and `onSignOut` (packages/container/src/components/Header.js:57), but container does not pass them (packages/container/src/App.js:10); no callback or prop is exchanged with the remote in `mount(ref.current)`.
- `packages/auth` and `packages/dashboard` have no source code in the snapshot.
- No custom element, iframe, `postMessage`, `CustomEvent`, `BroadcastChannel` or shared storage in the units’ code.
