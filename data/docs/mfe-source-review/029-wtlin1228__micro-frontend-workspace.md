---
schema: 1
id: 1043597864
full_name: wtlin1228/micro-frontend-workspace
commit: 9b81d2c5b6156084e0e9a4a3ecfdd89494d0b692
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: b3f63eb6fb86d8877fda117ccc22eec936a89ff7bf2d414c1dedafc0311f1fb1
annotation:
  method: manual
  status: final
  date: 2026-10-21
---

# 029 — wtlin1228/micro-frontend-workspace

## Construções da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| src-async-bootstrap | packages/app-mf-1/src/index.tsx:1 | packages/app-mf-1 | dynamic-loading | No | packages/app-mf-1/src/index.tsx:1 importa o bootstrap da própria unidade. |
| src-async-bootstrap | packages/app-mf-2/src/index.tsx:1 | packages/app-mf-2 | dynamic-loading | No | packages/app-mf-2/src/index.tsx:1 importa o bootstrap da própria unidade. |
| src-async-bootstrap | packages/host/src/index.tsx:1 | packages/host | dynamic-loading | No | packages/host/src/index.tsx:1 importa o bootstrap da própria unidade. |
| src-load-remote | packages/host/src/app-loaders/module-federation.ts:3 | packages/host | remote-resolution | Yes | Importa registerRemotes, invocado em packages/host/src/app-loaders/module-federation.ts:27-32; manager usado pela rota em packages/host/src/routes/apps.$baseRoute.tsx:24. |
| src-load-remote | packages/host/src/app-loaders/module-federation.ts:27 | packages/host | remote-resolution | Yes | Registra nome e entry da aplicação remota (packages/host/src/app-loaders/module-federation.ts:27-32), vindos do registro em packages/host/src/configs/apps.ts:9-20. |
| src-load-remote | packages/host/src/app-loaders/module-federation.ts:34 | packages/host | remote-resolution | Yes | Carrega o módulo remoto e obtém a fábrica de componente (packages/host/src/app-loaders/module-federation.ts:34-43), usando loadRemote importado em packages/host/src/app-loaders/module-federation.ts:1-4; fluxo chamado em packages/host/src/routes/apps.$baseRoute.tsx:24. |
| src-mount-export | packages/app-qiankun-1/src/index.tsx:1 | packages/app-qiankun-1 | runtime-composition | Yes | packages/app-qiankun-1/src/index.tsx:1 reexporta os lifecycles consumidos pelo host qiankun, que registra as unidades em packages/host/src/app-loaders/qiankun.ts:13-26. |
| src-mount-export | packages/app-qiankun-1/src/lifecycles.tsx:14 | packages/app-qiankun-1 | runtime-composition | Yes | Define lifecycle bootstrap em packages/app-qiankun-1/src/lifecycles.tsx:14-16, reexportado em packages/app-qiankun-1/src/index.tsx:1; unidade registrada pelo host em packages/host/src/configs/apps.ts:23-32 e packages/host/src/app-loaders/qiankun.ts:25. |
| src-mount-export | packages/app-qiankun-1/src/lifecycles.tsx:22 | packages/app-qiankun-1 | runtime-composition | Yes | Define lifecycle mount em packages/app-qiankun-1/src/lifecycles.tsx:22-39, reexportado em packages/app-qiankun-1/src/index.tsx:1; unidade registrada pelo host em packages/host/src/configs/apps.ts:23-32 e packages/host/src/app-loaders/qiankun.ts:25. |
| src-mount-export | packages/app-qiankun-1/src/lifecycles.tsx:45 | packages/app-qiankun-1 | runtime-composition | Yes | Define lifecycle unmount em packages/app-qiankun-1/src/lifecycles.tsx:45-52, reexportado em packages/app-qiankun-1/src/index.tsx:1; unidade registrada pelo host em packages/host/src/configs/apps.ts:23-32 e packages/host/src/app-loaders/qiankun.ts:25. |
| src-mount-export | packages/app-qiankun-2/src/index.tsx:1 | packages/app-qiankun-2 | runtime-composition | Yes | packages/app-qiankun-2/src/index.tsx:1 reexporta os lifecycles consumidos pelo host qiankun, que registra as unidades em packages/host/src/app-loaders/qiankun.ts:13-26. |
| src-mount-export | packages/app-qiankun-2/src/lifecycles.tsx:14 | packages/app-qiankun-2 | runtime-composition | Yes | Define lifecycle bootstrap em packages/app-qiankun-2/src/lifecycles.tsx:14-16, reexportado em packages/app-qiankun-2/src/index.tsx:1; unidade registrada pelo host em packages/host/src/configs/apps.ts:23-32 e packages/host/src/app-loaders/qiankun.ts:25. |
| src-mount-export | packages/app-qiankun-2/src/lifecycles.tsx:22 | packages/app-qiankun-2 | runtime-composition | Yes | Define lifecycle mount em packages/app-qiankun-2/src/lifecycles.tsx:22-39, reexportado em packages/app-qiankun-2/src/index.tsx:1; unidade registrada pelo host em packages/host/src/configs/apps.ts:23-32 e packages/host/src/app-loaders/qiankun.ts:25. |
| src-mount-export | packages/app-qiankun-2/src/lifecycles.tsx:45 | packages/app-qiankun-2 | runtime-composition | Yes | Define lifecycle unmount em packages/app-qiankun-2/src/lifecycles.tsx:45-52, reexportado em packages/app-qiankun-2/src/index.tsx:1; unidade registrada pelo host em packages/host/src/configs/apps.ts:23-32 e packages/host/src/app-loaders/qiankun.ts:25. |
| src-lifecycles | packages/host/src/app-loaders/qiankun.ts:2 | packages/host | runtime-composition | Yes | Importa registerMicroApps e start, usados em packages/host/src/app-loaders/qiankun.ts:25-26; registro ativado pelo App em packages/host/src/App.tsx:7-9. |
| src-lifecycles | packages/host/src/app-loaders/qiankun.ts:25 | packages/host | runtime-composition | Yes | Registra as unidades qiankun com entry, container e activeRule (packages/host/src/app-loaders/qiankun.ts:10-26); invocado por packages/host/src/App.tsx:8. |

## Construções fora da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| manual | packages/host/src/App.tsx:8 | packages/host | runtime-composition | Yes | O efeito do App inicia o registro das aplicações qiankun (packages/host/src/App.tsx:7-9), através de packages/host/src/app-loaders/index.ts:2; App montado em packages/host/src/bootstrap.tsx:3-11. |
| manual | packages/host/src/app-loaders/qiankun.ts:26 | packages/host | runtime-composition | Yes | start inicia a orquestração após registerMicroApps em packages/host/src/app-loaders/qiankun.ts:25-26; chamada ativa por packages/host/src/App.tsx:8. |
| manual | packages/host/src/configs/apps.ts:9 | packages/host | host-relationship | Yes | APP_CONFIGS declara as aplicações, arquitetura e entradas (packages/host/src/configs/apps.ts:9-34), usadas pelos dois carregadores em packages/host/src/app-loaders/qiankun.ts:10-21 e packages/host/src/routes/apps.$baseRoute.tsx:14-24. |
| manual | packages/host/src/routes/apps.$baseRoute.tsx:24 | packages/host | remote-resolution | Yes | A rota chama getRemote do manager para o registro selecionado (packages/host/src/routes/apps.$baseRoute.tsx:12-25); rota ligada ao router via packages/host/src/routeTree.gen.ts:15-16 e packages/host/src/router.tsx:2-4. |
| manual | packages/host/src/routes/apps.$baseRoute.tsx:43 | packages/host | dynamic-loading | Yes | React.lazy aguarda o componente fornecido pela unidade remota (packages/host/src/routes/apps.$baseRoute.tsx:39-45); o resultado vem do loader da rota em packages/host/src/routes/apps.$baseRoute.tsx:24. |
| manual | packages/host/src/routes/apps.$baseRoute.tsx:54 | packages/host | runtime-composition | Yes | Renderiza RootComponent remoto dentro de Suspense (packages/host/src/routes/apps.$baseRoute.tsx:52-56), obtido pelo manager em packages/host/src/app-loaders/module-federation.ts:34-43. |

## Resumo

Construções com composição: 19 (remote-resolution: 4, runtime-composition: 13, host-relationship: 1, dynamic-loading: 1).

## Notas

- O import multilinha de loadRemote em packages/host/src/app-loaders/module-federation.ts:1-4 não foi capturado, embora registerRemotes na linha seguinte tenha sido. Pelo critério de construções fora da mineração (passo 4 do método), o import estático fica como evidência da chamada em :34, sem linha manual própria. React.lazy e a chamada com getRemote foram registrados fora da mineração.
- Cadeia do host: packages/host/src/index.tsx:1 → packages/host/src/bootstrap.tsx:3-11 → packages/host/src/App.tsx:3-11 → registro qiankun e router. O arquivo gerado de rotas só foi consultado para confirmar o encadeamento; não gerou linha manual.
- Os hooks bootstrap dos remotes qiankun apenas registram log, mas participam do contrato de lifecycle exportado ao orquestrador. As chamadas root.unmount internas não são outra construção de interação entre unidades.
- Os hooks opcionais update em packages/app-qiankun-1/src/lifecycles.tsx:57-59 e packages/app-qiankun-2/src/lifecycles.tsx:57-59 não têm invocação observável; não foram acrescentados como composição ativa.
- Pelo critério de construções fora da mineração (passo 4 do método), ficam fora da tabela a chamada da fábrica `getRootComponent` em packages/host/src/app-loaders/module-federation.ts:40-42 (passo seguinte do `loadRemote` em :34) e os exports dos remotes que a definem: packages/app-mf-1/src/App.tsx:5-8 e packages/app-mf-1/src/exposed.tsx:1, packages/app-mf-2/src/App.tsx:5-8 e packages/app-mf-2/src/exposed.tsx:1.
