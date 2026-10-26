---
schema: 1
id: 1248756347
full_name: shreyash1086/mfe
commit: b0fdd18d2ef6beb846fa0a534b9458669405fe6b
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

# 270 — shreyash1086/mfe

## Repository overview

Two English documents: root README.md, "Micro-Frontend Architecture" guide with tree/loading diagram ("How Modules Connect", README.md:19-27, claim 4 paragraph), Module Federation/Docker/scaling/independence steps; docs/ARCHITECTURE.md, migration summary ("What changed in this migration"), runtime loader, `window.__RUNTIME_REMOTE_CONFIG__` remotes, shell `RemoteWrapper`, next steps. No `package.json` `description`, no unit READMEs.

README describes earlier smaller project: shell/three modules (cloud-labs, dashboard, virtual-machine; README.md:11-16), four containers (README.md:39), code-block webpack `auth`/`dashboard`/`profile` remotes (README.md:92-100). Snapshot nine `module-*`, remote `shared-design-system`, shell custom loader without module webpack `remotes` (composition review). docs/ARCHITECTURE.md closer (loader/runtime config/`RemoteWrapper`), still services Shell/Auth/Dashboard/Profile (docs/ARCHITECTURE.md:46-51). Loading/React sharing confirmed; unit counts/service names/healthchecks/strict versions/scaling contradicted.

Excluded reproducing blocks: `ModuleFederationPlugin` of `module-auth` and shell (README.md:76-101), `lazy(() => import("auth/AuthApp"))` (README.md:105-109), multi-stage Dockerfile (README.md:122-136), nginx.conf (README.md:140-148), docker-compose.yml `condition: service_healthy` (README.md:152-158), scaling/per-module deployment commands (README.md:166-176), `.env.production` (README.md:181-185), `<script>` override (docs/ARCHITECTURE.md:22-28), execution commands (README.md:38-44, 52-68; docs/ARCHITECTURE.md:42-44). Cited where limiting/refuting claims. Also excluded "Environment-specific remotes" (README.md:178-187), instructions to create variables/change webpack.prod.config.js, unapplied (no remote URL `process.env` in shell-app/webpack.prod.config.js:41-66); "Troubleshooting" table (README.md:202-210), diagnostic instructions, though "Module Unavailable" exists (shell-app/src/App.jsx:97); nginx.conf line (docs/ARCHITECTURE.md:12), SPA/CORS/cache infrastructure; "Next steps" (docs/ARCHITECTURE.md:53-58), intentions, shared-token package (docs/ARCHITECTURE.md:56) already corresponding to `shared-design-system` (shared-design-system/webpack.config.js:39), CI step (docs/ARCHITECTURE.md:57) confirming absent CI; final reader task-selection sentence of docs/ARCHITECTURE.md (docs/ARCHITECTURE.md:62), no project description.

`doc-*` exclusions: README.md:1 title; README.md:2 technology subtitle ("React + Webpack Module Federation + Docker"); README.md:11 tree root in claim 1; README.md:30 repeats 4; README.md:72 heading; README.md:106 code comment in claim 8; README.md:197 repeats 12; README.md:206 troubleshooting; docs/ARCHITECTURE.md:1 title; docs/ARCHITECTURE.md:16 repeats 21; docs/ARCHITECTURE.md:30 heading, list claim 25; docs/ARCHITECTURE.md:57 next step. docs/ARCHITECTURE.md:3 claim 19, repeats 4/12.

Previously cited comments read: eleven applications' `webpack.config.js`, shell-app/webpack.prod.config.js, module `index.js`, `bootstrap.js`, `App.jsx`, `AuthContext.jsx`, Dockerfiles, unit/gateway `nginx.conf`, docker-compose.yml, shell-app/public/index.html, shell-app/src/config/remoteConfig.js, shell-app/src/remotes/remoteLoader.js, shell-app/src/App.jsx, shell-app/src/contexts/AuthContext.jsx, shell-app/src/components/Login.jsx, shared-design-system/src/contexts/ThemeContext.jsx. Collective-unit claims rows 27 through 34 or repeating paragraphs. Read without rows: `nginx.conf` CORS/cache ("Required so the Shell container can fetch remoteEntry.js from this module. Module Federation loads remote bundles cross-origin at runtime.", module-cloud-labs/nginx.conf:8-9; "Shell checks it on every load", :28-29), infrastructure; Docker shell requests same-gateway relative paths (shell-app/public/index.html:22-34), not other origin; docker-compose.yml and nginx/nginx.conf section comments (e.g. docker-compose.yml:4, nginx/nginx.conf:17), headings; shell-app/webpack.prod.config.js header truncated comment with CSS-rule fragments/"instead of localhost ports — containers talk to each other by name on micro-net" (shell-app/webpack.prod.config.js:1-11), unapplied: no module remote URL (shell-app/webpack.prod.config.js:44-57).

## Claims

| # | Document | Claim | Theme | Corroboration | Evidence |
|---|---|---|---|---|---|
| 1 | README.md:4 | "A production-ready micro-frontend setup with 3 independent modules" | structure | contradicted | 3.4.3 (11 units `Yes`); 3.4.5 #1-9 |
| 2 | README.md:4 | "each running in its own Docker container" | build-deploy | corroborated | 3.4.6 #1-11; docker-compose.yml:29-179 |
| 3 | README.md:4 | "orchestrated by a Shell host app" | structure | corroborated | 3.4.3 (shell-app `Yes`); 3.4.5 #1-9 |
| 4 | README.md:12 | "shell-app/ ← Host (port 3000) — loads all modules at runtime" | composition | corroborated | 3.4.5 #1-9; 3.4.4 (manual, shell-app/src/App.jsx:15-71) |
| 5 | README.md:16 | "docker-compose.yml ← Master orchestrator" | build-deploy | corroborated | 3.4.6 #1-11; docker-compose.yml:3-184 |
| 6 | README.md:29 | "Each module **exposes** a React component via `remoteEntry.js`." | composition | corroborated | 3.4.5 #1-9; module-cloud-labs/webpack.config.js:30-31, 46-48 |
| 7 | README.md:46 | "Shell waits for all 3 modules to pass healthchecks before starting." | build-deploy | contradicted | 3.4.6 (Repository overview, `depends_on`); docker-compose.yml:168-178 |
| 8 | README.md:103 | "Shell imports modules like normal React" | composition | contradicted | 3.4.4 (manual, shell-app/src/App.jsx:15-71); 3.4.4 src-load-remote; shell-app/webpack.config.js:32-47 |
| 9 | README.md:113-114 | "With `singleton: true`, all modules share ONE React instance negotiated at runtime." | composition | corroborated | module-cloud-labs/webpack.config.js:49-53; shell-app/webpack.config.js:51-53; shared-design-system/webpack.config.js:50-54 |
| 10 | README.md:120 | "Each module's Dockerfile (multi-stage)" | build-deploy | corroborated | 3.4.6 #1-11; module-cloud-labs/Dockerfile:1-22 |
| 11 | README.md:164, 167 | "Scale a single module" […] "Scale dashboard to 3 instances (behind a load balancer)" | build-deploy | contradicted | docker-compose.yml:54-58; nginx/nginx.conf:49-50 |
| 12 | README.md:171 | "Deploy only one module" | build-deploy | corroborated | 3.4.6 #1-9 |
| 13 | README.md:171 | "(zero-downtime)" | build-deploy | uncorroborated | — |
| 14 | README.md:194 | "Be developed by a separate team" | independence | uncorroborated | — |
| 15 | README.md:195 | "Run standalone (open `:3001` directly in browser)" | independence | corroborated | 3.4.3 (own entries); module-cloud-labs/src/App.jsx:18-33; module-cloud-labs/webpack.config.js:69-75 |
| 16 | README.md:196 | "Have its own CI/CD pipeline" | build-deploy | uncorroborated | — |
| 17 | README.md:198 | "Use a different version of shared libraries (with care)" | composition | contradicted | module-cloud-labs/webpack.config.js:49-67; shell-app/webpack.config.js:51-58; module-cloud-labs/package.json:11-14 |
| 18 | README.md:214-230 | "Project Structure (each module)" (annotated module tree: `index.js` "Entry (just: import("./bootstrap"))", `App.jsx` "Component exposed to Shell", `webpack.config.js` "Module Federation config (exposes CloudLabsApp)") | structure | corroborated | 3.4.3; 3.4.4 src-async-bootstrap; module-cloud-labs/src/index.js:4; module-cloud-labs/webpack.config.js:47 |
| 19 | docs/ARCHITECTURE.md:3 | "This repository implements a production-grade micro-frontend platform using Webpack 5 Module Federation, Docker, and nginx." | structure | corroborated | 3.4.3; 3.4.5 #1-19; 3.4.6 #1-11; shell-app/webpack.config.js:2, 30 |
| 20 | docs/ARCHITECTURE.md:7 | "Runtime Module Federation loader that injects `remoteEntry.js` at runtime (no hardcoded build-time remote URLs)." | composition | contradicted | 3.4.4 src-dynamic-script, src-load-remote; 3.4.6 #11; shell-app/public/index.html:22-48; shell-app/webpack.config.js:38-39 |
| 21 | docs/ARCHITECTURE.md:8 | "Centralized runtime remote config (`window.__RUNTIME_REMOTE_CONFIG__`) with sane localhost defaults; can be overridden at runtime (nginx or injected script)." | composition | partial | shell-app/src/config/remoteConfig.js:8-31; shell-app/public/index.html:51 |
| 22 | docs/ARCHITECTURE.md:9 | "Shell now lazy-loads remotes using a robust loader with timeouts and retry support." | composition | corroborated | 3.4.4 (manual, shell-app/src/App.jsx:148); shell-app/src/remotes/remoteLoader.js:4, 14-18, 55; shell-app/src/App.jsx:105-106, 131-142 |
| 23 | docs/ARCHITECTURE.md:10 | "`react`, `react-dom`, and `react-router-dom` are enforced as singletons with strict version matching." | composition | contradicted | shell-app/webpack.config.js:48-58; module-cloud-labs/webpack.config.js:49-63 |
| 24 | docs/ARCHITECTURE.md:11 | "Shell Docker build uses explicit `webpack.prod.config.js`." | build-deploy | corroborated | 3.4.6 #11; shell-app/Dockerfile:26 |
| 25 | docs/ARCHITECTURE.md:32-36 | "the shell uses a `RemoteWrapper` which: Uses `React.lazy()` with a runtime loader […] Calls the remote container `init()` […] Calls `container.get()` […] an error boundary with a Retry button on failure." | composition | corroborated | 3.4.4 src-load-remote; 3.4.4 (manual, shell-app/src/App.jsx:148); shell-app/src/App.jsx:79-153 |
| 26 | docs/ARCHITECTURE.md:46-51 | "Shell (host) […] Auth (remote) […] Dashboard (remote) […] Profile (remote)" (Docker Compose services) | structure | contradicted | 3.4.3; 3.4.6 #1-11; docker-compose.yml:29-179 |
| 27 | module-assessment/Dockerfile:6 | "Copy the shared design system folder first (required by the file:../shared-design-system dependency)" | build-deploy | corroborated | 3.4.6 (Repository overview); module-assessment/package.json:22; module-assessment/Dockerfile:7 |
| 28 | module-assessment/src/AuthContext.jsx:29, 110 | "Check if shell bridge is available (module running within shell)" […] "If shell bridge is available, subscribe to its changes instead of checking auth ourselves" | composition | corroborated | 3.4.5 #20-28; module-assessment/src/AuthContext.jsx:111-126 |
| 29 | shared-design-system/src/contexts/ThemeContext.jsx:13 | "Shell owns the DOM class — single source of truth" | composition | contradicted | 3.4.5 #28; shared-design-system/src/contexts/ThemeContext.jsx:14-22; module-assessment/src/pages/AssessmentReports.jsx:418 |
| 30 | shared-design-system/src/contexts/ThemeContext.jsx:24 | "React to synthetic StorageEvents dispatched from any module" | composition | contradicted | 3.4.4 (Notes); shared-design-system/src/contexts/ThemeContext.jsx:25-33 |
| 31 | shell-app/public/index.html:16-17 | "In Docker (port 80/443), use relative paths handled by gateway Nginx. In dev (port 3000), use localhost port-based URLs." | composition | corroborated | 3.4.5 #1-9, #19; shell-app/public/index.html:18-48; nginx/nginx.conf:25-134 |
| 32 | shell-app/src/contexts/AuthContext.jsx:136, 218, 227 | "Notify remotes of auth state" […] "Notify remotes of sign out" […] "Setup window bridge for remotes to access auth" | composition | corroborated | 3.4.4 (manual, shell-app/src/contexts/AuthContext.jsx:229); 3.4.5 #20-28 |
| 33 | shell-app/webpack.config.js:32-33 | "We rely on runtime remote loading (shell reads window.__RUNTIME_REMOTE_CONFIG__) but sharedDesignSystem is imported statically at build-time." | composition | corroborated | 3.4.5 #19; shell-app/webpack.config.js:34-47; shell-app/src/App.jsx:3 |
| 34 | shell-app/webpack.config.js:48-50 | "Relax strict version checks at build time so remotes with minor patch versions can still initialize during development." | composition | corroborated | shell-app/webpack.config.js:51-58; module-cloud-labs/webpack.config.js:49-67 |

## Observations

**1. README.md:4.** Says three modules, repeats in tree showing shell-app/module-cloud-labs/module-dashboard/module-virtual-machine (README.md:11-16), loading diagram shell linked to three `remoteEntry.js` (README.md:24-26), "Build and start all 4 containers" (README.md:39), "Shell waits for all 3 modules" (README.md:46), "4 copies total" (README.md:113). Structural eleven applications: shell, nine `module-*`, `shared-design-system`; shell loads nine by route (composition relationships 1 through 9). Micro-frontends holds, count not. "production-ready" author assessment without deciding artifact.

**2. README.md:4.** Each own Dockerfile/service in docker-compose.yml, `separate` deployment for eleven. Sentence names three modules, property applies all, shell/design system too.

**3. README.md:4.** Shell-app host mounts layout/authentication/theme, loads by route (shell-app/src/App.jsx:167-277, 290-297). "orchestrated" host role, container orchestration assigned Compose in claim 5.

**4. README.md:12.** Shell runtime loads nine: each `React.lazy` over `loadRemoteComponent`, injects `remoteEntry.js` only on route opening (shell-app/src/App.jsx:15-77; shell-app/src/remotes/remoteLoader.js:51-65). "all modules" nine. Repetitions: README.md:30 ("The Shell **loads** those components at runtime — not at build time"), heading "Shell CONSUMES them" (README.md:88), docs/ARCHITECTURE.md:3 ("the `shell-app` composes remotes at runtime"), "How Modules Connect" diagram (README.md:19-27), browser shell `http://localhost:3000`, fetches module `remoteEntry.js` at `http://localhost:3001`–`3003` (README.md:22-26). Matches non-Docker `index.html` branch, cloud-labs/dashboard/virtual-machine on three ports (shell-app/public/index.html:38-40), but branch ten URLs `localhost:3001`–`3010` for nine/design system (shell-app/public/index.html:36-47); diagram three repeats claim 1 count. Docker gateway-relative URLs (claim 31). Port 3000 `devServer` (shell-app/webpack.config.js:65), execution detail.

**5. README.md:16.** docker-compose.yml starts gateway/design system/nine modules/shell on common network (docker-compose.yml:3-184). Sole collective execution file, no workspace/CI (structural Notes; build and deployment Repository overview).

**6. README.md:29.** Each module generates `remoteEntry.js`, exposes own `App` React component (e.g. `./CloudLabsApp` module-cloud-labs/webpack.config.js:46-48; nine exposures composition relationships 1 through 9). "Each module EXPOSES itself" (README.md:74), webpack comments ("Entry file exposed to shell", module-cloud-labs/webpack.config.js:31; "What we expose to the outside world", :47) repeat. Design system also `remoteEntry.js`, multiple tokens/CSS/context/components (shared-design-system/webpack.config.js:36-49), not one.

**7. README.md:46.** Compose no `healthcheck`, shell simple `depends_on` list (docker-compose.yml:168-178), startup ordering per review. README.md:152-158 `condition: service_healthy`, services `auth`/`dashboard`/`profile` mismatch docker-compose.yml. `contradicted`: no healthcheck wait, nine modules rather than three.

**8. README.md:103.** Heading/following code (README.md:105-109) named imports `lazy(() => import("auth/AuthApp"))`, webpack-declared remotes (README.md:92-100). Snapshot no module remotes (shell-app/webpack.config.js:32-33 comment; only `sharedDesignSystem` :34-47), no remote-module `import()`: each `React.lazy` receives `loadRemoteComponent` injecting script/requesting through `container.get` (shell-app/src/App.jsx:15-21; shell-app/src/remotes/remoteLoader.js:51-65). `React.lazy`/`Suspense` confirmed, import mode not. Code comment "Loaded at RUNTIME, not build time" (README.md:106) in claim 4.

**9. README.md:113-114.** `react` shared `singleton` in eleven configs (e.g. module-cloud-labs/webpack.config.js:50-53; shell-app/webpack.config.js:52; shared-design-system/webpack.config.js:51-54), shell initializes sharing before containers (shell-app/src/remotes/remoteLoader.js:40, 45). Entry comments repeat: "so that shared modules (React) can be negotiated between host and remotes" (module-cloud-console/src/index.js:2-3, same five other modules), "Async boundary required for Module Federation shared module negotiation" (shell-app/src/index.js:1). "4 copies total" (README.md:113) claim 1 count.

**10. README.md:120.** Eleven two-stage Dockerfiles: build `node:18-alpine`, service `nginx:alpine` (e.g. module-cloud-labs/Dockerfile:1-22). README.md:122-136 simpler than actual root-context files copying `shared-design-system` before installation (module-cloud-labs/Dockerfile:6-7, 10). docs/ARCHITECTURE.md:11 repeats ("multi-stage builds retained"), adds lockfile `npm ci` (module-cloud-labs/Dockerfile:11), installation detail.

**11. README.md:164, 167.** Says independently scale module, dashboard three instances behind balancer. All Compose fixed `container_name` (e.g. `mfe-dashboard`, docker-compose.yml:54-58), Docker Compose cannot create multiple fixed-name service containers; gateway forwards unique name (nginx/nginx.conf:49-50). No balancer. Deploy artifacts `contradicted`; "Scaling in Production" section, no snapshot production use.

**12. README.md:171.** Modules own Compose service/image, `separate` deployment nine. Repetitions: README.md:197 ("Deploy independently without redeploying others"), docs/ARCHITECTURE.md:3 ("keep each micro-frontend independently deployable"). Command uses service `auth` (README.md:175), absent from docker-compose.yml. Review limitation: shell CSS generated from module sources (shell-app/Dockerfile:13-22), new module class styled only after shell rebuild.

**13. README.md:171.** No container replacement without interruption description, replicas/update strategy/balancer (e.g. docker-compose.yml:145-156). `uncorroborated`.

**14. README.md:194.** Separate-team development organizational, no confirming/refuting artifact (no CODEOWNERS/responsibility division).

**15. README.md:195.** Each own `index.html`, `devServer`, bootstrap, standalone `App` (structural; module-cloud-labs/webpack.config.js:69-75; module-cloud-labs/src/bootstrap.js:3-7). `App` own `BrowserRouter` outside shell router (module-cloud-labs/src/App.jsx:18-33), comment "Standalone module-auth needs its own router for useNavigate, but the shell already provides one when the remote is mounted there" (module-cloud-labs/src/App.jsx:23-24; module-cloud-console/src/App.jsx:23-24, "module-profile"). Without shell bridge module `AuthContext` own authentication check ("Standalone mode: use existing auth check", module-assessment/src/AuthContext.jsx:128). Still depend design-system `remoteEntry.js`, standalone port 3010 (module-cloud-labs/webpack.config.js:36-37).

**16. README.md:196.** No CI workflow (build and deployment Repository overview), docs/ARCHITECTURE.md:57 next step. Says module "can" have pipeline; none shown, `uncorroborated`.

**17. README.md:198.** Actually shared libraries (`react`, `react-dom`, `react-router`, `react-router-dom`, `shared-design-system`) `singleton` all modules/shell (module-cloud-labs/webpack.config.js:49-67; shell-app/webpack.config.js:51-58). With `singleton`, one runtime version across units opposite different-version claim. Declared same: `react` `^18.2.0`, `react-router-dom` `^7.15.1` across modules/shell (e.g. module-cloud-labs/package.json:11-14; shell-app/package.json:12-15). Design system `react-router-dom` `^6.22.3` (shared-design-system/package.json:11), not shared (shared-design-system/webpack.config.js:50-59).

**18. README.md:214-230.** Nine have tree files: `src/index.js`, `src/bootstrap.js`, `src/App.jsx`, `src/styles.css`, `public/index.html`, `webpack.config.js`, `.babelrc`, `Dockerfile`, `nginx.conf`, `package.json`. `index.js` only bootstrap import (e.g. module-cloud-labs/src/index.js:4; module-assessment/src/index.js:1), `webpack.config.js` exposes `./src/App` (e.g. module-cloud-labs/webpack.config.js:47; module-assessment/webpack.config.js:53). Omits ubiquitous `AuthContext.jsx`, `ThemeContext.jsx`, `tailwind.config.js`, without completeness claim.

**19. docs/ARCHITECTURE.md:3.** Micro-frontends joined through Webpack 5 Module Federation (`ModuleFederationPlugin` from `webpack.container`, shell-app/webpack.config.js:2, 30), Docker/nginx packaging (build/deployment review). No dependencies.csv technology package because webpack built-in; composition `module-federation` relationships 1 through 19. "production-grade" assessment like claim 1 "production-ready".

**20. docs/ARCHITECTURE.md:7.** Loader creates runtime `<script>` for `remoteEntry.js`, initializes container (shell-app/src/remotes/remoteLoader.js:4-65). Parenthesis fails. Nine module/design-system URLs fixed in shell `index.html`, copied by `HtmlWebpackPlugin` into build (shell-app/public/index.html:22-48; shell-app/webpack.prod.config.js:67-69); address changes require shell rebuild per review. Remote `sharedDesignSystem` fixed fallback webpack URL (`http://localhost:3010/remoteEntry.js`, shell-app/webpack.config.js:38-39, same modules). URLs `contradicted`, loader confirmed. "Runtime Module Federation loader utilities" (shell-app/src/remotes/remoteLoader.js:1) repeats first part.

**21. docs/ARCHITECTURE.md:8.** Central config: `getRemoteUrl` reads `window.__RUNTIME_REMOTE_CONFIG__`, fills `localhost:3001`–`3010` defaults (shell-app/src/config/remoteConfig.js:8-31), `index.html` only defines object if absent (shell-app/public/index.html:51), permitting earlier script. No injecting artifact: `nginx.conf` no HTML changes, Dockerfiles no entry script (e.g. shell-app/Dockerfile:29-33). Document itself next-step injection (docs/ARCHITECTURE.md:55). docs/ARCHITECTURE.md:16-18 repeats ("The shell reads `window.__RUNTIME_REMOTE_CONFIG__`", development defaults/Docker override), as shell-app/public/index.html:15 and shell-app/src/config/remoteConfig.js:2-5 comments. Configuration confirmed, nginx/script injection no artifact.

**22. docs/ARCHITECTURE.md:9.** Nine `React.lazy` remotes (shell-app/src/App.jsx:15-77). `loadScript` timeout 10 seconds (shell-app/src/remotes/remoteLoader.js:4, 14-18; :55). Retry outside loader despite "timeout, retry" comment (shell-app/src/remotes/remoteLoader.js:2): "Retry" button of `RemoteErrorBoundary`, removes script/remounts (shell-app/src/App.jsx:105-106, 131-142). Whole-shell claim holds.

**23. docs/ARCHITECTURE.md:10.** Three libraries `singleton` shell/modules (shell-app/webpack.config.js:52-55; module-cloud-labs/webpack.config.js:50-63). No `strictVersion` configuration (only shell-app/webpack.config.js:50 comment), shell no `requiredVersion` (shell-app/webpack.config.js:51-58), modules `^18.2.0` only `react`/`react-dom`. Shell comment opposite: strict checks relaxed (claim 34). Singletons hold, strict matching refuted.

**24. docs/ARCHITECTURE.md:11.** Shell Dockerfile `npx webpack --config webpack.prod.config.js --mode production` (shell-app/Dockerfile:26), script `build` uses `webpack.config.js` (shell-app/package.json:6), per review. Modules no separate production config.

**25. docs/ARCHITECTURE.md:32-36.** `RemoteWrapper` wraps remote in `RemoteErrorBoundary`/`Suspense` (shell-app/src/App.jsx:128-153); failure "Module Unavailable"/"Retry" (:97, :106), loading `ModuleLoader` (:116-125). Calls `__webpack_init_sharing__`, `container.init`, `container.get` (shell-app/src/remotes/remoteLoader.js:40, 45, 62). One literal mismatch: `React.lazy` outside `RemoteWrapper`, atop `App.jsx` (shell-app/src/App.jsx:15-77), receives ready component through routes (:169-276). Described sequence holds.

**26. docs/ARCHITECTURE.md:46-51.** Lists Shell/Auth/Dashboard/Profile at ports 3000 through 3003. No authentication/profile units: 3001 module-cloud-labs, 3003 module-virtual-machine (module-cloud-labs/webpack.config.js:74; module-virtual-machine/webpack.config.js:77), Compose nine/design system (docker-compose.yml:29-179). Dashboard/Shell exist. Same `auth`/`dashboard`/`profile` in override (docs/ARCHITECTURE.md:24-26), shell does not read keys (shell-app/public/index.html:24-33). Opening "will be reachable on localhost" (docs/ARCHITECTURE.md:40); snapshot Compose only gateway publishes port 80 (docker-compose.yml:8-9), others `expose` (e.g. docker-compose.yml:46-47).

**27. module-assessment/Dockerfile:6.** Nine module/shell Dockerfiles copy `shared-design-system` to `/shared-design-system` before `npm install`, each `package.json` `file:../shared-design-system` (module-assessment/package.json:22; module-assessment/Dockerfile:7, 10-11); same comment all (e.g. module-cloud-labs/Dockerfile:6; shell-app/Dockerfile:6). Review adds directory Tailwind tokens (module-cloud-labs/tailwind.config.js:1), no `.js`/`.jsx` named-package import; code arrives through runtime remote.

**28. module-assessment/src/AuthContext.jsx:29, 110.** Checks `window.__SHELL_AUTH__`, bridge present subscribes `onAuthChange` instead of own check (module-assessment/src/AuthContext.jsx:30-34, 111-126). Same comments other eight `AuthContext.jsx` (e.g. module-cloud-labs/src/AuthContext.jsx:29, 110). Module side `communication` relationships 20 through 28; shell side claim 32.

**29. shared-design-system/src/contexts/ThemeContext.jsx:13.** Says only shell controls `dark` on `documentElement`. Effect every `ThemeProvider` instance (shared-design-system/src/contexts/ThemeContext.jsx:14-22), each module mounts own (source-code, e.g. module-dashboard/src/App.jsx:11). Module-assessment `toggleTheme` (module-assessment/src/pages/AssessmentReports.jsx:418) changes class from module, hence composition relationship 28 `bidirectional`. Shell login also writes class/key outside provider (shell-app/src/components/Login.jsx:47-55). No sole source.

**30. shared-design-system/src/contexts/ThemeContext.jsx:24.** `storage` listener exists (shared-design-system/src/contexts/ThemeContext.jsx:25-33), no module fires `StorageEvent`: `StorageEvent`/`dispatchEvent` search only comment, per source-code Notes. Native event only other windows. Described synthetic cross-module notifications absent.

**31. shell-app/public/index.html:16-17.** `index.html` selects by port: empty, 80, 443 relative `/<nome>-remote/remoteEntry.js` (English explanation: name placeholder); others `http://localhost:3001`–`3010` (shell-app/public/index.html:18-48). Gateway forwards paths to remote containers (nginx/nginx.conf:25-134), development ports `devServer` (composition relationships 1 through 9 and 19). Docker shell/remotes browser same gateway origin.

**32. shell-app/src/contexts/AuthContext.jsx:136, 218, 227.** Shell publishes `window.__SHELL_AUTH__` getters, `onAuthChange`, `signOut` (shell-app/src/contexts/AuthContext.jsx:228-257), notifies login/logout subscribers (:137, :219). Composition bridge relationships 20 through 28. "Set credentials via auth context or bridge" (shell-app/src/components/Login.jsx:69) internal shell use.

**33. shell-app/webpack.config.js:32-33.** No nine module remotes, runtime loader (claim 20); only `sharedDesignSystem` declared (shell-app/webpack.config.js:34-47), static specifier (`import "sharedDesignSystem/styles"`, shell-app/src/App.jsx:3; reexport shell-app/src/contexts/ThemeContext.jsx:1). "imported statically at build-time" declaration in build; code still runtime through `promise` reading `design_system` URL/reusing `window.sharedDesignSystem` (shell-app/webpack.config.js:35-46). Same remote shell-app/webpack.prod.config.js (:44-57), no comment.

**34. shell-app/webpack.config.js:48-50.** Shell `shared` lacks `requiredVersion`/`strictVersion` (shell-app/webpack.config.js:51-58), modules only range `^18.2.0` for `react`/`react-dom`, no `strictVersion` (module-cloud-labs/webpack.config.js:49-67). Comment matches config/refutes "strict version matching" claim 23. Production suggestion ("pin exact versions or enable strictVersion") unapplied in shell-app/webpack.prod.config.js:58-65.

## Summary

Claims: 34 (corroborated: 20, partial: 1, contradicted: 10, uncorroborated: 3). Themes: (structure: 5, composition: 17, build-deploy: 10, independence: 2).
