---
schema: 1
id: 1101991974
full_name: Marcel-b-velop/vue-mf
commit: ed270d34b0542cb1a0ce26aafc2aeba4bca994e1
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

# 185 — Marcel-b-velop/vue-mf

## Repository overview

Experiment with four Vue 3 + Vite applications in pnpm workspace: `host` (shell), `app-1`, `app-2` and `lib`, all frontend units with own `index.html`, entry and build (#45 through #48). Workspace root only delegates build, not a unit (#44). API and .NET IdentityServer in `Api/` are not frontend units.

Module Federation chain complete in four active relationships:
- **Dependency:** `@originjs/vite-plugin-federation` `^1.4.1`, declared in four units (#1 through #4).
- **Configuration:** app-1, app-2 and lib name themselves (`remote-app1`, `remote-app2`, `remote-lib`), generate `remoteEntry.js` and expose modules; host declares three remotes through `localhost` URLs (#7); app-1 and app-2 also declare `remote-lib` (#5, #6); lib only exposes (#8). All share `vue`, `pinia`, `primevue` and `axios`.
- **Code:** host loads `App1` from app-1 and `Confirm` from lib through `defineAsyncComponent` (#10, #12), renders `App1` at route `/` (#40, #41) and imports `LoginForm` and `RegisterForm` from app-2 at routes `/login` and `/register` (#13, #14, #40); app-1 loads `Confirm` from lib (#9), using it without local import (#42).
- **Relationship:** host → app-1, host → lib, host → app-2 and app-1 → lib (#49 through #52). App-1 `<Confirm>` resolved through global registration of mounting app, included in both app-1 → lib and host → lib (#42).

Beyond federation, app-2 and lib exchange session through key `accessToken` of `localStorage`: app-2 writes token, lib `apiClient` reads and deletes it on 401 (#43, #53). Not a declared MFE mechanism; works only because both units run on same origin inside host.

Misleading signals: host registers `App2` as `AppTwo` without using it (#11), and app-2 declares `remote-lib` without importing it (#54); both remain in configuration or code without effective composition. Event `auth:logout` only circulates within app-2 (#22 through #24). Of 31 mined constructs, 20 are in generated Playwright HTML report (`lib/playwright-report/`) and two are testing-library `mount`; all false positives (#15 through #21, #25 through #39).

Four builds separate without observed deployment: CI only builds workspace, remotes served by `vite preview` on fixed `localhost` ports embedded by host (#55 through #58).

Documentation (German README) confirms host/remote organization, shared library, `shared` and `preview` arrangement (#61 through #63, #65 through #68, #70, #72, #73, #75). Outdated relative to snapshot: describes three parts without app-2 (#64), attributes remote origin to every page but `/about` is local (#59), promises header and footer absent from host (#60), and describes `build` block unlike current configurations (#69). History shows README predates app-2 and last configuration changes (#81, #82), leaving only past questions open (#78 through #80). Nothing remains ambiguous in snapshot.

## Observations

### 1. app-1/package.json:14

**Observation:** `@originjs/vite-plugin-federation` (`^1.4.1`) is declared in `dependencies`.

**Interpretation:** Federation technology present in app-1 build.

### 2. app-2/package.json:14

**Observation:** `@originjs/vite-plugin-federation` (`^1.4.1`) is declared in `dependencies`.

**Interpretation:** Federation technology present in app-2 build.

### 3. host/package.json:24

**Observation:** `@originjs/vite-plugin-federation` (`^1.4.1`) is declared in `devDependencies`.

**Interpretation:** Federation technology present in host build.

### 4. lib/package.json:20

**Observation:** `@originjs/vite-plugin-federation` (`^1.4.1`) is declared in `dependencies`.

**Interpretation:** Federation technology present in lib build.

### 5. app-1/vite.config.ts:2, 11-27

**Observation:** `vite.config.ts` imports `federation`, invoking in `plugins` with `name: "remote-app1"`, `filename: "remoteEntry.js"`, `exposes: { "./App1": "./src/App.vue" }`, `remotes: { "remote-lib": "http://localhost:5177/assets/remoteEntry.js" }` and `shared` with `vue`, `pinia`, `primevue` and `axios`, all `generate: false, import: false`.

**Interpretation:** App-1 is both remote, with own name and `App1` exposed to host, and host of lib, declared by name and local address. Shared libraries come from loader's copy.

### 6. app-2/vite.config.ts:2, 11-30

**Observation:** `vite.config.ts` imports `federation`, invoking in `plugins` with `name: "remote-app2"`, `filename: "remoteEntry.js"`, `exposes` with `./App2` (`./src/App.vue`, comment "Für standalone-Modus"; English translation: "For standalone mode"), `./Home`, `./LoginForm` and `./RegisterForm`, `remotes: { "remote-lib": "http://localhost:5177/assets/remoteEntry.js" }` and `shared` with `vue`, `pinia` and `primevue` as `generate: false, import: false` and `axios` as `generate: true, import: true`.

**Interpretation:** App-2 is remote with own name and four exposed modules, declaring lib as remote. No app-2 code imports `remote-lib` (#54).

**Note:** `server.port: 5175` (line 40) is development port, marked as corroboration by composition review, excluded.

### 7. host/vite.config.ts:2, 11-26

**Observation:** `vite.config.ts` imports `federation`, invoking in `plugins` with `name: "host-app"`, `filename: "remoteEntry.js"`, comment "Modules to expose" without `exposes`, `remotes` with `remote-app1` (`http://localhost:5174/assets/remoteEntry.js`), `remote-app2` (`:5175`) and `remote-lib` (`:5177`), and `shared` with `vue`, `pinia`, `primevue` (`requiredVersion` and `version` `^4.1.1`) and `axios`, all with `modulePreload: true`.

**Interpretation:** Host configuration declares other three units as remotes with self-declared names (#5, #6, #8) and local addresses, supplying shared libraries.

### 8. lib/vite.config.ts:2, 17-32

**Observation:** `vite.config.ts` imports `federation`, invoking in `plugins` with `name: "remote-lib"`, `filename: "remoteEntry.js"`, `exposes` with `./Confirm`, `./apiClient` and `./types`, and `shared` with `vue`, `pinia`, `primevue` and `axios` as `generate: false, import: false`. No `remotes` declared.

**Interpretation:** Lib configured as Module Federation remote with own name and three exposed modules (component, service and types), naming no other unit.

### 9. app-1/src/main.ts:11

**Observation:** `const confirmD = defineAsyncComponent(() => import("remote-lib/Confirm"));`, registered as global component `Confirm` on line 16.

**Interpretation:** App-1 loads `./Confirm` from remote `remote-lib` by name at runtime.

### 10. host/src/main.ts:12

**Observation:** `const remoteApp1 = defineAsyncComponent(() => import("remote-app1/App1"));`, registered as `AppOne` on line 19.

**Interpretation:** Host loads `./App1` from remote `remote-app1` by name at runtime.

### 11. host/src/main.ts:13

**Observation:** `const remoteApp2 = defineAsyncComponent(() => import("remote-app2/App2"));`, registered as `AppTwo` on line 20. No host template or rendered remote component template uses `<AppTwo>`.

**Interpretation:** Loading mechanism for app-2 `App2` prepared but never triggered; no composition through this row.

### 12. host/src/main.ts:14

**Observation:** `const confirmD = defineAsyncComponent(() => import("remote-lib/Confirm"));`, registered as global component `Confirm` on line 21. No host template uses `<Confirm>`; app-1 `App1` rendered in host uses it without local import (app-1/src/App.vue:33).

**Interpretation:** Host loads `./Confirm` from remote `remote-lib` by name, offering it to mounted remote components.

### 13. host/src/router/index.ts:7

**Observation:** `{ path: '/login', component: () => import('remote-app2/LoginForm') }`, in `routes` table passed to router in host/src/main.ts:23-28.

**Interpretation:** Host route `/login` loads `./LoginForm` from remote `remote-app2`.

### 14. host/src/router/index.ts:8

**Observation:** `{ path: '/register', component: () => import('remote-app2/RegisterForm') }`, in same `routes` table.

**Interpretation:** Host route `/register` loads `./RegisterForm` from remote `remote-app2`.

### 15. lib/src/App.test.ts:2

**Observation:** `import { mount } from "@vue/test-utils"`, in Vitest test file.

**Interpretation:** Testing-library `mount`, unrelated to composition. Search false positive.

### 16. lib/src/components/Confirm.test.ts:2

**Observation:** `import { mount } from "@vue/test-utils"`, in Vitest test file.

**Interpretation:** Testing-library `mount`, unrelated to composition. Search false positive.

### 17. lib/playwright-report/trace/assets/defaultSettingsView-BEpdCv1S.js:115

**Observation:** Custom element occurrence in minified code in Playwright-generated HTML report (output of `reporter: 'html'` in lib/playwright.config.ts:9).

**Interpretation:** Third-party test-report code used by no entry or build. Search false positive.

### 18. lib/playwright-report/trace/sw.bundle.js:1

**Observation:** Custom element occurrence in minified code in Playwright-generated HTML report.

**Interpretation:** Third-party test-report code used by no entry or build. Search false positive.

### 19. lib/playwright-report/index.html:58

**Observation:** Dynamic script occurrence in minified code in Playwright-generated HTML report.

**Interpretation:** Third-party test-report code used by no entry or build. Search false positive.

### 20. lib/playwright-report/trace/assets/defaultSettingsView-BEpdCv1S.js:50

**Observation:** Dynamic script occurrence in minified code in Playwright-generated HTML report.

**Interpretation:** Third-party test-report code used by no entry or build. Search false positive.

### 21. lib/playwright-report/trace/snapshot.html:5

**Observation:** Iframe occurrence in Playwright-generated HTML report.

**Interpretation:** Third-party test-report code used by no entry or build. Search false positive.

### 22. app-2/src/App.vue:24

**Observation:** `window.addEventListener("auth:logout", …)`, calling `authStore.logout()` and redirecting to `/login`. Event only dispatched in app-2/src/services/authService.ts:57 and :99, and `App2` registering listener is not rendered in host.

**Interpretation:** Event communication internal to app-2, involving no other unit.

### 23. app-2/src/services/authService.ts:57

**Observation:** `window.dispatchEvent(new CustomEvent("auth:logout"))` in 401-response interceptor; sole listener is app-2/src/App.vue:24.

**Interpretation:** Event communication internal to app-2.

### 24. app-2/src/services/authService.ts:99

**Observation:** `window.dispatchEvent(new CustomEvent("auth:logout"))` in `logout()`; sole listener is app-2/src/App.vue:24.

**Interpretation:** Event communication internal to app-2.

### 25. lib/playwright-report/index.html:18

**Observation:** Cross-window or event communication occurrence in minified code in Playwright-generated HTML report.

**Interpretation:** Third-party test-report code used by no entry or build. Search false positive.

### 26. lib/playwright-report/index.html:26

**Observation:** Cross-window or event communication occurrence in minified code in Playwright-generated HTML report.

**Interpretation:** Third-party test-report code used by no entry or build. Search false positive.

### 27. lib/playwright-report/index.html:34

**Observation:** Cross-window or event communication occurrence in minified code in Playwright-generated HTML report.

**Interpretation:** Third-party test-report code used by no entry or build. Search false positive.

### 28. lib/playwright-report/index.html:57

**Observation:** Cross-window or event communication occurrence in minified code in Playwright-generated HTML report.

**Interpretation:** Third-party test-report code used by no entry or build. Search false positive.

### 29. lib/playwright-report/index.html:58

**Observation:** Cross-window or event communication occurrence in minified code in Playwright-generated HTML report.

**Interpretation:** Third-party test-report code used by no entry or build. Search false positive.

### 30. lib/playwright-report/trace/assets/codeMirrorModule-Bucv2d7q.js:20

**Observation:** Cross-window or event communication occurrence in minified code in Playwright-generated HTML report.

**Interpretation:** Third-party test-report code used by no entry or build. Search false positive.

### 31. lib/playwright-report/trace/assets/defaultSettingsView-BEpdCv1S.js:18

**Observation:** Cross-window or event communication occurrence in minified code in Playwright-generated HTML report.

**Interpretation:** Third-party test-report code used by no entry or build. Search false positive.

### 32. lib/playwright-report/trace/assets/defaultSettingsView-BEpdCv1S.js:26

**Observation:** Cross-window or event communication occurrence in minified code in Playwright-generated HTML report.

**Interpretation:** Third-party test-report code used by no entry or build. Search false positive.

### 33. lib/playwright-report/trace/assets/defaultSettingsView-BEpdCv1S.js:49

**Observation:** Cross-window or event communication occurrence in minified code in Playwright-generated HTML report.

**Interpretation:** Third-party test-report code used by no entry or build. Search false positive.

### 34. lib/playwright-report/trace/assets/defaultSettingsView-BEpdCv1S.js:50

**Observation:** Cross-window or event communication occurrence in minified code in Playwright-generated HTML report.

**Interpretation:** Third-party test-report code used by no entry or build. Search false positive.

### 35. lib/playwright-report/trace/assets/defaultSettingsView-BEpdCv1S.js:59

**Observation:** Cross-window or event communication occurrence in minified code in Playwright-generated HTML report.

**Interpretation:** Third-party test-report code used by no entry or build. Search false positive.

### 36. lib/playwright-report/trace/assets/defaultSettingsView-BEpdCv1S.js:121

**Observation:** Cross-window or event communication occurrence in minified code in Playwright-generated HTML report.

**Interpretation:** Third-party test-report code used by no entry or build. Search false positive.

### 37. lib/playwright-report/trace/assets/defaultSettingsView-BEpdCv1S.js:124

**Observation:** Cross-window or event communication occurrence in minified code in Playwright-generated HTML report.

**Interpretation:** Third-party test-report code used by no entry or build. Search false positive.

### 38. lib/playwright-report/trace/assets/defaultSettingsView-BEpdCv1S.js:266

**Observation:** Cross-window or event communication occurrence in minified code in Playwright-generated HTML report.

**Interpretation:** Third-party test-report code used by no entry or build. Search false positive.

### 39. lib/playwright-report/trace/sw.bundle.js:3

**Observation:** Cross-window or event communication occurrence in minified code in Playwright-generated HTML report.

**Interpretation:** Third-party test-report code used by no entry or build. Search false positive.

### 40. host/src/router/index.ts:4; host/src/router/index.ts:5-8; host/src/main.ts:23-28

**Observation:** `export const routes = [` opens host route table: `/` → `Home` (local, rendering `<AppOne />`), `/about` → `About` (local), `/login` → `import('remote-app2/LoginForm')` and `/register` → `import('remote-app2/RegisterForm')`. Table passed to `createRouter`.

**Interpretation:** Host route table declares unit placement: app-1 at initial route through `Home`, app-2 at login and registration routes.

### 41. host/src/views/Home.vue:1

**Observation:** `<template><AppOne /></template>`. `AppOne` registered in host/src/main.ts:19 from `import("remote-app1/App1")`.

**Interpretation:** Host renders app-1 `App1` on `Home` page at route `/`.

### 42. app-1/src/App.vue:33

**Observation:** `<Confirm v-model:visible="vis" @saved="onSave" />`, without local import; tag resolved by global component `Confirm`, registered in app-1/src/main.ts:16 (standalone) or host/src/main.ts:21 (inside host).

**Interpretation:** App-1 renders dialog exposed by lib both standalone and mounted in host.

### 43. app-2/src/services/authService.ts:67

**Observation:** `localStorage.setItem("accessToken", response.data.token)` after registration (also after login, :76). Interceptor of lib `apiClient` reads same key (lib/src/services/apiClient.ts:15).

**Interpretation:** App-2 publishes session token in `localStorage` key consumed by lib, shared-state channel between both units.

### 44. .; package.json:8; pnpm-workspace.yaml:1-5

**Observation:** Root with `package.json` (`vue-mf-monorepo`, `private`) whose `build` is `pnpm -r run build`, and `pnpm-workspace.yaml` with `lib`, `app-1`, `app-2` and `host`. No own entry or build configuration.

**Interpretation:** Workspace coordination root without UI; not frontend unit.

### 45. app-1; app-1/package.json; app-1/index.html:11; app-1/src/main.ts:13-21; app-1/vite.config.ts:7-44; app-1/package.json:8; pnpm-workspace.yaml:3

**Observation:** Directory with own `package.json`, `index.html` loading `/src/main.ts`, entry creating and mounting Vue app, own `vite.config.ts` and `build` `vue-tsc -b && vite build`; workspace member.

**Interpretation:** Frontend unit with own boundary (remote `remote-app1`), also running standalone.

### 46. app-2; app-2/package.json; app-2/index.html:11; app-2/src/main.ts:33-37; app-2/vite.config.ts:7-48; app-2/package.json:8; pnpm-workspace.yaml:4

**Observation:** Directory with own `package.json`, `index.html` loading `/src/main.ts`, entry creating and mounting Vue app with own router in standalone mode, own `vite.config.ts` and `build` `vue-tsc -b && vite build`; workspace member.

**Interpretation:** Frontend unit with own boundary (remote `remote-app2`), also running standalone.

### 47. host; host/package.json; host/index.html:10; host/src/main.ts:17-40; host/vite.config.ts:7-50; host/package.json:8; pnpm-workspace.yaml:5

**Observation:** Directory with own `package.json`, `index.html` loading `/src/main.ts`, entry creating and mounting Vue app with router and remote components, own `vite.config.ts` and `build` `vue-tsc -b && vite build`; workspace member.

**Interpretation:** Frontend unit with own boundary, containing most federated imports (#10 through #14).

### 48. lib; lib/package.json; lib/index.html:11; lib/src/main.ts:10-14; lib/vite.config.ts:8-59; lib/package.json:11; pnpm-workspace.yaml:2

**Observation:** Directory with own `package.json`, `index.html` loading `/src/main.ts`, entry mounting demonstration `App.vue` opening `Confirm`, own `vite.config.ts` and `build` `vue-tsc -b && vite build`; workspace member.

**Interpretation:** Frontend unit with own boundary (remote `remote-lib`), mainly exposing shared components and services but having application entry.

### 49. app-1/src/main.ts:11; app-1/src/App.vue:33; app-1/vite.config.ts:18-20; lib/vite.config.ts:18-19, 22-23

**Observation:** App-1 specifier `remote-lib/Confirm` matches remote `remote-lib` (`http://localhost:5177/assets/remoteEntry.js`) in app-1 configuration and, in lib, `name: "remote-lib"` and key `./Confirm`. Component registered globally and used in `<Confirm>`. App-1 also imports `remote-lib/apiClient` statically (app-1/src/main.ts:8). Relationship has In snapshot `Yes` and Active `Yes`.

**Interpretation:** An active Module Federation host → remote relationship from app-1 to lib.

### 50. host/src/main.ts:12; host/src/router/index.ts:4; host/src/views/Home.vue:1; host/vite.config.ts:16; app-1/vite.config.ts:12-13, 16

**Observation:** Host specifier `remote-app1/App1` matches remote `remote-app1` (`http://localhost:5174/assets/remoteEntry.js`) in host configuration and, in app-1, `name: "remote-app1"` and key `./App1`. Component registered as `AppOne`, rendered in `Home`, route `/`. Relationship has In snapshot `Yes` and Active `Yes`.

**Interpretation:** An active Module Federation host → remote relationship from host to app-1, displayed at initial route.

### 51. host/src/main.ts:14; app-1/src/App.vue:33; host/vite.config.ts:18; lib/vite.config.ts:18-19, 22

**Observation:** Host specifier `remote-lib/Confirm` matches remote `remote-lib` in host configuration and, in lib, `name: "remote-lib"` and key `./Confirm`. Host registers component globally, used by app-1 `App1` mounted in host. Relationship has In snapshot `Yes` and Active `Yes`.

**Interpretation:** An active Module Federation host → remote relationship from host to lib, occurring inside another unit component.

### 52. host/src/router/index.ts:7; host/src/router/index.ts:8; host/src/router/index.ts:4; host/vite.config.ts:17; app-2/vite.config.ts:12-13, 18-19

**Observation:** Specifiers `remote-app2/LoginForm` and `remote-app2/RegisterForm` in host routes `/login` and `/register` match remote `remote-app2` (`http://localhost:5175/assets/remoteEntry.js`) in host configuration and, in app-2, `name: "remote-app2"` and keys `./LoginForm` and `./RegisterForm`. Relationship has In snapshot `Yes` and Active `Yes`.

**Interpretation:** An active Module Federation host → remote relationship from host to app-2 through routes.

### 53. app-2/src/services/authService.ts:67; app-2/src/services/authService.ts:40; lib/src/services/apiClient.ts:15-19; lib/src/services/apiClient.ts:34

**Observation:** App-2 writes and deletes `accessToken` in `localStorage`; lib `apiClient` reads key for `Authorization` header and deletes on 401; app-2 `authClient` reads same key on every request. No configuration declares channel. Relationship has type communication, direction bidirectional, mechanism `other`, In snapshot `Yes` and Active `Yes`.

**Interpretation:** Active app-2–lib shared-state link, depending on both running on same origin as inside host.

### 54. app-2/vite.config.ts:21-23; lib/vite.config.ts:18-19

**Observation:** App-2 declares remote `remote-lib` (`http://localhost:5177/assets/remoteEntry.js`), matching lib through `name`, but no app-2 file imports `remote-lib/...`. Relationship has In snapshot `Yes` and Active `No`.

**Interpretation:** Configuration-only Module Federation host → remote relationship from app-2 to lib without code usage.

### 55. app-1/package.json:8; app-1/vite.config.ts:7-44; package.json:8; .github/workflows/node.js.yml:20-23; app-1/package.json:10

**Observation:** Script `build` `vue-tsc -b && vite build` with own `vite.config.ts`, generating `remoteEntry.js` of `remote-app1`. CI only calls root `pnpm build`, without publishing. Only command serving build is local `vite preview --port 5174`. Version `0.0.0`, `private`.

**Interpretation:** app-1 has separate build. Deployment unobserved, no versioning used in publication.

### 56. app-2/package.json:8; app-2/vite.config.ts:7-48; package.json:8; .github/workflows/node.js.yml:20-23; app-2/package.json:10

**Observation:** Script `build` `vue-tsc -b && vite build` with own `vite.config.ts`, generating `remoteEntry.js` of `remote-app2`. CI only calls root `pnpm build`, without publishing. Build served through local `vite preview` on port 5175. Version `0.0.0`, `private`.

**Interpretation:** app-2 has separate build. Deployment unobserved, no versioning used in publication.

### 57. host/package.json:8; host/vite.config.ts:7-50; package.json:8; .github/workflows/node.js.yml:20-23

**Observation:** Script `build` `vue-tsc -b && vite build` with own `vite.config.ts`, embedding `localhost` URLs of three remotes. CI only calls root `pnpm build`, without publishing. No fixed port or hosting configuration. Version `0.0.0`, `private`.

**Interpretation:** Host has separate build only working against remotes served on same machine. Deployment unobserved, no versioning used in publication.

### 58. lib/package.json:11; lib/vite.config.ts:8-59; package.json:8; .github/workflows/node.js.yml:20-23; lib/package.json:9

**Observation:** Script `build` `vue-tsc -b && vite build` with own `vite.config.ts`, generating `remoteEntry.js` of `remote-lib`, without minification and with sourcemap. CI only calls root `pnpm build`, without publishing. Build served through local `vite preview --port 5177`. Version `0.0.0`, `private`.

**Interpretation:** lib has separate build. Deployment unobserved, no versioning used in publication.

### 59. README.md:5

**Observation:** "Die einzelnen Seiten sollen als Remote Module geladen werden."

**English translation:** Individual pages should load as remote modules.

**Interpretation:** Claims as an objective that each host page is remote. Three of four routes show remote code (#50, #52), but `/about` is a local host page (host/src/router/index.ts:6; host/src/views/About.vue:1-5), contradicting claim.

### 60. README.md:5

**Observation:** "Der Host hält die Navigationsleiste, Header und den Footer."

**English translation:** Host retains navigation bar, header and footer.

**Interpretation:** Assigns interface frame to host. Navigation is in host (host/src/App.vue:8-9; host/src/components/Navigation.vue:26), but no header or footer; claim partially confirmed.

### 61. README.md:7

**Observation:** "Mehrfach genutzte Steuerelemente sollen durch eine Library bereitgestellt werden"

**English translation:** Repeatedly used controls should be provided by a library.

**Interpretation:** Claims a shared-control unit. Lib exposes `Confirm` (#8), loaded by app-1 and host and rendered by app-1 (#9, #12, #42), in app-1 → lib and host → lib relationships (#49, #51).

### 62. README.md:15

**Observation:** "Host: Host der/für Anwendung/en"

**English translation:** Host of/for application(s).

**Interpretation:** Assigns shell role to host. Host is unit (#47), declares three remotes (#7) and originates three active relationships (#50, #51, #52).

### 63. README.md:17

**Observation:** "App1: Eine Anwendung, welche zu Testzwecken eine Library mit einem Dialog nuten soll"

**English translation:** An application using a library with a dialog for testing.

**Interpretation:** Claims app-1 consumes lib dialog. Loading (#9), usage in `<Confirm>` (#42) and app-1 → lib relationship (#49) confirm claim.

### 64. README.md:22

**Observation:** "die drei Teile der anwendung"

**English translation:** Three parts of application.

**Interpretation:** Claims three parts (Host, App1, Lib, from "Testaufbau"; English translation: "Test setup"). Snapshot has four frontend units in workspace, excluding app-2 from count (#46; pnpm-workspace.yaml:2-5), contradicting claim.

### 65. README.md:22

**Observation:** "Den Host kann man so starten, Lib und App1 müssen gebaut werden und danach über preview bereitgestellt werden, um alles im Host zu sehen."

**English translation:** Host can run with `pnpm dev`; Lib and App1 must be built and served through `preview` to appear in host.

**Interpretation:** Describes unit serving for composition. Host `localhost` URLs (#7) match app-1 and lib `vite preview` ports (#55, #58), and `dev:all` scripts combine watch build with `preview` (app-1/package.json:9-11; lib/package.json:8-10); host runs through `vite` (host/package.json:7).

### 66. README.md:22

**Observation:** "Einzelne Anwendungen kann man natürlich auch direkt starten und debuggen, sie funktionieren dann allerdings nicht in der Hostanwendung."

**English translation:** Individual applications can also be started and debugged directly, but then do not work in host application.

**Interpretation:** Claims each unit runs standalone. All four have own entry and `dev` (#45 through #48; app-1/package.json:7; lib/package.json:7), confirming claim.

### 67. README.md:24

**Observation:** "Primevue, Pinia, Vue sollten von allen Anwendungen geteilt werden. In der vite.config.ts wird das konfiguriert"

**English translation:** PrimeVue, Pinia and Vue should be shared by all applications, configured in `vite.config.ts`.

**Interpretation:** Claims shared dependencies between applications. All three in `shared` of four configurations (#5 through #8), alongside `axios`.

### 68. README.md:24

**Observation:** "Für Primevue musste nur in der Host Anwendung die vite.confit.ts erweitert werden […] Die Lösung war version und requiredVersion."

**English translation:** For PrimeVue only host configuration needed `version` and `requiredVersion`.

**Interpretation:** Claims only host declares shared PrimeVue version. Host configuration has `requiredVersion` and `version` (#7), remotes do not (#5, #6, #8).

### 69. README.md:26

**Observation:** "Folgender Code hat in der vite.config.ts der Lib und App1 zur Lösung geführt (in der Host Anwendung gab es die Anpassung nicht)"

**English translation:** The `build` block with `target: "esnext"`, `minify: false`, `cssCodeSplit: false` is in Lib and App1 configurations rather than host.

**Interpretation:** Attributes to lib and app-1 a `build` block absent from host. Whole block only in lib (lib/vite.config.ts:40-44); app-1 uses `minify: "esbuild"` (app-1/vite.config.ts:30-35), and host also has `target: "esnext"` (host/vite.config.ts:28-30), contradicting claim. Build options without composition element.

### 70. README.md:62

**Observation:** "Bis jetzt wurde nur lokal getestet, wie der Host sich im Livebetrieb verhält ist noch unklar."

**English translation:** Only tested locally so far; host behavior in production remains unknown.

**Interpretation:** Claims no execution outside local machine. Four applications have unobserved deployment (#55 through #58), and host points to `localhost` remotes (#7).

### 71. README.md:62

**Observation:** "GitHub Action wurde implementiert"

**English translation:** A GitHub Action was implemented.

**Interpretation:** Names existing CI (.github/workflows/node.js.yml:1-23), only building workspace and .NET solution. Does not concern units or MFE mechanism.

### 72. README.md:62

**Observation:** "Auch ein apiClient wird in der lib gepflegt und den anderen Anwendungen zur Verfügung gestellt."

**English translation:** An `apiClient` is maintained in lib and supplied to other applications.

**Interpretation:** Claims service supplied by lib to other units. Lib exposes `./apiClient` (#8), using it in `Confirm` (lib/src/components/Confirm.vue:7, 22), and app-1 imports it (app-1/src/main.ts:8; app-1/src/composables/api.ts:1). Host and app-2 do not import it.

### 73. app-2/README.md:12

**Observation:** "Module Federation: Kann als Remote-Modul in andere Apps geladen werden"

**English translation:** Can be loaded as a remote module in other applications.

**Interpretation:** Claims app-2 is Module Federation remote. Dependency (#2), named/exposed-module configuration (#6) and active host relationship (#52) confirm claim.

### 74. app-2/README.md:16

**Observation:** "Die App kommuniziert mit dem IdentityServer unter `http://localhost:5283/api/identity`"

**English translation:** Application communicates with IdentityServer at that address.

**Interpretation:** Discusses app-2 connection to backend in same repository rather than frontend unit. App-2 client uses base (app-2/src/services/authService.ts:3, 29-30), and IdentityServer profile exposes port (Api/IdentityServer/Properties/launchSettings.json:9).

### 75. app-2/README.md:42

**Observation:** "Die App wird als `remote-app2` exponiert und kann in anderen Apps wie folgt verwendet werden"

**English translation:** Application exposed as `remote-app2` and used in others through `defineAsyncComponent(() => import("remote-app2/App2"))`.

**Interpretation:** Claims remote name and possible usage. Name and `./App2` exposure in configuration (#6), host performs loading (#11) without rendering; host actually uses `LoginForm` and `RegisterForm` (#52).

### 76. app-2/src/App.vue:9

**Observation:** Comment "Prüfen ob Router verfügbar ist (nur für standalone-Modus)"

**English translation:** Checks whether router is available, which only exists in standalone mode.

**Interpretation:** Claims app-2 has standalone mode. Unit with own entry (#46; app-2/index.html:11) and router created only in standalone entry (app-2/src/main.ts:10-37) confirm claim.

### 77. app-2/vite.config.ts:16

**Observation:** Comment `// Für standalone-Modus` on exposure `"./App2": "./src/App.vue"`.

**English translation:** For standalone mode.

**Interpretation:** Claims exposed `./App2` is standalone-mode application. Exposed file is root component mounted by standalone entry (app-2/src/main.ts:4, 33; app-2/src/App.vue:80-82).

### 78. 184c4ab 2025-11-30 (host/src/main.ts, app-2/); 26e7bd2 2025-11-30 (host/src/components/Navigation.vue)

**Observation:** Snapshot `host/src/main.ts` is version `184c4ab` ("Tests und Login"; English translation: "Tests and login"), commit creating app-2. Host templates `App.vue`, `Home.vue` and `About.vue` unchanged since before that commit; `Navigation.vue` changes in `184c4ab` and `26e7bd2` ("Config"), and intermediate version unavailable. Result: inconclusive.

**Interpretation:** Unused `AppTwo` registration originates with app-2; whether ever used remains open. Uncertainty concerns only past: loading unused in snapshot.

### 79. 9a31597 2025-11-22 (host/src/router/index.ts, host/src/views/About.vue); 1cf6fc1 2025-11-23 (README.md); b09c7eb 2025-11-23 (host/src/views/About.vue); 184c4ab 2025-11-30 (host/src/router/index.ts)

**Observation:** Host router and `About.vue` created before README. Router only changes in `184c4ab`, introducing remote routes `/login` and `/register`; `About.vue` unchanged since `b09c7eb`. No older version available. Result: inconclusive.

**Interpretation:** Local page `/about` predates README sentence; whether ever had remote contents unknown. Uncertainty concerns only past: `/about` local in snapshot.

### 80. 0f527a1 2025-11-22 (host/); b09c7eb 2025-11-23 (host/src/App.vue, host/src/components/Navigation.vue); 312d8f3 2025-11-23 (README.md)

**Observation:** No commit through snapshot has filename containing "header" or "footer" under `host/`. Snapshot `host/src/App.vue` is version `b09c7eb`; earlier ones unavailable. Last README version, `312d8f3`, says "Es fehlt noch der Footer" (English translation: "Footer is still missing"). Result: inconclusive.

**Interpretation:** Host never had own header or footer component; older `App.vue` contents unreadable. Uncertainty concerns only past: host has no header or footer in snapshot.

### 81. 312d8f3 2025-11-23 (README.md); 184c4ab 2025-11-30 (app-2/, pnpm-workspace.yaml)

**Observation:** README changed last in `312d8f3`, with same object as snapshot. `app-2/` absent until `184c4ab`, creating all its files and changing `pnpm-workspace.yaml`. Result: clarified.

**Interpretation:** Three-part count comes from stage before app-2 creation; README not updated afterward.

### 82. 312d8f3 2025-11-23 (README.md, host/vite.config.ts, lib/vite.config.ts); a6a6c0c 2025-11-23, a0f3e3b 2025-11-23, 22bb24e 2025-11-24, 1727c5a 2025-11-24 (app-1/vite.config.ts); 184c4ab 2025-11-30, 26e7bd2 2025-11-30 (vite.config.ts)

**Observation:** After last README edit (`312d8f3`, "Vite Configs optimiert"; English translation: "Vite configurations optimized"), three cited configurations change again through snapshot, repeatedly for app-1; snapshot objects differ from `312d8f3`. Older versions unavailable. Result: clarified.

**Interpretation:** README `build` block and current configurations come from different stages; difference comes from later configuration changes.

## Classification

| # | Origin | Dimension | Type | Approach | Evidence | Strength | Relationships |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.2 (app-1/package.json:14) | 1 technology | manifest | module-federation | technological | weak | declares #5 |
| 2 | 3.4.2 (app-2/package.json:14) | 1 technology | manifest | module-federation | technological | weak | declares #6 |
| 3 | 3.4.2 (host/package.json:24) | 1 technology | manifest | module-federation | technological | weak | declares #7 |
| 4 | 3.4.2 (lib/package.json:20) | 1 technology | manifest | module-federation | technological | weak | declares #8 |
| 5 | 3.4.2 (app-1/package.json:14, Evidence); 3.4.3 (app-1, Markers and Build); 3.4.4 (app-1/src/main.ts:11, host/src/main.ts:12, Observation); 3.4.5 #1, #2 (Configuration); 3.4.6 #1 (Artifacts); 3.4.7 #9, #10 (Evidence) | 2 configuration | configuration | module-federation | architectural | strong | configures #45; configures #49; configures #50 |
| 6 | 3.4.2 (app-2/package.json:14, Evidence); 3.4.3 (app-2, Markers and Build); 3.4.4 (host/src/router/index.ts:7, host/src/router/index.ts:8, Observation); 3.4.5 #4, #6 (Configuration); 3.4.6 #2 (Artifacts); 3.4.7 #9, #10, #15, #17 (Evidence); 3.4.7 #19 (Document) | 2 configuration | configuration | module-federation | architectural | strong | configures #46; configures #52; configures #54 |
| 7 | 3.4.2 (host/package.json:24, Evidence); 3.4.3 (host, Markers and Build); 3.4.4 (host/src/main.ts:12, host/src/main.ts:14, host/src/router/index.ts:7, Observation); 3.4.5 #2, #3, #4 (Configuration); 3.4.6 #1, #2, #3, #4 (Where served, Artifacts); 3.4.7 #4, #7, #9, #10, #12 (Evidence) | 2 configuration | configuration | module-federation | architectural | strong | configures #47; configures #50; configures #51; configures #52 |
| 8 | 3.4.2 (lib/package.json:20, Evidence); 3.4.3 (lib, Markers and Build); 3.4.4 (app-1/src/main.ts:11, host/src/main.ts:14, Observation); 3.4.5 #1, #3, #6 (Configuration); 3.4.6 #4 (Artifacts); 3.4.7 #3, #9, #10, #14 (Evidence) | 2 configuration | configuration | module-federation | technological | moderate | configures #48; configures #49; configures #51 |
| 9 | 3.4.4 (app-1/src/main.ts:11) | 3 code | source code | module-federation | architectural | strong | implements #49 |
| 10 | 3.4.4 (host/src/main.ts:12) | 3 code | source code | module-federation | architectural | strong | implements #50 |
| 11 | 3.4.4 (host/src/main.ts:13) | 3 code | source code | module-federation | technological | weak | — |
| 12 | 3.4.4 (host/src/main.ts:14) | 3 code | source code | module-federation | architectural | strong | implements #51 |
| 13 | 3.4.4 (host/src/router/index.ts:7) | 3 code | source code | module-federation | architectural | strong | implements #52 |
| 14 | 3.4.4 (host/src/router/index.ts:8) | 3 code | source code | module-federation | architectural | strong | implements #52 |
| 15 | 3.4.4 (lib/src/App.test.ts:2) | 3 code | source code | — | context | weak | — |
| 16 | 3.4.4 (lib/src/components/Confirm.test.ts:2) | 3 code | source code | — | context | weak | — |
| 17 | 3.4.4 (lib/playwright-report/trace/assets/defaultSettingsView-BEpdCv1S.js:115) | 3 code | source code | — | context | weak | — |
| 18 | 3.4.4 (lib/playwright-report/trace/sw.bundle.js:1) | 3 code | source code | — | context | weak | — |
| 19 | 3.4.4 (lib/playwright-report/index.html:58, src-dynamic-script) | 3 code | source code | — | context | weak | — |
| 20 | 3.4.4 (lib/playwright-report/trace/assets/defaultSettingsView-BEpdCv1S.js:50, src-dynamic-script) | 3 code | source code | — | context | weak | — |
| 21 | 3.4.4 (lib/playwright-report/trace/snapshot.html:5) | 3 code | source code | — | context | weak | — |
| 22 | 3.4.4 (app-2/src/App.vue:24) | 3 code | source code | events | technological | weak | — |
| 23 | 3.4.4 (app-2/src/services/authService.ts:57) | 3 code | source code | events | technological | weak | — |
| 24 | 3.4.4 (app-2/src/services/authService.ts:99) | 3 code | source code | events | technological | weak | — |
| 25 | 3.4.4 (lib/playwright-report/index.html:18) | 3 code | source code | — | context | weak | — |
| 26 | 3.4.4 (lib/playwright-report/index.html:26) | 3 code | source code | — | context | weak | — |
| 27 | 3.4.4 (lib/playwright-report/index.html:34) | 3 code | source code | — | context | weak | — |
| 28 | 3.4.4 (lib/playwright-report/index.html:57) | 3 code | source code | — | context | weak | — |
| 29 | 3.4.4 (lib/playwright-report/index.html:58, src-cross-unit-communication) | 3 code | source code | — | context | weak | — |
| 30 | 3.4.4 (lib/playwright-report/trace/assets/codeMirrorModule-Bucv2d7q.js:20) | 3 code | source code | — | context | weak | — |
| 31 | 3.4.4 (lib/playwright-report/trace/assets/defaultSettingsView-BEpdCv1S.js:18) | 3 code | source code | — | context | weak | — |
| 32 | 3.4.4 (lib/playwright-report/trace/assets/defaultSettingsView-BEpdCv1S.js:26) | 3 code | source code | — | context | weak | — |
| 33 | 3.4.4 (lib/playwright-report/trace/assets/defaultSettingsView-BEpdCv1S.js:49) | 3 code | source code | — | context | weak | — |
| 34 | 3.4.4 (lib/playwright-report/trace/assets/defaultSettingsView-BEpdCv1S.js:50, src-cross-unit-communication) | 3 code | source code | — | context | weak | — |
| 35 | 3.4.4 (lib/playwright-report/trace/assets/defaultSettingsView-BEpdCv1S.js:59) | 3 code | source code | — | context | weak | — |
| 36 | 3.4.4 (lib/playwright-report/trace/assets/defaultSettingsView-BEpdCv1S.js:121) | 3 code | source code | — | context | weak | — |
| 37 | 3.4.4 (lib/playwright-report/trace/assets/defaultSettingsView-BEpdCv1S.js:124) | 3 code | source code | — | context | weak | — |
| 38 | 3.4.4 (lib/playwright-report/trace/assets/defaultSettingsView-BEpdCv1S.js:266) | 3 code | source code | — | context | weak | — |
| 39 | 3.4.4 (lib/playwright-report/trace/sw.bundle.js:3) | 3 code | source code | — | context | weak | — |
| 40 | 3.4.4 (host/src/router/index.ts:4) | 3 code | source code | module-federation | architectural | strong | implements #50; implements #52 |
| 41 | 3.4.4 (host/src/views/Home.vue:1) | 3 code | source code | module-federation | architectural | moderate | implements #50 |
| 42 | 3.4.4 (app-1/src/App.vue:33) | 3 code | source code | module-federation | architectural | moderate | implements #49; implements #51 |
| 43 | 3.4.4 (app-2/src/services/authService.ts:67) | 3 code | source code | other | technological | moderate | implements #53 |
| 44 | 3.4.3 (.) | 4 structure | directory | — | context | weak | — |
| 45 | 3.4.3 (app-1) | 4 structure | directory | — | architectural | moderate | — |
| 46 | 3.4.3 (app-2) | 4 structure | directory | — | architectural | moderate | — |
| 47 | 3.4.3 (host) | 4 structure | directory | — | architectural | moderate | — |
| 48 | 3.4.3 (lib) | 4 structure | directory | — | architectural | moderate | — |
| 49 | 3.4.5 #1 | 5 composition | source code | module-federation | architectural | strong | links #45; links #48 |
| 50 | 3.4.5 #2 | 5 composition | source code | module-federation | architectural | strong | links #47; links #45 |
| 51 | 3.4.5 #3 | 5 composition | source code | module-federation | architectural | strong | links #47; links #48 |
| 52 | 3.4.5 #4 | 5 composition | source code | module-federation | architectural | strong | links #47; links #46 |
| 53 | 3.4.5 #5 | 5 composition | source code | other | architectural | strong | links #46; links #48 |
| 54 | 3.4.5 #6 | 5 composition | configuration | module-federation | architectural | moderate | links #46; links #48 |
| 55 | 3.4.6 #1 | 6 build-deploy | configuration | — | architectural | moderate | publishes #45 |
| 56 | 3.4.6 #2 | 6 build-deploy | configuration | — | architectural | moderate | publishes #46 |
| 57 | 3.4.6 #3 | 6 build-deploy | configuration | — | architectural | moderate | publishes #47 |
| 58 | 3.4.6 #4 | 6 build-deploy | configuration | — | architectural | moderate | publishes #48 |
| 59 | 3.4.7 #1 | 7 documentation | documentation | — | architectural | weak | contradicts host/src/router/index.ts:6; contradicts host/src/views/About.vue:1-5 |
| 60 | 3.4.7 #2 | 7 documentation | documentation | — | architectural | weak | partially corroborates host/src/App.vue:8-9; partially corroborates host/src/components/Navigation.vue:26 |
| 61 | 3.4.7 #3 | 7 documentation | documentation | — | architectural | weak | corroborates #8; corroborates #9; corroborates #12; corroborates #42; corroborates #49; corroborates #51 |
| 62 | 3.4.7 #4 | 7 documentation | documentation | — | architectural | weak | corroborates #47; corroborates #7; corroborates #50; corroborates #51; corroborates #52 |
| 63 | 3.4.7 #5 | 7 documentation | documentation | — | architectural | weak | corroborates #9; corroborates #42; corroborates #49 |
| 64 | 3.4.7 #6 | 7 documentation | documentation | — | architectural | weak | contradicts #46; contradicts pnpm-workspace.yaml:2-5 |
| 65 | 3.4.7 #7 | 7 documentation | documentation | — | architectural | weak | corroborates #55; corroborates #58; corroborates #7; corroborates app-1/package.json:9-11; corroborates lib/package.json:8-10; corroborates host/package.json:7 |
| 66 | 3.4.7 #8 | 7 documentation | documentation | — | architectural | weak | corroborates #45; corroborates #46; corroborates #47; corroborates #48; corroborates app-1/package.json:7; corroborates lib/package.json:7 |
| 67 | 3.4.7 #9 | 7 documentation | documentation | — | technological | weak | corroborates #5; corroborates #6; corroborates #7; corroborates #8 |
| 68 | 3.4.7 #10 | 7 documentation | documentation | — | technological | weak | corroborates #7; corroborates #5; corroborates #6; corroborates #8 |
| 69 | 3.4.7 #11 | 7 documentation | documentation | — | context | weak | contradicts app-1/vite.config.ts:30-35; contradicts host/vite.config.ts:28-30 |
| 70 | 3.4.7 #12 | 7 documentation | documentation | — | architectural | weak | corroborates #55; corroborates #56; corroborates #57; corroborates #58; corroborates #7 |
| 71 | 3.4.7 #13 | 7 documentation | documentation | — | context | weak | corroborates .github/workflows/node.js.yml:1-23 |
| 72 | 3.4.7 #14 | 7 documentation | documentation | — | architectural | weak | corroborates #8; corroborates lib/src/components/Confirm.vue:7, 22; corroborates app-1/src/main.ts:8; corroborates app-1/src/composables/api.ts:1 |
| 73 | 3.4.7 #15 | 7 documentation | documentation | module-federation | architectural | weak | corroborates #2; corroborates #6; corroborates #52 |
| 74 | 3.4.7 #16 | 7 documentation | documentation | — | context | weak | corroborates app-2/src/services/authService.ts:3, 29-30; corroborates Api/IdentityServer/Properties/launchSettings.json:9 |
| 75 | 3.4.7 #17 | 7 documentation | documentation | — | architectural | weak | corroborates #6; corroborates #11 |
| 76 | 3.4.7 #18 | 7 documentation | comment | — | architectural | weak | corroborates #46; corroborates app-2/index.html:11; corroborates app-2/src/main.ts:10-37 |
| 77 | 3.4.7 #19 | 7 documentation | comment | — | architectural | weak | corroborates app-2/src/main.ts:4, 33; corroborates app-2/src/App.vue:80-82 |
| 78 | 3.4.8 #1 | 8 history | history | module-federation | technological | weak | explains #11 |
| 79 | 3.4.8 #2 | 8 history | history | — | architectural | weak | explains #59 |
| 80 | 3.4.8 #3 | 8 history | history | — | architectural | weak | explains #60 |
| 81 | 3.4.8 #4 | 8 history | history | — | architectural | weak | explains #64; explains #46 |
| 82 | 3.4.8 #5 | 8 history | history | — | context | weak | explains #69 |

## Summary

Observations: 82. Dimensions (technology: 4, configuration: 4, code: 35, structure: 5, composition: 6, build-deploy: 4, documentation: 19, history: 5). Strength (strong: 14, moderate: 13, weak: 55, ambiguous: 0). Evidence (technological: 13, architectural: 42, context: 27).

