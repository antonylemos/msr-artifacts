---
schema: 1
id: 1255336417
full_name: cMancillaValle/ARGOS-SiVIA
commit: 4f6ef7f491ec9fc2d3e852f271e0c360549fad65
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

# 378 — cMancillaValle/ARGOS-SiVIA

## Repository overview

Two units are static HTML/JS host `frontend` (#23) and React widget `frontend-hermes` with own entry/build (#24). Observed chain starts in custom-element wrapper/registration (#1–#3), passes through tag/dashboard bundle loading (#21–#22), closes in active host → widget relationship (#25). Second active relationship global-event communication: host emits `toggle-hermes`/`close-hermes`, widget receives (#11–#14, #26). Individual event excerpts implement contract; consolidated relationship situates both sides.

Widget build separate/publication joint with host in FastAPI (#27–#28). Compose does not compile Hermes; `/hermes/` path depends on available `dist`. Ngrok script attempts widget build before server exposure. Evidence does not prove functional autonomous execution, sense in which independence claim uncorroborated (#31). Development HTML entry points to absent `main.tsx`, divergence already at first consulted historical presence (#47).

CDN scripts, fragment-script reexecution/internal `argos:navaway` events are code review’s 13 false positives (#4–#10, #15–#20). Add no units/relationships. Flask claims contradicted by current server (#32, #44); history leaves text origin unresolved (#48). Windows installer uncorroborated (#38) although snapshot explains inventory exclusion (#49). None makes composition target ambiguous.

Section 3.4.2 contains no dependencies to extract. No configuration observations eligible under step 2: `vite.config.ts` configures IIFE library, output, React/CSS, but declares no federation builder/plugin, host/remote, exposed module, federated sharing, remote URL, import map or application registry. `name: HermesWidget` library name rather than host/remote. Compose configures shared server. Relevant excerpts remain in structure, code/build-deployment; declarative comments enter through 3.4.7 rows. No React/Vite dependencies absent from 3.4.2 table added.

Operational limit: `docs/mfe-review-pipeline/regras-comuns.md` unavailable in checkout during extraction. Review follows available `INSTRUCTIONS.md`/`_template.md`, seven final reviews/explicit instruction to deliver `draft`. Excerpts checked only in acquisition snapshot without new mining/clone queries.

## Observations

### 1. frontend-hermes/src/hermes-widget.tsx:6; frontend-hermes/src/hermes-widget.tsx:10-28; frontend-hermes/src/hermes-widget.tsx:37-46

**Observation:** HermesWidget class extends HTMLElement, observes token, api-base, modulo, mounts App with createRoot in connectedCallback.

**Interpretation:** Implements React-unit Web Component wrapper; isolated encapsulation mechanism identifies no consumer.

### 2. frontend-hermes/src/hermes-widget.tsx:16; frontend-hermes/src/hermes-widget.tsx:18-28

**Observation:** connectedCallback calls attachShadow with mode open, appends style with widgetCss/creates React mount point.

**Interpretation:** Shadow DOM delimits widget encapsulation without alone linking two units.

### 3. frontend-hermes/src/hermes-widget.tsx:58; frontend-hermes/src/hermes-widget.tsx:57

**Observation:** customElements.define registers hermes-widget as HermesWidget after customElements.get check.

**Interpretation:** Makes public widget tag available. Provider registration composition mechanism without naming other consumer unit.

**Note:** Moderate strength retained rather than strong guidance for target-naming registries: here `customElements.define` associates tag `hermes-widget` with local class `HermesWidget` in provider. Alone confirms unit-offered mechanism without directly linking two relatively independent units. Host consumption/inter-unit relationship in observations #21 and #25 do not increase isolated-registration strength.

### 4. frontend/js/router.js:54; frontend/js/router.js:45-57; frontend/js/router.js:181-182

**Observation:** loadComponent fetches components/<arquivo> (English explanation: file placeholder), inserts fragment through innerHTML/recreates inline scripts; requested components topbar.html and sidebar.html.

**Interpretation:** Internal frontend layout mounting without other-unit bundle loading.

### 5. frontend/js/router.js:93; frontend/js/router.js:13-29; frontend/js/router.js:64-96

**Observation:** loadView fetches view in views/, inserts HTML/recreates inline scripts; MODULES lists view files.

**Interpretation:** View navigation inside frontend establishes no inter-unit composition.

### 6. frontend/views/mapa_transmilenio.html:604; frontend/views/mapa_transmilenio.html:592-608

**Observation:** ensureLeaflet creates script for CDN unpkg leaflet.js when L variable absent.

**Interpretation:** Dynamic loading serves map library rather than other frontend unit.

### 7. frontend/dashboard.html:14

**Observation:** Dashboard includes CDN unpkg leaflet.js through script tag.

**Interpretation:** External-library dependency false positive for unit composition.

### 8. frontend/dashboard.html:15

**Observation:** Dashboard includes Tailwind CDN script.

**Interpretation:** External-library styling load identifies no extra frontend unit.

### 9. frontend/index.html:23

**Observation:** Initial page includes Tailwind CDN script.

**Interpretation:** Visual infrastructure of same unit without inter-application composition.

### 10. frontend/login.html:12

**Observation:** Login page includes Tailwind CDN script.

**Interpretation:** Page library without other-unit boundary.

### 11. frontend-hermes/src/App.tsx:35; frontend-hermes/src/App.tsx:25-42

**Observation:** App registers toggle-hermes window listener toggling panel opening/removes listener on cleanup.

**Interpretation:** Implements widget communication-event reception; subscription alone identifies no sending unit.

### 12. frontend-hermes/src/App.tsx:36; frontend-hermes/src/App.tsx:30-40

**Observation:** App registers close-hermes window listener requesting panel closure/removes listener on cleanup.

**Interpretation:** Implements second contract-event reception without naming sending unit.

### 13. frontend/components/topbar.html:26; frontend/components/topbar.html:24-30

**Observation:** Hermes IA button dispatches CustomEvent named toggle-hermes in window.

**Interpretation:** Implements opening/closing event send; global dispatch names no receiving unit directly.

### 14. frontend/dashboard.html:421; frontend/dashboard.html:408-422

**Observation:** toggleProfileDrawer dispatches close-hermes in window on profile-drawer opening.

**Interpretation:** Implements closure send to global contract; isolated dispatch declares no receiver.

### 15. frontend/js/router.js:71; frontend/js/router.js:64-70

**Observation:** Before DOM replacement router emits argos:navaway in document for views to clear timers/listeners.

**Interpretation:** Coordinates internal frontend lifecycle without frontend-hermes communication.

### 16. frontend/views/auditoria.html:219; frontend/js/router.js:71

**Observation:** View listens for argos:navaway in document/calls clearInterval on _autoRefresh with once: true.

**Interpretation:** Internal frontend-view cleanup responding to same-unit router.

### 17. frontend/views/auditoria.html:288; frontend/js/router.js:71

**Observation:** View listens for argos:navaway in document/calls clearInterval on _sesAutoRefresh with once: true.

**Interpretation:** Internal frontend-view cleanup responding to same-unit router.

### 18. frontend/views/dashboard_home.html:458; frontend/js/router.js:71

**Observation:** View listens for argos:navaway in document/calls clearInterval on _interval with once: true.

**Interpretation:** Internal frontend-view cleanup responding to same-unit router.

### 19. frontend/views/infra_servidores.html:306; frontend/js/router.js:71

**Observation:** View listens for argos:navaway in document/calls clearInterval on _pollTimer with once: true.

**Interpretation:** Internal frontend-view cleanup responding to same-unit router.

### 20. frontend/views/mapa_transmilenio.html:616; frontend/views/mapa_transmilenio.html:617-622; frontend/js/router.js:71

**Observation:** View listens for argos:navaway/removes resize listener/Leaflet map.

**Interpretation:** Map cleanup part of same frontend unit lifecycle.

### 21. frontend/dashboard.html:361; frontend-hermes/src/hermes-widget.tsx:57-58

**Observation:** Dashboard contains hermes-widget with id hermes-ai-widget/attributes api-base="/api", modulo="dashboard"; provider registers same tag.

**Interpretation:** Host explicitly names/instantiates custom element supplied by frontend-hermes.

### 22. frontend/dashboard.html:366; frontend-hermes/vite.config.ts:11-15; backend/main.py:92; backend/main.py:281-288

**Observation:** Dashboard includes /hermes/hermes-widget.js; Vite defines output name/backend serves frontend-hermes/dist under /hermes/.

**Interpretation:** URL loading resolves other-unit bundle/participates in runtime composition.

### 23. frontend/; frontend/index.html:23-24; frontend/dashboard.html:366-369

**Observation:** frontend contains own HTML pages loading static scripts/CDNs; review records no build.

**Interpretation:** Confirms static host unit boundary without alone establishing whole inter-unit organization.

### 24. frontend-hermes/; frontend-hermes/package.json:1-31; frontend-hermes/package.json:8; frontend-hermes/vite.config.ts:10-16; frontend-hermes/src/hermes-widget.tsx:6; frontend-hermes/src/hermes-widget.tsx:27; frontend-hermes/src/hermes-widget.tsx:57-58

**Observation:** frontend-hermes has own package, tsc -b && vite build/entry src/hermes-widget.tsx mounting React/registering hermes-widget; Vite output IIFE library.

**Interpretation:** Confirms own-entry/build frontend unit encapsulated as Web Component. Does not prove functional autonomous execution.

### 25. frontend/dashboard.html:361; frontend/dashboard.html:366; frontend-hermes/src/hermes-widget.tsx:6; frontend-hermes/src/hermes-widget.tsx:16; frontend-hermes/src/hermes-widget.tsx:58; frontend-hermes/vite.config.ts:11-15; backend/main.py:92; backend/main.py:281-288

**Observation:** frontend uses hermes-widget tag/loads /hermes/hermes-widget.js. frontend-hermes registers tag/build generates bundle served by FastAPI from dist. Review records present target/active relationship.

**Interpretation:** Directly links host/widget through Web Components/runtime loading, target/artifact resolved in snapshot.

### 26. frontend/components/topbar.html:26; frontend/dashboard.html:421; frontend-hermes/src/App.tsx:35-36

**Observation:** frontend emits toggle-hermes in topbar/close-hermes in dashboard; frontend-hermes App listens for both in window. Review records active relationship/source → target direction.

**Interpretation:** Sender/receiver pair establishes explicit host-to-widget communication without recorded return events.

### 27. backend/main.py:91; backend/main.py:257-293; docker-compose.yml:3-24; ngrok_tunnel.py:95-111; ngrok_tunnel.py:153-161

**Observation:** frontend served directly by FastAPI at /, /login, /dashboard and statics at /. Compose mounts repository in single service/tunnel exposes same port. Review records no build, joint deployment, versioning No.

**Interpretation:** Publication path situates host but no build/shared service demonstrate no delivery independence.

### 28. frontend-hermes/package.json:8; frontend-hermes/vite.config.ts:11-15; backend/main.py:92; backend/main.py:281-288; docker-compose.yml:3-24; ngrok_tunnel.py:52-62; ngrok_tunnel.py:153-161

**Observation:** frontend-hermes has tsc -b && vite build/output hermes-widget.js. Same FastAPI publishes dist at /hermes/. Ngrok script attempts build before server startup; compose does not build widget. Review records separate build, joint deployment, versioning No.

**Interpretation:** Own build confirms widget delivery boundary while publication shared with host. Route depends on available dist.

### 29. README.md:47-48

**Observation:** README presents main dashboard as multiple-panel SPA dynamically rendered with vanilla JavaScript.

**Interpretation:** Situates host unit; internal views no extra units. Review records corroboration.

### 30. README.md:63

**Observation:** README calls Hermes micro-frontend built in React/TypeScript with Vite.

**Interpretation:** Names unit/technology matching recorded structure, build/consumption; remains semantic evidence.

### 31. README.md:63

**Observation:** README qualifies Hermes as independent.

**Interpretation:** Uncorroborated for functional autonomous execution per review. Own build/embedded usage prove no independence in this sense.

### 32. README.md:68

**Observation:** README says pyngrok exposes Flask server to internet through secure HTTP tunnel.

**Interpretation:** Contradicted per review: current started process FastAPI/Uvicorn. Tunnel security unverified in execution.

### 33. README.md:70

**Observation:** README declares automatic Hermes micro-frontend build before tunnel launch.

**Interpretation:** Corroborated by script build attempt; failure logged warning does not guarantee launch interruption.

### 34. README.md:104

**Observation:** README tree describes hermes-widget.tsx as embeddable chatbot widget.

**Interpretation:** Situates Hermes embeddable entry, corroborated by recorded composition relationship.

### 35. README.md:110

**Observation:** README tree describes dist as Vite-generated compiled bundle.

**Interpretation:** Corroborated by widget build/output directory without requiring versioned generated bundle.

### 36. README.md:112-113

**Observation:** README identifies backend FastAPI server/main.py entry with lifespan, routers/statics.

**Interpretation:** Current server corroborated per review. Backend infrastructure rather than frontend unit.

### 37. README.md:214

**Observation:** README associates vite-plugin-css-injected-by-js with embeddable widget without external CSS.

**Interpretation:** Corroborated by plugin configuration/widget Shadow DOM CSS injection; does not extend to entire host.

### 38. README.md:221

**Observation:** README lists Inno Setup for Windows .exe installer generation.

**Interpretation:** Uncorroborated per review: declaration proves no installer generation/distribution.

### 39. frontend-hermes/src/App.tsx:19

**Observation:** Comment declares dashboard-module synchronization to widget.

**Interpretation:** Corroborated by host modulo passing/widget state update. Does not prove following all internal navigation.

### 40. frontend-hermes/src/App.tsx:24

**Observation:** Comment declares listening for global topbar event to open/close.

**Interpretation:** Corroborated by host toggle-hermes emission/widget reception.

### 41. frontend-hermes/vite.config.ts:17

**Observation:** Vite comment says prevent React externalization/include in bundle.

**Interpretation:** Corroborated in external: []. Library packaging description alone declares no MFE mechanism/inter-unit relationship.

### 42. frontend/dashboard.html:687

**Observation:** Dashboard comment says widget loaded through Web Component, names hermes-widget.

**Interpretation:** Names mechanism/widget link corroborated by tag registration/host usage. Isolated claim remains weak.

### 43. frontend/dashboard.html:688

**Observation:** Comment declares token passed to widget after router loading.

**Interpretation:** Corroborated by token assignment after AppRouter.init/widget attribute callback; inter-unit session sharing.

### 44. frontend/js/api.js:4-5

**Observation:** Comment describes API client as frontend–Flask backend communication.

**Interpretation:** Contradicted: communication exists but current server FastAPI. Backend link.

### 45. frontend/js/api.js:9-10

**Observation:** Comment says use current host in localhost/LAN, window.location.origin in ngrok/external domain.

**Interpretation:** Corroborated: implementation builds API with page origin matching common server; no runtime public-domain verification.

### 46. ngrok_tunnel.py:3-5

**Observation:** Header says expose FastAPI server/camera WebSocket externally through pyngrok.

**Interpretation:** Corroborated by Uvicorn startup/same-port HTTP tunnel. Common infrastructure description.

### 47. 6fc3f39 2026-09-15 (frontend-hermes/index.html; frontend-hermes/vite.config.ts; frontend-hermes/src/hermes-widget.tsx); frontend-hermes/index.html:11; frontend-hermes/vite.config.ts:11-15

**Observation:** History review records joint HTML/Vite configuration/custom-element addition in 6fc3f39 without later path changes/recorded src/main.tsx. Point clarified.

**Interpretation:** Development HTML/library-entry divergence exists since first observable presence. Demonstrates no earlier autonomous entry/changes no snapshot widget boundary.

### 48. 6fc3f39 2026-09-15 (README.md; ngrok_tunnel.py; frontend/js/api.js; backend/app.py); 0ffce61 2026-09-20 (frontend/js/api.js); 221f58c 2026-10-09 (README.md; ngrok_tunnel.py; backend/app.py; backend/main.py)

**Observation:** Review records path additions in 6fc3f39, client change in 0ffce61/changes adding backend/main.py in 221f58c, message announcing FastAPI migration. Earlier README, tunnel/backend contents unavailable; result inconclusive.

**Interpretation:** Remaining uncertainty Flask-reference historical origin. Current server identified/claims contradicted in snapshot, hence weak strength.

### 49. .gitignore:66-67; README.md:221

**Observation:** Snapshot comments installation scripts intended for distribution/excludes installer/. History review records resolved by snapshot without specific historical query.

**Interpretation:** Exclusion explains inventory gap but proves no built/distributed installer. Documentary claim uncorroborated.

## Classification

| # | Origin | Dimension | Type | Approach | Evidence | Strength | Relationships |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.4 (frontend-hermes/src/hermes-widget.tsx:6) | 3 code | source code | web-components | technological | moderate | implements #25 |
| 2 | 3.4.4 (frontend-hermes/src/hermes-widget.tsx:16) | 3 code | source code | web-components | technological | moderate | implements #25 |
| 3 | 3.4.4 (frontend-hermes/src/hermes-widget.tsx:58) | 3 code | source code | web-components | technological | moderate | implements #25 |
| 4 | 3.4.4 (frontend/js/router.js:54) | 3 code | source code | — | context | weak | — |
| 5 | 3.4.4 (frontend/js/router.js:93) | 3 code | source code | — | context | weak | — |
| 6 | 3.4.4 (frontend/views/mapa_transmilenio.html:604) | 3 code | source code | — | context | weak | — |
| 7 | 3.4.4 (frontend/dashboard.html:14) | 3 code | source code | — | context | weak | — |
| 8 | 3.4.4 (frontend/dashboard.html:15) | 3 code | source code | — | context | weak | — |
| 9 | 3.4.4 (frontend/index.html:23) | 3 code | source code | — | context | weak | — |
| 10 | 3.4.4 (frontend/login.html:12) | 3 code | source code | — | context | weak | — |
| 11 | 3.4.4 (frontend-hermes/src/App.tsx:35) | 3 code | source code | events | technological | moderate | implements #26 |
| 12 | 3.4.4 (frontend-hermes/src/App.tsx:36) | 3 code | source code | events | technological | moderate | implements #26 |
| 13 | 3.4.4 (frontend/components/topbar.html:26) | 3 code | source code | events | technological | moderate | implements #26 |
| 14 | 3.4.4 (frontend/dashboard.html:421) | 3 code | source code | events | technological | moderate | implements #26 |
| 15 | 3.4.4 (frontend/js/router.js:71) | 3 code | source code | — | context | weak | — |
| 16 | 3.4.4 (frontend/views/auditoria.html:219) | 3 code | source code | — | context | weak | — |
| 17 | 3.4.4 (frontend/views/auditoria.html:288) | 3 code | source code | — | context | weak | — |
| 18 | 3.4.4 (frontend/views/dashboard_home.html:458) | 3 code | source code | — | context | weak | — |
| 19 | 3.4.4 (frontend/views/infra_servidores.html:306) | 3 code | source code | — | context | weak | — |
| 20 | 3.4.4 (frontend/views/mapa_transmilenio.html:616) | 3 code | source code | — | context | weak | — |
| 21 | 3.4.4 (frontend/dashboard.html:361) | 3 code | source code | web-components | architectural | strong | implements #25 |
| 22 | 3.4.4 (frontend/dashboard.html:366) | 3 code | source code | web-components | architectural | strong | implements #25 |
| 23 | 3.4.3 (frontend) | 4 structure | directory | — | architectural | moderate | — |
| 24 | 3.4.3 (frontend-hermes) | 4 structure | directory | web-components | architectural | moderate | — |
| 25 | 3.4.5 #1 | 5 composition | source code | web-components | architectural | strong | links #23; links #24 |
| 26 | 3.4.5 #2 | 5 composition | source code | events | architectural | strong | links #23; links #24 |
| 27 | 3.4.6 #1 | 6 build-deploy | deploy | — | architectural | weak | publishes #23 |
| 28 | 3.4.6 #2 | 6 build-deploy | deploy | — | architectural | moderate | publishes #24 |
| 29 | 3.4.7 #1 | 7 documentation | documentation | — | architectural | weak | corroborates #23; corroborates frontend/js/router.js:13-29; corroborates #5 |
| 30 | 3.4.7 #2 | 7 documentation | documentation | — | architectural | weak | corroborates #24; corroborates #28; corroborates #25 |
| 31 | 3.4.7 #3 | 7 documentation | documentation | — | architectural | weak | — |
| 32 | 3.4.7 #4 | 7 documentation | documentation | — | context | weak | contradicts ngrok_tunnel.py:95-111; contradicts ngrok_tunnel.py:153-161 |
| 33 | 3.4.7 #5 | 7 documentation | documentation | — | architectural | weak | corroborates #28 |
| 34 | 3.4.7 #6 | 7 documentation | documentation | — | architectural | weak | corroborates #25 |
| 35 | 3.4.7 #7 | 7 documentation | documentation | — | architectural | weak | corroborates #28 |
| 36 | 3.4.7 #8 | 7 documentation | documentation | — | context | weak | corroborates backend/main.py:91-92; corroborates backend/main.py:257-293 |
| 37 | 3.4.7 #9 | 7 documentation | documentation | — | architectural | weak | corroborates frontend-hermes/vite.config.ts:3-8; corroborates #2 |
| 38 | 3.4.7 #10 | 7 documentation | documentation | — | context | weak | — |
| 39 | 3.4.7 #11 | 7 documentation | comment | — | architectural | weak | corroborates #21; corroborates frontend-hermes/src/hermes-widget.tsx:40-44; corroborates frontend-hermes/src/App.tsx:19-22; corroborates frontend-hermes/src/store/useHermesStore.ts:44 |
| 40 | 3.4.7 #12 | 7 documentation | comment | events | architectural | weak | corroborates #26; corroborates #11; corroborates #13 |
| 41 | 3.4.7 #13 | 7 documentation | comment | — | context | weak | corroborates frontend-hermes/vite.config.ts:17-23; corroborates #28 |
| 42 | 3.4.7 #14 | 7 documentation | comment | web-components | architectural | weak | corroborates #25; corroborates #21; corroborates #22; corroborates #3 |
| 43 | 3.4.7 #15 | 7 documentation | comment | — | architectural | weak | corroborates frontend/dashboard.html:724-730; corroborates frontend-hermes/src/hermes-widget.tsx:10-12; corroborates frontend-hermes/src/hermes-widget.tsx:31-44 |
| 44 | 3.4.7 #16 | 7 documentation | comment | — | context | weak | contradicts backend/main.py:257-293 |
| 45 | 3.4.7 #17 | 7 documentation | comment | — | context | weak | corroborates frontend/js/api.js:11-15; corroborates frontend/js/api.js:55; corroborates backend/main.py:257-293 |
| 46 | 3.4.7 #18 | 7 documentation | comment | — | context | weak | corroborates ngrok_tunnel.py:95-111; corroborates ngrok_tunnel.py:153-161 |
| 47 | 3.4.8 #1 | 8 history | history | — | architectural | weak | explains #24; explains #31 |
| 48 | 3.4.8 #2 | 8 history | history | — | context | weak | explains #32; explains #44 |
| 49 | 3.4.8 #3 | 8 history | history | — | context | weak | explains #38 |

## Summary

Observations: 49. Dimensions (technology: 0, configuration: 0, code: 22, structure: 2, composition: 2, build-deploy: 2, documentation: 18, history: 3). Strength (strong: 4, moderate: 10, weak: 35, ambiguous: 0). Evidence (technological: 7, architectural: 20, context: 22).
