---
schema: 1
id: 1254401059
full_name: shermondevelopment/microfrontend-shop
commit: 913349b85c59bff3b982808ac6d931b62f1d73bc
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 246 — shermondevelopment/microfrontend-shop

## Construções da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| src-remote-import | apps/host/src/App.tsx:5 | apps/host | dynamic-loading | Yes | `lazy(() => import('header/Header'))` carrega em runtime o módulo exposto por apps/header (`"./Header": "./src/Header.tsx"`, apps/header/vite.config.ts:17-18), declarado como remote `header` no host (apps/host/vite.config.ts:26-32, `entry` em :12). Ativo: `App` é renderizado por apps/host/src/main.tsx:5 e :13, entrada de apps/host/index.html:11. |
| src-remote-import | apps/host/src/App.tsx:6 | apps/host | dynamic-loading | Yes | `lazy(() => import('footer/Footer'))` carrega o módulo exposto por apps/footer (`'./Footer': './src/Footer.tsx'`, apps/footer/vite.config.ts:17-18), remote `footer` do host (apps/host/vite.config.ts:33-39, `entry` em :13). Mesma cadeia ativa da linha 5. |
| src-remote-import | apps/host/src/App.tsx:7 | apps/host | dynamic-loading | Yes | `lazy(() => import('products/ProductsList'))` carrega o módulo exposto por apps/products (`"./ProductsList": "./src/ProductsList.tsx"`, apps/products/vite.config.ts:17-18), remote `products` do host (apps/host/vite.config.ts:40-46, `entry` em :14-15). Mesma cadeia ativa da linha 5. |

## Construções fora da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| manual | apps/host/src/App.tsx:14 | apps/host | runtime-composition | Yes | Renderiza `<Header />`, o componente remoto de apps/header carregado em apps/host/src/App.tsx:5, dentro de `RemoteErrorBoundary` e `Suspense` com `HeaderSkeleton` (:12-16). |
| manual | apps/host/src/App.tsx:21 | apps/host | runtime-composition | Yes | Renderiza `<ProductsList />`, o componente remoto de apps/products carregado em apps/host/src/App.tsx:7, dentro de `RemoteErrorBoundary` e `Suspense` com `ProductSkeleton` (:19-23). |
| manual | apps/host/src/App.tsx:28 | apps/host | runtime-composition | Yes | Renderiza `<Footer />`, o componente remoto de apps/footer carregado em apps/host/src/App.tsx:6, dentro de `RemoteErrorBoundary` e `Suspense` com `FooterSkeleton` (:26-30). |
| manual | packages/shared/src/state/cart-store.ts:12 | — | communication | Yes | `useCartStore` (Zustand com `persist`, chave `cart-storage`, :70-72) é o estado do carrinho compartilhado entre apps/products e apps/header: exportado por packages/shared/src/index.ts:4 e declarado singleton (`zustand` e `@microfrontend/shared`) no host (apps/host/vite.config.ts:55-60), em apps/header (apps/header/vite.config.ts:27-32) e em apps/products (apps/products/vite.config.ts:27-32). apps/products escreve com `addProduct` (apps/products/src/components/Product.tsx:14 e :36, `ProductCard` usado em apps/products/src/ProductsList.tsx:30); apps/header lê os itens e remove com `removeAllProduct` (apps/header/src/Header.tsx:16-18 e :27). |

## Resumo

Construções com composição: 7 (dynamic-loading: 3, runtime-composition: 3, communication: 1).

## Notas

- packages/shared é `No` na revisão estrutural, assim como `.`; por isso a unidade da linha do store é `—`.
- apps/footer não usa o store nem declara `@microfrontend/shared` como compartilhado (apps/footer/vite.config.ts:20, `shared: ['react', 'react-dom']`).
- A busca do passo 4 não encontrou `customElements`, `<iframe`, `postMessage`, `CustomEvent`/`dispatchEvent`, `BroadcastChannel` nem carga de script em apps/ e packages/; os usos de `useCartStore` em apps/header/src/Header.test.tsx são de teste.
