---
schema: 1
id: 1247892038
full_name: raiane-honorato/software-eng-mba
commit: c569ccc6582475495a637d44ceed33c62c0f6e86
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

# 025 — raiane-honorato/software-eng-mba

## Repository overview

Thesis implements same React Native app (MyGym) three times to compare modularization regimes: monolith, Turborepo (build-time) and Re.Pack with Module Federation 2 (runtime). Earlier spike at `apps/repack-poc/`. Only two Re.Pack versions compose units at runtime. Units are mobile rather than web apps; classification scope decision remains open without changing evidence.

Re.Pack chain (`apps/repack/packages/`) complete:
- **Dependency:** `@module-federation/enhanced` in host/two mini-apps (#3–#5), used by `Repack.plugins.ModuleFederationPluginV2`.
- **Configuration:** host declares `checkin` and `dashboard` through `mf-manifest.json` (#11); each mini-app names itself/exposes navigation stack (#9, #10); helper `sharedDeps` assembles same singleton `shared` list for all three (#12).
- **Code:** host imports stacks through remote names (#14, #15), mounts within `ErrorBoundary` + `Suspense` (#23, #24), linking to navigator’s two tabs (#25).
- **Relationship:** active host → check-in/host → dashboard (#58, #59), over independently bounded units (#31, #32, #35) with own builds (#64–#66).

Mini-app communication uses Zustand store `@mygym/store` (#26). Single state because singleton in `shared` (#12), host eagerly providing (#11), mini-apps consuming (#9, #10). Produces bidirectional check-in ↔ dashboard relationship (#60). Spike repeats minimal host → remote pair (#1, #2, #7, #8, #13, #22, #57).

Misleading signals:
- Six `UX/` HTML mockups load Tailwind CDN rather than units (#16–#21).
- `@mygym/*` packages in both workspaces are libraries/configurations rather than units (#33–#43, #46–#56). Turborepo `feature-*` modules merge into `mygym` app’s single bundle (#48, #49, #67), `turbo` is monorepo tool rather than MFE mechanism (#6).
- Monolith/Turborepo apps are units with own builds but unrelated to another unit (#27, #45, #61, #67).

Documentation extensive/almost entirely corroborated (#68–#98). Independent deployment/OTA (#73), host rebuild for new native library (#94) and standalone-build container (#97) lack artifacts. Before/after `phosphor-react-native` measurement (#79) and `ScriptManager` bundle download (#80) also lack artifacts. Host native project as sole binary lacks artifact because Git ignores `ios/`/`android/` (#92, #103). Two contradicted claims: `pnpm catalog` sole version source (#90) and "webpack + MF" in Turborepo table written before Rspack implementation (#98, #104).

No snapshot ambiguity remains. No observed deployment in any of seven applications: remote addresses are dev-server `localhost`.

## Observations

### 1. apps/repack-poc/host/package.json:13

**Observation:** `@module-federation/enhanced` (`^2.6.0`) declared in `dependencies`.

**Interpretation:** Federation technology present in spike host.

### 2. apps/repack-poc/remote/package.json:13

**Observation:** `@module-federation/enhanced` (`^2.6.0`) declared in `dependencies`.

**Interpretation:** Federation technology present in spike remote.

### 3. apps/repack/packages/check-in/package.json:13

**Observation:** `@module-federation/enhanced` (`^2.6.0`) declared in `dependencies`.

**Interpretation:** Federation technology present in check-in mini-app.

### 4. apps/repack/packages/dashboard/package.json:13

**Observation:** `@module-federation/enhanced` (`^2.6.0`) declared in `dependencies`.

**Interpretation:** Federation technology present in dashboard mini-app.

### 5. apps/repack/packages/host/package.json:13

**Observation:** `@module-federation/enhanced` (`^2.6.0`) declared in `dependencies`.

**Interpretation:** Federation technology present in MyGym host.

### 6. apps/turborepo/package.json:12

**Observation:** `turbo` (`^2.9.5`) declared in Turborepo workspace root `devDependencies`; `turbo.json` configures tasks `build`, `typecheck`, `lint`, `dev` and `test`.

**Interpretation:** Turborepo orchestrates monorepo tasks rather than composing frontend units.

### 7. apps/repack-poc/host/rspack.config.mjs:15-54

**Observation:** `Repack.plugins.ModuleFederationPluginV2` declares `name: 'host'`, remote `remote: remote@http://localhost:9001/${platform}/mf-manifest.json`, sharing `react` and `react-native` with `singleton: true, eager: true`.

**Interpretation:** Spike host configuration declares remote/resolution location, host supplying singletons.

### 8. apps/repack-poc/remote/rspack.config.mjs:15-47

**Observation:** `ModuleFederationPluginV2` declares `name: 'remote'`, `filename: 'remote.container.bundle'`, exposing `./HelloScreen` (`./src/HelloScreen.tsx`), sharing `react` and `react-native` with `singleton: true, eager: false`.

**Interpretation:** Spike remote configured as container offering screen to host, consuming host singletons.

### 9. apps/repack/packages/check-in/rspack.config.mjs:14-51

**Observation:** `ModuleFederationPluginV2` declares `name: 'checkin'` (no hyphen because becoming global JS identifier, per lines 40-41 comment), `filename: 'check-in.container.js.bundle'`, exposing `./CheckInStack`, using `shared: sharedDeps({ eager: false })`.

**Interpretation:** Check-in configured as remote exposing navigation stack, consuming host singletons.

### 10. apps/repack/packages/dashboard/rspack.config.mjs:14-49

**Observation:** `ModuleFederationPluginV2` declares `name: 'dashboard'`, `filename: 'dashboard.container.js.bundle'`, exposing `./DashboardStack`, using `shared: sharedDeps({ eager: false })`.

**Interpretation:** Dashboard configured as remote exposing navigation stack, consuming host singletons.

### 11. apps/repack/packages/host/rspack.config.mjs:16-58

**Observation:** `ModuleFederationPluginV2` declares `name: 'host'`, remotes `checkin@http://localhost:9001/${platform}/mf-manifest.json` and `dashboard@http://localhost:9002/${platform}/mf-manifest.json`, using `shared: sharedDeps({ eager: true })`.

**Interpretation:** Host configuration declares check-in/dashboard as network-resolved runtime remotes, making host eager singleton provider.

**Note:** Other configuration files cited in 3.4 tables declare no composition element, producing no observation: `react-native.config.js` (replaces CLI commands with Re.Pack), `pnpm-workspace.yaml` (workspace packages/catalog), `turbo.json`, `app.json`, `metro.config.js` and `mprocs.yaml` (starts dev servers). `start` script ports in `package.json` are development-server ports; host remote-resolution URL is here.

### 12. apps/repack/packages/shared-deps/sharedDeps.mjs:19-80

**Observation:** Helper lists external libraries in `RUNTIME_LIBS` (`react`, `react-native`, `@react-navigation/*`, `react-native-safe-area-context`, `react-native-screens`, `react-native-svg`, `react-native-linear-gradient`, `@react-native-community/blur`, `phosphor-react-native`, `zustand`), in `LOCAL_PACKAGES` the packages `@mygym/store`, `theme`, `ui`, `navigation`, `data` and `utils`. `sharedDeps({ eager })` returns `shared` object with `singleton: true` and received `eager` for all; externals get `version`/`requiredVersion` equal to `node_modules`-read version (`installedVersion`, lines 19-23), locals `requiredVersion: false`.

**Interpretation:** Single Module Federation shared-dependency declaration, used by host/two mini-apps; makes store single inter-unit state.

**Note:** Build-dedicated JavaScript file (imported by three `rspack.config.mjs`, line 4), hence configuration. Serves three units but one block (list/function), no per-unit portion; each unit’s `eager` in #9, #10 and #11.

### 13. apps/repack-poc/host/App.tsx:26

**Observation:** `const HelloScreen = React.lazy(() => import('remote/HelloScreen'))`.

**Interpretation:** Spike host loads remote-exposed module at runtime by name.

### 14. apps/repack/packages/host/src/screens/CheckInTab.tsx:12

**Observation:** `import('checkin/CheckInStack').then((m) => ({ default: m.CheckInStack }))` within `React.lazy` (lines 11-13).

**Interpretation:** Host loads check-in-exposed stack at runtime by remote name.

### 15. apps/repack/packages/host/src/screens/DashboardTab.tsx:9

**Observation:** `import('dashboard/DashboardStack').then((m) => ({ default: m.DashboardStack }))` within `React.lazy` (lines 8-10).

**Interpretation:** Host loads dashboard-exposed stack at runtime by remote name.

### 16. UX/confirma_o_de_check_in/code.html:15

**Observation:** `<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries">` in UI mockup.

**Interpretation:** Loads CDN utility CSS rather than another unit.

### 17. UX/dashboard_check_in_ativo_4/code.html:7

**Observation:** Same Tailwind CDN `<script>` in UI mockup.

**Interpretation:** Does not load another unit.

### 18. UX/dashboard_p_s_treino_2/code.html:7

**Observation:** Same Tailwind CDN `<script>` in UI mockup.

**Interpretation:** Does not load another unit.

### 19. UX/dashboard_p_s_treino_menu_unificado/code.html:7

**Observation:** Same Tailwind CDN `<script>` in UI mockup.

**Interpretation:** Does not load another unit.

### 20. UX/finaliza_o_de_treino/code.html:7

**Observation:** Same Tailwind CDN `<script>` in UI mockup.

**Interpretation:** Does not load another unit.

### 21. UX/listagem_de_academias/code.html:7

**Observation:** Same Tailwind CDN `<script>` in UI mockup.

**Interpretation:** Does not load another unit.

### 22. apps/repack-poc/host/App.tsx:35

**Observation:** `<HelloScreen />` within `ErrorBoundary` + `Suspense` (lines 33-37); component from line 26 import.

**Interpretation:** Spike host renders remote component, isolating loading failure.

### 23. apps/repack/packages/host/src/screens/CheckInTab.tsx:21

**Observation:** `<CheckInStack />` within `ErrorBoundary` + `React.Suspense` (lines 19-23); component from line 12 import.

**Interpretation:** Host renders check-in stack with loading fallback/error isolation.

### 24. apps/repack/packages/host/src/screens/DashboardTab.tsx:16

**Observation:** `<DashboardStack />` within `ErrorBoundary` + `React.Suspense` (lines 14-18); component from line 9 import.

**Interpretation:** Host renders dashboard stack with loading fallback/error isolation.

### 25. apps/repack/packages/host/src/navigation/RootNavigator.tsx:52-53

**Observation:** `<Tab.Screen name="Home" component={DashboardTab} />` and `<Tab.Screen name="FindGyms" component={CheckInTab} />` in host `Tab.Navigator`.

**Interpretation:** Host routes link each tab to remote-loading component.

### 26. apps/repack/packages/store/src/checkInStore.ts:33

**Observation:** `export const useCheckInStore = create<CheckInState>(...)`, Zustand store with `startCheckIn`, `history` and `canCheckInToday`. Package singleton in `shared` of three `rspack.config.mjs`; check-in writes on confirmation, dashboard reading state to choose screen.

**Interpretation:** Runtime shared-state channel between two mini-apps.

### 27. apps/monolith; apps/monolith/package.json:4; apps/monolith/index.ts:1-8; apps/monolith/package.json:10; apps/monolith/app.json:2-29

**Observation:** Expo/React Native app with own manifest, UI-registering entry (`registerRootComponent(App)`) and `expo export --platform android` build, outside workspace.

**Interpretation:** Frontend unit with own boundary: monolithic comparison version.

### 28. apps/repack; apps/repack/package.json:1-14; apps/repack/package.json:6; apps/repack/mprocs.yaml:4-10

**Observation:** Re.Pack workspace root without entry/build; `start` script starts three dev servers through `mprocs`.

**Interpretation:** Coordination root rather than frontend unit.

### 29. apps/repack-poc/host; apps/repack-poc/host/rspack.config.mjs:21; apps/repack-poc/host/index.js:9; apps/repack-poc/host/rspack.config.mjs:15-54; apps/repack-poc/host/react-native.config.js:2

**Observation:** React Native app with own manifest, `./index.js` entry calling `AppRegistry.registerComponent`, own Rspack/Re.Pack build.

**Interpretation:** Frontend unit with own boundary: spike host.

### 30. apps/repack-poc/remote; apps/repack-poc/remote/rspack.config.mjs:17; apps/repack-poc/remote/index.js:9; apps/repack-poc/remote/rspack.config.mjs:15-47; apps/repack-poc/remote/react-native.config.js:2

**Observation:** React Native app with own manifest, `./index.js` entry calling `AppRegistry.registerComponent`, own Rspack/Re.Pack build.

**Interpretation:** Frontend unit with own boundary: spike remote.

### 31. apps/repack/packages/check-in; apps/repack/packages/check-in/rspack.config.mjs:16; apps/repack/packages/check-in/index.js:9; apps/repack/packages/check-in/App.tsx:7-21; apps/repack/packages/check-in/rspack.config.mjs:14-51; apps/repack/packages/check-in/package.json:9

**Observation:** React Native mini-app with own manifest, UI-registering entry, standalone `App.tsx` with own `NavigationContainer` and Rspack/Re.Pack build, dev server port 9001.

**Interpretation:** Frontend unit with own boundary, capable of running alone.

### 32. apps/repack/packages/dashboard; apps/repack/packages/dashboard/rspack.config.mjs:16; apps/repack/packages/dashboard/index.js:9; apps/repack/packages/dashboard/rspack.config.mjs:14-49; apps/repack/packages/dashboard/package.json:9

**Observation:** React Native mini-app with own manifest, UI-registering entry and Rspack/Re.Pack build, dev server port 9002.

**Interpretation:** Frontend unit with own boundary.

### 33. apps/repack/packages/data; apps/repack/packages/data/package.json:1-17

**Observation:** Package `@mygym/data` with `main: ./src/index.ts`, no application entry.

**Interpretation:** Shared library rather than frontend unit.

### 34. apps/repack/packages/eslint-config; apps/repack/packages/eslint-config/package.json:1-18

**Observation:** Package `@mygym/eslint-config`, lint configuration.

**Interpretation:** Shared configuration rather than frontend unit.

### 35. apps/repack/packages/host; apps/repack/packages/host/rspack.config.mjs:22; apps/repack/packages/host/index.js:9; apps/repack/packages/host/rspack.config.mjs:16-58; apps/repack/packages/host/react-native.config.js:2

**Observation:** React Native app with own manifest, `./index.js` entry calling `AppRegistry.registerComponent`, own Rspack/Re.Pack build.

**Interpretation:** Frontend unit with own boundary: MyGym host.

### 36. apps/repack/packages/jest-config; apps/repack/packages/jest-config/package.json:1-14

**Observation:** Package `@mygym/jest-config`, test configuration.

**Interpretation:** Shared configuration rather than frontend unit.

### 37. apps/repack/packages/navigation; apps/repack/packages/navigation/package.json:1-15

**Observation:** Package `@mygym/navigation` with `main: ./src/index.ts`, no application entry.

**Interpretation:** Shared library rather than frontend unit.

### 38. apps/repack/packages/shared-deps; apps/repack/packages/shared-deps/package.json:1-7

**Observation:** Package `@mygym/shared-deps` with `main: sharedDeps.mjs`, imported by `rspack.config.mjs`.

**Interpretation:** Build helper rather than frontend unit; helper contents #12.

### 39. apps/repack/packages/store; apps/repack/packages/store/package.json:1-20

**Observation:** Package `@mygym/store` with `main: ./src/index.ts`, no application entry.

**Interpretation:** Shared library rather than frontend unit; channel within it is #26.

### 40. apps/repack/packages/theme; apps/repack/packages/theme/package.json:1-15

**Observation:** Package `@mygym/theme` with `main: ./src/index.ts`, no application entry.

**Interpretation:** Shared library rather than frontend unit.

### 41. apps/repack/packages/tsconfig; apps/repack/packages/tsconfig/package.json:1-8

**Observation:** Package `@mygym/tsconfig`, TypeScript configuration.

**Interpretation:** Shared configuration rather than frontend unit.

### 42. apps/repack/packages/ui; apps/repack/packages/ui/package.json:1-27

**Observation:** Package `@mygym/ui` with `main: ./src/index.ts`, no application entry.

**Interpretation:** Shared component library rather than frontend unit.

### 43. apps/repack/packages/utils; apps/repack/packages/utils/package.json:1-22

**Observation:** Package `@mygym/utils` with `main: ./src/index.ts`, no application entry.

**Interpretation:** Shared library rather than frontend unit.

### 44. apps/turborepo; apps/turborepo/package.json:1-19; apps/turborepo/package.json:4-9

**Observation:** Turborepo workspace root without entry/build; scripts delegate through `turbo run`.

**Interpretation:** Coordination root rather than frontend unit.

### 45. apps/turborepo/apps/mygym; apps/turborepo/apps/mygym/package.json:5; apps/turborepo/apps/mygym/src/index.ts:1-8; apps/turborepo/apps/mygym/package.json:11; apps/turborepo/apps/mygym/metro.config.js:1-18

**Observation:** Expo/React Native app with own manifest, UI-registering entry and `expo export --platform android` build through Metro.

**Interpretation:** Frontend unit with own boundary: Turborepo comparison version.

### 46. apps/turborepo/packages/data; apps/turborepo/packages/data/package.json:1-17

**Observation:** Package `@mygym/data` with `main: ./src/index.ts`, no application entry.

**Interpretation:** Shared library rather than frontend unit.

### 47. apps/turborepo/packages/eslint-config; apps/turborepo/packages/eslint-config/package.json:1-18

**Observation:** Package `@mygym/eslint-config`, lint configuration.

**Interpretation:** Shared configuration rather than frontend unit.

### 48. apps/turborepo/packages/feature-check-in; apps/turborepo/packages/feature-check-in/package.json:1-34; apps/turborepo/apps/mygym/src/navigation/RootNavigator.tsx:1

**Observation:** Package `@mygym/feature-check-in` without own entry, exporting `CheckInStack`, imported by app `mygym`.

**Interpretation:** Build-time integrated feature module rather than frontend unit.

### 49. apps/turborepo/packages/feature-dashboard; apps/turborepo/packages/feature-dashboard/package.json:1-32; apps/turborepo/apps/mygym/src/navigation/RootNavigator.tsx:2

**Observation:** Package `@mygym/feature-dashboard` without own entry, imported by app `mygym`.

**Interpretation:** Build-time integrated feature module rather than frontend unit.

### 50. apps/turborepo/packages/jest-config; apps/turborepo/packages/jest-config/package.json:1-14

**Observation:** Package `@mygym/jest-config`, test configuration.

**Interpretation:** Shared configuration rather than frontend unit.

### 51. apps/turborepo/packages/navigation; apps/turborepo/packages/navigation/package.json:1-15

**Observation:** Package `@mygym/navigation` with `main: ./src/index.ts`, no application entry.

**Interpretation:** Shared library rather than frontend unit.

### 52. apps/turborepo/packages/store; apps/turborepo/packages/store/package.json:1-20

**Observation:** Package `@mygym/store` with `main: ./src/index.ts`, no application entry.

**Interpretation:** Shared library rather than frontend unit.

### 53. apps/turborepo/packages/theme; apps/turborepo/packages/theme/package.json:1-15

**Observation:** Package `@mygym/theme` with `main: ./src/index.ts`, no application entry.

**Interpretation:** Shared library rather than frontend unit.

### 54. apps/turborepo/packages/tsconfig; apps/turborepo/packages/tsconfig/package.json:1-8

**Observation:** Package `@mygym/tsconfig`, TypeScript configuration.

**Interpretation:** Shared configuration rather than frontend unit.

### 55. apps/turborepo/packages/ui; apps/turborepo/packages/ui/package.json:1-27

**Observation:** Package `@mygym/ui` with `main: ./src/index.ts`, no application entry.

**Interpretation:** Shared component library rather than frontend unit.

### 56. apps/turborepo/packages/utils; apps/turborepo/packages/utils/package.json:1-22

**Observation:** Package `@mygym/utils` with `main: ./src/index.ts`, no application entry.

**Interpretation:** Shared library rather than frontend unit.

### 57. apps/repack-poc/host/App.tsx:26, 35; apps/repack-poc/host/rspack.config.mjs:41-46; apps/repack-poc/remote/rspack.config.mjs:37-40

**Observation:** Spike host imports/mounts `remote/HelloScreen`. Host-declared remote `remote` matches remote `name: 'remote'` and `exposes` of `./HelloScreen`.

**Interpretation:** Active Module Federation host → remote relationship.

### 58. apps/repack/packages/host/src/screens/CheckInTab.tsx:12, 21; apps/repack/packages/host/src/navigation/RootNavigator.tsx:52-53; apps/repack/packages/host/rspack.config.mjs:45-50; apps/repack/packages/check-in/rspack.config.mjs:42-46

**Observation:** Host imports/mounts `checkin/CheckInStack` on tab `FindGyms`. Remote `checkin` (port 9001) matches check-in `name: 'checkin'` and `exposes` of `./CheckInStack`, whose `start` uses port 9001.

**Interpretation:** Active Module Federation host → remote relationship.

### 59. apps/repack/packages/host/src/screens/DashboardTab.tsx:9, 16; apps/repack/packages/host/src/navigation/RootNavigator.tsx:52; apps/repack/packages/host/rspack.config.mjs:45-51; apps/repack/packages/dashboard/rspack.config.mjs:40-44

**Observation:** Host imports/mounts `dashboard/DashboardStack` on tab `Home`. Remote `dashboard` (port 9002) matches dashboard `name: 'dashboard'` and `exposes` of `./DashboardStack`, whose `start` uses port 9002.

**Interpretation:** Active Module Federation host → remote relationship.

### 60. apps/repack/packages/store/src/checkInStore.ts:33; apps/repack/packages/shared-deps/sharedDeps.mjs:53, 76; apps/repack/packages/host/rspack.config.mjs:54; apps/repack/packages/check-in/rspack.config.mjs:48; apps/repack/packages/dashboard/rspack.config.mjs:46

**Observation:** `useCheckInStore` singleton in `shared`, host eagerly providing/mini-apps consuming. Check-in writes through `startCheckIn`, reading history through `canCheckInToday`. Dashboard reads `isActive` to choose screen, writing through `endCheckIn` and `saveRating`.

**Interpretation:** Active bidirectional check-in/dashboard communication through shared reactive service; host only provides store.

### 61. apps/monolith/package.json:10; apps/monolith/app.json:2-29; scripts/measure.sh:75

**Observation:** Own build through `expo export --platform android`, measured by measurement script. Nothing packages/publishes export.

**Interpretation:** Own build boundary without observed deployment.

### 62. apps/repack-poc/host/rspack.config.mjs:15-54; apps/repack-poc/host/react-native.config.js:2

**Observation:** Own Rspack/Re.Pack configuration with remote external at `localhost:9001`; no `build` script/publication.

**Interpretation:** Own build boundary without observed deployment.

### 63. apps/repack-poc/remote/rspack.config.mjs:15-47; apps/repack-poc/remote/react-native.config.js:2

**Observation:** Own configuration generates container `remote.container.bundle`, served by dev server at `http://localhost:9001/${platform}/`; nothing publishes it.

**Interpretation:** Own build boundary served only in development.

### 64. apps/repack/packages/check-in/rspack.config.mjs:14-51; apps/repack/packages/check-in/react-native.config.js:2; scripts/measure-repack.sh:29-31, 41

**Observation:** Own configuration generates container `check-in.container.js.bundle`, dev server port 9001. Measurement script generates separate package production bundle in temporary folder. Nothing publishes container.

**Interpretation:** Own build boundary without observed deployment.

### 65. apps/repack/packages/dashboard/rspack.config.mjs:14-49; apps/repack/packages/dashboard/react-native.config.js:2; scripts/measure-repack.sh:29-31, 42

**Observation:** Own configuration generates container `dashboard.container.js.bundle`, dev server port 9002, and isolated production bundle in measurement script. Nothing publishes container.

**Interpretation:** Own build boundary without observed deployment.

### 66. apps/repack/packages/host/rspack.config.mjs:16-58; apps/repack/packages/host/react-native.config.js:2; scripts/measure-repack.sh:29-31, 40

**Observation:** Own configuration with two mini-apps as external remotes, isolated production bundle in measurement script. Dev-server port 8081 appears only in `mprocs.yaml` comment; no native project/publication configuration.

**Interpretation:** Own build boundary without observed deployment.

### 67. apps/turborepo/apps/mygym/package.json:11; apps/turborepo/package.json:5; apps/turborepo/turbo.json:5-8; scripts/measure.sh:100, 132

**Observation:** Own `expo export` build triggered from root through `turbo run build` (output `dist/**`); features enter same bundle as workspace packages. Nothing publishes it.

**Interpretation:** Own build boundary combining features into single bundle without observed deployment.

### 68. README.md:18-21

**Observation:** "`check-in` | **Produtor** de estado | ...; `dashboard` | **Consumidor** de estado | ..." English translation: "check-in is state producer; dashboard is state consumer."

**Interpretation:** Assigns each module primary state-exchange role. Claim corroborated.

### 69. README.md:23

**Observation:** "`check-in` e `dashboard` **nunca se importam diretamente** — comunicam-se apenas por
uma store compartilhada (`@mygym/store`, Zustand)". English translation: "check-in and dashboard never import each other directly; communicate only through shared Zustand store in named package."

**Interpretation:** Claims modules link only through store in all three versions. Claim corroborated.

### 70. README.md:31

**Observation:** "**Monolito** | baseline | Expo + Metro | Um projeto, sem modularização; fronteiras só
por convenção de pastas | `apps/monolith/`". English translation: "Monolith baseline: Expo and Metro, one project without modularization, boundaries only through folder convention at stated path."

**Interpretation:** Describes monolith as single unit. Claim corroborated.

### 71. README.md:32

**Observation:** "**Turborepo** | build-time | ... | Módulos em packages separados; fronteiras
enforçadas por `package.json`; **fundidos num bundle único no build** | `apps/turborepo/`". English translation: "Turborepo build-time: separate package modules, boundaries enforced by manifests, merged into single bundle during build at stated path."

**Interpretation:** Claims Turborepo integrates modules at build time. Claim corroborated.

### 72. README.md:33

**Observation:** "**Re.Pack** | runtime | Re.Pack + Module Federation | Host + mini-apps em **bundles
separados, carregados pela rede em runtime** | `apps/repack/`". English translation: "Re.Pack runtime: Re.Pack and Module Federation, host and mini-apps in separate bundles loaded over network at runtime, at stated path."

**Interpretation:** Claims Re.Pack composes host/mini-apps at runtime. Claim corroborated.

### 73. README.md:33

**Observation:** "...; deploy independente / OTA". English translation: "Independent deployment / OTA."

**Interpretation:** Claims independent mini-app deployment without snapshot artifact. Claim uncorroborated.

### 74. README.md:57-58,64

**Observation:** "Module Federation pressupõe controle total do bundler (Rspack), incompatível com o
fluxo gerenciado do Expo" — por isso o Re.Pack roda em "React Native CLI puro (bare)". English translation: "Module Federation requires full bundler control (Rspack), incompatible with managed Expo flow; hence Re.Pack runs through bare React Native CLI."

**Interpretation:** Links federation technology to toolchain without Expo. Claim corroborated.

### 75. README.md:85

**Observation:** "Sustentada pelo modo standalone de cada mini-app...". English translation: "Supported by each mini-app’s standalone mode."

**Interpretation:** Claims each mini-app runs alone. Claim corroborated.

### 76. README.md:85

**Observation:** "...e pelo **teste de resiliência** (derrubar um remote → `ErrorBoundary` isola o
erro numa aba, sem crashar o app)". English translation: "And resilience test: stopping a remote isolates error in its tab through the named boundary without crashing app."

**Interpretation:** Claims remote failure isolated to its tab. Claim corroborated.

### 77. README.md:94

**Observation:** "No build-time o singleton da store é automático... No runtime ele precisa ser
**declarado** (`shared: { singleton: true }`); omitir fragmenta o estado silenciosamente". English translation: "At build-time store singleton is automatic; at runtime must be declared with shown shared singleton configuration; omission silently fragments state."

**Interpretation:** Claims single state depends on `shared` declaration. Claim corroborated.

### 78. README.md:95

**Observation:** "Libs de **view nativa** precisam ser singleton por corretude (senão o app crasha ao
registrar a view duas vezes)". English translation: "Native-view libraries must be singletons for correctness, otherwise registering a view twice crashes app."

**Interpretation:** Justifies library inclusion in `shared`. Claim corroborated.

### 79. README.md:95

**Observation:** "libs **comuns e pesadas** precisam ser singleton por eficiência (senão cada remote
re-baixa a lib inteira — descoberto medindo os chunks: um esquecimento inflava o download em
~10 MB)". English translation: "Common heavy libraries must be singleton for efficiency, otherwise each remote downloads whole library again; discovered measuring chunks, omission added roughly ten megabytes."

**Interpretation:** Claims correction (heavy library in `shared`), present in helper, and measurement without artifact. Claim partially corroborated.

### 80. apps/repack-poc/README.md:7

**Observation:** "no Network tab só aparece o **manifest** (vem por `fetch`); o **bundle do remote em
si não aparece** porque é baixado pelo `ScriptManager` do Re.Pack via módulo nativo, fora da camada
JS de rede". English translation: "Only manifest appears in Network tab through fetch; remote bundle itself does not appear because Re.Pack ScriptManager downloads it through native module outside JS networking layer."

**Interpretation:** Describes host remote acquisition. Manifest confirmed in configuration; `ScriptManager` download lacks artifact. Claim partially corroborated.

**Note:** Review 3.4.7 says screenshot `poc-evidence.png` absent from snapshot; 3.4.8 shows present in commit, removed only by acquisition normalization (#100). Screenshot does not support `ScriptManager` part through configuration artifact, leaving row classification unchanged.

### 81. apps/repack-poc/README.md:17-20

**Observation:** "`host/` | Consumidor (shell) | ... Importa a tela do remote via `React.lazy`...
`remote/` | Produtor | ... **expõe** `HelloScreen` como um bundle federado". English translation: "Host is consumer/shell importing remote screen through React lazy; remote is producer exposing HelloScreen as federated bundle."

**Interpretation:** Describes spike host/remote roles. Claim corroborated.

### 82. apps/repack-poc/README.md:20

**Observation:** "Não roda sozinho na spike — só serve o bundle." English translation: "Does not run alone in spike, only serves bundle."

**Interpretation:** Reports spike remote only served bundle. Snapshot shows development-only serving but also own entry; reported use lacks artifact. Claim partially corroborated.

### 83. apps/repack-poc/README.md:58

**Observation:** "**`eager`: `true` no host, `false` no remote.** O host carrega react/react-native de
imediato (fornecedor); o remote os consome do host... Garante uma única instância (`singleton`)". English translation: "Eager true in host, false in remote. Host loads React/React Native immediately as provider; remote consumes host versions, ensuring singleton instance."

**Interpretation:** Describes `eager` division between spike provider/consumer. Claim corroborated.

### 84. apps/repack-poc/README.md:61

**Observation:** "O `ErrorBoundary` não é opcional: é ele que evita a tela branca quando o remote está
fora do ar". English translation: "ErrorBoundary is mandatory to prevent blank screen when remote unavailable."

**Interpretation:** Claims spike host isolates remote failure. Claim corroborated.

### 85. apps/repack/ARCHITECTURE.md:21-50

**Observation:** "Um package merece ser **mini-app (remote)** se responde **sim** a pelo menos uma [das
três perguntas: deploy independente, time/repo isolado, roda sozinho]... Resultado: 2 mini-apps · 6
shared singletons · 3 configs de build · 1 host". English translation: "A package deserves mini-app/remote status if at least one of three questions is yes: independent deployment, isolated team/repository, standalone execution. Result: two mini-apps, six shared singletons, three build configurations, one host."

**Interpretation:** Gives criterion distinguishing mini-apps/shared packages and division result. Claim corroborated.

### 86. apps/repack/ARCHITECTURE.md:128

**Observation:** "há **um único `NavigationContainer`**, no host". English translation: "One NavigationContainer in host."

**Interpretation:** Claims mini-app navigation nests in host container. Claim corroborated.

### 87. apps/repack/ARCHITECTURE.md:129

**Observation:** "`@react-navigation/*` é **shared singleton** — host e remotes compartilham a mesma
instância de navegação ao aninhar". English translation: "React navigation packages are shared singletons; host/remotes share same navigation instance when nesting."

**Interpretation:** Claims navigation library shared singleton. Claim corroborated.

### 88. apps/repack/ARCHITECTURE.md:130

**Observation:** "os tipos de rota vêm de `@mygym/navigation` (shared)". English translation: "Route types originate in named shared navigation package."

**Interpretation:** Claims route types from shared package. Claim corroborated.

### 89. apps/repack/ARCHITECTURE.md:192,194

**Observation:** "O host tem `remotes` (consome) + `shared` eager; cada mini-app tem `exposes`
(publica) + `shared` não-eager." / "**`eager: true` no host, `false` nos mini-apps** — o host embute
os singletons no boot (fornecedor); os mini-apps consomem os do host." English translation: "Host has consuming remotes plus eager sharing; each mini-app has publishing exposures and non-eager sharing. Eager true in host and false in mini-apps: host embeds singletons at boot as provider; mini-apps consume host versions."

**Interpretation:** Describes host/mini-app roles in federation configuration. Claim corroborated.

### 90. apps/repack/ARCHITECTURE.md:201

**Observation:** "**Fonte única de versões via `pnpm catalog`**". English translation: "Single source of versions through pnpm catalog."

**Interpretation:** Claims catalog sole shared-version source. `react`, `react-native` and `phosphor-react-native` in `shared` but outside catalog, versions written per package. Claim contradicted.

### 91. apps/repack/ARCHITECTURE.md:201

**Observation:** "o helper faz a ponte: **lê a versão instalada** de cada lib (do `package.json` em
`node_modules`) e a entrega ao MF como `requiredVersion`. Resultado: ... verificação do MF
funcionando". English translation: "Helper bridges by reading each installed library version from manifest in node_modules, supplying to Module Federation as requiredVersion; resulting federation checking works."

**Interpretation:** Describes version delivery to host/remote `shared`. Claim corroborated.

### 92. apps/repack/ARCHITECTURE.md:230

**Observation:** "Os remotes entregam **só JS**; rodam dentro do runtime nativo do host, que é o único
binário instalado." English translation: "Remotes deliver only JavaScript, running inside host native runtime, the only installed binary."

**Interpretation:** Remote JS containers confirmed; host as sole binary lacks artifact. Claim partially corroborated.

### 93. apps/repack/ARCHITECTURE.md:237

**Observation:** "**Metade nativa → basta estar no binário do host.** ... por isso o `host/package.json`
declara toda dependência nativa que qualquer remote use". English translation: "Native half only needs to exist in host binary; hence host manifest declares every native dependency used by any remote."

**Interpretation:** Claims remote native dependencies declared in host. Claim corroborated.

### 94. apps/repack/ARCHITECTURE.md:239

**Observation:** "adicionar uma lib nativa nova num remote **exige rebuild + release do host** (não dá
OTA)". English translation: "Adding new native library to remote requires host rebuild and release; OTA unavailable."

**Interpretation:** Reports delivery-cycle consequence absent from snapshot. Claim uncorroborated.

### 95. apps/repack/ARCHITECTURE.md:273-277

**Observation:** "**ScriptManager + `setStorage(AsyncStorage)`**... foi **deferido**...
**CodeSigningPlugin**... documentado como obrigatório em produção real, desligado neste PoC". English translation: "ScriptManager plus AsyncStorage persistence deferred; CodeSigningPlugin documented as mandatory for actual production but disabled in this proof of concept."

**Interpretation:** Claims bundle cache/signing unconfigured. No snapshot configuration has them. Claim corroborated.

### 96. apps/repack/ARCHITECTURE.md:324

**Observation:** "cada mini-app builda independentemente (rebuildar check-in não toca host/dashboard)". English translation: "Each mini-app builds independently; rebuilding check-in does not touch host/dashboard."

**Interpretation:** Claims isolated per-mini-app build. Claim corroborated.

### 97. apps/repack/ARCHITECTURE.md:334

**Observation:** "o build standalone do Re.Pack não emite o container federado, só o dev server o
produz". English translation: "Re.Pack standalone build does not emit federated container; only dev server produces it."

**Interpretation:** Describes unrecorded bundler behavior. Claim uncorroborated.

### 98. apps/turborepo/ARCHITECTURE.md:267

**Observation:** "Complexidade de config | ... | Alta (webpack + MF + chunks + shared)". English translation: "Configuration complexity: high, webpack plus Module Federation, chunks and sharing."

**Interpretation:** Names Re.Pack technology as webpack, artifacts using Rspack. Claim contradicted.

### 99. 5097f5f 2026-07-09 (apps/repack/packages/shared-deps/sharedDeps.mjs, apps/repack/ARCHITECTURE.md); e5a77a1 2026-07-09 (scripts/measure-repack.sh, scripts/results/repack_build_isolated.csv)

**Observation:** `5097f5f` ("phosphor no shared", English translation: "phosphor in shared") changes only helper/`ARCHITECTURE.md`; earlier helper version absent from clone. No commit records chunk measurement; `e5a77a1` measurements concern isolated build.

**Interpretation:** Correction is separate step, but prior state/numbers unavailable. Past-only question: snapshot has `phosphor-react-native` in `shared`.

### 100. 79cf054 2026-06-29 (apps/repack-poc/poc-evidence.png, apps/repack-poc/README.md)

**Observation:** Screenshot arrives with citing README in same commit, never removed, present in snapshot commit tree. Normalized snapshot copy removed it under `binaries` preset. No spike commit configures `ScriptManager`.

**Interpretation:** Screenshot absence arises from acquisition rather than repository. Bundle-downloading layer remains execution behavior. Point clarified regarding screenshot.

### 101. 22fcdfc 2026-06-24 (apps/repack-poc/remote/App.tsx, apps/repack-poc/remote/index.js, apps/repack-poc/remote/package.json); 79cf054 2026-06-29 (apps/repack-poc/README.md, apps/repack-poc/remote/rspack.config.mjs)

**Observation:** Remote entry with template `App` originates at project creation, unchanged through snapshot; README sentence written later alongside `HelloScreen`.

**Interpretation:** Own entry is template remnant, sentence reporting spike use. Point clarified.

### 102. 16317fb 2026-06-29 (apps/repack/pnpm-workspace.yaml); 3d31f97 2026-07-04 (apps/repack/packages/host/package.json); d505d6c 2026-07-09 (apps/repack/packages/check-in/package.json, apps/repack/packages/dashboard/package.json); 8232ce1 2026-07-09 (apps/repack/ARCHITECTURE.md); 5097f5f 2026-07-09 (apps/repack/packages/shared-deps/sharedDeps.mjs)

**Observation:** Catalog/manifests reach snapshot form before `ARCHITECTURE.md` creation; `phosphor-react-native` enters `shared` later without catalog inclusion.

**Interpretation:** Discrepancy is no observable earlier-stage remnant. Point clarified for available versions.

### 103. .gitignore:18-19; apps/repack/README.md:83

**Observation:** Root `.gitignore` ignores `ios/` and `android/`, README saying `ios/` unversioned. No `*/ios/*` or `*/android/*` path appears in history.

**Interpretation:** Native-project absence explained by snapshot itself; host as sole binary still lacks artifact. Point resolved by snapshot.

### 104. 0d870b5 2026-05-23 (apps/turborepo/ARCHITECTURE.md); 22fcdfc 2026-06-24 (apps/repack-poc/host/rspack.config.mjs, apps/repack-poc/remote/rspack.config.mjs)

**Observation:** Turborepo `ARCHITECTURE.md` created month before first Re.Pack file, never changed; first Re.Pack already uses `rspack.config.mjs`, no `*webpack*` file in any commit.

**Interpretation:** Line written before implementation, never revised. Point clarified.

## Classification

| # | Origin | Dimension | Type | Approach | Evidence | Strength | Relationships |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.2 (apps/repack-poc/host/package.json:13) | 1 technology | manifest | module-federation | technological | weak | declares #7 |
| 2 | 3.4.2 (apps/repack-poc/remote/package.json:13) | 1 technology | manifest | module-federation | technological | weak | declares #8 |
| 3 | 3.4.2 (apps/repack/packages/check-in/package.json:13) | 1 technology | manifest | module-federation | technological | weak | declares #9 |
| 4 | 3.4.2 (apps/repack/packages/dashboard/package.json:13) | 1 technology | manifest | module-federation | technological | weak | declares #10 |
| 5 | 3.4.2 (apps/repack/packages/host/package.json:13) | 1 technology | manifest | module-federation | technological | weak | declares #11 |
| 6 | 3.4.2 (apps/turborepo/package.json:12) | 1 technology | manifest | — | context | weak | declares apps/turborepo/turbo.json:4-28 |
| 7 | 3.4.2 (apps/repack-poc/host/package.json:13, Evidence); 3.4.3 (apps/repack-poc/host, Markers, Entry and Build); 3.4.4 (apps/repack-poc/host/App.tsx:26, Observation); 3.4.5 #1 (Configuration); 3.4.6 #2 (Artifacts); 3.4.6 #3 (Where served); 3.4.7 #13, #16 (Evidence) | 2 configuration | configuration | module-federation | architectural | strong | configures #29; configures #57 |
| 8 | 3.4.2 (apps/repack-poc/remote/package.json:13, Evidence); 3.4.3 (apps/repack-poc/remote, Markers, Entry and Build); 3.4.4 (apps/repack-poc/host/App.tsx:26, Observation); 3.4.5 #1 (Configuration); 3.4.6 #3 (Artifacts); 3.4.7 #15, #16 (Evidence) | 2 configuration | configuration | module-federation | technological | moderate | configures #30; configures #57 |
| 9 | 3.4.2 (apps/repack/packages/check-in/package.json:13, Evidence); 3.4.3 (apps/repack/packages/check-in, Markers, Entry and Build); 3.4.4 (apps/repack/packages/host/src/screens/CheckInTab.tsx:12 and apps/repack/packages/store/src/checkInStore.ts:33, Observation); 3.4.5 #2, #4 (Configuration); 3.4.6 #4 (Artifacts); 3.4.7 #19, #22, #24 (Evidence) | 2 configuration | configuration | module-federation | technological | moderate | configures #31; configures #58; configures #60 |
| 10 | 3.4.2 (apps/repack/packages/dashboard/package.json:13, Evidence); 3.4.3 (apps/repack/packages/dashboard, Markers, Entry and Build); 3.4.4 (apps/repack/packages/host/src/screens/DashboardTab.tsx:9 and apps/repack/packages/store/src/checkInStore.ts:33, Observation); 3.4.5 #3, #4 (Configuration); 3.4.6 #5 (Artifacts); 3.4.7 #19, #22, #24 (Evidence) | 2 configuration | configuration | module-federation | technological | moderate | configures #32; configures #59; configures #60 |
| 11 | 3.4.2 (apps/repack/packages/host/package.json:13, Evidence); 3.4.3 (apps/repack/packages/host, Markers, Entry and Build); 3.4.4 (apps/repack/packages/host/src/screens/CheckInTab.tsx:12, DashboardTab.tsx:9 and apps/repack/packages/store/src/checkInStore.ts:33, Observation); 3.4.5 #2, #3, #4 (Configuration); 3.4.6 #4, #5 (Where served); 3.4.6 #6 (Artifacts); 3.4.7 #22, #24, #31 (Evidence) | 2 configuration | configuration | module-federation | architectural | strong | configures #35; configures #58; configures #59; configures #60 |
| 12 | 3.4.4 (apps/repack/packages/store/src/checkInStore.ts:33, Observation); 3.4.5 #4 (Configuration); 3.4.7 #10, #11, #12, #20, #21, #22, #23, #24 (Evidence) | 2 configuration | configuration | module-federation | technological | moderate | configures #31; configures #32; configures #35; configures #60 |
| 13 | 3.4.4 (apps/repack-poc/host/App.tsx:26) | 3 code | source code | module-federation | architectural | strong | implements #57 |
| 14 | 3.4.4 (apps/repack/packages/host/src/screens/CheckInTab.tsx:12) | 3 code | source code | module-federation | architectural | strong | implements #58 |
| 15 | 3.4.4 (apps/repack/packages/host/src/screens/DashboardTab.tsx:9) | 3 code | source code | module-federation | architectural | strong | implements #59 |
| 16 | 3.4.4 (UX/confirma_o_de_check_in/code.html:15) | 3 code | source code | — | context | weak | — |
| 17 | 3.4.4 (UX/dashboard_check_in_ativo_4/code.html:7) | 3 code | source code | — | context | weak | — |
| 18 | 3.4.4 (UX/dashboard_p_s_treino_2/code.html:7) | 3 code | source code | — | context | weak | — |
| 19 | 3.4.4 (UX/dashboard_p_s_treino_menu_unificado/code.html:7) | 3 code | source code | — | context | weak | — |
| 20 | 3.4.4 (UX/finaliza_o_de_treino/code.html:7) | 3 code | source code | — | context | weak | — |
| 21 | 3.4.4 (UX/listagem_de_academias/code.html:7) | 3 code | source code | — | context | weak | — |
| 22 | 3.4.4 (apps/repack-poc/host/App.tsx:35) | 3 code | source code | module-federation | architectural | moderate | implements #57 |
| 23 | 3.4.4 (apps/repack/packages/host/src/screens/CheckInTab.tsx:21) | 3 code | source code | module-federation | architectural | moderate | implements #58 |
| 24 | 3.4.4 (apps/repack/packages/host/src/screens/DashboardTab.tsx:16) | 3 code | source code | module-federation | architectural | moderate | implements #59 |
| 25 | 3.4.4 (apps/repack/packages/host/src/navigation/RootNavigator.tsx:52) | 3 code | source code | module-federation | architectural | strong | implements #58; implements #59 |
| 26 | 3.4.4 (apps/repack/packages/store/src/checkInStore.ts:33) | 3 code | source code | events | architectural | moderate | implements #60 |
| 27 | 3.4.3 (apps/monolith) | 4 structure | directory | — | architectural | moderate | — |
| 28 | 3.4.3 (apps/repack) | 4 structure | directory | — | context | weak | — |
| 29 | 3.4.3 (apps/repack-poc/host) | 4 structure | directory | — | architectural | moderate | — |
| 30 | 3.4.3 (apps/repack-poc/remote) | 4 structure | directory | — | architectural | moderate | — |
| 31 | 3.4.3 (apps/repack/packages/check-in) | 4 structure | directory | — | architectural | moderate | — |
| 32 | 3.4.3 (apps/repack/packages/dashboard) | 4 structure | directory | — | architectural | moderate | — |
| 33 | 3.4.3 (apps/repack/packages/data) | 4 structure | directory | — | context | weak | — |
| 34 | 3.4.3 (apps/repack/packages/eslint-config) | 4 structure | directory | — | context | weak | — |
| 35 | 3.4.3 (apps/repack/packages/host) | 4 structure | directory | — | architectural | moderate | — |
| 36 | 3.4.3 (apps/repack/packages/jest-config) | 4 structure | directory | — | context | weak | — |
| 37 | 3.4.3 (apps/repack/packages/navigation) | 4 structure | directory | — | context | weak | — |
| 38 | 3.4.3 (apps/repack/packages/shared-deps) | 4 structure | directory | — | context | weak | — |
| 39 | 3.4.3 (apps/repack/packages/store) | 4 structure | directory | — | context | weak | — |
| 40 | 3.4.3 (apps/repack/packages/theme) | 4 structure | directory | — | context | weak | — |
| 41 | 3.4.3 (apps/repack/packages/tsconfig) | 4 structure | directory | — | context | weak | — |
| 42 | 3.4.3 (apps/repack/packages/ui) | 4 structure | directory | — | context | weak | — |
| 43 | 3.4.3 (apps/repack/packages/utils) | 4 structure | directory | — | context | weak | — |
| 44 | 3.4.3 (apps/turborepo) | 4 structure | directory | — | context | weak | — |
| 45 | 3.4.3 (apps/turborepo/apps/mygym) | 4 structure | directory | — | architectural | moderate | — |
| 46 | 3.4.3 (apps/turborepo/packages/data) | 4 structure | directory | — | context | weak | — |
| 47 | 3.4.3 (apps/turborepo/packages/eslint-config) | 4 structure | directory | — | context | weak | — |
| 48 | 3.4.3 (apps/turborepo/packages/feature-check-in) | 4 structure | directory | — | context | weak | — |
| 49 | 3.4.3 (apps/turborepo/packages/feature-dashboard) | 4 structure | directory | — | context | weak | — |
| 50 | 3.4.3 (apps/turborepo/packages/jest-config) | 4 structure | directory | — | context | weak | — |
| 51 | 3.4.3 (apps/turborepo/packages/navigation) | 4 structure | directory | — | context | weak | — |
| 52 | 3.4.3 (apps/turborepo/packages/store) | 4 structure | directory | — | context | weak | — |
| 53 | 3.4.3 (apps/turborepo/packages/theme) | 4 structure | directory | — | context | weak | — |
| 54 | 3.4.3 (apps/turborepo/packages/tsconfig) | 4 structure | directory | — | context | weak | — |
| 55 | 3.4.3 (apps/turborepo/packages/ui) | 4 structure | directory | — | context | weak | — |
| 56 | 3.4.3 (apps/turborepo/packages/utils) | 4 structure | directory | — | context | weak | — |
| 57 | 3.4.5 #1 | 5 composition | source code | module-federation | architectural | strong | links #29; links #30 |
| 58 | 3.4.5 #2 | 5 composition | source code | module-federation | architectural | strong | links #35; links #31 |
| 59 | 3.4.5 #3 | 5 composition | source code | module-federation | architectural | strong | links #35; links #32 |
| 60 | 3.4.5 #4 | 5 composition | source code | events | architectural | strong | links #31; links #32 |
| 61 | 3.4.6 #1 | 6 build-deploy | manifest | — | architectural | moderate | publishes #27 |
| 62 | 3.4.6 #2 | 6 build-deploy | configuration | — | architectural | moderate | publishes #29 |
| 63 | 3.4.6 #3 | 6 build-deploy | configuration | — | architectural | moderate | publishes #30 |
| 64 | 3.4.6 #4 | 6 build-deploy | configuration | — | architectural | moderate | publishes #31 |
| 65 | 3.4.6 #5 | 6 build-deploy | configuration | — | architectural | moderate | publishes #32 |
| 66 | 3.4.6 #6 | 6 build-deploy | configuration | — | architectural | moderate | publishes #35 |
| 67 | 3.4.6 #7 | 6 build-deploy | manifest | — | architectural | moderate | publishes #45 |
| 68 | 3.4.7 #1 | 7 documentation | documentation | — | architectural | weak | corroborates #60 |
| 69 | 3.4.7 #2 | 7 documentation | documentation | events | architectural | weak | corroborates #31; corroborates #32; corroborates #48; corroborates #49; corroborates #60 |
| 70 | 3.4.7 #3 | 7 documentation | documentation | — | architectural | weak | corroborates #27 |
| 71 | 3.4.7 #4 | 7 documentation | documentation | — | architectural | weak | corroborates #45; corroborates #48; corroborates #49; corroborates #67 |
| 72 | 3.4.7 #5 | 7 documentation | documentation | module-federation | architectural | weak | corroborates #58; corroborates #59; corroborates #14; corroborates #15 |
| 73 | 3.4.7 #6 | 7 documentation | documentation | — | architectural | weak | — |
| 74 | 3.4.7 #7 | 7 documentation | documentation | module-federation | technological | weak | corroborates #62; corroborates #64; corroborates #65; corroborates #66; corroborates apps/repack/packages/host/app.json:1-4 |
| 75 | 3.4.7 #8 | 7 documentation | documentation | — | architectural | weak | corroborates #31; corroborates apps/repack/packages/dashboard/App.tsx:1-22 |
| 76 | 3.4.7 #9 | 7 documentation | documentation | — | architectural | weak | corroborates #23; corroborates #24 |
| 77 | 3.4.7 #10 | 7 documentation | documentation | module-federation | technological | weak | corroborates #12; corroborates #60 |
| 78 | 3.4.7 #11 | 7 documentation | documentation | module-federation | technological | weak | corroborates #12 |
| 79 | 3.4.7 #12 | 7 documentation | documentation | module-federation | technological | weak | partially corroborates #12 |
| 80 | 3.4.7 #13 | 7 documentation | documentation | module-federation | technological | weak | partially corroborates #7; partially corroborates #57 |
| 81 | 3.4.7 #14 | 7 documentation | documentation | module-federation | architectural | weak | corroborates #57; corroborates #13 |
| 82 | 3.4.7 #15 | 7 documentation | documentation | — | architectural | weak | partially corroborates #63 |
| 83 | 3.4.7 #16 | 7 documentation | documentation | module-federation | technological | weak | corroborates #7; corroborates #8 |
| 84 | 3.4.7 #17 | 7 documentation | documentation | — | architectural | weak | corroborates #22 |
| 85 | 3.4.7 #18 | 7 documentation | documentation | — | architectural | weak | corroborates #31; corroborates #32; corroborates #33; corroborates #37; corroborates #39; corroborates #40; corroborates #42; corroborates #43; corroborates #12 |
| 86 | 3.4.7 #19 | 7 documentation | documentation | — | architectural | weak | corroborates apps/repack/packages/host/App.tsx:19-21; corroborates #9; corroborates #10; corroborates #58; corroborates #59 |
| 87 | 3.4.7 #20 | 7 documentation | documentation | module-federation | technological | weak | corroborates #12; corroborates #25 |
| 88 | 3.4.7 #21 | 7 documentation | documentation | module-federation | technological | weak | corroborates apps/repack/packages/navigation/src/params.ts:1-14; corroborates #12 |
| 89 | 3.4.7 #22 | 7 documentation | documentation | module-federation | architectural | weak | corroborates #11; corroborates #9; corroborates #10; corroborates #12; corroborates #60 |
| 90 | 3.4.7 #23 | 7 documentation | documentation | — | technological | weak | contradicts apps/repack/pnpm-workspace.yaml:7-17; contradicts apps/repack/packages/host/package.json:25-27; contradicts apps/repack/packages/check-in/package.json:25,27-28; contradicts apps/repack/packages/dashboard/package.json:24-26 |
| 91 | 3.4.7 #24 | 7 documentation | documentation | module-federation | technological | weak | corroborates #12; corroborates #9; corroborates #10; corroborates #11 |
| 92 | 3.4.7 #25 | 7 documentation | documentation | — | architectural | weak | partially corroborates #64; partially corroborates #65; partially corroborates #58; partially corroborates #59 |
| 93 | 3.4.7 #26 | 7 documentation | documentation | — | architectural | weak | corroborates apps/repack/packages/host/package.json:20,28-31 |
| 94 | 3.4.7 #27 | 7 documentation | documentation | — | architectural | weak | — |
| 95 | 3.4.7 #28 | 7 documentation | documentation | — | technological | weak | corroborates #9; corroborates #10; corroborates #11 |
| 96 | 3.4.7 #29 | 7 documentation | documentation | — | architectural | weak | corroborates #64; corroborates #65; corroborates #66; corroborates scripts/measure-repack.sh:3-5 |
| 97 | 3.4.7 #30 | 7 documentation | documentation | module-federation | technological | weak | — |
| 98 | 3.4.7 #31 | 7 documentation | documentation | module-federation | technological | weak | contradicts #11 |
| 99 | 3.4.8 #1 | 8 history | history | module-federation | technological | weak | explains #79 |
| 100 | 3.4.8 #2 | 8 history | history | — | context | weak | explains #80 |
| 101 | 3.4.8 #3 | 8 history | history | — | architectural | weak | explains #82; explains #30 |
| 102 | 3.4.8 #4 | 8 history | history | — | technological | weak | explains #90 |
| 103 | 3.4.8 #5 | 8 history | history | — | architectural | weak | explains #92 |
| 104 | 3.4.8 #6 | 8 history | history | module-federation | technological | weak | explains #98 |

## Summary

Observations: 104. Dimensions (technology: 6, configuration: 6, code: 14, structure: 30, composition: 4, build-deploy: 7, documentation: 31, history: 6). Strength (strong: 10, moderate: 22, weak: 72, ambiguous: 0). Evidence (technological: 25, architectural: 48, context: 31).

