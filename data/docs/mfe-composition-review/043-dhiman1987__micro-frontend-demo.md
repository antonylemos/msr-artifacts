---
schema: 1
id: 1009887363
full_name: dhiman1987/micro-frontend-demo
commit: cae01436907388ad75de4a33cfc2c7a5ae256406
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
  date: 2026-10-21
---

# 043 — dhiman1987/micro-frontend-demo

## Repository overview

A micro-frontend demonstration with Web Components, without a composition library. `app-shell` is a static HTML page that loads a script by URL for each unit and uses the tag defined by that script (app-shell/index.html:12-28). Each unit is served by its own server:

- `app1` and `app2` are plain JavaScript, with no build: an `app.js` file defining the tag (`hello-app`, `world-app`).
- `app3` is React encapsulated in a custom element with Shadow DOM (app3/src/MyCounterElement.jsx:8, 20), packaged as an IIFE bundle (app3/vite.config.js:10-15).

The shell passes configuration to app3 through HTML attributes (`theme`, `maxcount`; app-shell/index.html:27), the only data contract between units. There are no events between them. Ports 3001 to 3003 appear in the script URLs loaded by the shell (app-shell/index.html:14, 20, 26), and the servers handling them are started by `http-server` commands described in the README (README.md:52-69); there is no server configuration in the repository. A Lit variant exists in the code, but no entry point reaches it.

## Relationships

| # | Source | Target | Type | Direction | Mechanism | In snapshot | Active | Configuration | Code |
|---|---|---|---|---|---|---|---|---|---|
| 1 | app-shell | app3 | application → custom-element | source → target | web-components | Yes | Yes | app3/vite.config.js:10-15 (bundle `lib` with entry point `src/MyCounterElement.jsx`, format `iife`, file `my-counter-app`) | app-shell/index.html:26; app3/src/MyCounterElement.jsx:6; app3/src/MyCounterElement.jsx:8; app3/src/MyCounterElement.jsx:28; app-shell/index.html:26; app-shell/index.html:27 |
| 2 | app-shell | app1 | application → custom-element | source → target | web-components | Yes | Yes | — | app1/app.js:1; app1/app.js:6; app-shell/index.html:14; app-shell/index.html:15 |
| 3 | app-shell | app2 | application → custom-element | source → target | web-components | Yes | Yes | — | app2/app.js:1; app2/app.js:6; app-shell/index.html:20; app-shell/index.html:21 |

## Observations

**1. app-shell → app3.** The shell loads `http://localhost:3003/my-counter-app.iife.js` and uses `<my-counter-app>` (app-shell/index.html:26-27). The tag is defined in app3/src/MyCounterElement.jsx:28, and the filename matches `fileName: 'my-counter-app'` with format `iife` (app3/vite.config.js:12-14). app-shell/index.html:26 appears twice in Code because the source code review recorded it under two patterns.

**2. app-shell → app1.** The shell loads `http://localhost:3001/app.js` and uses `<hello-app>` (app-shell/index.html:14-15), a tag defined in app1/app.js:6. The unit has no build configuration.

**3. app-shell → app2.** The shell loads `http://localhost:3002/app.js` and uses `<world-app>` (app-shell/index.html:20-21), a tag defined in app2/app.js:6. The unit has no build configuration.

## Summary

Relationships: 3 (application → custom-element: 3). Active: 3. Target outside the snapshot: 0.
Units without a relationship: none.

