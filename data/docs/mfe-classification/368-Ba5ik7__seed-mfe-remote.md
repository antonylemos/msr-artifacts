---
schema: 1
id: 969679126
full_name: Ba5ik7/seed-mfe-remote
url: https://github.com/Ba5ik7/seed-mfe-remote
commit: 3565dd875bd5bd89f14f88b1325e00aeb11cdf96
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: template
approaches: [module-federation]
ui_technologies: [angular]
build_tools: [webpack]
frontend_units: 2
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 368 — Ba5ik7/seed-mfe-remote

## Context

Angular CLI 19 workspace with two projects:
- `seed-mfe-remote`: a Module Federation remote (`@angular-architects/module-federation` + `ngx-build-plus`) exposing a `RemoteWidget` component;
- `demo`: a host loading this component in two ways, mounted in a `ViewContainerRef` and through a `remote` route.

Content is minimal (“Remote Widget LOADED!!!!”). The set serves as a remote seed accompanied by a demonstration host. The README is standard Angular CLI generated text, with the port adjusted to 4202 (`README.md:1–3`, `:13`). The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:369` records rank 368, ID 969679126, status `cloned`, branch `main` and the front matter commit, which is the HEAD of the clone and of `origin/main`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. There was no installation, build, execution or network access.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:369` records strategy `technology` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID appears in `data/discovery/mfe-round-001/candidates.csv:13189` (`technology`, `unknown`) and `data/discovery/mfe-round-002/candidates.csv:13194` (`technology`, `pass`).

A `sqlite3 -readonly` query against tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns the same two hits in each round, both from endpoint `code`:

| Query (`q`) | Subquery | `path` | Collection 001 / 002 (UTC) |
|---|---|---|---|
| `technology-angular-module-federation-package-code`: `"@angular-architects/module-federation" filename:package.json` | `…#size:1150..1299` | `package.json` | 2026-10-07T22:09:45.284Z / 2026-10-08T15:52:53.240Z |
| `technology-module-federation-plugin-js-code`: `ModuleFederationPlugin remotes extension:js` | `…#size:300..399` | `projects/demo/webpack.config.js` | 2026-10-07T22:21:49.595Z / 2026-10-08T16:04:25.151Z |

Code hit and `candidates.csv` metadata record only a null description and `fork: false`.

Matches at the SHA:
- **`package.json`** (1.236 bytes, within range): `"@angular-architects/module-federation": "^19.0.3"` in `package.json:14`.
- **`projects/demo/webpack.config.js`** (345 bytes, within range): `withModuleFederationPlugin` in `:1` and `:3`, and `remotes` in `:5–7`.
  - Term `ModuleFederationPlugin` appears only as part of `withModuleFederationPlugin`.
  - Matching depends on GitHub code search tokenization, which is not recorded.

The hit does not depend on the README, which mentions neither micro-frontends nor federation. Both files were last changed at the SHA (2025-04-20), before the October 2026 collections.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 35 entries, all regular files `100644`; zero symlinks and zero gitlinks. Root with `angular.json`, `package.json`, `tsconfig.json` and `.vscode/`; `projects/demo/` and `projects/seed-mfe-remote/` with `src/main.ts`, `src/bootstrap.ts`, `index.html` and `webpack.config.js`/`webpack.prod.config.js`. | strong |
| Configuration (remote) | `projects/seed-mfe-remote/webpack.config.js:3–14`: `withModuleFederationPlugin({ name: 'seedMfeRemote', exposes: { './RemoteWidget': './projects/seed-mfe-remote/src/app/remote-widget/remote-widget.component.ts' }, shared: shareAll(singleton, strictVersion) })`. | strong |
| Configuration (host) | `projects/demo/webpack.config.js:3–12`: `remotes: { "seedMfeRemote": "http://localhost:4202/remoteEntry.js" }` and `shareAll`. | strong |
| Source code (composition) | `projects/demo/src/app/app.component.ts:24–36`: `loadRemoteModule({ type: 'module', remoteEntry: 'http://localhost:4202/remoteEntry.js', exposedModule: './RemoteWidget' })` and `createComponent(RemoteWidgetComponent)` in `ViewContainerRef` (`:12`, `:21–22`). `projects/demo/src/app/app.routes.ts:5–13`: route `remote` with `loadComponent` through the same `loadRemoteModule`. `projects/seed-mfe-remote/src/app/remote-widget/remote-widget.component.ts:3–10`: exported component. | strong |
| Configuration (chain matching) | Host URL `http://localhost:4202/remoteEntry.js` matches the remote dev server port (`angular.json:80`), and `./RemoteWidget` matches `exposes`. The host serves on port 4201 (`angular.json:185`). | strong |
| Build | `angular.json:18–39`, `:68–82`: `ngx-build-plus:browser`/`dev-server` for `seed-mfe-remote`, `outputPath: dist/seed-mfe-remote`, own `main` and `extraWebpackConfig`. `angular.json:123–144`, `:173–187`: likewise for `demo` (`dist/demo`). Entries delegate to `bootstrap.ts` (`projects/demo/src/main.ts:1–2`; `projects/seed-mfe-remote/src/main.ts:1–2`). | moderate |
| Source code (boundaries) | Active search for imports with `../` and other project paths in `projects/`: no cross-import; the only occurrence of `seed-mfe-remote/` is the path in `exposes` (`projects/seed-mfe-remote/webpack.config.js:8`). | context |
| Documentation | `README.md:1–59`: standard Angular CLI README, without mention of micro-frontends; `:13` with port 4202. | context |

## Authorship and history

Non-shallow, partial clone (`blob:none`). There are 2 commits (2 across all refs), no merges, both by `Wesley DuSell <dusellfam@gmail.com>` (author and committer):
- `b95ce7d` (2025-04-19, “initial commit”): adds the Angular CLI generated workspace (README, `angular.json`, `package.json`, configurations);
- `3565dd8` (2025-04-20, “INIT”), the SHA: adds `projects/demo/` and `projects/seed-mfe-remote/` and changes `angular.json`, `package.json`, README and `tsconfig.json`.

`git rev-list --objects $SHA --missing=print` lists 6 missing objects, none in the SHA tree.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | Yes | Two units: remote `seedMfeRemote` and host `demo`, which references it in `remotes` (`projects/demo/webpack.config.js:5–7`). |
| Q2 | Yes | Each project has its own entry, webpack configuration, `outputPath` and dev server (`angular.json:18–39`, `:68–82`, `:123–144`, `:173–187`). No source code import between them (recorded search). |
| Q3 | Yes | The host mounts the remote component (`projects/demo/src/app/app.component.ts:24–36`) and routes it at `remote` (`projects/demo/src/app/app.routes.ts:5–13`). |
| Q4 | Yes | Module Federation configured on both sides and used through `loadRemoteModule`, with matching URL, port and exposed module. |
| Q5 | Yes | Q1–Q4 converge. |

## Rationale

- `MFE-implemented`: Q1–Q5 Yes. It matches “examples, templates… that actually compose frontend units”, like final 046 (template with host and remotes).
- Complete chain as in 076/084/096/106/109, at minimal scale.
- It differs from final 051 (standalone remote template, `MFE-unit`): here the host is in the repository and consumes the remote.
- It is not code sharing (089/100): the host loads and mounts a remote component at runtime, although the component is trivial.
- It is not content, a generator or an exercise (023/075/081/094/105): composition is configured and connected.
- `frontend_units: 2`, `unit_organization: monorepo` (two projects in the same Angular workspace), `approaches: [module-federation]`, `ui_technologies: [angular]`, `build_tools: [webpack]` (`ngx-build-plus` with webpack). `repo_type: template` (remote seed with demonstration host).
- There is no open decision.

## Analysis notes

- **RQ2:** the host combines static `remotes` in webpack (`projects/demo/webpack.config.js:5–7`) with `loadRemoteModule` of `type: 'module'` and an explicit URL (`app.component.ts:26–30`). Entry `seedMfeRemote` in `remotes` is not used by the calls, which pass the URL directly.
- **RQ1:** minimal repository, with test content (“Remote Widget LOADED!!!!”) and standard CLI README; classification comes only from configuration. The `demo` serves as a seed verification host, a role matching the container in templates such as 046.
- **Protocol (search):** hit `ModuleFederationPlugin remotes extension:js` matched a file where the term appears only inside `withModuleFederationPlugin`. Eligibility changes from `unknown` (001) to `pass` (002).
