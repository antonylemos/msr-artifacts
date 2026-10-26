---
schema: 1
id: 1015183048
full_name: harshad-eden/module-federation
commit: dde74e678a749ccbf3951e173bf980649034c5d4
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

# 202 — harshad-eden/module-federation

## Leitura do repositório

Monorepo pnpm (`apps/*` e `packages/*`, package.json:6-9) com quatro aplicações React/Vite, cada uma com `vite.config.ts` e script `build` próprios (`tsc && vite build`, por exemplo apps/shell/package.json:7). O `build` da raiz primeiro constrói os pacotes compartilhados `shared-types` e `shared-ui` e depois dispara, em paralelo, o build de cada aplicação no seu diretório (package.json:16-22). Há também `preview` por aplicação, cada uma na sua porta (package.json:23-27; por exemplo apps/sales-portal/package.json:8), e uma variante `yarn:build` que roda o build de todos os workspaces (package.json:31). Cada aplicação gera, portanto, o seu próprio `dist`. Os remotes geram um `remoteEntry.js` (por exemplo apps/sales-portal/vite.config.ts:9-13).

Não há artefato de deploy no snapshot: nenhum workflow de CI, Dockerfile, compose ou `vercel.json`. Tudo o que existe é configuração de desenvolvimento. As portas 3000–3004 são as dos servidores Vite e do `preview` (por exemplo apps/shell/vite.config.ts:23-25). Os cabeçalhos CORS apontados pelo `ops-cors` pertencem ao bloco `server` do servidor de desenvolvimento dos remotes (apps/sales-portal/vite.config.ts:25-31; apps/underwriter-portal/vite.config.ts:25-31; apps/product-config/vite.config.ts:25-31). O shell busca os remotes em URLs fixas de `localhost` (apps/shell/vite.config.ts:10-14).

Todas as ocorrências `ops-hosting` estão em `DEPLOYMENT_GUIDE.md`, um guia de publicação na Vercel. Ele descreve três estratégias: um projeto Vercel por aplicação, com domínio próprio (DEPLOYMENT_GUIDE.md:35-46, 134-157); um monorepo com um `vercel.json` na raiz e outro em cada aplicação (DEPLOYMENT_GUIDE.md:161-214); e um projeto único com subdiretórios e rewrites (DEPLOYMENT_GUIDE.md:221-232). O guia também propõe variáveis de ambiente para as URLs dos remotes (DEPLOYMENT_GUIDE.md:52-64, 257-267). Nenhum desses arquivos existe no snapshot, e as URLs continuam fixas em `localhost`. O guia ainda inclui `employer-portal` e `service-provider` (DEPLOYMENT_GUIDE.md:44, 46, 140, 142), que não existem. Como documentação, ele não decide a coluna Deploy e fica para a 3.4.7. O README fala em implantação independente de cada domínio (README.md:3, 7), também sem artefato que a sustente.

## Aplicações

| # | Aplicação | Build | Deploy | Onde é servida | Versionamento | Artefatos |
|---|---|---|---|---|---|---|
| 1 | apps/product-config | separado | não observado | `http://localhost:3004`, servidor de desenvolvimento e `preview` (apps/product-config/vite.config.ts:26; apps/product-config/package.json:6, 8); `remoteEntry.js` buscado pelo shell em `http://localhost:3004/dist/assets/remoteEntry.js` (apps/shell/vite.config.ts:13) | No | apps/product-config/vite.config.ts:5-33 (configuração própria, `remoteEntry.js`); apps/product-config/package.json:7 (`tsc && vite build`); package.json:22 (`build:product` dispara o build no diretório) |
| 2 | apps/sales-portal | separado | não observado | `http://localhost:3001`, servidor de desenvolvimento e `preview` (apps/sales-portal/vite.config.ts:26; apps/sales-portal/package.json:6, 8); `remoteEntry.js` buscado pelo shell em `http://localhost:3001/dist/assets/remoteEntry.js` (apps/shell/vite.config.ts:11) | No | apps/sales-portal/vite.config.ts:5-33 (configuração própria, `remoteEntry.js`); apps/sales-portal/package.json:7 (`tsc && vite build`); package.json:20 (`build:sales` dispara o build no diretório) |
| 3 | apps/shell | separado | não observado | `http://localhost:3000`, servidor de desenvolvimento e `preview` (apps/shell/vite.config.ts:24; apps/shell/package.json:6, 8) | No | apps/shell/vite.config.ts:5-26 (configuração própria, host); apps/shell/package.json:7 (`tsc && vite build`); package.json:19 (`build:shell` dispara o build no diretório) |
| 4 | apps/underwriter-portal | separado | não observado | `http://localhost:3002`, servidor de desenvolvimento e `preview` (apps/underwriter-portal/vite.config.ts:26; apps/underwriter-portal/package.json:6, 8); `remoteEntry.js` buscado pelo shell em `http://localhost:3002/dist/assets/remoteEntry.js` (apps/shell/vite.config.ts:12) | No | apps/underwriter-portal/vite.config.ts:5-33 (configuração própria, `remoteEntry.js`); apps/underwriter-portal/package.json:7 (`tsc && vite build`); package.json:21 (`build:underwriter` dispara o build no diretório) |

## Observações

**1. apps/product-config.** Build próprio: um `vite build` no diretório da aplicação, com saída própria e o `remoteEntry.js` declarado na federação (apps/product-config/vite.config.ts:8-15). O script da raiz só o dispara (package.json:22). O deploy é `não observado`: o único endereço é o servidor local da porta 3004. O guia propõe um projeto Vercel `insurance-product.vercel.app` (DEPLOYMENT_GUIDE.md:45, 141), mas sem artefato no snapshot. A versão `1.0.0` (apps/product-config/package.json:3) não é usada em nenhuma publicação.

**2. apps/sales-portal.** Mesmo arranjo do product-config: build próprio (apps/sales-portal/package.json:7; apps/sales-portal/vite.config.ts:8-15), disparado pela raiz (package.json:20), e deploy `não observado`, só com o servidor local da porta 3001, que no `dev` usa `--strictPort` (apps/sales-portal/package.json:6). O domínio Vercel do guia (DEPLOYMENT_GUIDE.md:42, 138) não tem artefato. A versão não é usada.

**3. apps/shell.** Host com build próprio (apps/shell/package.json:7) e sem `filename` nem `exposes` (apps/shell/vite.config.ts:8-16). Os endereços dos remotes ficam embutidos no build como URLs de `localhost` (apps/shell/vite.config.ts:11-13). Um build do shell só funcionaria, portanto, com os remotes servidos localmente. O guia propõe trocá-las por variáveis de ambiente (DEPLOYMENT_GUIDE.md:52-59), o que não foi feito. O deploy é `não observado`, e a versão não é usada.

**4. apps/underwriter-portal.** Igual aos outros remotes: build próprio (apps/underwriter-portal/package.json:7; apps/underwriter-portal/vite.config.ts:8-15), disparado pela raiz (package.json:21), servidor local na porta 3002 e deploy `não observado`. O domínio do guia (DEPLOYMENT_GUIDE.md:43, 139) não tem artefato. A versão não é usada.

## Resumo

Aplicações: 4. Build (separado: 4). Deploy (não observado: 4). Versionamento independente: 0.
