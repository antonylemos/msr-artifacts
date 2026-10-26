---
schema: 1
id: 1145815182
full_name: fudoyoki/ai-portal-mfe-example
commit: f1fd5b0a988c45334a49d3992ebc84cb6ea5ae94
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

# 128 — fudoyoki/ai-portal-mfe-example

## Leitura do repositório

Exemplo de portal com duas aplicações React/Vite num monorepo npm workspaces: `apps/shell` é o host e `apps/mfe-dashboard` é o único remote, ligados por Module Federation (`@originjs/vite-plugin-federation`). O shell declara um remote `mfeDashboard` (apps/shell/vite.config.ts:28-31), cuja URL é montada por `getRemoteUrl`: em desenvolvimento, `http://localhost:3001/assets/remoteEntry.js`; em produção, `${CDN_URL}/mfeDashboard/remoteEntry.js`, com `https://cdn.example.com` como padrão (apps/shell/vite.config.ts:17-23). O dashboard se publica como `mfeDashboard`, com `filename: 'remoteEntry.js'`, e expõe `./DashboardApp` (apps/mfe-dashboard/vite.config.ts:11-17). Os dois lados declaram como `shared` singleton `react`, `react-dom`, `react-router-dom` e os pacotes internos `@ai-portal/ui-kit` e `@ai-portal/shared-types` (apps/shell/vite.config.ts:39-59; apps/mfe-dashboard/vite.config.ts:20-39).

O shell carrega o componente com `React.lazy` (apps/shell/src/App.tsx:7) e o encaixa na rota `/dashboard/*`, dentro de um error boundary e de um `Suspense` (apps/shell/src/App.tsx:165-176). O contrato entre os dois lados é só de props: o shell passa `user`, do seu `AuthContext`, e `basePath="/dashboard"` (apps/shell/src/App.tsx:172), conforme a interface `MfeProps` do pacote compartilhado (packages/shared-types/src/index.ts:48-51). O dashboard recebe `basePath` mas não o usa (apps/mfe-dashboard/src/DashboardApp.tsx:89). Não há troca de mensagens entre as unidades; a passagem de props não virou relação de `communication`. O dashboard também roda sozinho, com `BrowserRouter` próprio e um usuário fictício (apps/mfe-dashboard/src/main.tsx:17-26).

O que não virou relação: os remotes `mfeChat`, `mfeTools` e `mfeAdmin` estão comentados na configuração do shell (apps/shell/vite.config.ts:32-35), e as rotas `/chat/*` e `/tools/*` só mostram o placeholder local `ComingSoon` (apps/shell/src/App.tsx:177-178). Os pacotes `packages/ui-kit` e `packages/shared-types` são bibliotecas compartilhadas, não unidades frontend.

## Relações

| # | Origem | Destino | Tipo | Direção | Mecanismo | No snapshot | Ativa | Configuração | Código |
|---|---|---|---|---|---|---|---|---|---|
| 1 | apps/shell | apps/mfe-dashboard | host → remote | origem → destino | module-federation | Yes | Yes | apps/shell/vite.config.ts:28-31 (`name: 'shell'`, remote `mfeDashboard`); apps/shell/vite.config.ts:17-23 (URL do `remoteEntry.js`: `localhost:3001/assets` em dev, `${CDN_URL}/mfeDashboard` em produção); apps/mfe-dashboard/vite.config.ts:11-17 (`name: 'mfeDashboard'`, `filename: 'remoteEntry.js'`, expõe `./DashboardApp`); apps/mfe-dashboard/vite.config.ts:6 (porta 3001) | apps/shell/src/App.tsx:7; apps/shell/src/App.tsx:165; apps/shell/src/App.tsx:172 |

## Observações

**1. apps/shell → apps/mfe-dashboard.** O remote `mfeDashboard` do shell corresponde à unidade apps/mfe-dashboard pelo `name: 'mfeDashboard'` e pelo `filename: 'remoteEntry.js'` (apps/mfe-dashboard/vite.config.ts:12-13), e o módulo importado, `mfeDashboard/DashboardApp` (apps/shell/src/App.tsx:7), é o `./DashboardApp` exposto (apps/mfe-dashboard/vite.config.ts:15-17); a porta 3001 da URL de desenvolvimento (apps/shell/vite.config.ts:10, 19) e do dashboard (apps/mfe-dashboard/vite.config.ts:6) só corrobora. Em produção, a URL aponta para um CDN configurável por `CDN_URL`, com padrão fictício `cdn.example.com` (apps/shell/vite.config.ts:22); isso não muda a identidade do destino, que é a mesma unidade. A relação é ativa: as três linhas da revisão de código-fonte são `Yes`, e o componente é renderizado na rota `/dashboard/*` de `AppRoutes`, usada por `App` (apps/shell/src/App.tsx:165-176, 184-189).

## Resumo

Relações: 1 (host → remote: 1). Ativas: 1. Destino fora do snapshot: 0.
Unidades sem relação: nenhuma.
