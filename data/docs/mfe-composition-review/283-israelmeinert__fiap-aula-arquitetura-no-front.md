---
schema: 1
id: 1408068032
full_name: israelmeinert/fiap-aula-arquitetura-no-front
commit: e1c6fb92488afd39e2c1d704ee1243ed52d862b6
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

# 283 — israelmeinert/fiap-aula-arquitetura-no-front

## Repository overview

Frontend architecture course material with 14 example blocks in the same domain ("EventFlow"). Only block `exemplos/10-micro-frontends/` composes units. The other blocks are isolated applications, each with its own entry point and build. The structural review counts 29 units, and 26 remain outside all relationships. In block 10, the Vite/TypeScript shell (port 4300, `exemplos/10-micro-frontends/apps/shell/package.json:7`) loads one remote at a time at runtime: React Catalog or Angular Checkout. The README summarizes the flow as "Shell → manifesto → módulo ESM remoto → mount(host) → cleanup()" (English translation: "Shell → manifest → remote ESM module → mount(host) → cleanup()") (`exemplos/10-micro-frontends/README.md:18`).

No MFE library is used (the dependency review found none). Composition is implemented manually. The shell fetches manifest `/remotes.json` and checks the URL's version and origin against a fixed list (`exemplos/10-micro-frontends/apps/shell/src/main.ts:16-22`). It then imports the remote ESM module with `import(/* @vite-ignore */ url.href)` (`:23`), checks whether it exports `mount` (`:25`) and mounts it in its own `div` (`:12-13`, `:26`). It retains cleanup and calls it when switching remotes or unmounting (`:7`, `:28`, `:38`). Each remote is bundled by common script `scripts/build-remoto.mjs` as `dist/microfrontend.js` in ESM format (`scripts/build-remoto.mjs:21-22`). Angular first goes through `ngc` (`exemplos/10-micro-frontends/apps/checkout-angular/package.json:7`). Both remotes are served by `scripts/servir-remoto.mjs`, with CORS enabled for the shell at 4300 (`scripts/servir-remoto.mjs:4-6`).

The contract between units consists only of types: `Mount`, `Remote` and `Manifest` in `exemplos/10-micro-frontends/packages/contracts/mount.ts:1-5`, described by the comment as "sem componentes ou estado global compartilhados" (English translation: "without shared components or global state"). `packages/contracts` is not a unit. There is no communication between catalog and checkout ("o contrato é de montagem, sem comunicação de seleção entre catálogo e checkout", English translation: "the contract covers mounting, without selection communication between catalog and checkout", `exemplos/10-micro-frontends/README.md:125`), hence no `communication` row. The `postMessage`, `iframe` and custom element recorded in `aula-arquitetura-front-end.html` are internal slide deck scripts and remained `No` in the source code review. The e2e test covers mounting, switching, unmounting and remote failure (`tests/e2e/aula.spec.ts:142-154`). Independent deployment is described but not provisioned (`exemplos/10-micro-frontends/README.md:111`, `:125`).

## Relationships

| # | Source | Target | Type | Direction | Mechanism | In snapshot | Active | Configuration | Code |
|---|---|---|---|---|---|---|---|---|---|
| 1 | exemplos/10-micro-frontends/apps/shell | exemplos/10-micro-frontends/apps/catalogo-react | host → remote | source → target | script | Yes | Yes | exemplos/10-micro-frontends/apps/shell/public/remotes.json:3 (`catalogo` → `http://127.0.0.1:4301/microfrontend.js`); exemplos/10-micro-frontends/apps/catalogo-react/package.json:7-8 (`build` with `build-remoto.mjs react`; `dev` serves on port 4301); scripts/build-remoto.mjs:21-22 (entry point `src/mount.tsx`, output `dist/microfrontend.js`, format `esm`); scripts/servir-remoto.mjs:4-6 (CORS to `http://127.0.0.1:4300`, serve `dist`, `/microfrontend.js`) | exemplos/10-micro-frontends/apps/catalogo-react/src/mount.tsx:3; exemplos/10-micro-frontends/apps/shell/src/main.ts:16; exemplos/10-micro-frontends/apps/shell/src/main.ts:23; exemplos/10-micro-frontends/apps/shell/src/main.ts:26 |
| 2 | exemplos/10-micro-frontends/apps/shell | exemplos/10-micro-frontends/apps/checkout-angular | host → remote | source → target | script | Yes | Yes | exemplos/10-micro-frontends/apps/shell/public/remotes.json:4 (`checkout` → `http://127.0.0.1:4302/microfrontend.js`); exemplos/10-micro-frontends/apps/checkout-angular/package.json:7-8 (`build` with `ngc` and `build-remoto.mjs angular`; `dev` serves on port 4302); scripts/build-remoto.mjs:21-22 (entry point `dist/compiled/mount.js`, output `dist/microfrontend.js`, format `esm`); scripts/servir-remoto.mjs:4-6 (CORS to `http://127.0.0.1:4300`, serve `dist`, `/microfrontend.js`) | exemplos/10-micro-frontends/apps/checkout-angular/src/mount.ts:4; exemplos/10-micro-frontends/apps/shell/src/main.ts:16; exemplos/10-micro-frontends/apps/shell/src/main.ts:23; exemplos/10-micro-frontends/apps/shell/src/main.ts:26 |

## Observations

**1. exemplos/10-micro-frontends/apps/shell → exemplos/10-micro-frontends/apps/catalogo-react.** The manifest connects key `catalogo` to `http://127.0.0.1:4301/microfrontend.js` (`exemplos/10-micro-frontends/apps/shell/public/remotes.json:3`). The target is resolved through filename together with port. The catalogo-react `build` generates `dist/microfrontend.js` from `src/mount.tsx` (`exemplos/10-micro-frontends/apps/catalogo-react/package.json:7`; `scripts/build-remoto.mjs:21-22`). Its `dev` serves that `dist` on port 4301 (`exemplos/10-micro-frontends/apps/catalogo-react/package.json:8`; `scripts/servir-remoto.mjs:5-6`). The filename alone does not distinguish both remotes, because both generate `microfrontend.js`. The distinguishing factor is the port declared by each `package.json`, and the manifest key matches the folder name. Type is `host → remote` because the shell loads the module exposed by the target through remote `import()` (`exemplos/10-micro-frontends/apps/shell/src/main.ts:23`). Mechanism is `script`: there is no federation runtime or orchestrator, and the shell loads the separately generated ESM bundle by URL, as in classification (`approaches: [runtime-script]`). The difference is that the bundle enters through dynamic `import()`, without injected `<script>` or a global in `window`. The row is active: all four source code review constructs are `Yes`. The remote's exported `mount` (`exemplos/10-micro-frontends/apps/catalogo-react/src/mount.tsx:3-5`) enters this relationship, the consumer's. Lines 16, 23 and 26 of `main.ts` apply to both relationships because `abrir(nome)` serves both buttons (`exemplos/10-micro-frontends/apps/shell/src/main.ts:36-37`). English explanation of the original function identifier and parameter: open(name).

**2. exemplos/10-micro-frontends/apps/shell → exemplos/10-micro-frontends/apps/checkout-angular.** Resolution follows relationship 1: key `checkout` points to `http://127.0.0.1:4302/microfrontend.js` (`exemplos/10-micro-frontends/apps/shell/public/remotes.json:4`). Checkout-angular generates `dist/microfrontend.js` from `dist/compiled/mount.js`, output by `ngc` (`exemplos/10-micro-frontends/apps/checkout-angular/package.json:7`; `scripts/build-remoto.mjs:21-22`). Its `dev` serves that `dist` on port 4302 (`exemplos/10-micro-frontends/apps/checkout-angular/package.json:8`). `mount` creates its own Angular application with `createApplication` and `createComponent`, and returns cleanup destroying the view and application (`exemplos/10-micro-frontends/apps/checkout-angular/src/mount.ts:4-12`). Thus Angular runs inside the shell without being the shell's framework. Origin `http://127.0.0.1:4302` is in the allowed origins list (`exemplos/10-micro-frontends/apps/shell/src/main.ts:22`).

## Summary

Relationships: 2 (host → remote: 2). Active: 2. Target outside the snapshot: 0.
Units without a relationship: exemplos/01-componentes/angular, exemplos/01-componentes/react, exemplos/02-atomic-design/angular, exemplos/02-atomic-design/react, exemplos/03-camadas/angular, exemplos/03-camadas/react, exemplos/04-feature-based/angular, exemplos/04-feature-based/react, exemplos/05-clean-architecture/angular, exemplos/05-clean-architecture/react, exemplos/06-hexagonal/angular, exemplos/06-hexagonal/react, exemplos/07-feature-sliced-design/angular, exemplos/07-feature-sliced-design/react, exemplos/08-mvvm/angular, exemplos/08-mvvm/react, exemplos/09-flux/angular, exemplos/09-flux/react, exemplos/11-renderizacao/angular, exemplos/11-renderizacao/next, exemplos/12-ilhas/angular, exemplos/12-ilhas/astro, exemplos/13-bff/apps/web-angular, exemplos/13-bff/next, exemplos/14-escolha-e-evolucao/angular, exemplos/14-escolha-e-evolucao/react.

