---
schema: 1
id: 175218500
full_name: ral-facilities/scigateway
commit: fadb600e1fa4c8a64daefbf8f2541998e559979c
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

# 257 — ral-facilities/scigateway

## Repository overview

SciGateway is the production parent application of a set of plugins from a scientific facilities organization. The snapshot has a single unit (`.`), a React + Vite application acting simultaneously as single-spa root-config and visual shell (authentication, menu, notifications, administration). Plugins are not in the repository: they are listed at runtime in `settings.json` (a `plugins` list with `name`, `src`, `enable`), and the host loads them individually. For each enabled plugin it injects a `<script src>` with the bundle (src/state/actions/loadMicroFrontends.tsx:7-16, 27-28, 56-60), reads lifecycles from the global of the same name (src/state/actions/loadMicroFrontends.tsx:19-23) and registers the plugin with `singleSpa.registerApplication` (src/state/actions/loadMicroFrontends.tsx:31-49). Loading begins in `configureSite` (src/state/actions/scigateway.actions.tsx:361-365), dispatched at initialization (src/App.tsx:50), and `singleSpa.start()` follows loading all plugins (src/state/actions/scigateway.actions.tsx:367-410).

The repository's distinctive feature is that each plugin defines its own route activation. The host does not know routes beforehand: each plugin sends `scigateway:api:register_route` through the `CustomEvent` channel `scigateway` on `document`; the host handles the message in `listenToPlugins` (src/state/middleware/scigateway.middleware.tsx:87-98, 114-164, 232), writes the prefix into `singleSpaPluginRoutes` (src/state/reducers/scigateway.reducer.tsx:140-145), which the activity function compares against `location.pathname` (src/state/actions/loadMicroFrontends.tsx:34-48), and creates the `<Route>` elements whose element is container `<div id={plugin}>` where single-spa mounts the plugin (src/routing/routing.component.tsx:113-124, 263-280; src/adminPage/adminPage.component.tsx:130-149 for administration tabs). The same channel carries messages from host to plugins (actions with `payload.broadcast`, such as `plugin_rerender` and `send_themeoptions`, src/state/middleware/scigateway.middleware.tsx:33-37, 242-244; src/state/actions/scigateway.actions.tsx:575-592; logout and refreshed-token notices) and from plugins to host (route, notification, token-refresh request). There are also robustness mechanisms: waiting up to 3 s for `register_route` before starting single-spa when the URL belongs to a still-unknown plugin (src/state/actions/scigateway.actions.tsx:368-405), `triggerAppChange` when the route arrives late (src/state/middleware/scigateway.middleware.tsx:148-157), and `unloadApplication` when the container is stuck in the preloader (src/routing/routing.component.tsx:148-174).

The only plugin named in the snapshot is `demo_plugin`: in `public/settings.example.json:15-22` it points to `http://localhost:5001/main.js` with `enable: false`, and in `server/e2e-settings.json:7-14` it points to `/plugins/e2e-plugin/main.js` with `enable: true`, served by the e2e test server (server/e2e-test-server.js:8-10, 16-20). The served file, `server/e2e-plugin/main.js`, is the build copied from the demonstration plugin's repository (server/README.md:3-9), not source: it creates global `demo_plugin` (server/e2e-plugin/main.js:1), assigns it `bootstrap`/`mount`/`unmount` (server/e2e-plugin/main.js:20) and, also on line 20, sends `register_route` with `plugin:"demo_plugin"` and `invalidate_token` and listens to `plugin_rerender` (server/e2e-plugin/main.js:20). Actual `settings.json` files remain outside Git (.gitignore:34-35). `index.html` loads UMD React and ReactDOM from CDN (index.html:18-29), unused by the host but read by the plugin's UMD bundle from the global (server/e2e-plugin/main.js:1): a dependency shared through globals, not an inter-unit relationship. `micro-frontend-tools/` is only a development script serving local plugin builds on their own ports (micro-frontend-tools/serve-plugins.js:37-59; micro-frontend-tools/dev-plugin-settings.example.json:1-14), without naming a unit.

What did not become a relationship: `NotificationType` firings on the channel made and consumed by the host itself (annotated `No` in the source code review, handled in src/state/middleware/scigateway.middleware.tsx:166-188), the contact form `<iframe>` and Google Analytics scripts, which are not units.

## Relationships

| # | Source | Target | Type | Direction | Mechanism | In snapshot | Active | Configuration | Code |
|---|---|---|---|---|---|---|---|---|---|
| 1 | . | demo_plugin | root-config → application | source → target | single-spa | No | Yes | public/settings.example.json:15-22 (`plugins`: `demo_plugin`, `src` `http://localhost:5001/main.js`, `enable: false`); server/e2e-settings.json:7-14 (`plugins`: `demo_plugin`, `src` `/plugins/e2e-plugin/main.js`, `enable: true`) | src/state/actions/loadMicroFrontends.tsx:31; src/state/actions/loadMicroFrontends.tsx:9; src/state/actions/scigateway.actions.tsx:391; src/state/actions/scigateway.actions.tsx:401; src/state/actions/scigateway.actions.tsx:408; src/state/middleware/scigateway.middleware.tsx:156; src/routing/routing.component.tsx:165; src/routing/routing.component.tsx:268; src/adminPage/adminPage.component.tsx:132 |
| 2 | . | demo_plugin | communication | bidirectional | events | No | Yes | — | src/authentication/baseAuthProvider.tsx:61; src/authentication/baseAuthProvider.tsx:62; src/state/middleware/scigateway.middleware.tsx:34; src/state/middleware/scigateway.middleware.tsx:35; src/state/middleware/scigateway.middleware.tsx:193; src/state/middleware/scigateway.middleware.tsx:194 |

## Observations

**1. . → demo_plugin.** Registration is generic for every enabled plugin in `settings.json` (src/state/actions/loadMicroFrontends.tsx:56-60); the target is the only name appearing in snapshot configurations, `demo_plugin` (public/settings.example.json:17; server/e2e-settings.json:9). This is a mixed relationship, with `<script>` loading (src/state/actions/loadMicroFrontends.tsx:9) and reading the global (src/state/actions/loadMicroFrontends.tsx:22), but the target enters the host registered in the orchestrator (src/state/actions/loadMicroFrontends.tsx:31-49), hence `root-config → application` and `single-spa`. In snapshot = `No`: the plugin is built in another repository (server/README.md:3), and `server/e2e-plugin/main.js` present in the tree is only the compiled artifact, not listed as a unit by the structural review. Active = `Yes` through the nine `Yes` source code review lines: loading and registration, all three `singleSpa.start()` calls (src/state/actions/scigateway.actions.tsx:391, 401, 408), `triggerAppChange` (src/state/middleware/scigateway.middleware.tsx:156), `unloadApplication` (src/routing/routing.component.tsx:165) and host and administration container routes (src/routing/routing.component.tsx:268; src/adminPage/adminPage.component.tsx:132). In the example the plugin is disabled; only e2e configuration enables it. Activation depends on routes sent by the plugin (relationship 2), without which the activity function returns `false` (src/state/actions/loadMicroFrontends.tsx:45-47).

**2. . ↔ demo_plugin.** The channel is `CustomEvent` `scigateway` on `document` (src/state/middleware/scigateway.middleware.tsx:31). From host to plugin, the `Yes` source code review lines are the logout notice (`scigateway:api:signout`, src/authentication/baseAuthProvider.tsx:61-63), `broadcastToPlugins` for actions with `payload.broadcast` (src/state/middleware/scigateway.middleware.tsx:33-37, 242-244), including `plugin_rerender` and `send_themeoptions` (src/state/actions/scigateway.actions.tsx:575-592), and the refreshed-token notice (src/state/middleware/scigateway.middleware.tsx:193-199); the host ignores those types in its own listener (src/state/middleware/scigateway.middleware.tsx:100-112). From plugin to host, listener `listenToPlugins` accepts only `scigateway:api:` messages and handles `register_route`, `notification` and `invalidate_token` (src/state/middleware/scigateway.middleware.tsx:94-98, 114-215, 232), and the demonstration plugin's bundle sends `register_route` and `invalidate_token` and listens to `plugin_rerender` (server/e2e-plugin/main.js:20). Hence Direction = `bidirectional`, with Source and Target in alphabetical order. Plugin sending appears only in the compiled artifact, annotated `No` in the source code review, and does not enter Code; host reception of `register_route` (src/state/middleware/scigateway.middleware.tsx:156) belongs to relationship 1. In snapshot = `No` for the same reason as relationship 1; Configuration = `—`, because the channel is fixed in code.

## Summary

Relationships: 2 (root-config → application: 1, communication: 1). Active: 2. Target outside the snapshot: 2.
Units without a relationship: none.

