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

## Workspace

Nenhuma declaração de workspace.

## Unidades

| Diretório | Marcadores | Manifesto | Entrada | Build | Workspace | Deploy | Unidade frontend | Motivo |
|---|---|---|---|---|---|---|---|---|
| cart | cart/package.json;cart/webpack.config.js | cart/package.json:1-20 (pacote próprio `cart`) | cart/src/index.js:4 (entrada convencional webpack, `import("./bootstrap")`); cart/src/bootstrap.js:8-13 (monta a UI em `#dev-cart`); cart/webpack.config.js:24-26 (template `./public/index.html`) | cart/webpack.config.js:4-28 (configuração própria, porta 8082); cart/package.json:7 (`webpack serve`) | — | — | Yes | Aplicação JavaScript com entrada e configuração webpack próprias, servida isoladamente. |
| container | container/package.json;container/webpack.config.js | container/package.json:1-19 (pacote próprio `container`) | container/src/index.js:2 (entrada convencional webpack, `import("./bootstrap")`); container/src/bootstrap.js:6-7 (monta os remotes em `#my-products` e `#my-cart`); container/webpack.config.js:17-19 (template `./public/index.html`) | container/webpack.config.js:4-21 (configuração própria, porta 8080); container/package.json:7 (`webpack serve`) | — | — | Yes | Aplicação JavaScript com entrada e configuração webpack próprias. |
| products | products/package.json;products/webpack.config.js | products/package.json:1-20 (pacote próprio `products`) | products/src/index.js:4 (entrada convencional webpack, `import("./bootstrap")`); products/src/bootstrap.js:17-25 (monta a UI em `#dev-products`); products/webpack.config.js:25-27 (template `./public/index.html`) | products/webpack.config.js:4-29 (configuração própria, porta 8081); products/package.json:7 (`webpack serve`) | — | — | Yes | Aplicação JavaScript com entrada e configuração webpack próprias, servida isoladamente. |

## Resumo

Aplicações frontend no snapshot: 3 (cart, container, products).

## Notas

- Nenhum `webpack.config.js` declara `entry`; vale a entrada padrão do webpack, `src/index.js`, presente nos três diretórios.
- Os três `package.json` só têm o script `start` (`webpack serve`) e os três configs usam `mode: "development"` (`:5`); não há script `build` nem deploy. Conta como build próprio, como nos exemplos equivalentes do piloto.
- O `artifacts.csv` marca os três `package.json` como `workspace-config`, mas nenhum declara `workspaces` e o `matches.csv` não tem ocorrência `ws-*`, `ops-*` ou `ci-*`.
- N = 3 coincide com `frontend_units: 3` da classificação.
