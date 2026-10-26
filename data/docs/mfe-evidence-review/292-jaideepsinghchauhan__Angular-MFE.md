---
schema: 1
id: 1010507438
full_name: jaideepsinghchauhan/Angular-MFE
commit: 7648339ce74e8c78f86680e8ef8011e1010cc3e3
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

# 292 — jaideepsinghchauhan/Angular-MFE

## Repository overview

Main chain combines federation declarations (#2, #9), host configuration with two remotes (#16), webpack plugins (#17, #19, #21) and corresponding routes (#25, #26, #31). Relationships #44 and #45 link host to units mfe2/mfe1, whose entry/build boundaries in #36, #38 and #40. Shared-state channel implemented in #32, relationship in #46, preserving dependency on Nx wrapper default sharing recorded in 3.4.

Greeting route limits chain: #27 remains Undetermined because consumes key absent from #18 exposes. Does not undo main active mfe1 link. Tutorial claims about two loaded exposures/independence contradicted (#53, #57); history (#63, #64) shows initial discrepancy coexistence and stable serve dependency without proving abandonment.

Four frontend applications in structure review: default application #34 outside composition. Root, four test projects and two libraries not frontend units. Four builds separate (#47, #48, #49, #50), deployment not observed and no independent versioning recorded. Workspace tool dependencies context; three inconclusive historical points (#60, #61, #62) concern past declarations without changing snapshot. Documentary claims remain weak evidence even when corroborated.

## Observations

### 1. package.json:17

**Observation:** Manifest declares `@nx/angular: 21.2.0` in `dependencies`.

**Interpretation:** Angular workspace tool configured in targets; declaration alone demonstrates no composition. Configured: `Yes` in 3.4.2.

### 2. package.json:27

**Observation:** Manifest declares `@module-federation/enhanced: ^0.9.0` in `devDependencies`.

**Interpretation:** Module Federation signal; review records indirect configuration through Nx wrapper/lockfile link. Configured: `Yes` in 3.4.2.

### 3. package.json:28

**Observation:** Manifest declares `@nx/cypress: 21.2.0` in `devDependencies`.

**Interpretation:** Configured test tool without demonstrating frontend composition. Configured: `Yes` in 3.4.2.

### 4. package.json:29

**Observation:** Manifest declares `@nx/devkit: 21.2.0` in `devDependencies`.

**Interpretation:** Workspace utility used in test configurations without own MFE mechanism. Configured: `Yes` in 3.4.2.

### 5. package.json:30

**Observation:** Manifest declares `@nx/eslint: 21.2.0` in `devDependencies`.

**Interpretation:** Workspace-configured lint tool without own composition evidence. Configured: `Yes` in 3.4.2.

### 6. package.json:31

**Observation:** Manifest declares `@nx/eslint-plugin: 21.2.0` in `devDependencies`.

**Interpretation:** Configured static analysis plugin without establishing MFE architecture. Configured: `Yes` in 3.4.2.

### 7. package.json:32

**Observation:** Manifest declares `@nx/jest: 21.2.0` in `devDependencies`.

**Interpretation:** Configured test tool without establishing inter-application link. Configured: `Yes` in 3.4.2.

### 8. package.json:33

**Observation:** Manifest declares `@nx/js: 21.2.0` in `devDependencies`.

**Interpretation:** Declared tool without observed review usage; supports no MFE mechanism. Configured: `No` in 3.4.2.

### 9. package.json:34

**Observation:** Manifest declares `@nx/module-federation: 21.2.0` in `devDependencies`.

**Interpretation:** Module Federation signal with configuration recorded in own observations. Configured: `Yes` in 3.4.2.

### 10. package.json:35

**Observation:** Manifest declares `@nx/playwright: 21.2.0` in `devDependencies`.

**Interpretation:** Configured e2e tool without demonstrating composition. Configured: `Yes` in 3.4.2.

### 11. package.json:36

**Observation:** Manifest declares `@nx/web: 21.2.0` in `devDependencies`.

**Interpretation:** Configured local file server tool without establishing deployment/composition. Configured: `Yes` in 3.4.2.

### 12. package.json:37

**Observation:** Manifest declares `@nx/webpack: 21.2.0` in `devDependencies`.

**Interpretation:** Declared tool without observed usage; recorded build executors belong to @nx/angular. Configured: `No` in 3.4.2.

### 13. package.json:38

**Observation:** Manifest declares `@nx/workspace: 21.2.0` in `devDependencies`.

**Interpretation:** Declared workspace tool without observed usage or demonstrated composition. Configured: `No` in 3.4.2.

### 14. package.json:56

**Observation:** Manifest declares `nx: 21.2.0` in `devDependencies`.

**Interpretation:** Workspace CLI with invocation recorded in e2e configurations; alone no MFE mechanism. Configured: `Yes` in 3.4.2.

### 15. appshell/host/project.json:59-75

**Observation:** Serve target uses `@nx/angular:module-federation-dev-server`, selecting host:build:production or host:build:development.

**Interpretation:** Configures host federated development executor without declaring publication address.

**Note:** project.json build targets only connect generic webpack-browser executor to webpack files. Other servers, tsconfig.base.json aliases and test/lint plugins declare no composition elements, generating no configuration observations. Local ports only support.

### 16. appshell/host/module-federation.config.ts:3-18

**Observation:** Configuration declares `name: 'host'` and `remotes: ['mfe1', 'mfe2']`. External remote comment merely example.

**Interpretation:** Names two units resolved by host through Module Federation within workspace.

### 17. appshell/host/webpack.config.ts:1-9

**Observation:** Imports local federation configuration, exporting `withModuleFederation(config, { dts: false })`.

**Interpretation:** Applies federation plugin to host build. Block alone names no other unit.

### 18. appshell/mfe1/module-federation.config.ts:3-10

**Observation:** Declares `name: 'mfe1'`, exposing `./Routes` from appshell/mfe1/src/app/remote-entry/entry.routes.ts. Also exposes `./GreetingComponent` from src/app/greeting/greeting.component.ts; no `./GreetingRoutes` declaration.

**Interpretation:** Configures mfe1 unit exposures; configuration alone identifies no consumer.

### 19. appshell/mfe1/webpack.config.ts:1-9

**Observation:** Imports local federation configuration, exporting `withModuleFederation(config, { dts: false })`.

**Interpretation:** Applies federation plugin to mfe1 build. Block alone names no other unit.

### 20. appshell/mfe2/module-federation.config.ts:3-8

**Observation:** Declares `name: 'mfe2'`, exposing `./Routes` from appshell/mfe2/src/app/remote-entry/entry.routes.ts.

**Interpretation:** Configures mfe2 unit exposures; configuration alone identifies no consumer.

### 21. appshell/mfe2/webpack.config.ts:1-9

**Observation:** Imports local federation configuration, exporting `withModuleFederation(config, { dts: false })`.

**Interpretation:** Applies federation plugin to mfe2 build. Block alone names no other unit.

### 22. appshell/host/webpack.prod.config.ts:1-24

**Observation:** Invokes `withModuleFederation({ ...config }, { dts: false })`; production URL examples commented.

**Interpretation:** Reapplies host production federation configuration without adding publication URLs.

### 23. appshell/mfe1/webpack.prod.config.ts:1-24

**Observation:** Invokes `withModuleFederation({ ...config }, { dts: false })`; production URL examples commented.

**Interpretation:** Reapplies mfe1 production federation configuration without adding publication URLs.

### 24. appshell/mfe2/webpack.prod.config.ts:1-24

**Observation:** Invokes `withModuleFederation({ ...config }, { dts: false })`; production URL examples commented.

**Interpretation:** Reapplies mfe2 production federation configuration without adding publication URLs.

### 25. appshell/host/src/app/app.routes.ts:7

**Observation:** Route mfe2 uses `loadChildren` with `import('mfe2/Routes')`, selecting `remoteRoutes`.

**Interpretation:** Host loads mfe2 federated routes through navigation.

### 26. appshell/host/src/app/app.routes.ts:11

**Observation:** Route mfe1 uses `loadChildren` with `import('mfe1/Routes')`, selecting `remoteRoutes`.

**Interpretation:** Host loads mfe1 federated routes through navigation.

### 27. appshell/host/src/app/app.routes.ts:13-17; appshell/mfe1/module-federation.config.ts:5-9

**Observation:** Greeting route imports `mfe1/GreetingRoutes`, but mfe1 exposes are `./Routes` and `./GreetingComponent`.

**Interpretation:** Construct names remote but consumed key does not match exposure. May represent incomplete additional link or divergent configuration without effective route link; no support for confirmed loading. Composition Undetermined from 3.4.4 retained.

### 28. appshell/host/src/main.ts:1

**Observation:** Executes `import('./bootstrap')`, logging possible errors.

**Interpretation:** Internal asynchronous host bootstrap without loading another unit in construct.

### 29. appshell/mfe1/src/main.ts:1

**Observation:** Executes `import('./bootstrap')`, logging possible errors.

**Interpretation:** Internal asynchronous mfe1 bootstrap without loading another unit in construct.

### 30. appshell/mfe2/src/main.ts:1

**Observation:** Executes `import('./bootstrap')`, logging possible errors.

**Interpretation:** Internal asynchronous mfe2 bootstrap without loading another unit in construct.

### 31. appshell/host/src/app/app.routes.ts:4-22; appshell/host/src/app/app.config.ts:13; appshell/host/src/app/app.html:1-5; appshell/host/src/app/app.html:17

**Observation:** appRoutes associates mfe2, mfe1 and greeting paths with federated imports; provideRouter registers table, template contains navigation/router-outlet.

**Interpretation:** Table organizes host navigation composition. Two matching Routes support active relationships; greeting route retains #27 limitation.

### 32. libs/shared/data/src/lib/user.service.ts:3-20; appshell/host/src/app/app.ts:15-23; appshell/host/src/app/app.html:6-15; appshell/mfe1/src/app/remote-entry/nx-welcome.ts:9; appshell/mfe1/src/app/remote-entry/nx-welcome.ts:875-877; appshell/mfe1/src/app/remote-entry/entry.ts:3-8

**Observation:** Login/logout change UserService signal. Host calls methods; mfe1 NxWelcome injects service, reading/displaying value.

**Interpretation:** Reactive service implements channel recorded in 3.4.5. Inter-unit operation depends on Nx wrapper-shared instance without explicit shared in configurations.

### 33. .; package.json:1-6; nx.json:1-99

**Observation:** Root contains workspace manifest with empty scripts and Nx configuration without own UI entry/build.

**Interpretation:** Workspace coordination, Frontend unit No.

### 34. apps/angular-monorepo; apps/angular-monorepo/project.json:9-27; apps/angular-monorepo/src/main.ts:1-5

**Observation:** Project angular-monorepo has own entry/build target with specific outputPath. main.ts calls bootstrapApplication.

**Interpretation:** Frontend unit with own entry/build boundary, Frontend unit Yes. Does not participate in recorded composition relationships.

### 35. apps/angular-monorepo-e2e; apps/angular-monorepo-e2e/project.json:2-9; apps/angular-monorepo-e2e/cypress.config.ts:1-17

**Observation:** Nx project has empty explicit targets and e2e test configuration without UI entry/build.

**Interpretation:** Test project; Frontend unit No despite projectType application.

### 36. appshell/host; appshell/host/project.json:9-27; appshell/host/src/main.ts:1-1; appshell/host/src/bootstrap.ts:1-5; appshell/host/webpack.config.ts:1-9

**Observation:** Project host has own entry/build target with specific outputPath. main.ts imports bootstrap, calling bootstrapApplication.

**Interpretation:** Frontend unit with own entry/build boundary, Frontend unit Yes.

### 37. appshell/host-e2e; appshell/host-e2e/project.json:2-9; appshell/host-e2e/playwright.config.ts:17-31

**Observation:** Nx project has empty explicit targets and e2e test configuration without UI entry/build.

**Interpretation:** Test project; Frontend unit No despite projectType application.

### 38. appshell/mfe1; appshell/mfe1/project.json:9-27; appshell/mfe1/src/main.ts:1-1; appshell/mfe1/src/bootstrap.ts:1-5; appshell/mfe1/webpack.config.ts:1-9

**Observation:** Project mfe1 has own entry/build target with specific outputPath. main.ts imports bootstrap, calling bootstrapApplication.

**Interpretation:** Frontend unit with own entry/build boundary, Frontend unit Yes.

### 39. appshell/mfe1-e2e; appshell/mfe1-e2e/project.json:2-9; appshell/mfe1-e2e/playwright.config.ts:17-31

**Observation:** Nx project has empty explicit targets and e2e test configuration without UI entry/build.

**Interpretation:** Test project; Frontend unit No despite projectType application.

### 40. appshell/mfe2; appshell/mfe2/project.json:9-27; appshell/mfe2/src/main.ts:1-1; appshell/mfe2/src/bootstrap.ts:1-5; appshell/mfe2/webpack.config.ts:1-9

**Observation:** Project mfe2 has own entry/build target with specific outputPath. main.ts imports bootstrap, calling bootstrapApplication.

**Interpretation:** Frontend unit with own entry/build boundary, Frontend unit Yes.

### 41. appshell/mfe2-e2e; appshell/mfe2-e2e/project.json:2-9; appshell/mfe2-e2e/playwright.config.ts:17-31

**Observation:** Nx project has empty explicit targets and e2e test configuration without UI entry/build.

**Interpretation:** Test project; Frontend unit No despite projectType application.

### 42. libs/shared/data; libs/shared/data/project.json:2-19; libs/shared/data/src/index.ts:1

**Observation:** Project is library, exports UserService with only test/lint targets.

**Interpretation:** Shared library without application entry; Frontend unit No.

### 43. libs/shared/ui; libs/shared/ui/project.json:2-19; libs/shared/ui/src/index.ts:1

**Observation:** Project is library, exports Button with only test/lint targets.

**Interpretation:** Shared library without application entry; Frontend unit No.

### 44. appshell/host/src/app/app.routes.ts:7; appshell/host/src/app/app.routes.ts:4; appshell/host/module-federation.config.ts:17; appshell/mfe2/module-federation.config.ts:4-6; appshell/host/webpack.config.ts:1-9; appshell/mfe2/webpack.config.ts:1-9; appshell/host/project.json:25-26; appshell/mfe2/project.json:25-26; appshell/mfe2/src/app/remote-entry/entry.routes.ts:4

**Observation:** Host declares mfe2, imports mfe2/Routes and reads remoteRoutes exported by file exposed as ./Routes. Both builds apply withModuleFederation.

**Interpretation:** Active host → remote Module Federation relationship between host/mfe2.

### 45. appshell/host/src/app/app.routes.ts:11; appshell/host/src/app/app.routes.ts:4; appshell/host/module-federation.config.ts:17; appshell/mfe1/module-federation.config.ts:4-9; appshell/host/webpack.config.ts:1-9; appshell/mfe1/webpack.config.ts:1-9; appshell/host/project.json:25-26; appshell/mfe1/project.json:25-26; appshell/mfe1/src/app/remote-entry/entry.routes.ts:4; appshell/host/src/app/app.routes.ts:16

**Observation:** Host declares mfe1, imports mfe1/Routes and reads remoteRoutes exported by file exposed as ./Routes. Both builds apply withModuleFederation. Same remote named by GreetingRoutes import without corresponding exposed key.

**Interpretation:** Active host → remote Module Federation relationship between host/mfe1 through main route; additional greeting loading remains unsupported.

### 46. libs/shared/data/src/lib/user.service.ts:3-20; appshell/host/src/app/app.ts:15-23; appshell/host/src/app/app.html:6-15; appshell/mfe1/src/app/remote-entry/nx-welcome.ts:9; appshell/mfe1/src/app/remote-entry/nx-welcome.ts:875-877; appshell/host/webpack.config.ts:1-9; appshell/mfe1/webpack.config.ts:1-9; tsconfig.base.json:19

**Observation:** Host writes UserService signal; mfe1 reads state through same service injection. Data alias points to common library; builds use Nx wrapper without explicit shared.

**Interpretation:** Active communication relationship from host to mfe1, classified events in 3.4.5. Shared instance depends on Nx wrapper default behavior recorded in reviews.

### 47. apps/angular-monorepo/project.json:9-15; apps/angular-monorepo/project.json:75-82; package.json:3

**Observation:** Build target writes dist/apps/angular-monorepo. Uses @angular-devkit/build-angular:browser with local serve-static. Review records deployment not observed and Versioning No; root version 0.0.0.

**Interpretation:** Separate application build boundary without observed publication/independent version.

### 48. appshell/host/project.json:9-15; appshell/host/project.json:44-46; appshell/host/webpack.prod.config.ts:1-24; appshell/host/project.json:59-75; package.json:3

**Observation:** Build target writes dist/appshell/host. Uses @nx/angular:webpack-browser with own production webpack without added deployment URLs. Review records deployment not observed and Versioning No; root version 0.0.0.

**Interpretation:** Separate application build boundary without observed publication/independent version.

### 49. appshell/mfe1/project.json:9-15; appshell/mfe1/project.json:44-46; appshell/mfe1/webpack.prod.config.ts:1-24; appshell/mfe1/project.json:59-76; package.json:3

**Observation:** Build target writes dist/appshell/mfe1. Uses @nx/angular:webpack-browser with own production webpack without added deployment URLs. Serve target depends on host:serve. Review records deployment not observed and Versioning No; root version 0.0.0.

**Interpretation:** Separate application build boundary without observed publication/independent version. Serve dependency concerns development execution.

### 50. appshell/mfe2/project.json:9-15; appshell/mfe2/project.json:44-46; appshell/mfe2/webpack.prod.config.ts:1-24; appshell/mfe2/project.json:59-76; package.json:3

**Observation:** Build target writes dist/appshell/mfe2. Uses @nx/angular:webpack-browser with own production webpack without added deployment URLs. Serve target depends on host:serve. Review records deployment not observed and Versioning No; root version 0.0.0.

**Interpretation:** Separate application build boundary without observed publication/independent version. Serve dependency concerns development execution.

### 51. README.md:1

**Observation:** README presents host/Appshell, two MFEs and two libraries.

**Interpretation:** Describes federated group organization corroborated by units/relationships; not exhaustive whole-workspace inventory.

### 52. README.md:2

**Observation:** README assigns one library inter-MFE data sharing, other common HTML components.

**Interpretation:** Architectural claim corroborated by data channel/UI library imports without proving button rendered in mfe1.

### 53. README.md:3

**Observation:** README claims MFE exports two independent components, both loaded through routes.

**Interpretation:** Contradicted claim: GreetingComponent exposure does not match GreetingRoutes import. Main mfe1 relationship remains active.

### 54. README.md:134

**Observation:** README describes mapping two MFEs in host Module Federation configuration file.

**Interpretation:** Architectural claim corroborated by remote registration/exposures.

### 55. README.md:135

**Observation:** README says mapping local, URLs must be added to production configuration.

**Interpretation:** Claim acknowledges production gap corroborated by commented override/deployment-not-observed records.

### 56. README.md:140

**Observation:** README says host uses route lazy loading, loading navigated-to MFE.

**Interpretation:** Claim corroborated for two main routes without resolving additional route discrepancy.

### 57. README.md:250

**Observation:** README claims result works as independent standalone MFE.

**Interpretation:** Claim contradicted by recorded limits: mfe1 serve depends on host; federated greeting loading lacks matching exposure.

### 58. README.md:283

**Observation:** README describes same alias-based button import to incorporate in mfe1/mfe2, exemplifying mfe1.

**Interpretation:** Claim corroborated regarding library reuse within units; shared import creates no further composition relationship.

### 59. README.md:346

**Observation:** README describes injecting same service in MFE for login/logout data.

**Interpretation:** Claim corroborated by host-to-mfe1 state channel recorded in composition review.

### 60. f716548 2025-06-17 (package.json); 6a85acf 2025-06-29 (package.json)

**Observation:** Section 3.4.8 records package.json present in first commit, changed in second, unchanged afterward. Second version declares @nx/js; initial manifest unreadable due to missing object.

**Interpretation:** Inconclusive dependency past: does not distinguish unconfigured inclusion, inheritance or abandonment. Snapshot No clear; gap does not change architectural reading.

### 61. f716548 2025-06-17 (package.json); 6a85acf 2025-06-29 (package.json)

**Observation:** Section 3.4.8 records package.json present in first commit, changed in second, unchanged afterward. Second version declares @nx/webpack; initial manifest unreadable due to missing object.

**Interpretation:** Inconclusive dependency past: does not distinguish unconfigured inclusion, inheritance or abandonment. Snapshot No clear; gap does not change architectural reading.

### 62. f716548 2025-06-17 (package.json); 6a85acf 2025-06-29 (package.json)

**Observation:** Section 3.4.8 records package.json present in first commit, changed in second, unchanged afterward. Second version declares @nx/workspace; initial manifest unreadable due to missing object.

**Interpretation:** Inconclusive dependency past: does not distinguish unconfigured inclusion, inheritance or abandonment. Snapshot No clear; gap does not change architectural reading.

### 63. 6a85acf 2025-06-29 (appshell/host/src/app/app.routes.ts; appshell/mfe1/module-federation.config.ts); 0a0848e 2025-06-29 (README.md); 7648339 2025-06-29 (README.md)

**Observation:** History review records greeting files added in 6a85acf already consuming GreetingRoutes/exposing GreetingComponent, unchanged afterward. Intermediate README unavailable.

**Interpretation:** Point clarified regarding divergent keys coexisting since first artifact version. Demonstrates no abandonment or correction to Undetermined construct/contradicted claim.

### 64. 6a85acf 2025-06-29 (appshell/mfe1/project.json); 0a0848e 2025-06-29 (README.md); 7648339 2025-06-29 (README.md)

**Observation:** Section 3.4.8 records mfe1 project.json added already with dependsOn host:serve, unchanged afterward. Intermediate README unavailable.

**Interpretation:** Point clarified regarding stable execution target: no earlier dependency-free version in file explaining independence claim. Does not date phrase or attribute intent.

## Classification

| # | Origin | Dimension | Type | Approach | Evidence | Strength | Relationships |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.2 (package.json:17) | 1 technology | manifest | — | context | weak | declares #15 |
| 2 | 3.4.2 (package.json:27) | 1 technology | manifest | module-federation | technological | weak | declares #17; declares #19; declares #21 |
| 3 | 3.4.2 (package.json:28) | 1 technology | manifest | — | context | weak | — |
| 4 | 3.4.2 (package.json:29) | 1 technology | manifest | — | context | weak | — |
| 5 | 3.4.2 (package.json:30) | 1 technology | manifest | — | context | weak | — |
| 6 | 3.4.2 (package.json:31) | 1 technology | manifest | — | context | weak | — |
| 7 | 3.4.2 (package.json:32) | 1 technology | manifest | — | context | weak | — |
| 8 | 3.4.2 (package.json:33) | 1 technology | manifest | — | context | weak | — |
| 9 | 3.4.2 (package.json:34) | 1 technology | manifest | module-federation | technological | weak | declares #16; declares #17; declares #18; declares #19; declares #20; declares #21; declares #22; declares #23; declares #24 |
| 10 | 3.4.2 (package.json:35) | 1 technology | manifest | — | context | weak | — |
| 11 | 3.4.2 (package.json:36) | 1 technology | manifest | — | context | weak | — |
| 12 | 3.4.2 (package.json:37) | 1 technology | manifest | — | context | weak | — |
| 13 | 3.4.2 (package.json:38) | 1 technology | manifest | — | context | weak | — |
| 14 | 3.4.2 (package.json:56) | 1 technology | manifest | — | context | weak | — |
| 15 | 3.4.2 (package.json:17, Evidence); 3.4.3 (appshell/host, Markers) | 2 configuration | configuration | module-federation | technological | moderate | configures #36 |
| 16 | 3.4.2 (package.json:27,34, Evidence); 3.4.3 (appshell/host, Markers); 3.4.4 (appshell/host/src/app/app.routes.ts:7, Observation); 3.4.5 #1, #2 (Configuration); 3.4.7 #4, #5 (Evidence) | 2 configuration | configuration | module-federation | architectural | strong | configures #44; configures #45; configures #31; configures #25; configures #26; configures #27 |
| 17 | 3.4.2 (package.json:27,34, Evidence); 3.4.3 (appshell/host, Markers and Build); 3.4.5 #1, #2, #3 (Configuration) | 2 configuration | configuration | module-federation | technological | moderate | configures #36; configures #45; configures #44; configures #46 |
| 18 | 3.4.2 (package.json:27,34, Evidence); 3.4.3 (appshell/mfe1, Markers); 3.4.4 (appshell/host/src/app/app.routes.ts:11,16, Observation); 3.4.5 #2 (Configuration); 3.4.7 #3, #4, #7 (Evidence) | 2 configuration | configuration | module-federation | technological | moderate | configures #38; configures #45; configures #27 |
| 19 | 3.4.2 (package.json:27,34, Evidence); 3.4.3 (appshell/mfe1, Markers and Build); 3.4.5 #2, #3 (Configuration) | 2 configuration | configuration | module-federation | technological | moderate | configures #38; configures #45; configures #46 |
| 20 | 3.4.2 (package.json:27,34, Evidence); 3.4.3 (appshell/mfe2, Markers); 3.4.4 (appshell/host/src/app/app.routes.ts:7, Observation); 3.4.5 #1 (Configuration); 3.4.7 #4 (Evidence) | 2 configuration | configuration | module-federation | technological | moderate | configures #40; configures #44 |
| 21 | 3.4.2 (package.json:27,34, Evidence); 3.4.3 (appshell/mfe2, Markers and Build); 3.4.5 #1 (Configuration) | 2 configuration | configuration | module-federation | technological | moderate | configures #40; configures #44 |
| 22 | 3.4.2 (package.json:34, Evidence); 3.4.3 (appshell/host, Markers); 3.4.6 #2 (Artifacts); 3.4.7 #5 (Evidence) | 2 configuration | configuration | module-federation | technological | moderate | configures #36 |
| 23 | 3.4.2 (package.json:34, Evidence); 3.4.3 (appshell/mfe1, Markers) | 2 configuration | configuration | module-federation | technological | moderate | configures #38 |
| 24 | 3.4.2 (package.json:34, Evidence); 3.4.3 (appshell/mfe2, Markers) | 2 configuration | configuration | module-federation | technological | moderate | configures #40 |
| 25 | 3.4.4 (appshell/host/src/app/app.routes.ts:7) | 3 code | source code | module-federation | architectural | strong | implements #44 |
| 26 | 3.4.4 (appshell/host/src/app/app.routes.ts:11) | 3 code | source code | module-federation | architectural | strong | implements #45 |
| 27 | 3.4.4 (appshell/host/src/app/app.routes.ts:16) | 3 code | source code | module-federation | architectural | ambiguous | — |
| 28 | 3.4.4 (appshell/host/src/main.ts:1) | 3 code | source code | — | technological | weak | — |
| 29 | 3.4.4 (appshell/mfe1/src/main.ts:1) | 3 code | source code | — | technological | weak | — |
| 30 | 3.4.4 (appshell/mfe2/src/main.ts:1) | 3 code | source code | — | technological | weak | — |
| 31 | 3.4.4 (appshell/host/src/app/app.routes.ts:4) | 3 code | source code | module-federation | architectural | strong | implements #44; implements #45 |
| 32 | 3.4.4 (libs/shared/data/src/lib/user.service.ts:11) | 3 code | source code | events | architectural | moderate | implements #46 |
| 33 | 3.4.3 (.) | 4 structure | directory | — | context | weak | — |
| 34 | 3.4.3 (apps/angular-monorepo) | 4 structure | directory | — | architectural | moderate | — |
| 35 | 3.4.3 (apps/angular-monorepo-e2e) | 4 structure | directory | — | context | weak | — |
| 36 | 3.4.3 (appshell/host) | 4 structure | directory | — | architectural | moderate | — |
| 37 | 3.4.3 (appshell/host-e2e) | 4 structure | directory | — | context | weak | — |
| 38 | 3.4.3 (appshell/mfe1) | 4 structure | directory | — | architectural | moderate | — |
| 39 | 3.4.3 (appshell/mfe1-e2e) | 4 structure | directory | — | context | weak | — |
| 40 | 3.4.3 (appshell/mfe2) | 4 structure | directory | — | architectural | moderate | — |
| 41 | 3.4.3 (appshell/mfe2-e2e) | 4 structure | directory | — | context | weak | — |
| 42 | 3.4.3 (libs/shared/data) | 4 structure | directory | — | context | weak | — |
| 43 | 3.4.3 (libs/shared/ui) | 4 structure | directory | — | context | weak | — |
| 44 | 3.4.5 #1 | 5 composition | source code | module-federation | architectural | strong | links #36; links #40 |
| 45 | 3.4.5 #2 | 5 composition | source code | module-federation | architectural | strong | links #36; links #38 |
| 46 | 3.4.5 #3 | 5 composition | source code | events | architectural | strong | links #36; links #38 |
| 47 | 3.4.6 #1 | 6 build-deploy | configuration | — | architectural | moderate | publishes #34 |
| 48 | 3.4.6 #2 | 6 build-deploy | configuration | — | architectural | moderate | publishes #36 |
| 49 | 3.4.6 #3 | 6 build-deploy | configuration | — | architectural | moderate | publishes #38 |
| 50 | 3.4.6 #4 | 6 build-deploy | configuration | — | architectural | moderate | publishes #40 |
| 51 | 3.4.7 #1 | 7 documentation | documentation | — | architectural | weak | corroborates #36; corroborates #38; corroborates #40; corroborates #42; corroborates #43; corroborates #44; corroborates #45 |
| 52 | 3.4.7 #2 | 7 documentation | documentation | — | architectural | weak | corroborates #46; corroborates appshell/host/src/app/app.ts:4-9; corroborates appshell/mfe1/src/app/remote-entry/entry.ts:4-8 |
| 53 | 3.4.7 #3 | 7 documentation | documentation | — | architectural | weak | contradicts #18; contradicts appshell/host/src/app/app.routes.ts:9-17 |
| 54 | 3.4.7 #4 | 7 documentation | documentation | module-federation | architectural | weak | corroborates #16; corroborates #18; corroborates #20; corroborates #44; corroborates #45 |
| 55 | 3.4.7 #5 | 7 documentation | documentation | module-federation | architectural | weak | corroborates #22; corroborates #48; corroborates #49; corroborates #50 |
| 56 | 3.4.7 #6 | 7 documentation | documentation | — | architectural | weak | corroborates #25; corroborates #26; corroborates #44; corroborates #45 |
| 57 | 3.4.7 #7 | 7 documentation | documentation | — | architectural | weak | contradicts #49; contradicts appshell/mfe1/project.json:59-75; contradicts #18; contradicts appshell/host/src/app/app.routes.ts:13-17 |
| 58 | 3.4.7 #8 | 7 documentation | documentation | — | architectural | weak | corroborates tsconfig.base.json:18; corroborates appshell/host/src/app/app.ts:4-9; corroborates appshell/mfe1/src/app/remote-entry/entry.ts:4-6 |
| 59 | 3.4.7 #9 | 7 documentation | documentation | — | architectural | weak | corroborates #46; corroborates #32 |
| 60 | 3.4.8 #1 | 8 history | history | — | context | weak | explains #8 |
| 61 | 3.4.8 #2 | 8 history | history | — | context | weak | explains #12 |
| 62 | 3.4.8 #3 | 8 history | history | — | context | weak | explains #13 |
| 63 | 3.4.8 #4 | 8 history | history | module-federation | architectural | weak | explains #27; explains #18; explains #45; explains #53; explains #57 |
| 64 | 3.4.8 #5 | 8 history | history | — | architectural | weak | explains #49; explains #57 |

## Summary

Observations: 64. Dimensions (technology: 14, configuration: 10, code: 8, structure: 11, composition: 3, build-deploy: 4, documentation: 9, history: 5). Strength (strong: 7, moderate: 18, weak: 38, ambiguous: 1). Evidence (technological: 14, architectural: 28, context: 22).

