---
schema: 1
id: 1133729895
full_name: fi-x64/mfe
commit: fa4088ae3313734c98a027db5fccfee4db34a46d
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 216 — fi-x64/mfe

## Construções da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| src-async-bootstrap | packages/container/src/index.js:1 | packages/container | dynamic-loading | No | `import('./bootstrap')` carrega o bootstrap local do próprio container (packages/container/src/bootstrap.js:1-5); interno à unidade. |
| src-async-bootstrap | packages/marketing/src/index.js:1 | packages/marketing | dynamic-loading | No | `import('./bootstrap')` carrega o bootstrap local do próprio marketing (packages/marketing/src/bootstrap.js:1-22); interno à unidade. |
| src-mount-export | packages/marketing/src/bootstrap.js:22 | packages/marketing | runtime-composition | Yes | Exporta `mount(el)`, que renderiza a App do marketing no elemento recebido (packages/marketing/src/bootstrap.js:6-8); `./src/bootstrap` é exposto como `./MarketingApp` em packages/marketing/config/webpack.prod.js:16-18 e packages/marketing/config/webpack.dev.js:19-21 e consumido pelo container em packages/container/src/components/MarketingApp.js:1 e :8. |
| src-mount-call | packages/container/src/components/MarketingApp.js:8 | packages/container | runtime-composition | Yes | Monta o remote `marketing` no `ref` do wrapper, dentro de `useEffect` (packages/container/src/components/MarketingApp.js:5-11); remote declarado em packages/container/config/webpack.prod.js:17-19 (`${domain}/marketing/latest/remoteEntry.js`) e packages/container/config/webpack.dev.js:18-20 (`http://localhost:8081/remoteEntry.js`); wrapper renderizado em packages/container/src/App.js:11, App renderizada em packages/container/src/bootstrap.js:5, carregado pela entrada packages/container/src/index.js:1. |
| src-mount-import | packages/container/src/components/MarketingApp.js:1 | packages/container | runtime-composition | Yes | Importa `mount` do remote `marketing/MarketingApp`, usado em packages/container/src/components/MarketingApp.js:8. |

## Construções fora da mineração

Nenhuma construção adicional.

## Resumo

Construções com composição: 3 (runtime-composition: 3).

## Notas

- O container renderiza o wrapper `<MarketingApp />` abaixo do `<Header />` (packages/container/src/App.js:10-11), sem tabela de rotas que nomeie as unidades; a montagem do remote já está na linha de packages/container/src/components/MarketingApp.js:8, e o render do wrapper local não vira linha.
- O `mount(devRoot)` de packages/marketing/src/bootstrap.js:16 é a montagem isolada do marketing em desenvolvimento (`#_marketing-dev-root`, packages/marketing/public/index.html:5) e não está no `matches.csv`; não vira linha.
- `Header` aceita `signedIn` e `onSignOut` (packages/container/src/components/Header.js:57), mas o container não os passa (packages/container/src/App.js:10); nenhum callback ou prop é trocado com o remote no `mount(ref.current)`.
- `packages/auth` e `packages/dashboard` não têm código-fonte no snapshot.
- Nenhum custom element, iframe, `postMessage`, `CustomEvent`, `BroadcastChannel` ou armazenamento compartilhado no código das unidades.
