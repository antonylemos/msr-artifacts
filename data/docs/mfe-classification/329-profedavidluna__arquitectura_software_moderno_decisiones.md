---
schema: 1
id: 1132423946
full_name: profedavidluna/arquitectura_software_moderno_decisiones
url: https://github.com/profedavidluna/arquitectura_software_moderno_decisiones
commit: 4f7fa1ce0dbd90d0a4611d6f367e676fa9e8558b
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

# 329 — profedavidluna/arquitectura_software_moderno_decisiones

## Context

- **Repository type:** not a software project with an application. Teaching material for a software architecture course (`README.md:1–3`), in four sessions (ADRs and C4, distributed patterns, web architectures, scalability), consisting only of Markdown. Micro-frontends are one topic in session 3, with code snippets as lesson content. The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:330` records rank 329, ID 1132423946, status `cloned`, branch `main` and the front matter commit, which is the HEAD of the clone and of `origin/main`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. There was no installation, execution or network access.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:330` records strategy `terminology` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID appears in `data/discovery/mfe-round-001/candidates.csv:23192` (`terminology`, `unknown`, rule `recent-human-commit` with `activity_incomplete`) and `data/discovery/mfe-round-002/candidates.csv:23199` (`terminology`, `pass`).

A `sqlite3 -readonly` query against tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns the same two hits in each round, from endpoint `repositories`, with an empty `path`:

| Query (`q`) | Subquery | Effective query | Collection 001 / 002 (UTC) |
|---|---|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | `terminology-micro-frontend-repositories#created:2026-01` | `"micro frontend" in:name,description,readme pushed:>=2025-04-01 created:2026-01-01..2026-01-31` | 2026-10-07T22:30:48.763Z / 2026-10-08T15:57:42.306Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | `terminology-micro-frontends-repositories#created:2026-01` | `"micro frontends" in:name,description,readme pushed:>=2025-04-01 created:2026-01-01..2026-01-31` | 2026-10-07T22:59:58.776Z / 2026-10-08T16:07:54.827Z |

Hit metadata: description of the course objective (without the terms), no topics, null language, no license, `fork: false`, size 353, created at 2026-01-11T23:34:49Z, pushed at 2026-01-18T02:30:03Z.

The only term occurrence in the root README is `README.md:103` (“- Micro-frontends”, session 3 syllabus item), with the hyphen treated as a separator: matches plural “micro frontends”; the singular does not appear separately, and this hit depends on GitHub search text processing, which is not recorded. The last reachable README change is from merge `9eceae0` (2026-01-12), before the collections on October 7 and 8, 2026; the README at the SHA does not postdate the searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 65 entries, all regular files `100644`; zero symlinks and zero gitlinks. These are 64 Markdown files and `.gitignore`; no manifest, source code, build configuration or workflow. | absent |
| Documentation (lesson content) | `sesion-03-arquitecturas-web/micro-frontends/README.md:1–44`: concept, benefits, challenges and techniques (Module Federation, single-spa, Web Components), with an example `ModuleFederationPlugin` in a code block (`:23–36`). `sesion-03-arquitecturas-web/micro-frontends/ejemplo-dashboard.md:1–56`: Mermaid diagram and shell and event bus snippets for a hypothetical dashboard. `sesion-03-arquitecturas-web/microfrontends/README.md:9–56`, `62–84`: host/remotes configuration and a custom element as examples. | context |
| Technology / Configuration / Source code / Composition / Build/deploy | Nonexistent; `ModuleFederationPlugin`, `customElements` and similar terms occur only inside Markdown (`git grep -c` in `*.md`: 1 occurrence in `micro-frontends/README.md`, 3 in `microfrontends/README.md`). Without code, there are no relative imports to search. | absent |

## Authorship and history

Non-shallow, partial clone (`blob:none`). 33 reachable commits (33 across all refs), 9 merges, from 2026-01-11 (`ec39e68`, “Crear README principal del curso…”; English translation: “Create main course README…”) to 2026-01-17 (SHA `4f7fa1c`, “Change folder name”). Metadata authorship: `copilot-swe-agent[bot]` in 19 commits and the owner, “Prof. David Luna”/“David Luna” with the same institutional email, in 14 (9 through the web interface). There are five remote `copilot/*` refs corresponding to PRs, not considered separately. Most content was generated by a coding assistant and integrated through PRs; history never contained files beyond Markdown and `.gitignore`. No historical blob was read. `git rev-list --objects $SHA --missing=print` identifies 67 missing historical objects; the cited SHA files were read.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | No frontend unit; only course documents (inventory). |
| Q2 | No | There are no units. |
| Q3 | No | There is no host, shell or root config. |
| Q4 | No | No composition mechanism configured; Module Federation and Web Components snippets are Markdown lesson content (`sesion-03-arquitecturas-web/microfrontends/README.md:13–56`). |
| Q5 | No | Q1–Q4 converge. |

## Rationale

- `Non-MFE` under the rule “at least one question is No”. It matches “repositories mentioning micro-frontends without implementing them”; in protocol section 3.2, “repositories that are purely documentation without an implementation”.
- Same case as final 023 (presentation about micro-frontends with Module Federation code only as content) and the content exclusion in 075/081/094/105.
- `repo_type: other`, `frontend_units: 0`, `unit_organization: none`, empty arrays.
- There is no open decision.

## Analysis notes

- **RQ1 (misleading signals):** snippets of `ModuleFederationPlugin`, `remotes`/`exposes` and `customElements.define` inside Markdown generate false positives in code searches, as in 023.
- **Protocol:** teaching material mostly generated by `copilot-swe-agent[bot]` and integrated through PRs; README links point to folders with old names (for example, `./sesion-1-decisiones-arquitectonicas/`, `README.md:7`), while the tree uses `sesion-01-…` (last commit, “Change folder name”).
