---
schema: 1
id: 1158060733
full_name: sharif7761/Micro-frontend-project-with-react-js
commit: cb2083fd77ddcb4d6493af653e0ce523ba0be010
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

# 234 — sharif7761/Micro-frontend-project-with-react-js

## Repository overview

Snapshot has seven own English documents: ARCHITECTURE.md, QUICK_START.md, README.md, STRUCTURE.md, READMEs in common_simple, core_simple, users_simple. All read entirely; no templates/third-party documents. Diagrams, annotated trees/instructions describe three applications: routing shell, users unit, federated component library. Five reviews 3.4.2–3.4.6 have `final` status, same ID/commit as classification/acquisition. Documentation matches three observed federation relationships; main limitations: generalized lazy loading, singleton attributed to common components, shell visual Button use, deployment promises without artifacts.

Repeated architectural doc-* occurrences associated with claims/Observations below, not additional claims: titles ARCHITECTURE.md:42, :150, :183, README.md:1, :103, QUICK_START.md:76, STRUCTURE.md:51 (“Module Federation Relationships”, doc-integration-technology), common_simple/README.md:19, core_simple/README.md:19, :64, users_simple/README.md:18; directory names ARCHITECTURE.md:192, README.md:8, STRUCTURE.md:6; command paths QUICK_START.md:8, :20, :31, :42, README.md:60; file links QUICK_START.md:77-85, :126-127; external links README.md:178, :180; documentation catalog STRUCTURE.md:221; teaching objectives STRUCTURE.md:191-193, purpose at :242; future extension README.md:170, STRUCTURE.md:205. Objectives STRUCTURE.md:194-198 repeat shell/lazy-loading/sharing/own-execution properties in table. New-MFE recommendation ARCHITECTURE.md:265 also prospective; “easy”, responsibility separation/complexity at :265-270 qualitative assessments without additional verifiable current-composition property. Size/performance gains ARCHITECTURE.md:180-181 justify lazy loading in 11 without metrics; conflict prevention :175 justifies singleton policy 12, not demonstrated conflict resolution.

Command/import/configuration blocks yield no rows: README.md:58-95, :117-130; STRUCTURE.md:115-137, :160-174; QUICK_START.md:7-49, :98-101; common_simple/README.md:21-32, :40-48; core_simple/README.md:22-33; users_simple/README.md:21-38. Diagrams/annotated trees treated as text, including predicted build output. JSONPlaceholder integration internal to users unit (users_simple/src/App.tsx:18-32); data-flow diagrams ARCHITECTURE.md:100-135/API descriptions add no frontend link. State/version/future-improvement recommendations (ARCHITECTURE.md:272-273; README.md:168-174; STRUCTURE.md:201-210) demonstrate no current mechanisms.

Also read comments/descriptive fields of four package.json, three rsbuild.config.ts, entries/bootstraps, three App.tsx, Button/Card components cited previously. Root description (package.json:5) repeats claim 25; keywords mentions only. Comment core_simple/src/App.tsx:8 repeats claim 2; others TypeScript suppressions (core_simple/src/App.tsx:3-5; users_simple/src/App.tsx:2-4). Displayed texts (common_simple/src/App.tsx:8-9; core_simple/src/App.tsx:16-21; users_simple/src/App.tsx:38) repeat exposures/roles/consumption below. No Dockerfile/workflow in inventory. Static analysis without installation/build/execution/network.

## Claims

| # | Document | Claim | Theme | Corroboration | Evidence |
|---|---|---|---|---|---|
| 1 | ARCHITECTURE.md:13-19 | “CORE SIMPLE (Shell App) / React Router / Module Federation Host” | structure | corroborated | 3.4.3 Units core_simple; 3.4.5 #1, #2; core_simple/rsbuild.config.ts:8-14; core_simple/src/App.tsx:46-60 |
| 2 | ARCHITECTURE.md:18 | “Lazy Loading of Micro Frontends” | composition | corroborated | 3.4.5 #1; core_simple/src/App.tsx:8-9; core_simple/src/App.tsx:56-61 |
| 3 | ARCHITECTURE.md:27-35 | “COMMON SIMPLE [...] Exposes: [...] Button [...] Card” | composition | corroborated | 3.4.5 #2, #3; common_simple/rsbuild.config.ts:9-14 |
| 4 | ARCHITECTURE.md:27-34 | “USERS SIMPLE [...] Exposes: [...] UserList” | structure | corroborated | 3.4.3 Units users_simple; 3.4.5 #1; users_simple/rsbuild.config.ts:9-13; users_simple/src/App.tsx:14-60 |
| 5 | ARCHITECTURE.md:36-38 | “Consumes: [...] common/Button [...] common/Card” | composition | corroborated | 3.4.5 #3; users_simple/src/App.tsx:3-5; users_simple/src/App.tsx:40-53 |
| 6 | ARCHITECTURE.md:141 | “core_simple [...] common_simple/Button” | composition | corroborated | core_simple/src/App.tsx:3-4; core_simple/rsbuild.config.ts:12 |
| 7 | ARCHITECTURE.md:142 | “core_simple [...] common_simple/Card” | composition | corroborated | 3.4.5 #2; core_simple/src/App.tsx:6; core_simple/src/App.tsx:15-26; users_simple/src/App.tsx:49 |
| 8 | ARCHITECTURE.md:151-153 | “Rsbuild [...] @module-federation/rsbuild-plugin [...] Module Federation v2 support” | composition | corroborated | 3.4.2 Dependencies; common_simple/package.json:16-18; core_simple/package.json:17-19; users_simple/package.json:17-19; common_simple/rsbuild.config.ts:1-8 |
| 9 | ARCHITECTURE.md:166 | “Each micro frontend exposes modules via Module Federation” | composition | corroborated | common_simple/rsbuild.config.ts:11-14; users_simple/rsbuild.config.ts:11-13; core_simple/rsbuild.config.ts:8-29 |
| 10 | ARCHITECTURE.md:167-168 | “Exposed at runtime via `remoteEntry.js` / Can be consumed by other apps” | composition | corroborated | 3.4.5 #1, #2, #3; common_simple/rsbuild.config.ts:9-14; users_simple/rsbuild.config.ts:9-16; core_simple/rsbuild.config.ts:11-14 |
| 11 | ARCHITECTURE.md:169 | “Loaded on-demand” | composition | contradicted | core_simple/src/App.tsx:4-9; core_simple/src/App.tsx:15-26; users_simple/src/App.tsx:3-5 |
| 12 | ARCHITECTURE.md:172-175 | “`react` and `react-dom` are singletons / Only loaded once across all micro frontends” | composition | corroborated | common_simple/rsbuild.config.ts:15-24; core_simple/rsbuild.config.ts:15-23; users_simple/rsbuild.config.ts:17-25; common_simple/src/index.tsx:1-2; core_simple/src/bootstrap.tsx:1-2; users_simple/src/bootstrap.tsx:1-2 |
| 13 | ARCHITECTURE.md:184-185 | “Each micro frontend: [...] Can run independently” | independence | corroborated | 3.4.3 Units; common_simple/src/index.tsx:1-10; core_simple/src/index.tsx:1; core_simple/src/bootstrap.tsx:1-10; users_simple/src/index.tsx:1; users_simple/src/bootstrap.tsx:1-10 |
| 14 | ARCHITECTURE.md:186 | “Has its own dev server” | build-deploy | corroborated | 3.4.6 #1, #2, #3; common_simple/package.json:7; core_simple/package.json:7; users_simple/package.json:7; common_simple/rsbuild.config.ts:28-30; core_simple/rsbuild.config.ts:31-33; users_simple/rsbuild.config.ts:33-35 |
| 15 | ARCHITECTURE.md:187 | “Can be deployed separately” | build-deploy | uncorroborated | — |
| 16 | ARCHITECTURE.md:194 | “Root scripts for convenience” | build-deploy | corroborated | package.json:7-14; 3.4.6 #1, #2, #3 |
| 17 | ARCHITECTURE.md:201 | “App.tsx [...] Demo app” | structure | corroborated | common_simple/src/App.tsx:5-23; common_simple/src/index.tsx:3-8; 3.4.3 Units common_simple |
| 18 | ARCHITECTURE.md:250 | “Rsbuild checks if common components are already loaded (singleton)” | composition | contradicted | common_simple/rsbuild.config.ts:11-24; core_simple/rsbuild.config.ts:11-27; users_simple/rsbuild.config.ts:11-29 |
| 19 | ARCHITECTURE.md:255 | “Each micro frontend is a separate bundle” | build-deploy | corroborated | 3.4.6 #1, #2, #3; common_simple/package.json:8; core_simple/package.json:8; users_simple/package.json:8 |
| 20 | ARCHITECTURE.md:258 | “Multiple remotes can load in parallel” | composition | uncorroborated | — |
| 21 | ARCHITECTURE.md:262 | “Teams can work on separate micro frontends” | independence | corroborated | 3.4.3 Units; common_simple/package.json:6-10; core_simple/package.json:6-10; users_simple/package.json:6-10; core_simple/rsbuild.config.ts:11-14; users_simple/rsbuild.config.ts:14-16 |
| 22 | ARCHITECTURE.md:264 | “Each app can use different versions (carefully)” | other | uncorroborated | — |
| 23 | ARCHITECTURE.md:274 | “Failures in one MFE can affect others” | composition | corroborated | core_simple/src/App.tsx:4-9; core_simple/src/App.tsx:46-64; users_simple/src/App.tsx:3-5; users_simple/src/App.tsx:35-56 |
| 24 | QUICK_START.md:109 | “See changes reflect in both users_simple and core_simple” | composition | corroborated | users_simple/src/App.tsx:3, :40-42; users_simple/rsbuild.config.ts:11-13; core_simple/src/App.tsx:9, :59 |
| 25 | README.md:3 | “A minimal micro frontend architecture to understand Module Federation structure” | structure | corroborated | 3.4.3 Units; 3.4.5 #1, #2, #3; core_simple/src/App.tsx:9; core_simple/src/App.tsx:59 |
| 26 | README.md:153 | “Components from common_simple are eagerly loaded for better performance” | composition | partial | core_simple/src/App.tsx:4-6; users_simple/src/App.tsx:3-5; core_simple/src/index.tsx:1; users_simple/src/index.tsx:1 |
| 27 | README.md:161 | “The shell app (core_simple) needs other apps to be running first” | composition | corroborated | 3.4.5 #1, #2, #3; core_simple/rsbuild.config.ts:11-14; users_simple/rsbuild.config.ts:14-16; core_simple/src/App.tsx:6-9 |
| 28 | STRUCTURE.md:142-154 | “After running `npm run build:all`, each app produces: [...] dist/ [...] remoteEntry.js” | build-deploy | partial | 3.4.6 #1, #2, #3; package.json:11-14; common_simple/rsbuild.config.ts:10; core_simple/rsbuild.config.ts:10; users_simple/rsbuild.config.ts:10 |
| 29 | common_simple/README.md:55 | “Hot reload will update all consuming apps” | composition | uncorroborated | — |
| 30 | core_simple/README.md:9 | “Routing between different micro frontends” | structure | contradicted | core_simple/src/App.tsx:57-60; users_simple/rsbuild.config.ts:11-13; common_simple/rsbuild.config.ts:11-14 |
| 31 | core_simple/README.md:17 | “Uses Button and Card components from common_simple” | composition | contradicted | core_simple/src/App.tsx:4-6; core_simple/src/App.tsx:15-26; core_simple/src/App.tsx:1-68 |

## Observations

**1. Document.** Shell has two remotes, controls navigation. Role/routing repeats ARCHITECTURE.md:215-219, :233-235; QUICK_START.md:72; README.md:10, :39-43, :109, :137, :145; STRUCTURE.md:39-48, :77-79, :101, :194, :198; core_simple/README.md:1-9, :51-55, :62. One remote route `/users`, local Home (core_simple/src/App.tsx:57-60), rather than multiple remote functional slices.

**2. Document.** Shell lazy loads UserList at `/users`. ARCHITECTURE.md:65-97, :239-249 flow, core_simple/src/App.tsx:8 comment, README.md:30, :42, :152, STRUCTURE.md:78, :195, users_simple/README.md:44-46 repeat link; core_simple/README.md:10, :15, :44 too. Future steps core_simple/README.md:64-68 explain extension of mechanism without another current functional remote.

**3. Document.** Common_simple publishes two federated components, actual consumers. Repetitions: ARCHITECTURE.md:196-203, :226-227; QUICK_START.md:70; README.md:9, :18-24, :107; STRUCTURE.md:14-26, :55-62, :88; common_simple/README.md:1, :7-17; common_simple/src/App.tsx:8-9; core_simple/src/App.tsx:20. Configuration/use examples common_simple/README.md:21-25, :40-48, README.md:117-130, STRUCTURE.md:115-120 code blocks without extra rows.

**4. Document.** Functional users unit exposes entire App as UserList. Repeated ARCHITECTURE.md:143, :207-211, :229-231; README.md:11, :27-33, :108; STRUCTURE.md:28-37, :69-80, :89, :230; users_simple/README.md:1, :7, :20-24; core_simple/src/App.tsx:21. JSONPlaceholder query (users_simple/src/App.tsx:25) functional detail, not another frontend unit.

**5. Document.** Users_simple imports/renders common_simple Button/Card. Drawing abbreviates names, actual references `common_simple`. Repetitions: ARCHITECTURE.md:81-96, :144-145, :230, :249; QUICK_START.md:63, :71; README.md:29, :35-37, :108; STRUCTURE.md:31-37, :71-73; users_simple/README.md:8, :27-31; users_simple/src/App.tsx:38. STRUCTURE.md:123-129 reproduces configuration.

**6. Document.** Dependency graph matches shell Button import. Confirms declared dependency without rendering: entire core_simple/src/App.tsx:1-68 never mounts Button. Same declared consumption ARCHITECTURE.md:234; README.md:45-48, :109; STRUCTURE.md:42, :48, :72-74, :90-91; core_simple/README.md:53. Explicit visual-use claim in 31.

**7. Document.** Card actually used by shell/users_simple, confirming sharing across consumers. Shell-use repetitions: QUICK_START.md:62; README.md:47, :109; STRUCTURE.md:73, :90; core_simple/README.md:54. Consumption configuration STRUCTURE.md:133-137 and core_simple/README.md:22-26 yields no additional row.

**8. Document.** Three projects use Rsbuild with named Module Federation plugin. Snapshot identifies chosen implementation without testing all advertised plugin capabilities. README.md:143-144, STRUCTURE.md:99-100, ARCHITECTURE.md:203, :211, :219 repeat technology/configuration, no other mechanism.

**9. Document.** Within “Remote Modules” section, claim describes exposing providers common_simple/users_simple. Shell only remotes/shared; no extrapolation to host exposures. Explicit in STRUCTURE.md:88-90, zero shell exposures, and 3.4.5 relationships.

**10. Document.** Two providers' container names/remote files complete three relationships. Registration flow ARCHITECTURE.md:55-57, fetch :247-249 match local addresses. No traffic measurement/execution.

**11. Document.** Generalization repeated ARCHITECTURE.md:178-181, :256: not every remote module waits for navigation to import. UserList lazy, Card statically imported in shell/mounted on Home; common components also static users_simple imports. Specific lazy configuration in 2; no initial-size/performance measurements; qualitative gains do not prove measured result.

**12. Document.** Three units use React/ReactDOM, configure both singleton, confirming sharing policy. ARCHITECTURE.md:257, README.md:151, STRUCTURE.md:196 repeat. Snapshot confirms configuration without download measurements or prevention of every possible conflict.

**13. Document.** Each own entry/mounting, no other unit required to mount it. Remote dependencies remain: users_simple needs common_simple, shell references both (users_simple/rsbuild.config.ts:14-16; core_simple/rsbuild.config.ts:11-14). Repetitions: QUICK_START.md:64-66; README.md:30, :150; STRUCTURE.md:197; common_simple/README.md:28-36; users_simple/README.md:34-42, explicit prerequisite.

**14. Document.** Separate development servers/scripts. ARCHITECTURE.md:226-235, QUICK_START.md:14-48, README.md:81-101, STRUCTURE.md:157-177 sequence operational startup instructions; local ports do not demonstrate deployment.

**15. Document.** ARCHITECTURE.md:263, users_simple/README.md:10 repeat independent deployment capability. 3.4.6 records separate builds, no observed deployments for three. No hosting/publishing/pipeline configuration in snapshot inventory. Distinct builds insufficient to prove deployment claim.

**16. Document.** Root delegates installation/development/build to three directories, not fourth frontend/unified build. README.md:12, STRUCTURE.md:8, QUICK_START.md:12 repeat organization/aggregate installation; installation commands no extra claims.

**17. Document.** Common_simple own demonstration page alongside exposed components. STRUCTURE.md:23, QUICK_START.md:65, common_simple/README.md:36 repeat role. Hence structural review counts three applications despite sole functional users remote.

**18. Document.** Text attributes singleton to common components. Button/Card are exposes; singleton in shared for react/react-dom, consumers also react-router-dom. No singleton for Button, Card, common_simple. React dependency reuse in 12 differs from exposed-component singleton configuration.

**19. Document.** Three build targets with own configurations/directories. Corroborated as separate application builds, without reading “a separate bundle” as exactly one JavaScript file; documents also anticipate chunks STRUCTURE.md:149-152.

**20. Document.** Two remotes declared, no snapshot loader coordinating parallel requests or execution record demonstrating capability. Two remote references alone do not confirm parallel-loading strategy.

**21. Document.** Separate projects/entries/local tools provide per-unit development boundaries. Configured communication uses federated modules without importing sources from another directory. Supports structural possibility, not actual distinct teams/autonomous organizational evolution.

**22. Document.** Advertised benefit not demonstrated: three manifests React/ReactDOM ^18.3.1 (common_simple/package.json:11-13; core_simple/package.json:11-14; users_simple/package.json:11-14), shared singletons. No coexisting different-version example. Caveat “carefully”/recommended compatibility ARCHITECTURE.md:273 not proof.

**23. Document.** Consumers depend on federated imports, shell mounts UserList directly; Suspense but no error boundary in components. Loading failure can affect consuming composition. Catch users_simple/src/App.tsx:24-32 handles API query, not remote loading.

**24. Document.** Experiment instructs Button change, predicts visible changes in both apps (QUICK_START.md:107-109), without requiring direct Home use. Users_simple imports/renders component (users_simple/src/App.tsx:3, :40-42), exposes App as UserList (users_simple/rsbuild.config.ts:11-13). Shell loads/mounts UserList at `/users` (core_simple/src/App.tsx:9, :59), same Button visible in shell composition. Chain corroborates without automatic hot-reload propagation proof, addressed in 29.

**25. Document.** MFE demonstration description matches shell, functional remote, federated library. package.json:5, :17-18, core_simple/src/App.tsx:16-21 repeat. STRUCTURE.md:228-230 describes three apps, one users MFE; role distinction compatible with three application boundaries of 3.4.3. Comparison “Original” column not evidence of another snapshot system.

**26. Document.** Common components statically imported by consumers versus lazy UserList; loaded at consumer initialization after asynchronous bootstraps. Supports advance-loading portion. No performance-gain measurement. Configuration eager: true applies to React/ReactDOM, not Button/Card exposes (common_simple/rsbuild.config.ts:11-24).

**27. Document.** Development addresses/imports require available providers for complete composition. QUICK_START.md:89-91, common_simple/README.md:53, core_simple/README.md:35-37, :62, users_simple/README.md:40, :56 repeat operational dependency. Recommended order makes them available, not proof of automatic startup orchestrator.

**28. Document.** Aggregate command triggers three own builds, all configurations naming remoteEntry.js. Output tree includes HTML, asynchronous chunks, conditional CSS, but no generated dist in snapshot. Configuration partially supports without confirming exact resulting tree, particularly shell emission without exposes.

**29. Document.** Rsbuild dev scripts/federated consumers exist, but no record of cross-server propagated updates or specific configuration proving promise across all consumers. No execution to validate.

**30. Document.** Literally promises routing between different MFEs. Sole route-mounted functional MFE users_simple; `/` local Home uses remote Card component. Common_simple not another routed remote page. Navigation/three applications corroborated in 1, not multiple MFE destinations.

**31. Document.** Shell uses Card, never renders Button in App. Unused import explains distinction between dependency graph in 6 and both-component use claim. Button on users route belongs to users_simple composition (users_simple/src/App.tsx:40-42).

## Summary

Claims: 31 (corroborated: 21, partial: 2, contradicted: 4, uncorroborated: 4). Themes: (structure: 5, composition: 18, build-deploy: 5, independence: 2, other: 1).
