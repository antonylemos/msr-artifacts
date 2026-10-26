---
schema: 1
id: 906200654
full_name: fr0ster/simplest_sap_rap_example
url: https://github.com/fr0ster/simplest_sap_rap_example
commit: 3c01bceea3f32af02d674fce13152def85bb19ed
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

# 186 — fr0ster/simplest_sap_rap_example

## Context

Markdown guide to building an SAP RAP (ABAP RESTful Application Programming) application in iterations (`README.md:1–12`). Folders `1st_iteration/` through `10th_iteration/` contain notes and CDS, behavior definition and service snippets, plus screenshots and a service XML. No frontend application. “Micro Frontend” appears only in the title of an external tutorial listed in the README (“Luigi Micro Frontend Framework”, `README.md:196`). The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:187` records rank 186, ID 906200654, status `cloned`, branch `master` and the front matter commit, which is HEAD of the clone and `origin/master`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, with reading through `${SHA}:caminho` (the original placeholder means SHA:path). No installation, execution or network access occurred.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:187` records strategy `terminology` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID is in `data/discovery/mfe-round-001/candidates.csv:11207` and `data/discovery/mfe-round-002/candidates.csv:11213`, both `pass`.

A `sqlite3 -readonly` query of the `hits`, `queries` and `subqueries` tables from both rounds, filtered by ID, returns the same two hits in each round, from endpoint `repositories`, with subquery `…#created:2024-12` and empty `path`:

| Query (`q`) | Collection 001 / 002 (UTC) |
|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | 2026-10-07T22:19:53.790Z / 2026-10-08T15:53:34.234Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | 2026-10-07T22:51:03.894Z / 2026-10-08T16:05:10.484Z |

Effective queries append `pushed:>=2025-04-01 created:2024-12-01..2024-12-31`.

Hit metadata:
- description “The simplest SAP RAP example”, without the terms;
- no topics, null language, `fork: false`, size 4,025;
- created at 2024-12-20T11:26:46Z, pushed at 2025-05-08T12:53:42Z.

The hit comes from `README.md:196`, “Create an Application with the Luigi Micro Frontend Framework”, title of an SAP tutorial listed as a link and the only occurrence. Plural “micro frontends” does not appear literally; that hit depends on GitHub search text processing, which is not recorded.

The README's last change is the SHA itself, `3c01bce` (2025-05-08), before October 2026 collection. The SHA's README does not postdate searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 93 entries, all regular `100644` files; zero symlinks and zero gitlinks. Per-iteration `.md` notes, PNG images, `10th_iteration/ZE2E100_SOL_2_SRV.xml`, `LICENSE`, `README.md` and a `.code-workspace`. No `package.json`, entry HTML, JavaScript/TypeScript code or bundler configuration. | contrary |
| Documentation | `README.md:1–12`: iterative SAP RAP guide. `README.md:141`, `196`: SAP tutorial links, including “Luigi Micro Frontend Framework”. External reference, rather than implementation. | weak |
| Technology / Configuration / Composition (search) | `git grep -i` at the SHA for `micro.?front`: only `README.md:196`. No composition mechanism. | absent |

## Authorship and history

Non-shallow clone; 126 commits, 2 merges, all by Oleksii Kyslytsia, with three emails: `oleksij.kyslytsja@gmail.com` (115), `oleksii_kyslytsia@epam.com` (10) and `oleksii_kyslytsai@epam.com` (1). They span 2024-12-20 (`14d5d40`, “Initial commit”) to 2025-05-08 (SHA). Recent commits add tutorial links to README. No historical blob was read. The clone is partial (`blob:none`): path-specific queries for `2nd_iteration`, `4th_iteration`, `5th_iteration` and `10th_iteration` return unavailable promisor object errors with `GIT_NO_LAZY_FETCH=1`; local history confirms one author, but completeness of these folders' `name-status` is not certified. The assessed SHA is complete (93 available blobs).

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | No frontend unit; inventory consists of SAP RAP documentation and artifacts. |
| Q2 | No | Without units, there are no entries or builds. |
| Q3 | No | No host, shell or root configuration. |
| Q4 | No | No composition mechanism; “Micro Frontend” is an external tutorial title (`README.md:196`). |
| Q5 | No | Q1–Q4 are No: SAP RAP development guide linking to a micro-frontends tutorial. |

## Rationale

- `Non-MFE` under the rule “at least one question is No”. Matches “repositories mentioning micro-frontends without implementing them”.
- Teaching content, as in 023, without a frontend unit, like profiles 011/064/068/073/077/101/111. Hence `frontend_units: 0`, `unit_organization: none`, `repo_type: other`, `ui_technologies: []` and `build_tools: []`.
- No decision remains open.

## Analysis notes

- **RQ1 (misleading signals):** an external tutorial link (“Luigi Micro Frontend Framework”) in a resource list suffices for the terminology query.
- **Protocol (search):** plural hit `"micro frontends"` has no literal spelling. Eligibility `pass` in both rounds.
- **Independent review contribution (Lupa):** full agreement with Non-MFE and Q1–Q5 No; no open decision (`draft`). SHA contains SAP RAP documentation and examples, without frontend units or composition configuration, and discovery signal comes from an external title listed in README (`README.md:196`). Field disagreement unresolved by checklist: `repo_type: other` is defensible if label classifies the delivered artifact (documentary guide without observable frontend application), while `example` would be more precise if classifying teaching purpose (README describes an iterative application-building process); template accepts both (`_template.md:12`) without an explicit rule for non-executable example guides. `other` retained, and the boundary between both enters pending `repo_type` harmonization. Path-specific history audit is limited by the partial clone.
