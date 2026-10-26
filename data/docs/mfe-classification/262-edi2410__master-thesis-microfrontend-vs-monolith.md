---
schema: 1
id: 1223459154
full_name: edi2410/master-thesis-microfrontend-vs-monolith
url: https://github.com/edi2410/master-thesis-microfrontend-vs-monolith
commit: d2b979da2eacd9f7c365c3cb437de43b272b4d15
classification: Uncertain
checklist: { q1: yes, q2: undetermined, q3: undetermined, q4: undetermined, q5: undetermined }
repo_type: other
approaches: [module-federation]
ui_technologies: [react]
build_tools: [webpack]
frontend_units: 7
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 262 — edi2410/master-thesis-microfrontend-vs-monolith

## Context

Root repository of a master’s thesis about migration of the eSUSTAV platform from a React/Vite monolith to Webpack 5 Module Federation in an Nx monorepo (`README.md:1–5`, `13`). The README itself describes it as “thesis root”, referencing the monolith and MFE project as submodules (`README.md:73`, `87–88`).

The snapshot contains only the thesis text (PDF), submitted topic, README and measurement artifacts: build logs and Lighthouse reports. Code for both applications is only in gitlinks, whose commits are not in the clone; submodules were not initialized and their code is declared proprietary (`README.md:194`). The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:263` records rank 262, ID 1223459154, status `cloned`, branch `main` and the front matter commit, which is the HEAD of the clone and of `origin/main`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. Lighthouse JSONs were read in memory from blobs. There was no installation, build, execution, submodule initialization or network access.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:263` records strategies `terminology;technology` and eligibility `unknown`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID appears in `data/discovery/mfe-round-001/candidates.csv:29186` and `data/discovery/mfe-round-002/candidates.csv:29192`, both with `unknown`. Rules record `push_since_threshold` and `activity_incomplete`.

A `sqlite3 -readonly` query against tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns the same five hits in each round, all from endpoint `repositories` and with an empty `path`:

| Query (`q`) | Subquery | Collection 001 / 002 (UTC) |
|---|---|---|
| `terminology-topic-microfrontends`: `topic:microfrontends` | (no partition) | 2026-10-07T18:18:43.496Z / 2026-10-08T15:34:28.993Z |
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | `…#created:2026-04` | 2026-10-07T20:32:59.442Z / 2026-10-08T15:42:01.187Z |
| `terminology-microfrontends-repositories`: `microfrontends in:name,description,readme` | `…#created:2026-04` | 2026-10-07T22:12:18.488Z / 2026-10-08T15:49:34.133Z |
| `technology-topic-module-federation`: `topic:module-federation` | (no partition) | 2026-10-07T23:13:42.957Z / 2026-10-08T16:11:12.560Z |
| `technology-module-federation-repositories`: `"module federation" in:name,description,readme` | `…#created:2026-04` | 2026-10-07T23:25:04.169Z / 2026-10-08T16:17:43.049Z |

The effective queries append `pushed:>=2025-04-01`; partitioned queries also append `created:2026-04-01..2026-04-30`.

Hit metadata:
- description repeats `README.md:5`;
- 14 topics, including `microfrontends`, `module-federation`, `nx-monorepo`, `webpack-5` and `react`;
- null language, `fork: false`, size 3.582;
- created at 2026-04-28T10:47:03Z, pushed at 2026-04-29T13:50:50Z.

Spellings:
- **Topics:** `microfrontends` and `module-federation` are among the topics.
- **`microfrontend`:** present in `README.md:5` (“…Webpack 5 Module Federation microfrontend architecture using an Nx monorepo”) and `README.md:13`, as well as the description.
- **`"module federation"`:** present in `README.md:5`, `13` and `115`, as well as the description.
- **`microfrontends`:** the plural does not appear literally in the README or description. This hit depends on GitHub search text processing, which is not recorded.

The README entered in `6f13ac2` (2026-04-28) and did not change at the SHA, which only changes the PDF. The README predates the October 2026 collections, so the README at the SHA does not postdate the searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 19 entries, 17 regular files `100644`, zero symlinks and two gitlinks `160000`: `dev-esustav-mfe` (`0dc0f71`) and `dev-esustav-public` (`5b8edcc`), declared in `.gitmodules:1–6` with SSH URLs of other author repositories. Gitlink commits are not in the clone (`git cat-file` fails) and directories are empty. There is no `package.json`, build configuration or source code in the snapshot. The two `blog_post_*.md` listed in `README.md:84–85` do not exist in the tree. | context |
| Documentation (architecture) | `README.md:42–52`: shell on 3000 and six remotes (ports 3001–3006), each exposing `./App` through Module Federation. `README.md:128–131`: decisions about `BrowserRouter` only in the shell and `@esustav/shared`, `react`, `react-dom` and `react-router-dom` shared as singletons. This is description, not configuration. | weak |
| Build artifact | `measurements/build_mfe_cold_1.log:2`, `286`: `nx` executes `build` in 8 projects (shared, shell and six remotes). Each remote emits `remoteEntry.js` (`:30`, `109`, `149`, `185`, `224`, `259`), with `webpack 5.105.4` (`:53`). | moderate |
| Runtime artifact | `measurements/lighthouse_mfe_run{1,2,3}.json` (reading the `network-requests` audit): page `http://localhost:5173/` (2026-03-28) requesting `remoteEntry.js` from `localhost:3001` through `3006`, plus chunks from `3006`. `lighthouse_monolith_run1.json` (`localhost:4173`) has no `remoteEntry`. | moderate |
| Procedure | `measurements/measurement_guide.md:546–560`: starts shell (5173) and remotes (3001–3006). `:690–709`: independent deployment through `docker-compose` rebuilding only container `esustav_einfo`. `measurements/baseline_results.md:67–78`, `98–102`: `remoteEntry.js` size per remote and H4 “PASS”. These are author reports about code absent from the snapshot. | weak |

## Authorship and history

Non-shallow clone; 3 linear commits, no merges, all by Edi Graovac:
- `e463915` (2026-04-28, “first commit”): `.gitmodules`, gitlinks, `measurements/` and `topic_description.md`;
- `6f13ac2` (“readme”): README and PDF;
- SHA `d2b979d` (2026-04-29, “readme”): changes only the PDF.

Only branch `main` exists. No submodule object is available. Nothing was fetched; no historical blob was read beyond the SHA tree.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | Yes | The repository references the MFE project through a gitlink (`.gitmodules:4–6`). Artifacts record 7 applications (shell and six remotes) and a shared library (`build_mfe_cold_1.log:2`). |
| Q2 | Undetermined | Separate builds per project (`nx run <app>:build`) and own containers are reported, but unit code and configuration are not in the snapshot to verify separation or imports between units. |
| Q3 | Undetermined | The Lighthouse record shows a page fetching `remoteEntry.js` from the six remotes, but host code is not in the snapshot. |
| Q4 | Undetermined | Module Federation appears in build and network logs, not observable configuration. Under the criterion, “a declared dependency alone is No” and “a configuration whose actual use is unclear is Undetermined”; here there is no configuration in the snapshot, only artifacts. |
| Q5 | Undetermined | No No answer; Q2–Q4 depend on code in unavailable submodules. |

## Rationale

- `Uncertain` under the rule “No question is No, but at least one is Undetermined”, with `status: review`.
- **Comparison:** as in 223 (gitlinks without objects in the clone) and 103 (configuration unresolvable in the snapshot), implementation is outside what can be read. Unlike profiles 011/064/068/073/077/101/111 and content 023/075/081/094/105, however, there are build and runtime artifacts produced by Module Federation composition. It does not reach a complete chain as in 076/084/096/106/109, because none of the configuration is in the snapshot.
- **Fields:** derived from artifacts and description. `approaches: [module-federation]`, `ui_technologies: [react]` (`README.md:62`), `build_tools: [webpack]` (`build_mfe_cold_1.log:26`, `53`), `frontend_units: 7` (shell and six remotes; library `shared` is not counted), `unit_organization: monorepo` (Nx within the MFE submodule, `README.md:61`), `repo_type: other` (thesis root repository with measurement data).

## Analysis notes

- **RQ2:** documented migration from Vite monolith to Module Federation with Nx, shell with single routing and singleton shared package (`README.md:128–131`), with build, Lighthouse and memory measurements (`baseline_results.md:106–117`).
- **Protocol (snapshot):** implementation is in private or proprietary submodules and cannot be read in the snapshot. There is only indirect evidence through measurement artifacts.
- **Protocol (search):** the plural hit has no literal spelling. Eligibility `unknown` in both rounds (`activity_incomplete`).

## Recorded decision

Retained as `Uncertain`. Build logs and network records indicate Module Federation composition, but submodule code and configuration are not available in the snapshot. Indirect evidence does not allow confirming independence, composition and actual configuration use criteria.
