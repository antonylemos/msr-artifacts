---
schema: 1
id: 1294611998
full_name: JandrySan/becas-uleam
commit: 613ce6ac8c615f494d214e3d1e01fa3d08e02267
inputs:
  mining:
    output: data/mining/mfe-mining-001
    version: "1"
    config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
  inspection:
    output: data/inspections/mfe-dependencies-001
    version: "1"
    config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 321 — JandrySan/becas-uleam

## Repository overview

An academic "Demo Day" project (`README.md:1`) for a university scholarship workflow: a vanilla-TS container at the root (`.`) handles single login with Supabase and loads, in a single `<iframe>` (`index.html:61`), three modules with different frameworks — Vue (`1verificador-vue`, eligibility), React (`2postulacion-react`, application) and Angular (`3seguimiento-angular`, tracking) —, one per team member (`README.md:7-10`, `README.md:86-88`). The README says the team avoided Module Federation, preferring to compile each module in its folder and load it through an iframe under the same domain (`README.md:94`), with session shared through `localStorage` (`README.md:92`).

The container is the host: buttons in `<nav class="tabs">` declare all three modules through `data-src` (`/vue/`, `/react/`, `/angular/#/seguimiento`, `index.html:24-26`), and `activate` switches `frame.src` to the selected module (`src/main.ts:87-97`); after login, `showApp` opens Vue for students and Angular for administrators, disabling the other two (`src/main.ts:120-130`). Paths match each build's `base` (`1verificador-vue/vite.config.ts:5`, `2postulacion-react/vite.config.ts:5`, `3seguimiento-angular/package.json:7`) and folders where `scripts/build-integrado.mjs:14-19` copies builds into the root's `dist`, the only deployment (`package.json:17`; `vercel.json:3-5`). In development (`localhost:3000`), URLs become ports 5173, 5174 and 4200 (`src/main.ts:24-34`).

Navigation and state use two channels. Through `postMessage`, modules ask the container to switch modules (`{ modulo: 'postulacion' }`, `{ modulo: 'seguimiento' }`), report readiness and send data; the container responds with `BECAS_PORTAL_STATE` to the iframe module (`src/main.ts:75-85`, `:189-209`). Through `localStorage`, common to units only in integrated deployment (same origin), the container writes the session, and modules write and read student data. The workflow is linear: Vue evaluates → React applies → Angular tracks.

What did not become a relationship: the container waits for `BECAS_VUE_READY` (`src/main.ts:205`), never sent by Vue; `BECAS_POSTULACION_UPDATE` goes to the container, which does not handle it, while Angular, which handles it (`3seguimiento-angular/src/app/app.component.ts:28-30`), runs in another load of the same iframe and receives it from nobody. Scaffold `1verificador-vue/verificador` is an isolated unit: it is outside the workspace and integrated build, and no unit loads it.

## Relationships

| # | Source | Target | Type | Direction | Mechanism | In snapshot | Active | Configuration | Code |
|---|---|---|---|---|---|---|---|---|---|
| 1 | . | 1verificador-vue | page → embedded-frontend | source → target | iframe | Yes | Yes | 1verificador-vue/vite.config.ts:5 (`base: '/vue/'`); scripts/build-integrado.mjs:14 (copies `1verificador-vue/dist` to `dist/vue`) | index.html:61; index.html:24 |
| 2 | . | 2postulacion-react | page → embedded-frontend | source → target | iframe | Yes | Yes | 2postulacion-react/vite.config.ts:5 (`base: '/react/'`); scripts/build-integrado.mjs:15 (copies `2postulacion-react/dist` to `dist/react`) | index.html:61; index.html:24 |
| 3 | . | 3seguimiento-angular | page → embedded-frontend | source → target | iframe | Yes | Yes | 3seguimiento-angular/package.json:7 (`ng build --base-href /angular/`); scripts/build-integrado.mjs:16-19 (copies the Angular build to `dist/angular`) | index.html:61; index.html:24 |
| 4 | . | 1verificador-vue | communication | bidirectional | events | Yes | Yes | — | 1verificador-vue/src/views/HomeView.vue:92; 1verificador-vue/src/views/HomeView.vue:103; src/main.ts:138 |
| 5 | . | 2postulacion-react | communication | bidirectional | events | Yes | Yes | — | 2postulacion-react/src/context/PostulacionContext.tsx:60; 2postulacion-react/src/context/PostulacionContext.tsx:69; 2postulacion-react/src/pages/VistaPrevia.tsx:99; src/main.ts:84 |
| 6 | . | 3seguimiento-angular | communication | bidirectional | events | Yes | Yes | — | 3seguimiento-angular/src/app/app.component.ts:18; src/main.ts:84; src/main.ts:138 |
| 7 | 1verificador-vue | 2postulacion-react | communication | source → target | other | Yes | Yes | — | 1verificador-vue/src/views/HomeView.vue:88 |

## Observations

**1. . → 1verificador-vue.** The first navigation button points to `data-src="/vue/"` (`index.html:24`), and `activate` puts that value in `frame.src` of iframe `moduleFrame` (`index.html:61`; `src/main.ts:91`). The target was resolved through two matches: `/vue/` is the Vue build's `base` (`1verificador-vue/vite.config.ts:5`) and the folder where `scripts/build-integrado.mjs:14` copies `1verificador-vue/dist`. It is the module opened by default for students (`src/main.ts:129`) and is disabled for administrators (`src/main.ts:121-123`).

**2. . → 2postulacion-react.** Same pattern with `data-src="/react/"` (`index.html:25`), the React build's `base` (`2postulacion-react/vite.config.ts:5`) and copy destination in `scripts/build-integrado.mjs:15`. Besides clicking, the container opens this module when Vue requests `{ modulo: 'postulacion' }` (`src/main.ts:199`; relationship 4).

**3. . → 3seguimiento-angular.** Same pattern with `data-src="/angular/#/seguimiento"` (`index.html:26`). Prefix `/angular/` is the Angular build's `--base-href` (`3seguimiento-angular/package.json:7`) and the copy folder in `scripts/build-integrado.mjs:16-19`. It is the module opened for administrators (`src/main.ts:124`) and the one the container opens when React requests `{ modulo: 'seguimiento' }` (`src/main.ts:200`; relationship 5).

**4. . → 1verificador-vue.** Vue sends the container window `BECAS_DATOS_ESTUDIANTE` at the end of `evaluar` (`1verificador-vue/src/views/HomeView.vue:92-99`) and `{ modulo: 'postulacion' }` in `iniciarPostulacion` (`:101-104`); the container writes data and switches the iframe to React (`src/main.ts:192-199`). In the other direction, the container writes `usuario` in `localStorage` in `saveSession` (`src/main.ts:137`, line `src/main.ts:138` in the source code review), and Vue reads that key to fill the form's email (`1verificador-vue/src/views/HomeView.vue:21`). The source code review names only Angular as a session reader; Vue was resolved here through reading `usuario`. Hence direction is `bidirectional`. The trio combines channel `postMessage` and state through `localStorage`; under the researcher's rule of 24/10, mechanism is `events`. `BECAS_PORTAL_STATE` from `sendState` (`src/main.ts:84`) also reaches Vue when it is in the iframe, but Vue does not listen to `message`, and the source code review names only React and Angular as this line's targets; hence `src/main.ts:84` is absent from this row.

**5. . → 2postulacion-react.** React reports readiness with `BECAS_REACT_READY` on mounting `PostulacionProvider` (`2postulacion-react/src/context/PostulacionContext.tsx:53-62`), sends `BECAS_POSTULACION_UPDATE` on each state change (`:63-70`) and requests `{ modulo: 'seguimiento' }` after writing the application (`2postulacion-react/src/pages/VistaPrevia.tsx:99`). The container responds to `READY` with `sendState` (`src/main.ts:202-207`), whose `BECAS_PORTAL_STATE` React applies (`2postulacion-react/src/context/PostulacionContext.tsx:56`): sending both ways, hence `bidirectional`. This row has only channel `postMessage`: session keys written in `src/main.ts:136-141` are not read by React, which reads keys `becas_*` (`2postulacion-react/src/context/PostulacionContext.tsx:4-6`). `BECAS_POSTULACION_UPDATE` has no branch in the container listener (`src/main.ts:189-209`); the row counts through sending, as recorded by the source code review.

**6. . → 3seguimiento-angular.** Angular sends `BECAS_ANGULAR_READY` in `ngOnInit` (`3seguimiento-angular/src/app/app.component.ts:17-19`), the container responds with `sendState` (`src/main.ts:204`, `:207`, `:84`), and Angular applies `BECAS_PORTAL_STATE` with `aplicarSesion` (`3seguimiento-angular/src/app/app.component.ts:21-27`): sending both ways, `bidirectional`. Additionally, the session written by the container (`src/main.ts:136-141`) is read by Angular in `becas_session` (`3seguimiento-angular/src/app/services/auth.service.ts:13-15`) and `usuario` (`3seguimiento-angular/src/app/services/seguimiento-store.service.ts:111`). The trio combines `postMessage` and `localStorage`; under the researcher's rule of 24/10, mechanism is `events`.

**7. 1verificador-vue → 2postulacion-react.** Vue writes `becas_datos_estudiante`, `becas_nombre` and `becas_email` in `evaluar` (`1verificador-vue/src/views/HomeView.vue:88-90`), and React reads the same keys in `PostulacionProvider`'s initial state (`2postulacion-react/src/context/PostulacionContext.tsx:4-6`, `:45-52`) and `becas_datos_estudiante` on submitting the application (`2postulacion-react/src/pages/VistaPrevia.tsx:37-39`). Mechanism `other`: state is shared through `localStorage` under the same origin, without a message between both modules, and the trio has no event channel. The connection only works in integrated deployment; on development ports (`src/main.ts:24-34`), origins differ. React rewrites these keys (`2postulacion-react/src/context/PostulacionContext.tsx:65-68`), and the container also writes them on receiving `BECAS_DATOS_ESTUDIANTE` (`src/main.ts:193-195`), but none of those lines is a construct in the source code review; direction follows the recorded write.

## Summary

Relationships: 7 (page → embedded-frontend: 3, communication: 4). Active: 7. Target outside the snapshot: 0.
Units without a relationship: 1verificador-vue/verificador.

