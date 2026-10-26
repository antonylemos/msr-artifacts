---
schema: 1
id: 1135167821
full_name: PedroHugo11/mf-dashboard-module-federation
commit: 184ec1b1762b6ea93f1f8f8de44118412a9ab6a8
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 123 — PedroHugo11/mf-dashboard-module-federation

## Construções da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| src-remote-import | shell/src/App.tsx:3 | shell | dynamic-loading | Yes | `React.lazy(() => import("weather/Widget"))` carrega o módulo `./Widget` exposto pela unidade mfe-weather (mfe-weather/vite.config.ts:15-18), resolvido pelo remote `weather` em shell/vite.config.ts:16; o componente é renderizado em shell/src/App.tsx:19, e App é montado por shell/src/main.tsx:5-7, entrada de shell/index.html:11. |
| src-remote-import | shell/src/App.tsx:4 | shell | dynamic-loading | Yes | `React.lazy(() => import("counter/Widget"))` carrega o módulo `./Widget` exposto pela unidade mfe-counter (mfe-counter/vite.config.ts:15-18), resolvido pelo remote `counter` em shell/vite.config.ts:17; o componente é renderizado em shell/src/App.tsx:25, e App é montado por shell/src/main.tsx:5-7, entrada de shell/index.html:11. |

## Construções fora da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| manual | shell/src/App.tsx:19 | shell | runtime-composition | Yes | Renderiza `<WeatherWidget />`, componente da unidade mfe-weather, dentro de `Suspense` + `WidgetCard` (shell/src/App.tsx:17-21); o componente vem do `React.lazy` em shell/src/App.tsx:3. |
| manual | shell/src/App.tsx:25 | shell | runtime-composition | Yes | Renderiza `<CounterWidget />`, componente da unidade mfe-counter, dentro de `Suspense` + `WidgetCard` (shell/src/App.tsx:23-27); o componente vem do `React.lazy` em shell/src/App.tsx:4. |

## Resumo

Construções com composição: 4 (dynamic-loading: 2, runtime-composition: 2).

## Notas

- Os remotes não usam `import()` internamente: `./Widget` aponta para `src/bootstrap.tsx`, que só reexporta o widget (mfe-weather/src/bootstrap.tsx:1-2, mfe-counter/src/bootstrap.tsx:1-2); os `main.tsx` dos remotes montam o widget de forma isolada (mfe-weather/src/main.tsx:4-6, mfe-counter/src/main.tsx:4-6). As buscas do passo 4 não acharam custom elements, iframes, scripts injetados nem mecanismos de comunicação.
- As URLs dos remotes são fixas em `localhost` nas portas 4173 (weather) e 4174 (counter) (shell/vite.config.ts:16-17), diferentes das portas de `server.port` dos remotes (mfe-weather/vite.config.ts:7, mfe-counter/vite.config.ts:7); elas correspondem ao `vite preview` dos remotes na ordem do README.md:65-73 (sem porta própria em `preview`), o que não muda a composição.
