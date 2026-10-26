---
schema: 1
id: 1330154796
full_name: samhoooo/module-federation-demo-mf2
commit: 0a621b661bc717fb3433ec3c5dbbcfb027d0a94a
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

# 327 — samhoooo/module-federation-demo-mf2

## Repository overview

A Module Federation 2.0 example (`@module-federation/enhanced/rspack`) with two independent React/Rspack applications, without a root workspace (README.md:1-14). `home-app` is the host (`name: "HomeApp"`, home-app/rspack.config.js:47), and `header-app` is the remote (`name: "HeaderApp"`, `filename: "remoteEntry.js"`, exposing `./Header` → `./src/App`, header-app/rspack.config.js:58-62). The host declares the remote through the MF2 manifest, `HeaderApp@http://localhost:4001/mf-manifest.json` (home-app/rspack.config.js:51-53), rather than a fixed `remoteEntry.js` URL; the comment in home-app/rspack.config.js:48-50 explains the choice. Both ends share `react` and `react-dom` as singletons (home-app/rspack.config.js:55-65; header-app/rspack.config.js:64-74).

The only composition is the header: the host loads `HeaderApp/Header` through `React.lazy` (home-app/src/App.tsx:13) and renders it inside `Suspense` at the top of the page (home-app/src/App.tsx:18-20). The repository's distinctive feature is typing between builds: with `dts: true` on both sides (home-app/rspack.config.js:54; header-app/rspack.config.js:63), the host receives generated declarations in `home-app/@mf-types/` and resolves them through `paths` (home-app/tsconfig.json:15-17). Besides dynamic `import()`, the host statically imports enum `HeaderVariant` from the same remote module (home-app/src/App.tsx:11), and the comment in home-app/src/App.tsx:3-10 says this brings the enum's type and values from the remote build. Files in `@mf-types` are generated types and load nothing at runtime. `header-app` also runs independently on port 4001 (header-app/rspack.config.js:10), serving `dist/` as static content for type files (header-app/rspack.config.js:14-20). There is no inter-unit communication beyond props passed to the component.

## Relationships

| # | Source | Target | Type | Direction | Mechanism | In snapshot | Active | Configuration | Code |
|---|---|---|---|---|---|---|---|---|---|
| 1 | home-app | header-app | host → remote | source → target | module-federation | Yes | Yes | home-app/rspack.config.js:51-53 (remote `HeaderApp` at `http://localhost:4001/mf-manifest.json`); header-app/rspack.config.js:58-62 (`name: "HeaderApp"`, `filename: "remoteEntry.js"`, exposes `./Header` → `./src/App`); header-app/rspack.config.js:23 (`publicPath: "http://localhost:4001/"`); header-app/rspack.config.js:10 (port 4001) | home-app/src/App.tsx:13; home-app/src/App.tsx:19 |

## Observations

**1. home-app → header-app.** Remote `HeaderApp` declared by the host (home-app/rspack.config.js:52) matches unit header-app through `name: "HeaderApp"` (header-app/rspack.config.js:58) and exposed module `./Header` (header-app/rspack.config.js:60-62), the specifier `HeaderApp/Header` used in home-app/src/App.tsx:13; `publicPath` and port 4001 (header-app/rspack.config.js:23, :10) only corroborate. The relationship is active: `lazy(() => import('HeaderApp/Header'))` (home-app/src/App.tsx:13) is rendered in home-app/src/App.tsx:19, in the tree mounted from home-app/rspack.config.js:6 → home-app/src/entry.ts:1 → home-app/src/index.tsx:4,11-16. The exposed component receives `title` and `variant` (header-app/src/App.tsx:9-20). The static import of `HeaderVariant` (home-app/src/App.tsx:11) uses the same remote; the source code review did not record it as a separate line, and it appears here only as part of rendering at :19. Line `home-app/@mf-types/HeaderApp/apis.d.ts:3` (Composition `No`) does not enter.

## Summary

Relationships: 1 (host → remote: 1). Active: 1. Target outside the snapshot: 0.
Units without a relationship: none.

