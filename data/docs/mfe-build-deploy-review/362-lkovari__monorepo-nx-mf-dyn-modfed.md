---
schema: 1
id: 1197367428
full_name: lkovari/monorepo-nx-mf-dyn-modfed
commit: 16f0962945720a521bac32e4a43913af1494b61b
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

# 362 — lkovari/monorepo-nx-mf-dyn-modfed

## Leitura do repositório

O código fica num workspace Nx em `nx-mf-df/`, com um host Angular (`main-host`) e três remotes (`mf_remote_a`, `mf_remote_b`, `mf_remote_c`) ligados por Native Federation. Nenhuma aplicação tem `package.json` próprio: cada uma é um projeto Nx com dois targets encadeados, `build` (`@angular-architects/native-federation:build`, que delega a `esbuild`) e `esbuild` (`@angular/build:application`, com saída em `dist/apps/<app>`) (ex.: nx-mf-df/apps/main-host/project.json:9-22, :58-64). O `package.json` da raiz tem um script de build por aplicação e scripts que disparam todos (nx-mf-df/package.json:17-24). O que existe para desenvolvimento são os `serve` de cada app e o `start:all`, que sobe os três remotes nas portas 4201-4203 e depois o host (nx-mf-df/package.json:6-10; nx-mf-df/scripts/start-all.mjs:9-13, :113-121), e os `serve-static` (`@nx/web:file-server`), que servem o `dist` de cada app localmente (ex.: nx-mf-df/apps/main-host/project.json:48-56). Nenhum deles conta como deploy.

O deploy de produção é um site único no GitHub Pages. O workflow `Deploy GitHub Pages`, disparado por push em `main`, roda `gh-build` e `gh-stage` e envia a pasta `nx-mf-df/gh-pages-dist` como **um** artefato do Pages, publicado depois por `actions/deploy-pages` (.github/workflows/deploy-github-pages.yml:3-6, :37-47, :50-58). O `gh-build` constrói a lib `common-ui-lib`, o host com `baseHref` na raiz do site e cada remote com `baseHref` no seu subdiretório, e reescreve o `federation.manifest.json` do host para os `remoteEntry.json` desses subdiretórios (nx-mf-df/scripts/gh-build.mjs:49-64). O `gh-stage` copia o `browser/` do host para a raiz de `gh-pages-dist` e o de cada remote para `gh-pages-dist/<remote>` (nx-mf-df/scripts/gh-stage.mjs:9-25). Ou seja: builds separados, juntados numa só árvore e publicados num só deploy de hospedagem, como a imagem nginx única do repositório 059. Há também um caminho manual, `gh-deploy`, que repete o build e o stage e empurra a mesma pasta para a branch `gh-pages` (nx-mf-df/scripts/gh-deploy.mjs:8-46; nx-mf-df/package.json:27, :64); é também um deploy único das quatro aplicações. As duas ocorrências `ops-hosting` do `matches.csv` são o `path` do upload (.github/workflows/deploy-github-pages.yml:47) e a tabela de scripts do README (README.md:207), que é documentação; o README também mostra o uso manual com `GH_PAGES_BASE` (README.md:293-299).

Fora das aplicações, a lib `common-ui-lib` tem build próprio com `ng-packagr-lite` (nx-mf-df/libs/common-ui-lib/project.json:10-14), chamado no início do `gh-build` (nx-mf-df/scripts/gh-build.mjs:49), mas os apps a importam pelo alias de `tsconfig` para o código-fonte (nx-mf-df/tsconfig.base.json:17-22), e a saída da lib não é publicada. As libs têm `"version": "0.0.1"` (nx-mf-df/libs/common-ui-lib/package.json:3), sem publicação. Não há Dockerfile, compose nem outra configuração de hospedagem.

## Aplicações

| # | Aplicação | Build | Deploy | Onde é servida | Versionamento | Artefatos |
|---|---|---|---|---|---|---|
| 1 | nx-mf-df/apps/main-host | separado | conjunto | raiz do site do GitHub Pages, `/${{ github.event.repository.name }}/` (.github/workflows/deploy-github-pages.yml:39; nx-mf-df/scripts/gh-build.mjs:51; nx-mf-df/scripts/gh-stage.mjs:18); porta 4200 do `serve-static` local (nx-mf-df/apps/main-host/project.json:53) | No | nx-mf-df/apps/main-host/project.json:9-22 (target `build` com Native Federation); nx-mf-df/apps/main-host/project.json:58-64 (`@angular/build:application`, saída `dist/apps/main-host`); nx-mf-df/scripts/gh-build.mjs:51 (build só do host com `baseHref` da raiz); nx-mf-df/scripts/gh-build.mjs:57-64 (manifesto de federação de produção); nx-mf-df/scripts/gh-stage.mjs:13-18 (copia o host para a raiz de `gh-pages-dist`); .github/workflows/deploy-github-pages.yml:37-58 (build, stage e um único upload e deploy do Pages); nx-mf-df/scripts/gh-deploy.mjs:33-46 (publicação manual de `gh-pages-dist` na branch `gh-pages`) |
| 2 | nx-mf-df/apps/mf_remote_a | separado | conjunto | subdiretório `mf_remote_a/` do site do GitHub Pages (nx-mf-df/scripts/gh-build.mjs:54, :58; nx-mf-df/scripts/gh-stage.mjs:25); porta 4201 do `serve-static` local (nx-mf-df/apps/mf_remote_a/project.json:53) | No | nx-mf-df/apps/mf_remote_a/project.json:9-22 (target `build` com Native Federation); nx-mf-df/apps/mf_remote_a/project.json:58-64 (saída `dist/apps/mf_remote_a`); nx-mf-df/scripts/gh-build.mjs:53-54 (build só do remote com `baseHref` próprio); nx-mf-df/scripts/gh-stage.mjs:19-25 (copia para `gh-pages-dist/mf_remote_a`); .github/workflows/deploy-github-pages.yml:37-58 (mesmo upload e deploy do host); nx-mf-df/scripts/gh-deploy.mjs:33-46 |
| 3 | nx-mf-df/apps/mf_remote_b | separado | conjunto | subdiretório `mf_remote_b/` do site do GitHub Pages (nx-mf-df/scripts/gh-build.mjs:54, :59; nx-mf-df/scripts/gh-stage.mjs:25); porta 4202 do `serve-static` local (nx-mf-df/apps/mf_remote_b/project.json:53) | No | nx-mf-df/apps/mf_remote_b/project.json:9-22; nx-mf-df/apps/mf_remote_b/project.json:58-64 (saída `dist/apps/mf_remote_b`); nx-mf-df/scripts/gh-build.mjs:53-54; nx-mf-df/scripts/gh-stage.mjs:19-25 (copia para `gh-pages-dist/mf_remote_b`); .github/workflows/deploy-github-pages.yml:37-58; nx-mf-df/scripts/gh-deploy.mjs:33-46 |
| 4 | nx-mf-df/apps/mf_remote_c | separado | conjunto | subdiretório `mf_remote_c/` do site do GitHub Pages (nx-mf-df/scripts/gh-build.mjs:54, :60; nx-mf-df/scripts/gh-stage.mjs:25); porta 4203 do `serve-static` local (nx-mf-df/apps/mf_remote_c/project.json:53) | No | nx-mf-df/apps/mf_remote_c/project.json:9-22; nx-mf-df/apps/mf_remote_c/project.json:58-64 (saída `dist/apps/mf_remote_c`); nx-mf-df/scripts/gh-build.mjs:53-54; nx-mf-df/scripts/gh-stage.mjs:19-25 (copia para `gh-pages-dist/mf_remote_c`); .github/workflows/deploy-github-pages.yml:37-58; nx-mf-df/scripts/gh-deploy.mjs:33-46 |

## Observações

**1. nx-mf-df/apps/main-host.** Build `separado`: o target `build` do projeto Nx gera `dist/apps/main-host` só com o host (nx-mf-df/apps/main-host/project.json:9-22, :58-64), e o `gh-build` o chama isoladamente (nx-mf-df/scripts/gh-build.mjs:51). O código das libs entra no bundle pelo alias de `tsconfig` (nx-mf-df/tsconfig.base.json:17-22), mas isso não põe código de outra aplicação no artefato. Depois do build, o `gh-build` sobrescreve o `federation.manifest.json` do host, trocando os endereços `localhost:4201-4203` (nx-mf-df/apps/main-host/public/federation.manifest.json:2-4) pelos subdiretórios do site (nx-mf-df/scripts/gh-build.mjs:57-64); é a única etapa em que o build do host depende do layout de deploy dos remotes. Deploy `conjunto`: o host vai para a raiz de `gh-pages-dist` (nx-mf-df/scripts/gh-stage.mjs:18), junto com os três remotes, e essa pasta é enviada num único upload e publicada num único deploy do Pages (.github/workflows/deploy-github-pages.yml:45-58). O `404.html` copiado do `index.html` do host serve de fallback do roteamento SPA para o site inteiro (nx-mf-df/scripts/gh-stage.mjs:27). Versionamento `No`: o host não tem `package.json`, e o da raiz é `"version": "0.0.0"`, `"private": true` (nx-mf-df/package.json:3, :29).

**2. nx-mf-df/apps/mf_remote_a.** Build `separado`: target próprio com saída `dist/apps/mf_remote_a` (nx-mf-df/apps/mf_remote_a/project.json:9-22, :58-64), chamado no laço dos remotes com `baseHref` `${base}mf_remote_a/` (nx-mf-df/scripts/gh-build.mjs:53-54). Deploy `conjunto`: a saída é copiada para `gh-pages-dist/mf_remote_a` (nx-mf-df/scripts/gh-stage.mjs:19-25) e publicada no mesmo artefato do Pages que o host e os outros remotes (.github/workflows/deploy-github-pages.yml:45-58). O subdiretório é o endereço que o manifesto de produção do host usa para este remote (nx-mf-df/scripts/gh-build.mjs:58), o mesmo da coluna Configuração da revisão de composição. Versionamento `No`: sem `package.json` próprio.

**3. nx-mf-df/apps/mf_remote_b.** Mesma situação da aplicação 2: build próprio com saída `dist/apps/mf_remote_b` (nx-mf-df/apps/mf_remote_b/project.json:9-22, :58-64; nx-mf-df/scripts/gh-build.mjs:53-54), cópia para `gh-pages-dist/mf_remote_b` (nx-mf-df/scripts/gh-stage.mjs:19-25) e publicação no deploy único do Pages (.github/workflows/deploy-github-pages.yml:45-58). O host a carrega por `${base}mf_remote_b/remoteEntry.json` (nx-mf-df/scripts/gh-build.mjs:59). Versionamento `No`.

**4. nx-mf-df/apps/mf_remote_c.** Mesma situação da aplicação 2: build próprio com saída `dist/apps/mf_remote_c` (nx-mf-df/apps/mf_remote_c/project.json:9-22, :58-64; nx-mf-df/scripts/gh-build.mjs:53-54), cópia para `gh-pages-dist/mf_remote_c` (nx-mf-df/scripts/gh-stage.mjs:19-25) e publicação no deploy único do Pages (.github/workflows/deploy-github-pages.yml:45-58). O host a carrega por `${base}mf_remote_c/remoteEntry.json` (nx-mf-df/scripts/gh-build.mjs:60). Versionamento `No`.

## Resumo

Aplicações: 4. Build (separado: 4). Deploy (conjunto: 4). Versionamento independente: 0.
