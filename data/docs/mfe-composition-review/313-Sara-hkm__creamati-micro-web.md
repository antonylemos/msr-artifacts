---
schema: 1
id: 1082058462
full_name: Sara-hkm/creamati-micro-web
commit: 541f8edc7615e399cbbf0fe3f1ae33abe14c4796
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

# 313 — Sara-hkm/creamati-micro-web

## Repository overview

A “Golden sample” of micro-frontends with React and iframe integration (README.md:1-3, 18-21). There are five Create React App applications in `frontend/`: `frontend/container` and four micro-frontends (`frontend/user-management-app`, `frontend/data-grid-app`, `frontend/analytics-app` and `frontend/settings-app`). There is no composition library or custom build configuration; the only mechanism is an `<iframe>` in the container.

The container has a header, sidebar menu and main area. The menu lists `home`, `users`, `data`, `analytics` and `settings` (frontend/container/src/App.tsx:12-18), and a click switches the active tab through `openMicroFrontend` (frontend/container/src/App.tsx:8-10, 93, 158). Outside tab `home`, the main area displays a single `<iframe>` whose `src` is selected by tab: URLs `https://olivium-dev.github.io/golden-sample-react-micro-web/` followed by `user-management/`, `data-grid/`, `analytics/` or `settings/` (frontend/container/src/App.tsx:138, 218, 239-245). Thus a single code line supports four relationships, one per micro-frontend.

URL segments match subdirectories where workflows publish each micro-frontend's build on GitHub Pages (`destination_dir`, .github/workflows/deploy-all.yml:86-89 and 116; .github/workflows/deploy-<app>.yml:42-43). That name match resolves each target to a unit, as the source code review already did. The distinctive feature is the URLs' origin: they point to GitHub Pages for account `olivium-dev`, rather than this account (`Sara-hkm`), where snapshot workflows would publish; the container embeds builds of these units served from another origin. No `frontend/*/package.json` declares `homepage`, so the URL-to-unit connection comes only from workflows' `destination_dir`. Targets were resolved through that name, as in the source code review (Notes, first item); if the external origin outweighed the path, all four targets would be written as URLs, with In snapshot `No`.

The micro-frontends are static demonstration pages (e.g.: frontend/analytics-app/src/App.tsx:4-12) without composition code. There is no `postMessage`, `CustomEvent`, `BroadcastChannel` or `addEventListener` in `frontend/*/src`, hence no `communication` relationship. Module Federation appears only in the README as a future improvement and in `.cursor/templates/` templates, outside any unit (see the source code review); it did not become a relationship.

## Relationships

| # | Source | Target | Type | Direction | Mechanism | In snapshot | Active | Configuration | Code |
|---|---|---|---|---|---|---|---|---|---|
| 1 | frontend/container | frontend/analytics-app | page → embedded-frontend | source → target | iframe | Yes | Yes | .github/workflows/deploy-all.yml:88 (matrix: `analytics-app` → `destination: 'analytics'`); .github/workflows/deploy-all.yml:115-116 (`publish_dir` and `destination_dir` from the matrix); .github/workflows/deploy-analytics.yml:42-43 (`publish_dir: frontend/analytics-app/build`, `destination_dir: analytics`) | frontend/container/src/App.tsx:239 |
| 2 | frontend/container | frontend/data-grid-app | page → embedded-frontend | source → target | iframe | Yes | Yes | .github/workflows/deploy-all.yml:87 (matrix: `data-grid-app` → `destination: 'data-grid'`); .github/workflows/deploy-all.yml:115-116 (`publish_dir` and `destination_dir` from the matrix); .github/workflows/deploy-data-grid.yml:42-43 (`publish_dir: frontend/data-grid-app/build`, `destination_dir: data-grid`) | frontend/container/src/App.tsx:239 |
| 3 | frontend/container | frontend/settings-app | page → embedded-frontend | source → target | iframe | Yes | Yes | .github/workflows/deploy-all.yml:89 (matrix: `settings-app` → `destination: 'settings'`); .github/workflows/deploy-all.yml:115-116 (`publish_dir` and `destination_dir` from the matrix); .github/workflows/deploy-settings.yml:42-43 (`publish_dir: frontend/settings-app/build`, `destination_dir: settings`) | frontend/container/src/App.tsx:239 |
| 4 | frontend/container | frontend/user-management-app | page → embedded-frontend | source → target | iframe | Yes | Yes | .github/workflows/deploy-all.yml:86 (matrix: `user-management-app` → `destination: 'user-management'`); .github/workflows/deploy-all.yml:115-116 (`publish_dir` and `destination_dir` from the matrix); .github/workflows/deploy-user-management.yml:42-43 (`publish_dir: frontend/user-management-app/build`, `destination_dir: user-management`) | frontend/container/src/App.tsx:239 |

## Observations

**1. frontend/container → frontend/analytics-app.** In tab `analytics`, the container's `<iframe>` receives `https://olivium-dev.github.io/golden-sample-react-micro-web/analytics/` (frontend/container/src/App.tsx:239, 243). Segment `analytics` is the `destination_dir` used to publish the build of `frontend/analytics-app` (.github/workflows/deploy-all.yml:88, 115-116; .github/workflows/deploy-analytics.yml:42-43), resolving the target to that unit (In snapshot `Yes`). The URL points to GitHub Pages for account `olivium-dev`, rather than this account; the match is through path, rather than origin. Active `Yes`: the source code review line is `Yes`, and `App` is rendered by the container entry point (frontend/container/src/index.tsx:4, 10-14).

**2. frontend/container → frontend/data-grid-app.** Same `<iframe>`, in tab `data`, with `.../golden-sample-react-micro-web/data-grid/` (frontend/container/src/App.tsx:239, 242). Segment `data-grid` is the `destination_dir` of `frontend/data-grid-app` (.github/workflows/deploy-all.yml:87, 115-116; .github/workflows/deploy-data-grid.yml:42-43). Tab id (`data`, frontend/container/src/App.tsx:15) differs from the URL segment; the segment connects it to the unit. In snapshot and Active values as in relationship 1.

**3. frontend/container → frontend/settings-app.** Same `<iframe>`, in tab `settings`, with `.../golden-sample-react-micro-web/settings/` (frontend/container/src/App.tsx:239, 244). Segment `settings` is the `destination_dir` of `frontend/settings-app` (.github/workflows/deploy-all.yml:89, 115-116; .github/workflows/deploy-settings.yml:42-43). In snapshot and Active values as in relationship 1.

**4. frontend/container → frontend/user-management-app.** Same `<iframe>`, in tab `users`, with `.../golden-sample-react-micro-web/user-management/` (frontend/container/src/App.tsx:239, 241). Segment `user-management` is the `destination_dir` of `frontend/user-management-app` (.github/workflows/deploy-all.yml:86, 115-116; .github/workflows/deploy-user-management.yml:42-43); tab id is `users` (frontend/container/src/App.tsx:14). In snapshot and Active values as in relationship 1.

## Summary

Relationships: 4 (page → embedded-frontend: 4). Active: 4. Target outside the snapshot: 0.
Units without a relationship: none.

