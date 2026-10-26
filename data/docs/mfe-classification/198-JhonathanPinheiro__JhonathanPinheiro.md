---
schema: 1
id: 347764242
full_name: JhonathanPinheiro/JhonathanPinheiro
url: https://github.com/JhonathanPinheiro/JhonathanPinheiro
commit: c63d8ed0cc2ed67f1b5cc2f8f407544dcc3abaf4
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

# 198 — JhonathanPinheiro/JhonathanPinheiro

## Context

Personal profile repository (“Config files for my GitHub profile.”): a 107-line `README.md` with professional presentation and a workflow generating the contribution “snake” animation and publishing it to branch `output` (`.github/workflows/main.yml:1–25`). Micro-frontends and Module Federation appear in a code-formatted skill block (`README.md:34`) and a study list (`README.md:38`). No application code. The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:199` records rank 198, ID 347764242, status `cloned`, branch `main` and the front matter commit, which is HEAD of the clone and `origin/main`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, with reading through `${SHA}:caminho` (the original placeholder means SHA:path). No installation, execution or network access occurred.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:199` records strategies `terminology;technology` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID is in `data/discovery/mfe-round-001/candidates.csv:2036` and `data/discovery/mfe-round-002/candidates.csv:2038`, both `pass`.

A `sqlite3 -readonly` query of the `hits`, `queries` and `subqueries` tables from both rounds, filtered by ID, returns the same three hits in each round, from endpoint `repositories`, with subquery `…#created:2021-03` and empty `path`:

| Query (`q`) | Collection 001 / 002 (UTC) |
|---|---|
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | 2026-10-07T18:20:21.180Z / 2026-10-08T15:35:37.949Z |
| `terminology-microfrontends-repositories`: `microfrontends in:name,description,readme` | 2026-10-07T22:05:05.275Z / 2026-10-08T15:45:14.737Z |
| `technology-module-federation-repositories`: `"module federation" in:name,description,readme` | 2026-10-07T23:14:55.083Z / 2026-10-08T16:12:13.253Z |

Effective queries append `pushed:>=2025-04-01 created:2021-03-01..2021-03-31`.

Hit metadata:
- description “Config files for my GitHub profile.”;
- topics `config` and `github-config`, null language, `fork: false`, size 97;
- created at 2021-03-14T21:58:23Z, pushed at 2026-06-08T13:41:33Z.

README spellings:
- “Webpack Module Federation” and “Microfrontends”: `README.md:34` (`infra: ["Webpack Module Federation", "Microfrontends"]`);
- “Microfrontends”: `README.md:38` (“Aprofundando arquitetura Front-end e Microfrontends”, English translation: “Deepening knowledge of Front-end architecture and Microfrontends”).

The singular form “microfrontend” does not appear literally; that hit depends on GitHub search text processing, which is not recorded.

The README's last change is the SHA itself, `c63d8ed` (2026-06-08), before October 2026 collection. The SHA's README does not postdate searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 2 entries, `README.md` and `.github/workflows/main.yml`, both `100644`; zero symlinks and zero gitlinks. No application code, manifest or build configuration. | contrary |
| Documentation | `README.md:1–8`: graphical profile header. `README.md:34`: infrastructure skill list with “Webpack Module Federation” and “Microfrontends”. `README.md:38`: current study topic. Declared skills, without a described project. | weak |
| Technology / Configuration / Composition (search) | With inventory limited to README and workflow, `grep -i` for `micro.?front`, `federation` and `single.?spa` finds only `README.md:34` and `38`. No mechanism. | absent |

## Authorship and history

Non-shallow clone; 84 commits across all refs, no merges, by owner (“Jhonathan Pinheiro” 80, “JhonathanPinheiro” 3, through web interface) and 1 by `github-actions[bot]` on branch `output`. Root is `8c7e299` (2021-03-14, “Create README.md”); SHA is `c63d8ed` (2026-06-08, “Remove GitHub Streak badge from README”). Branch `origin/output` was not considered. No historical blob was read and no object was missing.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | No frontend unit; inventory is only README and workflow. |
| Q2 | No | Without units, there are no entries or builds. |
| Q3 | No | No host, shell or root configuration. |
| Q4 | No | No composition mechanism; Module Federation appears only in the skill list (`README.md:34`). |
| Q5 | No | Q1–Q4 are No: personal profile README. |

## Rationale

- `Non-MFE` under the rule “at least one question is No”. Matches “repositories mentioning micro-frontends without implementing them”.
- Repository without implementation, like profiles 011/064/068/073/077/101/111 (and profile drafts 158/166/173/179/182/188/195): `frontend_units: 0`, `unit_organization: none`, `repo_type: other`, `ui_technologies: []` and `build_tools: []`.
- No decision remains open.

## Analysis notes

- **RQ1 (misleading signals):** skills “Webpack Module Federation” and “Microfrontends” in a profile README match terminology and technology queries.
- **Protocol (search):** singular hit `microfrontend` has no literal spelling. Eligibility `pass` in both rounds.
