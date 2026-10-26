---
schema: 1
id: 1308515217
full_name: akaliwod/console-plugin-template
url: https://github.com/akaliwod/console-plugin-template
commit: cbbc152fd696da6fb47d75850d436c12f3976f1f
classification: Non-MFE
checklist: { q1: no, q2: yes, q3: undetermined, q4: undetermined, q5: no }
repo_type: template
approaches: []
ui_technologies: [react]
build_tools: [rspack]
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 258 — akaliwod/console-plugin-template

## Context

- **Repository type:** template (copy generated from official template `openshift/console-plugin-template`).
- **Classification:** Non-MFE through Q5, under the platform plugin rule from final 037.

The repository is the minimal template for an OpenShift Console dynamic plugin: an example page that the platform console loads at runtime through Module Federation (`README.md:1–11`). `package.json` points to the official repository (`package.json:8–11`), `OWNERS` lists console team approvers (`OWNERS:1–10`) and `AGENTS.md:1–8` describes “a template repository… meant to be used via GitHub's ‘Use this template’ feature”. The only commit has committer `GitHub` and message “Initial commit”. The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:259` records rank 258, ID 1308515217, status `cloned`, branch `main` and the front matter commit, which is the HEAD of the clone and of `origin/main`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. There was no installation, build, execution or network access.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:259` records strategy `technology` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID appears in `data/discovery/mfe-round-001/candidates.csv:33996` (`technology`, `unknown`) and `data/discovery/mfe-round-002/candidates.csv:34003` (`technology`, `pass`).

A `sqlite3 -readonly` query against tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns one hit per round, from endpoint `repositories` and with an empty `path`:

| Query (`q`) | Subquery | Effective query | Collection 001 / 002 (UTC) |
|---|---|---|---|
| `technology-module-federation-repositories`: `"module federation" in:name,description,readme` | `technology-module-federation-repositories#created:2026-07` | `"module federation" in:name,description,readme pushed:>=2025-04-01 created:2026-07-01..2026-07-31` | 2026-10-07T23:29:25.295Z / 2026-10-08T16:19:04.667Z |

Hit metadata (identical in both rounds): null description, no topics, language TypeScript, Apache-2.0 license, `fork: false`, size 1199, created at 2026-07-22T07:24:17Z, pushed at 2026-07-22T07:24:22Z.

Without a description, the match comes from the README: “webpack module federation” in `README.md:9` (“They are based on [webpack module federation](…)”).

The README exists only in the single commit (the SHA, 2026-07-22T09:24:21+02:00, that is, 07:24:21Z), before the October 2026 collections. The README at the SHA does not postdate the searches.

Official template `openshift/console-plugin-template` also appears in the rounds (`data/discovery/mfe-round-002/candidates.csv:3400`), as do other generated instances (for example, `:12557`, `:20501`, `:31095`). Only this one is in `sample.csv`; the others were not inspected.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 66 entries, comprising 55 regular files `100644`, 10 executables `100755` (shell and i18n scripts, `.devcontainer/init.sh`, the Yarn release in `.yarn/releases/`) and 1 symlink `120000` (`CLAUDE.md` → `AGENTS.md`); zero gitlinks. A single project: `package.json`, `rspack.config.ts`, `console-extensions.json`, `src/components/ExamplePage.tsx`, tests, Helm chart and Dockerfile. | contrary |
| Configuration (remote) | `rspack.config.ts:3`, `:82`: `ConsoleRemotePlugin` from the console SDK; `:10–11`: “No regular entry points needed. All plugin related scripts are generated via ConsoleRemotePlugin.” `package.json:82–93`: `consolePlugin` with `exposedModules: { ExamplePage: "./components/ExamplePage" }` and dependency `@console/pluginAPI`. | moderate |
| Configuration (platform registration) | `console-extensions.json:2–19`: extensions `console.page/route` (`/example` → `$codeRef: ExamplePage`) and `console.navigation/href` in the Home section. `charts/openshift-console-plugin/templates/consoleplugin.yaml:1–17`: `ConsolePlugin` resource registering the plugin service in the console. `charts/openshift-console-plugin/templates/patch-consoles-job.yaml:38`: job adding the plugin to `consoles.operator.openshift.io`. | moderate |
| Source code | `src/components/ExamplePage.tsx:9–41`: example page (“Hello, plugin!”) with SDK and PatternFly components; text instructs replacing metadata after cloning the template (`:33–36`). | moderate |
| Composition | The host is OpenShift Console, a platform external to the repository (`README.md:6–11`); no own host. `start-console.sh` starts the console image for local development. | context |
| Build/deploy | `package.json:14`: build with Rspack; `Dockerfile:1–17`: build and nginx image serving `dist`; Helm chart with its own `deployment.yaml` and `service.yaml`. Independent plugin deployment. | moderate |
| Source code (boundaries) | Active search for `../` in `src`, `integration-tests` and `__mocks__`: only internal integration test imports (`integration-tests/tests/auth.setup.ts:2`; `integration-tests/tests/example-page.spec.ts:3`) and `integration-tests/tsconfig.json:2`. Single unit; no other to cross. | context |
| Technology | `package.json:26–27`: `@openshift-console/dynamic-plugin-sdk` and `@openshift-console/dynamic-plugin-sdk-webpack`. Searching for `remotes`, `exposes`, `registerApplication`, `loadRemote`, `<iframe` and `customElements` (except Yarn) finds no federation configuration beyond the SDK plugin. | weak |

## Authorship and history

Non-shallow clone. There is 1 commit, both SHA and root (1 across all refs), without merges: author `Arkadiusz Kaliwoda <akaliwod@cisco.com>`, committer `GitHub <noreply@github.com>`, 2026-07-22T09:24:21+02:00, “Initial commit”. This is the pattern of a repository created through “Use this template” (`README.md:25–26`): content is the official template and there is no subsequent owner change. The recorded identity does not demonstrate code authorship; `package.json:8–11` and `OWNERS:1–10` point to the OpenShift project. `git rev-list --objects $SHA --missing=print` lists no missing objects.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | A single frontend unit (the plugin); configuration exposes only `ExamplePage` (`package.json:87–89`) and references no other units. |
| Q2 | Yes (for the unit) | Own build with `ConsoleRemotePlugin` (`rspack.config.ts:82`), own image and Helm chart (`Dockerfile:1–17`). |
| Q3 | Undetermined | The host (OpenShift Console) is not in the repository. |
| Q4 | Undetermined | Remote configured and registered in the platform (`console-extensions.json`; `consoleplugin.yaml`); the consumer is the console. |
| Q5 | No (override) | Module Federation as a third-party platform extension mechanism, as in 010, 035 and 037. |

## Q5 justification

Under the literal checklist, vector No/Yes/Undetermined/Undetermined would indicate the MFE-unit exception: a unit prepared for composition by an unobservable external host. Final 037 records the researchers’ decision to classify as Non-MFE units whose only host is a third-party platform using MF as an extension mechanism, regardless of whether configuration is authored. Here:
- the host is OpenShift Console (`README.md:6–11`);
- the mechanism is the official dynamic plugin SDK (`rspack.config.ts:3`, `:82`; `package.json:26–27`, `:82–93`);
- registration uses platform resources (`console-extensions.json:2–19`; `consoleplugin.yaml:1–17`).

Additionally, content is the official template generated without modifications (single “Initial commit” with committer `GitHub`).

## Rationale

- `Non-MFE` through Q5, under the platform plugin rule from final 037 (cases 010, 022, 035 and 037).
- The plugin extends a platform administration UI, not an application decomposed by the author.
- It is also an unmodified copy of a third-party template (`openshift/console-plugin-template`, `package.json:8–11`). Treatment of third-party redistributions remains open in 074/080/102/122, but does not change the class here, which already follows from rule 037.
- `repo_type: template`, `frontend_units: 1`, `single-unit`, `ui_technologies: [react]`, `build_tools: [rspack]`. `approaches: []` follows 037, Non-MFE with an empty approach; the mechanism is recorded in the notes.
- There is no open decision.

## Analysis notes

- **Checklist (platform plugin rule):** new case after 010, 022, 035 and 037. The platform is OpenShift Console, with dynamic plugins over Module Federation (`ConsoleRemotePlugin`, `exposedModules`, `console-extensions.json`, CRD `ConsolePlugin`).
- **RQ2:** OpenShift Console dynamic plugins as an MF variant encapsulated by a platform SDK: the developer declares `exposedModules` and extensions in JSON, and the SDK generates the remote.
- **RQ1 (misleading signals):** official template README with “webpack module federation” (`README.md:9`) is replicated in each repository generated from the template.
- **Protocol (families/duplicates):** the official template and at least three other generated instances appear in the rounds (`data/discovery/mfe-round-002/candidates.csv:3400`, `:12557`, `:20501`, `:31095`; 39 lines contain `console-plugin`). Repositories generated from templates with `fork: false` pass filtering as distinct candidates.
