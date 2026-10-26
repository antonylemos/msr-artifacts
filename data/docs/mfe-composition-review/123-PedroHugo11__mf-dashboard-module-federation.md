---
schema: 1
id: 1135167821
full_name: PedroHugo11/mf-dashboard-module-federation
commit: 184ec1b1762b6ea93f1f8f8de44118412a9ab6a8
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

# 123 — PedroHugo11/mf-dashboard-module-federation

## Repository overview

A proof of concept for a React dashboard with Vite and `@originjs/vite-plugin-federation`, in three independent root projects, without a workspace. `shell` is the host and `mfe-weather` and `mfe-counter` are Module Federation remotes. The shell declares both remotes through fixed URLs on `localhost` (shell/vite.config.ts:14-18) and shares `react` and `react-dom` (shell/vite.config.ts:19); each remote names itself, generates `remoteEntry.js` and exposes key `./Widget`, pointing to its `src/bootstrap` (mfe-weather/vite.config.ts:14-20; mfe-counter/vite.config.ts:14-20). `bootstrap.tsx` only re-exports the unit's widget (mfe-weather/src/bootstrap.tsx:1-2; mfe-counter/src/bootstrap.tsx:1-2).

Composition uses components in a single dashboard. The shell loads `weather/Widget` and `counter/Widget` through `React.lazy` (shell/src/App.tsx:3-4) and renders them in two cards, each under `Suspense` with a loading skeleton (shell/src/App.tsx:16-28). The two federated modules' types are declared manually as components without props (shell/src/vite-env.d.ts:1-9). Each remote also runs independently, mounting the same widget it exposes (mfe-weather/src/main.tsx:4-6; mfe-counter/src/main.tsx:4-6).

The remote URLs use ports 4173 and 4174 (shell/vite.config.ts:16-17), rather than the remotes' `server.port` values, 5173 and 5174 (mfe-weather/vite.config.ts:6-8; mfe-counter/vite.config.ts:6-8). They match the remotes' `vite preview`, which has no port of its own (mfe-counter/package.json:10), in README order: build and preview weather, then counter, then `npm run dev` in the shell (README.md:67-78). There is no inter-unit communication, custom elements, iframes or injected scripts (source code review, Notes). All three units participate in a relationship.

## Relationships

| # | Source | Target | Type | Direction | Mechanism | In snapshot | Active | Configuration | Code |
|---|---|---|---|---|---|---|---|---|---|
| 1 | shell | mfe-weather | host → remote | source → target | module-federation | Yes | Yes | shell/vite.config.ts:16 (remote `weather` at `http://localhost:4173/assets/remoteEntry.js`); shell/vite.config.ts:19 (`shared` react, react-dom); mfe-weather/vite.config.ts:15-18 (`name: "weather"`, `filename: "remoteEntry.js"`, exposes `./Widget`) | shell/src/App.tsx:3; shell/src/App.tsx:19 |
| 2 | shell | mfe-counter | host → remote | source → target | module-federation | Yes | Yes | shell/vite.config.ts:17 (remote `counter` at `http://localhost:4174/assets/remoteEntry.js`); shell/vite.config.ts:19 (`shared` react, react-dom); mfe-counter/vite.config.ts:15-18 (`name: "counter"`, `filename: "remoteEntry.js"`, exposes `./Widget`) | shell/src/App.tsx:4; shell/src/App.tsx:25 |

## Observations

**1. shell → mfe-weather.** The `weather/Widget` specifier (shell/src/App.tsx:3) matches the shell's `weather` remote (shell/vite.config.ts:16) and, in the mfe-weather unit, `name: "weather"` and key `./Widget` (mfe-weather/vite.config.ts:15-18); the target was resolved through that name and exposed key, not the port. The exposed file default-exports `WeatherWidget` (mfe-weather/src/bootstrap.tsx:1-2), rendered in the "Weather" card (shell/src/App.tsx:17-21). Active because both code lines are `Yes`. The URL's port 4173 is not fixed in the remote configuration; it depends on weather's `vite preview` starting first, as directed by the README (README.md:67-69).

**2. shell → mfe-counter.** The same resolution: `counter/Widget` (shell/src/App.tsx:4), remote `counter` (shell/vite.config.ts:17), `name: "counter"` and `./Widget` (mfe-counter/vite.config.ts:15-18), re-exporting `CounterWidget` (mfe-counter/src/bootstrap.tsx:1-2), rendered in the "Counter" card (shell/src/App.tsx:23-27). Active because both code lines are `Yes`. Port 4174 is also not fixed in the remote and corresponds to the second `vite preview` in the README sequence (README.md:71-73).

## Summary

Relationships: 2 (host → remote: 2). Active: 2. Target outside the snapshot: 0.
Units without a relationship: none.

