---
schema: 1
id: 1342458837
full_name: Banksia-Corp/signals
url: https://github.com/Banksia-Corp/signals
commit: f96ff70ce52344bd844ad5764a8210c2bcc79602
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: library
approaches: []
ui_technologies: []
build_tools: []
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 248 — Banksia-Corp/signals

## Context

- **Repository type:** library. `@banksia/signals` is a fine-grained reactivity engine in TypeScript, published as an npm/JSR package, with adapters for React, Lit, SolidJS and vanilla DOM (`README.md:1–3`; `package.json:2–5`, `:10–35`).

The repository has library code (`src/`), tests, benchmarks and an Rspress documentation portal generated from Markdown (`rspress.config.ts:8–16`; `docs/`). “Micro-frontends” appears only as a use case the library claims to support. The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:249` records rank 248, ID 1342458837, status `cloned`, branch `main` and the front matter commit, which is the HEAD of the clone and of `origin/main`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. There was no installation, build, execution or network access.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:249` records strategy `terminology` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID appears in `data/discovery/mfe-round-001/candidates.csv:35848` (`terminology`, `unknown`) and `data/discovery/mfe-round-002/candidates.csv:35853` (`terminology`, `pass`).

A `sqlite3 -readonly` query against tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns the same two hits in each round, from endpoint `repositories` and with an empty `path`:

| Query (`q`) | Subquery | Collection 001 / 002 (UTC) |
|---|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | `terminology-micro-frontend-repositories#created:2026-08` | 2026-10-07T22:42:03.458Z / 2026-10-08T16:01:57.166Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | `terminology-micro-frontends-repositories#created:2026-08` | 2026-10-07T23:12:12.610Z / 2026-10-08T16:10:36.351Z |

The effective queries append `pushed:>=2025-04-01 created:2026-08-01..2026-08-31`.

Hit metadata (identical in both rounds): description “Fine-grained reactivity for modern TypeScript.”, no topics, language TypeScript, `fork: false`, size 511, created at 2026-08-22T05:02:44Z, pushed at 2026-09-05T06:53:14Z.

The description does not contain the terms; the match comes from the README. The matching spellings are “micro-frontends” in `README.md:58` (“hard to reuse across micro-frontends”) and `README.md:520` (“helpers for native DOM scripting and micro-frontends”). Phrase search treats the hyphen as a separator, literally matching “micro frontends”. The singular form “micro frontend” does not appear literally in the README; this hit depends on GitHub search text processing, which is not recorded.

The last reachable README change is `a830d58` (2026-09-03T19:40:48+10:00). The SHA (merge on 2026-09-05T16:52:31+10:00, that is, 06:52:31Z) coincides with the recorded `pushed_at`. Both predate the October 2026 collections, and the README at the SHA does not postdate the searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 75 entries, 74 regular files `100644` and 1 executable `100755` (`scripts/release-publish.sh`); zero symlinks and zero gitlinks. A single `package.json` at the root; `src/` (core in `src/core/*` and adapters `src/react.ts`, `src/lit.ts`, `src/solid.ts`, `src/vanilla.ts`, `src/devtools.ts`), `tests/`, `benchmarks/`, `docs/` (Markdown, navigation JSON and `logo.svg`) and CI, release and docs workflows. | contrary |
| Configuration (library) | `package.json:10–35`: subpath `exports` (`.`, `./react`, `./lit`, `./solid`, `./vanilla`, `./devtools`) to `dist/`; `:45`: `build: rslib build`; `:74–89`: React, Lit and SolidJS as optional peer dependencies. `rslib.config.ts:3–11`: unbundled ESM library build with `.d.ts`. | contrary |
| Source code | `src/index.ts:1–22`: “Framework-agnostic, fine-grained Proxy-based reactive state framework” with adapter subpaths; `src/vanilla.ts:1–6`: DOM binding helpers over `effect`. No application, HTML entry point or UI mounting in library code. | contrary |
| Configuration / Build/deploy (portal) | `rspress.config.ts:8–16`: Rspress site with `root: docs`; `package.json:49–51`: `docs:dev`, `docs:build`, `docs:preview`; `.github/workflows/deploy-docs.yml:42–59`: package build, portal build and publication of `doc_build` to GitHub Pages. It is the only application target, a documentation site generated from Markdown. | context |
| Documentation (MFE mentions) | `README.md:58`, `:520`; `docs/framework-adapters/index.md:48`, `:56`; `docs/framework-adapters/vanilla.md:3`; `docs/getting-started/philosophy.md:113`, `:134`: micro-frontends cited as a use case, because the same domain model can feed UIs in different frameworks. None of these passages describes repository units. | weak |
| Technology / Configuration / Composition (search) | `git grep -i` at the SHA, except `pnpm-lock.yaml`, for `micro.?front`, `federation`, `single.?spa`, `remoteEntry`, `import.?map`, `customElements`, `<iframe`, `qiankun`, `wujie` and `registerApplication`: only the documentation mentions above. No composition mechanism configured. | absent |
| Source code (boundaries) | Active search `git grep -E '\.\./'` in `src`, `tests` and `benchmarks`: only test and benchmark imports of `../src/*` (for example, `tests/signals-adapters.test.ts:2–5`; `benchmarks/reactivity.bench.ts:10`), within the same package. There are no units to cross. | context |

## Authorship and history

Non-shallow and partial clone (`blob:none`). There are 84 commits reachable from the SHA (85 across all refs), 37 of them PR merges. Authors:
- 75 with email `luizinho3@gmail.com`: 41 as “Luis Middleton” and 34 as “Luis”, the latter with committer `GitHub` (merges through the web interface);
- 9 by `github-actions[bot]` (Changesets versioning).

The root is `e1a5e9e` (2026-08-22T15:24:54+10:00, “feat: initial repository baseline for @banksia/signals”). SHA `f96ff70` is the merge of PR #60 (`changeset-release/main`). `AGENTS.md:1–3` and remote branch names (for example, `implement_issue_15_plan`, `pull_issue_42_plan`) indicate coding assistant use; metadata does not distinguish intellectual authorship. The 29 remote branches beyond `main` were not considered.

`git rev-list --objects $SHA --missing=print` lists 206 missing objects, all historical. No historical blob was read, and the cited SHA files are present. Path-based `git log -- README.md` worked without fetching blobs.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | There are not two frontend units. The repository is a library (`package.json:10–35`; `rslib.config.ts:3–11`) with a single documentation site (`rspress.config.ts:8–16`), and no composition configuration references external units (recorded search). |
| Q2 | No | There are no units of the same application to assess. |
| Q3 | No | There is no host, shell or root config loading units. |
| Q4 | No | No composition mechanism configured; micro-frontends appear only as a use case in documentation (`README.md:58`, `:520`). |
| Q5 | No | Q1–Q4 converge. |

## Rationale

- `Non-MFE` under the rule “at least one question is No”.
- It matches “repositories mentioning micro-frontends without implementing them”. By analogy, it also resembles “MFE frameworks and libraries”: a state library presenting itself as useful in micro-frontend architectures, but neither a composition framework nor composing units.
- Comparable to 028 (library/tool citing MF as a supported use case) and libraries 015/148/165. This is neither teaching content nor a generator (023/075/081/094/105): it is a real library with code, tests and releases.
- `frontend_units: 1` and `single-unit` count the Rspress documentation portal, an application target published to GitHub Pages, following the VitePress site count in 080. The library and its adapters are not frontend units. With count 0, as in 015/148/165, the class would not change.
- `ui_technologies: []` because React, Lit and SolidJS are adapter peer dependencies, not technologies used to build repository units; the portal is Markdown. `build_tools: []`: Rslib is a library packager and Rspress encapsulates the site bundler (as Astro does in 146).
- There is no open decision.

## Analysis notes

- **RQ1 (misleading signals):** “framework-agnostic” state and reactivity libraries cite micro-frontends as a portability argument (`README.md:58`; `docs/getting-started/philosophy.md:134`) and enter through terminology searches.
- **Protocol (search):** the singular hit “micro frontend” has no literal spelling in the README. Eligibility changes from `unknown` (001) to `pass` (002).
