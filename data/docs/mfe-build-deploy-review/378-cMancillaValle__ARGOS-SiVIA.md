---
schema: 1
id: 1255336417
full_name: cMancillaValle/ARGOS-SiVIA
commit: 4f6ef7f491ec9fc2d3e852f271e0c360549fad65
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

# 378 — cMancillaValle/ARGOS-SiVIA

## Leitura do repositório

Projeto acadêmico com backend FastAPI e duas unidades frontend, sem workspace: o
`package-lock.json` da raiz não tem `package.json` correspondente e lista `"packages": {}`
(`package-lock.json:1-6`). `frontend` é um conjunto de páginas HTML/JS sem build. `frontend-hermes`
é o único pacote npm (`frontend-hermes/package.json:1-31`); seu script `build` roda
`tsc -b && vite build` (`frontend-hermes/package.json:8`), e o Vite gera uma biblioteca IIFE de
arquivo único `hermes-widget.js`, com React embutido e CSS injetado pelo próprio JS
(`frontend-hermes/vite.config.ts:6-9`, `:11-15`, `:17-19`). O `dist` não está versionado
(`frontend-hermes/.gitignore:11`).

Não há servidor próprio para nenhuma das unidades. O mesmo processo FastAPI serve as páginas de
`frontend` (`/`, `/login`, `/dashboard` em `backend/main.py:257`, `:265`, `:273`, e os demais
arquivos estáticos montados em `/` em `backend/main.py:292-293`) e o `dist` de `frontend-hermes`
no caminho `/hermes/` (`backend/main.py:92`, `:281-288`). O único artefato de deploy é o
`docker-compose.yml`, com um só serviço, `argos-backend-ia`: imagem `python:3.11-slim`, o
repositório inteiro montado em `/app`, instalação das dependências Python e `uvicorn` na porta
5000, com healthcheck e `restart: unless-stopped` (`docker-compose.yml:3-35`, em especial `:5`,
`:12`, `:17-22`, `:24`). O compose não roda `npm` nem build do widget: o `/hermes/` só responde
se `frontend-hermes/dist` já existir no diretório montado; caso contrário a rota devolve 404
(`backend/main.py:286-287`).

O build do widget aparece amarrado à publicação em `ngrok_tunnel.py`: o script roda
`npm run build` em `frontend-hermes` (`ngrok_tunnel.py:52-62`), sobe o mesmo `uvicorn main:app`
(`ngrok_tunnel.py:95-111`) e abre um túnel HTTP público para a porta dele
(`ngrok_tunnel.py:153-161`); `start_ngrok.sh:29` só chama esse script. `start.py:34-36` sobe o
mesmo servidor sem construir o widget. Os três caminhos (compose, `start.py`, túnel ngrok)
publicam as duas unidades juntas, pelo mesmo servidor e porta. O README descreve a mesma
execução local e o túnel opcional (`README.md:248-265`) e cita um instalador Windows por Inno
Setup (`README.md:221`), que não tem artefato no snapshot. Não há CI, Dockerfile, nginx nem
configuração de hospedagem.

## Aplicações

| # | Aplicação | Build | Deploy | Onde é servida | Versionamento | Artefatos |
|---|---|---|---|---|---|---|
| 1 | frontend | sem build | conjunto | `/`, `/login`, `/dashboard` e estáticos em `/` (backend/main.py:257; backend/main.py:265; backend/main.py:273; backend/main.py:293); porta 5000 (docker-compose.yml:24) | No | backend/main.py:91 (aponta o diretório `frontend`); backend/main.py:257-293 (serve as páginas e os estáticos); docker-compose.yml:3-24 (serviço único que monta o repositório e sobe o FastAPI na porta 5000); ngrok_tunnel.py:95-111 (sobe o mesmo FastAPI); ngrok_tunnel.py:153-161 (túnel público para a porta) |
| 2 | frontend-hermes | separado | conjunto | `/hermes/hermes-widget.js` (backend/main.py:281; frontend/dashboard.html:366); porta 5000 (docker-compose.yml:24) | No | frontend-hermes/package.json:8 (`tsc -b && vite build`); frontend-hermes/vite.config.ts:11-15 (biblioteca IIFE `hermes-widget.js`); backend/main.py:92 (aponta `frontend-hermes/dist`); backend/main.py:281-288 (serve o `dist` em `/hermes/`); docker-compose.yml:3-24 (mesmo serviço); ngrok_tunnel.py:52-62 (`npm run build` antes de subir o servidor); ngrok_tunnel.py:153-161 (mesmo túnel) |

## Observações

**1. frontend.** Páginas HTML com scripts estáticos e CDNs, sem `package.json` nem passo de
build: os arquivos saem como estão no repositório (`backend/main.py:91`, `:257-278`). Deploy
`conjunto`: o serviço `argos-backend-ia` (`docker-compose.yml:3-24`) e o túnel de
`ngrok_tunnel.py` publicam o mesmo processo FastAPI que também serve `frontend-hermes`. É a
unidade host: `dashboard.html` carrega o widget pelo caminho relativo ao mesmo servidor
(`frontend/dashboard.html:366`). Sem versão própria.

**2. frontend-hermes.** Build `separado`: tem pacote e build Vite próprios, que geram um bundle só
dele (`frontend-hermes/package.json:8`, `frontend-hermes/vite.config.ts:11-15`), sem nenhum
código de `frontend`. Deploy `conjunto`: o `dist` não tem empacotamento próprio e é servido pelo
mesmo FastAPI, em `/hermes/` (`backend/main.py:92`, `:281-288`), dentro do mesmo serviço do
compose e do mesmo túnel. O compose não constrói o widget; só `ngrok_tunnel.py:52-62` dispara o
build antes de subir o servidor. Versionamento `No`: `version` `0.0.0` e `private: true`
(`frontend-hermes/package.json:3-4`), sem uso na publicação.

## Resumo

Aplicações: 2. Build (separado: 1, sem build: 1). Deploy (conjunto: 2). Versionamento independente: 0.
