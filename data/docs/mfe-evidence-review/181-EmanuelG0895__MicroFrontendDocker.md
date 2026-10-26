---
schema: 1
id: 1009817207
full_name: EmanuelG0895/MicroFrontendDocker
commit: 137ba29996f64553efd3401f8ad619646d8a78e5
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

# 181 — EmanuelG0895/MicroFrontendDocker

## Repository overview

Micro-frontend technical test with Module Federation on Rspack and `@module-federation/enhanced`, packaged in Docker behind Nginx proxy. Three sibling projects without root workspace: host `MF-Shell` and remotes `MF-CharacterDetail` and `MF-Characters`, all React (#20 through #22). Each has own build and image in own compose service (#25 through #27).

Architecture-supporting chain entirely in snapshot:
- **Dependency:** each project declares `@module-federation/enhanced` in own manifest (#1 through #3).
- **Configuration:** host names containers `MF_CharacterDetail` and `MF_Characters`, at `localhost:3003` and `localhost:3002` (#8). `MF-CharacterDetail` exposes `./CharacterInfo` and `./View`, both same file (#4), and `MF-Characters` exposes `./Vista` (#6). Each `rspack.config.ts` applies `ModuleFederationPlugin` to project, and both remotes generate bundle with absolute `publicPath` at host-requested ports (#5, #7, #9).
- **Code:** host loads `MF_CharacterDetail/View` and `MF_Characters/Vista` through `React.lazy` (#15, #16). Route table links `/` to first and `/details/:id` to second (#17), and components render with props and callback (#18, #19).
- **Relationships:** two active host → remote relationships result (#23, #24). Remotes consume nothing from each other. List-to-detail transition goes through host: list remote calls `onCharacterClick`, host navigates and delivers `characterId` to detail remote.

Misleading signals:
- **Swapped names:** `MF_CharacterDetail` exposes list and `MF_Characters` detail. Documentation says opposite, and both claims contradicted (#32, #33). History shows list always in `MF-CharacterDetail` and detail in `MF-Characters` (#41).
- **Ports and deployment:** composition works with development ports (3003 and 3002). In images, remotes serve on 3002 and 3001, unpublished by compose. Nginx only exposes through `/character-detail` and `/characters`, unlike `remotes` URLs (#25 through #27, #34). README port table matches neither profile (#37), and history does not say whether it and host configuration originate in different stages (#43). Separate deployment counts as boundary per application, but Docker profile as written does not deliver composition to browser.
- **Remote `webpack.config.js` files:** declare webpack `ModuleFederationPlugin`, but used by no script; current build uses Rspack (#10, #11). History does not say whether ever used (#40).
- **`shared-hooks`:** host shares as singleton without package or remote usage (#8). History does not say whether planned or abandoned (#42).
- **Generated types:** three `MF-Shell/@mf-types/` lines are Module Federation DTS type declarations; two false positives in `import()` search (#12 through #14).

Spanish documentation generally matches (#28, #30, #31, #34 through #36, #39): three micro-frontends with Module Federation, Docker packaging and Nginx serving. Differs in swapped roles (#32, #33), ports (#37) and Dockerfile placed in `MF-Shell/` by tree (#38). Also announces services starting on access to any URL, only partially confirmed (#29). Nothing remains ambiguous in snapshot.

Configuration: 8 blocks retained, one per file, because each serves one unit. `webpack.config.js` files included among 3.4.3 Markers. Excluded:
- `package.json` files: `scripts` concern builds and servers (dimension 6), `dependencies` dimension 1;
- `index.html` files, containing only `<title>`, stylesheet and `<div id="app">` (MF-Shell/index.html:7-12);
- `tsconfig.json` files, containing only `include` and path alias (MF-Shell/tsconfig.json:19);
- `docker-compose.yml`, Dockerfiles, `start.sh` and `nginx.conf`: services, images and `location` concern deployment (dimension 6), none declaring remote, exposure or remote URL.

## Observations

### 1. MF-CharacterDetail/package.json:29

**Observation:** `@module-federation/enhanced` `^0.8.9` in `dependencies`. Review marks configured: MF-CharacterDetail/rspack.config.ts:5 imports `ModuleFederationPlugin` from `@module-federation/enhanced/rspack`, instantiating with `mfConfig` at :86, with configuration from MF-CharacterDetail/module-federation.config.ts:1-10.

**Interpretation:** `MF-CharacterDetail` declares Module Federation implementation used by build.

### 2. MF-Characters/package.json:29

**Observation:** `@module-federation/enhanced` `^0.8.9` in `dependencies`. Review marks configured: MF-Characters/rspack.config.ts:5 and :81 import and instantiate `ModuleFederationPlugin` with configuration from MF-Characters/module-federation.config.ts:1-8.

**Interpretation:** `MF-Characters` declares Module Federation implementation used by build.

### 3. MF-Shell/package.json:29

**Observation:** `@module-federation/enhanced` `^0.8.9` in `dependencies`. Review marks configured: MF-Shell/rspack.config.ts:5 and :98 import and instantiate `ModuleFederationPlugin` with configuration from MF-Shell/module-federation.config.ts, declaring remotes (:3-6), and host imports `MF_CharacterDetail/View` in MF-Shell/src/App.tsx:7.

**Interpretation:** Host declares Module Federation implementation used by build.

### 4. MF-CharacterDetail/module-federation.config.ts:1-10

**Observation:** `mfConfig` with `name: "MF_CharacterDetail"`, `filename: "remoteEntry.js"`, `remotes: {}`, `exposes: { "./CharacterInfo": "./src/components/view.tsx", "./View": "./src/components/view.tsx" }` and `shared: ["react", "react-dom"]`.

**Interpretation:** `MF-CharacterDetail` declares itself as container `MF_CharacterDetail`, exposing same component under two names. Names no other unit.

### 5. MF-CharacterDetail/rspack.config.ts:1-97

**Observation:** `defineConfig` with entry `./src/index.ts`, `devServer` on port 3003 with CORS headers, `output.uniqueName: "MF_CharacterDetail"` and `publicPath: "http://localhost:3003/"` (:17-39). Plugins are `HtmlRspackPlugin` with `./index.html` and `new ModuleFederationPlugin(mfConfig)`, with `mfConfig` imported from `./module-federation.config` (:8, :83-86).

**Interpretation:** Federation plugin applied to `MF-CharacterDetail` build with configuration from #4. `publicPath` is address requested by host in #8.

### 6. MF-Characters/module-federation.config.ts:1-8

**Observation:** `mfConfig` with `name: "MF_Characters"`, `filename: "remoteEntry.js"`, `exposes: { "./Vista": "./src/components/vista.tsx" }` and `shared: ["react", "react-dom"]`.

**Interpretation:** `MF-Characters` declares itself as container `MF_Characters` and exposes component. Names no other unit.

### 7. MF-Characters/rspack.config.ts:1-92

**Observation:** Same form as #5, with `devServer` on port 3002, without CORS headers, `uniqueName: "MF_Characters"` and `publicPath: "http://localhost:3002/"` (:24-34), and `new ModuleFederationPlugin(mfConfig)` (:81).

**Interpretation:** Federation plugin applied to `MF-Characters` build with configuration from #6. `publicPath` is address requested by host in #8.

### 8. MF-Shell/module-federation.config.ts:1-12

**Observation:** `mfConfig` with `name: "MF_Shell"` and `remotes: { MF_CharacterDetail: "MF_CharacterDetail@http://localhost:3003/remoteEntry.js", MF_Characters: "MF_Characters@http://localhost:3002/remoteEntry.js" }`. In `shared`, declares `react` and `react-dom` as singletons and `"shared-hooks": { singleton: true, requiredVersion: "*" }`. No `shared-hooks` package in host `package.json` (MF-Shell/package.json:28-34).

**Interpretation:** Host configuration declares both remote containers and their `remoteEntry.js` addresses. `shared-hooks` is sharing entry without corresponding package.

### 9. MF-Shell/rspack.config.ts:1-110

**Observation:** `defineConfig` with entry `./src/index.ts`, `devServer` on port 3000 with `Access-Control-Allow-Origin: "*"`, `output.uniqueName: "MF_Shell"` and `publicPath: "auto"` (:16-36). Plugins are `HtmlRspackPlugin` with `./index.html` and `new ModuleFederationPlugin(mfConfig)`, with `mfConfig` imported from `./module-federation.config` (:8, :95-98).

**Interpretation:** Federation plugin applied to host build with configuration from #8.

### 10. MF-CharacterDetail/webpack.config.js:1-53

**Observation:** Webpack configuration with entry `./src/index.tsx`, `mode: 'development'`, port 3003 and `publicPath: 'auto'`. `ModuleFederationPlugin` comes from `require('webpack').container` (:2), declaring `name: 'MF_CharacterDetail'`, `library: { type: 'global', name: 'MF_CharacterDetail' }`, `filename: 'remoteEntry.js'`, exposing `./View` and sharing `react` and `react-dom` as singletons (:37-48). No `package.json` script calls webpack, only `rspack` (MF-CharacterDetail/package.json:5-9).

**Interpretation:** Alternative federation configuration unread by build. Does not participate in snapshot composition.

**Note:** `weak` rather than `moderate` strength because file is used by no script (3.4.2 and 3.4.3, Notes): construct does not participate in composition.

### 11. MF-Characters/webpack.config.js:1-52

**Observation:** Webpack configuration with entry `./src/index.tsx`, `mode: 'development'`, port 3002 and `publicPath: 'auto'`. `ModuleFederationPlugin` comes from `require('webpack').container` (:2), declaring `name: 'mf_characters'`, `filename: 'remoteEntry.js'`, empty `exposes` (only example comment, :41) and `react` and `react-dom` as singletons (:37-47). No `package.json` script calls webpack (MF-Characters/package.json:5-9).

**Interpretation:** Alternative federation configuration unread by build, with another container name and nothing exposed. Does not participate in snapshot composition.

**Note:** `weak` rather than `moderate` strength for same reason as #10.

### 12. MF-Shell/@mf-types/MF_CharacterDetail/apis.d.ts:3

**Observation:** `type PackageType<T> = T extends 'MF_CharacterDetail/Vista' ? typeof import('MF_CharacterDetail/Vista') :any`, in declaration file generated by Module Federation DTS (MF-Shell/@mf-types/index.d.ts:1-10). Host `include` in `tsconfig` is `["src", "src/types/federation.d.ts"]`, not covering `@mf-types/` (MF-Shell/tsconfig.json:19).

**Interpretation:** Remote module type used only in type checking. Loads nothing at runtime.

### 13. MF-Shell/@mf-types/MF_CharacterDetail/compiled-types/components/view.d.ts:5

**Observation:** `export default function View({ onCharacterClick }: ViewProps): import("react/jsx-runtime").JSX.Element;`, in generated declaration of component `View`.

**Interpretation:** `import()` is only JSX return type. False positive in remote `import()` search.

### 14. MF-Shell/@mf-types/MF_Characters/compiled-types/components/vista.d.ts:5

**Observation:** `export default function Vista({ characterId }: VistaProps): import("react/jsx-runtime").JSX.Element;`, in generated declaration of component `Vista`.

**Interpretation:** `import()` is only JSX return type. False positive in remote `import()` search.

### 15. MF-Shell/src/App.tsx:7; MF-Shell/src/App.tsx:6-8

**Observation:** `const CharacterInfo = React.lazy(() => import("MF_CharacterDetail/View"));`. `App.tsx` loaded through `import("./App")` in host entry (MF-Shell/src/index.ts:1).

**Interpretation:** Host loads module `./View` from container `MF_CharacterDetail` on demand.

### 16. MF-Shell/src/app/details.tsx:3

**Observation:** `const Vista = React.lazy(() => import("MF_Characters/Vista"));`, in host component `Details`, itself loaded through `React.lazy` (MF-Shell/src/App.tsx:10-12).

**Interpretation:** Host loads module `./Vista` from container `MF_Characters` on demand.

### 17. MF-Shell/src/App.tsx:24; MF-Shell/src/App.tsx:24-41, 55-56

**Observation:** `<Routes>` with `path="/"` for `<CharacterInfo onCharacterClick={handleCharacterClick} />` and `path="/details/:id"` for `<Details characterId={selectedCharacterId} />`, both in `Suspense`, inside a `BrowserRouter` (:45-53). `App` mounted through `root.render(<App />)` (:55-56).

**Interpretation:** Host route table links each path to remote screen: `/` to `MF_CharacterDetail`, `/details/:id` to `MF_Characters` through `Details`.

### 18. MF-Shell/src/App.tsx:29; MF-Shell/src/App.tsx:18-21

**Observation:** `<CharacterInfo onCharacterClick={handleCharacterClick} />` inside `Suspense`. Callback stores id and navigates to `/details/${id}` (:18-21).

**Interpretation:** Host renders remote list component, receiving selected character through callback.

### 19. MF-Shell/src/app/details.tsx:13; MF-Shell/src/app/details.tsx:10-11

**Observation:** `return <Vista characterId={idFromParams} />;`, with id read from route through `useParams` (:10-11).

**Interpretation:** Host renders remote detail component and passes id through prop.

### 20. MF-CharacterDetail; MF-CharacterDetail/package.json; MF-CharacterDetail/rspack.config.ts:17-19, 83-85; MF-CharacterDetail/src/App.tsx:14-15; MF-CharacterDetail/package.json:5

**Observation:** Project with own `package.json`, lockfile and `rspack.config.ts`. Entry is `./src/index.ts`, page from `./index.html`, and `App` rendered through `createRoot`. Build is `NODE_ENV=production rspack build`. Own Dockerfile and compose service `mf-character-detail`. No workspace declared.

**Interpretation:** Frontend unit with own boundary, a React application.

### 21. MF-Characters; MF-Characters/package.json; MF-Characters/rspack.config.ts:17-19, 78-80; MF-Characters/src/App.tsx:8-9; MF-Characters/package.json:5

**Observation:** Project with own `package.json`, lockfile and `rspack.config.ts`. Entry is `./src/index.ts`, page from `./index.html`, and `App` rendered through `createRoot`. Build is `NODE_ENV=production rspack build`. Own Dockerfile and compose service `mf-characters`.

**Interpretation:** Frontend unit with own boundary, a React application.

### 22. MF-Shell; MF-Shell/package.json; MF-Shell/rspack.config.ts:16-18, 95-97; MF-Shell/src/App.tsx:55-56; MF-Shell/package.json:5

**Observation:** Project with own `package.json`, lockfile and `rspack.config.ts`. Entry is `./src/index.ts`, page from `./index.html`, and `App` rendered through `createRoot`. Build is `NODE_ENV=production rspack build`. Image comes from root Dockerfile, copying only `MF-Shell/` (Dockerfile:7-8, 15), in compose service `mf-shell`.

**Interpretation:** Frontend unit with own boundary, React application acting as host.

### 23. MF-Shell/src/App.tsx:7; MF-Shell/src/App.tsx:24, 29; MF-Shell/module-federation.config.ts:4; MF-Shell/rspack.config.ts:98; MF-CharacterDetail/module-federation.config.ts:2-8; MF-CharacterDetail/rspack.config.ts:25, 38, 86

**Observation:** Host declares container `MF_CharacterDetail` at `http://localhost:3003/remoteEntry.js`. This is `name` and `filename` in `MF-CharacterDetail` configuration, served on port 3003 with same `publicPath`. Imported module, `MF_CharacterDetail/View`, is one of two `exposes` entries, rendered by host at route `/`. Other exposure, `./CharacterInfo`, points to same file and is not imported.

**Interpretation:** An active host → remote relationship from `MF-Shell` to `MF-CharacterDetail` through Module Federation.

### 24. MF-Shell/src/app/details.tsx:3, 13; MF-Shell/src/App.tsx:24; MF-Shell/module-federation.config.ts:5; MF-Shell/rspack.config.ts:98; MF-Characters/module-federation.config.ts:2-6; MF-Characters/rspack.config.ts:25, 33, 81

**Observation:** Host declares container `MF_Characters` at `http://localhost:3002/remoteEntry.js`. This is `name` and `filename` in `MF-Characters` configuration, served on port 3002 with same `publicPath`. Imported module, `MF_Characters/Vista`, is sole exposure, rendered by host in `Details` at route `/details/:id`. `details.tsx` is a host file.

**Interpretation:** An active host → remote relationship from `MF-Shell` to `MF-Characters` through Module Federation.

### 25. MF-CharacterDetail/package.json:5; MF-CharacterDetail/rspack.config.ts:38; MF-CharacterDetail/Dockerfile:2-40; docker-compose.yml:52-55; nginx.conf:47-48

**Observation:** Own build with `rspack build` and own two-stage image, built from application folder, serving `dist` with `serve` on port 3002 (`EXPOSE 3002`, `start:prod`). Compose service `mf-character-detail` has no published port, reaching browser through `/character-detail` in Nginx on port 80. Bundle generated with `publicPath: "http://localhost:3003/"`, development port. Version `0.0.1` unused, and service has no named image or tag.

**Interpretation:** Own build and deployment boundaries without independent versioning. Address used by host to load remote exists only in development.

### 26. MF-Characters/package.json:5; MF-Characters/rspack.config.ts:33; MF-Characters/Dockerfile:2-40; docker-compose.yml:35-38; nginx.conf:38-39

**Observation:** Same arrangement as #25: own build and image, `serve` on port 3001 (`EXPOSE 3001`), service `mf-characters` without published port, route `/characters` in Nginx. Bundle generated with `publicPath: "http://localhost:3002/"`, development port. No version used in publication.

**Interpretation:** Own build and deployment boundaries without independent versioning. Address used by host to load remote exists only in development.

### 27. MF-Shell/package.json:5; MF-Shell/rspack.config.ts:35; Dockerfile:2-44; start.sh:7-21; docker-compose.yml:18-21; nginx.conf:29-30

**Observation:** Own build with `rspack build` and `publicPath: "auto"`. Image comes from root Dockerfile, copying only `MF-Shell/` and containing only host `dist`. `CMD` is `start.sh`, waiting for `/health` of `mf-characters:3001` and `mf-character-detail:3002` before running `start:prod` on port 3000. Compose service `mf-shell`, served at `/` by Nginx. No version used in publication.

**Interpretation:** Own build and deployment boundaries without independent versioning. Remotes absent from host image; host deployment depends on running remotes.

### 28. README-Docker.md:3

**Observation:** "Este proyecto está configurado para ser desplegado usando Docker y Docker Compose con **inicio automático de todos los servicios**". Idea repeats in README-Docker.md:130, README.md:224 and VALIDACION-MANUAL.md:25.

**English translation:** Project configured for deployment using Docker and Docker Compose with automatic startup of all services.

**Interpretation:** Claim says applications are published together through Docker Compose.

### 29. README-Docker.md:7, 55

**Observation:** "¡Ahora cuando accedas a cualquier URL, se levantan automáticamente TODOS los servicios!". Sentence repeats in README-Docker.md:55.

**English translation:** Now accessing any URL automatically starts all services!

**Interpretation:** Claim says services start together and startup is triggered by request.

### 30. README-Docker.md:16

**Observation:** "El proyecto consiste en tres microfrontends con un **reverse proxy nginx**". README.md repeats list in README.md:7-12.

**English translation:** Project consists of three microfrontends with Nginx reverse proxy.

**Interpretation:** Claim describes units together: three micro-frontends behind reverse proxy.

### 31. README-Docker.md:19

**Observation:** "**MF-Shell**: Aplicación principal (puerto interno 3000)". Role repeats in README.md:9, 104, 110 and 196.

**English translation:** MF-Shell: main application, internal port three thousand.

**Interpretation:** Claim assigns main-application role to `MF-Shell`.

### 32. README-Docker.md:20

**Observation:** "**MF-Characters**: Microfrontend de lista de personajes (puerto interno 3001)". Repeated in README.md:10, 105, 126 and 201.

**English translation:** MF-Characters: character list microfrontend, internal port three thousand and one.

**Interpretation:** Claim assigns character-list role to `MF-Characters`.

### 33. README-Docker.md:21

**Observation:** "**MF-CharacterDetail**: Microfrontend de detalles de personajes (puerto interno 3002)". Repeated in README.md:11, 106, 139 and 206.

**English translation:** MF-CharacterDetail: character detail microfrontend, internal port three thousand and two.

**Interpretation:** Claim assigns character-detail role to `MF-CharacterDetail`.

### 34. README-Docker.md:45-49

**Observation:** "**Todas las URLs ahora acceden a través del puerto 80:**", with application at `/`, MF-Characters at `/characters` and MF-CharacterDetail at `/character-detail`. Idea repeats in README-Docker.md:65-66, 132, README.md:12, 41, 103, 240 and VALIDACION-MANUAL.md:63-75, 129-133.

**English translation:** All URLs now access through port eighty.

**Interpretation:** Claim says each application is served through own path behind one port.

### 35. README-Docker.md:57

**Observation:** "**Script de inicio** espera a que todos los microfrontends estén disponibles". Repeated in README.md:238 and in comment at start.sh:3.

**English translation:** Startup script waits until all microfrontends are available.

**Interpretation:** Claim says application startup depends on others being available.

### 36. README.md:3

**Observation:** "Este proyecto implementa una arquitectura de microfrontends utilizando Module Federation con React, TypeScript y Docker." Title (README.md:1), README.md:222 and VALIDACION-MANUAL.md:3 say same.

**English translation:** Project implements microfrontend architecture using Module Federation with React, TypeScript and Docker.

**Interpretation:** Claim presents repository as micro-frontend architecture composed through Module Federation.

### 37. README.md:99-106

**Observation:** Port table: "MF-Shell | 3000 | http://localhost:3000", "MF-Characters | 3001 | http://localhost:3001", "MF-CharacterDetail | 3002 | http://localhost:3002", and Nginx at `http://localhost`. Same ports appear in URLs of `remoteEntry.js` to check (README.md:180-182) and block reproducing host configuration (README.md:113-118).

**Interpretation:** Claim says each application is served on own `localhost` port, and host finds remotes at those ports.

### 38. README.md:194-216

**Observation:** Annotated folder tree with `MF-Shell/`, `MF-Characters/` and `MF-CharacterDetail/`, each with `src/`, `module-federation.config.ts`, `package.json` and `Dockerfile`, and at root a "Dockerfile # Dockerfile principal". There is no `MF-Shell/Dockerfile` in snapshot.

**English translation of quoted label:** Main Dockerfile.

**Interpretation:** Claim describes three application folders, each with own image, and general image at root.

### 39. README.md:221

**Observation:** "**Build Tool**: Rspack".

**Interpretation:** Claim only names build tool.

### 40. c228808 2025-06-27 (MF-Characters/webpack.config.js); 7c93dbc 2025-06-27 (MF-CharacterDetail/webpack.config.js, MF-Shell/webpack.config.js); 411b8a1 2025-06-27 (MF-Shell/webpack.config.js); 8850753 2025-06-27 (MF-Characters/package.json, MF-CharacterDetail/package.json); 137ba29 2025-08-19 (MF-Characters/webpack.config.js, MF-CharacterDetail/webpack.config.js)

**Observation:** `MF-Characters/webpack.config.js` is in folder-creation commit, `7c93dbc` adds `MF-CharacterDetail` file and `MF-Shell` file, and `411b8a1` removes shell file. Remaining two change in snapshot. Remote `package.json` files only change in `c228808` and `8850753`, and older versions absent from clone. Review marks point inconclusive.

**Interpretation:** History does not say whether any script ever called webpack. Uncertainty concerns only past: files unused in snapshot.

### 41. c228808 2025-06-27 (MF-CharacterDetail/src/components); 63e9550 2025-06-27 (MF-CharacterDetail/src/components/view.tsx); 7c93dbc 2025-06-27 (MF-Characters/src/components/vista.tsx); 0608a73 2025-06-27 (README-Docker.md); feccf9f 2025-06-27 (README.md)

**Observation:** `view.tsx`, list, added in `MF-CharacterDetail` by `63e9550`, and `vista.tsx`, detail, in `MF-Characters` by `7c93dbc`. No file in these folders removed or moved through snapshot. README-Docker.md and README.md written afterward, never changed again. Review marks point clarified.

**Interpretation:** Documentation role swap does not describe earlier stage: list always in `MF-CharacterDetail`, detail in `MF-Characters`. Claims remain contradicted.

### 42. 137ba29 2025-08-19 (MF-Shell/module-federation.config.ts)

**Observation:** Host configuration changes in seven of eighteen commits, last snapshot, with no earlier version in clone. No commit creates path with `shared-hooks`. Review marks point inconclusive.

**Interpretation:** History does not distinguish planned sharing never connected from abandoned sharing. Uncertainty concerns only past: no `shared-hooks` package in snapshot.

### 43. 411b8a1 2025-06-27 (MF-CharacterDetail/rspack.config.ts); 8850753 2025-06-27 (MF-Characters/package.json, MF-CharacterDetail/package.json); 6d5fdab 2025-06-27 (MF-Characters/rspack.config.ts); feccf9f 2025-06-27 (README.md, MF-Shell/module-federation.config.ts); 137ba29 2025-08-19 (MF-Shell/module-federation.config.ts)

**Observation:** Remote development and Docker-profile ports already matched snapshot when README.md written in `feccf9f`. Host configuration changes in this commit and again in snapshot, whose message announces "Update ports, module federation", and version from `feccf9f` absent from clone. Review marks point inconclusive.

**Interpretation:** Port table does not describe earlier remote stage, but history does not say whether README block reproduced host configuration that day. Uncertainty concerns only past: composition uses development ports in snapshot.

### 44. 0608a73 2025-06-27 (README-Docker.md, docker-compose.yml); 4473fa3 2025-06-27 (docker-compose.yml)

**Observation:** README-Docker.md originates in `0608a73`, never changing again. `docker-compose.yml` originates in same commit and changes once in `4473fa3`, whose earlier version absent from clone. Review marks point inconclusive.

**Interpretation:** History does not say whether artifact ever started containers per request. Uncertainty concerns only past: services start on `up` in snapshot.

### 45. 0608a73 2025-06-27 (Dockerfile, MF-Characters/Dockerfile, MF-CharacterDetail/Dockerfile); feccf9f 2025-06-27 (README.md)

**Observation:** `MF-Shell/Dockerfile` never existed through snapshot. Root Dockerfile added in `0608a73`, with remote Dockerfiles, and README.md with tree only afterward in `feccf9f`. Review marks point clarified.

**Interpretation:** Folder tree does not describe earlier stage: shell image always came from root Dockerfile. Claim remains contradicted.

## Classification

| # | Origin | Dimension | Type | Approach | Evidence | Strength | Relationships |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.2 (MF-CharacterDetail/package.json:29) | 1 technology | manifest | module-federation | technological | weak | declares #4; declares #5 |
| 2 | 3.4.2 (MF-Characters/package.json:29) | 1 technology | manifest | module-federation | technological | weak | declares #6; declares #7 |
| 3 | 3.4.2 (MF-Shell/package.json:29) | 1 technology | manifest | module-federation | technological | weak | declares #8; declares #9; declares #15 |
| 4 | 3.4.2 (MF-CharacterDetail/package.json:29, Evidence); 3.4.3 (MF-CharacterDetail, Markers); 3.4.4 (MF-Shell/src/App.tsx:7, Observation); 3.4.5 #1 (Configuration) | 2 configuration | configuration | module-federation | technological | moderate | configures #20; configures #23 |
| 5 | 3.4.2 (MF-CharacterDetail/package.json:29, Evidence); 3.4.3 (MF-CharacterDetail, Markers, Entry and Build); 3.4.5 #1 (Configuration); 3.4.6 #1 (Where served and Artifacts); 3.4.7 #10 (Evidence) | 2 configuration | configuration | module-federation | technological | moderate | configures #20; configures #23 |
| 6 | 3.4.2 (MF-Characters/package.json:29, Evidence); 3.4.3 (MF-Characters, Markers); 3.4.4 (MF-Shell/src/app/details.tsx:3, Observation); 3.4.5 #2 (Configuration) | 2 configuration | configuration | module-federation | technological | moderate | configures #21; configures #24 |
| 7 | 3.4.2 (MF-Characters/package.json:29, Evidence); 3.4.3 (MF-Characters, Markers, Entry and Build); 3.4.5 #2 (Configuration); 3.4.6 #2 (Where served and Artifacts); 3.4.7 #10 (Evidence) | 2 configuration | configuration | module-federation | technological | moderate | configures #21; configures #24 |
| 8 | 3.4.2 (MF-Shell/package.json:29, Evidence); 3.4.3 (MF-Shell, Markers); 3.4.4 (MF-Shell/src/App.tsx:7, MF-Shell/src/app/details.tsx:3, Observation); 3.4.5 #1, #2 (Configuration); 3.4.7 #10 (Evidence) | 2 configuration | configuration | module-federation | architectural | strong | configures #22; configures #23; configures #24 |
| 9 | 3.4.2 (MF-Shell/package.json:29, Evidence); 3.4.3 (MF-Shell, Markers, Entry and Build); 3.4.4 (MF-Shell/src/App.tsx:7, Observation); 3.4.5 #1, #2 (Configuration); 3.4.6 #3 (Artifacts) | 2 configuration | configuration | module-federation | technological | moderate | configures #22; configures #23; configures #24 |
| 10 | 3.4.3 (MF-CharacterDetail, Markers) | 2 configuration | configuration | module-federation | technological | weak | — |
| 11 | 3.4.3 (MF-Characters, Markers) | 2 configuration | configuration | module-federation | technological | weak | — |
| 12 | 3.4.4 (MF-Shell/@mf-types/MF_CharacterDetail/apis.d.ts:3) | 3 code | source code | module-federation | technological | weak | — |
| 13 | 3.4.4 (MF-Shell/@mf-types/MF_CharacterDetail/compiled-types/components/view.d.ts:5) | 3 code | source code | — | context | weak | — |
| 14 | 3.4.4 (MF-Shell/@mf-types/MF_Characters/compiled-types/components/vista.d.ts:5) | 3 code | source code | — | context | weak | — |
| 15 | 3.4.4 (MF-Shell/src/App.tsx:7) | 3 code | source code | module-federation | architectural | strong | implements #23 |
| 16 | 3.4.4 (MF-Shell/src/app/details.tsx:3) | 3 code | source code | module-federation | architectural | strong | implements #24 |
| 17 | 3.4.4 (MF-Shell/src/App.tsx:24) | 3 code | source code | module-federation | architectural | strong | implements #23; implements #24 |
| 18 | 3.4.4 (MF-Shell/src/App.tsx:29) | 3 code | source code | module-federation | technological | moderate | implements #23 |
| 19 | 3.4.4 (MF-Shell/src/app/details.tsx:13) | 3 code | source code | module-federation | technological | moderate | implements #24 |
| 20 | 3.4.3 (MF-CharacterDetail) | 4 structure | directory | — | architectural | moderate | — |
| 21 | 3.4.3 (MF-Characters) | 4 structure | directory | — | architectural | moderate | — |
| 22 | 3.4.3 (MF-Shell) | 4 structure | directory | — | architectural | moderate | — |
| 23 | 3.4.5 #1 | 5 composition | source code | module-federation | architectural | strong | links #22; links #20 |
| 24 | 3.4.5 #2 | 5 composition | source code | module-federation | architectural | strong | links #22; links #21 |
| 25 | 3.4.6 #1 | 6 build-deploy | deploy | — | architectural | moderate | publishes #20 |
| 26 | 3.4.6 #2 | 6 build-deploy | deploy | — | architectural | moderate | publishes #21 |
| 27 | 3.4.6 #3 | 6 build-deploy | deploy | — | architectural | moderate | publishes #22 |
| 28 | 3.4.7 #1 | 7 documentation | documentation | — | architectural | weak | corroborates #25; corroborates #26; corroborates #27 |
| 29 | 3.4.7 #2 | 7 documentation | documentation | — | architectural | weak | partially corroborates docker-compose.yml:9-12; partially corroborates #27 |
| 30 | 3.4.7 #3 | 7 documentation | documentation | — | architectural | weak | corroborates #20; corroborates #21; corroborates #22; corroborates nginx.conf:6-16 |
| 31 | 3.4.7 #4 | 7 documentation | documentation | — | architectural | weak | corroborates #23; corroborates #24; corroborates #27 |
| 32 | 3.4.7 #5 | 7 documentation | documentation | — | architectural | weak | contradicts #24; contradicts MF-Characters/src/components/vista.tsx:11-15 |
| 33 | 3.4.7 #6 | 7 documentation | documentation | — | architectural | weak | contradicts #23; contradicts MF-CharacterDetail/src/components/view.tsx:11-27 |
| 34 | 3.4.7 #7 | 7 documentation | documentation | — | architectural | weak | corroborates #25; corroborates #26; corroborates #27 |
| 35 | 3.4.7 #8 | 7 documentation | documentation | — | architectural | weak | corroborates #27 |
| 36 | 3.4.7 #9 | 7 documentation | documentation | module-federation | architectural | weak | corroborates #1; corroborates #2; corroborates #3; corroborates #20; corroborates #21; corroborates #22; corroborates #23; corroborates #24 |
| 37 | 3.4.7 #10 | 7 documentation | documentation | — | architectural | weak | contradicts #25; contradicts #26; contradicts #5; contradicts #7; contradicts #8 |
| 38 | 3.4.7 #11 | 7 documentation | documentation | — | architectural | weak | contradicts #22; contradicts #27 |
| 39 | 3.4.7 #12 | 7 documentation | documentation | — | technological | weak | corroborates #20; corroborates #21; corroborates #22; corroborates #25; corroborates #26; corroborates #27 |
| 40 | 3.4.8 #1 | 8 history | history | — | context | weak | explains #10; explains #11 |
| 41 | 3.4.8 #2 | 8 history | history | — | context | weak | explains #32; explains #33 |
| 42 | 3.4.8 #3 | 8 history | history | — | context | weak | explains #8 |
| 43 | 3.4.8 #4 | 8 history | history | — | context | weak | explains #8; explains #25; explains #26; explains #37 |
| 44 | 3.4.8 #5 | 8 history | history | — | context | weak | explains #29 |
| 45 | 3.4.8 #6 | 8 history | history | — | context | weak | explains #38 |

## Summary

Observations: 45. Dimensions (technology: 3, configuration: 8, code: 8, structure: 3, composition: 2, build-deploy: 3, documentation: 12, history: 6). Strength (strong: 6, moderate: 13, weak: 26, ambiguous: 0). Evidence (technological: 14, architectural: 23, context: 8).

