---
schema: 1
id: 1106098608
full_name: Stevenjsg/vue-microfrontends-ecosystem
commit: 8501b8bd6e1d2491eb7838ae38b264a826f4c453
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

# 322 — Stevenjsg/vue-microfrontends-ecosystem

## Repository overview

Four Vue applications have own entries/builds (#13–#16, #21–#24). Composition chain starts in plugin declarations (#1–#4), passes through federated configurations (#6–#9), reaches `dashboard/Widget` import and rendering in shell (#10–#11). Supports active shell → Dashboard relationship (#18). Host also configures CMS/Kanban, but no code consumes them: relationships remain declared/inactive (#19–#20). Producer name `dashboard_app` differs from host key `dashboard`; recorded resolution uses URL/exposed module (#7–#8, #18).

Root coordinates workspace and UI Kit is library, neither frontend units (#12, #17). Declared Turbo/coordination scripts do not demonstrate composition; dependency Undetermined remains (#5). Four builds separate, without observed deployment/independent versioning; localhost URLs/preview prove no publication (#21–#24). Documentary independent-deployment promise uncorroborated (#47).

Documentation confirms host/remotes organization, Dashboard loading/configured Vue sharing (#25–#26, #28–#31), but exceeds code by announcing CMS/Kanban loading, complete integration, shared state/authentication/routing (#27, #32–#33, #42, #44–#46). Only shell consumes kit, contradicting remote arrows/HMR promised for four apps (#34–#37, #48). Announced libraries absent and Vite 6 differs from manifests (#40–#41). Claims weak even corroborated: alone neither configure nor implement composition.

History situates promises before code and clarifies CMS/Kanban disconnections, kit/library divergences (#49–#53). Missing old blobs limit reconstruction. Only past Vite version remains inconclusive, without affecting snapshot reading (#54). Recorded Turbo technological ambiguity leaves no uncertainty in effectively implemented federation chain.

## Observations

### 1. apps/cms/package.json:18

**Observation:** Manifest of cms declares `@originjs/vite-plugin-federation: ^1.4.1` in `devDependencies`.

**Interpretation:** Isolated Module Federation technology signal; review’s Configured Yes result has configuration classified separately.

### 2. apps/dashboard/package.json:18

**Observation:** Manifest of dashboard declares `@originjs/vite-plugin-federation: ^1.4.1` in `devDependencies`.

**Interpretation:** Isolated Module Federation technology signal; review’s Configured Yes result has configuration classified separately.

### 3. apps/kanban/package.json:18

**Observation:** Manifest of kanban declares `@originjs/vite-plugin-federation: ^1.4.1` in `devDependencies`.

**Interpretation:** Isolated Module Federation technology signal; review’s Configured Yes result has configuration classified separately.

### 4. apps/shell/package.json:16

**Observation:** Manifest of shell declares `@originjs/vite-plugin-federation: ^1.4.1` in `devDependencies`.

**Interpretation:** Isolated Module Federation technology signal; review’s Configured Yes result has configuration classified separately.

### 5. package.json:18

**Observation:** Root manifest declares `turbo: ^2.6.1` in `devDependencies`.

**Interpretation:** Monorepo coordination signal. Section 3.4.2 records Configured Undetermined because scripts do not count as usage there: declaration may represent tool preparation or use through scripts. Neither reading alone establishes frontend units/composition.

### 6. apps/cms/vite.config.ts:3,16-23

**Observation:** Plugin `federation` declares `cms_app`, `remoteEntry.js`, exposes `./Cms` from `./src/App.vue` and shares `vue`.

**Interpretation:** Configures federation mechanism in producer unit without naming consumer.

### 7. apps/shell/vite.config.ts:4,19-27

**Observation:** Plugin `federation` names host `shell`, resolves `dashboard`, `cms`, `kanban` through `http://localhost:5001/assets/remoteEntry.js`, `http://localhost:5002/assets/remoteEntry.js`, `http://localhost:5003/assets/remoteEntry.js`, and shares `vue`.

**Interpretation:** Configuration explicitly links host to three remotes; alone does not prove code consumes all three.

### 8. apps/dashboard/vite.config.ts:3,18-25

**Observation:** Plugin `federation` declares `dashboard_app`, generates `remoteEntry.js`, exposes `./Widget` from `./src/components/WidgetDinero.vue` and shares `vue`.

**Interpretation:** Parameterizes federation producer/offered module without naming consumer.

### 9. apps/kanban/vite.config.ts:3,16-23

**Observation:** Plugin `federation` declares `kanban_app`, generates `remoteEntry.js`, exposes `./Kanban` from `./src/App.vue` and shares `vue`.

**Interpretation:** Parameterizes federation producer without declaring consumer.

### 10. apps/shell/src/App.vue:2,5-7,21-28; apps/shell/src/main.ts:3-5; apps/shell/index.html:11; apps/shell/vite.config.ts:22; apps/dashboard/vite.config.ts:19-23; apps/shell/src/vite-env.d.ts:3-7

**Observation:** `defineAsyncComponent` imports `dashboard/Widget`; specifier matches host key/Dashboard exposure `./Widget`. Component appears in App mounted by shell entry.

**Interpretation:** Loading directly names another unit and participates in runtime federation composition.

### 11. apps/shell/src/App.vue:21-28; apps/shell/src/App.vue:5-7; apps/shell/src/main.ts:3-5

**Observation:** Template renders `<DashboardWidget />` inside `Suspense` with fallback; variable is asynchronous component imported from `dashboard/Widget`.

**Interpretation:** Rendering materializes import-prepared mechanism. Line renders local variable without directly naming remote target.

### 12. .; package.json:1-20

**Observation:** Root manifest has scripts `turbo dev`, `turbo build`, `turbo lint`, `dev:hybrid`, without UI entry/own build.

**Interpretation:** Workspace coordination, Frontend unit No; not frontend application.

### 13. apps/cms; apps/cms/package.json:1-26; apps/cms/index.html:10-11; apps/cms/src/main.ts:3-5; apps/cms/vite.config.ts:6-32; pnpm-workspace.yaml:2

**Observation:** `apps/cms` has own manifest, HTML loading `src/main.ts`, entry mounting `App` at `#app`, own Vite configuration/script `vue-tsc -b && vite build`. Included through workspace `apps/*`.

**Interpretation:** Confirms own-entry/build frontend unit boundary, marked Yes in structure review. Boundary alone does not demonstrate complete MFE organization.

### 14. apps/dashboard; apps/dashboard/package.json:1-26; apps/dashboard/index.html:10-11; apps/dashboard/src/main.ts:3-5; apps/dashboard/vite.config.ts:6-34; pnpm-workspace.yaml:2

**Observation:** `apps/dashboard` has own manifest, HTML loading `src/main.ts`, entry mounting `App` at `#app`, own Vite configuration/script `vue-tsc -b && vite build`. Included through workspace `apps/*`.

**Interpretation:** Confirms own-entry/build frontend unit boundary, marked Yes in structure review. Boundary alone does not demonstrate complete MFE organization.

### 15. apps/kanban; apps/kanban/package.json:1-26; apps/kanban/index.html:10-11; apps/kanban/src/main.ts:3-5; apps/kanban/vite.config.ts:6-32; pnpm-workspace.yaml:2

**Observation:** `apps/kanban` has own manifest, HTML loading `src/main.ts`, entry mounting `App` at `#app`, own Vite configuration/script `vue-tsc -b && vite build`. Included through workspace `apps/*`.

**Interpretation:** Confirms own-entry/build frontend unit boundary, marked Yes in structure review. Boundary alone does not demonstrate complete MFE organization.

### 16. apps/shell; apps/shell/package.json:1-26; apps/shell/index.html:10-11; apps/shell/src/main.ts:3-5; apps/shell/vite.config.ts:7-35; pnpm-workspace.yaml:2

**Observation:** `apps/shell` has own manifest, HTML loading `src/main.ts`, entry mounting `App` at `#app`, own Vite configuration/script `vue-tsc -b && vite build`. Included through workspace `apps/*`.

**Interpretation:** Confirms own-entry/build frontend unit boundary, marked Yes in structure review. Boundary alone does not demonstrate complete MFE organization.

### 17. packages/ui-kit; packages/ui-kit/package.json:1-21; packages/ui-kit/src/index.ts:1-4; pnpm-workspace.yaml:3

**Observation:** Package `@repo/ui-kit` exports `MyButton` and `setupMsg`; only `lint` script, no application entry/build.

**Interpretation:** Workspace component library, Frontend unit No. Sharing does not equal inter-application composition.

### 18. apps/shell/vite.config.ts:22; apps/dashboard/vite.config.ts:18-25; apps/shell/src/App.vue:5-7,21-28

**Observation:** Shell declares remote `dashboard` through `remoteEntry.js` URL; `apps/dashboard` declares file/exposes `./Widget`. Shell imports/renders `dashboard/Widget`.

**Interpretation:** Active host → remote relationship in snapshot, with explicit link/code consumption.

### 19. apps/shell/vite.config.ts:23; apps/cms/vite.config.ts:16-23

**Observation:** Shell declares remote `cms` through `remoteEntry.js` URL; `apps/cms` declares file/exposes `./Cms`. No shell import/rendering of `cms`, per Active No relationship in 3.4.5.

**Interpretation:** Host → remote relationship configured but does not participate in snapshot code-executed composition.

### 20. apps/shell/vite.config.ts:24; apps/kanban/vite.config.ts:16-23

**Observation:** Shell declares remote `kanban` through `remoteEntry.js` URL; `apps/kanban` declares file/exposes `./Kanban`. No shell import/rendering of `kanban`, per Active No relationship in 3.4.5.

**Interpretation:** Host → remote relationship configured but does not participate in snapshot code-executed composition.

### 21. apps/cms/package.json:3-10; apps/cms/vite.config.ts:16-23; package.json:8; turbo.json:8-11

**Observation:** `apps/cms` defines `vue-tsc -b && vite build`; root delegates through `turbo build`, output `dist/**` per package. Federation configuration generates own `remoteEntry.js`. Review records separate Build, unobserved Deployment and Versioning No; local servers without publication artifact.

**Interpretation:** Build confirms own application boundary. No independent deployment/versioning evidence.

### 22. apps/dashboard/package.json:3-10; apps/dashboard/vite.config.ts:18-25; package.json:8; turbo.json:8-11

**Observation:** `apps/dashboard` defines `vue-tsc -b && vite build`; root delegates through `turbo build`, output `dist/**` per package. Federation configuration generates own `remoteEntry.js`. Review records separate Build, unobserved Deployment and Versioning No; local servers without publication artifact.

**Interpretation:** Build confirms own application boundary. No independent deployment/versioning evidence.

### 23. apps/kanban/package.json:3-10; apps/kanban/vite.config.ts:16-23; package.json:8; turbo.json:8-11

**Observation:** `apps/kanban` defines `vue-tsc -b && vite build`; root delegates through `turbo build`, output `dist/**` per package. Federation configuration generates own `remoteEntry.js`. Review records separate Build, unobserved Deployment and Versioning No; local servers without publication artifact.

**Interpretation:** Build confirms own application boundary. No independent deployment/versioning evidence.

### 24. apps/shell/package.json:3-10; apps/shell/vite.config.ts:19-27; package.json:8; turbo.json:8-11

**Observation:** `apps/shell` defines `vue-tsc -b && vite build`; root delegates through `turbo build`, output `dist/**` per package. Host incorporates local remote URLs. Review records separate Build, unobserved Deployment and Versioning No; local servers without publication artifact.

**Interpretation:** Build confirms own application boundary. No independent deployment/versioning evidence.

### 25. README.mkd:3; apps/cms/package.json:18; apps/dashboard/package.json:18; apps/kanban/package.json:18; apps/shell/package.json:16; apps/cms; apps/cms/package.json:1-26; apps/cms/index.html:10-11; apps/cms/src/main.ts:3-5; apps/cms/vite.config.ts:6-32; pnpm-workspace.yaml:2; apps/dashboard; apps/dashboard/package.json:1-26; apps/dashboard/index.html:10-11; apps/dashboard/src/main.ts:3-5; apps/dashboard/vite.config.ts:6-34; apps/kanban; apps/kanban/package.json:1-26; apps/kanban/index.html:10-11; apps/kanban/src/main.ts:3-5; apps/kanban/vite.config.ts:6-32; apps/shell; apps/shell/package.json:1-26; apps/shell/index.html:10-11; apps/shell/src/main.ts:3-5; apps/shell/vite.config.ts:7-35; apps/shell/vite.config.ts:22; apps/dashboard/vite.config.ts:18-25; apps/shell/src/App.vue:5-7,21-28

**Observation:** README states: “Un ecosistema de Arquitectura Microfrontend [...] construido con Vue 3, Vite y Module Federation” (English translation: an ecosystem of microfrontend architecture built with Vue 3, Vite and Module Federation).

**Interpretation:** Situates technologies/application group. Section 3.4.7 records corroboration by federation chain/units without performance measurement.

### 26. README.mkd:5; apps/cms; apps/cms/package.json:1-26; apps/cms/index.html:10-11; apps/cms/src/main.ts:3-5; apps/cms/vite.config.ts:6-32; pnpm-workspace.yaml:2; apps/dashboard; apps/dashboard/package.json:1-26; apps/dashboard/index.html:10-11; apps/dashboard/src/main.ts:3-5; apps/dashboard/vite.config.ts:6-34; apps/kanban; apps/kanban/package.json:1-26; apps/kanban/index.html:10-11; apps/kanban/src/main.ts:3-5; apps/kanban/vite.config.ts:6-32; apps/shell; apps/shell/package.json:1-26; apps/shell/index.html:10-11; apps/shell/src/main.ts:3-5; apps/shell/vite.config.ts:7-35

**Observation:** README states: “aplicaciones verticales independientes” (English translation: independent vertical applications).

**Interpretation:** Independence corroborated by four units’ own entries/scripts; alone does not demonstrate independent deployment.

### 27. README.mkd:5; apps/shell/src/App.vue:2-7,14-15; apps/dashboard/src/components/WidgetDinero.vue:1-19; apps/cms/src/App.vue:1-10; apps/kanban/src/App.vue:1-10

**Observation:** README states: “comparten diseño, lógica y estado” (English translation: share design, logic and state).

**Interpretation:** Inter-unit sharing claim contradicted in review: only shell consumes kit and widget state local.

### 28. README.mkd:9; apps/shell/vite.config.ts:4,19-27; apps/shell/vite.config.ts:22; apps/dashboard/vite.config.ts:18-25; apps/shell/src/App.vue:5-7,21-28; apps/shell/vite.config.ts:23; apps/cms/vite.config.ts:16-23; apps/shell/vite.config.ts:24; apps/kanban/vite.config.ts:16-23

**Observation:** README states: “El sistema utiliza el patrón Host (Shell) + Remotes” (English translation: system uses Host/Shell + Remotes pattern).

**Interpretation:** Host/remotes organization corroborated by configuration/three recorded relationships.

### 29. README.mkd:9; apps/shell/src/App.vue:2,5-7,21-28; apps/shell/src/main.ts:3-5; apps/shell/index.html:11; apps/shell/vite.config.ts:22; apps/dashboard/vite.config.ts:19-23; apps/shell/src/vite-env.d.ts:3-7; apps/shell/src/App.vue:21-28; apps/shell/src/App.vue:5-7

**Observation:** README states: “cargando los microfrontends bajo demanda (Lazy Loading)” (English translation: loading microfrontends on demand).

**Interpretation:** Inter-unit on-demand loading corroborated by asynchronous import/Dashboard rendering; does not confirm all remotes consumed.

### 30. README.mkd:9; apps/cms/vite.config.ts:3,16-23; apps/shell/vite.config.ts:4,19-27; apps/dashboard/vite.config.ts:3,18-25; apps/kanban/vite.config.ts:3,16-23

**Observation:** README states: “compartiendo dependencias críticas para optimizar el bundle size” (English translation: sharing critical dependencies to optimize bundle size).

**Interpretation:** Dependency-sharing claim corroborated by `shared: ["vue"]` in four configurations. No bundle optimization measurement.

### 31. README.mkd:25; apps/shell/vite.config.ts:22; apps/dashboard/vite.config.ts:18-25; apps/shell/src/App.vue:5-7,21-28; apps/shell/src/App.vue:2,5-7,21-28; apps/shell/src/main.ts:3-5; apps/shell/index.html:11; apps/dashboard/vite.config.ts:19-23; apps/shell/src/vite-env.d.ts:3-7; apps/shell/src/App.vue:21-28; apps/shell/src/App.vue:5-7

**Observation:** README states: “Shell -->\|Carga Remota\| Dashboard” (English translation: shell remotely loads Dashboard).

**Interpretation:** Documentary edge corroborated by active relationship/widget-loading code.

### 32. README.mkd:26; apps/shell/vite.config.ts:23; apps/cms/vite.config.ts:16-23; apps/shell/src/App.vue:1-33

**Observation:** README states: “Shell -->\|Carga Remota\| CMS” (English translation: shell remotely loads CMS).

**Interpretation:** Arrow promises effective loading, contradicted in review: CMS relationship declared/inactive.

### 33. README.mkd:27; apps/shell/vite.config.ts:24; apps/kanban/vite.config.ts:16-23; apps/shell/src/App.vue:1-33

**Observation:** README states: “Shell -->\|Carga Remota\| Kanban” (English translation: shell remotely loads Kanban).

**Interpretation:** Arrow promises effective loading, contradicted in review: Kanban relationship declared/inactive.

### 34. README.mkd:29; apps/shell/package.json:12; apps/shell/src/App.vue:3,14-15

**Observation:** README states: “Shell -.->\|Consume\| UIKit” (English translation: shell consumes UI Kit).

**Interpretation:** Shell library consumption corroborated by static import/workspace dependency. Local reuse without MFE composition mechanism.

### 35. README.mkd:30; apps/dashboard/package.json:12-16; apps/dashboard/src/App.vue:1-10; apps/dashboard/src/components/WidgetDinero.vue:1-19

**Observation:** README states: “Dashboard -.->\|Consume\| UIKit” (English translation: Dashboard consumes UI Kit).

**Interpretation:** Arrow contradicted: Dashboard neither declares kit nor imports components; CSS scan does not establish consumption.

### 36. README.mkd:31; apps/cms/package.json:12-16; apps/cms/src/App.vue:1-10

**Observation:** README states: “CMS -.->\|Consume\| UIKit” (English translation: CMS consumes UI Kit).

**Interpretation:** Arrow contradicted: CMS neither declares nor imports kit.

### 37. README.mkd:32; apps/kanban/package.json:12-16; apps/kanban/src/App.vue:1-10

**Observation:** README states: “Kanban -.->\|Consume\| UIKit” (English translation: Kanban consumes UI Kit).

**Interpretation:** Arrow contradicted: Kanban neither declares nor imports kit.

### 38. README.mkd:40; package.json:7-10,18; turbo.json:3-13; pnpm-workspace.yaml:1-3

**Observation:** README states: “Turborepo para la orquestación de tareas y pnpm workspaces” (English translation: Turborepo for task orchestration and pnpm workspaces).

**Interpretation:** Workspace coordination corroborated by scripts/tasks; neither frontend unit nor composition. Turbo dependency Undetermined remains.

### 39. README.mkd:44-51; apps/cms; apps/cms/package.json:1-26; apps/cms/index.html:10-11; apps/cms/src/main.ts:3-5; apps/cms/vite.config.ts:6-32; pnpm-workspace.yaml:2; apps/dashboard; apps/dashboard/package.json:1-26; apps/dashboard/index.html:10-11; apps/dashboard/src/main.ts:3-5; apps/dashboard/vite.config.ts:6-34; apps/kanban; apps/kanban/package.json:1-26; apps/kanban/index.html:10-11; apps/kanban/src/main.ts:3-5; apps/kanban/vite.config.ts:6-32; apps/shell; apps/shell/package.json:1-26; apps/shell/index.html:10-11; apps/shell/src/main.ts:3-5; apps/shell/vite.config.ts:7-35

**Observation:** README states: “apps/ [...] Shell [...] Dashboard [...] CMS [...] Kanban” (English translation: four applications under apps/).

**Interpretation:** Four-application division corroborated by structure review’s four frontend units.

### 40. README.mkd:54-57; packages/ui-kit; packages/ui-kit/package.json:1-21; packages/ui-kit/src/index.ts:1-4; pnpm-workspace.yaml:3; packages/ui-kit/tsconfig.json:1-19

**Observation:** README states: “Librerías Compartidas [...] @repo/ui-kit [...] @repo/utils [...] Configuración TS” (English translation: shared libraries: UI Kit, utils and TS configuration).

**Interpretation:** Support-library description contradicted: only ui-kit present; utils/TS configuration package absent in snapshot. Does not describe frontend units.

### 41. README.mkd:68; apps/cms/package.json:23; apps/dashboard/package.json:23; apps/kanban/package.json:23; apps/shell/package.json:23

**Observation:** README states: “Build Tool: Vite 6”.

**Interpretation:** Announced builder version contradicted by manifests declaring Vite ^7.2.4. Tool version does not establish composition.

### 42. README.mkd:73; apps/shell/package.json:11-25; apps/cms/package.json:12-25; apps/dashboard/package.json:12-25; apps/kanban/package.json:12-25; apps/dashboard/src/components/WidgetDinero.vue:2-4,12

**Observation:** README states: “State Management: Pinia (Shared State)”.

**Interpretation:** Names shared state, contradicted by no Pinia in manifests/widget’s local state; proves no implemented shared mechanism.

### 43. README.mkd:91; package.json:7; turbo.json:4-7; apps/cms/package.json:7; apps/dashboard/package.json:7; apps/kanban/package.json:7; apps/shell/package.json:7

**Observation:** README states: “Turborepo lanzará las 4 aplicaciones en paralelo” (English translation: Turborepo will launch four applications in parallel).

**Interpretation:** Joint four-application execution corroborated by Vite scripts/dev task without federated-execution validation. Situates frontend unit group.

### 44. README.mkd:99; apps/shell/vite.config.ts:23; apps/cms/vite.config.ts:16-23; apps/shell/vite.config.ts:24; apps/kanban/vite.config.ts:16-23; apps/shell/src/App.vue:1-33

**Observation:** README states: “Entra aquí para ver la integración completa” (English translation: enter here to see complete integration).

**Interpretation:** Complete integration contradicted: shell renders only Dashboard/local button, CMS/Kanban inactive.

### 45. README.mkd:117-119; apps/shell/src/App.vue:1-33; apps/shell/src/main.ts:1-5; apps/cms/src/App.vue:1-10; apps/kanban/src/App.vue:1-10; apps/dashboard/src/components/WidgetDinero.vue:1-19

**Observation:** README states: “Maneja [...] Autenticación (JWT compartido)” (English translation: shell manages authentication with shared JWT).

**Interpretation:** Promises inter-unit shared session, contradicted by minimal shell/remote code without JWT authentication.

### 46. README.mkd:120; apps/shell/src/App.vue:1-33; apps/shell/src/main.ts:1-5; apps/shell/package.json:11-25

**Observation:** README states: “Enrutamiento raíz” (English translation: root routing in shell).

**Interpretation:** Host routing responsibility contradicted: entry mounts App, rendering widget directly without router.

### 47. README.mkd:150

**Observation:** README states: “Cada equipo puede desplegar su microfrontend (Dashboard, CMS) sin afectar al Shell ni a los otros módulos” (English translation: each team can deploy its microfrontend without affecting shell or other modules).

**Interpretation:** Independent unit deployment claim uncorroborated in 3.4.7. Separate builds/local preview do not demonstrate property.

### 48. README.mkd:152; apps/shell/src/App.vue:3,14-15; apps/cms/package.json:12-16; apps/dashboard/package.json:12-16; apps/kanban/package.json:12-16

**Observation:** README states: “ver el cambio reflejado instantáneamente en las 4 apps gracias al Hot Module Replacement (HMR) unificado” (English translation: see UI Kit change instantly reflected in four apps through unified Hot Module Replacement).

**Interpretation:** Promised effect across four applications contradicted by shell-only kit consumption; dev orchestration creates no remote consumers.

### 49. e3cc334 2025-11-28 (.turbo/, turbo.json); 816fe78 2025-11-29 (.turbo/cookies/1.cookie); 80a16ce 2025-11-29 (.turbo/)

**Observation:** History review records `.turbo/` in first commit, with cookies/empty log dated 2025-11-27, removed in two commits; `turbo.json` retains same object and no automation beyond scripts appears.

**Interpretation:** Clarifies traces of local Turbo execution without identifying executed script. Does not alter 3.4.2 Undetermined or demonstrate composition.

### 50. e3cc334 2025-11-28 (apps/*/vite.config.ts, apps/shell/src/App.vue); 5244640 2025-11-28 (README.mkd); 13859fe 2025-11-29 (apps/*/vite.config.ts, apps/shell/src/vite-env.d.ts); ea611b1 2025-11-29 (apps/shell/src/App.vue)

**Observation:** Review places README before differentiated remote configuration; afterward shell App has only Dashboard-loading version without adding/removing CMS/Kanban loading.

**Interpretation:** Clarifies CMS/Kanban remain declared/unconnected in observable history, without earlier code confirming abandoned links. Attempted old blobs absent, a preserved limit.

### 51. e3cc334 2025-11-28 (apps/*/src/main.ts); 5244640 2025-11-28 (README.mkd); 280cc20 2025-11-29 (apps/*/package.json)

**Observation:** Review records no commit creating store/router/authentication files; entries remain same objects through snapshot. README predates specific components; earlier manifest contents unavailable.

**Interpretation:** Clarifies state/JWT/routing promises as pre-code description in observable history without proving old dependencies. Alone does not support architecture.

### 52. e3cc334 2025-11-28 (packages/ui-kit/index.ts, apps/*/src/App.vue); ea611b1 2025-11-29 (packages/ui-kit/src/MyButton.vue, apps/*/src/App.vue); 29967bf 2025-11-29 (apps/*/src/style.css); 280cc20 2025-11-29 (apps/*/package.json)

**Observation:** Review records kit-component creation and preservation of remote App versions without kit imports; widget also single version. Stylesheets reference kit; earlier manifest contents unavailable.

**Interpretation:** Clarifies no remote consumption of kit components after creation in observable history. CSS sharing does not confirm consumption/HMR promises for four apps.

### 53. 5244640 2025-11-28 (README.mkd)

**Observation:** Review records `@repo/utils`/TS configuration announced in README, absent from all commit path lists through snapshot; only ui-kit under packages.

**Interpretation:** Clarifies two libraries announced without observable existence/removal stage. Support-library context.

### 54. e3cc334 2025-11-28 (apps/*/package.json); 5244640 2025-11-28 (README.mkd); 280cc20 2025-11-29 (apps/*/package.json)

**Observation:** Review records two manifest versions without first contents. README announces Vite 6; snapshot manifests declare ^7.2.4; version at README introduction undetermined.

**Interpretation:** Inconclusive only about past. Snapshot divergence clear and does not make current composition ambiguous, hence weak strength.

## Classification

| # | Origin | Dimension | Type | Approach | Evidence | Strength | Relationships |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.2 (apps/cms/package.json:18) | 1 technology | manifest | module-federation | technological | weak | declares #6 |
| 2 | 3.4.2 (apps/dashboard/package.json:18) | 1 technology | manifest | module-federation | technological | weak | declares #8 |
| 3 | 3.4.2 (apps/kanban/package.json:18) | 1 technology | manifest | module-federation | technological | weak | declares #9 |
| 4 | 3.4.2 (apps/shell/package.json:16) | 1 technology | manifest | module-federation | technological | weak | declares #7 |
| 5 | 3.4.2 (package.json:18) | 1 technology | manifest | — | context | ambiguous | — |
| 6 | 3.4.2 (apps/cms/package.json:18, Evidence); 3.4.3 (apps/cms, Markers and Build); 3.4.5 #2 (Configuration); 3.4.6 #1 (Artifacts); 3.4.7 #6 (Evidence) | 2 configuration | configuration | module-federation | technological | moderate | configures #13; configures #19 |
| 7 | 3.4.2 (apps/cms/package.json:18, Evidence); 3.4.2 (apps/kanban/package.json:18, Evidence); 3.4.2 (apps/shell/package.json:16, Evidence); 3.4.3 (apps/shell, Markers and Build); 3.4.4 (src-remote-import, Observation); 3.4.5 #1, #2, #3 (Configuration); 3.4.6 #1, #2, #3 (Where served), #4 (Artifacts); 3.4.7 #4, #6, #8, #9 (Evidence) | 2 configuration | configuration | module-federation | architectural | strong | configures #10; configures #16; configures #18; configures #19; configures #20 |
| 8 | 3.4.2 (apps/dashboard/package.json:18, Evidence); 3.4.3 (apps/dashboard, Markers and Build); 3.4.4 (src-remote-import, Observation); 3.4.5 #1 (Configuration); 3.4.6 #2 (Artifacts); 3.4.7 #6 (Evidence) | 2 configuration | configuration | module-federation | technological | moderate | configures #10; configures #14; configures #18 |
| 9 | 3.4.2 (apps/kanban/package.json:18, Evidence); 3.4.3 (apps/kanban, Markers and Build); 3.4.5 #3 (Configuration); 3.4.6 #3 (Artifacts); 3.4.7 #6 (Evidence) | 2 configuration | configuration | module-federation | technological | moderate | configures #15; configures #20 |
| 10 | 3.4.4 (src-remote-import, apps/shell/src/App.vue:6) | 3 code | source code | module-federation | architectural | strong | implements #18 |
| 11 | 3.4.4 (manual, apps/shell/src/App.vue:23) | 3 code | source code | module-federation | architectural | moderate | implements #18 |
| 12 | 3.4.3 (.) | 4 structure | directory | — | context | weak | — |
| 13 | 3.4.3 (apps/cms) | 4 structure | directory | — | architectural | moderate | — |
| 14 | 3.4.3 (apps/dashboard) | 4 structure | directory | — | architectural | moderate | — |
| 15 | 3.4.3 (apps/kanban) | 4 structure | directory | — | architectural | moderate | — |
| 16 | 3.4.3 (apps/shell) | 4 structure | directory | — | architectural | moderate | — |
| 17 | 3.4.3 (packages/ui-kit) | 4 structure | directory | — | context | weak | — |
| 18 | 3.4.5 #1 | 5 composition | configuration | module-federation | architectural | strong | links #16; links #14 |
| 19 | 3.4.5 #2 | 5 composition | configuration | module-federation | architectural | moderate | links #16; links #13 |
| 20 | 3.4.5 #3 | 5 composition | configuration | module-federation | architectural | moderate | links #16; links #15 |
| 21 | 3.4.6 #1 | 6 build-deploy | manifest | module-federation | architectural | moderate | publishes #13 |
| 22 | 3.4.6 #2 | 6 build-deploy | manifest | module-federation | architectural | moderate | publishes #14 |
| 23 | 3.4.6 #3 | 6 build-deploy | manifest | module-federation | architectural | moderate | publishes #15 |
| 24 | 3.4.6 #4 | 6 build-deploy | manifest | module-federation | architectural | moderate | publishes #16 |
| 25 | 3.4.7 #1 | 7 documentation | documentation | module-federation | architectural | weak | corroborates #1; corroborates #2; corroborates #3; corroborates #4; corroborates #13; corroborates #14; corroborates #15; corroborates #16; corroborates #18 |
| 26 | 3.4.7 #2 | 7 documentation | documentation | — | architectural | weak | corroborates #13; corroborates #14; corroborates #15; corroborates #16 |
| 27 | 3.4.7 #3 | 7 documentation | documentation | — | architectural | weak | contradicts apps/shell/src/App.vue:2-7,14-15; contradicts apps/dashboard/src/components/WidgetDinero.vue:1-19; contradicts apps/cms/src/App.vue:1-10; contradicts apps/kanban/src/App.vue:1-10 |
| 28 | 3.4.7 #4 | 7 documentation | documentation | — | architectural | weak | corroborates #7; corroborates #18; corroborates #19; corroborates #20 |
| 29 | 3.4.7 #5 | 7 documentation | documentation | — | architectural | weak | corroborates #10; corroborates #11 |
| 30 | 3.4.7 #6 | 7 documentation | documentation | — | technological | weak | corroborates #6; corroborates #7; corroborates #8; corroborates #9 |
| 31 | 3.4.7 #7 | 7 documentation | documentation | — | architectural | weak | corroborates #18; corroborates #10; corroborates #11 |
| 32 | 3.4.7 #8 | 7 documentation | documentation | — | architectural | weak | contradicts #19; contradicts apps/shell/src/App.vue:1-33 |
| 33 | 3.4.7 #9 | 7 documentation | documentation | — | architectural | weak | contradicts #20; contradicts apps/shell/src/App.vue:1-33 |
| 34 | 3.4.7 #10 | 7 documentation | documentation | — | context | weak | corroborates apps/shell/package.json:12; corroborates apps/shell/src/App.vue:3,14-15 |
| 35 | 3.4.7 #11 | 7 documentation | documentation | — | context | weak | contradicts apps/dashboard/package.json:12-16; contradicts apps/dashboard/src/App.vue:1-10; contradicts apps/dashboard/src/components/WidgetDinero.vue:1-19 |
| 36 | 3.4.7 #12 | 7 documentation | documentation | — | context | weak | contradicts apps/cms/package.json:12-16; contradicts apps/cms/src/App.vue:1-10 |
| 37 | 3.4.7 #13 | 7 documentation | documentation | — | context | weak | contradicts apps/kanban/package.json:12-16; contradicts apps/kanban/src/App.vue:1-10 |
| 38 | 3.4.7 #14 | 7 documentation | documentation | — | context | weak | corroborates package.json:7-10,18; corroborates turbo.json:3-13; corroborates pnpm-workspace.yaml:1-3 |
| 39 | 3.4.7 #15 | 7 documentation | documentation | — | architectural | weak | corroborates #13; corroborates #14; corroborates #15; corroborates #16 |
| 40 | 3.4.7 #16 | 7 documentation | documentation | — | context | weak | contradicts #17; contradicts packages/ui-kit/tsconfig.json:1-19 |
| 41 | 3.4.7 #17 | 7 documentation | documentation | — | context | weak | contradicts apps/cms/package.json:23; contradicts apps/dashboard/package.json:23; contradicts apps/kanban/package.json:23; contradicts apps/shell/package.json:23 |
| 42 | 3.4.7 #18 | 7 documentation | documentation | — | technological | weak | contradicts apps/shell/package.json:11-25; contradicts apps/cms/package.json:12-25; contradicts apps/dashboard/package.json:12-25; contradicts apps/kanban/package.json:12-25; contradicts apps/dashboard/src/components/WidgetDinero.vue:2-4,12 |
| 43 | 3.4.7 #19 | 7 documentation | documentation | — | architectural | weak | corroborates package.json:7; corroborates turbo.json:4-7; corroborates apps/cms/package.json:7; corroborates apps/dashboard/package.json:7; corroborates apps/kanban/package.json:7; corroborates apps/shell/package.json:7 |
| 44 | 3.4.7 #20 | 7 documentation | documentation | — | architectural | weak | contradicts #19; contradicts #20; contradicts apps/shell/src/App.vue:1-33 |
| 45 | 3.4.7 #21 | 7 documentation | documentation | — | architectural | weak | contradicts apps/shell/src/App.vue:1-33; contradicts apps/shell/src/main.ts:1-5; contradicts apps/cms/src/App.vue:1-10; contradicts apps/kanban/src/App.vue:1-10; contradicts apps/dashboard/src/components/WidgetDinero.vue:1-19 |
| 46 | 3.4.7 #22 | 7 documentation | documentation | — | architectural | weak | contradicts apps/shell/src/App.vue:1-33; contradicts apps/shell/src/main.ts:1-5; contradicts apps/shell/package.json:11-25 |
| 47 | 3.4.7 #23 | 7 documentation | documentation | — | architectural | weak | — |
| 48 | 3.4.7 #24 | 7 documentation | documentation | — | architectural | weak | contradicts apps/shell/src/App.vue:3,14-15; contradicts apps/cms/package.json:12-16; contradicts apps/dashboard/package.json:12-16; contradicts apps/kanban/package.json:12-16 |
| 49 | 3.4.8 #1 | 8 history | history | — | context | weak | explains #5 |
| 50 | 3.4.8 #2 | 8 history | history | module-federation | architectural | weak | explains #19; explains #20; explains #32; explains #33; explains #44 |
| 51 | 3.4.8 #3 | 8 history | history | — | architectural | weak | explains #27; explains #42; explains #45; explains #46 |
| 52 | 3.4.8 #4 | 8 history | history | — | context | weak | explains #35; explains #36; explains #37; explains #48 |
| 53 | 3.4.8 #5 | 8 history | history | — | context | weak | explains #40 |
| 54 | 3.4.8 #6 | 8 history | history | — | context | weak | explains #41 |

## Summary

Observations: 54. Dimensions (technology: 5, configuration: 4, code: 2, structure: 6, composition: 3, build-deploy: 4, documentation: 24, history: 6). Strength (strong: 3, moderate: 14, weak: 36, ambiguous: 1). Evidence (technological: 9, architectural: 31, context: 14).
