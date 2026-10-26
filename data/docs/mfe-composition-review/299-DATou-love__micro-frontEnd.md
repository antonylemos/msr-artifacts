---
schema: 1
id: 1088828444
full_name: DATou-love/micro-frontEnd
commit: 8e52e7d4fee1bc193922a8bea0f5ede7a0cb9942
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

# 299 — DATou-love/micro-frontEnd

## Leitura do repositório

Exemplo mínimo de qiankun com dois projetos sem workspace: um host Vue 3/Vite (`main-vue3`) e uma sub-aplicação Vue 2/Vue CLI (`sub-vue2`). Na sua entrada (main-vue3/index.html:11), o host registra duas sub-aplicações no orquestrador com `registerMicroApps` (main-vue3/src/main.ts:10-23), as duas no mesmo contêiner `#subapp-viewport` e ativadas por caminho, e depois chama `start` com `strictStyleIsolation: true` (main-vue3/src/main.ts:26-36). O contêiner fica no `App.vue` do host, ao lado dos links `/sub-vue2` e `/sub-react16`, e o `router-view` próprio do host é escondido nessas rotas (main-vue3/src/App.vue:4-14, main-vue3/src/App.vue:26-32).

`sub-vue2` segue o contrato do qiankun sem importar o pacote. Ela gera um bundle UMD `subVue2` com `chunkLoadingGlobal` próprio (sub-vue2/vue.config.js:12-20), serve na porta 8081 com CORS liberado (sub-vue2/vue.config.js:5-10), ajusta `__webpack_public_path__` quando roda dentro do qiankun e só se monta sozinha fora dele (sub-vue2/src/main.js:20-29). Também exporta `bootstrap`, `mount` e `unmount` (sub-vue2/src/main.js:32-46). A segunda sub-aplicação, `sub-react16` (`//localhost:3000`, main-vue3/src/main.ts:17-22), não tem código no repositório. O repositório é uma demonstração, com um único commit e só configuração de desenvolvimento em `localhost`.

Não há comunicação entre unidades: as `props` recebidas em `mount` só são usadas para pegar o `container` (sub-vue2/src/main.js:11, sub-vue2/src/main.js:36-38), e a revisão de código-fonte não encontrou `initGlobalState`, eventos nem `postMessage`. Como registrado na classificação, a montagem sob `strictStyleIsolation` não foi verificada: `render` procura `#app` com `container.querySelector` (sub-vue2/src/main.js:16), e isso pode não alcançar o conteúdo se ele estiver dentro de uma shadow root. Esse é um possível defeito de execução e não muda as relações. O `public/index.html` da sub-app também traz um `<div id="subapp-viewport">` antes do `#app` (sub-vue2/public/index.html:16-17), que não tem papel quando ela roda sozinha.

## Relações

| # | Origem | Destino | Tipo | Direção | Mecanismo | No snapshot | Ativa | Configuração | Código |
|---|---|---|---|---|---|---|---|---|---|
| 1 | main-vue3 | sub-vue2 | root-config → application | origem → destino | qiankun | Yes | Yes | sub-vue2/vue.config.js:6 (porta 8081 do dev server); sub-vue2/vue.config.js:15-18 (biblioteca `subVue2`, `libraryTarget: 'umd'`, `chunkLoadingGlobal`); sub-vue2/public/index.html:8 (`<base href="/sub-vue2/">`) | sub-vue2/src/main.js:32; sub-vue2/src/main.js:36; sub-vue2/src/main.js:41; sub-vue2/src/main.js:16; main-vue3/src/main.ts:3; main-vue3/src/main.ts:10; main-vue3/src/main.ts:26 |
| 2 | main-vue3 | sub-react16 | root-config → application | origem → destino | qiankun | No | Yes | — | main-vue3/src/main.ts:3; main-vue3/src/main.ts:10; main-vue3/src/main.ts:26 |

## Observações

**1. main-vue3 → sub-vue2.** O host registra `name: 'sub-vue2'`, `entry: '//localhost:8081'`, `container: '#subapp-viewport'` e `activeRule: '/sub-vue2'` (main-vue3/src/main.ts:11-16). O destino tem correspondência explícita no snapshot: o nome registrado é o do diretório, e o caminho de ativação coincide com o `<base href="/sub-vue2/">` da sub-app (sub-vue2/public/index.html:8) e com o `base: '/sub-vue2'` do seu roteador (sub-vue2/src/router/index.js:12). A porta 8081 (sub-vue2/vue.config.js:6) só confirma o `entry`. Os lifecycles exportados pela sub-app e a chamada `$mount` em `render` (sub-vue2/src/main.js:16, sub-vue2/src/main.js:32-46) entram nesta relação, junto com o import do qiankun, o registro e o `start` do host. O host registra a sub-app num orquestrador, não carrega módulos dela, por isso o tipo é `root-config → application`. Ativa é `Yes` porque todas as linhas de código são `Yes` na revisão de código-fonte. A dúvida de execução com `strictStyleIsolation`, descrita na leitura, não muda os valores da linha.

**2. main-vue3 → sub-react16.** Esta é a segunda entrada do mesmo `registerMicroApps`: `name: 'sub-react16'`, `entry: '//localhost:3000'`, mesmo contêiner, `activeRule: '/sub-react16'` (main-vue3/src/main.ts:17-22). O host também tem um link para essa rota (main-vue3/src/App.vue:7). Nenhum diretório do snapshot corresponde ao nome, ao caminho ou à porta, então o destino é escrito como aparece no registro e marcado como fora do snapshot: a configuração o identifica como uma aplicação separada servida em outro endereço. Não há configuração do destino a citar. Ativa é `Yes` porque o registro é código `Yes` (main-vue3/src/main.ts:10), e as linhas de import e `start` do host também sustentam esta relação.

## Resumo

Relações: 2 (root-config → application: 2). Ativas: 2. Destino fora do snapshot: 1.
Unidades sem relação: nenhuma.
