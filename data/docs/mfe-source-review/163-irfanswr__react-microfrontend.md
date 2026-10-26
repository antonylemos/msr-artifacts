---
schema: 1
id: 1041883313
full_name: irfanswr/react-microfrontend
commit: 00ca0bf8640b7015f760f377f76c971b11fdc95c
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 163 — irfanswr/react-microfrontend

## Construções da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| src-mount-export | vue-child-app/src/main.js:24 | vue-child-app | runtime-composition | Yes | Exporta o lifecycle `bootstrap` criado por `singleSpaVue` em vue-child-app/src/main.js:6-22; a unidade é resolvida como `@frontenddevs/vue-child-app` pelo import map do root config (parent-app/src/index.ejs:38), carregada por parent-app/src/frontenddevs-root-config.js:13 e registrada em parent-app/src/frontenddevs-root-config.js:18, conforme o layout parent-app/src/microfrontend-layout.html:5 e :11. |
| src-mount-export | vue-child-app/src/main.js:25 | vue-child-app | runtime-composition | Yes | Exporta o lifecycle `mount` do mesmo objeto de vue-child-app/src/main.js:6-22, chamado pelo single-spa do root config ao ativar as rotas `default` e `vue-app` (parent-app/src/microfrontend-layout.html:3-5 e :10-11). |
| src-mount-export | vue-child-app/src/main.js:26 | vue-child-app | runtime-composition | Yes | Exporta o lifecycle `unmount` do mesmo objeto, com o mesmo consumidor de parent-app/src/frontenddevs-root-config.js:18-20. |
| src-lifecycles | react-child-app/src/frontenddevs-react-mfe.js:3 | react-child-app | runtime-composition | Yes | Importa `singleSpaReact`, usado em react-child-app/src/frontenddevs-react-mfe.js:6; o uso que habilita é `Yes`. |
| src-lifecycles | react-child-app/src/frontenddevs-react-mfe.js:6 | react-child-app | runtime-composition | Yes | `singleSpaReact({ React, ReactDOMClient, rootComponent: Root, ... })` (react-child-app/src/frontenddevs-react-mfe.js:6-14) cria os lifecycles exportados em react-child-app/src/frontenddevs-react-mfe.js:16; a unidade é resolvida como `@frontenddevs/react-mfe` em parent-app/src/index.ejs:37 (bundle ESM, `outputSystemJS: false` em react-child-app/webpack.config.js:10) e registrada pelo root config em parent-app/src/frontenddevs-root-config.js:18, nas rotas de parent-app/src/microfrontend-layout.html:4 e :8. |
| src-lifecycles | vue-child-app/src/main.js:2 | vue-child-app | runtime-composition | Yes | Importa `singleSpaVue`, usado em vue-child-app/src/main.js:6; o uso que habilita é `Yes`. |
| src-lifecycles | vue-child-app/src/main.js:6 | vue-child-app | runtime-composition | Yes | `singleSpaVue({ createApp, appOptions: { render() ... } })` (vue-child-app/src/main.js:6-22) adapta o App Vue a lifecycles single-spa, exportados em vue-child-app/src/main.js:24-26 e consumidos pelo root config (parent-app/src/index.ejs:38; parent-app/src/frontenddevs-root-config.js:18). |
| src-import-map | parent-app/src/index.ejs:10 | parent-app | none | No | Comentário HTML (`<!-- ... -->`) com instrução de uso do import-map-overrides; não é código ativo. |
| src-import-map | parent-app/src/index.ejs:11 | parent-app | none | No | Comentário HTML com link para a documentação do import-map-overrides; não é código ativo. |
| src-import-map | parent-app/src/index.ejs:12 | parent-app | none | No | `<meta name="import-map-overrides-domains" ...>` inteiro dentro de comentário HTML (`<!--` e `-->` na própria linha); inativo. |
| src-import-map | parent-app/src/index.ejs:44 | parent-app | none | No | `<script src=".../import-map-overrides@5.1.1/...">` carrega de CDN a biblioteca de desenvolvimento que permite sobrescrever entradas do import map; não carrega o bundle de outra unidade. A resolução das unidades está no import map de parent-app/src/index.ejs:33-41 (linha manual). |
| src-import-map | parent-app/src/index.ejs:57 | parent-app | none | No | `<import-map-overrides-full show-when-local-storage="devtools" dev-libs>` é o painel de desenvolvimento da biblioteca carregada em parent-app/src/index.ejs:44, exibido só com a chave `devtools` no localStorage; não é custom element de outra unidade. |
| src-html-external-script | parent-app/src/index.ejs:44 | parent-app | none | No | Mesmo script da linha anterior de parent-app/src/index.ejs:44: biblioteca import-map-overrides de CDN, não bundle de outra unidade. |
| src-html-external-script | parent-app/src/index.ejs:45 | parent-app | none | No | `<script src=".../@single-spa/import-map-injector@2.0.1/...">` carrega de CDN a biblioteca que instala os `<script type="injector-importmap">` (parent-app/src/index.ejs:9, :15, :33); é biblioteca, não bundle de outra unidade. As unidades são carregadas por parent-app/src/frontenddevs-root-config.js:13. |

## Construções fora da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| manual | parent-app/src/frontenddevs-root-config.js:13 | parent-app | dynamic-loading | Yes | `loadApp({ name }) { return import(/* webpackIgnore: true */ name); }` (parent-app/src/frontenddevs-root-config.js:12-14) carrega em runtime, pelo nome resolvido no import map, as unidades `@frontenddevs/react-mfe` e `@frontenddevs/vue-child-app` (parent-app/src/index.ejs:37-38). O root config é a entrada do bundle (parent-app/webpack.config.js:7-13) e é importado pela página em parent-app/src/index.ejs:53-55. |
| manual | parent-app/src/frontenddevs-root-config.js:18 | parent-app | runtime-composition | Yes | `applications.forEach(registerApplication)` registra no single-spa as aplicações construídas a partir do layout em parent-app/src/frontenddevs-root-config.js:9-15 (`registerApplication` importado em :1); o motor de layout criado em :16 e ativado em :19 posiciona as unidades no `<main>` das rotas. |
| manual | parent-app/src/frontenddevs-root-config.js:20 | parent-app | runtime-composition | Yes | `start()` do single-spa (importado em parent-app/src/frontenddevs-root-config.js:1) inicia o orquestrador; sem ele os registros de :18 não montam as unidades React e Vue. |
| manual | parent-app/src/index.ejs:33 | parent-app | remote-resolution | Yes | `<script type="injector-importmap">` (parent-app/src/index.ejs:33-41) mapeia os nomes das unidades para URLs de entrada: `@frontenddevs/react-mfe` → `http://localhost:8081/frontenddevs-react-mfe.js` (:37) e `@frontenddevs/vue-child-app` → `http://localhost:8082/js/app.js` (:38). Ativo só quando `isLocal` (parent-app/src/index.ejs:32; parent-app/webpack.config.js:21-22), passado pelo script `start` (`--env isLocal`, parent-app/package.json:4). |
| manual | parent-app/src/microfrontend-layout.html:1 | parent-app | host-relationship | Yes | `<single-spa-router>` (parent-app/src/microfrontend-layout.html:1-14) é a tabela de rotas do host: rota padrão com as duas unidades (:3-6), `react-app` com `@frontenddevs/react-mfe` (:7-9) e `vue-app` com `@frontenddevs/vue-child-app` (:10-12). Importada e convertida em rotas em parent-app/src/frontenddevs-root-config.js:7-9. |

## Resumo

Construções com composição: 12 (runtime-composition: 9, dynamic-loading: 1, remote-resolution: 1, host-relationship: 1).

## Notas

- O import map com as URLs das unidades só existe no modo local (`<% if (isLocal) { %>`, parent-app/src/index.ejs:32-42). No build de produção (`webpack --mode=production`, parent-app/package.json:11) não há mapa para as unidades: a linha do mapa de produção está comentada em parent-app/src/index.ejs:30. As construções foram anotadas `Yes` pelo caminho ativo de `start`.
- `import('@frontenddevs/root-config')` em parent-app/src/index.ejs:54 carrega o próprio root config (mapeado para `//localhost:9000/frontenddevs-root-config.js` em parent-app/src/index.ejs:36), interno à unidade `parent-app`; não virou linha manual.
- O formato do bundle do vue-child-app depende do `vue-cli-plugin-single-spa` (vue-child-app/package.json:24), sem opções em vue-child-app/vue.config.js:1-4; o snapshot não mostra se a saída é compatível com o `import()` nativo do root config. Não muda a resposta: a ligação está declarada em parent-app/src/index.ejs:38 e parent-app/src/microfrontend-layout.html:5 e :11.
- O padrão `src-import-map` pegou comentários HTML e a biblioteca import-map-overrides, mas não o import map das unidades (parent-app/src/index.ejs:33-41).
