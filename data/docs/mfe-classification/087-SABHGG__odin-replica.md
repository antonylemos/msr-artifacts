---
schema: 1
id: 1183434052
full_name: SABHGG/odin-replica
url: https://github.com/SABHGG/odin-replica
commit: 06ce2bd578663f88243854f6eef292686660dfce
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
approaches: [single-spa]
ui_technologies: [react]
build_tools: []
frontend_units: 2
unit_organization: multi-repo
annotation:
  method: manual
  status: final
  date: 2026-10-22
---

# 087 — SABHGG/odin-replica

## Context

Demonstration host with a local React unit, `odin-react`, and an external unit registered as `leadocs-angular`. The remote is obtained through a configurable bundle URL and must publish the global object `leapdocs` for single-spa (`src/index.js:55–103`). The local interface contains demonstration pages and a section activating the remote (`src/App.js:7–23`, `src/App.js:41–58`).

Commit checked against `data/samples/mfe-sample-001/clones.csv:88`. The complete inventory through `git ls-tree -r --name-only 06ce2bd578663f88243854f6eef292686660dfce` contains 19 files, none under `node_modules/`. There is only one project manifest (`package.json`) and one local frontend implementation in `src/`. The second unit counts through an explicit reference in composition configuration, according to Q1 and the template: `registerApplication('leadocs-angular', ...)` in `src/index.js:63–100`. Therefore `frontend_units: 2` means one own unit in the snapshot plus one explicitly referenced remote, without counting third-party libraries. `unit_organization: multi-repo` records this local/external boundary; the remote repository URL is not observable. The single-spa root and `odin-react` unit form a single CRA bundle (`src/index.js:4` statically imports `./root.app`), so the local unit is, in practice, the host with its own lifecycles; the count of 2 units (local host and external remote) follows 008. History shows single-spa intentionally added over a CRA scaffold: commit 80616f7 (2026-03-11, scaffold) and 06ce2bd (2026-03-16, "feat: update dependencies and implement single-spa for microfrontend architecture"); history read in read-only mode. `zone.js` (`src/index.js:2`) corroborates host preparation for an Angular remote, without observed Angular implementation.

The local references `master`, `origin/master` and `origin/HEAD` point to the same evaluated commit. They were recorded only as context; no other snapshot or remote content was used in the classification.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Technology | `package.json:9–16` declares React, ReactDOM, single-spa, single-spa-react and zone.js. These dependencies do not confirm the architecture alone; their consumption is in the registrations, lifecycles and loader cited below. | weak |
| Build/deploy | `package.json:18–22` defines its own start and build with `react-scripts`. The lockfile identifies Webpack in this toolchain’s dependencies (`package-lock.json:13869–13875`) and records its resolved version in `package-lock.json:16532–16534`. The external bundle has a separate URL, defined in `src/index.js:7–9`; its sources and build are not in the snapshot. | moderate |
| Source code (local unit) | `src/root.app.js:6–14` adapts the App component with `singleSpaReact` and uses `#root` as container. `src/root.app.js:16–21` exports `bootstrap`, `mount`, `unmount` and the lifecycle object. `public/index.html:31` provides the local mounting node. | strong |
| Configuration / Source code (single-spa root) | The entry itself, `src/index.js:2–4`, imports single-spa and the local lifecycle object. `src/index.js:55–60` registers `odin-react` with loading of this object and permanent activation; `src/index.js:63–100` registers the second unit; `src/index.js:102–103` starts the orchestrator. This is not merely an exported preparation file without a consumer. | strong |
| Configuration (external unit) | `src/index.js:7–9` defines origin and bundle through `REACT_APP_LEAPDOCS_ORIGIN` and `REACT_APP_LEAPDOCS_BUNDLE_URL`, defaulting to `http://localhost:4200/main.js`. This address is used in the loader, not merely cited in the README. The registration name and comments identify the remote as Angular (`src/index.js:62–64`), but there is no own Angular code allowing confirmation of this framework’s implementation or version. | moderate |
| Source code (loading and contract) | `src/index.js:65–94` implements a loading Promise: it reuses `globalThis.leapdocs` if present; otherwise, it creates a script with the external URL, injects it into `document.head` and resolves with the expected global object. There is explicit rejection if the script fails to load or expose this object. The loader return is delivered to the single-spa registration in `src/index.js:63–100`. | strong |
| Composition / Source code (activation and target) | `src/App.js:16–23` emits `toggle-leapdocs` when the section changes, triggered by the buttons in `src/App.js:29–37`. `src/index.js:44–51` listens to this event, updates activation state and calls `triggerAppChange`. `src/index.js:96–99` uses this state and passes `domElementGetter` pointing to `microfrontend-container`; `src/App.js:56–58` creates this same node inside the main UI area. | strong |
| Source code (navigation coordination) | `src/index.js:10–40` normalizes the `/leapdocs` prefix and adapts `pushState`/`replaceState`; `src/index.js:53` handles `popstate`. This is host integration code, although use and behavior of the remote router are not observable in this snapshot. Inclusion depends on single-spa registration and loader, not link or iframe. | moderate |
| Documentation | `README.md:1–3` identifies the Create React App scaffold; `README.md:9–30` documents standard scripts. The inventory of 19 paths was searched for ADRs, `docs/` directories, architecture documents and diagrams, without specific artifacts found. The observed architecture is in entry and lifecycle code, not generic README text. | context |
| Structure / Source code (negative local remote search) | Other `package.json`, `angular.json`, `.ts`/`.tsx` sources, second application directories and remote build/deployment files were searched throughout the tree: none was found. The `src/` import audit found local sources of the unit itself and npm packages; it found no direct Leapdocs source imports. The remote is consumed through the external bundle in `src/index.js:72–93`. | absent |
| Configuration / Source code (negative search for other mechanisms) | `src/`, `public/`, `package.json` and `README.md` were searched for `ModuleFederation`, `module.federation`, `remoteEntry`, `exposes:`, `remotes:`, `registerMicroApps`, `qiankun`, `wujie`, `customElements.define`, `importmap`, `import-map`, `postMessage`, `<iframe` and `srcDoc`, without results. The observed approach is single-spa with a script loader; Module Federation is not attributed based on transitive Webpack presence. | absent |

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | Yes | Two units explicitly registered in composition configuration: local React in `src/index.js:55–60` and remote in `src/index.js:63–100`. Q1 accepts external units referenced by configuration; they are not merely names or dependencies. |
| Q2 | Yes | The local unit has its own entry and build (`src/index.js:2–4`, `package.json:18–22`); the remote is an artifact loaded through a separate URL (`src/index.js:7–9`, `src/index.js:72–93`), without local source imports from the other target. The operational criterion for a separately served external unit applies; its build commands and repository are not observable. |
| Q3 | Yes | The local App maintains the layout and creates space for the remote (`src/App.js:25–58`); its activation event reaches the orchestrator (`src/App.js:16–23`, `src/index.js:44–51`). The remote registration receives the getter for the same container (`src/index.js:96–99`). There is integration of units in the same application, not merely navigation between sites. |
| Q4 | Yes | The entry code executes `registerApplication` for both targets and `start()` (`src/index.js:55–103`), with actual local lifecycles (`src/root.app.js:6–21`) and a remote loader returning the global object to single-spa (`src/index.js:65–94`). Activation is connected to UI buttons and the container. Composition is implemented host-side; it is not asserted that the external bundle was accessed or executed in this inspection. |
| Q5 | Yes | Q1–Q4 converge: registration, independence through a remote artifact, activation, loader and container are connected by consumer code (`src/index.js:44–103`, `src/App.js:16–23`, `src/App.js:56–58`). There is no Q5 override. |

## Rationale

- Q1–Q5 are Yes: proposed `MFE-implemented`, under the inclusion case of a repository containing the host and referencing external units. Absence of remote sources is not equivalent to absence of host composition configuration.
- The example goes beyond CRA scaffold and dependencies: single-spa is called by the entry, the local component is adapted with lifecycles and the remote is loaded by script under orchestrator control. The exclusion of teaching content or targets without a composition relationship from precedents 023/028 does not apply.
- It is not MFE-unit: the composition host/root is present and registers both units. Nor is it a plugin whose only host is a third-party platform; the host is this candidate’s React application.
- `approaches: [single-spa]` records the mechanism managing applications; script injection is its loading strategy here. It does not depend on iframe/link or build-time composition decisions.
- `ui_technologies: [react]` records what is observable in the local implementation. `build_tools: []`: the bundler is Webpack encapsulated by `react-scripts` (unejected CRA, without `webpack.config.js`, craco or config-overrides in the tree); the convention of 013, 036 and 081 only records a bundler with explicit author configuration, unlike 019 (ejected CRA). The lockfile describes a transitive dependency, not configuration. The remote is called Angular in code, but Angular is not added as confirmed implementation technology without its artifacts.

## Analysis notes

- **RQ1:** the generic README does not describe MFE; decisive evidence is in `src/index.js`, `src/root.app.js` and the event/container in `src/App.js`. The lockfile contains `node_modules/...` records, but no dependency directory was versioned and no package is counted as a unit.
- **RQ3:** the expected remote contract is a global `leapdocs` object delivered to single-spa, together with the container getter. The remote code publishing this object and using the props is unavailable. No build, tests or requests to the external address were run; the evaluation concerns the consumer mechanism implemented in the host.
- **Protocol:** searches in annotations for `SABHGG`, `odin-replica`, `Leapdocs` and `Leadocs` found no previously recorded family. There is mechanism affinity with lifecycle adaptation in `docs/mfe-classification/058-ducknem2086__vue-lifecycle-demo.md`, but there the host is absent; here the root registers targets and starts composition. The script loader resembles `docs/mfe-classification/002-EnjoyFX__fe_containerize.md`, which uses its own mounting contract instead of single-spa. These are architectural comparisons, without evidence of common template origin.
- **Protocol (counting):** two targets in the Q1 sense: one local and one explicitly referenced. This count follows the template and the external-remotes host precedent `docs/mfe-classification/008-mrmechazilla__host-app.md`; it does not indicate two own implementations present in the tree or acquisition of the remote.
