---
schema: 1
id: 1118660441
full_name: OnlyArkMani/Flowboard
url: https://github.com/OnlyArkMani/Flowboard
commit: 200d6ecd1b2cac34b65ce47b496f276de3234a01
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

# 131 — OnlyArkMani/Flowboard

## Context

“BatchOps”, a batch-processing platform for educational institutions: Django/DRF backend with RQ workers and a single React/Vite SPA (`README.md:1–3`; `README.md:44–61`). Search hit for `"single-spa"` comes from expression “Single SPA” (one SPA) in README, not single-spa library. Repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:132` records rank 131, ID 1118660441, status `cloned` and front-matter commit, which is clone HEAD and `origin/main`. Every clone Git command used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. No installation, build, execution or network access occurred.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:132` records strategy `technology` and eligibility `pass`. Sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). ID appears in `data/discovery/mfe-round-001/candidates.csv:22320` (`technology`, `unknown`) and `data/discovery/mfe-round-002/candidates.csv:22326` (`technology`, `pass`).

`sqlite3 -readonly` query of tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns one hit per round, at endpoint `repositories` and with empty `path`:

| Query (`q`) | Subquery | Effective query | Collection 001 / 002 (UTC) |
|---|---|---|---|
| `technology-single-spa-repositories`: `"single-spa" in:name,description,readme` | `technology-single-spa-repositories#created:2025-Q4` | `"single-spa" in:name,description,readme pushed:>=2025-04-01 created:2025-10-01..2025-12-31` | 2026-10-07T23:34:22.612Z / 2026-10-08T16:21:14.951Z |

Hit metadata: description “Delloite Capstone Project Repo”, no topics, TypeScript language, `fork: false`, creation at 2025-12-18T05:07:10Z, push at 2026-01-22T20:15:27Z. Name and description lack term. By elimination, retrieval comes from `README.md:48`: “| Frontend | React + Vite + TypeScript | Single SPA in `frontend/src/App.tsx`. |”. Observed spelling is “Single SPA”, with space; GitHub phrase search treats hyphen in `"single-spa"` as separator. No other SHA text file outside `frontend/node_modules`, `__pycache__` and `backend/storage` contains `single.?spa`. Lockfile also lacks package.

README at the SHA comes from `39117f9` (“Final Project Commit”, 2026-01-23T01:37:19+05:30); SHA is following merge, with same README. Both predate October 2026 collections, and README at the SHA is not later than searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 6.126 entries, all regular files `100644`; zero symlinks and zero gitlinks. There are 5.723 in versioned `frontend/node_modules` (160 top-level entries, including `.vite` and `.bin`), 328 in `backend/storage` (generated files) and `.pyc` in `__pycache__`. Own frontend code is `frontend/index.html`, `frontend/src/main.tsx`, `frontend/src/App.tsx`, `frontend/src/lib/api.ts`, `frontend/src/vite-env.d.ts`, `frontend/src/app.css` and configs. One application `package.json` exists (`frontend/package.json`); no own `vite.config.*` or `tsconfig` exists. | contrary |
| Source code (UI) | `frontend/index.html:9–10`: one root `#root` loading `/src/main.tsx`. `frontend/src/main.tsx:3–9` renders `App`. `frontend/src/App.tsx` (5.025 lines) concentrates UI; comment “APP SHELL” in `frontend/src/App.tsx:4339–4341` marks root component `App` in same file, without loading units. | contrary |
| Documentation (architecture) | `README.md:44–61`: one frontend layer (“Single SPA in `frontend/src/App.tsx`”) and backend/worker/scheduler/redis/db services. `FILE_GUIDE.md:203–236` lists frontend files, all of same project. | contrary |
| Source code (boundaries) | `frontend/src/main.tsx:3` imports `./App`; `frontend/src/App.tsx:1–3` imports React, `./lib/api` and `./app.css`; `frontend/src/lib/api.ts:1` imports `axios`. Search for `../` in own sources: no occurrence. No second unit exists whose boundary could be crossed. | context |
| Configuration / Build/deploy | `frontend/package.json:6–11`: a single `vite`/`tsc -b && vite build` cycle. Dependencies: React 18, `react-router-dom`, `axios` (`frontend/package.json:12–17`), resolved in `frontend/package-lock.json:3757–3758`, `3770–3771` and `4086–4087` (react/react-dom 18.3.1, vite 5.4.21). `docker-compose.yml:1–106` starts only Postgres, Redis, MailHog and three Django services; frontend is not containerized. | context |
| Technology / Configuration / Composition (search) | `git grep -i` at the SHA, excluding `frontend/node_modules`, `*.pyc` and `backend/storage`, for `single.?spa`, `micro.?front`, `module.?federation`, `remoteEntry`, `registerApplication`, `qiankun`, `wujie`, `import.?map`, `customElements` and `<iframe`: sole hit in `README.md:48`. Lockfile contains neither `single-spa` nor federation, and top level of `frontend/node_modules` has no such package. | absent |
| Source code (integration) | `frontend/src/lib/api.ts:3`, `22–27`, `83–132`: axios client for Django API (`VITE_API_BASE_URL`, `frontend/.env:1`). This is backend integration, not UI composition. | context |

## Authorship and history

Non-shallow clone. SHA is a merge (“Resolve merge conflicts and keep local versions”, 2026-01-23T01:45:15+05:30) with parents `39117f9` and `170aabf`. Three root commits exist:
- `2f769d4` (“Initial commit”, 2025-12-18);
- `e3fc9f7` (“Initial commit for Flowboard project”, 2025-12-18), joined to first in `c78acee`;
- `39117f9` (“Final Project Commit”, 2026-01-23), isolated root with entire project.

SHA tree differs from `39117f9` only by adding `frontend/.env` and differs from `170aabf` in 53 paths (`git diff --name-only`). `git rev-list --count` at the SHA: 72 commits, 2 merges. All commits are by Ark Mani `<arkmanimishra@gmail.com>`. In `170aabf` lineage, 57 of 70 commits are dated 2026-01-14 and several have timestamps in same second, with messages “chore: … placeholder/stubs” (`git log --format`). Pattern is compatible with batch-generated commits, but metadata do not prove this.

`frontend/node_modules`, `README.md` and `frontend/src` enter through root `39117f9`, under default `git log` simplification. `git log --full-history -- README.md` also shows `55bc72b` (2026-01-14) in other lineage. No indication of third-party code exists beyond versioned npm dependencies. No historical blob was read and no object was missing.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | A single frontend unit: SPA with one root and one `package.json` (`frontend/index.html:9–10`; `frontend/package.json:6–11`; `README.md:48`). No composition configuration references external units (recorded search). |
| Q2 | No | Without two units, no independent entries or builds exist; sources import only local modules and npm packages (`frontend/src/main.tsx:3`; `frontend/src/App.tsx:1–3`). |
| Q3 | No | “APP SHELL” is root `App` component of SPA itself (`frontend/src/App.tsx:4339–4341`), without loading or mounting distinct units. |
| Q4 | No | No composition mechanism is configured; `single-spa` is neither declared nor resolved (SHA and lockfile search). |
| Q5 | No | Q1–Q4 are No: monolithic SPA with backend, retrieved through expression “Single SPA”. |

## Rationale

- `Non-MFE` under rule “at least one question is No”. Matches “conventional frontend monoliths”. No external-host preparation exists, so `MFE-unit` does not apply.
- Search signal is lexical: “Single SPA” (`README.md:48`) describes one SPA and does not mention single-spa framework. Unlike 089/100 or 097/103/104, no MFE dependency or configuration even requires evaluation.
- `repo_type: example`: repository description presents it as capstone project, and history ends in “Final Project Commit”. It is academic work, as exercise 094, not an observed operational deployment.
- `ui_technologies: [react]` (`frontend/package.json:14–15`). `build_tools: [vite]`: scripts call Vite directly (`frontend/package.json:7–9`), despite no configuration file. `frontend_units: 1` / `single-unit`.
- No decision remains open: no iframe, link between applications or build-time composition.

## Analysis notes

- **RQ1 (misleading signals):** technology query `"single-spa"` matches common phrase “Single SPA”, because GitHub phrase search ignores hyphen. A potentially recurrent lexical false positive for this query.
- **Protocol (completeness):** repository versions `frontend/node_modules` (5.723 files), `__pycache__` and `backend/storage`. Text searches must exclude them to avoid confusing dependencies with own code. Eligibility changes from `unknown` (001) to `pass` (002).
- **Independent-review contribution (Lupa):** complete agreement with Non-MFE, Q1–Q5 No, `example`, one React/Vite unit and `single-unit`; no open decision. Adjustments without class effect: (1) provenance: "single-spa" retrieval is inference compatible with sole observed text ("single SPA" as single page), without asserting general GitHub hyphen rule; same false-positive family as 110 and 124; (2) `tsc -b` has no versioned project `tsconfig` (all snapshot `tsconfig` files are in `frontend/node_modules`), so build was not demonstrated; (3) `FILE_GUIDE.md:209` cites `#app`, while `index.html` and `main.tsx` use `#root`; executable artifacts agree; (4) authorship: retained caveat about log simplification, added complete folder history showing sources and dependencies already in December lineage; origin or intellectual authorship is not inferred from date pattern.
