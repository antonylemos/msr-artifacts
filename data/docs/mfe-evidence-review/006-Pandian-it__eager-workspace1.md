---
schema: 1
id: 1036476677
full_name: Pandian-it/eager-workspace1
commit: 9ad83c2d39d410bab0e82efdebca145ebb04adbc
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

# 006 — Pandian-it/eager-workspace1

## Repository overview

Architecture is supported by a manifest-resolved Module Federation chain:
- **Dependency:** `@angular-architects/module-federation` (#1).
- **Configuration:**
  - three remotes declare themselves/expose `./Module` (#6 through #8);
  - shell declares three remotes/shares libraries as singletons (#5).
- **Manifests:** shell does not load through static webpack `remotes`. Reads one of two manifests: development direct URLs (#9), or production per-application versions (#10).
- **Code:** shell routes name each remote (#16 through #18, #24), calling one loader. Loader reads manifest, constructs URL and calls `loadRemoteModule` (#19 through #23, #25).
- **Relationships:** three active relationships result (#33 through #35).

Cart boundary is ambiguous (#27): standalone bootstrap uses module not defining UI startup. History shows arrangement since first commit (#49), without affecting cart remote role.

Build/deployment are repository’s strongest characteristic (#36 through #39). Each application has own build, publication and version through changesets release flow. Published version is what shell uses to construct remote URL (#10, #25).

Signals misleading in isolation:
- **Nx (#2 through #4):** monorepo tools rather than MFE, hence context. `@nx/workspace` is not even used.
- **Asynchronous bootstrap (#12 through #15):** internal to each unit.
- **Residual federation manifest (#11):** names nonexistent `mfe1` and `mfe2`, unread by code. History links it to initial Native Federation-compatible stage replaced by webpack (#50).
- **Contradicted documentation:** checkout comment claims unused `@shared-ui` (#45). CloudFront guide places shell/manifest where workflow does not publish (#43). History shows both started that way (#51, #52).

## Observations

### 1. package.json:37

**Observation:** `@angular-architects/module-federation` (`^20.0.0`) is declared in `devDependencies`.

**Interpretation:** Federation technology is present, used by configuration/code.

### 2. package.json:46; projects/shell/project.json:19-40

**Observation:** `@nx/angular` (`21.3.11`) is declared in `devDependencies`, the application `build` target executor.

**Interpretation:** Monorepo tool in use rather than MFE technology.

### 3. package.json:47

**Observation:** `@nx/workspace` (`21.3.11`) is declared in `devDependencies`, without import, executor or snapshot invocation.

**Interpretation:** Declared unused monorepo tool.

### 4. package.json:59; .github/workflows/User-Pull-Request.yml:36-54

**Observation:** `nx` (`21.3.11`) is declared in `devDependencies`. Workflows invoke `npx nx affected --target=build`.

**Interpretation:** Monorepo tool in use deciding which projects build.

### 5. projects/shell/webpack.config.js:1-36

**Observation:** `withModuleFederationPlugin` declares `name: 'shell'` and `remotes` for `cart`, `checkout` and `orders` at `http://localhost:4201` through `4203/remoteEntry.js`. Also shares dependencies through `shareAll`, declaring `@shared-lib` and `@shared-ui` as `eager` singletons.

**Interpretation:** Host configuration declares three remotes, loading shared libraries for them.

**Note:** Strength follows guidance for host configuration naming remotes, but runtime loading does not use these `remotes`. It uses manifests (#9, #10) through shell service. Each application’s `project.json`, cited in same table, only points generic executor `@nx/angular:webpack-browser` at this file, without declaring composition element. Hence no observation.

### 6. projects/cart/webpack.config.js:1-27

**Observation:** `withModuleFederationPlugin` declares `name: 'cart'`, exposing `./Module` (`mfe.module.ts`), sharing dependencies through `shareAll`, with `@shared-lib` as non-`eager` singleton.

**Interpretation:** Cart configured as remote offering module to host.

### 7. projects/checkout/webpack.config.js:1-35

**Observation:** `withModuleFederationPlugin` declares `name: 'checkout'`, exposing `./Module`, sharing dependencies through `shareAll`, with `@shared-lib` and `@shared-ui` as singletons.

**Interpretation:** Checkout configured as remote offering module to host.

### 8. projects/orders/webpack.config.js:1-27

**Observation:** `withModuleFederationPlugin` declares `name: 'orders'`, exposing `./Module`, sharing dependencies through `shareAll`, with `@shared-lib` singleton.

**Interpretation:** Orders configured as remote offering module to host.

### 9. projects/shell/public/mfe.manifest.json:1-5

**Observation:** Maps `orders`, `cart` and `checkout` to `http://localhost:4203`, `4201` and `4202/remoteEntry.js`.

**Interpretation:** Host configuration declares three remotes/development locations.

### 10. deployment-manifest.json:1-26

**Observation:** Records each project’s `version` and `release`: four applications/two libraries. Cart `1.0.5`, checkout `2.0.4`, orders `1.1.3`, shell `1.0.7`.

**Interpretation:** In production host resolves each remote through published version recorded in manifest.

### 11. projects/shell/public/federation.manifest.json:1-4

**Observation:** Maps `mfe1` and `mfe2` to `http://localhost:4202` and `4204/remoteEntry.json`. No shell code reads file.

**Interpretation:** Host configuration naming nonexistent snapshot remotes. Misleading signal left from another stage.

**Note:** Guidance would assign `strong` to host configuration naming remotes. Here strength is `weak`, because names match no unit and file does not participate in composition.

### 12. projects/cart/src/main.ts:1

**Observation:** `import('./bootstrap')`.

**Interpretation:** Asynchronous bootstrap internal to unit.

### 13. projects/checkout/src/main.ts:1

**Observation:** `import('./bootstrap')`.

**Interpretation:** Asynchronous bootstrap internal to unit.

### 14. projects/orders/src/main.ts:1

**Observation:** `import('./bootstrap')`.

**Interpretation:** Asynchronous bootstrap internal to unit.

### 15. projects/shell/src/main.ts:1

**Observation:** `import('./bootstrap')`.

**Interpretation:** Asynchronous bootstrap internal to shell.

### 16. projects/shell/src/app/app-routing.module.ts:9-14

**Observation:** Route `cart` calls `manifestService.loadRemoteModule('cart')`.

**Interpretation:** Shell loads cart at runtime by name.

### 17. projects/shell/src/app/app-routing.module.ts:16-21

**Observation:** Route `checkout` calls `manifestService.loadRemoteModule('checkout')`.

**Interpretation:** Shell loads checkout at runtime by name.

### 18. projects/shell/src/app/app-routing.module.ts:23-28

**Observation:** Route `orders` calls `manifestService.loadRemoteModule('orders')`.

**Interpretation:** Shell loads orders at runtime by name.

### 19. projects/shell/src/app/manifest.service.ts:4

**Observation:** Imports `loadRemoteModule` from `@angular-architects/module-federation`.

**Interpretation:** Remote-loading mechanism available in shell service.

### 20. projects/shell/src/app/manifest.service.ts:23-38

**Observation:** `loadManifest()` reads `mfe.manifest.json` on `localhost`, `<origem>/deployment-manifest.json` otherwise. English explanation: original path placeholder means origin.

**Interpretation:** Shell chooses remote-resolution source by environment.

### 21. projects/shell/src/app/manifest.service.ts:63-76

**Observation:** `loadRemoteModule(appName)` reads manifest, obtains URL and loads remote module.

**Interpretation:** One loader serves three remotes.

### 22. projects/shell/src/app/manifest.service.ts:65

**Observation:** `await this.loadManifest()` inside loader.

**Interpretation:** Manifest resolution precedes each remote load.

### 23. projects/shell/src/app/manifest.service.ts:71-75

**Observation:** `loadRemoteModule({ type: 'module', remoteEntry: remoteUrl, exposedModule: './Module' })` returns `m.MfeModule`.

**Interpretation:** Shell loads module exposed by parameter-specified remote.

### 24. projects/shell/src/app/app-routing.module.ts:8-28, 42

**Observation:** Host routes name `cart`, `checkout` and `orders`, registered through `RouterModule.forRoot`.

**Interpretation:** Host routing declares host → remotes relationship.

### 25. projects/shell/src/app/manifest.service.ts:40-59

**Observation:** `getRemoteUrl(appName)` returns direct manifest URL on `localhost`. In production constructs `<origem com www trocado por mfe>/apps/<app>/<versão>/remoteEntry.js`. English explanation: original placeholders denote origin with www replaced by mfe, application and version.

**Interpretation:** Host resolves each remote entry through published version.

### 26. .; package.json:1-17; package.json:4-6; nx.json:3-20

**Observation:** Workspace root (`workspaces: ["projects/*"]`), with Nx patterns and no UI entry/build.

**Interpretation:** Monorepo coordination root rather than unit.

### 27. projects/cart; projects/cart/package.json:1-5; projects/cart/project.json:19-24; projects/cart/src/bootstrap.ts:1-7; projects/cart/src/app/mfe.module.ts:8-19

**Observation:** Own manifest, entry and build target. `bootstrapModule(MfeModule)` uses module without `bootstrap` or `ngDoBootstrap`.

**Interpretation:** Ambiguous unit boundary: either standalone application or remote whose standalone entry does not start UI.

### 28. projects/checkout; projects/checkout/package.json:1-5; projects/checkout/project.json:20-25; projects/checkout/src/bootstrap.ts:1-7

**Observation:** Own manifest, entry and build target, with Angular bootstrap.

**Interpretation:** Frontend unit with own boundary.

### 29. projects/orders; projects/orders/package.json:1-5; projects/orders/project.json:19-24; projects/orders/src/bootstrap.ts:1-7

**Observation:** Own manifest, entry and build target, with Angular bootstrap.

**Interpretation:** Frontend unit with own boundary.

### 30. projects/shared-lib; projects/shared-lib/package.json:1-12; projects/shared-lib/project.json:4-11

**Observation:** Library with ng-packagr build and no application entry.

**Interpretation:** Shared library rather than frontend unit.

### 31. projects/shared-ui; projects/shared-ui/package.json:1-12; projects/shared-ui/project.json:4-11

**Observation:** Library with ng-packagr build and no application entry.

**Interpretation:** Shared library rather than frontend unit.

### 32. projects/shell; projects/shell/package.json:1-5; projects/shell/project.json:19-24; projects/shell/src/bootstrap.ts:1-7

**Observation:** Own manifest, entry and build target, with Angular bootstrap.

**Interpretation:** Frontend unit with own boundary.

### 33. projects/shell/src/app/app-routing.module.ts:13; projects/shell/src/app/manifest.service.ts:40-75; projects/shell/public/mfe.manifest.json:3; projects/cart/webpack.config.js:5-8

**Observation:** Route `cart` loads `./Module` from manifest-resolved remote `cart`. Name/module match cart configuration.

**Interpretation:** Active host → remote relationship.

### 34. projects/shell/src/app/app-routing.module.ts:20; projects/shell/src/app/manifest.service.ts:40-75; projects/shell/public/mfe.manifest.json:4; projects/checkout/webpack.config.js:5-8

**Observation:** Route `checkout` loads `./Module` from manifest-resolved remote `checkout`. Name/module match checkout configuration.

**Interpretation:** Active host → remote relationship.

### 35. projects/shell/src/app/app-routing.module.ts:27; projects/shell/src/app/manifest.service.ts:40-75; projects/shell/public/mfe.manifest.json:2; projects/orders/webpack.config.js:5-8

**Observation:** Route `orders` loads `./Module` from manifest-resolved remote `orders`. Name/module match orders configuration.

**Interpretation:** Active host → remote relationship.

### 36. projects/cart/project.json:19-24; .github/workflows/Push-Event-To-Release.yml:143-145, 158-162; projects/cart/package.json:3; deployment-manifest.json:22-25

**Observation:** Cart builds only when Nx marks it affected, publishing to S3 at `apps/cart/<versão>`. English explanation: original path placeholder means version. Version `1.0.5` recorded in manifest.

**Interpretation:** Own build, deployment and version boundaries.

### 37. projects/checkout/project.json:20-25; .github/workflows/Push-Event-To-Release.yml:143-145, 158-162; projects/checkout/package.json:3; deployment-manifest.json:10-13

**Observation:** Checkout follows same per-application loop, version `2.0.4`.

**Interpretation:** Own build, deployment and version boundaries.

### 38. projects/orders/project.json:19-24; .github/workflows/Push-Event-To-Release.yml:143-145, 158-162; projects/orders/package.json:3; deployment-manifest.json:14-17

**Observation:** Orders follows same per-application loop, version `1.1.3`.

**Interpretation:** Own build, deployment and version boundaries.

### 39. projects/shell/project.json:19-24; .github/workflows/Push-Event-To-Release.yml:143-145, 158-162; projects/shell/package.json:3; deployment-manifest.json:18-21

**Observation:** Shell publishes through same loop at `apps/shell/<versão>`, version `1.0.7`, in release different from remotes. English explanation: original path placeholder means version.

**Interpretation:** Own build, deployment and version boundaries. Snapshot does not show how shell becomes served at domain root.

### 40. .github/workflows/Initiate-Release.yml:50

**Observation:** "Run changesets/action to bump versions & open PR".

**Interpretation:** Describes per-package changesets versioning. Claim corroborated.

### 41. .github/workflows/Push-Event-To-Release.yml:137-139

**Observation:** "CASE A: Bot commit → Build, Deploy apps & manifest".

**Interpretation:** Describes build/publication of affected applications and manifest only. Claim corroborated.

### 42. cloudfront-spa-config.md:70-73

**Observation:** "This will resolve to URLs like: `https://yourdomain.com/apps/cart/v1.0.0/remoteEntry.js` […]".

**Interpretation:** Describes remote resolution by name/version. Claim corroborated.

### 43. cloudfront-spa-config.md:78-81

**Observation:** "s3://your-bucket/ ├── index.html (shell app) ├── deployment-manifest.json ├── apps/".

**Interpretation:** Places shell/manifest at bucket root. Workflow publishes elsewhere, making claim contradicted.

### 44. projects/cart/webpack.config.js:18

**Observation:** "Explicitly share the custom shared library".

**Interpretation:** Claims `@shared-lib` shared between units. Claim corroborated.

### 45. projects/checkout/webpack.config.js:26

**Observation:** "Also share @shared-ui since checkout uses it".

**Interpretation:** Claims checkout uses `@shared-ui`. It does not, making claim contradicted.

**Note:** Contradiction through absence: documentation review found no `shared-ui` reference in `projects/checkout/src` files. Absence has no `caminho:linha` (English translation: "path:line"), hence Relationships column `—`.

### 46. projects/shell/src/app/manifest.service.ts:51-54

**Observation:** "For localhost, mfe.manifest.json contains direct URLs […] For production, deployment-manifest.json contains version objects".

**Interpretation:** Describes two remote-resolving manifests. Claim corroborated.

### 47. projects/shell/src/app/manifest.service.ts:62

**Observation:** "Centralized method for loading remote modules".

**Interpretation:** Claims one method loads all remotes. Claim corroborated.

### 48. 69e232b 2025-08-12 (package.json, version absent); 3a75f71 2025-09-02 (package.json)

**Observation:** Nx enters in `69e232b`. Version from `3a75f71`, same as snapshot, declares `@nx/workspace`, while `69e232b` version unavailable.

**Interpretation:** Dependency introduction time/prior use unknown. Question concerns past only: unused in snapshot.

### 49. 85d75fe 2025-08-12 (projects/cart/src/app/mfe.module.ts, projects/cart/src/bootstrap.ts)

**Observation:** Both files unchanged since first commit.

**Interpretation:** Arrangement making cart ambiguous exists since first observed commit. Point clarified.

### 50. 85d75fe 2025-08-12 (projects/shell/public/federation.manifest.json, projects/*/federation.config.js); 3a75f71 2025-09-02 (projects/*/webpack.config.js)

**Observation:** Residual manifest arrives in first commit alongside four applications’ `federation.config.js`. In `3a75f71`, `federation.config.js` removed/replaced by `webpack.config.js`, manifest remaining.

**Interpretation:** Manifest belongs to initial Native Federation-compatible stage, left over in webpack switch. Point clarified.

### 51. 3a75f71 2025-09-02 (cloudfront-spa-config.md, .github/workflows/Push-Event-To-Release.yml)

**Observation:** Guide created in same commit making last workflow change through snapshot.

**Interpretation:** Guide/workflow coexist since then rather than different stages. Point clarified.

### 52. 3a75f71 2025-09-02 (projects/checkout/webpack.config.js, projects/checkout/src)

**Observation:** Comment originates in `3a75f71`, no available `projects/checkout/src` file at that commit referencing `shared-ui`.

**Interpretation:** Comment already mismatched checkout when written. Point clarified.

## Classification

| # | Origin | Dimension | Type | Approach | Evidence | Strength | Relationships |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.2 (package.json:37) | 1 technology | manifest | module-federation | technological | weak | declares #5; declares #6; declares #7; declares #8; declares #19 |
| 2 | 3.4.2 (package.json:46) | 1 technology | manifest | — | context | weak | — |
| 3 | 3.4.2 (package.json:47) | 1 technology | manifest | — | context | weak | — |
| 4 | 3.4.2 (package.json:59) | 1 technology | manifest | — | context | weak | — |
| 5 | 3.4.2 (package.json:37, Evidence); 3.4.3 (projects/shell, Markers); 3.4.5 #1, #2, #3 (Configuration) | 2 configuration | configuration | module-federation | architectural | strong | configures #32; configures #33; configures #34; configures #35 |
| 6 | 3.4.3 (projects/cart, Markers); 3.4.5 #1 (Configuration); 3.4.7 #5 (Evidence) | 2 configuration | configuration | module-federation | technological | moderate | configures #27; configures #33 |
| 7 | 3.4.3 (projects/checkout, Markers); 3.4.5 #2 (Configuration); 3.4.7 #6 (Document) | 2 configuration | configuration | module-federation | technological | moderate | configures #28; configures #34 |
| 8 | 3.4.3 (projects/orders, Markers); 3.4.5 #3 (Configuration) | 2 configuration | configuration | module-federation | technological | moderate | configures #29; configures #35 |
| 9 | 3.4.5 #1, #2, #3 (Configuration) | 2 configuration | configuration | module-federation | architectural | strong | configures #20; configures #33; configures #34; configures #35 |
| 10 | 3.4.6 #1, #2, #3, #4 (Artifacts); 3.4.7 #1, #7 (Evidence) | 2 configuration | configuration | module-federation | architectural | strong | configures #25; configures #33; configures #34; configures #35 |
| 11 | 3.4.8 #3 (Point) | 2 configuration | configuration | native-federation | technological | weak | — |
| 12 | 3.4.4 (projects/cart/src/main.ts:1) | 3 code | source code | — | technological | weak | — |
| 13 | 3.4.4 (projects/checkout/src/main.ts:1) | 3 code | source code | — | technological | weak | — |
| 14 | 3.4.4 (projects/orders/src/main.ts:1) | 3 code | source code | — | technological | weak | — |
| 15 | 3.4.4 (projects/shell/src/main.ts:1) | 3 code | source code | — | technological | weak | — |
| 16 | 3.4.4 (projects/shell/src/app/app-routing.module.ts:13) | 3 code | source code | module-federation | architectural | strong | implements #33 |
| 17 | 3.4.4 (projects/shell/src/app/app-routing.module.ts:20) | 3 code | source code | module-federation | architectural | strong | implements #34 |
| 18 | 3.4.4 (projects/shell/src/app/app-routing.module.ts:27) | 3 code | source code | module-federation | architectural | strong | implements #35 |
| 19 | 3.4.4 (projects/shell/src/app/manifest.service.ts:4) | 3 code | source code | module-federation | technological | moderate | implements #33; implements #34; implements #35 |
| 20 | 3.4.4 (projects/shell/src/app/manifest.service.ts:23) | 3 code | source code | module-federation | technological | moderate | implements #33; implements #34; implements #35 |
| 21 | 3.4.4 (projects/shell/src/app/manifest.service.ts:63) | 3 code | source code | module-federation | technological | moderate | implements #33; implements #34; implements #35 |
| 22 | 3.4.4 (projects/shell/src/app/manifest.service.ts:65) | 3 code | source code | module-federation | technological | moderate | implements #33; implements #34; implements #35 |
| 23 | 3.4.4 (projects/shell/src/app/manifest.service.ts:71) | 3 code | source code | module-federation | technological | moderate | implements #33; implements #34; implements #35 |
| 24 | 3.4.4 (projects/shell/src/app/app-routing.module.ts:8) | 3 code | source code | module-federation | architectural | strong | implements #33; implements #34; implements #35 |
| 25 | 3.4.4 (projects/shell/src/app/manifest.service.ts:40) | 3 code | source code | module-federation | technological | moderate | implements #33; implements #34; implements #35 |
| 26 | 3.4.3 (.) | 4 structure | directory | — | context | weak | — |
| 27 | 3.4.3 (projects/cart) | 4 structure | directory | — | architectural | ambiguous | — |
| 28 | 3.4.3 (projects/checkout) | 4 structure | directory | — | architectural | moderate | — |
| 29 | 3.4.3 (projects/orders) | 4 structure | directory | — | architectural | moderate | — |
| 30 | 3.4.3 (projects/shared-lib) | 4 structure | directory | — | context | weak | — |
| 31 | 3.4.3 (projects/shared-ui) | 4 structure | directory | — | context | weak | — |
| 32 | 3.4.3 (projects/shell) | 4 structure | directory | — | architectural | moderate | — |
| 33 | 3.4.5 #1 | 5 composition | source code | module-federation | architectural | strong | links #32; links #27 |
| 34 | 3.4.5 #2 | 5 composition | source code | module-federation | architectural | strong | links #32; links #28 |
| 35 | 3.4.5 #3 | 5 composition | source code | module-federation | architectural | strong | links #32; links #29 |
| 36 | 3.4.6 #1 | 6 build-deploy | CI | — | architectural | moderate | publishes #27 |
| 37 | 3.4.6 #2 | 6 build-deploy | CI | — | architectural | moderate | publishes #28 |
| 38 | 3.4.6 #3 | 6 build-deploy | CI | — | architectural | moderate | publishes #29 |
| 39 | 3.4.6 #4 | 6 build-deploy | CI | — | architectural | moderate | publishes #32 |
| 40 | 3.4.7 #1 | 7 documentation | comment | — | architectural | weak | corroborates #36; corroborates #37; corroborates #38; corroborates #39; corroborates #10 |
| 41 | 3.4.7 #2 | 7 documentation | comment | — | architectural | weak | corroborates #36; corroborates #37; corroborates #38; corroborates #39 |
| 42 | 3.4.7 #3 | 7 documentation | documentation | module-federation | architectural | weak | corroborates #25; corroborates .github/workflows/Push-Event-To-Release.yml:162 |
| 43 | 3.4.7 #4 | 7 documentation | documentation | — | architectural | weak | contradicts #39; contradicts .github/workflows/Push-Event-To-Release.yml:167 |
| 44 | 3.4.7 #5 | 7 documentation | comment | module-federation | architectural | weak | corroborates #6; corroborates projects/cart/src/app/app.component.ts:3; corroborates projects/checkout/src/app/app.component.ts:2; corroborates projects/orders/src/app/app.component.ts:2; corroborates projects/shell/src/app/app.component.ts:2 |
| 45 | 3.4.7 #6 | 7 documentation | comment | module-federation | architectural | weak | — |
| 46 | 3.4.7 #7 | 7 documentation | comment | module-federation | architectural | weak | corroborates #9; corroborates #10; corroborates #25 |
| 47 | 3.4.7 #8 | 7 documentation | comment | module-federation | architectural | weak | corroborates #21; corroborates #16; corroborates #17; corroborates #18 |
| 48 | 3.4.8 #1 | 8 history | history | — | context | weak | explains #3 |
| 49 | 3.4.8 #2 | 8 history | history | — | architectural | weak | explains #27 |
| 50 | 3.4.8 #3 | 8 history | history | native-federation | technological | weak | explains #11 |
| 51 | 3.4.8 #4 | 8 history | history | — | architectural | weak | explains #43 |
| 52 | 3.4.8 #5 | 8 history | history | — | architectural | weak | explains #45 |

## Summary

Observations: 52. Dimensions (technology: 4, configuration: 7, code: 14, structure: 7, composition: 3, build-deploy: 4, documentation: 8, history: 5). Strength (strong: 10, moderate: 16, weak: 25, ambiguous: 1). Evidence (technological: 16, architectural: 29, context: 7).

