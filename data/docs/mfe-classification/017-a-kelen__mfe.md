---
schema: 1
id: 1007785611
full_name: a-kelen/mfe
url: https://github.com/a-kelen/mfe
commit: 80e4481f9b927142d2c57f4c2787da93ad01b54e
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
approaches: [module-federation]
ui_technologies: [react, vue]
build_tools: [webpack]
frontend_units: 4
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-14
---

# 017 — a-kelen/mfe

## Context

- **Implementation approach:** Module Federation (webpack 5) with a `mount(el, options)` contract; React + Vue hybrid
- **Repository type:** example/proof of concept (course structure: `container`, `marketing`, `auth`, `dashboard`; no README)
- **Assessed commit:** `80e4481` (default branch `master`)

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | Monorepo with four apps in `packages/`: `container`, `marketing`, `auth` (React 17) and `dashboard` (Vue 3.2, `packages/dashboard/package.json:13`), each with `package.json`, `config/webpack.{common,dev,prod}.js`, `public/index.html`, `src/index.js` and `src/bootstrap.js` | strong |
| Configuration (host) | `packages/container/config/webpack.dev.js:18-25`: `remotes` for `marketing` (8081), `auth` (8082) and `dashboard` (8084); `packages/container/config/webpack.prod.js:15-23`: the same remotes at `${PRODUCTION_DOMAIN}/<app>/latest/remoteEntry.js`; `shared: packageJson.dependencies` | strong |
| Configuration (remotes) | `packages/{auth,dashboard,marketing}/config/webpack.prod.js:14-17`: `name`, `filename: 'remoteEntry.js'` and `exposes` (`./AuthApp`, `./DashboardApp`, `./MarketingApp` → `./src/bootstrap`); `publicPath` `/<app>/latest/` (`:10`) | strong |
| Source code (composition) | `packages/container/src/App.js:7-9` lazily loads the wrappers through `lazy`; `:41-48` mounts `AuthApp` at `/auth`, `DashboardApp` at `/dashboard` (with login guard, `:45`) and `MarketingApp` at `/` | strong |
| Source code (integration) | `packages/container/src/components/AuthApp.js:4` imports `mount` from `auth/AuthApp`; `:11-21` passes `initialPath`, `onNavigate` and `onSignIn` and synchronizes history through `onParentNavigate`; `DashboardApp.js:2,8` mounts the Vue remote | strong |
| Source code (Vue remote) | `packages/dashboard/src/bootstrap.js:1-16`: `createApp(Dashboard).mount(el)`, exported as `mount` | strong |
| Build/deploy | `.github/workflows/{container,marketing,auth,dashboard}.yml`: one workflow per app, triggered by `paths` (`marketing.yml:7-8`), with `aws s3 sync dist s3://…/<app>/latest` (`:26`) and CloudFront invalidation for `remoteEntry.js` (`:32`) | strong |
| Documentation | No README | absent |

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | Yes | `container`, `marketing`, `auth` and `dashboard` in `packages/` |
| Q2 | Yes | Each app has its own webpack, entry and deployment workflow (`.github/workflows/*.yml`, S3 by prefix); no source code imports between apps |
| Q3 | Yes | The container routes to and mounts all three remotes (`App.js:41-48`) |
| Q4 | Yes | `remotes`/`exposes` configured in development and production and used through `mount` (`AuthApp.js:4,11`, `DashboardApp.js:2,8`) |
| Q5 | Yes | Q1–Q4 converge; no discrepancy to justify |

## Rationale

- Q1–Q5 are all Yes, satisfying the MFE-implemented rule.
- Matches "monorepos containing a host and its remotes" and "hybrid implementations" (a Vue remote inside a React container).
- The evidence chain is complete: `remotes`/`exposes` config → wrappers with `mount` → routing in the container → independent deployment per app to S3/CloudFront.

## Analysis notes

- **RQ2:** a hybrid framework case (React + Vue) under Module Federation; the `mount(el)` contract decouples the remote's framework.
- **RQ3:** bidirectional routing integration (`onNavigate` ↔ `onParentNavigate`) and authentication callback (`onSignIn`) between host and remote.
- **Protocol (family):** same structure as repository 007 (`react-js/`), typical of a well-known micro-frontends course; complete here, with deployment.
