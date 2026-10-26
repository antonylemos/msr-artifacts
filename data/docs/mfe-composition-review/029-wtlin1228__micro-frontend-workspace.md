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
  inspection:
    output: data/inspections/mfe-dependencies-001
    version: "1"
    config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-21
---

# 029 — wtlin1228/micro-frontend-workspace

## Leitura do repositório

Workspace pnpm com um host React (Rsbuild) que compõe quatro aplicações por **dois mecanismos ao mesmo tempo**, a partir de um único registro `APP_CONFIGS` (packages/host/src/configs/apps.ts:9-34). Um comentário no próprio arquivo diz que, num cenário real, esse registro viria de uma API de backend (packages/host/src/configs/apps.ts:8).

- `app-mf-1` e `app-mf-2` entram por **Module Federation em runtime**: o host registra e carrega cada remote sob demanda, quando a rota `/apps/<id>` é acessada (packages/host/src/app-loaders/module-federation.ts:27-34; packages/host/src/routes/apps.$baseRoute.tsx:12-56). Os `remotes` estáticos do host estão comentados (packages/host/module-federation.config.ts:5-10).
- `app-qiankun-1` e `app-qiankun-2` entram por **qiankun**: o host as registra com `activeRule` por caminho e inicia o orquestrador (packages/host/src/app-loaders/qiankun.ts:10-26). Elas são empacotadas como UMD e exportam lifecycles.

As quatro recebem o mesmo contrato (`basepath`, tipo `HostProps`) da biblioteca `lib-app-interface`, que não é unidade. É um repositório de demonstração comparativa de mecanismos, não um produto.

## Relações

| # | Origem | Destino | Tipo | Direção | Mecanismo | No snapshot | Ativa | Configuração | Código |
|---|---|---|---|---|---|---|---|---|---|
| 1 | packages/host | packages/app-mf-1 | host → remote | origem → destino | module-federation | Yes | Yes | packages/app-mf-1/module-federation.config.ts:4-7 (`name: 'mf1'`, expõe `.`); packages/app-mf-1/module-federation.config.ts:12 (public path `http://localhost:4001/`); packages/app-mf-1/rsbuild.config.ts:9, 23 (`assetPrefix` e porta 4001) | packages/host/src/app-loaders/module-federation.ts:3; packages/host/src/app-loaders/module-federation.ts:27; packages/host/src/app-loaders/module-federation.ts:34; packages/host/src/configs/apps.ts:9; packages/host/src/routes/apps.$baseRoute.tsx:24; packages/host/src/routes/apps.$baseRoute.tsx:43; packages/host/src/routes/apps.$baseRoute.tsx:54 |
| 2 | packages/host | packages/app-mf-2 | host → remote | origem → destino | module-federation | Yes | Yes | packages/app-mf-2/module-federation.config.ts:4-7 (`name: 'mf2'`, expõe `.`); packages/app-mf-2/module-federation.config.ts:12 (public path `http://localhost:4002/`); packages/app-mf-2/rsbuild.config.ts:9, 23 (`assetPrefix` e porta 4002) | packages/host/src/app-loaders/module-federation.ts:3; packages/host/src/app-loaders/module-federation.ts:27; packages/host/src/app-loaders/module-federation.ts:34; packages/host/src/configs/apps.ts:9; packages/host/src/routes/apps.$baseRoute.tsx:24; packages/host/src/routes/apps.$baseRoute.tsx:43; packages/host/src/routes/apps.$baseRoute.tsx:54 |
| 3 | packages/host | packages/app-qiankun-1 | root-config → application | origem → destino | qiankun | Yes | Yes | packages/app-qiankun-1/rsbuild.config.ts:7 (`assetPrefix` `http://localhost:3001/`); packages/app-qiankun-1/rsbuild.config.ts:12-16 (biblioteca `umd` `qiankun1`); packages/app-qiankun-1/rsbuild.config.ts:27 (porta 3001) | packages/app-qiankun-1/src/index.tsx:1; packages/app-qiankun-1/src/lifecycles.tsx:14; packages/app-qiankun-1/src/lifecycles.tsx:22; packages/app-qiankun-1/src/lifecycles.tsx:45; packages/host/src/app-loaders/qiankun.ts:2; packages/host/src/app-loaders/qiankun.ts:25; packages/host/src/App.tsx:8; packages/host/src/app-loaders/qiankun.ts:26; packages/host/src/configs/apps.ts:9 |
| 4 | packages/host | packages/app-qiankun-2 | root-config → application | origem → destino | qiankun | Yes | Yes | packages/app-qiankun-2/rsbuild.config.ts:7 (`assetPrefix` `http://localhost:3002/`); packages/app-qiankun-2/rsbuild.config.ts:12-16 (biblioteca `umd` `qiankun2`); packages/app-qiankun-2/rsbuild.config.ts:27 (porta 3002) | packages/app-qiankun-2/src/index.tsx:1; packages/app-qiankun-2/src/lifecycles.tsx:14; packages/app-qiankun-2/src/lifecycles.tsx:22; packages/app-qiankun-2/src/lifecycles.tsx:45; packages/host/src/app-loaders/qiankun.ts:2; packages/host/src/app-loaders/qiankun.ts:25; packages/host/src/App.tsx:8; packages/host/src/app-loaders/qiankun.ts:26; packages/host/src/configs/apps.ts:9 |

## Observações

**1. packages/host → packages/app-mf-1.** O registro declara `id: 'app-mf-1'`, `name: 'mf1'` e entry `http://localhost:4001/mf-manifest.json` (packages/host/src/configs/apps.ts:10-15). O nome `mf1` corresponde a packages/app-mf-1/module-federation.config.ts:4, e o id ao diretório; a porta só corrobora. O host chama a fábrica `getRootComponent` exportada pelo remote, passando o `basepath`, e renderiza o resultado em `Suspense` (packages/host/src/app-loaders/module-federation.ts:34-43; packages/host/src/routes/apps.$baseRoute.tsx:52-56).

**2. packages/host → packages/app-mf-2.** Mesmo fluxo, com `id: 'app-mf-2'` e `name: 'mf2'` (packages/host/src/configs/apps.ts:16-21), que corresponde a packages/app-mf-2/module-federation.config.ts:4.

**3. packages/host → packages/app-qiankun-1.** O registro declara `id: 'app-qiankun-1'`, `name: 'qiankun1'` e entry `http://localhost:3001/index.html` (packages/host/src/configs/apps.ts:22-27). O host registra a aplicação no qiankun com esse id e `activeRule` `/apps/app-qiankun-1` (packages/host/src/app-loaders/qiankun.ts:12-21). O nome `qiankun1` corresponde à biblioteca UMD de packages/app-qiankun-1/rsbuild.config.ts:13-15. Os lifecycles exportados pela unidade (`bootstrap`, `mount`, `unmount`) fazem parte desta relação; `bootstrap` só registra log.

**4. packages/host → packages/app-qiankun-2.** Mesmo fluxo, com `id: 'app-qiankun-2'` e `name: 'qiankun2'` (packages/host/src/configs/apps.ts:28-33), que corresponde a packages/app-qiankun-2/rsbuild.config.ts:13-15.

## Resumo

Relações: 4 (host → remote: 2, root-config → application: 2). Ativas: 4. Destino fora do snapshot: 0.
Unidades sem relação: nenhuma.
