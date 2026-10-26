---
schema: 1
id: 1362609771
full_name: hqadeer-nisum-com/nisumpk-mfe-training-final-project-MFE-training-assignment
url: https://github.com/hqadeer-nisum-com/nisumpk-mfe-training-final-project-MFE-training-assignment
commit: e99743b91b738c8fc87791b68faccf8704cbabee
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

# 147 — hqadeer-nisum-com/nisumpk-mfe-training-final-project-MFE-training-assignment

## Context

At recorded commit, repository contains only `LICENSE` and a 1.535-line `README.md` with **instructions** for a micro-frontends training final project. Instructions request shell/gateway, at least two MFEs, mandatory Module Federation, monorepo, CI/CD etc. (`README.md:1–30`; `README.md:61`; `README.md:261–289`). No implementation exists in snapshot. Repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:148` records rank 147, ID 1362609771, status `cloned` and front-matter commit, which is clone HEAD and `origin/main`. Every clone Git command used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. No installation, execution or network access occurred.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:148` records strategies `terminology;technology` and eligibility `pass`. Sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). ID appears in `data/discovery/mfe-round-001/candidates.csv:36962` (`unknown`) and `data/discovery/mfe-round-002/candidates.csv:36971` (`pass`), both with `terminology;technology`.

`sqlite3 -readonly` query of tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns same three hits in each round, at endpoint `repositories`, with subquery `#created:2026-09` and empty `path`:

| Query (`q`) | Collection 001 / 002 (UTC) |
|---|---|
| `technology-module-federation-repositories`: `"module federation" in:name,description,readme` | 2026-10-07T23:31:04.154Z / 2026-10-08T16:19:36.684Z |
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | 2026-10-07T22:42:26.531Z / 2026-10-08T16:02:06.454Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | 2026-10-07T23:12:26.297Z / 2026-10-08T16:10:41.677Z |

Effective queries append `pushed:>=2025-04-01 created:2026-09-01..2026-09-30`.

Hit metadata: null description, no topics, null language, `fork: false`, size 149, creation at 2026-09-09T11:48:36Z, push at 2026-09-29T10:24:38Z. Without description, retrieval comes from README, with all three literal spellings:
- “Micro Frontend”: `README.md:1`, `7`, `13`;
- “Micro Frontends”: `README.md:30`;
- “Module Federation”: `README.md:14`, `41`.

Last README change is SHA itself, `e99743b` (2026-09-09T03:29:03+05:00), before October 2026 collections. README at the SHA is not later than searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 2 entries, `LICENSE` and `README.md`, both `100644`; zero symlinks and zero gitlinks. No code, manifest or configuration. | contrary |
| Documentation (instructions) | `README.md:1–30`: “Final Project for the Micro Frontend (MFE) Training … you will design and build…”. `README.md:61`: “Your project must contain at least two Micro Frontends and one Gateway/Shell application”. `README.md:261–289`: mandatory Module Federation, Gateway as host, MFEs as remotes. `README.md:663`, `827–863`: expected variables and deployment. Text prescribes what student should build; it does not describe existing artifacts. | weak |
| Technology / Configuration / Composition (search) | Inventory is only README and LICENSE; reading and `git grep -i` for MFE terms find only instructions. No configured mechanism. | absent |

## Authorship and history

Non-shallow clone; 3 commits, no merge, all by `moiznisum <msiddique@nisum.com>`. Root `d1f0526` (“Initial commit”, 2026-09-09T03:21:47+05:00) adds `LICENSE` and `README.md`; `6c81bdb` and SHA `e99743b` only change README (`git log --no-renames --name-status`). Root commit predates metadata repository creation (2026-09-09T11:48:36Z), compatible with repository generated from assignment template. No historical blob was read and no object was missing.

Ref `origin/feature/final-project-assignment` (`72e4f64`, hqadeer-nisum-com, 2026-09-29, “fix checkout request content type”) exists, descending from SHA (`git merge-base --is-ancestor`). Metadata `pushed_at` (2026-09-29) corresponds to that branch. Under procedure, classified snapshot is commit recorded in `clones.csv`; branch content was neither read nor considered.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | No frontend unit in snapshot; only README and LICENSE. Units in instructions (`README.md:61`) are requirements, not artifacts or configuration references. |
| Q2 | No | Without units, no entries or builds exist. |
| Q3 | No | No host, shell or root configuration exists. |
| Q4 | No | No composition mechanism is configured; Module Federation appears only as requirement (`README.md:261–289`). |
| Q5 | No | Q1–Q4 are No: exercise instructions without implementation at recorded commit. |

## Rationale

- `Non-MFE` under rule “at least one question is No”. Matches “repositories mentioning micro-frontends without implementing them”. Educational content, as 023, and repository without implementation, as profiles 011/064/068/073/077/101/111, hence `frontend_units: 0` and `unit_organization: none`.
- `repo_type: other`: training instructions, without example application, code template or library. `ui_technologies: []` and `build_tools: []`.
- No decision remains open about checklist applied to snapshot.

## Analysis notes

- **Protocol (snapshot and branches):** ref `origin/feature/final-project-assignment` descends from SHA, but branch existence and commit subject demonstrate no MFE implementation there; content was not read. Sample classifies commit in `clones.csv` (branch `main`), and case is Non-MFE under snapshot. Recorded as coverage limitation, without branch inspection.
- **RQ1 (misleading signals):** training instructions with dense MFE vocabulary (Module Federation, host, remotes) pass all terminology/technology queries without containing code.
- **Protocol (search):** all three searched spellings are literally in README. Eligibility changes from `unknown` (001) to `pass` (002).
- **Independent-review contribution (Lupa):** complete agreement with Non-MFE and Q1–Q5 No (snapshot is license and README prescribing an exercise, without implementation, manifest, frontend entry or remote unit); no open decision. Adopted correction: hypothesis that student solution is in remote branch was removed, unsupported without reading another snapshot.
