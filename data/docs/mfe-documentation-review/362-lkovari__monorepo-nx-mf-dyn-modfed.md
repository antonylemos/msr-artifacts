---
schema: 1
id: 1197367428
full_name: lkovari/monorepo-nx-mf-dyn-modfed
commit: 16f0962945720a521bac32e4a43913af1494b61b
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

# 362 — lkovari/monorepo-nx-mf-dyn-modfed

## Repository overview

All eight mined documents were read in full: two dated changelogs, root README, `nx-mf-comm-info.md` (Hungarian), `platform-communication-details.md` (English), workspace README and two library READMEs. Main documentation is extensive/communication-focused: four Angular applications in Nx workspace, Native Federation composition and contracts/adapters in two libraries. Route federation/joint deployment match previous reviews. Diagrams confuse standalone-mode providers with federated components, whereas prose correctly specifies host-executed demo handler (README.md:66-81, :142; nx-mf-comm-info.md:100-108). README also retains old package version (README.md:287; nx-mf-df/package.json:89).

Five reviews 3.4.2–3.4.6 are `final`, sharing classification/acquisition.csv ID and commit. Manual communication row in 3.4.4 distinguishes host-executed bootstraps/handlers from federated component consumers. Exposed component does not execute standalone config (nx-mf-df/apps/mf_remote_a/federation.config.js:8-10; nx-mf-df/apps/main-host/src/app/app.routes.ts:14), providing only welcome ID and `PlatformWelcomeLastMessageService` (nx-mf-df/apps/mf_remote_a/src/app/app.ts:25-28). Service consumes messages through inherited `BUS_TOKEN` or global bridge (nx-mf-df/libs/common-ui-lib/src/lib/platform-messaging/services/platform-welcome-last-message.service.ts:35-36, :62-75). Integrated handlers register in host, subscribing on remotes’ behalf (nx-mf-df/apps/main-host/src/app/app.config.ts:50-53; nx-mf-df/libs/common-ui-lib/src/lib/platform-messaging/services/demo-shell-h2r-query-remote-handler.service.ts:74-80), per 3.4.5 #4-6. Distinction preserves diagram contradiction in claim 12 and host-handler corroboration in claim 16.

`doc-*` occurrences were opened. Changelog titles/package names/upgrades (:3, :7 both), global function/file presence (CHANGELOG-2026-05-31.md:22, :71), test mentions (:63, :77) and smoke reports (CHANGELOG-2026-05-24.md:40; CHANGELOG-2026-05-31.md:54) are history, names or reported verification without additional architecture claims. Patch, token and handler configuration appear in table. In README.md, :34 is diagram label; :160 handler path; :209 repeated initialization instruction; :309-310 repeat counted structure/technology. :102-103 are logical-participant contracts, :109 motivates recorded events. Table/observations incorporate other occurrences as claims/repetitions.

In nx-mf-comm-info.md, :6 announces contents, :28 names import, :34 and :40 title examples, :36-44 and :51 explain generic package topologies. :116-119 enumerate imports, :162-168 contracts/ACLs; :178 describes shared adapter, :187 repeats host bootstrap, :226 and :277 host handler, :239 explains demo labels. Repetitions are not counted as new physical links. :110 and :125 retain old version/patch; :117-119 and :291 name APIs without additional applications.

platform-communication-details.md is a reference for external composition-related package rather than acquired package implementation. Occurrences :1, :3, :11, :29, :42-48, :55, :313, :318 and :476-484 are title, version, installation, API index or guide-sufficiency promise. :67, :202, :215, :226 and :249 are headings; :235, :253-255, :348 and :372-373 are reproduced source/configuration snippets without claims. :69, :73, :75, :91, :196-198, :204, :217, :220, :247, :251, :272, :332, :392, :398, :404, :406 and :448-450 repeat shared bus, identities, contracts or bridge access in table. :408 is hypothetical local bus option rather than deployed behavior. :430-431 and :433 present external React/Vue adapters without such snapshot units; :440 concerns package security, :455 manual teardown. :461 and :484 refer to external library source/tests absent here. No implemented transport, isolation, state synchronization or additional applications is inferred.

Nx README nx-mf-df/README.md:1-96 and generated library READMEs nx-mf-df/libs/common-ui-lib/README.md:1-7 and nx-mf-df/libs/contracts-platform-messaging/README.md:1-11 are generic command tool templates without unit-composition claims. Jest reference in latter is template context; 3.4.2 distinguishes Jest configuration from Vitest target. Command blocks, nx-mf-comm-info.md:129-143 provider examples and platform-communication-details.md API snippets were read as instructions/reproduced code. Mermaid/annotated tree, however, enter claims.

Comments/descriptive fields inspected in artifacts cited by previous reviews: root/library package.json; app/e2e/library project.json; four federation.config.js; nx.json, pnpm-workspace.yaml, tsconfig.base.json, ng-package.json, ESLint/Jest/Vitest/Playwright configs; main/bootstrap entries, app.config, routes/exposed components; host header/main; library messaging index/services; start-all/gh-build/gh-stage/gh-deploy scripts and Pages workflow. Comments are tool/test/optimization guidance, e.g. nx-mf-df/apps/main-host/federation.config.js:16-25 and nx-mf-df/apps/mf_remote_a/federation.config.js:21-30, adding no unit claim. No read manifest has `description`. Header title (nx-mf-df/apps/main-host/src/app/shared/components/header/header.html:8) repeats PoC nature. Authorized 3.4.4 manual communication-row correction is incorporated in this reading; no data/ file was altered.

## Claims

| # | Document | Claim | Theme | Corroboration | Evidence |
|---|---|---|---|---|---|
| 1 | CHANGELOG-2026-05-24.md:12 | “Native Federation fails without the patch” | build-deploy | partial | nx-mf-df/pnpm-workspace.yaml:3-4; nx-mf-df/patches/@lkovari__microfrontend-platform-communication@0.3.2.patch:9-40 |
| 2 | CHANGELOG-2026-05-31.md:16 | “a shared compile-time constant is used” | composition | corroborated | nx-mf-df/libs/contracts-platform-messaging/src/lib/platform-bridge-access-token.ts:1-2; nx-mf-df/apps/main-host/src/app/app.config.ts:43-46; nx-mf-df/libs/common-ui-lib/src/lib/platform-messaging/services/remote-platform-bus.service.ts:56-83 |
| 3 | CHANGELOG-2026-05-31.md:37 | “Wired into all four app configs” | composition | corroborated | nx-mf-df/apps/main-host/src/app/app.config.ts:52-53; nx-mf-df/apps/mf_remote_a/src/app/app.config.ts:28-29; 3.4.5 #4-6 |
| 4 | README.md:3 | “Angular 21 + Nx monorepo proof-of-concept for native module federation with host-mediated cross-microfrontend messaging” | structure | corroborated | 3.4.3 Units; 3.4.5 #1-6; nx-mf-df/package.json:31-48; nx-mf-df/apps/main-host/src/app/app.config.ts:31-47 |
| 5 | README.md:13 | “Shell: layout, routing, owns the platform bus and window.__MFE_BRIDGE__” | structure | corroborated | nx-mf-df/apps/main-host/src/app/shared/components/header/header.html:13-20; nx-mf-df/apps/main-host/src/app/app.routes.ts:6-26; nx-mf-df/apps/main-host/src/app/app.config.ts:31-47 |
| 6 | README.md:14 | “Federated remotes loaded into the shell by route” | composition | corroborated | 3.4.5 #1-3; nx-mf-df/apps/main-host/src/app/app.routes.ts:11-25 |
| 7 | README.md:15 | “Versioned Zod contracts, participant IDs, bus validators, topic registry” | structure | corroborated | nx-mf-df/libs/contracts-platform-messaging/src/lib/participant-ids.ts:1-14; nx-mf-df/libs/contracts-platform-messaging/src/lib/platform-messaging-bus-config.ts:30-95; nx-mf-df/apps/main-host/src/app/app.config.ts:35-40; nx-mf-df/libs/common-ui-lib/src/lib/platform-messaging/services/platform-welcome-last-message.service.ts:14-18 |
| 8 | README.md:16 | “Shared UI, PrimeNG setup, platform messaging adapters and demo UI” | structure | corroborated | nx-mf-df/apps/main-host/src/app/app.config.ts:9-22; nx-mf-df/apps/mf_remote_a/src/app/app.ts:4-20; nx-mf-df/apps/mf_remote_b/src/app/app.ts:4-20; nx-mf-df/apps/mf_remote_c/src/app/app.ts:4-20 |
| 9 | README.md:17 | “npm package: in-process bus, host bridge, Angular providers” | composition | corroborated | 3.4.2 nx-mf-df/package.json:89; nx-mf-df/apps/main-host/src/app/app.config.ts:7-47; nx-mf-df/libs/common-ui-lib/src/lib/platform-messaging/services/remote-platform-bus.service.ts:52-83 |
| 10 | README.md:19 | “They expose only their root component into the host; they do not bootstrap a separate Angular app inside the federated shell page” | composition | corroborated | 3.4.5 #1-3; nx-mf-df/apps/mf_remote_a/federation.config.js:8-10; nx-mf-df/apps/main-host/src/app/app.routes.ts:11-25 |
| 11 | README.md:25 | “One physical bus per browser tab. The host creates it; remotes attach through the global bridge handle” | composition | corroborated | nx-mf-df/apps/main-host/src/app/app.config.ts:31-47; nx-mf-df/libs/common-ui-lib/src/lib/platform-messaging/services/remote-platform-bus.service.ts:52-56; nx-mf-df/libs/common-ui-lib/src/lib/platform-messaging/services/platform-welcome-last-message.service.ts:35-75 |
| 12 | README.md:66-81 | “mf_remote_a / b / c (federated components) → providePlatformMessageListenerBootstrap / provideDemoShellH2rQueryRemoteHandlerBootstrap” | composition | contradicted | nx-mf-df/apps/mf_remote_a/src/app/app.ts:25-28; nx-mf-df/apps/mf_remote_a/src/app/app.config.ts:26-29; nx-mf-df/apps/main-host/src/app/app.config.ts:51-53; 3.4.5 #4-6 |
| 13 | README.md:86-95 | “These strings are agreed explicitly in code (not inferred from federation build names)” | composition | corroborated | nx-mf-df/libs/contracts-platform-messaging/src/lib/participant-ids.ts:1-32; nx-mf-df/apps/main-host/src/app/app.config.ts:32-44; nx-mf-df/libs/common-ui-lib/src/lib/platform-messaging/services/platform-welcome-last-message.service.ts:66-75 |
| 14 | README.md:95 | “Routing uses optional target on messages plus each subscription’s subscriberId” | composition | partial | nx-mf-df/libs/common-ui-lib/src/lib/platform-messaging/services/platform-welcome-last-message.service.ts:66-75; nx-mf-df/libs/contracts-platform-messaging/src/lib/platform-messaging-bus-config.ts:47-87 |
| 15 | README.md:116 | “Remotes: listen-only UI (...) replay buffer in sessionStorage for subscribers that mount after send” | composition | corroborated | nx-mf-df/apps/mf_remote_a/src/app/app.html:1-5; nx-mf-df/libs/common-ui-lib/src/lib/platform-messaging/services/message-sender.service.ts:26-29; nx-mf-df/libs/common-ui-lib/src/lib/platform-messaging/services/platform-welcome-last-message.service.ts:87-95; nx-mf-df/libs/common-ui-lib/src/lib/platform-messaging/platform-message/platform-message-replay.storage.ts:6-76 |
| 16 | README.md:142 | “the “remote” handler runs in the host process (subscribes as mf_remote_a, mf_remote_b, and mf_remote_c)” | composition | corroborated | nx-mf-df/apps/main-host/src/app/app.config.ts:50-53; nx-mf-df/libs/common-ui-lib/src/lib/platform-messaging/services/demo-shell-h2r-query-remote-handler.service.ts:74-122; 3.4.5 #4-6 |
| 17 | README.md:196 | “remotes first, then host” | independence | corroborated | nx-mf-df/scripts/start-all.mjs:9-17; nx-mf-df/scripts/start-all.mjs:113-121 |
| 18 | README.md:205 | “Production build + GitHub Pages asset prep” | build-deploy | corroborated | 3.4.6 #1-4; nx-mf-df/scripts/gh-build.mjs:49-64; nx-mf-df/scripts/gh-stage.mjs:13-27 |
| 19 | README.md:207 | “Push to gh-pages branch” | build-deploy | corroborated | 3.4.6 #1-4; nx-mf-df/scripts/gh-deploy.mjs:33-46; .github/workflows/deploy-github-pages.yml:37-58 |
| 20 | README.md:248 | “Apps expose build, serve, lint, test (and federation-related esbuild / serve-original)” | build-deploy | corroborated | nx-mf-df/apps/main-host/project.json:8-118; nx-mf-df/apps/mf_remote_a/project.json:8-118; 3.4.6 #1-4 |
| 21 | README.md:281 | “Build and lint targets use Nx caching” | build-deploy | corroborated | nx-mf-df/nx.json:19-33; nx-mf-df/nx.json:41-54 |
| 22 | README.md:287 | “is pinned at ^0.2.1 in nx-mf-df/package.json” | other | contradicted | nx-mf-df/package.json:89; nx-mf-df/pnpm-workspace.yaml:3-4; 3.4.2 nx-mf-df/package.json:89 |
| 23 | nx-mf-comm-info.md:204 | “Listen-only (nincs küldő UI remote route-on)” (English translation: "Listen-only; no sending UI on the remote route") | composition | contradicted | nx-mf-df/apps/main-host/src/app/shared/components/header/header.html:14-20; nx-mf-df/apps/main-host/src/app/app.routes.ts:11-25; 3.4.5 #4-6 |
| 24 | nx-mf-comm-info.md:241-250 | “önálló dev szerver (...) nincs shell bridge” (English translation: "standalone development server; no shell bridge") | independence | corroborated | nx-mf-df/apps/mf_remote_a/src/main.ts:3-5; nx-mf-df/apps/mf_remote_a/src/bootstrap.ts:1-5; nx-mf-df/apps/mf_remote_a/src/app/app.config.ts:19-30; nx-mf-df/libs/common-ui-lib/src/lib/platform-messaging/services/remote-platform-bus.service.ts:44-56 |
| 25 | platform-communication-details.md:63-65 | “backed by a browser EventTarget (...) no postMessage, no WebSocket, and no cross-origin transport” | composition | uncorroborated | — |
| 26 | platform-communication-details.md:251 | “read handle.appId (...) and handle.remotes” | composition | corroborated | nx-mf-df/apps/main-host/src/app/app.config.ts:43-46; nx-mf-df/libs/common-ui-lib/src/lib/platform-messaging/services/remote-platform-bus.service.ts:59-72 |

## Observations

**1. CHANGELOG-2026-05-24.md:12.** Same ESM-resolution requirement recurs at CHANGELOG-2026-05-31.md:12, README.md:287 and nx-mf-comm-info.md:125. Registered patch for 0.3.2 corrects `.mjs` to `.js`, but no tarball or unpatched build result confirms claimed failure. Changelog 0.2.1/0.3.0 references narrate past upgrades, not proving historical state through current snapshot.

**2. CHANGELOG-2026-05-31.md:16.** Host bridge receives common token, remote adapter passing same constant to `getBus` and `tryPublish`. Implementation confirms shared bridge-access contract without establishing isolation/strong inter-unit authentication.

**3. CHANGELOG-2026-05-31.md:37.** Command handler bootstrap is configured in all four apps, per 3.4.5 #4-6. Describes own configurations rather than four handlers executed when loading federated components. Smoke reports at previous changelog line 40 and current 54 do not demonstrate remote-component publication in composed page.

**4. README.md:3.** Workspace contains four Angular applications/two libraries, Native Federation and host-created bus. Qualified “native module federation” matches actual Native Federation package, without claiming Webpack Module Federation. README.md:5, :178-184 and :309-314 and title nx-mf-df/apps/main-host/src/app/shared/components/header/header.html:8 repeat structure/proof-of-concept nature.

**5. README.md:13.** Host maintains navigation/header, registers routes and creates bus/bridge. Same role in README.md:29-35 diagram and nx-mf-comm-info.md:94-98 tree, :187-189 steps and :289 summary.

**6. README.md:14.** Each of three routes calls `loadRemoteModule`, mounting `m.App`. Historical instruction README.md:311 names same manifest/route mechanism rather than another relationship.

**7. README.md:15.** Contracts library defines participants/validators/ACLs with version limits, consumed by host and remote-used services. Confirms versioned message contracts rather than independent app releases. Repetitions: README.md:38-47, :97-103; nx-mf-comm-info.md:159-170, :291. Contract shell→remote→shell arrows represent logical IDs: demo implementation detailed in host-handler claim.

**8. README.md:16.** Host/three remotes import `common-ui-lib`; actual multiple-unit use beyond alias availability. nx-mf-comm-info.md:172-183 and :289 describe same contracts versus adapters/UI division.

**9. README.md:17.** External package provides host-invoked providers/adapter-used types. nx-mf-comm-info.md:116-121 and :291 repeat used subpaths. External-symbol enumerations at platform-communication-details.md:42-48, :313-328 and :476-482 are API references rather than additional monorepo units.

**10. README.md:19.** Exposure points to `app.ts`, neither `main.ts` nor standalone bootstrap. Same-line Native Federation choice already recorded in claim 4. nx-mf-comm-info.md:108 correctly specifies remote `app.config.ts` does not execute in integration.

**11. README.md:25.** Composed application registers bus in host; consumer uses inherited `BUS_TOKEN` or global-bridge adapter. Uniqueness concerns page coordination without isolated component instances. Repetitions: README.md:19, :34, :76-79; nx-mf-comm-info.md:18, :22, :48-51, :180, :187-190, :250, :280; platform-communication-details.md:65-75, :91, :217-220, :367, :398-406, :433, :449-451. Generic nx-mf-comm-info.md:34-50 topologies do not prove active remote emitters in composition.

**12. README.md:66-81.** Diagram places these bootstraps under federated components. They belong to standalone `app.config.ts`; exposed component provides only welcome ID/`PlatformWelcomeLastMessageService`. In composed page listener/query bootstraps belong to host. Annotated nx-mf-comm-info.md:100-105 tree repeats imprecise attribution, though :108 text correctly limits it.

**13. README.md:86-95.** IDs are explicit constants used in providers and `subscriberId`. External document platform-communication-details.md:202-220, :269 and :448 repeats distinction; “independently” in this doc-independence occurrence concerns bus identity rather than autonomous app evolution. No claim project uses Webpack.

**14. README.md:95.** Subscriptions specify participant, contracts recording publishers/subscribers. Internal delivery filtering `target` is attributed to external package whose source is absent. Repetitions: nx-mf-comm-info.md:19, :36-44, :167-168; platform-communication-details.md:196-198, :228-247, :270, :392, :404 and :450. Document `bus.ts` snippets do not substitute acquired source.

**15. README.md:116.** Remote components display messages/history without composer. Sender saves accepted events to shared session storage, consumer searching by participant. README.md:57 and nx-mf-comm-info.md:178, :202, :281 describe same replay. Does not remove host-header composer when navigating to remote.

**16. README.md:142.** Handler uses three IDs when host has `BUS_TOKEN`. Hence “Shell → remote request” and “Remote → shell reply” at README.md:102-103 describe logical demo participants rather than round-trip between federated apps. nx-mf-comm-info.md:108, :212-226, :239 and :277 acknowledge simulation. Manual 3.4.4 communication row aligns with chain, distinguishing host-executed handlers from remote-component message consumption.

**17. README.md:196.** Orchestrator creates one Nx process per application, waits for ports or timeout then starts host. README.md:209, :213 and :217-219 repeat sequence. Isolated commands :192-195 show own targets without demonstrating standalone messaging works without shell.

**18. README.md:205.** Separate host/remote builds exist, each own baseHref; script updates production manifest. Stage combines outputs in one tree. Commands README.md:197-204 and :293-299 and history :314 supplement instruction without evidencing independent per-app deployment.

**19. README.md:207.** Manual path publishes `gh-pages-dist` through `gh-pages`; workflow uses Pages upload/deploy. Both combine four applications in one site. Successful production execution claim is not derivable from scripts alone.

**20. README.md:248.** Targets appear in projects, root scripts invoking per-app builds (nx-mf-df/package.json:18-24). Library qualifier “where configured” does not claim every library has all same targets.

**21. README.md:281.** Configuration enables caching for application, lint and library executors, defining inputs. Claim describes build-reuse configuration rather than performance measurement.

**22. README.md:287.** Current manifest uses `^0.3.2`, registered patch also 0.3.2. nx-mf-comm-info.md:110, :125 and platform-communication-details.md:3, :11 and :484 retain old reference. Export correction exists as claim 1, but for another version. Dated changelog entries report history rather than confirming current dependency.

**23. nx-mf-comm-info.md:204.** Absence of sender within remote component confirmed by claim 15. Here text extends absence to remote route: host header still has composer/query-command suite on integrated routes. Component contents cannot be equated with whole page.

**24. nx-mf-comm-info.md:241-250.** Remote has own entry/bootstrap, but config creates neither bus nor host bridge. On standalone page adapter returns absent bus until bridge exists. Banner reference is UX context; platform-communication-details.md:408 optionally recommends local test bus without claiming monorepo implementation.

**25. platform-communication-details.md:63-65.** Claim specifies internal transport of unit-connecting package. Snapshot contains adapters/imports rather than `mfe-platform-communication/src/core/bus.ts` source. API absence in apps recorded by 3.4.4 Notes does not verify package internals; reproduced document excerpts remain documentation.

**26. platform-communication-details.md:251.** Adapter provides `getHostAppId()` and `getRemoteTargets()` by reading fields. List originates in host. platform-communication-details.md:272 and :451 repeat mechanism; dynamic-change qualification does not prove dynamic discovery/runtime remote registration in project.

## Summary

Claims: 26 (corroborated: 20, partial: 2, contradicted: 3, uncorroborated: 1). Themes: (structure: 4, composition: 14, build-deploy: 5, independence: 2, other: 1).
