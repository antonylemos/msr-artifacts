---
schema: 1
id: 1353825451
full_name: anish0714/devpulse-mfe
url: https://github.com/anish0714/devpulse-mfe
commit: 6a2348d162b34030505554ab0ef954577627999a
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
approaches: [module-federation]
ui_technologies: [react]
build_tools: [webpack]
frontend_units: 6
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-22
---

# 076 — anish0714/devpulse-mfe

## Context

Browser toolbox organized as a shell and five remote applications: PDF conversion, PDF manipulation, developer utilities, PDF form filling and OCR. The project presents itself as an architecture demonstration (`README.md:9–12`); classification rests on configurations and component consumption in code, not the repository name or that statement.

Clone checked in `data/samples/mfe-sample-001/repos/anish0714__devpulse-mfe/`. Rank, ID and SHA match the `cloned` row in `data/samples/mfe-sample-001/clones.csv:77`; `git rev-parse HEAD` returned the front matter SHA and `git cat-file -t` confirmed a commit. Complete 90-file inventory through `git ls-tree -r --name-only`; contents and citations verified through `git show`/`git grep` at the fixed SHA. No builds were run or published environments accessed.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure / Build/deploy | `package.json:5–11` declares workspaces in `packages/*` and delegates builds to each workspace. The inventory identifies six packages with their own manifest, Webpack configuration, entry and bootstrap; the next six rows record these artifacts. | moderate |
| Configuration / Source code / Build/deploy (shell) | `packages/shell/package.json:5–8` defines its own start/build; `packages/shell/webpack.config.js:28–34` defines entry and output; `packages/shell/src/index.ts:3` loads bootstrap; `packages/shell/src/bootstrap.tsx:1–7` mounts the React application. | moderate |
| Configuration / Source code / Build/deploy (dev-utils) | `packages/dev-utils-remote/package.json:5–8` defines its own start/build; `packages/dev-utils-remote/webpack.config.js:10–16` defines entry/output and `:28–38` defines port, name `devUtils`, `remoteEntry.js` and exposure of `./Widget`; `packages/dev-utils-remote/src/index.ts:3` and `packages/dev-utils-remote/src/bootstrap.tsx:1–7` constitute the independent entry. | moderate |
| Configuration / Source code / Build/deploy (OCR) | `packages/ocr-remote/package.json:5–8` defines its own start/build; `packages/ocr-remote/webpack.config.js:10–16` defines entry/output and `:28–38` defines port, name `ocr`, `remoteEntry.js` and exposure of `./Widget`; `packages/ocr-remote/src/index.ts:3` and `packages/ocr-remote/src/bootstrap.tsx:1–7` constitute the independent entry. | moderate |
| Configuration / Source code / Build/deploy (PDF conversion) | `packages/pdf-conversion-remote/package.json:5–8` defines its own start/build; `packages/pdf-conversion-remote/webpack.config.js:10–16` defines entry/output and `:28–38` defines port, name `pdfConversion`, `remoteEntry.js` and exposure of `./Widget`; `packages/pdf-conversion-remote/src/index.ts:3` and `packages/pdf-conversion-remote/src/bootstrap.tsx:1–7` constitute the independent entry. | moderate |
| Configuration / Source code / Build/deploy (PDF forms) | `packages/pdf-form-filler-remote/package.json:5–8` defines its own start/build; `packages/pdf-form-filler-remote/webpack.config.js:10–16` defines entry/output and `:28–38` defines port, name `pdfFormFiller`, `remoteEntry.js` and exposure of `./Widget`; `packages/pdf-form-filler-remote/src/index.ts:3` and `packages/pdf-form-filler-remote/src/bootstrap.tsx:1–7` constitute the independent entry. | moderate |
| Configuration / Source code / Build/deploy (PDF manipulation) | `packages/pdf-manipulation-remote/package.json:5–8` defines its own start/build; `packages/pdf-manipulation-remote/webpack.config.js:10–16` defines entry/output and `:28–38` defines port, name `pdfManipulation`, `remoteEntry.js` and exposure of `./Widget`; `packages/pdf-manipulation-remote/src/index.ts:3` and `packages/pdf-manipulation-remote/src/bootstrap.tsx:1–7` constitute the independent entry. | moderate |
| Composition / Configuration | `packages/shell/webpack.config.js:11–25` selects the five production or localhost `remoteEntry.js` endpoints; `:50–58` configures `ModuleFederationPlugin` with the names corresponding to the five remotes. Names and exposed modules match each remote's artifacts above. | strong |
| Composition / Source code (consumption) | `packages/shell/src/App.tsx:7–11` imports the five `Widget` components through `React.lazy`; `:34–90` associates each component with an application section; `:95–97`, `:135–147` and `:160–166` select and render the remote component in `Suspense` within `RemoteErrorBoundary`. These are more than type declarations or dependencies. | strong |
| Source code (composed UI) | Exposed modules contain tool screens: `packages/dev-utils-remote/src/Widget.tsx:18–40` renders selection and the active tool; `packages/pdf-conversion-remote/src/Widget.tsx:185–199` renders operation navigation; `packages/pdf-manipulation-remote/src/Widget.tsx:277–287`, `packages/pdf-form-filler-remote/src/Widget.tsx:115–125` and `packages/ocr-remote/src/Widget.tsx:114–123` render screens with file input. These are application interfaces, beyond utility code sharing. | strong |
| Structure / Source code (independence) | Inspected `from` references, side-effect imports, `import()` and `require()` in all `.ts`/`.tsx` sources under `packages/*/src/`: 67 relative specifiers, none resolving to another package. Non-relative specifiers are external libraries and the five federated imports in `packages/shell/src/App.tsx:7–11`. Also searched other manifests for workspace dependencies: none. The five federated modules are declared in `packages/shell/src/types/remotes.d.ts:1–29`, confirming that `App.tsx:7–11` imports are federated specifiers. Utilities such as `CopyButton.tsx` and `FileDropZone.tsx` are duplicated between remotes, without a common package. All six `tsconfig.json` files include only `src` (`packages/shell/tsconfig.json:13`, `packages/dev-utils-remote/tsconfig.json:13`, `packages/ocr-remote/tsconfig.json:13`, `packages/pdf-conversion-remote/tsconfig.json:13`, `packages/pdf-form-filler-remote/tsconfig.json:13`, `packages/pdf-manipulation-remote/tsconfig.json:13`), without aliases to other units' sources. | absent |
| Build/deploy (limitation) | `.github/workflows/deploy.yml:36–44` builds all workspaces, but copies only shell, PDF conversion and PDF manipulation to the site; `:46–60` publishes that site on Pages. The dev-utils, PDF forms and OCR paths required in `packages/shell/webpack.config.js:17–25` are not copied. `.github/workflows/ci.yml:18`, `:32–36` likewise covers only three packages in the matrix. Contrasts with the description of six separately published and verified units in `README.md:88–96`, `:113–116`; no claim is made that all five remotes work on the site published by this workflow. History explains the gap: commit d0b0a84 (2026-09-01, "Revert workflow-file edits (push blocked without workflow OAuth scope)") says `ci.yml` and `deploy.yml` still needed the dev-utils entry and path, and subsequent remotes (5062d12 and fcca491, same date) were not added either. The omission stems from a push permission block, not deployment design (history read without modification). | context |

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | Yes | Six identifiable units: shell and five remotes, with entries/builds recorded in the table. The host explicitly references all of them (`packages/shell/webpack.config.js:50–58`), and consumed components are in `packages/shell/src/App.tsx:7–11`. |
| Q2 | Yes | Each unit has its own entry, bootstrap and build; the six unit rows document artifacts. For example, `packages/dev-utils-remote/package.json:5–8`, `packages/dev-utils-remote/webpack.config.js:10–16` and `packages/dev-utils-remote/src/bootstrap.tsx:1–7`. Import inspection found no direct access to another unit's sources; shell integration uses federated names (`packages/shell/src/App.tsx:7–11`). Joint file publication preserves separate bundles and endpoints (`.github/workflows/deploy.yml:41–44`; `packages/shell/webpack.config.js:11–25`). |
| Q3 | Yes | The shell offers section navigation and renders the selected remote within the same application (`packages/shell/src/App.tsx:34–90`, `:95–97`, `:135–166`). |
| Q4 | Yes | There is correspondence between host `remotes` (`packages/shell/webpack.config.js:50–58`), the five remotes' `exposes` (each `webpack.config.js:33–38` listed in the table) and actual shell imports/rendering (`packages/shell/src/App.tsx:7–11`, `:160–166`). This establishes Module Federation composition in code, including at least the two remotes copied by the publication workflow (`.github/workflows/deploy.yml:41–44`). |
| Q5 | Yes | Reciprocal configurations, units with their own builds/entries and remote UI actually consumed by the shell support an MFE instance (`packages/shell/webpack.config.js:50–58`; `packages/shell/src/App.tsx:7–11`, `:160–166`; individual artifacts in the table). Publication limitations do not eliminate implemented composition. |

## Rationale

- `MFE-implemented` applies: Q1–Q5 are Yes. Matches the inclusion cases of a host/remotes monorepo and a demonstration actually composing frontend units.
- `frontend_units: 6` counts the shell and five observed remote applications. Internal dev-utils tools are components of the same unit, not additional units (`packages/dev-utils-remote/src/Widget.tsx:3–20`).
- The exclusion for Module Federation used only for code sharing does not apply: the host renders tool screens from remotes. `MFE-unit` also does not apply, since the host is present and consumes exposures.
- Assembling the `site/` directory during deployment copies independent builds; it does not integrate remote sources into a package statically consumed by the shell. Connection uses `remoteEntry.js` and federated imports at runtime (`packages/shell/webpack.config.js:11–25`, `:50–58`; `packages/shell/src/App.tsx:7–11`). There is no unresolved build-time, link or iframe composition decision.
- Architectural evidence is in code and configuration. The incomplete workflow limits publication of all five remotes; analysis does not confirm execution, current accessibility or build/deployment success.

## Analysis notes

- **RQ1:** the README describes the intended state (six units in CI and publication); workflows at the commit were outdated, with only shell and two remotes in the matrix/copy, because of a push block (d0b0a84). The six-unit count comes from artifacts, not the independent deployment claim.
- **RQ2:** Module Federation/Webpack with React applications, asynchronous bootstrap, React singleton and remote components loaded on demand (`packages/shell/src/index.ts:1–3`; `packages/shell/webpack.config.js:59–61`; `packages/shell/src/App.tsx:7–11`).
- **RQ3:** verified chain between names/URLs in `remotes`, unit names/`exposes` and `lazy`/rendering consumption in the host. Partial publication is a known operational limitation, without a pending methodological decision about the class.
