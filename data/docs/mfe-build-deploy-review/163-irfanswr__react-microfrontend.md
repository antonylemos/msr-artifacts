---
schema: 1
id: 1041883313
full_name: irfanswr/react-microfrontend
commit: 00ca0bf8640b7015f760f377f76c971b11fdc95c
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

# 163 — irfanswr/react-microfrontend

## Leitura do repositório

Exemplo single-spa com três projetos irmãos e nenhum manifesto na raiz: o root config `parent-app` e as aplicações `react-child-app` (React) e `vue-child-app` (Vue 3). Cada projeto tem seu `package.json`, seu lockfile e seu próprio script de build. Os dois projetos webpack usam o mesmo par de scripts gerado pelo create-single-spa, `"build": "concurrently npm:build:*"` e `"build:webpack": "webpack --mode=production"` (parent-app/package.json:10-11; react-child-app/package.json:6-7), sobre as configurações `webpack-config-single-spa` e `webpack-config-single-spa-react` (parent-app/webpack.config.js:7-13; react-child-app/webpack.config.js:5-11). O projeto Vue compila com `vue-cli-service build` (vue-child-app/package.json:7), com o `vue-cli-plugin-single-spa` como dependência (vue-child-app/package.json:24) e um `vue.config.js` sem opção de saída (vue-child-app/vue.config.js:1-4). Nenhum script dispara os três builds juntos.

Não há artefato de deploy no snapshot: nem Dockerfile, nem compose, nem workflow de CI, nem configuração de hospedagem, e o `matches.csv` não tem ocorrências `ops-*`, `ci-*` ou `cfg-public-path`. Os únicos hooks são os `pre-commit` do husky, que rodam formatação, testes e lint (parent-app/.husky/pre-commit:4; react-child-app/.husky/pre-commit:4), sem build nem publicação. O `parent-app` declara o pacote `serve` como dependência de desenvolvimento (parent-app/package.json:32), mas nenhum script o usa.

Tudo o que o snapshot executa é de desenvolvimento: `webpack serve` nas portas 9000 e 8081 e `vue-cli-service serve` na 8082 (parent-app/package.json:4; react-child-app/package.json:4; vue-child-app/package.json:6). O import map que liga essas portas só existe no modo local (parent-app/src/index.ejs:32-42), e o import map de produção é um comentário com espaço reservado, `src="/importmap.json"` (parent-app/src/index.ejs:29-30). O README do `vue-child-app` só repete os comandos padrão do Vue CLI (vue-child-app/README.md:8-16).

## Aplicações

| # | Aplicação | Build | Deploy | Onde é servida | Versionamento | Artefatos |
|---|---|---|---|---|---|---|
| 1 | parent-app | separado | não observado | `localhost:9000`, só em desenvolvimento com `webpack serve` (parent-app/package.json:4; parent-app/src/index.ejs:36) | No | parent-app/package.json:10-11 (`concurrently npm:build:*` → `webpack --mode=production`); parent-app/webpack.config.js:7-26 (`webpack-config-single-spa`, `projectName: "root-config"`, `HtmlWebpackPlugin` com `src/index.ejs`) |
| 2 | react-child-app | separado | não observado | `http://localhost:8081`, só em desenvolvimento com `webpack serve` (react-child-app/package.json:4; parent-app/src/index.ejs:37) | No | react-child-app/package.json:6-7 (`concurrently npm:build:*` → `webpack --mode=production`); react-child-app/webpack.config.js:5-11 (`webpack-config-single-spa-react`, `projectName: "react-mfe"`, `outputSystemJS: false`) |
| 3 | vue-child-app | separado | não observado | `http://localhost:8082`, só em desenvolvimento com `vue-cli-service serve` (vue-child-app/package.json:6; parent-app/src/index.ejs:38) | No | vue-child-app/package.json:7 (`vue-cli-service build`); vue-child-app/package.json:24 (`vue-cli-plugin-single-spa`); vue-child-app/vue.config.js:1-4 (`defineConfig` sem saída configurada) |

## Observações

**1. parent-app.** Build próprio, que gera o root config e a página a partir de `src/index.ejs` (parent-app/webpack.config.js:18-25). Sem artefato de deploy. A página de produção ficaria sem as aplicações: com `isLocal` falso, o único import map ativo é o de dependências por CDN, e o de produção está comentado (parent-app/src/index.ejs:29-32). O `package.json` não tem campo `version` (parent-app/package.json:1-12).

**2. react-child-app.** Build próprio, com saída ESM em vez de SystemJS (react-child-app/webpack.config.js:10). O nome do bundle pedido pelo import map local, `frontenddevs-react-mfe.js`, corresponde a `orgName`/`projectName` (react-child-app/webpack.config.js:6-7). Há também `start:standalone` e `analyze` (react-child-app/package.json:5, 8), ambos de desenvolvimento ou diagnóstico. Sem deploy observado e sem campo `version` (react-child-app/package.json:1-16).

**3. vue-child-app.** Build próprio pelo Vue CLI. O caminho `/js/app.js` do import map local (parent-app/src/index.ejs:38) segue a saída padrão do Vue CLI, sem configuração no snapshot. O modo `standalone` (vue-child-app/package.json:9; vue-child-app/.env.standalone:1) é de desenvolvimento. A versão `0.1.0` com `private: true` (vue-child-app/package.json:3-4) não é usada em nenhuma publicação.

## Resumo

Aplicações: 3. Build (separado: 3). Deploy (não observado: 3). Versionamento independente: 0.
