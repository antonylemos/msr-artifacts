---
schema: 1
id: 1255336417
full_name: cMancillaValle/ARGOS-SiVIA
commit: 4f6ef7f491ec9fc2d3e852f271e0c360549fad65
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

# 378 — cMancillaValle/ARGOS-SiVIA

## Repository overview

Main Spanish README presents academic computer-vision monitoring prototype with web management interface/conversational assistant (`README.md:4-8`). Distinguishes HTML/JS dashboard and Hermes React/TypeScript micro-frontend, describing embeddable widget/Vite build (`README.md:47-64`, `README.md:86-110`). Matches two 3.4.3 units and custom-element composition in 3.4.5 #1. Actual execution found is joint: FastAPI serves pages/Hermes bundle (`backend/main.py:257-293`). Text mixes current architecture with Flask references; table records those affecting unit access. Vision worker, authentication and business details do not describe frontend composition.

All three `documentation` documents were read in full. `backend/fastapi_poc/README.md:1-122` describes experimental WebSocket server, dependencies, protocol and tests, keeping frontend outside change (`backend/fastapi_poc/README.md:4`); backend relationships/procedures without frontend architectural table claims. `frontend-hermes/README.md:1-73` is English React/TypeScript/Vite template with generic plugin/ESLint instructions, no project-specific claims. Main README installation/execution commands/variable example (`README.md:225-265`, `README.md:282-305`) are instructions without additional rows.

All five `doc-mfe-term` occurrences covered: `README.md:63` by claims 2 and 3; `README.md:70` by 5; `README.md:101` repeats Hermes identification from 2; `README.md:208` is technology-table heading without new claim; `README.md:312` is future host-to-React migration plan, repeating current vanilla host/React Hermes context without claiming migration occurred. Annotated tree considered documentation: boundaries/widget/build produce claims; internal file descriptions such as hooks, state and types (`README.md:103-109`) remain context.

Comments/descriptive fields read in artifacts cited by previous reviews: `backend/main.py`, `docker-compose.yml`, `frontend-hermes/package.json`, `frontend-hermes/vite.config.ts`, `frontend-hermes/index.html`, `frontend-hermes/src/hermes-widget.tsx`, `frontend-hermes/src/App.tsx`, `frontend/components/topbar.html`, `frontend/dashboard.html`, `frontend/index.html`, `frontend/login.html`, `frontend/js/router.js`, `frontend/views/auditoria.html`, `frontend/views/dashboard_home.html`, `frontend/views/infra_servidores.html`, `frontend/views/mapa_transmilenio.html`, `ngrok_tunnel.py`, `start.py` and `start_ngrok.sh`; also `frontend/js/api.js` and `frontend/js/rbac.js`, loaded by dashboard (`frontend/dashboard.html:367-369`). npm manifest lacks `description` (`frontend-hermes/package.json:1-31`). Communication, packaging/infrastructure claims appear below; UI, internal lifecycle, CDN script and view-cleanup comments add no inter-unit relationships. Labels “HERMES IA WIDGET (MICRO-FRONTEND)” (English translation: "HERMES AI WIDGET (MICRO-FRONTEND)") (`frontend/dashboard.html:359`, `frontend/dashboard.html:685`) and “Construir Widget Hermes (Micro-Frontend)” (English translation: "Build Hermes Widget (Micro-Frontend)") (`ngrok_tunnel.py:50`) repeat claims 2 and 5.

## Claims

| # | Document | Claim | Theme | Corroboration | Evidence |
|---|---|---|---|---|---|
| 1 | README.md:47-48 | "Frontend Web — Dashboard Principal"; "Interfaz SPA multi-panel renderizada dinámicamente con JavaScript Vanilla" (English translation: "main web frontend with multi-panel SPA interface dynamically rendered through vanilla JavaScript") | structure | corroborated | 3.4.3 unit frontend; frontend/js/router.js:13-29; frontend/js/router.js:64-96 |
| 2 | README.md:63 | "Micro-frontend [...] construido en React + TypeScript con Vite" (English translation: "micro-frontend built in React + TypeScript with Vite") | structure | corroborated | 3.4.3 unit frontend-hermes; 3.4.6 #2; frontend-hermes/package.json:6-29; frontend-hermes/vite.config.ts:11-15; frontend/dashboard.html:361-366 |
| 3 | README.md:63 | "independiente" (English translation: "independent") | independence | uncorroborated | — |
| 4 | README.md:68 | "Túnel HTTP seguro via pyngrok para exponer el servidor Flask a internet" (English translation: "secure HTTP tunnel through pyngrok exposing Flask server to internet") | build-deploy | contradicted | 3.4.6 #1-2; ngrok_tunnel.py:95-111; ngrok_tunnel.py:153-161 |
| 5 | README.md:70 | "Construcción automática del micro-frontend Hermes antes de lanzar el túnel" (English translation: "automatic Hermes micro-frontend build before tunnel launch") | build-deploy | corroborated | 3.4.6 #2; ngrok_tunnel.py:52-62; ngrok_tunnel.py:223-225 |
| 6 | README.md:104 | "hermes-widget.tsx → Widget embebible del chatbot" (English translation: "embeddable chatbot widget") | composition | corroborated | 3.4.5 #1; frontend-hermes/src/hermes-widget.tsx:6-58; frontend/dashboard.html:361-366 |
| 7 | README.md:110 | "dist/ → Bundle compilado (generado por Vite)" (English translation: "compiled bundle generated by Vite") | build-deploy | corroborated | 3.4.6 #2; frontend-hermes/package.json:8; frontend-hermes/vite.config.ts:10-16; backend/main.py:92 |
| 8 | README.md:112-113 | "Servidor FastAPI"; "Entrada principal FastAPI, lifespan, routers, estáticos" (English translation: "FastAPI server, main entry with lifecycle, routers and statics") | build-deploy | corroborated | 3.4.6 #1-2; backend/main.py:91-92; backend/main.py:257-293 |
| 9 | README.md:214 | "vite-plugin-css-injected-by-js [...] Widget embebible sin CSS externo" (English translation: "embeddable widget without external CSS") | composition | corroborated | frontend-hermes/vite.config.ts:3-8; frontend-hermes/src/hermes-widget.tsx:4; frontend-hermes/src/hermes-widget.tsx:18-21 |
| 10 | README.md:221 | "Inno Setup [...] Generación del instalador Windows (.exe)" (English translation: "Windows installer generation") | build-deploy | uncorroborated | — |
| 11 | frontend-hermes/src/App.tsx:19 | "Sincronizar módulo del dashboard al widget" (English translation: "synchronize dashboard module with widget") | composition | corroborated | frontend/dashboard.html:361; frontend-hermes/src/hermes-widget.tsx:40-44; frontend-hermes/src/App.tsx:19-22; frontend-hermes/src/store/useHermesStore.ts:44 |
| 12 | frontend-hermes/src/App.tsx:24 | "Escuchar evento global desde el topbar para abrir/cerrar" (English translation: "listen to global topbar event to open/close") | composition | corroborated | 3.4.5 #2; frontend/components/topbar.html:25-26; frontend-hermes/src/App.tsx:25-40 |
| 13 | frontend-hermes/vite.config.ts:17 | "Prevent externalizing React so it gets bundled" | build-deploy | corroborated | frontend-hermes/vite.config.ts:17-23; 3.4.6 #2 |
| 14 | frontend/dashboard.html:687 | "El widget se carga vía Web Component (<hermes-widget>)" (English translation: "widget loads through Web Component") | composition | corroborated | 3.4.5 #1; frontend/dashboard.html:361-366; frontend-hermes/src/hermes-widget.tsx:57-58 |
| 15 | frontend/dashboard.html:688 | "Se le pasará el token una vez el router haya cargado" (English translation: "token passed to widget after router loads") | composition | corroborated | frontend/dashboard.html:724-730; frontend-hermes/src/hermes-widget.tsx:10-12; frontend-hermes/src/hermes-widget.tsx:31-44 |
| 16 | frontend/js/api.js:4-5 | "Capa de comunicación entre el frontend y el backend Flask" (English translation: "communication layer between frontend and Flask backend") | composition | contradicted | frontend/js/api.js:11-15; frontend/js/api.js:40-55; backend/main.py:257-293; 3.4.6 #1-2 |
| 17 | frontend/js/api.js:9-10 | "Localhost/LAN → usa el host actual"; "Ngrok / dominio externo → usa window.location.origin" (English translation: "uses current host in localhost/LAN and page origin on ngrok/external domain") | composition | corroborated | frontend/js/api.js:11-15; frontend/js/api.js:55; backend/main.py:257-293 |
| 18 | ngrok_tunnel.py:3-5 | "Expone el servidor FastAPI y el WebSocket de cámaras al exterior usando pyngrok" (English translation: "exposes FastAPI server and camera WebSocket externally through pyngrok") | build-deploy | corroborated | 3.4.6 #1-2; ngrok_tunnel.py:95-111; ngrok_tunnel.py:153-161 |

## Observations

**1. README.md.** Main frontend description recurs in tree/stack (`README.md:86-99`, `README.md:201-205`). Router selects/inserts own-unit HTML views (`frontend/js/router.js:13-29`, `frontend/js/router.js:64-96`); internal panels are no additional units.

**2. README.md.** React/TypeScript/Vite micro-frontend identity recurs at `README.md:101`, `README.md:208-213` and dashboard labels. Package, own entry and host consumption corroborate identity/claimed technology (`frontend-hermes/package.json:6-29`, `frontend-hermes/vite.config.ts:11-15`, `frontend/dashboard.html:361-366`).

**3. README.md.** “Independiente” (English translation: "Independent") lacks corroboration for autonomous functional execution. Snapshot demonstrates separately built embedded widget, but separate build does not prove execution independence (`frontend-hermes/vite.config.ts:11-15`, `frontend/dashboard.html:361-366`). Development HTML entry points to `/src/main.tsx`, absent from inventory; 3.4.3 records limitation (`frontend-hermes/index.html:11`). Publication server is shared (`backend/main.py:257-293`); joint deployment likewise neither proves nor disproves autonomous execution alone.

**4. README.md.** Server tunnel exists but started process is `uvicorn main:app` rather than Flask (`ngrok_tunnel.py:99-111`). Contradiction concerns named mechanism: text retains previous name while describing real publication path. Running tunnel security was not evaluated.

**5. README.md.** Script calls `build_hermes_widget()` before starting server/opening tunnel (`ngrok_tunnel.py:52-62`, `ngrok_tunnel.py:223-225`). Comment `ngrok_tunnel.py:50` repeats claim. Automation attempts build: compilation error is caught/logged as warning without necessarily stopping launch (`ngrok_tunnel.py:59-60`).

**6. README.md.** Tree correctly identifies embeddable entry. Registers custom element mounting `App`, dashboard consuming tag/bundle (`frontend-hermes/src/hermes-widget.tsx:42-58`, `frontend/dashboard.html:361-366`). Claim 14 adds Web Component mechanism explicitly named by consumer comment.

**7. README.md.** Build uses entry `src/hermes-widget.tsx`, generating `hermes-widget.js` as IIFE library (`frontend-hermes/vite.config.ts:10-16`). Backend points to `frontend-hermes/dist` (`backend/main.py:92`). Build-product description without requiring versioned generated bundle.

**8. README.md.** Tree-mentioned FastAPI server delivers both main pages/widget files (`backend/main.py:257-293`). Claim matches joint deployment in 3.4.6, although other passages still say Flask.

**9. README.md.** CSS injection plugin configured (`frontend-hermes/vite.config.ts:3-8`). Custom element also imports inline CSS, creating `style` element in shadow DOM (`frontend-hermes/src/hermes-widget.tsx:4`, `frontend-hermes/src/hermes-widget.tsx:18-21`). Claim concerns widget without implying whole host needs no external CSS.

**10. README.md.** Windows installer listed as infrastructure, but no Inno Setup script/corresponding packaging in snapshot inventory, as 3.4.6 Repository overview records. Documentation alone does not prove executable generation/distribution.

**11. frontend-hermes/src/App.tsx.** Host provides `modulo="dashboard"`, custom element forwarding attribute as prop (`frontend/dashboard.html:361`, `frontend-hermes/src/hermes-widget.tsx:40-44`). Effect updates widget state (`frontend-hermes/src/App.tsx:19-22`, `frontend-hermes/src/store/useHermesStore.ts:44`). Confirms supplied context transfer without proving automatic tracking of every internal host navigation.

**12. frontend-hermes/src/App.tsx.** Topbar dispatches `toggle-hermes`, listener toggling panel (`frontend/components/topbar.html:25-26`, `frontend-hermes/src/App.tsx:25-35`). Event relationship 3.4.5 #2 confirms inter-unit communication.

**13. frontend-hermes/vite.config.ts.** `external: []` declares React within bundle, matching own IIFE distribution (`frontend-hermes/vite.config.ts:14-23`). Line 26 comment concerns `process.env.NODE_ENV` in same bundle without new architectural boundary.

**14. frontend/dashboard.html.** Comment names composition mechanism: host-used tag registered by provider (`frontend/dashboard.html:361-366`, `frontend-hermes/src/hermes-widget.tsx:57-58`). `frontend/dashboard.html:726` repeats “Web Component” without another claim. Custom-element registration/shadow DOM creation comments in widget entry describe same mechanism (`frontend-hermes/src/hermes-widget.tsx:15-16`, `frontend-hermes/src/hermes-widget.tsx:56-58`).

**15. frontend/dashboard.html.** Host waits for `AppRouter.init()`, then passes token to widget attribute (`frontend/dashboard.html:724-730`). Observed attribute list/callback update `App` with token (`frontend-hermes/src/hermes-widget.tsx:10-12`, `frontend-hermes/src/hermes-widget.tsx:31-44`). Actual session-credential sharing between host/widget rather than mere field availability.

**16. frontend/js/api.js.** Client actually calls page-origin API (`frontend/js/api.js:11-15`, `frontend/js/api.js:40-55`), but current page-serving server is FastAPI (`backend/main.py:257-293`). Communication function confirmed/Flask name disproven; `contradicted` prevails. Distinct from 4 because subject is API client rather than publication tunnel.

**17. frontend/js/api.js.** Implementation unconditionally uses `window.location.origin + '/api'` (`frontend/js/api.js:11-15`), confirming common origin in both described scenarios. Matches static-publishing server (`backend/main.py:257-293`). No functioning public domain was verified.

**18. ngrok_tunnel.py.** Header already identifies current server: script starts FastAPI/Uvicorn, opening HTTP tunnel to same port (`ngrok_tunnel.py:95-111`, `ngrok_tunnel.py:153-161`). Review 3.4.6 records joint unit path. Correct FastAPI naming does not eliminate divergent README line 68 claim.

## Summary

Claims: 18 (corroborated: 14, partial: 0, contradicted: 2, uncorroborated: 2). Themes: (structure: 2, composition: 8, build-deploy: 7, independence: 1).
