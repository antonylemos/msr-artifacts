---
schema: 1
id: 1104733457
full_name: riponcc/Group4COMP308Project
url: https://github.com/riponcc/Group4COMP308Project
commit: 59db8c8172c1e0efde31fe32c5135226a41cd044
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
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

# 232 — riponcc/Group4COMP308Project

## Context

“Municipal Issue Management System” (`README.md:1–27`): team full-stack project with three backend microservices (auth, issue management and analytics/AI with GraphQL and Socket.io) and three React/Vite applications with `@originjs/vite-plugin-federation`:
- `client/shell-app`, host on port 3000;
- `client/user-app`, login and registration on port 3001;
- `client/issue-app`, issue management and AI chat on port 3002.

The shell shows `UserApp` before login and `IssueApp` afterward, and the switch is signaled through `loginSuccess`/`logout` events on `window` (`client/shell-app/src/App.jsx:22–72`). The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:233` records rank 232, ID 1104733457, status `cloned`, branch `main` and the front matter commit, which is the HEAD of the clone and of `origin/main`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. There was no installation, build, execution or network access.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:233` records strategy `technology` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID appears in `data/discovery/mfe-round-001/candidates.csv:21524` (`unknown`) and `data/discovery/mfe-round-002/candidates.csv:21530` (`pass`).

A `sqlite3 -readonly` query against tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns the same hit in each round, from endpoint `repositories` and with an empty `path`:

| Query (`q`) | Subquery / effective query | Collection 001 / 002 (UTC) |
|---|---|---|
| `technology-module-federation-repositories`: `"module federation" in:name,description,readme` | `technology-module-federation-repositories#created:2025-11` / `"module federation" in:name,description,readme pushed:>=2025-04-01 created:2025-11-01..2025-11-30` | 2026-10-07T23:21:09.536Z / 2026-10-08T16:16:19.379Z |

Hit metadata:
- null description, no topics, language JavaScript, `fork: false`, size 432;
- created at 2025-11-26T16:01:44Z, pushed at 2025-12-10T16:04:25Z.

Spelling “Module Federation” in `README.md:3` (“built with microservices architecture and React Module Federation”), `12`, `25`, `41` and `234`. The last README change is `0df228d` (2025-12-10), before the October 2026 collections. The README at the SHA does not postdate the searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 89 entries, all regular files `100644`; zero symlinks and zero gitlinks. `client/` has three independent Vite projects, each with `package.json`, lockfile, `vite.config.js`, `index.html` and `src/`. `server/` has three Node microservices; there is also `architecture-diagram.puml`. | context |
| Configuration (host) | `client/shell-app/vite.config.js:36–50`: `federation({ name: 'shellApp', remotes: { userApp: 'http://localhost:3001/assets/remoteEntry.js', issueApp: 'http://localhost:3002/assets/remoteEntry.js' }, shared: react, react-dom, @apollo/client, graphql })`. Lines `1–26` are an earlier commented-out version, with only `userApp`. | strong |
| Configuration (remotes) | `client/user-app/vite.config.js:10–17`: `name: 'userApp'`, `filename: 'remoteEntry.js'`, `exposes: { './App': './src/App' }`. `client/issue-app/vite.config.js:14–26`: `name: 'issueApp'`, `exposes: { './App': './src/App' }`. The scripts (`client/user-app/package.json:7`, `10`; `client/issue-app/package.json:7`, `10`) use the host’s ports 3001/3002. | strong |
| Source code (composition) | `client/shell-app/src/App.jsx:10–11`: `lazy(() => import("userApp/App"))` and `lazy(() => import("issueApp/App"))`. `:59–70`: renders one or the other according to login, within `Suspense`, and passes `currentUser` to `IssueApp`. `:42–43`: listens for `loginSuccess` and `logout` on `window`. | strong |
| Source code (boundaries) | Search for `../..` in `client`: only `client/issue-app/src/components/ai/AIChatbot.jsx:3` → `../../api/aiClient`, internal to `issue-app`. There are no imports between the projects in `client/`. | context |

## Authorship and history

Non-shallow clone; 9 commits, 1 merge (SHA `59db8c8`, “Merge pull request #1 from riponcc/ahmadsbranch”, 2025-12-10). The nine commits across all refs have three author emails (Md Ripon Hossain, with 6 plus 1 as Ripon, Keta Patel and Ahmad Qaher); this does not demonstrate four people. Commit `c1ee799`, by Keta Patel, is only on `origin/keta-branch` and outside the SHA ancestry, and was not used to attribute snapshot files; `origin/ahmadsbranch` is incorporated through merge `59db8c8`. The root is `934af61` (2025-11-26, auth microservice); followed by `9983a55` (user-app), `94eaf5d` (“Added shell app to handle microservices”) and `8c2b4f9` (issue microservice and frontend). Among branches, `origin/keta-branch` has 1 commit outside `main`, and the others have no commits beyond `main`; none was considered. No historical blob was read. The clone is partial (`blob:none`) and `git rev-list --objects $SHA --missing=print` finds 38 missing historical objects, without attempting to fetch them; the snapshot files used were available.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | Yes | Three units in the repository, two referenced by the host composition configuration (`client/shell-app/vite.config.js:39–42`). |
| Q2 | Yes | Each application has its own `package.json`, lockfile, `vite.config.js`, scripts and port, without source code imports between them. |
| Q3 | Yes | The shell mounts the remotes according to authentication state (`client/shell-app/src/App.jsx:59–70`). |
| Q4 | Yes | Module Federation with `remotes` in the host and `exposes` in the remotes, consumed through `import("userApp/App")` and `import("issueApp/App")`. |
| Q5 | Yes | Q1–Q4 are Yes: shell and two remotes composed at runtime. |

## Rationale

- `MFE-implemented` under the Q1–Q5 Yes rule. It matches “monorepos containing a host and its remotes”. The chain is complete in the snapshot, as in 076/084/096/106/109.
- The remotes expose entire applications (login and issue management), not shared components (089/100).
- `approaches: [module-federation]`, `ui_technologies: [react]`, `build_tools: [vite]`, `frontend_units: 3`, `unit_organization: monorepo`, `repo_type: example` (course project: `README.md:259–263` declares course COMP308-001 at Centennial College and "course project", a better direct basis than institutional emails and `localhost` URLs).
- There is no open decision.

## Analysis notes

- **RQ2:** `@originjs/vite-plugin-federation` with remote switching according to authentication state and events on `window`; GraphQL microservice backend alongside the micro-frontends.
- **Protocol (search):** eligibility changes from `unknown` (001) to `pass` (002).
- **Independent review contribution (Lupa):** architectural agreement with MFE-implemented, Q1–Q5 Yes, three units, `monorepo`, React/Vite and `module-federation`; no open decision (`draft`). The shell configures `userApp` (`localhost:3001`) and `issueApp` (`localhost:3002`) in `remoteEntry.js`, the remotes expose `./App`, and the shell imports and mounts both (mounting after authentication, as in final 033; 052 records an operational gap without denying the mechanism). Adopted corrections: the count and authorship above; the missing objects; and the `currentUser` contract, which the shell passes to `IssueApp` (`client/shell-app/src/App.jsx:67`), but the remote does not consume (`client/issue-app/src/App.jsx:97–98` declares `App` without props; the user comes from `getUser`/`localStorage`, `:64–69`): the actual producer is `client/user-app/src/UserComponent.jsx:50–56`, which stores token and user and dispatches `loginSuccess` (logout in `:70–75`, and `Header.jsx:32–39`), and the shell listens for these events in `App.jsx:42–43`, so `currentUser` is not a data contract consumed by the remote. Supplement the execution caveats and cell references.
