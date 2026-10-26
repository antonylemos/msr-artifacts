---
schema: 1
id: 1031213794
full_name: Axiean/micro-store
commit: 7ed9142db806ba9851416ae0b8bb207d5d10bdca
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

# 237 — Axiean/micro-store

## Leitura do repositório

Não há `package.json` na raiz nem workspace: o snapshot tem só `README.md`, `docker-compose.yml`
e os diretórios `cart-app` e `store-app`. Cada um é uma app Next.js com manifesto e
`package-lock.json` próprios e o mesmo script `build: next build` (cart-app/package.json:7;
store-app/package.json:7). As duas geram um servidor `standalone` (cart-app/next.config.ts:14;
store-app/next.config.ts:10). O `cart-app` fica sob `basePath: "/cart"` (cart-app/next.config.ts:4),
e o `store-app` declara o `rewrites()` que encaminha `/cart/:path*` para
`http://cart-app:3000/cart/:path*` (store-app/next.config.ts:32-41).

Cada app tem um Dockerfile próprio, idêntico nos dois diretórios, em quatro estágios: imagem base
`node:22-alpine`, instalação das dependências pelo lockfile encontrado, `npm run build` e uma
imagem final com `NODE_ENV=production` que copia `public`, `.next/standalone` e `.next/static` e
sobe com `node server.js` na porta 3000 (cart-app/Dockerfile:4-33; store-app/Dockerfile:4-33).

O `docker-compose.yml` sobe as duas apps como serviços próprios, cada um com `build` do seu
diretório: `store-app`, publicado na porta 3000 do host (docker-compose.yml:8-15), e `cart-app`,
publicado na 3001 e mapeado para a 3000 interna (docker-compose.yml:20-28). O hostname `cart-app`
do rewrite é o nome desse serviço. O comentário do arquivo diz que ele serve à configuração de
"development and deployment" (docker-compose.yml:2-3); é uma stack local, com imagens de produção,
sem registro de imagens, proxy à frente do `store-app` ou manifesto de hospedagem. Não há CI no
snapshot. O README manda subir tudo com `docker-compose up --build` e acessar a loja em
`http://localhost:3000` e o carrinho em `http://localhost:3000/cart` (README.md:53, 59-60).

Não há artefato de build ou deploy fora dos frontends. As ocorrências `ops-hosting` são o README
padrão do create-next-app (cart-app/README.md:21, 30, 32, 34; store-app/README.md:21, 30, 32, 34),
que sugere a Vercel, sem configuração de hospedagem no snapshot.

## Aplicações

| # | Aplicação | Build | Deploy | Onde é servida | Versionamento | Artefatos |
|---|---|---|---|---|---|---|
| 1 | cart-app | separado | separado | `/cart` pelo store-app (store-app/next.config.ts:36-39; cart-app/next.config.ts:4); `http://cart-app:3000/cart` no compose (store-app/next.config.ts:39); porta 3001 (docker-compose.yml:28) | No | cart-app/package.json:7 (`next build`); cart-app/next.config.ts:4, 14 (`basePath`, `standalone`); cart-app/Dockerfile:22, 25-33 (build e imagem própria); docker-compose.yml:20-28 (serviço `cart-app`) |
| 2 | store-app | separado | separado | `/` na porta 3000 (docker-compose.yml:15; store-app/Dockerfile:32) | No | store-app/package.json:7 (`next build`); store-app/next.config.ts:10, 32-41 (`standalone`, `rewrites`); store-app/Dockerfile:22, 25-33 (build e imagem própria); docker-compose.yml:8-15 (serviço `store-app`) |

## Observações

**1. cart-app.** Build próprio (cart-app/package.json:7; cart-app/Dockerfile:22), que gera uma
imagem só dele (cart-app/Dockerfile:25-33). O compose o publica como serviço próprio, construído
de `./cart-app` (docker-compose.yml:20-23), por isso o deploy é `separado`. O usuário o acessa
pelo `store-app`, em `/cart` (store-app/next.config.ts:36-39), e também direto pela porta 3001
(docker-compose.yml:28), que o comentário reserva a desenvolvimento e teste isolados
(docker-compose.yml:26-27). O endereço do destino está fixo no `next.config.ts` do `store-app`, sem
variável de ambiente nem build arg, então a ligação entre as duas imagens depende do nome do
serviço no compose. O campo `version: "0.1.0"` (cart-app/package.json:3) não é usado em nenhuma
publicação, e a app é `private` (cart-app/package.json:4), então Versionamento é `No`.

**2. store-app.** Mesma forma que o `cart-app`: build e imagem próprios (store-app/package.json:7;
store-app/Dockerfile:22, 25-33) e serviço próprio no compose, construído de `./store-app`
(docker-compose.yml:8-11). É a entrada da loja, em `/` na porta 3000 (docker-compose.yml:15;
`EXPOSE 3000` em store-app/Dockerfile:32), e embute no seu build o rewrite para o `cart-app`
(store-app/next.config.ts:32-41). O compose não declara `depends_on` entre os serviços
(docker-compose.yml:5-29). `version: "0.1.0"` sem uso e app `private` (store-app/package.json:3-4).

## Resumo

Aplicações: 2. Build (separado: 2). Deploy (separado: 2). Versionamento independente: 0.
