---
schema: 1
id: 987231654
full_name: sunsetstack/FIGS
url: https://github.com/sunsetstack/FIGS
commit: 60fcd717bc5c2116dc6294fffd397406641f0598
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

# 134 — sunsetstack/FIGS

## Context

Microservices system for crypto-market data (collection, TimescaleDB persistence, query API, scraping and sentiment analysis), in an npm-workspaces monorepo orchestrated through Docker Compose (`README.md:1–4`; `README.md:25–33`; `package.json:6–14`). Sole UI is workspace named `micro-frontend`, a React/Vite SPA consuming `signal-query-api` (`README.md:30`). “Micro-frontend” here names frontend service within backend microservices architecture; no frontend-unit composition exists. Repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:135` records rank 134, ID 987231654, branch `master`, status `cloned` and front-matter commit, which is clone HEAD and `origin/master`. Every clone Git command used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. No installation, build, execution or network access occurred.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:135` records strategy `terminology` and eligibility `pass`. Sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). ID appears in `data/discovery/mfe-round-001/candidates.csv:14177` (`terminology`, `unknown`) and `data/discovery/mfe-round-002/candidates.csv:14183` (`terminology`, `pass`).

`sqlite3 -readonly` query of tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns same two hits in each round, with empty `path`:

| Query (`q`) | Subquery | Effective query | Collection 001 / 002 (UTC) |
|---|---|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | `…#created:2025-05` | `"micro frontend" in:name,description,readme pushed:>=2025-04-01 created:2025-05-01..2025-05-31` | 2026-10-07T22:21:59.654Z / 2026-10-08T15:54:21.435Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | `…#created:2025-05` | `"micro frontends" … created:2025-05-01..2025-05-31` | 2026-10-07T22:53:32.599Z / 2026-10-08T16:05:43.863Z |

Hit metadata: description “Crypto market analysis platform with microservices architecture”, no topics, TypeScript language, `fork: false`, creation at 2025-05-20T19:12:48Z, push at 2026-05-28T10:24:12Z. Description lacks term. By elimination, retrieval comes from `README.md:30`, “- **micro-frontend**: Displays data from signal-query-api”: service name, singular and hyphenated. No plural form appears in README; hit for `"micro frontends"` depends on unrecorded GitHub search text processing.

Last reachable change to `README.md` is `7537aa4` (Dimitar Kolarov, 2025-08-30T19:55:00+03:00). It and SHA (2026-01-29) predate October 2026 collections, and README at the SHA is not later than searches. Metadata `pushed_at` (2026-05-28) is later than SHA, through pushes to other refs (`origin/development`, `origin/v2`), whose content was not considered.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 178 entries, all regular files `100644`; zero symlinks and zero gitlinks. Workspaces are `common`, `data-collector`, `signal-persister`, `signal-query-api`, `micro-frontend`, `scraper-service` and `seeder` (`package.json:6–14`), plus `sentiment-analysis-service` (Python) and `timescaledb-init`. Only `micro-frontend` has `index.html` and bundler configuration; others are Node/Nest/Python services. No `vite.config` or `webpack.config` beyond `micro-frontend/vite.config.ts` throughout reachable history (`git log --name-only`). | contrary |
| Source code (UI) | `micro-frontend/index.html:10–11`: one root `#root` loading `/src/main.tsx`. `micro-frontend/src/main.tsx:4–9` renders `App`. `micro-frontend/src/App.tsx:1–25` switches between local `DashboardPage` and `IndicatorsPage` through state (`useState<Page>`), without inter-application routing. | contrary |
| Configuration / Build/deploy | `micro-frontend/vite.config.ts:5–15`: React and Tailwind plugins and `/api` proxy, without federation. `micro-frontend/package.json:6–11`: `vite`/`vite build`. `micro-frontend/micro-frontend.dockerfile:20–28` builds only this workspace and serves it through nginx, and `micro-frontend/nginx.conf:8–14` provides SPA fallback and `/api/` proxy to `signal-query-api`. `docker-compose.yml:157–163` exposes service `micro-frontend` at `3001:80`. | contrary |
| Source code (boundaries) | Search for `../` in `micro-frontend` (except lockfile): all relative imports, including `../../` (for example, `micro-frontend/src/components/Chart/FinancialChart.tsx:16–17`), point to `types/`, `contexts/` and other directories of `micro-frontend/src`. `micro-frontend/package.json:13` declares `@financialsignalsgatheringsystem/common`, but no source in `micro-frontend/src` imports it. No second frontend unit exists whose boundary could be crossed. | context |
| Technology / Configuration / Composition (search) | `git grep -i` at the SHA, except lockfiles, for `micro.?front`, `federation`, `single.?spa`, `remoteEntry`, `import.?map`, `customElements`, `<iframe`, `qiankun`, `wujie` and `exposes`. Hits are only workspace/service name (`README.md:30`, `package.json:11`, `docker-compose.yml:157–161`, `tsconfig.json:8`, `eslint.config.js:54` and `COPY micro-frontend/package.json` lines in Dockerfiles). Neither lockfile contains `federation` or `single-spa`. | absent |
| Documentation (architecture) | `README.md:25–33` lists seven “Microservices”, one frontend. `micro-frontend/README.md:1–8` is standard React + TypeScript + Vite template README. `micro-frontend/index.html:7` retains title “Vite + React + TS”. | context |

## Authorship and history

Non-shallow clone. `git rev-list` at the SHA: 417 commits, 89 merges, root `c9e5538` (danzin, 2025-05-20, “initial commit with a starter and a single data gathering point”). SHA is merge of PR #86 (`danzin/development`) by “Sunrise” at 2026-01-29T14:01:41+02:00. Authors:
- `danzin <excl.d.k@gmail.com>`: 302;
- `Dimitar Kolarov <danzin@users.noreply.github.com>`: 112;
- `Sunrise <excl.d.k@gmail.com>`: 2;
- `google-labs-jules[bot]`: 1.

First three share email or login (`excl.d.k@gmail.com`, `danzin`), indicating same owner. By folder, `micro-frontend` has 73 commits, all by `danzin`; `micro-frontend/package.json` and `vite.config.ts` enter in `dcbe8ec` (2025-06-16, “inital starter for the frontend service”). Metadata show one frontend evolving as monorepo service, without later unit subdivision. Refs `origin/development` (`2620af2`) and `origin/v2` (`c1bbdd9`) exist; content was not considered. No historical blob was read and no object was missing.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | One frontend unit, workspace `micro-frontend` (`micro-frontend/index.html:10–11`; `micro-frontend/package.json:6–11`). Other workspaces are backend services. No composition configuration references external units (recorded search). |
| Q2 | No | Without two frontend units, no independent frontend entries or builds exist to compare; build/deployment independence (`micro-frontend/micro-frontend.dockerfile:20–28`) concerns frontend versus backend services. |
| Q3 | No | No host or shell loads units. `micro-frontend/src/App.tsx:15–24` switches local pages of same app. |
| Q4 | No | `micro-frontend/vite.config.ts:5–15` configures no composition, and no mechanism was found. Nginx only proxies API (`micro-frontend/nginx.conf:12–14`). |
| Q5 | No | Q1–Q4 are No: single SPA named “micro-frontend” within a backend microservices system. |

## Rationale

- `Non-MFE` under rule “at least one question is No”. Matches “conventional frontend monoliths”: one conventional SPA, even if deployed as independent service.
- `MFE-unit` does not apply: checklist requires a unit “explicitly prepared to be composed by an external host (e.g., Module Federation `exposes`, exported single-spa lifecycles)”. Here no `exposes`, lifecycles or host export exists; SPA mounts own root (`micro-frontend/src/main.tsx:6–9`) and is served as complete site (`micro-frontend/nginx.conf:8–10`). Thus Q2–Q4 are No, not Undetermined.
- Workspace name acts as label, like self-declarations in 023/129, but in service name rather than descriptive text. Unlike 097/103/104, no MFE configuration exists, even broken.
- `repo_type: production`: continuously evolving system for own use, with complete Docker Compose and planned deployment (`README.md:19–22`), not educational example or template. Deployment was not verified. `ui_technologies: [react]`, `build_tools: [vite]` (`micro-frontend/vite.config.ts:1–6`), `frontend_units: 1` and `single-unit`: sole unit is within a service monorepo, but remains sole frontend unit.
- No decision remains open: no iframe, link between applications or build-time composition.

## Analysis notes

- **RQ1 (misleading signals):** “micro-frontend” as folder, package and Docker-service name for sole frontend of microservices architecture. Term appears in README, manifests, compose, tsconfig, ESLint and Dockerfiles, inflating text searches without any composition mechanism.
- **Protocol (search):** retrieval comes from service name in `README.md:30`. Plural hit has no corresponding spelling. Eligibility changes from `unknown` (001) to `pass` (002).
- **Independent-review contribution (Lupa):** complete agreement with Non-MFE, Q1–Q5 No, one React/Vite unit and `single-unit`; workspace `micro-frontend` is a complete SPA without host preparation or composition with another unit, and `/api` proxy to `signal-query-api` communicates with backend. Records: 417 commits, 89 merges; `micro-frontend` has 73 commits, all by `danzin`, and `package.json` and `vite.config.ts` enter in `dcbe8ec` (2025-06-16); same account appears with two names/emails, without proving intellectual authorship. README (`README.md:30`, last commit `7537aa4`, 2025-08-30) predates searches, and retrieval origin is inference by elimination. Hit `pushed_at` (2026-05-28) is later than SHA; refs `origin/development` and `origin/v2` were not used. `repo_type: production` is reasonable given platform description with integrated services, but UI README remains template text and AWS deployment is planned (`README.md:19–22`); label does not prove production operation.
