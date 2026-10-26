---
schema: 1
id: 1096746620
full_name: andreserazoo/MICROPROYECTO-FrontEnd
url: https://github.com/andreserazoo/MICROPROYECTO-FrontEnd
commit: 91f600e6169572f4d4ebf302b78b6bbfa56d6933
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: example
approaches: []
ui_technologies: [react]
build_tools: [vite]
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 120 — andreserazoo/MICROPROYECTO-FrontEnd

## Context

Demonstration user-management SPA with React, local routing, basic authentication and simulated data (`README.md:5–20`). One application is materialized in `sistema-usuarios/`, with one entry and one build. Repository name was not used as architecture evidence.

Identity and SHA checked in `data/samples/mfe-sample-001/clones.csv:121`, with status `cloned`; HEAD matches front-matter commit. All clone Git inspection used `GIT_NO_LAZY_FETCH=1`. Dependencies were not installed, builds not run, external servers not queried and clone files not changed.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:121` records rank 120, strategy `terminology` and eligibility `pass`. Sample derives from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). Candidate appears in `data/discovery/mfe-round-001/candidates.csv:21090`, with eligibility `unknown`, and `data/discovery/mfe-round-002/candidates.csv:21096`, with `pass`. Both record null description, empty topics, JavaScript language, `fork: false`, creation at 2025-11-14T22:15:39Z and push at 2025-11-14T22:23:35Z.

`sqlite3 -readonly` queries of tables `hits`, `queries` and `subqueries` in `data/discovery/mfe-round-001/discovery.sqlite` and `data/discovery/mfe-round-002/discovery.sqlite`, by ID 1096746620, show one hit in each round:

- Query: `terminology-micro-frontend-repositories`, strategy `terminology`, text **`"micro frontend" in:name,description,readme`**; spelling contains a space between words and phrase quotation marks.
- Subquery: `terminology-micro-frontend-repositories#created:2025-11`.
- Effective query: `"micro frontend" in:name,description,readme pushed:>=2025-04-01 created:2025-11-01..2025-11-30`.
- Collections: 2026-10-07T22:27:42.863Z in round 001 and 2026-10-08T15:56:36.768Z in round 002; empty `path`, without matched field or line indication.

**Textual location undetermined:** complete reading and case-insensitive search for `micro` and `frontend` in both READMEs at the SHA found no occurrences. Thus no exact line in current README can be cited as a match for this query. `README.md:5–7` explicitly describes “Sistema de Usuarios – React (SPA)” (English translation: “User System – React (SPA)”); `sistema-usuarios/README.md:1–3` describes React/Vite scaffold. Description and topics also do not explain a literal match. Name contains fragments `MICROPROYECTO` and `FrontEnd`, but this is not asserted to have caused the hit, nor is a GitHub tokenization rule inferred. Database proves search result, not its exact textual correspondence.

Historical metadata show root README created and revised on 2025-11-14, with last change at the SHA at 22:23:35Z; internal README was added in root commit at 22:17:10Z and had no reachable subsequent changes. Both predate October 2026 searches, rather than following them. Absent term in snapshot was explained neither by a later-than-collection change nor presumed historical content.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | Complete inventory through `git ls-tree -r` at the SHA: 27 regular files `100644`, zero symlinks and zero gitlinks. A single application manifest, one `index.html`, one Vite configuration and one `src` tree exist, all in `sistema-usuarios/`. No second application, host/remote, submodule or versioned `node_modules`. | contrary |
| Source code (entry) | `sistema-usuarios/index.html:9–11` defines `root` and loads `/src/main.jsx`; `sistema-usuarios/src/main.jsx:1–13` imports `App` and `UserProvider`, mounting one React root. `sistema-usuarios/src/App.jsx:1–5` returns local router. | contrary |
| Source code / Composition | `sistema-usuarios/src/Router.jsx:1–7` statically imports local pages and components; `sistema-usuarios/src/Router.jsx:11–22` registers Home, Register, Login and Admin in the same `BrowserRouter`. These are pages of the same compiled application, without independent frontend-unit loading. | contrary |
| Source code (state and data) | `sistema-usuarios/src/context/UserContext.jsx:3–15` shares session in React tree; `sistema-usuarios/src/services/authService.js:1–10` and `sistema-usuarios/src/services/userService.js:1–12` import the same local JSON. `sistema-usuarios/src/pages/Admin.jsx:1–5` imports local context, data and `UserCard`. These modules have no own entries/builds. | contrary |
| Configuration / Build/deploy | `sistema-usuarios/package.json:6–15` declares one Vite build and React/Router dependencies. `sistema-usuarios/vite.config.js:1–7` explicitly configures Vite with `@vitejs/plugin-react`, without federation or other units. Imported packages are declared in `sistema-usuarios/package.json:21–26` and resolved in lockfile: React plugin 5.1.1 at `sistema-usuarios/package-lock.json:1404–1406`, Vite 7.2.2 at `sistema-usuarios/package-lock.json:2781–2783`. Referenced entries and local imports exist in tree; this static check does not equal build execution. | contrary |
| Source code (boundaries) | Active literal search `git grep -n -F -e '../../' -e '../../../'` in all JS/JSX at the SHA: no occurrence. Imports of all 13 JS/JSX files in `src` were also read, with static relative-path resolution: all remain within the same application. Examples of local `../` occur in `sistema-usuarios/src/pages/Admin.jsx:2–5` and `sistema-usuarios/src/services/authService.js:1`. Positive Q2 is not deduced merely from absent traversals. | context |
| Technology / Configuration / Composition | Complete text-file search for `module.?federation`, `remoteEntry`, `registerApplication`, `single.?spa`, `qiankun`, `wujie`, `postMessage`, `iframe`, `customElements`, `import.?map` and `micro.?frontend`: no occurrence. Inventory and configuration reading show no remotes/exposes/consumption, exported lifecycle or external composition contract. | absent |
| Documentation | `README.md:5–20` declares SPA and JSON database simulation; `sistema-usuarios/README.md:1–16` retains standard React/Vite text, including plugin options not necessarily used. Implementation and manifest confirm React/Vite, without taking isolated README as composition proof. | context |

## Authorship and history

Metadata from `git rev-list`: **4 commits, 0 merges and 1 root commit**, root `fdbca67af3aa2e71dbea0af0b594e154142180a8`; non-shallow clone. `git log --no-renames --name-status` for `sistema-usuarios` and `README.md` shows all application files added together in root commit, `Primer commit` (English translation: “First commit”), author and committer `andreserazoo`, at 2025-11-14T14:17:10-08:00 (22:17:10Z).

The next three commits create or modify only root README: `55b25d81a5797cd4957436d79020e1066ca2fe1c`, `2d48a888659a46f61775bfb7b73a7a851b88ab76` and evaluated SHA, at 22:20:09Z, 22:23:02Z and 22:23:35Z that day. They have author `Jorge Andres Erazo Sanchez` and committer `GitHub`. Bulk addition does not prove original authorship of every file; internal README identifies React/Vite scaffold (`sistema-usuarios/README.md:1–3`), while pages, session and services implement functionality described at root. No granular history permits attributing every original excerpt to owner, nor sufficient indication to assert entire functional application was third-party vendored. Accessing historical blobs was unnecessary; no missing object was found.

Local references for record only: `main`, `origin/main` and `origin/HEAD` point to pinned SHA. No other-branch content was incorporated. No ADR or separate architectural documentation exists in inventory; root README documents SPA and module organization in `README.md:5–7` and `README.md:35–45`.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | A single SPA with entry in `sistema-usuarios/index.html:9–11`; four pages are local imports (`sistema-usuarios/src/Router.jsx:1–7`), without second unit or configuration referencing an external unit. |
| Q2 | No | Pages and modules have no own entries/builds: they share mounting at `sistema-usuarios/src/main.jsx:7–13` and global build at `sistema-usuarios/package.json:6–10`. No set of relatively independent composed units exists. |
| Q3 | No | Router navigates between local components of the same SPA (`sistema-usuarios/src/Router.jsx:14–19`), without host/shell loading, mounting or routing distinct frontend units. |
| Q4 | No | Vite configuration only enables React (`sistema-usuarios/vite.config.js:1–7`); complete searches find no composition mechanism or external-host contract. |
| Q5 | No | Q1–Q4 converge: single conventional frontend, with static imports and one build, without an observable MFE architecture instance. |

## Rationale

- `Non-MFE` under conventional monolithic frontend case. Class follows code and configuration, not name prefix, scaffold origin or demonstration nature.
- `frontend_units: 1` and `unit_organization: single-unit` record sole materialized own target. Pages, services, components and context are not additional units.
- `repo_type: example` records authentication and user-management demonstration with simulated database (`README.md:7–17`). `ui_technologies: [react]` and `build_tools: [vite]` are supported by explicit mounting/configuration and declared/resolved packages. No transitive internal Vite bundlers are added.
- This is not `MFE-unit`: no unit is prepared for an external host. Q2–Q4 remain No, without needing Undetermined. No link/iframe/build-time composition requires decision, nor MFE configuration with uncertain connection.

## Analysis notes

- **Protocol (family):** annotation search for `andreserazoo`, `sistema-usuarios` and `Sistema de Gestión de Usuarios` (English translation: “User Management System”) identified no previously annotated sibling. Internal README and configuration identify generic React/Vite scaffold family; this does not demonstrate copying a specific candidate.
- **Checklist:** case differs from complete chains 076/084/096/106/109, unconnectable remotes 097/103/104 and federated code sharing 089/100: no MFE mechanism was found here. Materialized application counts as own target, unlike merely generated/displayed code in 075/081/105; example status alone is no exclusion reason.
- **Protocol (provenance limitation):** hit for `"micro frontend"` is proven in both rounds, but expression could not be located in README texts at the SHA. No matched line, historical content or search behavior is invented to fill this gap. This limitation does not leave architectural decision open, since observable implementation satisfies conventional exclusion case.
- **Protocol (provenance, database pattern):** in round 002 database, singular query `"micro frontend"` hits include hundreds of repositories named `micro<palavra>…front…` without `micro-front`/`microfront` (for example `microservice-frontend`, `microfinance-frontend`, `micropay-frontend`; coordination check counted 328 through an approximate name pattern, reviewer check 332). Candidate fits this pattern, and name is sole compatible field by elimination (README lacks terms, description null, topics empty). Exact GitHub matching rule is undemonstrated and no matched line is inferred. No effect on class.
