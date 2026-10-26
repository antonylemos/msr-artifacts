---
schema: 1
id: 1060508445
full_name: ShubhamSahaniNitkkr/yt300-byshubhamsunny
url: https://github.com/ShubhamSahaniNitkkr/yt300-byshubhamsunny
commit: 7d901fc5b71b1aad992d3ebed78c4e7efb9eaa68
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: other
approaches: []
ui_technologies: [react]
build_tools: [vite]
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 157 — ShubhamSahaniNitkkr/yt300-byshubhamsunny

## Context

Repository for a JavaScript tutorial channel. The README (537 lines) is a “300 projects” roadmap, almost all “Coming Soon” (`README.md:1–25`). The snapshot contains:
- the only finished project, `Google__Sign-In__Signup/`, a Vite + React scaffold;
- 28 two-line `module_*.js` files, each only exporting a function returning a constant.

Micro-frontends and Module Federation appear only as future roadmap items (`README.md:451`, `456`). The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:158` records rank 157, ID 1060508445, status `cloned`, branch `main` and the front matter commit, which is HEAD of the clone and `origin/main`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, with reading through `${SHA}:caminho` (the original placeholder means SHA:path). No installation, build, execution or network access occurred.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:158` records strategies `terminology;technology` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID is in `data/discovery/mfe-round-001/candidates.csv:19013` (`unknown`) and `data/discovery/mfe-round-002/candidates.csv:19019` (`pass`).

A `sqlite3 -readonly` query of the `hits`, `queries` and `subqueries` tables from both rounds, filtered by ID, returns the same three hits in each round, from endpoint `repositories`, with subquery `…#created:2025-09` and empty `path`:

| Query (`q`) | Collection 001 / 002 (UTC) |
|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | 2026-10-07T22:26:15.828Z / 2026-10-08T15:56:00.250Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | 2026-10-07T22:57:04.160Z / 2026-10-08T16:06:48.173Z |
| `technology-module-federation-repositories`: `"module federation" in:name,description,readme` | 2026-10-07T23:20:19.129Z / 2026-10-08T16:15:54.936Z |

Effective queries append `pushed:>=2025-04-01 created:2025-09-01..2025-09-30`.

Hit metadata:
- description “YT300-ByShubhamSunny: 300+ Javascript solutions made super simple! …”, without the terms;
- no topics, language JavaScript, `fork: false`, size 49;
- created at 2025-09-20T03:43:31Z, pushed at 2026-06-21T09:44:11Z;
- homepage on personal GitHub Pages.

README spellings:
- “Micro-frontend”: `README.md:451` (“347. 🧩 Micro-frontend architecture *(Coming Soon)*”);
- “Module federation” and “micro-frontends”: `README.md:456` (“352. 🏗️ Module federation for micro-frontends *(Coming Soon)*”).

Phrase search treats the hyphen as a separator. The README's last change is `94beea3` (2025-10-05), before October 2026 collection. The SHA's README does not postdate searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 43 entries, all regular `100644` files; zero symlinks and zero gitlinks. The root contains `.gitignore`, `README.md` and 28 `module_*.js`; `Google__Sign-In__Signup/` contains 13 files of a Vite project (`package.json`, `vite.config.js`, `index.html`, `src/`). | context |
| Source code (project) | `Google__Sign-In__Signup/src/main.jsx:6–10` mounts `App`. `src/App.jsx` begins with the default Vite template (logos, counter). `Google__Sign-In__Signup/vite.config.js:5–7`: only `react()`. `Google__Sign-In__Signup/package.json:6–25`: Vite, `react`/`react-dom`, without an MFE dependency. | contrary |
| Source code (`module_*` files) | Examples `module_1096_64.js:1–2` (“// Improve fault tolerance” / `export function update64() { return 64; }`) and `module_32580_649.js:1–2`. The files are not imported by anything and belong to no project. | context |
| Documentation | `README.md:16–25` onward: 300-project roadmap with video links; items 347 and 352 (`README.md:451`, `456`) are marked “Coming Soon”. | weak |
| Technology / Configuration / Composition (search) | `git grep -i` at the SHA (except lockfiles and README) for `federation`, `single-spa`, `remoteEntry`, `customElements`, `iframe` and `../../`: no results. | absent |

## Authorship and history

Non-shallow clone; 34 commits, no merges, all by owner `<shubhamsahaninitkkr@gmail.com>`, under names “ShubhamSahaniNitkkr” (30) and “Shubham Sunny” (4, through GitHub).
- **Beginning:** root is `ab4e756` (2025-09-20, “Project.md Addition”); `7272026` adds the Google Sign-In project, and the next 4 commits through `94beea3` (2025-10-05) change the README.
- **Automatic commits:** above `94beea3` in the topology are 28 commits with standardized messages (“Improve fault tolerance - <data>”, “Add feature - <data>”, “Optimize database queries - <data>”), each adding a `module_*.js` (for example, the SHA only adds `module_18790_1819.js`). English translation of the original placeholder <data>: date.
- **Inconsistent dates:** these commits have author and committer dates from 2025-06-13 to 2026-06-10. Several precede repository creation (2025-09-20) and parent commit `94beea3`. Dates do not reflect actual order.

No historical blob was read. The clone is partial (`blob:none`) and `git rev-list --objects --missing=print` reports five missing promisor objects in reachable history; snapshot blobs were read locally, without network, and missing content is not inferred.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | A single frontend application (`Google__Sign-In__Signup/`); the `module_*.js` are not units. No composition configuration. |
| Q2 | No | There is no second unit whose independence could be assessed. |
| Q3 | No | No host composes units. |
| Q4 | No | No composition mechanism (recorded search). |
| Q5 | No | Q1–Q4 are No: tutorial roadmap only mentioning micro-frontends and Module Federation as future items. |

## Rationale

- `Non-MFE` under the rule “at least one question is No”. Matches “repositories mentioning micro-frontends without implementing them”.
- The terms are planned content, as in 023. There is a real frontend project (login tutorial scaffold), hence `frontend_units: 1` and `single-unit`, rather than 0 as in profiles without implementation.
- `repo_type: other`: tutorial collection with an initial project, without the character of an MFE example, template or product. `ui_technologies: [react]` and `build_tools: [vite]`, from the only project.
- No decision remains open.

## Analysis notes

- **RQ1 (misleading signals):** README in content roadmap form with “Micro-frontend architecture” and “Module federation for micro-frontends” items not yet produced. It matches terminology and technology queries.
- **Protocol (search/eligibility):** automatic commits of trivial files keep `pushed_at` recent and satisfy `pushed:>=2025-04-01`. Eligibility changes from `unknown` (001) to `pass` (002). These files' commit dates are unreliable for historical analysis.
- **Independent review contribution (Lupa):** full agreement with Non-MFE and Q1–Q5 No; no open decision. Adopted correction: the sentence “no objects were missing” was adjusted (five missing promisor objects, verified). Provenance: hit data does not independently identify the responsible field, and search may normalize the README's hyphenated form.
