---
schema: 1
id: 1019893852
full_name: lguilhermecardoso/mfe-react-vite-example
commit: ddf474192c82d47341b22be009915913c9227eca
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

# 351 — lguilhermecardoso/mfe-react-vite-example

## Repository overview

Five React units have own manifests/entries/builds (#25–#29). Composition chain starts in `@originjs/vite-plugin-federation` declarations (#1, #3, #5, #7, #9), passes through four remote configurations (#11–#14)/host (#15), reaches code imports/mounts (#16–#24). Four active relationships (#30–#33) link `root-app` to navbar, login, dashboard, character detail through Module Federation. Login/dashboard enter host routes; detail enters through wrapper receiving route ID; navbar mounted outside routes. Props/callback exchange mediated by host.

Each unit has own build boundary while deployment joint: script builds five outputs/sole workflow publishes aggregate `dist` to GitHub Pages (#34–#38). Supports separate builds without independent publication/versioning. Five unscoped `vite-plugin-federation` packages declared without recorded usage (#2, #4, #6, #8, #10), potentially misleading manifest-only reading.

Documentary claims corroborate organization/integrations (#39–#46, #48–#53), weak because semantic. Local-consumption description contradicted by active Pages URL selection (#47); About page names React 18 versus React 19 manifests (#54). External API functional context (#55). History clarifies React divergence coexistence/leaves dependency past usage and local/Pages divergence origin inconclusive (#56–#62). Past uncertainties do not make snapshot architecture ambiguous.

## Observations

### 1. mf-dashboard/package.json:13

**Observation:** Manifest of `mf-dashboard` declares `@originjs/vite-plugin-federation` `^1.4.1` in `dependencies`.

**Interpretation:** Isolated Module Federation technology signal. Section 3.4.2 records Configured `Yes`; scoped package imported/configured by Vite.

### 2. mf-dashboard/package.json:31

**Observation:** Manifest of `mf-dashboard` declares `vite-plugin-federation` `^0.0.1` in `devDependencies`.

**Interpretation:** Isolated Module Federation technology signal. Section 3.4.2 records Configured `No`; snapshot uses scoped package without recorded usage of unscoped package.

### 3. mf-login/package.json:20

**Observation:** Manifest of `mf-login` declares `@originjs/vite-plugin-federation` `^1.4.1` in `devDependencies`.

**Interpretation:** Isolated Module Federation technology signal. Section 3.4.2 records Configured `Yes`; scoped package imported/configured by Vite.

### 4. mf-login/package.json:31

**Observation:** Manifest of `mf-login` declares `vite-plugin-federation` `^0.0.1` in `devDependencies`.

**Interpretation:** Isolated Module Federation technology signal. Section 3.4.2 records Configured `No`; snapshot uses scoped package without recorded usage of unscoped package.

### 5. mf-navbar/package.json:20

**Observation:** Manifest of `mf-navbar` declares `@originjs/vite-plugin-federation` `^1.4.1` in `devDependencies`.

**Interpretation:** Isolated Module Federation technology signal. Section 3.4.2 records Configured `Yes`; scoped package imported/configured by Vite.

### 6. mf-navbar/package.json:31

**Observation:** Manifest of `mf-navbar` declares `vite-plugin-federation` `^0.0.1` in `devDependencies`.

**Interpretation:** Isolated Module Federation technology signal. Section 3.4.2 records Configured `No`; snapshot uses scoped package without recorded usage of unscoped package.

### 7. mf-personagem-detalhe/package.json:13

**Observation:** Manifest of `mf-personagem-detalhe` declares `@originjs/vite-plugin-federation` `^1.4.1` in `dependencies`.

**Interpretation:** Isolated Module Federation technology signal. Section 3.4.2 records Configured `Yes`; scoped package imported/configured by Vite.

### 8. mf-personagem-detalhe/package.json:31

**Observation:** Manifest of `mf-personagem-detalhe` declares `vite-plugin-federation` `^0.0.1` in `devDependencies`.

**Interpretation:** Isolated Module Federation technology signal. Section 3.4.2 records Configured `No`; snapshot uses scoped package without recorded usage of unscoped package.

### 9. root-app/package.json:21

**Observation:** Manifest of `root-app` declares `@originjs/vite-plugin-federation` `^1.4.1` in `devDependencies`.

**Interpretation:** Isolated Module Federation technology signal. Section 3.4.2 records Configured `Yes`; scoped package imported/configured by Vite.

### 10. root-app/package.json:33

**Observation:** Manifest of `root-app` declares `vite-plugin-federation` `^0.0.1` in `devDependencies`.

**Interpretation:** Isolated Module Federation technology signal. Section 3.4.2 records Configured `No`; snapshot uses scoped package without recorded usage of unscoped package.

### 11. mf-dashboard/vite.config.ts:3; mf-dashboard/vite.config.ts:10-17

**Observation:** Plugin imported from `@originjs/vite-plugin-federation` receives `name: "mf_dashboard"`, `filename: "remoteEntry.js"`, `exposes: { "./Dashboard": "./src/Dashboard.tsx" }`, `shared: ["react", "react-dom"]`.

**Interpretation:** Configures federation surface of `mf-dashboard` without naming another consumer unit.

### 12. mf-login/vite.config.ts:3; mf-login/vite.config.ts:10-17

**Observation:** Plugin imported from `@originjs/vite-plugin-federation` receives `name: "mf_login"`, `filename: "remoteEntry.js"`, `exposes: { "./Login": "./src/App.tsx" }`, `shared: ["react", "react-dom"]`.

**Interpretation:** Configures federation surface of `mf-login` without naming another consumer unit.

### 13. mf-navbar/vite.config.ts:3; mf-navbar/vite.config.ts:10-17

**Observation:** Plugin imported from `@originjs/vite-plugin-federation` receives `name: "mf_navbar"`, `filename: "remoteEntry.js"`, `exposes: { "./Navbar": "./src/Navbar.tsx" }`, `shared: ["react", "react-dom"]`.

**Interpretation:** Configures federation surface of `mf-navbar` without naming another consumer unit.

### 14. mf-personagem-detalhe/vite.config.ts:3; mf-personagem-detalhe/vite.config.ts:10-17

**Observation:** Plugin imported from `@originjs/vite-plugin-federation` receives `name: "mf_personagem_detalhe"`, `filename: "remoteEntry.js"`, `exposes: { "./PersonagemDetalhe": "./src/PersonagemDetalhe.tsx" }`, `shared: ["react", "react-dom"]`.

**Interpretation:** Configures federation surface of `mf-personagem-detalhe` without naming another consumer unit.

### 15. root-app/vite.config.ts:3; root-app/vite.config.ts:7-24; root-app/vite.config.ts:31-35

**Observation:** Configuration names host `root_app`, shares React/React DOM and declares `mf_login`, `mf_dashboard`, `mf_personagem_detalhe`, `mf_navbar` with local/GitHub Pages `remoteEntry.js` URLs selected through `IS_LOCAL`.

**Interpretation:** Block explicitly links host to four other units through Module Federation. Selection occurs while assembling build configuration.

### 16. root-app/src/App.tsx:5

**Observation:** Imports `mf_navbar/Navbar` through `React.lazy` and `import()`.

**Interpretation:** Names remote/UI module loaded by host.

### 17. root-app/src/App.tsx:6

**Observation:** Imports `mf_login/Login` through `React.lazy` and `import()`.

**Interpretation:** Names login unit loaded by host.

### 18. root-app/src/App.tsx:7

**Observation:** Imports `mf_dashboard/Dashboard` through `React.lazy` and `import()`.

**Interpretation:** Names dashboard unit loaded by host.

### 19. root-app/src/App.tsx:8

**Observation:** Imports `mf_personagem_detalhe/PersonagemDetalhe` through `React.lazy` and `import()`.

**Interpretation:** Names detail unit loaded by host.

### 20. root-app/src/App.tsx:24-28; root-app/src/App.tsx:8; root-app/src/App.tsx:81-84

**Observation:** Wrapper renders `PersonagemDetalheMFE` with `id`, `user`, `onBack`.

**Interpretation:** Uses remote component outside route declaration; path-to-wrapper link separately in route table.

### 21. root-app/src/App.tsx:58-60; root-app/src/App.tsx:5

**Observation:** Renders `Navbar` inside Suspense when user present/passes `user`, `onLogout`.

**Interpretation:** Mounts remote UI in common host area outside routes.

### 22. root-app/src/App.tsx:63-96; root-app/src/App.tsx:5-8; root-app/src/App.tsx:20-28; root-app/src/main.tsx:9-11

**Observation:** Route table associates `/login` with `LoginMFE`, `/dashboard` with `DashboardMFE`, `/personagem/:id` with `PersonagemDetalheWrapper`.

**Interpretation:** Links host paths to remote components; HashRouter frames composed-screen navigation.

### 23. root-app/src/App.tsx:64-68; root-app/src/App.tsx:6; root-app/src/App.tsx:36-40

**Observation:** Route `/login` renders `LoginMFE` with `onAuthSuccess={handleLogin}` when no user.

**Interpretation:** Route integrates login unit in host authentication flow.

### 24. root-app/src/App.tsx:69-80; root-app/src/App.tsx:7

**Observation:** Route `/dashboard` renders `DashboardMFE` with user, token/callback navigating to `/personagem/${id}`.

**Interpretation:** Route integrates dashboard/forwards detail navigation through host.

### 25. mf-dashboard/; mf-dashboard/package.json:1-11; mf-dashboard/index.html:11; mf-dashboard/src/main.tsx:6-10; mf-dashboard/vite.config.ts:6-34

**Observation:** Directory `mf-dashboard` has own manifest, HTML entry loading `src/main.tsx`, React mounting, script `tsc -b && vite build`, Vite output `../dist/mf-dashboard`.

**Interpretation:** Confirms frontend unit boundary with own entry/build. Directory alone demonstrates no composition relationships.

### 26. mf-login/; mf-login/package.json:1-11; mf-login/index.html:11; mf-login/src/main.tsx:6-10; mf-login/vite.config.ts:6-34

**Observation:** Directory `mf-login` has own manifest, HTML entry loading `src/main.tsx`, React mounting, script `tsc -b && vite build`, Vite output `../dist/mf-login`.

**Interpretation:** Confirms frontend unit boundary with own entry/build. Directory alone demonstrates no composition relationships.

### 27. mf-navbar/; mf-navbar/package.json:1-11; mf-navbar/index.html:11; mf-navbar/src/main.tsx:6-10; mf-navbar/vite.config.ts:6-34

**Observation:** Directory `mf-navbar` has own manifest, HTML entry loading `src/main.tsx`, React mounting, script `tsc -b && vite build`, Vite output `../dist/mf-navbar`.

**Interpretation:** Confirms frontend unit boundary with own entry/build. Directory alone demonstrates no composition relationships.

### 28. mf-personagem-detalhe/; mf-personagem-detalhe/package.json:1-11; mf-personagem-detalhe/index.html:11; mf-personagem-detalhe/src/main.tsx:6-10; mf-personagem-detalhe/vite.config.ts:6-34

**Observation:** Directory `mf-personagem-detalhe` has own manifest, HTML entry loading `src/main.tsx`, React mounting, script `tsc -b && vite build`, Vite output `../dist/mf-personagem-detalhe`.

**Interpretation:** Confirms frontend unit boundary with own entry/build. Directory alone demonstrates no composition relationships.

### 29. root-app/; root-app/package.json:1-11; root-app/index.html:15; root-app/src/main.tsx:7-13; root-app/vite.config.ts:6-45

**Observation:** Directory `root-app` has own manifest, HTML entry loading `src/main.tsx`, React mounting under HashRouter, script `tsc -b && vite build`, Vite output `../dist/root-app`.

**Interpretation:** Confirms frontend unit boundary with own entry/build. Directory alone demonstrates no composition relationships.

### 30. root-app/src/App.tsx:5; root-app/src/App.tsx:59; root-app/vite.config.ts:11-24; root-app/vite.config.ts:31-35; mf-navbar/vite.config.ts:10-17; mf-navbar/vite.config.ts:23

**Observation:** `root-app` imports `mf_navbar/Navbar`, renders it; host configuration resolves `mf_navbar` through `remoteEntry.js` URL, `mf-navbar` exposes `./Navbar`. Section 3.4.5 records target in snapshot `Yes`, active relationship `Yes`.

**Interpretation:** Directly links host to `mf-navbar` through Module Federation, matching import, URL/exposed module.

### 31. root-app/src/App.tsx:6; root-app/src/App.tsx:64-68; root-app/vite.config.ts:11-24; root-app/vite.config.ts:31-35; mf-login/vite.config.ts:10-17; mf-login/vite.config.ts:23

**Observation:** `root-app` imports `mf_login/Login`, renders it; host configuration resolves `mf_login` through `remoteEntry.js` URL, `mf-login` exposes `./Login`. Section 3.4.5 records target in snapshot `Yes`, active relationship `Yes`.

**Interpretation:** Directly links host to `mf-login` through Module Federation, matching import, URL/exposed module.

### 32. root-app/src/App.tsx:7; root-app/src/App.tsx:69-80; root-app/vite.config.ts:11-24; root-app/vite.config.ts:31-35; mf-dashboard/vite.config.ts:10-17; mf-dashboard/vite.config.ts:23

**Observation:** `root-app` imports `mf_dashboard/Dashboard`, renders it; host configuration resolves `mf_dashboard` through `remoteEntry.js` URL, `mf-dashboard` exposes `./Dashboard`. Section 3.4.5 records target in snapshot `Yes`, active relationship `Yes`.

**Interpretation:** Directly links host to `mf-dashboard` through Module Federation, matching import, URL/exposed module.

### 33. root-app/src/App.tsx:8; root-app/src/App.tsx:24-28; root-app/src/App.tsx:81-84; root-app/vite.config.ts:11-24; root-app/vite.config.ts:31-35; mf-personagem-detalhe/vite.config.ts:10-17; mf-personagem-detalhe/vite.config.ts:23

**Observation:** `root-app` imports `mf_personagem_detalhe/PersonagemDetalhe`, renders it; host configuration resolves `mf_personagem_detalhe` through `remoteEntry.js` URL, `mf-personagem-detalhe` exposes `./PersonagemDetalhe`. Section 3.4.5 records target in snapshot `Yes`, active relationship `Yes`.

**Interpretation:** Directly links host to `mf-personagem-detalhe` through Module Federation, matching import, URL/exposed module.

### 34. mf-dashboard/package.json:8; mf-dashboard/vite.config.ts:22-24; build-all.sh:12; .github/workflows/deploy.yml:19-27

**Observation:** `mf-dashboard` executes own build/writes `dist/mf-dashboard`. `build-all.sh` runs it with others. Workflow publishes entire `./dist` in GitHub Pages. Section 3.4.6 records Build `separate`, Deployment `joint`, Versioning `No`.

**Interpretation:** Shows separate unit build/joint publication. Establishes no independent deployment/versioning.

### 35. mf-login/package.json:8; mf-login/vite.config.ts:22-24; build-all.sh:9; .github/workflows/deploy.yml:19-27

**Observation:** `mf-login` executes own build/writes `dist/mf-login`. `build-all.sh` runs it with others. Workflow publishes entire `./dist` in GitHub Pages. Section 3.4.6 records Build `separate`, Deployment `joint`, Versioning `No`.

**Interpretation:** Shows separate unit build/joint publication. Establishes no independent deployment/versioning.

### 36. mf-navbar/package.json:8; mf-navbar/vite.config.ts:22-24; build-all.sh:15; .github/workflows/deploy.yml:19-27

**Observation:** `mf-navbar` executes own build/writes `dist/mf-navbar`. `build-all.sh` runs it with others. Workflow publishes entire `./dist` in GitHub Pages. Section 3.4.6 records Build `separate`, Deployment `joint`, Versioning `No`.

**Interpretation:** Shows separate unit build/joint publication. Establishes no independent deployment/versioning.

### 37. mf-personagem-detalhe/package.json:8; mf-personagem-detalhe/vite.config.ts:22-24; build-all.sh:18; .github/workflows/deploy.yml:19-27

**Observation:** `mf-personagem-detalhe` executes own build/writes `dist/mf-personagem-detalhe`. `build-all.sh` runs it with others. Workflow publishes entire `./dist` in GitHub Pages. Section 3.4.6 records Build `separate`, Deployment `joint`, Versioning `No`.

**Interpretation:** Shows separate unit build/joint publication. Establishes no independent deployment/versioning.

### 38. root-app/package.json:8; root-app/vite.config.ts:37-40; build-all.sh:21-23; .github/workflows/deploy.yml:19-27; root-app/vite.config.ts:27

**Observation:** `root-app` executes own build/writes `dist/root-app`. `build-all.sh` runs it with others and copies host output to `dist` root. Workflow publishes entire `./dist` in GitHub Pages. Section 3.4.6 records Build `separate`, Deployment `joint`, Versioning `No`.

**Interpretation:** Shows separate unit build/joint publication. Establishes no independent deployment/versioning.

### 39. .github/workflows/deploy.yml:1

**Observation:** Artifact states: "Deploy Microfrontends to GitHub Pages". Section 3.4.7 records claim as `corroborated`.

**Interpretation:** Claims joint frontend-unit Pages publication corroborated by workflow/script; name proves no deployment execution.

### 40. README.md:3

**Observation:** Artifact states: "This project demonstrates a Microfrontends architecture using React, Vite, Module Federation, and TailwindCSS.". Section 3.4.7 records claim as `corroborated`.

**Interpretation:** Presents Module Federation microfrontend organization corroborated by units, configuration/relationships. Semantic evidence.

### 41. README.md:11

**Observation:** Artifact states: "root-app/ […] Main application (container/orchestrator)". Section 3.4.7 records claim as `corroborated`.

**Interpretation:** Orchestrator role corroborated by four host relationships/remote rendering.

### 42. README.md:12

**Observation:** Artifact states: "mf-login/ […] Microfrontend: Login and sign-up screen". Section 3.4.7 records claim as `corroborated`.

**Interpretation:** Login-unit role corroborated by own structure/federation exposure/login-signup switching.

### 43. README.md:13

**Observation:** Artifact states: "mf-dashboard/ […] Microfrontend: Main dashboard". Section 3.4.7 records claim as `corroborated`.

**Interpretation:** Dashboard role corroborated by structure, exposure/host-route mounting.

### 44. README.md:14

**Observation:** Artifact states: "mf-personagem-detalhe/ […] Microfrontend: Character detail (e.g., Rick and Morty)". Section 3.4.7 records claim as `corroborated`.

**Interpretation:** Detail-unit role corroborated by structure/exposed module querying character by ID.

### 45. README.md:15

**Observation:** Artifact states: "mf-navbar/ […] Microfrontend: Navbar with navigation and user info". Section 3.4.7 records claim as `corroborated`.

**Interpretation:** Navbar role corroborated by own unit/exposed module/user-navigation UI.

### 46. README.md:33

**Observation:** Artifact states: "Each microfrontend is an independent project (with its own package.json).". Section 3.4.7 records claim as `corroborated`.

**Interpretation:** Project/development independence corroborated by own entries, manifests, builds/local wrappers; claims no separate deployment.

### 47. README.md:80

**Observation:** Artifact states: "The root-app will run on http://localhost:5000 […] consuming the microfrontends remotely from their preview servers.". Section 3.4.7 records claim as `contradicted`.

**Interpretation:** Local description contradicted: active environment has `IS_LOCAL=false`, selecting Pages remotes. `.bkp` file does not activate local option.

### 48. README.md:87

**Observation:** Artifact states: "Navbar (mf-navbar): […] federated integration". Section 3.4.7 records claim as `corroborated`.

**Interpretation:** Navbar federation integration corroborated by active relationship/configuration/host mounting.

### 49. README.md:92

**Observation:** Artifact states: "Basic global state (user/token via localStorage)". Section 3.4.7 records claim as `corroborated`.

**Interpretation:** Basic state corroborated by login/host writes/props passing. Demonstrates neither shared context nor extra composition mechanism.

### 50. README.md:98

**Observation:** Artifact states: "[x] Integrated login via MFE". Section 3.4.7 records claim as `corroborated`.

**Interpretation:** Login integration corroborated by active relationship/callback updating host state.

### 51. mf-navbar/src/App.tsx:15

**Observation:** Artifact states: "Em produção, user e onLogout viriam via props do root-app ou de um context global". (English translation: In production user and onLogout would come through root-app props or global context.) Section 3.4.7 records claim as `corroborated`.

**Interpretation:** Host props path corroborated; comment offers global context alternative without demonstrated implementation.

### 52. mf-navbar/src/App.tsx:21

**Observation:** Artifact states: "esse microfrontend só expõe a Navbar". (English translation: This microfrontend exposes only Navbar.) Section 3.4.7 records claim as `corroborated`.

**Interpretation:** Exposed surface corroborated: `./Navbar` sole `exposes` key, pointing directly to Navbar.tsx.

### 53. roadmap.md:29

**Observation:** Artifact states: "[x] Permitir clicar em um card para visualizar detalhes no mf-personagem-detalhe". (English translation: [x] Allow clicking a card to view details in mf-personagem-detalhe.) Section 3.4.7 records claim as `corroborated`.

**Interpretation:** Dashboard/detail navigation corroborated by callback/host routes; implies no direct inter-remote import.

### 54. root-app/src/pages/Sobre.tsx:33

**Observation:** Artifact states: "Tecnologias: React 18". (English translation: Technologies: React eighteen.) Section 3.4.7 records claim as `contradicted`.

**Interpretation:** Described version contradicted by five manifests declaring React/React DOM `^19.1.0`. Framework context without MFE mechanism.

### 55. root-app/src/pages/Sobre.tsx:33

**Observation:** Artifact states: "integração com a API pública Rick and Morty". (English translation: Integration with public Rick and Morty API.) Section 3.4.7 records claim as `corroborated`.

**Interpretation:** External backend dependency corroborated by both remotes’ fetches; not frontend-unit composition link.

### 56. 6cdaf6f 2025-07-15 (mf-dashboard/package.json); 6cdaf6f 2025-07-15 (mf-dashboard/vite.config.ts); fdf3ccb 2025-07-17 (mf-dashboard/package.json); fdf3ccb 2025-07-17 (mf-dashboard/vite.config.ts)

**Observation:** Historical point concerns unused `vite-plugin-federation` in `mf-dashboard`. Manifest read at `fdf3ccb` already declares both packages/unchanged afterward. Earlier configuration blobs unavailable in partial clone. Result in 3.4.8: `inconclusive`.

**Interpretation:** Uncertainty about past usage, replacement or abandonment does not change snapshot configured scoped plugin. History allows no intent attribution to unused declaration.

### 57. 6cdaf6f 2025-07-15 (mf-login/package.json); 6cdaf6f 2025-07-15 (mf-login/vite.config.ts)

**Observation:** Historical point concerns unused `vite-plugin-federation` in `mf-login`. Manifest read at `6cdaf6f` already declares both packages/unchanged afterward. Earlier configuration blobs unavailable in partial clone. Result in 3.4.8: `inconclusive`.

**Interpretation:** Uncertainty about past usage, replacement or abandonment does not change snapshot configured scoped plugin. History allows no intent attribution to unused declaration.

### 58. 6cdaf6f 2025-07-15 (mf-navbar/package.json); 6cdaf6f 2025-07-15 (mf-navbar/vite.config.ts)

**Observation:** Historical point concerns unused `vite-plugin-federation` in `mf-navbar`. Manifest read at `6cdaf6f` already declares both packages/unchanged afterward. Earlier configuration blobs unavailable in partial clone. Result in 3.4.8: `inconclusive`.

**Interpretation:** Uncertainty about past usage, replacement or abandonment does not change snapshot configured scoped plugin. History allows no intent attribution to unused declaration.

### 59. 6cdaf6f 2025-07-15 (mf-personagem-detalhe/package.json); 6cdaf6f 2025-07-15 (mf-personagem-detalhe/vite.config.ts); fdf3ccb 2025-07-17 (mf-personagem-detalhe/package.json); fdf3ccb 2025-07-17 (mf-personagem-detalhe/vite.config.ts)

**Observation:** Historical point concerns unused `vite-plugin-federation` in `mf-personagem-detalhe`. Manifest read at `fdf3ccb` already declares both packages/unchanged afterward. Earlier configuration blobs unavailable in partial clone. Result in 3.4.8: `inconclusive`.

**Interpretation:** Uncertainty about past usage, replacement or abandonment does not change snapshot configured scoped plugin. History allows no intent attribution to unused declaration.

### 60. 6cdaf6f 2025-07-15 (root-app/package.json); 6cdaf6f 2025-07-15 (root-app/vite.config.ts); fdf3ccb 2025-07-17 (root-app/package.json); fdf3ccb 2025-07-17 (root-app/vite.config.ts); 980d535 2025-07-17 (root-app/package.json); 980d535 2025-07-17 (root-app/vite.config.ts)

**Observation:** Historical point concerns unused `vite-plugin-federation` in `root-app`. Consulted earlier manifest/configuration versions unreadable. Earlier configuration blobs unavailable in partial clone. Result in 3.4.8: `inconclusive`.

**Interpretation:** Uncertainty about past usage, replacement or abandonment does not change snapshot configured scoped plugin. History allows no intent attribution to unused declaration.

### 61. 6cdaf6f 2025-07-15 (README.md); fdf3ccb 2025-07-17 (root-app/vite.config.ts); 980d535 2025-07-17 (root-app/vite.config.ts); 980d535 2025-07-17 (root-app/.env); 980d535 2025-07-17 (root-app/.env.local.bkp)

**Observation:** README enters in `6cdaf6f`, unchanged. Environment files enter in `980d535` with `IS_LOCAL=false`, `IS_LOCAL=true` in backup. Consulted earlier Vite configurations unavailable, preventing dating local/Pages selection/verifying earlier README-consistent stage. Result: `inconclusive`.

**Interpretation:** Remaining uncertainty historical: snapshot Pages-remote selection clear. Limit does not make current composition ambiguous.

### 62. 6cdaf6f 2025-07-15 (mf-login/package.json); 6cdaf6f 2025-07-15 (mf-navbar/package.json); fdf3ccb 2025-07-17 (root-app/src/pages/Sobre.tsx); fdf3ccb 2025-07-17 (mf-dashboard/package.json); fdf3ccb 2025-07-17 (mf-personagem-detalhe/package.json)

**Observation:** About page added in `fdf3ccb` already with React 18. Read dashboard/detail manifests then declare `^19.1.0`, as login/navbar since `6cdaf6f`. Historical host manifest unavailable. Result: `clarified`, limited to proven text/four-manifest coexistence.

**Interpretation:** Explains version divergence already at page creation; neither requires later migration nor proves React 18 never existed earlier. Does not support MFE composition interpretation.

## Classification

| # | Origin | Dimension | Type | Approach | Evidence | Strength | Relationships |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.2 (mf-dashboard/package.json:13) | 1 technology | manifest | module-federation | technological | weak | declares #11 |
| 2 | 3.4.2 (mf-dashboard/package.json:31) | 1 technology | manifest | module-federation | technological | weak | — |
| 3 | 3.4.2 (mf-login/package.json:20) | 1 technology | manifest | module-federation | technological | weak | declares #12 |
| 4 | 3.4.2 (mf-login/package.json:31) | 1 technology | manifest | module-federation | technological | weak | — |
| 5 | 3.4.2 (mf-navbar/package.json:20) | 1 technology | manifest | module-federation | technological | weak | declares #13 |
| 6 | 3.4.2 (mf-navbar/package.json:31) | 1 technology | manifest | module-federation | technological | weak | — |
| 7 | 3.4.2 (mf-personagem-detalhe/package.json:13) | 1 technology | manifest | module-federation | technological | weak | declares #14 |
| 8 | 3.4.2 (mf-personagem-detalhe/package.json:31) | 1 technology | manifest | module-federation | technological | weak | — |
| 9 | 3.4.2 (root-app/package.json:21) | 1 technology | manifest | module-federation | technological | weak | declares #15 |
| 10 | 3.4.2 (root-app/package.json:33) | 1 technology | manifest | module-federation | technological | weak | — |
| 11 | 3.4.2 (mf-dashboard/package.json:13; Evidence); 3.4.2 (mf-dashboard/package.json:31; Evidence); 3.4.3 (mf-dashboard; Markers); 3.4.3 (mf-dashboard; Build); 3.4.4 (root-app/src/App.tsx:7; Observation); 3.4.5 (#3; Configuration); 3.4.7 (#2; Evidence); 3.4.7 (#5; Evidence) | 2 configuration | configuration | module-federation | technological | moderate | configures #25; configures #32 |
| 12 | 3.4.2 (mf-login/package.json:20; Evidence); 3.4.2 (mf-login/package.json:31; Evidence); 3.4.3 (mf-login; Markers); 3.4.3 (mf-login; Build); 3.4.4 (root-app/src/App.tsx:6; Observation); 3.4.5 (#2; Configuration); 3.4.7 (#4; Evidence) | 2 configuration | configuration | module-federation | technological | moderate | configures #26; configures #31 |
| 13 | 3.4.2 (mf-navbar/package.json:20; Evidence); 3.4.2 (mf-navbar/package.json:31; Evidence); 3.4.3 (mf-navbar; Markers); 3.4.3 (mf-navbar; Build); 3.4.4 (root-app/src/App.tsx:5; Observation); 3.4.5 (#1; Configuration); 3.4.7 (#7; Evidence); 3.4.7 (#10; Evidence); 3.4.7 (#13; Evidence); 3.4.7 (#14; Evidence) | 2 configuration | configuration | module-federation | technological | moderate | configures #27; configures #30 |
| 14 | 3.4.2 (mf-personagem-detalhe/package.json:13; Evidence); 3.4.2 (mf-personagem-detalhe/package.json:31; Evidence); 3.4.3 (mf-personagem-detalhe; Markers); 3.4.3 (mf-personagem-detalhe; Build); 3.4.4 (root-app/src/App.tsx:8; Observation); 3.4.5 (#4; Configuration); 3.4.7 (#6; Evidence) | 2 configuration | configuration | module-federation | technological | moderate | configures #28; configures #33 |
| 15 | 3.4.2 (root-app/package.json:21; Evidence); 3.4.2 (root-app/package.json:33; Evidence); 3.4.3 (root-app; Markers); 3.4.3 (root-app; Build); 3.4.4 (root-app/src/App.tsx:5; Observation); 3.4.4 (root-app/src/App.tsx:6; Observation); 3.4.4 (root-app/src/App.tsx:7; Observation); 3.4.4 (root-app/src/App.tsx:8; Observation); 3.4.5 (#1; Configuration); 3.4.5 (#2; Configuration); 3.4.5 (#3; Configuration); 3.4.5 (#4; Configuration); 3.4.6 (#1; Where served); 3.4.6 (#2; Where served); 3.4.6 (#3; Where served); 3.4.6 (#4; Where served); 3.4.7 (#2; Evidence); 3.4.7 (#9; Evidence) | 2 configuration | configuration | module-federation | architectural | strong | configures #30; configures #31; configures #32; configures #33 |
| 16 | 3.4.4 (root-app/src/App.tsx:5) | 3 code | source code | module-federation | architectural | strong | implements #30 |
| 17 | 3.4.4 (root-app/src/App.tsx:6) | 3 code | source code | module-federation | architectural | strong | implements #31 |
| 18 | 3.4.4 (root-app/src/App.tsx:7) | 3 code | source code | module-federation | architectural | strong | implements #32 |
| 19 | 3.4.4 (root-app/src/App.tsx:8) | 3 code | source code | module-federation | architectural | strong | implements #33 |
| 20 | 3.4.4 (root-app/src/App.tsx:24) | 3 code | source code | module-federation | architectural | moderate | implements #33 |
| 21 | 3.4.4 (root-app/src/App.tsx:59) | 3 code | source code | module-federation | architectural | moderate | implements #30 |
| 22 | 3.4.4 (root-app/src/App.tsx:63) | 3 code | source code | module-federation | architectural | strong | implements #31; implements #32; implements #33 |
| 23 | 3.4.4 (root-app/src/App.tsx:67) | 3 code | source code | module-federation | architectural | strong | implements #31 |
| 24 | 3.4.4 (root-app/src/App.tsx:73) | 3 code | source code | module-federation | architectural | strong | implements #32 |
| 25 | 3.4.3 (mf-dashboard) | 4 structure | directory | — | architectural | moderate | — |
| 26 | 3.4.3 (mf-login) | 4 structure | directory | — | architectural | moderate | — |
| 27 | 3.4.3 (mf-navbar) | 4 structure | directory | — | architectural | moderate | — |
| 28 | 3.4.3 (mf-personagem-detalhe) | 4 structure | directory | — | architectural | moderate | — |
| 29 | 3.4.3 (root-app) | 4 structure | directory | — | architectural | moderate | — |
| 30 | 3.4.5 #1 | 5 composition | source code | module-federation | architectural | strong | links #29; links #27 |
| 31 | 3.4.5 #2 | 5 composition | source code | module-federation | architectural | strong | links #29; links #26 |
| 32 | 3.4.5 #3 | 5 composition | source code | module-federation | architectural | strong | links #29; links #25 |
| 33 | 3.4.5 #4 | 5 composition | source code | module-federation | architectural | strong | links #29; links #28 |
| 34 | 3.4.6 #1 | 6 build-deploy | CI | — | architectural | moderate | publishes #25 |
| 35 | 3.4.6 #2 | 6 build-deploy | CI | — | architectural | moderate | publishes #26 |
| 36 | 3.4.6 #3 | 6 build-deploy | CI | — | architectural | moderate | publishes #27 |
| 37 | 3.4.6 #4 | 6 build-deploy | CI | — | architectural | moderate | publishes #28 |
| 38 | 3.4.6 #5 | 6 build-deploy | CI | — | architectural | moderate | publishes #29 |
| 39 | 3.4.7 #1 | 7 documentation | comment | — | architectural | weak | corroborates #34; corroborates #35; corroborates #36; corroborates #37; corroborates #38 |
| 40 | 3.4.7 #2 | 7 documentation | documentation | module-federation | architectural | weak | corroborates #11; corroborates #15; corroborates #25; corroborates #26; corroborates #27; corroborates #28; corroborates #29; corroborates #30; corroborates #31; corroborates #32; corroborates #33 |
| 41 | 3.4.7 #3 | 7 documentation | documentation | — | architectural | weak | corroborates #30; corroborates #31; corroborates #32; corroborates #33 |
| 42 | 3.4.7 #4 | 7 documentation | documentation | — | architectural | weak | corroborates #26; corroborates #12; corroborates mf-login/src/App.tsx:10-33 |
| 43 | 3.4.7 #5 | 7 documentation | documentation | — | architectural | weak | corroborates #25; corroborates #11; corroborates #24 |
| 44 | 3.4.7 #6 | 7 documentation | documentation | — | architectural | weak | corroborates #28; corroborates #14; corroborates mf-personagem-detalhe/src/PersonagemDetalhe.tsx:22-53 |
| 45 | 3.4.7 #7 | 7 documentation | documentation | — | architectural | weak | corroborates #27; corroborates #13; corroborates mf-navbar/src/Navbar.tsx:58; corroborates mf-navbar/src/Navbar.tsx:111-125 |
| 46 | 3.4.7 #8 | 7 documentation | documentation | — | architectural | weak | corroborates #25; corroborates #26; corroborates #27; corroborates #28; corroborates #29; corroborates mf-dashboard/src/App.tsx:3-7; corroborates mf-navbar/src/App.tsx:4-20; corroborates mf-personagem-detalhe/src/App.tsx:1-7; corroborates mf-login/src/App.tsx:6-14 |
| 47 | 3.4.7 #9 | 7 documentation | documentation | — | architectural | weak | contradicts #15; contradicts root-app/.env:1 |
| 48 | 3.4.7 #10 | 7 documentation | documentation | module-federation | architectural | weak | corroborates #30; corroborates #13; corroborates #21 |
| 49 | 3.4.7 #11 | 7 documentation | documentation | — | architectural | weak | corroborates root-app/src/App.tsx:10-12; corroborates root-app/src/App.tsx:36-45; corroborates root-app/src/App.tsx:59-75; corroborates mf-login/src/LoginForm.tsx:20-23 |
| 50 | 3.4.7 #12 | 7 documentation | documentation | — | architectural | weak | corroborates #31; corroborates #23; corroborates mf-login/src/App.tsx:13-14 |
| 51 | 3.4.7 #13 | 7 documentation | comment | — | architectural | weak | corroborates #21; corroborates root-app/src/App.tsx:42-45; corroborates mf-navbar/src/Navbar.tsx:71 |
| 52 | 3.4.7 #14 | 7 documentation | comment | — | architectural | weak | corroborates #13; corroborates #16 |
| 53 | 3.4.7 #15 | 7 documentation | documentation | — | architectural | weak | corroborates #32; corroborates #33; corroborates mf-dashboard/src/Dashboard.tsx:95; corroborates root-app/src/App.tsx:20-28; corroborates root-app/src/App.tsx:73-84 |
| 54 | 3.4.7 #16 | 7 documentation | source code | — | context | weak | contradicts root-app/package.json:14-15; contradicts mf-dashboard/package.json:15-16; contradicts mf-login/package.json:14-15; contradicts mf-navbar/package.json:14-15; contradicts mf-personagem-detalhe/package.json:15-16 |
| 55 | 3.4.7 #17 | 7 documentation | source code | — | context | weak | corroborates mf-dashboard/src/Dashboard.tsx:17; corroborates mf-dashboard/src/Dashboard.tsx:47-59; corroborates mf-personagem-detalhe/src/PersonagemDetalhe.tsx:22; corroborates mf-personagem-detalhe/src/PersonagemDetalhe.tsx:35-53 |
| 56 | 3.4.8 #1 | 8 history | history | module-federation | technological | weak | explains #2; explains #1; explains #11 |
| 57 | 3.4.8 #2 | 8 history | history | module-federation | technological | weak | explains #4; explains #3; explains #12 |
| 58 | 3.4.8 #3 | 8 history | history | module-federation | technological | weak | explains #6; explains #5; explains #13 |
| 59 | 3.4.8 #4 | 8 history | history | module-federation | technological | weak | explains #8; explains #7; explains #14 |
| 60 | 3.4.8 #5 | 8 history | history | module-federation | technological | weak | explains #10; explains #9; explains #15 |
| 61 | 3.4.8 #6 | 8 history | history | module-federation | architectural | weak | explains #47; explains #15 |
| 62 | 3.4.8 #7 | 8 history | history | — | context | weak | explains #54 |

## Summary

Observations: 62. Dimensions (technology: 10, configuration: 5, code: 9, structure: 5, composition: 4, build-deploy: 5, documentation: 17, history: 7). Strength (strong: 12, moderate: 16, weak: 34, ambiguous: 0). Evidence (technological: 19, architectural: 40, context: 3).
