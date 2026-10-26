---
schema: 1
id: 960060577
full_name: Olga-steblyk/UX308-Assignment2-take2
url: https://github.com/Olga-steblyk/UX308-Assignment2-take2
commit: 9c0ac6ca84d0dff34bdd55ded8fae4e5ff2248ca
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: example
approaches: []
ui_technologies: [wordpress]
build_tools: []
frontend_units: 2
unit_organization: multi-repo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 260 — Olga-steblyk/UX308-Assignment2-take2

## Context

Course assignment WordPress site (Playground + SQLite) (“Assignment 2 Take 2”, repository description), versioned in `wp-content/` and exported as a static site to GitHub Pages through CLI `wp-pwa`. Infrastructure comes from template `cd-wordpress` (`README.md:1–15`; `package.json:2–10`; `.github/workflows/main.yml:28–32`), whose README declares the intent to be “a consumer of microfrontends”.

Unlike drafts 160/206/224, the active child theme (`every-byte-child-theme`) loads two ES modules from another origin, by the same author, on every page (`functions.php:14–15`):
- `https://olga-steblyk.github.io/Assignment1_UX308/order.js`;
- `https://olga-steblyk.github.io/Assignment1_UX308/fab.js`.

Page content, however, uses no element from these modules. The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:261` records rank 260, ID 960060577, status `cloned`, branch `main` and the front matter commit, which is the HEAD of the clone and of `origin/main`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. To inspect the database, blob `wp-content/database/.ht.sqlite` was copied to a temporary directory outside `data/`, queried with `sqlite3 -readonly` and deleted. There was no installation, build, execution or network access.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:261` records strategy `terminology` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID appears in `data/discovery/mfe-round-001/candidates.csv:12592` (`unknown`) and `data/discovery/mfe-round-002/candidates.csv:12597` (`pass`).

A `sqlite3 -readonly` query against tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns the same two hits in each round, from endpoint `repositories`, with subquery `…#created:2025-04` and an empty `path`:

| Query (`q`) | Collection 001 / 002 (UTC) |
|---|---|
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | 2026-10-07T18:28:59.843Z / 2026-10-08T15:37:41.421Z |
| `terminology-microfrontends-repositories`: `microfrontends in:name,description,readme` | 2026-10-07T22:07:24.011Z / 2026-10-08T15:47:06.493Z |

The effective queries append `pushed:>=2025-04-01 created:2025-04-01..2025-04-30`.

Hit metadata:
- description “Assignment 2 Take 2”, no topics, language PHP, `fork: false`, size 26.142;
- created at 2025-04-03T19:48:02Z, pushed at 2025-04-04T00:31:52Z.

Both searched spellings are in `README.md:13`: “The idea of this is as a consumer of microfrontends. There is an example microfrontend for [paypal standard](…)”. The README comes from root commit `beb7a90` (2025-04-03) and was not changed afterward, predating the October 2026 collections. The README at the SHA does not postdate the searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 910 entries, all regular files `100644`; zero symlinks and zero gitlinks. At the root are 6 template files; the other 904 are in `wp-content/`: themes `every-byte-child-theme`, `twentytwentyfour` and `twentytwentythree`; plugins `akismet` and `ecommerce-product-catalog`; Playground mu-plugins; database `wp-content/database/.ht.sqlite`. | context |
| Configuration (external unit loading) | `wp-content/themes/every-byte-child-theme/functions.php:6–16`: `wp_enqueue_script_module` of `order.js` and `fab.js` at `olga-steblyk.github.io/Assignment1_UX308/` (`:14–15`), plus local script `customElements.js` (`:13`). These modules are served from another origin and another author repository; their content is not in the snapshot. | moderate |
| Content (database) | In the temporary database copy, `wp_options` has `stylesheet` = `every-byte-child-theme`, `template` = `twentytwentyfive`, `active_plugins` = `ecommerce-product-catalog` and `blogname` “Evry-byte”. Published: “Sample Page”, “Products” (`[show_product_catalog]`), post “Hello world!” and a navigation. Byte search for `<x-`, `olga-steblyk.github.io`, `order.js`, `fab.js`, `<script`, `type="module"`, `<iframe`, `wp:html` and `microfrontend` returns nothing. No remote module element or mounting point appears in the content. | ambiguous |
| Local code | `wp-content/themes/every-byte-child-theme/customElements.js:1–7`: custom element `x-year`, local and trivial, unused in the content. | context |
| Parent theme | The child theme declares `Template: twentytwentyfive` (`style.css:5`), but `wp-content/themes/twentytwentyfive/` was removed in `6bf78ea`; WordPress Playground may supply it outside the repository. | context |
| Search | Outside the database, `micro.?front` appears only in the template README. | context |

## Authorship and history

Non-shallow clone; 20 commits across all refs, no merges, all by Olga-Stebko (noreply), on 2025-04-03 and 2025-04-04. In `main`, after root commit `beb7a90` (template), come:
- `1329d94` (“included important aspects”), creating the child theme;
- `df7d38c` (“attempt to include chat feature”), changing `functions.php`;
- SHA `9c0ac6c` (“fixed order.js”), changing `functions.php` and the database.

Branch `origin/codespace-opulent-guide-x4pxr5vpxq5hvprx` has later commits (through 2025-04-04, “added index.html”, “chnged the php functions to be index.js”). `gh-pages` is deployment output. Neither branch was considered. No historical blob was read and there was no missing object.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | The snapshot demonstrates only the WordPress site; external scripts without an observable mounting point do not demonstrate a second integrated frontend unit. |
| Q2 | No | No independent frontend unit observable in composition; there are only external module URLs. |
| Q3 | No | Content contains no element, container or other use of the enqueued modules. |
| Q4 | No | Enqueuing external scripts without observable use does not demonstrate a frontend composition mechanism. |
| Q5 | No | Q1–Q4 do not demonstrate composition between frontend units. |

## Rationale

- Classified as `Non-MFE`: the snapshot proves only external script loading, not their mounting or integration as frontend units.
- **Comparison:** unlike 049, there is no remote element in content; isolated loading resembles cases without observable composition.
- **Fields:** `approaches: []`, `ui_technologies: [wordpress]`, `build_tools: []` (CLI `wp-pwa`), `frontend_units: 1`, `unit_organization: multi-repo`, `repo_type: example`.

## Analysis notes

- **RQ2:** composition through remote ES module enqueuing in the WordPress theme (`wp_enqueue_script_module`), instead of content insertion as in 049.
- **Protocol (snapshot):** the codespace branch has later changes to `functions.php`, outside the snapshot.
- **Protocol (search):** both searched spellings appear literally in `README.md:13`. Eligibility changes from `unknown` (001) to `pass` (002).

## Recorded decision

Classified as `Non-MFE`. External modules are enqueued by the theme, but the snapshot contains no element, container or other mounting point demonstrating use. Simply loading external scripts does not prove composition of frontend units.
