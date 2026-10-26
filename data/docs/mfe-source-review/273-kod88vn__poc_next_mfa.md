---
schema: 1
id: 1208265953
full_name: kod88vn/poc_next_mfa
commit: d20db8260825dc17ad4c68ac6df0595c1c59df23
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 273 — kod88vn/poc_next_mfa

## Construções da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| src-iframe | apps/duda/lib/duda-landing.ts:387 | apps/duda | none | No | Expressão regular que **remove** blocos `<iframe>` do HTML da página externa do Duda (`sanitizeLandingHtml`, apps/duda/lib/duda-landing.ts:363, junto com `<script>` e `<noscript>` em :385-386); não embute nenhuma unidade, é sanitização de conteúdo |

## Construções fora da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| manual | apps/shell/next.config.js:25 | apps/shell | host-relationship | Yes | `async rewrites()` declara quais aplicações o shell usa e sob quais caminhos: `/duda` para `http://localhost:3002/duda`, `/shop` para `http://localhost:3001/shop` e `/shop/:path*` para `http://localhost:3001/shop/:path*` (apps/shell/next.config.js:25-43); os destinos são as apps `apps/duda` e `apps/shop`, que sobem nessas portas (apps/duda/package.json:7,9; apps/shop/package.json:7,9) e respondem no caminho declarado por seu `basePath` (apps/duda/next.config.js:6, apps/shop/next.config.js:19). Config exportada em apps/shell/next.config.js:46 |
| manual | apps/shop/app/actions.ts:26 | apps/shop | communication | Yes | A Server Action `addToCart` grava o cookie `mfe_cart_count` com `path: '/'` (apps/shop/app/actions.ts:26-31), compartilhando a contagem do carrinho com as outras zonas sob a mesma origem do shell; disparada pelos formulários `<form action={addToCart}>` em apps/shop/app/page.tsx:124 e apps/shop/app/[id]/page.tsx:141. O cookie é lido pelas demais unidades em apps/shell/app/layout.tsx:30 e apps/duda/app/layout.tsx:25 (além de apps/shop/app/layout.tsx:33) e passado como `cartCount` ao `Header` de `@repo/ui` (apps/shell/app/layout.tsx:58, apps/duda/app/layout.tsx:82) |

## Resumo

Construções com composição: 2 (host-relationship: 1, communication: 1).

## Notas

- A única linha `src-*` do `matches.csv` é um falso positivo de `src-iframe`. A composição multi-zones aparece nas ocorrências `cfg-*`: `cfg-route-rewrites` em apps/shell/next.config.js:25 (rewrites `/duda` para `http://localhost:3002/duda`, `/shop` e `/shop/:path*` para `http://localhost:3001/shop...`, :26-42) e `cfg-zone-path` em apps/shop/next.config.js:19 (`basePath: '/shop'`) e apps/duda/next.config.js:6 (`basePath: '/duda'`).
- A busca do passo 4 (`import(`, `React.lazy`, `loadRemote*`, `customElements`, `registerApplication`, `<iframe`, `postMessage`, `CustomEvent`, `BroadcastChannel`, `createElement('script'`) só achou a linha da mineração: não há carregamento, montagem nem embutimento de uma unidade dentro de outra no código-fonte.
- A navegação entre zonas é por link de página inteira (`<a href="/shop">`, `<a href="/duda">` em apps/shell/app/page.tsx:68,74 e no `Header` compartilhado, packages/ui/src/Header.tsx:74,81). Link de navegação não é um dos tipos do passo 4, por isso não virou linha.
- O `Header` vem da biblioteca `@repo/ui` (`packages/ui`, `No` na revisão estrutural), compilada em cada app por `transpilePackages`; é código compartilhado, não uma unidade montada em outra.
- apps/duda busca no servidor o HTML de um site externo do construtor Duda (`DUDA_ORIGIN`, padrão `https://pocmfe.multiscreensite.com/`, apps/duda/lib/duda-landing.ts:4; `fetchText(DUDA_LANDING_URL)`, :488) e o injeta com `dangerouslySetInnerHTML` (apps/duda/app/page.tsx:13), depois de remover scripts e iframes. É conteúdo de um site de terceiros, não uma unidade frontend do sistema, por isso não virou linha.
- Decisão do pesquisador (24/10/2026), válida para todos os repositórios: quando o `rewrites()` do host declara um app remoto sob um caminho (`cfg-route-rewrites` no `matches.csv`), aplica-se a opção B decidida em 013-nikJovanovic__ita-vaje; por isso apps/shell/next.config.js:25 entrou como linha manual `host-relationship` / `Yes`, mesmo sendo ocorrência `cfg-route-rewrites` no `matches.csv`.
