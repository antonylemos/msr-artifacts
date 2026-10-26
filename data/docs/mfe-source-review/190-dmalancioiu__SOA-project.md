---
schema: 1
id: 1134094230
full_name: dmalancioiu/SOA-project
commit: a00d6436b4a6c4f28287e7e90ded084c1241fcf1
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 190 — dmalancioiu/SOA-project

## Mined constructs

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| src-remote-import | frontend/shell-app/src/App.js:21 | frontend/shell-app | dynamic-loading | Yes | `lazy(() => import('restaurantCatalog/RestaurantCatalog'))` loads at runtime the module of remote `restaurantCatalog` (`restaurantCatalog@http://localhost:3001/remoteEntry.js` at frontend/shell-app/webpack.config.js:51), exposed by unit frontend/restaurant-catalog (`'./RestaurantCatalog'` at frontend/restaurant-catalog/webpack.config.js:48); rendered in route `/restaurants/*` (frontend/shell-app/src/App.js:77-84). App mounted at frontend/shell-app/src/bootstrap.js:5-6, loaded by frontend/shell-app/src/index.js:1 |
| src-remote-import | frontend/shell-app/src/App.js:22 | frontend/shell-app | dynamic-loading | Yes | `lazy(() => import('orderTracking/OrderTracking'))` loads remote `orderTracking` (frontend/shell-app/webpack.config.js:52, port 3002), exposed by unit frontend/order-tracking (frontend/order-tracking/webpack.config.js:49); rendered in route `/orders/*` (frontend/shell-app/src/App.js:86-93) |
| src-remote-import | frontend/shell-app/src/App.js:23 | frontend/shell-app | dynamic-loading | Yes | `lazy(() => import('userDashboard/UserDashboard'))` loads remote `userDashboard` (frontend/shell-app/webpack.config.js:53, port 3003), exposed by unit frontend/user-dashboard (frontend/user-dashboard/webpack.config.js:54); rendered in route `/dashboard/*` (frontend/shell-app/src/App.js:95-102) |
| src-async-bootstrap | frontend/order-tracking/src/index.js:1 | frontend/order-tracking | dynamic-loading | No | `import('./bootstrap')` loads the unit’s own bootstrap (frontend/order-tracking/src/bootstrap.js); internal to the unit |
| src-async-bootstrap | frontend/restaurant-catalog/src/index.js:1 | frontend/restaurant-catalog | dynamic-loading | No | `import('./bootstrap')` loads the unit’s own bootstrap (frontend/restaurant-catalog/src/bootstrap.js); internal to the unit |
| src-async-bootstrap | frontend/shell-app/src/index.js:1 | frontend/shell-app | dynamic-loading | No | `import('./bootstrap')` loads the shell’s own bootstrap, which mounts `App` (frontend/shell-app/src/bootstrap.js:3-6); internal to the unit |
| src-async-bootstrap | frontend/user-dashboard/src/index.js:1 | frontend/user-dashboard | dynamic-loading | No | `import('./bootstrap')` loads the unit’s own bootstrap (frontend/user-dashboard/src/bootstrap.js); internal to the unit |
| src-cross-unit-communication | frontend/restaurant-catalog/src/components/MenuView.js:56 | frontend/restaurant-catalog | communication | Undetermined | `window.dispatchEvent(new CustomEvent('addToCart', { detail: { item, restaurant } }))` in `handleAddToCart` (frontend/restaurant-catalog/src/components/MenuView.js:53-61), connected to each item’s button (MenuView.js:190 → frontend/restaurant-catalog/src/components/MenuItemCard.js:40-44, :155); MenuView is a route of the exposed module (frontend/restaurant-catalog/src/RestaurantCatalog.js:12). The comment says the target is the shell cart (MenuView.js:54-55), but no snapshot file listens for `addToCart`: the shell’s `CartContext` only exposes function `addToCart` (frontend/shell-app/src/context/CartContext.js:38, :100), without `addEventListener`. See Notes |
| src-cross-unit-communication | frontend/restaurant-catalog/src/components/MenuView.js:57 | frontend/restaurant-catalog | communication | Undetermined | `new CustomEvent('addToCart', ...)` is the event dispatched at frontend/restaurant-catalog/src/components/MenuView.js:56; no receiver in the snapshot, for the same reason as the preceding row |

## Constructs outside mining

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| manual | frontend/shell-app/src/App.js:72 | frontend/shell-app | host-relationship | Yes | `Routes` declares which applications the shell uses and under which paths: `/restaurants/*` → `RestaurantCatalog`, `/orders/*` → `OrderTracking`, `/dashboard/*` → `UserDashboard`, each inside `PrivateRoute` and the `Suspense` at :71 (frontend/shell-app/src/App.js:72-104); the three components come from the `lazy` calls at :21-23. App mounted at frontend/shell-app/src/bootstrap.js:5-6 |
| manual | frontend/shell-app/src/context/AuthContext.js:38 | frontend/shell-app | communication | Yes | `localStorage.setItem('token', response.token)` and `localStorage.setItem('user', ...)` write the session during login (frontend/shell-app/src/context/AuthContext.js:38-39; also during registration, :53-54; removed during logout, :61-62); `AuthProvider` wraps the app at frontend/shell-app/src/App.js:66. The remotes, running in the shell page, read the same keys: `token` in the interceptors at frontend/restaurant-catalog/src/services/restaurantService.js:15, frontend/order-tracking/src/services/orderService.js:15 and frontend/user-dashboard/src/services/orderService.js:15 (among others), and `user` to choose the driver view at frontend/user-dashboard/src/UserDashboard.js:12-13 |

## Summary

Constructs participating in composition: 5 (dynamic-loading: 3, host-relationship: 1, communication: 1).

## Notes

- The `addToCart` event (`src-cross-unit-communication`, MenuView.js:56-57) is active on the sender side, but searching for `addToCart` and `addEventListener` throughout the snapshot found only the dispatch itself and the shell context function (frontend/shell-app/src/context/CartContext.js:38, :100), which is not a listener. The channel has no receiver, hence `Undetermined`: the construct is intended for another unit, but the receiving unit cannot be confirmed. If the reviewer considers a dispatch without a listener to communicate with no one, both rows become `No`; the Summary does not change.
- Inter-unit session communication goes through the `token` and `user` keys of `localStorage`, written by the shell (manual row at AuthContext.js:38). frontend/user-dashboard/src/components/UserProfile.js:92 also rewrites `user`; this is a usage point of the same mechanism and did not become a row.
- The step 4 search in `.js` and `.html` files in `frontend/` found no `customElements`, `<iframe`, `postMessage`, `BroadcastChannel`, `<script>` injection, `registerApplication`, `loadRemote` or `initFederation`; the only `import()` calls are those in the mining table.
- Rendering `<RestaurantCatalog />`, `<OrderTracking />` and `<UserDashboard />` (frontend/shell-app/src/App.js:81, :90, :99) remains in the observation of the manual `Routes` row, as the route table elements.
