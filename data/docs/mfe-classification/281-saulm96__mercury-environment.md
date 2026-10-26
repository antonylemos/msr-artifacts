---
schema: 1
id: 1272572423
full_name: saulm96/mercury-environment
url: https://github.com/saulm96/mercury-environment
commit: 9d3e809b157d97725375ed36049fa192428bfaa0
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

# 281 — saulm96/mercury-environment

## Context

Personal finance application in an npm workspaces + Turborepo monorepo (`package.json:5–13`):
- `apps/web`: a single React + Vite SPA;
- `apps/api`: backend with Sequelize and MySQL;
- `packages/shared`: only TypeScript types.

Also AI agent configurations in `.opencode/`. README section “### Frontend Orchestration” (`README.md:170–186`) describes a React provider synchronizing data before rendering pages of the same SPA. It does not concern frontend unit composition. The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:282` records rank 281, ID 1272572423, status `cloned`, branch `main` and the front matter commit, which is HEAD of the clone and `origin/main`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, with reading through `${SHA}:caminho` (the original placeholder means SHA:path). No installation, build, execution or network access occurred.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:282` records strategy `broader` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID is in `data/discovery/mfe-round-001/candidates.csv:32059` (`unknown`) and `data/discovery/mfe-round-002/candidates.csv:32067` (`pass`).

A `sqlite3 -readonly` query of the `hits`, `queries` and `subqueries` tables from both rounds, filtered by ID, returns a single hit in each round. It comes from endpoint `repositories`, query `broader-frontend-orchestration` (`"frontend orchestration" in:name,description,readme`), subquery `…#created:2026-Q2`, with empty `path`. Collection times are 2026-10-07T23:44:06.475Z (001) and 2026-10-08T16:24:54.752Z (002). Effective query appends `pushed:>=2025-04-01 created:2026-04-01..2026-06-30`.

Hit metadata:
- null description, no topics, language TypeScript, `fork: false`, size 604;
- created at 2026-06-17T18:34:31Z, pushed at 2026-08-24T14:10:28Z.

Literal spelling is at `README.md:170` (“### Frontend Orchestration”). README's last change through the SHA is `b4315a9` (2026-07-12), before October 2026 collection. The SHA's README does not postdate searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 238 entries, all regular `100644` files; zero symlinks and zero gitlinks. There are `apps/web` (116 files), `apps/api` (47), `packages/shared` (9, types), `.opencode/` (51, agents and skills), `docker/` (api and web Dockerfiles, `nginx.conf`), `design-system/mercury/MASTER.md`, one workflow and, at root, `docker-compose*.yml`, `turbo.json` and `README.md`. | contrary |
| Frontend | `apps/web/vite.config.ts:1–28`: only `@vitejs/plugin-react`, alias `@` and `/api` and `/auth` proxy to backend. `apps/web/index.html:12`: a single `<script type="module" src="/src/main.tsx">`. `apps/web/package.json:2`, `13`: `@mercury/web`, depending on `@mercury/shared`. | contrary |
| Documentation | `README.md:170–186`: “Frontend Orchestration” describes `RecurringSyncProvider`, a data gate inside `AuthGuard`/`ToolsLayout` for Dashboard, Transactions and Recurring pages of the same application. | contrary |
| Mechanism search | `git grep` at the SHA, excluding `package-lock.json`, for `orchestrat`, `micro.?front`, `federation`, `single-spa`, `iframe`, `remoteEntry` and `import-map`: only `README.md:170`. No `../../../` imports between folders. | absent |

## Authorship and history

Non-shallow clone; 26 commits across all refs, 8 merges. Through the SHA, history has 20 commits and 7 merges, from 2026-06-17 (`7b04166`, “Initial commit”) to 2026-07-12 (SHA `9d3e809`, “Merge pull request #7 from saulm96/DEV”). All commits are by `saulm96`; PR merges were made through the GitHub interface. Later commits exist on other branches (`DEV`, `hotfix/async-handlers` and two `feature/*`, through 2026-08-24), not considered. No historical blob was read and no object was missing.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | A single frontend application (`apps/web`); `apps/api` is backend and `packages/shared` contains only types. |
| Q2 | No | Without two frontend units, there is no independence to assess. |
| Q3 | No | No host, shell or root composition configuration. |
| Q4 | No | No composition mechanism: Vite with only React plugin and a single entry (`apps/web/index.html:12`). |
| Q5 | No | Q1–Q4 are No: conventional SPA with backend in a monorepo. |

## Rationale

- `Non-MFE` under the rule “at least one question is No”. Matches “conventional frontend monoliths”.
- Same framing as 217, 221 and 277, entering through broad query `"frontend orchestration"` due to unrelated use of the term. Here it is a section title about data synchronization.
- **Fields:** `frontend_units: 1`, `unit_organization: single-unit`, `approaches: []`, `ui_technologies: [react]`, `build_tools: [vite]`, `repo_type: example` (personal project; nothing indicates production use, although `docker-compose.prod.yml` exists).
- No decision remains open.

## Analysis notes

- **RQ1 (misleading signals):** “Frontend Orchestration” as section title about React effect order matches the broad query.
- **Protocol (search):** literal spelling in README. Eligibility changes from `unknown` (001) to `pass` (002).
