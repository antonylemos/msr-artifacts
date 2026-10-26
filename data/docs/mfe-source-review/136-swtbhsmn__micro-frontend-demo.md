---
schema: 1
id: 1036507333
full_name: swtbhsmn/micro-frontend-demo
commit: 9cb91cec30b991952a8bb405e8362b064256a26e
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 136 — swtbhsmn/micro-frontend-demo

## Construções da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| src-remote-import | app1/src/App.jsx:2 | app1 | dynamic-loading | Yes | `React.lazy(() => import('app2/RemoteApp'))` carrega em runtime o módulo exposto pela unidade app2 (app2/webpack.config.js:31-32), resolvido pelo remote `app2@http://localhost:3002/remoteEntry.js` (app1/webpack.config.js:30-31). Ativo: app1/src/index.js:1 → app1/src/bootstrap.js:3,6 → app1/src/App.jsx:9. |
| src-async-bootstrap | app1/src/index.js:1 | app1 | dynamic-loading | No | `import('./bootstrap')` carrega um arquivo local da própria unidade (app1/src/bootstrap.js); construção interna. |
| src-async-bootstrap | app2/src/index.js:1 | app2 | dynamic-loading | No | `import('./bootstrap')` carrega um arquivo local da própria unidade (app2/src/bootstrap.js); construção interna. |

## Construções fora da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| manual | app1/src/App.jsx:9 | app1 | runtime-composition | Yes | Renderiza no host, dentro de `Suspense` (app1/src/App.jsx:8-10), o componente `RemoteApp` da unidade app2, obtido por `React.lazy` em app1/src/App.jsx:2; o componente é definido em app2/src/RemoteApp.jsx:3-5. App é renderizado em app1/src/bootstrap.js:6. |

## Resumo

Construções com composição: 2 (dynamic-loading: 1, runtime-composition: 1).

## Notas

- A busca do passo 4 não encontrou custom elements, iframes, carga de script, `postMessage`, `CustomEvent` nem `BroadcastChannel`; não há mecanismo de comunicação entre as unidades no snapshot.
- O render de `RemoteApp` em app2/src/bootstrap.js:6 é o modo isolado da própria unidade app2 e não vira linha.
