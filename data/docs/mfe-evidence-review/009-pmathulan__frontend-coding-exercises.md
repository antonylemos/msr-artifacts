---
schema: 1
id: 979173938
full_name: pmathulan/frontend-coding-exercises
commit: 89a3c271484ece4e37f719db9093c9157721a240
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

# 009 — pmathulan/frontend-coding-exercises

## Repository overview

Repository is exercise collection; only `microfrontend-workspace` implements micro-frontends. Its Module Federation chain is short:
- **Dependency:** `@angular-architects/module-federation` (#1).
- **Configuration:** shell declares remote `mfe1` (#2), mfe1 declares itself/exposes `./Component` (#3). Both configurations share dependencies as singletons.
- **Code:** shell route loads mfe1 component through `remoteEntry.js` URL (#7, #10).
- **Host → remote relationship:** active shell → mfe1 relationship results (#20).
- **Communication:** singleton sharing also supports second channel between same units, shared-library service with `BehaviorSubject` (#11, #21).

Structure misleads in isolation:
- **Units outside composition:** five frontend applications have own boundaries (#12, #14, #16, #18, #19), but three are independent exercises unrelated to composition.
- **Build:** all applications have own build (#22 through #26).
- **Ambiguous deployment:** sole deployment artifact is generic Helm chart linked to no folder. Thus deployment ambiguous, history not resolving question (#38).

Other misleading signals:
- **Commented route:** `mfe2` route commented (#8), history not establishing prior operation (#37).
- **CDN script:** script loads Bootstrap from CDN rather than another application (#9).
- **README:** workspace documentation matches implementation except alias explanation citing nonexistent file (#36).

## Observations

### 1. microfrontend-workspace/package.json:14

**Observation:** `@angular-architects/module-federation` (`^19.0.3`) declared in `dependencies`.

**Interpretation:** Federation technology present, used by configuration/code.

### 2. microfrontend-workspace/projects/shell/webpack.config.js:1-18

**Observation:** `withModuleFederationPlugin` declares `name: 'shell'`, exposing `./Component` (shell `app.component.ts`), sharing dependencies through `shareAll` as singletons, declaring remote `mfe1: "mfe1@http://localhost:4201/remoteEntry.js"`.

**Interpretation:** Host configuration declares mfe1 remote/development location.

**Note:** `angular.json` only points generic builder `ngx-build-plus:browser` at file, `webpack.prod.config.js` only reexports it. Neither produces observation. Same rule excludes `shared` alias in `tsconfig.json` (microfrontend-workspace/tsconfig.json:15-18) from dimension 2 as path alias.

### 3. microfrontend-workspace/projects/mfe1/webpack.config.js:1-16

**Observation:** `withModuleFederationPlugin` declares `name: 'mfe1'` and `filename: 'remoteEntry.js'`, exposing `./Component` (mfe1 `app.component.ts`), sharing dependencies through `shareAll` as singletons.

**Interpretation:** Mfe1 configured as remote offering component to host.

### 4. microfrontend-workspace/projects/mfe1/src/main.ts:1

**Observation:** `import('./bootstrap')`.

**Interpretation:** Asynchronous bootstrap internal to unit.

### 5. microfrontend-workspace/projects/shell/src/main.ts:1

**Observation:** `import('./bootstrap')`.

**Interpretation:** Asynchronous bootstrap internal to shell.

### 6. microfrontend-workspace/projects/shell/src/app/app.routes.ts:2

**Observation:** Imports `loadRemoteModule` from `@angular-architects/module-federation`.

**Interpretation:** Remote-loading mechanism available in shell routes.

### 7. microfrontend-workspace/projects/shell/src/app/app.routes.ts:6-12

**Observation:** Route `mfe1` uses `loadComponent` with `loadRemoteModule({ type: 'module', remoteEntry: 'http://localhost:4201/remoteEntry.js', exposedModule: './Component' })` and `m.AppComponent`.

**Interpretation:** Shell loads mfe1 component at runtime through remote URL.

### 8. microfrontend-workspace/projects/shell/src/app/app.routes.ts:14-21

**Observation:** Route `mfe2` with `loadRemoteModule` for `http://localhost:4202/remoteEntry.js` entirely commented.

**Interpretation:** Disabled remote loading with absent snapshot target.

### 9. angular-frontend-practical/src/index.html:13-15

**Observation:** Loads Bootstrap from CDN.

**Interpretation:** UI library rather than another frontend application. External-script search false positive.

### 10. microfrontend-workspace/projects/shell/src/app/app.routes.ts:4-24; microfrontend-workspace/projects/shell/src/app/app.config.ts:7

**Observation:** Shell route table names `mfe1`, redirecting empty route there. Registered in shell configuration.

**Interpretation:** Host routing declares host → remote relationship.

### 11. microfrontend-workspace/projects/shared/src/lib/message.service.ts:8-12

**Observation:** `MessageService` maintains `BehaviorSubject`, exposes `message$`, publishing through `setMessage`.

**Interpretation:** Communication mechanism used between units. Participants (shell publishes, mfe1 subscribes) in relationship #21.

### 12. angular-frontend-practical; angular-frontend-practical/package.json:1-11; angular-frontend-practical/angular.json:17-22; angular-frontend-practical/src/main.ts:1-6

**Observation:** Angular application with own manifest, entry and build.

**Interpretation:** Frontend unit with own boundary. Independent exercise outside composition.

### 13. microfrontend-workspace; microfrontend-workspace/package.json:1-12; microfrontend-workspace/angular.json:5-14, 114-122, 222-225

**Observation:** Workspace manifest/`angular.json` declaring shell, mfe1 and shared projects without own UI.

**Interpretation:** Workspace coordination root rather than unit.

### 14. microfrontend-workspace/projects/mfe1; microfrontend-workspace/angular.json:125-132, 149-150; microfrontend-workspace/projects/mfe1/src/bootstrap.ts:1-6

**Observation:** Workspace Angular project with own entry/build target, without local manifest.

**Interpretation:** Frontend unit with own boundary.

### 15. microfrontend-workspace/projects/shared; microfrontend-workspace/projects/shared/package.json:1-12; microfrontend-workspace/angular.json:222-241

**Observation:** Library with ng-packagr build and no application entry.

**Interpretation:** Shared library rather than frontend unit.

### 16. microfrontend-workspace/projects/shell; microfrontend-workspace/angular.json:17-24, 41-42; microfrontend-workspace/projects/shell/src/bootstrap.ts:1-6

**Observation:** Workspace Angular project with own entry/build target, without local manifest.

**Interpretation:** Frontend unit with own boundary.

### 17. rate-limited-scheduler; rate-limited-scheduler/package.json:1-9; rate-limited-scheduler/tsconfig.json:2-13

**Observation:** TypeScript utility compiled through `tsc`, without UI.

**Interpretation:** Not frontend unit.

### 18. react-performance-practical; react-performance-practical/package.json:1-11; react-performance-practical/index.html:10-11; react-performance-practical/vite.config.ts:6-11

**Observation:** React application with own manifest, entry and Vite build.

**Interpretation:** Frontend unit with own boundary. Independent exercise outside composition.

### 19. ssr-app; ssr-app/package.json:1-11; ssr-app/angular.json:17-22; ssr-app/src/main.ts:1-6

**Observation:** Angular SSR application with own manifest, entry and build.

**Interpretation:** Frontend unit with own boundary. Independent exercise outside composition.

### 20. microfrontend-workspace/projects/shell/src/app/app.routes.ts:2-12; microfrontend-workspace/projects/shell/webpack.config.js:14-16; microfrontend-workspace/projects/mfe1/webpack.config.js:5-10

**Observation:** Shell route loads `./Component` from `http://localhost:4201/remoteEntry.js`. Module/name `mfe1` match mfe1 configuration.

**Interpretation:** Active host → remote relationship.

### 21. microfrontend-workspace/projects/shared/src/lib/message.service.ts:12; microfrontend-workspace/projects/shell/src/app/app.component.ts:19; microfrontend-workspace/projects/mfe1/src/app/app.component.ts:16-18; microfrontend-workspace/projects/shell/webpack.config.js:11-13; microfrontend-workspace/projects/mfe1/webpack.config.js:12-14

**Observation:** Shell sends messages through `MessageService`, mfe1 subscribing. Service shared singleton in both configurations.

**Interpretation:** Active shell → mfe1 communication relationship.

### 22. angular-frontend-practical/angular.json:17-22; angular-frontend-practical/package.json:7; spa-helm/Chart.yaml:1-4

**Observation:** Own build target/output. Repository’s sole deployment artifact is generic Helm chart without folder link.

**Interpretation:** Own build boundary. Unknown whether chart publishes application.

### 23. microfrontend-workspace/angular.json:125-131, 150; spa-helm/Chart.yaml:1-4

**Observation:** Own build target/`dist/mfe1` output, same dependency installation as shell. Generic chart has no folder link.

**Interpretation:** Own build boundary. Unknown whether chart publishes application.

### 24. microfrontend-workspace/angular.json:17-23, 42; spa-helm/Chart.yaml:1-4

**Observation:** Own build target/`dist/shell` output. Generic chart has no folder link.

**Interpretation:** Own build boundary. Unknown whether chart publishes application.

### 25. react-performance-practical/vite.config.ts:6-11; react-performance-practical/package.json:8; spa-helm/Chart.yaml:1-4

**Observation:** Own Vite configuration/build. Generic chart has no folder link.

**Interpretation:** Own build boundary. Unknown whether chart publishes application.

### 26. ssr-app/angular.json:17-22; ssr-app/package.json:7, 10; spa-helm/Chart.yaml:1-4

**Observation:** Own build target/script running built SSR server. Generic chart has no folder link.

**Interpretation:** Own build boundary. Unknown whether chart publishes application.

### 27. README.md:3-5

**Observation:** "multiple frontend coding exercises […] Each exercise is organized in its own folder".

**Interpretation:** Describes repository as independent per-folder exercises. Claim corroborated.

### 28. microfrontend-workspace/README.md:3

**Observation:** "demonstrates a **Micro-Frontend architecture** using Angular, Module Federation, and a shared library".

**Interpretation:** Presents workspace as micro-frontend architecture with Module Federation. Claim corroborated.

### 29. microfrontend-workspace/README.md:5-6

**Observation:** "**Shell**: The main host application. **MFE1**: A remote micro-frontend loaded at runtime."

**Interpretation:** Describes host/remote roles. Claim corroborated.

### 30. microfrontend-workspace/README.md:7

**Observation:** "**Shared Library**: Contains services or utilities used across apps."

**Interpretation:** Claims applications use library. Claim corroborated.

### 31. microfrontend-workspace/README.md:41

**Observation:** "Navigating to /mfe1 in the shell will dynamically load MFE1 via Module Federation".

**Interpretation:** Describes on-demand remote loading. Claim corroborated.

### 32. microfrontend-workspace/README.md:46

**Observation:** "Routes are defined […] using loadRemoteModule() from @angular-architects/module-federation."

**Interpretation:** Describes route loading mechanism. Claim corroborated.

### 33. microfrontend-workspace/README.md:50

**Observation:** "Shell can share services and state with MFE1 using the shared library."

**Interpretation:** Describes shared-service communication. Claim corroborated.

### 34. microfrontend-workspace/README.md:53

**Observation:** "Exposes Angular components or modules via Module Federation."

**Interpretation:** Claims mfe1 exposes components through federation. Claim corroborated.

### 35. microfrontend-workspace/README.md:55

**Observation:** "Registered as a remote in Shell's webpack.config.js."

**Interpretation:** Claims mfe1 declared as remote in shell configuration. Claim corroborated.

### 36. microfrontend-workspace/README.md:62

**Observation:** "Aliased in tsconfig.base.json for clean imports (e.g., @shared/message.service)."

**Interpretation:** Describes alias in nonexistent file/path. Claim contradicted.

### 37. 89a3c27 2025-05-07 (microfrontend-workspace/projects/shell/src/app/app.routes.ts)

**Observation:** Route file arrives with `mfe2` already commented in sole commit.

**Interpretation:** Unknown whether route ever worked. Past-only question: disabled in snapshot.

### 38. 89a3c27 2025-05-07 (spa-helm)

**Observation:** Chart arrives alongside exercises in sole commit.

**Interpretation:** History does not identify chart’s application. Two snapshot readings remain plausible: chart publishes one application, or is unused template.

### 39. 89a3c27 2025-05-07 (microfrontend-workspace/README.md, microfrontend-workspace/tsconfig.json)

**Observation:** README and `tsconfig.json` arrive together in sole commit, with no `tsconfig.base.json` version.

**Interpretation:** Unknown whether README describes earlier organization. Past-only question: file absent from snapshot.

## Classification

| # | Origin | Dimension | Type | Approach | Evidence | Strength | Relationships |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.2 (microfrontend-workspace/package.json:14) | 1 technology | manifest | module-federation | technological | weak | declares #2; declares #3; declares #6 |
| 2 | 3.4.2 (microfrontend-workspace/package.json:14, Evidence); 3.4.3 (microfrontend-workspace/projects/shell, Markers); 3.4.5 #1, #2 (Configuration); 3.4.7 #7, #9 (Evidence) | 2 configuration | configuration | module-federation | architectural | strong | configures #16; configures #20; configures #21 |
| 3 | 3.4.3 (microfrontend-workspace/projects/mfe1, Markers); 3.4.5 #1, #2 (Configuration); 3.4.7 #3, #7, #8 (Evidence) | 2 configuration | configuration | module-federation | technological | moderate | configures #14; configures #20; configures #21 |
| 4 | 3.4.4 (microfrontend-workspace/projects/mfe1/src/main.ts:1) | 3 code | source code | — | technological | weak | — |
| 5 | 3.4.4 (microfrontend-workspace/projects/shell/src/main.ts:1) | 3 code | source code | — | technological | weak | — |
| 6 | 3.4.4 (microfrontend-workspace/projects/shell/src/app/app.routes.ts:2) | 3 code | source code | module-federation | technological | moderate | implements #20 |
| 7 | 3.4.4 (microfrontend-workspace/projects/shell/src/app/app.routes.ts:8) | 3 code | source code | module-federation | architectural | strong | implements #20 |
| 8 | 3.4.4 (microfrontend-workspace/projects/shell/src/app/app.routes.ts:17) | 3 code | source code | module-federation | technological | weak | — |
| 9 | 3.4.4 (angular-frontend-practical/src/index.html:13) | 3 code | source code | — | context | weak | — |
| 10 | 3.4.4 (microfrontend-workspace/projects/shell/src/app/app.routes.ts:4) | 3 code | source code | module-federation | architectural | strong | implements #20 |
| 11 | 3.4.4 (microfrontend-workspace/projects/shared/src/lib/message.service.ts:12) | 3 code | source code | events | technological | moderate | implements #21 |
| 12 | 3.4.3 (angular-frontend-practical) | 4 structure | directory | — | architectural | moderate | — |
| 13 | 3.4.3 (microfrontend-workspace) | 4 structure | directory | — | context | weak | — |
| 14 | 3.4.3 (microfrontend-workspace/projects/mfe1) | 4 structure | directory | — | architectural | moderate | — |
| 15 | 3.4.3 (microfrontend-workspace/projects/shared) | 4 structure | directory | — | context | weak | — |
| 16 | 3.4.3 (microfrontend-workspace/projects/shell) | 4 structure | directory | — | architectural | moderate | — |
| 17 | 3.4.3 (rate-limited-scheduler) | 4 structure | directory | — | context | weak | — |
| 18 | 3.4.3 (react-performance-practical) | 4 structure | directory | — | architectural | moderate | — |
| 19 | 3.4.3 (ssr-app) | 4 structure | directory | — | architectural | moderate | — |
| 20 | 3.4.5 #1 | 5 composition | source code | module-federation | architectural | strong | links #16; links #14 |
| 21 | 3.4.5 #2 | 5 composition | source code | events | architectural | strong | links #16; links #14 |
| 22 | 3.4.6 #1 | 6 build-deploy | configuration | — | architectural | moderate | publishes #12 |
| 23 | 3.4.6 #2 | 6 build-deploy | configuration | — | architectural | moderate | publishes #14 |
| 24 | 3.4.6 #3 | 6 build-deploy | configuration | — | architectural | moderate | publishes #16 |
| 25 | 3.4.6 #4 | 6 build-deploy | configuration | — | architectural | moderate | publishes #18 |
| 26 | 3.4.6 #5 | 6 build-deploy | configuration | — | architectural | moderate | publishes #19 |
| 27 | 3.4.7 #1 | 7 documentation | documentation | — | architectural | weak | corroborates #12; corroborates #14; corroborates #16; corroborates #18; corroborates #19 |
| 28 | 3.4.7 #2 | 7 documentation | documentation | module-federation | architectural | weak | corroborates #1; corroborates #20 |
| 29 | 3.4.7 #3 | 7 documentation | documentation | module-federation | architectural | weak | corroborates #20; corroborates #7; corroborates #3 |
| 30 | 3.4.7 #4 | 7 documentation | documentation | — | architectural | weak | corroborates microfrontend-workspace/projects/shell/src/app/app.component.ts:4; corroborates microfrontend-workspace/projects/mfe1/src/app/app.component.ts:3 |
| 31 | 3.4.7 #5 | 7 documentation | documentation | module-federation | architectural | weak | corroborates #20; corroborates #7 |
| 32 | 3.4.7 #6 | 7 documentation | documentation | module-federation | architectural | weak | corroborates #6; corroborates #7 |
| 33 | 3.4.7 #7 | 7 documentation | documentation | events | architectural | weak | corroborates #21; corroborates #2; corroborates #3 |
| 34 | 3.4.7 #8 | 7 documentation | documentation | module-federation | architectural | weak | corroborates #3 |
| 35 | 3.4.7 #9 | 7 documentation | documentation | module-federation | architectural | weak | corroborates #2 |
| 36 | 3.4.7 #10 | 7 documentation | documentation | — | architectural | weak | contradicts microfrontend-workspace/tsconfig.json:15-18; contradicts microfrontend-workspace/projects/shell/src/app/app.component.ts:4 |
| 37 | 3.4.8 #1 | 8 history | history | module-federation | technological | weak | explains #8 |
| 38 | 3.4.8 #2 | 8 history | history | — | architectural | ambiguous | explains #22; explains #23; explains #24; explains #25; explains #26 |
| 39 | 3.4.8 #3 | 8 history | history | — | architectural | weak | explains #36 |

## Summary

Observations: 39. Dimensions (technology: 1, configuration: 2, code: 8, structure: 8, composition: 2, build-deploy: 5, documentation: 10, history: 3). Strength (strong: 5, moderate: 13, weak: 20, ambiguous: 1). Evidence (technological: 8, architectural: 27, context: 4).

