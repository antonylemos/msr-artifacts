---
schema: 1
id: 1254311775
full_name: kamulupraneeth/nextjs-mfe-platform
commit: 750571ab7142f074b39122b82f94eaf5dc4181fa
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

# 381 — kamulupraneeth/nextjs-mfe-platform

## Repository overview

Three Next.js applications with own entries/builds (#8–#10, #13–#15) form Multi-Zones composition through server routing. Shell declares zone addresses/page-asset rules (#1); construct recorded in 3.4.4 (#7) implements active analytics-dashboard/workspace-document relationships (#11–#12). Each zone responds with own document. Configuration separates asset prefixes/also forwards analytics metrics API. No inspected-technology dependency in 3.4.2, so no technology-dimension observation.

Separate builds support unit boundaries but independent deployment/versioning unobserved (#13–#15). Production URLs intended parameters without publication artifact. Five postMessage operations between analytics page/worker (#2–#6), no inter-frontend communication. API claim also concerns own-zone backend (#20).

Accessible documentation confirms unit roles/forwarding (#16, #18–#19, #21–#23, #25–#28), but rendering-inside-gateway/shared-navbar comments contradicted by separate layouts (#17, #24). History clarifies comments arose alongside separation (#30). Sole historical uncertainty whether external worker used in earlier version (#29), not making snapshot architecture ambiguous. Root README unused: 3.4.7 records acquisition removal through preset:binaries.

## Observations

### 1. host-shell/next.config.ts:3-52

**Observation:** Exported configuration declares `ANALYTICS_URL`, `WORKSPACE_URL` obtained from `PRODUCTION_ANALYTICS_URL`, `PRODUCTION_WORKSPACE_URL`, with local defaults. `rewrites()` returns `beforeFiles` with targets for `/analytics`, `/analytics/api/metrics`, `/analytics/:path`, `/analytics-assets/_next/:path*`, and `/workspace`, `/workspace/:path*`, `/workspace-assets/_next/:path*`.

**Interpretation:** Shell configuration resolves two zones through URLs/forwards paths and assets under host origin.

**Note:** Single host-shell unit block deduplicated across origins. Table-cited zone next.config.ts files declare only basePath/assetPrefix: own paths/asset publication without another unit/remote URL. Remain in structure, composition/build-deploy without extra dimension 2 observation. Development ports only corroborate targets.

### 2. analytics-dashboard/public/workers/filterWorker.js:2-7; analytics-dashboard/src/app/page.tsx:26-54

**Observation:** Handler `self.onmessage` returns `logs` through `self.postMessage(logs)` on empty search. Page instantiates inline Blob-URL worker rather than this file.

**Interpretation:** Worker → main-thread communication inside analytics; review records unused external file without inter-unit composition.

### 3. analytics-dashboard/public/workers/filterWorker.js:14-23; analytics-dashboard/src/app/page.tsx:46-54

**Observation:** After filtering logs, external file calls `self.postMessage(filteredLogs)`. Page uses inline worker.

**Interpretation:** Filtering return belongs to same unit; unused external file shows no inter-frontend messages.

### 4. analytics-dashboard/src/app/page.tsx:26-30; analytics-dashboard/src/app/page.tsx:46-54

**Observation:** workerCode string contains `self.postMessage(logs)` for empty search. Becomes Blob/Worker; page handler updates `setFilteredLogs`.

**Interpretation:** Inline-worker return to analytics page rather than inter-unit communication.

### 5. analytics-dashboard/src/app/page.tsx:26-54

**Observation:** workerCode filters logs/returns `filtered` through `self.postMessage(filtered)`. Worker created from string/response updates page state.

**Interpretation:** Construct participates in internal analytics filtering without frontend composition.

### 6. analytics-dashboard/src/app/page.tsx:46-54; analytics-dashboard/src/app/page.tsx:94-99

**Observation:** Effect sends `{ logs: tableLogs, searchTerm }` through `workerRef.current.postMessage` to Blob-URL-created worker.

**Interpretation:** Page → worker send inside own unit; postMessage false positive for inter-microfrontend communication.

### 7. host-shell/next.config.ts:3-6; host-shell/next.config.ts:10-46; analytics-dashboard/next.config.ts:5-6; workspace-document/next.config.ts:5-7

**Observation:** Function `rewrites()` forwards analytics/workspace paths to ANALYTICS_URL/WORKSPACE_URL including asset paths. Zones declare matching basePath/assetPrefix.

**Interpretation:** Route table links shell to two target applications. Manual 3.4.4 construct materializes Multi-Zones composition through server forwarding.

**Note:** Manual 3.4.4 row has own observation despite being in configuration block #1. Strength follows guidance for route linking path to target unit.

### 8. analytics-dashboard; analytics-dashboard/package.json:2-8; analytics-dashboard/src/app/layout.tsx:9; analytics-dashboard/src/app/page.tsx:16; analytics-dashboard/next.config.ts:3-7

**Observation:** Directory has own manifest, App Router RootLayout/initial page, script `build: next build`. Configuration declares basePath `/analytics`, assetPrefix `/analytics-assets`.

**Interpretation:** Frontend unit with own entry/build boundary. No workspace declaration.

### 9. host-shell; host-shell/package.json:2-8; host-shell/src/app/layout.tsx:17; host-shell/src/app/page.tsx:5; host-shell/next.config.ts:8-50

**Observation:** Directory has own manifest, App Router RootLayout/initial page, script `build: next build`. Configuration declares rewrites for two zones.

**Interpretation:** Frontend unit with own entry/build boundary. No workspace declaration.

### 10. workspace-document; workspace-document/package.json:2-8; workspace-document/src/app/layout.tsx:20; workspace-document/src/app/page.tsx:8; workspace-document/next.config.ts:3-8

**Observation:** Directory has own manifest, App Router RootLayout/initial page, script `build: next build`. Configuration declares basePath `/workspace`, assetPrefix `/workspace-assets`.

**Interpretation:** Frontend unit with own entry/build boundary. No workspace declaration.

### 11. host-shell/next.config.ts:3-4; host-shell/next.config.ts:10-33; analytics-dashboard/next.config.ts:5-6; analytics-dashboard/src/app/page.tsx:16; analytics-dashboard/src/app/api/metrics/route.ts:5

**Observation:** Shell forwards `/analytics`, `/analytics/api/metrics`, `/analytics/:path`, `/analytics-assets/_next/:path*` to ANALYTICS_URL. Prefixes match analytics-dashboard basePath/assetPrefix, with page/metrics handler.

**Interpretation:** Active host-shell → analytics-dashboard Next.js Multi-Zones relationship recorded as type/mechanism other. Zone responds with entire page; `/analytics/:path` covers one segment.

### 12. host-shell/next.config.ts:5-6; host-shell/next.config.ts:10; host-shell/next.config.ts:35-46; workspace-document/next.config.ts:5-7; workspace-document/src/app/page.tsx:8

**Observation:** Shell forwards `/workspace`, `/workspace/:path*`, `/workspace-assets/_next/:path*` to WORKSPACE_URL. Prefixes match workspace-document basePath/assetPrefix.

**Interpretation:** Active host-shell → workspace-document Multi-Zones forwarding relationship recorded other. Zone provides own document.

### 13. analytics-dashboard/package.json:3-8; analytics-dashboard/next.config.ts:3-7

**Observation:** Manifest of analytics-dashboard declares `build: next build`, `start: next start`, private package/version 0.1.0. Review records separate build, unobserved deployment, independent versioning No.

**Interpretation:** Own application build boundary without independent publication/versioning evidence. Shell’s intended production URLs demonstrate no completed deployment.

### 14. host-shell/package.json:3-8; host-shell/next.config.ts:8-50

**Observation:** Manifest of host-shell declares `build: next build`, `start: next start`, private package/version 0.1.0. Review records separate build, unobserved deployment, independent versioning No.

**Interpretation:** Own application build boundary without independent publication/versioning evidence. Shell’s intended production URLs demonstrate no completed deployment.

### 15. workspace-document/package.json:3-8; workspace-document/next.config.ts:3-8

**Observation:** Manifest of workspace-document declares `build: next build`, `start: next start`, private package/version 0.1.0. Review records separate build, unobserved deployment, independent versioning No.

**Interpretation:** Own application build boundary without independent publication/versioning evidence. Shell’s intended production URLs demonstrate no completed deployment.

### 16. analytics-dashboard/src/app/layout.tsx:6

**Observation:** Description field says “Isolated Micro-Frontend Stream Core”.

**Interpretation:** Isolated frontend unit claim corroborated by structure, build/shell relationship. Proves no deployment.

### 17. analytics-dashboard/src/app/layout.tsx:17

**Observation:** Comment says grids rendered inside gateway frame.

**Interpretation:** Host-layout fitting claim contradicted by separate HTML documents/forwarding relationship.

### 18. analytics-dashboard/src/app/page.tsx:112-113

**Observation:** Page displays “Running independently” and “Proxied dynamically via main Host Route Matrix”.

**Interpretation:** Own execution/proxy access corroborated by separate build/active relationship. No deployment claim.

### 19. host-shell/next.config.ts:15

**Observation:** Comment says base path forwarded to local server at port 3001.

**Interpretation:** /analytics rule/local default corroborate claim; production variable may replace address.

### 20. host-shell/next.config.ts:20

**Observation:** Comment announces explicit proxy API-route matching.

**Interpretation:** Rule forwards metrics API to own-zone backend; backend-access context without inter-frontend messages.

### 21. host-shell/next.config.ts:25

**Observation:** Comment describes Analytics Dashboard subpage forwarding.

**Interpretation:** Rule /analytics/:path corroborates one-segment forwarding without claiming existing subpages/unlimited recursion.

### 22. host-shell/next.config.ts:30

**Observation:** Comment describes JS-bundle forwarding without losing asset paths.

**Interpretation:** Forwarding/zone assetPrefix corroborate path separation without file-delivery test.

### 23. host-shell/src/app/layout.tsx:14

**Observation:** Description field says “Distributed Multi-Zone Orchestrator Container”.

**Interpretation:** Names shell Multi-Zones composition role corroborated by two forwards. Proves no external-infrastructure distribution.

### 24. host-shell/src/app/layout.tsx:27

**Observation:** Comment describes navbar shared/atop layout.

**Interpretation:** Position confirmed but inter-unit sharing contradicted: only shell imports/renders GlobalNavbar; zones have own layouts.

### 25. host-shell/src/app/page.tsx:73

**Observation:** Comment describes links to two active MFE modules.

**Interpretation:** Two units/active relationships corroborate card targets; active means configuration/code present, without observed service availability.

### 26. host-shell/src/components/GlobalNavbar.tsx:38

**Observation:** Comment describes replacing Link with a tag to avoid client-cache blocking.

**Interpretation:** Navbar a tags corroborate document navigation to zones. Cache intent no measurement; homepage cards retain Link.

### 27. workspace-document/next.config.ts:4

**Observation:** Comment describes editor submodule base-path configuration.

**Interpretation:** basePath /workspace/shell forwarding corroborate zone route boundary.

### 28. workspace-document/next.config.ts:6

**Observation:** Comment describes prefix to avoid shell chunk collisions.

**Interpretation:** assetPrefix/matching shell rule corroborate asset-path separation without joint compilation/build-result demonstration.

### 29. c201365 2026-05-31 (analytics-dashboard/public/workers/filterWorker.js, analytics-dashboard/src/app/page.tsx)

**Observation:** History review records external file creation/page change in c201365, message announcing inline worker. Old page content absent locally; snapshot instantiates Blob worker.

**Interpretation:** External file earlier usage versus never-connected origin remains inconclusive. Past uncertainty does not change snapshot internal-message/unused-external-file reading.

### 30. 1dedac6 2026-05-30 (analytics-dashboard/src/app/layout.tsx, host-shell/src/app/layout.tsx); a2939d5 2026-05-31 (analytics-dashboard/src/app/layout.tsx, host-shell/src/app/layout.tsx, host-shell/src/components/GlobalNavbar.tsx)

**Observation:** Available 1dedac6 contents already show analytics/shell own HTML documents. In a2939d5 shell receives GlobalNavbar/shared-bar comment, analytics receives frame comment while retaining own document. Initial shell configuration unavailable.

**Interpretation:** Point clarified for layouts: comments arise alongside document separation without evidence of earlier analytics using shell layout/navbar. Explains two contradicted claims without changing observed architecture.

## Classification

| # | Origin | Dimension | Type | Approach | Evidence | Strength | Relationships |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.3 (host-shell, Markers, Build); 3.4.4 (host-shell/next.config.ts:10, File:line, Observation); 3.4.5 #1, #2 (Configuration, Code); 3.4.6 #1, #3 (Where served); 3.4.6 #2 (Artifacts); 3.4.7 #2-#8, #12, #13 (Evidence) | 2 configuration | configuration | other | architectural | strong | configures #7; configures #9; configures #11; configures #12 |
| 2 | 3.4.4 (analytics-dashboard/public/workers/filterWorker.js:7) | 3 code | source code | — | context | weak | — |
| 3 | 3.4.4 (analytics-dashboard/public/workers/filterWorker.js:23) | 3 code | source code | — | context | weak | — |
| 4 | 3.4.4 (analytics-dashboard/src/app/page.tsx:30) | 3 code | source code | — | context | weak | — |
| 5 | 3.4.4 (analytics-dashboard/src/app/page.tsx:41) | 3 code | source code | — | context | weak | — |
| 6 | 3.4.4 (analytics-dashboard/src/app/page.tsx:97) | 3 code | source code | — | context | weak | — |
| 7 | 3.4.4 (host-shell/next.config.ts:10) | 3 code | configuration | other | architectural | strong | implements #11; implements #12 |
| 8 | 3.4.3 (analytics-dashboard) | 4 structure | directory | — | architectural | moderate | — |
| 9 | 3.4.3 (host-shell) | 4 structure | directory | — | architectural | moderate | — |
| 10 | 3.4.3 (workspace-document) | 4 structure | directory | — | architectural | moderate | — |
| 11 | 3.4.5 #1 | 5 composition | configuration | other | architectural | strong | links #9; links #8 |
| 12 | 3.4.5 #2 | 5 composition | configuration | other | architectural | strong | links #9; links #10 |
| 13 | 3.4.6 #1 | 6 build-deploy | manifest | — | architectural | moderate | publishes #8 |
| 14 | 3.4.6 #2 | 6 build-deploy | manifest | — | architectural | moderate | publishes #9 |
| 15 | 3.4.6 #3 | 6 build-deploy | manifest | — | architectural | moderate | publishes #10 |
| 16 | 3.4.7 #1 | 7 documentation | comment | — | architectural | weak | corroborates #8; corroborates #11; corroborates #13 |
| 17 | 3.4.7 #2 | 7 documentation | comment | — | architectural | weak | contradicts analytics-dashboard/src/app/layout.tsx:14-20; contradicts host-shell/src/app/layout.tsx:23-32; contradicts #11 |
| 18 | 3.4.7 #3 | 7 documentation | comment | — | architectural | weak | corroborates #13; corroborates #11; corroborates analytics-dashboard/package.json:6-8 |
| 19 | 3.4.7 #4 | 7 documentation | comment | other | architectural | weak | corroborates #11; corroborates #1 |
| 20 | 3.4.7 #5 | 7 documentation | comment | — | context | weak | corroborates #1; corroborates analytics-dashboard/src/app/page.tsx:68; corroborates analytics-dashboard/src/app/api/metrics/route.ts:5-8 |
| 21 | 3.4.7 #6 | 7 documentation | comment | other | architectural | weak | corroborates #11; corroborates #1 |
| 22 | 3.4.7 #7 | 7 documentation | comment | other | architectural | weak | corroborates #11; corroborates analytics-dashboard/next.config.ts:6 |
| 23 | 3.4.7 #8 | 7 documentation | comment | other | architectural | weak | corroborates #11; corroborates #12 |
| 24 | 3.4.7 #9 | 7 documentation | comment | — | architectural | weak | contradicts host-shell/src/app/layout.tsx:4,27-31; contradicts analytics-dashboard/src/app/layout.tsx:1-22; contradicts workspace-document/src/app/layout.tsx:1-33 |
| 25 | 3.4.7 #10 | 7 documentation | comment | — | architectural | weak | corroborates #8; corroborates #10; corroborates #11; corroborates #12; corroborates host-shell/src/app/page.tsx:6-23,74-79 |
| 26 | 3.4.7 #11 | 7 documentation | comment | — | architectural | weak | corroborates host-shell/src/components/GlobalNavbar.tsx:10-14,41-52 |
| 27 | 3.4.7 #12 | 7 documentation | comment | other | architectural | weak | corroborates #12; corroborates workspace-document/next.config.ts:5 |
| 28 | 3.4.7 #13 | 7 documentation | comment | other | architectural | weak | corroborates #12; corroborates workspace-document/next.config.ts:7; corroborates #1 |
| 29 | 3.4.8 #1 | 8 history | history | — | context | weak | explains #2; explains #3; explains #4; explains #5; explains #6 |
| 30 | 3.4.8 #2 | 8 history | history | — | architectural | weak | explains #17; explains #24 |

## Summary

Observations: 30. Dimensions (technology: 0, configuration: 1, code: 6, structure: 3, composition: 2, build-deploy: 3, documentation: 13, history: 2). Strength (strong: 4, moderate: 6, weak: 20, ambiguous: 0). Evidence (technological: 0, architectural: 23, context: 7).
