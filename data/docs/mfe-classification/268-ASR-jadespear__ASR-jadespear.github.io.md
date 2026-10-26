---
schema: 1
id: 1327089363
full_name: ASR-jadespear/ASR-jadespear.github.io
url: https://github.com/ASR-jadespear/ASR-jadespear.github.io
commit: 26048df52dca957284bc2dc51a51ae4a7938334c
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

# 268 — ASR-jadespear/ASR-jadespear.github.io

## Context

Static personal single-page portfolio published on GitHub Pages: `index.html`, `css/style.css`, `js/script.js` and images. The README declares construction “without bulky frontend frameworks or UI libraries” (`README.md:9`). The “micro-apps” cited in the README are two interactive widgets on the page itself, a Web Audio piano and a mandala canvas (`README.md:124–128`), implemented in the same `js/script.js` (`README.md:206`). The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:269` records rank 268, ID 1327089363, status `cloned`, branch `main` and the front matter commit, which is the HEAD of the clone and of `origin/main`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. There was no installation, execution or network access.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:269` records strategy `broader` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID appears in `data/discovery/mfe-round-001/candidates.csv:34972` (`unknown`) and `data/discovery/mfe-round-002/candidates.csv:34978` (`pass`).

A `sqlite3 -readonly` query against tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns a single hit in each round. It comes from endpoint `repositories`, query `broader-micro-apps` (`"micro apps" frontend in:name,description,readme`), subquery `…#created:2026-Q3`, with an empty `path`. Collections are 2026-10-07T23:51:14.505Z (001) and 2026-10-08T16:27:24.408Z (002). The effective query appends `pushed:>=2025-04-01 created:2026-07-01..2026-09-30`.

Hit metadata:
- null description, no topics, language HTML, `fork: false`, size 74.036;
- created at 2026-08-07T19:34:02Z, pushed at 2026-09-03T12:12:14Z.

Spellings in the README:
- “micro-apps”, hyphenated, in `README.md:126` (“Two interactive creative micro-apps:”); literal form “micro apps” does not appear;
- “frontend” in `README.md:9` (“without bulky frontend frameworks or UI libraries”).

The quoted phrase hit depends on GitHub search text processing, which is not recorded. The last README change is the SHA itself (2026-09-03), before the October 2026 collections. The README at the SHA does not postdate the searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 25 entries, all regular files `100644`; zero symlinks and zero gitlinks. These are `README.md`, `index.html`, `css/style.css`, `js/script.js`, 6 images in `assets/images/` and 15 WebP screenshots in `assets/game screenshots/`. There is no `package.json`, build or framework. | contrary |
| Script loading | `index.html:1119`: only `<script>`, local (`js/script.js?v=4.0`). Search at the SHA for `<iframe`, `type="module"`, `import(`, `customElements`, `federation` and `single-spa` in `index.html` and `js/script.js` returns nothing. | contrary |
| Documentation | `README.md:124–130`: “micro-apps” are widgets of the same page. `README.md:197–218`: single-site file structure. | contrary |

## Authorship and history

Non-shallow clone; 16 linear commits, no merges, from 2026-08-08 (`ef88ef5`, “Initial commit”, author `ASR_jadespear`) to 2026-09-03 (SHA `26048df`). The other 15 have author `ASR`; 14 are named “Add portfolio website structure”. Only branch `main` exists. No historical blob was read and there was no missing object.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | A single static page; “micro-apps” are widgets in the same script, not separate frontend units. |
| Q2 | No | There are no separate units: one `index.html` and one `js/script.js`. |
| Q3 | No | There is no host, shell or root composition configuration. |
| Q4 | No | No composition mechanism: one local script, without iframe, remote module or import map (`index.html:1119`). |
| Q5 | No | Q1–Q4 are No: static personal portfolio. |

## Rationale

- `Non-MFE` under the rule “at least one question is No”. It matches “conventional frontend monoliths”, in minimal form: a static single-page site.
- Like profiles 011/064/068/073/077/101/111, it is a personal page without micro-frontends implementation. The match comes from broader query `"micro apps" frontend`, matching “micro-apps” and “frontend” in unrelated contexts.
- **Fields:** `frontend_units: 1`, `unit_organization: single-unit`, `repo_type: other`, `approaches: []`, `ui_technologies: []` (HTML/CSS/JS without a framework), `build_tools: []`.
- There is no open decision.

## Analysis notes

- **RQ1 (misleading signals):** “micro-apps” used for page widgets, combined with “frontend frameworks” in another sentence, matches the broader query.
- **Protocol (search):** phrase “micro apps” has no literal spelling. Eligibility changes from `unknown` (001) to `pass` (002).
