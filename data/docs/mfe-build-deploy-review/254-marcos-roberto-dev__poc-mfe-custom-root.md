---
schema: 1
id: 1131085284
full_name: marcos-roberto-dev/poc-mfe-custom-root
commit: 6ae6565dc49a391729b62588c5fccf37d2be104b
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

# 254 — marcos-roberto-dev/poc-mfe-custom-root

## Leitura do repositório

Prova de conceito single-spa com Vue 3 em quatro projetos independentes, sem `package.json` nem workspace na raiz. Cada projeto tem `package.json`, lockfile e configuração de build próprios. Os três projetos Vite (`content-app`, `root-app`, `topbar-app`) têm os mesmos scripts: `dev` (`vite`), `build` (`vue-tsc -b && vite build`) e `preview` (`vite preview`) (content-app/package.json:7-9; root-app/package.json:7-9; topbar-app/package.json:7-9). `root-classic`, a root config gerada pelo `create-single-spa`, constrói com webpack: `build` roda em paralelo `build:webpack` (`webpack --mode=production`) e `build:types` (`tsc`) (root-classic/package.json:10-12). Cada build escreve no `dist/` do próprio projeto, que os `.gitignore` excluem (content-app/.gitignore:11; root-app/.gitignore:11; root-classic/.gitignore:62; topbar-app/.gitignore:11).

Não há artefato de deploy no snapshot. O `matches.csv` não tem ocorrência `ops-*`, `ci-*` nem `cfg-public-path`, e não há Dockerfile, compose, workflow de CI, manifesto de deploy nem configuração de hospedagem. O único hook é o `pre-commit` do husky no `root-classic`, que só roda formatação, testes e lint (root-classic/.husky/pre-commit:4). O `serve` está nas `devDependencies` do `root-classic` (root-classic/package.json:31), mas nenhum script o usa.

Todos os endereços do snapshot são de desenvolvimento. Os import maps dos dois hosts apontam os remotos para o código-fonte servido pelo dev server do Vite, `http://127.0.0.1:5174/src/main.ts` e `http://127.0.0.1:5175/src/main.ts` (root-app/index.html:14-15; root-classic/src/index.ejs:34-35). No `root-classic`, esse mapa só é emitido com `isLocal` (root-classic/src/index.ejs:29-39), ligado pelo script `start` (`webpack serve --port 9000 --env isLocal`, root-classic/package.json:4; root-classic/webpack.config.js:21-22), e o mapa de produção está comentado (root-classic/src/index.ejs:26-27). Nenhuma `vite.config.ts` fixa porta (content-app/vite.config.ts:5-7; root-app/vite.config.ts:5-7; topbar-app/vite.config.ts:5-20). O `topbar-app` é o único remoto com build preparado para ser carregado por um host: saída `app.js` em formato SystemJS (topbar-app/vite.config.ts:8-18). O mapa SystemJS do `root-app` que apontaria para esse build em `http://127.0.0.1:4173/app.js`, a porta padrão do `vite preview`, está comentado (root-app/index.html:24-30). `root-app/src/importMap.json:3-4` e `root-app/mfe-app.json:3-4` trazem outras URLs locais (`/spa.js`, porta 5173), mas nenhum arquivo do snapshot os lê, como já registrado na revisão de composição.

Nenhum projeto tem versionamento usado para publicação. Os três projetos Vite são `"private": true` com `"version": "0.0.0"` (content-app/package.json:3-4; root-app/package.json:3-4; topbar-app/package.json:3-4), e o `root-classic` não declara `version` (root-classic/package.json:1-50).

## Aplicações

| # | Aplicação | Build | Deploy | Onde é servida | Versionamento | Artefatos |
|---|---|---|---|---|---|---|
| 1 | content-app | separado | não observado | `http://127.0.0.1:5174/src/main.ts` em desenvolvimento (root-app/index.html:14; root-classic/src/index.ejs:34) | No | content-app/package.json:8 (`vue-tsc -b && vite build`); content-app/vite.config.ts:5-7 (build Vite próprio, sem opções) |
| 2 | root-app | separado | não observado | — | No | root-app/package.json:8 (`vue-tsc -b && vite build`); root-app/vite.config.ts:5-7 (build Vite próprio, sem opções) |
| 3 | root-classic | separado | não observado | `//localhost:9000/org-root-config.js` em desenvolvimento (root-classic/package.json:4; root-classic/src/index.ejs:33) | No | root-classic/package.json:10-12 (`build` com `webpack --mode=production` e `tsc`); root-classic/webpack.config.js:5-27 (build webpack próprio com `HtmlWebpackPlugin`) |
| 4 | topbar-app | separado | não observado | `http://127.0.0.1:5175/src/main.ts` em desenvolvimento (root-app/index.html:15; root-classic/src/index.ejs:35) | No | topbar-app/package.json:8 (`vue-tsc -b && vite build`); topbar-app/vite.config.ts:8-18 (build próprio, `app.js` em formato SystemJS) |

## Observações

**1. content-app.** Build separado: o Vite constrói só este projeto, a partir do `index.html` dele, com a configuração padrão (content-app/package.json:8; content-app/vite.config.ts:5-7). O build não tem saída preparada para ser carregada por um host, como a do topbar. Os hosts só o consomem pelo dev server (root-app/index.html:14; root-classic/src/index.ejs:34), e a porta 5174 não está fixada na configuração. Deploy não observado: nenhum artefato do snapshot publica o `dist/`. Versão `0.0.0` com `"private": true` (content-app/package.json:3-4), sem uso na publicação.

**2. root-app.** Build separado, com a configuração Vite padrão (root-app/package.json:8; root-app/vite.config.ts:5-7). Os endereços dos remotos estão fixos no import map do `index.html` (root-app/index.html:11-18), então o build de produção continuaria apontando para os dev servers em `127.0.0.1`. Nenhum artefato fixa a porta ou o endereço do próprio host, por isso "Onde é servida" fica `—`. Deploy não observado. Versão `0.0.0` com `"private": true` (root-app/package.json:3-4), sem uso na publicação.

**3. root-classic.** Build separado com webpack: `webpack-config-single-spa-ts` com `orgName` `org` e `projectName` `root-config` (root-classic/webpack.config.js:7-13), mais o `HtmlWebpackPlugin` que gera a página a partir de `src/index.ejs` (root-classic/webpack.config.js:18-25), e `tsc` para os tipos em `dist` (root-classic/package.json:12; root-classic/tsconfig.json:5). A porta 9000 vem do script de desenvolvimento (root-classic/package.json:4), que é também o endereço da root config no import map local (root-classic/src/index.ejs:33). Um build de produção sai sem `isLocal` e, com o mapa de produção comentado (root-classic/src/index.ejs:27), sem endereço para nenhum remoto. Deploy não observado. Não declara `version` (root-classic/package.json:1-50).

**4. topbar-app.** Build separado, o único com configuração ajustada para microfrontend: entrada `src/main.ts`, assinaturas de exportação preservadas e saída `app.js` em formato `system` (topbar-app/vite.config.ts:8-18). Nenhum host do snapshot usa esse build: os dois carregam o topbar pelo dev server na porta 5175 (root-app/index.html:15; root-classic/src/index.ejs:35), e o mapa SystemJS que apontaria para `app.js` está comentado (root-app/index.html:24-30). Deploy não observado. Versão `0.0.0` com `"private": true` (topbar-app/package.json:3-4), sem uso na publicação.

## Resumo

Aplicações: 4. Build (separado: 4). Deploy (não observado: 4). Versionamento independente: 0.
