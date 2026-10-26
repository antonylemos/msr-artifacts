---
schema: 1
id: 1098656325
full_name: hd789789789/frontend-app-learning-old-v2
commit: d987aed86134f6fa2a2a79d85f72fe44cfc0e5ee
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

# 348 — hd789789789/frontend-app-learning-old-v2

## Repository overview

The snapshot is a copy of Open edX Learning MFE (`@edx/frontend-app-learning`, package.json:2), and root `.` is its only application. Build uses default `@openedx/frontend-build` configuration: `npm run build` calls `fedx-scripts webpack` (package.json:13), and webpack.prod.config.js:5 assembles configuration with `createConfig('webpack-prod')`. Snapshot only adds copying `public/static` to `dist/static` (webpack.prod.config.js:7-16) and alias `@src` (webpack.prod.config.js:18-21). Default output, `entry` and HTML template come from external package, outside snapshot. Scripts `start` and `dev` start development server (package.json:18, :20), on port 2000 (.env.development:34) and in `dev` with `PUBLIC_PATH=/learning/` and host `apps.local.openedx.io` (package.json:20). Production URLs remain empty in `.env` (e.g.: .env:8, `BASE_URL=''`; .env:14, `DISCUSSIONS_MFE_BASE_URL=''`) and are populated at build time outside repository.

CI publishes nothing. The only workflow building application is `validate.yml`, running `make validate.ci` on push to `master` and pull requests (.github/workflows/validate.yml:2-8, :17). This target performs `npm ci` and `make validate` (Makefile:64-66), checking lockfile, extracting messages, running lint, types, tests, `npm run build` and `bundlewatch` (Makefile:54-61). Workflow only stores coverage report and uploads it to Codecov (.github/workflows/validate.yml:18-36); `dist` goes no further. Other workflows call reusable workflows from organization `openedx` for issue and label management (.github/workflows/add-depr-ticket-to-depr-board.yml:15; .github/workflows/add-issue-to-btr-project.yml:15; .github/workflows/add-remove-label-on-comment.yml:19; .github/workflows/self-assign-issue.yml:12), commitlint (.github/workflows/commitlint.yml:10), lockfile version check (.github/workflows/lockfileversion-check.yml:13) and weekly Browserslist update (.github/workflows/update-browserslist-db.yml:3-4, :9). None covers frontend application deploy.

No Dockerfile, compose, deployment manifest or hosting configuration is present in snapshot. The `.dockerignore` exists (.dockerignore:1-10), and `.npmignore` lists `Dockerfile` and `docker-compose.yml` (.npmignore:5-6), but neither file is present in snapshot. The `catalog-info.yaml` is Backstage catalog metadata (catalog-info.yaml:4-19), not deploy. README only says deploy follows other Open edX MFEs and refers to external documentation (README.rst:128-133); Tutor appears there as development environment (README.rst:24-27). Version `1.0.0-semantically-released` (package.json:3) and `publishConfig` with `access: public` (package.json:28-30) would be used by a release process, but no snapshot workflow or script publishes package or generates a version.

## Applications

| # | Application | Build | Deploy | Where served | Versioning | Artifacts |
|---|---|---|---|---|---|---|
| 1 | . | separate | not observed | `http://localhost:2000` in development (.env.development:34; .env.development:8); `/learning/` with `apps.local.openedx.io` in script `dev` (package.json:20) | No | package.json:13 (`fedx-scripts webpack`); webpack.prod.config.js:5 (`createConfig('webpack-prod')`); webpack.prod.config.js:7-16 (copies `public/static` to `dist/static`); Makefile:54-66 (`validate.ci` runs `npm run build`); .github/workflows/validate.yml:17 (`make validate.ci` in CI, without publication) |

## Observations

**1. ..** Snapshot’s only application. Build `separate`: has its own build, and Discussions MFE code, classification’s other unit, is absent from repository and this build; it only loads through iframe at an environment URL (composition review, relation 1). Deploy `not observed`: build runs in CI (.github/workflows/validate.yml:17; Makefile:60), but result is not published, and no snapshot artifact packages or hosts application. Known addresses are for development (.env.development:34; package.json:20). Path `/learning/` of script `dev` suggests where platform serves application, but is development configuration. Versioning `No`: version in package.json:3 is a semantic release marker, and no snapshot job uses it to publish or release application.

## Summary

Applications: 1. Build (separate: 1). Deploy (not observed: 1). Independent versioning: 0.
