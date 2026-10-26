---
schema: 1
id: 1015183048
full_name: harshad-eden/module-federation
commit: dde74e678a749ccbf3951e173bf980649034c5d4
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

## Construções da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| src-remote-import | apps/shell/src/components/ProductConfig.tsx:5 | apps/shell | dynamic-loading | Yes | `React.lazy` carrega `productConfig/App` (apps/shell/src/components/ProductConfig.tsx:4-5), com fallback local se a carga falhar (:5-26); o remote `productConfig` aponta para `http://localhost:3004/dist/assets/remoteEntry.js` em apps/shell/vite.config.ts:13, e apps/product-config/vite.config.ts:11-12 expõe `./App`. Ativo: rota `/products/*` em apps/shell/src/App.tsx:16, App montado em apps/shell/src/main.tsx:7-13. |
| src-remote-import | apps/shell/src/components/SalesPortal.tsx:5 | apps/shell | dynamic-loading | Yes | `React.lazy` carrega `salesPortal/App` (apps/shell/src/components/SalesPortal.tsx:4-5), com fallback local se a carga falhar (:5-27); o remote `salesPortal` aponta para `http://localhost:3001/dist/assets/remoteEntry.js` em apps/shell/vite.config.ts:11, e apps/sales-portal/vite.config.ts:11-12 expõe `./App`. Ativo: rota `/sales/*` em apps/shell/src/App.tsx:14. |
| src-remote-import | apps/shell/src/components/UnderwriterPortal.tsx:5 | apps/shell | dynamic-loading | Yes | `React.lazy` carrega `underwriterPortal/App` (apps/shell/src/components/UnderwriterPortal.tsx:4-5), com fallback local se a carga falhar (:5-26); o remote `underwriterPortal` aponta para `http://localhost:3002/dist/assets/remoteEntry.js` em apps/shell/vite.config.ts:12, e apps/underwriter-portal/vite.config.ts:11-12 expõe `./App`. Ativo: rota `/underwriter/*` em apps/shell/src/App.tsx:15. |

## Construções fora da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| manual | apps/shell/src/App.tsx:12 | apps/shell | host-relationship | Yes | `Routes` declara onde o shell usa cada remote: `/sales/*` → `SalesPortal`, `/underwriter/*` → `UnderwriterPortal`, `/products/*` → `ProductConfig` (apps/shell/src/App.tsx:12-17), componentes importados em apps/shell/src/App.tsx:5-7; App é montado dentro de `BrowserRouter` em apps/shell/src/main.tsx:7-13. |
| manual | apps/shell/src/components/ProductConfig.tsx:75 | apps/shell | runtime-composition | Yes | Renderiza `RemoteProductConfig`, componente da unidade apps/product-config, dentro de `ErrorBoundary` + `Suspense` (apps/shell/src/components/ProductConfig.tsx:62-77); o componente vem do lazy import em apps/shell/src/components/ProductConfig.tsx:4-5. |
| manual | apps/shell/src/components/SalesPortal.tsx:84 | apps/shell | runtime-composition | Yes | Renderiza `RemoteSalesPortal`, componente da unidade apps/sales-portal, dentro de `ErrorBoundary` + `Suspense` (apps/shell/src/components/SalesPortal.tsx:69-86); o componente vem do lazy import em apps/shell/src/components/SalesPortal.tsx:4-5. |
| manual | apps/shell/src/components/UnderwriterPortal.tsx:75 | apps/shell | runtime-composition | Yes | Renderiza `RemoteUnderwriterPortal`, componente da unidade apps/underwriter-portal, dentro de `ErrorBoundary` + `Suspense` (apps/shell/src/components/UnderwriterPortal.tsx:62-77); o componente vem do lazy import em apps/shell/src/components/UnderwriterPortal.tsx:4-5. |

## Resumo

Construções com composição: 7 (dynamic-loading: 3, host-relationship: 1, runtime-composition: 3).

## Notas

- Os módulos remotos são declarados para o TypeScript em apps/shell/src/types/remotes.d.ts:1-14; é só tipagem, não vira linha.
- A busca do passo 4 não achou mecanismo de comunicação entre unidades: os únicos `addEventListener` estão em packages/shared-ui (packages/shared-ui/src/hooks/use-mobile.tsx:13, packages/shared-ui/src/components/ui/sidebar.tsx:115), biblioteca julgada `No` e de uso interno de UI.
- Os links do menu em apps/shell/src/components/Layout.tsx:9-12 só navegam para as rotas do shell; não viram linha.
