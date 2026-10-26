---
schema: 1
id: 996744917
full_name: varshinir07/mfe-onehub-shell-app
commit: 1ddddc4241157e335c1b6e39372f050aa1705c1d
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 211 — varshinir07/mfe-onehub-shell-app

## Workspace

No workspace declaration.

## Units

| Directory | Markers | Manifest | Entry | Build | Workspace | Deploy | Frontend unit | Rationale |
|---|---|---|---|---|---|---|---|---|
| . | package.json | package.json | src/webpack.config.js:10 (`entry: './src/index.js'`); src/webpack.config.js:68-70 (`HtmlWebpackPlugin` with `template: './public/index.html'`) | src/webpack.config.js:5-102 (webpack configuration with `ModuleFederationPlugin`); package.json:20 (`webpack --config src/webpack.config.js --mode development`) | — | — | Yes | The snapshot’s only React application (the host), with its own entry and build |
| public | public/index.html | — | — | — | — | — | No | Part of unit `.`: `public/index.html` is the template used in src/webpack.config.js:69 |
| src | src/webpack.config.js | — | — | — | — | — | No | Part of unit `.`: the configuration and `src/index.js` entry belong to the build invoked by the root package.json:19-20 |

## Summary

Frontend applications in the snapshot: 1 (.).

## Notes

- The classification records `frontend_units: 3`: the host and the remotes `subscription` and `ownership`, which are outside the snapshot and appear only in src/webpack.config.js:76-77 (`localhost:3001` and `localhost:3002`).
- The `workspace-config` marker for `package.json` in `artifacts.csv` does not correspond to a workspace declaration: the file has no `workspaces` (package.json:1-51), and `matches.csv` has no `ws-*` occurrences.
- No `ops-*` or `ci-*` occurrence in `matches.csv` and no Dockerfile, workflow or hosting configuration in the snapshot.
