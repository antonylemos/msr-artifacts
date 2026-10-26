---
schema: 1
id: 1032199185
full_name: enablhealth/enabl-webapp
url: https://github.com/enablhealth/enabl-webapp
commit: cbd6034bfb30f76d9ba734ef3648065853988f63
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: production
approaches: []
ui_technologies: [react]
build_tools: []
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 279 — enablhealth/enabl-webapp

## Context

Next.js web application for “Enabl Health”, a health assistant with a chat interface for AI agents (Amazon Bedrock), Cognito/Amplify authentication and deployment to AWS App Runner with CloudFront (`README.md:1–3`, `:11–30`). It is a single Next.js application. The README does not mention micro-frontends: the search term results from juxtaposition of “Nova Micro)” and “**Frontend**” on consecutive lines. The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:280` records rank 279, ID 1032199185, status `cloned`, branch `main` and the front matter commit, which is the HEAD of the clone and of `origin/main`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. There was no installation, build, execution or network access.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:280` records strategy `terminology` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID appears in `data/discovery/mfe-round-001/candidates.csv:17293` (`terminology`, `unknown`) and `data/discovery/mfe-round-002/candidates.csv:17297` (`terminology`, `pass`).

A `sqlite3 -readonly` query against tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns the same two hits in each round, from endpoint `repositories` and with an empty `path`:

| Query (`q`) | Subquery | Collection 001 / 002 (UTC) |
|---|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | `…#created:2025-08` | 2026-10-07T22:25:10.620Z / 2026-10-08T15:55:35.228Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | `…#created:2025-08` | 2026-10-07T22:56:26.269Z / 2026-10-08T16:06:34.045Z |

The effective queries append `pushed:>=2025-04-01 created:2025-08-01..2025-08-31`.

Hit metadata (identical in both rounds): null description, no topics, language TypeScript, `fork: false`, size 1102, created at 2025-08-05T01:05:41Z, pushed at 2025-09-06T21:04:48Z.

**Spelling:** the SHA README (501 lines) contains neither “micro frontend”, “micro-frontend” nor “microfrontend”. The only sequence compatible with the phrase is the end of `README.md:17` (“…basic models (Titan Text Express, Nova Micro)”), followed by the beginning of `README.md:18` (“- **Frontend**: AWS App Runner…”): tokens “Micro” and “Frontend” become adjacent after punctuation and markup. The plural form “micro frontends” has no match; this hit depends on GitHub search text processing, which is not recorded. No claim is made about which passage the API matched, because it reports no line.

The last README change is `ae5f388` (2025-08-11), and the SHA is from 2025-08-17. `pushed_at` (2025-09-06) postdates the `main` branch SHA, probably through a push to another branch (`origin/development` exists), which was not verified. All predate the October 2026 collections, and the README at the SHA does not postdate the searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 81 entries, comprising 62 regular files `100644` and 19 executables `100755` (deployment and infrastructure scripts in `scripts/`); zero symlinks and zero gitlinks. A single Next.js project: `package.json`, `next.config.ts`, `src/app` (home page, terms, configuration API route), `src/components`, `src/hooks`, `src/services`, plus `Dockerfile`, `apprunner.yaml`, CloudFront configurations and workflows. | contrary |
| Configuration / Build | `package.json:5–16`: `next dev/build/start` and deployment scripts; `:17–28`: Next 15, React 19, AWS Amplify/Cognito, without federation packages. `next.config.ts`: empty configuration. | contrary |
| Technology / Configuration / Composition (search) | `git grep -i` at the SHA, except lockfile, for `micro.?front`, `federation`, `single.?spa`, `remoteEntry`, `import.?map`, `customElements`, `<iframe`, `qiankun` and `wujie`: no occurrences. | absent |
| Source code (boundaries) | There are no `../../` imports in `src`; the project uses internal paths within the same application. There is no other frontend unit to cross. | context |
| Documentation | `README.md:11–30`: architecture in three environments (dev, staging, production), each with Bedrock backend and a single frontend on App Runner. `README.md:166`: “Frontend Deployment (AWS App Runner)”. | contrary |

## Authorship and history

Non-shallow and partial clone (`blob:none`). There are 39 commits reachable from the SHA (40 across all refs), no merges:
- 28 by `kieferenriquez <kc7enriquez@gmail.com>`;
- 11 by `enablhealth <enablhealth@gmail.com>`;
- author and committer match in all.

The root is `db137d0` (2025-08-05, “Initial commit from Create Next App”). Branch `origin/development` was not considered. `git rev-list --objects $SHA --missing=print` lists 82 missing objects, none in the SHA tree. No historical blob was read.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | A single frontend unit: one Next.js project with one `package.json` and one build (`package.json:5–8`). No composition configuration (recorded search). |
| Q2 | No | There are not two units to assess. |
| Q3 | No | There is no host loading units; App Router serves pages of the application itself. |
| Q4 | No | No composition mechanism configured. |
| Q5 | No | Q1–Q4 converge. |

## Rationale

- `Non-MFE` under the rule “at least one question is No”. It matches “conventional frontend monoliths”.
- This is not even a case of “mentioning micro-frontends without implementing them”: the term does not appear in the repository, and the hit results from adjacent tokens on different lines (“Nova Micro)” / “**Frontend**”), as in the lexical false positive 261 (draft).
- `frontend_units: 1`, `single-unit`, `ui_technologies: [react]`. `build_tools: []`: Next.js encapsulates the bundler and there is no explicit configuration (empty `next.config.ts`). `repo_type: production`: production and staging domains (`README.md:5–9`) and deployment to AWS App Runner/CloudFront.
- There is no open decision.

## Analysis notes

- **RQ1 (misleading signals) / Protocol (search):** purely lexical false positive. Phrase `"micro frontend"` matches the juxtaposition of model name “Nova Micro” and label “Frontend” on the next line (`README.md:17–18`). GitHub phrase searches ignore punctuation and line breaks between tokens, potentially generating noise in infrastructure READMEs.
- **Protocol:** eligibility changes from `unknown` (001) to `pass` (002).
