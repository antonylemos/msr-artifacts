---
schema: 1
id: 1130037642
full_name: martinkuba/micro-frontend-test
url: https://github.com/martinkuba/micro-frontend-test
commit: f629b5bec52818c0c0c1cdc115bcd3d712ebbb93
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

# 305 — martinkuba/micro-frontend-test

## Context

Grafana Faro SDK test application in a micro-frontend architecture (`README.md:1–10`). An npm workspaces monorepo with three webpack 5 packages:
- `packages/shell`: host, port 3000;
- `packages/main-content`: remote, port 3001;
- `packages/sidebar`: remote, port 3002, disabled at the SHA.

Shell consumes `mainContent/MainContent` through `ModuleFederationPlugin` and renders it; `sidebar` has remote configuration, but its reference and mounting are commented in shell. Each unit initializes its own Faro instance. The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:306` records rank 305, ID 1130037642, status `cloned`, branch `main` and the front matter commit, which is HEAD of the clone and `origin/main`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, with reading through `${SHA}:caminho` (the original placeholder means SHA:path). No installation, build, execution or network access occurred.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:306` records strategies `terminology;technology` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID is in `data/discovery/mfe-round-001/candidates.csv:23015` (`unknown`) and `data/discovery/mfe-round-002/candidates.csv:23022` (`pass`).

A `sqlite3 -readonly` query of the `hits`, `queries` and `subqueries` tables from both rounds, filtered by ID, returns the same four hits in each round:

| Query (`q`) | Endpoint / subquery / `path` | Collection 001 / 002 (UTC) |
|---|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | `repositories` / `…#created:2026-01` / empty | 2026-10-07T22:29:39.577Z / 2026-10-08T15:57:17.577Z |
| `technology-module-federation-plugin-js-code`: `ModuleFederationPlugin remotes extension:js` | `code` / `…#size:1450..1599` / `packages/shell/webpack.config.js` | 2026-10-07T22:30:06.269Z / 2026-10-08T16:10:59.938Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | `repositories` / `…#created:2026-01` / empty | 2026-10-07T22:59:16.743Z / 2026-10-08T16:07:38.509Z |
| `technology-module-federation-repositories`: `"module federation" in:name,description,readme` | `repositories` / `…#created:2026-01` / empty | 2026-10-07T23:22:25.187Z / 2026-10-08T16:16:50.018Z |

Effective repository queries append `pushed:>=2025-04-01 created:2026-01-01..2026-01-31`.

Repository hit metadata:
- null description, no topics, language TypeScript, `fork: false`, size 69;
- created at 2026-01-08T00:07:14Z, pushed at 2026-01-08T00:07:30Z.

Code hit file has 1,484 bytes and contains `ModuleFederationPlugin` and `remotes` (`packages/shell/webpack.config.js:32–35`).

README spellings:
- “micro frontend”: `README.md:1` (“# Micro Frontend Test App”), `3` and `8`;
- “micro frontends”: `README.md:7` (“Host application that loads remote micro frontends”) and `10`;
- “Module Federation”: `README.md:10` (“Uses Webpack Module Federation to dynamically load micro frontends at runtime.”).

README belongs to SHA itself (2026-01-07), before October 2026 collection. The SHA's README does not postdate searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 23 entries, all regular `100644` files; zero symlinks and zero gitlinks. Three packages in `packages/` (`shell`, `main-content`, `sidebar`), each with `package.json`, `webpack.config.js` and `src/`; root contains `package.json` with workspaces (`package.json:14–18`), `tsconfig.json` and lockfile. | context |
| Configuration (host) | `packages/shell/webpack.config.js:32–43`: `ModuleFederationPlugin({ name: 'shell', remotes: { mainContent: 'mainContent@http://localhost:3001/remoteEntry.js' } })`; remote `sidebar` is commented (`:36`). Also declares `react`, `react-dom` and `@grafana/faro-web-sdk` as singletons. | strong |
| Configuration (remotes) | `packages/main-content/webpack.config.js:30–42`: `name: 'mainContent'`, `filename: 'remoteEntry.js'`, `exposes: { './MainContent': './src/MainContent' }`, port 3001. `packages/sidebar/webpack.config.js:30–42`: `name: 'sidebar'`, `exposes: { './Sidebar' }`, port 3002, without sharing Faro (`:40`). | strong |
| Consumption | `packages/shell/src/App.tsx:6`: `React.lazy(() => import('mainContent/MainContent'))`. `:199–203`: mounted within `ErrorBoundary`/`Suspense`. `Sidebar` import and mounting are commented (`:7`, `:206–214`). `packages/shell/src/index.tsx:2`: `import('./bootstrap')`, the asynchronous boundary. | strong |
| Execution | `package.json:7–10`: `start` starts only `main-content` and `shell` in parallel; `start:sidebar` exists separately. History: “removed side app for now” (`3174dd1`). | context |
| Source code (boundaries) | Search for `../` imports in `packages/`: none. Each package imports only local files (`./faro`, `./MainContent`) and npm dependencies. | context |

## Authorship and history

Non-shallow clone; 11 linear commits, no merges, all by Martin Kuba, from 2026-01-06 (`efec921`, “init”) to 2026-01-07 (SHA `f629b5b`, “added readme”). Includes “run all apps on different ports to guarantee separation” (`aaf32b6`) and “removed side app for now” (`3174dd1`). Only branch `main`. No historical blob was read and no object was missing.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | Yes | Host `shell` and remote `mainContent` in repository, referenced in `remotes` (`packages/shell/webpack.config.js:34–35`); `sidebar` is also a unit, but disconnected. |
| Q2 | Yes | Each package has its own `webpack.config.js`, entry, port and build, without code imports between packages. |
| Q3 | Yes | Shell mounts remote `MainContent` (`App.tsx:6`, `199–203`). |
| Q4 | Yes | webpack 5 Module Federation with coherent `remotes`/`exposes` and remote module actually imported and rendered. |
| Q5 | Yes | Q1–Q4 are Yes: host and remote composed at runtime, with complete snapshot chain. |

## Rationale

- `MFE-implemented` under the Q1–Q5 Yes rule, in case “monorepos containing a host and its remotes”. Chain is complete in snapshot, as in 076/084/096/106/109.
- **Units:** `frontend_units: 2` (shell and main-content). `sidebar` has remote configuration, but is disconnected at the SHA; following criterion in 128 (“os remotes comentados não contam”, English translation: “commented remotes do not count”), excluded from count.
- **Fields:** `approaches: [module-federation]`, `ui_technologies: [react]`, `build_tools: [webpack]`, `unit_organization: monorepo`, `repo_type: example` (Faro observability test application).
- No decision remains open.

## Analysis notes

- **RQ2:** each unit initializes its own Grafana Faro instance (`packages/*/src/faro.ts`). SDK is a `shared` singleton between shell and main-content, but not sidebar (`packages/sidebar/webpack.config.js:40`). A distributed MFE observability case.
- **Protocol (search):** entry through three terminology and technology repository queries, with literal README spellings, and code query in shell `webpack.config.js`. Eligibility changes from `unknown` (001) to `pass` (002).
