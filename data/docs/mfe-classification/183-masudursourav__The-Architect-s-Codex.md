---
schema: 1
id: 1376740344
full_name: masudursourav/The-Architect-s-Codex
url: https://github.com/masudursourav/The-Architect-s-Codex
commit: b8bca2f1bd65a01e5b63a056975aef3fcdfc5713
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

# 183 — masudursourav/The-Architect-s-Codex

## Context

“The Architect's Codex” (`README.md:1–9`): Next.js application serving as an interactive frontend and backend system design book. Chapter content lives in TypeScript data modules (`src/data/*.ts`). One chapter concerns micro-frontends and includes a `ModuleFederationPlugin` configuration as an example string (`src/data/frontendTopics.ts:1031–1080`). No frontend composition: the repository is a single content application. The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:184` records rank 183, ID 1376740344, status `cloned`, branch `master` and the front matter commit, which is HEAD of the clone and `origin/master`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, with reading through `${SHA}:caminho` (the original placeholder means SHA:path). No installation, build, execution or network access occurred.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:184` records strategy `technology` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID is in `data/discovery/mfe-round-001/candidates.csv:37578` (`unknown`) and `data/discovery/mfe-round-002/candidates.csv:37610` (`pass`).

A `sqlite3 -readonly` query of the `hits`, `queries` and `subqueries` tables from both rounds, filtered by ID, returns one hit per round, from endpoint `code`:

| Query (`q`) | Subquery | `path` | Collection 001 / 002 (UTC) |
|---|---|---|---|
| `technology-module-federation-plugin-ts-code`: `ModuleFederationPlugin remotes extension:ts` | `…#size:>=10000` | `src/data/frontendTopics.ts` | 2026-10-07T22:40:54.148Z / 2026-10-08T16:19:55.118Z |

The matched file has 335,660 bytes at the SHA, within the range. It contains `ModuleFederationPlugin` inside the example template literal (`src/data/frontendTopics.ts:1068`; also `:2864`) and “remotes” in chapter text (`:1132`, `1162`). Code hit metadata lacks description, topics and dates. The hit does not depend on the README, which mentions neither micro-frontends nor Module Federation; it comes from root commit `e80e4e0` (2026-09-19) and was never changed afterward, preceding October 2026 collection.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 34 entries, all regular `100644` files; zero symlinks and zero gitlinks. A single Next.js project (App Router): `src/app/`, `src/components/` (navigation, `TopicView`, interactive simulators), `src/data/` (content) and `next.config.ts`. | contrary |
| Configuration / Build | `next.config.ts:3–5`: empty configuration. `package.json:5–21`: `next` 16.3.5, React 19.2.8, without a federation dependency. | contrary |
| Content (search signal) | `src/data/frontendTopics.ts:1031–1043`: topic `microfrontends-design-systems`. `:1062–1080`: `codeSnippet` captioned “Webpack Module Federation Configuration Example” and remote `webpack.config.js` code as a string. `:1097–1167`: micro-frontend case studies and interview tips. `:2864`, `2878`: mentions in another chapter. Teaching material displayed by the application, rather than repository configuration. | weak |
| Search | `git grep` at the SHA, in `src`, for `ModuleFederationPlugin`, `remotes` and `micro.?front`: only content text above. | absent |

## Authorship and history

Non-shallow clone; 3 commits, no merges, all by Masudur Rahman Sourav `<it19025@mbstu.ac.bd>`: `e80e4e0` (2026-09-19, “complete guide”), `4d164d2` (2026-09-23, “zoom on diagram”) and SHA `b8bca2f` (2026-09-25, “style updated”). No historical blob was read and no object was missing.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | A single frontend application; no actual composition configuration. Federation configuration is chapter text. |
| Q2 | No | There is no second unit whose independence could be assessed. |
| Q3 | No | No host composes units. |
| Q4 | No | No configured mechanism (`next.config.ts:3–5`); `ModuleFederationPlugin` exists only inside a string (`src/data/frontendTopics.ts:1068`). |
| Q5 | No | Q1–Q4 are No: system design content application. |

## Rationale

- `Non-MFE` under the rule “at least one question is No”. Matches “repositories mentioning micro-frontends without implementing them”.
- The signal is teaching content, as in 023: an MF configuration example embedded in chapter data captures code search. A real application exists, hence `frontend_units: 1` and `single-unit`.
- `ui_technologies: [react, next]`, `build_tools: []` (Next encapsulates the bundler). `repo_type: other`: interactive digital book, without the character of an MFE example, template or library.
- No decision remains open.

## Analysis notes

- **RQ1 (misleading signals):** code search `ModuleFederationPlugin remotes extension:ts` matches an example string in a 335 KB `.ts` data file. A code search false positive from textual content within source code.
- **Protocol (search):** entry only through code search, in range `size:>=10000`. Eligibility changes from `unknown` (001) to `pass` (002).
- **Independent review contribution (Lupa):** full agreement with Non-MFE and Q1–Q5 No; no disagreement or open decision (`draft`). Decision rests on commit content (one Next.js application), rather than only README or keywords. `repo_type: other` describes an interactive reference, rather than an MFE product, MFE example, template or library; `build_tools: []` is consistent with no explicitly configured unit bundler.
