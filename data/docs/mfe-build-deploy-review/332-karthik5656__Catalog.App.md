---
schema: 1
id: 1350705751
full_name: karthik5656/Catalog.App
commit: 1982e0f3dae5a8508d354f9db91a089ba96d4bd6
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

# 332 — karthik5656/Catalog.App

## Leitura do repositório

Não há workspace. O `src/frontend/package.json` só declara o pnpm como gerenciador e um script `test` de placeholder (src/frontend/package.json:6-8, 19). Cada uma das três aplicações em `src/frontend/apps/` tem manifesto, lockfile, `vite.config.ts` e script de build próprios: `tsc -noemit && vite build` no shell (src/frontend/apps/ui-catalog/package.json:8) e `tsc --noemit && vite build` nos remotos (src/frontend/apps/ui-catalog-consumer/package.json:8; src/frontend/apps/ui-catalog-merchant/package.json:8). Nenhum script da raiz dispara os builds.

Cada aplicação tem um Dockerfile próprio, idêntico nas três: um estágio `node:22-alpine` instala as dependências com pnpm e roda `pnpm run build` no diretório da aplicação (src/frontend/apps/ui-catalog/Dockerfile:1-13), e um estágio `nginx:alpine` copia o `dist` e serve na porta 80 com fallback de SPA para `/index.html` (src/frontend/apps/ui-catalog/Dockerfile:16-23; o mesmo em src/frontend/apps/ui-catalog-consumer/Dockerfile:1-23 e src/frontend/apps/ui-catalog-merchant/Dockerfile:1-23). Cada imagem contém só o build da sua aplicação.

O workflow `.github/workflows/ci-pipeline.yml` roda em eventos de pull request (.github/workflows/ci-pipeline.yml:3-5). O job `changes` usa `dorny/paths-filter` com um filtro por aplicação (.github/workflows/ci-pipeline.yml:59-64) e um filtro global para `docker/**` e `.github/workflows/**` (.github/workflows/ci-pipeline.yml:67-69). O job `publish-containers` tem um passo `docker/build-push-action` por aplicação, cada um com o diretório da aplicação como contexto, o Dockerfile dela, `push: true` e uma imagem própria no GHCR: `ui-catalog`, `ui-catalog-consumer` e `ui-catalog-merchant` (.github/workflows/ci-pipeline.yml:238-271). Cada passo só roda quando a aplicação dele mudou ou quando muda a configuração global (.github/workflows/ci-pipeline.yml:240, 252, 264). Ao fim, o job comenta no PR a lista de imagens publicadas (.github/workflows/ci-pipeline.yml:276-377). Os jobs de teste e build sem Docker estão comentados (.github/workflows/ci-pipeline.yml:74-140).

As imagens são de pré-visualização de PR. A tag é `pr<número>-<sha curto>` (.github/workflows/ci-pipeline.yml:169-171). O ramo que troca a tag por `latest` em `main`/`master` (.github/workflows/ci-pipeline.yml:175-177) não deve ser alcançado, porque o workflow só dispara em pull request; isso não foi verificado por execução. O workflow `.github/workflows/delete-merged-branch.yml` roda quando o PR fecha e apaga do GHCR as versões com tag `pr<número>` das sete imagens do repositório, entre elas as três frontend (.github/workflows/delete-merged-branch.yml:3-5, 47-57, 95-103). Não há compose, manifesto Kubernetes, proxy nem configuração de hospedagem no snapshot; a pasta `docker/` só tem um script SQL de inicialização de bancos (docker/init-scripts/01-init-databases.sql). Nada no snapshot indica como as imagens rodam juntas.

Há contradições entre o build de produção e os endereços. Os endereços dos remotos que o shell embute no build são `http://localhost:3001/assets/remoteEntry.js` e `http://localhost:3002/assets/remoteEntry.js` (src/frontend/apps/ui-catalog/remotes.json:4, 11; src/frontend/apps/ui-catalog/vite.config.ts:14-17), as portas de `server`/`preview` do Vite dos remotos (src/frontend/apps/ui-catalog-merchant/vite.config.ts:9, 12; src/frontend/apps/ui-catalog-consumer/vite.config.ts:9, 12). Nas imagens, os remotos servem na porta 80 (src/frontend/apps/ui-catalog-consumer/Dockerfile:20, 22). O shell fixa `base: '/ui-catalog/'` (src/frontend/apps/ui-catalog/vite.config.ts:75), que é a ocorrência `cfg-public-path`, mas o nginx da imagem dele serve o `dist` na raiz `/` (src/frontend/apps/ui-catalog/Dockerfile:17, 20). Sem um proxy que mapeie esses endereços, que não está no snapshot, as imagens não se compõem como estão.

Os Dockerfiles do backend .NET (src/backend/Catalog.App/Dockerfile:1, 15; src/backend/Catalog.Chat/Dockerfile:1, 15; src/backend/Catalog.Gateway/Dockerfile:1, 15; src/backend/Catalog.Rag/Dockerfile:1, 15) constroem e executam serviços de API na porta 8080 e são publicados pelos passos de backend do mesmo job (.github/workflows/ci-pipeline.yml:186-231). Não cobrem nenhuma aplicação frontend. O workflow `.github/workflows/copilot-code-review.yml` faz revisão automática de código em PR e não constrói nada.

## Aplicações

| # | Aplicação | Build | Deploy | Onde é servida | Versionamento | Artefatos |
|---|---|---|---|---|---|---|
| 1 | src/frontend/apps/ui-catalog | separado | separado | porta 80 do nginx da imagem `ghcr.io/<repositório>/ui-catalog` (src/frontend/apps/ui-catalog/Dockerfile:20, 22; .github/workflows/ci-pipeline.yml:247); `base` `/ui-catalog/` (src/frontend/apps/ui-catalog/vite.config.ts:75) | No | src/frontend/apps/ui-catalog/package.json:8 (`tsc -noemit && vite build`); src/frontend/apps/ui-catalog/vite.config.ts:74-110 (configuração própria, `base`); src/frontend/apps/ui-catalog/Dockerfile:1-23 (build com pnpm e imagem nginx própria); .github/workflows/ci-pipeline.yml:238-247 (constrói e publica a imagem `ui-catalog` no GHCR) |
| 2 | src/frontend/apps/ui-catalog-consumer | separado | separado | porta 80 do nginx da imagem `ghcr.io/<repositório>/ui-catalog-consumer` (src/frontend/apps/ui-catalog-consumer/Dockerfile:20, 22; .github/workflows/ci-pipeline.yml:259); `http://localhost:3002/assets/remoteEntry.js` no shell (src/frontend/apps/ui-catalog/remotes.json:11) | No | src/frontend/apps/ui-catalog-consumer/package.json:8 (`tsc --noemit && vite build`); src/frontend/apps/ui-catalog-consumer/vite.config.ts:7-53 (configuração própria, `remoteEntry.js`); src/frontend/apps/ui-catalog-consumer/Dockerfile:1-23 (build com pnpm e imagem nginx própria); .github/workflows/ci-pipeline.yml:250-259 (constrói e publica a imagem `ui-catalog-consumer` no GHCR) |
| 3 | src/frontend/apps/ui-catalog-merchant | separado | separado | porta 80 do nginx da imagem `ghcr.io/<repositório>/ui-catalog-merchant` (src/frontend/apps/ui-catalog-merchant/Dockerfile:20, 22; .github/workflows/ci-pipeline.yml:271); `http://localhost:3001/assets/remoteEntry.js` no shell (src/frontend/apps/ui-catalog/remotes.json:4) | No | src/frontend/apps/ui-catalog-merchant/package.json:8 (`tsc --noemit && vite build`); src/frontend/apps/ui-catalog-merchant/vite.config.ts:7-53 (configuração própria, `remoteEntry.js`); src/frontend/apps/ui-catalog-merchant/Dockerfile:1-23 (build com pnpm e imagem nginx própria); .github/workflows/ci-pipeline.yml:262-271 (constrói e publica a imagem `ui-catalog-merchant` no GHCR) |

## Observações

**1. src/frontend/apps/ui-catalog.** Build separado: script e `vite.config.ts` próprios (src/frontend/apps/ui-catalog/package.json:8; src/frontend/apps/ui-catalog/vite.config.ts:74-110), executados dentro do Dockerfile da aplicação (src/frontend/apps/ui-catalog/Dockerfile:13). O build não inclui o código dos remotos: só fixa os endereços deles, lidos de `remotes.json` (src/frontend/apps/ui-catalog/vite.config.ts:10-17, 85-89), então mudar onde um remoto é servido exige rebuildar o shell. Deploy separado: o passo próprio do CI empacota e publica só esta aplicação, numa imagem própria, e só roda quando ela ou a configuração global muda (.github/workflows/ci-pipeline.yml:238-247). O `base` `/ui-catalog/` (src/frontend/apps/ui-catalog/vite.config.ts:75) não corresponde ao nginx da imagem, que serve na raiz (src/frontend/apps/ui-catalog/Dockerfile:20); fica registrado como contradição, sem mudar a coluna. O `version: "0.0.0"` de um pacote `private` (src/frontend/apps/ui-catalog/package.json:3-4) não é usado na publicação, e a tag da imagem é a mesma de todas as imagens do PR (.github/workflows/ci-pipeline.yml:169-171, 247): Versionamento `No`.

**2. src/frontend/apps/ui-catalog-consumer.** Build separado (src/frontend/apps/ui-catalog-consumer/package.json:8; src/frontend/apps/ui-catalog-consumer/vite.config.ts:7-53), que gera o `remoteEntry.js` exposto ao shell (src/frontend/apps/ui-catalog-consumer/vite.config.ts:16-23). Deploy separado pelo passo próprio do CI, com imagem nginx própria (.github/workflows/ci-pipeline.yml:250-259; src/frontend/apps/ui-catalog-consumer/Dockerfile:1-23). O endereço que o shell usa para este remoto é o da porta de desenvolvimento e preview 3002 (src/frontend/apps/ui-catalog/remotes.json:11; src/frontend/apps/ui-catalog-consumer/vite.config.ts:9, 12), não o da imagem. O plugin que avisa o shell a cada rebuild (src/frontend/apps/ui-catalog-consumer/vite.config.ts:24-45) é ferramenta de desenvolvimento. Sem versão própria (src/frontend/apps/ui-catalog-consumer/package.json:3-4): Versionamento `No`.

**3. src/frontend/apps/ui-catalog-merchant.** Mesmo arranjo do consumer: build próprio (src/frontend/apps/ui-catalog-merchant/package.json:8; src/frontend/apps/ui-catalog-merchant/vite.config.ts:7-53), passo de CI e imagem próprios (.github/workflows/ci-pipeline.yml:262-271; src/frontend/apps/ui-catalog-merchant/Dockerfile:1-23). O `vite.config.ts` é o mesmo do consumer a não ser pela porta 3001 (src/frontend/apps/ui-catalog-merchant/vite.config.ts:9, 12), que é a do endereço no shell (src/frontend/apps/ui-catalog/remotes.json:4). O `name: "consumerApp"` repetido (src/frontend/apps/ui-catalog-merchant/vite.config.ts:17), tratado na revisão de composição, não afeta build nem deploy. Sem versão própria (src/frontend/apps/ui-catalog-merchant/package.json:3-4): Versionamento `No`.

## Resumo

Aplicações: 3. Build (separado: 3). Deploy (separado: 3). Versionamento independente: 0.
