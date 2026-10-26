---
schema: 1
id: 1363110249
full_name: Residencias-Faculdade/MicroFrontend
commit: 5726e54de24e6b6a1ff1fd004b82db909314640c
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

## Mined constructs

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| src-custom-element | src/main.ts:218 | . | none | No | Comment line (`// O outro projeto precisa servir url com CORS * e registrar customElements.define(tag)`) describing the expected external unit contract; **English translation of the comment:** "The other project needs to serve a URL with CORS * and register the custom element." It is not executable code. The `customElements.define` is in the external bundle, outside the snapshot; tag consumption is in the manual table (src/main.ts:167). |
| src-dynamic-script | src/main.ts:225 | . | script-loading | Yes | `document.createElement('script')` with `type = 'module'` and `src = url` (src/main.ts:226-227), appended to the `head` (src/main.ts:230), loads the bundle of external unit `member-manager` from `https://crud-member-manager.vercel.app/main.js` (public/microfrontends.json:4-6). Active chain: index.html:34 → `initAuth()` (src/main.ts:234) → `loadMicrofrontends()` (src/main.ts:81) → `selectMicrofrontend()` (src/main.ts:174) → `loadScript(entry.url, entry.tag)` (src/main.ts:210). |
| src-cross-unit-communication | public/silent-check-sso.html:3 | . | none | No | `parent.postMessage(location.href, location.origin)` is the keycloak-js silent check-sso page (comment at public/silent-check-sso.html:1-2), communication with the authentication library rather than between frontend units; moreover, `keycloak.init` uses `onLoad: 'login-required'` and `checkLoginIframe: false`, without `silentCheckSsoRedirectUri` (src/main.ts:74-78), and no other file references the page. |

## Constructs outside mining

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| manual | public/microfrontends.json:4 | . | host-relationship | Yes | `"tag": "member-manager"` with `"url": "https://crud-member-manager.vercel.app/main.js"` (public/microfrontends.json:6) declares the external application used by the shell and where it loads it from; the registry is read at runtime by `fetch('/microfrontends.json')` (src/main.ts:139) inside `loadMicrofrontends()`, called at src/main.ts:81. |
| manual | src/main.ts:167 | . | custom-element | Yes | ``mount.innerHTML = `<${entry.tag}></${entry.tag}>` `` inserts the external unit’s custom element tag (`<member-manager>`, public/microfrontends.json:4) in the wrapper appended to container `#microfrontends` (src/main.ts:168-169, index.html:31); the element definition comes from the script loaded at src/main.ts:225, and `customElements.get(tag)` (src/main.ts:221) prevents reloading. Not captured by the `src-*` patterns because the tag is assembled through a template string. |

## Summary

Constructs participating in composition: 3 (script-loading: 1, host-relationship: 1, custom-element: 1).

## Notes

- Target unit `member-manager` is external (https://crud-member-manager.vercel.app/main.js) and not in the snapshot; there is no `customElements.define` in the snapshot. The comment at docker-compose.yml:18 cites `customElements.define('posts-crud')` for service `posts-crud`, whose context is outside the repository (docker-compose.yml:19-22) and which does not appear in public/microfrontends.json.
- The `src-custom-element` pattern matched comment prose (src/main.ts:218), and `src-cross-unit-communication` matched Keycloak’s `postMessage` (public/silent-check-sso.html:3); both are false positives.
