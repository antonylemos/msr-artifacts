---
schema: 1
id: 1253360837
full_name: enzox0/module-federation-project-template
commit: b3c96cb653137038838f32097018cf8f8182b9f2
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

# 208 — enzox0/module-federation-project-template

## Leitura do repositório

Template de monorepo pnpm/Turbo com cinco aplicações React/Vite em `apps/`, unidas por Module Federation (`@originjs/vite-plugin-federation`). `apps/shell` é o host, na porta 3000 (apps/shell/vite.config.ts:15), e não expõe nada. Seu `module-federation.config.ts` declara quatro remotes, `authMf`, `dashboardMf`, `adminMf` e `messagingMf`, cada um num `http://localhost:300N/dist/assets/remoteEntry.js` (apps/shell/module-federation.config.ts:4-9). Esse objeto é passado ao plugin em apps/shell/vite.config.ts:4 e :7. Os quatro remotos têm a mesma forma: um `module-federation.config.ts` com `name`, `filename: 'remoteEntry.js'` e um único `exposes` `./App` → `./src/exposes.tsx` (por exemplo apps/auth-mf/module-federation.config.ts:2-6), e um `vite.config.ts` com a porta própria (por exemplo apps/auth-mf/vite.config.ts:15). Todos compartilham `react`, `react-dom` e `react-router-dom` (apps/shell/module-federation.config.ts:10).

O shell carrega os quatro remotos do mesmo modo: um `lazy(() => import('<remote>/App'))` por remote (apps/shell/src/App.tsx:7-10) e uma rota para cada um (`/auth`, `/admin`, `/dashboard`, `/messaging`), com o componente remoto dentro de `ErrorBoundary` e `Suspense` (apps/shell/src/App.tsx:36-75). O `App` do shell é montado pelo bootstrap assíncrono (apps/shell/src/main.tsx:1; apps/shell/src/bootstrap.tsx:5-9). Os remotos são stubs: admin, dashboard e messaging só renderizam um título (por exemplo apps/admin-mf/src/exposes.tsx:14), e auth um formulário de login que dispara `alert` (apps/auth-mf/src/exposes.tsx:7-10).

O que não virou relação: os módulos remotos são declarados só para o TypeScript (apps/shell/src/vite-env.d.ts:3-21), e o `RemoteHealthCheck` apenas lista as quatro URLs de `remoteEntry.js` para verificar disponibilidade (apps/shell/src/components/RemoteHealthCheck.tsx:11-16), sem carregar nada. Não há comunicação entre unidades. Os pacotes `packages/*` não são unidades e nenhum app os importa. Cada app também versiona os `.js` compilados das configurações. Nos remotos, eles repetem `name` e `exposes` (por exemplo apps/auth-mf/module-federation.config.js:2-5). No shell, o `.js` obsoleto aponta os remotes para `localhost:3004…3007/assets/remoteEntry.js` (apps/shell/module-federation.config.js:5-8). A classificação registra que, no fluxo padrão, o `.ts` (3001 a 3004) é o que governa. As chaves dos remotes e os módulos importados são os mesmos nos dois arquivos, então as relações não mudam. Todas as cinco unidades da revisão estrutural participam de alguma relação.

## Relações

| # | Origem | Destino | Tipo | Direção | Mecanismo | No snapshot | Ativa | Configuração | Código |
|---|---|---|---|---|---|---|---|---|---|
| 1 | apps/shell | apps/auth-mf | host → remote | origem → destino | module-federation | Yes | Yes | apps/shell/module-federation.config.ts:5 (remote `authMf` em `http://localhost:3001/dist/assets/remoteEntry.js`); apps/shell/vite.config.ts:7 (`federation(mfConfig)`); apps/auth-mf/module-federation.config.ts:2-6 (`name: 'authMf'`, `filename: 'remoteEntry.js'`, expõe `./App`); apps/auth-mf/vite.config.ts:15 (porta 3001) | apps/shell/src/App.tsx:7; apps/shell/src/App.tsx:24; apps/shell/src/App.tsx:41 |
| 2 | apps/shell | apps/admin-mf | host → remote | origem → destino | module-federation | Yes | Yes | apps/shell/module-federation.config.ts:7 (remote `adminMf` em `http://localhost:3003/dist/assets/remoteEntry.js`); apps/shell/vite.config.ts:7 (`federation(mfConfig)`); apps/admin-mf/module-federation.config.ts:2-6 (`name: 'adminMf'`, `filename: 'remoteEntry.js'`, expõe `./App`); apps/admin-mf/vite.config.ts:15 (porta 3003) | apps/shell/src/App.tsx:8; apps/shell/src/App.tsx:24; apps/shell/src/App.tsx:51 |
| 3 | apps/shell | apps/dashboard-mf | host → remote | origem → destino | module-federation | Yes | Yes | apps/shell/module-federation.config.ts:6 (remote `dashboardMf` em `http://localhost:3002/dist/assets/remoteEntry.js`); apps/shell/vite.config.ts:7 (`federation(mfConfig)`); apps/dashboard-mf/module-federation.config.ts:2-6 (`name: 'dashboardMf'`, `filename: 'remoteEntry.js'`, expõe `./App`); apps/dashboard-mf/vite.config.ts:15 (porta 3002) | apps/shell/src/App.tsx:9; apps/shell/src/App.tsx:24; apps/shell/src/App.tsx:61 |
| 4 | apps/shell | apps/messaging-mf | host → remote | origem → destino | module-federation | Yes | Yes | apps/shell/module-federation.config.ts:8 (remote `messagingMf` em `http://localhost:3004/dist/assets/remoteEntry.js`); apps/shell/vite.config.ts:7 (`federation(mfConfig)`); apps/messaging-mf/module-federation.config.ts:2-6 (`name: 'messagingMf'`, `filename: 'remoteEntry.js'`, expõe `./App`); apps/messaging-mf/vite.config.ts:15 (porta 3004) | apps/shell/src/App.tsx:10; apps/shell/src/App.tsx:24; apps/shell/src/App.tsx:71 |

## Observações

**1. apps/shell → apps/auth-mf.** O destino foi resolvido pela chave do remote, `authMf` (apps/shell/module-federation.config.ts:5), que coincide com o `name` da federação de apps/auth-mf (apps/auth-mf/module-federation.config.ts:2). O arquivo da URL é o `filename` declarado lá (apps/auth-mf/module-federation.config.ts:3). A porta 3001 (apps/auth-mf/vite.config.ts:15) só corrobora. O módulo importado, `authMf/App` (apps/shell/src/App.tsx:7), é o `./App` exposto (apps/auth-mf/module-federation.config.ts:4-6). A relação é ativa: `AuthApp` é renderizado na rota `/auth` (apps/shell/src/App.tsx:36-45). É o único remoto com algum comportamento, um formulário de login local que só mostra um `alert` e não devolve nada ao shell (apps/auth-mf/src/exposes.tsx:7-10). No `.js` obsoleto do shell, `authMf` aponta para a porta 3004 (apps/shell/module-federation.config.js:5), que é a porta de messaging-mf no `.ts`. Esse arquivo não é o que governa o fluxo padrão, conforme a classificação, e a identidade do destino vem do nome, não da porta.

**2. apps/shell → apps/admin-mf.** O destino foi resolvido do mesmo modo: a chave `adminMf` (apps/shell/module-federation.config.ts:7) coincide com o `name` e o `filename` de apps/admin-mf (apps/admin-mf/module-federation.config.ts:2-3), que expõe `./App` (apps/admin-mf/module-federation.config.ts:4-6). A porta 3003 (apps/admin-mf/vite.config.ts:15) só corrobora. A relação é ativa pelo import de `adminMf/App` (apps/shell/src/App.tsx:8) e pela renderização na rota `/admin` (apps/shell/src/App.tsx:46-55). O componente exposto só renderiza o título "Admin Microfrontend" (apps/admin-mf/src/exposes.tsx:14).

**3. apps/shell → apps/dashboard-mf.** A chave `dashboardMf` (apps/shell/module-federation.config.ts:6) coincide com o `name` e o `filename` de apps/dashboard-mf (apps/dashboard-mf/module-federation.config.ts:2-3), que expõe `./App` (apps/dashboard-mf/module-federation.config.ts:4-6). A porta 3002 (apps/dashboard-mf/vite.config.ts:15) só corrobora. A relação é ativa pelo import de `dashboardMf/App` (apps/shell/src/App.tsx:9) e pela renderização na rota `/dashboard` (apps/shell/src/App.tsx:56-65). O componente exposto só renderiza um título (apps/dashboard-mf/src/exposes.tsx:14).

**4. apps/shell → apps/messaging-mf.** A chave `messagingMf` (apps/shell/module-federation.config.ts:8) coincide com o `name` e o `filename` de apps/messaging-mf (apps/messaging-mf/module-federation.config.ts:2-3), que expõe `./App` (apps/messaging-mf/module-federation.config.ts:4-6). A porta 3004 (apps/messaging-mf/vite.config.ts:15) só corrobora. A relação é ativa pelo import de `messagingMf/App` (apps/shell/src/App.tsx:10) e pela renderização na rota `/messaging` (apps/shell/src/App.tsx:66-75). Apesar do nome, o remoto não troca mensagens com outras unidades: o componente exposto só renderiza um título (apps/messaging-mf/src/exposes.tsx:14).

## Resumo

Relações: 4 (host → remote: 4). Ativas: 4. Destino fora do snapshot: 0.
Unidades sem relação: nenhuma.
