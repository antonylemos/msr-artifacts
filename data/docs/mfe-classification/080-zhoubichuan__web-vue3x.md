---
schema: 1
id: 657625625
full_name: zhoubichuan/web-vue3x
url: https://github.com/zhoubichuan/web-vue3x
commit: 0051112ec3e6390ff34520ccabfcbbb8fc82ede3
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: other
approaches: []
ui_technologies: [vue]
build_tools: [vite]
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-22
---

# 080 — zhoubichuan/web-vue3x

## Context

Technical notes site about Vue, built with VitePress, accompanied by a component library and Vue framework sources. The snapshot also contains executable framework tools/examples. The content about single-spa and qiankun is in Markdown articles; these passages must be distinguished from an implemented composite application.

Clone checked at `data/samples/mfe-sample-001/repos/zhoubichuan__web-vue3x/`. Rank, ID and SHA match the `cloned` row in `data/samples/mfe-sample-001/clones.csv:81`. `git rev-parse HEAD` returned the front matter SHA and `git cat-file -t` confirmed a commit. Complete inventory of 813 files through `git ls-tree -r -z --name-only`, including 577 files in `vue/` and 174 in `src/`. Sources and citations were inspected through `git show` and `git grep` searches at the pinned SHA, without installing dependencies, running builds or opening the published site.

**Branches, for the record only:** `master`, `origin/master` and `origin/HEAD` point to the evaluated SHA. Other available local references: `origin/dependabot/npm_and_yarn/vitepress-1.6.3` → `0244a5b01f1b7afd4b92f35e84b3faff974a7078`; `origin/gh-pages` → `0dbf644f7122fdca0449678632b8cf2eede5b095`; `origin/template-mobile-vite` → `368e64a247570cb9a4065e68037b1630075d4ad9`; `origin/template-pc-vite` → `b80ca021fc67200b3cb3c5913d023b0bf9756198`. Their inventories have 796, 348, 31 and 47 files, respectively. `gh-pages` contains published HTML/assets; the two template branches have their own trees with `src/`, manifest and Vite configuration. Some manifest blobs for these templates are unavailable in the partial clone: reading attempted to retrieve them from the promisor remote and failed because of network resolution. The record of these branches is limited to available references and trees; their content does not support Q1–Q5 and was not incorporated into the snapshot.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Configuration / Build/deploy (site) | `package.json:29–33` defines `vitepress dev src`, `vitepress build src` and component builds. `src/.vitepress/config.ts:10–17` configures a site with base `/web-vue3x/`, its own output and source exclusion; `:24–30` configures Vite. `.github/workflows/gh-pages.yml:24–37` builds and publishes the `web-vue3x` directory. This is the main documentation target, not a demonstrated MFE shell. | context |
| Source code / Configuration (components) | `src/.vitepress/theme/index.ts:1–16` extends the default theme, directly imports `../../../components/index.ts` and installs `VueUI`/preview in the same application. `components/index.ts:12`, `:24`, `:30`, `:48`, `:70` imports local components; `:196–199` registers them with `app.component`. This is a statically consumed component library, without independent applications composing the UI. | contrary |
| Structure / Source code (framework) | `vue/README.md:1–5` identifies the content as `vuejs/core`; `vue/package.json:3–9` records version 3.2.31 and framework builds. The inventory contains compiler, runtime, reactivity and their tests; these packages are not counted as frontend applications. | context |
| Configuration / Source code / Build/deploy (playground) | `vue/packages/sfc-playground/package.json:5–8` defines its own dev/build; `vue/packages/sfc-playground/src/main.ts:1–10` mounts the Vue application; `vue/packages/sfc-playground/src/App.vue:30–40` renders Header and REPL. `vue/packages/sfc-playground/vite.config.ts:9–18` configures Vite, and `:20–38` copies the Vue runtime, not another frontend application. It is an executable target separate from the notes site. | moderate |
| Configuration / Source code / Build/deploy (explorer) | `vue/packages/template-explorer/index.html:5–19` contains the editors and loads its own bundle; `vue/packages/template-explorer/src/index.ts:1–12`, `:37–41` uses compilation/runtime libraries and initializes the editor. `vue/packages/template-explorer/package.json:2–11` defines the global target; `vue/scripts/build.js:74–108` builds a selected package with Rollup. `vue/package.json:20–24` exposes its own development/access commands. | moderate |
| Configuration / Source code / Build/deploy (size-check) | `vue/packages/size-check/package.json:5–6` defines a Vite build; `vue/packages/size-check/vite.config.js:2–9` defines the entry; `vue/packages/size-check/src/index.ts:1–6` mounts a minimal rendering application. It is an auxiliary measurement/testing target, without integration into the notes site or the two editors. | context |
| Documentation (single-spa/qiankun) | `src/senior/1.micro/1.singlespa.md:22–35`, `:98–113` presents fenced code, including lifecycles and `registerApplication`. `src/senior/1.micro/2.qiankun.md:19–24` shows a fictitious tree `micro/base/sub1/sub2`; `:30–70` contains fenced qiankun initialization; `:74–105` begins child configuration in another fence. These paths/applications are not in the tree as executable projects. | weak |
| Composition / Documentation (iframe) | `src/senior/1.micro/2.qiankun.md:321–325` closes the code block and includes an `<iframe ... src="./base"/>` outside the fence, in the results section. It may be rendered as part of the documentation page; the relative target has no corresponding artifact in `src/senior/1.micro/base/`. A child application actually available at this address was not verified. Acceptance of iframe as an MFE mechanism remains open. | ambiguous |
| Technology / Configuration / Source code | Search throughout the tree, excluding Markdown and lockfiles, for `registerMicroApps`, `loadMicroApp`, `registerApplication`, `single-spa`, `qiankun`, `ModuleFederationPlugin`, `remoteEntry`, `<iframe` and `micro-app`: only the labels/links for qiankun articles in `src/.vitepress/sidebar.ts:215–220` occurred. No MFE initialization was found in executable sources/configurations. The supplementary Markdown search found the examples above, not host/remote entry files. | absent |
| Structure / Composition | The complete inventory was searched for the demonstration directories `micro/`, `base/`, `sub1/`, `sub2/`, the file `micro-app.js` and the target `src/senior/1.micro/base/`: absent. The actual `src/base/` directory contains documentation chapters and components; it is not the `base` application in the example in `src/senior/1.micro/2.qiankun.md:19–24`. There is no configuration combining site, playground, explorer and size-check in the same application. | absent |
| Source code (export template) | `vue/packages/sfc-playground/src/download/download.ts:3–7` imports starter files as raw text; `:17–29` writes these files and the components from the editor state to a ZIP. The starter’s `main.js` imports `App.vue` (`vue/packages/sfc-playground/src/download/template/main.js:1–4`), but this component is provided by the exported state, not the versioned template directory. The download starter is not counted as another instantiated unit. | context |

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | The snapshot’s executable targets (VitePress site, `package.json:30–31`; SFC Playground, `vue/packages/sfc-playground/src/main.ts:1–10`; Template Explorer, `vue/packages/template-explorer/index.html:5–19`; size-check, `vue/packages/size-check/src/index.ts:1–6`) do not form units of the same application, and no composition configuration references other units. The three `vue/` targets are tools from a copy of `vuejs/core` (`vue/README.md:1`; `vue/package.json:3`), excluded from the site build (`src/.vitepress/config.ts:13`). The article names base/sub1/sub2 are not included. The criterion follows precedent 028 (apps without a composition relationship: Q1 No) and the checklist exclusions. |
| Q2 | No | There are no candidate units composing an application. The targets have separate entries and builds, but no relationship to each other: the theme imports a component library (`src/.vitepress/theme/index.ts:4–16`) and the editors/test use framework libraries (`vue/packages/template-explorer/src/index.ts:1–12`; `vue/packages/size-check/src/index.ts:1–6`). Build independence is not evidence of composition. |
| Q3 | No | There is no host mounting/routing these four targets in the same application. The site configuration organizes documentation and local previews (`src/.vitepress/config.ts:10–17`, `:41–45`; `src/.vitepress/theme/index.ts:13–16`). The isolated iframe (`src/senior/1.micro/2.qiankun.md:325`) points to another undemonstrated target, not playground/explorer/size-check. |
| Q4 | No | No executable single-spa/qiankun composition was found outside Markdown; the documented calls are fenced (`src/senior/1.micro/2.qiankun.md:30–70`; `src/senior/1.micro/1.singlespa.md:98–113`). The iframe outside the fence (`src/senior/1.micro/2.qiankun.md:325`) points to `./base`, which does not exist in the snapshot, and does not connect any Q1 unit. Target absence was verified in the inventory, so the use is not uncertain. |
| Q5 | No | The evidence shows MFE documentation and auxiliary targets without common composition; Q3 is No. The qiankun/single-spa excerpts are teaching content, and the iframe without a verifiable target does not confirm architecture (`src/senior/1.micro/2.qiankun.md:19–24`, `:30–70`, `:325`). The judgment follows the rule for a No answer, without override. |

## Rationale

- `Non-MFE` is proposed: Q1 through Q5 are No and `MFE-unit` does not apply. This corresponds to documentation mentioning microfrontends without observable implementation and frontend targets without composition among them (checklist exclusions; precedents 028 and 023). The component library and framework packages are not MFE units.
- `frontend_units: 1` counts only the VitePress site, the repository’s own target. The `vue/` targets (SFC Playground, Template Explorer, size-check) are tools from a copy of `vuejs/core` 3.2.31 maintained for source-code study (`vue/README.md:1`; `vue/package.json:3`) and excluded from the site build (`src/.vitepress/config.ts:13`); they were not added. Neither were HTML fixtures, isolated components, fenced code or the export starter.
- `repo_type: other` describes technical notes with a library and vendored third-party code; `unit_organization: single-unit`. `build_tools: [vite]`: the site’s Vite (`src/.vitepress/config.ts:24–30`); Rollup appears only in vendored code (`vue/scripts/build.js:74–108`) and gulp is the component library’s task runner. `approaches: []` follows the Non-MFE convention: single-spa/qiankun appear as content, and the iframe does not constitute an MFE mechanism.
- Static consumption of the library by the theme was not reinterpreted as build-time application composition: `components/index.ts:196–199` registers common components, not units with their own entries/deployments. The methodological question actually open in this case is the iframe in the article.

## Analysis notes

- **RQ1:** searches for API names return Markdown examples; fences and actual paths must be checked. The iframe in `src/senior/1.micro/2.qiankun.md:325` is outside the fence and therefore differs in nature from the registration examples.
- **Protocol (families/templates):** searching existing annotations for `zhoubichuan`, `web-vue`, `vuejs`, `sfc-playground` and `template-explorer` did not identify a previously annotated shared family/template. Case 023 (`023-arunkumarsubburaj__mfe_slide_dev.md`) is only analogous regarding MFE code as teaching content; there is no evidence of common lineage. The `template-mobile-vite` and `template-pc-vite` branches belong to this repository, but not to the evaluated snapshot. Attribution of `vue/` to the framework relies on its own README/manifest; no external deduplication was performed.

## Point for joint review

- **Disagreement between analyst and reviewer, resolved during consolidation:** the first version had Q1=Yes, Q2=Yes and Q4=Undetermined, counting four targets (`frontend_units: 4`, `monorepo`). The independent review recommended Q1, Q2 and Q4 = No and `frontend_units: 1`, following final precedent 028 (apps without a composition relationship: Q1 No) and the checklist exclusions. I adopted the second reading. The `Non-MFE` class is the same in both. Confirm whether this criterion applies here, particularly treatment of `vue/` as vendored third-party code (alternative: `frontend_units: 0` and `none`, as in 023, treating the documentation site as a non-unit).
- **Iframe:** `src/senior/1.micro/2.qiankun.md:325` points to `./base`, missing from the snapshot. It was treated as a misleading signal (RQ1), with Q4 No because of verified target absence. If an artifact serving `./base` ever exists, reapply Q1–Q5. There is no decision changing the class; the annotation remains in `review` only because of the counting choice above.
