---
schema: 1
id: 1197367428
full_name: lkovari/monorepo-nx-mf-dyn-modfed
commit: 16f0962945720a521bac32e4a43913af1494b61b
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

# 362 — lkovari/monorepo-nx-mf-dyn-modfed

## Repository overview

Workspace brings Angular host/three remotes with own entries/builds (#47, #49, #51, #53). Native Federation chain starts at dependency #4, passes through executors/configurations #15–#26 and manifest #27, reaches routes loading exposed App components (#33–#35, #44). Three federation relationships active with snapshot targets (#57–#59). Imports/federation preparation technological evidence (#32, #36, #37); local bootstraps/remote standalone initialization compose no other unit (#28–#31, #38–#43).

Communication uses dependency #2, host bus/bridge and exposed-component consumers (#45), forming three host-to-remote events relationships (#60–#62). Query/command handlers respond in host process; this demonstrates no remote App publication. Libraries/e2e projects not frontend units (#46, #48, #50, #52, #54–#56). Builds separate but publication aggregates four outputs in one Pages site without independent versioning (#63–#66).

Documentation corroborates route composition/host coordination (#70–#77), but diagram assigns bootstraps incorrectly (#78), package version old (#88), remote-route sender denial excessive (#89). History explains divergence coexistence (#97, #99, #100). Internal package filtering partially corroborated (#80, #98), external guide’s described transport uncorroborated (#91). Unused Node package (#3)/Nx tools no other MFE approach. Jest usage remains undetermined (#9); historical gaps (#93–#96) do not change snapshot architectural chain.

## Observations

### 1. nx-mf-df/libs/common-ui-lib/package.json:9

**Observation:** Manifest declares `@lkovari/microfrontend-platform-communication` in section `peerDependencies`, version `^0.3.2`.

**Interpretation:** Messaging library declaration accompanies shared consumer used by remote components; alone establishes no inter-application links.

### 2. nx-mf-df/package.json:89

**Observation:** Manifest declares `@lkovari/microfrontend-platform-communication` in section `dependencies`, version `^0.3.2`.

**Interpretation:** Dependency provides host-used bus/bridge providers; declaration alone technology signal.

### 3. nx-mf-df/package.json:91

**Observation:** Manifest declares `@softarc/native-federation-node` in section `dependencies`, version `^3.3.4`.

**Interpretation:** Review records Configured No: Node package neither imported nor invoked. Name demonstrates no second federation implementation.

### 4. nx-mf-df/package.json:31

**Observation:** Manifest declares `@angular-architects/native-federation` in section `devDependencies`, version `^21.2.3`.

**Interpretation:** Review records Configured Yes: Native Federation configured/used in apps. Isolated declaration demonstrates no unit organization.

### 5. nx-mf-df/package.json:40

**Observation:** Manifest declares `@nx/angular` in section `devDependencies`, version `^22.6.3`.

**Interpretation:** Review confirms Angular library build executor rather than extra frontend unit.

### 6. nx-mf-df/package.json:41

**Observation:** Manifest declares `@nx/devkit` in section `devDependencies`, version `22.6.3`.

**Interpretation:** Review confirms Playwright configuration usage. Test tool without frontend composition mechanism in declaration.

### 7. nx-mf-df/package.json:42

**Observation:** Manifest declares `@nx/eslint` in section `devDependencies`, version `22.6.3`.

**Interpretation:** Review confirms lint targets/plugin; dependency workspace infrastructure.

### 8. nx-mf-df/package.json:43

**Observation:** Manifest declares `@nx/eslint-plugin` in section `devDependencies`, version `22.6.3`.

**Interpretation:** Review confirms ESLint configuration/module-boundary rule without runtime application link.

### 9. nx-mf-df/package.json:44

**Observation:** Manifest declares `@nx/jest` in section `devDependencies`, version `22.6.3`.

**Interpretation:** Review retains Configured Undetermined: Jest plugin/files may remain used or leftover configuration, since explicit target uses Vitest. Declaration does not resolve competing readings.

### 10. nx-mf-df/package.json:45

**Observation:** Manifest declares `@nx/js` in section `devDependencies`, version `22.6.3`.

**Interpretation:** Review confirms contracts-library TypeScript build without making it frontend application.

### 11. nx-mf-df/package.json:46

**Observation:** Manifest declares `@nx/playwright` in section `devDependencies`, version `22.6.3`.

**Interpretation:** Review confirms plugin-inferred e2e tests; workspace verification context.

### 12. nx-mf-df/package.json:47

**Observation:** Manifest declares `@nx/web` in section `devDependencies`, version `22.6.3`.

**Interpretation:** Review confirms local static server per build, without demonstrating independent deployment.

### 13. nx-mf-df/package.json:48

**Observation:** Manifest declares `@nx/workspace` in section `devDependencies`, version `22.6.3`.

**Interpretation:** Review records Configured No: @nx/workspace declaration has no found direct invocation/demonstrates no composition.

### 14. nx-mf-df/package.json:71

**Observation:** Manifest declares `nx` in section `devDependencies`, version `22.6.3`.

**Interpretation:** Review confirms Nx commands in build/startup; Nx coordinates workspace but declaration establishes no MFE architecture.

### 15. nx-mf-df/apps/main-host/federation.config.js:1-28

**Observation:** `withNativeFederation` declares `name: main-host`, `shared: shareAll` with singleton, strictVersion, requiredVersion auto, skip list/ignoreUnusedDeps.

**Interpretation:** Configures Native Federation in main-host/dependency sharing without naming another unit.

### 16. nx-mf-df/apps/main-host/project.json:9-22

**Observation:** Target `build` uses `@angular-architects/native-federation:build`, points to `main-host:esbuild` in production/development configurations.

**Interpretation:** Configures federation executor in main-host build target without declaring another application.

### 17. nx-mf-df/apps/main-host/project.json:23-33

**Observation:** Target `serve` uses `@angular-architects/native-federation:build`, points to `main-host:serve-original:development` with dev true/continuous execution.

**Interpretation:** Configures federation executor in main-host serve target without declaring another application.

### 18. nx-mf-df/apps/mf_remote_a/federation.config.js:1-33

**Observation:** `withNativeFederation` declares `name: mf_remote_a`, `shared: shareAll` with singleton, strictVersion, requiredVersion auto, skip list/ignoreUnusedDeps. Exposes `./Component` as `./apps/mf_remote_a/src/app/app.ts`.

**Interpretation:** Configures Native Federation in mf_remote_a/dependency sharing, offering root component to consumers without naming consumer in block.

### 19. nx-mf-df/apps/mf_remote_a/project.json:9-22

**Observation:** Target `build` uses `@angular-architects/native-federation:build`, points to `mf_remote_a:esbuild` in production/development configurations.

**Interpretation:** Configures federation executor in mf_remote_a build target without declaring another application.

### 20. nx-mf-df/apps/mf_remote_a/project.json:23-33

**Observation:** Target `serve` uses `@angular-architects/native-federation:build`, points to `mf_remote_a:serve-original:development` with dev true/continuous execution.

**Interpretation:** Configures federation executor in mf_remote_a serve target without declaring another application.

### 21. nx-mf-df/apps/mf_remote_b/federation.config.js:1-33

**Observation:** `withNativeFederation` declares `name: mf_remote_b`, `shared: shareAll` with singleton, strictVersion, requiredVersion auto, skip list/ignoreUnusedDeps. Exposes `./Component` as `./apps/mf_remote_b/src/app/app.ts`.

**Interpretation:** Configures Native Federation in mf_remote_b/dependency sharing, offering root component to consumers without naming consumer in block.

### 22. nx-mf-df/apps/mf_remote_b/project.json:9-22

**Observation:** Target `build` uses `@angular-architects/native-federation:build`, points to `mf_remote_b:esbuild` in production/development configurations.

**Interpretation:** Configures federation executor in mf_remote_b build target without declaring another application.

### 23. nx-mf-df/apps/mf_remote_b/project.json:23-33

**Observation:** Target `serve` uses `@angular-architects/native-federation:build`, points to `mf_remote_b:serve-original:development` with dev true/continuous execution.

**Interpretation:** Configures federation executor in mf_remote_b serve target without declaring another application.

### 24. nx-mf-df/apps/mf_remote_c/federation.config.js:1-33

**Observation:** `withNativeFederation` declares `name: mf_remote_c`, `shared: shareAll` with singleton, strictVersion, requiredVersion auto, skip list/ignoreUnusedDeps. Exposes `./Component` as `./apps/mf_remote_c/src/app/app.ts`.

**Interpretation:** Configures Native Federation in mf_remote_c/dependency sharing, offering root component to consumers without naming consumer in block.

### 25. nx-mf-df/apps/mf_remote_c/project.json:9-22

**Observation:** Target `build` uses `@angular-architects/native-federation:build`, points to `mf_remote_c:esbuild` in production/development configurations.

**Interpretation:** Configures federation executor in mf_remote_c build target without declaring another application.

### 26. nx-mf-df/apps/mf_remote_c/project.json:23-33

**Observation:** Target `serve` uses `@angular-architects/native-federation:build`, points to `mf_remote_c:serve-original:development` with dev true/continuous execution.

**Interpretation:** Configures federation executor in mf_remote_c serve target without declaring another application.

### 27. nx-mf-df/apps/main-host/public/federation.manifest.json:1-5

**Observation:** Manifest maps `mf_remote_a`, `mf_remote_b`, `mf_remote_c` to `http://localhost:4201/remoteEntry.json`, `:4202/remoteEntry.json`, `:4203/remoteEntry.json`, respectively.

**Interpretation:** Declares three Native Federation host targets/development addresses.

**Note:** project.json files contribute only build/serve targets declaring federation executor. esbuild/serve-original/serve-static targets, aliases, test/lint plugins and project registries declare no composition element. app.config.ts and app.routes.ts application-executed code remain in dimension 3. gh-build.mjs build script rewrites production manifest: URL excerpts marked supporting composition generate no extra configuration observation.

### 28. nx-mf-df/apps/main-host/src/main.ts:5; nx-mf-df/apps/main-host/src/bootstrap.ts:1-5

**Observation:** Continuation calls `import('./bootstrap')`; bootstrap invokes `bootstrapApplication(App, appConfig)`.

**Interpretation:** Loads main-host local bootstrap. Review records Composition No: import loads no other unit.

### 29. nx-mf-df/apps/mf_remote_a/src/main.ts:5; nx-mf-df/apps/mf_remote_a/src/bootstrap.ts:1-5

**Observation:** Continuation calls `import('./bootstrap')`; bootstrap invokes `bootstrapApplication(App, appConfig)`.

**Interpretation:** Loads mf_remote_a local bootstrap. Review records Composition No: import loads no other unit.

### 30. nx-mf-df/apps/mf_remote_b/src/main.ts:5; nx-mf-df/apps/mf_remote_b/src/bootstrap.ts:1-5

**Observation:** Continuation calls `import('./bootstrap')`; bootstrap invokes `bootstrapApplication(App, appConfig)`.

**Interpretation:** Loads mf_remote_b local bootstrap. Review records Composition No: import loads no other unit.

### 31. nx-mf-df/apps/mf_remote_c/src/main.ts:5; nx-mf-df/apps/mf_remote_c/src/bootstrap.ts:1-5

**Observation:** Continuation calls `import('./bootstrap')`; bootstrap invokes `bootstrapApplication(App, appConfig)`.

**Interpretation:** Loads mf_remote_c local bootstrap. Review records Composition No: import loads no other unit.

### 32. nx-mf-df/apps/main-host/src/app/app.routes.ts:2

**Observation:** Imports `loadRemoteModule` from `@angular-architects/native-federation`.

**Interpretation:** Provides route mechanism; import alone names no target unit.

### 33. nx-mf-df/apps/main-host/src/app/app.routes.ts:14

**Observation:** Route `mf_remote_a` uses `loadComponent` with `loadRemoteModule('mf_remote_a', './Component').then((m) => m.App)`.

**Interpretation:** Links host navigation path to mf_remote_a remote component through federation loading.

### 34. nx-mf-df/apps/main-host/src/app/app.routes.ts:19

**Observation:** Route `mf_remote_b` uses `loadComponent` with `loadRemoteModule('mf_remote_b', './Component').then((m) => m.App)`.

**Interpretation:** Links host navigation path to mf_remote_b remote component through federation loading.

### 35. nx-mf-df/apps/main-host/src/app/app.routes.ts:24

**Observation:** Route `mf_remote_c` uses `loadComponent` with `loadRemoteModule('mf_remote_c', './Component').then((m) => m.App)`.

**Interpretation:** Links host navigation path to mf_remote_c remote component through federation loading.

### 36. nx-mf-df/apps/main-host/src/main.ts:1

**Observation:** Imports `initFederation` from `@angular-architects/native-federation`.

**Interpretation:** Provides host federation initializer; import declaration names no targets.

### 37. nx-mf-df/apps/main-host/src/main.ts:3

**Observation:** Calls `initFederation('federation.manifest.json')` before local bootstrap import.

**Interpretation:** Uses manifest resolution to prepare federation before host startup. Manifest name alone names no target units.

### 38. nx-mf-df/apps/mf_remote_a/src/main.ts:1

**Observation:** Imports `initFederation` from `@angular-architects/native-federation`.

**Interpretation:** Prepares mf_remote_a standalone mode; review records Composition No. Resolves no other unit/not main executed when host loads only exposed component.

### 39. nx-mf-df/apps/mf_remote_a/src/main.ts:3

**Observation:** Calls `initFederation()` without manifest/remote argument before local bootstrap.

**Interpretation:** Prepares mf_remote_a standalone mode; review records Composition No. Resolves no other unit/not main executed when host loads only exposed component.

### 40. nx-mf-df/apps/mf_remote_b/src/main.ts:1

**Observation:** Imports `initFederation` from `@angular-architects/native-federation`.

**Interpretation:** Prepares mf_remote_b standalone mode; review records Composition No. Resolves no other unit/not main executed when host loads only exposed component.

### 41. nx-mf-df/apps/mf_remote_b/src/main.ts:3

**Observation:** Calls `initFederation()` without manifest/remote argument before local bootstrap.

**Interpretation:** Prepares mf_remote_b standalone mode; review records Composition No. Resolves no other unit/not main executed when host loads only exposed component.

### 42. nx-mf-df/apps/mf_remote_c/src/main.ts:1

**Observation:** Imports `initFederation` from `@angular-architects/native-federation`.

**Interpretation:** Prepares mf_remote_c standalone mode; review records Composition No. Resolves no other unit/not main executed when host loads only exposed component.

### 43. nx-mf-df/apps/mf_remote_c/src/main.ts:3

**Observation:** Calls `initFederation()` without manifest/remote argument before local bootstrap.

**Interpretation:** Prepares mf_remote_c standalone mode; review records Composition No. Resolves no other unit/not main executed when host loads only exposed component.

### 44. nx-mf-df/apps/main-host/src/app/app.routes.ts:6-26; nx-mf-df/apps/main-host/src/app/app.config.ts:30; nx-mf-df/apps/main-host/src/app/shared/components/main/main.html:2

**Observation:** appRoutes table declares Home/three mf_remote_a/b/c paths, each loading m.App through loadRemoteModule. provideRouter(appRoutes) registers table/layout includes router-outlet.

**Interpretation:** Routing organizes shell composition with three remote components.

### 45. nx-mf-df/apps/main-host/src/app/app.config.ts:31-53; nx-mf-df/apps/main-host/src/app/shared/components/header/header.html:19-20; nx-mf-df/apps/mf_remote_a/src/app/app.ts:25-28; nx-mf-df/apps/mf_remote_b/src/app/app.ts:25-28; nx-mf-df/apps/mf_remote_c/src/app/app.ts:25-28; nx-mf-df/libs/common-ui-lib/src/lib/platform-messaging/services/platform-welcome-last-message.service.ts:35-36; nx-mf-df/libs/common-ui-lib/src/lib/platform-messaging/services/platform-welcome-last-message.service.ts:62-75; nx-mf-df/libs/common-ui-lib/src/lib/platform-messaging/services/remote-platform-bus.service.ts:52-57; nx-mf-df/libs/common-ui-lib/src/lib/platform-messaging/services/demo-shell-h2r-query-remote-handler.service.ts:74-80; nx-mf-df/libs/common-ui-lib/src/lib/platform-messaging/services/demo-shell-h2r-command-remote-handler.service.ts:74-80

**Observation:** Host calls provideBus/provideHostBridge for MF_REMOTE_A_ID/B_ID/C_ID, mounts header composer/registers listener bootstraps/query-command handlers. Each remote App provides own ID/PlatformWelcomeLastMessageService; service subscribes to PLATFORM_MESSAGE_V1 through BUS_TOKEN/global bridge. Response handlers execute in host on composed page.

**Interpretation:** Host communicates to consumers in three federated components through shared bus (events). Host-handler responses demonstrate neither remote-component publication nor bidirectional app communication.

### 46. nx-mf-df; nx-mf-df/package.json:1-29; nx-mf-df/nx.json:1-91

**Observation:** Root contains @nx-mf-df/source manifest, Nx coordination scripts/workspace configuration without own application entry/UI build.

**Interpretation:** Workspace coordination root without own UI entry/build.

### 47. nx-mf-df/apps/main-host; nx-mf-df/apps/main-host/project.json:9-22; nx-mf-df/apps/main-host/project.json:58-65; nx-mf-df/apps/main-host/src/main.ts:3-5; nx-mf-df/apps/main-host/src/bootstrap.ts:5

**Observation:** Directory contains Nx application project with src/main.ts entry, bootstrapApplication/own build and esbuild targets; output dist/apps/main-host.

**Interpretation:** Shell Angular with own entry/build target.

### 48. nx-mf-df/apps/main-host-e2e; nx-mf-df/apps/main-host-e2e/project.json:2-8; nx-mf-df/apps/main-host-e2e/playwright.config.ts:17-31

**Observation:** Directory Nx e2e project with empty explicit targets/Playwright configuration, without application entry/UI build.

**Interpretation:** E2e test project for host without UI entry/build.

### 49. nx-mf-df/apps/mf_remote_a; nx-mf-df/apps/mf_remote_a/project.json:9-22; nx-mf-df/apps/mf_remote_a/project.json:58-65; nx-mf-df/apps/mf_remote_a/src/main.ts:3-5; nx-mf-df/apps/mf_remote_a/src/bootstrap.ts:5

**Observation:** Directory contains Nx application project with src/main.ts entry, bootstrapApplication/own build and esbuild targets; output dist/apps/mf_remote_a.

**Interpretation:** Remote Angular with own entry/build target.

### 50. nx-mf-df/apps/mf_remote_a-e2e; nx-mf-df/apps/mf_remote_a-e2e/project.json:2-8; nx-mf-df/apps/mf_remote_a-e2e/playwright.config.ts:17-31

**Observation:** Directory Nx e2e project with empty explicit targets/Playwright configuration, without application entry/UI build.

**Interpretation:** E2e test project for `mf_remote_a` without UI entry/build.

### 51. nx-mf-df/apps/mf_remote_b; nx-mf-df/apps/mf_remote_b/project.json:9-22; nx-mf-df/apps/mf_remote_b/project.json:58-65; nx-mf-df/apps/mf_remote_b/src/main.ts:3-5; nx-mf-df/apps/mf_remote_b/src/bootstrap.ts:5

**Observation:** Directory contains Nx application project with src/main.ts entry, bootstrapApplication/own build and esbuild targets; output dist/apps/mf_remote_b.

**Interpretation:** Remote Angular with own entry/build target.

### 52. nx-mf-df/apps/mf_remote_b-e2e; nx-mf-df/apps/mf_remote_b-e2e/project.json:2-8; nx-mf-df/apps/mf_remote_b-e2e/playwright.config.ts:17-31

**Observation:** Directory Nx e2e project with empty explicit targets/Playwright configuration, without application entry/UI build.

**Interpretation:** E2e test project for `mf_remote_b` without UI entry/build.

### 53. nx-mf-df/apps/mf_remote_c; nx-mf-df/apps/mf_remote_c/project.json:9-22; nx-mf-df/apps/mf_remote_c/project.json:58-65; nx-mf-df/apps/mf_remote_c/src/main.ts:3-5; nx-mf-df/apps/mf_remote_c/src/bootstrap.ts:5

**Observation:** Directory contains Nx application project with src/main.ts entry, bootstrapApplication/own build and esbuild targets; output dist/apps/mf_remote_c.

**Interpretation:** Remote Angular with own entry/build target.

### 54. nx-mf-df/apps/mf_remote_c-e2e; nx-mf-df/apps/mf_remote_c-e2e/project.json:2-8; nx-mf-df/apps/mf_remote_c-e2e/playwright.config.ts:17-31

**Observation:** Directory Nx e2e project with empty explicit targets/Playwright configuration, without application entry/UI build.

**Interpretation:** E2e test project for `mf_remote_c` without UI entry/build.

### 55. nx-mf-df/libs/common-ui-lib; nx-mf-df/libs/common-ui-lib/package.json:1-16; nx-mf-df/libs/common-ui-lib/project.json:2-24; nx-mf-df/libs/common-ui-lib/ng-package.json:3-6

**Observation:** Nx project library with own manifest/ng-packagr-lite build, entryFile src/index.ts.

**Interpretation:** Shared UI/messaging library without application entry.

### 56. nx-mf-df/libs/contracts-platform-messaging; nx-mf-df/libs/contracts-platform-messaging/package.json:1-11; nx-mf-df/libs/contracts-platform-messaging/project.json:2-16

**Observation:** Nx project library with own manifest/@nx/js:tsc build, manifest main entry ./src/index.js.

**Interpretation:** Messaging contracts library without application entry.

### 57. nx-mf-df/apps/main-host/src/app/app.routes.ts:14; nx-mf-df/apps/main-host/src/main.ts:3; nx-mf-df/apps/main-host/src/app/app.config.ts:30; nx-mf-df/apps/main-host/public/federation.manifest.json:2; nx-mf-df/apps/mf_remote_a/federation.config.js:4-10; nx-mf-df/apps/mf_remote_a/src/app/app.ts:30

**Observation:** Host calls loadRemoteModule for mf_remote_a/./Component. Manifest resolves name to remoteEntry.json; target configuration declares matching name/exposes ./Component as App. Initialization reads manifest/router registers route.

**Interpretation:** Active host → remote Native Federation relationship between main-host/mf_remote_a, both in snapshot.

### 58. nx-mf-df/apps/main-host/src/app/app.routes.ts:19; nx-mf-df/apps/main-host/src/main.ts:3; nx-mf-df/apps/main-host/src/app/app.config.ts:30; nx-mf-df/apps/main-host/public/federation.manifest.json:3; nx-mf-df/apps/mf_remote_b/federation.config.js:4-10; nx-mf-df/apps/mf_remote_b/src/app/app.ts:30

**Observation:** Host calls loadRemoteModule for mf_remote_b/./Component. Manifest resolves name to remoteEntry.json; target configuration declares matching name/exposes ./Component as App. Initialization reads manifest/router registers route.

**Interpretation:** Active host → remote Native Federation relationship between main-host/mf_remote_b, both in snapshot.

### 59. nx-mf-df/apps/main-host/src/app/app.routes.ts:24; nx-mf-df/apps/main-host/src/main.ts:3; nx-mf-df/apps/main-host/src/app/app.config.ts:30; nx-mf-df/apps/main-host/public/federation.manifest.json:4; nx-mf-df/apps/mf_remote_c/federation.config.js:4-10; nx-mf-df/apps/mf_remote_c/src/app/app.ts:30

**Observation:** Host calls loadRemoteModule for mf_remote_c/./Component. Manifest resolves name to remoteEntry.json; target configuration declares matching name/exposes ./Component as App. Initialization reads manifest/router registers route.

**Interpretation:** Active host → remote Native Federation relationship between main-host/mf_remote_c, both in snapshot.

### 60. nx-mf-df/apps/main-host/src/app/app.config.ts:31-47; nx-mf-df/apps/main-host/src/app/shared/components/header/header.html:19-20; nx-mf-df/libs/contracts-platform-messaging/src/lib/participant-ids.ts:3; nx-mf-df/apps/mf_remote_a/src/app/app.ts:25-28; nx-mf-df/apps/mf_remote_a/src/app/app.html:3-5; nx-mf-df/libs/common-ui-lib/src/lib/platform-messaging/services/platform-welcome-last-message.service.ts:35-36; nx-mf-df/libs/common-ui-lib/src/lib/platform-messaging/services/platform-welcome-last-message.service.ts:62-75; nx-mf-df/libs/common-ui-lib/src/lib/platform-messaging/services/remote-platform-bus.service.ts:52-57

**Observation:** Host creates bus/bridge with mf_remote_a ID, contains message composer; exposed mf_remote_a component provides PlatformWelcomeLastMessageService subscribing through inherited token/bridge and displaying message/history.

**Interpretation:** Active communication relationship, events, main-host to mf_remote_a. In composed page remote component consumer; demo response handlers run in host.

### 61. nx-mf-df/apps/main-host/src/app/app.config.ts:31-47; nx-mf-df/apps/main-host/src/app/shared/components/header/header.html:19-20; nx-mf-df/libs/contracts-platform-messaging/src/lib/participant-ids.ts:5; nx-mf-df/apps/mf_remote_b/src/app/app.ts:25-28; nx-mf-df/apps/mf_remote_b/src/app/app.html:3-5; nx-mf-df/libs/common-ui-lib/src/lib/platform-messaging/services/platform-welcome-last-message.service.ts:35-36; nx-mf-df/libs/common-ui-lib/src/lib/platform-messaging/services/platform-welcome-last-message.service.ts:62-75; nx-mf-df/libs/common-ui-lib/src/lib/platform-messaging/services/remote-platform-bus.service.ts:52-57

**Observation:** Host creates bus/bridge with mf_remote_b ID, contains message composer; exposed mf_remote_b component provides PlatformWelcomeLastMessageService subscribing through inherited token/bridge and displaying message/history.

**Interpretation:** Active communication relationship, events, main-host to mf_remote_b. In composed page remote component consumer; demo response handlers run in host.

### 62. nx-mf-df/apps/main-host/src/app/app.config.ts:31-47; nx-mf-df/apps/main-host/src/app/shared/components/header/header.html:19-20; nx-mf-df/libs/contracts-platform-messaging/src/lib/participant-ids.ts:7; nx-mf-df/apps/mf_remote_c/src/app/app.ts:25-28; nx-mf-df/apps/mf_remote_c/src/app/app.html:3-5; nx-mf-df/libs/common-ui-lib/src/lib/platform-messaging/services/platform-welcome-last-message.service.ts:35-36; nx-mf-df/libs/common-ui-lib/src/lib/platform-messaging/services/platform-welcome-last-message.service.ts:62-75; nx-mf-df/libs/common-ui-lib/src/lib/platform-messaging/services/remote-platform-bus.service.ts:52-57

**Observation:** Host creates bus/bridge with mf_remote_c ID, contains message composer; exposed mf_remote_c component provides PlatformWelcomeLastMessageService subscribing through inherited token/bridge and displaying message/history.

**Interpretation:** Active communication relationship, events, main-host to mf_remote_c. In composed page remote component consumer; demo response handlers run in host.

### 63. nx-mf-df/apps/main-host/project.json:9-22; nx-mf-df/apps/main-host/project.json:58-65; nx-mf-df/scripts/gh-build.mjs:51; nx-mf-df/scripts/gh-stage.mjs:13-18; .github/workflows/deploy-github-pages.yml:37-58; nx-mf-df/scripts/gh-deploy.mjs:33-46; nx-mf-df/package.json:3-29

**Observation:** Target of main-host generates dist/apps/main-host; gh-build invokes build with own baseHref. gh-stage copies output to gh-pages-dist root. Workflow publishes gh-pages-dist as Pages artifact/manual script publishes same tree. No own application version.

**Interpretation:** main-host has separate build/joint deployment with other applications, Versioning No per review. Build-artifact boundary implies no independent deployment.

### 64. nx-mf-df/apps/mf_remote_a/project.json:9-22; nx-mf-df/apps/mf_remote_a/project.json:58-65; nx-mf-df/scripts/gh-build.mjs:53-54; nx-mf-df/scripts/gh-stage.mjs:19-25; .github/workflows/deploy-github-pages.yml:37-58; nx-mf-df/scripts/gh-deploy.mjs:33-46; nx-mf-df/package.json:3-29

**Observation:** Target of mf_remote_a generates dist/apps/mf_remote_a; gh-build invokes build with own baseHref. gh-stage copies output to gh-pages-dist/mf_remote_a. Workflow publishes gh-pages-dist as Pages artifact/manual script publishes same tree. No own application version.

**Interpretation:** mf_remote_a has separate build/joint deployment with other applications, Versioning No per review. Build-artifact boundary implies no independent deployment.

### 65. nx-mf-df/apps/mf_remote_b/project.json:9-22; nx-mf-df/apps/mf_remote_b/project.json:58-65; nx-mf-df/scripts/gh-build.mjs:53-54; nx-mf-df/scripts/gh-stage.mjs:19-25; .github/workflows/deploy-github-pages.yml:37-58; nx-mf-df/scripts/gh-deploy.mjs:33-46; nx-mf-df/package.json:3-29

**Observation:** Target of mf_remote_b generates dist/apps/mf_remote_b; gh-build invokes build with own baseHref. gh-stage copies output to gh-pages-dist/mf_remote_b. Workflow publishes gh-pages-dist as Pages artifact/manual script publishes same tree. No own application version.

**Interpretation:** mf_remote_b has separate build/joint deployment with other applications, Versioning No per review. Build-artifact boundary implies no independent deployment.

### 66. nx-mf-df/apps/mf_remote_c/project.json:9-22; nx-mf-df/apps/mf_remote_c/project.json:58-65; nx-mf-df/scripts/gh-build.mjs:53-54; nx-mf-df/scripts/gh-stage.mjs:19-25; .github/workflows/deploy-github-pages.yml:37-58; nx-mf-df/scripts/gh-deploy.mjs:33-46; nx-mf-df/package.json:3-29

**Observation:** Target of mf_remote_c generates dist/apps/mf_remote_c; gh-build invokes build with own baseHref. gh-stage copies output to gh-pages-dist/mf_remote_c. Workflow publishes gh-pages-dist as Pages artifact/manual script publishes same tree. No own application version.

**Interpretation:** mf_remote_c has separate build/joint deployment with other applications, Versioning No per review. Build-artifact boundary implies no independent deployment.

### 67. CHANGELOG-2026-05-24.md:12

**Observation:** Document states: “Native Federation fails without the patch”.

**Interpretation:** Patch 0.3.2 recorded/exports changed from .mjs to .js; alleged technical necessity without patch undemonstrated. Partial corroboration.

### 68. CHANGELOG-2026-05-31.md:16

**Observation:** Document states: “a shared compile-time constant is used”.

**Interpretation:** Common token provided by host/consumed by remote adapter; shared bridge-access contract without strong-isolation proof.

### 69. CHANGELOG-2026-05-31.md:37

**Observation:** Document states: “Wired into all four app configs”.

**Interpretation:** Four configs have cited bootstraps, but remote standalone configs do not execute when only components loaded in host.

### 70. README.md:3

**Observation:** Document states: “Angular 21 + Nx monorepo proof-of-concept for native module federation with host-mediated cross-microfrontend messaging”.

**Interpretation:** Declared organization matches four Angular units, federation/host-mediated messaging; native module federation here means Native Federation.

### 71. README.md:13

**Observation:** Document states: “Shell: layout, routing, owns the platform bus and window.__MFE_BRIDGE__”.

**Interpretation:** Shell role confirmed by layout, routing/bus-bridge creation.

### 72. README.md:14

**Observation:** Document states: “Federated remotes loaded into the shell by route”.

**Interpretation:** Confirmed by three route-based federation-loading relationships.

### 73. README.md:15

**Observation:** Document states: “Versioned Zod contracts, participant IDs, bus validators, topic registry”.

**Interpretation:** Library defines message contracts/IDs/validators consumed by host/shared services. Demonstrates no independent application releases.

### 74. README.md:16

**Observation:** Document states: “Shared UI, PrimeNG setup, platform messaging adapters and demo UI”.

**Interpretation:** Library gathers UI/adapters imported by apps without another frontend unit.

### 75. README.md:17

**Observation:** Document states: “npm package: in-process bus, host bridge, Angular providers”.

**Interpretation:** Declared package provides providers/bus access used in integration.

### 76. README.md:19

**Observation:** Document states: “They expose only their root component into the host; they do not bootstrap a separate Angular app inside the federated shell page”.

**Interpretation:** Host mounts exposed App without executing remote main.ts/standalone bootstrap in composition.

### 77. README.md:25

**Observation:** Document states: “One physical bus per browser tab. The host creates it; remotes attach through the global bridge handle”.

**Interpretation:** Host creates bus used by remote components through inherited token/global bridge; no isolated communicating buses demonstrated.

### 78. README.md:66-81

**Observation:** Document states: “mf_remote_a / b / c (federated components) → providePlatformMessageListenerBootstrap / provideDemoShellH2rQueryRemoteHandlerBootstrap”.

**Interpretation:** Diagram contradicts exposed App/host providers: listener/query bootstraps run in host rather than federated components.

### 79. README.md:86-95

**Observation:** Document states: “These strings are agreed explicitly in code (not inferred from federation build names)”.

**Interpretation:** IDs explicit provider/subscription constants rather than automatically inferred from build names.

### 80. README.md:95

**Observation:** Document states: “Routing uses optional target on messages plus each subscription’s subscriberId”.

**Interpretation:** Subscriber IDs/contracts partially corroborate claim. Target-delivery filtering internal to external package without acquired source for confirmation.

### 81. README.md:116

**Observation:** Document states: “Remotes: listen-only UI (...) replay buffer in sessionStorage for subscribers that mount after send”.

**Interpretation:** Remote components show messages/history/use replay. No sender in components does not eliminate host-header composer.

### 82. README.md:142

**Observation:** Document states: “the “remote” handler runs in the host process (subscribes as mf_remote_a, mf_remote_b, and mf_remote_c)”.

**Interpretation:** Demo registers host handlers subscribing under three IDs. Logical round trip proves no response executed in each remote App.

### 83. README.md:196

**Observation:** Document states: “remotes first, then host”.

**Interpretation:** Orchestrator starts remote Nx processes, waits for ports/timeout, starts host. Development description without proving standalone shell-free messaging.

### 84. README.md:205

**Observation:** Document states: “Production build + GitHub Pages asset prep”.

**Interpretation:** Script produces separate builds/updates manifest/aggregates outputs into publication tree without per-app separate deployment.

### 85. README.md:207

**Observation:** Document states: “Push to gh-pages branch”.

**Interpretation:** Manual path publishes joint gh-pages tree/workflow publishes Pages site. Artifacts prove no production execution success.

### 86. README.md:248

**Observation:** Document states: “Apps expose build, serve, lint, test (and federation-related esbuild / serve-original)”.

**Interpretation:** Projects/scripts offer per-application targets; library claim restricted to configured targets.

### 87. README.md:281

**Observation:** Document states: “Build and lint targets use Nx caching”.

**Interpretation:** Nx file configures cache/inputs; configuration description rather than performance measurement.

### 88. README.md:287

**Observation:** Document states: “is pinned at ^0.2.1 in nx-mf-df/package.json”.

**Interpretation:** Current manifest declares ^0.3.2/patch 0.3.2. Claim’s ^0.2.1 version contradicted by snapshot.

### 89. nx-mf-comm-info.md:204

**Observation:** Document states: “Listen-only (nincs küldő UI remote route-on) (Somente escuta; não há UI de envio na rota remota)”.

English translation: Listen only; no sending UI on remote route.

**Interpretation:** Claim extends no-sender remote component to entire route. Host header retains composer on routes, contradicting extension.

### 90. nx-mf-comm-info.md:241-250

**Observation:** Document states: “önálló dev szerver (...) nincs shell bridge (servidor de desenvolvimento autônomo; não há ponte do shell)”.

English translation: Standalone development server; no shell bridge.

**Interpretation:** Remote has own entry/bootstrap but standalone config creates no bus/bridge; adapter returns absent bus until bridge exists.

### 91. platform-communication-details.md:63-65

**Observation:** Document states: “backed by a browser EventTarget (...) no postMessage, no WebSocket, and no cross-origin transport”.

**Interpretation:** External-package internals description. Acquired adapters/imports confirm neither EventTarget, CustomEvent nor exclusion of other package transports; uncorroborated.

### 92. platform-communication-details.md:251

**Observation:** Document states: “read handle.appId (...) and handle.remotes”.

**Interpretation:** Adapter reads appId/remotes from host-created handle. Host supplies list without proving dynamic unit discovery.

### 93. a04c0bb 2026-03-31 (nx-mf-df/package.json)

**Observation:** Log records manifest at a04c0bb (2026-03-31), message announcing plugin installation/host-remote configuration. Consulted initial manifest content unavailable; snapshot only declares Node package.

**Interpretation:** Earlier usage, auxiliary installation or never-used declaration inconclusive. Historical uncertainty does not change active snapshot Native Federation through other package.

### 94. 82423e0 2026-05-17 (nx-mf-df/libs/contracts-platform-messaging/jest.config.cts); 89e1eb6 2026-06-01 (nx-mf-df/libs/contracts-platform-messaging/vitest.config.ts); 16f0962 2026-06-07 (nx-mf-df/libs/contracts-platform-messaging/project.json)

**Observation:** 82423e0 (2026-05-17) adds Jest/contracts-lib project; 89e1eb6 (2026-06-01) adds Vitest; 16f0962 (2026-06-07) changes project/Vitest. Read historical Jest configuration points to root preset but consulted old project.json files unavailable. Snapshot uses vitest run/retains Jest files.

**Interpretation:** Jest execution/abandonment inconclusive. Sequence dates coexistence without resolving undetermined usage/changing four-unit boundaries/federation.

### 95. a04c0bb 2026-03-31 (nx-mf-df/package.json)

**Observation:** Manifest appears in a04c0bb (2026-03-31), changes afterward; initial version unavailable in recorded query. Snapshot only declares @nx/workspace.

**Interpretation:** Earlier direct usage/never-connected declaration inconclusive; past package uncertainty does not change observed composition.

### 96. 81a1110 2026-05-10 (nx-mf-df/patches); 147d615 2026-05-24 (README.md; nx-mf-df/patches); 89e1eb6 2026-06-01 (nx-mf-df/patches); 16f0962 2026-06-07 (nx-mf-df/patches)

**Observation:** Log records patches 0.1.4 in 81a1110 (2026-05-10), 0.2.1 in 147d615 (2026-05-24), 0.3.0 in 89e1eb6 (2026-06-01), 0.3.2 in 16f0962 (2026-06-07). README read in 147d615 explains exports from .mjs to .js; no with/without-patch build comparison.

**Interpretation:** Patch technical necessity inconclusive. History confirms versioned patches rather than alleged no-patch error; snapshot composition chain configured.

### 97. 147d615 2026-05-24 (README.md)

**Observation:** README at 147d615 (2026-05-24) already contains diagram assigning bootstraps to federated components/prose locating handler in host. Log records no later README change.

**Interpretation:** Clarified: documentary divergence coexisted in same version. No basis for assigning diagram/prose to distinct stages; current code retains host handlers.

### 98. docs/mfe-history-review/362-lkovari__monorepo-nx-mf-dyn-modfed.md:31; README.md:95; nx-mf-df/libs/common-ui-lib/src/lib/platform-messaging/services/platform-welcome-last-message.service.ts:66-75

**Observation:** Final review records snapshot subscriptions, IDs/contracts but not delivery-responsible external-package source. No specific historical query for point.

**Interpretation:** Resolved by snapshot regarding gap origin, retaining partial corroboration. No confirmed internal filtering/indication of abandoned local configuration.

### 99. 147d615 2026-05-24 (README.md; nx-mf-df/package.json; nx-mf-comm-info.md); 89e1eb6 2026-06-01 (nx-mf-df/pnpm-workspace.yaml); 16f0962 2026-06-07 (nx-mf-df/package.json; nx-mf-df/pnpm-workspace.yaml)

**Observation:** README at 147d615 (2026-05-24) already claims ^0.2.1/unchanged; patch paths change in 89e1eb6 (2026-06-01) and 16f0962 (2026-06-07) to 0.3.0/0.3.2. Consulted May manifest unavailable; current declares ^0.3.2.

**Interpretation:** Clarified: documentary reference unupdated while dependency artifacts evolved. Does not claim May manifest actually declared 0.2.1.

### 100. 82423e0 2026-05-17 (nx-mf-df/apps/main-host/src/app/shared/components/header/header.html); 147d615 2026-05-24 (nx-mf-comm-info.md)

**Observation:** Header read at 82423e0 (2026-05-17) contains three route links/lib-platform-messaging-trigger without route condition/unchanged. nx-mf-comm-info.md enters in 147d615 (2026-05-24), unchanged afterward, denies sending UI on remote route.

**Interpretation:** Clarified: composer already in header when document added. Contradiction from artifact coexistence without inferred later removal/intent.

## Classification

| # | Origin | Dimension | Type | Approach | Evidence | Strength | Relationships |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.2 (nx-mf-df/libs/common-ui-lib/package.json:9) | 1 technology | manifest | events | technological | weak | declares nx-mf-df/libs/common-ui-lib/src/lib/platform-messaging/services/platform-welcome-last-message.service.ts:10; declares nx-mf-df/libs/common-ui-lib/src/lib/platform-messaging/services/message-sender.service.ts:4 |
| 2 | 3.4.2 (nx-mf-df/package.json:89) | 1 technology | manifest | events | technological | weak | declares #45 |
| 3 | 3.4.2 (nx-mf-df/package.json:91) | 1 technology | manifest | native-federation | technological | weak | — |
| 4 | 3.4.2 (nx-mf-df/package.json:31) | 1 technology | manifest | native-federation | technological | weak | declares #15; declares #16; declares #17; declares #18; declares #19; declares #20; declares #21; declares #22; declares #23; declares #24; declares #25; declares #26; declares #27; declares #32; declares #36 |
| 5 | 3.4.2 (nx-mf-df/package.json:40) | 1 technology | manifest | — | context | weak | — |
| 6 | 3.4.2 (nx-mf-df/package.json:41) | 1 technology | manifest | — | context | weak | — |
| 7 | 3.4.2 (nx-mf-df/package.json:42) | 1 technology | manifest | — | context | weak | — |
| 8 | 3.4.2 (nx-mf-df/package.json:43) | 1 technology | manifest | — | context | weak | — |
| 9 | 3.4.2 (nx-mf-df/package.json:44) | 1 technology | manifest | — | context | ambiguous | — |
| 10 | 3.4.2 (nx-mf-df/package.json:45) | 1 technology | manifest | — | context | weak | — |
| 11 | 3.4.2 (nx-mf-df/package.json:46) | 1 technology | manifest | — | context | weak | — |
| 12 | 3.4.2 (nx-mf-df/package.json:47) | 1 technology | manifest | — | context | weak | — |
| 13 | 3.4.2 (nx-mf-df/package.json:48) | 1 technology | manifest | — | context | weak | — |
| 14 | 3.4.2 (nx-mf-df/package.json:71) | 1 technology | manifest | — | context | weak | — |
| 15 | 3.4.2 (nx-mf-df/package.json:91) (Evidence); 3.4.2 (nx-mf-df/package.json:31) (Evidence); 3.4.3 (nx-mf-df/apps/main-host) (Markers, Build) | 2 configuration | configuration | native-federation | technological | moderate | configures #47 |
| 16 | 3.4.2 (nx-mf-df/package.json:31) (Evidence); 3.4.3 (nx-mf-df/apps/main-host) (Markers, Build); 3.4.6 #1 (Artifacts); 3.4.7 #20 (Evidence) | 2 configuration | configuration | native-federation | technological | moderate | configures #47 |
| 17 | 3.4.2 (nx-mf-df/package.json:31) (Evidence); 3.4.3 (nx-mf-df/apps/main-host) (Markers); 3.4.7 #20 (Evidence) | 2 configuration | configuration | native-federation | technological | moderate | configures #47 |
| 18 | 3.4.2 (nx-mf-df/package.json:31) (Evidence); 3.4.3 (nx-mf-df/apps/mf_remote_a) (Markers, Build); 3.4.4 (nx-mf-df/apps/main-host/src/app/app.routes.ts:14) (Observation); 3.4.4 (nx-mf-df/apps/mf_remote_a/src/main.ts:3) (Observation); 3.4.4 (nx-mf-df/apps/main-host/src/app/app.config.ts:31) (Observation); 3.4.5 #1 (Configuration); 3.4.7 #10 (Evidence) | 2 configuration | configuration | native-federation | technological | moderate | configures #49; configures #57 |
| 19 | 3.4.2 (nx-mf-df/package.json:31) (Evidence); 3.4.3 (nx-mf-df/apps/mf_remote_a) (Markers, Build); 3.4.6 #2 (Artifacts); 3.4.7 #20 (Evidence) | 2 configuration | configuration | native-federation | technological | moderate | configures #49 |
| 20 | 3.4.2 (nx-mf-df/package.json:31) (Evidence); 3.4.3 (nx-mf-df/apps/mf_remote_a) (Markers); 3.4.7 #20 (Evidence) | 2 configuration | configuration | native-federation | technological | moderate | configures #49 |
| 21 | 3.4.2 (nx-mf-df/package.json:31) (Evidence); 3.4.3 (nx-mf-df/apps/mf_remote_b) (Markers, Build); 3.4.4 (nx-mf-df/apps/main-host/src/app/app.routes.ts:19) (Observation); 3.4.4 (nx-mf-df/apps/mf_remote_b/src/main.ts:3) (Observation); 3.4.5 #2 (Configuration) | 2 configuration | configuration | native-federation | technological | moderate | configures #51; configures #58 |
| 22 | 3.4.2 (nx-mf-df/package.json:31) (Evidence); 3.4.3 (nx-mf-df/apps/mf_remote_b) (Markers, Build); 3.4.6 #3 (Artifacts) | 2 configuration | configuration | native-federation | technological | moderate | configures #51 |
| 23 | 3.4.2 (nx-mf-df/package.json:31) (Evidence); 3.4.3 (nx-mf-df/apps/mf_remote_b) (Markers) | 2 configuration | configuration | native-federation | technological | moderate | configures #51 |
| 24 | 3.4.2 (nx-mf-df/package.json:31) (Evidence); 3.4.3 (nx-mf-df/apps/mf_remote_c) (Markers, Build); 3.4.4 (nx-mf-df/apps/main-host/src/app/app.routes.ts:24) (Observation); 3.4.4 (nx-mf-df/apps/mf_remote_c/src/main.ts:3) (Observation); 3.4.5 #3 (Configuration) | 2 configuration | configuration | native-federation | technological | moderate | configures #53; configures #59 |
| 25 | 3.4.2 (nx-mf-df/package.json:31) (Evidence); 3.4.3 (nx-mf-df/apps/mf_remote_c) (Markers, Build); 3.4.6 #4 (Artifacts) | 2 configuration | configuration | native-federation | technological | moderate | configures #53 |
| 26 | 3.4.2 (nx-mf-df/package.json:31) (Evidence); 3.4.3 (nx-mf-df/apps/mf_remote_c) (Markers) | 2 configuration | configuration | native-federation | technological | moderate | configures #53 |
| 27 | 3.4.4 (nx-mf-df/apps/main-host/src/main.ts:3) (Observation); 3.4.5 #1 (Configuration); 3.4.5 #2 (Configuration); 3.4.5 #3 (Configuration) | 2 configuration | configuration | native-federation | architectural | strong | configures #37; configures #57; configures #58; configures #59 |
| 28 | 3.4.4 (nx-mf-df/apps/main-host/src/main.ts:5) | 3 code | source code | — | technological | weak | — |
| 29 | 3.4.4 (nx-mf-df/apps/mf_remote_a/src/main.ts:5) | 3 code | source code | — | technological | weak | — |
| 30 | 3.4.4 (nx-mf-df/apps/mf_remote_b/src/main.ts:5) | 3 code | source code | — | technological | weak | — |
| 31 | 3.4.4 (nx-mf-df/apps/mf_remote_c/src/main.ts:5) | 3 code | source code | — | technological | weak | — |
| 32 | 3.4.4 (nx-mf-df/apps/main-host/src/app/app.routes.ts:2) | 3 code | source code | native-federation | technological | moderate | implements #57; implements #58; implements #59 |
| 33 | 3.4.4 (nx-mf-df/apps/main-host/src/app/app.routes.ts:14) | 3 code | source code | native-federation | architectural | strong | implements #57 |
| 34 | 3.4.4 (nx-mf-df/apps/main-host/src/app/app.routes.ts:19) | 3 code | source code | native-federation | architectural | strong | implements #58 |
| 35 | 3.4.4 (nx-mf-df/apps/main-host/src/app/app.routes.ts:24) | 3 code | source code | native-federation | architectural | strong | implements #59 |
| 36 | 3.4.4 (nx-mf-df/apps/main-host/src/main.ts:1) | 3 code | source code | native-federation | technological | moderate | implements #57; implements #58; implements #59 |
| 37 | 3.4.4 (nx-mf-df/apps/main-host/src/main.ts:3) | 3 code | source code | native-federation | technological | moderate | implements #57; implements #58; implements #59 |
| 38 | 3.4.4 (nx-mf-df/apps/mf_remote_a/src/main.ts:1) | 3 code | source code | native-federation | technological | weak | — |
| 39 | 3.4.4 (nx-mf-df/apps/mf_remote_a/src/main.ts:3) | 3 code | source code | native-federation | technological | weak | — |
| 40 | 3.4.4 (nx-mf-df/apps/mf_remote_b/src/main.ts:1) | 3 code | source code | native-federation | technological | weak | — |
| 41 | 3.4.4 (nx-mf-df/apps/mf_remote_b/src/main.ts:3) | 3 code | source code | native-federation | technological | weak | — |
| 42 | 3.4.4 (nx-mf-df/apps/mf_remote_c/src/main.ts:1) | 3 code | source code | native-federation | technological | weak | — |
| 43 | 3.4.4 (nx-mf-df/apps/mf_remote_c/src/main.ts:3) | 3 code | source code | native-federation | technological | weak | — |
| 44 | 3.4.4 (nx-mf-df/apps/main-host/src/app/app.routes.ts:6) | 3 code | source code | native-federation | architectural | strong | implements #57; implements #58; implements #59 |
| 45 | 3.4.4 (nx-mf-df/apps/main-host/src/app/app.config.ts:31) | 3 code | source code | events | architectural | strong | implements #60; implements #61; implements #62 |
| 46 | 3.4.3 (nx-mf-df) | 4 structure | directory | — | context | weak | — |
| 47 | 3.4.3 (nx-mf-df/apps/main-host) | 4 structure | directory | native-federation | architectural | moderate | — |
| 48 | 3.4.3 (nx-mf-df/apps/main-host-e2e) | 4 structure | directory | — | context | weak | — |
| 49 | 3.4.3 (nx-mf-df/apps/mf_remote_a) | 4 structure | directory | native-federation | architectural | moderate | — |
| 50 | 3.4.3 (nx-mf-df/apps/mf_remote_a-e2e) | 4 structure | directory | — | context | weak | — |
| 51 | 3.4.3 (nx-mf-df/apps/mf_remote_b) | 4 structure | directory | native-federation | architectural | moderate | — |
| 52 | 3.4.3 (nx-mf-df/apps/mf_remote_b-e2e) | 4 structure | directory | — | context | weak | — |
| 53 | 3.4.3 (nx-mf-df/apps/mf_remote_c) | 4 structure | directory | native-federation | architectural | moderate | — |
| 54 | 3.4.3 (nx-mf-df/apps/mf_remote_c-e2e) | 4 structure | directory | — | context | weak | — |
| 55 | 3.4.3 (nx-mf-df/libs/common-ui-lib) | 4 structure | directory | — | context | weak | — |
| 56 | 3.4.3 (nx-mf-df/libs/contracts-platform-messaging) | 4 structure | directory | — | context | weak | — |
| 57 | 3.4.5 #1 | 5 composition | source code | native-federation | architectural | strong | links #47; links #49 |
| 58 | 3.4.5 #2 | 5 composition | source code | native-federation | architectural | strong | links #47; links #51 |
| 59 | 3.4.5 #3 | 5 composition | source code | native-federation | architectural | strong | links #47; links #53 |
| 60 | 3.4.5 #4 | 5 composition | source code | events | architectural | strong | links #47; links #49 |
| 61 | 3.4.5 #5 | 5 composition | source code | events | architectural | strong | links #47; links #51 |
| 62 | 3.4.5 #6 | 5 composition | source code | events | architectural | strong | links #47; links #53 |
| 63 | 3.4.6 #1 | 6 build-deploy | configuration | native-federation | architectural | moderate | publishes #47 |
| 64 | 3.4.6 #2 | 6 build-deploy | configuration | native-federation | architectural | moderate | publishes #49 |
| 65 | 3.4.6 #3 | 6 build-deploy | configuration | native-federation | architectural | moderate | publishes #51 |
| 66 | 3.4.6 #4 | 6 build-deploy | configuration | native-federation | architectural | moderate | publishes #53 |
| 67 | 3.4.7 #1 | 7 documentation | documentation | native-federation | technological | weak | partially corroborates nx-mf-df/pnpm-workspace.yaml:3-4; partially corroborates nx-mf-df/patches/@lkovari__microfrontend-platform-communication@0.3.2.patch:9-40 |
| 68 | 3.4.7 #2 | 7 documentation | documentation | events | architectural | weak | corroborates #45 |
| 69 | 3.4.7 #3 | 7 documentation | documentation | events | architectural | weak | corroborates nx-mf-df/apps/main-host/src/app/app.config.ts:52-53; corroborates nx-mf-df/apps/mf_remote_a/src/app/app.config.ts:28-29 |
| 70 | 3.4.7 #4 | 7 documentation | documentation | native-federation | architectural | weak | corroborates #47; corroborates #49; corroborates #51; corroborates #53; corroborates #57; corroborates #45 |
| 71 | 3.4.7 #5 | 7 documentation | documentation | — | architectural | weak | corroborates #44; corroborates #45 |
| 72 | 3.4.7 #6 | 7 documentation | documentation | native-federation | architectural | weak | corroborates #57; corroborates #58; corroborates #59 |
| 73 | 3.4.7 #7 | 7 documentation | documentation | — | context | weak | corroborates nx-mf-df/libs/contracts-platform-messaging/src/lib/platform-messaging-bus-config.ts:30-95 |
| 74 | 3.4.7 #8 | 7 documentation | documentation | — | context | weak | corroborates nx-mf-df/apps/mf_remote_a/src/app/app.ts:4-20; corroborates nx-mf-df/apps/main-host/src/app/app.config.ts:9-22 |
| 75 | 3.4.7 #9 | 7 documentation | documentation | events | technological | weak | corroborates #2; corroborates #45 |
| 76 | 3.4.7 #10 | 7 documentation | documentation | native-federation | architectural | weak | corroborates #57; corroborates #58; corroborates #59 |
| 77 | 3.4.7 #11 | 7 documentation | documentation | events | architectural | weak | corroborates #45 |
| 78 | 3.4.7 #12 | 7 documentation | documentation | events | architectural | weak | contradicts #45 |
| 79 | 3.4.7 #13 | 7 documentation | documentation | events | architectural | weak | corroborates nx-mf-df/libs/contracts-platform-messaging/src/lib/participant-ids.ts:1-32; corroborates #45 |
| 80 | 3.4.7 #14 | 7 documentation | documentation | events | architectural | weak | partially corroborates nx-mf-df/libs/common-ui-lib/src/lib/platform-messaging/services/platform-welcome-last-message.service.ts:66-75; partially corroborates nx-mf-df/libs/contracts-platform-messaging/src/lib/platform-messaging-bus-config.ts:47-87 |
| 81 | 3.4.7 #15 | 7 documentation | documentation | events | architectural | weak | corroborates nx-mf-df/apps/mf_remote_a/src/app/app.html:1-5; corroborates nx-mf-df/libs/common-ui-lib/src/lib/platform-messaging/services/message-sender.service.ts:26-29; corroborates nx-mf-df/libs/common-ui-lib/src/lib/platform-messaging/services/platform-welcome-last-message.service.ts:87-95 |
| 82 | 3.4.7 #16 | 7 documentation | documentation | events | architectural | weak | corroborates #45 |
| 83 | 3.4.7 #17 | 7 documentation | documentation | — | architectural | weak | corroborates nx-mf-df/scripts/start-all.mjs:9-17; corroborates nx-mf-df/scripts/start-all.mjs:113-121 |
| 84 | 3.4.7 #18 | 7 documentation | documentation | — | architectural | weak | corroborates #63; corroborates #64; corroborates #65; corroborates #66 |
| 85 | 3.4.7 #19 | 7 documentation | documentation | — | architectural | weak | corroborates #63; corroborates #64; corroborates #65; corroborates #66 |
| 86 | 3.4.7 #20 | 7 documentation | documentation | — | architectural | weak | corroborates #63; corroborates #64; corroborates #65; corroborates #66 |
| 87 | 3.4.7 #21 | 7 documentation | documentation | — | context | weak | corroborates nx-mf-df/nx.json:19-33; corroborates nx-mf-df/nx.json:41-54 |
| 88 | 3.4.7 #22 | 7 documentation | documentation | — | technological | weak | contradicts #2; contradicts nx-mf-df/pnpm-workspace.yaml:3-4 |
| 89 | 3.4.7 #23 | 7 documentation | documentation | events | architectural | weak | contradicts nx-mf-df/apps/main-host/src/app/shared/components/header/header.html:14-20; contradicts #60; contradicts #61; contradicts #62 |
| 90 | 3.4.7 #24 | 7 documentation | documentation | events | architectural | weak | corroborates nx-mf-df/apps/mf_remote_a/src/app/app.config.ts:19-30; corroborates nx-mf-df/libs/common-ui-lib/src/lib/platform-messaging/services/remote-platform-bus.service.ts:44-56 |
| 91 | 3.4.7 #25 | 7 documentation | documentation | events | technological | weak | — |
| 92 | 3.4.7 #26 | 7 documentation | documentation | events | architectural | weak | corroborates nx-mf-df/libs/common-ui-lib/src/lib/platform-messaging/services/remote-platform-bus.service.ts:59-72; corroborates #45 |
| 93 | 3.4.8 #1 | 8 history | history | native-federation | technological | weak | explains #3 |
| 94 | 3.4.8 #2 | 8 history | history | — | context | weak | explains #9 |
| 95 | 3.4.8 #3 | 8 history | history | — | context | weak | explains #13 |
| 96 | 3.4.8 #4 | 8 history | history | native-federation | technological | weak | explains #67 |
| 97 | 3.4.8 #5 | 8 history | history | events | architectural | weak | explains #78; explains #45 |
| 98 | 3.4.8 #6 | 8 history | history | events | architectural | weak | explains #80 |
| 99 | 3.4.8 #7 | 8 history | history | — | technological | weak | explains #88; explains #2 |
| 100 | 3.4.8 #8 | 8 history | history | events | architectural | weak | explains #89 |

## Summary

Observations: 100. Dimensions (technology: 14, configuration: 13, code: 18, structure: 11, composition: 6, build-deploy: 4, documentation: 26, history: 8). Strength (strong: 12, moderate: 23, weak: 64, ambiguous: 1). Evidence (technological: 36, architectural: 42, context: 22).
