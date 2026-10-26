---
schema: 1
id: 1080660279
full_name: pgarr/microfrontend-template
commit: 8869e1289ab5b8e758cb6a465425997296b6ca32
inputs:
  mining:
    output: data/mining/mfe-mining-001
    version: "1"
    config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-21
---

# 046 — pgarr/microfrontend-template

## Leitura do repositório

Template com o mesmo arranjo de build e deploy do repositório 017: quatro aplicações na raiz (`container`, `auth`, `dashboard` e `marketing`), sem workspace, cada uma com manifesto, lockfile e configurações webpack próprias. O `build` de cada uma usa `config/webpack.prod.js` (ex.: auth/package.json:6), que fixa `publicPath` em `/<app>/latest/` (ex.: auth/config/webpack.prod.js:10). O container monta as URLs dos remotes a partir de `PRODUCTION_DOMAIN` (container/config/webpack.prod.js:6, 17-21).

Há um workflow do GitHub Actions por aplicação. Cada um dispara só quando a pasta da aplicação muda (ex.: .github/workflows/auth.yml:2-7), roda nessa pasta (.github/workflows/auth.yml:9-11), constrói e sincroniza o `dist` com o prefixo `<app>/latest` de um bucket S3 compartilhado (.github/workflows/auth.yml:23). Depois invalida no CloudFront só a entrada da aplicação (.github/workflows/auth.yml:28; .github/workflows/container.yml:30). Os quatro workflows são iguais, salvo o nome da aplicação. Só o do container passa `PRODUCTION_DOMAIN` ao build (.github/workflows/container.yml:20-22). Diferem do repositório 017 só em detalhes, como a região da AWS vir de segredo (.github/workflows/container.yml:29). Bucket, distribuição e domínio vêm de segredos.

Em desenvolvimento, cada aplicação roda no seu `webpack serve`: container na porta 8080, marketing na 8081, auth na 8082 e dashboard na 8083 (container/config/webpack.dev.js:12; marketing/config/webpack.dev.js:13; auth/config/webpack.dev.js:13; dashboard/config/webpack.dev.js:13). O dashboard libera CORS (dashboard/config/webpack.dev.js:17-19).

## Aplicações

| # | Aplicação | Build | Deploy | Onde é servida | Versionamento | Artefatos |
|---|---|---|---|---|---|---|
| 1 | auth | separado | separado | `s3://<bucket>/auth/latest`, servido em `<domínio>/auth/latest/` (.github/workflows/auth.yml:23; auth/config/webpack.prod.js:10); `http://localhost:8082` em desenvolvimento (auth/config/webpack.dev.js:10, 13) | No | auth/package.json:6 (`webpack --config config/webpack.prod.js`); auth/config/webpack.prod.js:1-10 (configuração de produção própria); .github/workflows/auth.yml:2-11 (gatilho e diretório da aplicação); .github/workflows/auth.yml:23 (sync para o prefixo próprio); .github/workflows/auth.yml:28 (invalidação do `remoteEntry.js`) |
| 2 | container | separado | separado | `s3://<bucket>/container/latest`, servido em `<domínio>/container/latest/` (.github/workflows/container.yml:25; container/config/webpack.prod.js:12); `http://localhost:8080` em desenvolvimento (container/config/webpack.dev.js:9, 12) | No | container/package.json:6 (`webpack --config config/webpack.prod.js`); container/config/webpack.prod.js:6-21 (configuração de produção com os remotes); .github/workflows/container.yml:2-11 (gatilho e diretório da aplicação); .github/workflows/container.yml:20-22 (build com `PRODUCTION_DOMAIN`); .github/workflows/container.yml:25 (sync para o prefixo próprio); .github/workflows/container.yml:30 (invalidação do `index.html`) |
| 3 | dashboard | separado | separado | `s3://<bucket>/dashboard/latest`, servido em `<domínio>/dashboard/latest/` (.github/workflows/dashboard.yml:23; dashboard/config/webpack.prod.js:10); `http://localhost:8083` em desenvolvimento (dashboard/config/webpack.dev.js:10, 13) | No | dashboard/package.json:6 (`webpack --config config/webpack.prod.js`); dashboard/config/webpack.prod.js:1-10 (configuração de produção própria); .github/workflows/dashboard.yml:2-11 (gatilho e diretório da aplicação); .github/workflows/dashboard.yml:23 (sync para o prefixo próprio); .github/workflows/dashboard.yml:28 (invalidação do `remoteEntry.js`) |
| 4 | marketing | separado | separado | `s3://<bucket>/marketing/latest`, servido em `<domínio>/marketing/latest/` (.github/workflows/marketing.yml:23; marketing/config/webpack.prod.js:10); `http://localhost:8081` em desenvolvimento (marketing/config/webpack.dev.js:10, 13) | No | marketing/package.json:6 (`webpack --config config/webpack.prod.js`); marketing/config/webpack.prod.js:1-10 (configuração de produção própria); .github/workflows/marketing.yml:2-11 (gatilho e diretório da aplicação); .github/workflows/marketing.yml:23 (sync para o prefixo próprio); .github/workflows/marketing.yml:28 (invalidação do `remoteEntry.js`) |

## Observações

**1. auth.** Build e deploy próprios, disparados só por mudanças na pasta. O prefixo `latest` é sobrescrito a cada deploy, e a versão `1.0.0` (auth/package.json:3) não aparece na publicação.

**2. container.** Mesmo arranjo. O build depende do ambiente de deploy, porque as URLs dos remotes são fixadas com `PRODUCTION_DOMAIN` (container/config/webpack.prod.js:6, 17-21). Os remotes podem ser republicados sem rebuild do container, porque ele os busca sempre em `latest`.

**3. dashboard.** Mesmo arranjo dos outros remotes, embora seja em Vue. Sem versão usada na publicação.

**4. marketing.** Mesmo arranjo dos outros remotes. Sem versão usada na publicação.

## Resumo

Aplicações: 4. Build (separado: 4). Deploy (separado: 4). Versionamento independente: 0.
