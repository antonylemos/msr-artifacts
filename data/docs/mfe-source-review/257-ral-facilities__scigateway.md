---
schema: 1
id: 175218500
full_name: ral-facilities/scigateway
commit: fadb600e1fa4c8a64daefbf8f2541998e559979c
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 257 — ral-facilities/scigateway

## Mined constructs

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| src-remote-import | vite.config.ts:28 | . | none | No | `await import('vitest/config')` in the Vite configuration file, only outside production, to read `coverageConfigDefaults.exclude` (vite.config.ts:24-32); build/test configuration, does not load another unit. |
| src-lifecycles | server/e2e-plugin/main.js:9 | . | runtime-composition | No | Text of `single-spa-react` (`singleSpaReact(opts)`) inside the demo plugin’s compiled UMD bundle, an artifact from another repository (server/README.md:3); the file is served only by the e2e test server (server/e2e-test-server.js:16-20, server/e2e-settings.json:10) and used by no host build (entry index.html:32). |
| src-lifecycles | src/state/actions/loadMicroFrontends.tsx:31 | . | runtime-composition | Yes | `singleSpa.registerApplication(name, () => loadReactApp(name), activityFn)` registers each enabled plugin from `settings.json` (loadMicroFrontends.tsx:52-60), with the lifecycle object read from `window[name]` (loadMicroFrontends.tsx:19-23) and activation through routes registered by the plugin in `singleSpaPluginRoutes` (loadMicroFrontends.tsx:34-48; populated at src/state/reducers/scigateway.reducer.tsx:140-145). Active: `loadMicroFrontends.init(settings.plugins)` at src/state/actions/scigateway.actions.tsx:363, within `configureSite` dispatched at src/App.tsx:50. Target: external plugins (for example: `demo_plugin`, public/settings.example.json:17-18). |
| src-dynamic-script | src/cookieConsent/cookieConsent.component.test.tsx:104 | . | none | No | `createElement('script')` in the expected result of a cookie component test; test file. |
| src-dynamic-script | src/cookieConsent/cookieConsent.component.test.tsx:108 | . | none | No | Second expected script in the same test; test file. |
| src-dynamic-script | src/cookieConsent/cookieConsent.component.tsx:54 | . | none | No | Injects the Google Analytics script (`https://www.googletagmanager.com/gtag/js?id=...`, cookieConsent.component.tsx:53-56) after consent; third-party library rather than another unit. |
| src-dynamic-script | src/cookieConsent/cookieConsent.component.tsx:58 | . | none | No | Inline `gtag` configuration script (cookieConsent.component.tsx:58-60); not composition. |
| src-dynamic-script | src/state/actions/loadMicroFrontends.tsx:9 | . | script-loading | Yes | `runScript` creates a `<script src=url>` and appends it to `body` (loadMicroFrontends.tsx:7-16); called by `loadApp` with each plugin’s `src` (loadMicroFrontends.tsx:27-28, 60) before `registerApplication`. Target: external plugin bundles (for example: `http://localhost:5001/main.js`, public/settings.example.json:18). |
| src-html-external-script | index.html:18 | . | none | No | `<script src="https://unpkg.com/react@18/umd/react.production.min.js">`, with local fallback (index.html:19-22); loads a CDN library rather than another unit’s bundle. The demo plugin’s UMD bundle reads `React` from global scope (server/e2e-plugin/main.js:1, `N(k.demo_plugin={},k.React,k.ReactDOM)`); see Notes. |
| src-html-external-script | index.html:23 | . | none | No | The same case for `react-dom@18` UMD, with local fallback (index.html:24-29); CDN library. |
| src-iframe | src/accessibilityPage/contactUs.component.tsx:45 | . | none | No | `<iframe title="Contact Us" src={props.contactUsAccessibilityFormUrl}>` embeds a contact form configured in settings (contactUs.component.tsx:42-51); not another frontend unit. |
| src-cross-unit-communication | server/e2e-plugin/main.js:20 | . | communication | No | `document.dispatchEvent(new CustomEvent("scigateway", ...))` from the demo plugin (`register_route`, `notification`, `invalidate_token`) in another repository’s compiled bundle; file used only by the e2e test server (server/e2e-test-server.js:16-20) and no host build. |
| src-cross-unit-communication | src/App.test.tsx:110 | . | none | No | `document.dispatchEvent` in an `App` test; test file. |
| src-cross-unit-communication | src/App.test.tsx:111 | . | none | No | `new CustomEvent('scigateway', ...)` in the same test; test file. |
| src-cross-unit-communication | src/authentication/baseAPIAuthProvider.tsx:35 | . | communication | No | Dispatches `NotificationType` on channel `scigateway` when OIDC configuration fails (baseAPIAuthProvider.tsx:31-45); handled by the host itself, in `listenToPlugins` (src/state/middleware/scigateway.middleware.tsx:166-188, toast/Redux). Internal use of the channel by the unit. |
| src-cross-unit-communication | src/authentication/baseAPIAuthProvider.tsx:36 | . | communication | No | `new CustomEvent('scigateway', { detail: { type: NotificationType ... } })` from the same dispatch (baseAPIAuthProvider.tsx:36-44); consumed by the host itself. |
| src-cross-unit-communication | src/authentication/baseAPIAuthProvider.tsx:63 | . | communication | No | `NotificationType` when fetching OIDC providers fails (baseAPIAuthProvider.tsx:61-74); consumed by the host itself (scigateway.middleware.tsx:166-188). |
| src-cross-unit-communication | src/authentication/baseAPIAuthProvider.tsx:64 | . | communication | No | `new CustomEvent` from the same dispatch (baseAPIAuthProvider.tsx:64-73); consumed by the host itself. |
| src-cross-unit-communication | src/authentication/baseAPIAuthProvider.tsx:160 | . | communication | No | `NotificationType` when OIDC `state` verification fails (baseAPIAuthProvider.tsx:159-171); consumed by the host itself (scigateway.middleware.tsx:166-188). |
| src-cross-unit-communication | src/authentication/baseAPIAuthProvider.tsx:161 | . | communication | No | `new CustomEvent` from the same dispatch (baseAPIAuthProvider.tsx:161-170); consumed by the host itself. |
| src-cross-unit-communication | src/authentication/baseAPIAuthProvider.tsx:192 | . | communication | No | `NotificationType` when OIDC nonce verification fails (baseAPIAuthProvider.tsx:191-203); consumed by the host itself (scigateway.middleware.tsx:166-188). |
| src-cross-unit-communication | src/authentication/baseAPIAuthProvider.tsx:193 | . | communication | No | `new CustomEvent` from the same dispatch (baseAPIAuthProvider.tsx:193-202); consumed by the host itself. |
| src-cross-unit-communication | src/authentication/baseAuthProvider.tsx:61 | . | communication | Yes | `logOut()` dispatches `BroadcastSignOutType` (`scigateway:api:signout`, src/state/scigateway.types.tsx:28) on channel `scigateway` (baseAuthProvider.tsx:57-64); the host ignores this type in its listener (src/state/middleware/scigateway.middleware.tsx:111-112), so the destination is plugins listening to the channel. Target: external plugins. |
| src-cross-unit-communication | src/authentication/baseAuthProvider.tsx:62 | . | communication | Yes | `new CustomEvent('scigateway', { detail: { type: BroadcastSignOutType } })` from the same logout notification to plugins (baseAuthProvider.tsx:61-63). |
| src-cross-unit-communication | src/authentication/icatAuthProvider.tsx:17 | . | communication | No | `NotificationType` when fetching ICAT authenticators fails (icatAuthProvider.tsx:15-28); consumed by the host itself (src/state/middleware/scigateway.middleware.tsx:166-188). |
| src-cross-unit-communication | src/authentication/icatAuthProvider.tsx:18 | . | communication | No | `new CustomEvent` from the same dispatch (icatAuthProvider.tsx:18-27); consumed by the host itself. |
| src-cross-unit-communication | src/state/actions/loadMicroFrontends.tsx:67 | . | communication | No | `NotificationType` when plugin loading fails (loadMicroFrontends.tsx:64-78); the host itself shows the error (src/state/middleware/scigateway.middleware.tsx:166-188). |
| src-cross-unit-communication | src/state/actions/loadMicroFrontends.tsx:68 | . | communication | No | `new CustomEvent('scigateway', ...)` from the same dispatch (loadMicroFrontends.tsx:68-77); consumed by the host itself. |
| src-cross-unit-communication | src/state/actions/scigateway.actions.test.tsx:457 | . | none | No | `new CustomEvent('test', ...)` passed to a handler in a test; test file. |
| src-cross-unit-communication | src/state/actions/scigateway.actions.tsx:465 | . | communication | No | `displayMaintenanceBanner` dispatches `NotificationType` on channel `scigateway` (scigateway.actions.tsx:460-477) for the maintenance banner; consumed by the host itself (src/state/middleware/scigateway.middleware.tsx:166-188). |
| src-cross-unit-communication | src/state/actions/scigateway.actions.tsx:466 | . | communication | No | `new CustomEvent('scigateway', ...)` from the same dispatch (scigateway.actions.tsx:466-475); consumed by the host itself. |
| src-cross-unit-communication | src/state/middleware/scigateway.middleware.test.tsx:369 | . | none | No | `new CustomEvent('test', ...)` passed to the handler in a test; test file. |
| src-cross-unit-communication | src/state/middleware/scigateway.middleware.test.tsx:379 | . | none | No | Same, test file. |
| src-cross-unit-communication | src/state/middleware/scigateway.middleware.test.tsx:407 | . | none | No | Same, test file. |
| src-cross-unit-communication | src/state/middleware/scigateway.middleware.test.tsx:424 | . | none | No | Same, test file. |
| src-cross-unit-communication | src/state/middleware/scigateway.middleware.test.tsx:459 | . | none | No | Same, test file. |
| src-cross-unit-communication | src/state/middleware/scigateway.middleware.test.tsx:495 | . | none | No | Same, test file. |
| src-cross-unit-communication | src/state/middleware/scigateway.middleware.test.tsx:529 | . | none | No | Same, test file. |
| src-cross-unit-communication | src/state/middleware/scigateway.middleware.test.tsx:553 | . | none | No | Same, test file. |
| src-cross-unit-communication | src/state/middleware/scigateway.middleware.test.tsx:572 | . | none | No | Same, test file. |
| src-cross-unit-communication | src/state/middleware/scigateway.middleware.test.tsx:590 | . | none | No | Same, test file. |
| src-cross-unit-communication | src/state/middleware/scigateway.middleware.test.tsx:609 | . | none | No | Same, test file. |
| src-cross-unit-communication | src/state/middleware/scigateway.middleware.test.tsx:628 | . | none | No | Same, test file. |
| src-cross-unit-communication | src/state/middleware/scigateway.middleware.test.tsx:647 | . | none | No | Same, test file. |
| src-cross-unit-communication | src/state/middleware/scigateway.middleware.test.tsx:666 | . | none | No | Same, test file. |
| src-cross-unit-communication | src/state/middleware/scigateway.middleware.test.tsx:687 | . | none | No | Same, test file. |
| src-cross-unit-communication | src/state/middleware/scigateway.middleware.test.tsx:700 | . | none | No | Same, test file. |
| src-cross-unit-communication | src/state/middleware/scigateway.middleware.test.tsx:708 | . | none | No | Same, test file. |
| src-cross-unit-communication | src/state/middleware/scigateway.middleware.test.tsx:725 | . | none | No | Same, test file. |
| src-cross-unit-communication | src/state/middleware/scigateway.middleware.test.tsx:742 | . | none | No | Same, test file. |
| src-cross-unit-communication | src/state/middleware/scigateway.middleware.tsx:34 | . | communication | Yes | `broadcastToPlugins` defines sending Redux actions to plugins through channel `scigateway` (`microFrontendMessageId`, scigateway.middleware.tsx:31-37), used by `ScigatewayMiddleware` for every action with `payload.broadcast` (scigateway.middleware.tsx:242-244). The same channel receives plugin messages in `listenToPlugins` (`document.addEventListener(microFrontendMessageId, handler)`, scigateway.middleware.tsx:232), registered at src/App.tsx:47. Target: external plugins. |
| src-cross-unit-communication | src/state/middleware/scigateway.middleware.tsx:35 | . | communication | Yes | `new CustomEvent(microFrontendMessageId, { detail: action })` from the same `broadcastToPlugins` (scigateway.middleware.tsx:34-36). |
| src-cross-unit-communication | src/state/middleware/scigateway.middleware.tsx:193 | . | communication | Yes | After token `refresh()` requested by a plugin (`InvalidateTokenType`, scigateway.middleware.tsx:189-192), dispatches `TokenRefreshedType` on the channel (scigateway.middleware.tsx:193-199); the host ignores this type in its own listener (scigateway.middleware.tsx:108-109), so the destination is plugins. |
| src-cross-unit-communication | src/state/middleware/scigateway.middleware.tsx:194 | . | communication | Yes | `new CustomEvent(microFrontendMessageId, { detail: { type: TokenRefreshedType } })` from the same notification to plugins (scigateway.middleware.tsx:194-198). |
| src-cross-unit-communication | src/state/middleware/scigateway.middleware.tsx:205 | . | communication | No | If refresh fails, resends on the channel the notification received from the plugin as `NotificationType` (scigateway.middleware.tsx:201-213); handled by the host itself (scigateway.middleware.tsx:166-188). |
| src-cross-unit-communication | src/state/middleware/scigateway.middleware.tsx:206 | . | communication | No | `new CustomEvent` from the same dispatch (scigateway.middleware.tsx:206-211); consumed by the host itself. |
| src-cross-unit-communication | src/state/middleware/scigateway.middleware.tsx:302 | . | communication | No | `autoLoginMiddleware` dispatches `NotificationType` when auto-login fails (scigateway.middleware.tsx:299-312); consumed by the host itself (scigateway.middleware.tsx:166-188). |
| src-cross-unit-communication | src/state/middleware/scigateway.middleware.tsx:303 | . | communication | No | `new CustomEvent` from the same dispatch (scigateway.middleware.tsx:303-311); consumed by the host itself. |

## Constructs outside mining

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| manual | src/state/actions/scigateway.actions.tsx:391 | . | runtime-composition | Yes | `singleSpa.start()` starts single-spa, which mounts registered plugins whose route is active, after `loadMicroFrontends.init` (scigateway.actions.tsx:363-367). This call is in the `handler` of channel `scigateway`, when the current URL belongs neither to the host nor a known plugin and a plugin’s `RegisterRouteType` arrives for it (scigateway.actions.tsx:371-394). Active from `configureSite` (src/App.tsx:50). |
| manual | src/state/actions/scigateway.actions.tsx:401 | . | runtime-composition | Yes | `singleSpa.start()` in the same case’s 3 s `setTimeout` (scigateway.actions.tsx:396-403): if no plugin registered the current URL’s route in time, removes the `handler` and starts single-spa anyway, mounting the registered plugins. Active from `configureSite` (src/App.tsx:50). |
| manual | src/state/actions/scigateway.actions.tsx:408 | . | runtime-composition | Yes | `singleSpa.start()` in the `else` branch (scigateway.actions.tsx:406-409), when the current URL belongs to the host, maintenance or an already known plugin; starts single-spa directly without waiting for `RegisterRouteType`. Active from `configureSite` (src/App.tsx:50). |
| manual | src/state/middleware/scigateway.middleware.tsx:156 | . | runtime-composition | Yes | On receiving `RegisterRouteType` from a plugin, if the current URL matches the registered route and the plugin is `NOT_LOADED`, calls `singleSpa.triggerAppChange()` so single-spa loads and mounts the plugin (scigateway.middleware.tsx:149-157). |
| manual | src/routing/routing.component.tsx:165 | . | runtime-composition | Yes | `singleSpa.unloadApplication(pluginConf.plugin)` forces single-spa to reload a plugin whose container still shows the preloader (routing.component.tsx:148-174). |
| manual | src/routing/routing.component.tsx:268 | . | host-relationship | Yes | Host route table for registered plugins: each `plugin.link` becomes a `<Route>` whose element is container `<div id={plugin.plugin}>` (`PluginPlaceHolder`, routing.component.tsx:113-124) where single-spa mounts the plugin (routing.component.tsx:263-280); `props.plugins` comes from state (routing.component.tsx:289), populated by plugins’ `RegisterRouteType` messages. Active: `Routing` at src/pageContainer.component.tsx:50. |
| manual | src/adminPage/adminPage.component.tsx:132 | . | host-relationship | Yes | Routes of plugin administration tabs: for each plugin and tab (`getAdminPluginRoutes`, adminPage.component.tsx:25-50), a `<Route>` with `<PluginPlaceHolder id={pluginName} />` (adminPage.component.tsx:130-149); the page is routed at src/routing/routing.component.tsx:205-208. |

## Summary

Constructs participating in composition: 15 (runtime-composition: 6, script-loading: 1, communication: 6, host-relationship: 2).

## Notes

- Channel `scigateway` (`CustomEvent` on `document`) is the bus between host and plugins. Host dispatches with `NotificationType` were annotated `No` because the consumer is the host’s own `listenToPlugins` (src/state/middleware/scigateway.middleware.tsx:166-188), which shows the toast and writes to Redux; dispatches of types ignored by the host in its own listener (`BroadcastSignOutType`, `TokenRefreshedType`, scigateway.middleware.tsx:108-112) and `broadcastToPlugins` were annotated `Yes`. Plugins outside the snapshot may also listen for notifications, but no opened code shows this: the demo plugin only reacts to `plugin_rerender` (server/e2e-plugin/main.js:20).
- Channel subscriptions (`document.addEventListener(microFrontendMessageId, handler)` at scigateway.middleware.tsx:232 and `document.addEventListener('scigateway', handler)` at src/state/actions/scigateway.actions.tsx:405) did not match `src-cross-unit-communication` because the event name is variable or lacks `[A-Z:_-]`; they do not become rows because they are usage points of the already recorded mechanism.
- `index.html:18` and `index.html:23` load React and ReactDOM UMD from a CDN, unused by the host (Vite bundles React, vite.config.ts:35-54 without `external`), but expected in global scope by the plugin’s UMD bundle (server/e2e-plugin/main.js:1). Annotated `none` as a CDN library; this is a global shared dependency mechanism.
- Plugins are declared in runtime `settings.json` (public/settings.example.json:15-22, `enable: false`; server/e2e-settings.json:7-14 for e2e tests); JSON configuration files did not become rows. Target units (plugins) are outside the snapshot.
- `server/e2e-plugin/main.js` is the demo plugin’s compiled bundle from another repository (server/README.md:3), served only in e2e tests; its rows were annotated `No`.
