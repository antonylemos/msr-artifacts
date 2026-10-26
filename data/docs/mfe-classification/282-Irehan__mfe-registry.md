---
schema: 1
id: 1054066324
full_name: Irehan/mfe-registry
url: https://github.com/Irehan/mfe-registry
commit: f90aef8f6db5c4ec49a0913476636124721f986d
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: other
approaches: []
ui_technologies: []
build_tools: []
frontend_units: 0
unit_organization: none
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 282 — Irehan/mfe-registry

## Context

Micro-frontend registry backend service, a “Local Plugin Registry (Express)” (`README.md:1`):
- `server.js` (local Express, port 4000);
- `api/registry.js` (Vercel serverless function).

Both maintain an in-memory `microFrontends` list with `scope`, `remoteEntry.js` `url`, routes, roles and module. Expose `GET /registry` for host queries and `POST /registry` for remote registration. Repository contains no frontend unit; host and remotes that would use the registry are in other repositories. The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:283` records rank 282, ID 1054066324, status `cloned`, branch `main` and the front matter commit, which is HEAD of the clone and `origin/main`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, with reading through `${SHA}:caminho` (the original placeholder means SHA:path). No installation, execution or network access occurred.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:283` records strategy `terminology` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID is in `data/discovery/mfe-round-001/candidates.csv:18647` (`unknown`) and `data/discovery/mfe-round-002/candidates.csv:18653` (`pass`).

A `sqlite3 -readonly` query of the `hits`, `queries` and `subqueries` tables from both rounds, filtered by ID, returns the same two hits in each round, from endpoint `repositories`, with subquery `…#created:2025-09` and empty `path`:

| Query (`q`) | Collection 001 / 002 (UTC) |
|---|---|
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | 2026-10-07T19:02:49.821Z / 2026-10-08T15:39:32.098Z |
| `terminology-microfrontends-repositories`: `microfrontends in:name,description,readme` | 2026-10-07T22:09:04.609Z / 2026-10-08T15:48:01.833Z |

Effective queries append `pushed:>=2025-04-01 created:2025-09-01..2025-09-30`.

Hit metadata:
- null description, no topics, language JavaScript, `fork: false`, size 729;
- created at 2025-09-10T10:12:43Z, pushed at 2025-09-13T10:54:28Z.

CamelCase spelling “microFrontends” is at `README.md:19` (“**GET /registry** → `{ microFrontends: [], updatedAt }`”). Singular does not appear literally; that hit depends on GitHub search text processing, which is not recorded. README's last change is the SHA itself (2025-09-13), before October 2026 collection. The SHA's README does not postdate searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 7 entries, all regular `100644` files; zero symlinks and zero gitlinks: `.gitignore`, `README.md`, `api/registry.js`, `package.json`, `package-lock.json`, `server.js` and `vercel.json`. No HTML, components, bundler or UI code. | contrary |
| Source code | `server.js:1–40`: Express with `GET`/`POST /registry` and upsert by `scope`. `api/registry.js:1–50`: same contract as a serverless handler, with open CORS. `package.json:5–13`: only `express` and `cors`. | contrary |
| Documentation | `README.md:11–33`: registry “mirrors the Vercel serverless contract so Host doesn’t change code”, with remote payload example (`url: http://localhost:3002/remoteEntry.js`, `module: ./BookingList`). `README.md:35–64`: PowerShell commands registering `auth-app`, `booking-app` and `reporting-app` at Vercel URLs from other repositories. | context |
| Related repositories | Both rounds contain other candidates from the same account: `Irehan/mfe-host`, `mfe-auth`, `mfe-booking` and `mfe-reporting` (`data/discovery/mfe-round-002/candidates.csv`), outside the sample and uninspected. | context |

## Authorship and history

Non-shallow clone; 7 linear commits, no merges, all by Ali Rehan Haider, from 2025-09-10 (`8653d73`, “Initial commit”) to 2025-09-13 (SHA `f90aef8`, “added Read Me”). Only branch `main`. No historical blob was read and no object was missing.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | No frontend unit in the repository; service neither contains nor references remotes through composition configuration, only stores entries submitted at runtime. |
| Q2 | No | Without frontend units, there is no independence to assess. |
| Q3 | No | No host, shell or root configuration; host that would query registry is in another repository. |
| Q4 | No | Repository configures no composition between units; discovery API that a host would use. |
| Q5 | No | Q1–Q4 are No: backend service supporting an MFE architecture. |

## Rationale

- `Non-MFE` under the rule “at least one question is No”. Supporting infrastructure, a remote discovery registry, without frontend.
- Framing is close to 249 (GitHub Action for `import-map-deployer`) and “MFE frameworks and libraries”: MFE ecosystem tool that does not implement units. Here a service specific to the author's own architecture, hence `repo_type: other`, rather than `library`.
- **Fields:** `frontend_units: 0`, `unit_organization: none`, `approaches: []`, `ui_technologies: []`, `build_tools: []`.
- No decision remains open.

## Analysis notes

- **RQ2:** author's architecture uses a runtime registry (`GET /registry`) for host discovery of each remote's `scope`, `remoteEntry.js` `url`, routes and roles. Host and remotes are in separate repositories, outside the sample.
- **Protocol (sample):** family `Irehan/mfe-*` has five candidates in round 002; only registry entered the sample.
- **Protocol (search):** only camelCase spelling `microFrontends` is in README. Eligibility changes from `unknown` (001) to `pass` (002).
