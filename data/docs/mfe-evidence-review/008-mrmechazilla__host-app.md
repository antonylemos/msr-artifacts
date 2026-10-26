---
schema: 1
id: 1043375878
full_name: mrmechazilla/host-app
commit: 38ab4eb46b2edf72c07604bbbe2b0ff744c8f3b8
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

# 008 — mrmechazilla/host-app

## Repository overview

Snapshot contains only host of a multi-repository distributed system. Module Federation chain is complete on host side:
- **Dependency:** `@angular-architects/module-federation` (#1).
- **Federation configuration:** host configures federation without exposures (#2).
- **Manifest:** declares `users-mfe` and `payments-mfe` remotes (#3).
- **Code:** host loads manifest before bootstrap (#9, #10), mounting `users-mfe` routes by name (#6).
- **Relationships:** two active external-target relationships (#13, #14). Only `users-mfe` has route. `payments-mfe` is manifest-resolved, never mounted.

Hence structure shows one unit (#11). In isolation, structure/build (#15) do not reveal decomposition, visible only in configuration/code.

One misleading signal: entirely commented generic loader (#7, #8). History shows it arrived commented in snapshot commit (#16).

Repository does not document architecture: no claims.

## Observations

### 1. package.json:14

**Observation:** `@angular-architects/module-federation` (`^19.0.0`) declared in `dependencies`.

**Interpretation:** Federation technology present, used by configuration/code.

### 2. webpack.config.js:1-13

**Observation:** `withModuleFederationPlugin` declares `name: 'host-mfe'`, empty `exposes`, sharing dependencies through `shareAll`.

**Interpretation:** Host configured as federation participant without offering modules.

**Note:** `angular.json`, cited in same table, only points generic builder `ngx-build-plus:browser` at file (`extraWebpackConfig`). `webpack.prod.config.js` only reexports it. Neither declares composition element, hence no observation.

### 3. public/mf.manifest.json:1-20

**Observation:** Declares `users-mfe` (`remoteEntry` at `http://localhost:4202/remoteEntry.js`, `exposedModule` `./users`) and `payments-mfe` (`http://localhost:4203/remoteEntry.js`, `./payments`). Also display/routing metadata (`displayName`, `routePath`, `exportName`, `type`).

**Interpretation:** Host configuration declares two external remotes/development locations.

### 4. src/main.ts:4-6

**Observation:** `import('./bootstrap')` after `loadManifest`.

**Interpretation:** Asynchronous bootstrap internal to host.

### 5. src/app/app.routes.ts:1

**Observation:** Imports `loadRemoteModule` from `@angular-architects/module-federation`.

**Interpretation:** Remote-loading mechanism available in host routes.

### 6. src/app/app.routes.ts:4-15

**Observation:** Root route calls `loadRemoteModule({ type: 'manifest', remoteName: 'users-mfe', exposedModule: './users' })`, using `m.usersRoutes`. Failure only logs "service unavailable".

**Interpretation:** Host loads `users-mfe` remote routes at runtime by name.

### 7. src/app/shared/utils/remote-loader.ts:1; src/app/shared/utils/remote-loader.ts:28

**Observation:** Line from entirely commented file (`/*` at line 1, `*/` at 28).

**Interpretation:** Disabled generic loader not participating in composition.

### 8. src/app/shared/utils/remote-loader.ts:14; src/app/shared/utils/remote-loader.ts:1-28

**Observation:** Remote-loading call within same commented block.

**Interpretation:** Disabled generic loader not participating in composition.

### 9. src/main.ts:2

**Observation:** Imports `loadManifest` from `@angular-architects/module-federation`.

**Interpretation:** Manifest-resolution mechanism available in host.

### 10. src/main.ts:4-7

**Observation:** `loadManifest("mf.manifest.json")` before `import('./bootstrap')`.

**Interpretation:** Host resolves manifest-declared remotes before startup.

### 11. .; angular.json:17-21, 41-42; package.json:7

**Observation:** Snapshot’s sole Angular application, with own entry (`src/main.ts`) and build target.

**Interpretation:** Frontend unit with own boundary: host.

### 12. src; src/index.html

**Observation:** Root application source folder, with entry page declared in `angular.json`.

**Interpretation:** Part of root unit rather than another unit.

### 13. src/app/app.routes.ts:8-12; src/main.ts:4; public/mf.manifest.json:2-9

**Observation:** Host loads `./users` from manifest-resolved `users-mfe`. Remote absent from snapshot.

**Interpretation:** Active host → remote relationship with external target.

### 14. src/main.ts:4; public/mf.manifest.json:11-18

**Observation:** Startup-resolved manifest declares `payments-mfe`, but no route loads it. Remote absent from snapshot.

**Interpretation:** Host → remote relationship active in resolution without observed module use, external target.

### 15. angular.json:17-20, 42, 63; package.json:3, 7

**Observation:** Target `build` uses `ngx-build-plus:browser` with extra webpack configuration, writing to `dist/host-app`. No deployment artifact, version `0.0.0`.

**Interpretation:** Own host build boundary without observed deployment.

### 16. 38ab4eb 2026-01-21 (src/app/shared/utils/remote-loader.ts)

**Observation:** File created in snapshot commit, sole historical version. Entirely commented from start.

**Interpretation:** Loader never active: no later deactivation. Point clarified.

## Classification

| # | Origin | Dimension | Type | Approach | Evidence | Strength | Relationships |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.2 (package.json:14) | 1 technology | manifest | module-federation | technological | weak | declares #2; declares #5; declares #9 |
| 2 | 3.4.2 (package.json:14, Evidence); 3.4.3 (., Markers) | 2 configuration | configuration | module-federation | technological | moderate | configures #11 |
| 3 | 3.4.4 (src/main.ts:4, Observation); 3.4.5 #1, #2 (Configuration) | 2 configuration | configuration | module-federation | architectural | strong | configures #10; configures #13; configures #14 |
| 4 | 3.4.4 (src/main.ts:6) | 3 code | source code | module-federation | technological | weak | — |
| 5 | 3.4.4 (src/app/app.routes.ts:1) | 3 code | source code | module-federation | technological | moderate | implements #13 |
| 6 | 3.4.4 (src/app/app.routes.ts:8) | 3 code | source code | module-federation | architectural | strong | implements #13 |
| 7 | 3.4.4 (src/app/shared/utils/remote-loader.ts:1) | 3 code | source code | module-federation | technological | weak | — |
| 8 | 3.4.4 (src/app/shared/utils/remote-loader.ts:14) | 3 code | source code | module-federation | technological | weak | — |
| 9 | 3.4.4 (src/main.ts:2) | 3 code | source code | module-federation | technological | moderate | implements #13; implements #14 |
| 10 | 3.4.4 (src/main.ts:4) | 3 code | source code | module-federation | technological | moderate | implements #13; implements #14 |
| 11 | 3.4.3 (.) | 4 structure | directory | — | architectural | moderate | — |
| 12 | 3.4.3 (src) | 4 structure | directory | — | context | weak | — |
| 13 | 3.4.5 #1 | 5 composition | source code | module-federation | architectural | strong | links #11 |
| 14 | 3.4.5 #2 | 5 composition | source code | module-federation | architectural | strong | links #11 |
| 15 | 3.4.6 #1 | 6 build-deploy | configuration | — | architectural | moderate | publishes #11 |
| 16 | 3.4.8 #1 | 8 history | history | module-federation | technological | weak | explains #7; explains #8 |

## Summary

Observations: 16. Dimensions (technology: 1, configuration: 2, code: 7, structure: 2, composition: 2, build-deploy: 1, documentation: 0, history: 1). Strength (strong: 4, moderate: 6, weak: 6, ambiguous: 0). Evidence (technological: 9, architectural: 6, context: 1).

