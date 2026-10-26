---
schema: 1
id: 1156567216
full_name: astitvaveergarg/Vision-Ops
url: https://github.com/astitvaveergarg/Vision-Ops
commit: 6c895999a9c3170907d2259aa207ae02b5bcbaef
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: production
approaches: []
ui_technologies: []
build_tools: []
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 320 — astitvaveergarg/Vision-Ops

## Context

ML inference platform (“VisionOps”: object detection with YOLOv8) focused on DevOps/MLOps (repository description). The repository has:
- a FastAPI API (`api/`);
- a single static frontend (`frontend/index.html` + `frontend/app.js`, served by nginx with an API proxy);
- Helm charts, Terraform for three clouds, Kubernetes/ArgoCD and workflows.

The search term results from juxtaposing “…15MB frontend) |” and “| **Orchestration** |” on consecutive lines in the README stack table. The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:321` records rank 320, ID 1156567216, status `cloned`, branch `master` (default) and the front matter commit, which is the HEAD of the clone and of `origin/master`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. There was no installation, build, execution or network access.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:321` records strategy `broader` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID appears in `data/discovery/mfe-round-001/candidates.csv:24828` (`broader`, `unknown`) and `data/discovery/mfe-round-002/candidates.csv:24835` (`broader`, `pass`).

A `sqlite3 -readonly` query against tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns one hit per round, from endpoint `repositories` and with an empty `path`:

| Query (`q`) | Subquery | Effective query | Collection 001 / 002 (UTC) |
|---|---|---|---|
| `broader-frontend-orchestration`: `"frontend orchestration" in:name,description,readme` | `broader-frontend-orchestration#created:2026-Q1` | `"frontend orchestration" in:name,description,readme pushed:>=2025-04-01 created:2026-01-01..2026-03-31` | 2026-10-07T23:42:39.094Z / 2026-10-08T16:24:27.627Z |

Hit metadata (identical in both rounds): description about the ML inference platform, without searched terms; topics `kubernetes`, `mlops`, `observability`, `scalable`; language HCL; `fork: false`; size 2387; created at 2026-02-12T19:50:13Z; pushed at 2026-07-20T18:32:04Z.

**Spelling:** the README at the SHA does not contain phrase “frontend orchestration”.
- The compatible sequence is the end of `README.md:63` (“| **Containerization** | Docker multi-stage builds | Optimised images (4.5GB backend, 15MB frontend) |”) followed by `README.md:64` (“| **Orchestration** | Kubernetes, Helm 3, Helmfile | …”): tokens “frontend” and “Orchestration” become adjacent after punctuation and table markup.
- `README.md:20` (“split frontend/backend Helm charts and Helmfile orchestration”) contains both terms, but not adjacently.

No assertion is made about which passage the API matched, because it does not report a line.

The last README change is `513947c` (2026-07-20T23:35:40+05:30), and the SHA (2026-07-21T00:02:03+05:30, that is, 2026-07-20T18:32:03Z) matches `pushed_at`. Both predate the October 2026 collections, and the README at the SHA does not postdate the searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 125 entries, all regular files `100644`; zero symlinks and zero gitlinks. Folders `api/` (FastAPI), `frontend/` (6 files), `charts/` (api, frontend, infrastructure, monitoring), `terraform/` (gcp, aws, azure), `k8s/`, `environments/`, `docker/`, `docs/` and workflows. There is no `package.json`. | context |
| Source code (frontend) | `frontend/index.html:7–8`: Tailwind and Font Awesome through CDN; `:292`: `<script src="app.js">`. `frontend/app.js:2`: `API_BASE_URL`; `:115`, `:181`, `:322`, `:354`: `fetch` to `/models`, `/detect`, `/stats`, `/health`. A single page consuming the API. | contrary |
| Build/deploy (frontend) | `frontend/Dockerfile:1–19`: nginx image with `index.html` and `app.js`. `frontend/nginx.conf:10–12`, `:15–30`: serves static files and proxies `/api/` to `vision-api:8000`. `charts/frontend/` (Chart, deployment, service, ingress): one Helm release for the frontend. `frontend/server.py:1–15`: alternative FastAPI server to serve the frontend during development. | contrary |
| Documentation | `README.md:20`, `:49–52`, `:79`: frontend/backend separation into distinct charts and nginx proxy; `README.md:62`: frontend “Nginx Alpine, HTML5, Tailwind CSS, Vanilla JS”; `README.md:64`: “Orchestration: Kubernetes, Helm 3, Helmfile”, container orchestration. | context |
| Technology / Configuration / Composition (search) | `git grep -i` at the SHA for `micro.?front`, `federation`, `single.?spa`, `remoteEntry`, `import.?map`, `customElements` and `iframe`: no occurrence. | absent |
| Source code (boundaries) | The frontend has no imports (only `app.js` loaded through `<script>`); there is no other frontend unit to cross into. | context |

## Authorship and history

Non-shallow, partial clone (`blob:none`). There are 30 commits reachable from the SHA (32 across all refs), 10 merges:
- 20 by `astitvaveergarg <av4764@srmist.edu.in>`;
- 10 by `Astitva Veer Garg <91984568+astitvaveergarg@users.noreply.github.com>`, with committer `GitHub` (PR merges).

Records run from 2026-02-13 (`f5fda02`, “First Commit V1.0.0”) to the SHA (2026-07-21, PR #9 merge). Branches `feature/…` and `fix/…` were not considered. `git rev-list --objects $SHA --missing=print` lists 105 missing objects, none in the SHA tree. No historical blob was read.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | A single frontend unit (`frontend/index.html`, `frontend/app.js`); the other piece is a FastAPI API. No frontend composition configuration. |
| Q2 | No | There are not two frontend units to assess. |
| Q3 | No | No host loading units; nginx only serves static files and proxies the API (`frontend/nginx.conf:10–30`). |
| Q4 | No | No frontend composition mechanism; “orchestration” is Kubernetes/Helm (`README.md:64`). |
| Q5 | No | Q1–Q4 converge. |

## Rationale

- `Non-MFE` under the rule “at least one question is No”. It matches “conventional frontend monoliths”: a static frontend with separate backend.
- Frontend/backend separation into Helm releases is not frontend unit composition.
- It is not even a micro-frontends mention case: the hit results from adjacent tokens in distinct stack table rows, like lexical false positives 279 and 312 (drafts).
- `frontend_units: 1`, `single-unit`. `ui_technologies: []`: HTML and vanilla JavaScript with Tailwind through CDN, without a UI framework. `build_tools: []`: no bundler. `repo_type: production`: own domain (`README.md:173`), multicloud Terraform and GitOps.
- There is no open decision.

## Analysis notes

- **RQ1 (misleading signals) / Protocol (search):** query `"frontend orchestration"` matches juxtaposition “frontend) | | **Orchestration**” in a Markdown table (`README.md:63–64`). It is the third case in the series with this pattern (279, 312). Broad phrase queries appear to ignore punctuation and line breaks, generating noise in infrastructure READMEs.
- **Protocol:** eligibility changes from `unknown` (001) to `pass` (002).
