---
schema: 1
id: 1082058462
full_name: Sara-hkm/creamati-micro-web
commit: 541f8edc7615e399cbbf0fe3f1ae33abe14c4796
inputs:
  mining:
    output: data/mining/mfe-mining-001
    version: "1"
    config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 313 — Sara-hkm/creamati-micro-web

## Repository overview

All eleven inventory documents were read. Six authored English texts: README.md, DEPLOYMENT.md, STATUS.md, implementation-plan-mui-microservices.md, implementation-plan.md and micro-web-golden-sample.md. Five `frontend/<app>/README.md` files are the same complete Create React App template (each:1-46); they explain single-application scripts/build without claims about architecture between units. All five reviews 3.4.2–3.4.6 are `final`, sharing classification/acquisition commit `541f8edc7615e399cbbf0fe3f1ae33abe14c4796`.

README.md:3, 7-21 describes current implementation: React shell and four autonomous applications composed through iframe. STATUS.md:15-59 reaffirms this reading and announces the next phase. DEPLOYMENT.md:3 describes Vercel workflows, but actual workflows publish separate builds to Pages (.github/workflows/deploy-all.yml:73-78, 111-116). Guide micro-web-golden-sample.md:23-36, 95, 172, 223-235 mixes federated architecture description with supposedly completed deliverables. This diverges from observed iframe (frontend/container/src/App.tsx:239-252). Frames originate from `olivium-dev` Pages, while snapshot workflows publish to the current repository’s Pages; composition review resolves destinations through the same subdirectories (3.4.5 #1–4), without proving this account’s deployment is live.

Both plans list work to perform: implementation-plan.md:3, 10-22, 47-57, 79-83, 106-110, 130-134, 144-176, 199-219 and implementation-plan-mui-microservices.md:3, 9-46, 48-99, 108-112, 138-141, 165-168, 197-200, 292-354. They propose Module Federation, shared library/state, another initial unit set, MUI and backend integration. They do not prove implementation. Directory trees enter the table as structural documentation per this stage’s instructions. Command/configuration/source blocks remain examples: README.md:25-38, 42-54; DEPLOYMENT.md:21-28, 50-58, 86-106; implementation-plan-mui-microservices.md:52-57, 77-82, 226-247, 255-273, 282-288, 324-348, 399-423; micro-web-golden-sample.md:69-93, 102-125, 137-160, 168-170. They are not active build/composition artifacts.

`doc-*` occurrences without separate rows, beyond repetitions identified in Observations:

- README.md:1 and STATUS.md:1, 27 are titles; README.md:53 is a command-block instruction. STATUS.md:31 describes appearance (color themes) without an architectural property. README.md:58 is future improvement and STATUS.md:57 announces preparation, without claiming Module Federation already exists.
- DEPLOYMENT.md:52 is illustrative code and :110 recommends allowing iframe, not effective configuration. :113 recommends monitoring without composition property. :9 instructs creating Vercel projects, contextualized with claim :3.
- implementation-plan-mui-microservices.md:1, 9, 90, 106, 136, 163, 195 are titles. :3, 91-92, 111, 140, 167, 199 and 362 are future federation goals/tasks/tests. :452 concludes the plan’s purpose without reporting execution. Backend integrations proposed at :126-130, 153-157, 220-310 are absent from current static frontend; internal details and backend-only relationships are excluded from table.
- implementation-plan.md:1, 46, 78, 105, 129 are titles. :3 introduces the plan; :47, 79, 106, 130 are federation tasks; :92, 176 recommend authentication/state; :208, 229, 269-271, 274 are unchecked tasks or validation criteria; specifically :270 is a future container remote-loading criterion rather than implementation report. :287 recommends deployment order rather than reporting performed order. :295-298 are resource links rather than project claims.
- micro-web-golden-sample.md:1, 29, 211 are titles; :4 states guide purpose. :11 introduces micro-frontend conceptual context without claiming a project property. :14-17 defines microservices/micro-frontends and general goals; :36 is a service-mesh autonomy analogy repeating container connection rather than another deployed infrastructure. :45-46 describes multi-repository alternative and :49-52 monorepo tools/workspaces alternative, without choosing one for snapshot. :73, 106 are configuration instructions. :196, 202-207 recommend shared library/state and optimizations rather than reporting existence. :213-219 describes unused Single-SPA alternative. :240 recommends future evolution. Unit examples :30 and deliverables list :225-228, unlike these recommendations, claim golden sample properties and are evaluated in table or Observations repetitions.

Descriptive fields/comments were also read in review-cited artifacts: root `package.json` and five `frontend/<app>/package.json`; six `.github/workflows/deploy-*.yml`; `frontend/container/src/App.tsx`; four `frontend/<app>-app/src/App.tsx`; five `frontend/<app>/src/index.tsx` entries, five `.env`, five `frontend/<app>/public/index.html` and `frontend/<app>/src/reportWebVitals.ts`, identical across units. Also checked `.cursor/templates/webpack.config.template.js` and `.cursor/templates/RemoteComponent.template.tsx`: comments describe placeholder templates rather than active snapshot integration, as 3.4.4 (Notes) already records. Unit manifests lack `description`; workflows have job/step names without additional architectural comments. Container comments label visual areas (frontend/container/src/App.tsx:29, 80, 131, 259); entry/HTML comments are standard CRA (e.g. frontend/container/src/index.tsx:16-18; frontend/container/public/index.html:13-41). Root description is evaluated in final row. UI texts claiming individual execution repeat README.md:18, and Pages announcements (e.g. frontend/analytics-app/src/App.tsx:27; frontend/container/src/App.tsx:229, 276) match workflows. No application, installation, build, published-address access or history reading was performed.

## Claims

| # | Document | Claim | Theme | Corroboration | Evidence |
|---|---|---|---|---|---|
| 1 | DEPLOYMENT.md:3 | "This project includes GitHub Actions workflows for automatic deployment of all micro-frontends to Vercel." | build-deploy | contradicted | 3.4.6 #1–5; .github/workflows/deploy-all.yml:73-78, 111-116 |
| 2 | DEPLOYMENT.md:11-15 | "Container App - Main application shell; User Management; Data Grid; Analytics; Settings" | structure | corroborated | 3.4.3 (five units Yes); frontend/container/src/App.tsx:12-18, 239-245 |
| 3 | DEPLOYMENT.md:48 | "update the iframe URLs in `frontend/container/src/App.tsx`" | composition | corroborated | 3.4.5 #1–4; frontend/container/src/App.tsx:239-252 |
| 4 | DEPLOYMENT.md:63-65 | "Push to main branch with changes in specific app directory […] Builds and deploys only the changed micro-frontend" | build-deploy | corroborated | 3.4.6 #1–5; .github/workflows/deploy-analytics.yml:3-12, 28-43 |
| 5 | DEPLOYMENT.md:68-70 | "Push to main branch or manual trigger […] Builds, tests, and deploys all micro-frontends" | build-deploy | corroborated | 3.4.6 #1–5; .github/workflows/deploy-all.yml:3-6, 25-47, 49-116 |
| 6 | README.md:7 | "Container App: Main shell with header, footer, and side menu" | structure | corroborated | frontend/container/src/App.tsx:29-30, 80-81, 131-132, 259-260 |
| 7 | README.md:8, 18 | "4 Independent Micro-Frontends […] Each micro-frontend runs independently on its own port" | independence | corroborated | 3.4.3 (four units besides container); frontend/analytics-app/package.json:21; frontend/analytics-app/.env:1; package.json:8-12 |
| 8 | README.md:20 | "Clean separation of concerns between applications" | structure | corroborated | 3.4.3 (five units Yes); 3.4.4 (Notes); frontend/container/src/App.tsx:239-252; frontend/analytics-app/src/index.tsx:4, 7-14 |
| 9 | README.md:21 | "Centralized navigation in the container app" | composition | corroborated | frontend/container/src/App.tsx:8-18, 90-93, 155-158, 239-245 |
| 10 | STATUS.md:5-10 | "All Applications Running" | independence | uncorroborated | — |
| 11 | implementation-plan-mui-microservices.md:28-46 | "Create monorepo structure […] /frontend […] /shared-ui-lib […] /backend […] /docker" | structure | partial | 3.4.3 (Units); package.json:8-14 |
| 12 | implementation-plan.md:17-21 | "/container # Main host application; /auth-app # Authentication micro-frontend; /dashboard-app # Dashboard micro-frontend; /profile-app # Profile micro-frontend; /ui-lib # Shared design system (optional)" | structure | contradicted | 3.4.3 (Units); package.json:8-12; frontend/container/src/App.tsx:12-18 |
| 13 | micro-web-golden-sample.md:3 | "golden sample project for micro-web architecture using React + Webpack Module Federation" | composition | contradicted | 3.4.2 (no technology dependencies); 3.4.5 #1–4; frontend/container/src/App.tsx:239-252; frontend/container/package.json:14-22 |
| 14 | micro-web-golden-sample.md:26 | "shared state" (in the global shell) | composition | contradicted | frontend/container/src/App.tsx:5-10, 239-252; 3.4.4 (Notes) |
| 15 | micro-web-golden-sample.md:27 | "Loads and integrates remote applications dynamically." | composition | corroborated | 3.4.5 #1–4; frontend/container/src/App.tsx:138, 218, 239-252 |
| 16 | micro-web-golden-sample.md:30 | "Each is a standalone React project (e.g., auth-app, dashboard-app, profile-app)." | structure | contradicted | 3.4.3 (Units); frontend/analytics-app/package.json:14-22; package.json:8-12 |
| 17 | micro-web-golden-sample.md:31 | "Each exposes specific pages or components." | composition | contradicted | 3.4.4 (Notes); frontend/analytics-app/src/App.tsx:4-36; frontend/analytics-app/src/index.tsx:4, 7-14; frontend/container/src/App.tsx:239-252 |
| 18 | micro-web-golden-sample.md:34 | "Common dependencies like React and ReactDOM are shared to minimize bundle duplication." | composition | contradicted | frontend/container/package.json:14-22; frontend/analytics-app/package.json:14-22; .github/workflows/deploy-all.yml:33-39; 3.4.6 #1–5 |
| 19 | micro-web-golden-sample.md:95 | "The container acts as the orchestrator, dynamically pulling in remote modules." | composition | contradicted | 3.4.5 #1–4; frontend/container/src/App.tsx:239-252; frontend/container/src/reportWebVitals.ts:3-11 |
| 20 | micro-web-golden-sample.md:184 | "The container fetches remote apps from these URLs in production." | composition | contradicted | frontend/container/src/App.tsx:241-244; .github/workflows/deploy-all.yml:86-89, 111-116 |
| 21 | micro-web-golden-sample.md:187 | "Teams deploy without impacting others." | build-deploy | partial | 3.4.6 #1–5; .github/workflows/deploy-analytics.yml:28-43; .github/workflows/deploy-all.yml:49-116 |
| 22 | micro-web-golden-sample.md:188 | "Versioning and rollback are independent." | build-deploy | uncorroborated | — |
| 23 | micro-web-golden-sample.md:189 | "Horizontal scaling per app." | build-deploy | uncorroborated | — |
| 24 | micro-web-golden-sample.md:199 | "Keep global auth logic in the container. Remotes consume tokens through context or API calls." | composition | contradicted | frontend/container/src/App.tsx:5-10, 239-252; frontend/user-management-app/src/App.tsx:4-36; 3.4.4 (Notes) |
| 25 | micro-web-golden-sample.md:225 | "Container app with routing and lazy loading" | composition | contradicted | frontend/container/src/App.tsx:1-18, 138, 218, 239-252; 3.4.4 (Notes) |
| 26 | package.json:4 | "Golden sample project demonstrating micro-frontend architecture using React + Webpack Module Federation + Material-UI" | composition | contradicted | frontend/container/package.json:5-18; frontend/analytics-app/package.json:5-18; frontend/container/src/App.tsx:1-2, 239-252; 3.4.2 |

## Observations

**1. DEPLOYMENT.md:3.** Automatic workflows exist for five applications, but publish to GitHub Pages through `peaceiris/actions-gh-pages`, rather than Vercel. Creating five Vercel projects (:9), secrets (:21-28) and example addresses (:74-80) are proposed deployment instructions rather than present configurations. Netlify/Pages examples (:84-106) are also configuration blocks rather than new deployment reports.

**2. DEPLOYMENT.md:11-15.** All five enumerated units exist. List recurs at README.md:7-12 and STATUS.md:6-10, 44-45. Four container destinations match four applications and workflow subdirectories (3.4.5 #1–4). Relationship is shell/embedded applications; list does not prove federation.

**3. DEPLOYMENT.md:48.** Guidance correctly assumes integration depends on container code’s iframe URLs. They are fixed at `olivium-dev.github.io/golden-sample-react-micro-web/`, with four paths (:241-244). README.md:3, 19 and STATUS.md:17, 29, 39 repeat iframe integration. Illustrative DEPLOYMENT.md:50-58 object is not actual code and produces no other row. DEPLOYMENT.md:110 recommends allowing embedding without claiming implemented CORS configuration.

**4. DEPLOYMENT.md:63-65.** Each individual workflow filters its application paths and builds/publishes only its respective build. Pull request also triggers it; text describes one trigger without claiming exclusivity. Deployment independence repeats at DEPLOYMENT.md:117 and micro-web-golden-sample.md:178, 228. General workflow can also run on the same push; thus this row describes individual workflows without guaranteeing no other application publishes on that event.

**5. DEPLOYMENT.md:68-70.** General workflow installs, builds and tests five applications. Then one job publishes container and a matrix publishes four micro-frontends, all to Pages. Publication depends on build/test job (:50, 81).

**6. README.md:7.** Shell contains header, side menu, main area and footer. STATUS.md:15-18, 44, 47, 75 and micro-web-golden-sample.md:25-26 repeat shell role; shared state mentioned in the latter is addressed separately because corroboration differs.

**7. README.md:8, 18.** Each micro-frontend has its own React entry, `start` script and port: user-management 3001, data-grid 3002, analytics 3003 and settings 3004 (respective `frontend/<app>/.env:1`). STATUS.md:28, 45-46, 56 repeats execution autonomy; texts at `frontend/analytics-app/src/App.tsx:23`, `frontend/data-grid-app/src/App.tsx:23`, `frontend/settings-app/src/App.tsx:23` and `frontend/user-management-app/src/App.tsx:23` also announce it. This proves individual execution configuration without claiming servers were run in this review.

**8. README.md:20.** Units have own manifests/entries, and container integrates pages by URL. Source-code review records four applications as pages without composition or communication between frames. Architectural boundary is verifiable; qualitative “clean” adds no quality guarantee.

**9. README.md:21.** Container maintains active tab, handles menu/card clicks and selects iframe URL. README.md:14 and STATUS.md:16, 30, 38, 55 repeat inter-unit navigation. This changes tab/URL without React Router or remote component imports.

**10. STATUS.md:5-10.** List presents five localhost addresses as active; STATUS.md:3, 53-56, 75 reinforces functioning report. Scripts/ports support individual execution possibility (previous claim), but snapshot records neither processes nor availability verification at that time. Claimed actual functioning remains uncorroborated.

**11. implementation-plan-mui-microservices.md:28-46.** Proposed tree includes exactly five existing applications in `frontend/`, plus shared library, backend, Docker and documentation. Application directories are confirmed; other tree components have no implemented counterpart in this snapshot. This proposes expansion rather than evidencing the entire stack already exists. Overview (:9-21) describes target React/MUI/federation and FastAPI rather than code state.

**12. implementation-plan.md:17-21.** Old plan’s annotated tree names host, auth, dashboard and profile. Snapshot has container, user-management, data-grid, analytics and settings under `frontend/`, a different unit division; home-tab dashboard is internal to container. micro-web-golden-sample.md:54-62, 129, 226, 238 revisits the same auth/dashboard/profile proposal. Contradiction is between documented structure and snapshot without turning plan into completed-work declaration.

**13. micro-web-golden-sample.md:3.** Guide presents itself as explaining React architecture with Module Federation and concludes at :235 that golden sample demonstrates this technology. React is confirmed; actual composition is iframe in CRA applications. No active federation exists. README.md:58 treating it as future improvement and STATUS.md:57 announcing integration preparation reinforce guide/code difference.

**14. micro-web-golden-sample.md:26.** Navigation/layout exist as in shell claim. “shared state” is unconfirmed: container’s two states are active tab and menu opening, while iframe receives only URL, style and title. Applications consume no host state. Shared-state property is separated from corroborated shell because its corroboration differs.

**15. micro-web-golden-sample.md:27.** Without specifying modules/federation here, sentence describes container behavior: selects application at runtime by tab and integrates it in iframe. Broad “remote applications” meaning matches remote pages. Specific module mechanism cited later receives separate evaluation.

**16. micro-web-golden-sample.md:30.** Autonomous React project property holds for four actual applications, but examples name other units absent from snapshot. Indivisible sentence receives contradicted judgment for incorrect identification, while present application independence is already recorded at README.md:8, 18.

**17. micro-web-golden-sample.md:31.** Guide attributes a page/component exposure interface to remotes. Each application mounts its own App on a page, and host embeds that page by URL. Application `export default App` is used locally by its entry, not exposed to a federated consumer. Specific `auth/AuthPage` sentence at :127 is an instance of proposed exposure without corresponding implementation.

**18. micro-web-golden-sample.md:34.** React/ReactDOM appear in application manifests but are packaged by separate CRA builds. Same dependencies implement neither inter-unit sharing nor bundle deduplication; iframe isolation provides no common React runtime. :227 repeats “Shared React + optional UI lib”; library remains optional and unimplemented.

**19. micro-web-golden-sample.md:95.** Container orchestrates selection but loads iframe documents rather than modules. :172 specifies dynamic `remoteEntry.js` fetching, also absent. Webpack/federated import examples (:75-93, 108-125, 137-160) are guide code blocks without additional rows. CRA dynamic import only loads `web-vitals` locally.

**20. micro-web-golden-sample.md:184.** “These URLs” refers to auth/dashboard/profile CDN addresses with `remoteEntry.js` at :180-182. Code points to HTML documents on `olivium-dev` Pages, at user-management/data-grid/analytics/settings paths. Workflows publish these subdirectories to repository Pages. Address availability was not checked; contradiction concerns configured URLs and resource type.

**21. micro-web-golden-sample.md:187.** Per-application builds/publications exist, but all use one Pages site/branch, and general workflow conditions publication on all five applications’ test/build. Artifacts confirm publication separation rather than broad no-impact guarantee for other teams/applications.

**22. micro-web-golden-sample.md:188.** No independent versioning/rollback mechanism is demonstrated. Review 3.4.6 records versioning No for five applications: private version `0.1.0` does not participate in publication. This documents no external versioning/reversion policy; guide guarantee is unverifiable in snapshot.

**23. micro-web-golden-sample.md:189.** Guide lists horizontal scalability as benefit. Workflows describe static Pages publication without per-application scaling policy/artifact. No record confirms or measures this property.

**24. micro-web-golden-sample.md:199.** Recommendation to keep authentication in host does not prove implementation; second sentence, however, claims remote token consumption. Host transmits no tokens and user-management is a static page. No inter-unit context or API call exists, per source-code review.

**25. micro-web-golden-sample.md:225.** In deliverables marked completed, guide claims routing/lazy loading. Local state navigation and iframe URL selection exist, but neither router nor module/route lazy loading as in guide example. Conditional frame mounting does not implement described federated loading.

**26. package.json:4.** Description adds Material-UI to federation claim. Five application manifests lack MUI and container uses inline-styled HTML elements; four pages also use local HTML/CSS. Federation reference repeats guide, but additionally named UI mechanism changes verifiable property. `keywords` (:17-24) are isolated mentions without another row. README.md:59 treats MUI as future improvement.

## Summary

Claims: 26 (corroborated: 9, partial: 2, contradicted: 12, uncorroborated: 3). Themes: (structure: 6, composition: 12, build-deploy: 6, independence: 2).
