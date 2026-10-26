---
schema: 1
id: 1043375878
full_name: mrmechazilla/host-app
commit: 38ab4eb46b2edf72c07604bbbe2b0ff744c8f3b8
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-19
---

# 008 — mrmechazilla/host-app

## Workspace

No workspace declaration.

## Units

| Directory | Markers | Manifest | Entry | Build | Workspace | Deploy | Frontend unit | Rationale |
|---|---|---|---|---|---|---|---|---|
| . | angular.json;package.json;webpack.config.js;webpack.prod.config.js | package.json | angular.json:41 (`main: src/main.ts`); angular.json:21 (`index: src/index.html`) | angular.json:17-18 (`build` target with `ngx-build-plus:browser`); angular.json:42 (`extraWebpackConfig: webpack.config.js`); package.json:7 (`ng build`) | — | — | Yes | The snapshot’s only Angular application (the host), with its own entry and build |
| src | src/index.html | — | — | — | — | — | No | Part of unit `.`: `src/index.html` is the entry page declared in angular.json:21 |

## Summary

Frontend applications in the snapshot: 1 (.).

## Notes

- The classification records `frontend_units: 3`: the host and the remotes `users-mfe` and `payments-mfe`, which are outside the snapshot and appear only in `public/mf.manifest.json` (remotes at `localhost:4202` and `localhost:4203`).
- `angular.json:5-6` declares a single project (`host-app`); therefore there is no workspace.
- No `ops-*` or `ci-*` occurrence in `matches.csv` and no Dockerfile, workflow or hosting configuration in the snapshot.
