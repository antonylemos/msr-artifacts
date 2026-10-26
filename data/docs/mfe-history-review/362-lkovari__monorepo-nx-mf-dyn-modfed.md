---
schema: 1
id: 1197367428
full_name: lkovari/monorepo-nx-mf-dyn-modfed
commit: 16f0962945720a521bac32e4a43913af1494b61b
inputs:
  clone: data/samples/mfe-sample-001/repos/lkovari__monorepo-nx-mf-dyn-modfed
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 362 — lkovari/monorepo-nx-mf-dyn-modfed

## Repository overview

There are 19 reachable commits up to snapshot, from 2026-03-31 to 2026-06-07. First is `d722c85` (2026-03-31, “Initial commit”), with README; workspace appears afterward in `a04c0bb` (2026-03-31, “steps 1 - 12 create apps install angulararchitests native federation plugin, set host and remotes”). This is first observable workspace presence in this history without showing where code was produced before. Message of `81a1110` (2026-05-10, “Use npm lib @lkovari/microfrontend-platform-communication”) announces communication library adoption. The `82423e0` (2026-05-17, “Add demo query and demo queue, refactor the usage partially as the example what I wrote.”) adds contracts library project and Jest files. In `89e1eb6` (2026-06-01, “Token-gated bridge access , Kind-aware runtime behavior, Registry auto-registration, and add tests”), Vitest configuration appears. Last commit is `16f0962` (2026-06-07, “update platform comm library, add tests.”).

Reviews 3.4.3–3.4.6 leave no undetermined unit, construct, relationship or deploy. Points come from unused or undetermined dependencies and partial or contradicted documentary claims. Some old blobs are unavailable in partial clone. Failures downloaded no objects: messages and changed paths date artifacts, but demonstrate neither earlier dependency usage nor abandonment. Old README and host header could be read, delineating documentary discrepancies. No snapshot judgment changes.

## Points

| # | Point | Origin | Question | Commits | Result |
|---|---|---|---|---|---|
| 1 | `@softarc/native-federation-node` declared and unused | 3.4.2 (nx-mf-df/package.json:91) | dependency use | a04c0bb 2026-03-31 steps 1 - 12 create apps install angulararchitests native federation plugin, set host and remotes | inconclusive |
| 2 | Jest configuration remains alongside Vitest test target | 3.4.2 (nx-mf-df/package.json:44) | active or abandoned | 82423e0 2026-05-17 Add demo query and demo queue, refactor the usage partially as the example what I wrote.; 89e1eb6 2026-06-01 Token-gated bridge access , Kind-aware runtime behavior, Registry auto-registration, and add tests; 16f0962 2026-06-07 update platform comm library, add tests. | inconclusive |
| 3 | `@nx/workspace` declared and unused | 3.4.2 (nx-mf-df/package.json:48) | dependency use | a04c0bb 2026-03-31 steps 1 - 12 create apps install angulararchitests native federation plugin, set host and remotes | inconclusive |
| 4 | Documentation says Native Federation fails without exports patch | 3.4.7 #1 | dependency use | 81a1110 2026-05-10 Use npm lib @lkovari/microfrontend-platform-communication; 147d615 2026-05-24 Update to fit to communication lib changes; 89e1eb6 2026-06-01 Token-gated bridge access , Kind-aware runtime behavior, Registry auto-registration, and add tests; 16f0962 2026-06-07 update platform comm library, add tests. | inconclusive |
| 5 | Diagram attributes bootstraps to federated components, although text places them in host | 3.4.7 #12 | conflicting stages | 147d615 2026-05-24 Update to fit to communication lib changes | clarified |
| 6 | Claim about filtering by `target` depends on external package internals | 3.4.7 #14 | dependency use | — | resolved by the snapshot |
| 7 | Documents retain `^0.2.1`, while current manifest and patch use 0.3.2 | 3.4.7 #22 | conflicting stages | 147d615 2026-05-24 Update to fit to communication lib changes; 89e1eb6 2026-06-01 Token-gated bridge access , Kind-aware runtime behavior, Registry auto-registration, and add tests; 16f0962 2026-06-07 update platform comm library, add tests. | clarified |
| 8 | Text denies sending UI on remote route, but host header contains composer | 3.4.7 #23 | conflicting stages | 82423e0 2026-05-17 Add demo query and demo queue, refactor the usage partially as the example what I wrote.; 147d615 2026-05-24 Update to fit to communication lib changes | clarified |

## Observations

**1. Dependency `@softarc/native-federation-node`.** Manifest is added in `a04c0bb` and changed in several later commits, but queried initial version is unavailable. Commit message announces Native Federation plugin installation and host/remote configuration; it does not demonstrate specific Node package usage. Snapshot has no import or invocation of package under 3.4.2. Available contents cannot distinguish earlier usage, auxiliary installation or declaration never connected. Inconclusive result without inferring abandonment.

**2. Jest and Vitest.** The `82423e0` adds `jest.config.cts` and `project.json` of `contracts-platform-messaging`; Jest configuration could be read and already points to `../../jest.preset.js`. It does not change afterward in queried log. The `89e1eb6` adds `vitest.config.ts` and changes project; `16f0962` changes both again. The `project.json` versions from May and June 1 are unavailable. Snapshot declares `vitest run` in target `test` (nx-mf-df/libs/contracts-platform-messaging/project.json:18-22), but retains Jest plugin and configuration. Sequence dates coexistence and Vitest file arrival; it proves neither Jest execution nor abandonment. Point remains inconclusive.

**3. Dependency `@nx/workspace`.** Reading initial manifest at `a04c0bb` failed, and file changes afterward. Nx workspace presence and messages identify no package invocation. Snapshot only declares it (3.4.2, nx-mf-df/package.json:48); queried objects cannot explain whether declaration remains from earlier usage or never had direct usage. Inconclusive result.

**4. Patch necessity.** Log without rename detection shows patch 0.1.4 addition in `81a1110`, removal and patch 0.2.1 addition in `147d615`, followed by path replacements to 0.3.0 in `89e1eb6` and 0.3.2 in `16f0962`. README at `147d615` was read and already explains replacing `.mjs` exports with `.js`. This confirms documentary explanation accompanies versioned patches, but not alleged failure without them. Snapshot contains current patch and pnpm registration (nx-mf-df/pnpm-workspace.yaml:3-4), without tarball or comparative build result; queries execute no builds. Available history does not resolve technical patch necessity. Inconclusive result.

**5. Bootstraps in diagram.** README read at `147d615` already simultaneously contains diagram with listener/query bootstrap under federated components, explanation that components do not execute own Angular bootstrap and caveat that remote handler runs in host process. Log records no later README change up to snapshot. Inconsistency limited to document already coexisted in same May version; separate stages need not be attributed. This proves neither diagram describing earlier code nor copying. Current execution remains as recorded in 3.4.4 and 3.4.5.

**6. Internal `target` filtering.** Snapshot already explains corroboration limit: calls, subscriber IDs and contracts exist, but acquired external package source implementing delivery does not (3.4.7, observation 14). Missing contents are no evidence of abandoned local code or another-stage configuration. Point is resolved by snapshot regarding gap origin; internal filtering is neither confirmed nor `partial` corroboration changed. No specific historical query was necessary.

**7. Old documentary version.** Read README at `147d615` already states `^0.2.1` and has no later change. Manifest and pnpm registration change in June, when patch paths move to 0.3.0 then 0.3.2. Snapshot confirms `^0.3.2` (nx-mf-df/package.json:89) and patch 0.3.2. Thus documentary indication was retained while dependency artifacts evolved. Manifest at `147d615` could not be read: declared version truly being 0.2.1 then is not asserted. The `nx-mf-comm-info.md`, added in `147d615` with no later log change, also retains old reference. Conclusion is documentation unupdated relative to snapshot, rather than proof of historical accuracy of all mentioned versions.

**8. Emitter on remote route.** Header read at `82423e0` already contains links to three remote routes and `lib-platform-messaging-trigger`, outside route condition. No later file change occurs up to snapshot. The `nx-mf-comm-info.md` is added afterward in `147d615`, without later change; current text denies sending UI on remote route (:204), although describing composer in header (:198). Thus header with emitter already existed when document arrived. Clarification is artifact coexistence, rather than later composer removal or inferred intention. Absence of emitter inside remote component remains consistent with code; extending it to entire page conflicts with header.

## Commands

Short revisions below are reachable snapshot ancestors in first log. All queries used wrapper. Readings annotated `bad object` failed due to unavailable historical object. First path log failed attempting rename detection with missing blobs; repeated with `--no-renames`, without network fetching.

```sh
docs/mfe-history-review/tools/hist.sh lkovari__monorepo-nx-mf-dyn-modfed log --reverse --format='%h %ad %s' --date=short 16f0962945720a521bac32e4a43913af1494b61b
docs/mfe-history-review/tools/hist.sh lkovari__monorepo-nx-mf-dyn-modfed log --reverse --format='%h %ad %s' --date=short --name-status 16f0962945720a521bac32e4a43913af1494b61b -- nx-mf-df/package.json nx-mf-df/nx.json nx-mf-df/libs/contracts-platform-messaging/project.json nx-mf-df/libs/contracts-platform-messaging/jest.config.cts nx-mf-df/libs/contracts-platform-messaging/vitest.config.ts README.md nx-mf-comm-info.md nx-mf-df/apps/main-host/src/app/app.config.ts nx-mf-df/apps/mf_remote_a/src/app/app.ts nx-mf-df/apps/mf_remote_a/src/app/app.config.ts nx-mf-df/apps/main-host/src/app/shared/components/header/header.html nx-mf-df/pnpm-workspace.yaml nx-mf-df/patches # failed: missing object 099029d41144c92f8b37b8b2b9f4e356f387d842
docs/mfe-history-review/tools/hist.sh lkovari__monorepo-nx-mf-dyn-modfed rev-list --count 16f0962945720a521bac32e4a43913af1494b61b
docs/mfe-history-review/tools/hist.sh lkovari__monorepo-nx-mf-dyn-modfed log --reverse --no-renames --format='%h %ad %s' --date=short --name-status 16f0962945720a521bac32e4a43913af1494b61b -- nx-mf-df/package.json nx-mf-df/nx.json nx-mf-df/libs/contracts-platform-messaging/project.json nx-mf-df/libs/contracts-platform-messaging/jest.config.cts nx-mf-df/libs/contracts-platform-messaging/vitest.config.ts README.md nx-mf-comm-info.md nx-mf-df/apps/main-host/src/app/app.config.ts nx-mf-df/apps/mf_remote_a/src/app/app.ts nx-mf-df/apps/mf_remote_a/src/app/app.config.ts nx-mf-df/apps/main-host/src/app/shared/components/header/header.html nx-mf-df/pnpm-workspace.yaml nx-mf-df/patches
docs/mfe-history-review/tools/hist.sh lkovari__monorepo-nx-mf-dyn-modfed show a04c0bb:nx-mf-df/package.json # failed: bad object
docs/mfe-history-review/tools/hist.sh lkovari__monorepo-nx-mf-dyn-modfed show 82423e0:nx-mf-df/libs/contracts-platform-messaging/project.json # failed: bad object
docs/mfe-history-review/tools/hist.sh lkovari__monorepo-nx-mf-dyn-modfed show 147d615:nx-mf-df/package.json # failed: bad object
docs/mfe-history-review/tools/hist.sh lkovari__monorepo-nx-mf-dyn-modfed show 89e1eb6:nx-mf-df/libs/contracts-platform-messaging/project.json # failed: bad object
docs/mfe-history-review/tools/hist.sh lkovari__monorepo-nx-mf-dyn-modfed show 82423e0:nx-mf-df/libs/contracts-platform-messaging/jest.config.cts
docs/mfe-history-review/tools/hist.sh lkovari__monorepo-nx-mf-dyn-modfed show 147d615:README.md
docs/mfe-history-review/tools/hist.sh lkovari__monorepo-nx-mf-dyn-modfed show 82423e0:nx-mf-df/apps/main-host/src/app/shared/components/header/header.html
```

Comparison below was performed before and after queries, with empty output and code 0 in both:

```sh
LC_ALL=C docs/mfe-history-review/tools/fingerprint.sh | cmp - docs/mfe-history-review/tools/fingerprint-before.txt
```

## Summary

Commits up to the snapshot: 19 (2026-03-31 to 2026-06-07). Points: 8 (clarified: 3, inconclusive: 4, resolved by the snapshot: 1).
