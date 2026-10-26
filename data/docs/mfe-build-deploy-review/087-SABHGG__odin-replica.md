---
schema: 1
id: 1183434052
full_name: SABHGG/odin-replica
commit: 06ce2bd578663f88243854f6eef292686660dfce
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

# 087 — SABHGG/odin-replica

## Repository overview

The snapshot is a single Create React App project at root, without a workspace. Build is local only, through script `build: react-scripts build` (package.json:20), without its own configuration file; other scripts are CRA defaults (`start`, `test`, `eject`, package.json:19-22). Output `/build` is ignored by git (.gitignore:11-12). The `package.json` declares neither `homepage` nor a publication script (package.json:1-45).

There are no deployment artifacts: no Dockerfile, compose, CI workflow, hosting configuration or proxy. The `matches.csv` has no `ops-*`, `ci-*` or `cfg-public-path` occurrences. The `README.md` contains standard CRA text (README.md:1-3) and only describes the development server at `http://localhost:3000` (README.md:9-12), which is not a deployment artifact.

Host loads an external Angular application bundle at runtime, by default `http://localhost:4200/main.js`, development `ng serve` according to the code comment, configurable through `REACT_APP_LEAPDOCS_ORIGIN` and `REACT_APP_LEAPDOCS_BUNDLE_URL` (src/index.js:7-9). This remote is absent from the snapshot, is not a structural review row, and nothing in the repository builds or publishes it. This is a development and demonstration configuration, without publication.

## Applications

| # | Application | Build | Deploy | Where served | Versioning | Artifacts |
|---|---|---|---|---|---|---|
| 1 | . | separate | not observed | — | No | package.json:20 (`react-scripts build`); .gitignore:11-12 (output `/build`) |

## Observations

**1. Root (`.`).** Own build: `react-scripts build` (package.json:20) generates the artifact of this single snapshot application, including local unit `odin-react` registered in the same bundle (src/index.js:56-60). Remote `leadocs-angular` does not enter this artifact; it is loaded by URL at runtime (src/index.js:7-9), hence Build `separate` rather than `joint`. Deploy `not observed`: no snapshot artifact packages or publishes the application, and port 3000 appears only in README, for the development server (README.md:9-12). Version `0.1.0` of a `private` package (package.json:3-4) is unused in publication, hence Versioning `No`.

## Summary

Applications: 1. Build (separate: 1). Deploy (not observed: 1). Independent versioning: 0.
