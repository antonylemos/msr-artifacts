---
schema: 1
id: 1221149467
full_name: balbonits/coding-interview-reviewer
url: https://github.com/balbonits/coding-interview-reviewer
commit: 9b5689881e324f0c8d6c07423ba86bc5b3782430
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: other
approaches: []
ui_technologies: [react, next]
build_tools: []
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 194 — balbonits/coding-interview-reviewer

## Context

“Coding Interview Reviewer” (`README.md:1–5`): personal Next.js front-end interview preparation application, with live coding exercises (Sandpack), notes, MDX courses, AI mock interviewer and news feed. Built with a coding assistant, as README itself declares. Micro-frontends appear as study content: an “MFE Registry” exercise (`content/exercises/mfe-registry/`), a course and a note about microservices and micro-frontends. No frontend composition. The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:195` records rank 194, ID 1221149467, status `cloned`, branch `main` and the front matter commit, which is HEAD of the clone and `origin/main`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, with reading through `${SHA}:caminho` (the original placeholder means SHA:path). No installation, build, execution or network access occurred.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:195` records strategy `terminology` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID is in `data/discovery/mfe-round-001/candidates.csv:29042` (`unknown`) and `data/discovery/mfe-round-002/candidates.csv:29048` (`pass`).

A `sqlite3 -readonly` query of the `hits`, `queries` and `subqueries` tables from both rounds, filtered by ID, returns the same two hits in each round, from endpoint `repositories`, with subquery `…#created:2026-04` and empty `path`:

| Query (`q`) | Collection 001 / 002 (UTC) |
|---|---|
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | 2026-10-07T21:13:13.798Z / 2026-10-08T15:42:26.675Z |
| `terminology-microfrontends-repositories`: `microfrontends in:name,description,readme` | 2026-10-07T22:12:37.047Z / 2026-10-08T15:49:43.133Z |

Effective queries append `pushed:>=2025-04-01 created:2026-04-01..2026-04-30`.

Hit metadata:
- null description, no topics, language TypeScript, `fork: false`, size 1,162;
- created at 2026-04-25T20:21:07Z, pushed at 2026-05-05T06:02:31Z.

The hit comes from `README.md:61`, “| MFE Registry | Microfrontends — prefix router | vanilla-ts |”, an exercise table row and the only occurrence. The singular form “microfrontend” does not appear in README; that hit depends on GitHub search text processing, which is not recorded.

The README's last change is `1028925` (2026-04-26), before October 2026 collection. The SHA's README does not postdate searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 294 entries, 292 regular `100644` files and 2 executables `100755` (`scripts/dev.sh`, `scripts/restart-dev.sh`); zero symlinks and zero gitlinks. A single Next.js project (`app/`, `components/`, `lib/`, `next.config.ts`), content in `content/` (140 exercise files, 26 note files, 15 course files), Playwright tests and a SearXNG configuration. | contrary |
| Configuration / Build | `next.config.ts:3–5`: only `reactCompiler: true`. `package.json:5–40`: Next 16.2.4, React 19, Sandpack and MDX, without federation, single-spa or import map dependencies. | contrary |
| Content (search signal) | `content/exercises/mfe-registry/meta.json:1–8`: exercise “Micro-Frontend App Shell Registry” (template `vanilla-ts`). `content/exercises/mfe-registry/problem.mdx:1–25`: problem statement for class `MfeRegistry` (route registration and resolution), with `starter.ts`, `solution.ts` and `tests.ts`. Also `content/courses/microservices-microfrontends.mdx` and `content/notes/microservices-microfrontend.mdx`. Study material executed in the application sandbox. | weak |
| Search | `git grep -il` at the SHA (except `package-lock.json`) for `micro.?front`, `federation`, `remoteEntry` and `single-spa`: only README and files in `content/`. | absent |

## Authorship and history

Non-shallow clone; 46 commits, 1 merge, all by John Dilig `<balbonits@users.noreply.github.com>`, from 2026-04-25 (`61aadda`, “Initial commit: Day 1 + Day 2…”) to 2026-05-04 (SHA, “Code sandboxes (JS+Java) + typography + Compiler + notes + E2E”). `AGENTS.md`, `CLAUDE.md` and README statement (`README.md:5`) indicate AI-assisted generation; metadata does not distinguish intellectual authorship. No historical blob was read and no object was missing.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | A single frontend application; “MFE Registry” is a content exercise, rather than a unit or composition configuration. |
| Q2 | No | There is no second unit whose independence could be assessed. |
| Q3 | No | No host composes units. |
| Q4 | No | No configured composition mechanism (`next.config.ts:3–5`; recorded search). |
| Q5 | No | Q1–Q4 are No: study application whose content includes micro-frontend exercises and notes. |

## Rationale

- `Non-MFE` under the rule “at least one question is No”. Matches “repositories mentioning micro-frontends without implementing them”.
- Signal is content and exercises, as in 023 and 094: an “app shell registry” exercise solved in plain TypeScript within the sandbox is not frontend unit composition. A real application exists, hence `frontend_units: 1` and `single-unit`.
- `ui_technologies: [react, next]`, `build_tools: []` (Next encapsulates the bundler). `repo_type: other`: personal study tool.
- No decision remains open.

## Analysis notes

- **RQ1 (misleading signals):** exercise named “MFE Registry” and micro-frontend courses in a study app; README matches terminology queries through its exercise table.
- **Protocol (search):** singular hit `microfrontend` has no literal spelling in README. Eligibility changes from `unknown` (001) to `pass` (002).
- **Independent review contribution (Lupa):** agreement with Non-MFE and `draft`: one Next.js application, with microfrontend teaching content and an `MfeRegistry` exercise executed in the application's own code sandbox, without a remote frontend unit or configuration composing applications. Identified gaps concern evidence in the record, rather than architectural ambiguity.
