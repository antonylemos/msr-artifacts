---
schema: 1
id: 1065269096
full_name: sunnywilsonveshapogu/microfrontends-demo
commit: f56f903190312e938d0ad5a9a146ad4dbe333589
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

# 052 — sunnywilsonveshapogu/microfrontends-demo

## Leitura do repositório

Demonstração com três aplicações webpack (`shell`, `header-mf` e `products-mf`), cada uma com manifesto, lockfile e `webpack.config.js` próprios. O `package.json` da raiz serve só de orquestrador: instala as três em sequência, sobe os três servidores de desenvolvimento com `concurrently` e encadeia os três builds num único comando (package.json:7, 11-12). Cada `build` roda `webpack --mode production` (ex.: shell/package.json:6), enquanto a configuração compartilhada declara `mode: 'development'` e um `devServer` (ex.: shell/webpack.config.js:4-8); a opção da linha de comando define o modo do build.

O snapshot está incompleto para o build: as três configurações apontam para um `./public/index.html` que não existe no repositório (shell/webpack.config.js:39-41). O README traz o conteúdo desses arquivos para o leitor criar à mão (README.md:20, 123). É por isso que as três aplicações são `Undetermined` na revisão estrutural. Não há Dockerfile, CI nem configuração de hospedagem, e as ocorrências `ops-*`, `ci-*` e `cfg-public-path` da mineração estão vazias. O README só indica as portas locais (README.md:27-30).

## Aplicações

| # | Aplicação | Build | Deploy | Onde é servida | Versionamento | Artefatos |
|---|---|---|---|---|---|---|
| 1 | header-mf | separado | não observado | `http://localhost:3001` em desenvolvimento (header-mf/webpack.config.js:6-7; README.md:29) | No | header-mf/webpack.config.js:4-19 (configuração própria); header-mf/package.json:6 (`webpack --mode production`); package.json:12 (`build:all`) |
| 2 | products-mf | separado | não observado | `http://localhost:3002` em desenvolvimento (products-mf/webpack.config.js:6-7; README.md:30) | No | products-mf/webpack.config.js:4-19 (configuração própria); products-mf/package.json:6 (`webpack --mode production`); package.json:12 (`build:all`) |
| 3 | shell | separado | não observado | `http://localhost:3000` em desenvolvimento (shell/webpack.config.js:6-7; README.md:28) | No | shell/webpack.config.js:4-43 (configuração própria); shell/package.json:6 (`webpack --mode production`); package.json:12 (`build:all`) |

## Observações

**1. header-mf.** Configuração e comando de build próprios. O `build:all` da raiz só encadeia os builds, e cada um gera a saída na própria pasta. O build depende do template ausente (header-mf/webpack.config.js:46). Por isso a separação está declarada, mas o snapshot não permite construir a aplicação sem completar o repositório. Sem deploy observado. A versão `1.0.0` não é usada.

**2. products-mf.** Mesmo arranjo, porta 3002, com o mesmo template ausente (products-mf/webpack.config.js:46).

**3. shell.** Mesmo arranjo, porta 3000. Os remotes estão fixados em `localhost` (shell/webpack.config.js:24-27).

## Resumo

Aplicações: 3. Build (separado: 3). Deploy (não observado: 3). Versionamento independente: 0.
