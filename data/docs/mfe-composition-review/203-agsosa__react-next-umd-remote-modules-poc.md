---
schema: 1
id: 1027727587
full_name: agsosa/react-next-umd-remote-modules-poc
commit: 130ddb6f8b73b85ec0065160bc49a764c80d49ba
inputs:
  mining:
    output: data/mining/mfe-mining-001
    version: "1"
    config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
  inspection:
    output: data/inspections/mfe-dependencies-001
    version: "1"
    config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 203 — agsosa/react-next-umd-remote-modules-poc

## Repository overview

A proof of concept with two Next.js applications, `shell` and `mf-1`, presented by the README as UMD-based microfrontends, "not Module Federation" (README.md:1-3, 12-17). `mf-1` is a complete application (port 3001, mf-1/package.json:7) and, in the same build, uses Vite to package three React components (`Header`, `Fulfilment`, `FulfilmentDetails`, mf-1/src/RemoteModules/RemoteModules.ts:6-10) in a UMD `bundle.js` publishing the `MF1_RemoteModules` global and placed in `public/remote-modules` (mf-1/vite.mf.ts:28, 33, 37-39). React and ReactDOM remain outside the bundle and are expected as host globals (mf-1/vite.mf.ts:35, 42-45).

`shell` is the host. A generic `useRemoteModule` hook exposes `window.React`/`window.ReactDOM`, injects the bundle's `<script>` and reads the requested component from `window[moduleName][componentName]` (shell/src/hooks/useRemoteModule.ts:23-24, 36-37, 79-99); if the script is already in `head`, it is reused (shell/src/hooks/useRemoteModule.ts:55-75). Three shell components use the hook, each requesting one bundle component and rendering it as a regular React component, with shell props and callbacks (shell/src/components/RemoteHeader.tsx:18-22, 37; shell/src/components/RemoteFulfilment.tsx:29-33, 65-68; shell/src/components/RemoteFulfilmentDetails.tsx:29-33, 65-68). The `mf-1` base URL comes from `publicRuntimeConfig.MF1_BASE_URL`, defaulting to `http://localhost:3001` (shell/next.config.js:7-9).

The inter-unit contract consists of the UMD global, component names and props. There is no messaging channel: the shell passes to the remote `Header` its own Next `router`, which the remote uses for navigation (mf-1/src/RemoteModules/Header.tsx:83-85, 104-106), and callbacks such as `onFulfil`, `onTrack` and `onStatusChange`; this did not become a `communication` relationship. The `postMessage` recorded by mining in `mf-1/public/remote-modules/bundle.js:10` belongs to axios embedded in the generated bundle, and the source code review marked it `No`. `mf-1` also uses the same components locally, internal to the unit.

## Relationships

| # | Source | Target | Type | Direction | Mechanism | In snapshot | Active | Configuration | Code |
|---|---|---|---|---|---|---|---|---|---|
| 1 | shell | mf-1 | host → remote | source → target | script | Yes | Yes | mf-1/vite.mf.ts:28 (`outDir: "public/remote-modules"`); mf-1/vite.mf.ts:33 (entry point `src/RemoteModules/RemoteModules.ts`); mf-1/vite.mf.ts:37-39 (`bundle.js`, format `umd`, global `MF1_RemoteModules`); mf-1/vite.mf.ts:35 (`external: ["react", "react-dom"]`); shell/next.config.js:8 (`MF1_BASE_URL`, default `http://localhost:3001`) | shell/src/hooks/useRemoteModule.ts:79; shell/src/components/RemoteHeader.tsx:18; shell/src/components/RemoteHeader.tsx:37; shell/src/components/RemoteFulfilment.tsx:29; shell/src/components/RemoteFulfilment.tsx:65; shell/src/components/RemoteFulfilmentDetails.tsx:29; shell/src/components/RemoteFulfilmentDetails.tsx:65 |

## Observations

**1. shell → mf-1.** The target was resolved through an explicit match: the shell requests `MF1_BASE_URL + "/remote-modules/bundle.js"` with `moduleName: "MF1_RemoteModules"` (shell/src/components/RemoteHeader.tsx:19-20), and the `mf-1` Vite build generates `bundle.js` in `public/remote-modules` with global `MF1_RemoteModules` (mf-1/vite.mf.ts:28, 37-39); names `Header`, `Fulfilment` and `FulfilmentDetails` are the bundle entry point's exports (mf-1/src/RemoteModules/RemoteModules.ts:10). Port 3001 in the `MF1_BASE_URL` default (shell/next.config.js:8; mf-1/package.json:7) only reinforces. Type is `host → remote` rather than `page → embedded-frontend`: the shell does not mount the target through a global API (`mount`/`render`), but reads React components exposed by the bundle and renders them in its own tree (shell/src/hooks/useRemoteModule.ts:23-24, 84-87; shell/src/components/RemoteHeader.tsx:37), meaning the target enters as a component module; mechanism is `script` because loading uses an injected `<script>`, without a federation runtime. Active `Yes`: all seven source code review lines are `Yes`, and components are used on shell pages (shell/src/pages/index.tsx:178; shell/src/pages/fulfilment.tsx:29-30; shell/src/pages/orders/[id].tsx:410). All three hook calls and three renders share the same Source, Target, Type triple and form a single relationship.

## Summary

Relationships: 1 (host → remote: 1). Active: 1. Target outside the snapshot: 0.
Units without a relationship: none.

