---
schema: 1
id: 1178836362
full_name: ramdev90/nx-module-federation
url: https://github.com/ramdev90/nx-module-federation
commit: cf42f3f1506bfe6f25a263d0763cd09cac7e84f7
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
approaches: [module-federation]
ui_technologies: [angular]
build_tools: [webpack]
frontend_units: 4
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 109 — ramdev90/nx-module-federation

## Context

Angular/Nx example with shell and three remote applications, `products`, `orders` and `customer`, integrated through federated routes. The tree also contains initial application `apps/microfrontend-workspace`, without a composition relationship to the four targets: it is inventoried but not added to Q1 units, following precedents 023/028 for targets without composition. Count four does not mean the fifth application lacks observability.

Scaffold and NxWelcome screens predominate, but concrete applications have builds/entries and federation configuration consumed in the router. This differs from generator code or snippets explaining how to generate applications. The demonstrative nature is recorded in `repo_type: example`, without attributing original scaffold authorship to the owner.

## Sample provenance

- Rank 109, ID and strategies `terminology;technology`: `data/samples/mfe-sample-001/sample.csv:110`. Clone, branch `master` and SHA checked in `data/samples/mfe-sample-001/clones.csv:110`. The sample derives from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`).
- `data/discovery/mfe-round-001/candidates.csv:26270` records eligibility `unknown`; `data/discovery/mfe-round-002/candidates.csv:26277`, `pass`. Both have null description, empty topics, TypeScript, null license and `fork: false`.
- `sqlite3 -readonly` query, joining `hits` and `queries` by `query_id` and filtering `repository_id=1178836362`, in databases `data/discovery/mfe-round-001/discovery.sqlite` and `data/discovery/mfe-round-002/discovery.sqlite`: both record the same three hits, endpoint `repositories`, without file paths:
  - `technology-module-federation-repositories`, strategy `technology`, exact query `"module federation" in:name,description,readme`;
  - `terminology-microfrontend-repositories`, strategy `terminology`, exact query `microfrontend in:name,description,readme`;
  - `terminology-microfrontends-repositories`, strategy `terminology`, exact query `microfrontends in:name,description,readme`.
- By field elimination: description and topics do not explain the terms. README has exact title `# MicrofrontendWorkspace` (`README.md:1`), a concatenated form, plus commands with `microfrontend-workspace` (`README.md:14`; `README.md:20`). No literal plural appears in these excerpts. Technology search is compatible with hyphenated words in repository name, but database supplies neither matching field nor normalization. README ends with additions containing NUL characters (`README.md:102–104`), not a clean ASCII phrase “module federation”. These signals are only provenance; name and hits do not confirm architecture.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | Complete inventory through `git ls-tree -r` of the SHA: 103 regular files, all mode 100644; zero symlinks and zero gitlinks. `products/`: 25; `shell/`: 19; `orders/` and `customer/`: 17 each; `apps/`: 14; `.vscode/`: one; ten files at root. No `node_modules`, submodule or vendored framework tree. Git-tree counts, without artificial text lines. | context |
| Structure / Build/deploy | Four application projects with their own `@nx/angular:webpack-browser` builds, distinct output, index, `main` and tsconfig (`shell/project.json:2–26`; `products/project.json:2–26`; `orders/project.json:2–26`; `customer/project.json:2–26`). Indicated entries, HTML, tsconfigs, styles and configs exist. All four `main.ts` files import asynchronous bootstrap (`shell/src/main.ts:1`; `products/src/main.ts:1`; `orders/src/main.ts:1`; `customer/src/main.ts:1`). | strong |
| Configuration (shell) | `shell/module-federation.config.ts:3–17` defines `name: 'shell'` and remotes `['products', 'orders', 'customer']`; default export required by Nx graph at `shell/module-federation.config.ts:20–23`. These are names of projects present in workspace, not documentary references to future remotes. | strong |
| Configuration (remotes) | Each remote exposes key `./Routes` for an actual file: `products/src/app/remote-entry/entry.routes.ts`, `orders/src/app/remote-entry/entry.routes.ts` and `customer/src/app/remote-entry/entry.routes.ts` (`products/module-federation.config.ts:3–7`; `orders/module-federation.config.ts:3–7`; `customer/module-federation.config.ts:3–7`). Federated names match those used by shell. | strong |
| Build/deploy / Composition | Project targets read `customWebpackConfig` from their directories (`shell/project.json:24–25`; `products/project.json:24–25`; `orders/project.json:24–25`; `customer/project.json:24–25`). All four files import local MF configuration and pass it to `withModuleFederation` from `@nx/module-federation/angular` (`shell/webpack.config.ts:1–9`; `products/webpack.config.ts:1–9`; `orders/webpack.config.ts:1–9`; `customer/webpack.config.ts:1–9`). Thus these are not disconnected federation configs unread by build. | strong |
| Source code (consumption/exports) | Shell router uses `import('customer/Routes')`, `import('orders/Routes')` and `import('products/Routes')`, consuming `m.remoteRoutes` in each `loadChildren` (`shell/src/app/app.routes.ts:4–16`). All three exposed files export exactly `remoteRoutes` (`customer/src/app/remote-entry/entry.routes.ts:1–4`; `orders/src/app/remote-entry/entry.routes.ts:1–4`; `products/src/app/remote-entry/entry.routes.ts:1–8`). No remote/key/export name mismatch exists. The contract is an Angular routes list, without props or an additional mount function required by consumer. | strong |
| Source code (integration) | Shell bootstrap starts `App` (`shell/src/bootstrap.ts:1–5`); `appConfig` registers `appRoutes` (`shell/src/app/app.config.ts:5–9`); `App` imports `RouterModule` and points to template (`shell/src/app/app.ts:1–13`), which offers a menu for all three remotes and `router-outlet` (`shell/src/app/app.html:1–7`). A complete consumption chain reaches presentation. | strong |
| Source code (remote entries) | Remote bootstraps start their own `RemoteEntry` (`products/src/bootstrap.ts:1–5`; `orders/src/bootstrap.ts:1–5`; `customer/src/bootstrap.ts:1–5`), existing and exported (`products/src/app/remote-entry/entry.ts:1–9`; `orders/src/app/remote-entry/entry.ts:1–9`; `customer/src/app/remote-entry/entry.ts:1–9`). Products also includes route `list` and component `ProductList`, both existing (`products/src/app/remote-entry/entry.routes.ts:3–8`; `products/src/app/product-list.ts:1–9`; `products/src/app/product-list.html:1–3`). Application routes are the federated object, not merely a shared hook/utility. | strong |
| Configuration / Independence | TypeScript aliases `products/Routes`, `orders/Routes` and `customer/Routes` point to sources for type resolution (`tsconfig.base.json:17–20`). This was checked against Webpack configuration: the same identifiers are MF remotes and imports are federated, with plugin actually connected to builder. One exception exists: `orders` directly imports source component `ProductList` from `products` through a relative path crossing project boundary (`orders/src/app/remote-entry/nx-welcome.ts:3`, used at `:7` and in template at `:512`), and this `NxWelcome` is used by the exposed route component of `orders` (`orders/src/app/remote-entry/entry.ts:2–7`); search for `../../../` in `.ts` finds only this line. Outside this pair, shell uses only federated specifiers and no other relative imports cross applications. A typing path is not confused with direct import of another unit’s sources. | ambiguous |
| Build/deploy (development) | Shell uses executor `@nx/angular:module-federation-dev-server`, port 4200 (`shell/project.json:58–73`). Remotes use their own builds and ports 4201/4202/4203 (`products/project.json:58–74`; `orders/project.json:58–74`; `customer/project.json:58–74`), plus `serve-static` targets per unit (`products/project.json:85–100`; `orders/project.json:85–100`; `customer/project.json:85–100`). `dependsOn: shell:serve` orchestrates development; it is not a source import and does not eliminate separate builds. | strong |
| Technology / Resolution | Angular, Nx and MF are declared (`package.json:8–32`). Lockfile resolves Nx Angular/MF/Webpack 22.5.4 (`package-lock.json:7380–7385`; `package-lock.json:7612–7617`; `package-lock.json:8159–8164`), Angular builder 21.1.5 (`package-lock.json:294–299`), MF enhanced 0.21.6 (`package-lock.json:6240–6245`), Webpack 5.105.4 (`package-lock.json:21934–21939`) and TypeScript 5.9.3 (`package-lock.json:21638–21643`). Recorded peers: Nx Angular accepts Angular builders `>=19 <22`; Angular builder accepts TypeScript `>=5.9 <6`; enhanced accepts Webpack 5. Configs and versions are statically consistent; no build/server was run. | moderate |
| Configuration / Limits | Production targets point to configs also applying `withModuleFederation` and preserving configuration (`shell/project.json:42–45`; `shell/webpack.prod.config.ts:9–24`; `products/webpack.prod.config.ts:9–24`; `orders/webpack.prod.config.ts:9–24`; `customer/webpack.prod.config.ts:9–24`). Actual deployment URLs are not supplied: production overrides are comments. Classification relies on workspace composition, without asserting published deployment. | context |
| Structure / Composition (excluded target) | Initial project `microfrontend-workspace` has its own conventional build/entry (`apps/microfrontend-workspace/project.json:2–23`), empty routes (`apps/microfrontend-workspace/src/app/app.routes.ts:1–3`) and NxWelcome template (`apps/microfrontend-workspace/src/app/app.html:1–2`). It is neither shell remote nor remote consumer. It was inventoried as a nonparticipating application, without increasing composition `frontend_units`. `products/my-component.ts:1–9` is also an isolated component, not another application. | context |
| Technology / Composition / Documentation | Text search at the SHA, excluding `package-lock.json`, for `single-spa`, `registerApplication`, `qiankun`, `wujie`, `customElements`, `postMessage`, `iframe` and `importmap`: no results. Filename/document inventory: only README, without ADR or additional architecture documentation. README is Nx scaffold with commands for the initial project (`README.md:5–29`), insufficient alone for the federated chain observed in other files. | absent |

## Authorship and history

Metadata at the SHA: four reachable commits, zero merges, one root commit `a6a38c9e98f344e9694af343f80624bc8ce79738`, non-shallow clone. All record author/committer `ramdev90`, between 10/03/2026 and 11/03/2026. The only refs are `master`, `origin/master` and `origin/HEAD`, at the evaluated SHA. No other-branch content or historical blob was used.

`git log --no-renames --name-status` for `apps/`, `shell/`, `products/`, `orders/` and `customer/`, always with `GIT_NO_LAZY_FETCH=1`: root commit adds initial Nx application; HEAD `cf42f3f1506bfe6f25a263d0763cd09cac7e84f7` bulk-adds all four federated trees and extra products components. No object was missing in these queries. Generic “initial commit” names and Git identity demonstrate neither manual writing nor original authorship of each file.

README presents workspace as Nx-generated and guides use of its generators (`README.md:5–7`; `README.md:33–48`); commented configs and NxWelcome screens are consistent with tool scaffold. That scaffold is not intellectually attributed to the owner. At the same time, generated applications are already materialized in the snapshot, with configured and consumed composition, not merely a generator, textual template or vendored Nx distribution. Exact executed command sequence is not inferred from commits.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | Yes | Shell and three concrete remotes, explicitly linked by `remotes` (`shell/module-federation.config.ts:3–17`) and respective `exposes` configurations (`products/module-federation.config.ts:3–7`; `orders/module-federation.config.ts:3–7`; `customer/module-federation.config.ts:3–7`). Initial application without composition is not added. |
| Q2 | Yes | Each unit has its own entry and build (`shell/project.json:9–26`; `products/project.json:9–26`; `orders/project.json:9–26`; `customer/project.json:9–26`), and shell imports federated interfaces (`shell/src/app/app.routes.ts:4–16`). Yes for shell, `customer` and `products`, without cross-imports. Exception: `orders` directly imports source component `ProductList` from `products` (`orders/src/app/remote-entry/nx-welcome.ts:3`, `:7`, `:512`), lateral coupling between two remotes in a welcome component, not participating in Module Federation composition. TypeScript paths were considered together with MF build hooks, not alone. |
| Q3 | Yes | Shell registers router and presents remotes under routes/menu of the same application (`shell/src/app/app.config.ts:5–9`; `shell/src/app/app.routes.ts:4–16`; `shell/src/app/app.html:1–7`). |
| Q4 | Yes | Connected chain: project target → Webpack config → `withModuleFederation` → remotes/exposes → `*/Routes` import → existing `remoteRoutes` export → router-outlet. This is neither a dependency nor unused configuration (`shell/project.json:24–25`; `shell/webpack.config.ts:1–9`; `shell/src/app/app.routes.ts:4–16`; `products/src/app/remote-entry/entry.routes.ts:1–8`). |
| Q5 | Yes | Q1–Q4 converge on an example with relatively independent host and remotes. Scaffold origin does not invalidate actually materialized and consumed composition. |

## Rationale

- `MFE-implemented`: four units with entries/builds, MF integration configured on both sides and verified route consumption. `repo_type: example` records predominantly demonstrative content; `build_tools: [webpack]` follows from explicit hooks, not inference about Angular CLI.
- Q1 counts units present and referenced by composition, not names, packages or components. Q2 literally applies own entry/build and absence of direct import between unit sources; exception `orders` → `products` was recorded, and class remains because host ↔ remotes composition through Module Federation is complete and set shell, `customer` and `products` satisfies Q1 to Q4 without cross-imports (same logic as 008, where a partial gap did not affect result); typing aliases accompany actual federation in hooks. Q4 relies on `loadChildren` consumption with matching exports and destinations.
- Unlike 097/103/104, builder reads configuration and the chain to consumer is present. The exposed object is an application route with components, bootstraps and own build; not merely code sharing at the boundary discussed in 089/100. Organization is comparable to complete examples 076/084/096/106 and final 007.
- Nx framework is not analyzed as an own unit, nor is generated-code authorship attributed to the owner. The distinction of 074/102/080 for third-party platform/code does not eliminate scaffold applications materialized by the project. Nor is snapshot confused with a generator whose product does not yet exist, as in cases 075/081/105.
- `frontend_units: 4` follows precedents 023/028: the fifth inventoried application does not participate in composition; NxWelcome components and screens are not additional targets. That conventional application’s presence does not undo the other four’s host/remotes chain.
- Absence of actual deployment or production domain does not require reinterpreting Q2 as requiring independent publication. No concrete name/export/entry defect was detected requiring judgment about an unconnectable chain. No decision remains open about links, iframes or composition only at build time.

## Analysis notes

- **RQ1 (families):** searching for `ramdev90`, `nx-module-federation`, `withModuleFederation` and `remoteRoutes` in available annotations found no same-owner sibling or other case with the same complete Nx pattern; partial results in other wrappers/configs do not prove common origin. Scaffold pattern is explicit without promoting Git authorship to manual authorship.
- **RQ3:** decisive connections are project names → remotes → `./Routes` exposes → `remoteRoutes` export → shell `loadChildren`. The `customWebpackConfig` link closes the connection between declared configuration and build; TypeScript paths alone would not.
- **Protocol:** singular/plural queries and technology phrase were preserved. Concatenated README and NUL excerpts limit exact attribution of hits to text; this does not affect architectural evidence independent of search mechanism.

- **Alternative not adopted (independent review):** apply literal Q2 criterion to the entire set and record Q2 Undetermined, with Q5 justification, `Uncertain` and `review`. This was not adopted because observed composition does not depend on the cross-import and Q1 requires only two units. Precedent 042 (Q2 No for direct `src/` import) differs because source import was the integration itself there and Module Federation was absent.
- **RQ1/RQ3:** a lateral import between remotes is a coupling signal that Module Federation search does not reveal.
