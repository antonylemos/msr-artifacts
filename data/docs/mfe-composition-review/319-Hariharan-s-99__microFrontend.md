---
schema: 1
id: 973277755
full_name: Hariharan-s-99/microFrontend
commit: 902273771afdb4f52006aeed0bcb3cd0e6c33cee
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

# 319 — Hariharan-s-99/microFrontend

## Repository overview

A Module Federation study example with Rspack (`@module-federation/enhanced`): three React applications, with `container` as host and `home` and `settings` as remotes. Container declares both remotes through fixed `localhost` URLs (container/module-federation.config.ts:3-6), and each remote exposes `./app`, pointing to its own `src/bootstrap.tsx` (home/module-federation.config.ts:4-5, settings/module-federation.config.ts:4-5). The exposed module is not a component: it is a `mount(element)` function performing `ReactDOM.render` of the remote UI on the received element (home/src/bootstrap.tsx:6-10, settings/src/bootstrap.tsx:6-10). In the host, wrappers `Home` and `Settings` import that `mount` and call it in a `useEffect` on their own `div` (container/src/Home.tsx:1-13, container/src/Settings.tsx:1-12). Both remotes declare no `shared` (`shared: []` in all three configurations), and container renders with `createRoot` (container/src/App.tsx:24-27), while remotes use `ReactDOM.render` with their own React copy.

Wrappers enter the host in two ways: through routes `/mf1` and `/mf2` in `Switch` (container/src/App.tsx:17-20) and through `TabBar`, which also renders `<Home />` or `<Settings />` according to the active tab (container/src/App.tsx:60-64). Because `TabBar` pushes `/mf1/home` on mounting (container/src/App.tsx:33-36), the tab's remote appears twice on screen, once through the tab and once through the route. Each remote has its own `MemoryRouter` (home/src/App.tsx:48, settings/src/App.tsx:47), so internal navigation does not synchronize with the host's `BrowserRouter`. The second argument `{}` passed to `mount` is ignored by remotes, and there is no `unmount` or message exchange between units; in home/src/bootstrap.tsx:7, prop `history` passed to `App` is the browser's global `history`, because `createMemoryHistory` is imported (home/src/bootstrap.tsx:2) but not called.

Outside composition is `advancedWebpack/`, an independent React + webpack app for configuration experiments, without federation or a composition construct (source code review, Notes). Hence it appears in "Units without a relationship". The difference from classification's `frontend_units: 3` is already recorded in the structural review.

## Relationships

| # | Source | Target | Type | Direction | Mechanism | In snapshot | Active | Configuration | Code |
|---|---|---|---|---|---|---|---|---|---|
| 1 | container | home | host → remote | source → target | module-federation | Yes | Yes | container/module-federation.config.ts:5 (remote `home` at `http://localhost:8081/remoteEntry.js`); container/rspack.config.ts:94 (`new ModuleFederationPlugin(mfConfig)`); home/module-federation.config.ts:2-5 (`name: "home"`, `filename: "remoteEntry.js"`, exposes `./app`); home/rspack.config.ts:33 (`publicPath: "http://localhost:8081/"`); home/rspack.config.ts:94 (`new ModuleFederationPlugin(mfConfig)`) | home/src/bootstrap.tsx:12; container/src/Home.tsx:8; container/src/Home.tsx:1; container/src/App.tsx:17 |
| 2 | container | settings | host → remote | source → target | module-federation | Yes | Yes | container/module-federation.config.ts:4 (remote `settings` at `http://localhost:8082/remoteEntry.js`); container/rspack.config.ts:94 (`new ModuleFederationPlugin(mfConfig)`); settings/module-federation.config.ts:2-5 (`name: "settings"`, `filename: "remoteEntry.js"`, exposes `./app`); settings/rspack.config.ts:32 (`publicPath: "http://localhost:8082/"`); settings/rspack.config.ts:93 (`new ModuleFederationPlugin(mfConfig)`) | settings/src/bootstrap.tsx:12; container/src/Settings.tsx:7; container/src/Settings.tsx:1; container/src/App.tsx:17 |

## Observations

**1. container → home.** Remote `home@http://localhost:8081/remoteEntry.js` (container/module-federation.config.ts:5) matches unit home through `name: "home"` and `filename: "remoteEntry.js"` (home/module-federation.config.ts:2-3) and through `publicPath` `http://localhost:8081/` (home/rspack.config.ts:33); port 8081 (home/rspack.config.ts:25) only corroborates. Specifier `home/app` imported in container/src/Home.tsx:1 matches `exposes` `./app` (home/module-federation.config.ts:5). It is active: entry point container/src/index.ts:1 loads `App`, rendering the wrapper through route `/mf1` (container/src/App.tsx:18) and the default tab (container/src/App.tsx:62), and the wrapper calls `mount` (container/src/Home.tsx:8). The remote's `export { mount }` (home/src/bootstrap.tsx:12) enters this relationship as the exposed side.

**2. container → settings.** Same form as relationship 1: `settings@http://localhost:8082/remoteEntry.js` (container/module-federation.config.ts:4) matches settings through `name` and `filename` (settings/module-federation.config.ts:2-3) and through `publicPath` `http://localhost:8082/` (settings/rspack.config.ts:32), and `settings/app` (container/src/Settings.tsx:1) matches `exposes` `./app` (settings/module-federation.config.ts:5). It is active through route `/mf2` (container/src/App.tsx:19) and tab Settings (container/src/App.tsx:63), with the `mount` call in container/src/Settings.tsx:7. Manual line container/src/App.tsx:17 (`Switch` with both routes) supports relationships 1 and 2.

## Summary

Relationships: 2 (host → remote: 2). Active: 2. Target outside the snapshot: 0.
Units without a relationship: advancedWebpack.

