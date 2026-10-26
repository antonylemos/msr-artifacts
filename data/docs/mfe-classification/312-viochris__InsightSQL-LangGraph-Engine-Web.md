---
schema: 1
id: 1146461909
full_name: viochris/InsightSQL-LangGraph-Engine-Web
url: https://github.com/viochris/InsightSQL-LangGraph-Engine-Web
commit: afbcb50604cc36c71417e45ff3e0c99be56857ba
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

# 312 — viochris/InsightSQL-LangGraph-Engine-Web

## Context

Python/Streamlit SQL agent application with LangGraph and Gemini (“InsightSQL”, `README.md:1–12`). A single script `app.py` with helper functions in `function.py` and an example SQLite database, published on Streamlit Cloud (metadata homepage). No JavaScript code or composed frontend. Search term results from juxtaposition of “(Frontend).” and “**Orchestration:**” on consecutive README lines. The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:313` records rank 312, ID 1146461909, status `cloned`, branch `main` and the front matter commit, which is HEAD of the clone and `origin/main`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, with reading through `${SHA}:caminho` (the original placeholder means SHA:path). No installation, execution or network access occurred.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:313` records strategy `broader` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID is in `data/discovery/mfe-round-001/candidates.csv:24186` (`broader`, `unknown`) and `data/discovery/mfe-round-002/candidates.csv:24193` (`broader`, `pass`).

A `sqlite3 -readonly` query of the `hits`, `queries` and `subqueries` tables from both rounds, filtered by ID, returns one hit per round, from endpoint `repositories` and with empty `path`:

| Query (`q`) | Subquery | Effective query | Collection 001 / 002 (UTC) |
|---|---|---|---|
| `broader-frontend-orchestration`: `"frontend orchestration" in:name,description,readme` | `broader-frontend-orchestration#created:2026-Q1` | `"frontend orchestration" in:name,description,readme pushed:>=2025-04-01 created:2026-01-01..2026-03-31` | 2026-10-07T23:42:21.826Z / 2026-10-08T16:24:22.926Z |

Hit metadata (same in both rounds): description about SQL agent with LangGraph and Gemini 2.5, without searched terms; topics `database-analysis`, `gemini-api`, `generative-ai`, `glass-box-ai`, `langgraph`, `llm-reasoning`, `python`, `react-architecture`, `sql-agent`, `streamlit`; language Python; license MIT; `fork: false`; size 296; created at 2026-01-31T06:03:24Z; pushed at 2026-01-31T07:30:14Z.

**Spelling:** SHA's README does not contain phrase “frontend orchestration”. Only compatible sequence is end of `README.md:38` (“* **Framework:** Streamlit (Frontend).”) followed by `README.md:39` (“* **Orchestration:** LangGraph (Cyclic ReAct Agent).”): tokens “Frontend” and “Orchestration” are adjacent after punctuation, line break and markup. Topic `react-architecture` refers to agent ReAct pattern, rather than React. No claim is made about which passage API matched, as it reports no line.

README's last change is SHA (2026-01-31T14:30:14+07:00, i.e., 07:30:14Z), matching `pushed_at` and preceding October 2026 collection. The SHA's README does not postdate searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 10 entries, all regular `100644` files; zero symlinks and zero gitlinks. `app.py`, `function.py`, `requirements.txt`, `dresses.db` (SQLite), four images in `assets/`, `README.md` and `LICENSE`. No `package.json`, HTML or JavaScript code. | contrary |
| Configuration | `requirements.txt`: `streamlit`, `langchain`, `langchain-community`, `langchain-google-genai`, `langchain-core`, `langgraph` and `sqlalchemy`. | contrary |
| Source code | `app.py:1–33`: imports Streamlit, LangChain and LangGraph (`create_react_agent`, `:15`) and `function.py` functions (`:19`), and configures page (`st.set_page_config`, `:33`). `function.py:3`, `:23`, `:43`, `:64`, `:80`: Streamlit session state functions (`init_state`, `change_on_api_key`, `reset_state`, `reset_chat_display`, `change_on_lan`). A single application. | contrary |
| Documentation | `README.md:38–39`: “Framework: Streamlit (Frontend)” and “Orchestration: LangGraph (Cyclic ReAct Agent)”, where “orchestration” denotes LLM agent orchestration. | context |
| Technology / Configuration / Composition (search) | `git grep -i` in `app.py` and `function.py` for `iframe`, `components.v1`, `st.components`, `html(`, `federation`, `single.?spa`, `import.?map`, `customElements` and `micro`: no occurrences. Only local import is `from function import …` (`app.py:19`), within same application. | absent |

## Authorship and history

Non-shallow, partial clone (`blob:none`). 6 commits (6 across all refs), no merges, all by `Silvio Christian, Joe <140993389+viochris@users.noreply.github.com>` with committer `GitHub` (web interface uploads and edits), on 2026-01-31, from `736b5a3` (“Initial commit”) to SHA (“Update README.md”). `git rev-list --objects $SHA --missing=print` lists 4 missing objects, none in SHA tree. No historical blob was read.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | A single Streamlit application (`app.py:1–33`; `requirements.txt`); no composition configuration. |
| Q2 | No | No two units. |
| Q3 | No | No host loading units. |
| Q4 | No | No frontend composition mechanism; README “orchestration” is agent's LangGraph graph (`README.md:39`). |
| Q5 | No | Q1–Q4 converge. |

## Rationale

- `Non-MFE` under the rule “at least one question is No”. Matches “conventional frontend monoliths”: a single Python/Streamlit application.
- Not even a micro-frontend mention case: hit results from adjacent tokens on different lines (“(Frontend).” / “**Orchestration:**”), like lexical false positive 279 (draft).
- `frontend_units: 1`, `single-unit`. `ui_technologies: [streamlit]`, observed UI framework (`requirements.txt`; `app.py:1`). `build_tools: []`: no bundler. `repo_type: example` (agent demonstration with example SQLite database, `dresses.db`).
- No decision remains open.

## Analysis notes

- **RQ1 (misleading signals) / Protocol (search):** broad query `"frontend orchestration"` matched juxtaposition of two list labels (`README.md:38–39`) in an LLM agent project, where “orchestration” means agent orchestration. As in 279, phrase search appears to ignore punctuation and line breaks between tokens.
- **Protocol:** eligibility changes from `unknown` (001) to `pass` (002).
