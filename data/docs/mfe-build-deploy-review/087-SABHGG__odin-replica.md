---
schema: 1
id: 1183434052
full_name: SABHGG/odin-replica
commit: 06ce2bd578663f88243854f6eef292686660dfce
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

# 087 — SABHGG/odin-replica

## Leitura do repositório

O snapshot é um único projeto Create React App na raiz, sem workspace. O build é só local, pelo script `build: react-scripts build` (package.json:20), sem arquivo de configuração próprio; os demais scripts são os do CRA (`start`, `test`, `eject`, package.json:19-22). A saída `/build` é ignorada pelo git (.gitignore:11-12). O `package.json` não declara `homepage` nem script de publicação (package.json:1-45).

Não há nenhum artefato de deploy: nem Dockerfile, compose, workflow de CI, configuração de hospedagem ou proxy. O `matches.csv` não tem nenhuma ocorrência `ops-*`, `ci-*` ou `cfg-public-path`. O `README.md` é o texto padrão do CRA (README.md:1-3) e só descreve o servidor de desenvolvimento em `http://localhost:3000` (README.md:9-12), o que não é artefato de deploy.

O host carrega em execução o bundle de uma aplicação Angular externa, por padrão `http://localhost:4200/main.js`, o `ng serve` de desenvolvimento segundo o comentário do código, configurável por `REACT_APP_LEAPDOCS_ORIGIN` e `REACT_APP_LEAPDOCS_BUNDLE_URL` (src/index.js:7-9). Esse remoto não está no snapshot, não é linha da revisão estrutural, e nada no repositório o constrói ou publica. É uma configuração de desenvolvimento e demonstração, sem publicação.

## Aplicações

| # | Aplicação | Build | Deploy | Onde é servida | Versionamento | Artefatos |
|---|---|---|---|---|---|---|
| 1 | . | separado | não observado | — | No | package.json:20 (`react-scripts build`); .gitignore:11-12 (saída `/build`) |

## Observações

**1. Raiz (`.`).** Build próprio: `react-scripts build` (package.json:20) gera o artefato desta única aplicação do snapshot, que inclui a unidade local `odin-react` registrada no mesmo bundle (src/index.js:56-60). O remoto `leadocs-angular` não entra nesse artefato; é carregado por URL em execução (src/index.js:7-9), por isso Build `separado` e não `conjunto`. Deploy `não observado`: nenhum artefato do snapshot empacota ou publica a aplicação, e a porta 3000 só aparece no README, para o servidor de desenvolvimento (README.md:9-12). A versão `0.1.0` de um pacote `private` (package.json:3-4) não é usada em publicação, daí Versionamento `No`.

## Resumo

Aplicações: 1. Build (separado: 1). Deploy (não observado: 1). Versionamento independente: 0.
