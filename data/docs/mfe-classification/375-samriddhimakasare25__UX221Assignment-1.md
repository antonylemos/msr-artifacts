---
schema: 1
id: 1151891106
full_name: samriddhimakasare25/UX221Assignment-1
url: https://github.com/samriddhimakasare25/UX221Assignment-1
commit: 0b03b8e0947f98f15c92f2886582105595dabe14
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

# 375 — samriddhimakasare25/UX221Assignment-1

## Context

Course assignment based on template `cd-wordpress` (`README.md:1–2`; `LICENSE.txt:3`, “Copyright (c) 2024 diy-pwa”): a WordPress Playground WordPress site (SQLite database, themes and plugins in `wp-content/`) published through `wp-pwa`. Text “consumer of microfrontends” comes from the template README (`README.md:13`); the site loads no external unit. The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:376` records rank 375, ID 1151891106, status `cloned`, branch `main` and the front matter commit, which is the HEAD of the clone and of `origin/main`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. The database was read in a temporary copy outside the clone (`git show` to a temporary file, opened with `sqlite3 -readonly` and then deleted). There was no installation, execution or network access.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:376` records strategy `terminology` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID appears in `data/discovery/mfe-round-001/candidates.csv:24541` (`terminology`, `unknown`, rule `recent-human-commit` with `activity_incomplete`) and `data/discovery/mfe-round-002/candidates.csv:24547` (`terminology`, `pass`).

A `sqlite3 -readonly` query against tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns the same two hits in each round, from endpoint `repositories`, with an empty `path`:

| Query (`q`) | Subquery | Effective query | Collection 001 / 002 (UTC) |
|---|---|---|---|
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | `terminology-microfrontend-repositories#created:2026-02` | `microfrontend in:name,description,readme pushed:>=2025-04-01 created:2026-02-01..2026-02-28` | 2026-10-07T19:59:46.702Z / 2026-10-08T15:41:09.211Z |
| `terminology-microfrontends-repositories`: `microfrontends in:name,description,readme` | `terminology-microfrontends-repositories#created:2026-02` | `microfrontends in:name,description,readme pushed:>=2025-04-01 created:2026-02-01..2026-02-28` | 2026-10-07T22:11:00.482Z / 2026-10-08T15:49:05.274Z |

Hit metadata: null description, no topics, language PHP, MIT license, `fork: false`, size 25932, created at 2026-02-07T03:25:21Z, pushed at 2026-02-07T04:04:31Z.

Both spellings appear literally in `README.md:13`: “The idea of this is as a consumer of microfrontends. There is an example microfrontend for [paypal standard](https://github.com/diy-pwa/paypal-microfrontend) here.” The README comes from root commit `68b68e0` (2026-02-06, creation from the template) and was not changed later; it predates the collections on October 7 and 8, 2026 and does not postdate the searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 588 entries, all regular files `100644`; zero symlinks and zero gitlinks. At the root, the template’s 6 files (`README.md`, `package.json`, `LICENSE.txt`, `.github/`, `.devcontainer/`, `.gitignore`); the rest in `wp-content/`: themes `twentytwentyfive`, `twentytwentyfour`, `twentytwentythree` and `wpico`, plugins `akismet`, `hello.php` and `list-category-posts`, Playground mu-plugins, uploads and database `wp-content/database/.ht.sqlite`. | context |
| Configuration / Build/deploy | `package.json:2–10`: only `wp-pwa: latest` and scripts `wp-pwa dev/build/preview`; `.github/workflows/main.yml:28–32`: publication through `diy-pwa/npm-build-2-gh-pages@v1.11`. No host, remote, import map or other unit loading configuration; search for `wp_enqueue_script` in unofficial themes finds nothing. | contrary |
| Content (database) | In the temporary copy, `wp_options` has `template`/`stylesheet` = `twentytwentyfive`, `active_plugins` = `list-category-posts` and `blogname` “Assignment 1”. Published: five pages (“HomePage”, “About Page”, “CONTACT PAGE”, “First-Time Hackers”, “Event Organizers & Clubs”), five posts about hackathons and student events, navigation and global styles. Database byte search for `microfrontend`, `paypal`, `<script`, `customElements`, `<iframe`, `type="module"`, `github.io`, `wp:html`, `<x-` and `wp:embed` returns nothing. | contrary |
| Third-party code | `wp-content/mu-plugins/one-click-child-theme/templates/customElements.js:1–7` defines `<x-year>`, a third-party plugin template for generating child themes, unused (database without `<x-`). | context |
| Documentation | `README.md:13–15`: template intent to consume microfrontends and link to external example; nothing in the repository configures this consumption. | weak |

## Authorship and history

Non-shallow, partial clone (`blob:none`). 3 commits (3 across all refs), no merge, all by “Samriddhi Makasare” (`…+samriddhimakasare25@users.noreply.github.com`): root `68b68e0` (2026-02-06, “Initial commit”, committer GitHub, the template’s 6 files), `a166a73` (2026-02-07, “changes”, 582 site files) and SHA `0b03b8e` (2026-02-07, “changes”, database only). `git rev-list --objects $SHA --missing=print` identifies 1 missing historical object; cited SHA files were read.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | A single WordPress site; no composition configuration references other units (`package.json:2–10`; database and theme search). |
| Q2 | No | There are not two units to assess. |
| Q3 | No | No host loading, mounting or routing another unit; content consists of the site’s own pages and posts. |
| Q4 | No | No composition mechanism; microfrontend consumption appears only as template text (`README.md:13`). |
| Q5 | No | Q1–Q4 converge. |

## Rationale

- `Non-MFE` under the rule “at least one question is No”. It matches “repositories mentioning micro-frontends without implementing them”.
- Same profile as drafts 119/125/160/206/224 (`cd-wordpress`/`wp-pwa` with own site, Non-MFE), where intent inherited from the template does not become composition. It differs from 049 (`MFE-implemented`/review) and 260 (`Uncertain`/review), which load modules from another origin; here there is no `<script type="module">`, external enqueue or custom element in content. It differs from 079/117/326 (template without a site, `frontend_units: 0`).
- Text comes from the template, a generator case as in 075/081/094/105, and the repository is a course assignment (“Assignment 1”), like 023.
- `repo_type: example`, `ui_technologies: [wordpress]`, `build_tools: []` (CLI `wp-pwa` encapsulates the build), `frontend_units: 1`, `unit_organization: single-unit`, as in 160/119/125.
- There is no open decision.

## Analysis notes

- **RQ1 (misleading signals):** template `cd-wordpress` README generates terminology hits in all course sites created from it.
