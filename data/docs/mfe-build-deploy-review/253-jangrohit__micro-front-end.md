---
schema: 1
id: 1176812762
full_name: jangrohit/micro-front-end
commit: c6c0dbc9fb78b8baab20e74394647ca40b521355
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

# 253 — jangrohit/micro-front-end

## Leitura do repositório

Exemplo com duas aplicações webpack 5 em `packages/`, sem workspace nem `package.json` na raiz: o host `packages/container` e o remote `packages/marketing`. Cada uma tem `package.json` próprio com `start` (`webpack serve`, só desenvolvimento) e `build` (`webpack --config config/webpack.prod.js --mode production`) (packages/container/package.json:5-6; packages/marketing/package.json:5-6), e configurações `config/webpack.{common,dev,prod}.js` próprias. A configuração de produção não define `output.path`, então cada build escreve no `dist/` padrão do próprio pacote (o README diz o mesmo, README.md:82), com `publicPath` `/container/latest/` e `/marketing/latest/` (packages/container/config/webpack.prod.js:10; packages/marketing/config/webpack.prod.js:10). Os blocos `devServer` nas portas 8080 e 8081 (packages/container/config/webpack.dev.js:7-8; packages/marketing/config/webpack.dev.js:7-9) são de desenvolvimento e não contam como deploy.

O deploy de produção está em dois workflows do GitHub Actions, um por aplicação. Cada um dispara em push na `main`/`master` só quando muda o diretório da aplicação (.github/workflows/container.yml:3-9; .github/workflows/marketing.yml:3-9), roda no diretório dela (.github/workflows/container.yml:11-13; .github/workflows/marketing.yml:11-13), instala e constrói (`npm run build`, .github/workflows/container.yml:27-31; .github/workflows/marketing.yml:27-31), sincroniza o `dist` com um prefixo próprio no bucket S3 e invalida no CloudFront o arquivo de entrada da aplicação (.github/workflows/container.yml:35-42; .github/workflows/marketing.yml:33-40). O bucket e a distribuição são os mesmos para as duas (`secrets.AWS_S3_BUCKET_NAME` e `secrets.AWS_CLOUDFRONT_DISTRIBUTION_ID`), e os valores estão fora do snapshot. O job do container passa `PRODUCTION_DOMAIN` ao build (.github/workflows/container.yml:32-33), usado para montar a URL do remote (packages/container/config/webpack.prod.js:5, 22); o domínio também é secret. Não há Dockerfile, compose nem outra configuração de hospedagem.

Contradição com a documentação: o README diz que o repositório não inclui pipeline de deploy que publique esses artefatos (README.md:104), mas os dois workflows fazem exatamente isso. Pela regra da etapa, o README não decide a coluna Deploy. `packages/auth` e `packages/dashboard` são `No` na revisão estrutural e nenhum workflow os cobre. Nenhuma das aplicações tem versionamento usado na publicação: ambas estão em `1.0.0` (packages/container/package.json:3; packages/marketing/package.json:3) e os workflows sempre publicam em `latest`.

## Aplicações

| # | Aplicação | Build | Deploy | Onde é servida | Versionamento | Artefatos |
|---|---|---|---|---|---|---|
| 1 | packages/container | separado | separado | `s3://${AWS_S3_BUCKET_NAME}/container/latest`, valor do bucket fora do snapshot (.github/workflows/container.yml:36); `/container/latest/` (packages/container/config/webpack.prod.js:10); `http://localhost:8080` em desenvolvimento (packages/container/config/webpack.dev.js:8) | No | packages/container/package.json:6 (`webpack --config config/webpack.prod.js`); packages/container/config/webpack.prod.js:6-26 (build próprio, host MF); .github/workflows/container.yml:8-13 (gatilho e diretório do container); .github/workflows/container.yml:30-33 (build com `PRODUCTION_DOMAIN`); .github/workflows/container.yml:36 (S3 sync em `/container/latest`); .github/workflows/container.yml:42 (invalida `/container/latest/index.html`) |
| 2 | packages/marketing | separado | separado | `s3://${AWS_S3_BUCKET_NAME}/marketing/latest`, valor do bucket fora do snapshot (.github/workflows/marketing.yml:34); `/marketing/latest/` (packages/marketing/config/webpack.prod.js:10); `${PRODUCTION_DOMAIN}/marketing/latest/remoteEntry.js` (packages/container/config/webpack.prod.js:22); `http://localhost:8081` em desenvolvimento (packages/marketing/config/webpack.dev.js:9) | No | packages/marketing/package.json:6 (`webpack --config config/webpack.prod.js`); packages/marketing/config/webpack.prod.js:6-27 (build próprio, gera `remoteEntry.js`); .github/workflows/marketing.yml:8-13 (gatilho e diretório do marketing); .github/workflows/marketing.yml:30-31 (build); .github/workflows/marketing.yml:34 (S3 sync em `/marketing/latest`); .github/workflows/marketing.yml:40 (invalida `/marketing/latest/remoteEntry.js`) |

## Observações

**1. packages/container.** Build próprio pela sua configuração de produção, que declara o host `container` com o remote `marketing` (packages/container/config/webpack.prod.js:19-23) e gera `index.html` a partir do template do pacote (packages/container/config/webpack.common.js:19-21). Deploy separado: o workflow `deploy-container` só roda quando muda `packages/container/**` e copia só o `dist` do container para `/container/latest` (.github/workflows/container.yml:8-9, 36). É a única aplicação cujo build depende de um valor de deploy: o endereço do remote vem de `PRODUCTION_DOMAIN` (packages/container/config/webpack.prod.js:5, 22; .github/workflows/container.yml:33), e o caminho `latest` fixo faz o host sempre carregar a última versão publicada do marketing, sem precisar ser reconstruído. Compartilha com o marketing o bucket e a distribuição CloudFront, separados só pelo prefixo. Versão `1.0.0` (packages/container/package.json:3) sem uso na publicação.

**2. packages/marketing.** Build próprio, que expõe `./MarketingApp` e emite `remoteEntry.js` (packages/marketing/config/webpack.prod.js:19-24). Deploy separado: o workflow `deploy-marketing` só roda quando muda `packages/marketing/**` e copia só o `dist` do marketing para `/marketing/latest` (.github/workflows/marketing.yml:8-9, 34), invalidando apenas o `remoteEntry.js` (:40), que é o arquivo que o host busca (packages/container/config/webpack.prod.js:22). A configuração lê `PRODUCTION_DOMAIN` (packages/marketing/config/webpack.prod.js:5), mas não o usa, e o workflow não o define. Versão `1.0.0` (packages/marketing/package.json:3) sem uso na publicação.

## Resumo

Aplicações: 2. Build (separado: 2). Deploy (separado: 2). Versionamento independente: 0.
