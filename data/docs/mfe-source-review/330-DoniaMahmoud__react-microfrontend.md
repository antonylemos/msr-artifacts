---
schema: 1
id: 1147094315
full_name: DoniaMahmoud/react-microfrontend
commit: adc0ef9de42ce63b3082f8297d0146b59ac0d612
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 330 — DoniaMahmoud/react-microfrontend

## Construções da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| src-async-bootstrap | cart/src/index.js:4 | cart | dynamic-loading | No | `import("./bootstrap")` carrega o bootstrap da própria unidade (cart/src/bootstrap.js); interno à unidade. |
| src-async-bootstrap | container/src/index.js:2 | container | dynamic-loading | No | `import("./bootstrap")` carrega o bootstrap da própria unidade (container/src/bootstrap.js); interno à unidade. |
| src-async-bootstrap | products/src/index.js:4 | products | dynamic-loading | No | `import("./bootstrap")` carrega o bootstrap da própria unidade (products/src/bootstrap.js); interno à unidade. |
| src-mount-export | cart/src/bootstrap.js:15 | cart | runtime-composition | Yes | Exporta `mount(el)`, definido em cart/src/bootstrap.js:3-6, que escreve a UI do carrinho em `el.innerHTML`; o módulo é exposto como `./CartShow` em cart/webpack.config.js:13-14 e consumido pelo container em container/src/bootstrap.js:2 e :7. |
| src-mount-export | products/src/bootstrap.js:26 | products | runtime-composition | Yes | Exporta `mount(el)`, definido em products/src/bootstrap.js:4-13, que escreve a lista de produtos em `el.innerHTML`; o módulo é exposto como `./ProductsIndex` em products/webpack.config.js:13-14 e consumido pelo container em container/src/bootstrap.js:1 e :6. |
| src-mount-call | cart/src/bootstrap.js:11 | cart | runtime-composition | No | cart/src/bootstrap.js:8-13 chama `mount` no próprio elemento `#dev-cart` (cart/public/index.html:4), só em desenvolvimento isolado; montagem interna à unidade cart. |
| src-mount-call | products/src/bootstrap.js:23 | products | runtime-composition | No | products/src/bootstrap.js:17-25 chama `mount` no próprio elemento `#dev-products` (products/public/index.html:5), só em desenvolvimento isolado; montagem interna à unidade products. |
| src-mount-import | container/src/bootstrap.js:1 | container | runtime-composition | Yes | Importa `mount` de `products/ProductsIndex` sob o alias `mountProducts`, chamado em container/src/bootstrap.js:6; o remote `products` aponta para `http://localhost:8081/remoteEntry.js` (container/webpack.config.js:13) e o bootstrap é carregado por container/src/index.js:2. |
| src-mount-import | container/src/bootstrap.js:2 | container | runtime-composition | Yes | Importa `mount` de `cart/CartShow` sob o alias `mountCart`, chamado em container/src/bootstrap.js:7; o remote `cart` aponta para `http://localhost:8082/remoteEntry.js` (container/webpack.config.js:14) e o bootstrap é carregado por container/src/index.js:2. |

## Construções fora da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| manual | container/src/bootstrap.js:6 | container | runtime-composition | Yes | `mountProducts(document.querySelector("#my-products"))` monta a UI da unidade products no elemento `#my-products` do container (container/public/index.html:5); import remoto em container/src/bootstrap.js:1 e entrada em container/src/index.js:2. |
| manual | container/src/bootstrap.js:7 | container | runtime-composition | Yes | `mountCart(document.querySelector("#my-cart"))` monta a UI da unidade cart no elemento `#my-cart` do container (container/public/index.html:6); import remoto em container/src/bootstrap.js:2 e entrada em container/src/index.js:2. |

## Resumo

Construções com composição: 6 (runtime-composition: 6).

## Notas

- O padrão `src-mount-call` pegou só as montagens isoladas de desenvolvimento (cart/src/bootstrap.js:11; products/src/bootstrap.js:23), não as chamadas com alias do container (container/src/bootstrap.js:6-7), registradas como linhas manuais.
- A busca do passo 4 não achou `customElements`, `<iframe`, `postMessage`, `CustomEvent`, `BroadcastChannel` nem carga de script nos arquivos de código das três unidades.
