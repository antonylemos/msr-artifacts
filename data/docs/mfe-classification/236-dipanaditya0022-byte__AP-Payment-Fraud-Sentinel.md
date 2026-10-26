---
schema: 1
id: 1346779318
full_name: dipanaditya0022-byte/AP-Payment-Fraud-Sentinel
url: https://github.com/dipanaditya0022-byte/AP-Payment-Fraud-Sentinel
commit: fddf46aedffeee183826d1d07a5f7e0c28561900
classification: Non-MFE
checklist: { q1: no, q2: yes, q3: undetermined, q4: undetermined, q5: no }
repo_type: example
approaches: []
ui_technologies: [react]
build_tools: [rsbuild]
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 236 — dipanaditya0022-byte/AP-Payment-Fraud-Sentinel

## Context

“AP Payment Fraud Sentinel”: RocketRide hackathon project (`README.md:6`, `89–99`). It has a Python payment fraud risk and investigation engine (`app/`), a RocketRide pipeline (`pipelines/fraud_sentinel.pipe`) and a React UI in `apps/ap-payment-fraud-sentinel-ui/`.

The UI is a “RocketRide app” (`apps/ap-payment-fraud-sentinel-ui/package.json:5–20`). It is built as a Module Federation remote exposing `./AppDescriptor` to the RocketRide platform shell (`rsbuild.config.mts:12–48`; `src/AppDescriptor.ts:6–27`). Configuration and entry files have the header “Copyright (c) 2026 Aparavi Software AG” (`rsbuild.config.mts:1–4`), indicating the platform’s App Builder scaffold (`apps/ap-payment-fraud-sentinel-ui/README.md:9–13`). The shell is not in the repository. The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:237` records rank 236, ID 1346779318, status `cloned`, branch `main` and the front matter commit, which is the HEAD of the clone and of `origin/main`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. There was no installation, build, execution or network access.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:237` records strategy `technology` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID appears in `data/discovery/mfe-round-001/candidates.csv:36092` (`unknown`) and `data/discovery/mfe-round-002/candidates.csv:36099` (`pass`).

A `sqlite3 -readonly` query against tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns the same hit in each round, from endpoint `code`:

| Query (`q`) | Subquery / effective query | `path` | Collection 001 / 002 (UTC) |
|---|---|---|---|
| `technology-module-federation-package-code`: `"@module-federation" filename:package.json` | `technology-module-federation-package-code#size:1000..1149` / `"@module-federation" filename:package.json size:1000..1149` | `apps/ap-payment-fraud-sentinel-ui/package.json` | 2026-10-07T18:41:50.721Z / 2026-10-08T15:39:47.769Z |

The file has 1.118 bytes at the SHA, within the range, and declares `"@module-federation/rsbuild-plugin": "2.5.1"` (`:31`). Code hit metadata is empty. Entry is through code only; the README mentions neither micro-frontends nor Module Federation.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 44 entries, all regular files `100644`; zero symlinks and zero gitlinks. These are the Python backend in `app/` (with tests), `pipelines/fraud_sentinel.pipe`, `data/input/` and a single UI application in `apps/ap-payment-fraud-sentinel-ui/`. | context |
| Configuration (remote) | `apps/ap-payment-fraud-sentinel-ui/rsbuild.config.mts:12`: “Module Federation remote: the shell loads ./AppDescriptor at runtime.” `:19–48`: `pluginModuleFederation({ name: moduleId, filename: 'remoteEntry.js', exposes: { './AppDescriptor': './src/AppDescriptor.ts' }, runtime: false, shareStrategy: 'loaded-first', shared: react, react-dom, 'shell', 'rocketride' })`. The comment at `:24–26` says the federation runtime is provided by the host (“the shell”). | strong |
| Platform contract | `package.json:7–20`: `appManifest` with `id`, `publisher`, `projectId` and store categories. `src/AppDescriptor.ts:6–27`: “the one module this app exposes to the RocketRide shell”. `ap-payment-fraud-sentinel.rrapp:1–3`: App Builder file. Singletons `shell` and `rocketride` (`rsbuild.config.mts:38–41`) are platform packages. | strong |
| Host | The RocketRide shell belongs to the platform (third party) and is not in the snapshot. No other frontend unit of the project is referenced. | contrary |
| Source code (boundaries) | `src/App.tsx:10–18`: imports only local components and data; no `../..` in `apps/`. | context |

## Authorship and history

Non-shallow clone; 12 commits, 1 merge (`6f01561`), all on 2026-08-26. There are 9 by Aditya (local machine email) and 3 by Shivadarshan-HM (institutional email). The root is `865bda7` (“chore: initialize AP Payment Fraud Sentinel”); `dbbca69` (Shivadarshan-HM) adds the frontend; SHA `fddf46a` (“Integrate frontend with backend API”) is HEAD of `main`. Branch `origin/frontend-dashboard` has 2 commits beyond `main` and was not considered. No historical blob was read and there was no missing object.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | A single frontend unit; the federation configuration has only `exposes`, without referencing another project unit. |
| Q2 | Yes | The UI has its own entry point, build and port (`package.json:21–25`; `rsbuild.config.mts:64`, `78–79`). |
| Q3 | Undetermined | The host is the RocketRide platform shell, not observable (`src/AppDescriptor.ts:7–9`). |
| Q4 | Undetermined | Mechanism prepared on the remote side; connection is made by the platform. |
| Q5 | No | Extension of a third-party platform loaded by its shell, not part of an application decomposed by the author. |

## Rationale

- `Non-MFE` under final precedent 037: under the literal checklist it would be MFE-unit (MF remote prepared for an external host), but the host is a third-party platform UI and MF is its official extension mechanism. The vector is that of 037 (`q1: no`, `q2: yes`, `q3/q4: undetermined`, `q5: no`).
- It differs from drafts 161/189/222, in which the platform belonged to the owner’s own organization (`review`). Here the platform is third-party (Aparavi/RocketRide), and the configuration comes from its scaffold, as in the generator case (075/081/094/105).
- `approaches: []` (as in 037), `ui_technologies: [react]`, `build_tools: [rsbuild]`, `frontend_units: 1`, `unit_organization: single-unit`, `repo_type: example` (hackathon project with demonstration data in `src/mockData.ts`).
- There is no open decision.

## Analysis notes

- **RQ1 (misleading signals):** the RocketRide app scaffold uses Module Federation as a plugin mechanism; hackathon repositories on this platform match code search for `@module-federation`.
- **Protocol (search):** entry only through code search in the UI `package.json`. Eligibility changes from `unknown` (001) to `pass` (002).
