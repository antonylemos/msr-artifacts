---
schema: 1
id: 1037493163
full_name: kstv364/FitResume
url: https://github.com/kstv364/FitResume
commit: 23da349b7d5ae9512f8411dd4daede11112ca165
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: production
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

# 130 — kstv364/FitResume

## Context

Python application tailoring resumes with an LLM: FastAPI backend with LangGraph agent flow (`backend/`) and a single Streamlit UI (`frontend/app.py`), orchestrated through Docker Compose (`README.md:5`; `docker-compose.yml:3–20`). “Orchestration” concerns frontend/backend containers, not composed frontend units. Repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:131` records rank 130, ID 1037493163, branch `master`, status `cloned` and front-matter commit, which is clone HEAD and `origin/master`. Every clone Git command used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. No installation, execution or network access occurred.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:131` records strategy `broader` and eligibility `pass`. Sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). ID appears in `data/discovery/mfe-round-001/candidates.csv:17616` (`broader`, eligibility `unknown`) and `data/discovery/mfe-round-002/candidates.csv:17621` (`broader`, eligibility `pass`).

`sqlite3 -readonly` query of tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns one hit per round, at endpoint `repositories` and with empty `path`:

| Query (`q`) | Subquery | Effective query | Collection 001 / 002 (UTC) |
|---|---|---|---|
| `broader-frontend-orchestration`: `"frontend orchestration" in:name,description,readme` | `broader-frontend-orchestration#created:2025-Q3` | `"frontend orchestration" in:name,description,readme pushed:>=2025-04-01 created:2025-07-01..2025-09-30` | 2026-10-07T23:40:56.106Z / 2026-10-08T16:23:53.186Z |

Hit metadata:
- truncated description ending in “… a Python-based backend (FastAPI) and a Streamlit frontend,”;
- no topics, Python language, `fork: false`;
- creation at 2025-08-13T16:51:15Z, push at 2025-11-08T16:05:50Z, homepage `https://kaustavchanda-fitmyresume.hf.space`.

Literal phrase “frontend orchestration” appears neither in description, README nor another SHA file (`git grep -i 'orchestrat'`). Closest occurrence is `README.md:5` (“… and a Streamlit frontend, orchestrated using Docker Compose.”), with “frontend” followed by comma and “orchestrated”. `README.md:20` says “orchestrating the frontend and backend services”. Matching depends on unrecorded GitHub search text processing.

Last reachable change to `README.md` is SHA itself, `23da349` (2025-11-08T21:35:50+05:30), before October 2026 collections. README at the SHA is not later than searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 14 entries, all regular files `100644`; zero symlinks and zero gitlinks. Two service directories, `backend/` (FastAPI, agents and utilities) and `frontend/` (one `app.py`), plus `docker-compose.yml`, `.env.example`, README and LICENSE. No `package.json`, JavaScript, HTML or bundler configuration. | contrary |
| Source code (UI) | `frontend/app.py:13–17`: one Streamlit page with two tabs (`st.tabs`) in same script. `frontend/Dockerfile:18`: `streamlit run app.py`. This is repository’s sole interface. | contrary |
| Source code (integration) | `frontend/app.py:10`, `53`, `88–96`: UI calls backend through HTTP (`requests.post`) at `/tailor_resume/` and `/generate_outreach/`, defined in `backend/main.py:60` and `135`. This is frontend → API integration, not UI composition. | context |
| Source code (boundaries) | Search for all `import`/`from` in `*.py`: `frontend/app.py:1–5` imports only external libraries. `backend/main.py:10–11` imports `backend.utils` and `backend.agents` from backend itself. No relative import or crossing between `frontend/` and `backend/` exists. | context |
| Configuration / Build/deploy | `docker-compose.yml:3–20`: services `backend` (port 9000→8000) and `frontend` (8501), each built from own directory (`backend/Dockerfile:21`; `frontend/Dockerfile:18`). Orchestration concerns one backend and one UI. `README.md:1` points to Hugging Face Spaces deployment. | context |
| Technology / Configuration / Composition (search) | `git grep -i` across entire SHA for `orchestrat`, `micro.?front`, `federation`, `single.?spa`, `iframe`, `components.html`, `st.components`, `remoteEntry`, `import.?map` and `customElements`. Only text hits in `README.md:5` and `README.md:20` exist. No UI composition mechanism. | absent |
| Technology | `frontend/requirements.txt:1–3`: `streamlit`, `requests` and `python-dotenv`, without pinned versions. `backend/requirements.txt:1–12`: FastAPI, LangChain/LangGraph, Gemini, PyGithub. | context |
| Documentation | `frontend/README.md:20–24` describes API dependency through `BACKEND_URL`. `frontend/README.md:51` instructs running `streamlit run frontend/app.py`. No further frontend architecture documentation exists. | context |

## Authorship and history

Non-shallow clone; 27 commits, 1 merge, one root `a0b2501` (“initial commit”, 2025-08-13T16:33:43+05:30), already adding `frontend/app.py`. All commits are by Kaustav Chanda: 25 with `kstvkmrchanda2@gmail.com` and 2 with GitHub noreply email. `git log --no-renames --name-status` by path:
- `frontend`: 9 commits; `frontend/Dockerfile` added in `9688fd3` (2025-08-13) and `frontend/README.md` in `eb0a3aa` (2025-09-13).
- `backend`: prompt and GitHub-integration adjustments, from 2025-08-13 to 2025-09-14.
- `docker-compose.yml`: added in `9688fd3`.
- `README.md`: added in `95a6d60` (2025-08-16), changed in `aeec720` and SHA.

Metadata record a single author and indicate no third-party code. Refs `origin/cover-letter` (`d64e99a`) and `origin/fetch-github-profile` (`067b463`) exist in clone; content was not considered. No historical blob was read and no object was missing.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | Only one frontend unit exists, Streamlit script `frontend/app.py` (`frontend/app.py:13–17`). FastAPI backend is not frontend unit, and no composition configuration references external units (recorded search). |
| Q2 | No | Without two frontend units, no independent frontend entries or builds exist to compare; separate service is API (`docker-compose.yml:4–11`). |
| Q3 | No | No host or shell loads units; UI only calls HTTP endpoints (`frontend/app.py:53`, `88–96`). |
| Q4 | No | Docker Compose orchestrates frontend/backend containers (`docker-compose.yml:3–20`), not UI units. No composition mechanism was found. |
| Q5 | No | Q1–Q4 are No: conventional full-stack application with one Streamlit UI. |

## Rationale

- `Non-MFE` under rule “at least one question is No”. Matches “conventional frontend monoliths”: one UI and one API, without composed frontend units. `MFE-unit` does not apply.
- Same profile as 066: single Streamlit UI, with “orchestration” referring to backend/services, recorded as `ui_technologies: [streamlit]`, `frontend_units: 1` and `single-unit`. `build_tools: []` because Streamlit uses no bundler configured in repository.
- `repo_type: production`: README points to deployed application (`README.md:1`) and license is proprietary (`README.md:77`). Deployment was not verified. Unlike 066 (`example`), repository here presents itself as a product in use, not demonstration.
- No decision remains open: no iframe, link between applications or build-time composition.

## Analysis notes

- **RQ1 (misleading signals):** broad query `"frontend orchestration"` matched a repository where “frontend, orchestrated” describes Docker Compose (`README.md:5`), without literal phrase. Repeats 066 pattern, where “orchestration” described backend services.
- **Protocol (search/eligibility):** hit depends on unrecorded GitHub text processing. Eligibility changes from `unknown` in round 001 to `pass` in 002.
- **Independent-review contribution (Lupa):** complete agreement with Non-MFE, Q1–Q5 No, `streamlit`, one unit and `production`; no open decision. Adjustments without class effect: (1) verifiable configuration defect: `.env.example:5` defines `BACKEND_URL=http://backend:9000/tailor_resume/`, but inside Compose network backend listens on 8000 (`backend/Dockerfile:21`) and 9000 is host-published port (`docker-compose.yml:7`, `9000:8000`); `README.md:43` correctly shows `backend:8000`; default `localhost:9000` in `frontend/app.py` serves UI executed outside containers; deployment is not described as validated; (2) backend imports only external and standard libraries plus backend’s own local modules, and UI uses `requests` without importing backend sources; (3) retrieval originates in README by elimination of name and description, without exact lexical matching attributed to GitHub; (4) `production` rests on presentation, use and declared deployment link, not proprietary license.
