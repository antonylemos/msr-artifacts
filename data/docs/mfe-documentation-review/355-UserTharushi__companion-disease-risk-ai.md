---
schema: 1
id: 1174301349
full_name: UserTharushi/companion-disease-risk-ai
commit: 373de0e6083b86b2707913da037735130c8f5503
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

# 355 — UserTharushi/companion-disease-risk-ai

## Repository overview

All eleven `.md` documents classified `documentation` were read in full: CLAUDE.md, README.md, backend/services/nodejs/clinic-service/src/models/README.md, backend/services/nodejs/vaccination-service/src/routes/README.md, data/README.md, docs/INTERIM_REPORT.md, docs/PROGRESS_REPORT.md, docs/REQUIREMENTS.md, docs/VERIFICATION.md, docs/ml/README.md and ontology/neo4j/README.md. English project-authored texts; no standard tool README in list. Two service-internal READMEs briefly describe models/routes without frontend-unit claims. Data, ML and ontology documents concern supporting models/services without inter-frontend composition claims. Interim report references figures; data-flow and architecture diagram textual sources were also opened (docs/diagrams/src/fig04-dfd.mmd:1-38; docs/diagrams/src/fig06-architecture.mmd:1-35). First represents processes/data without frontend application boundaries; second represents PWA client on port 3001 linked to gateway, repeating claim 16.

Reviews 3.4.2–3.4.6 are `final`, with classification/acquisition ID and commit. Documentation combines monorepo/federated micro-frontend description (CLAUDE.md:7; README.md:7) with information that used application is concentrated in `mfe-auth`, while shell/other MFEs are scaffold (CLAUDE.md:56-58; README.md:80; docs/PROGRESS_REPORT.md:26-30). This contextualizes maturity without removing six active code federation relationships in review 3.4.5. Snapshot confirms functional route concentration in `mfe-auth` (apps/mfe-auth/src/App.tsx:23-70) and shell federation configuration (apps/shell/vite.config.ts:9-21; apps/shell/src/App.tsx:18-23), without proving actual published-environment use. Calling all other MFEs empty is excessive: `mfe-pet-profile` implements listing/API access (apps/mfe-pet-profile/src/pages/PetListPage.tsx:19-39; apps/mfe-pet-profile/src/lib/api.ts:24-51).

Comments/descriptive fields read in artifacts cited by five reviews: root, app, Node service and shared-package manifests; turbo.json; eight app Vite configurations/entries; apps/shell/src/App.tsx, apps/shell/src/layouts/ShellLayout.tsx and apps/shell/src/federation.d.ts; apps/mfe-auth/src/lib/auth-api.ts and apps/mfe-auth/src/lib/session.ts; both frontend/service Dockerfiles; docker-compose.yml; generated PWA code cited in source review. Architectural comment claims are table rows 12–14. Dockerfile installation/copy comments (apps/shell/Dockerfile:5-11; apps/mfe-auth/Dockerfile:5-11), PWA manifest product descriptions (apps/shell/vite.config.ts:28; apps/mfe-auth/vite.config.ts:25), Compose service titles/Neo4j initialization comments (docker-compose.yml:213-217) add no unit-composition claims. Session/authentication notes are internal to one unit; generated Workbox code concerns application’s own service worker, per review 3.4.4.

`doc-*` occurrences without separate rows:

- CLAUDE.md:27: workspace execution command; CLAUDE.md:116: disclaimer location, internal UI requirement. CLAUDE.md:92 concerns backend agent autonomy.
- README.md:20-26: folder-tree names combined in claim 11; README.md:80 repeats claims 2 and 4 with less absolute “scaffold”.
- docs/INTERIM_REPORT.md:138 expands acronym. `doc-independence` occurrences at docs/INTERIM_REPORT.md:163, 172, 189, 199, 243, 263, 283, 285, 299, 304, 314, 333, 458, 500, 518, 524, 532, 627, 716, 765, 832, 854, 857, 873, 881 concern AI autonomy, explanation/validation independence or research planning rather than frontend independence.
- docs/PROGRESS_REPORT.md:26-30 repeats claim 2’s `mfe-auth` concentration and claim 16’s gateway link. Occurrences :38, :67, :107, :142 and :169 concern monitoring agent.
- docs/REQUIREMENTS.md:90 repeats monorepo/PWA frontend/microservice characterization in claims 1 and 16. Occurrences :11, :22, :48, :51 and :99 concern autonomous agents.
- docs/VERIFICATION.md:32-33 are build/typecheck commands in code block, producing no rows under stage procedure. Build coordination is also described in prose at docs/INTERIM_REPORT.md:462, claim 15. docs/VERIFICATION.md:105 and docs/ml/README.md:100 concern backend monitoring.

Installation/test/execution blocks, including “Start all local containers” (README.md:67-71) and Compose reproduction (docs/INTERIM_REPORT.md:1012), are execution instructions. Successful-verification claims (docs/PROGRESS_REPORT.md:130-136) report tests without demonstrating separate inter-unit deployment. Generic GCP/Firebase mentions (CLAUDE.md:103-106; README.md:12-13, :48-50) identify no frontend hosting: Cloud Build lists only backend images (infra/gcp/cloudbuild.yaml:1-59), as review 3.4.6 records. They were not converted into independent MFE deployment claim. Mobile/PWA support, languages and business functionality contextualize application without equating to inter-unit autonomy.

## Claims

| # | Document | Claim | Theme | Corroboration | Evidence |
|---|---|---|---|---|---|
| 1 | CLAUDE.md:7 | "Monorepo with React micro-frontends, Node.js microservices, Python ML/agent services" | structure | corroborated | 3.4.3 (Workspace and Units); package.json:5-10 |
| 2 | CLAUDE.md:56 | "apps/mfe-auth […] is the entire live front end […] the application monolith" | structure | partial | apps/mfe-auth/src/App.tsx:23-70; 3.4.5 #7; 3.4.6 #2 |
| 3 | CLAUDE.md:58 | "apps/shell […] the Module Federation host, remotes map in apps/shell/vite.config.ts" | composition | corroborated | 3.4.5 #1-7; apps/shell/vite.config.ts:9-21 |
| 4 | CLAUDE.md:58 | "The other MFEs […] and apps/shell […] are empty scaffolds" | structure | contradicted | apps/mfe-pet-profile/src/pages/PetListPage.tsx:19-39; apps/mfe-pet-profile/src/lib/api.ts:24-51; apps/shell/src/App.tsx:18-54 |
| 5 | CLAUDE.md:62 | "Shared libs react, react-dom, react-router-dom, zustand are declared federated shared deps" | composition | corroborated | apps/shell/vite.config.ts:20; apps/mfe-auth/vite.config.ts:17; apps/mfe-pet-profile/vite.config.ts:17 |
| 6 | CLAUDE.md:62 | "inert while the shell is unused" | composition | uncorroborated | — |
| 7 | CLAUDE.md:95 | "packages/shared-types — canonical TypeScript interfaces" | composition | corroborated | apps/mfe-auth/src/lib/clinic-api.ts:1; apps/mfe-pet-profile/src/lib/api.ts:1; apps/mfe-admin/src/lib/api.ts:1 |
| 8 | CLAUDE.md:96 | "packages/shared-utils — shared utility functions" | composition | uncorroborated | — |
| 9 | CLAUDE.md:115 | "frontends call everything through the gateway (:4000) with Authorization: Bearer <jwt>" | composition | contradicted | apps/mfe-auth/src/lib/clinic-api.ts:3-14; apps/mfe-auth/src/lib/api-base.ts:49-59; apps/mfe-pet-profile/src/lib/api.ts:3-18; apps/mfe-admin/src/lib/api.ts:3-9 |
| 10 | README.md:7 | "Frontend: React + Tailwind + Module Federation micro-frontends + PWA" | composition | corroborated | 3.4.2 (module-federation configured in eight apps); 3.4.5 #1-6; apps/shell/vite.config.ts:9-54; apps/mfe-auth/vite.config.ts:9-50 |
| 11 | README.md:18-26 | "apps/ […] shell/ […] mfe-auth/ […] mfe-admin/" (tree with shell and seven mfe-* apps) | structure | corroborated | 3.4.3 (eight frontend units in apps/); apps/shell/vite.config.ts:10-18; apps/mfe-auth/package.json:2; apps/mfe-pet-profile/package.json:2 |
| 12 | apps/mfe-auth/vite.config.ts:47-48 | "The container serves vite dev, so enable the SW there too" | build-deploy | corroborated | 3.4.6 #2; apps/mfe-auth/Dockerfile:15; apps/mfe-auth/package.json:7; apps/mfe-auth/vite.config.ts:49 |
| 13 | apps/shell/src/App.tsx:8 | "Auth MFE runs standalone at localhost:3001 – redirect to it instead of federating" | independence | corroborated | 3.4.5 #7; apps/shell/src/App.tsx:9-14,44; apps/mfe-auth/Dockerfile:15; docker-compose.yml:24-32 |
| 14 | apps/shell/src/App.tsx:17 | "Lazy MFE Imports (Module Federation)" | composition | corroborated | 3.4.4 (six src-remote-import); 3.4.5 #1-6; apps/shell/src/App.tsx:18-23,47-54 |
| 15 | docs/INTERIM_REPORT.md:462 | "Turborepo, npm workspaces […] Coordinated builds across services" | build-deploy | corroborated | 3.4.6 (Repository overview and applications #1-8); package.json:5-13; turbo.json:5-9 |
| 16 | docs/INTERIM_REPORT.md:504 | "microservice architecture behind an API gateway, with a React PWA client" | composition | corroborated | apps/mfe-auth/src/lib/api-base.ts:49-59; apps/mfe-auth/src/lib/clinic-api.ts:3-14; apps/mfe-auth/vite.config.ts:19-50; docker-compose.yml:35-61 |

## Observations

**1. CLAUDE.md:7.** Root combines apps, services and packages through npm workspaces (package.json:5-10). Review 3.4.3 distinguishes eight frontend applications from Node/Python services and libraries. Formulation recurs at README.md:3 and docs/REQUIREMENTS.md:90. Concerns repository organization; specific composition technology is claim 10.

**2. CLAUDE.md:56.** `mfe-auth` concentrates authentication, onboarding, three role-based dashboards and symptom/result routes (apps/mfe-auth/src/App.tsx:23-70), without relying on shell federated import. README.md:80 and docs/PROGRESS_REPORT.md:26-30 repeat centrality. “live” reports use without active-environment snapshot proof; review 3.4.6 #2 records deployment not observed. Hence partial claim. Monolith expression describes functional application without denying other review 3.4.3 units.

**3. CLAUDE.md:58.** Host declares seven remotes (apps/shell/vite.config.ts:11-19). Six are consumed through shell imports; auth remains configured-only relationship (3.4.5 #1-7). Claim correctly identifies shell role/map location without asserting all remotes load.

**4. CLAUDE.md:58.** Placeholders exist, e.g. apps/mfe-symptom-checker/src/pages/ChatbotPage.tsx:1-8, but “empty” does not describe all other MFEs. `mfe-pet-profile` fetches pets/displays loading/error states, with client implementing listing, querying, creation, update and deletion (apps/mfe-pet-profile/src/pages/PetListPage.tsx:19-39; apps/mfe-pet-profile/src/lib/api.ts:24-51). Shell also has actual imports/routes (apps/shell/src/App.tsx:18-54). README.md:80 only calls this scaffold, compatible with limited maturity; that does not correct stronger emptiness claim in CLAUDE.md.

**5. CLAUDE.md:62.** Declared list is exactly same in shell/opened remotes (apps/shell/vite.config.ts:20; apps/mfe-auth/vite.config.ts:17; apps/mfe-pet-profile/vite.config.ts:17). Configurations corroborate declared shared federated dependencies. Claim concerns declaration; does not prove effective use of all four packages by two units.

**6. CLAUDE.md:62.** Conclusion federation remains inert because shell is unused depends on absent operational information, remaining uncorroborated. Code consumers exist (apps/shell/src/App.tsx:18-23), but presence neither confirms nor contradicts claimed absence of actual shell use.

**7. CLAUDE.md:95.** Common types are confirmed by imports in at least three units (apps/mfe-auth/src/lib/clinic-api.ts:1; apps/mfe-pet-profile/src/lib/api.ts:1; apps/mfe-admin/src/lib/api.ts:1). Following “All services should import” is recommendation rather than proof of all-service adoption. Frontend sharing is observed at compile time through `import type`.

**8. CLAUDE.md:96.** Implemented utility functions exist (packages/shared-utils/src/index.ts:4-88), but snapshot search for `shared-utils`, excluding lockfile, found only package’s own name and README tree. No two-unit consumers. Library existence does not support “shared” property; no consumption artifact confirms it, nor artifact demonstrates contrary use. README.md:43 mention repeats tree name without adding use.

**9. CLAUDE.md:115.** `mfe-auth` derives gateway URL, sending Bearer in clinic client (apps/mfe-auth/src/lib/api-base.ts:49-59; apps/mfe-auth/src/lib/clinic-api.ts:6-14). However `mfe-pet-profile` directly uses port 4002 without Authorization (apps/mfe-pet-profile/src/lib/api.ts:3-18), and `mfe-admin` likewise port 4003 (apps/mfe-admin/src/lib/api.ts:3-9). Generalization to all frontends is contradicted. Specific main-client-behind-gateway picture in claim 16 remains confirmed.

**10. README.md:7.** Named mechanism matches plugin recorded by 3.4.2 and six active 3.4.5 relationships. Two main frontends configure PWA (apps/shell/vite.config.ts:22-54; apps/mfe-auth/vite.config.ts:19-50). Sentence describes collective frontend stack without claiming each remote has PWA or architecture is already published. Specific lazy-loading comment gets own row 14 by adding consumer mechanism.

**11. README.md:18-26.** Tree enumerates eight applications found in review 3.4.3. Describes directories rather than complete functional boundaries or eight deployments. Name list recurs at CLAUDE.md:56-58; shell role, another verifiable property, is claim 3.

**12. apps/mfe-auth/vite.config.ts:47-48.** Dockerfile ends in `npm run dev` (apps/mfe-auth/Dockerfile:15), script running Vite (apps/mfe-auth/package.json:7); configuration enables service worker in mode (apps/mfe-auth/vite.config.ts:49). Review 3.4.6 #2 already separates development service from production deployment. Claim confirms container mode without asserting independent publication.

**13. apps/shell/src/App.tsx:8.** Comment recurs at apps/shell/src/App.tsx:43. Implementation replaces page location with auth URL (apps/shell/src/App.tsx:9-14,44), whose service has own Compose entry (docker-compose.yml:24-32). Independence here is auth execution as separate application, not implying backend service independence. Configured auth federation relationship is unconsumed, per 3.4.5 #7.

**14. apps/shell/src/App.tsx:17.** Each following declaration uses `lazy(() => import(...))` for one of six remotes (apps/shell/src/App.tsx:18-23). Routes insert them under shell layout (apps/shell/src/App.tsx:47-54), within Suspense. Comment excludes auth from list; thus exactly matches six 3.4.4 constructions and active 3.4.5 relationships.

**15. docs/INTERIM_REPORT.md:462.** Root scripts trigger Turbo, workspaces delimiting packages (package.json:5-13); build task declares dependencies/outputs (turbo.json:5-9). Review 3.4.6 records separate builds for eight applications under coordinated trigger. Commands at CLAUDE.md:15-28 and docs/VERIFICATION.md:32 illustrate same configuration without demonstrating successful execution. Turbo’s 3.4.2 `Undetermined` requires automation use at that stage; here artifacts confirm coordination configuration without establishing observed CI.

**16. docs/INTERIM_REPORT.md:504.** Context is functional PWA client/backend services rather than all eight apps indiscriminately. Gateway URL and `mfe-auth` authenticated client confirm link (apps/mfe-auth/src/lib/api-base.ts:49-59; apps/mfe-auth/src/lib/clinic-api.ts:3-14), Compose linking gateway/services (docker-compose.yml:35-61). Same view appears at docs/PROGRESS_REPORT.md:26-39 and diagram docs/diagrams/src/fig06-architecture.mmd:2-30, referenced by docs/INTERIM_REPORT.md:383-387. Diagram’s shell omission follows main-client focus without contradicting existing federation structure.

## Summary

Claims: 16 (corroborated: 11, partial: 1, contradicted: 2, uncorroborated: 2). Themes: (structure: 4, composition: 9, build-deploy: 2, independence: 1).
