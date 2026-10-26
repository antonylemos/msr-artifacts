---
schema: 1
id: 1001914825
full_name: Kyrie112/ceph_cls_dev
url: https://github.com/Kyrie112/ceph_cls_dev
commit: 30bf0d825d417ba4687e547838f2740bab5e636b
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: production
approaches: []
ui_technologies: [angular]
build_tools: [webpack]
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 354 — Kyrie112/ceph_cls_dev

## Context

Copy, with complete history, of the Ceph storage system (C++, Python), without a declared fork. At the SHA, default branch `main` HEAD is an upstream merge from 2025-07-22. The only frontend is Ceph Dashboard (`src/pybind/mgr/dashboard/frontend/`), an Angular application in Nx. Since `a0dd52fe10` (2025-05-04, “mgr/dashboard: set up dashboard as a app shell”), it is configured as an Nx Module Federation host with `remotes: []` and an empty runtime manifest. Repository owner commits exist only on a separate branch (`origin/ndp_dev`), outside the snapshot. The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:355` records rank 354, ID 1001914825, status `cloned`, branch `main` and the front matter commit, which is the HEAD of the clone and of `origin/main`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. There was no installation, build, execution or network access.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:355` records strategy `technology` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID appears in `data/discovery/mfe-round-001/candidates.csv:15142` (`unknown`) and `data/discovery/mfe-round-002/candidates.csv:15146` (`pass`).

A `sqlite3 -readonly` query against tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns a single hit in each round. It comes from endpoint `code`, query `technology-module-federation-package-code` (`"@module-federation" filename:package.json`), subquery `…#size:6000..9999`, `path` `src/pybind/mgr/dashboard/frontend/package.json`. Collections are 2026-10-07T21:13:13.263Z (001) and 2026-10-08T15:44:19.145Z (002).

The file has 6.090 bytes at the SHA and declares `"@module-federation/enhanced": "^0.9.0"` and `"@nx/module-federation": "20.8.1"` (`package.json:105–106`). Code hit metadata has no description, topics or dates. Entry is through code only.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 13.605 entries, 11.195 regular files `100644`, 682 executables `100755`, 1.701 symlinks `120000` and 27 gitlinks `160000` (Ceph project submodules, for example `ceph-erasure-code-corpus`, `ceph-object-corpus` and `src/BLAKE3`). Gitlinks are backend dependencies, not frontend units. The only frontend is `src/pybind/mgr/dashboard/frontend/`. | context |
| MF configuration | `src/pybind/mgr/dashboard/frontend/module-federation.config.ts:3–18`: `name: 'ceph-dashboard'`, `remotes: []`, with only example comments. `webpack.config.ts:1–9` and `webpack.prod.config.ts:9–24`: `withModuleFederation(config)`, with production remotes only in a comment. `project.json:181`: `@nx/angular:module-federation-dev-server`. | contrary |
| Runtime | `src/main.ts:1–10`: loads `/assets/module-federation.manifest.json` and calls `setRemoteDefinitions` before `bootstrap`. `src/assets/module-federation.manifest.json`: `{}`, without defined remotes. | contrary |
| Consumption | `git grep` for `loadRemote` and `remotes` in dashboard `src/`: no remote module loading. | absent |

## Authorship and history

Non-shallow clone:
- **SHA history:** 155.018 commits, 38.172 merges, from 2001-04-29 (`7091d44931`) to 2025-07-22, all upstream. Largest authors are Sage Weil and Kefu Chai.
- **Refs:** 161.963 commits and 40.386 merges across all refs, with several `dependabot-*` branches.
- **Owner:** the 8 commits by `Kyrie112` are on branch `origin/ndp_dev` (for example, `a5dc1135c7`, 2025-11-03), outside the snapshot.

No historical blob was read and there was no missing object.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | A single frontend unit (Ceph Dashboard); no referenced remote unit (`remotes: []`, manifest `{}`). |
| Q2 | No | Without two units, there is no independence to assess. |
| Q3 | No | The dashboard is prepared as a shell, but loads or mounts no unit. |
| Q4 | No | Federation configured without remotes or consumption: “A declared dependency alone is No”. |
| Q5 | No | Q1–Q4 are No: single frontend with prepared but unused federation. |

## Rationale

- `Non-MFE` under the rule “at least one question is No”. It matches “MFE-related dependencies that are unused or experimental”: the Nx MF host exists without any remote.
- Unlike 097, configuration is executable here. Still, it connects no units, so Q4 is No, not Undetermined.
- **Fields:**
  - `frontend_units: 1`, `unit_organization: single-unit`, `approaches: []`;
  - `ui_technologies: [angular]`, `build_tools: [webpack]` (Nx with `withModuleFederation` over webpack);
  - `repo_type: production` (Ceph production software).
- There is no open decision.

## Analysis notes

- **RQ2:** Ceph Dashboard adopted the Nx MF app shell pattern, with a runtime manifest ready to receive remotes. In the snapshot, this is architectural preparation, not composition.
- **Protocol (sample):** complete upstream project copy, with owner work on a non-default branch.
- **Protocol (search):** entry through code only, through a declared dependency. Eligibility changes from `unknown` (001) to `pass` (002).
