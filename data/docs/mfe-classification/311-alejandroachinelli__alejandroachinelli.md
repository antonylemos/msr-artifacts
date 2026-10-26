---
schema: 1
id: 1239821984
full_name: alejandroachinelli/alejandroachinelli
url: https://github.com/alejandroachinelli/alejandroachinelli
commit: 6b51d0d82f932743d0d4e219d8eba77fad4b98dc
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

# 311 — alejandroachinelli/alejandroachinelli

## Context

- **Repository type:** not a software project (Spanish GitHub profile README).

Snapshot contains only `README.md`, with professional presentation, experience and stack. “Microfrontends” appears as a task performed at a previous job (“Microfrontends con React + Webpack”, English translation: “Microfrontends with React + Webpack”; `README.md:25`). The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:312` records rank 311, ID 1239821984, status `cloned`, branch `main` and the front matter commit, which is HEAD of the clone and `origin/main`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, with reading through `${SHA}:caminho` (the original placeholder means SHA:path). No installation, execution or network access occurred.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:312` records strategy `terminology` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID is in `data/discovery/mfe-round-001/candidates.csv:30132` (`terminology`, `unknown`) and `data/discovery/mfe-round-002/candidates.csv:30139` (`terminology`, `pass`).

A `sqlite3 -readonly` query of the `hits`, `queries` and `subqueries` tables from both rounds, filtered by ID, returns the same two hits in each round, from endpoint `repositories` and with empty `path`:

| Query (`q`) | Subquery | Collection 001 / 002 (UTC) |
|---|---|---|
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | `terminology-microfrontend-repositories#created:2026-05` | 2026-10-07T21:51:22.008Z / 2026-10-08T15:42:43.341Z |
| `terminology-microfrontends-repositories`: `microfrontends in:name,description,readme` | `terminology-microfrontends-repositories#created:2026-05` | 2026-10-07T22:12:45.060Z / 2026-10-08T15:49:51.653Z |

Effective queries append `pushed:>=2025-04-01 created:2026-05-01..2026-05-31`.

Hit metadata (same in both rounds): null description, no topics, null language, `fork: false`, size 5, created at 2026-05-15T13:29:56Z, pushed at 2026-05-15T15:57:54Z.

Without a description, hit comes from README. Only corresponding spelling is “Microfrontends” (`README.md:25`), literally matching `microfrontends`. Singular form `microfrontend` does not appear literally; that hit depends on GitHub search text processing, which is not recorded.

SHA (2026-05-15T12:57:50-03:00, i.e., 15:57:50Z) is README's last change, coincides with `pushed_at` and precedes October 2026 collection. The SHA's README does not postdate searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 1 entry, `README.md`, regular `100644` file; zero symlinks and zero gitlinks. No code, manifest or build. | absent |
| Documentation | `README.md:1–12`: introduction as .NET and React developer; `README.md:20–28`: experience table, with “Microfrontends con React + Webpack” (English translation: “Microfrontends with React + Webpack”) at Ensitech (`:25`); `README.md:32–90`: badge stack; `README.md:94–107`: portfolio with a .NET API in another repository. | weak |
| Technology / Configuration / Source code / Composition / Build/deploy | Nonexistent; no federation, single-spa, import map, iframe or Web Components configuration. Relative imports between units do not apply (no code). | absent |

## Authorship and history

Non-shallow, partial clone (`blob:none`). 3 commits (3 across all refs), no merges, all by `Alejandro Martin Achinelli <alejandromartin.achinelli@gmail.com>` as author and committer, on 2026-05-15 (`5b808f5`, `5ad5082` and SHA `6b51d0d`). According to `git log --no-renames --name-status`, one commit adds and two modify `README.md`. `git rev-list --objects $SHA --missing=print` lists 2 missing objects, none in SHA tree (earlier README versions).

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | No frontend unit; only `README.md` (inventory). |
| Q2 | No | No units. |
| Q3 | No | No host, shell or root config. |
| Q4 | No | No composition mechanism; “Microfrontends” is declared professional experience (`README.md:25`). |
| Q5 | No | Q1–Q4 converge. |

## Rationale

- `Non-MFE` under the rule “at least one question is No”. Matches “repositories mentioning micro-frontends without implementing them”.
- Same pattern as profiles 011/064/068/073/077/101/111; `frontend_units: 0`, `unit_organization: none`, `repo_type: other`, empty technology arrays.
- No decision remains open.

## Analysis notes

- **Protocol (search):** singular hit `microfrontend` has no literal README spelling. Eligibility changes from `unknown` (001) to `pass` (002). Pattern `owner == name` reinforces automatic filter suggestion recorded in 011.
