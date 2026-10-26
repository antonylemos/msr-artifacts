---
schema: 1
id: 1330863363
full_name: gitrutu-125/foresight
url: https://github.com/gitrutu-125/foresight
commit: e76cbf22c2f7655f6b7de0b71eb7767ddb1bee07
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: other
approaches: []
ui_technologies: []
build_tools: []
frontend_units: 0
unit_organization: none
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 205 — gitrutu-125/foresight

## Context

Python demand-forecasting and inventory-risk project, without README. Own content consists of:
- CSV data in `data/`;
- EDA notebooks;
- scripts in `src/` (`features.py`, `forecast_baseline.py`, `forecast_model.py`, `pipeline.py`, `risk_scoring.py`, `generate_data.py`);
- FastAPI API in `service/main.py`;
- Markdown reports and Power BI dashboard (`foresight.pbix`).

Repository also versions an entire virtual environment (`venv/`), including JupyterLab. Three JupyterLab `package.json` files inside `venv/` are retrieval origin. No own frontend code exists. Repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:206` records rank 205, ID 1330863363, status `cloned`, branch `main` and front-matter commit, which is clone HEAD and `origin/main`. Every clone Git command used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. No installation, execution or network access occurred.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:206` records strategy `technology` and eligibility `pass`. Sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). ID appears in `data/discovery/mfe-round-001/candidates.csv:35164` (`unknown`) and `data/discovery/mfe-round-002/candidates.csv:35170` (`pass`).

`sqlite3 -readonly` query of tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns same three hits in each round, at endpoint `code`:

| Query (`q`) | Subquery / effective query | `path` | Collection 001 / 002 (UTC) |
|---|---|---|---|
| `technology-module-federation-package-code`: `"@module-federation" filename:package.json` | `technology-module-federation-package-code#size:>=10000` / `"@module-federation" filename:package.json size:>=10000` | `venv/share/jupyter/lab/static/package.json` | 2026-10-07T21:51:14.693Z / 2026-10-08T15:44:35.791Z |
| same | same | `venv/Lib/site-packages/jupyterlab/staging/package.json` | 2026-10-07T21:51:19.718Z / 2026-10-08T15:44:41.040Z |
| same | same | `venv/Lib/site-packages/jupyterlab/static/package.json` | 2026-10-07T21:51:19.718Z / 2026-10-08T15:44:41.040Z |

All three files are 14.693 bytes at SHA, within range. Manifest is `@jupyterlab/application-top` (`:2`) with `"@module-federation/runtime-tools": "^2.0.0"` in `devDependencies` (`:211`), part of JupyterLab package installed in virtual environment. They entered in `ef3c3ae3` (“clean dataset”, 2026-08-12) and were unchanged afterward.

Code-hit metadata provide only description: “FORESIGHT is an AI-powered demand forecasting and inventory intelligence platform… through an interactive Streamlit dashboard.” No topics, language or dates, and description mentions no micro-frontends. No README at SHA; entry is code-only.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 27.724 entries, all regular files `100644`; zero symlinks and zero gitlinks. There are 27.688 under `venv/` (installed Python packages including IPython and JupyterLab) and 36 own entries: `data/`, `notebooks/`, `demo files/` (two notebooks), `.ipynb_checkpoints/`, `src/`, `service/`, `reports/`, `images/`, `foresight.pbix`, `requirements.txt` and `.gitignore`. All 18 `package.json` files are in `venv/`. | contrary |
| Source code | `service/main.py:1–30`: FastAPI API (“FORESIGHT Scoring Service”); `service/requirements.txt`: `fastapi`, `uvicorn`, `pandas`, `pydantic`. Outside `venv/` there is no `.js`, `.ts`, `.jsx`, `.tsx`, `.vue` or `.html` file. | contrary |
| Technology (hit) | `venv/share/jupyter/lab/static/package.json:2`, `211`: development dependency of JupyterLab’s own build, third-party code vendored in virtual environment. Not configuration of this project. | contrary |
| Search | `git grep -i` at the SHA, excluding `venv/` and `data/`, for `streamlit`, `micro.?front` and `federation`: only Streamlit mentions as deployment option (`reports/deployment_guide.md:4`; `service/main.py:15`) and corresponding `.pyc`. No Streamlit dashboard in code. | absent |

## Authorship and history

Non-shallow clone; 6 linear commits, no merge, all by Raksha `<biradarrutuja125@gmail.com>`, from 2026-08-12 (`ef3c3ae3`, “clean dataset”, adding 27.092 files in `venv/`) to 2026-08-17. SHA `e76cbf22` (“Initial commit: FORESIGHT project”) is last commit despite message, and only adds `.gitignore`, starting to ignore `venv/` without removing it from index. `e879fb61` (“Dashboard Created”) adds `foresight.pbix`, `service/` and 585 more files in `venv/`. No historical blob was read and no object was missing.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | No own frontend unit; code is Python (scripts, notebooks, FastAPI API). |
| Q2 | No | Without units, no frontend entries or builds require evaluation. |
| Q3 | No | No host, shell or root configuration exists. |
| Q4 | No | Sole signal is a dependency declared in vendored JupyterLab manifest (`venv/…/package.json:211`). Under criterion, “a declared dependency alone is No”, and it does not even belong to project. |
| Q5 | No | Q1–Q4 are No: data-science project with versioned virtual environment. |

## Rationale

- `Non-MFE` under rule “at least one question is No”. Retrieval comes from third-party code (JupyterLab) in accidentally versioned `venv/`, not project use.
- Differs from 102/074/080, where third-party code was units’ hosting platform. Here it is only installed package, unrelated to application.
- `frontend_units: 0`, `unit_organization: none`, `approaches: []`, `ui_technologies: []`, `build_tools: []` (no own web UI; dashboard is Power BI file). `repo_type: other`: analysis project with API, neither MFE example, template nor library.
- No decision remains open.

## Analysis notes

- **RQ1 (misleading signals):** JupyterLab dependency `@module-federation/runtime-tools` in versioned `venv/` matches code search for `package.json`. Three paths are copies of same manifest.
- **Protocol (search):** eligibility changes from `unknown` (001) to `pass` (002). Repository has no README, so no spelling can be cited.
