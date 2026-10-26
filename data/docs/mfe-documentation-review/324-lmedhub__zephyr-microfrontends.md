---
schema: 1
id: 990877766
full_name: lmedhub/zephyr-microfrontends
commit: c6e6a9f7d59a3b422002af26c57617d6c486a532
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

# 324 — lmedhub/zephyr-microfrontends

## Repository overview

Two documents exist, both English and project-specific. `frontend/README.md:1-23` presents a micro-frontend demonstration with Rspack, Module Federation, React and Zephyr Cloud, listing host, header and footer and ending with installation/execution commands. Description matches composition recorded in reviews 3.4.4 and 3.4.5 but is not exhaustive: host also imports Vue remote `url_shortener` and mounts its component through `createApp` (`frontend/apps/host/src/utils/VueShortener.tsx:10-16`; `frontend/apps/host/src/App.tsx:17`). README list (`frontend/README.md:7-9`) does not claim exhaustiveness; shortener omission limits text without contradicting described three units. Zephyr use appears in all four configurations (`frontend/apps/host/rspack.config.ts:5-7`; `frontend/apps/remote-header/rspack.config.ts:5-7`; `frontend/apps/remote-footer/rspack.config.ts:5-7`; `frontend/apps/url-shortener/rspack.config.ts:3-5`), without publication address in these artifacts, as review 3.4.6 records.

`backend/README.md:1-67` describes Go service, installation, endpoints, tests and Docker; it makes no inter-frontend-unit relationship claim, producing no table row. Its `POST /shorten` endpoint (`backend/README.md:38`) is called by Vue component (`frontend/apps/url-shortener/src/Shortener.vue:85-92`), a relationship frontend README does not explain. Command blocks at `backend/README.md:17-62` and `frontend/README.md:15-23` are execution instructions without additional architectural claims. Neither inventoried document is a tool template.

`doc-mfe-term` and `doc-integration-technology` occurrences at `frontend/README.md:1` are title, revisited by line 3 claim (#1). Both patterns at line 3 are in #1; `doc-mfe-term` and `doc-host-remote` at line 7 in #2; `doc-independence` at lines 8 and 9 in #3 and #4. Files read: four `rspack.config.ts`, five `package.json` in `frontend/` and its apps, composition code `frontend/apps/host/src/App.tsx:1-28` and `frontend/apps/host/src/utils/VueShortener.tsx:1-29`, remote entries/components, plus `backend/Dockerfile:1-18`, `backend/docker-compose.yml:1-32` and `backend/Makefile:1-33`, cited by previous reviews. Manifests contain no `description`, and artifact comments add no architectural claims: TypeScript suppressions in wrapper (`frontend/apps/host/src/utils/VueShortener.tsx:9-11`), internal notification suggestion (`frontend/apps/url-shortener/src/Shortener.vue:113`) and Makefile title (`backend/Makefile:1`).

## Claims

| # | Document | Claim | Theme | Corroboration | Evidence |
|---|---|---|---|---|---|
| 1 | frontend/README.md:3 | "This project demonstrates a microfrontends architecture using Rspack, Module Federation, React and Zephyr Cloud." | composition | corroborated | 3.4.2, notes; 3.4.5 #1-3; 3.4.6 #1-4; frontend/apps/host/rspack.config.ts:1-7,82-94; frontend/apps/host/src/App.tsx:1-7,12-22 |
| 2 | frontend/README.md:7 | "Host Application [...] Main application that consumes remote microfrontends" | structure | corroborated | 3.4.5 #1-3; frontend/apps/host/rspack.config.ts:83-88; frontend/apps/host/src/App.tsx:6-22; frontend/apps/host/src/utils/VueShortener.tsx:10-16 |
| 3 | frontend/README.md:8 | "Remote Header [...] Independent header component" | independence | corroborated | 3.4.3, unit frontend/apps/remote-header; frontend/apps/remote-header/src/index.tsx:1-14; frontend/apps/remote-header/rspack.config.ts:9-19,73-79; frontend/apps/remote-header/package.json:4-7 |
| 4 | frontend/README.md:9 | "Remote Footer [...] Independent footer component" | independence | corroborated | 3.4.3, unit frontend/apps/remote-footer; frontend/apps/remote-footer/src/index.tsx:1-14; frontend/apps/remote-footer/rspack.config.ts:9-19,73-79; frontend/apps/remote-footer/package.json:4-7 |

## Observations

**1. frontend/README.md:3.** Sentence presents demonstration architecture/technologies. Title (`frontend/README.md:1`) repeats Rspack and Module Federation. Host uses Rspack’s built-in federation plugin (`frontend/apps/host/rspack.config.ts:1,82-94`), imports React and loads two remote React components (`frontend/apps/host/src/App.tsx:1-7,12-22`). `withZephyr()` wraps four unit configurations (`frontend/apps/host/rspack.config.ts:5-7`; `frontend/apps/remote-header/rspack.config.ts:5-7`; `frontend/apps/remote-footer/rspack.config.ts:5-7`; `frontend/apps/url-shortener/rspack.config.ts:3-5`). This corroborates claimed service use without demonstrating completed deployment. Per 3.4.2, Module Federation implementation is Rspack’s; sentence does not attribute mechanism to package `@module-federation/enhanced`, declared only at root (`frontend/package.json:59`). Additional Vue remote does not contradict described React use.

**2. frontend/README.md:7.** Main consumer application role is verifiable: host declares three remotes (`frontend/apps/host/rspack.config.ts:83-88`), renders header/footer in `Suspense` (`frontend/apps/host/src/App.tsx:6-7,12-22`) and mounts Vue shortener through wrapper (`frontend/apps/host/src/utils/VueShortener.tsx:10-16`). All three relationships are active in 3.4.5 #1-3. README port is local configuration (`frontend/apps/host/rspack.config.ts:17-18`), without implying published address.

**3. frontend/README.md:8.** Header is exposed as remote module (`frontend/apps/remote-header/rspack.config.ts:73-79`) and has entry mounting `Header` on own page (`frontend/apps/remote-header/src/index.tsx:1-14`), own `devServer` (`frontend/apps/remote-header/rspack.config.ts:13-19`) and `start` script (`frontend/apps/remote-header/package.json:7`). These artifacts support execution/development independence. Sentence claims neither organizational evolution nor independent versioning.

**4. frontend/README.md:9.** Footer follows same arrangement, exposing `./Footer` (`frontend/apps/remote-footer/rspack.config.ts:73-79`), with entry rendering component on own page (`frontend/apps/remote-footer/src/index.tsx:1-14`), local server (`frontend/apps/remote-footer/rspack.config.ts:13-19`) and `start` script (`frontend/apps/remote-footer/package.json:7`). Described independence is corroborated in execution/development dimension; no independent versioning claim exists.

## Summary

Claims: 4 (corroborated: 4, partial: 0, contradicted: 0, uncorroborated: 0). Themes: (structure: 1, composition: 1, independence: 2).
