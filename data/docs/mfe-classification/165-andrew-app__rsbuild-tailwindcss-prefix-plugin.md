---
schema: 1
id: 1083487955
full_name: andrew-app/rsbuild-tailwindcss-prefix-plugin
url: https://github.com/andrew-app/rsbuild-tailwindcss-prefix-plugin
commit: 2738626a9e5ff7261b03d3fc73a20766e00898b8
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

# 165 — andrew-app/rsbuild-tailwindcss-prefix-plugin

## Context

npm package `rsbuild-tailwindcss-prefix-plugin`: an Rsbuild plugin that adds a prefix to Tailwind classes in JSX/TSX `className` at build time (`README.md:1–7`; `package.json:2–9`; `src/index.ts:8–104`). The README motivates use for style isolation “when building microfrontends with module federation” (`README.md:7`). The repository contains no application, frontend unit or composition configuration. The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:166` records rank 165, ID 1083487955, status `cloned`, branch `main` and the front matter commit, which is HEAD of the clone and `origin/main`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, with reading through `${SHA}:caminho` (the original placeholder means SHA:path). No installation, build, execution or network access occurred.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:166` records strategies `terminology;technology` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID is in `data/discovery/mfe-round-001/candidates.csv:20314` (`unknown`) and `data/discovery/mfe-round-002/candidates.csv:20320` (`pass`).

A `sqlite3 -readonly` query of the `hits`, `queries` and `subqueries` tables from both rounds, filtered by ID, returns the same three hits in each round, from endpoint `repositories`, with subquery `…#created:2025-10` and empty `path`:

| Query (`q`) | Collection 001 / 002 (UTC) |
|---|---|
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | 2026-10-07T19:17:10.281Z / 2026-10-08T15:39:48.464Z |
| `terminology-microfrontends-repositories`: `microfrontends in:name,description,readme` | 2026-10-07T22:09:30.932Z / 2026-10-08T15:48:17.782Z |
| `technology-module-federation-repositories`: `"module federation" in:name,description,readme` | 2026-10-07T23:20:46.338Z / 2026-10-08T16:16:09.053Z |

Effective queries append `pushed:>=2025-04-01 created:2025-10-01..2025-10-31`.

Hit metadata:
- description “TailwindCSS prefix plugin for Rsbuild”, without the terms;
- no topics, language TypeScript, `fork: false`, size 15;
- created at 2025-10-26T05:49:52Z, pushed at 2025-10-26T07:11:49Z.

The hit comes from `README.md:7` (“This is useful when building microfrontends with module federation…”), containing “microfrontends” and “module federation”. The singular form “microfrontend” does not appear in the README or description; that hit depends on GitHub search text processing, which is not recorded.

The README's last change is `b5fcb42` (2025-10-26), before October 2026 collection. The SHA's README does not postdate searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 9 entries, all regular `100644` files (`.gitignore`, `LICENSE`, `README.md`, `biome.json`, `package.json`, `pnpm-lock.yaml`, `rslib.config.ts`, `src/index.ts`, `tsconfig.json`); zero symlinks and zero gitlinks. No entry HTML, components or application. | contrary |
| Build | `package.json:11–28`: library with ESM/CJS `exports`, `build: rslib build`, `peerDependencies` `@rsbuild/core 1.x`. `rslib.config.ts:3–15`: ESM and CJS outputs for Node 18. | contrary |
| Source code | `src/index.ts:8–16`: `pluginTailwindPrefix` returns an `RsbuildPlugin` registering `api.transform` for `.jsx`/`.tsx`. `src/index.ts:56–101`: rewrites `className` with a prefix. A build tool, without a composition mechanism. | contrary |
| Documentation | `README.md:7`: motivation in micro-frontends with Module Federation (avoiding class conflicts). `README.md:22–23`, `31–33`, `62`: examples with prefixes `app1-` and `iss-remote-`. | weak |
| Technology / Configuration / Composition (search) | `git grep -i` at the SHA (except lockfile) for `micro.?front`, `federation`, `remoteEntry`, `exposes`, `remotes` and `single-spa`: only `README.md:7`. | absent |

## Authorship and history

Non-shallow clone; 6 commits, no merges, all by `andrew-app`: 5 with `<andrew.appuhamy@gmail.com>` and 1 through noreply. All on 2025-10-26, from `27a1a48` (“Initial commit”) to `2738626` (SHA, “Publish v1.0.1 with update documentation”). `b3c443a` adds code; tag `v1.0.0` points to `e293b4e` (“Create LICENSE”). No historical blob was read. The clone is partial (`blob:none`) and `git rev-list --objects --missing=print` reports four missing promisor objects; with `GIT_NO_LAZY_FETCH=1`, the global `git log --name-status` scan fails when requesting a historical blob (`7d91006…`), although path-specific logs of relevant current files completed. The SHA snapshot was read in full.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | No frontend unit in the repository; no composition configuration. |
| Q2 | No | Without units, there are no unit entries or builds; the build is for the library (`package.json:24`). |
| Q3 | No | No host, shell or root configuration. |
| Q4 | No | No composition mechanism; Module Federation appears only as README motivation (`README.md:7`). |
| Q5 | No | Q1–Q4 are No: Tailwind build plugin used by third parties, possibly in MFE projects. |

## Rationale

- `Non-MFE` under the rule “at least one question is No”. Matches, by analogy, “MFE frameworks and libraries (e.g., … federation plugins)” and “repositories mentioning micro-frontends without implementing them”.
- Final precedent 015: supporting library for an MFE ecosystem, with `repo_type: library`, 0 units and `none`. The MFE-unit exception does not apply: the package is not a unit prepared for composition.
- `ui_technologies: []` and `build_tools: []`: no frontend units. Rsbuild and Rslib are the plugin's target and packaging tool, rather than unit bundlers.
- No decision remains open.

## Analysis notes

- **RQ1 (misleading signals):** build library citing “microfrontends with module federation” as a use case matches terminology and technology queries without containing composition.
- **RQ2 (context):** CSS isolation through Tailwind class prefixes at build time appears as a supporting MFE practice; example prefix `iss-remote-` (`README.md:31–33`, `62`) suggests origin in an actual remote, unobservable here.
- **Protocol (search):** singular hit `microfrontend` has no corresponding spelling. Eligibility changes from `unknown` (001) to `pass` (002).
- **Independent review contribution (Lupa):** full agreement with Non-MFE, Q1–Q5 No, `library`, zero units and no approach; no open decision (`draft`). The README describes use in microfrontends with Module Federation, but code implements only an Rsbuild plugin rewriting Tailwind classes. Corrections: (1) `package.json:11–28,36–38` (peer dependency is at `:36–38`); (2) the nine-path structural inventory is a command result, rather than a file citation; (3) singular hit provenance: the README contains plural `microfrontends` (`README.md:7`), and by elimination is the probable origin, although tokenization is not recorded in databases; (4) Rsbuild and Rslib do not enter `build_tools`, the unit bundler field, and there are no units; (5) Q1 through Q3 should cite artifacts and locators, alongside the Git inventory for negative structural claims. Classification depends on artifact scope, rather than its name, even if the package is useful in MFE projects.
