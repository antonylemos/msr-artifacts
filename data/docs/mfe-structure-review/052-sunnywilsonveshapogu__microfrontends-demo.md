---
schema: 1
id: 1065269096
full_name: sunnywilsonveshapogu/microfrontends-demo
commit: f56f903190312e938d0ad5a9a146ad4dbe333589
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-19
---

# 052 — sunnywilsonveshapogu/microfrontends-demo

## Workspace

No workspace declaration.

## Units

| Directory | Markers | Manifest | Entry | Build | Workspace | Deploy | Frontend unit | Rationale |
|---|---|---|---|---|---|---|---|---|
| . | package.json | package.json:1-16 (coordination manifest) | — | — | — | — | No | Orchestration root for commands of the three applications, without its own entry. |
| header-mf | header-mf/package.json;header-mf/webpack.config.js | header-mf/package.json:1-7 (own manifest) | header-mf/src/index.js:1 (conventional webpack entry); header-mf/src/bootstrap.js:1-6 (mounts React, but depends on the missing HTML) | header-mf/webpack.config.js:4-19 (own configuration); header-mf/webpack.config.js:46 (references a missing template); header-mf/package.json:6 (`webpack --mode production`) | — | — | Undetermined | Own entry and build declared, but the HTML template required by the build does not exist in the snapshot. |
| products-mf | products-mf/package.json;products-mf/webpack.config.js | products-mf/package.json:1-7 (own manifest) | products-mf/src/index.js:1 (conventional webpack entry); products-mf/src/bootstrap.js:1-6 (mounts React, but depends on the missing HTML) | products-mf/webpack.config.js:4-19 (own configuration); products-mf/webpack.config.js:46 (references a missing template); products-mf/package.json:6 (`webpack --mode production`) | — | — | Undetermined | Own entry and build declared, but the HTML template required by the build does not exist in the snapshot. |
| shell | shell/package.json;shell/webpack.config.js | shell/package.json:1-7 (own manifest) | shell/src/index.js:1 (conventional webpack entry); shell/src/bootstrap.js:1-6 (mounts React, but depends on the missing HTML) | shell/webpack.config.js:4-19 (own configuration); shell/webpack.config.js:40 (references a missing template); shell/package.json:6 (`webpack --mode production`) | — | — | Undetermined | Own entry and build declared, but the HTML template required by the build does not exist in the snapshot. |

## Summary

Frontend applications in the snapshot: 0.

## Notes

- The classification records frontend_units: 3. The three intended boundaries are observable, but the structural criterion requires being able to build the application on its own: header-mf/webpack.config.js:46, products-mf/webpack.config.js:46 and shell/webpack.config.js:40 reference public/index.html, missing from all three directories. Because of this contradiction, all three rows received Undetermined and the summary has zero Yes.
- The root coordination scripts are neither a workspace declaration nor an application build of its own.
- There are no ops-* or ci-* occurrences in matches.csv demonstrating separate deployment.
