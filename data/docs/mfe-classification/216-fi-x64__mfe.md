---
schema: 1
id: 1133729895
full_name: fi-x64/mfe
url: https://github.com/fi-x64/mfe
commit: fa4088ae3313734c98a027db5fccfee4db34a46d
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
approaches: [module-federation]
ui_technologies: [react]
build_tools: [webpack]
frontend_units: 2
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 216 — fi-x64/mfe

## Context

Webpack 5 repository with Module Federation in `packages/`:
- `container` (React, host);
- `marketing` (React, remote), exposing `mount`;
- `auth` and `dashboard`, containing only `package.json` and `package-lock.json`, without configuration or code.

S3/CloudFront deployment workflows for `container` and `marketing`. No README. Structure and names (`container`/`marketing`/`auth`/`dashboard`, `mount`, `/<pacote>/latest/`) follow course outline of drafts 174, 177 and 197, here at early stage with one implemented remote. Repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:217` records rank 216, ID 1133729895, status `cloned`, branch `main` and front-matter commit, which is clone HEAD and `origin/main`. Every clone Git command used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. No installation, build, execution or network access occurred.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:217` records strategy `terminology` and eligibility `pass`. Sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). ID appears in `data/discovery/mfe-round-001/candidates.csv:23316` (`unknown`) and `data/discovery/mfe-round-002/candidates.csv:23323` (`pass`).

`sqlite3 -readonly` query of tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns same two hits in each round, at endpoint `repositories`, with subquery `…#created:2026-01` and empty `path`:

| Query (`q`) | Collection 001 / 002 (UTC) |
|---|---|
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | 2026-10-07T19:46:50.503Z / 2026-10-08T15:40:44.100Z |
| `terminology-microfrontends-repositories`: `microfrontends in:name,description,readme` | 2026-10-07T22:10:21.754Z / 2026-10-08T15:48:43.516Z |

Effective queries append `pushed:>=2025-04-01 created:2026-01-01..2026-01-31`.

Hit metadata:
- description “microfrontends react reactjs”;
- no topics, JavaScript language, `fork: false`, size 124;
- creation at 2026-01-13T18:37:02Z, push at 2026-01-14T18:49:49Z.

No README at SHA. Retrieval comes from description containing “microfrontends”. Singular “microfrontend” does not appear literally; this hit depends on unrecorded GitHub search text processing.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 29 entries, all regular files `100644`; zero symlinks and zero gitlinks. `container` and `marketing` have `package.json`, `config/webpack.{common,dev,prod}.js`, `public/index.html` and `src/` (`index.js` → `bootstrap.js`). `auth` and `dashboard` have only `package.json` and lockfile (`packages/auth/package.json:4–6`, standard `test` script). No root workspace. | context |
| Configuration (host) | `packages/container/config/webpack.dev.js:16–22`: `ModuleFederationPlugin` with `name: "container"` and `remotes: { marketing: "marketing@http://localhost:8081/remoteEntry.js" }`. `webpack.prod.js:15–21`: `marketing@${domain}/marketing/latest/remoteEntry.js`, with `domain = process.env.PRODUCTION_DOMAIN` (`:6`), defined through workflow secret (`.github/workflows/container.yml:22–23`). | strong |
| Configuration (remote) | `packages/marketing/config/webpack.dev.js:16–23` and `webpack.prod.js:13–20`: `name: "marketing"`, `filename: "remoteEntry.js"`, `exposes: { "./MarketingApp": "./src/bootstrap" }`. Port 8081 (`webpack.dev.js:10`), same as host. | strong |
| Source code (composition) | `packages/container/src/components/MarketingApp.js:1–11`: `import { mount } from "marketing/MarketingApp"` and `mount(ref.current)`. `packages/container/src/App.js:6–14`: mounts `Header` and `MarketingApp`. `packages/marketing/src/bootstrap.js:6–22`: `mount` renders app and self-mounts only in isolated development. | strong |
| Source code (boundaries) | Search for imports `../..` in `packages` (except lockfiles) returns nothing; packages connect only through federated module. | context |
| Build/deploy | `.github/workflows/container.yml:1–35` and `marketing.yml:1–33`: per-package build, triggered through own `paths`, `aws s3 sync dist …/<pacote>/latest` and CloudFront invalidation. | strong |

## Authorship and history

Non-shallow clone; 6 commits, no merge, all by fi.x64 `<hohoangphia@gmail.com>`, between 2026-01-14 and 2026-01-15 (+07:00):
- `e87f279`: “first commit”;
- `e71669e`, `62b3e18`, `ffc5246`, `ad5672d`: deployment/workflow adjustments;
- SHA `fa4088a` (“Added header”).

No historical blob was read. Clone is partial (`blob:none`) and `git rev-list --objects --all --missing=print` identifies ten missing historical blobs (old container/marketing workflows, `packages/container/src/App.js`, container `webpack.prod` and marketing `webpack.common` and `webpack.prod`, for example `6aea48b…` and `a041e7e…`); all current-SHA evidence files were read, and limitations affect only comparison of old content.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | Yes | Two implemented units (`container`, `marketing`), referenced by host composition configuration (`packages/container/config/webpack.dev.js:18–20`). |
| Q2 | Yes | Each has own entry, webpack configuration, build and deployment workflow, without source-code imports between them. |
| Q3 | Yes | Container mounts remote (`packages/container/src/App.js:10–11`; `MarketingApp.js:7–9`). |
| Q4 | Yes | Module Federation in host (`remotes`) and remote (`exposes`), consumed through `import { mount } from "marketing/MarketingApp"`. |
| Q5 | Yes | Q1–Q4 are Yes: runtime-composed host and remote, with independent deployment. |

## Rationale

- `MFE-implemented` under Q1–Q5 Yes rule. Matches “monorepos containing a host and its remotes”. Chain is complete in snapshot for container/marketing pair, as in 076/084/096/106/109.
- Same course outline as 174, 177 and 197, at earlier stage (one remote). As there, composition is implemented, not reduced to content (023/094), and remote exposes a mounted application, not shared component (089/100).
- `frontend_units: 2`: `auth` and `dashboard` do not count, having only manifest/lockfile without entry, configuration or composition reference. `approaches: [module-federation]`, `ui_technologies: [react]` (Vue in `dashboard/package.json` is only declared), `build_tools: [webpack]`, `unit_organization: monorepo`, `repo_type: example`.
- No decision remains open.

## Analysis notes

- **RQ2:** integration through `mount(el)` exported by remote `bootstrap`; host does not yet pass navigation callbacks, unlike 197.
- **Protocol (sample):** fourth sample repository with this course architecture (174, 177, 197).
- **Protocol (search):** entry through description; singular hit has no literal spelling. Eligibility changes from `unknown` (001) to `pass` (002).
- **Independent-review contribution (Lupa):** complete agreement with MFE-implemented, Q1–Q5 Yes, `module-federation`, React/webpack, `frontend_units: 2` and `monorepo`; no open decision (`draft`). Container/marketing pair has matching configuration/consumption; `auth` and `dashboard` are manifest/lockfile scaffolds, without entry or composition reference, and do not count as units. Relationship to course material remains structural inference, not proof of intellectual code provenance. Some checklist answers should receive locatable references.
