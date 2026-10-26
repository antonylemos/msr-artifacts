---
schema: 1
id: 1013293028
full_name: YanPes/mf-shared-dependency-monitor
url: https://github.com/YanPes/mf-shared-dependency-monitor
commit: 44678aa4bee65e7156ae9492a7528843c3b43894
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: other
approaches: []
ui_technologies: [react]
build_tools: []
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 113 — YanPes/mf-shared-dependency-monitor

## Context

Browser extension inspecting Module Federation metadata of the active page and presenting remotes and dependency mismatches in a React popup. The extension reads an already running external application; it does not configure, initialize or mount that application’s remotes (`README.md:2`; `README.md:51–56`; `src/components/popup/popup.tsx:35–59`). `repo_type: other` records an inspection tool with its own UI; it is neither a federation library/plugin nor a repository of host/remote examples.

## Sample provenance

- Rank 113, identity, ID and strategies `terminology;technology`: `data/samples/mfe-sample-001/sample.csv:114`. Clone, branch `main` and SHA checked in `data/samples/mfe-sample-001/clones.csv:114`. The sample derives from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`).
- `data/discovery/mfe-round-001/candidates.csv:15953` records eligibility `unknown`; `data/discovery/mfe-round-002/candidates.csv:15957`, `pass`. Both describe a tool detecting divergent versions in Module Federation runtime, with empty topics, TypeScript language, MIT license and `fork: false`.
- `sqlite3 -readonly` query in databases `data/discovery/mfe-round-001/discovery.sqlite` and `data/discovery/mfe-round-002/discovery.sqlite`, joining `hits`, `queries` and `subqueries`, by `repository_id=1013293028`: both record the same three hits, endpoint `repositories`, empty `path`, `partition_label: created:2025-07`.

| Query | Strategy | Spelling of `q` | Subquery | Spelling of `q_effective` |
|---|---|---|---|---|
| `technology-module-federation-repositories` | `technology` | `"module federation" in:name,description,readme` | `technology-module-federation-repositories#created:2025-07` | `"module federation" in:name,description,readme pushed:>=2025-04-01 created:2025-07-01..2025-07-31` |
| `terminology-micro-frontend-repositories` | `terminology` | `"micro frontend" in:name,description,readme` | `terminology-micro-frontend-repositories#created:2025-07` | `"micro frontend" in:name,description,readme pushed:>=2025-04-01 created:2025-07-01..2025-07-31` |
| `terminology-micro-frontends-repositories` | `terminology` | `"micro frontends" in:name,description,readme` | `terminology-micro-frontends-repositories#created:2025-07` | `"micro frontends" in:name,description,readme pushed:>=2025-04-01 created:2025-07-01..2025-07-31` |

In order of the three rows, values of `fetched_at` are `2026-10-07T23:18:34.983Z`, `2026-10-07T22:23:54.666Z` and `2026-10-07T22:55:30.340Z` in round 001; `2026-10-08T16:15:11.909Z`, `2026-10-08T15:55:10.597Z` and `2026-10-08T16:06:12.739Z` in round 002. SQLite identifiers receive no artificial line numbers.

README contains `Module Federation` in `README.md:1–2` and `micro-frontends` — hyphenated plural — in `README.md:11`. For technology, description and README are both compatible; no unique field is attributed. For terminology, name/description lack the expression micro frontend and topics are empty, making README the compatible field by elimination. Queries use spaces, and observed mention is hyphenated plural; hits provide neither exact excerpt nor normalization. Repository name is not architectural evidence.

README at the SHA **is not later than searches**: metadata of its last modifying commit, `c92394b0b04467f2271a86bb10e33e2905e1b8f1`, record `2026-06-05T19:13:19+02:00` (`2026-06-05T17:13:19Z`), before October collections. HEAD is from 13/06/2026. Historical README/blobs were unnecessary to establish chronology.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | Complete inventory through `git ls-tree -r` of the SHA: 31 regular files, all mode 100644; zero symlinks and zero gitlinks. Nine files in `src/`, four in `icons/`, three in `docs/`, three screenshots in `public/` and 12 at root. No `node_modules`, submodule, vendored host/remote code, other npm manifest or application-composition configuration. Git-tree counts, without artificial text lines. | context |
| Configuration / Structure | Extension manifest v3 declares permissions `scripting`, `activeTab`, `tabs` and `default_popup: popup.html` (`manifest.json:1–19`). It defines no remotes/exposes; the extension’s execution host is the browser, not a frontend application composed by the owner. | contrary |
| Source code (UI entry) | `popup.html` contains `#root` and loads `src/popup/index.tsx` (`popup.html:44–46`). This entry imports local Popup component and renders it with React `createRoot` (`src/popup/index.tsx:1–4`; `src/popup/index.tsx:30–36`). It is the sole observed application UI target. | contrary |
| Source code (diagnostics) | Popup obtains active tab and uses `chrome.scripting.executeScript`, `allFrames: true`, function `createExtractor()` and context `MAIN` (`src/components/popup/popup.tsx:35–59`). This API executes extraction in the inspected page; it does not load a remote application into popup. Extractor is a self-contained exported function (`src/extractor.ts:1–4`; `src/extractor.ts:32–48`). | contrary |
| Source code (external runtime) | Extractor reads `window.__FEDERATION__`, its instances and remote options (`src/extractor.ts:48–82`), and queries performance entries for already-loaded `remoteEntry.js`/`mf-manifest.json` URLs (`src/extractor.ts:112–128`). These are inspected-page data, without own configuration naming/locating candidate units. The word remoteEntry is a detection criterion, not MF build output in this repository. | contrary |
| Source code (presentation) | Popup aggregates results and updates local state (`src/components/popup/popup.tsx:67–117`). `RemoteCard` receives a metadata object and presents its URL as external link (`src/components/remote-card/remote-card.tsx:5–11`; `src/components/remote-card/remote-card.tsx:23–32`), while SharedDepsTab presents mismatches (`src/components/shared-deps-tab/shared-deps-tab.tsx:3–16`). None of these components imports or mounts the detected remote module. | contrary |
| Source code (boundaries) | Ran `git grep -n -F -e '../../' -e '../../../'` across all `src/` at the SHA. Three results: import of `createExtractor` and its type in Popup (`src/components/popup/popup.tsx:5–6`) and type import in SharedDepsTab (`src/components/shared-deps-tab/shared-deps-tab.tsx:3`). All resolve to the same `src/extractor.ts`, part of the extension. Absence is not generalized from a sample: links exist, but not between independent frontend units. | context |
| Build/deploy / Technology | Scripts call Extension.js for browser-specific dev/build (`package.json:5–14`); `extension.config.js:1–15` configures commands, polyfill, browsers and zip. React/ReactDOM are dependencies (`package.json:16–18`); lockfile pins both at 18.3.1 (`package-lock.json:6214–6218`; `package-lock.json:6227–6231`) and Extension.js 3.18.2 (`package-lock.json:3839–3843`). Entries and local imports exist. Basic static resolution checked, without installing/running build; `build_tools: []` because there is no explicit bundler configuration/hook beyond Extension.js wrapper. | context |
| Technology / Configuration / Composition | Text search at the SHA, excluding lockfile, for `ModuleFederationPlugin`, `withModuleFederation`, `registerApplication`, `single-spa`, `qiankun`, `wujie`, `customElements`, `postMessage`, `iframe`, `importmap`, `loadRemote` and `exposes:`: no results. File inventory and configuration inspection find no remotes ↔ exposes ↔ consumption chain, MF SDK/runtime used for composition or frontend preparation for an external host. Reading MF metadata does not equal configuring MF. | absent |
| Structure / Documentation | `docs/index.html:15–18` is a static introduction page with privacy link; `docs/privacy-policy/index.html:15–16` identifies extension policy. These are auxiliary documentation, without independent build/application or composition relationship with popup; they are not additional Q1 units. README explains scanning and browser use (`README.md:51–72`). No ADR/additional architecture document exists in inventory. | context |

## Authorship and history

Metadata at the SHA: 36 reachable commits, four merges, one root commit `93a070fb3313d2142bc4b5bbbe704064c93f501e`, non-shallow clone. Author/committer pairs: 21 `YanPes`/`YanPes`, 11 `Yannik Peschke`/`GitHub`, three `yanpes`/`yanpes` and one `Yannik Peschke`/`Yannik Peschke`. Neither equivalence between identities nor complete intellectual authorship is presumed from these records.

`git log --no-renames --name-status` for `src/`, `docs/`, `manifest.json` and `extension.config.js`, always with `GIT_NO_LAZY_FETCH=1`, shows incremental evolution. `2dd421d0f1612f915cfe8280b9e6ffab03b82faa` adds React entry/UI in Rsbuild flow; `902c372df3c71de932df50fc769fb1ffa5ef3fdf` adds documentation pages; `c92394b0b04467f2271a86bb10e33e2905e1b8f1` adds Extension.js configuration and changes components/manifest; HEAD adjusts Firefox sizing/presentation in `src/popup/index.tsx` and styles. No object was missing in these queries, and historical blobs were unnecessary. Historical mention of Rsbuild does not authorize counting bundler configuration absent from snapshot.

Refs `main`, `origin/main` and `origin/HEAD` point to evaluated SHA; UI/README branches and `feature/module-graph-visualization` also exist. Only their names/metadata were recorded, without incorporating other-branch content. History does not indicate an entire third-party platform imported as own target; tool uses browser APIs and libraries, without attributing those dependencies’ authorship to the owner.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | One extension UI, with React entry and root (`manifest.json:11–19`; `popup.html:44–46`; `src/popup/index.tsx:30–36`). Detected remotes are arbitrary-page data, not units present/referenced by candidate composition configuration (`src/extractor.ts:48–82`). |
| Q2 | No | No set of frontend units with their own entries/builds. Popup, components and extractor belong to the same target, with direct local imports (`src/components/popup/popup.tsx:3–6`; `package.json:5–14`). Relative-path scan covered all `src/`. |
| Q3 | No | Inspected page supplies data to popup through scripting API, without a host loading/mounting/routing its units in extension UI (`src/components/popup/popup.tsx:55–59`; `src/components/popup/popup.tsx:67–117`). |
| Q4 | No | Configuration is for a browser extension and code reads external runtime/performance (`manifest.json:1–19`; `src/extractor.ts:48–82`; `src/extractor.ts:112–128`), without an own configured mechanism used to connect frontend units. |
| Q5 | No | Diagnostic tool for MFE environments, without implementing MFE architecture or supplying a federated frontend unit for an external host. |

## Rationale

- `Non-MFE`: Q1–Q5 No, without MFE-unit exception. `repo_type: other` records a tool, following distinction in 075; `frontend_units: 1` counts its React popup after complete inventory. Components, UI-less extractor, auxiliary pages or arbitrary-site units the tool might inspect are not counted.
- Q1 requires concrete units or composition-configuration references, not runtime-collected metadata. Q2 requires own entry/build per unit: serializing a function for execution in tab does not create a second frontend unit. Q4 requires configured and connected composition; a federated-file detector does not satisfy this criterion.
- Names `RemoteInfo`, `remoteEntry` and `__FEDERATION__` were checked against their use instead of serving as confirmation. Extension reads and presents these data; it does not import the detected application. RemoteCard links open URLs as information, without an application-composition contract between units.
- This is neither an absent-external-host scenario nor unconnectable configuration as in 097/103/104: no unit is prepared for external composition. Q2–Q4 are No. Code-sharing decision in 089/100 does not arise, since candidate does not use MF even to share its components.
- 076/084/096/106/109 and final 007 contain application/host/remote chains; here external applications are inspection objects. Browser platform is third-party, but no Q5 override as in 037 is needed: no MF remote/widget is even registered for it. Third-party cautions of 074/102/080 prevent counting inspected application as own code, without denying the implemented popup exists.
- This is neither personal profile as in 011/064/068/073/077/101/111 nor mere educational content. As in 023/075/081/094/105, screenshots, documentation and merely displayed code add no units. Tool name is irrelevant to confirming MFE.
- No open question concerns link/iframe integration or build-time composition. React is observed in sources; bundler is encapsulated in Extension.js at the SHA, hence `build_tools: []`. Builds, tests and browser were not run.

## Analysis notes

- **RQ1 (families):** searches for `YanPes`, `dependency monitor` and browser-extension references in available annotations found no previously annotated sibling/template. Functional comparison with tools such as 075, without asserting common origin.
- **RQ3:** actual chain: popup click/opening → active tab → self-contained extractor in page context → returned data → React state → presentation. It is not a host → remote → mounted UI chain.
- **Protocol:** README predates searches; queries/subqueries and spellings were preserved. Retrieval hits about MFE technology may correspond to a tool inspecting that technology, without MFE architecture implemented in the candidate itself.
- **Protocol (lockfile):** text search excludes lockfile. `package-lock.json` contains six `@module-federation/*` packages (runtime, runtime-core, runtime-tools, sdk and webpack-bundler-runtime), transitive from `@rspack/core` through `extension-develop` (Extension.js); none is direct dependency (`package.json:16–28`) or imported in `src`. This is the encapsulated bundler’s internal runtime, not candidate Module Federation use, reinforcing `build_tools: []`.
- **Protocol (chronology):** hit `pushed_at` (2026-09-09T13:41:58Z) is later than `main` HEAD (2026-06-13). Ref metadata show push was to `origin/feature/module-graph-visualization` (`c17f76c`, 2026-09-09T13:41:39Z); evaluated `main` did not change. That branch’s content was not read.
