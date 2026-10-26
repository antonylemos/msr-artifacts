---
schema: 1
id: 1384034898
full_name: horoshopodumaj/micro-frontends
commit: e1e0a52e4ce5b444ad774b3db87bfaf30cbacf05
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 164 — horoshopodumaj/micro-frontends

## Construções da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| src-remote-import | host/@mf-types/remote/apis.d.ts:3 | host | none | No | `typeof import('remote/RemoteContent')` é tipo condicional num arquivo de declaração gerado do DTS do Module Federation (host/@mf-types/index.d.ts:1-22), usado só pelo TypeScript via `paths` (host/tsconfig.json:15-17); não carrega nada em runtime. O carregamento real é o import estático em host/src/App.tsx:3 (linha manual). |
| src-mount-call | remote/src/CounterWrapper.tsx:10 | remote | runtime-composition | Yes | `counter.mount(containerRef.current)` monta, dentro de um componente React, o app Vue criado em remote/src/CounterWrapper.tsx:9 com `createApp(Counter)`; `Counter` e `createApp` vêm de `vue_remote/Counter` e `vue_remote/vue` (remote/src/CounterWrapper.tsx:2-3), expostos pela unidade vue-remote (vue-remote/module-federation.config.ts:4-7) e resolvidos pelo remote `vue_remote@http://localhost:3002/remoteEntry.js` (remote/module-federation.config.ts:5). Ativo: CounterWrapper é renderizado em remote/src/RemoteContent.tsx:10, que é exposto (remote/module-federation.config.ts:8) e renderizado por remote/src/App.tsx:9 (entrada remote/src/index.ts:1). |

## Construções fora da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| manual | host/src/App.tsx:19 | host | runtime-composition | Yes | Renderiza `<RemoteContent/>`, componente da unidade remote, na seção de conteúdo do host (host/src/App.tsx:18-20); o componente vem do import estático `remote/RemoteContent` em host/src/App.tsx:3, resolvido pelo remote `remote@http://localhost:3001/remoteEntry.js` (host/module-federation.config.ts:4) e exposto em remote/module-federation.config.ts:8. App é carregado por host/src/index.ts:1 e renderizado em host/src/App.tsx:24-25. |

## Resumo

Construções com composição: 2 (runtime-composition: 2).

## Notas

- A composição é encadeada: host renderiza `RemoteContent` da unidade remote, e esse componente monta o `Counter` Vue da unidade vue-remote. A relação completa é registrada na revisão de composição (seção 3.4.5 do protocolo).
- A desmontagem em remote/src/CounterWrapper.tsx:12 retorna `() => counter.unmount` sem chamar a função, então o cleanup não desmonta o app Vue; é passo seguinte da montagem e não virou linha.
- Os `import("./App")`/`import("./bootloader")` de host/src/index.ts:1, remote/src/index.ts:1 e vue-remote/src/index.ts:1 são internos à própria unidade e não estão no passo 4; não viraram linha.
- A busca do passo 4 não achou custom elements, iframes, `postMessage`, `CustomEvent`, `BroadcastChannel`, `loadRemote` chamado nem injeção de script; não há mecanismo de comunicação entre unidades.
