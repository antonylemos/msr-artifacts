---
schema: 1
id: 1116305586
full_name: webdevqadeer/frontend-development
commit: f8d264873c9182d4f3a0628f18f7618b019a2f79
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

# 083 — webdevqadeer/frontend-development

## Leitura do repositório

O snapshot é um único monorepo npm workspaces em `react/mv-marketplace/`, com a biblioteca `mv-theme` e cinco aplicações Vite: `admin`, `buyer`, `payment`, `seller` e `shell` (react/mv-marketplace/package.json:4-11). O build é só local, por scripts npm. O `build` da raiz constrói primeiro o tema e depois cada aplicação em sequência, com `npm run build -w <nome>` (react/mv-marketplace/package.json:13-15). Cada aplicação tem `build: vite build` e `preview: vite preview` próprios (por exemplo react/mv-marketplace/apps/admin/package.json:6-11) e um `vite.config.js` próprio com `@originjs/vite-plugin-federation`. A saída `dist` de cada aplicação é ignorada pelo git (react/mv-marketplace/apps/admin/.gitignore:11). Para desenvolvimento, `dev:apps` sobe os cinco servidores com `concurrently` (react/mv-marketplace/package.json:18).

Não há nenhum artefato de deploy: nem Dockerfile, compose, workflow de CI, configuração de hospedagem ou proxy. O `matches.csv` não tem nenhuma ocorrência `ops-*`, `ci-*` ou `cfg-public-path`. Os READMEs das aplicações são o texto padrão do template React + Vite (react/mv-marketplace/apps/admin/README.md:1-3). Os únicos endereços do snapshot são de máquina local. Os remotes fixam a porta só no `preview` (5001–5004), e o shell busca cada `remoteEntry.js` em `http://localhost:500N/assets/` (react/mv-marketplace/apps/shell/vite.config.js:11-17). O shell fixa a porta 5173 no servidor de desenvolvimento (react/mv-marketplace/apps/shell/vite.config.js:21-25). É uma configuração de desenvolvimento e demonstração, sem publicação.

A biblioteca `mv-theme` gera um build de biblioteca ES/UMD em `dist` (react/mv-marketplace/packages/mvp-theme/vite.config.js:7-14). Ela é `private` e não tem script de publicação (react/mv-marketplace/packages/mvp-theme/package.json:3-12). Não é aplicação frontend na revisão estrutural, e por isso não tem linha na tabela. A pasta `react/mv-marketplace/node_modules/` do snapshot só tem lockfiles copiados das aplicações (por exemplo `node_modules/admin/package-lock.json`), sem configuração de build ou deploy.

## Aplicações

| # | Aplicação | Build | Deploy | Onde é servida | Versionamento | Artefatos |
|---|---|---|---|---|---|---|
| 1 | react/mv-marketplace/apps/admin | separado | não observado | `http://localhost:5003` (react/mv-marketplace/apps/admin/vite.config.js:20; react/mv-marketplace/apps/shell/vite.config.js:14) | No | react/mv-marketplace/apps/admin/vite.config.js:5-21 (configuração própria, gera `remoteEntry.js`); react/mv-marketplace/apps/admin/package.json:8 (`vite build`); react/mv-marketplace/package.json:15 (`npm run build -w admin`) |
| 2 | react/mv-marketplace/apps/buyer | separado | não observado | `http://localhost:5001` (react/mv-marketplace/apps/buyer/vite.config.js:20; react/mv-marketplace/apps/shell/vite.config.js:12) | No | react/mv-marketplace/apps/buyer/vite.config.js:5-21 (configuração própria, gera `remoteEntry.js`); react/mv-marketplace/apps/buyer/package.json:8 (`vite build`); react/mv-marketplace/package.json:15 (`npm run build -w buyer`) |
| 3 | react/mv-marketplace/apps/payment | separado | não observado | `http://localhost:5004` (react/mv-marketplace/apps/payment/vite.config.js:18; react/mv-marketplace/apps/shell/vite.config.js:15) | No | react/mv-marketplace/apps/payment/vite.config.js:5-19 (configuração própria, gera `remoteEntry.js`); react/mv-marketplace/apps/payment/package.json:8 (`vite build`); react/mv-marketplace/package.json:15 (`npm run build -w payment`) |
| 4 | react/mv-marketplace/apps/seller | separado | não observado | `http://localhost:5002` (react/mv-marketplace/apps/seller/vite.config.js:18; react/mv-marketplace/apps/shell/vite.config.js:13) | No | react/mv-marketplace/apps/seller/vite.config.js:5-19 (configuração própria, gera `remoteEntry.js`); react/mv-marketplace/apps/seller/package.json:8 (`vite build`); react/mv-marketplace/package.json:15 (`npm run build -w seller`) |
| 5 | react/mv-marketplace/apps/shell | separado | não observado | `http://localhost:5173` (react/mv-marketplace/apps/shell/vite.config.js:21-25) | No | react/mv-marketplace/apps/shell/vite.config.js:6-35 (configuração própria, saída `dist`); react/mv-marketplace/apps/shell/package.json:8 (`vite build`); react/mv-marketplace/package.json:15 (`npm run build -w shell`) |

## Observações

**1. react/mv-marketplace/apps/admin.** Build próprio: o `vite build` da aplicação (react/mv-marketplace/apps/admin/package.json:8) usa a configuração dela, que gera o `remoteEntry.js` do remote `admin_app` (react/mv-marketplace/apps/admin/vite.config.js:9-13). O script da raiz só dispara esse build (react/mv-marketplace/package.json:15). O deploy é `não observado`: o único endereço é a porta 5003 do `vite preview` (react/mv-marketplace/apps/admin/vite.config.js:20), que o shell usa (react/mv-marketplace/apps/shell/vite.config.js:14). A versão `0.0.0` de um pacote `private` (react/mv-marketplace/apps/admin/package.json:3-4) não é usada em publicação.

**2. react/mv-marketplace/apps/buyer.** Mesma forma do admin, com o remote `buyer_app` (react/mv-marketplace/apps/buyer/vite.config.js:9-13) e porta de preview 5001 (react/mv-marketplace/apps/buyer/vite.config.js:20). Build `separado`, deploy `não observado`, versão `0.0.0` sem uso (react/mv-marketplace/apps/buyer/package.json:3-4).

**3. react/mv-marketplace/apps/payment.** Mesma forma, com o remote declarado como `payment-app` (react/mv-marketplace/apps/payment/vite.config.js:9-11) e porta de preview 5004 (react/mv-marketplace/apps/payment/vite.config.js:18). A diferença entre esse nome e a chave `payment_app` do shell já está na revisão de composição e não muda build nem deploy. Versão `0.0.0` sem uso (react/mv-marketplace/apps/payment/package.json:3-4).

**4. react/mv-marketplace/apps/seller.** Mesma forma, com o remote `seller_app` (react/mv-marketplace/apps/seller/vite.config.js:9-11) e porta de preview 5002 (react/mv-marketplace/apps/seller/vite.config.js:18). Build `separado`, deploy `não observado`, versão `0.0.0` sem uso (react/mv-marketplace/apps/seller/package.json:3-4).

**5. react/mv-marketplace/apps/shell.** Configuração de build própria, com saída `dist` (react/mv-marketplace/apps/shell/vite.config.js:26-29), e `vite build` próprio (react/mv-marketplace/apps/shell/package.json:8). O artefato seria só do shell, porque os remotes entram por URL em execução (react/mv-marketplace/apps/shell/vite.config.js:11-17), por isso Build `separado`. Fica uma ressalva: a entrada importa `./App.jsx` (react/mv-marketplace/apps/shell/src/main.jsx:3), e o snapshot só tem `src/app.jsx`. Num sistema de arquivos sensível à caixa, esse build não resolve a entrada. É o motivo do `Undetermined` na revisão estrutural, mas não muda que o build é separado das demais aplicações. O único endereço é a porta 5173 do servidor de desenvolvimento (react/mv-marketplace/apps/shell/vite.config.js:21-25). O shell não fixa porta de preview, e nada o publica. Deploy `não observado`, versão `0.0.0` sem uso (react/mv-marketplace/apps/shell/package.json:3-4).

## Resumo

Aplicações: 5. Build (separado: 5). Deploy (não observado: 5). Versionamento independente: 0.
