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
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 321 — JandrySan/becas-uleam

## Repository overview

Documentation is Spanish. Main document is root `README.md` (`README.md:1-104`), written for a "Proyecto integrado Demo Day" submission (English translation: "Integrated Demo Day Project") (`README.md:1`): describes a vanilla-ts container with single login integrating three different-framework modules through iframe, Vue at `/vue/`, React at `/react/` and Angular at `/angular/` (`README.md:7-10`), each made by one member (`README.md:86-88`), compiled into one `dist` with subfolders (`README.md:32-40`) and published to Vercel as one static application (`README.md:42`, `:70-80`, `:92`). Justifies same-domain iframe instead of module federation (`README.md:94`) and says session is shared through `localStorage` (`README.md:92`). This matches previous reviews: four integrated units, three iframe and four communication relationships (3.4.5 #1-#7), separate build and joint deployment (3.4.6 #1, #2, #4, #5). Three discrepancies: README claims rewrites absent from `vercel.json` (`README.md:80`; `vercel.json:1-6`); `index.html` says session reaches all three modules through `localStorage`, but React reads no session keys (`index.html:46`); Angular README says module uses no database, but it queries Supabase (`3seguimiento-angular/README.md:3`). README omits scaffold `1verificador-vue/verificador`, an isolated unit in reviews 3.4.3 and 3.4.6.

Excluded from table: title (`README.md:1`) and business paragraph (`README.md:3`); command blocks `npm install`/`npm start` and `npm run build` (`README.md:14-17`, `:28-30`), execution instructions citing `npm` where project uses pnpm (`package.json:6`; `vercel.json:3-4`); table creation/RLS (`README.md:48-58`), database details; Vercel environment variables (`README.md:61-66`); demo login mode (`README.md:68`), container internal detail, actually unconfirmed because `src/services/supabase.ts:6-8` throws when variables are absent; retrospective note on data "inicialmente simulados en `localStorage`" (English translation: "initially simulated in browser storage") (`README.md:94`); pending URL/screenshots (`README.md:96-104`). Besides line 3, `3seguimiento-angular/README.md` contains execution command and rubric list (routes, components, signals, `SeguimientoStoreService`; `3seguimiento-angular/README.md:5-25`), internal module details. `1verificador-vue/README.md` and `1verificador-vue/verificador/README.md` are standard Vue 3 + Vite template READMEs without project claims. Mining recorded two `doc-integration-technology` occurrences at `README.md:7` and `README.md:94`, addressed in rows 2, 12 and 13.

Comments/descriptive fields read: `index.html` (subtitle "Portal único: elegibilidad,
postulación y seguimiento." (English translation: "Single portal: eligibility, application and tracking"), `index.html:15`, repeating row 2’s container role, and line 46 note, becoming row 14); `src/main.ts` and `scripts/build-integrado.mjs`, without comments (console message "dist integrado listo: /, /vue/, /react/, /angular/" (English translation: "integrated distribution ready at the listed paths"), `scripts/build-integrado.mjs:20`, repeats row 5); `scripts/generar-angular-env.mjs:76-77`, only warning environment is generated; `vercel.json`, `pnpm-workspace.yaml`, `vite.config.ts` files and `angular.json`, without comments; root/module `package.json` files, without `description`.

## Claims

| # | Document | Claim | Theme | Corroboration | Evidence |
|---|---|---|---|---|---|
| 1 | 3seguimiento-angular/README.md:3 | "Prototipo navegable con datos simulados en memoria. No usa base de datos." (English translation: "navigable prototype with simulated in-memory data; uses no database") | other | contradicted | 3seguimiento-angular/src/app/services/seguimiento-store.service.ts:42-44; 3seguimiento-angular/src/app/services/supabase.service.ts:24-27; 3.4.6 #5 |
| 2 | README.md:7 | "**Contenedora vanilla-ts**: login único, menú principal e integración por iframe." (English translation: "vanilla-ts container: single login, main menu and iframe integration") | structure | corroborated | 3.4.3 (row `.`); 3.4.4 index.html:24; 3.4.5 #1-#3; src/main.ts:59-60, 159 |
| 3 | README.md:8-10 | "**Vue** (`/vue/`): verificador de elegibilidad." / "**React** (`/react/`): postulación y documentos." / "**Angular** (`/angular/`): seguimiento de solicitudes." (English translation: "Vue: eligibility verifier; React: applications and documents; Angular: application tracking") | structure | corroborated | 3.4.3 (rows 1verificador-vue, 2postulacion-react, 3seguimiento-angular); 3.4.6 #2, #4, #5 |
| 4 | README.md:19-24 | "Durante desarrollo se levantan los módulos por separado" (English translation: "in development modules start separately, ports 3000, 5173, 5174 and 4200") | independence | corroborated | package.json:14-15; src/main.ts:24-34; 3.4.6 #2, #4, #5 |
| 5 | README.md:32-40 | "El resultado queda en una sola carpeta:" `dist/ index.html vue/ react/ angular/` (English translation: "result resides in a single folder") | build-deploy | corroborated | 3.4.6 #1, #2, #4, #5; scripts/build-integrado.mjs:14-19 |
| 6 | README.md:42 | "una URL pública, módulos en subcarpetas y navegación interna con hash routing" (English translation: "one public URL, modules in subfolders and internal hash-routing navigation") | build-deploy | corroborated | 3.4.6 #1; vercel.json:3-5; 1verificador-vue/src/main.ts:16; 2postulacion-react/src/main.tsx:11; 3seguimiento-angular/src/main.ts:15 |
| 7 | README.md:46, 59 | "Crear un proyecto Supabase único para todo el equipo" / "el proyecto Supabase compartido" (English translation: "one shared Supabase project") | other | corroborated | src/services/supabase.ts:3-10; 1verificador-vue/src/services/supabase.ts:3-6; 2postulacion-react/src/services/supabase.ts:4-11; scripts/generar-angular-env.mjs:48-49; 3seguimiento-angular/src/app/services/supabase.service.ts:24-27 |
| 8 | README.md:70-78 | "Deploy en Vercel" … "Output directory: `dist`" (English translation: "deploy to Vercel; output directory as stated") | build-deploy | corroborated | 3.4.6 #1; vercel.json:3-5 |
| 9 | README.md:80 | "El archivo `vercel.json` ya incluye rewrites para `/vue/`, `/react/` y `/angular/`." (English translation: "the `vercel.json` already includes rewrites for the three paths") | build-deploy | contradicted | vercel.json:1-6; 3.4.6 (Repository overview) |
| 10 | README.md:86-88 | "Integrante 1: módulo Vue" / "Integrante 2: módulo React" / "Integrante 3: módulo Angular" (English translation: "each member built one module") | independence | uncorroborated | — |
| 11 | README.md:92 | "El login se dejó en la contenedora para mantener una sesión única compartida mediante `localStorage`" (English translation: "login remains in container to maintain a single session shared through `localStorage`") | composition | corroborated | 3.4.4 src/main.ts:138; 3.4.5 #4, #6 |
| 12 | README.md:94 | "integrar aplicaciones hechas con frameworks distintos sin usar herramientas complejas como module federation" (English translation: "integration without module federation") | composition | corroborated | 3.4.2 (no dependency); 3.4.4 (Notes) |
| 13 | README.md:94 | "se carga desde un iframe bajo el mismo dominio" (English translation: "each module loads in a same-domain iframe") | composition | corroborated | index.html:24-26; 3.4.5 #1-#3; 3.4.6 #1, #2, #4, #5 |
| 14 | index.html:46 | "La sesión se comparte con los tres módulos mediante `localStorage`." (English translation: "session is shared with all three modules through `localStorage`") | composition | contradicted | 3.4.5 #4, #5, #6; src/main.ts:136-141; 2postulacion-react/src/context/PostulacionContext.tsx:4-6, 45-52 |

## Observations

**1. 3seguimiento-angular/README.md:3.** Angular module README describes a prototype with in-memory data and no database. Snapshot shows the opposite: `SeguimientoStoreService` loads applications from table `solicitudes` through Supabase client (`3seguimiento-angular/src/app/services/seguimiento-store.service.ts:42-44`) and writes statuses to `seguimiento` (`:196-216`); `SupabaseService` creates client and throws without URL/key (`3seguimiento-angular/src/app/services/supabase.service.ts:11-27`); module build depends on environment generated with Supabase variables (3.4.6 #5). README appears to predate Supabase integration mentioned in root README retrospective note (`README.md:94`).

**2. README.md:7.** Attributes single login, menu and iframe integration to container. Root is frontend unit with own entry/build (3.4.3, row `.`); Supabase Auth login is at `src/main.ts:59-60`, called at `src/main.ts:159`; menu is `<nav class="tabs">` declaring three modules (3.4.4, `index.html:24`); container loads each module in iframe (3.4.5 #1-#3). Sentence is not split because all parts are confirmed; Theme follows first property, container role. Same role recurs in "una contenedora vanilla-ts y tres módulos por
framework" (English translation: "a vanilla-ts container and three framework modules") (`README.md:92`) and subtitle `index.html:15`; "login se dejó en la contenedora" (English translation: "login remained in container") at `README.md:92` also belongs to this claim, while same-sentence shared session is row 11.

**3. README.md:8-10.** Three modules/paths match structural review units and build/deployment review’s "Onde é servida" column (English translation: "Where served"): `/vue/`, `/react/` and `/angular/` (3.4.6 #2, #4, #5). Angular loads at `/angular/#/seguimiento` (`index.html:26`), within same prefix. List excludes scaffold `1verificador-vue/verificador`, counted as structural unit but not integrated (3.4.6 #3); section title is "Módulos integrados" (English translation: "Integrated modules") (`README.md:5`), so omission does not contradict claim.

**4. README.md:19-24.** Each module has own development server: root `start` starts through `concurrently` container Vite at 3000, Vue at 5173, React at 5174 and Angular `ng serve` at 4200 (`package.json:14-15`); container changes iframe URLs to these ports when running at `localhost:3000` (`src/main.ts:24-34`). README requests `npm start` (`README.md:16`), but script calls `pnpm --dir` for modules (`package.json:14`).

**5. README.md:32-40.** Tree of `dist` with `index.html` and subfolders `vue/`, `react/` and `angular/` is what `scripts/build-integrado.mjs:14-19` assembles by copying three builds to root `dist` after container `vite build` (3.4.6 #1, #2, #4, #5). Same claim recurs in "usar subcarpetas" (English translation: "use subfolders") (`README.md:92`), "cada módulo queda compilado en su carpeta" (English translation: "each module is compiled in its folder") (`README.md:94`) and `scripts/build-integrado.mjs:20` message.

**6. README.md:42.** One public URL: one deployment exists, integrated `dist` (`vercel.json:3-5`; 3.4.6 #1); published address is absent from snapshot (`README.md:100`, "pendiente", English translation: "pending"). Subfolder modules: row 5. Hash routing: all three modules use it (`1verificador-vue/src/main.ts:16`, `createWebHashHistory('/vue/')`; `2postulacion-react/src/main.tsx:11`, `HashRouter`; `3seguimiento-angular/src/main.ts:15`, `withHashLocation()`). All parts are confirmed; sentence remains one row with first-property Theme. `README.md:92` repeats claim ("usar subcarpetas y hash routing […]
desplegar todo como una sola app estática", English translation: "use subfolders and hash routing […] deploy everything as one static app").

**7. README.md:46, 59.** README requests one team Supabase project and says flow depends on shared project. Container (`src/services/supabase.ts:3-10`), Vue (`1verificador-vue/src/services/supabase.ts:3-6`), React (`2postulacion-react/src/services/supabase.ts:4-11`) and Angular (`3seguimiento-angular/src/app/services/supabase.service.ts:24-27`, with URL/key generated from `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` by `scripts/generar-angular-env.mjs:48-49`) use same variable pair; Vue queries `becas` (`1verificador-vue/src/views/HomeView.vue:47-50`), React writes `solicitudes` (`2postulacion-react/src/pages/VistaPrevia.tsx:47-48`) and Angular reads it (`3seguimiento-angular/src/app/services/seguimiento-store.service.ts:43-44`). Four units use same backend.

**8. README.md:70-78.** Vercel deployment with `dist` output is sole deployment artifact (`vercel.json:3-5`; 3.4.6 #1). Step 4 requests checking build command `npm run build` (`README.md:76`), while `vercel.json:4` sets `pnpm run build`; both run same `build` script (`package.json:17`), and difference does not change unit building/deployment.

**9. README.md:80.** `vercel.json` lacks `rewrites` (`vercel.json:1-6`): only `installCommand`, `buildCommand` and `outputDirectory`. Subfolders are served as static `dist` files, per build/deployment review overview.

**10. README.md:86-88.** One-module-per-member division appears under "Completar antes de
entregar" (English translation: "Complete before submission") (`README.md:84`) without names. Nothing in snapshot records authorship. `README.md:92` repeats idea ("para que cada integrante pueda defender su parte de forma independiente", English translation: "so each member can defend their part independently").

**11. README.md:92.** Container logs in and writes `token`, `usuario`, `becas_session` and `supabase_user_id` to `localStorage` in `saveSession` (3.4.4, `src/main.ts:138`; `src/main.ts:136-141`). Vue reads `usuario` (3.4.5 #4; `1verificador-vue/src/views/HomeView.vue:21`) and Angular reads `becas_session` and `usuario` (3.4.5 #6); at least two units use session, making claim `corroborated`. Sharing depends on same origin, present only in integrated deployment (3.4.4, Notes).

**12. README.md:94.** Dependency review found no integration technology (3.4.2), and source-code review search found neither `loadRemote`, dynamic `import()` nor script injection (3.4.4, Notes). Integration uses only iframe and messages (3.4.5 #1-#6).

**13. README.md:94.** Buttons declare relative paths (`index.html:24-26`) loaded by iframe (3.4.5 #1-#3), and four builds share deployment (3.4.6 #1, #2, #4, #5), hence same domain. Development differs: URLs become different `localhost` ports (`src/main.ts:24-34`), as README itself indicates (`README.md:19-24`). First sentence part, "cada módulo queda compilado en su carpeta" (English translation: "each module is compiled in its folder"), repeats row 5.

**14. index.html:46.** Login screen note extends session through `localStorage` to all three modules. Vue reads `usuario` (3.4.5 #4) and Angular reads `becas_session` and `usuario` (3.4.5 #6), but React reads only student-data `becas_*` keys (`2postulacion-react/src/context/PostulacionContext.tsx:4-6`, `:45-52`), none of session keys written at `src/main.ts:136-141`; session reaches it only through `BECAS_PORTAL_STATE` via `postMessage` (3.4.5 #5). React part is disproven, making claim `contradicted`. Separate from row 11 because it names all three modules as subject.

## Summary

Claims: 14 (corroborated: 10, partial: 0, contradicted: 3, uncorroborated: 1). Themes: (structure: 2, composition: 4, build-deploy: 4, independence: 2, other: 2).
