---
schema: 1
id: 1297539319
full_name: Efraim0601/union-portal
commit: b11a3e3aa55aff8195e0cde0026ccbd45245266d
inputs:
  mining:
    output: data/mining/mfe-mining-001
    version: "1"
    config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-21
---

# 059 — Efraim0601/union-portal

## Repository overview

Documentation is in French and has two layers.
- **README:** the repository's only `.md`. It has 286 lines and serves as an operations manual: architecture (README.md:7-31), local development, build, Docker deployment, centralized deployment of the solution's four components, HTTPS, payment and troubleshooting.
- **Comments and descriptive fields:** read in artifacts cited by previous reviews:
  - package.json (`description`), tsconfig.json and angular.json;
  - all three `federation.config.js` files, containing only generator default comments;
  - Dockerfile, deploy/nginx.conf, deploy/40-selfsigned-cert.sh, deploy/federation.manifest.prod.json and docker-compose.yml;
  - deploy/test/docker-compose.yml, deploy/test/Dockerfile.otp and deploy/test/Dockerfile.ocr;
  - deploy/server/deploy.sh, deploy/server/stop.sh and deploy/server/components.env;
  - projects/shell/src/main.ts, projects/shell/src/bootstrap.ts, projects/shell/src/app/app.config.ts, projects/shell/src/app/app.routes.ts and projects/shell/src/app/app.ts;
  - projects/promote/src/app/remote.routes.ts and projects/diaspora/src/app/remote.routes.ts;
  - projects/diaspora/src/app/app.routes.ts and projects/diaspora/src/app/pages/legacy-onboarding.ts;
  - projects/auth/src/lib/client-auth-store.ts and projects/diaspora/src/app/core/admin-auth.ts;
  - server/diaspora-otp/index.js and server/diaspora-otp/package.json.

Almost everything documentation says about unit organization matches previous reviews: monorepo, host and remotes in Native Federation, single image under one origin, production manifest, nested routes and remotes also running independently. Four points differ.
- **Technology:** README opening calls federation "module federation", with line 17 itself correcting it to Native Federation.
- **Shared login:** documentation claims a shared session (SSO) through library `@union/auth` in several places. The library implements the mechanism, but no application uses it.
- **Shared libraries:** README presents `@union/auth` as one of the "libs partagées" (English translation: "shared libraries"), refuted by the snapshot for the same reason.
- **Legacy workflow:** a comment says the reverse proxy serves the legacy workflow under the same domain, but snapshot nginx sends that path to shell.

Excluded from the table for not addressing units as a whole (architectural claim criterion, method step 3 in `INSTRUCTIONS.md`), but worth recording:
- **Infrastructure details:**
  - **Certificate:** the image generates a self-signed certificate on startup if none exists (Dockerfile:34-36; deploy/40-selfsigned-cert.sh:16-27).
  - **Upstreams:** backend addresses come from environment variables (Dockerfile:26-33).
  - **HTTPS port:** README gives 8443 as default local HTTPS port (README.md:182-183, 187), but compose declares 6443 (docker-compose.yml:29). A documentation inconsistency.
  - **Test stack:** has a local backend, and compose publishes portal only on loopback (deploy/test/docker-compose.yml:27). The comment mentions access through a Cloudflare tunnel, outside the snapshot (deploy/test/docker-compose.yml:8-9).
  - **Back office:** gateway forwards diaspora back-office paths to backend under the same origin (deploy/nginx.conf:101-123). The comment describes it as backend-rendered; backend is absent from the snapshot (deploy/nginx.conf:96-98).
- **Internal unit details:**
  - **Promote:** provides `HttpClient`, `Api` and `Auth` in exposed routes to avoid inheriting shell's injector (projects/promote/src/app/remote.routes.ts:26-33).
  - **Diaspora:** does the same with `HttpClient` (projects/diaspora/src/app/remote.routes.ts:9-15).
  - **Diaspora authentication:** simulated only in development (projects/diaspora/src/app/core/admin-auth.ts:24-27).
- **Backend-only relationships:**
  - **OTP and OCR:** OTP server forwards requests to OCR service (server/diaspora-otp/index.js:26-27).
  - **API key:** stays on server (server/diaspora-otp/package.json:6).
- **Appearance and external systems:**
  - **Tokens:** would match a bank system's tokens (README.md:18-19).
  - **External components:** teams, stacks and cycles of external components (README.md:114-115).
- **Outdated passage:** README instructs adding to `deploy/nginx.conf` a `location /api` already present (README.md:104-106; deploy/nginx.conf:86-87).

`doc-*` occurrences that did not become rows: README.md:50 and README.md:54, execution instructions (`serve:all` and `serve:shell`). Others (README.md:4, 10, 17, 27, 282) are in claims 2, 8, 9 and 19.

## Claims

| # | Document | Claim | Theme | Corroboration | Evidence |
|---|---|---|---|---|---|
| 1 | Dockerfile:2-3 | "image unique (gateway) servant shell + promote + diaspora […] une seule origine" (English translation: Single gateway image serves shell, promote and diaspora under one origin.) | build-deploy | corroborated | 3.4.6 #1-#3 (deploy `joint`); Dockerfile:38-41; deploy/nginx.conf:31-40, 128-130 |
| 2 | Dockerfile:3 | "Architecture host/remotes (Native Federation)" (English translation: Host/remotes architecture through Native Federation.) | structure | corroborated | 3.4.2 (technology `native-federation`); 3.4.5 #1-#2; projects/shell/src/app/app.routes.ts:2 |
| 3 | Dockerfile:3 | "(SSO partagé)" (English translation: Shared SSO login.) | composition | contradicted | 3.4.4 (projects/auth/src/lib/client-auth-store.ts:71, Composition `No`); projects/diaspora/src/app/core/admin-auth.ts:21-23; projects/shell/src/app/app.config.ts:9-10 |
| 4 | Dockerfile:8 | "Stage 1 : build des 3 apps" (English translation: Stage one builds all three apps inside the image.) | build-deploy | corroborated | 3.4.6 (Overview); Dockerfile:9-22 |
| 5 | Dockerfile:42 | "Manifest de PROD (chemins same-origin) écrase celui de dev (localhost:*)" (English translation: The production manifest with same-origin paths overwrites the development manifest using localhost.) | build-deploy | corroborated | 3.4.5 #1-#2 (Configuration); Dockerfile:43; deploy/federation.manifest.prod.json:2-3 |
| 6 | README.md:1 | "Monorepo frontend" (English translation: Frontend monorepo.) | structure | corroborated | 3.4.3 (Workspace and three applications in `projects/`); angular.json:20-21, 146-147, 273-274 |
| 7 | README.md:3 | "reproduisant l'architecture de `portal-client-firstpay`" (English translation: Reproduces another portal's architecture.) | other | uncorroborated | — |
| 8 | README.md:4 | "(host + remotes via **module federation**)" (English translation: Host and remotes through module federation.) | composition | contradicted | 3.4.2 (technology `native-federation`, rather than `module-federation`); projects/shell/src/app/app.routes.ts:2 |
| 9 | README.md:10-11 | "shell (host, :4200) ──loadRemoteModule──► promote (remote, :4201) expose ./Routes / diaspora (remote, :4202) expose ./Routes" (English translation: Shell loads promote and diaspora through loadRemoteModule, and each remote exposes Routes.) | composition | corroborated | 3.4.5 #1-#2; projects/shell/src/app/app.routes.ts:13, 18; projects/promote/federation.config.js:4-10; projects/diaspora/federation.config.js:4-10 |
| 10 | README.md:13 | "libs partagées : @union/design-system" (English translation: Shared design-system library.) | structure | corroborated | angular.json:88, 214, 341 (tokens in all three builds) |
| 11 | README.md:13-14 | "libs partagées : […] @union/auth" (English translation: Shared authentication library.) | structure | contradicted | 3.4.4 (without an application import); tsconfig.json:20; projects/diaspora/src/app/core/admin-auth.ts:21-23 |
| 12 | README.md:20 | "`@union/auth` partage la clé localStorage `portail_client_auth` (JWT, sync cross-tab)" (English translation: The authentication library shares the common localStorage JWT key with cross-tab synchronization.) | composition | contradicted | 3.4.4 (projects/auth/src/lib/client-auth-store.ts:71, Composition `No`); projects/promote/src/app/core/auth.ts:7; projects/diaspora/src/app/core/admin-auth.ts:3 |
| 13 | README.md:20-21 | "interopérable avec les apps de la banque servies sur la même origine" (English translation: The session interoperates with bank applications served under the same origin.) | composition | uncorroborated | — |
| 14 | README.md:42-43 | "Le frontend ne fonctionne pas seul : il appelle **deux backends** (dépôts séparés)" (English translation: Frontend depends on two backends in separate repositories.) | structure | corroborated | deploy/nginx.conf:72-87; deploy/server/components.env:35-39, 50-54 |
| 15 | README.md:52 | "(app complète, standalone)" (English translation: Promote runs independently as a complete application.) | independence | corroborated | 3.4.3 (promote's own entry point and build); angular.json:192 (promote's `serve` target) |
| 16 | README.md:114-116 | "**4 composants**, chacun dans son dépôt […] **pilotés depuis union**, qui est le point de centralisation du déploiement" (English translation: Four components, each in its own repository, with deployment directed from union as the central deployment point.) | structure | corroborated | 3.4.6 (Overview); deploy/server/components.env:15, 22-73; deploy/server/deploy.sh:35-40, 130-153 |
| 17 | README.md:138-143 | "Câblage API (proxy `deploy/nginx.conf`, origine unique — pas de CORS)" (English translation: Gateway proxies APIs under one origin, without CORS.) | build-deploy | corroborated | 3.4.6 (Overview); deploy/nginx.conf:72-87 |
| 18 | README.md:279-281 | "l'adoption complète des composants `@union/design-system` dans les 17 pages est progressive" (English translation: Adoption of design-system components across seventeen pages is progressive.) | structure | partial | projects/design-system/src/public-api.ts:6-10; projects/promote/src/styles.css:8, 12 |
| 19 | README.md:282 | "les remotes tournent parfaitement en standalone" (English translation: Both remotes run perfectly independently.) | independence | corroborated | 3.4.3 (promote and diaspora's own entry points and builds); angular.json:192, 319 (remotes' `serve` targets) |
| 20 | README.md:282-284 | "sous le host, les routes s'imbriquent (`/promote/…`, `/diaspora/…`)" (English translation: Under host, routes nest under promote and diaspora prefixes.) | composition | corroborated | 3.4.5 #1-#2; projects/shell/src/app/app.routes.ts:9-20 |
| 21 | deploy/nginx.conf:43-48 | "On sert l'unique copie (identique entre remotes) à la racine, pour les deux apps" (English translation: One identical copy of MediaPipe files at root serves both apps.) | build-deploy | corroborated | deploy/nginx.conf:51-52; projects/promote/src/app/shared/face-mesh.ts:51, 53; projects/diaspora/src/app/shared/face-mesh.ts:53, 65-66; projects/promote/public/mediapipe and projects/diaspora/public/mediapipe (identical content) |
| 22 | projects/diaspora/src/app/app.routes.ts:10 | "embarque le parcours legacy FastAPI en iframe" (English translation: Embeds the legacy FastAPI workflow through an iframe.) | composition | contradicted | 3.4.5 #3; projects/diaspora/src/app/pages/legacy-onboarding.ts:19-24, 31-36; deploy/nginx.conf:128-130 |
| 23 | projects/diaspora/src/app/core/admin-auth.ts:21-23 | "`@union/auth` (ClientAuthStore) existe dans le monorepo mais n'est branché nulle part" (English translation: The common authentication library exists in the monorepo but is connected nowhere.) | structure | corroborated | 3.4.4 (projects/auth/src/lib/client-auth-store.ts:71, Composition `No`); projects/promote/src/app/core/auth.ts:7; projects/diaspora/src/app/core/admin-auth.ts:3 |
| 24 | projects/diaspora/src/app/pages/legacy-onboarding.ts:16-17 | "le reverse proxy sert le flux legacy sur le même domaine" (English translation: Reverse proxy serves the legacy workflow under the same domain.) | build-deploy | contradicted | 3.4.5 #3; deploy/nginx.conf:128-130 |
| 25 | projects/shell/src/app/app.ts:5-6 | "chaque remote (diaspora hub, promote) fournit son propre layout plein écran + en-tête. Le shell ne fait qu'orchestrer la fédération" (English translation: Each remote provides its own full-screen layout and header; shell only orchestrates federation.) | composition | corroborated | projects/shell/src/app/app.ts:9-14; projects/promote/src/app/remote.routes.ts:35-36; projects/diaspora/src/app/pages/home.ts:29-31 |
| 26 | projects/shell/src/app/app.ts:7 | "partager la session (SSO via ClientAuthStore, provisionné au bootstrap)" (English translation: Shell shares the session through `ClientAuthStore` provisioned at bootstrap.) | composition | contradicted | projects/shell/src/bootstrap.ts:1-5; projects/shell/src/app/app.config.ts:9-10 |

## Observations

**1. Dockerfile:2-3.** The image's opening comment describes the arrangement recorded by the build and deployment review: three builds copied into one nginx under one origin. Repetitions: docker-compose.yml:2-3, deploy/nginx.conf:1-4, deploy/server/deploy.sh:9, deploy/server/components.env:61-62, deploy/test/docker-compose.yml:4, README.md:75-79 and README.md:133.

**2. Dockerfile:3.** "host/remotes" with Native Federation matches dependency, configuration and loading code. Repetitions: package.json's `description` (package.json:4), README.md:17, project table roles (README.md:27-29) and host route comment (projects/shell/src/app/app.routes.ts:4-5).

**3. Dockerfile:3.** Shared session is documentation's most repeated claim: README.md:4-5 and 77; deploy/nginx.conf:5. Two variations describe separate mechanisms and have separate rows: sharing through the common key with cross-tab synchronization (claim 12), and bootstrap provisioning (claim 26). The mechanism exists in the library: it listens to `storage` and writes session to the common key (projects/auth/src/lib/client-auth-store.ts:68-75, 153-157). But it is not connected to applications. No application imports `@union/auth`, and diaspora's comment admits it "n'est branché nulle part" (English translation: "is connected nowhere") (projects/diaspora/src/app/core/admin-auth.ts:21-23). Promote and diaspora store tokens under their own keys: `afp_token` and `diaspora_admin_token` (projects/promote/src/app/core/auth.ts:7, 41, 93; projects/diaspora/src/app/core/admin-auth.ts:3, 10, 42). Only "une seule origine" (English translation: "a single origin") is confirmed, already in claim 1. Documentation describes intent, rather than snapshot state.

**4. Dockerfile:8.** The first stage installs dependencies once and runs all three builds (Dockerfile:13-14, 20-22). Repetition: README.md:162-163, adding that server needs only Docker.

**5. Dockerfile:42.** The image replaces development federation manifest with `localhost` URLs by production manifest with same-origin paths (Dockerfile:43; deploy/federation.manifest.prod.json:2-3). This links joint deployment to remote loading, already recorded in the composition review.

**6. README.md:1.** The repository is an Angular CLI workspace with all three applications and two libraries in `projects/` (angular.json:20-21, 146-147, 273-274; tsconfig.json:19-20). Repetitions: README.md:3 ("Monorepo **Angular CLI 21**"), package.json:4 and tsconfig.json:1.

**7. README.md:3.** The reference to `portal-client-firstpay`, supposedly another bank system, is unverifiable in the snapshot.

**8. README.md:4.** The opening sentence names "module federation". The snapshot uses `@angular-architects/native-federation` (projects/shell/src/app/app.routes.ts:2), recorded by the dependency review as a distinct technology. Line 17 of the same README corrects the name ("équivalent esbuild du Module Federation de la banque", English translation: "esbuild equivalent of the bank's Module Federation"), but under the rule the wrong name is a `contradicted` claim. For a term search, this sentence would lead to the wrong technology. The "host + remotes" portion is in claim 2.

**9. README.md:10-11.** The diagram adds mechanism and modules to claim 2. Shell calls `loadRemoteModule('promote', './Routes')` and `loadRemoteModule('diaspora', './Routes')` (projects/shell/src/app/app.routes.ts:13, 18), and each remote exposes `./Routes` with the matching name. Ports are development server ports (see the build and deployment review).

**10. README.md:13.** All three applications use design-system: all three builds include its CSS tokens (angular.json:88, 214, 341). Repetitions: README.md:30 and tsconfig.json:2. Component adoption is claim 18.

**11. README.md:13-14.** The library exists and has an alias (tsconfig.json:20; projects/auth/src/lib/client-auth-store.ts:15, 60), but no unit uses it. Thus it is not shared in the snapshot (shared library rule, method step 3 in `INSTRUCTIONS.md`). Repetitions: README.md:31 and tsconfig.json:2. Its session use is claim 3.

**12. README.md:20.** The library implements the mechanism: it writes session under key `portail_client_auth` and listens to `storage` to synchronize tabs and applications (projects/auth/src/lib/client-auth-store.ts:15, 68-75, 153-157). No application uses it, and promote and diaspora store tokens under their own keys. Repetition: projects/auth/src/lib/client-auth-store.ts:4-12, presenting the store as "PARTAGÉ" (English translation: "SHARED") between promote, diaspora and bank applications.

**13. README.md:20-21.** Session interoperability with bank applications served under the same origin depends on external systems. The library's opening comment repeats the "contrat d'interopérabilité" (English translation: "interoperability contract") (projects/auth/src/lib/client-auth-store.ts:7-9). The library writes in `zustand/persist` format "pour rester interopérable" (English translation: "to remain interoperable") (projects/auth/src/lib/client-auth-store.ts:156-157), but nothing in the snapshot confirms the other endpoint, and the library itself is unused (claims 3 and 12).

**14. README.md:42-43.** Nginx forwards `/promote-api/` and `/api/` to two upstreams (deploy/nginx.conf:72-87). The deployment manifest points both backends to external repositories (deploy/server/components.env:35-39, 50-54).

**15. README.md:52.** Promote has its own entry point, build and development server, and its exposed route comment explains maintaining the same layout when served independently or in shell. Repetition: projects/promote/src/app/remote.routes.ts:19-21.

**16. README.md:114-116.** The deployment manifest describes four components, each with its own repository, and frontend portal is one, with all three applications together (deploy/server/components.env:15, 61-73; README.md:133). deploy.sh reads the manifest and, for each component, rebuilds its image and recreates its service. Repetitions: deploy/server/deploy.sh:5-7 and deploy/server/stop.sh:3. Documentation reinforces that the deployment boundary is the whole portal, rather than each micro-frontend. The portion on different teams, stacks and cycles concerns external components and remained outside the table. The sentence concerns structure and deployment, both confirmed; because it is unsplit, Theme follows the first property, `structure`.

**17. README.md:138-143.** The "câblage" table (English translation: "wiring") matches nginx proxy blocks. Repetitions: docker-compose.yml:2-5 and deploy/server/components.env:61-63.

**18. README.md:279-281.** Design-system exports components: a utility, three directives and a card (projects/design-system/src/public-api.ts:6-10). No application imports them, and promote's stylesheet only calls itself "alinhada" (English translation: "aligned") with design-system in comments (projects/promote/src/styles.css:8, 12). Incomplete adoption is confirmed. Adoption being underway has no artifact. Hence the claim is `partial`.

**19. README.md:282.** Promote and diaspora have their own entry points, builds and development servers, on ports 4201 and 4202. Repetition: projects/diaspora/src/app/remote.routes.ts:9-10, providing `HttpClient` in exposed routes so diaspora works independently or in shell. "parfaitement" (English translation: "perfectly") is unverifiable without execution.

**20. README.md:282-284.** Shell routes `promote` and `diaspora` load remotes as child routes, confirming nesting. The warning about promote's internal absolute links is a declared outstanding issue not verified.

**21. deploy/nginx.conf:43-48.** The comment explains deployment coupling between units. Both applications request MediaPipe files at root (e.g.: projects/promote/src/app/shared/face-mesh.ts:51, 53), and nginx serves diaspora build's copy at root (deploy/nginx.conf:51-52). Promote and diaspora `public/mediapipe` folders have identical content, confirming "identique entre remotes" (English translation: "identical between remotes").

**22. projects/diaspora/src/app/app.routes.ts:10.** The route exists and its component renders an `<iframe>` (projects/diaspora/src/app/pages/legacy-onboarding.ts:31-36). Repetition: projects/diaspora/src/app/pages/legacy-onboarding.ts:5-7. Default target is relative path `/open-account-flow-test` (projects/diaspora/src/app/pages/legacy-onboarding.ts:19-24), and nothing in the snapshot defines override `__LEGACY_ONBOARDING_URL__`. With snapshot configuration, nginx sends that path to shell (deploy/nginx.conf:128-130), and iframe does not receive the claimed FastAPI workflow. Judgment applies to snapshot configuration. The composition review left the relationship `Undetermined` because target may be defined outside the repository.

**23. projects/diaspora/src/app/core/admin-auth.ts:21-23.** The only repository text describing the authentication library's actual state. The source code review found no application import of it, and promote and diaspora use their own keys (`afp_token` and `diaspora_admin_token`). The same comment explains promote authentication depends on its own backend. It contradicts claims 3, 11, 12 and 26, written in the same repository.

**24. projects/diaspora/src/app/pages/legacy-onboarding.ts:16-17.** The comment says that, without override, relative path `/open-account-flow-test` is served by reverse proxy under the same domain. The snapshot's only reverse proxy has no route for this path and sends it to shell's `index.html` (deploy/nginx.conf:128-130). Another proxy may exist outside the repository, but snapshot's refutes the claim.

**25. projects/shell/src/app/app.ts:5-6.** Shell has only a `<router-outlet />` (projects/shell/src/app/app.ts:9-14). Promote uses its own `App` component as exposed route layout (projects/promote/src/app/remote.routes.ts:35-36), and diaspora's homepage has its own header (projects/diaspora/src/app/pages/home.ts:29-31). The same comment's next sentence, about session, is claim 26.

**26. projects/shell/src/app/app.ts:7.** The comment attributes a specific mechanism to shell: provisioning `ClientAuthStore` at bootstrap. Bootstrap only calls `bootstrapApplication(App, appConfig)` (projects/shell/src/bootstrap.ts:1-5), and configuration provides only global error handling and router (projects/shell/src/app/app.config.ts:9-10). The store is not provisioned.

## Summary

Claims: 26 (corroborated: 16, partial: 1, contradicted: 7, uncorroborated: 2). Themes: (structure: 8, composition: 9, build-deploy: 6, independence: 2, other: 1).
