---
schema: 1
id: 1176812762
full_name: jangrohit/micro-front-end
commit: c6c0dbc9fb78b8baab20e74394647ca40b521355
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 253 — jangrohit/micro-front-end

## Construções da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| src-async-bootstrap | packages/container/src/index.js:1 | packages/container | dynamic-loading | No | packages/container/src/index.js:1 importa o bootstrap da própria unidade (`import("./bootstrap")`). |
| src-async-bootstrap | packages/marketing/src/index.js:1 | packages/marketing | dynamic-loading | No | packages/marketing/src/index.js:1 importa o bootstrap da própria unidade (`import("./bootstrap")`). |
| src-mount-export | packages/marketing/src/bootstrap.js:17 | packages/marketing | runtime-composition | Yes | Exporta `mount` (definido em packages/marketing/src/bootstrap.js:5-7, renderiza `App` no elemento recebido), exposto como `./MarketingApp` em packages/marketing/config/webpack.prod.js:22-23 (e webpack.dev.js:18-19) e consumido pelo host em packages/container/src/components/MarketingApp.js:3 e :9. |
| src-mount-call | packages/container/src/components/MarketingApp.js:9 | packages/container | runtime-composition | Yes | Monta a unidade packages/marketing no `div` do wrapper (`mount(ref.current)`), com `mount` importado de `marketing/MarketingApp` em :3; remote declarado em packages/container/config/webpack.prod.js:21-22; wrapper renderizado em packages/container/src/App.js:19, App iniciado em packages/container/src/bootstrap.js:5 e bootstrap carregado por packages/container/src/index.js:1. O wrapper só passa o elemento, sem callbacks. |
| src-mount-import | packages/container/src/components/MarketingApp.js:3 | packages/container | runtime-composition | Yes | Importa `mount` do remote `marketing/MarketingApp` (unidade packages/marketing); invocado em packages/container/src/components/MarketingApp.js:9, ativo pela cadeia descrita na linha anterior. |

## Construções fora da mineração

Nenhuma construção adicional.

## Resumo

Construções com composição: 3 (runtime-composition: 3).

## Notas

- A busca do passo 4 nos `.js` e `.html` das duas unidades só encontrou as linhas já mineradas e packages/marketing/src/bootstrap.js:12 (`mount(devRoot)`), montagem isolada da própria unidade em desenvolvimento (packages/marketing/src/bootstrap.js:9-13), que não é composição. Não há `import()` de remote, custom element, iframe nem mecanismo de comunicação.
- `<MarketingApp />` em packages/container/src/App.js:19 renderiza o wrapper local do host, cuja montagem do remote já é a linha src-mount-call; o host não tem tabela de rotas que nomeie unidades, então não há linha `host-relationship`.
- packages/auth e packages/dashboard são `No` na revisão estrutural e não têm código-fonte no snapshot.
