---
schema: 1
id: 1293401635
full_name: varunkumar91503773-dot/bg-changer
url: https://github.com/varunkumar91503773-dot/bg-changer
commit: 1b94513204ad1284575a557617ee96c4079e3613
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: example
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

# 169 — varunkumar91503773-dot/bg-changer

## Context

Small React + Vite + Tailwind application changing page background color through buttons (`src/App.jsx:3–38`), with a Vercel demo. `README.md` does not describe the project: it copies package `@vitejs/plugin-react` documentation (`README.md:1–3`), and `LICENSE` is Vite's (“Copyright (c) 2019-present, Yuxi (Evan) You and Vite contributors”, `LICENSE:3`). Module Federation appears only in this third-party README, explaining option `reactRefreshHost` (`README.md:72`). The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:170` records rank 169, ID 1293401635, status `cloned`, branch `main` and the front matter commit, which is HEAD of the clone and `origin/main`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, with reading through `${SHA}:caminho` (the original placeholder means SHA:path). No installation, build, execution or network access occurred.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:170` records strategy `technology` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID is in `data/discovery/mfe-round-001/candidates.csv:33139` (`unknown`) and `data/discovery/mfe-round-002/candidates.csv:33147` (`pass`).

A `sqlite3 -readonly` query of the `hits`, `queries` and `subqueries` tables from both rounds, filtered by ID, returns one hit per round, from endpoint `repositories` and with empty `path`:

| Query (`q`) | Subquery | Effective query | Collection 001 / 002 (UTC) |
|---|---|---|---|
| `technology-module-federation-repositories`: `"module federation" in:name,description,readme` | `technology-module-federation-repositories#created:2026-07` | `"module federation" in:name,description,readme pushed:>=2025-04-01 created:2026-07-01..2026-07-31` | 2026-10-07T23:29:25.295Z / 2026-10-08T16:19:04.667Z |

Hit metadata:
- null description, no topics, language CSS, `fork: false`, size 34;
- created at 2026-07-08T09:51:05Z, pushed at 2026-07-12T08:13:22Z;
- homepage `bg-changer-mu-six.vercel.app`.

The hit comes from `README.md:72`, “…only necessary in a module federation context…”, the only occurrence and text from `@vitejs/plugin-react` documentation. The README's last change is `ab51b09` (2026-07-12), before October 2026 collection. The SHA's README does not postdate searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 12 entries, all regular `100644` files; zero symlinks and zero gitlinks. A single Vite project at the root (`package.json`, `vite.config.js`, `index.html`, `src/`). | contrary |
| Source code | `src/main.jsx:6–10` mounts `App`. `src/App.jsx:3–38`: color state and buttons changing the background. Imports are internal. | contrary |
| Configuration / Build | `vite.config.js:5–10`: only `tailwindcss()` and `react()`. `package.json:5–19`: `vite`/`vite build`, React, Tailwind and Vite dependencies, without a federation plugin. | contrary |
| Documentation (third-party) | `README.md:1–3`, `72–78`: `@vitejs/plugin-react` documentation, mentioning Module Federation for option `reactRefreshHost`. `LICENSE:3`: Vite license. Nothing describes the project. | weak |
| Technology / Configuration / Composition (search) | `git grep -i` at the SHA for `federation` and `micro`: only `README.md:72`. | absent |

## Authorship and history

Non-shallow clone; 7 commits, 2 merges.
- **Main author:** `varunkumar91503773-dot <varunkumar91503773@gmail.com>`, through the web, made the initial upload in `873f179` (2026-07-08, “Add files via upload”, already including README and LICENSE).
- **External contribution:** `Andro <androdotdev@gmail.com>` reorganized files into `src/` in `aa184a9`, integrated through PR #1 (`5a5e714`).
- **Local commits:** `varun <varun30362@gmail.com>` added the files again in `ab51b09` (2026-07-12), made merge `bb55321` and corrections through SHA `1b94513` (“fixeed again”), changing only `src/App.jsx` (`git log --no-renames --name-status`).

No historical blob was read and no object was missing.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | A single frontend application; no composition configuration. |
| Q2 | No | There is no second unit whose independence could be assessed. |
| Q3 | No | No host composes units. |
| Q4 | No | No composition mechanism (`vite.config.js:5–10`; recorded search). |
| Q5 | No | Q1–Q4 are No: trivial SPA whose third-party copied README mentions Module Federation. |

## Rationale

- `Non-MFE` under the rule “at least one question is No”. Matches “conventional frontend monoliths” and “repositories mentioning micro-frontends without implementing them”. Here the mention is not even the author's, but third-party documentation versioned by mistake or copying.
- A real application exists, hence `frontend_units: 1`, `single-unit`, unlike profiles without implementation. `repo_type: example`: learning exercise with a published demo. `ui_technologies: [react]`, `build_tools: [vite]`.
- No decision remains open.

## Analysis notes

- **RQ1 (misleading signals):** README copied from a third-party package (`@vitejs/plugin-react`) whose documentation mentions Module Federation suffices for technology query `"module federation"`.
- **Protocol (search):** entry only through this query. Eligibility changes from `unknown` (001) to `pass` (002).
- **Independent review contribution (Lupa):** full agreement with Non-MFE, Q1–Q5 No, `example`, React/Vite, one unit and `single-unit`; no open decision (`draft`). The Module Federation mention in the README belongs to `@vitejs/plugin-react` package documentation, rather than application code or configuration. History (seven commits and two merges, with three author identities) checked out: the initial upload is “Add files via upload”, without inferring more than the operation name.
