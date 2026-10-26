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
  inspection:
    output: data/inspections/mfe-dependencies-001
    version: "1"
    config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 143 — Residencias-Faculdade/MicroFrontend

## Repository overview

The repository contains only the shell (`.`), a framework-free Vite + TypeScript application presenting itself
as "Biblioteca Shell para Micro Frontends via Web Components" (English translation: Shell Library for Micro Frontends via Web Components) and promising to plug in
"qualquer frontend que exponha um `Custom Element`" (English translation: any frontend exposing a Custom Element) without rebuilding the shell (README.md:1-3). The
plugged-in frontends reside in other repositories, belonging to other teams: the registry says "Projeto da
equipe 2 (Member Manager)" (English translation: Team Two project (Member Manager)) (public/microfrontends.json:3).

Composition uses a registry read at runtime. After mandatory Keycloak login
(`onLoad: 'login-required'`, src/main.ts:74-78), the shell fetches `/microfrontends.json`
(src/main.ts:139) and, for each entry, creates a sidebar button and a wrapper with the
custom element tag (``mount.innerHTML = `<${entry.tag}></${entry.tag}>` ``, src/main.ts:167),
appended to container `#microfrontends` (src/main.ts:169, index.html:31). When an entry is
selected, the shell injects `<script type="module" src=url>` into `head` if the tag is not yet
defined (src/main.ts:219-231); the external bundle must call `customElements.define(tag)`
(comment in src/main.ts:218). The registry's only entry is `member-manager`, served from
`https://crud-member-manager.vercel.app/main.js` (public/microfrontends.json:4-6), outside the
snapshot. Its purpose is an example of integration between teams.

What did not become a relationship: `docker-compose.yml` starts a `posts-crud` service, described as
"Micro frontend Angular (outro repo)" (English translation: Angular micro frontend (another repo)), which must register `customElements.define('posts-crud')`
(docker-compose.yml:17-18), with `context` outside the repository (docker-compose.yml:21), and the
src/main.ts:165 comment uses `<posts-crud></posts-crud>` as an example; however, `posts-crud` is not
in the registry (public/microfrontends.json:1-8) and no shell code loads it, so there is no
relationship. The `public/silent-check-sso.html` page calls `postMessage` to the Keycloak library,
not another frontend unit. There is no message exchange or token forwarding between shell and
custom element in the snapshot.

## Relationships

| # | Source | Target | Type | Direction | Mechanism | In snapshot | Active | Configuration | Code |
|---|---|---|---|---|---|---|---|---|---|
| 1 | . | member-manager | application → custom-element | source → target | web-components | No | Yes | public/microfrontends.json:4-6 (`tag: member-manager`, `url: https://crud-member-manager.vercel.app/main.js`) | src/main.ts:225; public/microfrontends.json:4; src/main.ts:167 |

## Observations

**1. . → member-manager.** The shell uses tag `<member-manager>`, assembled by template string from
the registry (src/main.ts:167; tag in public/microfrontends.json:4), and loads the script defining
it with `document.createElement('script')`, `type = 'module'` and `src = url`
(src/main.ts:225-227, appended in src/main.ts:230); under the type rule, the script belongs to the same
relationship as the tag. The target is the tag name as appearing in the registry: the bundle comes from
`https://crud-member-manager.vercel.app/main.js` (public/microfrontends.json:6), and no
snapshot unit defines that element, hence In snapshot `No`. Active `Yes`: all three source code review
lines are `Yes`, in a chain originating at the entry point (index.html:34 →
`initAuth()` in src/main.ts:234 → `loadMicrofrontends()` in src/main.ts:81 →
`selectMicrofrontend()` in src/main.ts:174 → `loadScript` in src/main.ts:210). The registry
appears in Configuration as the declaration connecting shell to unit, and in Code because the
source code review recorded it as a manual construct.

## Summary

Relationships: 1 (application → custom-element: 1). Active: 1. Target outside the snapshot: 1.
Units without a relationship: none.

