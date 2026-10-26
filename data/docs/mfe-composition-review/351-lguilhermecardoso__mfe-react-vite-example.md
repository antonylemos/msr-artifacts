---
schema: 1
id: 1019893852
full_name: lguilhermecardoso/mfe-react-vite-example
commit: ddf474192c82d47341b22be009915913c9227eca
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

# 351 — lguilhermecardoso/mfe-react-vite-example

## Repository overview

A micro-frontends example with React, Vite and `@originjs/vite-plugin-federation`. `root-app` is the host (`name: "root_app"`, root-app/vite.config.ts:31-35) and declares four remotes (root-app/vite.config.ts:11-24), one per other unit: `mf-login`, `mf-navbar`, `mf-dashboard` and `mf-personagem-detalhe`. Each remote exposes a single React component with `filename: "remoteEntry.js"` (for example mf-login/vite.config.ts:10-17). The host loads all four through `React.lazy(() => import("<remote>/<módulo>"))` (root-app/src/App.tsx:5-8): `Navbar` appears above routes when a user exists (root-app/src/App.tsx:58-60), and login, dashboard and character detail enter routes `/login`, `/dashboard` and `/personagem/:id` in `HashRouter` (root-app/src/App.tsx:63-86; root-app/src/main.tsx:9-11). English explanation of the original import placeholder: module.

Remote URLs switch according to `IS_LOCAL` (root-app/vite.config.ts:9): `root-app/.env:1` (`IS_LOCAL=false`) points to GitHub Pages (`https://lguilhermecardoso.github.io/mfe-react-vite-example/<mf>/assets/remoteEntry.js`), and `root-app/.env.local.bkp:1` (`IS_LOCAL=true`) points to `localhost:4173–4176`, the `vite preview` ports listed in the README (README.md:62-65), rather than configuration dev ports (5001–5004, for example mf-login/vite.config.ts:20). Production paths match each remote's output folders (`outDir: '../dist/<mf>'`, for example mf-login/vite.config.ts:23), generated sequentially by `build-all.sh:8-23` before copying the host to the root of `dist`, and `.github/workflows/deploy.yml:19-26` publishes `./dist` on GitHub Pages. The host fixes `base: '/mfe-react-vite-example/'` (root-app/vite.config.ts:27).

Data exchange between host and remotes uses props and callbacks, which did not become a `communication` relationship: `onAuthSuccess` (root-app/src/App.tsx:67; mf-login/src/App.tsx:14), `onLogout` (root-app/src/App.tsx:59; mf-navbar/src/Navbar.tsx:71), `onCharacterClick` (root-app/src/App.tsx:76; mf-dashboard/src/Dashboard.tsx:95) and `onBack` (root-app/src/App.tsx:27; mf-personagem-detalhe/src/PersonagemDetalhe.tsx:60). `localStorage` is used by the host to hold `user` and `token` (root-app/src/App.tsx:36-46), and mf-login also writes `token` (mf-login/src/LoginForm.tsx:22); listener `storage` (root-app/src/App.tsx:52) only resynchronizes the host between tabs, as recorded by the source code review. Remotes import neither host nor one another. `mf-navbar/src/App.tsx:4-12` is only a mock for running navbar independently.

## Relationships

| # | Source | Target | Type | Direction | Mechanism | In snapshot | Active | Configuration | Code |
|---|---|---|---|---|---|---|---|---|---|
| 1 | root-app | mf-navbar | host → remote | source → target | module-federation | Yes | Yes | root-app/vite.config.ts:21-23 (remote `mf_navbar`, local `localhost:4174` or GitHub Pages `/mf-navbar/assets/remoteEntry.js`); root-app/vite.config.ts:31-35 (`federation` with `name: "root_app"` and `remotes`); mf-navbar/vite.config.ts:11-15 (`name: "mf_navbar"`, `filename: "remoteEntry.js"`, exposes `./Navbar`); mf-navbar/vite.config.ts:23 (output `../dist/mf-navbar`) | root-app/src/App.tsx:5; root-app/src/App.tsx:59 |
| 2 | root-app | mf-login | host → remote | source → target | module-federation | Yes | Yes | root-app/vite.config.ts:12-14 (remote `mf_login`, local `localhost:4173` or GitHub Pages `/mf-login/assets/remoteEntry.js`); root-app/vite.config.ts:31-35 (`federation` with `name: "root_app"` and `remotes`); mf-login/vite.config.ts:11-15 (`name: "mf_login"`, `filename: "remoteEntry.js"`, exposes `./Login`); mf-login/vite.config.ts:23 (output `../dist/mf-login`) | root-app/src/App.tsx:6; root-app/src/App.tsx:63; root-app/src/App.tsx:67 |
| 3 | root-app | mf-dashboard | host → remote | source → target | module-federation | Yes | Yes | root-app/vite.config.ts:15-17 (remote `mf_dashboard`, local `localhost:4175` or GitHub Pages `/mf-dashboard/assets/remoteEntry.js`); root-app/vite.config.ts:31-35 (`federation` with `name: "root_app"` and `remotes`); mf-dashboard/vite.config.ts:11-15 (`name: "mf_dashboard"`, `filename: "remoteEntry.js"`, exposes `./Dashboard`); mf-dashboard/vite.config.ts:23 (output `../dist/mf-dashboard`) | root-app/src/App.tsx:7; root-app/src/App.tsx:63; root-app/src/App.tsx:73 |
| 4 | root-app | mf-personagem-detalhe | host → remote | source → target | module-federation | Yes | Yes | root-app/vite.config.ts:18-20 (remote `mf_personagem_detalhe`, local `localhost:4176` or GitHub Pages `/mf-personagem-detalhe/assets/remoteEntry.js`); root-app/vite.config.ts:31-35 (`federation` with `name: "root_app"` and `remotes`); mf-personagem-detalhe/vite.config.ts:11-15 (`name: "mf_personagem_detalhe"`, `filename: "remoteEntry.js"`, exposes `./PersonagemDetalhe`); mf-personagem-detalhe/vite.config.ts:23 (output `../dist/mf-personagem-detalhe`) | root-app/src/App.tsx:8; root-app/src/App.tsx:24; root-app/src/App.tsx:63 |

## Observations

**1. root-app → mf-navbar.** Specifier `mf_navbar/Navbar` (root-app/src/App.tsx:5) matches `name: "mf_navbar"` and remote key `./Navbar` (mf-navbar/vite.config.ts:11-14), pointing to `./src/Navbar.tsx`; production path `/mf-navbar/` matches the output folder (mf-navbar/vite.config.ts:23). Local port 4174 only corroborates, through the README (README.md:63). This is the only relationship not passing through routes: navbar is rendered outside `Routes`, only when a user exists, with `user` and `onLogout` (root-app/src/App.tsx:59), hence root-app/src/App.tsx:63 does not enter here.

**2. root-app → mf-login.** `mf_login/Login` (root-app/src/App.tsx:6) matches `name: "mf_login"` and `./Login` (mf-login/vite.config.ts:11-14), and `/mf-login/` matches output `../dist/mf-login` (mf-login/vite.config.ts:23). The exposed module is the remote's own `App` (`./src/App.tsx`, mf-login/vite.config.ts:14), switching internally between screens and calling `onAuthSuccess` on authentication (mf-login/src/App.tsx:10-14). The host mounts it at route `/login` when no user exists (root-app/src/App.tsx:64-67).

**3. root-app → mf-dashboard.** `mf_dashboard/Dashboard` (root-app/src/App.tsx:7) matches `name: "mf_dashboard"` and `./Dashboard` (mf-dashboard/vite.config.ts:11-14), and `/mf-dashboard/` matches output `../dist/mf-dashboard` (mf-dashboard/vite.config.ts:23). The host mounts it at route `/dashboard`, with `user`, `token` read from `localStorage` and `onCharacterClick`, navigating to detail (root-app/src/App.tsx:73-77). Navigation between dashboard and detail always passes through host; both remotes do not reference one another.

**4. root-app → mf-personagem-detalhe.** `mf_personagem_detalhe/PersonagemDetalhe` (root-app/src/App.tsx:8) matches `name: "mf_personagem_detalhe"` and `./PersonagemDetalhe` (mf-personagem-detalhe/vite.config.ts:11-14), and `/mf-personagem-detalhe/` matches output `../dist/mf-personagem-detalhe` (mf-personagem-detalhe/vite.config.ts:23). The host renders it in a wrapper reading route `id` and passing `onBack` (root-app/src/App.tsx:20-29), used at `/personagem/:id` (root-app/src/App.tsx:81-84).

## Summary

Relationships: 4 (host → remote: 4). Active: 4. Target outside the snapshot: 0.
Units without a relationship: none.

