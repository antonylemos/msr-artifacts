---
schema: 1
id: 1158060733
full_name: sharif7761/Micro-frontend-project-with-react-js
url: https://github.com/sharif7761/Micro-frontend-project-with-react-js
commit: cb2083fd77ddcb4d6493af653e0ce523ba0be010
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
approaches: [module-federation]
ui_technologies: [react]
build_tools: [rsbuild]
frontend_units: 3
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 234 — sharif7761/Micro-frontend-project-with-react-js

## Context

“Simple Micro Frontend Project”, “A minimal micro frontend architecture to understand Module Federation structure” (`README.md:1–13`): three React/Rsbuild applications with `@module-federation/rsbuild-plugin`:
- `core_simple`, the shell (port 3000), with routing;
- `users_simple` (port 3002), a user list from JSONPlaceholder, exposing `./UserList`;
- `common_simple` (port 3001), exposing components `Button` and `Card` consumed by the other two.

The shell mounts `UserList` at `/users` and uses remote `Button`/`Card` on the home page. The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:235` records rank 234, ID 1158060733, status `cloned`, branch `master` and the front matter commit, which is the HEAD of the clone and of `origin/master`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. There was no installation, build, execution or network access.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:235` records strategies `terminology;technology;broader` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID appears in `data/discovery/mfe-round-001/candidates.csv:24911` (`unknown`) and `data/discovery/mfe-round-002/candidates.csv:24918` (`pass`).

A `sqlite3 -readonly` query against tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns the same six hits in each round, from endpoint `repositories` and with an empty `path`:

| Query (`q`) | Subquery | Collection 001 / 002 (UTC) |
|---|---|---|
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | `…#created:2026-02` | 2026-10-07T19:59:51.558Z / 2026-10-08T15:41:15.380Z |
| `terminology-microfrontends-repositories`: `microfrontends in:name,description,readme` | `…#created:2026-02` | 2026-10-07T22:11:11.394Z / 2026-10-08T15:49:08.317Z |
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | `…#created:2026-02` | 2026-10-07T22:31:08.731Z / 2026-10-08T15:57:49.131Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | `…#created:2026-02` | 2026-10-07T23:00:06.384Z / 2026-10-08T16:07:57.795Z |
| `technology-module-federation-repositories`: `"module federation" in:name,description,readme` | `…#created:2026-02` | 2026-10-07T23:23:04.794Z / 2026-10-08T16:17:03.151Z |
| `broader-frontend-orchestration`: `"frontend orchestration" in:name,description,readme` | `…#created:2026-Q1` | 2026-10-07T23:42:06.074Z / 2026-10-08T16:24:17.763Z |

The effective queries append `pushed:>=2025-04-01` and `created:2026-02-01..2026-02-28` (or `2026-01-01..2026-03-31` in the broader query).

Hit metadata:
- null description, no topics, language TypeScript, `fork: false`, size 36;
- created at 2026-02-14T18:26:08Z, pushed at 2026-02-14T18:27:47Z.

Spellings in the README:
- “Micro Frontend”/“micro frontend”: `README.md:1`, `3`;
- “micro frontends”: `README.md:42` (“Lazy loads micro frontends”);
- “microfrontend”: `README.md:8` (`simple-microfrontend/`);
- “Module Federation”: `README.md:3`, `103`, `144`;
- “Orchestrates”: `README.md:43` (“Orchestrates the entire application”), without the literal spelling “frontend orchestration”.

The unseparated plural “microfrontends” does not appear literally. The README comes from the only commit, the SHA (2026-02-15), before the October 2026 collections. The README at the SHA does not postdate the searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 34 entries, all regular files `100644`; zero symlinks and zero gitlinks. There are three projects (`common_simple/`, `core_simple/`, `users_simple/`), each with `package.json`, lockfile, `rsbuild.config.ts`, `public/index.html` and `src/`, plus a scripts `package.json` at the root and documents (`ARCHITECTURE.md`, `STRUCTURE.md`, `QUICK_START.md`). | context |
| Configuration (host) | `core_simple/rsbuild.config.ts:8–29`: `pluginModuleFederation({ name: 'core_simple', remotes: { common_simple: …:3001/remoteEntry.js, users_simple: …:3002/remoteEntry.js }, shared: react/react-dom eager singleton, react-router-dom })`. | strong |
| Configuration (remotes) | `users_simple/rsbuild.config.ts:8–31`: `exposes: { './UserList': './src/App.tsx' }` and `remotes: { common_simple }`. `common_simple/rsbuild.config.ts:8–26`: `exposes: { './Button', './Card' }`. Ports 3002 and 3001 (`:34`, `:29`) match the host. | strong |
| Source code (composition) | `core_simple/src/App.tsx:9`: `lazy(() => import('users_simple/UserList'))`; `:56–61`: route `/users` mounts `UserList`; `:4–6`, `15–26`: remote `Button` and `Card` on the home page. `users_simple/src/App.tsx:3–5`, `40–53`: consumes `Button`/`Card` from `common_simple`. `core_simple/src/index.tsx` imports `bootstrap` (asynchronous bootstrap). | strong |
| Nature of the units | `users_simple` is a functional slice (user list with data fetching, `users_simple/src/App.tsx:14–56`) mounted by route. `common_simple` is a component library served through federation, shared by the other two. | moderate |
| Source code (boundaries) | Search for `../` imports in `*.ts`/`*.tsx`: no occurrence between projects; `common_simple/src/App.tsx:2–3` imports its own components (`./components`). The projects connect only through federated modules. | context |

## Authorship and history

Non-shallow clone; 1 commit, SHA `cb2083f` (2026-02-15, “first commit”), by ahmed7761 `<sharif7761@gmail.com>`. No historical blob was read and there was no missing object.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | Yes | Three units in the repository, two referenced by the host composition configuration (`core_simple/rsbuild.config.ts:11–14`). |
| Q2 | Yes | Each project has its own `package.json`, lockfile, `rsbuild.config.ts`, entry point and port, without source code imports between them. |
| Q3 | Yes | The shell mounts `UserList` by route (`core_simple/src/App.tsx:56–61`). |
| Q4 | Yes | Module Federation (Rsbuild plugin) with `remotes` in the host and in `users_simple` and `exposes` in the remotes, consumed through federated imports. |
| Q5 | Yes | Q1–Q4 are Yes: shell composing a functional micro-frontend by route, plus a federated component library. |

## Rationale

- `MFE-implemented` under the Q1–Q5 Yes rule. It matches “monorepos containing a host and its remotes”. The shell → `users_simple` chain is complete in the snapshot, as in 076/084/096/106/109.
- **Component sharing:** `common_simple` is component sharing through federation, the pattern discussed in 089/100. Here, however, it coexists with actual composition of a functional slice by route (`users_simple`), which suffices for Q3/Q4.
- **Fields:** `approaches: [module-federation]`, `ui_technologies: [react]`, `build_tools: [rsbuild]` (as in 029), `frontend_units: 3` (the three executable targets, including `common_simple`, which has its own demonstration app, `common_simple/src/App.tsx`), `unit_organization: monorepo`, `repo_type: example` (“to understand Module Federation structure”, `README.md:3`).
- There is no open decision.

## Analysis notes

- **RQ2:** three roles in a minimal example: shell, functional micro-frontend and federated component library consumed by both shell and micro-frontend.
- **Protocol (search):** the repository enters through six queries, including broader `"frontend orchestration"`, without a literal spelling of it or the unseparated plural. Eligibility changes from `unknown` (001) to `pass` (002). The default branch is `master`.
- **Independent review contribution (Lupa):** full agreement with MFE-implemented, Q1–Q5 Yes, `module-federation`, React/Rsbuild, three units and `monorepo`; no open decision (`draft`). The MFE architecture proof is `core_simple` → `users_simple`, and `common_simple` demonstrates a federated library (its demonstration `App` is not what the shell mounts), so the decision stands even counting only shell and `users_simple` as functional units. Corrections verified at the SHA: `core_simple/src/App.tsx` imports `Button` (`:4`) and `Card` (`:6`) from `common_simple`, but renders only `Card` on Home (`:15–26`); `Button` is an unused import, and the description that the shell uses remote `Button` and `Card` on the home page should be read with this precision. The configurations do not specify `html.template`, so there is no claim that `public/index.html` is a template explicitly selected by Rsbuild (the conventional entry point is `src/index.tsx`). Search terms without literal spelling have limited provenance. `rev-list --objects --missing=print` shows no missing object.
