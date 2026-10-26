---
schema: 1
id: 1204064013
full_name: ib-steffen/code-graph-rag
url: https://github.com/ib-steffen/code-graph-rag
commit: 017443a481852a363d4ed6fd1fb0c70425236f67
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: library
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

# 336 — ib-steffen/code-graph-rag

## Context

Python tool (“Code-Graph-RAG”) building a knowledge graph of codebases and querying it with LLMs. Distributed as a package (`pyproject.toml:1–12`) and CLI `cgr`. README and history belong to project `vitali87/code-graph-rag`: README badges point to that repository (`README.md:8–12`), and commits are by the original author and contributors. The owner repository was created on 2026-04-07, after the last reachable commit. There is no frontend: the search term results from juxtaposition of “/path/to/frontend \” and “--orchestrator” on consecutive lines in a command-line example. The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:337` records rank 336, ID 1204064013, status `cloned`, branch `main` and the front matter commit, which is the HEAD of the clone and of `origin/main`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. There was no installation, execution or network access.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:337` records strategy `broader` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID appears in `data/discovery/mfe-round-001/candidates.csv:27965` (`broader`, `unknown`) and `data/discovery/mfe-round-002/candidates.csv:27971` (`broader`, `pass`).

A `sqlite3 -readonly` query against tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns one hit per round, from endpoint `repositories` and with an empty `path`:

| Query (`q`) | Subquery | Effective query | Collection 001 / 002 (UTC) |
|---|---|---|---|
| `broader-frontend-orchestration`: `"frontend orchestration" in:name,description,readme` | `broader-frontend-orchestration#created:2026-Q2` | `"frontend orchestration" in:name,description,readme pushed:>=2025-04-01 created:2026-04-01..2026-06-30` | 2026-10-07T23:44:19.637Z / 2026-10-08T16:24:59.268Z |

Hit metadata (identical in both rounds): description “Code Graph RAG”, no topics, language Python, MIT license, `fork: false`, size 62990, created at 2026-04-07T16:51:37Z, pushed at 2026-04-07T16:55:54Z.

**Spelling:** the SHA README does not contain phrase “frontend orchestration”.
- The nearest sequence is `README.md:473` (“--repo-path /path/to/frontend \”) followed by `README.md:474` (“--orchestrator google:gemini-2.0-flash-thinking-exp-01-21”): “frontend” and “orchestrator” become adjacent after backslash and line break.
- Matching “orchestrator” to “orchestration” would depend on GitHub search morphological normalization, which is not recorded.

No claim is made about which passage the API matched, because it reports no line. Other “orchestrator” occurrences refer to the main LLM model (`README.md:163–207`, `:531`, `:653–662`).

The last README change is `c19d06f` (2026-03-24), and the SHA (2026-03-24T13:24:10Z) is a bot version commit. Both predate the October 2026 collections, and the README at the SHA does not postdate the searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 483 entries, comprising 480 regular files `100644` and 3 executables `100755` (shell scripts); zero symlinks and zero gitlinks (`.gitmodules` exists, but is empty). `codebase_rag/` (359 Python files), `docs/` (MkDocs), `benchmarks/`, `optimize/`, `codec/`, `cgr/`, `scripts/`, workflows. | contrary |
| Configuration | `pyproject.toml:1–12`: package `code-graph-rag` 0.0.166, “The ultimate RAG for your monorepo…”, Python ≥ 3.12, “Console” environment. `mkdocs.yml` and `docs/overrides/main.html`: documentation site, not an application. | contrary |
| Source code | There are no `.ts`, `.tsx`, `.js`, `.jsx` or `.vue` files in the inventory; the only `.html` is `docs/overrides/main.html` (MkDocs template). | contrary |
| Documentation | `README.md:470–479`: examples of `cgr optimize javascript --repo-path /path/to/frontend`, where “frontend” is an example repository path to analyze. | context |
| Technology / Composition (search) | `git grep -i` in SHA Markdown for `micro.?front` and `federation`: no occurrences. | absent |

## Authorship and history

Non-shallow and partial clone (`blob:none`). There are 1.652 commits reachable from the SHA (1.659 across all refs), 245 merges. Main authors are `vitali87`/`Vitali Avagyan <eheva87@gmail.com>` (1.123 + 235), `github-actions[bot]` (142) and `dependabot[bot]` (30), plus contributors. The root is `9044d16` (2025-06-16), and the SHA is from 2026-03-24, before owner repository creation (2026-04-07). No owner commit. Branches `dependabot/…` (with 2026-04-07 commits) were not considered. This indicates a copy or import of the original project with `fork: false`; the mechanism is not asserted. `git rev-list --objects $SHA --missing=print` lists 4.533 missing objects, none in the SHA tree.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | No frontend unit: Python command-line tool (`pyproject.toml:1–12`; inventory without UI code). |
| Q2 | No | There are no units. |
| Q3 | No | There is no host, shell or root config. |
| Q4 | No | No composition mechanism; “orchestrator” is the tool’s main LLM model (`README.md:653–662`). |
| Q5 | No | Q1–Q4 converge. |

## Rationale

- `Non-MFE` under the rule “at least one question is No”.
- No micro-frontends mention: the hit comes from nearby tokens in a CLI example (`README.md:473–474`), as in lexical false positives 279, 312 and 320 (drafts).
- Third-party code redistribution (074/080/102/122) does not change the class, as no alternative leads to MFE.
- `repo_type: library` (package and CLI), `frontend_units: 0`, `unit_organization: none`, empty technology arrays. The MkDocs documentation site was not counted as a unit, because a Python tool generates it from Markdown without authored frontend (unlike the Rspress portal in 248).
- There is no open decision.

## Analysis notes

- **RQ1 (misleading signals) / Protocol (search):** query `"frontend orchestration"` matched a README without the phrase, probably through nearby tokens (“/path/to/frontend \” / “--orchestrator”) and normalization “orchestrator” → “orchestration”. Fourth case of broader-query noise in this series (279, 312, 320).
- **Protocol (families/duplicates):** there are several copies of the same project in the rounds (for example, `yulongwanxue/code-graph-rag`, `Lazur/code-graph-rag`, `mr-teslaa/code-graph-rag` and `anasdeyra/code-graph-rag`; `data/discovery/mfe-round-002/candidates.csv:27715`, `:29009`, `:29419`, `:31376`). Deduplication by identical history would reduce manual review.
- **Protocol:** eligibility changes from `unknown` (001) to `pass` (002).
