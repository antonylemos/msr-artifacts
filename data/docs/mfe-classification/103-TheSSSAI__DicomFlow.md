---
schema: 1
id: 1072488371
full_name: TheSSSAI/DicomFlow
url: https://github.com/TheSSSAI/DicomFlow
commit: 30ad97a63074ba9ac78de0cfb68d3f176849dc02
classification: Uncertain
checklist: { q1: yes, q2: undetermined, q3: yes, q4: undetermined, q5: undetermined }
repo_type: production
approaches: [module-federation]
ui_technologies: [react]
build_tools: [vite]
frontend_units: 3
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 103 — TheSSSAI/DicomFlow

## Context

Multi-tenant PACS platform project, with .NET services, extensive documentation, a React shell and clinical/administration modules. `repo_type: production` records orientation toward a medical imaging system, described as a goal in `README.md:114–134`, not verified deployment or readiness. Modules contain React sources and configurations outside documents, but composition has contract failures, missing entries and configurations not loadable as written. Neither name nor federation dependency is considered implementation confirmation.

Clone confirmed: `TheSSSAI__DicomFlow`; SHA according to `data/samples/mfe-sample-001/clones.csv:104`. Complete inventory through `git ls-tree -r` at the SHA: **1.923 regular files** (mode `100644`), **zero symlinks** and **zero gitlinks**. There are no `node_modules/`, npm/yarn/pnpm lockfile or submodules. The four folders with package.json are shell (92 files), admin (103), clinical (99) and dicom-viewer-component (77); all are snapshot subfolders, not implicitly accessible external repositories.

`frontend_units: 3` records application targets identified by sources/configuration: `pacs-webapp-shell`, `pacs-webapp-admin-portal` and `pacs-webapp-clinical-workspace`. It does not assert complete entries/builds, the doubt addressed in Q2/Q4. `pacs-dicom-viewer-component` is an ES/UMD library, not a demonstrated fourth federated application: host alias viewer has no corresponding federation producer in the snapshot. A fourth unit is not counted merely from a declared URL, like the unimplemented generic remote in 083. Backend services, documents, library and individual pages do not increase the count.

## Sample provenance

- `data/samples/mfe-sample-001/sample.csv:104`: rank 103, id 1072488371, `strategies: technology`, eligibility `pass`. The origin run is `data/discovery/mfe-round-002` (`data/samples/mfe-sample-001/manifest.json:2–5`).
- `data/discovery/mfe-round-001/candidates.csv:19696` and `data/discovery/mfe-round-002/candidates.csv:19702` record strategy `technology`, description “DicomFlow” and `fork: false`. The `metadata_json` of these rows provides no topics, language, license or dates; field absence was not rewritten as an empty list or confirmed information. `fork: false` does not prove original file authorship.
- `sqlite3 -readonly` query against both discovery.sqlite databases, joining `hits`/`queries` through `query_id` and filtering `hits.repository_id = 1072488371`: each round has only `technology-vite-federation-package-code`, endpoint `code`, query `"@originjs/vite-plugin-federation" filename:package.json`, path `pacs-webapp-shell/package.json`.
- **Fields and location:** this is not a name/description/topics/README hit, and no textual elimination was invented for a code query. The hit artifact declares the plugin in `pacs-webapp-shell/package.json:25`. Name and description do not demonstrate MFE; README is a documentary index and requirements. Consumer configuration and other contracts were inspected separately, because the isolated dependency is insufficient.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Configuration (host) | `pacs-webapp-shell/vite.config.ts:1–22` imports the plugin, configures clinical/admin/viewer aliases and reads their URLs from the environment. `pacs-webapp-shell/.env.development:13–16` defines ports 3001–3003 with `remoteEntry.js`. Vite, React plugin and federation packages are declared (`pacs-webapp-shell/package.json:25`, `:34`, `:50`), and build uses Vite (`:6–10`). There is explicit bundler/composition configuration beyond dependency. | moderate |
| Configuration (admin) | `pacs-webapp-admin-portal/webpack.config.js:28–33` exposes `./AdminRoutes` → `./src/routes/AdminRoutes`; `:1–7` uses CommonJS and entry `./src/index.tsx`, while the package declares `type: module` (`pacs-webapp-admin-portal/package.json:5`). Webpack/Babel/plugins are declared (`:27–30`, `:39–56`), and there is a federation-specific script (`:9`), but CommonJS form in `.js` within an ESM package is not normally loadable as written. Entry and template `./index.html` (`pacs-webapp-admin-portal/webpack.config.js:50–53`) do not exist in the inventory. | ambiguous |
| Configuration (clinical) | `pacs-webapp-clinical-workspace/config/webpack.config.js:43–49` exposes `./routes` → present file `src/routes/index.tsx`. CommonJS config (`:5–11`) is under an ESM package (`pacs-webapp-clinical-workspace/package.json:5`) and the script uses it directly (`:9`). Entry `./src/index.ts` (`pacs-webapp-clinical-workspace/config/webpack.config.js:11`) and template `./public/index.html` (`:70–72`) are absent. CSS rules require style-loader/css-loader (`:32–35`), undeclared in the complete manifest (`pacs-webapp-clinical-workspace/package.json:16–61`); there is no lockfile resolving this absence. | ambiguous |
| Source code (host routes) | `pacs-webapp-shell/src/routes/index.tsx:90–118` associates studies, admin and viewer with MicroFrontendLoader. However, it imports it as default (`:12`) and passes `moduleName`, while the file only exports named versions and its interface requires `scope`/`module` (`pacs-webapp-shell/src/routes/MicroFrontendLoader.tsx:29–32`, `:53–66`, `:70–80`). No concrete alias/exposed-key pair is delivered to the loader as written. | ambiguous |
| Source code (loader) | `pacs-webapp-shell/src/routes/MicroFrontendLoader.tsx:43–57` calls its implementation a placeholder/example and uses `import(`${scope}/${module}`)` entirely dynamically. `:59–64` attempts to render the result as a component. The alternative implementation (`:5–26`, `:70–80`) presumes Webpack globals and an already available container, without the Vite shell configuring or loading these globals. Inspection demonstrated neither variable-import transformation nor an operational path obtaining and adapting exports. | ambiguous |
| Source code (exposed contracts) | Admin exports named function `getAdminRoutes(): RouteDefinition[]`, with local lazy pages (`pacs-webapp-admin-portal/src/routes/AdminRoutes.tsx:1–21`, `:38–56`); the barrel re-exports the function (`pacs-webapp-admin-portal/src/routes/index.ts:12–13`). Clinical exports named function `getRoutes(): RouteObject[]` (`pacs-webapp-clinical-workspace/src/routes/index.tsx:44–64`). These contracts are route tables/factories, not default components for React.lazy; the loader neither calls functions nor incorporates their arrays in the router. | ambiguous |
| Source code (actual UI in modules) | The clinical module contains StudyListPage with domain components/hooks (`pacs-webapp-clinical-workspace/src/features/studies/pages/StudyListPage.tsx:1–15`), and AdminRoutes references tenant, user, credential, GDPR and audit pages (`pacs-webapp-admin-portal/src/routes/AdminRoutes.tsx:4–21`). These are not merely two generic controls or a shared hook like 089/100, nor MFE code only shown in Markdown. UI existence does not correct missing composition links. | context |
| Structure / Source code (missing entries) | Complete file inventory: no index.html or application ReactDOM/main.tsx bootstrap. In particular, entries/templates referenced in both Webpack configs do not exist. The shell has exported AppRouter (`pacs-webapp-shell/src/routes/index.tsx:137–141`), but no mounting entry. Missing files were replaced neither by documentation nor another branch’s content. | absent |
| Configuration / Library (viewer) | `pacs-dicom-viewer-component/vite.config.ts:15–25` configures ES/UMD library with entry `src/index.ts`, exporting DicomViewer (`pacs-dicom-viewer-component/src/index.ts:17–30`). `pacs-dicom-viewer-component/package.json:5–15` describes a reusable component and package exports. There is no plugin/exposes/remoteEntry satisfying the host viewer alias, nor demonstrated package consumption by composition. | contrary |
| Architecture documentation | `docs/architecture/Repository-Architecture-Design.md:11–21` describes React/.NET stack and service decomposition. Specific designs discuss federation and lazy loading (`pacs-webapp-shell/docs/Code Design117.md:1006–1007`, `pacs-webapp-clinical-workspace/docs/Code Design118.md:70–74`, `:903`), but are specifications; they do not correct the actual contract. No separate ADR by name/path was found in the inventory. | context |
| Configuration / Structure (resolution and tool metadata) | Vite/React configs import declared manifest packages; there are no lockfiles for resolved versions or node_modules to inspect installed exports. Webpack configs have declared main packages, but format/entry incompatibilities and loaders above prevent counting them as resolved builds. `build_tools: [vite]` records the host config and explicit library builder; Webpack is not added as a confirmed functional build merely from file existence. Webpack remains an attempt/configuration described in Q2/Q4 evidence. | context |

## Authorship and history

All clone Git commands used `GIT_NO_LAZY_FETCH=1`. History analyzed through metadata, including `git log --name-status` by folder; old blobs, historical diffs or other-branch content were not requested.

- Non-shallow clone; **3 reachable commits**, **0 merges**, **1 root commit**, `a46e4dc7fe6f3845896ff845acc5e179cbcde8bd`. Counts came from `git rev-list --count`, `--count --merges` and `--max-parents=0`.
- Root contains only one file according to `git ls-tree -r`. Commit `6cf8bd590742dd8bace5382a36a3331fa595d62b` adds the file set; its tree and the pinned-SHA tree have 1.923 entries. The last commit modifies only README.md, according to `git log -1 --name-status`.
- `git log --name-status --format=... <SHA> -- pacs-webapp-shell` returns a single change in this folder: **92 additions**, in commit `6cf8bd5`. Admin has **103 additions**, clinical **99** and viewer **77**, all in the same commit and without subsequent changes in these folders. Thus relevant code entered in bulk; there is no local incremental evolution of federation parts in these three commits.
- All three log entries attribute authorship to textual identity **The SSS AI Agent 007**. This is also the committer identity in both addition/revision commits, whereas root has committer **GitHub**. Both later commits have subject “Files added by https://TheSSS.AI”. This demonstrates Git-declared provenance and addition mode, not authenticated owner identity, manual writing or external upstream origin. No earlier author history is preserved in these folders.
- No declaration of a copied third-party project for these modules was found in read evidence; libraries such as React/Cornerstone are declared dependencies. **Bulk addition does not prove third-party vendoring**, just as an identity matching the owner’s ecosystem does not prove original authorship. No upstream or affiliation was invented. Code in normal sources was treated as candidate code, with this explicit provenance limitation; not as a generated snippet merely displayed to the user.
- Date metadata: root records `2025-10-09T01:08:37+05:30`, equivalent to 2025-10-08 in UTC; `6cf8bd5` records `2025-10-08T19:39:06Z`, and evaluated SHA `2025-10-08T19:39:41Z`. There is no chronological inversion when time zones are considered.

## Negative searches and limitations

- All paths inventoried, searching HTML/ReactDOM entries, application main/index, referenced templates, lockfiles and node_modules: absent in the described cases. Only module/library indexes were found, not equivalent bootstraps.
- Viewer-alias producers and federation configurations searched: there is one Vite host and both Webpack route configs; viewer has only a library build. No fourth remote was attributed to this name without a corresponding producer or contract.
- Audit of relevant observed imports found no relative path crossing into another application’s sources. Lazy imports within remotes are local pages; the intended host consumer uses variable scope/module. No getRoutes/getAdminRoutes call by the shell loader or router was found.
- Architecture and Code Design documents were treated as specification, not resolved bootstrap/exposes/consumption. No third-party clinical-platform plugin mechanism was identified: medical-imaging dependencies do not make the system an OpenMRS/Bahmni plugin.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | Yes | Shell, admin and clinical are identifiable source targets with an explicit intended composition relationship (`pacs-webapp-shell/vite.config.ts:14–20`, `pacs-webapp-admin-portal/webpack.config.js:28–33`, `pacs-webapp-clinical-workspace/config/webpack.config.js:43–49`). The viewer library is not added as a unit. |
| Q2 | Undetermined | Separate manifests/builds exist (`pacs-webapp-shell/package.json:6–10`, `pacs-webapp-admin-portal/package.json:6–9`, `pacs-webapp-clinical-workspace/package.json:7–11`), but entries/templates are absent and CommonJS production configs are in ESM packages. Intended units and route exports exist, but sufficiently demonstrated relatively independent entries/builds as written do not. |
| Q3 | Yes | The shell router reserves studies/admin/viewer under its layout (`pacs-webapp-shell/src/routes/index.tsx:73–118`), and clinical/administration modules define functional routes in the same domain (`pacs-webapp-admin-portal/src/routes/AdminRoutes.tsx:38–56`, `pacs-webapp-clinical-workspace/src/routes/index.tsx:44–64`). This records the explicit intended relationship, without asserting a functional connection. |
| Q4 | Undetermined | Configs and consumers exist, but links do not match: default/named export, moduleName versus scope/module and lazy component versus route functions (`pacs-webapp-shell/src/routes/index.tsx:12`, `:93–115`, `pacs-webapp-shell/src/routes/MicroFrontendLoader.tsx:29–32`, `:53–64`). Build problems and missing entries add to this. There is no basis to confirm actual connection, nor to decide by a new rule that every imperfection makes a case No. |
| Q5 | Undetermined | The set suggests MFE architecture, with implemented UI/configs, but Q2/Q4 remain open because of the links above. There is no Q5 override. |

## Rationale

- Proposed `Uncertain`: no No answer; Q2/Q4/Q5 Undetermined; status `review`. Configuration code is not isolated from consumers, but these do not complete the chain as written.
- It is not MFE-unit: host and both intended remotes are in the snapshot; an inconsistent host is not replaced by a hypothetical functional external host.
- The code-sharing exclusion of 089/100 does not automatically apply: exports are clinical/administration route interfaces, not merely presentation utilities. Nor is the project converted to teaching content merely because history appears as bulk generation: own source/config files exist, unlike 075/081/023.
- Limited authorship was investigated without concluding bulk addition is vendoring. There is no basis for automatically applying the 037 platform-plugin rule or transporting the Bahmni doubt of 102 to this candidate.

## Analysis notes

- **RQ1:** discovery hit only the federation dependency in the shell manifest. Additional configurations and sources reveal incompatible contracts that package search does not distinguish from complete implementation.
- **RQ3:** URLs → shell aliases → loader calls → exposed modules is the chain to check. URLs exist, but loader/props/exports and build entries do not match; viewer producer does not even produce federation. Actual clinical pages do not close these links.
- **Protocol (comparators):** 076/084/096 present host and remotes with a matching consumer; the same conclusion cannot be transferred here through plugin presence. 083 parallels the decision about execution imperfections, but here there are multiple absences and contracts, not merely file case difference. 089/100 discuss code sharing, a different issue. 074/102 require evaluating external-platform provenance/distribution; 080 distinguishes vendored third-party code from own targets. This candidate’s name-status analysis shows bulk import, but identifies no third-party upstream: that distinction was preserved.
- **Protocol (families):** searches for `TheSSSAI` and `DicomFlow` in existing annotations found no sibling. README names/links (`README.md:88–94`) organize folders of the same snapshot; they do not demonstrate third-party clones or external independent repositories. Neither TheSSS.AI nor any upstream was accessed to supply missing evidence.
- **Protocol (branches and execution):** only `main`, `origin/main` and `origin/HEAD`, all at the pinned SHA. No network/submodule access, installation, config execution, build or application. No attempt was made to repair problems to classify another project version. No file outside this draft was changed.

## Recorded decision

Retain **Uncertain**. The snapshot contains specified federation architecture and shell/remote sources, but loading contracts, exports and build entries do not match one another. This evidence does not confirm functional composition, nor does it permit safely determining whether the set is merely scaffold or incomplete implementation.
