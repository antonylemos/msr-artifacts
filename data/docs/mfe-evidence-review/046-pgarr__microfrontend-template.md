---
schema: 1
id: 1080660279
full_name: pgarr/microfrontend-template
commit: 8869e1289ab5b8e758cb6a465425997296b6ca32
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

# 046 — pgarr/microfrontend-template

## Repository overview

Template with same architecture as repository 017: React container/three remotes, React `auth`/`marketing` and Vue `dashboard`, using webpack 5 native Module Federation. Same chain duplicated for development/production:
- **Configuration:**
  - each remote declares itself/exposes module (#1, #2, #5 through #8);
  - container declares three remotes (#3, #4). Production path `<domínio>/<app>/latest/remoteEntry.js`. English explanation: original placeholders mean domain/application.
- **Code:**
  - remotes export `mount` (#13 through #15);
  - container imports each remote module by name (#20 through #22), mounts in own element (#16 through #18), routes deciding placement (#23).
- **Relationships:** three active relationships result (#32 through #34).

Publication separation same as repository 017 (#35 through #38). Each application has own workflow publishing to own bucket prefix/invalidating own entry file only, without versioning.

Difference from repository 017 is documentation. Course-pattern comments describe isolated/container mounting/navigation synchronization. Ten claims corroborated (#39 through #48).

Asynchronous bootstraps (#9 through #12) and Vue `app.mount` (#19) internal to each unit. No historical question to clarify.

## Observations

### 1. auth/config/webpack.prod.js:1-38

**Observation:** Production `publicPath: '/auth/latest/'`. `ModuleFederationPlugin` declares `name: 'auth'` and `filename: 'remoteEntry.js'`, exposing `./AuthApp` (`./src/bootstrap`), sharing `dependencies`, with `react` singleton.

**Interpretation:** Auth configured as production remote at own path.

### 2. auth/config/webpack.dev.js:1-47

**Observation:** Development port 8082. `ModuleFederationPlugin` declares `name: 'auth'`, exposing `./AuthApp`.

**Interpretation:** Auth configured as development remote.

### 3. container/config/webpack.prod.js:1-41

**Observation:** Production `publicPath: '/container/latest/'`. `ModuleFederationPlugin` declares `name: 'container'` and remotes `marketing`, `auth` and `dashboard` at `${domain}/<app>/latest/remoteEntry.js`, `domain` from `PRODUCTION_DOMAIN`.

**Interpretation:** Host configuration declares three remotes/production locations.

### 4. container/config/webpack.dev.js:1-44

**Observation:** Development port 8080. `ModuleFederationPlugin` declares `name: 'container'` and remotes `marketing@http://localhost:8081`, `auth@http://localhost:8082` and `dashboard@http://localhost:8083/remoteEntry.js`.

**Interpretation:** Host configuration declares three remotes/development locations.

### 5. dashboard/config/webpack.prod.js:1-24

**Observation:** Production `publicPath: '/dashboard/latest/'`. `ModuleFederationPlugin` declares `name: 'dashboard'`, exposing `./DashboardApp` (`./src/bootstrap`).

**Interpretation:** Dashboard configured as production remote at own path.

### 6. dashboard/config/webpack.dev.js:1-36

**Observation:** Development port 8083 with CORS allowed. `ModuleFederationPlugin` declares `name: 'dashboard'`, exposing `./DashboardApp`.

**Interpretation:** Dashboard configured as development remote.

### 7. marketing/config/webpack.prod.js:1-38

**Observation:** Production `publicPath: '/marketing/latest/'`. `ModuleFederationPlugin` declares `name: 'marketing'`, exposing `./MarketingApp` (`./src/bootstrap`).

**Interpretation:** Marketing configured as production remote at own path.

### 8. marketing/config/webpack.dev.js:1-47

**Observation:** Development port 8081. `ModuleFederationPlugin` declares `name: 'marketing'`, exposing `./MarketingApp`.

**Interpretation:** Marketing configured as development remote.

**Note:** Four applications’ `webpack.common.js`, cited in same table, have no composition element. No observation.

### 9. auth/src/index.js:1

**Observation:** `import('./bootstrap')`.

**Interpretation:** Asynchronous bootstrap internal to unit.

### 10. container/src/index.js:1

**Observation:** `import('./bootstrap')`.

**Interpretation:** Asynchronous bootstrap internal to unit.

### 11. dashboard/src/index.js:1

**Observation:** `import('./bootstrap')`.

**Interpretation:** Asynchronous bootstrap internal to unit.

### 12. marketing/src/index.js:1

**Observation:** `import('./bootstrap')`.

**Interpretation:** Asynchronous bootstrap internal to unit.

### 13. auth/src/bootstrap.js:46; auth/src/bootstrap.js:14-31

**Observation:** `export { mount }` in file exposed as `./AuthApp`, with navigation options.

**Interpretation:** Auth offers mounting function with navigation synchronization to host.

### 14. dashboard/src/bootstrap.js:22; dashboard/src/bootstrap.js:5-8

**Observation:** `export { mount }` in file exposed as `./DashboardApp`, with `mount(el)` creating Vue application.

**Interpretation:** Dashboard offers mounting function to host without navigation exchange.

### 15. marketing/src/bootstrap.js:46; marketing/src/bootstrap.js:14-31

**Observation:** `export { mount }` in file exposed as `./MarketingApp`, with navigation options.

**Interpretation:** Marketing offers mounting function with navigation synchronization to host.

### 16. container/src/components/AuthApp.js:13-29

**Observation:** Calls auth `mount` in wrapper `ref`, with initial path, `onNavigate` and `onSignIn`, storing returned `onParentNavigate`.

**Interpretation:** Host mounts remote in own element, synchronizing navigation.

### 17. container/src/components/DashboardApp.js:8

**Observation:** Calls dashboard `mount` in wrapper `ref`.

**Interpretation:** Host mounts Vue remote in own element.

### 18. container/src/components/MarketingApp.js:13-28

**Observation:** Calls marketing `mount` in wrapper `ref`, with `onNavigate`, storing `onParentNavigate`.

**Interpretation:** Host mounts remote in own element, synchronizing navigation.

### 19. dashboard/src/bootstrap.js:5-8

**Observation:** Vue `app.mount(el)` within exported `mount`.

**Interpretation:** Rendering internal to dashboard without MFE mechanism.

### 20. container/src/components/AuthApp.js:1

**Observation:** Imports `mount` from `auth/AuthApp`.

**Interpretation:** Host imports auth remote exposed module by name.

### 21. container/src/components/DashboardApp.js:1

**Observation:** Imports `mount` from `dashboard/DashboardApp`.

**Interpretation:** Host imports dashboard remote exposed module by name.

### 22. container/src/components/MarketingApp.js:1

**Observation:** Imports `mount` from `marketing/MarketingApp`.

**Interpretation:** Host imports marketing remote exposed module by name.

### 23. container/src/App.js:29-37

**Observation:** `Routes` links `/auth/*` to `AuthLazy`, `/dashboard` to `DashboardLazy` (redirecting to `/` without login), `/*` to `MarketingLazy`.

**Interpretation:** Host routing declares remote placement.

### 24. auth; auth/package.json:1-7; auth/src/index.js:1; auth/src/bootstrap.js:20-21; auth/config/webpack.prod.js:1-10; .github/workflows/auth.yml:2-23

**Observation:** Own manifest, entry, webpack build and workflow.

**Interpretation:** Frontend unit with own boundary.

### 25. auth/config

**Observation:** Contains auth webpack configurations.

**Interpretation:** Part of auth build rather than application.

### 26. container; container/package.json:1-7; container/src/index.js:1; container/src/bootstrap.js:5-6; container/config/webpack.prod.js:1-10; .github/workflows/container.yml:2-25

**Observation:** Own manifest, entry, webpack build and workflow.

**Interpretation:** Frontend unit with own boundary.

### 27. container/config

**Observation:** Contains container webpack configurations.

**Interpretation:** Part of container build rather than application.

### 28. dashboard; dashboard/package.json:1-7; dashboard/src/index.js:1; dashboard/src/bootstrap.js:5-8; dashboard/config/webpack.prod.js:1-10; .github/workflows/dashboard.yml:2-23

**Observation:** Own manifest, entry, webpack build and workflow.

**Interpretation:** Frontend unit with own boundary.

### 29. dashboard/config

**Observation:** Contains dashboard webpack configurations.

**Interpretation:** Part of dashboard build rather than application.

### 30. marketing; marketing/package.json:1-7; marketing/src/index.js:1; marketing/src/bootstrap.js:20-21; marketing/config/webpack.prod.js:1-10; .github/workflows/marketing.yml:2-23

**Observation:** Own manifest, entry, webpack build and workflow.

**Interpretation:** Frontend unit with own boundary.

### 31. marketing/config

**Observation:** Contains marketing webpack configurations.

**Interpretation:** Part of marketing build rather than application.

### 32. container/src/components/AuthApp.js:1, 13; container/src/App.js:30-32; container/config/webpack.prod.js:17, 19; auth/config/webpack.prod.js:10-17

**Observation:** Container imports `mount` from `auth/AuthApp`, calling in `/auth/*` route wrapper. Name, module and `/auth/latest/` path match auth configuration.

**Interpretation:** Active host → remote relationship.

### 33. container/src/components/DashboardApp.js:1, 8; container/src/App.js:33-35; container/config/webpack.prod.js:17, 20; dashboard/config/webpack.prod.js:10-17

**Observation:** Container imports `mount` from `dashboard/DashboardApp`, calling in `/dashboard` route wrapper. Name, module and path match dashboard configuration.

**Interpretation:** Active host → remote relationship between React host/Vue remote.

### 34. container/src/components/MarketingApp.js:1, 13; container/src/App.js:36; container/config/webpack.prod.js:17-18; marketing/config/webpack.prod.js:10-17

**Observation:** Container imports `mount` from `marketing/MarketingApp`, calling in `/*` route wrapper. Name, module and path match marketing configuration.

**Interpretation:** Active host → remote relationship.

### 35. auth/package.json:6; auth/config/webpack.prod.js:1-10; .github/workflows/auth.yml:2-11, 23, 28

**Observation:** Own workflow triggered by auth folder changes, building there, synchronizing `dist` with `auth/latest`, invalidating only `remoteEntry.js`.

**Interpretation:** Own build/deployment boundaries without independent versioning.

### 36. container/package.json:6; container/config/webpack.prod.js:6-21; .github/workflows/container.yml:2-11, 20-22, 25, 30

**Observation:** Own workflow builds container with `PRODUCTION_DOMAIN`, synchronizing with `container/latest`, invalidating only `index.html`.

**Interpretation:** Own build/deployment boundaries without independent versioning.

### 37. dashboard/package.json:6; dashboard/config/webpack.prod.js:1-10; .github/workflows/dashboard.yml:2-11, 23, 28

**Observation:** Own workflow triggered by dashboard folder changes, synchronizing with `dashboard/latest`, invalidating only `remoteEntry.js`.

**Interpretation:** Own build/deployment boundaries without independent versioning.

### 38. marketing/package.json:6; marketing/config/webpack.prod.js:1-10; .github/workflows/marketing.yml:2-11, 23, 28

**Observation:** Own workflow triggered by marketing folder changes, synchronizing with `marketing/latest`, invalidating only `remoteEntry.js`.

**Interpretation:** Own build/deployment boundaries without independent versioning.

### 39. auth/src/bootstrap.js:34-35

**Observation:** "If we are in development and in isolation, call mount immediately".

**Interpretation:** Claims auth self-mounts in isolation. Claim corroborated.

### 40. auth/src/bootstrap.js:44-45

**Observation:** "We are running through container and we should export the mount function".

**Interpretation:** Claims container mounts auth. Claim corroborated.

### 41. container/src/components/AuthApp.js:11

**Observation:** "Mount the microfrontend once".

**Interpretation:** Claims container mounts auth once. Claim corroborated.

### 42. container/src/components/AuthApp.js:24

**Observation:** "Sync navigation from container to child".

**Interpretation:** Claims container navigation forwarded to auth. Claim corroborated.

### 43. container/src/components/MarketingApp.js:11

**Observation:** "Mount the microfrontend once".

**Interpretation:** Claims container mounts marketing once. Claim corroborated.

### 44. container/src/components/MarketingApp.js:23

**Observation:** "Sync navigation from container to child".

**Interpretation:** Claims container navigation forwarded to marketing. Claim corroborated.

### 45. dashboard/src/bootstrap.js:10-11

**Observation:** "If we are in development and in isolation, call mount immediately".

**Interpretation:** Claims dashboard self-mounts in isolation. Claim corroborated.

### 46. dashboard/src/bootstrap.js:20-21

**Observation:** "We are running through container and we should export the mount function".

**Interpretation:** Claims container mounts dashboard. Claim corroborated.

### 47. marketing/src/bootstrap.js:34-35

**Observation:** "If we are in development and in isolation, call mount immediately".

**Interpretation:** Claims marketing self-mounts in isolation. Claim corroborated.

### 48. marketing/src/bootstrap.js:44-45

**Observation:** "We are running through container and we should export the mount function".

**Interpretation:** Claims container mounts marketing. Claim corroborated.

## Classification

| # | Origin | Dimension | Type | Approach | Evidence | Strength | Relationships |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.3 (auth, Build); 3.4.3 (auth/config, Markers); 3.4.4 (auth/src/bootstrap.js:46, Observation); 3.4.5 #1 (Configuration); 3.4.6 #1 (Artifacts) | 2 configuration | configuration | module-federation | technological | moderate | configures #24; configures #32 |
| 2 | 3.4.3 (auth/config, Markers) | 2 configuration | configuration | module-federation | technological | moderate | configures #24; configures #32 |
| 3 | 3.4.3 (container, Build); 3.4.3 (container/config, Markers); 3.4.5 #1, #2, #3 (Configuration); 3.4.6 #2 (Artifacts) | 2 configuration | configuration | module-federation | architectural | strong | configures #26; configures #32; configures #33; configures #34 |
| 4 | 3.4.3 (container/config, Markers); 3.4.5 #1, #2, #3 (Configuration) | 2 configuration | configuration | module-federation | architectural | strong | configures #26; configures #32; configures #33; configures #34 |
| 5 | 3.4.3 (dashboard, Build); 3.4.3 (dashboard/config, Markers); 3.4.4 (dashboard/src/bootstrap.js:22, Observation); 3.4.5 #2 (Configuration); 3.4.6 #3 (Artifacts) | 2 configuration | configuration | module-federation | technological | moderate | configures #28; configures #33 |
| 6 | 3.4.3 (dashboard/config, Markers) | 2 configuration | configuration | module-federation | technological | moderate | configures #28; configures #33 |
| 7 | 3.4.3 (marketing, Build); 3.4.3 (marketing/config, Markers); 3.4.4 (marketing/src/bootstrap.js:46, Observation); 3.4.5 #3 (Configuration); 3.4.6 #4 (Artifacts) | 2 configuration | configuration | module-federation | technological | moderate | configures #30; configures #34 |
| 8 | 3.4.3 (marketing/config, Markers) | 2 configuration | configuration | module-federation | technological | moderate | configures #30; configures #34 |
| 9 | 3.4.4 (auth/src/index.js:1) | 3 code | source code | — | technological | weak | — |
| 10 | 3.4.4 (container/src/index.js:1) | 3 code | source code | — | technological | weak | — |
| 11 | 3.4.4 (dashboard/src/index.js:1) | 3 code | source code | — | technological | weak | — |
| 12 | 3.4.4 (marketing/src/index.js:1) | 3 code | source code | — | technological | weak | — |
| 13 | 3.4.4 (auth/src/bootstrap.js:46) | 3 code | source code | module-federation | technological | moderate | implements #32 |
| 14 | 3.4.4 (dashboard/src/bootstrap.js:22) | 3 code | source code | module-federation | technological | moderate | implements #33 |
| 15 | 3.4.4 (marketing/src/bootstrap.js:46) | 3 code | source code | module-federation | technological | moderate | implements #34 |
| 16 | 3.4.4 (container/src/components/AuthApp.js:13) | 3 code | source code | module-federation | technological | moderate | implements #32 |
| 17 | 3.4.4 (container/src/components/DashboardApp.js:8) | 3 code | source code | module-federation | technological | moderate | implements #33 |
| 18 | 3.4.4 (container/src/components/MarketingApp.js:13) | 3 code | source code | module-federation | technological | moderate | implements #34 |
| 19 | 3.4.4 (dashboard/src/bootstrap.js:7) | 3 code | source code | — | context | weak | — |
| 20 | 3.4.4 (container/src/components/AuthApp.js:1) | 3 code | source code | module-federation | architectural | strong | implements #32 |
| 21 | 3.4.4 (container/src/components/DashboardApp.js:1) | 3 code | source code | module-federation | architectural | strong | implements #33 |
| 22 | 3.4.4 (container/src/components/MarketingApp.js:1) | 3 code | source code | module-federation | architectural | strong | implements #34 |
| 23 | 3.4.4 (container/src/App.js:29) | 3 code | source code | module-federation | architectural | strong | implements #32; implements #33; implements #34 |
| 24 | 3.4.3 (auth) | 4 structure | directory | — | architectural | moderate | — |
| 25 | 3.4.3 (auth/config) | 4 structure | directory | — | context | weak | — |
| 26 | 3.4.3 (container) | 4 structure | directory | — | architectural | moderate | — |
| 27 | 3.4.3 (container/config) | 4 structure | directory | — | context | weak | — |
| 28 | 3.4.3 (dashboard) | 4 structure | directory | — | architectural | moderate | — |
| 29 | 3.4.3 (dashboard/config) | 4 structure | directory | — | context | weak | — |
| 30 | 3.4.3 (marketing) | 4 structure | directory | — | architectural | moderate | — |
| 31 | 3.4.3 (marketing/config) | 4 structure | directory | — | context | weak | — |
| 32 | 3.4.5 #1 | 5 composition | source code | module-federation | architectural | strong | links #26; links #24 |
| 33 | 3.4.5 #2 | 5 composition | source code | module-federation | architectural | strong | links #26; links #28 |
| 34 | 3.4.5 #3 | 5 composition | source code | module-federation | architectural | strong | links #26; links #30 |
| 35 | 3.4.6 #1 | 6 build-deploy | CI | — | architectural | moderate | publishes #24 |
| 36 | 3.4.6 #2 | 6 build-deploy | CI | — | architectural | moderate | publishes #26 |
| 37 | 3.4.6 #3 | 6 build-deploy | CI | — | architectural | moderate | publishes #28 |
| 38 | 3.4.6 #4 | 6 build-deploy | CI | — | architectural | moderate | publishes #30 |
| 39 | 3.4.7 #1 | 7 documentation | comment | — | architectural | weak | corroborates #24; corroborates auth/src/bootstrap.js:36-42 |
| 40 | 3.4.7 #2 | 7 documentation | comment | — | architectural | weak | corroborates #32; corroborates #20; corroborates #16 |
| 41 | 3.4.7 #3 | 7 documentation | comment | — | architectural | weak | corroborates #16 |
| 42 | 3.4.7 #4 | 7 documentation | comment | — | architectural | weak | corroborates container/src/components/AuthApp.js:21, 25-29 |
| 43 | 3.4.7 #5 | 7 documentation | comment | — | architectural | weak | corroborates #18 |
| 44 | 3.4.7 #6 | 7 documentation | comment | — | architectural | weak | corroborates container/src/components/MarketingApp.js:24-28 |
| 45 | 3.4.7 #7 | 7 documentation | comment | — | architectural | weak | corroborates #28; corroborates dashboard/src/bootstrap.js:12-18 |
| 46 | 3.4.7 #8 | 7 documentation | comment | — | architectural | weak | corroborates #33; corroborates #21; corroborates #17 |
| 47 | 3.4.7 #9 | 7 documentation | comment | — | architectural | weak | corroborates #30; corroborates marketing/src/bootstrap.js:36-42 |
| 48 | 3.4.7 #10 | 7 documentation | comment | — | architectural | weak | corroborates #34; corroborates #22; corroborates #18 |

## Summary

Observations: 48. Dimensions (technology: 0, configuration: 8, code: 15, structure: 8, composition: 3, build-deploy: 4, documentation: 10, history: 0). Strength (strong: 9, moderate: 20, weak: 19, ambiguous: 0). Evidence (technological: 16, architectural: 27, context: 5).

