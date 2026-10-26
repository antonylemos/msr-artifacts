---
schema: 1
id: 1117824036
full_name: jonatasmirand/ReiBurguer-MicroFrontends
commit: 268d79ae1ff2579a9c9877adba0e1b87cfac1dff
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 209 — jonatasmirand/ReiBurguer-MicroFrontends

## Construções da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| src-remote-import | container/src/pages/index.js:5 | container | dynamic-loading | Yes | `dynamic(() => import("cardapio/Cardapio"), { ssr: false })` carrega o módulo exposto pela unidade cardapio (cardapio/next.config.js:11), resolvido pelo remote `cardapio` de container/next.config.mjs:14; `Home` é a rota `/` do Pages Router e renderiza o componente em container/src/pages/index.js:20 |
| src-remote-import | container/src/pages/index.js:6 | container | dynamic-loading | Yes | `dynamic(() => import("pedido/Pedido"), { ssr: false })` carrega o módulo exposto pela unidade pedido (pedido/next.config.mjs:13), resolvido pelo remote `pedido` de container/next.config.mjs:13; renderizado em container/src/pages/index.js:25 |
| src-cross-unit-communication | cardapio/src/components/Cardapio.jsx:6 | cardapio | communication | No | `new CustomEvent('adicionarPedido', ...)` dentro da função `adicionarPedido` (cardapio/src/components/Cardapio.jsx:5-8), que não é chamada em nenhum ponto do arquivo (o botão usa outro evento, Cardapio.jsx:31-40); nenhum arquivo de código escuta `adicionarPedido` |
| src-cross-unit-communication | cardapio/src/components/Cardapio.jsx:7 | cardapio | communication | No | `window.dispatchEvent(event)` da mesma função `adicionarPedido` não chamada (cardapio/src/components/Cardapio.jsx:5-8) |
| src-cross-unit-communication | cardapio/src/components/Cardapio.jsx:32 | cardapio | communication | Yes | `window.top.dispatchEvent(...)` no `onClick` do botão de cada prato (cardapio/src/components/Cardapio.jsx:30-43) envia `adicionarCarrinho` com nome e preço; a unidade pedido escuta o evento em pedido/src/_components/Pedido.jsx:13. `Cardapio` é o módulo exposto (cardapio/next.config.js:11) e montado no container (container/src/pages/index.js:20) |
| src-cross-unit-communication | cardapio/src/components/Cardapio.jsx:33 | cardapio | communication | Yes | `new CustomEvent("adicionarCarrinho", { detail: { nome, preco } })` (cardapio/src/components/Cardapio.jsx:33-38), o evento disparado na linha 32 e recebido pela unidade pedido em pedido/src/_components/Pedido.jsx:13 |
| src-cross-unit-communication | pedido/src/_components/Pedido.jsx:13 | pedido | communication | Yes | `window.addEventListener("adicionarCarrinho", handler)` no `useEffect` de `Pedido` (pedido/src/_components/Pedido.jsx:7-16) acrescenta `e.detail` aos itens; o evento é emitido pela unidade cardapio em cardapio/src/components/Cardapio.jsx:32-33. `Pedido` é o módulo exposto (pedido/next.config.mjs:13) e montado no container (container/src/pages/index.js:25) |

## Construções fora da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| manual | container/src/pages/index.js:20 | container | runtime-composition | Yes | Renderiza `<Cardapio />`, componente da unidade cardapio, na página `/` do container (container/src/pages/index.js:8-29); o componente vem do `dynamic` em container/src/pages/index.js:5 |
| manual | container/src/pages/index.js:25 | container | runtime-composition | Yes | Renderiza `<Pedido />`, componente da unidade pedido, dentro de `styles.section` (container/src/pages/index.js:24-26); o componente vem do `dynamic` em container/src/pages/index.js:6 |

## Resumo

Construções com composição: 7 (dynamic-loading: 2, communication: 3, runtime-composition: 2).

## Notas

- A comunicação cardapio → pedido passa pelo `window` da página do container, onde os dois módulos remotos são montados juntos; `window.top` em cardapio/src/components/Cardapio.jsx:32 é o mesmo `window` nesse caso, já que não há iframe no snapshot.
- O `README.md` da raiz reproduz trechos do código (`README.md:47-48`, `:68-70`); é documentação e não entra nas tabelas.
- A busca do passo 4 nas três unidades não encontrou `React.lazy`, `loadRemote`, `customElements`, `<iframe`, `postMessage`, `BroadcastChannel`, injeção de `<script>`, `registerApplication` nem `registerMicroApps`; os `import(` restantes são anotações de tipo JSDoc (`container/next.config.mjs:3`, `pedido/next.config.mjs:3`, `cardapio/next.config.mjs:3`).
