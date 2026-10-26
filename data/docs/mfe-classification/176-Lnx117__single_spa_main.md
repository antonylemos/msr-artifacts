---
schema: 1
id: 1181945275
full_name: Lnx117/single_spa_main
url: https://github.com/Lnx117/single_spa_main
commit: 112c73b7d0bc4739bcab53de03b404ce2fbde05a
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
approaches: [single-spa]
ui_technologies: [vanilla]
build_tools: [vite]
frontend_units: 3
unit_organization: multi-repo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 176 — Lnx117/single_spa_main

## Context

Vite single-spa root config (`vite-plugin-single-spa`, `type: 'root'`) registering two external microfrontends, `menu` and `base`, loaded through `import()` from environment variable URLs (`src/main.ts:1–29`; `vite.config.ts:12–16`). Their values are versioned in `.envtest`, pointing to Vite dev servers at `localhost:9083` and `localhost:9081` (`.envtest:1–11`). The repository description is “Оркестратор main для single-spa приложения”, English translation: main orchestrator for a single-spa application. Microfrontends are not in the repository. No README. The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:177` records rank 176, ID 1181945275, status `cloned`, branch `main` and the front matter commit, which is HEAD of the clone and `origin/main`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, with reading through `${SHA}:caminho` (the original placeholder means SHA:path). No installation, build, execution or network access occurred.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:177` records strategy `technology` and eligibility `unknown`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID is in `data/discovery/mfe-round-001/candidates.csv:26519` and `data/discovery/mfe-round-002/candidates.csv:26526`, both `unknown`.

A `sqlite3 -readonly` query of the `hits`, `queries` and `subqueries` tables from both rounds, filtered by ID, returns one hit per round, from endpoint `repositories` and with empty `path`:

| Query (`q`) | Subquery | Effective query | Collection 001 / 002 (UTC) |
|---|---|---|---|
| `technology-single-spa-repositories`: `"single-spa" in:name,description,readme` | `technology-single-spa-repositories#created:2026-Q1` | `"single-spa" in:name,description,readme pushed:>=2025-04-01 created:2026-01-01..2026-03-31` | 2026-10-07T23:34:35.452Z / 2026-10-08T16:21:19.095Z |

Hit metadata:
- description “Оркестратор main  для single-spa приложения” (English translation: main orchestrator for a single-spa application), containing “single-spa” literally;
- no topics, language TypeScript, `fork: false`, size 13;
- created at 2026-03-14T20:50:39Z, pushed at 2026-03-29T18:47:46Z.

**Hit origin.** No README at the SHA; the hit comes from description. The SHA (2026-03-14) precedes October 2026 collection.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 6 entries, all regular `100644` files (`.envtest`, `index.html`, `package-lock.json`, `package.json`, `src/main.ts`, `vite.config.ts`); zero symlinks and zero gitlinks. Only root config is in the repository. | context |
| Source code (registration) | `src/main.ts:13–29`: `registerApplication({ name: 'menu', app: () => import(env.VITE_MENU), activeWhen: '/' })`, likewise for `base` with `env.VITE_BASE`, and `start()`. `index.html:10–20`: containers `single-spa-application:menu` (in `nav`) and `single-spa-application:base` (in `main`) and loading of `/src/main.ts`. | strong |
| Configuration (unit locations) | `.envtest:1–11`: comments explain each microfrontend is “отдельный Vite dev-сервер на своём порту”, English translation: a separate Vite dev server on its own port, and that `main.ts` does `import()` of lifecycles (`bootstrap`, `mount`, `unmount`). Values: `VITE_MENU=http://localhost:9083/src/index.ts` and `VITE_BASE=http://localhost:9081/src/index.ts`, with example CDN URL for build (`:5`). The file is named `.envtest`, which Vite does not load automatically; `src/main.ts:5–6` mentions `.env`/`.env.local`. | moderate |
| Configuration / Build | `vite.config.ts:12–16`: `vitePluginSingleSpa({ type: 'root', cssStrategy: 'multiMife' })`. `:17–22`: port 9080. `package.json:15–21`: `single-spa` ^6.0.3, `vite` ^7.3.1, `vite-plugin-single-spa` ^1.1.0. | strong |
| Source code (boundaries) | Only `src/main.ts`, without relative imports. Units connect only through URLs. | context |

## Authorship and history

Non-shallow clone; 3 commits, no merges, all by `Vlad <ostriakov2011@yandex.ru>`. SHA `112c73b` (2026-03-14, “init commit”) is the only one in `main`. Branches `origin/main_2` (`3f81751`, “main + eventBus”) and `origin/main_3` (`0edafb0`, “add centarl store”, 2026-03-29) descend linearly from it and add `src/utils/eventBus.js` and `src/api/store.ts`. `pushed_at` corresponds to `main_3`. Under the procedure, only the `clones.csv` commit was considered. `git diff` against `main_3` did not complete because of a missing blob in the partial clone (`c0ca3def…`), which was not fetched; the clone remained unchanged.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | Yes | Three units: root config and external microfrontends `menu` and `base`, explicitly registered (`src/main.ts:13–25`). |
| Q2 | Yes | Root has its own build (`package.json:6–10`). External units have their own servers and addresses (`.envtest:8`, `11`), without source code imports between them. |
| Q3 | Yes | Root registers, activates and mounts both applications in page containers (`src/main.ts:13–29`; `index.html:12`, `17`). |
| Q4 | Yes | single-spa configured as root (`vite-plugin-single-spa` `type: 'root'`) and executes `registerApplication` and `start()` (`src/main.ts:13–29`). Remote URLs and lifecycle contract are declared and documented in `.envtest:1–11`; the nonstandard filename is a local execution caveat, rather than absence of composition logic. |
| Q5 | Yes | No No answer; Q1–Q4 demonstrate independent units and single-spa composition. |

## Rationale

- Classified as `MFE-implemented`: root configures and starts single-spa composition of two independent microfrontends. Remote values and contract are versioned and explicitly documented.
- `.envtest` requiring renaming or explicit loading is an operational caveat, but does not negate snapshot composition logic.
- Not MFE-unit (root is present and registers units), code sharing (089/100), or a third-party platform (102/074/080).
- `approaches: [single-spa]`. `ui_technologies: [vanilla]`: root is TypeScript/HTML without a declared UI library; external unit technologies are not observable. `build_tools: [vite]`, `frontend_units: 3`, `unit_organization: multi-repo`, `repo_type: example`.

## Analysis notes

- **RQ2:** root config with `vite-plugin-single-spa` (`cssStrategy: 'multiMife'`) and `import()` of ESM modules served by each microfrontend's Vite dev server, without import map.
- **RQ3:** unit locations live in a versioned environment file with a nonstandard name. Microfrontends are in other repositories, not consulted.
- **Protocol (snapshot):** default branch stopped at the initial commit; evolution (event bus, central store) is in `main_2`/`main_3`, outside the snapshot.
- **Protocol (search/eligibility):** entry through description, with eligibility `unknown` in both rounds, without examining the reason here.

## Recorded decision

Promoted to `MFE-implemented`. The repository contains the root-config registering and starting `menu` and `base` as independent applications, with declared external locations and lifecycles. Having to load or rename `.envtest` is an operational caveat and does not invalidate the observed composition architecture.
