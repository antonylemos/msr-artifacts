---
schema: 1
id: 1160906326
full_name: Lisvu/micros-frontend
url: https://github.com/Lisvu/micros-frontend
commit: fa92a02ba519797b6a018fd6e93515695d94bf40
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: other
approaches: []
ui_technologies: [react]
build_tools: [webpack]
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 212 — Lisvu/micros-frontend

## Context

React frontend (ejected Create React App, Ant Design, React Router) for online-course platform: login, courses, modules, quizzes, programming exercises, exams, grades and forum. Consumes API at `http://localhost:8000` (`src/api/request.js:3–7`). One application with internal routes (`src/App.jsx:1–25`). README is CRA standard, and no snapshot file mentions micro-frontends, Module Federation or single-spa. Repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:213` records rank 212, ID 1160906326, status `cloned`, branch `main` and front-matter commit, which is clone HEAD and `origin/main`. Every clone Git command used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. No installation, build, execution or network access occurred.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:213` records strategy `terminology` and eligibility `pass`. Sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). ID appears in `data/discovery/mfe-round-001/candidates.csv:25082` (`unknown`) and `data/discovery/mfe-round-002/candidates.csv:25089` (`pass`).

`sqlite3 -readonly` query of tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns same hit in each round, at endpoint `repositories` and with empty `path`:

| Query (`q`) | Subquery / effective query | Collection 001 / 002 (UTC) |
|---|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | `terminology-micro-frontend-repositories#created:2026-02` / `"micro frontend" in:name,description,readme pushed:>=2025-04-01 created:2026-02-01..2026-02-28` | 2026-10-07T22:31:23.418Z / 2026-10-08T15:57:49.131Z |

Hit metadata:
- null description, no topics, JavaScript language, `fork: false`, size 666;
- creation at 2026-02-18T14:09:19Z, push at 2026-03-31T10:12:28Z.

README (`README.md:1–30`, CRA standard) contains neither “micro frontend” nor variants, and description is null. Sole remaining field of query `in:name,description,readme` is repository name, which must be retrieval origin through search tokenization. This explains sample entry, but is not classification evidence.

README comes from `422da70` (2026-02-18) and was unchanged afterward, predating October 2026 collections. README at the SHA is not later than searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 71 entries, all regular files `100644`; zero symlinks and zero gitlinks. One ejected CRA project: `config/` (Webpack, Jest, dev server), `scripts/` (`start.js`, `build.js`, `test.js`), `public/` and `src/` with `pages/` (20 files, one empty), `components/`, `api/` and `styles/`. | contrary |
| Source code | `src/App.jsx:1–25`: one `BrowserRouter` statically importing all local pages. `src/api/request.js:3–7`: Axios client for local backend. | contrary |
| Configuration / Build | `package.json:66–67`: `start`/`build` call ejected CRA `scripts/start.js`/`build.js`, using `config/webpack.config.js`. SHA search (except lockfile) for `ModuleFederationPlugin`, `remoteEntry`, `federation`, `single-spa` and `micro.?front` returns nothing. | contrary |
| Documentation | `README.md:1–30`: standard Create React App README, without micro-frontends mention. | absent |

## Authorship and history

Non-shallow clone; 20 commits, 1 merge. All by Lisvu: 19 as `Lisvu_chen <23301031@bjtu.edu.cn>` and initial `88ef70a` (2026-02-18, noreply, web interface). Merge `d6d0703` (“Merge remote content”, 2026-02-18) followed by feature commits with Chinese messages, up to SHA `fa92a02` (2026-03-19, forum adjustment). Institutional email and messages indicate academic work. `pushed_at` (2026-03-31) is later than SHA, without another clone branch. No historical blob was read and no object was missing.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | One frontend application (`src/App.jsx:1–25`); no configuration references another unit. |
| Q2 | No | No second unit exists whose independence could be evaluated. |
| Q3 | No | No host composes units; pages are internal modules of same build. |
| Q4 | No | No composition mechanism (recorded search; `config/webpack.config.js` without federation). |
| Q5 | No | Q1–Q4 are No: React frontend monolith without micro-frontends reference in content. |

## Rationale

- `Non-MFE` under rule “at least one question is No”. Matches “conventional frontend monoliths”.
- Retrieval comes only from repository name; content does not use term.
- `frontend_units: 1`, `unit_organization: single-unit`, `ui_technologies: [react]`. `build_tools: [webpack]`, since ejected CRA exposes `config/webpack.config.js` used by scripts, as 019 and unlike unejected CRA in 087. `repo_type: other`: academic application work, not MFE example.
- No decision remains open.

## Analysis notes

- **RQ1 (misleading signals):** repository named with “micros-frontend” in CRA monolith; phrase search matches only name.
- **Protocol (search):** retrieval depends only on name field. Eligibility changes from `unknown` (001) to `pass` (002).
