---
schema: 1
id: 1015183048
full_name: harshad-eden/module-federation
commit: dde74e678a749ccbf3951e173bf980649034c5d4
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

# 202 — harshad-eden/module-federation

## Repository overview

Documentation is extensive, entirely English, in six root Markdown files, all `documentation` in `artifacts.csv`:

- `ARCHITECTURE_DOCUMENTATION.md`: architecture overview, directory tree, host/remote roles, benefits, production deployment, patterns;
- `DEPLOYMENT_GUIDE.md`: Vercel publishing guide;
- `NAVIGATION_AND_EMBEDDING.md`: shell navigation and standalone mode;
- `README.md`: presentation, installation, execution, development guide;
- `TODO.md`: future improvements;
- `context.md`: application-by-application description.

All present insurance platform using React/Vite micro-frontends joined by Module Federation in monorepo. Texts repeat extensively, most claims reducing to host/remotes, runtime loading, shared packages, independent development/deployment.

For snapshot contents, `ARCHITECTURE_DOCUMENTATION.md` and `NAVIGATION_AND_EMBEDDING.md` match previous reviews: shell and three remotes (`sales-portal`, `underwriter-portal`, `product-config`), each exposing `./App`, loaded by route inside `ErrorBoundary`/`Suspense` (3.4.5 #1-#3). `README.md` and `context.md` describe six applications, including absent `employer-portal` and `service-provider` (claim 32). Material differences are this list, shared-session login (claim 29), implemented by no unit, and `shared-types`, used by only one unit (claim 11).

Independent deployment lacks artifacts. Build and deployment review records `separate` build, `not observed` deployment for four applications (3.4.6), document production addresses absent from configuration.

`DEPLOYMENT_GUIDE.md` is mostly prescriptive. Proposes three Vercel strategies (DEPLOYMENT_GUIDE.md:35-46, 161-214, 221-247), remote URL environment variables (DEPLOYMENT_GUIDE.md:49-65, 257-268), "Required" code changes (DEPLOYMENT_GUIDE.md:67-122), checklist (DEPLOYMENT_GUIDE.md:316-337). None applied:
- No `vercel.json`;
- Remote URLs remain fixed `localhost` (apps/shell/vite.config.ts:11-13);
- No `build:prod` script (package.json:10-32).

Plan/instructions rather than description, guide yields no rows except claim 25; DEPLOYMENT_GUIDE.md:5 repeats claims 1 and 2. Plans also include absent applications (DEPLOYMENT_GUIDE.md:44, 46, 117, 119, 140, 142, 185-198). Same applies to README "Production Deployment" (README.md:398-415), "Future Enhancements" (ARCHITECTURE_DOCUMENTATION.md:256-264), context.md:389-407 roadmap.

`TODO.md` entirely unfinished items (`- [ ]`). No current-state claims, but confirms JWT authentication and "Token sharing across microfrontends" unfinished (TODO.md:8-13).

Excluded from table:
- Configuration/source reproductions:
  - ARCHITECTURE_DOCUMENTATION.md:94-104, NAVIGATION_AND_EMBEDDING.md:47-57: remotes at `http://localhost:300N/remoteEntry.js`, while configuration uses `/dist/assets/remoteEntry.js` (apps/shell/vite.config.ts:11-13);
  - ARCHITECTURE_DOCUMENTATION.md:116-126, NAVIGATION_AND_EMBEDDING.md:60-70, README.md:255-265, context.md:350-360: remote configuration using `./src/App` rather than `./src/App.tsx` as in apps/sales-portal/vite.config.ts:12;
  - README.md:268-276: remote at `/assets/remoteEntry.js`;
  - context.md:48-57, 336-348: five remotes including `employerPortal`/`serviceProvider` at `/assets/remoteEntry.js`, shell declaring three (apps/shell/vite.config.ts:10-14);
  - NAVIGATION_AND_EMBEDDING.md:76-89, 95-102, 128-142, 148-154: reproduce with minor differences apps/sales-portal/src/App.tsx:11-18, apps/sales-portal/src/components/Dashboard.tsx:12-14, apps/shell/src/components/SalesPortal.tsx:4-28, 69-86;
- Installation, execution, build, troubleshooting commands: ARCHITECTURE_DOCUMENTATION.md:214-226; README.md:36-59, 113-132, 136-148, 290-340, 361-383, 387-396, 425-440; context.md:248-272; DEPLOYMENT_GUIDE.md:126-143, 348-370;
  - "Development Deployment" (README.md:387-396) serves each `dist` at port root, where `remoteEntry.js` lacks shell-sought `/dist/assets/` path (apps/shell/vite.config.ts:11-13);
  - README.md:309-312 ("Ensure all required applications are running") describes fixed-URL effect;
- Ports: ARCHITECTURE_DOCUMENTATION.md:90, 228-232; NAVIGATION_AND_EMBEDDING.md:31, 37. Development-server details matching apps/*/vite.config.ts and apps/*/package.json:6;
- Generic benefits without verifiable unit properties:
  - "Scalable team organization" (ARCHITECTURE_DOCUMENTATION.md:15), "Easier cross-application refactoring" (:23);
  - "Centralized configuration and tooling" (:22): each application has own `vite.config.ts`, `tailwind.config.js`, `tsconfig.json`; root only centralizes scripts/lockfile;
  - Scalability/teams (:178-181; NAVIGATION_AND_EMBEDDING.md:168);
  - "Hot module replacement for all apps" (:190), "Distributed architecture" (:244);
  - Monitoring (NAVIGATION_AND_EMBEDDING.md:171, 192-195; DEPLOYMENT_GUIDE.md:343);
  - Recommended team structures (README.md:348-359; context.md:274-283), also including absent applications;
- UI/tool stack: React, TypeScript, React Router, Tailwind, shadcn/ui, Radix, ESLint, PostCSS (ARCHITECTURE_DOCUMENTATION.md:156-169; README.md:278-288; context.md:232-242), except Vite, federation plugin, Concurrently (claims 16 and 17). Table versions match manifests (e.g.: apps/shell/package.json:11, 13, 22-25), no `package.json` has ESLint;
- Business, features, fictional data: README.md:159-196; context.md:31-181, 362-374; NAVIGATION_AND_EMBEDDING.md:158-161, except repeated claims. Includes obsolete "components planned" note (context.md:100), since apps/underwriter-portal/src/components/RiskAssessments.tsx and PendingApprovals.tsx exist;
- Appearance/security: context.md:200-205, 409-423;
- Generic technology challenges DEPLOYMENT_GUIDE.md:9-17, 22. Snapshot remote URLs indeed fixed at build (apps/shell/vite.config.ts:11-13), remote CORS only development server (apps/sales-portal/vite.config.ts:25-31);
- References to `ARCHITECTURE.md` (README.md:107, 344, 422, 446; context.md:380), absent file; actual document `ARCHITECTURE_DOCUMENTATION.md`;
- Text `# module-federation` appended to README (README.md:447).

`doc-*` occurrences:
- `ARCHITECTURE_DOCUMENTATION.md`:
  - Table: 5 (claims 1 and 2); 12 (3 and 4); 14 (6); 29, 30, 42, 45, 53, 56, 67 (8); 108 (12); 132 (13); 153 (16); 175 (18); 207 (20); 253 (24);
  - Repetitions: 11 repeats 1; 131, 239, 242 repeat 6; 133, 206 repeat 4; 238 repeats 3 and 4; 270, 273 repeat 3; 271 repeats 6 and 4;
  - Titles: 9, 85, 130, 151, 195 (claim 19 section), 205, 236, 241;
- `DEPLOYMENT_GUIDE.md`:
  - 5 repeats 1 and 2; 10 generic challenge, repeats 6;
  - Plans/instructions above: 15, 30, 37, 69, 288, 330, 335, 341 ("Always deploy remotes before the shell"), 343;
  - 1, 9, 372 title/subtitle/closing;
- `NAVIGATION_AND_EMBEDDING.md`:
  - Table: 14, 22 (26);
  - Repetitions: 5 repeats 15; 38 repeats 9; 40 repeats 9 and 14; 165 repeats 3; 166 repeats 4; 182 in claim 31 diagram; 199 repeats 15, 29, 6;
  - Code-block title: 44; monitoring above: 171, 193, 194;
- `README.md`:
  - Table: 7 (32); 248 (35);
  - Repetitions: 3 repeats 1, 3, 4; 7 also repeats 1, 3, 4; 73, 83, 267 repeat 8; 164 repeats 8 and 6; 254 repeats 12; 285 repeats 16; 444 repeats 1;
  - Titles: 1, 227, 252; instructions: 244, 365; troubleshooting: 309, 332;
- `TODO.md`: 3 introduction; 10, 24, 90 future items (10 cited in claim 29);
- `context.md`:
  - 5 repeats 1 and 2; 10 repeats 32; 26, 297, 307 repeat 8; 29 repeats 3 and 4; 39 repeats 8 and 6; 45, 450 repeat 24; 63, 444 repeat 14; 239 repeats 16; 427 repeats 6, 23, 4; 446, 456 repeat 3;
  - Titles: 25, 333, 442; code-block title: 47.

Artifacts cited by previous reviews were read: five root/application `package.json` files, both packages' manifests, `pnpm-workspace.yaml`, four `vite.config.ts`, `index.html`, `main.tsx`, apps/shell/src/App.tsx, shell components (`Layout`, `Dashboard`, `SalesPortal`, `UnderwriterPortal`, `ProductConfig`), apps/shell/src/types/remotes.d.ts, remote `App.tsx` files. None has architectural comments; sole comment concerns interface (apps/shell/src/components/Dashboard.tsx:32). Only root has `description`, "Module Federation Insurance Platform" (package.json:4), matching README title (README.md:1).

## Claims

| # | Document | Claim | Theme | Corroboration | Evidence |
|---|---|---|---|---|---|
| 1 | ARCHITECTURE_DOCUMENTATION.md:5 | "This project implements a **Micro-Frontend Architecture** using **Module Federation** within a **Monorepo** structure." | structure | corroborated | 3.4.2 (module-federation configured in four applications); 3.4.3 (four units `Yes`; Workspace); 3.4.5 #1-#3 |
| 2 | ARCHITECTURE_DOCUMENTATION.md:5 | "multiple independent applications work together as a unified system" | independence | partial | 3.4.3 (Own Entry and Build in four units); 3.4.6 (Deploy `not observed`: 4); apps/shell/vite.config.ts:10-14 |
| 3 | ARCHITECTURE_DOCUMENTATION.md:12 | "Independent development [...] of features" | independence | corroborated | 3.4.3 (Manifest, Entry and Build per unit); package.json:12-15; apps/sales-portal/package.json:6; apps/sales-portal/src/main.tsx:7-13 |
| 4 | ARCHITECTURE_DOCUMENTATION.md:12 | "Independent [...] deployment of features" | build-deploy | partial | 3.4.6 (Build `separate`: 4; Deploy `not observed`: 4); package.json:19-22 |
| 5 | ARCHITECTURE_DOCUMENTATION.md:13 | "Technology diversity across teams" | independence | uncorroborated | — |
| 6 | ARCHITECTURE_DOCUMENTATION.md:14 | "Runtime composition of applications" | composition | corroborated | 3.4.4 (dynamic-loading: 3; runtime-composition: 3); 3.4.5 #1-#3 |
| 7 | ARCHITECTURE_DOCUMENTATION.md:19-20 | "The project uses a monorepo pattern with workspace management: - Single repository containing multiple related applications" | structure | corroborated | 3.4.3 (Workspace); pnpm-workspace.yaml:1-3; package.json:6-9 |
| 8 | ARCHITECTURE_DOCUMENTATION.md:29-74 | Tree: "apps/ # Micro-frontend applications", "shell/ # Host application (Module Federation Host)", "SalesPortal.tsx # Remote wrapper for Sales" [...], "sales-portal/ # Sales micro-frontend (Remote)", "underwriter-portal/ # Underwriting micro-frontend (Remote)", "product-config/ # Product configuration micro-frontend (Remote)" | structure | corroborated | 3.4.3 (four units `Yes`); 3.4.4 (apps/shell/src/components/SalesPortal.tsx:5; apps/shell/src/components/UnderwriterPortal.tsx:5; apps/shell/src/components/ProductConfig.tsx:5); 3.4.5 #1-#3 |
| 9 | ARCHITECTURE_DOCUMENTATION.md:52 | "main.tsx # Standalone entry point" (remote runs independently) | independence | corroborated | 3.4.3 (apps/sales-portal/index.html:10-11; apps/sales-portal/src/main.tsx:7-13); apps/sales-portal/package.json:6; apps/sales-portal/src/App.tsx:12-14 |
| 10 | ARCHITECTURE_DOCUMENTATION.md:76-77 | "packages/ # Shared libraries" / "shared-ui/ # Common UI components" | structure | corroborated | 3.4.3 (packages/shared-ui `No`); apps/shell/src/components/Dashboard.tsx:3; apps/sales-portal/src/App.tsx:3; apps/underwriter-portal/src/App.tsx:3; apps/product-config/src/App.tsx:3 |
| 11 | ARCHITECTURE_DOCUMENTATION.md:78 | "shared-types/ # Shared TypeScript types" | structure | contradicted | apps/sales-portal/src/components/QuotesList.tsx:3; apps/sales-portal/src/components/PoliciesList.tsx:3; apps/shell/package.json:16 |
| 12 | ARCHITECTURE_DOCUMENTATION.md:108-114 | "Each portal acts as a **Module Federation Remote**" / "Sales Portal \| 3001 \| Remote \| `./App` component" [...] | composition | corroborated | 3.4.5 #1-#3; apps/sales-portal/vite.config.ts:8-13; apps/underwriter-portal/vite.config.ts:8-13; apps/product-config/vite.config.ts:8-13 |
| 13 | ARCHITECTURE_DOCUMENTATION.md:132 | "No build-time dependencies between micro-frontends" | build-deploy | corroborated | 3.4.6 (Build `separate`: 4); package.json:18; apps/shell/package.json:10-28 |
| 14 | ARCHITECTURE_DOCUMENTATION.md:136-138 | "Each remote module wrapped in error boundaries" / "Graceful degradation when remotes fail to load" / "Fallback UI with links to standalone applications" | composition | corroborated | 3.4.4 (runtime-composition: SalesPortal.tsx:84, UnderwriterPortal.tsx:75, ProductConfig.tsx:75); apps/shell/src/components/SalesPortal.tsx:4-28, 53-60, 69-86 |
| 15 | ARCHITECTURE_DOCUMENTATION.md:141-143 | "Shell app provides consistent navigation" / "Each portal maintains its own internal routing" / "Seamless transitions between applications" | composition | corroborated | 3.4.5 (Repository overview); apps/shell/src/components/Layout.tsx:8-13, 30-48, 54; apps/shell/src/main.tsx:9-11; apps/sales-portal/src/App.tsx:11-18 |
| 16 | ARCHITECTURE_DOCUMENTATION.md:152-153 | "**Vite**: Build tool and dev server" / "**@originjs/vite-plugin-federation**: Module Federation implementation for Vite" | composition | corroborated | 3.4.2 (four rows `@originjs/vite-plugin-federation`, `Yes`); 3.4.3 (Build column) |
| 17 | ARCHITECTURE_DOCUMENTATION.md:167 | "**Concurrently**: Run multiple dev servers" | other | corroborated | package.json:11, 34 |
| 18 | ARCHITECTURE_DOCUMENTATION.md:175 | "Independent release cycles" | independence | uncorroborated | — |
| 19 | ARCHITECTURE_DOCUMENTATION.md:197-203 | Diagram: "Production Environment: ├── shell.insurance-platform.com # Host application ├── sales.insurance-platform.com # Sales portal [...]" | build-deploy | uncorroborated | — |
| 20 | ARCHITECTURE_DOCUMENTATION.md:207 | "Module Federation loads remotes from their respective domains" | composition | partial | 3.4.5 #1-#3; apps/shell/vite.config.ts:11-13 |
| 21 | ARCHITECTURE_DOCUMENTATION.md:208-209 | "Rollback capabilities per application" / "Blue-green deployments possible" | build-deploy | uncorroborated | — |
| 22 | ARCHITECTURE_DOCUMENTATION.md:237 | "Decomposition by business domain" | structure | corroborated | 3.4.3 (four units `Yes`); apps/shell/src/components/Dashboard.tsx:6-28 |
| 23 | ARCHITECTURE_DOCUMENTATION.md:243 | "Shared dependencies optimization" (Module Federation Pattern) | composition | corroborated | apps/shell/vite.config.ts:15; apps/sales-portal/vite.config.ts:14; apps/underwriter-portal/vite.config.ts:14; apps/product-config/vite.config.ts:14 |
| 24 | ARCHITECTURE_DOCUMENTATION.md:253 | "Route-based micro-frontend loading" | composition | corroborated | 3.4.4 (host-relationship, apps/shell/src/App.tsx:12); apps/shell/src/App.tsx:14-16; apps/shell/src/components/SalesPortal.tsx:4-5 |
| 25 | DEPLOYMENT_GUIDE.md:20-21 | "Shared packages must be built before individual applications" / "Applications have interdependencies that affect build order" | build-deploy | corroborated | 3.4.6 (Repository overview); package.json:16-18; packages/shared-types/package.json:5; packages/shared-ui/package.json:5 |
| 26 | NAVIGATION_AND_EMBEDDING.md:12-16 | "Shell app renders `<SalesPortal />` component" / "Module Federation dynamically imports the Sales app from `http://localhost:3001/remoteEntry.js`" / "Sales app renders WITHIN the shell - no page reload, no redirect" | composition | contradicted | apps/shell/vite.config.ts:11; 3.4.5 #2; apps/shell/src/components/SalesPortal.tsx:5, 84; apps/shell/src/App.tsx:14 |
| 27 | NAVIGATION_AND_EMBEDDING.md:74 | "Each portal supports **dual routing** for both modes" | composition | corroborated | 3.4.5 #2, #3 (Observations); apps/sales-portal/src/App.tsx:12-17; apps/underwriter-portal/src/App.tsx:12-17; apps/product-config/src/App.tsx:10-11 |
| 28 | NAVIGATION_AND_EMBEDDING.md:93 | "Internal navigation adapts based on context" | composition | corroborated | apps/sales-portal/src/components/Dashboard.tsx:12-14, 79, 84; apps/underwriter-portal/src/components/Dashboard.tsx:12-14, 73, 78 |
| 29 | NAVIGATION_AND_EMBEDDING.md:108-111 | "User logs in to Shell App" / "User stays logged in for ALL portals (shared session)" / "No additional logins required for individual portals" | composition | contradicted | apps/shell/src/App.tsx:11-18; apps/shell/src/main.tsx:7-13; TODO.md:8-13 |
| 30 | NAVIGATION_AND_EMBEDDING.md:173 | "**Performance Isolation**: Poor performance in one portal doesn't affect others" | independence | uncorroborated | — |
| 31 | NAVIGATION_AND_EMBEDDING.md:179-185 | Diagram: "Production URLs: ├── app.insurance.com # Shell app ├── sales.insurance.com # Sales portal (for Module Federation) [...]" | build-deploy | uncorroborated | — |
| 32 | README.md:7 | "each business domain (Sales, Underwriting, Employer Services, Product Configuration, and Service Provider) operates as an independent application" | structure | contradicted | 3.4.3 (four units: apps/shell, apps/sales-portal, apps/underwriter-portal, apps/product-config); 3.4.5 (Repository overview); apps/shell/vite.config.ts:10-14 |
| 33 | README.md:119-120 | "This starts all 6 applications simultaneously: - Shell (3000), Sales (3001), Underwriter (3002), Employer (3003), Product (3004), Service (3005)" | other | contradicted | package.json:11 |
| 34 | README.md:150-156 | "Build individual applications: [...] cd apps/sales-portal && npm run build [...] Preview production build" | build-deploy | corroborated | 3.4.6 #2 (Build `separate`); apps/sales-portal/package.json:7-8 |
| 35 | README.md:247-250 | "Add to shell application: - Add remote reference in `apps/shell/vite.config.ts` - Add route in `apps/shell/src/App.tsx` - Add navigation item in `apps/shell/src/components/Layout.tsx`" (new remote requires shell changes) | independence | corroborated | 3.4.5 #1-#3; apps/shell/vite.config.ts:10-14; apps/shell/src/App.tsx:14-16; apps/shell/src/components/Layout.tsx:8-13 |

## Observations

**1. ARCHITECTURE_DOCUMENTATION.md:5.** Four applications in pnpm workspace (pnpm-workspace.yaml:1-3), linked through `@originjs/vite-plugin-federation`: host and three remotes (3.4.5 #1-#3). Same claim restated in DEPLOYMENT_GUIDE.md:5, README.md:3, 7, 444, context.md:5, opening list ARCHITECTURE_DOCUMENTATION.md:11.

**2. ARCHITECTURE_DOCUMENTATION.md:5.** Each application has own manifest/entry/build, can run independently (claim 9). Independence does not fully hold:
- Deployment lacks artifact (claim 4);
- Shell only works with remotes served at fixed configured addresses (apps/shell/vite.config.ts:10-14);
- Four depend on same workspace packages built beforehand (claim 25).

Repeated by DEPLOYMENT_GUIDE.md:5, context.md:5.

**3. ARCHITECTURE_DOCUMENTATION.md:12.** Each has own development server, started by separate root script (package.json:12-15; apps/sales-portal/package.json:6), remotes mounting own React trees (apps/sales-portal/src/main.tsx:7-13). Sentence split because deployment receives different judgment (claim 4). Repetitions:
- ARCHITECTURE_DOCUMENTATION.md:174, 238, 270, 273, on teams;
- NAVIGATION_AND_EMBEDDING.md:165;
- README.md:3, 7 ("developed, tested");
- context.md:29, 446, 456.

Team organization itself lacks artifact.

**4. ARCHITECTURE_DOCUMENTATION.md:12.** Separate application builds (package.json:19-22; 3.4.6 #1-#4). Deployment `not observed` for four: no workflow, Dockerfile, `vercel.json`; sole address local server (3.4.6, Repository overview). Remote URLs fixed at shell build (apps/shell/vite.config.ts:11-13) limit changing remote without host rebuild. Repetitions:
- ARCHITECTURE_DOCUMENTATION.md:133, 206, 238, 271;
- NAVIGATION_AND_EMBEDDING.md:166;
- README.md:3, 7;
- context.md:29, 427.

Vercel strategies DEPLOYMENT_GUIDE.md:35-247 are plans per Repository overview.

**5. ARCHITECTURE_DOCUMENTATION.md:13.** Says architecture allows different technologies per team. Repeated by ARCHITECTURE_DOCUMENTATION.md:176 ("within React ecosystem"), NAVIGATION_AND_EMBEDDING.md:167 ("Each portal can use different React versions, state management, etc."). Four applications use same React, React Router, Vite versions (e.g.: apps/shell/package.json:11-13, 23; apps/sales-portal/package.json:11-13, 22), sharing `react`, `react-dom`, `react-router-dom` through federation (claim 23). Neither confirms nor refutes possibility.

**6. ARCHITECTURE_DOCUMENTATION.md:14.** Shell loads each remote through `React.lazy` over federated module, `remoteEntry.js` fetched in browser (3.4.4; apps/shell/src/components/SalesPortal.tsx:4-5). Repetitions:
- ARCHITECTURE_DOCUMENTATION.md:131, 239, 242, 271;
- DEPLOYMENT_GUIDE.md:10;
- NAVIGATION_AND_EMBEDDING.md:199;
- README.md:164;
- context.md:39, 427.

**7. ARCHITECTURE_DOCUMENTATION.md:19-20.** Pnpm workspace spans `apps/*`/`packages/*` (pnpm-workspace.yaml:1-3), same patterns in `workspaces` (package.json:6-9), sole root lockfile. Repetitions: ARCHITECTURE_DOCUMENTATION.md:246-249, 269; context.md:429. "Shared dependencies and build tools" (ARCHITECTURE_DOCUMENTATION.md:21) is sharing in claims 10 and 11.

**8. ARCHITECTURE_DOCUMENTATION.md:29-74.** Tree matches snapshot:
- Four directories in `apps/`;
- Shell host without `exposes` (apps/shell/vite.config.ts:8-16);
- Three remotes;
- Three shell loading wrappers (apps/shell/src/components/SalesPortal.tsx:4-5; UnderwriterPortal.tsx:4-5; ProductConfig.tsx:4-5);
- `remotes.d.ts` (apps/shell/src/types/remotes.d.ts:1-14).

Host/remote roles repeat:
- ARCHITECTURE_DOCUMENTATION.md:89-92;
- Trees README.md:66, 73, 83; context.md:297, 307;
- README.md:164, 267;
- context.md:26, 35-40.

README and context.md lists add absent applications, claim 32.

**9. ARCHITECTURE_DOCUMENTATION.md:52.** Comment only in sales-portal, but three remotes have own `index.html`/`main.tsx`, mounting `BrowserRouter` (3.4.3, Entry column; apps/sales-portal/src/main.tsx:7-13). Also unprefixed routes for execution outside shell (apps/sales-portal/src/App.tsx:12-14). Repetitions: "Dual Access Modes" (ARCHITECTURE_DOCUMENTATION.md:145-147), "Standalone Mode" (NAVIGATION_AND_EMBEDDING.md:36-40). Shell "Open … in New Tab" links target servers (claim 14).

**10. ARCHITECTURE_DOCUMENTATION.md:76-77.** Four units use `@insurance/shared-ui`. Shell in Dashboard/CSS (apps/shell/src/components/Dashboard.tsx:3; apps/shell/src/index.css:1), remotes in components (e.g.: apps/sales-portal/src/App.tsx:3). Repetitions:
- ARCHITECTURE_DOCUMENTATION.md:163, 191;
- README.md:23;
- context.md:185-208, 431, 438.

Package is no unit (3.4.3).

**11. ARCHITECTURE_DOCUMENTATION.md:78.** Four applications declare `@insurance/shared-types` (e.g.: apps/shell/package.json:16), only sales-portal importing (apps/sales-portal/src/components/QuotesList.tsx:3; apps/sales-portal/src/components/PoliciesList.tsx:3). Dependency declaration insufficient for sharing; snapshot serves sole unit. Repeated by README.md:24 ("TypeScript definitions for all applications"), context.md:212-230, 439. "Shared libraries" (ARCHITECTURE_DOCUMENTATION.md:76) holds for `shared-ui` (claim 10).

**12. ARCHITECTURE_DOCUMENTATION.md:108-114.** Three remotes declare `filename: "remoteEntry.js"`, exposing `./App` from `./src/App.tsx` (apps/sales-portal/vite.config.ts:9-12 and equivalents). Shell imports `<remote>/App` (3.4.5 #1-#3). Table ports match (e.g.: apps/sales-portal/vite.config.ts:26). Repetitions: README.md:254, context.md:27.

**13. ARCHITECTURE_DOCUMENTATION.md:132.** No application depends on another in `package.json`: shell only depends on libraries/two workspace packages (apps/shell/package.json:10-28). `build:apps` runs four in parallel (package.json:18). Shell resolves remotes only at runtime through URL (apps/shell/vite.config.ts:10-14). Existing build dependency concerns shared packages (claim 25), not between micro-frontends.

**14. ARCHITECTURE_DOCUMENTATION.md:136-138.** Each wrapper renders remote inside `ErrorBoundary`/`Suspense` (apps/shell/src/components/SalesPortal.tsx:69-86; UnderwriterPortal.tsx:62-77; ProductConfig.tsx:62-77). Import failure `.catch` shows local component (apps/shell/src/components/SalesPortal.tsx:4-28). Both error screens link remote server (apps/shell/src/components/SalesPortal.tsx:17, 54; UnderwriterPortal.tsx:16, 47; ProductConfig.tsx:16, 47). Repetitions: NAVIGATION_AND_EMBEDDING.md:40, 124-154 (partly code blocks), context.md:63, 444.

**15. ARCHITECTURE_DOCUMENTATION.md:141-143.** Shell wraps all routes in own `Layout`, navigation bar with `Link` (apps/shell/src/components/Layout.tsx:8-13, 30-48, 54). Remotes declare internal routes using shell `BrowserRouter` (apps/shell/src/main.tsx:9-11; apps/sales-portal/src/App.tsx:11-18), so portal switching is client navigation without page reload. Repetitions:
- ARCHITECTURE_DOCUMENTATION.md:184-186, 252;
- NAVIGATION_AND_EMBEDDING.md:3-5, 30-34, 116-119, 160, 199;
- README.md:162, 165;
- context.md:38-40, 43.

**16. ARCHITECTURE_DOCUMENTATION.md:152-153.** Four applications configure Vite plugin `@originjs/vite-plugin-federation` (3.4.2). Version `^1.3.5` assigned to "Module Federation" by README.md:285 and context.md:239 is plugin version (apps/shell/package.json:24). Additional repetitions: context.md:5, 428 ("Vite over Webpack").

**17. ARCHITECTURE_DOCUMENTATION.md:167.** Root `dev` uses `concurrently` to start four development servers (package.json:11, 34). Six-application count is claim 33.

**18. ARCHITECTURE_DOCUMENTATION.md:175.** No release records. Four application versions `1.0.0`, used by no publication (3.4.6, Independent versioning: 0); neither confirms nor refutes independent evolution.

**19. ARCHITECTURE_DOCUMENTATION.md:197-203.** Production domains absent from configuration. Remote URLs `localhost` (apps/shell/vite.config.ts:11-13), no deployment artifact (3.4.6). Domains also differ from NAVIGATION_AND_EMBEDDING.md:179-185 (claim 31), DEPLOYMENT_GUIDE.md:41-46.

**20. ARCHITECTURE_DOCUMENTATION.md:207.** Shell fetches remote from own origin: ports 3001, 3002, 3004 (apps/shell/vite.config.ts:11-13), each served by corresponding application (3.4.5 #1-#3). Sentence refers to production domains in claim 19; this portion lacks artifact.

**21. ARCHITECTURE_DOCUMENTATION.md:208-209.** No pipeline/hosting configuration (3.4.6). Repeated by NAVIGATION_AND_EMBEDDING.md:172 ("Selective Rollbacks"). DEPLOYMENT_GUIDE.md:344 recommendation.

**22. ARCHITECTURE_DOCUMENTATION.md:237.** Each remote corresponds to platform area: sales, underwriting, product configuration. Shell Dashboard presents three accordingly (apps/shell/src/components/Dashboard.tsx:6-28). Repetitions: context.md:430, 437. Two additional README.md:7 areas are claim 32.

**23. ARCHITECTURE_DOCUMENTATION.md:243.** Four federation configurations share `react`, `react-dom`, `react-router-dom` (apps/shell/vite.config.ts:15 and equivalents), without `singleton`/version. Repetitions: context.md:28, 427, 443.

**24. ARCHITECTURE_DOCUMENTATION.md:253.** Remote loads only when prefix route rendered (apps/shell/src/App.tsx:14-16), `lazy` inside wrapper (apps/shell/src/components/SalesPortal.tsx:4-5). Repetitions:
- NAVIGATION_AND_EMBEDDING.md:162, 174;
- context.md:45, 450.

context.md:45 assigns `lazy` to `App.tsx`, but in wrappers.

**25. DEPLOYMENT_GUIDE.md:20-21.** Root `build` builds `shared-types`/`shared-ui` first, then applications (package.json:16-18). Packages publish `dist/index.js` (packages/shared-types/package.json:5; packages/shared-ui/package.json:5), consumed by applications. "interdependencies" are with packages, as guide explains (DEPLOYMENT_GUIDE.md:309-314). No inter-application build dependency (claim 13). Repetitions: DEPLOYMENT_GUIDE.md:251-255, 280-284, 295-300, README.md:47, context.md:265.

**26. NAVIGATION_AND_EMBEDDING.md:12-16.** Flow holds: `/sales/*` renders `SalesPortal` (apps/shell/src/App.tsx:14), importing `salesPortal/App`, rendering within shell layout (apps/shell/src/components/SalesPortal.tsx:5, 84). Cited address fails. Shell fetches `http://localhost:3001/dist/assets/remoteEntry.js` (apps/shell/vite.config.ts:11), rather than `http://localhost:3001/remoteEntry.js`, hence `contradicted`. Diagram NAVIGATION_AND_EMBEDDING.md:19-26 repeats confirmed part.

**27. NAVIGATION_AND_EMBEDDING.md:74.** Three remotes declare unprefixed standalone routes, shell-prefixed embedded routes:
- apps/sales-portal/src/App.tsx:12-17;
- apps/underwriter-portal/src/App.tsx:12-17;
- apps/product-config/src/App.tsx:10-11, only `/` and `/products`.

NAVIGATION_AND_EMBEDDING.md:76-89 reproduces sales-portal. Repeated by context.md:445 ("Consistent routing patterns").

**28. NAVIGATION_AND_EMBEDDING.md:93.** Sales/underwriter Dashboards detect URL prefix, construct links with it (apps/sales-portal/src/components/Dashboard.tsx:12-14, 79, 84; apps/underwriter-portal/src/components/Dashboard.tsx:12-14, 73, 78). Product-config lacks this internal navigation.

**29. NAVIGATION_AND_EMBEDDING.md:108-111.** No unit has login/authentication/session:
- Shell mounts routes directly without login screen (apps/shell/src/main.tsx:7-13; apps/shell/src/App.tsx:11-18);
- No session/token code in `apps/`;
- TODO.md itself lists authentication/"Token sharing across microfrontends" as unfinished (TODO.md:8-13).

Shared session used by no unit, code showing opposite of described flow. Repetitions: NAVIGATION_AND_EMBEDDING.md:159, 187-190 (SSO, JWT, centralized session in "Production Considerations"), 199 ("Users login once at localhost:3000").

**30. NAVIGATION_AND_EMBEDDING.md:173.** Portals run on same shell page with shared React (claim 23). No snapshot measurement/isolation mechanism confirming or refuting claim.

**31. NAVIGATION_AND_EMBEDDING.md:179-185.** As claim 19, domains absent from configuration, differing from ARCHITECTURE_DOCUMENTATION.md:197-203.

**32. README.md:7.** Shell plus three remotes. `employer-portal`/`service-provider` absent from `apps/`, shell declares no remote for them (apps/shell/vite.config.ts:10-14; 3.4.3; 3.4.5, Repository overview). Rest repeats claims 1, 3, 4. Six-application list repeats:
- README.md:11-19 diagram, README.md:86-88 tree;
- README.md:180-184, 192-196 sections;
- context.md:10-16 ("6 independent applications"), 116-135, 162-181.

**33. README.md:119-120.** Root `dev` starts four applications, without nonexistent Employer/Service (package.json:11). Repeated by context.md:250 ("Starts all 6 applications simultaneously").

**34. README.md:150-156.** Each application has own `build`/`preview` (apps/sales-portal/package.json:7-8), `separate` build for four (3.4.6 #1-#4). Example uses `npm`, workspace/root scripts `pnpm` (pnpm-workspace.yaml:1-3; package.json:19-22).

**35. README.md:247-250.** Three places connect remote to shell: declaration (apps/shell/vite.config.ts:10-14), route (apps/shell/src/App.tsx:14-16), menu item (apps/shell/src/components/Layout.tsx:8-13). New remote therefore requires changing/rebuilding host. README omits required wrapper with `lazy`/`ErrorBoundary` (apps/shell/src/components/SalesPortal.tsx:4-88), type declaration (apps/shell/src/types/remotes.d.ts:1-14).

## Summary

Claims: 35 (corroborated: 21, partial: 3, contradicted: 5, uncorroborated: 6). Themes: (structure: 7, composition: 12, build-deploy: 7, independence: 7, other: 2).
