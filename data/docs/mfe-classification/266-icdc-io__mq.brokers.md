---
schema: 1
id: 1213410215
full_name: icdc-io/mq.brokers
url: https://github.com/icdc-io/mq.brokers
commit: 87574f05c589403aaee7df91656b4c93f5132da7
classification: MFE-unit
checklist: { q1: no, q2: yes, q3: undetermined, q4: undetermined, q5: no }
repo_type: production
approaches: [module-federation]
ui_technologies: [react]
build_tools: [rsbuild]
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 266 — icdc-io/mq.brokers

## Context

Remote React + Rsbuild application with Module Federation for managing message queue *brokers*. Exposes `./brokers` and consumes components, hooks and store from a host named `container` (“Chrome Host application”, `README.md:1–6`, `45–49`). The README warns the application “cannot run independently” (`README.md:47`). The host is not in this repository. Repository and organization names are not used as evidence.

`data/samples/mfe-sample-001/clones.csv:267` records rank 266, ID 1213410215, status `cloned`, branch `master` and the front matter commit, which is the HEAD of the clone and of `origin/master`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. There was no installation, build, execution or network access.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:267` records strategies `terminology;technology` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID appears in `data/discovery/mfe-round-001/candidates.csv:28606` (`unknown`) and `data/discovery/mfe-round-002/candidates.csv:28612` (`pass`).

A `sqlite3 -readonly` query against tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns the same three hits in each round, from endpoint `repositories`, with subquery `…#created:2026-04` and an empty `path`:

| Query (`q`) | Collection 001 / 002 (UTC) |
|---|---|
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | 2026-10-07T20:52:29.002Z / 2026-10-08T15:42:17.890Z |
| `terminology-microfrontends-repositories`: `microfrontends in:name,description,readme` | 2026-10-07T22:12:31.008Z / 2026-10-08T15:49:40.260Z |
| `technology-module-federation-repositories`: `"module federation" in:name,description,readme` | 2026-10-07T23:25:04.169Z / 2026-10-08T16:17:43.049Z |

The effective queries append `pushed:>=2025-04-01 created:2026-04-01..2026-04-30`.

Hit metadata:
- description “mFE for Brokers app in MessageQueue service”, no topics, language JavaScript, `fork: false`, size 528;
- created on GitHub at 2026-04-17T10:54:38Z, pushed at 2026-07-07T07:38:24Z.

Spellings in the README:
- “microfrontend”: `README.md:3` (“The **Brokers** microfrontend is part of the **Message Queue** application group.”); also `README.md:25`, as “Microfrontend integration”;
- “Microfrontends”: `README.md:35`, first table column;
- “Module Federation”: `README.md:4`, `25` and `35`.

File `README.md` was added in initial commit `e4f026e` (2024-04-23), without substantive content, and current content (with microfrontend and Module Federation mentions) was written in `846ceb3` (2025-11-04), unchanged through the SHA. It predates the October 2026 collections, so the README at the SHA does not postdate the searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 68 entries, 67 regular files `100644` and 1 executable `100755` (`src/utils/search.js`); zero symlinks and zero gitlinks. A single application: `package.json`, `rsbuild.config.mjs`, `modulefederation.config.js`, `public/i18n.json` and `src/` with pages, components, queries and styles. | context |
| Remote (exposure) | `modulefederation.config.js:3–8`: `name: "mq_brokers"`, `filename: "remoteEntry.js"`, `exposes: { "./brokers": "./src/brokers.jsx" }`. `src/brokers.jsx:11–33`: component with internal routes (`<Routes>`), without `BrowserRouter`, presupposing external routing. | strong |
| Host consumption | `modulefederation.config.js:9–14`: remote `container` at `host@http://localhost:8000/general.js` (development) or `host@/general.js`. `:15–36`: `react`, `react-router-dom`, `react-i18next` and `@tanstack/react-query` as singletons. 30 files in `src/` import `container/*` modules, such as `container/Api`, `Button`, `Form`, `Loader` and `ReduxActions` (for example, `src/pages/BrokersList.jsx:2–9`). | strong |
| Build | `rsbuild.config.mjs:1`, `22–33`: `ModuleFederationPlugin` from `@module-federation/enhanced/rspack` applied with `mfConfig(envMode)`; port 8044 (`:12–14`). `package.json:20–23`, `29–35`: Rsbuild dependencies and scripts. | strong |
| Source code (boundaries) | Relative imports remain inside `src/`: the deepest is `../../`, from `src/components/BrokerForm/`. There is no `../../../` or paths outside the repository. What comes from the host arrives through `container/*` (federation), not file paths. | context |
| Documentation | `README.md:6`, `13`, `24`, `36–40`, `45–49`: host integration, consumption of host UI and hooks and inability to run alone. | moderate |

## Authorship and history

Non-shallow clone:
- **Commits:** 45 across all refs, 14 of them merges, from 2024-04-23 (`e4f026e`, “Initial Commit”) to 2026-07-07 (SHA `87574f0`, “Merge branch 'dev' into 'master'”).
- **Authors:** names Dzmitry Valashchuk (19 commits, plus 12 recorded only by email), Pavel Kazlou (12, in three spellings), Dzmitry Sakovich (1) and Daniil Satsura (1). All use the same corporate email domain.
- **Origin:** `package.json:7–8` points to its own GitLab and there is `.gitlab-ci.yml` (Biome and Gitleaks). History predates GitHub creation, consistent with mirroring.
- **Federation:** `modulefederation.config.js` exists since `9c3e6d6` (2025-01-29).

Only branch `master` exists. No historical blob was read. The clone is partial (`blob:none`) and `git rev-list --objects $SHA --missing=print` enumerates 189 missing historical objects; the SHA files were read.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | A single frontend unit. Host `container` is referenced (`modulefederation.config.js:9–14`), but is not in the repository. |
| Q2 | Yes | Unit with its own build (Rsbuild + `ModuleFederationPlugin`) and `remoteEntry.js`; no file-path import outside the repository. |
| Q3 | Undetermined | The host composing the remote is not observable. |
| Q4 | Undetermined | The unit is prepared for composition (`exposes`), but composition is not observable in the snapshot. |
| Q5 | No | MFE-unit exception vector: only the remote unit, without the host. |

## Rationale

- `MFE-unit`: “repositories containing only a remote unit, without the composing host”, with Module Federation `exposes`. Same vector as finals 001 and 050.
- **Host dependency:** the remote also consumes modules exposed by the host (`container/*`). This is bidirectional federation, not source code sharing as in 089/100, and does not change the class.
- **Organization:** other repositories from the same organization appear in the rounds, including `icdc-io/cloud.chrome` and several `*.*` services (`data/discovery/mfe-round-002/candidates.csv`). Only this one is in the sample; others were not inspected. This is not a third-party platform (102/074/080): the host belongs to the same organization.
- **Fields:** `approaches: [module-federation]`, `ui_technologies: [react]`, `build_tools: [rsbuild]` (as in 029), `frontend_units: 1`, `unit_organization: single-unit`. `repo_type: production`: real service application, with CI, history spanning more than two years and multiple authors.
- There is no open decision.

## Analysis notes

- **RQ2:** Rsbuild remote with `@module-federation/enhanced/rspack` exposing a route subtree and consuming the host UI library, API client, Redux store and utilities (`container/*`). Dependency is bidirectional between host and remote.
- **Protocol (sample):** the same organization has 34 candidates in round 002; only this one entered the sample.
- **Protocol (search):** all three spellings appear literally in the README. Eligibility changes from `unknown` (001) to `pass` (002).
- **Independent review contribution (Lupa):** agreement with MFE-unit and vector No/Yes/Undetermined/Undetermined/No, `module-federation`, React/Rsbuild, one unit and `single-unit`, without an open decision (`draft`). Adopted corrections: file `README.md` entered in `e4f026e` and current content in `846ceb3`; the `shared` range is `modulefederation.config.js:15–36`; and the missing object list (189, verified) replaces the completeness claim, contrary to the review report stating the clone was complete. The reviewer recommended promotion to final, but promotion belongs to the researcher.
