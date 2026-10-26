---
schema: 1
id: 609925864
full_name: reza-talebii/travel-agency
url: https://github.com/reza-talebii/travel-agency
commit: 92756e2cf13da1a03cdcc16d03bcc6c3e0f6be05
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

# 180 — reza-talebii/travel-agency

## Context

Full stack travel agency project: a Next.js 13 frontend (App Router) in `clients/main/` and a Node/Express API in `server/` (`README.md:3–7`). The README lists “micro front” as a feature (`README.md:12`), and `@module-federation/nextjs-mf` is declared in the client's `package.json` (`clients/main/package.json:13`). But Next configuration does not use the plugin (`clients/main/next.config.js:1–8`) and only one client exists in `clients/`. The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:181` records rank 180, ID 609925864, status `cloned`, branch `main` and the front matter commit, which is HEAD of the clone and `origin/main`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, with reading through `${SHA}:caminho` (the original placeholder means SHA:path). No installation, build, execution or network access occurred.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:181` records strategy `terminology` and eligibility `unknown`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID is in `data/discovery/mfe-round-001/candidates.csv:5632` (`pass`) and `data/discovery/mfe-round-002/candidates.csv:5637` (`unknown`).

A `sqlite3 -readonly` query of the `hits`, `queries` and `subqueries` tables from both rounds, filtered by ID, returns one hit per round, from endpoint `repositories` and with empty `path`:

| Query (`q`) | Subquery | Effective query | Collection 001 / 002 (UTC) |
|---|---|---|---|
| `terminology-topic-microfrontend`: `topic:microfrontend` | `terminology-topic-microfrontend` (unpartitioned) | `topic:microfrontend pushed:>=2025-04-01` | 2026-10-07T18:18:27.988Z / 2026-10-08T15:34:14.267Z |

Hit metadata:
- description “…ull stack airline agency project with next js, typescript, nodejs”;
- topics `axios`, `figma`, `microfrontend`, `nextjs`, `nextjs13`, `nodejs`, `react`, `storybook`, `styled-components` and `typescript`;
- language TypeScript, `fork: false`, size 16,631;
- created at 2023-03-05T16:42:49Z, pushed at 2026-06-08T16:22:57Z.

The hit comes from the repository's declared topic `microfrontend`, rather than the README. The README's only related spelling is “micro front” (`README.md:12`). The README's last change is the SHA itself, `92756e2` (2026-06-08), before October 2026 collection. The SHA's README does not postdate searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 273 entries, all regular `100644` files; zero symlinks and zero gitlinks. There are `README.md`, `clients/main/` (only directory in `clients/`, a Next.js app with `app/`, `components/`, `layout/`, `modules/`, `services/` etc.) and `server/` (Express with controllers, routes and data access). | contrary |
| Configuration | `clients/main/package.json:13`: `@module-federation/nextjs-mf` ^6.1.3 declared. `clients/main/next.config.js:1–8`: only `experimental.appDir`, without `NextFederationPlugin`. `git grep` at the SHA (except lockfiles) for `NextFederationPlugin`, `nextjs-mf`, `remoteEntry`, `federation` and `micro.?front` finds only `package.json:13` and `README.md:12`. Declared, unused dependency. | contrary |
| Source code (boundaries) | `clients/main` imports stay inside the project; searching for `../../../` imports returns nothing. Design system comes from npm packages (`golobe-design-system`, `golobe-ui`, `clients/main/package.json:24–25`), without a frontend unit referenced by composition. | context |
| Documentation | `README.md:10–16`: planned or implemented features (“micro front”, “next13 app dir”, design system library, multilanguage, storybook) and a design system repository link. Project calls itself “being developed” (`README.md:7`). | weak |

## Authorship and history

Non-shallow clone. There are 54 commits across all refs, with 4 merges, by the same owner: “reza_talebi” (43), “reza talebi” (3) and noreply identity (8). Root is `c94af4c` (2023-03-05). Code development dates from 2023. The default branch's last three commits (`f84419d`, `10792a7` and SHA `92756e2`, from 2026-05 and 2026-06) change only the README; they added proxy configuration lines unrelated to the project (`README.md:37–53`), not reproduced here. These commits keep `pushed_at` recent. Branches `arbitazh`, `bank-account`, `design-stysm`, `implemet-signUp`, `landing` and `server` were not considered. `git log -S` on `nextjs-mf` did not complete because of a missing blob in the partial clone (`e43d057d…`), which was not fetched; the clone remained unchanged.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | A single frontend unit (`clients/main`); no composition configuration references other units. |
| Q2 | No | There is no second frontend unit whose independence could be assessed; `server/` is backend. |
| Q3 | No | No host composes units. |
| Q4 | No | The federation plugin is only declared (`clients/main/package.json:13`) and unconfigured (`next.config.js:1–8`): “A declared dependency alone is No”. |
| Q5 | No | Q1–Q4 are No: Next.js app with an unimplemented declared micro-frontend intention. |

## Rationale

- `Non-MFE` under the rule “at least one question is No”. Matches “MFE-related dependencies that are unused or experimental” and “repositories mentioning micro-frontends without implementing them”.
- A real application exists, hence `frontend_units: 1` and `single-unit`. `ui_technologies: [react, next]`, `build_tools: []` (Next encapsulates the bundler). `repo_type: other`: full stack project under development (README does not identify it as a tutorial, example or proof of concept, and the earlier “personal portfolio project” description is unsupported by cited sources).
- Not an incomplete host, as in 097/103/104: no `remotes` configuration or remote module consumption exists to assess.
- No decision remains open.

## Analysis notes

- **RQ1 (misleading signals):** topic `microfrontend` and declared, unused `@module-federation/nextjs-mf` dependency. Entry is through topic query, rather than content.
- **Protocol (eligibility):** eligibility goes from `pass` (001) to `unknown` (002), unlike the more common pattern, and the reason is in data: in round 002 rule `recent-push` passes and `recent-human-commit` is `unknown` due to `activity_incomplete` (pending `commit_history` coverage), i.e., incomplete collection, rather than architectural uncertainty. Recent `pushed_at` comes from README edits unrelated to the project.
- **Protocol (content):** the SHA's README contains proxy configuration strings added in 2026, and commits show the README was changed, but do not demonstrate who inserted content or why; account misuse is a speculative hypothesis and is not asserted. Passages were not copied.
- **Independent review contribution (Lupa):** agreement with Non-MFE and Q1–Q5 No (one Next.js application in `clients/main` and an Express backend in `server`, without a second unit, host or composition mechanism; Module Federation dependency and README are search signals, rather than integration evidence) and with `draft`. Adopted disagreements: `repo_type` changed from `example` to `other`, due to missing example evidence; the reason for round 002 `unknown` (`activity_incomplete`, verified in `candidates.csv:5637`) was recorded; and the account misuse hypothesis, from proxy text at `README.md:37–53`, was qualified as speculative. Complete per-directory authorship remains limited by the partial clone.
