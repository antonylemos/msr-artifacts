---
schema: 1
id: 1178836362
full_name: ramdev90/nx-module-federation
commit: cf42f3f1506bfe6f25a263d0763cd09cac7e84f7
inputs:
  mining:
    output: data/mining/mfe-mining-001
    version: "1"
    config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 109 — ramdev90/nx-module-federation

## Leitura do repositório

Exemplo Angular num workspace Nx, gerado em boa parte pelo scaffold da ferramenta. O build é todo feito por targets do Nx: o `package.json` da raiz não tem scripts (package.json:5), e cada projeto declara em seu `project.json` um target `build` com saída própria em `dist/<projeto>`. O shell e os três remotes (`customer`, `orders`, `products`) usam o executor `@nx/angular:webpack-browser` com configuração webpack própria, que passa a configuração de Module Federation a `withModuleFederation` (shell/project.json:9-27; shell/webpack.config.ts:1-2, 9); a configuração `production`, que é a padrão, troca para `webpack.prod.config.ts` (shell/project.json:43-45, 56). A aplicação inicial `apps/microfrontend-workspace` usa o executor comum do Angular, sem federação (apps/microfrontend-workspace/project.json:9-13). O nx.json só define cache e dependências entre builds (nx.json:13-38).

Tudo o que serve as aplicações é de desenvolvimento ou de uso local. O shell sobe com `@nx/angular:module-federation-dev-server` na porta 4200 (shell/project.json:58-63), que também levanta os remotes; cada remote tem `serve` com `@nx/angular:dev-server` numa porta própria, 4201 a 4203, dependente de `shell:serve` (products/project.json:58-74; orders/project.json:58-74; customer/project.json:58-74). Os targets `serve-static` (`@nx/web:file-server`) servem o build localmente nas mesmas portas (shell/project.json:84-91; customer/project.json:85-92). Não há Dockerfile, compose, workflow de CI, configuração de hospedagem nem script de publicação no snapshot, e o `matches.csv` não tem ocorrências `ops-*`, `ci-*` nem `cfg-public-path`. Os arquivos `webpack.prod.config.ts` deixam só como comentário do scaffold o lugar para as URLs de produção dos remotes (shell/webpack.prod.config.ts:12-21), e o remote externo de exemplo em shell/module-federation.config.ts:9 também é comentário. A pasta `dist` está no .gitignore:4.

Nenhuma aplicação tem `package.json` ou versão própria; a única versão é a do workspace, `0.0.0` (package.json:3), sem uso em publicação.

## Aplicações

| # | Aplicação | Build | Deploy | Onde é servida | Versionamento | Artefatos |
|---|---|---|---|---|---|---|
| 1 | apps/microfrontend-workspace | separado | não observado | — | No | apps/microfrontend-workspace/project.json:9-51 (target `build` com `@angular-devkit/build-angular:browser`, saída `dist/apps/microfrontend-workspace`); apps/microfrontend-workspace/project.json:74-80 (`serve-static` local) |
| 2 | customer | separado | não observado | `http://localhost:4203` em desenvolvimento (customer/project.json:62-63) | No | customer/project.json:9-27 (target `build` com `@nx/angular:webpack-browser`, saída `dist/customer`, webpack próprio); customer/project.json:43-45 (webpack de produção); customer/project.json:58-74 (`serve` de desenvolvimento); customer/project.json:85-92 (`serve-static` local) |
| 3 | orders | separado | não observado | `http://localhost:4202` em desenvolvimento (orders/project.json:62-63) | No | orders/project.json:9-27 (target `build` com `@nx/angular:webpack-browser`, saída `dist/orders`, webpack próprio); orders/project.json:43-45 (webpack de produção); orders/project.json:58-74 (`serve` de desenvolvimento); orders/project.json:85-92 (`serve-static` local) |
| 4 | products | separado | não observado | `http://localhost:4201` em desenvolvimento (products/project.json:62-63) | No | products/project.json:9-27 (target `build` com `@nx/angular:webpack-browser`, saída `dist/products`, webpack próprio); products/project.json:43-45 (webpack de produção); products/project.json:58-74 (`serve` de desenvolvimento); products/project.json:85-92 (`serve-static` local) |
| 5 | shell | separado | não observado | `http://localhost:4200` em desenvolvimento (shell/project.json:62-63) | No | shell/project.json:9-27 (target `build` com `@nx/angular:webpack-browser`, saída `dist/shell`, webpack próprio); shell/project.json:43-45 (webpack de produção); shell/project.json:58-63 (`module-federation-dev-server`); shell/project.json:84-91 (`serve-static` local) |

## Observações

**1. apps/microfrontend-workspace.** Build separado pelo target próprio, sem configuração webpack customizada nem federação (apps/microfrontend-workspace/project.json:9-24). O `serve` não fixa porta (apps/microfrontend-workspace/project.json:52-64), e o `serve-static` também não (apps/microfrontend-workspace/project.json:74-80); por isso "Onde é servida" fica `—`. Não participa da composição (revisão de composição, Resumo) e não há deploy observado.

**2. customer.** Build separado, com saída em `dist/customer` (customer/project.json:13) e as configurações webpack de desenvolvimento e produção apontadas pelo próprio projeto (customer/project.json:24-26, 43-45). Os endereços são só de desenvolvimento ou uso local: `publicHost` `http://localhost:4203` (customer/project.json:62-63) e `serve-static` na mesma porta (customer/project.json:91). O `serve` depende de `shell:serve` (customer/project.json:74), o que só afeta o ambiente de desenvolvimento. Sem deploy nem versão.

**3. orders.** Mesmo arranjo, porta 4202 (orders/project.json:62-63, 91), saída `dist/orders` (orders/project.json:13). Particularidade: o NxWelcome de orders importa o componente `ProductList` das fontes de products por caminho relativo (orders/src/app/remote-entry/nx-welcome.ts:3, 7), de modo que esse componente entra também no bundle de orders. O build de orders continua sendo dele, e products mantém o seu, por isso os dois ficam `separado`; o compartilhamento é de código-fonte em tempo de build, já registrado como relação 4 na revisão de composição.

**4. products.** Mesmo arranjo, porta 4201 (products/project.json:62-63, 91), saída `dist/products` (products/project.json:13). O componente `ProductList` também é compilado no bundle de orders (ver aplicação 3), mas products tem build e saída próprios.

**5. shell.** Build separado, saída `dist/shell` (shell/project.json:13). Os remotes são declarados só pelo nome (shell/module-federation.config.ts:17), e o build de produção não define URLs para eles: o trecho de "remote overrides for production" é só comentário (shell/webpack.prod.config.ts:12-21). Assim, o snapshot não mostra onde os remotes seriam publicados em produção. O único servidor do shell é o de desenvolvimento, que sobe os remotes junto (shell/project.json:58-63), e o `serve-static` local (shell/project.json:84-91). Sem deploy nem versão.

## Resumo

Aplicações: 5. Build (separado: 5). Deploy (não observado: 5). Versionamento independente: 0.
