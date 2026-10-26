---
schema: 1
id: 1234974208
full_name: Gl1tch42/mfe-doctor
url: https://github.com/Gl1tch42/mfe-doctor
commit: 5b0521062060bb4349558aa3c1159f449283dcdd
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: library
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

# 323 — Gl1tch42/mfe-doctor

## Context

- **Repository type:** tool/library. `mfe-doctor` is an npm-published CLI linter analyzing Module Federation configurations to detect errors before deployment (`README.md:1–7`; `package.json:2–11`).

The repository contains the analyzer (Babel parser, rules, reporters), rule documentation and tests with `webpack.config.js` fixtures using `ModuleFederationPlugin`. Fixtures are test inputs, not application units. The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:324` records rank 323, ID 1234974208, status `cloned`, branch `main` and the front matter commit, which is the HEAD of the clone and of `origin/main`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. There was no installation, build, execution or network access.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:324` records strategies `terminology;technology` and eligibility `unknown`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID appears in `data/discovery/mfe-round-001/candidates.csv:29864` and `data/discovery/mfe-round-002/candidates.csv:29870`, both with `terminology;technology` and `unknown`.

A `sqlite3 -readonly` query against tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns the same three hits in each round, from endpoint `repositories` and with an empty `path`:

| Query (`q`) | Subquery | Collection 001 / 002 (UTC) |
|---|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | `…#created:2026-05` | 2026-10-07T22:36:54.296Z / 2026-10-08T15:59:53.854Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | `…#created:2026-05` | 2026-10-07T23:05:48.505Z / 2026-10-08T16:09:21.512Z |
| `technology-module-federation-repositories`: `"module federation" in:name,description,readme` | `…#created:2026-05` | 2026-10-07T23:26:24.296Z / 2026-10-08T16:18:08.915Z |

The effective queries append `pushed:>=2025-04-01 created:2026-05-01..2026-05-31`.

Hit metadata (identical in both rounds): null description, no topics, language TypeScript, MIT license, `fork: false`, size 61, created at 2026-05-10T21:57:50Z, pushed at 2026-07-25T20:50:49Z.

Matches in the README at the SHA:
- **“micro frontend”:** `README.md:20` (“enterprise-scale micro frontend architectures”);
- **“micro frontends”:** `README.md:11` (“Micro Frontends with Module Federation frequently fail in production…”);
- **“module federation”:** `README.md:7` (“Detect Module Federation misconfigurations…”), also `:11`, `:27`, `:32`.

The README was last changed at the SHA (2026-07-25T21:50:36+01:00, that is, 20:50:36Z), matching `pushed_at` and before the October 2026 collections. The README at the SHA does not postdate the searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 85 entries, all regular files `100644`; zero symlinks and zero gitlinks. `src/` (CLI, core, rules, reporters), `docs/` (rules and architecture), `examples/custom-rule.js`, `tests/` (tests and fixtures) and build configuration (`tsup.config.ts`). There is no frontend application. | contrary |
| Configuration | `package.json:2–11`: npm package `mfe-doctor`, “Detect Module Federation misconfigurations”, keywords `module-federation`, `micro-frontend`, `linter`; `:22–30`: CJS/ESM library exports. | contrary |
| Source code (analyzer) | `src/core/extractor.ts:1–20`: uses `@babel/traverse` to locate `ModuleFederationPlugin` in webpack configs; `src/rules/*.ts`: rules such as `version-mismatch`, `singleton-inconsistent` and `expose-invalid-path`. The tool inspects others’ configurations; it does not configure federation for itself. | contrary |
| Source code (fixtures) | `tests/fixtures/multi-plugin/webpack.config.js:1–22` and other `tests/fixtures/*/webpack*.config.js`: minimal `ModuleFederationPlugin` configs (for example, `exposes: { './A': './src/A.js' }`) used as test input, without applications, HTML entries or own builds. | context |
| Documentation | `README.md:7–32`: tool motivation and rules; `README.md:247`, `:298`: CI and Angular project usage examples. | weak |
| Source code (boundaries) | There are no frontend units; `src/` imports are internal to the tool. | context |

## Authorship and history

Non-shallow, partial clone (`blob:none`). There are 10 commits (10 across all refs), no merge, all by `Jean Carvalho <jean.carvalho@timwetech.com>` as author and committer, from 2026-05-10 (`6a20f72`, “first commit”) to 2026-07-25 (the SHA, “update read”). `git rev-list --objects $SHA --missing=print` lists 46 missing objects, none in the SHA tree. No historical blob was read.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | No frontend unit: the repository is a CLI linter (`package.json:2–30`; `src/core/extractor.ts:1–20`). The `ModuleFederationPlugin` configs are test fixtures (`tests/fixtures/multi-plugin/webpack.config.js:1–22`). |
| Q2 | No | There are no units. |
| Q3 | No | There is no host, shell or root config. |
| Q4 | No | No composition mechanism connecting units; the tool only analyzes configurations. |
| Q5 | No | Q1–Q4 converge. |

## Rationale

- `Non-MFE` under the rule “at least one question is No”.
- It matches “MFE frameworks and libraries (e.g., single-spa itself, federation plugins)”: supporting tool for Module Federation architectures.
- Same categorization as 204 (single-spa devtools) and 304 (micro-frontend messaging library), both drafts.
- `repo_type: library`, `frontend_units: 0`, `unit_organization: none`, empty technology arrays (the tool is Node/TypeScript, without UI).
- There is no open decision.

## Analysis notes

- **RQ1 (misleading signals):** test fixtures with `ModuleFederationPlugin` (`tests/fixtures/`) would generate false positives in code searches for federation configuration; the README and `package.json` are entirely about Module Federation.
- **Protocol (search):** all three hits have literal spelling in the README. Eligibility remains `unknown` in both rounds.
