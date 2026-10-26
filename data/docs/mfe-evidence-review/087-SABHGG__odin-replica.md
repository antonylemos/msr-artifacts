---
schema: 1
id: 1183434052
full_name: SABHGG/odin-replica
commit: 06ce2bd578663f88243854f6eef292686660dfce
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

# 087 — SABHGG/odin-replica

## Leitura do repositório

O snapshot é um único projeto Create React App na raiz (#15). Ele é ao mesmo tempo o root-config single-spa e a aplicação React local, e registra uma aplicação Angular externa que não está no repositório. Não há arquivo de configuração que declare elemento da composição: a URL do remote está no próprio código de entrada, por isso não há observação de configuração.

A cadeia que sustenta a arquitetura passa pelo código:
- **Dependência:** `single-spa` é declarado (#1) e usado na entrada.
- **Código:** o registro `leadocs-angular` nomeia a unidade externa (#7), o loader injeta o `<script>` do bundle remoto (#10) e `start()` inicia o orquestrador (#14).
- **Relação:** daí sai a única relação, root-config → application, ativa e com destino fora do snapshot (#17).

O build é próprio da aplicação, sem deploy no repositório (#18).

Sinais que enganam:
- **Lifecycles locais:** os lifecycles de `single-spa-react` (#2, #3–#5, #8, #9) e o registro `odin-react` (#6) usam o mecanismo, mas para a própria unidade, no mesmo bundle. Não ligam unidades.
- **Evento `toggle-leapdocs`:** o par emissor/receptor (#11–#13) parece comunicação entre MFEs, mas é interno à unidade. Ele só alimenta a função de atividade do remote.

A documentação está nos comentários e mensagens de console de `src/index.js`. Ela confirma a ativação por evento (#20), o Odin local (#21, #22) e o loader por script (#24). O "Angular" do remote e o contrato `leapdocs` ficam só em parte confirmados (#23, #25), porque o lado remoto não tem artefato. Duas afirmações são desmentidas pelo código: o `libraryName` `leadocs` (#26) e o "import dinâmico" de `src/root.app.js` (#27). O histórico esclarece as três divergências: o remote nunca esteve no repositório (#28), e a mensagem e o comentário nasceram junto com o código que os contradiz (#29, #30). Nada fica ambíguo no snapshot. O que não se observa é o próprio remote.

## Observações

### 1. package.json:13

**Observação:** `single-spa` `^6.0.3` em `dependencies`. A revisão o marca como configurado, pelo import e pelos usos em src/index.js:3, 56-60, 63-100 e 103.

**Interpretação:** A aplicação declara o orquestrador single-spa e o usa na entrada.

### 2. package.json:14

**Observação:** `single-spa-react` `^6.0.2` em `dependencies`. A revisão o marca como configurado, pelo import e pela chamada em src/root.app.js:3 e 6-14.

**Interpretação:** A aplicação declara o adaptador React do single-spa e o usa para a aplicação local.

### 3. src/root.app.js:16

**Observação:** `export const bootstrap = reactLifecycles.bootstrap`. O objeto é criado em src/root.app.js:6-14, e o único consumidor é o registro `odin-react` em src/index.js:56-60, no mesmo bundle.

**Interpretação:** É um lifecycle single-spa da própria unidade, interno a ela.

### 4. src/root.app.js:17

**Observação:** `export const mount = reactLifecycles.mount`, do mesmo objeto, com o mesmo consumidor interno.

**Interpretação:** É um lifecycle single-spa da própria unidade, interno a ela.

### 5. src/root.app.js:18

**Observação:** `export const unmount = reactLifecycles.unmount`, do mesmo objeto, com o mesmo consumidor interno.

**Interpretação:** É um lifecycle single-spa da própria unidade, interno a ela.

### 6. src/index.js:56-60; src/index.js:4

**Observação:** `registerApplication('odin-react', async () => RootApp, () => true)`. `RootApp` vem do import estático de `./root.app`.

**Interpretação:** O root registra a própria aplicação React, sempre ativa, sem envolver outra unidade.

### 7. src/index.js:63-100

**Observação:** `registerApplication('leadocs-angular', ...)`, com uma função de carga que injeta um script (src/index.js:65-94), a função de atividade `() => isLeadocsActive` (src/index.js:96) e `domElementGetter` para `#microfrontend-container` (src/index.js:98), nó criado em src/App.js:57.

**Interpretação:** O root registra pelo nome uma aplicação externa no orquestrador e define quando e onde ela monta.

### 8. src/root.app.js:3

**Observação:** `import singleSpaReact from 'single-spa-react'`.

**Interpretação:** A unidade importa o adaptador para criar os próprios lifecycles.

### 9. src/root.app.js:6-14

**Observação:** `singleSpaReact({ React, ReactDOM, rootComponent: App, errorBoundary, domElementGetter: () => document.getElementById('root') })`.

**Interpretação:** O `App` local é adaptado a lifecycles single-spa para o orquestrador do mesmo bundle.

### 10. src/index.js:72-73; src/index.js:93; src/index.js:7-9; src/index.js:78-80

**Observação:** Dentro da função de carga de `leadocs-angular`, `document.createElement('script')` recebe `src = LEAPDOCS_BUNDLE_URL` (padrão `http://localhost:4200/main.js`, trocável por `REACT_APP_LEAPDOCS_ORIGIN` e `REACT_APP_LEAPDOCS_BUNDLE_URL`) e é anexado a `document.head`. No `onload`, a promessa resolve com `globalThis.leapdocs`.

**Interpretação:** O loader do single-spa traz o bundle da unidade externa por script em runtime e lê os lifecycles numa global.

### 11. src/App.js:18-22; src/App.js:29-38

**Observação:** `window.dispatchEvent(...)` em `handleSectionChange`, acionado pelos botões da barra lateral.

**Interpretação:** É um evento disparado pela própria unidade, cujo único receptor também está nela.

### 12. src/App.js:19-21

**Observação:** `new CustomEvent('toggle-leapdocs', { detail: { isActive: sectionId === 'microfrontend' } })`.

**Interpretação:** É o evento interno da observação #11.

### 13. src/index.js:47-51

**Observação:** `globalThis.addEventListener('toggle-leapdocs', ...)` grava `isLeadocsActive`, chama `normalizeCurrentUrl()` e `triggerAppChange()`.

**Interpretação:** É o receptor, na mesma unidade, do evento das observações #11 e #12. Ele muda o estado que a função de atividade do remote lê.

### 14. src/index.js:103; src/index.js:3

**Observação:** `start()`, importado de `single-spa`.

**Interpretação:** Inicia o orquestrador. Sem ele nenhum dos registros monta, nem o da unidade externa.

### 15. .; package.json; src/index.js:56-60; src/index.js:103; public/index.html:31; package.json:20

**Observação:** Aplicação CRA na raiz, com manifesto, entrada `src/index.js` (registra `odin-react` e chama `start()`), template com `<div id="root">` e build `react-scripts build`, sem arquivo de configuração próprio nem workspace.

**Interpretação:** É a única unidade frontend do snapshot, com limite próprio.

### 16. public; public/index.html

**Observação:** É a pasta do template HTML do CRA.

**Interpretação:** É parte da aplicação da raiz, e não outra unidade.

### 17. src/index.js:63; src/index.js:72; src/index.js:103; src/index.js:7-9

**Observação:** O root `.` registra `leadocs-angular` no single-spa, carrega o bundle dela por script de uma URL (padrão `http://localhost:4200/main.js`) e inicia o orquestrador. O destino não está no snapshot, e nenhuma unidade do snapshot produz esse bundle.

**Interpretação:** É uma relação root-config → application ativa, com destino externo.

### 18. package.json:20; .gitignore:11-12

**Observação:** `"build": "react-scripts build"`, com saída `/build` ignorada pelo git. Não há artefato de deploy, e a versão `0.1.0` de um pacote `private` não é usada em publicação.

**Interpretação:** A aplicação tem build próprio, separado do remote, sem deploy observado nem versionamento independente.

### 19. src/index.js:7

**Observação:** "Puerto donde corre tu 'ng serve'" (porta onde roda o seu `ng serve`).

**Interpretação:** Afirma que o remote é servido pelo servidor de desenvolvimento do Angular, à parte. Nada no snapshot roda esse servidor, e a afirmação fica sem corroboração.

### 20. src/index.js:44

**Observação:** "Activación por evento (sin rutas)" (ativação por evento, sem rotas).

**Interpretação:** Afirma que o remote é ativado por evento, não por rota. A afirmação é corroborada.

### 21. src/index.js:55

**Observação:** "Registrar Odin (React Local)" (registrar o Odin, React local).

**Interpretação:** Afirma que o Odin é a aplicação React do próprio repositório. A afirmação é corroborada.

### 22. src/index.js:58

**Observação:** "Carga directa del componente exportado" (carga direta do componente exportado).

**Interpretação:** Afirma que os lifecycles locais são entregues sem carga remota. A afirmação é corroborada.

### 23. src/index.js:62

**Observação:** "Registrar Leadocs (Angular Remoto)" (registrar o Leadocs, Angular remoto).

**Interpretação:** Afirma que o Leadocs é uma aplicação Angular remota. O "remoto" é confirmado; o "Angular" não tem artefato no snapshot, e a afirmação é corroborada em parte.

### 24. src/index.js:66

**Observação:** "Promesa que carga el script y devuelve el módulo" (promessa que carrega o script e devolve o módulo).

**Interpretação:** Afirma que o remote é carregado por script numa promessa. A afirmação é corroborada; o "módulo" devolvido é uma global.

### 25. src/index.js:77

**Observação:** "Al terminar de cargar, Angular debe haber expuesto 'window.leapdocs'" (ao terminar de carregar, o Angular deve ter exposto `window.leapdocs`).

**Interpretação:** Afirma o contrato entre host e remote pela global `leapdocs`. O lado do host é confirmado; o do remote não tem artefato, e a afirmação é corroborada em parte.

### 26. src/index.js:83

**Observação:** Mensagem de console: "Asegúrate de que en el 'angular.json' de Leadocs, la propiedad 'libraryName' sea 'leadocs'" (garanta que, no `angular.json` do Leadocs, a propriedade `libraryName` seja `leadocs`).

**Interpretação:** Afirma como o remote deve ser construído. O código lê `globalThis.leapdocs` (src/index.js:69, 78), o que contradiz o nome pedido.

### 27. src/root.app.js:20

**Observação:** "Exportamos todo el objeto para el import dinámico" (exportamos o objeto inteiro para o import dinâmico).

**Interpretação:** Afirma que o objeto de lifecycles é importado dinamicamente. O único consumidor o importa estaticamente (src/index.js:4), o que contradiz a afirmação.

### 28. 80616f7 2026-03-11 (.); 06ce2bd 2026-03-16 (.)

**Observação:** As árvores dos dois commits só têm o scaffold do CRA e, a partir de `06ce2bd`, `src/root.app.js`. Nenhuma tem `angular.json`, projeto Angular ou outro arquivo do remote, e nenhum commit remove arquivo.

**Interpretação:** O remote nunca esteve no repositório. Sua ausência não vem de extração nem de remoção, e o histórico não mostra se ele é Angular nem se publica `leapdocs`.

### 29. 80616f7 2026-03-11 (src/index.js); 06ce2bd 2026-03-16 (src/index.js)

**Observação:** `src/index.js` tem duas versões. A do snapshot, `06ce2bd`, que introduz o root single-spa, tem ao mesmo tempo a mensagem com `leadocs` e a leitura de `globalThis.leapdocs`. O conteúdo de `80616f7` não está disponível no clone, e não há commit posterior.

**Interpretação:** A mensagem e a global lida entraram juntas. A divergência não é resto de uma mudança versionada.

### 30. 06ce2bd 2026-03-16 (src/root.app.js; src/index.js)

**Observação:** `src/root.app.js` é criado em `06ce2bd`, o mesmo commit da única versão de `src/index.js` com o `import RootApp from './root.app'` estático.

**Interpretação:** O comentário e o import estático nasceram juntos. O comentário não é resto de um estágio com import dinâmico.

## Classificação

| # | Origem | Dimensão | Tipo | Abordagem | Evidência | Força | Relações |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.2 (package.json:13) | 1 tecnologia | manifesto | single-spa | tecnológica | fraca | declara #6; declara #7; declara #14 |
| 2 | 3.4.2 (package.json:14) | 1 tecnologia | manifesto | single-spa | tecnológica | fraca | declara #8; declara #9 |
| 3 | 3.4.4 (src/root.app.js:16) | 3 código | código-fonte | single-spa | tecnológica | fraca | — |
| 4 | 3.4.4 (src/root.app.js:17) | 3 código | código-fonte | single-spa | tecnológica | fraca | — |
| 5 | 3.4.4 (src/root.app.js:18) | 3 código | código-fonte | single-spa | tecnológica | fraca | — |
| 6 | 3.4.4 (src/index.js:56) | 3 código | código-fonte | single-spa | tecnológica | fraca | — |
| 7 | 3.4.4 (src/index.js:63) | 3 código | código-fonte | single-spa | arquitetural | forte | implementa #17 |
| 8 | 3.4.4 (src/root.app.js:3) | 3 código | código-fonte | single-spa | tecnológica | fraca | — |
| 9 | 3.4.4 (src/root.app.js:6) | 3 código | código-fonte | single-spa | tecnológica | fraca | — |
| 10 | 3.4.4 (src/index.js:72) | 3 código | código-fonte | script | tecnológica | moderada | implementa #17 |
| 11 | 3.4.4 (src/App.js:18) | 3 código | código-fonte | — | contexto | fraca | — |
| 12 | 3.4.4 (src/App.js:19) | 3 código | código-fonte | — | contexto | fraca | — |
| 13 | 3.4.4 (src/index.js:47) | 3 código | código-fonte | — | contexto | fraca | — |
| 14 | 3.4.4 (src/index.js:103) | 3 código | código-fonte | single-spa | tecnológica | moderada | implementa #17 |
| 15 | 3.4.3 (.) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 16 | 3.4.3 (public) | 4 estrutura | diretório | — | contexto | fraca | — |
| 17 | 3.4.5 #1 | 5 composição | código-fonte | single-spa | arquitetural | forte | liga #15 |
| 18 | 3.4.6 #1 | 6 build-deploy | manifesto | — | arquitetural | moderada | publica #15 |
| 19 | 3.4.7 #1 | 7 documentação | comentário | — | arquitetural | fraca | — |
| 20 | 3.4.7 #2 | 7 documentação | comentário | — | arquitetural | fraca | corrobora #13; corrobora #11; corrobora #17 |
| 21 | 3.4.7 #3 | 7 documentação | comentário | — | arquitetural | fraca | corrobora #15; corrobora #6 |
| 22 | 3.4.7 #4 | 7 documentação | comentário | — | tecnológica | fraca | corrobora #6 |
| 23 | 3.4.7 #5 | 7 documentação | comentário | — | arquitetural | fraca | corrobora em parte #7; corrobora em parte #17 |
| 24 | 3.4.7 #6 | 7 documentação | comentário | script | tecnológica | fraca | corrobora #10; corrobora #17 |
| 25 | 3.4.7 #7 | 7 documentação | comentário | — | arquitetural | fraca | corrobora em parte #10 |
| 26 | 3.4.7 #8 | 7 documentação | comentário | — | arquitetural | fraca | contradiz #7; contradiz #10 |
| 27 | 3.4.7 #9 | 7 documentação | comentário | — | tecnológica | fraca | contradiz #6 |
| 28 | 3.4.8 #1 | 8 histórico | histórico | — | arquitetural | fraca | explica #23; explica #25 |
| 29 | 3.4.8 #2 | 8 histórico | histórico | — | arquitetural | fraca | explica #26 |
| 30 | 3.4.8 #3 | 8 histórico | histórico | — | tecnológica | fraca | explica #27 |

## Resumo

Observações: 30. Dimensões (tecnologia: 2, configuração: 0, código: 12, estrutura: 2, composição: 1, build-deploy: 1, documentação: 9, histórico: 3). Força (forte: 2, moderada: 4, fraca: 24, ambígua: 0). Evidência (tecnológica: 14, arquitetural: 12, contexto: 4).
