---
schema: 1
id: 1117824036
full_name: jonatasmirand/ReiBurguer-MicroFrontends
commit: 268d79ae1ff2579a9c9877adba0e1b87cfac1dff
inspection:
  output: data/inspections/mfe-dependencies-001
  version: "1"
  config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 209 — jonatasmirand/ReiBurguer-MicroFrontends

## Dependências

| Manifesto:linha | Seção | Pacote | Versão | Tecnologia | Configurada | Evidência (artefato:linha) |
|---|---|---|---|---|---|---|
| cardapio/package.json:12 | dependencies | @module-federation/nextjs-mf | ^8.8.47 | module-federation | Yes | cardapio/next.config.js:1 (`require("@module-federation/nextjs-mf")`); cardapio/next.config.js:5-18 (`new NextFederationPlugin({ name: "cardapio", ... exposes: { "./Cardapio": "./src/components/Cardapio.jsx" } })` em `webpack(config)`); cardapio/package.json:7 (`next build`, que carrega o `next.config` do diretório); container/src/pages/index.js:5 (host consome `import("cardapio/Cardapio")`) |
| container/package.json:12 | dependencies | @module-federation/nextjs-mf | ^8.8.47 | module-federation | Yes | container/next.config.mjs:1 (`import { NextFederationPlugin } from '@module-federation/nextjs-mf'`); container/next.config.mjs:7-29 (`new NextFederationPlugin({ name: 'container', remotes: { pedido, cardapio } })` em `webpack(config)`); container/package.json:7 (`next build`); container/src/pages/index.js:5-6 e :20-26 (`dynamic(() => import("cardapio/Cardapio"))` e `import("pedido/Pedido")`, montados na rota `/`) |
| pedido/package.json:12 | dependencies | @module-federation/nextjs-mf | ^8.8.47 | module-federation | Yes | pedido/next.config.mjs:1 (`import { NextFederationPlugin } from '@module-federation/nextjs-mf'`); pedido/next.config.mjs:7-29 (`new NextFederationPlugin({ name: 'pedido', exposes: { './Pedido': './src/_components/Pedido.jsx' } })` em `webpack(config)`); pedido/package.json:7 (`next build`); container/src/pages/index.js:6 (host consome `import("pedido/Pedido")`) |

## Notas

- `cardapio` tem dois arquivos de configuração que importam o pacote. `cardapio/next.config.js:11` expõe `./src/components/Cardapio.jsx`, que existe; `cardapio/next.config.mjs:13` expõe `./src/_components/Cardapio.jsx`, ausente do snapshot. Pela ordem de busca do Next 14, `next.config.js` tem precedência, como já registra a classificação. Qualquer que seja o arquivo carregado, o plugin do pacote é invocado; a contradição afeta o caminho exposto, não o uso do pacote, por isso a linha ficou `Yes`.
- A busca fora das listas (`grep -rn "module-federation"` em `*.js`, `*.jsx`, `*.mjs`, `*.json`, sem lockfiles) só encontra os três `package.json:12` e os quatro `next.config` já listados. Os imports `cardapio/Cardapio` e `pedido/Pedido` do host são nomes de remotos resolvidos pelo plugin, não imports do pacote.
- Os scripts `dev` (`<app>/package.json:6`) definem `NEXT_PRIVATE_LOCAL_WEBPACK=true`; menção em script não foi contada como uso.
