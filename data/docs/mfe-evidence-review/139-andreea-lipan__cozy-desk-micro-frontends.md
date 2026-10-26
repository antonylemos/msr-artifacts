---
schema: 1
id: 1134331975
full_name: andreea-lipan/cozy-desk-micro-frontends
commit: 7050669405cfdce6e0bf593fdfdb4d94ef5ad5dc
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

# 139 — andreea-lipan/cozy-desk-micro-frontends

## Repository overview

Angular micro frontend tutorial with three sibling root projects and no common workspace: host `test-base` and remotes `tea-tracker` and `sticky-notes`. Architecture is supported by complete Native Federation chain:
- **Dependency:** `@angular-architects/native-federation`, declared in three packages (#1, #3, #5).
- **Configuration:**
  - `build` and `serve` targets of three `angular.json` files use federation builder (#7, #8, #10, #11, #13, #14);
  - in `federation.config.js` files, remotes expose `./App`, and three applications share dependencies with `shareAll` (#9, #12, #15);
  - host manifest gives both remote addresses (#16).
- **Code:** host initializes federation with manifest (#27, #28) and, in routes, loads each remote's `./App` by name (#24 through #26, #29).
- **Relationships:** two active relationships result, test-base → sticky-notes and test-base → tea-tracker (#33, #34), linking three units with confirmed boundaries (#30 through #32).

Three projects have separate builds (#35 through #37), but no deployment artifact: manifest URLs are development servers, and composition only works with all three running. Separate publication does not appear in repository.

Two signals misleading when read alone:
- **Unused dependency:** `@softarc/native-federation-node` is declared in three packages and unused (#2, #4, #6). History shows code never changed since first commit, and dependency was never used in repository (#54).
- **Initializations without composition:** remotes also call `initFederation` and perform asynchronous bootstrap (#17 through #23, except #19). Federation constructs serving only standalone execution of unit itself.

No architectural ambiguity. Documentation is a tutorial README with 16 claims, all weak under protocol criterion (#38 through #53): 15 corroborated and 1 uncorroborated, micro frontends being "independently deployable" (#39), neither confirmed nor refuted by snapshot.

## Observations

### 1. sticky-notes/package.json:26

**Observation:** `@angular-architects/native-federation` (`^21.0.4`) is declared in `dependencies` of package `sticky-notes`.

**Interpretation:** Federation technology is present in sticky-notes. Unit configuration and code use it.

### 2. sticky-notes/package.json:34

**Observation:** `@softarc/native-federation-node` (`^3.3.4`) is declared in `dependencies` of package `sticky-notes`. No import or invocation in snapshot code or build files.

**Interpretation:** Federation technology declared but unused. A misleading signal.

### 3. tea-tracker/package.json:26

**Observation:** `@angular-architects/native-federation` (`^21.0.4`) is declared in `dependencies` of package `tea-tracker`.

**Interpretation:** Federation technology is present in tea-tracker. Unit configuration and code use it.

### 4. tea-tracker/package.json:34

**Observation:** `@softarc/native-federation-node` (`^3.3.4`) is declared in `dependencies` of package `tea-tracker`. No import or invocation in snapshot code or build files.

**Interpretation:** Federation technology declared but unused. A misleading signal.

### 5. test-base/package.json:26

**Observation:** `@angular-architects/native-federation` (`^21.0.4`) is declared in `dependencies` of package `test-base`.

**Interpretation:** Federation technology is present in host. Unit configuration and code use it.

### 6. test-base/package.json:34

**Observation:** `@softarc/native-federation-node` (`^3.3.4`) is declared in `dependencies` of package `test-base`. No import or invocation in snapshot code or build files.

**Interpretation:** Federation technology declared but unused. A misleading signal.

### 7. sticky-notes/angular.json:16-29

**Observation:** Target `build` of project `sticky-notes` uses builder `@angular-architects/native-federation:build` over target `esbuild`, defaulting to `production`.

**Interpretation:** Build of sticky-notes is configured for Native Federation.

### 8. sticky-notes/angular.json:30-39

**Observation:** Target `serve` of project `sticky-notes` uses builder `@angular-architects/native-federation:build` in `dev` mode, over target `serve-original`.

**Interpretation:** Development server of sticky-notes goes through federation, allowing standalone execution.

### 9. sticky-notes/federation.config.js:1-31

**Observation:** `withNativeFederation` declares `name: 'sticky-notes'`, exposes `./App` (`./src/app/app.ts`) and configures `shared` with `shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' })`. Also declares exclusions in `skip` and `ignoreUnusedDeps: true`.

**Interpretation:** sticky-notes is configured as remote, offers root component to a host and configures dependency sharing with declared exclusions.

### 10. tea-tracker/angular.json:16-29

**Observation:** Target `build` of project `tea-tracker` uses builder `@angular-architects/native-federation:build` over target `esbuild`, defaulting to `production`.

**Interpretation:** Build of tea-tracker is configured for Native Federation.

### 11. tea-tracker/angular.json:30-39

**Observation:** Target `serve` of project `tea-tracker` uses builder `@angular-architects/native-federation:build` in `dev` mode, over target `serve-original`.

**Interpretation:** Development server of tea-tracker goes through federation, allowing standalone execution.

### 12. tea-tracker/federation.config.js:1-31

**Observation:** `withNativeFederation` declares `name: 'tea-tracker'`, exposes `./App` (`./src/app/app.ts`) and configures `shared` with `shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' })`. Also declares exclusions in `skip` and `ignoreUnusedDeps: true`.

**Interpretation:** tea-tracker is configured as remote, offers root component to a host and configures dependency sharing with declared exclusions.

### 13. test-base/angular.json:16-29

**Observation:** Target `build` of project `test-base` uses builder `@angular-architects/native-federation:build` over target `esbuild`, defaulting to `production`.

**Interpretation:** Build of host is configured for Native Federation.

### 14. test-base/angular.json:30-39

**Observation:** Target `serve` of project `test-base` uses builder `@angular-architects/native-federation:build` in `dev` mode, over target `serve-original`.

**Interpretation:** Development server of host goes through federation.

### 15. test-base/federation.config.js:1-27

**Observation:** `withNativeFederation` declares `name: 'test-base'`, without exposing modules, and configures `shared` with `shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' })`. Also declares exclusions in `skip` and `ignoreUnusedDeps: true`.

**Interpretation:** Host is configured as federation participant and configures dependency sharing with declared exclusions.

### 16. test-base/public/federation.manifest.json:2-3

**Observation:** Host manifest maps `tea-tracker` to `http://localhost:4222/remoteEntry.json` and `sticky-notes` to `http://localhost:4333/remoteEntry.json`.

**Interpretation:** Host configuration declares both remotes and where to find them. Addresses are development servers.

### 17. sticky-notes/src/main.ts:5

**Observation:** `import('./bootstrap')` after `initFederation()` (sticky-notes/src/main.ts:3-5).

**Interpretation:** An asynchronous bootstrap internal to unit, composing no other unit.

### 18. tea-tracker/src/main.ts:5

**Observation:** `import('./bootstrap')` after `initFederation()` (tea-tracker/src/main.ts:3-5).

**Interpretation:** An asynchronous bootstrap internal to unit, composing no other unit.

### 19. test-base/src/main.ts:5

**Observation:** `import('./bootstrap')` after `initFederation('federation.manifest.json')` (test-base/src/main.ts:3-5).

**Interpretation:** An asynchronous bootstrap internal to host. Composition is in rows #27 and #28.

### 20. sticky-notes/src/main.ts:1

**Observation:** Imports `initFederation` from `@angular-architects/native-federation`.

**Interpretation:** Prepares federation runtime for standalone execution of unit itself.

### 21. sticky-notes/src/main.ts:3

**Observation:** `initFederation()`, without manifest or remotes.

**Interpretation:** Standalone runtime resolves no other unit. sticky-notes only exposes `./App` (#9).

### 22. tea-tracker/src/main.ts:1

**Observation:** Imports `initFederation` from `@angular-architects/native-federation`.

**Interpretation:** Prepares federation runtime for standalone execution of unit itself.

### 23. tea-tracker/src/main.ts:3

**Observation:** `initFederation()`, without manifest or remotes.

**Interpretation:** Standalone runtime resolves no other unit. tea-tracker only exposes `./App` (#12).

### 24. test-base/src/app/app.routes.ts:3

**Observation:** Imports `loadRemoteModule` from `@angular-architects/native-federation`. Routes `tea-tracker` and `sticky-notes` use it (test-base/src/app/app.routes.ts:14, 18).

**Interpretation:** Remote loading mechanism is available in host routes.

### 25. test-base/src/app/app.routes.ts:12-15

**Observation:** Route `tea-tracker` has `loadComponent: () => loadRemoteModule('tea-tracker', './App').then((m) => m.App)`.

**Interpretation:** Host loads tea-tracker root component at runtime when route is visited.

### 26. test-base/src/app/app.routes.ts:16-19

**Observation:** Route `sticky-notes` has `loadComponent: () => loadRemoteModule('sticky-notes', './App').then((m) => m.App)`.

**Interpretation:** Host loads sticky-notes root component at runtime when route is visited.

### 27. test-base/src/main.ts:1

**Observation:** Imports `initFederation` from `@angular-architects/native-federation`.

**Interpretation:** Host federation runtime is available.

### 28. test-base/src/main.ts:3-5

**Observation:** `initFederation('federation.manifest.json')` before bootstrap.

**Interpretation:** Host resolves remote entries through manifest before starting.

### 29. test-base/src/app/app.routes.ts:5-20; test-base/src/app/app.config.ts:9; test-base/src/app/app.html:12, 17, 26

**Observation:** Host routes declare `home-page` and, under comment "// The Micro Frontends", routes `tea-tracker` and `sticky-notes`. Routes are registered through `provideRouter(routes)`. Host menu has `routerLink` for both routes, and content appears in `<router-outlet>`.

**Interpretation:** Host routing declares host → remotes relationship and connects it to page navigation.

### 30. sticky-notes; sticky-notes/package.json:1-48; sticky-notes/angular.json:46; sticky-notes/src/main.ts:3-5; sticky-notes/src/bootstrap.ts:5; sticky-notes/angular.json:16-29

**Observation:** Angular project with its own package, entry (`main.ts` → `bootstrap.ts`) and build target, served in development on port 4333.

**Interpretation:** Frontend unit with its own boundary.

### 31. tea-tracker; tea-tracker/package.json:1-48; tea-tracker/angular.json:46; tea-tracker/src/main.ts:3-5; tea-tracker/src/bootstrap.ts:5; tea-tracker/angular.json:16-29

**Observation:** Angular project with its own package, entry (`main.ts` → `bootstrap.ts`) and build target, served in development on port 4222.

**Interpretation:** Frontend unit with its own boundary.

### 32. test-base; test-base/package.json:1-48; test-base/angular.json:46; test-base/src/main.ts:3-5; test-base/src/bootstrap.ts:5; test-base/angular.json:16-29

**Observation:** Angular project with its own package, entry (`main.ts` → `bootstrap.ts`) and build target, served in development on port 4200.

**Interpretation:** Frontend unit with its own boundary.

### 33. test-base/src/app/app.routes.ts:16-18; test-base/public/federation.manifest.json:3; sticky-notes/federation.config.js:4-8

**Observation:** Host loads `./App` from `sticky-notes` at route `sticky-notes`. Name is resolved through manifest and matches name and exposed module in sticky-notes configuration.

**Interpretation:** An active host → remote relationship.

### 34. test-base/src/app/app.routes.ts:12-14; test-base/public/federation.manifest.json:2; tea-tracker/federation.config.js:4-8

**Observation:** Host loads `./App` from `tea-tracker` at route `tea-tracker`. Name is resolved through manifest and matches name and exposed module in tea-tracker configuration.

**Interpretation:** An active host → remote relationship.

### 35. sticky-notes/angular.json:16-29; sticky-notes/angular.json:43-84; sticky-notes/package.json:7

**Observation:** Project `ng build` generates its own artifact, with federation builder over `@angular/build:application`. No deployment artifact; sole address is development server on port 4333. Package is `private`, version `0.0.0`.

**Interpretation:** sticky-notes has separate build. Deployment unobservable, and no own versioning.

### 36. tea-tracker/angular.json:16-29; tea-tracker/angular.json:43-84; tea-tracker/package.json:7

**Observation:** Project `ng build` generates its own artifact, with federation builder over `@angular/build:application`. No deployment artifact; sole address is development server on port 4222. Package is `private`, version `0.0.0`.

**Interpretation:** tea-tracker has separate build. Deployment unobservable, and no own versioning.

### 37. test-base/angular.json:16-29; test-base/angular.json:43-84; test-base/package.json:7

**Observation:** Host `ng build` generates its own artifact, copying `public/` with federation manifest without remote code. No deployment artifact; manifest points to `localhost`. Package is `private`, version `0.0.0`.

**Interpretation:** Host has separate build and loads remotes at runtime. Deployment unobservable, and manifest URLs only serve local environment.

### 38. README.md:35-38

**Observation:** "In our example project, we'll build: A **base app** serving as our digital desktop; A **tea tracker** micro frontend [...]; A **sticky notes** micro frontend".

**Interpretation:** Describes a host and two micro frontends. Claim corroborated.

### 39. README.md:88

**Observation:** "a working digital desktop with two independently deployable micro frontends".

**Interpretation:** Claims independent unit deployment. Snapshot has no deployment artifact, and claim remains uncorroborated.

### 40. README.md:93

**Observation:** "the Tea Tracker micro frontend - a standalone Angular application".

**Interpretation:** Describes tea-tracker as independent application. Claim corroborated.

### 41. README.md:143-144

**Observation:** "Native Federation is the technology that enables micro frontends. It allows multiple Angular applications to share code and components at runtime."

**Interpretation:** Names project composition technology. Claim corroborated.

### 42. README.md:173

**Observation:** "Choose \"remote\" because this micro frontend will be loaded BY another application (the base app we'll create later)".

**Interpretation:** Assigns tea-tracker role of remote loaded by host. Claim corroborated.

### 43. README.md:187

**Observation:** "Creates `federation.config.js` - defines what this app exposes to other apps".

**Interpretation:** Describes federation configuration as location of exposed modules. Claim corroborated.

### 44. README.md:188

**Observation:** "Updates `angular.json` - adds federation build configuration".

**Interpretation:** Describes build configured for federation. Claim corroborated.

### 45. README.md:276-277

**Observation:** "**`shared`**: Which dependencies are shared between apps / `singleton: true`: Only one instance of shared libraries".

**Interpretation:** Describes dependency sharing between applications. Claim corroborated.

### 46. README.md:288

**Observation:** "the main application - our digital desktop - that will host all micro frontends".

**Interpretation:** Assigns host role to base app. Claim corroborated.

### 47. README.md:329

**Observation:** "To add your micro frontends to this app we will use routing".

**Interpretation:** Describes composition through host routes. Claim corroborated.

### 48. README.md:357

**Observation:** "Uses `loadRemoteModule()` to dynamically load the remote micro frontend".

**Interpretation:** Describes runtime remote loading through host route. Claim corroborated.

### 49. README.md:364

**Observation:** "The manifest file tells the base app where to find each micro frontend."

**Interpretation:** Describes manifest as host remote resolution. Claim corroborated.

### 50. README.md:401-404

**Observation:** "**`initFederation()`**: Initializes the federation system / Loads the manifest file / Discovers available micro frontends".

**Interpretation:** Describes host federation initialization with manifest. Claim corroborated.

### 51. README.md:413

**Observation:** "You need BOTH applications running simultaneously. This is crucial for micro frontends to work."

**Interpretation:** Describes host runtime dependency on remote servers. Claim corroborated.

### 52. README.md:440-441

**Observation:** "I can see my home page, from my base app and I can see the two separate micro frontends from the same application."

**Interpretation:** Describes both remotes composed in host. Claim corroborated.

### 53. README.md:445-447

**Observation:** "When you clicked \"Tea Tracker\", it dynamically fetched the code from port 4222 / The micro frontend loaded seamlessly into the base app / All without a page refresh!"

**Interpretation:** Describes tea-tracker loading at runtime inside host. Claim corroborated.

### 54. 6e2d0ab 2026-01-14 (sticky-notes/package.json, tea-tracker/package.json, test-base/package.json); 0a2cc14 2026-01-14 (README.md); 7050669 2026-01-14 (README.md)

**Observation:** Three `package.json` files only appear in first commit, with same object identifiers as snapshot. Next two commits only change `README.md`.

**Interpretation:** Snapshot code matches first commit, where dependency is only declared: in observable history, it was never used. History does not say why it was declared.

## Classification

| # | Origin | Dimension | Type | Approach | Evidence | Strength | Relationships |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.2 (sticky-notes/package.json:26) | 1 technology | manifest | native-federation | technological | weak | declares #7; declares #8; declares #9; declares #20 |
| 2 | 3.4.2 (sticky-notes/package.json:34) | 1 technology | manifest | native-federation | technological | weak | — |
| 3 | 3.4.2 (tea-tracker/package.json:26) | 1 technology | manifest | native-federation | technological | weak | declares #10; declares #11; declares #12; declares #22 |
| 4 | 3.4.2 (tea-tracker/package.json:34) | 1 technology | manifest | native-federation | technological | weak | — |
| 5 | 3.4.2 (test-base/package.json:26) | 1 technology | manifest | native-federation | technological | weak | declares #13; declares #14; declares #15; declares #24; declares #27 |
| 6 | 3.4.2 (test-base/package.json:34) | 1 technology | manifest | native-federation | technological | weak | — |
| 7 | 3.4.2 (sticky-notes/package.json:26, Evidence); 3.4.3 (sticky-notes, Markers); 3.4.3 (sticky-notes, Build); 3.4.6 #1 (Artifacts) | 2 configuration | configuration | native-federation | technological | moderate | configures #30 |
| 8 | 3.4.2 (sticky-notes/package.json:26, Evidence); 3.4.3 (sticky-notes, Markers) | 2 configuration | configuration | native-federation | technological | moderate | configures #30 |
| 9 | 3.4.2 (sticky-notes/package.json:26, Evidence); 3.4.3 (sticky-notes, Markers); 3.4.4 (sticky-notes/src/main.ts:3, Observation); 3.4.4 (test-base/src/app/app.routes.ts:18, Observation); 3.4.5 #1 (Configuration); 3.4.7 #4, #6, #8 (Evidence) | 2 configuration | configuration | native-federation | technological | moderate | configures #30; configures #33 |
| 10 | 3.4.2 (tea-tracker/package.json:26, Evidence); 3.4.3 (tea-tracker, Markers); 3.4.3 (tea-tracker, Build); 3.4.6 #2 (Artifacts); 3.4.7 #7 (Evidence) | 2 configuration | configuration | native-federation | technological | moderate | configures #31 |
| 11 | 3.4.2 (tea-tracker/package.json:26, Evidence); 3.4.3 (tea-tracker, Markers) | 2 configuration | configuration | native-federation | technological | moderate | configures #31 |
| 12 | 3.4.2 (tea-tracker/package.json:26, Evidence); 3.4.3 (tea-tracker, Markers); 3.4.4 (tea-tracker/src/main.ts:3, Observation); 3.4.4 (test-base/src/app/app.routes.ts:14, Observation); 3.4.5 #2 (Configuration); 3.4.7 #4, #5, #6, #8 (Evidence) | 2 configuration | configuration | native-federation | technological | moderate | configures #31; configures #34 |
| 13 | 3.4.2 (test-base/package.json:26, Evidence); 3.4.3 (test-base, Markers); 3.4.3 (test-base, Build); 3.4.6 #3 (Artifacts) | 2 configuration | configuration | native-federation | technological | moderate | configures #32 |
| 14 | 3.4.2 (test-base/package.json:26, Evidence); 3.4.3 (test-base, Markers) | 2 configuration | configuration | native-federation | technological | moderate | configures #32 |
| 15 | 3.4.2 (test-base/package.json:26, Evidence); 3.4.3 (test-base, Markers); 3.4.7 #4, #8, #9 (Evidence) | 2 configuration | configuration | native-federation | technological | moderate | configures #32 |
| 16 | 3.4.4 (test-base/src/main.ts:3, Observation); 3.4.5 #1, #2 (Configuration); 3.4.6 #1, #2 (Where served); 3.4.7 #12, #14, #16 (Evidence) | 2 configuration | configuration | native-federation | architectural | strong | configures #28; configures #33; configures #34 |
| 17 | 3.4.4 (sticky-notes/src/main.ts:5) | 3 code | source code | native-federation | technological | weak | — |
| 18 | 3.4.4 (tea-tracker/src/main.ts:5) | 3 code | source code | native-federation | technological | weak | — |
| 19 | 3.4.4 (test-base/src/main.ts:5) | 3 code | source code | native-federation | technological | weak | — |
| 20 | 3.4.4 (sticky-notes/src/main.ts:1) | 3 code | source code | native-federation | technological | weak | — |
| 21 | 3.4.4 (sticky-notes/src/main.ts:3) | 3 code | source code | native-federation | technological | weak | — |
| 22 | 3.4.4 (tea-tracker/src/main.ts:1) | 3 code | source code | native-federation | technological | weak | — |
| 23 | 3.4.4 (tea-tracker/src/main.ts:3) | 3 code | source code | native-federation | technological | weak | — |
| 24 | 3.4.4 (test-base/src/app/app.routes.ts:3) | 3 code | source code | native-federation | technological | moderate | implements #33; implements #34 |
| 25 | 3.4.4 (test-base/src/app/app.routes.ts:14) | 3 code | source code | native-federation | architectural | strong | implements #34 |
| 26 | 3.4.4 (test-base/src/app/app.routes.ts:18) | 3 code | source code | native-federation | architectural | strong | implements #33 |
| 27 | 3.4.4 (test-base/src/main.ts:1) | 3 code | source code | native-federation | technological | moderate | implements #33; implements #34 |
| 28 | 3.4.4 (test-base/src/main.ts:3) | 3 code | source code | native-federation | technological | moderate | implements #33; implements #34 |
| 29 | 3.4.4 (test-base/src/app/app.routes.ts:5) | 3 code | source code | native-federation | architectural | strong | implements #33; implements #34 |
| 30 | 3.4.3 (sticky-notes) | 4 structure | directory | — | architectural | moderate | — |
| 31 | 3.4.3 (tea-tracker) | 4 structure | directory | — | architectural | moderate | — |
| 32 | 3.4.3 (test-base) | 4 structure | directory | — | architectural | moderate | — |
| 33 | 3.4.5 #1 | 5 composition | source code | native-federation | architectural | strong | links #32; links #30 |
| 34 | 3.4.5 #2 | 5 composition | source code | native-federation | architectural | strong | links #32; links #31 |
| 35 | 3.4.6 #1 | 6 build-deploy | configuration | — | architectural | moderate | publishes #30 |
| 36 | 3.4.6 #2 | 6 build-deploy | configuration | — | architectural | moderate | publishes #31 |
| 37 | 3.4.6 #3 | 6 build-deploy | configuration | — | architectural | moderate | publishes #32 |
| 38 | 3.4.7 #1 | 7 documentation | documentation | — | architectural | weak | corroborates #30; corroborates #31; corroborates #32; corroborates #33; corroborates #34 |
| 39 | 3.4.7 #2 | 7 documentation | documentation | — | architectural | weak | — |
| 40 | 3.4.7 #3 | 7 documentation | documentation | — | architectural | weak | corroborates #31; corroborates #18; corroborates #23 |
| 41 | 3.4.7 #4 | 7 documentation | documentation | native-federation | technological | weak | corroborates #1; corroborates #3; corroborates #5; corroborates #33; corroborates #34; corroborates #9; corroborates #12; corroborates #15 |
| 42 | 3.4.7 #5 | 7 documentation | documentation | — | architectural | weak | corroborates #34; corroborates #12; corroborates #25 |
| 43 | 3.4.7 #6 | 7 documentation | documentation | native-federation | technological | weak | corroborates #12; corroborates #9 |
| 44 | 3.4.7 #7 | 7 documentation | documentation | native-federation | technological | weak | corroborates #10; corroborates #36 |
| 45 | 3.4.7 #8 | 7 documentation | documentation | — | technological | weak | corroborates #15; corroborates #12; corroborates #9; corroborates test-base/package.json:30; corroborates tea-tracker/package.json:30; corroborates sticky-notes/package.json:30 |
| 46 | 3.4.7 #9 | 7 documentation | documentation | — | architectural | weak | corroborates #33; corroborates #34; corroborates #28; corroborates #15 |
| 47 | 3.4.7 #10 | 7 documentation | documentation | — | architectural | weak | corroborates #29; corroborates #25; corroborates #26 |
| 48 | 3.4.7 #11 | 7 documentation | documentation | native-federation | architectural | weak | corroborates #25; corroborates #34 |
| 49 | 3.4.7 #12 | 7 documentation | documentation | — | architectural | weak | corroborates #16; corroborates #28; corroborates #33; corroborates #34 |
| 50 | 3.4.7 #13 | 7 documentation | documentation | native-federation | technological | weak | corroborates #28; corroborates #27; corroborates test-base/angular.json:48-53 |
| 51 | 3.4.7 #14 | 7 documentation | documentation | — | architectural | weak | corroborates #16; corroborates #33; corroborates #34 |
| 52 | 3.4.7 #15 | 7 documentation | documentation | — | architectural | weak | corroborates #33; corroborates #34; corroborates #29 |
| 53 | 3.4.7 #16 | 7 documentation | documentation | — | architectural | weak | corroborates #34; corroborates #16; corroborates #25; corroborates #29 |
| 54 | 3.4.8 #1 | 8 history | history | native-federation | technological | weak | explains #2; explains #4; explains #6 |

## Summary

Observations: 54. Dimensions (technology: 6, configuration: 10, code: 13, structure: 3, composition: 2, build-deploy: 3, documentation: 16, history: 1). Strength (strong: 6, moderate: 18, weak: 30, ambiguous: 0). Evidence (technological: 31, architectural: 23, context: 0).

