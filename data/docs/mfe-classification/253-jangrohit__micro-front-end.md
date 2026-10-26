---
schema: 1
id: 1176812762
full_name: jangrohit/micro-front-end
url: https://github.com/jangrohit/micro-front-end
commit: c6c0dbc9fb78b8baab20e74394647ca40b521355
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

# 253 — jangrohit/micro-front-end

## Context

Micro-frontends example with Webpack 5 Module Federation in `packages/`: `container` (React host) loads remote `marketing` (React, Landing and Pricing pages) at runtime (`README.md:1–3`, `:7–15`). `packages/auth` and `packages/dashboard` have only `package.json` and lockfile and are not connected to the host (`README.md:3`, `:47–48`). The `container`/`marketing`/`auth`/`dashboard` structure is the same as final 017 and draft 106. The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:254` records rank 253, ID 1176812762, status `cloned`, branch `main` and the front matter commit, which is the HEAD of the clone and of `origin/main`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. There was no installation, build, execution or network access.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:254` records strategies `terminology;technology` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID appears in `data/discovery/mfe-round-001/candidates.csv:26122` (`unknown`) and `data/discovery/mfe-round-002/candidates.csv:26129` (`pass`), both with `terminology;technology`.

A `sqlite3 -readonly` query against tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns the same five hits in each round:

| Query (`q`) | Endpoint | Subquery | `path` | Collection 001 / 002 (UTC) |
|---|---|---|---|---|
| `technology-module-federation-plugin-js-code`: `ModuleFederationPlugin remotes extension:js` | code | `…#size:600..699` | `packages/container/config/webpack.dev.js` | 2026-10-07T22:23:05.816Z / 2026-10-08T16:05:36.364Z |
| same | code | `…#size:800..899` | `packages/container/config/webpack.prod.js` | 2026-10-07T22:24:25.945Z / 2026-10-08T16:06:42.334Z |
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | repositories | `…#created:2026-03` | empty | 2026-10-07T22:33:05.012Z / 2026-10-08T15:58:29.833Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | repositories | `…#created:2026-03` | empty | 2026-10-07T23:01:18.996Z / 2026-10-08T16:08:27.917Z |
| `technology-module-federation-repositories`: `"module federation" in:name,description,readme` | repositories | `…#created:2026-03` | empty | 2026-10-07T23:23:54.590Z / 2026-10-08T16:17:20.346Z |

Repository queries append `pushed:>=2025-04-01 created:2026-03-01..2026-03-31`; code queries, the `size:` range.

Hit metadata (identical in both rounds): description “Micro front end application ”, no topics, language JavaScript, `fork: false`, size 148, created at 2026-03-09T12:02:03Z, pushed at 2026-09-27T13:40:59Z.

Matches at the SHA:
- **Code:** both matched files have 637 and 815 bytes, within the ranges, and contain `ModuleFederationPlugin` and `remotes` (`packages/container/config/webpack.dev.js:3`, `:14–20`; `packages/container/config/webpack.prod.js:3`, `:19–25`).
- **“micro frontend”:** `README.md:1` (“# Micro Frontend Project”) and `README.md:3`. The description "Micro front end" does not contain the literal phrase; name `micro-front-end` and description are separator variants, and it cannot be proved that search did not consider them, because text processing is not recorded (the README is direct textual evidence, without demonstrable exclusivity).
- **“micro frontends”:** `README.md:3` (“connected to the host as micro frontends”).
- **“module federation”:** `README.md:3` (“Webpack 5 Module Federation”), also `:19`, `:25`, `:39`.

The README exists only at the SHA (`c6c0dbc`, “Create README.md”, 2026-09-27T19:10:55+05:30, that is, 13:40:55Z), which coincides with `pushed_at`. It predates the October 2026 collections, and the README at the SHA does not postdate the searches. The two code hit files were also not changed afterward.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 30 entries, all regular files `100644`; zero symlinks and zero gitlinks. No `package.json` at the root. `packages/container` and `packages/marketing` have `package.json`, lockfile, `config/webpack.{common,dev,prod}.js`, `public/index.html` and `src/`. `packages/auth` and `packages/dashboard` have only `package.json` and lockfile. Two workflows in `.github/workflows/`. | context |
| Configuration (host) | `packages/container/config/webpack.dev.js:14–20`: `ModuleFederationPlugin({ name: "container", remotes: { marketing: "marketing@http://localhost:8081/remoteEntry.js" }, shared })`. `packages/container/config/webpack.prod.js:19–25`: the same remote at `${PRODUCTION_DOMAIN}/marketing/latest/remoteEntry.js`; `publicPath: "/container/latest/"` (`:10`). | strong |
| Configuration (remote) | `packages/marketing/config/webpack.dev.js:15–22` and `packages/marketing/config/webpack.prod.js:19–26`: `name: "marketing"`, `filename: "remoteEntry.js"`, `exposes: { "./MarketingApp": "./src/bootstrap" }`; port 8081 (`webpack.dev.js:9`), `publicPath: "/marketing/latest/"` (`webpack.prod.js:10`). | strong |
| Source code (composition) | `packages/container/src/components/MarketingApp.js:3`: `import { mount } from "marketing/MarketingApp"`; `:8–11`: calls `mount(ref.current)` in a host `div`. `packages/container/src/App.js:2`, `:17–20`: renders `Header` and `MarketingApp`. `packages/marketing/src/bootstrap.js:5–7`, `:17`: exports `mount(el)`; `:9–14`: standalone mounting in development. Both use `src/index.js:1` → `import("./bootstrap")`. | strong |
| Configuration (chain match) | Name `marketing` in the host `remotes` matches remote `name`; module `MarketingApp` matches `./MarketingApp` in `exposes`; port 8081 and path `/marketing/latest/` match remote `devServer.port` and `publicPath`. | strong |
| Source code (boundaries) | Active search in imports from `packages/container/src` and `packages/marketing/src`: only local imports (`./App`, `./components/*`) and npm packages. The host references the remote only through federated module `marketing/MarketingApp`. There is no `../` in `src/`; config `require("../package.json")` (`webpack.dev.js:4`, `webpack.prod.js:4`) read the package’s own manifest. | context |
| Build/deploy | Own build per package (`packages/container/package.json:4–7`; `packages/marketing/package.json:4–7`). `.github/workflows/container.yml:8–9`, `:30–42` and `.github/workflows/marketing.yml:8–9`, `:30–40`: separate path-based workflows, each builds the package and syncs `dist` to `s3://…/container/latest` or `…/marketing/latest`, with CloudFront invalidation (container `index.html`, marketing `remoteEntry.js`). | strong |
| Structure (inactive packages) | `packages/auth/package.json:1–29` has only a test script; `packages/dashboard/package.json:4–7` references `config/webpack.*.js` absent from the tree. Neither is referenced by the host. `README.md:47–48` records the same state. | context |
| Documentation | `README.md:17–39`: describes host, remote, runtime loading and mounting through `mount`. `README.md:104` claims the repository does not include a deployment pipeline, contradicting the present workflows; the deployment citation uses the workflows. `README.md:106–108` records nested `BrowserRouter` between host and remote. | moderate |

## Authorship and history

Non-shallow and partial clone (`blob:none`). There are 15 commits (15 across all refs), no merges, all by `Rohit Jangid <rohitjangid1931995@gmail.com>` as author and committer:
- root `f107f7b` (2026-03-09T17:36:13+05:30, “initial commit”) adds the four packages at once;
- `9abb742` and `343ea03` (2026-03-09, “created container deploy script”, “added deploy scripts”) adjust container and marketing production configs;
- from 2026-09-27 are commits `5d05e98` (container workflow), `cbf22ee` (“update public path”), `8c1fbfa` (CloudFront invalidation), `988cc53` (`Header`), `c4c1e01` (“fix css conflict name space”) and the SHA (README).

By path (`git log --no-renames`): `packages/container` 9 commits, `packages/marketing` 4, `packages/auth` 1, `packages/dashboard` 1, `.github` 4. The structure matches micro-frontends courses (final 017); addition in bulk does not allow claiming whether code was written from scratch or followed teaching material, and there is no declaration of third-party origin in the repository.

`git rev-list --objects $SHA --missing=print` lists 19 missing objects, none in the SHA tree (earlier versions of changed files). No historical blob was read.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | Yes | Two units: `container` and `marketing`, the latter referenced in host `remotes` (`packages/container/config/webpack.dev.js:16–18`). `auth` and `dashboard` are not counted, because they have neither entry point nor code. |
| Q2 | Yes | Each unit has its own entry point (`src/index.js` → `bootstrap.js`), HTML, Webpack configs and build (`packages/*/package.json:4–7`), plus separate deployment workflows. There is no source code import between them (recorded search). |
| Q3 | Yes | The host mounts the remote on its page (`packages/container/src/components/MarketingApp.js:8–11`; `packages/container/src/App.js:17–20`). |
| Q4 | Yes | Module Federation configured on both sides, with matching name, exposed module, port and production path, and consumed through `import { mount } from "marketing/MarketingApp"` (`MarketingApp.js:3`). |
| Q5 | Yes | Q1–Q4 converge. |

## Rationale

- `MFE-implemented`: Q1–Q5 Yes. It matches “monorepos containing a host and its remotes” and “examples… that actually compose frontend units”.
- Same complete chain as 076/084/096/106/109 and final 017 (same course structure, with `container` and remotes through `mount`). Here only `marketing` is connected; `auth` and `dashboard` are unreferenced skeletons.
- This is not code sharing (089/100): the remote is a React application with its own routes (`packages/marketing/src/App.js:14–18`), mounted by the host.
- This is not an unconnectable chain (097/103/104): name, module and addresses match.
- This is not content or an exercise without implementation (023/075/081/094/105): both units exist and compose.
- `frontend_units: 2`, `unit_organization: monorepo`, `approaches: [module-federation]`, `ui_technologies: [react]` (Vue appears only in the dependencies of `dashboard` without code), `build_tools: [webpack]`, `repo_type: example`.
- There is no open decision.

## Analysis notes

- **RQ1 (misleading signals):** `README.md:104` says there is no deployment pipeline, but there are two workflows with separate deployment per unit; documentation lags behind code.
- **RQ1:** `packages/dashboard/package.json` declares Vue/PrimeVue without code or configuration; counting technologies from manifests would overestimate heterogeneity.
- **RQ3:** independent deployment per unit with convention `/<app>/latest/` on S3/CloudFront, invalidating remote `remoteEntry.js` and host `index.html`.
- **Protocol (families):** structure `container`/`marketing`/`auth`/`dashboard` also appears in 017 (final) and 106 (draft). Without an upstream declaration in the repository, no copy of a specific candidate is presumed.
- **Independent review contribution (Lupa):** full agreement with MFE-implemented, Q1–Q5 Yes, two units, `monorepo`, React/webpack and `module-federation`; no open decision (`draft`). The 19 missing historical objects are correctly recorded. Router precision: there is `BrowserRouter` in host and remote, but `marketing/src/bootstrap.js:6` calls `ReactDOM.render` creating a separate React root inside the host element, so the host router context is not inherited, and the README nested Router error (`README.md:106–108`) should not be treated as a reproduced failure; the concrete limitation is the absence of a navigation synchronization contract between the two roots (the wrapper passes only `el`, without `initialPath`/`onNavigate`/`onParentNavigate`, and returns no cleanup), which concerns robustness and does not invalidate federated mounting. `README.md:104` claims no pipeline, contradicted by both versioned workflows. `auth` and `dashboard` are not units (auth without an application, dashboard with missing configs and no host connection). Nothing was executed.
