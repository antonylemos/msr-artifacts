---
schema: 1
id: 1176812762
full_name: jangrohit/micro-front-end
commit: c6c0dbc9fb78b8baab20e74394647ca40b521355
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

# 253 — jangrohit/micro-front-end

## Repository overview

Documentation is English root README, sole `documentation` file in `artifacts.csv`. Long/technical: architecture diagram (README.md:7-15), container/marketing roles, runtime loading sequence, four-package table, local execution/build/webpack configuration/production deployment/router note. Almost all matches reviews: host `packages/container`, remote `packages/marketing` linked through Module Federation/mounted through `mount`, `packages/auth`/`packages/dashboard` without code/host link. Two exceptions. Deployment: README denies publishing pipeline (README.md:104), but two GitHub Actions workflows build/publish applications to S3, as build and deployment records (claim 22). Routers: README says nested `BrowserRouter` instances (README.md:108), but marketing separate React tree through own `ReactDOM.render` (claim 23).

Previously cited artifacts read: two workflows, container/marketing `config/webpack.{common,dev,prod}.js`, four `package.json`, both `public/index.html`, `index.js`, `bootstrap.js`, `packages/container/src/App.js`, `packages/container/src/components/MarketingApp.js`, `packages/container/src/components/Header.js`, `packages/marketing/src/App.js`. Only comments disabled `devServer` blocks in production configurations (packages/container/config/webpack.prod.js:12-17; packages/marketing/config/webpack.prod.js:12-17), no claims. No `package.json` has `description`. Workflow step names ("Build the container app", .github/workflows/container.yml:30) only describe steps.

Excluded:
- Marketing internal routes Landing `/`, Pricing `/pricing` (README.md:13-14, 27; packages/marketing/src/App.js:16-17), application startup through `src/index.js` dynamically importing `src/bootstrap.js` so webpack initializes shared dependencies before React (README.md:21, 27; packages/container/src/index.js:1; packages/marketing/src/index.js:1). Internal details;
- Ports 8080/8081 (README.md:10, 12, 45-46), development infrastructure (packages/container/config/webpack.dev.js:8; packages/marketing/config/webpack.dev.js:9);
- First loading-sequence step "The container's HTML loads its Webpack entry" (README.md:33), internal host; general Module Federation/webpack behavior: remote entry describes exposures rather than whole application (README.md:35), webpack loads additional chunks (README.md:37);
- Reserved `auth`/`dashboard` purpose ("Reserved for authentication UI", "Reserved for dashboard UI", README.md:47-48), intention without UI artifact; dashboard `package.json` lists Vue/PrimeVue (packages/dashboard/package.json:9-13), no code;
- Installation/run/build instructions (README.md:54-66, 74-80), `dist/`/production content-hashed output names (README.md:82; packages/container/config/webpack.prod.js:9; packages/marketing/config/webpack.prod.js:9), Babel/`HtmlWebpackPlugin` (README.md:88, 92; packages/container/config/webpack.common.js:9-21), internal builds without composition changes;
- Remote URL code block (README.md:100-102), configuration reproduction with claim 20;
- Integration advice to use one router/isolated remote routing (README.md:108), header fixed `signedIn={true}`/temporary logout callback (README.md:110; packages/container/src/App.js:18), simulated internal host authentication.

`doc-*`: README.md:1 and README.md:29 titles ("Micro Frontend Project", "Runtime loading"); README.md:37 general webpack explanation above. Others table: README.md:3 claims 1 through 4; README.md:19 claims 7/8; README.md:25 claims 9/10; README.md:39 claim 11 (repeats 3); README.md:82 claim 16; README.md:89 claim 18; README.md:98 claim 20; README.md:108 claim 23. Repetitions in paragraphs: README.md:34 (7), README.md:36 (8), README.md:45 (2/5), README.md:68 (7/10), README.md:94 (11).

## Claims

| # | Document | Claim | Theme | Corroboration | Evidence |
|---|---|---|---|---|---|
| 1 | README.md:3 | "This project demonstrates a micro frontend architecture using **Webpack 5 Module Federation**." | structure | corroborated | 3.4.3 (packages/container and packages/marketing `Yes`); 3.4.5 #1; packages/container/config/webpack.prod.js:3, 19-23; packages/container/package.json:25 |
| 2 | README.md:3 | "The `container` package is the host application." | structure | corroborated | 3.4.5 #1; packages/container/config/webpack.prod.js:19-23 |
| 3 | README.md:3 | "It loads the independently built `marketing` application at runtime." | composition | corroborated | 3.4.5 #1; 3.4.6 #2; 3.4.4 src-mount-call |
| 4 | README.md:3 | "The `auth` and `dashboard` directories exist, but they are not currently connected to the host as micro frontends." | structure | corroborated | 3.4.3 (packages/auth and packages/dashboard `No`); packages/container/config/webpack.prod.js:21-23; packages/container/config/webpack.dev.js:16-18 |
| 5 | README.md:11 | "Header and host-level layout" (in container) | structure | corroborated | packages/container/src/App.js:3, 18; packages/container/src/components/Header.js:57-98 |
| 6 | README.md:12 | "marketing (remote, port 8081)" | structure | corroborated | 3.4.5 #1; packages/marketing/config/webpack.prod.js:19-24 |
| 7 | README.md:19 | "Its Module Federation configuration declares a remote named `marketing`, served in development from `http://localhost:8081/remoteEntry.js`." | composition | corroborated | 3.4.5 #1; packages/container/config/webpack.dev.js:14-18; packages/marketing/config/webpack.dev.js:9, 17 |
| 8 | README.md:19 | "The container imports `marketing/MarketingApp` in `src/components/MarketingApp.js`, then calls the remote's exported `mount` function with a DOM element owned by the container." | composition | corroborated | 3.4.4 src-mount-import; 3.4.4 src-mount-call; packages/container/src/components/MarketingApp.js:3, 9, 11 |
| 9 | README.md:25 | "Marketing exposes `./MarketingApp` from `src/bootstrap.js` using Module Federation. That module exports `mount(element)`, which renders the marketing React app into the element supplied by the host." | composition | corroborated | 3.4.4 src-mount-export; packages/marketing/config/webpack.prod.js:22-23; packages/marketing/src/bootstrap.js:5-7, 17 |
| 10 | README.md:25 | "In development, it also mounts itself into `#_marketing-dev-root`, allowing the remote to run on its own at `http://localhost:8081`." | independence | corroborated | packages/marketing/src/bootstrap.js:9-13; packages/marketing/public/index.html:9; packages/marketing/config/webpack.dev.js:8-9 |
| 11 | README.md:39 | "Module Federation coordinates loading the remote and sharing configured dependencies." (sharing portion) | composition | corroborated | packages/container/config/webpack.dev.js:19; packages/container/config/webpack.prod.js:24; packages/marketing/config/webpack.dev.js:21; packages/marketing/config/webpack.prod.js:25; packages/container/src/App.js:1; packages/marketing/src/App.js:1 |
| 12 | README.md:47 | "`packages/auth` \| … \| Package metadata only" | structure | corroborated | 3.4.3 (packages/auth `No`); packages/auth/package.json:1-29 |
| 13 | README.md:48 | "`packages/dashboard` \| … \| Package metadata only; its scripts reference Webpack config files that are not present" | structure | corroborated | 3.4.3 (packages/dashboard `No`); packages/dashboard/package.json:5-6 |
| 14 | README.md:52 | "Each package has its own `package.json` and lockfile; there is no root-level install script." | structure | corroborated | 3.4.3 (no workspace declaration); packages/auth/package.json:1; packages/container/package.json:1; packages/dashboard/package.json:1; packages/marketing/package.json:1 |
| 15 | README.md:72 | "Build each deployable application from its own package directory" | build-deploy | corroborated | 3.4.6 #1; 3.4.6 #2; packages/container/package.json:6; packages/marketing/package.json:6 |
| 16 | README.md:82 | "The marketing build also emits `remoteEntry.js`, which the host needs to locate and load the remote's exposed module." | build-deploy | corroborated | 3.4.6 #2; packages/marketing/config/webpack.prod.js:21; packages/container/config/webpack.prod.js:22 |
| 17 | README.md:86 | "Each application has common, development, and production Webpack configuration files under `config/`" | build-deploy | corroborated | 3.4.3 (packages/container/config, packages/marketing/config); packages/container/package.json:5-6; packages/marketing/package.json:5-6 |
| 18 | README.md:89 | "`webpack.dev.js` configures the local dev server and Module Federation URLs." | composition | corroborated | packages/container/config/webpack.dev.js:7-8, 16-18; packages/marketing/config/webpack.dev.js:8-9, 15-20 |
| 19 | README.md:90 | "`webpack.prod.js` enables production output and sets deployment paths." | build-deploy | corroborated | 3.4.6 #1; 3.4.6 #2; packages/container/config/webpack.prod.js:7-11; packages/marketing/config/webpack.prod.js:7-11 |
| 20 | README.md:98-101 | "The container's production Webpack config uses `PRODUCTION_DOMAIN` to locate the marketing remote at: `${PRODUCTION_DOMAIN}/marketing/latest/remoteEntry.js`" | composition | corroborated | 3.4.5 #1; packages/container/config/webpack.prod.js:5, 22 |
| 21 | README.md:104 | "Deploy the marketing assets, including `remoteEntry.js`, at the configured marketing path, and deploy the container at its configured path." | build-deploy | corroborated | 3.4.6 #1; 3.4.6 #2; .github/workflows/container.yml:36; .github/workflows/marketing.yml:34 |
| 22 | README.md:104 | "this repository does not include a deployment pipeline that publishes those artifacts" | build-deploy | contradicted | 3.4.6 #1; 3.4.6 #2; .github/workflows/container.yml:1-9, 30-42; .github/workflows/marketing.yml:1-9, 30-40 |
| 23 | README.md:108 | "Both `container/src/App.js` and `marketing/src/App.js` currently render a `BrowserRouter`. Since the host mounts marketing inside its own router, this creates nested routers in the composed application." | composition | contradicted | packages/container/src/App.js:17-20; packages/marketing/src/App.js:14-19; packages/marketing/src/bootstrap.js:6 |

## Observations

**1. README.md:3.** Two frontend units, container/marketing, linked through webpack built-in `ModuleFederationPlugin`, imported from `webpack/lib/container/ModuleFederationPlugin` (packages/container/config/webpack.prod.js:3), webpack `^5.88.0` (packages/container/package.json:25). Built-in plugin explains no dependency technology package; composition mechanism `module-federation`; README names no different technology.

**2. README.md:3.** Container configuration `name: "container"`, only `remotes`, no `exposes` (packages/container/config/webpack.prod.js:19-23). Diagram ("container (host, port 8080)", README.md:10), table ("Host shell", README.md:45) repeat role.

**3. README.md:3.** Container loads marketing at runtime through federation remote, marketing own build (3.4.6 #2). README.md:39 repeats "This is runtime composition: the container does not compile the marketing source into its own bundle as a normal source import", likewise next sentence's first part ("Module Federation coordinates loading the remote"). Import `marketing/MarketingApp` (packages/container/src/components/MarketingApp.js:3) resolved through remote rather than source path.

**4. README.md:3.** Both container configurations only remote `marketing` (packages/container/config/webpack.prod.js:21-23; packages/container/config/webpack.dev.js:16-18), neither other package structural frontend unit. Table repeats "not wired into the host" per package (README.md:47-48).

**5. README.md:11.** Diagram puts header/top-level layout in container above marketing. Host `App` renders own `Header` before marketing wrapper (packages/container/src/App.js:3, 18-19), component at packages/container/src/components/Header.js:57-98. README.md:19 ("The container owns the top-level page and header"), table (README.md:45) repeat division.

**6. README.md:12.** Marketing declares `name: "marketing"`, `filename: "remoteEntry.js"`, exposes `./MarketingApp` (packages/marketing/config/webpack.prod.js:19-24). Table repeats ("Federated remote with landing and pricing routes", README.md:46). Port in Repository overview.

**7. README.md:19.** Container development declares `marketing: "marketing@http://localhost:8081/remoteEntry.js"` (packages/container/config/webpack.dev.js:16-18), matching marketing devServer port/`filename` (packages/marketing/config/webpack.dev.js:9, 17). Repetitions: sequence step 2 ("The container requests the marketing remote entry from port `8081`", README.md:34), README.md:68 ("The marketing remote must be running because the container fetches it from port `8081`"). Production different address (claim 20).

**8. README.md:19.** Host wrapper imports `mount` from `marketing/MarketingApp`, calls with rendered `div` (packages/container/src/components/MarketingApp.js:3, 9, 11). Sequence step 4 repeats (README.md:36).

**9. README.md:25.** Exposed `./src/bootstrap` (packages/marketing/config/webpack.prod.js:22-23), defines/exports `mount(el)` with `ReactDOM.render(<App />, el)` (packages/marketing/src/bootstrap.js:5-7, 17).

**10. README.md:25.** Development bootstrap seeks/mounts `#_marketing-dev-root` (packages/marketing/src/bootstrap.js:9-13), own `index.html` element (packages/marketing/public/index.html:9), devServer port 8081 (packages/marketing/config/webpack.dev.js:8-9). Isolated mounting development-only, unrelated build/deployment. README.md:68 repeats ("To work on the remote by itself, open **http://localhost:8081**").

**11. README.md:39.** New part sharing, loading in claim 3. Four configurations pass own `dependencies` from `package.json` as `shared` (packages/container/config/webpack.dev.js:4, 19; packages/container/config/webpack.prod.js:4, 24; packages/marketing/config/webpack.dev.js:5, 21; packages/marketing/config/webpack.prod.js:4, 25), both lists identical (packages/container/package.json:8-14; packages/marketing/package.json:8-14). Both use React (packages/container/src/App.js:1; packages/marketing/src/App.js:1). README.md:94 repeats matching details: list from each package's dependencies, no `singleton`/version restriction.

**12. README.md:47.** Auth `package.json` only default `test`/dependencies (packages/auth/package.json:4-6), plus lockfile. README.md:110 similar: "The `auth` package is not yet responsible for authentication", host fixed `signedIn={true}` (packages/container/src/App.js:18).

**13. README.md:48.** Dashboard `start`/`build` point to `config/webpack.dev.js`/`config/webpack.prod.js` (packages/dashboard/package.json:5-6), no dashboard `config/` directory per structural review.

**14. README.md:52.** Four packages own `package.json`/`package-lock.json`, no root `package.json` or `workspaces` (3.4.3, notes). Sentence in execution section, but states package boundaries.

**15. README.md:72.** Each own `build`/configuration (packages/container/package.json:6; packages/marketing/package.json:6), `separate` builds in review for both.

**16. README.md:82.** Marketing production `filename: "remoteEntry.js"` (packages/marketing/config/webpack.prod.js:21), host fetches that file (packages/container/config/webpack.prod.js:22). Marketing workflow invalidates precisely `remoteEntry.js` on CloudFront (.github/workflows/marketing.yml:40).

**17. README.md:86.** Container/marketing own `config/webpack.common.js`, `webpack.dev.js`, `webpack.prod.js`, scripts referencing (packages/container/package.json:5-6; packages/marketing/package.json:5-6). Dashboard references but lacks files (claim 13); README "each application", dashboard no snapshot application.

**18. README.md:89.** Container `webpack.dev.js` devServer (packages/container/config/webpack.dev.js:7-8), remote URL (:16-18). Marketing devServer port 8081, `ModuleFederationPlugin` with `filename: "remoteEntry.js"` (packages/marketing/config/webpack.dev.js:8-9, 15-20), no explicit URL: port/filename yield address consumed by container. Development server infrastructure detail; architecture property federation URL.

**19. README.md:90.** Both production configurations `mode: "production"`, hashed names, `publicPath` (packages/container/config/webpack.prod.js:7-11; packages/marketing/config/webpack.prod.js:7-11). README.md:104 repeats values: "The marketing output uses `/marketing/latest/` as its public path; the container output uses `/container/latest/`", "The `latest` directory convention is configured in Webpack". Workflows publish same prefixes (.github/workflows/container.yml:36; .github/workflows/marketing.yml:34).

**20. README.md:98-101.** Reads `process.env.PRODUCTION_DOMAIN` (packages/container/config/webpack.prod.js:5), remote `marketing@${domain}/marketing/latest/remoteEntry.js` (:22). Domain value container workflow secret (.github/workflows/container.yml:32-33), outside snapshot.

**21. README.md:104.** Instruction separates application deployments/paths, matching workflows: per application, directory trigger, `dist` sync to own prefix (.github/workflows/container.yml:36; .github/workflows/marketing.yml:34). `separate` deployment review both. README treats as manual step, claim 22 addresses.

**22. README.md:104.** Snapshot workflows `deploy-container`/`deploy-marketing`, each `main`/`master` push changing application directory builds, syncs `dist` to S3, invalidates CloudFront (.github/workflows/container.yml:1-9, 30-42; .github/workflows/marketing.yml:1-9, 30-40). Build and deployment overview already contradiction. Workflows unmentioned throughout README.

**23. README.md:108.** Both `App` render `BrowserRouter` (packages/container/src/App.js:17; packages/marketing/src/App.js:14), marketing wrapper child of host `BrowserRouter` (packages/container/src/App.js:17-20). Marketing router inside host DOM element; these hold. Conclusion fails: marketing `mount` calls `ReactDOM.render` on received element (packages/marketing/src/bootstrap.js:6), separate React tree; routers not nested in same component tree, only DOM. Hence `contradicted`. Runtime effects on same browser history unverified without execution.

## Summary

Claims: 23 (corroborated: 21, partial: 0, contradicted: 2, uncorroborated: 0). Themes: (structure: 8, composition: 8, build-deploy: 6, independence: 1).
