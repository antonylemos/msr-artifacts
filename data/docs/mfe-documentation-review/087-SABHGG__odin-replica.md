---
schema: 1
id: 1183434052
full_name: SABHGG/odin-replica
commit: 06ce2bd578663f88243854f6eef292686660dfce
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

# 087 — SABHGG/odin-replica

## Repository overview

The only `.md` is `README.md`, the standard Create React App text, in English (README.md:1-3). It only describes scripts `start`, `test`, `build` and `eject` and refers to CRA documentation (README.md:5-70). Sentences such as "Your app is ready to be deployed!" (README.md:28) come from the template and do not describe this project, so none became a row. `package.json` has no `description` (package.json:1-45). Comments in `public/index.html` (public/index.html:13-16, 18-26, 32-41), its `description` "Web site created using create-react-app" (public/index.html:9-10), `public/manifest.json` (public/manifest.json:2-3) and `src/setupTests.js:1-4` are also template text.

Project documentation is entirely in Spanish comments and console messages in `src/index.js`. They describe a single-spa root registering a local React application, "Odin", and a remote Angular application, "Leadocs", loaded through a script and activated by an event. This matches previous reviews: a single CRA project in the snapshot (3.4.3), registering the local unit and external remote `leadocs-angular` (3.4.4 src/index.js:56 and src/index.js:63; 3.4.5 #1). Differences concern details. The library name suggested in a console message is not the global expected by code (row 8). A comment in `src/root.app.js` mentions dynamic import, but import is static (row 9). Nothing in the snapshot shows the remote is Angular (row 5).

Comments read without architectural claims: "Asegúrate que src/root.app.js exista y exporte 'reactLifecycles'" (English translation: "Make sure the file exists and exports the named lifecycle object") (src/index.js:4) is a reminder about the unit's own file, which exports object `reactLifecycles` as `default` (src/root.app.js:6, 21). "--- 1. Configuración ---" (English translation: "Configuration") (src/index.js:6) and "--- 5. Iniciar ---" (English translation: "Start") (src/index.js:102) are section headings. "Si ya está cargado, lo devolvemos" (English translation: "If already loaded, return it") (src/index.js:68) is an internal loader step (src/index.js:69). Comments and messages repeating a table row appear in its paragraph. Menu label "Leapdocs (Microfrontend)" (src/App.js:11) is interface text rather than a comment and did not become a row. `src/App.js` and `src/root.app.js` only have the comment in row 9 (src/root.app.js:20).

No `doc-*` mining occurrences.

## Claims

| # | Document | Claim | Theme | Corroboration | Evidence |
|---|---|---|---|---|---|
| 1 | src/index.js:7 | "Puerto donde corre tu 'ng serve'" (English translation: Port where your `ng serve` runs: the remote is served by Angular development server) | build-deploy | uncorroborated | — |
| 2 | src/index.js:44 | "Activación por evento (sin rutas)" (English translation: Event activation, without routes) | composition | corroborated | 3.4.4 (src/index.js:47); 3.4.5 #1; src/index.js:47-51, 59, 96; src/App.js:16-23 |
| 3 | src/index.js:55 | "Registrar Odin (React Local)" (English translation: Register Odin, local React) | structure | corroborated | 3.4.3 (`.` Yes); 3.4.4 (src/index.js:56); src/index.js:56-60; src/root.app.js:3-14 |
| 4 | src/index.js:58 | "Carga directa del componente exportado" (English translation: Direct loading of exported component) | composition | corroborated | 3.4.4 (src/index.js:56); src/index.js:4, 58 |
| 5 | src/index.js:62 | "Registrar Leadocs (Angular Remoto)" (English translation: Register Leadocs, remote Angular) | structure | partial | 3.4.4 (src/index.js:63); 3.4.5 #1; src/index.js:7-9, 63-64 |
| 6 | src/index.js:66 | "Promesa que carga el script y devuelve el módulo" (English translation: Promise loading the script and returning the module) | composition | corroborated | 3.4.4 (src/index.js:72); 3.4.5 #1; src/index.js:67-94 |
| 7 | src/index.js:77 | "Al terminar de cargar, Angular debe haber expuesto 'window.leapdocs'" (English translation: After loading, Angular must have exposed `window.leapdocs`) | composition | partial | 3.4.4 (src/index.js:72); src/index.js:69, 78-84 |
| 8 | src/index.js:83 | "Asegúrate de que en el 'angular.json' de Leadocs, la propiedad 'libraryName' sea 'leadocs'" (English translation: Make sure Leadocs `angular.json` sets property `libraryName` to `leadocs`) | build-deploy | contradicted | src/index.js:69, 78, 82 |
| 9 | src/root.app.js:20 | "Exportamos todo el objeto para el import dinámico" (English translation: Export the entire object for dynamic import) | composition | contradicted | 3.4.4 (src/index.js:56); src/index.js:4, 58 |

## Observations

**1. src/index.js:7.** The comment places the remote in a separate Angular application served through `ng serve`. Adjacent configuration only supplies default origin `http://localhost:4200`, replaceable through `REACT_APP_LEAPDOCS_ORIGIN` and `REACT_APP_LEAPDOCS_BUNDLE_URL` (src/index.js:8-9). The remote is absent from the snapshot, and nothing runs `ng serve` or another Angular server (3.4.6, Repository overview). Loader error message says the same with another command, "¿Está corriendo 'npm start' en el puerto 4200?" (English translation: "Is `npm start` running on port 4200?") (src/index.js:89). It appears here because only the command changes, not the claim: the remote runs on its own server, on port 4200.

**2. src/index.js:44.** The comment says an event activates the remote, rather than a route. Code confirms this. The local unit publishes `toggle-leapdocs` when section changes (src/App.js:16-23). Root listens, stores `isLeadocsActive` and calls `triggerAppChange()` (src/index.js:47-51). Remote activity function is `() => isLeadocsActive` (src/index.js:96), and local unit's is `() => true` (src/index.js:59). Neither reads the URL. The patch of `history.pushState`/`replaceState` removing prefix `/leapdocs` (src/index.js:10-42) changes the URL, not activation. Source-code review records the event as internal to the unit (3.4.4 src/index.js:47), and composition review describes it as activation trigger (3.4.5 #1).

**3. src/index.js:55.** "Odin" is the snapshot's own React application: `registerApplication('odin-react', ...)` (src/index.js:56-60) receives lifecycles created by `singleSpaReact` for `App` (src/root.app.js:3-14). Structural review has a single unit, `.` (3.4.3), and source-code review records this registration as internal to it (3.4.4 src/index.js:56). "Local" holds: Odin is in the same bundle as root.

**4. src/index.js:58.** "Carga direta" (English translation: "Direct loading") holds. Loader function returns object `RootApp` (src/index.js:58), statically imported at entry top (src/index.js:4). There is no network fetch or separate chunk. Source-code review records the same (3.4.4 src/index.js:56).

**5. src/index.js:62.** The "remoto" part (English translation: "remote") holds. Registration `leadocs-angular` (src/index.js:63-64) loads a bundle through a URL outside the snapshot (src/index.js:7-9), and composition review records the relationship with a target outside the snapshot (3.4.5 #1). The "Angular" part has no artifact. There is no code, `angular.json` or Angular dependency in the snapshot. Only registration name, comments and messages, and `import 'zone.js'` (src/index.js:2) indicate it; classification treats this as host preparation, with no Angular implementation observed. Hence `partial`. "Angular" repeats in comment "Creamos el script apuntando al main.js de Angular" (English translation: "Create the script pointing to Angular's main bundle") (src/index.js:71) and messages at src/index.js:79, 84, 89-90.

**6. src/index.js:66.** Loader is indeed a `Promise` (src/index.js:67). It creates a `<script>` with `src = LEAPDOCS_BUNDLE_URL` (src/index.js:72-73), injects it into `document.head` (src/index.js:93) and resolves with `globalThis.leapdocs` (src/index.js:76-80). Source-code review lists this line as `script-loading` (3.4.4 src/index.js:72). Returned "módulo" (English translation: "module") is the global object, rather than an ES module. Comment at src/index.js:71 repeats the mechanism, "Creamos el script apuntando al main.js de Angular" (English translation: "Create the script pointing to Angular's `main.js`"). `main.js` is the URL default (src/index.js:9).

**7. src/index.js:77.** This is the host–remote contract: bundle must publish global `leapdocs`. Host side holds. Loader reuses `globalThis.leapdocs` (src/index.js:69), resolves with it after `onload` and rejects when absent (src/index.js:78-84). Remote side, which would publish the global, has no artifact, hence `partial`. Message "El script cargó, pero 'window.leapdocs' no existe." (English translation: "Script loaded, but the expected global does not exist") (src/index.js:82) repeats the contract.

**8. src/index.js:83.** This is a console message rather than a comment. It says remote must be built with `libraryName` `leadocs` in `angular.json`. Code expects `leapdocs` (src/index.js:69, 78), and preceding message also names `window.leapdocs` (src/index.js:82). A bundle published as `leadocs`, as requested, would not be found by loader, which would reject loading (src/index.js:84). Registration name `leadocs-angular` (src/index.js:64) follows message spelling, but is only the single-spa name. `angular.json` is absent from snapshot. The contradiction is between message and global read by code.

**9. src/root.app.js:20.** The comment says lifecycle object is exported "para o import dinâmico" (English translation: "for dynamic import"). Its only consumer imports it statically (`import RootApp from './root.app'`, src/index.js:4) and returns it directly in loader function (src/index.js:58). There is no `import()` of this file in snapshot. Source-code review records static import and local unit in same bundle (3.4.4, Notes). `default` export exists (src/root.app.js:21) and is used, but not as comment describes, hence `contradicted`.

## Summary

Claims: 9 (corroborated: 4, partial: 2, contradicted: 2, uncorroborated: 1). Themes: (structure: 2, composition: 5, build-deploy: 2).
