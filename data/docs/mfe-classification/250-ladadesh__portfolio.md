---
schema: 1
id: 1341747340
full_name: ladadesh/portfolio
url: https://github.com/ladadesh/portfolio
commit: 18a17260b26812306ebd3f1f60778c0283d3cf61
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

# 250 — ladadesh/portfolio

## Context

Personal developer portfolio with a Deadpool theme: a single React 19 + Vite SPA published on Vercel (`README.md:1–7`; `package.json:6–23`; `vercel.json:1–11`). Module Federation and micro-frontends appear only as skills and as a professional project described in text. The site itself says that these projects’ code belongs to clients and remains “behind a corporate firewall” (`src/components/Projects.tsx:12–16`). The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:251` records rank 250, ID 1341747340, status `cloned`, branch `main` and the front matter commit, which is the HEAD of the clone and of `origin/main`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. There was no installation, build, execution or network access.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:251` records strategy `technology` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID appears in `data/discovery/mfe-round-001/candidates.csv:35796` (`technology`, `unknown`) and `data/discovery/mfe-round-002/candidates.csv:35801` (`technology`, `pass`).

A `sqlite3 -readonly` query against tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns one hit per round, from endpoint `repositories` and with an empty `path`:

| Query (`q`) | Subquery | Effective query | Collection 001 / 002 (UTC) |
|---|---|---|---|
| `technology-module-federation-repositories`: `"module federation" in:name,description,readme` | `technology-module-federation-repositories#created:2026-08` | `"module federation" in:name,description,readme pushed:>=2025-04-01 created:2026-08-01..2026-08-31` | 2026-10-07T23:30:30.768Z / 2026-10-08T16:19:25.793Z |

Hit metadata (identical in both rounds): null description, no topics, language TypeScript, `fork: false`, size 3372, homepage `https://deadpool-portfolio.vercel.app`, created at 2026-08-21T11:43:04Z, pushed at 2026-08-21T13:32:49Z.

Without a description, the match comes from the README. The spelling “Module Federation” appears in `README.md:16` (portfolio highlights list), `README.md:204` (current role) and `README.md:1172` (focus areas).

The last README change is `c977feb` (2026-08-21T18:25:44+05:30). The SHA (2026-08-21T18:54:59+05:30) changes only components and styles. Both predate the October 2026 collections, and the README at the SHA does not postdate the searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 69 entries, all regular files `100644`; zero symlinks and zero gitlinks. These are one `package.json`, one `index.html`, one `vite.config.ts` and `src/` (components, data, hooks, styles and image assets), plus `public/` (PDF resume, icons, `_redirects`, `sitemap.xml`), two Python image adjustment scripts and `vercel.json`. | contrary |
| Configuration / Build | `package.json:6–11`: `dev`, `build` (`tsc -b && vite build`) and `preview`; `:12–23`: only React, React DOM, Vite and tooling, without federation packages. `vite.config.ts:5–7`: only `react()`. `vercel.json:2` and `public/_redirects:1`: SPA fallback to `/index.html`. | contrary |
| Source code | `index.html:79`, `:91` → `src/main.tsx:11–15` → `src/App.tsx:13–31`, `:84–103`: one React tree statically importing all sections (Hero, About, Experience, Projects etc.) and easter eggs. Routing uses `location.pathname` only for the 404 page (`src/App.tsx:36`, `:69`, `:77–78`). | contrary |
| Source code (boundaries) | Active search `git grep -E '\.\./'` in `src`: all `../` and `../../` go from `src/components/*` to `src/data/portfolio`, `src/hooks` and `src/assets`, within the same application (for example, `src/components/easter-eggs/Forbidden.tsx:2–6`). | context |
| Documentation / Source code (MFE mentions) | `README.md:16`, `:204`, `:1172`: Module Federation as a skill and professional focus. `index.html:22`, `:31`, `:45`, `:68–69`: SEO and JSON-LD metadata (`knowsAbout`: “Module Federation”, “Micro Frontends”). `src/data/portfolio.ts:68–71`: experience at Impressico; `:177–186`: “Micro-Frontend Platform” project described in text (Module Federation remotes, Webpack 5); `:266–267`: “Micro Frontends” and “Module Federation” in the skills list. `src/components/ui/MissionGraphic.tsx:62–66`: SVG illustration with “HOST” label for this project. All is displayed content, not configuration. | weak |
| Technology / Configuration / Composition (search) | `git grep -i` at the SHA, except `package-lock.json` and `README.md`, for `micro.?front`, `federation`, `single.?spa`, `remoteEntry`, `import.?map`, `customElements`, `<iframe`, `qiankun`, `wujie` and `registerApplication`: only the texts and illustration above. No composition mechanism configured. | absent |

## Authorship and history

Non-shallow and partial clone (`blob:none`). There are 3 commits (3 across all refs), no merges:
- root `e4b920f` (2026-08-21T17:12:55+05:30), by `adesh <ladadesh@gmail.com>`, adds the entire project at once;
- `c977feb` (2026-08-21T18:25:44+05:30), by `Adesh Lad <68003659+ladadesh@users.noreply.github.com>` with committer `GitHub`, changes only the README (editing through the web interface);
- SHA `18a1726` (2026-08-21T18:54:59+05:30), by `adesh <ladadesh@gmail.com>`, adjusts `Hero.tsx`, `Whisper.tsx` and two CSS files.

The identity is the account owner’s, and the portfolio describes the same person (`index.html:12`, `:48`). `.claude/launch.json` indicates coding assistant use; metadata does not distinguish intellectual authorship.

`git rev-list --objects $SHA --missing=print` lists 5 missing objects, none in the SHA tree (earlier versions of changed files). No historical blob was read.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | A single frontend unit: one SPA with one `index.html`, one entry point (`src/main.tsx:11–15`) and one build (`package.json:8`; `vite.config.ts:5–7`). No composition configuration references external units (recorded search). |
| Q2 | No | There are not two units to assess; all sections are statically imported by the same tree (`src/App.tsx:13–31`). |
| Q3 | No | There is no host, shell or root config loading units; routing only switches the 404 page (`src/App.tsx:69`, `:77–78`). |
| Q4 | No | No composition mechanism configured; Module Federation and micro-frontends are resume text (`README.md:16`; `src/data/portfolio.ts:177–186`). |
| Q5 | No | Q1–Q4 converge. |

## Rationale

- `Non-MFE` under the rule “at least one question is No”.
- It matches “repositories mentioning micro-frontends without implementing them” and “conventional frontend monoliths”.
- Same pattern as profiles 011/064/068/073/077/101/111: micro-frontends as a listed skill. Unlike those profiles, which have only a README (`frontend_units: 0`), here there is an implemented application, recorded as `frontend_units: 1` and `single-unit`, as in the static portfolio in 141 (draft).
- The “Micro-Frontend Platform” project is described professional experience, not repository code (`src/components/Projects.tsx:12–16`).
- `repo_type: other` (personal portfolio); `ui_technologies: [react]` and `build_tools: [vite]` based on observed configuration.
- There is no open decision.

## Analysis notes

- **RQ1 (misleading signals):** beyond the README, source code contains “Module Federation”, “Micro Frontends” and an illustration with “HOST” (`src/data/portfolio.ts:177–186`, `:266–267`; `src/components/ui/MissionGraphic.tsx:62–66`; `index.html:68–69`). Code searches for these terms would give a false positive, and the repository passed round 002 eligibility.
- **Protocol (search):** entry only through the technology query `"module federation"` in the README. Eligibility changes from `unknown` (001) to `pass` (002).
