---
schema: 1
id: 1330154796
full_name: samhoooo/module-federation-demo-mf2
commit: 0a621b661bc717fb3433ec3c5dbbcfb027d0a94a
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 327 — samhoooo/module-federation-demo-mf2

## Construções da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| src-remote-import | home-app/@mf-types/HeaderApp/apis.d.ts:3 | home-app | none | No | `typeof import('HeaderApp/Header')` é tipo condicional num arquivo de declaração gerado pelo DTS do Module Federation (`dts: true` em home-app/rspack.config.js:54; home-app/@mf-types/index.d.ts:1-22), usado só pelo TypeScript via `paths` (home-app/tsconfig.json:15-17); não carrega nada em runtime. O carregamento real é o `React.lazy` de home-app/src/App.tsx:13. |
| src-remote-import | home-app/src/App.tsx:13 | home-app | dynamic-loading | Yes | `lazy(() => import('HeaderApp/Header'))` carrega em runtime o módulo `./Header` da unidade header-app, exposto em header-app/rspack.config.js:60-62 (`./src/App`) e resolvido pelo remote `HeaderApp@http://localhost:4001/mf-manifest.json` (home-app/rspack.config.js:51-53). O componente é renderizado em home-app/src/App.tsx:19 (linha manual); a cadeia ativa é home-app/rspack.config.js:6 → home-app/src/entry.ts:1 → home-app/src/index.tsx:4,11-16 → App. |

## Construções fora da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| manual | home-app/src/App.tsx:19 | home-app | runtime-composition | Yes | Renderiza `<Header title="Header (MF2)" variant={HeaderVariant.Light} />`, componente da unidade header-app (header-app/src/App.tsx:14-20), dentro de `Suspense` no topo da página do host (home-app/src/App.tsx:18-20); o componente vem do `React.lazy` de home-app/src/App.tsx:13. O enum `HeaderVariant` passado como prop vem do import estático `HeaderApp/Header` em home-app/src/App.tsx:11, também resolvido pelo remote de home-app/rspack.config.js:52. |

## Resumo

Construções com composição: 2 (dynamic-loading: 1, runtime-composition: 1).

## Notas

- `import('./index')` em header-app/src/entry.ts:1 e home-app/src/entry.ts:1 é o bootstrap assíncrono interno de cada unidade; não casa com `src-remote-import` (especificador relativo) e, por ser interno, não vira linha manual.
- O import estático `import { HeaderVariant } from 'HeaderApp/Header'` (home-app/src/App.tsx:11) também consome o remote em runtime, mas a mineração não o pega (`src-remote-import` cobre só `import()`). Pelo passo 4, não virou linha própria: seu uso é a prop `variant` da renderização em :19, e ele ficou na Observação dessa linha.
- As declarações `loadRemote` em home-app/@mf-types/index.d.ts:6-21 são tipos gerados; o código-fonte não chama `loadRemote`.
- Nenhum custom element, iframe, script injetado ou mecanismo de comunicação entre unidades no código das duas unidades.
