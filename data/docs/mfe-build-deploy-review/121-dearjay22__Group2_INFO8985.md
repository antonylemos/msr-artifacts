---
schema: 1
id: 1108713604
full_name: dearjay22/Group2_INFO8985
commit: 9f8b0b7df3c6bcdb67eee8cb21cebde3ff2ce189
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

# 121 — dearjay22/Group2_INFO8985

## Leitura do repositório

Projeto de disciplina que sobe, por Docker Compose, quatro serviços Spring Boot, duas aplicações React (CRA) e uma pilha de monitoramento e carga. Não há `package.json` na raiz nem workspace: cada aplicação frontend tem manifesto, lockfile e scripts próprios, e o build é o `react-scripts build` de cada uma (frontend/shell-app/package.json:15-20; frontend/products-mf/package.json:15-20). As duas têm Dockerfiles idênticos em dois estágios: instalam as dependências com `npm ci`, rodam `npm run build` e copiam a pasta `build` para uma imagem `nginx:alpine` própria (frontend/shell-app/Dockerfile:1-12; frontend/products-mf/Dockerfile:1-12). Os `nginx.conf` também são idênticos, com um único `location /` que devolve o `index.html` para rotas desconhecidas (frontend/shell-app/nginx.conf:1-11; frontend/products-mf/nginx.conf:1-11).

O docker-compose.yml declara um serviço para cada aplicação, cada um construído do seu diretório: `shell-app` na porta 3000 do host e `products-mf` na 3001 (docker-compose.yml:59-71). O mesmo arquivo constrói os backends `discovery-service`, `product-service`, `order-service` e `api-gateway` (docker-compose.yml:7-54), cada um com Dockerfile Maven + JRE próprio (backend/api-gateway/Dockerfile:1-12; backend/discovery-service/Dockerfile:1-22; backend/order-service/Dockerfile:1-12; backend/product-service/Dockerfile:1-12), e sobe serviços de imagem pronta que não cobrem nenhuma aplicação frontend: um `seeder` com curl, Prometheus, Grafana (porta 3030), InfluxDB e k6 (docker-compose.yml:76-135).

O único workflow (.github/workflows/ci.yml:1-42) roda em push na `main` com três jobs: `build` faz `docker compose build` de todos os serviços (.github/workflows/ci.yml:18-19), `deploy` faz `docker compose up -d` no próprio runner (.github/workflows/ci.yml:31-32) e `cleanup` derruba tudo com `docker compose down -v` (.github/workflows/ci.yml:41-42). Não há push de imagem nem destino externo: o "deploy" do CI sobe e derruba os contêineres na máquina do runner. A publicação observada é o próprio Compose, em que cada aplicação é uma imagem e um serviço separados; o README diz que tudo roda no GitHub Codespaces (README.md:2, 16), o que casa com a URL do iframe montada pelo shell para o Codespace na porta 3001 (frontend/shell-app/src/App.js:6-15).

O README contradiz os artefatos em alguns pontos. Manda entrar em `shell-app` e `products-mf` a partir da raiz (README.md:54, 57, 66), mas os diretórios ficam em `frontend/`; manda rodar `npm run dev` (README.md:67, 73), script que não existe nos dois `package.json` (frontend/shell-app/package.json:15-20; frontend/products-mf/package.json:15-20); e lista as aplicações nas portas 5173 e 4173 (README.md:82-83) e o Grafana na 3000 (README.md:46, 86), enquanto o Compose põe o shell na 3000 e o Grafana na 3030 (docker-compose.yml:62, 110). Pela regra, o README não decide a coluna Deploy.

## Aplicações

| # | Aplicação | Build | Deploy | Onde é servida | Versionamento | Artefatos |
|---|---|---|---|---|---|---|
| 1 | frontend/products-mf | separado | separado | porta 3001 do host (docker-compose.yml:69); `https://${codespaceName}-3001.app.github.dev` no Codespaces, como destino do iframe do shell (frontend/shell-app/src/App.js:14) | No | frontend/products-mf/package.json:17 (`react-scripts build`); frontend/products-mf/Dockerfile:1-12 (build e imagem nginx próprios); frontend/products-mf/nginx.conf:1-11 (serve o build com fallback para `index.html`); docker-compose.yml:66-71 (serviço `products-mf`, `build: ./frontend/products-mf`, `3001:80`); .github/workflows/ci.yml:18-19, 31-32 (build e subida de todos os serviços do Compose) |
| 2 | frontend/shell-app | separado | separado | porta 3000 do host (docker-compose.yml:62) | No | frontend/shell-app/package.json:17 (`react-scripts build`); frontend/shell-app/Dockerfile:1-12 (build e imagem nginx próprios); frontend/shell-app/nginx.conf:1-11 (serve o build com fallback para `index.html`); docker-compose.yml:59-64 (serviço `shell-app`, `build: ./frontend/shell-app`, `3000:80`); .github/workflows/ci.yml:18-19, 31-32 (build e subida de todos os serviços do Compose) |

## Observações

**1. frontend/products-mf.** Build separado: o `react-scripts build` roda dentro da imagem da própria aplicação e gera só o build dela (frontend/products-mf/Dockerfile:3-6). Deploy separado: a aplicação tem imagem nginx própria (frontend/products-mf/Dockerfile:8-12) e serviço próprio no Compose, publicado na porta 3001 (docker-compose.yml:66-71). O CI constrói e sobe todos os serviços num só comando (.github/workflows/ci.yml:19, 32), mas cada aplicação continua em imagem e contêiner próprios, e o job não publica nada fora do runner. A porta 3001 é a que o shell usa para montar a URL do iframe no Codespaces (frontend/shell-app/src/App.js:14); a revisão de composição deixou esse destino como `Undetermined`, por ser só a porta. Versionamento `No`: o `version: "0.1.0"` com `private: true` (frontend/products-mf/package.json:3-4) não é usado em nenhuma publicação.

**2. frontend/shell-app.** Mesmo arranjo do products-mf: build `react-scripts` dentro da imagem própria (frontend/shell-app/Dockerfile:1-12) e serviço próprio no Compose, na porta 3000 (docker-compose.yml:59-64). O Dockerfile e o `nginx.conf` são cópias dos do products-mf, sem nenhum ajuste de caminho, proxy ou `publicPath`; o nginx do shell não encaminha nada para o products-mf, que é alcançado direto pela porta dele. Versionamento `No`: `version: "0.1.0"` e `private: true` (frontend/shell-app/package.json:3-4), sem uso na publicação.

## Resumo

Aplicações: 2. Build (separado: 2). Deploy (separado: 2). Versionamento independente: 0.
