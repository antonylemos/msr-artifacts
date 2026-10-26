---
schema: 1
id: 754013249
full_name: MSF-OCG/LIME-EMR
commit: 4de9e4139c74b15c5af0cdc02a97c2e2eadf56de
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 074 — MSF-OCG/LIME-EMR

## Workspace

No workspace declaration.

## Units

| Directory | Markers | Manifest | Entry | Build | Workspace | Deploy | Frontend unit | Rationale |
|---|---|---|---|---|---|---|---|---|
| . | package.json | package.json | — (`package.json:5` declares `main: index.js`, missing from the snapshot) | — (`package.json:6-9` has only `playwright test` scripts) | — | — | No | e2e testing package (Playwright), with neither frontend application entry nor build |
| docs | docs/index.html | — | docs/index.html:15-35 (`<div id="app">` and `window.$docsify` with `docsify.min.js` from the CDN) | — (static, no build) | — | — | No | Docsify documentation site, not a frontend application of the system |

## Summary

Frontend applications in the snapshot: 0.

## Notes

- The classification records `frontend_units: 42`: external ESM modules listed in `distro/configs/openmrs/frontend_assembly/spa-assemble-config.json`, whose sources are not in the snapshot. Therefore the count here is 0.
- `artifacts.csv` marks `package.json` as `workspace-config`, but the file has no `workspaces` field (`package.json:1-19`) and `matches.csv` has no `ws-*` occurrence.
- The `ops-*` occurrences in `matches.csv` are Dockerfiles and compose for OpenFn, OpenMRS core, MariaDB and Traefik in `scripts/`, not deployment of `.` or `docs`. The `ci-*` workflows package the Maven distribution or run the Playwright tests (`.github/workflows/playwright.yml:15-19`); none builds or publishes `docs`.
