---
schema: 1
id: 1369982810
full_name: leosvelperez/mf-webpack-5-111-repro
url: https://github.com/leosvelperez/mf-webpack-5-111-repro
commit: 5d3a2ea6d7268534b007fa5497cb38a399d92445
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: other
approaches: []
ui_technologies: []
build_tools: []
frontend_units: 0
unit_organization: none
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 227 — leosvelperez/mf-webpack-5-111-repro

## Context

Minimal reproduction of a build defect: “Production build of a module federation remote with `[contenthash]` in `output.filename` fails on webpack 5.111.0” (`README.md:1–20`). It consists of six files:
- a `webpack.config.js` with `ModuleFederationPlugin` from `@module-federation/enhanced`, exposing `./Module`;
- `src/mod.js`, exporting the string `'mod'`;
- `src/index.js`, which only runs `console.log('remote')`.

There is no interface, HTML or consumer. The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:228` records rank 227, ID 1369982810, status `cloned`, branch `main` and the front matter commit, which is the HEAD of the clone and of `origin/main`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. There was no installation, build, execution or network access.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:228` records strategy `technology` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID appears in `data/discovery/mfe-round-001/candidates.csv:37291` (`unknown`) and `data/discovery/mfe-round-002/candidates.csv:37300` (`pass`).

A `sqlite3 -readonly` query against tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns the same hit in each round, from endpoint `repositories` and with an empty `path`:

| Query (`q`) | Subquery / effective query | Collection 001 / 002 (UTC) |
|---|---|---|
| `technology-module-federation-repositories`: `"module federation" in:name,description,readme` | `technology-module-federation-repositories#created:2026-09` / `"module federation" in:name,description,readme pushed:>=2025-04-01 created:2026-09-01..2026-09-30` | 2026-10-07T23:31:04.154Z / 2026-10-08T16:19:36.684Z |

Hit metadata:
- description “Module federation production build fails on webpack 5.111.0 with [contenthash] in output.filename”;
- no topics, language JavaScript, `fork: false`, size 1;
- created at 2026-09-14T13:45:16Z, pushed at 2026-09-14T13:45:21Z.

Spelling: “Module federation” in `README.md:1` (“# Module federation build failure on webpack 5.111.0”) and “module federation” in `:3`, as well as the description.

The README comes from the only commit, SHA `5d3a2ea` (2026-09-14), before the October 2026 collections. The README at the SHA does not postdate the searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 6 entries, all regular files `100644` (`.gitignore`, `README.md`, `package.json`, `webpack.config.js`, `src/index.js`, `src/mod.js`); zero symlinks and zero gitlinks. There is no HTML, components or UI framework. | contrary |
| Configuration | `webpack.config.js:1–13`: `ModuleFederationPlugin({ name: 'remote1', exposes: { './Module': './src/mod.js' } })`, `mode: 'production'` and `output.filename: '[name].[contenthash].js'`. `package.json:7–11`: `@module-federation/enhanced` 2.9.0 and `webpack` 5.111.0. | weak |
| Source code | `src/mod.js:1`: `export default 'mod';`. `src/index.js:1`: `console.log('remote');`. The exposed module is a string, not a frontend unit. | contrary |
| Documentation | `README.md:3–20`: aims to reproduce the error “Path variable [contenthash] not implemented in this context” and compare against 5.110.0. | context |

## Authorship and history

Non-shallow clone; 1 commit, SHA `5d3a2ea` (2026-09-14, “Reproduce the module federation build failure on webpack 5.111.0”), by Leosvel Perez Espinosa. No historical blob was read and there was no missing object.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | No frontend unit; the “remote” exposes a string (`src/mod.js:1`) and does not reference other units. |
| Q2 | No | Without frontend units, there is no independence to assess. |
| Q3 | No | There is no host, shell or consumer. |
| Q4 | No | The plugin is configured only to reproduce a build failure, without connecting units (`webpack.config.js:8–11`). |
| Q5 | No | Q1–Q4 are No: reproduction of a build tool defect. |

## Rationale

- `Non-MFE` under the rule “at least one question is No”. It matches “MFE-related dependencies that are unused or experimental”: Module Federation is configured, but only as a minimal case for a defect report.
- It is not MFE-unit: `exposes` publishes a string, not a frontend unit prepared for composition, as in draft 213 (function `sum`).
- `frontend_units: 0`, `unit_organization: none`, `approaches: []`, `ui_technologies: []`, `build_tools: []` (no frontend unit to which the bundler can be attributed), `repo_type: other`.
- There is no open decision.

## Analysis notes

- **RQ1 (misleading signals):** bug reproduction repositories in the Module Federation ecosystem match the technology query without containing units.
- **Protocol (search):** eligibility changes from `unknown` (001) to `pass` (002).
