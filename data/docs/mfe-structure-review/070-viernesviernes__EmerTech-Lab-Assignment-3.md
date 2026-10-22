---
schema: 1
id: 1183615585
full_name: viernesviernes/EmerTech-Lab-Assignment-3
commit: 98845d1a3f9c1b41df04512b4472ee2d21085b6b
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: b3f63eb6fb86d8877fda117ccc22eec936a89ff7bf2d414c1dedafc0311f1fb1
annotation:
  method: manual
  status: final
  date: 2026-10-19
---

# 070 — viernesviernes/EmerTech-Lab-Assignment-3

## Workspace

Nenhuma declaração de workspace.

## Unidades

| Diretório | Marcadores | Manifesto | Entrada | Build | Workspace | Deploy | Unidade frontend | Motivo |
|---|---|---|---|---|---|---|---|---|
| client | client/package.json | client/package.json:1-16 (manifesto coordenador) | — | — | — | — | No | Diretório que coordena comandos das aplicações; não possui entrada ou build de UI próprios. |
| client/auth-app | client/auth-app/package.json;client/auth-app/vite.config.js | client/auth-app/package.json:1-12 (manifesto próprio) | client/auth-app/index.html:10-11 (entrada main.jsx); client/auth-app/src/main.jsx:7-11 (monta React) | client/auth-app/vite.config.js:21-26 (configuração própria); client/auth-app/package.json:8 (`vite build`) | — | — | Yes | Aplicação React com entrada e build Vite próprios. |
| client/community-app | client/community-app/package.json;client/community-app/vite.config.js | client/community-app/package.json:1-12 (manifesto próprio) | client/community-app/index.html:10-11 (entrada main.jsx); client/community-app/src/main.jsx:6-10 (monta React) | client/community-app/vite.config.js:21-26 (configuração própria); client/community-app/package.json:8 (`vite build`) | — | — | Yes | Aplicação React com entrada e build Vite próprios. |
| client/shell-app | client/shell-app/package.json;client/shell-app/vite.config.js | client/shell-app/package.json:1-12 (manifesto próprio) | client/shell-app/index.html:10-11 (entrada main.jsx); client/shell-app/src/main.jsx:16-24 (monta React) | client/shell-app/vite.config.js:18-23 (configuração própria); client/shell-app/package.json:8 (`vite build`) | — | — | Yes | Aplicação React com entrada e build Vite próprios. |
| server | server/package.json | server/package.json:1-20 (pacote dos serviços) | server/package.json:15-19 (inicia serviços e gateway); server/gateway.js:85-108 (servidor GraphQL/HTTP, sem UI) | — | — | — | No | Backend GraphQL e gateway HTTP, sem entrada de aplicação frontend. |

## Resumo

Aplicações frontend no snapshot: 3 (client/auth-app, client/community-app, client/shell-app).

## Notas

- client/package.json:11 coordena os processos por --prefix; isso não declara workspace.
- Os scripts deploy dos remotes em client/auth-app/package.json:11 e client/community-app/package.json:11 executam apenas build e preview locais. Não há artefato de hospedagem ou workflow para registrar em Deploy.
- As páginas index.html das três aplicações estão no snapshot e foram abertas, embora não apareçam como marcadores em units.csv. Os marcadores foram preservados exatamente como no CSV.
