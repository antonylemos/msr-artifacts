---
schema: 1
id: 963538342
full_name: yayaflc/microfrontends
url: https://github.com/yayaflc/microfrontends
commit: 704f80e756946ae04fa8fa071b5058fc9b07cfde
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: example
approaches: []
ui_technologies: [react]
build_tools: [webpack]
frontend_units: 2
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 089 — yayaflc/microfrontends

## Context

React example with two own targets, `app1/` and `app2/`, each with separate entry, build and Webpack configuration. Federated consumption is bidirectional: app2 renders two buttons exposed by app1; app1 uses a hook exposed by app2. Federation is configured and consumed in code. An interpretive decision remains: do these elements compose frontend units or constitute only component and logic sharing, a case explicitly excluded by the checklist?

Commit checked against `data/samples/mfe-sample-001/clones.csv:90`. The complete inventory through `git ls-tree -r --name-only 704f80e756946ae04fa8fa071b5058fc9b07cfde` contains 85 files, none under `node_modules/`, and two project manifests: `app1/package.json` and `app2/package.json`. The root `index.tsx` is empty, not a third target. `frontend_units: 2` counts the two own targets, without duplicating buttons, hook, libraries or configuration files inherited from CRA.

The local references `main`, `origin/main` and `origin/HEAD` point to the same pinned commit. The clone is not shallow (`git rev-parse --is-shallow-repository`: false), and `git rev-list --count 704f80e756946ae04fa8fa071b5058fc9b07cfde` returns **11 commits** reachable. Display of the last ten commits was not confused with the total count. References were recorded without using other branches in the classification.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure / Build/deploy | `app1/package.json:64–67` and `app2/package.json:64–67` define their own start and build with explicit Webpack configuration. `app1/webpack.config.js:5–10` defines entry and port 3001; `app2/webpack.config.js:5–10` defines entry and port 3002. These are two own targets, not vendored packages. | moderate |
| Source code (entries) | `app1/src/index.tsx:1–3` and `app2/src/index.tsx:1–3` import their own asynchronous bootstrap. `app1/src/bootstrap.tsx:1–11` and `app2/src/bootstrap.tsx:1–11` mount their Apps with ReactDOM. | moderate |
| Configuration (app1) | `app1/webpack.config.js:26–39` instantiates `ModuleFederationPlugin`, defines remote app2 at `localhost:3002/remoteEntry.js`, exposes `HelloButton` and `GoodbyeButton` and shares React/ReactDOM as singletons. | strong |
| Configuration (app2) | `app2/webpack.config.js:26–38` instantiates the same plugin, defines remote app1 at `localhost:3001/remoteEntry.js`, exposes `useTextData` and shares React/ReactDOM. | strong |
| Source code (consumed remote UI) | `app2/src/App.tsx:3–4` imports the two app1 buttons through `React.lazy`; `app2/src/App.tsx:12–15` renders them in its own interface, passing local callbacks. The exposed modules implement visual controls in `app1/src/components/HelloButton.tsx:7–18` and `app1/src/components/GoodbyeButton.tsx:7–18`. There is concrete federation use, but granularity is that of two reusable controls. | ambiguous |
| Source code (consumed remote logic) | `app1/src/components/TextData.tsx:3–15` imports `app2/useTextData`, calls the hook and shows text in a local textarea. `app1/src/App.tsx:2–8` incorporates this component. `app2/src/hooks/useTextData.ts:3–11` only maintains and returns a demonstration string. This integration direction shares logic without mounting a remote interface. | ambiguous |
| Source code (module contracts) | `app1/src/declarations.d.ts:1–3` declares the federated hook; `app2/src/declarations.d.ts:1–10` declares the two federated components and prop `onClick`. The declarations correspond to observed exposures and imports, but do not themselves define the architectural boundary between application and library. | moderate |
| Source code (application scope) | `app1/src/App.tsx:4–13` contains a title and textarea; `app2/src/App.tsx:6–20` contains a title and the two remote buttons. No complete App or route module is exposed in configuration: exposures are the controls and hook already cited (`app1/webpack.config.js:32–35`, `app2/webpack.config.js:32–34`). This supports the doubt about the code-sharing exclusion, without creating a full-screen requirement. | ambiguous |
| Documentation | `README.md:3` describes a microfrontends study with React and Module Federation; `README.md:5` references demonstration image `demo.png`. `app1/README.md:1–3` and `app2/README.md:1–3` retain Create React App text. The inventory was searched for ADRs, `docs/` directories, architecture documents and diagrams, without specific artifacts beyond READMEs and the demonstration image. Self-description does not resolve architectural interpretation. | context |
| History | The complete sequence of 11 commits starts at `e25161d5507216c66037f97d4143626501822984` (2025-04-09, create projects base). `94007b3eaef3879d56a79af557f78c1a922d449b` (2025-04-09) has message feat: integration module federation; historical blobs at this point were unavailable locally, so their contents were not inferred from the title. In `fd7c22447decac3ff830f27a8aa11ccc345c4f4e` (2025-04-12, feat: export hook from app2 to app1), historical files were read: `app1/src/components/TextData.tsx:4–7` already imports/calls the hook, and `app2/src/hooks/useTextData.ts:3–11` implements it, as in the current snapshot. The next four commits concern README/image; the conclusion uses pinned code. | context |
| Source code (negative direct coupling search) | Audit of static/dynamic imports in `.ts`/`.tsx` files in `app1/src/` and `app2/src/`: no relative import crosses into the other application’s sources. The three integration specifiers are `app1/HelloButton`, `app1/GoodbyeButton` and `app2/useTextData`, consumed through the federation mechanism; the other named imports are npm dependencies. | absent |
| Configuration / Source code (negative search for other mechanisms) | All own `.ts`, `.tsx`, `.js`, `.html`, `.json` and `.md` files in the snapshot, excluding `package-lock.json` and `yarn.lock`, were searched for `single-spa`, `registerApplication`, `registerMicroApps`, `qiankun`, `wujie`, `customElements.define`, `importmap`, `import-map`, `postMessage`, `<iframe` and `srcDoc`, without results. The doubt does not depend on link/iframe or build-time composition. | absent |

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | Both projects physically exist, but the only federated artifacts are two generic buttons and one hook; they do not form composed frontend units. |
| Q2 | No | Separate builds and ports do not characterize MFE unit independence when the accepted relationship between projects is only code sharing. |
| Q3 | No | App2 renders reusable controls and app1 consumes a hook; there is no remote functional region, page or interface flow. |
| Q4 | No | Module Federation is implemented, but the mechanism is used exclusively for sharing components and logic, a case excluded by the checklist. |
| Q5 | No | The observed architecture is code sharing between demonstration projects, not micro-frontend composition. |

## Rationale

- The exclusion of Module Federation used only for code sharing applies: the only remote modules are two generic controls and a hook returning text.
- Both projects have their own builds and executable federated imports, but there is no composition of a functional region, page or interface flow from one unit into the other.
- `approaches: []` records that no MFE approach was confirmed for this classification; Module Federation is evidence of the sharing mechanism, not an MFE instance.
- `build_tools: [webpack]` rests on explicit configurations and actual commands; CRA READMEs do not mean an encapsulated bundler. The ejected scripts (`app*/scripts/start.js`, `build.js`, `test.js`) are remnants of `yarn eject` commits (92425c5, eecd80c, 1b5da1c) and are not used: actual commands (`package.json:64–67`) call the authored `webpack.config.js`, as in 019 (ejected CRA) and unlike 087.

## Analysis notes

- **RQ1:** the target count is two, but counting projects and finding federation alone does not resolve inclusion in the phenomenon. Exposures and their consumers must be interpreted against the code-sharing exclusion.
- **RQ1 (execution):** `app2/src/App.tsx:1` imports `Suspense`, but its tree in `app2/src/App.tsx:6–18` does not use it around the lazy components. No build or browser was run. The point submitted for review is the nature of composed elements, without turning an execution imperfection into a new architectural requirement.
- **Protocol (history):** the verified total is 11 commits reachable from the SHA, in a non-shallow clone. Commit history is available, although some old blobs are absent from the partial clone; they were not fetched over the network. Commit titles do not replace pinned-code evidence.
- **Protocol (family):** searches in annotations for `yayaflc`, `HelloButton`, `GoodbyeButton` and `useTextData` found no previously recorded siblings or common origin. Remaining READMEs and configurations indicate ejected CRA scaffold, but do not demonstrate a shared template with a specific candidate. Cases 076 and 078 are comparable by federation with consumed UI and record tool/application interfaces; they do not themselves create a rule requiring complete interfaces. Case 015 shows a shared library, but this candidate also contains two executable targets, so the analogy does not automatically resolve the class.

## Recorded decision

Promote to **Non-MFE**. Although Module Federation is configured and consumed, the remotes provide only two generic buttons and a text hook. The relationship between projects is component and logic sharing, without a functional unit composed in the interface.
