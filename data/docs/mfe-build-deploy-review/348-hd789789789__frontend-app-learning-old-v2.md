---
schema: 1
id: 1098656325
full_name: hd789789789/frontend-app-learning-old-v2
commit: d987aed86134f6fa2a2a79d85f72fe44cfc0e5ee
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

# 348 — hd789789789/frontend-app-learning-old-v2

## Leitura do repositório

O snapshot é uma cópia da Learning MFE da Open edX (`@edx/frontend-app-learning`, package.json:2), e a raiz `.` é a sua única aplicação. O build usa a configuração padrão do `@openedx/frontend-build`: `npm run build` chama `fedx-scripts webpack` (package.json:13), e webpack.prod.config.js:5 monta a configuração com `createConfig('webpack-prod')`. O snapshot acrescenta só a cópia de `public/static` para `dist/static` (webpack.prod.config.js:7-16) e o alias `@src` (webpack.prod.config.js:18-21). A saída padrão, o `entry` e o template HTML vêm do pacote externo, fora do snapshot. Os scripts `start` e `dev` sobem o servidor de desenvolvimento (package.json:18, :20), na porta 2000 (.env.development:34) e, no `dev`, com `PUBLIC_PATH=/learning/` e o host `apps.local.openedx.io` (package.json:20). As URLs de produção ficam vazias no `.env` (ex.: .env:8, `BASE_URL=''`; .env:14, `DISCUSSIONS_MFE_BASE_URL=''`) e são preenchidas no momento do build, fora do repositório.

A CI não publica nada. O único workflow que constrói a aplicação é o `validate.yml`, que roda `make validate.ci` em push para `master` e em pull requests (.github/workflows/validate.yml:2-8, :17). Esse alvo faz `npm ci` e `make validate` (Makefile:64-66), que confere o lockfile, extrai mensagens, roda lint, tipos, testes, `npm run build` e `bundlewatch` (Makefile:54-61). O workflow só guarda e envia o relatório de cobertura ao Codecov (.github/workflows/validate.yml:18-36); o `dist` não sai dali. Os outros workflows chamam workflows reutilizáveis da organização `openedx` para gestão de issues e rótulos (.github/workflows/add-depr-ticket-to-depr-board.yml:15; .github/workflows/add-issue-to-btr-project.yml:15; .github/workflows/add-remove-label-on-comment.yml:19; .github/workflows/self-assign-issue.yml:12), commitlint (.github/workflows/commitlint.yml:10), checagem da versão do lockfile (.github/workflows/lockfileversion-check.yml:13) e atualização semanal do Browserslist (.github/workflows/update-browserslist-db.yml:3-4, :9). Nenhum deles cobre o deploy de uma aplicação frontend.

Não há Dockerfile, compose, manifesto de deploy nem configuração de hospedagem no snapshot. O `.dockerignore` existe (.dockerignore:1-10), e o `.npmignore` lista `Dockerfile` e `docker-compose.yml` (.npmignore:5-6), mas nenhum desses arquivos está no snapshot. O `catalog-info.yaml` é metadado de catálogo Backstage (catalog-info.yaml:4-19), não deploy. O README diz só que o deploy segue o das demais MFEs da Open edX e remete à documentação externa (README.rst:128-133); o Tutor aparece ali como ambiente de desenvolvimento (README.rst:24-27). A versão `1.0.0-semantically-released` (package.json:3) e o `publishConfig` com `access: public` (package.json:28-30) seriam usados por um processo de release, mas nenhum workflow ou script do snapshot publica o pacote ou gera uma versão.

## Aplicações

| # | Aplicação | Build | Deploy | Onde é servida | Versionamento | Artefatos |
|---|---|---|---|---|---|---|
| 1 | . | separado | não observado | `http://localhost:2000` em desenvolvimento (.env.development:34; .env.development:8); `/learning/` com `apps.local.openedx.io` no script `dev` (package.json:20) | No | package.json:13 (`fedx-scripts webpack`); webpack.prod.config.js:5 (`createConfig('webpack-prod')`); webpack.prod.config.js:7-16 (copia `public/static` para `dist/static`); Makefile:54-66 (`validate.ci` roda `npm run build`); .github/workflows/validate.yml:17 (`make validate.ci` em CI, sem publicar) |

## Observações

**1. ..** Única aplicação do snapshot. Build `separado`: tem build próprio, e o código da Discussions MFE, a outra unidade da classificação, não está no repositório nem entra neste build; ela só é carregada por iframe numa URL do ambiente (revisão de composição, relação 1). Deploy `não observado`: o build roda na CI (.github/workflows/validate.yml:17; Makefile:60), mas o resultado não é publicado, e nenhum artefato do snapshot empacota ou hospeda a aplicação. Os endereços conhecidos são de desenvolvimento (.env.development:34; package.json:20). O caminho `/learning/` do script `dev` sugere onde a plataforma serve a aplicação, mas é configuração de desenvolvimento. Versionamento `No`: a versão do package.json:3 é um marcador de release semântico, e nenhum job do snapshot a usa para publicar ou liberar a aplicação.

## Resumo

Aplicações: 1. Build (separado: 1). Deploy (não observado: 1). Versionamento independente: 0.
