---
schema: 1
id: 1042592063
full_name: Jyotisaini1234/moduleFederation
commit: 8df0f2a8d23cd31eebd2f54463cd0b665fe1fe29
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

# 172 — Jyotisaini1234/moduleFederation

## Repository overview

A minimal Module Federation example with webpack 5's built-in `ModuleFederationPlugin` (mfe1/webpack.config.ts:11-12; mfe2/webpack.config.ts:6-7) and two React applications in TypeScript. `mfe1` (“Product Listing”) is the host, with `name: 'app1'` and a single remote, `app2` (mfe1/webpack.config.ts:74-78). `mfe2` (“Cart Application”) is the remote: it declares `name: 'app2'`, `filename: 'remoteEntry.js'` and exposes `./App` (mfe2/webpack.config.ts:37-40), a component showing only a title (mfe2/src/App.tsx:3-14). The host loads this component with `React.lazy(() => import("app2/App"))`, with an error fallback requesting that app2 be started on port 3002 (mfe1/src/App.tsx:3-12), and renders it inside `Suspense` immediately below its own title (mfe1/src/App.tsx:23-27). Both units share `react` and `react-dom` as singletons (mfe1/webpack.config.ts:79-88; mfe2/webpack.config.ts:41) and use the asynchronous boundary `import("./bootstrap")` (mfe1/src/index.tsx:3; mfe2/src/index.tsx:1).

What did not become a relationship: an alternative version of the host's `App`, with a conditional SSR import, is entirely commented out (mfe1/src/App.tsx:35-53). `mfe1` also contains an experimental SSR server rendering the same `App` and injecting `mfe1`'s own bundles through `<script src="/static/...">` (mfe1/src/server/server.ts:7, 54, 84); no mfe1/package.json script executes it (mfe1/package.json:8-9). Variable `window.app2Url` is written (mfe1/src/index.tsx:1; mfe1/src/server/server.ts:81) and typed (mfe1/src/types/global.d.ts:17), but the remote address is fixed in webpack (mfe1/webpack.config.ts:77). There is no inter-unit communication beyond component rendering.

## Relationships

| # | Source | Target | Type | Direction | Mechanism | In snapshot | Active | Configuration | Code |
|---|---|---|---|---|---|---|---|---|---|
| 1 | mfe1 | mfe2 | host → remote | source → target | module-federation | Yes | Yes | mfe1/webpack.config.ts:74-78 (`name: 'app1'`; remote `app2` at `app2@http://localhost:3002/remoteEntry.js`); mfe2/webpack.config.ts:37-40 (`name: 'app2'`, `filename: 'remoteEntry.js'`, exposes `./App`); mfe2/webpack.config.ts:17 (port 3002) | mfe1/src/App.tsx:4; mfe1/src/App.tsx:26 |

## Observations

**1. mfe1 → mfe2.** The `app2` remote declared by the host (mfe1/webpack.config.ts:77) matches unit `mfe2` through `name: 'app2'` and `filename: 'remoteEntry.js'` (mfe2/webpack.config.ts:38-39), and the requested module, `app2/App` (mfe1/src/App.tsx:4), is the `./App` exposed in mfe2/webpack.config.ts:40; port 3002 (mfe2/webpack.config.ts:17) only corroborates. Both code lines are `Yes` in the source code review: the remote import and rendering of `<RemoteApp2 />` (mfe1/src/App.tsx:26), reached from mfe1/src/index.tsx:3 → mfe1/src/bootstrap.tsx:15, 18. The remote module's type is declared manually in the host (mfe1/src/types/global.d.ts:9-13).

## Summary

Relationships: 1 (host → remote: 1). Active: 1. Target outside the snapshot: 0.
Units without a relationship: none.

