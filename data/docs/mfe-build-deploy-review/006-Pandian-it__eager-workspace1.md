---
schema: 1
id: 1036476677
full_name: Pandian-it/eager-workspace1
commit: 9ad83c2d39d410bab0e82efdebca145ebb04adbc
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

# 006 — Pandian-it/eager-workspace1

## Leitura do repositório

Workspace Nx com Angular: quatro aplicações (`shell`, `cart`, `checkout`, `orders`) e duas bibliotecas (`shared-lib`, `shared-ui`) em `projects/`. Cada aplicação tem `project.json` com target `build` próprio e saída em `dist/<app>` (ex.: projects/cart/project.json:19-24), além de um `package.json` com versão própria (ex.: projects/cart/package.json:2-3). O `package.json` da raiz traz os scripts `nx build`/`nx serve` (package.json:8-19) e só a versão `0.0.0` do workspace (package.json:3).

O que distingue o repositório é o processo de **release por aplicação**, em três workflows do GitHub Actions:
- **User-Pull-Request.yml:** em cada PR, detecta os projetos afetados pelo Nx, constrói só esses projetos e gera um changeset `patch` para cada um (.github/workflows/User-Pull-Request.yml:43, 54, 57-70).
- **Initiate-Release.yml:** acionado à mão, cria a branch `release-*`, aplica os changesets para subir as versões dos pacotes e grava em `deployment-manifest.json` a versão de cada projeto e a release em que ela entrou (.github/workflows/Initiate-Release.yml:25-29, 51-61, 71-117).
- **Push-Event-To-Release.yml:** num push na branch de release, repete o versionamento e a atualização do manifesto quando o commit é de um desenvolvedor (.github/workflows/Push-Event-To-Release.yml:68-135). Quando o commit é do bot, constrói só as aplicações afetadas (.github/workflows/Push-Event-To-Release.yml:140-146) e publica cada uma no S3 em `apps/<app>/<versão>` (.github/workflows/Push-Event-To-Release.yml:155-165). Por fim, copia o manifesto para `manifest/<release>/` (.github/workflows/Push-Event-To-Release.yml:167).

O `deployment-manifest.json` versionado no repositório registra, por projeto, sua versão e a release em que ela entrou, inclusive para as bibliotecas (deployment-manifest.json:1-26). Checkout, orders e cart estão na release `15.0.9`, e o shell na `16.0.1`. As bibliotecas também entram no laço de publicação quando são afetadas, porque são projetos Nx.

O manifesto também liga o deploy à composição em produção. Fora de `localhost`, o shell lê `deployment-manifest.json` na própria origem e monta a URL de cada remote como `<origem com www trocado por mfe>/apps/<app>/<versão>/remoteEntry.js` (projects/shell/src/app/manifest.service.ts:28-34, 50-58). Há dois descompassos que não se resolvem no snapshot. Primeiro, o workflow publica o manifesto em `manifest/<release>/`, e não na raiz onde o shell o procura. Segundo, nada no repositório mostra o que serve o shell na raiz do domínio nem o domínio `mfe`. O arquivo cloudfront-spa-config.md só documenta páginas de erro e uma função do CloudFront para o roteamento da SPA (cloudfront-spa-config.md:1-40), e não há configuração de CloudFront no snapshot.

## Aplicações

| # | Aplicação | Build | Deploy | Onde é servida | Versionamento | Artefatos |
|---|---|---|---|---|---|---|
| 1 | projects/cart | separado | separado | `s3://static-app-601416097429/apps/cart/<versão>` (.github/workflows/Push-Event-To-Release.yml:159-162); `<origem mfe>/apps/cart/<versão>/remoteEntry.js` para o shell (projects/shell/src/app/manifest.service.ts:57-58); `http://localhost:4201` em desenvolvimento (projects/cart/project.json:79) | Yes | projects/cart/project.json:19-24 (target `build`, saída `dist/cart`); .github/workflows/Push-Event-To-Release.yml:143-145 (build por aplicação afetada); .github/workflows/Push-Event-To-Release.yml:158-162 (sync da aplicação para o caminho da sua versão); projects/cart/package.json:3 (versão `1.0.5`); deployment-manifest.json:22-25 (versão e release) |
| 2 | projects/checkout | separado | separado | `s3://static-app-601416097429/apps/checkout/<versão>` (.github/workflows/Push-Event-To-Release.yml:159-162); `<origem mfe>/apps/checkout/<versão>/remoteEntry.js` para o shell (projects/shell/src/app/manifest.service.ts:57-58); `http://localhost:4202` em desenvolvimento (projects/checkout/project.json:88) | Yes | projects/checkout/project.json:20-25 (target `build`); .github/workflows/Push-Event-To-Release.yml:143-145; .github/workflows/Push-Event-To-Release.yml:158-162; projects/checkout/package.json:3 (versão `2.0.4`); deployment-manifest.json:10-13 |
| 3 | projects/orders | separado | separado | `s3://static-app-601416097429/apps/orders/<versão>` (.github/workflows/Push-Event-To-Release.yml:159-162); `<origem mfe>/apps/orders/<versão>/remoteEntry.js` para o shell (projects/shell/src/app/manifest.service.ts:57-58); `http://localhost:4203` em desenvolvimento (projects/orders/project.json:87) | Yes | projects/orders/project.json:19-24 (target `build`); .github/workflows/Push-Event-To-Release.yml:143-145; .github/workflows/Push-Event-To-Release.yml:158-162; projects/orders/package.json:3 (versão `1.1.3`); deployment-manifest.json:14-17 |
| 4 | projects/shell | separado | separado | `s3://static-app-601416097429/apps/shell/<versão>` (.github/workflows/Push-Event-To-Release.yml:159-162); `http://localhost:4200` em desenvolvimento (projects/shell/project.json:87) | Yes | projects/shell/project.json:19-24 (target `build`); .github/workflows/Push-Event-To-Release.yml:143-145; .github/workflows/Push-Event-To-Release.yml:158-162; projects/shell/package.json:3 (versão `1.0.7`); deployment-manifest.json:18-21 |

## Observações

**1. projects/cart.** Build e deploy seguem o mesmo laço por aplicação das demais: só é construída e publicada quando o Nx a marca como afetada, e vai para um caminho com a sua versão. A versão vem do próprio package.json, sobe por changeset e é registrada no manifesto (deployment-manifest.json:22-25: `1.0.5`, release `15.0.9`). É essa versão que o shell usa para montar a URL do remote. A aplicação é `Undetermined` na revisão estrutural porque o módulo usado no bootstrap não define como iniciar a UI. Isso afeta a execução isolada, não o build nem a publicação, que são iguais às das outras.

**2. projects/checkout.** Mesmo arranjo. A versão `2.0.4` difere das demais (deployment-manifest.json:10-13), o que mostra versões que evoluem de forma independente por aplicação.

**3. projects/orders.** Mesmo arranjo, versão `1.1.3` (deployment-manifest.json:14-17).

**4. projects/shell.** É publicado pelo mesmo laço em `apps/shell/<versão>` (.github/workflows/Push-Event-To-Release.yml:158-162). O HTML do shell declara `<base href="/">` (projects/shell/src/index.html:6), e o shell busca o manifesto na raiz da origem (projects/shell/src/app/manifest.service.ts:32-33). O snapshot não mostra como essa configuração se liga à publicação num caminho versionado. Por isso "Onde é servida" registra só o caminho do S3. A versão `1.0.7` pertence a uma release diferente da dos remotes (deployment-manifest.json:18-21: release `16.0.1`).

## Resumo

Aplicações: 4. Build (separado: 4). Deploy (separado: 4). Versionamento independente: 4.
