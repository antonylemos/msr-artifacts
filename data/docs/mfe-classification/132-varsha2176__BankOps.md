---
schema: 1
id: 1350569560
full_name: varsha2176/BankOps
url: https://github.com/varsha2176/BankOps
commit: 8f6f93226ae6124eaf6a971a0b364697b54dff7f
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: example
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

# 132 — varsha2176/BankOps

## Context

Demonstration banking monitoring and incident-management platform: FastAPI backend, Python batch scripts and a single React/Vite SPA, orchestrated through Docker Compose (`README.md:1–4`; `README.md:10`; `README.md:27–38`). README “microservices” are simulated banking services monitored by backend, not frontend units. Repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:133` records rank 132, ID 1350569560, status `cloned` and front-matter commit, which is clone HEAD and `origin/main`. Every clone Git command used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. No installation, build, execution or network access occurred.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:133` records strategy `broader` and eligibility `pass`. Sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). ID appears in `data/discovery/mfe-round-001/candidates.csv:36318` (`broader`, `unknown`) and `data/discovery/mfe-round-002/candidates.csv:36326` (`broader`, `pass`).

`sqlite3 -readonly` query of tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns one hit per round, at endpoint `repositories` and with empty `path`:

| Query (`q`) | Subquery | Effective query | Collection 001 / 002 (UTC) |
|---|---|---|---|
| `broader-frontend-orchestration`: `"frontend orchestration" in:name,description,readme` | `broader-frontend-orchestration#created:2026-Q3` | `"frontend orchestration" in:name,description,readme pushed:>=2025-04-01 created:2026-07-01..2026-09-30` | 2026-10-07T23:45:57.379Z / 2026-10-08T16:25:31.230Z |

Hit metadata: null description, no topics, JavaScript language, `fork: false`, creation at 2026-08-29T12:34:43Z, push at 2026-08-29T12:40:48Z. By elimination, retrieval comes from README. `README.md:138` contains literal phrase in directory tree: “docker-compose.yml          # Postgres + Backend + Frontend orchestration”. `README.md:51` has variant “orchestrating database, backend, and frontend”. In both cases, “orchestration” describes Compose containers.

README at the SHA comes from sole commit, `8f6f932` (2026-08-29T18:08:20+05:30), before collections on 7 and 8 October 2026. README at the SHA is not later than searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 92 entries, all regular files `100644`; zero symlinks and zero gitlinks. One frontend project exists (`frontend/`, with `package.json`, `vite.config.js`, `index.html`, `src/`), plus `backend/` (FastAPI), `batch/`, `database/`, `logs/` and `tests/`. No versioned `node_modules` and no second frontend manifest. | contrary |
| Source code (UI) | `frontend/index.html:13–14`: one root `#root` loading `/src/main.jsx`. `frontend/src/main.jsx:3–9` renders `App`. `frontend/src/App.jsx:3–19` imports context, components and 12 local pages; `frontend/src/App.jsx:56–89` defines all routes in one `Router`, with protected layout and `Sidebar` (`frontend/src/App.jsx:21–40`). | contrary |
| Source code (boundaries) | Search for all imports in `frontend/src`: `../` (for example, `frontend/src/pages/Alerts.jsx:15–20`, `frontend/src/components/Sidebar.jsx:19–20` and `frontend/src/context/AuthContext.jsx:2`) point to `components/`, `context/` and `services/` within same `frontend/src`. No second unit exists whose boundary could be crossed. | context |
| Configuration / Build/deploy | `frontend/package.json:6–10`: one `vite`/`vite build` cycle. `frontend/vite.config.js:5–17` uses only React plugin and `/api` backend proxy. `frontend/Dockerfile:1–20` generates one `dist` served by nginx, and `frontend/nginx.conf:5–18` provides SPA fallback and `/api/` backend proxy. `docker-compose.yml:3–55`: services `postgres`, `backend` and `frontend`. | contrary |
| Technology | React/React DOM and Vite declared (`frontend/package.json:14–15`, `26`) and resolved in `frontend/package-lock.json:2775–2776`, `2788–2789` and `3298–3299` (18.3.1; 5.4.21). | context |
| Technology / Configuration / Composition (search) | `git grep -i` at the SHA, except lockfile, for `orchestrat`, `micro.?front`, `federation`, `single.?spa`, `remoteEntry`, `import.?map`, `customElements`, `<iframe`, `qiankun` and `wujie`: only `README.md:51` and `README.md:138`. Lockfile contains neither `federation` nor `single-spa`. | absent |
| Documentation (architecture) | `README.md:27–38`: diagram with one “React 18 + Vite Frontend” client speaking REST to backend. `README.md:91–116`: structure of one frontend with pages and components. `README.md:14` and `README.md:315` use “microservices” for monitored banking services (table `applications`). | context |

## Authorship and history

Non-shallow clone. One commit exists, evaluated SHA and root: “Initial commit - BankOps production support platform”, by `varsha2176 <aaruna.varshhh0760@gmail.com>`, at 2026-08-29T18:08:20+05:30. No merges or other remote branches exist. With one commit, history cannot distinguish evolution or folder authorship: all 92 files enter together. `README.md:173` contains a local Windows path (`c:\Users\aarun\OneDrive\Desktop\BankOps\frontend`), indicating copying from a working directory. No indication of third-party code exists beyond declared dependencies. No historical blob was read.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | One frontend unit, SPA in `frontend/` (`frontend/index.html:13–14`; `frontend/package.json:6–10`). No composition configuration references external units (recorded search). |
| Q2 | No | Without two units, no independent entries or builds exist; pages and components are modules of same `src` (`frontend/src/App.jsx:3–19`). |
| Q3 | No | `App` routes local pages in one `Router` (`frontend/src/App.jsx:56–89`), without host or shell mounting distinct units. |
| Q4 | No | `frontend/vite.config.js:5–17` configures no composition. Compose orchestrates database, backend and frontend (`docker-compose.yml:3–55`), not UI units. |
| Q5 | No | Q1–Q4 are No: full-stack application with monolithic SPA, retrieved through phrase “Frontend orchestration” about Docker Compose. |

## Rationale

- `Non-MFE` under rule “at least one question is No”. Matches “conventional frontend monoliths”. No external-host preparation exists, so `MFE-unit` does not apply.
- Same lexical pattern as 130 and 066: “orchestration” describes containers or services, not frontend composition. “Microservices” (`README.md:10`, `14`) refers to simulated backend services.
- `repo_type: example`: README presents platform “engineered to demonstrate” production-support practices (`README.md:10`), with example JWT secret in Compose (`docker-compose.yml:34`) and one commit. No operational deployment was observed.
- `ui_technologies: [react]`, `build_tools: [vite]` (`frontend/vite.config.js:1–6`), `frontend_units: 1`, `single-unit`.
- No decision remains open: no iframe, link between applications or build-time composition.

## Analysis notes

- **RQ1 (misleading signals):** broad query `"frontend orchestration"` matched a README directory-tree comment (`README.md:138`) about Docker Compose. Second consecutive case of this query capturing container orchestration (see 130).
- **Protocol (search/eligibility):** repository has no description, so retrieval can only come from README. Eligibility changes from `unknown` (001) to `pass` (002).
- **Independent-review contribution (Lupa):** complete agreement with Non-MFE, Q1–Q5 No, `example`, React/Vite, one unit and `single-unit`; no open decision. Phrase "Frontend orchestration" (`README.md:138`) describes Docker Compose, not unit composition. Clarifications without class effect: (1) tutorial’s local Windows path is only an observation and does not demonstrate code provenance; (2) folder log confirms joint addition and permits no granular evolution, and absence of declared upstream does not prove original authorship; (3) retrieval origin in `README.md:138` is inference by elimination with literal phrase, without API-returned textual position; `example` rests mainly on demonstrative presentation, not secret or commit count.
