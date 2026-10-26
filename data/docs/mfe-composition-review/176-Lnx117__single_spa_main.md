---
schema: 1
id: 1181945275
full_name: Lnx117/single_spa_main
commit: 112c73b7d0bc4739bcab53de03b404ce2fbde05a
inputs:
  mining:
    output: data/mining/mfe-mining-001
    version: "1"
    config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
  inspection:
    output: data/inspections/mfe-dependencies-001
    version: "1"
    config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 176 — Lnx117/single_spa_main

## Leitura do repositório

O repositório contém só o root config de uma aplicação single-spa. Ele é a única unidade do snapshot (`.`). Os dois microfrontends que compõe, `menu` e `base`, ficam fora dele. O projeto é um Vite com `vite-plugin-single-spa` em modo `type: 'root'` e `cssStrategy: 'multiMife'` (vite.config.ts:12-15), servido na porta 9080 (vite.config.ts:18). A página `index.html` tem dois contêineres, `single-spa-application:menu` dentro do `nav` e `single-spa-application:base` dentro do `main` (index.html:12, 17), e carrega `src/main.ts` como entrada (index.html:20). Esse arquivo registra as duas aplicações com `registerApplication`, ambas ativas em `/` e portanto montadas juntas em todas as rotas (src/main.ts:13-17, 21-25), e chama `start()` (src/main.ts:29).

Cada aplicação é carregada por `import()` de uma URL lida de `import.meta.env` (src/main.ts:7, 15, 23). No snapshot, os valores só aparecem em `.envtest`: `VITE_MENU=http://localhost:9083/src/index.ts` e `VITE_BASE=http://localhost:9081/src/index.ts` (.envtest:8, 11). Os comentários desse arquivo explicam que cada microfrontend é um dev server Vite próprio em sua porta e que o `import()` traz os lifecycles `bootstrap`, `mount` e `unmount` (.envtest:2-4). Também citam, como passo futuro, builds publicados num CDN (.envtest:5). Não há import map, Module Federation, custom element, iframe nem troca de mensagens. A ligação com as unidades é só por URL.

É um exemplo pequeno, de seis arquivos, sem README. Há uma ressalva de execução: o comentário de src/main.ts:5-6 manda definir as URLs em `.env`/`.env.local`, mas o único arquivo versionado se chama `.envtest`, que o Vite não carrega por padrão. A ressalva já está nas revisões anteriores e não muda as relações, porque o alvo de cada registro é nomeado no código e a URL está declarada no snapshot.

## Relações

| # | Origem | Destino | Tipo | Direção | Mecanismo | No snapshot | Ativa | Configuração | Código |
|---|---|---|---|---|---|---|---|---|---|
| 1 | . | menu | root-config → application | origem → destino | single-spa | No | Yes | vite.config.ts:12-15 (`vitePluginSingleSpa` com `type: 'root'`); .envtest:8 (`VITE_MENU=http://localhost:9083/src/index.ts`) | src/main.ts:13; src/main.ts:15; src/main.ts:29 |
| 2 | . | base | root-config → application | origem → destino | single-spa | No | Yes | vite.config.ts:12-15 (`vitePluginSingleSpa` com `type: 'root'`); .envtest:11 (`VITE_BASE=http://localhost:9081/src/index.ts`) | src/main.ts:21; src/main.ts:23; src/main.ts:29 |

## Observações

**1. . → menu.** O root config registra a aplicação `menu` com `app: () => import(env.VITE_MENU)` e `activeWhen: '/'` (src/main.ts:13-17). O single-spa a monta no contêiner `single-spa-application:menu` do `nav` (index.html:12) depois do `start()` (src/main.ts:29). O destino é identificado pelo nome do registro e pela URL `http://localhost:9083/src/index.ts` (.envtest:8), um dev server Vite de outro projeto (.envtest:2). Nenhuma unidade do snapshot corresponde a ele, daí No snapshot = `No`. O tipo é `root-config → application` porque o destino entra registrado no orquestrador, embora a carga seja um `import()` dinâmico. Ativa = `Yes`: as três linhas de código são `Yes` na revisão de código-fonte. A ressalva é a do nome do arquivo de ambiente, descrita na leitura do repositório.

**2. . → base.** Mesmo caminho da relação 1. O registro `base` (src/main.ts:21-25) carrega por `import()` a URL de `VITE_BASE`, `http://localhost:9081/src/index.ts` (.envtest:11), também ativo em `/`. A aplicação é montada no contêiner `single-spa-application:base` do `main` (index.html:17), em paralelo com `menu`. O destino está fora do snapshot e Ativa = `Yes` pelas linhas de src/main.ts:21, 23 e 29. A linha src/main.ts:29 (`start()`) sustenta as duas relações e aparece nas duas.

## Resumo

Relações: 2 (root-config → application: 2). Ativas: 2. Destino fora do snapshot: 2.
Unidades sem relação: nenhuma.
