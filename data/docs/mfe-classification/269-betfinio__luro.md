---
schema: 1
id: 869688095
full_name: betfinio/luro
url: https://github.com/betfinio/luro
commit: 017037cb834474a5a7e1f7f8d439e349910d43d7
classification: MFE-unit
checklist: { q1: no, q2: yes, q3: undetermined, q4: undetermined, q5: no }
repo_type: production
approaches: [module-federation]
ui_technologies: [react]
build_tools: [rsbuild]
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 269 — betfinio/luro

## Context

“Lucky Round” game in the Betfin ecosystem (`README.md:1`): a React unit with Rsbuild and Module Federation 2.0. It exposes the game route, styles and i18n to an external host (`rsbuild.config.ts:31–41`) and consumes a shared context remote, `betfinio_context`, with query hooks, utilities, global context provider, translations and a `MockRoot` (`rsbuild.config.ts:34–36`; `src/routes/__root.tsx:2–3`). The Betfin host mounting the route is not in the repository. The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:270` records rank 269, ID 869688095, status `cloned`, branch `dev` (the default) and the front matter commit, which is the HEAD of the clone and of `origin/dev`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. There was no installation, build, execution or network access (the remote manifest was not consulted).

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:270` records strategy `technology` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID appears in `data/discovery/mfe-round-001/candidates.csv:10299` (`technology`, `unknown`) and `data/discovery/mfe-round-002/candidates.csv:10305` (`technology`, `pass`).

A `sqlite3 -readonly` query against tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns one hit per round, from endpoint `code`:

| Query (`q`) | Subquery | `path` | Collection 001 / 002 (UTC) |
|---|---|---|---|
| `technology-module-federation-package-code`: `"@module-federation" filename:package.json` | `technology-module-federation-package-code#size:2000..2249` | `package.json` | 2026-10-07T19:59:44.705Z / 2026-10-08T15:42:41.920Z |

The effective query is `"@module-federation" filename:package.json size:2000..2249`. Code hit metadata records only null description and `fork: false`.

The matched file has 2.190 bytes at the SHA, within the range, and declares `@module-federation/enhanced` (`package.json:24`) and `@module-federation/rsbuild-plugin` (`package.json:55`). It was last changed in `d7fb2c3` (2026-02-10). The match does not depend on the README (`README.md:1`, only the title, without the terms), last changed in `cd044d6` (2024-10-08). Both and the SHA (2026-04-06) predate the October 2026 collections.

The same owner has other candidates in the rounds (`betfinio/stones`, `roulette`, `predict`, `lottery` and `template`; `data/discovery/mfe-round-002/candidates.csv:9600`, `:9708`, `:10107`, `:11028`, `:34598`). Only `luro` is in `sample.csv`; the others were not inspected, and `betfinio_context` does not appear among candidates.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 78 entries, 77 regular files `100644` and 1 executable `100755` (`scripts/railway-build.sh`); zero symlinks and zero gitlinks. A single project: `package.json`, `rsbuild.config.ts`, `src/` (TanStack Router routes, game components, ABIs, queries, translations), build/deploy scripts and workflows. `@mf-types/` (generated remote types) is not versioned. | context |
| Configuration (exposure) | `rsbuild.config.ts:31–41`: `pluginModuleFederation({ name: 'betfinio_luro', exposes: { './style': './src/style', './i18n': './src/i18n', './route': './src/routes/games/luro/$interval' }, manifest: true, … })`; `:48`: `shared` of react, react-dom, TanStack Router/Query, i18next, react-i18next and wagmi. `src/routes/games/luro/$interval.tsx:14–20`, `:22–63`: exposed game route/page. | strong |
| Configuration (consumption) | `rsbuild.config.ts:34–36`: `remotes: { betfinio_context: \`betfinio_context@${process.env.PUBLIC_CONTEXT_URL}/mf-manifest.json\` }`; `.env.example:11`: `PUBLIC_CONTEXT_URL`. `scripts/plugin-fetch-manifest.ts:64–103` and `rsbuild.config.ts:52–56`: during build, downloads remote-exposed assets to `@mf-types/source`. `tsconfig.json:17–19`: resolves types in `@mf-types`. | moderate |
| Source code (remote consumption) | Imports of `betfinio_context/…` in 8 files in `src`: `lib/query`, `lib/utils`, `lib/helpers`, `lib/context`, `translations` and `components/MockRoot`. For example, `src/routes/__root.tsx:2–3`, `:9–17` (`GlobalContextProvider` and `MockRoot` wrapping `Outlet`) and `src/i18n.ts:1`, `:13–26` (`sharedLang`). Consumed items are shared provider, hooks, utilities and translations. | ambiguous |
| Source code (standalone execution) | `src/index.tsx:1` → `src/bootstrap.tsx:7–13`: own router mounted in `#root`; `__root.tsx` wraps the page with the context’s `MockRoot`, that is, a mock root for running the unit outside the host. | moderate |
| Source code (boundaries) | Active relative import search in `src`: only `../lib/*` and `../../lib/*` within the project itself (for example, `src/components/PlaceBet/PlaceBet.tsx:6–8`; `src/components/RoundMyInfo.tsx:6–7`). No source code import from another unit; context enters only through the federated module. | context |
| Build/deploy | `package.json:7`, `:11`: Rsbuild build and own static server (`scripts/server.ts:6–22`); `railway.json:3–9` and `scripts/railway-build.sh:81–87`: own Railway build and deployment; `.github/workflows/release.yml`. | strong |
| Composition | The ecosystem host mounting `./route` is not in the repository (`README.md:1` only cites the ecosystem). | absent |
| Technology | `package.json:21–22`: `@betfinio/abi` and `@betfinio/components` as npm packages (35 imports of `@betfinio/components` in `src`), build-time sharing parallel to the context remote. | context |

## Authorship and history

Non-shallow and partial clone (`blob:none`). There are 193 commits reachable from the SHA (230 across all refs), 64 merges, by pseudonymous identities from the same project, all with `@proton.me` emails:
- `Monster`/`bf-monster` `<bf.monster@proton.me>`: 101 commits;
- `Plane` `<bf.plane@proton.me>`: 63;
- `bf-tower`: 16;
- `bf-gabagool`: 12;
- `BF san`: 1.

Committer `GitHub` appears in 49 commits. The root is `19cc527` (2024-10-08, “Initial commit”) and the SHA is `017037c` (2026-04-06, “feat: enhance round resolution and betting logic”). There are remote branches `prod/bet`, `feature/*` and others, not considered. `git rev-list --objects $SHA --missing=print` lists 572 missing objects, none in the SHA tree. No historical blob was read.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | Adopted interpretation: a single frontend unit. Remote `betfinio_context` provides provider, query hooks, utilities, translations and a mock root (`src/routes/__root.tsx:2–3`; `src/i18n.ts:1`), that is, code sharing, not a composed frontend unit. See “Point for joint review”. |
| Q2 | Yes (for the unit) | Own entry point, Rsbuild build, server and deployment (`src/index.tsx:1`; `package.json:7`, `:11`; `railway.json:3–9`). |
| Q3 | Undetermined | The Betfin host mounting the exposed route is not in the repository. |
| Q4 | Undetermined | The exposed side is configured (`rsbuild.config.ts:37–41`, MF manifest); the consumer of `./route` is not observable. |
| Q5 | No | Unit prepared for composition by an unobservable external host. |

## Rationale

- Proposed `MFE-unit` with `status: review`.
- **Applied exception:** “a single frontend unit explicitly prepared to be composed by an external host (e.g., Module Federation `exposes`…), but the composing host is not observable”. The unit exposes a functional game route (`./route`), plus `./style` and `./i18n`, with MF manifest and singleton `shared`. Same vector as 001/050/225.
- **Factor requiring review:** beyond `exposes`, the unit declares and actually consumes a remote (`betfinio_context`). Under the literal Q1 interpretation adopted in 150, this reference would count as an external unit, preventing the single-unit exception.
- **Why the code sharing interpretation is adopted:** consumed items are provider, hooks, utilities, translations and a mock root. This evokes the Non-MFE case “Module Federation used only for code sharing”, still open in 089/100.
- **Unlike 264:** here the remote is consumed.
- **Unlike 037/102/258:** there is no third-party platform; host and context belong to the same Betfin ecosystem.
- `repo_type: production`: on-chain game with contracts, Railway deployment, secret management through 1Password and branch `prod/bet`. `ui_technologies: [react]`, `build_tools: [rsbuild]`, `approaches: [module-federation]`.

## Analysis notes

- **RQ2:** Module Federation 2.0 with `@module-federation/rsbuild-plugin`, manifest (`manifest: true`), remote types (`dts.consumeTypes`) and a custom plugin downloading remote assets during build (`scripts/plugin-fetch-manifest.ts`). The pattern is a shared “context” remote with global provider and `MockRoot` for standalone development of game units.
- **RQ3:** two sharing channels: at build time through npm packages (`@betfinio/components`, `@betfinio/abi`) and at runtime through remote `betfinio_context`.
- **Protocol (families/multi-repo):** the ecosystem has at least five other game or template repositories in the rounds (`stones`, `roulette`, `predict`, `lottery`, `template`), outside the sample. The host and `betfinio_context` were not identified among candidates. Family analysis could change Q3/Q4.

## Point for joint review

Decide how to treat a unit with `exposes` (game route) that also consumes, through `remotes`, a shared context remote (`betfinio_context`: provider, hooks, utilities, translations, `MockRoot`).

- **Adopted interpretation:** the context remote is code sharing, not a frontend unit. Q1 No, Q2 Yes, Q3 and Q4 Undetermined, Q5 No, and class `MFE-unit` (`frontend_units: 1`, `single-unit`), as in 001/050/225.
- **Alternative A, literal Q1 interpretation as in 150:** `betfinio_context` counts as a referenced external unit (Q1 Yes, `frontend_units: 2`, `multi-repo`). The single-unit exception no longer applies. Q3 and Q4 depend on considering mounting `MockRoot`/`GlobalContextProvider` around the page as participation in the same application:
  - if so, Q3 and Q4 Yes, and class `MFE-implemented` would depend on accepting context as a unit rather than code sharing (question in 089/100);
  - if not, Q3 Undetermined and class `Uncertain`.
- **Alternative B:** if context consumption is read as “Module Federation used only for code sharing” and the exposed side is not accepted as a unit for an external host, class would be `Non-MFE`. This interpretation seems less fitting, because `./route` exposes a functional page.

No new rule is proposed. The decision can be made together with 089/100 (code sharing) and the Q1 interpretation pending in 150.
