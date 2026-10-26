---
schema: 1
id: 334730797
full_name: rayhan999/rayhan999
url: https://github.com/rayhan999/rayhan999
commit: d692f4f8f6f5f203b5d6bcde8549c2f6174800a7
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

# 276 — rayhan999/rayhan999

## Context

- **Repository type:** not a software project (GitHub profile README).

The snapshot has the introduction README, an SVG image and a workflow file outside `.github/`. Micro-frontends appear as an interest (“microfrontend architecture”, `README.md:12`) and professional experience (“Led CRM development using **Microfrontends**”, `README.md:32`). The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:277` records rank 276, ID 334730797, status `cloned`, branch `main` and the front matter commit, which is the HEAD of the clone and of `origin/main`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. There was no installation, execution or network access.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:277` records strategy `terminology` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID appears in `data/discovery/mfe-round-001/candidates.csv:1870` and `data/discovery/mfe-round-002/candidates.csv:1870`, both with `terminology` and `pass`.

A `sqlite3 -readonly` query against tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns the same two hits in each round, from endpoint `repositories` and with an empty `path`:

| Query (`q`) | Subquery | Collection 001 / 002 (UTC) |
|---|---|---|
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | `terminology-microfrontend-repositories#created:2021-01` | 2026-10-07T18:20:16.571Z / 2026-10-08T15:35:33.037Z |
| `terminology-microfrontends-repositories`: `microfrontends in:name,description,readme` | `terminology-microfrontends-repositories#created:2021-01` | 2026-10-07T22:05:01.240Z / 2026-10-08T15:45:10.249Z |

The effective queries append `pushed:>=2025-04-01 created:2021-01-01..2021-01-31`.

Hit metadata (identical in both rounds, except counts): null description, no topics, null language, `fork: false`, size 111, 2 forks, created at 2021-01-31T18:47:18Z, pushed at 2026-09-24T13:39:33Z.

**Spellings in the SHA README:** “microfrontend” in `README.md:12` (“Clean code, microfrontend architecture, and impactful UX”) and “Microfrontends” in `README.md:32`. They correspond to both queries.

**README after searches:** the SHA (`d692f4f`, 2026-10-09T00:35:58+03:00, that is, 2026-10-08T21:35:58Z) and previous commit `38b539f` (2026-10-08T21:34:39Z) change the README after both collections (the last at 2026-10-08T15:45:10Z). Messages are “Update README to streamline GitHub stats display” and “Fix duplicate top languages image in README”.
- The version indexed in searches is from `3c80398` (2026-02-16). The next commit, `a388c11` (2026-09-24, equal to `pushed_at`), only added the SVG.
- That version’s blob (`30e7291…`) is absent from the partial clone, as is that of `38b539f` (`git cat-file -e` fails with `GIT_NO_LAZY_FETCH=1`).
- Therefore, whether lines 12 and 32 already existed in the searched version was not verified. Messages indicate changes only in the statistics section, but this is inference.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 3 entries, `README.md`, `profile-night-green.svg` and `workflows/update-readme.yml`, all regular files `100644`; zero symlinks and zero gitlinks. There is no application code, manifest or build. | absent |
| Documentation | `README.md:7–14`: introduction as “Frontend-focused Software Engineer”; `README.md:12`: “microfrontend architecture” as an interest; `README.md:18–26`: technology table; `README.md:32`: professional experience with “Microfrontends” in a third-party CRM. | weak |
| Build/deploy | `workflows/update-readme.yml:1–16`: `jamesgeorge007/github-activity-readme` workflow to update the README; located in `workflows/` at the root, outside `.github/workflows`. This is profile automation, not application build. | context |
| Technology / Configuration / Source code / Composition | Nonexistent; no federation, single-spa, import map, iframe or Web Components configuration. Relative imports between units do not apply (there is no code). | absent |

## Authorship and history

Non-shallow and partial clone (`blob:none`). There are 62 commits (62 across all refs), no merges, all by the owner with noreply `58140227+rayhan999@users.noreply.github.com` (names `rayhan999`, `MD. Sadek Rayhan`, `MD. Sadek Rayhan Mahi` and `Sadek Rayhan Mahi`) and, in almost all, committer `GitHub` (web interface edits), from 2021-02-01 to 2026-10-08. According to `git log --no-renames --name-status`:
- `25959d5` (2021-02-01, “initial commit”, committer `rayhan999`) changes the README and adds `workflows/update-readme.yml`;
- `a388c11` (2026-09-24) adds the SVG;
- all others only add or modify `README.md`. `git rev-list --objects $SHA --missing=print` lists 60 missing objects, none in the SHA tree (earlier README versions and similar files).

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | No frontend unit: only README, an image and a profile workflow (inventory). |
| Q2 | No | There are no units. |
| Q3 | No | There is no host, shell or root config. |
| Q4 | No | No composition mechanism; micro-frontends are an interest and professional experience (`README.md:12`, `:32`). |
| Q5 | No | Q1–Q4 converge. |

## Rationale

- `Non-MFE` under the rule “at least one question is No”. It matches “repositories mentioning micro-frontends without implementing them”.
- Same pattern as profiles 011/064/068/073/077/101/111; `frontend_units: 0`, `unit_organization: none`, `repo_type: other`, empty technology arrays.
- The SHA README postdating searches does not change the class: history never contains application code (commit metadata shows only README and SVG).
- There is no open decision.

## Analysis notes

- **Protocol (snapshot after searches):** the clone (2026-10-12) captured two README commits made on 2026-10-08 after collections. The indexed version is not in the partial clone, so the exact line matching searches cannot be verified locally. Record the case for reproducibility analysis (snapshot × collection).
- **Protocol (search):** pattern `owner == name` reinforces the automatic filter suggestion recorded in 011. Eligibility is `pass` in both rounds.
