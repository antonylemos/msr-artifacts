---
schema: 1
id: 1350705751
full_name: karthik5656/Catalog.App
url: https://github.com/karthik5656/Catalog.App
commit: 1982e0f3dae5a8508d354f9db91a089ba96d4bd6
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: production
approaches: [module-federation]
ui_technologies: [react]
build_tools: [vite]
frontend_units: 3
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 332 — karthik5656/Catalog.App

## Context

Catalog project with .NET backends (`src/backend/`: Gateway, App, Chat, Rag, currently with template `WeatherForecast`), architecture documentation and plans (`documents/`) and three React + Vite frontends in `src/frontend/apps/`:
- `ui-catalog` (shell, port 3000);
- `ui-catalog-merchant` (remote, 3001);
- `ui-catalog-consumer` (remote, 3002).

The shell reads `remotes.json`, builds the `remotes` map for `@originjs/vite-plugin-federation` and generates a file with `React.lazy(() => import("<scope>/App"))` per remote, routed at `/<route>/*`. There is no root README. The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:333` records rank 332, ID 1350705751, status `cloned`, branch `master` and the front matter commit, which is the HEAD of the clone and of `origin/master`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. There was no installation, build, execution or network access.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:333` records strategy `technology` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID appears in `data/discovery/mfe-round-001/candidates.csv:36329` (`unknown`) and `data/discovery/mfe-round-002/candidates.csv:36337` (`pass`).

A `sqlite3 -readonly` query against tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns the same three hits in each round, all from endpoint `code`, query `technology-vite-federation-package-code` (`"@originjs/vite-plugin-federation" filename:package.json`), subquery `…#size:800..899`:

| `path` | Collection 001 / 002 (UTC) |
|---|---|
| `src/frontend/apps/ui-catalog-consumer/package.json` | 2026-10-07T22:04:57.516Z / 2026-10-08T15:47:59.312Z |
| `src/frontend/apps/ui-catalog/package.json` | 2026-10-07T22:04:57.516Z / 2026-10-08T15:47:59.312Z |
| `src/frontend/apps/ui-catalog-merchant/package.json` | 2026-10-07T22:05:05.207Z / 2026-10-08T15:48:11.108Z |

Code hit metadata has no description, topics or dates. Entry is through code only: all three `package.json` declare `@originjs/vite-plugin-federation`. There is no root README to assess.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 152 entries, all regular files `100644`; zero symlinks and zero gitlinks. At the root are `Agents.md`, `documents/` (plans, including `06_shell_mfe.md`), `docker/`, `wireframes/` and CI workflows. There are four .NET solutions in `src/backend/` and three Vite apps in `src/frontend/apps/`, each with `package.json`, `pnpm-lock.yaml`, `vite.config.ts`, `Dockerfile` and `src/`. | context |
| Shell | `src/frontend/apps/ui-catalog/remotes.json:1–16`: `merchantApp` → `http://localhost:3001/assets/remoteEntry.js` and `consumerApp` → `http://localhost:3002/assets/remoteEntry.js`, both with `module: "./App"`. `vite.config.ts:10–17`, `85–89`: builds `remotes` from JSON. `:26–51`: plugin generating `src/remoteApps.generated.tsx` with `React.lazy(() => import("<scope>/App"))` at build startup; the generated file is ignored in Git (`.gitignore:15–16`). | strong |
| Mounting | `src/frontend/apps/ui-catalog/src/App.tsx:3`, `11–31`: one `/<route>/*` route per remote, with `Suspense`. `src/components/ShellLayout.tsx:27–31`: navigation links. `src/main.tsx:9`: `BrowserRouter` with `basename="/ui-catalog"`. | strong |
| Remotes | `ui-catalog-merchant/vite.config.ts:16–23` and `ui-catalog-consumer/vite.config.ts:16–23`: `filename: "remoteEntry.js"`, `exposes: { "./App": "./src/App" }`, ports 3001 and 3002. The `App.tsx` are nested `Routes` (`ui-catalog-merchant/src/App.tsx:7–15`; `ui-catalog-consumer/src/App.tsx:5–11`). Both notify the shell on rebuild (`/__fullReload`, `:24–45`). | strong |
| Inconsistency | Both remotes declare `name: "consumerApp"` (`ui-catalog-merchant/vite.config.ts:17` and `ui-catalog-consumer/vite.config.ts:17`), while the shell uses scope `merchantApp` for port 3001. The plugin resolves remotes by URL; the effect was not verified through execution. | ambiguous |
| Source code (boundaries) | Search for `../../` imports in `src/frontend`: none. Each app imports only its own files and packages. | context |

## Authorship and history

Non-shallow clone; 10 commits, 1 local merge, all by `karthik5656`, from 2026-08-29 (`f843c7d`, “initial commit”) to 2026-09-01 (SHA `1982e0f`, adding `Agents.md`). Five commits were created through PRs (`#1`–`#5`) in the GitHub interface, with committer `GitHub`. Federation configuration arrives in `ab5770d` (“MFE Configuration (#5)”). Only branch `master` exists. No historical blob was read and there was no missing object.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | Yes | Shell and two remotes in the repository, referenced by composition configuration (`remotes.json:1–16`, converted to `remotes` in `vite.config.ts:14–17`). |
| Q2 | Yes | Each app has its own `package.json`, lockfile, `vite.config.ts`, Dockerfile and port, without code imports between apps. |
| Q3 | Yes | The shell routes and mounts each remote at `/<route>/*` (`App.tsx:11–31`). |
| Q4 | Yes | `@originjs/vite-plugin-federation` with `remotes` generated from `remotes.json` and `import("<scope>/App")` generated during build, consistent with remote `exposes` (`./App`) and ports. |
| Q5 | Yes | Q1–Q4 are Yes: shell and remotes composed at runtime, with the chain defined in the snapshot. |

## Rationale

- `MFE-implemented` under the Q1–Q5 Yes rule, in the case “monorepos containing a host and its remotes”.
- The route file is generated during build, but the generator (`vite.config.ts:26–51`) and its input (`remotes.json`) are in the snapshot, so the chain is observable.
- **Fields:**
  - `approaches: [module-federation]`, `ui_technologies: [react]`, `build_tools: [vite]`;
  - `frontend_units: 3`, `unit_organization: monorepo`;
  - `repo_type: production`: project with backends, CI, Docker and product plans, still at an early stage.
- There is no open decision.

## Analysis notes

- **RQ2:** declarative remote registry (`remotes.json`) as the single source for federation map and shell routes, generated by a Vite plugin, with shell reload on remote rebuild (`/__fullReload`).
- **RQ3:** both remotes use the same `name` (`consumerApp`) in federation configs, different from scope `merchantApp` used by the shell for port 3001.
- **Protocol (search):** entry through code only. There is no root README; MFE documentation is in `documents/`. Eligibility changes from `unknown` (001) to `pass` (002).
