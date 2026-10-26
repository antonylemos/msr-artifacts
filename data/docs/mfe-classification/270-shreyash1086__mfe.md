---
schema: 1
id: 1248756347
full_name: shreyash1086/mfe
url: https://github.com/shreyash1086/mfe
commit: b0fdd18d2ef6beb846fa0a534b9458669405fe6b
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: production
approaches: [module-federation]
ui_technologies: [react]
build_tools: [webpack]
frontend_units: 10
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 270 — shreyash1086/mfe

## Context

React platform with Webpack 5 Module Federation, Docker and nginx, organized in a single repository with:
- a `shell-app` (host);
- nine remote modules (`module-*`);
- a `shared-design-system`, also a federated remote and local package.

The shell loads remotes at runtime through `remoteEntry.js` injection with URLs from runtime configuration, and mounts them by route. Each unit has its own `webpack.config.js`, `Dockerfile` and `nginx.conf`, orchestrated by `docker-compose.yml` behind an nginx gateway. The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:271` records rank 270, ID 1248756347, status `cloned`, branch `main` and the front matter commit, which is the HEAD of the clone and of `origin/main`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. There was no installation, build, execution or network access.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:271` records strategies `terminology;technology` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID appears in `data/discovery/mfe-round-001/candidates.csv:30647` (`unknown`) and `data/discovery/mfe-round-002/candidates.csv:30654` (`pass`).

A `sqlite3 -readonly` query against tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns the same 14 hits in each round.

**Endpoint `repositories`** (subquery `…#created:2026-05`, empty `path`):

| Query (`q`) | Collection 001 / 002 (UTC) |
|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | 2026-10-07T22:36:09.969Z / 2026-10-08T15:59:38.691Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | 2026-10-07T23:04:49.839Z / 2026-10-08T16:09:11.654Z |
| `technology-module-federation-repositories`: `"module federation" in:name,description,readme` | 2026-10-07T23:26:38.626Z / 2026-10-08T16:18:13.090Z |

**Endpoint `code`** (query `technology-module-federation-plugin-js-code`, `ModuleFederationPlugin remotes extension:js`): 11 hits in `webpack.config.js` and `webpack.prod.config.js`.

| Subquery | `path` |
|---|---|
| `…#size:2000..2249` | `module-cloud-labs/webpack.config.js`, `shell-app/webpack.prod.config.js`, `module-virtual-machine/webpack.config.js`, `module-assessment/webpack.config.js`, `module-dashboard/webpack.config.js`, `module-logging/webpack.config.js` |
| `…#size:2250..2499` | `module-cloud-console/webpack.config.js`, `module-code-environment/webpack.config.js`, `module-code-module/webpack.config.js` |
| `…#size:2750..2999` | `module-content-uploading/webpack.config.js` |
| `…#size:3000..3999` | `shell-app/webpack.config.js` |

Collections from endpoint `code` range from 2026-10-07T22:33:27.157Z to 22:36:52.447Z (001) and from 2026-10-08T16:13:25.514Z to 16:16:07.711Z (002). Effective repository queries append `pushed:>=2025-04-01 created:2026-05-01..2026-05-31`.

Hit metadata:
- null description, no topics, language JavaScript, `fork: false`, size 3.209;
- created at 2026-05-25T02:51:32Z, pushed at 2026-06-09T08:08:18Z.

Spellings in the README:
- “micro frontend”: hyphenated, in `README.md:1` (“# Micro-Frontend Architecture”), `README.md:4` (“A production-ready micro-frontend setup…”) and `README.md:11`;
- “micro frontends”: the plural does not appear in the README; this hit depends on GitHub search text processing, which is not recorded;
- “Module Federation”: `README.md:2` (“### React + Webpack Module Federation + Docker”), `72` and `225`.

The last README change is `ded9db1` (2026-06-03), before the October 2026 collections. The README at the SHA does not postdate the searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 279 entries, all regular files `100644`; zero symlinks and zero gitlinks. Folders `shell-app/` (30 files), nine `module-*/` (19 to 43 files each) and `shared-design-system/` (22), each with `package.json`, `webpack.config.js`, `src/index.js` → `bootstrap`, `Dockerfile` and `nginx.conf`. At the root: `docker-compose.yml`, `nginx/nginx.conf`, `docs/ARCHITECTURE.md` and `README.md`. | context |
| Configuration (remotes) | Each module declares `ModuleFederationPlugin` with `name`, `filename: "remoteEntry.js"` and `exposes` of `./src/App`, for example `module-dashboard/webpack.config.js:29–48` (`dashboard`, `./DashboardApp`, port 3002, `:75`). The pattern repeats in `module-cloud-labs` (3001), `module-virtual-machine` (3003), `module-cloud-console` (3004), `module-logging` (3005), `module-code-environment` (3006), `module-code-module` (3007), `module-content-uploading` (3008) and `module-assessment` (3009). | strong |
| Mechanism (host) | `shell-app/src/remotes/remoteLoader.js:4–65`: injects the `<script>` for `remoteEntry.js`, calls `__webpack_init_sharing__`/`container.init`, gets the module with `container.get` and returns a factory for `React.lazy`. `shell-app/src/App.jsx:15–77`: nine `React.lazy(loadRemoteComponent({ remoteName, exposedModule }))` with the same names exposed by the modules. `:167–277`: protected routes mounting each remote in `RemoteWrapper` (`:128–153`), with `Suspense` and error boundary. | strong |
| Runtime configuration | `shell-app/src/config/remoteConfig.js:8–19`: default URLs for each remote (ports 3001–3010). `shell-app/public/index.html:14–52`: defines `window.__RUNTIME_REMOTE_CONFIG__` with relative Docker paths (`/dashboard-remote/remoteEntry.js` etc.) or local ports. `nginx/nginx.conf:18–134`: routes each `/<módulo>-remote/remoteEntry.js` to its corresponding container. `docker-compose.yml:5–26`, `29–165`: one service per unit on network `micro-net`. | strong |
| Design system | `shared-design-system/webpack.config.js:36–48`: remote `sharedDesignSystem` exposing tokens, styles and components (port 3010). Modules and shell declare it as a `promise` remote (`shell-app/webpack.config.js:34–47`; `module-dashboard/webpack.config.js:32–45`) and singleton `shared`. It is also dependency `file:../shared-design-system` in every `package.json` (for example, `module-dashboard/package.json:15`), copied during the Dockerfile build (`module-dashboard/Dockerfile:6–7`). The `tailwind.config.js` of all units use `require("../shared-design-system/src/tokens")` (line 1). | moderate |
| Source code (boundaries) | Search for `../../` imports in JS/JSX at the SHA: no import between modules or between module and shell. The only exception is `module-virtual-machine/src/useVmManagement.js:2` (`../../contexts/AuthContext`), pointing to a nonexistent root `contexts/` and not entering another unit; no other file imports it. Cross-folder coupling is only with `shared-design-system` as a library: Tailwind tokens, `file:` package and federated remote. | context |
| Documentation | `README.md:4`, `11–30`, `74–114`: describes only three modules and examples with old names (`auth`, `profile`), differing from current code with nine. `docs/ARCHITECTURE.md:1–7`: runtime loader without build-fixed URLs. | weak |

## Authorship and history

Non-shallow clone; 13 linear commits, no merges, all by Shreyash Damodar, from 2026-05-25 (`68ea11f`, “Initial deployment”) to 2026-06-09 (SHA `b0fdd18`, “solving small bugs”). Only branch `main` exists. No historical blob was read and there was no missing object.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | Yes | Shell and nine remotes with `exposes` (`*/webpack.config.js`), referenced by host runtime configuration (`shell-app/src/config/remoteConfig.js:8–19`). |
| Q2 | Yes | Each unit has its own entry point, `webpack.config.js`, Dockerfile and container. There is no source code import between modules or with the shell; the common relationship is with library `shared-design-system`. |
| Q3 | Yes | The shell routes and mounts the nine remotes (`shell-app/src/App.jsx:167–277`). |
| Q4 | Yes | Module Federation at runtime: `remoteLoader.js` with `container.init`/`get`, fed by `__RUNTIME_REMOTE_CONFIG__` and the nginx gateway. |
| Q5 | Yes | Q1–Q4 are Yes: host and remotes composed at runtime, with a complete chain in the snapshot. |

## Rationale

- `MFE-implemented` under the Q1–Q5 Yes rule, in the case “monorepos containing a host and its remotes”. The chain is complete in the snapshot, as in 076/084/096/106/109.
- **Design system:** `shared-design-system` is consumed as a library, through package `file:`, Tailwind tokens and as a `shared` remote. As in 128, where app Tailwind reads `ui-kit`, this is a build relationship with a library, not between units. Nor is federation used only for code sharing (089/100): the nine modules are applications mounted by route.
- **Fields:**
  - `approaches: [module-federation]`, `ui_technologies: [react]`, `build_tools: [webpack]`;
  - `frontend_units: 10` (shell and nine remotes; design system is a library and is not counted), `unit_organization: monorepo`;
  - `repo_type: production`: the README presents it as “production-ready”, code calls real APIs (for example, `module-virtual-machine/src/useVmManagement.js:4–10`) and there is Amplify configuration (`shell-app/src/config/amplify-config.js`).
- There is no open decision.

## Analysis notes

- **RQ2:** manual Module Federation loader (`__webpack_init_sharing__`, `container.init`/`get`) instead of static `remotes`, with URLs from `window.__RUNTIME_REMOTE_CONFIG__` defined in `index.html` according to port, and an nginx gateway by path prefix. The design system is a `promise` remote in all units.
- **RQ3:** each remote duplicates local `AuthContext.jsx` and `ThemeContext.jsx` instead of receiving them from the shell.
- **Protocol (search):** the plural hit has no literal spelling. The README is outdated relative to code (3 versus 9 modules). Eligibility changes from `unknown` (001) to `pass` (002).
