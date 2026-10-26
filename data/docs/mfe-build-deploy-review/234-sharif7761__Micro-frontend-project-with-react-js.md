---
schema: 1
id: 1158060733
full_name: sharif7761/Micro-frontend-project-with-react-js
commit: cb2083fd77ddcb4d6493af653e0ce523ba0be010
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

# 234 — sharif7761/Micro-frontend-project-with-react-js

## Leitura do repositório

O repositório contém três aplicações React/Rsbuild com builds próprios. A raiz não declara workspace: seus scripts entram nos diretórios de cada aplicação para instalar dependências, iniciar o desenvolvimento ou construir os projetos. `build:all` executa, em sequência, os builds de common_simple, users_simple e core_simple (package.json:7-14). Cada aplicação executa `rsbuild build` usando sua configuração local, com nome próprio na federação (common_simple/package.json:8; common_simple/rsbuild.config.ts:5-14; core_simple/package.json:8; core_simple/rsbuild.config.ts:5-14; users_simple/package.json:8; users_simple/rsbuild.config.ts:5-16). O comando agregado não reúne as três aplicações num mesmo artefato de build.

As configurações de servidor e os endereços dos remotes descrevem execução local: core_simple usa a porta 3000 e busca common_simple na porta 3001 e users_simple na porta 3002; users_simple também busca common_simple na porta 3001 (core_simple/rsbuild.config.ts:11-14, :31-33; users_simple/rsbuild.config.ts:14-16, :33-35; common_simple/rsbuild.config.ts:28-30). Os scripts disponíveis nas aplicações são `dev`, `build` e `preview` (common_simple/package.json:6-10; core_simple/package.json:6-10; users_simple/package.json:6-10). Não há workflow de CI/CD, Dockerfile, compose, manifesto de deploy ou configuração de hospedagem no snapshot; tampouco há ocorrências `ops-*`, `ci-*` ou `cfg-public-path` no matches.csv. Assim, os builds separados e as portas locais não sustentam deploy separado: o deploy das três aplicações é `não observado`.

Os três manifestos declaram `version: 1.0.0` e `private: true`, mas não há uso dessa versão para publicação ou liberação nos artefatos do snapshot (common_simple/package.json:2-10; core_simple/package.json:2-10; users_simple/package.json:2-10). O versionamento independente é, portanto, `No` para as três aplicações.

## Aplicações

| # | Aplicação | Build | Deploy | Onde é servida | Versionamento | Artefatos |
|---|---|---|---|---|---|---|
| 1 | common_simple | separado | não observado | Porta 3001 em desenvolvimento (common_simple/rsbuild.config.ts:28-30); remote `http://localhost:3001/remoteEntry.js` (core_simple/rsbuild.config.ts:12; users_simple/rsbuild.config.ts:15) | No | common_simple/package.json:2-10 (versão declarada, pacote privado e build `rsbuild build`); common_simple/rsbuild.config.ts:5-26 (configuração própria, expõe Button e Card em `remoteEntry.js`); package.json:11-12 (build agregado chama o build da aplicação) |
| 2 | core_simple | separado | não observado | Porta 3000 em desenvolvimento (core_simple/rsbuild.config.ts:31-33) | No | core_simple/package.json:2-10 (versão declarada, pacote privado e build `rsbuild build`); core_simple/rsbuild.config.ts:5-29 (configuração própria com remotes); package.json:11, :14 (build agregado chama o build da aplicação) |
| 3 | users_simple | separado | não observado | Porta 3002 em desenvolvimento (users_simple/rsbuild.config.ts:33-35); remote `http://localhost:3002/remoteEntry.js` (core_simple/rsbuild.config.ts:13) | No | users_simple/package.json:2-10 (versão declarada, pacote privado e build `rsbuild build`); users_simple/rsbuild.config.ts:5-31 (configuração própria, expõe UserList em `remoteEntry.js` e consome common_simple); package.json:11, :13 (build agregado chama o build da aplicação) |

## Observações

**1. common_simple.** Tem build próprio, que expõe os componentes Button e Card sob o nome common_simple e o arquivo `remoteEntry.js` (common_simple/package.json:8; common_simple/rsbuild.config.ts:9-14). O shell e users_simple referenciam esse arquivo em localhost:3001 (core_simple/rsbuild.config.ts:12; users_simple/rsbuild.config.ts:15). Esses endereços e a porta do servidor local não constituem artefato de deploy. A versão 1.0.0 permanece apenas declarada no manifesto, sem publicação observada (common_simple/package.json:2-10).

**2. core_simple.** O build próprio configura o shell como consumidor dos dois remotes por URLs locais, sem incorporar os fontes das outras aplicações à sua configuração de build (core_simple/package.json:8; core_simple/rsbuild.config.ts:9-14). A raiz apenas delega o build ao diretório core_simple (package.json:14). A porta 3000 é configuração do servidor local, sem hospedagem de produção observada (core_simple/rsbuild.config.ts:31-33). O campo de versão não é usado em publicação (core_simple/package.json:2-10).

**3. users_simple.** Seu build expõe `./UserList`, apontando para o App local, e referencia o remote common_simple em localhost:3001 (users_simple/package.json:8; users_simple/rsbuild.config.ts:9-16). O shell o busca em localhost:3002, que corresponde à porta configurada para seu servidor (core_simple/rsbuild.config.ts:13; users_simple/rsbuild.config.ts:33-35). Isso demonstra a separação dos alvos de build e a configuração local de consumo, mas não um deploy no snapshot. A versão 1.0.0 também não tem uso observado em publicação (users_simple/package.json:2-10).

## Resumo

Aplicações: 3. Build (separado: 3). Deploy (não observado: 3). Versionamento independente: 0.
