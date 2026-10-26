---
schema: 1
id: 1101991974
full_name: Marcel-b-velop/vue-mf
commit: ed270d34b0542cb1a0ce26aafc2aeba4bca994e1
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

# 185 — Marcel-b-velop/vue-mf

## Repository overview

Documentation is entirely German. Root README is experiment notebook: objective ("Ziel", English translation: "Goal": remotely loaded pages, host navigation/header/footer, shared control library), test arrangement ("Testaufbau", English translation: "Test setup": Host, App1, Lib), solved problems ("Gelöste Probleme", English translation: "Solved problems": running remotes, PrimeVue `shared`, Tailwind CSS, remote module type declarations), status ("Stand", English translation: "Status"). `app-2/README.md` describes authentication module app-2, loadable through Module Federation and connected to IdentityServer. `Api/IdentityServer/README.md` documents .NET identity backend. READMEs in `app-1/`, `host/` and `lib/` are Vite templates (app-1/README.md:1-5; host/README.md:1-5; lib/README.md:1-5), without project claims.

Root README matches previous composition reviews (host, app-1, lib linked through `@originjs/vite-plugin-federation`, common `shared` dependencies, remotes served through `vite
preview` on `localhost`), but lags snapshot: mentions three parts, never app-2, existing fourth unit (pnpm-workspace.yaml:4), remote for host routes `/login` and `/register` (host/src/router/index.ts:7-8). App-2 described only in own README. Not every host page is remote: `/about` local (host/src/router/index.ts:6).

Excluded from table:
- Second half of README.md:7 (whether function logic shared through NPM or library "muss noch erarbeitet werden", English translation: "remains to be worked out") and README.md:9 (style-sharing strategy also open), intentions;
- README.md:11, selection-dialog functional description (initialized with selections, loads own data, returns selection to caller). Internal `Confirm` contract (lib/src/components/Confirm.vue:9-24), recorded by composition review (3.4.5 #1);
- README.md:36-56, `declare module` declarations in `vite-env.d.ts` informing compiler of remote modules (host/src/vite-env.d.ts:1-29), typing detail; code block reproduces file;
- Code block README.md:28-34, reproducing claim 11 configuration;
- README.md:60, status ("Host, App1 und Lib sind schon lauffähig. Es fehlt noch der Footer und die
  Auslagerung der Styles und Funktionen.", English translation: "Host, App1 and Lib already run; footer and extraction of styles/functions remain"): "lauffähig" (English translation: "runnable") unverified in snapshot; footer in claim 2 paragraph;
- "die vite configs wurden optimiert" (English translation: "Vite configurations optimized") (README.md:62), without verifiable content;
- In `app-2/README.md`: functional description (:3), login/registration/logout/JWT-token/Pinia-store features (:7-11), internal details; standalone routes (:48-52); dependencies (:54-61); command block (:23-38);
- `Api/IdentityServer/README.md`, solely backend (endpoints, JWT, password, in-memory database, running at `localhost:5283`). Section "Integration mit Vue-App" (English translation: "Integration with Vue app") (Api/IdentityServer/README.md:113-121) instructs storing token in `localStorage`, sending through `Authorization`; backend integration instruction without unit claims. Snapshot app-2 stores token (app-2/src/services/authService.ts:67), lib reads it (lib/src/services/apiClient.ts:15), channel of relationship 3.4.5 #5.

`doc-*` occurrences without rows: README.md:1 (title "Vue Module Federation"); app-2/README.md:30, :33 and :36, comments inside command block (`pnpm build`, `pnpm dev:watch`, `pnpm preview` "für Module Federation", English translation: "for Module Federation"), arrangement in claim 7; app-2/README.md:40, "Module Federation" section title. README.md:5 in claims 1 and 2, app-2/README.md:12 in 15.

Comments/fields read in artifacts cited by previous reviews: four `vite.config.ts` files (labels "Modules to expose" at host/vite.config.ts:14, app-1/vite.config.ts:14, app-2/vite.config.ts:14 and "Modules to exposed" at lib/vite.config.ts:20 merely mark section; host label above `remotes`, without `exposes`; host/vite.config.ts:36 and lib/vite.config.ts:34, 36 concern chunks/top-level await; app-2/vite.config.ts:16 became claim 19); app-2/src/main.ts:9 and app-2/src/App.vue:9, 23, 45, 79 (claim 18); app-1/src/main.ts:17, 19; app-2/src/services/authService.ts:37, 51; lib/src/services/apiClient.ts:12, 32, 51; workflow (.github/workflows/node.js.yml:1, name "Build UI", :24, ".NET Setup und Build", English translation: ".NET setup and build"). Others are internal details. No `package.json` has `description`.

## Claims

| # | Document | Claim | Theme | Corroboration | Evidence |
|---|---|---|---|---|---|
| 1 | README.md:5 | "Die einzelnen Seiten sollen als Remote Module geladen werden." (English translation: Pages should load as remote modules) | composition | contradicted | 3.4.5 #2, #4; host/src/router/index.ts:5-8; host/src/views/Home.vue:1; host/src/views/About.vue:1-5 |
| 2 | README.md:5 | "Der Host hält die Navigationsleiste, Header und den Footer." (English translation: Host maintains navigation bar, header and footer) | structure | partial | host/src/App.vue:8-9; host/src/components/Navigation.vue:26 |
| 3 | README.md:7 | "Mehrfach genutzte Steuerelemente sollen durch eine Library bereitgestellt werden" (English translation: Repeatedly used controls should be provided through library) | structure | corroborated | 3.4.5 #1, #3; lib/vite.config.ts:22; app-1/src/main.ts:11, 16; app-1/src/App.vue:33; host/src/main.ts:14, 21 |
| 4 | README.md:15 | "Host: Host der/für Anwendung/en" (English translation: Host of applications) | structure | corroborated | 3.4.3 (host `Yes`); 3.4.5 #2, #3, #4; host/vite.config.ts:15-19 |
| 5 | README.md:17 | "App1: Eine Anwendung, welche zu Testzwecken eine Library mit einem Dialog nuten soll" (English translation: Test application using library with dialog) | composition | corroborated | 3.4.5 #1; app-1/src/main.ts:11, 16; app-1/src/App.vue:33 |
| 6 | README.md:22 | "die drei Teile der anwendung" (English translation: Three application parts) | structure | contradicted | 3.4.3 (app-1, app-2, host, lib `Yes`); pnpm-workspace.yaml:2-5 |
| 7 | README.md:22 | "Den Host kann man so starten, Lib und App1 müssen gebaut werden und danach über preview bereitgestellt werden, um alles im Host zu sehen." (English translation: Host runs through `pnpm dev`; Lib and App1 must build and serve through `preview` to appear in host) | build-deploy | corroborated | 3.4.6 #1, #4; host/vite.config.ts:16, 18; app-1/package.json:9-11; lib/package.json:8-10; host/package.json:7 |
| 8 | README.md:22 | "Einzelne Anwendungen kann man natürlich auch direkt starten und debuggen, sie funktionieren dann allerdings nicht in der Hostanwendung." (English translation: Applications can start/debug independently, but then do not work in host) | independence | corroborated | 3.4.3 (own entry of app-1, app-2, host and lib); app-1/package.json:7; lib/package.json:7 |
| 9 | README.md:24 | "Primevue, Pinia, Vue sollten von allen Anwendungen geteilt werden. In der vite.config.ts wird das konfiguriert" (English translation: PrimeVue, Pinia and Vue shared across applications, configured in `vite.config.ts`) | composition | corroborated | 3.4.2 (federation configured in four); host/vite.config.ts:20-25; app-1/vite.config.ts:21-26; app-2/vite.config.ts:24-29; lib/vite.config.ts:26-31 |
| 10 | README.md:24 | "Für Primevue musste nur in der Host Anwendung die vite.confit.ts erweitert werden […] Die Lösung war version und requiredVersion." (English translation: Only host PrimeVue configuration needed `version` and `requiredVersion`) | composition | corroborated | host/vite.config.ts:23; app-1/vite.config.ts:24; app-2/vite.config.ts:27; lib/vite.config.ts:29 |
| 11 | README.md:26 | "Folgender Code hat in der vite.config.ts der Lib und App1 zur Lösung geführt (in der Host Anwendung gab es die Anpassung nicht)" (English translation: Block `build` with `target: "esnext"`, `minify: false`, `cssCodeSplit: false` in Lib/App1 configurations, absent from host) | build-deploy | contradicted | lib/vite.config.ts:40-44; app-1/vite.config.ts:30-35; host/vite.config.ts:28-30 |
| 12 | README.md:62 | "Bis jetzt wurde nur lokal getestet, wie der Host sich im Livebetrieb verhält ist noch unklar." (English translation: Only locally tested so far; production host behavior unknown) | build-deploy | corroborated | 3.4.6 #1-#4 (deploy `not observed`); host/vite.config.ts:16-18 |
| 13 | README.md:62 | "GitHub Action wurde implementiert" (English translation: GitHub Action implemented) | build-deploy | corroborated | 3.4.6 (Repository overview); .github/workflows/node.js.yml:1-23 |
| 14 | README.md:62 | "Auch ein apiClient wird in der lib gepflegt und den anderen Anwendungen zur Verfügung gestellt." (English translation: `apiClient` maintained in lib, provided to other applications) | structure | corroborated | lib/vite.config.ts:23; lib/src/components/Confirm.vue:7, 22; app-1/src/main.ts:8; app-1/src/composables/api.ts:1 |
| 15 | app-2/README.md:12 | "Module Federation: Kann als Remote-Modul in andere Apps geladen werden" (English translation: Can load as remote module in other applications) | composition | corroborated | 3.4.2 (app-2 configured); 3.4.5 #4; app-2/vite.config.ts:11-20 |
| 16 | app-2/README.md:16 | "Die App kommuniziert mit dem IdentityServer unter `http://localhost:5283/api/identity`" (English translation: Application communicates with IdentityServer at stated address) | other | corroborated | app-2/src/services/authService.ts:3, 29-30; Api/IdentityServer/Properties/launchSettings.json:9 |
| 17 | app-2/README.md:42 | "Die App wird als `remote-app2` exponiert und kann in anderen Apps wie folgt verwendet werden" (English translation: Application exposed as `remote-app2`, usable elsewhere through `defineAsyncComponent(() => import("remote-app2/App2"))`) | composition | corroborated | app-2/vite.config.ts:12, 16; host/src/main.ts:13 |
| 18 | app-2/src/App.vue:9 | "Prüfen ob Router verfügbar ist (nur für standalone-Modus)" (English translation: Checks router availability, present only in standalone mode) | independence | corroborated | 3.4.3 (app-2 `Yes`, own router in standalone mode); app-2/index.html:11; app-2/src/main.ts:10-37 |
| 19 | app-2/vite.config.ts:16 | `"./App2": "./src/App.vue", // Für standalone-Modus` (English translation: Exposed `./App2` is standalone-mode application) | composition | corroborated | app-2/src/main.ts:4, 33; app-2/src/App.vue:80-82 |

## Observations

**1. README.md:5.** Goal: each page remote module, host holding frame only. Three of four snapshot host routes show remote code: `/` renders `App1` from app-1 (host/src/router/index.ts:5; host/src/views/Home.vue:1), `/login` and `/register` load app-2 forms (host/src/router/index.ts:7-8). Route `/about` is local host page (host/src/router/index.ts:2, 6; host/src/views/About.vue:1-5). One page refutes sentence, hence `contradicted`; remote part holds. Written as goal ("sollen", English translation: "should"), README does not claim achieved. Also `doc-host-remote` occurrence.

**2. README.md:5.** Navigation bar in host: `host/src/App.vue:8` mounts `Navigation`, PrimeVue `Menubar` (host/src/components/Navigation.vue:26), above `<RouterView />` (host/src/App.vue:9). No header/footer; README itself says "Es fehlt noch
der Footer" (English translation: "Footer still missing", README.md:60). Hence `partial`: navigation holds, header/footer lack artifacts. Sole snapshot `<header>` in app-2 (app-2/src/App.vue:46), not rendered by host.

**3. README.md:7.** Library is unit lib, exposing dialog `Confirm` (lib/vite.config.ts:22). Multiple units use it: app-1 loads/registers (app-1/src/main.ts:11, 16), uses at app-1/src/App.vue:33; host loads/registers (host/src/main.ts:14, 21) for rendered `App1`. Repeated in README.md:18 ("Lib: Stellt einen Dialog bereit, der von mehreren Anwendungen benutzt werden kann", English translation: "Provides dialog usable by multiple applications"). Sole exposed control; other lib modules `apiClient` and types (lib/vite.config.ts:23-24).

**4. README.md:15.** Host is shell consuming three remotes (host/vite.config.ts:15-19), exposing nothing. Composition review records relationships with app-1, lib and app-2.

**5. README.md:17.** App-1 consumes lib `Confirm`: loads through `defineAsyncComponent` (app-1/src/main.ts:11), registers globally (app-1/src/main.ts:16), opens at app-1/src/App.vue:33. "Zu Testzwecken" (English translation: "for testing") describes purpose, matching classification `repo_type: example`.

**6. README.md:22.** Sentence names three application parts, same as "Testaufbau" (English translation: "Test setup") (README.md:15-18: Host, App1, Lib). Snapshot has four frontend workspace units (pnpm-workspace.yaml:2-5), all marked `Yes` in structural review; app-2 missing from count. Hence `contradicted`. README appears older than app-2, with own documentation (app-2/README.md).

**7. README.md:22.** Host sees remotes at `localhost:5174` and `localhost:5177` (host/vite.config.ts:16, 18), app-1/lib `vite preview` ports (app-1/package.json:10; lib/package.json:9), with `dev:all` combining `vite build --watch` and `preview` (app-1/package.json:9-11; lib/package.json:8-10). Host runs through `vite` (host/package.json:7). Build and deployment review cites passage in Repository overview. Same arrangement in app-2 command-block comments (app-2/README.md:30-37), app-2 following same pattern (app-2/package.json:9-11).

**8. README.md:22.** Each unit has `index.html`, own mounting entry and own `dev` (3.4.3; app-1/package.json:7; lib/package.json:7), so can start independently. Second part, not working inside host in `dev`, is counterpart to claim 7: host seeks `/assets/remoteEntry.js` (host/vite.config.ts:16-18), produced by build served through `preview`.

**9. README.md:24.** `vue`, `pinia` and `primevue` in `shared` of four `vite.config.ts` files (host/vite.config.ts:20-25; app-1/vite.config.ts:21-26; app-2/vite.config.ts:24-29; lib/vite.config.ts:26-31), alongside omitted `axios`. Remotes set three to `generate: false, import: false`, using host copy; only app-2 generates/imports own `axios` (app-2/vite.config.ts:28).

**10. README.md:24.** Only host declares `requiredVersion` and `version` for PrimeVue (host/vite.config.ts:23); three remote entries only `generate: false, import: false` (app-1/vite.config.ts:24; app-2/vite.config.ts:27; lib/vite.config.ts:29). README code also has `singleton: true`, absent from current configuration, which has `modulePreload: true`. Sentence concludes solution was `version` and `requiredVersion`, holding this part.

**11. README.md:26.** Cited block (README.md:28-34) complete only in lib (lib/vite.config.ts:40-44, adding `sourcemap`). App-1 has `target: "esnext"` and `cssCodeSplit: false`, but `minify: "esbuild"` rather than `false` (app-1/vite.config.ts:30-35). Host lacks `cssCodeSplit`, but also has `target: "esnext"` (host/vite.config.ts:28-30). CSS-solving part, `cssCodeSplit: false` in lib/app-1 but absent in host, holds; rest differs from current configurations, hence `contradicted`. Unmentioned app-2 also has `cssCodeSplit: false` (app-2/vite.config.ts:36). README later says configurations optimized (README.md:62), possibly explaining difference.

**12. README.md:62.** No artifact publishes applications: build and deployment review marks four deployments `not observed`, host pointing at `localhost` remotes (host/vite.config.ts:16-18). Sentence matches snapshot.

**13. README.md:62.** Workflow "Build UI" runs every push, installs workspace, calls `pnpm build` (.github/workflows/node.js.yml:1-3, 20-23), then builds/tests .NET solution (:25-34). Continuous integration without publishing.

**14. README.md:62.** Lib exposes `./apiClient` (lib/vite.config.ts:23), using in own `Confirm` (lib/src/components/Confirm.vue:7, 22); app-1 statically imports from `remote-lib/apiClient` (app-1/src/main.ts:8, 20; app-1/src/composables/api.ts:1). Two using units, hence `corroborated`. "Den anderen Anwendungen" (English translation: "to other applications") exceeds use: host/app-2 do not import `apiClient` (app-2 has own client, app-2/src/services/authService.ts:29); host only executes indirectly through `Confirm` within `App1`.

**15. app-2/README.md:12.** App-2 is remote `remote-app2`, four exposed modules (app-2/vite.config.ts:11-20). Host loads it at routes `/login` and `/register` (host/src/router/index.ts:7-8), active composition relationship (3.4.5 #4).

**16. app-2/README.md:16.** App-2 authentication client uses this base (app-2/src/services/authService.ts:3, 29-30), IdentityServer run profile exposing `http://localhost:5283` (Api/IdentityServer/Properties/launchSettings.json:9). App-2 dependency on repository backend rather than frontend unit.

**17. app-2/README.md:42.** Name `remote-app2` and exposure `./App2` at app-2/vite.config.ts:12 and :16; host performs exact example load (host/src/main.ts:13, registered as `AppTwo` at :20). Source-code review marks load `No`, since no template uses `<AppTwo>`; claim says use possible, which holds. Host actually uses `LoginForm` and `RegisterForm` (host/src/router/index.ts:7-8), unmentioned by README.

**18. app-2/src/App.vue:9.** App-2 router created solely in standalone entry (app-2/src/main.ts:10-37, comment "Router nur für standalone-Modus (wenn app-2 direkt
verwendet wird)", English translation: "Router only for standalone mode when app-2 used directly", app-2/src/main.ts:9), and `App.vue` only shows `<router-view />` when router exists (app-2/src/App.vue:10-17, 79-82: "Main Content - nur wenn Router vorhanden (standalone)", English translation: "Main content only when router exists, standalone"). Three comments say same: app-2 has mode running independently with own entry (app-2/index.html:11).

**19. app-2/vite.config.ts:16.** `./App2` points to `./src/App.vue`, root component mounted by standalone entry (app-2/src/main.ts:4, 33), with header and route area (app-2/src/App.vue:46-82). Comment matches exposed file. Module is `App2` host registers without use (host/src/main.ts:13, 20).

## Summary

Claims: 19 (corroborated: 15, partial: 1, contradicted: 3, uncorroborated: 0). Themes: (structure: 5, composition: 7, build-deploy: 4, independence: 2, other: 1).
