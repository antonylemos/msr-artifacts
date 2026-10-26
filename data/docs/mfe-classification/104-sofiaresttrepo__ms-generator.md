---
schema: 1
id: 1059720425
full_name: sofiaresttrepo/ms-generator
url: https://github.com/sofiaresttrepo/ms-generator
commit: 7bf1a37eeca1309ccb3a2eb22bc057a4fbb5d225
classification: Uncertain
checklist: { q1: yes, q2: undetermined, q3: undetermined, q4: undetermined, q5: undetermined }
repo_type: example
approaches: []
ui_technologies: [react]
build_tools: []
frontend_units: 2
unit_organization: multi-repo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 104 — sofiaresttrepo/ms-generator

## Context

NebulaE-framework microservice, with a vehicle-data generation backend and a React management module. The development script references a FUSE React shell from another repository by the same owner and passes this module’s source directory to command `nebulae compose-ui`. Composition output and shell code are not versioned in this snapshot (`playground/generate_playground.sh:5`; `playground/.gitignore:1–5`; `etc/mfe-setup.json:3–6`).

`frontend_units: 2` records both targets identifiable through configuration: a local module and explicitly referenced external shell. It counts neither each route, gateway/backend nor a third unit corresponding to future command output. Independence of these targets and sufficiency of this integration form remain open. Type `example` considers playground instructions, still-exemplary excerpts and the test screen (`README.md:61–75`; `README.md:209–219`; `frontend/emi/generator-generator-management/vehicle/VehicleGeneratorTest.js:11–17`).

## Sample provenance

- Rank, identity and strategy `terminology`: `data/samples/mfe-sample-001/sample.csv:105`. SHA and clone match `data/samples/mfe-sample-001/clones.csv:105`. The sample derives from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`).
- The candidate appears in `data/discovery/mfe-round-001/candidates.csv:18967` and `data/discovery/mfe-round-002/candidates.csv:18973`: null description, empty topics, JavaScript, MIT license and default branch `master`.
- Read-only query of tables `hits` and `queries` in `data/discovery/mfe-round-001/discovery.sqlite` and `data/discovery/mfe-round-002/discovery.sqlite`, for `repository_id=1059720425`: both record `terminology-micro-frontend-repositories` and `terminology-micro-frontends-repositories`, strategy `terminology`, endpoint `repositories`, queries `"micro frontend" in:name,description,readme` and `"micro frontends" in:name,description,readme`; without a file path. These are SQLite record keys, not code-line references.
- By elimination of searched fields, the name lacks terms, description is null and topics empty; README presents “Micro-FrontEnd”/“MicroFrontEnd” in the structure (`README.md:27–28`). This is compatible with README retrieval; hits provide no exact query-matching excerpt. Retrieval does not confirm architecture.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | Complete inventory through `git ls-tree -r` of the SHA: 76 regular files (75 mode 100644 and one 100755), zero symlinks and zero gitlinks. There are 22 files in `frontend/`, 33 in `backend/`, four in `docs/`, four in `playground/`, three in `api/`, three in `etc/`, two in `deployment/` and five at root. There is no versioned `node_modules` or submodules. Counts refer to the Git tree, without artificial text lines. | context |
| Configuration / Composition | Setup names `generator-generator-management`, indicates its existing source directory and assets, without prebuild commands (`etc/mfe-setup.json:3–6`). The script passes this setup to `compose-ui`, with `FUSE_REACT`, shell `https://github.com/sofiaresttrepo/emi.git` and output `emi` (`playground/generate_playground.sh:3–5`). There is an explicit module/shell relationship, but no Module Federation remotes/exposes. | moderate |
| Source code | The module exports `MicroFrontendConfig`, containing routes and lazy imports of three existing local files: `generator/Generator`, `generators/Generators` and `vehicle/VehicleGenerator` (`frontend/emi/generator-generator-management/MicroFrontendConfig.js:7–29`). It also exports navigation and locales (`frontend/emi/generator-generator-management/MicroFrontendConfig.js:30–58`). The shell consumer of this export was not located in the snapshot. | ambiguous |
| Technology / Source code | Actual React UI exists. The list uses `FusePageCarded`, Redux and local components, exporting the screen with a reducer (`frontend/emi/generator-generator-management/generators/Generators.js:1–11`; `frontend/emi/generator-generator-management/generators/Generators.js:23–50`). The vehicle screen executes mutations/subscription and renders start/stop controls and a list (`frontend/emi/generator-generator-management/vehicle/VehicleGenerator.js:69–109`; `frontend/emi/generator-generator-management/vehicle/VehicleGenerator.js:134–180`; `frontend/emi/generator-generator-management/vehicle/VehicleGenerator.js:207–240`). | moderate |
| Source code / Build/deploy | Imports `@fuse` and `app/store/withReducer` depend on the absent shell tree (`frontend/emi/generator-generator-management/generators/Generators.js:2–4`). The detail screen also imports actions and error pages through host aliases (`frontend/emi/generator-generator-management/generator/Generator.js:12–13`; `frontend/emi/generator-generator-management/generator/Generator.js:23–24`). Relative route imports have matching files; this validates neither aliases nor the external consumer contract. | ambiguous |
| Build/deploy | The tree’s only `package.json`/lockfile pair is in backend. Its scripts and dependencies are Node/backend (`backend/generator/package.json:9–16`; `backend/generator/package.json:31–43`). There is no frontend manifest, lockfile, standalone entry or bundler configuration allowing verification of React/Fuse/router versions or independent build. README requires global CLI installation (`README.md:172–173`), without a pinned version; it does not establish availability/compatibility. `build_tools: []` does not infer Webpack from the FUSE name. | absent |
| Structure / Documentation | The tree does not contain `playground/emi`; ignore excludes generated results (`playground/.gitignore:1–5`). README instructs composing frontend and starting output in playground (`README.md:216–219`; `README.md:257–260`), but its example uses `FUSE2_ANGULAR`/`nebulae-university/emi`, differing from React script and owner’s shell (`playground/generate_playground.sh:5`). Script and React code support snapshot description; old documentation does not validate the build. | ambiguous |
| Source code | “Generator” describes data generation: backend uses `interval(50)`, creates a random vehicle and publishes events (`backend/generator/bin/domain/vehicle/VehicleCRUD.js:163–174`; `backend/generator/bin/domain/vehicle/VehicleCRUD.js:220–249`). Local interface controls this operation. It is not merely frontend text/code displayed or produced by a generator. Generated vehicles are not frontend units. | context |
| Technology / Configuration / Composition | Text search at the SHA for `ModuleFederation`, `remoteEntry`, `exposes`, `registerApplication`, `single-spa`, `qiankun`, `wujie`, `customElements`, `postMessage`, `iframe`, `webpack`, `vite`, `createRoot` and `ReactDOM.render`, in own textual files, excluding backend lockfile and Keycloak realm JSON: no corresponding mechanism; `exposes` appears only as a verb in microAPI description (`README.md:51`). The candidate composition found is `compose-ui`, not federation. | absent |
| Documentation | README identifies NebulaE framework (`README.md:9`) and still instructs cloning base `nebulae-university/ms-generator` (`README.md:178–179`). `CONFIGURATION.md:100–106` describes data generation and UI optimizations. `README.md`, `CONFIGURATION.md`, `docs/` and other paths inventoried: there is no ADR or additional architecture document explaining how CLI imports `MicroFrontendConfig` or isolates builds. | context |

## Authorship and history

Metadata from `rev-list`/`log`, always with `GIT_NO_LAZY_FETCH=1`: five commits reachable from pinned SHA, zero merges, one root commit (`914d39b8f61a509a0fb489e5eac047374459eb11`), without shallow limit. Recorded author and committer in all five commits: `sofiaresttrepo`. `master`, `origin/master` and `origin/HEAD` point to the evaluated SHA; no other-branch content was used.

Folder name history shows actual adaptation: in `66088ab002a10a24a752a16671b21e199c76aef7` (“generator generating”), frontend modifies `MicroFrontendConfig.js` and translations and adds `gql/Vehicle.js`, `vehicle/VehicleGenerator.js` and `vehicle/VehicleGeneratorTest.js`; backend gains vehicle-domain files. In `7bf1a37eeca1309ccb3a2eb22bc057a4fbb5d225` (“generation started”), `backend/generator/bin/domain/vehicle/VehicleCRUD.js`, `VehicleES.js` and data-access files change. In `dcf6b8232be5fa01ad0fef9f99a3d919d00cae5c` (“customized template”), setups in `etc/` and the playground script change. These are commit metadata and path references, not historical blob-line references.

The additional query `git log --root --name-status` for `frontend/` and `etc/` stopped because of missing object `a7288a651d355dbc680d4c81d56e2ee0723d5e73`, with lazy fetch disabled. This history portion is locally unavailable; there was no remote fetch or repeated attempt. Thus README points to a third-party base, and metadata shows owner customizations, but does not permit attributing original authorship of every imported file. Neither all UI being vendored nor the owner writing the entire base is assumed.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | Yes | Two identifiable targets: local React module in setup and same-owner external shell explicitly passed to the composition command (`etc/mfe-setup.json:3–5`; `playground/generate_playground.sh:5`). Count includes the external reference, without asserting independence. |
| Q2 | Undetermined | There are module sources intended for the shell, without observable independent build/entry; aliases point to host code (`frontend/emi/generator-generator-management/generators/Generators.js:2–4`). CLI assembly apparently integrates sources and does not allow deciding independence without resolving build-time composition. |
| Q3 | Undetermined | Routes, navigation and locales are prepared for the shell application (`frontend/emi/generator-generator-management/MicroFrontendConfig.js:7–58`), and the script relates targets. There is no shell consumer code to check actual loading/registration. |
| Q4 | Undetermined | Setup and command are connected (`etc/mfe-setup.json:3–6`; `playground/generate_playground.sh:5`), beyond mere dependency. However CLI, shell, frontend dependencies and result are not present/pinned; setup → export discovery → route registration chain is not verifiable. |
| Q5 | Undetermined | Preparation for an external shell is concrete, but independence, consumption and admissibility of build-time source composition remain open. “MicroFrontend” terminology is insufficient. |

## Rationale

- `Uncertain/review`: there is no conclusive No answer, but Q2–Q5 remain Undetermined. Architecture is not promoted through README, name, framework or isolated configuration export.
- The control UI actually exists; exclusions 075/081 for merely generated/displayed frontend code do not eliminate this module. Nor do they turn generated data or the future shell copy into additional units.
- There is no Module Federation chain to validate. There are a setup contract and route export whose local paths exist, but external consumer and compatibility remain unverified. Absence of this verification prevents confirming MFE-implemented or automatically applying MFE-unit.
- `approaches: []` records that no qualifying mechanism was confirmed: the command suggests build-time source composition, but there is no frontend package publishing/importing justifying label `build-time-packages`.

## Analysis notes

- **RQ1 (family):** searches for `sofiaresttrepo`, `ms-generator`, `nebulae`, `compose-ui` and `FUSE_REACT` in available annotations found no previously annotated sibling/template. Kinship with NebulaE framework/base follows from `README.md:9` and `README.md:178–179`, not comparison of unavailable historical blobs.
- **RQ2:** 097/103 warn of configuration without a connectable chain. Here relative route targets exist, but CLI, aliases and export consumer are not resolvable in this snapshot; no specific props/export error is asserted without the shell. 089/100 discuss code sharing; this case offers pages, navigation and domain operations, though it may still result in a single host build.
- **RQ3:** 074/102/080 require separating third-party platform/base and own code. The current command points to the owner’s own shell; it does not exclusively configure a plugin hosted by a third-party platform. Identified customizations do not authorize attributing the entire base to the owner. 076/084/096 present more complete host/remote chains; the same build and consumption evidence is absent here.
- **Checklist:** the open build-time composition decision also matters when the mechanism supplies module sources to a shell through CLI, without independent frontend manifests. The snapshot demonstrates neither package publication nor separate deployment.

## Recorded decision

Retain **Uncertain**. Local module, `compose-ui` setup and referenced external shell show a composition relationship, but shell, generated result and independent build are not in the snapshot. Thus it is impossible to determine whether the module is a relatively independent MFE unit or merely sources incorporated into a conventional FUSE application.
