---
schema: 1
id: 1149061587
full_name: Christian-Encalada/examen-microfrontend
commit: 9456a399b086d78c65d167e0d08db5d2b8d31bb8
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

# 228 — Christian-Encalada/examen-microfrontend

## Repository overview

A demonstration of a “Sistema de Alertas Académicas” (English translation: Academic Alert System) in three React applications with Rspack and `@module-federation/enhanced`: host `appclases` at the repository root and two remotes in subdirectories, `alert-sender` and `alert-dashboard`. The host declares both remotes with localhost `remoteEntry.js` URLs on ports 3001 and 3002 (module-federation.config.ts:5-8), and each remote exposes one component (alert-sender/module-federation.config.ts:2-6; alert-dashboard/module-federation.config.ts:2-6). In code, the host imports both components statically (src/App.tsx:3-4), after asynchronous bootstrap (src/index.ts:1), and mounts them side by side in two sections of the same page (src/App.tsx:61-68). Both remotes are always loaded together; there is no routing or on-demand loading.

The repository's distinctive feature is that both remotes communicate directly without passing through the host: `AlertSender` fires a `CustomEvent('academic-alert')` on `window` when one of three buttons is clicked (alert-sender/src/components/AlertSender.tsx:71-81, 87-95), and `AlertDashboard` listens to that event and displays the received `detail` (alert-dashboard/src/components/AlertDashboard.tsx:97-108). The host passes no props to the components (src/App.tsx:63, 66). This exchange has both sides only when both are on the host page; independently, each remote lacks its event counterpart.

What did not become a relationship: generated types in `@mf-types/` and `declare module "Footer/Footer"` in src/types/federation.d.ts:1-5, marked `No` by the source code review (there is no `Footer` remote in host configuration, module-federation.config.ts:5-8); each unit's `import("./App")`, internal to it; and the host's empty `exposes: {}` (module-federation.config.ts:3). All three applications share `react` and `react-dom` (module-federation.config.ts:4).

## Relationships

| # | Source | Target | Type | Direction | Mechanism | In snapshot | Active | Configuration | Code |
|---|---|---|---|---|---|---|---|---|---|
| 1 | alert-sender | alert-dashboard | communication | source → target | events | Yes | Yes | — | alert-dashboard/src/components/AlertDashboard.tsx:103; alert-sender/src/components/AlertSender.tsx:72; alert-sender/src/components/AlertSender.tsx:80 |
| 2 | . | alert-sender | host → remote | source → target | module-federation | Yes | Yes | module-federation.config.ts:6 (remote `AlertSender@http://localhost:3001/remoteEntry.js`); alert-sender/module-federation.config.ts:2-6 (`name: "AlertSender"`, `filename: "remoteEntry.js"`, exposes `./AlertSender`); alert-sender/rspack.config.ts:25 (port 3001); alert-sender/rspack.config.ts:33 (`publicPath: "http://localhost:3001/"`) | src/App.tsx:63 |
| 3 | . | alert-dashboard | host → remote | source → target | module-federation | Yes | Yes | module-federation.config.ts:7 (remote `AlertDashboard@http://localhost:3002/remoteEntry.js`); alert-dashboard/module-federation.config.ts:2-6 (`name: "AlertDashboard"`, `filename: "remoteEntry.js"`, exposes `./AlertDashboard`); alert-dashboard/rspack.config.ts:25 (port 3002); alert-dashboard/rspack.config.ts:33 (`publicPath: "http://localhost:3002/"`) | src/App.tsx:66 |

## Observations

**1. alert-sender → alert-dashboard.** Source is alert-sender, which sends: `sendAlert` creates `CustomEvent('academic-alert', { detail: { type, message, timestamp } })` (alert-sender/src/components/AlertSender.tsx:72-78) and fires it on `window` (alert-sender/src/components/AlertSender.tsx:80). Target is alert-dashboard, registering a listener for the same event name (alert-dashboard/src/components/AlertDashboard.tsx:103) and writing `detail` into state (alert-dashboard/src/components/AlertDashboard.tsx:98-101). There is no sending in the reverse direction, hence direction `source → target`. The relationship is active because both components reside on the same host page (src/App.tsx:62-67). No configuration declares the channel; the event name is the only match.

**2. . → alert-sender.** The host's `AlertSender` remote (module-federation.config.ts:6) matches unit alert-sender through `name: "AlertSender"` and the exposed `./AlertSender` (alert-sender/module-federation.config.ts:2-6), the module imported in src/App.tsx:3; port and `publicPath` 3001 (alert-sender/rspack.config.ts:25, 33) match the remote URL and only corroborate. Active through rendering `<AlertSender />` in src/App.tsx:63.

**3. . → alert-dashboard.** The same form as relationship 2: remote `AlertDashboard` (module-federation.config.ts:7), resolved through `name: "AlertDashboard"` and `./AlertDashboard` (alert-dashboard/module-federation.config.ts:2-6), import in src/App.tsx:4, port and `publicPath` 3002 (alert-dashboard/rspack.config.ts:25, 33). Active through rendering `<AlertDashboard />` in src/App.tsx:66.

## Summary

Relationships: 3 (communication: 1, host → remote: 2). Active: 3. Target outside the snapshot: 0.
Units without a relationship: none.

