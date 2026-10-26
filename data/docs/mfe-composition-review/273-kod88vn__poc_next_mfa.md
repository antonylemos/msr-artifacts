---
schema: 1
id: 1208265953
full_name: kod88vn/poc_next_mfa
commit: d20db8260825dc17ad4c68ac6df0595c1c59df23
inputs:
  mining:
    output: data/mining/mfe-mining-001
    version: "1"
    config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
  inspection:
    output: data/inspections/mfe-dependencies-001
    version: "1"
    config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 273 — kod88vn/poc_next_mfa

## Leitura do repositório

Prova de conceito de Next.js 16 Multi-Zones num monorepo npm workspaces + Turborepo
(README.md:1, 3). Três aplicações Next.js: `apps/shell` (porta 3000), o host com a página inicial
e a navegação global (README.md:18; apps/shell/package.json:7, 9); `apps/shop` (porta 3001), a
listagem e o detalhe de produtos sob `basePath: '/shop'` (apps/shop/next.config.js:19;
apps/shop/package.json:7, 9); e `apps/duda` (porta 3002), sob `basePath: '/duda'`
(apps/duda/next.config.js:6; apps/duda/package.json:7, 9). A biblioteca `packages/ui` (`@repo/ui`)
fornece o `Header` comum e é compilada dentro de cada app por `transpilePackages`
(apps/shell/next.config.js:9); é código compartilhado, não unidade.

A composição é por rota no servidor, não por montagem na página. O shell declara em `rewrites()`
que `/duda` vai para `http://localhost:3002/duda` e que `/shop` e `/shop/:path*` vão para
`http://localhost:3001/shop...` (apps/shell/next.config.js:25-43); o comentário chama isso de
"MULTI-ZONE ROUTING — the core MFE \"string\"" (apps/shell/next.config.js:12). As zonas respondem
no caminho declarado pelo seu `basePath` e liberam CORS para a origem do shell
(apps/shop/next.config.js:29-41; apps/duda/next.config.js:10-22). Cada zona renderiza a página
inteira com layout próprio. Como em 013 e 237, nenhum dos tipos `host → remote`,
`root-config → application`, `application → custom-element` ou `page → embedded-frontend` descreve
essa forma de entrada, por isso as duas relações de rota estão como `other`.

A segunda ligação é o contador do carrinho. A Server Action `addToCart` do shop grava o cookie
`mfe_cart_count` com `path: '/'` (apps/shop/app/actions.ts:26-31), e os layouts do shell e da duda
o leem e passam como `cartCount` ao `Header` (apps/shell/app/layout.tsx:29-32, 58;
apps/duda/app/layout.tsx:24-27, 82). O README descreve o cookie como compartilhado "by both zones"
(README.md:13, 72), escrito antes da zona duda, que também o lê.

O que não virou relação: a navegação entre zonas é por link de página inteira (`<a href="/shop">`
e `<a href="/duda">` em apps/shell/app/page.tsx:67-78 e no `Header` compartilhado,
packages/ui/src/Header.tsx:73-85), que não é tipo de relação. A zona duda busca no servidor o HTML
de um site externo do construtor Duda e o injeta na página (apps/duda/app/page.tsx:10-13); esse
site não é unidade do repositório, e a única ocorrência de `<iframe` no código é a sanitização que
remove iframes desse HTML (apps/duda/lib/duda-landing.ts:387). Particularidade do rewrite da duda:
cobre só `/duda`, sem a forma `/duda/:path*` que o shop tem (apps/shell/next.config.js:29 e 39).

## Relações

| # | Origem | Destino | Tipo | Direção | Mecanismo | No snapshot | Ativa | Configuração | Código |
|---|---|---|---|---|---|---|---|---|---|
| 1 | apps/shell | apps/duda | other | origem → destino | other | Yes | Yes | apps/shell/next.config.js:28-31 (`/duda` → `http://localhost:3002/duda`); apps/duda/next.config.js:6 (`basePath: '/duda'`); apps/duda/package.json:7, 9 (porta 3002) | apps/shell/next.config.js:25 |
| 2 | apps/shell | apps/shop | other | origem → destino | other | Yes | Yes | apps/shell/next.config.js:32-41 (`/shop` e `/shop/:path*` → `http://localhost:3001/shop...`); apps/shop/next.config.js:19 (`basePath: '/shop'`); apps/shop/package.json:7, 9 (porta 3001) | apps/shell/next.config.js:25 |
| 3 | apps/shop | apps/duda | communication | origem → destino | other | Yes | Yes | — | apps/shop/app/actions.ts:26 |
| 4 | apps/shop | apps/shell | communication | origem → destino | other | Yes | Yes | — | apps/shop/app/actions.ts:26 |

## Observações

**1. apps/shell → apps/duda.** O shell repassa `/duda` para `http://localhost:3002/duda`
(apps/shell/next.config.js:28-31). O destino foi resolvido pelo caminho: `/duda` é o `basePath` de
`apps/duda` (apps/duda/next.config.js:6), cuja página `DudaPage` responde nessa rota
(apps/duda/app/page.tsx:9); a porta 3002 dos scripts `dev`/`start` (apps/duda/package.json:7, 9)
só corrobora. Tipo e mecanismo são `other`: o shell não carrega módulos da zona nem a registra num
orquestrador; encaminha a requisição para outra aplicação, que responde com a página inteira
(Next.js Multi-Zones por `rewrites`), como em 013 e 237. A direção é a do encaminhamento. Só a rota
`/duda` está no rewrite; a zona tem uma única página.

**2. apps/shell → apps/shop.** Mesmo padrão com `/shop` e `/shop/:path*` para
`http://localhost:3001/shop` e `http://localhost:3001/shop/:path*` (apps/shell/next.config.js:32-41).
O prefixo `/shop` é o `basePath` de `apps/shop` (apps/shop/next.config.js:19), e o comentário da
zona diz que o rewrite do shell encaminha `localhost:3000/shop/*` para ela
(apps/shop/next.config.js:13-14); a porta 3001 (apps/shop/package.json:7, 9) corrobora. A mesma
linha de código sustenta as relações 1 e 2.

**3. apps/shop → apps/duda.** A Server Action `addToCart` grava o cookie `mfe_cart_count` com
`path: '/'` (apps/shop/app/actions.ts:26-31), disparada pelos formulários
`<form action={addToCart}>` (apps/shop/app/page.tsx:124; apps/shop/app/[id]/page.tsx:141). O layout
da duda lê o cookie (apps/duda/app/layout.tsx:24-27) e passa a contagem ao `Header`
(apps/duda/app/layout.tsx:82). Mecanismo `other`: é estado compartilhado por cookie, não troca de
eventos, como as relações de cookie de 013; não há canal `events` neste repositório. A leitura não
foi registrada como construção na revisão de código-fonte, então a direção fica a da gravação, a
única construção registrada.

**4. apps/shop → apps/shell.** Mesmo cookie, lido pelo layout do shell
(apps/shell/app/layout.tsx:29-32) e passado ao `Header` (apps/shell/app/layout.tsx:58). Vale a
mesma observação sobre o mecanismo e a direção. O próprio shop também lê o cookie no seu layout
(apps/shop/app/layout.tsx:32-35), o que não é relação entre unidades.

## Resumo

Relações: 4 (other: 2, communication: 2). Ativas: 4. Destino fora do snapshot: 0.
Unidades sem relação: nenhuma.
