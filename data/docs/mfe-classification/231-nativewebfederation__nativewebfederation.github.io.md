---
schema: 1
id: 1396672130
full_name: nativewebfederation/nativewebfederation.github.io
url: https://github.com/nativewebfederation/nativewebfederation.github.io
commit: e4b2eea741a61065a6f6cbebe4c57f6e227c5450
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: other
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

# 231 — nativewebfederation/nativewebfederation.github.io

## Context

Static GitHub Pages site for “Native Web Federation (NWF)”, which presents itself as a standards committee and research group for “zero-dependency” web standards (`README.md:1–6`). The README lists phases of a specification program (`README.md:10–43`); phase 2, “The Native Microfrontend (MFE) Protocol”, is in “Architectural Scoping” (`:18–22`).

The site is HTML/JS without a framework. Each page (`index.html`, `blueprint/index.html`) contains an `<iframe>` that loads a `*.rmd.html` partial from the site itself. The partial then replaces its own iframe with the content of its `<template>` (`frameElement.replaceWith(...)`), a mechanism the project calls “Remote Module Definition (RMD)”. There is a Git submodule, `sovereigncommonsdistributed`, targeted by navigation links. The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:232` records rank 231, ID 1396672130, status `cloned`, branch `main` and the front matter commit, which is the HEAD of the clone and of `origin/main`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. The submodule was not initialized. There was no installation, execution or network access.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:232` records strategies `terminology;technology` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID appears in `data/discovery/mfe-round-001/candidates.csv:38133` (`unknown`) and `data/discovery/mfe-round-002/candidates.csv:38168` (`pass`).

A `sqlite3 -readonly` query against tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns the same four hits in each round, from endpoint `repositories` and with an empty `path`:

| Query (`q`) | Subquery | Collection 001 / 002 (UTC) |
|---|---|---|
| `terminology-topic-microfrontends`: `topic:microfrontends` | `terminology-topic-microfrontends` | 2026-10-07T18:18:43.496Z / 2026-10-08T15:34:28.993Z |
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | `…#created:2026-09` | 2026-10-07T22:03:58.018Z / 2026-10-08T15:44:15.548Z |
| `terminology-microfrontends-repositories`: `microfrontends in:name,description,readme` | `…#created:2026-09` | 2026-10-07T22:14:56.510Z / 2026-10-08T15:50:50.128Z |
| `technology-web-components-microfrontends-repositories`: `"web components" microfrontends in:readme` | `technology-web-components-microfrontends-repositories` | 2026-10-07T23:38:33.427Z / 2026-10-08T16:22:32.538Z |

The effective queries append `pushed:>=2025-04-01` and, in monthly searches, `created:2026-09-01..2026-09-30`.

Hit metadata:
- description “The formal reference implementation, protocols, and standard specifications of the Native Web Federation.”;
- topics `microfrontends`, `web-components`, `federation` and others;
- language HTML, `fork: false`, size 287;
- created at 2026-09-29T22:42:53Z, pushed at 2026-10-06T22:42:47Z;
- homepage `nativewebfederation.github.io`.

Spellings:
- “Microfrontend”: `README.md:18` (“Phase 2: The Native Microfrontend (MFE) Protocol”);
- “Web Components”: `README.md:21`;
- the plural “microfrontends” does not appear literally in the README; topic `microfrontends` accounts for the topic query, and plural textual queries depend on GitHub search processing, which is not recorded.

The README was last changed in `31d8a8c` (2026-09-30), before the collections. However, SHA `e4b2eea` (2026-10-09T22:29:56Z) postdates both collections: subsequent commits (`a7de990`, `e4b2eea`) change `app/app.rmd.html`, logos and the submodule pointer, without touching the README.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 47 entries, 46 regular files `100644` and 1 gitlink `160000` (`sovereigncommonsdistributed`, `.gitmodules:1–3`); zero symlinks. There are pages (`index.html`, `blueprint/index.html`, `donors/index.html`), partials (`app/app.rmd.html`, `app/children/footer/footer.rmd.html`, `blueprint/blueprint.rmd.html`), JS utilities in `core/`, `lib/marked.min.js`, styles and images. There is no app manifest or bundler; `package.json:6–9` has only a development server (gulp + browser-sync, `gulpfile.dev.js:9–14`). | context |
| Source code (partials) | `index.html:14`: `<iframe src="./app/app.rmd.html">`. `app/app.rmd.html:222–228`: the partial includes the footer iframe and executes `frameElement.replaceWith(content)`. `blueprint/blueprint.rmd.html:13–26`: fetches `blueprint.md`, converts it with `marked` and replaces the iframe. The partials are files of the same site and deployment, without their own build or entry point. | contrary |
| Submodule | `.gitmodules:1–3` points to `sovereigncommonsdistributed`. The site references it only through links (`app/children/footer/footer.rmd.html:56–59`; `app/app.rmd.html:196`); no file in the snapshot loads its code. The gitlink was not initialized. | context |
| Documentation | `README.md:18–22` and `blueprint/blueprint.md:39–41`: the MFE protocol is a future objective (“Architectural Scoping”), described as a work plan. | weak |
| Search | `git grep -i` at the SHA for `micro.?front`: only `README.md:18`, `app/app.rmd.html:57` and `blueprint/blueprint.md:9`, `14`, `39`, `41`, all descriptive texts. | context |

## Authorship and history

Non-shallow clone; 13 linear commits, no merges, all by Cody Skylark Carlson `<otocarlson@gmail.com>` (the first, `d2291fa`, as `cScarlson` through the web interface), from 2026-09-29 to 2026-10-09. Messages prefixed “-1:” describe page, README, manifest, favicons, deployment and logos. No historical blob was read and there was no missing object. The gitlink commit was not fetched.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | A single site; the `*.rmd.html` are content partials of the same site, and the submodule is referenced only through links. |
| Q2 | No | The partials have no entry point, build or deployment of their own and are served together by the same static site. |
| Q3 | No | There is no host composing units; the pages include their own fragments. |
| Q4 | No | The self-replacing iframe mechanism works as inclusion of HTML fragments from the same site, not composition of frontend units (`index.html:14`; `app/app.rmd.html:226–227`). |
| Q5 | No | Q1–Q4 are No: institutional site for a specification program that treats micro-frontends as a future phase. |

## Rationale

- `Non-MFE` under the rule “at least one question is No”. It matches “repositories mentioning micro-frontends without implementing them” and “conventional frontend monoliths”.
- The use of `<iframe>` does not depend on the open decision about iframe composition: the loaded fragments are partials of the site itself, without build or deployment independence (Q2 No).
- Without composed units, cases 102/074/080 (third parties) do not apply. The submodule is only a destination for navigation links.
- `frontend_units: 1`, `unit_organization: single-unit`, `ui_technologies: []` (HTML/JS without a UI library), `build_tools: []` (no bundler), `repo_type: other` (institutional site).
- There is no open decision.

## Analysis notes

- **RQ1 (misleading signals):** topic `microfrontends` and mention of a “Native Microfrontend (MFE) Protocol” still in scoping, on an institutional specification site.
- **Protocol (snapshot):** the SHA in `clones.csv` postdates both collections, but the files containing the search terms (README, description and topics) did not change during this interval.
- **Protocol (search):** eligibility changes from `unknown` (001) to `pass` (002).
