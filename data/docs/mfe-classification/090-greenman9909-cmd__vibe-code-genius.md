---
schema: 1
id: 1380579775
full_name: greenman9909-cmd/vibe-code-genius
url: https://github.com/greenman9909-cmd/vibe-code-genius
commit: 1a7637160bfcc272d302797ec95176168a9c783a
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
  date: 2026-10-22
---

# 090 — greenman9909-cmd/vibe-code-genius

## Context

Python tool for planning and validating application-building artifacts, accompanied by documentation, execution records and a static showcase site. The CLI has its own entry in `pyproject.toml:12–13`; its planning writes JSON and Markdown (`vibe_code_genius/engine.py:22–31`). Architecture described as tree/orchestration refers to the build process and artifacts, not frontend application composition (`README.md:107–115`).

Commit checked against `data/samples/mfe-sample-001/clones.csv:91`. Complete inventory through `git ls-tree -r 1a7637160bfcc272d302797ec95176168a9c783a`: **331 entries, comprising 330 blobs and one gitlink**, no versioned `node_modules/`. The only own HTML entry is `site/index.html`; there are no `.tsx`/`.jsx` sources. The two `package.json` files are in scaffold directories and lack the corresponding planned UI implementation. The gitlink is an extracted-code reference, not another frontend composed by the site. Thus, `frontend_units: 1` counts the own site actually implemented, without counting planned/generated outputs or the external reference.

The clone is not shallow (`git rev-parse --is-shallow-repository`: false). The actual count of commits reachable from the evaluated SHA is **49**, obtained through `git rev-list --count`; this is neither the number of last items displayed by `git log` nor the sum of other branches.

**Branches, for the record only:** `main`, `origin/main` and `origin/HEAD` point to the pinned SHA. Other local references observed, without inspecting their content:

| Local remote reference | SHA |
|---|---|
| `origin/feat/godtree-os-core-v0.1` | `5eeba16274fa36da107ec1fb30367d731fbbdf6c` |
| `origin/feat/local-agent-gateway-v1` | `b3b207ee05ec105025d5c1e1969333991409553a` |
| `origin/patch/tool-orchestration-runtime` | `65cae9fbaf52e0535b127370005cc0178c321ef7` |
| `origin/product/god-tree-completion-2026-09-23` | `092353bae47e7946bd8dc5226d73eb9f7017b1f2` |
| `origin/research/2026-09-23-training-cycle-2` | `950b43488c3369dce6646780d75ece36ce59c862` |
| `origin/site/resend-inspired-god-tree` | `97e9c6750c27b73f7c99b9c586a968cc644690a9` |
| `origin/training/2026-09-23-evidence-cycle` | `6642f4951a619952cba6a486e78c995e33cc4650` |

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Technology / Source code (tool) | `pyproject.toml:5–13` defines the Python package and `vibe-tree` command. `vibe_code_genius/cli.py:18–40` registers planning, reference acquisition and checks; `vibe_code_genius/engine.py:22–31` produces session and plan files. These operations are neither frontend units nor their composition root. | context |
| Source code (own frontend) | `site/index.html:8` loads CSS, `site/index.html:20–40` implements the product showcase and `site/index.html:65` loads only `/app.js`. `site/app.js:1–5` adds focus to anchor navigation within the document itself. This is an HTML/CSS/JavaScript page, without an observed UI framework. | contrary |
| Configuration / Build/deploy | `server.py:5–9` fixes `site/` as the directory served by `SimpleHTTPRequestHandler`; `server.py:22–26` starts the HTTP server. `railway.json:3–6` executes `python server.py`. There is no bundler or composition of other frontends in this delivery. | contrary |
| Structure (scaffolds) | `first-build/scaffold/package.json:5–19` and `trust-build-2/scaffold/package.json:5–19` declare Next/React and scripts. However, `first-build/file-tree.md:5–28` and `trust-build-2/file-tree.md:4–17` describe page/layout files that do not exist in the tree. The `.ts` sources of these executions are API clients, handlers, server and webhook; for example, `first-build/server/index.ts:17–21` defines API error handling. Manifests and proposed trees do not confirm two instantiated frontend applications. | context |
| Architecture documentation (executions) | `first-build/stack-decision.md:3–18` describes a reference profile and target Next/React decisions; `trust-build-2/stack-decision.md:3–15` records Next, selective hydration and Railway target. These are execution artifact decisions, without corresponding page sources or a composition contract between applications. React/Next is not attributed to the own static page based on these documents. | context |
| Structure / Documentation (submodule) | `.gitmodules:1–4` records `references/extracted/ani-pm/code`; the tree pins this gitlink at commit `2f734e7334a9a9e2db6a43c876fe88613687827f`. `references/extracted/ani-pm/README.md:3–13` identifies it as a frontend extracted by SPA-Ripper, maintained in another repository as reference. It was neither initialized nor inspected as another own application of the candidate. | context |
| Documentation (reference limitation) | `references/extracted/ani-pm/README.md:63–67` delimits the capture as historical reference. `references/extracted/ani-pm/reference-source.json:10–13` declares external-pinned-reference mode. `contracts/extracted-design-learning-contract.md:3–19` treats extracted code as evidence for design analysis before implementing another product, not as a module the site loads. | context |
| Documentation (process) | `README.md:13–21` describes the building tool; `README.md:105–115` distinguishes the plan from artifacts the integration should produce and explains the steps. `nodes/t2/11a-design-system-extract.md:11–34` describes design extraction/analysis. The composition and component vocabulary describes code/artifact construction, not MFE configuration. | context |
| Documentation (use and provenance) | `docs/customization.md:25–35` documents integration adapters and schema extensions. `walkthroughs/2026-09-22-resend-god-tree-explainer.md:10–22` describes the intention to use the process to build a site about the tool. These records contextualize examples/scaffolds, without adding a frontend unit to the served site. No directory or document identified as ADR exists in the inventory; observed architecture decisions are in the cited records. | context |
| History | Among the 49 reachable commits, `b3137d01fe57d912207fed5c1023fb22c3443ea2` (2026-09-22, Attach ani.pm extracted frontend as pinned code reference) already contains the gitlink at the same pinned SHA. `d72f5a68ce96d91b64a7a16dc4b881adf6b145db` (2026-09-22, Add Railway-ready Vibe Code Genius showcase) contains `server.py`, `site/index.html` and `site/app.js` with blobs identical to those at the evaluated commit, checked through `git ls-tree`. Their current contents in `server.py:5–9`, `site/index.html:65` and `site/app.js:1–5` remain the static delivery. Titles were not used alone to infer implementation. | context |
| Structure / Configuration (negative unit search) | All paths inventoried: only `site/index.html` as HTML entry, no `.tsx`/`.jsx`, no `next.config.*`, `vite.config.*`, Module Federation configuration or other implemented frontend application. The only npm manifests are the two cited scaffolds. Gitlink content does not belong to the own blob inventory and was not counted as a composition target. | absent |
| Technology / Configuration / Source code (negative composition search) | All own blobs with extensions `.py`, `.js`, `.ts`, `.tsx`, `.json`, `.html`, `.md`, `.yaml` and `.toml` were searched for `micro.?frontend`, `ModuleFederation`, `module.federation`, `remoteEntry`, `exposes:`, `remotes:`, `single-spa`, `registerApplication`, `registerMicroApps`, `customElements.define`, `importmap`, `import-map`, `postMessage`, `<iframe` and `srcDoc`, without results. The scope expands neither the gitlink nor images; a generation tree is not confused with a frontend root. | absent |

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | There is only one implemented own frontend: `site/index.html:8–65`, served by `server.py:5–9`. Next manifests are scaffolds without pages present; the submodule capture is historical reference (`references/extracted/ani-pm/README.md:3–13`, `references/extracted/ani-pm/README.md:63–67`), without composition configuration. |
| Q2 | No | There is neither a set of frontend units to evaluate nor preparation of the static page for an external host. The observed delivery serves a single directory (`server.py:5–9`, `railway.json:3–6`); scripts declared in `first-build/scaffold/package.json:5–9` do not establish another implemented unit. |
| Q3 | No | There is no host/shell/root loading units. `site/index.html:65` loads only the local script, and `site/app.js:1–5` operates anchors within the same document. The external reference is neither imported, mounted nor routed by the site. |
| Q4 | No | Composition configuration/contract searches were negative; the static server serves the page (`server.py:5–9`) and its script does not compose other targets (`site/app.js:1–5`). Documentation links and reference gitlink do not configure frontend composition. |
| Q5 | No | The implementation shows a Python artifact tool (`vibe_code_genius/engine.py:22–31`) with a static site and design references, without an MFE instance. Q5 follows Q1–Q4; no override. |

## Rationale

- Proposed `Non-MFE`, Q1–Q5 No. The repository is a building/validation and documentation tool, with its own showcase page; it is not an application composed of micro-frontends.
- Precedents 023/028 and 081 distinguish frontend implementations from content, displayed/generated code and targets without composition. Planning files, scaffold manifests and extracted source as reference do not add Q1 units.
- It is not MFE-unit: the own page exports no modules, lifecycles or contract for an external host. Therefore Q2–Q4 are No, without converting the absence of a hypothetical host into Undetermined.
- The tool can be installed in development platforms, but these adapters are not visual extensions making it a composed frontend unit. Neither the absent own-host exception nor the platform visual-plugin rule applies.
- `ui_technologies: []` and `build_tools: []` reflect the own HTML/CSS/DOM page and absence of bundler configuration for it. Scaffold React/Next declarations and the external capture’s React/Vite description are not attributed to the own frontend. There is no open iframe/link/build-time or code-sharing decision here.

## Analysis notes

- **RQ1:** orchestration, components, composition and tree describe a generation process and its contracts. Proof of frontend architecture depends on consumer code between units, not that vocabulary.
- **RQ1 (counting):** 331 tree entries are not equivalent to 331 own code files: they are 330 blobs plus a gitlink. The submodule was not materialized, nor were the 227 files reported in the external inventory in `references/extracted/ani-pm/reference-source.json:15–22` adopted as this candidate’s units or sources.
- **Protocol (families):** searches in existing annotations for `greenman9909`, `vibe-code-genius`, `ani.pm` and `God Tree` found no previously annotated siblings/family. The reference repository is cited as capture provenance, without inferring common origin with earlier candidates. Cases 075 and 081 are comparable only by the separation between a generation tool and produced artifacts; they do not indicate a shared template or ancestry.
- **Protocol (inspection):** the classification uses the pinned commit and its 49 ancestor commits only for historical context. No alternative-branch content was used; generator, server, tests, installation or access to external services/references were not executed.
- **Protocol (sample entry and submodule):** the candidate entered through the `broader` strategy (`sample.csv`, rank 90 row) and no micro-frontend term appears in the snapshot; entry is explained by broad terms such as orchestration and composition (`README.md:13`, `pyproject.toml:8`), a misleading search signal. Gitlink `references/extracted/ani-pm/code` (`2f734e73…`) is declared in `.gitmodules:2–4` (url `greenman9909-cmd/ani-pm-frontend`, branch `main`) and, according to `references/extracted/ani-pm/README.md:3` and `:12–13`, is a third-party site capture extracted by SPA-Ripper, maintained as design reference and not the author’s implementation; this reinforces Q1 exclusion even if materialized. The submodule was not entered and the network was not accessed.
