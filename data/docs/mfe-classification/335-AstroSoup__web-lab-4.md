---
schema: 1
id: 1105927418
full_name: AstroSoup/web-lab-4
url: https://github.com/AstroSoup/web-lab-4
commit: 2214561f8c9cb333f1849a0f1d04ec7ab36220cb
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
approaches: [module-federation]
ui_technologies: [vue]
build_tools: [vite]
frontend_units: 3
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 335 — AstroSoup/web-lab-4

## Context

Lab assignment for a web course (the first service is “mostly refactored code from third lab”, commit `d4f78cf`): three Java microservices (`backend/authService`, `backend/geometryService`, `backend/authMessageBroker`) and a Vue/Vite frontend split into host (`frontend/vite/host/`) and two remotes (`remote-inputs/`, `remote-results/`) with `@module-federation/vite`, served by nginx publishing everything under `https://localhost`. The README has only the title (`README.md:1`). The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:336` records rank 335, ID 1105927418, status `cloned`, branch `main` and the front matter commit, which is the HEAD of the clone and of `origin/main`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. There was no installation, build, execution or network access.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:336` records strategy `technology` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID appears in `data/discovery/mfe-round-001/candidates.csv:21584` (`technology`, `unknown`, rule `recent-human-commit` with `activity_incomplete`) and `data/discovery/mfe-round-002/candidates.csv:21590` (`technology`, `pass`).

A `sqlite3 -readonly` query against tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns the same three hits in each round, all from endpoint `code` and query `technology-module-federation-package-code` (`"@module-federation" filename:package.json`):

| Subquery | `path` | Collection 001 / 002 (UTC) |
|---|---|---|
| `…#size:300..399` | `frontend/vite/remote-inputs/package.json` | 2026-10-07T18:18:51.057Z / 2026-10-08T15:34:35.243Z |
| `…#size:300..399` | `frontend/vite/remote-results/package.json` | 2026-10-07T18:18:51.057Z / 2026-10-08T15:34:35.243Z |
| `…#size:400..499` | `frontend/vite/host/package.json` | 2026-10-07T18:19:19.038Z / 2026-10-08T15:34:58.705Z |

The matched files declare `"@module-federation/vite": "latest"` (`frontend/vite/host/package.json:17`; `frontend/vite/remote-inputs/package.json:16`; `frontend/vite/remote-results/package.json:16`) and have 413, 385 and 385 bytes at the SHA, within the ranges. Candidate metadata records only `description: null` and `fork: false`. The match does not depend on the README, containing only the title; the README comes from root commit `4441231` (2025-11-28) and does not postdate the October 2026 searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 152 entries, 148 regular files `100644` and 4 executables `100755` (`gradlew` and `config/prometheus/prometheus.yml`); zero symlinks and zero gitlinks. Three frontend projects with their own `package.json`, `vite.config.js`, `index.html` and `src/`, three Gradle services and `config/` (compose, nginx, Dockerfiles). `config/frontend/Dockerfile` is empty (0 bytes). | strong |
| Configuration (host) | `frontend/vite/host/vite.config.js:13–38`: `federation` with `name: 'host'`, `remotes` `remote_inputs` → `https://localhost/remote-inputs/remoteEntry.js` and `remote_results` → `https://localhost/remote-results/remoteEntry.js` (`type: "module"`), `exposes` of three Pinia stores and `PopupWindow`, and singleton `shared` Vue/Pinia. | strong |
| Configuration (remotes) | `frontend/vite/remote-inputs/vite.config.js:6–30`: `base: '/remote-inputs/'`, port 3001, `name: 'remote_inputs'`, `exposes: { "./InputsContainer" }` and remote `host` → `https://localhost/remoteEntry.js`. `frontend/vite/remote-results/vite.config.js:6–30`: same pattern with `/remote-results/`, port 3002, `name: 'remote_results'`, `exposes: { "./ResultsContainer" }`. | strong |
| Source code (composition) | `frontend/vite/host/src/pages/MainPage.vue:6–7`, `11`, `23–24`: imports `remote_inputs/InputsContainer` and `remote_results/ResultsContainer` and renders them at route `/app` (`frontend/vite/host/src/main.js:14`). Remotes consume stores exposed by the host: `remote-inputs/src/InputsContainer.vue:5–6`, `remote-inputs/src/elements/GraphCanvas.vue:2–3`, `remote-results/src/elements/GroupInput.vue:3–4`, `remote-results/src/elements/Table.vue:2` (`host/HistoryStore`, `host/ErrorStore`, `host/PopupWindow`). | strong |
| Build/deploy | `config/nginx/nginx.conf:18–71`: one server per unit (3000 host, 3001 and 3002 remotes) with CORS; `:73–103`: TLS server publishing host at `/` and remotes at `/remote-inputs/` and `/remote-results/`, consistent with `remotes` URLs and remote `base`. `config/nginx/Dockerfile:5–7`: copies three separate `dist`. `config/docker-compose.yaml:38–52`: a single nginx container. | moderate |
| Source code (boundaries) | Search for `../` in frontend `*.js` and `*.vue`: only internal host imports (`host/src/common/Header.vue:3–4`, `host/src/pages/MainPage.vue:3–4`, `host/src/pages/StartPage.vue:2–3`) and an asset (`host/src/common/Footer.vue:38`). No source code import between `host`, `remote-inputs` and `remote-results`; mutual dependency uses only federated modules. | strong |

## Authorship and history

Non-shallow, partial clone (`blob:none`). 29 reachable commits (29 across all refs), 1 merge, from 2025-11-28 (`4441231`, “Initial commit”) to 2025-12-08 (SHA `2214561`, “cleanup x2.”); remote ref `feat/authMessageBrocker` was not considered separately. Authorship: `Semyon <1234snsks@gmail.com>` in all commits (27 local, 2 through the web interface). Remote federation configuration appears in `53e46c0` (2025-12-05, “working frontend build.”) and deployment in `f5cb3ef` (2025-12-08, “Deploy configs for frontend.”). `git rev-list --objects $SHA --missing=print` identifies 79 missing historical objects; cited SHA files were read.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | Yes | `host`, `remote-inputs` and `remote-results`, referenced by composition configuration (`frontend/vite/host/vite.config.js:22–33`). |
| Q2 | Yes | Own entry point, `vite.config.js`, port and `dist` per unit (`config/nginx/Dockerfile:5–7`); no source code import between them, only federated specifiers. |
| Q3 | Yes | The host mounts both remotes on page `/app` (`MainPage.vue:23–24`; `main.js:14`). |
| Q4 | Yes | Module Federation configured on both sides, with names, exposed keys and URLs consistent with nginx routing (`host/vite.config.js:22–33` × `remote-*/vite.config.js:6`, `14–18`; `nginx.conf:90–103`), and consumed through federated imports. |
| Q5 | Yes | Q1–Q4 converge. |

## Rationale

- Q1–Q5 are Yes, satisfying the `MFE-implemented` rule. It matches “monorepos containing a host and its remotes” and “examples… that actually compose frontend units” (`repo_type: example`, lab assignment).
- The chain is complete and connectable in both directions, without name, route or exposed key mismatch (contrast with 097/103/104); comparable to complete-chain cases (076/084/096/106/109).
- Remotes expose screen panels (data input with canvas and results table), not utilities; sharing host Pinia stores is part of the contract, not federation’s only use (contrast with 089/100).
- `frontend_units: 3`, `unit_organization: monorepo`, `approaches: [module-federation]`, `ui_technologies: [vue]`, `build_tools: [vite]`.
- There is no open decision.

## Analysis notes

- **RQ2:** `@module-federation/vite` with bidirectional federation: the host consumes remotes and also exposes its Pinia stores and a component, imported by remotes as `host/...`; Vue and Pinia shared as singletons.
- **RQ3:** state coupling through the host Pinia store shared across all three units; remote `src/main.js` are empty (0 bytes), so remotes do not run independently and depend on the host at runtime.
- **Protocol:** the repository versions a private key at `backend/authService/src/main/resources/META-INF/private_key.pem`, not reproduced here; candidate metadata in the rounds has only `description` and `fork`.
