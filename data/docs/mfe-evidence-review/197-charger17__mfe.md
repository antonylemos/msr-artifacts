---
schema: 1
id: 997062622
full_name: charger17/mfe
commit: c04d19eb237bd77ce574657d732efe265c0de531
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
  date: 2026-10-24
---

# 197 — charger17/mfe

## Repository overview

Webpack 5 Module Federation example with four packages in `packages/`: React container composing React remotes `auth` and `marketing` and Vue 3 remote `dashboard`. Plugin comes from webpack itself, so dependency review has no row and no technology observation.

Complete snapshot chain appears twice in configuration, development and production:
- **Configuration:**
  - each remote declares own name, `remoteEntry.js` and a single exposed module, its own `src/bootstrap` (#1, #2, #5 through #8);
  - container declares three remotes (#3, #4). Development at `localhost:8081-8083`; production at `<domínio>/<app>/latest/remoteEntry.js`, domain injected at build time.
- **Code:**
  - remotes export `mount` (#9 through #11);
  - container imports each remote module by name (#16 through #18), mounting in own `div` (#12 through #14);
  - container `Switch` decides placement: `/auth`, `/dashboard` (only with login) and `/` (#19).
- **Relationships:** three active host → remote relationships result (#28 through #30), between four units with own boundaries (#20, #22, #24, #26). One links React host to Vue remote (#29).

Build and deployment (#31 through #34): four applications have own build and workflow each, triggered only by changes in application folder, publishing `dist` to `<app>/latest` prefix in same bucket and invalidating only own entry file. No independent versioning; container fetches remotes at `latest`, permitting republishing without new host build.

Misleading or excluded signals:
- Vue `app.mount` (#15) is internal dashboard rendering inside exported `mount`.
- `config` directories (#21, #23, #25, #27) only store parent unit build.
- `webpack.common.js` files declare no composition element, excluded as observations (Note in #8).
- Container passes `isSignedIn` to marketing wrapper, but wrapper receives no props and value does not reach remote (#19).

Nothing ambiguous. Repository has no documentation (`readme.txt` empty), so no claims to compare, and history of web-interface uploads had no point to clarify.

## Observations

### 1. packages/auth/config/webpack.dev.js:7-31

**Observation:** In development, `publicPath: 'http://localhost:8082/'` and port 8082. `ModuleFederationPlugin` declares `name: 'auth'` and `filename: 'remoteEntry.js'`, exposes `./AuthApp` (`./src/bootstrap`) and shares `dependencies` from `package.json`. `HtmlWebpackPlugin` uses `./public/index.html`.

**Interpretation:** Auth configured as remote in development.

### 2. packages/auth/config/webpack.prod.js:6-22

**Observation:** In production, `publicPath: '/auth/latest/'`. `ModuleFederationPlugin` declares `name: 'auth'` and `filename: 'remoteEntry.js'`, exposes `./AuthApp` (`./src/bootstrap`) and shares `dependencies` from `package.json`.

**Interpretation:** Auth configured as remote in production under own path.

### 3. packages/container/config/webpack.dev.js:6-28

**Observation:** In development, `publicPath: 'http://localhost:8080/'` and port 8080. `ModuleFederationPlugin` declares `name: 'container'` and remotes `marketing@http://localhost:8081/remoteEntry.js`, `auth@http://localhost:8082/remoteEntry.js` and `dashboard@http://localhost:8083/remoteEntry.js`, sharing `dependencies` from `package.json`.

**Interpretation:** Host configuration declares three remotes and where to find them in development.

### 4. packages/container/config/webpack.prod.js:8-25; packages/container/config/webpack.prod.js:6

**Observation:** In production, `publicPath: '/container/latest/'`. `ModuleFederationPlugin` declares `name: 'container'` and remotes `marketing`, `auth` and `dashboard` at `${domain}/<app>/latest/remoteEntry.js`, with `domain` from `process.env.PRODUCTION_DOMAIN` (line 6). Shares `dependencies` from `package.json`.

**Interpretation:** Host configuration declares three remotes and where to find them in production; domain fixed at build time.

### 5. packages/dashboard/config/webpack.dev.js:7-34

**Observation:** In development, `publicPath: 'http://localhost:8083/'`, port 8083 and header `Access-Control-Allow-Origin: '*'`. `ModuleFederationPlugin` declares `name: 'dashboard'` and `filename: 'remoteEntry.js'`, exposes `./DashboardApp` (`./src/bootstrap`) and shares `dependencies` from `package.json`. `HtmlWebpackPlugin` uses `./public/index.html`.

**Interpretation:** Dashboard configured as remote in development.

### 6. packages/dashboard/config/webpack.prod.js:6-22

**Observation:** In production, `publicPath: '/dashboard/latest/'`. `ModuleFederationPlugin` declares `name: 'dashboard'` and `filename: 'remoteEntry.js'`, exposes `./DashboardApp` (`./src/bootstrap`) and shares `dependencies` from `package.json`.

**Interpretation:** Dashboard configured as remote in production under own path.

### 7. packages/marketing/config/webpack.dev.js:7-31

**Observation:** In development, `publicPath: 'http://localhost:8081/'` and port 8081. `ModuleFederationPlugin` declares `name: 'marketing'` and `filename: 'remoteEntry.js'`, exposes `./MarketingApp` (`./src/bootstrap`) and shares `dependencies` from `package.json`. `HtmlWebpackPlugin` uses `./public/index.html`.

**Interpretation:** Marketing configured as remote in development.

### 8. packages/marketing/config/webpack.prod.js:6-22

**Observation:** In production, `publicPath: '/marketing/latest/'`. `ModuleFederationPlugin` declares `name: 'marketing'` and `filename: 'remoteEntry.js'`, exposes `./MarketingApp` (`./src/bootstrap`) and shares `dependencies` from `package.json`.

**Interpretation:** Marketing configured as remote in production under own path.

**Note:** Four application `webpack.common.js` files, cited in 3.4.3 Markers column (container also in Entry column, lines 19-23, dashboard on line 4), only configure loaders, container HTML template and, in dashboard, `entry`, `output.filename`, extensions and `VueLoaderPlugin`. None declares composition element, so none became observations.

### 9. packages/auth/src/bootstrap.js:35; packages/auth/src/bootstrap.js:6-25

**Observation:** `export { mount };` in file exposed as `./AuthApp`. `mount` receives element and `onNavigate`, `defaultHistory`, `initialPath` and `onSignIn`, creates memory history without another received, renders `App` with `onSignIn`, returning `onParentNavigate`.

**Interpretation:** Auth offers host mount function with navigation synchronization and login notification.

### 10. packages/dashboard/src/bootstrap.js:17; packages/dashboard/src/bootstrap.js:4-7

**Observation:** `export { mount };` in file exposed as `./DashboardApp`, with `mount(el)` creating Vue application with `createApp(Dashboard)` and mounting in element.

**Interpretation:** Dashboard offers host mount function without navigation exchange.

### 11. packages/marketing/src/bootstrap.js:36; packages/marketing/src/bootstrap.js:6-26

**Observation:** `export { mount };` in file exposed as `./MarketingApp`. `mount` receives element and `onNavigate`, `defaultHistory` and `initialPath`, creates memory history without another received, returning `onParentNavigate`.

**Interpretation:** Marketing offers host mount function with navigation synchronization.

### 12. packages/container/src/components/AuthApp.js:9-25

**Observation:** In dependency-free `useEffect`, calls `mount(ref.current, { initialPath, onNavigate, onSignIn })` and registers returned `onParentNavigate` in `history.listen`.

**Interpretation:** Host mounts auth remote in own element, synchronizes navigation and receives login notification.

### 13. packages/container/src/components/DashboardApp.js:7-9

**Observation:** Calls `mount(ref.current)` in dependency-free `useEffect`.

**Interpretation:** Host mounts Vue remote in own element without navigation exchange.

### 14. packages/container/src/components/MarketingApp.js:9-21

**Observation:** In dependency-free `useEffect`, calls `mount(ref.current, { initialPath, onNavigate })` and registers returned `onParentNavigate` in `history.listen`.

**Interpretation:** Host mounts marketing remote in own element, synchronizing navigation with it.

### 15. packages/dashboard/src/bootstrap.js:6

**Observation:** Vue `app.mount(el);` inside exported `mount`.

**Interpretation:** Internal dashboard rendering without MFE mechanism.

### 16. packages/container/src/components/AuthApp.js:1

**Observation:** `import { mount } from 'auth/AuthApp';`.

**Interpretation:** Host imports module exposed by auth remote by name.

### 17. packages/container/src/components/DashboardApp.js:1

**Observation:** `import { mount } from 'dashboard/DashboardApp';`.

**Interpretation:** Host imports module exposed by dashboard remote by name.

### 18. packages/container/src/components/MarketingApp.js:1

**Observation:** `import { mount } from "marketing/MarketingApp";`.

**Interpretation:** Host imports module exposed by marketing remote by name.

### 19. packages/container/src/App.js:42-55; packages/container/src/App.js:11-13

**Observation:** `Switch` links `/auth` to `AuthLazy`, with `onSignIn` changing state `isSignedIn`; `/dashboard` to `DashboardLazy`, with `<Redirect to="/" />` when `isSignedIn` false; and `/` to `MarketingLazy`, receiving `isSignedIn`. Three are wrappers loaded through `lazy`. Marketing wrapper receives no props (packages/container/src/components/MarketingApp.js:5).

**Interpretation:** Host routing declares where each of three remotes appears. `isSignedIn` passed to marketing does not reach remote.

### 20. packages/auth; packages/auth/package.json:1-30; packages/auth/src/index.js:1; packages/auth/src/bootstrap.js:27-33; packages/auth/config/webpack.prod.js:6-22; .github/workflows/auth.yml:7-8, 13

**Observation:** Own manifest, entry, React application, development and production webpack builds and workflow.

**Interpretation:** Frontend unit with own boundary.

### 21. packages/auth/config

**Observation:** Contains auth webpack configurations.

**Interpretation:** Part of auth build rather than application.

### 22. packages/container; packages/container/package.json:1-30; packages/container/src/index.js:1; packages/container/src/bootstrap.js:5-8; packages/container/config/webpack.prod.js:8-25; .github/workflows/container.yml:7-8, 13

**Observation:** Own manifest, entry, React application mounted in `#root`, webpack builds and workflow.

**Interpretation:** Frontend unit with own boundary.

### 23. packages/container/config

**Observation:** Contains container webpack configurations.

**Interpretation:** Part of container build rather than application.

### 24. packages/dashboard; packages/dashboard/package.json:1-34; packages/dashboard/config/webpack.common.js:4; packages/dashboard/src/index.js:1; packages/dashboard/src/bootstrap.js:9-15; packages/dashboard/config/webpack.prod.js:6-22; .github/workflows/dashboard.yml:7-8, 13

**Observation:** Own manifest, declared entry, Vue application, webpack builds and workflow.

**Interpretation:** Frontend unit with own boundary.

### 25. packages/dashboard/config

**Observation:** Contains dashboard webpack configurations.

**Interpretation:** Part of dashboard build rather than application.

### 26. packages/marketing; packages/marketing/package.json:1-30; packages/marketing/src/index.js:1; packages/marketing/src/bootstrap.js:28-34; packages/marketing/config/webpack.prod.js:6-22; .github/workflows/marketing.yml:7-8, 13

**Observation:** Own manifest, entry, React application, webpack builds and workflow.

**Interpretation:** Frontend unit with own boundary.

### 27. packages/marketing/config

**Observation:** Contains marketing webpack configurations.

**Interpretation:** Part of marketing build rather than application.

### 28. packages/container/src/components/AuthApp.js:1, 10; packages/container/src/App.js:43-45; packages/container/config/webpack.prod.js:19; packages/auth/config/webpack.prod.js:10-18

**Observation:** Container imports `mount` from `auth/AuthApp`, calling in wrapper linked to `/auth` route. Name `auth`, module `./AuthApp` and path `/auth/latest/` match packages/auth configuration.

**Interpretation:** An active host → remote relationship.

### 29. packages/container/src/components/DashboardApp.js:1, 8; packages/container/src/App.js:46-51; packages/container/config/webpack.prod.js:20; packages/dashboard/config/webpack.prod.js:10-18

**Observation:** Container imports `mount` from `dashboard/DashboardApp`, calling with element only in wrapper linked to `/dashboard` route, redirecting to `/` without login. Name, module and path `/dashboard/latest/` match packages/dashboard configuration.

**Interpretation:** An active host → remote relationship between React host and Vue remote.

### 30. packages/container/src/components/MarketingApp.js:1, 10; packages/container/src/App.js:52-54; packages/container/config/webpack.prod.js:18; packages/marketing/config/webpack.prod.js:10-18

**Observation:** Container imports `mount` from `marketing/MarketingApp`, calling in wrapper linked to `/` route, default route in `Switch`. Name, module and path `/marketing/latest/` match packages/marketing configuration.

**Interpretation:** An active host → remote relationship; marketing is default container page.

### 31. packages/auth/package.json:6; packages/auth/config/webpack.prod.js:6-21; .github/workflows/auth.yml:3-13, 29-30, 49, 52

**Observation:** Script `build` runs production configuration, generating `remoteEntry.js`. Own workflow triggers when `packages/auth/**` changes, runs in `packages/auth`, synchronizes `dist` with `auth/latest` and invalidates only `/auth/latest/remoteEntry.js`. Manifest version `1.0.0` unused in publication.

**Interpretation:** Own build and deployment boundaries without independent versioning.

### 32. packages/container/package.json:6; packages/container/config/webpack.prod.js:6-25; .github/workflows/container.yml:3-13, 29-32, 51, 54

**Observation:** Own workflow triggers when `packages/container/**` changes, builds container with `PRODUCTION_DOMAIN` from secret, synchronizes with `container/latest` and invalidates only `/container/latest/index.html`.

**Interpretation:** Own build and deployment boundaries without independent versioning. Remotes can be republished without new host build because fetched from `latest`.

### 33. packages/dashboard/package.json:6; packages/dashboard/config/webpack.prod.js:6-21; .github/workflows/dashboard.yml:3-13, 29-30, 49, 52

**Observation:** Own workflow triggers when `packages/dashboard/**` changes, builds only that directory, synchronizes with `dashboard/latest` and invalidates only `remoteEntry.js`. Same process as React applications.

**Interpretation:** Own build and deployment boundaries without independent versioning.

### 34. packages/marketing/package.json:6; packages/marketing/config/webpack.prod.js:6-21; .github/workflows/marketing.yml:3-13, 29-30, 49, 52

**Observation:** Own workflow triggers when `packages/marketing/**` changes, builds only that directory, synchronizes with `marketing/latest` and invalidates only `remoteEntry.js`.

**Interpretation:** Own build and deployment boundaries without independent versioning.

## Classification

| # | Origin | Dimension | Type | Approach | Evidence | Strength | Relationships |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.3 (packages/auth, Entry, Build); 3.4.3 (packages/auth/config, Markers); 3.4.4 (packages/auth/src/bootstrap.js:35, Observation); 3.4.5 #1 (Configuration); 3.4.6 #1 (Where served) | 2 configuration | configuration | module-federation | technological | moderate | configures #20; configures #28 |
| 2 | 3.4.3 (packages/auth, Build); 3.4.3 (packages/auth/config, Markers); 3.4.4 (packages/auth/src/bootstrap.js:35, Observation); 3.4.5 #1 (Configuration); 3.4.6 #1 (Where served, Artifacts) | 2 configuration | configuration | module-federation | technological | moderate | configures #20; configures #28 |
| 3 | 3.4.3 (packages/container, Build); 3.4.3 (packages/container/config, Markers); 3.4.4 (packages/container/src/components/AuthApp.js:10, DashboardApp.js:8, MarketingApp.js:10, Observation); 3.4.5 #1, #2, #3 (Configuration); 3.4.6 #2 (Where served) | 2 configuration | configuration | module-federation | architectural | strong | configures #22; configures #28; configures #29; configures #30 |
| 4 | 3.4.3 (packages/container, Build); 3.4.3 (packages/container/config, Markers); 3.4.4 (packages/container/src/components/AuthApp.js:10, DashboardApp.js:8, MarketingApp.js:10, Observation); 3.4.5 #1, #2, #3 (Configuration); 3.4.6 #2 (Where served, Artifacts) | 2 configuration | configuration | module-federation | architectural | strong | configures #22; configures #28; configures #29; configures #30 |
| 5 | 3.4.3 (packages/dashboard, Entry, Build); 3.4.3 (packages/dashboard/config, Markers); 3.4.4 (packages/dashboard/src/bootstrap.js:17, Observation); 3.4.5 #2 (Configuration); 3.4.6 #3 (Where served) | 2 configuration | configuration | module-federation | technological | moderate | configures #24; configures #29 |
| 6 | 3.4.3 (packages/dashboard, Build); 3.4.3 (packages/dashboard/config, Markers); 3.4.4 (packages/dashboard/src/bootstrap.js:17, Observation); 3.4.5 #2 (Configuration); 3.4.6 #3 (Where served, Artifacts) | 2 configuration | configuration | module-federation | technological | moderate | configures #24; configures #29 |
| 7 | 3.4.3 (packages/marketing, Entry, Build); 3.4.3 (packages/marketing/config, Markers); 3.4.4 (packages/marketing/src/bootstrap.js:36, Observation); 3.4.5 #3 (Configuration); 3.4.6 #4 (Where served) | 2 configuration | configuration | module-federation | technological | moderate | configures #26; configures #30 |
| 8 | 3.4.3 (packages/marketing, Build); 3.4.3 (packages/marketing/config, Markers); 3.4.4 (packages/marketing/src/bootstrap.js:36, Observation); 3.4.5 #3 (Configuration); 3.4.6 #4 (Where served, Artifacts) | 2 configuration | configuration | module-federation | technological | moderate | configures #26; configures #30 |
| 9 | 3.4.4 (packages/auth/src/bootstrap.js:35) | 3 code | source code | module-federation | technological | moderate | implements #28 |
| 10 | 3.4.4 (packages/dashboard/src/bootstrap.js:17) | 3 code | source code | module-federation | technological | moderate | implements #29 |
| 11 | 3.4.4 (packages/marketing/src/bootstrap.js:36) | 3 code | source code | module-federation | technological | moderate | implements #30 |
| 12 | 3.4.4 (packages/container/src/components/AuthApp.js:10) | 3 code | source code | module-federation | technological | moderate | implements #28 |
| 13 | 3.4.4 (packages/container/src/components/DashboardApp.js:8) | 3 code | source code | module-federation | technological | moderate | implements #29 |
| 14 | 3.4.4 (packages/container/src/components/MarketingApp.js:10) | 3 code | source code | module-federation | technological | moderate | implements #30 |
| 15 | 3.4.4 (packages/dashboard/src/bootstrap.js:6) | 3 code | source code | — | context | weak | — |
| 16 | 3.4.4 (packages/container/src/components/AuthApp.js:1) | 3 code | source code | module-federation | architectural | strong | implements #28 |
| 17 | 3.4.4 (packages/container/src/components/DashboardApp.js:1) | 3 code | source code | module-federation | architectural | strong | implements #29 |
| 18 | 3.4.4 (packages/container/src/components/MarketingApp.js:1) | 3 code | source code | module-federation | architectural | strong | implements #30 |
| 19 | 3.4.4 (packages/container/src/App.js:42) | 3 code | source code | module-federation | architectural | strong | implements #28; implements #29; implements #30 |
| 20 | 3.4.3 (packages/auth) | 4 structure | directory | — | architectural | moderate | — |
| 21 | 3.4.3 (packages/auth/config) | 4 structure | directory | — | context | weak | — |
| 22 | 3.4.3 (packages/container) | 4 structure | directory | — | architectural | moderate | — |
| 23 | 3.4.3 (packages/container/config) | 4 structure | directory | — | context | weak | — |
| 24 | 3.4.3 (packages/dashboard) | 4 structure | directory | — | architectural | moderate | — |
| 25 | 3.4.3 (packages/dashboard/config) | 4 structure | directory | — | context | weak | — |
| 26 | 3.4.3 (packages/marketing) | 4 structure | directory | — | architectural | moderate | — |
| 27 | 3.4.3 (packages/marketing/config) | 4 structure | directory | — | context | weak | — |
| 28 | 3.4.5 #1 | 5 composition | source code | module-federation | architectural | strong | links #22; links #20 |
| 29 | 3.4.5 #2 | 5 composition | source code | module-federation | architectural | strong | links #22; links #24 |
| 30 | 3.4.5 #3 | 5 composition | source code | module-federation | architectural | strong | links #22; links #26 |
| 31 | 3.4.6 #1 | 6 build-deploy | CI | — | architectural | moderate | publishes #20 |
| 32 | 3.4.6 #2 | 6 build-deploy | CI | — | architectural | moderate | publishes #22 |
| 33 | 3.4.6 #3 | 6 build-deploy | CI | — | architectural | moderate | publishes #24 |
| 34 | 3.4.6 #4 | 6 build-deploy | CI | — | architectural | moderate | publishes #26 |

## Summary

Observations: 34. Dimensions (technology: 0, configuration: 8, code: 11, structure: 8, composition: 3, build-deploy: 4, documentation: 0, history: 0). Strength (strong: 9, moderate: 20, weak: 5, ambiguous: 0). Evidence (technological: 12, architectural: 17, context: 5).

