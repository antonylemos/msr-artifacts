---
schema: 1
id: 1199584113
full_name: Anurag-2312/NIDS-mini-project
url: https://github.com/Anurag-2312/NIDS-mini-project
commit: a7e65c9712388866c5b7ba3ff1c865a0e967e963
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: other
approaches: []
ui_technologies: [react]
build_tools: [vite]
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 221 — Anurag-2312/NIDS-mini-project

## Context

“Deep Learning Based Intrusion Detection System” (`README.md:1–3`): network intrusion detection system with 2D CNN and OpenMax. Architecture (`README.md:7–17`) has:
- one React frontend (`frontend/`, port 5173);
- FastAPI “Orchestrator” (port 8080), an API gateway (`README.md:70`);
- four backend services: Docker CICFlowMeter, preprocessor, model service and decision engine.

Also training notebooks, trained models, report charts and example PCAPs. Search retrieval comes from proximity between “Frontend” and “Orchestrator” in README diagram, not frontend orchestration. Repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:222` records rank 221, ID 1199584113, status `cloned`, branch `main` and front-matter commit, which is clone HEAD and `origin/main`. Every clone Git command used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. No installation, build, execution or network access occurred.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:222` records strategy `broader` and eligibility `pass`. Sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). ID appears in `data/discovery/mfe-round-001/candidates.csv:27677` (`unknown`) and `data/discovery/mfe-round-002/candidates.csv:27684` (`pass`).

`sqlite3 -readonly` query of tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns same hit in each round, at endpoint `repositories` and with empty `path`:

| Query (`q`) | Subquery / effective query | Collection 001 / 002 (UTC) |
|---|---|---|
| `broader-frontend-orchestration`: `"frontend orchestration" in:name,description,readme` | `broader-frontend-orchestration#created:2026-Q2` / `"frontend orchestration" in:name,description,readme pushed:>=2025-04-01 created:2026-04-01..2026-06-30` | 2026-10-07T23:43:23.958Z / 2026-10-08T16:24:39.269Z |

Hit metadata:
- null description, no topics, Jupyter Notebook language, `fork: false`, size 26.315;
- creation at 2026-04-02T13:51:02Z, push at 2026-04-07T09:46:45Z.

Literal spelling “frontend orchestration” is absent. In diagram, `README.md:8` says “Frontend (React, :5173)” and `README.md:11` says “Orchestrator (FastAPI, :8080)”, separated by arrow lines (`:9–10`). Retrieval depends on unrecorded GitHub search text processing (stemming and punctuation).

`README.md` comes from `68df833` (2025-12-23 by author date) and was unchanged afterward, predating October 2026 collections. README at the SHA is not later than searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 176 entries, 173 regular files `100644` and 3 executables `100755` (`start_all.sh`, `stop_all.sh`, `decision_engine/test_requests.sh`); zero symlinks and zero gitlinks. One frontend project (`frontend/`, with `index.html`, `package.json`, `vite.config.js` and `src/`), five Python services, `training_scripts/`, `trained_models/`, `report_charts/` and `sample_pcaps/`. | contrary |
| Configuration (frontend) | `frontend/vite.config.js:5–15`: React and Tailwind plugins and `/api` proxy to orchestrator at `localhost:8080`. `frontend/package.json:12–18`: React 19, React Router, JSZip, uuid; no composition dependency. | contrary |
| Architecture | `README.md:7–17`, `70`: “Orchestrator” is FastAPI API gateway coordinating backend services; frontend is one gateway client. Backend microservices, not frontend units. | contrary |
| Search | `git grep -i` in `*.md` and `frontend/` for `orchestrat`, `micro.?front`, `federation` and `single.?spa`: only backend-orchestrator mentions (`README.md:11`, `70`, `86`; `frontend/src/hooks/useServiceHealth.jsx:34–37`; `frontend/src/components/testing/FullPipelineTest.jsx:46`) and “container orchestration” (`decision_engine/ARCHITECTURE.md:241`). Frontend imports stay within `frontend/src`. | absent |

## Authorship and history

Non-shallow clone; 72 linear commits, no merge, by seven authors: KingsukNandi (17), Suhani Sinha (12), Aranya Dutta (12), Pritha Sutradhar (11), Anurag Kumar (10, noreply), oishik-biswas (9) and Anurag-2312 (1).
- **Root:** `68df833` (“Initial project setup with README and gitignore”, author date 2025-12-23).
- **SHA:** `a7e65c9` (2026-04-07, “Updated package-lock.json for local environment”).

Author dates begin before repository creation (2026-04-02) and many have round times (`10:00:00`, `14:00:00`), indicating history reconstructed before publication. No historical blob was read and no object was missing.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | One frontend application (`frontend/`); other components are backend services. |
| Q2 | No | No second frontend unit exists whose independence could be evaluated. |
| Q3 | No | No host composes frontend units; orchestrator is API gateway (`README.md:70`). |
| Q4 | No | No frontend-composition mechanism (`frontend/vite.config.js:5–15`; recorded search). |
| Q5 | No | Q1–Q4 are No: ML system with single frontend and backend microservices. |

## Rationale

- `Non-MFE` under rule “at least one question is No”. Retrieval is lexical, as 178 and 217 and previous query `"frontend orchestration"` cases: “Frontend” and “Orchestrator” (backend gateway) nearby in README.
- Backend microservices with single frontend correspond to “conventional frontend monoliths” on UI side.
- `frontend_units: 1`, `unit_organization: single-unit`, `ui_technologies: [react]`, `build_tools: [vite]`, `repo_type: other` (academic team project).
- No decision remains open.

## Analysis notes

- **RQ1 (misleading signals):** diagram with “Frontend” above backend “Orchestrator” matches broad query `"frontend orchestration"`.
- **Protocol (search):** searched spelling is not literal. Eligibility changes from `unknown` (001) to `pass` (002).
- **Protocol (history):** author dates before repository creation, with round times.
