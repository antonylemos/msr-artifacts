---
schema: 1
id: 770503403
full_name: ramyabala221190/toDoApp-module-federation
url: https://github.com/ramyabala221190/toDoApp-module-federation
commit: 9a6aa1517cf821c621d786afe272ad644157be12
classification: MFE-unit
checklist: { q1: no, q2: yes, q3: undetermined, q4: undetermined, q5: no }
repo_type: example
approaches: [module-federation]
ui_technologies: [angular]
build_tools: [webpack]
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 345 — ramyabala221190/toDoApp-module-federation

## Context

Angular 16 remote with `@angular-architects/module-federation` exposing a to-do list module, with its own Docker/nginx and Helm deployment. Description presents it as “the first micro-frontend of the module federation demo”, and the README refers routing and deployment to shell and another remote repositories (`README.md:24`, “All deployment, routing info given in users-app and shell-app repo”), absent from this snapshot. The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:346` records rank 345, ID 770503403, status `cloned`, branch `master` and the front matter commit, which is the HEAD of the clone and of `origin/master`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. There was no installation, build, execution or network access.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:346` records strategies `terminology;technology` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID appears in `data/discovery/mfe-round-001/candidates.csv:8000` and `data/discovery/mfe-round-002/candidates.csv:8006`, both with `terminology;technology` and `pass`.

A `sqlite3 -readonly` query against tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns the same five hits in each round, all from endpoint `repositories`, subquery `…#created:2024-03` and an empty `path`:

| Query (`q`) | Collection 001 / 002 (UTC) |
|---|---|
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | 2026-10-07T18:24:22.070Z / 2026-10-08T15:36:53.374Z |
| `terminology-microfrontends-repositories`: `microfrontends in:name,description,readme` | 2026-10-07T22:06:23.788Z / 2026-10-08T15:46:29.084Z |
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | 2026-10-07T22:18:52.971Z / 2026-10-08T15:53:11.159Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | 2026-10-07T22:49:49.032Z / 2026-10-08T16:04:51.115Z |
| `technology-module-federation-repositories`: `"module federation" in:name,description,readme` | 2026-10-07T23:16:14.988Z / 2026-10-08T16:13:27.818Z |

The effective queries append `pushed:>=2025-04-01 created:2024-03-01..2024-03-31`. Hit metadata: description “This is the first micro-frontend of the module federation demo”, no topics, language TypeScript, no license, `fork: false`, size 248, 1 star, created at 2024-03-11T17:02:33Z, pushed at 2026-01-11T16:22:30Z.

Text matches:
- “module federation” and “micro-frontend” (singular, hyphenated) appear in the description.
- “microfrontends” appears literally in the README only inside Windows directory paths (`README.md:2`, `4`, `22`, “…\angular\microfrontends\module-federation-updated…”).
- Unseparated singular “microfrontend” and separated plural “micro frontends” do not appear literally; these hits depend on GitHub search text processing, which is not recorded.

The last README change is `582aa47` (2026-01-11, “updated documentation”), before the collections on October 7 and 8, 2026; it does not postdate the searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 58 entries, all regular files `100644`; zero symlinks and zero gitlinks. A single Angular workspace at the root (`angular.json`, `package.json`, `src/`), plus `docker/`, `nginx/`, `charts/` and two workflows. | contrary |
| Configuration (remote) | `webpack.config.js:13–16`: `uniqueName: "toDoApp"`, `publicPath: "/toDoApp/"`; `:29–37`: `ModuleFederationPlugin` with `library: { type: "module" }`, `name: "toDoApp"`, `filename: "remote-toDoApp.js"`, `exposes: { './myToDoModule': './src/app/to-do/to-do.module.ts' }`; `:39–43`: `remotes` only in a comment; `:45–56`: Angular and `module-federation-config-lib` shared as singletons. `angular.json:18`, `68`, `80–81`: `ngx-build-plus` builders and port 5006. | moderate |
| Source code | `src/main.ts:1–2` → `src/bootstrap.ts:1–7`: asynchronous remote bootstrap. `src/app/to-do/to-do.module.ts:10–44`: module with child routes (`list`, `detail/:id`) and token `appName`, the exposed artifact; `src/app/app-routing.module.ts:4–7`: the app itself also loads it in standalone mode. | moderate |
| Build/deploy | `docker/Dockerfile:25–37`: build and copy to `/usr/share/nginx/html/toDoApp`, consistent with `publicPath`; `charts/angular-todo-app-module-federation/`: own Helm chart; `.github/workflows/app-build-deploy.yml:1`, `55–72`: build and push of own image. | moderate |
| Composition (external host) | No host in the repository; searching for `remotes` and `loadRemoteModule` finds only the commented block (`webpack.config.js:39–43`). The README refers to `shell-app` (`README.md:24`); the account has `ramyabala221190/shell-app-module-federation` and `users-module-federation` in the rounds (`data/discovery/mfe-round-002/candidates.csv:8005`, `8007`), outside the sample and not inspected. | absent |
| Source code (boundaries) | Search for `../` in `*.ts`, `*.js` and `*.json` (except lockfile): only `src/app/to-do/to-do-container/to-do-container.component.ts:5`, internal. There is a single unit. | context |

## Authorship and history

Non-shallow, partial clone (`blob:none`). 62 reachable commits (62 across all refs), no merges, all by `Ramya <ramya.bala221190@gmail.com>`, from 2024-03-11 (`0a860c2`, “initial commit”) to 2026-01-11 (SHA `9a6aa15`, “updated”). Federation configuration exists since `eba93dc` (2024-03-11, “first commit”). `git rev-list --objects $SHA --missing=print` identifies 148 missing historical objects; cited SHA files were read.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | A single frontend unit; composition configuration has only `exposes` (`webpack.config.js:35–37`) and references no other units. |
| Q2 | Yes | For the unit: own entry point, build, Docker image and Helm chart (`docker/Dockerfile`; `charts/…`; workflow). |
| Q3 | Undetermined | The shell is not in the repository (`README.md:24`). |
| Q4 | Undetermined | Remote side configured (`exposes`, `remote-toDoApp.js`, `publicPath`); consumer is not observable. |
| Q5 | No | Unit prepared for composition by an external host, not an MFE instance in the repository. |

## Rationale

- `MFE-unit` under the rule “a single frontend unit explicitly prepared to be composed by an external host (e.g., Module Federation `exposes`)… but the composing host is not observable”, as in finals 001 and 050.
- It matches “repositories containing only a remote unit, without the composing host”. The remote exposes a feature module with its own routes, not utilities (contrast with 089/100).
- `approaches: [module-federation]`, `ui_technologies: [angular]`, `build_tools: [webpack]` (`ngx-build-plus` with `webpack.config.js`), `frontend_units: 1`, `unit_organization: single-unit`, `repo_type: example` (“module federation demo”).
- There is no open decision.

## Analysis notes

- **Protocol (multi-repository ecosystem):** shell and another remote of the same demo are in separate repositories of the same account, present in rounds and outside the sample (`candidates.csv:8005`, `8007`); family analysis could observe complete composition.
- **RQ2:** Angular remote with MF in ESM format (`library: { type: "module" }`, `outputModule`), subpath `publicPath` and runtime configuration through `config.json` generated in the container (`docker/startup.envsh:2`).
- **RQ1:** the README term “microfrontends” comes from directory paths copied from the terminal.
