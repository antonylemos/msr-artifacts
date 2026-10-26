---
schema: 1
id: 1294611998
full_name: JandrySan/becas-uleam
commit: 613ce6ac8c615f494d214e3d1e01fa3d08e02267
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 321 — JandrySan/becas-uleam

## Mined constructs

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| src-custom-element | src/main.ts:9 | . | none | No | `const $ = <T extends HTMLElement>(id: string) => document.getElementById(id) as T;` is a generic `getElementById` helper; `extends HTMLElement` is a TypeScript type constraint rather than a custom element definition. |
| src-iframe | index.html:61 | . | embedding | Yes | `<iframe id="moduleFrame" src="about:blank">` is the frame where the container loads the active module: `activate` changes `frame.src` to the button’s `data-src` (src/main.ts:12, :87-97), and buttons point to `/vue/`, `/react/` and `/angular/#/seguimiento` (index.html:24-26), where the integrated build copies 1verificador-vue, 2postulacion-react and 3seguimiento-angular (scripts/build-integrado.mjs:14-19). `showApp` activates the first module after login (src/main.ts:120-130); the entry is index.html:65. |
| src-cross-unit-communication | 1verificador-vue/src/views/HomeView.vue:92 | 1verificador-vue | communication | Yes | `window.parent?.postMessage({ tipo: 'BECAS_DATOS_ESTUDIANTE', datos }, '*')` at the end of `evaluar` (1verificador-vue/src/views/HomeView.vue:64, :92-99), triggered by form submission (:122); the target is container `.`, which writes data to `localStorage` and resends state (src/main.ts:192-196). HomeView is route `/` (1verificador-vue/src/main.ts:7, :11). |
| src-cross-unit-communication | 1verificador-vue/src/views/HomeView.vue:103 | 1verificador-vue | communication | Yes | `window.parent?.postMessage({ modulo: 'postulacion' }, '*')` in `iniciarPostulacion` (1verificador-vue/src/views/HomeView.vue:101-104), connected to the "Iniciar postulación" button (**English translation:** "Start application") (:209); container `.` changes the iframe to the React module with `activateBySrc('/react/')` (src/main.ts:199). |
| src-cross-unit-communication | 2postulacion-react/src/context/PostulacionContext.tsx:60 | 2postulacion-react | communication | Yes | `window.parent?.postMessage({ tipo: 'BECAS_REACT_READY' }, '*')` in the mounting `useEffect` of `PostulacionProvider` (2postulacion-react/src/context/PostulacionContext.tsx:53-62), which wraps App (2postulacion-react/src/main.tsx:12); container `.` responds with `sendState` (src/main.ts:203, :207). The same effect listens for `message` (:59) and applies `BECAS_PORTAL_STATE` (:56). |
| src-cross-unit-communication | 2postulacion-react/src/context/PostulacionContext.tsx:69 | 2postulacion-react | communication | Yes | `window.parent?.postMessage({ tipo: 'BECAS_POSTULACION_UPDATE', datos, documentos }, '*')` on every `estado` change (2postulacion-react/src/context/PostulacionContext.tsx:63-70); the target is container `.`’s window, whose listener (src/main.ts:189-209) does not handle this `tipo`. See Notes. |
| src-cross-unit-communication | 2postulacion-react/src/pages/VistaPrevia.tsx:99 | 2postulacion-react | communication | Yes | `window.parent?.postMessage({ modulo: 'seguimiento' }, '*')` after saving the application in `enviarPostulacion` (2postulacion-react/src/pages/VistaPrevia.tsx:29, :99), connected to the button at :126; the page is route `/resumen` (2postulacion-react/src/App.tsx:17). Container `.` changes the iframe to the Angular module with `activateBySrc('/angular/')` (src/main.ts:200). |
| src-cross-unit-communication | 3seguimiento-angular/src/app/app.component.ts:18 | 3seguimiento-angular | communication | Yes | `window.parent?.postMessage({ tipo: 'BECAS_ANGULAR_READY' }, '*')` in the `ngOnInit` of `AppComponent` (3seguimiento-angular/src/app/app.component.ts:17-19), initialized at 3seguimiento-angular/src/main.ts:14; container `.` responds with `sendState` (src/main.ts:204, :207). The component listens for `window:message` and applies `BECAS_PORTAL_STATE` with `aplicarSesion` (3seguimiento-angular/src/app/app.component.ts:21-27). |
| src-cross-unit-communication | src/main.ts:84 | . | communication | Yes | `frame.contentWindow?.postMessage(payload, '*')` in `sendState` sends `BECAS_PORTAL_STATE` with session, token, user and id (src/main.ts:75-85) to the iframe module; called after `activate` (:96), on iframe `load` (:187) and in response to module messages (:196, :207). Targets are 3seguimiento-angular (3seguimiento-angular/src/app/app.component.ts:24-26) and 2postulacion-react (2postulacion-react/src/context/PostulacionContext.tsx:56). |

## Constructs outside mining

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| manual | index.html:24 | . | host-relationship | Yes | Buttons in `<nav class="tabs">` declare the container’s three modules and their locations: `data-src="/vue/"`, `"/react/"` and `"/angular/#/seguimiento"`, with title and technology (index.html:23-27); `activate` uses these attributes to load the iframe (src/main.ts:91-94). In development (`localhost:3000`), URLs are replaced by `http://localhost:5173/vue/`, `:5174/react/` and `:4200/#/seguimiento` (src/main.ts:24-34). |
| manual | src/main.ts:138 | . | communication | Yes | `saveSession` writes the session to `localStorage` after login: `token`, `usuario`, `becas_session` and `supabase_user_id` (src/main.ts:133-145, called at :169); index.html:46 says the session "se comparte con los tres módulos mediante localStorage" (**English translation:** "is shared with the three modules through local storage"). 3seguimiento-angular reads `becas_session` on creating `AuthService` (3seguimiento-angular/src/app/services/auth.service.ts:8, :13-15) and `usuario` at 3seguimiento-angular/src/app/services/seguimiento-store.service.ts:111. The units share an origin in integrated deployment (scripts/build-integrado.mjs:14-19; vercel.json:3-5). |
| manual | 1verificador-vue/src/views/HomeView.vue:88 | 1verificador-vue | communication | Yes | `evaluar` writes `becas_datos_estudiante`, `becas_nombre` and `becas_email` to `localStorage` (1verificador-vue/src/views/HomeView.vue:88-90); 2postulacion-react reads the same keys in the initial `PostulacionProvider` state (2postulacion-react/src/context/PostulacionContext.tsx:5, :45-52) and reads `becas_datos_estudiante` when submitting the application (2postulacion-react/src/pages/VistaPrevia.tsx:37-39). Container also writes these keys on receiving `BECAS_DATOS_ESTUDIANTE` (src/main.ts:193-195), and React rewrites them (2postulacion-react/src/context/PostulacionContext.tsx:65-68). |

## Summary

Constructs participating in composition: 11 (embedding: 1, communication: 9, host-relationship: 1).

## Notes

- `src-custom-element` at src/main.ts:9 is a false positive: `extends HTMLElement` appears in a generic type constraint.
- `BECAS_POSTULACION_UPDATE` (2postulacion-react/src/context/PostulacionContext.tsx:69) goes to container, which has no branch for this `tipo` (src/main.ts:189-209). 3seguimiento-angular handles this `tipo` and `BECAS_POSTULACION_ENVIADA` (3seguimiento-angular/src/app/app.component.ts:28-30), but Angular runs in another iframe and no unit forwards the message; no file sends `BECAS_POSTULACION_ENVIADA`. The row remained `Yes` because the message is dispatched to another unit; the lack of a consumer is recorded here.
- Container expects `BECAS_VUE_READY` (src/main.ts:205), but 1verificador-vue neither sends this message nor listens for `message`; the Vue module receives `BECAS_PORTAL_STATE` without handling it.
- Sharing through `localStorage` depends on the same origin, present only in integrated deployment; at development URLs (src/main.ts:24-34), modules are on different ports and only `postMessage` connects the units.
- Scaffold `1verificador-vue/verificador/` (a `Yes` unit in the structural review) has no composition construct: the step 4 search found no `import()`, `postMessage`, `localStorage`, iframe or custom element in its files.
- The step 4 search found no dynamic `import()`, `React.lazy`, `defineAsyncComponent`, `loadRemote`, `customElements`, `CustomEvent`, `BroadcastChannel` or `<script>` injection in the snapshot. The `message` listeners (src/main.ts:189; 2postulacion-react/src/context/PostulacionContext.tsx:59; 3seguimiento-angular/src/app/app.component.ts:21) are usage points of the already recorded `postMessage` and did not become rows.
