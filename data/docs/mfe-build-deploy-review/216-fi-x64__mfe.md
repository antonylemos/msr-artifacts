---
schema: 1
id: 1133729895
full_name: fi-x64/mfe
commit: fa4088ae3313734c98a027db5fccfee4db34a46d
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

# 216 — fi-x64/mfe

## Leitura do repositório

Repositório sem `package.json` na raiz e sem workspace: cada pacote em `packages/` é um projeto npm à parte, com `package.json` e `package-lock.json` próprios. As duas aplicações frontend, `packages/container` (host) e `packages/marketing` (remote), têm os mesmos scripts: `start` roda o servidor de desenvolvimento do webpack e `build` roda `webpack --config config/webpack.prod.js` (packages/container/package.json:4-7; packages/marketing/package.json:4-7). Nenhuma configuração define `output.path`, então o build sai no `dist` padrão do webpack de cada pacote, que é o diretório que os workflows publicam (.github/workflows/container.yml:26; .github/workflows/marketing.yml:24); o `.gitignore` exclui `dist` (.gitignore:2). Os `webpack.dev.js`, com portas 8080 e 8081, são de desenvolvimento e não contam como deploy (packages/marketing/config/webpack.dev.js:9-10).

A publicação de produção é por GitHub Actions para AWS S3 com CloudFront, um workflow por aplicação. Cada um é disparado por push em `main` que toque só o diretório da aplicação, roda `npm install` e `npm run build` nesse diretório e sincroniza o `dist` para um prefixo próprio do bucket, `container/latest` ou `marketing/latest`, invalidando depois no CloudFront o arquivo de entrada da aplicação: `/container/latest/index.html` ou `/marketing/latest/remoteEntry.js` (.github/workflows/container.yml:1-31; .github/workflows/marketing.yml:1-29). Os dois usam os mesmos secrets de bucket e de distribuição (.github/workflows/container.yml:26, 31; .github/workflows/marketing.yml:24, 29), ou seja, as aplicações ficam no mesmo bucket e atrás do mesmo CloudFront, mas cada uma é enviada por um job próprio, com o artefato só dela. Os `publicPath` de produção coincidem com esses prefixos (packages/container/config/webpack.prod.js:12; packages/marketing/config/webpack.prod.js:10), e o container procura o remote em `${PRODUCTION_DOMAIN}/marketing/latest/remoteEntry.js` (packages/container/config/webpack.prod.js:6, 18), com o domínio vindo de um secret no build do workflow (.github/workflows/container.yml:21-23). Os valores dos secrets não estão no snapshot. O prefixo fixo `latest` indica que cada deploy sobrescreve o anterior, sem versão no caminho.

`packages/auth` e `packages/dashboard` só têm `package.json` com o script `test` padrão e lockfile (packages/auth/package.json:4-6; packages/dashboard/package.json:4-6); não há build nem deploy para eles. Não há Dockerfile, compose nem outro artefato de deploy no snapshot.

## Aplicações

| # | Aplicação | Build | Deploy | Onde é servida | Versionamento | Artefatos |
|---|---|---|---|---|---|---|
| 1 | packages/container | separado | separado | `s3://${AWS_S3_BUCKET_NAME}/container/latest` (.github/workflows/container.yml:26); `/container/latest/` (packages/container/config/webpack.prod.js:12) | No | packages/container/package.json:6 (`webpack --config config/webpack.prod.js`); packages/container/config/webpack.prod.js:8-25 (configuração de produção, `publicPath` e remote `marketing`); packages/container/config/webpack.common.js:19-23 (gera `index.html`); .github/workflows/container.yml:1-35 (disparado por `packages/container/**`, build e `aws s3 sync` do `dist` para `container/latest`, invalidação no CloudFront) |
| 2 | packages/marketing | separado | separado | `s3://${AWS_S3_BUCKET_NAME}/marketing/latest` (.github/workflows/marketing.yml:24); `/marketing/latest/` (packages/marketing/config/webpack.prod.js:10); `${PRODUCTION_DOMAIN}/marketing/latest/remoteEntry.js`, como o container espera (packages/container/config/webpack.prod.js:18) | No | packages/marketing/package.json:6 (`webpack --config config/webpack.prod.js`); packages/marketing/config/webpack.prod.js:6-24 (configuração de produção, `publicPath` e `remoteEntry.js`); .github/workflows/marketing.yml:1-33 (disparado por `packages/marketing/**`, build e `aws s3 sync` do `dist` para `marketing/latest`, invalidação de `remoteEntry.js` no CloudFront) |

## Observações

**1. packages/container.** Build separado: script e configuração webpack próprios (packages/container/package.json:6; packages/container/config/webpack.prod.js:8-25); o código do marketing não entra no artefato, que só guarda o endereço do `remoteEntry.js` (packages/container/config/webpack.prod.js:17-19). É a única aplicação cujo build gera `index.html`, pelo `HtmlWebpackPlugin` da configuração comum (packages/container/config/webpack.common.js:19-23). Deploy separado: o workflow `deploy-container` só roda quando muda `packages/container/**` e envia só o `dist` dela para `container/latest`, invalidando `/container/latest/index.html` (.github/workflows/container.yml:7-8, 12, 26, 31). Como o domínio do remote é fixado no build pelo secret `PRODUCTION_DOMAIN` (.github/workflows/container.yml:21-23; packages/container/config/webpack.prod.js:6), mudar o domínio exige reconstruir o container, mas uma nova versão do marketing no mesmo caminho `latest` não exige. Versionamento `No`: `version: "1.0.0"` (packages/container/package.json:3), sem uso na publicação.

**2. packages/marketing.** Build separado: script e configuração webpack próprios, que geram o `remoteEntry.js` do remote `marketing` (packages/marketing/package.json:6; packages/marketing/config/webpack.prod.js:13-18). A configuração de produção não tem `HtmlWebpackPlugin`, que só aparece na de desenvolvimento (packages/marketing/config/webpack.common.js:1-17; packages/marketing/config/webpack.dev.js:24-26): em produção o marketing é publicado só como remote, e a página isolada fica para o desenvolvimento. Deploy separado: o workflow `deploy-marketing` só roda quando muda `packages/marketing/**` e envia só o `dist` dele para `marketing/latest`, invalidando `/marketing/latest/remoteEntry.js` (.github/workflows/marketing.yml:7-8, 12, 24, 29). Esse caminho é o que o container procura em produção (packages/container/config/webpack.prod.js:18). Versionamento `No`: `version: "1.0.0"` (packages/marketing/package.json:3), sem uso na publicação; o prefixo `latest` não carrega versão.

## Resumo

Aplicações: 2. Build (separado: 2). Deploy (separado: 2). Versionamento independente: 0.
