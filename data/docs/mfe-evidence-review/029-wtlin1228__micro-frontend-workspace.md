---
schema: 1
id: 1043597864
full_name: wtlin1228/micro-frontend-workspace
commit: 9b81d2c5b6156084e0e9a4a3ecfdd89494d0b692
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

# 029 — wtlin1228/micro-frontend-workspace

## Repository overview

React host composes four applications through two simultaneous mechanisms from one registry, `APP_CONFIGS` (#32). Registry is sole code observation directly naming target units. Other host constructs are generic: receive registry name/entry.

**Runtime Module Federation (app-mf-1 and app-mf-2):**
- **Dependencies:** Rsbuild federation plugin/runtime `@module-federation/enhanced` (#1 through #3, #5).
- **Configuration:**
  - each remote declares itself, exposes component factory and fixes public path (#6 through #9);
  - host configures federation with static `remotes` commented (#10, #11).
- **Code:** host registers/loads each remote on demand when route accessed (#17 through #19, #33 through #35).

**qiankun (app-qiankun-1 and app-qiankun-2):**
- **Dependency:** `qiankun` (#4).
- **Configuration:** each sub-app packaged as named UMD library (#12, #13).
- **Code:** each sub-app exports lifecycles (#20 through #27). Host registers both with orchestrator/starts it (#28 through #31).

**Relationships:** both chains produce four active relationships (#43 through #46) between five independently bounded units.

All applications have own builds but outputs tied to `localhost`, without observed deployment (#47 through #51). Short documentation matches implementation, including two-mechanism combination (#53). Sole historical point, commented `remotes`, resolved by snapshot itself (#55).

## Observations

### 1. packages/app-mf-1/package.json:17

**Observation:** `@module-federation/rsbuild-plugin` (`^0.18.3`) declared in `devDependencies`.

**Interpretation:** Federation technology present in app-mf-1 build.

### 2. packages/app-mf-2/package.json:17

**Observation:** `@module-federation/rsbuild-plugin` (`^0.18.3`) declared in `devDependencies`.

**Interpretation:** Federation technology present in app-mf-2 build.

### 3. packages/host/package.json:11

**Observation:** `@module-federation/enhanced` (`^0.18.3`) declared in `dependencies`.

**Interpretation:** Federation runtime present in host, used for remote loading.

### 4. packages/host/package.json:13

**Observation:** `qiankun` (`^2.10.16`) declared in `dependencies`.

**Interpretation:** Qiankun orchestrator present in host.

### 5. packages/host/package.json:19

**Observation:** `@module-federation/rsbuild-plugin` (`^0.18.3`) declared in `devDependencies`.

**Interpretation:** Federation technology present in host build.

### 6. packages/app-mf-1/module-federation.config.ts:1-13

**Observation:** `createModuleFederationConfig` declares `name: 'mf1'`, exposing `.` (`./src/exposed.tsx`), sharing `react` and `react-dom` as singletons, fixing `getPublicPath` at `http://localhost:4001/`.

**Interpretation:** App-mf-1 configured as remote with fixed public path.

### 7. packages/app-mf-1/rsbuild.config.ts:1-25

**Observation:** Applies `pluginModuleFederation(moduleFederationConfig)` with `assetPrefix: 'http://localhost:4001/'`, port 4001.

**Interpretation:** App-mf-1 build uses federation plugin.

### 8. packages/app-mf-2/module-federation.config.ts:1-13

**Observation:** `createModuleFederationConfig` declares `name: 'mf2'`, exposing `.` (`./src/exposed.tsx`), sharing `react` and `react-dom` as singletons, fixing `getPublicPath` at `http://localhost:4002/`.

**Interpretation:** App-mf-2 configured as remote with fixed public path.

### 9. packages/app-mf-2/rsbuild.config.ts:1-25

**Observation:** Applies `pluginModuleFederation(moduleFederationConfig)` with `assetPrefix: 'http://localhost:4002/'`, port 4002.

**Interpretation:** App-mf-2 build uses federation plugin.

### 10. packages/host/module-federation.config.ts:1-16

**Observation:** `createModuleFederationConfig` declares `name: 'host'`, empty `remotes`, with `mf1`/`mf2` commented and comment referring to runtime API. Uses `shareStrategy: 'loaded-first'`, sharing `react` and `react-dom` as singletons.

**Interpretation:** Host configured as federation participant without static remotes.

**Note:** Host configuration does not name active remotes. Hence `moderate` rather than `strong`.

### 11. packages/host/rsbuild.config.ts:1-22

**Observation:** Applies `pluginModuleFederation(moduleFederationConfig)` with port 3000.

**Interpretation:** Host build uses federation plugin.

### 12. packages/app-qiankun-1/rsbuild.config.ts:1-29

**Observation:** Packages application as `umd` library named `qiankun1`, with `assetPrefix: 'http://localhost:3001/'`, port 3001.

**Interpretation:** Sub-app configured to expose lifecycles to orchestrator through library name.

### 13. packages/app-qiankun-2/rsbuild.config.ts:1-29

**Observation:** Packages application as `umd` library named `qiankun2`, with `assetPrefix: 'http://localhost:3002/'`, port 3002.

**Interpretation:** Sub-app configured to expose lifecycles to orchestrator through library name.

### 14. packages/app-mf-1/src/index.tsx:1

**Observation:** `import('./bootstrap')`.

**Interpretation:** Asynchronous bootstrap internal to unit.

### 15. packages/app-mf-2/src/index.tsx:1

**Observation:** `import('./bootstrap')`.

**Interpretation:** Asynchronous bootstrap internal to unit.

### 16. packages/host/src/index.tsx:1

**Observation:** `import('./bootstrap')`.

**Interpretation:** Asynchronous bootstrap internal to host.

### 17. packages/host/src/app-loaders/module-federation.ts:1-4

**Observation:** Imports `registerRemotes` and `loadRemote` from `@module-federation/enhanced/runtime`.

**Interpretation:** Runtime registration/loading mechanism available in host.

### 18. packages/host/src/app-loaders/module-federation.ts:27-32

**Observation:** `registerRemotes` with name/entry from application registry.

**Interpretation:** Host registers registry-specified remote at runtime.

### 19. packages/host/src/app-loaders/module-federation.ts:34-43

**Observation:** `loadRemote` loads remote module, obtaining factory `getRootComponent`.

**Interpretation:** Host loads specified remote component at runtime.

### 20. packages/app-qiankun-1/src/index.tsx:1

**Observation:** Reexports lifecycles from `./lifecycles`.

**Interpretation:** Sub-app offers lifecycles to orchestrator.

### 21. packages/app-qiankun-1/src/lifecycles.tsx:14-16

**Observation:** `bootstrap`, logging only.

**Interpretation:** Part of sub-app lifecycle contract.

### 22. packages/app-qiankun-1/src/lifecycles.tsx:22-39

**Observation:** `mount` creates React root in received container, rendering application with `basepath`.

**Interpretation:** Lifecycle inserting sub-app into host page.

### 23. packages/app-qiankun-1/src/lifecycles.tsx:45-52

**Observation:** `unmount` unmounts React root.

**Interpretation:** Lifecycle removing sub-app from host page.

### 24. packages/app-qiankun-2/src/index.tsx:1

**Observation:** Reexports lifecycles from `./lifecycles`.

**Interpretation:** Sub-app offers lifecycles to orchestrator.

### 25. packages/app-qiankun-2/src/lifecycles.tsx:14-16

**Observation:** `bootstrap`, logging only.

**Interpretation:** Part of sub-app lifecycle contract.

### 26. packages/app-qiankun-2/src/lifecycles.tsx:22-39

**Observation:** `mount` creates React root in received container, rendering application with `basepath`.

**Interpretation:** Lifecycle inserting sub-app into host page.

### 27. packages/app-qiankun-2/src/lifecycles.tsx:45-52

**Observation:** `unmount` unmounts React root.

**Interpretation:** Lifecycle removing sub-app from host page.

### 28. packages/host/src/app-loaders/qiankun.ts:2

**Observation:** Imports `registerMicroApps` and `start` from `qiankun`.

**Interpretation:** Orchestrator available in host.

### 29. packages/host/src/app-loaders/qiankun.ts:10-25

**Observation:** `registerMicroApps` with `entry`, `container` and `activeRule` of each registry qiankun application.

**Interpretation:** Host registers sub-apps with orchestrator, using path activation rule.

### 30. packages/host/src/App.tsx:7-9

**Observation:** `useEffect` in `App` calls qiankun application registration.

**Interpretation:** Registration triggered on host mount.

### 31. packages/host/src/app-loaders/qiankun.ts:26

**Observation:** `start()` after registration.

**Interpretation:** Host starts orchestrator.

### 32. packages/host/src/configs/apps.ts:9-34

**Observation:** `APP_CONFIGS` declares `app-mf-1` (`mf1`) and `app-mf-2` (`mf2`) as "Module Federation", `mf-manifest.json` entry at `localhost:4001` and `4002`. Declares `app-qiankun-1` (`qiankun1`) and `app-qiankun-2` (`qiankun2`) as "Qiankun", `index.html` at `localhost:3001` and `3002`.

**Interpretation:** Host declares four composed units/mechanism of each in one registry.

### 33. packages/host/src/routes/apps.$baseRoute.tsx:12-25

**Observation:** Route `/apps/$baseRoute` loader calls loader `getRemote` for selected application.

**Interpretation:** Remote loading triggered by navigation.

### 34. packages/host/src/routes/apps.$baseRoute.tsx:39-45

**Observation:** `React.lazy` awaits component returned by remote factory.

**Interpretation:** Remote component lazy-loaded.

### 35. packages/host/src/routes/apps.$baseRoute.tsx:52-56

**Observation:** Renders `RootComponent` within `Suspense`.

**Interpretation:** Host renders remote component in own tree.

### 36. .; package.json:1-16; pnpm-workspace.yaml:1-2

**Observation:** Pnpm workspace root (`packages/*`), staged build scripts without UI entry.

**Interpretation:** Monorepo coordination root rather than unit.

### 37. packages/app-mf-1; packages/app-mf-1/package.json:1-12; packages/app-mf-1/src/index.tsx:1; packages/app-mf-1/src/bootstrap.tsx:6-15; packages/app-mf-1/rsbuild.config.ts:7-17

**Observation:** Own manifest, entry and Rsbuild build.

**Interpretation:** Frontend unit with own boundary.

### 38. packages/app-mf-2; packages/app-mf-2/package.json:1-12; packages/app-mf-2/src/index.tsx:1; packages/app-mf-2/src/bootstrap.tsx:6-15; packages/app-mf-2/rsbuild.config.ts:7-17

**Observation:** Own manifest, entry and Rsbuild build.

**Interpretation:** Frontend unit with own boundary.

### 39. packages/app-qiankun-1; packages/app-qiankun-1/package.json:1-12; packages/app-qiankun-1/src/index.tsx:1; packages/app-qiankun-1/src/lifecycles.tsx:22-38; packages/app-qiankun-1/rsbuild.config.ts:5-16

**Observation:** Own manifest, lifecycle-exporting entry and Rsbuild build.

**Interpretation:** Frontend unit with own boundary, started through `mount`.

### 40. packages/app-qiankun-2; packages/app-qiankun-2/package.json:1-12; packages/app-qiankun-2/src/index.tsx:1; packages/app-qiankun-2/src/lifecycles.tsx:22-38; packages/app-qiankun-2/rsbuild.config.ts:5-16

**Observation:** Own manifest, lifecycle-exporting entry and Rsbuild build.

**Interpretation:** Frontend unit with own boundary, started through `mount`.

### 41. packages/host; packages/host/package.json:1-12; packages/host/src/index.tsx:1; packages/host/src/bootstrap.tsx:5-12; packages/host/rsbuild.config.ts:7-17

**Observation:** Own manifest, entry and Rsbuild build.

**Interpretation:** Frontend unit with own boundary.

### 42. packages/lib-app-interface; packages/lib-app-interface/package.json:1-19; packages/lib-app-interface/rslib.config.ts:4-16

**Observation:** Contract/type library built with Rslib, without application entry.

**Interpretation:** Shared library rather than frontend unit.

### 43. packages/host/src/configs/apps.ts:10-15; packages/host/src/app-loaders/module-federation.ts:27-43; packages/host/src/routes/apps.$baseRoute.tsx:24, 52-56; packages/app-mf-1/module-federation.config.ts:4-7

**Observation:** Host registers `mf1` with entry `http://localhost:4001/mf-manifest.json`, loading exposed factory/rendering component. Name matches app-mf-1 configuration.

**Interpretation:** Active host → remote relationship.

### 44. packages/host/src/configs/apps.ts:16-21; packages/host/src/app-loaders/module-federation.ts:27-43; packages/host/src/routes/apps.$baseRoute.tsx:24, 52-56; packages/app-mf-2/module-federation.config.ts:4-7

**Observation:** Same flow for `mf2`, entry at `localhost:4002`.

**Interpretation:** Active host → remote relationship.

### 45. packages/host/src/configs/apps.ts:22-27; packages/host/src/app-loaders/qiankun.ts:12-26; packages/app-qiankun-1/rsbuild.config.ts:13-15; packages/app-qiankun-1/src/lifecycles.tsx:14-52

**Observation:** Host registers `app-qiankun-1` in qiankun with entry `http://localhost:3001/index.html` and `activeRule` `/apps/app-qiankun-1`. Name `qiankun1` matches sub-app UMD library.

**Interpretation:** Active root-config → application relationship.

### 46. packages/host/src/configs/apps.ts:28-33; packages/host/src/app-loaders/qiankun.ts:12-26; packages/app-qiankun-2/rsbuild.config.ts:13-15; packages/app-qiankun-2/src/lifecycles.tsx:14-52

**Observation:** Same flow for `app-qiankun-2`, entry at `localhost:3002`.

**Interpretation:** Active root-config → application relationship.

### 47. packages/app-mf-1/rsbuild.config.ts:7-25; packages/app-mf-1/package.json:7; package.json:11

**Observation:** Own `rsbuild build`, triggered with other remotes through `build:apps`. `assetPrefix` fixed at `localhost:4001`, no deployment artifact.

**Interpretation:** Own build boundary tied to `localhost`, without observed deployment.

### 48. packages/app-mf-2/rsbuild.config.ts:7-25; packages/app-mf-2/package.json:7; package.json:11

**Observation:** Own `rsbuild build`, `assetPrefix` fixed at `localhost:4002`, no deployment artifact.

**Interpretation:** Own build boundary tied to `localhost`, without observed deployment.

### 49. packages/app-qiankun-1/rsbuild.config.ts:5-29; packages/app-qiankun-1/package.json:7; package.json:11

**Observation:** Own `rsbuild build` generating UMD library `qiankun1`, `assetPrefix` fixed at `localhost:3001`. No deployment artifact.

**Interpretation:** Own build boundary tied to `localhost`, without observed deployment.

### 50. packages/app-qiankun-2/rsbuild.config.ts:5-29; packages/app-qiankun-2/package.json:7; package.json:11

**Observation:** Own `rsbuild build` generating UMD library `qiankun2`, `assetPrefix` fixed at `localhost:3002`. No deployment artifact.

**Interpretation:** Own build boundary tied to `localhost`, without observed deployment.

### 51. packages/host/rsbuild.config.ts:7-22; packages/host/package.json:7; package.json:14

**Observation:** Own `rsbuild build`, separate root script running after remotes. No deployment artifact.

**Interpretation:** Own build boundary without observed deployment.

### 52. README.md:1

**Observation:** "micro-frontend workspace".

**Interpretation:** Presents repository as micro-frontend workspace. Claim corroborated.

### 53. package.json:4

**Observation:** "a micro-frontend workspace architected by qiankun and module federation".

**Interpretation:** Claims workspace combines qiankun/Module Federation. Claim corroborated.

### 54. packages/host/module-federation.config.ts:6-7

**Observation:** "we use the runtime API to load our remotes / see `src/app-loaders/module-federation.ts`".

**Interpretation:** Claims runtime API remote loading. Claim corroborated.

### 55. packages/host/module-federation.config.ts:5-10 (resolved by the snapshot)

**Observation:** Host static `remotes` commented; file itself explains runtime API remote loading.

**Interpretation:** Commented entries are no abandoned-stage remnant. Snapshot resolves point.

## Classification

| # | Origin | Dimension | Type | Approach | Evidence | Strength | Relationships |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.2 (packages/app-mf-1/package.json:17) | 1 technology | manifest | module-federation | technological | weak | declares #6; declares #7 |
| 2 | 3.4.2 (packages/app-mf-2/package.json:17) | 1 technology | manifest | module-federation | technological | weak | declares #8; declares #9 |
| 3 | 3.4.2 (packages/host/package.json:11) | 1 technology | manifest | module-federation | technological | weak | declares #17; declares #18; declares #19 |
| 4 | 3.4.2 (packages/host/package.json:13) | 1 technology | manifest | qiankun | technological | weak | declares #28; declares #29; declares #31 |
| 5 | 3.4.2 (packages/host/package.json:19) | 1 technology | manifest | module-federation | technological | weak | declares #10; declares #11 |
| 6 | 3.4.2 (packages/app-mf-1/package.json:17, Evidence); 3.4.3 (packages/app-mf-1, Markers); 3.4.5 #1 (Configuration) | 2 configuration | configuration | module-federation | technological | moderate | configures #37; configures #43 |
| 7 | 3.4.2 (packages/app-mf-1/package.json:17, Evidence); 3.4.3 (packages/app-mf-1, Markers and Build); 3.4.5 #1 (Configuration); 3.4.6 #1 (Artifacts) | 2 configuration | configuration | module-federation | technological | moderate | configures #37; configures #43 |
| 8 | 3.4.2 (packages/app-mf-2/package.json:17, Evidence); 3.4.3 (packages/app-mf-2, Markers); 3.4.5 #2 (Configuration) | 2 configuration | configuration | module-federation | technological | moderate | configures #38; configures #44 |
| 9 | 3.4.2 (packages/app-mf-2/package.json:17, Evidence); 3.4.3 (packages/app-mf-2, Markers and Build); 3.4.5 #2 (Configuration); 3.4.6 #2 (Artifacts) | 2 configuration | configuration | module-federation | technological | moderate | configures #38; configures #44 |
| 10 | 3.4.2 (packages/host/package.json:19, Evidence); 3.4.3 (packages/host, Markers); 3.4.7 #3 (Evidence) | 2 configuration | configuration | module-federation | technological | moderate | configures #41 |
| 11 | 3.4.2 (packages/host/package.json:19, Evidence); 3.4.3 (packages/host, Markers and Build); 3.4.6 #5 (Artifacts) | 2 configuration | configuration | module-federation | technological | moderate | configures #41 |
| 12 | 3.4.3 (packages/app-qiankun-1, Markers and Build); 3.4.5 #3 (Configuration); 3.4.6 #3 (Artifacts) | 2 configuration | configuration | qiankun | technological | moderate | configures #39; configures #45 |
| 13 | 3.4.3 (packages/app-qiankun-2, Markers and Build); 3.4.5 #4 (Configuration); 3.4.6 #4 (Artifacts) | 2 configuration | configuration | qiankun | technological | moderate | configures #40; configures #46 |
| 14 | 3.4.4 (packages/app-mf-1/src/index.tsx:1) | 3 code | source code | — | technological | weak | — |
| 15 | 3.4.4 (packages/app-mf-2/src/index.tsx:1) | 3 code | source code | — | technological | weak | — |
| 16 | 3.4.4 (packages/host/src/index.tsx:1) | 3 code | source code | — | technological | weak | — |
| 17 | 3.4.4 (packages/host/src/app-loaders/module-federation.ts:3) | 3 code | source code | module-federation | technological | moderate | implements #43; implements #44 |
| 18 | 3.4.4 (packages/host/src/app-loaders/module-federation.ts:27) | 3 code | source code | module-federation | technological | moderate | implements #43; implements #44 |
| 19 | 3.4.4 (packages/host/src/app-loaders/module-federation.ts:34) | 3 code | source code | module-federation | technological | moderate | implements #43; implements #44 |
| 20 | 3.4.4 (packages/app-qiankun-1/src/index.tsx:1) | 3 code | source code | qiankun | technological | moderate | implements #45 |
| 21 | 3.4.4 (packages/app-qiankun-1/src/lifecycles.tsx:14) | 3 code | source code | qiankun | technological | moderate | implements #45 |
| 22 | 3.4.4 (packages/app-qiankun-1/src/lifecycles.tsx:22) | 3 code | source code | qiankun | technological | moderate | implements #45 |
| 23 | 3.4.4 (packages/app-qiankun-1/src/lifecycles.tsx:45) | 3 code | source code | qiankun | technological | moderate | implements #45 |
| 24 | 3.4.4 (packages/app-qiankun-2/src/index.tsx:1) | 3 code | source code | qiankun | technological | moderate | implements #46 |
| 25 | 3.4.4 (packages/app-qiankun-2/src/lifecycles.tsx:14) | 3 code | source code | qiankun | technological | moderate | implements #46 |
| 26 | 3.4.4 (packages/app-qiankun-2/src/lifecycles.tsx:22) | 3 code | source code | qiankun | technological | moderate | implements #46 |
| 27 | 3.4.4 (packages/app-qiankun-2/src/lifecycles.tsx:45) | 3 code | source code | qiankun | technological | moderate | implements #46 |
| 28 | 3.4.4 (packages/host/src/app-loaders/qiankun.ts:2) | 3 code | source code | qiankun | technological | moderate | implements #45; implements #46 |
| 29 | 3.4.4 (packages/host/src/app-loaders/qiankun.ts:25) | 3 code | source code | qiankun | technological | moderate | implements #45; implements #46 |
| 30 | 3.4.4 (packages/host/src/App.tsx:8) | 3 code | source code | qiankun | technological | moderate | implements #45; implements #46 |
| 31 | 3.4.4 (packages/host/src/app-loaders/qiankun.ts:26) | 3 code | source code | qiankun | technological | moderate | implements #45; implements #46 |
| 32 | 3.4.4 (packages/host/src/configs/apps.ts:9) | 3 code | source code | module-federation; qiankun | architectural | strong | implements #43; implements #44; implements #45; implements #46 |
| 33 | 3.4.4 (packages/host/src/routes/apps.$baseRoute.tsx:24) | 3 code | source code | module-federation | technological | moderate | implements #43; implements #44 |
| 34 | 3.4.4 (packages/host/src/routes/apps.$baseRoute.tsx:43) | 3 code | source code | module-federation | technological | moderate | implements #43; implements #44 |
| 35 | 3.4.4 (packages/host/src/routes/apps.$baseRoute.tsx:54) | 3 code | source code | module-federation | technological | moderate | implements #43; implements #44 |
| 36 | 3.4.3 (.) | 4 structure | directory | — | context | weak | — |
| 37 | 3.4.3 (packages/app-mf-1) | 4 structure | directory | — | architectural | moderate | — |
| 38 | 3.4.3 (packages/app-mf-2) | 4 structure | directory | — | architectural | moderate | — |
| 39 | 3.4.3 (packages/app-qiankun-1) | 4 structure | directory | — | architectural | moderate | — |
| 40 | 3.4.3 (packages/app-qiankun-2) | 4 structure | directory | — | architectural | moderate | — |
| 41 | 3.4.3 (packages/host) | 4 structure | directory | — | architectural | moderate | — |
| 42 | 3.4.3 (packages/lib-app-interface) | 4 structure | directory | — | context | weak | — |
| 43 | 3.4.5 #1 | 5 composition | source code | module-federation | architectural | strong | links #41; links #37 |
| 44 | 3.4.5 #2 | 5 composition | source code | module-federation | architectural | strong | links #41; links #38 |
| 45 | 3.4.5 #3 | 5 composition | source code | qiankun | architectural | strong | links #41; links #39 |
| 46 | 3.4.5 #4 | 5 composition | source code | qiankun | architectural | strong | links #41; links #40 |
| 47 | 3.4.6 #1 | 6 build-deploy | configuration | — | architectural | moderate | publishes #37 |
| 48 | 3.4.6 #2 | 6 build-deploy | configuration | — | architectural | moderate | publishes #38 |
| 49 | 3.4.6 #3 | 6 build-deploy | configuration | — | architectural | moderate | publishes #39 |
| 50 | 3.4.6 #4 | 6 build-deploy | configuration | — | architectural | moderate | publishes #40 |
| 51 | 3.4.6 #5 | 6 build-deploy | configuration | — | architectural | moderate | publishes #41 |
| 52 | 3.4.7 #1 | 7 documentation | documentation | — | architectural | weak | corroborates #37; corroborates #38; corroborates #39; corroborates #40; corroborates #41 |
| 53 | 3.4.7 #2 | 7 documentation | comment | module-federation; qiankun | architectural | weak | corroborates #4; corroborates #5; corroborates #43; corroborates #44; corroborates #45; corroborates #46 |
| 54 | 3.4.7 #3 | 7 documentation | comment | module-federation | architectural | weak | corroborates #10; corroborates #18; corroborates #19 |
| 55 | 3.4.8 #1 | 8 history | history | module-federation | technological | weak | explains #10; explains #54 |

## Summary

Observations: 55. Dimensions (technology: 5, configuration: 8, code: 22, structure: 7, composition: 4, build-deploy: 5, documentation: 3, history: 1). Strength (strong: 5, moderate: 36, weak: 14, ambiguous: 0). Evidence (technological: 35, architectural: 18, context: 2).

