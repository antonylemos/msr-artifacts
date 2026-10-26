---
schema: 1
id: 1043597864
full_name: wtlin1228/micro-frontend-workspace
url: https://github.com/wtlin1228/micro-frontend-workspace
commit: 9b81d2c5b6156084e0e9a4a3ecfdd89494d0b692
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
approaches: [module-federation, qiankun]
ui_technologies: [react]
build_tools: [rsbuild]
frontend_units: 5
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-14
---

# 029 — wtlin1228/micro-frontend-workspace

## Context

- **Implementation approach:** hybrid, with Module Federation 2 (`@module-federation/rsbuild-plugin` + `registerRemotes`/`loadRemote` runtime) and qiankun (`bootstrap`/`mount`/`unmount` lifecycles, based on single-spa) in the same host
- **Repository type:** example/proof of concept (experimentation workspace; README with only ports and commands)

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | pnpm monorepo with `packages/host`, `packages/app-mf-1`, `packages/app-mf-2`, `packages/app-qiankun-1`, `packages/app-qiankun-2` (each with its own `package.json`, `rsbuild.config.ts`, `src/index.tsx` and port, `README.md:5-11`) and contract library `packages/lib-app-interface` (`@mfw/app-interface`) | strong |
| Configuration (host) | `packages/host/module-federation.config.ts:3-16`: `name: 'host'`, empty `remotes` (with comment: loading through the runtime API), singleton `shared` for react/react-dom | moderate |
| Configuration (registration) | `packages/host/src/configs/apps.ts:9-34`: `APP_CONFIGS` with four apps, architecture type (`'Module Federation'` or `'Qiankun'`) and `entry` (`mf-manifest.json` on 4001/4002; `index.html` on 3001/3002) | strong |
| Configuration (MF remotes) | `packages/app-mf-1/module-federation.config.ts:3-13`: `name: 'mf1'`, `exposes: { '.': './src/exposed.tsx' }`, singleton `shared`; analogous `app-mf-2` | strong |
| Source code (MF loading) | `packages/host/src/app-loaders/module-federation.ts:27-43`: `registerRemotes([{ name, entry }])` + `loadRemote(name)` → `getRootComponent({ basepath: '/apps/<id>' })`; `packages/host/src/routes/apps.$baseRoute.tsx:12-25,39-56`: the route loader resolves the remote and renders it in `Suspense` | strong |
| Source code (qiankun loading) | `packages/host/src/app-loaders/qiankun.ts:7-26`: `registerMicroApps` with `entry`, `container: '#qiankun-container'`, `activeRule: '/apps/<id>'` and `props.basepath`, then `start()`; `packages/host/src/App.tsx:3,8` calls `registerQiankunApps()`; `packages/host/src/routes/apps.tsx:12` renders the container | strong |
| Source code (remotes) | `packages/app-mf-1/src/exposed.tsx:1` exports `getRootComponent`; `packages/app-qiankun-1/src/lifecycles.tsx:14-30` exports `bootstrap`/`mount` (and `unmount`) receiving `HostProps` | strong |
| Source code (contract) | `HostProps` from `@mfw/app-interface` used by the host (`module-federation.ts:6`, `qiankun.ts:1`) and remotes (`lifecycles.tsx:1`) (shared contract) | moderate |
| Build/deploy | Separate scripts `build:libs`, `build:apps`, `build:host` and `preview:*` (`README.md:15-23`); no CI/CD | moderate |
| Documentation | `README.md`: only the port table and quick start (architectural) | absent |

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | Yes | `host` + `app-mf-1`, `app-mf-2`, `app-qiankun-1`, `app-qiankun-2` |
| Q2 | Yes | Each app has its own entry, `rsbuild.config.ts` and port; they share only the `@mfw/app-interface` types library, with no source code imports between apps |
| Q3 | Yes | The host routes `/apps/<id>` to each app (`apps.$baseRoute.tsx`, `qiankun.ts:12-17`) |
| Q4 | Yes | MF runtime (`registerRemotes`/`loadRemote`) and qiankun (`registerMicroApps`/`start`) configured and in use, driven by `APP_CONFIGS` |
| Q5 | Yes | Q1–Q4 converge; no discrepancy to justify |

## Rationale

- Q1–Q5 are all Yes, satisfying the MFE-implemented rule.
- Matches "monorepos containing a host and its remotes" and "hybrid implementations": a single host orchestrates two different composition mechanisms, chosen per app through configuration.

## Analysis notes

- **RQ2:** explicit hybrid case (Module Federation + qiankun/single-spa in the same host), with architecture type declared per app in `APP_CONFIGS`.
- **RQ3:** empty static `remotes` in `module-federation.config.ts` + `registerRemotes` at runtime show that the host → remote relationship may be absent from build config; it is in code and an app registry (which, according to the comment in `apps.ts:8`, would come from an API in production).
- **RQ1:** the `@mfw/app-interface` library defines the contract (`HostProps`) between host and apps, an explicit boundary artifact.
