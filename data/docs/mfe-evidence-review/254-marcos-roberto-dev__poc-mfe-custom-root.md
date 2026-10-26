---
schema: 1
id: 1131085284
full_name: marcos-roberto-dev/poc-mfe-custom-root
commit: 6ae6565dc49a391729b62588c5fccf37d2be104b
inputs:
  - docs/mfe-dependency-review
  - docs/mfe-structure-review
  - docs/mfe-source-review
  - docs/mfe-composition-review
  - docs/mfe-build-deploy-review
  - docs/mfe-documentation-review
  - docs/mfe-history-review
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 254 — marcos-roberto-dev/poc-mfe-custom-root

## Leitura do repositório

É uma prova de conceito single-spa com Vue 3, em quatro projetos irmãos, sem workspace na raiz. `content-app` e `topbar-app` são aplicações Vite que só exportam lifecycles (#60, #63). Os outros dois projetos são hosts alternativos que compõem os mesmos dois remotos pelas mesmas URLs de dev server: o `root-app`, um "custom root" em Vue (#61), e o `root-classic`, a root config clássica do create-single-spa (#62). Cada projeto tem build próprio e nenhum tem deploy observado (#68 a #71).

A cadeia que sustenta a arquitetura tem dois ramos, um por host.

- **Remotos:** `single-spa-vue` é declarado e usado nos dois remotos (#2, #12). `singleSpaVue` cria os lifecycles, que a entrada exporta (#20 a #29). A montagem própria está comentada, então a UI só sobe quando um host chama `mount`.
- **`root-classic`:**
  - dependências: `single-spa`, `single-spa-layout` e a configuração webpack do single-spa (#7, #8, #10);
  - configuração: o builder com nome próprio (#15), o layout, que põe as duas aplicações na rota padrão (#16), e o import map local, que as resolve para as URLs dos dev servers (#14);
  - código: a página tem o import map (#55) e a tabela de rotas (#56); a root config carrega cada aplicação por `import()` do nome, registra todas e chama `start()` (#57 a #59);
  - relações: duas relações root-config → application ativas (#65, #66).
- **`root-app`:**
  - dependências: `single-spa` e `single-spa-vue` (#3, #4);
  - configuração: o import map nativo da página (#13);
  - código: o template raiz nomeia as duas parcels (#51, #52); o helper as carrega por `import()` nativo (#54), e o wrapper as monta com `mountRootParcel` (#53); a linha do import map nomeia os destinos (#30);
  - relações: duas relações host → remote ativas (#64, #67).

A ressalva do `root-classic` é que o import map das aplicações só é emitido com `isLocal`, pelo script `start`, e o mapa de produção está comentado (#14). O histórico mostra que é assim desde o primeiro commit (#86).

O que fica ambíguo:
- **Destino de `@org/header-app` (#67):** o `root-app` chama o topbar por um nome que nenhuma unidade tem. A ligação com o `topbar-app` vem só da URL igual à do `@org/topbar-app` no outro host (#13, #14), em que só a porta distingue a unidade. A relação é ativa, e o destino fica com o nome do artefato. O histórico mostra que os dois nomes convivem desde o primeiro commit, sem renomeação (#87).
- **Fallback SystemJS (#41):** o `System.import` do helper só roda se o `import()` nativo falhar. O único mapa SystemJS está comentado (#31), então o caminho não tem alvo confirmado. O histórico mostra que o caminho chega assim no primeiro commit (#83).

Sinais que enganam:
- **Dependências sem uso:** `single-spa` nos dois remotos (#1, #11), `vite-plugin-single-spa` no `root-app` (#5) e `@types/systemjs` no `root-classic` (#6). O histórico não mostra uso de nenhuma delas (#78 a #80).
- **Import maps não lidos:** `root-app/mfe-app.json`, `root-app/src/importMap.dev.json` e `root-app/src/importMap.json` nomeiam as duas unidades, mas nenhum arquivo os lê (#17 a #19, #85).
- **Linhas da mineração:** comentários, logs e declarações de tipo (#34 a #40, #42 a #46). Também as bibliotecas de CDN, `import-map-overrides` e o carregador SystemJS (#32, #33, #47 a #50). Nenhuma carrega uma unidade.
- **Cópia do topbar no `root-app`:** entra já desligada, depois do `topbar-app` (#82).

A documentação são comentários do `root-app` e o título da tela do topbar. As afirmações sobre o import map nativo e o `import()` são corroboradas (#72, #74, #75). As que falam de microfrontends SystemJS, só em parte (#73, #76). O título "Topbar - MFE" é corroborado (#77).

Configuração: ficaram 7 blocos, um por arquivo, porque cada arquivo serve uma única unidade. As duas páginas dos hosts entraram pelos import maps (#13, #14), a configuração webpack do `root-classic` pelo builder single-spa com nome próprio (#15), o layout pelo registro de aplicações (#16). Os três JSON do `root-app` entraram como import maps citados no Ponto da 3.4.8 #8 (#17 a #19). Ficaram de fora:
- `topbar-app/vite.config.ts:8-19`, citado em 3.4.3 (Entrada, Build) e 3.4.6 #4 (Artefatos). A entrada, o `preserveEntrySignatures`, o formato `system` e a saída `app.js` são opções de build do Rollup (dimensão 6), sem builder de federação, nome, módulo exposto, dependência compartilhada ou URL de remote;
- `content-app/vite.config.ts:1-7` e `root-app/vite.config.ts:1-7`, que só registram `vue()`;
- `root-classic/tsconfig.json:2`, que só herda os tipos de `ts-config-single-spa`;
- os `scripts` dos `package.json`, que são build ou servidor de desenvolvimento (dimensão 6);
- os campos `name` dos `package.json` (content-app/package.json:2; topbar-app/package.json:2), citados em 3.4.5 #1 a #3 (Configuração). São identificadores de pacote que nenhum arquivo do snapshot lê para compor; os nomes usados na composição estão nos import maps e no layout.

## Observações

### 1. content-app/package.json:12

**Observação:** `single-spa` `^6.0.3` em `dependencies`. A revisão o marca como não configurado: nenhum arquivo de `content-app/` importa o pacote, e content-app/src/main.ts:4 importa só `single-spa-vue`.

**Interpretação:** É uma declaração sem uso no remoto. O orquestrador fica do lado dos hosts.

### 2. content-app/package.json:13

**Observação:** `single-spa-vue` `^3.0.1` em `dependencies`. A revisão o marca como configurado, pelo import e pela chamada `singleSpaVue(...)` em content-app/src/main.ts:4, 8-22, que cria os lifecycles exportados.

**Interpretação:** O remoto declara o adaptador single-spa para Vue e o usa para se expor aos hosts.

### 3. root-app/package.json:12

**Observação:** `single-spa` `^6.0.3` em `dependencies`. A revisão o marca como configurado, pelo import de `mountRootParcel` em root-app/src/components/ParcelWrapper.vue:11, passado ao `Parcel` em :4 e :46.

**Interpretação:** O host Vue declara o single-spa e o usa para montar parcels.

### 4. root-app/package.json:13

**Observação:** `single-spa-vue` `^3.0.1` em `dependencies`. A revisão o marca como configurado, pelo componente `Parcel` de `single-spa-vue/parcel` em root-app/src/components/ParcelWrapper.vue:2-5, 10.

**Interpretação:** O host Vue declara o adaptador e usa o seu componente de parcel no template.

### 5. root-app/package.json:14

**Observação:** `vite-plugin-single-spa` `^1.1.0` em `dependencies`. A revisão o marca como não configurado: nenhum arquivo do snapshot o importa ou invoca, e root-app/vite.config.ts:1-7 só registra `vue()`.

**Interpretação:** É uma declaração sem uso. O build do `root-app` não passa pelo plugin single-spa.

### 6. root-classic/package.json:44

**Observação:** `@types/systemjs` `^6.1.1` em `dependencies`. A revisão o marca como não configurado: nenhum arquivo de `root-classic/` referencia os tipos ou usa `System.`, e o import map da página usa `@single-spa/import-map-injector` (root-classic/src/index.ejs:11, 17, 41-43).

**Interpretação:** É uma declaração sem uso. Não indica SystemJS na composição do `root-classic`.

### 7. root-classic/package.json:45

**Observação:** `single-spa` `^5.9.3` em `dependencies`. A revisão o marca como configurado, pelo import e pelas chamadas `registerApplication` e `start()` em root-classic/src/org-root-config.ts:1, 18-20. O import map compartilhado da página aponta para `single-spa@6.0.3` por CDN (root-classic/src/index.ejs:17-24).

**Interpretação:** O root declara o orquestrador single-spa e o usa na entrada.

### 8. root-classic/package.json:47

**Observação:** `single-spa-layout` `^1.6.0` em `dependencies`. A revisão o marca como configurado, pelo import de `constructApplications`, `constructRoutes` e `constructLayoutEngine` e pelo uso com `./microfrontend-layout.html` em root-classic/src/org-root-config.ts:2-19.

**Interpretação:** O root declara o motor de layout declarativo do single-spa e o usa para construir as rotas e as aplicações.

### 9. root-classic/package.json:40

**Observação:** `ts-config-single-spa` `^3.0.0` em `devDependencies`. A revisão o marca como configurado, pelo `"extends": "ts-config-single-spa"` em root-classic/tsconfig.json:2, lido pelo `tsc` do script `build:types` (root-classic/package.json:12).

**Interpretação:** O root herda a configuração TypeScript padrão do single-spa. Não participa da composição.

### 10. root-classic/package.json:39

**Observação:** `webpack-config-single-spa-ts` `^8.0.0` em `devDependencies`. A revisão o marca como configurado, por `singleSpaDefaults({ orgName, projectName: "root-config", ... })` em root-classic/webpack.config.js:2, 7-13, lido por `webpack serve` e `webpack --mode=production` (root-classic/package.json:4, 11).

**Interpretação:** O root declara a configuração webpack padrão do single-spa e a usa no build.

### 11. topbar-app/package.json:12

**Observação:** `single-spa` `^6.0.3` em `dependencies`. A revisão o marca como não configurado: nenhum arquivo de `topbar-app/` importa o pacote, e topbar-app/src/main.ts:4 importa só `single-spa-vue`.

**Interpretação:** É uma declaração sem uso no remoto, como no `content-app` (#1).

### 12. topbar-app/package.json:13

**Observação:** `single-spa-vue` `^3.0.1` em `dependencies`. A revisão o marca como configurado, pelo import e pela chamada `singleSpaVue(...)` em topbar-app/src/main.ts:4, 8-22, que cria os lifecycles exportados.

**Interpretação:** O remoto declara o adaptador single-spa para Vue e o usa para se expor aos hosts.

### 13. root-app/index.html:11-18; root-app/index.html:24-30

**Observação:** `<script type="importmap">` nativo que mapeia `@org/content-app` → `http://127.0.0.1:5174/src/main.ts` (:14) e `@org/header-app` → `http://127.0.0.1:5175/src/main.ts` (:15). Logo abaixo, um `<script type="systemjs-importmap">` que mapearia `@org/header-app` → `http://127.0.0.1:4173/app.js` está inteiro dentro de um comentário HTML (:24-30).

**Interpretação:** O host Vue declara por import map as URLs dos dois remotos que monta como parcels. O mapa SystemJS, a outra forma de resolução prevista na página, está desligado.

### 14. root-classic/src/index.ejs:17-23; root-classic/src/index.ejs:27; root-classic/src/index.ejs:29-39; root-classic/webpack.config.js:21-22

**Observação:** A página do root traz dois `<script type="injector-importmap">`. O primeiro mapeia `single-spa` para `single-spa@6.0.3` por CDN (:17-23). O segundo só é gerado com `isLocal` (:29), parâmetro que vem de `--env isLocal` pelo HtmlWebpackPlugin. Ele mapeia `@org/root-config` → `//localhost:9000/org-root-config.js` (:33), `@org/content-app` → `http://127.0.0.1:5174/src/main.ts` (:34) e `@org/topbar-app` → `http://127.0.0.1:5175/src/main.ts` (:35). O mapa de produção está comentado (:27).

**Interpretação:** O root declara por import map as URLs das duas aplicações e a dependência compartilhada por CDN. É a resolução dos destinos da composição, só no modo local.

### 15. root-classic/webpack.config.js:5-27

**Observação:** `singleSpaDefaults({ orgName: "org", projectName: "root-config", ..., disableHtmlGeneration: true })`, combinado com um `HtmlWebpackPlugin` que gera a página a partir de `src/index.ejs`, com os parâmetros `isLocal` e `orgName`.

**Interpretação:** Configura o builder single-spa no root, com nome próprio. Também decide, por `isLocal`, se a página recebe o import map das aplicações.

### 16. root-classic/src/microfrontend-layout.html:1-26; root-classic/src/org-root-config.ts:7-9

**Observação:** `<single-spa-router>` com `<main>`. A rota `default` tem as aplicações `@org/topbar-app` (:22) e `@org/content-app` (:23). Os exemplos `@org/navbar` e `@org/settings` estão comentados (:9-18). O root config importa o arquivo e o converte em rotas.

**Interpretação:** O layout do root declara as duas aplicações e a rota em que elas montam juntas.

### 17. root-app/mfe-app.json:1-7

**Observação:** Mapa `imports` com `@org/header-app` → `http://127.0.0.1:5175/src/main.ts`, `@org/content-app` → `http://127.0.0.1:5173/src/main.ts` e `vue` → `unpkg.com`. Nenhum arquivo do snapshot lê este arquivo.

**Interpretação:** É um import map do host que nomeia os dois remotos, com outra porta para o content. Não participa da composição.

**Nota:** A orientação para uma configuração que declara unidades de outra parte é `forte`, mas o arquivo não é lido por nenhum build nem pelo runtime (3.4.8 #8). Fica `fraca`, sem relação `configura`.

### 18. root-app/src/importMap.dev.json:1-6

**Observação:** Mapa `imports` com `@org/content-app` → `http://127.0.0.1:5174/src/main.ts` e `@org/header-app` → `http://127.0.0.1:5175/src/main.ts`, as mesmas URLs do mapa da página (root-app/index.html:14-15). Nenhum arquivo do snapshot lê este arquivo.

**Interpretação:** É uma cópia em JSON do import map ativo do host. Não participa da composição.

**Nota:** Mesma razão da #17: o arquivo não é lido (3.4.8 #8), e por isso fica `fraca` em vez de `forte`, sem relação `configura`.

### 19. root-app/src/importMap.json:1-6

**Observação:** Mapa `imports` com `@org/content-app` → `http://127.0.0.1:5174/spa.js` e `@org/header-app` → `http://127.0.0.1:5175/spa.js`. Nenhum arquivo do snapshot lê este arquivo, e nenhum build do snapshot gera `spa.js`.

**Interpretação:** É um import map do host que aponta os dois remotos para bundles que o snapshot não produz. Não participa da composição.

**Nota:** Mesma razão da #17: o arquivo não é lido (3.4.8 #8), e por isso fica `fraca` em vez de `forte`, sem relação `configura`.

### 20. content-app/src/main.ts:20; content-app/src/main.ts:8-18

**Observação:** `export const bootstrap = vueLifecycles.bootstrap`, do objeto criado por `singleSpaVue`. A unidade é resolvida como `@org/content-app` pelos import maps dos dois hosts (root-app/index.html:14; root-classic/src/index.ejs:34).

**Interpretação:** É um lifecycle do content, chamado pelos dois hosts ao montar a unidade.

### 21. content-app/src/main.ts:21

**Observação:** `export const mount = vueLifecycles.mount`, do mesmo objeto. O `root-app` verifica `mount` antes de montar a parcel (root-app/src/components/ParcelWrapper.vue:33), e o `root-classic` o chama ao ativar a rota `default` (root-classic/src/microfrontend-layout.html:21-24).

**Interpretação:** É um lifecycle do content, chamado pelos dois hosts ao montar a unidade.

### 22. content-app/src/main.ts:22

**Observação:** `export const unmount = vueLifecycles.unmount`, do mesmo objeto, com os mesmos consumidores.

**Interpretação:** É um lifecycle do content, chamado pelos dois hosts ao desmontar a unidade.

### 23. topbar-app/src/main.ts:20; topbar-app/src/main.ts:8-18

**Observação:** `export const bootstrap = vueLifecycles.bootstrap`, do objeto criado por `singleSpaVue`. A unidade é resolvida como `@org/topbar-app` no `root-classic` (root-classic/src/index.ejs:35) e, pela mesma URL, como `@org/header-app` no `root-app` (root-app/index.html:15).

**Interpretação:** É um lifecycle do topbar, chamado pelo host que monta a unidade.

### 24. topbar-app/src/main.ts:21

**Observação:** `export const mount = vueLifecycles.mount`, do mesmo objeto, chamado pela parcel do `root-app` (root-app/src/components/ParcelWrapper.vue:3-5, 33) e pelo single-spa do `root-classic` (root-classic/src/org-root-config.ts:18-20).

**Interpretação:** É um lifecycle do topbar, chamado pelo host que monta a unidade.

### 25. topbar-app/src/main.ts:22

**Observação:** `export const unmount = vueLifecycles.unmount`, do mesmo objeto, com os mesmos consumidores.

**Interpretação:** É um lifecycle do topbar, chamado pelo host que desmonta a unidade.

### 26. content-app/src/main.ts:4

**Observação:** `import singleSpaVue from 'single-spa-vue'`, usado em :8.

**Interpretação:** O content importa o adaptador com que cria os seus lifecycles.

### 27. content-app/src/main.ts:8-18; content-app/src/main.ts:6

**Observação:** `singleSpaVue({ createApp, appOptions: { render() { return h(App) } } })`, com os lifecycles exportados em :20-22. A montagem própria, `createApp(App).mount('#app')`, está comentada (:6).

**Interpretação:** O App Vue do content é adaptado a lifecycles single-spa e só sobe quando um host chama `mount`.

### 28. topbar-app/src/main.ts:4

**Observação:** `import singleSpaVue from 'single-spa-vue'`, usado em :8.

**Interpretação:** O topbar importa o adaptador com que cria os seus lifecycles.

### 29. topbar-app/src/main.ts:8-18; topbar-app/src/main.ts:6

**Observação:** `singleSpaVue({ createApp, appOptions: { render() { return h(App) } } })`, com os lifecycles exportados em :20-22. A montagem própria está comentada (:6).

**Interpretação:** O App Vue do topbar é adaptado a lifecycles single-spa e só sobe quando um host chama `mount`.

### 30. root-app/index.html:11-18

**Observação:** `<script type="importmap">` que mapeia `@org/content-app` para `http://127.0.0.1:5174/src/main.ts` (:14) e `@org/header-app` para `http://127.0.0.1:5175/src/main.ts` (:15). Os nomes são os passados aos `ParcelWrapper` (root-app/src/App.vue:8-9) e resolvidos pelo `import()` de root-app/src/utils/dynamicImport.ts:15.

**Interpretação:** É a resolução dos nomes das duas parcels do host para as URLs dos dev servers dos remotos.

### 31. root-app/index.html:24-30

**Observação:** `<!-- <script type="systemjs-importmap">`, que abre um comentário HTML até :30. O mapa comentado aponta `@org/header-app` para `http://127.0.0.1:4173/app.js`.

**Interpretação:** É um mapa SystemJS desligado, não código ativo.

### 32. root-app/index.html:33-34

**Observação:** `<script src="https://cdn.jsdelivr.net/npm/import-map-overrides/dist/import-map-overrides.js">`, apontado pelo padrão de import map.

**Interpretação:** Carrega de CDN a biblioteca de desenvolvimento que sobrescreve entradas do import map. Não carrega o bundle de outra unidade.

### 33. root-app/index.html:41

**Observação:** `<import-map-overrides-full show-when-local-storage="overrides-ui" dev-libs>`, o painel da biblioteca da observação #32, exibido só com a chave `overrides-ui` no localStorage.

**Interpretação:** É uma ferramenta de desenvolvimento, não o custom element de outra unidade.

### 34. root-app/src/global.d.ts:1

**Observação:** Comentário de um arquivo de declarações de tipo: "Global type declarations for single-spa, SystemJS, and import-map-overrides".

**Interpretação:** Descreve tipos. Não é código executável.

### 35. root-app/src/global.d.ts:14

**Observação:** Comentário JSDoc da propriedade `importMapOverrides` na declaração de tipo de `Window` (:13-17).

**Interpretação:** Descreve um tipo. Não é código executável.

### 36. root-app/src/global.d.ts:15

**Observação:** URL da documentação do `import-map-overrides`, dentro do mesmo comentário JSDoc (:13-16).

**Interpretação:** É uma referência de documentação. Não é código executável.

### 37. root-app/src/global.d.ts:17-24

**Observação:** Declaração de tipo `importMapOverrides?: { ... }` em `Window`. Nenhum código do `root-app` usa `window.importMapOverrides`.

**Interpretação:** É só tipagem. Não participa da composição.

### 38. root-app/src/utils/dynamicImport.ts:6

**Observação:** Linha do comentário JSDoc que descreve a estratégia do helper (:1-9).

**Interpretação:** É documentação do helper, não código executável. A afirmação do mesmo comentário está na #76.

### 39. root-app/src/utils/dynamicImport.ts:19

**Observação:** `console.warn(...)` no `catch` do `import()` nativo.

**Interpretação:** É só registro de log.

### 40. root-app/src/utils/dynamicImport.ts:21

**Observação:** Comentário de linha antes do fallback SystemJS (:22-33).

**Interpretação:** É um comentário, não código executável.

### 41. root-app/src/utils/dynamicImport.ts:24; root-app/src/utils/dynamicImport.ts:22-23; root-app/index.html:21; root-app/index.html:24-30

**Observação:** `window.System.import(url)`, executado só quando o `import()` nativo de :15 falha e `window.System` existe. O SystemJS é carregado na página (root-app/index.html:21), mas o único mapa `systemjs-importmap` está comentado (root-app/index.html:24-30). Os nomes `@org/header-app` e `@org/content-app` só estão no import map nativo.

**Interpretação:** Duas leituras continuam plausíveis. O fallback pode nunca resolver uma unidade, porque nenhum mapa SystemJS ativo dá URL aos nomes que ele recebe. Ou ele é um segundo caminho de carga para o build SystemJS do topbar, quando um mapa for fornecido fora do snapshot. O snapshot não mostra qual das duas vale.

### 42. root-app/src/utils/dynamicImport.ts:25

**Observação:** `console.log(...)` de sucesso do fallback.

**Interpretação:** É só registro de log.

### 43. root-app/src/utils/dynamicImport.ts:28

**Observação:** `console.error(...)` quando os dois caminhos falham.

**Interpretação:** É só registro de log.

### 44. root-classic/src/index.ejs:12

**Observação:** Comentário HTML: "If you wish to turn off import-map-overrides for specific environments (prod), uncomment the line below".

**Interpretação:** É uma instrução do template ao desenvolvedor, não código ativo.

### 45. root-classic/src/index.ejs:13

**Observação:** Comentário HTML com o link para a documentação de configuração do `import-map-overrides`.

**Interpretação:** É uma instrução do template ao desenvolvedor, não código ativo.

### 46. root-classic/src/index.ejs:14

**Observação:** `<meta name="import-map-overrides-domains" content="denylist:prod.example.com" />`, inteiro dentro de um comentário HTML.

**Interpretação:** É uma opção de desenvolvimento desligada, não código ativo.

### 47. root-classic/src/index.ejs:41

**Observação:** `<script src="https://cdn.jsdelivr.net/npm/import-map-overrides@5.1.1/dist/import-map-overrides.js">`, apontado pelo padrão de import map.

**Interpretação:** Carrega de CDN a biblioteca de desenvolvimento que sobrescreve entradas do import map. Não carrega o bundle de outra unidade.

### 48. root-classic/src/index.ejs:56

**Observação:** `<import-map-overrides-full show-when-local-storage="devtools" dev-libs>`, o painel da biblioteca da observação #47, exibido só com a chave `devtools` no localStorage.

**Interpretação:** É uma ferramenta de desenvolvimento, não o custom element de outra unidade.

### 49. root-app/index.html:21

**Observação:** `<script src="https://cdn.jsdelivr.net/npm/systemjs@6.14.2/dist/system.min.js">`, apontado pelo padrão de script externo. O único código que usa `window.System` é o fallback de root-app/src/utils/dynamicImport.ts:22-24.

**Interpretação:** Carrega de CDN o carregador SystemJS, uma biblioteca. Não carrega o bundle de outra unidade.

### 50. root-classic/src/index.ejs:41

**Observação:** O mesmo `<script>` do `import-map-overrides` da #47, agora apontado pelo padrão de script externo.

**Interpretação:** É a biblioteca de CDN da observação #47, não o bundle de outra unidade.

### 51. root-app/src/App.vue:8; root-app/index.html:15

**Observação:** `<ParcelWrapper app-name="@org/header-app">`, a primeira parcel do template raiz do host, montado em root-app/src/main.ts:5. O nome é resolvido para `http://127.0.0.1:5175/src/main.ts`, a mesma URL do `@org/topbar-app` em root-classic/src/index.ejs:35.

**Interpretação:** O host nomeia no template a unidade que entra como primeira parcel, o remoto servido na porta 5175.

### 52. root-app/src/App.vue:9; root-app/index.html:14

**Observação:** `<ParcelWrapper app-name="@org/content-app">`, a segunda parcel do template raiz. O nome é resolvido para `http://127.0.0.1:5174/src/main.ts`.

**Interpretação:** O host nomeia no template o content como segunda parcel.

### 53. root-app/src/components/ParcelWrapper.vue:3-5; root-app/src/components/ParcelWrapper.vue:10-11; root-app/src/components/ParcelWrapper.vue:22; root-app/src/components/ParcelWrapper.vue:33; root-app/src/components/ParcelWrapper.vue:46

**Observação:** `<Parcel ... :config="parcelConfigRef" :mountParcel="mountParcel" ...>`, componente de `single-spa-vue/parcel`, com `mountParcel = mountRootParcel` do `single-spa`. A configuração é o módulo carregado por `dynamicImport(props.appName)` (:22), aceito quando tem `mount` e `unmount` (:33).

**Interpretação:** O wrapper monta como parcel single-spa o remoto que recebe por parâmetro, sem nomeá-lo.

### 54. root-app/src/utils/dynamicImport.ts:15; root-app/index.html:11-18

**Observação:** `await import(/* @vite-ignore */ url)`, chamado por `dynamicImport(props.appName)` em root-app/src/components/ParcelWrapper.vue:22. Os nomes que chegam, `@org/header-app` e `@org/content-app`, são resolvidos pelo import map nativo da página.

**Interpretação:** O host carrega em runtime, por `import()` nativo, o remoto cujo nome recebe por parâmetro.

### 55. root-classic/src/index.ejs:30-38; root-classic/src/index.ejs:29

**Observação:** `<script type="injector-importmap">`, que mapeia `@org/content-app` para `http://127.0.0.1:5174/src/main.ts` (:34) e `@org/topbar-app` para `http://127.0.0.1:5175/src/main.ts` (:35), além do próprio `@org/root-config` (:33). Só é gerado com `isLocal` (:29).

**Interpretação:** É a resolução dos nomes das duas aplicações para as URLs dos dev servers, só no modo local.

### 56. root-classic/src/microfrontend-layout.html:1-26

**Observação:** `<single-spa-router>`, a tabela de rotas do root: a rota `default` com `@org/topbar-app` (:22) e `@org/content-app` (:23) dentro de `<main>`. É importada e convertida em rotas em root-classic/src/org-root-config.ts:7-9.

**Interpretação:** É a tabela de rotas que liga a rota padrão às aplicações de outras unidades.

### 57. root-classic/src/org-root-config.ts:12-14; root-classic/src/index.ejs:34-35

**Observação:** `loadApp({ name }) { return import(/* webpackIgnore: true */ name); }`, dentro de `constructApplications`. Os nomes vêm do layout e são resolvidos pelo import map local para as URLs das duas aplicações.

**Interpretação:** O root carrega em runtime a aplicação cujo nome recebe por parâmetro, por `import()` nativo.

### 58. root-classic/src/org-root-config.ts:18; root-classic/src/org-root-config.ts:9-16; root-classic/src/org-root-config.ts:19

**Observação:** `applications.forEach(registerApplication)`, sobre as aplicações construídas a partir do layout em :9-15. O motor de layout criado em :16 é ativado em :19.

**Interpretação:** O root registra no single-spa todas as aplicações do layout, sem nomeá-las na linha.

### 59. root-classic/src/org-root-config.ts:20; root-classic/src/org-root-config.ts:1

**Observação:** `start()`, importado de `single-spa`.

**Interpretação:** Inicia o orquestrador. Sem ele, os registros não montam nenhuma aplicação.

### 60. content-app; content-app/package.json; content-app/index.html:11; content-app/src/main.ts:8-22; content-app/vite.config.ts:1-7; content-app/package.json:8

**Observação:** Projeto com manifesto, `vite.config.ts` e lockfile próprios. A página carrega `/src/main.ts`, que exporta os lifecycles de `singleSpaVue`. O build é `vue-tsc -b && vite build`. Não declara workspace.

**Interpretação:** É uma unidade frontend com limite próprio, uma aplicação Vue single-spa.

### 61. root-app; root-app/package.json; root-app/index.html:43; root-app/src/main.ts:5; root-app/vite.config.ts:1-7; root-app/package.json:8

**Observação:** Projeto com manifesto, `vite.config.ts` e lockfile próprios. A página carrega `/src/main.ts`, que monta o App Vue em `#app`. O build é `vue-tsc -b && vite build`. Tem uma cópia do topbar em `src/modules/Topbar/`, sem manifesto nem build, com o import comentado.

**Interpretação:** É uma unidade frontend com limite próprio, o host Vue que monta os remotos como parcels.

### 62. root-classic; root-classic/package.json; root-classic/webpack.config.js:7-9, 18-20; root-classic/src/org-root-config.ts:9-20; root-classic/package.json:10-11

**Observação:** Projeto com manifesto, `webpack.config.js` e lockfile próprios. A entrada `src/org-root-config.ts` vem da convenção do `webpack-config-single-spa-ts`, e a página vem de `src/index.ejs`. O build é `concurrently npm:build:*`, com `webpack --mode=production`.

**Interpretação:** É uma unidade frontend com limite próprio, a root config single-spa da composição.

### 63. topbar-app; topbar-app/package.json; topbar-app/index.html:11; topbar-app/vite.config.ts:8-19; topbar-app/src/main.ts:8-22; topbar-app/package.json:8

**Observação:** Projeto com manifesto, `vite.config.ts` e lockfile próprios. A página e a entrada do Rollup apontam para `src/main.ts`, que exporta os lifecycles de `singleSpaVue`. O build é `vue-tsc -b && vite build`, com saída `app.js` em formato `system`.

**Interpretação:** É uma unidade frontend com limite próprio, uma aplicação Vue single-spa.

### 64. root-app/src/App.vue:9; root-app/index.html:14; root-app/src/utils/dynamicImport.ts:15; root-app/src/components/ParcelWrapper.vue:3, 46; content-app/src/main.ts:20-22

**Observação:** O `root-app` põe `@org/content-app` como parcel no template raiz e o carrega por `import()` do nome, resolvido pelo import map nativo para `http://127.0.0.1:5174/src/main.ts`. O wrapper monta o módulo com `mountRootParcel`, usando os lifecycles que o content exporta. O destino foi identificado pelo nome, que é o `name` do manifesto da unidade, `content-app`, com o escopo `@org/` (content-app/package.json:2). A porta não está fixada na configuração do content.

**Interpretação:** É uma relação host → remote ativa entre o `root-app` e o `content-app`, sem registro no orquestrador.

### 65. root-classic/src/microfrontend-layout.html:21-23; root-classic/src/index.ejs:34; root-classic/src/org-root-config.ts:13, 18, 20; content-app/src/main.ts:20-22

**Observação:** O `root-classic` põe `@org/content-app` na rota `default`, carrega-o por `import()` do nome, resolvido pelo import map local para `http://127.0.0.1:5174/src/main.ts`, e o registra no single-spa. O nome é o `name` do manifesto da unidade com o escopo `@org/` (content-app/package.json:2). O mapa só existe com `isLocal`.

**Interpretação:** É uma relação root-config → application ativa entre o `root-classic` e o `content-app`, no modo local.

### 66. root-classic/src/microfrontend-layout.html:21-22; root-classic/src/index.ejs:35; root-classic/src/org-root-config.ts:13, 18, 20; topbar-app/src/main.ts:20-22

**Observação:** Mesmo caminho da #65, com `@org/topbar-app`, resolvido para `http://127.0.0.1:5175/src/main.ts` e que é o `name` do manifesto do topbar com o escopo `@org/` (topbar-app/package.json:2). O topbar monta antes do content, na mesma rota. O mapa só existe com `isLocal`.

**Interpretação:** É uma relação root-config → application ativa entre o `root-classic` e o `topbar-app`, no modo local.

### 67. root-app/src/App.vue:8; root-app/index.html:15; root-app/src/utils/dynamicImport.ts:15; root-app/src/components/ParcelWrapper.vue:3

**Observação:** O `root-app` carrega e monta como parcel `@org/header-app`, pelo mesmo caminho da #64, resolvido para `http://127.0.0.1:5175/src/main.ts`. Nenhuma unidade do snapshot se chama `header-app`. A mesma URL é a do `@org/topbar-app` no outro host (root-classic/src/index.ejs:35), e só a porta 5175, não fixada na configuração, distingue o remoto.

**Interpretação:** É uma relação host → remote ativa. O destino fica com o nome do artefato: a correspondência com o `topbar-app` é plausível pela URL, mas não é explícita.

### 68. content-app/package.json:8; content-app/vite.config.ts:5-7

**Observação:** `"build": "vue-tsc -b && vite build"`, sobre a configuração Vite padrão. Não há artefato de deploy. A versão `0.0.0` de um pacote `private` não é usada em publicação. A unidade só é servida em `127.0.0.1:5174` pelo dev server.

**Interpretação:** O content tem build separado, sem deploy observado nem versionamento independente.

### 69. root-app/package.json:8; root-app/vite.config.ts:5-7

**Observação:** O mesmo script de build, sobre a configuração Vite padrão. Não há artefato de deploy, e a versão `0.0.0` de um pacote `private` não é usada em publicação. Nenhum artefato fixa o endereço do próprio host.

**Interpretação:** O host Vue tem build separado, sem deploy observado nem versionamento independente.

### 70. root-classic/package.json:10-12; root-classic/webpack.config.js:5-27

**Observação:** `"build": "concurrently npm:build:*"`, com `build:webpack` (`webpack --mode=production`) e `build:types` (`tsc`), sobre `webpack-config-single-spa-ts` com `projectName: "root-config"` e a página de `src/index.ejs`. Não há artefato de deploy, e o manifesto não tem `version`. O root só é servido em `localhost:9000` por `webpack serve`.

**Interpretação:** O root tem build separado, sem deploy observado nem versionamento independente.

### 71. topbar-app/package.json:8; topbar-app/vite.config.ts:8-18

**Observação:** O mesmo script de build dos projetos Vite, com saída `app.js` em formato `system` e assinaturas de exportação preservadas. Nenhum host usa esse build, e o mapa que apontaria para ele está comentado. Não há artefato de deploy, e a versão `0.0.0` de um pacote `private` não é usada em publicação.

**Interpretação:** O topbar tem build separado e preparado para ser carregado por um host, sem deploy observado nem versionamento independente.

### 72. root-app/index.html:10

**Observação:** Comentário HTML: "Static import map for microfrontends esmodule".

**Interpretação:** Afirma que o bloco seguinte é o import map estático, de ES modules, dos microfrontends. A afirmação é corroborada: o import map nativo resolve os nomes das duas parcels.

### 73. root-app/index.html:20

**Observação:** Comentário HTML: "SystemJS for legacy microfrontends".

**Interpretação:** Afirma que o SystemJS carregado serve a microfrontends legados. O carregador está ativo, mas nenhum microfrontend está mapeado para ele. A afirmação é corroborada em parte.

### 74. root-app/src/utils/dynamicImport.ts:2

**Observação:** Comentário JSDoc: "Hybrid dynamic import helper that supports both modern ESM and legacy SystemJS."

**Interpretação:** Afirma o que o helper suporta. A afirmação é corroborada: o código tem o `import()` nativo e o fallback `System.import`, com o SystemJS carregado na página.

### 75. root-app/src/utils/dynamicImport.ts:5

**Observação:** Comentário JSDoc: "Try native import() first (for modules in native import map)".

**Interpretação:** Afirma que o helper tenta primeiro o `import()` nativo, para os módulos do import map nativo. A afirmação é corroborada.

### 76. root-app/src/utils/dynamicImport.ts:6

**Observação:** Comentário JSDoc: "If that fails, try System.import() (for modules in systemjs-importmap)".

**Interpretação:** Afirma o fallback e os módulos que ele serve. A ordem de tentativa está no código; o `systemjs-importmap` está comentado, e os módulos dele ficam sem artefato ativo. A afirmação é corroborada em parte.

### 77. topbar-app/src/App.vue:4

**Observação:** Título exibido pelo componente raiz do topbar: "Topbar - MFE".

**Interpretação:** Afirma que o topbar é um micro-frontend. A afirmação é corroborada: o projeto é unidade própria, os lifecycles vêm de `singleSpaVue` e o `root-classic` o registra no layout.

### 78. 546aa27 2026-01-09 (content-app/package.json, topbar-app/package.json); 0cccd59 2026-01-09 (topbar-app/src/main.ts); 6ae6565 2026-01-09 (content-app/src/main.ts)

**Observação:** Os dois manifestos não mudam desde o primeiro commit, com `single-spa` em todas as versões. Os `main.ts` mudam depois, e as versões anteriores não estão disponíveis no clone parcial.

**Interpretação:** O histórico não diz se algum remoto importou `single-spa` diretamente. A dúvida é só sobre o passado: no snapshot, o pacote não tem uso nos remotos.

### 79. 546aa27 2026-01-09 (root-app/package.json, root-app/vite.config.ts)

**Observação:** O manifesto e a configuração Vite do `root-app` têm o mesmo objeto em todos os commits. Em nenhuma versão o plugin aparece no `vite.config.ts`.

**Interpretação:** O `vite-plugin-single-spa` foi declarado e nunca configurado no histórico. Não foi desconectado depois.

### 80. 546aa27 2026-01-09 (root-classic/package.json)

**Observação:** Nenhum arquivo do `root-classic` muda depois do primeiro commit, e em nenhuma versão o pacote é referenciado.

**Interpretação:** O `@types/systemjs` chega com o projeto e nunca é usado no histórico.

### 81. 546aa27 2026-01-09 (content-app/src/main.ts, topbar-app/src/main.ts); 0cccd59 2026-01-09 (topbar-app/src/main.ts); 6ae6565 2026-01-09 (content-app/src/main.ts)

**Observação:** Os dois `main.ts` existem desde o primeiro commit e mudam uma vez cada um. As versões anteriores não estão disponíveis.

**Interpretação:** O histórico não diz se a montagem própria já estava comentada no início nem se algum remoto montou a UI sozinho. A dúvida é só sobre o passado: no snapshot, os dois remotos só sobem pelo `mount` de um host.

### 82. 546aa27 2026-01-09 (topbar-app/src/TopbarApp.vue); 0cccd59 2026-01-09 (topbar-app/src/App.vue); f2f2494 2026-01-09 (root-app/src/modules/Topbar/, root-app/src/App.vue); 6ae6565 2026-01-09 (topbar-app/src/App.vue)

**Observação:** O `topbar-app` existe desde o primeiro commit. A cópia em `root-app/src/modules/Topbar/` só aparece em `f2f2494`, com objetos iguais aos do `topbar-app`, e o `root-app/src/App.vue` desse commit já tem o import e o uso dela comentados.

**Interpretação:** O topbar não foi extraído dessa cópia, que é posterior a ele e entra já desligada no host.

### 83. 546aa27 2026-01-09 (root-app/index.html, root-app/src/utils/dynamicImport.ts, topbar-app/vite.config.ts)

**Observação:** Os três arquivos do caminho SystemJS têm o mesmo objeto em todos os commits. O `systemjs-importmap` está comentado em todas as versões.

**Interpretação:** O caminho SystemJS chega sem alvo no primeiro commit e não foi desligado depois.

### 84. 546aa27 2026-01-09 (root-classic/src/index.ejs)

**Observação:** O `root-classic/src/index.ejs` chega no primeiro commit com as linhas 12 a 14 comentadas e não muda depois.

**Interpretação:** A meta `import-map-overrides-domains` nunca esteve ativa no histórico. São comentários do template.

### 85. 546aa27 2026-01-09 (root-app/mfe-app.json, root-app/src/importMap.json, root-app/src/importMap.dev.json, root-app/index.html)

**Observação:** Os três mapas não lidos são criados no mesmo commit do import map nativo da página, e nenhum dos quatro muda depois.

**Interpretação:** As URLs diferentes não pertencem a um estágio anterior observável: os mapas não lidos e o mapa ativo convivem desde o primeiro commit.

### 86. 546aa27 2026-01-09 (root-classic/src/index.ejs)

**Observação:** O mesmo `root-classic/src/index.ejs` chega com o mapa de produção comentado e o mapa local condicionado a `isLocal`, e não muda depois.

**Interpretação:** O histórico não diz se o mapa de produção foi planejado e nunca conectado ou se é só texto do gerador. No snapshot, só o modo local liga as aplicações.

### 87. 546aa27 2026-01-09 (root-app/index.html, root-classic/src/index.ejs, root-classic/src/microfrontend-layout.html, topbar-app/package.json); f2f2494 2026-01-09 (root-app/src/App.vue)

**Observação:** Os arquivos com `@org/header-app` e com `@org/topbar-app` não mudam desde o primeiro commit, e nenhum commit renomeia a unidade. O `root-app/src/App.vue` muda em `f2f2494`, mas o mapa que resolve o nome é o mesmo em todas as versões.

**Interpretação:** Os dois nomes do topbar convivem desde o primeiro commit e não pertencem a estágios diferentes. O histórico não liga `@org/header-app` ao `topbar-app`.

## Classificação

| # | Origem | Dimensão | Tipo | Abordagem | Evidência | Força | Relações |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.2 (content-app/package.json:12) | 1 tecnologia | manifesto | single-spa | tecnológica | fraca | — |
| 2 | 3.4.2 (content-app/package.json:13) | 1 tecnologia | manifesto | single-spa | tecnológica | fraca | declara #26; declara #27 |
| 3 | 3.4.2 (root-app/package.json:12) | 1 tecnologia | manifesto | single-spa | tecnológica | fraca | declara #53 |
| 4 | 3.4.2 (root-app/package.json:13) | 1 tecnologia | manifesto | single-spa | tecnológica | fraca | declara #53 |
| 5 | 3.4.2 (root-app/package.json:14) | 1 tecnologia | manifesto | single-spa | tecnológica | fraca | — |
| 6 | 3.4.2 (root-classic/package.json:44) | 1 tecnologia | manifesto | import-maps | tecnológica | fraca | — |
| 7 | 3.4.2 (root-classic/package.json:45) | 1 tecnologia | manifesto | single-spa | tecnológica | fraca | declara #58; declara #59 |
| 8 | 3.4.2 (root-classic/package.json:47) | 1 tecnologia | manifesto | single-spa | tecnológica | fraca | declara #16; declara #57 |
| 9 | 3.4.2 (root-classic/package.json:40) | 1 tecnologia | manifesto | single-spa | tecnológica | fraca | declara root-classic/tsconfig.json:2 |
| 10 | 3.4.2 (root-classic/package.json:39) | 1 tecnologia | manifesto | single-spa | tecnológica | fraca | declara #15 |
| 11 | 3.4.2 (topbar-app/package.json:12) | 1 tecnologia | manifesto | single-spa | tecnológica | fraca | — |
| 12 | 3.4.2 (topbar-app/package.json:13) | 1 tecnologia | manifesto | single-spa | tecnológica | fraca | declara #28; declara #29 |
| 13 | 3.4.2 (content-app/package.json:13, topbar-app/package.json:13, root-app/package.json:12, :13, Evidência); 3.4.3 (root-app, Marcadores e Entrada); 3.4.4 (root-app/index.html:11, :24, :34, :41, Arquivo:linha); 3.4.4 (root-app/index.html:21, src-html-external-script, Arquivo:linha); 3.4.4 (content-app/src/main.ts:20; topbar-app/src/main.ts:20; root-app/src/utils/dynamicImport.ts:24, :15; root-app/src/App.vue:8, :9, Observação); 3.4.5 #1, #4 (Configuração, Código); 3.4.6 #1, #4 (Onde é servida); 3.4.7 #1, #2, #3, #4, #5 (Evidência) | 2 configuração | configuração | import-maps | arquitetural | forte | configura #64; configura #67; configura #54 |
| 14 | 3.4.2 (content-app/package.json:13, topbar-app/package.json:13, root-classic/package.json:44, :45, :47, Evidência); 3.4.4 (root-classic/src/index.ejs:12, :13, :14, :41, :56, Arquivo:linha); 3.4.4 (root-classic/src/index.ejs:30, Arquivo:linha); 3.4.4 (content-app/src/main.ts:20; topbar-app/src/main.ts:20; root-app/src/App.vue:8; root-classic/src/org-root-config.ts:13, Observação); 3.4.5 #2, #3 (Configuração, Código); 3.4.6 #1, #3, #4 (Onde é servida) | 2 configuração | configuração | import-maps | arquitetural | forte | configura #65; configura #66; configura #57 |
| 15 | 3.4.2 (root-classic/package.json:45, :47, :39, Evidência); 3.4.3 (root-classic, Marcadores, Entrada e Build); 3.4.4 (root-classic/src/index.ejs:30; root-classic/src/org-root-config.ts:13, Observação); 3.4.6 #3 (Artefatos) | 2 configuração | configuração | single-spa | tecnológica | moderada | configura #62; configura #55 |
| 16 | 3.4.4 (content-app/src/main.ts:20, :21; topbar-app/src/main.ts:8, Observação); 3.4.4 (root-classic/src/microfrontend-layout.html:1, Arquivo:linha); 3.4.5 #2, #3 (Configuração, Código) | 2 configuração | configuração | single-spa | arquitetural | forte | configura #65; configura #66 |
| 17 | 3.4.8 #8 (Ponto) | 2 configuração | configuração | import-maps | arquitetural | fraca | — |
| 18 | 3.4.8 #8 (Ponto) | 2 configuração | configuração | import-maps | arquitetural | fraca | — |
| 19 | 3.4.8 #8 (Ponto) | 2 configuração | configuração | import-maps | arquitetural | fraca | — |
| 20 | 3.4.4 (content-app/src/main.ts:20) | 3 código | código-fonte | single-spa | tecnológica | moderada | implementa #64; implementa #65 |
| 21 | 3.4.4 (content-app/src/main.ts:21) | 3 código | código-fonte | single-spa | tecnológica | moderada | implementa #64; implementa #65 |
| 22 | 3.4.4 (content-app/src/main.ts:22) | 3 código | código-fonte | single-spa | tecnológica | moderada | implementa #64; implementa #65 |
| 23 | 3.4.4 (topbar-app/src/main.ts:20) | 3 código | código-fonte | single-spa | tecnológica | moderada | implementa #66 |
| 24 | 3.4.4 (topbar-app/src/main.ts:21) | 3 código | código-fonte | single-spa | tecnológica | moderada | implementa #66 |
| 25 | 3.4.4 (topbar-app/src/main.ts:22) | 3 código | código-fonte | single-spa | tecnológica | moderada | implementa #66 |
| 26 | 3.4.4 (content-app/src/main.ts:4) | 3 código | código-fonte | single-spa | tecnológica | moderada | implementa #64; implementa #65 |
| 27 | 3.4.4 (content-app/src/main.ts:8) | 3 código | código-fonte | single-spa | tecnológica | moderada | implementa #64; implementa #65 |
| 28 | 3.4.4 (topbar-app/src/main.ts:4) | 3 código | código-fonte | single-spa | tecnológica | moderada | implementa #66 |
| 29 | 3.4.4 (topbar-app/src/main.ts:8) | 3 código | código-fonte | single-spa | tecnológica | moderada | implementa #66 |
| 30 | 3.4.4 (root-app/index.html:11) | 3 código | código-fonte | import-maps | arquitetural | forte | implementa #64; implementa #67 |
| 31 | 3.4.4 (root-app/index.html:24) | 3 código | comentário | — | contexto | fraca | — |
| 32 | 3.4.4 (root-app/index.html:34) | 3 código | código-fonte | import-maps | tecnológica | fraca | — |
| 33 | 3.4.4 (root-app/index.html:41) | 3 código | código-fonte | import-maps | tecnológica | fraca | — |
| 34 | 3.4.4 (root-app/src/global.d.ts:1) | 3 código | comentário | — | contexto | fraca | — |
| 35 | 3.4.4 (root-app/src/global.d.ts:14) | 3 código | comentário | — | contexto | fraca | — |
| 36 | 3.4.4 (root-app/src/global.d.ts:15) | 3 código | comentário | — | contexto | fraca | — |
| 37 | 3.4.4 (root-app/src/global.d.ts:17) | 3 código | código-fonte | — | contexto | fraca | — |
| 38 | 3.4.4 (root-app/src/utils/dynamicImport.ts:6) | 3 código | comentário | — | contexto | fraca | — |
| 39 | 3.4.4 (root-app/src/utils/dynamicImport.ts:19) | 3 código | código-fonte | — | contexto | fraca | — |
| 40 | 3.4.4 (root-app/src/utils/dynamicImport.ts:21) | 3 código | comentário | — | contexto | fraca | — |
| 41 | 3.4.4 (root-app/src/utils/dynamicImport.ts:24) | 3 código | código-fonte | import-maps | tecnológica | ambígua | — |
| 42 | 3.4.4 (root-app/src/utils/dynamicImport.ts:25) | 3 código | código-fonte | — | contexto | fraca | — |
| 43 | 3.4.4 (root-app/src/utils/dynamicImport.ts:28) | 3 código | código-fonte | — | contexto | fraca | — |
| 44 | 3.4.4 (root-classic/src/index.ejs:12) | 3 código | comentário | — | contexto | fraca | — |
| 45 | 3.4.4 (root-classic/src/index.ejs:13) | 3 código | comentário | — | contexto | fraca | — |
| 46 | 3.4.4 (root-classic/src/index.ejs:14) | 3 código | comentário | — | contexto | fraca | — |
| 47 | 3.4.4 (root-classic/src/index.ejs:41, src-import-map) | 3 código | código-fonte | import-maps | tecnológica | fraca | — |
| 48 | 3.4.4 (root-classic/src/index.ejs:56) | 3 código | código-fonte | import-maps | tecnológica | fraca | — |
| 49 | 3.4.4 (root-app/index.html:21) | 3 código | código-fonte | import-maps | tecnológica | fraca | — |
| 50 | 3.4.4 (root-classic/src/index.ejs:41, src-html-external-script) | 3 código | código-fonte | import-maps | tecnológica | fraca | — |
| 51 | 3.4.4 (root-app/src/App.vue:8) | 3 código | código-fonte | single-spa | arquitetural | forte | implementa #67 |
| 52 | 3.4.4 (root-app/src/App.vue:9) | 3 código | código-fonte | single-spa | arquitetural | forte | implementa #64 |
| 53 | 3.4.4 (root-app/src/components/ParcelWrapper.vue:3) | 3 código | código-fonte | single-spa | tecnológica | moderada | implementa #64; implementa #67 |
| 54 | 3.4.4 (root-app/src/utils/dynamicImport.ts:15) | 3 código | código-fonte | import-maps | tecnológica | moderada | implementa #64; implementa #67 |
| 55 | 3.4.4 (root-classic/src/index.ejs:30) | 3 código | código-fonte | import-maps | arquitetural | forte | implementa #65; implementa #66 |
| 56 | 3.4.4 (root-classic/src/microfrontend-layout.html:1) | 3 código | código-fonte | single-spa | arquitetural | forte | implementa #65; implementa #66 |
| 57 | 3.4.4 (root-classic/src/org-root-config.ts:13) | 3 código | código-fonte | single-spa | tecnológica | moderada | implementa #65; implementa #66 |
| 58 | 3.4.4 (root-classic/src/org-root-config.ts:18) | 3 código | código-fonte | single-spa | tecnológica | moderada | implementa #65; implementa #66 |
| 59 | 3.4.4 (root-classic/src/org-root-config.ts:20) | 3 código | código-fonte | single-spa | tecnológica | moderada | implementa #65; implementa #66 |
| 60 | 3.4.3 (content-app) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 61 | 3.4.3 (root-app) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 62 | 3.4.3 (root-classic) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 63 | 3.4.3 (topbar-app) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 64 | 3.4.5 #1 | 5 composição | código-fonte | single-spa | arquitetural | forte | liga #61; liga #60 |
| 65 | 3.4.5 #2 | 5 composição | configuração | single-spa | arquitetural | forte | liga #62; liga #60 |
| 66 | 3.4.5 #3 | 5 composição | configuração | single-spa | arquitetural | forte | liga #62; liga #63 |
| 67 | 3.4.5 #4 | 5 composição | código-fonte | single-spa | arquitetural | forte | liga #61; liga root-app/index.html:15 |
| 68 | 3.4.6 #1 | 6 build-deploy | manifesto | — | arquitetural | moderada | publica #60 |
| 69 | 3.4.6 #2 | 6 build-deploy | manifesto | — | arquitetural | moderada | publica #61 |
| 70 | 3.4.6 #3 | 6 build-deploy | manifesto | — | arquitetural | moderada | publica #62 |
| 71 | 3.4.6 #4 | 6 build-deploy | manifesto | — | arquitetural | moderada | publica #63 |
| 72 | 3.4.7 #1 | 7 documentação | comentário | import-maps | tecnológica | fraca | corrobora #30; corrobora #13 |
| 73 | 3.4.7 #2 | 7 documentação | comentário | import-maps | tecnológica | fraca | corrobora em parte #49 |
| 74 | 3.4.7 #3 | 7 documentação | comentário | import-maps | tecnológica | fraca | corrobora #54; corrobora #49 |
| 75 | 3.4.7 #4 | 7 documentação | comentário | import-maps | tecnológica | fraca | corrobora #54; corrobora #30 |
| 76 | 3.4.7 #5 | 7 documentação | comentário | import-maps | tecnológica | fraca | corrobora em parte #54 |
| 77 | 3.4.7 #6 | 7 documentação | comentário | — | arquitetural | fraca | corrobora #63; corrobora #29; corrobora #66 |
| 78 | 3.4.8 #1 | 8 histórico | histórico | — | tecnológica | fraca | explica #1; explica #11 |
| 79 | 3.4.8 #2 | 8 histórico | histórico | — | tecnológica | fraca | explica #5 |
| 80 | 3.4.8 #3 | 8 histórico | histórico | — | tecnológica | fraca | explica #6 |
| 81 | 3.4.8 #4 | 8 histórico | histórico | — | arquitetural | fraca | explica #27; explica #29 |
| 82 | 3.4.8 #5 | 8 histórico | histórico | — | arquitetural | fraca | explica #61 |
| 83 | 3.4.8 #6 | 8 histórico | histórico | — | tecnológica | fraca | explica #31; explica #41; explica #49; explica #73; explica #76 |
| 84 | 3.4.8 #7 | 8 histórico | histórico | — | contexto | fraca | explica #44; explica #45; explica #46 |
| 85 | 3.4.8 #8 | 8 histórico | histórico | — | arquitetural | fraca | explica #17; explica #18; explica #19 |
| 86 | 3.4.8 #9 | 8 histórico | histórico | — | arquitetural | fraca | explica #14; explica #55 |
| 87 | 3.4.8 #10 | 8 histórico | histórico | — | arquitetural | fraca | explica #67; explica #51 |

## Resumo

Observações: 87. Dimensões (tecnologia: 12, configuração: 7, código: 40, estrutura: 4, composição: 4, build-deploy: 4, documentação: 6, histórico: 10). Força (forte: 12, moderada: 24, fraca: 50, ambígua: 1). Evidência (tecnológica: 44, arquitetural: 29, contexto: 14).
