---
schema: 1
id: 836965517
full_name: hyperse-io/next.js-turborepo-starter
url: https://github.com/hyperse-io/next.js-turborepo-starter
commit: ef0bd28bb8b9b387b246603bdd0670ab250e520d
classification: Non-MFE
checklist: { q1: yes, q2: yes, q3: no, q4: no, q5: no }
repo_type: template
approaches: []
ui_technologies: [react, next]
build_tools: []
frontend_units: 2
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 357 — hyperse-io/next.js-turborepo-starter

## Context

Next.js monorepo starter with Turborepo, Yarn 4, next-intl, Tailwind and quality tools (`README.md:1–23`). Two independent Next.js applications, `apps/web` (port 4001) and `apps/docs` (port 3001), and two internal packages (`packages/core`, `packages/utils`). Micro-frontends appear only in the final section, referring to another repository: “Multi Zones are an approach to micro-frontends…” with a link to `hyperse-io/next.js-multi-zone-starter` (`README.md:72–76`). This repository has no `rewrites`, `basePath` or other connection between apps. The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:358` records rank 357, ID 836965517, status `cloned`, branch `main` and the front matter commit, which is the HEAD of the clone and of `origin/main`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. There was no installation, build, execution or network access.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:358` records strategy `terminology` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID appears in `data/discovery/mfe-round-001/candidates.csv:9320` and `data/discovery/mfe-round-002/candidates.csv:9326`, both with `pass`.

A `sqlite3 -readonly` query against tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns the same two hits in each round, from endpoint `repositories`, with subquery `…#created:2024-08` and an empty `path`:

| Query (`q`) | Collection 001 / 002 (UTC) |
|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | 2026-10-07T22:19:24.681Z / 2026-10-08T15:53:22.516Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | 2026-10-07T22:50:26.114Z / 2026-10-08T16:05:01.569Z |

The effective queries append `pushed:>=2025-04-01 created:2024-08-01..2024-08-31`.

Hit metadata:
- description “Best practices on using Next.js in a TypeScript monorepo”;
- topics `hyperse`, `n`, `nexjts-starter`, `nextjs-monorepo`, `nextjs-turborepo`, language TypeScript, `fork: false`, size 3.736;
- created at 2024-08-01T23:47:34Z, pushed at 2025-04-24T06:14:17Z.

The only spelling is “micro-frontends”, in `README.md:74`. The singular does not appear literally; this hit depends on GitHub search text processing, which is not recorded. The last README change is `564e3fc` (2024-08-02), before the October 2026 collections. The README at the SHA does not postdate the searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 122 entries, 119 regular files `100644` and 3 executables `100755` (`.husky/commit-msg`, `.husky/pre-commit`, `.yarn/releases/yarn-4.9.1.cjs`); zero symlinks and zero gitlinks. There are `apps/web` (38 files), `apps/docs` (21), `packages/core` (18), `packages/utils` (14), `turbo.json` and quality configs. | context |
| Applications | `apps/web/next.config.mjs:1–65`: next-intl, bundle analyzer, svgr and validated env; no `rewrites`, `basePath` or `assetPrefix`. `apps/docs/next.config.mjs:1–4`: empty config. Own ports in `apps/*/package.json` (`docs` 3001, `web` 4001). | contrary |
| Mechanism search | `git grep` in `apps/` and `packages/` for `rewrites`, `basePath`, `assetPrefix`, `zones`, `federation`, `iframe` and `micro.?front`: nothing. | absent |
| Source code (boundaries) | Imports with `../../` go to root configs (`lint-staged.common.mjs`) or app files (`apps/web/src/types.d/next-intl.d.ts:3` → `messages/en.json`). Common code comes from workspace packages `@hyperse/core` and `@hyperse/utils` (`apps/*/package.json`). | context |
| Documentation | `README.md:72–76`: Multi-Zones cited only as a reference to another starter; no multi-zones here. | contrary |

## Authorship and history

Non-shallow clone:
- **Commits:** 11 across all refs, 1 merge, from 2024-08-02 to 2025-04-24 (SHA `ef0bd28`, “chore: update demo”).
- **Authors:** `tianyingchun` (9), “Yingchun Tian” (1, through the GitHub interface) and `github-actions[bot]` (1).
- **Branches:** also `origin/changeset-release/main`, not considered.

No historical blob was read and there was no missing object.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | Yes | Two identifiable frontend applications in the repository (`apps/web`, `apps/docs`). |
| Q2 | Yes | Each app has its own `package.json`, `next.config.mjs`, port and build, without code import between apps. |
| Q3 | No | No host, shell or root configuration loads, mounts or routes the apps. |
| Q4 | No | No composition mechanism configured. Multi-Zones cited only as an external reference (`README.md:72–76`). |
| Q5 | No | Two independent applications in a monorepo, without composition. |

## Rationale

- `Non-MFE` under the rule “at least one question is No”. It matches “monorepos containing several unrelated frontend applications”.
- Unlike 013, 237 and 273 (multi-zones with `rewrites`), here there is no zone configuration.
- **Fields:** `approaches: []`, `ui_technologies: [react, next]`, `build_tools: []` (Next.js without explicit bundler, as in 013), `frontend_units: 2`, `unit_organization: monorepo`, `repo_type: template` (declared starter).
- There is no open decision.

## Analysis notes

- **RQ1 (misleading signals):** link to another Multi-Zones starter described as “approach to micro-frontends” matches terminology queries.
- **Protocol (sample):** cited multi-zones starter (`hyperse-io/next.js-multi-zone-starter`) does not appear among round 002 candidates. The same organization has `hyperse-io/hps` in the rounds, outside the sample.
- **Protocol (search):** the singular hit has no literal spelling. Eligibility `pass` in both rounds.
