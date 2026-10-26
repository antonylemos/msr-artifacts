---
schema: 1
id: 1161566940
full_name: coolsamson7/novx
commit: 128ba9a0f9f373210c09948a19bd1b59d9c7673f
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

# 039 — coolsamson7/novx

## Repository overview

All documentation is in English. Root `README.md` presents the repository as an Nx monorepo with four packages (`core`, `i18n`, `communication`, `portal`), each linked to its own README and the project's Wiki/API docs (README.md:9-22). Each library has its own short README: `libs/communication/README.md` (introduction + generated Axios service example, `:1-51`, and a generated schema block, `:53-79`, both reproduced code without a separate claim); `libs/core/README.md` (DI and AOP in library `core`, with a code example, `:12-85`, and two AI-generated comparison tables with other DI/AOP libraries, `:125-172`, none discussing frontend units); `libs/i18n/README.md` (two sentences about the i18n library, `:1-9`, without an architectural claim). `CHANGELOG.md` has only three "version bump only, there were no code
changes" entries (`:1-11`), without content. `apps/app/src/showcases/i18n-feature.md` and `apps/app/src/showcases/reactive-feature.docs.md` are showcase texts rendered inside the app UI itself (the loading code, ``import(`./showcases/${filename}?raw`)``, was discarded as a false positive by the source code review, 3.4.4, Notes); they concern the illustrated example feature, rather than multi-frontend architecture.

`ui/README.md:1-16` does not describe library `ui`: its title and introduction ("Novx Core... a dependency
injection solution... error handling... tracing") reproduce, almost word for word, the introduction in `libs/core/README.md:1-9` (same item list), and "Building"/"Running
unit tests" instruct running `nx build communication`/`nx test communication`, commands for library `communication`, rather than `core` or `ui`. This is not standard Nx-generated boilerplate — that origin is not demonstrated by the snapshot — but copied, outdated content from another library. It is cited here as a non-claim, saying nothing verifiable about `ui` or project units; the structural review (3.4.3) already records `ui/` as a disabled Nx project.

The `description` fields of library `package.json` files (`libs/communication/package.json:4` "Communication library"; `libs/core/package.json:4` "DI and AOP library"; `libs/i18n/package.json:4` "i18n library"; `libs/portal/package.json:4` "Portal library"; `ui/package.json:4` "ui library") are only category labels, without a verifiable composition or deployment claim; they were read and excluded from the table.

Comments in composition artifacts cited by previous reviews were also read: `apps/app/webpack.config.js` (`:3`, `:101`, `:107`, notes about `CopyWebpackPlugin` copying `public/` to the build), `apps/microfrontend/webpack.config.js` (`:13`, `:33-34`, commented-out bundle options), `apps/app/src/environments/environments.ts:2` (lists modes "microfrontend local
service"; used in #4), `libs/portal/src/lib/loader/remote-loader.ts:25` ("Fetch all manifests in
parallel"; same chain as #6), `libs/portal/src/lib/feature-outlet.tsx:50-55` (cache holds the remote module's DI environment for federated features; same chain as #3) and section labels in `apps/app/src/module.ts`, `service-loader.ts` and `remote-component-loader.ts` (the latter without comments). None makes an architectural claim beyond those already tabulated; they did not become rows.

Documents making claims about frontend units as a whole are `README.md` (line 14, about package `portal`) and, in greater detail, `libs/portal/README.md`, describing the portal framework supporting the reference app (`apps/app` + `apps/microfrontend`) found by previous reviews. The `doc-mfe-term` occurrence at `libs/portal/README.md:17` ("enterprise portals
with dynamic microfrontends... as one extreme... making it a one-size-fits-all framework") repeats, in marketing language, the claim in row 5 (framework supporting microfrontends); but the same passage names "server side configuration mechanisms", a mechanism different from the host/remote composition already recorded, also appearing at `:15` ("custom application configurations with
support for both client and server side logic") and `:72` ("registered via a server component"); this becomes a separate row (#4). Step-by-step instructions in `libs/portal/README.md:74-200` (configuration of `ApplicationModule`, `DeploymentManager`, `FeatureRegistry` and `RoutingManager` with only the local manifest) generally concern internal framework mechanics before introducing the federated case (line 203 onward) and do not enter the table. The exception is `:140-141`, claiming `FeatureRegistry` knows all registered components, "local or remote", and `<FeatureOutlet>` renders any registered feature by name: a composition claim, but repeating #3's subject and mechanism (outlets covering local and federated components), included in its paragraph.

## Claims

| # | Document | Claim | Theme | Corroboration | Evidence |
|---|---|---|---|---|---|
| 1 | README.md:9 | "NOVX is a monorepo covering a number of Typescript and React solutions in individual packages" | structure | corroborated | 3.4.3 (Workspace); pnpm-workspace.yaml:1-3; nx.json:18-44 |
| 2 | README.md:14 | "[portal]...a react microfrontend framework" | structure | corroborated | 3.4.3 (apps/app Yes; apps/microfrontend Undetermined); 3.4.5 #1 |
| 3 | libs/portal/README.md:14 | "feature outlets that cover both local and federated components and allow for custom async preloading logic" | composition | corroborated | 3.4.4 (remote-component-loader.ts, remote-resolution); libs/portal/src/lib/feature-outlet.tsx:245; 3.4.5 #1 |
| 4 | libs/portal/README.md:15 | "custom application configurations with support for both client and server side logic" | composition | partial | apps/app/src/module.ts:221-228; libs/portal/src/lib/loader/service-loader.ts:15-16; libs/portal/src/lib/service/PortalService.ts:28-41; apps/app/src/environments/environments.ts:2-5 |
| 5 | libs/portal/README.md:36 | "A parser - as part of the build - will locate those features and generate a `manifest.json`" | build-deploy | partial | apps/app/project.json:9-14 (`scan-metadata`: `nx run metadata:scan --moduleFolder=apps/app --outFile=apps/app/src/manifest.json`); apps/microfrontend/project.json:9-14 (same, `--outFile=apps/microfrontend/src/manifest.json`); 3.4.3 (tools/metadata); nx.json:34-35 (`targetDefaults.build`/`test` depend only on `^build`; no target depends on `scan-metadata`) |
| 6 | libs/portal/README.md:205-212 | "Federated modules will take a similar approach... The main application will only need to change the corresponding deployment loader to integrate it" / "the manifest is fetched dynamically from the known url and merged with the local manifest" | composition | corroborated | 3.4.5 #1; apps/app/src/environments/environments.ts:2-8; libs/portal/src/lib/loader/remote-loader.ts:28 |
| 7 | libs/portal/README.md:214-216 | "in production the logic would be handed over to a server component that is aware of different microfrontends and configurations also including more sophisticated logic to filter features according to feature flags" | composition | uncorroborated | — |
| 8 | libs/portal/README.md:220 | "A showcase app shows a shell and a microfreontend" | structure | corroborated | 3.4.3 (apps/app Yes; apps/microfrontend Undetermined); 3.4.5 #1 |

## Observations

**1. Document.** Root `README.md` describes the repository as a monorepo with individual Typescript/React packages (README.md:9-14). The structural review confirms pnpm workspace organization (`pnpm-workspace.yaml:1-3`, `packages: ["apps/*","libs/*"]`) with an Nx `project.json` per package (3.4.3, Workspace section); all four listed packages (`core`, `i18n`, `communication`, `portal`) match the four libraries in the unit table (3.4.3), all `No` as frontend units because they are published libraries, not contradicting the claim about "pacotes" (English translation: "packages") generally, rather than UI units.

**2. Document.** `README.md` lists "portal" as "a react microfrontend framework" (README.md:14), and `libs/portal/README.md:5` repeats the same claim in more detail ("a react
portal framework supporting microfrontends"); marketing elaboration at `libs/portal/README.md:17` ("enterprise portals with dynamic microfrontends" versus "small local only applications") adds no verifiable mechanism to this claim (the "server side configuration" mechanism named by the same passage is a separate claim, #4). The claim that the project contains microfrontends is corroborated by previous reviews: structural finds shell `apps/app` (Yes) and remote `apps/microfrontend` (Undetermined for independent execution, not affecting its remote role, 3.4.3 Notes), and composition confirms their active host→remote module-federation relationship (3.4.5 #1).

**3. Document.** `libs/portal/README.md:14` claims "feature outlets" cover local and federated components. In the snapshot, `FeatureOutlet` mounts the loaded component (`libs/portal/src/lib/feature-outlet.tsx:245`, `<LoadedWrapper Component={Loaded} .../>`), and for the federated case that component comes from `RemoteComponentLoader`, resolving `./Module` and the remote feature component (3.4.4, rows `remote-component-loader.ts:106`, `:137`, category `remote-resolution`); the composition host→remote relationship cites the same chain (3.4.5 #1). The same claim reappears in `libs/portal/README.md:140-141`: `FeatureRegistry` "knows about all
registered components - local or remote", hence `<FeatureOutlet>` "renders any registered
feature by name"; same subject (outlet) and mechanism (registered local and remote components), supported by the same chain. The claim is corroborated.

**4. Document.** `libs/portal/README.md:15` claims application configuration supports client- and server-side logic; the same mechanism appears at `:17` ("server side configuration
mechanisms") and `:72` ("which can either be used locally or registered via a server component"). The mechanism's client side exists in the snapshot: shell offers deployment mode `service` (`apps/app/src/module.ts:221-228`, `createDeploymentLoader` returns a `ServiceDeploymentLoader` when `deployment == 'service'`, alongside `microfrontend` and local modes), that loader delegates deployment calculation to the service (`libs/portal/src/lib/loader/service-loader.ts:15-16`, `portalService.computeDeployment(request)`), and generated `PortalService` queries the server through `POST /portal/deployment` (`libs/portal/src/lib/service/PortalService.ts:28-41`). App configuration lists `service` among possible modes, but active mode is `microfrontend` (`apps/app/src/environments/environments.ts:2-5`). The rest has no artifact: neither previous reviews nor snapshot contain the server responding to `/portal/deployment` or manifest registration there ("registered via a server component", `:72`). The claim is partial.

**5. Document.** `libs/portal/README.md:36` claims a parser locates features and generates `manifest.json` as part of build. Both apps have the target: `apps/app/project.json:9-14` and `apps/microfrontend/project.json:9-14` define `scan-metadata`, running `nx run metadata:scan --moduleFolder=<app> --outFile=<app>/src/manifest.json`, and the structural review already records tool `tools/metadata` as "scan de metadata que gera o manifesto" (English translation: "metadata scan generating the manifest") (3.4.3, row `tools/metadata`). But "as part of the build" is not confirmed: neither app's `build` target depends on `scan-metadata`, nor does `scan-metadata` depend on `build` (`apps/app/project.json`, `apps/microfrontend/project.json`), and workspace `targetDefaults` only link `build`/`test` to `^build` (`nx.json:34-35`); no artifact shows `scan-metadata` automatically triggered by build. The generation tool exists and works independently, but build integration is unobserved; the claim is partial.

**6. Document.** `libs/portal/README.md:205-212` describes the federated case: shell replaces `deployment loader` with a `RemoteDeploymentLoader` receiving remotes' `{name, url}`, and remote manifest is dynamically fetched and merged with local. In the snapshot, shell declares exactly this list in `apps/app/src/environments/environments.ts:2-8` (`deployment: "microfrontend"`, `remotes: [{name: 'microfrontend', url: 'http://localhost:3001'}]`), and `libs/portal/src/lib/loader/remote-loader.ts:28` fetches `` `${remote.url}/manifest.json` ``. This chain is the same host→remote composition relationship (3.4.5 #1, Observation 1). The claim is corroborated.

**7. Document.** `libs/portal/README.md:214-216` projects, for production, a "server component" filtering features through feature flags. The snapshot has flag-filtering capability in the library (`libs/portal/src/lib/manifest-filter.ts:155-156`, `libs/portal/src/lib/feature-decorator.ts:54`), but no previous review found a server component or use of that filter by snapshot apps (the build and deployment review, 3.4.6, lists no Dockerfile, compose or server configuration). Because it describes a production usage scenario without a confirming or contradicting snapshot artifact, the claim is uncorroborated.

**8. Document.** `libs/portal/README.md:220` claims the showcase displays a shell and microfrontend. This matches the pair confirmed by previous reviews: `apps/app` as shell (structural, Yes) and `apps/microfrontend` as remote in the composition relationship (3.4.5 #1), whose only feature is a simple text page (3.4.5, Repository overview). The claim is corroborated.

## Summary

Claims: 8 (corroborated: 5, partial: 2, contradicted: 0, uncorroborated: 1). Themes: (structure: 3, composition: 4, build-deploy: 1).
