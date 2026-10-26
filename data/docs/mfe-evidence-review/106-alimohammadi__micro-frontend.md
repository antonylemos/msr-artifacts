---
schema: 1
id: 971885751
full_name: alimohammadi/micro-frontend
commit: 7a05f74105f816f60621d9ba9171b269aa8e5cab
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

# 106 — alimohammadi/micro-frontend

## Repository overview

Repository contains course code, with two independent Module Federation examples: `ecomm/` (container, products and cart, in plain JavaScript) and `packages/` (container and marketing, in React). Both use native webpack 5 plugin, so there is no dependency observation. Both examples have same chain:
- **Configuration:**
  - host declares remotes (#2 in `ecomm`; #4 and #5 in `packages`);
  - each remote declares itself and exposes a module whose contract is a `mount` function (#1, #3, #6, #7).
- **Code:** host imports remote module by name (#17 through #19) and calls `mount` in its own element (#16, #20, #21). Remotes export `mount` (#11 through #13).
- **Relationships:** three active relationships result: container → cart and container → products in `ecomm` (#31, #32), and container → marketing in `packages` (#33).

Five applications have their own builds (#34 through #38). No observed deployment. In `ecomm` only development server exists. In `packages` there is also production build, but remote address depends on `PRODUCTION_DOMAIN`, without a snapshot value (#5). Active relationship relies on development configuration (#4).

Signals misleading when read alone:
- **Asynchronous bootstrap and local mounting:** asynchronous bootstraps (#8 through #10) and mounting in remote's own development element (#14, #15) are internal to each unit.
- **Manifest-only folders:** `packages/auth` and `packages/dashboard` only contain `package.json` and lockfile (#25, #28). History shows they never contained another file (#46).
- **"development or production":** `mount.js` comments in `ecomm` say remote also runs through container in production (#40, #43). Example only has development configuration, and history shows this has been true since commit introducing comment (#47).

Remote comments (#39 through #45) describe standalone mounting and mounting through container, matching code. Nothing remains ambiguous in snapshot.

## Observations

### 1. ecomm/cart/webpack.config.js:1-26

**Observation:** `ModuleFederationPlugin` declares `name: "cart"` and `filename: "remoteEntry.js"`, exposes `./CartShow` (`./src/mount`) and shares `faker` with `singleton: true`. Configuration is development-only (`mode: "development"`, port 8082).

**Interpretation:** Cart is configured as remote and offers its `mount` to a host.

### 2. ecomm/container/webpack.config.js:1-29

**Observation:** `ModuleFederationPlugin` declares `name: "container"` and remotes `products: "products@http://localhost:8081/remoteEntry.js"` and `carts: "cart@http://localhost:8082/remoteEntry.js"`. Configuration is development-only (`mode: "development"`, port 8080).

**Interpretation:** Host configuration declares two remotes and where to find them in development. Local name `carts` points to container `cart`.

### 3. ecomm/products/webpack.config.js:1-22

**Observation:** `ModuleFederationPlugin` declares `name: "products"` and `filename: "remoteEntry.js"`, exposes `./ProductsIndex` (`./src/mount.js`) and shares `faker`. Configuration is development-only (`mode: "development"`, port 8081).

**Interpretation:** Products is configured as remote and offers its `mount` to a host.

### 4. packages/container/config/webpack.dev.js:1-26

**Observation:** `ModuleFederationPlugin` declares `name: "container"` and remote `marketing: "marketing@http://localhost:8081/remoteEntry.js"`, sharing `dependencies` from `package.json`. Configuration is for development (`mode: "development"`, port 8080) and merges with `webpack.common.js`.

**Interpretation:** Host configuration declares marketing remote and where to find it in development.

### 5. packages/container/config/webpack.prod.js:1-25

**Observation:** `ModuleFederationPlugin` declares `name: "container"` and remote `` marketing: `marketing@${domain}/marketing/remoteEntry.js` ``, with `domain` read from `process.env.PRODUCTION_DOMAIN`, sharing `dependencies` from `package.json`. Build is for production, with `publicPath: "/container/latest/"`.

**Interpretation:** Host production configuration declares same marketing remote. Address depends on environment variable without snapshot value.

### 6. packages/marketing/config/webpack.dev.js:1-31

**Observation:** `ModuleFederationPlugin` declares `name: "marketing"` and `filename: "remoteEntry.js"`, exposes `./MarketingApp` (`./src/bootstrap`) and shares `dependencies` from `package.json`. Configuration is for development (port 8081).

**Interpretation:** Marketing is configured as remote and offers its bootstrap to a host.

### 7. packages/marketing/config/webpack.prod.js:1-23

**Observation:** `ModuleFederationPlugin` repeats `name: "marketing"`, `filename: "remoteEntry.js"`, exposure `./MarketingApp` (`./src/bootstrap`) and sharing of `dependencies`. Build is for production, with hashed filenames.

**Interpretation:** Marketing is also configured as remote in production build.

### 8. ecomm/container/src/index.js:1

**Observation:** `import('./bootstrap')`.

**Interpretation:** An asynchronous bootstrap internal to unit.

### 9. packages/container/src/index.js:1

**Observation:** `import('./bootstrap')`.

**Interpretation:** An asynchronous bootstrap internal to unit.

### 10. packages/marketing/src/index.js:1

**Observation:** `import("./bootstrap")`.

**Interpretation:** An asynchronous bootstrap internal to unit.

### 11. ecomm/cart/src/mount.js:26; ecomm/cart/src/mount.js:3-7

**Observation:** `export { mount }`. Function `mount(el)` writes cart text into received element, with a number generated by `faker`. File is exposed as `./CartShow`.

**Interpretation:** Cart offers mount function to host.

### 12. ecomm/products/src/mount.js:31; ecomm/products/src/mount.js:5-12

**Observation:** `export { mount }`. Function `mount(el)` writes three product names generated by `faker` into received element. File is exposed as `./ProductsIndex`.

**Interpretation:** Products offers mount function to host.

### 13. packages/marketing/src/bootstrap.js:17; packages/marketing/src/bootstrap.js:6-8

**Observation:** `export { mount }`. Function `mount(el)` executes `ReactDom.render(<App />, el)`. File is exposed as `./MarketingApp`.

**Interpretation:** Marketing offers host function mounting its application.

### 14. ecomm/cart/src/mount.js:17; ecomm/cart/src/mount.js:14-19; ecomm/cart/public/index.html:9

**Observation:** In `NODE_ENV === "development"`, calls `mount` on `#dev-cart` when element exists. Element is in cart own `index.html`.

**Interpretation:** Mounting internal to unit, to run it standalone.

### 15. ecomm/products/src/mount.js:22; ecomm/products/src/mount.js:19-24; ecomm/products/public/index.html:9

**Observation:** In `NODE_ENV === "development"`, calls `mount` on `#dev-products` when element exists. Element is in products own `index.html`.

**Interpretation:** Mounting internal to unit, to run it standalone.

### 16. packages/container/src/components/MarketingApp.js:8; packages/container/src/components/MarketingApp.js:7-11; packages/container/src/App.js:10

**Observation:** `mount(ref.current)` inside a `useEffect`, on `div` rendered by component. Component is rendered by container `App`.

**Interpretation:** Host mounts remote in its own element through imported function.

### 17. ecomm/container/src/bootstrap.js:1

**Observation:** `import { mount as productsMount } from "products/ProductsIndex"`.

**Interpretation:** Host imports module exposed by products remote, through its name.

### 18. ecomm/container/src/bootstrap.js:3

**Observation:** `import { mount as cartMount } from "carts/CartShow"`.

**Interpretation:** Host imports module exposed by cart remote, through local name `carts`.

### 19. packages/container/src/components/MarketingApp.js:1

**Observation:** `import { mount } from "marketing/MarketingApp"`.

**Interpretation:** Host imports module exposed by marketing remote, through its name.

### 20. ecomm/container/src/bootstrap.js:5; ecomm/container/public/index.html:9

**Observation:** `productsMount(document.querySelector("#my-products"))`. Element is in `index.html` of container.

**Interpretation:** Host mounts remote in a fixed element on its page through imported function.

### 21. ecomm/container/src/bootstrap.js:6; ecomm/container/public/index.html:10

**Observation:** `cartMount(document.querySelector("#my-cart"))`. Element is in `index.html` of container.

**Interpretation:** Host mounts remote in a fixed element on its page through imported function.

### 22. ecomm/cart; ecomm/cart/package.json:1-24; ecomm/cart/src/index.js:1; ecomm/cart/webpack.config.js:4-26; ecomm/cart/package.json:6

**Observation:** JavaScript application with its own manifest, entry and webpack configuration, served through `webpack serve`.

**Interpretation:** Frontend unit with its own boundary.

### 23. ecomm/container; ecomm/container/package.json:1-22; ecomm/container/src/index.js:1; ecomm/container/webpack.config.js:4-29; ecomm/container/package.json:6

**Observation:** JavaScript application with its own manifest, entry and webpack configuration, served through `webpack serve`.

**Interpretation:** Frontend unit with its own boundary.

### 24. ecomm/products; ecomm/products/package.json:1-24; ecomm/products/src/index.js:1; ecomm/products/webpack.config.js:4-22; ecomm/products/package.json:6

**Observation:** JavaScript application with its own manifest, entry and webpack configuration, served through `webpack serve`. Manifest declares `name` `container`.

**Interpretation:** Frontend unit with its own boundary. Manifest `name` does not change federated name, which comes from plugin.

### 25. packages/auth; packages/auth/package.json:1-29

**Observation:** Folder only contains `package.json`, with a test script, and lockfile. No code, entry or build.

**Interpretation:** Not a frontend unit in snapshot.

### 26. packages/container; packages/container/package.json:1-30; packages/container/src/index.js:1; packages/container/src/bootstrap.js:5; packages/container/config/webpack.dev.js:6-26; packages/container/config/webpack.prod.js:8-25; packages/container/package.json:5-6

**Observation:** React application with its own entry and development and production webpack builds, triggered by `start` and `build` scripts.

**Interpretation:** Frontend unit with its own boundary.

### 27. packages/container/config

**Observation:** Folder contains container webpack configurations.

**Interpretation:** Part of container build rather than application.

### 28. packages/dashboard; packages/dashboard/package.json:1-33

**Observation:** Folder only contains `package.json`, with a test script, and lockfile. No code, entry or build.

**Interpretation:** Not a frontend unit in snapshot.

### 29. packages/marketing; packages/marketing/package.json:1-30; packages/marketing/src/index.js:1; packages/marketing/src/bootstrap.js:10-14; packages/marketing/config/webpack.dev.js:7-31; packages/marketing/config/webpack.prod.js:6-23; packages/marketing/package.json:5-6

**Observation:** React application with its own entry and development and production webpack builds, triggered by `start` and `build` scripts.

**Interpretation:** Frontend unit with its own boundary.

### 30. packages/marketing/config

**Observation:** Folder contains marketing webpack configurations.

**Interpretation:** Part of marketing build rather than application.

### 31. ecomm/container/src/bootstrap.js:3, 6; ecomm/container/webpack.config.js:20-23; ecomm/cart/webpack.config.js:10-15; ecomm/cart/src/mount.js:26

**Observation:** Container imports `mount` from `carts/CartShow` and calls it on `#my-cart`. Local name `carts` points to `cart@http://localhost:8082/remoteEntry.js`, and name and module match cart configuration.

**Interpretation:** An active host → remote relationship.

### 32. ecomm/container/src/bootstrap.js:1, 5; ecomm/container/webpack.config.js:20-21; ecomm/products/webpack.config.js:10-15; ecomm/products/src/mount.js:31

**Observation:** Container imports `mount` from `products/ProductsIndex` and calls it on `#my-products`. Name and module match products configuration.

**Interpretation:** An active host → remote relationship.

### 33. packages/container/src/components/MarketingApp.js:1, 8; packages/container/config/webpack.dev.js:16-20; packages/container/config/webpack.prod.js:15-19; packages/marketing/config/webpack.dev.js:17-22; packages/marketing/config/webpack.prod.js:12-17; packages/marketing/src/bootstrap.js:17

**Observation:** Container adapter imports `mount` from `marketing/MarketingApp` and calls it on its `div`. Name and module match marketing configuration in development and production.

**Interpretation:** An active host → remote relationship, supported by development configuration triggered through `webpack serve`.

### 34. ecomm/cart/webpack.config.js:4-26; ecomm/cart/package.json:6

**Observation:** Own webpack configuration in development mode, used by `webpack serve` on port 8082, generating `remoteEntry.js`. No production build or deployment artifact.

**Interpretation:** Own build boundary restricted to development, without observed deployment.

### 35. ecomm/container/webpack.config.js:4-29; ecomm/container/package.json:6

**Observation:** Own webpack configuration in development mode, used by `webpack serve` on port 8080. No production build or deployment artifact.

**Interpretation:** Own build boundary restricted to development, without observed deployment.

### 36. ecomm/products/webpack.config.js:4-22; ecomm/products/package.json:6

**Observation:** Own webpack configuration in development mode, used by `webpack serve` on port 8081, generating `remoteEntry.js`. No production build or deployment artifact.

**Interpretation:** Own build boundary restricted to development, without observed deployment.

### 37. packages/container/config/webpack.prod.js:8-25; packages/container/package.json:6; packages/container/config/webpack.dev.js:6-26; packages/container/package.json:5

**Observation:** Own development (`webpack serve`, port 8080) and production (`webpack --config config/webpack.prod.js`, `publicPath` `/container/latest/`) webpack configurations. No artifact publishes build.

**Interpretation:** Own build boundary including production, without observed deployment.

### 38. packages/marketing/config/webpack.prod.js:6-23; packages/marketing/package.json:6; packages/marketing/config/webpack.dev.js:7-31; packages/marketing/package.json:5

**Observation:** Own development (`webpack serve`, port 8081) and production (`webpack --config config/webpack.prod.js`) webpack configurations, generating `remoteEntry.js`. Production path `${PRODUCTION_DOMAIN}/marketing/remoteEntry.js` only appears on container side. No artifact publishes build.

**Interpretation:** Own build boundary including production, without observed deployment.

### 39. ecomm/cart/src/mount.js:9-13

**Observation:** "we are running this file in development in isolation / we are using our local index.html file / ... / we want to immediately render our app into that element".

**Interpretation:** Claims cart mounts itself when standalone. Claim corroborated. Element `'dev-products'` cited in comment remains from products copy; code uses `#dev-cart`.

### 40. ecomm/cart/src/mount.js:21-25

**Observation:** "we are running this file in development or production / we are running through the container app / ... / we want to NOT immediately render the app".

**Interpretation:** Claims cart loads through container in development or production and only exports `mount`. Container loading corroborated; production mention has no artifact because example only has development configuration. Claim partially corroborated.

### 41. ecomm/cart/webpack.config.js:18

**Observation:** "load only one single faker no matter what", in `shared` for `faker` with `singleton: true`.

**Interpretation:** Claims there will be a single shared `faker` instance. Claim corroborated: cart and products share `faker` and import it.

### 42. ecomm/products/src/mount.js:14-18

**Observation:** "we are running this file in development in isolation / we are using our local index.html file / which DEFINITELY has an element with id of 'dev-products' / we want to immediately render our app into that element".

**Interpretation:** Claims products mounts itself when standalone. Claim corroborated.

### 43. ecomm/products/src/mount.js:26-30

**Observation:** "we are running this file in development or production / we are running through the container app / ... / we want to NOT immediately render the app".

**Interpretation:** Claims products loads through container in development or production and only exports `mount`. Container loading corroborated; production mention has no artifact. Claim partially corroborated.

### 44. packages/marketing/src/bootstrap.js:9

**Observation:** "if we are in development mode and in isolation call mount imediately".

**Interpretation:** Claims marketing mounts itself when standalone. Claim corroborated.

### 45. packages/marketing/src/bootstrap.js:16

**Observation:** "We are running through container and we should export the mount function".

**Interpretation:** Claims marketing loads through container using `mount`. Claim corroborated.

### 46. 00dbb64 2025-04-27 (packages/auth, packages/dashboard)

**Observation:** Both folders are created in this commit with only `package.json` and `package-lock.json`, untouched by any later commit through snapshot.

**Interpretation:** Folders never contained code, and no code was removed. Whether applications were planned is unknown; they are not units in snapshot.

### 47. de130a5 2025-04-24 (ecomm/products/package.json); 3817fd6 2025-04-24 (ecomm/cart/package.json); a8c742c 2025-04-26 (ecomm/products/src/mount.js, ecomm/products/webpack.config.js); c784f55 2025-04-26 (ecomm/cart/src/mount.js, ecomm/cart/webpack.config.js)

**Observation:** `mount.js` files are created in `a8c742c` and `c784f55` and never change afterward. Webpack configurations change last in those commits, already with `mode: "development"`. `package.json` files, with sole script `webpack serve`, do not change after creation.

**Interpretation:** Comment "development or production" and development-only configuration have coexisted since commit introducing comment. No production-build stage corresponded to mention.

## Classification

| # | Origin | Dimension | Type | Approach | Evidence | Strength | Relationships |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.3 (ecomm/cart, Markers, Entry and Build); 3.4.4 (ecomm/cart/src/mount.js:26, Observation); 3.4.5 #1 (Configuration); 3.4.6 #1 (Where served and Artifacts); 3.4.7 #2 (Evidence); 3.4.7 #3 (Document and Evidence) | 2 configuration | configuration | module-federation | technological | moderate | configures #22; configures #31 |
| 2 | 3.4.3 (ecomm/container, Markers, Entry and Build); 3.4.4 (ecomm/container/src/bootstrap.js:1, :3, Observation); 3.4.5 #1, #2 (Configuration); 3.4.6 #2 (Where served and Artifacts) | 2 configuration | configuration | module-federation | architectural | strong | configures #23; configures #31; configures #32 |
| 3 | 3.4.3 (ecomm/products, Markers, Entry and Build); 3.4.4 (ecomm/products/src/mount.js:31, Observation); 3.4.5 #2 (Configuration); 3.4.6 #3 (Where served and Artifacts); 3.4.7 #3 (Evidence); 3.4.7 #5 (Evidence) | 2 configuration | configuration | module-federation | technological | moderate | configures #24; configures #32 |
| 4 | 3.4.3 (packages/container, Build); 3.4.3 (packages/container/config, Markers); 3.4.4 (packages/container/src/components/MarketingApp.js:1, Observation); 3.4.5 #3 (Configuration); 3.4.6 #4 (Where served and Artifacts) | 2 configuration | configuration | module-federation | architectural | strong | configures #26; configures #33 |
| 5 | 3.4.3 (packages/container, Build); 3.4.3 (packages/container/config, Markers); 3.4.5 #3 (Configuration); 3.4.6 #4 (Where served and Artifacts); 3.4.6 #5 (Where served) | 2 configuration | configuration | module-federation | architectural | strong | configures #26; configures #33 |
| 6 | 3.4.3 (packages/marketing, Entry and Build); 3.4.3 (packages/marketing/config, Markers); 3.4.4 (packages/marketing/src/bootstrap.js:17, Observation); 3.4.5 #3 (Configuration); 3.4.6 #5 (Where served and Artifacts); 3.4.7 #7 (Evidence) | 2 configuration | configuration | module-federation | technological | moderate | configures #29; configures #33 |
| 7 | 3.4.3 (packages/marketing, Build); 3.4.3 (packages/marketing/config, Markers); 3.4.5 #3 (Configuration); 3.4.6 #5 (Artifacts) | 2 configuration | configuration | module-federation | technological | moderate | configures #29; configures #33 |
| 8 | 3.4.4 (ecomm/container/src/index.js:1) | 3 code | source code | — | technological | weak | — |
| 9 | 3.4.4 (packages/container/src/index.js:1) | 3 code | source code | — | technological | weak | — |
| 10 | 3.4.4 (packages/marketing/src/index.js:1) | 3 code | source code | — | technological | weak | — |
| 11 | 3.4.4 (ecomm/cart/src/mount.js:26) | 3 code | source code | module-federation | technological | moderate | implements #31 |
| 12 | 3.4.4 (ecomm/products/src/mount.js:31) | 3 code | source code | module-federation | technological | moderate | implements #32 |
| 13 | 3.4.4 (packages/marketing/src/bootstrap.js:17) | 3 code | source code | module-federation | technological | moderate | implements #33 |
| 14 | 3.4.4 (ecomm/cart/src/mount.js:17) | 3 code | source code | module-federation | technological | weak | — |
| 15 | 3.4.4 (ecomm/products/src/mount.js:22) | 3 code | source code | module-federation | technological | weak | — |
| 16 | 3.4.4 (packages/container/src/components/MarketingApp.js:8) | 3 code | source code | module-federation | technological | moderate | implements #33 |
| 17 | 3.4.4 (ecomm/container/src/bootstrap.js:1) | 3 code | source code | module-federation | architectural | strong | implements #32 |
| 18 | 3.4.4 (ecomm/container/src/bootstrap.js:3) | 3 code | source code | module-federation | architectural | strong | implements #31 |
| 19 | 3.4.4 (packages/container/src/components/MarketingApp.js:1) | 3 code | source code | module-federation | architectural | strong | implements #33 |
| 20 | 3.4.4 (ecomm/container/src/bootstrap.js:5) | 3 code | source code | module-federation | technological | moderate | implements #32 |
| 21 | 3.4.4 (ecomm/container/src/bootstrap.js:6) | 3 code | source code | module-federation | technological | moderate | implements #31 |
| 22 | 3.4.3 (ecomm/cart) | 4 structure | directory | — | architectural | moderate | — |
| 23 | 3.4.3 (ecomm/container) | 4 structure | directory | — | architectural | moderate | — |
| 24 | 3.4.3 (ecomm/products) | 4 structure | directory | — | architectural | moderate | — |
| 25 | 3.4.3 (packages/auth) | 4 structure | directory | — | context | weak | — |
| 26 | 3.4.3 (packages/container) | 4 structure | directory | — | architectural | moderate | — |
| 27 | 3.4.3 (packages/container/config) | 4 structure | directory | — | context | weak | — |
| 28 | 3.4.3 (packages/dashboard) | 4 structure | directory | — | context | weak | — |
| 29 | 3.4.3 (packages/marketing) | 4 structure | directory | — | architectural | moderate | — |
| 30 | 3.4.3 (packages/marketing/config) | 4 structure | directory | — | context | weak | — |
| 31 | 3.4.5 #1 | 5 composition | source code | module-federation | architectural | strong | links #23; links #22 |
| 32 | 3.4.5 #2 | 5 composition | source code | module-federation | architectural | strong | links #23; links #24 |
| 33 | 3.4.5 #3 | 5 composition | source code | module-federation | architectural | strong | links #26; links #29 |
| 34 | 3.4.6 #1 | 6 build-deploy | configuration | — | architectural | moderate | publishes #22 |
| 35 | 3.4.6 #2 | 6 build-deploy | configuration | — | architectural | moderate | publishes #23 |
| 36 | 3.4.6 #3 | 6 build-deploy | configuration | — | architectural | moderate | publishes #24 |
| 37 | 3.4.6 #4 | 6 build-deploy | configuration | — | architectural | moderate | publishes #26 |
| 38 | 3.4.6 #5 | 6 build-deploy | configuration | — | architectural | moderate | publishes #29 |
| 39 | 3.4.7 #1 | 7 documentation | comment | — | architectural | weak | corroborates #22; corroborates #14 |
| 40 | 3.4.7 #2 | 7 documentation | comment | — | architectural | weak | partially corroborates #31; partially corroborates #11; partially corroborates #18; partially corroborates #21 |
| 41 | 3.4.7 #3 | 7 documentation | comment | — | technological | weak | corroborates #1; corroborates #3; corroborates ecomm/cart/src/mount.js:1; corroborates ecomm/products/src/mount.js:1 |
| 42 | 3.4.7 #4 | 7 documentation | comment | — | architectural | weak | corroborates #24; corroborates #15 |
| 43 | 3.4.7 #5 | 7 documentation | comment | — | architectural | weak | partially corroborates #32; partially corroborates #12; partially corroborates #17; partially corroborates #20 |
| 44 | 3.4.7 #6 | 7 documentation | comment | — | architectural | weak | corroborates #29; corroborates packages/marketing/src/bootstrap.js:10-14 |
| 45 | 3.4.7 #7 | 7 documentation | comment | — | architectural | weak | corroborates #33; corroborates #13; corroborates #6; corroborates #19; corroborates #16 |
| 46 | 3.4.8 #1 | 8 history | history | — | architectural | weak | explains #25; explains #28 |
| 47 | 3.4.8 #2 | 8 history | history | — | architectural | weak | explains #40; explains #43 |

## Summary

Observations: 47. Dimensions (technology: 0, configuration: 7, code: 14, structure: 9, composition: 3, build-deploy: 5, documentation: 7, history: 2). Strength (strong: 9, moderate: 20, weak: 18, ambiguous: 0). Evidence (technological: 16, architectural: 27, context: 4).

