---
schema: 1
id: 1126172096
full_name: ranneechan-iso/ranneechan-iso
url: https://github.com/ranneechan-iso/ranneechan-iso
commit: cb14d4556172419d7b0b3ee1356fe95e3f79be44
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

# 243 — ranneechan-iso/ranneechan-iso

## Context

- **Repository type:** not a software project (GitHub profile README; repository description “My GitHub Profile”).

The snapshot contains only `README.md`, with personal introduction, badges, GIFs and an illustrative JavaScript object listing skills (`README.md:12–37`). “Micro-frontends” appears only in this list, in `architecture` (`README.md:24–28`). The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:244` records rank 243, ID 1126172096, status `cloned`, branch `main` and the front matter commit, which is the HEAD of the clone and of `origin/main`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. There was no installation, execution or network access.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:244` records strategy `terminology` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID appears in `data/discovery/mfe-round-001/candidates.csv:22723` (`terminology`, `unknown`) and `data/discovery/mfe-round-002/candidates.csv:22729` (`terminology`, `pass`).

A `sqlite3 -readonly` query against tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns the same two hits in each round, from endpoint `repositories`, with an empty `path`:

| Query (`q`) | Subquery | Collection 001 / 002 (UTC) |
|---|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | `terminology-micro-frontend-repositories#created:2026-01` | 2026-10-07T22:30:19.747Z / 2026-10-08T15:57:32.444Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | `terminology-micro-frontends-repositories#created:2026-01` | 2026-10-07T22:59:35.430Z / 2026-10-08T16:07:45.338Z |

The effective queries append `pushed:>=2025-04-01 created:2026-01-01..2026-01-31`.

Hit metadata (identical in both rounds): description “My GitHub Profile”, no topics, null language, `fork: false`, size 14, created at 2026-01-01T09:48:37Z, pushed at 2026-01-01T19:04:01Z.

The description does not contain the terms; the match comes from the README. The only matching spelling is “Micro-frontends” (`README.md:25`). Phrase search treats the hyphen as a separator, literally matching “micro frontends”. The singular form “micro frontend” does not appear literally; this hit depends on GitHub search text processing, which is not recorded.

The SHA (2026-01-02T02:04:00+07:00, that is, 2026-01-01T19:04:00Z) coincides with the recorded `pushed_at` and predates the October 2026 collections. The README at the SHA does not postdate the searches and is the indexed version.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 1 entry, `README.md`, regular file `100644`; zero symlinks and zero gitlinks. There is no manifest, code, build or assets. | absent |
| Documentation | `README.md:12–37`: Markdown code block (`javascript`) with profile object; `README.md:15` “Front-end Engineer”; `README.md:19` frontend stack (React, Next.js etc.); `README.md:24–28` `architecture: ["Micro-frontends", …]` as a listed skill. The block is introduction content, not versioned executable code. | weak |
| Technology / Configuration / Source code / Composition / Build/deploy | Nonexistent: the only file is the README; no federation, single-spa, import map, iframe or Web Components configuration. Relative imports between units do not apply (there is no code). | absent |

## Authorship and history

Non-shallow, partial clone (`blob:none`); 8 reachable commits (8 across all refs), no merges, all with author `NywnChan <habibrouf690@gmail.com>` and committer `GitHub` (editing through the web interface), from 2026-01-01T16:48:37+07:00 (`a47d029`, “Initial commit”) to SHA `cb14d45` (“Add footer section to README”). According to `git log --no-renames --name-status`, all commits only add or modify `README.md`. `git rev-list --objects $SHA --missing=print` identifies 7 missing objects: the `README.md` blobs from the 7 commits before the SHA. Therefore it was not possible to read historical versions or date the introduction of “Micro-frontends”; the SHA blob is present. Metadata indicates no content beyond the README at any point in history.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | No frontend unit; the repository has only `README.md` (inventory). |
| Q2 | No | There are no units with their own entry point or build. |
| Q3 | No | There is no host, shell or root config. |
| Q4 | No | No composition mechanism configured; “Micro-frontends” is a skills list item (`README.md:25`). |
| Q5 | No | Q1–Q4 converge. |

## Rationale

- `Non-MFE` under the rule “at least one question is No”. It matches “repositories mentioning micro-frontends without implementing them”.
- Same pattern as profiles 011/064/068/073/077/101/111: GitHub profile README in which micro-frontends appear as a professional skill, with `frontend_units: 0` and `unit_organization: none`.
- `repo_type: other` (profile, not a software project). Empty `ui_technologies` and `build_tools`: React, Next.js etc. are only declared skills.
- There is no open decision.

## Analysis notes

- **RQ1 (misleading signals):** “Micro-frontends” skill inside an illustrative JavaScript object in a Markdown code block; code searches do not capture it, but README search does.
- **Protocol (search):** the singular hit “micro frontend” has no literal spelling in the README. Eligibility changes from `unknown` (001) to `pass` (002). Pattern `owner == name` reinforces the automatic filter suggestion recorded in 011.
- **Protocol (partial clone):** historical README blobs are not in the clone; analysis relies on the SHA and commit metadata.
