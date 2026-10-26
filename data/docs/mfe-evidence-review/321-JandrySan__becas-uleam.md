---
schema: 1
id: 1294611998
full_name: JandrySan/becas-uleam
commit: 613ce6ac8c615f494d214e3d1e01fa3d08e02267
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

# 321 — JandrySan/becas-uleam

## Repository overview

Observed chain starts with container and three modules with own entries/builds (#13, #14, #16, #17), passes through code declaring targets/switching iframe (#2, #10), reaches three active embedding relationships (#18–#20). Window messages and same-origin storage support navigation/state transfer (#3–#9, #11, #12; #21–#24). Four integrated builds enter one static deployment (#25, #26, #28, #29); nested Vue scaffold also frontend unit in structure review, but isolated without observed deployment (#15, #27).

No dependency row in 3.4.2, so technology dimension has no manifest observation. No configuration block cited in tables meets dimension 2 scope: Vite configs declare framework plugins/publication bases, angular.json conventional application build, manifests/workspace projects/scripts, vercel.json publishes dist. Iframe target URLs reside in application code (#10), not tool configuration. Publication bases remain in structure/composition/build excerpts without becoming remote configuration.

Misleading signals are TypeScript constraint mistaken for custom element (#1) and mention denying Module Federation (#41). React send without container receiver does not demonstrate Angular update (#6, #22). Vue does not implement READY/state reception contract expected by container (#21, #45). History does not clarify these contracts’ past, but snapshot limits clear (#44, #45). No abandonment inferred.

Documentation corroborates integrated organization, but records three contradictions: Angular persistence described without database (#30), promised absent rewrites (#38), and localStorage session improperly extended to all three modules (#43). History clarifies first two mismatches (#46, #47); session note origin remains inconclusive (#48). Attribution of modules to team members remains uncorroborated (#39). Limits do not undo composition relationships recorded active.

## Observations

### 1. src/main.ts:9

**Observation:** Helper `$` uses `getElementById` with generic parameter `T extends HTMLElement`.

**Interpretation:** Type constraint does not define custom element; mining false positive.

### 2. index.html:61; index.html:24-26; src/main.ts:87-97; scripts/build-integrado.mjs:14-19

**Observation:** Iframe `moduleFrame` starts at `about:blank`; `activate` assigns `frame.src` from buttons’ `data-src`: `/vue/`, `/react/`, `/angular/#/seguimiento`. Three module builds copied to these subfolders.

**Interpretation:** Container loads three frontend units into common iframe area.

### 3. 1verificador-vue/src/views/HomeView.vue:64-99; 1verificador-vue/src/views/HomeView.vue:122; src/main.ts:192-196

**Observation:** Submit executes `evaluar`, sending `BECAS_DATOS_ESTUDIANTE` to parent window; container listener saves data and calls `sendState`.

**Interpretation:** Vue sends data to container through window message. Target obtained through `window.parent`.

### 4. 1verificador-vue/src/views/HomeView.vue:101-104; 1verificador-vue/src/views/HomeView.vue:209; src/main.ts:199

**Observation:** Start-application button calls `iniciarPostulacion`, sending `{ modulo: postulacion }` to parent window. Container calls `activateBySrc` with `/react/`.

**Interpretation:** Vue requests navigation from container, selecting React.

### 5. 2postulacion-react/src/context/PostulacionContext.tsx:53-62; 2postulacion-react/src/main.tsx:12; src/main.ts:203-207

**Observation:** On provider mount, React registers `message` listener, handles `BECAS_PORTAL_STATE` and sends `BECAS_REACT_READY` to parent window. Container responds by calling `sendState`.

**Interpretation:** Handshake connects React/container; send targets parent window.

### 6. 2postulacion-react/src/context/PostulacionContext.tsx:63-70; src/main.ts:189-209

**Observation:** State-change effect sends `BECAS_POSTULACION_UPDATE` to parent window. Container listener has no branch for this type.

**Interpretation:** Inter-unit send retained as Composition Yes in 3.4.4, but no container consumer; does not prove Angular update.

### 7. 2postulacion-react/src/pages/VistaPrevia.tsx:99; 2postulacion-react/src/pages/VistaPrevia.tsx:126; 2postulacion-react/src/App.tsx:17; src/main.ts:200

**Observation:** Summary page sends `{ modulo: seguimiento }` to parent after application submission; container calls `activateBySrc` with `/angular/`.

**Interpretation:** React requests container navigation, selecting Angular.

### 8. 3seguimiento-angular/src/app/app.component.ts:17-27; 3seguimiento-angular/src/main.ts:14; src/main.ts:204-207

**Observation:** `ngOnInit` sends `BECAS_ANGULAR_READY` to parent window; container responds with state and Angular listener applies `BECAS_PORTAL_STATE`.

**Interpretation:** Handshake links Angular/container through messages; send targets parent window.

### 9. src/main.ts:75-85; src/main.ts:96; src/main.ts:187; src/main.ts:196-207; 2postulacion-react/src/context/PostulacionContext.tsx:56; 3seguimiento-angular/src/app/app.component.ts:24-26

**Observation:** `sendState` sends `BECAS_PORTAL_STATE` with session, token, user and id to `frame.contentWindow` after activation, loading and messages. React/Angular have listeners for type.

**Interpretation:** Mechanism sends state to current iframe module; receiving unit depends on loaded module.

### 10. index.html:23-27; src/main.ts:24-34; src/main.ts:91-94

**Observation:** Container buttons declare targets `/vue/`, `/react/`, `/angular/#/seguimiento`, with title/technology. `activate` loads target in iframe; development attributes receive URLs with own ports.

**Interpretation:** Application-executed registry names three composition targets. UI code rather than tool configuration file.

### 11. src/main.ts:133-145; src/main.ts:169; 3seguimiento-angular/src/app/services/auth.service.ts:8-15; 3seguimiento-angular/src/app/services/seguimiento-store.service.ts:111; scripts/build-integrado.mjs:14-19; vercel.json:3-5

**Observation:** After login, `saveSession` writes `token`, `usuario`, `becas_session`, `supabase_user_id`. Angular reads `becas_session` and `usuario`; integrated builds published under same origin.

**Interpretation:** Session links container/Angular through same-origin storage; distinct development ports limit sharing.

### 12. 1verificador-vue/src/views/HomeView.vue:88-90; 2postulacion-react/src/context/PostulacionContext.tsx:4-6; 2postulacion-react/src/context/PostulacionContext.tsx:45-52; 2postulacion-react/src/pages/VistaPrevia.tsx:37-39

**Observation:** Vue writes `becas_datos_estudiante`, `becas_nombre`, `becas_email`; initial React state reads same keys and application submission reads student data.

**Interpretation:** Shared storage transfers Vue data to React when both use same origin.

### 13. ./; index.html:65; src/main.ts:87-97; package.json:15-17

**Observation:** Root has HTML entry for `src/main.ts`, switching iframe, and own Vite build.

**Interpretation:** Container frontend unit with own entry/build.

### 14. 1verificador-vue/; 1verificador-vue/index.html:11; 1verificador-vue/src/main.ts:20-23; 1verificador-vue/package.json:8; 1verificador-vue/vite.config.ts:4-7

**Observation:** Entry mounts Vue with Pinia/router; manifest defines `vite build`, base `/vue/`.

**Interpretation:** Vue application boundary with own build.

### 15. 1verificador-vue/verificador/; 1verificador-vue/verificador/index.html:62; 1verificador-vue/verificador/src/main.ts:5; 1verificador-vue/verificador/package.json:8; 1verificador-vue/verificador/vite.config.ts:5-7

**Observation:** Nested scaffold mounts Vue and defines `vue-tsc -b && vite build`; absent from workspace/integrated build.

**Interpretation:** Observable frontend unit, although isolated from integrated composition.

### 16. 2postulacion-react/; 2postulacion-react/index.html:1; 2postulacion-react/src/main.tsx:9-17; 2postulacion-react/package.json:8; 2postulacion-react/vite.config.ts:4-7

**Observation:** Entry mounts React with `HashRouter`; build executes TypeScript/Vite with base `/react/`.

**Interpretation:** React application boundary with own build.

### 17. 3seguimiento-angular/; 3seguimiento-angular/angular.json:13-18; 3seguimiento-angular/src/main.ts:14-15; 3seguimiento-angular/package.json:7

**Observation:** Angular target declares HTML entry and `src/main.ts`, executing `bootstrapApplication`; build `ng build --base-href /angular/`.

**Interpretation:** Angular application boundary with own entry/build.

### 18. index.html:24; index.html:61; src/main.ts:87-97; 1verificador-vue/vite.config.ts:5; scripts/build-integrado.mjs:14

**Observation:** Button points to `/vue/`, loaded in iframe; build base and copy to integrated `dist` resolve target `1verificador-vue`.

**Interpretation:** Active relationship links container to `1verificador-vue` through iframe.

### 19. index.html:25; index.html:61; src/main.ts:87-97; 2postulacion-react/vite.config.ts:5; scripts/build-integrado.mjs:15

**Observation:** Button points to `/react/`, loaded in iframe; build base and copy to integrated `dist` resolve target `2postulacion-react`.

**Interpretation:** Active relationship links container to `2postulacion-react` through iframe.

### 20. index.html:26; index.html:61; src/main.ts:87-97; 3seguimiento-angular/package.json:7; scripts/build-integrado.mjs:16-19

**Observation:** Button points to `/angular/#/seguimiento`, loaded in iframe; build base and copy to integrated `dist` resolve target `3seguimiento-angular`.

**Interpretation:** Active relationship links container to `3seguimiento-angular` through iframe.

### 21. 1verificador-vue/src/views/HomeView.vue:21; 1verificador-vue/src/views/HomeView.vue:92-104; src/main.ts:136-138; src/main.ts:192-199

**Observation:** Vue sends data/application request to container; reverse direction reads `usuario` written by container in `localStorage`.

**Interpretation:** Bidirectional relationship combines messages/same-origin storage, mechanism events per final review.

### 22. 2postulacion-react/src/context/PostulacionContext.tsx:53-70; 2postulacion-react/src/pages/VistaPrevia.tsx:99; src/main.ts:75-85; src/main.ts:189-209

**Observation:** React sends READY, update and tracking request; container responds to READY with state. React handles state type, but container does not handle update.

**Interpretation:** Active bidirectional relationship counted through existing sends; does not imply consumer for every message type.

### 23. 3seguimiento-angular/src/app/app.component.ts:17-27; src/main.ts:75-85; src/main.ts:136-141; src/main.ts:204-207; 3seguimiento-angular/src/app/services/auth.service.ts:13-15; 3seguimiento-angular/src/app/services/seguimiento-store.service.ts:111

**Observation:** Angular sends READY, receives container state and reads session/user written by container.

**Interpretation:** Active bidirectional relationship combines postMessage/same-origin storage, mechanism events in final review.

### 24. 1verificador-vue/src/views/HomeView.vue:88-90; 2postulacion-react/src/context/PostulacionContext.tsx:4-6; 2postulacion-react/src/context/PostulacionContext.tsx:45-52; 2postulacion-react/src/pages/VistaPrevia.tsx:37-39

**Observation:** Vue writes three student-data keys read by React on initialization/application submission.

**Interpretation:** Active Vue → React relationship through same-origin localStorage; no direct message between them.

### 25. package.json:17; scripts/build-integrado.mjs:14-19; vercel.json:3-5

**Observation:** Root build compiles container with Vite, triggers three module builds and copies results to Vercel-published dist.

**Interpretation:** Separate build confirms unit boundary; deployment joint, no independent versioning recorded.

### 26. 1verificador-vue/package.json:8; 1verificador-vue/vite.config.ts:4-7; scripts/build-integrado.mjs:14; vercel.json:3-5

**Observation:** `1verificador-vue` has own build command; result copied to integrated dist/published in joint Vercel deployment.

**Interpretation:** Separate build confirms unit boundary; deployment joint, no independent versioning recorded.

### 27. 1verificador-vue/verificador/package.json:8; 1verificador-vue/verificador/vite.config.ts:5-7; pnpm-workspace.yaml:1-4; package.json:17; scripts/build-integrado.mjs:14-19

**Observation:** Scaffold has own build but excluded from workspace, integrated command and published copies; deployment unobserved.

**Interpretation:** Separate build confirms unit boundary; no observed scaffold publication.

### 28. 2postulacion-react/package.json:8; 2postulacion-react/vite.config.ts:4-7; scripts/build-integrado.mjs:15; vercel.json:3-5

**Observation:** `2postulacion-react` has own build command; result copied to integrated dist/published in joint Vercel deployment.

**Interpretation:** Separate build confirms unit boundary; deployment joint, no independent versioning recorded.

### 29. 3seguimiento-angular/package.json:7; 3seguimiento-angular/angular.json:13-18; scripts/generar-angular-env.mjs:63-86; scripts/build-integrado.mjs:16-19; vercel.json:3-5

**Observation:** `3seguimiento-angular` has own build command; result copied to integrated dist/published in joint Vercel deployment. Angular build depends on environment generated by root prebuild.

**Interpretation:** Separate build confirms unit boundary; deployment joint, no independent versioning recorded.

### 30. 3seguimiento-angular/README.md:3

**Observation:** Angular README describes prototype with simulated in-memory data and no database.

**Interpretation:** Persistence context contradicted by Supabase usage; does not demonstrate frontend composition.

### 31. README.md:7

**Observation:** README assigns single login, menu and iframe integration to vanilla-ts container.

**Interpretation:** Situates container role, corroborated by entry/embedding relationships.

### 32. README.md:8-10

**Observation:** README lists Vue at /vue/, React at /react/, Angular at /angular/.

**Interpretation:** Describes three integrated modules, excluding isolated scaffold.

### 33. README.md:19-24

**Observation:** README says modules start separately in development and lists four ports.

**Interpretation:** Server separation corroborated by scripts/development URLs; does not equal independent deployment.

### 34. README.md:32-40

**Observation:** README presents one dist folder with index.html and vue, react, angular subfolders.

**Interpretation:** Tree documents separate builds aggregated into jointly published artifact.

### 35. README.md:42

**Observation:** README describes one public URL, modules in subfolders and hash-routing navigation.

**Interpretation:** Corroborated by integrated deployment/module routers; provides no published address.

### 36. README.md:46; README.md:59

**Observation:** README requests single Supabase project, describing it as team-shared.

**Interpretation:** Shared-backend context corroborated by common clients/variables, without demonstrating frontend composition.

### 37. README.md:70-78

**Observation:** README instructs Vercel deployment with dist output.

**Interpretation:** Described deployment is sole recorded joint deployment; npm/pnpm difference does not change invoked build script.

### 38. README.md:80

**Observation:** README claims vercel.json already contains rewrites for /vue/, /react/, /angular/.

**Interpretation:** Contradicted by file containing only installation, build and output directory.

### 39. README.md:86-88

**Observation:** README assigns Vue, React, Angular modules to three still-unnamed members.

**Interpretation:** Declared module responsibility division remains uncorroborated in documentation review.

### 40. README.md:92

**Observation:** README says login kept in container for single session shared through localStorage.

**Interpretation:** Corroborated by session writing and Vue/Angular reading; does not require all modules to read same keys.

### 41. README.md:94

**Observation:** README claims integration of different-framework applications without module federation.

**Interpretation:** Denial corroborated by no integration dependencies in 3.4.2 and iframe integration; textual mention does not prove Module Federation usage.

### 42. README.md:94

**Observation:** README says each module loaded in iframe under same domain.

**Interpretation:** Corroborated by relative paths/joint deployment; development ports distinct.

### 43. index.html:46

**Observation:** Login note says session shared with all three modules through localStorage.

**Interpretation:** Extension to all three contradicted: Vue/Angular read session keys; React reads student data/receives portal messages without reading those keys.

### 44. 2f53246 2026-07-08 (2postulacion-react/src/context/PostulacionContext.tsx; src/main.ts; 3seguimiento-angular/src/app/app.component.ts); acb73a0 2026-07-09 (src/main.ts; 3seguimiento-angular/src/app/app.component.ts)

**Observation:** React provider already sends BECAS_POSTULACION_UPDATE in first commit, unchanged afterward. Initial container/Angular component contents absent.

**Interpretation:** Receiver/forwarding past remains inconclusive; snapshot clearly lacks container consumer/forwarding to Angular.

### 45. 2f53246 2026-07-08 (src/main.ts; 1verificador-vue/src/views/HomeView.vue); acb73a0 2026-07-09 (src/main.ts; 1verificador-vue/src/views/HomeView.vue)

**Observation:** Container and HomeView appear in first commit and change in acb73a0; initial contents unavailable.

**Interpretation:** Cannot determine whether Vue READY contract removed or never connected. Historical uncertainty: snapshot records Vue neither sends READY nor listens for state.

### 46. 997197b 2026-07-09 (README.md); c1a2ab3 2026-07-10 (vercel.json)

**Observation:** README stops changing before commit altering only vercel.json and announcing removal of rewrites blocking modules; old rule contents unread.

**Interpretation:** Sequence clarifies outdated documentary promise without demonstrating blockage alleged by commit message.

### 47. 2f53246 2026-07-08 (3seguimiento-angular/README.md); acb73a0 2026-07-09 (3seguimiento-angular/src/app/services/supabase.service.ts; 3seguimiento-angular/src/app/services/seguimiento-store.service.ts)

**Observation:** Angular README added in first commit and unchanged; acb73a0 creates Supabase service/changes store. Old store contents absent.

**Interpretation:** History clarifies description retained from before service creation without proving earlier implementation exclusively in memory.

### 48. 2f53246 2026-07-08 (2postulacion-react/src/context/PostulacionContext.tsx; index.html; src/main.ts); acb73a0 2026-07-09 (index.html; src/main.ts)

**Observation:** Initial React provider already reads only data/documents from localStorage and unchanged; index.html and src/main.ts later change, but earlier contents absent.

**Interpretation:** Broad note origin remains inconclusive. Historical uncertainty; snapshot contradiction between note/React reads delimited.

## Classification

| # | Origin | Dimension | Type | Approach | Evidence | Strength | Relationships |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.4 (src/main.ts:9) | 3 code | source code | — | context | weak | — |
| 2 | 3.4.4 (index.html:61) | 3 code | source code | iframe | architectural | strong | implements #18; implements #19; implements #20 |
| 3 | 3.4.4 (1verificador-vue/src/views/HomeView.vue:92) | 3 code | source code | events | architectural | moderate | implements #21 |
| 4 | 3.4.4 (1verificador-vue/src/views/HomeView.vue:103) | 3 code | source code | events | architectural | strong | implements #21 |
| 5 | 3.4.4 (2postulacion-react/src/context/PostulacionContext.tsx:60) | 3 code | source code | events | architectural | moderate | implements #22 |
| 6 | 3.4.4 (2postulacion-react/src/context/PostulacionContext.tsx:69) | 3 code | source code | events | architectural | moderate | implements #22 |
| 7 | 3.4.4 (2postulacion-react/src/pages/VistaPrevia.tsx:99) | 3 code | source code | events | architectural | strong | implements #22 |
| 8 | 3.4.4 (3seguimiento-angular/src/app/app.component.ts:18) | 3 code | source code | events | architectural | moderate | implements #23 |
| 9 | 3.4.4 (src/main.ts:84) | 3 code | source code | events | architectural | moderate | implements #22; implements #23 |
| 10 | 3.4.4 (index.html:24) | 3 code | source code | iframe | architectural | strong | implements #18; implements #19; implements #20 |
| 11 | 3.4.4 (src/main.ts:138) | 3 code | source code | events | architectural | moderate | implements #21; implements #23 |
| 12 | 3.4.4 (1verificador-vue/src/views/HomeView.vue:88) | 3 code | source code | other | architectural | moderate | implements #24 |
| 13 | 3.4.3 (.) | 4 structure | directory | — | architectural | moderate | — |
| 14 | 3.4.3 (1verificador-vue) | 4 structure | directory | — | architectural | moderate | — |
| 15 | 3.4.3 (1verificador-vue/verificador) | 4 structure | directory | — | architectural | moderate | — |
| 16 | 3.4.3 (2postulacion-react) | 4 structure | directory | — | architectural | moderate | — |
| 17 | 3.4.3 (3seguimiento-angular) | 4 structure | directory | — | architectural | moderate | — |
| 18 | 3.4.5 #1 | 5 composition | source code | iframe | architectural | strong | links #13; links #14 |
| 19 | 3.4.5 #2 | 5 composition | source code | iframe | architectural | strong | links #13; links #16 |
| 20 | 3.4.5 #3 | 5 composition | source code | iframe | architectural | strong | links #13; links #17 |
| 21 | 3.4.5 #4 | 5 composition | source code | events | architectural | strong | links #13; links #14 |
| 22 | 3.4.5 #5 | 5 composition | source code | events | architectural | strong | links #13; links #16 |
| 23 | 3.4.5 #6 | 5 composition | source code | events | architectural | strong | links #13; links #17 |
| 24 | 3.4.5 #7 | 5 composition | source code | other | architectural | strong | links #14; links #16 |
| 25 | 3.4.6 #1 | 6 build-deploy | manifest | — | architectural | moderate | publishes #13 |
| 26 | 3.4.6 #2 | 6 build-deploy | manifest | — | architectural | moderate | publishes #14 |
| 27 | 3.4.6 #3 | 6 build-deploy | manifest | — | architectural | moderate | publishes #15 |
| 28 | 3.4.6 #4 | 6 build-deploy | manifest | — | architectural | moderate | publishes #16 |
| 29 | 3.4.6 #5 | 6 build-deploy | manifest | — | architectural | moderate | publishes #17 |
| 30 | 3.4.7 #1 | 7 documentation | documentation | — | context | weak | contradicts 3seguimiento-angular/src/app/services/seguimiento-store.service.ts:42-44; contradicts 3seguimiento-angular/src/app/services/supabase.service.ts:11-27 |
| 31 | 3.4.7 #2 | 7 documentation | documentation | iframe | architectural | weak | corroborates #13; corroborates #18; corroborates #19; corroborates #20 |
| 32 | 3.4.7 #3 | 7 documentation | documentation | — | architectural | weak | corroborates #14; corroborates #16; corroborates #17; corroborates #26; corroborates #28; corroborates #29 |
| 33 | 3.4.7 #4 | 7 documentation | documentation | — | architectural | weak | corroborates package.json:14-15; corroborates src/main.ts:24-34 |
| 34 | 3.4.7 #5 | 7 documentation | documentation | — | architectural | weak | corroborates #25; corroborates #26; corroborates #28; corroborates #29 |
| 35 | 3.4.7 #6 | 7 documentation | documentation | — | architectural | weak | corroborates #25; corroborates 1verificador-vue/src/main.ts:16; corroborates 2postulacion-react/src/main.tsx:11; corroborates 3seguimiento-angular/src/main.ts:15 |
| 36 | 3.4.7 #7 | 7 documentation | documentation | — | context | weak | corroborates src/services/supabase.ts:3-10; corroborates 1verificador-vue/src/services/supabase.ts:3-6; corroborates 2postulacion-react/src/services/supabase.ts:4-11; corroborates scripts/generar-angular-env.mjs:48-49; corroborates 3seguimiento-angular/src/app/services/supabase.service.ts:24-27 |
| 37 | 3.4.7 #8 | 7 documentation | documentation | — | architectural | weak | corroborates #25 |
| 38 | 3.4.7 #9 | 7 documentation | documentation | — | architectural | weak | contradicts vercel.json:1-6 |
| 39 | 3.4.7 #10 | 7 documentation | documentation | — | architectural | weak | — |
| 40 | 3.4.7 #11 | 7 documentation | documentation | other | architectural | weak | corroborates #11; corroborates #21; corroborates #23 |
| 41 | 3.4.7 #12 | 7 documentation | documentation | module-federation | technological | weak | corroborates #18; corroborates #19; corroborates #20 |
| 42 | 3.4.7 #13 | 7 documentation | documentation | iframe | architectural | weak | corroborates #18; corroborates #19; corroborates #20; corroborates #25; corroborates #26; corroborates #28; corroborates #29 |
| 43 | 3.4.7 #14 | 7 documentation | comment | other | architectural | weak | contradicts #22; contradicts 2postulacion-react/src/context/PostulacionContext.tsx:4-6; contradicts 2postulacion-react/src/context/PostulacionContext.tsx:45-52 |
| 44 | 3.4.8 #1 | 8 history | history | — | architectural | weak | explains #6; explains #22 |
| 45 | 3.4.8 #2 | 8 history | history | — | architectural | weak | explains #21 |
| 46 | 3.4.8 #3 | 8 history | history | — | architectural | weak | explains #38; explains #25 |
| 47 | 3.4.8 #4 | 8 history | history | — | architectural | weak | explains #30 |
| 48 | 3.4.8 #5 | 8 history | history | — | architectural | weak | explains #43; explains #22 |

## Summary

Observations: 48. Dimensions (technology: 0, configuration: 0, code: 12, structure: 5, composition: 7, build-deploy: 5, documentation: 14, history: 5). Strength (strong: 11, moderate: 17, weak: 20, ambiguous: 0). Evidence (technological: 1, architectural: 44, context: 3).
