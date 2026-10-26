---
schema: 1
id: 1255336417
full_name: cMancillaValle/ARGOS-SiVIA
commit: 4f6ef7f491ec9fc2d3e852f271e0c360549fad65
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

# 378 — cMancillaValle/ARGOS-SiVIA

## Repository overview

An academic computer vision security project, with a FastAPI backend and two frontend units. Host `frontend` is an HTML/JS dashboard without a framework or build, whose shell is `frontend/dashboard.html`. The other unit, `frontend-hermes`, is a React chat assistant, compiled by Vite as a single-file IIFE library `hermes-widget.js` (`frontend-hermes/vite.config.ts:11-15`). That build's entry point wraps React `App` in a custom element with shadow DOM and registers tag `hermes-widget` (`frontend-hermes/src/hermes-widget.tsx:6`, `:16`, `:58`).

The dashboard loads the bundle through `<script src="/hermes/hermes-widget.js">` (`frontend/dashboard.html:366`) and uses tag `<hermes-widget>` with attributes `api-base` and `modulo` (`frontend/dashboard.html:361`), read by the widget in `frontend-hermes/src/hermes-widget.tsx:38-40`. The widget has no server of its own: the same FastAPI serves `frontend/` and the widget's `dist` at path `/hermes/` (`backend/main.py:92`, `backend/main.py:281-288`). Mechanism is Web Components, without orchestrator or federation.

Besides mounting, units communicate through `CustomEvent` on `window`, in one direction: the "Hermes IA" button (English translation: "Hermes AI") in `frontend`'s topbar fires `toggle-hermes` (`frontend/components/topbar.html:26`), and the profile drawer fires `close-hermes` (`frontend/dashboard.html:421`); `App` in `frontend-hermes` listens to both (`frontend-hermes/src/App.tsx:35-36`). Other events and dynamic scripts found by mining (`argos:navaway`, reexecuting HTML fragment scripts, Leaflet and Tailwind through CDN) are internal to `frontend` and do not become a relationship.

## Relationships

| # | Source | Target | Type | Direction | Mechanism | In snapshot | Active | Configuration | Code |
|---|---|---|---|---|---|---|---|---|---|
| 1 | frontend | frontend-hermes | application → custom-element | source → target | web-components | Yes | Yes | frontend-hermes/vite.config.ts:11-15 (bundle `lib` with entry point `src/hermes-widget.tsx`, format `iife`, file `hermes-widget.js`) | frontend-hermes/src/hermes-widget.tsx:6; frontend-hermes/src/hermes-widget.tsx:16; frontend-hermes/src/hermes-widget.tsx:58; frontend/dashboard.html:361; frontend/dashboard.html:366 |
| 2 | frontend | frontend-hermes | communication | source → target | events | Yes | Yes | — | frontend-hermes/src/App.tsx:35; frontend-hermes/src/App.tsx:36; frontend/components/topbar.html:26; frontend/dashboard.html:421 |

## Observations

**1. frontend → frontend-hermes.** Tag `hermes-widget` used in `frontend/dashboard.html:361` is defined in `frontend-hermes/src/hermes-widget.tsx:58`, resolving the target to unit `frontend-hermes`. The script loading the tag (`frontend/dashboard.html:366`) enters this relationship: name `hermes-widget.js` is the build's `fileName` (`frontend-hermes/vite.config.ts:15`), and prefix `/hermes/` is the backend route serving `frontend-hermes/dist` (`backend/main.py:92`, `backend/main.py:281-288`). The class and shadow DOM (`frontend-hermes/src/hermes-widget.tsx:6`, `:16`) are in the supplier but enter the consumer relationship. Active `Yes`: all code lines are `Yes` in the source code review. Source passes configuration to the widget only through attributes (`api-base="/api"`, `modulo="dashboard"`), read in `frontend-hermes/src/hermes-widget.tsx:38-40`.

**2. frontend → frontend-hermes.** `frontend` sends `toggle-hermes` through the topbar button (`frontend/components/topbar.html:26`), a fragment inserted in the dashboard by the router, and `close-hermes` on opening the profile drawer (`frontend/dashboard.html:421`). `frontend-hermes` only listens (`frontend-hermes/src/App.tsx:35-36`) and fires no events back, hence direction `source → target`, rather than `bidirectional`. Both events have the same pair and type and remain in one row.

## Summary

Relationships: 2 (application → custom-element: 1, communication: 1). Active: 2. Target outside the snapshot: 0.
Units without a relationship: none.

