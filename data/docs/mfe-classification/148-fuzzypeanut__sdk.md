---
schema: 1
id: 1163143966
full_name: fuzzypeanut/sdk
url: https://github.com/fuzzypeanut/sdk
commit: a304cf31195aac6f7ba374f478215f8332c42951
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: library
approaches: []
ui_technologies: []
build_tools: []
frontend_units: 0
unit_organization: none
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 148 — fuzzypeanut/sdk

## Context

Npm package `@fuzzypeanut/sdk`: TypeScript types, interface `FuzzyPeanutSDK` and runtime helpers defining contract between “FuzzyPeanut” shell and its modules (`README.md:1–10`; `package.json:2–13`). Shell and modules are absent from repository. Package only declares types they would use, such as `ModuleManifest`, with `remoteEntry`, and `FPModule`, with `mount`/`unmount` (`src/index.ts:52–88`), plus a singleton shared through `window` (`src/index.ts:308–343`). Repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:149` records rank 148, ID 1163143966, status `cloned`, branch `main` and front-matter commit, which is clone HEAD and `origin/main`. Every clone Git command used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. No installation, build, execution or network access occurred.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:149` records strategy `technology` and eligibility `pass`. Sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). ID appears in `data/discovery/mfe-round-001/candidates.csv:25205` (`unknown`) and `data/discovery/mfe-round-002/candidates.csv:25212` (`pass`).

`sqlite3 -readonly` query of tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns one hit per round, at endpoint `repositories` and with empty `path`:

| Query (`q`) | Subquery | Effective query | Collection 001 / 002 (UTC) |
|---|---|---|---|
| `technology-module-federation-repositories`: `"module federation" in:name,description,readme` | `technology-module-federation-repositories#created:2026-02` | `"module federation" in:name,description,readme pushed:>=2025-04-01 created:2026-02-01..2026-02-28` | 2026-10-07T23:23:27.609Z / 2026-10-08T16:17:10.891Z |

Hit metadata:
- description “TypeScript SDK — the FuzzyPeanut module contract (@fuzzypeanut/sdk)”, without “module federation”;
- no topics, TypeScript language, `fork: false`, size 13;
- creation at 2026-02-21T06:46:28Z, push at 2026-02-21T10:30:42Z.

Since description lacks phrase, retrieval comes from `README.md:14`, “…declared as a shared singleton in Vite module federation config…”, lowercase and sole README occurrence.

README was created at root `0dfd15f` (2026-02-21) and unchanged afterward. It predates October 2026 collections, and README at the SHA is not later than searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 7 entries, all regular files `100644`: `.gitignore`, `LICENSE`, `README.md`, `package.json`, `package-lock.json`, `src/index.ts` and `tsconfig.json`. Zero symlinks and zero gitlinks. No entry HTML, UI components, bundler configuration or module `manifest.json`. | contrary |
| Build | `package.json:14–19`: `build: tsc`, `dev: tsc --watch` and only `typescript` as devDependency. `tsconfig.json:2–15`: compiles `src` to `dist` with declarations. `package-lock.json` resolves only `typescript` 5.9.3. This is a library package published through `exports` (`package.json:8–13`), not an application. | contrary |
| Source code (contract) | `src/index.ts:37–71`: types `ModuleInfo`/`ModuleManifest` with `remoteEntry`. `src/index.ts:73–88`: interface `FPModule`, “The interface every module's remoteEntry.js must export as default”. `src/index.ts:189–304`: event map and interface `FuzzyPeanutSDK`. These are only type declarations; nothing in repository implements or loads them. | weak |
| Source code (runtime) | `src/index.ts:308–343`: `initSDK` stores instance in `window.__fuzzyPeanutSDK` and `getSDK` reads it as fallback for “modules loaded as separate ES bundles”. `src/index.ts:347–392`: `use*` accessors and `Events` constants. This is a shared-service singleton, without loading or mounting units. | context |
| Documentation | `README.md:12–14`: shell calls `initSDK` and modules call `getSDK`, with package “declared as a shared singleton in Vite module federation config”. `README.md:34–52`: example `manifest.json` that “every module repo ships”. Describes configuration of other repositories, absent here. | weak |
| Source code (boundaries) / Composition (search) | `src/index.ts` is sole code file and has no `import`. `git grep -i` at the SHA, in `src` and `package.json`, for `import`, `from`, `federation`, `remoteEntry`, `window`, `customElements`, `iframe` and `single-spa`. Finds only types with `remoteEntry` and `window` access cited above. No `remotes`, `exposes`, `registerApplication`, import map or federation plugin exists. | absent |

## Authorship and history

Non-shallow clone. There are 8 commits, no merge, all by `trollboy <trollboy@gmail.com>` on 2026-02-21, between 01:51 and 05:30 (−05:00). Root `0dfd15f` (“feat: initial SDK — types, FuzzyPeanutSDK interface, runtime helpers, standard events”) adds all files except `LICENSE`, entering in `fcd6431`. Other commits change only `src/index.ts` (`git log --no-renames --name-status`):
- `383fa3d` adds `window` fallback;
- `b682c87` expands contract;
- `010e381`, `6f9043c`, `e86447f` and SHA `a304cf3` adjust events.

Owner is an organization (`fuzzypeanut`). No historical blob was read and no object was missing.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | No frontend unit in repository, only types/helpers package (inventory; `package.json:14–19`). No composition configuration references external units: README shell and modules (`README.md:14`, `36`) are unreferenced through `remotes`, registry or import map. |
| Q2 | No | Without units, no unit entries or builds exist. Sole build is library `tsc` (`package.json:15`). |
| Q3 | No | No host, shell or root configuration. `initSDK` only injects service (`src/index.ts:318–323`); it does not load, mount or route units. |
| Q4 | No | No configured mechanism. Module Federation is only mentioned in `README.md:14`, and `remoteEntry` appears only as type field (`src/index.ts:41`, `56`, `74`). |
| Q5 | No | Q1–Q4 are No: contract library of a modular platform whose shell and modules are in other repositories. |

## Rationale

- `Non-MFE` under rule “at least one question is No”. Matches “MFE frameworks and libraries (e.g., single-spa itself, federation plugins)” and “repositories mentioning micro-frontends without implementing them”.
- Final precedent 015: shared library of an MFE ecosystem in other repositories, `repo_type: library`, 0 units, `none`. MFE-unit exception does not apply: package is not a unit prepared for composition (without `exposes`, exported lifecycles or custom element). `FPModule` only types what external modules should export.
- Unlike 097/103/104, no repository host or remote has connectivity requiring interpretation. Unlike 089/100, no federation configuration requires code-sharing judgment; `shared` cited in README lies outside repository.
- `ui_technologies: []`: no UI. README manifest type cites `./src/index.svelte` as example, but that is not observed here. `build_tools: []`: only `tsc`, not a unit bundler.
- No decision remains open.

## Analysis notes

- **RQ1 (misleading signals):** platform module-contract/types package, with federation vocabulary (`remoteEntry`, “shared singleton”, modules loaded as separate bundles), without any unit or composition configuration.
- **RQ3:** package resolves cross-bundle state sharing through global variable in `window`, reinforcing federation `shared` (`src/index.ts:312–343`; commit `383fa3d`). This is observable only as intent; shell/module repositories are absent from snapshot.
- **Protocol (search):** retrieval comes from one lowercase README occurrence (`README.md:14`). Eligibility changes from `unknown` (001) to `pass` (002).
- **Independent-review contribution (Lupa):** complete agreement with Non-MFE, Q1–Q5 No, `library` and zero units; no open decision. Package `@fuzzypeanut/sdk` has seven files and one code file (`src/index.ts`): `FPModule` types `mount`/`unmount` (`src/index.ts:73–88`), but is only contract for each external module’s `remoteEntry.js` (`README.md:36–45`); package is not that remote, implements no UI or own-unit lifecycle exports, so MFE-unit exception does not apply. Singleton in `window.__fuzzyPeanutSDK` (`src/index.ts:308–343`) is shared service, not unit-loading mechanism. Most direct final comparator: 015 (library for MFE consumers, Non-MFE), with this SDK narrower still, only interfaces and runtime helpers.
