---
schema: 1
id: 543529019
full_name: RickyFirmansyah27/Portofolio
url: https://github.com/RickyFirmansyah27/Portofolio
commit: 9857e49192f6f0a74f3af660076f4fdb490aea9a
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

# 314 — RickyFirmansyah27/Portofolio

## Context

- **Repository type:** not a software project. Personal presentation README (description “About Me”) with PDF résumé and SVG icons.

“Microfrontend Architecture” appears as technology used at a previous job (`README.md:33–35`). Unlike `owner/owner` profiles, repository has a distinct name, but content is the same type. The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:315` records rank 314, ID 543529019, status `cloned`, branch `main` and the front matter commit, which is HEAD of the clone and `origin/main`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, with reading through `${SHA}:caminho` (the original placeholder means SHA:path). No installation, execution or network access occurred.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:315` records strategy `terminology` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID is in `data/discovery/mfe-round-001/candidates.csv:4860` and `data/discovery/mfe-round-002/candidates.csv:4864`, both with `terminology` and `pass`.

A `sqlite3 -readonly` query of the `hits`, `queries` and `subqueries` tables from both rounds, filtered by ID, returns the same two hits in each round, from endpoint `repositories` and with empty `path`:

| Query (`q`) | Subquery | Collection 001 / 002 (UTC) |
|---|---|---|
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | `terminology-microfrontend-repositories#created:2022-09` | 2026-10-07T18:21:38.287Z / 2026-10-08T15:36:15.666Z |
| `terminology-microfrontends-repositories`: `microfrontends in:name,description,readme` | `terminology-microfrontends-repositories#created:2022-09` | 2026-10-07T22:05:46.292Z / 2026-10-08T15:45:52.727Z |

Effective queries append `pushed:>=2025-04-01 created:2022-09-01..2022-09-30`.

Hit metadata (same in both rounds): description “About Me”, no topics, null language, `fork: false`, size 283, created at 2022-09-30T09:40:06Z, pushed at 2025-05-06T15:56:05Z.

Description lacks terms; hit comes from README. Only corresponding spelling is “Microfrontend” (`README.md:34`, “…Microservice Architecture, Microfrontend”, continuing at `:35` with “Architecture.”), literally matching `microfrontend`. Plural form `microfrontends` does not appear; that hit depends on GitHub search text processing, which is not recorded.

SHA (2025-05-06T22:56:05+07:00, i.e., 15:56:05Z) is README's last change, coincides with `pushed_at` and precedes October 2026 collection. The SHA's README does not postdate searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 17 entries, all regular `100644` files; zero symlinks and zero gitlinks. `README.md`, `RickyFirmansyah.pdf` and 15 SVG icons in `img/`. No code, manifest or build. | absent |
| Documentation | `README.md:8–10`: introduction; `README.md:24–35`: professional experience, with “Microfrontend Architecture” among technologies used at PT. Dans Multi Pro (`:33–35`); `README.md:43–88`: skill badges; `README.md:100–118`: projects published at other addresses. | weak |
| Technology / Configuration / Source code / Composition / Build/deploy | Nonexistent; no federation, single-spa, import map, iframe or Web Components configuration. Relative imports between units do not apply (no code). | absent |

## Authorship and history

Non-shallow, partial clone (`blob:none`). 18 commits (18 across all refs), no merges, all by `Ricky Firmansyah <110955695+RickyFirmansyah27@users.noreply.github.com>` with committer `GitHub` (web interface edits and uploads), from 2022-09-30 (`a4b324a`, “Initial commit”) to SHA (2025-05-06, “Update README.md”). According to `git log --no-renames --name-status`, commits add README, PDF and icons, and 15 modify `README.md`. `git rev-list --objects $SHA --missing=print` lists 15 missing objects, none in SHA tree (earlier README versions); term introduction could not be dated.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | No frontend unit: only README, PDF and icons (inventory). |
| Q2 | No | No units. |
| Q3 | No | No host, shell or root config. |
| Q4 | No | No composition mechanism; “Microfrontend Architecture” is a technology cited in professional experience (`README.md:33–35`). |
| Q5 | No | Q1–Q4 converge. |

## Rationale

- `Non-MFE` under the rule “at least one question is No”. Matches “repositories mentioning micro-frontends without implementing them”.
- Same pattern as profiles 011/064/068/073/077/101/111 (presentation README with micro-frontends as skill or experience), here in a distinctly named repository instead of `owner/owner`.
- `frontend_units: 0`, `unit_organization: none`, `repo_type: other`, empty technology arrays.
- No decision remains open.

## Analysis notes

- **Protocol (search/filter):** profile pattern also occurs outside `owner == name` (description “About Me”). An automatic name-only filter would miss this case.
- **Protocol (search):** plural hit `microfrontends` has no literal README spelling. Eligibility is `pass` in both rounds.
