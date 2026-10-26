---
schema: 1
id: 971885751
full_name: alimohammadi/micro-frontend
commit: 7a05f74105f816f60621d9ba9171b269aa8e5cab
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 106 — alimohammadi/micro-frontend

## Construções da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| src-async-bootstrap | ecomm/container/src/index.js:1 | ecomm/container | dynamic-loading | No | `import('./bootstrap')` em ecomm/container/src/index.js:1 carrega o bootstrap da própria unidade; interno. |
| src-async-bootstrap | packages/container/src/index.js:1 | packages/container | dynamic-loading | No | `import('./bootstrap')` em packages/container/src/index.js:1 carrega o bootstrap da própria unidade; interno. |
| src-async-bootstrap | packages/marketing/src/index.js:1 | packages/marketing | dynamic-loading | No | `import("./bootstrap")` em packages/marketing/src/index.js:1 carrega o bootstrap da própria unidade; interno. |
| src-mount-export | ecomm/cart/src/mount.js:26 | ecomm/cart | runtime-composition | Yes | Exporta `mount(el)` definido em ecomm/cart/src/mount.js:3-7; exposto como `./CartShow` → `./src/mount` em ecomm/cart/webpack.config.js:13-15 e consumido pelo host em ecomm/container/src/bootstrap.js:3. |
| src-mount-export | ecomm/products/src/mount.js:31 | ecomm/products | runtime-composition | Yes | Exporta `mount(el)` definido em ecomm/products/src/mount.js:5-12; exposto como `./ProductsIndex` → `./src/mount.js` em ecomm/products/webpack.config.js:13-15 e consumido pelo host em ecomm/container/src/bootstrap.js:1. |
| src-mount-export | packages/marketing/src/bootstrap.js:17 | packages/marketing | runtime-composition | Yes | Exporta `mount(el)` definido em packages/marketing/src/bootstrap.js:6-8, que renderiza o App de Marketing; exposto como `./MarketingApp` → `./src/bootstrap` em packages/marketing/config/webpack.dev.js:20-22 e consumido em packages/container/src/components/MarketingApp.js:1. |
| src-mount-call | ecomm/cart/src/mount.js:17 | ecomm/cart | runtime-composition | No | Montagem isolada de desenvolvimento no próprio elemento `#dev-cart` (ecomm/cart/src/mount.js:14-19; elemento em ecomm/cart/public/index.html:9); interna à unidade. |
| src-mount-call | ecomm/products/src/mount.js:22 | ecomm/products | runtime-composition | No | Montagem isolada de desenvolvimento no próprio elemento `#dev-products` (ecomm/products/src/mount.js:19-24; elemento em ecomm/products/public/index.html:9); interna à unidade. |
| src-mount-call | packages/container/src/components/MarketingApp.js:8 | packages/container | runtime-composition | Yes | `mount(ref.current)` monta a unidade packages/marketing no div do adaptador (packages/container/src/components/MarketingApp.js:7-11); o adaptador é renderizado pelo App do host em packages/container/src/App.js:10, montado em packages/container/src/bootstrap.js:5. |
| src-mount-import | ecomm/container/src/bootstrap.js:1 | ecomm/container | runtime-composition | Yes | Importa `mount` de `products/ProductsIndex` sob o alias `productsMount`, chamado em ecomm/container/src/bootstrap.js:5; remote `products@http://localhost:8081/remoteEntry.js` em ecomm/container/webpack.config.js:21. Alvo: ecomm/products. |
| src-mount-import | ecomm/container/src/bootstrap.js:3 | ecomm/container | runtime-composition | Yes | Importa `mount` de `carts/CartShow` sob o alias `cartMount`, chamado em ecomm/container/src/bootstrap.js:6; alias `carts` → `cart@http://localhost:8082/remoteEntry.js` em ecomm/container/webpack.config.js:22. Alvo: ecomm/cart. |
| src-mount-import | packages/container/src/components/MarketingApp.js:1 | packages/container | runtime-composition | Yes | Importa `mount` de `marketing/MarketingApp`, chamado em packages/container/src/components/MarketingApp.js:8; remote `marketing@http://localhost:8081/remoteEntry.js` em packages/container/config/webpack.dev.js:19. Alvo: packages/marketing. |

## Construções fora da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| manual | ecomm/container/src/bootstrap.js:5 | ecomm/container | runtime-composition | Yes | `productsMount(document.querySelector("#my-products"))` monta a UI de ecomm/products no elemento `#my-products` do host (ecomm/container/public/index.html:9); import remoto em ecomm/container/src/bootstrap.js:1 e entrada em ecomm/container/src/index.js:1. O alias não casou com o padrão src-mount-call. |
| manual | ecomm/container/src/bootstrap.js:6 | ecomm/container | runtime-composition | Yes | `cartMount(document.querySelector("#my-cart"))` monta a UI de ecomm/cart no elemento `#my-cart` do host (ecomm/container/public/index.html:10); import remoto em ecomm/container/src/bootstrap.js:3 e entrada em ecomm/container/src/index.js:1. O alias não casou com o padrão src-mount-call. |

## Resumo

Construções com composição: 9 (runtime-composition: 9).

## Notas

- Como na revisão final do repositório 007, as chamadas com alias (`productsMount`, `cartMount`) não casaram com `src-mount-call` e foram registradas manualmente; os mounts isolados de desenvolvimento são internos às respectivas unidades.
- `ecomm/products/src/index.js:1` e `ecomm/cart/src/index.js:1` fazem `import("./mount")`, que o padrão `src-async-bootstrap` não pegou por procurar `./bootstrap`. São `import()` de arquivo local da própria unidade, não de outra unidade, e por isso não viram linha manual.
- `packages/marketing/src/bootstrap.js:13` (`mount(devRoot)`) e `packages/container/src/bootstrap.js:5` (`ReactDom.render(<App />, "#root")`) também não casaram com `src-mount-call`; são montagens internas às próprias unidades e não entram na tabela manual.
- `<MarketingApp />` em packages/container/src/App.js:10 é o adaptador local do host, não o componente importado do remote; o consumo do remote está no próprio adaptador (linhas 1 e 8).
- A busca do passo 4 não encontrou `customElements`, `<iframe`, `postMessage`, `CustomEvent`, `BroadcastChannel`, injeção de `<script>`, `loadRemote*`, `initFederation`, `registerApplication` nem `registerMicroApps` nos arquivos de código do snapshot. A composição é inteiramente Module Federation com contrato `mount(el)`.
- O remote de produção de packages/container depende de `PRODUCTION_DOMAIN` (packages/container/config/webpack.prod.js:6,18), sem valor no snapshot; as respostas acima se apoiam nas configurações de desenvolvimento acionadas pelos scripts.
