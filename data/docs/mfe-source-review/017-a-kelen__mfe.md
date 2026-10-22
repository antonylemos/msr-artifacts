---
schema: 1
id: 1007785611
full_name: a-kelen/mfe
commit: 80e4481f9b927142d2c57f4c2787da93ad01b54e
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: b3f63eb6fb86d8877fda117ccc22eec936a89ff7bf2d414c1dedafc0311f1fb1
annotation:
  method: manual
  status: final
  date: 2026-10-21
---

# 017 — a-kelen/mfe

## Construções da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| src-async-bootstrap | packages/auth/src/index.js:1 | packages/auth | dynamic-loading | No | packages/auth/src/index.js:1 importa o bootstrap da própria unidade. |
| src-async-bootstrap | packages/container/src/index.js:1 | packages/container | dynamic-loading | No | packages/container/src/index.js:1 importa o bootstrap da própria unidade. |
| src-async-bootstrap | packages/dashboard/src/index.js:1 | packages/dashboard | dynamic-loading | No | packages/dashboard/src/index.js:1 importa o bootstrap da própria unidade. |
| src-async-bootstrap | packages/marketing/src/index.js:1 | packages/marketing | dynamic-loading | No | packages/marketing/src/index.js:1 importa o bootstrap da própria unidade. |
| src-mount-export | packages/auth/src/bootstrap.js:34 | packages/auth | runtime-composition | Yes | Exporta mount em packages/auth/src/bootstrap.js:34, exposto em packages/auth/config/webpack.prod.js:16-17 e consumido pelo wrapper em packages/container/src/components/AuthApp.js:11. |
| src-mount-export | packages/dashboard/src/bootstrap.js:16 | packages/dashboard | runtime-composition | Yes | Exporta mount em packages/dashboard/src/bootstrap.js:16, exposto em packages/dashboard/config/webpack.prod.js:16-17 e consumido pelo wrapper em packages/container/src/components/DashboardApp.js:8. |
| src-mount-export | packages/marketing/src/bootstrap.js:33 | packages/marketing | runtime-composition | Yes | Exporta mount em packages/marketing/src/bootstrap.js:33, exposto em packages/marketing/config/webpack.prod.js:16-17 e consumido pelo wrapper em packages/container/src/components/MarketingApp.js:11. |
| src-mount-call | packages/dashboard/src/bootstrap.js:6 | packages/dashboard | runtime-composition | No | packages/dashboard/src/bootstrap.js:4-6 chama app.mount(el) do Vue para renderizar a UI da própria unidade; a fronteira externa é o export mount em packages/dashboard/src/bootstrap.js:16. |
| src-mount-import | packages/container/src/components/AuthApp.js:4 | packages/container | runtime-composition | Yes | Importa mount da unidade auth; invocado no wrapper em packages/container/src/components/AuthApp.js:11; wrapper ligado às rotas em packages/container/src/App.js:41-48. |
| src-mount-import | packages/container/src/components/DashboardApp.js:2 | packages/container | runtime-composition | Yes | Importa mount da unidade dashboard; invocado no wrapper em packages/container/src/components/DashboardApp.js:8; wrapper ligado às rotas em packages/container/src/App.js:41-48. |
| src-mount-import | packages/container/src/components/MarketingApp.js:4 | packages/container | runtime-composition | Yes | Importa mount da unidade marketing; invocado no wrapper em packages/container/src/components/MarketingApp.js:11; wrapper ligado às rotas em packages/container/src/App.js:41-48. |

## Construções fora da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| manual | packages/container/src/components/AuthApp.js:11 | packages/container | runtime-composition | Yes | Monta a unidade auth usando o alias importado no wrapper; componente renderizado pelas rotas em packages/container/src/App.js:41-48 e App iniciado em packages/container/src/bootstrap.js:3-5. |
| manual | packages/container/src/components/DashboardApp.js:8 | packages/container | runtime-composition | Yes | Monta a unidade dashboard usando o alias importado no wrapper; componente renderizado pelas rotas em packages/container/src/App.js:41-48 e App iniciado em packages/container/src/bootstrap.js:3-5. |
| manual | packages/container/src/components/MarketingApp.js:11 | packages/container | runtime-composition | Yes | Monta a unidade marketing usando o alias importado no wrapper; componente renderizado pelas rotas em packages/container/src/App.js:41-48 e App iniciado em packages/container/src/bootstrap.js:3-5. |
| manual | packages/container/src/App.js:40 | packages/container | host-relationship | Yes | O Switch declara onde AuthApp, DashboardApp e MarketingApp participam da UI (packages/container/src/App.js:40-48); App montado em packages/container/src/bootstrap.js:5. |

## Resumo

Construções com composição: 10 (runtime-composition: 9, host-relationship: 1).

## Notas

- Os imports dinâmicos de wrappers em packages/container/src/App.js:7-9 são locais. As montagens remotas com aliases escaparam a src-mount-call e aparecem na segunda tabela.
- app.mount(el) do Vue é renderização interna ao dashboard, embora a função mount que o envolve seja exportada e consumida pelo host.
- Pelo critério de construções fora da mineração (passo 4 do método), os callbacks trocados no `mount` não viram linhas: o host passa `onNavigate` e `onSignIn` e recebe `onParentNavigate` em packages/container/src/components/AuthApp.js:11-21 e packages/container/src/components/MarketingApp.js:11-20; os remotes os registram em packages/auth/src/bootstrap.js:7-23 e packages/marketing/src/bootstrap.js:6-23, e `onSignIn` é chamado em packages/auth/src/components/Signin.js:102 e packages/auth/src/components/Signup.js:127.
