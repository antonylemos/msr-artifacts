---
schema: 1
id: 1056098649
full_name: p-nox/ventinso
url: https://github.com/p-nox/ventinso
commit: 5e03324efb236701b0342cf1a2c0c56bb980ad99
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

# 287 — p-nox/ventinso

## Context

Used-item marketplace with Spring Boot microservice backend (gateway, Eureka, Kafka, MySQL/MongoDB) and a single React + Vite frontend (`ReadMe.md:12–13`, `34–37`). Service decomposition concerns only backend; frontend is an SPA with internal routing consuming the API through gateway. The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:288` records rank 287, ID 1056098649, status `cloned`, branch `main` and the front matter commit, which is HEAD of the clone and `origin/main`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, with reading through `${SHA}:caminho` (the original placeholder means SHA:path). No installation, build, execution or network access occurred.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:288` records strategy `broader` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID is in `data/discovery/mfe-round-001/candidates.csv:18753` (`broader`, `unknown`) and `data/discovery/mfe-round-002/candidates.csv:18759` (`broader`, `pass`).

A `sqlite3 -readonly` query of the `hits`, `queries` and `subqueries` tables from both rounds, filtered by ID, returns one hit per round, from endpoint `repositories` and with empty `path`:

| Query (`q`) | Subquery | Effective query | Collection 001 / 002 (UTC) |
|---|---|---|---|
| `broader-frontend-orchestration`: `"frontend orchestration" in:name,description,readme` | `broader-frontend-orchestration#created:2025-Q3` | `"frontend orchestration" in:name,description,readme pushed:>=2025-04-01 created:2025-07-01..2025-09-30` | 2026-10-07T23:40:56.106Z / 2026-10-08T16:23:53.186Z |

Hit metadata:
- description “Multi-service marketplace platform for buying and selling used items (Java Spring Boot + React)”, without searched phrase;
- no topics, language Java, license MIT, `fork: false`, size 23136;
- created at 2025-09-13T11:39:02Z, pushed at 2026-02-09T21:12:37Z.

Spelling “frontend orchestration” does not appear literally in README. Its only “orchestrat” occurrence is `ReadMe.md:13`: “**React + Vite (frontend)**, orchestrated via an **API Gateway**”, where “frontend” and “orchestrated” are adjacent, separated by punctuation. Hit depends on GitHub search text processing (punctuation and inflection), which is not recorded; phrase describes backend orchestrated by gateway, rather than frontend composition.

Last reachable README change is SHA `5e03324` itself (2026-02-09T23:12:37+02:00, “Update ReadMe.md”), before collection on October 7 and 8, 2026. The SHA's README does not postdate searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 531 entries, all regular `100644` files; zero symlinks and zero gitlinks. Ten Maven modules in `backend/` (`api-gateway`, `auth-service`, `chat-service`, `discovery-service`, `inventory-preview-service`, `inventory-service`, `notification-service`, `order-service`, `payment-service`, `user-service`, aggregated in `backend/pom.xml:13–24`), `docker/` (three compose files), `config/` (MySQL, Prometheus) and a single frontend project in `frontend/`. Only one `package.json` at the SHA (`frontend/package.json`). | contrary |
| Configuration (frontend) | `frontend/package.json:6–11`: Vite `dev`/`build`/`preview` scripts; `:29–32`: React 19 and `react-router-dom`. `frontend/vite.config.js:6–23`: only `@vitejs/plugin-react` and aliases to `./src` folders; no federation plugin, `remotes`, `exposes` or SystemJS output. | contrary |
| Source code (entry and routing) | `frontend/index.html:10–11`: one `#root` and script `/src/main.jsx`. `frontend/src/main.jsx:10–22`: one `createRoot` with `BrowserRouter` and context providers. `frontend/src/App.jsx:3–19`, `69–135`: all pages statically imported from `@pages`/`@components` and routed in one `<Routes>`. | contrary |
| Source code (boundaries) | Search for relative `../../` imports in `frontend/src`: only occurrence `frontend/src/components/Layout/index.js:3` (reexports `Breadcrumbs` from `../../pages/ItemPage/...`), internal to the same project; no import leaves `frontend/` (`backend/`, `config/`). Shows internal coupling of one application, rather than a unit boundary. | context |
| Configuration (backend) | `frontend/src/config/Config.js:1–37`: all endpoints use `API_BASE_URL` (`http://localhost:8083`), the gateway. Microservice decomposition only in backend (`ReadMe.md:43–46`, `109–163`). | context |
| Build/deploy | `frontend/dockerfile:1–29`: one Vite build served by Nginx; `frontend/nginx.conf:9–11`: SPA fallback to `index.html`. `docker/docker-compose.core.yml:13–28`: single service `frontend` (port 5173→80), depending on `gateway-service`. | contrary |
| Technology / Configuration / Composition (search) | `git grep -i` across the SHA, except `frontend/package-lock.json`, for `micro.?front`, `federation`, `single.?spa`, `remoteEntry`, `import.?map`, `customElements`, `<iframe`, `qiankun`, `wujie`, `systemjs`, `loadRemote`, `registerApplication` and `postMessage`: no occurrences. In lockfile, `federation|single-spa|qiankun|wujie|systemjs`: no occurrences. | absent |

## Authorship and history

Non-shallow, partial clone (`blob:none`). 9 commits reachable from the SHA (9 across all refs), no merges, root `b862ed0` (2025-09-13, “Initial commit”, 432 added files). Refs: `main`, `origin/main` and `origin/HEAD` at SHA; tag `v1.0.0` at `f081156`, not a considered ancestor. Authorship: one owner with two identities, `Panagiotis <139992839+p-nox@users.noreply.github.com>` (5 commits, 2 through web interface) and `p-nox <noskop@protonmail.com>` (4 commits). According to `git diff-tree --no-renames --name-status`:
- 2025-09-13: initial commit and two screenshot/README commits;
- `17e955e` (2026-01-22, “Fix UI issues, optimize backend, and add chat service feature”), `efc5de9` (2026-01-27, Prometheus/Grafana) and `d2c860c` (2026-02-09, “Update core systems, UI, and refactor components”) change `backend/` and `frontend/` together;
- `0761a15` removes `uploads/`; `c170087` adds `architecture.png`; SHA changes only `ReadMe.md`.

Metadata does not distinguish per-file intellectual authorship. Frontend remained one project throughout (no commit adds a second `package.json`). No historical blob was read. `git rev-list --objects $SHA --missing=print` identifies 360 missing historical objects; `git log --shortstat` fails because of an unavailable promisor blob, and history was read only through `--name-status` without rename detection. All SHA tree blobs are present (`git cat-file -e` for each `ls-tree` entry).

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | A single frontend unit (`frontend/`, one `package.json`, one `index.html`, one `main.jsx`); no composition configuration references other units (`frontend/vite.config.js:6–23`; recorded search). `backend/` services are not frontend units. |
| Q2 | No | No two frontend units to assess; pages share entry and build (`frontend/src/App.jsx:4–13`; `frontend/dockerfile:15`). |
| Q3 | No | Routing in `App.jsx:69–135` is internal to an SPA; no host loads, mounts or routes distinct units. |
| Q4 | No | No configured frontend composition mechanism (recorded search); gateway composes backend API calls (`Config.js:1–37`), rather than UI. |
| Q5 | No | Q1–Q4 converge: monolithic SPA over a microservice backend. |

## Rationale

- `Non-MFE` under the rule “at least one question is No”. Matches “conventional frontend monoliths”: one React/Vite SPA with internal routing over backend microservices.
- Not `MFE-unit`: frontend project exports no integration contract for external host (no `exposes`, lifecycles or SystemJS bundle in `vite.config.js:6–23` and `main.jsx:10–22`).
- Unlike 097/103/104, no incomplete or unconnectable composition chain; unlike 089/100, no federation for code sharing; unlike 102/074/080, no third-party unit or platform. Also unlike 076/084/096/106/109 (complete chain). Word “microservices” in README refers to backend.
- `frontend_units: 1`, `unit_organization: single-unit`, `ui_technologies: [react]`, `build_tools: [vite]` (`frontend/package.json:29–32`, `47`; `vite.config.js:1–7`). README cites Tailwind/MUI (`ReadMe.md:35`); only MUI appears in `package.json` (`:18`), and neither changes count.
- `repo_type: example`: README presents repository as a portfolio project that “demonstrates” architecture (`ReadMe.md:264–273`, “portfolio-grade project”), despite complete Dockerfiles and compose.
- No decision remains open.

## Analysis notes

- **RQ1 (misleading signals):** backend microservice architecture with single frontend; broad query `"frontend orchestration"` matches adjacency “(frontend)**, orchestrated via an API Gateway” (`ReadMe.md:13`), describing service orchestration through gateway.
- **Protocol (search):** searched spelling does not occur literally; hit depends on GitHub search tokenization/inflection. Eligibility changes from `unknown` (001, `activity_incomplete`) to `pass` (002).
- **Protocol (repository type):** choosing `example` (declared portfolio) or `production` (container deployment, tag `v1.0.0`) does not change class.
