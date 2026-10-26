---
schema: 1
id: 1022728663
full_name: adhi982/Tenantflow-multisupport-platform
url: https://github.com/adhi982/Tenantflow-multisupport-platform
commit: db09ffde9eb4df5233bc341838d1e2f162df9d92
classification: Non-MFE
checklist: { q1: yes, q2: undetermined, q3: no, q4: no, q5: no }
repo_type: example
approaches: []
ui_technologies: [react]
build_tools: [webpack]
frontend_units: 2
unit_organization: multi-repo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 264 — adhi982/Tenantflow-multisupport-platform

## Context

Multi-tenant ticket SaaS platform with Express/MongoDB backend, n8n workflows and a React frontend named `frontend-shell` (`README.md:1–3`, `:29–50`; `docker-compose.yml:36–118`). Shell webpack declares Module Federation with remote `tickets` at `http://localhost:3002/remoteEntry.js` (`frontend-shell/webpack.config.js:45–49`). However:
- there is no `frontend-tickets` in the snapshot or any commit, although the root `package.json` cites it (`package.json:10`, `:69`);
- the shell never imports the remote: route `/tickets/*` renders a local page (`frontend-shell/src/components/MainLayout.js:9`, `:129`).

The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:265` records rank 264, ID 1022728663, status `cloned`, branch `main` and the front matter commit, which is the HEAD of the clone and of `origin/main`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. There was no installation, build, execution or network access.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:265` records strategy `technology` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID appears in `data/discovery/mfe-round-001/candidates.csv:16593` (`technology`, `unknown`) and `data/discovery/mfe-round-002/candidates.csv:16597` (`technology`, `pass`).

A `sqlite3 -readonly` query against tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns one hit per round, from endpoint `code`:

| Query (`q`) | Subquery | `path` | Collection 001 / 002 (UTC) |
|---|---|---|---|
| `technology-module-federation-plugin-js-code`: `ModuleFederationPlugin remotes extension:js` | `technology-module-federation-plugin-js-code#size:1800..1999` | `frontend-shell/webpack.config.js` | 2026-10-07T22:32:50.754Z / 2026-10-08T16:13:00.826Z |

The effective query is `ModuleFederationPlugin remotes extension:js size:1800..1999`. Code hit metadata records only null description and `fork: false`.

The matched file has 1.850 bytes at the SHA, within the range, and contains `ModuleFederationPlugin` (`frontend-shell/webpack.config.js:2`, `:45`) and `remotes` (`:47–49`). It was last changed in `c1c621f` (2025-07-19). The match does not depend on the README, which mentions neither Module Federation nor micro-frontends: searches for `micro`, `federation` and `remote` in the README find only “microservices” (`README.md:346`). The last README change is the SHA (2025-07-20T01:17:58+05:30), before the October 2026 collections.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 81 entries, all regular files `100644`; zero symlinks and zero gitlinks. Directories `backend/` (Express), `frontend-shell/` (React) and `n8n-workflows/`, plus `docker-compose.yml`, root `package.json` and `.bat` scripts. There is no `frontend-tickets/`, and `git log --all -- frontend-tickets` returns no commits. | contrary |
| Configuration (host) | `frontend-shell/webpack.config.js:45–64`: `ModuleFederationPlugin({ name: 'shell', remotes: { tickets: 'tickets@http://localhost:3002/remoteEntry.js' }, shared: react/react-dom/react-router-dom singleton })`; `:8`: entry point `./src/bootstrap.js`, which performs `import('./index.js')` (`frontend-shell/src/bootstrap.js:1`). | weak |
| Source code (consumption) | `git grep` search for `tickets/`, `from 'tickets`, `import('tickets`, `remoteEntry` and `3002`: no federated module import. `frontend-shell/src/components/MainLayout.js:9`: `import TicketsPage from './TicketsPage'`, local; `:129`: `<Route path="/tickets/*" element={<TicketsPage />} />`. `frontend-shell/src/components/TicketsPage.js:1–5`: local component calling the API (`:144`). | contrary |
| Configuration (absent unit) | `package.json:7–16`, `:49`, `:66–70`: scripts and workspaces for `frontend-tickets`, absent from the tree. `docker-compose.yml:79–118`: only `frontend-shell` as a frontend service; `REACT_APP_TICKETS_URL: http://localhost:3002` (`:91`) is not read by code (search for `TICKETS_URL` finds it only in compose). | contrary |
| Source code (boundaries) | Relative imports in `frontend-shell/src`: component `../App` (for example, `MainLayout.js:4`; `TicketsPage.js:3`) remain within the shell itself. There is no other frontend unit to cross. | context |
| Build/deploy | `frontend-shell/package.json:32–34`: build and serve with webpack; `frontend-shell/Dockerfile` and own service in compose (`docker-compose.yml:80–88`). | context |
| Documentation | `README.md:29–50`: diagram with a single “Frontend Shell” including “Ticket UI” and communicating with the backend; `README.md:131`: service table with only one frontend; `README.md:219`: `frontend-shell/ # React main application`. `frontend-shell/src/components/LoginPage.js:108` (“Scalable micro-frontend architecture”) and `backend/src/app.js:107` (comment “Tickets micro-frontend” in the CORS list) are isolated texts. | weak |

## Authorship and history

Non-shallow and partial clone (`blob:none`). There are 11 commits (11 across all refs), 1 merge (`ead2286`), all with the owner email `adithyant982@gmail.com` (names `adhi982` and `Adithya N T`, the latter with committer `GitHub` in README edits) or noreply `133945234+adithyaadhi505@users.noreply.github.com` in the first two:
- `07a7aa0` (“Initial commit”, 2025-07-19T23:02:56+05:30);
- `c1c621f` (“Update 1.0.1”, 2025-07-19T23:10:39+05:30) adds the entire project at once, including the current `webpack.config.js`;
- the remaining commits, through the SHA (2025-07-20), edit only the README.

`git rev-list --objects $SHA --missing=print` lists 7 missing objects, none in the SHA tree. No historical blob was read.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | Yes | Under the literal criterion, composition configuration explicitly references an external unit, `remotes: { tickets }` (`frontend-shell/webpack.config.js:47–49`). Together with `frontend-shell`, these are two units. Same interpretation as draft 150. |
| Q2 | Undetermined | `frontend-shell` has its own entry point and build (`webpack.config.js:8`; `frontend-shell/package.json:32–34`). Unit `tickets` exists neither in the repository nor history (`frontend-tickets` absent), and nothing shows separate deployment. |
| Q3 | No | The shell does not load, mount or route `tickets`: route `/tickets/*` uses a local component (`MainLayout.js:9`, `:129`). |
| Q4 | No | The only configured connection, `remotes: tickets`, has no consumer (recorded search). Under the criterion, “A declared dependency alone is No”. |
| Q5 | No | Q3 and Q4 are No: a single React application with declared, unused federation. |

## Rationale

- `Non-MFE` under the rule “at least one question is No”. It matches “MFE-related dependencies that are unused or experimental” and, in practice, “conventional frontend monoliths”: all screens, including tickets, are in the shell.
- It is not `MFE-unit`: the shell has no `exposes` and is not prepared for composition by another host; it is a host declaring an unconsumed remote.
- Comparison:
  - **150** (draft in `review`): the same pattern of declared and never consumed `remotes` (literal Q1 Yes, Q4 No). There the question was the MFE-unit exception, because the unit had `exposes`; here there is no `exposes`, and the Non-MFE class does not depend on that decision.
  - **097/103/104:** here there is no incomplete chain to assess, because code never attempts to load the remote.
  - **076/084/096/106/109:** there is no complete chain.
- If the unconsumed reference is disregarded in the count (alternative recorded in 150), Q1 becomes No, with `frontend_units: 1` and `single-unit`, and the class remains Non-MFE.
- `frontend_units: 2` and `unit_organization: multi-repo` follow the literal Q1 interpretation, as in 150. `ui_technologies: [react]`, `build_tools: [webpack]`, `approaches: []`. `repo_type: example`: submission or assessment project (scripts `prepare-git.bat` and `verify-submission.bat`; README sections “R4”, “R5”, `README.md:186–194`).
- There is no open decision changing the class.

## Analysis notes

- **RQ1 (misleading signals):** `ModuleFederationPlugin` with `remotes` in active webpack, `package.json` with keyword `module-federation` (`package.json:77`), description “Frontend Shell with Module Federation” (`frontend-shell/package.json:4`) and text “Scalable micro-frontend architecture” on the login screen (`LoginPage.js:108`) suggest MFE, but the remote unit was never versioned and the shell does not consume it.
- **Checklist (recurring case):** second case of declared `remotes` without a consumer (after 150). Q1 interpretation (whether to count the unconsumed reference) remains pending in 150; here it does not change the class.
- **Protocol (search):** entry only through code search in shell `webpack.config.js`; eligibility changes from `unknown` (001) to `pass` (002).
