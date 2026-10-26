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

## Mined constructs

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| src-remote-import | container/src/pages/index.js:5 | container | dynamic-loading | Yes | `dynamic(() => import("cardapio/Cardapio"), { ssr: false })` loads the module exposed by unit cardapio (cardapio/next.config.js:11), resolved by remote `cardapio` in container/next.config.mjs:14; `Home` is Pages Router route `/` and renders the component at container/src/pages/index.js:20 |
| src-remote-import | container/src/pages/index.js:6 | container | dynamic-loading | Yes | `dynamic(() => import("pedido/Pedido"), { ssr: false })` loads the module exposed by unit pedido (pedido/next.config.mjs:13), resolved by remote `pedido` in container/next.config.mjs:13; rendered at container/src/pages/index.js:25 |
| src-cross-unit-communication | cardapio/src/components/Cardapio.jsx:6 | cardapio | communication | No | `new CustomEvent('adicionarPedido', ...)` within function `adicionarPedido` (cardapio/src/components/Cardapio.jsx:5-8), which is never called in the file (the button uses another event, Cardapio.jsx:31-40); no code file listens for `adicionarPedido` |
| src-cross-unit-communication | cardapio/src/components/Cardapio.jsx:7 | cardapio | communication | No | `window.dispatchEvent(event)` from the same uncalled `adicionarPedido` function (cardapio/src/components/Cardapio.jsx:5-8) |
| src-cross-unit-communication | cardapio/src/components/Cardapio.jsx:32 | cardapio | communication | Yes | `window.top.dispatchEvent(...)` in each dish button’s `onClick` (cardapio/src/components/Cardapio.jsx:30-43) sends `adicionarCarrinho` with name and price; unit pedido listens for the event at pedido/src/_components/Pedido.jsx:13. `Cardapio` is the exposed module (cardapio/next.config.js:11) and is mounted in container (container/src/pages/index.js:20) |
| src-cross-unit-communication | cardapio/src/components/Cardapio.jsx:33 | cardapio | communication | Yes | `new CustomEvent("adicionarCarrinho", { detail: { nome, preco } })` (cardapio/src/components/Cardapio.jsx:33-38), the event dispatched on line 32 and received by unit pedido at pedido/src/_components/Pedido.jsx:13 |
| src-cross-unit-communication | pedido/src/_components/Pedido.jsx:13 | pedido | communication | Yes | `window.addEventListener("adicionarCarrinho", handler)` in the `useEffect` of `Pedido` (pedido/src/_components/Pedido.jsx:7-16) appends `e.detail` to the items; the event is emitted by unit cardapio at cardapio/src/components/Cardapio.jsx:32-33. `Pedido` is the exposed module (pedido/next.config.mjs:13) and is mounted in container (container/src/pages/index.js:25) |

## Constructs outside mining

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| manual | container/src/pages/index.js:20 | container | runtime-composition | Yes | Renders `<Cardapio />`, a component of unit cardapio, in the container’s `/` page (container/src/pages/index.js:8-29); the component comes from `dynamic` at container/src/pages/index.js:5 |
| manual | container/src/pages/index.js:25 | container | runtime-composition | Yes | Renders `<Pedido />`, a component of unit pedido, inside `styles.section` (container/src/pages/index.js:24-26); the component comes from `dynamic` at container/src/pages/index.js:6 |

## Summary

Constructs participating in composition: 7 (dynamic-loading: 2, communication: 3, runtime-composition: 2).

## Notes

- Communication cardapio → pedido passes through the `window` of the container page, where both remote modules are mounted together; `window.top` at cardapio/src/components/Cardapio.jsx:32 is the same `window` in this case, since there is no iframe in the snapshot.
- The root `README.md` reproduces code excerpts (`README.md:47-48`, `:68-70`); this is documentation and does not enter the tables.
- The step 4 search in the three units found no `React.lazy`, `loadRemote`, `customElements`, `<iframe`, `postMessage`, `BroadcastChannel`, `<script>` injection, `registerApplication` or `registerMicroApps`; the remaining `import(` occurrences are JSDoc type annotations (`container/next.config.mjs:3`, `pedido/next.config.mjs:3`, `cardapio/next.config.mjs:3`).
