---
schema: 1
id: 1063353073
full_name: Varshithknaik/mfe-lect
commit: deea3350c74ee5de8427c190378733b644ae4b53
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

# 177 — Varshithknaik/mfe-lect

## Repository overview

Webpack 5 Module Federation learning project. React container composes React remotes `auth` and `marketing` and, in one copy, Vue dashboard. Plugin comes from webpack itself, so no dependency observation.

Snapshot contains two trees with same unit names:
- **root:** `container`, `marketing` and `auth`, published by workflows;
- **`packages/`:** `container`, `marketing`, `auth` and `dashboard`, complete copy without workflow.

Chain is same in both trees, duplicated for development and production:
- **Configuration:**
  - each remote declares own name, `remoteEntry.js` and exposed module (#1, #2, #5 through #8, #11 through #14);
  - each container declares remotes of its tree (#3, #4, #9, #10). In production, at `<domínio>/<app>/latest/remoteEntry.js`.
- **Code:**
  - remotes export `mount` (#22 through #26);
  - containers import each remote module by name (#33 through #37), mounting in own element (#27 through #31);
  - each container's routes decide remote placement (#38, #39).
- **Relationships:** five active host → remote relationships result (#55 through #59), between seven units with own boundaries (#40, #42, #45, #47, #49, #51, #53).

Build and deployment (#60 through #66):
- seven applications have own builds;
- only three root applications have deployment, each with own workflow publishing to `latest` prefix in same bucket and invalidating only its entry file (#60 through #62);
- `packages/` copy published by no workflow (#63 through #66);
- no independent versioning.

Misleading or excluded signals:
- Asynchronous bootstraps (#15 through #21) and Vue `app.mount` (#32) are internal to each unit.
- `config` directories (#41, #43, #46, #48, #50, #52, #54) only store parent unit build.
- Root `dashboard/` (#44) only contains `package.json`. Root dashboard remote and route commented out (#4, #38). History shows never connected in this tree (#83).
- Both copies use same names, ports and `publicPath`, so configuration alone does not distinguish root auth and marketing from `packages/` copies. Section 3.4.5 selected target in same copy (#55, #57). History shows both trees coexisting since second commit: `packages/` as fixed reference and root as incremental reconstruction (#84).

Documentation is README and course comments. All 16 claims corroborated by snapshot (#67 through #82).

## Observations

### 1. auth/config/webpack.dev.js:6-29

**Observation:** In development, `publicPath: "http://localhost:8082/"` and port 8082. `ModuleFederationPlugin` declares `name: "auth"` and `filename: "remoteEntry.js"`, exposes `./AuthApp` (`./src/bootstrap`) and shares `dependencies` from `package.json`.

**Interpretation:** Root auth configured as remote in development.

### 2. auth/config/webpack.prod.js:6-24

**Observation:** In production, `publicPath: "/auth/latest/"`. `ModuleFederationPlugin` declares `name: "auth"` and `filename: "remoteEntry.js"`, exposes `./AuthApp` (`./src/bootstrap`) and shares `dependencies` from `package.json`.

**Interpretation:** Root auth configured as remote in production under own path.

### 3. container/config/webpack.dev.js:6-29

**Observation:** In development, port 8080. `ModuleFederationPlugin` declares `name: "container"` and remotes `marketing@http://localhost:8081/remoteEntry.js` and `auth@http://localhost:8082/remoteEntry.js`, sharing `dependencies` from `package.json`.

**Interpretation:** Root host configuration declares auth and marketing remotes and where to find them in development.

### 4. container/config/webpack.prod.js:8-27

**Observation:** In production, `publicPath: "/container/latest/"`. `ModuleFederationPlugin` declares `name: "container"` and remotes `marketing` and `auth` at `${domain}/<app>/latest/remoteEntry.js`, with `domain` from `PRODUCTION_DOMAIN` (line 6). Remote `dashboard` line commented out (line 20).

**Interpretation:** Root host configuration declares auth and marketing remotes and where to find them in production. Dashboard not remote in this tree.

### 5. marketing/config/webpack.dev.js:6-29

**Observation:** In development, `publicPath: "http://localhost:8081/"` and port 8081. `ModuleFederationPlugin` declares `name: "marketing"` and `filename: "remoteEntry.js"`, exposes `./MarketingApp` (`./src/bootstrap`) and shares `dependencies` from `package.json`.

**Interpretation:** Root marketing configured as remote in development.

### 6. marketing/config/webpack.prod.js:6-24

**Observation:** In production, `publicPath: "/marketing/latest/"`. `ModuleFederationPlugin` declares `name: "marketing"` and `filename: "remoteEntry.js"`, exposes `./MarketingApp` (`./src/bootstrap`) and shares `dependencies` from `package.json`.

**Interpretation:** Root marketing configured as remote in production under own path.

### 7. packages/auth/config/webpack.dev.js:7-47

**Observation:** In development, `publicPath: 'http://localhost:8082/'` and port 8082. `ModuleFederationPlugin` declares `name: 'auth'` and `filename: 'remoteEntry.js'`, exposes `./AuthApp` (`./src/bootstrap`) and shares `dependencies`, with `react`, `react-dom` and `react-router-dom` as `singleton`.

**Interpretation:** Auth in `packages/` configured as remote in development with same name and port as root auth.

### 8. packages/auth/config/webpack.prod.js:6-38

**Observation:** In production, `publicPath: '/auth/latest/'`. `ModuleFederationPlugin` declares `name: 'auth'` and `filename: 'remoteEntry.js'`, exposes `./AuthApp` and shares `dependencies`, with React, ReactDOM and React Router as `singleton`.

**Interpretation:** Auth in `packages/` configured as remote in production under same path as root auth.

### 9. packages/container/config/webpack.dev.js:6-44

**Observation:** In development, port 8080. `ModuleFederationPlugin` declares `name: 'container'` and remotes `marketing@http://localhost:8081/remoteEntry.js`, `auth@http://localhost:8082/remoteEntry.js` and `dashboard@http://localhost:8083/remoteEntry.js`. Shares `dependencies`, with React, ReactDOM and React Router as `singleton`.

**Interpretation:** Host configuration in `packages/` declares three remotes and where to find them in development.

### 10. packages/container/config/webpack.prod.js:8-41

**Observation:** In production, `publicPath: '/container/latest/'`. `ModuleFederationPlugin` declares `name: 'container'` and remotes `marketing`, `auth` and `dashboard` at `${domain}/<app>/latest/remoteEntry.js`, with `domain` from `PRODUCTION_DOMAIN`. Shares `dependencies`, with React, ReactDOM and React Router as `singleton`.

**Interpretation:** Host configuration in `packages/` declares three remotes and where to find them in production.

### 11. packages/dashboard/config/webpack.dev.js:7-36

**Observation:** In development, `publicPath: 'http://localhost:8083/'`, port 8083 and CORS enabled. `ModuleFederationPlugin` declares `name: 'dashboard'` and `filename: 'remoteEntry.js'`, exposes `./DashboardApp` (`./src/bootstrap`) and shares `dependencies` from `package.json`.

**Interpretation:** Dashboard configured as remote in development.

### 12. packages/dashboard/config/webpack.prod.js:6-24

**Observation:** In production, `publicPath: '/dashboard/latest/'`. `ModuleFederationPlugin` declares `name: 'dashboard'` and `filename: 'remoteEntry.js'`, exposes `./DashboardApp` and shares `dependencies` from `package.json`.

**Interpretation:** Dashboard configured as remote in production under own path.

### 13. packages/marketing/config/webpack.dev.js:7-47

**Observation:** In development, `publicPath: 'http://localhost:8081/'` and port 8081. `ModuleFederationPlugin` declares `name: 'marketing'` and `filename: 'remoteEntry.js'`, exposes `./MarketingApp` (`./src/bootstrap`) and shares `dependencies`, with React, ReactDOM and React Router as `singleton`.

**Interpretation:** Marketing in `packages/` configured as remote in development with same name and port as root marketing.

### 14. packages/marketing/config/webpack.prod.js:6-38

**Observation:** In production, `publicPath: '/marketing/latest/'`. `ModuleFederationPlugin` declares `name: 'marketing'` and `filename: 'remoteEntry.js'`, exposes `./MarketingApp` and shares `dependencies`, with React, ReactDOM and React Router as `singleton`.

**Interpretation:** Marketing in `packages/` configured as remote in production under same path as root marketing.

**Note:** Seven application `webpack.common.js` files, cited in 3.4.3 Markers column (and packages/dashboard also in Entry column), only configure loaders, HTML template and, in dashboard, `entry` and extensions. None declares composition element, so none became observations.

### 15. auth/src/index.js:1

**Observation:** `import('./bootstrap');`.

**Interpretation:** An asynchronous bootstrap internal to unit.

### 16. container/src/index.js:1

**Observation:** `import("./bootstrap");`.

**Interpretation:** An asynchronous bootstrap internal to unit.

### 17. marketing/src/index.js:1

**Observation:** `import('./bootstrap')`.

**Interpretation:** An asynchronous bootstrap internal to unit.

### 18. packages/auth/src/index.js:1

**Observation:** `import('./bootstrap');`.

**Interpretation:** An asynchronous bootstrap internal to unit.

### 19. packages/container/src/index.js:1

**Observation:** `import('./bootstrap');`.

**Interpretation:** An asynchronous bootstrap internal to unit.

### 20. packages/dashboard/src/index.js:1

**Observation:** `import('./bootstrap');`.

**Interpretation:** An asynchronous bootstrap internal to unit.

### 21. packages/marketing/src/index.js:1

**Observation:** `import('./bootstrap');`.

**Interpretation:** An asynchronous bootstrap internal to unit.

### 22. auth/src/bootstrap.js:46; auth/src/bootstrap.js:7-32

**Observation:** `export { mount }` in file exposed as `./AuthApp`. `mount` receives element and `onSignIn`, `onNavigate`, `defaultHistory` and `initialPath`, renders application with memory history and returns `onParentNavigate`.

**Interpretation:** Root auth offers host mount function with navigation synchronization and login notification.

### 23. marketing/src/bootstrap.js:41; marketing/src/bootstrap.js:7-30

**Observation:** `export { mount }` in file exposed as `./MarketingApp`. `mount` receives element and `onNavigate`, `defaultHistory` and `initialPath`, returning `onParentNavigate`.

**Interpretation:** Root marketing offers host mount function with navigation synchronization.

### 24. packages/auth/src/bootstrap.js:46; packages/auth/src/bootstrap.js:7-32

**Observation:** `export { mount }` in file exposed as `./AuthApp`, with same options and return as root auth.

**Interpretation:** Auth in `packages/` offers host mount function with navigation synchronization and login notification.

### 25. packages/dashboard/src/bootstrap.js:22; packages/dashboard/src/bootstrap.js:5-8

**Observation:** `export { mount }`, with `mount(el)` creating and mounting Vue application, in file exposed as `./DashboardApp`.

**Interpretation:** Dashboard offers host mount function without navigation exchange.

### 26. packages/marketing/src/bootstrap.js:46; packages/marketing/src/bootstrap.js:7-32

**Observation:** `export { mount }` in file exposed as `./MarketingApp`, with navigation options and return of `onParentNavigate`.

**Interpretation:** Marketing in `packages/` offers host mount function with navigation synchronization.

### 27. container/src/components/AuthApp.js:11-27

**Observation:** In dependency-free `useEffect`, calls `mount(ref.current, { initialPath, onNavigate, onSignIn })` and stores returned `onParentNavigate`, called on each change of `location`.

**Interpretation:** Host at root mounts remote in own element and synchronizes navigation with it.

### 28. container/src/components/MarketingApp.js:12-27

**Observation:** In dependency-free `useEffect`, calls `mount(ref.current, { onNavigate, initialPath })` and stores `onParentNavigate`, called on each change of `location`.

**Interpretation:** Host at root mounts remote in own element and synchronizes navigation with it.

### 29. packages/container/src/components/AuthApp.js:12-29

**Observation:** In dependency-free `useEffect`, calls `mount(ref.current, { initialPath, onNavigate, onSignIn })` and stores `onParentNavigate`, called on each change of `location`.

**Interpretation:** Host in `packages/` mounts remote in own element and synchronizes navigation with it.

### 30. packages/container/src/components/DashboardApp.js:7-9

**Observation:** Calls `mount(ref.current)` in dependency-free `useEffect`.

**Interpretation:** Host in `packages/` mounts Vue remote in own element.

### 31. packages/container/src/components/MarketingApp.js:12-28

**Observation:** In dependency-free `useEffect`, calls `mount(ref.current, { initialPath, onNavigate })` and stores `onParentNavigate`, called on each change of `location`.

**Interpretation:** Host in `packages/` mounts remote in own element and synchronizes navigation with it.

### 32. packages/dashboard/src/bootstrap.js:7

**Observation:** Vue `app.mount(el)`, inside exported `mount`.

**Interpretation:** Internal dashboard rendering without MFE mechanism.

### 33. container/src/components/AuthApp.js:1

**Observation:** `import { mount } from "auth/AuthApp";`.

**Interpretation:** Host at root imports module exposed by auth remote, by name.

### 34. container/src/components/MarketingApp.js:1

**Observation:** `import { mount } from "marketing/MarketingApp";`.

**Interpretation:** Host at root imports module exposed by marketing remote, by name.

### 35. packages/container/src/components/AuthApp.js:1

**Observation:** `import { mount } from 'auth/AuthApp';`.

**Interpretation:** Host in `packages/` imports module exposed by auth remote, by name.

### 36. packages/container/src/components/DashboardApp.js:1

**Observation:** `import { mount } from 'dashboard/DashboardApp';`.

**Interpretation:** Host in `packages/` imports module exposed by dashboard remote, by name.

### 37. packages/container/src/components/MarketingApp.js:1

**Observation:** `import { mount } from 'marketing/MarketingApp';`.

**Interpretation:** Host in `packages/` imports module exposed by marketing remote, by name.

### 38. container/src/App.js:35-45; container/src/App.js:14-16

**Observation:** `Routes` links `/auth/*` to `AuthLazy` and `/*` to `MarketingLazy`, wrappers loaded through `lazy`. `DashboardLazy` and route `/dashboard` commented out (lines 16 and 40-43).

**Interpretation:** Root host routing declares where each remote appears; dashboard not routed in this tree.

### 39. packages/container/src/App.js:29-37; packages/container/src/App.js:8-10

**Observation:** `Routes` links `/auth/*` to `AuthLazy`, `/dashboard` to `DashboardLazy` (only with `isSignedIn`, otherwise redirects to `/`) and `/*` to `MarketingLazy`.

**Interpretation:** Host routing in `packages/` declares where each of three remotes appears.

### 40. auth; auth/package.json:1-33; auth/src/index.js:1; auth/src/bootstrap.js:36-41; auth/config/webpack.prod.js:6-24; .github/workflows/auth.yml:7-28

**Observation:** Own manifest, entry, development and production webpack builds and workflow.

**Interpretation:** Frontend unit with own boundary.

### 41. auth/config

**Observation:** Contains auth webpack configurations.

**Interpretation:** Part of auth build rather than application.

### 42. container; container/package.json:1-32; container/src/index.js:1; container/src/bootstrap.js:5-6; container/config/webpack.prod.js:8-27; .github/workflows/container.yml:7-30

**Observation:** Own manifest, entry, webpack builds and workflow.

**Interpretation:** Frontend unit with own boundary.

### 43. container/config

**Observation:** Contains container webpack configurations.

**Interpretation:** Part of container build rather than application.

### 44. dashboard; dashboard/package.json:1-34

**Observation:** Only `package.json` and `package-lock.json`. Scripts call `config/webpack.dev.js` and `config/webpack.prod.js`, absent from snapshot. No entry or code.

**Interpretation:** Not frontend unit in snapshot; manifest without application.

### 45. marketing; marketing/package.json:1-33; marketing/src/index.js:1; marketing/src/bootstrap.js:33-38; marketing/config/webpack.prod.js:6-24; .github/workflows/marketing.yml:7-28

**Observation:** Own manifest, entry, webpack builds and workflow.

**Interpretation:** Frontend unit with own boundary.

### 46. marketing/config

**Observation:** Contains marketing webpack configurations.

**Interpretation:** Part of marketing build rather than application.

### 47. packages/auth; packages/auth/package.json:1-33; packages/auth/src/index.js:1; packages/auth/src/bootstrap.js:36-41; packages/auth/config/webpack.prod.js:6-38

**Observation:** Own manifest, entry and webpack builds without workflow.

**Interpretation:** Frontend unit with own boundary.

### 48. packages/auth/config

**Observation:** Contains auth webpack configurations in `packages/`.

**Interpretation:** Part of packages/auth build rather than application.

### 49. packages/container; packages/container/package.json:1-32; packages/container/src/index.js:1; packages/container/src/bootstrap.js:5-6; packages/container/config/webpack.prod.js:8-41

**Observation:** Own manifest, entry and webpack builds without workflow.

**Interpretation:** Frontend unit with own boundary.

### 50. packages/container/config

**Observation:** Contains container webpack configurations in `packages/`.

**Interpretation:** Part of packages/container build rather than application.

### 51. packages/dashboard; packages/dashboard/package.json:1-34; packages/dashboard/config/webpack.common.js:4; packages/dashboard/src/index.js:1; packages/dashboard/src/bootstrap.js:12-17; packages/dashboard/config/webpack.prod.js:6-24

**Observation:** Own manifest, declared entry, Vue application and webpack builds without workflow.

**Interpretation:** Frontend unit with own boundary.

### 52. packages/dashboard/config

**Observation:** Contains dashboard webpack configurations.

**Interpretation:** Part of packages/dashboard build rather than application.

### 53. packages/marketing; packages/marketing/package.json:1-33; packages/marketing/src/index.js:1; packages/marketing/src/bootstrap.js:36-41; packages/marketing/config/webpack.prod.js:6-38

**Observation:** Own manifest, entry and webpack builds without workflow.

**Interpretation:** Frontend unit with own boundary.

### 54. packages/marketing/config

**Observation:** Contains marketing webpack configurations in `packages/`.

**Interpretation:** Part of packages/marketing build rather than application.

### 55. container/src/components/AuthApp.js:1, 12; container/src/App.js:36-39; container/config/webpack.prod.js:19; auth/config/webpack.prod.js:10-17

**Observation:** Root container imports `mount` from `auth/AuthApp`, calling it in wrapper linked to `/auth/*` route. Name, module and path `/auth/latest/` match root auth configuration, published at this path.

**Interpretation:** An active host → remote relationship.

**Note:** Auth configuration in `packages/` has same name and `publicPath`; 3.4.5 selected root auth as target, and target is in snapshot either way.

### 56. container/src/components/MarketingApp.js:1, 13; container/src/App.js:44; container/config/webpack.prod.js:18; marketing/config/webpack.prod.js:10-17

**Observation:** Root container imports `mount` from `marketing/MarketingApp`, calling it in wrapper linked to `/*` route. Name, module and path `/marketing/latest/` match root marketing configuration.

**Interpretation:** An active host → remote relationship; marketing is default container page.

### 57. packages/container/src/components/AuthApp.js:1, 13; packages/container/src/App.js:30-32; packages/container/config/webpack.prod.js:19; packages/auth/config/webpack.prod.js:10-17

**Observation:** Container in `packages/` imports `mount` from `auth/AuthApp`, calling it in wrapper linked to `/auth/*` route. Name, module and path match auth configuration in `packages/`.

**Interpretation:** An active host → remote relationship.

**Note:** Same correspondence holds for root auth; 3.4.5 selected target in same copy, and target is in snapshot either way.

### 58. packages/container/src/components/DashboardApp.js:1, 8; packages/container/src/App.js:33-35; packages/container/config/webpack.prod.js:20; packages/dashboard/config/webpack.prod.js:10-17

**Observation:** Container in `packages/` imports `mount` from `dashboard/DashboardApp`, calling it with element only in wrapper linked to `/dashboard` route (with login). Only packages/dashboard declares `name: 'dashboard'`, and path `/dashboard/latest/` matches production remote.

**Interpretation:** An active host → remote relationship between React host and Vue remote.

### 59. packages/container/src/components/MarketingApp.js:1, 13; packages/container/src/App.js:36; packages/container/config/webpack.prod.js:18; packages/marketing/config/webpack.prod.js:10-17

**Observation:** Container in `packages/` imports `mount` from `marketing/MarketingApp`, calling it in wrapper linked to `/*` route. Name, module and path match marketing configuration in `packages/`.

**Interpretation:** An active host → remote relationship.

### 60. auth/package.json:6; auth/config/webpack.prod.js:6-21; .github/workflows/auth.yml:7-8, 12, 20, 23, 28

**Observation:** Script `build` runs production configuration. Own workflow triggers when `auth/**` changes, builds only that directory, synchronizes `dist` with `auth/latest` and invalidates only `/auth/latest/remoteEntry.js`.

**Interpretation:** Own build and deployment boundaries without independent versioning.

### 61. container/package.json:6; container/config/webpack.prod.js:8-24; .github/workflows/container.yml:7-8, 12, 20-22, 25, 30

**Observation:** Own workflow triggers when `container/**` changes, builds container with `PRODUCTION_DOMAIN`, synchronizes with `container/latest` and invalidates only `index.html`.

**Interpretation:** Own build and deployment boundaries without independent versioning. Remotes can be republished without host rebuild because fetched from `latest`.

### 62. marketing/package.json:6; marketing/config/webpack.prod.js:6-21; .github/workflows/marketing.yml:7-8, 12, 20, 23, 28

**Observation:** Own workflow triggers when `marketing/**` changes, builds only that directory, synchronizes with `marketing/latest` and invalidates only `remoteEntry.js`.

**Interpretation:** Own build and deployment boundaries without independent versioning.

### 63. packages/auth/package.json:6; packages/auth/config/webpack.prod.js:6-35

**Observation:** Own production build script and configuration, with `publicPath: '/auth/latest/'`. No workflow filters or builds `packages/`.

**Interpretation:** Own build boundary; deployment unobserved.

### 64. packages/container/package.json:6; packages/container/config/webpack.prod.js:8-38

**Observation:** Own production build script and configuration, with three remotes including `dashboard` at `${domain}/dashboard/latest/remoteEntry.js`. No workflow covers `packages/`.

**Interpretation:** Own build boundary; deployment unobserved.

### 65. packages/dashboard/package.json:6; packages/dashboard/config/webpack.prod.js:6-21

**Observation:** Own production build script and configuration, with `publicPath: '/dashboard/latest/'`. No dashboard workflow in either tree.

**Interpretation:** Own build boundary; deployment unobserved.

### 66. packages/marketing/package.json:6; packages/marketing/config/webpack.prod.js:6-35

**Observation:** Own production build script and configuration, with `publicPath: '/marketing/latest/'`. No workflow covers `packages/`.

**Interpretation:** Own build boundary; deployment unobserved.

### 67. README.md:1

**Observation:** Title is "MFE learning project".

**Interpretation:** README presents repository as micro-frontends, confirmed by seven units and five relationships.

### 68. README.md:3-5

**Observation:** "a webpack Module Federation learning project containing a React shell, React marketing and authentication remotes, and a legacy Vue dashboard example".

**Interpretation:** Claim describes host/remote organization with Module Federation. Shell is container, React remotes are auth and marketing, and Vue dashboard only exists as unit in `packages/`. README does not mention two copies.

### 69. auth/src/bootstrap.js:34-35

**Observation:** "If we are in development and in isolation, call mount immediately".

**Interpretation:** Comment claims auth runs standalone in development, confirmed by mounting in `#_auth-dev-root`, element in own `index.html`.

### 70. auth/src/bootstrap.js:44-45

**Observation:** "We are running through container and we should export the mount function".

**Interpretation:** Comment claims auth mounted by container, confirmed by `export { mount }` and container wrapper.

### 71. marketing/src/bootstrap.js:32

**Observation:** "If we are development and in isolation, call mount immediately".

**Interpretation:** Comment claims marketing runs standalone in development, confirmed by mounting in `#_marketing-dev-root`.

### 72. marketing/src/bootstrap.js:40

**Observation:** "We are running through container and we should export the mount function".

**Interpretation:** Comment claims marketing mounted by container, confirmed by code.

### 73. packages/auth/src/bootstrap.js:34-35

**Observation:** "If we are in development and in isolation, call mount immediately".

**Interpretation:** Comment claims auth in `packages/` runs standalone in development, confirmed by mounting in `#_auth-dev-root`.

### 74. packages/auth/src/bootstrap.js:44-45

**Observation:** "We are running through container and we should export the mount function".

**Interpretation:** Comment claims auth in `packages/` mounted by container, confirmed by code.

### 75. packages/container/src/components/AuthApp.js:11

**Observation:** "Mount the microfrontend once".

**Interpretation:** Comment claims container mounts auth once, confirmed by `useEffect` with empty dependencies.

### 76. packages/container/src/components/AuthApp.js:24

**Observation:** "Sync navigation from container to child".

**Interpretation:** Comment claims container navigation forwarded to auth, confirmed by calling `onParentNavigate` on each `location` change.

### 77. packages/container/src/components/MarketingApp.js:11

**Observation:** "Mount the microfrontend once".

**Interpretation:** Comment claims container mounts marketing once, confirmed by `useEffect` with empty dependencies.

### 78. packages/container/src/components/MarketingApp.js:23

**Observation:** "Sync navigation from container to child".

**Interpretation:** Comment claims container navigation forwarded to marketing, confirmed by `onParentNavigate` call.

### 79. packages/dashboard/src/bootstrap.js:10-11

**Observation:** "If we are in development and in isolation, call mount immediately".

**Interpretation:** Comment claims dashboard runs standalone in development, confirmed by mounting in `#_dashboard-dev-root`.

### 80. packages/dashboard/src/bootstrap.js:20-21

**Observation:** "We are running through container and we should export the mount function".

**Interpretation:** Comment claims dashboard mounted by container, confirmed by `packages/` code; root container does not load it.

### 81. packages/marketing/src/bootstrap.js:34-35

**Observation:** "If we are in development and in isolation, call mount immediately".

**Interpretation:** Comment claims marketing in `packages/` runs standalone in development, confirmed by mounting in `#_marketing-dev-root`.

### 82. packages/marketing/src/bootstrap.js:44-45

**Observation:** "We are running through container and we should export the mount function".

**Interpretation:** Comment claims marketing in `packages/` mounted by container, confirmed by code.

### 83. 9584f06 2025-10-05 (dashboard/package.json); 0f9f1e8 2025-10-25 (container/config/webpack.prod.js); 522c5d7 2025-11-03 (container/config/webpack.prod.js); 2d3ac70 2025-11-05 (container/src/App.js)

**Observation:** Root `dashboard/` enters in `9584f06` with only manifests identical to `packages/dashboard/`, unchanged through snapshot. No commit creates `container/src/components/DashboardApp.js`. Message of `0f9f1e8` announces "comment out unused remote entries in webpack.prod.js"; version from `522c5d7`, matching snapshot, already has remote `dashboard` commented out. Snapshot `App.js` is from `2d3ac70`, announcing `lazy` routes only for Auth and Marketing. Earlier versions could not be read in partial clone.

**Interpretation:** In root tree dashboard never progressed beyond manifest, and commented lines are planned and never connected rather than remaining from abandoned dashboard.

### 84. 9584f06 2025-10-05 (packages/); fa98fd9 2025-10-05 (container/); dfd5a8c 2025-11-03 (auth/src/bootstrap.js)

**Observation:** `packages/` appears complete in `9584f06`, second commit, unchanged afterward. Root starts in same commit with only manifests identical to `packages/`, gaining code application by application: marketing in `9584f06`, container in `fa98fd9`, auth in `dfd5a8c`. `auth/src/bootstrap.js` and `packages/auth/src/bootstrap.js` have same object in snapshot.

**Interpretation:** Trees are not successive stages. `packages/` is fixed reference and root parallel reconstruction, sole tree evolving and gaining workflows.

## Classification

| # | Origin | Dimension | Type | Approach | Evidence | Strength | Relationships |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.3 (auth, Build); 3.4.3 (auth/config, Markers); 3.4.4 (auth/src/bootstrap.js:46, Observation); 3.4.5 #1 (Configuration); 3.4.6 #1 (Where served) | 2 configuration | configuration | module-federation | technological | moderate | configures #40; configures #55 |
| 2 | 3.4.3 (auth, Build); 3.4.3 (auth/config, Markers); 3.4.4 (auth/src/bootstrap.js:46, Observation); 3.4.5 #1 (Configuration); 3.4.6 #1 (Where served, Artifacts) | 2 configuration | configuration | module-federation | technological | moderate | configures #40; configures #55 |
| 3 | 3.4.3 (container, Build); 3.4.3 (container/config, Markers); 3.4.4 (container/src/components/AuthApp.js:12, MarketingApp.js:13, Observation); 3.4.5 #1, #2 (Configuration); 3.4.6 #2 (Where served) | 2 configuration | configuration | module-federation | architectural | strong | configures #42; configures #55; configures #56 |
| 4 | 3.4.3 (container, Build); 3.4.3 (container/config, Markers); 3.4.4 (container/src/components/AuthApp.js:12, MarketingApp.js:13, Observation); 3.4.5 #1, #2 (Configuration); 3.4.6 #2 (Where served, Artifacts); 3.4.7 #2 (Evidence) | 2 configuration | configuration | module-federation | architectural | strong | configures #42; configures #55; configures #56 |
| 5 | 3.4.3 (marketing, Build); 3.4.3 (marketing/config, Markers); 3.4.4 (marketing/src/bootstrap.js:41, Observation); 3.4.5 #2 (Configuration); 3.4.6 #3 (Where served) | 2 configuration | configuration | module-federation | technological | moderate | configures #45; configures #56 |
| 6 | 3.4.3 (marketing, Build); 3.4.3 (marketing/config, Markers); 3.4.4 (marketing/src/bootstrap.js:41, Observation); 3.4.5 #2 (Configuration); 3.4.6 #3 (Where served, Artifacts) | 2 configuration | configuration | module-federation | technological | moderate | configures #45; configures #56 |
| 7 | 3.4.3 (packages/auth, Entry, Build); 3.4.3 (packages/auth/config, Markers); 3.4.4 (packages/auth/src/bootstrap.js:46, Observation); 3.4.5 #3 (Configuration); 3.4.6 #4 (Where served) | 2 configuration | configuration | module-federation | technological | moderate | configures #47; configures #57 |
| 8 | 3.4.3 (packages/auth, Build); 3.4.3 (packages/auth/config, Markers); 3.4.4 (packages/auth/src/bootstrap.js:46, Observation); 3.4.5 #3 (Configuration); 3.4.6 #4 (Artifacts) | 2 configuration | configuration | module-federation | technological | moderate | configures #47; configures #57 |
| 9 | 3.4.3 (packages/container, Build); 3.4.3 (packages/container/config, Markers); 3.4.4 (packages/container/src/components/AuthApp.js:13, DashboardApp.js:8, MarketingApp.js:13, Observation); 3.4.5 #3, #4, #5 (Configuration); 3.4.6 #5 (Where served) | 2 configuration | configuration | module-federation | architectural | strong | configures #49; configures #57; configures #58; configures #59 |
| 10 | 3.4.3 (packages/container, Build); 3.4.3 (packages/container/config, Markers); 3.4.4 (packages/container/src/components/AuthApp.js:13, DashboardApp.js:8, MarketingApp.js:13, Observation); 3.4.5 #3, #4, #5 (Configuration); 3.4.6 #5 (Artifacts) | 2 configuration | configuration | module-federation | architectural | strong | configures #49; configures #57; configures #58; configures #59 |
| 11 | 3.4.3 (packages/dashboard, Entry, Build); 3.4.3 (packages/dashboard/config, Markers); 3.4.4 (packages/dashboard/src/bootstrap.js:22, Observation); 3.4.5 #4 (Configuration); 3.4.6 #6 (Where served) | 2 configuration | configuration | module-federation | technological | moderate | configures #51; configures #58 |
| 12 | 3.4.3 (packages/dashboard, Build); 3.4.3 (packages/dashboard/config, Markers); 3.4.4 (packages/dashboard/src/bootstrap.js:22, Observation); 3.4.5 #4 (Configuration); 3.4.6 #6 (Artifacts) | 2 configuration | configuration | module-federation | technological | moderate | configures #51; configures #58 |
| 13 | 3.4.3 (packages/marketing, Entry, Build); 3.4.3 (packages/marketing/config, Markers); 3.4.4 (packages/marketing/src/bootstrap.js:46, Observation); 3.4.5 #5 (Configuration); 3.4.6 #7 (Where served) | 2 configuration | configuration | module-federation | technological | moderate | configures #53; configures #59 |
| 14 | 3.4.3 (packages/marketing, Build); 3.4.3 (packages/marketing/config, Markers); 3.4.4 (packages/marketing/src/bootstrap.js:46, Observation); 3.4.5 #5 (Configuration); 3.4.6 #7 (Artifacts) | 2 configuration | configuration | module-federation | technological | moderate | configures #53; configures #59 |
| 15 | 3.4.4 (auth/src/index.js:1) | 3 code | source code | — | technological | weak | — |
| 16 | 3.4.4 (container/src/index.js:1) | 3 code | source code | — | technological | weak | — |
| 17 | 3.4.4 (marketing/src/index.js:1) | 3 code | source code | — | technological | weak | — |
| 18 | 3.4.4 (packages/auth/src/index.js:1) | 3 code | source code | — | technological | weak | — |
| 19 | 3.4.4 (packages/container/src/index.js:1) | 3 code | source code | — | technological | weak | — |
| 20 | 3.4.4 (packages/dashboard/src/index.js:1) | 3 code | source code | — | technological | weak | — |
| 21 | 3.4.4 (packages/marketing/src/index.js:1) | 3 code | source code | — | technological | weak | — |
| 22 | 3.4.4 (auth/src/bootstrap.js:46) | 3 code | source code | module-federation | technological | moderate | implements #55 |
| 23 | 3.4.4 (marketing/src/bootstrap.js:41) | 3 code | source code | module-federation | technological | moderate | implements #56 |
| 24 | 3.4.4 (packages/auth/src/bootstrap.js:46) | 3 code | source code | module-federation | technological | moderate | implements #57 |
| 25 | 3.4.4 (packages/dashboard/src/bootstrap.js:22) | 3 code | source code | module-federation | technological | moderate | implements #58 |
| 26 | 3.4.4 (packages/marketing/src/bootstrap.js:46) | 3 code | source code | module-federation | technological | moderate | implements #59 |
| 27 | 3.4.4 (container/src/components/AuthApp.js:12) | 3 code | source code | module-federation | technological | moderate | implements #55 |
| 28 | 3.4.4 (container/src/components/MarketingApp.js:13) | 3 code | source code | module-federation | technological | moderate | implements #56 |
| 29 | 3.4.4 (packages/container/src/components/AuthApp.js:13) | 3 code | source code | module-federation | technological | moderate | implements #57 |
| 30 | 3.4.4 (packages/container/src/components/DashboardApp.js:8) | 3 code | source code | module-federation | technological | moderate | implements #58 |
| 31 | 3.4.4 (packages/container/src/components/MarketingApp.js:13) | 3 code | source code | module-federation | technological | moderate | implements #59 |
| 32 | 3.4.4 (packages/dashboard/src/bootstrap.js:7) | 3 code | source code | — | context | weak | — |
| 33 | 3.4.4 (container/src/components/AuthApp.js:1) | 3 code | source code | module-federation | architectural | strong | implements #55 |
| 34 | 3.4.4 (container/src/components/MarketingApp.js:1) | 3 code | source code | module-federation | architectural | strong | implements #56 |
| 35 | 3.4.4 (packages/container/src/components/AuthApp.js:1) | 3 code | source code | module-federation | architectural | strong | implements #57 |
| 36 | 3.4.4 (packages/container/src/components/DashboardApp.js:1) | 3 code | source code | module-federation | architectural | strong | implements #58 |
| 37 | 3.4.4 (packages/container/src/components/MarketingApp.js:1) | 3 code | source code | module-federation | architectural | strong | implements #59 |
| 38 | 3.4.4 (container/src/App.js:35) | 3 code | source code | module-federation | architectural | strong | implements #55; implements #56 |
| 39 | 3.4.4 (packages/container/src/App.js:29) | 3 code | source code | module-federation | architectural | strong | implements #57; implements #58; implements #59 |
| 40 | 3.4.3 (auth) | 4 structure | directory | — | architectural | moderate | — |
| 41 | 3.4.3 (auth/config) | 4 structure | directory | — | context | weak | — |
| 42 | 3.4.3 (container) | 4 structure | directory | — | architectural | moderate | — |
| 43 | 3.4.3 (container/config) | 4 structure | directory | — | context | weak | — |
| 44 | 3.4.3 (dashboard) | 4 structure | directory | — | context | weak | — |
| 45 | 3.4.3 (marketing) | 4 structure | directory | — | architectural | moderate | — |
| 46 | 3.4.3 (marketing/config) | 4 structure | directory | — | context | weak | — |
| 47 | 3.4.3 (packages/auth) | 4 structure | directory | — | architectural | moderate | — |
| 48 | 3.4.3 (packages/auth/config) | 4 structure | directory | — | context | weak | — |
| 49 | 3.4.3 (packages/container) | 4 structure | directory | — | architectural | moderate | — |
| 50 | 3.4.3 (packages/container/config) | 4 structure | directory | — | context | weak | — |
| 51 | 3.4.3 (packages/dashboard) | 4 structure | directory | — | architectural | moderate | — |
| 52 | 3.4.3 (packages/dashboard/config) | 4 structure | directory | — | context | weak | — |
| 53 | 3.4.3 (packages/marketing) | 4 structure | directory | — | architectural | moderate | — |
| 54 | 3.4.3 (packages/marketing/config) | 4 structure | directory | — | context | weak | — |
| 55 | 3.4.5 #1 | 5 composition | source code | module-federation | architectural | strong | links #42; links #40 |
| 56 | 3.4.5 #2 | 5 composition | source code | module-federation | architectural | strong | links #42; links #45 |
| 57 | 3.4.5 #3 | 5 composition | source code | module-federation | architectural | strong | links #49; links #47 |
| 58 | 3.4.5 #4 | 5 composition | source code | module-federation | architectural | strong | links #49; links #51 |
| 59 | 3.4.5 #5 | 5 composition | source code | module-federation | architectural | strong | links #49; links #53 |
| 60 | 3.4.6 #1 | 6 build-deploy | CI | — | architectural | moderate | publishes #40 |
| 61 | 3.4.6 #2 | 6 build-deploy | CI | — | architectural | moderate | publishes #42 |
| 62 | 3.4.6 #3 | 6 build-deploy | CI | — | architectural | moderate | publishes #45 |
| 63 | 3.4.6 #4 | 6 build-deploy | configuration | — | architectural | moderate | publishes #47 |
| 64 | 3.4.6 #5 | 6 build-deploy | configuration | — | architectural | moderate | publishes #49 |
| 65 | 3.4.6 #6 | 6 build-deploy | configuration | — | architectural | moderate | publishes #51 |
| 66 | 3.4.6 #7 | 6 build-deploy | configuration | — | architectural | moderate | publishes #53 |
| 67 | 3.4.7 #1 | 7 documentation | documentation | — | architectural | weak | corroborates #40; corroborates #42; corroborates #45; corroborates #47; corroborates #49; corroborates #51; corroborates #53; corroborates #55; corroborates #56; corroborates #57; corroborates #58; corroborates #59 |
| 68 | 3.4.7 #2 | 7 documentation | documentation | module-federation | architectural | weak | corroborates #42; corroborates #40; corroborates #45; corroborates #51; corroborates #55; corroborates #56; corroborates #57; corroborates #58; corroborates #59; corroborates #4; corroborates packages/dashboard/src/bootstrap.js:1, 5-7 |
| 69 | 3.4.7 #3 | 7 documentation | comment | — | architectural | weak | corroborates #40; corroborates auth/src/bootstrap.js:36-42; corroborates auth/public/index.html:7 |
| 70 | 3.4.7 #4 | 7 documentation | comment | — | architectural | weak | corroborates #55; corroborates #22; corroborates #33; corroborates #27 |
| 71 | 3.4.7 #5 | 7 documentation | comment | — | architectural | weak | corroborates #45; corroborates marketing/src/bootstrap.js:33-38; corroborates marketing/public/index.html:5 |
| 72 | 3.4.7 #6 | 7 documentation | comment | — | architectural | weak | corroborates #56; corroborates #23; corroborates #34; corroborates #28 |
| 73 | 3.4.7 #7 | 7 documentation | comment | — | architectural | weak | corroborates #47; corroborates packages/auth/src/bootstrap.js:36-42; corroborates packages/auth/public/index.html:5 |
| 74 | 3.4.7 #8 | 7 documentation | comment | — | architectural | weak | corroborates #57; corroborates #24; corroborates #35; corroborates #29 |
| 75 | 3.4.7 #9 | 7 documentation | comment | — | architectural | weak | corroborates #29 |
| 76 | 3.4.7 #10 | 7 documentation | comment | — | architectural | weak | corroborates #29; corroborates #24 |
| 77 | 3.4.7 #11 | 7 documentation | comment | — | architectural | weak | corroborates #31 |
| 78 | 3.4.7 #12 | 7 documentation | comment | — | architectural | weak | corroborates #31; corroborates #26 |
| 79 | 3.4.7 #13 | 7 documentation | comment | — | architectural | weak | corroborates #51; corroborates packages/dashboard/src/bootstrap.js:12-18; corroborates packages/dashboard/public/index.html:5 |
| 80 | 3.4.7 #14 | 7 documentation | comment | — | architectural | weak | corroborates #58; corroborates #25; corroborates #36; corroborates #30 |
| 81 | 3.4.7 #15 | 7 documentation | comment | — | architectural | weak | corroborates #53; corroborates packages/marketing/src/bootstrap.js:36-42; corroborates packages/marketing/public/index.html:5 |
| 82 | 3.4.7 #16 | 7 documentation | comment | — | architectural | weak | corroborates #59; corroborates #26; corroborates #37; corroborates #31 |
| 83 | 3.4.8 #1 | 8 history | history | module-federation | architectural | weak | explains #4; explains #38; explains #44; explains #68 |
| 84 | 3.4.8 #2 | 8 history | history | — | architectural | weak | explains #55; explains #57 |

## Summary

Observations: 84. Dimensions (technology: 0, configuration: 14, code: 25, structure: 15, composition: 5, build-deploy: 7, documentation: 16, history: 2). Strength (strong: 16, moderate: 34, weak: 34, ambiguous: 0). Evidence (technological: 27, architectural: 48, context: 9).

