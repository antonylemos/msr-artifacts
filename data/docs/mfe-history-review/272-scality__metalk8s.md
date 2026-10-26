---
schema: 1
id: 124905930
full_name: scality/metalk8s
commit: f19004e899c78360d3a43d5f60047b140f29c909
inputs:
  clone: data/samples/mfe-sample-001/repos/scality__metalk8s
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 272 — scality/metalk8s

## Repository overview

History up to snapshot has 12526 commits, from 2019-02-05 to 2026-10-08. First is `d77803a49` (2019-02-05, "docs: import `README.md`"). Snapshot is merge `f19004e89` (2026-10-08, "Merge
branch 'improvement/MK8S-447-kube-proxy-init-on-alpine' into q/134.0"). Frontend is a small part of this history, and points depend only on these milestones:

- `shell-ui` originates from renaming: `f28782afa` (2021-02-24, "solutions-navbar: Rename to
  shell-ui") creates `shell-ui/README.md`, `shell-ui/src/index.js` and `shell-ui/src/index.mdx`. Same day, `2d6df3d31` ("salt: Build and deploy shell-ui as part of metalk8s-ui container") creates `buildchain/buildchain/shell_ui.py` and changes `images/metalk8s-ui/Dockerfile` and image nginx.
- Shell transition to Module Federation begins in `938cc576e` (2021-05-26, "shell-ui: Module
  federation wip"), creating `shell-ui/webpack.common.js`, and continues in `eeeca883a` (2021-06-04, "shell-ui: Refactor shell-ui to module federation. This allow runtime integration with others UIs
  and sharing of the authentication context as well as the theme").
- TypeScript migration (`50c231439`, 2023-02-27, "ui: run the script to migrate to
  typescript"; `30709cb48`, 2023-02-27, "shell-ui: Fix the test") deletes `.js` and creates corresponding `.ts`/`.tsx`; with `--no-renames`, these files appear as created that day, meaning first presence with current name, rather than introduction.
- Replacement of webpack with rspack runs from `ced34bf07` (2024-06-20, "install and build with rspack") to `b71e654ee` (2024-06-28, "rm webpack from shell-ui") and `e83045616` (2024-07-03, "remove webpack
  from metalk8s-ui").
- Deploy through UI operator arrives in `70dbd925d` and `65ea4b164` (2025-08-13).
- Features inactive or without target in snapshot are recent: MCP since `baba81932` (2026-03-27), Guardian since `ddf833ad6` (2026-04-08), virtual machines tab in `556f0c84f` (2026-09-17).

Clone shows messages, dates, touched files and object identifiers. Old version contents are unavailable: `show` of old versions of `ui/src/index.ts`, `ui/src/entry.tsx`, `ui/src/index.html` and `shell-ui/README.md` fails with "bad object", and `cat-file -e` confirms absence of old `ui/src/index.ts` object. Thus several results rely only on messages and dates. A useful exception: object of `shell-ui/README.md` at `e109eb9ef` matches snapshot (`c87f897…`), and new object of `ui/src/index.ts` at `ae1de7bcc` is `e69de29…`, size 0 (`cat-file -s`).

Not raised as points: four dependencies in 3.4.2, all `Yes`; relationship 4 in 3.4.5 (`ui` → `shell-ui`), `No` because applying only outside production, rather than `Undetermined`; and `corroborated` claims in 3.4.7.

## Points

| # | Point | Origin | Question | Commits | Result |
|---|---|---|---|---|---|
| 1 | Build entry of `ui` (`ui/src/index.ts`) is empty file, and nothing in `ui/` starts it alone | 3.4.3 (ui) | active or abandoned | 50c231439 2023-02-27 ui: run the script to migrate to typescript; ae1de7bcc 2024-06-28 shell-ui: Introduce window API level to shell-ui | clarified |
| 2 | Guardian iframe and `postMessage` are disabled by `canUseGuardian: false` | 3.4.4 (shell-ui/src/guardian/GuardianDrawer.tsx:37; shell-ui/src/guardian/guardianPostMessageHooks.ts:38, :63) | active or abandoned | ddf833ad6 2026-04-08 POC mcp guardian integration; 8522c6c98 2026-04-27 Guardian drawer mode; 8b8e67415 2026-05-05 Added can use guardian feature flag; 462b577fe 2026-06-10 feat(shell-ui): source Guardian origin from config and add source suffix; 98052bf1b 2026-08-17 add new version to handle MCP tasks | clarified |
| 3 | Events, methods and element `solutions-navbar` described in shell README are inactive: language event is never dispatched and platform library is outside entry chain | 3.4.4 (shell-ui/src/navbar/lang.tsx:49; Notes); 3.4.7 #9, #11, #12 | conflicting stages | f28782afa 2021-02-24 solutions-navbar: Rename to shell-ui; 59da5f6ff 2021-04-07 shell-ui: Move bundles to sub folders; a33ef1c93 2021-04-14 shell-ui: Add k8s service; 938cc576e 2021-05-26 shell-ui: Module federation wip; eeeca883a 2021-06-04 shell-ui: Refactor shell-ui to module federation. This allow runtime integration with others UIs and sharing of the authentication context as well as the theme; 30709cb48 2023-02-27 shell-ui: Fix the test; e109eb9ef 2023-06-13 ARTESCA-8593 - alert-configuration v1 | clarified |
| 4 | Instance name adapter is not loaded without `canChangeInstanceName`, which is `false` in snapshot configurations | 3.4.4 (shell-ui/src/navbar/InstanceName.tsx:161) | active or abandoned | 26151e240 2024-02-15 shell-ui: Introduce the instanceName feature to help distinguishing instances; 1372479a8 2024-09-16 Fix oidc config; 85bcf59be 2026-05-06 improvement(ARTESCA-17495): hide deployment-name pill on 403 from adapter; 4684c2a43 2026-08-11 fix(shell-ui): stop headless federated components rendering "Loading..." | clarified |
| 5 | The `MCPRegistrar` imports module `mcpTools` of each UI, and no snapshot UI configuration declares it | 3.4.4 (shell-ui/src/mcp/MCPRegistrar.tsx:201); 3.4.5 #2 | active or abandoned | 627a3559f 2025-09-09 fix e2e tests; baba81932 2026-03-27 feat(MK8S-196): add WebMCP protocol support to shell-ui; 07b8b7053 2026-10-06 ARTESCA-18316: make WebMCP tool invocations visible in DevTools | clarified |
| 6 | The `ui` loads UI of kind `vm-management-ui` declared by no snapshot artifact | 3.4.4 (ui/src/containers/Layout.tsx:251); 3.4.5 #3 | active or abandoned | 556f0c84f 2026-09-17 feat(ui): add a Virtual Machines tab to the Platform navigation | clarified |
| 7 | Shell has two deploy forms in snapshot: own `shell-ui` image and copy at `/shell` in image `metalk8s-ui` | 3.4.6 #1 | conflicting stages | 2d6df3d31 2021-02-24 salt: Build and deploy shell-ui as part of metalk8s-ui container; 70dbd925d 2025-08-13 add shell-ui standlalone deployment; 65ea4b164 2025-08-13 update metalk8s-ui deployment; 009ff435b 2025-10-13 remove legacy resources after install; 410823fd7 2025-12-16 remove legacy comments in nginx.conf; da28d2908 2026-07-16 chore(deps): update nginx docker tag to v1.31.3 | clarified |
| 8 | Shell README says `@scality/core-ui` is `singleton` in Module Federation, and no configuration declares it that way | 3.4.7 #7 | conflicting stages | e109eb9ef 2023-06-13 ARTESCA-8593 - alert-configuration v1; 5640809b6 2025-12-18 put back core-ui singleton in rspack configs; 3d610e75a 2026-01-14 remove singleton for core-ui in rspack config | clarified |
| 9 | The `ui` README describes `npm run start` launching shell in Docker and a missing `webpack.dev.js` | 3.4.7 #15, #16 | conflicting stages | e2fae4bcf 2023-06-28 add comments; e83045616 2024-07-03 remove webpack from metalk8s-ui; 136cf7844 2026-01-29 rework dev environment for shell-ui and metalk8s-ui | clarified |

## Observations

**1. `ui` build entry is empty file.** The `ui/src/index.ts` appears in `50c231439` (2023-02-27), TypeScript migration, deleting `ui/src/index.js` and creating `ui/src/FederableApp.tsx` in same commit. It changes only once more, in `ae1de7bcc` (2024-06-28, "shell-ui:
Introduce window API level to shell-ui"): object moves from `6fb29c5…` to `e69de29…`, with 0 bytes. Same commit deletes `ui/src/entry.tsx` and `ui/src/index.html` (present since `50c231439` and `6e4a246fb`, 2021-03-17, "ui: Switch bundling from create react app to webpack 5"), creates generated types `ui/@mf-types/shell/` and changes `ui/rspack.config.ts`, `ui/src/FederableApp.tsx` and `ui` providers. Old versions of these three files are unavailable, so history does not show whether they started `ui` alone. Conclusion limited to these files: empty entry was not created empty, but is remnant of entry with contents emptied alongside removal of HTML and `entry.tsx` of `ui`. The `Undetermined` in 3.4.3 remains: history explains empty entry, but does not change what snapshot supports building.

**2. Guardian is disabled.** Directory `shell-ui/src/guardian/` appears in `ddf833ad6` (2026-04-08, "POC mcp guardian integration"), with `GuardianBubble.tsx` and `mockMcpTools.ts`. The `GuardianDrawer.tsx` and `GuardianContext.tsx` come from `8522c6c98` (2026-04-27, "Guardian drawer
mode"), and `guardianPostMessageHooks.ts` from `20dbc9918` (2026-04-20). Flag appears in `8b8e67415` (2026-05-05, "Added can use guardian feature flag"), changing `shell-ui/public/config.json`, `shell-ui/src/FederatedApp.tsx` and `ShellConfigProvider.tsx`; `462b577fe` (2026-06-10) starts reading Guardian origin from configuration. Guardian files change up to `98052bf1b` (2026-08-17, "add new version to handle MCP tasks"). Old `config.json` version contents are unavailable, so history does not show whether flag was ever enabled in this file. Conclusion limited to these files: Guardian is a recent feature placed behind a flag one month after proof of concept and changed until August 2026; disabled in snapshot, but not abandoned code.

**3. Legacy navbar `solutions-navbar`.** The `shell-ui/README.md` is created in rename `f28782afa` (2021-02-24, "solutions-navbar: Rename to shell-ui") and changes afterward in `c78254986` (2021-04-07) and `e109eb9ef` (2023-06-13), whose object matches snapshot. Navbar event and library files (`shell-ui/src/navbar/events.js`, `library.js`) come from `59da5f6ff` (2021-04-07, "shell-ui: Move bundles to sub folders"), and platform library with k8s service (`shell-ui/src/platform/library.js`) from `a33ef1c93` (2021-04-14, "shell-ui: Add k8s service"). All predate shell transition to Module Federation, beginning in `938cc576e` (2021-05-26), whose message in `eeeca883a` (2021-06-04) announces runtime integration with other UIs and authentication and theme sharing. In `30709cb48` (2023-02-27), these files become `.ts`; afterward, `events.ts`, `navbar/library.ts`, `platform/library.ts` and `platform/service/k8s.ts` change only in general commits (`6a9bdcdb6`, 2024-02-07, variable naming rule; `2d9eed306`, 2026-03-03, biome formatting; `b4f2b86db`, 2023-02-27, flow removal). The `lang.tsx` changes in two more commits (`e109eb9ef`; `62c890a52`, 2024-11-20, React 18 migration), whose contents are unavailable. History does not show whether `onLanguageChanged` was ever passed. Conclusion: README "Legacy" section and event and library files belong to stage when shell was navbar embedded in UIs (February to April 2021), before shell as Module Federation host; since TypeScript migration they receive only general changes.

**4. Instance name adapter.** The `InstanceName.tsx` is created in `26151e240` (2024-02-15, "shell-ui: Introduce the instanceName feature to help distinguishing instances"), changing both shell Salt configurations where `canChangeInstanceName` is now `false` (`metalk8s-shell-ui-config.yaml.j2` and `workloadplane-shell-ui-config.yaml.j2`) in same commit. Workload plane configuration does not change afterward; control plane configuration changes only in `1372479a8` (2024-09-16, "Fix oidc config"). Component continues changing until `4684c2a43` (2026-08-11), with messages such as "hide
deployment-name pill on 403 from adapter" (`85bcf59be`, 2026-05-06). Old configuration version contents are unavailable, so history does not show whether flag was ever `true` in any. Conclusion limited to these files: component is maintained from 2024 to August 2026, rather than abandoned remnant; repository configurations disabling it are from same introduction commit or OIDC correction, and history does not say where it is enabled.

**5. Module `mcpTools`.** The `MCPRegistrar.tsx` is created in `baba81932` (2026-03-27, "feat(MK8S-196):
add WebMCP protocol support to shell-ui"). Message announces micro-apps can now declare tools module in their WebFinger configuration (`mcpTools`) and shell handles registration. File changes up to `07b8b7053` (2026-10-06), two days before snapshot. Configuration of only repository UI, `ui/public/.well-known/micro-app-configuration`, last changed in `627a3559f` (2025-09-09, "fix e2e tests"), before `MCPRegistrar` existed. Conclusion limited to this file: since mechanism introduction, `ui` configuration never changed, so never declared `mcpTools`; mechanism is recent and maintained, and history does not say which UI outside repository declares it.

**6. UI `vm-management-ui`.** Loading comes from `556f0c84f` (2026-09-17, "feat(ui): add a Virtual
Machines tab to the Platform navigation"), changing `ui/src/containers/Layout.tsx` and translations. Message announces `ui` searches for VM Management micro-app among shell-provided views, running in own Module Federation container, and "The micro-app is only deployed on
ARTESCA+, so its presence is the gate: elsewhere no tab is shown and the route falls through to the
404 page." Conclusion from message: target is another product micro-app, deployed outside MetalK8s, and relationship is recent and intentional, rather than remnant. History does not show micro-app code or location, so `Undetermined` in 3.4.5 #3 remains.

**7. Two shell deploy forms.** Shell copy in image `metalk8s-ui` comes from `2d6df3d31` (2021-02-24, "salt: Build and deploy shell-ui as part of metalk8s-ui container"), changing `images/metalk8s-ui/Dockerfile` and image nginx and creating `buildchain/buildchain/shell_ui.py`. Afterward image Dockerfile changes only in `da28d2908` (2026-07-16, nginx version). Separate deploy arrives in `70dbd925d` (2025-08-13, "add shell-ui standlalone deployment"), creating `salt/metalk8s/addons/shell-ui/deployed/`, and `65ea4b164` (2025-08-13, "update metalk8s-ui
deployment") creates `ui-operator-cr.sls` of `ui` and deletes `ui.sls.in`, `ui-configuration.sls` and `deployed-ui-apps.yaml.j2.in`. Next come `009ff435b` (2025-10-13, "remove legacy resources after
install") and `410823fd7` (2025-12-16, "remove legacy comments in nginx.conf"), changing image `metalk8s-ui` nginx without removing `/shell`. Conclusion limited to these files: both forms are from different stages, copy in `metalk8s-ui` from 2021 and own image with `ScalityUI` from August 2025, and former was not removed. History does not show whether `/shell` in image `metalk8s-ui` is still accessed, so `Undetermined` in 3.4.6 remains.

**8. `@scality/core-ui` singleton.** The `shell-ui/README.md` does not change since `e109eb9ef` (2023-06-13; same object as snapshot). In configurations, message of `5640809b6` (2025-12-18, "put back
core-ui singleton in rspack configs") announces return of `singleton` in both `rspack.config.ts` files, and message of `3d610e75a` (2026-01-14, "remove singleton for core-ui in rspack config") announces removal, also in both. Only messages are available: old version contents were not inspected. Conclusion: README describes configuration that, according to messages, existed and was removed in January 2026, after last README change; contradiction concerns different stages.

**9. Development flow in `ui` README.** The `ui/README.md` last changes in `e2fae4bcf` (2023-06-28, "add comments"). Afterward, `e83045616` (2024-07-03, "remove webpack from
metalk8s-ui") deletes `ui/webpack.dev.js`, `webpack.common.js` and `webpack.prod.js` and changes `ui/package.json`, and `136cf7844` (2026-01-29, "rework dev environment for shell-ui and metalk8s-ui") changes both `rspack.config.ts` files and creates `shell-ui/public/config.json` and `deployed-ui-apps.json`. Old `ui/package.json` version contents are unavailable, so history does not show whether `start` ever launched shell in Docker. Conclusion limited to these files: README predates removal of cited `webpack.dev.js` and both development environment reorganizations; contradicted parts are from an earlier stage.

## Commands

```
docs/mfe-history-review/tools/hist.sh scality__metalk8s rev-list --count f19004e899c78360d3a43d5f60047b140f29c909
docs/mfe-history-review/tools/hist.sh scality__metalk8s log --reverse --format='%h %ad %s' --date=short f19004e899c78360d3a43d5f60047b140f29c909
docs/mfe-history-review/tools/hist.sh scality__metalk8s log --format='%h %ad %s' --date=short f19004e899c78360d3a43d5f60047b140f29c909
docs/mfe-history-review/tools/hist.sh scality__metalk8s log --format='%h %ad %s' --date=short --name-status f19004e899c78360d3a43d5f60047b140f29c909 -- ui/src/index.ts
docs/mfe-history-review/tools/hist.sh scality__metalk8s ls-tree ae1de7bcc -- ui/src/index.ts
docs/mfe-history-review/tools/hist.sh scality__metalk8s ls-tree 50c231439 -- ui/src/index.ts
docs/mfe-history-review/tools/hist.sh scality__metalk8s show 50c231439:ui/src/index.ts   # failed: bad object
docs/mfe-history-review/tools/hist.sh scality__metalk8s show --name-status --format='%h %ad %s%n%b' --date=short ae1de7bcc   # failed: missing object (could not fetch e553108…)
docs/mfe-history-review/tools/hist.sh scality__metalk8s show --name-status --no-renames --format='%h %ad %s%n%b' --date=short ae1de7bcc
docs/mfe-history-review/tools/hist.sh scality__metalk8s show --name-status --no-renames --format='%h %ad %s' --date=short ae1de7bcc
docs/mfe-history-review/tools/hist.sh scality__metalk8s log --format='%h %ad %s' --date=short --name-status --no-renames f19004e899c78360d3a43d5f60047b140f29c909 -- ui/rspack.config.ts ui/webpack.config.js ui/webpack.common.js ui/webpack.dev.js ui/webpack.prod.js ui/public/index.html ui/src/FederableApp.tsx ui/src/index.js
docs/mfe-history-review/tools/hist.sh scality__metalk8s log --format='%h %p %ad %s' --date=short ae1de7bcc
docs/mfe-history-review/tools/hist.sh scality__metalk8s cat-file -s e69de29bb2d1d6434b8b29ae775ad8c2e48c5391
docs/mfe-history-review/tools/hist.sh scality__metalk8s log --format='%h %ad %s' --date=short --name-status --no-renames f19004e899c78360d3a43d5f60047b140f29c909 -- ui/README.md
docs/mfe-history-review/tools/hist.sh scality__metalk8s log --format='%h %ad %s' --date=short f19004e899c78360d3a43d5f60047b140f29c909 -- ui/package.json
docs/mfe-history-review/tools/hist.sh scality__metalk8s log --format='%h %ad %s' --date=short --name-status --no-renames f19004e899c78360d3a43d5f60047b140f29c909 -- shell-ui/README.md
docs/mfe-history-review/tools/hist.sh scality__metalk8s log --format='%h %ad %s' --date=short --name-status --no-renames f19004e899c78360d3a43d5f60047b140f29c909 -- shell-ui/rspack.config.ts
docs/mfe-history-review/tools/hist.sh scality__metalk8s log --format='%h %ad %s' --date=short --name-status --no-renames f19004e899c78360d3a43d5f60047b140f29c909 -- shell-ui/src/platform/library.ts
docs/mfe-history-review/tools/hist.sh scality__metalk8s log --format='%h %ad %s' --date=short --name-status --no-renames f19004e899c78360d3a43d5f60047b140f29c909 -- shell-ui/src/platform/service/k8s.ts
docs/mfe-history-review/tools/hist.sh scality__metalk8s log --format='%h %ad %s' --date=short --name-status --no-renames f19004e899c78360d3a43d5f60047b140f29c909 -- shell-ui/src/navbar/library.ts
docs/mfe-history-review/tools/hist.sh scality__metalk8s log --format='%h %ad %s' --date=short --name-status --no-renames f19004e899c78360d3a43d5f60047b140f29c909 -- shell-ui/src/navbar/events.ts
docs/mfe-history-review/tools/hist.sh scality__metalk8s log --format='%h %ad %s' --date=short --name-status --no-renames f19004e899c78360d3a43d5f60047b140f29c909 -- shell-ui/src/navbar/lang.tsx
docs/mfe-history-review/tools/hist.sh scality__metalk8s log --reverse --format='%h %ad %s' --date=short --name-status --no-renames f19004e899c78360d3a43d5f60047b140f29c909 -- shell-ui/src/platform/library.js
docs/mfe-history-review/tools/hist.sh scality__metalk8s log --reverse --format='%h %ad %s' --date=short --name-status --no-renames f19004e899c78360d3a43d5f60047b140f29c909 -- shell-ui/src/navbar/library.js
docs/mfe-history-review/tools/hist.sh scality__metalk8s log --reverse --format='%h %ad %s' --date=short --name-status --no-renames f19004e899c78360d3a43d5f60047b140f29c909 -- shell-ui/src/navbar/events.js
docs/mfe-history-review/tools/hist.sh scality__metalk8s log --reverse --format='%h %ad %s' --date=short --name-status --no-renames f19004e899c78360d3a43d5f60047b140f29c909 -- shell-ui/src/FederatedApp.js
docs/mfe-history-review/tools/hist.sh scality__metalk8s log --reverse --format='%h %ad %s' --date=short --name-status --no-renames f19004e899c78360d3a43d5f60047b140f29c909 -- shell-ui/src/FederatedApp.tsx
docs/mfe-history-review/tools/hist.sh scality__metalk8s show --name-status --no-renames --format='%h %ad %s' --date=short 30709cb48
docs/mfe-history-review/tools/hist.sh scality__metalk8s log --format='%h %ad %s' --date=short --name-status --no-renames f19004e899c78360d3a43d5f60047b140f29c909 -- shell-ui/webpack.common.js
docs/mfe-history-review/tools/hist.sh scality__metalk8s log --format='%h %ad %s' --date=short --name-status --no-renames f19004e899c78360d3a43d5f60047b140f29c909 -- 'shell-ui/src/FederatedApp.*' 'shell-ui/src/index.*'
docs/mfe-history-review/tools/hist.sh scality__metalk8s ls-tree f28782afa -- shell-ui/README.md
docs/mfe-history-review/tools/hist.sh scality__metalk8s ls-tree c78254986 -- shell-ui/README.md
docs/mfe-history-review/tools/hist.sh scality__metalk8s ls-tree e109eb9ef -- shell-ui/README.md
docs/mfe-history-review/tools/hist.sh scality__metalk8s ls-tree f19004e899c78360d3a43d5f60047b140f29c909 -- shell-ui/README.md ui/README.md
docs/mfe-history-review/tools/hist.sh scality__metalk8s show f28782afa:shell-ui/README.md   # failed: bad object
docs/mfe-history-review/tools/hist.sh scality__metalk8s show c78254986:shell-ui/README.md   # failed: bad object
docs/mfe-history-review/tools/hist.sh scality__metalk8s log --format='%h %ad %s' --date=short --name-status --no-renames f19004e899c78360d3a43d5f60047b140f29c909 -- shell-ui/src/guardian
docs/mfe-history-review/tools/hist.sh scality__metalk8s log --format='%h %ad %s' --date=short --name-status --no-renames f19004e899c78360d3a43d5f60047b140f29c909 -- shell-ui/public/config.json
docs/mfe-history-review/tools/hist.sh scality__metalk8s log --format='%h %ad %s' --date=short --name-status --no-renames f19004e899c78360d3a43d5f60047b140f29c909 -- shell-ui/src/navbar/InstanceName.tsx
docs/mfe-history-review/tools/hist.sh scality__metalk8s log --format='%h %ad %s' --date=short --name-status --no-renames f19004e899c78360d3a43d5f60047b140f29c909 -- shell-ui/src/mcp/MCPRegistrar.tsx
docs/mfe-history-review/tools/hist.sh scality__metalk8s log --reverse --format='%h %ad %s' --date=short f19004e899c78360d3a43d5f60047b140f29c909 -- shell-ui/src/guardian
docs/mfe-history-review/tools/hist.sh scality__metalk8s log --reverse --format='%h %ad %s' --date=short f19004e899c78360d3a43d5f60047b140f29c909 -- shell-ui/src/mcp
docs/mfe-history-review/tools/hist.sh scality__metalk8s log --format='%h %ad %s' --date=short f19004e899c78360d3a43d5f60047b140f29c909 -- ui/src/containers/Layout.tsx
docs/mfe-history-review/tools/hist.sh scality__metalk8s log --format='%h %ad %s' --date=short f19004e899c78360d3a43d5f60047b140f29c909 -- ui/public/.well-known/micro-app-configuration
docs/mfe-history-review/tools/hist.sh scality__metalk8s log --format='%h %ad %s' --date=short f19004e899c78360d3a43d5f60047b140f29c909 -- salt/metalk8s/addons/ui/config/metalk8s-shell-ui-config.yaml.j2
docs/mfe-history-review/tools/hist.sh scality__metalk8s log --format='%h %ad %s' --date=short f19004e899c78360d3a43d5f60047b140f29c909 -- salt/metalk8s/addons/ui/config/workloadplane-shell-ui-config.yaml.j2
docs/mfe-history-review/tools/hist.sh scality__metalk8s log --diff-filter=A --format='%h %ad %s' --date=short f19004e899c78360d3a43d5f60047b140f29c909 -- shell-ui/src/mcp/MCPRegistrar.tsx
docs/mfe-history-review/tools/hist.sh scality__metalk8s log --diff-filter=A --format='%h %ad %s' --date=short --name-only f19004e899c78360d3a43d5f60047b140f29c909 -- shell-ui/src/guardian   # failed: missing object (could not fetch 98c3c68…)
docs/mfe-history-review/tools/hist.sh scality__metalk8s show --name-status --no-renames --format='%h %ad %s%n%b' --date=short 556f0c84f
docs/mfe-history-review/tools/hist.sh scality__metalk8s log --format='%h %ad %s' --date=short --name-status --no-renames f19004e899c78360d3a43d5f60047b140f29c909 -- shell-ui/src/mcp/MCPRegistrar.tsx
docs/mfe-history-review/tools/hist.sh scality__metalk8s log --diff-filter=A --no-renames --format='%h %ad %s' --date=short --name-only f19004e899c78360d3a43d5f60047b140f29c909 -- shell-ui/src/guardian
docs/mfe-history-review/tools/hist.sh scality__metalk8s log --format='%h %ad %s' --date=short f19004e899c78360d3a43d5f60047b140f29c909 -- shell-ui/src/FederatedApp.tsx
docs/mfe-history-review/tools/hist.sh scality__metalk8s show --name-status --no-renames --format='%h %ad %s%n%b' --date=short 8b8e67415
docs/mfe-history-review/tools/hist.sh scality__metalk8s show --name-status --no-renames --format='%h %ad %s%n%b' --date=short ddf833ad6
docs/mfe-history-review/tools/hist.sh scality__metalk8s show --name-status --no-renames --format='%h %ad %s%n%b' --date=short 26151e240
docs/mfe-history-review/tools/hist.sh scality__metalk8s show --name-status --no-renames --format='%h %ad %s%n%b' --date=short baba81932
docs/mfe-history-review/tools/hist.sh scality__metalk8s log --format='%h %ad %s' --date=short --name-status --no-renames f19004e899c78360d3a43d5f60047b140f29c909 -- images/metalk8s-ui/Dockerfile
docs/mfe-history-review/tools/hist.sh scality__metalk8s log --format='%h %ad %s' --date=short --name-status --no-renames f19004e899c78360d3a43d5f60047b140f29c909 -- images/metalk8s-ui/conf/nginx.conf
docs/mfe-history-review/tools/hist.sh scality__metalk8s log --format='%h %ad %s' --date=short --name-status --no-renames f19004e899c78360d3a43d5f60047b140f29c909 -- shell-ui/Dockerfile
docs/mfe-history-review/tools/hist.sh scality__metalk8s log --format='%h %ad %s' --date=short --name-status --no-renames f19004e899c78360d3a43d5f60047b140f29c909 -- salt/metalk8s/addons/shell-ui/deployed/ui-operator-cr.sls
docs/mfe-history-review/tools/hist.sh scality__metalk8s log --format='%h %ad %s' --date=short --name-status --no-renames f19004e899c78360d3a43d5f60047b140f29c909 -- salt/metalk8s/addons/ui/deployed/ui-operator-cr.sls
docs/mfe-history-review/tools/hist.sh scality__metalk8s log --format='%h %ad %s' --date=short --name-status --no-renames f19004e899c78360d3a43d5f60047b140f29c909 -- .github/workflows/publish.yaml
docs/mfe-history-review/tools/hist.sh scality__metalk8s show --name-status --no-renames --format='%h %ad %s%n%b' --date=short 70dbd925d
docs/mfe-history-review/tools/hist.sh scality__metalk8s show --name-status --no-renames --format='%h %ad %s%n%b' --date=short 65ea4b164
docs/mfe-history-review/tools/hist.sh scality__metalk8s show --name-status --no-renames --format='%h %ad %s%n%b' --date=short 2d6df3d31
docs/mfe-history-review/tools/hist.sh scality__metalk8s log --format='%h %ad %s' --date=short --name-status --no-renames f19004e899c78360d3a43d5f60047b140f29c909 -- salt/metalk8s/addons/ui/deployed/files/metalk8s-ui-deployment.yaml.j2 salt/metalk8s/addons/ui/deployed/ui-operator-post-install.sls
docs/mfe-history-review/tools/hist.sh scality__metalk8s show --name-status --no-renames --format='%h %ad %s%n%b' --date=short 3d610e75a
docs/mfe-history-review/tools/hist.sh scality__metalk8s show --name-status --no-renames --format='%h %ad %s%n%b' --date=short 5640809b6
docs/mfe-history-review/tools/hist.sh scality__metalk8s show --name-status --no-renames --format='%h %ad %s%n%b' --date=short 9af1226d6
docs/mfe-history-review/tools/hist.sh scality__metalk8s show --name-status --no-renames --format='%h %ad %s%n%b' --date=short e83045616
docs/mfe-history-review/tools/hist.sh scality__metalk8s show --name-status --no-renames --format='%h %ad %s%n%b' --date=short 136cf7844
docs/mfe-history-review/tools/hist.sh scality__metalk8s show --name-status --no-renames --format='%h %ad %s%n%b' --date=short e2fae4bcf
docs/mfe-history-review/tools/hist.sh scality__metalk8s show --name-status --no-renames --format='%h %ad %s%n%b' --date=short e109eb9ef
docs/mfe-history-review/tools/hist.sh scality__metalk8s ls-tree fce32f987 -- ui/src/entry.tsx ui/src/index.html ui/src/index.ts
docs/mfe-history-review/tools/hist.sh scality__metalk8s cat-file -e 6fb29c5cc7d43a2319922dbb32758f6d64d8be59   # missing object (nonzero exit)
docs/mfe-history-review/tools/hist.sh scality__metalk8s log --diff-filter=A --no-renames --format='%h %ad %s' --date=short f19004e899c78360d3a43d5f60047b140f29c909 -- ui/src/entry.tsx ui/src/index.html
docs/mfe-history-review/tools/hist.sh scality__metalk8s show fce32f987:ui/src/entry.tsx   # failed: bad object
docs/mfe-history-review/tools/hist.sh scality__metalk8s show fce32f987:ui/src/index.html   # failed: bad object
docs/mfe-history-review/tools/hist.sh scality__metalk8s show fce32f987:ui/src/index.ts   # failed: bad object
docs/mfe-history-review/tools/hist.sh scality__metalk8s log --reverse --format='%h %ad %s' --date=short f19004e899c78360d3a43d5f60047b140f29c909
```

Two calls were rejected by script itself before running git and are absent from `commands.log`: a `show` with `-1` and a `cat-file -p` (options outside allowlist). The `fce32f987` is parent of `ae1de7bcc` (output of `log --format='%h %p %ad %s'`).

## Summary

Commits up to the snapshot: 12526 (2019-02-05 to 2026-10-08). Points: 9 (clarified: 9, inconclusive: 0, resolved by the snapshot: 0).
