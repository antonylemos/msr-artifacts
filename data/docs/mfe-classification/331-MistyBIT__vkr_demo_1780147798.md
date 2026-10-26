---
schema: 1
id: 1254367910
full_name: MistyBIT/vkr_demo_1780147798
url: https://github.com/MistyBIT/vkr_demo_1780147798
commit: 083c24b16df8aa3543f7792b213036de3389a5ea
classification: MFE-unit
checklist: { q1: no, q2: yes, q3: undetermined, q4: undetermined, q5: no }
repo_type: template
approaches: [module-federation]
ui_technologies: [react]
build_tools: [webpack]
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 331 — MistyBIT/vkr_demo_1780147798

## Context

Repository automatically generated from an “ATM tool” template (description “ATM tool scaffold: vkr_demo_1780147798”; single commit by `ATM Scaffold <atm-scaffold@local>`): a React remote with Webpack Module Federation (`mf/`) and an Express/PostgreSQL microservice (`service/`) returning tool metadata registered in table `tools.tools` (`README.md:1–3`). The host (“host ATM”) is not in the repository; the README describes registering `remoteEntry.js` in that host’s database (`README.md:54–58`). The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:332` records rank 331, ID 1254367910, status `cloned`, branch `main` and the front matter commit, which is the HEAD of the clone and of `origin/main`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. There was no installation, build, execution or network access.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:332` records strategy `technology` and eligibility `unknown`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID appears in `data/discovery/mfe-round-001/candidates.csv:30963` (`technology`, `unknown`, rule `recent-human-commit` with `activity_incomplete`) and `data/discovery/mfe-round-002/candidates.csv:30971` (`technology`, `unknown`, `author_indeterminate`).

A `sqlite3 -readonly` query against tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns one hit per round, from endpoint `repositories`, with an empty `path`:

| Query (`q`) | Subquery | Effective query | Collection 001 / 002 (UTC) |
|---|---|---|---|
| `technology-module-federation-repositories`: `"module federation" in:name,description,readme` | `technology-module-federation-repositories#created:2026-05` | `"module federation" in:name,description,readme pushed:>=2025-04-01 created:2026-05-01..2026-05-31` | 2026-10-07T23:26:24.296Z / 2026-10-08T16:18:08.915Z |

Hit metadata: description “ATM tool scaffold: vkr_demo_1780147798”, no topics, language JavaScript, no license, `fork: false`, size 70, created at 2026-05-30T13:30:00Z, pushed at 2026-05-30T13:30:02Z.

“Module Federation” appears literally in `README.md:3` (“**React + Webpack Module Federation** (микрофронт)”; English translation of the Russian term: “micro-frontend”) and `README.md:58` (“В **Module Federation** имя remote…”; English translation: “In **Module Federation**, the remote name…”). The README arrived in the only commit, the SHA itself (2026-05-30), before the collections on October 7 and 8, 2026; it does not postdate the searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 25 entries, all regular files `100644`; zero symlinks and zero gitlinks. One frontend project (`mf/`: `package.json`, `webpack.config.js`, `src/`, `public/`, `Dockerfile`, `nginx.conf`) and one backend (`service/`), with `docker-compose.yml` at the root. | contrary |
| Configuration (remote) | `mf/webpack.config.js:54–64`: `ModuleFederationPlugin` with `name` from `ATM_TEMPLATE_REMOTE_NAME` (default `remote_template`, `:21–22`), `filename: 'remoteEntry.js'`, `exposes: { './App': './src/App.js' }`, `shared` singleton React/ReactDOM; no `remotes`. `:11–15`, `29`: absolute `publicPath` to load chunks when embedded in another origin; `:31`: `uniqueName: 'atm_remote'`. | moderate |
| Source code | `mf/src/index.js:1` and `mf/src/bootstrap.js:1–14`: asynchronous remote entry point and standalone mounting in `#root`; `mf/src/App.js:9–114`: screen displaying only tool metadata; `mf/src/toolProfileApi.js:1–21`: calls `/v1/tool-profile` on the MF origin, explicitly to work when embedded in the host (comment `:2–5`). | moderate |
| Build/deploy | `mf/Dockerfile:1–30`: MF build and nginx; `mf/nginx.conf:17–21`: CORS `*` to serve `remoteEntry` and chunks to another origin; `docker-compose.yml:16–27`: own service `tool-mf`. | moderate |
| Composition (external host) | No host in the repository. `README.md:54–58`: publish `remoteEntry.js`, write it to the tool’s `frontend_remote_entry` field in the “host ATM” database and align the remote name with `config.ui.remoteKey`. `service/src/db.js:32–37`: reads these fields from `tools.tools`. The remote name remains the template default (`remote_template`), not replaced as the README requests (`README.md:58`). | absent |
| Source code (boundaries) | Search for `../` in `*.js` and `*.json` (except lockfiles): no occurrences. There is only one frontend project; backend consumption uses HTTP. | context |

## Authorship and history

Non-shallow, partial clone (`blob:none`). 1 commit (1 across all refs), no merges: SHA `083c24b` itself (2026-05-30T13:29:59Z, “chore: scaffold tool vkr_demo_1780147798 from ATM template”), author and committer `ATM Scaffold <atm-scaffold@local>`, adding 25 files. Automatic output of a scaffold tool, without a human commit; round 002 records `author_indeterminate`. The same account has dozens of repositories with the same name/description pattern in the rounds (for example, `MistyBIT/atm_template`, `MistyBIT/my_tool`, `MistyBIT/vkr_demo` and `vkr_demo_<número>`, `data/discovery/mfe-round-002/candidates.csv:28789`, `28794`, `30932`, `30936`, `30971`, `31550`; 44 account repositories in round 002); only this one is in the sample (`sample.csv:332`). `git rev-list --objects $SHA --missing=print` identifies no missing objects.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | A single frontend unit; composition configuration has only `exposes` (`mf/webpack.config.js:57–59`) and references no other units. |
| Q2 | Yes | For the unit: own entry point, webpack, Dockerfile and service (`mf/Dockerfile`; `docker-compose.yml:16–27`). |
| Q3 | Undetermined | The ATM host is not observable; the README describes registration only (`README.md:54–58`). |
| Q4 | Undetermined | Remote side configured (`exposes`, `remoteEntry.js`, absolute `publicPath`, CORS); consumer is not observable. |
| Q5 | No | Unit prepared for composition by an external host, not an MFE instance in the repository. |

## Rationale

- Proposed `MFE-unit` with `status: review`: under the literal checklist, “a single frontend unit explicitly prepared to be composed by an external host (e.g., Module Federation `exposes`)… but the composing host is not observable”, as in finals 001 and 050.
- Preparation is explicit and implemented (`exposes`, `remoteEntry.js`, absolute `publicPath`, CORS, API call through the MF origin), not merely mentioned.
- Review is justified by two points depending on researcher judgment (see below): the host is a platform registering tools as remotes, and the repository is unmodified automatic scaffold output.
- `repo_type: template` (generated tool template copy, without customization), `frontend_units: 1`, `unit_organization: single-unit`, `approaches: [module-federation]`, `ui_technologies: [react]`, `build_tools: [webpack]`.

## Analysis notes

- **Protocol (family and duplicates):** the account has dozens of repositories generated by the same scaffold, named by timestamp (`vkr_demo_<número>`, `vkr_profile_…`, `vkr_scale_…`), apparently created in tool test runs; automatic filtering did not group them.
- **RQ2:** Module Federation remote with absolute `publicPath` and own API accessed through the MF origin, to work when embedded in a host on another origin (`mf/webpack.config.js:11–18`; `mf/src/toolProfileApi.js:2–8`).
- **RQ3:** remote registration in the host through a database (`frontend_remote_entry`, `config.ui.remoteKey` in `tools.tools`), not static host configuration.

## Point for joint review

1. **Platform host:** the ATM host registers tools as remotes through a database (`README.md:54–58`). If ATM is treated as a platform using Module Federation as an extension mechanism, the platform plugin rule from final 037 applies and class becomes `Non-MFE`. Whether ATM is a third-party platform or the owner’s own project is not observable in the snapshot (the account has `MistyBIT/atm_template` in the rounds, not inspected).
2. **Unmodified scaffold output:** the repository is an automatic template copy (author `ATM Scaffold`, default remote name `remote_template`). Decide whether a generated and uncustomized unit counts as a prepared unit (`MFE-unit`) or follows generator/template cases (075/081/105; 079/117), leading to `Non-MFE`.

No new rule is proposed; until the decision, preserve `MFE-unit`/`review`.
