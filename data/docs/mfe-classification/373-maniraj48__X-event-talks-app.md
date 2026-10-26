---
schema: 1
id: 1271056104
full_name: maniraj48/X-event-talks-app
url: https://github.com/maniraj48/X-event-talks-app
commit: 702f6a3130c71489af67f746e9b9ee6e33b1cf0e
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: example
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

# 373 — maniraj48/X-event-talks-app

## Context

“BigQuery Release Pulse” application. A Flask server reads the BigQuery release notes Atom feed and exposes an API (`README.md:1–3`, `:76–85`; `app.py:7–13`, `:111–150`). A single page (`templates/index.html`) with plain CSS and JavaScript lists notes and provides an X post composer (`README.md:47–51`). “Frontend orchestration” in the README describes the role of `static/js/app.js` (state, `fetch` client, search and composer), not frontend composition. The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:374` records rank 373, ID 1271056104, status `cloned`, branch `main` and the front matter commit, which is the HEAD of the clone and of `origin/main`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. There was no installation, execution or network access.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:374` records strategy `broader` and eligibility `unknown`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID appears in `data/discovery/mfe-round-001/candidates.csv:31956` and `data/discovery/mfe-round-002/candidates.csv:31964`, both with `broader` and `unknown`. In round 002, `recent-push` is `pass` and `recent-human-commit` is `unknown` (`activity_incomplete`).

A `sqlite3 -readonly` query against tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns one hit per round, from endpoint `repositories` and with an empty `path`:

| Query (`q`) | Subquery | Collection 001 / 002 (UTC) |
|---|---|---|
| `broader-frontend-orchestration`: `"frontend orchestration" in:name,description,readme` | `broader-frontend-orchestration#created:2026-Q2` | 2026-10-07T23:43:42.907Z / 2026-10-08T16:24:44.223Z |

The effective query appends `pushed:>=2025-04-01` and the quarter’s creation interval.

Hit metadata (identical in both rounds): null description, no topics, language CSS, no license, `fork: false`, size 17, created at 2026-06-16T09:41:54Z, pushed at 2026-06-16T09:49:22Z.

**Spelling:** `README.md:64` (“`app.js               # Frontend orchestration, fetch client, search and composer code`”), in the directory structure diagram. It is the only occurrence of the phrase.

The README was added at the SHA itself (2026-06-16T15:19:12+05:30, that is, 09:49:12Z), which matches `pushed_at` and predates the October 2026 collections. The README at the SHA does not postdate the searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 7 entries, all regular files `100644`; zero symlinks and zero gitlinks. They are `.gitignore`, `README.md`, `app.py`, `requirements.txt`, `static/css/style.css`, `static/js/app.js` and `templates/index.html`. There is no `package.json` or build tool. | contrary |
| Source code (backend) | `app.py:111–113`: `/` renders `index.html`; `:115–150`: routes `/api/releases`, `/api/tweet` and `/api/tweets`; `:153`: server on port 5000. `requirements.txt:1–3`: Flask, requests and beautifulsoup4. | context |
| Source code (frontend) | `templates/index.html:18`, `:172`: loads `/static/css/style.css` and `/static/js/app.js`; other `<link>` are external fonts and icons (`:10–15`). `static/js/app.js:1–12`, `:44–50`: global state and DOM manipulation; `:123`, `:358`, `:394`: `fetch` to the Flask API. A single page with one script. | contrary |
| Technology / Configuration / Composition (search) | The `<script>`/`<link>` of `templates/index.html` and `fetch`/`import` calls of `static/js/app.js` show no `iframe`, dynamic import or loading of another application. | absent |

## Authorship and history

Non-shallow clone. There are 2 commits (2 across all refs), no merges, both by `maniraj48 <manirajkyatham@gmail.com>` (author and committer):
- `c5d0f7a` (2026-06-16T15:08:56+05:30, “Initial commit of BigQuery Release Pulse application”): adds `app.py`, `requirements.txt`, `static/` and `templates/`;
- `702f6a3` (2026-06-16T15:19:12+05:30, “docs: add project README.md”), o SHA.

`git rev-list --objects $SHA --missing=print` lists no missing objects.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | A single page served by Flask (`app.py:111–113`; `templates/index.html:172`); no composition configuration. |
| Q2 | No | There are not two frontend units. |
| Q3 | No | No host loading units; Flask only renders the template and serves the API. |
| Q4 | No | No composition mechanism; README “orchestration” is the logic of a single script (`README.md:64`). |
| Q5 | No | Q1–Q4 converge. |

## Rationale

- `Non-MFE` under the rule “at least one question is No”. It matches “conventional frontend monoliths”: a page with plain JavaScript over a Flask backend.
- The hit comes from orchestration vocabulary unrelated to micro-frontends, like false positives from query `"frontend orchestration"` in 279, 312, 320, 336 and 350 (drafts).
- `frontend_units: 1`, `single-unit`, `ui_technologies: []` (HTML, CSS and JavaScript without a framework), `build_tools: []`. `repo_type: example`: demonstration application with simulated in-memory publication (`app.py:9–10`, `:143–144`).
- There is no open decision.

## Analysis notes

- **RQ1 (misleading signals) / Protocol (search):** the matched phrase is in a comment in the README directory diagram (`README.md:64`). It is the sixth false positive from query `"frontend orchestration"` in the series.
- **Protocol (eligibility):** eligibility remains `unknown` in both rounds (`recent-human-commit` with `activity_incomplete`), and the candidate entered the sample that way.
