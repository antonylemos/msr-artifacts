---
schema: 1
id: 1019893852
full_name: lguilhermecardoso/mfe-react-vite-example
commit: ddf474192c82d47341b22be009915913c9227eca
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 351 — lguilhermecardoso/mfe-react-vite-example

## Mined constructs

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| src-remote-import | root-app/src/App.tsx:5 | root-app | dynamic-loading | Yes | `React.lazy(() => import("mf_navbar/Navbar"))` loads the `./Navbar` exposed by mf-navbar (mf-navbar/vite.config.ts:13-14); remote `mf_navbar` declared at root-app/vite.config.ts:21-23 and passed to `federation` at root-app/vite.config.ts:31-33; rendered at root-app/src/App.tsx:59; App mounted at root-app/src/main.tsx:7-10 |
| src-remote-import | root-app/src/App.tsx:6 | root-app | dynamic-loading | Yes | `React.lazy(() => import("mf_login/Login"))` loads the `./Login` exposed by mf-login (mf-login/vite.config.ts:13-14); remote `mf_login` at root-app/vite.config.ts:12-14; rendered in route `/login` at root-app/src/App.tsx:67 |
| src-remote-import | root-app/src/App.tsx:7 | root-app | dynamic-loading | Yes | `React.lazy(() => import("mf_dashboard/Dashboard"))` loads the `./Dashboard` exposed by mf-dashboard (mf-dashboard/vite.config.ts:13-14); remote `mf_dashboard` at root-app/vite.config.ts:15-17; rendered in route `/dashboard` at root-app/src/App.tsx:73 |
| src-remote-import | root-app/src/App.tsx:8 | root-app | dynamic-loading | Yes | `React.lazy(() => import("mf_personagem_detalhe/PersonagemDetalhe"))` loads the `./PersonagemDetalhe` exposed by mf-personagem-detalhe (mf-personagem-detalhe/vite.config.ts:13-14); remote `mf_personagem_detalhe` at root-app/vite.config.ts:18-20; rendered at root-app/src/App.tsx:24 |

## Constructs outside mining

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| manual | root-app/src/App.tsx:24 | root-app | runtime-composition | Yes | Renders remote component `PersonagemDetalheMFE` (resolved at root-app/src/App.tsx:8) with `id`, `user` and `onBack` (root-app/src/App.tsx:24-28); the wrapper is used in route `/personagem/:id` at root-app/src/App.tsx:81-84 |
| manual | root-app/src/App.tsx:59 | root-app | runtime-composition | Yes | Renders remote `Navbar` (resolved at root-app/src/App.tsx:5) when a user exists, with `user` and `onLogout` (root-app/src/App.tsx:58-60) |
| manual | root-app/src/App.tsx:63 | root-app | host-relationship | Yes | `Routes` declares where remotes enter: `/login` → `LoginMFE`, `/dashboard` → `DashboardMFE`, `/personagem/:id` → `PersonagemDetalheWrapper` (root-app/src/App.tsx:63-96); App under `HashRouter` at root-app/src/main.tsx:9-11 |
| manual | root-app/src/App.tsx:67 | root-app | runtime-composition | Yes | Renders `LoginMFE` (resolved at root-app/src/App.tsx:6) in route `/login`, with callback `onAuthSuccess={handleLogin}` (root-app/src/App.tsx:36-40) |
| manual | root-app/src/App.tsx:73 | root-app | runtime-composition | Yes | Renders `DashboardMFE` (resolved at root-app/src/App.tsx:7) in route `/dashboard`, with `user`, `token` and `onCharacterClick` (root-app/src/App.tsx:73-77) |

## Summary

Constructs participating in composition: 9 (dynamic-loading: 4, runtime-composition: 4, host-relationship: 1).

## Notes

- The remote URLs depend on `IS_LOCAL` (root-app/vite.config.ts:9-24): `root-app/.env:1` has `IS_LOCAL=false` (GitHub Pages URLs), and `root-app/.env.local.bkp:1` has `IS_LOCAL=true` (localhost). In both cases, targets are the snapshot’s mf-login, mf-dashboard, mf-personagem-detalhe and mf-navbar units.
- The `window.addEventListener("storage", ...)` at root-app/src/App.tsx:52 did not become a row: the `storage` event only reaches other documents, and here all units run in the root-app document; it resynchronizes `user` between root-app’s own tabs. `localStorage` is also written by mf-login (mf-login/src/LoginForm.tsx:22, key `token`), but root-app writes the same key at root-app/src/App.tsx:37; data exchange between host and remotes uses props and callbacks.
- mf-navbar/src/App.tsx:4-12 is only a local development mock (`alert("Logout!")`); the exposed module is `./src/Navbar.tsx`.
