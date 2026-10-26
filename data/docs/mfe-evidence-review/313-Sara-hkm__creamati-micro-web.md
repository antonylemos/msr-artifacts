---
schema: 1
id: 1082058462
full_name: Sara-hkm/creamati-micro-web
commit: 541f8edc7615e399cbbf0fe3f1ae33abe14c4796
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

# 313 — Sara-hkm/creamati-micro-web

## Repository overview

Architectural chain starts in code without selected technology dependency in 3.4.2: container mounts iframe, selecting one of four URLs through active tab (#1). Five applications have own entries/builds (#3–#7); same iframe supports four active container relationships with analytics, data-grid, settings and user-management (#8–#11). Builds/publications separate per application despite same GitHub Pages site/branch (#12–#16). Root only coordinates commands (#2).

URL segment/publication target match resolves four targets to snapshot units per final reviews. Code URLs point to `olivium-dev` Pages while workflows publish to this repository Pages (#1, #8–#16); no availability or published-content identity verification. Section 3.5 preserves resolution/limits.

No configuration observations: workflow blocks cited in tables only build/publish applications; manifests only conventional CRA scripts/dependencies. Unit-composing URLs in container-executed code (#1) rather than runtime configuration.

Documentation confirms shell, navigation and execution/publication boundaries (#18–#25, #31), but misleading signals include Vercel (#17), other units (#27, #28, #32), Module Federation/MUI (#29, #42), shared modules/dependencies, authentication/lazy loading (#30, #33–#36, #40, #41). No-impact guarantees only partial (#37); running applications, rollback and scalability uncorroborated (#26, #38, #39). Claims remain weak semantic evidence including corroborated claims.

History explains outdated deployment documentation (#43) and proposed/present unit divergence (#44). Does not decide whether earlier submodule federation existed or merely intent (#45); past uncertainty does not alter snapshot iframe-composition reading.

## Observations

### 1. frontend/container/src/App.tsx:239-252; frontend/container/src/App.tsx:8-18; frontend/container/src/App.tsx:93; frontend/container/src/App.tsx:138; frontend/container/src/App.tsx:218; frontend/container/src/index.tsx:4-14; .github/workflows/deploy-all.yml:86-89; .github/workflows/deploy-all.yml:115-116

**Observation:** `App` mounted by entry maintains active tab and outside `home` renders `iframe`. Its `src` selects `olivium-dev.github.io/golden-sample-react-micro-web/` URLs ending in `user-management/`, `data-grid/`, `analytics/` or `settings/`. Segments match four application publication targets in workflow matrix.

**Interpretation:** Container composes four applications through remote documents at runtime with central navigation. Unit resolution follows path match recorded in 3.4; URL origin another account without site availability proof.

### 2. .; package.json:8-15; package.json:29

**Observation:** Root manifest chains commands in five `frontend/*` directories, declaring `concurrently`; no own root entry/build.

**Interpretation:** Root coordinates applications without constituting sixth frontend unit.

### 3. frontend/analytics-app; frontend/analytics-app/src/index.tsx:7-14; frontend/analytics-app/public/index.html:31; frontend/analytics-app/package.json:22

**Observation:** `frontend/analytics-app` has own manifest, entry mounting `<App />` in React root, HTML template with `div#root` and script `build` with `react-scripts build`.

**Interpretation:** Own entry/build confirm CRA frontend application boundary; alone establish no other-unit composition.

### 4. frontend/container; frontend/container/src/index.tsx:7-14; frontend/container/public/index.html:31; frontend/container/package.json:22

**Observation:** `frontend/container` has own manifest, entry mounting `<App />` in React root, HTML template with `div#root` and script `build` with `react-scripts build`.

**Interpretation:** Own entry/build confirm CRA frontend application boundary; alone establish no other-unit composition.

### 5. frontend/data-grid-app; frontend/data-grid-app/src/index.tsx:7-14; frontend/data-grid-app/public/index.html:31; frontend/data-grid-app/package.json:22

**Observation:** `frontend/data-grid-app` has own manifest, entry mounting `<App />` in React root, HTML template with `div#root` and script `build` with `react-scripts build`.

**Interpretation:** Own entry/build confirm CRA frontend application boundary; alone establish no other-unit composition.

### 6. frontend/settings-app; frontend/settings-app/src/index.tsx:7-14; frontend/settings-app/public/index.html:31; frontend/settings-app/package.json:22

**Observation:** `frontend/settings-app` has own manifest, entry mounting `<App />` in React root, HTML template with `div#root` and script `build` with `react-scripts build`.

**Interpretation:** Own entry/build confirm CRA frontend application boundary; alone establish no other-unit composition.

### 7. frontend/user-management-app; frontend/user-management-app/src/index.tsx:7-14; frontend/user-management-app/public/index.html:31; frontend/user-management-app/package.json:22

**Observation:** `frontend/user-management-app` has own manifest, entry mounting `<App />` in React root, HTML template with `div#root` and script `build` with `react-scripts build`.

**Interpretation:** Own entry/build confirm CRA frontend application boundary; alone establish no other-unit composition.

### 8. frontend/container/src/App.tsx:239; frontend/container/src/App.tsx:243; .github/workflows/deploy-all.yml:88; .github/workflows/deploy-all.yml:115-116; .github/workflows/deploy-analytics.yml:42-43

**Observation:** Container `iframe` chooses URL `https://olivium-dev.github.io/golden-sample-react-micro-web/analytics/`. Individual workflow publishes `frontend/analytics-app/build` at `analytics`; general matrix associates `analytics-app` with same target. Section 3.4.5 records In snapshot `Yes` and Active `Yes`.

**Interpretation:** Active relationship links `frontend/container` to `frontend/analytics-app` through iframe. Unit resolved through publication path per 3.4.5 although URL points to external account `olivium-dev`.

### 9. frontend/container/src/App.tsx:239; frontend/container/src/App.tsx:242; .github/workflows/deploy-all.yml:87; .github/workflows/deploy-all.yml:115-116; .github/workflows/deploy-data-grid.yml:42-43

**Observation:** Container `iframe` chooses URL `https://olivium-dev.github.io/golden-sample-react-micro-web/data-grid/`. Individual workflow publishes `frontend/data-grid-app/build` at `data-grid`; general matrix associates `data-grid-app` with same target. Section 3.4.5 records In snapshot `Yes` and Active `Yes`.

**Interpretation:** Active relationship links `frontend/container` to `frontend/data-grid-app` through iframe. Unit resolved through publication path per 3.4.5 although URL points to external account `olivium-dev`.

### 10. frontend/container/src/App.tsx:239; frontend/container/src/App.tsx:244; .github/workflows/deploy-all.yml:89; .github/workflows/deploy-all.yml:115-116; .github/workflows/deploy-settings.yml:42-43

**Observation:** Container `iframe` chooses URL `https://olivium-dev.github.io/golden-sample-react-micro-web/settings/`. Individual workflow publishes `frontend/settings-app/build` at `settings`; general matrix associates `settings-app` with same target. Section 3.4.5 records In snapshot `Yes` and Active `Yes`.

**Interpretation:** Active relationship links `frontend/container` to `frontend/settings-app` through iframe. Unit resolved through publication path per 3.4.5 although URL points to external account `olivium-dev`.

### 11. frontend/container/src/App.tsx:239; frontend/container/src/App.tsx:241; .github/workflows/deploy-all.yml:86; .github/workflows/deploy-all.yml:115-116; .github/workflows/deploy-user-management.yml:42-43

**Observation:** Container `iframe` chooses URL `https://olivium-dev.github.io/golden-sample-react-micro-web/user-management/`. Individual workflow publishes `frontend/user-management-app/build` at `user-management`; general matrix associates `user-management-app` with same target. Section 3.4.5 records In snapshot `Yes` and Active `Yes`.

**Interpretation:** Active relationship links `frontend/container` to `frontend/user-management-app` through iframe. Unit resolved through publication path per 3.4.5 although URL points to external account `olivium-dev`.

### 12. frontend/analytics-app/package.json:22; .github/workflows/deploy-analytics.yml:3-12; .github/workflows/deploy-analytics.yml:28-43; .github/workflows/deploy-all.yml:80-116

**Observation:** Script of `frontend/analytics-app` uses `react-scripts build`. Workflow installs/builds only application, publishing `frontend/analytics-app/build` at `analytics/` in GitHub Pages with `peaceiris/actions-gh-pages@v3`. General workflow has equivalent per-application publication conditional on `build-and-test`.

**Interpretation:** Build/deployment separate per application despite publications sharing Pages site/branch. Section 3.4.6 records Versioning `No`; no version used for publication. Boundaries support delivery autonomy without guaranteeing no inter-application impact.

### 13. frontend/container/package.json:22; .github/workflows/deploy-container.yml:3-12; .github/workflows/deploy-container.yml:28-44; .github/workflows/deploy-all.yml:49-78

**Observation:** Script of `frontend/container` uses `react-scripts build`. Workflow installs/builds only application, publishing `frontend/container/build` at `container/` in GitHub Pages with `peaceiris/actions-gh-pages@v3`. General workflow has equivalent per-application publication conditional on `build-and-test`. Individual workflow also declares `cname: micro-frontend-container.github.io`.

**Interpretation:** Build/deployment separate per application despite publications sharing Pages site/branch. Section 3.4.6 records Versioning `No`; no version used for publication. Boundaries support delivery autonomy without guaranteeing no inter-application impact.

### 14. frontend/data-grid-app/package.json:22; .github/workflows/deploy-data-grid.yml:3-12; .github/workflows/deploy-data-grid.yml:28-43; .github/workflows/deploy-all.yml:80-116

**Observation:** Script of `frontend/data-grid-app` uses `react-scripts build`. Workflow installs/builds only application, publishing `frontend/data-grid-app/build` at `data-grid/` in GitHub Pages with `peaceiris/actions-gh-pages@v3`. General workflow has equivalent per-application publication conditional on `build-and-test`.

**Interpretation:** Build/deployment separate per application despite publications sharing Pages site/branch. Section 3.4.6 records Versioning `No`; no version used for publication. Boundaries support delivery autonomy without guaranteeing no inter-application impact.

### 15. frontend/settings-app/package.json:22; .github/workflows/deploy-settings.yml:3-12; .github/workflows/deploy-settings.yml:28-43; .github/workflows/deploy-all.yml:80-116

**Observation:** Script of `frontend/settings-app` uses `react-scripts build`. Workflow installs/builds only application, publishing `frontend/settings-app/build` at `settings/` in GitHub Pages with `peaceiris/actions-gh-pages@v3`. General workflow has equivalent per-application publication conditional on `build-and-test`.

**Interpretation:** Build/deployment separate per application despite publications sharing Pages site/branch. Section 3.4.6 records Versioning `No`; no version used for publication. Boundaries support delivery autonomy without guaranteeing no inter-application impact.

### 16. frontend/user-management-app/package.json:22; .github/workflows/deploy-user-management.yml:3-12; .github/workflows/deploy-user-management.yml:28-43; .github/workflows/deploy-all.yml:80-116

**Observation:** Script of `frontend/user-management-app` uses `react-scripts build`. Workflow installs/builds only application, publishing `frontend/user-management-app/build` at `user-management/` in GitHub Pages with `peaceiris/actions-gh-pages@v3`. General workflow has equivalent per-application publication conditional on `build-and-test`.

**Interpretation:** Build/deployment separate per application despite publications sharing Pages site/branch. Section 3.4.6 records Versioning `No`; no version used for publication. Boundaries support delivery autonomy without guaranteeing no inter-application impact.

### 17. DEPLOYMENT.md:3

**Observation:** Guide claims workflows automatically deploy all microfrontends to Vercel.

**Interpretation:** Claim contradicted by GitHub Pages publications; documented target differs from configured target.

### 18. DEPLOYMENT.md:11-15

**Observation:** Guide enumerates Container App shell plus User Management, Data Grid, Analytics and Settings applications.

**Interpretation:** Enumeration corroborated by five frontend boundaries/container-integrated group.

### 19. DEPLOYMENT.md:48

**Observation:** Instruction requests iframe URL updates in `frontend/container/src/App.tsx` after deployment.

**Interpretation:** Instruction corroborated by four iframe relationships, identifying integration dependence on published addresses.

### 20. DEPLOYMENT.md:63-65

**Observation:** Guide describes push trigger for changes in application directory, building/deploying only changed microfrontend.

**Interpretation:** Claim corroborated by individual workflows without excluding general workflow possibly running on same push.

### 21. DEPLOYMENT.md:68-70

**Observation:** Guide describes general workflow triggered by main push/manually, building/testing/publishing all microfrontends.

**Interpretation:** Description corroborated by general workflow; each publication depends on five-application build/test job.

### 22. README.md:7

**Observation:** README describes container as main shell with header, footer and sidebar.

**Interpretation:** Shell role corroborated by container visual areas; phrase alone demonstrates no other-unit link.

### 23. README.md:8; README.md:18

**Observation:** README presents four independent microfrontends, saying each runs at own port.

**Interpretation:** Individual execution configuration corroborated by four applications/scripts/ports without demonstrating running servers.

### 24. README.md:20

**Observation:** README claims separation of responsibilities between applications.

**Interpretation:** Application boundaries/URL integration corroborate separation without attributing additional quality guarantee to word “clean”.

### 25. README.md:21

**Observation:** README claims navigation centralized in container.

**Interpretation:** Claim corroborated by tab state, menu handlers and container URL selection.

### 26. STATUS.md:5-10

**Observation:** Status announces all five applications running, listing localhost addresses at ports 3000 to 3004.

**Interpretation:** Section 3.4.7 records uncorroborated: scripts/ports do not prove processes active. Operational availability merely declared.

### 27. implementation-plan-mui-microservices.md:28-46

**Observation:** Proposed tree includes container, user-management, data-grid, analytics and settings in frontend plus shared-ui-lib, backend and docker.

**Interpretation:** Partial corroboration: five applications exist, other proposed components not present implementation in snapshot.

### 28. implementation-plan.md:17-21

**Observation:** Plan describes container, auth-app, dashboard-app, profile-app and optional ui-lib.

**Interpretation:** Unit division contradicted by current structure containing other four applications beyond container. Tree proposed rather than confirmed execution.

### 29. micro-web-golden-sample.md:3

**Observation:** Guide presents golden sample with React/Webpack Module Federation.

**Interpretation:** Module Federation attribution contradicted by actual iframe composition; React presence does not confirm federation.

### 30. micro-web-golden-sample.md:26

**Observation:** Guide includes shared state among global shell functions.

**Interpretation:** Property contradicted: container state controls tab/menu; frames receive URL, style/title without inter-application state sharing.

### 31. micro-web-golden-sample.md:27

**Observation:** Guide says container dynamically loads/integrates remote applications.

**Interpretation:** As runtime remote-page loading, claim corroborated by iframe relationships without implying federated modules.

### 32. micro-web-golden-sample.md:30

**Observation:** Guide presents remotes as autonomous React projects, exemplifying auth-app, dashboard-app and profile-app.

**Interpretation:** Claim contradicted by absent unit identities although existing applications have own boundaries.

### 33. micro-web-golden-sample.md:31

**Observation:** Guide says each remote exposes specific pages/components.

**Interpretation:** Described exposure contradicted: applications mount own pages; container embeds URL documents without consuming exposed component interface.

### 34. micro-web-golden-sample.md:34

**Observation:** Guide claims React/ReactDOM sharing to minimize bundle duplication.

**Interpretation:** Claim contradicted by separate CRA builds; same dependencies establish no shared inter-frame runtime.

### 35. micro-web-golden-sample.md:95

**Observation:** Guide describes container orchestrator dynamically retrieving remote modules.

**Interpretation:** Module-loading attribution contradicted by iframe document loading; local web-vitals dynamic import does not integrate units.

### 36. micro-web-golden-sample.md:180-184

**Observation:** Guide says production container fetches auth/dashboard/profile CDN URLs ending remoteEntry.js.

**Interpretation:** Claim contradicted by document URLs in olivium-dev Pages and different application names; address availability unverified.

### 37. micro-web-golden-sample.md:187

**Observation:** Guide claims teams deploy without affecting others.

**Interpretation:** Partial corroboration: per-application publication but common site/branch and general workflow depends on five-application build/test; artifacts guarantee no absence of impact.

### 38. micro-web-golden-sample.md:188

**Observation:** Guide claims independent versioning/rollback.

**Interpretation:** Uncorroborated in 3.4.7: no demonstrated independent version/reversion mechanism; Versioning No for five applications.

### 39. micro-web-golden-sample.md:189

**Observation:** Guide announces per-application horizontal scalability.

**Interpretation:** Uncorroborated: static Pages publication demonstrates neither per-unit scalability policy nor measurement.

### 40. micro-web-golden-sample.md:199

**Observation:** After recommending global container authentication, guide claims remotes consume tokens through context/API calls.

**Interpretation:** Consumption claim contradicted: container transmits no tokens, user-management static page without inter-unit authentication communication.

### 41. micro-web-golden-sample.md:225

**Observation:** Completed deliverables list announces container with routing/lazy loading.

**Interpretation:** Claim contradicted in guide’s sense of router/on-demand module/route loading: code switches state/iframe URL without mechanism.

### 42. package.json:4

**Observation:** Description field announces microfrontend architecture with React, Webpack Module Federation and Material-UI.

**Interpretation:** Claim contradicted: CRA applications compose through iframe without MUI. Description misleading composition technology signal.

### 43. 81f06d6 2025-09-21 (DEPLOYMENT.md, .github/workflows/); c6d475b 2025-09-21 (.github/workflows/); 5148e21 2025-09-21 (.github/workflows/); 1f789f7 2025-09-21 (.github/workflows/)

**Observation:** Section 3.4.8 records DEPLOYMENT.md created with workflows in 81f06d6, unchanged afterward. Message of c6d475b announces replacing Vercel with Pages; 5148e21/1f789f7 also change workflows. Old workflow blobs locally unavailable.

**Interpretation:** Point clarified through different stages: documentation retained while workflows changed. Replacement announced through messages rather than confirmed by old-version reading.

### 44. 4f941bb 2025-09-21 (implementation-plan.md, implementation-plan-mui-microservices.md, micro-web-golden-sample.md, frontend/); 541f8ed 2025-09-22 (frontend/)

**Observation:** Section 3.4.8 records plans/guide with unchanged content since 4f941bb. Tree has five current names since commit, initially gitlinks without local content; 541f8ed replaces gitlinks with files. No tree commit contains auth-app, dashboard-app, profile-app, shared library, backend or docker.

**Interpretation:** Point clarified within local history: document-proposed division absent from tree, current names predate recreation. Old submodule contents/period before first commit unknown.

### 45. 4f941bb 2025-09-21 (micro-web-golden-sample.md, package.json, .cursor/templates/, frontend/); 541f8ed 2025-09-22 (frontend/container/src/App.tsx, frontend/)

**Observation:** Section 3.4.8 records guide, root description and templates present since 4f941bb, unchanged afterward. Iframe enters in 541f8ed, whose message announces Pages-URL embedding. Five application contents before recreation unavailable: external submodules absent from clone.

**Interpretation:** Historical result inconclusive between earlier submodule federation and never-implemented intent. Uncertainty restricted to past; snapshot iframe composition determined, hence weak strength.

## Classification

| # | Origin | Dimension | Type | Approach | Evidence | Strength | Relationships |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.4 (frontend/container/src/App.tsx:239) | 3 code | source code | iframe | architectural | strong | implements #8; implements #9; implements #10; implements #11 |
| 2 | 3.4.3 (.) | 4 structure | directory | — | context | weak | — |
| 3 | 3.4.3 (frontend/analytics-app) | 4 structure | directory | — | architectural | moderate | — |
| 4 | 3.4.3 (frontend/container) | 4 structure | directory | — | architectural | moderate | — |
| 5 | 3.4.3 (frontend/data-grid-app) | 4 structure | directory | — | architectural | moderate | — |
| 6 | 3.4.3 (frontend/settings-app) | 4 structure | directory | — | architectural | moderate | — |
| 7 | 3.4.3 (frontend/user-management-app) | 4 structure | directory | — | architectural | moderate | — |
| 8 | 3.4.5 #1 | 5 composition | source code | iframe | architectural | strong | links #4; links #3 |
| 9 | 3.4.5 #2 | 5 composition | source code | iframe | architectural | strong | links #4; links #5 |
| 10 | 3.4.5 #3 | 5 composition | source code | iframe | architectural | strong | links #4; links #6 |
| 11 | 3.4.5 #4 | 5 composition | source code | iframe | architectural | strong | links #4; links #7 |
| 12 | 3.4.6 #1 | 6 build-deploy | CI | — | architectural | moderate | publishes #3 |
| 13 | 3.4.6 #2 | 6 build-deploy | CI | — | architectural | moderate | publishes #4 |
| 14 | 3.4.6 #3 | 6 build-deploy | CI | — | architectural | moderate | publishes #5 |
| 15 | 3.4.6 #4 | 6 build-deploy | CI | — | architectural | moderate | publishes #6 |
| 16 | 3.4.6 #5 | 6 build-deploy | CI | — | architectural | moderate | publishes #7 |
| 17 | 3.4.7 #1 | 7 documentation | documentation | — | architectural | weak | contradicts #12; contradicts #13; contradicts #14; contradicts #15; contradicts #16 |
| 18 | 3.4.7 #2 | 7 documentation | documentation | — | architectural | weak | corroborates #3; corroborates #4; corroborates #5; corroborates #6; corroborates #7 |
| 19 | 3.4.7 #3 | 7 documentation | documentation | iframe | architectural | weak | corroborates #8; corroborates #9; corroborates #10; corroborates #11 |
| 20 | 3.4.7 #4 | 7 documentation | documentation | — | architectural | weak | corroborates #12; corroborates #13; corroborates #14; corroborates #15; corroborates #16 |
| 21 | 3.4.7 #5 | 7 documentation | documentation | — | architectural | weak | corroborates #12; corroborates #13; corroborates #14; corroborates #15; corroborates #16 |
| 22 | 3.4.7 #6 | 7 documentation | documentation | — | architectural | weak | corroborates frontend/container/src/App.tsx:29-30; corroborates frontend/container/src/App.tsx:80-81; corroborates frontend/container/src/App.tsx:131-132; corroborates frontend/container/src/App.tsx:259-260 |
| 23 | 3.4.7 #7 | 7 documentation | documentation | — | architectural | weak | corroborates #3; corroborates #5; corroborates #6; corroborates #7; corroborates package.json:8-12; corroborates frontend/analytics-app/.env:1 |
| 24 | 3.4.7 #8 | 7 documentation | documentation | — | architectural | weak | corroborates #1; corroborates #3; corroborates #4; corroborates #5; corroborates #6; corroborates #7 |
| 25 | 3.4.7 #9 | 7 documentation | documentation | — | architectural | weak | corroborates #1 |
| 26 | 3.4.7 #10 | 7 documentation | documentation | — | architectural | weak | — |
| 27 | 3.4.7 #11 | 7 documentation | documentation | — | architectural | weak | partially corroborates #3; partially corroborates #4; partially corroborates #5; partially corroborates #6; partially corroborates #7 |
| 28 | 3.4.7 #12 | 7 documentation | documentation | — | architectural | weak | contradicts #3; contradicts #4; contradicts #5; contradicts #6; contradicts #7 |
| 29 | 3.4.7 #13 | 7 documentation | documentation | module-federation | technological | weak | contradicts #1; contradicts #8; contradicts #9; contradicts #10; contradicts #11 |
| 30 | 3.4.7 #14 | 7 documentation | documentation | — | architectural | weak | contradicts frontend/container/src/App.tsx:5-10; contradicts #1 |
| 31 | 3.4.7 #15 | 7 documentation | documentation | — | architectural | weak | corroborates #8; corroborates #9; corroborates #10; corroborates #11 |
| 32 | 3.4.7 #16 | 7 documentation | documentation | — | architectural | weak | contradicts #3; contradicts #5; contradicts #6; contradicts #7 |
| 33 | 3.4.7 #17 | 7 documentation | documentation | — | architectural | weak | contradicts #1; contradicts frontend/analytics-app/src/App.tsx:4-36; contradicts frontend/analytics-app/src/index.tsx:4-14 |
| 34 | 3.4.7 #18 | 7 documentation | documentation | — | architectural | weak | contradicts #12; contradicts #13; contradicts #14; contradicts #15; contradicts #16; contradicts frontend/container/package.json:14-22; contradicts frontend/analytics-app/package.json:14-22 |
| 35 | 3.4.7 #19 | 7 documentation | documentation | — | architectural | weak | contradicts #1; contradicts frontend/container/src/reportWebVitals.ts:3-11 |
| 36 | 3.4.7 #20 | 7 documentation | documentation | module-federation | architectural | weak | contradicts #1; contradicts #8; contradicts #9; contradicts #10; contradicts #11 |
| 37 | 3.4.7 #21 | 7 documentation | documentation | — | architectural | weak | partially corroborates #12; partially corroborates #13; partially corroborates #14; partially corroborates #15; partially corroborates #16 |
| 38 | 3.4.7 #22 | 7 documentation | documentation | — | architectural | weak | — |
| 39 | 3.4.7 #23 | 7 documentation | documentation | — | architectural | weak | — |
| 40 | 3.4.7 #24 | 7 documentation | documentation | — | architectural | weak | contradicts frontend/container/src/App.tsx:5-10; contradicts #1; contradicts frontend/user-management-app/src/App.tsx:4-36 |
| 41 | 3.4.7 #25 | 7 documentation | documentation | — | architectural | weak | contradicts #1 |
| 42 | 3.4.7 #26 | 7 documentation | comment | module-federation | technological | weak | contradicts #1; contradicts frontend/container/package.json:5-18; contradicts frontend/analytics-app/package.json:5-18; contradicts frontend/container/src/App.tsx:1-2 |
| 43 | 3.4.8 #1 | 8 history | history | — | architectural | weak | explains #17 |
| 44 | 3.4.8 #2 | 8 history | history | — | architectural | weak | explains #27; explains #28; explains #32 |
| 45 | 3.4.8 #3 | 8 history | history | — | architectural | weak | explains #29; explains #30; explains #33; explains #34; explains #35; explains #36; explains #37; explains #40; explains #41; explains #42 |

## Summary

Observations: 45. Dimensions (technology: 0, configuration: 0, code: 1, structure: 6, composition: 4, build-deploy: 5, documentation: 26, history: 3). Strength (strong: 5, moderate: 10, weak: 30, ambiguous: 0). Evidence (technological: 2, architectural: 42, context: 1).

