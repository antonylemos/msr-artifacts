---
schema: 1
id: 1006453202
full_name: waelbaraka/GitHub-HelpDesk-DashBoard-main
commit: ccb8398a4d53178974be0fc2b7483cba5d769013
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

# 275 — waelbaraka/GitHub-HelpDesk-DashBoard-main

## Leitura do repositório

O repositório tem três diretórios independentes, sem `package.json` na raiz nem declaração de workspace: o backend `Backend/` (Express/Prisma) e duas aplicações React + Vite unidas por Module Federation, o host `Frontend/` e o remote `whatsapp-module-frontend/`. Cada aplicação tem o seu `package.json`, o seu lockfile e o seu `vite.config.js`, e cada uma constrói por conta própria com `vite build` (Frontend/package.json:8; whatsapp-module-frontend/package.json:8). Os dois `.gitignore` ignoram a pasta `dist` de cada aplicação (Frontend/.gitignore:11; whatsapp-module-frontend/.gitignore:11), e nenhum artefato construído está no snapshot.

Tudo o que existe é configuração de desenvolvimento. Não há Dockerfile, compose, workflow de CI, manifesto de deploy nem configuração de hospedagem. A única ocorrência `ops-*`/`ci-*`/`cfg-public-path` do `matches.csv` é `ops-cors` em whatsapp-module-frontend/vite.config.js:55, que liga o CORS do servidor de desenvolvimento do Vite (bloco `server`, whatsapp-module-frontend/vite.config.js:52-56) para o host buscar o `remoteEntry.js` de outra porta. Os endereços da federação são todos `localhost`: o host procura o remote em `http://localhost:5001/assets/remoteEntry.js` (Frontend/vite.config.js:20), e o remote declara o host em `http://localhost:5173/assets/remoteEntry.js` (whatsapp-module-frontend/vite.config.js:28). O script `build` do remote é, na prática, um modo de desenvolvimento: roda `vite build --watch` junto com `vite preview` na porta 5001 (whatsapp-module-frontend/package.json:8), o que serve o build local para o host em desenvolvimento, mas não publica nada.

O backend sobe um servidor HTTP com Socket.IO na porta `PORT` ou 3001 (Backend/index.js:246-251), com scripts `start`/`dev` e de migração do Prisma (Backend/package.json:7-14). Não serve os arquivos das aplicações frontend nem tem artefato de deploy. O README da raiz afirma que o remote "is built independently" e que, em produção, seus assets "are deployed to a CDN or served by the platform" (Readme.md:36). Isso é documentação de intenção e não decide a coluna Deploy; nada no snapshot materializa essa publicação.

## Aplicações

| # | Aplicação | Build | Deploy | Onde é servida | Versionamento | Artefatos |
|---|---|---|---|---|---|---|
| 1 | Frontend | separado | não observado | `http://localhost:5173` em desenvolvimento (Frontend/vite.config.js:38) | No | Frontend/package.json:8 (`vite build`); Frontend/vite.config.js:7-61 (Vite com `react()` e `federation` do host) |
| 2 | whatsapp-module-frontend | separado | não observado | `http://localhost:5001/assets/remoteEntry.js` em desenvolvimento (Frontend/vite.config.js:20; whatsapp-module-frontend/vite.config.js:53) | No | whatsapp-module-frontend/package.json:8 (`vite build --watch` com `vite preview --port 5001`); whatsapp-module-frontend/vite.config.js:7-61 (Vite com `federation`, `filename: 'remoteEntry.js'`); whatsapp-module-frontend/vite.config.js:55 (`cors: true` do servidor de desenvolvimento) |

## Observações

**1. Frontend.** O host constrói sozinho com `vite build` (Frontend/package.json:8), a partir do seu próprio `vite.config.js`, que declara o remote e expõe `./apiClient` e `./authStore` (Frontend/vite.config.js:17-28). O artefato gerado é só dele, portanto build `separado`. Nenhum artefato do snapshot empacota ou publica esse build. A porta 5173 é a do servidor de desenvolvimento (Frontend/vite.config.js:37-40), e por isso Deploy é `não observado`. A versão `0.0.0` (Frontend/package.json:4) não é usada em publicação nenhuma.

**2. whatsapp-module-frontend.** O remote também tem build próprio e gera o seu `remoteEntry.js` (whatsapp-module-frontend/vite.config.js:13-14). O script `build` junta esse build, em modo `--watch`, a um `vite preview` na porta 5001 (whatsapp-module-frontend/package.json:8). É assim que o host o encontra em `localhost:5001` (Frontend/vite.config.js:20), mas trata-se de um servidor local rodado à mão, que não conta como deploy. O `cors: true` (whatsapp-module-frontend/vite.config.js:55) pertence ao bloco `server` do Vite, o servidor de desenvolvimento. A publicação em CDN de que fala o README (Readme.md:36) não tem artefato no snapshot. A versão `0.0.0` (whatsapp-module-frontend/package.json:4) também não é usada em publicação.

## Resumo

Aplicações: 2. Build (separado: 2). Deploy (não observado: 2). Versionamento independente: 0.
