---
schema: 1
id: 994642993
full_name: ayushpandey241626/microfrontend-demo
commit: ec39a278ec6951feeb8d7ff7688cb4f056be589b
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

# 229 — ayushpandey241626/microfrontend-demo

## Repository overview

Angular workspace with single root `package.json` and four projects in `projects/`: shell `host-app` and remotes `mfe1`, `mfe2` and `login-mfe-app` (#17 to #20). Root only coordinates workspace (#16). Module Federation chain complete:
- **Dependency:** `@angular-architects/module-federation` (#1), declared once for all projects.
- **Configuration:** each remote declares itself through `withModuleFederationPlugin`, exposing single route module (#3 to #5). Host uses webpack `ModuleFederationPlugin`, declaring three remotes at `localhost` (#2).
- **Code:** host imports `loadRemoteModule` (#10), and in route table (#14) loads each exposed module through each remote `remoteEntry.js` URL (#11 to #13).
- **Relationships:** yields three active host → remote relationships (#21 to #23).

Beyond federation, login links units through key `isLoggedIn` in `localStorage`: login-mfe-app form writes key (#15), and host `AuthGuard` reads it to allow `contacts` and `admin` (#24). No declared MFE mechanism; works only because within host units run under same origin.

Four builds separate, with own `dist/` outputs (#25 to #28), but no deployment artifact; all remote URLs fixed at `localhost`.

Misleading signals: each project `import('./bootstrap')` internal to unit (#6 to #9). Static host `remotes` map (#2) does not load remotes: code uses only route URLs. Thus key `loginMfeApp`, differing from `name` `login-mfe-app` (#3), does not break chain.

Repository does not document architecture: default Angular CLI README has no claims. History has no points.

## Observations

### 1. package.json:31

**Observation:** `@angular-architects/module-federation` (`^19.0.3`) declared in `devDependencies` of single workspace manifest.

**Interpretation:** Federation technology present in four project builds. Configuration and code use it.

### 2. projects/host-app/webpack.config.js:1-36

**Observation:** Extra webpack configuration, with `uniqueName: "hostApp"` and `publicPath: "auto"`. Webpack `ModuleFederationPlugin` (:6, :20) with `remotes` `mfe1: "mfe1@http://localhost:4201/remoteEntry.js"`, `mfe2: "mfe2@http://localhost:4202/remoteEntry.js"` and `loginMfeApp: "loginMfeApp@http://localhost:4203/remoteEntry.js"` (:21-25), and `shared` with `shareAll` as singleton and `strictVersion` (:26-32). `SharedMappings` registers project `tsconfig.app.json` (:8-9, :34).

**Interpretation:** Host configuration declares three local units as remotes and development locations. Code loads remotes through `remoteEntry.js` URL rather than these names (#11 to #13).

**Note:** `angular.json`, cited in same tables, only points generic builder `ngx-build-plus:browser` to `webpack.config.js` files (`extraWebpackConfig`), registers workspace projects (dimension 4) and fixes development ports, marked "only corroborates" in 3.4.5. Files `webpack.prod.config.js` only reexport project `webpack.config.js`; script `run:all` (package.json:10) only runs package development server without counting as evidence in 3.4.2. None declares composition element, therefore none became observation.

### 3. projects/login-mfe-app/webpack.config.js:1-21

**Observation:** `withModuleFederationPlugin` declares `name: "login-mfe-app"`, `exposes: { "./LoginModule": "./projects/login-mfe-app/src/app/login/login-form.routes.ts" }` and `shared` with `shareAll` as singleton and `strictVersion`.

**Interpretation:** Unit configured as remote, offering login routes to host.

### 4. projects/mfe1/webpack.config.js:1-21

**Observation:** `withModuleFederationPlugin` declares `name: "mfe1"`, `exposes: { "./ContactsModule": "./projects/mfe1/src/app/contact-list/contact-list.routes.ts" }` and `shared` with `shareAll` as singleton and `strictVersion`.

**Interpretation:** Unit configured as remote, offering contact list routes to host.

### 5. projects/mfe2/webpack.config.js:1-21

**Observation:** `withModuleFederationPlugin` declares `name: "mfe2"`, `exposes: { "./AdminModule": "./projects/mfe2/src/app/contact-admin/contact-admin.routes.ts" }` and `shared` with `shareAll` as singleton and `strictVersion`.

**Interpretation:** Unit configured as remote, offering contact administration routes to host.

### 6. projects/host-app/src/main.ts:1

**Observation:** `import('./bootstrap').catch((err) => console.error(err));`.

**Interpretation:** Asynchronous bootstrap internal to host.

### 7. projects/login-mfe-app/src/main.ts:1

**Observation:** `import('./bootstrap')`.

**Interpretation:** Asynchronous bootstrap internal to unit.

### 8. projects/mfe1/src/main.ts:1

**Observation:** `import('./bootstrap')`.

**Interpretation:** Asynchronous bootstrap internal to unit.

### 9. projects/mfe2/src/main.ts:1

**Observation:** `import('./bootstrap')`.

**Interpretation:** Asynchronous bootstrap internal to unit.

### 10. projects/host-app/src/app/app.routes.ts:3

**Observation:** Imports `loadRemoteModule` from `@angular-architects/module-federation`, used at :17, :27 and :36.

**Interpretation:** Remote loading mechanism available in host routes.

### 11. projects/host-app/src/app/app.routes.ts:17; projects/mfe1/webpack.config.js:10-11

**Observation:** In route `contacts`, protected by `AuthGuard` (:15), `loadChildren` calls `loadRemoteModule({ type: 'module', exposedModule: './ContactsModule', remoteEntry: 'http://localhost:4201/remoteEntry.js' })`, using `m.default` (:16-21).

**Interpretation:** Host loads mfe1 exposed routes at runtime through its `remoteEntry.js` URL, linking them to path `contacts`.

### 12. projects/host-app/src/app/app.routes.ts:27; projects/mfe2/webpack.config.js:10-11

**Observation:** In route `admin`, protected by `AuthGuard` (:25), `loadChildren` calls `loadRemoteModule({ type: 'module', exposedModule: './AdminModule', remoteEntry: 'http://localhost:4202/remoteEntry.js' })`, using `m.default` (:26-31).

**Interpretation:** Host loads mfe2 exposed routes at runtime through its `remoteEntry.js` URL, linking them to path `admin`.

### 13. projects/host-app/src/app/app.routes.ts:36; projects/login-mfe-app/webpack.config.js:10-11

**Observation:** In route `login`, `loadChildren` calls `loadRemoteModule({ type: 'module', exposedModule: './LoginModule', remoteEntry: 'http://localhost:4203/remoteEntry.js' })`, using `m.default` (:35-40).

**Interpretation:** Host loads login-mfe-app exposed routes at runtime through its `remoteEntry.js` URL, linking them to path `login`.

### 14. projects/host-app/src/app/app.routes.ts:7-46; projects/host-app/src/app/app.config.ts:12

**Observation:** Table `routes` redirects empty route to `login` (:8-12), links `contacts`, `admin` and `login` to three `loadRemoteModule` calls (:13-41), sending remainder to `NotFoundComponent` (:42-45). Registered through `provideRouter(routes)`.

**Interpretation:** Host route table links each remote unit path to its loader.

### 15. projects/login-mfe-app/src/app/login/login-form/login-form.component.ts:63

**Observation:** `localStorage.setItem('isLoggedIn', 'true');` on valid form submission, followed by `this.router.navigate(['/contacts'])` (:64).

**Interpretation:** Login publishes session state to `localStorage` key, shared-state channel. Line names no unit reading key.

### 16. .; package.json:1-45; angular.json:5

**Observation:** Angular workspace root, with single manifest and `angular.json` declaring four projects. No own entry/UI; targets belong to projects.

**Interpretation:** Coordination root rather than frontend unit.

### 17. projects/host-app; angular.json:6, 13-14, 34-35; projects/host-app/src/main.ts:1; projects/host-app/src/bootstrap.ts:5

**Observation:** Angular workspace project with own entry (`main.ts` → `bootstrap.ts`), target `build` with `ngx-build-plus:browser` and webpack configuration.

**Interpretation:** Frontend unit with own boundary, in host role.

### 18. projects/login-mfe-app; angular.json:309, 320-321, 341-342; projects/login-mfe-app/src/main.ts:1; projects/login-mfe-app/src/bootstrap.ts:5

**Observation:** Angular workspace project with own entry (`main.ts` → `bootstrap.ts`), target `build` with `ngx-build-plus:browser` and webpack configuration.

**Interpretation:** Frontend unit with own boundary.

### 19. projects/mfe1; angular.json:107, 114-115, 135-136; projects/mfe1/src/main.ts:1; projects/mfe1/src/bootstrap.ts:5

**Observation:** Angular workspace project with own entry (`main.ts` → `bootstrap.ts`), target `build` with `ngx-build-plus:browser` and webpack configuration.

**Interpretation:** Frontend unit with own boundary.

### 20. projects/mfe2; angular.json:208, 215-216, 236-237; projects/mfe2/src/main.ts:1; projects/mfe2/src/bootstrap.ts:5

**Observation:** Angular workspace project with own entry (`main.ts` → `bootstrap.ts`), target `build` with `ngx-build-plus:browser` and webpack configuration.

**Interpretation:** Frontend unit with own boundary.

### 21. projects/host-app/src/app/app.routes.ts:3, 7, 36; projects/host-app/webpack.config.js:24; projects/login-mfe-app/webpack.config.js:7, 10-11

**Observation:** Host route `login` loads `./LoginModule` from `http://localhost:4203/remoteEntry.js`, only login-mfe-app exposure, pointing to login form routes. Static host remote uses key `loginMfeApp`, differing from `name: "login-mfe-app"`; loading through URL.

**Interpretation:** Active host → remote relationship.

### 22. projects/host-app/src/app/app.routes.ts:3, 7, 17; projects/host-app/webpack.config.js:22; projects/mfe1/webpack.config.js:7, 10-11

**Observation:** Host route `contacts`, protected by `AuthGuard`, loads `./ContactsModule` from `http://localhost:4201/remoteEntry.js`, mfe1 exposure. Host static remote `mfe1@` matches mfe1 `name`.

**Interpretation:** Active host → remote relationship.

### 23. projects/host-app/src/app/app.routes.ts:3, 7, 27; projects/host-app/webpack.config.js:23; projects/mfe2/webpack.config.js:7, 10-11

**Observation:** Host route `admin`, protected by `AuthGuard`, loads `./AdminModule` from `http://localhost:4202/remoteEntry.js`, mfe2 exposure. Host static remote `mfe2@` matches mfe2 `name`.

**Interpretation:** Active host → remote relationship.

### 24. projects/login-mfe-app/src/app/login/login-form/login-form.component.ts:63; projects/host-app/src/app/auth.guard.ts:11; projects/host-app/src/app/app.routes.ts:15, 25

**Observation:** Login-mfe-app form writes `isLoggedIn = 'true'` to `localStorage`; host `AuthGuard` reads same key to allow routes `contacts` and `admin`. Only login writes key; only host reads; no code deletes it, including host logout (projects/host-app/src/app/app.component.ts:71-74). No configuration declares channel.

**Interpretation:** Active shared-state communication relationship through `localStorage`, from login-mfe-app to host. Valid only with login inside host page under same origin; isolated at port 4203, login-mfe-app has own `localStorage`.

### 25. angular.json:13-16, 35, 53, 76-77; projects/host-app/webpack.config.js:11-36; projects/host-app/webpack.prod.config.js:1

**Observation:** Own target `build` with `ngx-build-plus:browser` and output `dist/host-app`; configuration `production` uses `webpack.prod.config.js`, only reexporting `webpack.config.js`. Remotes declared/loaded at runtime at `localhost`. Served only by `ng serve` at port 4200. No deployment artifact or own version.

**Interpretation:** Own host build boundary without observed deployment.

### 26. angular.json:320-323, 342, 383-384; projects/login-mfe-app/webpack.config.js:6-11

**Observation:** Own target `build` with `ngx-build-plus:browser` and output `dist/login-mfe-app`, generating remote `login-mfe-app` with `./LoginModule`. Served only by development server at port 4203, address of `remoteEntry.js` loaded by host. No deployment artifact or own version.

**Interpretation:** Own remote build boundary without observed deployment.

### 27. angular.json:114-117, 136, 177-178; projects/mfe1/webpack.config.js:6-11

**Observation:** Own target `build` with `ngx-build-plus:browser` and output `dist/mfe1`, generating remote `mfe1` with `./ContactsModule`. Served only by development server at port 4201, address of `remoteEntry.js` loaded by host. No deployment artifact or own version.

**Interpretation:** Own remote build boundary without observed deployment.

### 28. angular.json:215-218, 237, 278-279; projects/mfe2/webpack.config.js:6-11

**Observation:** Own target `build` with `ngx-build-plus:browser` and output `dist/mfe2`, generating remote `mfe2` with `./AdminModule`. Served only by development server at port 4202, address of `remoteEntry.js` loaded by host. No deployment artifact or own version.

**Interpretation:** Own remote build boundary without observed deployment.

## Classification

| # | Origin | Dimension | Type | Approach | Evidence | Strength | Relationships |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.2 (package.json:31) | 1 technology | manifest | module-federation | technological | weak | declares #2; declares #3; declares #4; declares #5; declares #10 |
| 2 | 3.4.2 (package.json:31, Evidence); 3.4.3 (projects/host-app, Markers); 3.4.5 #1, #2, #3 (Configuration); 3.4.6 #1 (Artifacts) | 2 configuration | configuration | module-federation | architectural | strong | configures #17; configures #21; configures #22; configures #23 |
| 3 | 3.4.2 (package.json:31, Evidence); 3.4.3 (projects/login-mfe-app, Markers); 3.4.4 (projects/host-app/src/app/app.routes.ts:36, Observation); 3.4.5 #1 (Configuration); 3.4.6 #2 (Artifacts) | 2 configuration | configuration | module-federation | technological | moderate | configures #18; configures #21 |
| 4 | 3.4.2 (package.json:31, Evidence); 3.4.3 (projects/mfe1, Markers); 3.4.4 (projects/host-app/src/app/app.routes.ts:17, Observation); 3.4.5 #2 (Configuration); 3.4.6 #3 (Artifacts) | 2 configuration | configuration | module-federation | technological | moderate | configures #19; configures #22 |
| 5 | 3.4.2 (package.json:31, Evidence); 3.4.3 (projects/mfe2, Markers); 3.4.4 (projects/host-app/src/app/app.routes.ts:27, Observation); 3.4.5 #3 (Configuration); 3.4.6 #4 (Artifacts) | 2 configuration | configuration | module-federation | technological | moderate | configures #20; configures #23 |
| 6 | 3.4.4 (projects/host-app/src/main.ts:1) | 3 code | source code | — | technological | weak | — |
| 7 | 3.4.4 (projects/login-mfe-app/src/main.ts:1) | 3 code | source code | — | technological | weak | — |
| 8 | 3.4.4 (projects/mfe1/src/main.ts:1) | 3 code | source code | — | technological | weak | — |
| 9 | 3.4.4 (projects/mfe2/src/main.ts:1) | 3 code | source code | — | technological | weak | — |
| 10 | 3.4.4 (projects/host-app/src/app/app.routes.ts:3) | 3 code | source code | module-federation | technological | moderate | implements #21; implements #22; implements #23 |
| 11 | 3.4.4 (projects/host-app/src/app/app.routes.ts:17) | 3 code | source code | module-federation | architectural | strong | implements #22 |
| 12 | 3.4.4 (projects/host-app/src/app/app.routes.ts:27) | 3 code | source code | module-federation | architectural | strong | implements #23 |
| 13 | 3.4.4 (projects/host-app/src/app/app.routes.ts:36) | 3 code | source code | module-federation | architectural | strong | implements #21 |
| 14 | 3.4.4 (projects/host-app/src/app/app.routes.ts:7) | 3 code | source code | module-federation | architectural | strong | implements #21; implements #22; implements #23 |
| 15 | 3.4.4 (projects/login-mfe-app/src/app/login/login-form/login-form.component.ts:63) | 3 code | source code | other | technological | moderate | implements #24 |
| 16 | 3.4.3 (.) | 4 structure | directory | — | context | weak | — |
| 17 | 3.4.3 (projects/host-app) | 4 structure | directory | — | architectural | moderate | — |
| 18 | 3.4.3 (projects/login-mfe-app) | 4 structure | directory | — | architectural | moderate | — |
| 19 | 3.4.3 (projects/mfe1) | 4 structure | directory | — | architectural | moderate | — |
| 20 | 3.4.3 (projects/mfe2) | 4 structure | directory | — | architectural | moderate | — |
| 21 | 3.4.5 #1 | 5 composition | source code | module-federation | architectural | strong | links #17; links #18 |
| 22 | 3.4.5 #2 | 5 composition | source code | module-federation | architectural | strong | links #17; links #19 |
| 23 | 3.4.5 #3 | 5 composition | source code | module-federation | architectural | strong | links #17; links #20 |
| 24 | 3.4.5 #4 | 5 composition | source code | other | architectural | strong | links #18; links #17 |
| 25 | 3.4.6 #1 | 6 build-deploy | configuration | — | architectural | moderate | publishes #17 |
| 26 | 3.4.6 #2 | 6 build-deploy | configuration | — | architectural | moderate | publishes #18 |
| 27 | 3.4.6 #3 | 6 build-deploy | configuration | — | architectural | moderate | publishes #19 |
| 28 | 3.4.6 #4 | 6 build-deploy | configuration | — | architectural | moderate | publishes #20 |

## Summary

Observations: 28. Dimensions (technology: 1, configuration: 4, code: 10, structure: 5, composition: 4, build-deploy: 4, documentation: 0, history: 0). Strength (strong: 9, moderate: 13, weak: 6, ambiguous: 0). Evidence (technological: 10, architectural: 17, context: 1).

