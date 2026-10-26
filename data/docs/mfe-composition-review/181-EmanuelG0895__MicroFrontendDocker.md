---
schema: 1
id: 1009817207
full_name: EmanuelG0895/MicroFrontendDocker
commit: 137ba29996f64553efd3401f8ad619646d8a78e5
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

# 181 — EmanuelG0895/MicroFrontendDocker

## Repository overview

A technical test (“Prueba Técnica - Microfrontends con Module Federation”, English translation: Technical Test - Microfrontends with Module Federation, README.md:1-3) with three React + TypeScript applications built with Rspack and `@module-federation/enhanced`. `MF-Shell` is the host: it declares two remotes, `MF_CharacterDetail` and `MF_Characters`, both on `localhost` (MF-Shell/module-federation.config.ts:3-6), and loads them through `React.lazy` with federated `import()`. Each remote screen occupies one route in the host's `BrowserRouter`: `/` shows the character list from `MF_CharacterDetail` and `/details/:id` shows details from `MF_Characters` (MF-Shell/src/App.tsx:24-41). Neither remote consumes anything from the other or the host; `MF-CharacterDetail` declares `remotes: {}` (MF-CharacterDetail/module-federation.config.ts:4).

The names do not match their contents: `MF_CharacterDetail` exposes the list with search and pagination (MF-CharacterDetail/src/components/view.tsx:11-80), and `MF_Characters` exposes one character's detail screen (MF-Characters/src/components/vista.tsx:11-15); the README describes the reverse, with `MF-Characters` as “Lista de personajes” (English translation: Character list) (README.md:9-11). The connection between screens passes through the host: the list remote calls the `onCharacterClick` callback received through a prop (MF-CharacterDetail/src/components/view.tsx:22-27), the host navigates to `/details/${id}` (MF-Shell/src/App.tsx:18-21) and passes `characterId` to the detail remote (MF-Shell/src/app/details.tsx:9-13). This is props and callback exchange between host and remote, and did not become a `communication` relationship.

The host also shares `shared-hooks` as a singleton (MF-Shell/module-federation.config.ts:10), without a corresponding package or use in the remotes, which share only `react` and `react-dom` (MF-CharacterDetail/module-federation.config.ts:9; MF-Characters/module-federation.config.ts:7). Composition is set up for development mode, where remote ports (3003 and 3002) and absolute `publicPath` values match the host URLs. The Docker/Nginx profile serves units on 3000/3001/3002 (MF-*/package.json:9; nginx.conf:6-16), with prefix routes `/characters` and `/character-detail` (nginx.conf:38-53) not matching `remotes` URLs; the README itself identifies mismatched ports as a cause of error (README.md:155-157). This belongs to the build and deploy stage and does not change the relationships.

## Relationships

| # | Source | Target | Type | Direction | Mechanism | In snapshot | Active | Configuration | Code |
|---|---|---|---|---|---|---|---|---|---|
| 1 | MF-Shell | MF-CharacterDetail | host → remote | source → target | module-federation | Yes | Yes | MF-Shell/module-federation.config.ts:4 (remote `MF_CharacterDetail@http://localhost:3003/remoteEntry.js`); MF-Shell/rspack.config.ts:98 (`new ModuleFederationPlugin(mfConfig)`); MF-CharacterDetail/module-federation.config.ts:2-8 (`name: "MF_CharacterDetail"`, `filename: "remoteEntry.js"`, exposes `./CharacterInfo` and `./View`); MF-CharacterDetail/rspack.config.ts:25 (port 3003); MF-CharacterDetail/rspack.config.ts:38 (`publicPath: "http://localhost:3003/"`); MF-CharacterDetail/rspack.config.ts:86 (`new ModuleFederationPlugin(mfConfig)`) | MF-Shell/src/App.tsx:7; MF-Shell/src/App.tsx:24; MF-Shell/src/App.tsx:29 |
| 2 | MF-Shell | MF-Characters | host → remote | source → target | module-federation | Yes | Yes | MF-Shell/module-federation.config.ts:5 (remote `MF_Characters@http://localhost:3002/remoteEntry.js`); MF-Shell/rspack.config.ts:98 (`new ModuleFederationPlugin(mfConfig)`); MF-Characters/module-federation.config.ts:2-6 (`name: "MF_Characters"`, `filename: "remoteEntry.js"`, exposes `./Vista`); MF-Characters/rspack.config.ts:25 (port 3002); MF-Characters/rspack.config.ts:33 (`publicPath: "http://localhost:3002/"`); MF-Characters/rspack.config.ts:81 (`new ModuleFederationPlugin(mfConfig)`) | MF-Shell/src/app/details.tsx:3; MF-Shell/src/App.tsx:24; MF-Shell/src/app/details.tsx:13 |

## Observations

**1. MF-Shell → MF-CharacterDetail.** The host loads `MF_CharacterDetail/View` through `React.lazy` (MF-Shell/src/App.tsx:6-8) and renders the component, as `CharacterInfo`, at `/` inside `Suspense`, passing `onCharacterClick` (MF-Shell/src/App.tsx:25-31). The target was resolved through `name: "MF_CharacterDetail"` and exposure `./View` → `./src/components/view.tsx` (MF-CharacterDetail/module-federation.config.ts:2,7), exporting `View` by default and name (MF-CharacterDetail/src/components/view.tsx:11,83); port 3003 and `publicPath` only corroborate. Exposure `./CharacterInfo` points to the same file (MF-CharacterDetail/module-federation.config.ts:6) and is not imported by the host; local shell name `CharacterInfo` is only an alias of module `./View`. The MF-Shell/src/App.tsx:24 line (host `Routes`) supports both relationships.

**2. MF-Shell → MF-Characters.** The host's `Details` component, loaded by `React.lazy` at `/details/:id` (MF-Shell/src/App.tsx:10-12,33-40), imports `MF_Characters/Vista` (MF-Shell/src/app/details.tsx:3) and renders it with the id read from the route (MF-Shell/src/app/details.tsx:10-13). The target was resolved through `name: "MF_Characters"` and exposure `./Vista` → `./src/components/vista.tsx` (MF-Characters/module-federation.config.ts:2,5), whose default export receives `characterId` (MF-Characters/src/components/vista.tsx:11-15); port 3002 and `publicPath` only corroborate. `details.tsx` is a host file, not a remote file: the relationship goes directly from shell to MF-Characters.

## Summary

Relationships: 2 (host → remote: 2). Active: 2. Target outside the snapshot: 0.
Units without a relationship: none.

