---
schema: 1
id: 1384034898
full_name: horoshopodumaj/micro-frontends
commit: e1e0a52e4ce5b444ad774b3db87bfaf30cbacf05
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

# 164 — horoshopodumaj/micro-frontends

## Leitura do repositório

É uma demonstração de Module Federation com Rspack e `@module-federation/enhanced`. Tem três projetos irmãos e nenhum workspace na raiz: `host` (React), `remote` (React) e `vue-remote` (Vue 3) (#13 a #15). Cada um tem build próprio e nenhum tem deploy observado (#18 a #20). A composição é encadeada, o que o README chama de federação aninhada: o host consome o `remote`, e o `remote` consome o `vue_remote`.

A cadeia que sustenta a arquitetura está toda no snapshot:
- **Dependência:** cada projeto declara `@module-federation/enhanced` no próprio manifesto (#1 a #3).
- **Configuração:** o host nomeia o container `remote` em `localhost:3001` (#4). O `remote` expõe `./RemoteContent` e nomeia o container `vue_remote` em `localhost:3002` (#6). O `vue-remote` expõe `./Counter` e o próprio runtime `vue`, compartilhado como singleton (#8). Cada `rspack.config.ts` aplica o `ModuleFederationPlugin` à configuração do seu projeto (#5, #7, #9).
- **Código:** o host renderiza o `RemoteContent` importado de `remote/RemoteContent` (#12). Dentro dele, um wrapper React cria o app Vue com o `createApp` vindo de `vue_remote/vue` e o monta num `div` (#11).
- **Relações:** daí saem duas relações host → remote, ambas ativas: remote → vue-remote (#16) e host → remote (#17). O host não declara o `vue_remote`; o componente Vue chega à página dele só pelo `remote`.

Todos os endereços são de desenvolvimento local, e não há artefato de deploy (#18 a #20). O exemplo funciona na máquina local.

Sinais que enganam:
- **Tipos gerados:** o `typeof import('remote/RemoteContent')` de `host/@mf-types/` é declaração de tipos gerada pelo plugin e não carrega nada (#10).
- **Nome `vue_remote`:** o README usa o nome do container federado como nome de pasta. A árvore de pastas é por isso contradita pelo diretório `vue-remote` (#30). O histórico mostra que o README já nasceu assim e que nunca houve uma pasta `vue_remote/` (#33).

A documentação é um README em russo e confere com o resto (#21 a #29, #31, #32). A única divergência é o nome da pasta (#30). Nada fica ambíguo no snapshot.

Configuração: ficaram 6 blocos, um por arquivo, porque cada arquivo serve uma única unidade. Ficaram de fora:
- os `package.json`: os `scripts` são build ou servidor de desenvolvimento (dimensão 6), e as `dependencies` são a dimensão 1. O `vue-remote` espalha as suas `dependencies` em `shared` (vue-remote/module-federation.config.ts:9), mas essa declaração está no bloco de #8;
- os `index.html`, que só têm `<title>` e `<div id="app">` (host/index.html:7, 11);
- os `paths` dos `tsconfig.json`, que são alias de caminho para `./@mf-types/*` (host/tsconfig.json:15-17).

## Observações

### 1. host/package.json:25

**Observação:** `@module-federation/enhanced` `^0.8.9` em `dependencies`. A revisão o marca como configurado: host/rspack.config.ts:5 importa `ModuleFederationPlugin` de `@module-federation/enhanced/rspack` e o instancia com `mfConfig` em :81. A configuração vem de host/module-federation.config.ts:1-8, e o host importa `remote/RemoteContent` em host/src/App.tsx:3.

**Interpretação:** O host declara a implementação de Module Federation que o seu build usa.

### 2. remote/package.json:25

**Observação:** `@module-federation/enhanced` `^0.8.9` em `dependencies`. A revisão o marca como configurado: remote/rspack.config.ts:5 e :81 importam e instanciam o `ModuleFederationPlugin` com a configuração de remote/module-federation.config.ts:1-11.

**Interpretação:** O `remote` declara a implementação de Module Federation que o seu build usa.

### 3. vue-remote/package.json:25

**Observação:** `@module-federation/enhanced` `^0.8.9` em `dependencies`. A revisão o marca como configurado: vue-remote/rspack.config.ts:4 e :82 importam e instanciam o `ModuleFederationPlugin` com a configuração de vue-remote/module-federation.config.ts:1-14.

**Interpretação:** O `vue-remote` declara a implementação de Module Federation que o seu build usa.

### 4. host/module-federation.config.ts:1-8

**Observação:** `mfConfig` com `name: "host"`, `remotes: { remote: 'remote@http://localhost:3001/remoteEntry.js' }`, `exposes: {}` e `shared: ["react", "react-dom"]`.

**Interpretação:** A configuração do host declara o container `remote` e o endereço do seu `remoteEntry.js`, e não expõe nada.

### 5. host/rspack.config.ts:1-92

**Observação:** `defineConfig` com entrada `./src/index.ts`, `devServer` na porta 3000, `output.uniqueName: "host"` e `publicPath: "http://localhost:3000/"`. Os plugins são `HtmlRspackPlugin` com `./index.html` e `new ModuleFederationPlugin(mfConfig)`, com o `mfConfig` importado de `./module-federation.config` (:8, :81).

**Interpretação:** O plugin de federação é aplicado ao build do host com a configuração de #4.

### 6. remote/module-federation.config.ts:1-11

**Observação:** `mfConfig` com `name: "remote"`, `filename: 'remoteEntry.js'`, `remotes: { "vue_remote": "vue_remote@http://localhost:3002/remoteEntry.js" }`, `exposes: { "./RemoteContent": "./src/RemoteContent.tsx" }` e `shared: ["react", "react-dom"]`.

**Interpretação:** O `remote` é ao mesmo tempo fornecedor e consumidor: expõe um componente ao host e declara o container `vue_remote` com o seu endereço.

### 7. remote/rspack.config.ts:1-92

**Observação:** A mesma configuração do host, com porta 3001, `uniqueName: "remote"` e `publicPath: "http://localhost:3001/"` (:25, :31, :33), e `new ModuleFederationPlugin(mfConfig)` (:81).

**Interpretação:** O plugin de federação é aplicado ao build do `remote` com a configuração de #6. O `publicPath` é o endereço que o host pede em #4.

### 8. vue-remote/module-federation.config.ts:1-14

**Observação:** `mfConfig` com `name: "vue_remote"`, `filename: 'remoteEntry.js'` e `exposes: { "./Counter": "./src/Counter.vue", "./vue": "vue" }`. Em `shared`, espalha as `dependencies` do próprio `package.json` (:9) e declara `vue` com `singleton: true` e `eager: true` (:10-13).

**Interpretação:** O `vue-remote` se declara como container `vue_remote` e expõe o componente e o runtime Vue com que ele é montado. Não nomeia outra unidade.

### 9. vue-remote/rspack.config.ts:1-92

**Observação:** `defineConfig` com entrada `./src/index.ts`, `devServer` na porta 3002, `uniqueName: "vue_remote"` e `publicPath: "http://localhost:3002/"`. Os plugins são `VueLoaderPlugin`, `HtmlRspackPlugin` e `new ModuleFederationPlugin(mfConfig)` (:78-82), com a regra `vue-loader` para `.vue` (:42-48).

**Interpretação:** O plugin de federação é aplicado ao build do `vue-remote` com a configuração de #8. O `publicPath` é o endereço que o `remote` pede em #6.

### 10. host/@mf-types/remote/apis.d.ts:3

**Observação:** `type PackageType<T> = T extends 'remote/RemoteContent' ? typeof import('remote/RemoteContent') : any`, num arquivo de declaração gerado pelo DTS do Module Federation (host/@mf-types/index.d.ts:1-22), lido pelo TypeScript pelos `paths` de host/tsconfig.json:15-17.

**Interpretação:** É um tipo do módulo remoto, usado só na verificação de tipos. Não carrega nada em runtime.

### 11. remote/src/CounterWrapper.tsx:10; remote/src/CounterWrapper.tsx:2-3, 9

**Observação:** `counter.mount(containerRef.current)`, dentro de um `useEffect` do componente React `CounterWrapper`. O `counter` é criado em :9 por `createApp(Counter)`, com `Counter` de `vue_remote/Counter` e `createApp` de `vue_remote/vue` (:2-3). O cleanup em :12 retorna `counter.unmount` sem chamá-lo.

**Interpretação:** O `remote` monta, dentro da sua árvore React, o componente Vue exposto pelo `vue-remote`, com o runtime Vue do próprio fornecedor.

### 12. host/src/App.tsx:19; host/src/App.tsx:3

**Observação:** `<RemoteContent/>` na `<section className="content">` (:18-20), ao lado de um menu lateral estático. O componente vem do import `remote/RemoteContent` (:3).

**Interpretação:** O host renderiza na sua área de conteúdo o componente exposto pelo `remote`.

### 13. host; host/package.json; host/rspack.config.ts:17-19, 78-80; host/src/App.tsx:24-25; host/package.json:5

**Observação:** Projeto com `package.json`, lockfile e `rspack.config.ts` próprios. A entrada é `./src/index.ts`, a página vem de `./index.html`, e `App` é renderizado por `ReactDOM.createRoot`. O build é `NODE_ENV=production rspack build`. Não declara workspace.

**Interpretação:** É uma unidade frontend com limite próprio, a aplicação React que faz o papel de host.

### 14. remote; remote/package.json; remote/rspack.config.ts:17-19, 78-80; remote/src/App.tsx:13-14; remote/package.json:5

**Observação:** Projeto com `package.json`, lockfile e `rspack.config.ts` próprios. A entrada é `./src/index.ts`, a página vem de `./index.html`, e `App` é renderizado por `ReactDOM.createRoot`. O build é `NODE_ENV=production rspack build`.

**Interpretação:** É uma unidade frontend com limite próprio, uma aplicação React.

### 15. vue-remote; vue-remote/package.json; vue-remote/rspack.config.ts:16-18, 79-81; vue-remote/src/bootloader.ts:8; vue-remote/package.json:5

**Observação:** Projeto com `package.json`, lockfile e `rspack.config.ts` próprios. A entrada é `./src/index.ts`, a página vem de `./index.html`, e `createApp(App).mount("#app")` monta o app. O build é `NODE_ENV=production rspack build`.

**Interpretação:** É uma unidade frontend com limite próprio, uma aplicação Vue 3.

### 16. remote/src/CounterWrapper.tsx:10; remote/module-federation.config.ts:5; vue-remote/module-federation.config.ts:2-3, 5-6, 10-13; vue-remote/rspack.config.ts:33

**Observação:** O `remote` declara o container `vue_remote` em `http://localhost:3002/remoteEntry.js`. Esse é o `name` e o `filename` da configuração do `vue-remote`, confirmados pelo seu `publicPath`. Os módulos consumidos, `vue_remote/Counter` e `vue_remote/vue`, são as duas entradas de `exposes`, e a montagem ocorre em remote/src/CounterWrapper.tsx:10. O wrapper é renderizado pelo `RemoteContent` (remote/src/RemoteContent.tsx:10), na página do `remote` e na do host.

**Interpretação:** É uma relação host → remote ativa, do `remote` ao `vue-remote`, por Module Federation, com integração entre React e Vue.

### 17. host/src/App.tsx:19; host/module-federation.config.ts:4; remote/module-federation.config.ts:2-3, 8; remote/rspack.config.ts:33

**Observação:** O host declara o container `remote` em `http://localhost:3001/remoteEntry.js`. Esse é o `name` e o `filename` da configuração do `remote`, confirmados pelo seu `publicPath`. O módulo importado, `remote/RemoteContent`, é o único `exposes` do `remote`, e o host o renderiza em host/src/App.tsx:19. O host não declara o `vue_remote` (host/module-federation.config.ts:3-5).

**Interpretação:** É uma relação host → remote ativa. O componente Vue aparece no host por meio desta relação e de #16, sem relação direta host → vue-remote.

### 18. host/package.json:5; host/rspack.config.ts:15-92

**Observação:** Build próprio com `NODE_ENV=production rspack build`, entrada própria, `HtmlRspackPlugin`, `ModuleFederationPlugin` e `uniqueName: "host"`. É servido só em desenvolvimento, em `http://localhost:3000/`, por `rspack serve`. Não há artefato de deploy, e a versão `0.0.1` não é usada.

**Interpretação:** Há fronteira de build própria, sem deploy observado.

### 19. remote/package.json:5; remote/rspack.config.ts:15-92; remote/module-federation.config.ts:3

**Observação:** Build próprio com `NODE_ENV=production rspack build`, igual ao do host salvo a porta, o `uniqueName` e o `publicPath`, e gera o `remoteEntry.js`. É servido só em desenvolvimento, em `http://localhost:3001/`. Não há artefato de deploy, e a versão `0.0.1` não é usada.

**Interpretação:** Há fronteira de build própria, sem deploy observado.

### 20. vue-remote/package.json:5; vue-remote/rspack.config.ts:14-92; vue-remote/module-federation.config.ts:3

**Observação:** Build próprio com `NODE_ENV=production rspack build`, com `vue-loader`, `VueLoaderPlugin` e `uniqueName: "vue_remote"`, e gera o `remoteEntry.js`. É servido só em desenvolvimento, em `http://localhost:3002/`. Não há artefato de deploy, e a versão `0.0.1` não é usada.

**Interpretação:** Há fronteira de build própria, sem deploy observado.

### 21. README.md:1

**Observação:** "Microfrontends Demo (Rspack + Module Federation)". A frase de abertura repete a ideia (README.md:3).

**Interpretação:** O README apresenta o repositório como demonstração de micro-frontends com Module Federation sobre Rspack.

### 22. README.md:5

**Observação:** "Проект состоит из трёх независимых приложений" (o projeto é composto de três aplicações independentes).

**Interpretação:** A afirmação fala das unidades como conjunto: três aplicações separadas.

### 23. README.md:7

**Observação:** "**host** — React-приложение (контейнер), которое подключает удалённые модули." (host — aplicação React (contêiner), que conecta módulos remotos).

**Interpretação:** A afirmação dá ao host o papel de contêiner que consome remotes.

### 24. README.md:8

**Observação:** "**remote** — React-приложение (микрофронтенд), которое отдаёт наружу компонент `RemoteContent` и само подключает Vue-микрофронтенд." (remote — aplicação React (micro-frontend), que expõe o componente `RemoteContent` e ela própria conecta o micro-frontend Vue).

**Interpretação:** A afirmação dá ao `remote` o duplo papel de fornecedor e consumidor.

### 25. README.md:9

**Observação:** "**vue_remote** — Vue 3 приложение (микрофронтенд), которое отдаёт наружу компонент `Counter`." (vue_remote — aplicação Vue 3 (micro-frontend), que expõe o componente `Counter`).

**Interpretação:** A afirmação dá à aplicação Vue o papel de fornecedora de um componente.

### 26. README.md:15-31

**Observação:** Diagrama que liga `host` a `remote` por `remote@http://localhost:3001/remoteEntry.js` e `remote` a `vue_remote` por `vue_remote@http://localhost:3002/remoteEntry.js`.

**Interpretação:** A afirmação descreve a cadeia de composição e os endereços dos containers.

### 27. README.md:34

**Observação:** "`host` ничего не знает про `vue_remote`. Vue-микрофронтенд подключается внутри `remote`, что демонстрирует **вложенную федерацию**." (`host` não sabe nada de `vue_remote`. O micro-frontend Vue é conectado dentro de `remote`, o que demonstra a federação aninhada). A lista de características repete a ideia (README.md:133).

**Interpretação:** A afirmação diz que a composição é encadeada e que o host não liga diretamente a aplicação Vue.

### 28. README.md:46

**Observação:** "Сборщик у всех приложений — **Rspack**." (o empacotador de todas as aplicações é o Rspack).

**Interpretação:** A afirmação só nomeia a ferramenta de build.

### 29. README.md:103-106

**Observação:** Na página do host aparecem "React-компонент `RemoteContent`, пришедший из `remote`" e, dentro dele, "Vue-компонент `Counter` …, пришедший из `vue_remote`" (o componente React `RemoteContent`, vindo de `remote`; dentro dele, o componente Vue `Counter`, vindo de `vue_remote`).

**Interpretação:** A afirmação descreve o resultado da composição encadeada numa mesma página.

### 30. README.md:112-127

**Observação:** Árvore de pastas comentada com `host/`, `remote/` e `vue_remote/`, cada uma com `src/` e `module-federation.config.ts`, e com `RemoteContent.tsx` e `Counter.vue`. O diretório do snapshot é `vue-remote/`. Os comandos `cd vue_remote` (README.md:62, 78) têm o mesmo nome.

**Interpretação:** A afirmação descreve a organização em três pastas, mas usa o nome do container federado no lugar do diretório da aplicação Vue.

### 31. README.md:134

**Observação:** "**Кросс-фреймворковое взаимодействие** — React-контейнер рендерит Vue-компонент." (interação entre frameworks: o contêiner React renderiza um componente Vue).

**Interpretação:** A afirmação diz que uma unidade React compõe um componente de uma unidade Vue.

### 32. README.md:135

**Observação:** "**Singleton Vue** — гарантирует единый рантайм Vue между приложениями." (Vue singleton: garante um runtime Vue único entre as aplicações).

**Interpretação:** A afirmação trata do compartilhamento do runtime Vue entre as aplicações.

### 33. 5501ade 2026-09-23 (host/, remote/, vue-remote/); e1e0a52 2026-09-23 (README.md)

**Observação:** O primeiro commit, `5501ade`, cria todos os arquivos da aplicação Vue já em `vue-remote/`, e nenhum commit até o snapshot cria, renomeia ou remove um caminho `vue_remote`. O README só aparece em `e1e0a52`, que não toca em mais nada. A revisão marca o ponto como esclarecido.

**Interpretação:** A árvore de pastas do README não é resto de um estágio anterior: ela já nasceu divergente do diretório. A afirmação continua contradita.

## Classificação

| # | Origem | Dimensão | Tipo | Abordagem | Evidência | Força | Relações |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.2 (host/package.json:25) | 1 tecnologia | manifesto | module-federation | tecnológica | fraca | declara #4; declara #5; declara #12 |
| 2 | 3.4.2 (remote/package.json:25) | 1 tecnologia | manifesto | module-federation | tecnológica | fraca | declara #6; declara #7 |
| 3 | 3.4.2 (vue-remote/package.json:25) | 1 tecnologia | manifesto | module-federation | tecnológica | fraca | declara #8; declara #9 |
| 4 | 3.4.2 (host/package.json:25, remote/package.json:25, Evidência); 3.4.3 (host, Marcadores); 3.4.4 (host/src/App.tsx:19, Observação); 3.4.5 #2 (Configuração); 3.4.7 #3, #6, #7, #10 (Evidência) | 2 configuração | configuração | module-federation | arquitetural | forte | configura #13; configura #17 |
| 5 | 3.4.2 (host/package.json:25, Evidência); 3.4.3 (host, Marcadores, Entrada e Build); 3.4.6 #1 (Onde é servida e Artefatos) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #13; configura #17 |
| 6 | 3.4.2 (remote/package.json:25, vue-remote/package.json:25, Evidência); 3.4.3 (remote, Marcadores); 3.4.4 (remote/src/CounterWrapper.tsx:10, host/src/App.tsx:19, Observação); 3.4.5 #1, #2 (Configuração); 3.4.6 #2 (Artefatos); 3.4.7 #4, #6, #7 (Evidência) | 2 configuração | configuração | module-federation | arquitetural | forte | configura #14; configura #16; configura #17 |
| 7 | 3.4.2 (remote/package.json:25, Evidência); 3.4.3 (remote, Marcadores, Entrada e Build); 3.4.5 #2 (Configuração); 3.4.6 #2 (Onde é servida e Artefatos) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #14; configura #17 |
| 8 | 3.4.2 (vue-remote/package.json:25, Evidência); 3.4.3 (vue-remote, Marcadores); 3.4.4 (remote/src/CounterWrapper.tsx:10, Observação); 3.4.5 #1 (Configuração); 3.4.6 #3 (Artefatos); 3.4.7 #5, #6, #10, #12 (Evidência) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #15; configura #16 |
| 9 | 3.4.2 (vue-remote/package.json:25, Evidência); 3.4.3 (vue-remote, Marcadores, Entrada e Build); 3.4.5 #1 (Configuração); 3.4.6 #3 (Onde é servida e Artefatos) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #15; configura #16 |
| 10 | 3.4.4 (host/@mf-types/remote/apis.d.ts:3) | 3 código | código-fonte | module-federation | tecnológica | fraca | — |
| 11 | 3.4.4 (remote/src/CounterWrapper.tsx:10) | 3 código | código-fonte | module-federation | tecnológica | moderada | implementa #16 |
| 12 | 3.4.4 (host/src/App.tsx:19) | 3 código | código-fonte | module-federation | tecnológica | moderada | implementa #17 |
| 13 | 3.4.3 (host) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 14 | 3.4.3 (remote) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 15 | 3.4.3 (vue-remote) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 16 | 3.4.5 #1 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #14; liga #15 |
| 17 | 3.4.5 #2 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #13; liga #14 |
| 18 | 3.4.6 #1 | 6 build-deploy | configuração | — | arquitetural | moderada | publica #13 |
| 19 | 3.4.6 #2 | 6 build-deploy | configuração | — | arquitetural | moderada | publica #14 |
| 20 | 3.4.6 #3 | 6 build-deploy | configuração | — | arquitetural | moderada | publica #15 |
| 21 | 3.4.7 #1 | 7 documentação | documentação | module-federation | arquitetural | fraca | corrobora #1; corrobora #2; corrobora #3; corrobora #13; corrobora #14; corrobora #15; corrobora #16; corrobora #17; corrobora #18; corrobora #19; corrobora #20 |
| 22 | 3.4.7 #2 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #13; corrobora #14; corrobora #15; corrobora #18; corrobora #19; corrobora #20; corrobora remote/src/App.tsx:7-14; corrobora vue-remote/src/bootloader.ts:8 |
| 23 | 3.4.7 #3 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #17; corrobora #4; corrobora #12; corrobora host/package.json:26 |
| 24 | 3.4.7 #4 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #16; corrobora #17; corrobora #6; corrobora remote/package.json:26 |
| 25 | 3.4.7 #5 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #16; corrobora #8; corrobora vue-remote/package.json:26 |
| 26 | 3.4.7 #6 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #16; corrobora #17; corrobora #4; corrobora #6; corrobora #8 |
| 27 | 3.4.7 #7 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #16; corrobora #17; corrobora #4; corrobora #6 |
| 28 | 3.4.7 #8 | 7 documentação | documentação | — | tecnológica | fraca | corrobora #18; corrobora #19; corrobora #20 |
| 29 | 3.4.7 #9 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #12; corrobora #11; corrobora #16; corrobora #17; corrobora remote/src/RemoteContent.tsx:10 |
| 30 | 3.4.7 #10 | 7 documentação | documentação | — | arquitetural | fraca | contradiz #15 |
| 31 | 3.4.7 #11 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #11; corrobora #16 |
| 32 | 3.4.7 #12 | 7 documentação | documentação | — | tecnológica | fraca | corrobora #8; corrobora #11; corrobora #16 |
| 33 | 3.4.8 #1 | 8 histórico | histórico | — | contexto | fraca | explica #30 |

## Resumo

Observações: 33. Dimensões (tecnologia: 3, configuração: 6, código: 3, estrutura: 3, composição: 2, build-deploy: 3, documentação: 12, histórico: 1). Força (forte: 4, moderada: 12, fraca: 17, ambígua: 0). Evidência (tecnológica: 12, arquitetural: 20, contexto: 1).
