---
schema: 1
id: 990161554
full_name: jacome7/Mythoria-webapp
url: https://github.com/jacome7/Mythoria-webapp
commit: 0bab42c5b9fda635cf2c65499371db2447294585
classification: Non-MFE
checklist: { q1: no, q2: undetermined, q3: undetermined, q4: undetermined, q5: no }
repo_type: production
approaches: []
ui_technologies: [react, next]
build_tools: [webpack]
frontend_units: 2
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-22
---

# 082 — jacome7/Mythoria-webapp

## Context

Next.js/React application for story creation and reading, commerce and a user library. Besides the web interface, the candidate implements three own MCP Apps HTML resources for an external conversational client. The screening point is to distinguish these resources, prepared for message-based integration, from an application decomposed into MFE units; classifying the entire repository as a Next monolith while ignoring this contract is insufficient.

Clone checked at `data/samples/mfe-sample-001/repos/jacome7__Mythoria-webapp/`. Rank, ID and SHA match the `cloned` row in `data/samples/mfe-sample-001/clones.csv:83`. `git rev-parse HEAD` returned the front matter SHA, and `git cat-file -t` confirmed a commit. Complete inventory of 3.669 files through `git ls-tree -r -z --name-only`; 1.051 are in `src/` and 702 in `package/`. The analysis used sources/configurations at the pinned SHA through `git show` and `git grep`; it did not run the application, builds, tests, services or external hosts.

**Branches, for the record only:** `master`, `origin/master` and `origin/HEAD` point to the evaluated SHA. Other available references: `origin/main` → `6d9b6d13b51cd6faba91c47633183a87f2598023`; `origin/design-refactor` → `69ca09d3921d75671df245b96af8870c149f50bb`; `origin/codex/organize-and-cleanup-folder-structure` → `a6b5489bb60b874d5a37b4285830d4164b6cfb63`; `origin/codex/stripe-payments-refactor` → `f4c7527fcea3f6039518eac01ecd18316d640b4b`; `origin/codex/unify-homepage-hero-cta-to-sign-up` → `f676e7ceb491a79fbe2b6ccdef45df7704f108a2`. They were recorded through `git for-each-ref`; no content from these other commits supports the classification.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Configuration / Build/deploy (web) | `package.json:5–8` starts Next with Turbopack in development and defines a Next build; `:88–94` declares Next/React. `next.config.ts:25–38` defines standalone output and external server libraries; `:96–112` configures Webpack and applies PWA/i18n wrappers. `Dockerfile:49–61` installs and builds this application. There is a main web target intended for production, without configured federation hosts/remotes. | context |
| Source code / Structure (web) | `src/app/layout.tsx:51–81` organizes providers and renders `children`; `src/app/[locale]/layout.tsx:2–13` imports local navigation, content and consent components. These are parts of the same App Router application, not independent entries. `README.md:27–31` describes this organization and the APIs. | contrary |
| Source code / Configuration (own UI resources) | `src/lib/mcp/ui-widgets.ts:1–7` defines MIME `text/html;profile=mcp-app` and three URIs: creation, library and reading. `:22–29`, `:172–195` produces complete HTML documents with their own script and state; `:620–653` instantiates the three surfaces through the same `buildWidgetHtml(surface)`. These are authored sources actually connected to the server, not arbitrary component generation output or merely a teaching example. | moderate |
| Source code / Configuration (resource publishing) | `src/lib/mcp/server.ts:385–387` calls `registerUiResources` when creating the server. `:447–482` registers each template by URI/MIME and returns its HTML and UI/CSP metadata. `src/app/api/mcp/route.ts:1–11` connects the HTTP methods to the MCP handler. There is operational preparation of UI resources, beyond the presence of an SDK. | moderate |
| Configuration (tool and UI binding) | `src/lib/mcp/server.ts:195–238` associates creation/library tools with URIs; `:525–533` includes `_meta.ui.resourceUri` and `openai/outputTemplate` in descriptors; `:598–619` includes the bindings in results. The association makes explicit how an external consumer should select the corresponding interface. | moderate |
| Source code (message contract) | `src/lib/mcp/ui-widgets.ts:195–203` initializes the surface with `window.openai` when available; `:283–305` sends JSON-RPC to the parent through `window.parent.postMessage` and tracks pending requests; `:317–335` defines messages/context for the host. `:581–608` accepts messages only from the parent, resolves responses by ID and renders after `ui/notifications/tool-input`/`tool-result`. There is an explicit contract, not just an isolated postMessage occurrence. | moderate |
| Source code (UI responsibilities) | `src/lib/mcp/ui-widgets.ts:348–375` renders creation/checkpoints; `:378–401` renders library/selection; `:404–427` renders reading and navigation. `:511–559` connects actions to tool calls with story IDs. These interfaces are specific to the Mythoria domain. All three share source and generator; independent builds/deployments among them are not demonstrated. | moderate |
| Documentation / Composition (external host) | `docs/mcp.md:37–47` instructs configuring the endpoint in ChatGPT; `:51–67` describes the three resources and compatible metadata. The conversational host is not in the repository. The server publishes resources for this consumer, but the local Next interface was not observed mounting the widgets. Connection documentation does not establish execution of composition. | ambiguous |
| Source code (existing tests) | `tests/playwright/mcp.spec.ts:227–268` declares checks for `resources/list` and `resources/read`, URI/MIME and HTML content. The tests corroborate the intended delivery contract, but were not run and this excerpt does not implement/test a visual host mounting the interfaces. | context |
| Structure (third parties) | `package/package.json:2–10` identifies the copy of `@modelcontextprotocol/ext-apps` 1.0.1 and its origin; `package/README.md:1–5`, `:14–20` describes the SDK and UIs in conversational clients. The 702 files in this directory are not Mythoria’s own frontend targets. Manifests in `.agents/skills/` also belong to auxiliary tools, not the story application. | context |
| Technology / Configuration / Source code / Composition | Searches in `src/`, `docs/`, `scripts/`, `next.config.ts` and `package.json` for `ModuleFederationPlugin`, `single-spa`, `registerApplication`, `registerMicroApps`, `remoteEntry`, `qiankun`, `wujie`, `importmap` and `import-map` had no occurrences. Another search in `src/`, `docs/`, `tests/`, `next.config.ts` and `package.json` for `@modelcontextprotocol/ext-apps`, `AppBridge`, `app-bridge`, `ui/initialize`, `<iframe` and `srcDoc` also had no occurrences. The scope excludes the SDK copy in `package/` and the skills. The only own `window.parent.postMessage` call found is in the contract in `src/lib/mcp/ui-widgets.ts:283–295`. No local host mounting the UIs was found. | absent |

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | There are the Next target and three own HTML resources (`package.json:5–8`; `src/lib/mcp/ui-widgets.ts:3–7`, `:620–653`), but composition among these targets is not observed in the local interface. The resources are offered to an external host whose loader is not in the snapshot (`docs/mcp.md:37–67`). Precedent 028 applies: coexistence of targets without composition among them is insufficient for Q1. |
| Q2 | Undetermined | The Next application has its own build; widgets have their own URIs/documents, but share the generator and delivery in the same server (`src/lib/mcp/ui-widgets.ts:22–29`, `:620–653`; `src/lib/mcp/server.ts:447–482`). There are no separate builds for the three widgets or sufficient evidence to treat them as three relatively independent units, or as one remote unit with three surfaces. |
| Q3 | Undetermined | Resource publishing and bindings are implemented (`src/lib/mcp/server.ts:447–482`, `:525–533`), but the consuming host that mounts them is external (`docs/mcp.md:37–47`). Local Next was not identified as the shell for these resources. Actual participation in a composite application cannot be confirmed from this snapshot. |
| Q4 | Undetermined | There is an explicit integration contract through metadata and JSON-RPC/postMessage (`src/lib/mcp/server.ts:525–533`; `src/lib/mcp/ui-widgets.ts:283–305`, `:581–608`), beyond mere permission for embedding. Host-side execution of the mechanism is not observable, and characterization of MCP Apps extensions as MFE units requires review. |
| Q5 | No | An MFE instance is not demonstrated in the repository: the Next site is conventional, and the additional UIs are extension resources for an external platform, without an observed host (`src/app/layout.tsx:51–81`; `docs/mcp.md:37–67`; `src/lib/mcp/server.ts:447–482`). The platform plugin rule decided by the researchers applies (`037:60–62`; cases 010, 022, 035 and 037): units whose only host is a third-party platform with an extension mechanism are Non-MFE, recording the platform. Here the hosts are external conversational clients (ChatGPT and OpenClaw, `docs/mcp.md:31–47`) embedding the UIs through the MCP Apps extension mechanism. The `MFE-unit` boundary in `051:56` requires a host that is the author’s own application, which is not the case. |

## Rationale

- `Non-MFE` is proposed. Q1 is No and Q2–Q4 remain Undetermined because the host is outside the snapshot, the same pattern as final precedents 035 and 037 (Q1 No, Q3/Q4 Undetermined, Q5 No). Q2 is Undetermined, not Yes as in 035/037, because the three surfaces do not have their own entry or build. Under the platform plugin rule (`037:60–62`), the class is Non-MFE; recorded platforms: ChatGPT (OpenAI Apps) and OpenClaw, through MCP Apps (`docs/mcp.md:31–47`).
- `MFE-unit` does not apply: there is explicit preparation for an external consumer (JSON-RPC contract through `postMessage`), but the host is a third-party platform, and `051:56` limits `MFE-unit` to hosts belonging to the author. If the researchers consider conversational clients with MCP Apps outside the platform plugin rule, the alternative to reassess is `MFE-unit`.
- `frontend_units: 2` counts the own targets: the Next web app and the MCP Apps UI set, one unit with three views (creation, library and reading). The three surfaces come from the same `buildWidgetHtml` parameterized by `surface` (`src/lib/mcp/ui-widgets.ts:22–29`, `:620–653`) and the same server (`src/lib/mcp/server.ts:447–482`), without distinct entries or builds; in platform precedents the plugin counts as 1 unit. `unit_organization: monorepo` describes the two targets in one repository (as in 028). The vendored SDK, its examples/bundles, skills, APIs and backend services are not counted.
- `ui_technologies: [react, next]` records the main frontend. The MCP resources use their own HTML/CSS/JavaScript, without React or another framework in these documents; SDK frameworks are not attributed to them. `build_tools: [webpack]`: the `webpack:` hook in `next.config.ts:96–108` is explicit bundler configuration. The development script’s `--turbopack` flag (`package.json:6`) only selects the framework’s embedded bundler and is not recorded, the same criterion as 094.
- `approaches: []` follows the Non-MFE class under the platform rule, as in 035 and 037. This does not mean absence of integration: the observed contract is MCP Apps with HTML resources, bindings and parent messages; no slug or methodological rule was added.
- This is not the same case as generated preview content in 081: this candidate’s UIs have fixed authored code, domain actions and server-registered resources; they are rendered from templates executed as part of the implementation. The question is organization and host, not HTML being a string.

## Analysis notes

- **RQ1:** absence of federation dependencies does not end screening: UI resources and an explicit JSON-RPC contract provide evidence of preparation for an external consumer. Conversely, the SDK in `package/` is not an authored host implementation and must not inflate the count.
- **Protocol (families/templates):** searching annotations for `jacome7`, `Mythoria`, `modelcontextprotocol/ext-apps`, `MCP App UI` and `ui://mythoria` found no previously annotated shared family. Cases 031 (iframe with a contract and external shell), 035 (platform plugin) and 051 (remote widget for an external dashboard) are conceptual comparators, not evidence of lineage. Case 066 uses MCP for backend and is not equivalent to these HTML resources.
- **Protocol:** existing tests were read, not run; installation/configuration of the app in an external platform, or current integration or deployment success, is not established.
- **Platform rule:** the independent review pointed out that the case fits the platform plugin rule (`037:60–62`). The only caveat is to confirm that conversational clients with MCP Apps fall under this rule; the rule text already includes iframe as an extension mechanism. There is no open decision changing the class.
