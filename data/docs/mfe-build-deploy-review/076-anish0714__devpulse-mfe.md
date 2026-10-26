---
schema: 1
id: 1353825451
full_name: anish0714/devpulse-mfe
commit: 6a2348d162b34030505554ab0ef954577627999a
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

# 076 — anish0714/devpulse-mfe

## Leitura do repositório

Monorepo de npm workspaces (package.json:5-7) com um host (`packages/shell`) e cinco remotes de Module Federation. Cada pacote tem a mesma receita: `webpack build --mode production` (por exemplo packages/shell/package.json:7) sobre uma configuração webpack própria, que grava em `dist/` do próprio pacote (packages/shell/webpack.config.js:31-35; packages/pdf-conversion-remote/webpack.config.js:13-17), e `webpack serve` para desenvolvimento (packages/shell/package.json:6). O script `build` da raiz só dispara o build de cada workspace (package.json:10). As cinco configurações dos remotes são idênticas exceto pela porta do dev server e pelo `name` do container. Não há Dockerfile, compose, proxy nem configuração de hospedagem; `dist` é ignorado pelo git (.gitignore:2).

Há dois workflows do GitHub Actions. `ci.yml` roda em pull requests para `main` (.github/workflows/ci.yml:3-5) e, numa matriz, faz type-check e build de um pacote por job, mas só de `shell`, `pdf-conversion-remote` e `pdf-manipulation-remote` (.github/workflows/ci.yml:18, 33, 36); ele não publica nada. `deploy.yml` roda em push para `main` ou manualmente (.github/workflows/deploy.yml:3-6), constrói todos os workspaces (.github/workflows/deploy.yml:36-37) e monta um único diretório `site`: o `dist` do shell na raiz e os `dist` de conversão e manipulação PDF em `site/remotes/pdf-conversion/` e `site/remotes/pdf-manipulation/` (.github/workflows/deploy.yml:39-44). Esse diretório sobe como um único artefato do GitHub Pages e é implantado num único job (.github/workflows/deploy.yml:46-60). É configuração de produção; o endereço base é `https://anish0714.github.io/devpulse-mfe` (packages/shell/webpack.config.js:6).

Contradição entre artefatos: o shell, em produção, aponta os remotes `dev-utils`, `pdf-form-filler` e `ocr` para `remotes/dev-utils/`, `remotes/pdf-form-filler/` e `remotes/ocr/` sob esse endereço (packages/shell/webpack.config.js:17-25), mas o deploy não copia esses três `dist` para o site (.github/workflows/deploy.yml:41-44). O README descreve seis builds montados no site (README.md:88-96) e uma matriz de CI com os seis pacotes (README.md:115), o que o snapshot não confirma; isso fica para a revisão de documentação. A frase "independently deployed" (README.md:3) também não corresponde ao workflow, que publica tudo junto.

Ocorrências do `matches.csv` fora da tabela: `cfg-public-path` em todas as configurações webpack (`publicPath: "auto"`, por exemplo packages/shell/webpack.config.js:32 e packages/pdf-conversion-remote/webpack.config.js:14) só faz o runtime resolver os chunks a partir de onde o arquivo foi carregado, o que permite servir cada `dist` num subcaminho; `ops-cors` nos cinco remotes (`Access-Control-Allow-Origin: *`, por exemplo packages/pdf-conversion-remote/webpack.config.js:30) está no `devServer` e vale só para desenvolvimento. Os dois workflows (`ci-workflow-file`) estão descritos acima.

## Aplicações

| # | Aplicação | Build | Deploy | Onde é servida | Versionamento | Artefatos |
|---|---|---|---|---|---|---|
| 1 | packages/dev-utils-remote | separado | não observado | porta 3005 do dev server (packages/dev-utils-remote/webpack.config.js:28) | No | packages/dev-utils-remote/package.json:7 (`webpack build --mode production`); packages/dev-utils-remote/webpack.config.js:13-17 (saída `dist` própria); packages/dev-utils-remote/webpack.config.js:33-43 (container `devUtils`, `remoteEntry.js`); .github/workflows/deploy.yml:37 (construído, mas não copiado para o site em :41-44) |
| 2 | packages/ocr-remote | separado | não observado | porta 3007 do dev server (packages/ocr-remote/webpack.config.js:28) | No | packages/ocr-remote/package.json:7 (`webpack build --mode production`); packages/ocr-remote/webpack.config.js:13-17 (saída `dist` própria); packages/ocr-remote/webpack.config.js:33-43 (container `ocr`, `remoteEntry.js`); .github/workflows/deploy.yml:37 (construído, mas não copiado para o site em :41-44) |
| 3 | packages/pdf-conversion-remote | separado | conjunto | `https://anish0714.github.io/devpulse-mfe/remotes/pdf-conversion/` (.github/workflows/deploy.yml:43; packages/shell/webpack.config.js:6, 12); porta 3003 do dev server (packages/pdf-conversion-remote/webpack.config.js:28) | No | packages/pdf-conversion-remote/package.json:7 (`webpack build --mode production`); packages/pdf-conversion-remote/webpack.config.js:13-17 (saída `dist` própria); .github/workflows/ci.yml:18, 36 (job de build próprio na matriz); .github/workflows/deploy.yml:43 (copia o `dist` para `site/remotes/pdf-conversion/`); .github/workflows/deploy.yml:46-60 (publica `site` inteiro no GitHub Pages) |
| 4 | packages/pdf-form-filler-remote | separado | não observado | porta 3006 do dev server (packages/pdf-form-filler-remote/webpack.config.js:28) | No | packages/pdf-form-filler-remote/package.json:7 (`webpack build --mode production`); packages/pdf-form-filler-remote/webpack.config.js:13-17 (saída `dist` própria); packages/pdf-form-filler-remote/webpack.config.js:33-43 (container `pdfFormFiller`, `remoteEntry.js`); .github/workflows/deploy.yml:37 (construído, mas não copiado para o site em :41-44) |
| 5 | packages/pdf-manipulation-remote | separado | conjunto | `https://anish0714.github.io/devpulse-mfe/remotes/pdf-manipulation/` (.github/workflows/deploy.yml:44; packages/shell/webpack.config.js:6, 15); porta 3004 do dev server (packages/pdf-manipulation-remote/webpack.config.js:28) | No | packages/pdf-manipulation-remote/package.json:7 (`webpack build --mode production`); packages/pdf-manipulation-remote/webpack.config.js:13-17 (saída `dist` própria); .github/workflows/ci.yml:18, 36 (job de build próprio na matriz); .github/workflows/deploy.yml:44 (copia o `dist` para `site/remotes/pdf-manipulation/`); .github/workflows/deploy.yml:46-60 (publica `site` inteiro no GitHub Pages) |
| 6 | packages/shell | separado | conjunto | `https://anish0714.github.io/devpulse-mfe/` (packages/shell/webpack.config.js:6; .github/workflows/deploy.yml:42); porta 3000 do dev server (packages/shell/webpack.config.js:46) | No | packages/shell/package.json:7 (`webpack build --mode production`); packages/shell/webpack.config.js:31-35 (saída `dist` própria); .github/workflows/ci.yml:18, 36 (job de build próprio na matriz); .github/workflows/deploy.yml:42 (copia o `dist` para a raiz de `site`); .github/workflows/deploy.yml:46-60 (publica `site` inteiro no GitHub Pages) |

## Observações

**1. packages/dev-utils-remote.** Build `separado`: webpack próprio com saída em `packages/dev-utils-remote/dist` (packages/dev-utils-remote/webpack.config.js:13-17), disparado pelo script do pacote (packages/dev-utils-remote/package.json:7) e, no deploy, pelo build de todos os workspaces (.github/workflows/deploy.yml:37). Deploy `não observado`: o workflow constrói o pacote, mas não copia o `dist` para o site publicado (.github/workflows/deploy.yml:41-44), e o pacote não está na matriz de CI (.github/workflows/ci.yml:18). O shell espera o remote em `remotes/dev-utils/remoteEntry.js` sob o endereço de produção (packages/shell/webpack.config.js:17-18), mas nenhum artefato do snapshot coloca arquivos ali; o único endereço com evidência é a porta 3005 de desenvolvimento. Versionamento `No`: `"version": "1.0.0"` com `"private": true` (packages/dev-utils-remote/package.json:3-4), sem uso na publicação.

**2. packages/ocr-remote.** Mesma situação da aplicação 1: build próprio para `dist` (packages/ocr-remote/webpack.config.js:13-17; packages/ocr-remote/package.json:7), construído em .github/workflows/deploy.yml:37 mas não copiado para o site (.github/workflows/deploy.yml:41-44) e fora da matriz de CI (.github/workflows/ci.yml:18). O shell aponta para `remotes/ocr/remoteEntry.js` em produção (packages/shell/webpack.config.js:23-24), caminho que nenhum artefato preenche. Só a porta 3007 de desenvolvimento é observada. Versionamento `No` (packages/ocr-remote/package.json:3-4).

**3. packages/pdf-conversion-remote.** Build `separado`: saída própria em `dist` (packages/pdf-conversion-remote/webpack.config.js:13-17) e job de build próprio na matriz do CI (.github/workflows/ci.yml:18, 36), que só verifica e não publica. Deploy `conjunto`: o `dist` é copiado para `site/remotes/pdf-conversion/` (.github/workflows/deploy.yml:43), dentro do mesmo diretório `site` que recebe o shell e o remote de manipulação, e esse diretório é enviado como um único artefato do Pages e implantado num único job (.github/workflows/deploy.yml:46-60). O subcaminho próprio separa os arquivos, mas não a publicação. O endereço publicado coincide com o que o shell usa em produção (packages/shell/webpack.config.js:11-12). Versionamento `No` (packages/pdf-conversion-remote/package.json:3-4).

**4. packages/pdf-form-filler-remote.** Mesma situação das aplicações 1 e 2: build próprio para `dist` (packages/pdf-form-filler-remote/webpack.config.js:13-17; packages/pdf-form-filler-remote/package.json:7), construído em .github/workflows/deploy.yml:37 e não copiado para o site (.github/workflows/deploy.yml:41-44), fora da matriz de CI (.github/workflows/ci.yml:18). O shell espera `remotes/pdf-form-filler/remoteEntry.js` (packages/shell/webpack.config.js:20-21). Só a porta 3006 de desenvolvimento é observada. Versionamento `No` (packages/pdf-form-filler-remote/package.json:3-4).

**5. packages/pdf-manipulation-remote.** Igual à aplicação 3: build próprio (packages/pdf-manipulation-remote/webpack.config.js:13-17) com job próprio no CI (.github/workflows/ci.yml:18, 36); `dist` copiado para `site/remotes/pdf-manipulation/` (.github/workflows/deploy.yml:44) e publicado no mesmo artefato do Pages que o shell e o remote de conversão (.github/workflows/deploy.yml:46-60). Endereço publicado coincide com o do shell em produção (packages/shell/webpack.config.js:14-15). Versionamento `No` (packages/pdf-manipulation-remote/package.json:3-4).

**6. packages/shell.** Build `separado`: webpack próprio com saída em `packages/shell/dist` (packages/shell/webpack.config.js:31-35), com os remotes resolvidos em tempo de execução por URL e não embutidos no bundle (packages/shell/webpack.config.js:50-58); job próprio no CI (.github/workflows/ci.yml:18, 36). Deploy `conjunto`: o `dist` vai para a raiz de `site` (.github/workflows/deploy.yml:42) e é publicado junto com os remotes 3 e 5 (.github/workflows/deploy.yml:46-60). O modo de produção troca as URLs de `localhost` pelas do Pages (packages/shell/webpack.config.js:9-25), de modo que um rebuild do shell é necessário se o endereço base mudar. Versionamento `No` (packages/shell/package.json:3-4).

## Resumo

Aplicações: 6. Build (separado: 6). Deploy (conjunto: 3, não observado: 3). Versionamento independente: 0.
