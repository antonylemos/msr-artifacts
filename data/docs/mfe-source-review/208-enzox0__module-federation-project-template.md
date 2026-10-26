---
schema: 1
id: 1253360837
full_name: enzox0/module-federation-project-template
commit: b3c96cb653137038838f32097018cf8f8182b9f2
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 208 — enzox0/module-federation-project-template

## Construções da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| src-remote-import | apps/shell/src/App.tsx:7 | apps/shell | dynamic-loading | Yes | `lazy(() => import('authMf/App'))` carrega o `./App` exposto por apps/auth-mf (apps/auth-mf/module-federation.config.ts:2-6); o remote `authMf` aponta para `http://localhost:3001/dist/assets/remoteEntry.js` em apps/shell/module-federation.config.ts:5, passado ao plugin em apps/shell/vite.config.ts:7. Ativo: rota `/auth` em apps/shell/src/App.tsx:36-45; App montado em apps/shell/src/bootstrap.tsx:5-9, carregado por apps/shell/src/main.tsx:1 (entrada em apps/shell/index.html:10). |
| src-remote-import | apps/shell/src/App.tsx:8 | apps/shell | dynamic-loading | Yes | `lazy(() => import('adminMf/App'))` carrega o `./App` exposto por apps/admin-mf (apps/admin-mf/module-federation.config.ts:2-6); remote `adminMf` em `http://localhost:3003/dist/assets/remoteEntry.js` (apps/shell/module-federation.config.ts:7). Ativo: rota `/admin` em apps/shell/src/App.tsx:46-55. |
| src-remote-import | apps/shell/src/App.tsx:9 | apps/shell | dynamic-loading | Yes | `lazy(() => import('dashboardMf/App'))` carrega o `./App` exposto por apps/dashboard-mf (apps/dashboard-mf/module-federation.config.ts:2-6); remote `dashboardMf` em `http://localhost:3002/dist/assets/remoteEntry.js` (apps/shell/module-federation.config.ts:6). Ativo: rota `/dashboard` em apps/shell/src/App.tsx:56-65. |
| src-remote-import | apps/shell/src/App.tsx:10 | apps/shell | dynamic-loading | Yes | `lazy(() => import('messagingMf/App'))` carrega o `./App` exposto por apps/messaging-mf (apps/messaging-mf/module-federation.config.ts:2-6); remote `messagingMf` em `http://localhost:3004/dist/assets/remoteEntry.js` (apps/shell/module-federation.config.ts:8). Ativo: rota `/messaging` em apps/shell/src/App.tsx:66-75. |
| src-async-bootstrap | apps/shell/src/main.tsx:1 | apps/shell | dynamic-loading | No | `import('./bootstrap')` carrega o próprio bootstrap do shell (apps/shell/src/bootstrap.tsx); interno à unidade. |

## Construções fora da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| manual | apps/shell/src/App.tsx:24 | apps/shell | host-relationship | Yes | `Routes` declara onde o shell usa cada remote: `/auth` → `AuthApp`, `/admin` → `AdminApp`, `/dashboard` → `DashboardApp`, `/messaging` → `MessagingApp` (apps/shell/src/App.tsx:24-76), componentes dos lazy imports em apps/shell/src/App.tsx:7-10; `Routes` dentro de `Router` em apps/shell/src/App.tsx:14. |
| manual | apps/shell/src/App.tsx:41 | apps/shell | runtime-composition | Yes | Renderiza `AuthApp`, componente da unidade apps/auth-mf, dentro de `ErrorBoundary` + `Suspense` (apps/shell/src/App.tsx:39-43); vem do lazy import em apps/shell/src/App.tsx:7. |
| manual | apps/shell/src/App.tsx:51 | apps/shell | runtime-composition | Yes | Renderiza `AdminApp`, componente da unidade apps/admin-mf, dentro de `ErrorBoundary` + `Suspense` (apps/shell/src/App.tsx:49-53); vem do lazy import em apps/shell/src/App.tsx:8. |
| manual | apps/shell/src/App.tsx:61 | apps/shell | runtime-composition | Yes | Renderiza `DashboardApp`, componente da unidade apps/dashboard-mf, dentro de `ErrorBoundary` + `Suspense` (apps/shell/src/App.tsx:59-63); vem do lazy import em apps/shell/src/App.tsx:9. |
| manual | apps/shell/src/App.tsx:71 | apps/shell | runtime-composition | Yes | Renderiza `MessagingApp`, componente da unidade apps/messaging-mf, dentro de `ErrorBoundary` + `Suspense` (apps/shell/src/App.tsx:69-73); vem do lazy import em apps/shell/src/App.tsx:10. |

## Resumo

Construções com composição: 9 (dynamic-loading: 4, host-relationship: 1, runtime-composition: 4).

## Notas

- Os módulos remotos são declarados para o TypeScript em apps/shell/src/vite-env.d.ts:3-21; é só tipagem, não vira linha.
- apps/shell/src/components/RemoteHealthCheck.tsx:11-16 lista as URLs dos `remoteEntry.js` e faz `fetch` `HEAD` a cada 10 s (:24-58) só para mostrar se os remotes respondem; não carrega nem monta nada, não vira linha.
- A busca do passo 4 não achou mecanismo de comunicação entre unidades: nenhum app importa os pacotes de `packages/` (os únicos imports de `apps/*/src` são locais ou de `react`), e o `WebSocketClient` de packages/sdk/src/websocket/index.ts:2-14 fica numa biblioteca julgada `No` e sem uso.
- Os `import()` de README.md:353 e README.md:394 são exemplos de documentação, não código.
