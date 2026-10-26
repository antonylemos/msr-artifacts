---
schema: 1
id: 876869948
full_name: sanketkedare/ReactForge
url: https://github.com/sanketkedare/ReactForge
commit: 358c47ae9860c83ff495405a0ebb0826bc92067c
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: production
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

# 098 — sanketkedare/ReactForge

## Context

Educational platform for React challenges, performance lab, code editor/runner and authentication/AI features. Module Federation appears as curriculum subject, not the platform’s implemented architecture (`README.md:190`, `src/data/learningProjects.ts:1856–1872`). Observed implementation is a Next.js application with local pages and components; user-code preview is not another own frontend unit under precedents 075/081.

`repo_type: production` describes orientation toward a published platform for students, with authentication and onboarding (`README.md:6–14`, `src/app/layout.tsx:158–185`), not verified operational readiness. Being a teaching platform does not make each exercise an independent application. The clone is `sanketkedare__ReactForge` and the SHA matches `data/samples/mfe-sample-001/clones.csv:99`.

Complete inventory through `git ls-tree -r 358c47ae9860c83ff495405a0ebb0826bc92067c`: **253 regular files** (mode `100644`), **zero symlinks** and **zero gitlinks**. There is no versioned `node_modules/` or submodules. There is one root `package.json`, one Next configuration and one `src/app/` tree, without a project prefix to remove. `frontend_units: 1` counts the own application; challenges, snippets, generated responses and preview HTML are not extra targets. SVGs `vite.svg` and `react.svg` do not demonstrate another application or bundler configuration.

## Sample provenance

- `data/samples/mfe-sample-001/sample.csv:99` records rank 98, id 876869948, `strategies: terminology;technology` and eligibility `pass`. The origin run is `data/discovery/mfe-round-002` (`data/samples/mfe-sample-001/manifest.json:2–5`).
- `data/discovery/mfe-round-001/candidates.csv:10455` and `data/discovery/mfe-round-002/candidates.csv:10461` record null description, empty topics, TypeScript language, null license, default branch `main`, creation on 2024-10-22 and last push on 2026-09-07; strategies match the sample. These are discovery metadata, not composition evidence.
- Both round databases, `data/discovery/mfe-round-001/discovery.sqlite` and `data/discovery/mfe-round-002/discovery.sqlite`, were queried with `sqlite3 -readonly`. Joining `hits JOIN queries` through `query_id`, filtering `hits.repository_id = 876869948`, returns the same three hits in each database: `technology-module-federation-repositories`, `terminology-micro-frontend-repositories` and `terminology-micro-frontends-repositories`. Endpoint `repositories`, empty `path`; queries respectively `"module federation"`, `"micro frontend"` and `"micro frontends"` in `name,description,readme`. These results contain no configuration-file hit.
- **Field elimination:** `ReactForge` lacks the searched expressions; description and topics are empty. The observed compatible field is the README, whose curriculum item 97 is “Micro-Frontend Module Federation” (`README.md:190`). This explains the local thematic signal without attributing a line or unidentified indexed version to the database. The name was not treated as architectural evidence.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure / Build/deploy | One manifest defines `next dev`, `next build` and `next start` (`package.json:6–11`). Root layout applies authentication/theme providers to pages (`src/app/layout.tsx:158–185`). No builds, entries or exposures of other frontend units are observed. | contrary |
| Configuration (static resolution) | Configuration imports the `next` type (`next.config.ts:1–3`), package declared in `package.json:27` and recorded in `package-lock.json:7324–7326`. React/ReactDOM are declared (`package.json:30–31`) and locked (`package-lock.json:8040–8042`, `:8049–8051`). There is no composition plugin to resolve: manifest and lock package keys contain no federation/single-spa/qiankun/wujie. Static correspondence does not assert successful installation or build. | context |
| Configuration (bundler and tests) | `next.config.ts:4–52` configures console removal, images and HTTP headers, without bundler/composition hook, remotes or rewrites. `vitest.config.ts:1–14` defines testing environment and source alias; `vitest/config` corresponds to declared and locked Vitest (`package.json:49`, `package-lock.json:9611–9613`). It is not unit Vite build configuration. Application bundler remains encapsulated by Next, therefore `build_tools: []`. | context |
| Source code (implemented challenge) | The calculator route imports local Calculator and DynamicTaskClient (`src/app/(projects)/calculator/page.tsx:1–3`) and renders the component as a workbench child (`:22–28`). Alias `@/*` points to `./src/*` (`tsconfig.json:25–28`). This is a page in the same project, not a remote. | contrary |
| Source code (catalog and dynamic route) | The catch-all reads registry `LEARNING_PROJECTS` (`src/app/(projects)/[slug]/page.tsx:1–13`, `:86–100`) and delivers the descriptor to DynamicTaskClient (`:165–170`). The module-federation challenge record is learning-objective text (`src/data/learningProjects.ts:1856–1872`), without unit URLs, containers, builds or loaders. There is no own route implementing a federated host. | contrary |
| Source code (workbench) | DynamicTaskClient imports the starter-code generator and LiveCodeRunner (`src/components/studio/DynamicTaskClient.tsx:40–44`); it maintains the solution in `userCode` state (`:109–115`) and supplies it to preview (`:927–941`). The generator returns component text (`src/lib/taskStarterCode.ts:1–25`), not an independent project/build. | contrary |
| Source code (same-document runner) | LiveCodeRunner loads Babel standalone through external script (`src/components/studio/LiveCodeRunner.tsx:49–68`), transforms supplied code (`:84–98`), executes it through `new Function` (`:110–149`) and renders the resulting component (`:151–159`, `:182–197`). Babel is a compilation tool for edited content, not a remote frontend unit. This path does not use iframe, despite general sandbox descriptions in documents. | contrary |
| Source code (iframe and message contract) | The playground maintains `code` in its own state (`src/app/(studio)/playground/page.tsx:72–78`), builds HTML with this content and CDN React/Babel libraries, and assigns the result to `iframe.srcdoc` (`:80–112`). It emits LOG/ERROR (`:103–105`), receives them to update the panel (`:125–139`) and renders the iframe (`:238–244`). The contract is explicit, but serves user-code preview, not integration of relatively independent own applications. 075/081 applies, without inferring a second unit from CDN scripts. | context |
| Source code (cross-tab synchronization) | ThreadedComments opens `BroadcastChannel("studio_threaded_comments")` (`src/components/studio/ThreadedComments/ThreadedComments.tsx:161–169`) and publishes comment/vote mutations (`:217–238`). This is synchronization between instances of the same functionality, not composition of independent frontends. | context |
| Architecture documentation / ADRs | ADR-001 explicitly adopts Next App Router, Server/Client Components and centralized challenge rendering (`docs/architecture/ADR-001-nextjs-app-router.md:9–13`). ADR-002 organizes local, URL, server and global state (`docs/architecture/ADR-002-state-management-discipline.md:9–18`); “Anti-Monolith” in the title refers to a global store, not MFE decomposition. ADR-003 concerns cancellation/cache (`docs/architecture/ADR-003-data-fetching-and-caching.md:9–12`). Others document design system (`docs/architecture/ADR-004-design-system-and-tokens.md:9–12`), testing (`docs/architecture/ADR-005-testing-strategy.md:9–14`) and performance (`docs/architecture/ADR-006-performance-budget-and-virtualization.md:9–12`), not federation. | contrary |
| Documentation (sandbox) | `ARCHITECTURE.md:32–41` describes platform router and state; `:50–52` describes iframe and message isolation. Code was used to distinguish the srcdoc playground from same-document LiveCodeRunner, without transferring every documentary claim to all paths. | context |
| Structure / Configuration / Source code (negative search) | The inventory was searched for other application manifests, gitlinks and Webpack/federation/import-map configurations: absent. All snapshot texts, excluding `package-lock.json`, were searched for `ModuleFederationPlugin`, `withModuleFederation`, `loadRemoteModule`, `loadRemoteEntry`, `remoteEntry`, `registerApplication`, `single-spa`, `qiankun`, `wujie`, `customElements.define`, `initFederation`, `importmap`, hooks `webpack` and `rewrites`. No mechanism was found; the only expanded-expression result is “Avoid unnecessary rewrites” in a textual plan (`ReactForge_10Y_Experienced_Developer_Transformation_Plan.md:1625`), not configuration. Module-federation mentions locate curriculum content, not imports or producers. | absent |

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | One Next target with local pages/components (`src/app/(projects)/calculator/page.tsx:1–3`, `:22–28`). The federated item is curriculum (`src/data/learningProjects.ts:1856–1872`); edited-code preview/srcdoc does not count as an own unit (`src/app/(studio)/playground/page.tsx:80–112`). |
| Q2 | No | One Next build (`package.json:6–9`), without a set of units or application prepared for an external host. The runner receives code in local state (`src/components/studio/DynamicTaskClient.tsx:109–115`, `:927–941`), not a frontend artifact with its own build/deployment. |
| Q3 | No | Layout/providers and challenges belong to the same application (`src/app/layout.tsx:158–185`, `src/app/(projects)/[slug]/page.tsx:165–170`). The iframe is editor preview, not an own-unit host. |
| Q4 | No | There is no inter-unit composition configuration/consumption; `next.config.ts:3–52` configures a conventional application. Preview LOG/ERROR (`src/app/(studio)/playground/page.tsx:103–105`, `:128–137`) and comments BroadcastChannel do not establish MFE integration. |
| Q5 | No | Single platform with MFE as curriculum topic, code generation/execution and local pages, under ADR-001 (`docs/architecture/ADR-001-nextjs-app-router.md:9–13`). Q5 follows Q1–Q4, without override. |

## Rationale

- Proposed `Non-MFE`: conventional application teaching MFE without implementing observable MFE architecture. Precedents 023/028 exclude teaching content as unit proof, and 075/081 exclude generated/displayed code and its preview from counting.
- The iframe message contract was checked, but its existence does not turn edited content into an own frontend application. There is no open independent-unit iframe decision to resolve here. There is no link or build-time-only composition either.
- MFE-unit does not apply: no exposure, lifecycle or build prepares an application for an external host. With Q1 No, Q2–Q4 remain No. `frontend_units: 1`, `ui_technologies: [react, next]`, `build_tools: []` and `approaches: []` describe implementation, without promoting runner Babel or the Vite SVG to unit bundlers.

## Analysis notes

- **RQ1:** both rounds record the same repository hits, compatible with the README curriculum line. The challenge name “Simulator”, “host/remote” terms and learning objectives do not replace composition code.
- **RQ3:** the actual chain is curriculum registry → dynamic route → workbench → code in state → runner/preview. Babel/CDN script and messages belong to this content chain. The other path uses pages with statically imported components. Both remain in the same own target.
- **Protocol (families/templates):** searches for `sanketkedare`, `ReactForge`, `React-Tasks` and `100 Hands-On React` in existing annotations found no sibling. Legacy Vite asset names and challenge directories demonstrate neither another unit nor affiliation. 081 is a close precedent for Next generator/playground and content iframe; 075/023/028 also apply as criteria, without asserting common code.
- **History:** non-shallow clone; **49 reachable commits**, **0 merges** and **1 root commit**, `fc29f76796e179079200b37a00a3215a644a7328` (2024-10-15, “first commit”), counted through `git rev-list --count`, `--count --merges` and `--max-parents=0`. History records curriculum/AI in `4607746` (2026-08-26), architectural transformation in `9d953ac` (2026-09-06), testing configuration in `bdf798a` (2026-09-06) and runner/IDE at the evaluated SHA (2026-09-07). These are commit subjects, without using old snapshots to complete current implementation; root-commit date differs from metadata repository creation.
- **Protocol (branches and limitations):** only `main`, `origin/main` and `origin/HEAD`, all at the pinned SHA. No network, submodule, installation, build, test, runner or application executed. Packages/configurations were checked statically in manifest/lock, without checking current registry availability. No open decision identified.
- **Curriculum mentions (supplement):** besides `README.md:190` and `src/data/learningProjects.ts:1856–1864`, the task list appears in `AGENTS.md:20`, the same content type. Task `module-federation` has no specific page or starter: no inventory path contains `federation`, `remote` or `micro`, and the route is handled by generic catch-all `[slug]` (`src/app/(projects)/[slug]/page.tsx:10–13`, `:86–100`). This closes the implemented-simulator hypothesis.
- **Playground preview:** `srcdoc` loads React 18 through CDN (`src/app/(studio)/playground/page.tsx:89–90`), while the application uses React 19 (`package.json:30`); this confirms that preview is a separate content runtime, not an application unit.
