---
schema: 1
id: 1371990391
full_name: krish-027/PulseIQ
url: https://github.com/krish-027/PulseIQ
commit: 96e83a6fad723dd2a1fe09c23f6ceddd6a1466d8
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: example
approaches: []
ui_technologies: [streamlit]
build_tools: []
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 350 — krish-027/PulseIQ

## Context

Python application (“PulseIQ”) analyzing customer feedback with RAG (LangChain, FAISS, Gemini): FastAPI backend, multipage Streamlit interface and evaluation data (`README.md:7`, `:51–53`, `:470`; repository description). There is a single interface (`frontend/app.py`) with pages registered through `st.Page`/`st.navigation`. “Orchestration” in the README refers to the batch analysis flow and RAG chain, not frontend composition. The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:351` records rank 350, ID 1371990391, status `cloned`, branch `master` (the default) and the front matter commit, which is the HEAD of the clone and of `origin/master`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. There was no installation, execution or network access.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:351` records strategy `broader` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID appears in `data/discovery/mfe-round-001/candidates.csv:37350` (`broader`, `unknown`) and `data/discovery/mfe-round-002/candidates.csv:37374` (`broader`, `pass`).

A `sqlite3 -readonly` query against tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns one hit per round, from endpoint `repositories` and with an empty `path`:

| Query (`q`) | Subquery | Effective query | Collection 001 / 002 (UTC) |
|---|---|---|---|
| `broader-frontend-orchestration`: `"frontend orchestration" in:name,description,readme` | `broader-frontend-orchestration#created:2026-Q3` | `"frontend orchestration" in:name,description,readme pushed:>=2025-04-01 created:2026-07-01..2026-09-30` | 2026-10-07T23:45:57.379Z / 2026-10-08T16:25:31.230Z |

Hit metadata (identical in both rounds): description of the customer feedback AI application, without the searched terms; no topics; language Python; `fork: false`; size 3507; created at 2026-09-15T19:09:18Z; pushed at 2026-09-22T04:24:45Z.

**Spelling:** the SHA README does not contain phrase “frontend orchestration”.
- The nearest sequence is `README.md:264` (“When multiple PDFs are selected, the Streamlit frontend orchestrates the existing single-document workflow once per PDF.”), under title “Batch analysis orchestration” (`:262`). Matching “orchestrates” to “orchestration” would depend on GitHub search morphological normalization, which is not recorded.
- Also present are “orchestrated by the Streamlit frontend” (`README.md:620`) and “RAG orchestration” (`:53`, `:578`, `:1056`, `:1430`).

No claim is made about which passage the API matched, because it reports no line.

The last README change is `1ab4a2b` (2026-09-21T15:32:16+05:30), and the SHA (2026-09-22T09:54:34+05:30, that is, 04:24:34Z) coincides with `pushed_at`. Both predate the October 2026 collections, and the README at the SHA does not postdate the searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 242 entries, all regular files `100644`; zero symlinks and zero gitlinks. `backend/` (FastAPI, RAG and evaluation services, including versioned `__pycache__`), `frontend/` (13 files), `Sample_Data/` (100 sample PDFs and scripts), `docs/` (screenshots), `requirements.txt` and `pytest.ini`. No JavaScript code or `package.json`. | contrary |
| Source code (frontend) | `frontend/app.py:3`, `:10`: Streamlit and `st.set_page_config`; `:276–316`: pages `home`, `dashboard`, `analysis`, `search`, `evaluation` and `system_status` as `st.Page` from `frontend/pages/*.py`; `:416`: `st.navigation`. A single multipage Streamlit application. | contrary |
| Source code (integration) | `frontend/services/api_client.py:22`: HTTP client with `base_url` `http://127.0.0.1:8000` for the FastAPI API. `README.md:1135`, `:1419`: pages call the backend through the client, without duplicating logic. | context |
| Documentation | `README.md:262–264`, `:620`: frontend calls the upload endpoint once per PDF (“orchestrates”), that is, orchestration of backend requests. | context |
| Technology / Configuration / Composition (search) | `git grep -i` in `frontend`, `backend` and Markdown for `iframe`, `components.v1`, `federation` and `micro.?front`: no occurrences. | absent |
| Source code (boundaries) | A single frontend unit; frontend does not import backend modules (communication only through HTTP via `api_client.py`). | context |

## Authorship and history

Non-shallow and partial clone (`blob:none`). There are 17 commits (17 across all refs), 1 merge:
- 13 by `Krish Pathak <krishpathak027@gmail.com>`;
- 4 by `Hrishabh Raj <hrishabhraj1725@gmail.com>` (FastAPI structure and implementation).

Records range from 2026-09-16 (`7000719`, “Initial commit”) to the SHA (2026-09-22, “Cleaned Folder Structure”). Merge `364a886` cites repository `krish-027/AI-Feedback-Intelligence`, an earlier name or project origin. Branch `feature/multi-pdf-upload` was not considered. `git rev-list --objects $SHA --missing=print` lists 117 missing objects, none in the SHA tree.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | A single Streamlit application (`frontend/app.py:276–316`, `:416`); no composition configuration. |
| Q2 | No | There are not two frontend units. |
| Q3 | No | There is no host loading units; `st.navigation` switches pages of the same application. |
| Q4 | No | No composition mechanism; README “orchestration” concerns API calls and the RAG chain (`README.md:264`, `:53`). |
| Q5 | No | Q1–Q4 converge. |

## Rationale

- `Non-MFE` under the rule “at least one question is No”. It matches “conventional frontend monoliths”: a Streamlit interface with a separate backend.
- The hit comes from orchestration vocabulary unrelated to micro-frontends, as in query `"frontend orchestration"` false positives in 279, 312, 320 and 336 (drafts).
- `frontend_units: 1`, `single-unit`, `ui_technologies: [streamlit]` (convention from 312 and 325), `build_tools: []`. `repo_type: example`: demonstration application with synthetic data and RAG evaluation.
- There is no open decision.

## Analysis notes

- **RQ1 (misleading signals) / Protocol (search):** broader query `"frontend orchestration"` matches texts where frontend “orchestrates” backend calls (`README.md:264`). Fifth false positive from this query in the series, suggesting low protocol precision.
- **Protocol:** eligibility changes from `unknown` (001) to `pass` (002).
