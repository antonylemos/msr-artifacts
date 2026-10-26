---
schema: 1
id: 997062622
full_name: charger17/mfe
url: https://github.com/charger17/mfe
commit: c04d19eb237bd77ce574657d732efe265c0de531
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
approaches: [module-federation]
ui_technologies: [react, vue]
build_tools: [webpack]
frontend_units: 4
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 197 — charger17/mfe

## Context

webpack 5 monorepo with Module Federation and four packages in `packages/`:
- `container` (React), consuming all three remotes;
- `marketing` and `auth` (React), exposing `mount`;
- `dashboard` (Vue 3), also with `mount`.

Each package has an S3/CloudFront deployment workflow. No README; `readme.txt` has 2 bytes (one empty line). Same structure as drafts 174 and 177; the hypothesis that they follow a common course outline is unverified. The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:198` records rank 197, ID 997062622, status `cloned`, branch `main` and the front matter commit, which is HEAD of the clone and `origin/main`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, with reading through `${SHA}:caminho` (the original placeholder means SHA:path). No installation, build, execution or network access occurred.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:198` records strategy `technology` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID is in `data/discovery/mfe-round-001/candidates.csv:14785` (`unknown`) and `data/discovery/mfe-round-002/candidates.csv:14791` (`pass`).

A `sqlite3 -readonly` query of the `hits`, `queries` and `subqueries` tables from both rounds, filtered by ID, returns the same two hits in each round, from endpoint `code`:

| Query (`q`) | Subquery | `path` | Collection 001 / 002 (UTC) |
|---|---|---|---|
| `technology-module-federation-plugin-js-code`: `ModuleFederationPlugin remotes extension:js` | `…#size:800..899` | `packages/container/config/webpack.prod.js` | 2026-10-07T22:24:34.518Z / 2026-10-08T16:06:49.049Z |
| same | same | `packages/container/config/webpack.dev.js` | 2026-10-07T22:24:45.226Z / 2026-10-08T16:06:54.346Z |

Matched files have 855 and 864 bytes at the SHA, within the range, and contain `ModuleFederationPlugin` with `remotes` (`packages/container/config/webpack.prod.js:2`, `15–23`; `webpack.dev.js:2`, `18–26`). Code hit metadata lacks description, topics and dates. No README with spellings to cite; entry is code-only.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 47 entries, all regular `100644` files; zero symlinks and zero gitlinks. Four packages (`container`, `marketing`, `auth`, `dashboard`), each with `package.json`, `config/webpack.{common,dev,prod}.js`, `public/index.html` and `src/` with `index.js` → `bootstrap.js`. Also four workflows and empty `readme.txt`. No root workspace. | context |
| Configuration (host) | `packages/container/config/webpack.dev.js:18–26`: `remotes` `marketing`, `auth` and `dashboard` at `localhost:8081/8082/8083`. `packages/container/config/webpack.prod.js:15–23`: same at `${domain}/<pacote>/latest/remoteEntry.js` (the original placeholder means package). | strong |
| Configuration (remotes) | `packages/marketing/config/webpack.dev.js:19–26`: `exposes: { './MarketingApp': './src/bootstrap' }`. `packages/auth/config/webpack.dev.js:19–26`: `./AuthApp`. `packages/dashboard/config/webpack.dev.js:22–29`: `./DashboardApp`. `webpack.prod.js` files have the same `exposes`, with `publicPath` `/<pacote>/latest/` (the original placeholder means package). | strong |
| Source code (composition) | `packages/container/src/App.js:11–13`, `41–56`: wrapper `lazy` and routes `/auth`, `/dashboard` (redirect if unauthenticated) and `/`. `src/components/MarketingApp.js:1`, `10–20`, `AuthApp.js:1`, `10–24` and `DashboardApp.js:1`, `8`: remote `import { mount }` and call with history synchronization and `onSignIn`. `packages/dashboard/src/bootstrap.js:4–17`: `mount` creates a Vue 3 app. | strong |
| Source code (boundaries) | Searching for `../../` imports at the SHA returns nothing; packages connect only through federated modules. | context |
| Build/deploy | `.github/workflows/container.yml:1–54`: build with `PRODUCTION_DOMAIN`, `aws s3 sync dist …/container/latest` and CloudFront invalidation, triggered by `packages/container/**`. Analogous workflows for `auth`, `dashboard` and `marketing`, with their own `paths` and destinations. | strong |

## Authorship and history

Non-shallow clone; 44 commits, no merges. 42 by Carlos Perez (noreply) and 2 by “Carlos” `<cps172779@gmail.com>`, from 2025-06-05 (`c353631`, “Create readme.txt”) to 2025-06-16 (SHA `c04d19e`, “Add files via upload”). Files were submitted through the web interface in several upload and edit commits, without history showing local development. No historical blob was read. The clone is partial (`blob:none`) and `git rev-list --objects --all` ends with a missing historical blob error (`e5ad16d…`), so completeness of all historical blobs is not asserted; SHA tree and cited passages were read.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | Yes | Four units in the repository, referenced by container composition configuration (`packages/container/config/webpack.dev.js:20–24`). |
| Q2 | Yes | Each package has its own entry, build and deployment (`config/webpack.*.js`; workflows with per-package `paths`), without source code imports between them. |
| Q3 | Yes | Container mounts all three remotes by route (`packages/container/src/App.js:41–56`). |
| Q4 | Yes | Module Federation configured in host and remotes, consumed through `import { mount }` and called in wrappers. |
| Q5 | Yes | Q1–Q4 are Yes: shell with three remotes (React and Vue) and independent deployment. |

## Rationale

- `MFE-implemented` under the Q1–Q5 Yes rule. Matches “monorepos containing a host and its remotes” and “examples… that actually compose frontend units”.
- The chain is complete in the snapshot, as in 076/084/096/106/109. Remotes expose applications mounted by route, rather than shared components (089/100).
- Structure follows the same course outline as 174 and 177 (`container`/`marketing`/`auth`/`dashboard` with `mount` and S3/CloudFront `latest` deployment). As there, composition is implemented and not reduced to content (023/094).
- `approaches: [module-federation]`, `ui_technologies: [react, vue]`, `build_tools: [webpack]`, `frontend_units: 4`, `unit_organization: monorepo`, `repo_type: example`.
- No decision remains open.

## Analysis notes

- **RQ2:** integration through `mount(el, { initialPath, onNavigate, onSignIn })` between React container and React/Vue remotes, with memory history in remotes.
- **Protocol (sample):** third sample repository with this same course architecture (see 174 and 177).
- **Protocol (search):** entry only through code search in both container `webpack.*.js`. Eligibility changes from `unknown` (001) to `pass` (002).
- **Independent review contribution (Lupa):** full agreement with MFE-implemented, Q1–Q5 Yes, `module-federation`, `[react, vue]`, `webpack`, four units and `monorepo`; no open decision (`draft`). Chain is proven: host declares three remotes (`packages/container/config/webpack.dev.js:18–26`; `webpack.prod.js:15–23`), each remote exposes its module (`./MarketingApp`, `./AuthApp`, `./DashboardApp`) and container wrappers import these specifiers (`packages/container/src/App.js:11–13,41–56`); workflows publish each package under its own S3 prefix. No README (only 2-byte `readme.txt`), so no README postdating searches. Presentation gaps: Q2 should cite manifests and configurations per package, and Q4 and Q5 should point to `remotes`/`exposes` chain and wrapper imports. Final comparables: 009 and 052; 174 and 177 have the same four-package React/Vue format, but are `draft`.
