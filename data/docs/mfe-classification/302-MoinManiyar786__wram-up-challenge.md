---
schema: 1
id: 1297144886
full_name: MoinManiyar786/wram-up-challenge
url: https://github.com/MoinManiyar786/wram-up-challenge
commit: e5113920a6afc975569adb4e2bc54ad9def57c80
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

# 302 — MoinManiyar786/wram-up-challenge

## Context

Small challenge application (“Warm-Up Challenge”, `README.md:5–6`): an Express server (`server.js`) calling Gemini API and serving a framework-free HTML/CSS/JS static page (`public/`). “Micro-app” appears only as self-description of a small app (`README.md:3`). The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:303` records rank 302, ID 1297144886, status `cloned`, branch `master` and the front matter commit, which is HEAD of the clone and `origin/master`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, with reading through `${SHA}:caminho` (the original placeholder means SHA:path). No installation, execution or network access occurred.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:303` records strategy `broader` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID is in `data/discovery/mfe-round-001/candidates.csv:33318` (`broader`, `unknown`, rule `recent-human-commit` with `activity_incomplete`) and `data/discovery/mfe-round-002/candidates.csv:33326` (`broader`, `pass`).

A `sqlite3 -readonly` query of the `hits`, `queries` and `subqueries` tables from both rounds, filtered by ID, returns one hit per round, from endpoint `repositories`, with empty `path`:

| Query (`q`) | Subquery | Effective query | Collection 001 / 002 (UTC) |
|---|---|---|---|
| `broader-micro-apps`: `"micro apps" frontend in:name,description,readme` | `broader-micro-apps#created:2026-Q3` | `"micro apps" frontend in:name,description,readme pushed:>=2025-04-01 created:2026-07-01..2026-09-30` | 2026-10-07T23:50:47.485Z / 2026-10-08T16:27:17.627Z |

Hit metadata: null description, no topics, language JavaScript, no license, `fork: false`, size 14, created at 2026-07-11T05:10:53Z, pushed at 2026-07-11T06:01:42Z.

Hit comes from README: singular, hyphenated “micro-app” at `README.md:3` (“A simple, lightweight AI micro-app that helps users generate a personalized daily cooking plan…”), and “Frontend” at `README.md:13` (“**Frontend:** Vanilla HTML, CSS (Glassmorphism UI), JavaScript”). Plural phrase “micro apps” does not appear literally; match depends on GitHub search text processing (hyphen and inflection), which is not recorded.

README was introduced in root `cd8932f` (2026-07-11) and never changed afterward; precedes collection on October 7 and 8, 2026. The SHA's README does not postdate searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 11 entries, all regular `100644` files; zero symlinks and zero gitlinks: `server.js`, `package.json`/lockfile, `Dockerfile`, `vercel.json`, `.gitignore`, `.dockerignore`, `README.md` and `public/index.html`, `public/app.js`, `public/styles.css`. | contrary |
| Source code (UI) | `public/index.html:7`, `71`: a single page loading `styles.css` and `app.js`; `public/app.js:1–63`: form handler doing `fetch('/api/generate-plan')` (`:17`) and filling DOM. No framework, bundler or other page. | contrary |
| Source code (backend) | `server.js:14`: `express.static` for folder `public`; `:19–67`: `POST /api/generate-plan` route with Gemini; `:70–72`: health check. `package.json:5–7`, `13–18`: only `start` and server dependencies. | context |
| Build/deploy | `Dockerfile:1–13`: Node image executing `npm start`; `vercel.json:2–18`: `server.js` in `@vercel/node` for `/api/*` and `public/` for remainder. One deployment artifact. | contrary |
| Technology / Configuration / Composition (search) | `git grep -i` at the SHA, except `package-lock.json`, for `micro`, `federation`, `single.?spa`, `import.?map`, `iframe` and `customElements`: only `README.md:3`. `package-lock.json` for `module-federation`, `single-spa`, `qiankun`: no occurrences. No frontend inter-module imports (one script). | absent |

## Authorship and history

Non-shallow, partial clone (`blob:none`). 2 reachable commits (2 across all refs), no merges, both with author and committer `AI Bot <bot@example.com>` on 2026-07-11: root `cd8932f` (“Initial commit”) adds ten original files; SHA `e511392` (“Add Vercel configuration”) changes `server.js` and adds `vercel.json`. Generic identity cannot attribute code to a person; recorded as unidentifiable authorship. `git rev-list --objects $SHA --missing=print` identifies 1 missing historical object; SHA blobs were read.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | A single frontend unit (`public/index.html` + `app.js`); no composition configuration (recorded search). |
| Q2 | No | No two units to assess. |
| Q3 | No | No host, shell or root config; Express only serves static files and an API (`server.js:14`, `19`). |
| Q4 | No | No composition mechanism; “micro-app” is self-description (`README.md:3`). |
| Q5 | No | Q1–Q4 converge. |

## Rationale

- `Non-MFE` under the rule “at least one question is No”. Matches “conventional frontend monoliths” (single page served by backend) and, by vocabulary, “repositories mentioning micro-frontends without implementing them”.
- Not `MFE-unit`: page exports no external host contract.
- `repo_type: example` (challenge submission, `README.md:5–6`), `frontend_units: 1`, `unit_organization: single-unit`; `ui_technologies: []` and `build_tools: []` (HTML/CSS/JS without library or bundler).
- No decision remains open.

## Analysis notes

- **RQ1 (misleading signals):** “AI micro-app” as size adjective in a challenge app; broad query `"micro apps" frontend` matches hyphenated singular term and stack list word “Frontend”.
- **Protocol (authorship):** both commits use generic identity `AI Bot <bot@example.com>`; no metadata identifies owner as author.
- **Protocol (search):** eligibility changes from `unknown` (001) to `pass` (002).
