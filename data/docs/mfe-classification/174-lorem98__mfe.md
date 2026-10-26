---
schema: 1
id: 1150753074
full_name: lorem98/mfe
url: https://github.com/lorem98/mfe
commit: 44eb29500d7b90ac58ec760e35b8e0170d7b6fb4
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

# 174 — lorem98/mfe

## Context

“Micro Frontend PoC — Webpack Module Federation” (`README.md:1–5`): monorepo with four webpack 5 packages.
- `container` (React 17): shell consuming all three remotes.
- `marketing` and `auth` (React 17): remotes exposing `mount`.
- `dashboard` (Vue 3): remote mounted within React without an interop library.

Each package has its own S3/CloudFront deployment workflow. The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:175` records rank 174, ID 1150753074, status `cloned`, branch `master` and the front matter commit, which is HEAD of the clone and `origin/master`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, with reading through `${SHA}:caminho` (the original placeholder means SHA:path). No installation, build, execution or network access occurred.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:175` records strategies `terminology;technology` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID is in `data/discovery/mfe-round-001/candidates.csv:24472` (`unknown`) and `data/discovery/mfe-round-002/candidates.csv:24479` (`pass`).

A `sqlite3 -readonly` query of the `hits`, `queries` and `subqueries` tables from both rounds, filtered by ID, returns the same four hits in each round:

| Query (`q`) | Endpoint | Subquery | `path` | Collection 001 / 002 (UTC) |
|---|---|---|---|---|
| `technology-module-federation-plugin-js-code`: `ModuleFederationPlugin remotes extension:js` | code | `…#size:700..799` | `packages/container/config/webpack.dev.js` | 2026-10-07T22:23:51.937Z / 2026-10-08T16:06:18.116Z |
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | repositories | `…#created:2026-02` | empty | 2026-10-07T22:32:05.378Z / 2026-10-08T15:58:08.819Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | repositories | `…#created:2026-02` | empty | 2026-10-07T23:00:40.387Z / 2026-10-08T16:08:10.841Z |
| `technology-module-federation-repositories`: `"module federation" in:name,description,readme` | repositories | `…#created:2026-02` | empty | 2026-10-07T23:23:04.794Z / 2026-10-08T16:17:03.151Z |

Repository queries append `pushed:>=2025-04-01 created:2026-02-01..2026-02-28`; the code query appends `size:700..799`.

Hit metadata:
- null description, no topics, language JavaScript, `fork: false`, size 245;
- created at 2026-02-05T16:44:19Z, pushed at 2026-05-21T13:57:41Z.

Spellings and lines:
- **Code:** the matched file has 771 bytes at the SHA, within the range, and contains `ModuleFederationPlugin` and `remotes` (`packages/container/config/webpack.dev.js:2`, `15–21`).
- **README:** “Micro Frontend” at `README.md:1`, “micro frontend” at `README.md:3` and “Module Federation” at `README.md:1`, `3`, `5`, `32` and elsewhere.
- **Without literal spelling:** plural “micro frontends” does not appear in the README or description; that hit depends on GitHub search text processing, which is not recorded.

The README was created in `91feee5` (2026-05-11) and never changed afterward, preceding October 2026 collection. The SHA's README does not postdate searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 51 entries, all regular `100644` files; zero symlinks and zero gitlinks. Four packages in `packages/` (`container`, `marketing`, `auth`, `dashboard`), each with `package.json`, `config/webpack.{common,dev,prod}.js`, `public/index.html` and `src/` with `index.js` → `bootstrap.js`. Four workflows in `.github/workflows/`. No root workspace. | context |
| Configuration (host) | `packages/container/config/webpack.dev.js:15–23`: `remotes` `marketing`, `auth` and `dashboard` at `localhost:8081/8082/8083/remoteEntry.js`. `packages/container/config/webpack.prod.js:15–23`: same remotes at `${PRODUCTION_DOMAIN}/<pacote>/latest/remoteEntry.js` (the original placeholder means package). | strong |
| Configuration (remotes) | `packages/marketing/config/webpack.dev.js:16–22` and `webpack.prod.js:13–20`: `exposes: { './MarketingApp': './src/bootstrap' }`. `packages/auth/config/webpack.dev.js:15–23`: `exposes: { './AuthApp' }`. `packages/dashboard/config/webpack.dev.js:16–30` and `webpack.prod.js:15–27`: `exposes: { './DashboardApp' }`, with singleton `vue`. | strong |
| Source code (composition) | `packages/container/src/App.js:13–49`: routes `/auth`, `/dashboard` (protected by `signedIn`) and `/`, each rendering a wrapper. `src/components/MarketingApp.js:1–25`, `AuthApp.js:21–41` and `DashboardApp.js:15–26`: `import { mount } from "<remote>/<App>"` and `mount(ref.current, …)`, with bidirectional history synchronization (`onNavigate`/`onParentNavigate`) and callback `onSignIn`. `packages/marketing/src/bootstrap.js:7–46` and `packages/dashboard/src/bootstrap.js:12–36`: exported `mount`, with embedded memory history and standalone execution in development. | strong |
| Source code (boundaries) | Searching for `../../` imports in `packages` returns nothing. Cross-package imports are only federated (`marketing/MarketingApp`, `auth/AuthApp`, `dashboard/DashboardApp`). | context |
| Build/deploy | `.github/workflows/container.yml:1–36`: build with `PRODUCTION_DOMAIN`, `aws s3 sync dist s3://…/container/latest` and CloudFront invalidation, triggered only by changes in `packages/container/**`. Analogous workflows exist for `marketing`, `auth` and `dashboard`. webpack 5 versions are declared per package (for example, `packages/container/package.json:26`; `packages/dashboard/package.json:29`). | strong |

## Authorship and history

Non-shallow clone; 17 commits, no merges, all by `lorem98 <lorenzo.medda24@gmail.com>`, from 2026-02-05 (`ba3fc6f`, “Initial commit”) to 2026-05-21 (SHA `44eb295`, “Revert previous temp commit”).
- **Marketing:** `container` and `marketing` with workflows date from February.
- **Navigation:** bidirectional navigation enters in `2be6f54` (2026-03-24).
- **Auth and dashboard:** `6af9f6d` creates auth and `91feee5` creates dashboard and README (2026-05-11); auth and dashboard workflows enter in `60008a4`.

The structure (`container`, `marketing`, `auth` and `dashboard` with `mount`, memory history and S3/CloudFront `latest` deployment) resembles a course outline, but that origin is an unverified hypothesis: neither citations nor local history identify a course, common source or replication extent. Incremental history and extensions (Vue 3 with Chart.js, its own README) show evolution by author `lorem98`, without proving intellectual authorship. `git diff` for temporary commit `d1cf5a5` did not complete because of a missing blob in the partial clone (`9aaa14e3…`), which was not fetched; the clone remained unchanged.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | Yes | Four units in the repository, referenced by container composition configuration (`packages/container/config/webpack.dev.js:17–21`). |
| Q2 | Yes | Each package has its own entry, build and deployment (`config/webpack.*.js`; per-package workflows with their own `paths`), without source code imports between them. |
| Q3 | Yes | The container mounts all three remotes by route in the same shell (`packages/container/src/App.js:25–44`). |
| Q4 | Yes | Module Federation configured in host and remotes, consumed through `import { mount }` and called in wrappers (`MarketingApp.js:1`, `10`; `AuthApp.js:1`, `26`; `DashboardApp.js:1`, `21`). |
| Q5 | Yes | Q1–Q4 are Yes: shell with three remotes (React and Vue) and independent deployment. |

## Rationale

- `MFE-implemented` under the Q1–Q5 Yes rule. Matches “monorepos containing a host and its remotes” and “examples… that actually compose frontend units”.
- The chain is complete in the snapshot, as in 076/084/096/106/109, with independent deployment per package. Exposed modules are whole applications mounted by route, rather than shared components, so the code sharing uncertainty in 089/100 does not apply.
- Even if originating from a course outline (unverified hypothesis), this does not reduce the case to content or an exercise without composition (023/094): the checklist includes “examples… that actually compose frontend units”, and composition is implemented.
- `approaches: [module-federation]`, `ui_technologies: [react, vue]`, `build_tools: [webpack]`, `frontend_units: 4`, `unit_organization: monorepo`, `repo_type: example` (“PoC”, `README.md:1`).
- No decision remains open.

## Analysis notes

- **RQ2:** integration through `mount(el, props)` exposed by each remote, framework-independent (React and Vue 3), with routing synchronization between memory history and browser history and authentication state passed through callback.
- **RQ3:** one CI/CD workflow per unit, with `paths` filter, publishing to `/<pacote>/latest/` (the original placeholder means package) on S3 and invalidating CloudFront. Explicit independent deployment.
- **Protocol (search):** four queries match, including code search in the container's `webpack.dev.js`. Plural hit `"micro frontends"` has no literal spelling. Eligibility changes from `unknown` (001) to `pass` (002).
- **Independent review contribution (Lupa):** full agreement with MFE-implemented, Q1–Q5 Yes, `module-federation`, `[react, vue]`, `webpack`, four units and `monorepo`; no open decision (`draft`). The container → three remotes chain (each remote exposes a bootstrap with `mount`, mounted by the container in a route, including the Vue 3 unit) is confirmed in names, files, entries and code. Verified operational caveat: `auth.yml:32` and `dashboard.yml:32` invalidate only `/auth/latest/index.html` and `/dashboard/latest/index.html`, while the host consumes `remoteEntry.js`; remote cache updates may not occur, limiting the claim of fully operational production deployment, without undoing composition or per-package deployment. Q2 should use `src/index.js` and `package.json:4–6` of each package, rather than wildcard `config/webpack.*.js`; negative import searches should record scope and terms. Tree (`git ls-tree`) and SQLite results are structured data, without text lines.
