---
schema: 1
id: 969679126
full_name: Ba5ik7/seed-mfe-remote
commit: 3565dd875bd5bd89f14f88b1325e00aeb11cdf96
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

# 368 — Ba5ik7/seed-mfe-remote

## Repository overview

Module Federation dependency (#1) unfolds into remote `./RemoteWidget` exposure (#2), host remote declaration (#3)/Angular-target configuration integration (#4–#7). Directories `demo`/`seed-mfe-remote` two frontend units with own entries/builds (#17–#18, #20–#21), under coordination root not another unit (#16).

Effective link uses `loadRemoteModule` with explicit URL: host loads component (#11)/mounts in `ViewContainerRef` (#14), also loading through `remote` route (#13, #15). Two paths form single active host → remote relationship (#19). Mechanism imports (#10, #12)/local asynchronous bootstraps (#8–#9) do not alone establish architecture.

Nominal entry `remotes.seedMfeRemote` (#3) not consulted by URL calls. History explains coexistence since file introduction (#22), supporting no abandonment hypothesis. Separate builds demonstrate no independent deployment/versioning (#20–#21). Section 3.4.7 records zero architectural claims: standard README adds no documentation observations. No architectural indeterminacy in input reviews.

In configuration dimension each build/serve target one block (#4–#7), including variants. Table-cited `webpack.prod.config.js:1` files only reexport another configuration without own composition element, so no extra observations. Ports/publicHost only corroborate resolution/remain in corresponding observation artifacts.

## Observations

### 1. package.json:14

**Observation:** Root manifest declares `@angular-architects/module-federation` version `^19.0.3`; dependency review records Configured `Yes`.

**Interpretation:** Declaration signals Module Federation; configuration/usage require own observations.

### 2. projects/seed-mfe-remote/webpack.config.js:1-15

**Observation:** Configuration calls `withModuleFederationPlugin`, defines `name: seedMfeRemote`, exposes `./RemoteWidget` through component path/shares dependencies with `shareAll`, singleton/strictVersion.

**Interpretation:** Configures unit mechanism/exposed interface without declaring consumer.

### 3. projects/demo/webpack.config.js:1-13

**Observation:** Configuration uses `withModuleFederationPlugin`, declares `remotes.seedMfeRemote` at `http://localhost:4202/remoteEntry.js`, shares dependencies with `shareAll`, singleton/strictVersion.

**Interpretation:** Declares host link to another frontend through Module Federation. Nominal relationship configured although code calls use URL directly.

### 4. angular.json:17-66

**Observation:** Target `build` of `seed-mfe-remote` uses `ngx-build-plus:browser` and `extraWebpackConfig: projects/seed-mfe-remote/webpack.config.js`; production selects `projects/seed-mfe-remote/webpack.prod.config.js`.

**Interpretation:** Integrates federation configuration into unit build. Target names no other target unit.

### 5. angular.json:67-84

**Observation:** Target `serve` of `seed-mfe-remote` uses `ngx-build-plus:dev-server` and `extraWebpackConfig: projects/seed-mfe-remote/webpack.config.js`; production selects `projects/seed-mfe-remote/webpack.prod.config.js`.

**Interpretation:** Integrates federation configuration into unit development server. Target names no other target unit.

### 6. angular.json:122-171

**Observation:** Target `build` of `demo` uses `ngx-build-plus:browser` and `extraWebpackConfig: projects/demo/webpack.config.js`; production selects `projects/demo/webpack.prod.config.js`.

**Interpretation:** Integrates federation configuration into unit build. Target names no other target unit.

### 7. angular.json:172-189

**Observation:** Target `serve` of `demo` uses `ngx-build-plus:dev-server` and `extraWebpackConfig: projects/demo/webpack.config.js`; production selects `projects/demo/webpack.prod.config.js`.

**Interpretation:** Integrates federation configuration into unit development server. Target names no other target unit.

### 8. projects/demo/src/main.ts:1-2; projects/demo/src/bootstrap.ts:5-6

**Observation:** Entry of `demo` executes `import('./bootstrap')`; bootstrap starts local Angular application.

**Interpretation:** Internal asynchronous bootstrap; alone shows neither MFE technology nor inter-unit composition. Section 3.4.4 records Composition `No`.

### 9. projects/seed-mfe-remote/src/main.ts:1-2; projects/seed-mfe-remote/src/bootstrap.ts:5-6

**Observation:** Entry of `seed-mfe-remote` executes `import('./bootstrap')`; bootstrap starts local Angular application.

**Interpretation:** Internal asynchronous bootstrap; alone shows neither MFE technology nor inter-unit composition. Section 3.4.4 records Composition `No`.

### 10. projects/demo/src/app/app.component.ts:1

**Observation:** Root component imports `loadRemoteModule` from `@angular-architects/module-federation`.

**Interpretation:** Provides host loading mechanism without target identification on line.

### 11. projects/demo/src/app/app.component.ts:24-36; projects/seed-mfe-remote/webpack.config.js:5-8; angular.json:80-81; projects/demo/src/bootstrap.ts:5

**Observation:** In `ngAfterViewInit`, demo root calls `loadRemoteModule` with `type: module`, `remoteEntry: http://localhost:4202/remoteEntry.js`, `exposedModule: ./RemoteWidget`. Remote exposes module/has dev-server at matching address.

**Interpretation:** Host resolves distinct unit through URL/exposed module, linking demo to seed-mfe-remote at runtime.

### 12. projects/demo/src/app/app.routes.ts:2

**Observation:** Routes file imports `loadRemoteModule` from `@angular-architects/module-federation`.

**Interpretation:** Prepares routing mechanism without naming target unit on line.

### 13. projects/demo/src/app/app.routes.ts:5-13; projects/demo/src/app/app.config.ts:7; projects/demo/src/bootstrap.ts:5; projects/seed-mfe-remote/webpack.config.js:5-8; angular.json:80-81

**Observation:** Route `remote` uses `loadComponent` to load `./RemoteWidget` through `http://localhost:4202/remoteEntry.js`, return `RemoteWidgetComponent`; `provideRouter(routes)` registers host-bootstrap routes. Module/address match remote.

**Interpretation:** Route connects host path to other-unit component through Module Federation.

### 14. projects/demo/src/app/app.component.ts:12; projects/demo/src/app/app.component.ts:21-22; projects/demo/src/app/app.component.ts:36

**Observation:** Template contains `ng-container #mfeHost`, obtained as `ViewContainerRef`; `createComponent(remoteComponent.RemoteWidgetComponent)` mounts load-returned component there.

**Interpretation:** Materializes remote component mounting in host UI; isolated mount call receives loading result without resolving target.

### 15. projects/demo/src/app/app.routes.ts:4-14; projects/demo/src/app/app.config.ts:7; projects/demo/src/app/app.component.ts:15; projects/seed-mfe-remote/webpack.config.js:7-8; angular.json:80-81

**Observation:** Table `routes` associates `remote` path with `./RemoteWidget` loading through remote URL. Routes registered by `provideRouter(routes)`, host contains `router-outlet`.

**Interpretation:** Table establishes host navigable-path relationship with seed-mfe-remote exposed component.

### 16. .; package.json:1-41; angular.json:5-6; angular.json:17-20; angular.json:111; angular.json:122-125

**Observation:** Root has single manifest/two-project registry; targets belong to `projects/` directories. Section 3.4.3 records Frontend unit `No` for root.

**Interpretation:** Root coordinates workspace rather than third frontend unit.

### 17. projects/demo/; angular.json:122-125; angular.json:126; angular.json:143-144; angular.json:162; projects/demo/src/main.ts:1-2; projects/demo/src/bootstrap.ts:5-6

**Observation:** Directory `demo` has own entry/bootstrap, index/target `build` with output `dist/demo` and own webpack configuration. No local manifest. Section 3.4.3 records Frontend unit `Yes`.

**Interpretation:** Confirms host frontend unit boundary despite shared-manifest dependencies.

### 18. projects/seed-mfe-remote/; angular.json:17-20; angular.json:21; angular.json:38-39; angular.json:57; projects/seed-mfe-remote/src/main.ts:1-2; projects/seed-mfe-remote/src/bootstrap.ts:5-6

**Observation:** Directory `seed-mfe-remote` has own entry/bootstrap, index/target `build` with output `dist/seed-mfe-remote` and own webpack configuration. No local manifest. Section 3.4.3 records Frontend unit `Yes`.

**Interpretation:** Confirms remote frontend unit boundary despite shared-manifest dependencies.

### 19. projects/demo/src/app/app.component.ts:26-36; projects/demo/src/app/app.routes.ts:4-14; projects/demo/webpack.config.js:5-7; projects/seed-mfe-remote/webpack.config.js:5-8; angular.json:80-81

**Observation:** Relationship #1 in 3.4.5 links `projects/demo` to `projects/seed-mfe-remote` through Module Federation, In snapshot `Yes`, Active `Yes`. Calls resolve `./RemoteWidget` through remoteEntry; nominal declaration `seedMfeRemote` matches remote name but unconsulted by calls.

**Interpretation:** Two consumption paths belong to same active snapshot host → remote relationship. Activity describes recorded static chain without proven execution/deployment.

### 20. angular.json:122-125; angular.json:143-144; angular.json:162; projects/demo/webpack.prod.config.js:1; angular.json:185-186; package.json:3; package.json:12

**Observation:** Application `demo` has own target/output `dist/demo` and production configuration reexporting development webpack. Section 3.4.6 records Build `separate`, Deployment `not observed`, Versioning `No`; recorded address dev-server.

**Interpretation:** Build confirms per-application boundary. Artifacts establish no independent publication/versioning; development server proves no deployment.

### 21. angular.json:17-20; angular.json:38-39; angular.json:57; projects/seed-mfe-remote/webpack.prod.config.js:1; angular.json:80-81; package.json:3; package.json:12

**Observation:** Application `seed-mfe-remote` has own target/output `dist/seed-mfe-remote` and production configuration reexporting development webpack. Section 3.4.6 records Build `separate`, Deployment `not observed`, Versioning `No`; recorded address dev-server.

**Interpretation:** Build confirms per-application boundary. Artifacts establish no independent publication/versioning; development server proves no deployment.

### 22. b95ce7d 2025-04-19 (angular.json; package.json; README.md); 3565dd8 2025-04-20 (projects/demo/webpack.config.js; projects/demo/src/app/app.component.ts; projects/demo/src/app/app.routes.ts)

**Observation:** History review records two commits through snapshot. Three demo files added in `3565dd8` already with `remotes.seedMfeRemote`/two explicit-URL calls; no earlier path versions in observed history. Point #1 `clarified`.

**Interpretation:** Coexistence observable since file introduction. Supports neither name-to-URL consumption transition nor abandonment/intent inference. Explains declaration unused by snapshot calls.

## Classification

| # | Origin | Dimension | Type | Approach | Evidence | Strength | Relationships |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.2 (package.json:14) | 1 technology | manifest | module-federation | technological | weak | declares #2; declares #3; declares #10; declares #11; declares #12; declares #13 |
| 2 | 3.4.2 (Evidence); 3.4.3 (projects/seed-mfe-remote, Markers); 3.4.4 (src-load-remote, app.component.ts:26, Observation); 3.4.5 #1 (Configuration) | 2 configuration | configuration | module-federation | technological | moderate | configures #18; configures #19 |
| 3 | 3.4.2 (Evidence); 3.4.3 (projects/demo, Markers); 3.4.5 #1 (Configuration) | 2 configuration | configuration | module-federation | architectural | strong | configures #17; configures #19 |
| 4 | 3.4.2 (Evidence, angular.json:18, :39, :57); 3.4.3 (., Markers); 3.4.3 (projects/seed-mfe-remote, Build); 3.4.6 #2 (Artifacts) | 2 configuration | configuration | module-federation | technological | moderate | configures #18; configures #21 |
| 5 | 3.4.2 (Evidence, angular.json:68, :82, :72); 3.4.3 (., Markers); 3.4.3 (projects/seed-mfe-remote, Build) | 2 configuration | configuration | module-federation | technological | moderate | configures #18; configures #21 |
| 6 | 3.4.2 (Evidence, angular.json:123, :144, :162); 3.4.3 (., Markers); 3.4.3 (projects/demo, Build); 3.4.6 #1 (Artifacts) | 2 configuration | configuration | module-federation | technological | moderate | configures #17; configures #20 |
| 7 | 3.4.2 (Evidence, angular.json:173, :187, :177); 3.4.3 (., Markers); 3.4.3 (projects/demo, Build) | 2 configuration | configuration | module-federation | technological | moderate | configures #17; configures #20 |
| 8 | 3.4.4 (src-async-bootstrap, projects/demo/src/main.ts:1) | 3 code | source code | — | technological | weak | — |
| 9 | 3.4.4 (src-async-bootstrap, projects/seed-mfe-remote/src/main.ts:1) | 3 code | source code | — | technological | weak | — |
| 10 | 3.4.4 (src-load-remote, app.component.ts:1) | 3 code | source code | module-federation | technological | moderate | implements #19 |
| 11 | 3.4.4 (src-load-remote, app.component.ts:26) | 3 code | source code | module-federation | architectural | strong | implements #19 |
| 12 | 3.4.4 (src-load-remote, app.routes.ts:2) | 3 code | source code | module-federation | technological | moderate | implements #19 |
| 13 | 3.4.4 (src-load-remote, app.routes.ts:8) | 3 code | source code | module-federation | architectural | strong | implements #19 |
| 14 | 3.4.4 (manual, app.component.ts:36) | 3 code | source code | module-federation | architectural | moderate | implements #19 |
| 15 | 3.4.4 (manual, app.routes.ts:4) | 3 code | source code | module-federation | architectural | strong | implements #19 |
| 16 | 3.4.3 (.) | 4 structure | directory | — | context | weak | — |
| 17 | 3.4.3 (projects/demo) | 4 structure | directory | module-federation | architectural | moderate | — |
| 18 | 3.4.3 (projects/seed-mfe-remote) | 4 structure | directory | module-federation | architectural | moderate | — |
| 19 | 3.4.5 #1 | 5 composition | source code | module-federation | architectural | strong | links #17; links #18 |
| 20 | 3.4.6 #1 | 6 build-deploy | configuration | module-federation | architectural | moderate | publishes #17 |
| 21 | 3.4.6 #2 | 6 build-deploy | configuration | module-federation | architectural | moderate | publishes #18 |
| 22 | 3.4.8 #1 | 8 history | history | module-federation | architectural | weak | explains #3; explains #11; explains #13; explains #19 |

## Summary

Observations: 22. Dimensions (technology: 1, configuration: 6, code: 8, structure: 3, composition: 1, build-deploy: 2, documentation: 0, history: 1). Strength (strong: 5, moderate: 12, weak: 5, ambiguous: 0). Evidence (technological: 10, architectural: 11, context: 1).
