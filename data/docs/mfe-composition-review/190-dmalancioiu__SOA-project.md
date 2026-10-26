---
schema: 1
id: 1134094230
full_name: dmalancioiu/SOA-project
commit: a00d6436b4a6c4f28287e7e90ded084c1241fcf1
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

# 190 — dmalancioiu/SOA-project

## Repository overview

An academic SOA demonstration project: a food delivery platform with Spring Boot microservices
in `backend/` and, in `frontend/`, four React applications with webpack, without an aggregating
workspace. `frontend/shell-app` is the host. It declares three Module Federation remotes,
`restaurantCatalog`, `orderTracking` and `userDashboard`, each at
`http://localhost:<porta>/remoteEntry.js` (English translation of the placeholder: port) (frontend/shell-app/webpack.config.js:48-54). It loads
each remote through `lazy(() => import(...))` (frontend/shell-app/src/App.js:21-23) and mounts it on its own route
protected by `PrivateRoute`: `/restaurants/*`, `/orders/*` and `/dashboard/*`
(frontend/shell-app/src/App.js:72-102). The shell handles login, registration, cart and header
(frontend/shell-app/src/App.js:66-69, :73-75, :103). Each remote exposes a single domain
component with its own internal routes: `./RestaurantCatalog`, `./OrderTracking` and `./UserDashboard`
(frontend/restaurant-catalog/webpack.config.js:47-49; frontend/order-tracking/webpack.config.js:48-50;
frontend/user-dashboard/webpack.config.js:53-55). All four configurations share `react`,
`react-dom`, `react-router-dom`, `@mui/material` and `@emotion/*` as singletons
(frontend/shell-app/webpack.config.js:55-62). The host and two remotes use the plugin from
`@module-federation/enhanced` (frontend/shell-app/webpack.config.js:2). `user-dashboard` uses webpack's
built-in plugin (frontend/user-dashboard/webpack.config.js:2-3), which does not change the
relationship.

Besides federation loading, units connect through the session in `localStorage`. The shell
writes `token` and `user` on login and registration and deletes them on logout
(frontend/shell-app/src/context/AuthContext.js:38-39, :53-54, :61-62). The remotes run in the shell
page and read those keys: `token` goes in each request's `Authorization` header
(frontend/restaurant-catalog/src/services/restaurantService.js:15-17;
frontend/order-tracking/src/services/orderService.js:15-17;
frontend/user-dashboard/src/services/orderService.js:15-17), and `user` determines whether
`user-dashboard` shows the driver view (frontend/user-dashboard/src/UserDashboard.js:12-13).
`restaurant-catalog` also fires window event `addToCart` when adding an item
(frontend/restaurant-catalog/src/components/MenuView.js:56-60). The comment says the shell cart
handles the event (MenuView.js:54-55), but no snapshot file listens to it. The shell cart
receives items only through its context's `addToCart` function
(frontend/shell-app/src/context/CartContext.js:38, :100).

Each unit's `import('./bootstrap')` calls did not become relationships
(frontend/shell-app/src/index.js:1 and equivalents), being internal (`No` source code review
lines). Keys `cart` and `cartRestaurant`, read and written only by the shell, are also excluded
(frontend/shell-app/src/context/CartContext.js:19-20, :32-34). Every `Yes` unit in the structural
review participates in at least one relationship. Remote URLs are fixed at `localhost`
(frontend/shell-app/webpack.config.js:51-53), without an environment variable.

## Relationships

| # | Source | Target | Type | Direction | Mechanism | In snapshot | Active | Configuration | Code |
|---|---|---|---|---|---|---|---|---|---|
| 1 | frontend/shell-app | frontend/restaurant-catalog | host → remote | source → target | module-federation | Yes | Yes | frontend/shell-app/webpack.config.js:51 (remote `restaurantCatalog@http://localhost:3001/remoteEntry.js`); frontend/restaurant-catalog/webpack.config.js:45-46 (`name: 'restaurantCatalog'`, `filename: 'remoteEntry.js'`); frontend/restaurant-catalog/webpack.config.js:48 (exposes `./RestaurantCatalog`); frontend/restaurant-catalog/webpack.config.js:10 (port 3001) | frontend/shell-app/src/App.js:21; frontend/shell-app/src/App.js:72 |
| 2 | frontend/shell-app | frontend/order-tracking | host → remote | source → target | module-federation | Yes | Yes | frontend/shell-app/webpack.config.js:52 (remote `orderTracking@http://localhost:3002/remoteEntry.js`); frontend/order-tracking/webpack.config.js:46-47 (`name: 'orderTracking'`, `filename: 'remoteEntry.js'`); frontend/order-tracking/webpack.config.js:49 (exposes `./OrderTracking`); frontend/order-tracking/webpack.config.js:10 (port 3002) | frontend/shell-app/src/App.js:22; frontend/shell-app/src/App.js:72 |
| 3 | frontend/shell-app | frontend/user-dashboard | host → remote | source → target | module-federation | Yes | Yes | frontend/shell-app/webpack.config.js:53 (remote `userDashboard@http://localhost:3003/remoteEntry.js`); frontend/user-dashboard/webpack.config.js:51-52 (`name: 'userDashboard'`, `filename: 'remoteEntry.js'`); frontend/user-dashboard/webpack.config.js:54 (exposes `./UserDashboard`); frontend/user-dashboard/webpack.config.js:11 (port 3003) | frontend/shell-app/src/App.js:23; frontend/shell-app/src/App.js:72 |
| 4 | frontend/restaurant-catalog | addToCart | communication | source → target | events | Undetermined | Undetermined | — | frontend/restaurant-catalog/src/components/MenuView.js:56; frontend/restaurant-catalog/src/components/MenuView.js:57 |
| 5 | frontend/shell-app | frontend/order-tracking | communication | source → target | other | Yes | Yes | — | frontend/shell-app/src/context/AuthContext.js:38 |
| 6 | frontend/shell-app | frontend/restaurant-catalog | communication | source → target | other | Yes | Yes | — | frontend/shell-app/src/context/AuthContext.js:38 |
| 7 | frontend/shell-app | frontend/user-dashboard | communication | bidirectional | other | Yes | Yes | — | frontend/shell-app/src/context/AuthContext.js:38 |

## Observations

**1. frontend/shell-app → frontend/restaurant-catalog.** The remote key and URL prefix,
`restaurantCatalog@` (frontend/shell-app/webpack.config.js:51), match the unit's `name`
(frontend/restaurant-catalog/webpack.config.js:45). The imported module, `restaurantCatalog/RestaurantCatalog`
(frontend/shell-app/src/App.js:21), matches exposure `./RestaurantCatalog`
(frontend/restaurant-catalog/webpack.config.js:48). Port 3001 (frontend/restaurant-catalog/webpack.config.js:10)
only corroborates. The component is rendered at `/restaurants/*`
(frontend/shell-app/src/App.js:77-84), so the manual `Routes` line (frontend/shell-app/src/App.js:72)
enters relationships 1 to 3.

**2. frontend/shell-app → frontend/order-tracking.** `orderTracking@` (frontend/shell-app/webpack.config.js:52)
matches `name` in frontend/order-tracking/webpack.config.js:46. Module
`orderTracking/OrderTracking` (frontend/shell-app/src/App.js:22) matches exposure
`./OrderTracking` (frontend/order-tracking/webpack.config.js:49). Port 3002 (:10) only corroborates.
The component is rendered at `/orders/*` (frontend/shell-app/src/App.js:86-93).

**3. frontend/shell-app → frontend/user-dashboard.** `userDashboard@` (frontend/shell-app/webpack.config.js:53)
matches `name` in frontend/user-dashboard/webpack.config.js:51. Module
`userDashboard/UserDashboard` (frontend/shell-app/src/App.js:23) matches `./UserDashboard`
(frontend/user-dashboard/webpack.config.js:54). Port 3003 (:11) only corroborates. The component is
rendered at `/dashboard/*` (frontend/shell-app/src/App.js:95-102). This unit configures
`ModuleFederationPlugin` with webpack's built-in plugin, `require('webpack').container`
(frontend/user-dashboard/webpack.config.js:3), rather than the other units' `@module-federation/enhanced`
package. Mechanism remains `module-federation`.

**4. frontend/restaurant-catalog → addToCart.** Source is the sender: `handleAddToCart` fires
`new CustomEvent('addToCart', { detail: { item, restaurant } })` on `window`
(frontend/restaurant-catalog/src/components/MenuView.js:53-60). `MenuView` is the exposed module's `/:restaurantId/menu`
route (frontend/restaurant-catalog/src/RestaurantCatalog.js:12), so firing
happens inside the shell. Comments in MenuView.js:54-55 identify the shell cart as
target, but searching for `addToCart` and `addEventListener` in `.js` files under `frontend/` finds only the
firing and function in frontend/shell-app/src/context/CartContext.js:38, :100, which does not listen for
events. A comment is not an explicit match, and there is no listener. Hence Target remains
the event name, as in the artifact, and `In snapshot = Undetermined`. If the reviewer
considers the comment sufficient to resolve the target as `frontend/shell-app`, only the
Target and In snapshot (`Yes`) columns change; Summary does not change. `Active = Undetermined`, because
both code lines are `Undetermined` in the source code review.

**5. frontend/shell-app → frontend/order-tracking.** This exchange uses shared state in
`localStorage`, rather than events, hence mechanism `other`. The shell writes `token` on login and
registration (frontend/shell-app/src/context/AuthContext.js:38, :53) and deletes it on logout and a 401
(:61; frontend/shell-app/src/services/apiService.js:34). `order-tracking` only reads the key: in the
HTTP interceptor (frontend/order-tracking/src/services/orderService.js:15-17) and WebSocket
connection (frontend/order-tracking/src/services/websocketService.js:13). It neither writes nor deletes
`token` or `user`, so direction is `source → target`. The keys are the same only when the
unit runs inside the shell page under one origin. Independently, each unit has its own port and
`localStorage` (frontend/order-tracking/webpack.config.js:10). No configuration declaration
connects units through this channel, hence Configuration remains `—`.

**6. frontend/shell-app → frontend/restaurant-catalog.** The same channel as relationship 5.
`restaurant-catalog` only reads `token` in the interceptor in
frontend/restaurant-catalog/src/services/restaurantService.js:15-17 and writes none of the
session keys, so direction is `source → target`.

**7. frontend/shell-app ↔ frontend/user-dashboard.** The same channel, but sending in both
directions. The shell writes `token` and `user` (frontend/shell-app/src/context/AuthContext.js:38-39), and
`user-dashboard` reads `user` to choose the driver view
(frontend/user-dashboard/src/UserDashboard.js:12-13) and reads `token` in services
(frontend/user-dashboard/src/services/orderService.js:15; frontend/user-dashboard/src/services/userService.js:15;
frontend/user-dashboard/src/services/deliveryService.js:15; frontend/user-dashboard/src/components/DriverDashboard.js:56).
In the reverse direction, when saving the profile at `/profile` (frontend/user-dashboard/src/UserDashboard.js:31),
`user-dashboard` rewrites `user` with updated data
(frontend/user-dashboard/src/components/UserProfile.js:91-92). The shell reads this key when mounting
`AuthProvider` (frontend/shell-app/src/context/AuthContext.js:21-24) and in `getCurrentUser`
(frontend/shell-app/src/services/authService.js:28-30). Hence direction is `bidirectional`, with
Source and Target in alphabetical order. Code contains only AuthContext.js:38 because the source code
review recorded UserProfile.js:92 as a usage point of the same mechanism, without its own row.

## Summary

Relationships: 7 (host → remote: 3, communication: 4). Active: 6. Target outside the snapshot: 0.
Units without a relationship: none.

