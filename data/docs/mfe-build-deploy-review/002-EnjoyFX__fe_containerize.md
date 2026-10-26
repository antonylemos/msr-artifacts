---
schema: 1
id: 1202215420
full_name: EnjoyFX/fe_containerize
commit: f05a9de5c996497b2277614bf4cc473456d85b7e
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

# 002 — EnjoyFX/fe_containerize

## Leitura do repositório

Demonstração de "containerização" com quatro serviços: um `frontend` React/Vite, um `microfrontend` React/Vite que gera um widget `iife`, um `backend` NestJS e um PostgreSQL. Não há workspace: cada aplicação tem `package.json`, Dockerfile e build próprios (frontend/package.json:8; microfrontend/package.json:8). Os Dockerfiles do frontend e do microfrontend são iguais: um estágio Node roda `npm run build` e um estágio nginx serve o `dist` com o `nginx.conf` da própria pasta (frontend/Dockerfile:2-14; microfrontend/Dockerfile:2-14). O backend tem imagem Node própria (backend/Dockerfile:2-20).

Há dois arranjos de execução, e os dois mantêm cada aplicação no seu contêiner:
- **docker-compose.yml:** um serviço por aplicação, cada um com `build` da sua pasta (docker-compose.yml:18-19, 35-36, 39-40). Só o frontend publica porta para fora (docker-compose.yml:42-43). O nginx do microfrontend só serve os arquivos estáticos do build (microfrontend/nginx.conf:1-9). O microfrontend fica na rede interna e chega ao navegador pelo proxy do nginx do frontend, que repassa `/mfe/` ao serviço `microfrontend` e desliga o cache porque "bundle changes on redeploy" (frontend/nginx.conf:56-63). O mesmo nginx faz proxy de `/api/` para o backend (frontend/nginx.conf:45-46).
- **Helm (k3s):** um chart com um Deployment e um Service para cada aplicação, cada um com sua imagem (helm/fe-containerize/templates/frontend.yaml:1-56; helm/fe-containerize/templates/microfrontend.yaml:1-56; helm/fe-containerize/values.yaml:4-7). O Ingress do domínio aponta só para o frontend (helm/fe-containerize/templates/frontend.yaml:58-84; helm/fe-containerize/values.yaml:36-38). O script helm/build-and-deploy.sh constrói todas as imagens com `docker compose build`, importa cada uma no k3s e instala o chart numa única release (helm/build-and-deploy.sh:11, 15-18, 29-38). O README descreve também a atualização de uma aplicação isolada: rebuild só do serviço `frontend`, importação só da imagem dele e recriação só dos pods dele (helm/README.md:160-170).

Os demais arquivos do chart (helm/fe-containerize/templates/backend.yaml, helm/fe-containerize/templates/db.yaml, helm/fe-containerize/templates/secrets.yaml, helm/fe-containerize/templates/_helpers.tpl e helm/fe-containerize/Chart.yaml) tratam do backend, do banco, de segredos e de rótulos comuns, e não cobrem as aplicações frontend. As ocorrências `ops-hosting` estão todas no helm/README.md, nos comandos `kubectl` e `helm`. Em desenvolvimento, o Vite do frontend reproduz o proxy, mandando `/mfe` para a porta 3001 do microfrontend (frontend/vite.config.js:7-10; microfrontend/vite.config.js:34). Não há CI.

## Aplicações

| # | Aplicação | Build | Deploy | Onde é servida | Versionamento | Artefatos |
|---|---|---|---|---|---|---|
| 1 | frontend | separado | separado | Ingress `demo.triggers.online`, caminho `/` (helm/fe-containerize/values.yaml:36-38; helm/fe-containerize/templates/frontend.yaml:74-83); porta 3000 do host no compose (docker-compose.yml:42-43) | No | frontend/package.json:8 (`vite build`); frontend/Dockerfile:2-14 (build e imagem nginx próprios); docker-compose.yml:39-40 (serviço `frontend`); helm/fe-containerize/templates/frontend.yaml:1-84 (Deployment, Service e Ingress próprios); helm/fe-containerize/values.yaml:5 (imagem `fe_containerize-frontend:latest`) |
| 2 | microfrontend | separado | separado | serviço interno `microfrontend:80`, exposto em `/mfe/` pelo nginx do frontend (frontend/nginx.conf:57-58); porta 3001 em desenvolvimento (microfrontend/vite.config.js:34) | No | microfrontend/package.json:8 (`vite build`); microfrontend/Dockerfile:2-14 (build e imagem nginx próprios); docker-compose.yml:35-36 (serviço `microfrontend`); helm/fe-containerize/templates/microfrontend.yaml:1-56 (Deployment e Service próprios); helm/fe-containerize/values.yaml:7 (imagem `fe_containerize-microfrontend:latest`) |

## Observações

**1. frontend.** Build e imagem próprios, serviço próprio no compose e Deployment próprio no chart. Por isso o deploy é separado, ainda que o script do chart publique tudo de uma vez (helm/build-and-deploy.sh:11, 29-38) e o README mostre a atualização isolada desta aplicação (helm/README.md:160-170). É a porta de entrada: concentra o Ingress e o proxy para o microfrontend e para o backend (frontend/nginx.conf:45-46, 57-58). Sem versionamento observado: a imagem usa a tag `latest` (helm/fe-containerize/values.yaml:5), e o `version: 1.0.0` de frontend/package.json:4 não aparece na publicação.

**2. microfrontend.** Mesmo arranjo do frontend: imagem nginx própria, serviço próprio no compose e Deployment próprio no chart, cuja verificação de prontidão consulta o próprio bundle `/widget.iife.js` (helm/fe-containerize/templates/microfrontend.yaml:29-31). Não tem endereço público próprio: chega ao navegador pelo caminho `/mfe/` do frontend. A separação do deploy é, portanto, de processo e imagem, não de origem. O `version: 1.0.1` do package.json (microfrontend/package.json:4) é gravado no bundle e mostrado no widget (microfrontend/vite.config.js:5-14; microfrontend/src/Widget.jsx:64), mas não é usado para publicar: a imagem também usa `latest` (helm/fe-containerize/values.yaml:7). Por isso o Versionamento é `No`.

## Resumo

Aplicações: 2. Build (separado: 2). Deploy (separado: 2). Versionamento independente: 0.
