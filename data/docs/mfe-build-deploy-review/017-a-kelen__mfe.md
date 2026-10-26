---
schema: 1
id: 1007785611
full_name: a-kelen/mfe
commit: 80e4481f9b927142d2c57f4c2787da93ad01b54e
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

# 017 — a-kelen/mfe

## Leitura do repositório

Quatro aplicações em `packages/` (container, auth, dashboard e marketing), sem workspace e sem `package.json` na raiz. Cada uma tem manifesto, lockfile e configurações webpack próprias (`webpack.common.js`, `webpack.dev.js` e `webpack.prod.js`). O script `build` de cada uma usa a configuração de produção (ex.: packages/auth/package.json:6), que fixa um `publicPath` em `/<app>/latest/` (ex.: packages/auth/config/webpack.prod.js:10). O container recebe o domínio de produção por `PRODUCTION_DOMAIN` e monta com ele as URLs dos três remotes (packages/container/config/webpack.prod.js:6, 17-21).

O deploy é **um workflow do GitHub Actions por aplicação**. Cada workflow dispara só quando muda a pasta da sua aplicação (ex.: .github/workflows/auth.yml:3-8), roda na pasta dela (.github/workflows/auth.yml:10-12), instala e constrói, e sincroniza o `dist` com o prefixo `<app>/latest` de um bucket S3 compartilhado (.github/workflows/auth.yml:26). Depois invalida no CloudFront só o arquivo de entrada da aplicação: `remoteEntry.js` nos remotes e `index.html` no container (.github/workflows/auth.yml:32; .github/workflows/container.yml:34). Os quatro workflows são iguais, salvo o nome da aplicação. O do container passa `PRODUCTION_DOMAIN` ao build (.github/workflows/container.yml:22-25). Bucket, distribuição e domínio vêm de segredos, então os endereços finais não estão no snapshot.

Em desenvolvimento, cada aplicação roda no seu `webpack serve`, nas portas 8080 (container), 8081 (marketing), 8082 (auth) e 8084 (dashboard) (packages/container/config/webpack.dev.js:12; packages/marketing/config/webpack.dev.js:12; packages/auth/config/webpack.dev.js:12; packages/dashboard/config/webpack.dev.js:12). O dashboard libera CORS no servidor de desenvolvimento (packages/dashboard/config/webpack.dev.js:16-18).

## Aplicações

| # | Aplicação | Build | Deploy | Onde é servida | Versionamento | Artefatos |
|---|---|---|---|---|---|---|
| 1 | packages/auth | separado | separado | `s3://<bucket>/auth/latest`, servido em `<domínio>/auth/latest/` (.github/workflows/auth.yml:26; packages/auth/config/webpack.prod.js:10); `http://localhost:8082` em desenvolvimento (packages/auth/config/webpack.dev.js:9, 12) | No | packages/auth/package.json:6 (`webpack --config config/webpack.prod.js`); packages/auth/config/webpack.prod.js:1-10 (configuração de produção própria); .github/workflows/auth.yml:3-12 (gatilho e diretório da aplicação); .github/workflows/auth.yml:26 (sync para o prefixo próprio); .github/workflows/auth.yml:32 (invalidação do `remoteEntry.js`) |
| 2 | packages/container | separado | separado | `s3://<bucket>/container/latest`, servido em `<domínio>/container/latest/` (.github/workflows/container.yml:28; packages/container/config/webpack.prod.js:12); `http://localhost:8080` em desenvolvimento (packages/container/config/webpack.dev.js:9, 12) | No | packages/container/package.json:6 (`webpack --config ./config/webpack.prod.js`); packages/container/config/webpack.prod.js:1-27 (configuração de produção com os remotes); .github/workflows/container.yml:3-12 (gatilho e diretório da aplicação); .github/workflows/container.yml:22-25 (build com `PRODUCTION_DOMAIN`); .github/workflows/container.yml:28 (sync para o prefixo próprio); .github/workflows/container.yml:34 (invalidação do `index.html`) |
| 3 | packages/dashboard | separado | separado | `s3://<bucket>/dashboard/latest`, servido em `<domínio>/dashboard/latest/` (.github/workflows/dashboard.yml:26; packages/dashboard/config/webpack.prod.js:10); `http://localhost:8084` em desenvolvimento (packages/dashboard/config/webpack.dev.js:9, 12) | No | packages/dashboard/package.json:6 (`webpack --config config/webpack.prod.js`); packages/dashboard/config/webpack.prod.js:1-10 (configuração de produção própria); .github/workflows/dashboard.yml:3-12 (gatilho e diretório da aplicação); .github/workflows/dashboard.yml:26 (sync para o prefixo próprio); .github/workflows/dashboard.yml:32 (invalidação do `remoteEntry.js`) |
| 4 | packages/marketing | separado | separado | `s3://<bucket>/marketing/latest`, servido em `<domínio>/marketing/latest/` (.github/workflows/marketing.yml:26; packages/marketing/config/webpack.prod.js:10); `http://localhost:8081` em desenvolvimento (packages/marketing/config/webpack.dev.js:9, 12) | No | packages/marketing/package.json:6 (`webpack --config ./config/webpack.prod.js`); packages/marketing/config/webpack.prod.js:1-10 (configuração de produção própria); .github/workflows/marketing.yml:3-12 (gatilho e diretório da aplicação); .github/workflows/marketing.yml:26 (sync para o prefixo próprio); .github/workflows/marketing.yml:32 (invalidação do `remoteEntry.js`) |

## Observações

**1. packages/auth.** Build e deploy próprios: o workflow só roda quando a pasta muda e publica só o `dist` desta aplicação. O prefixo `latest` é sobrescrito a cada deploy, então não há versões coexistindo. A versão `1.0.0` do package.json (packages/auth/package.json:3) não aparece na publicação.

**2. packages/container.** Mesmo arranjo. É a única aplicação cujo build depende do ambiente de deploy, porque as URLs dos remotes são fixadas no build a partir de `PRODUCTION_DOMAIN` (packages/container/config/webpack.prod.js:6, 17-21). Os remotes podem ser republicados sem rebuild do container, porque ele os busca sempre no caminho `latest`. A invalidação do `index.html` corresponde ao fato de o container ser a página de entrada.

**3. packages/dashboard.** Mesmo arranjo dos outros remotes. O dashboard é em Vue, mas o processo de build e deploy é o mesmo das aplicações React. Sem versão usada na publicação.

**4. packages/marketing.** Mesmo arranjo dos outros remotes. Sem versão usada na publicação.

## Resumo

Aplicações: 4. Build (separado: 4). Deploy (separado: 4). Versionamento independente: 0.
