---
schema: 1
id: 1023722918
full_name: Gabrial-8467/karan_homeo_pharmacy
url: https://github.com/Gabrial-8467/karan_homeo_pharmacy
commit: 32f56c8e4953a5a64f61e9faab62b304d8250110
classification: Non-MFE
checklist: { q1: yes, q2: yes, q3: no, q4: no, q5: no }
repo_type: production
approaches: []
ui_technologies: [react]
build_tools: [vite]
frontend_units: 2
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 359 — Gabrial-8467/karan_homeo_pharmacy

## Context

Full-stack e-commerce platform with Node.js/Express backend (`backend/`) and two separate React + Vite applications: `admin` (port 4444) and `frontend`, the customer store (port 3000). Each application has its own `vercel.json` (`README.md:1–4`, `27–33`). The README calls this “micro‑frontend” architecture: “each UI has its own build pipeline, `package.json`, and deployment configuration, while sharing a common backend API.” (`README.md:4`). There is no host or mechanism composing both applications. The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:360` records rank 359, ID 1023722918, status `cloned`, branch `main` and the front matter commit, which is the HEAD of the clone and of `origin/main`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. There was no installation, build, execution or network access.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:360` records strategy `terminology` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID appears in `data/discovery/mfe-round-001/candidates.csv:16664` (`unknown`) and `data/discovery/mfe-round-002/candidates.csv:16668` (`pass`).

A `sqlite3 -readonly` query against tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns the same two hits in each round, from endpoint `repositories`, with subquery `…#created:2025-07` and an empty `path`:

| Query (`q`) | Collection 001 / 002 (UTC) |
|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | 2026-10-07T22:24:04.410Z / 2026-10-08T15:55:14.653Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | 2026-10-07T22:55:39.933Z / 2026-10-08T16:06:16.274Z |

The effective queries append `pushed:>=2025-04-01 created:2025-07-01..2025-07-31`.

Hit metadata:
- null description, no topics, language JavaScript, `fork: false`, size 11.578;
- created at 2025-07-21T15:37:46Z, pushed at 2026-07-02T06:38:21Z.

The only spelling is “micro‑frontend”, with a nonbreaking hyphen (U+2011), in `README.md:4`. The plural does not appear; both hits depend on GitHub search text processing, which is not recorded. The last README change is the SHA itself (2026-07-02), before the October 2026 collections. The README at the SHA does not postdate the searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 80 entries, all regular files `100644`; zero symlinks and zero gitlinks. There are `admin/`, `frontend/` (32 files in `src/` combined), `backend/` (Express, routes, models) and root `README.md`. | context |
| Applications | `admin/vite.config.js:1–15` and `frontend/vite.config.js:1–43`: only React and Tailwind, ports 4444 and 3000. Each app’s `vercel.json` has only a SPA rewrite to its own `index`. | contrary |
| Mechanism search | `git grep` in `admin/` and `frontend/`, without lockfiles, for `federation`, `remoteEntry`, `iframe`, `single-spa` and URL `import()`: nothing. No `../../` imports in `admin/src` and `frontend/src`. | absent |
| Documentation | `README.md:4`: “micro‑frontend” defined as UIs with their own build, `package.json` and deployment sharing a backend, without composition. | contrary |

## Authorship and history

Non-shallow clone; 181 commits across all refs, 2 merges, from 2025-07-21 to 2026-07-02 (SHA `32f56c8`). Authors appear as `gabrialdeora`, “Gabrial Deora” and `Gabrial-8467`; some commits were made through the GitHub interface. Only branch `main` exists. No historical blob was read and there was no missing object.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | Yes | Two identifiable frontend applications (`admin`, `frontend`). |
| Q2 | Yes | Each has its own `package.json`, Vite, port and deployment, without code import between them. |
| Q3 | No | No host, shell or root configuration loads, mounts or routes the applications. |
| Q4 | No | No composition mechanism configured. |
| Q5 | No | Two independent SPAs sharing only the backend. |

## Rationale

- `Non-MFE` under the rule “at least one question is No”. It matches “multiple frontend applications without explicit composition”.
- Same categorization as draft 278 (role-based SPAs called micro-frontends, without composition).
- **Fields:** `frontend_units: 2`, `unit_organization: monorepo`, `approaches: []`, `ui_technologies: [react]`, `build_tools: [vite]`, `repo_type: production` (e-commerce with Vercel deployment configuration; a judgment, with `example` as the alternative).
- There is no open decision.

## Analysis notes

- **RQ1 (misleading signals):** “micro‑frontend” used for separate SPAs with a common backend matches terminology queries.
- **Protocol (search):** the README uses a nonbreaking hyphen (U+2011), and plural does not appear. Eligibility changes from `unknown` (001) to `pass` (002).
