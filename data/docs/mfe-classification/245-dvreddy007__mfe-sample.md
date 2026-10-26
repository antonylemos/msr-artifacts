---
schema: 1
id: 985556796
full_name: dvreddy007/mfe-sample
url: https://github.com/dvreddy007/mfe-sample
commit: d4cef45fce1d97c3d4d80d232dc9e9fbad9cfd1a
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
approaches: [module-federation]
ui_technologies: [vue]
build_tools: [vite]
frontend_units: 3
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 245 — dvreddy007/mfe-sample

## Context

“Micro Frontend Sample” (`README.md:1–3`): Lerna/npm workspaces monorepo with one Vue 3 host and two Vue 3 remotes, all in Vite with `@module-federation/vite`. The host registers remotes at runtime through a route manifest and mounts each in a container through `mount`/`unmount` (`README.md:5–11`, `:72`). Installation instructions say to clone another repository, `https://github.com/lmlong-huynh/micro-frontend-sample.git` (`README.md:39–43`), indicating the content comes from a third-party example. The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:246` records rank 245, ID 985556796, status `cloned`, branch `main` and the front matter commit, which is the HEAD of the clone and of `origin/main`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. There was no installation, build, execution or network access.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:246` records strategies `terminology;technology;broader` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID appears in `data/discovery/mfe-round-001/candidates.csv:14069` (`unknown`) and `data/discovery/mfe-round-002/candidates.csv:14075` (`pass`), both with the three strategies.

A `sqlite3 -readonly` query against tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns the same seven hits in each round:

| Query (`q`) | Endpoint | Subquery | `path` | Collection 001 / 002 (UTC) |
|---|---|---|---|---|
| `technology-module-federation-package-code`: `"@module-federation" filename:package.json` | code | `…#size:300..399` | `packages/app-1/package.json` | 2026-10-07T18:18:51.057Z / 2026-10-08T15:34:35.243Z |
| same | code | `…#size:300..399` | `packages/app-2/package.json` | 2026-10-07T18:18:51.057Z / 2026-10-08T15:34:35.243Z |
| same | code | `…#size:400..499` | `packages/host/package.json` | 2026-10-07T18:19:01.958Z / 2026-10-08T15:34:47.034Z |
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | repositories | `…#created:2025-05` | empty | 2026-10-07T22:21:34.178Z / 2026-10-08T15:54:11.457Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | repositories | `…#created:2025-05` | empty | 2026-10-07T22:52:58.133Z / 2026-10-08T16:05:37.452Z |
| `technology-module-federation-repositories`: `"module federation" in:name,description,readme` | repositories | `…#created:2025-05` | empty | 2026-10-07T23:17:40.301Z / 2026-10-08T16:14:14.931Z |
| `broader-micro-apps`: `"micro apps" frontend in:name,description,readme` | repositories | `…#created:2025-Q2` | empty | 2026-10-07T23:48:17.033Z / 2026-10-08T16:26:41.575Z |

Repository queries append `pushed:>=2025-04-01` and `created:2025-05-01..2025-05-31` (or `2025-04-01..2025-06-30` for `broader-micro-apps`); code queries append the `size:` range.

Hit metadata (identical in both rounds): description “mfe-sample”, no topics, language JavaScript, `fork: false`, size 83, created at 2025-05-18T02:54:06Z, pushed at 2025-05-25T23:45:05Z.

Matches at the SHA:
- **Code:** the three matched `package.json` declare `@module-federation/vite` (`packages/app-1/package.json:16`; `packages/app-2/package.json:16`; `packages/host/package.json:18–19`, the latter also with `@module-federation/runtime`). Sizes at the SHA: 351, 351 and 422 bytes, within the ranges.
- **“micro frontend”:** `README.md:1` (“Micro Frontend Sample”), also `:3`, `:15`, `:65`.
- **“micro frontends”:** `README.md:7` (“from micro frontends”), `:10`, `:11`.
- **“module federation”:** `README.md:3`, `:17`, `:72`.
- **“micro apps” + frontend:** `README.md:8` (“between different micro apps”), with “frontend” in `README.md:3` and other lines.

`README.md` exists only in root commit `e4a97c4` (2025-05-17) and was not changed afterward; the SHA (2025-05-25) only adds the workflow. Both predate the October 2026 collections, and the README at the SHA does not postdate the searches.

**Cited source repository:** `lmlong-huynh/micro-frontend-sample` (ID 929178189) appears as a candidate in both rounds (`data/discovery/mfe-round-001/candidates.csv:11705`; `data/discovery/mfe-round-002/candidates.csv:11710`), strategy `technology`, description “A sample project using Vite, Module Federation and Vue”, `fork: false`, eligibility `fail` due to `push_before_threshold`. It is not in `sample.csv` and was not inspected; no content comparison was performed.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 50 entries, all regular files `100644`; zero symlinks and zero gitlinks. Root with `package.json` (workspaces `packages/*`, `package.json:4–6`), `lerna.json`, lockfile and workflow; three packages `packages/host`, `packages/app-1`, `packages/app-2`, each with `package.json`, `vite.config.js`, `index.html` and `src/`. Each package has `.__mf__temp/<nome>/localSharedImportMap.js`, a plugin-generated (`:2`) and versioned file. | context |
| Configuration (remotes) | `packages/app-1/vite.config.js:9–16`: `federation({ name: 'app1', filename: 'remoteEntry.js', exposes: { './entry': './src/entry.js' }, shared: ['vue'] })`, port 5011 (`:18–20`). `packages/app-2/vite.config.js:9–16`: same with `name: 'app2'`, port 5012 (`:18–20`). | strong |
| Source code (remote contract) | `packages/app-1/src/entry.js:6–25` and `packages/app-2/src/entry.js:6–25`: `export const mount = (container)` creates its own Vue instance and mounts it in the container; `export const unmount`. Each remote also runs independently through `src/main.js:1–5` and `index.html:11`. | strong |
| Configuration (host) | `packages/host/vite.config.js:10–14`: `federation({ name: 'host', filename: 'remoteEntry.js', shared: ['vue'] })`, without static `remotes`; port 5010 (`:21–23`). `packages/host/src/routeManifest.js:1–28`: `module: 'app1'`, `entry: 'http://localhost:5011/remoteEntry.js'`, route `/app-1`; `module: 'app2'`, `entry: 'http://localhost:5012/remoteEntry.js'`, route `/app-2`. | strong |
| Source code (composition) | `packages/host/src/main.js:5–6`, `:15`: `app.use(federationPlugin, getRemotes())`. `packages/host/src/plugins/federationPlugin.js:9–18`: `init({ name: 'host', remotes })` from `@module-federation/runtime` with `type: 'module'`; `:28–34`: `loadRemote(`${module}/entry`)` returns `mount`/`unmount`. `packages/host/src/router/index.js:4–12`: each manifest route points to `Loader.vue`. `packages/host/src/components/Loader.vue:63–84`, `:87–109`: finds the remote by route, unmounts the previous one, loads and calls `mount(containerRef)`. `packages/host/src/App.vue:4–8`: navigation to `/app-1` and `/app-2` with `RouterView`. | strong |
| Configuration (chain match) | Manifest names (`app1`, `app2`) match the remotes’ `name`; `./entry` matches `exposes`; ports 5011/5012 match each remote’s `server.port`. | strong |
| Source code (boundaries) | Active search `git grep -E '\.\./'` in `packages/` at the SHA: only `packages/host/src/components/Loader.vue:10` and `packages/host/src/router/index.js:2`, both `../routeManifest` within `packages/host/src`. No import between `host`, `app-1` and `app-2`; remote imports are local (`./App.vue`, `./components/HelloWorld.vue`). | context |
| Build/deploy | Each package has its own `dev`/`build`/`preview` with Vite (`packages/*/package.json:6–10`); the root has only `dev: lerna run dev` (`package.json:7–9`). `.github/workflows/main_vdumpavue3.yml:26–33`, `:67–73`: `npm install`, `npm run build --if-present` at the root (which defines no `build`), repository zip and deployment to a single Azure Web App. The workflow does not build or publish remotes separately; manifest URLs are `localhost`. | weak |
| Documentation | `README.md:3`, `:11`, `:72`: host loads App 1 and App 2 through Module Federation and mounts through `Loader.vue`. `README.md:78–98` shows a `routeManifest` in `packages/host/src/router/` with `module: 'app1/App'`, differing from the actual file (`packages/host/src/routeManifest.js`); the configuration citation uses the actual file. `README.md:39–43`: clone `lmlong-huynh/micro-frontend-sample`. | moderate |
| Source code (remote content) | `packages/app-1/src/App.vue:1–10` and `packages/app-2/src/App.vue:1–10`: Vite scaffold component (logo + `HelloWorld` with counter), each an entire Vue application mounted by route, not a utility. | context |

## Authorship and history

Non-shallow clone; 2 commits (2 across all refs), no merges. Root `e4a97c4` (2025-05-17T22:05:40-05:00, “push first commit”), by `dvreddy007 <dvreddy007@gmail.com>`, adds all 49 project files at once, including the three packages and generated `.__mf__temp`. SHA `d4cef45` (2025-05-25T18:45:05-05:00), by `Venkateswara Reddy Dumpa <dvreddy007@gmail.com>` (same email), only adds `.github/workflows/main_vdumpavue3.yml`, with a message in the Azure deployment assistant format. Author and committer match in both. Addition in bulk does not demonstrate original authorship; the README itself points to another repository as the source (`README.md:41`). `git rev-list --objects $SHA --missing=print` lists no missing objects. Refs: `main`, `origin/main` and `origin/HEAD` at the SHA.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | Yes | Three units: `host`, `app-1` and `app-2`, the remotes referenced by the composition configuration (`packages/host/src/routeManifest.js:3–6`, `:16–19`). |
| Q2 | Yes | Each unit has its own entry point and build (`packages/*/index.html:11`; `packages/*/vite.config.js`; `packages/*/package.json:6–10`), and there is no source code import between units (recorded `../` search). |
| Q3 | Yes | The host routes and mounts the remotes (`packages/host/src/router/index.js:4–12`; `packages/host/src/components/Loader.vue:63–84`; `packages/host/src/App.vue:4–8`). |
| Q4 | Yes | Module Federation configured in the remotes (`exposes`) and used by the host through `init` + `loadRemote` (`packages/host/src/plugins/federationPlugin.js:15–18`, `:29`), with matching names, exposed module and ports. |
| Q5 | Yes | The technical chain is complete and classification evaluates the implementation observed in the repository. The declared origin in `lmlong-huynh/micro-frontend-sample` is recorded as provenance, but does not invalidate the composition present. |

## Rationale

- Classified as `MFE-implemented`: host and remotes implement a complete Module Federation chain, with dynamic discovery, loading and `mount`/`unmount` lifecycle.
- Under technical criteria, the case matches “monorepos containing a host and its remotes” and “examples… that actually compose frontend units”. This is the same complete chain as 076/084/096/106/109: remotes with `exposes`, a host that registers and loads, and matching names/ports.
- This is not code sharing (089/100): each remote is an entire Vue application with its own instance mounted by route, not an imported component or utility.
- This is not an inconsistent chain (097/103/104): names, exposed module (`./entry`) and ports match.
- This is not a platform plugin (037, 102): the host is in the repository itself. The question concerns the origin of the entire repository, not an external host.
- Azure deployment (`main_vdumpavue3.yml`) does not publish units separately and manifest URLs are for development (`localhost`). Q2 relies on the literal criterion (own entry point and build, without cross-imports), as in final 059.
- `frontend_units: 3`, `unit_organization: monorepo`, `approaches: [module-federation]`, `ui_technologies: [vue]`, `build_tools: [vite]`, `repo_type: example`.

## Analysis notes

- **RQ2:** Module Federation 2.0 in Vite (`@module-federation/vite`) with dynamic remote registration through the runtime (`@module-federation/runtime` `init`/`loadRemote`) from a route manifest, instead of static `remotes` in the host config. Remotes expose a `mount`/`unmount` contract with their own Vue instance per remote.
- **RQ1 (misleading signals):** the README manifest snippet (`README.md:78–98`, `app1/App`, path `router/routeManifest.js`) differs from actual code (`./entry`, `src/routeManifest.js`); citing the README as configuration would lead to an apparently inconsistent chain.
- **RQ1:** plugin-generated and versioned `.__mf__temp/*/localSharedImportMap.js` files indicate the project was executed locally before the commit; they do not indicate who owns the code.
- **Protocol (duplicates/families):** the declared upstream appears in both rounds with eligibility `fail` (push before 2025-04-01), outside the sample. There are other candidates named `micro-frontend-sample` in the rounds (for example, `data/discovery/mfe-round-002/candidates.csv:6848`, `:7570`, `:14234`, `:20568`), not inspected; no relationship is presumed. Copies of third-party examples with `fork: false` pass filtering when the original is old and the copy recent.

## Recorded decision

Promoted to `MFE-implemented`. The repository contains a host and two Vue remotes with manifest-based discovery, Module Federation loading and their own lifecycle per route. The README declares that code derives from `lmlong-huynh/micro-frontend-sample`; this provenance remains recorded, but classification considers the implementation observed in the candidate.
