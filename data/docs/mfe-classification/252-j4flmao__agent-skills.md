---
schema: 1
id: 1238394528
full_name: j4flmao/agent-skills
url: https://github.com/j4flmao/agent-skills
commit: 5a19d636db60d2f7e08f036037a5b49c0a4ae8bd
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

# 252 — j4flmao/agent-skills

## Context

- **Repository type:** not a software project with an application. It is a library of “agent skills” in Markdown (`SKILL.md` and references) for coding assistants, with configuration files for several assistants (`README.md:1–3`; `package.json:2–4`, `:53–65`).

Micro-frontends appear as topics of skills and reference documents, with example code snippets inside Markdown. The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:253` records rank 252, ID 1238394528, status `cloned`, branch `main` and the front matter commit, which is the HEAD of the clone and of `origin/main`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. There was no installation, execution or network access.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:253` records strategies `terminology;technology` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID appears in `data/discovery/mfe-round-001/candidates.csv:30057` (`unknown`) and `data/discovery/mfe-round-002/candidates.csv:30063` (`pass`), both with `terminology;technology`.

A `sqlite3 -readonly` query against tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns the same four hits in each round:

| Query (`q`) | Endpoint | Subquery | `path` | Collection 001 / 002 (UTC) |
|---|---|---|---|---|
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | repositories | `…#created:2026-05` | empty | 2026-10-07T21:51:29.129Z / 2026-10-08T15:42:48.382Z |
| `terminology-microfrontends-repositories`: `microfrontends in:name,description,readme` | repositories | `…#created:2026-05` | empty | 2026-10-07T22:12:58.622Z / 2026-10-08T15:49:57.059Z |
| `technology-custom-elements-single-spa-code`: `customElements.define registerApplication` | code | no partition (same id as the query) | `skills/frontend/angular/architecture/references/angular-micro-frontends.md` | 2026-10-07T22:44:45.930Z / 2026-10-08T16:22:16.158Z |
| `technology-web-components-microfrontends-repositories`: `"web components" microfrontends in:readme` | repositories | no partition (same id as the query) | empty | 2026-10-07T23:38:33.427Z / 2026-10-08T16:22:32.538Z |

Subqueries `#created:2026-05` append `pushed:>=2025-04-01 created:2026-05-01..2026-05-31`; the web components subquery appends `pushed:>=2025-04-01`.

Hit metadata: null description, no topics, language Shell, MIT license, `fork: false`, size 56420, 30 stars in round 001 and 32 in 002, created at 2026-05-14T04:47:30Z, pushed at 2026-10-07T08:57:31Z.

Matches at the SHA:
- **`microfrontend`:** `README.md:132`, within skill identifier `` `frontend-microfrontend` `` (the hyphen separates the terms).
- **`microfrontends`:** does not appear literally in the README (`grep -i` search for `microfrontends`, `micro` and `web.?component`). The hit depends on GitHub search text processing, which is not recorded.
- **`"web components" microfrontends`:** “web components” corresponds to `README.md:133` (`` `frontend-web-components` ``); “microfrontends” follows the previous observation.
- **Code search:** the matched file contains `customElements.define('products-app', ProductsAppElement)` (`skills/frontend/angular/architecture/references/angular-micro-frontends.md:2534`) and `registerApplication` (`:2543`, `:2545`), both inside Markdown code blocks.

**Dates:** the last README change is `e63c74b` (2026-10-07T15:57:31+07:00, that is, 08:57:31Z), equal to the recorded `pushed_at` and before collections. The code hit file was last changed in `0ef16b3` (2026-05-27). The evaluated SHA (`5a19d63`, 2026-10-10T10:28:26+07:00) postdates the searches, but changes neither file: it adds governance rules, `AGENTS.md`, `docs/agent-*`, `scripts/validate-agent-governance.js` and changes JSON bundles and `package.json`. The README at the SHA does not postdate the searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 4.806 entries, all regular files `100644`; zero symlinks and zero gitlinks. By extension: 4.770 `.md`, 16 `.mdc`, 11 `.json`, 5 `.sh`, 1 `.yml`, 1 `.js`, `.gitignore` and `LICENSE`. There is no `index.html`, bundler configuration or `package.json` beyond the root one. | contrary |
| Configuration | `package.json:2–4`: “Central mega-repository of 399 AI agent skills”; `:53–65`: publishes skill and assistant configuration folders; `:66–70`: only Markdown and governance validation scripts. No UI or build dependency. | contrary |
| Source code | The only executable files are support scripts: `scripts/validate-agent-governance.js:1–15` (validates assistant rule files) and five `.sh` (hooks in `.claude/hooks/scripts/`, `skills/core/project-init/scripts/scaffold.sh`, `skills/devops/chaos-engineering/scripts/pod_killer.sh`). None is a frontend application. | contrary |
| Documentation (MFE content) | `skills/frontend/universal/microfrontend/SKILL.md:1–21`: “microfrontend” skill for answering questions about Module Federation, Web Components and iframes, with six references in `skills/frontend/universal/microfrontend/references/`. `skills/frontend/angular/architecture/references/angular-micro-frontends.md:1–30`, `:2502`, `:2534`, `:2539–2545`: Angular micro-frontends guide with Module Federation, Web Components and single-spa examples in code blocks. This is assistant content, not application configuration. | context |
| Technology / Configuration / Composition | No application configuration or code file in the inventory (no `index.html`, bundler or unit `package.json`); MFE terms appear only in Markdown. | absent |
| Source code (boundaries) | There are no frontend units; relative import search between units does not apply. The only `.js` uses `require("fs")`/`require("path")` (`scripts/validate-agent-governance.js:3–4`). | context |

## Authorship and history

Non-shallow and partial clone (`blob:none`). There are 180 commits (180 across all refs), no merges, all with email `j4flmao@gmail.com`:
- 164 as `j4flmao`, with committer `j4flmao`;
- 14 as “Shiroko” and 2 as “Rias”, with committer `GitHub` (web interface edits, such as `e63c74b`, “Update README.md”).

The root is `af05a5d` (2026-05-14T11:48:30+07:00, “feat: agent skill suite — planning to deveploment”). Metadata does not distinguish intellectual authorship from generated content.

`git rev-list --objects $SHA --missing=print` lists 26.144 missing objects, none in the SHA tree (comparison between tree objects and the missing list: zero in common). `git show --stat` of the SHA fails due to a missing historical blob; inspection was repeated with `--no-renames --name-status`. No historical blob was read.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | No frontend unit: the repository consists of skill Markdown and assistant configurations (inventory; `package.json:2–4`). |
| Q2 | No | There are no units to assess. |
| Q3 | No | There is no host, shell or root config. |
| Q4 | No | No composition mechanism configured. `customElements.define` and `registerApplication` appear only in a guide’s code blocks (`skills/frontend/angular/architecture/references/angular-micro-frontends.md:2534`, `:2543–2545`). |
| Q5 | No | Q1–Q4 converge. |

## Rationale

- `Non-MFE` under the rule “at least one question is No”.
- It matches “repositories mentioning micro-frontends without implementing them”. In protocol filtering, it would fit “repositories that are purely documentation without an implementation”.
- Same pattern as 023: micro-frontend configuration snippets exist only as Markdown content. It also resembles content and generator cases (075/081/094/105): material to produce code in other projects, not implementation.
- `frontend_units: 0`, `unit_organization: none`, `repo_type: other`, empty technology arrays.
- There is no open decision.

## Analysis notes

- **RQ1 (misleading signals):** code search `customElements.define registerApplication` matches Markdown examples (`angular-micro-frontends.md:2534`, `:2543`), as in 023 with `ModuleFederationPlugin` in slides. Skill or prompt libraries for coding assistants are a recurring source of this false positive.
- **Protocol (search):** the README matches terminology queries only through hyphenated skill identifiers (`frontend-microfrontend`, `frontend-web-components`, `README.md:132–133`); “microfrontends” has no literal spelling. Eligibility changes from `unknown` (001) to `pass` (002).
- **Protocol (snapshot):** the SHA cloned on 2026-10-12 postdates the collections on October 7 and 8, but does not change the files generating the hits.
