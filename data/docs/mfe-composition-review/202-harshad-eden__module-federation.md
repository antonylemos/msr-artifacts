---
schema: 1
id: 1015183048
full_name: harshad-eden/module-federation
commit: dde74e678a749ccbf3951e173bf980649034c5d4
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

# 202 — harshad-eden/module-federation

## Leitura do repositório

Exemplo de uma plataforma de seguros fictícia: um monorepo pnpm com quatro aplicações React/Vite unidas por Module Federation (`@originjs/vite-plugin-federation`). `apps/shell` é o host, com porta 3000 e sem `exposes` (apps/shell/vite.config.ts:8-16, 23-25). Ele declara três remotes, `salesPortal`, `underwriterPortal` e `productConfig` (apps/shell/vite.config.ts:10-14). Cada um corresponde a uma aplicação de `apps/` que expõe `./App` num `remoteEntry.js` (apps/sales-portal/vite.config.ts:9-13; apps/underwriter-portal/vite.config.ts:9-13; apps/product-config/vite.config.ts:9-13). Os quatro compartilham `react`, `react-dom` e `react-router-dom` (por exemplo apps/shell/vite.config.ts:15).

O padrão de entrada é o mesmo para os três remotes. Para cada um, o shell tem um componente wrapper que faz `React.lazy(() => import("<remote>/App"))`, com um componente de erro local no `.catch` (apps/shell/src/components/SalesPortal.tsx:4-5). Esse wrapper renderiza o remote dentro de `ErrorBoundary` e `Suspense` (apps/shell/src/components/SalesPortal.tsx:84). As rotas do shell ligam cada wrapper a um prefixo: `/sales/*`, `/underwriter/*` e `/products/*` (apps/shell/src/App.tsx:12-17). O shell é montado dentro de `BrowserRouter` (apps/shell/src/main.tsx:7-13), e os remotes usam o roteador do host para as suas rotas internas. Por exemplo, o sales-portal declara tanto `/quotes` quanto `/sales/quotes` (apps/sales-portal/src/App.tsx:11-18). Os módulos remotos têm declarações de tipo só para o TypeScript (apps/shell/src/types/remotes.d.ts:1-14).

Não há comunicação entre unidades: a revisão de código-fonte não encontrou mecanismo de mensagens, e as aplicações só trocam código pelos pacotes de workspace `packages/shared-ui` e `packages/shared-types`, que não são unidades. As URLs dos remotes são fixas em `localhost` e apontam para o bundle gerado (`/dist/assets/remoteEntry.js`, apps/shell/vite.config.ts:11-13). A documentação cita mais duas aplicações, `employer-portal` e `service-provider` (README.md:11-19, 85-88), que não existem no snapshot e não têm remote declarado no shell. Todas as quatro unidades da revisão estrutural participam de alguma relação.

## Relações

| # | Origem | Destino | Tipo | Direção | Mecanismo | No snapshot | Ativa | Configuração | Código |
|---|---|---|---|---|---|---|---|---|---|
| 1 | apps/shell | apps/product-config | host → remote | origem → destino | module-federation | Yes | Yes | apps/shell/vite.config.ts:13 (remote `productConfig` em `http://localhost:3004/dist/assets/remoteEntry.js`); apps/product-config/vite.config.ts:9-13 (`name: "productConfig"`, `filename: "remoteEntry.js"`, expõe `./App`); apps/product-config/vite.config.ts:26 (porta 3004) | apps/shell/src/components/ProductConfig.tsx:5; apps/shell/src/App.tsx:12; apps/shell/src/components/ProductConfig.tsx:75 |
| 2 | apps/shell | apps/sales-portal | host → remote | origem → destino | module-federation | Yes | Yes | apps/shell/vite.config.ts:11 (remote `salesPortal` em `http://localhost:3001/dist/assets/remoteEntry.js`); apps/sales-portal/vite.config.ts:9-13 (`name: "salesPortal"`, `filename: "remoteEntry.js"`, expõe `./App`); apps/sales-portal/vite.config.ts:26 (porta 3001) | apps/shell/src/components/SalesPortal.tsx:5; apps/shell/src/App.tsx:12; apps/shell/src/components/SalesPortal.tsx:84 |
| 3 | apps/shell | apps/underwriter-portal | host → remote | origem → destino | module-federation | Yes | Yes | apps/shell/vite.config.ts:12 (remote `underwriterPortal` em `http://localhost:3002/dist/assets/remoteEntry.js`); apps/underwriter-portal/vite.config.ts:9-13 (`name: "underwriterPortal"`, `filename: "remoteEntry.js"`, expõe `./App`); apps/underwriter-portal/vite.config.ts:26 (porta 3002) | apps/shell/src/components/UnderwriterPortal.tsx:5; apps/shell/src/App.tsx:12; apps/shell/src/components/UnderwriterPortal.tsx:75 |

## Observações

**1. apps/shell → apps/product-config.** O shell declara o remote pela chave `productConfig` (apps/shell/vite.config.ts:13). Essa chave coincide com o `name` da federação de apps/product-config (apps/product-config/vite.config.ts:9), e o arquivo da URL é o `filename` declarado lá (apps/product-config/vite.config.ts:10). A porta 3004 (apps/product-config/vite.config.ts:26) só corrobora. O módulo importado, `productConfig/App` (apps/shell/src/components/ProductConfig.tsx:5), é o `./App` exposto (apps/product-config/vite.config.ts:11-12). A relação é ativa: o wrapper é renderizado na rota `/products/*` (apps/shell/src/App.tsx:16) e renderiza o componente remoto (apps/shell/src/components/ProductConfig.tsx:75). Se a carga falhar, aparece um aviso local, mas isso não altera a relação. O remote só declara as rotas `/` e `/products` (apps/product-config/src/App.tsx:10-11).

**2. apps/shell → apps/sales-portal.** O destino foi resolvido do mesmo modo: a chave `salesPortal` (apps/shell/vite.config.ts:11) coincide com o `name` e o `filename` de apps/sales-portal (apps/sales-portal/vite.config.ts:9-10), que expõe `./App` (apps/sales-portal/vite.config.ts:11-12). A porta 3001 (apps/sales-portal/vite.config.ts:26) só corrobora. A relação é ativa pela rota `/sales/*` (apps/shell/src/App.tsx:14), pelo import de `salesPortal/App` (apps/shell/src/components/SalesPortal.tsx:5) e pela renderização do componente remoto (apps/shell/src/components/SalesPortal.tsx:84). Dentro do remote, as rotas aparecem com e sem o prefixo `/sales` (apps/sales-portal/src/App.tsx:11-18), o que permite servir as mesmas telas tanto sob o shell quanto isoladamente.

**3. apps/shell → apps/underwriter-portal.** O destino foi resolvido pela chave `underwriterPortal` (apps/shell/vite.config.ts:12), que coincide com o `name` e o `filename` de apps/underwriter-portal (apps/underwriter-portal/vite.config.ts:9-10), e pelo `./App` exposto (apps/underwriter-portal/vite.config.ts:11-12). A porta 3002 (apps/underwriter-portal/vite.config.ts:26) só corrobora. A relação é ativa pela rota `/underwriter/*` (apps/shell/src/App.tsx:15), pelo import de `underwriterPortal/App` (apps/shell/src/components/UnderwriterPortal.tsx:5) e pela renderização (apps/shell/src/components/UnderwriterPortal.tsx:75). Como no sales-portal, as rotas internas existem com e sem o prefixo `/underwriter` (apps/underwriter-portal/src/App.tsx:11-18).

## Resumo

Relações: 3 (host → remote: 3). Ativas: 3. Destino fora do snapshot: 0.
Unidades sem relação: nenhuma.
