---
schema: 1
id: 1036476677
full_name: Pandian-it/eager-workspace1
commit: 9ad83c2d39d410bab0e82efdebca145ebb04adbc
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

# 006 — Pandian-it/eager-workspace1

## Leitura do repositório

Workspace Nx com um shell Angular e três remotes (`cart`, `checkout`, `orders`) ligados por Module Federation (`@angular-architects/module-federation`), além de duas bibliotecas compartilhadas, `shared-lib` e `shared-ui`, que o shell carrega como singletons *eager* (projects/shell/webpack.config.js:20-33). Cada remote expõe o mesmo módulo `./Module` (ex.: projects/cart/webpack.config.js:7-8), e cada rota do shell carrega um remote (projects/shell/src/app/app-routing.module.ts:8-28).

O carregamento não usa os `remotes` estáticos do webpack. Um `ManifestService` lê `mfe.manifest.json` quando roda em localhost e `deployment-manifest.json` em produção. Em produção, a URL é montada como `<origin com www→mfe>/apps/<app>/<versão>/remoteEntry.js` (projects/shell/src/app/manifest.service.ts:23-58), o que aponta para um deploy independente e versionado de cada remote, num subdomínio próprio.

Particularidades: projects/cart é Undetermined na revisão estrutural porque seu bootstrap standalone não inicia UI, mas isso não afeta seu papel de remote. O arquivo projects/shell/public/federation.manifest.json (com `mfe1` e `mfe2`) não é lido pelo código do shell e parece resíduo de um template.

## Relações

| # | Origem | Destino | Tipo | Direção | Mecanismo | No snapshot | Ativa | Configuração | Código |
|---|---|---|---|---|---|---|---|---|---|
| 1 | projects/shell | projects/cart | host → remote | origem → destino | module-federation | Yes | Yes | projects/shell/webpack.config.js:7-8 (remote `cart` em `http://localhost:4201/remoteEntry.js`); projects/shell/public/mfe.manifest.json:3 (`cart` → `http://localhost:4201/remoteEntry.js`); projects/cart/webpack.config.js:5-8 (`name: 'cart'`, expõe `./Module`); projects/cart/project.json:79 (porta 4201) | projects/shell/src/app/app-routing.module.ts:13; projects/shell/src/app/manifest.service.ts:4; projects/shell/src/app/manifest.service.ts:23; projects/shell/src/app/manifest.service.ts:63; projects/shell/src/app/manifest.service.ts:65; projects/shell/src/app/manifest.service.ts:71; projects/shell/src/app/app-routing.module.ts:8; projects/shell/src/app/manifest.service.ts:40 |
| 2 | projects/shell | projects/checkout | host → remote | origem → destino | module-federation | Yes | Yes | projects/shell/webpack.config.js:7, 9 (remote `checkout` em `http://localhost:4202/remoteEntry.js`); projects/shell/public/mfe.manifest.json:4 (`checkout` → `http://localhost:4202/remoteEntry.js`); projects/checkout/webpack.config.js:5-8 (`name: 'checkout'`, expõe `./Module`); projects/checkout/project.json:88 (porta 4202) | projects/shell/src/app/app-routing.module.ts:20; projects/shell/src/app/manifest.service.ts:4; projects/shell/src/app/manifest.service.ts:23; projects/shell/src/app/manifest.service.ts:63; projects/shell/src/app/manifest.service.ts:65; projects/shell/src/app/manifest.service.ts:71; projects/shell/src/app/app-routing.module.ts:8; projects/shell/src/app/manifest.service.ts:40 |
| 3 | projects/shell | projects/orders | host → remote | origem → destino | module-federation | Yes | Yes | projects/shell/webpack.config.js:7, 10 (remote `orders` em `http://localhost:4203/remoteEntry.js`); projects/shell/public/mfe.manifest.json:2 (`orders` → `http://localhost:4203/remoteEntry.js`); projects/orders/webpack.config.js:5-8 (`name: 'orders'`, expõe `./Module`); projects/orders/project.json:87 (porta 4203) | projects/shell/src/app/app-routing.module.ts:27; projects/shell/src/app/manifest.service.ts:4; projects/shell/src/app/manifest.service.ts:23; projects/shell/src/app/manifest.service.ts:63; projects/shell/src/app/manifest.service.ts:65; projects/shell/src/app/manifest.service.ts:71; projects/shell/src/app/app-routing.module.ts:8; projects/shell/src/app/manifest.service.ts:40 |

## Observações

**1. projects/shell → projects/cart.** A rota `cart` chama `loadRemoteModule('cart')` (projects/shell/src/app/app-routing.module.ts:13). O serviço lê o manifesto local (projects/shell/src/app/manifest.service.ts:18) e carrega `./Module` (projects/shell/src/app/manifest.service.ts:70-74). O nome `cart` e o módulo `./Module` correspondem a projects/cart/webpack.config.js:5-8; a porta 4201 só corrobora. As linhas do serviço sustentam as três relações, porque um único fluxo atende os três remotes.

**2. projects/shell → projects/checkout.** Mesmo fluxo, pela rota `checkout` (projects/shell/src/app/app-routing.module.ts:20). O nome e o módulo correspondem a projects/checkout/webpack.config.js:5-8; a porta 4202 só corrobora.

**3. projects/shell → projects/orders.** Mesmo fluxo, pela rota `orders` (projects/shell/src/app/app-routing.module.ts:27). O nome e o módulo correspondem a projects/orders/webpack.config.js:5-8; a porta 4203 só corrobora.

## Resumo

Relações: 3 (host → remote: 3). Ativas: 3. Destino fora do snapshot: 0.
Unidades sem relação: nenhuma.
