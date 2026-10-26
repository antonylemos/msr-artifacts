---
schema: 1
id: 1019893852
full_name: lguilhermecardoso/mfe-react-vite-example
commit: ddf474192c82d47341b22be009915913c9227eca
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

# 351 — lguilhermecardoso/mfe-react-vite-example

## Repository overview

English root README presents a React/Vite example with Module Federation, a container and four micro-frontends, local instructions and feature list. Portuguese roadmap mixes completed tasks/future intentions. All seven `documentation` documents were read in full: README.md, roadmap.md and five unit READMEs. Latter are React/TypeScript/Vite template copies without project architecture claims (mf-dashboard/README.md:1-69; mf-login/README.md:1-69; mf-navbar/README.md:1-69; mf-personagem-detalhe/README.md:1-69; root-app/README.md:1-69). Presentation page also contains Portuguese architecture description (root-app/src/pages/Sobre.tsx:25-40).

Five reviews 3.4.2–3.4.6 are `final`, sharing classification/acquisition ID and commit. They confirm five units, four active federation relationships, separate builds/joint deployment. Artifacts support reading: root-app/vite.config.ts:11-35 declares remotes, root-app/src/App.tsx:5-8 imports them and .github/workflows/deploy.yml:19-27 publishes output aggregated by build-all.sh:8-23. Snapshot excludes `dist/` output mentioned in classification; available configuration/source files were used here.

Comments/descriptive fields read in five `package.json` (none with `description`), five `vite.config.ts`, five `index.html` and `src/main.tsx`, root-app/src/declarations.d.ts:1-4, root-app/src/App.tsx:1-101, mf-login/src/App.tsx:1-41, mf-login/src/LoginForm.tsx:1-69, mf-navbar/src/App.tsx:1-24, mf-navbar/src/Navbar.tsx:1-133, mf-dashboard/src/App.tsx:1-8, mf-dashboard/src/Dashboard.tsx:1-154, mf-personagem-detalhe/src/App.tsx:1-12, mf-personagem-detalhe/src/PersonagemDetalhe.tsx:1-154, build-all.sh:1-25 and .github/workflows/deploy.yml:1-27. Workflow name and two navbar wrapper comments enter table. Local mock comment (mf-navbar/src/App.tsx:4) reinforces independence in claim 8; suggestion to clear storage/call root-app (mf-navbar/src/App.tsx:10) is implementation possibility rather than exposed-path description. Other comments explain internal details/local changes, such as HashRouter switch (root-app/src/main.tsx:5-9).

`doc-*` occurrences without separate rows: README.md:1 is title, README.md:10 illustrative root tree name; README.md:24 is technology mention already supported by claim 2; README.md:50 and 52 instruct build/preview in separate terminals, like README.md:40-59 and 75-77 commands. README.md:62-67 ports are operational guidance without explicit remote `preview.port` configuration (e.g. mf-login/vite.config.ts:19-34). README.md:90 repeats claim 2 federation; README.md:101 repeats claim 6 unit. README.md:113 recommends contributor practices. roadmap.md:1 and 44 are titles; roadmap.md:16, 24 and 35 repeat units from claims 7, 5 and 6. README.md:3, 12-15, 33, 80 and 98 occurrences are in claims 2, 4-8, 9 and 12.

roadmap.md:46, 55, 60, 67, 73-74, 81 and 99 occurrences are unchecked tasks, remaining intentions without snapshot claim rows. Same applies to README.md:102-104 and roadmap.md:36-40, 45-48, 53-54, 75-76 and 82-90. Some implemented tasks remain pending in text: dashboard/detail navigation uses callback/host routes (root-app/src/App.tsx:20-28, 73-84; mf-dashboard/src/Dashboard.tsx:95), and workflow already publishes to Pages (.github/workflows/deploy.yml:19-27). Checklist is not proof of absence. Dashboard API integration is internal detail at README.md:27, 88 and 103 and roadmap.md:27; About page describes application dependency, also observed in detail remote (claim 17). Link `ROADMAP.md` at README.md:106 differs in case from `roadmap.md`. Appearance, login internals and generic maintenance advice produce no architectural claims.

## Claims

| # | Document | Claim | Theme | Corroboration | Evidence |
|---|---|---|---|---|---|
| 1 | .github/workflows/deploy.yml:1 | "Deploy Microfrontends to GitHub Pages" | build-deploy | corroborated | 3.4.6 #1-5; .github/workflows/deploy.yml:19-27; build-all.sh:8-23 |
| 2 | README.md:3 | "This project demonstrates a Microfrontends architecture using React, Vite, Module Federation, and TailwindCSS." | structure | corroborated | 3.4.3 (five units); 3.4.5 #1-4; root-app/vite.config.ts:1-4, 28-35; mf-dashboard/vite.config.ts:1-17 |
| 3 | README.md:11 | "root-app/ […] Main application (container/orchestrator)" | structure | corroborated | 3.4.5 #1-4; root-app/src/App.tsx:5-8, 58-96 |
| 4 | README.md:12 | "mf-login/ […] Microfrontend: Login and sign-up screen" | structure | corroborated | 3.4.3 (mf-login `Yes`); mf-login/vite.config.ts:10-17; mf-login/src/App.tsx:10-33 |
| 5 | README.md:13 | "mf-dashboard/ […] Microfrontend: Main dashboard" | structure | corroborated | 3.4.3 (mf-dashboard `Yes`); mf-dashboard/vite.config.ts:10-17; root-app/src/App.tsx:69-77 |
| 6 | README.md:14 | "mf-personagem-detalhe/ […] Microfrontend: Character detail (e.g., Rick and Morty)" | structure | corroborated | 3.4.3 (mf-personagem-detalhe `Yes`); mf-personagem-detalhe/vite.config.ts:10-17; mf-personagem-detalhe/src/PersonagemDetalhe.tsx:22-53 |
| 7 | README.md:15 | "mf-navbar/ […] Microfrontend: Navbar with navigation and user info" | structure | corroborated | 3.4.3 (mf-navbar `Yes`); mf-navbar/vite.config.ts:10-17; mf-navbar/src/Navbar.tsx:58, 111-125 |
| 8 | README.md:33 | "Each microfrontend is an independent project (with its own package.json)." | independence | corroborated | 3.4.3 (each unit’s manifest, entry and build); mf-dashboard/src/App.tsx:3-7; mf-navbar/src/App.tsx:4-20; mf-personagem-detalhe/src/App.tsx:1-7; mf-login/src/App.tsx:6-14 |
| 9 | README.md:80 | "The root-app will run on http://localhost:5000 […] consuming the microfrontends remotely from their preview servers." | composition | contradicted | root-app/vite.config.ts:7-24, 41-42; root-app/.env:1; root-app/.env.local.bkp:1 |
| 10 | README.md:87 | "Navbar (mf-navbar): […] federated integration" | composition | corroborated | 3.4.5 #1; mf-navbar/vite.config.ts:10-17; root-app/src/App.tsx:5, 58-60 |
| 11 | README.md:92 | "Basic global state (user/token via localStorage)" | composition | corroborated | root-app/src/App.tsx:10-12, 36-45, 59-75; mf-login/src/LoginForm.tsx:20-23 |
| 12 | README.md:98 | "[x] Integrated login via MFE" | composition | corroborated | 3.4.5 #2; root-app/src/App.tsx:6, 36-40, 64-67; mf-login/src/App.tsx:13-14 |
| 13 | mf-navbar/src/App.tsx:15 | "Em produção, user e onLogout viriam via props do root-app ou de um context global" (English translation: "in production, user and onLogout would come through root-app props or global context") | composition | corroborated | root-app/src/App.tsx:42-45, 59; mf-navbar/vite.config.ts:13-14; mf-navbar/src/Navbar.tsx:71 |
| 14 | mf-navbar/src/App.tsx:21 | "esse microfrontend só expõe a Navbar" (English translation: "this microfrontend only exposes Navbar") | composition | corroborated | mf-navbar/vite.config.ts:13-15; root-app/src/App.tsx:5 |
| 15 | roadmap.md:29 | "[x] Permitir clicar em um card para visualizar detalhes no mf-personagem-detalhe" (English translation: "completed: allow card click to view details in mf-personagem-detalhe") | composition | corroborated | 3.4.5 #3-4; mf-dashboard/src/Dashboard.tsx:95; root-app/src/App.tsx:20-28, 73-84 |
| 16 | root-app/src/pages/Sobre.tsx:33 | "Tecnologias: React 18" (English translation: "Technologies: React eighteen") | structure | contradicted | root-app/package.json:14-15; mf-dashboard/package.json:15-16; mf-login/package.json:14-15; mf-navbar/package.json:14-15; mf-personagem-detalhe/package.json:15-16 |
| 17 | root-app/src/pages/Sobre.tsx:33 | "integração com a API pública Rick and Morty" (English translation: "integration with public Rick and Morty API") | other | corroborated | mf-dashboard/src/Dashboard.tsx:17, 47-59; mf-personagem-detalhe/src/PersonagemDetalhe.tsx:22, 35-53 |

## Observations

**1. .github/workflows/deploy.yml:1.** Name describes configured destination: job runs build-all.sh and publishes `./dist` through `peaceiris/actions-gh-pages@v4` (.github/workflows/deploy.yml:19-27). Script builds five units, copying host to output root (build-all.sh:8-23). Corroborates joint Pages deployment configuration without claiming validated remote execution. Still-open tasks at README.md:104 and roadmap.md:73-89 do not negate artifact.

**2. README.md:3.** Technology combination is implemented: React, TailwindCSS and federation plugins in host/dashboard (root-app/vite.config.ts:1-4, 28-35; mf-dashboard/vite.config.ts:1-17), plus four 3.4.5 relationships. Title (README.md:1), technology list (README.md:22-25), generic integration (README.md:90) and application presentation (root-app/src/pages/Sobre.tsx:26, 33) repeat description. Second README.md:3 sentence presents modularity, scalability and maintenance as goals; concrete independence appears in claim 8.

**3. README.md:11.** Annotated tree assigns container/orchestrator role to root-app. Four remote imports and rendering navbar/screens in routes confirm role (root-app/src/App.tsx:5-8, 58-96).

**4. README.md:12.** mf-login exposes App through federation, switching LoginForm/SignupForm (mf-login/vite.config.ts:13-14; mf-login/src/App.tsx:24-33). README.md:86 details same functional role. Host login integration is distinct property in claim 12.

**5. README.md:13.** Dashboard component is exposed by remote, mounted on main route after login (mf-dashboard/vite.config.ts:13-14; root-app/src/App.tsx:69-77). README.md:88, 100 and roadmap.md:24 repeat unit existence/role; future API-integration qualification is outdated given existing fetch (mf-dashboard/src/Dashboard.tsx:17, 47-59).

**6. README.md:14.** Unit exposes PersonagemDetalhe, fetching character by ID from indicated API (mf-personagem-detalhe/vite.config.ts:13-14; mf-personagem-detalhe/src/PersonagemDetalhe.tsx:22, 35-53). README.md:89, 101 and roadmap.md:35 reiterate existence. Dashboard navigation is examined separately in claim 15.

**7. README.md:15.** Exposed module is Navbar (mf-navbar/vite.config.ts:13-14); displays user initials and dashboard/About links (mf-navbar/src/Navbar.tsx:58, 111-116). roadmap.md:16-19 repeats creation and information/logout/navigation roles. Unit’s federation mechanism appears in claim 10.

**8. README.md:33.** Independence here concerns project/development, supported by own manifests, entries and builds in 3.4.3. Dashboard/navbar have mock-data wrappers, detail has local ID and login accepts optional callback (mf-dashboard/src/App.tsx:3-7; mf-navbar/src/App.tsx:4-20; mf-personagem-detalhe/src/App.tsx:7; mf-login/src/App.tsx:6-14). Presentation repeats autonomy of parts (root-app/src/pages/Sobre.tsx:30). Claims no separate deployment: 3.4.6 records joint publication through sole workflow.

**9. README.md:80.** Host configures port 5000 and preview URLs under `IS_LOCAL=true` (root-app/vite.config.ts:9-24, 41-42). However active file has `IS_LOCAL=false` (root-app/.env:1), selecting Pages remotes; true value is in `.bkp` file (root-app/.env.local.bkp:1). Claim about local consumption following documented commands is contradicted by current selection. Explicit local environment activation would be necessary; README.md:75-77 commands do not switch it.

**10. README.md:87.** Host imports `mf_navbar/Navbar`, mounting with props within Suspense (root-app/src/App.tsx:5, 58-60), matching remote exposed module (mf-navbar/vite.config.ts:13-14). README.md:99 repeats federated navbar displaying authenticated user.

**11. README.md:92.** Storage is effectively used in multiple units: mf-login writes token/returns payload, while host writes/removes token and user (mf-login/src/LoginForm.tsx:20-23; root-app/src/App.tsx:36-45). Host reads user initially and passes data to remotes through props (root-app/src/App.tsx:10-12, 59, 73-75). Confirms described basic state without assuming shared context or token validated in all remotes. Host storage listener is at root-app/src/App.tsx:48-54; review 3.4.4 distinguishes it from inter-unit composition.

**12. README.md:98.** Login remote loads, receiving `onAuthSuccess={handleLogin}`; callback updates host storage/state (root-app/src/App.tsx:6, 36-40, 64-67). Exposed App forwards payload to callback (mf-login/src/App.tsx:13-14). roadmap.md:8 repeats root-app-integrated login screen.

**13. mf-navbar/src/App.tsx:15.** Comment offers root-app props or global context as alternatives. Implemented path is props: host passes `user` and `handleLogout`, clearing storage/state (root-app/src/App.tsx:42-45, 59). Commented file is local wrapper; federation directly exposes Navbar.tsx (mf-navbar/vite.config.ts:13-14), whose button calls `onLogout` (mf-navbar/src/Navbar.tsx:71). Context alternative existence is not inferred.

**14. mf-navbar/src/App.tsx:21.** Exposed-surface claim is literal: `exposes` contains only `./Navbar`, pointing to src/Navbar.tsx (mf-navbar/vite.config.ts:13-15). Consumer uses exactly this module (root-app/src/App.tsx:5).

**15. roadmap.md:29.** Click calls callback with ID (mf-dashboard/src/Dashboard.tsx:95). Host navigates to `/personagem/:id`, reads parameter and passes it to detail remote (root-app/src/App.tsx:20-28, 73-84). Host mediates integration; no direct remote-to-remote import required. Unchecked tasks at README.md:102 and roadmap.md:40, 48 repeat integration as future work although path exists in snapshot.

**16. root-app/src/pages/Sobre.tsx:33.** Presentation names React 18; five manifests declare React/React DOM `^19.1.0` (root-app/package.json:14-15; mf-dashboard/package.json:15-16; mf-login/package.json:14-15; mf-navbar/package.json:14-15; mf-personagem-detalhe/package.json:15-16). Specific contradicted version claim, distinct from generic React description in claim 2. Other page-listed technologies repeat examined combination.

**17. root-app/src/pages/Sobre.tsx:33.** Presentation attributes public API integration to application, repeated in data attribution at root-app/src/pages/Sobre.tsx:40. Two remotes use same external backend: dashboard lists characters, detail queries ID (mf-dashboard/src/Dashboard.tsx:17, 47-59; mf-personagem-detalhe/src/PersonagemDetalhe.tsx:22, 35-53). Fetches corroborate collective dependency; no API access/availability validation was needed.

## Summary

Claims: 17 (corroborated: 15, partial: 0, contradicted: 2, uncorroborated: 0). Themes: (structure: 7, composition: 7, build-deploy: 1, independence: 1, other: 1).
