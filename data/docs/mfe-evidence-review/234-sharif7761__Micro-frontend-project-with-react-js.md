---
schema: 1
id: 1158060733
full_name: sharif7761/Micro-frontend-project-with-react-js
commit: cb2083fd77ddcb4d6493af653e0ce523ba0be010
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

# 234 — sharif7761/Micro-frontend-project-with-react-js

## Repository overview

Three React applications with own Rsbuild builds form shell, functional user unit and component library with demo App (#16–#18). Plugin declarations (#1–#3) lead to Module Federation configurations: common_simple exposes Button/Card (#4), core_simple resolves both providers (#5), users_simple exposes UserList and also resolves common_simple (#6). Shell loads/mounts UserList at `/users` (#7, #12), uses Card in Home (#10, #11), and users_simple renders Button/Card (#13, #14). Constructs implement three active relationships between snapshot units (#19–#21).

Local asynchronous bootstraps (#8, #9) compose no other units. Root only coordinates scripts (#15). Three builds separate, but deployment not observed and no independent versioning demonstrated (#22–#24); localhost ports/URLs do not prove publication. Documentation corroborates roles and composition chain but generalizes lazy loading (#35), attributes singleton to components (#42), announces multiple routed MFE targets (#54) and direct shell Button usage (#55), contrary to snapshot. Shell Button import exists (#30), without direct rendering; component also reaches shell through user App (#48).

Deployment, parallelism, distinct versions and hot reload promises uncorroborated (#39, #44, #46, #53); performance/output tree partially supported (#50, #52). Single commit added documentation/implementation together. Six historical points inconclusive about discrepancy origins without leaving snapshot architectural alternatives open (#56–#61). Extraction preserves final 3.4 judgments, adding no mining.

## Observations

### 1. common_simple/package.json:16

**Observation:** `@module-federation/rsbuild-plugin` in `devDependencies`, version `^0.8.12`.

**Interpretation:** Declaration signals federation technology in common_simple build; alone shows no inter-unit link.

### 2. core_simple/package.json:17

**Observation:** `@module-federation/rsbuild-plugin` in `devDependencies`, version `^0.8.12`.

**Interpretation:** Declaration signals federation technology in core_simple build; alone shows no inter-unit link.

### 3. users_simple/package.json:17

**Observation:** `@module-federation/rsbuild-plugin` in `devDependencies`, version `^0.8.12`.

**Interpretation:** Declaration signals federation technology in users_simple build; alone shows no inter-unit link.

### 4. common_simple/rsbuild.config.ts:8-26

**Observation:** `pluginModuleFederation` declares `name: common_simple`, `filename: remoteEntry.js`, exposes `./Button` and `./Card` from local components, sharing React/ReactDOM as singleton and eager.

**Interpretation:** Configures federated component provider; block names no consumers.

### 5. core_simple/rsbuild.config.ts:8-29

**Observation:** Plugin declares `core_simple`, `remoteEntry.js`, remotes `common_simple@http://localhost:3001/remoteEntry.js` and `users_simple@http://localhost:3002/remoteEntry.js`, React/ReactDOM singleton and eager, react-router-dom singleton.

**Interpretation:** Shell names/resolves two distinct units through Module Federation.

### 6. users_simple/rsbuild.config.ts:8-31

**Observation:** Plugin declares `users_simple`, `remoteEntry.js`, exposes `./UserList` as `./src/App.tsx`, resolves `common_simple@http://localhost:3001/remoteEntry.js`, sharing React/ReactDOM singleton and eager, react-router-dom singleton.

**Interpretation:** Functional unit provides to shell and consumes federated library; block links users_simple to common_simple.

### 7. core_simple/src/App.tsx:9; core_simple/src/App.tsx:56-61; core_simple/rsbuild.config.ts:13; users_simple/rsbuild.config.ts:11-13

**Observation:** `lazy(() => import('users_simple/UserList'))` loads UserList, mounted at route `/users` under Suspense.

**Interpretation:** Import names target remote unit, participating in shell functional composition.

### 8. core_simple/src/index.tsx:1; core_simple/src/bootstrap.tsx:1-10

**Observation:** `import('./bootstrap')` loads local bootstrap mounting React App.

**Interpretation:** Asynchronous loading internal to application, composing no other unit.

### 9. users_simple/src/index.tsx:1; users_simple/src/bootstrap.tsx:1-10

**Observation:** `import('./bootstrap')` loads local bootstrap mounting React App.

**Interpretation:** Asynchronous loading internal to application, composing no other unit.

### 10. core_simple/src/App.tsx:15-23; core_simple/src/App.tsx:6; core_simple/rsbuild.config.ts:12; common_simple/rsbuild.config.ts:13

**Observation:** Home renders Card at :15-23, statically imported from `common_simple/Card`.

**Interpretation:** Mounting uses federated component; rendering point alone names no originating unit.

### 11. core_simple/src/App.tsx:24-26; core_simple/src/App.tsx:6; core_simple/rsbuild.config.ts:12; common_simple/rsbuild.config.ts:13

**Observation:** Home renders Card at :24-26, statically imported from `common_simple/Card`.

**Interpretation:** Mounting uses federated component; rendering point alone names no originating unit.

### 12. core_simple/src/App.tsx:46-61; core_simple/src/App.tsx:9; core_simple/rsbuild.config.ts:13; users_simple/rsbuild.config.ts:11-13

**Observation:** Routes associates `/` with local Home and `/users` with remote UserList, inside BrowserRouter and Suspense.

**Interpretation:** Routing defines where shell composes remote functional unit.

### 13. users_simple/src/App.tsx:40-42; users_simple/src/App.tsx:3; users_simple/rsbuild.config.ts:15; common_simple/rsbuild.config.ts:12

**Observation:** users_simple renders Button, statically imported from `common_simple/Button` to update list.

**Interpretation:** Rendering consumes federated component; JSX call alone names no provider unit.

### 14. users_simple/src/App.tsx:49-53; users_simple/src/App.tsx:5; users_simple/rsbuild.config.ts:15; common_simple/rsbuild.config.ts:13

**Observation:** users_simple renders Card, statically imported from `common_simple/Card` for each user.

**Interpretation:** Rendering consumes federated component; JSX call alone names no provider unit.

### 15. .; package.json:1-22

**Observation:** Root manifest contains scripts entering three subdirectories; no own entry/build.

**Interpretation:** Root coordinates commands without constituting fourth frontend unit.

### 16. common_simple/; common_simple/package.json:1-23; common_simple/src/index.tsx:1-10; common_simple/rsbuild.config.ts:5-31

**Observation:** common_simple has own manifest, React-mounting entry, Rsbuild configuration and `rsbuild build` script.

**Interpretation:** Confirms frontend application boundary. Own App demonstrates components unit also exposes through federation.

### 17. core_simple/; core_simple/package.json:1-24; core_simple/src/index.tsx:1; core_simple/src/bootstrap.tsx:5-10; core_simple/rsbuild.config.ts:5-34

**Observation:** core_simple has own manifest, React-mounting entry, Rsbuild configuration and `rsbuild build` script.

**Interpretation:** Confirms frontend application boundary.

### 18. users_simple/; users_simple/package.json:1-24; users_simple/src/index.tsx:1; users_simple/src/bootstrap.tsx:5-10; users_simple/rsbuild.config.ts:5-36

**Observation:** users_simple has own manifest, React-mounting entry, Rsbuild configuration and `rsbuild build` script.

**Interpretation:** Confirms frontend application boundary.

### 19. core_simple/src/App.tsx:9; core_simple/src/App.tsx:57-60; core_simple/rsbuild.config.ts:13; users_simple/rsbuild.config.ts:9-13

**Observation:** core_simple resolves users_simple through remoteEntry.js, mounting App exposed as UserList at route `/users`.

**Interpretation:** Host → remote relationship active in snapshot, integrating functional unit into shell.

### 20. core_simple/src/App.tsx:6; core_simple/src/App.tsx:15-26; core_simple/rsbuild.config.ts:12; common_simple/rsbuild.config.ts:9-14

**Observation:** core_simple resolves common_simple through remoteEntry.js, rendering two Card instances in Home.

**Interpretation:** Host → remote relationship active through component sharing; unused Button import adds no relationship.

### 21. users_simple/src/App.tsx:3-5; users_simple/src/App.tsx:40-53; users_simple/rsbuild.config.ts:14-16; common_simple/rsbuild.config.ts:9-14

**Observation:** users_simple resolves common_simple through remoteEntry.js, rendering Button and Card.

**Interpretation:** Host → remote relationship active both in standalone user application and when App composed in shell.

### 22. common_simple/package.json:2-10; common_simple/rsbuild.config.ts:5-26; package.json:11; package.json:12

**Observation:** common_simple executes `rsbuild build` with local configuration; aggregate build delegates to project. Manifest declares version 1.0.0 and private. Section 3.4.6 records separate build, deployment not observed and independent versioning No.

**Interpretation:** Build target per application without evidence of publication/independent deployment; localhost addresses for local execution.

### 23. core_simple/package.json:2-10; core_simple/rsbuild.config.ts:5-29; package.json:11; package.json:14

**Observation:** core_simple executes `rsbuild build` with local configuration; aggregate build delegates to project. Manifest declares version 1.0.0 and private. Section 3.4.6 records separate build, deployment not observed and independent versioning No.

**Interpretation:** Build target per application without evidence of publication/independent deployment; localhost addresses for local execution.

### 24. users_simple/package.json:2-10; users_simple/rsbuild.config.ts:5-31; package.json:11; package.json:13

**Observation:** users_simple executes `rsbuild build` with local configuration; aggregate build delegates to project. Manifest declares version 1.0.0 and private. Section 3.4.6 records separate build, deployment not observed and independent versioning No.

**Interpretation:** Build target per application without evidence of publication/independent deployment; localhost addresses for local execution.

### 25. ARCHITECTURE.md:13-19

**Observation:** Diagram presents core_simple as shell with React Router, navigation and Module Federation Host.

**Interpretation:** Describes shell composition role, corroborated by configuration and relationships.

### 26. ARCHITECTURE.md:18

**Observation:** Diagram attributes lazy microfrontend loading to shell.

**Interpretation:** Claim specifically corroborated by UserList loading at /users.

### 27. ARCHITECTURE.md:27-35

**Observation:** Diagram attributes Button/Card exposures to common_simple.

**Interpretation:** Describes federated library role, corroborated by exposures/consumers.

### 28. ARCHITECTURE.md:27-34

**Observation:** Diagram presents users_simple with user list, API integration and UserList exposure.

**Interpretation:** Describes remote functional unit, corroborated by exposed App and shell relationship.

### 29. ARCHITECTURE.md:36-38

**Observation:** Diagram attributes common/Button and common/Card consumption to users_simple.

**Interpretation:** Library component consumption corroborated by actual imports/rendering.

### 30. ARCHITECTURE.md:141

**Observation:** Graph associates core_simple with common_simple/Button.

**Interpretation:** Corroborates imported dependency without claiming direct rendering; import present but unused in JSX.

### 31. ARCHITECTURE.md:142

**Observation:** Graph associates core_simple with common_simple/Card.

**Interpretation:** Actual shell Card usage corroborates link.

### 32. ARCHITECTURE.md:151-153

**Observation:** Text lists Rsbuild, @module-federation/rsbuild-plugin with Module Federation v2 support and @rsbuild/plugin-react.

**Interpretation:** Names chosen technology, corroborated by manifests/configuration; does not demonstrate all plugin capabilities.

### 33. ARCHITECTURE.md:166

**Observation:** Text says each microfrontend exposes modules through Module Federation.

**Interpretation:** In remotes section describes common_simple/users_simple providers; host has no exposes.

### 34. ARCHITECTURE.md:167-168

**Observation:** Text says modules exposed at runtime through remoteEntry.js can be consumed by other apps.

**Interpretation:** Description matches providers and three configured relationships.

### 35. ARCHITECTURE.md:169

**Observation:** Text generalizes modules loaded on demand.

**Interpretation:** Section 3.4.7 records claim contradicted: UserList lazy, common components statically imported.

### 36. ARCHITECTURE.md:172-175

**Observation:** Text presents React/ReactDOM as shared singletons loaded once across microfrontends.

**Interpretation:** Sharing policy corroborated by configuration; no download measurement or universal conflict prevention.

### 37. ARCHITECTURE.md:184-185

**Observation:** Text says each microfrontend can run independently.

**Interpretation:** Own entries corroborate per-unit execution, preserving remote dependencies needed for full composition.

### 38. ARCHITECTURE.md:186

**Observation:** Text says each microfrontend has own development server.

**Interpretation:** Separate scripts/servers corroborate claim without demonstrating deployment.

### 39. ARCHITECTURE.md:187

**Observation:** Text claims microfrontends can be deployed separately.

**Interpretation:** Separate deployment promise uncorroborated in 3.4.7; own builds do not establish it.

### 40. ARCHITECTURE.md:194

**Observation:** Documentary tree describes root package.json as convenience scripts.

**Interpretation:** Root delegates commands without adding application or unified frontend build.

### 41. ARCHITECTURE.md:201

**Observation:** Documentary tree identifies common_simple App.tsx as demo application.

**Interpretation:** Own App corroborates federated library application boundary.

### 42. ARCHITECTURE.md:250

**Observation:** Text says Rsbuild checks whether common components already loaded, attributing singleton to them.

**Interpretation:** Section 3.4.7 records contradiction: Button/Card are exposes; singleton belongs to shared dependencies without equivalent component declaration.

### 43. ARCHITECTURE.md:255

**Observation:** Text describes each microfrontend as separate bundle.

**Interpretation:** Corroborates build target separation without meaning exactly one JavaScript file per application.

### 44. ARCHITECTURE.md:258

**Observation:** Text announces multiple remotes loaded in parallel.

**Interpretation:** Section 3.4.7 retains capability as uncorroborated: remote references demonstrate neither coordination nor parallel execution.

### 45. ARCHITECTURE.md:262

**Observation:** Text claims teams can work on separate microfrontends.

**Interpretation:** Boundaries/local tools corroborate structural possibility without demonstrating distinct teams.

### 46. ARCHITECTURE.md:264

**Observation:** Text claims each app can use different versions with care.

**Interpretation:** Capability uncorroborated: projects use same declared React/ReactDOM version and singletons; no example of differing versions coexisting.

### 47. ARCHITECTURE.md:274

**Observation:** Text warns MFE failures can affect others.

**Interpretation:** Federated dependencies and absence of loading error boundary corroborate consumer/provider coupling.

### 48. QUICK_START.md:109

**Observation:** Button change experiment predicts visible changes in users_simple and core_simple.

**Interpretation:** Button usage by users_simple and shell UserList composition corroborate chained visibility; do not establish hot reload across servers.

### 49. README.md:3

**Observation:** README presents project as minimal microfrontend architecture for understanding Module Federation.

**Interpretation:** Characterization corroborated by three application boundaries and composition relationships.

### 50. README.md:153

**Observation:** README claims common_simple components loaded eagerly to improve performance.

**Interpretation:** Partial corroboration: static imports support eager loading after asynchronous bootstrap without performance measurement.

### 51. README.md:161

**Observation:** README requires other apps running before shell.

**Interpretation:** Local references/imports corroborate operational provider dependency without demonstrating automatic startup orchestration.

### 52. STRUCTURE.md:142-154

**Observation:** Expected tree after build:all includes dist, index.html, remoteEntry.js, asynchronous JavaScript and conditional CSS per app.

**Interpretation:** Partial corroboration: three builds and configured remoteEntry names without versioned outputs confirming exact tree, particularly shell without exposes.

### 53. common_simple/README.md:55

**Observation:** Common_simple README promises hot reload in all consuming apps.

**Interpretation:** Section 3.4.7 retains promise as uncorroborated; dev scripts do not demonstrate propagated updates across servers.

### 54. core_simple/README.md:9

**Observation:** Shell README announces routing between different microfrontends.

**Interpretation:** Section 3.4.7 records contradiction: only users_simple functional remote route target; Home local and common_simple provides components.

### 55. core_simple/README.md:17

**Observation:** Shell README claims usage of common_simple Button/Card components.

**Interpretation:** Section 3.4.7 records contradiction regarding direct visual Button usage: shell renders only Card; route Button belongs to users_simple.

### 56. cb2083fd77ddcb4d6493af653e0ce523ba0be010 2026-02-15 (core_simple/src/App.tsx); cb2083fd77ddcb4d6493af653e0ce523ba0be010 2026-02-15 (core_simple/README.md)

**Observation:** Single commit adds shell Button import and document announcing usage, without direct App rendering. Section 3.4.8 records inconclusive result.

**Interpretation:** No earlier version distinguishing removal, future intent or always-unused import. Uncertainty concerns discrepancy origin; snapshot usage delimited.

### 57. cb2083fd77ddcb4d6493af653e0ce523ba0be010 2026-02-15 (ARCHITECTURE.md); cb2083fd77ddcb4d6493af653e0ce523ba0be010 2026-02-15 (core_simple/src/App.tsx); cb2083fd77ddcb4d6493af653e0ce523ba0be010 2026-02-15 (users_simple/src/App.tsx)

**Observation:** Single commit adds on-demand loading generalization alongside lazy UserList and statically imported common components. Section 3.4.8 records inconclusive result.

**Interpretation:** Generalization origin remains inconclusive; snapshot distinguishes loading strategies without uncertainty about current composition.

### 58. cb2083fd77ddcb4d6493af653e0ce523ba0be010 2026-02-15 (ARCHITECTURE.md); cb2083fd77ddcb4d6493af653e0ce523ba0be010 2026-02-15 (common_simple/rsbuild.config.ts); cb2083fd77ddcb4d6493af653e0ce523ba0be010 2026-02-15 (core_simple/rsbuild.config.ts); cb2083fd77ddcb4d6493af653e0ce523ba0be010 2026-02-15 (users_simple/rsbuild.config.ts)

**Observation:** Single commit adds component singleton claim and exposing configurations, reserving singleton for shared dependencies. Section 3.4.8 records inconclusive result.

**Interpretation:** History explains no discrepancy origin or earlier configuration; snapshot component role clear.

### 59. cb2083fd77ddcb4d6493af653e0ce523ba0be010 2026-02-15 (README.md); cb2083fd77ddcb4d6493af653e0ce523ba0be010 2026-02-15 (core_simple/src/index.tsx); cb2083fd77ddcb4d6493af653e0ce523ba0be010 2026-02-15 (users_simple/src/index.tsx); cb2083fd77ddcb4d6493af653e0ce523ba0be010 2026-02-15 (core_simple/src/App.tsx); cb2083fd77ddcb4d6493af653e0ce523ba0be010 2026-02-15 (users_simple/src/App.tsx)

**Observation:** Single commit contains eager-loading performance promise and static imports after asynchronous bootstrap without comparison/measurement. Section 3.4.8 records inconclusive result.

**Interpretation:** No historical basis for explaining uncorroborated portion as earlier result; uncertainty does not change snapshot composition reading.

### 60. cb2083fd77ddcb4d6493af653e0ce523ba0be010 2026-02-15 (STRUCTURE.md); cb2083fd77ddcb4d6493af653e0ce523ba0be010 2026-02-15 (package.json); cb2083fd77ddcb4d6493af653e0ce523ba0be010 2026-02-15 (common_simple/rsbuild.config.ts); cb2083fd77ddcb4d6493af653e0ce523ba0be010 2026-02-15 (core_simple/rsbuild.config.ts); cb2083fd77ddcb4d6493af653e0ce523ba0be010 2026-02-15 (users_simple/rsbuild.config.ts); cb2083fd77ddcb4d6493af653e0ce523ba0be010 2026-02-15 (.gitignore)

**Observation:** Single commit adds announced build tree, configurations and rules ignoring dist/build/.rsbuild, without versioning outputs. Section 3.4.8 records inconclusive result.

**Interpretation:** Version-control exclusion consistent with absent outputs but confirms neither execution nor exact tree; historical uncertainty does not undo configured separate builds.

### 61. cb2083fd77ddcb4d6493af653e0ce523ba0be010 2026-02-15 (core_simple/README.md); cb2083fd77ddcb4d6493af653e0ce523ba0be010 2026-02-15 (core_simple/src/App.tsx); cb2083fd77ddcb4d6493af653e0ce523ba0be010 2026-02-15 (common_simple/rsbuild.config.ts); cb2083fd77ddcb4d6493af653e0ce523ba0be010 2026-02-15 (users_simple/rsbuild.config.ts)

**Observation:** Single commit contains promise of routing between different MFEs and App with local Home and only remote UserList through route. Section 3.4.8 records inconclusive result.

**Interpretation:** History shows no removed route or origin of plural; current composition has one routed functional remote target.

## Classification

| # | Origin | Dimension | Type | Approach | Evidence | Strength | Relationships |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.2 (common_simple/package.json:16) | 1 technology | manifest | module-federation | technological | weak | declares #4 |
| 2 | 3.4.2 (core_simple/package.json:17) | 1 technology | manifest | module-federation | technological | weak | declares #5 |
| 3 | 3.4.2 (users_simple/package.json:17) | 1 technology | manifest | module-federation | technological | weak | declares #6 |
| 4 | 3.4.2 (common_simple/package.json:16, Evidence); 3.4.3 (common_simple, Markers/Build); 3.4.4 (outside mining #1, #4, #5, Observation); 3.4.5 #2, #3 (Configuration); 3.4.6 #1 (Artifacts); 3.4.7 #3, #8, #9, #10, #12, #18, #28, #30 (Evidence) | 2 configuration | configuration | module-federation | technological | moderate | configures #16; configures #20; configures #21 |
| 5 | 3.4.2 (core_simple/package.json:17, Evidence); 3.4.3 (core_simple, Markers/Build); 3.4.4 (mining #1; outside mining #1, Observation); 3.4.5 #1, #2 (Configuration); 3.4.6 #1, #3 (Where served), #2 (Artifacts); 3.4.7 #1, #6, #9, #10, #12, #18, #21, #27, #28 (Evidence) | 2 configuration | configuration | module-federation | architectural | strong | configures #17; configures #19; configures #20 |
| 6 | 3.4.2 (users_simple/package.json:17, Evidence); 3.4.3 (users_simple, Markers/Build); 3.4.4 (mining #1; outside mining #4, #5, Observation); 3.4.5 #1, #3 (Configuration); 3.4.6 #1 (Where served), #3 (Artifacts); 3.4.7 #4, #9, #10, #12, #18, #21, #24, #27, #28, #30 (Evidence) | 2 configuration | configuration | module-federation | architectural | strong | configures #18; configures #19; configures #21 |
| 7 | 3.4.4 (mining #1, core_simple/src/App.tsx:9) | 3 code | source code | module-federation | architectural | strong | implements #19 |
| 8 | 3.4.4 (mining #2, core_simple/src/index.tsx:1) | 3 code | source code | — | technological | weak | — |
| 9 | 3.4.4 (mining #3, users_simple/src/index.tsx:1) | 3 code | source code | — | technological | weak | — |
| 10 | 3.4.4 (outside mining #1, core_simple/src/App.tsx:15) | 3 code | source code | module-federation | architectural | moderate | implements #20 |
| 11 | 3.4.4 (outside mining #2, core_simple/src/App.tsx:24) | 3 code | source code | module-federation | architectural | moderate | implements #20 |
| 12 | 3.4.4 (outside mining #3, core_simple/src/App.tsx:57) | 3 code | source code | module-federation | architectural | strong | implements #19 |
| 13 | 3.4.4 (outside mining #4, users_simple/src/App.tsx:40) | 3 code | source code | module-federation | architectural | moderate | implements #21 |
| 14 | 3.4.4 (outside mining #5, users_simple/src/App.tsx:49) | 3 code | source code | module-federation | architectural | moderate | implements #21 |
| 15 | 3.4.3 (.) | 4 structure | directory | — | context | weak | — |
| 16 | 3.4.3 (common_simple) | 4 structure | directory | — | architectural | moderate | — |
| 17 | 3.4.3 (core_simple) | 4 structure | directory | — | architectural | moderate | — |
| 18 | 3.4.3 (users_simple) | 4 structure | directory | — | architectural | moderate | — |
| 19 | 3.4.5 #1 | 5 composition | source code | module-federation | architectural | strong | links #17; links #18 |
| 20 | 3.4.5 #2 | 5 composition | source code | module-federation | architectural | strong | links #17; links #16 |
| 21 | 3.4.5 #3 | 5 composition | source code | module-federation | architectural | strong | links #18; links #16 |
| 22 | 3.4.6 #1 | 6 build-deploy | configuration | module-federation | architectural | moderate | publishes #16 |
| 23 | 3.4.6 #2 | 6 build-deploy | configuration | module-federation | architectural | moderate | publishes #17 |
| 24 | 3.4.6 #3 | 6 build-deploy | configuration | module-federation | architectural | moderate | publishes #18 |
| 25 | 3.4.7 #1 | 7 documentation | documentation | module-federation | architectural | weak | corroborates #17; corroborates #19; corroborates #20 |
| 26 | 3.4.7 #2 | 7 documentation | documentation | — | architectural | weak | corroborates #7; corroborates #12; corroborates #19 |
| 27 | 3.4.7 #3 | 7 documentation | documentation | — | architectural | weak | corroborates #4; corroborates #20; corroborates #21 |
| 28 | 3.4.7 #4 | 7 documentation | documentation | — | architectural | weak | corroborates #6; corroborates #18; corroborates #19 |
| 29 | 3.4.7 #5 | 7 documentation | documentation | — | architectural | weak | corroborates #13; corroborates #14; corroborates #21 |
| 30 | 3.4.7 #6 | 7 documentation | documentation | — | architectural | weak | corroborates core_simple/src/App.tsx:3-4; corroborates #5 |
| 31 | 3.4.7 #7 | 7 documentation | documentation | — | architectural | weak | corroborates #10; corroborates #11; corroborates #20 |
| 32 | 3.4.7 #8 | 7 documentation | documentation | module-federation | technological | weak | corroborates #1; corroborates #2; corroborates #3; corroborates #4 |
| 33 | 3.4.7 #9 | 7 documentation | documentation | module-federation | architectural | weak | corroborates #4; corroborates #6 |
| 34 | 3.4.7 #10 | 7 documentation | documentation | — | architectural | weak | corroborates #19; corroborates #20; corroborates #21 |
| 35 | 3.4.7 #11 | 7 documentation | documentation | — | architectural | weak | contradicts #10; contradicts #11; contradicts #13; contradicts #14 |
| 36 | 3.4.7 #12 | 7 documentation | documentation | — | architectural | weak | corroborates #4; corroborates #5; corroborates #6 |
| 37 | 3.4.7 #13 | 7 documentation | documentation | — | architectural | weak | corroborates #16; corroborates #17; corroborates #18 |
| 38 | 3.4.7 #14 | 7 documentation | documentation | — | architectural | weak | corroborates #22; corroborates #23; corroborates #24 |
| 39 | 3.4.7 #15 | 7 documentation | documentation | — | architectural | weak | — |
| 40 | 3.4.7 #16 | 7 documentation | documentation | — | context | weak | corroborates #15; corroborates package.json:7-14 |
| 41 | 3.4.7 #17 | 7 documentation | documentation | — | architectural | weak | corroborates #16; corroborates common_simple/src/App.tsx:5-23 |
| 42 | 3.4.7 #18 | 7 documentation | documentation | — | architectural | weak | contradicts #4; contradicts #5; contradicts #6 |
| 43 | 3.4.7 #19 | 7 documentation | documentation | — | architectural | weak | corroborates #22; corroborates #23; corroborates #24 |
| 44 | 3.4.7 #20 | 7 documentation | documentation | — | architectural | weak | — |
| 45 | 3.4.7 #21 | 7 documentation | documentation | — | architectural | weak | corroborates #16; corroborates #17; corroborates #18 |
| 46 | 3.4.7 #22 | 7 documentation | documentation | — | architectural | weak | — |
| 47 | 3.4.7 #23 | 7 documentation | documentation | — | architectural | weak | corroborates #19; corroborates #20; corroborates #21; corroborates core_simple/src/App.tsx:46-64; corroborates users_simple/src/App.tsx:35-56 |
| 48 | 3.4.7 #24 | 7 documentation | documentation | — | architectural | weak | corroborates #13; corroborates #6; corroborates #19 |
| 49 | 3.4.7 #25 | 7 documentation | documentation | module-federation | architectural | weak | corroborates #16; corroborates #17; corroborates #18; corroborates #19; corroborates #20; corroborates #21 |
| 50 | 3.4.7 #26 | 7 documentation | documentation | — | architectural | weak | partially corroborates #10; partially corroborates #13; partially corroborates #14; partially corroborates #8; partially corroborates #9 |
| 51 | 3.4.7 #27 | 7 documentation | documentation | — | architectural | weak | corroborates #5; corroborates #6; corroborates #19; corroborates #20; corroborates #21 |
| 52 | 3.4.7 #28 | 7 documentation | documentation | module-federation | architectural | weak | partially corroborates #22; partially corroborates #23; partially corroborates #24; partially corroborates #4; partially corroborates #5; partially corroborates #6 |
| 53 | 3.4.7 #29 | 7 documentation | documentation | — | architectural | weak | — |
| 54 | 3.4.7 #30 | 7 documentation | documentation | — | architectural | weak | contradicts #12; contradicts #4; contradicts #6 |
| 55 | 3.4.7 #31 | 7 documentation | documentation | — | architectural | weak | contradicts core_simple/src/App.tsx:1-68; contradicts #10; contradicts #11 |
| 56 | 3.4.8 #1 | 8 history | history | — | architectural | weak | explains #55 |
| 57 | 3.4.8 #2 | 8 history | history | — | architectural | weak | explains #35 |
| 58 | 3.4.8 #3 | 8 history | history | — | architectural | weak | explains #42; explains #4; explains #5; explains #6 |
| 59 | 3.4.8 #4 | 8 history | history | — | architectural | weak | explains #50 |
| 60 | 3.4.8 #5 | 8 history | history | — | architectural | weak | explains #52; explains #22; explains #23; explains #24 |
| 61 | 3.4.8 #6 | 8 history | history | — | architectural | weak | explains #54; explains #12 |

## Summary

Observations: 61. Dimensions (technology: 3, configuration: 3, code: 8, structure: 4, composition: 3, build-deploy: 3, documentation: 31, history: 6). Strength (strong: 7, moderate: 11, weak: 43, ambiguous: 0). Evidence (technological: 7, architectural: 52, context: 2).

