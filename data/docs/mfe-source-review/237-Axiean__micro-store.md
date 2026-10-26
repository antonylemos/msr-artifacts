---
schema: 1
id: 1031213794
full_name: Axiean/micro-store
commit: 7ed9142db806ba9851416ae0b8bb207d5d10bdca
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

## Construções da mineração

Nenhuma ocorrência src-* no matches.csv.

## Construções fora da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| manual | store-app/next.config.ts:32 | store-app | host-relationship | Yes | `async rewrites()` declara qual aplicação store-app usa e sob qual caminho: `/cart/:path*` para `http://cart-app:3000/cart/:path*` (store-app/next.config.ts:36-39); o destino é a app cart-app, serviço `cart-app` em docker-compose.yml:20-24, que responde nesse caminho pelo `basePath: "/cart"` (cart-app/next.config.ts:4). store-app é o ponto de entrada (docker-compose.yml:6-7, porta 3000 em :15). Config exportada como `nextConfig` em store-app/next.config.ts:45 |
| manual | store-app/src/store/cartStore.ts:83 | store-app | communication | Yes | O store zustand `useCartStore` é persistido com `persist` na chave `cart-storage` do `localStorage` (`name: "cart-storage"`, store-app/src/store/cartStore.ts:83; `storage: createJSONStorage(() => safeLocalStorage)`, :84; `localStorage.setItem`, :26). store-app grava o carrinho em `addToCart` (:38-55), disparado por `ProductCard` (store-app/src/components/ProductCart.tsx:17), usado na página `/` (store-app/src/app/page.tsx:52), e o `Header` lê os itens (store-app/src/components/Header.tsx:8, montado em store-app/src/app/layout.tsx:18). O alvo é cart-app, que declara o mesmo store na mesma chave (cart-app/src/store/cartStore.ts:83-84) e o lê em `CartDisplay` (cart-app/src/components/CartDisplay.tsx:15, montado em cart-app/src/app/page.tsx:10). As duas apps compartilham o `localStorage` porque cart-app é servido sob a origem de store-app pelo rewrite `/cart/:path*` (store-app/next.config.ts:36-39) |

## Resumo

Construções com composição: 2 (host-relationship: 1, communication: 1).

## Notas

- Decisão do pesquisador (24/10/2026), válida para todos os repositórios: quando o `rewrites()` do host declara um app remoto sob um caminho (`cfg-route-rewrites` no `matches.csv`), aplica-se a decisão de 013 (a exclusão do passo 4 vale só para ocorrências `src-*`). Por isso store-app/next.config.ts:32 entrou como linha manual `host-relationship` / `Yes`, mesmo sendo ocorrência `cfg-route-rewrites` no `matches.csv`.
- O `matches.csv` não tem nenhuma linha `src-*`. A composição multi-zones aparece nas ocorrências `cfg-*`: `cfg-route-rewrites` em store-app/next.config.ts:32 (rewrite `/cart/:path*` para `http://cart-app:3000/cart/:path*`, :36-39) e `cfg-zone-path` em cart-app/next.config.ts:4 (`basePath: "/cart"`).
- A busca do passo 4 (`import(`, `React.lazy`, `loadRemote*`, `initFederation`, `customElements`, `registerApplication`, `registerMicroApps`, `<iframe`, `postMessage`, `CustomEvent`, `BroadcastChannel`, `createElement('script'`) não retornou nada em store-app nem em cart-app: não há carregamento, montagem nem embutimento de uma unidade dentro de outra no código-fonte.
- A navegação de store-app para cart-app é por link de página inteira (`<a href="/cart">`, store-app/src/components/Header.tsx:29). Link de navegação não é um dos tipos do passo 4, por isso não virou linha.
- `cart-app/src/store/cartStore.ts` é cópia de `store-app/src/store/cartStore.ts` (linhas 1-87 iguais, exceto `export` em :12); cart-app também regrava a chave em `removeItem` e `updateQuantity` (:58-80). São pontos de uso do mesmo mecanismo e não viraram linha. O compartilhamento vale quando o usuário entra por store-app (porta 3000, docker-compose.yml:13-15); o acesso direto a cart-app pela porta 3001 (docker-compose.yml:25-28) fica em outra origem.
