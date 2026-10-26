---
schema: 1
id: 1116305586
full_name: webdevqadeer/frontend-development
commit: f8d264873c9182d4f3a0628f18f7618b019a2f79
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

# 083 — webdevqadeer/frontend-development

## Repository overview

A marketplace example in `react/mv-marketplace/`, an npm workspaces monorepo with a shell, four React applications (`admin`, `buyer`, `payment`, `seller`) and the `mv-theme` library (react/mv-marketplace/package.json:4-11). All applications use Vite with `@originjs/vite-plugin-federation`. The shell (`name: "shell_app"`) declares all four remotes by fixed `remoteEntry.js` URLs on ports 5001–5004 and shares React and ReactDOM (react/mv-marketplace/apps/shell/vite.config.js:9-18). Each remote exposes `./App` from `./src/App.jsx` in `remoteEntry.js` and fixes the port only in `preview` (for example react/mv-marketplace/apps/buyer/vite.config.js:8-20).

The shell imports all four federated modules with `React.lazy` (react/mv-marketplace/apps/shell/src/router.jsx:4-7) and places them on the `/`, `/seller`, `/admin` and `/payment` routes, inside `BrowserRouter` and `Suspense` (react/mv-marketplace/apps/shell/src/router.jsx:11-18). The exposed components are minimal demonstration screens, such as `<h2>Admin Panel</h2>` (react/mv-marketplace/apps/admin/src/App.jsx:1-2). The router enters the shell layout through react/mv-marketplace/apps/shell/src/app.jsx:2 and :9, but the shell entry point imports `./App.jsx` (react/mv-marketplace/apps/shell/src/main.jsx:3), and the snapshot has only `src/app.jsx`. On a case-sensitive filesystem, the `index.html` → `main.jsx` → router chain does not resolve. Therefore all nine source code review constructs are `Undetermined` and no relationship is `Active = Yes`; the classification reads the discrepancy as a portability defect (probable Windows build), with no observed execution.

The shell and all four remotes also declare a `package` remote at `http://localhost:5005/assets/remoteEntry.js` (react/mv-marketplace/apps/shell/vite.config.js:16; react/mv-marketplace/apps/admin/vite.config.js:15), imported by no code and served by no unit. These became relationships 5–9, appearing only in configuration. The `mv-theme` library generates an ES/UMD library build (react/mv-marketplace/packages/mvp-theme/vite.config.js:7-13), does not configure federation and is not imported by the applications; the root script builds it before the applications (react/mv-marketplace/package.json:13-14). There is no inter-unit communication: the shell's `AuthProvider` (react/mv-marketplace/apps/shell/src/app.jsx:3 and :7) is internal to it.

## Relationships

| # | Source | Target | Type | Direction | Mechanism | In snapshot | Active | Configuration | Code |
|---|---|---|---|---|---|---|---|---|---|
| 1 | react/mv-marketplace/apps/shell | react/mv-marketplace/apps/buyer | host → remote | source → target | module-federation | Yes | Undetermined | react/mv-marketplace/apps/shell/vite.config.js:12 (remote `buyer_app` at `http://localhost:5001/assets/remoteEntry.js`); react/mv-marketplace/apps/buyer/vite.config.js:9-12 (`name: "buyer_app"`, `filename: "remoteEntry.js"`, exposes `./App`); react/mv-marketplace/apps/buyer/vite.config.js:20 (preview port 5001) | react/mv-marketplace/apps/shell/src/router.jsx:4; react/mv-marketplace/apps/shell/src/router.jsx:13; react/mv-marketplace/apps/shell/src/router.jsx:14 |
| 2 | react/mv-marketplace/apps/shell | react/mv-marketplace/apps/seller | host → remote | source → target | module-federation | Yes | Undetermined | react/mv-marketplace/apps/shell/vite.config.js:13 (remote `seller_app` at `http://localhost:5002/assets/remoteEntry.js`); react/mv-marketplace/apps/seller/vite.config.js:9-11 (`name: "seller_app"`, `filename: "remoteEntry.js"`, exposes `./App`); react/mv-marketplace/apps/seller/vite.config.js:18 (preview port 5002) | react/mv-marketplace/apps/shell/src/router.jsx:5; react/mv-marketplace/apps/shell/src/router.jsx:13; react/mv-marketplace/apps/shell/src/router.jsx:15 |
| 3 | react/mv-marketplace/apps/shell | react/mv-marketplace/apps/admin | host → remote | source → target | module-federation | Yes | Undetermined | react/mv-marketplace/apps/shell/vite.config.js:14 (remote `admin_app` at `http://localhost:5003/assets/remoteEntry.js`); react/mv-marketplace/apps/admin/vite.config.js:9-12 (`name: "admin_app"`, `filename: "remoteEntry.js"`, exposes `./App`); react/mv-marketplace/apps/admin/vite.config.js:20 (preview port 5003) | react/mv-marketplace/apps/shell/src/router.jsx:6; react/mv-marketplace/apps/shell/src/router.jsx:13; react/mv-marketplace/apps/shell/src/router.jsx:16 |
| 4 | react/mv-marketplace/apps/shell | react/mv-marketplace/apps/payment | host → remote | source → target | module-federation | Yes | Undetermined | react/mv-marketplace/apps/shell/vite.config.js:15 (remote `payment_app` at `http://localhost:5004/assets/remoteEntry.js`); react/mv-marketplace/apps/payment/vite.config.js:9-11 (`name: "payment-app"`, `filename: "remoteEntry.js"`, exposes `./App`); react/mv-marketplace/apps/payment/vite.config.js:18 (preview port 5004) | react/mv-marketplace/apps/shell/src/router.jsx:7; react/mv-marketplace/apps/shell/src/router.jsx:13; react/mv-marketplace/apps/shell/src/router.jsx:17 |
| 5 | react/mv-marketplace/apps/admin | package | host → remote | source → target | module-federation | Undetermined | No | react/mv-marketplace/apps/admin/vite.config.js:14-16 (remote `package` at `http://localhost:5005/assets/remoteEntry.js`) | — |
| 6 | react/mv-marketplace/apps/buyer | package | host → remote | source → target | module-federation | Undetermined | No | react/mv-marketplace/apps/buyer/vite.config.js:14-16 (remote `package` at `http://localhost:5005/assets/remoteEntry.js`) | — |
| 7 | react/mv-marketplace/apps/payment | package | host → remote | source → target | module-federation | Undetermined | No | react/mv-marketplace/apps/payment/vite.config.js:12-14 (remote `package` at `http://localhost:5005/assets/remoteEntry.js`) | — |
| 8 | react/mv-marketplace/apps/seller | package | host → remote | source → target | module-federation | Undetermined | No | react/mv-marketplace/apps/seller/vite.config.js:12-14 (remote `package` at `http://localhost:5005/assets/remoteEntry.js`) | — |
| 9 | react/mv-marketplace/apps/shell | package | host → remote | source → target | module-federation | Undetermined | No | react/mv-marketplace/apps/shell/vite.config.js:16 (remote `package` at `http://localhost:5005/assets/remoteEntry.js`) | — |

## Observations

**1. react/mv-marketplace/apps/shell → react/mv-marketplace/apps/buyer.** The `buyer_app/App` specifier (react/mv-marketplace/apps/shell/src/router.jsx:4) matches the remote key in the shell (react/mv-marketplace/apps/shell/vite.config.js:12) and buyer's `name: "buyer_app"` with the `./App` exposure (react/mv-marketplace/apps/buyer/vite.config.js:9-12); preview port 5001 only corroborates. The component goes to the `/` route (react/mv-marketplace/apps/shell/src/router.jsx:14). `Active = Undetermined` because all three source code review lines are `Undetermined`, as the shell entry chain does not reach the router as written (react/mv-marketplace/apps/shell/src/main.jsx:3).

**2. react/mv-marketplace/apps/shell → react/mv-marketplace/apps/seller.** `seller_app/App` (react/mv-marketplace/apps/shell/src/router.jsx:5) matches remote `seller_app` (react/mv-marketplace/apps/shell/vite.config.js:13) and seller's `name` and `exposes` (react/mv-marketplace/apps/seller/vite.config.js:9-11), with preview port 5002 (:18). Route `/seller` (react/mv-marketplace/apps/shell/src/router.jsx:15). `Active = Undetermined` for the same reason as relationship 1.

**3. react/mv-marketplace/apps/shell → react/mv-marketplace/apps/admin.** `admin_app/App` (react/mv-marketplace/apps/shell/src/router.jsx:6) matches remote `admin_app` (react/mv-marketplace/apps/shell/vite.config.js:14) and admin's `name` and `exposes` (react/mv-marketplace/apps/admin/vite.config.js:9-12), with preview port 5003 (:20). Route `/admin` (react/mv-marketplace/apps/shell/src/router.jsx:16). `Active = Undetermined` for the same reason as relationship 1.

**4. react/mv-marketplace/apps/shell → react/mv-marketplace/apps/payment.** The shell imports `payment_app/App` (react/mv-marketplace/apps/shell/src/router.jsx:7) through key `payment_app` (react/mv-marketplace/apps/shell/vite.config.js:15), but the remote declares itself as `name: "payment-app"`, with a hyphen (react/mv-marketplace/apps/payment/vite.config.js:9). The target was resolved because the name differs only in the separator, and `filename: "remoteEntry.js"`, the `./App` exposure (react/mv-marketplace/apps/payment/vite.config.js:10-11) and preview port 5004 (:18) match the shell URL; the source code review already records apps/payment as the target. The name discrepancy is recorded here without claiming that the plugin tolerates it at runtime. Route `/payment` (react/mv-marketplace/apps/shell/src/router.jsx:17). `Active = Undetermined` for the same reason as relationship 1.

**5. react/mv-marketplace/apps/admin → package.** Admin declares remote `package` at `http://localhost:5005/assets/remoteEntry.js` (react/mv-marketplace/apps/admin/vite.config.js:14-16) and does not import it (react/mv-marketplace/apps/admin/src/App.jsx:1-2). No snapshot configuration uses `name: "package"` or port 5005; `packages/mvp-theme` is named `mv-theme` and only has a library build (react/mv-marketplace/packages/mvp-theme/vite.config.js:7-13). Target written as in configuration, `In snapshot = Undetermined` because there is neither a match nor identification as external, and `Active = No` because the relationship appears only in configuration.

**6. react/mv-marketplace/apps/buyer → package.** The same declaration (react/mv-marketplace/apps/buyer/vite.config.js:14-16), without an import in react/mv-marketplace/apps/buyer/src/App.jsx:1-9. Values follow the same reasons as relationship 5.

**7. react/mv-marketplace/apps/payment → package.** The same declaration (react/mv-marketplace/apps/payment/vite.config.js:12-14), without an import in react/mv-marketplace/apps/payment/src/App.jsx:1-2. Values follow the same reasons as relationship 5.

**8. react/mv-marketplace/apps/seller → package.** The same declaration (react/mv-marketplace/apps/seller/vite.config.js:12-14); react/mv-marketplace/apps/seller/src/App.jsx:1 imports only `react`. Values follow the same reasons as relationship 5.

**9. react/mv-marketplace/apps/shell → package.** The shell declares `package` alongside the four actual remotes (react/mv-marketplace/apps/shell/vite.config.js:16), but the router imports only the other four (react/mv-marketplace/apps/shell/src/router.jsx:4-7). Values follow the same reasons as relationship 5. Relationships 5–9 come last because they have no Code; with the same Target, they follow Source alphabetical order.

## Summary

Relationships: 9 (host → remote: 9). Active: 0. Target outside the snapshot: 0.
Units without a relationship: none.

