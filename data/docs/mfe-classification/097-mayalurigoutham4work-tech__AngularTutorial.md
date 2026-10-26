---
schema: 1
id: 1237162366
full_name: mayalurigoutham4work-tech/AngularTutorial
url: https://github.com/mayalurigoutham4work-tech/AngularTutorial
commit: 0aca529f5d3b65b983e02b33a4f4d5103c544df7
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: example
approaches: []
ui_technologies: [angular]
build_tools: []
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 097 — mayalurigoutham4work-tech/AngularTutorial

## Context

Angular e-commerce example with product, cart, order, account and category pages. Implementation has one application in `angular-app/`, with one bootstrap and one route table importing all local pages. Documentation announces Native Module Federation (`README.md:1–3`), but also places remotes and their loading as future work (`angular-app/ARCHITECTURE.md:244–281`, `angular-app/SETUP_COMPLETE.md:180–200`). File `federation.config.js` exists, but is referenced neither by build nor bootstrap and exposes only shared services/components, not a remote application.

Clone confirmed: `mayalurigoutham4work-tech__AngularTutorial`; SHA according to `data/samples/mfe-sample-001/clones.csv:98`. Complete inventory through `git ls-tree -r 0aca529f5d3b65b983e02b33a4f4d5103c544df7`: **2.008 regular files** (mode `100644`), **zero symlinks** and **zero gitlinks**. Of these files, **1.961** are under `angular-app/.npm-cache/`, including cacache content/indexes and logs; **47** remain outside cache. There is no versioned `node_modules/` or submodule. npm configuration uses local cache (`angular-app/.npmrc:1–2`); cache objects are not own-unit sources and were not extracted/executed.

The inventory of own paths contains one application manifest (`angular-app/package.json`), one Angular CLI configuration and one `src/main.ts`. Projects `products-mfe`, `cart-mfe` or `account-mfe` do not exist in the snapshot. `frontend_units: 1` counts the actual application; internal pages and applications only proposed in documents do not increase this count.

## Sample provenance

- `data/samples/mfe-sample-001/sample.csv:98` records rank 97, id 1237162366, `strategies: terminology;technology` and eligibility `pass`. The manifest identifies `data/discovery/mfe-round-002` as origin round (`data/samples/mfe-sample-001/manifest.json:2–5`).
- The candidate is in `data/discovery/mfe-round-001/candidates.csv:29995` and `data/discovery/mfe-round-002/candidates.csv:30001`. In both: same strategies; null description; empty topics; TypeScript language; null license; default branch `main`; creation on 2026-05-12 and last push on 2026-05-13. These are discovery metadata, not architecture confirmation.
- Databases `data/discovery/mfe-round-001/discovery.sqlite` and `data/discovery/mfe-round-002/discovery.sqlite` queried with `sqlite3 -readonly`. In each, `hits JOIN queries` through `query_id`, filtering `hits.repository_id = 1237162366`, returns the same three hits: `technology-module-federation-repositories`, `terminology-micro-frontend-repositories` and `terminology-micro-frontends-repositories`. All use endpoint `repositories`, without a code path (empty `path`), searching respectively `"module federation"`, `"micro frontend"` and `"micro frontends"` in `name,description,readme`.
- **Field elimination:** `AngularTutorial` does not contain these expressions; description and topics are empty. README is the observed compatible field: title with Native Module Federation and description with micro frontends (`README.md:1–3`). Hits neither attribute search to a line nor guarantee identity between indexed version and snapshot. The repository name was not used as architectural evidence.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure / Source code (entry) | `angular-app/src/index.html:10–12` contains `app-root`; `angular-app/src/main.ts:1–6` imports local App/appConfig and executes `bootstrapApplication`. `angular-app/src/app/app.config.ts:4–9` provides the application router, without federation initialization. | contrary |
| Composition (routes) | `angular-app/src/app/app.routes.ts:1–8` directly imports ShellLayout and six pages from the same application directory; `:10–24` associates routes with these classes. It loads neither external modules nor remotes by URL. | contrary |
| Source code (shell) | `angular-app/src/app/app.ts:1–11` renders the router outlet. `angular-app/src/app/layouts/shell.layout.ts:1–15` imports local Header/Footer and wraps another router outlet. The name Shell corresponds to a layout of the same application, not a host of independent applications. | contrary |
| Source code (pages and services) | Products imports local product/cart services (`angular-app/src/app/pages/products.component.ts:1–10`). Shared barrels only re-export Cart/Product/Order services (`angular-app/src/app/shared/services/index.ts:1–3`) and Header/Footer (`angular-app/src/app/shared/components/index.ts:1–2`). These are parts of the single application. | contrary |
| Configuration (isolated federation file) | `angular-app/federation.config.js:1–15` calls `withModuleFederationPlugin` and `shareAll` imported from `@angular/build`, names `shell`, defines `remoteEntry.js` and exposes `./SharedServices` and `./SharedComponents`. It neither declares remotes nor exposes an application target. Mere file presence does not demonstrate that the build reads it or produces a functional container. Besides not being read by any build file, it is not resolvable in the snapshot: `package.json` and `package-lock.json` declare no federation package (`@angular-architects/*`, `@module-federation/*` or `@softarc/*`, search without occurrences), `angular.json` uses builder `@angular/build:application` without `webpackConfig` (`angular.json:8–29`), and independent review notes that `withModuleFederationPlugin` and `shareAll` belong to `@angular-architects/module-federation`, not `@angular/build`, from which the file imports them (`federation.config.js:1`). No container could be generated from it. | weak |
| Build/deploy | `angular-app/package.json:4–9` calls only Angular CLI. `angular-app/angular.json:8–29` defines one `application` project, builder `@angular/build:application` and entry `src/main.ts`; the remainder configures optimization, dev server and tests (`:31–69`), without reference to `federation.config.js`, webpackConfig or federation builder. There is no bootstrap integration hook (`angular-app/src/main.ts:1–6`). | contrary |
| Technology | Angular is declared in `angular-app/package.json:14–19` and used in bootstrap/routes. The CLI encapsulates the bundler; no bundler file or hook actually connected to the build was observed. The isolated federation file does not support attributing Webpack or native-federation to the implementation. `ui_technologies: [angular]`, `build_tools: []` and `approaches: []` are recorded. | context |
| Architecture documentation (future state) | `angular-app/ARCHITECTURE.md:7–34` shows the application with header, pages, router and footer. The section titled “Module Federation Setup (Future)” (`:244–281`) draws Products/Cart/Account as future remotes, with ports 4201–4203. The diagram does not correspond to present projects/configurations. | contrary |
| Documentation (steps still required) | `angular-app/SETUP_COMPLETE.md:180–200` says to extend with actual micro-frontends, create applications, configure each and update routes for remote importing. `angular-app/MICRO_FRONTENDS_SETUP.md:24–46` contains commands and example configuration for creating Products MFE; `:67–75` presents a future webpack reference in the build. This is guide content, not active configuration. | contrary |
| Documentation (contradictory signals) | The README claims MFE architecture (`README.md:3–28`) and describes remote creation as instructions (`README.md:178–187`). `angular-app/SETUP_COMPLETE.md:5–12` announces ready support, but its own next-steps section requires creating and loading remotes. Claims were checked against consumer code, without assuming implementation from text. | context |
| Structure (negative unit search) | All paths inventoried, separating `.npm-cache/`; searched for other own manifests, application entries, remote configurations, gitlinks and ADRs. Only `angular-app/` is an own target; architecture documents are the Markdown files already listed, without a separate ADR. Dependency/cache objects and creation commands in Markdown do not count as applications. | absent |
| Configuration / Source code (negative composition search) | `angular-app/src/`, `angular-app/angular.json`, `angular-app/package.json` and `angular-app/federation.config.js` were searched for `loadRemoteModule`, `loadRemoteEntry`, `initFederation`, `remotes`, `single-spa`, `registerApplication`, `registerMicroApps`, `iframe`, `postMessage`, `customElements`, `importmap` and `import-map`: no results. Expanded federation search finds the isolated file and page marketing text, without a composition consumer. | absent |
| Build/deploy (negative connection search) | `federation.config` searched in all own files, excluding `angular-app/.npm-cache/` and `angular-app/package-lock.json`: results only in duplicated README and documents/guides. No build file, script or source imports/references the isolated configuration. The example reference in `angular-app/MICRO_FRONTENDS_SETUP.md:67–75` does not exist in `angular-app/angular.json:15–29`. | absent |

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | One own application, with one bootstrap (`angular-app/src/main.ts:1–6`) and six directly imported pages (`angular-app/src/app/app.routes.ts:1–24`). Remotes appear only as future creation (`angular-app/SETUP_COMPLETE.md:180–200`). |
| Q2 | No | One project/build (`angular-app/angular.json:8–29`), without a set of independent units. The isolated file exposes services/components, not an application prepared for an external host through an observable build chain (`angular-app/federation.config.js:6–9`). Therefore Q1 No does not lead to Undetermined. |
| Q3 | No | ShellLayout wraps pages of the same application (`angular-app/src/app/layouts/shell.layout.ts:1–15`, `angular-app/src/app/app.routes.ts:10–24`), without a host loading other frontend units. |
| Q4 | No | Federation configuration not connected to the build; CLI points to conventional bootstrap (`angular-app/angular.json:15–29`, `angular-app/src/main.ts:1–6`). There is no remote consumer; their integration is a future step (`angular-app/SETUP_COMPLETE.md:199–200`). |
| Q5 | No | Conventional monolithic application code with future-extraction proposal/documentation (`angular-app/ARCHITECTURE.md:244–281`). Composition execution evidence does not exist in code; Q5 follows Q1–Q4. |

## Rationale

- Proposed `Non-MFE`: conventional frontend and federation mentions/configuration without implemented composition. Precedents 023/028 and 075/081 prevent counting diagrams, commands and documentary snippets as actual units.
- It is not MFE-unit: the file is not connected to the build and exposes only services/components, without an application unit explicitly prepared for an external host. This is not case 089, where actual federation needed evaluation as possible code sharing; here both build chain and consumer are missing. Q2–Q4 are No, not Undetermined. The federation file is also not resolvable (no declared federation package or compatible builder), so there is no unit that could be generated for an external host.
- Inclusion of a host with external remotes does not apply: there are no remotes in executable configuration or loading code. Diagram ports and applications are proposals. There is also no link/iframe composition contract or build-time-only unit integration to arbitrate.
- `frontend_units: 1` counts the only own target after inventory, without npm cache, services, components or merely planned remotes. `repo_type: example` corresponds to the tutorial/demonstration with example products (`README.md:203–210`).

## Analysis notes

- **RQ1:** the same strategies and three hits appear in rounds 001 and 002. The README thematic description and “Native” label contrast with bootstrap/build and the future architecture section; an implemented approach is not inferred from the label.
- **RQ3:** the decisive relationship is absence of a connection from `federation.config.js` to the build, combined with local route imports. The abstract possibility of installing/fixing a plugin and creating remotes does not change snapshot classification.
- **Protocol (families/templates):** `mayalurigoutham`, `AngularTutorial`, `EComm Platform` and `Native Module Federation Power` searched in existing annotations, without an identified sibling. Both snapshot READMEs have the same blob; they are internal duplication, not two applications. 091 is a parallel distinguishing current implementation and future architecture, and 023/028 for excluding content without composition; no shared family is asserted. Conventional Angular CLI configuration is observed directly, without attributing origin to a specific template merely from similarity.
- **History:** non-shallow clone; **3 reachable commits**, **0 merges** and **1 root commit**, checked through `git rev-list --count`, `--count --merges` and `--max-parents=0`. All on 2026-05-12: `bbd97cf61012e8f52c23c00045f6c2fc7a99b567` (“Initial commit”), `9654d3177c7c76b0783316062d5b867cd86803f9` (“Add README.md for ECommerce platform”) and the evaluated SHA (“Update README.md”). Complete tree comparison: root has 2.007 files; the second commit adds only `README.md` at the root, and the third changes only that README. Code, isolated configuration and documents in `angular-app/` do not change in these two commits.
- **Protocol (branches and limitations):** only `main`, `origin/main` and `origin/HEAD`, all at the pinned SHA. No other-branch content was used. Static local inspection, without network, submodule access, installation, QUICK_START execution, build or tests. No open decision needed to classify observed code.
