---
schema: 1
id: 1150753074
full_name: lorem98/mfe
commit: 44eb29500d7b90ac58ec760e35b8e0170d7b6fb4
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

# 174 — lorem98/mfe

## Repository overview

Proof of concept where React container composes three remotes, React `auth` and `marketing` and Vue 3 `dashboard`, with webpack 5 built-in `ModuleFederationPlugin`. Thus no dependency observation: plugin comes from `webpack/lib/container` rather than own package.

Chain is complete and duplicated for development and production:
- **Configuration:**
  - each remote declares own name, `remoteEntry.js` and a single exposed module, its own `bootstrap` (#1, #2, #5 through #8);
  - container declares three remotes at localhost in development and `${domain}/<pacote>/latest/remoteEntry.js` in production (#3, #4).
- **Code:**
  - remotes export `mount` (#13 through #15);
  - container imports each remote module by name (#21 through #23), mounts it in own `div` (#16 through #18), and `Switch` decides each placement, with dashboard protected by login (#25).
- **Relationships:** three active host → remote relationships result (#34 through #36), between four units with own boundaries (#26, #28, #30, #32). Integration is function-based: Vue remote enters React host without interop library (#35, #17, #58).

Publication is separate per application (#37 through #40): each package has own build and workflow triggered only by changes in its folder, synchronizing `dist` to `<pacote>/latest` prefix in common bucket, same path container uses for remotes. No versioning: all publish to `latest`.

Signals not supporting composition: four asynchronous bootstraps (#9 through #12) and Vue `app.mount` (#19) are internal to each unit; two mined development-configuration lines are comments (#20, #24); `config` directories belong to each package build (#27, #29, #31, #33).

Documentation (#41 through #73) is educational README essentially matching chain. Discrepancies are generalizations: attributes history synchronization and standalone mounting with browser history to "each remote", not followed by dashboard (#50, #64); says every dashboard SFC uses `<style scoped>` (#67); explains development startup order with reason unsupported by configuration (#68); auth `index.html` comment says it is never served, but build generates it and workflow publishes it (#72). Vue sharing "between Vue remotes" is hypothetical (#62). History (#74 through #78) shows claims and contradicting code originate in same stage, without earlier version justifying them. Nothing remains ambiguous in snapshot.

## Observations

### 1. packages/auth/config/webpack.dev.js:1-27

**Observation:** In development, port 8082. `ModuleFederationPlugin` declares `name: "auth"` and `filename: "remoteEntry.js"`, exposes `./AuthApp` (`./src/bootstrap`) and shares `dependencies` from `package.json`. Comment above `exposes` shows import used by container.

**Interpretation:** Auth configured as remote in development.

### 2. packages/auth/config/webpack.prod.js:1-26

**Observation:** In production, `publicPath: "/auth/latest/"`. `ModuleFederationPlugin` declares `name: "auth"` and `filename: "remoteEntry.js"`, exposes `./AuthApp` (`./src/bootstrap`) and shares `dependencies` from `package.json`. Configuration merges with common one (`merge(commonConfig, prodConfig)`).

**Interpretation:** Auth configured as remote in production under own path.

**Note:** Four packages' `webpack.common.js` files, cited in same tables, only configure loaders and `HtmlWebpackPlugin` or `VueLoaderPlugin`, without composition element. Did not become observations.

### 3. packages/container/config/webpack.dev.js:1-27

**Observation:** In development, port 8080. `ModuleFederationPlugin` declares `name: "container"`, remotes `marketing@http://localhost:8081/remoteEntry.js`, `auth@http://localhost:8082/remoteEntry.js` and `dashboard@http://localhost:8083/remoteEntry.js`, sharing `dependencies` from `package.json`.

**Interpretation:** Host configuration declares three remotes and where to find them in development.

### 4. packages/container/config/webpack.prod.js:1-27

**Observation:** In production, `publicPath: "/container/latest/"`. `ModuleFederationPlugin` declares `name: "container"` and remotes `marketing`, `auth` and `dashboard` at `${domain}/<pacote>/latest/remoteEntry.js`, with `domain` from `PRODUCTION_DOMAIN`, sharing `dependencies` from `package.json`.

**Interpretation:** Host configuration declares three remotes and where to find them in production.

### 5. packages/dashboard/config/webpack.dev.js:1-37

**Observation:** In development, port 8083. `ModuleFederationPlugin` declares `name: "dashboard"` and `filename: "remoteEntry.js"`, exposes `./DashboardApp` (`./src/bootstrap`) and shares only `vue`, with `singleton: true` and version from `package.json`. `HtmlWebpackPlugin` uses `./public/index.html`.

**Interpretation:** Dashboard configured as remote in development, with singleton Vue runtime.

### 6. packages/dashboard/config/webpack.prod.js:1-31

**Observation:** In production, `publicPath: "/dashboard/latest/"`. `ModuleFederationPlugin` declares `name: "dashboard"` and `filename: "remoteEntry.js"`, exposes `./DashboardApp` (`./src/bootstrap`) and shares `vue` as singleton. No `HtmlWebpackPlugin`.

**Interpretation:** Dashboard configured as remote in production under own path.

### 7. packages/marketing/config/webpack.dev.js:1-30

**Observation:** In development, port 8081. `ModuleFederationPlugin` declares `name: "marketing"` and `filename: "remoteEntry.js"`, exposes `./MarketingApp` (`./src/bootstrap`) and shares `dependencies` from `package.json`.

**Interpretation:** Marketing configured as remote in development.

### 8. packages/marketing/config/webpack.prod.js:1-24

**Observation:** In production, `publicPath: "/marketing/latest/"`. `ModuleFederationPlugin` declares `name: "marketing"` and `filename: "remoteEntry.js"`, exposes `./MarketingApp` (`./src/bootstrap`) and shares `dependencies` from `package.json`.

**Interpretation:** Marketing configured as remote in production under own path.

### 9. packages/auth/src/index.js:4

**Observation:** `import("./bootstrap")`, preceded by comment justifying it through shared-library negotiation.

**Interpretation:** An asynchronous bootstrap internal to unit.

### 10. packages/container/src/index.js:1

**Observation:** `import("./bootstrap")`.

**Interpretation:** An asynchronous bootstrap internal to unit.

### 11. packages/dashboard/src/index.js:3

**Observation:** `import("./bootstrap")`, preceded by comment justifying it through shared-library negotiation.

**Interpretation:** An asynchronous bootstrap internal to unit.

### 12. packages/marketing/src/index.js:1

**Observation:** `import("./bootstrap")`.

**Interpretation:** An asynchronous bootstrap internal to unit.

### 13. packages/auth/src/bootstrap.js:57; packages/auth/src/bootstrap.js:22-42

**Observation:** `export { mount }` in file exposed as `./AuthApp`. `mount(el, { onSignIn, onNavigate, defaultHistory, initialPath })` renders application with memory history starting at `initialPath` (or `/auth/signin`), returning `onParentNavigate`.

**Interpretation:** Auth offers host mount function with navigation synchronization and login signal.

### 14. packages/dashboard/src/bootstrap.js:36; packages/dashboard/src/bootstrap.js:12-21

**Observation:** `export { mount }` in file exposed as `./DashboardApp`. `mount(el)` creates Vue application with `createApp`, mounts in element and returns empty `onParentNavigate`, described as placeholder.

**Interpretation:** Dashboard offers host mount function without navigation exchange.

### 15. packages/marketing/src/bootstrap.js:46; packages/marketing/src/bootstrap.js:7-30

**Observation:** `export { mount }` in file exposed as `./MarketingApp`. `mount(el, { onNavigate, defaultHistory })` uses `createMemoryHistory()` without received history, returning `onParentNavigate`.

**Interpretation:** Marketing offers host mount function with navigation synchronization.

### 16. packages/container/src/components/AuthApp.js:26-38

**Observation:** Calls `mount(ref.current, { onSignIn, initialPath: history.location.pathname, onNavigate })`, registering returned `onParentNavigate` in container history.

**Interpretation:** Host mounts auth remote in own element, synchronizes navigation and receives login signal.

### 17. packages/container/src/components/DashboardApp.js:21

**Observation:** Calls `mount(ref.current)` without using return value.

**Interpretation:** Host mounts Vue remote in own element without navigation exchange.

### 18. packages/container/src/components/MarketingApp.js:10-22

**Observation:** Calls `mount(ref.current, { onNavigate })`, registering returned `onParentNavigate` in container history.

**Interpretation:** Host mounts marketing remote in own element and synchronizes navigation with it.

### 19. packages/dashboard/src/bootstrap.js:14

**Observation:** Vue `app.mount(el)`, inside exported `mount`.

**Interpretation:** Internal dashboard rendering without MFE mechanism.

### 20. packages/auth/config/webpack.dev.js:19

**Observation:** Comment line: `// The container imports this as:  import { mount } from "auth/AuthApp"`.

**Interpretation:** Explanatory comment about `exposes` rather than executable code.

### 21. packages/container/src/components/AuthApp.js:1

**Observation:** `import { mount } from "auth/AuthApp"`.

**Interpretation:** Host imports module exposed by auth remote, by name.

### 22. packages/container/src/components/DashboardApp.js:1

**Observation:** `import { mount } from "dashboard/DashboardApp"`.

**Interpretation:** Host imports module exposed by dashboard remote, by name.

### 23. packages/container/src/components/MarketingApp.js:1

**Observation:** `import { mount } from "marketing/MarketingApp"`.

**Interpretation:** Host imports module exposed by marketing remote, by name.

### 24. packages/dashboard/config/webpack.dev.js:20

**Observation:** Comment line: `// The container imports this as:  import { mount } from "dashboard/DashboardApp"`.

**Interpretation:** Explanatory comment about `exposes` rather than executable code.

### 25. packages/container/src/App.js:25-44; packages/container/src/App.js:5-7; packages/container/src/bootstrap.js:5

**Observation:** `Switch` links `/auth` to `AuthApp` (receiving `onSignIn`), `/dashboard` to `DashboardApp` only with `signedIn` (otherwise redirects to `/auth/signin`) and `/` to `MarketingApp`. Wrappers imported at top, and `App` mounted in `#root`.

**Interpretation:** Host routing declares where each remote appears in UI.

### 26. packages/auth; packages/auth/package.json:1-30; packages/auth/src/index.js:4; packages/auth/src/bootstrap.js:48-53; packages/auth/config/webpack.prod.js:8-24; .github/workflows/auth.yml:7-26

**Observation:** Own manifest, entry, development and production webpack configurations referenced by scripts and deployment workflow. In development, mounts itself in `#_auth-dev-root`.

**Interpretation:** Frontend unit with own boundary.

### 27. packages/auth/config

**Observation:** Contains three auth webpack configurations.

**Interpretation:** Part of auth build rather than application.

### 28. packages/container; packages/container/package.json:1-31; packages/container/src/index.js:1; packages/container/src/bootstrap.js:5; packages/container/config/webpack.prod.js:8-25; .github/workflows/container.yml:7-26

**Observation:** Own manifest, entry mounting React in `#root`, webpack configurations referenced by scripts and deployment workflow.

**Interpretation:** Frontend unit with own boundary.

### 29. packages/container/config

**Observation:** Contains three container webpack configurations.

**Interpretation:** Part of container build rather than application.

### 30. packages/dashboard; packages/dashboard/package.json:1-34; packages/dashboard/src/index.js:3; packages/dashboard/src/bootstrap.js:26-32; packages/dashboard/config/webpack.prod.js:8-29; .github/workflows/dashboard.yml:7-26

**Observation:** Own manifest, entry, webpack configurations referenced by scripts and deployment workflow. In development, mounts Vue application in `#_dashboard-dev-root`.

**Interpretation:** Frontend unit with own boundary.

### 31. packages/dashboard/config

**Observation:** Contains three dashboard webpack configurations.

**Interpretation:** Part of dashboard build rather than application.

### 32. packages/marketing; packages/marketing/package.json:1-30; packages/marketing/src/index.js:1; packages/marketing/src/bootstrap.js:34-41; packages/marketing/config/webpack.prod.js:6-22; .github/workflows/marketing.yml:7-24

**Observation:** Own manifest, entry, webpack configurations referenced by scripts and deployment workflow. In development, mounts itself in `#_marketing-dev-root`.

**Interpretation:** Frontend unit with own boundary.

### 33. packages/marketing/config

**Observation:** Contains three marketing webpack configurations.

**Interpretation:** Part of marketing build rather than application.

### 34. packages/container/src/components/AuthApp.js:1, 26; packages/container/src/App.js:25-29; packages/container/config/webpack.dev.js:19; packages/container/config/webpack.prod.js:19; packages/auth/config/webpack.prod.js:12, 16-20; packages/auth/src/bootstrap.js:57

**Observation:** Container imports `mount` from `auth/AuthApp`, calling it in wrapper linked to `/auth` route. Name `auth`, module `./AuthApp` and path `/auth/latest/` match auth configuration.

**Interpretation:** An active host → remote relationship. Sole relationship where remote returns state signal to host (`onSignIn`).

### 35. packages/container/src/components/DashboardApp.js:1, 21; packages/container/src/App.js:25, 32-38; packages/container/config/webpack.dev.js:20; packages/container/config/webpack.prod.js:20; packages/dashboard/config/webpack.prod.js:12, 16-20; packages/dashboard/src/bootstrap.js:36

**Observation:** Container imports `mount` from `dashboard/DashboardApp`, calling it in wrapper linked to `/dashboard` route, only with `signedIn`. Name, module and path `/dashboard/latest/` match dashboard configuration.

**Interpretation:** An active host → remote relationship between React host and Vue remote without navigation exchange.

### 36. packages/container/src/components/MarketingApp.js:1, 10; packages/container/src/App.js:25, 41-43; packages/container/config/webpack.dev.js:18; packages/container/config/webpack.prod.js:18; packages/marketing/config/webpack.prod.js:10, 14-18; packages/marketing/src/bootstrap.js:46

**Observation:** Container imports `mount` from `marketing/MarketingApp`, calling it in wrapper linked to `/` route, last in `Switch`. Name, module and path `/marketing/latest/` match marketing configuration.

**Interpretation:** An active host → remote relationship.

### 37. packages/auth/package.json:6; packages/auth/config/webpack.prod.js:8-23; .github/workflows/auth.yml:3-12, 20-23, 26, 32

**Observation:** Build uses package production configuration. Own workflow triggers on pushes to `master` when `packages/auth/**` changes, builds in package folder, synchronizes `dist` with `auth/latest` and invalidates `/auth/latest/index.html` in CloudFront. Bucket and distribution shared with other packages.

**Interpretation:** Own build and deployment boundaries without independent versioning.

### 38. packages/container/package.json:6; packages/container/config/webpack.prod.js:6-24; .github/workflows/container.yml:3-12, 20-23, 26, 32

**Observation:** Own workflow builds container with `PRODUCTION_DOMAIN`, synchronizes `dist` with `container/latest` and invalidates `index.html`.

**Interpretation:** Own build and deployment boundaries without independent versioning. Remotes absent from container artifact, fetched from `latest` at runtime.

### 39. packages/dashboard/package.json:6; packages/dashboard/config/webpack.prod.js:8-28; .github/workflows/dashboard.yml:3-12, 20-23, 26, 32

**Observation:** Own workflow triggers when `packages/dashboard/**` changes, synchronizes `dist` with `dashboard/latest` and invalidates `index.html`.

**Interpretation:** Own build and deployment boundaries without independent versioning.

### 40. packages/marketing/package.json:6; packages/marketing/config/webpack.prod.js:6-21; .github/workflows/marketing.yml:3-12, 20-21, 24, 30

**Observation:** Own workflow triggers when `packages/marketing/**` changes, synchronizes `dist` with `marketing/latest` and invalidates `remoteEntry.js`. Only workflow not passing `PRODUCTION_DOMAIN`.

**Interpretation:** Own build and deployment boundaries without independent versioning.

### 41. README.md:3

**Observation:** "A production-style **micro frontend monorepo** that demonstrates how to split a web application into independently deployable packages using **Webpack 5 Module Federation**."

**Interpretation:** Documentation presents repository as monorepo of independently deployed units linked through Module Federation. Four units, relationships and separate deployments confirm.

### 42. README.md:5

**Observation:** "The PoC deliberately spans two JavaScript frameworks (**React 17** and **Vue 3**) to show that Module Federation is framework-agnostic."

**Interpretation:** Documentation says composition is independent of unit frameworks. `package.json` files and three identically formed relationships confirm.

### 43. README.md:45-52

**Observation:** Diagram: browser loads `container/index.html`, container bundle negotiates shared libraries and fetches `marketing/remoteEntry.js`, `auth/remoteEntry.js` and `dashboard/remoteEntry.js`.

**Interpretation:** Documentation describes host loading three remotes at runtime. Confirmed, with simplification that remotes expose `bootstrap` rather than pages.

### 44. README.md:54

**Observation:** "Each remote is a **separate webpack build** that can be deployed independently. When the marketing team pushes a change, only `marketing/remoteEntry.js` is updated — the container and other remotes are unaffected."

**Interpretation:** Documentation claims independent build and deployment per remote. Workflows and fixed remote path in container confirm.

### 45. README.md:60-90

**Observation:** Single-page diagram: container with routes `/` → marketing, `/auth` → auth and `/dashboard` (protected) → dashboard.

**Interpretation:** Documentation describes composition through host routes. `Switch` and relationships confirm.

### 46. README.md:94-105

**Observation:** Diagram: "container [...] HOST — consumes all remotes", "imports at runtime", "marketing / auth / dashboard [...] REMOTES — expose modules".

**Interpretation:** Documentation describes host/remote organization. Host configuration and relationships confirm.

### 47. README.md:119

**Observation:** "Owns the top-level `<BrowserRouter>` and `<Switch>`." (about container)

**Interpretation:** Documentation places top-level routing in host. Confirmed: React remotes use `Router` with received history.

### 48. README.md:120

**Observation:** "Holds the `signedIn` auth state in React's `useState`." (about container)

**Interpretation:** Documentation says authentication state resides in host rather than remote. Confirmed.

### 49. README.md:122-123

**Observation:** "Renders a thin wrapper component for each remote that: 1. Calls the remote's `mount()` function with a DOM ref."

**Interpretation:** Documentation describes host–remote mounting contract. Three wrappers confirm.

### 50. README.md:122, 124

**Observation:** "Renders a thin wrapper component for each remote that: [...] 2. Keeps routing histories in sync".

**Interpretation:** Documentation generalizes navigation synchronization to all remotes. Holds for marketing and auth; dashboard has no history and wrapper ignores return value of `mount`, refuting generalization.

### 51. README.md:133

**Observation:** "`webpack.prod.js` — production build + remotes via env var" (about container)

**Interpretation:** Documentation says production remote addresses come from environment variable. Host configuration and container workflow confirm.

### 52. README.md:152

**Observation:** "**Exposes** `./MarketingApp` via Module Federation."

**Interpretation:** Documentation names module exposed by marketing. Confirmed.

### 53. README.md:158

**Observation:** "The app uses an **internal memory history** when embedded in the container and a **browser history** when run in isolation" (about marketing)

**Interpretation:** Documentation describes marketing running embedded and standalone. `bootstrap` and wrapper confirm.

### 54. README.md:182

**Observation:** "**Exposes** `./AuthApp` via Module Federation."

**Interpretation:** Documentation names module exposed by auth. Confirmed.

### 55. README.md:188-190

**Observation:** "On a successful submission the auth MFE: 1. Calls `onSignIn()` → container sets `signedIn = true`. 2. Navigates its internal history to `/dashboard` → container mirrors this and renders `<DashboardApp>`."

**Interpretation:** Documentation describes auth remote signaling login to host, releasing dashboard. Confirmed; composition review treated callbacks within relationship without separate relationship.

### 56. README.md:198, 201

**Observation:** "public/index.html — dev isolation HTML (#_auth-dev-root)" / "bootstrap.js — mount() + dev isolation logic".

**Interpretation:** Documentation says auth runs standalone in development. Confirmed.

### 57. README.md:214

**Observation:** "**Exposes** `./DashboardApp` via Module Federation."

**Interpretation:** Documentation names module exposed by dashboard. Confirmed.

### 58. README.md:214

**Observation:** "a Vue app rendered inside a React container with **zero React↔Vue interop library**".

**Interpretation:** Documentation says Vue remote enters React host only through `mount` function. Confirmed: container has no interop library.

### 59. README.md:228, 231

**Observation:** "public/index.html — dev isolation HTML (#_dashboard-dev-root)" / "bootstrap.js — mount() using createApp() + dev isolation".

**Interpretation:** Documentation says dashboard runs standalone in development. Confirmed.

### 60. README.md:243

**Observation:** "Each package has its own `webpack.dev.js` / `webpack.prod.js` and its own CI workflow. You can build and deploy **marketing alone** without touching the container."

**Interpretation:** Documentation claims own build and deployment per package. Confirmed.

### 61. README.md:247

**Observation:** "The container and every React remote list their `package.json` `dependencies` as `shared` in `ModuleFederationPlugin`. Webpack ensures **only one copy** of React and ReactDOM is loaded in the browser".

**Interpretation:** Documentation describes React dependency sharing. Configurations confirm; without `singleton`, single copy depends on compatible version ranges, as present.

### 62. README.md:256

**Observation:** "For the Vue dashboard, Vue is shared with `singleton: true` so that all Vue-based remotes (should you add more) use the same Vue runtime."

**Interpretation:** Singleton configuration exists, but sharing between Vue remotes is hypothetical: dashboard is only Vue package. Partially confirmed.

### 63. README.md:273

**Observation:** "Every remote can be started **standalone** without the container."

**Interpretation:** Documentation claims standalone execution of each remote. Three `bootstrap` files confirm.

### 64. README.md:273

**Observation:** "Each `bootstrap.js` detects a dev-specific root element and mounts directly with a browser history".

**Interpretation:** Holds for marketing and auth; dashboard detects element but mounts without history, refuting generalization.

### 65. README.md:337

**Observation:** "Auth additionally receives `initialPath` so its memory history starts at the current URL segment (e.g. `/auth/signin`)."

**Interpretation:** Documentation describes host–auth contract parameter. Confirmed.

### 66. README.md:375-381

**Observation:** "Each app uses `createGenerateClassName` with a unique `productionPrefix`", with table container `co`, marketing `ma`, auth `au`.

**Interpretation:** Documentation describes CSS isolation between React units on same page. Confirmed; dashboard does not use Material-UI.

### 67. README.md:383

**Observation:** "The Vue dashboard uses scoped `<style scoped>` in every SFC which emits `data-v-*` attributes — completely isolated from the React CSS."

**Interpretation:** `Dashboard.vue` uses `scoped`, but `App.vue` does not, refuting "every SFC"; practical isolation comes from selectors under `.dashboard-shell`.

### 68. README.md:412

**Observation:** "start the remotes (marketing, auth, dashboard) before the container, otherwise the container's dev server will fail to fetch the remote entry files on first load."

**Interpretation:** Only first container page load needing running remotes is confirmed. Explanation refuted: `remoteEntry.js` files are fetched by browser at runtime rather than development server.

### 69. README.md:437, 453

**Observation:** "Each package builds to a `dist/` folder" / "Serve each `dist/` from an S3 bucket + CloudFront".

**Interpretation:** Documentation describes publication of each package. Workflows confirm.

### 70. README.md:459, 466-471

**Observation:** "GitHub Actions workflows in `.github/workflows/` trigger on pushes to `master` in the relevant package directory.", with a table of one workflow and one S3 path per package.

**Interpretation:** Documentation describes deployment per package. Four workflows confirm.

### 71. README.md:489-493

**Observation:** Instructions for a new remote: "Add a wrapper component in `packages/container/src/components/MyApp.js`. Register the remote in the container's `webpack.dev.js` and `webpack.prod.js`. Add a `<Route>` in `packages/container/src/App.js`."

**Interpretation:** Documentation shows remotes are fixed in host: new remote requires changing and republishing container. Confirmed.

### 72. packages/auth/public/index.html:10-13

**Observation:** Comment: "it never serves this HTML file directly. This file is only used when the auth package is run in isolation".

**Interpretation:** Comment refuted: common auth configuration used in production generates this HTML, and workflow publishes and invalidates it in CloudFront.

### 73. packages/dashboard/public/index.html:10-12

**Observation:** Comment: "this HTML is only used when running the dashboard in isolation".

**Interpretation:** Comment matches: only development configuration uses template.

### 74. 2be6f54 2026-03-24 (navigation between container and marketing); 6af9f6d 2026-05-11 (packages/auth); 91feee5 2026-05-11 (README.md, packages/dashboard/src/bootstrap.js, packages/container/src/components/DashboardApp.js)

**Observation:** History synchronization pattern enters with marketing (`2be6f54`) and auth (`6af9f6d`). README and dashboard originate together in `91feee5`, and their objects do not change through snapshot.

**Interpretation:** Generalization "in each remote" and dashboard without routing originate in same stage; contradiction does not come from different repository stages.

### 75. README.md:256; packages/dashboard/config/webpack.prod.js:21-26

**Observation:** Point did not involve consulting history: README marks case as hypothesis ("should you add more"), and snapshot has only one Vue package.

**Interpretation:** Sentence describes possible extension rather than repository state; snapshot resolves point.

### 76. 91feee5 2026-05-11 (packages/dashboard/src/App.vue, packages/dashboard/src/components/Dashboard.vue, README.md); d1cf5a5 2026-05-21 (packages/dashboard/src/App.vue); 44eb295 2026-05-21 (packages/dashboard/src/App.vue)

**Observation:** Both SFCs and README are created in `91feee5`. `App.vue` changes in temporary commit (`d1cf5a5`) and returns to object from `91feee5` in `44eb295`.

**Interpretation:** `<style>` without `scoped` in `App.vue` originates in same stage as README rather than remaining from or following another stage.

### 77. 91feee5 2026-05-11 (packages/container/config/webpack.dev.js, packages/container/src, README.md)

**Observation:** Development configuration and container wrappers match `91feee5` in snapshot, commit creating README.

**Interpretation:** Startup-order instruction was written with current configuration rather than remaining from earlier configuration.

### 78. 6af9f6d 2026-05-11 (packages/auth/public/index.html, packages/auth/config/webpack.common.js); 60008a4 2026-05-21 (.github/workflows/auth.yml)

**Observation:** `index.html` with comment and `webpack.common.js` generating production HTML are created together in `6af9f6d` and unchanged through snapshot. Workflow publishing and invalidating HTML enters later in `60008a4`, with same form as container workflow.

**Interpretation:** Comment does not describe earlier build stage: already inaccurate in commit where written.

## Classification

| # | Origin | Dimension | Type | Approach | Evidence | Strength | Relationships |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.3 (packages/auth, Build); 3.4.3 (packages/auth/config, Markers); 3.4.4 (packages/auth/src/bootstrap.js:57, Observation); 3.4.4 (packages/auth/config/webpack.dev.js:19, Observation); 3.4.5 #1 (Configuration) | 2 configuration | configuration | module-federation | technological | moderate | configures #26; configures #34 |
| 2 | 3.4.3 (packages/auth, Build); 3.4.3 (packages/auth/config, Markers); 3.4.4 (packages/auth/src/bootstrap.js:57, Observation); 3.4.5 #1 (Configuration); 3.4.6 #1 (Where served, Artifacts); 3.4.7 #14, #21, #32 (Evidence) | 2 configuration | configuration | module-federation | technological | moderate | configures #26; configures #34 |
| 3 | 3.4.3 (packages/container, Build); 3.4.3 (packages/container/config, Markers); 3.4.5 #1, #2, #3 (Configuration); 3.4.7 #3, #28, #31 (Evidence) | 2 configuration | configuration | module-federation | architectural | strong | configures #28; configures #34; configures #35; configures #36 |
| 4 | 3.4.3 (packages/container, Build); 3.4.3 (packages/container/config, Markers); 3.4.4 (packages/container/src/components/AuthApp.js:26, DashboardApp.js:21, MarketingApp.js:10, Observation); 3.4.5 #1, #2, #3 (Configuration); 3.4.6 #2 (Where served, Artifacts); 3.4.7 #1, #4, #6, #11, #21, #31 (Evidence) | 2 configuration | configuration | module-federation | architectural | strong | configures #28; configures #34; configures #35; configures #36 |
| 5 | 3.4.3 (packages/dashboard, Entry, Build); 3.4.3 (packages/dashboard/config, Markers); 3.4.4 (packages/dashboard/src/bootstrap.js:36, Observation); 3.4.4 (packages/dashboard/config/webpack.dev.js:20, Observation); 3.4.5 #2 (Configuration); 3.4.7 #22, #33 (Evidence) | 2 configuration | configuration | module-federation | technological | moderate | configures #30; configures #35 |
| 6 | 3.4.3 (packages/dashboard, Build); 3.4.3 (packages/dashboard/config, Markers); 3.4.4 (packages/dashboard/src/bootstrap.js:36, Observation); 3.4.5 #2 (Configuration); 3.4.6 #3 (Where served, Artifacts); 3.4.7 #17, #22, #33 (Evidence) | 2 configuration | configuration | module-federation | technological | moderate | configures #30; configures #35 |
| 7 | 3.4.3 (packages/marketing, Entry, Build); 3.4.3 (packages/marketing/config, Markers); 3.4.4 (packages/marketing/src/bootstrap.js:46, Observation); 3.4.5 #3 (Configuration) | 2 configuration | configuration | module-federation | technological | moderate | configures #32; configures #36 |
| 8 | 3.4.3 (packages/marketing, Build); 3.4.3 (packages/marketing/config, Markers); 3.4.4 (packages/marketing/src/bootstrap.js:46, Observation); 3.4.5 #3 (Configuration); 3.4.6 #4 (Where served, Artifacts); 3.4.7 #12, #21 (Evidence) | 2 configuration | configuration | module-federation | technological | moderate | configures #32; configures #36 |
| 9 | 3.4.4 (packages/auth/src/index.js:4) | 3 code | source code | — | technological | weak | — |
| 10 | 3.4.4 (packages/container/src/index.js:1) | 3 code | source code | — | technological | weak | — |
| 11 | 3.4.4 (packages/dashboard/src/index.js:3) | 3 code | source code | — | technological | weak | — |
| 12 | 3.4.4 (packages/marketing/src/index.js:1) | 3 code | source code | — | technological | weak | — |
| 13 | 3.4.4 (packages/auth/src/bootstrap.js:57) | 3 code | source code | module-federation | technological | moderate | implements #34 |
| 14 | 3.4.4 (packages/dashboard/src/bootstrap.js:36) | 3 code | source code | module-federation | technological | moderate | implements #35 |
| 15 | 3.4.4 (packages/marketing/src/bootstrap.js:46) | 3 code | source code | module-federation | technological | moderate | implements #36 |
| 16 | 3.4.4 (packages/container/src/components/AuthApp.js:26) | 3 code | source code | module-federation | technological | moderate | implements #34 |
| 17 | 3.4.4 (packages/container/src/components/DashboardApp.js:21) | 3 code | source code | module-federation | technological | moderate | implements #35 |
| 18 | 3.4.4 (packages/container/src/components/MarketingApp.js:10) | 3 code | source code | module-federation | technological | moderate | implements #36 |
| 19 | 3.4.4 (packages/dashboard/src/bootstrap.js:14) | 3 code | source code | — | context | weak | — |
| 20 | 3.4.4 (packages/auth/config/webpack.dev.js:19) | 3 code | comment | — | context | weak | — |
| 21 | 3.4.4 (packages/container/src/components/AuthApp.js:1) | 3 code | source code | module-federation | architectural | strong | implements #34 |
| 22 | 3.4.4 (packages/container/src/components/DashboardApp.js:1) | 3 code | source code | module-federation | architectural | strong | implements #35 |
| 23 | 3.4.4 (packages/container/src/components/MarketingApp.js:1) | 3 code | source code | module-federation | architectural | strong | implements #36 |
| 24 | 3.4.4 (packages/dashboard/config/webpack.dev.js:20) | 3 code | comment | — | context | weak | — |
| 25 | 3.4.4 (packages/container/src/App.js:25) | 3 code | source code | module-federation | architectural | strong | implements #34; implements #35; implements #36 |
| 26 | 3.4.3 (packages/auth) | 4 structure | directory | — | architectural | moderate | — |
| 27 | 3.4.3 (packages/auth/config) | 4 structure | directory | — | context | weak | — |
| 28 | 3.4.3 (packages/container) | 4 structure | directory | — | architectural | moderate | — |
| 29 | 3.4.3 (packages/container/config) | 4 structure | directory | — | context | weak | — |
| 30 | 3.4.3 (packages/dashboard) | 4 structure | directory | — | architectural | moderate | — |
| 31 | 3.4.3 (packages/dashboard/config) | 4 structure | directory | — | context | weak | — |
| 32 | 3.4.3 (packages/marketing) | 4 structure | directory | — | architectural | moderate | — |
| 33 | 3.4.3 (packages/marketing/config) | 4 structure | directory | — | context | weak | — |
| 34 | 3.4.5 #1 | 5 composition | source code | module-federation | architectural | strong | links #28; links #26 |
| 35 | 3.4.5 #2 | 5 composition | source code | module-federation | architectural | strong | links #28; links #30 |
| 36 | 3.4.5 #3 | 5 composition | source code | module-federation | architectural | strong | links #28; links #32 |
| 37 | 3.4.6 #1 | 6 build-deploy | CI | — | architectural | moderate | publishes #26 |
| 38 | 3.4.6 #2 | 6 build-deploy | CI | — | architectural | moderate | publishes #28 |
| 39 | 3.4.6 #3 | 6 build-deploy | CI | — | architectural | moderate | publishes #30 |
| 40 | 3.4.6 #4 | 6 build-deploy | CI | — | architectural | moderate | publishes #32 |
| 41 | 3.4.7 #1 | 7 documentation | documentation | module-federation | architectural | weak | corroborates #26; corroborates #28; corroborates #30; corroborates #32; corroborates #34; corroborates #35; corroborates #36; corroborates #37; corroborates #38; corroborates #39; corroborates #40; corroborates #4; corroborates packages/container/package.json:26 |
| 42 | 3.4.7 #2 | 7 documentation | documentation | module-federation | architectural | weak | corroborates #34; corroborates #35; corroborates #36; corroborates packages/container/package.json:11; corroborates packages/auth/package.json:11; corroborates packages/marketing/package.json:11; corroborates packages/dashboard/package.json:13 |
| 43 | 3.4.7 #3 | 7 documentation | documentation | module-federation | architectural | weak | corroborates #34; corroborates #35; corroborates #36; corroborates #3; corroborates packages/marketing/src/App.js:19-20; corroborates packages/auth/src/App.js:18-23; corroborates #14 |
| 44 | 3.4.7 #4 | 7 documentation | documentation | module-federation | architectural | weak | corroborates #37; corroborates #39; corroborates #40; corroborates #4 |
| 45 | 3.4.7 #5 | 7 documentation | documentation | — | architectural | weak | corroborates #25; corroborates #34; corroborates #35; corroborates #36 |
| 46 | 3.4.7 #6 | 7 documentation | documentation | module-federation | architectural | weak | corroborates #34; corroborates #35; corroborates #36; corroborates #4 |
| 47 | 3.4.7 #7 | 7 documentation | documentation | — | architectural | weak | corroborates #25; corroborates packages/container/src/App.js:17; corroborates packages/marketing/src/App.js:17; corroborates packages/auth/src/App.js:16 |
| 48 | 3.4.7 #8 | 7 documentation | documentation | — | architectural | weak | corroborates packages/container/src/App.js:14; corroborates #25; corroborates packages/auth/src/App.js:13 |
| 49 | 3.4.7 #9 | 7 documentation | documentation | — | architectural | weak | corroborates #16; corroborates #17; corroborates #18; corroborates #34; corroborates #35; corroborates #36 |
| 50 | 3.4.7 #10 | 7 documentation | documentation | — | architectural | weak | contradicts #35; contradicts #17; contradicts #14 |
| 51 | 3.4.7 #11 | 7 documentation | documentation | module-federation | architectural | weak | corroborates #38; corroborates #4 |
| 52 | 3.4.7 #12 | 7 documentation | documentation | module-federation | technological | weak | corroborates #36; corroborates #8; corroborates #23 |
| 53 | 3.4.7 #13 | 7 documentation | documentation | — | architectural | weak | corroborates #15; corroborates #32; corroborates #18 |
| 54 | 3.4.7 #14 | 7 documentation | documentation | module-federation | technological | weak | corroborates #34; corroborates #2; corroborates #21 |
| 55 | 3.4.7 #15 | 7 documentation | documentation | — | architectural | weak | corroborates packages/auth/src/components/Signin.js:57-63; corroborates packages/auth/src/components/Signup.js:58-62; corroborates #16; corroborates #25 |
| 56 | 3.4.7 #16 | 7 documentation | documentation | — | architectural | weak | corroborates #26; corroborates packages/auth/public/index.html:15 |
| 57 | 3.4.7 #17 | 7 documentation | documentation | module-federation | technological | weak | corroborates #35; corroborates #6; corroborates #22 |
| 58 | 3.4.7 #18 | 7 documentation | documentation | — | architectural | weak | corroborates #35; corroborates #22; corroborates #17; corroborates #14; corroborates packages/container/package.json:8-14 |
| 59 | 3.4.7 #19 | 7 documentation | documentation | — | architectural | weak | corroborates #30; corroborates packages/dashboard/public/index.html:14 |
| 60 | 3.4.7 #20 | 7 documentation | documentation | — | architectural | weak | corroborates #26; corroborates #28; corroborates #30; corroborates #32; corroborates #37; corroborates #38; corroborates #39; corroborates #40 |
| 61 | 3.4.7 #21 | 7 documentation | documentation | module-federation | technological | weak | corroborates #4; corroborates #2; corroborates #8; corroborates packages/container/package.json:11-12; corroborates packages/auth/package.json:11-12; corroborates packages/marketing/package.json:11-12 |
| 62 | 3.4.7 #22 | 7 documentation | documentation | module-federation | technological | weak | partially corroborates #6; partially corroborates #5; partially corroborates packages/container/package.json:8-14 |
| 63 | 3.4.7 #23 | 7 documentation | documentation | — | architectural | weak | corroborates #26; corroborates #30; corroborates #32 |
| 64 | 3.4.7 #24 | 7 documentation | documentation | — | architectural | weak | contradicts #14; contradicts #30 |
| 65 | 3.4.7 #25 | 7 documentation | documentation | — | architectural | weak | corroborates #16; corroborates #13 |
| 66 | 3.4.7 #26 | 7 documentation | documentation | — | architectural | weak | corroborates packages/container/src/App.js:9-11; corroborates packages/marketing/src/App.js:9-11; corroborates packages/auth/src/App.js:9-11 |
| 67 | 3.4.7 #27 | 7 documentation | documentation | — | architectural | weak | contradicts packages/dashboard/src/App.vue:16-28 |
| 68 | 3.4.7 #28 | 7 documentation | documentation | module-federation | architectural | weak | contradicts #3; contradicts #38 |
| 69 | 3.4.7 #29 | 7 documentation | documentation | — | architectural | weak | corroborates #37; corroborates #38; corroborates #39; corroborates #40 |
| 70 | 3.4.7 #30 | 7 documentation | documentation | — | architectural | weak | corroborates #37; corroborates #38; corroborates #39; corroborates #40 |
| 71 | 3.4.7 #31 | 7 documentation | documentation | module-federation | architectural | weak | corroborates #3; corroborates #4; corroborates #25 |
| 72 | 3.4.7 #32 | 7 documentation | comment | — | architectural | weak | contradicts #37; contradicts #2; contradicts packages/auth/config/webpack.common.js:19-23 |
| 73 | 3.4.7 #33 | 7 documentation | comment | — | architectural | weak | corroborates #6; corroborates #5; corroborates packages/dashboard/config/webpack.common.js:35 |
| 74 | 3.4.8 #1 | 8 history | history | — | architectural | weak | explains #50; explains #64 |
| 75 | 3.4.8 #2 | 8 history | history | module-federation | technological | weak | explains #62 |
| 76 | 3.4.8 #3 | 8 history | history | — | architectural | weak | explains #67 |
| 77 | 3.4.8 #4 | 8 history | history | — | architectural | weak | explains #68 |
| 78 | 3.4.8 #5 | 8 history | history | — | architectural | weak | explains #72 |

## Summary

Observations: 78. Dimensions (technology: 0, configuration: 8, code: 17, structure: 8, composition: 3, build-deploy: 4, documentation: 33, history: 5). Strength (strong: 9, moderate: 20, weak: 49, ambiguous: 0). Evidence (technological: 22, architectural: 49, context: 7).

