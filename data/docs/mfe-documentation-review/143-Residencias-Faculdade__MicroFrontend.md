---
schema: 1
id: 1363110249
full_name: Residencias-Faculdade/MicroFrontend
commit: 5726e54de24e6b6a1ff1fd004b82db909314640c
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

# 143 — Residencias-Faculdade/MicroFrontend

## Repository overview

Documentation consists solely of Portuguese root `README.md`, an integration guide in three parts: shell configuration (section A), external frontend contract (section B), and adding a new frontend (section C). Text cites code as `artefato:linha` (English explanation: artifact and line), but several references mismatch snapshot: Keycloak configured at src/main.ts:63-78 rather than "src/main.ts:52-78" (README.md:30); registry `fetch` at src/main.ts:139 rather than ":122" (README.md:68); check `customElements.get(tag)` at src/main.ts:203 and :221 rather than ":193" (README.md:102); src/main.ts:199 (README.md:104) declares `let loaderHost`. Appendix and passages reference `CONEXAO-MICROFRONTEND.md`, `Requisitos-Microfrontend.md` and `Arquitetura-Visual.md` (README.md:125, :172, :212-214; src/main.ts:7), absent from snapshot and `artifacts.csv`.

Overall README describes previous review findings: Vite shell reads registry at runtime, injects each external frontend's `main.js` and mounts custom element (3.4.4; 3.4.5 #1), built and served by Nginx in own image (3.4.6 #1). Difference concerns examples: README and `docker-compose.yml` use frontend `posts-crud` at `http://localhost:4200/main.js` (README.md:64, :186; docker-compose.yml:17-24), while snapshot registry only has `member-manager`, served from `https://crud-member-manager.vercel.app/main.js` (public/microfrontends.json:4-6). External frontend claims (isolation, cache, CORS, communication) lack other side in snapshot, containing no external units.

Excluded from table:
- Keycloak initialization (`login-required`, PKCE, token renewal) and realm configuration (README.md:30, :83), internal shell details; page grid (README.md:30; src/style.css:52-56), appearance;
- Environment variables and "Prod (Vercel/Railway)" scenario (README.md:32-56), configuration instruction with hypothetical domain (`https://sua-shell.vercel.app/*`, English explanation: your-shell placeholder); realm has `redirectUris` `https://micro-frontend-rho.vercel.app/*` (keycloak/realm.json:33), without snapshot hosting configuration;
- Code blocks reproducing commands, configuration and examples: installation and Docker commands (README.md:5-11, :74-79), example registry (README.md:62-66, :184-189), suggested frontend `nginx.conf` (README.md:109-121), authentication code (README.md:131-149), stack examples (README.md:155-172) and Compose service (README.md:191-197);
- Instructions: construct frontend Dockerfile like shell's (README.md:125), publish frontend and note URL (README.md:182), add Compose service (README.md:190), run `npm run dev` with frontends running (README.md:215). Checklist (README.md:200-206) repeats contract in paragraphs of claims 3, 9, 10, 11 and 13.

`doc-*` occurrences: README.md:1 claim 2; README.md:3 claim 3; README.md:30 claim 7, with README.md:68 and :102 in its paragraph; README.md:60 claim 8. Excluded: README.md:91, section title "B.1. Contrato Web Component (obrigatório)" (English translation: "Web Component contract, mandatory"); README.md:125 and :183, instructions; README.md:142, code-block line; README.md:172, Vanilla example referencing absent document; README.md:212-213, absent-document references; README.md:215, run instruction.

Comments and descriptive fields read in `Dockerfile`, `Dockerfile.keycloak` (no comments), `docker-compose.yml`, `nginx.conf`, `src/main.ts`, `public/microfrontends.json`, `public/silent-check-sso.html`, `keycloak/realm.json`, `index.html`, `vite.config.ts`, `src/style.css` and `package.json` (no `description`). Dockerfile:1, :11, docker-compose.yml:17 and public/microfrontends.json:3 became rows; docker-compose.yml:1, :3, :18, nginx.conf:1, src/main.ts:1-3, :7-8, :217-218 and keycloak/realm.json:22 appear in claim paragraphs. Excluded: shell asset SPA and CORS (nginx.conf:8, :13), Compose network and Keycloak waiting (docker-compose.yml:14, :59), authentication (src/main.ts:62, :77; public/silent-check-sso.html:1-2), page title "Shell Micro Frontends" (index.html:6) and example `<posts-crud></posts-crud>` (src/main.ts:165), cited in claim 15.

## Claims

| # | Document | Claim | Theme | Corroboration | Evidence |
|---|---|---|---|---|---|
| 1 | Dockerfile:1, 11 | "STAGE 1: BUILD - Compila Vite (TS -> JS) dentro do container" / "STAGE 2: RUNTIME - Serve dist/ com Nginx" (English translation: Build stage compiles Vite TypeScript to JavaScript inside container; runtime stage serves distribution through Nginx) | build-deploy | corroborated | 3.4.6 #1; Dockerfile:2-18 |
| 2 | README.md:1 | "Biblioteca Shell para Micro Frontends via Web Components" (English translation: Shell library for micro frontends through Web Components) | structure | corroborated | 3.4.3 (`.` `Yes`); 3.4.5 #1 (web-components); src/main.ts:167, 225-230 |
| 3 | README.md:3 | "importe a casca como orquestradora e plugue qualquer frontend que exponha um `Custom Element`. Sem rebuild da casca, sem acoplamento entre times." (English translation: Import shell as orchestrator and plug in any frontend exposing a Custom Element, without shell rebuild or team coupling) | composition | corroborated | 3.4.5 #1; src/main.ts:5, 16, 139-140, 167, 219-231; public/microfrontends.json:3 |
| 4 | README.md:8 | "docker compose up --build -d   # shell :3000 + keycloak :8080" (English translation: Compose starts shell and Keycloak) | build-deploy | corroborated | 3.4.6 #1; docker-compose.yml:4-15, 34-55 |
| 5 | README.md:8 | "(+ posts-crud :4200 se existir)" (English translation: Compose only starts `posts-crud` if project exists) | build-deploy | contradicted | docker-compose.yml:1, 19-30; 3.4.6 (Repository overview) |
| 6 | README.md:13 | "**Stack:** Vite 6 + TypeScript + `keycloak-js` 26.2 (PKCE S256) + Nginx + Docker Compose." (English translation: Stack uses specified Vite, TypeScript, Keycloak with PKCE, Nginx and Compose) | build-deploy | corroborated | package.json:8, 12, 21-22; Dockerfile:12-18; docker-compose.yml:4-15; 3.4.6 #1 |
| 7 | README.md:30 | "carrega `public/microfrontends.json:1` para injetar `<script type="module" src="url">` e montar `<tag></tag>` dentro de `#microfrontends`" (English translation: Load registry to inject module script and mount custom element in designated container) | composition | corroborated | 3.4.4 (src-dynamic-script src/main.ts:225; manual src/main.ts:167; manual public/microfrontends.json:4); 3.4.5 #1 |
| 8 | README.md:60 | "`public/microfrontends.json` é o **único ponto de configuração da casca**" (English translation: Registry is sole shell configuration point) | composition | corroborated | 3.4.4 (manual public/microfrontends.json:4); src/main.ts:139-140, 146-169 |
| 9 | README.md:103 | "`main.js` estável sem hash (`main.js` com `no-cache`, chunks `main-*.js` com `immutable`)" (English translation: Stable unhashed main script without caching, immutable hashed chunks) | build-deploy | partial | public/microfrontends.json:6 |
| 10 | README.md:104 | "`main.js` deve responder `200` + `Content-Type: application/javascript` + `Access-Control-Allow-Origin: *` — shell é ` :3000` buscando ` :4202` cross-origin" (English translation: Main script must return success and specified JavaScript and CORS headers for cross-origin shell loading) | build-deploy | partial | public/microfrontends.json:6; docker-compose.yml:9; src/main.ts:225-227 |
| 11 | README.md:105 | "Isolamento: `ViewEncapsulation.ShadowDom` (Angular) ou `this.attachShadow({mode:'open'})` (React/Vanilla)." (English translation: Isolation through Angular Shadow DOM encapsulation or an attached open shadow root) | composition | uncorroborated | — |
| 12 | README.md:105 | "Tokens via `src/tokens.css:1` `--color-primary` em vez de hardcode." (English translation: Use shell tokens rather than hardcoded values) | structure | partial | src/tokens.css:1-13; src/style.css:2, 96 |
| 13 | README.md:129 | "Copie de `src/main.ts:52` e `public/silent-check-sso.html:1`" (English translation: Copy shell authentication configuration; frontend uses same Keycloak realm and client) | composition | partial | src/main.ts:63-67; keycloak/realm.json:18-37 |
| 14 | README.md:174 | "frontend nunca `import` da casca — autocontido, próprio `environment.ts` e `Dockerfile`, comunica só via `CustomEvent`/`postMessage`." (English translation: Frontend never imports shell; self-contained with own environment and Dockerfile, communicating only through custom events or postMessage) | independence | partial | docker-compose.yml:20-22 |
| 15 | docker-compose.yml:17 | "POSTS-CRUD: Micro frontend Angular (outro repo) na porta 4200" (English translation: Posts CRUD is Angular micro frontend in another repository on specified port) | structure | partial | docker-compose.yml:19-24; 3.4.3 (Notes) |
| 16 | public/microfrontends.json:3 | "Projeto da equipe 2 (Member Manager)" (English translation: `member-manager` is another team project) | independence | partial | public/microfrontends.json:4-6; 3.4.5 #1 (In snapshot `No`) |

## Observations

**1. Dockerfile:1, 11.** Image has two stages: `node:22-alpine` installs dependencies and runs `npm run build` (Dockerfile:2-9), then `nginx:alpine` copies shell `nginx.conf` and `dist/` (Dockerfile:12-18). Same claim appears in README.md:72 ("`Dockerfile:1` multi-stage:
`node:22-alpine` […] → `nginx:alpine` (`COPY nginx.conf` + `dist/`)"), docker-compose.yml:3 ("SHELL: Vite build servido por Nginx na porta 3000", English translation: "Shell Vite build served by Nginx on port three thousand") and nginx.conf:1 ("NGINX DA SHELL - Serve SPA
Vite", English translation: "Shell Nginx serves Vite SPA"). Build and deployment review records `separate` build and deployment for shell.

**2. README.md:1.** Repository is shell: sole frontend application (3.4.3) mounting registered frontend as custom element (src/main.ts:167) and loading defining script (src/main.ts:225-230). Opening comment at src/main.ts:1-3 repeats description ("Orquestradora de Micro Frontends via Web Components", English translation: "Micro frontend orchestrator through Web Components"). "Biblioteca" and "Use como biblioteca" (English translation: "Library" and "Use as library") (README.md:3) do not correspond to package: `atividadengx-shell` is `private` (package.json:2-4), and Vite build starts at `index.html` (3.4.3); README uses word for shell reused as orchestrator without own packaging. Difference does not change judgment.

**3. README.md:3.** Shell mounts any registered tag and loads URL without knowing frontend framework (src/main.ts:146-169, 219-231); contract only requires custom element defined in `main.js` (README.md:93-100; src/main.ts:8, 218; docker-compose.yml:18), repeated by checklist (README.md:202-203: `customElements.get` undefined before and class afterward, unique hyphenated tag). "Sem rebuild" (English translation: "Without rebuild"): registry read through runtime `fetch` (src/main.ts:139-140), repeated in README.md:198 ("sem rebuild
da casca", English translation: "without shell rebuild"). However, snapshot has no volume mounting registry in `shell` container (docker-compose.yml:4-15): here it enters image with rest of `dist/` (Dockerfile:8-9, 16). "Sem acoplamento" (English translation: "Without coupling"): shell only imports `keycloak-js` and own loader (src/main.ts:5, 16), repeated by README.md:89 ("A casca não importa código dele", English translation: "Shell does not import its code"); registry identifies frontend as "Projeto da equipe 2" (English translation: "Team two's project") (public/microfrontends.json:3). Framework list in README.md:89 ("Angular 21, React, Vue, Vanilla") and examples in README.md:155-172 have no corresponding snapshot frontend.

**4. README.md:8.** Compose builds shell in service `shell` (docker-compose.yml:4-15) and starts Keycloak from published image (docker-compose.yml:34-55), on default ports 3000 and 8080 (docker-compose.yml:9, :43). README.md:72 repeats ("sobe `shell:3000` + `keycloak:8080`
(`app-network`)", English translation: "starts shell and Keycloak on application network"). Keycloak uses `start-dev` (docker-compose.yml:36), local arrangement.

**5. README.md:8.** README says `posts-crud` starts "se existir" (English translation: "if present"), detailed by README.md:72: "se
path `../Caio/...` não existir, sobe só casca+keycloak" (English translation: "if path does not exist, start only shell and Keycloak"). Compose declares `posts-crud` as regular service, with `build.context: ../Caio/aprendendo/primeiro-projeto`, without profile or condition (docker-compose.yml:19-30), and comment at docker-compose.yml:1 lists all three services ("Sobe shell + posts-crud + keycloak", English translation: "Start shell, posts-crud and Keycloak"). Nothing makes service optional; absent path, `docker compose up --build` in README.md:8 still tries building it. "shell + keycloak" part is claim 4.

**6. README.md:13.** Vite (`^6.2.0`), TypeScript and `keycloak-js` (`^26.2.0`) appear at package.json:12, 21-22, with build `tsc && vite build` (package.json:8); PKCE S256 at src/main.ts:76; Nginx and Compose are claims 1 and 4. List omits React, present in dependencies (package.json:13-14) and Vite plugin (vite.config.ts:2, 6).

**7. README.md:30.** Shell fetches registry (src/main.ts:139), creates button and wrapper with tag per entry (src/main.ts:146-169), injects `<script type="module">` in `head` when tag not yet defined (src/main.ts:219-231). README.md:68 ("faz `fetch` e para cada entrada cria
`button.sidebar-btn` + `div#wrapper-tag` com `header` e mount `<tag></tag>`", English translation: "fetches and creates sidebar button, wrapper, header and mount per entry") and README.md:102 ("verifica `customElements.get(tag)` antes de injetar", English translation: "checks custom element registration before injection") repeat claim, as does src/main.ts:217 comment; README references are outdated (see Repository overview). "Array vazio" (English translation: "Empty array") at README.md:68 corresponds to src/main.ts:142, 173.

**8. README.md:60.** Frontend list comes solely from `/microfrontends.json` (src/main.ts:139-140); shell code has no fixed frontend URLs or tags. README.md:180 repeats ("**Única edição na
casca** para plugar um frontend novo", English translation: "Only shell edit for plugging in new frontend"). Step 3 in README.md:190 instructs editing `docker-compose.yml` too "se orquestra local" (English translation: "if orchestrating locally"), frontend local setup rather than shell configuration. README example registry (README.md:62-66) differs from snapshot registry (public/microfrontends.json:1-8).

**9. README.md:103.** Registry points to unhashed `main.js` (public/microfrontends.json:6), confirming stable filename. Cache policy for `main.js` and chunks belongs to frontend server outside snapshot. README.md:125 (copying `main-*.js` to `main.js` in Angular) and README.md:205 repeat claim. Shell `nginx.conf`, which README.md:109 instructs copying, gives `immutable` to every `.js` without `main.js` rule (nginx.conf:14-19); applies to shell files without contradicting frontend requirement.

**10. README.md:104.** Shell, served on port 3000 (docker-compose.yml:9), loads script from `https://crud-member-manager.vercel.app/main.js` (public/microfrontends.json:6; src/main.ts:225-227), another origin, confirming cross-origin loading. Required frontend headers lack snapshot artifacts. Example port 4202 absent from registry. CORS requirement repeats at src/main.ts:8, :218, docker-compose.yml:18 and README.md:182, :201.

**11. README.md:105.** Shell inserts tag inside regular `div`, without own Shadow DOM (src/main.ts:166-168); isolation, if any, comes from absent external bundle. Comment at src/main.ts:3 ("injeta cada um como Custom Element isolado", English translation: "injects each as isolated Custom Element") and README.md:204 ("Shadow
DOM isolado", English translation: "isolated Shadow DOM") repeat claim.

**12. README.md:105.** Tokens exist in src/tokens.css:1-13 and shell itself uses them (src/style.css:2, 96). No other snapshot unit uses them, and external frontend absent; tokens available, but frontend use lacks artifact.

**13. README.md:129.** Section "Auth do frontend (se usar API protegida)" (English translation: "Frontend authentication if using protected API") (README.md:127) instructs frontend to use same shell Keycloak configuration: same realm and client (README.md:131-142; src/main.ts:63-67). Realm has sole client `frontend`, described as "Frontend shell e micro
frontends" (English translation: "Frontend shell and micro frontends") (keycloak/realm.json:20-22), with `redirectUris` for shell port and 4200, 4201 and 4202 (keycloak/realm.json:30-37), also stated in README.md:83 and :151. Shell use holds; frontend use lacks artifact, and composition review found no token passing between shell and custom element (3.4.5, Repository overview). Checklist repeats claim (README.md:206: "`silent-check-sso.html` + `S256` + `updateToken(30)`"). Page `silent-check-sso.html`, mandatory according to README.md:146, is unused by shell itself (3.4.4, row `src-cross-unit-communication`).

**14. README.md:174.** Compose builds `posts-crud` with `Dockerfile` from its context outside repository (docker-compose.yml:20-22), confirming own Dockerfile. Rest (no shell import, own `environment.ts`, communication solely through `CustomEvent`/`postMessage`) concerns absent frontend code. Shell has no `CustomEvent` or `message` listener: sole snapshot `postMessage` is silent SSO page (3.4.4).

**15. docker-compose.yml:17.** Service `posts-crud` built from `../Caio/aprendendo/primeiro-projeto`, outside repository (docker-compose.yml:19-24), confirming "outro repo" (English translation: "another repository") and port 4200; Angular micro frontend identity lacks artifact. `posts-crud` absent from registry (public/microfrontends.json:1-8), and composition review records no relationship (3.4.5, Repository overview); appears only in examples (README.md:64, :186; src/main.ts:165).

**16. public/microfrontends.json:3.** `member-manager` served from own domain (public/microfrontends.json:6), outside snapshot (3.4.5 #1), confirming another project. Ownership by "equipe 2" (English translation: "team two") lacks artifact.

## Summary

Claims: 16 (corroborated: 7, partial: 7, contradicted: 1, uncorroborated: 1). Themes: (structure: 3, composition: 5, build-deploy: 6, independence: 2).
