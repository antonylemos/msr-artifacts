---
schema: 1
id: 1154061735
full_name: Mixtry14/UX221-Midterm
url: https://github.com/Mixtry14/UX221-Midterm
commit: a9fc22627e945f4b68ca0c390ef505ae9e28aff0
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

# 119 — Mixtry14/UX221-Midterm

## Context

Customized WordPress site about a commemorative day, with versioned pages, posts and images, built from `cd-wordpress`/`wp-pwa` (`README.md:1–11`; `package.json:2–9`). Database contains actual site content; iframe found on Contact page embeds Google Maps, without an integration contract between own frontend units. Repository name was not used as architectural evidence.

Identity and commit checked in `data/samples/mfe-sample-001/clones.csv:120`, status `cloned`; HEAD matches front-matter SHA. All clone Git inspection used `GIT_NO_LAZY_FETCH=1`, read-only at snapshot. Dependencies were not installed, builds not run and external sites not queried.

**Database evidence locations:** blob `wp-content/database/.ht.sqlite` was obtained with `git show` at the SHA and deserialized into in-memory SQLite, with `PRAGMA query_only=ON`, without creating database or journal files. Since binary SQLite has no text lines, notation `arquivo::tabela[chave=valor].campo:linha` below identifies the logical line of the textual field, numbered from 1 by splitting on `\n`. For example, `SELECT post_content FROM wp_posts WHERE ID=12` reproduces Contact-page citation. These positions are not presented as physical lines of the binary file.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:120` records rank 119, strategy `terminology` and eligibility `pass`. Sample derives from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). Candidate appears in `data/discovery/mfe-round-001/candidates.csv:24701` (eligibility `unknown`) and `data/discovery/mfe-round-002/candidates.csv:24707` (`pass`). Metadata record description “Special Day Midterm”, empty topics, PHP language, `fork: false`, creation at 2026-02-10T01:08:52Z and push at 2026-02-10T01:49:15Z. Description contextualizes type `example`; it does not confirm MFE.

Queries with `sqlite3 -readonly` of tables `hits`, `queries` and `subqueries` in `data/discovery/mfe-round-001/discovery.sqlite` and `data/discovery/mfe-round-002/discovery.sqlite`, filtered by ID 1154061735, record:

| Query | Subquery | Effective query | Collection 001 / 002 (UTC) |
|---|---|---|---|
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | `terminology-microfrontend-repositories#created:2026-02` | `microfrontend in:name,description,readme pushed:>=2025-04-01 created:2026-02-01..2026-02-28` | 2026-10-07T19:47:08.329Z / 2026-10-08T15:41:04.057Z |
| `terminology-microfrontends-repositories`: `microfrontends in:name,description,readme` | `terminology-microfrontends-repositories#created:2026-02` | `microfrontends in:name,description,readme pushed:>=2025-04-01 created:2026-02-01..2026-02-28` | 2026-10-07T22:10:51.084Z / 2026-10-08T15:49:02.020Z |

Hits have empty `path`, without matched line. By elimination, name and description lack searched spellings and no topics exist; `README.md:13` contains both `microfrontends` and `microfrontend`, plus link `paypal-microfrontend`, explaining observable thematic signal. This attributes no unreported location to API. README was added in root commit at 2026-02-10T01:08:54Z and unchanged in next commit, according to historical metadata: SHA text predates searches, rather than following them.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | Complete inventory through `git ls-tree -r` at the SHA: 575 regular files `100644`, zero symlinks and zero gitlinks. Six template files exist at root/environment/CI, and `wp-content` contains database, uploads, themes, plugins and translations. No versioned `node_modules`, lockfile or explicit own bundler configuration. Alternative themes and third-party plugins are not counted as own units. | context |
| Source code / Composition (site) | `wp-content/database/.ht.sqlite::wp_posts[ID=6].post_content:1–7` contains customized homepage; `wp-content/database/.ht.sqlite::wp_posts[ID=10].post_content:1–35` contains text and images of another page of the same site. Option `wp-content/database/.ht.sqlite::wp_options[option_name=page_on_front].option_value:1` is `6`; `show_on_front` is `page`. These are not distinct frontend applications with their own entries/builds. | contrary |
| Configuration / Technology | `wp-content/database/.ht.sqlite::wp_options[option_name=template].option_value:1` and `wp-content/database/.ht.sqlite::wp_options[option_name=stylesheet].option_value:1` are `twentytwentyfive`. `wp-content/themes/twentytwentyfive/templates/page.html:1–15` assembles theme header, post content and footer. This is conventional WordPress site rendering. | contrary |
| Composition (iframe) | `wp-content/database/.ht.sqlite::wp_posts[ID=12].post_content:2` contains an iframe with origin `https://www.google.com/maps/embed`; revision ID 13 repeats this iframe on line 2. Attributes concern presentation, loading and referrer policy. No message bridge, API between own units, mounting of the owner’s application or integration contract beyond map inclusion exists. Google Maps service is not counted as own unit. | context |
| Source code (third parties) | `wp-content/mu-plugins/one-click-child-theme/templates/customElements.js:1–7` defines `x-year`, which only shows current year. It is a plugin template, without own application or consumption in database content. `wp-content/themes/wpico/style.css:2–5` attributes alternative theme to Mike Wassmer; `wp-content/themes/twentytwentyfive/style.css:2–5` attributes active theme to WordPress team. These components are neither attributed to owner nor counted as additional units. | context |
| Configuration / Build/deploy | `package.json:2–9` declares `wp-pwa: latest` and CLI-delegated commands; `.github/workflows/main.yml:28–32` calls `diy-pwa/npm-build-2-gh-pages@v1.11`. No host/remote/exposes/consumption configuration or multiple-unit builds exist. `.gitignore:1–5` ignores dependencies, output and lockfile; without local CLI implementation or pinned version, its internals cannot be verified. | weak |
| Documentation | `README.md:13–15` describes intent to consume microfrontends and points to an external PayPal example. It does not configure site loading of that example. `LICENSE.txt:3` retains template attribution to `diy-pwa`. | weak |
| Technology / Configuration / Source code | Complete text-file search for `module.?federation`, `remoteEntry`, `registerApplication`, `single.?spa`, `qiankun`, `wujie`, `postMessage` and `import.?map`: no occurrence. Additional search for `iframe`, `customElements.define` and `micro.?frontend` in JS/PHP/JSON and README finds template text, translations, `x-year` and Akismet administrative iframes. Results belong to documentation or vendored code, without demonstrating a second own unit. | absent |
| Source code (boundaries) | Active literal search `git grep -n -F -e '../../' -e '../../../'` in all `*.js` at the SHA: no occurrence. Inventory has only four JS files, all in Akismet or child-theme template. This absence does not establish Q2: a set of composed frontend units is missing, not merely cross-imports. | context |
| Composition (database search) | Inspected all 29 values of `wp_posts.post_content`, 29 of `post_excerpt`, 31 of `wp_postmeta.meta_value` and 153 of `wp_options.option_value`, searching for `<script`, `<iframe`, `postMessage`, `remoteEntry`, `registerApplication`, `customElements`, `micro.?frontend`, `single-spa` and `<x-...>` elements. Only the two Contact iframes appear, at IDs 12/13; these fields contain no remote script, custom element or communication contract. `wp-content/database/.ht.sqlite::wp_options[option_name=active_plugins].option_value:1` is `a:0:{}`. | absent |

## Authorship and history

Metadata from `git rev-list`: **2 commits, 0 merges, 1 root commit**, root `2662e6e21558aa273e1a46626779cf3db3a6c25f`; non-shallow clone. Root, `Initial commit`, has author Nakul Mistry and committer GitHub at 2026-02-09T20:08:54-05:00 (2026-02-10T01:08:54Z); evaluated SHA, `initial commit`, has author and committer Nakul Mistry at 2026-02-10T01:48:22Z.

`git log --no-renames --name-status` for `README.md`, `package.json`, `wp-content/database`, `wp-content/themes`, `wp-content/plugins`, `wp-content/mu-plugins`, translations and uploads shows template introduced at root and database/content, themes and plugins added together in second commit. Addition history does not demonstrate original authorship of third-party material: attributions in `LICENSE.txt:3`, `wp-content/themes/wpico/style.css:2–5` and `wp-content/themes/twentytwentyfive/style.css:2–5` remain explicit. Customized database content was distinguished from that material. No historical blob needed reading; no object was missing.

Local references for record only: `main`, `origin/main` and `origin/HEAD` point to evaluated SHA; `origin/gh-pages` also exists at `fbf07091e88a417b7a663533ec4e95fdf0350144`. Its content was not inspected and does not change snapshot classification. No own ADR or architecture document exists in inventory; root README supplies only generic template intent.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | One customized WordPress site, without two own units or a composition reference to external applications. Database pages are content of the same target; map iframe (`wp-content/database/.ht.sqlite::wp_posts[ID=12].post_content:2`) does not establish another owner target. |
| Q2 | No | No set of composed units with their own entries/builds exists. `package.json:5–9` supplies global site commands; pages and themes demonstrate no application independence. Absence of relative cross-imports does not meet this requirement. |
| Q3 | No | Theme page renders WordPress content (`wp-content/themes/twentytwentyfive/templates/page.html:1–15`), without host/shell mounting own units. Map embeds an external service, without contract between candidate units. |
| Q4 | No | No configured mechanism connects own frontend units. `README.md:13` and `package.json:2–9` are isolated signals; database iframe demonstrates no explicit integration between such units. |
| Q5 | No | Q1–Q4 converge: a conventional site with external map and third-party material, without observable MFE architecture in snapshot. |

## Rationale

- `Non-MFE`: single conventional frontend and thematic mention without implemented unit composition. No unit is prepared for an external host; thus `MFE-unit` does not apply, nor is there reason for Q2–Q4 to be Undetermined.
- `frontend_units: 1` counts customized site, supported by actual database content and homepage configuration. Four installed themes, plugins, images, individual pages and revisions are not independent units; vendored WordPress infrastructure does not multiply count.
- `repo_type: example` records a demonstration site contextualized as “Special Day Midterm” in metadata, with simple customized content. Architecture or authorship is not deduced from repository name.
- `ui_technologies: [wordpress]` follows family 049 convention and relies on database and actual templates, not only README. `build_tools: []`: no bundler is configured for own units; CLI `wp-pwa` and external theme CSS scripts do not authorize inferring bundler. `approaches: []` accompanies absent MFE composition.
- This does not decide that every iframe fails to count: in this specific case no integration contract exists between units, under current criterion. Google Maps as third-party service is insufficient to create a second own frontend unit. No methodological decision remains open about an implemented unit chain.

## Analysis notes

- **Protocol (family):** same `cd-wordpress`/`wp-pwa` family as 049/079/117. Annotations 079 and 117 are `draft`, as `Non-MFE`, without site content; here database identifies one unit. 049 is `review`, proposing composition through remote script/custom element in CMS content. Database search for this candidate found no such contract; Maps iframe is not transferable evidence from 049.
- **RQ1:** `x-year` and Akismet iframes are third-party-code signals, following cautions in 080/102/074. README terminology signal explains selection, but does not replace content inspection.
- **Checklist:** own host/remotes chain of 076/084/096/106/109, code-sharing federation of 089/100 or incompletely connectable frontend configuration of 097/103/104 is not reproduced. Platform rule of 037 also prevents attributing infrastructure widgets to owner; evaluating site does not require promoting third-party map to own unit.
- **Protocol (family identity):** six template files (`README.md`, `package.json`, `.github/workflows/main.yml`, `.gitignore`, `LICENSE.txt`, `.devcontainer/devcontainer.json`) have the same blob hashes as those in 117 and therefore 079. `cd-wordpress` lineage is verifiable identity; difference is versioned `wp-content`, without 049’s script and custom-element contract.
- **Protocol (pending server-rendered convention):** `frontend_units: 1` counts WordPress site as a UI product (theme, templates and content, with observed UI technology). In 118 HTML responses were incidental server/API handlers without UI technology and count 0. Criterion suggested by reviewer for researcher decision: UI product with observable UI technology counts; incidental server/API HTML responses do not (covers 049, 082, 118 and 119).
