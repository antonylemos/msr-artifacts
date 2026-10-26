---
schema: 1
id: 1253620135
full_name: victorlmneves/_nuxt-monorepo-mfe-platform
commit: 84ffc2429b311b3c7565ffd35de4de48dafd5929
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

# 096 — victorlmneves/_nuxt-monorepo-mfe-platform

## Repository overview

pnpm monorepo with a Nuxt 3 shell and four Vue webpack remotes, two Vue 2 (admin and checkout) and two Vue 3 (dashboard and profile). Each has its own manifest, entry and build (#55 through #59, #70 through #74). No dependency declares an MFE technology: five dependency review rows are internal package `@mfe/shared`, detected by name (#1 through #5), and `turbo` remains ambiguous because only `package.json` scripts invoke it (#6). Chain therefore starts with configuration:
- **Configuration:** each remote configures `ModuleFederationPlugin` with its own name, `remoteEntry.js`, exposed `./App` and `vue` (and, in Vue 3, `vuetify`) as `singleton` (#7 through #10).
- **Host code:** shell has no plugin. Registry in `packages/shared` names four remotes, with route, `remoteEntry.js` URL, container name and exposed module (#53). Catch-all page selects descriptor by route and invokes mounting (#52). Loader injects script (#49), reads container, calls `init({})` and `get('./App')` (#15, #16), and calls `mount`/`unmount` (#45, #46).
- **Remote code:** exposed `bootstrap.js` exports `mount` and `unmount` (#17 through #24, repeated through pattern overlap in #25, #28, #30, #33, #35, #38, #40, #43).
- **Relationships:** four active host → remote relationships through Module Federation result (#62 through #65). Four window-event relationships from shell to each remote are added (#66 through #69), using `packages/shared` bus (#50, #51).

Signals that are not composition: `import('./bootstrap')` and `mount` call in each `src/index.js` execute each remote standalone (#11 through #14, #29, #34, #39, #44); `.$mount(el)` and `app.mount(el)` are internal Vue rendering (#27, #32, #37, #42); `onAuthLogout(() => unmount(el))` unmounts same unit upon event reception (#26, #31, #36, #41); and two `RemoteMount` interface lines are type declarations (#47, #48). Root, `packages/shared` and `scripts` are not units (#54, #60, #61).

Five builds are separate, but snapshot has no deployment (#70 through #74): all addresses are `localhost`, and remote `publicPath` remains fixed at `http://localhost:300x/` in production too (#7 through #10, #106).

Documentation matches artifacts in 31 of 35 claims. Four contradictions concern what is called shared: header, used only by shell (#80, #90), and `singleton` scope, which neither isolates Vuetify 2 (#87) nor supplies shell Vue 3 to remotes, because shell initializes each container with empty scope (#89). Loader comment itself confirms empty scope (#104). History does not resolve first two uncertainties: application code only appears as files in snapshot commit, and earlier contents in a gitlink are absent from clone (#111, #112). It clarifies that title "only shared thing" always coexisted with shared package (#113) and `turbo` never had another invocation (#110).

## Observations

### 1. apps/mfe-vue2-admin/package.json:13; apps/mfe-vue2-admin/src/bootstrap.js:3, 27-30

**Observation:** `@mfe/shared` (`workspace:*`) is declared in `dependencies`. `bootstrap.js` imports `onAuthChanged` and `onAuthLogout` from `@mfe/shared/auth` and uses them in `mount`.

**Interpretation:** Internal workspace package, detected by technology `mfe-term` through its name. Declaration alone does not show an MFE mechanism; usage is in code.

### 2. apps/mfe-vue2-checkout/package.json:13; apps/mfe-vue2-checkout/src/bootstrap.js:3, 35-38

**Observation:** `@mfe/shared` (`workspace:*`) is declared in `dependencies`. `bootstrap.js` imports `onAuthChanged` and `onAuthLogout` from `@mfe/shared/auth` and uses them in `mount`.

**Interpretation:** Internal workspace package, detected by name. Declaration alone does not show an MFE mechanism.

### 3. apps/mfe-vue3-dashboard/package.json:14; apps/mfe-vue3-dashboard/src/bootstrap.js:8, 29-30

**Observation:** `@mfe/shared` (`workspace:*`) is declared in `dependencies`. `bootstrap.js` imports `onAuthChanged` and `onAuthLogout` from `@mfe/shared/auth` and uses them in `mount`.

**Interpretation:** Internal workspace package, detected by name. Declaration alone does not show an MFE mechanism.

### 4. apps/mfe-vue3-profile/package.json:14; apps/mfe-vue3-profile/src/bootstrap.js:8, 33-36

**Observation:** `@mfe/shared` (`workspace:*`) is declared in `dependencies`. `bootstrap.js` imports `onAuthChanged` and `onAuthLogout` from `@mfe/shared/auth` and uses them in `mount`.

**Interpretation:** Internal workspace package, detected by name. Declaration alone does not show an MFE mechanism.

### 5. apps/shell/package.json:13; apps/shell/pages/app/[...mfe].vue:30, 40-41; apps/shell/stores/auth.ts:3

**Observation:** `@mfe/shared` (`workspace:*`) is declared in `dependencies`. Catch-all page imports `MFE_REGISTRY` and uses it to resolve route; authentication store imports `broadcastLogin` and `broadcastLogout` from `@mfe/shared/auth`.

**Interpretation:** Internal workspace package, detected by name. Shell uses its remote registry and event sending, implemented in code.

### 6. package.json:34; turbo.json:3-18

**Observation:** `turbo` (`^2.0.0`) is declared in `devDependencies`. `turbo.json` defines tasks `dev`, `build`, `lint` and `clean`. Sole `turbo` invocation is in root `package.json` scripts, without CI workflow or automation script invoking it.

**Interpretation:** Monorepo tool rather than MFE technology. Dependency review rule leaves usage undetermined: Turborepo may be actual build orchestration or just a script shortcut.

### 7. apps/mfe-vue2-admin/webpack.config.js:8-79

**Observation:** `ModuleFederationPlugin` with `name: 'mfe_admin'`, `filename: 'remoteEntry.js'`, `exposes: { './App': './src/bootstrap.js' }` and `vue` shared as `singleton` (`^2.7.0`) (:64-71). `output.publicPath` is `http://localhost:3002/` (:14), and `devServer` uses port 3002 (:75). A `NormalModuleReplacementPlugin` redirects `vuetify` imports to prebuilt `dist` (:60-63).

**Interpretation:** Unit is configured as a Module Federation remote and offers its mount module to a host. Vuetify 2 stays outside shared scope.

### 8. apps/mfe-vue2-checkout/webpack.config.js:8-81

**Observation:** `ModuleFederationPlugin` with `name: 'mfe_checkout'`, `filename: 'remoteEntry.js'`, `exposes: { './App': './src/bootstrap.js' }` and `vue` shared as `singleton` (`^2.7.0`) (:66-73). `output.publicPath` is `http://localhost:3001/` (:14), and `devServer` uses port 3001 (:77). A `NormalModuleReplacementPlugin` redirects `vuetify` imports to prebuilt `dist` (:62-65).

**Interpretation:** Unit is configured as a Module Federation remote and offers its mount module to a host. Vuetify 2 stays outside shared scope.

### 9. apps/mfe-vue3-dashboard/webpack.config.js:7-69

**Observation:** `ModuleFederationPlugin` with `name: 'mfe_dashboard'`, `filename: 'remoteEntry.js'`, `exposes: { './App': './src/bootstrap.js' }` and `vue` (`^3.5.0`) and `vuetify` (`^3.7.0`) shared as `singleton` (:53-61). `output.publicPath` is `http://localhost:3004/` (:13), and `devServer` uses port 3004 (:65).

**Interpretation:** Unit is configured as a Module Federation remote and offers its mount module to a host.

### 10. apps/mfe-vue3-profile/webpack.config.js:7-69

**Observation:** `ModuleFederationPlugin` with `name: 'mfe_profile'`, `filename: 'remoteEntry.js'`, `exposes: { './App': './src/bootstrap.js' }` and `vue` (`^3.5.0`) and `vuetify` (`^3.7.0`) shared as `singleton` (:53-61). `output.publicPath` is `http://localhost:3003/` (:13), and `devServer` uses port 3003 (:65).

**Interpretation:** Unit is configured as a Module Federation remote and offers its mount module to a host.

### 11. apps/mfe-vue2-admin/src/index.js:1

**Observation:** `import('./bootstrap').then(({ mount }) => {`, in standalone development entry.

**Interpretation:** An asynchronous bootstrap internal to unit.

### 12. apps/mfe-vue2-checkout/src/index.js:5

**Observation:** `import('./bootstrap').then(({ mount }) => {`. Comment at :1-3 says file is only used in standalone mode.

**Interpretation:** An asynchronous bootstrap internal to unit.

### 13. apps/mfe-vue3-dashboard/src/index.js:1

**Observation:** `import('./bootstrap').then(({ mount }) => {`, in standalone development entry.

**Interpretation:** An asynchronous bootstrap internal to unit.

### 14. apps/mfe-vue3-profile/src/index.js:1

**Observation:** `import('./bootstrap').then(({ mount }) => {`, in standalone development entry.

**Interpretation:** An asynchronous bootstrap internal to unit.

### 15. apps/shell/composables/useMfeLoader.ts:13-49

**Observation:** `async function loadRemoteModule(descriptor: MfeDescriptor)` injects descriptor's `remoteEntry.js` (:18), reads container at `window[descriptor.remoteName]` (:21), calls `container.init({})` (:32), obtains `container.get(descriptor.exposedModule)` and executes factory (:38-40), requiring a `mount` function (:42-46).

**Interpretation:** Host manually implements Module Federation container consumption for remote received as parameter.

### 16. apps/shell/composables/useMfeLoader.ts:79

**Observation:** `const remote = await loadRemoteModule(descriptor)`, inside `mountMfe` (:71-87).

**Interpretation:** Host resolves container of remote received as parameter before mounting it.

### 17. apps/mfe-vue2-admin/src/bootstrap.js:24-39

**Observation:** `export function mount(el, props)`, in file exposed as `./App`. Function subscribes to authentication events and creates the admin Vue 2 instance in received element.

**Interpretation:** Admin offers mount function to host.

### 18. apps/mfe-vue2-admin/src/bootstrap.js:41-45

**Observation:** `export function unmount(el)` destroys Vue instance and cancels subscriptions.

**Interpretation:** Admin offers unmount function completing lifecycle.

### 19. apps/mfe-vue2-checkout/src/bootstrap.js:32-47

**Observation:** `export function mount(el, props)`, in file exposed as `./App`. Function subscribes to authentication events and creates the checkout Vue 2 instance in received element.

**Interpretation:** Checkout offers mount function to host.

### 20. apps/mfe-vue2-checkout/src/bootstrap.js:49-53

**Observation:** `export function unmount(el)` destroys Vue instance and cancels subscriptions.

**Interpretation:** Checkout offers unmount function completing lifecycle.

### 21. apps/mfe-vue3-dashboard/src/bootstrap.js:26-34

**Observation:** `export function mount(el, props)`, in file exposed as `./App`. Function subscribes to authentication events and creates the dashboard Vue 3 app with `createApp` in received element.

**Interpretation:** Dashboard offers mount function to host.

### 22. apps/mfe-vue3-dashboard/src/bootstrap.js:36-40

**Observation:** `export function unmount(el)` unmounts Vue 3 app and cancels subscriptions.

**Interpretation:** Dashboard offers unmount function completing lifecycle.

### 23. apps/mfe-vue3-profile/src/bootstrap.js:28-41

**Observation:** `export function mount(el, props)`, in file exposed as `./App`. Function subscribes to authentication events and creates the profile Vue 3 app with `createApp` in received element.

**Interpretation:** Profile offers mount function to host.

### 24. apps/mfe-vue3-profile/src/bootstrap.js:43-47

**Observation:** `export function unmount(el)` unmounts Vue 3 app and cancels subscriptions.

**Interpretation:** Profile offers unmount function completing lifecycle.

### 25. apps/mfe-vue2-admin/src/bootstrap.js:24

**Observation:** Same `mount` declaration as #17, recognized by mount-call pattern.

**Interpretation:** Admin offers mount function without calling it.

**Note:** Section 3.4.4 retained both rows because of overlapping patterns, and 3.5 retains one observation per row. Also applies to #28, #30, #33, #35, #38, #40 and #43.

### 26. apps/mfe-vue2-admin/src/bootstrap.js:30

**Observation:** `logoutUnsub = onAuthLogout(() => unmount(el))`, inside `mount`.

**Interpretation:** Admin subscribes to logout event and unmounts itself; unmounting is internal to unit.

### 27. apps/mfe-vue2-admin/src/bootstrap.js:32-38

**Observation:** `new Vue({ ... render(h) { return h(App, ...) } }).$mount(el)`.

**Interpretation:** Internal rendering of admin `App.vue`, without MFE mechanism.

### 28. apps/mfe-vue2-admin/src/bootstrap.js:41

**Observation:** Same `unmount` declaration as #18, recognized by mount-call pattern.

**Interpretation:** Admin offers unmount function without calling it.

### 29. apps/mfe-vue2-admin/src/index.js:2-8

**Observation:** `mount(el, {...})` in standalone page `#mfe-app`, with a fictitious user and `onLogout` that only writes to console.

**Interpretation:** Mounting internal to unit, to run it standalone.

### 30. apps/mfe-vue2-checkout/src/bootstrap.js:32

**Observation:** Same `mount` declaration as #19, recognized by mount-call pattern.

**Interpretation:** Checkout offers mount function without calling it.

### 31. apps/mfe-vue2-checkout/src/bootstrap.js:38

**Observation:** `logoutUnsub = onAuthLogout(() => unmount(el))`, inside `mount`.

**Interpretation:** Checkout subscribes to logout event and unmounts itself; unmounting is internal to unit.

### 32. apps/mfe-vue2-checkout/src/bootstrap.js:40-46

**Observation:** `new Vue({ vuetify, ... render(h) { return h(App, ...) } }).$mount(el)`.

**Interpretation:** Internal rendering of checkout `App.vue`, without MFE mechanism.

### 33. apps/mfe-vue2-checkout/src/bootstrap.js:49

**Observation:** Same `unmount` declaration as #20, recognized by mount-call pattern.

**Interpretation:** Checkout offers unmount function without calling it.

### 34. apps/mfe-vue2-checkout/src/index.js:6-18

**Observation:** `mount(el, {...})` in standalone page `#mfe-app`, with a fictitious user.

**Interpretation:** Mounting internal to unit, to run it standalone.

### 35. apps/mfe-vue3-dashboard/src/bootstrap.js:26

**Observation:** Same `mount` declaration as #21, recognized by mount-call pattern.

**Interpretation:** Dashboard offers mount function without calling it.

### 36. apps/mfe-vue3-dashboard/src/bootstrap.js:30

**Observation:** `logoutUnsub = onAuthLogout(() => unmount(el))`, inside `mount`.

**Interpretation:** Dashboard subscribes to logout event and unmounts itself; unmounting is internal to unit.

### 37. apps/mfe-vue3-dashboard/src/bootstrap.js:31-33

**Observation:** `app = createApp(App, { user: userRef, onLogout })`, `app.use(vuetify)` and `app.mount(el)`.

**Interpretation:** Internal rendering of dashboard `App.vue`, without MFE mechanism.

### 38. apps/mfe-vue3-dashboard/src/bootstrap.js:36

**Observation:** Same `unmount` declaration as #22, recognized by mount-call pattern.

**Interpretation:** Dashboard offers unmount function without calling it.

### 39. apps/mfe-vue3-dashboard/src/index.js:2-8

**Observation:** `mount(el, {...})` in standalone page `#mfe-app`, with a fictitious user.

**Interpretation:** Mounting internal to unit, to run it standalone.

### 40. apps/mfe-vue3-profile/src/bootstrap.js:28

**Observation:** Same `mount` declaration as #23, recognized by mount-call pattern.

**Interpretation:** Profile offers mount function without calling it.

### 41. apps/mfe-vue3-profile/src/bootstrap.js:36

**Observation:** `logoutUnsub = onAuthLogout(() => unmount(el))`, inside `mount`.

**Interpretation:** Profile subscribes to logout event and unmounts itself; unmounting is internal to unit.

### 42. apps/mfe-vue3-profile/src/bootstrap.js:38-40

**Observation:** `app = createApp(App, { user: userRef, onLogout })`, `app.use(vuetify)` and `app.mount(el)`.

**Interpretation:** Internal rendering of profile `App.vue`, without MFE mechanism.

### 43. apps/mfe-vue3-profile/src/bootstrap.js:43

**Observation:** Same `unmount` declaration as #24, recognized by mount-call pattern.

**Interpretation:** Profile offers unmount function without calling it.

### 44. apps/mfe-vue3-profile/src/index.js:2-8

**Observation:** `mount(el, {...})` in standalone page `#mfe-app`, with a fictitious user.

**Interpretation:** Mounting internal to unit, to run it standalone.

### 45. apps/shell/composables/useMfeLoader.ts:76-87; apps/shell/pages/app/[...mfe].vue:24, 47-48

**Observation:** `remote.mount(el, props)`, immediately after `loadRemoteModule`. Element is catch-all page mount `div`, and props are `user` and `onLogout`.

**Interpretation:** Host mounts whichever remote was resolved in its DOM.

### 46. apps/shell/composables/useMfeLoader.ts:89-92

**Observation:** `if (remote) remote.unmount(el)`, on cached remote. `unmountMfe` is called by catch-all page at :54 and :59.

**Interpretation:** Host unmounts whichever remote it mounted.

### 47. packages/shared/src/types/index.ts:26

**Observation:** `mount(el: HTMLElement, props: RemoteMountProps): void`, in interface `RemoteMount` (:25-28), under comment "Contract every remote must expose via its MF module".

**Interpretation:** Mount contract type signature rather than a call.

### 48. packages/shared/src/types/index.ts:27

**Observation:** `unmount(el: HTMLElement): void`, in same interface `RemoteMount`.

**Interpretation:** Unmount contract type signature rather than a call.

### 49. apps/shell/composables/useMfeLoader.ts:52-64; apps/shell/composables/useMfeLoader.ts:18

**Observation:** `document.createElement('script')` with `src` equal to descriptor URL, appended to `head`; `injectScript` is called by `loadRemoteModule` with `descriptor.remoteUrl`.

**Interpretation:** Host loads remote `remoteEntry.js` at runtime as Module Federation container transport.

### 50. packages/shared/src/auth/index.ts:10-16; apps/shell/stores/auth.ts:28

**Observation:** `window.dispatchEvent(new CustomEvent<UserState>(AUTH_CHANGED, { detail: user }))` in `broadcastLogin`, with `AUTH_CHANGED = 'mfe:auth-changed'` (:3). Shell authentication store calls `broadcastLogin(user)`, with comment "notifies Vue 2 + Vue 3 remotes via event bus".

**Interpretation:** Shell sends authenticated user through a window event any unit can listen to.

### 51. packages/shared/src/auth/index.ts:18-24; apps/shell/stores/auth.ts:34

**Observation:** `window.dispatchEvent(new CustomEvent(AUTH_LOGOUT))` in `broadcastLogout`, with `AUTH_LOGOUT = 'mfe:auth-logout'` (:4). Shell store `logout` calls `broadcastLogout()`.

**Interpretation:** Shell announces logout through a window event any unit can listen to.

### 52. apps/shell/pages/app/[...mfe].vue:46; apps/shell/pages/app/[...mfe].vue:40-42, 24

**Observation:** `await loader.mountMfe(mountEl.value, mfe.value, {...})` in `onMounted`. `mfe` is registry descriptor whose `route` prefixes current path, and `mountEl` is mount `div`.

**Interpretation:** Host page mounts whichever remote route selected from registry.

### 53. packages/shared/src/registry.ts:12-61

**Observation:** `export const MFE_REGISTRY: MfeDescriptor[]` with four descriptors: checkout `/app/checkout` and `mfe_checkout` (:14-23), admin `/app/admin` and `mfe_admin` (:26-35), profile `/app/profile` and `mfe_profile` (:38-47) and dashboard `/app/dashboard` and `mfe_dashboard` (:50-59). Each has `remoteUrl` for `remoteEntry.js`, through environment variable or `http://localhost:3001` through `3004` (:5-9), and `exposedModule: './App'`.

**Interpretation:** Host declares in code which units it uses, where to find them and each route.

### 54. .; package.json:1-52; package.json:19

**Observation:** Root manifest, with only tooling devDependencies and a `build` invoking `turbo run build`. It has no entry or build configuration of its own.

**Interpretation:** Workspace coordination root rather than frontend unit.

### 55. apps/mfe-vue2-admin; apps/mfe-vue2-admin/package.json:1-32; apps/mfe-vue2-admin/webpack.config.js:9, 8-79; apps/mfe-vue2-admin/src/index.js:1-8; apps/mfe-vue2-admin/src/bootstrap.js:32-38; apps/mfe-vue2-admin/package.json:7

**Observation:** Vue 2 application with its own manifest, webpack configuration, entry (`./src/index.js`, loading bootstrap and mounting UI) and `webpack --mode production`.

**Interpretation:** Frontend unit with its own boundary.

### 56. apps/mfe-vue2-checkout; apps/mfe-vue2-checkout/package.json:1-33; apps/mfe-vue2-checkout/webpack.config.js:9, 8-81; apps/mfe-vue2-checkout/src/index.js:5-18; apps/mfe-vue2-checkout/src/bootstrap.js:40-46; apps/mfe-vue2-checkout/package.json:7

**Observation:** Vue 2 application with its own manifest, webpack configuration, entry and `webpack --mode production`.

**Interpretation:** Frontend unit with its own boundary.

### 57. apps/mfe-vue3-dashboard; apps/mfe-vue3-dashboard/package.json:1-32; apps/mfe-vue3-dashboard/webpack.config.js:8, 7-69; apps/mfe-vue3-dashboard/src/index.js:1-8; apps/mfe-vue3-dashboard/src/bootstrap.js:31-33; apps/mfe-vue3-dashboard/package.json:7

**Observation:** Vue 3 application with its own manifest, webpack configuration, entry and `webpack --mode production`.

**Interpretation:** Frontend unit with its own boundary.

### 58. apps/mfe-vue3-profile; apps/mfe-vue3-profile/package.json:1-32; apps/mfe-vue3-profile/webpack.config.js:8, 7-69; apps/mfe-vue3-profile/src/index.js:1-8; apps/mfe-vue3-profile/src/bootstrap.js:38-40; apps/mfe-vue3-profile/package.json:7

**Observation:** Vue 3 application with its own manifest, webpack configuration, entry and `webpack --mode production`.

**Interpretation:** Frontend unit with its own boundary.

### 59. apps/shell; apps/shell/package.json:1-35; apps/shell/app.vue:1-5; apps/shell/pages/app/[...mfe].vue:2-3; apps/shell/nuxt.config.ts:58-91; apps/shell/package.json:7

**Observation:** Nuxt 3 application with its own manifest, `app.vue` root with `<NuxtPage />`, routed pages, `defineNuxtConfig` with `ssr: true` and `nuxt build`.

**Interpretation:** Frontend unit with its own boundary, in host role.

### 60. packages/shared; packages/shared/package.json:1-11; packages/shared/package.json:5-10

**Observation:** Package with its own manifest exporting `./src/index.ts`, `./auth` and `./types`: types, authentication events and registry. It has no application entry or build.

**Interpretation:** Shared workspace package rather than frontend unit.

### 61. scripts; scripts/webpack.aliases.js:13-17

**Observation:** Contains webpack aliases used by remotes, a static `dist` server, health check and local startup script. No manifest or application entry.

**Interpretation:** Build and development utilities rather than frontend unit.

### 62. packages/shared/src/registry.ts:26-35, 5-9; apps/shell/pages/app/[...mfe].vue:40-49; apps/shell/composables/useMfeLoader.ts:13-49, 79-80, 91; apps/mfe-vue2-admin/webpack.config.js:64-67; apps/mfe-vue2-admin/src/bootstrap.js:24, 41

**Observation:** Descriptor `admin` requests container `mfe_admin` and module `./App`, at `http://localhost:3002/remoteEntry.js` without environment variable. Remote declares itself `mfe_admin`, generates `remoteEntry.js` and exposes `./App`, with `mount` and `unmount`. Route `/app/admin` leads to page loading container and calling `mount` in its `div`.

**Interpretation:** An active host → remote relationship through Module Federation.

### 63. packages/shared/src/registry.ts:14-23, 5-9; apps/shell/pages/app/[...mfe].vue:40-49; apps/shell/composables/useMfeLoader.ts:13-49, 79-80, 91; apps/mfe-vue2-checkout/webpack.config.js:66-69; apps/mfe-vue2-checkout/src/bootstrap.js:32, 49

**Observation:** Descriptor `checkout` requests container `mfe_checkout` and module `./App`, at `http://localhost:3001/remoteEntry.js` without environment variable. Remote declares itself `mfe_checkout`, generates `remoteEntry.js` and exposes `./App`, with `mount` and `unmount`.

**Interpretation:** An active host → remote relationship through Module Federation.

### 64. packages/shared/src/registry.ts:50-59, 5-9; apps/shell/pages/app/[...mfe].vue:40-49; apps/shell/composables/useMfeLoader.ts:13-49, 79-80, 91; apps/mfe-vue3-dashboard/webpack.config.js:53-56; apps/mfe-vue3-dashboard/src/bootstrap.js:26, 36

**Observation:** Descriptor `dashboard` requests container `mfe_dashboard` and module `./App`, at `http://localhost:3004/remoteEntry.js` without environment variable. Remote declares itself `mfe_dashboard`, generates `remoteEntry.js` and exposes `./App`, with `mount` and `unmount`.

**Interpretation:** An active host → remote relationship through Module Federation. Shell treats Vue 3 remote through same contract as Vue 2 remotes.

### 65. packages/shared/src/registry.ts:38-47, 5-9; apps/shell/pages/app/[...mfe].vue:40-49; apps/shell/composables/useMfeLoader.ts:13-49, 79-80, 91; apps/mfe-vue3-profile/webpack.config.js:53-56; apps/mfe-vue3-profile/src/bootstrap.js:28, 43

**Observation:** Descriptor `profile` requests container `mfe_profile` and module `./App`, at `http://localhost:3003/remoteEntry.js` without environment variable. Remote declares itself `mfe_profile`, generates `remoteEntry.js` and exposes `./App`, with `mount` and `unmount`.

**Interpretation:** An active host → remote relationship through Module Federation.

### 66. apps/shell/stores/auth.ts:28, 34; packages/shared/src/auth/index.ts:14, 22, 28-43; apps/mfe-vue2-admin/src/bootstrap.js:27-30

**Observation:** Shell dispatches `mfe:auth-changed` when synchronizing session and `mfe:auth-logout` on logout. Admin subscribes to both events in its `mount`: first updates instance user, second unmounts remote. Admin sends no events.

**Interpretation:** An active event communication relationship from shell to admin.

### 67. apps/shell/stores/auth.ts:28, 34; packages/shared/src/auth/index.ts:14, 22, 28-43; apps/mfe-vue2-checkout/src/bootstrap.js:35-38

**Observation:** Shell dispatches both events, and checkout subscribes in its `mount` and only receives.

**Interpretation:** An active event communication relationship from shell to checkout.

### 68. apps/shell/stores/auth.ts:28, 34; packages/shared/src/auth/index.ts:14, 22, 28-43; apps/mfe-vue3-dashboard/src/bootstrap.js:29-30

**Observation:** Shell dispatches both events, and dashboard subscribes in its `mount`, updating user `ref`, and only receives.

**Interpretation:** An active event communication relationship from shell to dashboard.

### 69. apps/shell/stores/auth.ts:28, 34; packages/shared/src/auth/index.ts:14, 22, 28-43; apps/mfe-vue3-profile/src/bootstrap.js:33-36

**Observation:** Shell dispatches both events, and profile subscribes in its `mount` and only receives.

**Interpretation:** An active event communication relationship from shell to profile.

### 70. apps/mfe-vue2-admin/package.json:7; apps/mfe-vue2-admin/webpack.config.js:11-16, 64-71; package.json:19, 27

**Observation:** It has its own `webpack --config webpack.config.js --mode production` and `dist` output, with container `mfe_admin` in `remoteEntry.js`; root `turbo run build` only invokes this build. Sole `dist` server is development script `dev:remote:admin`, on port 3002. No artifact publishes application.

**Interpretation:** A separate build boundary without observed deployment.

### 71. apps/mfe-vue2-checkout/package.json:7; apps/mfe-vue2-checkout/webpack.config.js:11-16, 66-73; package.json:19, 26

**Observation:** It has its own `webpack --mode production` and `dist` output, with container `mfe_checkout`. Served locally through `dev:remote:checkout` on port 3001 or `devServer`. No artifact publishes application.

**Interpretation:** A separate build boundary without observed deployment.

### 72. apps/mfe-vue3-dashboard/package.json:7; apps/mfe-vue3-dashboard/webpack.config.js:10-15, 53-61; package.json:19, 29

**Observation:** It has its own `webpack --mode production` and `dist` output, with container `mfe_dashboard`. Served locally through `dev:remote:dashboard` on port 3004 or `devServer`. No artifact publishes application.

**Interpretation:** A separate build boundary without observed deployment.

### 73. apps/mfe-vue3-profile/package.json:7; apps/mfe-vue3-profile/webpack.config.js:10-15, 53-56; package.json:19, 28

**Observation:** It has its own `webpack --mode production` and `dist` output, with container `mfe_profile`. Served locally through `dev:remote:profile` on port 3003 or `devServer`. No artifact publishes application.

**Interpretation:** A separate build boundary without observed deployment.

### 74. apps/shell/package.json:7-8; apps/shell/nuxt.config.ts:58-91; turbo.json:8-11; package.json:19

**Observation:** It has `nuxt build`, with shell-only `.output`, and `start: node .output/server/index.mjs` for SSR server. Sole snapshot address is port 3000 of `nuxt dev`. No artifact packages or publishes application.

**Interpretation:** A separate build boundary without observed deployment. No remote enters shell build.

### 75. README.md:3

**Observation:** "Micro-frontend monorepo supporting **Vue 2 + Vuetify 2** and **Vue 3 + Vuetify 3** remotes side-by-side, orchestrated by a **Nuxt 3 shell**."

**Interpretation:** Presents repository as monorepo of Vue 2 and Vue 3 remotes orchestrated by Nuxt 3 shell. Claim corroborated.

### 76. README.md:5

**Observation:** "with Webpack Module Federation, Turborepo and pnpm workspaces".

**Interpretation:** Names project technologies. Remotes configure Module Federation, and pnpm workspace and Turborepo are configured. Claim corroborated.

### 77. README.md:13-28

**Observation:** Tree of `apps/` with `shell/ ← Nuxt 3 host`, `mfe-vue2-checkout/` and `mfe-vue2-admin/ ← Vue 2 + Vuetify 2` and `mfe-vue3-profile/` and `mfe-vue3-dashboard/ ← Vue 3 + Vuetify 3`.

**Interpretation:** Describes five applications and framework of each. Claim corroborated.

### 78. README.md:17

**Observation:** "index.vue ← Homepage / MFE selector grid".

**Interpretation:** Claims shell homepage lists MFEs for selection. It generates a card per registry descriptor Claim corroborated.

### 79. README.md:18

**Observation:** "app/[...mfe].vue ← Dynamic MFE container".

**Interpretation:** Claims catch-all page is container where remotes mount. Claim corroborated.

### 80. README.md:20

**Observation:** "ShellHeader.vue ← Shared header (only shared UI element)".

**Interpretation:** Claims header is shared between units. Only shell uses it Claim contradicted.

### 81. README.md:22

**Observation:** "useMfeLoader.ts ← Dynamic remote loader".

**Interpretation:** Claims composable loads remotes at runtime. Claim corroborated.

### 82. README.md:31

**Observation:** "shared/ ← @mfe/shared: types, auth bus, MFE registry".

**Interpretation:** Claims a package common to units groups types, authentication bus and registry. Five units declare and use it Claim corroborated.

### 83. README.md:34

**Observation:** "auth/ ← CustomEvent auth bus (framework-agnostic)".

**Interpretation:** Names communication mechanism, framework-independent `CustomEvent` events. Claim corroborated.

### 84. README.md:35

**Observation:** "registry.ts ← List of all MFEs shown on the homepage".

**Interpretation:** Claims registry lists units used by shell. Claim corroborated.

### 85. README.md:44

**Observation:** "Each Vue 2 remote is a **plain Webpack 5 app** — no Nuxt."

**Interpretation:** Claims Vue 2 remotes have their own webpack builds. Claim corroborated.

### 86. README.md:44

**Observation:** "Each remote brings its own isolated Vue 2 + Vuetify 2 instance […] completely isolated from the shell's Vue 3."

**Interpretation:** Claims each Vue 2 remote runs with its own instances, isolated from shell. Claim corroborated.

### 87. README.md:44

**Observation:** "via Module Federation's `singleton` scope".

**Interpretation:** Attributes Vue 2 and Vuetify 2 instance to Module Federation `singleton` scope. Only `vue` is in `shared`, Vuetify 2 comes from prebuilt `dist` Claim contradicted.

### 88. README.md:46

**Observation:** "Vue 3 remotes are also standalone Webpack apps (simpler than Nuxt for remotes)".

**Interpretation:** Claims Vue 3 remotes have their own webpack builds. Claim corroborated.

### 89. README.md:46

**Observation:** "and share Vue 3 with the shell via MF's singleton scope".

**Interpretation:** Claims host and Vue 3 remotes share Vue 3. Shell has no `ModuleFederationPlugin` and initializes each container with empty scope Claim contradicted.

### 90. README.md:48

**Observation:** "The only shared thing: the header".

**Interpretation:** Claims nothing beyond header is shared. Package `@mfe/shared` and event bus connect five units, and header is only used by shell. Claim contradicted.

### 91. README.md:50

**Observation:** "Remotes do **not** render their own header — the shell injects it above the remote's mount point."

**Interpretation:** Claims shell provides frame and remotes only content. Claim corroborated.

### 92. README.md:50

**Observation:** "Remotes only receive `user` and `onLogout` as props."

**Interpretation:** Describes props host passes to each remote. Claim corroborated.

### 93. README.md:56

**Observation:** "Shell logs in → calls `broadcastLogin(user)` → stores user in `sessionStorage` + fires `mfe:auth-changed`".

**Interpretation:** Describes shell sending authentication state to remotes. Claim corroborated.

### 94. README.md:57

**Observation:** "Each remote subscribes to `mfe:auth-changed` on mount and updates its internal user ref".

**Interpretation:** Describes event reception in each remote. Claim corroborated.

### 95. README.md:58

**Observation:** "On logout, shell fires `mfe:auth-logout` → remotes unmount themselves".

**Interpretation:** Describes event-propagated logout. Claim corroborated.

### 96. README.md:62

**Observation:** "Every remote must export `{ mount(el, props), unmount(el) }` from its `bootstrap.js`. This is the `RemoteMount` interface defined in `@mfe/shared`. The shell's `useMfeLoader` composable calls this interface — it never knows whether it's talking to a Vue 2 or Vue 3 app."

**Interpretation:** Describes framework-independent mounting contract between host and remotes. Claim corroborated.

### 97. README.md:87-95

**Observation:** "Individual apps:" and `pnpm dev:shell      # shell only`, followed by one command per remote.

**Interpretation:** Claims each application starts standalone in development. Claim corroborated.

### 98. apps/mfe-vue2-admin/webpack.config.js:53

**Observation:** "Admin MFE (standalone dev)", page title of `HtmlWebpackPlugin`.

**Interpretation:** Claims admin runs standalone in development. Claim corroborated.

### 99. apps/mfe-vue2-checkout/src/index.js:1-3

**Observation:** "Async entry so Module Federation shared scopes initialise before the app runs. The shell loads bootstrap.js directly; this file is used only when running the checkout MFE standalone for development."

**Interpretation:** Explains asynchronous bootstrap through Module Federation and separates standalone entry from module loaded by shell. Claim corroborated.

### 100. apps/mfe-vue3-dashboard/webpack.config.js:48

**Observation:** "Dashboard MFE (standalone dev)", page title of `HtmlWebpackPlugin`.

**Interpretation:** Claims dashboard runs standalone in development. Claim corroborated.

### 101. apps/mfe-vue3-profile/webpack.config.js:48

**Observation:** "Profile MFE (standalone dev)", page title of `HtmlWebpackPlugin`.

**Interpretation:** Claims profile runs standalone in development. Claim corroborated.

### 102. apps/shell/composables/useMfeLoader.ts:17

**Observation:** "Inject remoteEntry.js as a plain script tag".

**Interpretation:** Describes `remoteEntry.js` transport through `<script>`. Claim corroborated.

### 103. apps/shell/composables/useMfeLoader.ts:20

**Observation:** "The remote sets itself on window[remoteName] via webpack MF".

**Interpretation:** Describes how Module Federation container becomes available to host. Claim corroborated.

### 104. apps/shell/composables/useMfeLoader.ts:28-30

**Observation:** "Shell has no MF plugin, so we pass an empty object — each remote manages its own singleton scope internally."

**Interpretation:** Explains host initializes containers without shared scope. Claim corroborated. It refutes #89.

### 105. apps/shell/nuxt.config.ts:66

**Observation:** "the shell never statically imports any remote module".

**Interpretation:** Claims shell does not depend on remotes at build time. Claim corroborated.

### 106. packages/shared/src/registry.ts:3-4

**Observation:** "Remote URLs fall back to localhost for local dev. In production set CHECKOUT_REMOTE_URL etc. in your environment."

**Interpretation:** Claims each remote address can be changed through environment variable. Claim corroborated. Remote `publicPath` remains fixed at `localhost`.

### 107. scripts/dev-remote-server.js:4-5

**Observation:** "Serves a built MFE's dist/ folder as a static file server with CORS. Useful when you want to run the shell in dev mode against pre-built remotes."

**Interpretation:** Claims each built remote can be served separately for shell. Claim corroborated.

### 108. scripts/health-check.js:4-5

**Observation:** "Polls all MFE remoteEntry.js URLs until they respond (or times out). Run before starting the shell in production/CI to avoid blank pages."

**Interpretation:** Describes checking each remote availability before starting shell. Claim corroborated. No snapshot artifact invokes it in production or CI.

### 109. scripts/webpack.aliases.js:3

**Observation:** "Shared path aliases for all MFE remote webpack configs."

**Interpretation:** Describes a build utility common to four remotes. Claim corroborated.

### 110. 74f5247 2026-05-29 (package.json, turbo.json); 84ffc24 2026-05-29

**Observation:** `package.json` and `turbo.json` are created in `74f5247` and do not change through snapshot. No commit creates or removes CI workflow, Dockerfile or script invoking `turbo`; sole path removed in history is gitlink `apps`.

**Interpretation:** `turbo` never had an invocation outside `package.json` scripts; `Undetermined` does not remain from abandoned automation. Point clarified.

### 111. 74f5247 2026-05-29 (README.md); 8606169 2026-05-29 (apps, gitlink); 84ffc24 2026-05-29 (apps/shell/components/ShellHeader.vue, apps/*/src/App.vue)

**Observation:** README with "Shared header" is from `74f5247`, unchanged through snapshot. `ShellHeader.vue` and remote `App.vue` appear as files only in `84ffc24`; earlier, `apps` was gitlink `cb1c03a`, whose commit is absent from clone.

**Interpretation:** History does not show whether an earlier application version used header in more than one unit. Point inconclusive, concerning only past: header is shell-only in snapshot.

### 112. 74f5247 2026-05-29 (README.md); 8606169 2026-05-29 (apps, gitlink); 84ffc24 2026-05-29 (apps/shell/nuxt.config.ts, apps/shell/composables/useMfeLoader.ts, apps/*/webpack.config.js)

**Observation:** Sentences about `singleton` scope are in README from `74f5247`, unchanged. Contradicting artifacts have first observable presence in `84ffc24`, with a single commit in each `log`. Earlier contents, in gitlink `cb1c03a` or origin repository cited in README.md:5, are unavailable.

**Interpretation:** History does not show whether shell had `ModuleFederationPlugin` with Vue 3 in shared scope. Point inconclusive, concerning only past: shell initializes containers with empty scope in snapshot.

### 113. 74f5247 2026-05-29 (README.md, packages/shared)

**Observation:** README and `packages/shared` enter together in `74f5247` and do not change through snapshot. README version from `74f5247` already contains, immediately below "The only shared thing: the header", section "Auth state sharing" with `packages/shared/src/auth` bus.

**Interpretation:** Title never coexisted with a version without shared package; discrepancy is internal to README from first observable version. Point clarified.

## Classification

| # | Origin | Dimension | Type | Approach | Evidence | Strength | Relationships |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.2 (apps/mfe-vue2-admin/package.json:13) | 1 technology | manifest | — | context | weak | declares #26 |
| 2 | 3.4.2 (apps/mfe-vue2-checkout/package.json:13) | 1 technology | manifest | — | context | weak | declares #31 |
| 3 | 3.4.2 (apps/mfe-vue3-dashboard/package.json:14) | 1 technology | manifest | — | context | weak | declares #36 |
| 4 | 3.4.2 (apps/mfe-vue3-profile/package.json:14) | 1 technology | manifest | — | context | weak | declares #41 |
| 5 | 3.4.2 (apps/shell/package.json:13) | 1 technology | manifest | — | context | weak | declares #53; declares #50; declares #51 |
| 6 | 3.4.2 (package.json:34) | 1 technology | manifest | — | context | ambiguous | declares turbo.json:3-18 |
| 7 | 3.4.2 (apps/mfe-vue2-admin/package.json:13, Evidence); 3.4.3 (apps/mfe-vue2-admin, Markers, Entry and Build); 3.4.4 (apps/mfe-vue2-admin/src/bootstrap.js:24, src-mount-export and src-mount-call, Observation); 3.4.5 #1 (Configuration); 3.4.6 #1 (Where served and Artifacts); 3.4.7 #13, #24, #35 (Evidence) | 2 configuration | configuration | module-federation | technological | moderate | configures #55; configures #62 |
| 8 | 3.4.2 (apps/mfe-vue2-checkout/package.json:13, Evidence); 3.4.3 (apps/mfe-vue2-checkout, Markers, Entry and Build); 3.4.4 (apps/mfe-vue2-checkout/src/bootstrap.js:32, src-mount-export and src-mount-call, Observation); 3.4.5 #2 (Configuration); 3.4.6 #2 (Where served and Artifacts); 3.4.7 #2, #11, #13, #25, #29, #30, #35 (Evidence) | 2 configuration | configuration | module-federation | technological | moderate | configures #56; configures #63 |
| 9 | 3.4.2 (apps/mfe-vue3-dashboard/package.json:14, Evidence); 3.4.3 (apps/mfe-vue3-dashboard, Markers, Entry and Build); 3.4.4 (apps/mfe-vue3-dashboard/src/bootstrap.js:26, src-mount-export and src-mount-call, Observation); 3.4.5 #3 (Configuration); 3.4.6 #3 (Where served and Artifacts); 3.4.7 #26, #35 (Evidence) | 2 configuration | configuration | module-federation | technological | moderate | configures #57; configures #64 |
| 10 | 3.4.2 (apps/mfe-vue3-profile/package.json:14, Evidence); 3.4.3 (apps/mfe-vue3-profile, Markers, Entry and Build); 3.4.4 (apps/mfe-vue3-profile/src/bootstrap.js:28, src-mount-export and src-mount-call, Observation); 3.4.5 #4 (Configuration); 3.4.6 #4 (Where served and Artifacts); 3.4.7 #14, #15, #27, #35 (Evidence) | 2 configuration | configuration | module-federation | technological | moderate | configures #58; configures #65 |
| 11 | 3.4.4 (apps/mfe-vue2-admin/src/index.js:1) | 3 code | source code | — | technological | weak | — |
| 12 | 3.4.4 (apps/mfe-vue2-checkout/src/index.js:5) | 3 code | source code | — | technological | weak | — |
| 13 | 3.4.4 (apps/mfe-vue3-dashboard/src/index.js:1) | 3 code | source code | — | technological | weak | — |
| 14 | 3.4.4 (apps/mfe-vue3-profile/src/index.js:1) | 3 code | source code | — | technological | weak | — |
| 15 | 3.4.4 (apps/shell/composables/useMfeLoader.ts:13) | 3 code | source code | module-federation | technological | moderate | implements #62; implements #63; implements #64; implements #65 |
| 16 | 3.4.4 (apps/shell/composables/useMfeLoader.ts:79) | 3 code | source code | module-federation | technological | moderate | implements #62; implements #63; implements #64; implements #65 |
| 17 | 3.4.4 (apps/mfe-vue2-admin/src/bootstrap.js:24, src-mount-export) | 3 code | source code | module-federation | technological | moderate | implements #62 |
| 18 | 3.4.4 (apps/mfe-vue2-admin/src/bootstrap.js:41, src-mount-export) | 3 code | source code | module-federation | technological | moderate | implements #62 |
| 19 | 3.4.4 (apps/mfe-vue2-checkout/src/bootstrap.js:32, src-mount-export) | 3 code | source code | module-federation | technological | moderate | implements #63 |
| 20 | 3.4.4 (apps/mfe-vue2-checkout/src/bootstrap.js:49, src-mount-export) | 3 code | source code | module-federation | technological | moderate | implements #63 |
| 21 | 3.4.4 (apps/mfe-vue3-dashboard/src/bootstrap.js:26, src-mount-export) | 3 code | source code | module-federation | technological | moderate | implements #64 |
| 22 | 3.4.4 (apps/mfe-vue3-dashboard/src/bootstrap.js:36, src-mount-export) | 3 code | source code | module-federation | technological | moderate | implements #64 |
| 23 | 3.4.4 (apps/mfe-vue3-profile/src/bootstrap.js:28, src-mount-export) | 3 code | source code | module-federation | technological | moderate | implements #65 |
| 24 | 3.4.4 (apps/mfe-vue3-profile/src/bootstrap.js:43, src-mount-export) | 3 code | source code | module-federation | technological | moderate | implements #65 |
| 25 | 3.4.4 (apps/mfe-vue2-admin/src/bootstrap.js:24, src-mount-call) | 3 code | source code | module-federation | technological | moderate | implements #62 |
| 26 | 3.4.4 (apps/mfe-vue2-admin/src/bootstrap.js:30) | 3 code | source code | events | technological | weak | — |
| 27 | 3.4.4 (apps/mfe-vue2-admin/src/bootstrap.js:38) | 3 code | source code | — | context | weak | — |
| 28 | 3.4.4 (apps/mfe-vue2-admin/src/bootstrap.js:41, src-mount-call) | 3 code | source code | module-federation | technological | moderate | implements #62 |
| 29 | 3.4.4 (apps/mfe-vue2-admin/src/index.js:4) | 3 code | source code | module-federation | technological | weak | — |
| 30 | 3.4.4 (apps/mfe-vue2-checkout/src/bootstrap.js:32, src-mount-call) | 3 code | source code | module-federation | technological | moderate | implements #63 |
| 31 | 3.4.4 (apps/mfe-vue2-checkout/src/bootstrap.js:38) | 3 code | source code | events | technological | weak | — |
| 32 | 3.4.4 (apps/mfe-vue2-checkout/src/bootstrap.js:46) | 3 code | source code | — | context | weak | — |
| 33 | 3.4.4 (apps/mfe-vue2-checkout/src/bootstrap.js:49, src-mount-call) | 3 code | source code | module-federation | technological | moderate | implements #63 |
| 34 | 3.4.4 (apps/mfe-vue2-checkout/src/index.js:8) | 3 code | source code | module-federation | technological | weak | — |
| 35 | 3.4.4 (apps/mfe-vue3-dashboard/src/bootstrap.js:26, src-mount-call) | 3 code | source code | module-federation | technological | moderate | implements #64 |
| 36 | 3.4.4 (apps/mfe-vue3-dashboard/src/bootstrap.js:30) | 3 code | source code | events | technological | weak | — |
| 37 | 3.4.4 (apps/mfe-vue3-dashboard/src/bootstrap.js:33) | 3 code | source code | — | context | weak | — |
| 38 | 3.4.4 (apps/mfe-vue3-dashboard/src/bootstrap.js:36, src-mount-call) | 3 code | source code | module-federation | technological | moderate | implements #64 |
| 39 | 3.4.4 (apps/mfe-vue3-dashboard/src/index.js:4) | 3 code | source code | module-federation | technological | weak | — |
| 40 | 3.4.4 (apps/mfe-vue3-profile/src/bootstrap.js:28, src-mount-call) | 3 code | source code | module-federation | technological | moderate | implements #65 |
| 41 | 3.4.4 (apps/mfe-vue3-profile/src/bootstrap.js:36) | 3 code | source code | events | technological | weak | — |
| 42 | 3.4.4 (apps/mfe-vue3-profile/src/bootstrap.js:40) | 3 code | source code | — | context | weak | — |
| 43 | 3.4.4 (apps/mfe-vue3-profile/src/bootstrap.js:43, src-mount-call) | 3 code | source code | module-federation | technological | moderate | implements #65 |
| 44 | 3.4.4 (apps/mfe-vue3-profile/src/index.js:4) | 3 code | source code | module-federation | technological | weak | — |
| 45 | 3.4.4 (apps/shell/composables/useMfeLoader.ts:80) | 3 code | source code | module-federation | technological | moderate | implements #62; implements #63; implements #64; implements #65 |
| 46 | 3.4.4 (apps/shell/composables/useMfeLoader.ts:91) | 3 code | source code | module-federation | technological | moderate | implements #62; implements #63; implements #64; implements #65 |
| 47 | 3.4.4 (packages/shared/src/types/index.ts:26) | 3 code | source code | — | technological | weak | — |
| 48 | 3.4.4 (packages/shared/src/types/index.ts:27) | 3 code | source code | — | technological | weak | — |
| 49 | 3.4.4 (apps/shell/composables/useMfeLoader.ts:57) | 3 code | source code | module-federation | technological | moderate | implements #62; implements #63; implements #64; implements #65 |
| 50 | 3.4.4 (packages/shared/src/auth/index.ts:14) | 3 code | source code | events | technological | moderate | implements #66; implements #67; implements #68; implements #69 |
| 51 | 3.4.4 (packages/shared/src/auth/index.ts:22) | 3 code | source code | events | technological | moderate | implements #66; implements #67; implements #68; implements #69 |
| 52 | 3.4.4 (apps/shell/pages/app/[...mfe].vue:46) | 3 code | source code | module-federation | technological | moderate | implements #62; implements #63; implements #64; implements #65 |
| 53 | 3.4.4 (packages/shared/src/registry.ts:12) | 3 code | source code | module-federation | architectural | strong | implements #62; implements #63; implements #64; implements #65 |
| 54 | 3.4.3 (.) | 4 structure | directory | — | context | weak | — |
| 55 | 3.4.3 (apps/mfe-vue2-admin) | 4 structure | directory | — | architectural | moderate | — |
| 56 | 3.4.3 (apps/mfe-vue2-checkout) | 4 structure | directory | — | architectural | moderate | — |
| 57 | 3.4.3 (apps/mfe-vue3-dashboard) | 4 structure | directory | — | architectural | moderate | — |
| 58 | 3.4.3 (apps/mfe-vue3-profile) | 4 structure | directory | — | architectural | moderate | — |
| 59 | 3.4.3 (apps/shell) | 4 structure | directory | — | architectural | moderate | — |
| 60 | 3.4.3 (packages/shared) | 4 structure | directory | — | context | weak | — |
| 61 | 3.4.3 (scripts) | 4 structure | directory | — | context | weak | — |
| 62 | 3.4.5 #1 | 5 composition | source code | module-federation | architectural | strong | links #59; links #55 |
| 63 | 3.4.5 #2 | 5 composition | source code | module-federation | architectural | strong | links #59; links #56 |
| 64 | 3.4.5 #3 | 5 composition | source code | module-federation | architectural | strong | links #59; links #57 |
| 65 | 3.4.5 #4 | 5 composition | source code | module-federation | architectural | strong | links #59; links #58 |
| 66 | 3.4.5 #5 | 5 composition | source code | events | architectural | strong | links #59; links #55 |
| 67 | 3.4.5 #6 | 5 composition | source code | events | architectural | strong | links #59; links #56 |
| 68 | 3.4.5 #7 | 5 composition | source code | events | architectural | strong | links #59; links #57 |
| 69 | 3.4.5 #8 | 5 composition | source code | events | architectural | strong | links #59; links #58 |
| 70 | 3.4.6 #1 | 6 build-deploy | configuration | — | architectural | moderate | publishes #55 |
| 71 | 3.4.6 #2 | 6 build-deploy | configuration | — | architectural | moderate | publishes #56 |
| 72 | 3.4.6 #3 | 6 build-deploy | configuration | — | architectural | moderate | publishes #57 |
| 73 | 3.4.6 #4 | 6 build-deploy | configuration | — | architectural | moderate | publishes #58 |
| 74 | 3.4.6 #5 | 6 build-deploy | configuration | — | architectural | moderate | publishes #59 |
| 75 | 3.4.7 #1 | 7 documentation | documentation | — | architectural | weak | corroborates #55; corroborates #56; corroborates #57; corroborates #58; corroborates #59; corroborates #62; corroborates #63; corroborates #64; corroborates #65 |
| 76 | 3.4.7 #2 | 7 documentation | documentation | module-federation | technological | weak | corroborates #7; corroborates #8; corroborates #9; corroborates #10; corroborates #62; corroborates #63; corroborates #64; corroborates #65; corroborates pnpm-workspace.yaml:1-3; corroborates turbo.json:3-18 |
| 77 | 3.4.7 #3 | 7 documentation | documentation | — | architectural | weak | corroborates #55; corroborates #56; corroborates #57; corroborates #58; corroborates #59 |
| 78 | 3.4.7 #4 | 7 documentation | documentation | — | architectural | weak | corroborates apps/shell/pages/index.vue:12-28 |
| 79 | 3.4.7 #5 | 7 documentation | documentation | — | architectural | weak | corroborates #52; corroborates #62; corroborates #63; corroborates #64; corroborates #65 |
| 80 | 3.4.7 #6 | 7 documentation | documentation | — | architectural | weak | contradicts apps/shell/pages/index.vue:3; contradicts apps/shell/pages/app/[...mfe].vue:3; contradicts apps/mfe-vue2-checkout/src/App.vue:1-15 |
| 81 | 3.4.7 #7 | 7 documentation | documentation | — | architectural | weak | corroborates #15; corroborates #16; corroborates #62; corroborates #63; corroborates #64; corroborates #65 |
| 82 | 3.4.7 #8 | 7 documentation | documentation | — | architectural | weak | corroborates #1; corroborates #2; corroborates #3; corroborates #4; corroborates #5; corroborates #60 |
| 83 | 3.4.7 #9 | 7 documentation | documentation | events | technological | weak | corroborates #50; corroborates #51; corroborates #66; corroborates #67; corroborates #68; corroborates #69 |
| 84 | 3.4.7 #10 | 7 documentation | documentation | — | architectural | weak | corroborates #53; corroborates apps/shell/pages/index.vue:42 |
| 85 | 3.4.7 #11 | 7 documentation | documentation | — | architectural | weak | corroborates #70; corroborates #71; corroborates #8 |
| 86 | 3.4.7 #12 | 7 documentation | documentation | — | architectural | weak | corroborates apps/mfe-vue2-checkout/src/bootstrap.js:8-20; corroborates #32; corroborates apps/shell/composables/useMfeLoader.ts:28-32 |
| 87 | 3.4.7 #13 | 7 documentation | documentation | module-federation | technological | weak | contradicts #7; contradicts #8; contradicts apps/mfe-vue2-checkout/src/bootstrap.js:8-9 |
| 88 | 3.4.7 #14 | 7 documentation | documentation | — | architectural | weak | corroborates #57; corroborates #58; corroborates #72; corroborates #73; corroborates #10 |
| 89 | 3.4.7 #15 | 7 documentation | documentation | module-federation | architectural | weak | contradicts apps/shell/composables/useMfeLoader.ts:28-32; contradicts apps/shell/nuxt.config.ts:58-91 |
| 90 | 3.4.7 #16 | 7 documentation | documentation | — | architectural | weak | contradicts #1; contradicts #2; contradicts #3; contradicts #4; contradicts #5; contradicts #66; contradicts #67; contradicts #68; contradicts #69; contradicts apps/shell/pages/index.vue:3; contradicts apps/shell/pages/app/[...mfe].vue:3 |
| 91 | 3.4.7 #17 | 7 documentation | documentation | — | architectural | weak | corroborates apps/shell/pages/app/[...mfe].vue:3, 24; corroborates apps/mfe-vue2-admin/src/App.vue:1-15; corroborates apps/mfe-vue3-dashboard/src/App.vue:1-13 |
| 92 | 3.4.7 #18 | 7 documentation | documentation | — | architectural | weak | corroborates #45; corroborates #52; corroborates packages/shared/src/types/index.ts:30-33 |
| 93 | 3.4.7 #19 | 7 documentation | documentation | events | architectural | weak | corroborates #50; corroborates #66; corroborates #67; corroborates #68; corroborates #69 |
| 94 | 3.4.7 #20 | 7 documentation | documentation | events | architectural | weak | corroborates apps/mfe-vue2-checkout/src/bootstrap.js:35-37; corroborates apps/mfe-vue3-profile/src/bootstrap.js:33-35; corroborates #66; corroborates #67; corroborates #68; corroborates #69 |
| 95 | 3.4.7 #21 | 7 documentation | documentation | events | architectural | weak | corroborates #26; corroborates #51; corroborates #66; corroborates #67; corroborates #68; corroborates #69 |
| 96 | 3.4.7 #22 | 7 documentation | documentation | — | architectural | weak | corroborates #17; corroborates #18; corroborates #19; corroborates #20; corroborates #21; corroborates #22; corroborates #23; corroborates #24; corroborates #47; corroborates #48; corroborates apps/shell/composables/useMfeLoader.ts:38-46; corroborates #45; corroborates #62; corroborates #63; corroborates #64; corroborates #65 |
| 97 | 3.4.7 #23 | 7 documentation | documentation | — | architectural | weak | corroborates package.json:14-18; corroborates apps/shell/package.json:6; corroborates apps/mfe-vue2-checkout/package.json:6; corroborates #29; corroborates #34; corroborates #39; corroborates #44 |
| 98 | 3.4.7 #24 | 7 documentation | comment | — | architectural | weak | corroborates #55; corroborates #29 |
| 99 | 3.4.7 #25 | 7 documentation | comment | module-federation | architectural | weak | corroborates #12; corroborates #8; corroborates #63 |
| 100 | 3.4.7 #26 | 7 documentation | comment | — | architectural | weak | corroborates #57; corroborates #39 |
| 101 | 3.4.7 #27 | 7 documentation | comment | — | architectural | weak | corroborates #58; corroborates #44 |
| 102 | 3.4.7 #28 | 7 documentation | comment | module-federation | technological | weak | corroborates #49 |
| 103 | 3.4.7 #29 | 7 documentation | comment | module-federation | technological | weak | corroborates apps/shell/composables/useMfeLoader.ts:21; corroborates #8; corroborates #53; corroborates #62; corroborates #63; corroborates #64; corroborates #65 |
| 104 | 3.4.7 #30 | 7 documentation | comment | module-federation | technological | weak | corroborates apps/shell/composables/useMfeLoader.ts:31-35; corroborates apps/shell/nuxt.config.ts:58-91; corroborates #8 |
| 105 | 3.4.7 #31 | 7 documentation | comment | — | architectural | weak | corroborates #74; corroborates apps/shell/package.json:12-20 |
| 106 | 3.4.7 #32 | 7 documentation | comment | — | architectural | weak | corroborates packages/shared/src/registry.ts:5-9; corroborates #53 |
| 107 | 3.4.7 #33 | 7 documentation | comment | — | architectural | weak | corroborates package.json:26-30; corroborates scripts/dev-remote-server.js:32-53 |
| 108 | 3.4.7 #34 | 7 documentation | comment | — | architectural | weak | corroborates scripts/health-check.js:14-19, 38-64; corroborates package.json:25 |
| 109 | 3.4.7 #35 | 7 documentation | comment | — | context | weak | corroborates #7; corroborates #8; corroborates #9; corroborates #10 |
| 110 | 3.4.8 #1 | 8 history | history | — | context | weak | explains #6 |
| 111 | 3.4.8 #2 | 8 history | history | — | architectural | weak | explains #80 |
| 112 | 3.4.8 #3 | 8 history | history | module-federation | architectural | weak | explains #87; explains #89 |
| 113 | 3.4.8 #4 | 8 history | history | — | architectural | weak | explains #90 |

## Summary

Observations: 113. Dimensions (technology: 6, configuration: 4, code: 43, structure: 8, composition: 8, build-deploy: 5, documentation: 35, history: 4). Strength (strong: 9, moderate: 38, weak: 65, ambiguous: 1). Evidence (technological: 48, architectural: 50, context: 15).

