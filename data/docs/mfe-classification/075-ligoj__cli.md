---
schema: 1
id: 1135961166
full_name: ligoj/cli
url: https://github.com/ligoj/cli
commit: f06760f6d733a6c17f379b6dd141f07901892676
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: other
approaches: []
ui_technologies: []
build_tools: []
frontend_units: 0
unit_organization: none
annotation:
  method: manual
  status: final
  date: 2026-10-22
---

# 075 — ligoj/cli

## Context

Python command-line client for the Ligoj REST API, with development-environment tooling and plugin generation/maintenance (`pyproject.toml:12–18`, `ligojcli/dev_plugin.py:92–108`). The candidate contains the generator and automation; Ligoj projects and plugins are external inputs to these tools, not frontend applications present in this repository.

Clone checked as `data/samples/mfe-sample-001/repos/ligoj__cli/`. Rank, ID and SHA match the `cloned` row in `data/samples/mfe-sample-001/clones.csv:76`. `git rev-parse HEAD` returned the front matter SHA, and `git cat-file -t` confirmed the object as a commit. All inspection used `git ls-tree`, `git show` and `git grep` at that SHA, without running the CLI, generator, builds or deployments.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure / Source code / Build/deploy | Complete inventory through `git ls-tree -r --name-only` at the SHA: 78 files; no gitlinks in the `git ls-tree -r` inventory. Searched for `package.json` manifests, `vite.config`, `webpack` and `rspack` configurations, `.vue`, `.tsx`, `.jsx` sources, `.html` documents, `Dockerfile` and `pom.xml`: none of these paths is tracked. The candidate's actual build is Python/setuptools (`pyproject.toml:1–9`), with a console command in `pyproject.toml:54–55`; `Makefile:55–57` builds sdist/wheel through `uv build`. The tree contains no instantiated frontend unit. | absent |
| Source code / Configuration | `pyproject.toml:54–55` links command `ligoj` to `ligojcli.ligoj:ligoj`; `ligojcli/ligoj.py:28–45` configures subcommands, and `:59–79` executes actions and prepares JSON output. This is a terminal interface, without a web application shell in these artifacts. | contrary |
| Source code (generation) | `ligojcli/dev_plugin.py:125–128` chooses a new output directory; `:143–145` invokes generation. `:204–226` lists files to produce, including `ui/package.json`, `ui/vite.config.js` and `ui/src/index.js`; `:233–238` calls builders and writes their texts. These paths are generator outputs, not frontend files found in the commit. | context |
| Technology / Configuration (template) | `ligojcli/dev_plugin.py:611–643` returns a Vue/Vite manifest string; `:646–689` returns a Vite configuration string. The template defines a library entry and externalizes `@ligoj/host` (`:663–668`), while resolving the host in a sibling checkout (`:651–659`). `:726–762` and `:763–797` are parameterized plugin-index variants. They are not two concrete applications or a host composing them in this candidate. The `service.js` template (`:800–830`, with `renderServiceLink`, `toolPluginId` and `delegateFeature` from `@ligoj/host`) and generated Vitest tests (`:900–948`, with `vi.mock('@ligoj/host')`) are also only template strings; they complete the inventory of `@ligoj/host` references, alongside `:808`, `:827`, `:900` and `:935`. | context |
| Build/deploy (tool) | `ligojcli/plugins/dev.py:772–779` resolves the external plugin directory; `:808–852` selects inputs passed as arguments, found in directories or queried from the Ligoj instance, requiring `ui/package.json`; `:855–867` installs dependencies and runs `npm run build` in those directories. `ligojcli/dev_plugin.py:1674–1682` receives checkouts to deploy; `:1766–1777` uploads their JARs and requests restart of the external context. This is administrative automation, without concrete frontend composition configuration in this repository. | context |
| Source code (external environment) | `ligojcli/dev_debug.py:41–55` points by default to `~/git/ligoj` and derives `app-ui/src/main/webapp`; `:59–82` describes API, Java UI and Vite processes. `:599–620` checks whether the external webapp exists and starts `npm run dev`. API and servers for the same UI were not counted as independent frontend units or MFE composition. | context |
| Technology / Configuration / Composition | Text search through `git grep -n -i -E` across the entire commit tree for `module.?federation`, `registerApplication`, `single-spa`, `remoteEntry`, `import.?map`, `customElements[.]define`, `System[.]import` and `<iframe`: no occurrences. An additional search for `micro.?frontend` and `@ligoj/host` found the documentation note in `README.md:1944–1945` and host references in `ligojcli/dev_plugin.py` templates, including `:658`, `:668`, `:734` and `:769`; these were inspected in the generation context above. No concrete host/remote configuration or composed application was found. | absent |
| Documentation | `README.md:5–10` describes the REST client and its requirements. The microfrontends mention in `README.md:1934–1945` is a diagnostic note about commercial modules absent from the Artifactory OSS image. `README.md:2291–2322` describes files that the creation command will produce. None of these passages demonstrates an MFE instance in the candidate. | context |

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | The complete inventory contains no instantiated frontend units. UI paths are produced by a generator (`ligojcli/dev_plugin.py:204–238`), while external projects are tool parameters (`ligojcli/plugins/dev.py:808–852`), without composition configuration identifying two concrete units. |
| Q2 | No | There is no set of candidate frontend units with their own entries and builds. The actual entry is a Python command (`pyproject.toml:54–55`). Vite entry and build appear in template strings (`ligojcli/dev_plugin.py:611–643`, `:663–668`); external builds executed by the tool do not demonstrate independence of units composing an application in this commit (`ligojcli/plugins/dev.py:855–867`). |
| Q3 | No | There is no frontend host/shell/root in the candidate loading or mounting units. The CLI registers subcommands (`ligojcli/ligoj.py:28–45`); the debug command only starts processes from an external checkout (`ligojcli/dev_debug.py:41–82`, `:599–620`). |
| Q4 | No | File generation (`ligojcli/dev_plugin.py:233–238`), external plugin builds (`ligojcli/plugins/dev.py:855–867`) and JAR upload (`ligojcli/dev_plugin.py:1766–1777`) do not constitute a frontend connection in use in the candidate. The mechanism search above found no concrete composition configuration; the `@ligoj/host` reference belongs to the template (`ligojcli/dev_plugin.py:646–689`). |
| Q5 | No | Artifacts demonstrate a Python CLI (`pyproject.toml:12–18`, `:54–55`) and an external-project generator/administrator (`ligojcli/dev_plugin.py:125–145`, `:204–238`), without an observable composed instance. The judgment follows Q1–Q4. |

## Rationale

- `Non-MFE` applies: there are No answers and the `MFE-unit` exception does not apply. The analyzed object is a development support tool, not an implemented frontend architecture. Classifying this CLI does not require deciding whether external Ligoj or generated projects would be MFE.
- The plugin template does not configure a concrete unit of this candidate for an external host. The service/tool variants of `_ui_index_js` are generation alternatives, not two units composing an application. This distinguishes the case from an example/template actually composing units and a repository containing only an implemented remote.
- `frontend_units: 0` follows from the complete 78-file inventory and inspection of positive signals. It does not indicate lack of candidate access: generator code, output paths and external tools are observable, but do not constitute concrete units referenced through composition configuration.
- There is no unresolved package-, link- or iframe-composition decision: the candidate does not implement a composed application whose classification depends on those mechanisms. Externalization and integration hooks in generated text were not promoted to executed architecture.
- `repo_type: other` records a CLI/tool. `approaches`, `ui_technologies` and `build_tools` remain empty: Vue and Vite are observed in templates and automation of other projects, without candidate frontend units; setuptools/uv are Python package tools.

## Analysis notes

- **RQ1 (misleading signals):** the word microfrontends in the Artifactory diagnostic (`README.md:1944–1945`) and Vue/Vite/`@ligoj/host` excerpts in the generator (`ligojcli/dev_plugin.py:611–797`) are topical signals requiring distinction between the tool and its outputs.
- **Protocol:** proposed classification, retained in `draft`; no promotion to `final` or acquisition/mining.
