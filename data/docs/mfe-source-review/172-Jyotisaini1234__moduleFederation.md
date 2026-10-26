---
schema: 1
id: 1042592063
full_name: Jyotisaini1234/moduleFederation
commit: 8df0f2a8d23cd31eebd2f54463cd0b665fe1fe29
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 172 — Jyotisaini1234/moduleFederation

## Mined constructs

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| src-remote-import | mfe1/src/App.tsx:4 | mfe1 | dynamic-loading | Yes | `React.lazy(() => import("app2/App").catch(...))` loads at runtime module `./App` exposed by unit mfe2 (mfe1/src/App.tsx:3-12); remote `app2` points to `app2@http://localhost:3002/remoteEntry.js` at mfe1/webpack.config.ts:76-77, and mfe2 exposes `'./App': './src/App.tsx'` with `name: 'app2'` at mfe2/webpack.config.ts:38-40. Active: mfe1/src/index.tsx:3 → mfe1/src/bootstrap.tsx:8,15,18 → `App`. |
| src-remote-import | mfe1/src/App.tsx:39 | mfe1 | dynamic-loading | No | Commented line: the entire alternative component version is commented out with `//` at mfe1/src/App.tsx:35-53. |
| src-async-bootstrap | mfe1/src/index.tsx:3 | mfe1 | dynamic-loading | No | `import("./bootstrap")` of a local file of the unit itself (Module Federation’s asynchronous boundary); internal to mfe1. |
| src-async-bootstrap | mfe2/src/index.tsx:1 | mfe2 | dynamic-loading | No | `import("./bootstrap")` of a local file of the unit itself (Module Federation’s asynchronous boundary); internal to mfe2. |

## Constructs outside mining

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| manual | mfe1/src/App.tsx:26 | mfe1 | runtime-composition | Yes | Renders `<RemoteApp2 />`, a component of unit mfe2, inside `Suspense` (mfe1/src/App.tsx:25-27); the component comes from `React.lazy` at mfe1/src/App.tsx:3-12, and `App` is rendered at mfe1/src/bootstrap.tsx:15,18. |

## Summary

Constructs participating in composition: 2 (dynamic-loading: 1, runtime-composition: 1).

## Notes

- `window.app2Url = "http://localhost:3002"` (mfe1/src/index.tsx:1, repeated in SSR HTML at mfe1/src/server/server.ts:81) only has its type declared at mfe1/src/types/global.d.ts:17 and is not read in any snapshot file; the remote address is fixed in webpack configuration (mfe1/webpack.config.ts:77). It does not become a row.
- `mfe1/src/server/server.ts` renders the same `App` on the server (mfe1/src/server/server.ts:7,54) and injects `dist` bundles through `<script src="/static/...">` (mfe1/src/server/server.ts:84); these bundles belong to mfe1 itself rather than another unit, and no mfe1/package.json script runs this server (mfe1/package.json:8-9). It does not become a row.
