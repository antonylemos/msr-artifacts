---
schema: 1
id: 175218500
full_name: ral-facilities/scigateway
commit: fadb600e1fa4c8a64daefbf8f2541998e559979c
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

# 257 — ral-facilities/scigateway

## Leitura do repositório

O repositório contém só a aplicação-mãe (`.`), uma aplicação React + Vite construída por `yarn build`, que roda `tsc` e `vite build` (package.json:57; vite.config.ts:35-54) e gera `dist/`. Os plugins que ela carrega por single-spa são construídos e publicados em outros repositórios; o host só os conhece pelo `src` de cada entrada da lista `plugins` do `settings.json` lido em runtime (public/settings.example.json:15-22). Por isso nenhum artefato deste snapshot constrói ou publica um plugin.

A forma de produção é uma imagem Docker em dois estágios: um estágio `node` instala as dependências e roda `yarn build` (Dockerfile:4, 12-23), e um estágio `httpd` copia `dist/` para o `htdocs` do Apache (Dockerfile:26-31), com reescrita de toda rota desconhecida para `index.html`, compressão e `no-cache` para `.json` e `.html` (Dockerfile:33-54), na porta 80 (Dockerfile:77). O entrypoint gera o `settings.json` a partir do `settings.example.json` com `AUTH_PROVIDER` e `AUTH_URL` quando nenhum é montado, e troca o título se `SCIGATEWAY_TITLE` for dado (docker/docker-entrypoint.sh:3-17, 19-30; Dockerfile:70-74). É nesse `settings.json`, montado ou gerado, que a instalação diz quais plugins carregar; o `.dockerignore` deixa fora da imagem todo `settings*.json` de `public/` menos o exemplo (.dockerignore:26-27).

Há três fluxos de CI no GitHub Actions e um Jenkinsfile. `docker-release-build.yml` constrói a imagem com o `Dockerfile` e a envia ao registry Harbor como `scigateway`, com tags semver tiradas da tag Git e tags de branch, a cada push em `main`, `develop` ou tag (.github/workflows/docker-release-build.yml:2-9, 30-39, 42-52). `release-build.yml` roda `yarn build`, empacota `dist/` como `scigateway-<tag>.tar.gz` e o publica numa release do GitHub, com nome `snapshot`/`snapshot-develop` nas branches e o nome da tag nas tags (.github/workflows/release-build.yml:28-29, 31-46, 56-65). `ci-build.yml` roda lint, testes unitários e e2e e depois constrói a imagem sem enviá-la (.github/workflows/ci-build.yml:11-35, 37-71). O `Jenkinsfile` só instala e roda testes unitários e e2e (Jenkinsfile:5-20). Os dois fluxos de publicação cobrem a mesma aplicação de duas formas, imagem e tarball, sem contradição entre si.

O resto é de desenvolvimento e teste. O `yarn dev` sobe o Vite na porta 3000, o servidor de autenticação simulado e o `serve-plugins.js`, que serve builds locais de plugins em portas próprias (package.json:56, 63; vite.config.ts:45-47; micro-frontend-tools/serve-plugins.js:42-43). O `yarn e2e` constrói a aplicação, sobe o servidor Express de testes na porta 3000, que serve `dist/`, o `e2e-settings.json` e o bundle compilado do plugin de demonstração em `/plugins/` (package.json:64-67; server/e2e-test-server.js:8-10, 16-25, 42), o servidor de autenticação simulado na porta 8000 (server/auth-server.js:13, 407) e um Keycloak por `docker compose` (server/keycloak/docker-compose.yml:1-12). Esse compose e o servidor de autenticação não cobrem nenhuma aplicação frontend. O `server/e2e-plugin/` é só o build copiado do repositório do plugin de demonstração (server/README.md:3-9), não um deploy do plugin.

## Aplicações

| # | Aplicação | Build | Deploy | Onde é servida | Versionamento | Artefatos |
|---|---|---|---|---|---|---|
| 1 | . | separado | separado | porta 80 da imagem `httpd`, em `/` (Dockerfile:28-31, 77); imagem `<HARBOR_URL>/scigateway` (.github/workflows/docker-release-build.yml:34); release `scigateway-<tag>.tar.gz` no GitHub (.github/workflows/release-build.yml:43-46, 60); `http://localhost:3000` no servidor e2e (server/e2e-test-server.js:22-25, 42) e em desenvolvimento (vite.config.ts:45-47) | Yes | package.json:57 (`tsc` + `vite build`); vite.config.ts:35-54 (configuração de build); Dockerfile:4-23 (estágio `builder`, `yarn build`); Dockerfile:26-31 (cópia de `dist/` para o httpd); docker/docker-entrypoint.sh:3-17 (gera `settings.json`); .github/workflows/docker-release-build.yml:30-52 (tags semver e push da imagem `scigateway` ao Harbor); .github/workflows/release-build.yml:28-65 (tarball de `dist/` publicado em release com o nome da tag); .github/workflows/ci-build.yml:62-71 (build da imagem sem push) |

## Observações

**1. ..** Build `separado`: a aplicação tem build próprio, que gera `dist/` só dela (package.json:57; Dockerfile:23). Deploy `separado`: a imagem empacota só o `dist/` do host (Dockerfile:31) e é enviada ao Harbor como `scigateway` (.github/workflows/docker-release-build.yml:34, 42-48), e o tarball da release também contém só esse `dist/` (.github/workflows/release-build.yml:45-46); os plugins não entram em nenhum dos dois, porque são carregados pelos endereços do `settings.json` (public/settings.example.json:18). Versionamento `Yes`: as duas publicações levam a versão da aplicação, tirada da tag Git, nas tags semver da imagem (.github/workflows/docker-release-build.yml:35-38) e no nome do tarball e da release (.github/workflows/release-build.yml:40, 46, 61-62). O campo `version` do `package.json` (`4.1.1`, package.json:3) não é lido por nenhum dos dois fluxos; a versão usada vem da tag. Como a aplicação é a única do repositório, a tag do repositório é a versão dela. As portas 3000 (e2e e Vite) e 5001 (`vite preview`, vite.config.ts:48-50) são de desenvolvimento e teste.

## Resumo

Aplicações: 1. Build (separado: 1). Deploy (separado: 1). Versionamento independente: 1.
