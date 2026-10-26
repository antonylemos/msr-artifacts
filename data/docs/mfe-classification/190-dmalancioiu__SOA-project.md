---
schema: 1
id: 1134094230
full_name: dmalancioiu/SOA-project
url: https://github.com/dmalancioiu/SOA-project
commit: a00d6436b4a6c4f28287e7e90ded084c1241fcf1
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
approaches: [module-federation]
ui_technologies: [react]
build_tools: [webpack]
frontend_units: 4
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 190 — dmalancioiu/SOA-project

## Context

“Food Delivery Platform - SOA Project” (`README.md:1–15`): food delivery platform demonstrating service-oriented architecture. Has six Spring Boot microservices in `backend/`, OpenFaaS functions and messaging (RabbitMQ, Kafka). In the frontend, a React `shell-app` (port 3000) composes three React micro-frontends through Module Federation: `restaurant-catalog` (3001), `order-tracking` (3002) and `user-dashboard` (3003) (`README.md:27–31`). Everything is orchestrated through Docker Compose and Nginx. The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:191` records rank 190, ID 1134094230, status `cloned`, branch `master` and the front matter commit, which is HEAD of the clone and `origin/master`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, with reading through `${SHA}:caminho` (the original placeholder means SHA:path). No installation, build, execution or network access occurred.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:191` records strategies `terminology;technology;broader` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID is in `data/discovery/mfe-round-001/candidates.csv:23347` (`unknown`) and `data/discovery/mfe-round-002/candidates.csv:23354` (`pass`).

A `sqlite3 -readonly` query of the `hits`, `queries` and `subqueries` tables from both rounds, filtered by ID, returns the same four hits in each round, from endpoint `repositories` and with empty `path`:

| Query (`q`) | Subquery | Collection 001 / 002 (UTC) |
|---|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | `…#created:2026-01` | 2026-10-07T22:30:19.747Z / 2026-10-08T15:57:32.444Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | `…#created:2026-01` | 2026-10-07T22:59:43.852Z / 2026-10-08T16:07:48.451Z |
| `technology-module-federation-repositories`: `"module federation" in:name,description,readme` | `…#created:2026-01` | 2026-10-07T23:22:37.192Z / 2026-10-08T16:16:54.016Z |
| `broader-frontend-orchestration`: `"frontend orchestration" in:name,description,readme` | `…#created:2026-Q1` | 2026-10-07T23:42:06.074Z / 2026-10-08T16:24:17.763Z |

Effective queries append `pushed:>=2025-04-01` and the corresponding creation range (`2026-01-01..2026-01-31` or `2026-01-01..2026-03-31`).

Hit metadata:
- null description, no topics, language Java, `fork: false`, size 269;
- created at 2026-01-14T08:37:58Z, pushed at 2026-01-14T10:55:22Z.

README spellings:
- “Micro Frontends” and “Module Federation”: `README.md:9` (“3 Micro Frontends (React with Module Federation)”);
- “Micro frontend”: `README.md:30` (“Micro frontend orchestrator”);
- “Module Federation”: `README.md:117`.

Phrase “frontend orchestration” does not appear literally; only “frontend orchestrator” at `README.md:30`. That hit depends on GitHub search text processing, which is not recorded.

The README comes from root commit `497d666` (2026-01-14) and never changed afterward, preceding October 2026 collection. The SHA's README does not postdate searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 420 entries, all regular `100644` files; zero symlinks and zero gitlinks. There are `backend/` (api-gateway, delivery, notification, order, restaurant and user-service), `frontend/` with four projects (`shell-app`, `restaurant-catalog`, `order-tracking`, `user-dashboard`, each with `package.json`, `webpack.config.js`, `Dockerfile`, `nginx.conf` and `src/` with `index.js` → `bootstrap.js`), `infrastructure/` (OpenFaaS, MySQL, Nginx) and `docker-compose.yml`. Also 154 `tmpclaude-*-cwd` files and `.claude/settings.local.json`, assistance tool remnants. | context |
| Configuration (host) | `frontend/shell-app/webpack.config.js:48–62`: `ModuleFederationPlugin({ name: 'shellApp', remotes: { restaurantCatalog: '…@http://localhost:3001/remoteEntry.js', orderTracking: '…:3002/…', userDashboard: '…:3003/…' }, shared: react, react-dom, react-router-dom, @mui/material, @emotion/* singleton })`. Port 3000 (`:10`). | strong |
| Configuration (remotes) | `frontend/restaurant-catalog/webpack.config.js:44–58`: `exposes: { './RestaurantCatalog' }`, port 3001. `frontend/order-tracking/webpack.config.js:45–59`: `exposes: { './OrderTracking' }`, port 3002. `frontend/user-dashboard/webpack.config.js:50–64`: `exposes: { './UserDashboard' }`, port 3003. Ports match shell `remotes`. | strong |
| Source code (consumption) | `frontend/shell-app/src/App.js:21–23`: `lazy(() => import('restaurantCatalog/RestaurantCatalog'))`, `orderTracking/OrderTracking` and `userDashboard/UserDashboard`. `:71–99`: routes with `Suspense` rendering all three remotes (protected by `PrivateRoute`). | strong |
| Source code (boundaries) | Searching for `../../` and `../<projeto>` imports in `frontend` returns nothing (original placeholder means project). Projects connect only through federated modules. | context |
| Build/deploy | `docker-compose.yml:301–351`: services `restaurant-catalog`, `order-tracking`, `user-dashboard` and `shell-app`, each with its own `build.context`. Also one `Dockerfile` and `nginx.conf` per frontend project. | strong |

## Authorship and history

Non-shallow clone; 3 commits, no merges, all by `danielmalancioiu <dmalancioiu@gmail.com>` on 2026-01-14: `497d666` (“Initial commit: Food Delivery Platform - Complete SOA Implementation”), `3638c74` (“Add driver dashboard and delivery tracking features”) and SHA `a00d643` (“Change user and driver IDs from Long to String”). The complete system entered in a single commit. Files `tmpclaude-*-cwd`, `.claude/settings.local.json` and several `IMPLEMENTATION_*.md` documents indicate development with a coding assistant; metadata does not distinguish intellectual authorship. No historical blob was read and no object was missing.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | Yes | Four frontend units in the repository, referenced by shell composition configuration (`frontend/shell-app/webpack.config.js:50–54`). |
| Q2 | Yes | Each unit has its own entry, build, port, `Dockerfile` and Compose service, without source code imports between them. |
| Q3 | Yes | Shell mounts all three remotes by route (`frontend/shell-app/src/App.js:71–99`). |
| Q4 | Yes | Module Federation configured in host and remotes and consumed through federated `import()` (`frontend/shell-app/src/App.js:21–23`). |
| Q5 | Yes | Q1–Q4 are Yes: React shell with three Module Federation micro-frontends and per-container deployment. |

## Rationale

- `MFE-implemented` under the Q1–Q5 Yes rule. Matches “monorepos containing a host and its remotes” and “examples… that actually compose frontend units”.
- The chain is complete in the snapshot, as in 076/084/096/106/109. Remotes expose domain applications mounted by route, rather than shared components (089/100).
- `approaches: [module-federation]`, `ui_technologies: [react]`, `build_tools: [webpack]`, `frontend_units: 4`, `unit_organization: monorepo`. `repo_type: example`: academic SOA demonstration project (“This system demonstrates…”, `README.md:7`).
- No decision remains open.

## Analysis notes

- **RQ2:** React micro-frontends with Module Federation in a full stack microservice system (gateway, Kafka, RabbitMQ, OpenFaaS), with one Nginx container per micro-frontend.
- **RQ3:** coding assistant development evidenced by versioned artifacts (`tmpclaude-*-cwd`, `.claude/`).
- **Protocol (search):** four queries match (terminology, technology and broad). Hit `"frontend orchestration"` comes from “frontend orchestrator” and depends on text processing. Eligibility changes from `unknown` (001) to `pass` (002).
- **Independent review contribution (Lupa):** full agreement with MFE-implemented, Q1–Q5 Yes, `module-federation`, `webpack`, React, four units and `monorepo`; no open decision (`draft`). Shell → three remotes chain is configured and consumed (`frontend/shell-app/webpack.config.js:48–63`; remotes at `:50–54`; port 3000 at `:9–15`) and names and exposures match (`restaurantCatalog/./RestaurantCatalog`, `orderTracking/./OrderTracking`, `userDashboard/./UserDashboard`). Complete citations: remote ports are at `:9–15` (3001 and 3002 at `:10`) of `frontend/restaurant-catalog/webpack.config.js` and `frontend/order-tracking/webpack.config.js`, and at `:10–17` (3003 at `:11`) of `frontend/user-dashboard/webpack.config.js`; Q2 should cite entries and build scripts of all four `package.json`, entries of all four configurations and services and contexts in `docker-compose.yml:301–367`; structure is a `git ls-tree` inventory, without lines. Comparables: 076, 084, 096, 106 and 109 are `draft` and serve as technical parallels, rather than final decisions; normative comparison is anchored in 007 and 029 (final).
