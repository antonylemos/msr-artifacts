---
schema: 1
id: 1161566940
full_name: coolsamson7/novx
commit: 128ba9a0f9f373210c09948a19bd1b59d9c7673f
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

# 039 — coolsamson7/novx

## Leitura do repositório

Monorepo Nx com workspace pnpm (pnpm-workspace.yaml:1-3) de um framework de portal React: quatro bibliotecas em `libs/` e um app de referência com o shell `apps/app` e o remote `apps/microfrontend`. Cada app tem projeto Nx com target `build` próprio, pelo executor `@nx/webpack:webpack` e com o seu `webpack.config.js` (apps/app/project.json:14-38; apps/microfrontend/project.json:14-23); os `package.json` dos apps só delegam ao nx (apps/app/package.json:6; apps/microfrontend/package.json:6). A raiz dispara o build de todos os projetos com `nx run-many --target=build --all` (package.json:8), mas cada projeto gera a sua própria saída (apps/app/webpack.config.js:19; apps/microfrontend/webpack.config.js:27).

Há dois workflows do GitHub Actions. O de CI roda lint, teste e build de todos os projetos em push e pull request (.github/workflows/ci.yml:3-7, :33) e não publica nada. O de documentação, em push para `main`, constrói só `apps/app` em produção com `PUBLIC_URL: /novx/sample/` (.github/workflows/docs.yml:34-37), gera a documentação typedoc das libs em `dist/docs` (.github/workflows/docs.yml:45-46; typedoc.json:2-10), copia `dist/apps/app` para `dist/docs/sample` (.github/workflows/docs.yml:48-52) e publica essa pasta no GitHub Pages (.github/workflows/docs.yml:54-57, :59-69). É o único deploy de frontend do snapshot, e só cobre o shell. O `PUBLIC_URL` vira o `publicPath` do shell (apps/app/webpack.config.js:20). O script `deploy` da raiz (`pnpm build:site && gh-pages -d dist/apps/app`, package.json:11) chama um `build:site` que não existe nos scripts (package.json:6-12), então não funciona como está.

O que vai para o Pages não carrega o remote: a configuração do shell aponta o remote para `http://localhost:3001` no código (apps/app/src/environments/environments.ts:8) e no `remotes` do webpack (apps/app/webpack.config.js:83), e nada no snapshot publica `apps/microfrontend`. O remote só é servido pelo dev server na porta 3001, com `public/` como estático, onde fica o `manifest.json` que o shell busca (apps/microfrontend/webpack.config.js:17-21). As ocorrências `ops-cors` são cabeçalhos `Access-Control-Allow-Origin: *` dos dev servers (apps/app/webpack.config.js:119; apps/microfrontend/webpack.config.js:22-24), configuração de desenvolvimento. O `publicPath: 'auto'` do remote (apps/microfrontend/webpack.config.js:28) é a outra ocorrência `cfg-public-path`.

As libs têm um fluxo de publicação próprio, que não cobre nenhum app: `release.sh` constrói uma lib, troca `workspace:*` pelas versões reais e roda `pnpm publish dist/libs/$LIB` (release.sh:5, :8-22, :25), e o Nx declara release independente só para `libs/*` (nx.json:23-29, :37-42). Há também a configuração de um registry local Verdaccio (.verdaccio/config.yml:1-28) e um `PUBLISH.TXT` com `npm version patch` e push de tags. Não há Dockerfile, compose nem configuração de servidor.

## Aplicações

| # | Aplicação | Build | Deploy | Onde é servida | Versionamento | Artefatos |
|---|---|---|---|---|---|---|
| 1 | apps/app | separado | separado | `/novx/sample/` no GitHub Pages (.github/workflows/docs.yml:37, :50-51); `http://localhost:3000` (apps/app/project.json:43-44) | No | apps/app/project.json:14-38 (target `build` próprio, saída `dist/apps/app`); apps/app/webpack.config.js:18-23 (saída e `publicPath` por `PUBLIC_URL`); .github/workflows/docs.yml:34-37 (build só do app em produção); .github/workflows/docs.yml:48-57 (copia para `dist/docs/sample` e envia o artefato do Pages); .github/workflows/docs.yml:59-69 (`deploy-pages`) |
| 2 | apps/microfrontend | separado | não observado | `http://localhost:3001` (apps/microfrontend/webpack.config.js:18; apps/app/src/environments/environments.ts:8) | No | apps/microfrontend/project.json:14-23 (target `build` próprio); apps/microfrontend/webpack.config.js:26-30 (saída própria); .github/workflows/ci.yml:33 (build junto com os demais projetos, sem publicação) |

## Observações

**1. apps/app.** Build próprio, que gera `dist/apps/app` com o `index.html` do `HtmlWebpackPlugin` e a cópia de `public/` (apps/app/webpack.config.js:19, :97-110). O deploy é separado: o job de docs constrói só este app e publica a sua saída em `sample/` no Pages (.github/workflows/docs.yml:34-37, :48-57). O artefato do Pages leva também a documentação typedoc das libs, que não é aplicação frontend. O app publicado depende de um remote em `localhost:3001` (apps/app/src/environments/environments.ts:8), então a feature remota não carrega fora da máquina do desenvolvedor. O manifesto não tem campo `version` e é `private` (apps/app/package.json:1-3); a versão `0.0.10` da raiz (package.json:3) não é usada na publicação do app.

**2. apps/microfrontend.** Build próprio, que gera o `remoteEntry.js` do container `microfrontend` (apps/microfrontend/webpack.config.js:53-59). O `outputPath` do target Nx é `dist/apps/microfrontend` (apps/microfrontend/project.json:17), e o `output.path` do webpack é a pasta `dist` do próprio diretório (apps/microfrontend/webpack.config.js:27); o snapshot não deixa claro qual vale, mas nos dois casos a saída é só deste app. O único artefato de CI que o toca é o `run-many` do CI, que executa o build sem publicar (.github/workflows/ci.yml:33); o workflow de docs não o constrói. Sem deploy observado: só o dev server na porta 3001 (apps/microfrontend/project.json:24-30). A versão `1.0.0` do `public/manifest.json` (apps/microfrontend/public/manifest.json:4) é do manifesto lido pelo portal e não é usada em publicação; o `package.json` não tem `version` (apps/microfrontend/package.json:1-3).

## Resumo

Aplicações: 2. Build (separado: 2). Deploy (separado: 1, não observado: 1). Versionamento independente: 0.
