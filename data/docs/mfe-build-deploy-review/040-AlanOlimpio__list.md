---
schema: 1
id: 1009749841
full_name: AlanOlimpio/list
commit: 6ff9bfa3a94bb5920f60aabacc8f56298cbf4326
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

# 040 — AlanOlimpio/list

## Leitura do repositório

Repositório com uma só aplicação, `ListApp`, feita num curso de webpack (README.md:1-3). É ao mesmo tempo remote, porque expõe `./ListRoutes`, e consumidor do remote `RegisterApp`, que está em outro repositório e é publicado num domínio Vercel próprio (webpack.config.js:46-55). O build é um `webpack --mode production` com saída em `dist` e `publicPath: 'auto'` (package.json:9; webpack.config.js:6-11). Com isso, os chunks são resolvidos a partir de onde o `remoteEntry.js` for servido, sem endereço fixo da própria aplicação.

O deploy é na Vercel, configurado no repositório. O `vercel.json` usa `@vercel/static-build` sobre o `package.json`, publica `dist` e reescreve todas as rotas para `/` (vercel.json:2-11). O README só explica como rodar localmente na porta 9004 (README.md:29-37; webpack.config.js:17).

## Aplicações

| # | Aplicação | Build | Deploy | Onde é servida | Versionamento | Artefatos |
|---|---|---|---|---|---|---|
| 1 | . | separado | separado | domínio Vercel, não registrado no snapshot (vercel.json:5-11); `http://localhost:9004` em desenvolvimento (webpack.config.js:17) | No | webpack.config.js:4-11 (configuração e saída próprias); package.json:9 (`webpack --mode production`); vercel.json:5-11 (build estático e publicação de `dist`) |

## Observações

**1. ..** Aplicação da raiz. Build e deploy próprios: a configuração da Vercel publica só esta aplicação. O consumidor dela, se houver, e o remote `RegisterApp` estão em outros repositórios, e o remote tem domínio próprio (webpack.config.js:53-54), o que é compatível com publicações independentes. O endereço desta aplicação não aparece no snapshot. A versão `1.0.0` (package.json:3) não é usada na publicação.

## Resumo

Aplicações: 1. Build (separado: 1). Deploy (separado: 1). Versionamento independente: 0.
