---
schema: 1
id: 1009887363
full_name: dhiman1987/micro-frontend-demo
commit: cae01436907388ad75de4a33cfc2c7a5ae256406
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
  date: 2026-10-21
---

# 043 — dhiman1987/micro-frontend-demo

## Leitura do repositório

A composição usa só Web Components nativos, sem biblioteca. A evidência forte está toda no HTML do shell: para cada unidade, ele carrega um script por URL (#4, #12 a #14) e usa a tag que o script define (#15 a #17). Do outro lado:
- **app1 e app2:** definem as tags em JavaScript puro (#5 a #8).
- **app3:** encapsula React num custom element com Shadow DOM (#9 a #11). O build a empacota como bundle IIFE (#3).

Isso resulta em três relações ativas (#23 a #25).

A estrutura mostra quatro unidades (#19 a #22), três delas páginas estáticas sem build. Por isso, build e deploy quase não trazem evidência:
- **Build:** só a app3 tem build próprio (#29).
- **Deploy:** nenhuma aplicação tem deploy. O README afirma "independently deployed apps", sem artefato que o sustente (#30).

Sinais que enganam se lidos sozinhos:
- **Dependências Lit:** `lit` e `@lit/react` estão declaradas (#1, #2), mas a variante Lit do contador (#18) não é alcançada por nenhum ponto de entrada. O histórico mostra que ela foi acrescentada e nunca conectada (#37).
- **Isolamento de estilos:** o README promete "zero global style bleed", mas o CSS do shell atinge a app1 e a app2 (#36). O histórico mostra que a promessa e o código convivem desde o primeiro commit (#38).

## Observações

### 1. app3/package.json:13; app3/src/MyCounterLitElement.jsx:20-23

**Observação:** `@lit/react` (`^1.0.7`) está declarada em `dependencies`, sem import em nenhum arquivo. A variante Lit chama `createComponent` sem importá-la.

**Interpretação:** Uma biblioteca de Web Components é declarada e não é usada. É um sinal enganoso.

### 2. app3/package.json:15; app3/src/MyCounterLitElement.jsx:1-8

**Observação:** `lit` (`^3.3.0`) está declarada em `dependencies`. É importada só pela variante `MyCounterLitElement.jsx`, que nenhum build ou entrada referencia.

**Interpretação:** A biblioteca só é usada por uma variante que nenhuma entrada alcança. É um sinal enganoso.

**Nota:** A orientação daria `ambígua` a uma dependência `Undetermined` na revisão de dependências (3.4.2). Aqui a força é `fraca`: nenhum build, entrada ou página referencia a variante (app3/vite.config.js:9-15; app3/src/main.jsx:1), e não resta outra leitura plausível do snapshot.

### 3. app3/vite.config.js:1-17

**Observação:** `build.lib` usa `entry: 'src/MyCounterElement.jsx'`, `formats: ['iife']`, `name: 'MyCounterApp'` e `fileName: 'my-counter-app'`.

**Interpretação:** A app3 está configurada para ser publicada como um script autônomo que registra seu custom element.

### 4. app-shell/index.html:26

**Observação:** `<script src="http://localhost:3003/my-counter-app.iife.js"></script>`.

**Interpretação:** O shell carrega o bundle da app3 pela URL dela.

**Nota:** A revisão de código-fonte (3.4.4) registrou esta linha por dois padrões (#4 e #14). Esta etapa (3.5) mantém uma observação por linha.

### 5. app1/app.js:1-5

**Observação:** A classe `HelloApp` estende `HTMLElement` e escreve um `<h2>` no `connectedCallback`.

**Interpretação:** A app1 implementa o custom element que oferece.

### 6. app1/app.js:6

**Observação:** `customElements.define('hello-app', HelloApp)`.

**Interpretação:** A app1 registra a tag que o shell consome.

### 7. app2/app.js:1-5

**Observação:** Uma classe estende `HTMLElement` e escreve o conteúdo no `connectedCallback`.

**Interpretação:** A app2 implementa o custom element que oferece.

### 8. app2/app.js:6

**Observação:** `customElements.define('world-app', …)`.

**Interpretação:** A app2 registra a tag que o shell consome.

### 9. app3/src/MyCounterElement.jsx:6

**Observação:** `class MyCounterElement extends HTMLElement`.

**Interpretação:** A app3 implementa um custom element como invólucro da aplicação React.

### 10. app3/src/MyCounterElement.jsx:7-24

**Observação:** O `connectedCallback` cria um Shadow DOM (`attachShadow`), injeta o CSS da aplicação, lê os atributos `theme` e `maxCount` e renderiza o React dentro dele.

**Interpretação:** A app3 se monta isolada no Shadow DOM, com a configuração recebida por atributos.

### 11. app3/src/MyCounterElement.jsx:28

**Observação:** `customElements.define('my-counter-app', MyCounterElement)`.

**Interpretação:** A app3 registra a tag que o shell consome.

### 12. app-shell/index.html:14

**Observação:** `<script type="module" src="http://localhost:3001/app.js"></script>`.

**Interpretação:** O shell carrega o script da app1 pela URL dela.

### 13. app-shell/index.html:20

**Observação:** `<script type="module" src="http://localhost:3002/app.js"></script>`.

**Interpretação:** O shell carrega o script da app2 pela URL dela.

### 14. app-shell/index.html:26

**Observação:** É a mesma linha do #4, reconhecida pelo padrão de script externo.

**Interpretação:** O shell carrega o bundle da app3 pela URL dela.

### 15. app-shell/index.html:15

**Observação:** `<hello-app></hello-app>`.

**Interpretação:** O shell insere a app1 pela tag dela.

### 16. app-shell/index.html:21

**Observação:** `<world-app></world-app>`.

**Interpretação:** O shell insere a app2 pela tag dela.

### 17. app-shell/index.html:27

**Observação:** `<my-counter-app theme="dark" maxcount="7"></my-counter-app>`.

**Interpretação:** O shell insere a app3 pela tag dela e lhe passa configuração por atributos.

### 18. app3/src/MyCounterLitElement.jsx:7

**Observação:** O decorator `@customElement('my-counter-lit-app')` registra uma variante Lit, que nenhuma entrada, build ou página importa ou usa.

**Interpretação:** É um custom element desconectado, que não participa da composição.

### 19. app-shell; app-shell/index.html:9-29

**Observação:** É uma página HTML própria, que só carrega o próprio `style.css` e os scripts das outras unidades por URL. Não tem build.

**Interpretação:** É uma unidade frontend estática com limite próprio.

### 20. app1; app1/index.html:3-4; app1/app.js:1-6

**Observação:** É uma página HTML própria que carrega `app.js` e usa a tag, sem imports de pacotes nem build.

**Interpretação:** É uma unidade frontend estática com limite próprio, capaz de rodar sozinha.

### 21. app2; app2/index.html:3-4; app2/app.js:1-6

**Observação:** É uma página HTML própria que carrega `app.js` e usa a tag, sem imports de pacotes nem build.

**Interpretação:** É uma unidade frontend estática com limite próprio, capaz de rodar sozinha.

### 22. app3; app3/package.json:1-11; app3/vite.config.js:9-15; app3/src/MyCounterElement.jsx:20-28; app3/index.html:11-12

**Observação:** Tem manifesto, entrada de build, build Vite IIFE próprio e uma página standalone.

**Interpretação:** É uma unidade frontend com limite próprio.

### 23. app-shell/index.html:26-27; app3/src/MyCounterElement.jsx:28; app3/vite.config.js:10-15

**Observação:** O shell carrega `my-counter-app.iife.js` e usa `<my-counter-app>`. A tag e o nome do arquivo correspondem à app3.

**Interpretação:** É uma relação application → custom-element ativa.

### 24. app-shell/index.html:14-15; app1/app.js:6

**Observação:** O shell carrega `http://localhost:3001/app.js` e usa `<hello-app>`, tag definida pela app1.

**Interpretação:** É uma relação application → custom-element ativa.

### 25. app-shell/index.html:20-21; app2/app.js:6

**Observação:** O shell carrega `http://localhost:3002/app.js` e usa `<world-app>`, tag definida pela app2.

**Interpretação:** É uma relação application → custom-element ativa.

### 26. app-shell; README.md:46-50

**Observação:** É uma página estática sem build, servida à mão com `http-server` na porta 3000. Não há artefato de deploy.

**Interpretação:** Não há fronteira de build nem de deploy observada.

### 27. app1; README.md:52-56

**Observação:** É uma página estática sem build, servida à mão na porta 3001. Não há artefato de deploy.

**Interpretação:** Não há fronteira de build nem de deploy observada.

### 28. app2; README.md:58-62

**Observação:** É uma página estática sem build, servida à mão na porta 3002. Não há artefato de deploy.

**Interpretação:** Não há fronteira de build nem de deploy observada.

### 29. app3/vite.config.js:4-16; app3/package.json:8

**Observação:** `vite build` em modo biblioteca gera o bundle `iife` `my-counter-app`. Não há artefato de deploy.

**Interpretação:** Há uma fronteira de build própria, sem deploy observado.

### 30. README.md:3

**Observação:** "3 independently deployed apps".

**Interpretação:** Afirma o deploy independente das aplicações, sem artefato no snapshot. A afirmação fica sem corroboração.

### 31. README.md:5-8

**Observação:** "`app1` – Vanilla JS component […] `app3` – A React component wrapped in Shadow DOM […] `app-shell` – The main UI that brings it all together".

**Interpretação:** Descreve as unidades e o papel do shell. A afirmação é corroborada.

### 32. README.md:16

**Observação:** "index.html # Standalone entry point for app1".

**Interpretação:** Afirma que a app1 roda sozinha. A afirmação é corroborada.

### 33. README.md:19

**Observação:** "index.html # Standalone entry point for app2".

**Interpretação:** Afirma que a app2 roda sozinha. A afirmação é corroborada.

### 34. README.md:22-23

**Observação:** "my-counter-app.iife.js # Self-contained React bundle".

**Interpretação:** Afirma que o bundle da app3 é autossuficiente. A afirmação é corroborada.

### 35. README.md:35

**Observação:** "Each app […] is dropped into the shell via `<script>` and custom elements, simulating real-world frontend autonomy."

**Interpretação:** Descreve a composição por script e tag. A afirmação é corroborada.

### 36. README.md:88

**Observação:** "Plug-and-play architecture with zero global style bleed".

**Interpretação:** Afirma que nenhum estilo vaza entre as unidades. O CSS do shell atinge a app1 e a app2, e a afirmação é contradita.

### 37. cae0143 2025-08-25 (app3/src/MyCounterLitElement.jsx, app3/package.json); 8841396 2025-06-28 (app3/vite.config.js, app3/index.html, app3/src/main.jsx, app3/src/MyCounterElement.jsx)

**Observação:** A variante Lit é criada no último commit, junto com a mudança no `package.json` da app3. Os arquivos que definem a entrada e o build da app3 não mudam desde o primeiro commit.

**Interpretação:** A variante foi acrescentada e nunca conectada, e não desconectada depois. O ponto está esclarecido.

### 38. 8841396 2025-06-28 (app1/app.js, app2/app.js, app-shell/index.html, app-shell/style.css); 54b84a0 2025-06-28 (README.md)

**Observação:** Os arquivos de estilo e marcação não mudam desde o primeiro commit, e o README teve a última alteração no mesmo dia.

**Interpretação:** A promessa e o código que a contradiz convivem desde o início, e não são estágios diferentes. O ponto está esclarecido.

## Classificação

| # | Origem | Dimensão | Tipo | Abordagem | Evidência | Força | Relações |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.2 (app3/package.json:13) | 1 tecnologia | manifesto | web-components | tecnológica | fraca | — |
| 2 | 3.4.2 (app3/package.json:15) | 1 tecnologia | manifesto | web-components | tecnológica | fraca | declara #18 |
| 3 | 3.4.2 (app3/package.json:15, Evidência); 3.4.3 (app3, Marcadores, Entrada e Build); 3.4.4 (app-shell/index.html:26; app3/src/MyCounterElement.jsx:6, 8, 28; app3/src/MyCounterLitElement.jsx:7, Observação); 3.4.5 #1 (Configuração); 3.4.6 #4 (Artefatos); 3.4.7 #5 (Evidência) | 2 configuração | configuração | web-components | tecnológica | moderada | configura #22; configura #23 |
| 4 | 3.4.4 (app-shell/index.html:26, src-bundle-url) | 3 código | código-fonte | web-components | arquitetural | forte | implementa #23 |
| 5 | 3.4.4 (app1/app.js:1) | 3 código | código-fonte | web-components | tecnológica | moderada | implementa #24 |
| 6 | 3.4.4 (app1/app.js:6) | 3 código | código-fonte | web-components | tecnológica | moderada | implementa #24 |
| 7 | 3.4.4 (app2/app.js:1) | 3 código | código-fonte | web-components | tecnológica | moderada | implementa #25 |
| 8 | 3.4.4 (app2/app.js:6) | 3 código | código-fonte | web-components | tecnológica | moderada | implementa #25 |
| 9 | 3.4.4 (app3/src/MyCounterElement.jsx:6) | 3 código | código-fonte | web-components | tecnológica | moderada | implementa #23 |
| 10 | 3.4.4 (app3/src/MyCounterElement.jsx:8) | 3 código | código-fonte | web-components | tecnológica | moderada | implementa #23 |
| 11 | 3.4.4 (app3/src/MyCounterElement.jsx:28) | 3 código | código-fonte | web-components | tecnológica | moderada | implementa #23 |
| 12 | 3.4.4 (app-shell/index.html:14) | 3 código | código-fonte | web-components | arquitetural | forte | implementa #24 |
| 13 | 3.4.4 (app-shell/index.html:20) | 3 código | código-fonte | web-components | arquitetural | forte | implementa #25 |
| 14 | 3.4.4 (app-shell/index.html:26, src-html-external-script) | 3 código | código-fonte | web-components | arquitetural | forte | implementa #23 |
| 15 | 3.4.4 (app-shell/index.html:15) | 3 código | código-fonte | web-components | arquitetural | forte | implementa #24 |
| 16 | 3.4.4 (app-shell/index.html:21) | 3 código | código-fonte | web-components | arquitetural | forte | implementa #25 |
| 17 | 3.4.4 (app-shell/index.html:27) | 3 código | código-fonte | web-components | arquitetural | forte | implementa #23 |
| 18 | 3.4.4 (app3/src/MyCounterLitElement.jsx:7) | 3 código | código-fonte | web-components | tecnológica | fraca | — |
| 19 | 3.4.3 (app-shell) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 20 | 3.4.3 (app1) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 21 | 3.4.3 (app2) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 22 | 3.4.3 (app3) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 23 | 3.4.5 #1 | 5 composição | código-fonte | web-components | arquitetural | forte | liga #19; liga #22 |
| 24 | 3.4.5 #2 | 5 composição | código-fonte | web-components | arquitetural | forte | liga #19; liga #20 |
| 25 | 3.4.5 #3 | 5 composição | código-fonte | web-components | arquitetural | forte | liga #19; liga #21 |
| 26 | 3.4.6 #1 | 6 build-deploy | documentação | — | arquitetural | fraca | publica #19 |
| 27 | 3.4.6 #2 | 6 build-deploy | documentação | — | arquitetural | fraca | publica #20 |
| 28 | 3.4.6 #3 | 6 build-deploy | documentação | — | arquitetural | fraca | publica #21 |
| 29 | 3.4.6 #4 | 6 build-deploy | configuração | — | arquitetural | moderada | publica #22 |
| 30 | 3.4.7 #1 | 7 documentação | documentação | — | arquitetural | fraca | — |
| 31 | 3.4.7 #2 | 7 documentação | documentação | web-components | arquitetural | fraca | corrobora #19; corrobora #20; corrobora #21; corrobora #22; corrobora #23; corrobora #24; corrobora #25 |
| 32 | 3.4.7 #3 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #20 |
| 33 | 3.4.7 #4 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #21 |
| 34 | 3.4.7 #5 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #29; corrobora #3 |
| 35 | 3.4.7 #6 | 7 documentação | documentação | web-components | arquitetural | fraca | corrobora #23; corrobora #24; corrobora #25 |
| 36 | 3.4.7 #7 | 7 documentação | documentação | — | arquitetural | fraca | contradiz app1/app.js:3; contradiz app-shell/style.css:48-52; contradiz app-shell/index.html:12-16 |
| 37 | 3.4.8 #1 | 8 histórico | histórico | web-components | tecnológica | fraca | explica #1; explica #2; explica #18 |
| 38 | 3.4.8 #2 | 8 histórico | histórico | — | arquitetural | fraca | explica #36 |

## Resumo

Observações: 38. Dimensões (tecnologia: 2, configuração: 1, código: 15, estrutura: 4, composição: 3, build-deploy: 4, documentação: 7, histórico: 2). Força (forte: 10, moderada: 13, fraca: 15, ambígua: 0). Evidência (tecnológica: 12, arquitetural: 26, contexto: 0).
