---
schema: 1
id: 1297539319
full_name: Efraim0601/union-portal
commit: b11a3e3aa55aff8195e0cde0026ccbd45245266d
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

# 059 — Efraim0601/union-portal

## Repository overview

Architecture supported by complete Native Federation chain:
- **Dependency:** `@angular-architects/native-federation` (#2).
- **Configuration:**
  - three applications’ `build` and `serve` targets use federation builder (#3 through #8);
  - `federation.config.js` remotes expose `./Routes`, all three applications configuring shared dependencies (#9 through #11);
  - development/production manifests give shell two remote addresses (#12, #13).
- **Code:** shell initializes federation with manifest (#24, #25), loading each remote’s routes by name (#22, #23, #27).
- **Relationships:** two active relationships, shell → diaspora/shell → promote (#34, #35), linking three confirmed units (#30 through #32).

Build/deployment show separate build/joint deployment units (#37 through #39). Publication separation absent from repository.

Three signals misleading in isolation:
- **Unused dependency:** `@softarc/native-federation-node` declared/unused (#1). History does not establish introduction (#66), without changing snapshot reading.
- **Noncomposing initialization:** remotes also call `initFederation`/asynchronous bootstrap (#14 through #20 except #16). Federation constructs serving own unit’s standalone mode only.
- **Shared session on paper only:** shared session library exists (#28), repeatedly announced by documentation (#42, #50, #51, #65). No application uses it.

Sole architectural ambiguity is legacy-flow iframe (#26, #36). Accompanying comments contradicted by snapshot nginx (#61, #63), history not resolving question (#67).

Documentation has 26 claims, all weak under protocol: 16 corroborated, 1 partial, 7 contradicted, 2 uncorroborated. Context rather than MFE evidence:
- coordination root (#29)/OTP backend (#33);
- external-system/backend claims (#46, #52, #53, #56).

## Observations

### 1. package.json:28

**Observation:** `@softarc/native-federation-node` (`^3.3.4`) declared in `dependencies`. No import/invocation in snapshot code/build files.

**Interpretation:** Declared unused federation technology. Misleading signal.

### 2. package.json:39

**Observation:** `@angular-architects/native-federation` (`21.2.5`) declared in `devDependencies`.

**Interpretation:** Federation technology present, used by configuration/code.

### 3. angular.json:52-64

**Observation:** Target `build` of project `shell` uses builder `@angular-architects/native-federation:build` over target `esbuild`.

**Interpretation:** Native Federation configured in shell build.

### 4. angular.json:66-75

**Observation:** Target `serve` of project `shell` uses builder `@angular-architects/native-federation:build` in `dev` mode.

**Interpretation:** Shell development server passes through federation.

### 5. angular.json:178-190

**Observation:** Target `build` of project `promote` uses builder `@angular-architects/native-federation:build` over target `esbuild`.

**Interpretation:** Native Federation configured in promote build.

### 6. angular.json:192-201

**Observation:** Target `serve` of project `promote` uses builder `@angular-architects/native-federation:build` in `dev` mode.

**Interpretation:** Promote development server passes through federation, allowing standalone execution.

### 7. angular.json:305-317

**Observation:** Target `build` of project `diaspora` uses builder `@angular-architects/native-federation:build` over target `esbuild`.

**Interpretation:** Native Federation configured in diaspora build.

### 8. angular.json:319-328

**Observation:** Target `serve` of project `diaspora` uses builder `@angular-architects/native-federation:build` in `dev` mode.

**Interpretation:** Diaspora development server passes through federation, allowing standalone execution.

### 9. projects/diaspora/federation.config.js:1-33

**Observation:** `withNativeFederation` declares `name: 'diaspora'`, exposing `./Routes` (`./projects/diaspora/src/app/remote.routes.ts`), configuring `shared` through `shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' })`. Also declares `skip` exclusions and `ignoreUnusedDeps: true`.

**Interpretation:** Diaspora configured as remote offering routes to host/configuring dependency sharing with stated exclusions.

### 10. projects/promote/federation.config.js:1-33

**Observation:** `withNativeFederation` declares `name: 'promote'`, exposing `./Routes` (`./projects/promote/src/app/remote.routes.ts`), configuring `shared` through `shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' })`. Also declares `skip` exclusions and `ignoreUnusedDeps: true`.

**Interpretation:** Promote configured as remote offering routes to host/configuring dependency sharing with stated exclusions.

### 11. projects/shell/federation.config.js:1-28

**Observation:** `withNativeFederation` declares `name: 'shell'` without exposing modules, configuring `shared` through `shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' })`. Also declares `skip` exclusions and `ignoreUnusedDeps: true`.

**Interpretation:** Shell configured as federation participant/dependency sharing with stated exclusions.

### 12. projects/shell/public/federation.manifest.json:2-3

**Observation:** Shell manifest maps `promote` to `http://localhost:4201/remoteEntry.json` and `diaspora` to `http://localhost:4202/remoteEntry.json`.

**Interpretation:** Host configuration declares two remotes/development locations.

### 13. deploy/federation.manifest.prod.json:2-3; Dockerfile:42-43

**Observation:** Production manifest maps `promote` to `/remotes/promote/remoteEntry.json`, `diaspora` to `/remotes/diaspora/remoteEntry.json`. Image copies over development manifest.

**Interpretation:** Host configuration declares two remotes/production locations under same origin.

### 14. projects/diaspora/src/main.ts:3-5

**Observation:** `import('./bootstrap')` after `initFederation()`.

**Interpretation:** Asynchronous bootstrap internal to unit without composing another.

### 15. projects/promote/src/main.ts:3-5

**Observation:** `import('./bootstrap')` after `initFederation()`.

**Interpretation:** Asynchronous bootstrap internal to unit without composing another.

### 16. projects/shell/src/main.ts:3-5

**Observation:** `import('./bootstrap')` after `initFederation('federation.manifest.json')`.

**Interpretation:** Asynchronous bootstrap internal to shell. Composition in rows #24 and #25.

### 17. projects/diaspora/src/main.ts:1

**Observation:** Imports `initFederation` from `@angular-architects/native-federation`.

**Interpretation:** Prepares own-unit standalone federation runtime.

### 18. projects/diaspora/src/main.ts:3

**Observation:** `initFederation()` without manifest.

**Interpretation:** Standalone runtime resolves no other unit. Shell directly consumes `./Routes`, bypassing this `main`.

### 19. projects/promote/src/main.ts:1

**Observation:** Imports `initFederation` from `@angular-architects/native-federation`.

**Interpretation:** Prepares own-unit standalone federation runtime.

### 20. projects/promote/src/main.ts:3

**Observation:** `initFederation()` without manifest.

**Interpretation:** Standalone runtime resolves no other unit. Shell directly consumes `./Routes`, bypassing this `main`.

### 21. projects/shell/src/app/app.routes.ts:2

**Observation:** Imports `loadRemoteModule` from `@angular-architects/native-federation`.

**Interpretation:** Remote-loading mechanism available in shell routes.

### 22. projects/shell/src/app/app.routes.ts:11-13

**Observation:** Route `promote` loads children through `loadRemoteModule('promote', './Routes').then((m) => m.routes)`.

**Interpretation:** Shell loads promote routes at runtime.

### 23. projects/shell/src/app/app.routes.ts:16-18

**Observation:** Route `diaspora` loads children through `loadRemoteModule('diaspora', './Routes').then((m) => m.routes)`.

**Interpretation:** Shell loads diaspora routes at runtime.

### 24. projects/shell/src/main.ts:1

**Observation:** Imports `initFederation` from `@angular-architects/native-federation`.

**Interpretation:** Host federation runtime available.

### 25. projects/shell/src/main.ts:3-5

**Observation:** `initFederation('federation.manifest.json')` before bootstrap.

**Interpretation:** Host resolves manifest remote entries before startup.

### 26. projects/diaspora/src/app/pages/legacy-onboarding.ts:31-36; projects/diaspora/src/app/pages/legacy-onboarding.ts:19-24, 53-54; projects/diaspora/src/app/app.routes.ts:11

**Observation:** Active route renders `<iframe>`. `src` from global `__LEGACY_ONBOARDING_URL__` or fallback relative `/open-account-flow-test`. Neither defined/implemented in snapshot.

**Interpretation:** Possible legacy frontend embedding, but target unobservable.

### 27. projects/shell/src/app/app.routes.ts:9-20; projects/shell/src/app/app.config.ts:7-10

**Observation:** Host routes name `promote` and `diaspora`, empty route redirecting to `diaspora/home`. Routes registered in shell configuration.

**Interpretation:** Host routing declares host → remotes relationship.

### 28. projects/auth/src/lib/client-auth-store.ts:71; projects/auth/src/lib/client-auth-store.ts:68-75

**Observation:** Library `projects/auth` registers `storage` event listener synchronizing session. No application imports library.

**Interpretation:** Implemented disconnected inter-application communication mechanism.

### 29. .; package.json:1-17; angular.json:20-21, 146-147, 273-274

**Observation:** Root has workspace `angular.json`/`package.json` without own UI. Targets belong to three applications in `projects/`.

**Interpretation:** Monorepo coordination root rather than unit.

### 30. projects/diaspora; angular.json:332; projects/diaspora/src/main.ts:1-6; projects/diaspora/src/bootstrap.ts:1-5; angular.json:305-317

**Observation:** Project in `angular.json` with own entry (`main.ts` → `bootstrap.ts`)/build target, without local manifest.

**Interpretation:** Frontend unit with own boundary.

### 31. projects/promote; angular.json:205; projects/promote/src/main.ts:1-6; projects/promote/src/bootstrap.ts:1-5; angular.json:178-190

**Observation:** Project in `angular.json` with own entry (`main.ts` → `bootstrap.ts`)/build target, without local manifest.

**Interpretation:** Frontend unit with own boundary.

### 32. projects/shell; angular.json:79; projects/shell/src/main.ts:1-6; projects/shell/src/bootstrap.ts:1-5; angular.json:52-64

**Observation:** Project in `angular.json` with own entry (`main.ts` → `bootstrap.ts`)/build target, without local manifest.

**Interpretation:** Frontend unit with own boundary.

### 33. server/diaspora-otp; server/diaspora-otp/package.json:1-16; server/diaspora-otp/index.js:18; deploy/test/Dockerfile.otp:5-9

**Observation:** Express OTP server package with own image/no UI entry.

**Interpretation:** Backend in same repository rather than frontend unit.

### 34. projects/shell/src/app/app.routes.ts:16-18; projects/shell/public/federation.manifest.json:3; deploy/federation.manifest.prod.json:3; projects/diaspora/federation.config.js:4-9

**Observation:** Shell loads `./Routes` from `diaspora`. Name resolved through manifests, matching name/exposed module in diaspora configuration.

**Interpretation:** Active host → remote relationship.

### 35. projects/shell/src/app/app.routes.ts:11-13; projects/shell/public/federation.manifest.json:2; deploy/federation.manifest.prod.json:2; projects/promote/federation.config.js:4-9

**Observation:** Shell loads `./Routes` from `promote`. Name resolved through manifests, matching name/exposed module in promote configuration.

**Interpretation:** Active host → remote relationship.

### 36. projects/diaspora/src/app/pages/legacy-onboarding.ts:31-36; projects/diaspora/src/app/pages/legacy-onboarding.ts:19-24, 53-54; deploy/nginx.conf:128-130

**Observation:** Diaspora embeds `/open-account-flow-test` through iframe. No snapshot override/path implementation, nginx forwarding unmapped paths to shell.

**Interpretation:** Page → embedded-frontend relationship with undetermined target/activity.

### 37. angular.json:305-317; Dockerfile:22; Dockerfile:41; docker-compose.yml:19-23; deploy/server/components.env:65-70

**Observation:** Diaspora has own target/`ng build`, `base-href` `/remotes/diaspora/`. Artifact copied to portal image, single compose service/single deployment component.

**Interpretation:** Own build boundary without deployment boundary.

**Note:** Diaspora build also carries MediaPipe files nginx serves at root for both applications (deploy/nginx.conf:42-52). Inter-unit deployment coupling (#60).

### 38. angular.json:178-190; Dockerfile:21; Dockerfile:40; docker-compose.yml:19-23; deploy/server/components.env:65-70

**Observation:** Promote has own target/`ng build`, `base-href` `/remotes/promote/`. Artifact copied to same image.

**Interpretation:** Own build boundary without deployment boundary.

### 39. angular.json:52-64; Dockerfile:20; Dockerfile:38; Dockerfile:43; deploy/server/deploy.sh:153

**Observation:** Shell has own target/`ng build` (`--base-href /`). Artifact copied to same image root, also receiving production manifest (Dockerfile:43). Deployment script rebuilds image/recreates service (`--build --force-recreate`).

**Interpretation:** Own build boundary without deployment boundary. Recorded deployment flow requires republishing joint image when remote-linking manifest changes.

### 40. Dockerfile:2-3

**Observation:** "image unique (gateway) servant shell + promote + diaspora […] une seule origine". English translation: "single gateway image serving shell, promote and diaspora under one origin".

**Interpretation:** Describes joint three-application deployment under one origin. Claim corroborated.

### 41. Dockerfile:3

**Observation:** "Architecture host/remotes (Native Federation)".

**Interpretation:** Describes host/remote composition using actual technology. Claim corroborated.

### 42. Dockerfile:3

**Observation:** "(SSO partagé)". English translation: "shared SSO".

**Interpretation:** Announces inter-unit shared session. Claim contradicted.

### 43. Dockerfile:8

**Observation:** "Stage 1 : build des 3 apps". English translation: "Stage one: build all three apps".

**Interpretation:** Describes three builds within image. Claim corroborated.

### 44. Dockerfile:42

**Observation:** "Manifest de PROD (chemins same-origin) écrase celui de dev (localhost:*)". English translation: "Production manifest with same-origin paths overwrites development localhost manifest".

**Interpretation:** Describes manifest replacement linking deployment/remote loading. Claim corroborated.

### 45. README.md:1

**Observation:** "Monorepo frontend". English translation: "Frontend monorepo".

**Interpretation:** Describes applications together in monorepo. Claim corroborated.

### 46. README.md:3

**Observation:** "reproduisant l'architecture de `portal-client-firstpay`". English translation: "reproducing architecture of named external project".

**Interpretation:** References unverifiable external system. Claim uncorroborated.

### 47. README.md:4

**Observation:** "(host + remotes via **module federation**)".

**Interpretation:** Names technology different from actual. Claim contradicted.

### 48. README.md:10-11

**Observation:** Diagram: shell (`:4200`) calls `loadRemoteModule` for promote (`:4201`) and diaspora (`:4202`), each "expose ./Routes".

**Interpretation:** Describes relationships/exposed modules. Claim corroborated.

### 49. README.md:13

**Observation:** "libs partagées : @union/design-system". English translation: "shared libraries: named design system".

**Interpretation:** Presents design library used by all three applications. Claim corroborated.

### 50. README.md:13-14

**Observation:** "libs partagées : […] @union/auth". English translation: "shared libraries: named authentication package".

**Interpretation:** Presents shared authentication library. Claim contradicted.

### 51. README.md:20

**Observation:** "`@union/auth` partage la clé localStorage `portail_client_auth` (JWT, sync cross-tab)". English translation: "named authentication package shares the stated localStorage key, JWT and cross-tab synchronization".

**Interpretation:** Announces session sharing through common key. Claim contradicted.

### 52. README.md:20-21

**Observation:** "interopérable avec les apps de la banque servies sur la même origine". English translation: "interoperable with bank applications served under same origin".

**Interpretation:** Announces unverifiable external-system interoperability. Claim uncorroborated.

### 53. README.md:42-43

**Observation:** "Le frontend ne fonctionne pas seul : il appelle **deux backends** (dépôts séparés)". English translation: "frontend does not work alone: calls two backends in separate repositories".

**Interpretation:** Describes external backend dependency. Claim corroborated.

### 54. README.md:52

**Observation:** "(app complète, standalone)", about promote. English translation: "complete standalone app".

**Interpretation:** Claims promote runs alone. Claim corroborated.

### 55. README.md:114-116

**Observation:** "**4 composants**, chacun dans son dépôt […] **pilotés depuis union**, qui est le point de centralisation du déploiement". English translation: "four components, each in own repository, controlled from union as central deployment point".

**Interpretation:** Describes whole portal as one deployment component. Claim corroborated.

### 56. README.md:138-143

**Observation:** "Câblage API (proxy `deploy/nginx.conf`, origine unique — pas de CORS)". English translation: "API wiring: named nginx proxy, single origin without CORS".

**Interpretation:** Describes gateway as API proxy. Claim corroborated.

### 57. README.md:279-281

**Observation:** "l'adoption complète des composants `@union/design-system` dans les 17 pages est progressive". English translation: "full adoption of named design-system components across seventeen pages is progressive".

**Interpretation:** Incomplete adoption confirmed, no artifact showing ongoing adoption. Claim partial.

### 58. README.md:282

**Observation:** "les remotes tournent parfaitement en standalone". English translation: "remotes run perfectly standalone".

**Interpretation:** Claims both remotes run alone. Claim corroborated.

### 59. README.md:282-284

**Observation:** "sous le host, les routes s'imbriquent (`/promote/…`, `/diaspora/…`)". English translation: "under host routes nest at stated promote/diaspora paths".

**Interpretation:** Claims remote routes nest in host. Claim corroborated.

### 60. deploy/nginx.conf:43-48

**Observation:** "On sert l'unique copie (identique entre remotes) à la racine, pour les deux apps". English translation: "one copy identical across remotes served at root for both apps".

**Interpretation:** Describes inter-unit deployment coupling. Claim corroborated.

### 61. projects/diaspora/src/app/app.routes.ts:10

**Observation:** "embarque le parcours legacy FastAPI en iframe". English translation: "embeds legacy FastAPI flow in iframe".

**Interpretation:** Announces legacy-flow embedding. Snapshot configuration does not deliver flow to iframe. Claim contradicted.

### 62. projects/diaspora/src/app/core/admin-auth.ts:21-23

**Observation:** "`@union/auth` (ClientAuthStore) existe dans le monorepo mais n'est branché nulle part". English translation: "named authentication library exists in monorepo but connected nowhere".

**Interpretation:** Acknowledges session library disconnected. Claim corroborated.

### 63. projects/diaspora/src/app/pages/legacy-onboarding.ts:16-17

**Observation:** "le reverse proxy sert le flux legacy sur le même domaine". English translation: "reverse proxy serves legacy flow under same domain".

**Interpretation:** Attributes iframe target to proxy. Sole snapshot proxy does not serve path. Claim contradicted.

### 64. projects/shell/src/app/app.ts:5-6

**Observation:** "chaque remote (diaspora hub, promote) fournit son propre layout plein écran + en-tête. Le shell ne fait qu'orchestrer la fédération". English translation: "each remote supplies own full-screen layout and header; shell only orchestrates federation".

**Interpretation:** Describes host/remote role division. Claim corroborated.

### 65. projects/shell/src/app/app.ts:7

**Observation:** "partager la session (SSO via ClientAuthStore, provisionné au bootstrap)". English translation: "share session through SSO and ClientAuthStore provisioned at bootstrap".

**Interpretation:** Announces provisioning bootstrap does not perform. Claim contradicted.

### 66. 012b229 2026-07-11 (package.json, version absent); cd974b8 2026-07-14 (package.json)

**Observation:** `package.json` changed in two commits. `cd974b8` version already declares dependency, initial commit version unavailable.

**Interpretation:** Unknown when/why unused dependency entered. Past-only question: unused in snapshot.

### 67. 1e8d9fb 2026-07-15 (projects/diaspora/src/app/pages/legacy-onboarding.ts, projects/diaspora/src/app/app.routes.ts); 81b1158 2026-07-15 (deploy/nginx.conf, version absent); 092eff1 2026-07-16 (deploy/nginx.conf); bf7d95d 2026-07-16 (deploy/nginx.conf)

**Observation:** Iframe-creating commit does not touch deployment. Later nginx commit messages announce back-office/MediaPipe, earlier nginx version unavailable.

**Interpretation:** History does not establish any version routing legacy flow. Two plausible snapshot readings: iframe embeds legacy frontend through external-repository proxy, or iframe lacks active target.

### 68. 012b229 2026-07-11 (projects/auth/src/lib/client-auth-store.ts); 77c7b4f 2026-07-12 (projects/promote/src/app/core/auth.ts); 1cea70e 2026-07-15 (projects/diaspora/src/app/core/admin-auth.ts)

**Observation:** Library unchanged since first commit. Since `1cea70e`, comment declares disconnected. Initial promote `auth.ts` version unavailable.

**Interpretation:** Prior application library use not excluded. Past-only question: library disconnected in snapshot.

### 69. 012b229 2026-07-11 (projects/design-system)

**Observation:** Design-system folder unchanged since first commit.

**Interpretation:** Unknown whether component adoption advanced/receded. Past-only question: no snapshot application imports components.

### 70. 012b229 2026-07-11 (projects/shell/src/bootstrap.ts, projects/shell/src/main.ts, projects/shell/src/app/app.config.ts, projects/shell/src/app/app.ts)

**Observation:** Four files appear in initial commit with same object identifiers as snapshot, unchanged by all commits.

**Interpretation:** Comment-announced provisioning never existed in these files. Point clarified.

## Classification

| # | Origin | Dimension | Type | Approach | Evidence | Strength | Relationships |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.2 (package.json:28) | 1 technology | manifest | native-federation | technological | weak | — |
| 2 | 3.4.2 (package.json:39) | 1 technology | manifest | native-federation | technological | weak | declares #3; declares #4; declares #5; declares #6; declares #7; declares #8; declares #9; declares #10; declares #11; declares #17; declares #19; declares #21; declares #24 |
| 3 | 3.4.2 (package.json:39, Evidence); 3.4.3 (., Markers); 3.4.3 (projects/shell, Build); 3.4.6 #3 (Artifacts) | 2 configuration | configuration | native-federation | technological | moderate | configures #32 |
| 4 | 3.4.3 (., Markers) | 2 configuration | configuration | native-federation | technological | moderate | configures #32 |
| 5 | 3.4.3 (., Markers); 3.4.3 (projects/promote, Build); 3.4.6 #2 (Artifacts) | 2 configuration | configuration | native-federation | technological | moderate | configures #31 |
| 6 | 3.4.3 (., Markers); 3.4.7 #15, #19 (Evidence) | 2 configuration | configuration | native-federation | technological | moderate | configures #31 |
| 7 | 3.4.3 (., Markers); 3.4.3 (projects/diaspora, Build); 3.4.6 #1 (Artifacts) | 2 configuration | configuration | native-federation | technological | moderate | configures #30 |
| 8 | 3.4.3 (., Markers); 3.4.7 #19 (Evidence) | 2 configuration | configuration | native-federation | technological | moderate | configures #30 |
| 9 | 3.4.3 (projects/diaspora, Markers); 3.4.4 (projects/diaspora/src/main.ts:3, Observation); 3.4.5 #1 (Configuration); 3.4.7 #9 (Evidence) | 2 configuration | configuration | native-federation | technological | moderate | configures #30; configures #34 |
| 10 | 3.4.3 (projects/promote, Markers); 3.4.4 (projects/promote/src/main.ts:3, Observation); 3.4.5 #2 (Configuration); 3.4.7 #9 (Evidence) | 2 configuration | configuration | native-federation | technological | moderate | configures #31; configures #35 |
| 11 | 3.4.3 (projects/shell, Markers) | 2 configuration | configuration | native-federation | technological | moderate | configures #32 |
| 12 | 3.4.4 (projects/shell/src/main.ts:1, Observation); 3.4.4 (projects/shell/src/main.ts:3, Observation); 3.4.5 #1, #2 (Configuration) | 2 configuration | configuration | native-federation | architectural | strong | configures #25; configures #34; configures #35 |
| 13 | 3.4.5 #1, #2 (Configuration); 3.4.6 #1, #2 (Artifacts); 3.4.7 #5 (Evidence) | 2 configuration | configuration | native-federation | architectural | strong | configures #34; configures #35 |
| 14 | 3.4.4 (projects/diaspora/src/main.ts:5) | 3 code | source code | native-federation | technological | weak | — |
| 15 | 3.4.4 (projects/promote/src/main.ts:5) | 3 code | source code | native-federation | technological | weak | — |
| 16 | 3.4.4 (projects/shell/src/main.ts:5) | 3 code | source code | native-federation | technological | weak | — |
| 17 | 3.4.4 (projects/diaspora/src/main.ts:1) | 3 code | source code | native-federation | technological | weak | — |
| 18 | 3.4.4 (projects/diaspora/src/main.ts:3) | 3 code | source code | native-federation | technological | weak | — |
| 19 | 3.4.4 (projects/promote/src/main.ts:1) | 3 code | source code | native-federation | technological | weak | — |
| 20 | 3.4.4 (projects/promote/src/main.ts:3) | 3 code | source code | native-federation | technological | weak | — |
| 21 | 3.4.4 (projects/shell/src/app/app.routes.ts:2) | 3 code | source code | native-federation | technological | moderate | implements #34; implements #35 |
| 22 | 3.4.4 (projects/shell/src/app/app.routes.ts:13) | 3 code | source code | native-federation | architectural | strong | implements #35 |
| 23 | 3.4.4 (projects/shell/src/app/app.routes.ts:18) | 3 code | source code | native-federation | architectural | strong | implements #34 |
| 24 | 3.4.4 (projects/shell/src/main.ts:1) | 3 code | source code | native-federation | technological | moderate | implements #34; implements #35 |
| 25 | 3.4.4 (projects/shell/src/main.ts:3) | 3 code | source code | native-federation | technological | moderate | implements #34; implements #35 |
| 26 | 3.4.4 (projects/diaspora/src/app/pages/legacy-onboarding.ts:31) | 3 code | source code | iframe | architectural | ambiguous | implements #36 |
| 27 | 3.4.4 (projects/shell/src/app/app.routes.ts:9) | 3 code | source code | native-federation | architectural | strong | implements #34; implements #35 |
| 28 | 3.4.4 (projects/auth/src/lib/client-auth-store.ts:71) | 3 code | source code | — | technological | weak | — |
| 29 | 3.4.3 (.) | 4 structure | directory | — | context | weak | — |
| 30 | 3.4.3 (projects/diaspora) | 4 structure | directory | — | architectural | moderate | — |
| 31 | 3.4.3 (projects/promote) | 4 structure | directory | — | architectural | moderate | — |
| 32 | 3.4.3 (projects/shell) | 4 structure | directory | — | architectural | moderate | — |
| 33 | 3.4.3 (server/diaspora-otp) | 4 structure | directory | — | context | weak | — |
| 34 | 3.4.5 #1 | 5 composition | source code | native-federation | architectural | strong | links #32; links #30 |
| 35 | 3.4.5 #2 | 5 composition | source code | native-federation | architectural | strong | links #32; links #31 |
| 36 | 3.4.5 #3 | 5 composition | source code | iframe | architectural | ambiguous | links #30 |
| 37 | 3.4.6 #1 | 6 build-deploy | configuration | — | architectural | moderate | publishes #30 |
| 38 | 3.4.6 #2 | 6 build-deploy | configuration | — | architectural | moderate | publishes #31 |
| 39 | 3.4.6 #3 | 6 build-deploy | configuration | — | architectural | moderate | publishes #32 |
| 40 | 3.4.7 #1 | 7 documentation | comment | — | architectural | weak | corroborates #37; corroborates #38; corroborates #39 |
| 41 | 3.4.7 #2 | 7 documentation | comment | native-federation | architectural | weak | corroborates #2; corroborates #34; corroborates #35 |
| 42 | 3.4.7 #3 | 7 documentation | comment | — | architectural | weak | contradicts #28; contradicts #62 |
| 43 | 3.4.7 #4 | 7 documentation | comment | — | architectural | weak | corroborates #37; corroborates #38; corroborates #39 |
| 44 | 3.4.7 #5 | 7 documentation | comment | native-federation | architectural | weak | corroborates #13 |
| 45 | 3.4.7 #6 | 7 documentation | documentation | — | architectural | weak | corroborates #30; corroborates #31; corroborates #32 |
| 46 | 3.4.7 #7 | 7 documentation | documentation | — | context | weak | — |
| 47 | 3.4.7 #8 | 7 documentation | documentation | module-federation | technological | weak | contradicts #21; contradicts #2 |
| 48 | 3.4.7 #9 | 7 documentation | documentation | native-federation | architectural | weak | corroborates #9; corroborates #10; corroborates #34; corroborates #35 |
| 49 | 3.4.7 #10 | 7 documentation | documentation | — | architectural | weak | corroborates angular.json:88; corroborates angular.json:214; corroborates angular.json:341 |
| 50 | 3.4.7 #11 | 7 documentation | documentation | — | architectural | weak | contradicts #28; contradicts #62 |
| 51 | 3.4.7 #12 | 7 documentation | documentation | — | architectural | weak | contradicts #28; contradicts projects/promote/src/app/core/auth.ts:7; contradicts projects/diaspora/src/app/core/admin-auth.ts:3 |
| 52 | 3.4.7 #13 | 7 documentation | documentation | — | context | weak | — |
| 53 | 3.4.7 #14 | 7 documentation | documentation | — | context | weak | corroborates deploy/nginx.conf:72-87; corroborates deploy/server/components.env:35-39; corroborates deploy/server/components.env:50-54 |
| 54 | 3.4.7 #15 | 7 documentation | documentation | — | architectural | weak | corroborates #31; corroborates #6 |
| 55 | 3.4.7 #16 | 7 documentation | documentation | — | architectural | weak | corroborates #37; corroborates #38; corroborates #39; corroborates deploy/server/components.env:15, 22-73; corroborates deploy/server/deploy.sh:35-40, 130-153 |
| 56 | 3.4.7 #17 | 7 documentation | documentation | — | context | weak | corroborates deploy/nginx.conf:72-87 |
| 57 | 3.4.7 #18 | 7 documentation | documentation | — | architectural | weak | partially corroborates projects/design-system/src/public-api.ts:6-10; partially corroborates projects/promote/src/styles.css:8, 12 |
| 58 | 3.4.7 #19 | 7 documentation | documentation | — | architectural | weak | corroborates #30; corroborates #31; corroborates #6; corroborates #8 |
| 59 | 3.4.7 #20 | 7 documentation | documentation | — | architectural | weak | corroborates #34; corroborates #35 |
| 60 | 3.4.7 #21 | 7 documentation | comment | — | architectural | weak | corroborates deploy/nginx.conf:51-52; corroborates projects/promote/src/app/shared/face-mesh.ts:51, 53; corroborates projects/diaspora/src/app/shared/face-mesh.ts:53, 65-66 |
| 61 | 3.4.7 #22 | 7 documentation | comment | iframe | architectural | weak | contradicts deploy/nginx.conf:128-130 |
| 62 | 3.4.7 #23 | 7 documentation | comment | — | architectural | weak | corroborates #28 |
| 63 | 3.4.7 #24 | 7 documentation | comment | — | architectural | weak | contradicts deploy/nginx.conf:128-130 |
| 64 | 3.4.7 #25 | 7 documentation | comment | — | architectural | weak | corroborates projects/shell/src/app/app.ts:9-14; corroborates projects/promote/src/app/remote.routes.ts:35-36; corroborates projects/diaspora/src/app/pages/home.ts:29-31 |
| 65 | 3.4.7 #26 | 7 documentation | comment | — | architectural | weak | contradicts projects/shell/src/bootstrap.ts:1-5; contradicts projects/shell/src/app/app.config.ts:9-10 |
| 66 | 3.4.8 #1 | 8 history | history | native-federation | technological | weak | explains #1 |
| 67 | 3.4.8 #2 | 8 history | history | iframe | architectural | ambiguous | explains #26; explains #36; explains #61; explains #63 |
| 68 | 3.4.8 #3 | 8 history | history | — | architectural | weak | explains #28; explains #42; explains #50; explains #51 |
| 69 | 3.4.8 #4 | 8 history | history | — | architectural | weak | explains #57 |
| 70 | 3.4.8 #5 | 8 history | history | — | architectural | weak | explains #65 |

## Summary

Observations: 70. Dimensions (technology: 2, configuration: 11, code: 15, structure: 5, composition: 3, build-deploy: 3, documentation: 26, history: 5). Strength (strong: 7, moderate: 18, weak: 42, ambiguous: 3). Evidence (technological: 24, architectural: 40, context: 6).

