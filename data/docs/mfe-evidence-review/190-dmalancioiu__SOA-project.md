---
schema: 1
id: 1134094230
full_name: dmalancioiu/SOA-project
commit: a00d6436b4a6c4f28287e7e90ded084c1241fcf1
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

# 190 — dmalancioiu/SOA-project

## Repository overview

Academic SOA project, a food-delivery platform. Spring Boot microservices in `backend/`, OpenFaaS functions in `infrastructure/faas/`. Four webpack React applications in `frontend/`, without aggregating workspace: `shell-app` host (#21), `restaurant-catalog`, `order-tracking` and `user-dashboard` remotes (#19, #20, #22). Function `order-completion` has `package.json` but is Express server rather than frontend (#23).

Module Federation chain complete in snapshot:
- **Dependency:** `@module-federation/enhanced` `^0.2.3` declared in host and two remotes (#1 through #3). `user-dashboard` does not declare it, using webpack built-in plugin (#7).
- **Configuration:** each remote names itself, generates `remoteEntry.js` and exposes domain component (#4, #5, #7). Host declares three remotes through fixed `localhost:3001` through `3003` URLs (#6). Four configurations share React, React Router, MUI and Emotion as singletons.
- **Code:** host loads each remote through `lazy(() => import(...))` (#8 through #10), mounting each at own route protected by `PrivateRoute` (#17).
- **Relationship:** three active host → remote relationships result, targets in snapshot (#24 through #26).
- **Build and deployment:** each application has own webpack build, Dockerfile and compose service, on port used by host to fetch `remoteEntry.js` (#31 through #34).

Beyond federation, units connect through session in `localStorage`. Shell writes `token` and `user` on login (#18), read by remotes running on shell page. `user-dashboard` also rewrites `user` (#28 through #30). Not a declared MFE mechanism: only works because all units share origin inside shell.

Window event `addToCart` remains ambiguous. Catalog dispatches on adding item (#15, #16), but no snapshot file listens, leaving relationship without resolved target (#27). History shows shell cart never listened, without saying whether channel planned but never connected or abandoned (#61). Four unit `import('./bootstrap')` calls follow Module Federation pattern but are internal (#11 through #14).

Extensive repetitive documentation essentially confirms host/remote organization, separate build/deployment, sharing and `localStorage` session (#35 through #38, #40 through #43, #45 through #48, #50 through #57, #59). Five claims refuted: shell exposes no contexts or services (#39); catalog item does not reach shell cart (#44, #58); cart and order reside in shell rather than catalog (#49); WebSocket package sharing does not avoid duplicate connections (#60). History shows discrepancies originate in same code stage rather than outdated documentation. Exception is shell order page, created in last commit (#62 through #64).

Configuration: 4 blocks retained, one per `webpack.config.js`, each serving one unit. Order follows first origin: three 3.4.2 rows then 3.4.3 `user-dashboard` unit. Excluded:
- docker-compose.yml. Services, ports and `depends_on` concern deployment (dimension 6). `REACT_APP_*_URL` variables passed to shell (docker-compose.yml:357-359) are not host remote-resolution addresses, fixed in `webpack.config.js`, as recorded by 3.4.6;
- infrastructure/nginx/nginx.conf, Dockerfiles and each application `nginx.conf`, proxy and publication (dimension 6);
- `scripts` in `package.json` files, concerning build, and `devServer.port` in `webpack.config.js`, development port marked as corroboration by 3.4.5;
- infrastructure/faas/order-completion/package.json, declaring no composition element.

## Observations

### 1. frontend/order-tracking/package.json:27

**Observation:** `@module-federation/enhanced` `^0.2.3` in `devDependencies`. Review marks configured through `require('@module-federation/enhanced/webpack')` and `ModuleFederationPlugin` in frontend/order-tracking/webpack.config.js:2, 45-59, read by scripts `webpack serve` and `webpack --mode production` (frontend/order-tracking/package.json:7-8).

**Interpretation:** `order-tracking` declares Module Federation plugin and uses it in build.

### 2. frontend/restaurant-catalog/package.json:25

**Observation:** `@module-federation/enhanced` `^0.2.3` in `devDependencies`. Review marks configured through `require` and `ModuleFederationPlugin` in frontend/restaurant-catalog/webpack.config.js:2, 44-58, read by scripts in frontend/restaurant-catalog/package.json:7-8.

**Interpretation:** `restaurant-catalog` declares Module Federation plugin and uses it in build.

### 3. frontend/shell-app/package.json:28

**Observation:** `@module-federation/enhanced` `^0.2.3` in `devDependencies`. Review marks configured through `require` and `ModuleFederationPlugin` with `remotes` in frontend/shell-app/webpack.config.js:2, 48-63, read by scripts in frontend/shell-app/package.json:7-8.

**Interpretation:** Host declares Module Federation plugin and uses it in build.

### 4. frontend/order-tracking/webpack.config.js:2; frontend/order-tracking/webpack.config.js:45-59

**Observation:** `new ModuleFederationPlugin({ name: 'orderTracking', filename: 'remoteEntry.js', exposes: { './OrderTracking': './src/OrderTracking' }, shared: { ... } })`, with `react`, `react-dom`, `react-router-dom`, `@mui/material`, `@emotion/react` and `@emotion/styled` as `singleton`. Plugin comes from `@module-federation/enhanced/webpack` (:2).

**Interpretation:** Unit configures itself as remote `orderTracking`, publishes `remoteEntry.js` and exposes module `./OrderTracking`.

### 5. frontend/restaurant-catalog/webpack.config.js:2; frontend/restaurant-catalog/webpack.config.js:44-58

**Observation:** `new ModuleFederationPlugin({ name: 'restaurantCatalog', filename: 'remoteEntry.js', exposes: { './RestaurantCatalog': './src/RestaurantCatalog' }, shared: { ... } })`, with same six libraries as `singleton`. Plugin comes from `@module-federation/enhanced/webpack` (:2).

**Interpretation:** Unit configures itself as remote `restaurantCatalog`, publishes `remoteEntry.js` and exposes module `./RestaurantCatalog`.

### 6. frontend/shell-app/webpack.config.js:2; frontend/shell-app/webpack.config.js:48-63

**Observation:** `new ModuleFederationPlugin({ name: 'shellApp', remotes: { restaurantCatalog: 'restaurantCatalog@http://localhost:3001/remoteEntry.js', orderTracking: 'orderTracking@http://localhost:3002/remoteEntry.js', userDashboard: 'userDashboard@http://localhost:3003/remoteEntry.js' }, shared: { ... } })`, with same six libraries as `singleton`. No `exposes`. Plugin comes from `@module-federation/enhanced/webpack` (:2).

**Interpretation:** Host configuration declares three remotes and fixed addresses of their `remoteEntry.js`, sharing UI libraries with them.

### 7. frontend/user-dashboard/webpack.config.js:2-3; frontend/user-dashboard/webpack.config.js:50-67

**Observation:** `new ModuleFederationPlugin({ name: 'userDashboard', filename: 'remoteEntry.js', exposes: { './UserDashboard': './src/UserDashboard' }, shared: { ... } })`, with same six libraries and `sockjs-client` and `@stomp/stompjs` as `singleton` (:63-65). Plugin comes from `require('webpack').container` (:3), below comment "FIX: Use the standard built-in plugin from 'webpack'" (:2).

**Interpretation:** Unit configures itself as remote `userDashboard`, publishes `remoteEntry.js` and exposes module `./UserDashboard` with webpack built-in plugin.

### 8. frontend/shell-app/src/App.js:21; frontend/shell-app/webpack.config.js:51; frontend/restaurant-catalog/webpack.config.js:48

**Observation:** `const RestaurantCatalog = lazy(() => import('restaurantCatalog/RestaurantCatalog'))`. Name matches remote declared in host, module exposed by `restaurant-catalog`. Component rendered at `/restaurants/*` route (frontend/shell-app/src/App.js:77-84).

**Interpretation:** Host loads module exposed by remote `restaurantCatalog` by name at runtime.

### 9. frontend/shell-app/src/App.js:22; frontend/shell-app/webpack.config.js:52; frontend/order-tracking/webpack.config.js:49

**Observation:** `const OrderTracking = lazy(() => import('orderTracking/OrderTracking'))`, rendered at `/orders/*` route (frontend/shell-app/src/App.js:86-93).

**Interpretation:** Host loads module exposed by remote `orderTracking` by name at runtime.

### 10. frontend/shell-app/src/App.js:23; frontend/shell-app/webpack.config.js:53; frontend/user-dashboard/webpack.config.js:54

**Observation:** `const UserDashboard = lazy(() => import('userDashboard/UserDashboard'))`, rendered at `/dashboard/*` route (frontend/shell-app/src/App.js:95-102).

**Interpretation:** Host loads module exposed by remote `userDashboard` by name at runtime.

### 11. frontend/order-tracking/src/index.js:1

**Observation:** `import('./bootstrap')`, loading frontend/order-tracking/src/bootstrap.js, of same unit.

**Interpretation:** An asynchronous bootstrap internal to `order-tracking`.

### 12. frontend/restaurant-catalog/src/index.js:1

**Observation:** `import('./bootstrap')`, loading frontend/restaurant-catalog/src/bootstrap.js, of same unit.

**Interpretation:** An asynchronous bootstrap internal to `restaurant-catalog`.

### 13. frontend/shell-app/src/index.js:1

**Observation:** `import('./bootstrap')`, loading frontend/shell-app/src/bootstrap.js, where `App` mounts (:3-6).

**Interpretation:** An asynchronous bootstrap internal to host.

### 14. frontend/user-dashboard/src/index.js:1

**Observation:** `import('./bootstrap')`, loading frontend/user-dashboard/src/bootstrap.js, of same unit.

**Interpretation:** An asynchronous bootstrap internal to `user-dashboard`.

### 15. frontend/restaurant-catalog/src/components/MenuView.js:56; frontend/restaurant-catalog/src/components/MenuView.js:53-61

**Observation:** `window.dispatchEvent(new CustomEvent('addToCart', { detail: { item, restaurant } }))` in `handleAddToCart`, linked to each menu item button. `MenuView` is exposed-module route (frontend/restaurant-catalog/src/RestaurantCatalog.js:12). Comments at :54-55 point to shell cart as target, but no snapshot file registers listener for `addToCart`; shell `CartContext` only has same-named function (frontend/shell-app/src/context/CartContext.js:38, 100). Review marks composition undetermined.

**Interpretation:** Two readings remain plausible. Dispatch is shell-intended communication channel incomplete in snapshot, or event reaching no unit and not participating in composition.

### 16. frontend/restaurant-catalog/src/components/MenuView.js:57

**Observation:** `new CustomEvent('addToCart', ...)`, event dispatched on preceding line, without snapshot receiver. Review marks composition undetermined for same reason.

**Interpretation:** Same uncertainty as observation #15: event may be shell channel without listener, or dispatch reaching no unit.

### 17. frontend/shell-app/src/App.js:72-104; frontend/shell-app/src/App.js:21-23; frontend/shell-app/src/App.js:71

**Observation:** Host `<Routes>` inside `Suspense`: `/`, `/login`, `/register` and `/cart` are shell pages. `/restaurants/*` → `<RestaurantCatalog />`, `/orders/*` → `<OrderTracking />` and `/dashboard/*` → `<UserDashboard />`, each inside `PrivateRoute`. Three components come from `lazy` calls at :21-23.

**Interpretation:** Route table linking host paths to three remote components.

### 18. frontend/shell-app/src/context/AuthContext.js:38; frontend/shell-app/src/context/AuthContext.js:38-39, 53-54, 61-62

**Observation:** `localStorage.setItem('token', response.token)` and `localStorage.setItem('user', ...)` on login; same on registration, `removeItem` on logout. `AuthProvider` wraps app in frontend/shell-app/src/App.js:66. Remotes read same keys in HTTP interceptors (e.g. frontend/restaurant-catalog/src/services/restaurantService.js:15), and `user-dashboard` reads `user` in frontend/user-dashboard/src/UserDashboard.js:12-13.

**Interpretation:** Host publishes session in `localStorage` keys consumed by remotes, a shared-state channel. Row does not name target unit.

### 19. frontend/order-tracking; frontend/order-tracking/package.json; frontend/order-tracking/webpack.config.js:7, 61; frontend/order-tracking/src/bootstrap.js:7-8; frontend/order-tracking/webpack.config.js:44-64; frontend/order-tracking/package.json:8

**Observation:** Project with own manifest and `webpack.config.js`. Entry `./src/index.js` loads bootstrap with `createRoot`, page from `./public/index.html`. Build `webpack --mode production`, own Dockerfile and compose service (docker-compose.yml:317-319). No workspace.

**Interpretation:** Frontend unit with own boundary, remote React application.

### 20. frontend/restaurant-catalog; frontend/restaurant-catalog/package.json; frontend/restaurant-catalog/webpack.config.js:7, 60; frontend/restaurant-catalog/src/bootstrap.js:7-8; frontend/restaurant-catalog/webpack.config.js:43-63; frontend/restaurant-catalog/package.json:8

**Observation:** Project with own manifest and `webpack.config.js`, entry `./src/index.js`, page from `./public/index.html` and `webpack --mode production`. Own Dockerfile and compose service (docker-compose.yml:301-303).

**Interpretation:** Frontend unit with own boundary, remote React application.

### 21. frontend/shell-app; frontend/shell-app/package.json; frontend/shell-app/webpack.config.js:7, 65; frontend/shell-app/src/bootstrap.js:5-6; frontend/shell-app/webpack.config.js:47-68; frontend/shell-app/package.json:8

**Observation:** Project with own manifest and `webpack.config.js`, entry `./src/index.js` mounting `App` with `ReactDOM.createRoot`, page from `./public/index.html` and `webpack --mode production`. Own Dockerfile and compose service (docker-compose.yml:349-351).

**Interpretation:** Frontend unit with own boundary, composition host.

### 22. frontend/user-dashboard; frontend/user-dashboard/package.json; frontend/user-dashboard/webpack.config.js:8, 69; frontend/user-dashboard/src/bootstrap.js:7-8; frontend/user-dashboard/webpack.config.js:49-72; frontend/user-dashboard/package.json:19

**Observation:** Project with own manifest and `webpack.config.js`, entry `./src/index.js`, page from `./public/index.html` and `webpack --mode production`. Own Dockerfile and compose service (docker-compose.yml:333-335).

**Interpretation:** Frontend unit with own boundary, remote React application.

### 23. infrastructure/faas/order-completion; infrastructure/faas/order-completion/package.json:5; infrastructure/faas/order-completion/handler.js:1-2; infrastructure/faas/order-completion/Dockerfile:1, 25

**Observation:** Project with own `package.json`, `main: handler.js` and Express server in `handler.js`. Image `node:18-alpine` with `CMD ["node", "handler.js"]`. No page or UI entry.

**Interpretation:** OpenFaaS Node function rather than frontend unit.

### 24. frontend/shell-app/webpack.config.js:51; frontend/restaurant-catalog/webpack.config.js:45-46, 48; frontend/shell-app/src/App.js:21; frontend/shell-app/src/App.js:72

**Observation:** Host declares remote `restaurantCatalog@http://localhost:3001/remoteEntry.js`. `restaurant-catalog` has `name: 'restaurantCatalog'`, `filename: 'remoteEntry.js'` and exposes `./RestaurantCatalog`. Host imports `restaurantCatalog/RestaurantCatalog`, mounting at `/restaurants/*` route. Both units in snapshot.

**Interpretation:** An active Module Federation host → remote relationship from `shell-app` to `restaurant-catalog`.

### 25. frontend/shell-app/webpack.config.js:52; frontend/order-tracking/webpack.config.js:46-47, 49; frontend/shell-app/src/App.js:22; frontend/shell-app/src/App.js:72

**Observation:** Host declares `orderTracking@http://localhost:3002/remoteEntry.js`. `order-tracking` has `name: 'orderTracking'`, `filename: 'remoteEntry.js'` and exposes `./OrderTracking`. Host imports `orderTracking/OrderTracking`, mounting at `/orders/*` route.

**Interpretation:** An active Module Federation host → remote relationship from `shell-app` to `order-tracking`.

### 26. frontend/shell-app/webpack.config.js:53; frontend/user-dashboard/webpack.config.js:51-52, 54; frontend/shell-app/src/App.js:23; frontend/shell-app/src/App.js:72

**Observation:** Host declares `userDashboard@http://localhost:3003/remoteEntry.js`. `user-dashboard` has `name: 'userDashboard'`, `filename: 'remoteEntry.js'` and exposes `./UserDashboard`, with webpack built-in plugin. Host imports `userDashboard/UserDashboard`, mounting at `/dashboard/*` route.

**Interpretation:** An active Module Federation host → remote relationship from `shell-app` to `user-dashboard`.

### 27. frontend/restaurant-catalog/src/components/MenuView.js:56; frontend/restaurant-catalog/src/components/MenuView.js:57

**Observation:** `restaurant-catalog` dispatches window event `addToCart` inside shell page. No snapshot file listens, and comment pointing to shell cart is not explicit correspondence. Relationship has type communication, mechanism `events`, target `addToCart` (event name), In snapshot `Undetermined` and Active `Undetermined`.

**Interpretation:** Two readings remain plausible: catalog-to-shell communication incomplete in snapshot, or targetless event linking no units.

### 28. frontend/shell-app/src/context/AuthContext.js:38; frontend/order-tracking/src/services/orderService.js:15-17; frontend/order-tracking/src/services/websocketService.js:13

**Observation:** Shell writes `token` on login and registration, deleting on logout and 401. `order-tracking` only reads key in HTTP interceptor and WebSocket connection. No configuration declares channel. Relationship has type communication, direction source → target, mechanism `other`, In snapshot `Yes` and Active `Yes`.

**Interpretation:** An active shared-state communication relationship in `localStorage` from `shell-app` to `order-tracking`. Only with remote inside shell page on same origin.

### 29. frontend/shell-app/src/context/AuthContext.js:38; frontend/restaurant-catalog/src/services/restaurantService.js:15-17

**Observation:** Same channel: `restaurant-catalog` only reads `token` in HTTP interceptor, writing no session key. Relationship has direction source → target, mechanism `other`, In snapshot `Yes` and Active `Yes`.

**Interpretation:** An active shared-state communication relationship in `localStorage` from `shell-app` to `restaurant-catalog`.

### 30. frontend/shell-app/src/context/AuthContext.js:38-39; frontend/user-dashboard/src/UserDashboard.js:12-13; frontend/user-dashboard/src/components/UserProfile.js:91-92; frontend/shell-app/src/context/AuthContext.js:21-24

**Observation:** Shell writes `token` and `user`. `user-dashboard` reads `user` to select driver view and `token` in services. Saving profile rewrites `user`, read by shell when mounting `AuthProvider` and in `getCurrentUser`. Relationship has direction bidirectional, mechanism `other`, In snapshot `Yes` and Active `Yes`.

**Interpretation:** An active bidirectional shared-state communication relationship in `localStorage` between `shell-app` and `user-dashboard`.

### 31. frontend/order-tracking/package.json:8; frontend/order-tracking/webpack.config.js:46-47; frontend/order-tracking/Dockerfile:2-31; frontend/order-tracking/nginx.conf:26-28; docker-compose.yml:317-326

**Observation:** Build `webpack --mode production` generates unit `remoteEntry.js`. Multi-stage Dockerfile runs `npm ci` and `npm run build`, serving `dist` through nginx. Compose service `order-tracking` uses folder as context, publishing port 3002, matching host URL. No named image or tag, and manifest `version` unused in publication. Dockerfiles run `npm ci` without snapshot lockfile.

**Interpretation:** `order-tracking` has separate build and deployment without independent versioning.

### 32. frontend/restaurant-catalog/package.json:8; frontend/restaurant-catalog/webpack.config.js:45-46; frontend/restaurant-catalog/Dockerfile:2-31; frontend/restaurant-catalog/nginx.conf:26-28; docker-compose.yml:301-310

**Observation:** Same arrangement: own webpack build, nginx image and service `restaurant-catalog` on port 3001, matching `http://localhost:3001/remoteEntry.js` in host. No own version used in publication.

**Interpretation:** `restaurant-catalog` has separate build and deployment without independent versioning.

### 33. frontend/shell-app/package.json:8; frontend/shell-app/webpack.config.js:48-54; frontend/shell-app/Dockerfile:2-31; frontend/shell-app/nginx.conf:26-28; docker-compose.yml:349-361; infrastructure/nginx/nginx.conf:13-15, 37-38

**Observation:** Host has own build and image containing only own `dist`; remotes fetched at runtime through fixed URLs. Service `shell-app` publishes port 3000, and edge nginx proxies `/` only to it. Compose passes remote URLs to shell in `REACT_APP_*_URL`, not reaching bundle. No own version used in publication.

**Interpretation:** Host has separate build and deployment, sole application behind edge nginx, without independent versioning.

### 34. frontend/user-dashboard/package.json:19; frontend/user-dashboard/webpack.config.js:51-52; frontend/user-dashboard/Dockerfile:2-31; frontend/user-dashboard/nginx.conf:26-28; docker-compose.yml:333-342

**Observation:** Own webpack build, nginx image and service `user-dashboard` on port 3003, matching `http://localhost:3003/remoteEntry.js` in host. `start` passes port on command line. No own version used in publication.

**Interpretation:** `user-dashboard` has separate build and deployment without independent versioning.

### 35. FRONTEND_IMPLEMENTATION.md:3

**Observation:** "Complete implementation of all React frontend applications using Module Federation for micro frontend architecture."

**Interpretation:** Claims all frontend applications use Module Federation. Host and two remotes use `@module-federation/enhanced`, `user-dashboard` uses built-in plugin, and shell composes three remotes. Claim corroborated.

### 36. FRONTEND_IMPLEMENTATION.md:7

**Observation:** "The Food Delivery Platform frontend consists of 4 independent React applications that work together using Webpack Module Federation".

**Interpretation:** Claims four independent applications composed through Module Federation. Snapshot has four units, three host → remote relationships and separate builds/deployments. Claim corroborated.

### 37. FRONTEND_IMPLEMENTATION.md:9-12

**Observation:** "**Shell App** - Main orchestrator application", followed by three domain applications.

**Interpretation:** Claims shell orchestrates `restaurant-catalog`, `order-tracking` and `user-dashboard`. Shell declares, loads and routes all three. Claim corroborated.

### 38. FRONTEND_IMPLEMENTATION.md:49

**Observation:** "Global navigation and routing", among shell responsibilities.

**Interpretation:** Claims shell handles navigation and routes of entire application. Shell route table decides each path's remote, and header navigates between areas. Claim corroborated.

### 39. FRONTEND_IMPLEMENTATION.md:56-60

**Observation:** "**Exposed Services:**" "AuthContext", "CartContext", "API Service", "WebSocket Service", under shell.

**Interpretation:** Claims shell exposes contexts and services to remotes. Shell configuration has no `exposes`, no remote imports contexts, and each remote has own HTTP client. Claim contradicted.

### 40. FRONTEND_IMPLEMENTATION.md:140

**Observation:** "RestaurantCatalog.js       # Main component (exposed)".

**Interpretation:** Claims main `restaurant-catalog` component exposed. Configuration exposes `./RestaurantCatalog`, imported by shell. Claim corroborated.

### 41. FRONTEND_IMPLEMENTATION.md:209

**Observation:** "OrderTracking.js           # Main component (exposed)".

**Interpretation:** Claims main `order-tracking` component exposed. Configuration exposes `./OrderTracking`, imported by shell. Claim corroborated.

### 42. FRONTEND_IMPLEMENTATION.md:262

**Observation:** "UserDashboard.js           # Main component (exposed)".

**Interpretation:** Claims main `user-dashboard` component exposed. Configuration exposes `./UserDashboard`, imported by shell. Claim corroborated.

### 43. FRONTEND_IMPLEMENTATION.md:282-291

**Observation:** "Shared Technologies" "All applications use:" React 18.2.0, Material-UI 5.15.0, React Router DOM 6.20.1, Axios 1.6.2, Webpack 5, Module Federation, Emotion.

**Interpretation:** Claims common stack of four applications. Four manifests declare libraries with cited versions or compatible ranges. Claim corroborated.

### 44. FRONTEND_IMPLEMENTATION.md:442-449

**Observation:** "Click \"Add to Cart\" on menu item" → "Add item to CartContext" → "Update cart badge in header".

**Interpretation:** Claims item added in catalog menu reaches shell cart. Click only dispatches `addToCart`, listened to by nobody, and context function `addToCart` called by no file. Claim contradicted.

### 45. FRONTEND_IMPLEMENTATION.md:609

**Observation:** "**Independent** - Each can be developed and deployed separately".

**Interpretation:** Claims separate development and deployment per application. Each has own manifest, configuration and build, and all four have separate build/deployment. Claim corroborated.

### 46. FRONTEND_IMPLEMENTATION.md:614

**Observation:** "**Fast** - Optimized builds and lazy loading".

**Interpretation:** "Fast" is unmeasured assessment. Statement confirmed: production builds and shell remote loading on demand through `lazy`. Claim corroborated.

### 47. README.md:9

**Observation:** "**3 Micro Frontends** (React with Module Federation)".

**Interpretation:** Claims three React micro-frontends composed through Module Federation. Three remotes, all linked to shell through federation. Claim corroborated.

### 48. README.md:142-155

**Observation:** "Building Individual Services", with `# Frontend application`, `npm run build` and `docker build -t app-name .`.

**Interpretation:** Claims each frontend application built and packaged separately. Each has own build script and Dockerfile. Claim corroborated.

### 49. docs/ARCHITECTURE.md:267-274

**Observation:** "Restaurant Catalog MFE (Port 3001)" "**Responsibility**: Restaurant browsing, menu display, cart management", with "Shopping cart functionality" and "Order placement".

**Interpretation:** Assigns cart management and order placement to catalog. Both in shell in snapshot: `CartContext`, `/cart` page and order submission. Claim contradicted.

### 50. docs/ARCHITECTURE.md:350-361

**Observation:** "Nginx Load Balancer (Port 80)", with "`frontend`: Shell App" and "`/` → Shell App".

**Interpretation:** Claims edge nginx serves shell. Upstream `frontend` only contains `shell-app:80`, with proxy for `/`. Claim corroborated.

### 51. docs/ARCHITECTURE.md:401

**Observation:** "Module Federation | Module Federation Enhanced | 0.2.3 | Micro frontend".

**Interpretation:** Names frontend federation package and version. Declared/configured in host and two remotes; `user-dashboard` uses built-in plugin. Claim corroborated with exception.

### 52. docs/ARCHITECTURE.md:773-777

**Observation:** "Frontend Layer (4 containers)": "`fooddelivery-shell-app`: Module Federation host (Shell App)" and one container per MFE.

**Interpretation:** Claims container per frontend application, shell as host. Compose has four services with these `container_name` values. Claim corroborated.

### 53. docs/ARCHITECTURE.md:866-877

**Observation:** Diagram "Dependency Chain": "API Gateway" → "Frontend Services (Shell App, MFEs)" → "Nginx Load Balancer".

**Interpretation:** Describes dependency order between gateway, frontend services and nginx. Compose `depends_on` follows chain, only ordering container startup. Claim corroborated.

### 54. frontend/README.md:18

**Observation:** "Provides shared authentication context", among shell functions.

**Interpretation:** Claims shell provides authentication used by other units. Shell writes session in `localStorage`, read by remotes. Claim corroborated.

### 55. frontend/README.md:28-34

**Observation:** "Shared Dependencies" "All apps share:" React 18, React DOM, React Router DOM, Material-UI, Emotion.

**Interpretation:** Claims dependencies shared between applications. Four federation configurations declare libraries as `singleton` in `shared`. Claim corroborated.

### 56. frontend/README.md:304

**Observation:** "All applications connect to the API Gateway at `http://localhost:8080`."

**Interpretation:** Claims four applications use same backend gateway. All four HTTP services default to address. Claim corroborated.

### 57. frontend/README.md:307-308

**Observation:** "JWT tokens stored in localStorage" and "Authorization header added to all requests".

**Interpretation:** Claims token in `localStorage` and header on every request. Shell writes token, each application interceptor puts it in header. Claim corroborated.

### 58. frontend/restaurant-catalog/src/components/MenuView.js:54-55

**Observation:** Comment: "This will be handled by the shell app's cart context" / "For now, we'll use window events to communicate".

**Interpretation:** Claims shell cart handles item sent through window event. Dispatch exists, but shell `CartContext` registers no listener. Claim contradicted.

### 59. frontend/user-dashboard/webpack.config.js:2

**Observation:** Comment: "FIX: Use the standard built-in plugin from 'webpack'".

**Interpretation:** Claims unit uses webpack built-in plugin. Next line imports from `require('webpack').container`, and manifest does not declare `@module-federation/enhanced`. Claim corroborated.

### 60. frontend/user-dashboard/webpack.config.js:63

**Observation:** Comment: "Add these to shared to prevent duplicate socket connections", above `sockjs-client` and `@stomp/stompjs` in `shared`.

**Interpretation:** Claims sharing WebSocket packages avoids duplicate connections. No other configuration shares packages, and driver dashboard opens own connection with `new SockJS(...)`. Claim contradicted.

### 61. 497d666 2026-01-14 (frontend/shell-app/src/context/CartContext.js); 3638c74 2026-01-14 (frontend/restaurant-catalog/src/components/MenuView.js); a00d643 2026-01-14 (frontend/shell-app/src/App.js, frontend/shell-app/src/components/Header.js)

**Observation:** `CartContext.js` has same object in three commits and never registers listener. `MenuView.js` changes in `3638c74`, version from `497d666` unavailable. `App.js` and `Header.js` change in `a00d643`, earlier versions unavailable. No frontend file removed. Point inconclusive.

**Interpretation:** Shell cart never listened to event. Whether channel ever had receiver in another file remains open, hence whether planned but never connected or abandoned. Uncertainty concerns past: no snapshot listener, readings of observations #15, #16 and #27 unchanged.

### 62. 497d666 2026-01-14 (frontend/shell-app/webpack.config.js, FRONTEND_IMPLEMENTATION.md)

**Observation:** Shell configuration and `FRONTEND_IMPLEMENTATION.md` come from `497d666`, with same object in three commits. Point clarified.

**Interpretation:** Shell never had `exposes`. Exposed-service list and configuration without `exposes` originate in same stage; discrepancy does not come from later change.

### 63. 497d666 2026-01-14 (docs/ARCHITECTURE.md, frontend/shell-app/src/context/CartContext.js); 3638c74 2026-01-14 (frontend/restaurant-catalog/src/components/MenuView.js, frontend/restaurant-catalog/src/components/MenuItemCard.js); a00d643 2026-01-14 (frontend/shell-app/src/pages/CartPage.js)

**Observation:** `docs/ARCHITECTURE.md` and shell `CartContext.js` exist since `497d666`, never changing. Order-submitting page `CartPage.js` created in `a00d643`, snapshot commit. No catalog file named for cart or order created or removed. Point clarified.

**Interpretation:** Cart attribution to catalog and shell cart originate in same stage. Order placement opposes first-commit document to shell page created in last commit without document update.

### 64. 3638c74 2026-01-14 (frontend/user-dashboard/webpack.config.js, frontend/user-dashboard/src/components/DriverDashboard.js, frontend/user-dashboard/package.json); 497d666 2026-01-14 (frontend/shell-app/webpack.config.js)

**Observation:** `user-dashboard` configuration changes in `3638c74` to snapshot object with comment, and same commit creates `DriverDashboard.js`, opening own connection. Shell and `order-tracking` configurations unchanged after `497d666`. Point clarified.

**Interpretation:** Comment and contradicting code originate in same stage, and other units never shared WebSocket packages.

## Classification

| # | Origin | Dimension | Type | Approach | Evidence | Strength | Relationships |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.2 (frontend/order-tracking/package.json:27) | 1 technology | manifest | module-federation | technological | weak | declares #4 |
| 2 | 3.4.2 (frontend/restaurant-catalog/package.json:25) | 1 technology | manifest | module-federation | technological | weak | declares #5 |
| 3 | 3.4.2 (frontend/shell-app/package.json:28) | 1 technology | manifest | module-federation | technological | weak | declares #6 |
| 4 | 3.4.2 (frontend/order-tracking/package.json:27, Evidence); 3.4.3 (frontend/order-tracking, Markers, Entry and Build); 3.4.4 (frontend/shell-app/src/App.js:22, Observation); 3.4.5 #2 (Configuration); 3.4.6 #1 (Artifacts); 3.4.7 #7, #21 (Evidence) | 2 configuration | configuration | module-federation | technological | moderate | configures #19; configures #25 |
| 5 | 3.4.2 (frontend/restaurant-catalog/package.json:25, Evidence); 3.4.3 (frontend/restaurant-catalog, Markers, Entry and Build); 3.4.4 (frontend/shell-app/src/App.js:21, Observation); 3.4.5 #1 (Configuration); 3.4.6 #2 (Artifacts); 3.4.7 #6, #21 (Evidence) | 2 configuration | configuration | module-federation | technological | moderate | configures #20; configures #24 |
| 6 | 3.4.2 (frontend/shell-app/package.json:28, Evidence); 3.4.3 (frontend/shell-app, Markers, Entry and Build); 3.4.4 (frontend/shell-app/src/App.js:21, :22, :23, Observation); 3.4.5 #1, #2, #3 (Configuration); 3.4.6 #1, #2, #4 (Where served); 3.4.6 #3 (Artifacts); 3.4.7 #3, #5, #21 (Evidence) | 2 configuration | configuration | module-federation | architectural | strong | configures #21; configures #24; configures #25; configures #26 |
| 7 | 3.4.3 (frontend/user-dashboard, Markers, Entry and Build); 3.4.4 (frontend/shell-app/src/App.js:23, Observation); 3.4.5 #3 (Configuration); 3.4.6 #4 (Artifacts); 3.4.7 #1, #8, #21, #25, #26 (Evidence); 3.4.7 #25, #26 (Document) | 2 configuration | configuration | module-federation | technological | moderate | configures #22; configures #26 |
| 8 | 3.4.4 (frontend/shell-app/src/App.js:21) | 3 code | source code | module-federation | architectural | strong | implements #24 |
| 9 | 3.4.4 (frontend/shell-app/src/App.js:22) | 3 code | source code | module-federation | architectural | strong | implements #25 |
| 10 | 3.4.4 (frontend/shell-app/src/App.js:23) | 3 code | source code | module-federation | architectural | strong | implements #26 |
| 11 | 3.4.4 (frontend/order-tracking/src/index.js:1) | 3 code | source code | — | technological | weak | — |
| 12 | 3.4.4 (frontend/restaurant-catalog/src/index.js:1) | 3 code | source code | — | technological | weak | — |
| 13 | 3.4.4 (frontend/shell-app/src/index.js:1) | 3 code | source code | — | technological | weak | — |
| 14 | 3.4.4 (frontend/user-dashboard/src/index.js:1) | 3 code | source code | — | technological | weak | — |
| 15 | 3.4.4 (frontend/restaurant-catalog/src/components/MenuView.js:56) | 3 code | source code | events | technological | ambiguous | implements #27 |
| 16 | 3.4.4 (frontend/restaurant-catalog/src/components/MenuView.js:57) | 3 code | source code | events | technological | ambiguous | implements #27 |
| 17 | 3.4.4 (frontend/shell-app/src/App.js:72) | 3 code | source code | module-federation | architectural | strong | implements #24; implements #25; implements #26 |
| 18 | 3.4.4 (frontend/shell-app/src/context/AuthContext.js:38) | 3 code | source code | other | technological | moderate | implements #28; implements #29; implements #30 |
| 19 | 3.4.3 (frontend/order-tracking) | 4 structure | directory | — | architectural | moderate | — |
| 20 | 3.4.3 (frontend/restaurant-catalog) | 4 structure | directory | — | architectural | moderate | — |
| 21 | 3.4.3 (frontend/shell-app) | 4 structure | directory | — | architectural | moderate | — |
| 22 | 3.4.3 (frontend/user-dashboard) | 4 structure | directory | — | architectural | moderate | — |
| 23 | 3.4.3 (infrastructure/faas/order-completion) | 4 structure | directory | — | context | weak | — |
| 24 | 3.4.5 #1 | 5 composition | source code | module-federation | architectural | strong | links #21; links #20 |
| 25 | 3.4.5 #2 | 5 composition | source code | module-federation | architectural | strong | links #21; links #19 |
| 26 | 3.4.5 #3 | 5 composition | source code | module-federation | architectural | strong | links #21; links #22 |
| 27 | 3.4.5 #4 | 5 composition | source code | events | architectural | ambiguous | links #20 |
| 28 | 3.4.5 #5 | 5 composition | source code | other | architectural | strong | links #21; links #19 |
| 29 | 3.4.5 #6 | 5 composition | source code | other | architectural | strong | links #21; links #20 |
| 30 | 3.4.5 #7 | 5 composition | source code | other | architectural | strong | links #21; links #22 |
| 31 | 3.4.6 #1 | 6 build-deploy | deploy | — | architectural | moderate | publishes #19 |
| 32 | 3.4.6 #2 | 6 build-deploy | deploy | — | architectural | moderate | publishes #20 |
| 33 | 3.4.6 #3 | 6 build-deploy | deploy | — | architectural | moderate | publishes #21 |
| 34 | 3.4.6 #4 | 6 build-deploy | deploy | — | architectural | moderate | publishes #22 |
| 35 | 3.4.7 #1 | 7 documentation | documentation | module-federation | architectural | weak | corroborates #1; corroborates #2; corroborates #3; corroborates #7; corroborates #24; corroborates #25; corroborates #26 |
| 36 | 3.4.7 #2 | 7 documentation | documentation | module-federation | architectural | weak | corroborates #19; corroborates #20; corroborates #21; corroborates #22; corroborates #24; corroborates #25; corroborates #26; corroborates #31; corroborates #32; corroborates #33; corroborates #34 |
| 37 | 3.4.7 #3 | 7 documentation | documentation | — | architectural | weak | corroborates #21; corroborates #6; corroborates #8; corroborates #9; corroborates #10; corroborates #24; corroborates #25; corroborates #26 |
| 38 | 3.4.7 #4 | 7 documentation | documentation | — | architectural | weak | corroborates #17; corroborates frontend/shell-app/src/components/Header.js:56, 68, 80 |
| 39 | 3.4.7 #5 | 7 documentation | documentation | — | architectural | weak | contradicts #6; contradicts frontend/shell-app/src/context/CartContext.js:38, 100; contradicts frontend/restaurant-catalog/src/services/restaurantService.js:3-17 |
| 40 | 3.4.7 #6 | 7 documentation | documentation | — | technological | weak | corroborates #5; corroborates #24 |
| 41 | 3.4.7 #7 | 7 documentation | documentation | — | technological | weak | corroborates #4; corroborates #25 |
| 42 | 3.4.7 #8 | 7 documentation | documentation | — | technological | weak | corroborates #7; corroborates #26 |
| 43 | 3.4.7 #9 | 7 documentation | documentation | module-federation | technological | weak | corroborates frontend/shell-app/package.json:12-19, 35; corroborates frontend/restaurant-catalog/package.json:12-19, 28; corroborates frontend/order-tracking/package.json:12-19, 30; corroborates frontend/user-dashboard/package.json:6-13, 30 |
| 44 | 3.4.7 #10 | 7 documentation | documentation | — | architectural | weak | contradicts frontend/restaurant-catalog/src/components/MenuView.js:53-61; contradicts frontend/shell-app/src/context/CartContext.js:38, 100 |
| 45 | 3.4.7 #11 | 7 documentation | documentation | — | architectural | weak | corroborates #19; corroborates #20; corroborates #21; corroborates #22; corroborates #31; corroborates #32; corroborates #33; corroborates #34 |
| 46 | 3.4.7 #12 | 7 documentation | documentation | — | technological | weak | corroborates #8; corroborates #9; corroborates #10; corroborates frontend/shell-app/package.json:8 |
| 47 | 3.4.7 #13 | 7 documentation | documentation | module-federation | architectural | weak | corroborates #19; corroborates #20; corroborates #22; corroborates #24; corroborates #25; corroborates #26 |
| 48 | 3.4.7 #14 | 7 documentation | documentation | — | architectural | weak | corroborates #31; corroborates #32; corroborates #33; corroborates #34 |
| 49 | 3.4.7 #15 | 7 documentation | documentation | — | architectural | weak | contradicts frontend/shell-app/src/context/CartContext.js:38, 100; contradicts frontend/shell-app/src/pages/CartPage.js:23, 46; contradicts frontend/shell-app/src/App.js:103 |
| 50 | 3.4.7 #16 | 7 documentation | documentation | — | architectural | weak | corroborates #33; corroborates infrastructure/nginx/nginx.conf:12-15, 36-38 |
| 51 | 3.4.7 #17 | 7 documentation | documentation | module-federation | technological | weak | corroborates #1; corroborates #2; corroborates #3 |
| 52 | 3.4.7 #18 | 7 documentation | documentation | module-federation | architectural | weak | corroborates #31; corroborates #32; corroborates #33; corroborates #34 |
| 53 | 3.4.7 #19 | 7 documentation | documentation | — | context | weak | corroborates docker-compose.yml:313-314, 329-330, 345-346, 364-367, 379-381 |
| 54 | 3.4.7 #20 | 7 documentation | documentation | — | architectural | weak | corroborates #18; corroborates #28; corroborates #29; corroborates #30 |
| 55 | 3.4.7 #21 | 7 documentation | documentation | — | technological | weak | corroborates #4; corroborates #5; corroborates #6; corroborates #7 |
| 56 | 3.4.7 #22 | 7 documentation | documentation | — | context | weak | corroborates frontend/shell-app/src/services/apiService.js:3-6; corroborates frontend/restaurant-catalog/src/services/restaurantService.js:3-6; corroborates frontend/order-tracking/src/services/orderService.js:3-6; corroborates frontend/user-dashboard/src/services/userService.js:3-6 |
| 57 | 3.4.7 #23 | 7 documentation | documentation | other | technological | weak | corroborates #18; corroborates #28; corroborates #29; corroborates #30 |
| 58 | 3.4.7 #24 | 7 documentation | comment | events | architectural | weak | contradicts frontend/shell-app/src/context/CartContext.js:38, 100 |
| 59 | 3.4.7 #25 | 7 documentation | comment | — | technological | weak | corroborates #7; corroborates frontend/user-dashboard/package.json:22-34 |
| 60 | 3.4.7 #26 | 7 documentation | comment | — | technological | weak | contradicts frontend/user-dashboard/src/components/DriverDashboard.js:57; contradicts #4; contradicts #6 |
| 61 | 3.4.8 #1 | 8 history | history | events | technological | weak | explains #15; explains #16; explains #27; explains #44; explains #58 |
| 62 | 3.4.8 #2 | 8 history | history | module-federation | architectural | weak | explains #39 |
| 63 | 3.4.8 #3 | 8 history | history | — | architectural | weak | explains #49 |
| 64 | 3.4.8 #4 | 8 history | history | module-federation | technological | weak | explains #60 |

## Summary

Observations: 64. Dimensions (technology: 3, configuration: 4, code: 11, structure: 5, composition: 7, build-deploy: 4, documentation: 26, history: 4). Strength (strong: 11, moderate: 12, weak: 38, ambiguous: 3). Evidence (technological: 25, architectural: 36, context: 3).

