---
schema: 1
id: 1202215420
full_name: EnjoyFX/fe_containerize
commit: f05a9de5c996497b2277614bf4cc473456d85b7e
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
  date: 2026-10-21
---

# 002 — EnjoyFX/fe_containerize

## Repository overview

Composition uses no MFE library: dependency review found none, so no technology observation exists. Chain uses only browser/Vite resources:
- **Configuration:** `microfrontend` Vite packages widget as IIFE bundle publishing global `MicroFrontendWidget` (#1).
- **Widget code:** exports `mount` and `unmount` (#2, #3, #6, #7).
- **Host code:** `frontend` passes bundle URL to script-injecting component (#9, #10), calling `mount` and `unmount` through global (#4, #5).
- **Relationship:** results in sole active frontend → microfrontend relationship (#14), between two independently bounded units (#12, #13).

Build/deployment are separate for both applications (#15, #16). Each has image, compose service and chart Deployment. Microfrontend has no own public address: reaches browser through frontend nginx `/mfe/` path.

One misleading signal: a mined bundle-URL finding is interface-displayed YAML text rather than code loading (#8). NestJS backend is context (#11).

Documentation has 11 claims, all corroborated/all weak under protocol criterion. Mainly describes deployment; one concerns only backend proxy (#21, context).

No historical points: history review found no ambiguity to clarify.

## Observations

### 1. microfrontend/vite.config.js:19-39

**Observation:** `build.lib` uses `entry: 'src/main.jsx'`, `name: 'MicroFrontendWidget'`, `fileName: 'widget'` and `formats: ['iife']`, with `cssCodeSplit: false`. Development server uses port 3001, forwarding `/api` to backend.

**Interpretation:** Widget is configured for publication as standalone script exposing API through global.

### 2. microfrontend/src/main.jsx:7-12

**Observation:** `export function mount(container)` creates React root in received element, rendering `Widget`.

**Interpretation:** Widget offers mounting function so another application can insert it into own element.

### 3. microfrontend/src/main.jsx:14-20

**Observation:** `export function unmount(container)` unmounts React root associated with element.

**Interpretation:** Widget offers unmounting function completing lifecycle.

### 4. frontend/src/RemoteWidget.jsx:12-14

**Observation:** After script loads, component calls `window.MicroFrontendWidget.mount(containerRef.current)`.

**Interpretation:** Host mounts another unit’s widget through global name.

### 5. frontend/src/RemoteWidget.jsx:24-26

**Observation:** Effect cleanup calls `window.MicroFrontendWidget.unmount(containerRef.current)`.

**Interpretation:** Host unmounts another unit’s widget through global name.

### 6. microfrontend/src/main.jsx:7

**Observation:** Same `mount` declaration as #2, recognized by mount-call pattern.

**Interpretation:** Widget offers mounting function without calling it.

**Note:** Source-code review (3.4.4) retained both rows due to overlapping patterns, and this stage (3.5) retains one observation per row.

### 7. microfrontend/src/main.jsx:14

**Observation:** Same `unmount` declaration as #3, recognized by mount-call pattern.

**Interpretation:** Widget offers unmounting function without calling it.

### 8. frontend/src/App.jsx:475

**Observation:** YAML text (`path: /widget.iife.js`) inside an example string displayed in interface.

**Interpretation:** Not code loading. False positive from bundle-URL search.

### 9. frontend/src/App.jsx:800-803

**Observation:** Side panel renders `<RemoteWidget src={`/mfe/widget.iife.js?v=${Date.now()}`} />`.

**Interpretation:** Host points to widget bundle with cache-busting parameter.

### 10. frontend/src/RemoteWidget.jsx:8-22

**Observation:** Component creates `script` element with received URL, sets `async` and appends to `head`.

**Interpretation:** Host loads property-specified script at runtime.

### 11. backend; backend/package.json:1-8; backend/src/main.ts:5-21; backend/Dockerfile:2-17; docker-compose.yml:18-19

**Observation:** NestJS HTTP server package, with own build/image, no UI.

**Interpretation:** Backend in same repository rather than frontend unit.

### 12. frontend; frontend/package.json:1-10; frontend/index.html:9-10; frontend/src/main.jsx:6-9; frontend/vite.config.js:4-13

**Observation:** React application with own manifest, entry and Vite build.

**Interpretation:** Frontend unit with own boundary.

### 13. microfrontend; microfrontend/package.json:1-10; microfrontend/index.html:9-12; microfrontend/src/main.jsx:7-11; microfrontend/vite.config.js:19-32

**Observation:** Widget with own manifest, mounting function/build, plus local page running it in isolation.

**Interpretation:** Frontend unit with own boundary, capable of running alone.

### 14. frontend/src/RemoteWidget.jsx:8-14, 24-26; frontend/src/App.jsx:802; microfrontend/src/main.jsx:7-19; microfrontend/vite.config.js:25-29; frontend/nginx.conf:57-58

**Observation:** Frontend loads `/mfe/widget.iife.js`, calling `mount` and `unmount` on global `MicroFrontendWidget`. File/global match widget bundle; frontend nginx forwards `/mfe/` to service `microfrontend`.

**Interpretation:** Active page → embedded-frontend relationship.

### 15. frontend/package.json:8; frontend/Dockerfile:2-14; docker-compose.yml:39-40; helm/fe-containerize/templates/frontend.yaml:1-84; helm/fe-containerize/values.yaml:5

**Observation:** Frontend has own `vite build`/nginx image, own compose service and own chart Deployment, Service and Ingress. Image uses tag `latest`.

**Interpretation:** Own build/deployment boundaries without independent versioning.

### 16. microfrontend/package.json:8; microfrontend/Dockerfile:2-14; docker-compose.yml:35-36; helm/fe-containerize/templates/microfrontend.yaml:1-56; helm/fe-containerize/values.yaml:7; frontend/nginx.conf:57-58

**Observation:** Microfrontend has own `vite build`/nginx image, own compose service and own chart Deployment/Service without Ingress. Reaches browser through frontend nginx `/mfe/`. Image uses tag `latest`.

**Interpretation:** Own build/deployment boundaries without own origin. No independent versioning.

### 17. README.docker-compose.md:3-8

**Observation:** "Демо застосунок з 4 сервісів […] `microfrontend`: окремий React widget у форматі IIFE". English translation: "Demo application with four services; the named microfrontend is a separate React widget in IIFE format."

**Interpretation:** Describes four services/microfrontend as separate IIFE widget. Claim corroborated.

### 18. README.docker-compose.md:19

**Observation:** Diagram: frontend "loads JS bundle at runtime" from micro-frontend.

**Interpretation:** Describes runtime widget loading. Claim corroborated.

### 19. README.docker-compose.md:21-24

**Observation:** Diagram marking micro-frontend "internal".

**Interpretation:** Claims microfrontend is not directly exposed. Claim corroborated.

### 20. README.docker-compose.md:150-152

**Observation:** "`frontend/vite.config.js` проксіює `/api` […] `/mfe` на `http://localhost:3001` […] `microfrontend/vite.config.js` проксіює `/api`". English translation: "Frontend Vite configuration proxies API and microfrontend paths to the stated address; microfrontend Vite configuration proxies the API path."

**Interpretation:** Describes frontend access to microfrontend in development. Claim corroborated.

### 21. README.docker-compose.md:158

**Observation:** "`frontend/nginx.conf` проксіює `/api` до `backend:8000`". English translation: "Frontend nginx configuration proxies the API path to the stated backend."

**Interpretation:** Describes frontend/backend proxy. Claim corroborated.

### 22. README.docker-compose.md:159

**Observation:** "`frontend/nginx.conf` проксіює `/mfe` до `microfrontend:80`". English translation: "Frontend nginx configuration proxies the microfrontend path to the stated service."

**Interpretation:** Describes frontend access to microfrontend in production. Claim corroborated.

### 23. README.md:3-6

**Observation:** "два варіанти деплою: Docker Compose […] k3s + Helm". English translation: "Two deployment options: Docker Compose and the stated Kubernetes distribution with Helm."

**Interpretation:** Claims two application deployment options exist. Claim corroborated.

### 24. README.md:32

**Observation:** "`microfrontend` […] Незалежний widget". English translation: "The named microfrontend is an independent widget."

**Interpretation:** Claims widget independence in running/building alone. Claim corroborated.

### 25. frontend/nginx.conf:56

**Observation:** "Proxy micro-frontend assets (no cache — bundle changes on redeploy)".

**Interpretation:** Assumes microfrontend is republished separately. Claim corroborated.

### 26. helm/README.md:47

**Observation:** "microfrontend.yaml # MFE: Deployment + Service".

**Interpretation:** Claims microfrontend has own Deployment/Service. Claim corroborated.

### 27. helm/README.md:154-158

**Observation:** "Редеплой після змін у коді […] Один сервіс (наприклад frontend)". English translation: "Redeploy after code changes; one service, for example frontend."

**Interpretation:** Describes one-application redeploy without others. Claim corroborated.

## Classification

| # | Origin | Dimension | Type | Approach | Evidence | Strength | Relationships |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.3 (microfrontend, Markers, Entry and Build); 3.4.4 (microfrontend/src/main.jsx:7, Observation); 3.4.5 #1 (Configuration); 3.4.7 #1 (Evidence) | 2 configuration | configuration | script | technological | moderate | configures #13; configures #14 |
| 2 | 3.4.4 (microfrontend/src/main.jsx:7, src-mount-export) | 3 code | source code | script | technological | moderate | implements #14 |
| 3 | 3.4.4 (microfrontend/src/main.jsx:14, src-mount-export) | 3 code | source code | script | technological | moderate | implements #14 |
| 4 | 3.4.4 (frontend/src/RemoteWidget.jsx:14) | 3 code | source code | script | architectural | strong | implements #14 |
| 5 | 3.4.4 (frontend/src/RemoteWidget.jsx:26) | 3 code | source code | script | architectural | strong | implements #14 |
| 6 | 3.4.4 (microfrontend/src/main.jsx:7, src-mount-call) | 3 code | source code | script | technological | moderate | implements #14 |
| 7 | 3.4.4 (microfrontend/src/main.jsx:14, src-mount-call) | 3 code | source code | script | technological | moderate | implements #14 |
| 8 | 3.4.4 (frontend/src/App.jsx:475) | 3 code | source code | — | context | weak | — |
| 9 | 3.4.4 (frontend/src/App.jsx:802) | 3 code | source code | script | architectural | strong | implements #14 |
| 10 | 3.4.4 (frontend/src/RemoteWidget.jsx:8) | 3 code | source code | script | technological | moderate | implements #14 |
| 11 | 3.4.3 (backend) | 4 structure | directory | — | context | weak | — |
| 12 | 3.4.3 (frontend) | 4 structure | directory | — | architectural | moderate | — |
| 13 | 3.4.3 (microfrontend) | 4 structure | directory | — | architectural | moderate | — |
| 14 | 3.4.5 #1 | 5 composition | source code | script | architectural | strong | links #12; links #13 |
| 15 | 3.4.6 #1 | 6 build-deploy | deploy | — | architectural | moderate | publishes #12 |
| 16 | 3.4.6 #2 | 6 build-deploy | deploy | — | architectural | moderate | publishes #13 |
| 17 | 3.4.7 #1 | 7 documentation | documentation | script | architectural | weak | corroborates #12; corroborates #13; corroborates #1 |
| 18 | 3.4.7 #2 | 7 documentation | documentation | script | architectural | weak | corroborates #10; corroborates #14 |
| 19 | 3.4.7 #3 | 7 documentation | documentation | — | architectural | weak | corroborates #16 |
| 20 | 3.4.7 #4 | 7 documentation | documentation | — | architectural | weak | corroborates frontend/vite.config.js:8-10; corroborates microfrontend/vite.config.js:35-37 |
| 21 | 3.4.7 #5 | 7 documentation | documentation | — | context | weak | corroborates frontend/nginx.conf:45-46 |
| 22 | 3.4.7 #6 | 7 documentation | documentation | — | architectural | weak | corroborates #14 |
| 23 | 3.4.7 #7 | 7 documentation | documentation | — | architectural | weak | corroborates #15; corroborates #16 |
| 24 | 3.4.7 #8 | 7 documentation | documentation | — | architectural | weak | corroborates #13 |
| 25 | 3.4.7 #9 | 7 documentation | comment | — | architectural | weak | corroborates #16 |
| 26 | 3.4.7 #10 | 7 documentation | documentation | — | architectural | weak | corroborates #16 |
| 27 | 3.4.7 #11 | 7 documentation | documentation | — | architectural | weak | corroborates #15; corroborates #16 |

## Summary

Observations: 27. Dimensions (technology: 0, configuration: 1, code: 9, structure: 3, composition: 1, build-deploy: 2, documentation: 11, history: 0). Strength (strong: 4, moderate: 10, weak: 13, ambiguous: 0). Evidence (technological: 6, architectural: 18, context: 3).

## Recorded decision

`frontend/vite.config.js` (cited in structural review Markers column, 3.4.3, and documentation review claim 4 Evidence, 3.4.7) has a `server.proxy` forwarding `/mfe` to microfrontend development server (frontend/vite.config.js:8-10). Researcher decision (2026-10-21): development proxy treated like nginx `location`, i.e. path forwarding rather than remote declaration, whose URL is in code (#9). Excluded from dimension 2. Rule added to step 2 (deriving observations) of method in `INSTRUCTIONS.md`.

