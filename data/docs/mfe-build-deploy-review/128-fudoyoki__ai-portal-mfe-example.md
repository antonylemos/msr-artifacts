---
schema: 1
id: 1145815182
full_name: fudoyoki/ai-portal-mfe-example
commit: f1fd5b0a988c45334a49d3992ebc84cb6ea5ae94
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

# 128 — fudoyoki/ai-portal-mfe-example

## Leitura do repositório

Monorepo npm workspaces (`apps/*` e `packages/*`) orquestrado por Turborepo: o `build` da raiz só delega a `turbo run build` (package.json:5-11), e a task `build` do Turbo depende do build dos pacotes de que cada app depende e guarda `dist/**` (turbo.json:4-7). As duas aplicações frontend, `apps/shell` (host) e `apps/mfe-dashboard` (remote), têm o mesmo script `build` (`tsc && vite build`) e `vite.config.ts` próprio com `build.target: 'esnext'` (apps/shell/package.json:8; apps/shell/vite.config.ts:71-75; apps/mfe-dashboard/package.json:8; apps/mfe-dashboard/vite.config.ts:51-55). Os pacotes `packages/shared-types` e `packages/ui-kit` são bibliotecas compiladas com `tsup`, sem deploy. O snapshot não tem lockfile nem workflow de CI, e o `matches.csv` não tem ocorrências `ci-*` nem `cfg-public-path`.

O empacotamento de produção é por Docker. Cada aplicação frontend tem um Dockerfile de dois estágios com contexto na raiz: o estágio `builder` copia a raiz, `packages/` e só o diretório do próprio app, constrói `shared-types`, `ui-kit` e o app, e o estágio `production` (`nginx:alpine`) copia só o `dist` do app e o `nginx.conf` dele (apps/shell/Dockerfile:2-33; apps/mfe-dashboard/Dockerfile:2-33). O `docker-compose.yml` sobe uma imagem por serviço: `shell` na porta 3000, dependente de `mfe-dashboard` e `bff`, e `mfe-dashboard` na 3001 (docker-compose.yml:5-27); o serviço `mfe-chat` está só comentado (docker-compose.yml:29-37). Os `nginx.conf` servem o SPA do shell com fallback para `index.html` (apps/shell/nginx.conf:1-5, 24-26) e o dashboard com CORS aberto e sem fallback (apps/mfe-dashboard/nginx.conf:1-9, 28-30); ambos desligam o cache de `remoteEntry.js` (apps/shell/nginx.conf:18-21; apps/mfe-dashboard/nginx.conf:22-26). O `.dockerignore` exclui `dist/` e `node_modules/` do contexto (.dockerignore:1-8).

Há dois caminhos de produção que não se encontram no snapshot. O compose publica o dashboard num contêiner próprio na porta 3001, mas o shell, fora de desenvolvimento, aponta o remote para `${CDN_URL}/mfeDashboard/remoteEntry.js`, com `https://cdn.example.com` como padrão (apps/shell/vite.config.ts:5, 17-23); os Dockerfiles não definem `CDN_URL` nem `NODE_ENV` (apps/shell/Dockerfile:14-20; docker-compose.yml:5-16), e o `/assets/remoteEntry.js` em `localhost:3001` vale só no ramo de desenvolvimento (apps/shell/vite.config.ts:18-19). O README descreve outra publicação, por `npm run build` e `aws s3 sync` de cada `dist` para `s3://cdn/shell/` e `s3://cdn/mfe-dashboard/` (README.md:185-196, ocorrências `ops-hosting`), com um prefixo `mfe-dashboard` diferente do `mfeDashboard` que o shell espera; pela regra, o README não decide a coluna Deploy. O `docker-compose.dev.yml` é de desenvolvimento: roda `npm run dev` (Vite) de cada workspace em `node:22-alpine` com o código montado (docker-compose.dev.yml:8-37) e não conta como deploy. As ocorrências `cors: true` do `server` do Vite também são só de desenvolvimento (apps/shell/vite.config.ts:62-66; apps/mfe-dashboard/vite.config.ts:42-46).

Fora das aplicações frontend, `apps/bff` (NestJS) tem Dockerfile próprio, com `npm run build`, usuário não root e healthcheck em `/api/health` (apps/bff/Dockerfile:2-43), e serviço `bff` na porta 4000 no compose (docker-compose.yml:40-58), além do serviço de desenvolvimento (docker-compose.dev.yml:40-52).

## Aplicações

| # | Aplicação | Build | Deploy | Onde é servida | Versionamento | Artefatos |
|---|---|---|---|---|---|---|
| 1 | apps/mfe-dashboard | separado | separado | porta 3001 (apps/mfe-dashboard/nginx.conf:2; docker-compose.yml:23-24); `${CDN_URL}/mfeDashboard/remoteEntry.js`, padrão `https://cdn.example.com`, como o shell espera em produção (apps/shell/vite.config.ts:22) | No | apps/mfe-dashboard/package.json:8 (`tsc && vite build`); apps/mfe-dashboard/vite.config.ts:8-56 (configuração própria, gera `remoteEntry.js`); apps/mfe-dashboard/Dockerfile:2-33 (build do app e imagem nginx só com o `dist` dele); apps/mfe-dashboard/nginx.conf:1-38 (servidor do remote, com CORS); docker-compose.yml:19-27 (serviço `mfe-dashboard`) |
| 2 | apps/shell | separado | separado | porta 3000 (apps/shell/nginx.conf:2; docker-compose.yml:9-10) | No | apps/shell/package.json:8 (`tsc && vite build`); apps/shell/vite.config.ts:25-76 (configuração própria, consome o remote por URL); apps/shell/Dockerfile:2-33 (build do app e imagem nginx só com o `dist` dele); apps/shell/nginx.conf:1-34 (servidor do SPA); docker-compose.yml:5-16 (serviço `shell`) |

## Observações

**1. apps/mfe-dashboard.** Build separado: script e `vite.config.ts` próprios, que geram o `dist` do remote `mfeDashboard` com `remoteEntry.js` (apps/mfe-dashboard/package.json:8; apps/mfe-dashboard/vite.config.ts:11-17); os pacotes compartilhados são construídos à parte e declarados como `shared` (apps/mfe-dashboard/Dockerfile:18-19; apps/mfe-dashboard/vite.config.ts:20-39). Deploy separado: imagem própria, cujo estágio final copia só `apps/mfe-dashboard/dist` (apps/mfe-dashboard/Dockerfile:23-29), publicada pelo serviço `mfe-dashboard` do compose na porta 3001 (docker-compose.yml:19-24). O `nginx.conf` dele é feito para servir um remote: CORS `*` em todas as respostas e de novo em `remoteEntry.js`, sem cache para esse arquivo (apps/mfe-dashboard/nginx.conf:6-9, 21-26). O endereço que o shell usa em produção é outro, um CDN configurável (apps/shell/vite.config.ts:22), que nenhum artefato do snapshot publica. Versionamento `No`: `version: "0.1.0"` com `private: true` (apps/mfe-dashboard/package.json:2-4), sem uso em publicação.

**2. apps/shell.** Build separado: `tsc && vite build` com configuração própria (apps/shell/package.json:8; apps/shell/vite.config.ts:25-76); o código do dashboard não entra no artefato, que só guarda a URL do `remoteEntry.js` (apps/shell/vite.config.ts:30-31). Deploy separado: imagem própria com só `apps/shell/dist` (apps/shell/Dockerfile:23-29) e serviço `shell` na porta 3000 (docker-compose.yml:5-10); o `depends_on` só ordena a subida dos contêineres (docker-compose.yml:11-13). Como a URL do remote é fixada no build (apps/shell/vite.config.ts:17-23) e a imagem não define `CDN_URL` (apps/shell/Dockerfile:14-20), trocar o endereço do dashboard exige reconstruir o shell. Versionamento `No`: `version: "0.1.0"` com `private: true` (apps/shell/package.json:2-4).

## Resumo

Aplicações: 2. Build (separado: 2). Deploy (separado: 2). Versionamento independente: 0.
