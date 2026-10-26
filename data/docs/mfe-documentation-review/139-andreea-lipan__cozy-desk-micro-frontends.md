---
schema: 1
id: 1134331975
full_name: andreea-lipan/cozy-desk-micro-frontends
commit: 7050669405cfdce6e0bf593fdfdb4d94ef5ad5dc
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

# 139 — andreea-lipan/cozy-desk-micro-frontends

## Repository overview

Documentation is English root README: a step-by-step Angular micro frontend tutorial with Native Federation (README.md:1-2). It begins with general concept and advantages, presents three example applications (base app and tea tracker and sticky notes micro frontends, README.md:35-38), then teaches creating first remote (Part 1), base app as `dynamic-host` with routes calling `loadRemoteModule` and federation manifest (Part 2), and running everything together (Part 3). READMEs in `sticky-notes/` and `tea-tracker/` are Angular CLI templates ("This project was generated using Angular CLI version 21.0.5", sticky-notes/README.md:3; identical except title, sticky-notes/README.md:1 and tea-tracker/README.md:1), without project claims; cited `http://localhost:4200/` (sticky-notes/README.md:13) is standard template text, while remotes serve on ports 4333 and 4222 (sticky-notes/angular.json:96-97; tea-tracker/angular.json:96-97).

README project claims match previous reviews: three Angular projects, host loading two remotes by route through `loadRemoteModule`, from manifest with `localhost` URLs (3.4.5 #1, #2). Sole claim without artifact is "independently deployable" micro frontends (claim 2): snapshot lacks deployment (3.4.6). Tutorial is also older or simplified relative to code in details, all in code blocks or instructions without rows:
- Base app is `digital-desktop` in tutorial (README.md:297-298) and `test-base` in snapshot (test-base/package.json:2);
- `federation.config.js` block (README.md:242-270) exposes `./src/app/app.component.ts`, while snapshot exposes `./src/app/app.ts` (tea-tracker/federation.config.js:6-8); block also lacks actual file's `features.ignoreUnusedDeps` (tea-tracker/federation.config.js:25-30);
- Routes block (README.md:333-349) only has `tea-tracker` route and home at `path: ''`; snapshot has home at `home-page` and both remote routes (test-base/src/app/app.routes.ts:6-19);
- Tutorial manifest goes in `src/assets/federation.manifest.json` (README.md:366), read from `/assets/federation.manifest.json` (README.md:395), with only `tea-tracker` (README.md:375-379); snapshot puts it in `public/`, read as `federation.manifest.json` (test-base/public/federation.manifest.json:1-4; test-base/src/main.ts:3), with both remotes;
- Part 3 announces "add a second micro frontend (Sticky Notes)" (README.md:86), without steps; sticky-notes only reappears in images and final text (README.md:438, 440-441).

Excluded from table:
- General micro frontend and architecture definition (README.md:15-33: "Micro frontends are essentially the frontend equivalent of microservices", README.md:17; pieces "independently developed and deployed", README.md:19; "owned by a separate team [...] can be deployed independently", README.md:24-25; generic "Base App (Container/Shell)" and "Micro Frontends (Remote Apps)" roles, README.md:30-33), not about project; next sentence, which is, becomes claim 1;
- General advantages (README.md:40-53: independent deployment with Teams example, team autonomy, lazy loading, scalability), without project claims;
- General technology description: "Native Federation is Angular's recommended solution for micro frontends. It uses JavaScript's native module system to load remote applications dynamically" (README.md:148), and `remoteEntry.json` as "A special file Native Federation generates that describes what the remote app exposes" (README.md:385); project's dynamic loading is claim 11;
- Technology rules: first `loadRemoteModule` parameter "must match the name in the remote's `federation.config.js`", second "must match the key in the remote's `exposes`" (README.md:358-359), and manifest key "Must match the `name`" (README.md:382). Names match here (3.4.5 #1, #2);
- Code block explanations: `name` as "identifier for this micro frontend" (README.md:272), `exposes` keys (README.md:273-275, repeating claim 6), `strictVersion` and `skip` (README.md:278-279), home and tea-tracker routes (README.md:353-356), and `.then((_) => import('./bootstrap'))` (README.md:406), recorded as internal construct in source-code review (3.4.4, `src-async-bootstrap`);
- Schematic-generated `bootstrap.ts`, "handles the dynamic bootstrapping required for federation" (README.md:189), internal unit detail (tea-tracker/src/main.ts:3-5; tea-tracker/src/bootstrap.ts:5);
- Ports (README.md:175-178, 199, 208, 321, 384, 444), installation, project creation and run instructions (README.md:58-139, 152-161, 165-171, 180-184, 191-224, 281-284, 291-303, 307-316, 368-371, 388, 415-432); "Choose 'dynamic-host' (NOT 'remote')" (README.md:316-318) enters claim 9.

`doc-*` occurrences: README.md:1 is title; README.md:5, 6 and 9 contents; README.md:15 and 40 section headings; README.md:17, 19, 24, 25, 30, 32 and 33 general definition above; README.md:37 and 38 claim 1; README.md:45, 47, 49, 51 and 52 general advantages; README.md:84 and 86 repeat 1; README.md:88 claim 2; README.md:91, 141, 146 and 305 titles; README.md:93 claim 3; README.md:143 and 144 claim 4; README.md:148 and 385 general technology description; README.md:173 claim 5; README.md:272 code block explanation; README.md:288 claim 9, and README.md:318 repeats 9; README.md:307 installation instruction; README.md:329 claim 10; README.md:357 claim 11; README.md:364 claim 12, and README.md:383 repeats 12; README.md:404 claim 13; README.md:413 claim 14; README.md:440 claim 15; README.md:446 claim 16.

Artifacts cited by previous reviews were read: three `package.json` files (without `description`), `angular.json`, `federation.config.js`, `src/main.ts` and `src/bootstrap.ts`, host manifest, test-base/src/app/app.config.ts, test-base/src/app/app.routes.ts, test-base/src/app/app.html and remote `app.ts`/`app.html`. Comments in `federation.config.js` come from Native Federation schematic, about packages to skip, sharing FAQ and `ignoreUnusedDeps` (tea-tracker/federation.config.js:19-28; test-base/federation.config.js:15-24). Remote `app.html` files retain commented initial Angular CLI template (sticky-notes/src/app/app.html:3-10). Comment "// The Micro Frontends" (test-base/src/app/app.routes.ts:11) and host homepage text (test-base/src/app/home-component/home-component.html:6-7) repeat claims 10 and 1.

## Claims

| # | Document | Claim | Theme | Corroboration | Evidence |
|---|---|---|---|---|---|
| 1 | README.md:35-38 | "In our example project, we'll build: A **base app** serving as our digital desktop; A **tea tracker** micro frontend [...]; A **sticky notes** micro frontend" | structure | corroborated | 3.4.3 (test-base, tea-tracker and sticky-notes `Yes`); 3.4.5 #1, #2 |
| 2 | README.md:88 | "a working digital desktop with two independently deployable micro frontends" | build-deploy | uncorroborated | — |
| 3 | README.md:93 | "the Tea Tracker micro frontend - a standalone Angular application" | independence | corroborated | 3.4.3 (tea-tracker, Entry column); 3.4.4 (Notes); tea-tracker/src/main.ts:3-5; tea-tracker/src/bootstrap.ts:5 |
| 4 | README.md:143-144 | "Native Federation is the technology that enables micro frontends. It allows multiple Angular applications to share code and components at runtime." | composition | corroborated | 3.4.2; 3.4.5 #1, #2; test-base/src/app/app.routes.ts:14, 18; test-base/federation.config.js:6-8; tea-tracker/federation.config.js:10-12; sticky-notes/federation.config.js:10-12 |
| 5 | README.md:173 | "Choose \"remote\" because this micro frontend will be loaded BY another application (the base app we'll create later)" | structure | corroborated | 3.4.5 #2; tea-tracker/federation.config.js:4-8; test-base/src/app/app.routes.ts:12-15 |
| 6 | README.md:187 | "Creates `federation.config.js` - defines what this app exposes to other apps" | composition | corroborated | 3.4.2; tea-tracker/federation.config.js:6-8; sticky-notes/federation.config.js:6-8 |
| 7 | README.md:188 | "Updates `angular.json` - adds federation build configuration" | build-deploy | corroborated | 3.4.2; 3.4.6 #2; tea-tracker/angular.json:16-29 |
| 8 | README.md:276-277 | "**`shared`**: Which dependencies are shared between apps / `singleton: true`: Only one instance of shared libraries" | composition | corroborated | test-base/federation.config.js:6-8; tea-tracker/federation.config.js:10-12; sticky-notes/federation.config.js:10-12; test-base/package.json:30; tea-tracker/package.json:30; sticky-notes/package.json:30 |
| 9 | README.md:288 | "the main application - our digital desktop - that will host all micro frontends" | structure | corroborated | 3.4.5 #1, #2; test-base/src/main.ts:3; test-base/federation.config.js:3-8 |
| 10 | README.md:329 | "To add your micro frontends to this app we will use routing" | composition | corroborated | 3.4.4 (test-base/src/app/app.routes.ts:5, `host-relationship`); test-base/src/app/app.routes.ts:12-19; test-base/src/app/app.config.ts:9 |
| 11 | README.md:357 | "Uses `loadRemoteModule()` to dynamically load the remote micro frontend" | composition | corroborated | 3.4.4 (test-base/src/app/app.routes.ts:14); 3.4.5 #2; test-base/src/app/app.routes.ts:13-14 |
| 12 | README.md:364 | "The manifest file tells the base app where to find each micro frontend." | composition | corroborated | 3.4.5 #1, #2; test-base/public/federation.manifest.json:2-3; test-base/src/main.ts:3 |
| 13 | README.md:401-404 | "**`initFederation()`**: Initializes the federation system / Loads the manifest file / Discovers available micro frontends" | composition | corroborated | 3.4.4 (test-base/src/main.ts:3); test-base/src/main.ts:1-6; test-base/angular.json:48-53 |
| 14 | README.md:413 | "You need BOTH applications running simultaneously. This is crucial for micro frontends to work." | composition | corroborated | 3.4.6 (Repository overview); 3.4.5 #1, #2; test-base/public/federation.manifest.json:2-3 |
| 15 | README.md:440-441 | "I can see my home page, from my base app and I can see the two separate micro frontends from the same application." | composition | corroborated | 3.4.5 #1, #2; test-base/src/app/app.html:12, 17, 26 |
| 16 | README.md:445-447 | "When you clicked \"Tea Tracker\", it dynamically fetched the code from port 4222 / The micro frontend loaded seamlessly into the base app / All without a page refresh!" | composition | corroborated | 3.4.5 #2; test-base/public/federation.manifest.json:2; test-base/src/app/app.routes.ts:13-14; test-base/src/app/app.html:12, 26 |

## Observations

**1. README.md:35-38.** Three applications exist as own Angular projects at root, each with manifest, entry and build (3.4.3), and host connects both remotes (3.4.5 #1, #2). "base app" is `test-base` (test-base/package.json:2), rather than tutorial `digital-desktop` (README.md:297). Tutorial outline repeats three units (README.md:84-86), as does host homepage: "Each widget is its own individual mini app. You can track your tea and take notes." (test-base/src/app/home-component/home-component.html:6-7).

**2. README.md:88.** Three builds are separate and host loads remotes at runtime through manifest URLs (3.4.6 #1-#3; 3.4.5 #1, #2), but snapshot has no deployment artifacts: build and deployment review records `not observed` for all three applications, and manifest URLs use `localhost` (test-base/public/federation.manifest.json:2-3). Nothing confirms or refutes deploying remotes independently. General advantages repeat idea ("Independent Deployment", README.md:45-48), without addressing project.

**3. README.md:93.** Tea-tracker has own entry and bootstrap (tea-tracker/src/main.ts:3-5; tea-tracker/src/bootstrap.ts:5), and `initFederation()` without manifest serves isolated execution (3.4.4, Notes). Tutorial itself serves it independently on port 4222 before host exists (README.md:197-216). README does not say same for sticky-notes, with same arrangement (sticky-notes/src/main.ts:3-5).

**4. README.md:143-144.** Native Federation is sole snapshot composition technology (3.4.2), with both host → remote relationships `native-federation` (3.4.5 #1, #2). Components arrive at runtime through `loadRemoteModule` (test-base/src/app/app.routes.ts:14, 18), and three configurations share dependencies through `shareAll` (test-base/federation.config.js:6-8; tea-tracker/federation.config.js:10-12; sticky-notes/federation.config.js:10-12). Instruction to add Native Federation to host too (README.md:307) repeats technology.

**5. README.md:173.** Tea-tracker only exposes `./App`, without remotes or manifest (tea-tracker/federation.config.js:4-8; tea-tracker/src/main.ts:3), and host loads it on route `tea-tracker` (test-base/src/app/app.routes.ts:12-15). Sticky-notes has same role (3.4.5 #1), but README omits its configuration.

**6. README.md:187.** Both remote `federation.config.js` files declare exposed `./App` (tea-tracker/federation.config.js:6-8; sticky-notes/federation.config.js:6-8); host file lacks `exposes` (test-base/federation.config.js:3-8). Code-block explanation repeats claim: "**`exposes`**: What this app makes available to others" (README.md:273).

**7. README.md:188.** Target `build` in `angular.json` uses builder `@angular-architects/native-federation:build` over project `esbuild` target (tea-tracker/angular.json:16-29), same in all three applications (3.4.2; 3.4.6 #1-#3).

**8. README.md:276-277.** Three configurations use `shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' })` (test-base/federation.config.js:7; tea-tracker/federation.config.js:11; sticky-notes/federation.config.js:11), and three applications depend on same Angular (`@angular/core` `^21.0.0`, test-base/package.json:30; tea-tracker/package.json:30; sticky-notes/package.json:30), so libraries are used by multiple units.

**9. README.md:288.** `test-base` hosts both relationships (3.4.5 #1, #2): initializes federation with manifest (test-base/src/main.ts:3), exposing nothing (test-base/federation.config.js:3-8). Tutorial repeats role when selecting type `dynamic-host`, "because this app will LOAD other apps" (README.md:316-318), and differentiating types (README.md:323-325). Host is dynamic because it reads remotes from manifest at runtime rather than fixing them in configuration.

**10. README.md:329.** Each remote enters host through route with `loadComponent` (test-base/src/app/app.routes.ts:12-19), registered through `provideRouter` (test-base/src/app/app.config.ts:9), recorded by source-code review as `host-relationship` (3.4.4). Comment "// The Micro Frontends" (test-base/src/app/app.routes.ts:11) marks routes.

**11. README.md:357.** Route `tea-tracker` calls `loadRemoteModule('tea-tracker', './App')` inside `loadComponent`, loading remote only upon route visit (test-base/src/app/app.routes.ts:13-14). Route `sticky-notes` does same (test-base/src/app/app.routes.ts:17-18).

**12. README.md:364.** Manifest maps `tea-tracker` and `sticky-notes` to `remoteEntry.json` on `localhost` (test-base/public/federation.manifest.json:2-3), and host passes it to `initFederation` (test-base/src/main.ts:3). Location differs from tutorial: `public/`, copied as asset (test-base/angular.json:48-53), rather than `src/assets/` (README.md:366). Value explanation, "The URL where Native Federation can find this remote app" (README.md:383), repeats claim.

**13. README.md:401-404.** Host calls `initFederation('federation.manifest.json')` before bootstrap (test-base/src/main.ts:1-6), and manifest enters build as asset (test-base/angular.json:48-53). Source-code review records call as composition construct (3.4.4). "Discovers available micro frontends" corresponds to two manifest names; no other snapshot discovery mechanism.

**14. README.md:413.** Manifest points to remote development servers (test-base/public/federation.manifest.json:2-3), so host only displays remote while its server runs, as build and deployment review records (3.4.6, Repository overview). "BOTH" applies at tutorial point where only tea-tracker exists; snapshot has three applications.

**15. README.md:440-441.** Host menu links both remote routes (test-base/src/app/app.html:12, 17), and remote component appears in host `<router-outlet>` (test-base/src/app/app.html:26). Cited images (README.md:434-438) were not considered.

**16. README.md:445-447.** Tea-tracker code comes from `http://localhost:4222/remoteEntry.json` (test-base/public/federation.manifest.json:2), loaded through route `loadRemoteModule` (test-base/src/app/app.routes.ts:13-14). Switching without page reload matches Angular router navigation through `routerLink` (test-base/src/app/app.html:12) and `<router-outlet>` (test-base/src/app/app.html:26).

## Summary

Claims: 16 (corroborated: 15, partial: 0, contradicted: 0, uncorroborated: 1). Themes: (structure: 3, composition: 10, build-deploy: 2, independence: 1).
