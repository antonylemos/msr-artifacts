---
schema: 1
id: 1296132432
full_name: Surabhi-helium/DA-microfrontend
url: https://github.com/Surabhi-helium/DA-microfrontend
commit: c653dc1f76e260a856ace1b0e87ea33fac14746e
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: template
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

# 267 — Surabhi-helium/DA-microfrontend

## Context

- **Repository type:** template. An unmodified generated copy of Adobe’s “Author Kit” for AEM Edge Delivery sites authored through Document Authoring (da.live).

The README is the template’s (`README.md:1–7`, “Author Kit… Use this template to make a new repo”), and `package.json:2`, `:18–25` points to `aemsites/author-kit`. The site is a single codebase served by the AEM platform: `head.html` loads `scripts/scripts.js` and `scripts/ak.js`, decorating the page and loading blocks (`blocks/*`) from the same codebase. The term “microfrontend” appears only in the repository name, which is not used as architectural evidence.

`data/samples/mfe-sample-001/clones.csv:268` records rank 267, ID 1296132432, status `cloned`, branch `main` and the front matter commit, which is the HEAD of the clone and of `origin/main`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. There was no installation, execution or network access (da.live and aem.live were not consulted).

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:268` records strategy `terminology` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID appears in `data/discovery/mfe-round-001/candidates.csv:33264` (`terminology`, `unknown`) and `data/discovery/mfe-round-002/candidates.csv:33272` (`terminology`, `pass`).

A `sqlite3 -readonly` query against tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns one hit per round, from endpoint `repositories` and with an empty `path`:

| Query (`q`) | Subquery | Effective query | Collection 001 / 002 (UTC) |
|---|---|---|---|
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | `terminology-microfrontend-repositories#created:2026-07` | `microfrontend in:name,description,readme pushed:>=2025-04-01 created:2026-07-01..2026-07-31` | 2026-10-07T21:52:05.260Z / 2026-10-08T15:43:18.809Z |

Hit metadata (identical in both rounds): null description, no topics, language JavaScript, Apache-2.0 license, `fork: false`, size 178, created at 2026-07-10T06:28:36Z, pushed at 2026-07-10T06:28:40Z.

**Spelling:** the description is null and the README (`README.md:1–118`) contains neither “microfrontend”, “micro-frontend” nor “micro frontend” (`git grep -i 'micro.?front'` search at the SHA: no occurrences). The only place with the spelling is the repository name (`DA-microfrontend`), covered by query `in:name`. The name explains sample entry, but is not architectural evidence.

The README exists only in the single commit, the SHA (2026-07-10T11:58:40+05:30, that is, 06:28:40Z). It coincides with `pushed_at` and predates the October 2026 collections, and the README at the SHA does not postdate the searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 89 entries, all regular files `100644`; zero symlinks and zero gitlinks. A single site codebase: `head.html`, `scripts/`, `styles/`, `blocks/` (10 blocks, such as header, footer, hero, card, fragment), `tools/` (quick-edit, scheduler, sidekick, da), `deps/` (compiled Lit and RUM), `workers/website/` (proxy Cloudflare Worker) and tests. | contrary |
| Configuration / Build | `package.json:6–14`: only lint, tests and `build:lit` (bundles the Lit dependency with esbuild); no application build, as the platform AEM serves it without a build (`README.md:14–18`). `workers/website/wrangler.toml:1–9`: worker pointing to `aemsites/author-kit`. | contrary |
| Source code (block loading) | `head.html:2–4` loads `styles/styles.css`, `scripts/scripts.js` and `scripts/ak.js`. `scripts/ak.js:60–68`, `:79`, `:345–360`: `loadBlock`/`loadExperience` perform `import(\`${codeBase}/${type}/${name}/${name}.js\`)` from the site’s own `codeBase` (`:37`). Blocks are page components from the same codebase, not units with their own entry point and build. | contrary |
| Source code (platform tools) | `scripts/scripts.js:42–48`: with `?dapreview` or `?quick-edit`, loads `tools/da/da.js` or `tools/quick-edit/quick-edit.js`. `tools/da/da.js:1–14` imports `scripts/dapreview.js` from `https://da.live` or branches `da-live--adobe`; `tools/quick-edit/quick-edit.js:3–19`, `:39–47`: injects an import map for `da-lit`/`da-y-wrapper` on `da.live` and imports the quick-edit plugin from `da.live/nx`. These are Adobe platform authoring tools, loaded in editing or preview mode. | ambiguous |
| Source code (boundaries) | Active search for `../../` imports: blocks and tools import `scripts/ak.js`, `scripts/utils/*` and `deps/lit` from the same site (for example, `blocks/header/header.js:1`; `tools/scheduler/scheduler.js:1–2`; `tools/quick-edit/quick-edit.js:1`). Confirms a single coupled codebase, without independent units. | contrary |
| Technology / Composition (search) | `git grep -i` at the SHA, except compiled Lit, for `micro.?front`, `federation`, `single.?spa`, `remoteEntry`, `import.?map`, `customElements`, `<iframe`, `qiankun` and `wujie`: the import map in `quick-edit.js:3–14`; `customElements.define` of `aem-scheduler` (`tools/scheduler/scheduler.js:97`), an internal tool; a YouTube iframe (`blocks/youtube/youtube.js:4`); and `@web/dev-server-import-maps`, only in the test runner (`package.json:29`). No mechanism composing its own frontend units. | absent |
| Documentation | `README.md:79–93`: Edge Delivery Page/Section/Block/Auto Block patterns; `README.md:59–63`: Sidekick and Quick Edit tools. No micro-frontends mention. | context |

## Authorship and history

Non-shallow clone. There is 1 commit, both SHA and root (1 across all refs), without merges: author `Surabhi-helium <surabhi@iamhelium.com.au>`, committer `GitHub <noreply@github.com>`, 2026-07-10T11:58:40+05:30, “Initial commit”. This is the pattern of a repository created through “Use this template” (`README.md:7`). Content is template `aemsites/author-kit` (`package.json:18–25`; `workers/website/wrangler.toml:6`; `404.html:18`), without subsequent owner changes, and recorded identity does not demonstrate code authorship. `git rev-list --objects $SHA --missing=print` lists no missing objects.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | A single site codebase (inventory; `head.html:2–4`). Blocks are components of the same codebase, loaded through common `codeBase` (`scripts/ak.js:37`, `:60–68`). da.live tools are platform authoring tooling, not repository frontend units referenced by composition configuration. |
| Q2 | No | There are not two units with their own entry point and build. Blocks and tools import `scripts/ak.js` and utilities through relative paths (`blocks/header/header.js:1`; `tools/quick-edit/quick-edit.js:1`). |
| Q3 | No | There is no host loading independent units; `ak.js` decorates the page and loads blocks from the site itself (`scripts/ak.js:345–360`). |
| Q4 | No | No unit composition mechanism. The import map and remote `import()` from `quick-edit.js:3–19` and `da.js:1–4` load platform editing tools in authoring mode. |
| Q5 | No | Q1–Q4 converge. |

## Rationale

- `Non-MFE` under the rule “at least one question is No”.
- It matches “conventional frontend monoliths”: an Edge Delivery site with page blocks loaded dynamically from the same codebase.
- Remote loading of da.live tools is third-party platform tooling (CMS/authoring). Even if read as composition, it would fall under final 037’s platform plugin/extension rule, with the same result.
- It is also an unmodified copy of a third-party template (`aemsites/author-kit`). Redistribution treatment remains open in 074/080/102/122, but does not change the class.
- The search term appears only in the repository name (`DA-microfrontend`); no artifact mentions micro-frontends.
- `repo_type: template`, `frontend_units: 1`, `single-unit`. `ui_technologies: []`: vanilla JavaScript, with Lit only in tool `aem-scheduler`. `build_tools: []`: esbuild bundles only the Lit dependency (`package.json:14`), and the site is served without a build.
- There is no open decision.

## Analysis notes

- **RQ1 (misleading signals):** the hit comes exclusively from the repository name. Content is an official Adobe template unrelated to micro-frontends. Dynamic block loading through `import()` and the Quick Edit import map have a technical form similar to runtime composition, but operate within one codebase or bring platform tools.
- **Protocol (families/duplicates):** another instance of the same template appears in the rounds (`feffef/da-author-kit`, `data/discovery/mfe-round-002/candidates.csv:21087`), outside the sample and not inspected. Template-generated repositories with `fork: false` enter as distinct candidates.
- **Protocol (search):** eligibility changes from `unknown` (001) to `pass` (002).
