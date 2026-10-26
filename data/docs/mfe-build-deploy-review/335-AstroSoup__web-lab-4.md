---
schema: 1
id: 1105927418
full_name: AstroSoup/web-lab-4
commit: 2214561f8c9cb333f1849a0f1d04ec7ab36220cb
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

# 335 — AstroSoup/web-lab-4

## Leitura do repositório

Trabalho de laboratório com frontend Vue/Vite em três pacotes independentes sob `frontend/vite/` (host, remote-inputs, remote-results) e backends Java/WildFly sob `backend/`. Não há workspace nem script na raiz: cada pacote frontend tem o próprio `package.json` com `vite build` (frontend/vite/host/package.json:8; frontend/vite/remote-inputs/package.json:8; frontend/vite/remote-results/package.json:8) e a própria configuração Vite com o plugin de federação (frontend/vite/host/vite.config.js:5-40; frontend/vite/remote-inputs/vite.config.js:5-32; frontend/vite/remote-results/vite.config.js:5-32). Em desenvolvimento, cada um roda no seu `vite` nas portas 3000, 3001 e 3002, com CORS liberado (frontend/vite/host/vite.config.js:7-10; frontend/vite/remote-inputs/vite.config.js:7-10; frontend/vite/remote-results/vite.config.js:7-10). Os `base` alinham cada build ao caminho em que será servido: `/`, `/remote-inputs/` e `/remote-results/` (frontend/vite/host/vite.config.js:6; frontend/vite/remote-inputs/vite.config.js:6; frontend/vite/remote-results/vite.config.js:6).

O deploy é um docker-compose em `config/` com postgres, os serviços `auth`, `geometry` e `broker`, um serviço `nginx`, prometheus e grafana (config/docker-compose.yaml:1-74). Os três frontends saem numa **imagem nginx única**: o Dockerfile copia os três `dist` para pastas separadas da mesma imagem (config/nginx/Dockerfile:5-7), e o nginx tem um servidor por aplicação, nas portas 3000, 3001 e 3002 (config/nginx/nginx.conf:18-35, 37-53, 55-71), mais um servidor TLS na 8443 que faz proxy de `/`, `/remote-inputs/` e `/remote-results/` para essas portas e de `/auth/` e `/geometry/` para os backends (config/nginx/nginx.conf:73-103, 105-142). O compose publica as portas do nginx (config/docker-compose.yaml:42-47). O Dockerfile não roda o build: copia `dist` que precisa existir antes, e `dist` está no `.gitignore` (.gitignore:6), assim como os certificados que ele copia (config/nginx/Dockerfile:4; .gitignore:2). O Dockerfile declara `EXPOSE 80 443` (config/nginx/Dockerfile:10), mas o nginx escuta em 8080 e 8443 (config/nginx/nginx.conf:12, 74), e o compose mapeia essas (config/docker-compose.yaml:43-44). Os CORS do nginx (config/nginx/nginx.conf:22, 44, 62, 80, 114, 134) e dos `vite.config.js` (`cors: true`, :9 em cada) servem ao carregamento cruzado entre as portas.

Artefatos que não cobrem aplicação frontend: os Dockerfiles dos backends `auth`, `broker` e `geometry` copiam um `ROOT.war` já construído para o WildFly (config/backend/auth/Dockerfile:5; config/backend/broker/Dockerfile:5; config/backend/geometry/Dockerfile:5) e são os `build` dos serviços do compose (config/docker-compose.yaml:16-37). O config/backend/history/Dockerfile constrói `backend/historyService` com gradle (config/backend/history/Dockerfile:3-5), mas esse diretório não está no snapshot e nenhum serviço do compose usa esse Dockerfile. O config/frontend/Dockerfile está vazio (0 bytes). O config/prometheus/prometheus.yml só coleta métricas de `auth` e `geometry` (config/prometheus/prometheus.yml:6-13). Não há CI. O README só tem o título (README.md:1).

## Aplicações

| # | Aplicação | Build | Deploy | Onde é servida | Versionamento | Artefatos |
|---|---|---|---|---|---|---|
| 1 | frontend/vite/host | separado | conjunto | porta 3000 (config/nginx/nginx.conf:19; config/docker-compose.yaml:45); `/` no servidor TLS (config/nginx/nginx.conf:90-93) | No | frontend/vite/host/package.json:8 (`vite build`); frontend/vite/host/vite.config.js:5-40 (configuração Vite própria, `base: '/'`); config/nginx/Dockerfile:5 (copia o `dist` para a imagem conjunta); config/nginx/nginx.conf:18-35 (servidor próprio na porta 3000); config/docker-compose.yaml:38-52 (serviço `nginx` único) |
| 2 | frontend/vite/remote-inputs | separado | conjunto | porta 3001 (config/nginx/nginx.conf:38; config/docker-compose.yaml:46); `/remote-inputs/` no servidor TLS (config/nginx/nginx.conf:95-98) | No | frontend/vite/remote-inputs/package.json:8 (`vite build`); frontend/vite/remote-inputs/vite.config.js:5-32 (configuração Vite própria, `base: '/remote-inputs/'`); config/nginx/Dockerfile:6 (copia o `dist` para a imagem conjunta); config/nginx/nginx.conf:37-53 (servidor próprio na porta 3001); config/docker-compose.yaml:38-52 (serviço `nginx` único) |
| 3 | frontend/vite/remote-results | separado | conjunto | porta 3002 (config/nginx/nginx.conf:56; config/docker-compose.yaml:47); `/remote-results/` no servidor TLS (config/nginx/nginx.conf:100-103) | No | frontend/vite/remote-results/package.json:8 (`vite build`); frontend/vite/remote-results/vite.config.js:5-32 (configuração Vite própria, `base: '/remote-results/'`); config/nginx/Dockerfile:7 (copia o `dist` para a imagem conjunta); config/nginx/nginx.conf:55-71 (servidor próprio na porta 3002); config/docker-compose.yaml:38-52 (serviço `nginx` único) |

## Observações

**1. frontend/vite/host.** Build separado: pacote, lockfile e `vite build` próprios (frontend/vite/host/package.json:8), gerando o `dist` que o Dockerfile copia para `html/host` (config/nginx/Dockerfile:5). Deploy conjunto: esse `dist` entra na mesma imagem dos dois remotes, e o compose sobe um só serviço `nginx` (config/docker-compose.yaml:38-52). Ter um `server` próprio no nginx (config/nginx/nginx.conf:18-35) separa o endereço, não o artefato publicado. O host também é o destino do servidor TLS na raiz (config/nginx/nginx.conf:90-93), endereço em que os remotes o carregam como remote `host` (frontend/vite/remote-inputs/vite.config.js:23). Os três `package.json` têm o mesmo nome `vite-vue-starter` e `version: 0.0.0`, com `private: true` (frontend/vite/host/package.json:2-4), sem uso da versão em publicação: Versionamento `No`.

**2. frontend/vite/remote-inputs.** Mesmo arranjo: `vite build` próprio (frontend/vite/remote-inputs/package.json:8), com `base: '/remote-inputs/'` (frontend/vite/remote-inputs/vite.config.js:6) igual ao prefixo pelo qual o servidor TLS o encaminha à porta 3001 (config/nginx/nginx.conf:95-98) e ao endereço que o host usa para o `remoteEntry.js` (frontend/vite/host/vite.config.js:24). O `dist` vai para `html/remote-inputs` na imagem conjunta (config/nginx/Dockerfile:6). A revisão estrutural marca o diretório como `Undetermined` porque o `src/main.js` está vazio; isso não muda o build, que gera o `remoteEntry.js` servido pelo nginx. Sem versão própria (frontend/vite/remote-inputs/package.json:2-4).

**3. frontend/vite/remote-results.** Igual ao remote-inputs: `vite build` próprio (frontend/vite/remote-results/package.json:8), `base: '/remote-results/'` (frontend/vite/remote-results/vite.config.js:6), servido na porta 3002 e em `/remote-results/` (config/nginx/nginx.conf:55-71, 100-103), endereço do remote `remote_results` no host (frontend/vite/host/vite.config.js:29). O `dist` vai para a mesma imagem (config/nginx/Dockerfile:7). Sem versão própria (frontend/vite/remote-results/package.json:2-4).

## Resumo

Aplicações: 3. Build (separado: 3). Deploy (conjunto: 3). Versionamento independente: 0.
