---
schema: 1
id: 429000637
full_name: Tonel/technical-articles
url: https://github.com/Tonel/technical-articles
commit: e9ca1be4e8bd82ead194db60fd05add5d4ef5e64
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

# 151 — Tonel/technical-articles

## Context

A technical writer's personal portfolio: a single 1,185-line `README.md` with links to articles published on third-party blogs, grouped by outlet (`README.md:1–2`). Two links concern micro-frontends (`README.md:1120–1121`). There is no code. The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:152` records rank 151, ID 429000637, status `cloned`, branch `main` and the front matter commit, which is HEAD of the clone and `origin/main`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, with reading through `${SHA}:caminho` (the original placeholder means SHA:path). No installation, execution or network access occurred.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:152` records strategy `terminology` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID is in `data/discovery/mfe-round-001/candidates.csv:3278` (`unknown`) and `data/discovery/mfe-round-002/candidates.csv:3280` (`pass`).

A `sqlite3 -readonly` query of the `hits`, `queries` and `subqueries` tables from both rounds, filtered by ID, returns the same two hits in each round, from endpoint `repositories` with empty `path`:

| Query (`q`) | Subquery | Collection 001 / 002 (UTC) |
|---|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | `…#created:2021-11` | 2026-10-07T22:16:52.775Z / 2026-10-08T15:52:11.066Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | `…#created:2021-11` | 2026-10-07T22:47:02.757Z / 2026-10-08T16:03:54.572Z |

Effective queries append `pushed:>=2025-04-01 created:2021-11-01..2021-11-30`.

Hit metadata:
- description “All my technical articles”, no topics, null language, `fork: false`, size 1,268;
- created at 2021-11-17T10:26:30Z, pushed at 2026-10-04T13:19:47Z.

Without those spellings in the description, the most likely hypothesis by elimination is that the hit comes from the README, whose passages at the SHA are (unconfirmed hypothesis, since the SHA's README postdates searches):
- “Micro Frontend”: `README.md:1120` (“…Adopt a Micro Frontend Architecture”);
- “Micro Frontends”: `README.md:1121` (“5 Pitfalls of Using Micro Frontends…”).

**README at the SHA postdates searches.** SHA `e9ca1be` (2026-10-11T14:56:53+02:00, author and committer) modifies the README after collections on October 7 and 8, 2026. The hit's `pushed_at` (2026-10-04) corresponds to preceding commit `ade7166` (2026-10-04T15:19:47+02:00), the version current during searches. That version could not be read: blob `440873d7…` is missing from the partial clone and was not fetched. Whether lines 1120–1121 were already present was not verified. Both spellings at the SHA are compatible with the hits, and classification does not depend on this.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 1 entry, `README.md` (`100644`); zero symlinks and zero gitlinks. There is no code, manifest or configuration. | contrary |
| Documentation | `README.md:1–2`: “Technical Articles by Antonello Zanini”. The remainder is an external-link list by outlet. `README.md:1120–1121`: two micro-frontends articles on SitePoint. No original architecture text or implementation. | weak |
| Technology / Configuration / Composition (search) | With inventory reduced to the README, `grep -i` for `micro.?front`, `federation` and `single-spa` finds only `README.md:1120–1121`. No mechanism. | absent |

## Authorship and history

Non-shallow clone; 633 commits, no merges, all by Antonello Zanini `<66549111+Tonel@users.noreply.github.com>`, from 2021-11-17 (`db239ef`, “Create index.md”) to 2026-10-11 (SHA). Almost all are “Update README.md” through the web interface (GitHub committer). History is continuous updating of a publication list. No historical blob was read; the blob for version `ade7166` is missing, as described above.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | No frontend units; inventory is only the README. |
| Q2 | No | Without units, there are no entries or builds. |
| Q3 | No | No host, shell or root configuration. |
| Q4 | No | No composition mechanism; terms appear only in external article titles (`README.md:1120–1121`). |
| Q5 | No | Q1–Q4 are No: a list of article links. |

## Rationale

- `Non-MFE` under the rule “at least one question is No”. Matches “repositories mentioning micro-frontends without implementing them”.
- This is content, like 023, and a repository without implementation, like profiles 011/064/068/073/077/101/111, hence `frontend_units: 0` and `unit_organization: none`.
- `repo_type: other`: article portfolio, without application, example, template or library.
- No unresolved decision.

## Analysis notes

- **RQ1 (misleading signals):** article titles in a portfolio list suffice for exact-phrase terminology queries. They also pass filter `pushed:>=2025-04-01` because the list is frequently updated.
- **Protocol (snapshot):** the cloned commit (2026-10-11) postdates collection, and the searched version (`ade7166`) is unreadable in the partial clone. This does not affect classification, but the snapshot README is not exactly the one indexed by search.
- **Protocol (search):** eligibility changes from `unknown` (001) to `pass` (002).
- **Independent review contribution (Lupa):** agreement with Non-MFE and Q1–Q5 No (the snapshot is only a portfolio README with external links, without a unit, executable source, configuration or composition). Adopted correction: the SHA's README postdates collection, so titles in `README.md:1120–1121` prove the spellings are in the snapshot, not that they were in GitHub's indexed version during searches; the earlier blob is absent from the clone. Hit origin remains a hypothesis by eliminating name and description, with no effect on class.
