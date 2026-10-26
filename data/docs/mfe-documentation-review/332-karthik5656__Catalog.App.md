---
schema: 1
id: 1350705751
full_name: karthik5656/Catalog.App
commit: 1982e0f3dae5a8508d354f9db91a089ba96d4bd6
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

# 332 — karthik5656/Catalog.App

## Repository overview

Documentation is entirely English. No root README exists. Two layers describe different frontends.

- **Agents.md:** "authoritative" engineering guide for coding agents (Agents.md:5). Sole text describing snapshot frontends: three apps in `src/frontend/apps/`, host/remote roles, `@originjs/vite-plugin-federation`, `remotes.json` and generated file (Agents.md:90-95, 145-161). Almost all matches previous reviews. Three discrepancies: nonexistent frontend "workspace" (claim 2); shell "Auth provider context", absent from code (claim 5); scope `merchantApp`, used by shell but not declared by merchant remote (claim 6).
- **documents/:** plans/specifications for earlier design named `Catalog.AI.App`, React 18 and .NET 8. Frontend has four MFEs, Shell, Vendor Catalog, AI Merchandising Copilot and Catalog Assistant, in `src/frontend/shell/`, `catalog-mfe/`, `copilot-mfe/` and `catalog-assistant-mfe/` (documents/component_boundaries.md:16, 25-38; documents/implementation_plan.md:94-98). Snapshot has three differently named units and React 19 (3.4.3; src/frontend/apps/ui-catalog/package.json:16). Agents.md appears to merge four into three: Copilot review in merchant, Assistant widget in consumer (Agents.md:152-153). These documents also describe shell authentication context, inter-MFE event bus, route guards and API calls through gateway. None exists in snapshot. Three apps are placeholders: merchant has three static pages (src/frontend/apps/ui-catalog-merchant/src/App.tsx:7-15), consumer one (src/frontend/apps/ui-catalog-consumer/src/pages/HomePage.tsx:1-3). Backends are `WeatherForecast` template (src/backend/Catalog.Gateway/Catalog.Gateway.API/Controllers/WeatherForecastController.cs:5-7). These claims are `contradicted`: documentation describes intention rather than snapshot state.

Three app `README.md` files are identical standard React + Vite template READMEs (src/frontend/apps/ui-catalog/README.md:1-16), without project claims. `src/infrastructure/DATABASE_PGVECTOR_SETUP.md` and plans `documents/component_plans/01_docker_infrastructure.md` through `05_catalog_assistant_service.md` concern only backend/database. Sole frontend-related point is gateway CORS allowing `http://localhost:3000` (documents/component_plans/02_api_gateway.md:57), infrastructure detail. `documents/typed_api_client_generation_plan.md` concerns HTTP clients between .NET services. Only three passages concern frontend, a Next.js frontend (claim 23).

Excluded from table because they do not concern units collectively (architectural-claim criterion, method step 3 in `INSTRUCTIONS.md`):
- **Normative guidance rather than snapshot descriptions:** use pnpm only (Agents.md:157, 373); keep each remote’s state isolated and global context only for tokens, profile and notifications (Agents.md:161); check service/MFE boundaries (Agents.md:383); maintain Module Federation contracts/shared-dependency configurations when editing remotes (Agents.md:387).
- **Backend, infrastructure and business:** high-level diagram (Agents.md:20-52) and backend diagram (documents/component_boundaries.md:78-105) only connect browser to gateway and services to each other. Each MFE’s business responsibilities (Agents.md:151-153; documents/component_boundaries.md:49, 57, 67; documents/component_plans/07_vendor_catalog_mfe.md:4; documents/component_plans/08_copilot_mfe.md:4; documents/component_plans/09_catalog_assistant_mfe.md:4; documents/implementation_plan.md:129-131) also excluded. "Docker Compose topology" (Agents.md:62; documents/implementation_plan.md:66-70, 107) lists only ollama, postgres, rabbitmq and redis. Claim entire architecture runs locally through Docker Compose (documents/implementation_plan.md:10) is claim 20; snapshot has no compose (3.4.6 Repository overview). Folder `src/infrastructure/` lacks announced Kubernetes manifests/Terraform (documents/component_boundaries.md:17; documents/implementation_plan.md:99).
- **Unit internals:** TanStack Query and Zustand "for local MFE state" (documents/implementation_plan.md:59) are absent from every `package.json` (src/frontend/apps/ui-catalog-merchant/package.json:12-19). Also excluded in-memory JWT storage/shell silent token renewal (documents/v2_auth_and_sla_spec.md:28, 71) and internal MFE folders in plan trees (e.g. documents/component_plans/07_vendor_catalog_mfe.md:12-19).

Code blocks reproducing configuration/commands produce no rows:
- Agents.md:312-327 commands (`pnpm install` in `src/frontend`, `pnpm dev` in each app, with ports in comments Agents.md:319 and 322);
- planned shell `vite.config.ts`, with remotes `catalogMfe`, `copilotMfe` and `assistantMfe` on ports 3001-3003 and `shared: ['react', 'react-dom', 'react-router-dom']` (documents/component_plans/06_shell_mfe.md:29-46);
- protected route with `React.lazy(() => import('catalogMfe/CatalogApp'))` (documents/component_plans/06_shell_mfe.md:49-62);
- remote `catalogMfe` configuration exposing `./CatalogApp` (documents/component_plans/07_vendor_catalog_mfe.md:27-36);
- hook calling `http://localhost:5000/api/assistant/ask` (documents/component_plans/09_catalog_assistant_mfe.md:27-50).

Link to `remotes.json` at Agents.md:158 points to author-machine `file:///c:/Users/...` path. File exists in snapshot (src/frontend/apps/ui-catalog/remotes.json).

`doc-*` occurrences without rows:
- **Section titles:** Agents.md:145; documents/component_boundaries.md:23, 41, 48, 56, 66; documents/component_plans/06_shell_mfe.md:1, 28; documents/component_plans/07_vendor_catalog_mfe.md:1; documents/component_plans/08_copilot_mfe.md:1; documents/component_plans/09_catalog_assistant_mfe.md:1; documents/implementation_plan.md:56, 127; documents/v2_auth_and_sla_spec.md:68.
- **Commands/verification steps:** Agents.md:319, 322; documents/component_plans/06_shell_mfe.md:67, 69; documents/implementation_plan.md:158, 163, 166, 168.
- **Normative guidance:** Agents.md:161, 383, 387.
- **Business/internal state:** documents/component_plans/07_vendor_catalog_mfe.md:4; documents/component_plans/08_copilot_mfe.md:4; documents/component_plans/09_catalog_assistant_mfe.md:4; documents/implementation_plan.md:59.

Others are in claims or their paragraphs.

Comments/descriptive fields read:
- three `vite.config.ts` (src/frontend/apps/ui-catalog/vite.config.ts:9, 13, 19-25, 62; remotes have no comments);
- shell `remotes.json` and `src/remotes.d.ts`;
- shell `.gitignore` (src/frontend/apps/ui-catalog/.gitignore:15);
- three app `package.json` and `src/frontend` manifest, whose `description` is empty (src/frontend/package.json:4);
- three Dockerfiles (e.g. src/frontend/apps/ui-catalog/Dockerfile:4, 7, 11, 15, 19);
- `.github/workflows/ci-pipeline.yml` (e.g. :19, 32, 143, 234) and `.github/workflows/delete-merged-branch.yml`.

They describe steps ("Install pnpm", "SPA fallback", "Detect changed paths to determine what needs building") without claims beyond rows 8 and 9.

## Claims

| # | Document | Claim | Theme | Corroboration | Evidence |
|---|---|---|---|---|---|
| 1 | Agents.md:15 | "React 19 Micro Frontends (MFEs) using Vite and Module Federation." | structure | corroborated | 3.4.2 (technology `module-federation` in three apps); 3.4.3 (three Vite applications); 3.4.5 #1-#2; src/frontend/apps/ui-catalog/package.json:16 |
| 2 | Agents.md:90-91 | "React 19 Micro Frontends Workspace" / "Root frontend workspace config (pnpm)" | structure | contradicted | 3.4.3 (Workspace: no declaration); src/frontend/package.json:1-21 |
| 3 | Agents.md:93-95 | "ui-catalog/ # Host Shell MFE" / "ui-catalog-merchant/ # Merchant / Vendor Catalog MFE" / "ui-catalog-consumer/ # Customer / Shopper Catalog MFE" | structure | corroborated | 3.4.3 (three applications); 3.4.5 #1-#2 (host → remote) |
| 4 | Agents.md:151 | "Global layout, top navigation, […] dynamic remote MFE router" | composition | corroborated | 3.4.4 (src/frontend/apps/ui-catalog/src/App.tsx:26, runtime-composition); 3.4.5 #1-#2; src/frontend/apps/ui-catalog/src/App.tsx:12-30; src/frontend/apps/ui-catalog/src/components/ShellLayout.tsx:9-37 |
| 5 | Agents.md:151 | "Auth provider context" | composition | contradicted | 3.4.4 (Notes: no inter-unit communication mechanism); src/frontend/apps/ui-catalog/src/main.tsx:7-13; src/frontend/apps/ui-catalog/src/App.tsx:9-34 |
| 6 | Agents.md:152 | "Remote (`merchantApp`)" | composition | contradicted | 3.4.5 #2; src/frontend/apps/ui-catalog/remotes.json:3; src/frontend/apps/ui-catalog-merchant/vite.config.ts:17 |
| 7 | Agents.md:153 | "Remote (`consumerApp`)" | composition | corroborated | 3.4.5 #1; src/frontend/apps/ui-catalog/remotes.json:10; src/frontend/apps/ui-catalog-consumer/vite.config.ts:17 |
| 8 | Agents.md:158-159 | "Remote App Configuration: Defined in remotes.json and resolved dynamically in `remoteApps.generated.tsx`." | composition | corroborated | 3.4.4 (src/frontend/apps/ui-catalog/vite.config.ts:37, dynamic-loading; src/frontend/apps/ui-catalog/remotes.json:3, host-relationship); src/frontend/apps/ui-catalog/vite.config.ts:9-17, 26-70; src/frontend/apps/ui-catalog/.gitignore:15-16 |
| 9 | Agents.md:160 | "Shell and remotes share singletons for `react`, `react-dom`, and `react-router-dom`." | composition | partial | 3.4.2 (`shared` in three calls `federation`); src/frontend/apps/ui-catalog/vite.config.ts:88; src/frontend/apps/ui-catalog-merchant/vite.config.ts:22; src/frontend/apps/ui-catalog-consumer/vite.config.ts:22 |
| 10 | documents/component_boundaries.md:16 | "React 18 Micro Frontends (Shell, Catalog, Copilot, Assistant)" | structure | contradicted | 3.4.3 (three applications: ui-catalog, ui-catalog-consumer, ui-catalog-merchant); src/frontend/apps/ui-catalog/package.json:16 |
| 11 | documents/component_boundaries.md:35 | "Route: /vendor/products" / "Route: /vendor/copilot/:id" (routes where shell mounts MFEs) | composition | contradicted | 3.4.5 #1-#2 (routes `merchant` and `consumer`); src/frontend/apps/ui-catalog/remotes.json:6, 13; src/frontend/apps/ui-catalog/src/App.tsx:17 |
| 12 | documents/component_boundaries.md:46 | "Exposes a React Context/Event Bus for cross-MFE communication (e.g., `onAuthTokenChange`, `onToastMessage`)." | composition | contradicted | 3.4.4 (Notes: no inter-unit communication mechanism); src/frontend/apps/ui-catalog/src/App.tsx:9-34; src/frontend/apps/ui-catalog/src/main.tsx:7-13 |
| 13 | documents/component_boundaries.md:51 | "**APIs Consumed**: `CatalogService` via Gateway (`GET/POST/PUT /api/catalog/products`)" | structure | contradicted | src/frontend/apps/ui-catalog-merchant/src/pages/MerchantProducts.tsx:3-13; src/backend/Catalog.Gateway/Catalog.Gateway.API/Startup.cs:14-17, 42-44; src/backend/Catalog.Gateway/Catalog.Gateway.API/Controllers/WeatherForecastController.cs:5-7, 14-15 |
| 14 | documents/component_boundaries.md:59-61 | "**APIs Consumed**: […] `CatalogService` (`GET /api/catalog/products/:id/enrichment`) […] (`POST /api/catalog/products/:id/approve-enrichment`)" (Copilot MFE) | structure | contradicted | 3.4.3 (no unit Copilot); src/frontend/apps/ui-catalog-merchant/src/App.tsx:7-15; src/backend/Catalog.Gateway/Catalog.Gateway.API/Controllers/WeatherForecastController.cs:5-7, 14-15 |
| 15 | documents/component_boundaries.md:69 | "**APIs Consumed**: `CatalogAssistantService` (`POST /api/assistant/ask` - Server-Sent Events / streaming HTTP)." (Catalog Assistant MFE) | structure | contradicted | 3.4.3 (no unit Assistant); src/frontend/apps/ui-catalog-consumer/src/pages/HomePage.tsx:1-3; src/backend/Catalog.Gateway/Catalog.Gateway.API/Controllers/WeatherForecastController.cs:5-7, 14-15 |
| 16 | documents/component_boundaries.md:71 | "Isolated, lightweight widget with zero dependency on Vendor MFEs." | independence | uncorroborated | — |
| 17 | documents/component_plans/06_shell_mfe.md:10 | "Catalog.AI.App/src/frontend/shell/" (MFEs reside in `src/frontend/shell/`, `catalog-mfe/`, `copilot-mfe/` and `catalog-assistant-mfe/`) | structure | contradicted | 3.4.3 (directories `src/frontend/apps/ui-catalog`, `ui-catalog-consumer` and `ui-catalog-merchant`) |
| 18 | documents/component_plans/06_shell_mfe.md:18 | "ProtectedRoute.tsx # Auth & Role-based route guard" | composition | contradicted | 3.4.5 #1-#2; src/frontend/apps/ui-catalog/src/App.tsx:14-28 |
| 19 | documents/component_plans/09_catalog_assistant_mfe.md:55 | "Standalone widget testing on port `3003`." | independence | uncorroborated | — |
| 20 | documents/implementation_plan.md:10 | "The entire architecture is designed to run locally using Docker Compose" | build-deploy | uncorroborated | — |
| 21 | documents/implementation_plan.md:57 | "React 18 + TypeScript + Vite + Module Federation / Single-SPA." | composition | contradicted | 3.4.2 (only `module-federation`); src/frontend/apps/ui-catalog/package.json:12-31; src/frontend/apps/ui-catalog-merchant/package.json:12-31; src/frontend/apps/ui-catalog-consumer/package.json:12-31 |
| 22 | documents/sequence_diagrams.md:48 | "CatSvc-->>CopilotMFE: Push update via SignalR / Polling" (catalog service notifies MFE through SignalR or polling) | structure | contradicted | src/frontend/apps/ui-catalog-merchant/package.json:12-19; src/frontend/apps/ui-catalog-merchant/src/App.tsx:7-15; src/backend/Catalog.App/Catalog.App.Api/Startup.cs:14, 44 |
| 23 | documents/typed_api_client_generation_plan.md:65 | "TypeScript clients for the Next.js frontend" | structure | contradicted | 3.4.2 (dependencies of three apps); 3.4.3 (build Vite in three apps); src/frontend/apps/ui-catalog/package.json:12-31 |

## Observations

**1. Agents.md:15.** Snapshot confirms entire sentence: three React 19 apps (`react` `^19.2.8` at src/frontend/apps/ui-catalog/package.json:16 and both remotes), with Vite build and Module Federation through `@originjs/vite-plugin-federation`, composed host → remote. Repetitions: section 4 title (Agents.md:145) and following plugin-naming line (Agents.md:147); "React 19 Micro Frontends" part of Agents.md:90; "utilizes React Micro Frontends (MFEs)" (documents/implementation_plan.md:3); plan-tree comments calling shell `vite.config.ts` "Module Federation Host configuration" and remotes’ "Module Federation Remote configuration" or "Remote Entry setup" (documents/component_plans/06_shell_mfe.md:11; documents/component_plans/07_vendor_catalog_mfe.md:11; documents/component_plans/08_copilot_mfe.md:11; documents/component_plans/09_catalog_assistant_mfe.md:11). Actual `vite.config.ts` files confirm roles (src/frontend/apps/ui-catalog/vite.config.ts:85-89; src/frontend/apps/ui-catalog-merchant/vite.config.ts:16-23). Documents’ React 18 versions are claim 10.

**2. Agents.md:90-91.** Tree calls `src/frontend/` workspace and its `package.json` "Root frontend workspace config (pnpm)". This `package.json` only declares pnpm manager and placeholder `test` script, without `workspaces` (src/frontend/package.json:6-8, 12-19). No `pnpm-workspace.yaml` exists, and each app has own lockfile (3.4.3 Notes). Command "Install all dependencies across workspace", `cd src/frontend && pnpm install` (Agents.md:313-314), is in command block repeating claim. Without workspace it would not install app dependencies. This was not checked through execution.

**3. Agents.md:93-95.** Tree lists three directories structural review recognizes as units, with roles confirmed by composition review: `ui-catalog` host, other two remotes. Section 4 table repeats folders/roles (Agents.md:149-153, Type column). Comment/table ports 3000, 3001 and 3002 are development-server ports (src/frontend/apps/ui-catalog/vite.config.ts:77; src/frontend/apps/ui-catalog-merchant/vite.config.ts:9; src/frontend/apps/ui-catalog-consumer/vite.config.ts:9). Table remote names are claims 6 and 7.

**4. Agents.md:151.** Shell has header/navigation layout (src/frontend/apps/ui-catalog/src/components/ShellLayout.tsx:9-37) wrapping all routes (src/frontend/apps/ui-catalog/src/App.tsx:12). Remote links/routes derive from `remoteApps` (src/frontend/apps/ui-catalog/src/components/ShellLayout.tsx:27-31; src/frontend/apps/ui-catalog/src/App.tsx:14-28), confirming "dynamic remote MFE router". Repetitions, mostly earlier-design documents:
- "Layout Frame / Top Navbar" and "Dynamic Remote Module Loader (Module Federation)" (documents/component_boundaries.md:28-29);
- "layout shell, global navigation, […] and dynamic loading of remote MFEs" (documents/component_boundaries.md:42);
- "dynamically loads remote MFEs based on active routes" (documents/component_plans/06_shell_mfe.md:4);
- "global navbar […] and dynamic MFE router" (documents/implementation_plan.md:128).

Table cell also cites unconfirmed authentication context, hence separate claim 5.

**5. Agents.md:151.** No frontend app has authentication provider, context or code: shell only mounts `BrowserRouter` and `App` (src/frontend/apps/ui-catalog/src/main.tsx:7-13), and `App` has only routes/`Suspense` (src/frontend/apps/ui-catalog/src/App.tsx:9-34). Search for `auth`, `context` and `protected` in `src/frontend` finds nothing. Documentation’s most repeated claim:
- "Auth Token Context" (documents/component_boundaries.md:28);
- "authentication token management" and "User Auth state (JWT token, user role)" (documents/component_boundaries.md:42-43);
- "authentication context (`AuthProvider`)" (documents/component_plans/06_shell_mfe.md:4);
- "AuthContext.tsx # Shares JWT & User details across MFEs" (documents/component_plans/06_shell_mfe.md:20);
- "authentication layout" (documents/implementation_plan.md:128);
- "Shell MFE `AuthProvider` context" (documents/implementation_plan.md:144);
- "Shell App (Auth Provider Context)" (documents/v2_auth_and_sla_spec.md:28);
- "Hosts the primary `AuthProvider` context" and "Provides `useAuth()` hook for sub-MFEs" (documents/v2_auth_and_sla_spec.md:69-72).

Guidance to use global context for tokens (Agents.md:161) assumes same mechanism.

**6. Agents.md:152.** Merchant is described as remote `merchantApp`. Shell uses that scope (src/frontend/apps/ui-catalog/remotes.json:3), but merchant declares itself `consumerApp` (src/frontend/apps/ui-catalog-merchant/vite.config.ts:17). No unit declares itself `merchantApp`, contradicting merchant’s attributed name. Composition review resolved relationship through URL port (3.4.5 #2). Divergent-name effect was not checked through execution.

**7. Agents.md:153.** Consumer is described as remote `consumerApp`. Name matches unit’s own configuration (src/frontend/apps/ui-catalog-consumer/vite.config.ts:17) and shell scope (src/frontend/apps/ui-catalog/remotes.json:10; 3.4.5 #1). Merchant repeating name does not disprove consumer declaration.

**8. Agents.md:158-159.** Shell `vite.config.ts` reads `remotes.json` as "single source of truth" (src/frontend/apps/ui-catalog/vite.config.ts:9-11), constructs `remotes` map (:13-17) and generates `src/remoteApps.generated.tsx` with one `React.lazy(() => import("<scope>/App"))` per remote (:26-50). Generation happens at build start and, in development server, again on every JSON change (:57-70). Generated file is Git-ignored (src/frontend/apps/ui-catalog/.gitignore:15-16), absent from snapshot (3.4.4 Notes). "Resolved dynamically" applies in sense of JSON-based regeneration and dynamic remote imports. Addresses remain fixed at build (3.4.6 #1). `vite.config.ts` comments (:9, 19-25, 62) repeat claim.

**9. Agents.md:160.** Three `federation` calls declare `shared: ["react", "react-dom", "react-router-dom"]` (src/frontend/apps/ui-catalog/vite.config.ts:88; src/frontend/apps/ui-catalog-merchant/vite.config.ts:22; src/frontend/apps/ui-catalog-consumer/vite.config.ts:22). All three apps use all three libraries (src/frontend/apps/ui-catalog/package.json:16-18 and same in remotes), confirming sharing. Configuration is simple list without singleton option. Runtime singleton loading lacks artifact and was not checked through execution. Hence claim `partial`. Planned shell `vite.config.ts` has same list (documents/component_plans/06_shell_mfe.md:42), in code block.

**10. documents/component_boundaries.md:16.** Earlier design has four MFEs: Shell, Vendor Catalog, AI Merchandising Copilot and Catalog Assistant. Snapshot has three, ui-catalog, ui-catalog-merchant and ui-catalog-consumer, without Copilot/Assistant unit. Version also differs: React 18 in documents, React 19 in snapshot (src/frontend/apps/ui-catalog/package.json:16). Four-MFE set repeats:
- diagram/sections 1.1-1.4 (documents/component_boundaries.md:25-38, 41, 48, 56, 66);
- plan titles 06-09, with React 18 (e.g. documents/component_plans/06_shell_mfe.md:1);
- implementation plan diagrams/lists (documents/implementation_plan.md:19-26, 94, 127-131);
- sequence diagram participants (documents/sequence_diagrams.md:9, 15-16, 67);
- V2 specification tree/guards (documents/v2_auth_and_sla_spec.md:16, 72, 74-76).

More recent Agents.md describes three actual units (claim 3).

**11. documents/component_boundaries.md:35.** Diagram places Vendor Catalog at `/vendor/products` and Copilot at `/vendor/copilot/:id`. Sections repeat these as "Owned Routes" (documents/component_boundaries.md:50, 58), and planned shell code mounts them at `/vendor/products/*` (documents/component_plans/06_shell_mfe.md:54). Snapshot shell mounts remotes at `merchant/*` and `consumer/*`, from `remotes.json` (src/frontend/apps/ui-catalog/remotes.json:6, 13; src/frontend/apps/ui-catalog/src/App.tsx:17), under `basename` `/ui-catalog` (src/frontend/apps/ui-catalog/src/main.tsx:9). Internally merchant has routes `products` and `orders` (src/frontend/apps/ui-catalog-merchant/src/App.tsx:10-12). No `/vendor/...` route exists.

**12. documents/component_boundaries.md:46.** Shell would expose React context/event bus for inter-MFE communication, with events such as `onAuthTokenChange` and `onToastMessage`. Source-code review found no inter-unit communication mechanism, and shell exposes nothing: only consumes remotes (src/frontend/apps/ui-catalog/vite.config.ts:85-89 has no `exposes`). Mechanism differs from claim 5 (event/bus rather than authentication context alone), hence own row.

**13. documents/component_boundaries.md:51.** Vendor Catalog would consume `CatalogService` through gateway to query/change products. Sequence diagram `POST /api/catalog/products` call repeats relationship (documents/sequence_diagrams.md:26). Snapshot merchant products page is static without HTTP call (src/frontend/apps/ui-catalog-merchant/src/pages/MerchantProducts.tsx:3-13). Gateway registers only controllers, no proxy routes (src/backend/Catalog.Gateway/Catalog.Gateway.API/Startup.cs:14-17, 42-44); sole controller is template `WeatherForecast` (src/backend/Catalog.Gateway/Catalog.Gateway.API/Controllers/WeatherForecastController.cs:5-7, 14-15). Announced relationship is unimplemented. Diagram linking MFEs collectively to gateway (documents/implementation_plan.md:19-31) and frontend JWT transmission to gateway (documents/v2_auth_and_sla_spec.md:27-39) contextualize dependency without making each MFE/service relationship identical.

**14. documents/component_boundaries.md:59-61.** Copilot would consume `CatalogService` enrichment/approval endpoints. Gateway approval recurs in sequence diagram (documents/sequence_diagrams.md:51). Subject differs from claim 13’s Vendor Catalog. No Copilot unit exists (3.4.3); merchant, assigned Copilot review by Agents.md:152, only mounts three static pages (src/frontend/apps/ui-catalog-merchant/src/App.tsx:7-15). Gateway offers only `WeatherForecast` controller, without described endpoints (src/backend/Catalog.Gateway/Catalog.Gateway.API/Controllers/WeatherForecastController.cs:5-7, 14-15). Available implementation contradicts design.

**15. documents/component_boundaries.md:69.** Catalog Assistant would consume `CatalogAssistantService` through SSE/streaming HTTP. Same-endpoint data-reading restriction (documents/component_boundaries.md:72), hook example (documents/component_plans/09_catalog_assistant_mfe.md:27-50) and gateway call in sequence diagram (documents/sequence_diagrams.md:75) repeat relationship. Subject, service and mechanism differ from claims 13 and 14. No Assistant unit exists (3.4.3); consumer, assigned widget by Agents.md:153, only renders placeholder (src/frontend/apps/ui-catalog-consumer/src/pages/HomePage.tsx:1-3). Gateway offers only `WeatherForecast`, without `/api/assistant/ask` or streaming (src/backend/Catalog.Gateway/Catalog.Gateway.API/Controllers/WeatherForecastController.cs:5-7, 14-15). Relationship is unimplemented.

**16. documents/component_boundaries.md:71.** Sentence says Catalog Assistant is isolated widget without Vendor MFE dependency. No Assistant unit exists in snapshot (claim 10). Agents.md places widget inside consumer (Agents.md:153), but consumer has only placeholder page (src/frontend/apps/ui-catalog-consumer/src/pages/HomePage.tsx:1-3). Since described unit is absent, snapshot neither confirms nor disproves isolation.

**17. documents/component_plans/06_shell_mfe.md:10.** Plan trees place shell at `src/frontend/shell/` and remotes at `src/frontend/catalog-mfe/`, `copilot-mfe/` and `catalog-assistant-mfe/` (documents/component_plans/07_vendor_catalog_mfe.md:10; documents/component_plans/08_copilot_mfe.md:10; documents/component_plans/09_catalog_assistant_mfe.md:10). Implementation plan tree combines four (documents/implementation_plan.md:94-98). Trees also give remote entries `CatalogApp.tsx`, `CopilotApp.tsx` and `AssistantApp.tsx` (documents/component_plans/07_vendor_catalog_mfe.md:19; documents/component_plans/08_copilot_mfe.md:17; documents/component_plans/09_catalog_assistant_mfe.md:19). Snapshot units reside in `src/frontend/apps/`, each remote exposing `./App` (src/frontend/apps/ui-catalog-merchant/vite.config.ts:19-21). Root name `Catalog.AI.App` is also earlier design’s. Agents.md uses it as repository nickname (Agents.md:3), while its tree starts at `Catalog.App/` (Agents.md:59).

**18. documents/component_plans/06_shell_mfe.md:18.** Annotated shell tree already claims `ProtectedRoute.tsx` exists as authentication/role guard. First occurrence, before "`<ProtectedRoute>` route guards for remote MFEs" (documents/implementation_plan.md:144). Repetitions: V2 diagram "Protected Route Guards" and per-MFE guard list, with public Assistant (documents/v2_auth_and_sla_spec.md:29, 73-76); V2 tree title "(Auth Guards)" (documents/v2_auth_and_sla_spec.md:16); planned shell code-block protected route (documents/component_plans/06_shell_mfe.md:54-60). Snapshot mounts each remote only through `Suspense`, without guard (src/frontend/apps/ui-catalog/src/App.tsx:14-28). "AuthProvider context" part of documents/implementation_plan.md:144 repeats claim 5.

**19. documents/component_plans/09_catalog_assistant_mfe.md:55.** Test instruction assumes Catalog Assistant widget can run alone. Unlike independence from vendor MFEs (claim 16), this concerns widget standalone execution. No Assistant unit exists in snapshot (3.4.3). Consumer has own Vite script (src/frontend/apps/ui-catalog-consumer/package.json:7), but only renders placeholder (src/frontend/apps/ui-catalog-consumer/src/pages/HomePage.tsx:1-3); this does not demonstrate planned widget isolated execution. Port is instruction detail without own claim.

**20. documents/implementation_plan.md:10.** Development strategy covers local execution of entire architecture, including MFEs, through Docker Compose, beyond backend infrastructure alone. Review 3.4.6 records separate nginx images for three frontends, but no compose/configuration running them collectively. Consumer Dockerfile, for example, builds/serves only own `dist` (src/frontend/apps/ui-catalog-consumer/Dockerfile:12-22). Folder `docker/` contains only docker/init-scripts/01-init-databases.sql. Individual images do not corroborate announced Compose orchestration; configuration absence likewise does not demonstrate design infeasibility. Claim remains uncorroborated. Review 3.4.6 also records mismatch between shell-embedded development addresses (src/frontend/apps/ui-catalog/remotes.json:4, 11) and image port 80 (src/frontend/apps/ui-catalog-consumer/Dockerfile:20, 22), without composing proxy.

**21. documents/implementation_plan.md:57.** Sentence names two composition technologies: "Module Federation / Single-SPA". Module Federation is confirmed. None of three `package.json` declares `single-spa` (src/frontend/apps/ui-catalog/package.json:12-31 and same in remotes), and dependency review records only `module-federation`. Under rule, different technology name makes claim `contradicted`. Sentence is not split. "React 18" repeats claim 10, while "TypeScript + Vite" is confirmed.

**22. documents/sequence_diagrams.md:48.** In product creation flow, catalog service notifies Copilot MFE through SignalR or polling. Mechanism differs from claims 13-15: backend pushes update to MFE. No SignalR/polling exists anywhere in snapshot (search for `signalr` in `src/`, `.github/` and `docker/` without result). Merchant, assigned Copilot review by Agents.md, has no dependencies beyond React, router and federation (src/frontend/apps/ui-catalog-merchant/package.json:12-19), nor code beyond three static pages (src/frontend/apps/ui-catalog-merchant/src/App.tsx:7-15). `Catalog.App` only registers controllers (src/backend/Catalog.App/Catalog.App.Api/Startup.cs:14, 44), sole one being template controller.

**23. documents/typed_api_client_generation_plan.md:65.** Typed-client plan describes Next.js frontend. Repetitions: "Next.js Frontend" calling gateway (documents/typed_api_client_generation_plan.md:308) and optional TypeScript client generation task (documents/typed_api_client_generation_plan.md:393). Three apps are React with Vite builds, without `next` in manifests (src/frontend/apps/ui-catalog/package.json:12-31 and same in remotes; 3.4.3). Sole document describing frontend this way. Gateway call contextualizes dependencies in claims 13-15.

## Summary

Claims: 23 (corroborated: 5, partial: 1, contradicted: 14, uncorroborated: 3). Themes: (structure: 10, composition: 10, build-deploy: 1, independence: 2).
