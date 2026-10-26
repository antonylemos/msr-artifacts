---
schema: 1
id: 1050538328
full_name: bank20baht/poc-angular-native-federation-tailwindcss
commit: d2f9722e77b754318c831138d54aebbfd093ee1e
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

# 342 — bank20baht/poc-angular-native-federation-tailwindcss

## Repository overview

Snapshot brings two Angular units with own manifests/entries/builds (#21–#22). Native Federation declarations (#1, #3) connect to builders, configured sharing/exposures (#5–#10). Host registers remote in code (#17), incorporates component/routes (#14–#15, #20), forming active host → remote relationship (#23). Chain supports Native Federation composition reading.

Builds separate, but host CSS depends on scanning remote templates; no observed deployment/independent versioning (#24–#25). Local bootstraps/remote initialization do not link units (#11–#12, #18–#19). Unused direct @softarc/native-federation-node declarations isolated signals (#2, #4). loadChildren comment corroborated by code (#26), but READMEs add no claims to final 3.4.7 table. Two inconclusive historical points limit explanations of leftovers’ origin without making snapshot composition ambiguous (#27–#28).

## Observations

### 1. host/package.json:23

**Observation:** Manifest of `host` declares `@angular-architects/native-federation` in dependencies, version `20.1.6`.

**Interpretation:** Isolated technology signal; 3.4.2 records Configured `Yes`, supported by own builders/code.

### 2. host/package.json:31

**Observation:** Manifest of `host` declares `@softarc/native-federation-node` in dependencies, version `^2.0.10`.

**Interpretation:** Isolated signal without observed direct usage: 3.4.2 records Configured `No`; entries/configurations use another package.

### 3. remote/package.json:23

**Observation:** Manifest of `remote` declares `@angular-architects/native-federation` in dependencies, version `20.1.6`.

**Interpretation:** Isolated technology signal; 3.4.2 records Configured `Yes`, supported by own builders/code.

### 4. remote/package.json:31

**Observation:** Manifest of `remote` declares `@softarc/native-federation-node` in dependencies, version `^2.0.10`.

**Interpretation:** Isolated signal without observed direct usage: 3.4.2 records Configured `No`; entries/configurations use another package.

### 5. host/angular.json:16-29

**Observation:** Build target uses `@angular-architects/native-federation:build`, delegates to production/development host:esbuild targets, defaults to production.

**Interpretation:** Configures mechanism in host build without declaring another unit.

### 6. host/federation.config.js:1-27

**Observation:** `withNativeFederation` wraps configuration; `shareAll` uses singleton, strictVersion, requiredVersion auto. RxJS subpackage exclusions/ignoreUnusedDeps enabled.

**Interpretation:** Configures host sharing without naming remote target.

### 7. remote/angular.json:16-31

**Observation:** Build target uses `@angular-architects/native-federation:build`, includes src/styles.css, delegates to remote:esbuild, defaults to production.

**Interpretation:** Configures remote build mechanism without explicit consumer link.

### 8. remote/federation.config.js:1-34

**Observation:** `withNativeFederation` declares name remote, exposes ./Component from src/app/app.ts and ./routes from src/app/modules/home/home.routes.ts; shareAll uses singleton/strictVersion, requiredVersion auto.

**Interpretation:** Defines unit identity/exposed surface; block declares no consuming host.

### 9. host/angular.json:30-38

**Observation:** Serve target also uses Native Federation builder, points to host:serve-original:development, enables dev.

**Interpretation:** Configures mechanism in host development server without establishing another unit.

### 10. remote/angular.json:32-41

**Observation:** Serve target uses Native Federation builder, points to remote:serve-original:development, enables dev, includes src/styles.css.

**Interpretation:** Configures mechanism in remote development server without naming consumer.

### 11. host/src/main.ts:7

**Observation:** Entry of `host` dynamically imports local ./bootstrap after federation initialization.

**Interpretation:** Internal asynchronous bootstrap; isolated construct links no units. Section 3.4.4 marks Composition `No`.

### 12. remote/src/main.ts:5

**Observation:** Entry of `remote` dynamically imports local ./bootstrap after federation initialization.

**Interpretation:** Internal asynchronous bootstrap; isolated construct links no units. Section 3.4.4 marks Composition `No`.

### 13. host/src/app/app.routes.ts:1

**Observation:** File imports loadRemoteModule from @angular-architects/native-federation.

**Interpretation:** Provides route-loading mechanism; import alone names no target unit.

### 14. host/src/app/app.routes.ts:8-16; remote/federation.config.js:7-8; remote/src/app/app.ts:10; host/src/app/app.config.ts:10

**Observation:** Empty route uses loadComponent/loadRemoteModule(remote, ./Component), selects m.App, returns Fallback on loading failure; module matches remote-exposed App. Routes registered through provideRouter.

**Interpretation:** Route directly links host to remote unit UI through Native Federation.

### 15. host/src/app/app.routes.ts:18-28; remote/federation.config.js:9; remote/src/app/modules/home/home.routes.ts:3-14; host/src/app/app.config.ts:10

**Observation:** Flights route uses loadChildren with loadRemoteModule(remote, ./routes), selects APP_ROUTES, returns fallbackRoutes on failure. Remote exposes file containing route set.

**Interpretation:** Links host flights path to remote unit routes through Native Federation.

### 16. host/src/main.ts:1

**Observation:** Host entry imports initFederation from @angular-architects/native-federation.

**Interpretation:** Prepares initialization mechanism; import alone does not situate remote unit.

### 17. host/src/main.ts:3-7; remote/federation.config.js:5

**Observation:** initFederation receives remote → http://localhost:4201/remoteEntry.json map before bootstrap import. Name matches remote declaration.

**Interpretation:** Entry code explicitly registers host composition target. Although receiving map, application-executed code belongs to code dimension.

### 18. remote/src/main.ts:1

**Observation:** Remote entry imports initFederation from @angular-architects/native-federation.

**Interpretation:** Mechanism present in own unit; 3.4.4 marks Composition `No` because enabled call resolves no other unit.

### 19. remote/src/main.ts:3-6

**Observation:** Remote calls initFederation() without arguments, then imports local bootstrap.

**Interpretation:** Initializes unit mechanism without manifest/remotes consuming another unit. Construct Composition `No`.

### 20. host/src/app/app.routes.ts:7-29; host/src/app/app.config.ts:10; host/src/app/app.html:2

**Observation:** Exported route table associates empty route with remote component, flights with remote routes; provideRouter registers table/template has router-outlet.

**Interpretation:** Organizes insertion of two remote exposures into host navigation.

### 21. host/; host/package.json:1-55; host/angular.json:16-29; host/angular.json:57-60; host/src/main.ts:1-7; host/src/bootstrap.ts:5

**Observation:** Directory `host` has own manifest, src/main.ts entry, bootstrapApplication and Native Federation build target over @angular/build:application.

**Interpretation:** Confirms frontend unit `host` boundary, recorded `Yes` in 3.4.3; no workspace grouping both folders.

### 22. remote/; remote/package.json:1-55; remote/angular.json:16-31; remote/angular.json:58-61; remote/src/main.ts:1-5; remote/src/bootstrap.ts:5

**Observation:** Directory `remote` has own manifest, src/main.ts entry, bootstrapApplication and Native Federation build target over @angular/build:application.

**Interpretation:** Confirms frontend unit `remote` boundary, recorded `Yes` in 3.4.3; no workspace grouping both folders.

### 23. host/src/main.ts:3-5; host/src/app/app.routes.ts:7-29; remote/federation.config.js:5-10; remote/src/app/app.ts:10; remote/src/app/modules/home/home.routes.ts:3-14; host/src/app/app.config.ts:10

**Observation:** Host registers remoteEntry.json under remote key, loads ./Component and ./routes in routes. Remote declares same name/exposes both targets. Section 3.4.5 records present/active host → remote relationship.

**Interpretation:** Matching registry, consumption/exposures links two frontend units through Native Federation; both loads belong to same relationship.

### 24. host/package.json:7; host/angular.json:16-29; host/angular.json:57-98; host/angular.json:99-112; host/src/styles.css:3-4

**Observation:** Host has own ng build/targets. CSS scans own code and ../../remote/src. Observed service local dev-server at port 4200; 3.4.6 records separate Build, unobserved Deployment, Versioning No.

**Interpretation:** Per-application build boundary with remote-template dependency for CSS generation. Neither demonstrates independent deployment nor includes remote code in host artifact.

### 25. remote/package.json:7; remote/angular.json:16-31; remote/angular.json:58-95; remote/angular.json:96-109; host/src/main.ts:4

**Observation:** Remote has own ng build/targets. Dev-server uses port 4201, remoteEntry.json consumed by host; 3.4.6 records separate Build, unobserved Deployment, Versioning No.

**Interpretation:** Confirms remote build boundary; development URL demonstrates no independent publication/versioning.

### 26. host/src/app/app.routes.ts:19-23; remote/federation.config.js:9; remote/src/app/modules/home/home.routes.ts:3-14

**Observation:** Comment says “loadChildreas instead of loadComponent !!!” before loadChildren loading ./routes from remote/selecting APP_ROUTES.

**Interpretation:** Describes remote-route integration, corroborated by implementation per 3.4.7; alone weak semantic evidence.

### 27. bb8b5ac 2025-09-04 (host/package.json; remote/package.json); f61b3c0 2025-09-13 (host/package.json; remote/package.json); bf201ac 2025-09-17 (host/package.json; remote/package.json)

**Observation:** Section 3.4.8 situates manifest creation/changes but initial-content queries fail from missing object; point on earlier @softarc/native-federation-node usage inconclusive.

**Interpretation:** Uncertainty about declaration’s past does not change direct-usage No in snapshot. Cannot attribute leftover to abandonment, copying or planning.

### 28. f61b3c0 2025-09-13 (host/src/remote.d.ts; host/src/app/app.routes.ts; remote/federation.config.js); 3c1e13e 2025-09-14 (host/src/app/app.routes.ts; remote/federation.config.js); host/src/remote.d.ts:1; host/src/styles.css:2-5

**Observation:** Section 3.4.8 situates remote/Styles?inline declaration added in f61b3c0, route/federation path changes including 3c1e13e. Consulted old contents unavailable. Snapshot has neither declaration consumer nor ./Styles exposure.

**Interpretation:** Declaration origin inconclusive without opening snapshot architectural alternative: active composition uses component/routes, CSS generated through template scanning.

## Classification

| # | Origin | Dimension | Type | Approach | Evidence | Strength | Relationships |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.2 (host/package.json:23) | 1 technology | manifest | native-federation | technological | weak | declares #5; declares #6; declares #13; declares #16 |
| 2 | 3.4.2 (host/package.json:31) | 1 technology | manifest | native-federation | technological | weak | — |
| 3 | 3.4.2 (remote/package.json:23) | 1 technology | manifest | native-federation | technological | weak | declares #7; declares #8; declares #18; declares #19 |
| 4 | 3.4.2 (remote/package.json:31) | 1 technology | manifest | native-federation | technological | weak | — |
| 5 | 3.4.2 (host/package.json:23, Evidence); 3.4.3 (host, Markers/Build); 3.4.6 #1 (Artifacts) | 2 configuration | configuration | native-federation | technological | moderate | configures #21; configures #24 |
| 6 | 3.4.2 (host/package.json:23, Evidence); 3.4.2 (host/package.json:31, Evidence); 3.4.3 (host, Markers) | 2 configuration | configuration | native-federation | technological | moderate | configures #21; configures #16 |
| 7 | 3.4.2 (remote/package.json:23, Evidence); 3.4.3 (remote, Markers/Build); 3.4.6 #2 (Artifacts) | 2 configuration | configuration | native-federation | technological | moderate | configures #22; configures #25 |
| 8 | 3.4.2 (remote/package.json:23, Evidence); 3.4.2 (remote/package.json:31, Evidence); 3.4.3 (remote, Markers); 3.4.4 (host/src/app/app.routes.ts:11, :22; remote/src/main.ts:3, Observation); 3.4.5 #1 (Configuration); 3.4.7 #1 (Evidence) | 2 configuration | configuration | native-federation | technological | moderate | configures #14; configures #15; configures #22; configures #23 |
| 9 | 3.4.3 (host, Markers) | 2 configuration | configuration | native-federation | technological | moderate | configures #21 |
| 10 | 3.4.3 (remote, Markers) | 2 configuration | configuration | native-federation | technological | moderate | configures #22 |
| 11 | 3.4.4 (host/src/main.ts:7) | 3 code | source code | — | technological | weak | — |
| 12 | 3.4.4 (remote/src/main.ts:5) | 3 code | source code | — | technological | weak | — |
| 13 | 3.4.4 (host/src/app/app.routes.ts:1) | 3 code | source code | native-federation | technological | moderate | implements #23 |
| 14 | 3.4.4 (host/src/app/app.routes.ts:11) | 3 code | source code | native-federation | architectural | strong | implements #23 |
| 15 | 3.4.4 (host/src/app/app.routes.ts:22) | 3 code | source code | native-federation | architectural | strong | implements #23 |
| 16 | 3.4.4 (host/src/main.ts:1) | 3 code | source code | native-federation | technological | moderate | implements #23 |
| 17 | 3.4.4 (host/src/main.ts:3) | 3 code | source code | native-federation | architectural | strong | implements #23 |
| 18 | 3.4.4 (remote/src/main.ts:1) | 3 code | source code | native-federation | technological | weak | — |
| 19 | 3.4.4 (remote/src/main.ts:3) | 3 code | source code | native-federation | technological | weak | — |
| 20 | 3.4.4 (host/src/app/app.routes.ts:7, outside mining) | 3 code | source code | native-federation | architectural | strong | implements #23 |
| 21 | 3.4.3 (host) | 4 structure | directory | native-federation | architectural | moderate | — |
| 22 | 3.4.3 (remote) | 4 structure | directory | native-federation | architectural | moderate | — |
| 23 | 3.4.5 #1 | 5 composition | source code | native-federation | architectural | strong | links #21; links #22 |
| 24 | 3.4.6 #1 | 6 build-deploy | configuration | native-federation | architectural | moderate | publishes #21 |
| 25 | 3.4.6 #2 | 6 build-deploy | configuration | native-federation | architectural | moderate | publishes #22 |
| 26 | 3.4.7 #1 | 7 documentation | comment | native-federation | architectural | weak | corroborates #15; corroborates #23 |
| 27 | 3.4.8 #1 | 8 history | history | native-federation | technological | weak | explains #2; explains #4 |
| 28 | 3.4.8 #2 | 8 history | history | — | context | weak | explains host/src/remote.d.ts:1; explains #24 |

## Summary

Observations: 28. Dimensions (technology: 4, configuration: 6, code: 10, structure: 2, composition: 1, build-deploy: 2, documentation: 1, history: 2). Strength (strong: 5, moderate: 12, weak: 11, ambiguous: 0). Evidence (technological: 17, architectural: 10, context: 1).
