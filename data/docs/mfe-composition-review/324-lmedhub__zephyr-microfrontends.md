---
schema: 1
id: 990877766
full_name: lmedhub/zephyr-microfrontends
commit: c6e6a9f7d59a3b422002af26c57617d6c486a532
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

# 324 — lmedhub/zephyr-microfrontends

## Repository overview

A Module Federation example with Rspack and publishing to Zephyr Cloud: all four apps in `frontend/apps/` wrap configuration in `withZephyr()` (frontend/apps/host/rspack.config.ts:7) and use Rspack's built-in `ModuleFederationPlugin` (frontend/apps/host/rspack.config.ts:82). The repository also has a Go backend, outside the units. The React host (`name: "host"`, frontend/apps/host/rspack.config.ts:83) declares three remotes through fixed `localhost` URLs (frontend/apps/host/rspack.config.ts:84-88) and assembles the page with them: header, central content and footer (frontend/apps/host/src/App.tsx:11-23).

Header and footer are React remotes loaded with `React.lazy` and rendered inside `Suspense` (frontend/apps/host/src/App.tsx:6-7, 12-14, 20-22). The distinctive feature is remote `url_shortener`, in Vue 3: the host does not render the remote component as a React component. Local wrapper `VueShortener` imports shared `vue` and the remote module, creates a Vue application with `createApp(Shortener.default)` and mounts it in a React `div` (frontend/apps/host/src/utils/VueShortener.tsx:10-16). `vue` is declared `shared` singleton in both host (frontend/apps/host/rspack.config.ts:92) and remote (frontend/apps/url-shortener/rspack.config.ts:81-85).

Each remote also runs independently; url-shortener, for example, mounts its own application at `#app` (frontend/apps/url-shortener/src/index.ts:18-19). There is no inter-unit message exchange or exposure without a consumer: each remote exposes a single module, and all three are consumed by the host. `withZephyr()` may rewrite remote URLs on publishing, which is not visible in the snapshot.

## Relationships

| # | Source | Target | Type | Direction | Mechanism | In snapshot | Active | Configuration | Code |
|---|---|---|---|---|---|---|---|---|---|
| 1 | frontend/apps/host | frontend/apps/remote-header | host → remote | source → target | module-federation | Yes | Yes | frontend/apps/host/rspack.config.ts:85 (remote `remote_header` at `http://localhost:3001/remoteEntry.js`); frontend/apps/remote-header/rspack.config.ts:74-78 (`name: "remote_header"`, `filename: "remoteEntry.js"`, exposes `./Header`); frontend/apps/remote-header/rspack.config.ts:14 (port 3001) | frontend/apps/host/src/App.tsx:6; frontend/apps/host/src/App.tsx:13 |
| 2 | frontend/apps/host | frontend/apps/remote-footer | host → remote | source → target | module-federation | Yes | Yes | frontend/apps/host/rspack.config.ts:86 (remote `remote_footer` at `http://localhost:3002/remoteEntry.js`); frontend/apps/remote-footer/rspack.config.ts:74-78 (`name: "remote_footer"`, `filename: "remoteEntry.js"`, exposes `./Footer`); frontend/apps/remote-footer/rspack.config.ts:14 (port 3002) | frontend/apps/host/src/App.tsx:7; frontend/apps/host/src/App.tsx:21 |
| 3 | frontend/apps/host | frontend/apps/url-shortener | host → remote | source → target | module-federation | Yes | Yes | frontend/apps/host/rspack.config.ts:87 (remote `url_shortener` at `http://localhost:3003/remoteEntry.js`); frontend/apps/url-shortener/rspack.config.ts:75-78 (`name: "url_shortener"`, `filename: "remoteEntry.js"`, exposes `./Shortener`); frontend/apps/url-shortener/rspack.config.ts:12 (port 3003) | frontend/apps/host/src/utils/VueShortener.tsx:12; frontend/apps/host/src/utils/VueShortener.tsx:16 |

## Observations

**1. frontend/apps/host → frontend/apps/remote-header.** The host's remote `remote_header` matches the unit through `name` and `filename` declared in frontend/apps/remote-header/rspack.config.ts:74-75, and module `remote_header/Header` imported in frontend/apps/host/src/App.tsx:6 is exposed `./Header` in frontend/apps/remote-header/rspack.config.ts:77-78; port 3001 only corroborates. Active because the component is rendered in `App` (frontend/apps/host/src/App.tsx:13), the host build's entry point, mounted in frontend/apps/host/src/App.tsx:27-28.

**2. frontend/apps/host → frontend/apps/remote-footer.** Same arrangement as relationship 1: `name: "remote_footer"` and `filename` in frontend/apps/remote-footer/rspack.config.ts:74-75 match the host's remote, and `remote_footer/Footer` (frontend/apps/host/src/App.tsx:7) is exposed `./Footer` in frontend/apps/remote-footer/rspack.config.ts:77-78. The component is rendered in frontend/apps/host/src/App.tsx:21.

**3. frontend/apps/host → frontend/apps/url-shortener.** The target was resolved through `name: "url_shortener"` and exposed `./Shortener` (frontend/apps/url-shortener/rspack.config.ts:75-78), matching the host's remote and `import("url_shortener/Shortener")` in frontend/apps/host/src/utils/VueShortener.tsx:12. The relationship is mixed: the module arrives through Module Federation and is then mounted as a Vue application with `createApp(...).mount(...)` (frontend/apps/host/src/utils/VueShortener.tsx:15-16). Under the mixed relationship rule, type follows how the target enters the source, loaded as a module, hence `host → remote`. The wrapper is used in `App` in frontend/apps/host/src/App.tsx:4 and frontend/apps/host/src/App.tsx:17.

## Summary

Relationships: 3 (host → remote: 3). Active: 3. Target outside the snapshot: 0.
Units without a relationship: none.

