---
schema: 1
id: 124905930
full_name: scality/metalk8s
url: https://github.com/scality/metalk8s
commit: f19004e899c78360d3a43d5f60047b140f29c909
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: production
approaches: [module-federation]
ui_technologies: [react]
build_tools: [rspack]
frontend_units: 2
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 272 — scality/metalk8s

## Context

MetalK8s is Scality’s on-prem Kubernetes distribution (repository description: “An opinionated Kubernetes distribution with a focus on long-term on-prem deployments”). Besides Salt, charts, operators and buildchain, the repository contains two frontend applications composed through Module Federation:
- `shell-ui`: the shell (navbar, authentication, alerts), discovering deployed UIs and mounting each by route;
- `ui`: the “MetalK8s Platform UI”, a remote with `platform` and `alerts` views.

Both have their own images and deployment resources (`ScalityUI` for the shell, `ScalityUIComponent` + `ScalityUIComponentExposer` for the UI). The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:273` records rank 272, ID 124905930, status `cloned`, branch `development/134.0` (the default) and the front matter commit, which is the HEAD of the clone and of `origin/development/134.0`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. There was no installation, build, execution or network access.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:273` records strategy `technology` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID appears in `data/discovery/mfe-round-001/candidates.csv:262` (`technology`, `unknown`) and `data/discovery/mfe-round-002/candidates.csv:262` (`technology`, `pass`).

A `sqlite3 -readonly` query against tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns the same three hits in each round, from endpoint `code`:

| Query (`q`) | Subquery | `path` | Collection 001 / 002 (UTC) |
|---|---|---|---|
| `technology-module-federation-package-code`: `"@module-federation" filename:package.json` | `…#size:2250..2499` | `shell-ui/package.json` | 2026-10-07T20:00:02.514Z / 2026-10-08T15:43:06.180Z |
| same | `…#size:4000..5999` | `ui/package.json` | 2026-10-07T20:52:26.866Z / 2026-10-08T15:44:06.777Z |
| `technology-module-federation-plugin-ts-code`: `ModuleFederationPlugin remotes extension:ts` | `…#size:6000..9999` | `ui/rspack.config.ts` | 2026-10-07T22:40:28.914Z / 2026-10-08T16:19:36.642Z |

Code hit metadata records only description and `fork: false`.

Matches at the SHA:
- `shell-ui/package.json` (2.312 bytes) declares `@module-federation/enhanced` (`:20`);
- `ui/package.json` (5.342 bytes) matches the size range;
- `ui/rspack.config.ts` (6.436 bytes) contains `ModuleFederationPlugin` (`:5`, `:118`) and `remotes` (`:128–132`).

Both `package.json` were last changed in `5e3e25294` (2026-09-10) and `rspack.config.ts` in `828adbb88` (2026-04-10), before collections. The match does not depend on the README, which mentions neither Module Federation nor micro-frontends (search for `micro`, `federation`, `shell` and `ui` finds only documentation links and `shell` blocks).

**Snapshot after searches:** the SHA is a merge from 2026-10-08T21:10:51Z, after both collections, but does not change matched files.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 3.086 entries, comprising 3.040 regular files `100644`, 45 executables `100755`, 1 symlink `120000` (`tests/versions.py` → `../buildchain/buildchain/versions.py`) and zero gitlinks. Frontend is in `shell-ui/` (98 entries) and `ui/` (611); the rest is infrastructure (`charts/`, `salt/`, `operator/`, `storage-operator/`, `buildchain/`, `docs/`, `tests/`). `ui/@mf-types/` versions 375 shell-generated type files (330 under `node_modules/`), which are not a unit. | context |
| Configuration (remote) | `ui/rspack.config.ts:32–34`: entry point `metalk8s_ui`; `:118–127`: `ModuleFederationPlugin({ name: 'metalk8s', filename: \`static/js/remoteEntry.${version}.js\`, exposes: { './FederableApp', './platformLibrary', './AlertsNavbarUpdater', './Metalk8sLocalVolumeProvider', './PlatformGlobalHealthBarFederated' } })`; `:128–132`: `remotes: { shell }` only in development; `:133–150`: singleton `shared`; `:171–206`: `MicroAppRuntimeConfigurationPlugin`. | strong |
| Configuration (remote contract) | `ui/public/.well-known/micro-app-configuration:1–49`: `MicroAppConfiguration` with `remoteEntryPath: /mf-manifest.json`, views `platform` (`/`) and `alerts` (`/alerts`) pointing to `./FederableApp` in scope `metalk8s`, hook `./platformLibrary` and `navbarUpdaterComponents` `./AlertsNavbarUpdater`. | strong |
| Configuration (shell) | `shell-ui/rspack.config.ts:46`: entry point `./src/index.tsx`; `:130–144`: `ModuleFederationPlugin({ name: 'shell', exposes: { './App', './lang', './auth/AuthProvider', './alerts/…', './navbar/navbarHooks', './moduleFederation/…', './useNotificationCenter' } })`; `:145–207`: eager singleton `shared`. `shell-ui/public/config.json:2–15`: navbar with views `platform` and `alerts` of kind `metalk8s-ui` and `discoveryUrl: /shell/deployed-ui-apps.json`. | strong |
| Source code (composition) | `shell-ui/src/index.tsx:1–8` → `shell-ui/src/FederatedApp.tsx`. `shell-ui/src/initFederation/UIListProvider.tsx:66–79` fetches the deployed UI list from `discoveryURL`. `FederatedApp.tsx:57–95` (`FederatedRoute`) mounts `FederatedComponent` with `url=${app.url}${remoteEntryPath}?version=…`, `module` and `scope` from micro-app configuration. `:97–136` (`InternalRouter`) generates one route per federated view. | strong |
| Source code (remote side) | `ui/src/FederableApp.tsx:120–122`: `export default function FederableApp(props: FederatedAppProps)`, wrapping the app in `ShellHooksProvider` with `shellHooks`/`shellAlerts` received from the shell. The platform Redux/Saga app is in `ui/src/containers/App`. | strong |
| Source code (boundaries) | Active relative import search crossing `ui/` and `shell-ui/` (`../shell-ui`, `../ui/`, `../../shell-ui`): no occurrences outside `@mf-types`. The UI’s only shell reference is a generated type: `ui/src/FederableApp.tsx:21` imports `FederatedAppProps` from `../@mf-types/shell/App` (type copy in `ui/@mf-types`, generated by MF), not from `shell-ui/src`. Search for `'shell/` in `ui/src` finds no federated module imports; shell integration is through props and `@scality/module-federation`. | context |
| Build/deploy | Own builds (`shell-ui/package.json:8–9`; `ui/package.json:38–39`) and separate images: `buildchain/buildchain/image.py:418–419` (`shell-ui/Dockerfile`), `images/metalk8s-ui/Dockerfile`. `salt/metalk8s/addons/shell-ui/deployed/ui-operator-cr.sls:15–50`: resource `ScalityUI` `shell-ui-cp` with shell image and navbar with `platform`/`alerts` views from `metalk8s-ui`. `salt/metalk8s/addons/ui/deployed/ui-operator-cr.sls:15–74`: `ScalityUIComponent` `metalk8s-ui` (own image, mounted at `.well-known`) and `ScalityUIComponentExposer` connecting it to `ScalityUI` `shell-ui-cp`. | strong |
| Technology | `@scality/module-federation` 1.6.1 in both packages (`shell-ui/package.json:52`; `ui/package.json:11`): same-organization library for `FederatedComponent`, micro-app configuration and shell hooks. | moderate |

## Authorship and history

Non-shallow and partial clone (`blob:none`). There are 12.526 commits reachable from the SHA (15.242 across all refs), 5.150 merges, by 83 identities. Main ones are merge bot `bert-e <wall_e@scality.com>` (4.415) and developers with `@scality.com` email, for example Teddy Andrieux (1.762), YanJin (1.030), Alexandre Allard (685) and Guillaume Demonet (662). The root is `d77803a49` (2019-02-05, Nicolas Trangez). By path: `ui/` has 2.219 commits and `shell-ui/` 558; the shell appears in `f28782afa` (2021-02-24, “solutions-navbar: Rename to shell-ui”). There are 719 remote refs; only the default branch SHA was considered.

`git rev-list --objects $SHA --missing=print` lists 24.620 missing objects, none in the SHA tree (comparison between tree objects and the missing list: zero in common). No historical blob was read.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | Yes | Two own units: `shell-ui` and `ui` (MetalK8s Platform UI), with their own entry points (`shell-ui/rspack.config.ts:46`; `ui/rspack.config.ts:32–34`). |
| Q2 | Yes | Separate builds, images and deployment resources (`shell-ui/package.json:8–9`; `ui/package.json:38–39`; both `ui-operator-cr.sls`). No source code import between units; the UI uses only generated types in `ui/@mf-types` (`ui/src/FederableApp.tsx:21`). |
| Q3 | Yes | The shell discovers deployed UIs and routes federated views (`UIListProvider.tsx:66–79`; `FederatedApp.tsx:57–136`). In deployment, `ScalityUIComponentExposer` connects `metalk8s-ui` to the shell `ScalityUI` (`salt/metalk8s/addons/ui/deployed/ui-operator-cr.sls:52–74`). |
| Q4 | Yes | Module Federation configured on both sides and connected. Modules `./FederableApp` and `./AlertsNavbarUpdater` and scope `metalk8s` of `micro-app-configuration` match `exposes` and `name` in `ui/rspack.config.ts:119–126`. The shell loads `remoteEntryPath` through `FederatedComponent` (`FederatedApp.tsx:85–94`). |
| Q5 | Yes | Q1–Q4 converge. |

## Rationale

- `MFE-implemented`: Q1–Q5 Yes. It matches “monorepos containing a host and its remotes”, with runtime composition through deployed UI discovery.
- Complete chain as in 076/084/096/106/109, here at production level: version in the `remoteEntry` name, micro-app configuration in `.well-known`, discovery and Kubernetes UI operator.
- This is not a third-party platform plugin (037, 258): shell, remote and library `@scality/module-federation` belong to the same organization, and the shell is part of the product.
- This is not code sharing (089/100): the remote provides complete views (`platform`, `alerts`) mounted by route.
- The UI’s development-only `remotes: shell` (`ui/rspack.config.ts:128–132`) does not change the analysis.
- `frontend_units: 2` (vendored types in `@mf-types` and the CRD generator client in `tools/` are not units), `unit_organization: monorepo`, `ui_technologies: [react]`, `build_tools: [rspack]`, `approaches: [module-federation]`, `repo_type: production`.
- There is no open decision.

## Analysis notes

- **RQ2:** Module Federation (`@module-federation/enhanced/rspack`) over a custom micro-app layer (`@scality/module-federation`). The remote publishes `micro-app-configuration` (build) and `runtime-app-configuration` (execution) in `.well-known`. The shell performs discovery in `deployed-ui-apps.json` and mounts federated views and “navbar updaters”.
- **RQ3:** composition also declared in infrastructure: CRDs `ScalityUI`, `ScalityUIComponent` and `ScalityUIComponentExposer`, applied through Salt, connect unit images in the cluster.
- **RQ1:** versioned shell-generated types in `ui/@mf-types/` (with `node_modules` copies) appear as dozens of `package.json` in the inventory and can inflate automatic unit counts.
- **Protocol (snapshot):** the cloned SHA (merge from 2026-10-08T21:10:51Z) postdates collections, without changes to matched files.
