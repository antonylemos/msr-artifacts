---
schema: 1
id: 1255336417
full_name: cMancillaValle/ARGOS-SiVIA
commit: 4f6ef7f491ec9fc2d3e852f271e0c360549fad65
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

## Mined constructs

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| src-custom-element | frontend-hermes/src/hermes-widget.tsx:6 | frontend-hermes | custom-element | Yes | `class HermesWidget extends HTMLElement` encapsulates the React application: in `connectedCallback`, creates shadow DOM and mounts `<App>` with `createRoot` (frontend-hermes/src/hermes-widget.tsx:14-28, 42-46), reading attributes `token`, `api-base` and `modulo` (:10-12, :38-40). Active: the file is the IIFE build entry (frontend-hermes/vite.config.ts:11-15), and the bundle is loaded by unit frontend at frontend/dashboard.html:366, using the tag at frontend/dashboard.html:361. |
| src-custom-element | frontend-hermes/src/hermes-widget.tsx:16 | frontend-hermes | custom-element | Yes | `this.attachShadow({ mode: 'open' })` creates the same custom element’s shadow DOM, where it injects CSS (frontend-hermes/src/hermes-widget.tsx:19-21) and the React mounting point (:24-27); consumed by unit frontend (frontend/dashboard.html:361). |
| src-custom-element | frontend-hermes/src/hermes-widget.tsx:58 | frontend-hermes | custom-element | Yes | `customElements.define('hermes-widget', HermesWidget)`, guarded by `customElements.get` (frontend-hermes/src/hermes-widget.tsx:57), registers the tag for consumption; tag `<hermes-widget>` is used by unit frontend at frontend/dashboard.html:361 after loading `/hermes/hermes-widget.js` (frontend/dashboard.html:366). |
| src-dynamic-script | frontend/js/router.js:54 | frontend | none | No | In `loadComponent`, recreates as `<script>` the inline scripts of an HTML fragment of the unit itself (`components/<arquivo>`, frontend/js/router.js:45-57), because `innerHTML` does not execute them; fragments are `topbar.html` and `sidebar.html` from frontend/components (frontend/js/router.js:181-182). Does not load another unit’s bundle. |
| src-dynamic-script | frontend/js/router.js:93 | frontend | none | No | In `loadView`, recreates as `<script>` the inline scripts of the view loaded from the unit’s own `views/` (frontend/js/router.js:64-96), with files from map `MODULES` (frontend/js/router.js:13-29). Does not load another unit’s bundle. |
| src-dynamic-script | frontend/views/mapa_transmilenio.html:604 | frontend | none | No | `ensureLeaflet` injects the CDN Leaflet library script (`https://unpkg.com/leaflet@1.9.4/dist/leaflet.js`, frontend/views/mapa_transmilenio.html:592-608) when `L` does not yet exist; a map library rather than another unit. |
| src-html-external-script | frontend/dashboard.html:14 | frontend | none | No | `<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js">` loads the Leaflet library from a CDN rather than another unit’s bundle. |
| src-html-external-script | frontend/dashboard.html:15 | frontend | none | No | `<script src="https://cdn.tailwindcss.com">` loads the Tailwind CDN rather than another unit’s bundle. |
| src-html-external-script | frontend/index.html:23 | frontend | none | No | The same `<script src="https://cdn.tailwindcss.com">` from the Tailwind CDN, on the home page. |
| src-html-external-script | frontend/login.html:12 | frontend | none | No | The same `<script src="https://cdn.tailwindcss.com">` from the Tailwind CDN, on the login page. |
| src-cross-unit-communication | frontend-hermes/src/App.tsx:35 | frontend-hermes | communication | Yes | `window.addEventListener('toggle-hermes', handleToggle)` in the `useEffect` of `App` (frontend-hermes/src/App.tsx:25-42) opens or closes the widget panel; the event is dispatched by unit frontend’s topbar button (frontend/components/topbar.html:26). Active: `App` is mounted by the custom element (frontend-hermes/src/hermes-widget.tsx:44). Listeners are removed at frontend-hermes/src/App.tsx:39-40. |
| src-cross-unit-communication | frontend-hermes/src/App.tsx:36 | frontend-hermes | communication | Yes | `window.addEventListener('close-hermes', handleCloseEvent)` in the same `useEffect` (frontend-hermes/src/App.tsx:30-36) closes the panel; the event is dispatched by unit frontend on opening the profile drawer (frontend/dashboard.html:421). |
| src-cross-unit-communication | frontend/components/topbar.html:26 | frontend | communication | Yes | The "Hermes IA" button (**English translation:** "Hermes AI") dispatches `window.dispatchEvent(new CustomEvent('toggle-hermes'))` (frontend/components/topbar.html:24-30), listened to by the frontend-hermes unit’s widget (frontend-hermes/src/App.tsx:35). Active: the fragment is loaded into `topbar-container` by `loadComponent` (frontend/js/router.js:181; frontend/dashboard.html:85), called by `AppRouter.init()` (frontend/dashboard.html:724). |
| src-cross-unit-communication | frontend/dashboard.html:421 | frontend | communication | Yes | `toggleProfileDrawer` dispatches `window.dispatchEvent(new CustomEvent('close-hermes'))` on opening the profile drawer (frontend/dashboard.html:408-422), listened to by the frontend-hermes unit’s widget (frontend-hermes/src/App.tsx:36). |
| src-cross-unit-communication | frontend/js/router.js:71 | frontend | none | No | `document.dispatchEvent(new CustomEvent('argos:navaway'))` notifies the unit’s own views, before changing DOM, to clear timers and listeners (comment at frontend/js/router.js:68-70); listeners are only in frontend/views. Internal event. |
| src-cross-unit-communication | frontend/views/auditoria.html:219 | frontend | none | No | `addEventListener('argos:navaway', ...)` clears the view’s `setInterval` on leaving it; listens for the same unit router’s internal event (frontend/js/router.js:71). |
| src-cross-unit-communication | frontend/views/auditoria.html:288 | frontend | none | No | The same `argos:navaway` listener to clear another view interval; internal unit event (frontend/js/router.js:71). |
| src-cross-unit-communication | frontend/views/dashboard_home.html:458 | frontend | none | No | The same `argos:navaway` listener to clear the home view interval; internal unit event (frontend/js/router.js:71). |
| src-cross-unit-communication | frontend/views/infra_servidores.html:306 | frontend | none | No | The same `argos:navaway` listener to clear view polling; internal unit event (frontend/js/router.js:71). |
| src-cross-unit-communication | frontend/views/mapa_transmilenio.html:616 | frontend | none | No | Listener for `argos:navaway` removing the `resize` listener and destroying the Leaflet map (frontend/views/mapa_transmilenio.html:616-622); internal unit event (frontend/js/router.js:71). |

## Constructs outside mining

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| manual | frontend/dashboard.html:361 | frontend | custom-element | Yes | Use of tag `<hermes-widget id="hermes-ai-widget" api-base="/api" modulo="dashboard">` in the dashboard shell (comment "HERMES IA WIDGET (MICRO-FRONTEND)" at frontend/dashboard.html:358-360; **English translation:** "HERMES AI WIDGET (MICRO-FRONTEND)"); consumes the custom element defined by unit frontend-hermes (frontend-hermes/src/hermes-widget.tsx:58). |
| manual | frontend/dashboard.html:366 | frontend | script-loading | Yes | `<script src="/hermes/hermes-widget.js">` loads the frontend-hermes unit’s IIFE bundle (`fileName` at frontend-hermes/vite.config.ts:14-15), served by backend from `frontend-hermes/dist` (backend/main.py:92, 281-288). The `src-html-external-script` pattern did not capture the line because the path is local. |

## Summary

Constructs participating in composition: 9 (custom-element: 4, communication: 4, script-loading: 1).

## Notes

- The 13 `none` rows are false positives: CDN library scripts (Leaflet, Tailwind), router re-execution of inline scripts from the unit’s own HTML fragments and internal event `argos:navaway`.
- Communication between both units uses `CustomEvent` on `window`, in one direction only: frontend dispatches `toggle-hermes` and `close-hermes`, and frontend-hermes listens.
