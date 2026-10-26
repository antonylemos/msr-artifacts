---
schema: 1
id: 1027727587
full_name: agsosa/react-next-umd-remote-modules-poc
commit: 130ddb6f8b73b85ec0065160bc49a764c80d49ba
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 203 — agsosa/react-next-umd-remote-modules-poc

## Mined constructs

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| src-dynamic-script | shell/src/hooks/useRemoteModule.ts:79 | shell | script-loading | Yes | `document.createElement('script')` in hook `useRemoteModule` injects the `mf-1` UMD bundle: `script.src = url` (:80), `document.head.appendChild(script)` (:99) and, in `onload`, reads the component from `window[moduleName][componentName]` (:23-24, :82-87); first exposes `window.React`/`window.ReactDOM` (:36-37), used by the bundle as external globals (mf-1/vite.mf.ts:35, :42-45). The `url` is `MF1_BASE_URL + '/remote-modules/bundle.js'` (shell/src/components/RemoteHeader.tsx:19), output of the `format: "umd"`, `name: "MF1_RemoteModules"` build of `mf-1` (mf-1/vite.mf.ts:28, :37-39). Active: shell/src/pages/index.tsx:178 → `RemoteHeader` → `useRemoteModule` (shell/src/components/RemoteHeader.tsx:18). |
| src-cross-unit-communication | mf-1/public/remote-modules/bundle.js:10 | mf-1 | none | No | False positive in generated output: the matched `postMessage(r,"*")` is axios’s embedded `setImmediate` polyfill (`` `axios@${Math.random()}` `` on the same line), which sends messages to its own window to schedule callbacks; not inter-unit communication. |

## Constructs outside mining

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| manual | shell/src/components/RemoteHeader.tsx:18 | shell | script-loading | Yes | `useRemoteModule<HeaderProps>({ url: MF1_BASE_URL + "/remote-modules/bundle.js", moduleName: "MF1_RemoteModules", componentName: "Header" })` (:18-22) passes the `mf-1` UMD bundle URL to the loader and requests component `Header` (exported at mf-1/src/RemoteModules/RemoteModules.ts:10); `MF1_BASE_URL` comes from `publicRuntimeConfig` (shell/src/components/RemoteHeader.tsx:8-10; shell/next.config.js:8, default `http://localhost:3001`, port from mf-1/package.json:7). |
| manual | shell/src/components/RemoteHeader.tsx:37 | shell | runtime-composition | Yes | `<Header appName="Shell App" router={router} onMount={handleMount} />` renders in shell the `Header` from `mf-1` obtained at :14-22; shell passes its own Next `router`, used by the remote for navigation (mf-1/src/RemoteModules/Header.tsx:83-85, :104-106). Used at shell/src/pages/index.tsx:178, shell/src/pages/fulfilment.tsx:29 and shell/src/pages/orders/[id].tsx:273, :289. |
| manual | shell/src/components/RemoteFulfilment.tsx:29 | shell | script-loading | Yes | `useRemoteModule<FulfilmentProps>({ url: MF1_BASE_URL + '/remote-modules/bundle.js', moduleName: 'MF1_RemoteModules', componentName: 'Fulfilment' })` (:29-33) loads the same `mf-1` bundle and requests component `Fulfilment` (mf-1/src/RemoteModules/RemoteModules.ts:10); if the script is already in the `head`, the hook reuses it (shell/src/hooks/useRemoteModule.ts:55-75). |
| manual | shell/src/components/RemoteFulfilment.tsx:65 | shell | runtime-composition | Yes | `<Fulfilment onFulfil={onFulfil} onTrack={onTrack} />` (:65-68) renders in shell the `Fulfilment` from `mf-1`, with shell callbacks. Used at shell/src/pages/fulfilment.tsx:30. |
| manual | shell/src/components/RemoteFulfilmentDetails.tsx:29 | shell | script-loading | Yes | `useRemoteModule<FulfilmentDetailsProps>({ url: MF1_BASE_URL + '/remote-modules/bundle.js', moduleName: 'MF1_RemoteModules', componentName: 'FulfilmentDetails' })` (:29-33) loads the `mf-1` bundle and requests component `FulfilmentDetails` (mf-1/src/RemoteModules/RemoteModules.ts:10). |
| manual | shell/src/components/RemoteFulfilmentDetails.tsx:65 | shell | runtime-composition | Yes | `<FulfilmentDetailsComponent orderId={orderId} onStatusChange={onStatusChange} />` (:65-68) renders in shell the `FulfilmentDetails` from `mf-1`. Used at shell/src/pages/orders/[id].tsx:410. |

## Summary

Constructs participating in composition: 7 (script-loading: 4, runtime-composition: 3).

## Notes

- The only `src-cross-unit-communication` occurrence is in `mf-1/public/remote-modules/bundle.js`, versioned Vite build output (`outDir: "public/remote-modules"`, mf-1/vite.mf.ts:28), and is axios code.
- There is no explicit communication mechanism between units: shell and remote exchange data only through props and callbacks (`router`, `onMount`, `onFulfil`, `onTrack`, `onStatusChange`).
- `mf-1` also uses the same components locally through static imports (mf-1/src/pages/index.tsx:3-4, mf-1/src/pages/fulfilment.tsx:3-4); this is internal to the unit and does not become a row.
