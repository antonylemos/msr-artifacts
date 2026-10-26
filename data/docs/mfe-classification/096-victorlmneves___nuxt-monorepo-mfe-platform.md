---
schema: 1
id: 1253620135
full_name: victorlmneves/_nuxt-monorepo-mfe-platform
url: https://github.com/victorlmneves/_nuxt-monorepo-mfe-platform
commit: 84ffc2429b311b3c7565ffd35de4de48dafd5929
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
approaches: [module-federation]
ui_technologies: [vue, nuxt]
build_tools: [webpack]
frontend_units: 5
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 096 — victorlmneves/_nuxt-monorepo-mfe-platform

## Context

Demonstration platform with a Nuxt 3 shell and four remotes: checkout/admin in Vue 2 and profile/dashboard in Vue 3. Each remote has UI and mounting code, not merely configuration or displayed code examples. The shell resolves a route in the registry, injects the corresponding remoteEntry, obtains the exposed module and mounts the application in its page element. Registry and consumer are implemented in `packages/shared/src/registry.ts:12–61`, `apps/shell/pages/app/[...mfe].vue:29–55` and `apps/shell/composables/useMfeLoader.ts:13–49`.

The exact clone and filename contain **three underscores** after `victorlmneves`: `victorlmneves___nuxt-monorepo-mfe-platform`. The SHA matches `data/samples/mfe-sample-001/clones.csv:97`. The complete inventory through `git ls-tree -r 84ffc2429b311b3c7565ffd35de4de48dafd5929` contains **59 regular files** (mode `100644`), **zero symlinks** and **zero gitlinks**. There is no versioned `node_modules/`. The five own targets are under `apps/`; `packages/shared` provides registry, types and authentication events and is not a sixth frontend unit. No submodule was accessed.

## Sample provenance

- `data/samples/mfe-sample-001/sample.csv:97` records rank 96, id 1253620135, `strategies: terminology;technology` and eligibility `pass`. The origin round is `data/discovery/mfe-round-002` (`data/samples/mfe-sample-001/manifest.json:2–5`).
- `data/discovery/mfe-round-002/candidates.csv:30920` records the same strategies, null description, empty topics, Vue language, null license, default branch `main`, creation on 2026-05-29 and last push on 2026-08-12. These metadata do not classify the snapshot.
- Read-only query with `sqlite3 -readonly` against `data/discovery/mfe-round-002/discovery.sqlite`, joining `hits` and `queries` through `query_id` and filtering `hits.repository_id = 1253620135`: three endpoint `repositories` hits, with empty `path`, for queries `terminology-micro-frontend-repositories`, `terminology-micro-frontends-repositories` and `technology-module-federation-repositories`. Their texts search respectively `"micro frontend"`, `"micro frontends"` and `"module federation"` in `name,description,readme`.
- **Field elimination:** the name contains `mfe`, but not the complete expressions in these queries; description and topics are empty. The README contains micro-frontend and Module Federation (`README.md:3–5`, `:44–46`). This is the observed compatible thematic field, without asserting which indexed version or line GitHub used. The name is not architecture evidence.
- There is also an endpoint `code` hit for `technology-module-federation-plugin-ts-code`, query `ModuleFederationPlugin remotes extension:ts`, path `apps/shell/nuxt.config.ts`. In the snapshot, terms appear in **comments** in `apps/shell/nuxt.config.ts:64–66`, explaining absence of the plugin in the shell and runtime loading use. This hit does not prove plugin configuration in this file; actual evidence is in the four remotes and consumer loader.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure / Configuration | The registry defines four descriptors with route, URL, container name and `./App`: checkout (`packages/shared/src/registry.ts:14–23`), admin (`:26–35`), profile (`:38–47`) and dashboard (`:50–59`). Local URLs point to ports 3001–3004 and end in `remoteEntry.js` (`:5–9`). These values match producers present in the monorepo. | strong |
| Configuration (Vue 2) | `apps/mfe-vue2-checkout/webpack.config.js:66–73` configures `mfe_checkout` and exposes `./App` → `./src/bootstrap.js`; `apps/mfe-vue2-admin/webpack.config.js:64–71` does the same for `mfe_admin`. Dev servers use ports 3001 and 3002 (`apps/mfe-vue2-checkout/webpack.config.js:76–79`, `apps/mfe-vue2-admin/webpack.config.js:74–77`). | strong |
| Configuration (Vue 3) | `apps/mfe-vue3-profile/webpack.config.js:53–61` and `apps/mfe-vue3-dashboard/webpack.config.js:53–61` configure `mfe_profile`/`mfe_dashboard`, `remoteEntry.js` and `./App` → their own bootstrap. Ports are 3003 and 3004 (`apps/mfe-vue3-profile/webpack.config.js:64–67`, `apps/mfe-vue3-dashboard/webpack.config.js:64–67`). | strong |
| Source code (container consumption) | The loader injects the descriptor script, queries `window[remoteName]`, executes `container.init({})`, obtains `container.get(exposedModule)` and resolves the module with `factory()` (`apps/shell/composables/useMfeLoader.ts:13–49`). `:52–64` implements DOM injection. `:71–91` calls mounting/unmounting methods. There is a concrete consumer of the federation mechanism, even without a shell plugin. | strong |
| Composition (host page) | `apps/shell/pages/app/[...mfe].vue:23–24` provides the mount point; `:30–42` imports registry/loader and resolves the route; `:44–55` mounts and unmounts the selected unit, passing user and logout callback. The shell maintains the header (`:2–3`). It does more than offer links to independent applications. | strong |
| Source code (Vue 2 mounting) | Checkout exports `mount`, creates its Vue instance, renders local App and performs `$mount(el)` (`apps/mfe-vue2-checkout/src/bootstrap.js:32–46`); it cleans up instance/subscriptions and exports the contract (`:49–55`). Admin does the equivalent (`apps/mfe-vue2-admin/src/bootstrap.js:24–47`). Checkout and administration UIs exist in `apps/mfe-vue2-checkout/src/App.vue:1–15` and `apps/mfe-vue2-admin/src/App.vue:1–15`. | strong |
| Source code (Vue 3 mounting) | Profile creates its own App and mounts in the received element (`apps/mfe-vue3-profile/src/bootstrap.js:28–40`), with cleanup/export in `:43–49`. Dashboard implements the same contract (`apps/mfe-vue3-dashboard/src/bootstrap.js:26–42`). Their UIs are observable in `apps/mfe-vue3-profile/src/App.vue:1–13` and `apps/mfe-vue3-dashboard/src/App.vue:1–12`. Therefore this is not merely function sharing or a utility component. | strong |
| Build/deploy | The shell has its own Nuxt build (`apps/shell/package.json:5–8`). Each remote uses its Webpack file in dev/build scripts: `apps/mfe-vue2-checkout/package.json:5–8`, `apps/mfe-vue2-admin/package.json:5–8`, `apps/mfe-vue3-profile/package.json:5–8`, `apps/mfe-vue3-dashboard/package.json:5–8`. Outputs are each project’s `dist` (`apps/mfe-vue2-checkout/webpack.config.js:9–15`, `apps/mfe-vue3-profile/webpack.config.js:8–14`). The root allows serving each dist separately (`package.json:26–30`), and the server provides files with CORS (`scripts/dev-remote-server.js:32–51`). | strong |
| Source code / Configuration (shared contract) | `packages/shared/src/types/index.ts:24–33` defines `RemoteMount` and props. Shared aliases point to local types/auth (`scripts/webpack.aliases.js:7–17`), not other application code. The package exports only shared entry, auth and types (`packages/shared/package.json:5–10`). State is communicated through explicit events (`packages/shared/src/auth/index.ts:10–22`, `:28–40`), received by remote bootstraps. This complements runtime composition, rather than replacing it with build-time integration. | moderate |
| Technology / Configuration | Vue is used in bootstraps and Nuxt provides the shell (`apps/shell/app.vue:1–4`, `apps/shell/package.json:16–19`). Webpack has explicit configuration and ModuleFederationPlugin instances in all four remotes. `apps/shell/nuxt.config.ts:64–66` documents that the shell does not use the plugin; its bundler is not inferred from dependencies. `ui_technologies: [vue, nuxt]` and `build_tools: [webpack]` are recorded, the latter based on remotes. | moderate |
| Architecture documentation | The README describes shell and remotes (`README.md:9–35`), framework isolation (`:42–46`), authentication events (`:52–58`) and mounting contract (`:60–62`). Singleton/sharing claims must be read together with the loader: it initializes containers with an empty scope, without a shell federation plugin (`apps/shell/composables/useMfeLoader.ts:28–32`). Actual sharing of the shell’s Vue instance with remotes is not asserted. | context |
| Structure / Source code (negative searches) | The inventory was searched for ADRs, additional architecture documents, vendored dependencies and gitlinks: none found; architecture is in the README. All commit texts, excluding `pnpm-lock.yaml`, were searched for `iframe`, `postMessage`, `single-spa`, `registerApplication` and direct `mfe-vue*` source imports: no results. Observed remote access uses descriptors/containers, not another application’s source imports. | absent |

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | Yes | Five own units: shell plus four concrete remotes. The registry names four containers (`packages/shared/src/registry.ts:12–61`), and all four configurations expose them (`apps/mfe-vue2-checkout/webpack.config.js:66–73`, `apps/mfe-vue2-admin/webpack.config.js:64–71`, `apps/mfe-vue3-profile/webpack.config.js:53–61`, `apps/mfe-vue3-dashboard/webpack.config.js:53–61`). |
| Q2 | Yes | Shell and four remotes have their own builds (`apps/shell/package.json:5–8` and the remotes’ four `package.json:5–8`). The host consumes URLs/containers (`apps/shell/composables/useMfeLoader.ts:18–40`), without importing remote sources. `packages/shared` contains common contract and utilities, not merged application entries. |
| Q3 | Yes | The host page resolves the descriptor by route and mounts the unit in its DOM under a common header (`apps/shell/pages/app/[...mfe].vue:2–24`, `:39–55`). All four units participate in the application orchestrated by the shell. |
| Q4 | Yes | Chain configured and used in code: registry → URL/remoteName → script/container/init/get → mount → Vue App. Consumer in `apps/shell/composables/useMfeLoader.ts:13–49`, `:71–91`; actual UI mounting in Vue 2 (`apps/mfe-vue2-checkout/src/bootstrap.js:32–46`) and Vue 3 (`apps/mfe-vue3-profile/src/bootstrap.js:28–40`) bootstraps. It does not depend on inference from a dependency or search hit. |
| Q5 | Yes | Host and four relatively independent units, compatible producers and consumer, and UI mounting in the shell. The chain satisfies Q1–Q4; it fits the monorepo case of implemented host + remotes, like 076/084. |

## Rationale

- Proposed `MFE-implemented`, with Q1–Q5 Yes: monorepo with host and four remotes connected by Module Federation and mounting contract. Static inspection verifies integration calls; it does not assert successful environment execution.
- It is not MFE-unit, because the host is present and consumes remotes. It is not merely code sharing: the exposed module mounts applications with their own UI, unlike the doubt recorded in 089. It is not link/iframe composition: internal links select a route whose page loads and mounts the remote in the DOM.
- `repo_type: example` records the extensible demonstration platform, with instructions for copying a remote and replacing authentication (`README.md:107–133`). The shared package is not counted as a unit, nor does it turn composition into a build-time-only solution.

## Analysis notes

- **RQ1:** the code hit in `apps/shell/nuxt.config.ts:64–66` is an example of a textual result in a comment. Architecture confirmation comes from the relationship between producer configuration, registry, loader and mounting, not search or name.
- **RQ2:** approach `module-federation`, with a host implementing the script/init/get container consumption protocol without its own federation plugin. Script injection is transport for the federation remoteEntry; an independent runtime-script approach is not recorded separately.
- **Protocol (families/templates):** `README.md:5` attributes the base to `victorlmneves/nuxt-mf-monorepo`, and `README.md:109–113` teaches copying remotes. `victorlmneves`, `nuxt-monorepo`, `nuxt-mf-monorepo` and `nuxt` were searched in existing annotations, without an annotated sibling. Declared origin was recorded without accessing another repository/network or assuming snapshot equivalence. 076/084 are complete-composition precedents, not demonstrated affiliation.
- **History:** non-shallow clone; `git rev-list --count` from the SHA returns **4 commits**, `--count --merges` returns **0**, and `--max-parents=0` returns **one root commit**, `da1cfb09c4aa461c79d6b297feb8e70051a980d3`. All are dated 2026-05-29: root “first commit”, `74f5247` “Initial commit”, `8606169` “Add apps folder and its contents” and the evaluated SHA “Fix: add apps/ and all subfolders as regular files (remove submodule)”. Trees checked with `git ls-tree -r`: root has 1 regular file; `74f5247`, 18; `8606169`, 18 regular files and an `apps` gitlink to `cb1c03abe02b536d52cdc5aa31d29c616a8558ce`; the evaluated snapshot has 59 regular files and no gitlink. The old gitlink was not entered and its objects were not fetched.
- **Protocol (branches):** `main`, `origin/main` and `origin/HEAD` point to the pinned SHA. There are also references `origin/feature/mfe-auth` and five Dependabot branches (apps/shell/webpack, nuxt, nuxt/webpack-builder, postcss and webpack-dev-server). Only references were recorded, without using another branch’s content to complete or correct the snapshot.
- **Checklist (limitations):** no network, installation, build, test or application executed. The README includes illustrative authentication instructions; they were not taken as current login validation. No open decision necessary to recognize the composition chain in evaluated code was identified.
- **Deployment (limitation, without effect on Q4):** all four remotes fix `output.publicPath` at `http://localhost:300x/` (checkout and admin in `webpack.config.js:14`; profile and dashboard in `:13`). The registry allows changing the `remoteEntry.js` URL through an environment variable (`packages/shared/src/registry.ts:5–9`), but chunks would still be requested from localhost. This is a deployment limitation, not a composition-chain limitation.
- **Shell build:** `@nuxt/webpack-builder` appears only as devDependency (`apps/shell/package.json:22`) and `nuxt.config.ts` does not select `builder: 'webpack'`; the shell uses Nuxt’s encapsulated default bundler and this dependency was not counted in `build_tools`. `[webpack]` comes from the remotes’ four explicit `webpack.config.js` files.
- **Discovery:** round 001 records the same four hits as round 002 (code query `ModuleFederationPlugin remotes extension:ts` in `apps/shell/nuxt.config.ts`, plus technology and terminology repository queries).
