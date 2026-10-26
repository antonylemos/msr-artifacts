---
schema: 1
id: 1280642191
full_name: saha007subham/frontend_prep_hub
url: https://github.com/saha007subham/frontend_prep_hub
commit: 3f598f25895946f13a91fc0acd5a4cb70d8cfd7e
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

# 154 — saha007subham/frontend_prep_hub

## Context

“Frontend Prep Hub”: React + Vite + Tailwind + Three.js landing page for a future study platform for frontend engineers (`README.md:3–7`, `24–28`). The snapshot implements only the home page (`src/App.jsx:6–17`; `README.md:282–287`, Phase 1). “Micro Frontends” appears only as a study topic listed in the README and the page's mock data. The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:155` records rank 154, ID 1280642191, status `cloned`, branch `master` and the front matter commit, which is HEAD of the clone and `origin/master`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, with reading through `${SHA}:caminho` (the original placeholder means SHA:path). No installation, build, execution or network access occurred.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:155` records strategy `terminology` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID is in `data/discovery/mfe-round-001/candidates.csv:32488` (`unknown`) and `data/discovery/mfe-round-002/candidates.csv:32496` (`pass`).

A `sqlite3 -readonly` query of the `hits`, `queries` and `subqueries` tables from both rounds, filtered by ID, returns the same two hits in each round, from endpoint `repositories`, with subquery `…#created:2026-06` and empty `path`:

| Query (`q`) | Collection 001 / 002 (UTC) |
|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | 2026-10-07T22:38:09.942Z / 2026-10-08T16:00:33.998Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | 2026-10-07T23:07:40.889Z / 2026-10-08T16:09:41.336Z |

Effective queries append `pushed:>=2025-04-01 created:2026-06-01..2026-06-30`.

Hit metadata:
- description “Frontend Prep Hub is a modern learning platform for frontend engineers to master JavaScript, React, Frontend System Design, DSA, Machine Coding, and interview preparation—all in one place.”, without the terms;
- no topics, language JavaScript, `fork: false`, size 72;
- created at 2026-06-25T19:44:00Z, pushed at 2026-06-28T13:44:48Z.

The hit comes from `README.md:99`, “- Micro Frontends”, an item in the “Frontend System Design” topic list. The singular form “micro frontend” does not appear in the README or description; that hit depends on GitHub search text processing, which is not recorded.

The README's last change is the SHA itself, `3f598f2` (2026-06-28), before October 2026 collection. The SHA's README does not postdate searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 37 entries, all regular `100644` files; zero symlinks and zero gitlinks. A single Vite project is at the root (`package.json`, `vite.config.js`, `index.html`, `src/` with `pages/LandingPage.jsx`, sections, UI, theme context and `data/mockData.js`). The `routes/`, `styles/` and `utils/` folders in the README's structure (`README.md:187–214`) do not exist. | contrary |
| Source code | `src/main.jsx:6–10` mounts `App`. `src/App.jsx:6–17` has a `BrowserRouter` with a single route to `LandingPage`. Imports are internal (`./context/ThemeContext`, `./pages/LandingPage`). | contrary |
| Configuration / Build | `vite.config.js:6–11`: only `react()` and `tailwindcss()`. `package.json:6–31`: `vite`/`vite build`, without a federation plugin or MFE dependency. | contrary |
| Content | `README.md:82–100`: “Micro Frontends” as an item in the study topic list. `src/data/mockData.js:114`, `215–216`: “microfrontends”, “microfrontend setups” and “Micro-Frontends” in landing page card text. | weak |
| Technology / Configuration / Composition (search) | `git grep -i` at the SHA (except `package-lock.json`) for `micro.?front`, `federation`, `single-spa`, `remoteEntry`, `customElements`, `iframe` and `../../../`: only the text above. | absent |

## Authorship and history

Non-shallow clone; 4 commits, no merges, all by Subham Saha. Three use `<saha007subham@gmail.com>` and the SHA, edited through the web interface, uses `<84348407+saha007subham@users.noreply.github.com>`. Root `1cb1fe4` (2026-06-26, “feat: initialize Frontend Prep Hub”) adds all code. `cc10941`, `3f924b5` and SHA `3f598f2` change only the README (`git log --no-renames --name-status`). No historical blob was read and no object was missing.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | A single frontend application; no composition configuration references other units. |
| Q2 | No | There is no second unit whose independence could be assessed. |
| Q3 | No | No host composes units; `App.jsx` only routes its own landing page. |
| Q4 | No | No composition mechanism configured (`vite.config.js:6–11`; recorded search). |
| Q5 | No | Q1–Q4 are No: conventional SPA that only mentions micro-frontends as study content. |

## Rationale

- `Non-MFE` under the rule “at least one question is No”. Matches “conventional frontend monoliths” and “repositories mentioning micro-frontends without implementing them”.
- The term is content, as in 023, here in a study platform's topic list. Unlike profiles without implementation (011/064/068/073/077/101/111), there is a real application, hence `frontend_units: 1` and `single-unit`.
- `repo_type: other`: personal product landing page in an early stage, without the character of an MFE example, template or library. `production` would also be defensible. `ui_technologies: [react]`, `build_tools: [vite]`.
- No decision remains open.

## Analysis notes

- **RQ1 (misleading signals):** a topic list item (“Micro Frontends”) in a study platform README suffices for the terminology phrase query.
- **Protocol (search):** the singular hit `"micro frontend"` has no corresponding spelling. Eligibility changes from `unknown` (001) to `pass` (002).
- **Independent review contribution (Lupa):** agreement with Non-MFE, Q1–Q5 No and one unit (src/Vite), with `draft`; the hit came from the README's educational content, without MFE configuration or implementation. The review pointed out a discrepancy regarding a joint review section that supposedly cited `vue/` and an initial count of four targets; verification showed that this text is not in this annotation and there is no `vue/` in the commit tree (the mention belongs to another annotation, 080), so no change was made. The reviewer also confirmed that part of the structure listed in the README (lines 187–214: `vue/`, `routes/`, `styles/`, `utils/`) does not match the snapshot.
