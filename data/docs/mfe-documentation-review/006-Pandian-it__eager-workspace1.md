---
schema: 1
id: 1036476677
full_name: Pandian-it/eager-workspace1
commit: 9ad83c2d39d410bab0e82efdebca145ebb04adbc
inputs:
  mining:
    output: data/mining/mfe-mining-001
    version: "1"
    config_sha256: b3f63eb6fb86d8877fda117ccc22eec936a89ff7bf2d414c1dedafc0311f1fb1
annotation:
  method: manual
  status: final
  date: 2026-10-21
---

# 006 — Pandian-it/eager-workspace1

## Leitura do repositório

A documentação em prosa quase não descreve a arquitetura. Os `.md` são de três tipos:
- **Templates do Angular CLI:** o README da raiz e os das duas bibliotecas (README.md:1-3; projects/shared-lib/README.md:1-3; projects/shared-ui/README.md:1-3).
- **Changelogs gerados pelos changesets:** um por projeto (ex.: projects/shell/CHANGELOG.md:1-40). Só registram "Auto-generated patch for affected projects", mas mostram versões que avançam de forma independente: o shell vai até 1.0.7 e o cart até 1.0.5 (projects/cart/CHANGELOG.md:3).
- **cloudfront-spa-config.md:** explica como configurar o CloudFront para o roteamento da SPA (cloudfront-spa-config.md:1-40), um detalhe de hospedagem sem configuração correspondente no snapshot. Também mostra o formato do manifesto de versões, as URLs dos remotes que ele produz e a estrutura do bucket (cloudfront-spa-config.md:49-94). Os exemplos de configuração do CloudFront e o JSON do manifesto são blocos de código e não viraram linha.

A arquitetura aparece nos comentários dos artefatos que as revisões anteriores citam:
- **Workflows de release:** passos numerados que descrevem o versionamento por changesets e o deploy das aplicações afetadas. Foram lidos `.github/workflows/Initiate-Release.yml`, `.github/workflows/Push-Event-To-Release.yml` e `.github/workflows/User-Pull-Request.yml`.
- **Configurações webpack de cada aplicação:** comentários sobre as bibliotecas compartilhadas.
- **Serviço de manifesto do shell:** comentários sobre como os remotes são resolvidos em desenvolvimento e em produção.

Sem comentários sobre a arquitetura ficaram:
- `package.json` e os `package.json` e `project.json` de cada projeto;
- `nx.json` e `deployment-manifest.json`;
- os `main.ts` e `bootstrap.ts` e o `app-routing.module.ts`;
- os manifestos em `projects/shell/public/`.

Essa documentação confere com as revisões anteriores, com duas exceções: a configuração do checkout diz compartilhar `@shared-ui` "since checkout uses it", mas o checkout não importa essa biblioteca; e o guia do CloudFront põe o shell e o manifesto na raiz do bucket, onde o workflow não os publica.

Ficaram fora da tabela, por serem detalhes de infraestrutura:
- o comentário "Derive CloudFront URL from current domain" (projects/shell/src/app/manifest.service.ts:31); o código usa a origem atual, e o CloudFront não está no snapshot;
- a parte do guia do CloudFront sobre o roteamento da SPA.

Nenhuma ocorrência `doc-*` na mineração.

## Afirmações

| # | Documento | Afirmação | Tema | Corroboração | Evidência |
|---|---|---|---|---|---|
| 1 | .github/workflows/Initiate-Release.yml:50 | "Run changesets/action to bump versions & open PR" (as versões dos pacotes sobem por changesets) | build-deploy | corroborada | 3.4.6 (Versionamento `Yes` nas quatro aplicações); .github/workflows/Initiate-Release.yml:51-61; deployment-manifest.json:1-26 |
| 2 | .github/workflows/Push-Event-To-Release.yml:137-139 | "CASE A: Bot commit → Build, Deploy apps & manifest" (constrói e publica as aplicações afetadas e o manifesto) | build-deploy | corroborada | 3.4.6 #1-#4 (deploy separado); .github/workflows/Push-Event-To-Release.yml:140-167 |
| 3 | cloudfront-spa-config.md:70-73 | "This will resolve to URLs like: `https://yourdomain.com/apps/cart/v1.0.0/remoteEntry.js` […]" (cada remote é resolvido pelo nome e pela versão do manifesto) | composição | corroborada | projects/shell/src/app/manifest.service.ts:54-58; .github/workflows/Push-Event-To-Release.yml:162 |
| 4 | cloudfront-spa-config.md:78-81 | "s3://your-bucket/ ├── index.html (shell app) ├── deployment-manifest.json ├── apps/" (o shell e o manifesto ficam na raiz do bucket, e os remotes em `apps/`) | build-deploy | contradita | 3.4.6 #4; .github/workflows/Push-Event-To-Release.yml:158-162, 167 |
| 5 | projects/cart/webpack.config.js:18 | "Explicitly share the custom shared library" (`@shared-lib` é compartilhada entre as unidades) | estrutura | corroborada | projects/cart/webpack.config.js:19-24; projects/cart/src/app/app.component.ts:3; projects/checkout/src/app/app.component.ts:2; projects/orders/src/app/app.component.ts:2; projects/shell/src/app/app.component.ts:2 |
| 6 | projects/checkout/webpack.config.js:26 | "Also share @shared-ui since checkout uses it" (o checkout usa `@shared-ui`) | estrutura | contradita | projects/checkout/src (nenhuma referência a `shared-ui`); projects/shell/src/app/app.component.ts:4 |
| 7 | projects/shell/src/app/manifest.service.ts:51-54 | "For localhost, mfe.manifest.json contains direct URLs […] For production, deployment-manifest.json contains version objects" (em produção, os remotes são resolvidos pelo manifesto de versões) | composição | corroborada | 3.4.5 #1-#3 (Configuração); projects/shell/src/app/manifest.service.ts:28-34, 50-58; deployment-manifest.json:10-25 |
| 8 | projects/shell/src/app/manifest.service.ts:62 | "Centralized method for loading remote modules" (um único método carrega todos os remotes) | composição | corroborada | 3.4.4 (projects/shell/src/app/manifest.service.ts:71-75); projects/shell/src/app/app-routing.module.ts:13, 20, 27 |

## Observações

**1. .github/workflows/Initiate-Release.yml:50.** O passo aplica os changesets, que sobem a versão de cada pacote afetado. O passo seguinte grava essas versões no `deployment-manifest.json` (.github/workflows/Initiate-Release.yml:70-117). Repetições: .github/workflows/Push-Event-To-Release.yml:66 e .github/workflows/User-Pull-Request.yml:56, que gera um changeset `patch` por projeto afetado. Os changelogs por projeto e as versões diferentes no manifesto confirmam a evolução independente das versões.

**2. .github/workflows/Push-Event-To-Release.yml:137-139.** O comentário descreve o ramo do workflow que constrói só as aplicações afetadas e publica cada uma no S3 no caminho da sua versão. Repetição: "Detect affected apps" (.github/workflows/Push-Event-To-Release.yml:47-49).

**3. cloudfront-spa-config.md:70-73.** O guia descreve as URLs que o manifesto de versões produz, `apps/<app>/<versão>/remoteEntry.js`, o mesmo formato que o shell monta (projects/shell/src/app/manifest.service.ts:54-58) e o caminho para onde o workflow publica cada aplicação (.github/workflows/Push-Event-To-Release.yml:162). O guia põe essas URLs no mesmo domínio da página. O código troca `www` por `mfe` na origem (projects/shell/src/app/manifest.service.ts:57), uma diferença de domínio que não muda o formato do caminho.

**4. cloudfront-spa-config.md:78-81.** A árvore do bucket põe o `index.html` do shell e o `deployment-manifest.json` na raiz, e os remotes em `apps/<app>/<versão>/` (cloudfront-spa-config.md:77-94). É o arranjo que o shell espera, porque busca o manifesto na raiz da origem (projects/shell/src/app/manifest.service.ts:32-33). O workflow, porém, publica o shell pelo mesmo laço dos remotes, em `apps/shell/<versão>`, e copia o manifesto para `manifest/<release>/` (.github/workflows/Push-Event-To-Release.yml:158-162, 167). O que o guia descreve para o shell e para o manifesto é desmentido pelo único artefato de publicação do snapshot; a parte dos remotes confere.

**5. projects/cart/webpack.config.js:18.** `@shared-lib` está declarada como singleton compartilhado, e as quatro aplicações importam dela o `VersionService`. Repetições: projects/checkout/webpack.config.js:18, projects/orders/webpack.config.js:18 e projects/shell/webpack.config.js:20, que fala das bibliotecas no plural.

**6. projects/checkout/webpack.config.js:26.** A configuração compartilha `@shared-ui` justificando que o checkout a usa, mas nenhum arquivo de `projects/checkout/src` a referencia. A única importação de `@shared-ui` está no shell, e ela é vazia (`import {} from '@shared-ui'`, projects/shell/src/app/app.component.ts:4). A biblioteca, portanto, não é usada de fato por duas unidades.

**7. projects/shell/src/app/manifest.service.ts:51-54.** Os comentários descrevem os dois manifestos que o código lê: em `localhost`, o `mfe.manifest.json` com URLs diretas; fora dele, o `deployment-manifest.json` com versão e release, a partir dos quais o shell monta `apps/<app>/<versão>/remoteEntry.js`. O código e o manifesto do repositório conferem. A revisão de build e deploy registra que o workflow publica o manifesto num caminho diferente do que o shell procura, mas isso não desmente o formato descrito.

**8. projects/shell/src/app/manifest.service.ts:62.** As três rotas do shell chamam o mesmo `loadRemoteModule` do serviço, que lê o manifesto antes de carregar cada remote. Repetição: projects/shell/src/app/manifest.service.ts:64.

## Resumo

Afirmações: 8 (corroborada: 6, parcial: 0, contradita: 2, sem corroboração: 0). Temas: (estrutura: 2, composição: 3, build-deploy: 3).
