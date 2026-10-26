---
schema: 1
id: 1197367428
full_name: lkovari/monorepo-nx-mf-dyn-modfed
url: https://github.com/lkovari/monorepo-nx-mf-dyn-modfed
commit: 16f0962945720a521bac32e4a43913af1494b61b
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
approaches: [native-federation]
ui_technologies: [angular]
build_tools: [esbuild]
frontend_units: 4
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 362 — lkovari/monorepo-nx-mf-dyn-modfed

## Context

Angular 21 + Nx proof of concept of “native module federation” with host-mediated messaging between micro-frontends (`README.md:3`). The workspace is in `nx-mf-df/` (`README.md:5`). It has:
- a shell `main-host` (port 4200);
- three remotes `mf_remote_a`/`b`/`c` (4201–4203), loaded by route;
- two shared libs: Zod contracts and UI/messaging adapters (`README.md:11–19`).

Communication uses npm package `@lkovari/microfrontend-platform-communication`, from the same owner, with a bus exposed by the host at `window.__MFE_BRIDGE__` (`README.md:17`, `:19`, `:25`). The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:363` records rank 362, ID 1197367428, status `cloned`, branch `main` and the front matter commit, which is the HEAD of the clone and of `origin/main`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. There was no installation, build, execution or network access.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:363` records strategies `terminology;technology` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID appears in `data/discovery/mfe-round-001/candidates.csv:27570` (`unknown`) and `data/discovery/mfe-round-002/candidates.csv:27577` (`pass`), both with `terminology;technology`.

A `sqlite3 -readonly` query against tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns the same three hits in each round, from endpoint `repositories` and with an empty `path`:

| Query (`q`) | Subquery | Collection 001 / 002 (UTC) |
|---|---|---|
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | `…#created:2026-03` | 2026-10-07T20:32:52.350Z / 2026-10-08T15:41:53.292Z |
| `terminology-microfrontends-repositories`: `microfrontends in:name,description,readme` | `…#created:2026-03` | 2026-10-07T22:12:03.269Z / 2026-10-08T15:49:28.339Z |
| `technology-module-federation-repositories`: `"module federation" in:name,description,readme` | `…#created:2026-03` | 2026-10-07T23:24:38.994Z / 2026-10-08T16:17:35.128Z |

The effective queries append `pushed:>=2025-04-01 created:2026-03-01..2026-03-31`.

Hit metadata (identical in both rounds): null description, no topics, language TypeScript, MIT license, `fork: false`, size 2162, created at 2026-03-31T14:24:56Z, pushed at 2026-06-07T09:38:13Z.

**Spellings:**
- **“module federation”:** `README.md:3` (“**native module federation**”);
- **“microfrontend”:** `README.md:3` (“cross-microfrontend”, where the hyphen separates terms in the search), also `:17` and `:287`, in package name `@lkovari/microfrontend-platform-communication`;
- **“microfrontends”:** the plural does not appear literally; this hit depends on GitHub search text processing, which is not recorded.

The last README change is `147d615` (2026-05-24). The SHA (2026-06-07T11:38:12+02:00, that is, 09:38:12Z) matches `pushed_at`. Both predate the October 2026 collections, and the README at the SHA does not postdate the searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 228 entries, all regular files `100644`; zero symlinks and zero gitlinks. `nx-mf-df/apps/` has `main-host`, `mf_remote_a`, `mf_remote_b` and `mf_remote_c`, each with `federation.config.js`, `project.json`, `src/main.ts`, `src/bootstrap.ts` and `index.html`, plus four e2e projects. `nx-mf-df/libs/` has `common-ui-lib` and `contracts-platform-messaging`. At the root: README, changelogs and communication documents. | strong |
| Configuration (host) | `nx-mf-df/apps/main-host/federation.config.js:3–9`: `withNativeFederation({ name: 'main-host', shared: shareAll(singleton, strictVersion) })`. `nx-mf-df/apps/main-host/public/federation.manifest.json:1–5`: `mf_remote_a`/`b`/`c` → `http://localhost:4201`–`4203/remoteEntry.json`. `nx-mf-df/apps/main-host/src/main.ts:3–5`: `initFederation('federation.manifest.json')` before bootstrap. | strong |
| Configuration (remotes) | `nx-mf-df/apps/mf_remote_a/federation.config.js:4`, `:8–10`: `name: 'mf_remote_a'`, `exposes: { './Component': './apps/mf_remote_a/src/app/app.ts' }`; likewise in `mf_remote_b` and `mf_remote_c` (`federation.config.js:4`, `:8–10`). `nx-mf-df/apps/mf_remote_a/src/main.ts:3–5` and `src/bootstrap.ts:1–5`: `initFederation()` and own bootstrap. | strong |
| Source code (composition) | `nx-mf-df/apps/main-host/src/app/app.routes.ts:2`, `:11–25`: routes `mf_remote_a`/`b`/`c` with `loadRemoteModule('<remote>', './Component').then((m) => m.App)`. `nx-mf-df/apps/mf_remote_a/src/app/app.ts:14–31`: root component `App` exported and exposed. | strong |
| Configuration (chain matching) | Manifest names match remote `name`, and `./Component` matches `exposes`. Ports 4201–4203 match dev servers (`nx-mf-df/apps/mf_remote_a/project.json:53`, `:108`). For GitHub Pages, `nx-mf-df/scripts/gh-build.mjs:49–64` builds host and remotes with their own `baseHref` and rewrites the host manifest with published URLs. | strong |
| Build/deploy | `nx-mf-df/apps/main-host/project.json:10`, `:58–65`: `@angular-architects/native-federation:build` over `@angular/build:application`, `outputPath: dist/apps/main-host`, entry `apps/main-host/src/main.ts`; `nx-mf-df/apps/mf_remote_a/project.json:10`, `:58–65`: likewise with `dist/apps/mf_remote_a`. Deployment through workflow (`.github/workflows/deploy-github-pages.yml:41`, `:45–47`). | moderate |
| Source code (boundaries) | Active search for relative imports with `../../` in `apps` and `libs`: only `eslint.config.mjs` to the root config. Search for other apps’ paths or aliases: no occurrence. Apps use libs through path mapping (`nx-mf-df/tsconfig.base.json:17–22`; for example `nx-mf-df/apps/mf_remote_a/src/app/app.ts:4–10` and `nx-mf-df/apps/main-host/src/app/app.config.ts:9–22`). | context |
| Communication between units | `nx-mf-df/apps/main-host/src/app/app.config.ts:31–47`: `provideBus` and `provideHostBridge({ remotes: [MF_REMOTE_A_ID, MF_REMOTE_B_ID, MF_REMOTE_C_ID] })`. Remotes connect to the host bus through `window.__MFE_BRIDGE__` (`README.md:19`, `:25`). | moderate |
| Remote content | `nx-mf-df/apps/mf_remote_a/src/app/app.html:1–5`: toast, messaging banner, welcome component and history panel. `nx-mf-df/apps/mf_remote_a/src/app/nx-welcome.ts:1–15` (968 lines) is the adapted Nx starter component (“This is a starter component and can be deleted”). The domain is demonstrative. | context |

## Authorship and history

Non-shallow, partial clone (`blob:none`). There are 19 commits reachable from the SHA (25 across all refs, including `origin/gh-pages`), without merges. All have email `laszlo.kovary@gmail.com`: author `László Kővári`, and `LK` in the initial commit created through GitHub.

Records run from 2026-03-31 (`d722c85`, “Initial commit”) to the SHA (2026-06-07, “update platform comm library, add tests.”). Messages describe construction step by step:
- `a04c0bb`: “steps 1 - 12 create apps install angulararchitests native federation plugin, set host and remotes”;
- `e642058`: “steps 12 - 18 ui-common-lib, routing, manifest”;
- adoption of the owner’s communication package, in `81a1110`.

`git rev-list --objects $SHA --missing=print` lists 156 missing objects, none in the SHA tree.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | Yes | Four units: `main-host` and the three remotes referenced in the federation manifest (`nx-mf-df/apps/main-host/public/federation.manifest.json:1–5`). Libs and e2e projects are not counted. |
| Q2 | Yes | Each unit has its own `federation.config.js`, entry, `project.json`, build and dev server (`nx-mf-df/apps/main-host/project.json:10–65`; `nx-mf-df/apps/mf_remote_a/project.json:10–108`). No source code import between apps; sharing uses aliased libs (recorded search). |
| Q3 | Yes | The shell routes and loads the three remotes (`nx-mf-df/apps/main-host/src/app/app.routes.ts:11–25`). |
| Q4 | Yes | Native Federation configured on both sides and used through `initFederation` + `loadRemoteModule`, with matching names, exposed module and ports. The production manifest is generated by the deployment script (`gh-build.mjs:57–64`). |
| Q5 | Yes | Q1–Q4 converge. |

## Rationale

- `MFE-implemented`: Q1–Q5 Yes. It matches “monorepos containing a host and its remotes” and “examples… that actually compose frontend units”.
- Same pattern as final 059 and draft 343: Native Federation with a manifest, `initFederation` and `loadRemoteModule` by route, and libs through path mapping.
- Complete chain as in 076/084/096/106/109.
- It is not code sharing (089/100): each remote exposes its root component, mounted as a shell route page.
- Remote content is demonstrative (Nx starter component and messaging panels). This does not change the literal criteria, which concern composition; it differs from 023/075/081/094/105, where composition is not assembled.
- `frontend_units: 4`, `unit_organization: monorepo`, `approaches: [native-federation]`, `ui_technologies: [angular]`, `build_tools: [esbuild]` (builder `@angular/build:application`, as in 059 and 343). `repo_type: example` (“proof-of-concept”, `README.md:3`).
- There is no open decision.

## Analysis notes

- **RQ3:** communication between micro-frontends through an in-process host bus, exposed at `window.__MFE_BRIDGE__`, with versioned Zod contracts, topic registration and request/response (`README.md:23–103`). The README explains that a single bus is necessary because isolated `createBus()` in different bundles cannot see one another (`README.md:25`).
- **RQ3:** the README says that, in the integrated shell, the Demo Query “remote” handler runs in the host process, registered with the remote IDs (`README.md:142`). Part of the demonstrated communication does not cross the actual remote boundary.
- **RQ1:** the README pins the communication package at `^0.2.1` (`README.md:287`), but `nx-mf-df/package.json:89` declares `^0.3.2`.
- **Protocol (search):** the plural hit has no literal spelling, and the singular depends on “cross-microfrontend” and the package name. Eligibility changes from `unknown` (001) to `pass` (002).
