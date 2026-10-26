---
schema: 1
id: 1266804567
full_name: olayodeattipoe/Pasmen-POS
url: https://github.com/olayodeattipoe/Pasmen-POS
commit: 8fb7b3a24e5e8b265f7417691ad0629af92dbaf4
classification: Non-MFE
checklist: { q1: yes, q2: yes, q3: no, q4: no, q5: no }
repo_type: production
approaches: []
ui_technologies: [react]
build_tools: [vite]
frontend_units: 3
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 278 — olayodeattipoe/Pasmen-POS

## Context

Restaurant point-of-sale and inventory system: Django + Celery + PostgreSQL + Redis backend (`backend/`) and three separate React/Vite applications, one per user role:
- `management-frontend` (title “akuzi-ui-recreation”);
- `midnight-vicewave-builder` (“CALABASH POS”);
- `order-runner-pro` (“Kitchen Order Station”).

Each application is published in its own nginx container, on its own port (`docker-compose.yml:67–121`). The README calls them “Specialized Micro-Frontends” (`README.md:80`). None is loaded, mounted or routed by another; they share only the backend API. The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:279` records rank 278, ID 1266804567, status `cloned`, branch `main` and the front matter commit, which is the HEAD of the clone and of `origin/main`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. There was no installation, build, execution or network access. Credential values present in configuration files are not cited.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:279` records strategy `terminology` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID appears in `data/discovery/mfe-round-001/candidates.csv:31709` (`unknown`) and `data/discovery/mfe-round-002/candidates.csv:31717` (`pass`).

A `sqlite3 -readonly` query against tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns the same two hits in each round, from endpoint `repositories`, with subquery `…#created:2026-06` and an empty `path`:

| Query (`q`) | Collection 001 / 002 (UTC) |
|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | 2026-10-07T22:38:23.431Z / 2026-10-08T16:00:38.564Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | 2026-10-07T23:08:11.673Z / 2026-10-08T16:09:47.363Z |

The effective queries append `pushed:>=2025-04-01 created:2026-06-01..2026-06-30`.

Hit metadata:
- description “Production-ready restaurant POS and inventory system used in a live restaurant…”;
- 12 topics (including `react`, `django`, `docker`, `pos-system`), language TypeScript, `fork: false`, size 26.305;
- created at 2026-06-12T01:05:02Z, pushed at 2026-06-12T20:42:00Z.

The only spelling is “Micro-Frontends”, in `README.md:80` (“**Specialized Micro-Frontends**: Separate React/Vite applications tailored for specific user roles…”). The singular does not appear literally; this hit depends on GitHub search text processing, which is not recorded. The last README change is the SHA itself (2026-06-12), before the October 2026 collections. The README at the SHA does not postdate the searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 325 entries, 324 regular files `100644` and 1 executable `100755` (`backend/manage.py`); zero symlinks and zero gitlinks. There are `backend/` (47 files), `management-frontend/` (53), `midnight-vicewave-builder/` (116), `order-runner-pro/` (99) and `screenshots/` (3), plus `docker-compose.yml`, `ngrok.yml`, `README.md`, `Setup.MD` and `LICENSE` at the root. Each frontend has its own `package.json`, `vite.config`, `Dockerfile` and `nginx.conf`. | context |
| Deployment | `docker-compose.yml:67–121`: `posadminapp` (`management-frontend`, port 83), `managemnetapp` and `localmanagementapp` (the same `midnight-vicewave-builder` with different variables, ports 81 and 84) and `serversapp` (`order-runner-pro`, port 82). Each app’s nginx serves only its own SPA (`*/nginx.conf`, `location /`). | contrary |
| Mechanism | The `vite.config.*` use only `@vitejs/plugin-react` or `plugin-react-swc` (and `lovable-tagger` in dev); no federation plugin. `git grep` at the SHA, without lockfiles and logs, for `micro.?front`, `federation`, `single-spa`, `iframe`, `remoteEntry` and `import-map`: only `README.md:80`. There are no links between apps; found redirects are internal (`management-frontend/src/api/features.ts:66` → `/auth`). | absent |
| Source code (boundaries) | There are no `../../../` imports or path imports between app folders. Each app talks to the backend through `VITE_API_BASE_URL` (for example, `management-frontend/src/lib/utils.ts:12`). | context |
| Documentation | `README.md:1`: “Multi-Frontend POS & Inventory System”. `README.md:80`: separate applications by role, without described composition. | weak |

## Authorship and history

Non-shallow clone; 16 linear commits, no merges, all on 2026-06-12, from `c346e86` (“initial commit”) to SHA `8fb7b3a` (“Update README.md”). Six commits have author “Solomon Olayode Mensah - Attipoe”, made locally. Ten have author “Mensah - Attipoe Solomon Olayode” and were made through the GitHub interface (README, LICENSE, renaming). Only branch `main` exists. No historical blob was read and there was no missing object.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | Yes | Three identifiable frontend applications (`management-frontend`, `midnight-vicewave-builder`, `order-runner-pro`). |
| Q2 | Yes | Each has its own `package.json`, Vite, Dockerfile, nginx and port, without imports between them. |
| Q3 | No | No host, shell or root configuration loads, mounts or routes the apps; each is served in isolation (`docker-compose.yml:67–121`). |
| Q4 | No | No composition mechanism configured: no federation, single-spa, import maps, iframe or common routing. |
| Q5 | No | Applications separated by role sharing only the backend. |

## Rationale

- `Non-MFE` under the rule “at least one question is No”. It matches “multiple frontend applications without explicit composition”: the README calls the apps “Micro-Frontends”, but there is no host or mechanism uniting them.
- **Fields:** `frontend_units: 3`, `unit_organization: monorepo` (sibling folders without a workspace), `approaches: []`, `ui_technologies: [react]`, `build_tools: [vite]`, `repo_type: production` (system described as in use at a real restaurant, with Docker and Celery).
- There is no open decision.

## Analysis notes

- **RQ1 (misleading signals):** “Micro-Frontends” used for several independent SPAs per user role, without composition.
- **Protocol (search):** only the hyphenated plural spelling is in the README. Eligibility changes from `unknown` (001) to `pass` (002).
