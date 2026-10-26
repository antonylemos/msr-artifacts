---
schema: 1
id: 1043597864
full_name: wtlin1228/micro-frontend-workspace
commit: 9b81d2c5b6156084e0e9a4a3ecfdd89494d0b692
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-19
---

# 029 — wtlin1228/micro-frontend-workspace

## Workspace

pnpm-workspace.yaml:1-2 (inclui `packages/*`).

## Unidades

| Diretório | Marcadores | Manifesto | Entrada | Build | Workspace | Deploy | Unidade frontend | Motivo |
|---|---|---|---|---|---|---|---|---|
| . | package.json | package.json:1-16 (manifesto coordenador) | — | — | — | — | No | Raiz de orquestração pnpm, sem entrada de UI ou build de aplicação próprios. |
| packages/app-mf-1 | packages/app-mf-1/module-federation.config.ts;packages/app-mf-1/package.json;packages/app-mf-1/rsbuild.config.ts | packages/app-mf-1/package.json:1-12 (manifesto próprio) | packages/app-mf-1/src/index.tsx:1 (entrada convencional Rsbuild); packages/app-mf-1/src/bootstrap.tsx:6-15 (monta React) | packages/app-mf-1/rsbuild.config.ts:7-17 (configuração própria); packages/app-mf-1/package.json:7 (`rsbuild build`) | pnpm-workspace.yaml:1-2 (`packages/*`) | — | Yes | Aplicação React com entrada de UI e build Rsbuild próprios. |
| packages/app-mf-2 | packages/app-mf-2/module-federation.config.ts;packages/app-mf-2/package.json;packages/app-mf-2/rsbuild.config.ts | packages/app-mf-2/package.json:1-12 (manifesto próprio) | packages/app-mf-2/src/index.tsx:1 (entrada convencional Rsbuild); packages/app-mf-2/src/bootstrap.tsx:6-15 (monta React) | packages/app-mf-2/rsbuild.config.ts:7-17 (configuração própria); packages/app-mf-2/package.json:7 (`rsbuild build`) | pnpm-workspace.yaml:1-2 (`packages/*`) | — | Yes | Aplicação React com entrada de UI e build Rsbuild próprios. |
| packages/app-qiankun-1 | packages/app-qiankun-1/package.json;packages/app-qiankun-1/rsbuild.config.ts | packages/app-qiankun-1/package.json:1-12 (manifesto próprio) | packages/app-qiankun-1/src/index.tsx:1 (entrada convencional Rsbuild); packages/app-qiankun-1/src/lifecycles.tsx:22-38 (mount inicia a UI) | packages/app-qiankun-1/rsbuild.config.ts:5-16 (configuração própria); packages/app-qiankun-1/package.json:7 (`rsbuild build`) | pnpm-workspace.yaml:1-2 (`packages/*`) | — | Yes | Aplicação React com entrada de UI e build Rsbuild próprios. |
| packages/app-qiankun-2 | packages/app-qiankun-2/package.json;packages/app-qiankun-2/rsbuild.config.ts | packages/app-qiankun-2/package.json:1-12 (manifesto próprio) | packages/app-qiankun-2/src/index.tsx:1 (entrada convencional Rsbuild); packages/app-qiankun-2/src/lifecycles.tsx:22-38 (mount inicia a UI) | packages/app-qiankun-2/rsbuild.config.ts:5-16 (configuração própria); packages/app-qiankun-2/package.json:7 (`rsbuild build`) | pnpm-workspace.yaml:1-2 (`packages/*`) | — | Yes | Aplicação React com entrada de UI e build Rsbuild próprios. |
| packages/host | packages/host/module-federation.config.ts;packages/host/package.json;packages/host/rsbuild.config.ts | packages/host/package.json:1-12 (manifesto próprio) | packages/host/src/index.tsx:1 (entrada convencional Rsbuild); packages/host/src/bootstrap.tsx:5-12 (monta React) | packages/host/rsbuild.config.ts:7-17 (configuração própria); packages/host/package.json:7 (`rsbuild build`) | pnpm-workspace.yaml:1-2 (`packages/*`) | — | Yes | Aplicação React com entrada de UI e build Rsbuild próprios. |
| packages/lib-app-interface | packages/lib-app-interface/package.json | packages/lib-app-interface/package.json:1-19 (biblioteca exportada) | — | packages/lib-app-interface/rslib.config.ts:4-16 (build de biblioteca ESM e tipos); packages/lib-app-interface/package.json:16 (`rslib build`) | pnpm-workspace.yaml:1-2 (`packages/*`) | — | No | Biblioteca de contrato e tipos, sem entrada que inicie UI. |

## Resumo

Aplicações frontend no snapshot: 5 (packages/app-mf-1, packages/app-mf-2, packages/app-qiankun-1, packages/app-qiankun-2, packages/host).

## Notas

- As entradas das aplicações qiankun exportam lifecycles; a função mount inicia sua UI. Elas têm build próprio, embora src/index.tsx não invoque mount automaticamente.
- A biblioteca lib-app-interface usa RsLib e exporta tipos/valores de contrato; uma entrada de biblioteca não equivale à entrada de uma aplicação.
- Não há ocorrências ops-* ou ci-* em matches.csv que indiquem deploy separado.
