---
schema: 1
id: 1026753138
full_name: Shreya08079/Component-and-Multi-Component-Generator-Platform
url: https://github.com/Shreya08079/Component-and-Multi-Component-Generator-Platform
commit: 533c551b1150d03a65725ba6b078bcd4c610b075
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
  date: 2026-10-22
---

# 081 — Shreya08079/Component-and-Multi-Component-Generator-Platform

## Context

CodeCraft is a component generation, editing and export playground, with a Next.js/React frontend and an Express API. The README uses the term micro-frontend (`README.md:3–14`), but the code implements a conventional application whose iframe displays generated content maintained in the page’s own state. The classification does not attribute MFE architecture to the platform based on its name, descriptions or generator outputs.

Clone checked at `data/samples/mfe-sample-001/repos/Shreya08079__Component-and-Multi-Component-Generator-Platform/`. Rank, ID and SHA match the `cloned` row in `data/samples/mfe-sample-001/clones.csv:82`. `git rev-parse HEAD` returned the front matter SHA and `git cat-file -t` confirmed a commit. Complete inventory of 42 files through `git ls-tree -r -z --name-only`; no gitlinks in the inventory through `git ls-tree -r`. Sources and citations inspected through `git show` and `git grep` searches at the pinned SHA. No builds, application execution or calls to external services were performed.

**Branches, for the record only:** `git for-each-ref` enumerated `refs/heads/master`, `refs/remotes/origin/master` and `refs/remotes/origin/HEAD`, all pointing to `533c551b1150d03a65725ba6b078bcd4c610b075`. There is no other branch available in this clone to inspect; no fetch or content external to the snapshot was used.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure / Configuration / Build/deploy | The inventory contains a single frontend project (`frontend/`) and an API (`backend/`), with only two manifests. `frontend/package.json:5–18` defines Next.js scripts and React dependencies; `backend/package.json:5–8`, `:13–20` defines the Node entry and Express/Mongoose dependencies. Backend is not a second frontend unit; pages and components in `frontend/src/` belong to the same project/build. | contrary |
| Source code / Configuration (UI) | `frontend/src/pages/_app.js:1–4` is the shared wrapper for Next.js pages. `frontend/src/pages/dashboard.js:3–7` statically imports local panels; `frontend/jsconfig.json:2–6` resolves `@/components/*` to its own sources. `frontend/src/pages/dashboard.js:85–102`, `:125–129` renders these components as parts of the same application. | contrary |
| Source code (generation and state) | `frontend/src/components/ChatPanel.js:23–35` sends the prompt to `/api/llm/generate` and passes the returned text to `setCode`. `backend/controller/llmController.js:14–32` requests code from the LLM service and returns it in JSON. `frontend/src/pages/dashboard.js:13–14`, `:21–26`, `:95–100` maintains/loads session code and connects the panel to the local setter. The result is generator work content, not a versioned unit with its own entry/build. | contrary |
| Composition / Source code (preview) | `frontend/src/pages/dashboard.js:109–119` renders an iframe only when there is `jsxCode`; the `srcDoc` attribute at `:114` assembles an HTML string with `cssCode` and `jsxCode`. There is no child application URL, remote entry, generated application build or independent mounting contract. The iframe isolates the preview of session data, rather than connecting two frontend units identified in the repository. `srcDoc` contains a `parent.postMessage` (`:114`), but no `addEventListener('message')` or `onmessage` in `frontend/src`; the page uses a click listener on `contentWindow` (`:115–118`). Without a consumer in the parent and coming from a generated string, it is not an integration contract between units. | contrary |
| Source code (editing and export) | `frontend/src/pages/dashboard.js:67–70` changes the displayed string when editing properties. `frontend/src/components/CodeTabs.js:14–24` exports only `Component.jsx` and `styles.css` in a ZIP; `:64–76` shows highlighted code. It does not generate a manifest, entry or build of a remote integrated into the platform. | context |
| Configuration / Build/deploy (API and publishing) | `frontend/next.config.js:3–16` configures the Next application, static export and rewrite of `/api/:path*` to the backend. `vercel.json:3–12` selects `frontend/package.json` for `@vercel/next` and forwards routes to the frontend. This is a UI/API connection and publishing of one frontend, without UI application composition. | contrary |
| Documentation | `README.md:3–7` calls the playground/viewport a micro-frontend; `README.md:20–25` describes generation, preview and export. `architecture.md:5–14`, `:47–51` distinguishes a Next/React frontend, backend API and preview iframe. The architectural expression was checked against the artifacts above. | weak |
| Technology / Configuration / Source code / Composition | Search with `git grep -n -i -E` at the commit, excluding `.env.local` and files ending in `lock.json`, for `ModuleFederationPlugin`, `module.?federation`, `single.?spa`, `registerApplication`, `remoteEntry`, `remotes`, `exposes`, `import.?map`, `qiankun`, `wujie`, `customElements[.]define` and `System[.]import`: no occurrence. The inventory also contains no Webpack/Vite/Rspack configuration or additional host/remote manifests; the application configuration is `frontend/next.config.js:1–20`. The supplementary search for `<iframe`, `srcDoc` and micro-frontend terms identified the descriptions and preview inspected in `frontend/src/pages/dashboard.js:108–119`, not another composable application. | absent |

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | There is only one own frontend target (`frontend/package.json:5–18`; `frontend/src/pages/_app.js:1–4`). Backend is not frontend, panels are local imports (`frontend/src/pages/dashboard.js:3–7`) and the generated iframe content (`:109–119`) is not a second unit under the current criterion. |
| Q2 | No | There is no set of relatively independent units. The panels share the Next build and page state/props (`frontend/src/pages/dashboard.js:13–16`, `:85–102`, `:125–129`). The generated output has no entry/build of its own, and the exporter only writes JSX/CSS (`frontend/src/components/CodeTabs.js:14–24`). |
| Q3 | No | There is no host/shell/root composing distinct frontend units. The Next wrapper renders a page (`frontend/src/pages/_app.js:3–4`), and the dashboard renders local components and a preview string (`frontend/src/pages/dashboard.js:95–119`). |
| Q4 | No | The iframe is used, but receives `srcDoc` from local data (`frontend/src/pages/dashboard.js:109–119`), without connecting relatively independent units. The searches found no other composition mechanisms; the rewrite in `frontend/next.config.js:10–16` serves an API, not a frontend unit. |
| Q5 | No | The verifiable flow is prompt → code in local state → preview/export, within one frontend (`frontend/src/components/ChatPanel.js:23–35`; `frontend/src/pages/dashboard.js:109–119`; `frontend/src/components/CodeTabs.js:14–24`). This supports a component generation platform, not an MFE instance. Q5 follows Q1–Q4. |

## Rationale

- `Non-MFE` applies: Q1–Q5 are No, without an `MFE-unit` exception. The candidate corresponds to a conventional frontend using micro-frontend as a playground/viewport description, without implementing composition among independent frontend units.
- `frontend_units: 1` counts the only own UI target, Next.js/React. It does not count Express, pages of the same application, statically imported panels or generated code as additional targets. The complete inventory allows this count without assigning zero to unobserved content.
- The iframe was verified in code; it is not an ignored mention. The decision does not depend on resolving the general rule for iframe composition: the current criterion already excludes generated outputs as Q1 units, and here `srcDoc` shows precisely that output. Even accepting iframe as a mechanism would not provide a second unit with its own entry/build. There is no open methodological decision in this case.
- It is not `MFE-unit`: the only frontend does not expose modules/lifecycles to an external host; the exported files are generator products. There is neither build-time composition of applications published as packages nor navigation between independent applications.
- `repo_type: example` records the playground/prototype: the code identifies selection/editing as a demonstration and text replacement, not actual AST processing (`frontend/src/pages/dashboard.js:58–70`). React and Next.js are observed in the sources (`frontend/package.json:5–18`); `ui_technologies: [react, next]` follows the convention of 013 and 036. `build_tools: []` does not assign an underlying bundler not explicitly configured: the scripts and configuration show Next.js, without independent Webpack/Vite/Rspack configuration. `approaches: []` follows the Non-MFE record.

## Analysis notes

- **RQ1 (misleading signals):** “micro-frontend playground” in the README and UI labels describes the product; `srcDoc` with generated code is the technical evidence distinguishing preview from application composition.
- **Protocol (precedents):** the criterion consolidated in final cases 028 (`028-mmss1995__SkewForge.md`, targets without a composition relationship do not satisfy Q1) and 023 (`023-arunkumarsubburaj__mfe_slide_dev.md`, code as content is not an implemented unit) was applied, together with the current reminder about generated code. The own frontend is counted, whereas the content it produces is not.
- **Protocol (families/templates):** searching existing annotations for `CodeCraft`, `Shreya08079` and `Component-and-Multi-Component-Generator` found no other member of the same family/template. Case 075 (`075-ligoj__cli.md`) is analogous only regarding the distinction between a generation tool and its outputs; there is no evidence of shared origin. No duplication or affiliation was inferred from the term playground.
