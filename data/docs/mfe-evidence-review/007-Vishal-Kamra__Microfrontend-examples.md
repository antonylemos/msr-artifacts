---
schema: 1
id: 1098119003
full_name: Vishal-Kamra/Microfrontend-examples
commit: eeb848822ba0bad3549c04a36f5c9dfb72ae7fe8
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
  date: 2026-10-21
---

# 007 — Vishal-Kamra/Microfrontend-examples

## Repository overview

Two independent Module Federation examples, both using webpack 5 native plugin. Hence no dependency observation. Both have same chain:
- **Configuration:**
  - host declares remotes (#1, #4);
  - each remote declares itself/exposes module with `mount` function contract (#2, #3, #5).
- **Code:** host imports remote module by name (#18 through #20), calling `mount` on own element (#15, #21, #22). Remotes export `mount` (#12 through #14).
- **Relationships:** three active relationships: container → marketing in React example (#32), Container → Cart and Container → Products in plain JavaScript example (#33, #34).

Each application has own build, but only for development server; no observed deployment (#35 through #39).

Signals misleading in isolation:
- **Asynchronous bootstrap/local mounting:** asynchronous bootstraps (#6 through #10) and own-development-element mounts (#16, #17) are internal to each unit.
- **Unconsumed `mount`:** React container’s exported `mount` has no consumer (#11).
- **Copied comment:** container comment says it loads "through container" (#41), copied from marketing and disproven by container’s own configuration.
- **Empty folders/files:** `auth` and `dashboard` folders contain only manifests (#23, #26), `webpack.prod.js` files are empty.

History has sole commit clarifying none of these points (#44 through #46). None changes snapshot reading.

## Observations

### 1. react-js/container/config/webpack.dev.js:1-29

**Observation:** `ModuleFederationPlugin` declares `name: "container"` and remote `marketing: "marketing@http://localhost:8081/remoteEntry.js"`, sharing `dependencies` from `package.json`. Development-only configuration (`mode: "development"`, port 8080).

**Interpretation:** Host configuration declares marketing remote/development location.

### 2. react-js/marketing/config/webpack.dev.js:1-30

**Observation:** `ModuleFederationPlugin` declares `name: "marketing"` and `filename: "remoteEntry.js"`, exposing `./MarketingApp` (`./src/bootstrap.js`), sharing `dependencies` from `package.json`. Development-only configuration (port 8081).

**Interpretation:** Marketing configured as remote offering bootstrap to host.

### 3. simple-js/Cart/webpack.config.js:1-22

**Observation:** `ModuleFederationPlugin` declares `name: "cart"` and `filename: "remoteEntry.js"`, exposing `./CartShow` (`./src/bootstrap.js`), sharing `@faker-js/faker` singleton. Development-only configuration (port 8082).

**Interpretation:** Cart configured as remote offering bootstrap to host.

### 4. simple-js/Container/webpack.config.js:1-21

**Observation:** `ModuleFederationPlugin` declares `name: "container"` and remotes `products@http://localhost:8081/remoteEntry.js` and `cart@http://localhost:8082/remoteEntry.js`. Development-only configuration (port 8080).

**Interpretation:** Host configuration declares both remotes/development locations.

### 5. simple-js/Products/webpack.config.js:1-22

**Observation:** `ModuleFederationPlugin` declares `name: "products"` and `filename: "remoteEntry.js"`, exposing `./ProductsIndex` (`./src/bootstrap.js`), sharing `@faker-js/faker` singleton. Development-only configuration (port 8081).

**Interpretation:** Products configured as remote offering bootstrap to host.

### 6. react-js/container/src/index.js:1

**Observation:** `import('./bootstrap')`.

**Interpretation:** Asynchronous bootstrap internal to unit.

### 7. react-js/marketing/src/index.js:1

**Observation:** `import('./bootstrap')`.

**Interpretation:** Asynchronous bootstrap internal to unit.

### 8. simple-js/Cart/src/index.js:1

**Observation:** `import('./bootstrap')`.

**Interpretation:** Asynchronous bootstrap internal to unit.

### 9. simple-js/Container/src/index.js:1

**Observation:** `import('./bootstrap')`.

**Interpretation:** Asynchronous bootstrap internal to unit.

### 10. simple-js/Products/src/index.js:1

**Observation:** `import('./bootstrap')`.

**Interpretation:** Asynchronous bootstrap internal to unit.

### 11. react-js/container/src/bootstrap.js:22

**Observation:** `export { mount }` in container bootstrap. No configuration exposes file, no unit imports it.

**Interpretation:** Unconsumed mounting contract left from copied remote pattern.

### 12. react-js/marketing/src/bootstrap.js:22

**Observation:** `export { mount }` in marketing bootstrap, file exposed as `./MarketingApp`.

**Interpretation:** Marketing offers mounting function to host.

### 13. simple-js/Cart/src/bootstrap.js:3-8

**Observation:** `export function mount(el)` renders cart in received element.

**Interpretation:** Cart offers mounting function to host.

### 14. simple-js/Products/src/bootstrap.js:3-12

**Observation:** `export function mount(el)` renders product list in received element.

**Interpretation:** Products offers mounting function to host.

### 15. react-js/container/src/components/MarketingApp.js:8-10; react-js/container/src/App.js:8

**Observation:** `mount(ref.current)` within `useEffect`. Component rendered by container `App`.

**Interpretation:** Host mounts remote in own element through imported function.

### 16. simple-js/Cart/src/bootstrap.js:10-14

**Observation:** Calls `mount` on own development element when present.

**Interpretation:** Unit-internal mounting for standalone execution.

### 17. simple-js/Products/src/bootstrap.js:14-18

**Observation:** Calls `mount` on own development element when present.

**Interpretation:** Unit-internal mounting for standalone execution.

### 18. react-js/container/src/components/MarketingApp.js:3

**Observation:** `import { mount } from "marketing/MarketingApp"`.

**Interpretation:** Host imports marketing remote exposed module by name.

### 19. simple-js/Container/src/bootstrap.js:1

**Observation:** `import { mount as mountProducts } from "products/ProductsIndex"`.

**Interpretation:** Host imports products remote exposed module by name.

### 20. simple-js/Container/src/bootstrap.js:2

**Observation:** `import { mount as mountCart } from "cart/CartShow"`.

**Interpretation:** Host imports cart remote exposed module by name.

### 21. simple-js/Container/src/bootstrap.js:4

**Observation:** `mountProducts(document.querySelector("#dev-products"))`.

**Interpretation:** Host mounts remote in fixed page element through imported function.

### 22. simple-js/Container/src/bootstrap.js:5

**Observation:** `mountCart(document.querySelector("#dev-cart"))`.

**Interpretation:** Host mounts remote in fixed page element through imported function.

### 23. react-js/auth; react-js/auth/package.json:1-6

**Observation:** Folder contains only `package.json` with test script, and lockfile. No code, entry or build.

**Interpretation:** Not frontend unit in snapshot.

### 24. react-js/container; react-js/container/src/index.js:1; react-js/container/src/bootstrap.js:6-17; react-js/container/config/webpack.dev.js:7-29

**Observation:** React application with own entry/development webpack configuration.

**Interpretation:** Frontend unit with own boundary.

### 25. react-js/container/config

**Observation:** Folder contains container webpack configurations.

**Interpretation:** Part of container build rather than application.

### 26. react-js/dashboard; react-js/dashboard/package.json:1-6

**Observation:** Folder contains only `package.json` with test script, and lockfile. No code, entry or build.

**Interpretation:** Not frontend unit in snapshot.

### 27. react-js/marketing; react-js/marketing/src/index.js:1; react-js/marketing/src/bootstrap.js:6-17; react-js/marketing/config/webpack.dev.js:7-29

**Observation:** React application with own entry/development webpack configuration.

**Interpretation:** Frontend unit with own boundary.

### 28. react-js/marketing/config

**Observation:** Folder contains marketing webpack configurations.

**Interpretation:** Part of marketing build rather than application.

### 29. simple-js/Cart; simple-js/Cart/package.json:1-9; simple-js/Cart/src/index.js:1; simple-js/Cart/src/bootstrap.js:1-7; simple-js/Cart/webpack.config.js:4-8

**Observation:** JavaScript application with own manifest, entry and webpack configuration.

**Interpretation:** Frontend unit with own boundary.

### 30. simple-js/Container; simple-js/Container/package.json:1-9; simple-js/Container/src/index.js:1; simple-js/Container/src/bootstrap.js:1-5; simple-js/Container/webpack.config.js:4-8

**Observation:** JavaScript application with own manifest, entry and webpack configuration.

**Interpretation:** Frontend unit with own boundary.

### 31. simple-js/Products; simple-js/Products/package.json:1-9; simple-js/Products/src/index.js:1; simple-js/Products/src/bootstrap.js:1-7; simple-js/Products/webpack.config.js:4-8

**Observation:** JavaScript application with own manifest, entry and webpack configuration.

**Interpretation:** Frontend unit with own boundary.

### 32. react-js/container/src/components/MarketingApp.js:3, 9; react-js/container/config/webpack.dev.js:19-23; react-js/marketing/config/webpack.dev.js:19-23

**Observation:** Container imports `mount` from `marketing/MarketingApp`, calling it on own element. Name/module match marketing configuration.

**Interpretation:** Active host → remote relationship.

### 33. simple-js/Container/src/bootstrap.js:2, 5; simple-js/Container/webpack.config.js:10-14; simple-js/Cart/webpack.config.js:10-15

**Observation:** Container imports `mount` from `cart/CartShow`, calling it on `#dev-cart`. Name/module match Cart configuration.

**Interpretation:** Active host → remote relationship.

### 34. simple-js/Container/src/bootstrap.js:1, 4; simple-js/Container/webpack.config.js:10-13; simple-js/Products/webpack.config.js:10-15

**Observation:** Container imports `mount` from `products/ProductsIndex`, calling it on `#dev-products`. Name/module match Products configuration.

**Interpretation:** Active host → remote relationship.

### 35. react-js/container/config/webpack.dev.js:7-29; react-js/container/package.json:5

**Observation:** Own development-only webpack configuration, used by `webpack serve`. `webpack.prod.js` empty. No deployment artifact.

**Interpretation:** Own development-restricted build boundary without observed deployment.

### 36. react-js/marketing/config/webpack.dev.js:7-29; react-js/marketing/package.json:5

**Observation:** Own development-only webpack configuration generating `remoteEntry.js`. `webpack.prod.js` empty. No deployment artifact.

**Interpretation:** Own development-restricted build boundary without observed deployment.

### 37. simple-js/Cart/webpack.config.js:4-22; simple-js/Cart/package.json:7

**Observation:** Own development-mode webpack configuration, used by `webpack server`. No deployment artifact.

**Interpretation:** Own development-restricted build boundary without observed deployment.

### 38. simple-js/Container/webpack.config.js:4-21; simple-js/Container/package.json:7

**Observation:** Own development-mode webpack configuration, used by `webpack server`. No deployment artifact.

**Interpretation:** Own development-restricted build boundary without observed deployment.

### 39. simple-js/Products/webpack.config.js:4-8; simple-js/Products/package.json:8

**Observation:** Own development-mode webpack configuration, used by `webpack serve`. No deployment artifact.

**Interpretation:** Own development-restricted build boundary without observed deployment.

### 40. react-js/container/src/bootstrap.js:10-11

**Observation:** "If we are in development and in isolation, call mount immediately".

**Interpretation:** Claims container self-mounts in isolation. Claim corroborated.

### 41. react-js/container/src/bootstrap.js:20-21

**Observation:** "We are running through container and we should export the mount function".

**Interpretation:** Claims container would load through another container. Container configuration exposes nothing, making claim contradicted.

### 42. react-js/marketing/src/bootstrap.js:10-11

**Observation:** "If we are in development and in isolation, call mount immediately".

**Interpretation:** Claims marketing self-mounts in isolation. Claim corroborated.

### 43. react-js/marketing/src/bootstrap.js:20-21

**Observation:** "We are running through container and we should export the mount function".

**Interpretation:** Claims marketing loads through container by `mount`. Claim corroborated.

### 44. eeb8488 2025-11-17 (react-js/auth, react-js/dashboard)

**Observation:** Both folders arrive in sole commit.

**Interpretation:** Unknown whether planned applications or remnants of others. Past-only question: not units in snapshot.

### 45. eeb8488 2025-11-17 (react-js/container/config/webpack.prod.js, react-js/marketing/config/webpack.prod.js)

**Observation:** Both files arrive empty in sole commit.

**Interpretation:** Unknown whether previously had contents. Past-only question: snapshot has no production build.

### 46. eeb8488 2025-11-17 (react-js/container/src/bootstrap.js, react-js/marketing/src/bootstrap.js)

**Observation:** Both files arrive together in sole commit.

**Interpretation:** No earlier stage explains copying. Past-only question: container comment mismatches snapshot role.

## Classification

| # | Origin | Dimension | Type | Approach | Evidence | Strength | Relationships |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.3 (react-js/container, Build); 3.4.3 (react-js/container/config, Markers); 3.4.5 #1 (Configuration); 3.4.6 #1 (Artifacts); 3.4.7 #2 (Evidence) | 2 configuration | configuration | module-federation | architectural | strong | configures #24; configures #32 |
| 2 | 3.4.3 (react-js/marketing, Build); 3.4.3 (react-js/marketing/config, Markers); 3.4.4 (react-js/marketing/src/bootstrap.js:22, Observation); 3.4.5 #1 (Configuration); 3.4.6 #2 (Artifacts); 3.4.7 #4 (Evidence) | 2 configuration | configuration | module-federation | technological | moderate | configures #27; configures #32 |
| 3 | 3.4.3 (simple-js/Cart, Markers and Build); 3.4.4 (simple-js/Cart/src/bootstrap.js:3, Observation); 3.4.5 #2 (Configuration); 3.4.6 #3 (Artifacts) | 2 configuration | configuration | module-federation | technological | moderate | configures #29; configures #33 |
| 4 | 3.4.3 (simple-js/Container, Markers and Build); 3.4.5 #2, #3 (Configuration); 3.4.6 #4 (Artifacts) | 2 configuration | configuration | module-federation | architectural | strong | configures #30; configures #33; configures #34 |
| 5 | 3.4.3 (simple-js/Products, Markers and Build); 3.4.4 (simple-js/Products/src/bootstrap.js:3, Observation); 3.4.5 #3 (Configuration); 3.4.6 #5 (Artifacts) | 2 configuration | configuration | module-federation | technological | moderate | configures #31; configures #34 |
| 6 | 3.4.4 (react-js/container/src/index.js:1) | 3 code | source code | — | technological | weak | — |
| 7 | 3.4.4 (react-js/marketing/src/index.js:1) | 3 code | source code | — | technological | weak | — |
| 8 | 3.4.4 (simple-js/Cart/src/index.js:1) | 3 code | source code | — | technological | weak | — |
| 9 | 3.4.4 (simple-js/Container/src/index.js:1) | 3 code | source code | — | technological | weak | — |
| 10 | 3.4.4 (simple-js/Products/src/index.js:1) | 3 code | source code | — | technological | weak | — |
| 11 | 3.4.4 (react-js/container/src/bootstrap.js:22) | 3 code | source code | module-federation | technological | weak | — |
| 12 | 3.4.4 (react-js/marketing/src/bootstrap.js:22) | 3 code | source code | module-federation | technological | moderate | implements #32 |
| 13 | 3.4.4 (simple-js/Cart/src/bootstrap.js:3) | 3 code | source code | module-federation | technological | moderate | implements #33 |
| 14 | 3.4.4 (simple-js/Products/src/bootstrap.js:3) | 3 code | source code | module-federation | technological | moderate | implements #34 |
| 15 | 3.4.4 (react-js/container/src/components/MarketingApp.js:9) | 3 code | source code | module-federation | technological | moderate | implements #32 |
| 16 | 3.4.4 (simple-js/Cart/src/bootstrap.js:13) | 3 code | source code | module-federation | technological | weak | — |
| 17 | 3.4.4 (simple-js/Products/src/bootstrap.js:17) | 3 code | source code | module-federation | technological | weak | — |
| 18 | 3.4.4 (react-js/container/src/components/MarketingApp.js:3) | 3 code | source code | module-federation | architectural | strong | implements #32 |
| 19 | 3.4.4 (simple-js/Container/src/bootstrap.js:1) | 3 code | source code | module-federation | architectural | strong | implements #34 |
| 20 | 3.4.4 (simple-js/Container/src/bootstrap.js:2) | 3 code | source code | module-federation | architectural | strong | implements #33 |
| 21 | 3.4.4 (simple-js/Container/src/bootstrap.js:4) | 3 code | source code | module-federation | technological | moderate | implements #34 |
| 22 | 3.4.4 (simple-js/Container/src/bootstrap.js:5) | 3 code | source code | module-federation | technological | moderate | implements #33 |
| 23 | 3.4.3 (react-js/auth) | 4 structure | directory | — | context | weak | — |
| 24 | 3.4.3 (react-js/container) | 4 structure | directory | — | architectural | moderate | — |
| 25 | 3.4.3 (react-js/container/config) | 4 structure | directory | — | context | weak | — |
| 26 | 3.4.3 (react-js/dashboard) | 4 structure | directory | — | context | weak | — |
| 27 | 3.4.3 (react-js/marketing) | 4 structure | directory | — | architectural | moderate | — |
| 28 | 3.4.3 (react-js/marketing/config) | 4 structure | directory | — | context | weak | — |
| 29 | 3.4.3 (simple-js/Cart) | 4 structure | directory | — | architectural | moderate | — |
| 30 | 3.4.3 (simple-js/Container) | 4 structure | directory | — | architectural | moderate | — |
| 31 | 3.4.3 (simple-js/Products) | 4 structure | directory | — | architectural | moderate | — |
| 32 | 3.4.5 #1 | 5 composition | source code | module-federation | architectural | strong | links #24; links #27 |
| 33 | 3.4.5 #2 | 5 composition | source code | module-federation | architectural | strong | links #30; links #29 |
| 34 | 3.4.5 #3 | 5 composition | source code | module-federation | architectural | strong | links #30; links #31 |
| 35 | 3.4.6 #1 | 6 build-deploy | configuration | — | architectural | moderate | publishes #24 |
| 36 | 3.4.6 #2 | 6 build-deploy | configuration | — | architectural | moderate | publishes #27 |
| 37 | 3.4.6 #3 | 6 build-deploy | configuration | — | architectural | moderate | publishes #29 |
| 38 | 3.4.6 #4 | 6 build-deploy | configuration | — | architectural | moderate | publishes #30 |
| 39 | 3.4.6 #5 | 6 build-deploy | configuration | — | architectural | moderate | publishes #31 |
| 40 | 3.4.7 #1 | 7 documentation | comment | — | architectural | weak | corroborates react-js/container/src/bootstrap.js:12-17; corroborates react-js/container/public/index.html:5 |
| 41 | 3.4.7 #2 | 7 documentation | comment | — | architectural | weak | contradicts #1 |
| 42 | 3.4.7 #3 | 7 documentation | comment | — | architectural | weak | corroborates #27 |
| 43 | 3.4.7 #4 | 7 documentation | comment | — | architectural | weak | corroborates #32; corroborates #2; corroborates #18; corroborates #15 |
| 44 | 3.4.8 #1 | 8 history | history | — | architectural | weak | explains #23; explains #26 |
| 45 | 3.4.8 #2 | 8 history | history | — | architectural | weak | explains #35; explains #36 |
| 46 | 3.4.8 #3 | 8 history | history | — | architectural | weak | explains #41; explains #11 |

## Summary

Observations: 46. Dimensions (technology: 0, configuration: 5, code: 17, structure: 9, composition: 3, build-deploy: 5, documentation: 4, history: 3). Strength (strong: 8, moderate: 19, weak: 19, ambiguous: 0). Evidence (technological: 17, architectural: 25, context: 4).

