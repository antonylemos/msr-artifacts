---
schema: 1
id: 1175564173
full_name: dotcomrow/example-mfe
url: https://github.com/dotcomrow/example-mfe
commit: d20a389c33fd7bbbe6929cfc216da3af7717dd6d
classification: MFE-unit
checklist: { q1: no, q2: yes, q3: undetermined, q4: undetermined, q5: no }
repo_type: template
approaches: [runtime-script]
ui_technologies: []
build_tools: [esbuild]
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 241 — dotcomrow/example-mfe

## Context

“Example MFE (Suncoast Contract)” (`README.md:1–11`): example micro-frontend package following the “Suncoast” UI module contract (`module.definition.json`) and including an adapter for the shell’s `CmsModuleDefinition` contract. It compiles into a single browser file (`dist/example-mfe.js`, IIFE through esbuild) and includes seed data to register the module in the Directus CMS (`cms_modules`).

The module (`mfe-example-chat`) is a chat UI in plain TypeScript, with manual DOM and GraphQL HTTP/WS. It registers in `globalThis.SuncoastMfeRegistry` with `mount`/`unmount` and is mounted by the Suncoast shell, which is not in the repository. There is a local `preview/` page to test mounting. The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:242` records rank 241, ID 1175564173, status `cloned`, branch `prod` and the front matter commit, which is the HEAD of the clone and of `origin/prod`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. There was no installation, build, execution or network access.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:242` records strategy `terminology` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID appears in `data/discovery/mfe-round-001/candidates.csv:26052` (`unknown`) and `data/discovery/mfe-round-002/candidates.csv:26059` (`pass`).

A `sqlite3 -readonly` query against tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns the same two hits in each round, from endpoint `repositories`, with subquery `…#created:2026-03` and an empty `path`:

| Query (`q`) | Collection 001 / 002 (UTC) |
|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | 2026-10-07T22:33:56.858Z / 2026-10-08T15:58:48.643Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | 2026-10-07T23:02:04.341Z / 2026-10-08T16:08:38.341Z |

The effective queries append `pushed:>=2025-04-01 created:2026-03-01..2026-03-31`.

Hit metadata:
- description “Suncoast Systems Example MFE”;
- no topics, language TypeScript, `fork: false`, size 141;
- created at 2026-03-07T22:00:23Z, pushed at 2026-09-13T02:35:19Z.

The match comes from `README.md:3`, “Example micro-frontend package that:”. Phrase search treats the hyphen as a separator. The plural “micro frontends” does not appear literally; this hit depends on GitHub search text processing, which is not recorded.

The last README change is `44955f4` (2026-05-24), before the October 2026 collections. The README at the SHA does not postdate the searches.

In both rounds, the same account has another candidate, `dotcomrow/nifi-flow-mfe` (ID 1237843855; `data/discovery/mfe-round-002/candidates.csv`), outside the sample (`sample.csv:242` is the account’s only one) and not inspected.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 31 entries, all regular files `100644`; zero symlinks and zero gitlinks. A single package: `src/` (module, contracts, host adapter), `preview/` (local test page), `scripts/` (build, dev, registry and catalog publication, source maps), `directus/` (seeds), `module.definition.json`, CI and publication workflows. | context |
| Host contract | `src/index.ts:48–63`: registers in `globalThis.SuncoastMfeRegistry[MODULE_KEY]` functions `createModule`, `cmsModuleDefinition`, `mount` and others. `src/host-adapter.ts:38–86`: `createCmsModuleDefinition()` with `mount(context)` that mounts in `context.element`, unmounts on `abort` and emits `cms-module-event`. `src/contracts.ts:81–89`: lifecycle `init`/`mount`/`update`/`unmount`. `README.md:101–106`: host `dist/example-mfe.js` and register the module in Directus for the shell to load it. | strong |
| Build/deploy | `scripts/build.mjs:42–59`: esbuild with `format: "iife"`, `globalName: "ExampleMfeBundle"`, output `dist/example-mfe.js`. `package.json:8–21`: scripts for build, publication to the module registry and catalog notification. `.github/workflows/publish.yml:1–184` (build, preparation and download) and `:233–239` (actual publication), in a 252-line workflow: build and publication to the module registry (preview/production targets). | strong |
| Host | The Suncoast shell that reads the registry and mounts the module is not in the snapshot. `preview/main.ts:1–3`, `486` imports `../src/host-adapter` and calls `mount` as a test harness for the same package, not an independent host. | ambiguous |
| Source code | `src/module.ts:1–3`, `1676–1796`: manual DOM UI (`document.createElement`), `graphql-ws` client; no UI framework. | context |

## Authorship and history

Non-shallow clone; 53 commits ancestral to the SHA, no merges (54 across all refs, including the Dependabot commit). The 53 are by Chris Lyons (noreply, account `mephmanx`), and the bot commit is outside `prod`. The root is from 2026-03-07; SHA `d20a389` (2026-09-04, “Publish OpenObserve source maps”) is HEAD of `prod`, the default branch. The Dependabot branch has 1 commit outside `prod` and was not considered. No historical blob was read. The clone is partial (`blob:none`) and `git rev-list --objects $SHA --missing=print` identifies 135 missing historical objects; none was fetched, and the necessary current blobs were available.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | A single frontend unit; the module only registers for an external host, without referencing other units. |
| Q2 | Yes | Its own entry point, build and publication (`scripts/build.mjs`; `.github/workflows/publish.yml`). |
| Q3 | Undetermined | The Suncoast shell is not observable; the README and contract describe mounting by it. |
| Q4 | Undetermined | Script loading mechanism with global registry and lifecycle prepared on the module side; connection depends on the absent shell. |
| Q5 | No | One unit prepared for composition by an unobservable external host. |

## Rationale

- `MFE-unit` under the rule “single frontend unit explicitly prepared to be composed by an external host … but the composing host is not observable”, with the exception vector from 001/050/069/004/058. Preparation is explicit: global registry, `mount`/`unmount` and IIFE bundle.
- **Mechanism:** this is `runtime-script`, the template slug first used in 002 (script loaded at runtime with a mounting API in a global), here without Module Federation.
- **Platform:** the host is a shell belonging to the “Suncoast” ecosystem (Directus CMS, module registry and catalog), not third-party. The same doubt as in 161/189/222 remains: first-party extension platform or the author’s MFE architecture. Hence `status: review`.
- **Fields:** `ui_technologies: []` (manual DOM, no framework), `build_tools: [esbuild]` (as in 059), `frontend_units: 1`, `unit_organization: single-unit`, `repo_type: template` (“Example MFE”, with integration guides for new modules, `README.md:1–11`; `MFE_AUTH_INTEGRATION_REFERENCE.md`).

## Analysis notes

- **RQ2:** micro-frontend without a framework, delivered as an IIFE that registers in a global registry, configured through a CMS (Directus) and published to a module registry, with build traceability and source maps in OpenObserve.
- **Protocol (sample):** another MFE repository from the same account appears in the rounds, outside the sample.
- **Protocol (search):** the plural hit has no literal spelling. Eligibility changes from `unknown` (001) to `pass` (002). The default branch is `prod`.

## Point for joint review

1. **First-party host:** does a module prepared for the shell of the author’s own ecosystem (Suncoast), loaded through script and a global registry, count as MFE-unit or follow 037 (platform plugin)? This is the same question as in 161/189/222.

No new rule is proposed. Until the decision, preserve `MFE-unit`/`review`.
- **Independent review contribution (Lupa):** agreement with MFE-unit (Q1 No, Q2 Yes, Q3/Q4 Undetermined, Q5 No), `runtime-script`, esbuild, one unit and `template`. The exception rule covers a unit explicitly prepared for an unobservable external host, and the contract is concrete; shell ownership alone does not justify a new exclusion. The reviewer recommends resolving the first-party doubt favorably, and retaining `review` only if the responsible parties expressly maintain this methodological question in 161, 189 and 222. Final 050 has the same vector for a UI remote with an absent host; 037 is Non-MFE through the decision to exclude a third-party platform configuration widget, and being a CMS module or using a platform from the same ecosystem does not alone demonstrate that condition; "author’s own host" is also not proved by the Suncoast brand. Adopted corrections: 53 ancestors (54 across all refs), bot authorship outside `prod`, 135 missing objects, publication reference and precision of `mount`/`unmount`.
