---
schema: 1
id: 1130483744
full_name: Sripada23/nextyou-wellness-ai
url: https://github.com/Sripada23/nextyou-wellness-ai
commit: 23108c30c490989a10a0b6a4ce64e3c0f70771b4
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

# 325 — Sripada23/nextyou-wellness-ai

## Context

Python RAG application about yoga, made for the “NextYou Wellness RAG Micro-App Challenge” (`README.md:4–10`). It has a FastAPI backend with semantic retrieval and MongoDB logging, and a single-page Streamlit interface (`frontend/app.py`). “Micro-app” designates the application’s small scope in the challenge, not micro-frontends. The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:326` records rank 325, ID 1130483744, status `cloned`, branch `main` and the front matter commit, which is the HEAD of the clone and of `origin/main`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. There was no installation, execution or network access.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:326` records strategy `broader` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID appears in `data/discovery/mfe-round-001/candidates.csv:23043` (`broader`, `unknown`) and `data/discovery/mfe-round-002/candidates.csv:23050` (`broader`, `pass`).

A `sqlite3 -readonly` query against tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns one hit per round, from endpoint `repositories` and with an empty `path`:

| Query (`q`) | Subquery | Effective query | Collection 001 / 002 (UTC) |
|---|---|---|---|
| `broader-micro-apps`: `"micro apps" frontend in:name,description,readme` | `broader-micro-apps#created:2026-Q1` | `"micro apps" frontend in:name,description,readme pushed:>=2025-04-01 created:2026-01-01..2026-03-31` | 2026-10-07T23:49:35.928Z / 2026-10-08T16:27:00.472Z |

Hit metadata (identical in both rounds): null description, no topics, language Python, `fork: false`, size 11, created at 2026-01-08T15:15:40Z, pushed at 2026-01-11T17:53:20Z.

Without a description, the hit comes from the README:
- **“micro app”:** only hyphenated singular, “Micro-App” in `README.md:5` and “micro-app” in `:8` and `:80`. Plural phrase “micro apps” does not appear literally; this hit depends on GitHub search text processing (for example, plural normalization), which is not recorded.
- **“frontend”:** `README.md:10`, `:14`, `:15`, `:24`, `:29`.

The README was last changed at the SHA (2026-01-11T23:23:18+05:30, that is, 17:53:18Z), matching `pushed_at` and before the October 2026 collections. The README at the SHA does not postdate the searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 16 entries, all regular files `100644`; zero symlinks and zero gitlinks. They are `backend/` (FastAPI, RAG, safety, MongoDB), `frontend/app.py`, `data/yoga_articles.json`, `.env.example`, `.gitignore`, `README.md` and an empty `requirements.txt`. There is no JavaScript code. | contrary |
| Source code (frontend) | `frontend/app.py:1–42`: a Streamlit page sending the question through `requests.post` to `http://127.0.0.1:8000/ask` (`:4`, `:22`) and displaying the answer and sources. | contrary |
| Source code (backend) | `backend/main.py:1–15`: FastAPI with route `/ask`, using the backend’s own modules (`backend.rag`, `backend.safety`, `backend.db`). | context |
| Documentation | `README.md:5`, `:8`, `:80`: “micro-app” as a challenge and scope label; `README.md:10–45`: frontend → backend → RAG → MongoDB architecture. | weak |
| Technology / Configuration / Composition | No frontend composition configuration or code; the frontend is a single script calling an API. | absent |
| Source code (boundaries) | `frontend/app.py` imports only `streamlit` and `requests`; no imports between frontend and backend, or another frontend unit. | context |

## Authorship and history

Non-shallow, partial clone (`blob:none`). There are 9 commits (9 across all refs), no merge, all by `Sripada23 <samudralasripada@gmail.com>` as author and committer, from 2026-01-09 (`8e3bb63`, “Initial project structure for NextYou Wellness RAG”) to 2026-01-11 (the SHA, “Add demo video link to README”). `git rev-list --objects $SHA --missing=print` lists 8 missing objects, none in the SHA tree. No historical blob was read.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | A single Streamlit interface (`frontend/app.py:1–42`) and a FastAPI backend; no composition configuration. |
| Q2 | No | There are not two frontend units. |
| Q3 | No | No host loading units. |
| Q4 | No | No composition mechanism; the interface only calls the API (`frontend/app.py:22`). |
| Q5 | No | Q1–Q4 converge. |

## Rationale

- `Non-MFE` under the rule “at least one question is No”. It matches “conventional frontend monoliths”: a Streamlit interface with separate backend.
- “Micro-app” is a challenge label, not a composed unit, as in 146 (draft) and the broad-query false positive in 289 (draft).
- `frontend_units: 1`, `single-unit`, `ui_technologies: [streamlit]` (same convention as 312, draft), `build_tools: []`. `repo_type: example` (challenge submission, with sample data).
- There is no open decision.

## Analysis notes

- **RQ1 (misleading signals) / Protocol (search):** broad query `"micro apps" frontend` matches projects calling themselves “micro-app” (small scope), unrelated to micro-frontends. Here only singular spelling exists (`README.md:5`, `:8`, `:80`).
- **Protocol:** eligibility changes from `unknown` (001) to `pass` (002).
