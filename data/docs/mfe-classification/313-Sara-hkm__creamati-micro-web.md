---
schema: 1
id: 1082058462
full_name: Sara-hkm/creamati-micro-web
url: https://github.com/Sara-hkm/creamati-micro-web
commit: 541f8edc7615e399cbbf0fe3f1ae33abe14c4796
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
approaches: [iframe]
ui_technologies: [react]
build_tools: []
frontend_units: 5
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 313 — Sara-hkm/creamati-micro-web

## Context

“Golden sample” of React micro-frontends (Create React App) with iframe composition (`README.md:1–3`, `16–21`). Five CRA applications in `frontend/`:
- a `container`, with header, sidebar and main area;
- four micro-frontends (`user-management-app`, `data-grid-app`, `analytics-app`, `settings-app`), each with its own demonstration page.

Container displays each micro-frontend in an `<iframe>` according to active tab. Module Federation appears only in README as future improvement (`README.md:58`), description and `package.json` `keywords`; no federation configuration. The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:314` records rank 313, ID 1082058462, status `cloned`, branch `main` and the front matter commit, which is HEAD of the clone and `origin/main`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, with reading through `${SHA}:caminho` (the original placeholder means SHA:path). No installation, build, execution or network access occurred.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:314` records strategies `terminology;technology` and eligibility `unknown`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID is in `data/discovery/mfe-round-001/candidates.csv:20219` and `data/discovery/mfe-round-002/candidates.csv:20225`, both `unknown`. In round 002, reason is `author_indeterminate`.

A `sqlite3 -readonly` query of the `hits`, `queries` and `subqueries` tables from both rounds, filtered by ID, returns the same three hits in each round, from endpoint `repositories`, with subquery `…#created:2025-10` and empty `path`:

| Query (`q`) | Collection 001 / 002 (UTC) |
|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | 2026-10-07T22:26:30.472Z / 2026-10-08T15:56:06.882Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | 2026-10-07T22:57:16.375Z / 2026-10-08T16:06:53.306Z |
| `technology-module-federation-repositories`: `"module federation" in:name,description,readme` | 2026-10-07T23:20:46.338Z / 2026-10-08T16:16:09.053Z |

Effective queries append `pushed:>=2025-04-01 created:2025-10-01..2025-10-31`.

Hit metadata:
- description “A production-ready golden sample demonstrating micro-frontend architecture with React and Webpack Module Federation…”;
- no topics, null language, `fork: false`, size 26,179;
- created at 2025-10-23T17:10:52Z and pushed at 2025-10-14T20:51:36Z: push precedes creation, consistent with imported history.

README spellings:
- “micro frontend”: “Micro-Frontend” at `README.md:1` and “micro-frontend” at `README.md:3`;
- “micro frontends”: “Micro-Frontends” at `README.md:8` (“**4 Independent Micro-Frontends**”);
- “Module Federation”: `README.md:58` (“Add Webpack Module Federation for true micro-frontend architecture”), plus description.

README belongs to initial commit `4f941bb` (2025-09-21), before October 2026 collection. The SHA's README does not postdate searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 9,729 entries, 9,703 regular `100644` files, 23 executables `100755` and 3 symlinks `120000`; zero gitlinks. Executables and symlinks (`node_modules/.bin/conc`, `concurrently`, `tree-kill`) are all in root `node_modules/`, totaling 9,593 versioned entries. Outside it, five CRA apps in `frontend/` (21 files each), six workflows, `.cursor/` (prompts and templates), `.cursorrules` and plan/status documents. | context |
| Composition (container) | `frontend/container/src/App.tsx:8–18`: menu with `users`, `data`, `analytics` and `settings`. `:239–252`: `<iframe src={…}>` with per-tab URL (`https://olivium-dev.github.io/golden-sample-react-micro-web/user-management/`, `/data-grid/`, `/analytics/`, `/settings/`). | moderate |
| Micro-frontends | `frontend/*-app/src/App.tsx:1–36`: demonstration pages (“User Management Micro-Frontend… running independently on port 3001”, and equivalents on ports 3002–3004). Each app has `package.json` (CRA, `react-scripts start/build`) and `.env` containing only `PORT`. | moderate |
| Deployment | `.github/workflows/deploy-all.yml:49–78`: container goes to `gh-pages` in `container/`. `:80–` (matrix): each micro-frontend goes to `user-management`, `data-grid`, `analytics` and `settings`, same subpaths used in iframe URLs. Also one workflow per app. | moderate |
| Absence of federation | `git grep` in `frontend/`, excluding lockfiles and `node_modules`, for `ModuleFederation`, `remoteEntry`, `exposes`, `remotes` and `single-spa`: nothing. Only `import()` is CRA's `web-vitals`. `package.json:4`, `17–24`: description and `keywords` mention Module Federation and MUI, without corresponding dependency. | contrary |
| Source code (boundaries) | Search for `../` imports in `frontend/`: none. Each app imports only local files. | context |

## Authorship and history

Non-shallow clone; 7 linear commits, no merges, all by Ouday Khaled, from 2025-09-21 (`4f941bb`, “Initial commit: Micro-frontend architecture with container app and 4 micro-frontends”) to 2025-09-22 (SHA `541f8ed`, “Recreate complete micro-frontend applications”). Intermediate commits adjust deployment workflows. Iframe URLs point to another account's GitHub Pages (`olivium-dev`), and GitHub repository creation postdates commits. Only branch `main`. No historical blob was read and no object was missing.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | Yes | Five frontend applications: container and four micro-frontends, referenced by iframe URLs (`frontend/container/src/App.tsx:239–252`). |
| Q2 | Yes | Each app has its own `package.json`, CRA build, port and deployment (`deploy-all.yml`), without inter-app imports. |
| Q3 | Yes | Container loads each micro-frontend into main area according to menu (`App.tsx:93`, `218–253`). |
| Q4 | Yes | Container selects and loads each micro-frontend through `<iframe>` within main area (`frontend/container/src/App.tsx:239–252`), performing runtime composition. |
| Q5 | Yes | Q1–Q4 demonstrate independent applications integrated by a common container. |

## Rationale

- Classified as `MFE-implemented`: container integrates four independent applications through iframe, with common navigation and presentation area.
- Unlike final 078, no federated core here supports Q4 independently of iframes.
- **Fields:**
  - `approaches: [iframe]`, `ui_technologies: [react]`, `build_tools: []` (unejected CRA, as in 087);
  - `frontend_units: 5`, `unit_organization: monorepo`;
  - `repo_type: example` (“golden sample”; micro-frontends are demonstration pages).

## Analysis notes

- **RQ1 (misleading signals):** description and `keywords` advertise Webpack Module Federation and MUI, but implementation uses iframe and CRA; federation exists only in plans (`README.md:58`; `implementation-plan*.md`; `.cursor/templates/webpack.config.template.js`).
- **Protocol (snapshot):** root `node_modules` was versioned (9,593 entries), accounting for all inventory executables and symlinks.
- **Protocol (search):** all three spellings are in README; plural and singular are hyphenated. Eligibility `unknown` in both rounds.

## Recorded decision

Promoted to `MFE-implemented`. Container composes four independent React applications in a common area through iframes and shared navigation. Absence of Module Federation does not invalidate this composition mechanism.
