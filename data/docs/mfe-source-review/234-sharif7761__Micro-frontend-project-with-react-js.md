---
schema: 1
id: 1158060733
full_name: sharif7761/Micro-frontend-project-with-react-js
commit: cb2083fd77ddcb4d6493af653e0ce523ba0be010
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 234 — sharif7761/Micro-frontend-project-with-react-js

## Construções da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| src-remote-import | core_simple/src/App.tsx:9 | core_simple | dynamic-loading | Yes | `lazy(() => import('users_simple/UserList'))` carrega em runtime o módulo exposto pela unidade users_simple (`'./UserList': './src/App.tsx'` em users_simple/rsbuild.config.ts:11-13), resolvido pelo remote `users_simple@http://localhost:3002/remoteEntry.js` (core_simple/rsbuild.config.ts:13); renderizado na rota `/users` em core_simple/src/App.tsx:59, dentro de `Suspense` (:56-61). App é montado em core_simple/src/bootstrap.tsx:5-10, carregado por core_simple/src/index.tsx:1 |
| src-async-bootstrap | core_simple/src/index.tsx:1 | core_simple | dynamic-loading | No | `import('./bootstrap')` carrega o próprio bootstrap (core_simple/src/bootstrap.tsx); interno à unidade |
| src-async-bootstrap | users_simple/src/index.tsx:1 | users_simple | dynamic-loading | No | `import('./bootstrap')` carrega o próprio bootstrap (users_simple/src/bootstrap.tsx); interno à unidade |

## Construções fora da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| manual | core_simple/src/App.tsx:15 | core_simple | runtime-composition | Yes | Renderiza `<Card>`, componente da unidade common_simple, na página `Home` do shell (core_simple/src/App.tsx:15-23); vem do import estático `common_simple/Card` em core_simple/src/App.tsx:6, resolvido pelo remote `common_simple@http://localhost:3001/remoteEntry.js` (core_simple/rsbuild.config.ts:12) e exposto em common_simple/rsbuild.config.ts:13. `Home` é o element da rota `/` (core_simple/src/App.tsx:58) |
| manual | core_simple/src/App.tsx:24 | core_simple | runtime-composition | Yes | Segunda renderização de `<Card>`, componente da unidade common_simple, na mesma página `Home` (core_simple/src/App.tsx:24-26), independente da de :15; usa o mesmo import estático `common_simple/Card` (core_simple/src/App.tsx:6) |
| manual | core_simple/src/App.tsx:57 | core_simple | host-relationship | Yes | `Routes` declara onde o shell usa a outra unidade: `/` → `Home` local e `/users` → `UserList` de users_simple (core_simple/src/App.tsx:57-60), dentro de `BrowserRouter` e `Suspense` (:46, :56); links de navegação em :49-50. App montado em core_simple/src/bootstrap.tsx:5-10 |
| manual | users_simple/src/App.tsx:40 | users_simple | runtime-composition | Yes | Renderiza `<Button>`, componente da unidade common_simple (users_simple/src/App.tsx:40-42); vem do import estático `common_simple/Button` em users_simple/src/App.tsx:3, resolvido pelo remote `common_simple@http://localhost:3001/remoteEntry.js` (users_simple/rsbuild.config.ts:15) e exposto em common_simple/rsbuild.config.ts:12. App é montado em users_simple/src/bootstrap.tsx:5-10 e também exposto como `./UserList` (users_simple/rsbuild.config.ts:12) |
| manual | users_simple/src/App.tsx:49 | users_simple | runtime-composition | Yes | Renderiza `<Card>`, componente da unidade common_simple, para cada usuário (users_simple/src/App.tsx:48-53); vem do import estático `common_simple/Card` em users_simple/src/App.tsx:5, resolvido pelo remote de users_simple/rsbuild.config.ts:15 e exposto em common_simple/rsbuild.config.ts:13 |

## Resumo

Construções com composição: 6 (dynamic-loading: 1, runtime-composition: 4, host-relationship: 1).

## Notas

- core_simple importa `common_simple/Button` (core_simple/src/App.tsx:4), mas não renderiza `<Button>` em nenhum ponto do arquivo; por isso não há linha para Button no shell.
- A busca do passo 4 só encontrou as três linhas da mineração; nenhum `public/index.html` tem `<script>` ou `<iframe>`, e não há custom elements nem mecanismo de comunicação entre unidades.
- common_simple não consome outras unidades: seu App só usa os componentes locais (common_simple/src/App.tsx:2-3).
