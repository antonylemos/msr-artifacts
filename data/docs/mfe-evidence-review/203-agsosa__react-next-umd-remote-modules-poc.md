---
schema: 1
id: 1027727587
full_name: agsosa/react-next-umd-remote-modules-poc
commit: 130ddb6f8b73b85ec0065160bc49a764c80d49ba
inputs:
  - docs/mfe-dependency-review
  - docs/mfe-structure-review
  - docs/mfe-source-review
  - docs/mfe-composition-review
  - docs/mfe-build-deploy-review
  - docs/mfe-documentation-review
  - docs/mfe-history-review
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 203 — agsosa/react-next-umd-remote-modules-poc

## Repository overview

Composition uses no MFE library: dependency review found no integration technology, no technology observation. Two Next.js applications, `mf-1` and `shell`, each with own manifest, entry and build (#11, #12). Chain uses only UMD bundle and browser:
- **Configuration:** `mf-1` Vite packages three React components into UMD `bundle.js`, publishing global `MF1_RemoteModules`, leaving React and ReactDOM as external globals (#1). `shell` configuration stores `mf-1` base URL, defaulting to its development-server port (#2).
- **Host code:** generic hook injects `<script>` and reads component from global (#3). Three shell components pass bundle URL and component name to hook (#5, #7, #9), rendering with shell props and callbacks (#6, #8, #10).
- **Relationship:** produces sole active relationship `shell → mf-1` (#13).

Build separate in both applications (#14, #15). Remote bundle comes from same `mf-1` build, served from its `public` folder. No deployment artifact in snapshot.

Misleading signal: mined `postMessage` in generated bundle belongs to embedded axios rather than inter-unit communication (#4).

Documentation has 23 claims, all weak under protocol criterion. Most corroborated by observations above. One uncorroborated: Vercel addresses (#17). Two contradicted: shell "only needs a `<script>` tag" (#31), although it also exposes React on `window` and reads configured URL; "shared interfaces" (#33), actually two identical copies. One partially corroborated: bundle could be published elsewhere (#37). Three historical points explain those claims (#39, #40, #41), with no open snapshot ambiguity.

Cited blocks without composition element excluded from dimension 2: `Cache-Control` header for `/remote-modules/:path*` in mf-1/next.config.ts:9-23, server configuration (in #14), and `package.json` scripts/React versions.

## Observations

### 1. mf-1/vite.mf.ts:27-47

**Observation:** Block `build` has `outDir: "public/remote-modules"`, `input: "src/RemoteModules/RemoteModules.ts"`, `external: ["react", "react-dom"]` and `output` with `entryFileNames: "bundle.js"`, `format: "umd"`, `name: "MF1_RemoteModules"` and `globals` `React` and `ReactDOM`. Comments say shell must supply react/react-dom and global name must be unique.

**Interpretation:** `mf-1` configured to publish components as UMD script exposing own global and expecting host React.

### 2. shell/next.config.js:7-9

**Observation:** `publicRuntimeConfig` defines `MF1_BASE_URL: process.env.MF1_BASE_URL || 'http://localhost:3001'`.

**Interpretation:** Host declares `mf-1` address, environment-configurable, defaulting to development `mf-1` port.

### 3. shell/src/hooks/useRemoteModule.ts:79

**Observation:** Hook `useRemoteModule` creates `script` with received URL, appends to `head` and, in `onload`, reads `window[moduleName][componentName]`. First exposes `window.React` and `window.ReactDOM`.

**Interpretation:** Host has generic UMD-bundle loader through `<script>`, receiving bundle and component as parameters.

### 4. mf-1/public/remote-modules/bundle.js:10

**Observation:** Mined `postMessage(r,"*")` is in generated bundle, on line containing `` `axios@${Math.random()}` ``.

**Interpretation:** Axios `setImmediate` polyfill, messaging own window. Not inter-unit communication: false positive.

### 5. shell/src/components/RemoteHeader.tsx:18-22; shell/next.config.js:8

**Observation:** `useRemoteModule<HeaderProps>({ url: MF1_BASE_URL + "/remote-modules/bundle.js", moduleName: "MF1_RemoteModules", componentName: "Header" })`.

**Interpretation:** Host points to `mf-1` bundle, requesting component `Header`.

### 6. shell/src/components/RemoteHeader.tsx:37

**Observation:** `<Header appName="Shell App" router={router} onMount={handleMount} />`, with `Header` obtained by hook. Shell passes own Next `router`.

**Interpretation:** Host renders remote component in own React tree with props and callbacks.

### 7. shell/src/components/RemoteFulfilment.tsx:29-33; shell/next.config.js:8

**Observation:** `useRemoteModule<FulfilmentProps>({ url: MF1_BASE_URL + '/remote-modules/bundle.js', moduleName: 'MF1_RemoteModules', componentName: 'Fulfilment' })`.

**Interpretation:** Host points to same `mf-1` bundle, requesting component `Fulfilment`.

### 8. shell/src/components/RemoteFulfilment.tsx:65-68

**Observation:** `<Fulfilment onFulfil={onFulfil} onTrack={onTrack} />`, with component obtained by hook.

**Interpretation:** Host renders remote component with own callbacks.

### 9. shell/src/components/RemoteFulfilmentDetails.tsx:29-33; shell/next.config.js:8

**Observation:** `useRemoteModule<FulfilmentDetailsProps>({ url: MF1_BASE_URL + '/remote-modules/bundle.js', moduleName: 'MF1_RemoteModules', componentName: 'FulfilmentDetails' })`.

**Interpretation:** Host points to `mf-1` bundle, requesting component `FulfilmentDetails`.

### 10. shell/src/components/RemoteFulfilmentDetails.tsx:65-68

**Observation:** `<FulfilmentDetailsComponent orderId={orderId} onStatusChange={onStatusChange} />`, with component obtained by hook.

**Interpretation:** Host renders remote component with own props and callback.

### 11. mf-1; mf-1/package.json:8, 11; mf-1/src/pages/_app.tsx:5; mf-1/src/pages/index.tsx:11; mf-1/vite.mf.ts:27-47; mf-1/next.config.ts:5-32

**Observation:** Next.js application (Pages Router) with own manifest, entry and build. Same build generates UMD remote component bundle with Vite.

**Interpretation:** Frontend unit with own boundary, also supplying components to another.

### 12. shell; shell/package.json:7; shell/src/pages/_app.tsx:5; shell/src/pages/index.tsx:138; shell/next.config.js:2-18

**Observation:** Next.js application (Pages Router) with own manifest, entry and build.

**Interpretation:** Frontend unit with own boundary.

### 13. shell/src/hooks/useRemoteModule.ts:79-99; shell/src/components/RemoteHeader.tsx:18-22, 37; shell/src/components/RemoteFulfilment.tsx:29-33, 65-68; shell/src/components/RemoteFulfilmentDetails.tsx:29-33, 65-68; mf-1/vite.mf.ts:28, 33, 35, 37-39; shell/next.config.js:8

**Observation:** Shell loads `MF1_BASE_URL + "/remote-modules/bundle.js"` through `<script>`, reading `Header`, `Fulfilment` and `FulfilmentDetails` from global `MF1_RemoteModules`. File and global match Vite build of `mf-1`. Components used in shell pages.

**Interpretation:** An active `host → remote` relationship through `script` mechanism, target entering as component module in host tree.

### 14. mf-1/package.json:8, 11; mf-1/vite.mf.ts:27-47; mf-1/next.config.ts:9-23

**Observation:** `build` of `mf-1` runs `vite build --config vite.mf.ts`, then `next build`. Bundle output in `public/remote-modules`, served by Next itself with `Cache-Control` in production. No deployment artifact, fixed bundle name.

**Interpretation:** Own build boundary without observed deployment or independent versioning. Remote bundle not published separately from application.

### 15. shell/package.json:7; shell/next.config.js:7-9

**Observation:** `shell` builds with `next build` in own directory, without `mf-1` code, arriving only at runtime through configured URL. No deployment artifact.

**Interpretation:** Own build boundary without observed deployment or independent versioning.

### 16. README.md:3

**Observation:** "A proof-of-concept implementation of microfrontends using UMD (Universal Module Definition) format with Next.js and React, enabling remote component sharing between applications".

**Interpretation:** Presents project as microfrontends sharing components through UMD bundle. Claim corroborated.

### 17. README.md:7-8

**Observation:** "**Shell App**: https://umd-remote-modules-poc-shell.vercel.app/", "**MF1**: https://umd-remote-modules-poc-mf1.vercel.app/".

**Interpretation:** Indicates separate publication per application. No snapshot deployment artifact: claim uncorroborated.

### 18. README.md:12

**Observation:** "This solution implements **UMD-based Microfrontends** (not Module Federation)".

**Interpretation:** Names UMD format, denies Module Federation usage. Claim corroborated.

### 19. README.md:14

**Observation:** "**Shell App**: A Next.js application that consumes remote components from MF1".

**Interpretation:** Claims shell consumes `mf-1` components. Claim corroborated.

### 20. README.md:15

**Observation:** "**MF1**: A Next.js application that also uses its own components internally AND exposes them as UMD bundles for remote consumption".

**Interpretation:** Claims `mf-1` uses components on own pages, exposing to another application. Claim corroborated.

### 21. README.md:16

**Observation:** "**Remote Loading**: Components are loaded dynamically via script tags".

**Interpretation:** Names loading through `<script>`. Claim corroborated.

### 22. README.md:24

**Observation:** "MF1 runs as a standalone Next.js application that uses its own components locally".

**Interpretation:** Claims `mf-1` runs standalone. Claim corroborated.

### 23. README.md:26

**Observation:** "MF1 also uses Vite to compile the same React components into a UMD bundle for remote consumption".

**Interpretation:** Describes remote bundle build inside `mf-1`. Claim corroborated.

### 24. README.md:58

**Observation:** "The shell app uses a reusable hook to load and consume remote components".

**Interpretation:** Claims shell consumes remote components through a single hook. Claim corroborated.

### 25. README.md:74

**Observation:** "**Global Access**: Components become available via `window.MF1_RemoteModules`".

**Interpretation:** Describes access through bundle global. Claim corroborated.

### 26. README.md:75-76

**Observation:** "Components are treated as normal React components", "React renders them seamlessly into the shell's component tree".

**Interpretation:** Claims remote components enter shell tree as ordinary components. Claim corroborated.

### 27. README.md:86

**Observation:** "Next.js development server + Vite watch mode for exported remote components".

**Interpretation:** Describes `mf-1` development mode, rebuilding bundle on each change. Claim corroborated.

### 28. README.md:100

**Observation:** "**Remote Bundle**: http://localhost:3001/remote-modules/bundle.js (UMD bundle for Shell)".

**Interpretation:** Claims bundle served by `mf-1`. Claim corroborated.

### 29. README.md:104

**Observation:** "router state is passed as props".

**Interpretation:** Claims shell/remote contract passes routing through props. Claim corroborated.

### 30. README.md:114-117

**Observation:** "The `useRemoteModule` hook implements: - **Script caching**: Prevents duplicate loads - **Component memoization**: Improves performance - **Error handling**: Graceful fallbacks".

**Interpretation:** Describes loader features. Claim corroborated.

### 31. README.md:124

**Observation:** "**Simple Setup**: No complex module-federation configuration. The shell app only needs a `<script>` tag."

**Interpretation:** Claims host only needs `<script>`. Shell also exposes React and ReactDOM on `window`, reading remote URL from configuration, contradicting claim.

### 32. README.md:125

**Observation:** "**Standalone Development**: Each microfrontend can be developed independently".

**Interpretation:** Claims each application developed standalone. Claim corroborated.

### 33. README.md:127

**Observation:** "**TypeScript Support**: Full type safety with shared interfaces".

**Interpretation:** Claims interfaces common to units. Two identical copies, one per unit without common module, contradict claim.

### 34. README.md:132

**Observation:** "**Global Namespace**: Each microfrontend needs unique global names".

**Interpretation:** Describes global-mechanism requirement. Claim corroborated.

### 35. README.md:133

**Observation:** "**Dependency Management**: External dependencies must be managed carefully".

**Interpretation:** Indicates coordination of dependencies external to bundle. Claim corroborated.

### 36. README.md:134

**Observation:** "**Runtime Loading**: Components are loaded at runtime, not build time. SSR is not compatible."

**Interpretation:** Claims composition only occurs in browser. Claim corroborated.

### 37. mf-1/vite.mf.ts:28

**Observation:** "podemos subirlo a cualquier otro lugar" (English translation: "we can publish it anywhere else").

**Interpretation:** Supposes bundle can be published outside `mf-1`. Base URL configurable, but no artifact publishes bundle elsewhere: claim partially corroborated.

### 38. mf-1/vite.mf.ts:35

**Observation:** "App shell debe proveer react/react-dom. Debemos coordinar mismas versiones." (English translation: "Shell must supply react/react-dom. We must coordinate the same versions.").

**Interpretation:** Claims host supplies React to remote and versions coordinated. Claim corroborated.

### 39. 6ff5738 2025-07-28 (shell/src/hooks/useRemoteModule.ts); d7937f8 2025-07-28 (shell/next.config.js); faabb25 2025-07-28 (mf-1/vite.mf.ts); 03aa81d 2025-07-28 (README.md); ed8c864 2025-07-28 (README.md)

**Observation:** Hook, `shell/next.config.js` and `mf-1/vite.mf.ts` reach snapshot version before `03aa81d`, creating README, and `ed8c864`, giving it snapshot version. Version from `03aa81d` absent from clone.

**Interpretation:** Sentence "only needs a `<script>` tag" does not remain from earlier code stage: coexists with contradicting code. Point clarified.

### 40. ff692cd 2025-07-28 (mf-1/src/types/remote-components.d.ts, shell/src/types/mf1-remote-components.d.ts); 397b98c 2025-07-28 (mf-1/src/types/remote-components.d.ts, shell/src/types/mf1-remote-components.d.ts)

**Observation:** Both type files originate in same commit with same object, changing together to same snapshot object. No commit creates type file in common location.

**Interpretation:** Interfaces duplicated from outset, kept identical through copying, never extracted. Point clarified.

### 41. b50998d 2025-07-28 (mf-1/public/remote-components/bundle.js); 0f9ffc9 2025-07-28 (mf-1/public/remote-modules/bundle.js); 397b98c 2025-07-28 (mf-1/public/remote-components/bundle.js); faabb25 2025-07-28 (mf-1/vite.mf.ts)

**Observation:** Bundle always in `mf-1/public`, first in `remote-components/`, then `remote-modules/`. None of 17 commits creates publication artifact. Comment in version `faabb25`, earlier versions absent from clone.

**Interpretation:** Publication elsewhere is recorded alternative rather than abandoned stage. Point clarified.

## Classification

| # | Origin | Dimension | Type | Approach | Evidence | Strength | Relationships |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.3 (mf-1, Entry and Build); 3.4.4 (shell/src/hooks/useRemoteModule.ts:79, Observation); 3.4.5 #1 (Configuration); 3.4.6 #1 (Where served, Artifacts); 3.4.7 #1, #8, #10, #13, #16, #19, #20, #23 (Evidence); 3.4.7 #22, #23 (Document) | 2 configuration | configuration | script | technological | moderate | configures #11; configures #13 |
| 2 | 3.4.3 (shell, Build); 3.4.4 (shell/src/components/RemoteHeader.tsx:18, Observation); 3.4.5 #1 (Configuration); 3.4.6 #2 (Artifacts); 3.4.7 #16, #22 (Evidence) | 2 configuration | configuration | script | architectural | strong | configures #5; configures #7; configures #9; configures #13 |
| 3 | 3.4.4 (shell/src/hooks/useRemoteModule.ts:79) | 3 code | source code | script | technological | moderate | implements #13 |
| 4 | 3.4.4 (mf-1/public/remote-modules/bundle.js:10) | 3 code | source code | — | context | weak | — |
| 5 | 3.4.4 (shell/src/components/RemoteHeader.tsx:18) | 3 code | source code | script | architectural | strong | implements #13 |
| 6 | 3.4.4 (shell/src/components/RemoteHeader.tsx:37) | 3 code | source code | script | technological | moderate | implements #13 |
| 7 | 3.4.4 (shell/src/components/RemoteFulfilment.tsx:29) | 3 code | source code | script | architectural | strong | implements #13 |
| 8 | 3.4.4 (shell/src/components/RemoteFulfilment.tsx:65) | 3 code | source code | script | technological | moderate | implements #13 |
| 9 | 3.4.4 (shell/src/components/RemoteFulfilmentDetails.tsx:29) | 3 code | source code | script | architectural | strong | implements #13 |
| 10 | 3.4.4 (shell/src/components/RemoteFulfilmentDetails.tsx:65) | 3 code | source code | script | technological | moderate | implements #13 |
| 11 | 3.4.3 (mf-1) | 4 structure | directory | — | architectural | moderate | — |
| 12 | 3.4.3 (shell) | 4 structure | directory | — | architectural | moderate | — |
| 13 | 3.4.5 #1 | 5 composition | source code | script | architectural | strong | links #12; links #11 |
| 14 | 3.4.6 #1 | 6 build-deploy | configuration | — | architectural | moderate | publishes #11 |
| 15 | 3.4.6 #2 | 6 build-deploy | configuration | — | architectural | moderate | publishes #12 |
| 16 | 3.4.7 #1 | 7 documentation | documentation | script | architectural | weak | corroborates #11; corroborates #12; corroborates #13; corroborates #1 |
| 17 | 3.4.7 #2 | 7 documentation | documentation | — | architectural | weak | — |
| 18 | 3.4.7 #3 | 7 documentation | documentation | script | technological | weak | corroborates #13 |
| 19 | 3.4.7 #4 | 7 documentation | documentation | — | architectural | weak | corroborates #12; corroborates #13 |
| 20 | 3.4.7 #5 | 7 documentation | documentation | script | architectural | weak | corroborates #11; corroborates #1; corroborates mf-1/src/pages/index.tsx:3-4 |
| 21 | 3.4.7 #6 | 7 documentation | documentation | script | technological | weak | corroborates #3; corroborates #13 |
| 22 | 3.4.7 #7 | 7 documentation | documentation | — | architectural | weak | corroborates #11 |
| 23 | 3.4.7 #8 | 7 documentation | documentation | script | architectural | weak | corroborates #14; corroborates #1 |
| 24 | 3.4.7 #9 | 7 documentation | documentation | — | architectural | weak | corroborates #5; corroborates #7; corroborates #9 |
| 25 | 3.4.7 #10 | 7 documentation | documentation | script | technological | weak | corroborates #1; corroborates #3; corroborates #13 |
| 26 | 3.4.7 #11 | 7 documentation | documentation | — | architectural | weak | corroborates #6; corroborates #8; corroborates #10; corroborates #13 |
| 27 | 3.4.7 #12 | 7 documentation | documentation | — | technological | weak | corroborates mf-1/package.json:6-7, 12 |
| 28 | 3.4.7 #13 | 7 documentation | documentation | script | architectural | weak | corroborates #14; corroborates #1 |
| 29 | 3.4.7 #14 | 7 documentation | documentation | — | architectural | weak | corroborates #6 |
| 30 | 3.4.7 #15 | 7 documentation | documentation | script | technological | weak | corroborates #3; corroborates shell/src/components/RemoteHeader.tsx:24-31 |
| 31 | 3.4.7 #16 | 7 documentation | documentation | script | technological | weak | contradicts #3; contradicts #1; contradicts #2 |
| 32 | 3.4.7 #17 | 7 documentation | documentation | — | architectural | weak | corroborates #11; corroborates #12 |
| 33 | 3.4.7 #18 | 7 documentation | documentation | — | architectural | weak | contradicts mf-1/src/types/remote-components.d.ts:3-29; contradicts shell/src/types/mf1-remote-components.d.ts:3-29 |
| 34 | 3.4.7 #19 | 7 documentation | documentation | script | technological | weak | corroborates #1; corroborates #3 |
| 35 | 3.4.7 #20 | 7 documentation | documentation | — | technological | weak | corroborates #1; corroborates mf-1/package.json:17-18; corroborates shell/package.json:13-14 |
| 36 | 3.4.7 #21 | 7 documentation | documentation | — | technological | weak | corroborates #3; corroborates #13; corroborates #15 |
| 37 | 3.4.7 #22 | 7 documentation | comment | — | architectural | weak | partially corroborates #2; partially corroborates #5 |
| 38 | 3.4.7 #23 | 7 documentation | comment | — | architectural | weak | corroborates #3; corroborates #1; corroborates mf-1/package.json:17-18; corroborates shell/package.json:13-14 |
| 39 | 3.4.8 #1 | 8 history | history | script | technological | weak | explains #31 |
| 40 | 3.4.8 #2 | 8 history | history | — | architectural | weak | explains #33 |
| 41 | 3.4.8 #3 | 8 history | history | — | architectural | weak | explains #37 |

## Summary

Observations: 41. Dimensions (technology: 0, configuration: 2, code: 8, structure: 2, composition: 1, build-deploy: 2, documentation: 23, history: 3). Strength (strong: 5, moderate: 9, weak: 27, ambiguous: 0). Evidence (technological: 15, architectural: 25, context: 1).

