---
schema: 1
id: 985556796
full_name: dvreddy007/mfe-sample
commit: d4cef45fce1d97c3d4d80d232dc9e9fbad9cfd1a
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

# 245 — dvreddy007/mfe-sample

## Leitura do repositório

Workspace npm com Lerna: a raiz declara `packages/*` como workspaces (package.json:4-6) e só tem o script `dev`, que roda `lerna run dev` em todos os pacotes (package.json:7-9); o `lerna.json` só traz `$schema` e `version` (lerna.json:1-4). Não há script `build` na raiz. Cada um dos três pacotes (`host`, `app-1`, `app-2`) tem seu `vite.config.js` com o plugin `@module-federation/vite` e os scripts `dev` (`vite`), `build` (`vite build`) e `preview` (`vite preview`) (packages/host/package.json:6-10; packages/app-1/package.json:6-10; packages/app-2/package.json:6-10). Cada `vite build` gera o artefato só daquele pacote; nenhum script os dispara em conjunto. Em desenvolvimento, cada aplicação roda no próprio servidor Vite: host na porta 5010, app-1 na 5011 e app-2 na 5012 (packages/host/vite.config.js:21-23; packages/app-1/vite.config.js:18-20; packages/app-2/vite.config.js:18-20). O host busca os remotes nesses endereços `localhost` (packages/host/src/routeManifest.js:5, 18). O README só descreve esse modo de desenvolvimento (README.md:51-63). Não há Dockerfile, compose, proxy nem configuração de hospedagem. Os arquivos `.__mf__temp/<nome>/localSharedImportMap.js` de cada pacote são arquivos temporários gerados pelo plugin de federação (ex.: packages/app-1/.__mf__temp/app1/localSharedImportMap.js:2), não artefatos de deploy. O snapshot não traz nenhuma pasta `dist`.

O único artefato de CI/deploy é o workflow `.github/workflows/main_vdumpavue3.yml` (a ocorrência `ci-workflow-file` do `matches.csv`), gerado pelo assistente do Azure para um app Node.js (.github/workflows/main_vdumpavue3.yml:1-4). O job `build` roda `npm install`, `npm run build --if-present` e `npm run test --if-present` na raiz (:26-30). Como a raiz não tem `build` nem `test`, os dois últimos comandos não fazem nada, e nenhum `vite build` dos pacotes é executado. Depois, o job compacta a árvore inteira, com fontes e `node_modules`, num `release.zip` (:32-39). O job `deploy` descompacta esse zip e o publica como um todo no Azure Web App `vdumpavue3`, slot `Production` (:52-58, 67-73). O pacote publicado contém os diretórios das três aplicações, mas só como código-fonte não construído, e a raiz não define nenhum script `start` que sirva algo (package.json:7-9). Não dá para estabelecer, pelo snapshot, se esse deploy serve alguma das aplicações ou se está em uso. Por isso, as três ficam com Deploy `Undetermined`, e não `conjunto`. Nenhum pacote tem versão usada para publicação: os três têm `"version": "0.0.0"` e `"private": true` (ex.: packages/app-1/package.json:2-4), assim como o `lerna.json` (lerna.json:3).

## Aplicações

| # | Aplicação | Build | Deploy | Onde é servida | Versionamento | Artefatos |
|---|---|---|---|---|---|---|
| 1 | packages/app-1 | separado | Undetermined | `http://localhost:5011/remoteEntry.js` em desenvolvimento (packages/app-1/vite.config.js:19; packages/host/src/routeManifest.js:5) | No | packages/app-1/package.json:8 (`vite build` próprio); packages/app-1/vite.config.js:6-21 (config Vite com federação, expõe `./entry`); .github/workflows/main_vdumpavue3.yml:26-33 (build da raiz não constrói o pacote; zip da árvore inteira); .github/workflows/main_vdumpavue3.yml:67-73 (publica o zip no Azure Web App `vdumpavue3`) |
| 2 | packages/app-2 | separado | Undetermined | `http://localhost:5012/remoteEntry.js` em desenvolvimento (packages/app-2/vite.config.js:19; packages/host/src/routeManifest.js:18) | No | packages/app-2/package.json:8 (`vite build` próprio); packages/app-2/vite.config.js:6-21 (config Vite com federação, expõe `./entry`); .github/workflows/main_vdumpavue3.yml:26-33 (build da raiz não constrói o pacote; zip da árvore inteira); .github/workflows/main_vdumpavue3.yml:67-73 (publica o zip no Azure Web App `vdumpavue3`) |
| 3 | packages/host | separado | Undetermined | `localhost:5010` em desenvolvimento (packages/host/vite.config.js:22) | No | packages/host/package.json:8 (`vite build` próprio); packages/host/vite.config.js:7-24 (config Vite com federação do host); .github/workflows/main_vdumpavue3.yml:26-33 (build da raiz não constrói o pacote; zip da árvore inteira); .github/workflows/main_vdumpavue3.yml:67-73 (publica o zip no Azure Web App `vdumpavue3`) |

## Observações

**1. packages/app-1.** Build `separado`: o `vite build` do pacote (packages/app-1/package.json:8) usa a config própria, que gera o `remoteEntry.js` do remote `app1` com o módulo `./entry` (packages/app-1/vite.config.js:9-16). O único endereço no snapshot é o de desenvolvimento, `http://localhost:5011/remoteEntry.js`, fixo no manifesto do host (packages/host/src/routeManifest.js:3-6). Não há endereço de produção para o remote. Deploy `Undetermined` pelo motivo da leitura: o workflow publica a árvore inteira, com este diretório, no mesmo Azure Web App das outras duas aplicações (.github/workflows/main_vdumpavue3.yml:32-33, 67-73), mas sem construí-lo e sem nada que o sirva. Versionamento `No`: `"version": "0.0.0"` num pacote `private` (packages/app-1/package.json:3-4), sem publicação.

**2. packages/app-2.** Igual ao app-1, com o remote `app2` (packages/app-2/vite.config.js:9-16) e o build próprio de packages/app-2/package.json:8. O endereço de desenvolvimento é `http://localhost:5012/remoteEntry.js` (packages/host/src/routeManifest.js:16-19; packages/app-2/vite.config.js:19). O deploy é o mesmo zip do repositório inteiro (.github/workflows/main_vdumpavue3.yml:32-33, 67-73), daí `Undetermined`. Versionamento `No` (packages/app-2/package.json:3-4).

**3. packages/host.** Build `separado` (packages/host/package.json:8; packages/host/vite.config.js:7-24). O host não declara `remotes` no build (packages/host/vite.config.js:10-14): os endereços dos remotes vêm do manifesto de rotas em tempo de execução e apontam para `localhost` (packages/host/src/routeManifest.js:5, 18). Mesmo que o host fosse publicado, ele buscaria os remotes em endereços de desenvolvimento. Ele serve na porta 5010 em desenvolvimento (packages/host/vite.config.js:21-23). O deploy é o mesmo zip das outras duas (.github/workflows/main_vdumpavue3.yml:32-33, 67-73), daí `Undetermined`. Versionamento `No` (packages/host/package.json:3-4).

## Resumo

Aplicações: 3. Build (separado: 3). Deploy (Undetermined: 3). Versionamento independente: 0.
