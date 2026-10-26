---
schema: 1
id: 973277755
full_name: Hariharan-s-99/microFrontend
url: https://github.com/Hariharan-s-99/microFrontend
commit: 902273771afdb4f52006aeed0bcb3cd0e6c33cee
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
approaches: [module-federation]
ui_technologies: [react]
build_tools: [rspack]
frontend_units: 3
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 319 — Hariharan-s-99/microFrontend

## Context

Study of Module Federation with Rspack and nested routing. Three React applications:
- `container` (port 8080), host with `BrowserRouter`;
- `home` (port 8081), remote;
- `settings` (port 8082), remote.

Remotes expose a `mount(element)` function, rendering each with its own `MemoryRouter`, and the host calls them from routes and tabs. There is also `advancedWebpack/`, an independent React + webpack app for configuration experiments, without federation or connection to the others. There is no README. The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:320` records rank 319, ID 973277755, status `cloned`, branch `master` and the front matter commit, which is the HEAD of the clone and of `origin/master`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. There was no installation, build, execution or network access.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:320` records strategy `terminology` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID appears in `data/discovery/mfe-round-001/candidates.csv:13445` (`unknown`) and `data/discovery/mfe-round-002/candidates.csv:13450` (`pass`).

A `sqlite3 -readonly` query against tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns the same three hits in each round, from endpoint `repositories`, with subquery `…#created:2025-04` and an empty `path`:

| Query (`q`) | Collection 001 / 002 (UTC) |
|---|---|
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | 2026-10-07T18:27:20.838Z / 2026-10-08T15:37:30.638Z |
| `terminology-microfrontends-repositories`: `microfrontends in:name,description,readme` | 2026-10-07T22:07:28.833Z / 2026-10-08T15:47:09.613Z |
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | 2026-10-07T22:20:43.840Z / 2026-10-08T15:53:53.171Z |

The effective queries append `pushed:>=2025-04-01 created:2025-04-01..2025-04-30`.

Hit metadata:
- description “microFrontend using nested routing”, no topics, language TypeScript, `fork: false`, size 207;
- created at 2025-04-26T16:41:11Z, pushed at 2025-05-11T18:02:29Z.

There is no README at the SHA or in any historical commit. Spelling “microFrontend” is in the repository description. Plural and phrase “micro frontend” do not appear literally in any searched field; these hits depend on GitHub search text processing, which is not recorded.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 51 entries, all regular files `100644`; zero symlinks and zero gitlinks. Four root folders (`advancedWebpack`, `container`, `home`, `settings`), each with its own `package.json`, lockfile, build config and `src/`; no root `package.json`. | context |
| Host | `container/module-federation.config.ts:1–8`: `remotes: { settings: "settings@http://localhost:8082/remoteEntry.js", home: "home@http://localhost:8081/remoteEntry.js" }`. `container/rspack.config.ts:5`, `94`: `ModuleFederationPlugin` from `@module-federation/enhanced/rspack`; port 8080 (`:25`). `container/src/index.ts:1`: `import("./App")`, the asynchronous boundary. | strong |
| Remotes | `home/module-federation.config.ts:1–8` and `settings/module-federation.config.ts:1–8`: `filename: "remoteEntry.js"`, `exposes: { "./app": "./src/bootstrap.tsx" }`. `home/src/bootstrap.tsx:6–12` and `settings/src/bootstrap.tsx:6–12`: `mount(element)` with `ReactDOM.render(<App/>)`. Ports 8081 and 8082 (`*/rspack.config.ts:24–25`). | strong |
| Consumption | `container/src/Home.tsx:1`, `7–9` and `container/src/Settings.tsx:1`, `6–8`: `import { mount } from "home/app"` / `"settings/app"` and `mount(elementRef.current, {})` in a `div`. `container/src/App.tsx:17–20`, `62–63`: routes `/mf1` and `/mf2` and tabs mounting each remote. `container/global.d.ts:1–9`: remote module types. | strong |
| Unrelated app | `advancedWebpack/webpack.config.js` and `advancedWebpack/src/*`: React + webpack app (`package.json` with `"name": "webpack"`) without federation; `git grep` for `federation` and `remoteEntry` in this folder finds nothing. | context |
| Source code (boundaries) | Search for imports with `../` in the four folders: none. The host knows remotes only through `home/app` and `settings/app`, through federation. | context |

## Authorship and history

Non-shallow clone; 22 linear commits, no merge, all by author `hari`, from 2025-04-26 to 2025-05-11 (SHA `9022737`, “added basename for router @settings module federation remote”). Messages record routing experiments with federation: “module federation routing”, “remote federation memory router”, “shared module config”. Only branch `master` exists. No historical blob was read and there was no missing object.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | Yes | Host `container` and remotes `home` and `settings`, referenced in `remotes` (`container/module-federation.config.ts:3–6`). |
| Q2 | Yes | Each folder has its own `package.json`, lockfile, `rspack.config.ts`, entry and port, without code import between folders. |
| Q3 | Yes | The host mounts remotes through routes and tabs (`container/src/App.tsx:17–20`, `62–63`; `Home.tsx:7–9`; `Settings.tsx:6–8`). |
| Q4 | Yes | Module Federation (Rspack + `@module-federation/enhanced`) with consistent `remotes`/`exposes` and actual use of `mount`. |
| Q5 | Yes | Q1–Q4 are Yes: host and two remotes composed at runtime, with complete chain in the snapshot. |

## Rationale

- `MFE-implemented` under the Q1–Q5 Yes rule, in the case “monorepos containing a host and its remotes”. The chain is complete in the snapshot, as in 076/084/096/106/109.
- **Fields:**
  - `approaches: [module-federation]`, `ui_technologies: [react]`, `build_tools: [rspack]` (as in 029 and 228);
  - `frontend_units: 3` (container, home and settings; `advancedWebpack` does not participate in composition and is not counted);
  - `unit_organization: monorepo`, `repo_type: example` (routing study).
- There is no open decision.

## Analysis notes

- **RQ2:** contract `mount(element)` exposed by remotes, with `MemoryRouter` internal to each remote and `BrowserRouter` only in the host. Commits document this arrangement’s evolution.
- **RQ3:** `shared: []` in all three configs, without declared React sharing. `home/src/bootstrap.tsx:7` passes `history` without a local declaration, resolving to global `window.history`.
- **Protocol (search):** no README; the hit comes from the description (“microFrontend”) and, for the others, text processing without literal spelling. Eligibility changes from `unknown` (001) to `pass` (002).
