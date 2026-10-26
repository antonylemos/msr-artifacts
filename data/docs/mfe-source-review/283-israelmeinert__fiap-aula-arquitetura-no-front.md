---
schema: 1
id: 1408068032
full_name: israelmeinert/fiap-aula-arquitetura-no-front
commit: e1c6fb92488afd39e2c1d704ee1243ed52d862b6
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 283 — israelmeinert/fiap-aula-arquitetura-no-front

## Mined constructs

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| src-mount-export | exemplos/10-micro-frontends/apps/catalogo-react/src/mount.tsx:3 | exemplos/10-micro-frontends/apps/catalogo-react | runtime-composition | Yes | Exports `mount(host)`, which creates the React root and renders `App` on the host element, returning cleanup `root.unmount()` (exemplos/10-micro-frontends/apps/catalogo-react/src/mount.tsx:3-5). This is the entry of bundle `dist/microfrontend.js` (scripts/build-remoto.mjs:21-22, called by exemplos/10-micro-frontends/apps/catalogo-react/package.json:7), served on port 4301 (exemplos/10-micro-frontends/apps/catalogo-react/package.json:8) and mounted by shell at exemplos/10-micro-frontends/apps/shell/src/main.ts:26. |
| src-mount-export | exemplos/10-micro-frontends/apps/checkout-angular/src/mount.ts:4 | exemplos/10-micro-frontends/apps/checkout-angular | runtime-composition | Yes | Exports `mount(host)`, which creates the Angular application, creates `CheckoutApp` with `hostElement: host` and returns cleanup (exemplos/10-micro-frontends/apps/checkout-angular/src/mount.ts:4-12). Compiled by ngc (exemplos/10-micro-frontends/apps/checkout-angular/tsconfig.json:13-15) and bundled as `dist/microfrontend.js` (scripts/build-remoto.mjs:21-22, called by exemplos/10-micro-frontends/apps/checkout-angular/package.json:7), served on port 4302 and mounted by shell at exemplos/10-micro-frontends/apps/shell/src/main.ts:26. |
| src-custom-element | aula-arquitetura-front-end.html:20284 | — | none | No | Marp runtime script embedded in the slides (`class s extends HTMLElement`, `attachShadow`, `customElements.define("marp-auto-scaling",s)` on the same line), for slide scaling; not a frontend unit: root `.` is No in the structural review and the HTML is the class presentation (README.md:5). |
| src-iframe | aula-arquitetura-front-end.html:20635 | — | none | No | `document.createElement("iframe")` from the slide presentation script, opening the overview (`view=overview`) of the presentation itself; internal to the class material rather than embedding another unit. |
| src-cross-unit-communication | aula-arquitetura-front-end.html:20284 | — | none | No | `postMessage` from the Marp runtime to the presentation’s own `iframe` elements (`e.querySelectorAll("iframe")` … `t.postMessage(...)`, on the same line); internal slide communication rather than inter-unit communication. |
| src-cross-unit-communication | aula-arquitetura-front-end.html:20635 | — | none | No | `window.parent.postMessage("closeOverview", ...)` and `postMessage(\`navigate:...\`)` between overview/presenter windows of the same slide deck; not an inter-unit mechanism. |

## Constructs outside mining

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| manual | exemplos/10-micro-frontends/apps/shell/src/main.ts:16 | exemplos/10-micro-frontends/apps/shell | remote-resolution | Yes | Fetches manifest `/remotes.json` and resolves the remote entry URL by name (`catalogo` or `checkout`), with version and origin validation (exemplos/10-micro-frontends/apps/shell/src/main.ts:16-22); the manifest points to `http://127.0.0.1:4301/microfrontend.js` and `http://127.0.0.1:4302/microfrontend.js` (exemplos/10-micro-frontends/apps/shell/public/remotes.json:2-4). `abrir` is connected to buttons at exemplos/10-micro-frontends/apps/shell/src/main.ts:36-37, entry loaded by exemplos/10-micro-frontends/apps/shell/index.html:1. |
| manual | exemplos/10-micro-frontends/apps/shell/src/main.ts:23 | exemplos/10-micro-frontends/apps/shell | dynamic-loading | Yes | `import(/* @vite-ignore */ url.href)` loads at runtime the ESM module of the remote resolved on line 20 (catalogo-react or checkout-angular); typed through contract `Remote` imported from exemplos/10-micro-frontends/packages/contracts/mount.ts:4 (exemplos/10-micro-frontends/apps/shell/src/main.ts:1). |
| manual | exemplos/10-micro-frontends/apps/shell/src/main.ts:26 | exemplos/10-micro-frontends/apps/shell | runtime-composition | Yes | `remote.mount(slot)` mounts the loaded remote in its own `div` (exemplos/10-micro-frontends/apps/shell/src/main.ts:12-13) and stores cleanup (line 28), called on unmounting at exemplos/10-micro-frontends/apps/shell/src/main.ts:7 and :38. |

## Summary

Constructs participating in composition: 5 (runtime-composition: 3, remote-resolution: 1, dynamic-loading: 1).

## Notes

- The four occurrences in `aula-arquitetura-front-end.html` are false positives: the file is the exported Marp presentation, with minified slide scripts on very long lines.
- Mining missed the shell flow (manifest, `import()` with URL in a variable and `mount`), recorded in the manual rows.
- The local `import()` calls of other units (for example exemplos/04-feature-based/angular/src/app/app.routes.ts:3-4, exemplos/11-renderizacao/next/src/app/painel/page.tsx:4) load files of the application itself and did not become rows.
