---
schema: 1
id: 1321873951
full_name: AliBakhshandeh/adm-interview
url: https://github.com/AliBakhshandeh/adm-interview
commit: 7e0e173d18212a104edc4ea4aed5909174f833c8
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: library
approaches: []
ui_technologies: [react]
build_tools: [vite]
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 108 — AliBakhshandeh/adm-interview

## Context

Metadata-driven forms library/framework, developed as a technical assessment, with React showcase, Storybook, engine/rendering packages and a form-file generation CLI. The observed own unit is the showcase; forms, library packages and stories are not independent applications composed together. The assessment nature is explicit in README (`README.md:376–385`), but was neither inferred from repository name nor used to automatically exclude executable code.

## Sample provenance

- Rank 108, ID, identity and strategy `terminology`: `data/samples/mfe-sample-001/sample.csv:109`. Clone, branch `main` and SHA checked in `data/samples/mfe-sample-001/clones.csv:109`. Sample origin in round 002: `data/samples/mfe-sample-001/manifest.json:2–5`.
- `data/discovery/mfe-round-001/candidates.csv:34693` records eligibility `unknown`; `data/discovery/mfe-round-002/candidates.csv:34699`, `pass`. Both show null description, empty topics, TypeScript language, null license and `fork: false`.
- `sqlite3 -readonly` query of databases `data/discovery/mfe-round-001/discovery.sqlite` and `data/discovery/mfe-round-002/discovery.sqlite`, joining `hits` and `queries` and filtering `repository_id=1321873951`: both record `terminology-microfrontend-repositories`, with exact query `microfrontend in:name,description,readme`, and `terminology-microfrontends-repositories`, with exact query `microfrontends in:name,description,readme`. Strategy `terminology`, endpoint `repositories`, without file paths. These are SQLite keys, without textual line numbering.
- By elimination, name, null description and empty topics lack the terms. README contains `microfrontend runtime` in `README.md:478`, within the “Intentionally out of scope” list starting at `README.md:469`. Spelling is joined and singular; there is no literal plural in this mention. This is compatible with README retrieval, without attributing exact match location to the database or automatically explaining the plural hit. The negative mention was not taken alone as classification.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | Complete inventory through `git ls-tree -r` of the SHA: 79 regular files, all mode 100644; zero symlinks and zero gitlinks. Forty files in ten packages under `packages/`, 11 in `apps/showcase/`, 12 in `docs/`, one in `e2e/`, one in `scripts/` and 14 files at root. No `node_modules`, vendored platform tree or submodules. Git-tree counts, without artificial text lines. | context |
| Structure / Build/deploy | Workspace covers `apps/*` and `packages/*` (`pnpm-workspace.yaml:1–3`), but its sole application is `@admiral/showcase`, with Vite and Storybook scripts (`apps/showcase/package.json:1–21`). HTML has `#root` and entry `/src/main.tsx` (`apps/showcase/index.html:8–10`); that entry calls `createRoot(...).render(<App />)` (`apps/showcase/src/main.tsx:90`). | contrary |
| Configuration / Technology | Explicit Vite configuration imports `defineConfig` and React plugin, fixes port 5173 and configures build (`apps/showcase/vite.config.ts:1–8`). Vite and plugin are declared at root (`package.json:45–56`) and resolved in lockfile: React plugin 4.7.0 with Vite 5.4.21 (`pnpm-lock.yaml:66–68`; `pnpm-lock.yaml:96–98`). React/ReactDOM 18.3.1 and showcase workspace links are pinned (`pnpm-lock.yaml:103–119`). Entry/configuration files exist, without running installation/build. | context |
| Source code (consumption) | Showcase statically imports `FormRenderer` and utilities from the facade and two local definitions (`apps/showcase/src/main.tsx:1–6`). State selects booking/employee, changes definition and passes props to one renderer (`apps/showcase/src/main.tsx:8–9`; `apps/showcase/src/main.tsx:35–46`; `apps/showcase/src/main.tsx:72–80`). There are no remote application mounts or separate builds per form. | contrary |
| Source code (exports/props) | Facade reexports `form-react` (`packages/form-platform/src/index.ts:1–6`), which defines and exports `FormRenderer` (`packages/form-react/src/index.tsx:63–73`). Consumed props — `definition`, `initialValues`, `context`, `draftAdapter`, `dataSources`, `plugins` — match the contract (`packages/form-react/src/index.tsx:9–20`). This is a component/library API, not remotes/exposes. | context |
| Structure / Configuration | Packages such as `form-platform` and `form-react` export ESM and have their own tsup builds (`packages/form-platform/package.json:4–20`; `packages/form-react/package.json:4–19`). These builds produce libraries; they do not supply a second application with its own entry/browser/mount. TypeScript paths point to local package sources (`tsconfig.base.json:20–29`), and lockfile links workspace dependencies (`pnpm-lock.yaml:103–110`). | contrary |
| Source code / Composition | Renderer imports engine, rules and UI primitives as libraries (`packages/form-react/src/index.tsx:1–7`) and creates an engine instance for the definition (`packages/form-react/src/index.tsx:63–73`). Local plugins contribute event registrations/callbacks (`packages/form-platform/src/index.ts:10–21`; `packages/form-platform/src/index.ts:25–49`). The word platform/plugin identifies neither an application host nor a third-party platform plugin. | contrary |
| Source code / Structure (Storybook) | Configuration selects showcase’s own stories and framework `@storybook/react-vite` (`apps/showcase/.storybook/main.ts:1–7`). Stories import the same renderer and local definitions, rendering component variations (`apps/showcase/src/form.stories.tsx:1–3`; `apps/showcase/src/form.stories.tsx:22–44`). It is a demonstration/testing tool, without composition with showcase as another application unit; neither each story nor Storybook adds a unit. | context |
| Source code (generation) | CLI creates `features/<nome>`, prepares strings for schema/form/rules/validation/datasource/fixture/migrations/test and writes files (`packages/form-cli/src/index.ts:16–32`). Potential outputs neither have their own application entry/build nor constitute units present/referenced by composition configuration. | contrary |
| Technology / Configuration / Composition | Text search at the SHA, excluding `pnpm-lock.yaml`, for `ModuleFederation`, `remoteEntry`, `exposes`, `remotes`, `registerApplication`, `single-spa`, `qiankun`, `wujie`, `customElements`, `postMessage`, `iframe` and `loadRemote`: no MFE integration mechanism. Hits for `exposes` are documentation/test prose; `loadRemoteOptions` is a data method for field options (`packages/form-core/src/index.ts:323–337`), not a remote module loader. Inventory and reading of manifests/configs found no remotes ↔ exposes ↔ consumption chain, import map or external-host contract. | absent |
| Documentation / Composition | Architecture describes a reusable forms platform and engine/presentation separation (`docs/architecture.md:3–5`), library dependency diagram (`docs/architecture.md:21–38`) and App → Renderer → Engine flow (`docs/architecture.md:40–55`). README declares microfrontend runtime out of scope (`README.md:469–478`), consistent with code. No separate ADR exists in inventory; actual architectural documentation exists, beyond a README title. | contrary |

## Authorship and history

Metadata at the SHA: 11 reachable commits, zero merges, one root commit `cf4f13188a55351fc2123d763ba8104ee1995300`, non-shallow clone. All record author and committer `Ali Bakhshandeh Ardestani`, from 31/07/2026 to 04/08/2026. `main`, `origin/main` and `origin/HEAD` are the only observed refs and point to the evaluated SHA; no other-branch content was used.

`git log --no-renames --name-status` for `apps/showcase/`, `packages/form-platform/` and `packages/form-cli/`, always with `GIT_NO_LAZY_FETCH=1`: root commit bulk-adds showcase, facade and CLI. Subsequent changes affect UI sources in `1492379ce8c46428dee8519b1eaeeb8612ca0a3f`, Vite/Storybook configurations in `332dab0a81825f57a9e440b97ba61fd635e384c3` and package/CLI contracts in `cf52bfaf35dd501e1a901ad977c57a76fce678e7`. History records evolution under the owner’s identity; a bulk addition alone demonstrates neither third-party import nor complete original authorship. No vendored copy independent of the own target was identified. No object was missing in queries; historical blobs were unnecessary.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | One own showcase application. Two forms are definitions selected in the same App/renderer (`apps/showcase/src/main.tsx:35–46`; `apps/showcase/src/main.tsx:72–80`); packages, CLI and stories do not constitute additional composition units. |
| Q2 | No | Showcase build/entry and library builds exist, without a set of frontend units with their own entries/builds. Renderer uses engine/UI as libraries (`packages/form-react/src/index.tsx:1–7`; `packages/form-platform/package.json:4–20`), and local paths do not establish independence between applications (`tsconfig.base.json:20–29`). |
| Q3 | No | App renders forms in the same renderer, without a host mounting/routing distinct units (`apps/showcase/src/main.tsx:35–46`; `apps/showcase/src/main.tsx:72–90`). |
| Q4 | No | Static library API consumption, without a configured and used MFE composition mechanism (`packages/form-platform/src/index.ts:1–6`; `packages/form-react/src/index.tsx:63–73`). MFE runtime is explicitly out of scope (`README.md:469–478`), confirmed through configuration and source inspection. |
| Q5 | No | Forms library with conventional showcase; evidence characterizes neither MFE architecture nor a unit prepared for an external host. |

## Rationale

- `Non-MFE`: No answers, without MFE-unit exception. `repo_type: library` describes the principal reusable artifact; `frontend_units: 1` counts the actual showcase application after inventory, without counting library, Storybook, tests or CLI output.
- Q1 requires concrete units or composition configuration references. A list of packages, forms or stories does not provide those units. Q2 requires units’ own entries and builds: ESM library builds do not turn components/engines into relatively independent applications.
- The open build-time composition question does not automatically apply: these are schema, validation, engine and renderer libraries, without applications published as packages being composed. Facade and props contract were checked; there is no merely incomplete MFE integration chain.
- Q4 requires a mechanism configured and used between units; a library import or platform/plugin/remote-data vocabulary is insufficient. No unit is prepared for an external host, so Q2–Q4 remain No.
- As in finals 023/028 and comparators 075/081/094, exercise content and generated outputs are not units; the actual showcase implementation remains counted. Interview status does not exclude examples actually composing units, such as 007 and 076/084/096/106, but that chain does not exist here.
- 097/103/104 discuss unconnectable integration; here library consumption is explicit and consistent, without a promised remote application to complete. 089/100 discuss federation code sharing, whereas sharing here is conventional through packages. 074/102/080 warn about third-party platform/code; no third-party platform host or vendored distribution requires adjudication here.
- `build_tools: [vite]` follows from explicit config and Storybook hook. Esbuild is not inferred from the tsup command, nor an additional bundler from testing tools. No classification decision remains open about iframe, links, build-time units or execution imperfection; build/tests/application were not run.

## Analysis notes

- **RQ1 (families):** searches for `admiral`, `AliBakhshandeh`, `adm-interview` and `form-platform` in available annotations found no previously annotated sibling/template. Compared cases are methodological precedents, without proof of common origin.
- **RQ1 (misleading signals):** occurrence of `microfrontend runtime` explicitly excludes it from scope; `loadRemoteOptions` loads field data, and `FormPlugin` extends the forms engine. None of these names confirms UI composition.
- **RQ3:** checked relationships are showcase → ESM facade → renderer/engine/libraries and form definition → props → FormRenderer. Export and props match, but this chain is not host → remote frontend.
- **Protocol:** hits from both rounds preserve joined singular/plural queries. README contains singular in a negative list; database locates neither the match nor justifies attributing literal plural to the document.
- **RQ1 (mentions and provenance):** "microfrontend runtime" also appears in the out-of-scope list at `docs/performance-security-governance.md:148`, a second negative mention that does not explain discovery retrieval (outside name, description and README). `AI_USAGE.md:5` declares OpenAI Codex use for architecture analysis, scaffolding, testing strategy, documentation and review; this is a provenance note, without effect on class.
