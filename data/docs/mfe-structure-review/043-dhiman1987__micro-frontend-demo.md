---
schema: 1
id: 1009887363
full_name: dhiman1987/micro-frontend-demo
commit: cae01436907388ad75de4a33cfc2c7a5ae256406
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-19
---

# 043 — dhiman1987/micro-frontend-demo

## Workspace

No workspace declaration.

## Units

| Directory | Markers | Manifest | Entry | Build | Workspace | Deploy | Frontend unit | Rationale |
|---|---|---|---|---|---|---|---|---|
| app-shell | app-shell/index.html | — | app-shell/index.html:9-29 (HTML page with UI) | — (static, no build) | — | — | Yes | Own HTML page that loads only static files (app-shell/index.html:7 `style.css`); requires no build. |
| app1 | app1/index.html | — | app1/index.html:3-4 (loads app.js and instantiates the element); app1/app.js:1-6 (custom element UI) | — (static, no build) | — | — | Yes | Own HTML page that loads `app.js` without package imports; requires no build. |
| app2 | app2/index.html | — | app2/index.html:3-4 (loads app.js and instantiates the element); app2/app.js:1-6 (custom element UI) | — (static, no build) | — | — | Yes | Own HTML page that loads `app.js` without package imports; requires no build. |
| app3 | app3/index.html;app3/package.json;app3/vite.config.js | app3/package.json:1-11 (own package) | app3/vite.config.js:9-15 (MyCounterElement.jsx build entry); app3/src/MyCounterElement.jsx:20-28 (mounts React and registers the element); app3/index.html:11-12 (standalone entry) | app3/vite.config.js:4-16 (own IIFE build); app3/package.json:8 (`vite build`) | — | — | Yes | React application encapsulated in a custom element, with its own entry and Vite build. |

## Summary

Frontend applications in the snapshot: 4 (app-shell, app1, app2, app3).

## Notes

- app-shell, app1 and app2 are static pages served directly: app1/app.js and app2/app.js have no imports, and app-shell/index.html only loads its own `style.css` and scripts from the other units by URL (app-shell/index.html:14, :20 and :26). Under the static page without a build rule, they are frontend units.
- The summary (4) matches the classification’s `frontend_units: 4`.
- README.md:39-69 instructs serving each directory with `http-server` on different ports (3000 to 3003); these are local execution instructions, not a deployment artifact.
