---
schema: 1
id: 1253360837
full_name: enzox0/module-federation-project-template
commit: b3c96cb653137038838f32097018cf8f8182b9f2
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

# 208 — enzox0/module-federation-project-template

## Repository overview

Snapshot contains shell and four React/Vite remotes, each with own entry and build (#38, #39, #40, #41, #42). Composition chain runs through plugin declarations (#1–#5), federation/Vite blocks (#7–#21), imports/routes (#27–#36) and four active relationships (#47–#50). Remote names link `./App` modules to targets; development ports only corroborate identity. Four remotes are stubs per 3.4.5; recorded composition does not presume complete business functionality.

Federation `.js` blocks also cited in structural markers, with own observations (#22–#26). Shell `.js` (#26) has differing endpoints, but 3.4.5 records `.ts` (#19) governing default flow. History (#73) records both arriving together, without earlier observable stage eliminating discrepancy. Strong strength of #26 describes explicit remote declaration without making it active configuration.

Final images separate per application (#51–#55), although each Dockerfile builds entire workspace. CD and orchestration infrastructure remain placeholders, and localhost endpoints with `/dist/assets/` do not match nginx image root/port. Production-readiness (#63), reverse-proxy (#65) and deployment without rebuilding remainder (#69) promises contradicted by already recorded evidence. Documentary claims remain weak even when corroborated.

Root (#37) and libraries (#43–#46) are context without own frontend unit. Applications declare workspace packages but do not import them, contradicting presentation as application-shared packages (#64, #75). Packages also lack build script, contradicting #72. Local asynchronous bootstrap (#31) is weak technological signal not independently identifying Module Federation. Historical points (#73–#78) clarify discrepancies without opening snapshot architecture ambiguity.

Dimension 2 only includes federation/plugin configuration blocks cited in tables. Marker `.d.ts` files are type declarations without build/runtime configuration; `turbo.json`, workspace, nginx and other cited blocks declare no composition element under step 2. Health-check URL enumeration is code, appearing only as review support without additional configuration observation.

## Observations

### 1. apps/admin-mf/package.json:14

**Observation:** admin-mf manifest declares `@originjs/vite-plugin-federation` in dependencies, version `^1.3.5`.

**Interpretation:** Module Federation technology signal; declaration alone does not establish composition.

### 2. apps/auth-mf/package.json:14

**Observation:** auth-mf manifest declares `@originjs/vite-plugin-federation` in dependencies, version `^1.3.5`.

**Interpretation:** Module Federation technology signal; declaration alone does not establish composition.

### 3. apps/dashboard-mf/package.json:14

**Observation:** dashboard-mf manifest declares `@originjs/vite-plugin-federation` in dependencies, version `^1.3.5`.

**Interpretation:** Module Federation technology signal; declaration alone does not establish composition.

### 4. apps/messaging-mf/package.json:14

**Observation:** messaging-mf manifest declares `@originjs/vite-plugin-federation` in dependencies, version `^1.3.5`.

**Interpretation:** Module Federation technology signal; declaration alone does not establish composition.

### 5. apps/shell/package.json:14

**Observation:** shell manifest declares `@originjs/vite-plugin-federation` in dependencies, version `^1.3.5`.

**Interpretation:** Module Federation technology signal; declaration alone does not establish composition.

### 6. package.json:30

**Observation:** Root manifest declares `turbo` in devDependencies, version `^2.0.0`.

**Interpretation:** Monorepo tool is coordination context; declaration identifies neither frontend units nor composition mechanism.

### 7. apps/admin-mf/module-federation.config.ts:1-8

**Observation:** Object `mfConfig` names `adminMf`, defines `remoteEntry.js`, exposes `./App` through `./src/exposes.tsx` and shares `react`, `react-dom` and `react-router-dom`.

**Interpretation:** Configures federation mechanism and exposed surface of a unit without naming consumers.

### 8. apps/admin-mf/vite.config.js:1-17

**Observation:** Vite configuration imports plugin `@originjs/vite-plugin-federation` and `mfConfig` from `./module-federation.config`, invoking `federation(mfConfig)` in plugin list.

**Interpretation:** Integrates federation into admin-mf build; block does not enumerate composition targets.

### 9. apps/admin-mf/vite.config.ts:1-18

**Observation:** Vite configuration imports plugin `@originjs/vite-plugin-federation` and `mfConfig` from `./module-federation.config`, invoking `federation(mfConfig)` in plugin list.

**Interpretation:** Integrates federation into admin-mf build; block does not enumerate composition targets.

### 10. apps/auth-mf/module-federation.config.ts:1-8

**Observation:** Object `mfConfig` names `authMf`, defines `remoteEntry.js`, exposes `./App` through `./src/exposes.tsx` and shares `react`, `react-dom` and `react-router-dom`.

**Interpretation:** Configures federation mechanism and exposed surface of a unit without naming consumers.

### 11. apps/auth-mf/vite.config.js:1-17

**Observation:** Vite configuration imports plugin `@originjs/vite-plugin-federation` and `mfConfig` from `./module-federation.config`, invoking `federation(mfConfig)` in plugin list.

**Interpretation:** Integrates federation into auth-mf build; block does not enumerate composition targets.

### 12. apps/auth-mf/vite.config.ts:1-18

**Observation:** Vite configuration imports plugin `@originjs/vite-plugin-federation` and `mfConfig` from `./module-federation.config`, invoking `federation(mfConfig)` in plugin list.

**Interpretation:** Integrates federation into auth-mf build; block does not enumerate composition targets.

### 13. apps/dashboard-mf/module-federation.config.ts:1-8

**Observation:** Object `mfConfig` names `dashboardMf`, defines `remoteEntry.js`, exposes `./App` through `./src/exposes.tsx` and shares `react`, `react-dom` and `react-router-dom`.

**Interpretation:** Configures federation mechanism and exposed surface of a unit without naming consumers.

### 14. apps/dashboard-mf/vite.config.js:1-17

**Observation:** Vite configuration imports plugin `@originjs/vite-plugin-federation` and `mfConfig` from `./module-federation.config`, invoking `federation(mfConfig)` in plugin list.

**Interpretation:** Integrates federation into dashboard-mf build; block does not enumerate composition targets.

### 15. apps/dashboard-mf/vite.config.ts:1-18

**Observation:** Vite configuration imports plugin `@originjs/vite-plugin-federation` and `mfConfig` from `./module-federation.config`, invoking `federation(mfConfig)` in plugin list.

**Interpretation:** Integrates federation into dashboard-mf build; block does not enumerate composition targets.

### 16. apps/messaging-mf/module-federation.config.ts:1-8

**Observation:** Object `mfConfig` names `messagingMf`, defines `remoteEntry.js`, exposes `./App` through `./src/exposes.tsx` and shares `react`, `react-dom` and `react-router-dom`.

**Interpretation:** Configures federation mechanism and exposed surface of a unit without naming consumers.

### 17. apps/messaging-mf/vite.config.js:1-17

**Observation:** Vite configuration imports plugin `@originjs/vite-plugin-federation` and `mfConfig` from `./module-federation.config`, invoking `federation(mfConfig)` in plugin list.

**Interpretation:** Integrates federation into messaging-mf build; block does not enumerate composition targets.

### 18. apps/messaging-mf/vite.config.ts:1-18

**Observation:** Vite configuration imports plugin `@originjs/vite-plugin-federation` and `mfConfig` from `./module-federation.config`, invoking `federation(mfConfig)` in plugin list.

**Interpretation:** Integrates federation into messaging-mf build; block does not enumerate composition targets.

### 19. apps/shell/module-federation.config.ts:1-11

**Observation:** Object `mfConfig` names `shell`, defines `remoteEntry.js`, declares `authMf`, `dashboardMf`, `adminMf` and `messagingMf` on ports 3001, 3002, 3003 and 3004 with path `/dist/assets/remoteEntry.js`, sharing React, React DOM and React Router.

**Interpretation:** Configuration explicitly links host to four remote units, parameterizing runtime resolution.

### 20. apps/shell/vite.config.js:1-17

**Observation:** Vite configuration imports plugin `@originjs/vite-plugin-federation` and `mfConfig` from `./module-federation.config`, invoking `federation(mfConfig)` in plugin list.

**Interpretation:** Integrates federation into shell build; block does not enumerate composition targets.

### 21. apps/shell/vite.config.ts:1-18

**Observation:** Vite configuration imports plugin `@originjs/vite-plugin-federation` and `mfConfig` from `./module-federation.config`, invoking `federation(mfConfig)` in plugin list.

**Interpretation:** Integrates federation into shell build; block does not enumerate composition targets.

### 22. apps/admin-mf/module-federation.config.js:1-8

**Observation:** Object `mfConfig` names `adminMf`, defines `remoteEntry.js`, exposes `./App` through `./src/exposes.tsx` and shares `react`, `react-dom` and `react-router-dom`.

**Interpretation:** Configures federation mechanism and exposed surface of a unit without naming consumers.

### 23. apps/auth-mf/module-federation.config.js:1-8

**Observation:** Object `mfConfig` names `authMf`, defines `remoteEntry.js`, exposes `./App` through `./src/exposes.tsx` and shares `react`, `react-dom` and `react-router-dom`.

**Interpretation:** Configures federation mechanism and exposed surface of a unit without naming consumers.

### 24. apps/dashboard-mf/module-federation.config.js:1-8

**Observation:** Object `mfConfig` names `dashboardMf`, defines `remoteEntry.js`, exposes `./App` through `./src/exposes.tsx` and shares `react`, `react-dom` and `react-router-dom`.

**Interpretation:** Configures federation mechanism and exposed surface of a unit without naming consumers.

### 25. apps/messaging-mf/module-federation.config.js:1-8

**Observation:** Object `mfConfig` names `messagingMf`, defines `remoteEntry.js`, exposes `./App` through `./src/exposes.tsx` and shares `react`, `react-dom` and `react-router-dom`.

**Interpretation:** Configures federation mechanism and exposed surface of a unit without naming consumers.

### 26. apps/shell/module-federation.config.js:1-11

**Observation:** Object `mfConfig` names `shell`, defines `remoteEntry.js`, declares `authMf`, `dashboardMf`, `adminMf` and `messagingMf` on ports 3004, 3005, 3006 and 3007 with path `/assets/remoteEntry.js`, sharing React, React DOM and React Router.

**Interpretation:** Explicit host/remote link declaration. Section 3.4.5 records compiled copy does not govern default flow; differing endpoints do not change targets identified by names.

### 27. apps/shell/src/App.tsx:7

**Observation:** Shell defines remote component with `lazy(() => import('authMf/App'))`.

**Interpretation:** Loading directly names module of auth-mf unit, linking shell to target through Module Federation.

### 28. apps/shell/src/App.tsx:8

**Observation:** Shell defines remote component with `lazy(() => import('adminMf/App'))`.

**Interpretation:** Loading directly names module of admin-mf unit, linking shell to target through Module Federation.

### 29. apps/shell/src/App.tsx:9

**Observation:** Shell defines remote component with `lazy(() => import('dashboardMf/App'))`.

**Interpretation:** Loading directly names module of dashboard-mf unit, linking shell to target through Module Federation.

### 30. apps/shell/src/App.tsx:10

**Observation:** Shell defines remote component with `lazy(() => import('messagingMf/App'))`.

**Interpretation:** Loading directly names module of messaging-mf unit, linking shell to target through Module Federation.

### 31. apps/shell/src/main.tsx:1

**Observation:** File executes `import('./bootstrap')`.

**Interpretation:** Asynchronous loading internal to shell; alone links no units and identifies no federation technology.

### 32. apps/shell/src/App.tsx:24-76

**Observation:** Table `Routes` associates `/auth`, `/admin`, `/dashboard` and `/messaging` with `AuthApp`, `AdminApp`, `DashboardApp` and `MessagingApp`, with `ErrorBoundary` and `Suspense` in each route.

**Interpretation:** Table locates four remote unit mounts on host navigation paths.

### 33. apps/shell/src/App.tsx:39-43; apps/shell/src/App.tsx:7

**Observation:** Shell renders `<AuthApp />` inside `ErrorBoundary` and `Suspense`; component comes from lazy import of `authMf/App`.

**Interpretation:** Rendering point of auth-mf component; mounting part of composition without independently declaring route relationship.

### 34. apps/shell/src/App.tsx:49-53; apps/shell/src/App.tsx:8

**Observation:** Shell renders `<AdminApp />` inside `ErrorBoundary` and `Suspense`; component comes from lazy import of `adminMf/App`.

**Interpretation:** Rendering point of admin-mf component; mounting part of composition without independently declaring route relationship.

### 35. apps/shell/src/App.tsx:59-63; apps/shell/src/App.tsx:9

**Observation:** Shell renders `<DashboardApp />` inside `ErrorBoundary` and `Suspense`; component comes from lazy import of `dashboardMf/App`.

**Interpretation:** Rendering point of dashboard-mf component; mounting part of composition without independently declaring route relationship.

### 36. apps/shell/src/App.tsx:69-73; apps/shell/src/App.tsx:10

**Observation:** Shell renders `<MessagingApp />` inside `ErrorBoundary` and `Suspense`; component comes from lazy import of `messagingMf/App`.

**Interpretation:** Rendering point of messaging-mf component; mounting part of composition without independently declaring route relationship.

### 37. .; package.json:1-43

**Observation:** Root has workspace manifest and `turbo run build` script without own UI entry or build.

**Interpretation:** Workspace coordination rather than frontend unit.

### 38. apps/admin-mf; apps/admin-mf/index.html:10; apps/admin-mf/src/bootstrap.tsx:5-9; apps/admin-mf/package.json:8; apps/admin-mf/vite.config.ts:6-18; apps/admin-mf/Dockerfile:9-12

**Observation:** apps/admin-mf has entry HTML, React-mounting bootstrap, `tsc && vite build` script, own Vite configuration and Dockerfile copying only own `dist` to final image.

**Interpretation:** Together delimit frontend unit with own entry and build; links to others depend on composition evidence.

### 39. apps/auth-mf; apps/auth-mf/index.html:10; apps/auth-mf/src/bootstrap.tsx:5-9; apps/auth-mf/package.json:8; apps/auth-mf/vite.config.ts:6-18; apps/auth-mf/Dockerfile:9-12

**Observation:** apps/auth-mf has entry HTML, React-mounting bootstrap, `tsc && vite build` script, own Vite configuration and Dockerfile copying only own `dist` to final image.

**Interpretation:** Together delimit frontend unit with own entry and build; links to others depend on composition evidence.

### 40. apps/dashboard-mf; apps/dashboard-mf/index.html:10; apps/dashboard-mf/src/bootstrap.tsx:5-9; apps/dashboard-mf/package.json:8; apps/dashboard-mf/vite.config.ts:6-18; apps/dashboard-mf/Dockerfile:9-12

**Observation:** apps/dashboard-mf has entry HTML, React-mounting bootstrap, `tsc && vite build` script, own Vite configuration and Dockerfile copying only own `dist` to final image.

**Interpretation:** Together delimit frontend unit with own entry and build; links to others depend on composition evidence.

### 41. apps/messaging-mf; apps/messaging-mf/index.html:10; apps/messaging-mf/src/bootstrap.tsx:5-9; apps/messaging-mf/package.json:8; apps/messaging-mf/vite.config.ts:6-18; apps/messaging-mf/Dockerfile:9-12

**Observation:** apps/messaging-mf has entry HTML, React-mounting bootstrap, `tsc && vite build` script, own Vite configuration and Dockerfile copying only own `dist` to final image.

**Interpretation:** Together delimit frontend unit with own entry and build; links to others depend on composition evidence.

### 42. apps/shell; apps/shell/index.html:10; apps/shell/src/main.tsx:1; apps/shell/src/bootstrap.tsx:5-9; apps/shell/package.json:8; apps/shell/vite.config.ts:6-18; apps/shell/Dockerfile:9-12

**Observation:** apps/shell has entry HTML, React-mounting bootstrap, `tsc && vite build` script, own Vite configuration and Dockerfile copying only own `dist` to final image.

**Interpretation:** Together delimit frontend unit with own entry and build; links to others depend on composition evidence.

### 43. packages/sdk; packages/sdk/package.json:5-10

**Observation:** Manifest of packages/sdk points `main` to `./src/index.ts`, declaring only `lint` and `clean` scripts; structural review records library of HTTP, auth and websocket clients without application entry.

**Interpretation:** Workspace support package; does not delimit independent frontend unit.

### 44. packages/shared; packages/shared/package.json:5-10

**Observation:** Manifest of packages/shared points `main` to `./src/index.ts`, declaring only `lint` and `clean` scripts; structural review records library of utilities without application entry.

**Interpretation:** Workspace support package; does not delimit independent frontend unit.

### 45. packages/types; packages/types/package.json:5-10

**Observation:** Manifest of packages/types points `main` to `./src/index.ts`, declaring only `lint` and `clean` scripts; structural review records library of types without application entry.

**Interpretation:** Workspace support package; does not delimit independent frontend unit.

### 46. packages/ui; packages/ui/package.json:5-10

**Observation:** Manifest of packages/ui points `main` to `./src/index.ts`, declaring only `lint` and `clean` scripts; structural review records library of UI components without application entry.

**Interpretation:** Workspace support package; does not delimit independent frontend unit.

### 47. apps/shell/src/App.tsx:7; apps/shell/src/App.tsx:36-45; apps/shell/module-federation.config.ts:5; apps/shell/vite.config.ts:7; apps/auth-mf/module-federation.config.ts:2-6

**Observation:** Shell imports `authMf/App`, mounting at `/auth` route. Key `authMf` in `remotes` resolves `remoteEntry.js`, matching auth-mf configuration name exposing `./App`.

**Interpretation:** An active host → remote relationship within snapshot, supported by target resolution and code consumption.

### 48. apps/shell/src/App.tsx:8; apps/shell/src/App.tsx:46-55; apps/shell/module-federation.config.ts:7; apps/shell/vite.config.ts:7; apps/admin-mf/module-federation.config.ts:2-6

**Observation:** Shell imports `adminMf/App`, mounting at `/admin` route. Key `adminMf` in `remotes` resolves `remoteEntry.js`, matching admin-mf configuration name exposing `./App`.

**Interpretation:** An active host → remote relationship within snapshot, supported by target resolution and code consumption.

### 49. apps/shell/src/App.tsx:9; apps/shell/src/App.tsx:56-65; apps/shell/module-federation.config.ts:6; apps/shell/vite.config.ts:7; apps/dashboard-mf/module-federation.config.ts:2-6

**Observation:** Shell imports `dashboardMf/App`, mounting at `/dashboard` route. Key `dashboardMf` in `remotes` resolves `remoteEntry.js`, matching dashboard-mf configuration name exposing `./App`.

**Interpretation:** An active host → remote relationship within snapshot, supported by target resolution and code consumption.

### 50. apps/shell/src/App.tsx:10; apps/shell/src/App.tsx:66-75; apps/shell/module-federation.config.ts:8; apps/shell/vite.config.ts:7; apps/messaging-mf/module-federation.config.ts:2-6

**Observation:** Shell imports `messagingMf/App`, mounting at `/messaging` route. Key `messagingMf` in `remotes` resolves `remoteEntry.js`, matching messaging-mf configuration name exposing `./App`.

**Interpretation:** An active host → remote relationship within snapshot, supported by target resolution and code consumption.

### 51. apps/admin-mf/package.json:8; apps/admin-mf/vite.config.ts:6-13; apps/admin-mf/Dockerfile:1-12

**Observation:** apps/admin-mf has own `tsc && vite build` script and configuration. Dockerfile executes `pnpm build` on entire workspace, but final nginx image receives only this application `dist` and exposes port 80.

**Interpretation:** Build and deployment separate per 3.4.6, delimiting application. Image build still covers workspace; no independent versioning used in publication or demonstrated deployment execution.

### 52. apps/auth-mf/package.json:8; apps/auth-mf/vite.config.ts:6-13; apps/auth-mf/Dockerfile:1-12

**Observation:** apps/auth-mf has own `tsc && vite build` script and configuration. Dockerfile executes `pnpm build` on entire workspace, but final nginx image receives only this application `dist` and exposes port 80.

**Interpretation:** Build and deployment separate per 3.4.6, delimiting application. Image build still covers workspace; no independent versioning used in publication or demonstrated deployment execution.

### 53. apps/dashboard-mf/package.json:8; apps/dashboard-mf/vite.config.ts:6-13; apps/dashboard-mf/Dockerfile:1-12

**Observation:** apps/dashboard-mf has own `tsc && vite build` script and configuration. Dockerfile executes `pnpm build` on entire workspace, but final nginx image receives only this application `dist` and exposes port 80.

**Interpretation:** Build and deployment separate per 3.4.6, delimiting application. Image build still covers workspace; no independent versioning used in publication or demonstrated deployment execution.

### 54. apps/messaging-mf/package.json:8; apps/messaging-mf/vite.config.ts:6-13; apps/messaging-mf/Dockerfile:1-12

**Observation:** apps/messaging-mf has own `tsc && vite build` script and configuration. Dockerfile executes `pnpm build` on entire workspace, but final nginx image receives only this application `dist` and exposes port 80.

**Interpretation:** Build and deployment separate per 3.4.6, delimiting application. Image build still covers workspace; no independent versioning used in publication or demonstrated deployment execution.

### 55. apps/shell/package.json:8; apps/shell/vite.config.ts:6-13; apps/shell/Dockerfile:1-12; infrastructure/docker/production/Dockerfile.shell:1-13; infrastructure/nginx/nginx.conf:9-18; apps/shell/module-federation.config.ts:5-8

**Observation:** apps/shell has own `tsc && vite build` script and configuration. Dockerfile executes `pnpm build` on entire workspace, but final nginx image receives only this application `dist` and exposes port 80. Alternative production Dockerfile adds nginx with SPA fallback, and shell retains embedded localhost remote URLs.

**Interpretation:** Build and deployment separate per 3.4.6, delimiting application. Image build still covers workspace; no independent versioning used in publication or demonstrated deployment execution.

### 56. .docs/QUICK_START.md:28-29

**Observation:** Documentation states: "\"Failed to fetch dynamically imported module\"" / "**Cause:** A remote microfrontend isn't running".

**Interpretation:** Describes remote availability dependency during host loading; 3.4.7 records corroborated.

### 57. .docs/QUICK_START.md:46-50

**Observation:** Documentation states: "Shell (Host) | 3000", "Auth MF | 3001", "Dashboard MF | 3002", "Admin MF | 3003", "Messaging MF | 3004".

**Interpretation:** Describes host and four remote units with distinct ports; 3.4.7 confirms organization.

### 58. .docs/QUICK_START.md:76

**Observation:** Documentation states: "**Error Boundaries** - Graceful error handling".

**Interpretation:** Claims error protection in composition; 3.4.7 confirms mounting wrappers without demonstrating module refetch after retry.

### 59. .docs/QUICK_START.md:77

**Observation:** Documentation states: "**Remote Health Check** - Real-time status monitoring".

**Interpretation:** Claims remote monitoring; 3.4.7 confirms health check, which loads/mounts no unit.

### 60. .docs/RUNNING.md:3

**Observation:** Documentation states: "This is a monorepo with multiple microfrontends using Module Federation.".

**Interpretation:** Presents units in Module Federation monorepo; claim corroborated but remains semantic.

### 61. .docs/RUNNING.md:81

**Observation:** Documentation states: "Verify the remote app is accessible at its URL (e.g., http://localhost:3001/assets/remoteEntry.js)".

**Interpretation:** Documented address contradicted: shell and health check use `/dist/assets/remoteEntry.js`.

### 62. .docs/RUNNING.md:96

**Observation:** Documentation states: "This will build all apps in the correct order using Turbo's dependency graph.".

**Interpretation:** Claims application-build coordination; 3.4.7 confirms graph configuration without actual shared-package builds.

### 63. README.md:3

**Observation:** Documentation states: "A production-ready monorepo template".

**Interpretation:** Production-readiness promise contradicted by placeholder CD and divergence between host endpoints and image services.

### 64. README.md:3

**Observation:** Documentation states: "This template provides a complete microfrontend architecture with shared packages".

**Interpretation:** Describes shared packages as architecture part. Section 3.4.7 records contradicted: apps declare packages but do not import them.

### 65. README.md:42

**Observation:** Documentation states: "Nginx<br/>Reverse Proxy<br/>Production Routing".

**Interpretation:** Reverse-proxy claim contradicted: nginx only serves shell static files with SPA fallback.

### 66. README.md:43

**Observation:** Documentation states: "Docker<br/>Containerization<br/>Deployment".

**Interpretation:** Describes unit container packaging; 3.4.7 confirms separate images without deployment execution.

### 67. README.md:46-49

**Observation:** Documentation states: "Shell -->|Lazy Load| Auth" (same for Dashboard, Admin and Messaging).

**Interpretation:** Describes shell loading four remotes; 3.4.7 confirms imports and relationships.

### 68. README.md:100

**Observation:** Documentation states: "**Build independent microfrontends** that can be developed, tested, and deployed separately".

**Interpretation:** Claims independent development, testing and deployment; 3.4.7 corroborates through own entries/images without assigned production URL.

### 69. README.md:103

**Observation:** Documentation states: "**Deploy independently** without rebuilding the entire application".

**Interpretation:** Promise of deployment without rebuilding other applications contradicted by whole-workspace Dockerfile builds.

### 70. README.md:107

**Observation:** Documentation states: "**Module Federation**: Runtime code sharing between applications".

**Interpretation:** Names Module Federation as runtime inter-application code sharing, corroborated by host/remote relationships.

### 71. README.md:122-123

**Observation:** Documentation states: "Handles routing and navigation" / "Provides shared layout and error boundaries".

**Interpretation:** Describes shell navigation and common-layout role; 3.4.7 confirms route table and enclosing structure.

### 72. README.md:507

**Observation:** Documentation states: "Builds all shared packages first".

**Interpretation:** Step contradicted: shared packages lack `build` script.

### 73. 7e00cd3 2026-05-29 (apps/shell/module-federation.config.js; apps/shell/module-federation.config.ts); b3c96cb 2026-05-29 (.docs/RUNNING.md)

**Observation:** Shell federation `.js` and `.ts` files arrive together in `7e00cd3`, unchanged; already have differing endpoints on introduction. Guide with path without `/dist` enters in `b3c96cb`, unchanged afterward.

**Interpretation:** Discrepancy coexists in snapshot since file introduction without earlier observed stage explaining outdated copy. Default-flow resolution remains as recorded in 3.4.5.

### 74. 76d4857 2026-05-29 (README.md); 7e00cd3 2026-05-29 (apps/shell/module-federation.config.ts); a158918 2026-05-29 (infrastructure/kubernetes/); 599d40d 2026-05-29 (infrastructure/kubernetes/shell/index.yaml); ed07d0d 2026-05-29 (infrastructure/terraform/); 785290a 2026-05-29 (scripts/deploy.sh); 4db3303 2026-05-29 (.github/workflows/cd.yml)

**Observation:** README predates applications and infrastructure. Kubernetes, Terraform, scripts and workflows enter later; placeholders and CD `echo` not completed through snapshot.

**Interpretation:** Announced readiness and incomplete infrastructure coexist since creation; no observable production deployment withdrawn in repository history.

### 75. 76d4857 2026-05-29 (README.md); 23b3cd7 2026-05-29 (apps/admin-mf/package.json); b51dc85 2026-05-29 (apps/auth-mf/package.json); 5c843e2 2026-05-29 (apps/dashboard-mf/package.json); 4187380 2026-05-29 (apps/messaging-mf/package.json); 31ac7bf 2026-05-29 (apps/shell/package.json); cefcdba 2026-05-29 (packages/sdk/package.json); 6437f4e 2026-05-29 (packages/shared/package.json); 40908b4 2026-05-29 (packages/types/package.json); b5a45f8 2026-05-29 (packages/ui/package.json)

**Observation:** Five application manifests declare workspace packages since creation. Source files unchanged/unremoved after addition, never importing packages through snapshot; packages added after applications.

**Interpretation:** Lack of usage does not result from later disconnection of previously integrated packages; contextualizes documentation contradiction.

### 76. 76d4857 2026-05-29 (README.md); de055a2 2026-05-29 (infrastructure/docker/production/Dockerfile.shell); 4da0ea3 2026-05-29 (infrastructure/nginx/nginx.conf)

**Observation:** README diagram predates nginx and shell production Dockerfile. `nginx.conf` created as static file server with fallback, never changed.

**Interpretation:** Described reverse proxy had no observable earlier implementation removed; contradiction originates with artifact introduction.

### 77. 76d4857 2026-05-29 (README.md); 4c4be4f 2026-05-29 (apps/admin-mf/Dockerfile); 264b5f2 2026-05-29 (apps/auth-mf/Dockerfile); 452d4f3 2026-05-29 (apps/dashboard-mf/Dockerfile); 4187380 2026-05-29 (apps/messaging-mf/Dockerfile); adc6f0f 2026-05-29 (apps/shell/Dockerfile)

**Observation:** README predates five Dockerfiles. Since creation each executes entire workspace build; none changes through snapshot.

**Interpretation:** Promise of deployment without rebuilding remainder does not correspond to earlier observable Dockerfile stage.

### 78. 76d4857 2026-05-29 (README.md); 73d3333 2026-05-29 (turbo.json); cefcdba 2026-05-29 (packages/sdk/package.json); 6437f4e 2026-05-29 (packages/shared/package.json); 40908b4 2026-05-29 (packages/types/package.json); b5a45f8 2026-05-29 (packages/ui/package.json)

**Observation:** README predates shared packages. Their manifests never have `build` script; `turbo.json` retains `^build` since creation.

**Interpretation:** Described package build does not correspond to previously existing repository scripts; discrepancy not an observed regression.

## Classification

| # | Origin | Dimension | Type | Approach | Evidence | Strength | Relationships |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.2 (apps/admin-mf/package.json:14) | 1 technology | manifest | module-federation | technological | weak | declares #8; declares #9 |
| 2 | 3.4.2 (apps/auth-mf/package.json:14) | 1 technology | manifest | module-federation | technological | weak | declares #11; declares #12 |
| 3 | 3.4.2 (apps/dashboard-mf/package.json:14) | 1 technology | manifest | module-federation | technological | weak | declares #14; declares #15 |
| 4 | 3.4.2 (apps/messaging-mf/package.json:14) | 1 technology | manifest | module-federation | technological | weak | declares #17; declares #18 |
| 5 | 3.4.2 (apps/shell/package.json:14) | 1 technology | manifest | module-federation | technological | weak | declares #20; declares #21 |
| 6 | 3.4.2 (package.json:30) | 1 technology | manifest | — | context | weak | declares turbo.json:4-19; declares .github/workflows/ci.yml:25-26 |
| 7 | 3.4.2 #1 (Evidence (artefato:linha)); 3.4.3 #2 (Markers); 3.4.4 #2 (Observation); 3.4.5 #2 (Configuration) | 2 configuration | configuration | module-federation | technological | moderate | configures #38 |
| 8 | 3.4.2 #1 (Evidence (artefato:linha)); 3.4.3 #2 (Markers) | 2 configuration | configuration | module-federation | technological | moderate | configures #38 |
| 9 | 3.4.2 #1 (Evidence (artefato:linha)); 3.4.3 #2 (Markers); 3.4.3 #2 (Build); 3.4.5 #2 (Configuration); 3.4.6 #1 (Artifacts) | 2 configuration | configuration | module-federation | technological | moderate | configures #38 |
| 10 | 3.4.2 #2 (Evidence (artefato:linha)); 3.4.3 #3 (Markers); 3.4.4 #1 (Observation); 3.4.5 #1 (Configuration); 3.4.7 #15 (Evidence) | 2 configuration | configuration | module-federation | technological | moderate | configures #39 |
| 11 | 3.4.2 #2 (Evidence (artefato:linha)); 3.4.3 #3 (Markers) | 2 configuration | configuration | module-federation | technological | moderate | configures #39 |
| 12 | 3.4.2 #2 (Evidence (artefato:linha)); 3.4.3 #3 (Markers); 3.4.3 #3 (Build); 3.4.5 #1 (Configuration); 3.4.6 #2 (Artifacts); 3.4.7 #2 (Evidence) | 2 configuration | configuration | module-federation | technological | moderate | configures #39 |
| 13 | 3.4.2 #3 (Evidence (artefato:linha)); 3.4.3 #4 (Markers); 3.4.4 #3 (Observation); 3.4.5 #3 (Configuration) | 2 configuration | configuration | module-federation | technological | moderate | configures #40 |
| 14 | 3.4.2 #3 (Evidence (artefato:linha)); 3.4.3 #4 (Markers) | 2 configuration | configuration | module-federation | technological | moderate | configures #40 |
| 15 | 3.4.2 #3 (Evidence (artefato:linha)); 3.4.3 #4 (Markers); 3.4.3 #4 (Build); 3.4.5 #3 (Configuration); 3.4.6 #3 (Artifacts) | 2 configuration | configuration | module-federation | technological | moderate | configures #40 |
| 16 | 3.4.2 #4 (Evidence (artefato:linha)); 3.4.3 #5 (Markers); 3.4.4 #4 (Observation); 3.4.5 #4 (Configuration) | 2 configuration | configuration | module-federation | technological | moderate | configures #41 |
| 17 | 3.4.2 #4 (Evidence (artefato:linha)); 3.4.3 #5 (Markers) | 2 configuration | configuration | module-federation | technological | moderate | configures #41 |
| 18 | 3.4.2 #4 (Evidence (artefato:linha)); 3.4.3 #5 (Markers); 3.4.3 #5 (Build); 3.4.5 #4 (Configuration); 3.4.6 #4 (Artifacts) | 2 configuration | configuration | module-federation | technological | moderate | configures #41 |
| 19 | 3.4.2 #5 (Evidence (artefato:linha)); 3.4.3 #6 (Markers); 3.4.4 #1 (Observation); 3.4.4 #2 (Observation); 3.4.4 #3 (Observation); 3.4.4 #4 (Observation); 3.4.5 #1 (Configuration); 3.4.5 #2 (Configuration); 3.4.5 #3 (Configuration); 3.4.5 #4 (Configuration); 3.4.6 #1 (Where served); 3.4.6 #2 (Where served); 3.4.6 #3 (Where served); 3.4.6 #4 (Where served); 3.4.7 #1 (Evidence); 3.4.7 #6 (Evidence); 3.4.7 #8 (Evidence); 3.4.7 #15 (Evidence) | 2 configuration | configuration | module-federation | architectural | strong | configures #47; configures #48; configures #49; configures #50 |
| 20 | 3.4.2 #5 (Evidence (artefato:linha)); 3.4.3 #6 (Markers) | 2 configuration | configuration | module-federation | technological | moderate | configures #42 |
| 21 | 3.4.2 #5 (Evidence (artefato:linha)); 3.4.3 #6 (Markers); 3.4.3 #6 (Build); 3.4.4 #1 (Observation); 3.4.5 #1 (Configuration); 3.4.5 #2 (Configuration); 3.4.5 #3 (Configuration); 3.4.5 #4 (Configuration); 3.4.6 #5 (Artifacts); 3.4.7 #2 (Evidence) | 2 configuration | configuration | module-federation | technological | moderate | configures #42 |
| 22 | 3.4.3 #2 (Markers) | 2 configuration | configuration | module-federation | technological | moderate | configures #38 |
| 23 | 3.4.3 #3 (Markers) | 2 configuration | configuration | module-federation | technological | moderate | configures #39 |
| 24 | 3.4.3 #4 (Markers) | 2 configuration | configuration | module-federation | technological | moderate | configures #40 |
| 25 | 3.4.3 #5 (Markers) | 2 configuration | configuration | module-federation | technological | moderate | configures #41 |
| 26 | 3.4.3 #6 (Markers) | 2 configuration | configuration | module-federation | architectural | strong | configures #47; configures #48; configures #49; configures #50 |
| 27 | 3.4.4 (src-remote-import, apps/shell/src/App.tsx:7) | 3 code | source code | module-federation | architectural | strong | implements #47 |
| 28 | 3.4.4 (src-remote-import, apps/shell/src/App.tsx:8) | 3 code | source code | module-federation | architectural | strong | implements #48 |
| 29 | 3.4.4 (src-remote-import, apps/shell/src/App.tsx:9) | 3 code | source code | module-federation | architectural | strong | implements #49 |
| 30 | 3.4.4 (src-remote-import, apps/shell/src/App.tsx:10) | 3 code | source code | module-federation | architectural | strong | implements #50 |
| 31 | 3.4.4 (src-async-bootstrap, apps/shell/src/main.tsx:1) | 3 code | source code | — | technological | weak | — |
| 32 | 3.4.4 (manual host-relationship, apps/shell/src/App.tsx:24) | 3 code | source code | module-federation | architectural | strong | implements #47; implements #48; implements #49; implements #50 |
| 33 | 3.4.4 (manual runtime-composition, apps/shell/src/App.tsx:41) | 3 code | source code | module-federation | architectural | moderate | implements #47 |
| 34 | 3.4.4 (manual runtime-composition, apps/shell/src/App.tsx:51) | 3 code | source code | module-federation | architectural | moderate | implements #48 |
| 35 | 3.4.4 (manual runtime-composition, apps/shell/src/App.tsx:61) | 3 code | source code | module-federation | architectural | moderate | implements #49 |
| 36 | 3.4.4 (manual runtime-composition, apps/shell/src/App.tsx:71) | 3 code | source code | module-federation | architectural | moderate | implements #50 |
| 37 | 3.4.3 (.) | 4 structure | directory | — | context | weak | — |
| 38 | 3.4.3 (apps/admin-mf) | 4 structure | directory | — | architectural | moderate | — |
| 39 | 3.4.3 (apps/auth-mf) | 4 structure | directory | — | architectural | moderate | — |
| 40 | 3.4.3 (apps/dashboard-mf) | 4 structure | directory | — | architectural | moderate | — |
| 41 | 3.4.3 (apps/messaging-mf) | 4 structure | directory | — | architectural | moderate | — |
| 42 | 3.4.3 (apps/shell) | 4 structure | directory | — | architectural | moderate | — |
| 43 | 3.4.3 (packages/sdk) | 4 structure | directory | — | context | weak | — |
| 44 | 3.4.3 (packages/shared) | 4 structure | directory | — | context | weak | — |
| 45 | 3.4.3 (packages/types) | 4 structure | directory | — | context | weak | — |
| 46 | 3.4.3 (packages/ui) | 4 structure | directory | — | context | weak | — |
| 47 | 3.4.5 #1 | 5 composition | source code | module-federation | architectural | strong | links #42; links #39 |
| 48 | 3.4.5 #2 | 5 composition | source code | module-federation | architectural | strong | links #42; links #38 |
| 49 | 3.4.5 #3 | 5 composition | source code | module-federation | architectural | strong | links #42; links #40 |
| 50 | 3.4.5 #4 | 5 composition | source code | module-federation | architectural | strong | links #42; links #41 |
| 51 | 3.4.6 #1 | 6 build-deploy | deploy | — | architectural | moderate | publishes #38 |
| 52 | 3.4.6 #2 | 6 build-deploy | deploy | — | architectural | moderate | publishes #39 |
| 53 | 3.4.6 #3 | 6 build-deploy | deploy | — | architectural | moderate | publishes #40 |
| 54 | 3.4.6 #4 | 6 build-deploy | deploy | — | architectural | moderate | publishes #41 |
| 55 | 3.4.6 #5 | 6 build-deploy | deploy | — | architectural | moderate | publishes #42 |
| 56 | 3.4.7 #1 | 7 documentation | documentation | — | architectural | weak | corroborates #27; corroborates #28; corroborates #29; corroborates #30 |
| 57 | 3.4.7 #2 | 7 documentation | documentation | — | architectural | weak | corroborates #38; corroborates #39; corroborates #40; corroborates #41; corroborates #42 |
| 58 | 3.4.7 #3 | 7 documentation | documentation | — | architectural | weak | corroborates #33; corroborates #34; corroborates #35; corroborates #36 |
| 59 | 3.4.7 #4 | 7 documentation | documentation | — | architectural | weak | corroborates apps/shell/src/components/RemoteHealthCheck.tsx:11-16; corroborates apps/shell/src/components/RemoteHealthCheck.tsx:24-58 |
| 60 | 3.4.7 #5 | 7 documentation | documentation | module-federation | architectural | weak | corroborates #47; corroborates #48; corroborates #49; corroborates #50 |
| 61 | 3.4.7 #6 | 7 documentation | documentation | — | architectural | weak | contradicts #19; contradicts apps/shell/src/components/RemoteHealthCheck.tsx:12 |
| 62 | 3.4.7 #7 | 7 documentation | documentation | — | architectural | weak | corroborates #51; corroborates #52; corroborates #53; corroborates #54; corroborates #55; corroborates turbo.json:5-8 |
| 63 | 3.4.7 #8 | 7 documentation | documentation | — | architectural | weak | contradicts .github/workflows/cd.yml:14-15; contradicts #55; contradicts #52 |
| 64 | 3.4.7 #9 | 7 documentation | documentation | — | architectural | weak | contradicts apps/auth-mf/src/bootstrap.tsx:1-3 |
| 65 | 3.4.7 #10 | 7 documentation | documentation | — | architectural | weak | contradicts infrastructure/nginx/nginx.conf:9-18 |
| 66 | 3.4.7 #11 | 7 documentation | documentation | — | architectural | weak | corroborates #51; corroborates #52; corroborates #53; corroborates #54; corroborates #55 |
| 67 | 3.4.7 #12 | 7 documentation | documentation | — | architectural | weak | corroborates #47; corroborates #48; corroborates #49; corroborates #50 |
| 68 | 3.4.7 #13 | 7 documentation | documentation | — | architectural | weak | corroborates #38; corroborates #39; corroborates #40; corroborates #41; corroborates #42; corroborates #51; corroborates #52; corroborates #53; corroborates #54; corroborates #55 |
| 69 | 3.4.7 #14 | 7 documentation | documentation | — | architectural | weak | contradicts #51 |
| 70 | 3.4.7 #15 | 7 documentation | documentation | module-federation | architectural | weak | corroborates #47; corroborates #48; corroborates #49; corroborates #50 |
| 71 | 3.4.7 #16 | 7 documentation | documentation | — | architectural | weak | corroborates #32; corroborates apps/shell/src/App.tsx:15-23; corroborates apps/shell/src/App.tsx:77-78 |
| 72 | 3.4.7 #17 | 7 documentation | documentation | — | architectural | weak | contradicts #43; contradicts #44; contradicts #45; contradicts #46 |
| 73 | 3.4.8 #1 | 8 history | history | module-federation | architectural | weak | explains #26; explains #19; explains #61 |
| 74 | 3.4.8 #2 | 8 history | history | — | architectural | weak | explains #63; explains #55 |
| 75 | 3.4.8 #3 | 8 history | history | — | architectural | weak | explains #64 |
| 76 | 3.4.8 #4 | 8 history | history | — | architectural | weak | explains #65; explains #55 |
| 77 | 3.4.8 #5 | 8 history | history | — | architectural | weak | explains #69; explains #51; explains #52; explains #53; explains #54; explains #55 |
| 78 | 3.4.8 #6 | 8 history | history | — | context | weak | explains #72; explains #43; explains #44; explains #45; explains #46 |

## Summary

Observations: 78. Dimensions (technology: 6, configuration: 20, code: 10, structure: 10, composition: 4, build-deploy: 5, documentation: 17, history: 6). Strength (strong: 11, moderate: 32, weak: 35, ambiguous: 0). Evidence (technological: 24, architectural: 47, context: 7).

