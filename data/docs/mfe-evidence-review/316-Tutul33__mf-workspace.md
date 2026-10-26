---
schema: 1
id: 1098942873
full_name: Tutul33/mf-workspace
commit: eb6d1cc782f44fa05b6a6d83c23edf20487af9db
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

# 316 — Tutul33/mf-workspace

## Repository overview

Evidence describes a workspace with three Angular units: host-app, customer-app and orders-app (#26–#28). The chain starts with declared dependency (#2), passes through federation builders and unit configurations (#3–#11), reaches executable host routes (#17–#19, #24) and two active host → remote relationships (#29–#30). Each remote exposes a route module; the host loads it by direct URL with `loadRemoteModule`. Isolated configurations do not declare consumers: routes code links units. Separate builds confirm application boundaries, without observed deployment or independent version (#31–#33).

Some signals require a restricted reading. Root coordinates the workspace without its own UI (#25). Dependency `@softarc/native-federation-node` has no observed direct usage (#1). Bootstrap imports and local remote initialization do not compose units (#12–#16, #22–#23). Host map `customerApp` points to its own port and is unused by routes (#20–#21); according to final 3.4.4 it establishes no other relationship. History clarifies coexistence of this map and direct routes since file introduction, without evidence of successive versions (#40–#42).

Guide documents host, two remotes and federated routing, corroborated by artifacts (#34–#37, #39). Its tree is partially corroborated in acquired inventory (#38); history explains that public assets exist in Git tree while outputs, dependencies and caches are ignored (#43). This source difference does not alter final 3.4 values. No architectural uncertainty is open in these reviews; static evidence does not demonstrate example execution.

## Observations

### 1. package.json:30

**Observation:** Manifest declares `@softarc/native-federation-node` in dependencies, version `^3.3.4`; section 3.4.2 records Configured `No`, without direct usage.

**Interpretation:** Declaration signals Native Federation technology without establishing participation in the observed composition.

### 2. package.json:36

**Observation:** Manifest declares `@angular-architects/native-federation` in devDependencies, version `^20.1.7`; section 3.4.2 records Configured `Yes`.

**Interpretation:** Dependency signals technology subsequently supported by its own configuration and usage observations.

### 3. angular.json:17-30

**Observation:** Target `build` of host-app uses `@angular-architects/native-federation:build`, forwarding production/development configurations to its own `esbuild` targets.

**Interpretation:** Configuration connects this unit to the federation build mechanism without alone linking another application.

### 4. angular.json:130-143

**Observation:** Target `build` of customer-app uses `@angular-architects/native-federation:build`, forwarding production/development configurations to its own `esbuild` targets.

**Interpretation:** Configuration connects this unit to the federation build mechanism without alone linking another application.

### 5. angular.json:243-256

**Observation:** Target `build` of orders-app uses `@angular-architects/native-federation:build`, forwarding production/development configurations to its own `esbuild` targets.

**Interpretation:** Configuration connects this unit to the federation build mechanism without alone linking another application.

### 6. projects/customer-app/federation.config.js:1-34

**Observation:** `withNativeFederation` declares `name: customer-app`, exposes `./CustomerRoutes` as a route module and configures `shareAll` with singleton/strict version options; `./Component` remains commented out.

**Interpretation:** Configuration establishes exposed interface and mechanism. It does not name a consumer; host code resolves consumption.

### 7. projects/orders-app/federation.config.js:1-34

**Observation:** `withNativeFederation` declares `name: orders-app`, exposes `./OrdersRoutes` as a route module and configures `shareAll` with singleton/strict version options; `./Component` remains commented out.

**Interpretation:** Configuration establishes exposed interface and mechanism. It does not name a consumer; host code resolves consumption.

### 8. angular.json:31-39

**Observation:** Target `serve` of host-app uses `@angular-architects/native-federation:build` with `dev: true`, forwarding to `host-app:serve-original:development`.

**Interpretation:** Configuration establishes the development mechanism without showing deployment.

### 9. angular.json:144-152

**Observation:** Target `serve` of customer-app uses `@angular-architects/native-federation:build` with `dev: true`, forwarding to `customer-app:serve-original:development`.

**Interpretation:** Configuration establishes the development mechanism without showing deployment.

### 10. angular.json:257-265

**Observation:** Target `serve` of orders-app uses `@angular-architects/native-federation:build` with `dev: true`, forwarding to `orders-app:serve-original:development`.

**Interpretation:** Configuration establishes the development mechanism without showing deployment.

### 11. projects/host-app/federation.config.js:1-27

**Observation:** Host `withNativeFederation` configures `shared`, `shareAll` with singleton/strict version options, `skip` and `ignoreUnusedDeps`, without `remotes` or manifest.

**Interpretation:** Configuration parameterizes the host; alone it establishes no relationship with another unit.

### 12. projects/customer-app/src/main.ts:5; projects/customer-app/src/bootstrap.ts:1-6

**Observation:** Entry uses `import('./bootstrap')`; local bootstrap invokes `bootstrapApplication` for customer-app.

**Interpretation:** Asynchronous local bootstrap is an isolated technical signal, without identifying or linking another microfrontend.

### 13. projects/host-app/src/main.ts:7; projects/host-app/src/bootstrap.ts:1-6

**Observation:** Entry uses `import('./bootstrap')`; local bootstrap invokes `bootstrapApplication` for host-app.

**Interpretation:** Asynchronous local bootstrap is an isolated technical signal, without identifying or linking another microfrontend.

### 14. projects/orders-app/src/main.ts:5; projects/orders-app/src/bootstrap.ts:1-6

**Observation:** Entry uses `import('./bootstrap')`; local bootstrap invokes `bootstrapApplication` for orders-app.

**Interpretation:** Asynchronous local bootstrap is an isolated technical signal, without identifying or linking another microfrontend.

### 15. projects/customer-app/src/main.ts:1-3

**Observation:** Customer entry imports `initFederation` from `@angular-architects/native-federation` for its local no-argument call.

**Interpretation:** Import identifies mechanism, but resolves no other application; Composition `No` in origin review.

### 16. projects/customer-app/src/main.ts:3

**Observation:** Customer entry invokes `initFederation()` without manifest or remote map.

**Interpretation:** Initializes its own runtime without another-unit composition; Composition `No`.

### 17. projects/host-app/src/app/app.routes.ts:2; projects/host-app/src/app/app.routes.ts:8-19

**Observation:** Host routes import `loadRemoteModule`, used by two remote routes.

**Interpretation:** Import prepares remote loading; target resolution depends on the calls rather than import alone.

### 18. projects/host-app/src/app/app.routes.ts:5-11; projects/customer-app/federation.config.js:5-10; angular.json:227; projects/customer-app/src/app/customer/customer-routes.module.ts:5-12; projects/host-app/src/app/app.config.ts:4-10; projects/host-app/src/bootstrap.ts:5

**Observation:** Route `customers` uses `loadChildren` and `loadRemoteModule` with `http://localhost:4301/remoteEntry.json`, `./CustomerRoutes` and selection `CustomerRoutesModule`. Host registers routes through `provideRouter`.

**Interpretation:** Executable route matches the remote’s exposed module, establishing explicit host composition through Native Federation; Composition `Yes`.

### 19. projects/host-app/src/app/app.routes.ts:13-19; projects/orders-app/federation.config.js:5-10; angular.json:340; projects/orders-app/src/app/orders/orders-routes.module.ts:5-12; projects/host-app/src/app/app.config.ts:4-10; projects/host-app/src/bootstrap.ts:5

**Observation:** Route `orders` uses `loadChildren` and `loadRemoteModule` with `http://localhost:4302/remoteEntry.json`, `./OrdersRoutes` and selection `OrdersRoutesModule`. Host registers routes through `provideRouter`.

**Interpretation:** Executable route matches the remote’s exposed module, establishing explicit host composition through Native Federation; Composition `Yes`.

### 20. projects/host-app/src/main.ts:1-5

**Observation:** Host imports `initFederation` for the call registering `customerApp` at localhost:4200.

**Interpretation:** Import identifies mechanism for the map reviewed in origin. It does not establish another-frontend link; Composition `No`.

### 21. projects/host-app/src/main.ts:3-5; angular.json:114; projects/host-app/src/app/app.routes.ts:8-19

**Observation:** `initFederation` associates `customerApp` with `http://localhost:4200/remoteEntry.json`, the host’s own port. Routes use direct URLs at 4301 and 4302 without that name.

**Interpretation:** Executable configuration does not resolve another unit in 3.4.4; Composition `No`. It creates no third relationship.

### 22. projects/orders-app/src/main.ts:1-3

**Observation:** Orders entry imports `initFederation` for a local no-argument call.

**Interpretation:** Mechanism import does not resolve another application; Composition `No`.

### 23. projects/orders-app/src/main.ts:3

**Observation:** Orders entry invokes `initFederation()` without manifest or remotes.

**Interpretation:** Initializes its own runtime without other-unit composition; Composition `No`.

### 24. projects/host-app/src/app/app.routes.ts:4-26; projects/host-app/src/app/app.config.ts:4-10; projects/host-app/src/app/app.html:1-3; projects/customer-app/federation.config.js:5-10; projects/orders-app/federation.config.js:5-10; angular.json:227; angular.json:340

**Observation:** Host `routes` includes remote module loads for `customers` and `orders`; `provideRouter` registers the table, with links and `router-outlet` supporting navigation.

**Interpretation:** Registered paths connect customer/orders units to the host, corroborating composition rather than merely unused declarations.

### 25. .; package.json:1-10; angular.json:6-18; angular.json:119-131; angular.json:232-244

**Observation:** Root manifest and `angular.json` coordinate three projects. Root build script uses `ng build`; entries and targets belong to projects.

**Interpretation:** Root has no own UI entry/build. Frontend unit `No`; it is not a fourth application.

### 26. projects/customer-app/; angular.json:175; projects/customer-app/src/main.ts:1-6; projects/customer-app/src/bootstrap.ts:1-6; angular.json:130-143; angular.json:172-175

**Observation:** Directory customer-app has `main.ts` loading bootstrap, `bootstrapApplication`, its own Native Federation `build` and `esbuild` targets.

**Interpretation:** Own entry/build establish frontend unit boundary without requiring a local manifest. Boundary alone does not explain inter-unit links.

### 27. projects/host-app/; angular.json:62; projects/host-app/src/main.ts:1-8; projects/host-app/src/bootstrap.ts:1-6; angular.json:17-30; angular.json:59-62

**Observation:** Directory host-app has `main.ts` loading bootstrap, `bootstrapApplication`, its own Native Federation `build` and `esbuild` targets.

**Interpretation:** Own entry/build establish frontend unit boundary without requiring a local manifest. Boundary alone does not explain inter-unit links.

### 28. projects/orders-app/; angular.json:288; projects/orders-app/src/main.ts:1-6; projects/orders-app/src/bootstrap.ts:1-6; angular.json:243-256; angular.json:285-288

**Observation:** Directory orders-app has `main.ts` loading bootstrap, `bootstrapApplication`, its own Native Federation `build` and `esbuild` targets.

**Interpretation:** Own entry/build establish frontend unit boundary without requiring a local manifest. Boundary alone does not explain inter-unit links.

### 29. projects/host-app/src/app/app.routes.ts:6-11; projects/customer-app/federation.config.js:5-10; angular.json:227; projects/host-app/src/app/app.config.ts:10; projects/host-app/src/bootstrap.ts:5

**Observation:** Host loads `./CustomerRoutes` from `http://localhost:4301/remoteEntry.json`, exposed by customer-app. Section 3.4.5 records host → remote, In snapshot `Yes`, Active `Yes`.

**Interpretation:** Explicit active Native Federation relationship connects units present in the snapshot.

### 30. projects/host-app/src/app/app.routes.ts:14-19; projects/orders-app/federation.config.js:5-10; angular.json:340; projects/host-app/src/app/app.config.ts:10; projects/host-app/src/bootstrap.ts:5

**Observation:** Host loads `./OrdersRoutes` from `http://localhost:4302/remoteEntry.json`, exposed by orders-app. Section 3.4.5 records host → remote, In snapshot `Yes`, Active `Yes`.

**Interpretation:** Explicit active Native Federation relationship connects units present in the snapshot.

### 31. angular.json:130-143; angular.json:172-175; angular.json:227; package.json:3

**Observation:** Unit customer-app has Native Federation target `build` and `esbuild` using `@angular/build:application`, with development port 4301. Section 3.4.6 records build `separate`, deployment `not observed`, versioning `No`; version belongs to workspace.

**Interpretation:** Separate build supports unit boundary, without demonstrating independent deployment or versioning.

### 32. angular.json:17-30; angular.json:59-62; angular.json:114; package.json:3

**Observation:** Unit host-app has Native Federation target `build` and `esbuild` using `@angular/build:application`, with development port 4200. Section 3.4.6 records build `separate`, deployment `not observed`, versioning `No`; version belongs to workspace.

**Interpretation:** Separate build supports unit boundary, without demonstrating independent deployment or versioning.

### 33. angular.json:243-256; angular.json:285-288; angular.json:340; package.json:3

**Observation:** Unit orders-app has Native Federation target `build` and `esbuild` using `@angular/build:application`, with development port 4302. Section 3.4.6 records build `separate`, deployment `not observed`, versioning `No`; version belongs to workspace.

**Interpretation:** Separate build supports unit boundary, without demonstrating independent deployment or versioning.

### 34. README.md:3; angular_20_microfrontend_app_guide.md:3

**Observation:** README and guide present “Host + Customer-App + Orders-App” with Angular 20 and `@angular-architects/native-federation`.

**Interpretation:** Three units and mechanism are corroborated in 3.4.7. Documentation remains weak semantic evidence.

### 35. README.md:22; angular_20_microfrontend_app_guide.md:22

**Observation:** Guide presents host as “main shell”.

**Interpretation:** Role corroborated by routes and navigation; semantic claim alone does not establish composition.

### 36. README.md:23; angular_20_microfrontend_app_guide.md:23

**Observation:** Guide presents customer as “remote”.

**Interpretation:** Role corroborated by module exposure and host consumption; weak semantic evidence.

### 37. README.md:24; angular_20_microfrontend_app_guide.md:24

**Observation:** Guide presents orders as “remote”.

**Interpretation:** Role corroborated by module exposure and host consumption; weak semantic evidence.

### 38. README.md:213-251

**Observation:** README’s “MF-WORKSPACE” tree lists projects/customer-app, host-app, orders-app, public, .angular, dist and node_modules.

**Interpretation:** Organization partially corroborated: some working-tree paths absent from acquired inventory. Historical point #43 clarifies inventory/Git distinction and ignored outputs.

### 39. README.md:259; angular_20_microfrontend_app_guide.md:218

**Observation:** README and guide describe “Federated routing”.

**Interpretation:** Claim corroborated by two route-module loading relationships; semantic evidence does not replace executable references.

### 40. f038259 2025-11-18 (package.json; projects/host-app/src/main.ts; projects/host-app/src/app/app.routes.ts; projects/customer-app/federation.config.js; projects/orders-app/federation.config.js)

**Observation:** Historical review records `f038259` already declaring `@softarc/native-federation-node`; consulted files use `@angular-architects/native-federation` and remain unchanged.

**Interpretation:** Result `clarified` in 3.4.8: unused direct declaration dates to introduction. It does not demonstrate removal or abandonment intent; weak historical explanation.

### 41. f038259 2025-11-18 (projects/host-app/src/main.ts; projects/host-app/src/app/app.routes.ts)

**Observation:** Historical review records host map at 4200 and direct route URLs at 4301/4302 introduced together in `f038259`, without subsequent changes.

**Interpretation:** Result `clarified` in 3.4.8: coexistence since first available version, without architectural transition between the two arrangements.

### 42. f038259 2025-11-18 (projects/customer-app/federation.config.js; projects/orders-app/federation.config.js)

**Observation:** Historical review records both federation.config.js files introduced in `f038259` with `./Component` already commented out and route modules active, remaining unchanged.

**Interpretation:** Result `clarified` in 3.4.8: history does not show an active component exposure or explain intent; it clarifies the snapshot configuration.

### 43. f038259 2025-11-18 (angular.json; .gitignore; projects/customer-app/public/favicon.ico; projects/host-app/public/favicon.ico; projects/orders-app/public/favicon.ico); eb6d1cc 2025-11-18 (README.md; projects/customer-app/public/favicon.ico; projects/host-app/public/favicon.ico; projects/orders-app/public/favicon.ico); .gitignore:4; .gitignore:10; .gitignore:32; angular.json:68; angular.json:181; angular.json:294

**Observation:** Historical review records three favicon.ico assets introduced in `f038259` and still present in Git tree at `eb6d1cc`, although absent from acquired inventory. Outputs, dependencies and cache directories are ignored.

**Interpretation:** Result `clarified` in 3.4.8: partial tree corroboration reflects Git/inventory distinction, without evidence of asset removal.

## Classification

| # | Origin | Dimension | Type | Approach | Evidence | Strength | Relationships |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.2 (package.json:30) | 1 technology | manifest | native-federation | technological | weak | — |
| 2 | 3.4.2 (package.json:36) | 1 technology | manifest | native-federation | technological | weak | declares #3; declares #4; declares #5; declares #6; declares #7; declares #8; declares #9; declares #10; declares #11; declares #15; declares #16; declares #17; declares #18; declares #19; declares #20; declares #21; declares #22; declares #23 |
| 3 | 3.4.2 (package.json:36, Evidence); 3.4.3 (., Markers); 3.4.3 (projects/host-app, Build); 3.4.6 #2 (Artifacts) | 2 configuration | configuration | native-federation | technological | moderate | configures #27; configures #32 |
| 4 | 3.4.2 (package.json:36, Evidence); 3.4.3 (., Markers); 3.4.3 (projects/customer-app, Build); 3.4.6 #1 (Artifacts) | 2 configuration | configuration | native-federation | technological | moderate | configures #26; configures #31 |
| 5 | 3.4.2 (package.json:36, Evidence); 3.4.3 (., Markers); 3.4.3 (projects/orders-app, Build); 3.4.6 #3 (Artifacts) | 2 configuration | configuration | native-federation | technological | moderate | configures #28; configures #33 |
| 6 | 3.4.2 (package.json:36, Evidence); 3.4.3 (projects/customer-app, Markers); 3.4.4 (projects/customer-app/src/main.ts:3, Observation); 3.4.4 (projects/host-app/src/app/app.routes.ts:8, Observation); 3.4.5 #1 (Configuration); 3.4.7 #3 (Evidence) | 2 configuration | configuration | native-federation | technological | moderate | configures #26; configures #18; configures #29 |
| 7 | 3.4.2 (package.json:36, Evidence); 3.4.3 (projects/orders-app, Markers); 3.4.4 (projects/orders-app/src/main.ts:3, Observation); 3.4.4 (projects/host-app/src/app/app.routes.ts:16, Observation); 3.4.5 #2 (Configuration); 3.4.7 #4 (Evidence) | 2 configuration | configuration | native-federation | technological | moderate | configures #28; configures #19; configures #30 |
| 8 | 3.4.3 (., Markers: angular.json) | 2 configuration | configuration | native-federation | technological | moderate | configures #27; configures #32 |
| 9 | 3.4.3 (., Markers: angular.json) | 2 configuration | configuration | native-federation | technological | moderate | configures #26; configures #31 |
| 10 | 3.4.3 (., Markers: angular.json) | 2 configuration | configuration | native-federation | technological | moderate | configures #28; configures #33 |
| 11 | 3.4.3 (projects/host-app, Markers) | 2 configuration | configuration | native-federation | technological | moderate | configures #27 |
| 12 | 3.4.4 (projects/customer-app/src/main.ts:5, src-async-bootstrap) | 3 code | source code | — | technological | weak | — |
| 13 | 3.4.4 (projects/host-app/src/main.ts:7, src-async-bootstrap) | 3 code | source code | — | technological | weak | — |
| 14 | 3.4.4 (projects/orders-app/src/main.ts:5, src-async-bootstrap) | 3 code | source code | — | technological | weak | — |
| 15 | 3.4.4 (projects/customer-app/src/main.ts:1) | 3 code | source code | native-federation | technological | weak | — |
| 16 | 3.4.4 (projects/customer-app/src/main.ts:3) | 3 code | source code | native-federation | technological | weak | — |
| 17 | 3.4.4 (projects/host-app/src/app/app.routes.ts:2) | 3 code | source code | native-federation | technological | moderate | implements #29; implements #30 |
| 18 | 3.4.4 (projects/host-app/src/app/app.routes.ts:8) | 3 code | source code | native-federation | architectural | strong | implements #29 |
| 19 | 3.4.4 (projects/host-app/src/app/app.routes.ts:16) | 3 code | source code | native-federation | architectural | strong | implements #30 |
| 20 | 3.4.4 (projects/host-app/src/main.ts:1) | 3 code | source code | native-federation | technological | weak | — |
| 21 | 3.4.4 (projects/host-app/src/main.ts:3) | 3 code | source code | native-federation | technological | weak | — |
| 22 | 3.4.4 (projects/orders-app/src/main.ts:1) | 3 code | source code | native-federation | technological | weak | — |
| 23 | 3.4.4 (projects/orders-app/src/main.ts:3) | 3 code | source code | native-federation | technological | weak | — |
| 24 | 3.4.4 (projects/host-app/src/app/app.routes.ts:4, manual) | 3 code | source code | native-federation | architectural | strong | implements #29; implements #30 |
| 25 | 3.4.3 (.) | 4 structure | directory | — | context | weak | — |
| 26 | 3.4.3 (projects/customer-app) | 4 structure | directory | native-federation | architectural | moderate | — |
| 27 | 3.4.3 (projects/host-app) | 4 structure | directory | native-federation | architectural | moderate | — |
| 28 | 3.4.3 (projects/orders-app) | 4 structure | directory | native-federation | architectural | moderate | — |
| 29 | 3.4.5 #1 | 5 composition | source code | native-federation | architectural | strong | links #27; links #26 |
| 30 | 3.4.5 #2 | 5 composition | source code | native-federation | architectural | strong | links #27; links #28 |
| 31 | 3.4.6 #1 | 6 build-deploy | configuration | native-federation | architectural | moderate | publishes #26 |
| 32 | 3.4.6 #2 | 6 build-deploy | configuration | native-federation | architectural | moderate | publishes #27 |
| 33 | 3.4.6 #3 | 6 build-deploy | configuration | native-federation | architectural | moderate | publishes #28 |
| 34 | 3.4.7 #1 | 7 documentation | documentation | native-federation | architectural | weak | corroborates #26; corroborates #27; corroborates #28; corroborates #2; corroborates #29; corroborates #30 |
| 35 | 3.4.7 #2 | 7 documentation | documentation | — | architectural | weak | corroborates #29; corroborates #30; corroborates #24 |
| 36 | 3.4.7 #3 | 7 documentation | documentation | — | architectural | weak | corroborates #6; corroborates #29 |
| 37 | 3.4.7 #4 | 7 documentation | documentation | — | architectural | weak | corroborates #7; corroborates #30 |
| 38 | 3.4.7 #5 | 7 documentation | documentation | — | architectural | weak | partially corroborates #25; partially corroborates #26; partially corroborates #27; partially corroborates #28; partially corroborates angular.json:68; partially corroborates angular.json:181; partially corroborates angular.json:294; partially corroborates .gitignore:4; partially corroborates .gitignore:10; partially corroborates .gitignore:32 |
| 39 | 3.4.7 #6 | 7 documentation | documentation | — | architectural | weak | corroborates #29; corroborates #30; corroborates #18; corroborates #19 |
| 40 | 3.4.8 #1 | 8 history | history | native-federation | technological | weak | explains #1 |
| 41 | 3.4.8 #2 | 8 history | history | native-federation | technological | weak | explains #20; explains #21; explains #18; explains #19; explains #29; explains #30 |
| 42 | 3.4.8 #3 | 8 history | history | native-federation | technological | weak | explains #6; explains #7 |
| 43 | 3.4.8 #4 | 8 history | history | — | architectural | weak | explains #38 |

## Summary

Observations: 43. Dimensions (technology: 2, configuration: 9, code: 13, structure: 4, composition: 2, build-deploy: 3, documentation: 6, history: 4). Strength (strong: 5, moderate: 16, weak: 22, ambiguous: 0). Evidence (technological: 24, architectural: 18, context: 1).
