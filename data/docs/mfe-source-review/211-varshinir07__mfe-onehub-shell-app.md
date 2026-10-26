---
schema: 1
id: 996744917
full_name: varshinir07/mfe-onehub-shell-app
commit: 1ddddc4241157e335c1b6e39372f050aa1705c1d
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 211 — varshinir07/mfe-onehub-shell-app

## Construções da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| src-remote-import | src/pages/Dashboard.jsx:3 | . | dynamic-loading | Yes | `React.lazy(() => import('remote1/ModemAuthorization'))` carrega o módulo do remote `remote1`, mapeado para `subscription@http://localhost:3001/remoteEntry.js` (src/webpack.config.js:76), unidade fora do snapshot. Ativo: Dashboard importado em src/App.js:3 (alias `@` em src/webpack.config.js:99) e renderizado em src/App.js:8; App renderizado na entrada src/index.js:8-12 (`entry` em src/webpack.config.js:10). |
| src-remote-import | src/pages/Dashboard.jsx:4 | . | dynamic-loading | Yes | `React.lazy(() => import('remote1/SecurityPackage'))` carrega o módulo do remote `remote1` (`subscription`, src/webpack.config.js:76), fora do snapshot; mesma cadeia ativa de src/App.js:3,8 e src/index.js:8-12. |
| src-remote-import | src/pages/Dashboard.jsx:6 | . | dynamic-loading | Yes | `React.lazy(() => import('remote2/LabourHourHold'))` carrega o módulo do remote `remote2`, mapeado para `ownership@http://localhost:3002/remoteEntry.js` (src/webpack.config.js:77), fora do snapshot; mesma cadeia ativa de src/App.js:3,8 e src/index.js:8-12. |
| src-remote-import | src/pages/Dashboard.jsx:7 | . | dynamic-loading | Yes | `React.lazy(() => import('remote2/MobileService'))` carrega o módulo do remote `remote2` (`ownership`, src/webpack.config.js:77), fora do snapshot; mesma cadeia ativa de src/App.js:3,8 e src/index.js:8-12. |
| src-remote-import | src/pages/Dashboard.jsx:9 | . | dynamic-loading | Yes | `React.lazy(() => import('remote1/Card'))` carrega o componente Card do remote `remote1` (`subscription`, src/webpack.config.js:76), fora do snapshot; mesma cadeia ativa de src/App.js:3,8 e src/index.js:8-12. |

## Construções fora da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| manual | src/pages/Dashboard.jsx:16 | . | runtime-composition | Yes | Renderiza `<ModemAuthorization />` do remote `remote1` dentro de `React.Suspense` (src/pages/Dashboard.jsx:15-26); carregado em src/pages/Dashboard.jsx:3. |
| manual | src/pages/Dashboard.jsx:17 | . | runtime-composition | Yes | Renderiza `<SecurityPackage />` do remote `remote1` dentro de `React.Suspense` (src/pages/Dashboard.jsx:15-26); carregado em src/pages/Dashboard.jsx:4. |
| manual | src/pages/Dashboard.jsx:18 | . | runtime-composition | Yes | Renderiza `<LabourHourHold />` do remote `remote2` dentro de `React.Suspense` (src/pages/Dashboard.jsx:15-26); carregado em src/pages/Dashboard.jsx:6. |
| manual | src/pages/Dashboard.jsx:19 | . | runtime-composition | Yes | Renderiza `<MobileService />` do remote `remote2` dentro de `React.Suspense` (src/pages/Dashboard.jsx:15-26); carregado em src/pages/Dashboard.jsx:7. |
| manual | src/pages/Dashboard.jsx:22 | . | runtime-composition | Yes | Renderiza `<Card>` do remote `remote1` com as props `topic` e `description` (src/pages/Dashboard.jsx:22-25); carregado em src/pages/Dashboard.jsx:9. |

## Resumo

Construções com composição: 10 (dynamic-loading: 5, runtime-composition: 5).

## Notas

- Os arquivos estão em `src`, que a revisão estrutural julgou `No` (parte da aplicação `.`); por isso a unidade é `.`.
- As unidades alvo `subscription` (`remote1`) e `ownership` (`remote2`) estão fora do snapshot e só aparecem em src/webpack.config.js:76-77.
- A busca do passo 4 não encontrou outras construções: nenhum `customElements`, `iframe`, `postMessage`, `CustomEvent`, `BroadcastChannel` ou carga de script em src/ e public/; public/index.html não tem script nem tag de outra unidade.
