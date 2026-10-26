---
schema: 1
id: 1366618635
full_name: tonoizer/react-mf-patch-skew-repro
commit: 92739d5e61a09a9b31e6b53f0662f6f9e71b5e3a
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 309 — tonoizer/react-mf-patch-skew-repro

## Construções da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| src-remote-import | host/src/App.jsx:3 | host | dynamic-loading | Yes | `lazy(() => import('remote_a/App'))` carrega o `./App` exposto pela unidade remote_a (remote_a/vite.config.js:22-24), declarada como remote em host/vite.config.js:22-26 (`http://localhost:5001/remoteEntry.js`); `RemoteA` é renderizado em host/src/App.jsx:76; cadeia ativa host/index.html:9 → host/src/main.jsx:3,7 → host/src/App.jsx |
| src-remote-import | host/src/App.jsx:4 | host | dynamic-loading | Yes | `lazy(() => import('remote_b/App'))` carrega o `./App` exposto pela unidade remote_b (remote_b/vite.config.js:22-24), declarada como remote em host/vite.config.js:27-31 (`http://localhost:5002/remoteEntry.js`); `RemoteB` é renderizado em host/src/App.jsx:88; mesma cadeia de entrada de host/src/main.jsx:3,7 |
| src-remote-import | remote_a/src/App.jsx:3 | remote_a | dynamic-loading | Yes | `lazy(() => import('remote_c/App'))` carrega o `./App` exposto pela unidade remote_c (remote_c/vite.config.js:22-24), declarada como remote em remote_a/vite.config.js:26-30 (`http://localhost:5003/remoteEntry.js`); `RemoteC` é renderizado em remote_a/src/App.jsx:12; o arquivo é a entrada standalone (remote_a/src/main.jsx:3,5) e o módulo exposto `./App` (remote_a/vite.config.js:23) |

## Construções fora da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| manual | host/src/App.jsx:76 | host | runtime-composition | Yes | Renderiza `<RemoteA />`, componente da unidade remote_a, dentro de `ErrorBoundary` + `Suspense` (host/src/App.jsx:74-78); o componente vem do `lazy` em host/src/App.jsx:3; `onError={setAErr}` é callback do host para o ErrorBoundary |
| manual | host/src/App.jsx:88 | host | runtime-composition | Yes | Renderiza `<RemoteB />`, componente da unidade remote_b, dentro de `ErrorBoundary` + `Suspense` (host/src/App.jsx:86-90); o componente vem do `lazy` em host/src/App.jsx:4 |
| manual | remote_a/src/App.jsx:12 | remote_a | runtime-composition | Yes | Renderiza `<RemoteC />`, componente da unidade remote_c, dentro de `Suspense` (remote_a/src/App.jsx:11-13); o componente vem do `lazy` em remote_a/src/App.jsx:3 |

## Resumo

Construções com composição: 6 (dynamic-loading: 3, runtime-composition: 3).

## Notas

- remote_a é host aninhado: é carregado pelo host (host/src/App.jsx:3) e carrega remote_c (remote_a/src/App.jsx:3), como descrito em README.md:12.
- `ShareDump` (host/src/App.jsx:6-57) só lê globais do runtime de federação (`__mf_module_cache__`, `__FEDERATION__`) e grava `__SKEW_DUMP__` para o Playwright (host/src/App.jsx:46); não carrega nem se comunica com outra unidade, e não virou linha. O mesmo vale para `__SKEW_CRASHES__` (host/src/App.jsx:109-114).
- A busca do passo 4 não achou outra construção; `scripts/capture.mjs` não é unidade.
