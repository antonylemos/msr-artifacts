---
schema: 1
id: 1007785611
full_name: a-kelen/mfe
commit: 80e4481f9b927142d2c57f4c2787da93ad01b54e
inputs:
  - docs/mfe-dependency-review
  - docs/mfe-structure-review
  - docs/mfe-source-review
  - docs/mfe-composition-review
  - docs/mfe-build-deploy-review
  - docs/mfe-documentation-review
  - docs/mfe-history-review
annotation:
  method: manual
  status: final
  date: 2026-10-21
---

# 017 — a-kelen/mfe

## Repository overview

React container composes three remotes, React `auth`/`marketing` and Vue `dashboard`, through webpack 5 native Module Federation. Hence no dependency observation.

Chain complete/duplicated for development/production:
- **Configuration:**
  - each remote declares itself/exposes module in development/production (#1, #2, #5 through #8);
  - container declares all three in both (#3, #4). Production location `<domínio>/<app>/latest/remoteEntry.js`. English explanation: original placeholders mean domain/application.
- **Code:**
  - remotes export `mount` (#13 through #15);
  - container imports each remote module by name (#17 through #19), mounting in own element (#20 through #22);
  - container routes decide placement (#23).
- **Relationships:** three active relationships (#32 through #34) between four independently bounded units.

Publication separate per application (#35 through #38). Each own workflow, triggered only by own folder changes, publishing to own bucket prefix/invalidating own entry file only. No versioning: all publish under `latest`.

Asynchronous bootstraps (#9 through #12) and Vue `app.mount` (#16) are internal to each unit. Repository has neither documentation nor historical question to clarify.

## Observations

### 1. packages/auth/config/webpack.prod.js:1-24

**Observation:** Production `publicPath: '/auth/latest/'`. `ModuleFederationPlugin` declares `name: 'auth'` and `filename: 'remoteEntry.js'`, exposing `./AuthApp` (`./src/bootstrap`), sharing `dependencies` from `package.json`.

**Interpretation:** Auth configured as production remote at own path.

### 2. packages/auth/config/webpack.dev.js:1-29

**Observation:** Development port 8082. `ModuleFederationPlugin` declares `name: 'auth'`, exposing `./AuthApp` (`./src/bootstrap`).

**Interpretation:** Auth configured as development remote.

### 3. packages/container/config/webpack.prod.js:1-27

**Observation:** Production `publicPath: '/container/latest/'`. `ModuleFederationPlugin` declares `name: 'container'` and remotes `marketing`, `auth` and `dashboard` at `${domain}/<app>/latest/remoteEntry.js`, `domain` from `PRODUCTION_DOMAIN`.

**Interpretation:** Host configuration declares three remotes/production locations.

### 4. packages/container/config/webpack.dev.js:1-30

**Observation:** Development port 8080. `ModuleFederationPlugin` declares `name: 'container'` and remotes `marketing@http://localhost:8081`, `auth@http://localhost:8082` and `dashboard@http://localhost:8084/remoteEntry.js`.

**Interpretation:** Host configuration declares three remotes/development locations.

### 5. packages/dashboard/config/webpack.prod.js:1-24

**Observation:** Production `publicPath: '/dashboard/latest/'`. `ModuleFederationPlugin` declares `name: 'dashboard'`, exposing `./DashboardApp` (`./src/bootstrap`).

**Interpretation:** Dashboard configured as production remote at own path.

### 6. packages/dashboard/config/webpack.dev.js:1-32

**Observation:** Development port 8084 with CORS allowed. `ModuleFederationPlugin` declares `name: 'dashboard'`, exposing `./DashboardApp`.

**Interpretation:** Dashboard configured as development remote.

### 7. packages/marketing/config/webpack.prod.js:1-24

**Observation:** Production `publicPath: '/marketing/latest/'`. `ModuleFederationPlugin` declares `name: 'marketing'`, exposing `./MarketingApp` (`./src/bootstrap`).

**Interpretation:** Marketing configured as production remote at own path.

### 8. packages/marketing/config/webpack.dev.js:1-29

**Observation:** Development port 8081. `ModuleFederationPlugin` declares `name: 'marketing'`, exposing `./MarketingApp`.

**Interpretation:** Marketing configured as development remote.

**Note:** Four applications’ `webpack.common.js` files, cited in same table, only configure loaders/HTML template without composition element. No observation.

### 9. packages/auth/src/index.js:1

**Observation:** `import('./bootstrap')`.

**Interpretation:** Asynchronous bootstrap internal to unit.

### 10. packages/container/src/index.js:1

**Observation:** `import('./bootstrap')`.

**Interpretation:** Asynchronous bootstrap internal to unit.

### 11. packages/dashboard/src/index.js:1

**Observation:** `import('./bootstrap')`.

**Interpretation:** Asynchronous bootstrap internal to unit.

### 12. packages/marketing/src/index.js:1

**Observation:** `import('./bootstrap')`.

**Interpretation:** Asynchronous bootstrap internal to unit.

### 13. packages/auth/src/bootstrap.js:34; packages/auth/src/bootstrap.js:7-23

**Observation:** `export { mount }` in file exposed as `./AuthApp`. `mount` receives element/navigation options, returning `onParentNavigate`.

**Interpretation:** Auth offers mounting function with navigation synchronization to host.

### 14. packages/dashboard/src/bootstrap.js:4-16

**Observation:** `export { mount }`, with `mount(el)` creating/mounting Vue application, in file exposed as `./DashboardApp`.

**Interpretation:** Dashboard offers mounting function to host without navigation exchange.

### 15. packages/marketing/src/bootstrap.js:33; packages/marketing/src/bootstrap.js:6-23

**Observation:** `export { mount }` in file exposed as `./MarketingApp`, with navigation options.

**Interpretation:** Marketing offers mounting function with navigation synchronization to host.

### 16. packages/dashboard/src/bootstrap.js:6

**Observation:** Vue `app.mount(el)` within exported `mount`.

**Interpretation:** Rendering internal to dashboard without MFE mechanism.

### 17. packages/container/src/components/AuthApp.js:4

**Observation:** `import { mount as mountAuthApp } from 'auth/AuthApp'`.

**Interpretation:** Host imports auth remote exposed module by name.

### 18. packages/container/src/components/DashboardApp.js:2

**Observation:** `import { mount as mountDashboardApp } from 'dashboard/DashboardApp'`.

**Interpretation:** Host imports dashboard remote exposed module by name.

### 19. packages/container/src/components/MarketingApp.js:4

**Observation:** `import { mount as mountMarketingApp } from 'marketing/MarketingApp'`.

**Interpretation:** Host imports marketing remote exposed module by name.

### 20. packages/container/src/components/AuthApp.js:10-21

**Observation:** Calls `mountAuthApp(ref.current, { initialPath, onNavigate, onSignIn })`, registering `onParentNavigate` in container history.

**Interpretation:** Host mounts remote in own element, synchronizing navigation.

### 21. packages/container/src/components/DashboardApp.js:7-9

**Observation:** Calls `mountDashboardApp(ref.current)`.

**Interpretation:** Host mounts Vue remote in own element.

### 22. packages/container/src/components/MarketingApp.js:11-20

**Observation:** Calls `mountMarketingApp(ref.current, { … onNavigate })`, registering `onParentNavigate`.

**Interpretation:** Host mounts remote in own element, synchronizing navigation.

### 23. packages/container/src/App.js:40-48

**Observation:** `Switch` links `/auth` to `AuthApp`, `/dashboard` to `DashboardApp` (login only) and `/` to `MarketingApp`.

**Interpretation:** Host routing declares placement of each remote.

### 24. packages/auth; packages/auth/package.json:1-7; packages/auth/src/index.js:1; packages/auth/src/bootstrap.js:7-16; packages/auth/config/webpack.prod.js:1-10; .github/workflows/auth.yml:10-26

**Observation:** Own manifest, entry, webpack build and workflow.

**Interpretation:** Frontend unit with own boundary.

### 25. packages/auth/config

**Observation:** Contains auth webpack configurations.

**Interpretation:** Part of auth build rather than application.

### 26. packages/container; packages/container/package.json:1-7; packages/container/src/index.js:1; packages/container/src/bootstrap.js:1-5; packages/container/config/webpack.prod.js:1-10; .github/workflows/container.yml:10-28

**Observation:** Own manifest, entry, webpack build and workflow.

**Interpretation:** Frontend unit with own boundary.

### 27. packages/container/config

**Observation:** Contains container webpack configurations.

**Interpretation:** Part of container build rather than application.

### 28. packages/dashboard; packages/dashboard/package.json:1-7; packages/dashboard/src/index.js:1; packages/dashboard/src/bootstrap.js:4-12; packages/dashboard/config/webpack.prod.js:1-10; .github/workflows/dashboard.yml:10-26

**Observation:** Own manifest, entry, webpack build and workflow.

**Interpretation:** Frontend unit with own boundary.

### 29. packages/dashboard/config

**Observation:** Contains dashboard webpack configurations.

**Interpretation:** Part of dashboard build rather than application.

### 30. packages/marketing; packages/marketing/package.json:1-7; packages/marketing/src/index.js:1; packages/marketing/src/bootstrap.js:6-15; packages/marketing/config/webpack.prod.js:1-10; .github/workflows/marketing.yml:10-26

**Observation:** Own manifest, entry, webpack build and workflow.

**Interpretation:** Frontend unit with own boundary.

### 31. packages/marketing/config

**Observation:** Contains marketing webpack configurations.

**Interpretation:** Part of marketing build rather than application.

### 32. packages/container/src/components/AuthApp.js:4, 11; packages/container/src/App.js:41-43; packages/container/config/webpack.prod.js:17, 19; packages/auth/config/webpack.prod.js:10-17

**Observation:** Container imports `mount` from `auth/AuthApp`, calling in `/auth` route wrapper. Name, module and `/auth/latest/` path match auth configuration.

**Interpretation:** Active host → remote relationship.

### 33. packages/container/src/components/DashboardApp.js:2, 8; packages/container/src/App.js:44-47; packages/container/config/webpack.prod.js:17, 20; packages/dashboard/config/webpack.prod.js:10-17

**Observation:** Container imports `mount` from `dashboard/DashboardApp`, calling in `/dashboard` route wrapper. Name, module and path match dashboard configuration.

**Interpretation:** Active host → remote relationship between React host/Vue remote.

### 34. packages/container/src/components/MarketingApp.js:4, 11; packages/container/src/App.js:48; packages/container/config/webpack.prod.js:17-18; packages/marketing/config/webpack.prod.js:10-17

**Observation:** Container imports `mount` from `marketing/MarketingApp`, calling in `/` route wrapper. Name, module and path match marketing configuration.

**Interpretation:** Active host → remote relationship.

### 35. packages/auth/package.json:6; packages/auth/config/webpack.prod.js:1-10; .github/workflows/auth.yml:3-12, 26, 32

**Observation:** Own workflow triggered by auth folder changes, building there, synchronizing `dist` with `auth/latest`, invalidating only `remoteEntry.js`.

**Interpretation:** Own build/deployment boundaries without independent versioning.

### 36. packages/container/package.json:6; packages/container/config/webpack.prod.js:1-27; .github/workflows/container.yml:3-12, 22-25, 28, 34

**Observation:** Own workflow builds container with `PRODUCTION_DOMAIN`, synchronizing with `container/latest`, invalidating only `index.html`.

**Interpretation:** Own build/deployment boundaries without independent versioning. Remotes can republish without host rebuild because fetched under `latest`.

### 37. packages/dashboard/package.json:6; packages/dashboard/config/webpack.prod.js:1-10; .github/workflows/dashboard.yml:3-12, 26, 32

**Observation:** Own workflow triggered by dashboard folder changes, synchronizing with `dashboard/latest`, invalidating only `remoteEntry.js`.

**Interpretation:** Own build/deployment boundaries without independent versioning.

### 38. packages/marketing/package.json:6; packages/marketing/config/webpack.prod.js:1-10; .github/workflows/marketing.yml:3-12, 26, 32

**Observation:** Own workflow triggered by marketing folder changes, synchronizing with `marketing/latest`, invalidating only `remoteEntry.js`.

**Interpretation:** Own build/deployment boundaries without independent versioning.

## Classification

| # | Origin | Dimension | Type | Approach | Evidence | Strength | Relationships |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.3 (packages/auth, Build); 3.4.3 (packages/auth/config, Markers); 3.4.4 (packages/auth/src/bootstrap.js:34, Observation); 3.4.5 #1 (Configuration); 3.4.6 #1 (Artifacts) | 2 configuration | configuration | module-federation | technological | moderate | configures #24; configures #32 |
| 2 | 3.4.3 (packages/auth/config, Markers) | 2 configuration | configuration | module-federation | technological | moderate | configures #24; configures #32 |
| 3 | 3.4.3 (packages/container, Build); 3.4.3 (packages/container/config, Markers); 3.4.5 #1, #2, #3 (Configuration); 3.4.6 #2 (Artifacts) | 2 configuration | configuration | module-federation | architectural | strong | configures #26; configures #32; configures #33; configures #34 |
| 4 | 3.4.3 (packages/container/config, Markers); 3.4.5 #1, #2, #3 (Configuration) | 2 configuration | configuration | module-federation | architectural | strong | configures #26; configures #32; configures #33; configures #34 |
| 5 | 3.4.3 (packages/dashboard, Build); 3.4.3 (packages/dashboard/config, Markers); 3.4.4 (packages/dashboard/src/bootstrap.js:16, Observation); 3.4.5 #2 (Configuration); 3.4.6 #3 (Artifacts) | 2 configuration | configuration | module-federation | technological | moderate | configures #28; configures #33 |
| 6 | 3.4.3 (packages/dashboard/config, Markers) | 2 configuration | configuration | module-federation | technological | moderate | configures #28; configures #33 |
| 7 | 3.4.3 (packages/marketing, Build); 3.4.3 (packages/marketing/config, Markers); 3.4.4 (packages/marketing/src/bootstrap.js:33, Observation); 3.4.5 #3 (Configuration); 3.4.6 #4 (Artifacts) | 2 configuration | configuration | module-federation | technological | moderate | configures #30; configures #34 |
| 8 | 3.4.3 (packages/marketing/config, Markers) | 2 configuration | configuration | module-federation | technological | moderate | configures #30; configures #34 |
| 9 | 3.4.4 (packages/auth/src/index.js:1) | 3 code | source code | — | technological | weak | — |
| 10 | 3.4.4 (packages/container/src/index.js:1) | 3 code | source code | — | technological | weak | — |
| 11 | 3.4.4 (packages/dashboard/src/index.js:1) | 3 code | source code | — | technological | weak | — |
| 12 | 3.4.4 (packages/marketing/src/index.js:1) | 3 code | source code | — | technological | weak | — |
| 13 | 3.4.4 (packages/auth/src/bootstrap.js:34) | 3 code | source code | module-federation | technological | moderate | implements #32 |
| 14 | 3.4.4 (packages/dashboard/src/bootstrap.js:16) | 3 code | source code | module-federation | technological | moderate | implements #33 |
| 15 | 3.4.4 (packages/marketing/src/bootstrap.js:33) | 3 code | source code | module-federation | technological | moderate | implements #34 |
| 16 | 3.4.4 (packages/dashboard/src/bootstrap.js:6) | 3 code | source code | — | context | weak | — |
| 17 | 3.4.4 (packages/container/src/components/AuthApp.js:4) | 3 code | source code | module-federation | architectural | strong | implements #32 |
| 18 | 3.4.4 (packages/container/src/components/DashboardApp.js:2) | 3 code | source code | module-federation | architectural | strong | implements #33 |
| 19 | 3.4.4 (packages/container/src/components/MarketingApp.js:4) | 3 code | source code | module-federation | architectural | strong | implements #34 |
| 20 | 3.4.4 (packages/container/src/components/AuthApp.js:11) | 3 code | source code | module-federation | technological | moderate | implements #32 |
| 21 | 3.4.4 (packages/container/src/components/DashboardApp.js:8) | 3 code | source code | module-federation | technological | moderate | implements #33 |
| 22 | 3.4.4 (packages/container/src/components/MarketingApp.js:11) | 3 code | source code | module-federation | technological | moderate | implements #34 |
| 23 | 3.4.4 (packages/container/src/App.js:40) | 3 code | source code | module-federation | architectural | strong | implements #32; implements #33; implements #34 |
| 24 | 3.4.3 (packages/auth) | 4 structure | directory | — | architectural | moderate | — |
| 25 | 3.4.3 (packages/auth/config) | 4 structure | directory | — | context | weak | — |
| 26 | 3.4.3 (packages/container) | 4 structure | directory | — | architectural | moderate | — |
| 27 | 3.4.3 (packages/container/config) | 4 structure | directory | — | context | weak | — |
| 28 | 3.4.3 (packages/dashboard) | 4 structure | directory | — | architectural | moderate | — |
| 29 | 3.4.3 (packages/dashboard/config) | 4 structure | directory | — | context | weak | — |
| 30 | 3.4.3 (packages/marketing) | 4 structure | directory | — | architectural | moderate | — |
| 31 | 3.4.3 (packages/marketing/config) | 4 structure | directory | — | context | weak | — |
| 32 | 3.4.5 #1 | 5 composition | source code | module-federation | architectural | strong | links #26; links #24 |
| 33 | 3.4.5 #2 | 5 composition | source code | module-federation | architectural | strong | links #26; links #28 |
| 34 | 3.4.5 #3 | 5 composition | source code | module-federation | architectural | strong | links #26; links #30 |
| 35 | 3.4.6 #1 | 6 build-deploy | CI | — | architectural | moderate | publishes #24 |
| 36 | 3.4.6 #2 | 6 build-deploy | CI | — | architectural | moderate | publishes #26 |
| 37 | 3.4.6 #3 | 6 build-deploy | CI | — | architectural | moderate | publishes #28 |
| 38 | 3.4.6 #4 | 6 build-deploy | CI | — | architectural | moderate | publishes #30 |

## Summary

Observations: 38. Dimensions (technology: 0, configuration: 8, code: 15, structure: 8, composition: 3, build-deploy: 4, documentation: 0, history: 0). Strength (strong: 9, moderate: 20, weak: 9, ambiguous: 0). Evidence (technological: 16, architectural: 17, context: 5).

