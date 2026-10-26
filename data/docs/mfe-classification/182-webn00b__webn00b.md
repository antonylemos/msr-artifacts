---
schema: 1
id: 1389131816
full_name: webn00b/webn00b
url: https://github.com/webn00b/webn00b
commit: e096c973353b6d741ba9210f6d33a4f245ada3f9
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

# 182 — webn00b/webn00b

## Context

Personal profile repository: a 29-line `README.md` introducing a fullstack developer (Vue 3, TypeScript, Go) and an animated terminal SVG image (`README.md:1–10`; `assets/terminal.svg`). “micro-frontends” appears in a list of work areas (`README.md:11`). There is no code. The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:183` records rank 182, ID 1389131816, status `cloned`, branch `main` and the front matter commit, which is HEAD of the clone and `origin/main`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, with reading through `${SHA}:caminho` (the original placeholder means SHA:path). No installation, execution or network access occurred.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:183` records strategy `terminology` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID is in `data/discovery/mfe-round-001/candidates.csv:37945` (`unknown`) and `data/discovery/mfe-round-002/candidates.csv:37977` (`pass`).

A `sqlite3 -readonly` query of the `hits`, `queries` and `subqueries` tables from both rounds, filtered by ID, returns the same two hits in each round, from endpoint `repositories`, with subquery `…#created:2026-09` and empty `path`:

| Query (`q`) | Collection 001 / 002 (UTC) |
|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | 2026-10-07T22:42:59.653Z / 2026-10-08T16:02:15.900Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | 2026-10-07T23:12:35.014Z / 2026-10-08T16:10:44.980Z |

Effective queries append `pushed:>=2025-04-01 created:2026-09-01..2026-09-30`.

Hit metadata:
- description “Profile README”, without the terms;
- no topics, null language, `fork: false`, size 2;
- created at 2026-09-26T12:00:10Z, pushed at 2026-09-26T12:00:16Z.

The hit comes from `README.md:11`, “- 🧩 Frontend architecture: micro-frontends, Feature-Sliced Design, design systems”, hyphenated and the only occurrence. Phrase search treats the hyphen as a separator. The singular form “micro frontend” does not appear literally; that hit depends on GitHub search text processing, which is not recorded.

The README comes from the only commit, the SHA (2026-09-26), before October 2026 collection. The SHA's README does not postdate searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 2 entries, `README.md` and `assets/terminal.svg` (4,700 bytes), both `100644`; zero symlinks and zero gitlinks. No code, manifest or configuration. | contrary |
| Documentation | `README.md:1–10`: terminal image, “Hi, I'm Fedor”, professional presentation and experience areas. `README.md:11`: “micro-frontends” among frontend architecture areas. A declared skill, without a described project. | weak |
| Technology / Configuration / Composition (search) | `grep -i` in README and SVG for `micro.?front` and `federation`: only `README.md:11`; SVG does not contain the terms. No mechanism. | absent |

## Authorship and history

Non-shallow clone with a single commit, SHA `e096c97` (2026-09-26, “Add profile README with animated terminal”), by `f.savin <fedsavin@gmail.com>` as author and committer. No historical blob was read and no object was missing.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | No frontend unit; inventory is only README and an image. |
| Q2 | No | Without units, there are no entries or builds. |
| Q3 | No | No host, shell or root configuration. |
| Q4 | No | No composition mechanism; “micro-frontends” appears only in the skill list (`README.md:11`). |
| Q5 | No | Q1–Q4 are No: personal profile README. |

## Rationale

- `Non-MFE` under the rule “at least one question is No”. Matches “repositories mentioning micro-frontends without implementing them”.
- Repository without implementation, like profiles 011/064/068/073/077/101/111 (and drafts 158/166/173/179): `frontend_units: 0`, `unit_organization: none`, `repo_type: other`, `ui_technologies: []` and `build_tools: []`.
- No decision remains open.

## Analysis notes

- **RQ1 (misleading signals):** “micro-frontends” skill in a profile README.
- **Protocol (search):** singular hit `"micro frontend"` has no literal spelling. Eligibility changes from `unknown` (001) to `pass` (002).
- **Independent review contribution (Lupa):** full agreement with Non-MFE, Q1–Q5 No, `other`, zero units and `none`; no open decision (`draft`). SHA contains only `README.md` and `assets/terminal.svg` (4,700 bytes, terminal illustration markup, style and animation, without MFE reference); the “micro-frontends” mention (`README.md:11`, alongside Feature-Sliced Design and design systems) is a declared skill. Provenance: by elimination the README is the origin of both hits, and hyphen and plural normalization that would explain the singular query is plausible, but GitHub's internal mechanism is not recorded, and a stemming rule is not asserted as fact. Round 001 eligibility `unknown` (`recent-human-commit`, `activity_incomplete`) concerns incomplete activity collection, and round 002 has `qualifying_commit`; this does not change thematic interpretation. README technologies (Vue 3, TypeScript, Go) and SVG describe skills, hence `ui_technologies` and `build_tools` remain empty.
