---
schema: 1
id: 1145815182
full_name: fudoyoki/ai-portal-mfe-example
commit: f1fd5b0a988c45334a49d3992ebc84cb6ea5ae94
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 128 — fudoyoki/ai-portal-mfe-example

## Construções da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| src-remote-import | apps/shell/src/App.tsx:7 | apps/shell | dynamic-loading | Yes | `React.lazy` carrega em runtime o módulo `mfeDashboard/DashboardApp`, exposto por apps/mfe-dashboard (apps/mfe-dashboard/vite.config.ts:12-17); o remote `mfeDashboard` aponta para o `remoteEntry.js` da porta 3001 ou do CDN (apps/shell/vite.config.ts:17-23 e 30-31). Ativo: o componente é renderizado na rota `/dashboard/*` (apps/shell/src/App.tsx:167-176), `App` é montado em apps/shell/src/main.tsx:8-16. |

## Construções fora da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| manual | apps/shell/src/App.tsx:165 | apps/shell | host-relationship | Yes | A tabela de rotas do shell declara `/dashboard/*` para o remote `DashboardApp` (apps/shell/src/App.tsx:165-179); `/chat/*` e `/tools/*` só renderizam o placeholder local `ComingSoon` (apps/shell/src/App.tsx:177-178). `AppRoutes` é usado por `App` em apps/shell/src/App.tsx:184-189. |
| manual | apps/shell/src/App.tsx:172 | apps/shell | runtime-composition | Yes | Renderiza o componente remoto `DashboardApp` de apps/mfe-dashboard dentro de `MfeErrorBoundary` e `Suspense` (apps/shell/src/App.tsx:170-174), passando `user` do `AuthContext` do shell e `basePath="/dashboard"`; o componente vem do `React.lazy` em apps/shell/src/App.tsx:7. |

## Resumo

Construções com composição: 3 (dynamic-loading: 1, host-relationship: 1, runtime-composition: 1).

## Notas

- A busca do passo 4 achou, além da linha minerada, só `import('tailwindcss')` em comentários de tipo JSDoc (apps/shell/tailwind.config.js:1, apps/mfe-dashboard/tailwind.config.js:1), que não são construções de composição.
- Os remotes `mfeChat`, `mfeTools` e `mfeAdmin` estão só comentados em apps/shell/vite.config.ts:32-35, sem código no snapshot.
