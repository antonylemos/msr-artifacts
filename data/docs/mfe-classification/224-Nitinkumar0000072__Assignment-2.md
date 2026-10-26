---
schema: 1
id: 1186686612
full_name: Nitinkumar0000072/Assignment-2
url: https://github.com/Nitinkumar0000072/Assignment-2
commit: 577efe1edf0423ed6c75c82939115147c9e7c2c3
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: example
approaches: []
ui_technologies: [wordpress]
build_tools: []
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 224 — Nitinkumar0000072/Assignment-2

## Context

Coursework WordPress site (Playground + SQLite), versioned in `wp-content/` and exported as static site to GitHub Pages through CLI `wp-pwa`. Infrastructure comes from template `cd-wordpress` of organization `diy-pwa` (`README.md:1–15`; `package.json:2–10`; `.github/workflows/main.yml:28–32`; `LICENSE.txt:3`). Template-inherited README declares intent to be “a consumer of microfrontends” and points to external PayPal example (`README.md:13–15`). Site loads no microfrontend. Repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:225` records rank 224, ID 1186686612, status `cloned`, branch `main` and front-matter commit, which is clone HEAD and `origin/main`. Every clone Git command used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. For database inspection, blob `wp-content/database/.ht.sqlite` was copied to temporary directory outside `data/`, queried with `sqlite3 -readonly` and deleted. No installation, build, execution or network access occurred.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:225` records strategy `terminology` and eligibility `unknown`. Sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). ID appears in `data/discovery/mfe-round-001/candidates.csv:26801` and `data/discovery/mfe-round-002/candidates.csv:26808`, both with `unknown`.

`sqlite3 -readonly` query of tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns same two hits in each round, at endpoint `repositories`, with subquery `…#created:2026-03` and empty `path`:

| Query (`q`) | Collection 001 / 002 (UTC) |
|---|---|
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | 2026-10-07T20:15:07.163Z / 2026-10-08T15:41:30.708Z |
| `terminology-microfrontends-repositories`: `microfrontends in:name,description,readme` | 2026-10-07T22:11:29.411Z / 2026-10-08T15:49:16.695Z |

Effective queries append `pushed:>=2025-04-01 created:2026-03-01..2026-03-31`.

Hit metadata:
- null description, no topics, PHP language, `fork: false`, size 24.875;
- creation at 2026-03-19T22:16:06Z, push at 2026-03-24T00:43:24Z.

Without description, retrieval comes from `README.md:13`, with both spellings: “The idea of this is as a consumer of microfrontends. There is an example microfrontend for [paypal standard](…)”.

Last README change is SHA itself, `577efe1` (2026-03-19), adding only `# Assignment-2` (`README.md:16`). This predates October 2026 collections, and README at the SHA is not later than searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 1.175 entries, all regular files `100644`; zero symlinks and zero gitlinks. Root has 6 template files (`README.md`, `package.json`, `LICENSE.txt`, `.gitignore`, `.github/workflows/main.yml`, `.devcontainer/devcontainer.json`). Other 1.169 are in `wp-content/`: themes `twentytwentyfive`, `twentytwentyfour`, `twentytwentythree` and `wpico`; plugins `akismet`, `ecommerce-product-catalog` and `tiny-gtag-js-analytics`; Playground mu-plugins; uploads; database `wp-content/database/.ht.sqlite`. | context |
| Configuration / Build/deploy | `package.json:2–10`: only `wp-pwa: latest` and scripts `wp-pwa dev/build/preview`. `.github/workflows/main.yml:28–32`: `diy-pwa/npm-build-2-gh-pages@v1.11`. No host, remote, import-map or other-unit loading configuration exists. | contrary |
| Content (database) | In temporary database copy, `wp_options` has `template`/`stylesheet` = `twentytwentyfour`, `active_plugins` = `a:0:{}`, `blogname` “assignment 3” and `siteurl` `http://localhost:8000`. Published: pages “Sample Page”, “About / Experience” and “Why Drivers Choose Velaré”, post “Hello world!”, navigation and “Blog Home” template. Database byte search for `microfrontend`, `paypal`, `<script`, `customElements`, `type="module"`, `github.io`, `wp:html` and `<x-` returns nothing. `<iframe` appears 2 times, in “Why Drivers Choose Velaré” page (ID 19) and revision: YouTube video embed. | contrary |
| Documentation | `README.md:13–15`: intent to consume microfrontends and external-example link, template text (`LICENSE.txt:3`, “Copyright (c) 2024 diy-pwa”). Nothing in repository configures this consumption. | weak |
| Search | `git grep -i` at the SHA (except database) for `micro.?front`: only `README.md:13`. | absent |

## Authorship and history

Non-shallow clone; 3 commits across all refs, no merge.
- **Root:** `9c37724` (2026-03-19, “Initial commit”, Arsh Khandpur `<arshkhandpur@gmail.com>`) already adds 1.175 files (template and `wp-content/`).
- **SHA:** `577efe1` (2026-03-19, “first commit”, same author) changes only README.
- **gh-pages:** `3256488` (“deploy: 577efe1…”, by owner `Nitinkumar0000072`, noreply) is published static output and was not considered.

Content-commit author differs from account owner. No historical blob was read and no object was missing.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | One WordPress site; no configuration or content references external frontend unit (recorded database search). PayPal example appears only as README link. |
| Q2 | No | No second unit exists whose independence could be evaluated. |
| Q3 | No | Site does not load, mount or route another unit. Sole iframe is YouTube video embedded in page content. |
| Q4 | No | No composition mechanism configured or used (`package.json:2–10`; database without external scripts or elements). |
| Q5 | No | Q1–Q4 are No: exercise WordPress site whose template README only declares intent. |

## Rationale

- `Non-MFE` under rule “at least one question is No”. Matches “repositories mentioning micro-frontends without implementing them”.
- Same profile as drafts 160 and 206 and 119/125 (`cd-wordpress`/`wp-pwa`, Non-MFE). Differs from 049 (`MFE-implemented`/review), whose database contained `<script type="module">` and a custom element served from another origin.
- YouTube embed is third-party content, not study frontend unit, so case does not depend on open iframe-composition decision. README text comes from template, a generator case as 075/081/094/105.
- `repo_type: example`, `ui_technologies: [wordpress]`, `build_tools: []` (CLI `wp-pwa` encapsulates build), `frontend_units: 1`, `unit_organization: single-unit`.
- No decision remains open.

## Analysis notes

- **RQ1 (misleading signals):** another template `cd-wordpress` README with “consumer of microfrontends” in student repository.
- **Protocol (search):** both searched spellings are literally in `README.md:13`. Eligibility `unknown` in both rounds; repository entered sample with `unknown`.
