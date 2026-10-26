---
schema: 1
id: 1043597864
full_name: wtlin1228/micro-frontend-workspace
commit: 9b81d2c5b6156084e0e9a4a3ecfdd89494d0b692
inputs:
  mining:
    output: data/mining/mfe-mining-001
    version: "1"
    config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-21
---

# 029 — wtlin1228/micro-frontend-workspace

## Leitura do repositório

Workspace pnpm com cinco aplicações Rsbuild em `packages/`: um `host`, dois remotes de Module Federation (`app-mf-1` e `app-mf-2`) e dois sub-apps qiankun (`app-qiankun-1` e `app-qiankun-2`). Há também uma biblioteca, `lib-app-interface`, construída com Rslib (packages/lib-app-interface/package.json:16). Todas são membros do workspace (pnpm-workspace.yaml:1-2) e compartilham um único lockfile na raiz. Cada aplicação tem `rsbuild.config.ts` e `package.json` próprios, com `build` e `preview` (ex.: packages/app-mf-1/package.json:7-8).

A raiz organiza o build em três etapas, que o README manda rodar em ordem: bibliotecas, aplicações e host (package.json:9-15; README.md:17-23). `build:apps` constrói os quatro remotes em paralelo, mas cada um com seu próprio comando (package.json:11). Depois, `preview:apps` e `preview:host` servem localmente o que foi construído (package.json:12, 15; README.md:21-23).

A configuração de build fixa endereços de `localhost` até na saída de produção. Os remotes definem `assetPrefix` em `http://localhost:<porta>/` (ex.: packages/app-mf-1/rsbuild.config.ts:8-10; packages/app-qiankun-1/rsbuild.config.ts:6-8), os de Module Federation repetem isso no `getPublicPath` (packages/app-mf-1/module-federation.config.ts:12), e o host registra as entradas dos quatro em `localhost` (packages/host/src/configs/apps.ts:14, 20, 26, 32). O build gera artefatos separados, mas eles só funcionam servidos nessas portas. Não há Dockerfile, CI nem configuração de hospedagem, e as ocorrências `ops-*`, `ci-*` e `cfg-public-path` da mineração estão vazias.

## Aplicações

| # | Aplicação | Build | Deploy | Onde é servida | Versionamento | Artefatos |
|---|---|---|---|---|---|---|
| 1 | packages/app-mf-1 | separado | não observado | `http://localhost:4001/` (packages/app-mf-1/rsbuild.config.ts:9, 23) | No | packages/app-mf-1/rsbuild.config.ts:7-25 (configuração própria, `assetPrefix` fixo); packages/app-mf-1/package.json:7 (`rsbuild build`); package.json:11 (`build:apps`) |
| 2 | packages/app-mf-2 | separado | não observado | `http://localhost:4002/` (packages/app-mf-2/rsbuild.config.ts:9, 23) | No | packages/app-mf-2/rsbuild.config.ts:7-25 (configuração própria, `assetPrefix` fixo); packages/app-mf-2/package.json:7 (`rsbuild build`); package.json:11 (`build:apps`) |
| 3 | packages/app-qiankun-1 | separado | não observado | `http://localhost:3001/` (packages/app-qiankun-1/rsbuild.config.ts:7, 27) | No | packages/app-qiankun-1/rsbuild.config.ts:5-29 (configuração própria, bundle `umd`, `assetPrefix` fixo); packages/app-qiankun-1/package.json:7 (`rsbuild build`); package.json:11 (`build:apps`) |
| 4 | packages/app-qiankun-2 | separado | não observado | `http://localhost:3002/` (packages/app-qiankun-2/rsbuild.config.ts:7, 27) | No | packages/app-qiankun-2/rsbuild.config.ts:5-29 (configuração própria, bundle `umd`, `assetPrefix` fixo); packages/app-qiankun-2/package.json:7 (`rsbuild build`); package.json:11 (`build:apps`) |
| 5 | packages/host | separado | não observado | `http://localhost:3000/` (packages/host/rsbuild.config.ts:19-20) | No | packages/host/rsbuild.config.ts:7-22 (configuração própria); packages/host/package.json:7 (`rsbuild build`); package.json:14 (`build:host`) |

## Observações

**1. packages/app-mf-1.** Build próprio, disparado junto com os outros remotes por `build:apps`. O `assetPrefix` e o `getPublicPath` fixos em `localhost:4001` prendem o artefato a essa porta. Sem deploy observado: o `preview` só serve localmente. A versão `1.0.0` não é usada na publicação.

**2. packages/app-mf-2.** Mesmo arranjo, na porta 4002 (packages/app-mf-2/rsbuild.config.ts:9, 23).

**3. packages/app-qiankun-1.** Build próprio, que gera uma biblioteca `umd` chamada `qiankun1` (packages/app-qiankun-1/rsbuild.config.ts:12-16), com `assetPrefix` fixo na porta 3001. Sem deploy observado.

**4. packages/app-qiankun-2.** Mesmo arranjo, biblioteca `qiankun2`, porta 3002 (packages/app-qiankun-2/rsbuild.config.ts:7, 27).

**5. packages/host.** Build próprio, com script de raiz separado e rodado depois dos remotes (package.json:14; README.md:17-20). O host não fixa `assetPrefix`, mas as entradas dos remotes ficam em `localhost` no código (packages/host/src/configs/apps.ts:14-32). As entradas de Module Federation em `remotes` estão comentadas (packages/host/module-federation.config.ts:8-9). Sem deploy observado.

## Resumo

Aplicações: 5. Build (separado: 5). Deploy (não observado: 5). Versionamento independente: 0.
