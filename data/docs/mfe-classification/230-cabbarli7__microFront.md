---
schema: 1
id: 1069376251
full_name: cabbarli7/microFront
url: https://github.com/cabbarli7/microFront
commit: 21d96cae42566b614f746ab103e217814621c601
classification: Uncertain
checklist: { q1: yes, q2: yes, q3: yes, q4: undetermined, q5: undetermined }
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

# 230 — cabbarli7/microFront

## Context

Webpack 5 repository with Module Federation in `packages/`:
- `container` (React, host), which mounts `marketing`;
- `marketing` (React, remote), which exposes `mount`;
- `auth` and `dashboard`, which have only `package.json` and lockfile.

There is an S3 deployment workflow only for `container`. There is no README. The structure and names match the course walkthrough in drafts 174, 177, 197 and 216. However, two aspects of the snapshot prevent claiming the configuration works as written:
- all webpack configurations use `require("../../package.json")`, which points to a nonexistent `packages/package.json`;
- the remote production configuration exposes a different key (`./MarketingApp`) from the one imported by the host (`marketing/Marketing`).

The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:231` records rank 230, ID 1069376251, status `cloned`, branch `master` and the front matter commit, which is the HEAD of the clone and of `origin/master`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. There was no installation, build, execution or network access.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:231` records strategy `technology` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID appears in `data/discovery/mfe-round-001/candidates.csv:19529` (`unknown`) and `data/discovery/mfe-round-002/candidates.csv:19535` (`pass`).

A `sqlite3 -readonly` query against tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns the same two hits in each round, from endpoint `code`:

| Query (`q`) | Subquery | `path` | Collection 001 / 002 (UTC) |
|---|---|---|---|
| `technology-module-federation-plugin-js-code`: `ModuleFederationPlugin remotes extension:js` | `…#size:600..699` | `packages/container/config/webpack.prod.js` | 2026-10-07T22:22:58.742Z / 2026-10-08T16:05:30.505Z |
| same | same | `packages/container/config/webpack.dev.js` | 2026-10-07T22:23:05.816Z / 2026-10-08T16:05:36.364Z |

The files have 653 and 647 bytes at the SHA, within the range, and contain `ModuleFederationPlugin` with `remotes`. Code hit metadata is empty. There is no README; entry is through code only.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 27 entries, all regular files `100644`; zero symlinks and zero gitlinks. `container` and `marketing` have `package.json`, `config/webpack.{common,dev,prod}.js`, `public/index.html` and `src/` (`index.js` → `bootstrap.js`). `auth` and `dashboard` have only `package.json` and lockfile. There is no `package.json` at the root or in `packages/`. | context |
| Configuration (host) | `packages/container/config/webpack.dev.js:16–22`: `ModuleFederationPlugin` with `name: "container"` and `remotes: { marketing: "marketing@http://localhost:8081/remoteEntry.js" }`. `webpack.prod.js:14–20`: `marketing@${domain}/marketing/remoteEntry.js`, with `domain = process.env.PRODUCTION_DOMAIN` (`:6`). | strong |
| Configuration (remote) | `packages/marketing/config/webpack.dev.js:19–26`: `name: "marketing"`, `filename: "remoteEntry.js"`, `exposes: { "./Marketing": "./src/bootstrap" }`, port 8081 (`:10`). `webpack.prod.js:13–19`: `exposes: { "./MarketingApp": "./src/bootstrap" }`, without `filename`. | strong |
| Source code (composition) | `packages/container/src/components/MarketingApp.js:1–11`: `import { mount } from "marketing/Marketing"` and `mount(ref.current)`. `packages/container/src/App.js:4–12`: mounts `MarketingApp`. `packages/marketing/src/bootstrap.js:5–16`: `mount` renders the app and mounts itself only in standalone development. | strong |
| Configuration (inconsistency) | The four federation configurations use `const packageJson = require("../../package.json")` (`packages/container/config/webpack.dev.js:5`; `webpack.prod.js:3`; `packages/marketing/config/webpack.dev.js:5`; `webpack.prod.js:3`) and use `shared: packageJson.dependencies`. From `packages/<pacote>/config/`, `../../package.json` resolves to `packages/package.json`, which does not exist in the snapshot. The package’s own data is in `packages/<pacote>/package.json` (`../package.json`). Additionally, the key exposed in production (`./MarketingApp`) differs from the one imported by the host (`marketing/Marketing`). | ambiguous |
| Build/deploy | `packages/container/package.json:4–7` and `packages/marketing/package.json:4–7`: their own `start`/`build` scripts. `.github/workflows/comtainer.yml:1–27`: deployment only of `container` to S3 (`/container/latest`), without invalidation or `PRODUCTION_DOMAIN`; there is no workflow for `marketing`. | moderate |
| Source code (boundaries) | The only `../..` are these configuration `require`; there are no source code imports between packages. | context |

## Authorship and history

Non-shallow clone; 4 linear commits, no merges, all by Elvin `<cabbarli.elvin75@gmail.com>`, between 2025-10-03 and 2025-10-04:
- `356eb21` (“First commit”): adds the packages;
- `fb1ed07` (“Deployment configuration added”): adds the workflow and changes the webpack configurations of both packages;
- `9b522a6` and SHA `21d96ca` (“YML update”/“YML update v2”): adjust the workflow.

No historical blob was read, and whether the `require` differed before `fb1ed07` was not checked. There was no missing object.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | Yes | Two implemented units, the remote referenced by the host composition configuration (`packages/container/config/webpack.dev.js:18–20`). |
| Q2 | Yes | Each package has its own entry point, configuration and build scripts, without source code imports between them. |
| Q3 | Yes | The container mounts the remote (`packages/container/src/App.js:9`; `MarketingApp.js:7–9`). |
| Q4 | Undetermined | The mechanism is configured and consumed, but the configurations as written require a nonexistent file (`require("../../package.json")`) and differ between development and production in the exposed key. Under the criterion, “a configuration whose actual use is unclear is Undetermined”. |
| Q5 | Undetermined | No No answer and Q4 Undetermined. |

## Rationale

- `Uncertain` under the rule “No question is No, but at least one is Undetermined”, with `status: review`.
- **Intent:** this is the course walkthrough from 174/177/197/216, in which host and remote connect through `mount`.
- **Inconsistency:** here the configurations point to a `package.json` outside the packages, which does not exist. This is the same type of situation as 103 (`Uncertain`/review): consumer and producer present, but the chain does not complete as written. Therefore Q4 Yes is not claimed without deciding whether the resolution failure is a fixable detail or absence of a functional mechanism.
- **It is not Non-MFE as in 097:** there the configuration was not connected to the build; here it is called by the scripts (`package.json:5–6`) and the code consumes the remote.
- **Fields:** `approaches: [module-federation]`, `ui_technologies: [react]`, `build_tools: [webpack]`, `frontend_units: 2` (`auth` and `dashboard` have only manifests, as in 216), `unit_organization: monorepo`, `repo_type: example`.

## Analysis notes

- **RQ1 (misleading signals):** code search matches `ModuleFederationPlugin` with `remotes` in a configuration that, as versioned, does not resolve its `package.json` dependency.
- **Protocol (sample):** fifth repository in the sample with this course architecture (174, 177, 197, 216).
- **Protocol (search):** eligibility `unknown` (001) and `pass` (002); the default branch is `master`.

## Recorded decision

Retained as `Uncertain`. Host and remote implement composition through Module Federation and `mount`, but the configurations require a nonexistent `package.json` and differ between development and production in the exposed key. The chain exists, but the snapshot does not allow confirming that it works as versioned.
