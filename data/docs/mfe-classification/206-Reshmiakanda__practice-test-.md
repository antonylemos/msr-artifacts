---
schema: 1
id: 1153999055
full_name: Reshmiakanda/practice-test-
url: https://github.com/Reshmiakanda/practice-test-
commit: fdfbe602fb6f8f9be30b348e463040653ac9c4c3
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

# 206 — Reshmiakanda/practice-test-

## Context

Practice WordPress site (Playground + SQLite), “practice test” (`blogname` in database), with pages “My Birthday”, “ways people celebrate” and “contact”. Versioned in `wp-content/` and exported as static site to GitHub Pages through CLI `wp-pwa`. Infrastructure comes from template `cd-wordpress` of organization `diy-pwa` (`README.md:1–11`; `package.json:2–10`; `.github/workflows/main.yml:28–32`; `LICENSE.txt:3`). Template-inherited README declares intent to be “a consumer of microfrontends” and points to external PayPal example (`README.md:13–15`). Site loads no microfrontend. Repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:207` records rank 206, ID 1153999055, status `cloned`, branch `main` and front-matter commit, which is clone HEAD and `origin/main`. Every clone Git command used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. For database inspection, blob `wp-content/database/.ht.sqlite` was copied to a temporary directory outside `data/`, queried with `sqlite3 -readonly` and deleted. No installation, build, execution or network access occurred.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:207` records strategy `terminology` and eligibility `pass`. Sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). ID appears in `data/discovery/mfe-round-001/candidates.csv:24669` (`unknown`) and `data/discovery/mfe-round-002/candidates.csv:24675` (`pass`).

`sqlite3 -readonly` query of tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns same two hits in each round, at endpoint `repositories`, with subquery `…#created:2026-02` and empty `path`:

| Query (`q`) | Collection 001 / 002 (UTC) |
|---|---|
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | 2026-10-07T19:47:08.329Z / 2026-10-08T15:41:04.057Z |
| `terminology-microfrontends-repositories`: `microfrontends in:name,description,readme` | 2026-10-07T22:10:51.084Z / 2026-10-08T15:49:02.020Z |

Effective queries append `pushed:>=2025-04-01 created:2026-02-01..2026-02-28`.

Hit metadata:
- description “reshmi101”, no topics, PHP language, `fork: false`, size 22.981;
- creation at 2026-02-09T22:50:20Z, push at 2026-02-09T23:02:45Z.

Description lacks terms. Retrieval comes from `README.md:13`, with both spellings: “The idea of this is as a consumer of microfrontends. There is an example microfrontend for [paypal standard](…)”.

README comes from root commit `80c01fc` (2026-02-09) and was unchanged afterward. It predates October 2026 collections, and README at the SHA is not later than searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 575 entries, all regular files `100644`; zero symlinks and zero gitlinks. Root has 6 files (`README.md`, `package.json`, `LICENSE.txt`, `.gitignore`, `.github/workflows/main.yml`, `.devcontainer/devcontainer.json`). Other 569 are in `wp-content/`: themes `twentytwentyfive`, `twentytwentyfour`, `twentytwentythree` and `wpico`, `akismet`, Playground mu-plugins (`sqlite-database-integration`, `one-click-child-theme`), translations `en_CA`, uploads, `debug.log` and database `wp-content/database/.ht.sqlite`. | context |
| Configuration / Build/deploy | `package.json:2–10`: only `wp-pwa: latest` and scripts `wp-pwa dev/build/preview`. `.github/workflows/main.yml:28–32`: `diy-pwa/npm-build-2-gh-pages@v1.11`. No host, remote, import-map or other-unit loading configuration exists. | contrary |
| Content (database) | In temporary database copy, `wp_options` has `template`/`stylesheet` = `twentytwentyfive`, `active_plugins` = `a:0:{}` and `siteurl` `http://localhost:8000`. Published: pages “My Birthday” (ID 6), “ways people celebrate” (10) and “contact” (12), post “ways people celebrate” (14) and navigation. Database byte search for `microfrontend`, `paypal`, `<script`, `customElements`, `type="module"`, `github.io`, `wp:html` and `<x-` returns nothing. `<iframe` appears 2 times, in “contact” page and revision: Google Maps embed (`https://www.google.com/maps/embed?…`). | contrary |
| Documentation | `README.md:13–15`: intent to consume microfrontends and external-example link, template text (`LICENSE.txt:3`, “Copyright (c) 2024 diy-pwa”). Nothing in repository configures this consumption. | weak |
| Search | `git grep -i` at the SHA (except database) for `micro.?front`: only `README.md:13`. `customElements` appears only in third-party mu-plugin `one-click-child-theme` templates, unused by active theme (database lacks `<x-`). | absent |

## Authorship and history

Non-shallow clone; 3 commits across all refs, no merge, all by Reshmiakanda.
- **Root:** `80c01fc` (2026-02-09T17:50:22-05:00, “Initial commit”, author `akandareshmi@gmail.com`, committer GitHub) adds 6 template files, compatible with generation from `cd-wordpress`.
- **SHA:** `fdfbe60` (2026-02-09T23:02:04Z, “save everything”) adds all `wp-content/`, exported from WordPress Playground; `wp-content/debug.log:1` records path `/workspaces/practice-test-/.wordpress/`, from Codespace.
- **gh-pages:** `c3e8a2e` (“deploy: fdfbe60…”, noreply) is published static output and was not considered.

No historical blob was read and no object was missing.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | One WordPress site; no configuration or content references external frontend unit (recorded database search). PayPal example appears only as README link. |
| Q2 | No | No second unit exists whose independence could be evaluated. |
| Q3 | No | Site does not load, mount or route another unit. Sole iframe is Google map embedded in page content. |
| Q4 | No | No composition mechanism configured or used (`package.json:2–10`; database without external scripts or elements). |
| Q5 | No | Q1–Q4 are No: practice WordPress site whose template README only declares intent. |

## Rationale

- `Non-MFE` under rule “at least one question is No”. Matches “repositories mentioning micro-frontends without implementing them”.
- Same profile as draft 160 and 119/125 (`cd-wordpress`/`wp-pwa`, Non-MFE), where template-inherited intent does not become composition. Differs from 049 (`MFE-implemented`/review), whose database contained `<script type="module">` and a custom element served from another origin.
- Google Maps embed is not a frontend unit in study, only embedded content from third-party service. Thus case does not depend on open iframe-composition decision.
- Text comes from template, a generator case as in 075/081/094/105.
- `repo_type: example`, `ui_technologies: [wordpress]`, `build_tools: []` (CLI `wp-pwa` encapsulates build), `frontend_units: 1`, `unit_organization: single-unit`, as in 160/119/125.
- No decision remains open.

## Analysis notes

- **RQ1 (misleading signals):** another template `cd-wordpress` README with “consumer of microfrontends” in student repository.
- **Protocol (search):** both searched spellings are literally in `README.md:13`. Eligibility changes from `unknown` (001) to `pass` (002).
