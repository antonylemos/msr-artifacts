---
schema: 1
id: 1027727587
full_name: agsosa/react-next-umd-remote-modules-poc
commit: 130ddb6f8b73b85ec0065160bc49a764c80d49ba
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

# 203 — agsosa/react-next-umd-remote-modules-poc

## Repository overview

`artifacts.csv` has three documents: root `README.md`, `mf-1/README.md`, `shell/README.md`. Last two identical standard create-next-app READMEs (shell/README.md:1, 25, 36-40), without project claims/rows. All project documentation in English root `README.md`. It presents UMD microfrontend proof of concept with two Next.js applications, `Shell App` and `MF1`, explicitly without Module Federation (README.md:1-3, 12-17). Explains `mf-1` using components on own pages and compiling through Vite into UMD bundle (README.md:22-54), shell loading bundle through hook/rendering components (README.md:56-76), ending with run instructions/advantages/cautions (README.md:78-138). Code comments Spanish.

Existing-behavior descriptions match previous reviews. Two units `mf-1`/`shell` (3.4.3), one `host → remote` relationship through injected `<script>` reading global `MF1_RemoteModules` (3.4.5 #1). Dependency review found no integration technology (3.4.2), confirming "not Module Federation". Differences: Vercel publication address without deployment configuration (claim 2), shell "only needs a `<script>` tag" (claim 16), "shared interfaces" (claim 18), actually identical copies per unit.

Excluded from table:
- Title `doc-*` occurrences: README.md:1 (`doc-mfe-term`, "# UMD-based Microfrontends PoC"), README.md:56 (`doc-host-remote`, "### 2. Shell App Remote Loading"), README.md:121 (`doc-mfe-term`, "## ✅ Advantages of UMD based microfrontends");
- Two repeating `doc-*` occurrences in respective paragraphs: README.md:17 (`doc-host-remote`, "Dual Usage") in claim 5; README.md:138 (`doc-mfe-term`, `doc-integration-technology`) in claims 1 and 3;
- Configuration/source reproductions:
  - README.md:28-47 summarizes mf-1/vite.mf.ts:27-47, using `input: './src/RemoteModules/RemoteModules.ts'` rather than `"src/RemoteModules/RemoteModules.ts"` (mf-1/vite.mf.ts:33), without `outDir`/`entryFileNames` (mf-1/vite.mf.ts:28, 37);
  - README.md:50-52 reproduces mf-1/src/RemoteModules/RemoteModules.ts:10;
  - README.md:60-67 uses fixed `http://localhost:3001/remote-modules/bundle.js`. Code constructs URL through `MF1_BASE_URL` (shell/src/components/RemoteHeader.tsx:19; shell/next.config.js:8);
  - README.md:106-110 summarizes shell/src/components/RemoteHeader.tsx:12, 37;
- Run instructions, each application in own terminal (README.md:80-94), matching directory `dev` scripts (mf-1/package.json:6; shell/package.json:6);
- Development ports README.md:98-99. 3001 matches mf-1/package.json:7, 3000 shell `next dev` default (shell/package.json:6);
- Cache header, "The **mf-1** `next.config` also sets Cache-Control headers" (README.md:119), server detail matching mf-1/next.config.ts:9-23, production only;
- "Framework Agnostic: UMD works with any JavaScript environment" (README.md:123), about format rather than units. Project bundle depends on globals `React`/`ReactDOM` (mf-1/vite.mf.ts:35, 42-45);
- "Full type safety", claim 18 portion, not architectural. Both Next configurations ignore TypeScript build errors: "ignore eslint/typescript for now, this is just a PoC" (mf-1/next.config.ts:25, 29-31; shell/next.config.js:11, 15-17).

Comments read in previously cited artifacts:
- mf-1/vite.mf.ts. :28/:35 become claims 22/23. :39 ("DEBE SER UN NOMBRE UNICO", English translation: "Must be unique name") in claim 19, :42 refers to :35. :8-9, :41, :51 concern environment variables/CSS/alias, no rows. :9 requests "INYECTAR LAS VARIABLES DE ENTORNO RUNTIME EN LOS PODS DE KUBERNETES" (English translation: "Inject runtime environment variables into Kubernetes pods") as pending, no snapshot Kubernetes manifest per 3.4.6;
- mf-1/next.config.ts:6, :25;
- shell/next.config.js:11;
- shell/src/hooks/useRemoteModule.ts. :11, :21, :27, :35, :39, :46, :54, :57, :69, :72, :78 describe loader steps. :11 ("Cache global para evitar cargas duplicadas", English translation: "Global cache avoiding duplicate loads") in claim 15; :35 ("Preparar React globalmente", English translation: "Prepare React globally") in claim 23;
- mf-1/src/RemoteModules/Fulfilment.tsx:216, 246, mf-1/src/RemoteModules/FulfilmentDetails.tsx:272 ("Notificar al shell", English translation: "Notify shell"). Describe callbacks recorded in 3.4.4 without additional claims.

`package.json` files lack `description`.

## Claims

| # | Document | Claim | Theme | Corroboration | Evidence |
|---|---|---|---|---|---|
| 1 | README.md:3 | "A proof-of-concept implementation of microfrontends using UMD (Universal Module Definition) format with Next.js and React, enabling remote component sharing between applications" | structure | corroborated | 3.4.3 (mf-1, shell `Yes`); 3.4.5 #1; mf-1/vite.mf.ts:38 |
| 2 | README.md:7-8 | "**Shell App**: https://umd-remote-modules-poc-shell.vercel.app/", "**MF1**: https://umd-remote-modules-poc-mf1.vercel.app/" | build-deploy | uncorroborated | — |
| 3 | README.md:12 | "This solution implements **UMD-based Microfrontends** (not Module Federation)" | composition | corroborated | 3.4.2 (no technology dependencies); 3.4.5 #1 (mechanism `script`) |
| 4 | README.md:14 | "**Shell App**: A Next.js application that consumes remote components from MF1" | structure | corroborated | 3.4.3 (shell `Yes`); 3.4.5 #1 |
| 5 | README.md:15 | "**MF1**: A Next.js application that also uses its own components internally AND exposes them as UMD bundles for remote consumption" | structure | corroborated | 3.4.3 (mf-1 `Yes`); 3.4.4 (Notes); mf-1/src/pages/index.tsx:3-4; mf-1/src/RemoteModules/RemoteModules.ts:10 |
| 6 | README.md:16 | "**Remote Loading**: Components are loaded dynamically via script tags" | composition | corroborated | 3.4.4 (script-loading: 4); 3.4.5 #1; shell/src/hooks/useRemoteModule.ts:79-80, 99 |
| 7 | README.md:24 | "MF1 runs as a standalone Next.js application that uses its own components locally" | independence | corroborated | 3.4.3 (mf-1: own Entry and Build); mf-1/package.json:7; mf-1/src/pages/index.tsx:3-4 |
| 8 | README.md:26 | "MF1 also uses Vite to compile the same React components into a UMD bundle for remote consumption" | build-deploy | corroborated | 3.4.6 #1; mf-1/package.json:8, 11; mf-1/vite.mf.ts:33, 38 |
| 9 | README.md:58 | "The shell app uses a reusable hook to load and consume remote components" | composition | corroborated | 3.4.4 (shell/src/components/RemoteHeader.tsx:18; shell/src/components/RemoteFulfilment.tsx:29; shell/src/components/RemoteFulfilmentDetails.tsx:29) |
| 10 | README.md:74 | "**Global Access**: Components become available via `window.MF1_RemoteModules`" | composition | corroborated | 3.4.5 #1; mf-1/vite.mf.ts:39; shell/src/hooks/useRemoteModule.ts:23-24 |
| 11 | README.md:75-76 | "Components are treated as normal React components", "React renders them seamlessly into the shell's component tree" | composition | corroborated | 3.4.4 (runtime-composition: 3); 3.4.5 #1; shell/src/components/RemoteHeader.tsx:37 |
| 12 | README.md:86 | "Next.js development server + Vite watch mode for exported remote components" | build-deploy | corroborated | mf-1/package.json:6-7, 12 |
| 13 | README.md:100 | "**Remote Bundle**: http://localhost:3001/remote-modules/bundle.js (UMD bundle for Shell)" | build-deploy | corroborated | 3.4.6 #1; mf-1/vite.mf.ts:28, 37; mf-1/package.json:7 |
| 14 | README.md:104 | "router state is passed as props" | composition | corroborated | 3.4.4 (shell/src/components/RemoteHeader.tsx:37); mf-1/src/RemoteModules/Header.tsx:51, 83-85, 104-106 |
| 15 | README.md:114-117 | "The `useRemoteModule` hook implements: - **Script caching**: Prevents duplicate loads - **Component memoization**: Improves performance - **Error handling**: Graceful fallbacks" | composition | corroborated | shell/src/hooks/useRemoteModule.ts:11-13, 46-75, 94-97; shell/src/components/RemoteHeader.tsx:24-31 |
| 16 | README.md:124 | "**Simple Setup**: No complex module-federation configuration. The shell app only needs a `<script>` tag." | composition | contradicted | 3.4.4 (shell/src/hooks/useRemoteModule.ts:79); shell/src/hooks/useRemoteModule.ts:36-37; mf-1/vite.mf.ts:35, 42-45; shell/next.config.js:7-9 |
| 17 | README.md:125 | "**Standalone Development**: Each microfrontend can be developed independently" | independence | corroborated | 3.4.3 (Manifest, Entry and Build per unit; Notes); mf-1/package.json:6; shell/package.json:6 |
| 18 | README.md:127 | "**TypeScript Support**: Full type safety with shared interfaces" | structure | contradicted | mf-1/src/types/remote-components.d.ts:3-29; shell/src/types/mf1-remote-components.d.ts:3-29; mf-1/src/RemoteModules/Header.tsx:2; shell/src/components/RemoteHeader.tsx:4 |
| 19 | README.md:132 | "**Global Namespace**: Each microfrontend needs unique global names" | composition | corroborated | mf-1/vite.mf.ts:39; shell/src/hooks/useRemoteModule.ts:23 |
| 20 | README.md:133 | "**Dependency Management**: External dependencies must be managed carefully" | composition | corroborated | mf-1/vite.mf.ts:35, 42-45; mf-1/package.json:17-18; shell/package.json:13-14 |
| 21 | README.md:134 | "**Runtime Loading**: Components are loaded at runtime, not build time. SSR is not compatible." | composition | corroborated | 3.4.5 #1; 3.4.6 #2; shell/src/hooks/useRemoteModule.ts:20, 79-99 |
| 22 | mf-1/vite.mf.ts:28 | "podemos subirlo a cualquier otro lugar" (English translation: we can publish it anywhere else) | build-deploy | partial | 3.4.6 #1; shell/next.config.js:8; shell/src/components/RemoteHeader.tsx:19 |
| 23 | mf-1/vite.mf.ts:35 | "App shell debe proveer react/react-dom. Debemos coordinar mismas versiones." (English translation: shell must provide react/react-dom; coordinate same versions) | composition | corroborated | shell/src/hooks/useRemoteModule.ts:36-37; mf-1/vite.mf.ts:42-45; mf-1/package.json:17-18; shell/package.json:13-14 |

## Observations

**1. README.md:3.** Presents microfrontends sharing components between applications through UMD bundle. Two frontend units (3.4.3), `mf-1` generates `format: "umd"` bundle (mf-1/vite.mf.ts:38), shell consumes at runtime (3.4.5 #1). "similar to Module Federation" at sentence end merely compares, without claiming technology use; next sentence denies it (claim 3). Conclusion (README.md:138) repeats idea: "a clean, maintainable solution for microfrontend development [...] offering the benefits of component sharing".

**2. README.md:7-8.** "Live deployment" lists Vercel address per application, indicating separate publication. No `vercel.json`, workflow, hosting configuration; 3.4.6 records Deploy `not observed` for both. `.gitignore` files only ignore `.vercel`, as 3.4.6 notes.

**3. README.md:12.** "UMD-based Microfrontends" repeats claim 1; added denial "not Module Federation". No integration technology found (3.4.2), relationship mechanism `script` without federation runtime (3.4.5 #1). README.md:124 ("No complex module-federation configuration"), README.md:138 ("without the complexity of Module Federation") repeat denial.

**4. README.md:14.** Shell hosts sole relationship, `shell → mf-1` (3.4.5 #1). Three consumed components from `mf-1` bundle (shell/src/components/RemoteHeader.tsx:18-22; shell/src/components/RemoteFulfilment.tsx:29-33; shell/src/components/RemoteFulfilmentDetails.tsx:29-33).

**5. README.md:15.** `mf-1` statically imports `Header`/`Fulfilment` on own pages (mf-1/src/pages/index.tsx:3-4), internal use in 3.4.4 Notes. Same `RemoteModules` directory is bundle entry (mf-1/src/RemoteModules/RemoteModules.ts:10; mf-1/vite.mf.ts:33). README plural "UMD bundles", but sole generated `bundle.js` (mf-1/vite.mf.ts:37) contains three components. README.md:17 ("Dual Usage"), README.md:54, README.md:126 ("Component Reusability") repeat claim. Exposed components wrapped by `withProviders` (mf-1/src/RemoteModules/RemoteModules.ts:6-8), `mf-1` pages importing without wrapper. Internal detail.

**6. README.md:16.** Loading through `<script>` created by hook `useRemoteModule`, appended to `head` (shell/src/hooks/useRemoteModule.ts:79-80, 99), recorded `script-loading` in 3.4.4. README.md:73 ("Dynamic script tag injection loads the UMD bundle") repeats claim.

**7. README.md:24.** `mf-1` has own entry/build (3.4.3), starts independently on port 3001 (mf-1/package.json:7), using components locally (mf-1/src/pages/index.tsx:3-4). README.md:99 ("**MF1 Standalone**: http://localhost:3001") repeats claim.

**8. README.md:26.** Script `build:vite` runs `vite build --config vite.mf.ts` (mf-1/package.json:11), `build` invoking before `next build` (mf-1/package.json:8). Entry `src/RemoteModules/RemoteModules.ts`, format `umd` (mf-1/vite.mf.ts:33, 38). Claim 5 says `mf-1` exposes UMD bundle; this names Vite build mechanism, separate row.

**9. README.md:58.** Sole hook `useRemoteModule`, called by shell in three remote wrappers (3.4.4), hence "reusable".

**10. README.md:74.** Build defines `name: "MF1_RemoteModules"` (mf-1/vite.mf.ts:39), hook reads `window[moduleName][componentName]` (shell/src/hooks/useRemoteModule.ts:23-24), `moduleName: "MF1_RemoteModules"` (shell/src/components/RemoteHeader.tsx:20). Shell global typing declares `Window.MF1_RemoteModules` (shell/src/types/mf1-remote-components.d.ts:25-28).

**11. README.md:75-76.** Hook returns globally read component, shell renders as regular JSX with props/callbacks (shell/src/components/RemoteHeader.tsx:37; 3.4.4, runtime-composition: 3). 3.4.5 #1 records target entering shell tree as component module without `mount`/`render` API. Shell exposes `window.React` before bundle loading (shell/src/hooks/useRemoteModule.ts:36-37), allowing remote components same React instance (claim 23).

**12. README.md:86.** Claim in command `npm run dev` comment. `dev` of `mf-1` runs `next dev -p 3001` alongside `vite build --config vite.mf.ts --watch` (mf-1/package.json:6-7, 12). Remote bundle rebuilt per change while application runs.

**13. README.md:100.** Bundle output `public/remote-modules/bundle.js` (mf-1/vite.mf.ts:28, 37), served by own Next server of `mf-1`, development port 3001 (mf-1/package.json:7). 3.4.6 #1 records same in "Onde é servida" (English translation: "Where served"). Comment mf-1/vite.mf.ts:28 repeats ("Aprovechamos la carpeta /public de Next.js para servir nuestro bundle.js", English translation: "Use Next public directory to serve our bundle"), adds claim 22 possibility. Generated file versioned (mf-1/public/remote-modules/bundle.js:1).

**14. README.md:104.** Shell obtains `router` through `useRouter`, passes as prop to remote `Header` (shell/src/components/RemoteHeader.tsx:12, 37). `Header` receives `router` through props, uses navigation/current-link highlighting (mf-1/src/RemoteModules/Header.tsx:51, 83-85, 90-92, 104-106). Rationale ("Since `useRouter` doesn't work in remote components") unverifiable but consistent: `Header` never calls `useRouter`. 3.4.4 records props as inter-unit contract without communication channel.

**15. README.md:114-117.** Script cache is `scriptCache`, checking existing `<script>` in `head` (shell/src/hooks/useRemoteModule.ts:11-12, 54-75), comment "Cache global para evitar cargas duplicadas" (English translation: "Global cache avoiding duplicate loads") (:11). "memoization" is `componentCache` by `moduleName.componentName` (:13, 28-33, 46-52), not `React.memo`. Error handling stores message when script fails/component absent (:63, 89, 94-97), wrappers displaying text instead of component (shell/src/components/RemoteHeader.tsx:24-31). README.md:128 ("Efficient caching") repeats cache.

**16. README.md:124.** "No complex module-federation configuration" repeats claim 3. Second sentence, shell "only needs a `<script>` tag", refuted. Besides `<script>` (shell/src/hooks/useRemoteModule.ts:79), shell must expose `window.React`/`window.ReactDOM` (shell/src/hooks/useRemoteModule.ts:36-37), bundle treating both as external globals (mf-1/vite.mf.ts:35, 42-45). Also needs remote base URL in `publicRuntimeConfig` (shell/next.config.js:7-9), hook awaiting load/reading global component. No shell Module Federation configuration holds.

**17. README.md:125.** Each application has own `package.json`, `package-lock.json`, entry/build, no workspace (3.4.3, Notes), own `npm run dev` (mf-1/package.json:6; shell/package.json:6). `mf-1` runs independently (claim 7). Shell also starts independently, but absent `mf-1`, wrappers fall back to error text (shell/src/components/RemoteHeader.tsx:26-29). Build comments require team coordination on global name/React version (mf-1/vite.mf.ts:35, 39), limiting contract independence rather than development.

**18. README.md:127.** Interfaces `HeaderProps`, `FulfilmentProps`, `FulfilmentDetailsProps`, `MF1_RemoteComponents` exist in both units, separate identical files (mf-1/src/types/remote-components.d.ts:3-29; shell/src/types/mf1-remote-components.d.ts:3-29). Each uses own copy (mf-1/src/RemoteModules/Header.tsx:2; shell/src/components/RemoteHeader.tsx:4). No common package/alias/path connects them. Same definitions copied, contradicting "shared"; same declared props contract holds. "Full type safety" not architectural (Repository overview).

**19. README.md:132.** Global name from `name: "MF1_RemoteModules"`, comment says "DEBE SER UN NOMBRE UNICO. ESTO SE DEBE COORDINAR ENTRE EQUIPOS PARA NO PISARSE" (English translation: "Must be unique name, coordinated between teams to avoid collisions") (mf-1/vite.mf.ts:39). Shell seeks component in named `window` property (shell/src/hooks/useRemoteModule.ts:23). Sole remote, no collision to check. Mechanism requirement confirmed by code.

**20. README.md:133.** Bundle excludes `react`/`react-dom` (mf-1/vite.mf.ts:35, 42-45). Both declare same `react`/`react-dom` `19.1.0` (mf-1/package.json:17-18; shell/package.json:13-14), no further synchronization. Claim 23 more specific same statement.

**21. README.md:134.** Bundle requested only in browser, inside `useEffect` (shell/src/hooks/useRemoteModule.ts:20, 79-99). Shell build excludes `mf-1` code (3.4.6 #2), target outside host build (3.4.5 #1). Loading depends on `window`/`document`, so remote components not server rendered, matching "SSR is not compatible". Wrappers show "Loading..." until script loads (shell/src/components/RemoteHeader.tsx:24). README.md:128 ("lazy loading") same direction: script requested only when first wrapper mounts.

**22. mf-1/vite.mf.ts:28.** Comment says bundle served through Next `public` directory, potentially published elsewhere. First part repeats claim 13. Possibility partially supported: shell reads base URL from environment-configurable `MF1_BASE_URL` (shell/next.config.js:8), only appending fixed `/remote-modules/bundle.js` (shell/src/components/RemoteHeader.tsx:19). No artifact publishes outside `mf-1` (3.4.6 #1).

**23. mf-1/vite.mf.ts:35.** Shell provides React/ReactDOM by exposing modules in `window` (shell/src/hooks/useRemoteModule.ts:2-3, 36-37, comment "Paso 1: Preparar React globalmente", English translation: "Step one: prepare React globally", at :35), bundle reading as `React`/`ReactDOM` (mf-1/vite.mf.ts:42-45). Versions match in both `package.json` files (claim 20). Rest of comment ("Tambien se podria incluir react en nuestro bundle.js pero no es lo mejor", English translation: "React could also be included in our bundle, but this is not best") is unadopted alternative.

## Summary

Claims: 23 (corroborated: 19, partial: 1, contradicted: 2, uncorroborated: 1). Themes: (structure: 4, composition: 12, build-deploy: 5, independence: 2).
