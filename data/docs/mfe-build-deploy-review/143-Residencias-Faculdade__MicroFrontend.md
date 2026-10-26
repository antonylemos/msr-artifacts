---
schema: 1
id: 1363110249
full_name: Residencias-Faculdade/MicroFrontend
commit: 5726e54de24e6b6a1ff1fd004b82db909314640c
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

# 143 — Residencias-Faculdade/MicroFrontend

## Leitura do repositório

O repositório tem uma só aplicação frontend, a casca Vite da raiz (`.`). Não há workspace nem
workflow de CI, e o `matches.csv` não tem ocorrência `ci-*` nem `cfg-public-path`. O build é
`tsc && vite build` (package.json:8), com saída em `dist` (vite.config.ts:8); os outros scripts são
o servidor de desenvolvimento `vite` na porta 3000 e o `vite preview` (package.json:7, :9;
vite.config.ts:7).

O empacotamento é uma imagem Docker de dois estágios: `node:22-alpine` instala as dependências e
roda `npm run build` (Dockerfile:2-9), e `nginx:alpine` copia o `nginx.conf` e o `dist/` da casca
para `/usr/share/nginx/html/` e expõe a porta 80 (Dockerfile:12-18). O `nginx.conf` serve a SPA com
`try_files ... /index.html` (nginx.conf:9-11), cache de um ano com `Access-Control-Allow-Origin "*"`
para os assets (nginx.conf:14-19) e `no-cache` para o `index.html` (nginx.conf:22-25). O
`docker-compose.yml` constrói essa imagem no serviço `shell`, com `context: .`, publicando a porta 80
do container em `${SHELL_PORT:-3000}` do host (docker-compose.yml:4-15). É uma montagem local: o
Keycloak do mesmo compose roda em `start-dev` (docker-compose.yml:36).

Os demais artefatos `ops-*` não cobrem aplicação frontend do snapshot. O serviço `posts-crud` do
compose constrói um "Micro frontend Angular (outro repo)" a partir de
`context: ../Caio/aprendendo/primeiro-projeto`, fora do repositório (docker-compose.yml:17-24); a
ocorrência `ops-cors` de docker-compose.yml:18 é o comentário que pede a esse frontend expor
`main.js` com CORS. O serviço `keycloak` usa a imagem publicada `quay.io/keycloak/keycloak:26.2`
(docker-compose.yml:34-35), e `Dockerfile.keycloak` empacota o Keycloak com o realm do projeto
(Dockerfile.keycloak:1-8), sem serviço do compose que o use. As ocorrências `ops-hosting` estão no
README, que cita Vercel/Railway como cenário de produção da casca (README.md:56) e manda publicar o
frontend plugado e anotar a URL do `main.js` (README.md:182); não há configuração de hospedagem
no snapshot, e o README não decide a coluna Deploy. O exemplo de registro do README usa `posts-crud`
em `http://localhost:4200/main.js` (README.md:64), enquanto o registro do snapshot aponta
`member-manager` em `https://crud-member-manager.vercel.app/main.js`
(public/microfrontends.json:6), endereço da unidade externa, não da casca.

## Aplicações

| # | Aplicação | Build | Deploy | Onde é servida | Versionamento | Artefatos |
|---|---|---|---|---|---|---|
| 1 | . | separado | separado | porta `${SHELL_PORT:-3000}` do host, 80 no container (docker-compose.yml:9; Dockerfile:17; nginx.conf:3) | No | package.json:8 (`tsc && vite build`); vite.config.ts:8 (`outDir: 'dist'`); Dockerfile:2-9 (build da casca); Dockerfile:12-18 (imagem Nginx com o `dist/` da casca); nginx.conf:9-25 (SPA e cache); docker-compose.yml:4-15 (serviço `shell`, `context: .`) |

## Observações

**1. ..** Casca da raiz. Build separado: o build Vite gera o `dist` só dela (package.json:8;
vite.config.ts:8); o código do custom element `member-manager` não entra nesse artefato, é carregado
em runtime de outro endereço (public/microfrontends.json:6). Deploy separado: a imagem do
Dockerfile empacota só o `dist/` da casca (Dockerfile:16), e o serviço `shell` do compose a
constrói à parte do `posts-crud`, que tem imagem e porta próprias a partir de outro repositório
(docker-compose.yml:4-9, :19-24). Sem versionamento: package.json:3 declara `1.0.0`, sem uso em
publicação, e o pacote é `private` (package.json:4).

## Resumo

Aplicações: 1. Build (separado: 1). Deploy (separado: 1). Versionamento independente: 0.
