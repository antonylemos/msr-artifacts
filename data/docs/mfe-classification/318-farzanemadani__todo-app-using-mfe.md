---
schema: 1
id: 1205888629
full_name: farzanemadani/todo-app-using-mfe
url: https://github.com/farzanemadani/todo-app-using-mfe
commit: 21fc4773aa4d577351ce2000de48b52a73db8378
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
approaches: [module-federation]
ui_technologies: [react]
build_tools: [webpack]
frontend_units: 3
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 318 — farzanemadani/todo-app-using-mfe

## Context

Small Module Federation example with webpack 5 and React 19: a host (`host-app/`) routes two remotes, a task form (`todoForm-app/`) and a list (`todoList-app/`), sharing data through `localStorage` (`README.md:3–11`). Each app has its own `package.json`, development and production webpack configs and entry; there is no root `package.json` (`README.md:127`). The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:319` records rank 318, ID 1205888629, status `cloned`, branch `main` and the front matter commit, which is the HEAD of the clone and of `origin/main`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. There was no installation, build, execution or network access.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:319` records strategies `terminology;technology` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID appears in `data/discovery/mfe-round-001/candidates.csv:28074` (`terminology;technology`, `unknown`, rule `recent-human-commit` with `activity_incomplete`) and `data/discovery/mfe-round-002/candidates.csv:28080` (`terminology;technology`, `pass`).

A `sqlite3 -readonly` query against tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns the same three hits in each round, from endpoint `repositories`, with an empty `path`:

| Query (`q`) | Subquery | Effective query | Collection 001 / 002 (UTC) |
|---|---|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | `…#created:2026-04` | `… pushed:>=2025-04-01 created:2026-04-01..2026-04-30` | 2026-10-07T22:34:23.585Z / 2026-10-08T15:59:00.892Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | `…#created:2026-04` | same | 2026-10-07T23:02:41.710Z / 2026-10-08T16:08:48.189Z |
| `technology-module-federation-repositories`: `"module federation" in:name,description,readme` | `…#created:2026-04` | same | 2026-10-07T23:25:04.169Z / 2026-10-08T16:17:43.049Z |

Hit metadata: description “Built with React 19, Webpack 5, Module Federation”, no topics, language JavaScript, no license, `fork: false`, size 9, created at 2026-04-09T11:31:37Z, pushed at 2026-04-26T09:15:18Z.

Text matches:
- “micro frontends”: `README.md:1` (“# Todo App Using Micro Frontends”), literal;
- “micro frontend”: only hyphenated forms `README.md:3` (“micro-frontend project”) and `README.md:15` (“Micro-frontend architecture”), with the hyphen treated as a separator;
- “module federation”: repository description and `README.md:3`, `11`, `26`, `113`.

The README was introduced in `3847612` and changed at SHA `21fc477` itself (both on 2026-04-26), before the collections on October 7 and 8, 2026. The README at the SHA does not postdate the searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 29 entries, all regular files `100644`; zero symlinks and zero gitlinks. Three projects (`host-app`, `todoForm-app`, `todoList-app`), each with `package.json`, `webpack.dev.js`, `webpack.prod.js`, `public/index.html` and `src/` with `bootstrap.js` → `index.js`. | strong |
| Configuration (host) | `host-app/webpack.dev.js:45–55`: `ModuleFederationPlugin` with `name: 'host_app'` and `remotes` `todoForm_app@http://localhost:3001/remoteEntry.js` and `todoList_app@http://localhost:3002/remoteEntry.js`; `shared` with `package.json` dependencies (`:5`, `52–54`); port 3000 (`:13–16`). `host-app/webpack.prod.js:7–8`, `49–59`: same remotes through constants, still at `localhost` (acknowledged by the README, `README.md:128`). | strong |
| Configuration (remotes) | `todoForm-app/webpack.dev.js:15–18`, `48–57`: port 3001, `name: 'todoForm_app'`, `exposes: { "./TodoForm": './src/components/todoForm.jsx' }`. `todoList-app/webpack.dev.js:14–17`, `47–56`: port 3002, `name: 'todoList_app'`, `exposes: { "./todoList": './src/components/ToDoList.jsx' }`. The `webpack.prod.js` repeat `name` and `exposes`. | strong |
| Source code (composition) | `host-app/src/App.jsx:2–3`: `React.lazy(() => import('todoForm_app/TodoForm'))` and `import('todoList_app/todoList')`, with keys and names matching exposed ones; `:12–22`: routes `/` (list), `/add` and `/edit/:id` (form) in `Suspense`. `host-app/src/bootstrap.js:1` and `host-app/src/index.js:5–10`: asynchronous entry and `BrowserRouter`. | strong |
| Source code (remotes) | `todoForm-app/src/components/todoForm.jsx:5–98` and `todoList-app/src/components/ToDoList.jsx:6–60`: functional screens (create/edit and list/delete) using `useNavigate`/`useParams` from the host router and `localStorage` (`todoForm.jsx:16`, `27–29`; `ToDoList.jsx:8`, `12`). Each remote mounts standalone through `src/index.js:3–4`. | strong |
| Source code (boundaries) | Search for `../` in `*.js`, `*.jsx`, `*.json` and `*.html`: only `todoForm-app/src/components/todoForm.jsx:4` and `todoList-app/src/components/ToDoList.jsx:3` (`'../index.css'`, internal to the app itself). No source code import between the three projects; the host reaches remotes only through federated specifiers. | strong |
| Build/deploy | Own `start`/`build` scripts per app (`host-app/package.json:5–9`; likewise in remotes), separate outputs in `build/` (`README.md:97–105`). No pipeline or deployment. | moderate |

## Authorship and history

Non-shallow, partial clone (`blob:none`). 3 commits (3 across all refs), no merge, author and committer `farzanemadani <farzane.madani@gmail.com>`: root `67d1b09` (2026-04-12, “first commit”) adds the three apps and `.gitignore`; `3847612` and SHA `21fc477` (2026-04-26, “feat:add readme”) add and adjust the README. The federated structure already exists in the root commit; metadata does not distinguish intellectual authorship. `git rev-list --objects $SHA --missing=print` identifies 1 missing historical object; cited SHA files were read.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | Yes | `host-app`, `todoForm-app` and `todoList-app`, both remotes referenced by host configuration (`host-app/webpack.dev.js:48–51`). |
| Q2 | Yes | Own entry (`src/bootstrap.js`), webpack and port per app; no source code import between them. |
| Q3 | Yes | The host routes and loads the remotes (`host-app/src/App.jsx:2–3`, `12–22`). |
| Q4 | Yes | Module Federation configured on both sides, with matching names, ports and exposed keys (`host-app/webpack.dev.js:49–50` × `todoForm-app/webpack.dev.js:16`, `49–52` and `todoList-app/webpack.dev.js:15`, `48–51`), consumed through federated `import()`. |
| Q5 | Yes | Q1–Q4 converge. |

## Rationale

- Q1–Q5 are Yes, satisfying the `MFE-implemented` rule. It matches “monorepos containing a host and its remotes” and “examples… that actually compose frontend units” (`repo_type: example`, “A small React micro-frontend project”, `README.md:3`).
- The chain is complete and connectable, without a name, port or exposed key mismatch (contrast with 097/103/104); comparable to complete-chain cases (076/084/096/106/109).
- It is not code sharing (089/100): each remote exposes an entire screen mounted as a host route.
- `frontend_units: 3`, `unit_organization: monorepo`, `approaches: [module-federation]`, `ui_technologies: [react]`, `build_tools: [webpack]`.
- There is no open decision.

## Analysis notes

- **RQ2:** webpack 5 Module Federation with `shared` generated from all `dependencies` in `package.json` (without `singleton`), and remotes depending on host routing context (`useNavigate`, `useParams`).
- **RQ3:** cross-unit state integration through `localStorage` (key `todos`), without API or event bus (`README.md:11`, `54`).
- **RQ1:** the host header title is “Monolyth - TodoApp” (`host-app/src/components/header.jsx:7`), interface text without architectural effect.
