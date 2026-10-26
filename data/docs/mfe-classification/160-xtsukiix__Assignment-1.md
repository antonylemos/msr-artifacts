---
schema: 1
id: 1167202255
full_name: xtsukiix/Assignment-1
url: https://github.com/xtsukiix/Assignment-1
commit: 2fd7fd33005534dbb6eec01eed00a624b900a516
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

# 160 — xtsukiix/Assignment-1

## Context

WordPress site (Playground + SQLite) about a Pokémon card collection, versioned in `wp-content/` and exported as a static site to GitHub Pages through the `wp-pwa` CLI. Infrastructure comes from organization `diy-pwa`'s `cd-wordpress` template (`README.md:1–11`; `package.json:2–10`; `.github/workflows/main.yml:28–32`; `LICENSE.txt:3`). The inherited template README states the intention to be “a consumer of microfrontends” and points to an external PayPal example (`README.md:13–15`). The site, however, loads no microfrontend. The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:161` records rank 160, ID 1167202255, status `cloned`, branch `main` and the front matter commit, which is HEAD of the clone and `origin/main`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, with reading through `${SHA}:caminho` (the original placeholder means SHA:path). To inspect the database, blob `wp-content/database/.ht.sqlite` was copied to a temporary directory outside `data/`, queried with `sqlite3 -readonly` and deleted. No installation, build, execution or network access occurred.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:161` records strategy `terminology` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID is in `data/discovery/mfe-round-001/candidates.csv:25479` (`unknown`) and `data/discovery/mfe-round-002/candidates.csv:25486` (`pass`).

A `sqlite3 -readonly` query of the `hits`, `queries` and `subqueries` tables from both rounds, filtered by ID, returns the same two hits in each round, from endpoint `repositories`, with subquery `…#created:2026-02` and empty `path`:

| Query (`q`) | Collection 001 / 002 (UTC) |
|---|---|
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | 2026-10-07T19:59:46.702Z / 2026-10-08T15:41:09.211Z |
| `terminology-microfrontends-repositories`: `microfrontends in:name,description,readme` | 2026-10-07T22:11:00.482Z / 2026-10-08T15:49:05.274Z |

Effective queries append `pushed:>=2025-04-01 created:2026-02-01..2026-02-28`.

Hit metadata:
- null description, no topics, language PHP, `fork: false`, size 27,482;
- created at 2026-02-26T03:31:16Z, pushed at 2026-02-27T09:03:52Z.

Without a description, the hit comes from `README.md:13`, which has both spellings: “The idea of this is as a consumer of microfrontends. There is an example microfrontend for [paypal standard](…)”.

The README comes from root commit `8344199` (2026-02-25T22:31:18-05:00) and was not changed afterward. It precedes October 2026 collection, and the SHA's README does not postdate searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 765 entries, all regular `100644` files; zero symlinks and zero gitlinks. The root contains `README.md`, `package.json`, `LICENSE.txt`, `.github/`, `.devcontainer/`. The rest is in `wp-content/`: official themes (`twentytwentyfive`, `twentytwentyfour`, `twentytwentythree`, `twentytwentyone`), theme `wpico`, `akismet`, Playground mu-plugins (`0-playground.php`, `sqlite-database-integration`, `one-click-child-theme`), translations, uploads and database `wp-content/database/.ht.sqlite`. | context |
| Configuration / Build/deploy | `package.json:2–10`: only `wp-pwa: latest` and scripts `wp-pwa dev/build/preview`. `.github/workflows/main.yml:28–32`: `diy-pwa/npm-build-2-gh-pages@v1.11`. No host, remote, import map or other-unit loading configuration. | contrary |
| Content (database) | In the temporary database copy, `wp_options` has `template`/`stylesheet` = `twentytwentyone` and empty `active_plugins`. Published pages and posts are “Home”, “About the Popup Kit” and five Pokémon card posts, with only paragraph and heading blocks in the passages read. Byte search in the database for `microfrontend`, `paypal`, `<script`, `customElements`, `<iframe`, `type="module"`, `github.io`, `wp:html` and `<x-` returns nothing. | contrary |
| Documentation | `README.md:13–15`: intention to consume microfrontends and link to an external example, template text (`LICENSE.txt:3`, “Copyright (c) 2024 diy-pwa”). Nothing in the repository configures this consumption. | weak |
| Third-party code | `wp-content/mu-plugins/one-click-child-theme/templates/customElements.js:1–7` defines `<x-year>`, but is a third-party plugin template for generating child themes, unused by the active theme (database without `<x-`). Other `micro.?front` occurrences are only in the README. | context |

## Authorship and history

Non-shallow clone; 3 commits across all refs, no merges, all by `xtsukiix`.
- **Root:** `8344199` (2026-02-25, “Initial commit”, GitHub committer) adds the 6 template files (`.devcontainer`, workflow, `.gitignore`, `LICENSE.txt`, `README.md`, `package.json`), consistent with generation from template `cd-wordpress`.
- **SHA:** `2fd7fd3` (2026-02-27, “pokemon”) adds all `wp-content/`, exported from WordPress Playground.
- **gh-pages:** `16ab0d7` (“deploy: 2fd7fd3…”) is the published static output and was not considered.

No historical blob was read and no object was missing.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | A single WordPress site; no configuration or content references an external unit (recorded database search). The PayPal example appears only as a README link. |
| Q2 | No | There is no second unit whose independence could be assessed. |
| Q3 | No | The site does not load, mount or route another unit. |
| Q4 | No | No composition mechanism configured or used (`package.json:2–10`; database without external scripts or elements). |
| Q5 | No | Q1–Q4 are No: exercise WordPress site whose template README only states the intention. |

## Rationale

- `Non-MFE` under the rule “at least one question is No”. Matches “repositories mentioning micro-frontends without implementing them”.
- Same profile as drafts 119 and 125 (`cd-wordpress`/`wp-pwa`, Non-MFE), where inherited template intention does not become composition. Differs from 049 (`MFE-implemented`/review), whose database contained `<script type="module">` and a custom element served from another origin. Here the database has none of these elements.
- Text comes from the template, a generator case as in 075/081/094/105, and the repository is coursework (“Assignment”), as in 023.
- `repo_type: example`, `ui_technologies: [wordpress]`, `build_tools: []` (CLI `wp-pwa` encapsulates the build), `frontend_units: 1`, `unit_organization: single-unit`, as in 119/125.
- No decision remains open.

## Analysis notes

- **RQ1 (misleading signals):** template README stating “consumer of microfrontends”, replicated across several student repositories. Only database content distinguishes those actually embedding a microfrontend (049) from those that do not.
- **Protocol (search):** both searched spellings are literally in `README.md:13`. Eligibility changes from `unknown` (001) to `pass` (002).
- **Independent review contribution (Lupa):** full agreement with Non-MFE and Q1–Q5 No; no open decision; `rev-list --objects --missing=print` at the SHA reports no missing objects. SQLite database data (binary, without text lines) should be cited by logical location, for example `wp-content/database/.ht.sqlite::wp_options[option_name=stylesheet].option_value` (`twentytwentyone`) and `...::wp_posts[ID=...].post_content`, without inventing physical lines; negative database byte search (`microfrontend`, `paypal`, `<script`, `customElements`, `<iframe`, `type="module"`, `github.io`, `wp:html`, `<x-`) returns nothing. Installed PHP/JS (WordPress, third-party themes and plugins, `package.json` and workflow) is CMS infrastructure: what is absent is custom MFE code or configuration and an additional frontend unit, rather than code in general. Published content consists of two pages (“Home”, “About the Popup Kit”) and five posts. Branch `origin/gh-pages` (`16ab0d7`) is a publication reference and was not used. The reviewer cited range `.gitignore:1–6` and sentence “Não há código, manifesto ou configuração” (English translation: “There is no code, manifest or configuration”), which are not in this annotation (the `.gitignore` has five lines); no change was made for this reason.
