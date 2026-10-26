---
schema: 1
id: 997062622
full_name: charger17/mfe
commit: c04d19eb237bd77ce574657d732efe265c0de531
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

# 197 — charger17/mfe

## Leitura do repositório

Quatro aplicações em `packages/` (auth, container, dashboard e marketing), sem workspace e sem `package.json` na raiz. Cada uma tem manifesto e configurações webpack próprias (`webpack.common.js`, `webpack.dev.js`, `webpack.prod.js`); não há lockfile no snapshot, porque o `.gitignore` exclui `**/package-lock.json` (.gitignore:5). O script `build` de cada aplicação usa a configuração de produção (ex.: packages/auth/package.json:6), que fixa o `publicPath` em `/<app>/latest/` (ex.: packages/auth/config/webpack.prod.js:10; packages/container/config/webpack.prod.js:12). O container recebe o domínio de produção por `PRODUCTION_DOMAIN` e monta com ele as URLs dos três remotes (packages/container/config/webpack.prod.js:6, 17-21).

O deploy é um workflow do GitHub Actions por aplicação. Cada um dispara em push na `main` quando muda a pasta da sua aplicação, ou à mão (.github/workflows/auth.yml:3-9), roda na pasta dela (.github/workflows/auth.yml:11-13), instala e constrói (.github/workflows/auth.yml:26-30) e sincroniza o `dist` com o prefixo `<app>/latest` de um bucket S3 compartilhado (.github/workflows/auth.yml:49). Depois invalida no CloudFront só o arquivo de entrada da aplicação: `remoteEntry.js` nos remotes e `index.html` no container (.github/workflows/auth.yml:52; .github/workflows/container.yml:54). Os quatro workflows são iguais, salvo o nome da aplicação; só o do container passa `PRODUCTION_DOMAIN` ao build (.github/workflows/container.yml:29-32). Bucket, distribuição e domínio vêm de segredos, então os endereços finais não estão no snapshot. Os quatro workflows publicam no mesmo bucket e na mesma distribuição, mas cada um empacota e envia só o `dist` da sua aplicação, em prefixo próprio.

Em desenvolvimento, cada aplicação roda no seu `webpack serve` (ex.: packages/auth/package.json:5), nas portas 8080 (container), 8081 (marketing), 8082 (auth) e 8083 (dashboard) (packages/container/config/webpack.dev.js:12; packages/marketing/config/webpack.dev.js:13; packages/auth/config/webpack.dev.js:13; packages/dashboard/config/webpack.dev.js:13). A única ocorrência `ops-cors` é o cabeçalho `Access-Control-Allow-Origin: '*'` do servidor de desenvolvimento do dashboard (packages/dashboard/config/webpack.dev.js:17-19), que não é artefato de deploy. Não há Dockerfile, compose nem outra configuração de hospedagem; o `readme.txt` da raiz está vazio.

## Aplicações

| # | Aplicação | Build | Deploy | Onde é servida | Versionamento | Artefatos |
|---|---|---|---|---|---|---|
| 1 | packages/auth | separado | separado | `s3://<bucket>/auth/latest`, servido em `<domínio>/auth/latest/` (.github/workflows/auth.yml:49; packages/auth/config/webpack.prod.js:10); `http://localhost:8082` em desenvolvimento (packages/auth/config/webpack.dev.js:10, 13) | No | packages/auth/package.json:6 (`webpack --config config/webpack.prod.js`); packages/auth/config/webpack.prod.js:6-21 (configuração de produção própria, gera `remoteEntry.js`); .github/workflows/auth.yml:3-13 (gatilho e diretório da aplicação); .github/workflows/auth.yml:29-30 (build); .github/workflows/auth.yml:49 (sync para o prefixo próprio); .github/workflows/auth.yml:52 (invalidação do `remoteEntry.js`) |
| 2 | packages/container | separado | separado | `s3://<bucket>/container/latest`, servido em `<domínio>/container/latest/` (.github/workflows/container.yml:51; packages/container/config/webpack.prod.js:12); `http://localhost:8080` em desenvolvimento (packages/container/config/webpack.dev.js:9, 12) | No | packages/container/package.json:6 (`webpack --config config/webpack.prod.js`); packages/container/config/webpack.prod.js:6-25 (configuração de produção com os remotes); .github/workflows/container.yml:3-13 (gatilho e diretório da aplicação); .github/workflows/container.yml:29-32 (build com `PRODUCTION_DOMAIN`); .github/workflows/container.yml:51 (sync para o prefixo próprio); .github/workflows/container.yml:54 (invalidação do `index.html`) |
| 3 | packages/dashboard | separado | separado | `s3://<bucket>/dashboard/latest`, servido em `<domínio>/dashboard/latest/` (.github/workflows/dashboard.yml:49; packages/dashboard/config/webpack.prod.js:10); `http://localhost:8083` em desenvolvimento (packages/dashboard/config/webpack.dev.js:10, 13) | No | packages/dashboard/package.json:6 (`webpack --config config/webpack.prod.js`); packages/dashboard/config/webpack.prod.js:6-21 (configuração de produção própria, gera `remoteEntry.js`); .github/workflows/dashboard.yml:3-13 (gatilho e diretório da aplicação); .github/workflows/dashboard.yml:29-30 (build); .github/workflows/dashboard.yml:49 (sync para o prefixo próprio); .github/workflows/dashboard.yml:52 (invalidação do `remoteEntry.js`) |
| 4 | packages/marketing | separado | separado | `s3://<bucket>/marketing/latest`, servido em `<domínio>/marketing/latest/` (.github/workflows/marketing.yml:49; packages/marketing/config/webpack.prod.js:10); `http://localhost:8081` em desenvolvimento (packages/marketing/config/webpack.dev.js:10, 13) | No | packages/marketing/package.json:6 (`webpack --config config/webpack.prod.js`); packages/marketing/config/webpack.prod.js:6-21 (configuração de produção própria, gera `remoteEntry.js`); .github/workflows/marketing.yml:3-13 (gatilho e diretório da aplicação); .github/workflows/marketing.yml:29-30 (build); .github/workflows/marketing.yml:49 (sync para o prefixo próprio); .github/workflows/marketing.yml:52 (invalidação do `remoteEntry.js`) |

## Observações

**1. packages/auth.** Build e deploy próprios: o workflow só roda quando muda `packages/auth/**` (.github/workflows/auth.yml:7-8) e publica só o `dist` desta aplicação no prefixo `auth/latest` (.github/workflows/auth.yml:49), o mesmo caminho que o container usa para o remote (packages/container/config/webpack.prod.js:19). O prefixo `latest` é sobrescrito a cada deploy, então não há versões coexistindo. A versão `1.0.0` (packages/auth/package.json:3) não aparece na publicação.

**2. packages/container.** Mesmo arranjo. É a única aplicação cujo build depende do ambiente de deploy: as URLs dos remotes são fixadas no build a partir de `PRODUCTION_DOMAIN` (packages/container/config/webpack.prod.js:6, 17-21), que o workflow injeta de um segredo (.github/workflows/container.yml:31-32). Como o container busca os remotes sempre em `latest`, eles podem ser republicados sem novo build do container. É também a única aplicação com página própria no build de produção, pelo `HtmlWebpackPlugin` do `webpack.common.js` (packages/container/config/webpack.common.js:19-23), o que corresponde à invalidação do `index.html` (.github/workflows/container.yml:54). Sem versão usada na publicação (packages/container/package.json:3).

**3. packages/dashboard.** Mesmo arranjo dos outros remotes, com prefixo `dashboard/latest` (.github/workflows/dashboard.yml:49), que casa com packages/container/config/webpack.prod.js:20. A aplicação é Vue, com `entry` e loaders próprios no `webpack.common.js` (packages/dashboard/config/webpack.common.js:1-4, 46), mas o processo de build e deploy é o mesmo das aplicações React. O CORS liberado vale só no servidor de desenvolvimento (packages/dashboard/config/webpack.dev.js:17-19). Sem versão usada na publicação (packages/dashboard/package.json:3).

**4. packages/marketing.** Mesmo arranjo dos outros remotes, com prefixo `marketing/latest` (.github/workflows/marketing.yml:49), que casa com packages/container/config/webpack.prod.js:18. Sem versão usada na publicação (packages/marketing/package.json:3).

## Resumo

Aplicações: 4. Build (separado: 4). Deploy (separado: 4). Versionamento independente: 0.
