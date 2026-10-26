---
schema: 1
id: 1320260293
full_name: suciandriaa/microstock-frontend
url: https://github.com/suciandriaa/microstock-frontend
commit: 798d8c8738526c0b29f3a40966f05a2f935c5d97
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: example
approaches: []
ui_technologies: []
build_tools: []
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 261 — suciandriaa/microstock-frontend

## Context

Single HTML page for a stock photo and video metadata generator (“Microstock AI Metadata Bulk Generator”, `index.html:6`), with Tailwind through CDN, inline script and calls to a separate backend on Vercel (`index.html:7–9`, `:79–81`). The README contains only title `# microstock-frontend` (`README.md:1`). “Microstock” refers to the stock image market, not micro-frontends. The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:262` records rank 261, ID 1320260293, status `cloned`, branch `main` and the front matter commit, which is the HEAD of the clone and of `origin/main`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. There was no installation, execution or network access (backend and CDNs were not consulted).

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:262` records strategy `terminology` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID appears in `data/discovery/mfe-round-001/candidates.csv:34633` (`terminology`, `unknown`) and `data/discovery/mfe-round-002/candidates.csv:34639` (`terminology`, `pass`).

A `sqlite3 -readonly` query against tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns one hit per round, from endpoint `repositories` and with an empty `path`:

| Query (`q`) | Subquery | Effective query | Collection 001 / 002 (UTC) |
|---|---|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | `terminology-micro-frontend-repositories#created:2026-08` | `"micro frontend" in:name,description,readme pushed:>=2025-04-01 created:2026-08-01..2026-08-31` | 2026-10-07T22:40:50.062Z / 2026-10-08T16:01:32.208Z |

Hit metadata (identical in both rounds): null description, no topics, language HTML, `fork: false`, size 15, homepage `https://microstock-frontend.vercel.app`, created at 2026-08-02T14:25:53Z, pushed at 2026-08-02T14:37:32Z.

**Spelling:** neither name, description (null) nor README (`README.md:1`, `# microstock-frontend`, 21 bytes) contains the phrase “micro frontend”. The only nearby text is `microstock-frontend`, in which “micro” is a prefix of “microstock”. The match depends on GitHub search text processing, which is not recorded; no matched line is attributed when the API did not report one.

The README was created only in root commit `b609b2f` (2026-08-02T21:25:54+07:00) and was not changed afterward. The SHA (2026-08-02T21:37:32+07:00, that is, 14:37:32Z) coincides with `pushed_at` and predates the October 2026 collections. The README at the SHA does not postdate the searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 2 entries, `README.md` and `index.html`, both regular files `100644`; zero symlinks and zero gitlinks. There is no manifest, build or other scripts. | contrary |
| Source code | `index.html:1–228`: single page with HTML, Tailwind through CDN (`:7`), Font Awesome (`:8`) and inline script (`:79–225`) for uploading up to 10 files, metadata generation through `fetch` to the backend (`:135–139`), CSV export (`:187–206`) and credit purchase (`:208–225`). | contrary |
| Source code (external services) | `index.html:9`: Midtrans Snap script (sandbox), with replaceable client key (`MASUKKAN_MIDTRANS_CLIENT_KEY_ANDA`), used by `window.snap.pay` (`:217`); `index.html:81`: `BACKEND_URL` for the backend on Vercel. These are a payment widget and an API, not composed frontend units. | context |
| Technology / Configuration / Composition (search) | The entire page was read: no reference to federation, single-spa, import map, iframe, custom elements or loading another application. There are no imports (the page has no modules), so no boundaries to cross. | absent |
| Documentation | `README.md:1`: only the title; no micro-frontends mention. | absent |

## Authorship and history

Non-shallow and partial clone (`blob:none`). There are 4 commits (4 across all refs), no merges, all with author `suciandriaa <suciandriani996@gmail.com>` and committer `GitHub` (editing and upload through the web interface), on 2026-08-02:
- `b609b2f` (“Initial commit”) creates the README;
- `f619421` (“Add files via upload”) adds `index.html`;
- `d52b533` and SHA `798d8c8` replace the backend URL.

`git rev-list --objects $SHA --missing=print` lists 2 missing objects, none in the SHA tree (earlier versions of `index.html`). No historical blob was read.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | A single HTML page (`index.html`), without another unit or composition configuration (inventory). |
| Q2 | No | There are not two units to assess. |
| Q3 | No | There is no host, shell or root config. |
| Q4 | No | No composition mechanism; external scripts are Tailwind, Font Awesome and the Midtrans payment widget (`index.html:7–9`). |
| Q5 | No | Q1–Q4 converge. |

## Rationale

- `Non-MFE` under the rule “at least one question is No”. It matches “conventional frontend monoliths”: a static single-page frontend consuming a backend.
- The search term is not in the repository: the hit comes from `microstock-frontend` through search processing. This is not even a textual mention of micro-frontends.
- `frontend_units: 1`, `single-unit`, as in static pages 141 (draft) and 250 (draft). `ui_technologies: []` and `build_tools: []`: inline HTML/JS with Tailwind through CDN, without a UI framework or bundler.
- `repo_type: example`: prototype with placeholder sandbox payment key (`index.html:9`) and fictitious user (`index.html:82`, `user_demo_123`), although published on Vercel. The class does not depend on this field.
- There is no open decision.

## Analysis notes

- **RQ1 (misleading signals) / Protocol (search):** purely lexical false positive. “microstock-frontend” matched `"micro frontend"` without a corresponding spelling in name, description or README. Suggests checking whether GitHub search treats prefixes (“micro” in “microstock”) as terms; other compounds with “micro” may generate the same noise.
- **Protocol:** eligibility changes from `unknown` (001) to `pass` (002).
