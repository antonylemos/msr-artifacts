---
schema: 1
id: 1273847803
full_name: rendongping/jgs
url: https://github.com/rendongping/jgs
commit: d9e8b7e64e32adbd62deb74fb3c9c2a14dcccb4b
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: other
approaches: []
ui_technologies: [vue]
build_tools: []
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 239 — rendongping/jgs

## Context

“前端架构师知识图谱与学习资料库” (English translation: “Frontend architect knowledge graph and learning resources repository”, `README.md:1–8`). The repository organizes study documents, exercise workbooks and interview question banks into four levels (`level-01-foundation` to `level-04-leadership`), plus `interview-bank/`, `quizzes/` and `templates/`. This content is published through a single VitePress static site (`website/`). One architecture chapter is `A02-micro-frontend/` (“微前端”; English translation: “micro-frontends”, `README.md:156`), with text about qiankun, single-spa and Module Federation. There is no frontend composition configuration. The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:240` records rank 239, ID 1273847803, status `cloned`, branch `master` and the front matter commit, which is the HEAD of the clone and of `origin/master`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. There was no installation, build, execution or network access.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:240` records strategy `terminology` and eligibility `unknown`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID appears in `data/discovery/mfe-round-001/candidates.csv:32118` and `data/discovery/mfe-round-002/candidates.csv:32126`, both with `unknown`.

A `sqlite3 -readonly` query against tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns the same two hits in each round, from endpoint `repositories`, with subquery `…#created:2026-06` and an empty `path`:

| Query (`q`) | Collection 001 / 002 (UTC) |
|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | 2026-10-07T22:38:23.431Z / 2026-10-08T16:00:38.564Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | 2026-10-07T23:08:11.673Z / 2026-10-08T16:09:47.363Z |

The effective queries append `pushed:>=2025-04-01 created:2026-06-01..2026-06-30`.

Hit metadata:
- null description, no topics, language Python, `fork: false`, size 13.122;
- created at 2026-06-18T23:50:30Z, pushed at 2026-08-07T09:58:53Z.

The match comes from `README.md:156`, `├── A02-micro-frontend/    # 微前端` (English translation of the comment: “micro-frontends”), a folder name in the index. Phrase search treats the hyphen as a separator. The plural “micro frontends” does not appear literally in the README; this hit depends on GitHub search text processing, which is not recorded.

The last README change is `da9def8` (2026-06-25), before the October 2026 collections. The README at the SHA does not postdate the searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 714 entries, all regular files `100644`; zero symlinks and zero gitlinks. Markdown and JSON content predominate (levels, `interview-bank/`, `quizzes/`, `website/`). Also versioned are `tmp-pinyin/node_modules/` (35 entries), `__pycache__/` and temporary scripts (`temp_w1.py` to `temp_w3.py`). | context |
| Configuration / Build | `website/package.json:6–17`: a single VitePress site (`vitepress dev/build`, Vue 3, ECharts). `.github/workflows/deploy.yml:18–51`: build of `website/` and publication of `website/.vitepress/dist` to GitHub Pages. The only `package.json` are in `website/` and `tmp-pinyin/`. There is no `ModuleFederationPlugin`, `registerApplication`, `registerMicroApps` or `remoteEntry` in code files. | contrary |
| Content | `level-03-architecture/A02-micro-frontend/` (`01-学习文档.md`, `02-练习册.md`, `03-面试题.md`) and `website/architecture/micro-frontend*.md`: study material and questions about micro-frontends. Mentions of qiankun/single-spa/Module Federation in JSON (for example, `interview-bank/data/quality-audit.json:28226`, `28574`) are question titles. | weak |
| Source code | The theme’s Vue components (`website/.vitepress/theme/components/*.vue`) implement the study site itself (quizzes, dashboard, assistant); “micro-frontend” occurrences in them are content labels. | context |

## Authorship and history

Non-shallow clone; 21 commits, 1 merge. There are 18 by pingi `<754830524@qq.com>` and 3 by `GitHub Actions <actions@github.com>` (deployment trigger and question insertions). They range from 2026-06-18 (`aa206e9`, “ADD-前端架构师进阶规划初始化”; English translation: “ADD-initialize frontend architect advancement plan”) to 2026-08-07 (SHA `d9e8b7e`, adjustment of the site `base` for a custom domain). The default branch is `master`. No historical blob was read and there was no missing object.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | A single frontend application (the VitePress site); no configuration references another unit. |
| Q2 | No | There is no second unit whose independence could be assessed. |
| Q3 | No | There is no host composing units. |
| Q4 | No | No composition mechanism; Module Federation, qiankun and single-spa appear only as study content. |
| Q5 | No | Q1–Q4 are No: knowledge base whose micro-frontends chapter is teaching material. |

## Rationale

- `Non-MFE` under the rule “at least one question is No”. It matches “repositories mentioning micro-frontends without implementing them”.
- This is teaching and interview content, as in 023 and draft 194 (exercises and notes about micro-frontends within a study site).
- `frontend_units: 1`, `unit_organization: single-unit`, `ui_technologies: [vue]`, `build_tools: []` (VitePress encapsulates the build), `repo_type: other`, as in 194.
- There is no open decision.

## Analysis notes

- **RQ1 (misleading signals):** folder name `A02-micro-frontend/` in the README index of a study repository.
- **Protocol (search):** the plural hit has no literal spelling. Eligibility `unknown` in both rounds; the repository entered the sample with `unknown`. The main language “Python” is due to helper scripts.
