---
schema: 1
id: 1238664148
full_name: LaurineLeNet/microfrontend-angular-angular
commit: 342c92dff482f1ee0a4bcc05f9302361a7354352
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

# 349 — LaurineLeNet/microfrontend-angular-angular

## Repository overview

Evidence forms Native Federation chain: per-application dependency declarations (#1, #3, #5), builders/own configurations (#7–#15), two-remote manifest (#16), route/dashboard loading (#24–#31, #39–#41), two active shell relationships (#45, #46). Directories confirm three frontend units (#42–#44), with separate builds/deployments in own workers (#48–#50). Publication configuration proves neither deployment execution nor independent versioning.

Athletes/ranking also communicate through events (#47). Channel opening, sends/subscription (#34–#38) connect when shell mounts both at same origin; isolated different-host/port execution cannot communicate through channels. Athlete-detail receiver internal to athletes (#32, #33), adding no inter-unit relationship.

`@softarc/native-federation-node` declarations have no direct snapshot usage (#2, #4, #6). History does not explain origin (#51–#53), but past gap does not make current architecture ambiguous. Local bootstraps/remote standalone initialization (#17–#23) also compose no other units. Documentation review has zero claims, so no dimension 7 observations/additional semantic corroboration.

## Observations

### 1. athletes/package.json:14

**Observation:** `@angular-architects/native-federation` (`^21.2.3`) declared in `dependencies`.

**Interpretation:** Declares federation technology; configuration/usage have own observations.

### 2. athletes/package.json:22

**Observation:** `@softarc/native-federation-node` (`^3.3.4`) declared in `dependencies`. Review finds no import/direct invocation in snapshot code/build.

**Interpretation:** Isolated declaration demonstrates no inter-unit integration; recorded federation usage belongs to another package.

### 3. ranking/package.json:14

**Observation:** `@angular-architects/native-federation` (`^21.2.3`) declared in `dependencies`.

**Interpretation:** Declares federation technology; configuration/usage have own observations.

### 4. ranking/package.json:22

**Observation:** `@softarc/native-federation-node` (`^3.3.4`) declared in `dependencies`. Review finds no import/direct invocation in snapshot code/build.

**Interpretation:** Isolated declaration demonstrates no inter-unit integration; recorded federation usage belongs to another package.

### 5. shell/package.json:14

**Observation:** `@angular-architects/native-federation` (`^21.2.3`) declared in `dependencies`.

**Interpretation:** Declares federation technology; configuration/usage have own observations.

### 6. shell/package.json:22

**Observation:** `@softarc/native-federation-node` (`^3.3.4`) declared in `dependencies`. Review finds no import/direct invocation in snapshot code/build.

**Interpretation:** Isolated declaration demonstrates no inter-unit integration; recorded federation usage belongs to another package.

### 7. athletes/angular.json:16-29

**Observation:** Target `build` of `athletes` uses `@angular-architects/native-federation:build`, delegates to `athletes:esbuild:production` or `development`, defaults to production.

**Interpretation:** Configures federation mechanism in unit build without declaring other-unit remote.

### 8. athletes/federation.config.js:1-32

**Observation:** `withNativeFederation` declares `name: athletes`, exposes `./Component` from `src/app/race/race.ts`, `./Routes` from `src/app/shell.routes.ts`, uses `shareAll` with `singleton: true`, `strictVersion: true`, `requiredVersion: auto`. Exclusions in `skip`, `ignoreUnusedDeps: true`.

**Interpretation:** Configures own-unit Native Federation/dependency sharing; offers modules for remote consumption.

### 9. ranking/angular.json:16-29

**Observation:** Target `build` of `ranking` uses `@angular-architects/native-federation:build`, delegates to `ranking:esbuild:production` or `development`, defaults to production.

**Interpretation:** Configures federation mechanism in unit build without declaring other-unit remote.

### 10. ranking/federation.config.js:1-31

**Observation:** `withNativeFederation` declares `name: ranking`, exposes `./Component` from `src/app/app.ts`, uses `shareAll` with `singleton: true`, `strictVersion: true`, `requiredVersion: auto`. Exclusions in `skip`, `ignoreUnusedDeps: true`.

**Interpretation:** Configures own-unit Native Federation/dependency sharing; offers modules for remote consumption.

### 11. shell/angular.json:16-29

**Observation:** Target `build` of `shell` uses `@angular-architects/native-federation:build`, delegates to `shell:esbuild:production` or `development`, defaults to production.

**Interpretation:** Configures federation mechanism in unit build without declaring other-unit remote.

### 12. shell/federation.config.js:1-27

**Observation:** `withNativeFederation` declares `name: shell`, no `exposes`, uses `shareAll` with `singleton: true`, `strictVersion: true`, `requiredVersion: auto`. Exclusions in `skip`, `ignoreUnusedDeps: true`.

**Interpretation:** Configures own-unit Native Federation/dependency sharing without naming host remotes.

### 13. athletes/angular.json:30-39

**Observation:** Target `serve` uses `@angular-architects/native-federation:build` with `target: athletes:serve-original:development`, `dev: true`, `cacheExternalArtifacts: false`.

**Interpretation:** Unit development server passes through federation mechanism. Block links no other unit.

### 14. ranking/angular.json:30-39

**Observation:** Target `serve` uses `@angular-architects/native-federation:build` with `target: ranking:serve-original:development`, `dev: true`, `cacheExternalArtifacts: false`.

**Interpretation:** Unit development server passes through federation mechanism. Block links no other unit.

### 15. shell/angular.json:30-39

**Observation:** Target `serve` uses `@angular-architects/native-federation:build` with `target: shell:serve-original:development`, `dev: true`, `cacheExternalArtifacts: false`.

**Interpretation:** Unit development server passes through federation mechanism. Block links no other unit.

### 16. shell/public/federation.manifest.json:1-4

**Observation:** Manifest associates `athletes`, `ranking` with respective `remoteEntry.json` at `https://mf-angular-athletes.lenetlaurine.workers.dev`, `https://mf-angular-ranking.lenetlaurine.workers.dev`.

**Interpretation:** Host configuration declares two remotes/resolution addresses.

### 17. athletes/src/main.ts:3-5; athletes/src/bootstrap.ts:5

**Observation:** `import('./bootstrap')` loads local bootstrap after `initFederation` without manifest.

**Interpretation:** Asynchronous loading initializes own unit. Construct loads no other application.

### 18. ranking/src/main.ts:3-5; ranking/src/bootstrap.ts:5

**Observation:** `import('./bootstrap')` loads local bootstrap after `initFederation` without manifest.

**Interpretation:** Asynchronous loading initializes own unit. Construct loads no other application.

### 19. shell/src/main.ts:3-5; shell/src/bootstrap.ts:5

**Observation:** `import('./bootstrap')` loads local bootstrap after `initFederation` with `federation.manifest.json`.

**Interpretation:** Asynchronous loading initializes own unit. Construct loads no other application.

### 20. athletes/src/main.ts:1

**Observation:** Imports `initFederation` from `@angular-architects/native-federation`.

**Interpretation:** Prepares standalone unit initialization; import establishes no composition.

### 21. athletes/src/main.ts:3

**Observation:** Calls `initFederation()` without manifest/remote names.

**Interpretation:** Initializes own application federation. Shell consumes exposed modules without executing this main.

### 22. ranking/src/main.ts:1

**Observation:** Imports `initFederation` from `@angular-architects/native-federation`.

**Interpretation:** Prepares standalone unit initialization; import establishes no composition.

### 23. ranking/src/main.ts:3

**Observation:** Calls `initFederation()` without manifest/remote names.

**Interpretation:** Initializes own application federation. Shell consumes exposed modules without executing this main.

### 24. shell/src/app/app.routes.ts:1

**Observation:** Imports `loadRemoteModule` from `@angular-architects/native-federation`.

**Interpretation:** Provides route mechanism; import alone names no target units.

### 25. shell/src/app/app.routes.ts:11-13; shell/src/app/app.config.ts:9; athletes/federation.config.js:6-9; athletes/src/app/shell.routes.ts:7-17

**Observation:** Route `athletes` uses `loadChildren` with `loadRemoteModule('athletes', './Routes').then(m => m.routes)`. Target exposes `./Routes`, exports `routes`; `provideRouter(routes)` registers shell routes.

**Interpretation:** Route connects shell to athletes unit routes through Native Federation.

### 26. shell/src/app/app.routes.ts:16-18; shell/src/app/app.config.ts:9; ranking/federation.config.js:6-8; ranking/src/app/app.ts:19

**Observation:** Route `ranking` uses `loadComponent` with `loadRemoteModule('ranking', './Component').then(m => m.App)`. Target exposes `./Component`, exports `App`; shell routes registered.

**Interpretation:** Route connects shell to ranking unit component through Native Federation.

### 27. shell/src/app/dashboard/dashboard.ts:10

**Observation:** Imports `loadRemoteModule` from `@angular-architects/native-federation`.

**Interpretation:** Provides remote loading used by dashboard; line names no targets.

### 28. shell/src/app/dashboard/dashboard.ts:56; shell/src/app/dashboard/dashboard.ts:59; athletes/federation.config.js:7; shell/src/app/app.routes.ts:6-9

**Observation:** `ngOnInit` loads `loadRemoteModule('athletes', './Component')` in `Promise.all`, stores export `RaceComponent` for mounting. Dashboard a shell-route component/key exposed by target.

**Interpretation:** Call names athletes unit/remote module, connecting shell to target.

### 29. shell/src/app/dashboard/dashboard.ts:57; shell/src/app/dashboard/dashboard.ts:60; ranking/federation.config.js:7; shell/src/app/app.routes.ts:6-9

**Observation:** `ngOnInit` loads `loadRemoteModule('ranking', './Component')` in `Promise.all`, stores export `App` for mounting. Dashboard a shell-route component/key exposed by target.

**Interpretation:** Call names ranking unit/remote module, connecting shell to target.

### 30. shell/src/main.ts:1

**Observation:** Imports `initFederation` from `@angular-architects/native-federation`.

**Interpretation:** Provides runtime initialization used with manifest on another line.

### 31. shell/src/main.ts:3

**Observation:** Calls `initFederation('federation.manifest.json')` before bootstrap.

**Interpretation:** Prepares manifest-based resolution; call names no remotes, targets in configuration #16.

### 32. athletes/src/app/athlete-detail/athlete-detail.ts:75

**Observation:** Declares `channel` field of type `BroadcastChannel` in athletes detail component.

**Interpretation:** Field prepares review-described internal communication. Establishes no inter-unit link.

### 33. athletes/src/app/athlete-detail/athlete-detail.ts:83-89; athletes/src/app/race/race.ts:46; athletes/src/app/race/race.ts:55

**Observation:** Detail opens `BroadcastChannel('athletes-positions')`, updates distance/finish on received route name. Recorded sender RaceComponent also in athletes.

**Interpretation:** Internal athletes communication; sharing channel name does not make receiver inter-unit relationship.

### 34. athletes/src/app/race/race.ts:11; athletes/src/app/race/race.ts:36

**Observation:** Opens `BroadcastChannel(CHANNEL_NAME)` with `CHANNEL_NAME = 'athletes-positions'`.

**Interpretation:** Implements channel used in ranking exchange but opening names no receiver.

### 35. athletes/src/app/race/race.ts:38-50

**Observation:** `advance` publishes name, distance, `finished` with `this.channel.postMessage` after updating each advance.

**Interpretation:** Implements position emission used in communication; call identifies no receiving unit.

### 36. athletes/src/app/race/race.ts:52-56

**Observation:** `reset` publishes message per athlete with zero distance/`finished: false`.

**Interpretation:** Implements reset emission through same channel without naming receivers.

### 37. ranking/src/app/app.ts:38

**Observation:** Declares `channel` field of type `BroadcastChannel` in ranking App.

**Interpretation:** Prepares unit reception mechanism without naming sender.

### 38. ranking/src/app/app.ts:11; ranking/src/app/app.ts:41-48

**Observation:** `ngOnInit` opens `athletes-positions` channel/installs `onmessage` to update position map with name, distance, `finished`.

**Interpretation:** Implements inter-unit exchange reception but subscription mechanism names no sending unit.

### 39. shell/src/app/app.routes.ts:5-25; shell/src/app/app.config.ts:9; shell/src/app/app.html:3-5

**Observation:** Table declares dashboard, athletes/ranking loading routes/initial dashboard redirect. `provideRouter(routes)` registers it/navigation offers three paths.

**Interpretation:** Shell routing organizes both remotes/joint display.

### 40. shell/src/app/dashboard/dashboard.ts:25; shell/src/app/dashboard/dashboard.ts:59; shell/src/app/dashboard/dashboard.ts:70

**Observation:** `athletesHost.createComponent(this.pendingAthletes)` mounts stored type after loading in dashboard container `athletesHost`.

**Interpretation:** Mount materializes previously loaded component in shell. Call uses stored type/depends on loading stage to identify remote.

### 41. shell/src/app/dashboard/dashboard.ts:37; shell/src/app/dashboard/dashboard.ts:60; shell/src/app/dashboard/dashboard.ts:75

**Observation:** `rankingHost.createComponent(this.pendingRanking)` mounts stored type after loading in dashboard container `rankingHost`.

**Interpretation:** Mount materializes previously loaded component in shell. Call uses stored type/depends on loading stage to identify remote.

### 42. athletes/; athletes/package.json:1-11; athletes/src/main.ts:3-5; athletes/src/bootstrap.ts:5; athletes/angular.json:16-29; athletes/angular.json:43-46

**Observation:** Directory `athletes` contains own package, entry through main/bootstrap and federation build target over `@angular/build:application`.

**Interpretation:** Confirms frontend unit boundary with own entry/build without alone demonstrating other-unit link.

### 43. ranking/; ranking/package.json:1-11; ranking/src/main.ts:3-5; ranking/src/bootstrap.ts:5; ranking/angular.json:16-29; ranking/angular.json:43-46

**Observation:** Directory `ranking` contains own package, entry through main/bootstrap and federation build target over `@angular/build:application`.

**Interpretation:** Confirms frontend unit boundary with own entry/build without alone demonstrating other-unit link.

### 44. shell/; shell/package.json:1-11; shell/src/main.ts:3-5; shell/src/bootstrap.ts:5; shell/angular.json:16-29; shell/angular.json:43-46

**Observation:** Directory `shell` contains own package, entry through main/bootstrap and federation build target over `@angular/build:application`.

**Interpretation:** Confirms frontend unit boundary with own entry/build without alone demonstrating other-unit link.

### 45. shell/src/main.ts:3; shell/public/federation.manifest.json:2; shell/src/app/app.routes.ts:13; shell/src/app/dashboard/dashboard.ts:56; shell/src/app/dashboard/dashboard.ts:70; athletes/federation.config.js:4-9; athletes/wrangler.jsonc:3-16

**Observation:** Shell resolves `athletes` through manifest to worker, loads `./Routes` in route/`./Component` in dashboard. Name/keys match target configuration, present in snapshot.

**Interpretation:** Active shell → athletes host → remote relationship with connected resolution, exposure/consumption.

### 46. shell/src/main.ts:3; shell/public/federation.manifest.json:3; shell/src/app/app.routes.ts:18; shell/src/app/dashboard/dashboard.ts:57; shell/src/app/dashboard/dashboard.ts:75; ranking/federation.config.js:4-8; ranking/wrangler.jsonc:3-16

**Observation:** Shell resolves `ranking` through manifest to worker, loads `./Component` in route/dashboard. Name/keys match target configuration, present in snapshot.

**Interpretation:** Active shell → ranking host → remote relationship with connected resolution, exposure/consumption.

### 47. athletes/src/app/race/race.ts:11; athletes/src/app/race/race.ts:36; athletes/src/app/race/race.ts:46; athletes/src/app/race/race.ts:55; ranking/src/app/app.ts:11; ranking/src/app/app.ts:38-48; shell/src/app/dashboard/dashboard.ts:54-78

**Observation:** RaceComponent in athletes publishes positions/resets in `athletes-positions`; ranking App opens same channel, receives/updates ranking. Dashboard mounts both in same page.

**Interpretation:** Active athletes → ranking relationship uses events through BroadcastChannel. Requires same origin, met when both run in shell; isolated different-origin hosting does not offer exchange.

### 48. athletes/package.json:3-11; athletes/angular.json:16-29; athletes/angular.json:43-46; athletes/wrangler.jsonc:3-16; athletes/public/_headers:1-2; shell/public/federation.manifest.json:2

**Observation:** `ng build` of `athletes` uses own federation target over esbuild. Worker `mf-angular-athletes` serves `./dist/athletes/browser` as SPA. Package private, version `0.0.0`. Remote has open CORS/shell manifest points to worker host.

**Interpretation:** Separate build/deployment confirm per-application publication boundary. Review records no independent versioning/proven deployment execution.

### 49. ranking/package.json:3-11; ranking/angular.json:16-29; ranking/angular.json:43-46; ranking/wrangler.jsonc:3-16; ranking/public/_headers:1-2; shell/public/federation.manifest.json:3

**Observation:** `ng build` of `ranking` uses own federation target over esbuild. Worker `mf-angular-ranking` serves `./dist/ranking/browser` as SPA. Package private, version `0.0.0`. Remote has open CORS/shell manifest points to worker host.

**Interpretation:** Separate build/deployment confirm per-application publication boundary. Review records no independent versioning/proven deployment execution.

### 50. shell/package.json:3-11; shell/angular.json:16-29; shell/angular.json:43-46; shell/wrangler.jsonc:3-16

**Observation:** `ng build` of `shell` uses own federation target over esbuild. Worker `mf-angular-shell` serves `./dist/shell/browser` as SPA. Package private, version `0.0.0`. Snapshot supplies no shell worker address.

**Interpretation:** Separate build/deployment confirm per-application publication boundary. Review records no independent versioning/proven deployment execution.

### 51. 73c274c 2026-05-14 (athletes/package.json); 342c92d 2026-06-08 (athletes/package.json)

**Observation:** History review records `athletes/package.json` created in initial commit/modified in snapshot. Initial blob absent/read failed. Cannot determine whether `@softarc/native-federation-node` already declared or why retained.

**Interpretation:** Historical dependency past inconclusive. Snapshot clear on absent direct usage; uncertainty opens no competing current architectural interpretations.

### 52. 73c274c 2026-05-14 (ranking/package.json); 342c92d 2026-06-08 (ranking/package.json)

**Observation:** History review records `ranking/package.json` created in initial commit/modified in snapshot. Initial blob absent/read failed. Cannot determine whether `@softarc/native-federation-node` already declared or why retained.

**Interpretation:** Historical dependency past inconclusive. Snapshot clear on absent direct usage; uncertainty opens no competing current architectural interpretations.

### 53. 73c274c 2026-05-14 (shell/package.json); 342c92d 2026-06-08 (shell/package.json)

**Observation:** History review records `shell/package.json` created in initial commit/modified in snapshot. Initial blob absent/read failed. Cannot determine whether `@softarc/native-federation-node` already declared or why retained.

**Interpretation:** Historical dependency past inconclusive. Snapshot clear on absent direct usage; uncertainty opens no competing current architectural interpretations.

## Classification

| # | Origin | Dimension | Type | Approach | Evidence | Strength | Relationships |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.2 (athletes/package.json:14) | 1 technology | manifest | native-federation | technological | weak | declares #7; declares #8 |
| 2 | 3.4.2 (athletes/package.json:22) | 1 technology | manifest | native-federation | technological | weak | — |
| 3 | 3.4.2 (ranking/package.json:14) | 1 technology | manifest | native-federation | technological | weak | declares #9; declares #10 |
| 4 | 3.4.2 (ranking/package.json:22) | 1 technology | manifest | native-federation | technological | weak | — |
| 5 | 3.4.2 (shell/package.json:14) | 1 technology | manifest | native-federation | technological | weak | declares #11; declares #12 |
| 6 | 3.4.2 (shell/package.json:22) | 1 technology | manifest | native-federation | technological | weak | — |
| 7 | 3.4.2 (athletes/package.json:14) (Evidence (artefato:linha)); 3.4.3 (athletes) (Markers, Build); 3.4.6 #1 (Artifacts) | 2 configuration | configuration | native-federation | technological | moderate | configures #42; configures #48 |
| 8 | 3.4.2 (athletes/package.json:14) (Evidence (artefato:linha)); 3.4.2 (athletes/package.json:22) (Evidence (artefato:linha)); 3.4.3 (athletes) (Markers); 3.4.4 (athletes/src/main.ts:3) (Observation); 3.4.4 (shell/src/app/app.routes.ts:13) (Observation); 3.4.4 (shell/src/app/dashboard/dashboard.ts:56) (Observation); 3.4.5 #1 (Configuration) | 2 configuration | configuration | native-federation | technological | moderate | configures #42; configures #45 |
| 9 | 3.4.2 (ranking/package.json:14) (Evidence (artefato:linha)); 3.4.3 (ranking) (Markers, Build); 3.4.6 #2 (Artifacts) | 2 configuration | configuration | native-federation | technological | moderate | configures #43; configures #49 |
| 10 | 3.4.2 (ranking/package.json:14) (Evidence (artefato:linha)); 3.4.2 (ranking/package.json:22) (Evidence (artefato:linha)); 3.4.3 (ranking) (Markers); 3.4.4 (ranking/src/main.ts:3) (Observation); 3.4.4 (shell/src/app/app.routes.ts:18) (Observation); 3.4.4 (shell/src/app/dashboard/dashboard.ts:57) (Observation); 3.4.5 #2 (Configuration) | 2 configuration | configuration | native-federation | technological | moderate | configures #43; configures #46 |
| 11 | 3.4.2 (shell/package.json:14) (Evidence (artefato:linha)); 3.4.3 (shell) (Markers, Build); 3.4.6 #3 (Artifacts) | 2 configuration | configuration | native-federation | technological | moderate | configures #44; configures #50 |
| 12 | 3.4.2 (shell/package.json:14) (Evidence (artefato:linha)); 3.4.2 (shell/package.json:22) (Evidence (artefato:linha)); 3.4.3 (shell) (Markers) | 2 configuration | configuration | native-federation | technological | moderate | configures #44 |
| 13 | 3.4.3 (athletes) (Markers) | 2 configuration | configuration | native-federation | technological | moderate | configures #42 |
| 14 | 3.4.3 (ranking) (Markers) | 2 configuration | configuration | native-federation | technological | moderate | configures #43 |
| 15 | 3.4.3 (shell) (Markers) | 2 configuration | configuration | native-federation | technological | moderate | configures #44 |
| 16 | 3.4.4 (shell/src/main.ts:3) (Observation); 3.4.5 #1 (Configuration); 3.4.5 #2 (Configuration); 3.4.6 #1 (Where served); 3.4.6 #2 (Where served) | 2 configuration | configuration | native-federation | architectural | strong | configures #31; configures #45; configures #46 |
| 17 | 3.4.4 (athletes/src/main.ts:5) | 3 code | source code | native-federation | technological | weak | — |
| 18 | 3.4.4 (ranking/src/main.ts:5) | 3 code | source code | native-federation | technological | weak | — |
| 19 | 3.4.4 (shell/src/main.ts:5) | 3 code | source code | native-federation | technological | weak | — |
| 20 | 3.4.4 (athletes/src/main.ts:1) | 3 code | source code | native-federation | technological | weak | — |
| 21 | 3.4.4 (athletes/src/main.ts:3) | 3 code | source code | native-federation | technological | weak | — |
| 22 | 3.4.4 (ranking/src/main.ts:1) | 3 code | source code | native-federation | technological | weak | — |
| 23 | 3.4.4 (ranking/src/main.ts:3) | 3 code | source code | native-federation | technological | weak | — |
| 24 | 3.4.4 (shell/src/app/app.routes.ts:1) | 3 code | source code | native-federation | technological | moderate | implements #45; implements #46 |
| 25 | 3.4.4 (shell/src/app/app.routes.ts:13) | 3 code | source code | native-federation | architectural | strong | implements #45 |
| 26 | 3.4.4 (shell/src/app/app.routes.ts:18) | 3 code | source code | native-federation | architectural | strong | implements #46 |
| 27 | 3.4.4 (shell/src/app/dashboard/dashboard.ts:10) | 3 code | source code | native-federation | technological | moderate | implements #45; implements #46 |
| 28 | 3.4.4 (shell/src/app/dashboard/dashboard.ts:56) | 3 code | source code | native-federation | architectural | strong | implements #45 |
| 29 | 3.4.4 (shell/src/app/dashboard/dashboard.ts:57) | 3 code | source code | native-federation | architectural | strong | implements #46 |
| 30 | 3.4.4 (shell/src/main.ts:1) | 3 code | source code | native-federation | technological | moderate | implements #45; implements #46 |
| 31 | 3.4.4 (shell/src/main.ts:3) | 3 code | source code | native-federation | technological | moderate | implements #45; implements #46 |
| 32 | 3.4.4 (athletes/src/app/athlete-detail/athlete-detail.ts:75) | 3 code | source code | events | context | weak | — |
| 33 | 3.4.4 (athletes/src/app/athlete-detail/athlete-detail.ts:83) | 3 code | source code | events | context | weak | — |
| 34 | 3.4.4 (athletes/src/app/race/race.ts:36) | 3 code | source code | events | technological | moderate | implements #47 |
| 35 | 3.4.4 (athletes/src/app/race/race.ts:46) | 3 code | source code | events | technological | moderate | implements #47 |
| 36 | 3.4.4 (athletes/src/app/race/race.ts:55) | 3 code | source code | events | technological | moderate | implements #47 |
| 37 | 3.4.4 (ranking/src/app/app.ts:38) | 3 code | source code | events | technological | moderate | implements #47 |
| 38 | 3.4.4 (ranking/src/app/app.ts:41) | 3 code | source code | events | technological | moderate | implements #47 |
| 39 | 3.4.4 (shell/src/app/app.routes.ts:5) | 3 code | source code | native-federation | architectural | strong | implements #45; implements #46 |
| 40 | 3.4.4 (shell/src/app/dashboard/dashboard.ts:70) | 3 code | source code | native-federation | architectural | moderate | implements #45 |
| 41 | 3.4.4 (shell/src/app/dashboard/dashboard.ts:75) | 3 code | source code | native-federation | architectural | moderate | implements #46 |
| 42 | 3.4.3 (athletes) | 4 structure | directory | — | architectural | moderate | — |
| 43 | 3.4.3 (ranking) | 4 structure | directory | — | architectural | moderate | — |
| 44 | 3.4.3 (shell) | 4 structure | directory | — | architectural | moderate | — |
| 45 | 3.4.5 #1 | 5 composition | source code | native-federation | architectural | strong | links #44; links #42 |
| 46 | 3.4.5 #2 | 5 composition | source code | native-federation | architectural | strong | links #44; links #43 |
| 47 | 3.4.5 #3 | 5 composition | source code | events | architectural | strong | links #42; links #43 |
| 48 | 3.4.6 #1 | 6 build-deploy | deploy | — | architectural | moderate | publishes #42 |
| 49 | 3.4.6 #2 | 6 build-deploy | deploy | — | architectural | moderate | publishes #43 |
| 50 | 3.4.6 #3 | 6 build-deploy | deploy | — | architectural | moderate | publishes #44 |
| 51 | 3.4.8 #1 | 8 history | history | native-federation | technological | weak | explains #2 |
| 52 | 3.4.8 #2 | 8 history | history | native-federation | technological | weak | explains #4 |
| 53 | 3.4.8 #3 | 8 history | history | native-federation | technological | weak | explains #6 |

## Summary

Observations: 53. Dimensions (technology: 6, configuration: 10, code: 25, structure: 3, composition: 3, build-deploy: 3, documentation: 0, history: 3). Strength (strong: 9, moderate: 26, weak: 18, ambiguous: 0). Evidence (technological: 34, architectural: 17, context: 2).
