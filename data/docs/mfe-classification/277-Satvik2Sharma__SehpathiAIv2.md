---
schema: 1
id: 1193454798
full_name: Satvik2Sharma/SehpathiAIv2
url: https://github.com/Satvik2Sharma/SehpathiAIv2
commit: 91cdccb514329056fbd4e147261d06785667a4b0
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: production
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

# 277 — Satvik2Sharma/SehpathiAIv2

## Context

Full-stack educational analysis application: React + Vite frontend (`frontend/`) and FastAPI backend with NLP (`backend/`). A root `package.json` starts both in parallel through `concurrently` (`package.json:6–8`). The README says “The frontend orchestrates interactive client views while the backend executes NLP similarities…” (`README.md:45`). The word describes the frontend role in a client/server architecture, not composition of frontend units. The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:278` records rank 277, ID 1193454798, status `cloned`, branch `main` and the front matter commit, which is the HEAD of the clone and of `origin/main`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. There was no installation, build, execution or network access. Files `frontend/.env` and `frontend/.env.production` are versioned, but were not read or cited.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:278` records strategy `broader` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID appears in `data/discovery/mfe-round-001/candidates.csv:27318` (`unknown`) and `data/discovery/mfe-round-002/candidates.csv:27324` (`pass`).

A `sqlite3 -readonly` query against tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns a single hit in each round. It comes from endpoint `repositories`, query `broader-frontend-orchestration` (`"frontend orchestration" in:name,description,readme`), subquery `…#created:2026-Q1`, with an empty `path`. Collections are 2026-10-07T23:42:39.094Z (001) and 2026-10-08T16:24:27.627Z (002). The effective query appends `pushed:>=2025-04-01 created:2026-01-01..2026-03-31`.

Hit metadata:
- null description, no topics, language JavaScript, `fork: false`, size 4.377;
- created at 2026-03-27T08:40:12Z, pushed at 2026-05-28T06:22:30Z.

The exact phrase “frontend orchestration” does not appear. The match comes from `README.md:45`, “The frontend orchestrates interactive client views…”, and depends on GitHub search text processing, which is not recorded. The last README change is `cc7e9ab` (2026-05-28), before the October 2026 collections. The README at the SHA does not postdate the searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 62 entries, all regular files `100644`; zero symlinks and zero gitlinks. There are `frontend/` (one Vite application with 25 files in `src/`), `backend/` (FastAPI: `main.py`, `api/`, `ml/`, `services/`, `data/`), `output_screenshots/` (7 PNGs) and `package.json`, `package-lock.json` and `README.md` at the root. | contrary |
| Frontend | `frontend/vite.config.js:1–16`: only `@vitejs/plugin-react` and alias `@`. `frontend/index.html:12`: a single `<script type="module" src="/src/main.jsx">`. `frontend/src/main.jsx:1–10`: mounts local `App`. All components are in `frontend/src/components/`. | contrary |
| Mechanism search | `git grep` at the SHA, without lockfiles, for `orchestrat`, `micro.?front`, `federation`, `single-spa`, `iframe`, `import-map` and `remoteEntry`: only `README.md:45`. | absent |
| Documentation | `README.md:43–70`: React client → FastAPI API diagram; “dashboards” and chat are components of the same client. | contrary |

## Authorship and history

Non-shallow clone; 12 linear commits, no merges, from 2026-03-28 (`408888d`) to 2026-05-28 (SHA `91cdccb`, “Added real screenshots.”). Ten commits have author `Satvik2Sharma`. Two have author “Satvik sharma” and were created through the GitHub interface, including `66a8882` (“Deleted my friend's uploaded node_modules directory”). Only branch `main` exists. No historical blob was read and there was no missing object.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | A single frontend application (`frontend/`); the backend is not a frontend unit. |
| Q2 | No | Without two frontend units, there is no independence to assess. |
| Q3 | No | There is no host, shell or root composition configuration; `main.jsx` mounts a local `App`. |
| Q4 | No | No composition mechanism: Vite without federation plugin, a single entry point (`frontend/index.html:12`). |
| Q5 | No | Q1–Q4 are No: conventional full-stack application. |

## Rationale

- `Non-MFE` under the rule “at least one question is No”. It matches “conventional frontend monoliths” in a client/server project.
- Same categorization as drafts 217 and 221, also entering through broader query `"frontend orchestration"` through lexical use of “orchestrate”.
- **Fields:** `frontend_units: 1`, `unit_organization: single-unit`, `approaches: []`, `ui_technologies: [react]`, `build_tools: [vite]`, `repo_type: production` (deployed application, according to Vercel and Render badges in `README.md:3–4`).
- There is no open decision.

## Analysis notes

- **RQ1 (misleading signals):** “The frontend orchestrates…” in a client/server architecture README matches query `"frontend orchestration"`.
- **Protocol (search):** the exact phrase has no literal spelling. Eligibility changes from `unknown` (001) to `pass` (002).
