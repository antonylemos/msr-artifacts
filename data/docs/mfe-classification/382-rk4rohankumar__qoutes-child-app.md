---
schema: 1
id: 927288121
full_name: rk4rohankumar/qoutes-child-app
url: https://github.com/rk4rohankumar/qoutes-child-app
commit: 18edcd7d2f1cf9ce988870c19cefabef4bd1f49a
classification: MFE-unit
checklist: { q1: no, q2: yes, q3: undetermined, q4: undetermined, q5: no }
repo_type: example
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

# 382 — rk4rohankumar/qoutes-child-app

## Context

React remote (CRA + CRACO) with webpack Module Federation exposing a quotes app, consumed by a shell in another repository, `rk4rohankumar/micro-frontend-host` (`README.md:1–6`), absent from this snapshot. It also runs standalone and has its own Vercel deployment (`README.md:27`). The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:383` records rank 382, ID 927288121, status `cloned`, branch `main` and the front matter commit, which is the HEAD of the clone and of `origin/main`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. There was no installation, build, execution or network access.

## Sample provenance

The candidate is a cloning **replacement**: `clones.csv:383` has `replaces = 1018045713`, corresponding to rank 364 (`chinhtq/microfrontend-angular`, `data/samples/mfe-sample-001/sample.csv:365`), whose clone failed (`clones.csv:365`, status `failed`). Thus the ID is not in `sample.csv` (380 data rows, `manifest.json:23`, `size: 380`) and comes from the next position in the deterministic ranking: `data/samples/mfe-sample-001/ranking.csv:383` (rank 382, strategies `terminology;technology`, eligibility `pass`). The sample comes from round 002 (`manifest.json:2–5`). The ID appears in `data/discovery/mfe-round-001/candidates.csv:11652` and `data/discovery/mfe-round-002/candidates.csv:11657`, both with `terminology;technology` and `pass`.

A `sqlite3 -readonly` query against tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns the same three hits in each round, from endpoint `repositories`, subquery `…#created:2025-02` and an empty `path`:

| Query (`q`) | Collection 001 / 002 (UTC) |
|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | 2026-10-07T22:20:16.030Z / 2026-10-08T15:53:42.347Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | 2026-10-07T22:51:32.207Z / 2026-10-08T16:05:16.826Z |
| `technology-module-federation-repositories`: `"module federation" in:name,description,readme` | 2026-10-07T23:16:49.435Z / 2026-10-08T16:13:52.773Z |

The effective queries append `pushed:>=2025-04-01 created:2025-02-01..2025-02-28`. Hit metadata: null description, no topics, language JavaScript, no license, `fork: false`, size 197, created at 2025-02-04T18:01:05Z, pushed at 2026-10-02T04:35:25Z, Vercel homepage.

README match: “Micro Frontend” in `README.md:1` (“# Quotes · Micro Frontend remote”) and “Module Federation” in `README.md:5`; plural “micro frontends” does not appear literally (only “micro-frontend-host”, `README.md:6`), and this hit depends on GitHub search text processing, which is not recorded. The last README change is SHA `18edcd7` itself (2026-10-02), before the collections on October 7 and 8, 2026; it does not postdate the searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 19 entries, all regular files `100644`; zero symlinks and zero gitlinks. A single app (one `package.json`, `public/index.html`, `src/`). | contrary |
| Configuration (remote) | `craco.config.js:15–27`: `ModuleFederationPlugin` with `name: 'QuotesApp'`, `filename: 'remoteEntry.js'`, `exposes: { './QuotesApp': './src/App' }` and React, ReactDOM, framer-motion and axios shared as singletons; no `remotes`. `:10–12`: `publicPath: 'auto'` in production. `package.json:21–26`: scripts `craco start/build`. | moderate |
| Source code | `src/index.js:1–3`: asynchronous boundary `import('./bootstrap')`; `src/bootstrap.js:6–14`: standalone mounting in `#root`; `src/App.js` (exposed component) imports only local components and hooks. | moderate |
| Composition (external host) | No host in the repository. `README.md:6`, `37–38`: shell `micro-frontend-host` injects `remoteEntry.js`, initializes the container and obtains `./QuotesApp`. The account has the shell and eight other `*-child-app` in the rounds (`data/discovery/mfe-round-002/candidates.csv:11648`, `11650–11658`, with shell in `:11658`), outside the sample and not inspected. | absent |
| Build/deploy | `README.md:27`, `34`: own deployment at `qoutes-child-app.vercel.app`, with `remoteEntry.js` published. | moderate |
| Source code (boundaries) | Search for `../` in `src/`: no occurrence. There is a single unit. | context |

## Authorship and history

Non-shallow, partial clone (`blob:none`). 5 commits (5 across all refs), no merge, by the same owner with two identities (`rohan` and `Rohan Kumar`, same email), from 2025-02-04 (`2f5409d`, “initial setup of qoute repo for micro frontend”) to 2026-10-02 (SHA `18edcd7`, “feat: shell-ready remote — singleton shared, async bootstrap, a11y names (#1)”, through the web interface). Federation configuration exists since the initial commit. `git rev-list --objects $SHA --missing=print` identifies 20 missing historical objects; cited SHA files were read.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | A single unit; composition configuration has only `exposes` (`craco.config.js:18–20`). |
| Q2 | Yes | For the unit: own entry, build and deployment (`craco.config.js`; `package.json:21–26`; Vercel). |
| Q3 | Undetermined | The shell is not in the repository (`README.md:6`). |
| Q4 | Undetermined | Remote side configured (`exposes`, `remoteEntry.js`, `publicPath: 'auto'`, singletons); the consumer is not observable. |
| Q5 | No | Unit prepared for composition by an external host, not an MFE instance in the repository. |

## Rationale

- `MFE-unit` under the rule “a single frontend unit explicitly prepared to be composed by an external host (e.g., Module Federation `exposes`)… but the composing host is not observable”, as in finals 001 and 050.
- It matches “repositories containing only a remote unit, without the composing host”. The remote exposes the entire app, not utilities (contrast with 089/100).
- `approaches: [module-federation]`, `ui_technologies: [react]`, `build_tools: [webpack]` (CRA/CRACO), `frontend_units: 1`, `unit_organization: single-unit`, `repo_type: example`.
- There is no open decision.

## Analysis notes

- **Protocol (replacement):** candidate entered as a replacement for rank 364, whose clone failed; it comes from `ranking.csv:383`, not `sample.csv`.
- **Protocol (multi-repository ecosystem):** shell (`micro-frontend-host`) and nine remotes from the same account are in the rounds; family analysis could observe complete composition.
- **RQ2:** webpack MF remote with `publicPath: 'auto'` only in production and an asynchronous boundary to negotiate singletons.
