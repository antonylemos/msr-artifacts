---
schema: 1
id: 956294016
full_name: harshan89/home24
url: https://github.com/harshan89/home24
commit: 2cb36e849853c272820549ab6de61699f074b12d
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: example
approaches: []
ui_technologies: [react, next]
build_tools: []
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 094 — harshan89/home24

## Context

Interview exercise for a product back office, with login, categories, listing, editing and deletion. Its exercise nature is explicit in `README.md:89–91`. The snapshot implements a Next.js/React application with pages, components, Redux/Saga and API endpoints in the same project. Documentation states that it does not use micro frontend architecture (`README.md:12–14`); this statement was checked against entries, imports and configuration, not used alone.

The exact clone name is `harshan89__home24`. The commit matches `data/samples/mfe-sample-001/clones.csv:95`. The complete inventory through `git ls-tree -r 2cb36e849853c272820549ab6de61699f074b12d` contains **91 regular files** (mode `100644`), **zero symlinks** (`120000`) and **zero gitlinks** (`160000`). There is no versioned `node_modules/`, submodules, other application manifests or subfolder prefix to remove: `package.json`, `next.config.ts` and `src/` are at the root. There is one own frontend target; pages, components, endpoints and tests are not additional units.

## Sample provenance

- `data/samples/mfe-sample-001/sample.csv:95` records rank 94, id 956294016, `strategies: terminology` and eligibility `pass`.
- `data/samples/mfe-sample-001/manifest.json:2–5` identifies origin round `data/discovery/mfe-round-002`. In `data/discovery/mfe-round-002/candidates.csv:12408`, strategy is also `terminology`; metadata records TypeScript, null description, empty topics, default branch `master`, creation on 2025-03-28 and last push on 2025-04-02. Discovery and eligibility do not confirm architecture.
- Read-only query against `data/discovery/mfe-round-002/discovery.sqlite`, tables `hits` and `queries`, filtering `hits.repository_id = 956294016`: there are hits for queries `terminology-micro-frontend-repositories` and `terminology-micro-frontends-repositories`, strategy `terminology`, endpoint `repositories`, respectively `"micro frontend" in:name,description,readme` and `"micro frontends" in:name,description,readme`. Both records have empty `path`: repository search results without a code location. The negative mention in `README.md:14` is an observed terminology signal, compatible with the query topic; the database does not attribute the hit to this line. The repository name was not treated as architecture evidence.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure / Build/deploy | One manifest defines `next dev --turbopack`, `next build` and `next start` (`package.json:5–11`). One Dockerfile installs, compiles and starts this same project (`Dockerfile:3–13`). No separate frontend-unit builds are observed. | contrary |
| Technology / Configuration | React, ReactDOM and Next are declared in `package.json:17–19` and used in sources (`src/app/layout.tsx:3–7`, `src/app/product/page.tsx:3–5`, `:24`). `next.config.ts:1–7` contains only the empty configuration object. There is no explicit bundler or federation configuration; the bundler remains encapsulated by Next, even with the `--turbopack` development option. | context |
| Source code (entry and state) | Root layout directly imports the local store and wraps children with Redux Provider (`src/app/layout.tsx:6–7`, `:19–33`). The store imports local reducer and saga and executes the saga (`src/state/store.ts:1–14`). This is state shared internally by one application. | contrary |
| Source code (pages and components) | The home page imports and renders local `LoginComponent` (`src/app/page.tsx:3–6`). The product page directly imports services, selectors, menu, table, detail and header (`src/app/product/page.tsx:6–25`), rendering them in the same tree (`:124–170`). Alias `@/*` points to `./src/*` (`tsconfig.json:21–23`), not remotes. | contrary |
| Composition (internal navigation) | After login, the saga navigates to `product` (`src/state/user/userSaga.ts:15–23`); the product page uses the Next router and returns to the root without a token (`src/app/product/page.tsx:24`, `:53–64`). These are routes of the same application, without zones or units with independent delivery. | contrary |
| Source code (API) | The Axios client uses `NEXT_PUBLIC_API_URL` or `http://localhost:3000/api/` (`src/api/clients/adminApiClient.ts:1–8`). This configuration selects a data API; it neither imports nor mounts another frontend. | context |
| Architecture documentation | `README.md:12–16` describes separation among business models, API/DTO, services and Redux/Saga and denies micro frontend use. `README.md:18–22` explains the class model. Diagrams are remote images referenced in Markdown, not inspected local files; their content is not inferred. There is no ADR or other architecture document in the inventory. | contrary |
| Structure (negative unit search) | The complete inventory was searched for other `package.json`, build/composition configurations, applications in subfolders and gitlinks. Only the root project was found. `public/` contains images/icons, `cypress/` and `src/tests/` contain tests; these directories have no vendored frontend units or independent targets. | absent |
| Configuration / Source code (negative composition search) | `git grep -n -I -i -E` was run at the commit across all textual files, excluding only `package-lock.json`, searching `ModuleFederation`, `module.federation`, `remoteEntry`, `single-spa`, `registerApplication`, `registerMicroApps`, import maps, `postMessage`, `<iframe`, `srcDoc`, `exposes`, `remotes`, `qiankun`, `wujie`, `customElements`, `bootstrap`, `unmount` and `rewrites`: no results. Expanded search for `micro.?front` and `federat` finds only the negative statement in `README.md:14`. No contract preparing the application for an external host was found. | absent |

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | One own Next.js unit: shared layout (`src/app/layout.tsx:19–33`), home page (`src/app/page.tsx:3–6`) and product page importing local components (`src/app/product/page.tsx:6–25`). There is neither a second own unit nor a configured remote. |
| Q2 | No | A single build (`package.json:5–8`, `Dockerfile:5–13`) and direct component/service imports from the same project (`src/app/product/page.tsx:6–25`, `tsconfig.json:21–23`). There is neither a set of independent units nor a unit prepared for an absent external host. |
| Q3 | No | The layout wraps internal pages (`src/app/layout.tsx:19–33`); the product page renders locally imported components (`src/app/product/page.tsx:124–170`). There is no host/root composing independent frontend units. |
| Q4 | No | Next configuration is empty (`next.config.ts:3–7`), and composition searches found no configured or consumed mechanism. Observed flows use local imports and Next navigation (`src/app/product/page.tsx:6–25`, `:53–64`). |
| Q5 | No | Single conventional application, according to local composition code (`src/app/product/page.tsx:124–170`) and architecture description (`README.md:12–14`). Q5 follows Q1–Q4. |

## Rationale

- Proposed `Non-MFE`: conventional monolithic frontend, with Q1–Q5 No. Modularization of classes, services, components and state does not demonstrate decomposition into independent frontend units.
- `frontend_units: 1` counts the observed own target, without counting endpoints, tests or components as units. The MFE-unit exception does not apply: there is no explicit preparation for integration into an external host. Therefore Q2–Q4 are No, not Undetermined.
- `repo_type: example` records the interview exercise (`README.md:91`). `ui_technologies: [react, next]` corresponds to technologies used in sources; `build_tools: []` follows the convention of Next encapsulating the bundler, without explicit configuration of it. `approaches: []` follows Non-MFE.

## Analysis notes

- **RQ1:** the presence of the expression micro frontend in a negation (`README.md:14`) illustrates a terminology false positive. Discovery metadata lacks the term (empty description, empty topics, name "home24"), so, by elimination, the hit is compatible only with `README.md:14`, a negation (discovery-time metadata, read in read-only mode; round 001 records the same hits). The discovery query and dependencies do not replace checking relationships between sources, configuration and build.
- **RQ3:** layout, store and components converge in the same project; the Axios layer provides data, not interface composition (`src/app/layout.tsx:6–7`, `:32`, `src/api/clients/adminApiClient.ts:3–8`).
- **Protocol (families/templates):** `harshan89` and `home24` were searched in existing annotations, without an annotated sibling. Local history identifies Create Next App scaffold in initial commit `594551d`; affiliation with another candidate was not demonstrated. As an analytical parallel, 081 also contains a Next frontend with local components, but no shared family is asserted. Unlike Multi-Zones case 013, here there are no rewrites or applications per zone (`next.config.ts:3–7`). Precedents 023/028 guide against converting documentary mentions into units.
- **History:** `git rev-list --count 2cb36e849853c272820549ab6de61699f074b12d` returns **44 commits**, including merges; `git rev-parse --is-shallow-repository` returns false. The reachable log runs from `594551d` (2025-03-28, Initial commit from Create Next App) to the pinned merge (2025-04-02). Observed subjects include product structure, Redux/Saga, login, Docker, tests and documentation; this contextualizes the exercise, without replacing snapshot evidence. The count was inferred neither from entries on a page nor from the README.
- **Branches:** `master`, `origin/master` and `origin/HEAD` point to the pinned commit; `origin/users/harshan` points to `19bbb2575f1e995eaf6a96c5cfdd1c66ba2654d9`. References were recorded without using another branch to complete the evaluated implementation.
- **Checklist:** there is no open decision depending on link composition, iframes, federated code sharing or execution failures. Inspection was static and local; external links, diagram images, video and Vercel deployment were not accessed. Installation, build, tests or application were not run.
