---
schema: 1
id: 1170818206
full_name: nikJovanovic/ita-vaje
commit: 842a007f3e2690f8a521f951fc899c4af560e931
inputs:
  mining:
    output: data/mining/mfe-mining-001
    version: "1"
    config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 013 — nikJovanovic/ita-vaje

## Leitura do repositório

Não há workspace: o `package.json` da raiz só declara `@biomejs/biome` (package.json:1-6). Cada
uma das quatro apps Next.js (`shell`, `catalog-mfe`, `builds-mfe`, `auth-mfe`) tem manifesto e
lockfile próprios e o mesmo script `build: next build` (ex.: shell/package.json:7). O build gera
um servidor `standalone` (ex.: shell/next.config.ts:5). Os `next.config.ts` das zonas definem o
`assetPrefix` que o shell usa para encaminhar os assets (ex.: catalog-mfe/next.config.ts:6).

Cada app tem um Dockerfile próprio em três estágios: instala as dependências, roda `bun run build`
e copia `.next/standalone`, `.next/static` e `public` para a imagem final, que sobe com
`bun server.js` (ex.: catalog-mfe/Dockerfile:1-20). As imagens diferem só na porta exposta: 3000
no shell, 3001 no catalog, 3002 no builds e 3003 no auth (shell/Dockerfile:25,
catalog-mfe/Dockerfile:19, builds-mfe/Dockerfile:19, auth-mfe/Dockerfile:19). O Dockerfile do
shell recebe os endereços das zonas como build args (shell/Dockerfile:8-13), e o compose os passa
(docker-compose.yml:199-202). Assim, o endereço de cada zona entra no build do shell, onde o
`rewrites()` é avaliado (shell/next.config.ts:6-9), e também entra como variável em tempo de
execução (docker-compose.yml:209-211).

O `docker-compose.yml` sobe tudo numa stack: Postgres, RabbitMQ, `grpcox`, os três serviços, os
dois BFFs e as quatro apps, cada uma como serviço próprio com `build` do seu diretório
(docker-compose.yml:157-158, 170-171, 183-184, 196-198). O shell depende das três zonas
(docker-compose.yml:214-217) e é a entrada na porta 3000 (docker-compose.yml:205). É uma stack de
execução local com imagens de produção (`NODE_ENV=production`, ex.: shell/Dockerfile:20). Não há
manifesto de hospedagem, proxy à frente do shell nem registro de imagens.

A CI tem um workflow por diretório, disparado por `paths` do próprio diretório (ex.:
.github/workflows/shell.yml:3-7). Nos quatro frontends, o job instala, roda lint, build e testes
(.github/workflows/shell.yml:24-32; os de `catalog-mfe`, `builds-mfe` e `auth-mfe` só mudam nome,
`paths` e `working-directory`). Nenhum workflow publica imagem nem faz deploy, então a CI sustenta
build separado, mas não deploy.

Artefatos que não cobrem frontend: os Dockerfiles de `parts-service`, `builds-service`,
`users-service`, `web-bff` e `mobile-bff` (ex.: web-bff/Dockerfile:1-21, users-service/Dockerfile:1-15),
seus serviços no compose (docker-compose.yml:14-15, 33-34, 73-74, 101-102, 129-130), os serviços
de infraestrutura (docker-compose.yml:2-3, 58-59, 95-96) e os workflows de teste desses diretórios
(ex.: .github/workflows/web-bff.yml:9-31; .github/workflows/users-service.yml:3-11, com gatilho
também em `pull_request`). O README diz que as zonas são "deployed independently" (README.md:69).

## Aplicações

| # | Aplicação | Build | Deploy | Onde é servida | Versionamento | Artefatos |
|---|---|---|---|---|---|---|
| 1 | auth-mfe | separado | separado | `/auth` e `/auth-static/_next/*` pelo shell (shell/next.config.ts:23-28); `http://auth-mfe:3003` no compose (docker-compose.yml:211); porta 3003 (docker-compose.yml:161) | No | auth-mfe/package.json:7 (`next build`); auth-mfe/next.config.ts:5-6 (`standalone`, `assetPrefix`); auth-mfe/Dockerfile:10, 15-20 (build e imagem própria); docker-compose.yml:157-158 (serviço `auth-mfe`); .github/workflows/auth-mfe.yml:5-7, 15 (CI própria, sem deploy) |
| 2 | builds-mfe | separado | separado | `/builds` e `/builds-static/_next/*` pelo shell (shell/next.config.ts:17-22); `http://builds-mfe:3002` no compose (docker-compose.yml:210); porta 3002 (docker-compose.yml:187) | No | builds-mfe/package.json:7 (`next build`); builds-mfe/next.config.ts:5-6 (`standalone`, `assetPrefix`); builds-mfe/Dockerfile:10, 15-20 (build e imagem própria); docker-compose.yml:183-184 (serviço `builds-mfe`); .github/workflows/builds-mfe.yml:5-7, 15 (CI própria, sem deploy) |
| 3 | catalog-mfe | separado | separado | `/catalog` e `/catalog-static/_next/*` pelo shell (shell/next.config.ts:11-16); `http://catalog-mfe:3001` no compose (docker-compose.yml:209); porta 3001 (docker-compose.yml:174) | No | catalog-mfe/package.json:7 (`next build`); catalog-mfe/next.config.ts:5-6 (`standalone`, `assetPrefix`); catalog-mfe/Dockerfile:10, 15-20 (build e imagem própria); docker-compose.yml:170-171 (serviço `catalog-mfe`); .github/workflows/catalog-mfe.yml:5-7, 15 (CI própria, sem deploy) |
| 4 | shell | separado | separado | `/` na porta 3000 (docker-compose.yml:205; shell/Dockerfile:25) | No | shell/package.json:7 (`next build`); shell/next.config.ts:5-30 (`standalone`, `rewrites`); shell/Dockerfile:8-16, 21-26 (build com endereços das zonas e imagem própria); docker-compose.yml:196-202 (serviço `shell` com build args); .github/workflows/shell.yml:5-7, 15 (CI própria, sem deploy) |

## Observações

**1. auth-mfe.** Build próprio (auth-mfe/package.json:7; auth-mfe/Dockerfile:10), que gera uma
imagem só dele (auth-mfe/Dockerfile:12-20). O compose o publica como serviço próprio, construído
de `./auth-mfe` (docker-compose.yml:157-158), por isso o deploy é `separado`. O usuário o acessa
pelo shell, em `/auth`, e os assets em `/auth-static` (shell/next.config.ts:23-28;
auth-mfe/next.config.ts:6). A porta 3003 também é publicada diretamente (docker-compose.yml:161).
O campo `version: "0.1.0"` (auth-mfe/package.json:3) não é usado em nenhuma publicação, e a app é
`private` (auth-mfe/package.json:4), então Versionamento é `No`.

**2. builds-mfe.** Mesma forma que o auth-mfe: build e imagem próprios (builds-mfe/Dockerfile:10,
12-20) e serviço próprio no compose (docker-compose.yml:183-184). Servido pelo shell em `/builds`
(shell/next.config.ts:17-22), com assets em `/builds-static` (builds-mfe/next.config.ts:6). Ele
compartilha com as outras apps o BFF (`WEB_BFF_URL`, docker-compose.yml:192), mas isso é backend,
não empacotamento conjunto. `version: "0.1.0"` sem uso (builds-mfe/package.json:3).

**3. catalog-mfe.** Mesma forma: build e imagem próprios (catalog-mfe/Dockerfile:10, 12-20) e
serviço próprio no compose (docker-compose.yml:170-171). Servido pelo shell em `/catalog`
(shell/next.config.ts:11-16), com assets em `/catalog-static` (catalog-mfe/next.config.ts:6).
`version: "0.1.0"` sem uso (catalog-mfe/package.json:3).

**4. shell.** Build e imagem próprios (shell/Dockerfile:16, 18-26) e serviço próprio no compose
(docker-compose.yml:196-198), na porta 3000 (docker-compose.yml:205). Diferente das zonas, seu
build recebe os endereços das três zonas (shell/Dockerfile:8-13; docker-compose.yml:199-202). O
artefato não contém código das zonas, mas o roteamento que ele leva depende de onde elas estão.
Ainda assim, cada zona continua em imagem e serviço separados, então o deploy fica `separado`. O
serviço espera as três zonas para subir (docker-compose.yml:214-217). `version: "0.1.0"` sem uso
(shell/package.json:3).

## Resumo

Aplicações: 4. Build (separado: 4). Deploy (separado: 4). Versionamento independente: 0.
