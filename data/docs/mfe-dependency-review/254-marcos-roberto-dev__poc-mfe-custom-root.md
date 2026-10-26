---
schema: 1
id: 1131085284
full_name: marcos-roberto-dev/poc-mfe-custom-root
commit: 6ae6565dc49a391729b62588c5fccf37d2be104b
inspection:
  output: data/inspections/mfe-dependencies-001
  version: "1"
  config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 254 — marcos-roberto-dev/poc-mfe-custom-root

## Dependências

| Manifesto:linha | Seção | Pacote | Versão | Tecnologia | Configurada | Evidência (artefato:linha) |
|---|---|---|---|---|---|---|
| content-app/package.json:12 | dependencies | single-spa | ^6.0.3 | single-spa | No | sem import de `single-spa` em content-app/ (grep, excluindo lockfiles); content-app/src/main.ts:4 importa só `single-spa-vue`; apenas declaração em content-app/package.json:12 |
| content-app/package.json:13 | dependencies | single-spa-vue | ^3.0.1 | single-spa | Yes | content-app/src/main.ts:4 e 8-22 (`import singleSpaVue from 'single-spa-vue'`; `singleSpaVue({ createApp, appOptions: ... })`; exporta `bootstrap`, `mount`, `unmount`); content-app/index.html:11 (`<script type="module" src="/src/main.ts">`, entrada do Vite); root-app/index.html:14 e root-classic/src/index.ejs:34 (`"@org/content-app": "http://127.0.0.1:5174/src/main.ts"`) |
| root-app/package.json:12 | dependencies | single-spa | ^6.0.3 | single-spa | Yes | root-app/src/components/ParcelWrapper.vue:11 e 46 (`import { mountRootParcel } from 'single-spa'`; `const mountParcel = mountRootParcel`, passado ao `Parcel` em :4); root-app/src/App.vue:2 e 8-9 (importa e usa `ParcelWrapper`); root-app/src/main.ts:3-5 (`createApp(App).mount('#app')`); root-app/index.html:43 (`/src/main.ts`, entrada do Vite) |
| root-app/package.json:13 | dependencies | single-spa-vue | ^3.0.1 | single-spa | Yes | root-app/src/components/ParcelWrapper.vue:10 e 2-5 (`import Parcel from 'single-spa-vue/parcel'`; `<Parcel ... :config="parcelConfigRef" :mountParcel="mountParcel" ...>`); mesma cadeia de uso da linha anterior (root-app/src/App.vue:2 e 8-9; root-app/src/main.ts:3-5; root-app/index.html:43) |
| root-app/package.json:14 | dependencies | vite-plugin-single-spa | ^1.1.0 | single-spa | No | sem import ou invocação de `vite-plugin-single-spa` nos arquivos do snapshot (grep, excluindo lockfiles); root-app/vite.config.ts:1-7 só registra `vue()`; apenas declaração em root-app/package.json:14 |
| root-classic/package.json:44 | dependencies | @types/systemjs | ^6.1.1 | import-maps | No | sem referência de tipos, import ou uso de `System.` em root-classic/ (grep, excluindo lockfiles); root-classic/tsconfig.json:1-9 e root-classic/src/declarations.d.ts:1-39 não o citam; root-classic/src/index.ejs:11, 17 e 41-43 (import map por `@single-spa/import-map-injector` e `import-map-overrides` via CDN, não SystemJS); apenas declaração em root-classic/package.json:44 |
| root-classic/package.json:45 | dependencies | single-spa | ^5.9.3 | single-spa | Yes | root-classic/src/org-root-config.ts:1 e 18-20 (`import { registerApplication, start } from "single-spa"`; `applications.forEach(registerApplication)`; `start()`); root-classic/webpack.config.js:7-9 (`singleSpaDefaults({ orgName, projectName: "root-config", ... })`, cuja entrada é `src/org-root-config.ts`); root-classic/src/index.ejs:33 e 52-54 (`"@org/root-config": "//localhost:9000/org-root-config.js"`; `import('@org/root-config')`) |
| root-classic/package.json:47 | dependencies | single-spa-layout | ^1.6.0 | single-spa | Yes | root-classic/src/org-root-config.ts:2-6 e 9-19 (`import { constructApplications, constructRoutes, constructLayoutEngine } from "single-spa-layout"`; rotas a partir de `./microfrontend-layout.html`; `layoutEngine.activate()`); mesmo arquivo de entrada da linha anterior (root-classic/webpack.config.js:7-9; root-classic/src/index.ejs:52-54) |
| root-classic/package.json:40 | devDependencies | ts-config-single-spa | ^3.0.0 | single-spa | Yes | root-classic/tsconfig.json:2 (`"extends": "ts-config-single-spa"`); root-classic/package.json:10 e 12 (`concurrently npm:build:*` e `build:types`: `tsc`, que lê o `tsconfig.json`) |
| root-classic/package.json:39 | devDependencies | webpack-config-single-spa-ts | ^8.0.0 | single-spa | Yes | root-classic/webpack.config.js:2 e 7-13 (`require("webpack-config-single-spa-ts")`; `singleSpaDefaults({ orgName, projectName: "root-config", ... })`); root-classic/package.json:4 e 11 (`webpack serve --port 9000 --env isLocal` e `webpack --mode=production`, que leem o `webpack.config.js` padrão) |
| topbar-app/package.json:12 | dependencies | single-spa | ^6.0.3 | single-spa | No | sem import de `single-spa` em topbar-app/ (grep, excluindo lockfiles); topbar-app/src/main.ts:4 importa só `single-spa-vue`; apenas declaração em topbar-app/package.json:12 |
| topbar-app/package.json:13 | dependencies | single-spa-vue | ^3.0.1 | single-spa | Yes | topbar-app/src/main.ts:4 e 8-22 (`import singleSpaVue from 'single-spa-vue'`; `singleSpaVue({ createApp, appOptions: ... })`; exporta `bootstrap`, `mount`, `unmount`); topbar-app/index.html:11 (`/src/main.ts`, entrada do Vite); topbar-app/vite.config.ts:10 (`input: 'src/main.ts'`); root-app/index.html:15 e root-classic/src/index.ejs:35 (porta 5175, `/src/main.ts`) |

## Notas

- `single-spa` em `content-app` e `topbar-app`: o `same_package_matches` (`src/main.ts:4` e `:8`) é o import e a chamada de `single-spa-vue`, não deste pacote. O `mountRootParcel` de `single-spa` é usado só no `root-app`, que tem `package.json` e lockfile próprios, sem workspace na raiz; por isso a ocorrência não conta para os remotos.
- `@types/systemjs`: as sete ocorrências de `same_package_matches` em `root-classic/src/index.ejs` são padrões de import map (meta `importmap-type`, comentários, scripts `injector-importmap`, injetor), não uso do pacote de tipos. O `System.import` do `root-app/src/utils/dynamicImport.ts:22-24` está em outro pacote, que não declara `@types/systemjs` e tipa `window.System` em `root-app/src/global.d.ts:8-11`.
- `root-classic`: o código importa `single-spa` declarado como `^5.9.3`, mas o import map compartilhado aponta para `single-spa@6.0.3` por CDN (`root-classic/src/index.ejs:17-24`). Não muda a resposta.
