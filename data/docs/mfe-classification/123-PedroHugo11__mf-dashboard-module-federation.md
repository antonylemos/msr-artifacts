---
schema: 1
id: 1135167821
full_name: PedroHugo11/mf-dashboard-module-federation
url: https://github.com/PedroHugo11/mf-dashboard-module-federation
commit: 184ec1b1762b6ea93f1f8f8de44118412a9ab6a8
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
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

# 123 — PedroHugo11/mf-dashboard-module-federation

## Context

Dashboard POC with shell and two React applications, Counter and Weather. Host imports both federated modules and renders them in cards; each remote also has a standalone entry (`shell/src/App.tsx:3–27`; `mfe-counter/src/main.tsx:1–6`; `mfe-weather/src/main.tsx:1–6`). Demonstration purpose appears in `README.md:3–5`.

Names, exposures, files, exports and consumer chain are materialized. Review remains regarding Q4 sufficiency given incomplete operational configuration and possible build blockage, without inventing a general requirement for error-free execution. Boundary between minimal dashboard units and component sharing is also recorded, comparing with 089/100.

ID, rank and SHA checked in `data/samples/mfe-sample-001/clones.csv:124`, status `cloned`; HEAD matches front-matter commit. All clone Git used `GIT_NO_LAZY_FETCH=1`. Packages were not installed, builds/servers not run, alternative branches not accessed and network content not fetched.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:124` records rank 123, strategies `terminology;technology` and eligibility `pass`. Source is round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). Candidate appears in `data/discovery/mfe-round-001/candidates.csv:23433`, eligibility `unknown`, and `data/discovery/mfe-round-002/candidates.csv:23440`, eligibility `pass`. Both record description “This project is **not focused on the final product**, but on validating the concept of module federation”, empty topics, TypeScript language, `fork: false`, creation at 2026-01-15T18:24:14Z and push at 2026-01-15T18:36:27Z.

`sqlite3 -readonly` queries of tables `hits`, `queries` and `subqueries` in files `data/discovery/mfe-round-001/discovery.sqlite` and `data/discovery/mfe-round-002/discovery.sqlite`, filtered by ID 1135167821, record:

| Query | Subquery | Effective query | Collection 001 / 002 (UTC) |
|---|---|---|---|
| `technology-module-federation-repositories`: `"module federation" in:name,description,readme` | `technology-module-federation-repositories#created:2026-01` | `"module federation" in:name,description,readme pushed:>=2025-04-01 created:2026-01-01..2026-01-31` | 2026-10-07T23:22:02.859Z / 2026-10-08T16:16:43.135Z |
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | `terminology-microfrontend-repositories#created:2026-01` | `microfrontend in:name,description,readme pushed:>=2025-04-01 created:2026-01-01..2026-01-31` | 2026-10-07T19:35:52.546Z / 2026-10-08T15:40:33.737Z |
| `terminology-microfrontends-repositories`: `microfrontends in:name,description,readme` | `terminology-microfrontends-repositories#created:2026-01` | `microfrontends in:name,description,readme pushed:>=2025-04-01 created:2026-01-01..2026-01-31` | 2026-10-07T22:10:21.754Z / 2026-10-08T15:48:43.516Z |

All are repository hits with empty `path`; no code hit or matched line is reported. By elimination, spellings `microfrontend`/`microfrontends` do not appear in recorded name/description, and no topics exist; they are observed in README, respectively at `README.md:1` and `README.md:3`. “Module Federation” appears in `README.md:1–3`, and description also contains expression; this hit cannot be attributed exclusively to README. Name contains hyphenated form `module-federation`, but this was used neither as architectural evidence nor to presume search tokenization.

Root README was created and updated on 2026-01-15; its last change explicit in path history is `e4f9c06`, at 18:27:09Z, before evaluated merge at 18:36:21Z and October 2026 searches. SHA text is not later than searches. Historical metadata were used without reading old README versions.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | Complete inventory through `git ls-tree -r`: 48 regular files `100644`, zero symlinks and zero gitlinks. Three own projects exist (`shell`, `mfe-counter`, `mfe-weather`), each with manifest, lockfile, HTML, sources, tsconfigs and Vite config. No `node_modules`, compiled remote artifacts or vendored sources of another framework identified as additional applications. | context |
| Source code (entries) | `shell/index.html:9–11`, `mfe-counter/index.html:9–11` and `mfe-weather/index.html:9–11` load respective `src/main.tsx`. `shell/src/main.tsx:1–7` mounts App; `mfe-counter/src/main.tsx:1–6` mounts CounterWidget; `mfe-weather/src/main.tsx:1–6` mounts WeatherWidget. These are three material targets, not merely documented modules. | strong |
| Configuration (host) | `shell/vite.config.ts:12–20` enables federation and registers `weather` at `http://localhost:4173/assets/remoteEntry.js` and `counter` at `http://localhost:4174/assets/remoteEntry.js`, sharing React/ReactDOM. Host uses development port 5175 (`shell/vite.config.ts:5–8`). | strong |
| Configuration (producers) | `mfe-counter/vite.config.ts:14–20` names `counter`, emits `remoteEntry.js` and exposes `./Widget` from `./src/bootstrap`; `mfe-weather/vite.config.ts:14–20` does corresponding configuration for `weather`. Files `bootstrap.tsx` exist and consumed names match exposures. | strong |
| Source code (exports and consumption) | `mfe-counter/src/bootstrap.tsx:1–2` and `mfe-weather/src/bootstrap.tsx:1–2` default-export respective widgets. `shell/src/App.tsx:3–4` imports `weather/Widget` and `counter/Widget` through React.lazy; `shell/src/App.tsx:16–27` mounts both under Suspense. `shell/src/vite-env.d.ts:1–9` declares same modules/default exports, without required props; consumer and producers have no props/export mismatch. | strong |
| Source code (functional contribution) | `mfe-counter/src/CounterWidget.tsx:1–18` has local state and increment/decrement actions. `mfe-weather/src/WeatherWidget.tsx:1–11` presents fixed weather/location, without fetch. These are same interfaces mounted by standalone entries. Simplicity and exposed-component nature need distinguishing from a shared library, without inventing a size, route or full-screen requirement. | ambiguous |
| Build/deploy (independence) | Three manifests, at `shell/package.json:6–15`, `mfe-counter/package.json:6–15` and `mfe-weather/package.json:6–15`, define own build `tsc -b && vite build`, preview and React/federation dependencies. No direct source import from another target exists; remotes are shell runtime references. | strong |
| Configuration (resolvable packages) | Vite, React plugin and federation imports in all three configs match packages declared in manifests (`shell/package.json:13–15`, `shell/package.json:22–29`, and same lines in both remotes). Each lock resolves federation 1.4.1 (lines 1012–1014), React plugin 5.1.2 (1740–1742) and Vite 7.3.1 (3146–3148): `shell/package-lock.json:1012–1014`, `mfe-counter/package-lock.json:1012–1014`, `mfe-weather/package-lock.json:1012–1014`; remaining resolutions checked in same files. Declared package was not confused with installation/build success. | moderate |
| Source code (boundaries) | Active literal search `git grep -n -F -e '../../' -e '../../../'` in all JS/TS/TSX at the SHA: no occurrence. Reading all TSX sources and config imports shows local imports within each project and shell’s two federated imports; none crosses boundary through relative source path. | moderate |
| Configuration / Build/deploy (ports) | Host expects previews at 4173/4174 (`shell/vite.config.ts:15–18`), but remotes only fix `server.port` at 5173/5174 (`mfe-weather/vite.config.ts:5–8`; `mfe-counter/vite.config.ts:5–8`). Complete configs do not fix `preview.port`, and preview scripts are only `vite preview` (`mfe-weather/package.json:10`; `mfe-counter/package.json:10`). `README.md:65–78` instructs build/preview before starting host, without explicitly specifying preview ports. Connection is declared, but not guaranteed by those configurations for any startup order/port occupancy. Servers were not run to verify result. | ambiguous |
| Source code / Build/deploy (possible blockage) | `shell/src/main.tsx:1–7` imports React as a value but does not reference it; `shell/tsconfig.app.json:17–22` uses automatic JSX and `noUnusedLocals: true`. Script runs `tsc -b` before Vite (`shell/package.json:8`), and root tsconfig references application tsconfig (`shell/tsconfig.json:2–5`). This indicates a possible unused-import diagnostic blocking shell build. It is a static finding, without claiming execution or creating automatic exclusion rule. | ambiguous |
| Documentation | `README.md:11–25` describes three applications and independent builds; `README.md:39–45` declares goal of validating concepts. README alone does not confirm connection: positive records come from configs, entries, exports and consumers above. No separate ADR exists in inventory. | context |

## Authorship and history

Metadata from `git rev-list`: **4 commits, 1 merge and 2 root commits**. Roots: `01b1d4a16317cc853daff18c8142c71432673d7f` and `9f20c00b352397e34ce9910dfc26cd2a78d465c6`. Non-shallow clone. History was not reduced to a single root or three linear commits.

`git log --no-renames --name-status` was queried separately for `shell`, `mfe-counter` and `mfe-weather`, plus README. All files of three projects were added together in `01b1d4a`, by PedroHugo11 at 2026-01-15T15:32:02-03:00, message `feat: microfrontend dashboard POC`, without reachable subsequent file modifications in snapshot. Other root, `9f20c00`, by Pedro Hugo/GitHub at 15:24:15-03:00, introduces README, updated by `e4f9c06` at 15:27:09-03:00. Evaluated merge, PedroHugo11/PedroHugo11, occurs at 15:36:21-03:00.

Bulk addition proves neither that owner originally wrote each excerpt nor that applications were imported from third parties. Projects retain Vite scaffold artifacts, but specific config/bootstrap/consumption connection was evaluated as materialized candidate code, not merely displayed generated snippet. No declared upstream for POC was identified in read evidence. Historical blobs were not queried, and no missing object was found.

Local references for record only: `main`, `origin/main` and `origin/HEAD` point to pinned SHA. No other local/remote branch appears in enumeration; this does not assert no branches exist on server.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | Yes | Shell, Counter and Weather have own entries and explicit composition relationship (`shell/vite.config.ts:15–18`; `shell/src/App.tsx:3–4`; standalone remote entries). |
| Q2 | Yes | Each project has its own entry and build command, without direct source import from another (`shell/package.json:6–10`; `mfe-counter/package.json:6–10`; `mfe-weather/package.json:6–10`; complete relative-import search described above). Possible build failure does not erase observed structural separation. |
| Q3 | Yes | Shell loads and renders both exports in the same dashboard under Suspense (`shell/src/App.tsx:16–27`), with names/default exports matching producers. |
| Q4 | Yes | Configured and connected chain in documented flow: shell `remotes` (`shell/vite.config.ts:15–18`) ↔ producer `exposes ./Widget` (`vite.config.ts:14–20`) ↔ `lazy import` (`shell/src/App.tsx:3–4`) ↔ render under Suspense (`:16–27`). README says run shell with `npm run dev` (`README.md:75–78`), which is plain `vite` (`shell/package.json:7`) and does not execute `tsc`; only remotes need build/preview (`README.md:65–73`), and their `main.tsx` files do not import React. Shell’s unused `React` import (`shell/src/main.tsx:1`) with `noUnusedLocals` (`tsconfig.app.json:17–22`) would affect only production host build, outside documented flow. Preview ports follow documented order (weather at 4173, counter at 4174, `shell/vite.config.ts:16–17`). |
| Q5 | Yes | Q5 follows Q1–Q4. This is not code sharing (089/100): each remote exposes entire standalone application (standalone `main.tsx` mounts same widget exposed by `bootstrap.tsx`), and shell only composes those targets, host+remotes pattern of 106/109 and final 007. Widget simplicity suits POC and creates no minimum-size rule. |

## Rationale

- `MFE-implemented`: Q1–Q5 Yes, without exception. (Lupa draft proposed `Uncertain/review` with Q4/Q5 Undetermined; see disagreement below.) This is neither a mere federation dependency, README content nor exposure without consumer: both sides and rendering are in snapshot.
- `frontend_units: 3` and `unit_organization: monorepo` count three own targets, not every exposed module. `repo_type: example` follows explicit POC (`README.md:3–5`). React and Vite are observed in sources and resolvable configurations.
- This is not `MFE-unit`, since host and both producers are present. No third-party platform-plugin mechanism, iframe/link or build-time-restricted composition explains connection.
- Execution success is not imposed as a new rule. Name/file/export contracts match; review points are concrete (preview and possible compiler diagnostic), to compare with execution-imperfection precedents.

## Analysis notes

- **Protocol (family):** annotation search for `PedroHugo11`, `mf-dashboard`, `CounterWidget` and `WeatherWidget` found no previously annotated sibling. Common scaffold artifacts do not prove copying a specific candidate.
- **Checklist (comparators):** 076/084/096/106/109 have comparable host/remotes chains, without authorizing class transfer through name/plugin. No exposed-key/file/export mismatch as discussed in 097/103/104 exists here; Q4 remains open for build/serving conditions. Precedent 083 requires deciding how to treat imperfections without presupposing automatic exclusion.
- **Checklist (granularity):** 089/100 are `review` for code sharing. Here Counter maintains own state and each standalone producer mounts exactly exposed widget, instead of only callback/hook or showcase card. Conversely, Weather is fixed presentation and Counter generic control; this difference does not automatically create an inclusion or minimum-complexity rule.

## Analyst–reviewer disagreement

Lupa draft proposed `Uncertain`/`review`, with Q4 and Q5 Undetermined, for (a) possible `tsc -b` blockage in host build and dependency on preview port order and (b) proximity to code sharing (089/100). Independent reviewer (Prisma) proposed Q4 Yes and Q5 Yes, and coordination verified facts at SHA and adopted proposal, retaining `draft`:

- Documented shell flow uses `npm run dev` (`vite`, without `tsc`); unused `React` import under `noUnusedLocals` would affect only host `npm run build`, a step outside flow (limitation recorded in RQ3, without effect on Q4).
- `vite preview` uses 4173 by default and advances to next port if occupied; README starts weather then counter, exactly what shell expects. No key/file/export mismatch exists as in 097/103/104.
- Each remote exposes its entire own standalone application; this is neither 089 (buttons and hook from app with another UI) nor 100 (showcase card).

**Recorded alternative for researcher:** retain Q5 Undetermined for widget granularity (Weather is fixed presentation, Counter generic control), or treat host build imperfection as preventing Q4 (then Non-MFE or Uncertain). No execution was performed.
