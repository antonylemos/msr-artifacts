---
schema: 1
id: 1366618635
full_name: tonoizer/react-mf-patch-skew-repro
commit: 92739d5e61a09a9b31e6b53f0662f6f9e71b5e3a
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

# 309 — tonoizer/react-mf-patch-skew-repro

## Repository overview

Four React/Vite applications have own entries/builds in same pnpm workspace (#16–#19, #23–#26). Evidence chain runs from plugin declarations (#1–#4) through federation configurations (#5–#8), imports/rendering (#9–#14) and three composition relationships (#20–#22). Host consumes remote_a/remote_b; remote_a exposes same App consuming remote_c, simultaneously remote and nested host. Two target-naming configurations and three imports directly identify links; isolated remote_b/remote_c exposures only configure unit mechanisms.

Implemented composition serves React sharing failure reproduction. Section 3.4.5 judges three relationships active through entry/consumption chain, although versioned output records host failure before remote mounting (#20–#22, #27). No runtime success inferred from judgment. Builds separate without demonstrated deployment/independent versioning (#23–#26); preview ports local execution. Root only coordinates packages (#15).

Documentation confirms unit roles (#29–#32) but improperly generalizes distinct patches: host/remote_c use same 19.2.8 (#28). Sharing list also exceeds demonstrated usage: react/jsx-dev-runtime and react/compiler-runtime declared without observed consumers (#33). Claims remain weak even when corroborated (#27–#35). Single-commit history clarifies qualifications coexist since first observable version (#36–#37) without demonstrating intent/earlier usage. No architectural ambiguities remain recorded in final reviews.

## Observations

### 1. host/package.json:15

**Observation:** Manifest of `host` declares `@module-federation/vite` 1.21.6 in `devDependencies`.

**Interpretation:** Declaration isolated Module Federation technological signal; configuration in use has own observation.

### 2. remote_a/package.json:15

**Observation:** Manifest of `remote_a` declares `@module-federation/vite` 1.21.6 in `devDependencies`.

**Interpretation:** Declaration isolated Module Federation technological signal; configuration in use has own observation.

### 3. remote_b/package.json:15

**Observation:** Manifest of `remote_b` declares `@module-federation/vite` 1.21.6 in `devDependencies`.

**Interpretation:** Declaration isolated Module Federation technological signal; configuration in use has own observation.

### 4. remote_c/package.json:15

**Observation:** Manifest of `remote_c` declares `@module-federation/vite` 1.21.6 in `devDependencies`.

**Interpretation:** Declaration isolated Module Federation technological signal; configuration in use has own observation.

### 5. host/vite.config.js:3; host/vite.config.js:5-11; host/vite.config.js:19-36

**Observation:** `federation` declares `name: 'host'` and two `module` remotes: `remote_a`, entry `http://localhost:5001/remoteEntry.js`, and `remote_b`, entry `http://localhost:5002/remoteEntry.js`. Five `shared` entries `react`, `react/jsx-runtime`, `react/jsx-dev-runtime`, `react/compiler-runtime` and `react-dom/client`, all with `singleton: true`, `strictVersion: false` and `requiredVersion: '^19.2.4'`. Plugin uses `shareStrategy: 'version-first'` and `hostInitInjectLocation: 'entry'`.

**Interpretation:** Configuration explicitly links host to two other units through Module Federation.

### 6. remote_a/vite.config.js:3; remote_a/vite.config.js:5-11; remote_a/vite.config.js:19-35

**Observation:** `federation` declares `name: 'remote_a'`, `filename: 'remoteEntry.js'`, exposes `./App` from `./src/App.jsx` and declares `remote_c` of type `module`, entry `http://localhost:5003/remoteEntry.js`. Five `shared` entries `react`, `react/jsx-runtime`, `react/jsx-dev-runtime`, `react/compiler-runtime` and `react-dom/client`, all with `singleton: true`, `strictVersion: false` and `requiredVersion: '^19.2.4'`. Plugin uses `shareStrategy: 'version-first'` and `hostInitInjectLocation: 'entry'`.

**Interpretation:** Configuration links remote_a to remote_c, providing own App: remote_a combines remote/nested host roles.

### 7. remote_b/vite.config.js:3; remote_b/vite.config.js:5-11; remote_b/vite.config.js:19-28

**Observation:** `federation` declares `name: 'remote_b'`, `filename: 'remoteEntry.js'`, exposing `./App` from `./src/App.jsx` without declaring remotes. Five `shared` entries `react`, `react/jsx-runtime`, `react/jsx-dev-runtime`, `react/compiler-runtime` and `react-dom/client`, all with `singleton: true`, `strictVersion: false` and `requiredVersion: '^19.2.4'`. Plugin uses `shareStrategy: 'version-first'` and `hostInitInjectLocation: 'entry'`.

**Interpretation:** Configures remote unit exposure/sharing; alone identifies no consumer.

### 8. remote_c/vite.config.js:3; remote_c/vite.config.js:5-11; remote_c/vite.config.js:19-28

**Observation:** `federation` declares `name: 'remote_c'`, `filename: 'remoteEntry.js'`, exposing `./App` from `./src/App.jsx` without declaring remotes. Five `shared` entries `react`, `react/jsx-runtime`, `react/jsx-dev-runtime`, `react/compiler-runtime` and `react-dom/client`, all with `singleton: true`, `strictVersion: false` and `requiredVersion: '^19.2.4'`. Plugin uses `shareStrategy: 'version-first'` and `hostInitInjectLocation: 'entry'`.

**Interpretation:** Configures remote unit exposure/sharing; alone identifies no consumer.

### 9. host/src/App.jsx:3

**Observation:** `const RemoteA = lazy(() => import('remote_a/App'))` creates component from named remote module.

**Interpretation:** Import directly identifies target unit in federated composition of `host`.

### 10. host/src/App.jsx:4

**Observation:** `const RemoteB = lazy(() => import('remote_b/App'))` creates component from named remote module.

**Interpretation:** Import directly identifies target unit in federated composition of `host`.

### 11. remote_a/src/App.jsx:3

**Observation:** `const RemoteC = lazy(() => import('remote_c/App'))` creates component from named remote module.

**Interpretation:** Import directly identifies target unit in federated composition of `remote_a`.

### 12. host/src/App.jsx:76

**Observation:** `<RemoteA />` rendered inside `Suspense` and `ErrorBoundary`.

**Interpretation:** Rendering uses remote-import-prepared component, composing `host` interface. Isolated excerpt shows component mounting; federated identity in matching import.

### 13. host/src/App.jsx:88

**Observation:** `<RemoteB />` rendered inside `Suspense` and `ErrorBoundary`.

**Interpretation:** Rendering uses remote-import-prepared component, composing `host` interface. Isolated excerpt shows component mounting; federated identity in matching import.

### 14. remote_a/src/App.jsx:12

**Observation:** `<RemoteC />` rendered inside `Suspense`.

**Interpretation:** Rendering uses remote-import-prepared component, composing `remote_a` interface. Isolated excerpt shows component mounting; federated identity in matching import.

### 15. .; package.json:1-17; pnpm-workspace.yaml:1-5

**Observation:** Root has private manifest with scripts delegating builds/previews to four packages, plus `playwright-core`, without own UI entry/build.

**Interpretation:** Workspace coordination marked frontend unit No rather than fifth application.

### 16. host; host/package.json:1-19; host/index.html:8-9; host/src/main.jsx:5-9; host/vite.config.js:13-39; pnpm-workspace.yaml:2

**Observation:** `host` has own manifest, `index.html` with root/entry `/src/main.jsx`, React mounting and Vite configuration. Local build script executes `vite build`; package in workspace.

**Interpretation:** Frontend unit with own entry/build boundary per Yes in structure review.

### 17. remote_a; remote_a/package.json:1-19; remote_a/index.html:8-9; remote_a/src/main.jsx:5; remote_a/vite.config.js:13-38; pnpm-workspace.yaml:3

**Observation:** `remote_a` has own manifest, `index.html` with root/entry `/src/main.jsx`, React mounting and Vite configuration. Local build script executes `vite build`; package in workspace.

**Interpretation:** Frontend unit with own entry/build boundary per Yes in structure review.

### 18. remote_b; remote_b/package.json:1-19; remote_b/index.html:8-9; remote_b/src/main.jsx:5; remote_b/vite.config.js:13-31; pnpm-workspace.yaml:4

**Observation:** `remote_b` has own manifest, `index.html` with root/entry `/src/main.jsx`, React mounting and Vite configuration. Local build script executes `vite build`; package in workspace.

**Interpretation:** Frontend unit with own entry/build boundary per Yes in structure review.

### 19. remote_c; remote_c/package.json:1-19; remote_c/index.html:8-9; remote_c/src/main.jsx:5; remote_c/vite.config.js:13-31; pnpm-workspace.yaml:5

**Observation:** `remote_c` has own manifest, `index.html` with root/entry `/src/main.jsx`, React mounting and Vite configuration. Local build script executes `vite build`; package in workspace.

**Interpretation:** Frontend unit with own entry/build boundary per Yes in structure review.

### 20. host/src/App.jsx:3; host/src/App.jsx:76; host/vite.config.js:22-26; remote_a/vite.config.js:16; remote_a/vite.config.js:20-24

**Observation:** `host` imports `remote_a/App`, rendering `RemoteA`. Declared remote resolves to `name`, `filename` and `base` of `remote_a`, exposing `./App` from `./src/App.jsx`.

**Interpretation:** Host → remote relationship `host → remote_a`, present in snapshot and judged active in 3.4.5. remote_a exposed App also mounts remote_c, forming nested composition.

### 21. host/src/App.jsx:4; host/src/App.jsx:88; host/vite.config.js:27-31; remote_b/vite.config.js:16; remote_b/vite.config.js:20-24

**Observation:** `host` imports `remote_b/App`, rendering `RemoteB`. Declared remote resolves to `name`, `filename` and `base` of `remote_b`, exposing `./App` from `./src/App.jsx`.

**Interpretation:** Host → remote relationship `host → remote_b`, present in snapshot and judged active in 3.4.5. Recorded execution failure does not alter judgment of implemented chain.

### 22. remote_a/src/App.jsx:3; remote_a/src/App.jsx:12; remote_a/vite.config.js:26-30; remote_c/vite.config.js:16; remote_c/vite.config.js:20-24

**Observation:** `remote_a` imports `remote_c/App`, rendering `RemoteC`. Declared remote resolves to `name`, `filename` and `base` of `remote_c`, exposing `./App` from `./src/App.jsx`.

**Interpretation:** Host → remote relationship `remote_a → remote_c`, present in snapshot and judged active in 3.4.5. Since App also exposed to host, nested composition participates in both standalone entry/federated consumption.

### 23. host/package.json:6; host/vite.config.js:13-39; package.json:6-11

**Observation:** `host` executes `vite build` with own configuration, `base` at `http://localhost:5000/` and local preview at same port. Root offers per-package builds and `build:all`, order remote_c, remote_b, remote_a, host.

**Interpretation:** Build separate, deployment not observed and independent versioning No in 3.4.6. Local preview execution demonstrates no independent publication.

### 24. remote_a/package.json:6; remote_a/vite.config.js:13-38; package.json:6-11

**Observation:** `remote_a` executes `vite build` with own configuration, `base` at `http://localhost:5001/` and local preview at same port. Root offers per-package builds and `build:all`, order remote_c, remote_b, remote_a, host.

**Interpretation:** Build separate, deployment not observed and independent versioning No in 3.4.6. Local preview execution demonstrates no independent publication.

### 25. remote_b/package.json:6; remote_b/vite.config.js:13-31; package.json:6-11

**Observation:** `remote_b` executes `vite build` with own configuration, `base` at `http://localhost:5002/` and local preview at same port. Root offers per-package builds and `build:all`, order remote_c, remote_b, remote_a, host.

**Interpretation:** Build separate, deployment not observed and independent versioning No in 3.4.6. Local preview execution demonstrates no independent publication.

### 26. remote_c/package.json:6; remote_c/vite.config.js:13-31; package.json:6-11

**Observation:** `remote_c` executes `vite build` with own configuration, `base` at `http://localhost:5003/` and local preview at same port. Root offers per-package builds and `build:all`, order remote_c, remote_b, remote_a, host.

**Interpretation:** Build separate, deployment not observed and independent versioning No in 3.4.6. Local preview execution demonstrates no independent publication.

### 27. README.md:3

**Observation:** README presents reproduction of production-build failure of federated Vite apps when React family shared as singleton with `requiredVersion: '^19.2.4'`, attributing to early evaluation of local react-dom fallback against shared React provider.

**Interpretation:** Architectural claim corroborated in 3.4.7 by configured arrangement/versioned outputs. Recorded natural execution fails before remote mounting; remote_a/remote_b errors #527 from forced loads. Claim alone semantic, demonstrating no successful composition execution.

### 28. README.md:3

**Observation:** README claims each app installs different React 19.2.x patch.

**Interpretation:** Unit claim contradicted in 3.4.7: host/remote_c pin 19.2.8, remote_a 19.2.4 and remote_b 19.2.6. Generalization cannot evidence four distinct patches.

### 29. README.md:11

**Observation:** Table presents host with React 19.2.8 and remotes remote_a/remote_b.

**Interpretation:** Describes host role in federated organization corroborated by two relationships/configuration.

### 30. README.md:12

**Observation:** Table presents remote_a with React 19.2.4, ./App exposure and remote_c remote, calling it nested host.

**Interpretation:** Describes remote_a dual role corroborated by exposure/remote_c relationship.

### 31. README.md:13

**Observation:** Table presents remote_b with React 19.2.6, ./App exposure and remote-only role.

**Interpretation:** Describes host-consumed unit corroborated by relationship/configuration without own remotes.

### 32. README.md:14

**Observation:** Table presents remote_c with React 19.2.8, ./App exposure and nesting under remote_a.

**Interpretation:** Describes unit chain position corroborated by configuration/remote_a → remote_c relationship.

### 33. README.md:16-22

**Observation:** README lists react, react/jsx-runtime, react/jsx-dev-runtime, react/compiler-runtime and react-dom/client shared with singleton, strictVersion false, requiredVersion ^19.2.4 and version-first strategy.

**Interpretation:** Technological claim partially corroborated in 3.4.7: configurations declare five entries but only react, react-dom/client and react/jsx-runtime have demonstrated usage in at least two units. Other two scope availability does not establish consumption.

### 34. README.md:24

**Observation:** README claims hostInitInjectLocation entry in all apps.

**Interpretation:** Corroborated technological claim: same option in four federation configurations. Alone establishes no inter-unit link.

### 35. README.md:24

**Observation:** README names Vite 6.3.x, @module-federation/vite 1.21.6 and runtime 2.9.0.

**Interpretation:** Technological claim corroborated by manifests/transitive plugin lockfile dependency; alone locates no composition.

### 36. 92739d5e61a09a9b31e6b53f0662f6f9e71b5e3a 2026-09-11 (README.md:3,65; host/package.json:11-12; remote_c/package.json:11-12)

**Observation:** History review records single commit through snapshot. Already contains README distinct-patch generalization and host/remote_c manifests pinning 19.2.8.

**Interpretation:** Point clarified: no recorded transition from distinct to identical patches. Delimits observable past without explaining wording or modifying contradicted claim.

### 37. 92739d5e61a09a9b31e6b53f0662f6f9e71b5e3a 2026-09-11 (README.md:16-22; host/vite.config.js:8-9; remote_a/vite.config.js:8-9; remote_b/vite.config.js:8-9; remote_c/vite.config.js:8-9)

**Observation:** History review records README, react/jsx-dev-runtime/react/compiler-runtime configurations, sources and evidence added in only commit without earlier recorded stage with consumers of two entries.

**Interpretation:** Point clarified within history limits: declaration/source state coexist since first observation. Demonstrates neither usage, consumer removal nor abandonment; documentary partial corroboration retained.

## Classification

| # | Origin | Dimension | Type | Approach | Evidence | Strength | Relationships |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.2 (host/package.json:15) | 1 technology | manifest | module-federation | technological | weak | declares #5 |
| 2 | 3.4.2 (remote_a/package.json:15) | 1 technology | manifest | module-federation | technological | weak | declares #6 |
| 3 | 3.4.2 (remote_b/package.json:15) | 1 technology | manifest | module-federation | technological | weak | declares #7 |
| 4 | 3.4.2 (remote_c/package.json:15) | 1 technology | manifest | module-federation | technological | weak | declares #8 |
| 5 | 3.4.2 (host/package.json:15, Evidence); 3.4.3 (host, Markers and Build); 3.4.4 (host/src/App.jsx:3 and :4, Observation); 3.4.5 #1, #2 (Configuration); 3.4.6 #1 (Artifacts); 3.4.7 #1, #3, #7, #8 (Evidence); 3.4.8 #2 (Origin) | 2 configuration | configuration | module-federation | architectural | strong | configures #16; configures #9; configures #10; configures #20; configures #21 |
| 6 | 3.4.2 (remote_a/package.json:15, Evidence); 3.4.3 (remote_a, Markers and Build); 3.4.4 (host/src/App.jsx:3 and remote_a/src/App.jsx:3, Observation); 3.4.5 #1, #3 (Configuration); 3.4.6 #2 (Artifacts); 3.4.7 #4, #7, #8 (Evidence); 3.4.8 #2 (Origin) | 2 configuration | configuration | module-federation | architectural | strong | configures #17; configures #11; configures #20; configures #22 |
| 7 | 3.4.2 (remote_b/package.json:15, Evidence); 3.4.3 (remote_b, Markers and Build); 3.4.4 (host/src/App.jsx:4, Observation); 3.4.5 #2 (Configuration); 3.4.6 #3 (Artifacts); 3.4.7 #5, #7, #8 (Evidence); 3.4.8 #2 (Origin) | 2 configuration | configuration | module-federation | technological | moderate | configures #18; configures #21 |
| 8 | 3.4.2 (remote_c/package.json:15, Evidence); 3.4.3 (remote_c, Markers and Build); 3.4.4 (remote_a/src/App.jsx:3, Observation); 3.4.5 #3 (Configuration); 3.4.6 #4 (Artifacts); 3.4.7 #6, #7, #8 (Evidence); 3.4.8 #2 (Origin) | 2 configuration | configuration | module-federation | technological | moderate | configures #19; configures #22 |
| 9 | 3.4.4 (host/src/App.jsx:3, src-remote-import) | 3 code | source code | module-federation | architectural | strong | implements #20 |
| 10 | 3.4.4 (host/src/App.jsx:4, src-remote-import) | 3 code | source code | module-federation | architectural | strong | implements #21 |
| 11 | 3.4.4 (remote_a/src/App.jsx:3, src-remote-import) | 3 code | source code | module-federation | architectural | strong | implements #22 |
| 12 | 3.4.4 (host/src/App.jsx:76, manual) | 3 code | source code | module-federation | architectural | moderate | implements #20 |
| 13 | 3.4.4 (host/src/App.jsx:88, manual) | 3 code | source code | module-federation | architectural | moderate | implements #21 |
| 14 | 3.4.4 (remote_a/src/App.jsx:12, manual) | 3 code | source code | module-federation | architectural | moderate | implements #22 |
| 15 | 3.4.3 (.) | 4 structure | directory | — | context | weak | — |
| 16 | 3.4.3 (host) | 4 structure | directory | — | architectural | moderate | — |
| 17 | 3.4.3 (remote_a) | 4 structure | directory | — | architectural | moderate | — |
| 18 | 3.4.3 (remote_b) | 4 structure | directory | — | architectural | moderate | — |
| 19 | 3.4.3 (remote_c) | 4 structure | directory | — | architectural | moderate | — |
| 20 | 3.4.5 #1 | 5 composition | source code | module-federation | architectural | strong | links #16; links #17 |
| 21 | 3.4.5 #2 | 5 composition | source code | module-federation | architectural | strong | links #16; links #18 |
| 22 | 3.4.5 #3 | 5 composition | source code | module-federation | architectural | strong | links #17; links #19 |
| 23 | 3.4.6 #1 | 6 build-deploy | configuration | — | architectural | moderate | publishes #16 |
| 24 | 3.4.6 #2 | 6 build-deploy | configuration | — | architectural | moderate | publishes #17 |
| 25 | 3.4.6 #3 | 6 build-deploy | configuration | — | architectural | moderate | publishes #18 |
| 26 | 3.4.6 #4 | 6 build-deploy | configuration | — | architectural | moderate | publishes #19 |
| 27 | 3.4.7 #1 | 7 documentation | documentation | module-federation | architectural | weak | corroborates #1; corroborates #2; corroborates #3; corroborates #4; corroborates #5; corroborates evidence/RESULT.json:5-15; corroborates evidence/eager-static-import-proof.txt:10-13 |
| 28 | 3.4.7 #2 | 7 documentation | documentation | — | architectural | weak | contradicts host/package.json:11-12; contradicts remote_a/package.json:11-12; contradicts remote_b/package.json:11-12; contradicts remote_c/package.json:11-12; contradicts pnpm-lock.yaml:780-788 |
| 29 | 3.4.7 #3 | 7 documentation | documentation | module-federation | architectural | weak | corroborates #20; corroborates #21; corroborates #5; corroborates host/package.json:11-12 |
| 30 | 3.4.7 #4 | 7 documentation | documentation | module-federation | architectural | weak | corroborates #20; corroborates #22; corroborates #6; corroborates remote_a/package.json:11-12 |
| 31 | 3.4.7 #5 | 7 documentation | documentation | module-federation | architectural | weak | corroborates #21; corroborates #7; corroborates remote_b/package.json:11-12 |
| 32 | 3.4.7 #6 | 7 documentation | documentation | module-federation | architectural | weak | corroborates #22; corroborates #8; corroborates remote_c/package.json:11-12 |
| 33 | 3.4.7 #7 | 7 documentation | documentation | module-federation | technological | weak | partially corroborates #5; partially corroborates #6; partially corroborates #7; partially corroborates #8; partially corroborates host/src/main.jsx:1-2; partially corroborates remote_a/src/main.jsx:1-2; partially corroborates evidence/eager-static-import-proof.txt:3-5; partially corroborates evidence/eager-static-import-proof.txt:20-22 |
| 34 | 3.4.7 #8 | 7 documentation | documentation | module-federation | technological | weak | corroborates #5; corroborates #6; corroborates #7; corroborates #8 |
| 35 | 3.4.7 #9 | 7 documentation | documentation | module-federation | technological | weak | corroborates #1; corroborates #2; corroborates #3; corroborates #4; corroborates host/package.json:15-17; corroborates pnpm-lock.yaml:1129-1134 |
| 36 | 3.4.8 #1 | 8 history | history | — | context | weak | explains #28 |
| 37 | 3.4.8 #2 | 8 history | history | module-federation | technological | weak | explains #5; explains #6; explains #7; explains #8; explains #33 |

## Summary

Observations: 37. Dimensions (technology: 4, configuration: 4, code: 6, structure: 5, composition: 3, build-deploy: 4, documentation: 9, history: 2). Strength (strong: 8, moderate: 13, weak: 16, ambiguous: 0). Evidence (technological: 10, architectural: 25, context: 2).

