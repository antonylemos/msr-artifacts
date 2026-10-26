---
schema: 1
id: 1199566448
full_name: piyalidas10/Angular-API-Response-Mocking
url: https://github.com/piyalidas10/Angular-API-Response-Mocking
commit: 7fdcde15543b4ac9a64b09e1be2019ea566a4471
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

# 107 — piyalidas10/Angular-API-Response-Mocking

## Context

Angular example of mocking HTTP responses from CSV. A users screen consumes a service; the interceptor selects a CSV and returns `HttpResponse`, with optional forwarding to the real API. The reference to microfrontend isolation describes a possible use of this development technique, without implementing frontend composition (`README.md:34–39`; `angular-csv-mocking/src/app/shared/mock.interceptor.ts:28–43`; `angular-csv-mocking/src/app/shared/mock.interceptor.ts:73–80`).

## Sample provenance

- Rank 107, ID, identity and strategy `terminology`: `data/samples/mfe-sample-001/sample.csv:108`. Clone, branch `main` and SHA checked in `data/samples/mfe-sample-001/clones.csv:108`. The sample derives from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`).
- `data/discovery/mfe-round-001/candidates.csv:27674` records eligibility `unknown`; `data/discovery/mfe-round-002/candidates.csv:27681`, `pass`. Both show description `In DEV and ST, API requests and responses are stubbed using CSV-based mock data.`, topics `angular`/`mock`, TypeScript language, null license and `fork: false`.
- `sqlite3 -readonly` query in databases `data/discovery/mfe-round-001/discovery.sqlite` and `data/discovery/mfe-round-002/discovery.sqlite`, joining `hits` and `queries` and filtering `repository_id=1199566448`: both rounds record `terminology-microfrontend-repositories`, exact query `microfrontend in:name,description,readme`, and `terminology-microfrontends-repositories`, exact query `microfrontends in:name,description,readme`. Strategy `terminology`, endpoint `repositories`, without file paths. SQLite identifiers are not code-line references.
- By elimination, name, description and topics lack the searched terms. Root README contains joined singular spelling `Microfrontend` in `README.md:37` and `microfrontend` in `README.md:49`; internal README repeats `Microfrontend` in `angular-csv-mocking/README.md:34`. This is compatible with README retrieval. There is no literal plural in these excerpts, and hits identify neither the exact excerpt nor normalization used for the plural hit. Name, mention and thematic retrieval do not confirm architecture.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | Complete inventory through `git ls-tree -r` of the SHA: 32 regular files, all mode 100644; zero symlinks and zero gitlinks. There are 30 files in `angular-csv-mocking/`, plus `.gitignore` and `README.md` at root. No `node_modules`, vendored platform tree, submodule or second frontend project. Counts refer to the Git tree, without artificial text lines. | context |
| Configuration / Build/deploy | `angular.json` declares a single project `angular-csv-mocking`, type application, with builder `@angular-devkit/build-angular:application`, entry `src/main.ts`, index and tsconfig (`angular-csv-mocking/angular.json:5–26`). Start/build scripts call Angular CLI (`angular-csv-mocking/package.json:4–9`), and `tsconfig.app.json` includes the same entry (`angular-csv-mocking/tsconfig.app.json:4–15`). Indicated paths exist. | contrary |
| Technology / Build/deploy | Angular and builder are declared (`angular-csv-mocking/package.json:13–29`). Lockfile pins builder 19.2.19 (`angular-csv-mocking/package-lock.json:79–89`), compiler-cli/core 19.2.15 (`angular-csv-mocking/package-lock.json:463–470`; `angular-csv-mocking/package-lock.json:536–544`) and TypeScript 5.6.3 (`angular-csv-mocking/package-lock.json:12510–12516`), compatible with builder/compiler-cli TypeScript peer range, `>=5.5 <5.9`. Basic static resolution checked, without running build. `build_tools: []`: bundler encapsulated by CLI, without explicit Webpack/Vite/Rspack configuration or hook in the tree. | context |
| Source code | `main.ts` imports local exports `appConfig` and `AppComponent` and calls `bootstrapApplication` (`angular-csv-mocking/src/main.ts:1–12`). `AppComponent` directly imports `UsersComponent` and registers it in the root component (`angular-csv-mocking/src/app/app.component.ts:1–10`); template contains only `<app-users>` (`angular-csv-mocking/src/app/app.component.html:1`). | contrary |
| Source code / Composition | Selector `app-users` and export `UsersComponent` match consumption (`angular-csv-mocking/src/app/components/users/users.component.ts:4–10`). There are no remote props/exports: the component injects `MockApiService`, calls `getResource('users')` and displays data (`angular-csv-mocking/src/app/components/users/users.component.ts:16–35`; `angular-csv-mocking/src/app/components/users/users.component.html:10–28`). This is conventional composition of application components, without own entry/build per component. | contrary |
| Configuration / Source code | `appConfig` registers local export `APP_ROUTES` and `MockInterceptor` (`angular-csv-mocking/src/app/app.config.ts:6–23`); the routes list is empty (`angular-csv-mocking/src/app/app.routes.ts:8–9`). No root config loads external or independent local applications. | contrary |
| Source code | The service forms `/api/...` URLs and calls `HttpClient.get` (`angular-csv-mocking/src/app/shared/mock-api.service.ts:10–38`). The DI-registered interceptor uses `HttpBackend` to obtain CSV without recursion, checks environment/localhost/dev mode and responds with data (`angular-csv-mocking/src/app/shared/mock.interceptor.ts:18–43`; `angular-csv-mocking/src/app/shared/mock.interceptor.ts:73–80`). This contract is HTTP/data; there is no mounting or loading of another UI. | contrary |
| Technology / Configuration / Composition | Text search at the SHA in all textual files except lockfile, for `ModuleFederation`, `remoteEntry`, `exposes`, `remotes`, `registerApplication`, `single-spa`, `qiankun`, `wujie`, `customElements`, `postMessage`, `iframe` and `loadRemote`: no results. Path inventory and inspection of the sole manifest/build found no federation config, import map, lifecycle for external host or remotes ↔ exposes ↔ consumption chain. | absent |
| Structure / Source code | Additional file `mock-api.service copy.ts` exports another HTTP service (`angular-csv-mocking/src/app/shared/mock-api.service copy.ts:1–16`); component imports the file without suffix `copy` (`angular-csv-mocking/src/app/components/users/users.component.ts:1–2`). A service copy, CSV and screen HTML templates are not units or generated projects. | context |
| Documentation | README presents the component → service → HttpClient → interceptor chain (`README.md:8–13`) and cites `Microfrontend isolation`/`microfrontend + contract testing` as uses of the technique (`README.md:34–49`). Internal README explains CSV → JSON → interceptor response (`angular-csv-mocking/README.md:96–114`). Inventory and reading of both READMEs: no ADR or additional architecture document, nor description of concrete host/remotes. | context |

## Authorship and history

Metadata at the SHA: five reachable commits, zero merges, one root commit `b7f7a69469dfd32c143d218313a580ecb794f7ad`, non-shallow clone. All record author `Piyali Das`; four have committer `GitHub` and one, `Piyali Das`. Dates run from 02/04/2026 to 04/04/2026. The only observed refs are `main`, `origin/main` and `origin/HEAD`, all at the evaluated SHA; no other-branch content was used.

`git log --no-renames --name-status` for `angular-csv-mocking/`, with `GIT_NO_LAZY_FETCH=1`, shows bulk addition of 30 files in commit `523713855e72e13af7496858837378d1ef9d9931` (“angular-csv-mocking”), followed by changes only to internal README in commits `c6f89e677deb97d59bad47142634f9aaa8cdb325` and `7fdcde15543b4ac9a64b09e1be2019ea566a4471`. Commit identity does not demonstrate original intellectual authorship of every file, and bulk addition alone does not prove third-party import. No separate vendored copy was indicated: the application constitutes the candidate’s own target. No object was missing in these queries, and historical blobs were unnecessary.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | A single frontend project, without a second local unit or external composition reference (`angular-csv-mocking/angular.json:5–26`). Educational mentions of microfrontends add no units (`README.md:37`; `README.md:49`). |
| Q2 | No | The sole project has its own entry/build, but there is no set of independent units. Users is directly imported as local App source, without separate entry/build (`angular-csv-mocking/src/app/app.component.ts:1–10`; `angular-csv-mocking/angular.json:17–26`). This does not satisfy the literal independence-between-units criterion. |
| Q3 | No | App renders its local screen; routes are empty (`angular-csv-mocking/src/app/app.component.html:1`; `angular-csv-mocking/src/app/app.routes.ts:8–9`). No host loads, mounts or routes distinct units. |
| Q4 | No | No mechanism is configured and used to connect frontend units. The interceptor connects HTTP request to CSV/response, not UI to UI (`angular-csv-mocking/src/app/shared/mock.interceptor.ts:28–43`; `angular-csv-mocking/src/app/shared/mock.interceptor.ts:73–80`). Mechanism search and configuration inspection found no federation chain. |
| Q5 | No | Conventional Angular application demonstrating API mocking and mentioning MFE as a possible use context, without implementing MFE architecture. |

## Rationale

- `Non-MFE`: Q1–Q5 No, without MFE-unit exception. `frontend_units: 1` follows from the complete tree and sole concrete target; it does not indicate limited observability. `repo_type: example` records the mocking demonstration with a users screen.
- Q2 requires own entries and builds and absence of direct imports between unit sources. One application with a local component and service does not provide this plurality; `.ts` files, CSV or API examples are not reinterpreted as units.
- Q4 requires configured composition connecting units. `provideRouter` with an empty array and an HTTP interceptor do not satisfy this criterion. There is no external-host preparation: Q2–Q4 remain No, without reason for Undetermined.
- As in final 023 and comparators 075/081/105, content about MFE, data or displayed/generated code does not establish a unit. Here a real UI exists, so the count is one, not zero. There is no frontend project generator.
- In contrast with 076/084/096/106 and final 007, there is no host/remotes chain; in contrast with 097/103/104, there is also no integration configuration to check as unconnectable. The code-sharing decision of 089/100 does not arise, since there is neither federation nor external consumer.
- This is not a platform plugin/distribution as discussed in 074/102, nor a separate framework-code copy as in 080. Intellectual provenance not fully demonstrated by metadata does not change the observable fact of a single target.
- No open decision concerns build-time composition, links, iframe or execution imperfection decisive for Q4. Dependencies, tests, build and application were not run; classification follows from inspected structure and code.

## Analysis notes

- **RQ1 (families):** searches for `piyalidas10`, `angular-csv`, `MockInterceptor`, `CSV-based` and `mock-api.service` in available annotations found no previously annotated sibling/template. Interception to facilitate unit development is not evidence of MFE composition in the project demonstrating it.
- **RQ3:** checked chain: bootstrap → App → Users → HTTP service → interceptor → CSV data/response. Exports, selector and local imports match; no remote stage is omitted from this observable chain.
- **Protocol:** both hits have joined spellings, singular and plural; README excerpts are singular. Elimination of name/description/topics supports thematic origin through README, without attributing an absent plural to the file or turning search into architectural evidence.
- **RQ1 (thematic signal):** micro-frontend is cited as a benefit of the mock technique ("Microfrontend isolation", `README.md:37`; "Great for microfrontend + contract testing", `README.md:49`), without implementation; internal README repeats the text (`angular-csv-mocking/README.md:34`).
