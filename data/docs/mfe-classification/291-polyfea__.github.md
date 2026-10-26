---
schema: 1
id: 741331616
full_name: polyfea/.github
url: https://github.com/polyfea/.github
commit: 93281b383833881f220884bbcc5cf63e1462e19b
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

# 291 — polyfea/.github

## Context

- **Repository type:** not a software project. A GitHub organization's special `.github` repository: a root `README.md` and `profile/README.md`, displayed on organization page, presenting the Polyfea ecosystem (Kubernetes controller for deploying and integrating micro-frontends), plus license. Ecosystem code is in other organization repositories, outside this snapshot. The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:292` records rank 291, ID 741331616, status `cloned`, branch `main` and the front matter commit, which is HEAD of the clone and `origin/main`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, with reading through `${SHA}:caminho` (the original placeholder means SHA:path). No installation, execution or network access occurred.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:292` records strategy `terminology` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID is in `data/discovery/mfe-round-001/candidates.csv:7459` and `data/discovery/mfe-round-002/candidates.csv:7464`, both with `terminology` and `pass`.

A `sqlite3 -readonly` query of the `hits`, `queries` and `subqueries` tables from both rounds, filtered by ID, returns the same two hits in each round, from endpoint `repositories`, with empty `path`:

| Query (`q`) | Subquery | Effective query | Collection 001 / 002 (UTC) |
|---|---|---|---|
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | `terminology-microfrontend-repositories#created:2024-01` | `microfrontend in:name,description,readme pushed:>=2025-04-01 created:2024-01-01..2024-01-31` | 2026-10-07T18:23:25.668Z / 2026-10-08T15:36:48.960Z |
| `terminology-microfrontends-repositories`: `microfrontends in:name,description,readme` | `terminology-microfrontends-repositories#created:2024-01` | `microfrontends in:name,description,readme pushed:>=2025-04-01 created:2024-01-01..2024-01-31` | 2026-10-07T22:06:19.842Z / 2026-10-08T15:46:24.913Z |

Hit metadata:
- description “Polyfea Organization README”, without searched terms;
- no topics, null language, license Apache-2.0, `fork: false`, size 9, 1 star;
- created at 2024-01-10T07:10:11Z, pushed at 2025-11-26T13:47:12Z.

Without terms in name or description, hit comes from a README:
- `README.md:4` (root): “integration of microfrontends as a resources of the kubernetes” — plural spelling “microfrontends”; `README.md:2` has title with truncated spelling “Microfronends”, which does not match.
- `profile/README.md:1` “Polyfea Microfrontends ecosystem” and `profile/README.md:3` “integration of microfrontends” and “each microfrontend” (singular).

Hits do not identify which file API indexed as README. Plural “microfrontends” occurs literally at `README.md:4`; isolated singular “microfrontend” occurs only at `profile/README.md:3`. If search considered only root README, singular hit depends on GitHub search text processing, which is not recorded.

Last reachable `README.md` change is `bef66fa` (2024-01-10) and `profile/README.md`'s is SHA `93281b3` itself (2025-11-26). Both precede collection on October 7 and 8, 2026; no SHA README postdates searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 3 entries, all regular `100644` files; zero symlinks and zero gitlinks: `LICENSE`, `README.md` and `profile/README.md`. No manifest, code, build configuration or asset. | absent |
| Documentation | `README.md:2–4` and `profile/README.md:1–3`: ecosystem described as Kubernetes controller for “deployment and integration of microfrontends”, with “independent release cycles for each microfrontend”; `profile/README.md:5`: external documentation link (`https://polyfea.github.io/documentation/`), not followed. | weak |
| Technology / Configuration / Source code / Composition / Build/deploy | Nonexistent in snapshot; no file beyond the three texts above, hence no relative imports between units to search for. | absent |
| Context (organization) | Other organization repositories appear in rounds, outside this snapshot: for example, `polyfea/polyfea-controller`, `polyfea/core` and `polyfea/spa-base` (`data/discovery/mfe-round-002/candidates.csv:7308`, `7441`, `7474`). Only this one is in sample (`sample.csv`, one `polyfea/` occurrence); others were not inspected. | context |

## Authorship and history

Non-shallow, partial clone (`blob:none`). 7 reachable commits (7 across all refs), no merges, root `427afbb` (2024-01-10, “Initial commit”, `LICENSE` and `README.md`). Refs: `main`, `origin/main` and `origin/HEAD` at SHA. Authorship:
- Milan Unger, with two identities (`30626125+milung@users.noreply.github.com`, web interface commits, and an institutional email), 6 commits from 2024-01-10 to 2024-05-24;
- Michal Sevcik (`99325737+SevcikMichal@users.noreply.github.com`), SHA `93281b3` (2025-11-26, “Add link to docs”), through web interface.

According to `git diff-tree --no-renames --name-status`, all commits only add or change `README.md`, `profile/README.md` and `LICENSE`; history never contained code. No historical blob was read. `git rev-list --objects $SHA --missing=print` identifies 4 missing historical objects, not identified by type without network fetching; all three SHA blobs are present and were read.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | No frontend unit in repository or composition configuration referencing external units; only `LICENSE`, `README.md` and `profile/README.md` (inventory). |
| Q2 | No | No units. |
| Q3 | No | No host, shell or root config. |
| Q4 | No | No configured composition mechanism; micro-frontend integration is only described (`profile/README.md:3`). |
| Q5 | No | Q1–Q4 converge. |

## Rationale

- `Non-MFE` under the rule “at least one question is No”. Matches “repositories mentioning micro-frontends without implementing them”, like profiles 011/064/068/073/077/101/111; here profile belongs to an organization (`profile/README.md`), rather than a user. In protocol section 3.2, fits “purely documentation without an implementation”.
- Mention is not a personal skill, but presentation of an MFE ecosystem (Kubernetes controller) maintained in other repositories. That would bring the project closer to “MFE frameworks and libraries”, but this repository does not even contain the framework: class follows only snapshot content.
- Not `MFE-unit`: no unit prepared for composition. No partial chain (097/103/104), code sharing (089/100) or third-party unit (102/074/080) to assess.
- `repo_type: other`, `frontend_units: 0`, `unit_organization: none`, empty arrays.
- No decision remains open.

## Analysis notes

- **RQ1 (misleading signals):** organization `.github` repositories (profile in `profile/README.md`) enter through explicit README term, like user profiles (`owner == name`) in 011. Pattern `<org>/.github` suggests the same automatic filter type noted in 011.
- **Protocol (families):** organization has at least eight repositories in rounds (`data/discovery/mfe-round-002/candidates.csv:7308`, `7309`, `7441`, `7464`, `7474`, `8586`, `11596`, `21275`); if family analysis is adopted, ecosystem would need inspection in those repositories; self-description as controller and “ecosystem of components” (`README.md:4`) does not suffice to decide between framework and instance.
- **Protocol (search):** singular hit `microfrontend` has isolated literal spelling only at `profile/README.md:3`; which README search indexed is not recorded.
