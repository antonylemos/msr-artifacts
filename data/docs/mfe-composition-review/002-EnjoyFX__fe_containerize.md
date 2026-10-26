---
schema: 1
id: 1202215420
full_name: EnjoyFX/fe_containerize
commit: f05a9de5c996497b2277614bf4cc473456d85b7e
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

# 002 — EnjoyFX/fe_containerize

## Repository overview

A containerized example with a NestJS backend and two React/Vite frontends: `frontend`, the main application, and `microfrontend`, a widget. Composition uses neither Module Federation nor another MFE library (the dependency review found none). The widget is packaged as an IIFE bundle publishing the `MicroFrontendWidget` global with `mount` and `unmount` (microfrontend/vite.config.js:25-29; microfrontend/src/main.jsx:7-19). The frontend injects that script, calls `mount` on its own element and `unmount` during cleanup (frontend/src/RemoteWidget.jsx:7-32), inside a side panel (frontend/src/App.jsx:800-803).

The contract between units consists only of the global on `window` and a DOM element. The script URL includes `?v=${Date.now()}` (frontend/src/App.jsx:802), forcing a download on each render and preventing caching. The widget also runs independently through its own page (microfrontend/index.html:9-12). Each frontend has its own image and nginx, and the frontend nginx forwards `/mfe/` to the widget container (frontend/nginx.conf:57-58; frontend/Dockerfile:12): this proxy is how the host reaches the bundle. The backend is not a frontend unit.

## Relationships

| # | Source | Target | Type | Direction | Mechanism | In snapshot | Active | Configuration | Code |
|---|---|---|---|---|---|---|---|---|---|
| 1 | frontend | microfrontend | page → embedded-frontend | source → target | script | Yes | Yes | microfrontend/vite.config.js:25-29 (bundle `lib` with entry point `src/main.jsx`, global `MicroFrontendWidget`, file `widget`, format `iife`); frontend/nginx.conf:57-58 (`/mfe/` → `http://microfrontend:80/`) | microfrontend/src/main.jsx:7; microfrontend/src/main.jsx:14; frontend/src/RemoteWidget.jsx:14; frontend/src/RemoteWidget.jsx:26; microfrontend/src/main.jsx:7; microfrontend/src/main.jsx:14; frontend/src/App.jsx:802; frontend/src/RemoteWidget.jsx:8 |

## Observations

**1. frontend → microfrontend.** The host loads `/mfe/widget.iife.js` and calls `window.MicroFrontendWidget.mount`/`unmount` (frontend/src/RemoteWidget.jsx:8-14, 25-26). The filename and global name match the widget bundle: `fileName: 'widget'` with format `iife` and `name: 'MicroFrontendWidget'` (microfrontend/vite.config.js:27-29). The `/mfe/` prefix is resolved by the frontend nginx proxy, which forwards it to the `microfrontend` service (frontend/nginx.conf:57-58). The `mount` and `unmount` definitions appear twice in Code because the source code review recorded them under two patterns.

## Summary

Relationships: 1 (page → embedded-frontend: 1). Active: 1. Target outside the snapshot: 0.
Units without a relationship: none.

