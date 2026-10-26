---
schema: 1
id: 1253620135
full_name: victorlmneves/_nuxt-monorepo-mfe-platform
commit: 84ffc2429b311b3c7565ffd35de4de48dafd5929
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

# 096 — victorlmneves/_nuxt-monorepo-mfe-platform

## Repository overview

A demonstration platform in a pnpm monorepo: `apps/shell` is the Nuxt 3 host and four Vue applications with webpack are Module Federation remotes, two in Vue 2 (checkout and admin) and two in Vue 3 (profile and dashboard). Each remote exposes a single `./App` module, its `bootstrap.js` with the `mount` and `unmount` functions (for example apps/mfe-vue2-checkout/webpack.config.js:66-69 and apps/mfe-vue2-checkout/src/bootstrap.js:32-55). The shell does not use `ModuleFederationPlugin`, as the comment in apps/shell/nuxt.config.ts:64-66 states. Instead, it implements the container consumption protocol manually: it reads the four descriptors from `MFE_REGISTRY` (packages/shared/src/registry.ts:12-61), injects the descriptor's `remoteEntry.js` through `<script>` (apps/shell/composables/useMfeLoader.ts:18, :52-64), obtains the container from `window[remoteName]`, calls `container.init({})` and `container.get('./App')` (apps/shell/composables/useMfeLoader.ts:21-40) and finally calls `mount(el, props)` (apps/shell/composables/useMfeLoader.ts:79-80). Hence the four loading relationships use the `module-federation` mechanism; script injection only transports `remoteEntry.js`.

The remote is selected by route: the catch-all page apps/shell/pages/app/[...mfe].vue searches the registry for the descriptor whose `route` prefixes the path (apps/shell/pages/app/[...mfe].vue:40-42), mounts it in the `div` at apps/shell/pages/app/[...mfe].vue:24 when the page opens (:44-50), and unmounts it on exit or logout (:52-62). The header remains with the shell (apps/shell/pages/app/[...mfe].vue:3). The home page only generates a `NuxtLink` for each registry route (apps/shell/pages/index.vue:13-15, :42); loading happens on the catch-all page. The registry and `RemoteMount` contract (packages/shared/src/types/index.ts:24-33) reside in `packages/shared`, which is not a unit in the structural review.

There is also window-event communication, becoming one `communication` relationship per remote. The shell sends `mfe:auth-changed` and `mfe:auth-logout` through the shared package's `broadcastLogin` and `broadcastLogout` functions (packages/shared/src/auth/index.ts:3-4, :10-24), called by the authentication store (apps/shell/stores/auth.ts:28, :34). All four remotes only listen, through `onAuthChanged` and `onAuthLogout` (packages/shared/src/auth/index.ts:28-43), inside their own `mount`. No remote sends those events.

What did not become a relationship: `import('./bootstrap')` and the call to `mount` in each `src/index.js` are each remote's standalone execution, internal to it (for example apps/mfe-vue2-checkout/src/index.js:1-18). The `user` and `onLogout` props passed by the shell in `mount` (apps/shell/pages/app/[...mfe].vue:46-49) are callbacks exchanged between units; the remotes declare `onLogout` as a prop (for example apps/mfe-vue2-admin/src/App.vue:74), but none calls it in the snapshot. Each remote declares `vue` as a `shared` singleton (for example apps/mfe-vue2-checkout/webpack.config.js:70-72), but the shell initializes containers with an empty scope (apps/shell/composables/useMfeLoader.ts:28-32), so no sharing is declared between host and remotes. As a deployment limitation already recorded in the classification, the remotes fix `output.publicPath` at `http://localhost:300x/` (for example apps/mfe-vue2-checkout/webpack.config.js:14), while the registry permits changing only the `remoteEntry.js` URL through an environment variable (packages/shared/src/registry.ts:5-9).

## Relationships

| # | Source | Target | Type | Direction | Mechanism | In snapshot | Active | Configuration | Code |
|---|---|---|---|---|---|---|---|---|---|
| 1 | apps/shell | apps/mfe-vue2-admin | host → remote | source → target | module-federation | Yes | Yes | packages/shared/src/registry.ts:26-35 (descriptor `admin`: route `/app/admin`, `remoteName: 'mfe_admin'`, `exposedModule: './App'`); packages/shared/src/registry.ts:5-9 (URL `localhost:3002/remoteEntry.js` without an environment variable); apps/mfe-vue2-admin/webpack.config.js:64-67 (`name: 'mfe_admin'`, `filename: 'remoteEntry.js'`, exposes `./App`); apps/mfe-vue2-admin/webpack.config.js:14 (`publicPath` `http://localhost:3002/`); apps/mfe-vue2-admin/webpack.config.js:75 (port 3002) | apps/shell/composables/useMfeLoader.ts:13; apps/shell/composables/useMfeLoader.ts:79; apps/mfe-vue2-admin/src/bootstrap.js:24; apps/mfe-vue2-admin/src/bootstrap.js:41; apps/shell/composables/useMfeLoader.ts:80; apps/shell/composables/useMfeLoader.ts:91; apps/shell/composables/useMfeLoader.ts:57; apps/shell/pages/app/[...mfe].vue:46; packages/shared/src/registry.ts:12 |
| 2 | apps/shell | apps/mfe-vue2-checkout | host → remote | source → target | module-federation | Yes | Yes | packages/shared/src/registry.ts:14-23 (descriptor `checkout`: route `/app/checkout`, `remoteName: 'mfe_checkout'`, `exposedModule: './App'`); packages/shared/src/registry.ts:5-9 (URL `localhost:3001/remoteEntry.js` without an environment variable); apps/mfe-vue2-checkout/webpack.config.js:66-69 (`name: 'mfe_checkout'`, `filename: 'remoteEntry.js'`, exposes `./App`); apps/mfe-vue2-checkout/webpack.config.js:14 (`publicPath` `http://localhost:3001/`); apps/mfe-vue2-checkout/webpack.config.js:77 (port 3001) | apps/shell/composables/useMfeLoader.ts:13; apps/shell/composables/useMfeLoader.ts:79; apps/mfe-vue2-checkout/src/bootstrap.js:32; apps/mfe-vue2-checkout/src/bootstrap.js:49; apps/shell/composables/useMfeLoader.ts:80; apps/shell/composables/useMfeLoader.ts:91; apps/shell/composables/useMfeLoader.ts:57; apps/shell/pages/app/[...mfe].vue:46; packages/shared/src/registry.ts:12 |
| 3 | apps/shell | apps/mfe-vue3-dashboard | host → remote | source → target | module-federation | Yes | Yes | packages/shared/src/registry.ts:50-59 (descriptor `dashboard`: route `/app/dashboard`, `remoteName: 'mfe_dashboard'`, `exposedModule: './App'`); packages/shared/src/registry.ts:5-9 (URL `localhost:3004/remoteEntry.js` without an environment variable); apps/mfe-vue3-dashboard/webpack.config.js:53-56 (`name: 'mfe_dashboard'`, `filename: 'remoteEntry.js'`, exposes `./App`); apps/mfe-vue3-dashboard/webpack.config.js:13 (`publicPath` `http://localhost:3004/`); apps/mfe-vue3-dashboard/webpack.config.js:65 (port 3004) | apps/shell/composables/useMfeLoader.ts:13; apps/shell/composables/useMfeLoader.ts:79; apps/mfe-vue3-dashboard/src/bootstrap.js:26; apps/mfe-vue3-dashboard/src/bootstrap.js:36; apps/shell/composables/useMfeLoader.ts:80; apps/shell/composables/useMfeLoader.ts:91; apps/shell/composables/useMfeLoader.ts:57; apps/shell/pages/app/[...mfe].vue:46; packages/shared/src/registry.ts:12 |
| 4 | apps/shell | apps/mfe-vue3-profile | host → remote | source → target | module-federation | Yes | Yes | packages/shared/src/registry.ts:38-47 (descriptor `profile`: route `/app/profile`, `remoteName: 'mfe_profile'`, `exposedModule: './App'`); packages/shared/src/registry.ts:5-9 (URL `localhost:3003/remoteEntry.js` without an environment variable); apps/mfe-vue3-profile/webpack.config.js:53-56 (`name: 'mfe_profile'`, `filename: 'remoteEntry.js'`, exposes `./App`); apps/mfe-vue3-profile/webpack.config.js:13 (`publicPath` `http://localhost:3003/`); apps/mfe-vue3-profile/webpack.config.js:65 (port 3003) | apps/shell/composables/useMfeLoader.ts:13; apps/shell/composables/useMfeLoader.ts:79; apps/mfe-vue3-profile/src/bootstrap.js:28; apps/mfe-vue3-profile/src/bootstrap.js:43; apps/shell/composables/useMfeLoader.ts:80; apps/shell/composables/useMfeLoader.ts:91; apps/shell/composables/useMfeLoader.ts:57; apps/shell/pages/app/[...mfe].vue:46; packages/shared/src/registry.ts:12 |
| 5 | apps/shell | apps/mfe-vue2-admin | communication | source → target | events | Yes | Yes | — | packages/shared/src/auth/index.ts:14; packages/shared/src/auth/index.ts:22 |
| 6 | apps/shell | apps/mfe-vue2-checkout | communication | source → target | events | Yes | Yes | — | packages/shared/src/auth/index.ts:14; packages/shared/src/auth/index.ts:22 |
| 7 | apps/shell | apps/mfe-vue3-dashboard | communication | source → target | events | Yes | Yes | — | packages/shared/src/auth/index.ts:14; packages/shared/src/auth/index.ts:22 |
| 8 | apps/shell | apps/mfe-vue3-profile | communication | source → target | events | Yes | Yes | — | packages/shared/src/auth/index.ts:14; packages/shared/src/auth/index.ts:22 |

## Observations

**1. apps/shell → apps/mfe-vue2-admin.** The `admin` descriptor (packages/shared/src/registry.ts:26-35) requests container `mfe_admin` and module `./App`, matching `name: 'mfe_admin'` and `exposes` in apps/mfe-vue2-admin/webpack.config.js:64-67; the default `http://localhost:3002/remoteEntry.js` URL (packages/shared/src/registry.ts:31, :9) matches `filename`, `publicPath` (apps/mfe-vue2-admin/webpack.config.js:14) and the `devServer` port (apps/mfe-vue2-admin/webpack.config.js:75), which only corroborate. The shell imports nothing from the remote by name: the generic loader lines (apps/shell/composables/useMfeLoader.ts:13, :57, :79, :80, :91), page line (apps/shell/pages/app/[...mfe].vue:46) and registry line (packages/shared/src/registry.ts:12) apply to all four remotes and therefore appear in relationships 1 to 4; the descriptor and `mount`/`unmount` in apps/mfe-vue2-admin/src/bootstrap.js:24 and :41 are specific to this relationship. Both lines appear twice in the source code review (`src-mount-export` and `src-mount-call`) and enter once here. The relationship is active: the `/app/admin` route leads to the page calling `mountMfe` with the found descriptor (apps/shell/pages/app/[...mfe].vue:40-49).

**2. apps/shell → apps/mfe-vue2-checkout.** The same form as relationship 1: descriptor `checkout` with `mfe_checkout` and `./App` (packages/shared/src/registry.ts:14-23), resolved through apps/mfe-vue2-checkout/webpack.config.js:66-69, with `publicPath` and port 3001 (apps/mfe-vue2-checkout/webpack.config.js:14, :77). The exported `mount` and `unmount` reside in apps/mfe-vue2-checkout/src/bootstrap.js:32 and :49; `mount` creates the Vue 2 instance with Vuetify and renders checkout's `App.vue` on the shell element (apps/mfe-vue2-checkout/src/bootstrap.js:40-46).

**3. apps/shell → apps/mfe-vue3-dashboard.** Descriptor `dashboard` with `mfe_dashboard` and `./App` (packages/shared/src/registry.ts:50-59), resolved through apps/mfe-vue3-dashboard/webpack.config.js:53-56, with `publicPath` and port 3004 (apps/mfe-vue3-dashboard/webpack.config.js:13, :65). `mount` and `unmount` in apps/mfe-vue3-dashboard/src/bootstrap.js:26 and :36; here `mount` uses Vue 3's `createApp` (apps/mfe-vue3-dashboard/src/bootstrap.js:31-33). The shell handles Vue 2 and Vue 3 remotes identically, solely through the `RemoteMount` contract (packages/shared/src/types/index.ts:25-28).

**4. apps/shell → apps/mfe-vue3-profile.** Descriptor `profile` with `mfe_profile` and `./App` (packages/shared/src/registry.ts:38-47), resolved through apps/mfe-vue3-profile/webpack.config.js:53-56, with `publicPath` and port 3003 (apps/mfe-vue3-profile/webpack.config.js:13, :65). `mount` and `unmount` in apps/mfe-vue3-profile/src/bootstrap.js:28 and :43, with `createApp` at :38-40.

**5. apps/shell → apps/mfe-vue2-admin (communication).** Both source code review lines are in `packages/shared`, which is not a unit; the sender is the shell, calling `broadcastLogin` during session synchronization (apps/shell/stores/auth.ts:28, called on every authenticated navigation by apps/shell/middleware/auth.global.ts:10-11) and `broadcastLogout` on logout (apps/shell/stores/auth.ts:34). Admin receives by subscribing to `onAuthChanged` and `onAuthLogout` in its `mount` (apps/mfe-vue2-admin/src/bootstrap.js:27-30): the former updates the instance's user, the latter unmounts the remote itself. Admin sends no events, so direction is `source → target`. The channel resides entirely in code, with event names in packages/shared/src/auth/index.ts:3-4, and no configuration declaration connects the two units through it; hence Configuration is `—`.

**6. apps/shell → apps/mfe-vue2-checkout (communication).** The same as relationship 5: checkout subscribes to both events in apps/mfe-vue2-checkout/src/bootstrap.js:35-38 and only receives.

**7. apps/shell → apps/mfe-vue3-dashboard (communication).** The same as relationship 5: dashboard subscribes to both events in apps/mfe-vue3-dashboard/src/bootstrap.js:29-30, updating the user's `ref`, and only receives.

**8. apps/shell → apps/mfe-vue3-profile (communication).** The same as relationship 5: profile subscribes to both events in apps/mfe-vue3-profile/src/bootstrap.js:33-36 and only receives.

## Summary

Relationships: 8 (host → remote: 4, communication: 4). Active: 8. Target outside the snapshot: 0.
Units without a relationship: none.

