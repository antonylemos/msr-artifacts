---
schema: 1
id: 1254401059
full_name: shermondevelopment/microfrontend-shop
commit: 913349b85c59bff3b982808ac6d931b62f1d73bc
inspection:
  output: data/inspections/mfe-dependencies-001
  version: "1"
  config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 246 — shermondevelopment/microfrontend-shop

## Dependências

| Manifesto:linha | Seção | Pacote | Versão | Tecnologia | Configurada | Evidência (artefato:linha) |
|---|---|---|---|---|---|---|
| package.json:48 | devDependencies | @module-federation/vite | ^1.16.0 | module-federation | Yes | apps/host/vite.config.ts:2 (`import { federation } from '@module-federation/vite'`) e `:22-65` (`federation({ name: 'host', remotes: { header, footer, products }, shared })`); apps/header/vite.config.ts:3 e `:13-37` (`exposes: { "./Header": "./src/Header.tsx" }`); apps/footer/vite.config.ts:3 e `:13-21` (`exposes: { './Footer': './src/Footer.tsx' }`); apps/products/vite.config.ts:3 e `:13-37` (`exposes: { "./ProductsList": "./src/ProductsList.tsx" }`); os quatro configs são usados pelo build: apps/host/package.json:8, apps/header/package.json:8, apps/footer/package.json:8, apps/products/package.json:8 (`vite build --config vite.config.ts`) e package.json:19-22 |
| packages/shared/package.json:10 | dependencies | @microfrontend/types | 0.0.0 | mfe-term | Yes | packages/shared/src/state/cart-store.ts:3 (`import type { CartProduct } from "@microfrontend/types"`), usado em `:6`; o store é exportado por packages/shared/src/index.ts:4 (`export { useCartStore } from './state/cart-store'`) e consumido por apps/header/src/Header.tsx:4 e `:16-18` (`useCartStore(...)`), módulo exposto em apps/header/vite.config.ts:18 e montado pelo host em apps/host/src/App.tsx:5 |

## Notas

- `@module-federation/vite`: a inspeção pôs todos os itens em `other_package_matches` porque o pacote está declarado no `package.json` da raiz e é usado nos `vite.config.ts` dos apps (dependência hoisted no workspace npm, `package.json:4-8`); os apps não declaram dependências próprias (apps/host/package.json:1-11).
- `@microfrontend/types` é o pacote interno de tipos do workspace (packages/types/package.json:2; packages/types/src/index.ts:1-3 só reexporta tipos), capturado pela tecnologia `mfe-term` pelo nome. O uso é `import type`, apagado na compilação, mas é import do pacote num arquivo usado. Os itens de `other_package_matches` (apps/host/src/App.tsx:5-7, `lazy(() => import('header/Header'))` etc.) são imports federados e não usam o pacote; a evidência veio da busca fora das listas, que achou também packages/ui/src/CartList.tsx:1, apps/products/src/api.ts:2 e apps/header/src/service/api.ts:2.
