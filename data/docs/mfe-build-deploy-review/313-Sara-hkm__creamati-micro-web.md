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
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 313 — Sara-hkm/creamati-micro-web

## Repository overview

Five Create React App applications in `frontend/`, each with its own `package.json` and `package-lock.json` and script `"build": "react-scripts build"` (e.g.: frontend/analytics-app/package.json:21-22). No workspace: root `package.json` only enters each directory through `cd`, and `build:all` runs all five builds sequentially, each in its directory (package.json:13-14). Each build generates its own application `build/` directory; no application enters another’s build. Container does not embed micro-frontends: loads them in `<iframe>` through URL (frontend/container/src/App.tsx:239-245).

Deploy uses GitHub Actions to repository GitHub Pages, with `peaceiris/actions-gh-pages@v3`, in two forms reaching same result. (a) One workflow per application (`.github/workflows/deploy-<app>.yml`), triggered by push or pull request to `main` changing `frontend/<app>/**` (e.g.: .github/workflows/deploy-analytics.yml:3-12). It installs and builds only that application and publishes its `build/` directory to its own Pages subdirectory (e.g.: .github/workflows/deploy-analytics.yml:28-43). (b) The `deploy-all.yml`, triggered by push to `main` or manually (.github/workflows/deploy-all.yml:3-6). It has a job `build-and-test` building and testing all five applications without publication (.github/workflows/deploy-all.yml:9-47), a job `deploy-container` (.github/workflows/deploy-all.yml:49-78) and matrix `deploy-micro-frontends` with one execution per micro-frontend (.github/workflows/deploy-all.yml:80-116). In both forms, each publication takes one application’s `build/` to its own `destination_dir`: `container`, `user-management`, `data-grid`, `analytics` and `settings`. Applications share same Pages site, but with distinct publications and subdirectories, unlike a single Pages artifact assembled with all.

This account’s Pages address is not written in snapshot. Container points iframes to `https://olivium-dev.github.io/golden-sample-react-micro-web/<subdiretório>/` (frontend/container/src/App.tsx:241-244), Pages of another account with same subdirectories as workflows, as composition review records. Thus container published by this repository displays builds served from another origin. Container workflow adds `cname: micro-frontend-container.github.io` (.github/workflows/deploy-container.yml:44), absent from equivalent job in `deploy-all.yml` (.github/workflows/deploy-all.yml:73-78). Snapshot does not show whether this domain has effect, and this does not change container row.

The `DEPLOYMENT.md` describes Vercel deploy, with one project per micro-frontend, and Netlify and Pages alternatives (DEPLOYMENT.md:3-28, 84-106). These are file’s `ops-hosting` occurrences. Snapshot workflows use neither Vercel nor Netlify, only Pages. As documentation, `DEPLOYMENT.md` does not decide Deploy column. Each application’s `.env` files only fix dev server port (e.g.: frontend/analytics-app/.env:1), not counting as deploy. No Dockerfile, compose, `vercel.json` or `netlify.toml` exists, and no application has a version used in publication.

## Applications

| # | Application | Build | Deploy | Where served | Versioning | Artifacts |
|---|---|---|---|---|---|---|
| 1 | frontend/analytics-app | separate | separate | subdirectory `analytics/` of repository GitHub Pages (.github/workflows/deploy-analytics.yml:43; .github/workflows/deploy-all.yml:88, 116); port 3003 of dev server (frontend/analytics-app/.env:1) | No | frontend/analytics-app/package.json:22 (`react-scripts build`); .github/workflows/deploy-analytics.yml:3-12 (triggered by `frontend/analytics-app/**`); .github/workflows/deploy-analytics.yml:28-43 (application-only build and publication of `frontend/analytics-app/build` to `analytics`); .github/workflows/deploy-all.yml:80-116 (matrix execution building and publishing only this application to `analytics`) |
| 2 | frontend/container | separate | separate | subdirectory `container/` of repository GitHub Pages (.github/workflows/deploy-container.yml:43; .github/workflows/deploy-all.yml:78); port 3000 of dev server (frontend/container/.env:1) | No | frontend/container/package.json:22 (`react-scripts build`); .github/workflows/deploy-container.yml:3-12 (triggered by `frontend/container/**`); .github/workflows/deploy-container.yml:28-44 (application-only build and publication of `frontend/container/build` to `container`, with `cname`); .github/workflows/deploy-all.yml:49-78 (job `deploy-container`, build and publication of container only) |
| 3 | frontend/data-grid-app | separate | separate | subdirectory `data-grid/` of repository GitHub Pages (.github/workflows/deploy-data-grid.yml:43; .github/workflows/deploy-all.yml:87, 116); port 3002 of dev server (frontend/data-grid-app/.env:1) | No | frontend/data-grid-app/package.json:22 (`react-scripts build`); .github/workflows/deploy-data-grid.yml:3-12 (triggered by `frontend/data-grid-app/**`); .github/workflows/deploy-data-grid.yml:28-43 (application-only build and publication of `frontend/data-grid-app/build` to `data-grid`); .github/workflows/deploy-all.yml:80-116 (matrix execution building and publishing only this application to `data-grid`) |
| 4 | frontend/settings-app | separate | separate | subdirectory `settings/` of repository GitHub Pages (.github/workflows/deploy-settings.yml:43; .github/workflows/deploy-all.yml:89, 116); port 3004 of dev server (frontend/settings-app/.env:1) | No | frontend/settings-app/package.json:22 (`react-scripts build`); .github/workflows/deploy-settings.yml:3-12 (triggered by `frontend/settings-app/**`); .github/workflows/deploy-settings.yml:28-43 (application-only build and publication of `frontend/settings-app/build` to `settings`); .github/workflows/deploy-all.yml:80-116 (matrix execution building and publishing only this application to `settings`) |
| 5 | frontend/user-management-app | separate | separate | subdirectory `user-management/` of repository GitHub Pages (.github/workflows/deploy-user-management.yml:43; .github/workflows/deploy-all.yml:86, 116); port 3001 of dev server (frontend/user-management-app/.env:1) | No | frontend/user-management-app/package.json:22 (`react-scripts build`); .github/workflows/deploy-user-management.yml:3-12 (triggered by `frontend/user-management-app/**`); .github/workflows/deploy-user-management.yml:28-43 (application-only build and publication of `frontend/user-management-app/build` to `user-management`); .github/workflows/deploy-all.yml:80-116 (matrix execution building and publishing only this application to `user-management`) |

## Observations

**1. frontend/analytics-app.** Build `separate`: `react-scripts build` without own configuration (frontend/analytics-app/package.json:22), with output in application `build/` directory. Root `build:all` (package.json:14) and job `build-and-test` (.github/workflows/deploy-all.yml:33-39) only trigger same build. Deploy `separate`: own workflow publishes only `frontend/analytics-app/build` to `analytics` (.github/workflows/deploy-analytics.yml:38-43). Execution `analytics-app` of matrix in `deploy-all.yml` does same (.github/workflows/deploy-all.yml:88, 101-116). Both forms publish application separately, so no ambiguity leading to `Undetermined` exists. Own workflow also runs on pull request (.github/workflows/deploy-analytics.yml:9-12) and publishes then, because deploy step has no condition. In composition, container loads this application through same subdirectory but Pages of `olivium-dev` (frontend/container/src/App.tsx:243). Versioning `No`: `"version": "0.1.0"` with `"private": true` (frontend/analytics-app/package.json:3-4), unused in publication.

**2. frontend/container.** Build `separate`, under same terms as application 1 (frontend/container/package.json:22). Micro-frontends do not enter bundle, because loaded through iframe at runtime (frontend/container/src/App.tsx:239-245). Deploy `separate`: own workflow publishes only `frontend/container/build` to `container` (.github/workflows/deploy-container.yml:38-44), and job `deploy-container` in `deploy-all.yml` does same (.github/workflows/deploy-all.yml:68-78). Particularity is `cname: micro-frontend-container.github.io`, present only in own workflow (.github/workflows/deploy-container.yml:44). Iframe URLs are fixed in code and point to another account’s Pages (frontend/container/src/App.tsx:241-244), not subdirectories this repository publishes. Versioning `No` (frontend/container/package.json:3-4).

**3. frontend/data-grid-app.** Same situation as application 1: own build (frontend/data-grid-app/package.json:22), own workflow publishing only `build/` to `data-grid` (.github/workflows/deploy-data-grid.yml:28-43) and own execution in matrix of `deploy-all.yml` (.github/workflows/deploy-all.yml:87, 101-116). Container uses subdirectory `data-grid/` in tab `data` (frontend/container/src/App.tsx:242). Versioning `No` (frontend/data-grid-app/package.json:3-4).

**4. frontend/settings-app.** Same situation as application 1: own build (frontend/settings-app/package.json:22), own workflow publishing only `build/` to `settings` (.github/workflows/deploy-settings.yml:28-43) and own matrix execution (.github/workflows/deploy-all.yml:89, 101-116). Container uses subdirectory `settings/` (frontend/container/src/App.tsx:244). Versioning `No` (frontend/settings-app/package.json:3-4).

**5. frontend/user-management-app.** Same situation as application 1: own build (frontend/user-management-app/package.json:22), own workflow publishing only `build/` to `user-management` (.github/workflows/deploy-user-management.yml:28-43) and own matrix execution (.github/workflows/deploy-all.yml:86, 101-116). Container uses subdirectory `user-management/` in tab `users` (frontend/container/src/App.tsx:241). Versioning `No` (frontend/user-management-app/package.json:3-4).

## Summary

Applications: 5. Build (separate: 5). Deploy (separate: 5). Independent versioning: 0.
