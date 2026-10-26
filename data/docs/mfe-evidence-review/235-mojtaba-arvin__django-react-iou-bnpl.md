---
schema: 1
id: 989410278
full_name: mojtaba-arvin/django-react-iou-bnpl
commit: bf4da7610d2a1343b2f97eab1dfeb6b026e50e19
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

# 235 — mojtaba-arvin/django-react-iou-bnpl

## Repository overview

Frontend combines three units in pnpm workspace: customer-app, merchant-app and shell (#13, #14, #16). Architecture chain uses native webpack Module Federation: shell declares two remotes (#6), each remote exposes factory `createAdminAppConfig` (#2, #3), adapters load it by name at runtime (#7, #8), and shell renders received configurations in common `AdminApp` under both area routes (#9–#11). Two host → remote relationships active with targets present in snapshot (#17, #18). Remotes supply configurations with area components; shell responsible for React mounting.

Per-application build boundaries (#19–#21); remotes also have standalone entries (#13, #14). Root coordinates packages, providing common Docker development environment (#12). Library `shared` is workspace shared code rather than another application (#15). No deployment observed: isolated deployment claim uncorroborated (#25), despite separate builds.

Misleading signal is dependency `@module-federation/typescript` (#1). Declared in tsconfig files (#4, #5), but build effect remains undetermined; plugins in three configurations come from webpack. Description attributing plugin to package contradicted (#30); history shows combination since file introduction (#32). Localized uncertainty does not make observed composition ambiguous. Other documentary claims corroborate organization, loading and development modes (#22–#24, #26–#29, #31), with recorded qualifications on standalone commands and asynchronous loading handling.

## Observations

### 1. frontend/package.json:40

**Observation:** Workspace manifest declares `@module-federation/typescript: ^3.1.3` in `devDependencies`.

**Interpretation:** Federation technological signal whose actual usage remains `Undetermined` in 3.4.2: tsconfig entry may integrate tool or be inoperative. Uncertainty does not extend to native webpack plugin recorded in configurations.

### 2. frontend/customer-app/webpack.config.js:3; frontend/customer-app/webpack.config.js:8; frontend/customer-app/webpack.config.js:80-116

**Observation:** Configuration obtains `ModuleFederationPlugin` from `webpack.container`. In remote mode declares `name: "customer_app"`, `filename: "remoteEntry.js"`, exposing `./createAdminAppConfig` through service `./src/application/services/create-admin-app-config.service.ts`. Shares React, React DOM, React Router, react-admin and React Query as singletons; standalone mode chooses another branch.

**Interpretation:** Configures unit federation mechanism and offered contract. Block names no consuming unit.

### 3. frontend/merchant-app/webpack.config.js:3; frontend/merchant-app/webpack.config.js:8; frontend/merchant-app/webpack.config.js:80-116

**Observation:** Configuration obtains `ModuleFederationPlugin` from `webpack.container`. In remote mode declares `name: "merchant_app"`, `filename: "remoteEntry.js"`, exposing `./createAdminAppConfig` through service `./src/application/services/create-admin-app-config.service.ts`. Shares React, React DOM, React Router, react-admin and React Query as singletons; standalone mode chooses another branch.

**Interpretation:** Configures unit federation mechanism and offered contract. Block names no consuming unit.

### 4. frontend/shell/tsconfig.build.json:17-24

**Observation:** `compilerOptions.plugins` contains `name: "@module-federation/typescript"` with `configPath: "./webpack.config.js"` in `tsconfig.build.json`.

**Interpretation:** Configuration declaration of federation-associated typing tool in shell. Declaration does not prove execution: 3.4.2 retains build effect undetermined. Declares no remotes or inter-unit link.

### 5. frontend/shell/tsconfig.json:25-32

**Observation:** `compilerOptions.plugins` contains `name: "@module-federation/typescript"` with `configPath: "./webpack.config.js"` in `tsconfig.json`.

**Interpretation:** Configuration declaration of federation-associated typing tool in shell. Declaration does not prove execution: 3.4.2 retains build effect undetermined. Declares no remotes or inter-unit link.

### 6. frontend/shell/webpack.config.js:3; frontend/shell/webpack.config.js:59-94

**Observation:** Native webpack `ModuleFederationPlugin` declares `name: "shell"`, remotes `customer_app@http://localhost:3001/remoteEntry.js` and `merchant_app@http://localhost:3002/remoteEntry.js` and five singleton dependencies (React, React DOM, React Router, react-admin and React Query).

**Interpretation:** Configuration explicitly links host to two remotes, supplying resolution addresses.

### 7. frontend/shell/src/infrastructure/shell/remote-modules/customer-app.adapter.ts:7-14

**Observation:** Adapter executes `await import('customer_app/createAdminAppConfig')`, calling received factory with `onBack` and `basename: settings.customerBasePath`.

**Interpretation:** Shell loads module naming target remote unit at runtime, obtaining screen configuration. Back callback redirects window; not messaging channel.

### 8. frontend/shell/src/infrastructure/shell/remote-modules/merchant-app.adapter.ts:7-14

**Observation:** Adapter executes `await import('merchant_app/createAdminAppConfig')`, calling received factory with `onBack` and `basename: settings.merchantBasePath`.

**Interpretation:** Shell loads module naming target remote unit at runtime, obtaining screen configuration. Back callback redirects window; not messaging channel.

### 9. frontend/shell/src/infrastructure/shell/shell-app.bootstrap.tsx:34-66; frontend/shell/src/infrastructure/shell/shell-app.bootstrap.tsx:81-88

**Observation:** Entry renders `App`; on mounting requests customer/merchant configurations and, after both received, declares home page and routes `${customerBasePath}/*` and `${merchantBasePath}/*`, each with own `AdminApp`.

**Interpretation:** Route table associates paths with areas loaded from two remotes, organizing shell composition.

### 10. frontend/shell/src/infrastructure/shell/shell-app.bootstrap.tsx:35; frontend/shell/src/infrastructure/shell/shell-app.bootstrap.tsx:50-54; frontend/customer-app/src/application/services/create-admin-app-config.service.ts:7-25

**Observation:** `<AdminApp {...customerAdminProps} />` receives props loaded by `loadCustomerConfig`, inside `ErrorBoundary` and `Suspense`. Remote factory includes `InstallmentList`, `PlanList` and `PlanShow`.

**Interpretation:** Rendering remote area configuration in common component `AdminApp`. Rendering call uses received props; remote identity and federated resolution appear in adapters/configurations.

### 11. frontend/shell/src/infrastructure/shell/shell-app.bootstrap.tsx:36; frontend/shell/src/infrastructure/shell/shell-app.bootstrap.tsx:60-64; frontend/merchant-app/src/application/services/create-admin-app-config.service.ts:8-23

**Observation:** `<AdminApp {...merchantAdminProps} />` receives props loaded by `loadMerchantConfig`, inside `ErrorBoundary` and `Suspense`. Remote factory includes `Dashboard`, `PlanList`, `PlanShow` and `PlanCreate`.

**Interpretation:** Rendering remote area configuration in common component `AdminApp`. Rendering call uses received props; remote identity and federated resolution appear in adapters/configurations.

### 12. frontend; frontend/package.json:5-14; frontend/Dockerfile.dev:3-52; docker-compose.dev.yml:149-174

**Observation:** Workspace root lists four packages, delegating builds to them. Development image ends in `sh`; compose mounts `./frontend` as volume and exposes three ports. No own application entry at root.

**Interpretation:** Workspace coordination/common development environment without constituting fourth frontend application.

### 13. frontend/customer-app; frontend/customer-app/package.json:1-9; frontend/customer-app/webpack.config.js:14-29; frontend/customer-app/webpack.config.js:74-116; frontend/customer-app/src/infrastructure/standalone/standalone-app.bootstrap.tsx:4-8

**Observation:** Package `@bnpl/customer-app` has own manifest, scripts and webpack configuration. Standalone mode selects entry calling `renderStandaloneApp` with own HTML; remote mode selects remote entry and exposes configuration factory.

**Interpretation:** Directory delimits frontend unit with own standalone UI entry/build, also available as remote.

### 14. frontend/merchant-app; frontend/merchant-app/package.json:1-9; frontend/merchant-app/webpack.config.js:14-29; frontend/merchant-app/webpack.config.js:74-116; frontend/merchant-app/src/infrastructure/standalone/standalone-app.bootstrap.tsx:4-8

**Observation:** Package `@bnpl/merchant-app` has own manifest, scripts and webpack configuration. Standalone mode selects entry calling `renderStandaloneApp` with own HTML; remote mode selects remote entry and exposes configuration factory.

**Interpretation:** Directory delimits frontend unit with own standalone UI entry/build, also available as remote.

### 15. frontend/shared; frontend/shared/package.json:1-9

**Observation:** Package `@bnpl/shared` points `main` and `types` to `src/index.ts`, compiling through `tsc -p tsconfig.build.json`, without application entry.

**Interpretation:** Workspace library without constituting another frontend unit.

### 16. frontend/shell; frontend/shell/package.json:1-7; frontend/shell/webpack.config.js:7; frontend/shell/webpack.config.js:59-98; frontend/shell/src/infrastructure/shell/shell-app.bootstrap.tsx:81-88

**Observation:** Package `shell` has own scripts/webpack configuration, entry creating React root and HTML template. Configuration declares two remotes.

**Interpretation:** Directory delimits frontend unit in host role.

### 17. frontend/shell/src/infrastructure/shell/remote-modules/customer-app.adapter.ts:10-14; frontend/shell/src/infrastructure/shell/shell-app.bootstrap.tsx:34-66; frontend/shell/webpack.config.js:62; frontend/customer-app/webpack.config.js:81-88

**Observation:** Shell imports `customer_app/createAdminAppConfig`, name resolved through host webpack remote URL and `name` and `exposes` in webpack of `frontend/customer-app`. Returned props rendered at route `${customerBasePath}/*`.

**Interpretation:** Active host → remote Module Federation relationship with source/target present in snapshot. Remote supplies screens through configuration factory; shell performs mounting.

### 18. frontend/shell/src/infrastructure/shell/remote-modules/merchant-app.adapter.ts:10-14; frontend/shell/src/infrastructure/shell/shell-app.bootstrap.tsx:34-66; frontend/shell/webpack.config.js:63; frontend/merchant-app/webpack.config.js:81-88

**Observation:** Shell imports `merchant_app/createAdminAppConfig`, name resolved through host webpack remote URL and `name` and `exposes` in webpack of `frontend/merchant-app`. Returned props rendered at route `${merchantBasePath}/*`.

**Interpretation:** Active host → remote Module Federation relationship with source/target present in snapshot. Remote supplies screens through configuration factory; shell performs mounting.

### 19. frontend/customer-app/package.json:3-9; frontend/customer-app/webpack.config.js:24-29; frontend/customer-app/webpack.config.js:81-88; frontend/package.json:14; frontend/Dockerfile.dev:15-52; docker-compose.dev.yml:149-174

**Observation:** Package script executes webpack in remote mode, with output in own `dist` and own `remoteEntry.js`. Root build triggers package builds; application served in development at port 3001. Dockerfile only prepares environment; compose mounts sources, running `sh`. Package private; version `0.1.0` absent from publication.

**Interpretation:** Per-application separate build, but deployment not observed and no independent versioning demonstrated. Common development image does not publish artifact.

### 20. frontend/merchant-app/package.json:3-9; frontend/merchant-app/webpack.config.js:24-29; frontend/merchant-app/webpack.config.js:81-88; frontend/package.json:14; frontend/Dockerfile.dev:15-52; docker-compose.dev.yml:149-174

**Observation:** Package script executes webpack in remote mode, with output in own `dist` and own `remoteEntry.js`. Root build triggers package builds; application served in development at port 3002. Dockerfile only prepares environment; compose mounts sources, running `sh`. Package private; version `0.1.0` absent from publication.

**Interpretation:** Per-application separate build, but deployment not observed and no independent versioning demonstrated. Common development image does not publish artifact.

### 21. frontend/shell/package.json:3-9; frontend/shell/webpack.config.js:7-8; frontend/shell/webpack.config.js:29-32; frontend/shell/webpack.config.js:59-98; frontend/package.json:14; frontend/Dockerfile.dev:15-52; docker-compose.dev.yml:149-174

**Observation:** Shell script executes own webpack configuration, with own entry/output without overriding `output.path` (default package `dist`). Root build triggers package builds; application served in development at port 3000. Dockerfile only prepares environment; compose mounts sources, running `sh`. Package private; version `0.1.0` absent from publication.

**Interpretation:** Per-application separate build, but deployment not observed and no independent versioning demonstrated. Common development image does not publish artifact.

### 22. README.md:10

**Observation:** README describes Django and React system with TypeScript using microfrontend architecture.

**Interpretation:** Architectural claim corroborated by three units and two federated relationships. Django backend system context outside frontend composition.

### 23. README.md:12

**Observation:** README claims separate react-admin dashboards under `customer/*` and `merchant/*`.

**Interpretation:** Two-area separation corroborated by routes and configurations received from remotes.

### 24. README.md:42

**Observation:** README names Module Federation, runtime loading of independent React applications and parallel development.

**Interpretation:** Claim corroborated by federated imports and entry/build boundaries of three units. Technical independence coexists with common workspace library; phrase demonstrates no distinct teams.

### 25. README.md:42

**Observation:** README claims architecture permits isolated deployments.

**Interpretation:** Section 3.4.7 records claim uncorroborated. Separate builds do not demonstrate deployment: 3.4.6 records deployment not observed for three applications.

### 26. README.md:245-261

**Observation:** README presents commands/addresses for standalone development of two remotes. Customer/merchant filters swapped in commands.

**Interpretation:** Standalone capability corroborated by remote entries/scripts; swapped filters instruction error already recorded in 3.4.7.

### 27. README.md:360-369

**Observation:** Frontend tree labels `shell` host, `customer-app` and `merchant-app` remotes, and `shared` common modules/utilities.

**Interpretation:** Described organization matches three units and active relationships; shared library does not increase unit count.

### 28. README.md:397

**Observation:** Technology table describes monorepo managed through pnpm workspaces.

**Interpretation:** Package organization claim corroborated by four-package workspace list. Organization alone insufficient to show composition.

### 29. frontend/customer-app/webpack.config.js:13

**Observation:** Comment says only standalone entry should use `root.render`; shell should render in remote mode.

**Interpretation:** Responsibility division corroborated by remote entry selection/factory exposure, `AdminApp` rendering and React root created in shell.

### 30. frontend/package.json:70

**Observation:** Field `dependenciesDocumentation` associates `@module-federation/typescript` with need for `ModuleFederationPlugin` to provide/consume modules at runtime.

**Interpretation:** Plugin attribution to package contradicted by three configurations obtaining it from `webpack.container`. Claim does not establish effect of package tsconfig entry.

### 31. frontend/shell/src/infrastructure/shell/shell-app.bootstrap.tsx:21-24

**Observation:** Comment says shell loads customer/merchant AdminApp configurations, wraps rendering in ErrorBoundary/Suspense and mounts under routes.

**Interpretation:** Described loading/mounting corroborated by code/relationships. Initial promises have no `catch`; rendering wrappers do not demonstrate protection against loading failure.

### 32. 4407d40 2025-06-14 (frontend/package.json); 9b20b3c 2025-06-14 (frontend/shell/tsconfig.build.json, frontend/shell/tsconfig.json, frontend/shell/webpack.config.js); dba76f7 2025-06-14 (frontend/customer-app/webpack.config.js); 785cc27 2025-06-14 (frontend/merchant-app/webpack.config.js)

**Observation:** Section 3.4.8 records manifest, shell tsconfigs and webpack.config.js files retain same objects as introduction commits. Package declaration, description and tsconfig entries already coexisted with configurations obtaining plugin from webpack.

**Interpretation:** Point clarified regarding evolution: no later replacement in these files of package-invoking integration by native plugin. History explains neither tsconfig entry effect nor incorrect description; preserves `Undetermined` dependency and contradicted claim.

## Classification

| # | Origin | Dimension | Type | Approach | Evidence | Strength | Relationships |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.2 (frontend/package.json:40) | 1 technology | manifest | module-federation | technological | ambiguous | declares #4; declares #5 |
| 2 | 3.4.2 (frontend/package.json:40, Evidence); 3.4.3 (frontend/customer-app, Markers, Entry, Build); 3.4.4 (frontend/shell/src/infrastructure/shell/remote-modules/customer-app.adapter.ts:10, Observation); 3.4.5 #1 (Configuration); 3.4.6 #1 (Artifacts); 3.4.7 #5, #8, #9 (Evidence) | 2 configuration | configuration | module-federation | technological | moderate | configures #13; configures #17 |
| 3 | 3.4.2 (frontend/package.json:40, Evidence); 3.4.3 (frontend/merchant-app, Markers, Entry, Build); 3.4.4 (frontend/shell/src/infrastructure/shell/remote-modules/merchant-app.adapter.ts:10, Observation); 3.4.5 #2 (Configuration); 3.4.6 #2 (Artifacts); 3.4.7 #9 (Evidence) | 2 configuration | configuration | module-federation | technological | moderate | configures #14; configures #18 |
| 4 | 3.4.2 (frontend/package.json:40, Evidence) | 2 configuration | configuration | module-federation | technological | moderate | configures #16 |
| 5 | 3.4.2 (frontend/package.json:40, Evidence) | 2 configuration | configuration | module-federation | technological | moderate | configures #16 |
| 6 | 3.4.2 (frontend/package.json:40, Evidence); 3.4.3 (frontend/shell, Markers, Build); 3.4.4 (frontend/shell/src/infrastructure/shell/remote-modules/customer-app.adapter.ts:10, Observation); 3.4.4 (frontend/shell/src/infrastructure/shell/remote-modules/merchant-app.adapter.ts:10, Observation); 3.4.5 #1, #2 (Configuration); 3.4.6 #1, #2 (Where served), #3 (Artifacts); 3.4.7 #1, #3, #9 (Evidence) | 2 configuration | configuration | module-federation | architectural | strong | configures #7; configures #8; configures #17; configures #18 |
| 7 | 3.4.4 (frontend/shell/src/infrastructure/shell/remote-modules/customer-app.adapter.ts:10) | 3 code | source code | module-federation | architectural | strong | implements #17 |
| 8 | 3.4.4 (frontend/shell/src/infrastructure/shell/remote-modules/merchant-app.adapter.ts:10) | 3 code | source code | module-federation | architectural | strong | implements #18 |
| 9 | 3.4.4 (frontend/shell/src/infrastructure/shell/shell-app.bootstrap.tsx:45) | 3 code | source code | module-federation | architectural | strong | implements #17; implements #18 |
| 10 | 3.4.4 (frontend/shell/src/infrastructure/shell/shell-app.bootstrap.tsx:52) | 3 code | source code | module-federation | architectural | moderate | implements #17 |
| 11 | 3.4.4 (frontend/shell/src/infrastructure/shell/shell-app.bootstrap.tsx:62) | 3 code | source code | module-federation | architectural | moderate | implements #18 |
| 12 | 3.4.3 (frontend) | 4 structure | directory | — | context | weak | — |
| 13 | 3.4.3 (frontend/customer-app) | 4 structure | directory | — | architectural | moderate | — |
| 14 | 3.4.3 (frontend/merchant-app) | 4 structure | directory | — | architectural | moderate | — |
| 15 | 3.4.3 (frontend/shared) | 4 structure | directory | — | context | weak | — |
| 16 | 3.4.3 (frontend/shell) | 4 structure | directory | — | architectural | moderate | — |
| 17 | 3.4.5 #1 | 5 composition | source code | module-federation | architectural | strong | links #16; links #13 |
| 18 | 3.4.5 #2 | 5 composition | source code | module-federation | architectural | strong | links #16; links #14 |
| 19 | 3.4.6 #1 | 6 build-deploy | configuration | module-federation | architectural | moderate | publishes #13 |
| 20 | 3.4.6 #2 | 6 build-deploy | configuration | module-federation | architectural | moderate | publishes #14 |
| 21 | 3.4.6 #3 | 6 build-deploy | configuration | module-federation | architectural | moderate | publishes #16 |
| 22 | 3.4.7 #1 | 7 documentation | documentation | — | architectural | weak | corroborates #13; corroborates #14; corroborates #16; corroborates #17; corroborates #18 |
| 23 | 3.4.7 #2 | 7 documentation | documentation | — | architectural | weak | corroborates #9; corroborates #10; corroborates #11; corroborates #17; corroborates #18 |
| 24 | 3.4.7 #3 | 7 documentation | documentation | module-federation | architectural | weak | corroborates #6; corroborates #7; corroborates #8; corroborates #13; corroborates #14; corroborates #16; corroborates #17; corroborates #18 |
| 25 | 3.4.7 #4 | 7 documentation | documentation | — | architectural | weak | — |
| 26 | 3.4.7 #5 | 7 documentation | documentation | — | architectural | weak | corroborates #13; corroborates #14 |
| 27 | 3.4.7 #6 | 7 documentation | documentation | — | architectural | weak | corroborates #13; corroborates #14; corroborates #15; corroborates #16; corroborates #17; corroborates #18 |
| 28 | 3.4.7 #7 | 7 documentation | documentation | — | architectural | weak | corroborates frontend/pnpm-workspace.yaml:1-5 |
| 29 | 3.4.7 #8 | 7 documentation | comment | — | architectural | weak | corroborates #2; corroborates #10; corroborates #11; corroborates frontend/shell/src/infrastructure/shell/shell-app.bootstrap.tsx:81-82 |
| 30 | 3.4.7 #9 | 7 documentation | comment | module-federation | technological | weak | contradicts #2; contradicts #3; contradicts #6 |
| 31 | 3.4.7 #10 | 7 documentation | comment | — | architectural | weak | corroborates #7; corroborates #8; corroborates #9; corroborates #10; corroborates #11; corroborates #17; corroborates #18 |
| 32 | 3.4.8 #1 | 8 history | history | module-federation | technological | weak | explains #1; explains #2; explains #3; explains #4; explains #5; explains #6; explains #30 |

## Summary

Observations: 32. Dimensions (technology: 1, configuration: 5, code: 5, structure: 5, composition: 2, build-deploy: 3, documentation: 10, history: 1). Strength (strong: 6, moderate: 12, weak: 13, ambiguous: 1). Evidence (technological: 7, architectural: 23, context: 2).

