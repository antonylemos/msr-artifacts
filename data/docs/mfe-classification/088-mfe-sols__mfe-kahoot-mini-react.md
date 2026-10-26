---
schema: 1
id: 1190253449
full_name: mfe-sols/mfe-kahoot-mini-react
url: https://github.com/mfe-sols/mfe-kahoot-mini-react
commit: 69cd5f059720c4649ffbfe3374ef809074de5c46
classification: MFE-unit
checklist: { q1: no, q2: yes, q3: undetermined, q4: undetermined, q5: no }
repo_type: example
approaches: [single-spa]
ui_technologies: [react]
build_tools: [webpack]
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-22
---

# 088 — mfe-sols/mfe-kahoot-mini-react

## Context

A React quiz application, prepared to be mounted by single-spa and also executable through standalone HTML loading the same unit. The README explicitly presents the intention to integrate the module into a shell/root-config (`README.md:3–15`); concrete preparation is in the exported lifecycles and SystemJS build, not the repository name.

Commit checked against `data/samples/mfe-sample-001/clones.csv:89`. Complete inventory through `git ls-tree -r --name-only 69cd5f059720c4649ffbfe3374ef809074de5c46`: 35 files, none under `node_modules/`, a single `package.json`, one application entry and one application build. Files are at the clone root, not under `apps/mfe-kahoot-mini-react/`: this prefix appears as monorepo context in `project.json:4–19`, but does not exist in the evaluated tree. `apps/root-config/`, `libs/` sources and another frontend target are absent. The standalone HTML and its auxiliary panel have no builds of their own and do not constitute a second unit.

The local references `main`, `origin/main` and `origin/HEAD` point to the evaluated commit; recorded only as context. No other branches were used and the published host was not accessed.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Technology | `package.json:16–25` declares React, single-spa-react, single-spa and shared libraries `@mfe-sols/ui-kit`/`@mfe-sols/i18n`. These are isolated signals until checked against the entry and configuration below. | weak |
| Source code (lifecycles) | `src/org-mfe-kahoot-mini-react.tsx:43–56` calls `singleSpaReact` with React, ReactDOMClient and `Root`, and exports `bootstrap`, `mount`, `unmount`. `src/root.component.tsx:148–159` constructs the model/presenter and renders the application’s own `AppView`. This demonstrates a frontend unit prepared for composition, not merely a library or dependency declaration. | strong |
| Configuration / Build/deploy | `webpack.config.js:38–45` configures `webpack-config-single-spa-react-ts` with organization `org`, project `mfe-kahoot-mini-react`, `outputSystemJS: true` and automatic HTML disabled. `package.json:10–13` contains build and types commands; `vercel.json:2–3` defines its own build and output. `vercel.json:14–17` treats bundle `/org-mfe-kahoot-mini-react.js` as JavaScript. | strong |
| Configuration (standalone) | The import map in `public/index.html:97–104` contains only `@org/mfe-kahoot-mini-react` pointing to the local bundle. `public/index.html:107–135` imports this same module and calls its lifecycles with node `standalone-root`. This harness confirms the exports’ consumer contract, but neither registers nor composes a second application. | moderate |
| Source code (shell reference) | `public/index.html:24–30` accepts origin `mfe-root-config.vercel.app`; `public/index.html:44–53` uses this origin or localhost:9000 to obtain shared styles. `public/index.html:70–90` injects CSS, not host JavaScript. The root-config reference contextualizes an external shell, without bringing its implementation into the snapshot or adding it as a unit composed by the candidate. | context |
| Source code (auxiliary contracts) | `src/org-mfe-kahoot-mini-react.tsx:14–36` receives `mfe-toggle` messages, validates origin and stores the disabled module list. `src/mfe-error-reporter.ts:66–96` sends typed `mfe-error` messages to parent in `mfe-bridge=1` mode. These are explicit unit-side contracts; the receiver/host is not in the snapshot and no iframe is created here. | moderate |
| Source code (visual integration) | `src/root.component.tsx:27–50` synchronizes language through event/storage, and `src/root.component.tsx:82–114` observes theme in the shared document. These mechanisms reinforce preparation to coexist with a shell, without proving its external composition. | moderate |
| Configuration (libraries) | `webpack.config.js:54–63` looks for `@mfe-sols/*` packages or optional sources in `../../libs/`; `webpack.config.js:93–106` configures conditional aliases and allows bundling UI kit, i18n and React. These libraries are not additional applications. The fallback paths do not exist in this clone’s inventory, and do not constitute an observable source import from another frontend. | context |
| Documentation | `README.md:7–15` distinguishes running standalone from running with root-config, and describes the module as a demonstration inside the shell. `src/mvp/README.md:3–8` documents model, presenter, usecase, service and view layers. No ADRs or additional architecture documentation directories were found in the inventory. | context |
| Architecture documentation (presentation) | The versioned presentation describes a shell with routing/import map/lifecycles in `data/MFE-Orchestra-Seminar-New.pptx!ppt/slides/slide7.xml:2`; separation of modules in independent repositories in `data/MFE-Orchestra-Seminar-New.pptx!ppt/slides/slide16.xml:2`; shared libraries in `data/MFE-Orchestra-Seminar-New.pptx!ppt/slides/slide18.xml:2`. The `!` notation identifies the XML member inside the PPTX; numbers are the original lines of that XML. Textual content of the pinned file was consulted, without treating applications and import maps shown in slides as implementation present in the clone. | context |
| Documentation / Source code (teaching content) | `data/question-sets.seed.json:335–343` contains a question whose answer is `mountRootParcel`. Searching this term finds quiz content, not an executable call composing a Vue parcel. The game and its lifecycles are own implementation; applications discussed by the quiz and slides do not increase Q1. | context |
| History | History has 17 commits, all from 2026-03-24, starting with the first, `2883ae8ec09a34a73879c65499ffc9b5ecfb6a6d` (Update files); among them `a3a64a49e25a604ad4906f8d0545384096a295d8` (Update webpack.config.js) and the evaluated commit (Change files). Comparison through `git ls-tree` confirms that the entry and standalone HTML have the same blobs in 2883ae8, a3a64a4 and the snapshot: `82f83153560a36b14e2c2eb61866128b8d737b9c` and `a6bb565f010fd64a51b97d41e8fc6658c25c982d`, respectively. Thus preparation was already present in that earlier revision (`src/org-mfe-kahoot-mini-react.tsx:43–56`, `public/index.html:97–135`, contents identical to the snapshot). The earlier Webpack blob is not available locally; its diff was not inferred and absent historical content was not used. | context |
| Structure / Composition (negative host search) | `src/`, `public/`, `webpack.config.js`, `project.json` and `package.json` were searched for `registerApplication`, `constructApplications`, `constructRoutes`, `mountRootParcel`, `ModuleFederation`, `remoteEntry`, `exposes:` and `remotes:`: no results. There is an import map, but it loads only the unit itself (`public/index.html:98–103`). The root-config registering multiple applications, its layout or production import map were not found. | absent |

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | A single own application with lifecycles (`src/org-mfe-kahoot-mini-react.tsx:43–56`). The only executable import map loads this same unit (`public/index.html:98–103`). Shell references for CSS, libraries and slide/quiz examples are not another unit referenced by composition configuration. |
| Q2 | Yes | For the unit: its own entry and lifecycles, SystemJS build (`src/org-mfe-kahoot-mini-react.tsx:43–56`, `webpack.config.js:38–45`) and its own build/deployment configuration (`package.json:10–13`, `vercel.json:2–3`). The unit can be delivered as a bundle to the external consumer. |
| Q3 | Undetermined | The README identifies an external shell/root-config (`README.md:9–14`), but its registration/layout is not in the snapshot. Local HTML only mounts the unit itself (`public/index.html:109–135`); it does not allow verification of multiple-unit participation in the external application. |
| Q4 | Undetermined | The unit side is explicitly implemented through exports and a SystemJS bundle (`src/org-mfe-kahoot-mini-react.tsx:43–56`, `webpack.config.js:38–45`). Observation of the host registering and connecting it to other units is missing; the standalone consumer in `public/index.html:121–133` tests only its own mounting contract. |
| Q5 | No | The evidence demonstrates a unit prepared for external composition, not an instance composed of at least two frontends in the candidate. Q1 is No and the MFE-unit exception applies, based on exported lifecycles (`src/org-mfe-kahoot-mini-react.tsx:56`) and absent shell context (`README.md:9–14`). |

## Rationale

- Proposed `MFE-unit`: frontend unit with its own exported single-spa lifecycles and SystemJS build, whose composition host is not observable. This corresponds directly to the checklist exception, as in final precedent 058.
- Standalone does not make the candidate MFE-implemented: it imports and mounts only the same module, without a second application. Q2 records unit independence; Q3–Q4 remain Undetermined because of explicit preparation for an external host, and Q5 is No for the complete architectural instance.
- This is not purely teaching content: there is an executable application with view and lifecycles. However, frontends described in the presentation and questions are content and do not count in Q1, under 023/028.
- The intended shell belongs to the ecosystem described by the project itself, with application root-config and `@mfe-sols/*` libraries; it is not a third-party platform whose extension mechanism is the only host. The platform plugin rule from 037 does not rule out this case’s MFE-unit preparation.
- The classification rests on single-spa, without depending on accepting iframe/link. Bridge-mode messages have an explicit contract, but do not prove an implemented host or another composition approach in the snapshot. Shared libraries do not support build-time composition between frontend units either.

## Analysis notes

- **RQ1:** `project.json` and the `start` command retain monorepo paths (`project.json:4–19`, `package.json:8`), although the tree is extracted at the root and does not contain `../../scripts/require-port.js`. This environment dependency does not erase the module exports or build; no build or startup command was run.
- **RQ3:** the standalone harness establishes a consumer of one unit’s lifecycles, without functioning as a host for multiple targets. The auxiliary panel publishes simulated authentication through BroadcastChannel (`public/dev-auth-panel.js:80–96`); it is neither an independent application nor evidence of an additional shell.
- **Protocol (family):** searches in existing annotations for `mfe-sols`, `mfe-kahoot`, `mfe-root-config`, `MFE Orchestra` and `org/mfe-` found no previously annotated siblings. The intended family/ecosystem is indicated by the README, `@mfe-sols/*` packages and presentation, without attributing other specific uninspected repositories. Precedent `docs/mfe-classification/058-ducknem2086__vue-lifecycle-demo.md` is comparable by lifecycles and absent host, not evidence of ancestry or shared template.
- **Protocol (monorepo extraction):** several signals indicate that the repository is a unit extracted from an Nx monorepo by the same author: `project.json:4–19` (root `apps/mfe-kahoot-mini-react`), `package.json:8` (`../../scripts/require-port.js`, nonexistent), `webpack.config.js:54–55` (`../../libs/…`), `README.md:7` (`pnpm -C apps/…`) and the 17 commits in one day. This is a hypothesis explaining why the host is not in the snapshot, the `MFE-unit` exception scenario; it does not change the class.
- **Protocol (history):** history inspection was limited to metadata and trees available locally. The conclusion uses files at the pinned commit; presentation references to a monorepo or other modules do not authorize transferring the complete architecture to this extracted unit.
