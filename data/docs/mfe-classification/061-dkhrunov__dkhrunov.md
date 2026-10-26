---
schema: 1
id: 328423452
full_name: dkhrunov/dkhrunov
url: https://github.com/dkhrunov/dkhrunov
commit: eced863473d6488c21448cf7a81c6801da4d8dbd
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
  date: 2026-10-14
---

# 061 — dkhrunov/dkhrunov

## Context

- **Repository type:** not a software project (GitHub profile repository, `<user>/<user>`)
- **Classification:** Non-MFE (classified by the researchers in `catalog.csv`; file recorded afterwards)

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | A single tracked file: `README.md` | absent |
| Documentation | `README.md:8`: "I'm a micro-frontend enthusiast, created the ngx-mfe library for a plugin-based approach to MFE"; `:20-22`: links to "Angular micro-frontend architecture" articles (parts 1–3) on Medium | weak |
| Technology / Configuration / Source code / Build/deploy | Nonexistent | absent |

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | No frontend units; only `README.md` |
| Q2 | No | No units |
| Q3 | No | No host, shell or root config |
| Q4 | No | No composition mechanism |
| Q5 | No | Q1–Q4 converge |

## Rationale

- GitHub profile README; MFE terms describe the author's work (library `ngx-mfe` and articles) in other repositories.
- Matches "repositories mentioning micro-frontends without implementing them"; in automatic filtering (protocol section 3.2), "clearly not software projects".

## Analysis notes

- The author maintains library `dkhrunov/ngx-mfe` (Angular MFE framework), outside the sample; under the rule from repository 039, it would be Non-MFE unless it has a reference app composing units.
