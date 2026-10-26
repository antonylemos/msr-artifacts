---
schema: 1
id: 294506410
full_name: IsaacAlves7/js
url: https://github.com/IsaacAlves7/js
commit: 783471e1f8e13dfaf4a623ea613bcb19027cb282
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: other
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

# 167 — IsaacAlves7/js

## Context

JavaScript and TypeScript study repository. Its central content is a 1,202-line README, Portuguese teaching material presenting the author and links to other study repositories (`README.md:1–10`, `23`). It accompanies standalone exercises in `js/` and `TypeScript/`, Deno examples (`Deno/`) and a course GraphQL API (`graphql-api/`). Micro-frontends appear once, as the author's field of work (`README.md:23`). The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:168` records rank 167, ID 294506410, status `cloned`, branch `master` and the front matter commit, which is HEAD of the clone and `origin/master`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, with reading through `${SHA}:caminho` (the original placeholder means SHA:path). No installation, execution or network access occurred.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:168` records strategy `terminology` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID is in `data/discovery/mfe-round-001/candidates.csv:1382` (`unknown`) and `data/discovery/mfe-round-002/candidates.csv:1381` (`pass`).

A `sqlite3 -readonly` query of the `hits`, `queries` and `subqueries` tables from both rounds, filtered by ID, returns the same two hits in each round, from endpoint `repositories`, with subquery `…#created:2020-09` and empty `path`:

| Query (`q`) | Collection 001 / 002 (UTC) |
|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | 2026-10-07T22:15:56.090Z / 2026-10-08T15:51:39.765Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | 2026-10-07T22:45:38.815Z / 2026-10-08T16:03:26.342Z |

Effective queries append `pushed:>=2025-04-01 created:2020-09-01..2020-09-30`.

Hit metadata:
- description “📜 It's a repository of JavaScript and TypeScript (JS/TS) programming language and his content.”, without the terms;
- 20 topics (`javascript`, `reactjs`, `angular`, `vuejs`, `webpack`, `typescript` etc.), none about MFE;
- language JavaScript, `fork: false`, size 9,661;
- created at 2020-09-10T19:41:51Z, pushed at 2026-05-28T19:36:49Z.

The hit comes from `README.md:23`, “…trabalhando com arquitetura de micro-frontends…” (English translation: “…working with micro-frontend architecture…”), hyphenated and the only occurrence. Phrase search treats the hyphen as a separator. The singular form “micro frontend” does not appear literally; that hit depends on GitHub search text processing, which is not recorded.

The README's last change is the SHA itself, `783471e` (2026-05-28), before October 2026 collection. The SHA's README does not postdate searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 50 entries, all regular `100644` files; zero symlinks and zero gitlinks. There are `README.md`, `.gitignore` and four directories: `js/` (numbered exercises, for example “1) Visita na Feira.js”, English translation: “Visit to the Market.js”; `heapSort.js`), `TypeScript/` (syntax examples with `package.json` containing only `ts-node`/`typescript`), `Deno/` (scripts and a REST API) and `graphql-api/` (course Node/Apollo API, `package.json` with repository `alura-cursos/1922-graphql`). `graphql-api/index.html` has 0 bytes. No frontend application. | contrary |
| Documentation | `README.md:1–10`: links to other study repositories and title “It's a repository of JavaScript (JS)”. `README.md:23`: professional presentation with “arquitetura de micro-frontends” (English translation: “micro-frontend architecture”). The remainder is teaching material. | weak |
| Technology / Configuration / Composition (search) | `git grep -i` at the SHA (except lockfiles and README) for `federation`, `remoteEntry`, `single-spa` and `registerApplication`: no results. In the README, `micro.?front` appears only at `README.md:23`. | absent |

## Authorship and history

Non-shallow clone. There are 4,001 commits across all refs, but only 2,047 reachable from the SHA, with 1 merge. All by the same owner: “Isaac Alves Pinheiro” (2,030), “Isaac Alves” (14) and “IsaacAlves7” (3). Root is `254a10f` (2020-09-10, “first commit”). Most frequent messages are “Update README.md” (2,010), through web editing. Branches `Ionic`, `TS`, `angular`, `data-structure`, `electron`, `exercises` and `jQuery` were not considered. `git log -S` on the README did not complete because of a missing blob in the partial clone (`b259189e…`), which was not fetched; the clone remained unchanged.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | No frontend unit in the snapshot; only exercises, Deno scripts and a Node API. No composition configuration. |
| Q2 | No | Without frontend units, there are no entries or builds to assess. |
| Q3 | No | No host, shell or root configuration. |
| Q4 | No | No composition mechanism (recorded search). |
| Q5 | No | Q1–Q4 are No: study repository mentioning micro-frontends once as a field of work. |

## Rationale

- `Non-MFE` under the rule “at least one question is No”. Matches “repositories mentioning micro-frontends without implementing them”.
- Content and exercises, as in 023, without a frontend unit, like profiles 011/064/068/073/077/101/111. Hence `frontend_units: 0`, `unit_organization: none`, `repo_type: other`, `ui_technologies: []` and `build_tools: []`.
- No decision remains open.

## Analysis notes

- **RQ1 (misleading signals):** extensive teaching README, frequently updated through the web, with a single micro-frontends mention in the author's presentation. Filter `pushed:>=2025-04-01` is satisfied by README edits.
- **Protocol (search):** singular hit `"micro frontend"` has no literal spelling. Eligibility changes from `unknown` (001) to `pass` (002).
- **Independent review contribution (Lupa):** full agreement with Non-MFE, Q1–Q5 No, `other`, zero units and `none`; no open decision (`draft`). The repository is study material (JavaScript/TypeScript exercises, scripts and backend APIs), and `micro-frontends` (`README.md:23`, only `micro.?front` occurrence) is professional self-description. Supporting Q1 through Q5 citations: `README.md:23`, `TypeScript/index.ts:1–7`, `Deno/Deno REST API/index.ts:1–9` and `graphql-api/package.json:5–13`; absence of units follows from the SHA's `git ls-tree` inventory (`graphql-api/index.html` is an empty blob, without lines). In `graphql-api/package.json`, `main` points to an `index.js` absent from the package root, whereas script `start` points to `api/index.js`, which exists, but uses undefined `typeDefs` and `resolvers` and does not start the server (`graphql-api/package.json:5–8`; `graphql-api/api/index.js:1–14`). Badges at `README.md:1` lead to other branches and repositories, navigation rather than composition at the classified SHA, the only classified commit (not all refs). Plural hit provenance: the README has only hyphenated `micro-frontends`; by elimination of name and description the README is the plausible source, and search normalization is not in the databases. Historical `git log -S` search failed because of a missing promisor blob (`b259189…`); the blob was not fetched and the mention's creation date was not inferred.
