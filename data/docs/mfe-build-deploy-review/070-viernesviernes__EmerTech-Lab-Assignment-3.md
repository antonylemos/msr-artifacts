---
schema: 1
id: 1183615585
full_name: viernesviernes/EmerTech-Lab-Assignment-3
commit: 98845d1a3f9c1b41df04512b4472ee2d21085b6b
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

# 070 — viernesviernes/EmerTech-Lab-Assignment-3

## Leitura do repositório

Trabalho acadêmico com três aplicações Vite em `client/`: `shell-app`, `auth-app` e `community-app`, cada uma com manifesto, lockfile e `vite.config.js` próprios. Há ainda um backend em `server/`, com dois microsserviços e um gateway Apollo na porta 4000 (server/gateway.js:5, 105), que não é aplicação frontend. O `client/package.json` não é workspace: só tem um script `dev` que sobe as três aplicações juntas com `concurrently` (client/package.json:11).

Os remotes têm um script chamado `deploy`, mas ele só roda `build` seguido de `preview` local na porta fixa da aplicação (client/auth-app/package.json:10-11; client/community-app/package.json:10-11). É assim que o `dev` do cliente sobe os dois remotes, enquanto o shell roda no servidor de desenvolvimento (client/package.json:11). Essa combinação existe porque o plugin de federação do Vite só gera o `remoteEntry.js` no build. Apesar do nome, o script não publica nada: é execução local. Não há Dockerfile, CI nem configuração de hospedagem, e as ocorrências `ops-*`, `ci-*` e `cfg-public-path` da mineração estão vazias. O gateway lista as origens das três aplicações em `localhost` para o CORS (server/gateway.js:12).

## Aplicações

| # | Aplicação | Build | Deploy | Onde é servida | Versionamento | Artefatos |
|---|---|---|---|---|---|---|
| 1 | client/auth-app | separado | não observado | `http://localhost:3001`, em `preview` local (client/auth-app/package.json:10; client/auth-app/vite.config.js:27-31) | No | client/auth-app/vite.config.js:21-26 (configuração de build própria); client/auth-app/package.json:8 (`vite build`); client/auth-app/package.json:11 (`deploy` = build + preview local) |
| 2 | client/community-app | separado | não observado | `http://localhost:3002`, em `preview` local (client/community-app/package.json:10; client/community-app/vite.config.js:27-31) | No | client/community-app/vite.config.js:21-26 (configuração de build própria); client/community-app/package.json:8 (`vite build`); client/community-app/package.json:11 (`deploy` = build + preview local) |
| 3 | client/shell-app | separado | não observado | `http://localhost:3000` em desenvolvimento (client/shell-app/package.json:7) | No | client/shell-app/vite.config.js:18-23 (configuração de build própria); client/shell-app/package.json:8 (`vite build`) |

## Observações

**1. client/auth-app.** Build próprio. O script `deploy` não conta como deploy: ele serve o build localmente com `vite preview` (client/auth-app/package.json:10-11), um comando de desenvolvimento. A versão `0.0.0` não é usada.

**2. client/community-app.** Mesmo arranjo, porta 3002 (client/community-app/package.json:10-11).

**3. client/shell-app.** Build próprio. Nem `deploy` tem: roda só com o servidor de desenvolvimento na porta 3000 (client/shell-app/package.json:7). Os remotes estão fixados em `localhost` (ver a revisão de composição).

## Resumo

Aplicações: 3. Build (separado: 3). Deploy (não observado: 3). Versionamento independente: 0.
