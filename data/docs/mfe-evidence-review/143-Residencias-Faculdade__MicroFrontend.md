---
schema: 1
id: 1363110249
full_name: Residencias-Faculdade/MicroFrontend
commit: 5726e54de24e6b6a1ff1fd004b82db909314640c
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

# 143 — Residencias-Faculdade/MicroFrontend

## Repository overview

Snapshot only contains shell of a system distributed across repositories: a framework-free Vite + TypeScript application at root (#7). It composes through native Web Components without MFE library: no dependency to observe in 3.4.2.

Architecture-supporting chain runs through registry and shell code:
- **Configuration:** registry `public/microfrontends.json` declares external application `member-manager` and its `main.js` URL on Vercel domain (#1, and same row in 3.4.4, #5).
- **Code:** shell reads registry at runtime, mounts each entry tag (#6) and injects `<script type="module">` with URL when tag is not yet defined (#3).
- **Relationship:** sole relationship results, shell → `member-manager`, active with target outside snapshot (#8).

Structure alone shows one unit (#7), with own build and deployment in Nginx image (#9). Decomposition only appears in registry and code.

Signals misleading when read alone:
- **Patterns matching something else:** `src-custom-element` matched contract-describing comment (#2), and `src-cross-unit-communication` matched `postMessage` in Keycloak silent SSO page (#4), used by no file. History shows page was never connected (#26).
- **`posts-crud`:** README, compose and code comment use a `posts-crud` frontend at `localhost:4200`, from another repository (#14, #24), absent from registry and not a relationship. History shows examples are from first commit and registry changed to `member-manager` later (#29). Promise that compose only starts it "se existir" (English translation: "if it exists") is refuted by compose (#14, #27).

Documentation is integration guide. It confirms shell and mechanism (#11, #12, #16, #17) and packaging (#10, #13, #15). Contract requested from plugged-in frontends (cache, CORS, tokens, authentication, autonomy, isolation) is only partially confirmed or unconfirmed (#18 through #23, #25), because no external frontend is in snapshot; history shows none ever was (#28). Nothing remains ambiguous in snapshot. `member-manager` itself is unobserved.

## Observations

### 1. public/microfrontends.json:1-8

**Observation:** Registry is an array with one entry: `"_comment": "Projeto da equipe 2 (Member Manager) "`, `"tag": "member-manager"`, `"title": "Members CRUD"` and `"url": "https://crud-member-manager.vercel.app/main.js"`. Shell reads it through `fetch('/microfrontends.json')` (src/main.ts:139).

**English translation of comment value:** Team two project (Member Manager).

**Interpretation:** Host configuration declares another-origin unit as application to load through tag name and bundle URL.

### 2. src/main.ts:218

**Observation:** Comment line: `// O outro projeto precisa servir url com CORS * e registrar customElements.define(tag)`.

**English translation:** Other project must serve URL with wildcard CORS and register customElements.define(tag).

**Interpretation:** Comment describes expected external-unit contract; not code, not participating in composition.

### 3. src/main.ts:221, 225-230

**Observation:** In `loadScript(url, tag)`, if `customElements.get(tag)` does not yet exist, shell creates `document.createElement('script')` with `type = 'module'` and `src = url`, appending to `head`. URL and tag arrive as parameters (`loadScript(entry.url, entry.tag)`, src/main.ts:210).

**Interpretation:** Shell loads custom-element-defining bundle at runtime for whichever unit it receives.

### 4. public/silent-check-sso.html:3

**Observation:** `parent.postMessage(location.href, location.origin)`, with comment saying this is keycloak-js silent check-sso iframe (public/silent-check-sso.html:1-2). `keycloak.init` does not use `silentCheckSsoRedirectUri` (src/main.ts:74-78), and no file references page.

**Interpretation:** Communication with authentication library rather than between frontend units.

### 5. public/microfrontends.json:4, 6; src/main.ts:139

**Observation:** `"tag": "member-manager"` and `"url": "https://crud-member-manager.vercel.app/main.js"`, read at runtime through `fetch('/microfrontends.json')` inside `loadMicrofrontends()`.

**Interpretation:** Row names external application used by shell and where it loads it from.

### 6. src/main.ts:166-169; index.html:31

**Observation:** ``mount.innerHTML = `<${entry.tag}></${entry.tag}>` `` in a `div`, appended to wrapper and container `#microfrontends`. Tag comes from registry entry.

**Interpretation:** Shell mounts custom element of unit specified by registry; element definition comes from script loaded in #3.

### 7. .; index.html:34; vite.config.ts:5-14; package.json:8

**Observation:** Root Vite project, with entry `<script type="module" src="/src/main.ts">` and `tsc && vite build` to `dist`.

**Interpretation:** Shell is a frontend unit with own entry and build.

### 8. src/main.ts:167; src/main.ts:225-230; public/microfrontends.json:4-6

**Observation:** Shell (`.`) uses tag `<member-manager>` and loads defining script from `https://crud-member-manager.vercel.app/main.js`. No snapshot unit defines element. Chain starts at entry: index.html:34 → `initAuth()` (src/main.ts:234) → `loadMicrofrontends()` (src/main.ts:81) → `selectMicrofrontend()` (src/main.ts:174) → `loadScript` (src/main.ts:210).

**Interpretation:** Shell composes an external unit deployed on another origin at runtime through Web Components.

### 9. package.json:8; vite.config.ts:8; Dockerfile:2-18; nginx.conf:9-25; docker-compose.yml:4-15

**Observation:** Vite build generates shell `dist`. Two-stage image runs `npm run build`, copying `dist/` and `nginx.conf` to Nginx; compose service `shell` builds it with `context: .` and publishes port 80 at `${SHELL_PORT:-3000}`.

**Interpretation:** Shell has own build and deployment; `member-manager` code does not enter artifact.

### 10. Dockerfile:1, 11

**Observation:** "STAGE 1: BUILD - Compila Vite (TS -> JS) dentro do container" / "STAGE 2: RUNTIME - Serve dist/ com Nginx".

**English translation:** STAGE ONE: BUILD — Compiles Vite (TypeScript to JavaScript) inside container / STAGE TWO: RUNTIME — Serves build output with Nginx.

**Interpretation:** Claim describes shell build and deployment, confirmed by Dockerfile.

### 11. README.md:1

**Observation:** "Biblioteca Shell para Micro Frontends via Web Components".

**English translation:** Shell Library for Micro Frontends through Web Components.

**Interpretation:** Claim presents repository as shell composing frontends through Web Components, confirmed by structure and relationship. "Biblioteca" (English translation: "Library") does not correspond to a package: `atividadengx-shell` is `private` (package.json:2-4).

### 12. README.md:3

**Observation:** "importe a casca como orquestradora e plugue qualquer frontend que exponha um `Custom Element`. Sem rebuild da casca, sem acoplamento entre times."

**English translation:** Import shell as orchestrator and plug in any frontend exposing a Custom Element. No shell rebuild, no coupling between teams.

**Interpretation:** Claim describes composition through runtime-read registry, without shell–frontend imports; shell only imports `keycloak-js` and own loader (src/main.ts:5, 16).

### 13. README.md:8

**Observation:** "docker compose up --build -d   # shell :3000 + keycloak :8080".

**English translation:** Start Docker Compose with build in detached mode: shell on port three thousand and Keycloak on port eight thousand and eighty.

**Interpretation:** Claim describes local shell setup with Keycloak, confirmed by compose.

### 14. README.md:8

**Observation:** "(+ posts-crud :4200 se existir)".

**English translation:** Plus posts-crud on port four thousand two hundred if it exists.

**Interpretation:** Claim says frontend `posts-crud`, from another repository, is optional in local setup; compose declares it as regular service without profile or condition (docker-compose.yml:19-30).

### 15. README.md:13

**Observation:** "**Stack:** Vite 6 + TypeScript + `keycloak-js` 26.2 (PKCE S256) + Nginx + Docker Compose."

**English translation:** Stack: Vite six, TypeScript, Keycloak JavaScript twenty-six point two with PKCE S-two-five-six, Nginx and Docker Compose.

**Interpretation:** Claim names shell technologies, confirmed by manifest and packaging. Omits declared React (package.json:13-14).

### 16. README.md:30

**Observation:** "carrega `public/microfrontends.json:1` para injetar `<script type="module" src="url">` e montar `<tag></tag>` dentro de `#microfrontends`".

**English translation:** Loads public microfrontend registry to inject a module script from URL and mount the supplied tag inside the microfrontends container.

**Interpretation:** Claim describes composition mechanism implemented by code; README line references are outdated.

### 17. README.md:60

**Observation:** "`public/microfrontends.json` é o **único ponto de configuração da casca**".

**English translation:** Public microfrontend registry is shell's only configuration point.

**Interpretation:** Claim positions plugged-in unit declarations in registry; code has no fixed frontend URL or tag.

### 18. README.md:103

**Observation:** "`main.js` estável sem hash (`main.js` com `no-cache`, chunks `main-*.js` com `immutable`)".

**English translation:** Stable unhashed main script, served without cache; hashed chunks served as immutable.

**Interpretation:** Claim requests stable bundle name from plugged-in frontend; registry points to unhashed `main.js`, and cache policy belongs to external server outside snapshot.

### 19. README.md:104

**Observation:** "`main.js` deve responder `200` + `Content-Type: application/javascript` + `Access-Control-Allow-Origin: *` — shell é ` :3000` buscando ` :4202` cross-origin".

**English translation:** Main script must respond with successful status, JavaScript content type and wildcard CORS; shell on port three thousand fetches cross-origin from port four thousand two hundred and two.

**Interpretation:** Claim describes cross-origin shell–frontend loading, confirmed by registry and loader; frontend headers have no artifact.

### 20. README.md:105

**Observation:** "Isolamento: `ViewEncapsulation.ShadowDom` (Angular) ou `this.attachShadow({mode:'open'})` (React/Vanilla)."

**English translation:** Isolation: Angular ShadowDom encapsulation or an open shadow root attached by React/Vanilla.

**Interpretation:** Claim attributes isolation to plugged-in frontend Shadow DOM. Shell inserts tag in ordinary `div` (src/main.ts:166-168), and external bundle is absent from snapshot.

### 21. README.md:105

**Observation:** "Tokens via `src/tokens.css:1` `--color-primary` em vez de hardcode."

**English translation:** Use primary-color token from token stylesheet rather than hardcoding.

**Interpretation:** Claim says frontends use shell tokens; tokens exist and shell uses them, but no snapshot frontend uses them.

### 22. README.md:129

**Observation:** "Copie de `src/main.ts:52` e `public/silent-check-sso.html:1`" (frontend authenticates in same Keycloak realm and client as shell).

**English translation:** Copy shell authentication and silent SSO page; frontend authenticates in same Keycloak realm and client as shell.

**Interpretation:** Claim describes authentication shared between shell and frontends; shell configuration and realm client exist (src/main.ts:63-67; keycloak/realm.json:18-37), and frontend usage has no artifact.

### 23. README.md:174

**Observation:** "frontend nunca `import` da casca — autocontido, próprio `environment.ts` e `Dockerfile`, comunica só via `CustomEvent`/`postMessage`."

**English translation:** Frontend never imports from shell: self-contained, with own environment file and Dockerfile, communicating only through custom events or postMessage.

**Interpretation:** Claim describes frontend autonomy. Only own `Dockerfile` of `posts-crud` has artifact (docker-compose.yml:20-22); shell has no `CustomEvent` or `message` listener.

### 24. docker-compose.yml:17

**Observation:** "POSTS-CRUD: Micro frontend Angular (outro repo) na porta 4200".

**English translation:** POSTS-CRUD: Angular micro frontend from another repository on port four thousand two hundred.

**Interpretation:** Comment describes frontend from another repository in local setup; service is built outside repository (docker-compose.yml:19-24), absent from registry and composition.

### 25. public/microfrontends.json:3

**Observation:** `"_comment": "Projeto da equipe 2 (Member Manager) "`.

**English translation:** Team two project (Member Manager).

**Interpretation:** Descriptive field assigns external unit to another team; own domain confirms another project, and team has no artifact.

### 26. c296e85 2026-09-09 (public/silent-check-sso.html; src/main.ts; README.md)

**Observation:** Silent SSO page, `src/main.ts` and README are created in `c296e85` and do not change through snapshot. Sole version of `src/main.ts` initializes Keycloak without `silentCheckSsoRedirectUri`.

**Interpretation:** Page was never used by a versioned shell version: added without connection rather than disconnected later.

### 27. c296e85 2026-09-09 (README.md; docker-compose.yml)

**Observation:** README and compose only have version `c296e85`: promise "se existir" (English translation: "if it exists") and unconditional service `posts-crud` enter together in first commit.

**Interpretation:** Discrepancy is not from different stages; document and compose originated differing.

### 28. c296e85 2026-09-09; 7de7c8c 2026-09-30 (Dockerfile.keycloak); 5726e54 2026-09-30 (public/microfrontends.json)

**Observation:** No commit removes a file, and no historical tree contains code, manifest or `Dockerfile` of `member-manager`, `posts-crud` or another frontend.

**Interpretation:** Plugged-in frontends were never in repository; shell was designed from outset to load other-origin bundles.

### 29. c296e85 2026-09-09 (README.md; docker-compose.yml; src/main.ts); d48027b 2026-09-30 (public/microfrontends.json); 5726e54 2026-09-30 (public/microfrontends.json)

**Observation:** Examples with `posts-crud` only have version `c296e85`. Registry changes twice afterward: `d48027b` ("feat: registra member-manager da equipe 2 na shell") and `5726e54` ("fix: Exclusão do localhost project"). Earlier registry version contents unavailable in clone.

**English translations of commit messages:** Feature: register team two member-manager in shell. Fix: remove localhost project.

**Interpretation:** Examples and registry are from different stages: registry changed to `member-manager` without changes to README, compose or comment.

## Classification

| # | Origin | Dimension | Type | Approach | Evidence | Strength | Relationships |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.4 (public/microfrontends.json:4, File:line; src/main.ts:225 and src/main.ts:167, Observation); 3.4.5 #1 (Configuration and Code); 3.4.7 #3, #7, #8, #9, #10, #16 (Document and Evidence) | 2 configuration | configuration | web-components | architectural | strong | configures #3; configures #6; configures #8 |
| 2 | 3.4.4 (src/main.ts:218) | 3 code | comment | — | context | weak | — |
| 3 | 3.4.4 (src/main.ts:225) | 3 code | source code | web-components | technological | moderate | implements #8 |
| 4 | 3.4.4 (public/silent-check-sso.html:3) | 3 code | source code | — | context | weak | — |
| 5 | 3.4.4 (public/microfrontends.json:4) | 3 code | configuration | web-components | architectural | strong | implements #8 |
| 6 | 3.4.4 (src/main.ts:167) | 3 code | source code | web-components | technological | moderate | implements #8 |
| 7 | 3.4.3 (.) | 4 structure | directory | — | architectural | moderate | — |
| 8 | 3.4.5 #1 | 5 composition | source code | web-components | architectural | strong | links #7 |
| 9 | 3.4.6 #1 | 6 build-deploy | deploy | — | architectural | moderate | publishes #7 |
| 10 | 3.4.7 #1 | 7 documentation | comment | — | architectural | weak | corroborates #9 |
| 11 | 3.4.7 #2 | 7 documentation | documentation | web-components | architectural | weak | corroborates #7; corroborates #8 |
| 12 | 3.4.7 #3 | 7 documentation | documentation | web-components | architectural | weak | corroborates #1; corroborates #3; corroborates #6; corroborates #8; corroborates src/main.ts:5, 16 |
| 13 | 3.4.7 #4 | 7 documentation | documentation | — | architectural | weak | corroborates #9; corroborates docker-compose.yml:34-55 |
| 14 | 3.4.7 #5 | 7 documentation | documentation | — | context | weak | contradicts docker-compose.yml:19-30 |
| 15 | 3.4.7 #6 | 7 documentation | documentation | — | technological | weak | corroborates #9; corroborates package.json:12, 21-22 |
| 16 | 3.4.7 #7 | 7 documentation | documentation | web-components | architectural | weak | corroborates #1; corroborates #3; corroborates #5; corroborates #6; corroborates #8 |
| 17 | 3.4.7 #8 | 7 documentation | documentation | — | architectural | weak | corroborates #1; corroborates #5; corroborates src/main.ts:139-140 |
| 18 | 3.4.7 #9 | 7 documentation | documentation | — | architectural | weak | partially corroborates #1 |
| 19 | 3.4.7 #10 | 7 documentation | documentation | — | architectural | weak | partially corroborates #1; partially corroborates #3 |
| 20 | 3.4.7 #11 | 7 documentation | documentation | web-components | technological | weak | — |
| 21 | 3.4.7 #12 | 7 documentation | documentation | — | architectural | weak | partially corroborates src/tokens.css:1-13 |
| 22 | 3.4.7 #13 | 7 documentation | documentation | — | architectural | weak | partially corroborates src/main.ts:63-67; partially corroborates keycloak/realm.json:18-37 |
| 23 | 3.4.7 #14 | 7 documentation | documentation | — | architectural | weak | partially corroborates docker-compose.yml:20-22 |
| 24 | 3.4.7 #15 | 7 documentation | comment | — | context | weak | partially corroborates docker-compose.yml:19-24 |
| 25 | 3.4.7 #16 | 7 documentation | comment | — | architectural | weak | partially corroborates #1; partially corroborates #8 |
| 26 | 3.4.8 #1 | 8 history | history | — | context | weak | explains #4; explains #22 |
| 27 | 3.4.8 #2 | 8 history | history | — | context | weak | explains #14 |
| 28 | 3.4.8 #3 | 8 history | history | — | architectural | weak | explains #18; explains #19; explains #21; explains #22; explains #23; explains #25 |
| 29 | 3.4.8 #4 | 8 history | history | — | architectural | weak | explains #24; explains #1 |

## Summary

Observations: 29. Dimensions (technology: 0, configuration: 1, code: 5, structure: 1, composition: 1, build-deploy: 1, documentation: 16, history: 4). Strength (strong: 3, moderate: 4, weak: 22, ambiguous: 0). Evidence (technological: 4, architectural: 19, context: 6).

