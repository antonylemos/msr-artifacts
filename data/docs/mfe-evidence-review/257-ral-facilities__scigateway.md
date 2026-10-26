---
schema: 1
id: 175218500
full_name: ral-facilities/scigateway
commit: fadb600e1fa4c8a64daefbf8f2541998e559979c
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

# 257 — ral-facilities/scigateway

## Repository overview

Snapshot contains single source frontend unit: SciGateway host, React + Vite, with own entry/build/image (#69, #72). Single-spa dependency (#1) used in parameterized plugin registration (#6). Configurations name `demo_plugin`: example disables it (#3), e2e settings enables it at `/plugins/e2e-plugin/main.js` (#2). Relationship #70 combines script loading, global lifecycle reading, single-spa registration, activation through plugin-supplied routes and shell containers. Plugin built in another repository; included bundle serves e2e tests without becoming another structural source unit.

Communication uses `CustomEvent` on channel `scigateway` (#71): host sends actions/notices; plugins send routes, notifications and token-renewal requests. Two route tables link paths to plugin containers (#67, #68). Generic calls receiving names/URLs as parameters support mechanism; concrete unit identity comes from configurations/relationships. Evidence describes artifacts without executing build, tests or deployment.

Coverage imports, analytics scripts, CDN React libraries, contact iframe, test constructs and host-consumed notifications establish no other units/composition relationships. External bundle rows retain scope `Composition No` recorded in 3.4.4, although content contextualizes plugin contract. Documentation locates parent application (#77), corroborating mechanisms, but statements weak. Store/`globalEventDistributor` passing comment contradicted (#89); store, administrative subroute and external settings claims partially corroborated (#90, #84, #95). Historical points (#97–#99) do not conclusively explain origins because old contents unavailable, without leaving demonstrated snapshot host–plugin composition open.

## Observations

### 1. package.json:50

**Observation:** Manifest declares `single-spa` in `dependencies`, version `6.0.3`.

**Interpretation:** Declaration signals single-spa technology; usage/plugin links require code/configuration artifacts.

### 2. server/e2e-settings.json:7-14

**Observation:** List `plugins` contains `demo_plugin`, with `src: /plugins/e2e-plugin/main.js`, `enable: true` and `location: main`.

**Interpretation:** E2e test runtime configuration names external host unit and bundle-loading address.

### 3. public/settings.example.json:15-22

**Observation:** List `plugins` contains `demo_plugin`, with `src: http://localhost:5001/main.js`, `enable: false` and `location: main`.

**Interpretation:** Example declares host link to URL-served plugin. Plugin disabled in example; declaration does not demonstrate production activation.

### 4. vite.config.ts:28; vite.config.ts:24-32

**Observation:** Outside production configuration imports `vitest/config` to obtain `coverageConfigDefaults.exclude`.

**Interpretation:** Dynamic import serves test coverage without loading frontend unit.

### 5. server/e2e-plugin/main.js:9; server/README.md:3; server/e2e-test-server.js:16-20

**Observation:** Demonstration plugin UMD bundle contains `single-spa-react` implementation and `singleSpaReact(opts)`.

**Interpretation:** Compiled artifact from another repository served in e2e tests. Review 3.4.4 marks construct Composition No because not part of host build; observation preserves scope.

### 6. src/state/actions/loadMicroFrontends.tsx:31; src/state/actions/loadMicroFrontends.tsx:19-23; src/state/actions/loadMicroFrontends.tsx:27-60; src/state/actions/scigateway.actions.tsx:361-365; src/state/reducers/scigateway.reducer.tsx:140-145; src/App.tsx:50

**Observation:** `loadApp(name, appURL)` registers `name` in single-spa, obtains lifecycles from `window[name]` and compares URL to `singleSpaPluginRoutes[name]` routes; `init` iterates enabled plugins received from `settings.plugins`.

**Interpretation:** Code implements single-spa plugin registration/activation with parameter-supplied identity. Configuration identifies concrete target.

### 7. src/cookieConsent/cookieConsent.component.test.tsx:104-106

**Observation:** Test creates `script` element as expected result for Google Analytics library loading.

**Interpretation:** Test construct recorded by source review without runtime composition participation.

### 8. src/cookieConsent/cookieConsent.component.test.tsx:108-113

**Observation:** Test creates `script` element as expected result for inline `gtag` configuration.

**Interpretation:** Test construct recorded by source review without runtime composition participation.

### 9. src/cookieConsent/cookieConsent.component.tsx:45-65

**Observation:** After consent component injects script with URL `https://www.googletagmanager.com/gtag/js?id=...`.

**Interpretation:** Analytics integration without composing another frontend unit.

### 10. src/cookieConsent/cookieConsent.component.tsx:45-66

**Observation:** After consent component creates inline script to configure `gtag`.

**Interpretation:** Analytics integration without composing another frontend unit.

### 11. src/state/actions/loadMicroFrontends.tsx:9; src/state/actions/loadMicroFrontends.tsx:7-16; src/state/actions/loadMicroFrontends.tsx:27-28; src/state/actions/loadMicroFrontends.tsx:56-60

**Observation:** `runScript(url)` creates `script` element, assigns `url` to `src` and appends to `body`; `loadApp` calls with received URL, and `init` passes `p.src` of each enabled plugin.

**Interpretation:** External bundle loading implements composition portion, but URL parameter alone identifies no target unit.

### 12. index.html:18; index.html:19-22

**Observation:** HTML loads React 18 UMD from CDN with local fallback.

**Interpretation:** CDN library loading establishes no frontend inter-unit relationship.

### 13. index.html:23; index.html:24-29

**Observation:** HTML loads ReactDOM 18 UMD from CDN with local fallback.

**Interpretation:** CDN library loading establishes no frontend inter-unit relationship.

### 14. src/accessibilityPage/contactUs.component.tsx:45; src/accessibilityPage/contactUs.component.tsx:42-51

**Observation:** Component renders `iframe` with title `Contact Us` and `src` received in `contactUsAccessibilityFormUrl`.

**Interpretation:** Iframe embeds contact form; source review identifies no frontend unit.

### 15. server/e2e-plugin/main.js:20; server/README.md:3; server/e2e-test-server.js:16-20

**Observation:** Demonstration plugin bundle dispatches `CustomEvent` on channel `scigateway`, with route-registration, notification and token-invalidation messages.

**Interpretation:** Compiled artifact from another repository served in e2e tests. Review 3.4.4 marks construct Composition No because not part of host build; observation preserves scope.

### 16. src/App.test.tsx:110-114

**Observation:** Test of `App` dispatches `CustomEvent` `scigateway` with `registerRouteAction` in `detail`.

**Interpretation:** Test construct recorded by source review without runtime composition participation.

### 17. src/App.test.tsx:111-113

**Observation:** Test of `App` constructs `CustomEvent` `scigateway` with `registerRouteAction` in `detail`.

**Interpretation:** Test construct recorded by source review without runtime composition participation.

### 18. src/authentication/baseAPIAuthProvider.tsx:35; src/authentication/baseAPIAuthProvider.tsx:31-45; src/state/middleware/scigateway.middleware.tsx:166-188

**Observation:** Host dispatches `NotificationType` through `CustomEvent` on channel `scigateway` when OIDC configuration fails. Host’s own listener handles type with toast/Redux update.

**Interpretation:** Internal channel usage by same unit without demonstrated link to another frontend unit.

### 19. src/authentication/baseAPIAuthProvider.tsx:36; src/authentication/baseAPIAuthProvider.tsx:31-45; src/state/middleware/scigateway.middleware.tsx:166-188

**Observation:** Host dispatches `NotificationType` through `CustomEvent` on channel `scigateway` when OIDC configuration fails. Host’s own listener handles type with toast/Redux update.

**Interpretation:** Internal channel usage by same unit without demonstrated link to another frontend unit.

### 20. src/authentication/baseAPIAuthProvider.tsx:63; src/authentication/baseAPIAuthProvider.tsx:61-74; src/state/middleware/scigateway.middleware.tsx:166-188

**Observation:** Host dispatches `NotificationType` through `CustomEvent` on channel `scigateway` when OIDC provider retrieval fails. Host’s own listener handles type with toast/Redux update.

**Interpretation:** Internal channel usage by same unit without demonstrated link to another frontend unit.

### 21. src/authentication/baseAPIAuthProvider.tsx:64; src/authentication/baseAPIAuthProvider.tsx:61-74; src/state/middleware/scigateway.middleware.tsx:166-188

**Observation:** Host dispatches `NotificationType` through `CustomEvent` on channel `scigateway` when OIDC provider retrieval fails. Host’s own listener handles type with toast/Redux update.

**Interpretation:** Internal channel usage by same unit without demonstrated link to another frontend unit.

### 22. src/authentication/baseAPIAuthProvider.tsx:160; src/authentication/baseAPIAuthProvider.tsx:159-171; src/state/middleware/scigateway.middleware.tsx:166-188

**Observation:** Host dispatches `NotificationType` through `CustomEvent` on channel `scigateway` when OIDC state verification fails. Host’s own listener handles type with toast/Redux update.

**Interpretation:** Internal channel usage by same unit without demonstrated link to another frontend unit.

### 23. src/authentication/baseAPIAuthProvider.tsx:161; src/authentication/baseAPIAuthProvider.tsx:159-171; src/state/middleware/scigateway.middleware.tsx:166-188

**Observation:** Host dispatches `NotificationType` through `CustomEvent` on channel `scigateway` when OIDC state verification fails. Host’s own listener handles type with toast/Redux update.

**Interpretation:** Internal channel usage by same unit without demonstrated link to another frontend unit.

### 24. src/authentication/baseAPIAuthProvider.tsx:192; src/authentication/baseAPIAuthProvider.tsx:191-203; src/state/middleware/scigateway.middleware.tsx:166-188

**Observation:** Host dispatches `NotificationType` through `CustomEvent` on channel `scigateway` when OIDC nonce verification fails. Host’s own listener handles type with toast/Redux update.

**Interpretation:** Internal channel usage by same unit without demonstrated link to another frontend unit.

### 25. src/authentication/baseAPIAuthProvider.tsx:193; src/authentication/baseAPIAuthProvider.tsx:191-203; src/state/middleware/scigateway.middleware.tsx:166-188

**Observation:** Host dispatches `NotificationType` through `CustomEvent` on channel `scigateway` when OIDC nonce verification fails. Host’s own listener handles type with toast/Redux update.

**Interpretation:** Internal channel usage by same unit without demonstrated link to another frontend unit.

### 26. src/authentication/baseAuthProvider.tsx:61; src/authentication/baseAuthProvider.tsx:57-64; src/state/middleware/scigateway.middleware.tsx:108-112

**Observation:** `logOut()` dispatches `CustomEvent` on channel `scigateway`, type `BroadcastSignOutType`.

**Interpretation:** Host notifies plugins of logout through shared channel; own listener ignores type. Call names no specific plugin.

### 27. src/authentication/baseAuthProvider.tsx:62; src/authentication/baseAuthProvider.tsx:57-64; src/state/middleware/scigateway.middleware.tsx:108-112

**Observation:** `logOut()` dispatches `CustomEvent` on channel `scigateway`, type `BroadcastSignOutType`.

**Interpretation:** Host notifies plugins of logout through shared channel; own listener ignores type. Call names no specific plugin.

### 28. src/authentication/icatAuthProvider.tsx:17; src/authentication/icatAuthProvider.tsx:15-28; src/state/middleware/scigateway.middleware.tsx:166-188

**Observation:** Host dispatches `NotificationType` through `CustomEvent` on channel `scigateway` when ICAT authenticator retrieval fails. Host’s own listener handles type with toast/Redux update.

**Interpretation:** Internal channel usage by same unit without demonstrated link to another frontend unit.

### 29. src/authentication/icatAuthProvider.tsx:18; src/authentication/icatAuthProvider.tsx:15-28; src/state/middleware/scigateway.middleware.tsx:166-188

**Observation:** Host dispatches `NotificationType` through `CustomEvent` on channel `scigateway` when ICAT authenticator retrieval fails. Host’s own listener handles type with toast/Redux update.

**Interpretation:** Internal channel usage by same unit without demonstrated link to another frontend unit.

### 30. src/state/actions/loadMicroFrontends.tsx:67; src/state/actions/loadMicroFrontends.tsx:64-78; src/state/middleware/scigateway.middleware.tsx:166-188

**Observation:** Host dispatches `NotificationType` through `CustomEvent` on channel `scigateway` when plugin loading fails. Host’s own listener handles type with toast/Redux update.

**Interpretation:** Internal channel usage by same unit without demonstrated link to another frontend unit.

### 31. src/state/actions/loadMicroFrontends.tsx:68; src/state/actions/loadMicroFrontends.tsx:64-78; src/state/middleware/scigateway.middleware.tsx:166-188

**Observation:** Host dispatches `NotificationType` through `CustomEvent` on channel `scigateway` when plugin loading fails. Host’s own listener handles type with toast/Redux update.

**Interpretation:** Internal channel usage by same unit without demonstrated link to another frontend unit.

### 32. src/state/actions/scigateway.actions.test.tsx:457

**Observation:** Test passes handler `CustomEvent` named `test`, with `registerRouteAction`.

**Interpretation:** Test construct recorded by source review without runtime composition participation.

### 33. src/state/actions/scigateway.actions.tsx:465; src/state/actions/scigateway.actions.tsx:460-477; src/state/middleware/scigateway.middleware.tsx:166-188

**Observation:** Host dispatches `NotificationType` through `CustomEvent` on channel `scigateway` when maintenance banner requested. Host’s own listener handles type with toast/Redux update.

**Interpretation:** Internal channel usage by same unit without demonstrated link to another frontend unit.

### 34. src/state/actions/scigateway.actions.tsx:466; src/state/actions/scigateway.actions.tsx:460-477; src/state/middleware/scigateway.middleware.tsx:166-188

**Observation:** Host dispatches `NotificationType` through `CustomEvent` on channel `scigateway` when maintenance banner requested. Host’s own listener handles type with toast/Redux update.

**Interpretation:** Internal channel usage by same unit without demonstrated link to another frontend unit.

### 35. src/state/middleware/scigateway.middleware.test.tsx:369

**Observation:** Test passes handler `CustomEvent` named `test`, with `registerRouteAction`.

**Interpretation:** Test construct recorded by source review without runtime composition participation.

### 36. src/state/middleware/scigateway.middleware.test.tsx:379

**Observation:** Test passes handler `CustomEvent` named `test`, with `registerRouteAction`.

**Interpretation:** Test construct recorded by source review without runtime composition participation.

### 37. src/state/middleware/scigateway.middleware.test.tsx:407

**Observation:** Test passes handler `CustomEvent` named `test`, with `InvalidateTokenType`.

**Interpretation:** Test construct recorded by source review without runtime composition participation.

### 38. src/state/middleware/scigateway.middleware.test.tsx:423-430

**Observation:** Test passes handler `CustomEvent` named `test`, with `InvalidateTokenType and payload`.

**Interpretation:** Test construct recorded by source review without runtime composition participation.

### 39. src/state/middleware/scigateway.middleware.test.tsx:458-462

**Observation:** Test passes handler `CustomEvent` named `test`, with `registerRouteActionWithHelp`.

**Interpretation:** Test construct recorded by source review without runtime composition participation.

### 40. src/state/middleware/scigateway.middleware.test.tsx:494-498

**Observation:** Test passes handler `CustomEvent` named `test`, with `registerRouteActionWithHelp`.

**Interpretation:** Test construct recorded by source review without runtime composition participation.

### 41. src/state/middleware/scigateway.middleware.test.tsx:528-532

**Observation:** Test passes handler `CustomEvent` named `test`, with `registerRouteAction`.

**Interpretation:** Test construct recorded by source review without runtime composition participation.

### 42. src/state/middleware/scigateway.middleware.test.tsx:552-556

**Observation:** Test passes handler `CustomEvent` named `test`, with `registerRouteAction`.

**Interpretation:** Test construct recorded by source review without runtime composition participation.

### 43. src/state/middleware/scigateway.middleware.test.tsx:572

**Observation:** Test passes handler `CustomEvent` named `test`, with `notificationAction`.

**Interpretation:** Test construct recorded by source review without runtime composition participation.

### 44. src/state/middleware/scigateway.middleware.test.tsx:590

**Observation:** Test passes handler `CustomEvent` named `test`, with `notificationAction`.

**Interpretation:** Test construct recorded by source review without runtime composition participation.

### 45. src/state/middleware/scigateway.middleware.test.tsx:609

**Observation:** Test passes handler `CustomEvent` named `test`, with `notificationAction`.

**Interpretation:** Test construct recorded by source review without runtime composition participation.

### 46. src/state/middleware/scigateway.middleware.test.tsx:628

**Observation:** Test passes handler `CustomEvent` named `test`, with `notificationAction`.

**Interpretation:** Test construct recorded by source review without runtime composition participation.

### 47. src/state/middleware/scigateway.middleware.test.tsx:647

**Observation:** Test passes handler `CustomEvent` named `test`, with `notificationAction`.

**Interpretation:** Test construct recorded by source review without runtime composition participation.

### 48. src/state/middleware/scigateway.middleware.test.tsx:666

**Observation:** Test passes handler `CustomEvent` named `test`, with `notificationAction`.

**Interpretation:** Test construct recorded by source review without runtime composition participation.

### 49. src/state/middleware/scigateway.middleware.test.tsx:687

**Observation:** Test passes handler `CustomEvent` named `test`, with `requestPluginRerenderAction`.

**Interpretation:** Test construct recorded by source review without runtime composition participation.

### 50. src/state/middleware/scigateway.middleware.test.tsx:700

**Observation:** Test passes handler `CustomEvent` named `test`, with `broadcastSignOutAction`.

**Interpretation:** Test construct recorded by source review without runtime composition participation.

### 51. src/state/middleware/scigateway.middleware.test.tsx:708

**Observation:** Test passes handler `CustomEvent` named `test`, with `action`.

**Interpretation:** Test construct recorded by source review without runtime composition participation.

### 52. src/state/middleware/scigateway.middleware.test.tsx:725

**Observation:** Test passes handler `CustomEvent` named `test`, with `undefined detail`.

**Interpretation:** Test construct recorded by source review without runtime composition participation.

### 53. src/state/middleware/scigateway.middleware.test.tsx:742

**Observation:** Test passes handler `CustomEvent` named `test`, with `actionWithoutType: true`.

**Interpretation:** Test construct recorded by source review without runtime composition participation.

### 54. src/state/middleware/scigateway.middleware.tsx:34; src/state/middleware/scigateway.middleware.tsx:31-37; src/state/middleware/scigateway.middleware.tsx:242-244

**Observation:** `broadcastToPlugins` dispatches `CustomEvent` named `scigateway`, carrying Redux action in `detail`; middleware calls for actions with `payload.broadcast`.

**Interpretation:** Mechanism transmits host actions to plugins, receiving action as parameter without naming concrete target.

### 55. src/state/middleware/scigateway.middleware.tsx:35; src/state/middleware/scigateway.middleware.tsx:31-37; src/state/middleware/scigateway.middleware.tsx:242-244

**Observation:** `broadcastToPlugins` dispatches `CustomEvent` named `scigateway`, carrying Redux action in `detail`; middleware calls for actions with `payload.broadcast`.

**Interpretation:** Mechanism transmits host actions to plugins, receiving action as parameter without naming concrete target.

### 56. src/state/middleware/scigateway.middleware.tsx:193; src/state/middleware/scigateway.middleware.tsx:189-199; src/state/middleware/scigateway.middleware.tsx:108-109

**Observation:** After `refresh()` resolves while handling `InvalidateTokenType`, host dispatches `TokenRefreshedType` on channel `scigateway`.

**Interpretation:** Host returns renewal notice to plugins through shared channel; call names no specific plugin.

### 57. src/state/middleware/scigateway.middleware.tsx:194; src/state/middleware/scigateway.middleware.tsx:189-199; src/state/middleware/scigateway.middleware.tsx:108-109

**Observation:** After `refresh()` resolves while handling `InvalidateTokenType`, host dispatches `TokenRefreshedType` on channel `scigateway`.

**Interpretation:** Host returns renewal notice to plugins through shared channel; call names no specific plugin.

### 58. src/state/middleware/scigateway.middleware.tsx:205; src/state/middleware/scigateway.middleware.tsx:201-213; src/state/middleware/scigateway.middleware.tsx:166-188

**Observation:** Host dispatches `NotificationType` through `CustomEvent` on channel `scigateway` when token renewal fails. Host’s own listener handles type with toast/Redux update.

**Interpretation:** Internal channel usage by same unit without demonstrated link to another frontend unit.

### 59. src/state/middleware/scigateway.middleware.tsx:206; src/state/middleware/scigateway.middleware.tsx:201-213; src/state/middleware/scigateway.middleware.tsx:166-188

**Observation:** Host dispatches `NotificationType` through `CustomEvent` on channel `scigateway` when token renewal fails. Host’s own listener handles type with toast/Redux update.

**Interpretation:** Internal channel usage by same unit without demonstrated link to another frontend unit.

### 60. src/state/middleware/scigateway.middleware.tsx:302; src/state/middleware/scigateway.middleware.tsx:299-312; src/state/middleware/scigateway.middleware.tsx:166-188

**Observation:** Host dispatches `NotificationType` through `CustomEvent` on channel `scigateway` when automatic login fails. Host’s own listener handles type with toast/Redux update.

**Interpretation:** Internal channel usage by same unit without demonstrated link to another frontend unit.

### 61. src/state/middleware/scigateway.middleware.tsx:303; src/state/middleware/scigateway.middleware.tsx:299-312; src/state/middleware/scigateway.middleware.tsx:166-188

**Observation:** Host dispatches `NotificationType` through `CustomEvent` on channel `scigateway` when automatic login fails. Host’s own listener handles type with toast/Redux update.

**Interpretation:** Internal channel usage by same unit without demonstrated link to another frontend unit.

### 62. src/state/actions/scigateway.actions.tsx:391; src/state/actions/scigateway.actions.tsx:361-410; src/App.tsx:50

**Observation:** Handler calls `singleSpa.start()` when route registration matching current URL arrives after plugin loading.

**Interpretation:** Call starts registered-plugin orchestrator without naming concrete target unit.

### 63. src/state/actions/scigateway.actions.tsx:401; src/state/actions/scigateway.actions.tsx:361-410; src/App.tsx:50

**Observation:** Timer removes handler, calling `singleSpa.start()` after 3 seconds waiting for still-unknown route.

**Interpretation:** Call starts registered-plugin orchestrator without naming concrete target unit.

### 64. src/state/actions/scigateway.actions.tsx:408; src/state/actions/scigateway.actions.tsx:361-410; src/App.tsx:50

**Observation:** Alternative branch calls `singleSpa.start()` immediately when URL belongs to host, maintenance or known plugin.

**Interpretation:** Call starts registered-plugin orchestrator without naming concrete target unit.

### 65. src/state/middleware/scigateway.middleware.tsx:156; src/state/middleware/scigateway.middleware.tsx:149-157

**Observation:** While handling `RegisterRouteType`, if current path matches received route and plugin `NOT_LOADED`, middleware calls `singleSpa.triggerAppChange()`.

**Interpretation:** Mechanism reevaluates activation when plugin route arrives late; plugin received in message.

### 66. src/routing/routing.component.tsx:165; src/routing/routing.component.tsx:148-174

**Observation:** Effect finds plugin matching current path, calling `singleSpa.unloadApplication(pluginConf.plugin)` if container contains preloader.

**Interpretation:** Host requests plugin reload through name received in route configuration without identifying specific unit here.

### 67. src/routing/routing.component.tsx:268; src/routing/routing.component.tsx:113-124; src/routing/routing.component.tsx:263-280; src/pageContainer.component.tsx:50

**Observation:** Route table iterates nonadministrative plugins, associating `plugin.link` with component providing container with ID `plugin.plugin`.

**Interpretation:** Route links plugin path to host mounting location, explicitly showing composition link even with state-supplied names.

### 68. src/adminPage/adminPage.component.tsx:132; src/adminPage/adminPage.component.tsx:25-50; src/adminPage/adminPage.component.tsx:130-149; src/routing/routing.component.tsx:205-208

**Observation:** For each plugin/administrative tab page creates `Route` with corresponding path and `PluginPlaceHolder` with ID `pluginName`.

**Interpretation:** Table links administrative routes to plugin mounting containers, establishing shell/external-content link.

### 69. .; index.html:32; src/main.tsx:6-9; package.json:57; vite.config.ts:35-54; Dockerfile:4-31; .github/workflows/docker-release-build.yml:42-46

**Observation:** Root has Vite entry in `index.html`, React rendering in `src/main.tsx`, own build script and Dockerfile packaging output. No workspace declaration.

**Interpretation:** Root frontend unit with own entry/build; structural review finds one snapshot application. External plugin not another source unit in tree.

### 70. public/settings.example.json:15-22; server/e2e-settings.json:7-14; src/state/actions/loadMicroFrontends.tsx:7-60; src/state/actions/scigateway.actions.tsx:361-410; src/state/middleware/scigateway.middleware.tsx:149-157; src/routing/routing.component.tsx:113-124; src/routing/routing.component.tsx:148-174; src/routing/routing.component.tsx:263-280; src/adminPage/adminPage.component.tsx:130-149

**Observation:** Host loads enabled plugin scripts, reads global lifecycles and registers in single-spa. `demo_plugin` named in both settings, enabled in e2e; activation uses plugin-registered routes and host routes provide mounting containers.

**Interpretation:** Active `root-config → application` relationship links host to external unit `demo_plugin` through script loading/single-spa orchestration. Target outside snapshot as source unit.

### 71. src/authentication/baseAuthProvider.tsx:61-63; src/state/middleware/scigateway.middleware.tsx:31-37; src/state/middleware/scigateway.middleware.tsx:94-115; src/state/middleware/scigateway.middleware.tsx:166-215; src/state/middleware/scigateway.middleware.tsx:232-244; src/state/actions/scigateway.actions.tsx:575-592; server/e2e-plugin/main.js:20; server/e2e-settings.json:7-14

**Observation:** Channel `scigateway` carries host notices/actions to plugins. Listener receives route registration, notification and renewal request; bundle `demo_plugin` sends messages, listening for `plugin_rerender`.

**Interpretation:** Active communication relationship bidirectionally connects host and `demo_plugin` through events. Channel fixed in code; plugin sending visible in e2e bundle.

### 72. package.json:57; vite.config.ts:35-54; Dockerfile:4-31; Dockerfile:77; docker/docker-entrypoint.sh:3-17; .github/workflows/docker-release-build.yml:30-52; .github/workflows/release-build.yml:28-65; .github/workflows/ci-build.yml:62-71

**Observation:** Build executes TypeScript/Vite, generating `dist/`. Dockerfile copies output to httpd; workflows publish image `scigateway` to Harbor and tarball in GitHub release. Names/tags derived from Git tag; CI also builds image without publication.

**Interpretation:** Separate build/deployment delimit host: both publication forms contain output without building external plugins. Application versioning follows repository tag.

### 73. .github/workflows/ci-build.yml:38

**Observation:** Comment says job builds Docker image to verify buildability.

**Interpretation:** Claim describes unit validation build without publication in flow.

### 74. .github/workflows/docker-release-build.yml:13

**Observation:** Comment says job builds image, pushing to Harbor on success.

**Interpretation:** Claim describes host image publication.

### 75. Dockerfile:1

**Observation:** Initial comment presents Dockerfile as means to build/serve SciGateway.

**Interpretation:** Claim locates host packaging/execution.

### 76. Dockerfile:30

**Observation:** Comment says build output placed on Apache server.

**Interpretation:** Claim describes unit output target in runtime stage.

### 77. README.md:5

**Observation:** README presents SciGateway as React parent application in microfrontend architecture.

**Interpretation:** Claim locates frontend shell relative to external plugins.

### 78. README.md:11

**Observation:** README states project uses Vite.

**Interpretation:** Claim identifies build tool; alone shows neither MFE mechanism nor inter-unit link.

### 79. README.md:36

**Observation:** README says production build generates folder `dist`.

**Interpretation:** Claim describes host unit build output.

### 80. demos/sprint2/plugin_route_registration.md:5

**Observation:** Demo script presents plugins registering new routes in parent application.

**Interpretation:** Claim describes plugin → host contract feeding activation/routing.

### 81. demos/sprint2/plugin_route_registration.md:14

**Observation:** Demo script says link leads to event-registered path and microfrontend decides displayed content.

**Interpretation:** Claim describes division between shell routing/plugin content.

### 82. demos/sprint3/notifications_badge.md:13

**Observation:** Demo script says notifications received by plugin should be forwarded to SciGateway for user action.

**Interpretation:** Claim locates plugin-to-host message flow.

### 83. server/README.md:3

**Observation:** Server README says `e2e-plugin` files are demonstration plugin build artifacts originating in another repository.

**Interpretation:** Claim delimits external plugin origin and compiled nature of test content.

### 84. src/routing/routing.component.tsx:78-81

**Observation:** Comment assigns plugin itself paths nested under `/admin/path`, restricting host to top-level routes.

**Interpretation:** Host portion corroborated by route selection/administrative containers. Internal subpath handling unconfirmed because plugin code outside snapshot.

### 85. src/routing/routing.component.tsx:120-121

**Observation:** Placeholder comment says shows loading indicator while plugin mounts, replaced by plugin on mounting.

**Interpretation:** Claim describes shell-provided container for external unit.

### 86. src/routing/routing.component.tsx:148-149

**Observation:** Comment says effect detects single-spa considering plugin loaded while container still has indicator, calling `unloadApplication`.

**Interpretation:** Claim describes plugin mounting recovery mechanism.

### 87. src/routing/routing.component.tsx:264

**Observation:** Comment says administrative plugins excluded from main table, routed through administrative page.

**Interpretation:** Claim describes two plugin housing forms in shell.

### 88. src/state/actions/loadMicroFrontends.tsx:20

**Observation:** Comment says plugins loaded onto `window`, defining own property name.

**Interpretation:** Claim describes lifecycle resolution contract through global name.

### 89. src/state/actions/loadMicroFrontends.tsx:30

**Observation:** Comment says single-spa registration passes references to application store and `globalEventDistributor`.

**Interpretation:** Documentation review considers claim contradicted: registration exists but three arguments pass neither store nor distributor. Comment does not demonstrate communication design.

### 90. src/state/actions/loadMicroFrontends.tsx:83

**Observation:** Comment says initialization waits for all stores loaded and all applications registered in single-spa.

**Interpretation:** Registration wait corroborated by script loading and `Promise.all`; explicit store loading absent. Review records partial corroboration.

### 91. src/state/actions/scigateway.actions.tsx:361

**Observation:** Comment says plugins defined in settings loaded.

**Interpretation:** Claim links host initialization to configured unit list.

### 92. src/state/actions/scigateway.actions.tsx:368-369

**Observation:** Comment says for URL still unknown to host/plugins, matching route registration awaited to avoid premature 404.

**Interpretation:** Claim describes temporal coordination of external route registration and single-spa startup.

### 93. src/state/middleware/scigateway.middleware.tsx:99

**Observation:** Comment says valid messages go to parent application Redux.

**Interpretation:** Claim describes host reception of plugin messages.

### 94. src/state/middleware/scigateway.middleware.tsx:102

**Observation:** Comment says listener ignores parent-application events.

**Interpretation:** Claim describes direction distinction in shared host/plugin channel.

### 95. src/state/middleware/scigateway.middleware.tsx:148

**Observation:** Comment attributes route-delay issues to slow plugin settings-file loading.

**Interpretation:** Reaction to late routes corroborated; origin in external configuration files not demonstrated in snapshot. Review records partial corroboration.

### 96. src/state/middleware/scigateway.middleware.tsx:159

**Observation:** Comment says theme options sent after registration.

**Interpretation:** Claim describes host-to-plugin theme sending after route registration.

### 97. 3f0c185 2024-11-11 (src/routing/routing.component.tsx); 4dcb3a2 2026-03-12 (src/routing/routing.component.tsx)

**Observation:** Log records administrative tab generation in `3f0c185` and routing fix in `4dcb3a2`. Attempt to read router in `3f0c185` returned `fatal: bad object`.

**Interpretation:** Cannot historically determine whether subroute delegation describes fulfilled plugin contract or merely expected responsibility. Point inconclusive, but host boundary/plugin link already demonstrated in snapshot; uncertainty does not undo organization.

### 98. 336bf97 2019-03-26 (src/state/actions/loadMicroFrontends.tsx); d3eec25 2019-04-05 (src/state/actions/loadMicroFrontends.tsx)

**Observation:** Log records loader creation in `336bf97` and loading/theme update in `d3eec25`. Attempts to read both contents returned `fatal: bad object`.

**Interpretation:** Point remains inconclusive regarding store/distributor comment origins. No inference of earlier design removal: snapshot clear about script loading/registration without these arguments.

### 99. 47bc22e 2022-03-11 (src/state/middleware/scigateway.middleware.tsx; src/state/actions/loadMicroFrontends.tsx)

**Observation:** Message of `47bc22e` announces moving `singleSpa.start` and adding `triggerAppChange` for plugins loading settings late. Reading middleware at commit returned `fatal: bad object`.

**Interpretation:** Message records announced motivation without proving how external plugins read settings. Historical point inconclusive; snapshot already shows host reaction to late routes independent of cause.

## Classification

| # | Origin | Dimension | Type | Approach | Evidence | Strength | Relationships |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.2 (package.json:50) | 1 technology | manifest | single-spa | technological | weak | declares #6; declares #62; declares #63; declares #64; declares #65; declares #66 |
| 2 | 3.4.4 (server/e2e-plugin/main.js:9, Observation); 3.4.5 #1 (Configuration) | 2 configuration | configuration | single-spa | architectural | strong | configures #6; configures #11; configures #70 |
| 3 | 3.4.4 (src/state/actions/loadMicroFrontends.tsx:31 and :9, Observation); 3.4.5 #1 (Configuration); 3.4.7 #19 (Evidence) | 2 configuration | configuration | single-spa | architectural | strong | configures #6; configures #11; configures #70 |
| 4 | 3.4.4 (vite.config.ts:28) | 3 code | configuration | — | context | weak | — |
| 5 | 3.4.4 (server/e2e-plugin/main.js:9) | 3 code | source code | single-spa | technological | weak | — |
| 6 | 3.4.4 (src/state/actions/loadMicroFrontends.tsx:31) | 3 code | source code | single-spa | technological | moderate | implements #70 |
| 7 | 3.4.4 (src/cookieConsent/cookieConsent.component.test.tsx:104) | 3 code | source code | — | context | weak | — |
| 8 | 3.4.4 (src/cookieConsent/cookieConsent.component.test.tsx:108) | 3 code | source code | — | context | weak | — |
| 9 | 3.4.4 (src/cookieConsent/cookieConsent.component.tsx:54) | 3 code | source code | — | context | weak | — |
| 10 | 3.4.4 (src/cookieConsent/cookieConsent.component.tsx:58) | 3 code | source code | — | context | weak | — |
| 11 | 3.4.4 (src/state/actions/loadMicroFrontends.tsx:9) | 3 code | source code | script-loading | technological | moderate | implements #70 |
| 12 | 3.4.4 (index.html:18) | 3 code | source code | — | context | weak | — |
| 13 | 3.4.4 (index.html:23) | 3 code | source code | — | context | weak | — |
| 14 | 3.4.4 (src/accessibilityPage/contactUs.component.tsx:45) | 3 code | source code | — | context | weak | — |
| 15 | 3.4.4 (server/e2e-plugin/main.js:20) | 3 code | source code | events | architectural | weak | — |
| 16 | 3.4.4 (src/App.test.tsx:110) | 3 code | source code | — | context | weak | — |
| 17 | 3.4.4 (src/App.test.tsx:111) | 3 code | source code | — | context | weak | — |
| 18 | 3.4.4 (src/authentication/baseAPIAuthProvider.tsx:35) | 3 code | source code | — | context | weak | — |
| 19 | 3.4.4 (src/authentication/baseAPIAuthProvider.tsx:36) | 3 code | source code | — | context | weak | — |
| 20 | 3.4.4 (src/authentication/baseAPIAuthProvider.tsx:63) | 3 code | source code | — | context | weak | — |
| 21 | 3.4.4 (src/authentication/baseAPIAuthProvider.tsx:64) | 3 code | source code | — | context | weak | — |
| 22 | 3.4.4 (src/authentication/baseAPIAuthProvider.tsx:160) | 3 code | source code | — | context | weak | — |
| 23 | 3.4.4 (src/authentication/baseAPIAuthProvider.tsx:161) | 3 code | source code | — | context | weak | — |
| 24 | 3.4.4 (src/authentication/baseAPIAuthProvider.tsx:192) | 3 code | source code | — | context | weak | — |
| 25 | 3.4.4 (src/authentication/baseAPIAuthProvider.tsx:193) | 3 code | source code | — | context | weak | — |
| 26 | 3.4.4 (src/authentication/baseAuthProvider.tsx:61) | 3 code | source code | events | technological | moderate | implements #71 |
| 27 | 3.4.4 (src/authentication/baseAuthProvider.tsx:62) | 3 code | source code | events | technological | moderate | implements #71 |
| 28 | 3.4.4 (src/authentication/icatAuthProvider.tsx:17) | 3 code | source code | — | context | weak | — |
| 29 | 3.4.4 (src/authentication/icatAuthProvider.tsx:18) | 3 code | source code | — | context | weak | — |
| 30 | 3.4.4 (src/state/actions/loadMicroFrontends.tsx:67) | 3 code | source code | — | context | weak | — |
| 31 | 3.4.4 (src/state/actions/loadMicroFrontends.tsx:68) | 3 code | source code | — | context | weak | — |
| 32 | 3.4.4 (src/state/actions/scigateway.actions.test.tsx:457) | 3 code | source code | — | context | weak | — |
| 33 | 3.4.4 (src/state/actions/scigateway.actions.tsx:465) | 3 code | source code | — | context | weak | — |
| 34 | 3.4.4 (src/state/actions/scigateway.actions.tsx:466) | 3 code | source code | — | context | weak | — |
| 35 | 3.4.4 (src/state/middleware/scigateway.middleware.test.tsx:369) | 3 code | source code | — | context | weak | — |
| 36 | 3.4.4 (src/state/middleware/scigateway.middleware.test.tsx:379) | 3 code | source code | — | context | weak | — |
| 37 | 3.4.4 (src/state/middleware/scigateway.middleware.test.tsx:407) | 3 code | source code | — | context | weak | — |
| 38 | 3.4.4 (src/state/middleware/scigateway.middleware.test.tsx:424) | 3 code | source code | — | context | weak | — |
| 39 | 3.4.4 (src/state/middleware/scigateway.middleware.test.tsx:459) | 3 code | source code | — | context | weak | — |
| 40 | 3.4.4 (src/state/middleware/scigateway.middleware.test.tsx:495) | 3 code | source code | — | context | weak | — |
| 41 | 3.4.4 (src/state/middleware/scigateway.middleware.test.tsx:529) | 3 code | source code | — | context | weak | — |
| 42 | 3.4.4 (src/state/middleware/scigateway.middleware.test.tsx:553) | 3 code | source code | — | context | weak | — |
| 43 | 3.4.4 (src/state/middleware/scigateway.middleware.test.tsx:572) | 3 code | source code | — | context | weak | — |
| 44 | 3.4.4 (src/state/middleware/scigateway.middleware.test.tsx:590) | 3 code | source code | — | context | weak | — |
| 45 | 3.4.4 (src/state/middleware/scigateway.middleware.test.tsx:609) | 3 code | source code | — | context | weak | — |
| 46 | 3.4.4 (src/state/middleware/scigateway.middleware.test.tsx:628) | 3 code | source code | — | context | weak | — |
| 47 | 3.4.4 (src/state/middleware/scigateway.middleware.test.tsx:647) | 3 code | source code | — | context | weak | — |
| 48 | 3.4.4 (src/state/middleware/scigateway.middleware.test.tsx:666) | 3 code | source code | — | context | weak | — |
| 49 | 3.4.4 (src/state/middleware/scigateway.middleware.test.tsx:687) | 3 code | source code | — | context | weak | — |
| 50 | 3.4.4 (src/state/middleware/scigateway.middleware.test.tsx:700) | 3 code | source code | — | context | weak | — |
| 51 | 3.4.4 (src/state/middleware/scigateway.middleware.test.tsx:708) | 3 code | source code | — | context | weak | — |
| 52 | 3.4.4 (src/state/middleware/scigateway.middleware.test.tsx:725) | 3 code | source code | — | context | weak | — |
| 53 | 3.4.4 (src/state/middleware/scigateway.middleware.test.tsx:742) | 3 code | source code | — | context | weak | — |
| 54 | 3.4.4 (src/state/middleware/scigateway.middleware.tsx:34) | 3 code | source code | events | technological | moderate | implements #71 |
| 55 | 3.4.4 (src/state/middleware/scigateway.middleware.tsx:35) | 3 code | source code | events | technological | moderate | implements #71 |
| 56 | 3.4.4 (src/state/middleware/scigateway.middleware.tsx:193) | 3 code | source code | events | technological | moderate | implements #71 |
| 57 | 3.4.4 (src/state/middleware/scigateway.middleware.tsx:194) | 3 code | source code | events | technological | moderate | implements #71 |
| 58 | 3.4.4 (src/state/middleware/scigateway.middleware.tsx:205) | 3 code | source code | — | context | weak | — |
| 59 | 3.4.4 (src/state/middleware/scigateway.middleware.tsx:206) | 3 code | source code | — | context | weak | — |
| 60 | 3.4.4 (src/state/middleware/scigateway.middleware.tsx:302) | 3 code | source code | — | context | weak | — |
| 61 | 3.4.4 (src/state/middleware/scigateway.middleware.tsx:303) | 3 code | source code | — | context | weak | — |
| 62 | 3.4.4 (src/state/actions/scigateway.actions.tsx:391) | 3 code | source code | single-spa | technological | moderate | implements #70 |
| 63 | 3.4.4 (src/state/actions/scigateway.actions.tsx:401) | 3 code | source code | single-spa | technological | moderate | implements #70 |
| 64 | 3.4.4 (src/state/actions/scigateway.actions.tsx:408) | 3 code | source code | single-spa | technological | moderate | implements #70 |
| 65 | 3.4.4 (src/state/middleware/scigateway.middleware.tsx:156) | 3 code | source code | single-spa | technological | moderate | implements #70 |
| 66 | 3.4.4 (src/routing/routing.component.tsx:165) | 3 code | source code | single-spa | technological | moderate | implements #70 |
| 67 | 3.4.4 (src/routing/routing.component.tsx:268) | 3 code | source code | single-spa | architectural | strong | implements #70 |
| 68 | 3.4.4 (src/adminPage/adminPage.component.tsx:132) | 3 code | source code | single-spa | architectural | strong | implements #70 |
| 69 | 3.4.3 (.) | 4 structure | directory | — | architectural | moderate | — |
| 70 | 3.4.5 #1 | 5 composition | source code | single-spa | architectural | strong | links #69; links server/README.md:3 |
| 71 | 3.4.5 #2 | 5 composition | source code | events | architectural | strong | links #69; links server/e2e-plugin/main.js:20 |
| 72 | 3.4.6 #1 | 6 build-deploy | deploy | — | architectural | moderate | publishes #69 |
| 73 | 3.4.7 #1 | 7 documentation | comment | — | architectural | weak | corroborates #72 |
| 74 | 3.4.7 #2 | 7 documentation | comment | — | architectural | weak | corroborates #72 |
| 75 | 3.4.7 #3 | 7 documentation | comment | — | architectural | weak | corroborates #72 |
| 76 | 3.4.7 #4 | 7 documentation | comment | — | architectural | weak | corroborates #72 |
| 77 | 3.4.7 #5 | 7 documentation | documentation | — | architectural | weak | corroborates #69; corroborates #70; corroborates #71 |
| 78 | 3.4.7 #6 | 7 documentation | documentation | — | context | weak | corroborates #69 |
| 79 | 3.4.7 #7 | 7 documentation | documentation | — | architectural | weak | corroborates #72 |
| 80 | 3.4.7 #8 | 7 documentation | documentation | — | architectural | weak | corroborates #70; corroborates #71 |
| 81 | 3.4.7 #9 | 7 documentation | documentation | — | architectural | weak | corroborates #67; corroborates #70 |
| 82 | 3.4.7 #10 | 7 documentation | documentation | — | architectural | weak | corroborates #71 |
| 83 | 3.4.7 #11 | 7 documentation | documentation | — | architectural | weak | corroborates #5; corroborates #15; corroborates server/e2e-plugin/main.js:1 |
| 84 | 3.4.7 #12 | 7 documentation | comment | — | architectural | weak | partially corroborates #68; partially corroborates src/routing/routing.component.tsx:83-88 |
| 85 | 3.4.7 #13 | 7 documentation | comment | — | architectural | weak | corroborates #67; corroborates #70 |
| 86 | 3.4.7 #14 | 7 documentation | comment | single-spa | architectural | weak | corroborates #66 |
| 87 | 3.4.7 #15 | 7 documentation | comment | — | architectural | weak | corroborates #67; corroborates #68 |
| 88 | 3.4.7 #16 | 7 documentation | comment | — | architectural | weak | corroborates #6; corroborates #70 |
| 89 | 3.4.7 #17 | 7 documentation | comment | single-spa | architectural | weak | contradicts #6 |
| 90 | 3.4.7 #18 | 7 documentation | comment | single-spa | architectural | weak | partially corroborates #11; partially corroborates #6; partially corroborates src/state/actions/loadMicroFrontends.tsx:84 |
| 91 | 3.4.7 #19 | 7 documentation | comment | — | architectural | weak | corroborates #70; corroborates #3 |
| 92 | 3.4.7 #20 | 7 documentation | comment | — | architectural | weak | corroborates #62; corroborates #63; corroborates #64 |
| 93 | 3.4.7 #21 | 7 documentation | comment | — | architectural | weak | corroborates #71 |
| 94 | 3.4.7 #22 | 7 documentation | comment | — | architectural | weak | corroborates #71 |
| 95 | 3.4.7 #23 | 7 documentation | comment | — | architectural | weak | partially corroborates #65 |
| 96 | 3.4.7 #24 | 7 documentation | comment | — | architectural | weak | corroborates #71 |
| 97 | 3.4.8 #1 | 8 history | history | — | architectural | weak | explains #84 |
| 98 | 3.4.8 #2 | 8 history | history | — | architectural | weak | explains #89; explains #90 |
| 99 | 3.4.8 #3 | 8 history | history | — | architectural | weak | explains #95 |

## Summary

Observations: 99. Dimensions (technology: 1, configuration: 2, code: 65, structure: 1, composition: 2, build-deploy: 1, documentation: 24, history: 3). Strength (strong: 6, moderate: 15, weak: 78, ambiguous: 0). Evidence (technological: 15, architectural: 35, context: 49).

