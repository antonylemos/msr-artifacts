---
schema: 1
id: 1091389540
full_name: ross2p/mindlet-app
url: https://github.com/ross2p/mindlet-app
commit: 868bf9c81af85085a6befc5921bea6c01211228d
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
approaches: [multi-zones]
ui_technologies: [react, next]
build_tools: []
frontend_units: 5
unit_organization: multi-repo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 223 — ross2p/mindlet-app

## Context

“Mindlet — superproject” (`README.md:1–11`): aggregator repository of five Next.js 16 micro-frontends (“`basePath` per zone”: dashboard, auth, profile, study, decks) and two libraries (`@ross2p/shared`, `@ross2p/types`). All are Git submodules (`.gitmodules:1–21`). Superproject contains only local orchestration:
- `compose.yml`, with one Docker service per zone and nginx gateway;
- nginx configurations (`infra/nginx/`) routing prefixes `/dashboard/`, `/auth/`, `/profile/`, `/study/` and `/decks/` to each zone.

Zone sources are absent from snapshot because submodules are gitlinks. Repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:224` records rank 223, ID 1091389540, status `cloned`, branch `main` and front-matter commit, which is clone HEAD and `origin/main`. Every clone Git command used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. Submodules were not initialized. No installation, build, execution or network access occurred.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:224` records strategy `terminology` and eligibility `pass`. Sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). ID appears in `data/discovery/mfe-round-001/candidates.csv:20784` (`unknown`) and `data/discovery/mfe-round-002/candidates.csv:20790` (`pass`).

`sqlite3 -readonly` query of tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns same two hits in each round, at endpoint `repositories`, with subquery `…#created:2025-11` and empty `path`:

| Query (`q`) | Collection 001 / 002 (UTC) |
|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | 2026-10-07T22:28:09.204Z / 2026-10-08T15:56:45.972Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | 2026-10-07T22:58:13.574Z / 2026-10-08T16:07:13.967Z |

Effective queries append `pushed:>=2025-04-01 created:2025-11-01..2025-11-30`.

Hit metadata:
- null description, no topics, Python language (from scripts in `.agents/`), `fork: false`, size 549;
- creation at 2025-11-07T00:28:37Z, push at 2026-09-22T11:45:46Z.

Retrieval comes from `README.md:3`, “Micro-frontends: **dashboard**, **auth**, **profile**, **study**, **decks** (Next.js 16, `basePath` per zone)…”. Phrase search treats hyphen as separator. Singular “micro frontend” appears literally nowhere in README; this hit depends on unrecorded GitHub search text processing.

Last README change is `91bfed2` (2026-08-29), before October 2026 collections. README at the SHA is not later than searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 62 entries, including 54 regular files `100644`, 1 executable `100755` (`.agents/skills/ui-ux-pro-max/scripts/core.py`) and 7 gitlinks `160000` (`apps/auth`, `apps/dashboard`, `apps/decks`, `apps/profile`, `apps/study`, `libs/shared`, `libs/types`); zero symlinks. 38 entries are AI-agent skills in `.agents/`. Others are `README.md`, `compose.yml`, `start-local-dev.sh`, `.gitmodules`, `config/nginx/` and `infra/nginx/`. | context |
| Units (submodules) | `.gitmodules:4–18`: each zone points to own repository (`mindlet-dashboard`, `mindlet-app-auth`, `mindlet-profile`, `mindlet-study`, `mindlet-decks`). Sources are absent from snapshot; framework and `basePath` are only documented (`README.md:3`; `compose.yml:1`). | ambiguous |
| Configuration (route composition) | `infra/nginx/nginx.conf:14–18`: upstreams `dashboard:3000`, `auth:3000`, `profile:3000`, `study:3000`, `decks:3000`. `:29–66`: `location /dashboard/ { proxy_pass http://mindlet_dashboard/; }` and equivalents, with `/` redirecting to `/dashboard/`. `infra/nginx/nginx.conf.local:16–68` does same for `localhost:3001–3005`. `infra/nginx/routing-map.frontend.conf:1–9` maps prefixes to services. | strong |
| Build/deploy | `compose.yml:14–127`: each zone with own `build.context: apps/<zona>`, `Dockerfile`, `env_file` and port; service `nginx` mounts configurations and depends on five zones. `README.md:34–35`: gateway at `localhost:8080`, zones at `/dashboard/`, `/auth/login`, `/profile/me`, `/study/`, `/decks/`. | strong |
| Sharing | `README.md:53–74`: `@ross2p/shared` published on GitHub Packages; in local development, apps use `"@ross2p/shared": "file:../../libs/shared"` (`:74`). Package dependency between zones, unverifiable in snapshot. | context |
| Search | `git grep` at the SHA stopped when requesting missing partial-clone object (`0dfbd9f`, not fetched); search repeated file by file in `README.md`, `compose.yml`, `start-local-dev.sh`, `config/nginx/*` and `infra/nginx/*`, with `ModuleFederation`, `registerApplication`, `importmap` and `rewrites`, without occurrences. Outside submodules no application code exists; no `ModuleFederationPlugin`, `registerApplication`, import map or Next `rewrites` in superproject. Observable composition is reverse proxy. | context |

## Authorship and history

Non-shallow clone; 45 commits, 5 merges, all by Rostyslav Pasternak: 41 as `ross2p` and 4 as `Rostyslav` (noreply, PR merges).
- **Root:** `9a1af72` (2026-01-29, “feat: initialize main app with Next.js…”), when repository was still one application.
- **Turning point:** `404dce1` (2026-05-03, “feat: micro-frontends — submodules, nginx compose, @ross2p/shared”) converts repository into superproject.
- **SHA:** `868bf9c` (2026-09-22, “chore: update submodules to latest main hashes”).

Branches `origin/feature/auth` and `origin/feature/auth-review-fixes` were not considered. No historical blob was read. All regular SHA blobs are present in clone; object `0dfbd9f` requested by `git grep` is outside regular SHA tree and was not fetched. Gitlink commits were also not fetched.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | Yes | Five frontend units explicitly referenced by composition configuration (`infra/nginx/nginx.conf:14–18`; `compose.yml:15–108`). |
| Q2 | Yes | Each zone is own repository (`.gitmodules`), with own `Dockerfile`, build, port and service (`compose.yml`); external units separately deployed. Sole declared link is package `@ross2p/shared`. |
| Q3 | Yes | Nginx gateway routes prefixes from one entry (`localhost:8080`) to zones and redirects `/` to `/dashboard/` (`infra/nginx/nginx.conf:29–66`). |
| Q4 | Yes | Nginx composes zones through prefixes under one entry, and `compose.yml` declares corresponding services/builds. Internal `basePath` configurations are in submodules, but observable routing mechanism is complete and consistent. |
| Q5 | Yes | Q1–Q4 demonstrate independent zones composed through common gateway. |

## Rationale

- Classified as `MFE-implemented`: nginx gateway integrates five independent zones through prefixes, with services/builds declared in compose.
- **Mechanism:** zone composition, implemented through nginx instead of Next `rewrites`. Retain `approaches: [multi-zones]`, as declared in README (“`basePath` per zone”).
- **Units:** five zones are external to snapshot (gitlinks), as host referencing external units (087). Unlike 097/103/104, where executable chain was missing: gateway and compose here are complete and mutually consistent (service names, ports and prefixes).
- **Fields:** `frontend_units: 5`, `unit_organization: multi-repo` (submodules), `ui_technologies: [react, next]` (through README and compose; sources not observed), `build_tools: []`, `repo_type: example` (personal project with local stack).

## Analysis notes

- **RQ2:** superproject with per-zone submodules and per-prefix nginx gateway, with shared library published in private registry and referenced through `file:` in local development.
- **RQ1 (misleading signals):** repository language is “Python” because of agent skills versioned in `.agents/`.
- **Protocol (snapshot):** units are gitlinks; without initializing submodules, `basePath` and inter-zone navigation are unverifiable.
- **Protocol (search):** singular hit has no literal spelling. Eligibility changes from `unknown` (001) to `pass` (002).

## Recorded decision

Promoted to `MFE-implemented`. Superproject composes five Next.js zones through nginx gateway, with prefix routes, independent services/builds defined in `compose.yml`. Internal zone sources are in submodules, but observable orchestration suffices to confirm composition.
