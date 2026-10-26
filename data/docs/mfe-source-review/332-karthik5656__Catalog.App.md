---
schema: 1
id: 1350705751
full_name: karthik5656/Catalog.App
commit: 1982e0f3dae5a8508d354f9db91a089ba96d4bd6
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 332 — karthik5656/Catalog.App

## Construções da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| src-remote-import | src/frontend/apps/ui-catalog/vite.config.ts:37 | src/frontend/apps/ui-catalog | dynamic-loading | Yes | O plugin `remoteAppsPlugin` gera, para cada entrada de `remotes.json`, ``Component: React.lazy(() => import("${app.scope}/${modulePath}"))`` (:32-39), ou seja, `import("merchantApp/App")` e `import("consumerApp/App")`, módulos expostos como `"./App"` pelos remotes (src/frontend/apps/ui-catalog-merchant/vite.config.ts:19-21; src/frontend/apps/ui-catalog-consumer/vite.config.ts:19-21). O código vai para `src/remoteApps.generated.tsx` (src/frontend/apps/ui-catalog/vite.config.ts:27, :41-50), gerado no `buildStart` (:57-59) e ignorado pelo git (src/frontend/apps/ui-catalog/.gitignore:16), por isso ausente do snapshot. Ativo: o plugin está em `plugins` (src/frontend/apps/ui-catalog/vite.config.ts:84), e `remoteApps` é importado em src/frontend/apps/ui-catalog/src/App.tsx:3. |

## Construções fora da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| manual | src/frontend/apps/ui-catalog/remotes.json:3 | src/frontend/apps/ui-catalog | host-relationship | Yes | Registro dos remotes do shell: `"scope": "merchantApp"` com `"url": "http://localhost:3001/assets/remoteEntry.js"`, `"module": "./App"` e `"route": "merchant"` (src/frontend/apps/ui-catalog/remotes.json:2-8), e `"scope": "consumerApp"` com `http://localhost:3002/assets/remoteEntry.js` e `"route": "consumer"` (:9-15). As portas 3001 e 3002 são as de ui-catalog-merchant (src/frontend/apps/ui-catalog-merchant/vite.config.ts:9) e ui-catalog-consumer (src/frontend/apps/ui-catalog-consumer/vite.config.ts:9). O arquivo é lido pelo `vite.config.ts` do shell para montar os `remotes` da federação (src/frontend/apps/ui-catalog/vite.config.ts:10-17, :85-89) e gerar as rotas (:30). |
| manual | src/frontend/apps/ui-catalog/src/App.tsx:26 | src/frontend/apps/ui-catalog | runtime-composition | Yes | Renderiza `<Component />`, o componente remoto lazy de cada entrada de `remoteApps`, dentro de `Suspense` na rota `${route}/*` (src/frontend/apps/ui-catalog/src/App.tsx:14-28), isto é, `merchant/*` → ui-catalog-merchant e `consumer/*` → ui-catalog-consumer, sob o `ShellLayout` (:12). Cadeia: src/frontend/apps/ui-catalog/index.html:11 → src/frontend/apps/ui-catalog/src/main.tsx:7-10 → `App`. O menu do shell lista as mesmas rotas (src/frontend/apps/ui-catalog/src/components/ShellLayout.tsx:27-31). |

## Resumo

Construções com composição: 3 (dynamic-loading: 1, host-relationship: 1, runtime-composition: 1).

## Notas

- O arquivo gerado pelo plugin (`remoteApps.generated.tsx`) não está no snapshot; a única ocorrência `src-*` é a do template em src/frontend/apps/ui-catalog/vite.config.ts:37.
- ui-catalog-merchant declara `name: "consumerApp"` na federação (src/frontend/apps/ui-catalog-merchant/vite.config.ts:17), o mesmo nome de ui-catalog-consumer (src/frontend/apps/ui-catalog-consumer/vite.config.ts:17); o shell o referencia como `merchantApp` pela URL da porta 3001 (src/frontend/apps/ui-catalog/remotes.json:3-4).
- Os dois remotes têm um plugin de build em modo watch que faz uma requisição HTTP a `http://localhost:3000/__fullReload` (src/frontend/apps/ui-catalog-merchant/vite.config.ts:24-45; src/frontend/apps/ui-catalog-consumer/vite.config.ts:24-45), atendida pelo servidor de desenvolvimento do shell (src/frontend/apps/ui-catalog/vite.config.ts:90-102). É ferramenta de desenvolvimento, não comunicação entre as aplicações em runtime; não virou linha.
- Nenhum mecanismo de comunicação entre unidades (`CustomEvent`, `postMessage`, `BroadcastChannel`, `localStorage`) no código dos três apps.
