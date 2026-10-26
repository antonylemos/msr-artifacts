---
schema: 1
id: 679332000
full_name: Priyammondal/portfolio
url: https://github.com/Priyammondal/portfolio
commit: 8db2d68c9318419ef669e69a701ffad351bc7907
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

# 353 — Priyammondal/portfolio

## Context

Personal developer portfolio: a React 18 + Vite SPA published on GitHub Pages (`README.md:1–6`; `package.json:2`, `:7–16`; `vite.config.js:4–7`). Micro-frontends and Module Federation appear only in the description of a listed project, “Shop.”, maintained in another repository (`README.md:29`; `src/assets/data.js:244–253`), and as a skill (`README.md:51`). The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:354` records rank 353, ID 679332000, status `cloned`, branch `main` and the front matter commit, which is the HEAD of the clone and of `origin/main`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. There was no installation, build, execution or network access.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:354` records strategies `terminology;technology` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID appears in `data/discovery/mfe-round-001/candidates.csv:6467` and `data/discovery/mfe-round-002/candidates.csv:6471`, both with `terminology;technology` and `pass`.

A `sqlite3 -readonly` query against tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns the same three hits in each round, from endpoint `repositories` and with an empty `path`:

| Query (`q`) | Subquery | Collection 001 / 002 (UTC) |
|---|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | `…#created:2023-08` | 2026-10-07T22:18:25.429Z / 2026-10-08T15:52:56.191Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | `…#created:2023-08` | 2026-10-07T22:49:06.423Z / 2026-10-08T16:04:37.289Z |
| `technology-module-federation-repositories`: `"module federation" in:name,description,readme` | `…#created:2023-08` | 2026-10-07T23:15:58.300Z / 2026-10-08T16:13:13.439Z |

The effective queries append `pushed:>=2025-04-01 created:2023-08-01..2023-08-31`.

Hit metadata (identical in both rounds): null description, no topics, language JavaScript, `fork: false`, size 40378, created at 2023-08-16T15:49:07Z, pushed at 2026-09-23T18:33:33Z.

Matches in the SHA README:
- **“micro frontend” and “module federation”:** `README.md:29` (“**Shop.** – Micro-frontend e-commerce app using Module Federation”);
- **“micro frontends”:** `README.md:51` (“Modular architecture & micro-frontends”).

The last README change is `526ab8f` (2026-01-20). The SHA (2026-09-23T23:55:44+05:30, “Updated Resume”) coincides with `pushed_at`. Both predate the October 2026 collections, and the README at the SHA does not postdate the searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 102 entries, all regular files `100644`; zero symlinks and zero gitlinks. A single Vite project: `index.html`, `package.json`, `vite.config.js`, `src/` (pages, sections, components, data and images), `public/` (icons, `404.html`, photo). | contrary |
| Configuration / Build | `package.json:7–16`: `vite`, `vite build` and deployment to `gh-pages`; `:17–31`: React, MUI, Bootstrap, React Router and forms, without federation packages. `vite.config.js:4–37`: `react()`, GitHub Pages `base` and React `manualChunks`; no federation. | contrary |
| Source code | `src/main.jsx:1–15`: `createRoot` with `HashRouter` and `App`. Pages and sections in `src/pages/` are components of the same application, imported through internal paths (for example, `src/Layout/MainLayout/index.jsx:1–2`, `../../components/…`). | contrary |
| Documentation / data (MFE mentions) | `README.md:29`, `:51`; `src/assets/data.js:244–253`: “Shop.” project card with description “microfrontend architecture and module federation”, Netlify URL and repository `Priyammondal/e-commerce-micro-frontend-react-application`. This is content displayed by the portfolio. | weak |
| Technology / Configuration / Composition (search) | `git grep -i` at the SHA, except lockfile and PDF, for `micro.?front`, `federation`, `single.?spa`, `remoteEntry`, `import.?map` and `<iframe`: only the mentions above. | absent |

## Authorship and history

Non-shallow and partial clone (`blob:none`). There are 80 commits reachable from the SHA (157 across all refs, including `origin/gh-pages` with published builds), no merges, all by the owner with email `priyammondal096@gmail.com`, except one commit with local corporate email `priyam.mondal@RebelFoods-6.local`. Records range from 2023-08-16 (`2b85079`, “first push”) to the SHA (2026-09-23, “Updated Resume”). `git rev-list --objects $SHA --missing=print` lists 436 missing objects, none in the SHA tree.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | A single SPA with one entry point and one build (`src/main.jsx:1–15`; `vite.config.js:4–37`); no composition configuration. |
| Q2 | No | There are not two units; sections and pages are components of the same application. |
| Q3 | No | There is no host loading units; `HashRouter` routes internal pages. |
| Q4 | No | No composition mechanism; Module Federation is cited as another project’s technology (`README.md:29`; `src/assets/data.js:248`). |
| Q5 | No | Q1–Q4 converge. |

## Rationale

- `Non-MFE` under the rule “at least one question is No”. It matches “repositories mentioning micro-frontends without implementing them” and “conventional frontend monoliths”.
- Same pattern as 250 (draft, portfolio with MF as a described professional project) and, through the micro-frontends skill mention, profiles 011/064/068/073/077/101/111.
- The cited MFE project is in another repository; it is not assessed here.
- `frontend_units: 1`, `single-unit`, `ui_technologies: [react]`, `build_tools: [vite]`, `repo_type: other` (personal portfolio).
- There is no open decision.

## Analysis notes

- **RQ1 (misleading signals):** portfolios listing micro-frontends projects (README and displayed data) enter through the three terminology and technology queries without containing the implementation.
- **Protocol (families):** cited project `Priyammondal/e-commerce-micro-frontend-react-application` appears in the rounds (`data/discovery/mfe-round-002/candidates.csv:9149`), outside the sample and not inspected.
- **Protocol:** eligibility is `pass` in both rounds.
