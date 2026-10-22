---
schema: 1
id: 1297539319
full_name: Efraim0601/union-portal
commit: b11a3e3aa55aff8195e0cde0026ccbd45245266d
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

# 059 — Efraim0601/union-portal

## Leitura do repositório

Workspace Angular CLI. As três aplicações frontend compartilham o manifesto e o lockfile da raiz (package.json:1-17), instalados uma vez para os três builds (Dockerfile:13-14, 20-22); o único outro manifesto é o do backend `server/diaspora-otp`, com lockfile próprio (server/diaspora-otp/package.json:2-3; deploy/test/Dockerfile.otp:7). Cada aplicação (`shell`, `promote`, `diaspora`) é um projeto do `angular.json` com target `build` próprio, que usa o builder do Native Federation sobre um target `esbuild` (ex.: angular.json:52-64, 76-80). Os scripts da raiz disparam os builds um a um (package.json:14, `build:all`). Em desenvolvimento, cada aplicação roda no seu `ng serve`: shell na porta 4200, promote na 4201 e diaspora na 4202 (angular.json:139, 264, 391). Os dois remotes liberam CORS (angular.json:267, 394) porque o shell, em outra porta, busca o `remoteEntry.json` deles.

O deploy junta tudo numa **imagem única**, descrita como gateway que "sert shell + promote + diaspora" numa só origem (Dockerfile:1-3). O primeiro estágio instala as dependências uma vez e roda os três builds, cada um com seu `base-href` (Dockerfile:13-14, 20-22). O segundo estágio copia os três artefatos para o mesmo nginx: o shell na raiz e os remotes em `/remotes/promote/` e `/remotes/diaspora/` (Dockerfile:38-41). Por fim, troca o manifesto de federação de desenvolvimento pelo de produção (Dockerfile:42-43). O nginx serve cada caminho (deploy/nginx.conf:2-4, 31-40) e manda o restante para o `index.html` do shell (deploy/nginx.conf:128-130). A mesma origem é uma escolha declarada: permite compartilhar o `localStorage` de autenticação sem CORS (deploy/nginx.conf:5). O mesmo nginx também faz proxy das APIs dos backends (deploy/nginx.conf:72-123) e serve na raiz uma cópia dos arquivos do MediaPipe que vive no build do diaspora (deploy/nginx.conf:51-52). Esses dois pontos acoplam as aplicações dentro da imagem.

Há três formas de subir essa imagem, e nenhuma separa as aplicações:
- **docker-compose.yml:** declara um único serviço, `union` (docker-compose.yml:18-23).
- **deploy/test/docker-compose.yml:** stack de teste com a mesma imagem como `gateway` (deploy/test/docker-compose.yml:15-19), mais dois backends, `diaspora-otp` e `diaspora-ocr` (deploy/test/docker-compose.yml:32-48), com Dockerfiles próprios (deploy/test/Dockerfile.otp:5-9; deploy/test/Dockerfile.ocr:5-12).
- **deploy/server/deploy.sh:** script de produção que implanta a solução por componentes, lidos de deploy/server/components.env (deploy/server/deploy.sh:35-40). Para cada um, reconstrói a imagem e recria o serviço (deploy/server/deploy.sh:130-153). O portal inteiro é um componente só, `union` (deploy/server/components.env:15, 61-73), ao lado de backends que estão em outros repositórios (deploy/server/components.env:22-26, 35-39, 50-54). O deploy/server/stop.sh desliga pelo mesmo manifesto (deploy/server/stop.sh:15-18, 26-34).

O script deploy/40-selfsigned-cert.sh, instalado na imagem (Dockerfile:34-36), gera o certificado TLS na partida do contêiner (deploy/40-selfsigned-cert.sh:16-27). Não há CI no repositório.

## Aplicações

| # | Aplicação | Build | Deploy | Onde é servida | Versionamento | Artefatos |
|---|---|---|---|---|---|---|
| 1 | projects/diaspora | separado | conjunto | `/remotes/diaspora/` na imagem (Dockerfile:41; deploy/nginx.conf:37-40); `http://localhost:4202` em desenvolvimento (angular.json:391) | No | angular.json:305-317 (target `build` do diaspora); Dockerfile:22 (`ng build diaspora --base-href /remotes/diaspora/`); Dockerfile:41 (copia o build para a imagem conjunta); deploy/federation.manifest.prod.json:3 (endereço de produção) |
| 2 | projects/promote | separado | conjunto | `/remotes/promote/` na imagem (Dockerfile:40; deploy/nginx.conf:31-34); `http://localhost:4201` em desenvolvimento (angular.json:264) | No | angular.json:178-190 (target `build` do promote); Dockerfile:21 (`ng build promote --base-href /remotes/promote/`); Dockerfile:40 (copia o build para a imagem conjunta); deploy/federation.manifest.prod.json:2 (endereço de produção) |
| 3 | projects/shell | separado | conjunto | `/` na imagem (Dockerfile:38; deploy/nginx.conf:128-130); `http://localhost:4200` em desenvolvimento (angular.json:139) | No | angular.json:52-64 (target `build` do shell); Dockerfile:20 (`ng build shell --base-href /`); Dockerfile:38 (copia o build para a raiz da imagem); Dockerfile:43 (manifesto de produção na raiz do shell) |

## Observações

**1. projects/diaspora.** O build é separado: target próprio no `angular.json` e invocação própria no Dockerfile, com `base-href` alinhado ao caminho onde será servido (Dockerfile:22). O deploy é conjunto: no deploy observado, o artefato é incluído na imagem do portal (Dockerfile:41), que é um único serviço no compose e um único componente no deploy.sh (docker-compose.yml:19-23; deploy/server/components.env:65-70). Não foi observado versionamento próprio. O manifesto compartilhado declara `version: 0.0.0` (package.json:3), sem uso observado desse campo na publicação das aplicações. O build do diaspora também carrega os arquivos do MediaPipe que o nginx serve na raiz para as duas aplicações (deploy/nginx.conf:42-52), uma dependência de deploy entre unidades.

**2. projects/promote.** Mesmo arranjo do diaspora: target e invocação próprios (angular.json:178-190; Dockerfile:21), artefato copiado para `/remotes/promote/` na mesma imagem (Dockerfile:40). Sem versão própria.

**3. projects/shell.** Build separado (angular.json:52-64; Dockerfile:20), servido na raiz da mesma imagem (Dockerfile:38). O build é separado, mas não isolado nas fontes: os estilos do shell incluem o `styles.css` do promote (angular.json:87-90). O shell é a aplicação que recebe o manifesto de produção (Dockerfile:43). É esse manifesto que liga os caminhos de deploy dos remotes ao carregamento em runtime; pelo fluxo de deploy registrado, alterar o manifesto incorporado implica reconstruir e republicar a imagem conjunta (deploy/server/deploy.sh:153). Sem versão própria observada.

## Resumo

Aplicações: 3. Build (separado: 3). Deploy (conjunto: 3). Versionamento independente: 0.
