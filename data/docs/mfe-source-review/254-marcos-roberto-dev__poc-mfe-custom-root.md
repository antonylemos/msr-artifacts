---
schema: 1
id: 1131085284
full_name: marcos-roberto-dev/poc-mfe-custom-root
commit: 6ae6565dc49a391729b62588c5fccf37d2be104b
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 254 — marcos-roberto-dev/poc-mfe-custom-root

## Construções da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| src-mount-export | content-app/src/main.ts:20 | content-app | runtime-composition | Yes | Exporta o lifecycle `bootstrap` criado por `singleSpaVue` em content-app/src/main.ts:8-18. A unidade é resolvida como `@org/content-app` pelos import maps dos dois hosts (root-app/index.html:14; root-classic/src/index.ejs:34) e consumida pelo `ParcelWrapper` do root-app (root-app/src/App.vue:9; root-app/src/components/ParcelWrapper.vue:22-35) e pelo `registerApplication` do root-classic (root-classic/src/org-root-config.ts:18; root-classic/src/microfrontend-layout.html:23). |
| src-mount-export | content-app/src/main.ts:21 | content-app | runtime-composition | Yes | Exporta o lifecycle `mount` do mesmo objeto de content-app/src/main.ts:8-18; o root-app verifica `config.mount` antes de montar a parcel (root-app/src/components/ParcelWrapper.vue:33) e o root-classic o chama ao ativar a rota `default` (root-classic/src/microfrontend-layout.html:21-24). |
| src-mount-export | content-app/src/main.ts:22 | content-app | runtime-composition | Yes | Exporta o lifecycle `unmount` do mesmo objeto, com os mesmos consumidores (root-app/src/components/ParcelWrapper.vue:33; root-classic/src/org-root-config.ts:18-20). |
| src-mount-export | topbar-app/src/main.ts:20 | topbar-app | runtime-composition | Yes | Exporta o lifecycle `bootstrap` criado por `singleSpaVue` em topbar-app/src/main.ts:8-18. A unidade é resolvida como `@org/topbar-app` no root-classic (root-classic/src/index.ejs:35; root-classic/src/microfrontend-layout.html:22) e, pela mesma URL `http://127.0.0.1:5175/src/main.ts`, como `@org/header-app` no root-app (root-app/index.html:15; root-app/src/App.vue:8). |
| src-mount-export | topbar-app/src/main.ts:21 | topbar-app | runtime-composition | Yes | Exporta o lifecycle `mount` do mesmo objeto de topbar-app/src/main.ts:8-18, chamado pela parcel do root-app (root-app/src/components/ParcelWrapper.vue:3-5, :33) e pelo single-spa do root-classic (root-classic/src/org-root-config.ts:18-20). |
| src-mount-export | topbar-app/src/main.ts:22 | topbar-app | runtime-composition | Yes | Exporta o lifecycle `unmount` do mesmo objeto, com os mesmos consumidores (root-app/src/components/ParcelWrapper.vue:33; root-classic/src/org-root-config.ts:18-20). |
| src-lifecycles | content-app/src/main.ts:4 | content-app | runtime-composition | Yes | Importa `singleSpaVue`, usado em content-app/src/main.ts:8; o uso que habilita é `Yes`. |
| src-lifecycles | content-app/src/main.ts:8 | content-app | runtime-composition | Yes | `singleSpaVue({ createApp, appOptions: { render() { return h(App) } } })` (content-app/src/main.ts:8-18) adapta o App Vue a lifecycles single-spa, exportados em content-app/src/main.ts:20-22; a montagem própria está comentada em content-app/src/main.ts:6, então a UI só sobe quando um host chama `mount`. |
| src-lifecycles | topbar-app/src/main.ts:4 | topbar-app | runtime-composition | Yes | Importa `singleSpaVue`, usado em topbar-app/src/main.ts:8; o uso que habilita é `Yes`. |
| src-lifecycles | topbar-app/src/main.ts:8 | topbar-app | runtime-composition | Yes | `singleSpaVue({ createApp, appOptions: { render() { return h(App) } } })` (topbar-app/src/main.ts:8-18) cria os lifecycles exportados em topbar-app/src/main.ts:20-22; montagem própria comentada em topbar-app/src/main.ts:6. Consumidos pelos dois hosts (root-app/src/App.vue:8; root-classic/src/microfrontend-layout.html:22). |
| src-import-map | root-app/index.html:11 | root-app | remote-resolution | Yes | `<script type="importmap">` nativo (root-app/index.html:11-18) mapeia `@org/content-app` → `http://127.0.0.1:5174/src/main.ts` (:14) e `@org/header-app` → `http://127.0.0.1:5175/src/main.ts` (:15). Os nomes são os passados ao `ParcelWrapper` (root-app/src/App.vue:8-9) e resolvidos pelo `import(url)` de root-app/src/utils/dynamicImport.ts:15. Alvos: content-app e topbar-app (mesmas URLs de root-classic/src/index.ejs:34-35). |
| src-import-map | root-app/index.html:24 | root-app | none | No | `<!-- <script type="systemjs-importmap">` abre um comentário HTML que vai até root-app/index.html:30 (`</script> -->`); o mapa SystemJS para `@org/header-app` → `http://127.0.0.1:4173/app.js` (:27) está inativo. |
| src-import-map | root-app/index.html:34 | root-app | none | No | `src` do `<script>` de root-app/index.html:33-34 que carrega de CDN a biblioteca import-map-overrides (ferramenta de desenvolvimento para sobrescrever o import map); não carrega o bundle de outra unidade. |
| src-import-map | root-app/index.html:41 | root-app | none | No | `<import-map-overrides-full show-when-local-storage="overrides-ui" dev-libs>` é o painel da biblioteca carregada em root-app/index.html:33-34, exibido só com a chave `overrides-ui` no localStorage; não é custom element de outra unidade. |
| src-import-map | root-app/src/global.d.ts:1 | root-app | none | No | Comentário de um arquivo de declarações de tipo (`declare global { interface Window ... }`, root-app/src/global.d.ts:3-26); não é código executável. |
| src-import-map | root-app/src/global.d.ts:14 | root-app | none | No | Comentário JSDoc da propriedade `importMapOverrides` na declaração de tipo de `Window` (root-app/src/global.d.ts:13-17). |
| src-import-map | root-app/src/global.d.ts:15 | root-app | none | No | URL da documentação do import-map-overrides dentro do mesmo comentário JSDoc (root-app/src/global.d.ts:13-16). |
| src-import-map | root-app/src/global.d.ts:17 | root-app | none | No | Declaração de tipo `importMapOverrides?: { ... }` (root-app/src/global.d.ts:17-24); só tipagem, nenhum uso de `window.importMapOverrides` no código do root-app. |
| src-import-map | root-app/src/utils/dynamicImport.ts:6 | root-app | none | No | Comentário JSDoc que descreve a estratégia do helper (root-app/src/utils/dynamicImport.ts:1-9). |
| src-import-map | root-app/src/utils/dynamicImport.ts:19 | root-app | none | No | `console.warn(...)` no `catch` do `import()` nativo; só registro de log. |
| src-import-map | root-app/src/utils/dynamicImport.ts:21 | root-app | none | No | Comentário de linha antes do fallback SystemJS (root-app/src/utils/dynamicImport.ts:22-33). |
| src-import-map | root-app/src/utils/dynamicImport.ts:24 | root-app | dynamic-loading | Undetermined | `window.System.import(url)` é o fallback executado só quando o `import()` nativo de root-app/src/utils/dynamicImport.ts:15 falha. O SystemJS é carregado (root-app/index.html:21), mas o único mapa `systemjs-importmap` está comentado (root-app/index.html:24-30), e os nomes `@org/header-app` e `@org/content-app` (root-app/src/App.vue:8-9) só estão no import map nativo (root-app/index.html:11-18). Não dá para confirmar que este caminho carregue alguma unidade; ver Notas. |
| src-import-map | root-app/src/utils/dynamicImport.ts:25 | root-app | none | No | `console.log(...)` de sucesso do fallback; só registro de log. |
| src-import-map | root-app/src/utils/dynamicImport.ts:28 | root-app | none | No | `console.error(...)` quando os dois caminhos falham; só registro de log. |
| src-import-map | root-classic/src/index.ejs:12 | root-classic | none | No | Comentário HTML (`<!-- ... -->` na própria linha) com instrução de uso do import-map-overrides; não é código ativo. |
| src-import-map | root-classic/src/index.ejs:13 | root-classic | none | No | Comentário HTML com link para a documentação do import-map-overrides; não é código ativo. |
| src-import-map | root-classic/src/index.ejs:14 | root-classic | none | No | `<meta name="import-map-overrides-domains" ...>` inteiro dentro de comentário HTML (`<!--` e `-->` na própria linha); inativo. |
| src-import-map | root-classic/src/index.ejs:41 | root-classic | none | No | `<script src=".../import-map-overrides@5.1.1/...">` carrega de CDN a biblioteca de desenvolvimento do import map; não carrega o bundle de outra unidade. A resolução das unidades está no import map de root-classic/src/index.ejs:30-38 (linha manual). |
| src-import-map | root-classic/src/index.ejs:56 | root-classic | none | No | `<import-map-overrides-full show-when-local-storage="devtools" dev-libs>` é o painel da biblioteca carregada em root-classic/src/index.ejs:41, exibido só com a chave `devtools` no localStorage; não é custom element de outra unidade. |
| src-html-external-script | root-app/index.html:21 | root-app | none | No | `<script src=".../systemjs@6.14.2/dist/system.min.js">` carrega de CDN o carregador SystemJS, usado só pelo fallback de root-app/src/utils/dynamicImport.ts:22-24; é biblioteca, não bundle de outra unidade. |
| src-html-external-script | root-classic/src/index.ejs:41 | root-classic | none | No | Mesmo script da linha `src-import-map` de root-classic/src/index.ejs:41: biblioteca import-map-overrides de CDN, não bundle de outra unidade. |

## Construções fora da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| manual | root-app/src/App.vue:8 | root-app | host-relationship | Yes | `<ParcelWrapper app-name="@org/header-app">` declara no template raiz do host (montado em root-app/src/main.ts:5) que o topbar entra como primeira parcel; o nome é resolvido para `http://127.0.0.1:5175/src/main.ts` (root-app/index.html:15), a URL do topbar-app em root-classic/src/index.ejs:35. |
| manual | root-app/src/App.vue:9 | root-app | host-relationship | Yes | `<ParcelWrapper app-name="@org/content-app">` declara a segunda parcel do host, resolvida para `http://127.0.0.1:5174/src/main.ts` (root-app/index.html:14), a content-app. |
| manual | root-app/src/components/ParcelWrapper.vue:3 | root-app | runtime-composition | Yes | `<Parcel ... :config="parcelConfigRef" :mountParcel="mountParcel" ...>` (root-app/src/components/ParcelWrapper.vue:3-5), componente de `single-spa-vue/parcel` (:10), monta como parcel o módulo remoto carregado em :22 usando `mountRootParcel` do single-spa (:11, :46); o objeto exige `mount` e `unmount` (:33), exportados por content-app/src/main.ts:20-22 e topbar-app/src/main.ts:20-22. |
| manual | root-app/src/utils/dynamicImport.ts:15 | root-app | dynamic-loading | Yes | `await import(/* @vite-ignore */ url)` carrega em runtime o módulo pelo nome recebido; chamado por `dynamicImport(props.appName)` em root-app/src/components/ParcelWrapper.vue:22 com `@org/header-app` e `@org/content-app` (root-app/src/App.vue:8-9), resolvidos pelo import map nativo (root-app/index.html:11-18) para topbar-app e content-app. |
| manual | root-classic/src/index.ejs:30 | root-classic | remote-resolution | Yes | `<script type="injector-importmap">` (root-classic/src/index.ejs:30-38) mapeia `@org/content-app` → `http://127.0.0.1:5174/src/main.ts` (:34) e `@org/topbar-app` → `http://127.0.0.1:5175/src/main.ts` (:35), além do próprio `@org/root-config` (:33). Ativo só quando `isLocal` (root-classic/src/index.ejs:29; root-classic/webpack.config.js:21-22), passado pelo script `start` (`--env isLocal`, root-classic/package.json:4). |
| manual | root-classic/src/microfrontend-layout.html:1 | root-classic | host-relationship | Yes | `<single-spa-router>` (root-classic/src/microfrontend-layout.html:1-26) é a tabela de rotas do host: na rota `default` (:21-24), `@org/topbar-app` (:22) e `@org/content-app` (:23) dentro de `<main>`. Os exemplos de :9-18 estão comentados. Importada e convertida em rotas em root-classic/src/org-root-config.ts:7-9. |
| manual | root-classic/src/org-root-config.ts:13 | root-classic | dynamic-loading | Yes | `loadApp({ name }) { return import(/* webpackIgnore: true */ name); }` (root-classic/src/org-root-config.ts:12-14) carrega em runtime, pelo nome resolvido no import map (root-classic/src/index.ejs:34-35), as unidades `@org/topbar-app` e `@org/content-app`. O root config é a entrada do bundle (root-classic/webpack.config.js:7-13) e é importado pela página em root-classic/src/index.ejs:52-54. |
| manual | root-classic/src/org-root-config.ts:18 | root-classic | runtime-composition | Yes | `applications.forEach(registerApplication)` registra no single-spa as aplicações construídas a partir do layout em root-classic/src/org-root-config.ts:9-15 (`registerApplication` importado em :1); o motor de layout criado em :16 e ativado em :19 posiciona as unidades no `<main>` da rota. |
| manual | root-classic/src/org-root-config.ts:20 | root-classic | runtime-composition | Yes | `start()` do single-spa (importado em root-classic/src/org-root-config.ts:1) inicia o orquestrador; sem ele os registros de :18 não montam topbar-app e content-app. |

## Resumo

Construções com composição: 20 (runtime-composition: 13, remote-resolution: 2, host-relationship: 3, dynamic-loading: 2).

## Notas

- Os dois hosts são alternativos e usam os mesmos remotos pelas mesmas URLs: o root-app monta topbar-app e content-app como parcels (`mountRootParcel`), e o root-classic os registra como aplicações single-spa com single-spa-layout. No root-app o topbar se chama `@org/header-app` (root-app/index.html:15) e no root-classic `@org/topbar-app` (root-classic/src/index.ejs:35).
- As URLs dos remotos usam portas fixas (5174 para content-app, 5175 para topbar), mas nenhum `vite.config.ts` fixa porta (content-app/vite.config.ts:5-7; topbar-app/vite.config.ts:5-20) e os `package.json` só têm `"dev": "vite"`. A associação nome → unidade vem da coincidência das URLs nos dois hosts; o snapshot não mostra a ordem de subida dos servidores.
- O fallback `System.import` do root-app (root-app/src/utils/dynamicImport.ts:22-33) parece pensado para o build `format: "system"` do topbar-app (topbar-app/vite.config.ts:14-15, saída `app.js`), referido só no mapa SystemJS comentado (root-app/index.html:27). Com o mapa comentado, o caminho fica sem alvo confirmado; por isso `Undetermined`. Não muda as demais respostas: o caminho nativo (:15) carrega as duas unidades.
- `root-app/src/importMap.json`, `root-app/src/importMap.dev.json` e `root-app/mfe-app.json` têm mapas com as unidades (incluindo `spa.js` e a porta 5173 para content-app em root-app/mfe-app.json:4), mas nenhum arquivo do snapshot os importa ou referencia; não viraram linhas.
- O mapa do root-classic só existe no modo local (`<% if (isLocal) { %>`, root-classic/src/index.ejs:29-39); o mapa de produção está comentado em root-classic/src/index.ejs:27. As construções foram anotadas `Yes` pelo caminho ativo de `start`.
- `import('@org/root-config')` em root-classic/src/index.ejs:53 carrega o próprio root config (mapeado em :33), interno à unidade `root-classic`; não virou linha manual.
- O import de `root-app/src/modules/Topbar/src/TopbarApp.vue` e seu uso estão comentados (root-app/src/App.vue:3 e :7); é código local do root-app, não composição.
- O padrão `src-import-map` pegou comentários, logs e declarações de tipo em root-app/src/global.d.ts e root-app/src/utils/dynamicImport.ts, mas não o `import()` nativo (root-app/src/utils/dynamicImport.ts:15) nem o import map do root-classic (root-classic/src/index.ejs:30-38).
