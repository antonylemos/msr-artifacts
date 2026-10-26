---
schema: 1
id: 1130037642
full_name: martinkuba/micro-frontend-test
commit: f629b5bec52818c0c0c1cdc115bcd3d712ebbb93
inputs:
  mining:
    output: data/mining/mfe-mining-001
    version: "1"
    config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 305 — martinkuba/micro-frontend-test

## Repository overview

The only `documentation` document is the English README, read in full. It presents a Grafana Faro test application with shell and main-content, composed at runtime through Webpack Module Federation (README.md:3-10). Reviews 3.4.2 through 3.4.6 are `final`, with the classification/acquisition commit. Active composition confirms the README description (3.4.5 #1); third package sidebar is outside this composition (packages/shell/webpack.config.js:36; packages/shell/src/App.tsx:7,206-214).

All `doc-*` occurrences are at README.md:1,3,7,8,10,23. Title README.md:1 is a mention without a claim and produces no row; the others are in the table, including three overlapping patterns at README.md:10 and two at README.md:7. Local execution commands/address (README.md:14-19), collector adjustment guidance (README.md:23) and telemetry test buttons (README.md:25) are operational context without additional architectural claims. No template or third-party document is listed.

Root and three package manifests, three webpack configurations and sources cited by previous reviews were read: packages/shell/src/App.tsx, packages/shell/src/index.tsx, packages/shell/src/bootstrap.tsx, packages/shell/src/remotes.d.ts, all three src/faro.ts, packages/main-content/src/MainContent.tsx and remote entries. packages/sidebar/src/Sidebar.tsx was also read. Root description (package.json:4) repeats claims 1 and 4. Faro initialization comments (packages/main-content/src/MainContent.tsx:107; packages/main-content/src/faro.ts:28; packages/sidebar/src/Sidebar.tsx:87; packages/sidebar/src/faro.ts:28) revisit claim 5 context; shell bootstrap comment only states local initialization order (packages/shell/src/bootstrap.tsx:6-7). Type declaration (packages/shell/src/remotes.d.ts:1-10) does not claim both remotes are active. Commented import/configuration lines are code rather than new documentary claims. Interface explanatory text was also compared: main-content loading description matches active consumption, but sidebar message does not match current composition (packages/main-content/src/MainContent.tsx:159-160; packages/sidebar/src/Sidebar.tsx:158).

## Claims

| # | Document | Claim | Theme | Corroboration | Evidence |
|---|---|---|---|---|---|
| 1 | README.md:3 | "A simple micro frontend application" | structure | corroborated | 3.4.5 #1; packages/shell/src/App.tsx:6,199-203 |
| 2 | README.md:7 | "Shell [...] Host application that loads remote micro frontends" | structure | corroborated | 3.4.5 #1; packages/shell/webpack.config.js:32-35; packages/shell/src/App.tsx:6,201 |
| 3 | README.md:8 | "Main Content [...] Remote micro frontend with its own Faro instance" | structure | corroborated | 3.4.5 #1; packages/main-content/webpack.config.js:31-36; packages/main-content/src/MainContent.tsx:108-110; packages/main-content/src/faro.ts:9-28 |
| 4 | README.md:10 | "Uses Webpack Module Federation to dynamically load micro frontends at runtime." | composition | corroborated | 3.4.5 #1; packages/shell/webpack.config.js:32-35; packages/shell/src/App.tsx:6,201 |
| 5 | README.md:23 | "Each micro frontend initializes its own Faro instance in `src/faro.ts`." | other | corroborated | packages/shell/src/bootstrap.tsx:3-7; packages/shell/src/faro.ts:10-32; packages/main-content/src/MainContent.tsx:108-110; packages/main-content/src/faro.ts:9-28; packages/sidebar/src/Sidebar.tsx:87-90; packages/sidebar/src/faro.ts:8-28 |
| 6 | packages/main-content/src/MainContent.tsx:159-160 | "This component is loaded from the [...] main-content [...] micro frontend via Module Federation." | composition | corroborated | 3.4.5 #1; packages/main-content/webpack.config.js:34-36; packages/shell/src/App.tsx:6,201 |
| 7 | packages/main-content/src/MainContent.tsx:160 | "It runs independently" | independence | uncorroborated | — |
| 8 | packages/main-content/src/MainContent.tsx:160 | "shares React with the shell" | composition | corroborated | packages/main-content/src/MainContent.tsx:1; packages/shell/src/App.tsx:1; packages/main-content/webpack.config.js:37-39; packages/shell/webpack.config.js:38-40 |
| 9 | packages/main-content/src/MainContent.tsx:218-219 | "Each micro frontend is built as a separate bundle" | build-deploy | corroborated | 3.4.6 #1, #2, #3; packages/main-content/webpack.config.js:8-10; packages/shell/webpack.config.js:9-11; packages/sidebar/webpack.config.js:8-10 |
| 10 | packages/shell/src/App.tsx:206 | "Sidebar hidden for now" | structure | corroborated | packages/shell/src/App.tsx:7,206-214; packages/shell/webpack.config.js:36 |
| 11 | packages/shell/src/index.tsx:1 | "Dynamic import to ensure shared dependencies are loaded first" | composition | corroborated | packages/shell/src/index.tsx:2; packages/shell/src/bootstrap.tsx:1-4,14-19; packages/shell/webpack.config.js:38-42 |
| 12 | packages/sidebar/src/Sidebar.tsx:158 | "✓ Loaded via Module Federation" | composition | contradicted | packages/shell/webpack.config.js:36; packages/shell/src/App.tsx:7,206-214 |
| 13 | packages/sidebar/webpack.config.js:40 | "Faro SDK is NOT shared - this micro frontend has its own bundle" | composition | corroborated | packages/sidebar/webpack.config.js:31-41; packages/sidebar/src/faro.ts:1-6,15-28; 3.4.6 #3 |

## Observations

**1. README.md.** Presenting the project as a micro-frontend application is supported by the host/remote chain configured and rendered in the snapshot (3.4.5 #1; packages/shell/src/App.tsx:6,199-203). Description package.json:4 repeats this characterization, adding claim 4’s technology. Faro testing purpose is project context.

**2. README.md.** Shell is host, declaring mainContent and rendering it (packages/shell/webpack.config.js:32-35; packages/shell/src/App.tsx:6,201). The generic plural does not enumerate other active remotes: the documentary list contains only shell and main-content (README.md:7-8). Sidebar is disabled in host (packages/shell/webpack.config.js:36).

**3. README.md.** Main-content exposes MainContent through its own remoteEntry and is consumed by shell (packages/main-content/webpack.config.js:31-36; packages/shell/src/App.tsx:6). It also calls initFaro on mount and keeps its instance in a local variable with isolate enabled (packages/main-content/src/MainContent.tsx:108-110; packages/main-content/src/faro.ts:9-28). Remote role does not imply autonomous UI execution, left Undetermined by review 3.4.3.

**4. README.md.** The named mechanism matches webpack ModuleFederationPlugin and dynamic host import (packages/shell/webpack.config.js:3,32-35; packages/shell/src/App.tsx:6,201). The same general property recurs in root description (package.json:4), host loading comment (packages/shell/src/App.tsx:5) and interface explanation (packages/main-content/src/MainContent.tsx:217-218); repetition generates no other rows.

**5. README.md.** Shell and main-content initialize Faro through their own paths (packages/shell/src/bootstrap.tsx:3-7; packages/main-content/src/MainContent.tsx:108-110), with local variables in their faro.ts files (packages/shell/src/faro.ts:10-17; packages/main-content/src/faro.ts:9-16). Sidebar contains the same pattern although its component is not mounted in host (packages/sidebar/src/Sidebar.tsx:87-90; packages/sidebar/src/faro.ts:8-15; packages/shell/src/App.tsx:206-214). The claim holds for active composition; the third package only retains the implementation. Sharing the SDK as singleton does not mean sharing the created instance: main-content uses isolate: true (packages/main-content/src/faro.ts:28).

**6. packages/main-content/src/MainContent.tsx.** The sentence specifically identifies the displayed component’s origin: module ./MainContent points to this source and is imported/rendered by shell (packages/main-content/webpack.config.js:34-36; packages/shell/src/App.tsx:6,201). It is verifiable beyond claim 4’s general mechanism mention.

**7. packages/main-content/src/MainContent.tsx.** Execution independence is not demonstrated. Package entry only reexports the component (packages/main-content/src/index.ts:1), while observed mounting occurs in shell (packages/shell/src/bootstrap.tsx:14-19; packages/shell/src/App.tsx:201). Own build/server (packages/main-content/package.json:6-7) do not prove an autonomous UI. As in review 3.4.3, absence of an entry mounting this UI leaves the property unconfirmed, without demonstrating execution elsewhere would be impossible.

**8. packages/main-content/src/MainContent.tsx.** React is actually used on both sides (packages/main-content/src/MainContent.tsx:1; packages/shell/src/App.tsx:1) and declared singleton in both federated configurations (packages/main-content/webpack.config.js:37-39; packages/shell/webpack.config.js:38-40). The later generalization about common dependencies, exemplified by React (packages/main-content/src/MainContent.tsx:219), repeats this property. Avoiding duplication is the configuration’s stated purpose, without measurement of executed bundles.

**9. packages/main-content/src/MainContent.tsx.** Each package has its own configuration, entry and dist directory (packages/main-content/webpack.config.js:8-10; packages/shell/webpack.config.js:9-11; packages/sidebar/webpack.config.js:8-10), matching three separate builds in 3.4.6. The sentence does not claim independent deployment.

**10. packages/shell/src/App.tsx.** The comment describes temporary sidebar removal from the interface. The entire mounting block is commented, as are import and remote declaration (packages/shell/src/App.tsx:7,206-214; packages/shell/webpack.config.js:36). Thus it matches snapshot state.

**11. packages/shell/src/index.tsx.** The comment describes the asynchronous boundary before bootstrap: entry performs import('./bootstrap'), and bootstrap imports React, React DOM and App before mounting (packages/shell/src/index.tsx:2; packages/shell/src/bootstrap.tsx:1-4,14-19). Shared dependencies are declared in host (packages/shell/webpack.config.js:38-42). Corroboration is static, without executing loading.

**12. packages/sidebar/src/Sidebar.tsx.** The status message claims loading absent from current composition: shell comments the federated reference, import and mounting (packages/shell/webpack.config.js:36; packages/shell/src/App.tsx:7,206-214). Sidebar has exposure configuration (packages/sidebar/webpack.config.js:31-36), but that does not confirm the message that it has already loaded. The contradiction is between interface text and snapshot, without changing previous reviews.

**13. packages/sidebar/webpack.config.js.** The comment distinguishes sidebar SDK packaging. Package imports Faro directly (packages/sidebar/src/faro.ts:1-6), but its shared contains only React and React DOM (packages/sidebar/webpack.config.js:37-41). This supports a separate SDK bundle, contrasted with shared shell/main-content configuration (packages/shell/webpack.config.js:41; packages/main-content/webpack.config.js:40), per 3.4.6 #3.

## Summary

Claims: 13 (corroborated: 11, partial: 0, contradicted: 1, uncorroborated: 1). Themes: (structure: 4, composition: 6, build-deploy: 1, independence: 1, other: 1).
