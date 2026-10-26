---
schema: 1
id: 1247700661
full_name: byte-od/mermaid-diagram-driven-development
url: https://github.com/byte-od/mermaid-diagram-driven-development
commit: d2942971ccf55f3edccd3c201ab5568c9022a225
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

# 289 — byte-od/mermaid-diagram-driven-development

## Context

- **Repository type:** tool (Node.js CLI `mddd-cli` for “Mermaid Diagram Driven Development”, with coding assistant skills and templates; `package.json:2–15`; `readme.md:4`).

README warns project was abandoned in favor of another protocol (`readme.md:1–2`). Micro-frontends and micro-apps appear only in a README example Mermaid diagram (`readme.md:66–107`), illustrating what the tool documents, about a fictional micro-app platform. The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:290` records rank 289, ID 1247700661, status `cloned`, branch `main` and the front matter commit, which is HEAD of the clone and `origin/main`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, with reading through `${SHA}:caminho` (the original placeholder means SHA:path). No installation, execution or network access occurred.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:290` records strategies `terminology;broader` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID is in `data/discovery/mfe-round-001/candidates.csv:30585` (`unknown`) and `data/discovery/mfe-round-002/candidates.csv:30592` (`pass`), both with `terminology;broader`.

A `sqlite3 -readonly` query of the `hits`, `queries` and `subqueries` tables from both rounds, filtered by ID, returns the same three hits in each round, from endpoint `repositories` and with empty `path`:

| Query (`q`) | Subquery | Collection 001 / 002 (UTC) |
|---|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | `…#created:2026-05` | 2026-10-07T22:36:39.291Z / 2026-10-08T15:59:48.873Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | `…#created:2026-05` | 2026-10-07T23:05:10.076Z / 2026-10-08T16:09:15.173Z |
| `broader-micro-apps`: `"micro apps" frontend in:name,description,readme` | `…#created:2026-Q2` | 2026-10-07T23:50:08.905Z / 2026-10-08T16:27:07.764Z |

Subqueries append `pushed:>=2025-04-01` and `created:2026-05-01..2026-05-31` (or `2026-04-01..2026-06-30` for `broader-micro-apps`).

Hit metadata (same in both rounds): description “MDDD - Mermaid Diagram Driven Development”; topics `ia-development`, `mdd`, `mddd`, `mddd-development`, `sdd`, `spec-driven-development`; language JavaScript; `fork: false`; size 425; 21 stars; created at 2026-05-23T16:59:49Z; pushed at 2026-07-26T00:24:25Z.

Matches in SHA's README (`readme.md`):
- **“micro frontend”:** `readme.md:100`, “Render Isolated UI Fragment / Micro-Frontend”, inside example diagram; hyphen acts as separator;
- **“micro frontends”:** plural form does not appear literally;
- **“micro apps” + frontend:** only singular form “Micro-App” (`readme.md:72`, `:80`, `:94`, `:97`, `:109`; “micro-app” at `:77`) and “Frontend” at `:94` (“Boot Micro-App Frontend/Backend Bundle”).

Plural hits depend on GitHub search text processing, which is not recorded.

README's last change is the SHA itself (`d294297`, 2026-07-25T21:24:25-03:00, i.e., 2026-07-26T00:24:25Z), matching `pushed_at` and preceding October 2026 collection. The SHA's README does not postdate searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 38 entries, comprising 37 regular `100644` files and 1 executable `100755` (`bin/cli.js`); zero symlinks and zero gitlinks. CLI in `bin/` and `src/` (commands `init`, `listSpecs`, `status`, `validator`; file and spec services), tests in `tests/`, skills and templates in `.agents/`, `AGENTS.md`, `.clinerules`. No HTML, bundler or frontend application. | contrary |
| Configuration | `package.json:2–9`: package `mddd-cli` with binary `md`; `:40–44`: dependencies `@mermaid-js/mermaid-cli`, `commander`, `picocolors`. `bin/cli.js:1–20`: Commander CLI using `src/` services. | contrary |
| Documentation (example) | `readme.md:62–107`: “Architectural Diagram Example”, a fictional platform `sequenceDiagram` with “Micro-App Registry” (`:72`) and “Render Isolated UI Fragment / Micro-Frontend” (`:100`); `readme.md:109`: example decision table. Illustrative diagramming tool content. | weak |
| Technology / Configuration / Composition (search) | `git grep -i` at the SHA, except README, for `micro.?front`, `micro.?app`, `federation`, `single.?spa`, `remoteEntry`, `import.?map`, `customElements` and `<iframe`: no occurrences. | absent |
| Source code (boundaries) | No frontend units; relative imports from `bin/cli.js:5–11` to `src/` belong to the CLI itself. | context |

## Authorship and history

Non-shallow, partial clone (`blob:none`). 121 commits (121 across all refs), 4 merges, all with email `reisfilho1116@gmail.com`:
- 115 as `JulioCRFilho`, with committer `JulioCRFilho`;
- 5 as `Julio Cesar` and 1 as `TheTod`, with committer `GitHub`.

Records span 2026-05-23 (`15edb14`, “Initial”) to SHA (2026-07-25, “Update readme.md”). `package.json` points to repository `JulioCRFilho/mermaid-diagram-driven-development` (`package.json:32–39`), suggesting transfer or mirroring to organization `byte-od` (unverified). `git rev-list --objects $SHA --missing=print` lists 314 missing objects, none in SHA tree. No historical blob was read.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | No frontend unit: repository is a Node.js CLI (`package.json:2–9`; `bin/cli.js:1–20`). |
| Q2 | No | No units. |
| Q3 | No | No host, shell or root config. |
| Q4 | No | No composition mechanism; “Micro-Frontend” and “Micro-App” appear only in an example diagram (`readme.md:66–107`). |
| Q5 | No | Q1–Q4 converge. |

## Rationale

- `Non-MFE` under the rule “at least one question is No”.
- Matches “repositories mentioning micro-frontends without implementing them”: term appears in a documentation tool's illustrative diagram.
- Close to content and generator cases (023/075/081/094/105) and 252 (draft, coding assistant skills): tool and documentation, rather than an application.
- `repo_type: library` (npm-distributed CLI), `frontend_units: 0`, `unit_organization: none`, empty technology arrays.
- No decision remains open.

## Analysis notes

- **RQ1 (misleading signals):** example Mermaid diagrams in READMEs (“Micro-App Registry”, “Micro-Frontend”) generate terminology and broad query `"micro apps" frontend` hits unrelated to repository architecture.
- **Protocol (search):** plural hits (`"micro frontends"` and `"micro apps"`) have no literal README spelling. Eligibility changes from `unknown` (001) to `pass` (002).
