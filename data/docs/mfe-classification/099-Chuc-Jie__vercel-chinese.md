---
schema: 1
id: 1188729312
full_name: Chuc-Jie/vercel-chinese
url: https://github.com/Chuc-Jie/vercel-chinese
commit: 9ea36ab2ac7d98ee74ea534340f94cdc991e0425
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: production
approaches: []
ui_technologies: []
build_tools: []
frontend_units: 0
unit_organization: none
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 099 — Chuc-Jie/vercel-chinese

## Context

Utility translating the Vercel interface into Chinese, distributed as a userscript for browser script managers. Purpose is in `README.md:7–20`, and installation/use in `README.md:62–83`. `repo_type: production` records this intended use, without asserting tested installation or operation. The script traverses and changes text/attributes in an existing DOM; it neither provides a frontend application with its own UI nor loads another application.

The clone is `Chuc-Jie__vercel-chinese`; the SHA matches `data/samples/mfe-sample-001/clones.csv:100`. Complete inventory through `git ls-tree -r 9ea36ab2ac7d98ee74ea534340f94cdc991e0425`: **3 regular files** (mode `100644`), **zero symlinks** and **zero gitlinks**. The entire tree contains only `LICENSE`, `README.md` and `Vercel-Chinese.user.js` at the root. There are no subfolders, submodules, `node_modules/`, application manifests, HTML entry or build configuration. `frontend_units: 0` follows from this inventory and DOM transformation code, not lack of observability. The executable userscript is not itself an independent frontend target; third-party Vercel pages do not count as own units.

## Sample provenance

- `data/samples/mfe-sample-001/sample.csv:100` records rank 99, id 1188729312, `strategies: terminology` and eligibility `pass`. The manifest points to `data/discovery/mfe-round-002` as origin round (`data/samples/mfe-sample-001/manifest.json:2–5`).
- `data/discovery/mfe-round-001/candidates.csv:26961` and `data/discovery/mfe-round-002/candidates.csv:26968` record the same strategies, null description, empty topics, JavaScript language, GPL-3.0 license, default branch `master`, creation and last push on 2026-03-22. These are discovery metadata, not architectural classification.
- Databases `sqlite3 -readonly` and `data/discovery/mfe-round-001/discovery.sqlite` queried with `data/discovery/mfe-round-002/discovery.sqlite`. In both, `hits JOIN queries` through `query_id`, filtering `hits.repository_id = 1188729312`, returns two hits: `terminology-microfrontend-repositories` and `terminology-microfrontends-repositories`, strategy `terminology`, endpoint `repositories`, queries `microfrontend in:name,description,readme` and `microfrontends in:name,description,readme`. Paths are empty: there is no code hit with an attributed location.
- **Field elimination:** `vercel-chinese` lacks the searched terms; description and topics are empty. README is the observed compatible field, because it lists Microfrontends among Vercel features whose text is translated (`README.md:48–54`). Neither an exact GitHub-indexed line/version is inferred from the database nor the name used as evidence. Code search finds terms as dictionary keys, not implementation of the named feature. Query form (`microfrontend(s)`, without space or hyphen) exactly matches "Microfrontends" in `README.md:53`, the only README occurrence, naming the Vercel console feature whose text is translated.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Configuration (userscript execution) | Header defines matching for `*.vercel.app`, `vercel.com` and `*.vercel.com`, `@grant none`, `@noframes` and execution at `document-end` (`Vercel-Chinese.user.js:1–15`). This is activation by a userscript manager on existing pages; it is not frontend application composition configuration. | contrary |
| Source code (entry) | `Vercel-Chinese.user.js:17–35` starts an IIFE, defines selectors for ignored areas and creates a translation Map. There is no own-UI bootstrap, lifecycle export or mounting interface intended for an external host. | contrary |
| Source code (thematic content) | `Vercel-Chinese.user.js:190` translates “Microfrontends Routing”, and `Vercel-Chinese.user.js:236` translates “Microfrontends”. These are English/Chinese Map pairs, not remote declarations, routing rules or MFE framework calls. | context |
| Source code (text transformation) | The script sorts keys and precompiles regexes (`Vercel-Chinese.user.js:530–540`); it traverses terms and writes translated `node.nodeValue` (`:615–637`). Attributes are also translated by string replacement and `setAttribute` (`:640–661`). | contrary |
| Source code (existing DOM) | `Vercel-Chinese.user.js:665–685` uses TreeWalker to traverse text nodes; `:688–718` traverses elements/attributes. `:723–725` applies transformation to `document.body`. The target is the interface already provided by the site, not a second application provided by the repository. | contrary |
| Source code (dynamic content) | `Vercel-Chinese.user.js:547–566` schedules initial translation and observes DOM changes. `:568–574` cleans up observers on unloading; `:959–981` reacts to load/clicks to reapply translations. MutationObserver and DOM events do not connect independent frontend units. | contrary |
| Documentation | `README.md:24–37` describes translation and dynamic-page handling; `README.md:53` lists coverage of microfrontend text. `README.md:115–133` explains TreeWalker, regexes and MutationObserver, consistent with code. The translated expression does not confirm architecture of the translator or third-party page. | context |
| Build/deploy / Configuration (resolution) | The inventory contains no `package.json`, lockfile, builder, bundler config or federation dependency to resolve. The script uses DOM/browser APIs and contains no import/require or `@require` directive. Field `@icon` (`Vercel-Chinese.user.js:7`) points to an image, not imported frontend code. No package/builder is assumed from the Vercel domain or framework names listed in the README. | absent |
| Structure / Configuration / Source code (negative search) | The three commit files were searched for `ModuleFederationPlugin`, `withModuleFederation`, `remoteEntry`, `loadRemote`, `single-spa`, `registerApplication`, `qiankun`, `wujie`, `postMessage`, `iframe`, `importmap`, `customElements`, imports/exports, `require`, `@require` and `createElement`: no results. Positive search `micro.?front`/`federat` finds only `README.md:53` and both translation keys (`Vercel-Chinese.user.js:190`, `:236`). | absent |
| Structure / Documentation (negative architecture search) | The complete inventory contains no ADR, separate architecture document, authored host, remote unit, HTML entries or other sources. The README describes the translation mechanism (`README.md:115–133`), without an inter-application composition contract. | absent |

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | No own frontend target: the script traverses and translates the existing DOM (`Vercel-Chinese.user.js:665–685`, `:723–725`). “Microfrontends” is dictionary text (`:190`, `:236`), not a configured unit. |
| Q2 | No | There is neither a set of units with their own entries/builds nor a unit prepared for an external host. The only executable code is the translation IIFE (`Vercel-Chinese.user.js:17–35`) activated by userscript metadata (`:8–14`). |
| Q3 | No | There is no authored host/root composing applications. Vercel site matches (`Vercel-Chinese.user.js:8–10`) select pages where text changes, not participating units of an application decomposed by the author. |
| Q4 | No | Composition mechanism absent from tree and searches. The implemented mechanism is text/attribute replacement with DOM observation (`Vercel-Chinese.user.js:547–566`, `:615–661`), not frontend loading or mounting. |
| Q5 | No | Third-party page translation utility (`README.md:7`, `Vercel-Chinese.user.js:723–725`), with MFE mentions as translated content. Q5 follows Q1–Q4. |

## Rationale

- Proposed `Non-MFE`, Q1–Q5 No: thematic terms belong to translator content; there is no MFE architecture implementation. Precedents 023/028 and 075/081 prevent counting named/displayed content as units.
- It is not MFE-unit: there is no frontend application mounting/exposure contract. Execution in an external page by a script manager is insufficient for this exception. Therefore Q2–Q4 are No, without Undetermined because of an absent host.
- The observed third-party platform is Vercel; execution medium is a userscript manager, such as Tampermonkey/ScriptCat/Greasemonkey (`README.md:64–74`). The platform boundary in final 037 reinforces that third-party product extension does not demonstrate an application decomposed by the author. Here exclusion already follows from absence of units/composition, without Q5 override or assuming Vercel loads this script through an official plugin protocol.
- `frontend_units: 0`, `unit_organization: none`, `ui_technologies: []`, `build_tools: []` and `approaches: []` describe what was inventoried. React/Next/Vue/Angular names in `README.md:57–60` are examples of terms covered by translation, not frameworks used to build an own UI.

## Analysis notes

- **RQ1:** both rounds record terminology hits compatible with translation coverage described in the README. The same signal appears in code as Map strings, demonstrating that a source occurrence can also be merely content.
- **RQ3:** userscript header → activation on existing page → dictionary → regexes/TreeWalker → text and attribute changes. This chain fully explains observed code, without inferring a unit from features of the translated platform.
- **Protocol (families/templates):** `README.md:11–20` attributes the base to `liyixin21/vercel-chinese`; the header identifies author and original author (`Vercel-Chinese.user.js:3–6`). Origin is declared, not verified code equivalence. Searches in annotations for `Chuc-Jie`, `vercel-chinese`, `liyixin21`, userscript and manager names found no sibling. Upstream was not accessed. Final 032 is a parallel for MFE terminology in textual material/translations; final 037 provides the platform-plugin boundary, without demonstrating a shared family.
- **History:** non-shallow clone; **7 reachable commits**, **0 merges** and **1 root commit**, `e7a99c1dfb10f2a0ebbf97d951c9c69cb8d23db2`, checked through `git rev-list --count`, `--count --merges` and `--max-parents=0`. All on 2026-03-22. The path log shows script creation at root, README addition in `53abcb6`, script changes in `0252907`/`e925fef`, README revisions in `3e9a00e`/`108f125` and license addition/README revision at the pinned SHA. README version count was not used as commit count.
- **Protocol (branches and limitations):** only `master`, `origin/master` and `origin/HEAD`, all at the pinned SHA. The documented installation URL (`README.md:72`) uses branch `main` and a lowercase filename, while the snapshot is on `master` with `Vercel-Chinese.user.js`; external resolution was not tested and is unnecessary for the architecture decision. No network, submodule, installation or script execution performed. No open decision identified.
