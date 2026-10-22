---
schema: 1
id: 1080660279
full_name: pgarr/microfrontend-template
commit: 8869e1289ab5b8e758cb6a465425997296b6ca32
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: b3f63eb6fb86d8877fda117ccc22eec936a89ff7bf2d414c1dedafc0311f1fb1
annotation:
  method: manual
  status: final
  date: 2026-10-21
---

# 046 — pgarr/microfrontend-template

## Construções da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| src-async-bootstrap | auth/src/index.js:1 | auth | dynamic-loading | No | auth/src/index.js:1 importa o bootstrap local; não atravessa fronteira de unidade. |
| src-async-bootstrap | container/src/index.js:1 | container | dynamic-loading | No | container/src/index.js:1 importa o bootstrap local; não atravessa fronteira de unidade. |
| src-async-bootstrap | dashboard/src/index.js:1 | dashboard | dynamic-loading | No | dashboard/src/index.js:1 importa o bootstrap local; não atravessa fronteira de unidade. |
| src-async-bootstrap | marketing/src/index.js:1 | marketing | dynamic-loading | No | marketing/src/index.js:1 importa o bootstrap local; não atravessa fronteira de unidade. |
| src-mount-export | auth/src/bootstrap.js:46 | auth | runtime-composition | Yes | Exporta mount em auth/src/bootstrap.js:46, exposto em auth/config/webpack.prod.js:16-17 e chamado pelo wrapper em container/src/components/AuthApp.js:13. |
| src-mount-export | dashboard/src/bootstrap.js:22 | dashboard | runtime-composition | Yes | Exporta mount em dashboard/src/bootstrap.js:22, exposto em dashboard/config/webpack.prod.js:16-17 e chamado pelo wrapper em container/src/components/DashboardApp.js:8. |
| src-mount-export | marketing/src/bootstrap.js:46 | marketing | runtime-composition | Yes | Exporta mount em marketing/src/bootstrap.js:46, exposto em marketing/config/webpack.prod.js:16-17 e chamado pelo wrapper em container/src/components/MarketingApp.js:13. |
| src-mount-call | container/src/components/AuthApp.js:13 | container | runtime-composition | Yes | Monta a unidade auth no ref do wrapper (container/src/components/AuthApp.js:13); wrapper participa das rotas do host em container/src/App.js:29-36. |
| src-mount-call | container/src/components/DashboardApp.js:8 | container | runtime-composition | Yes | Monta a unidade dashboard no ref do wrapper (container/src/components/DashboardApp.js:8); wrapper participa das rotas do host em container/src/App.js:29-36. |
| src-mount-call | container/src/components/MarketingApp.js:13 | container | runtime-composition | Yes | Monta a unidade marketing no ref do wrapper (container/src/components/MarketingApp.js:13); wrapper participa das rotas do host em container/src/App.js:29-36. |
| src-mount-call | dashboard/src/bootstrap.js:7 | dashboard | runtime-composition | No | dashboard/src/bootstrap.js:5-8 usa app.mount(el) do Vue para renderizar sua própria UI; a interação externa está no export mount em dashboard/src/bootstrap.js:22. |
| src-mount-import | container/src/components/AuthApp.js:1 | container | runtime-composition | Yes | Importa mount de auth/AuthApp em container/src/components/AuthApp.js:1; chamado em container/src/components/AuthApp.js:13 e usado nas rotas em container/src/App.js:29-36. |
| src-mount-import | container/src/components/DashboardApp.js:1 | container | runtime-composition | Yes | Importa mount de dashboard/DashboardApp em container/src/components/DashboardApp.js:1; chamado em container/src/components/DashboardApp.js:8 e usado nas rotas em container/src/App.js:29-36. |
| src-mount-import | container/src/components/MarketingApp.js:1 | container | runtime-composition | Yes | Importa mount de marketing/MarketingApp em container/src/components/MarketingApp.js:1; chamado em container/src/components/MarketingApp.js:13 e usado nas rotas em container/src/App.js:29-36. |

## Construções fora da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| manual | container/src/App.js:29 | container | host-relationship | Yes | Routes declara os pontos de uso de AuthLazy, DashboardLazy e MarketingLazy (container/src/App.js:29-36); App é montado em container/src/bootstrap.js:3-6. |

## Resumo

Construções com composição: 10 (runtime-composition: 9, host-relationship: 1).

## Notas

- A cadeia do container é container/src/index.js:1 → container/src/bootstrap.js:3-6 → container/src/App.js:8-10 e container/src/App.js:29-36 → wrappers. Os imports lazy de wrappers são locais; os imports mount desses wrappers atravessam a fronteira.
- O mount do Vue é interno à unidade dashboard, e as montagens standalone de desenvolvimento em auth/src/bootstrap.js:36-41, marketing/src/bootstrap.js:36-41 e dashboard/src/bootstrap.js:12-17 também não são composição entre unidades.
- Pelo critério de construções fora da mineração (passo 4 do método), os callbacks trocados no `mount` não viram linhas: o host passa `onNavigate` e `onSignIn` e recebe `onParentNavigate` em container/src/components/AuthApp.js:13-29 e container/src/components/MarketingApp.js:13-28; os remotes os registram em auth/src/bootstrap.js:14-31 e marketing/src/bootstrap.js:14-31, e `onSignIn` é chamado em auth/src/components/Signin.js:96 e auth/src/components/Signup.js:121.
