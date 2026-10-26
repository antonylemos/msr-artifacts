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
  inspection:
    output: data/inspections/mfe-dependencies-001
    version: "1"
    config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 076 — anish0714/devpulse-mfe

## Leitura do repositório

Demonstração de uma caixa de ferramentas de navegador num monorepo npm: `packages/shell` é o host e cinco pacotes React/webpack são remotes de Module Federation, cada um expondo um único módulo `./Widget` com a tela da ferramenta (conversão PDF, manipulação PDF, utilitários de desenvolvimento, preenchimento de formulários PDF e OCR). O shell declara os cinco remotes no `ModuleFederationPlugin` (packages/shell/webpack.config.js:50-58), com URL de `remoteEntry.js` em localhost (portas 3003 a 3007) no desenvolvimento ou sob `https://anish0714.github.io/devpulse-mfe/remotes/...` em produção (packages/shell/webpack.config.js:6, 11-25). No código, os cinco `Widget` são importados por `React.lazy` (packages/shell/src/App.tsx:7-11) e reunidos numa tabela de seções (packages/shell/src/App.tsx:34-91); a barra lateral escolhe a seção ativa (packages/shell/src/App.tsx:135-148) e o componente remoto escolhido é renderizado dentro de `Suspense` e de um `RemoteErrorBoundary` (packages/shell/src/App.tsx:162-166). Assim, só o widget aberto é carregado; os cinco relacionamentos têm a mesma forma.

O que não virou relação: cada unidade tem o `import("./bootstrap")` assíncrono exigido pelo Module Federation (por exemplo packages/shell/src/index.ts:3), que é interno a ela. O campo `url` de cada seção (packages/shell/src/App.tsx:42-44, 53-55, 64-66, 75-77, 86-88) repete as URLs da configuração, mas não é lido pelo shell; a resolução vem do webpack. Não há comunicação entre unidades: o shell não passa props aos widgets (packages/shell/src/App.tsx:164) e a revisão de código-fonte não encontrou eventos, `postMessage` nem estado compartilhado. Os remotes compartilham com o host apenas `react` e `react-dom` como singletons (packages/shell/webpack.config.js:59-62).

Particularidade de publicação: o workflow de deploy constrói todos os workspaces, mas só copia para o site o shell e os remotes de conversão e manipulação PDF (.github/workflows/deploy.yml:36-44). Em produção, as URLs de dev-utils, formulários PDF e OCR (packages/shell/webpack.config.js:17-25) não teriam arquivos publicados por esse workflow. Isso não muda as relações, que estão declaradas e usadas no código, mas limita o que se pode dizer do site publicado (não acessado).

## Relações

| # | Origem | Destino | Tipo | Direção | Mecanismo | No snapshot | Ativa | Configuração | Código |
|---|---|---|---|---|---|---|---|---|---|
| 1 | packages/shell | packages/pdf-conversion-remote | host → remote | origem → destino | module-federation | Yes | Yes | packages/shell/webpack.config.js:53 (remote `pdfConversion`); packages/shell/webpack.config.js:11-13 (URL `remotes/pdf-conversion/remoteEntry.js` ou `localhost:3003/remoteEntry.js`); packages/pdf-conversion-remote/webpack.config.js:34-37 (`name: "pdfConversion"`, `filename: "remoteEntry.js"`, expõe `./Widget`); packages/pdf-conversion-remote/webpack.config.js:28 (porta 3003) | packages/shell/src/App.tsx:7; packages/shell/src/App.tsx:34; packages/shell/src/App.tsx:164 |
| 2 | packages/shell | packages/pdf-manipulation-remote | host → remote | origem → destino | module-federation | Yes | Yes | packages/shell/webpack.config.js:54 (remote `pdfManipulation`); packages/shell/webpack.config.js:14-16 (URL `remotes/pdf-manipulation/remoteEntry.js` ou `localhost:3004/remoteEntry.js`); packages/pdf-manipulation-remote/webpack.config.js:34-37 (`name: "pdfManipulation"`, `filename: "remoteEntry.js"`, expõe `./Widget`); packages/pdf-manipulation-remote/webpack.config.js:28 (porta 3004) | packages/shell/src/App.tsx:8; packages/shell/src/App.tsx:34; packages/shell/src/App.tsx:164 |
| 3 | packages/shell | packages/dev-utils-remote | host → remote | origem → destino | module-federation | Yes | Yes | packages/shell/webpack.config.js:55 (remote `devUtils`); packages/shell/webpack.config.js:17-19 (URL `remotes/dev-utils/remoteEntry.js` ou `localhost:3005/remoteEntry.js`); packages/dev-utils-remote/webpack.config.js:34-37 (`name: "devUtils"`, `filename: "remoteEntry.js"`, expõe `./Widget`); packages/dev-utils-remote/webpack.config.js:28 (porta 3005) | packages/shell/src/App.tsx:9; packages/shell/src/App.tsx:34; packages/shell/src/App.tsx:164 |
| 4 | packages/shell | packages/pdf-form-filler-remote | host → remote | origem → destino | module-federation | Yes | Yes | packages/shell/webpack.config.js:56 (remote `pdfFormFiller`); packages/shell/webpack.config.js:20-22 (URL `remotes/pdf-form-filler/remoteEntry.js` ou `localhost:3006/remoteEntry.js`); packages/pdf-form-filler-remote/webpack.config.js:34-37 (`name: "pdfFormFiller"`, `filename: "remoteEntry.js"`, expõe `./Widget`); packages/pdf-form-filler-remote/webpack.config.js:28 (porta 3006) | packages/shell/src/App.tsx:10; packages/shell/src/App.tsx:34; packages/shell/src/App.tsx:164 |
| 5 | packages/shell | packages/ocr-remote | host → remote | origem → destino | module-federation | Yes | Yes | packages/shell/webpack.config.js:57 (remote `ocr`); packages/shell/webpack.config.js:23-25 (URL `remotes/ocr/remoteEntry.js` ou `localhost:3007/remoteEntry.js`); packages/ocr-remote/webpack.config.js:34-37 (`name: "ocr"`, `filename: "remoteEntry.js"`, expõe `./Widget`); packages/ocr-remote/webpack.config.js:28 (porta 3007) | packages/shell/src/App.tsx:11; packages/shell/src/App.tsx:34; packages/shell/src/App.tsx:164 |

## Observações

**1. packages/shell → packages/pdf-conversion-remote.** O remote `pdfConversion` do shell (packages/shell/webpack.config.js:53) corresponde à unidade pelo `name: "pdfConversion"` e pelo `./Widget` exposto (packages/pdf-conversion-remote/webpack.config.js:34-37), que é o módulo pedido em packages/shell/src/App.tsx:7; a porta 3003 só corrobora. A relação é ativa: o componente entra na seção de packages/shell/src/App.tsx:45 e é renderizado em packages/shell/src/App.tsx:164 quando essa seção é escolhida. É um dos dois remotes que o workflow de deploy publica (.github/workflows/deploy.yml:43).

**2. packages/shell → packages/pdf-manipulation-remote.** Mesma forma da relação 1: remote `pdfManipulation` (packages/shell/webpack.config.js:54), `name` e `./Widget` em packages/pdf-manipulation-remote/webpack.config.js:34-37, import em packages/shell/src/App.tsx:8, seção em packages/shell/src/App.tsx:56. Também publicado pelo deploy (.github/workflows/deploy.yml:44).

**3. packages/shell → packages/dev-utils-remote.** Remote `devUtils` (packages/shell/webpack.config.js:55), resolvido por `name: "devUtils"` e `./Widget` (packages/dev-utils-remote/webpack.config.js:34-37); import em packages/shell/src/App.tsx:9 e seção em packages/shell/src/App.tsx:67. As ferramentas internas do widget (JSON, Base64, UUID, regex) ficam dentro do remote e não formam relações próprias. A URL de produção `remotes/dev-utils/` (packages/shell/webpack.config.js:18) não é preenchida pelo deploy (.github/workflows/deploy.yml:41-44); isso não afeta Ativa, que se apoia no código.

**4. packages/shell → packages/pdf-form-filler-remote.** Remote `pdfFormFiller` (packages/shell/webpack.config.js:56), resolvido por `name: "pdfFormFiller"` e `./Widget` (packages/pdf-form-filler-remote/webpack.config.js:34-37); import em packages/shell/src/App.tsx:10 e seção em packages/shell/src/App.tsx:78. Como na relação 3, o caminho de produção (packages/shell/webpack.config.js:21) não é copiado pelo deploy.

**5. packages/shell → packages/ocr-remote.** Remote `ocr` (packages/shell/webpack.config.js:57), resolvido por `name: "ocr"` e `./Widget` (packages/ocr-remote/webpack.config.js:34-37); import em packages/shell/src/App.tsx:11 e seção em packages/shell/src/App.tsx:89. Como nas relações 3 e 4, o caminho de produção (packages/shell/webpack.config.js:24) não é copiado pelo deploy.

## Resumo

Relações: 5 (host → remote: 5). Ativas: 5. Destino fora do snapshot: 0.
Unidades sem relação: nenhuma.
