---
schema: 1
id: 444043628
full_name: nikhilrajnair/nikhilrajnair
url: https://github.com/nikhilrajnair/nikhilrajnair
commit: 1338fe6af62c0cdb149009dcd43963698bdcc26c
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

# 295 — nikhilrajnair/nikhilrajnair

## Context

- **Repository type:** not a software project. GitHub profile README (repository `<user>/<user>`, description “My Personal Details”), with professional presentation, skills and contact links. Owner/name equality is recorded only as repository type, rather than architectural evidence.

`data/samples/mfe-sample-001/clones.csv:296` records rank 295, ID 444043628, status `cloned`, branch `main` and the front matter commit, which is HEAD of the clone and `origin/main`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, with reading through `${SHA}:caminho` (the original placeholder means SHA:path). No installation, execution or network access occurred.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:296` records strategy `terminology` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID is in `data/discovery/mfe-round-001/candidates.csv:3481` and `data/discovery/mfe-round-002/candidates.csv:3483`, both with `terminology` and `pass`.

A `sqlite3 -readonly` query of the `hits`, `queries` and `subqueries` tables from both rounds, filtered by ID, returns the same two hits in each round, from endpoint `repositories`, with empty `path`:

| Query (`q`) | Subquery | Effective query | Collection 001 / 002 (UTC) |
|---|---|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | `terminology-micro-frontend-repositories#created:2022-01` | `"micro frontend" in:name,description,readme pushed:>=2025-04-01 created:2022-01-01..2022-01-31` | 2026-10-07T22:17:01.804Z / 2026-10-08T15:52:15.597Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | `terminology-micro-frontends-repositories#created:2022-01` | `"micro frontends" in:name,description,readme pushed:>=2025-04-01 created:2022-01-01..2022-01-31` | 2026-10-07T22:47:12.936Z / 2026-10-08T16:03:58.890Z |

Hit metadata: description “My Personal Details”, no topics, null language, no license, `fork: false`, size 39, created at 2022-01-03T11:54:46Z, pushed at 2026-05-10T08:25:59Z.

Only README term occurrence is `README.md:5`: “My work spans micro-frontends, onboarding workflows, analytics systems…”. Phrase search treats hyphen as separator, matching plural “micro frontends”; singular “micro frontend” does not appear isolated and that hit depends on GitHub search text processing, which is not recorded.

README's last change is SHA `1338fe6` itself (2026-05-10, “Revise README for updated profile and focus areas”), before collection on October 7 and 8, 2026. The SHA's README does not postdate searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 1 entry, regular `100644` file (`README.md`, 3005 bytes); zero symlinks and zero gitlinks. | absent |
| Documentation | `README.md:3–5`: “Product Engineer with 9+ years of experience…”; “My work spans micro-frontends…” as professional experience; `README.md:22–34`: technology badges; `README.md:38–43`: current employment; `README.md:53–58`: external links (website, LinkedIn, CodePen, X), not followed. | weak |
| Technology / Configuration / Source code / Composition / Build/deploy | Nonexistent in snapshot; no code, hence no relative imports to search for. | absent |

## Authorship and history

Non-shallow, partial clone (`blob:none`). 26 reachable commits (26 across all refs), 3 PR merges, root `8d5902e` (2022-01-03, “Initial commit”). Remote refs `copilot/update-readme-with-details`, `nikhilrajnair-remove-github-streak` and `nikhilrajnair-we` correspond to integrated PRs and were not considered separately. Authorship: `Nikhil Raj A <nikhilrajnair.a@gmail.com>` in 25 commits, all through web interface (GitHub committer), and `copilot-swe-agent[bot]` in `61da0f7` (2026-04-30, “docs: update README with current title, skills, and experience”), integrated through PR #3. According to `git diff-tree --no-renames --name-status`, all commits with changes touch only `README.md`; history never contained code. No historical blob was read. `git rev-list --objects $SHA --missing=print` identifies 22 missing historical objects; SHA blob is present and was read.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | No frontend unit; only `README.md` (inventory). |
| Q2 | No | No units. |
| Q3 | No | No host, shell or root config. |
| Q4 | No | No composition mechanism; micro-frontends appear only as professional experience (`README.md:5`). |
| Q5 | No | Q1–Q4 converge. |

## Rationale

- `Non-MFE` under the rule “at least one question is No”. Matches “repositories mentioning micro-frontends without implementing them”, like profiles 011/064/068/073/077/101/111. In protocol section 3.2, fits “purely documentation without an implementation”.
- `repo_type: other`, `frontend_units: 0`, `unit_organization: none`, empty arrays.
- No decision remains open.

## Analysis notes

- **RQ1 (misleading signals):** another profile README (`owner == name`) entering through hyphenated “micro-frontends” skill mention, in the pattern already noted in 011.
- **Protocol (search):** repository was created in 2022 and enters through partition `created:2022-01`, passing filter `pushed:>=2025-04-01` through 2026-04/05 README commits; revision introducing the term was not verified, because historical blobs are missing from partial clone. Singular hit has no literal spelling.
