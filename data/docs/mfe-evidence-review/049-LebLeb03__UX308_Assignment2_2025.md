---
schema: 1
id: 956247829
full_name: LebLeb03/UX308_Assignment2_2025
commit: c09cbbe990a83a84c0e22c6b794472cf61fc6bf7
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

# 049 — LebLeb03/UX308_Assignment2_2025

## Leitura do repositório

O snapshot é o `wp-content/` de um site WordPress feito a partir do template `cd-wordpress`. O núcleo do WordPress, o build e o servidor de desenvolvimento vêm da ferramenta externa `wp-pwa`. Não há dependência de tecnologia de MFE, e nenhum arquivo de configuração citado pelas revisões declara elemento da composição: o `package.json` só chama `wp-pwa`, e o workflow só publica. Por isso as dimensões 1 e 2 ficam vazias.

A única unidade é a raiz `.` (#18). Ela fica ambígua porque nenhuma entrada de aplicação está no snapshot. O histórico explica a ausência: a entrada nunca foi versionada e é montada pela ferramenta (#29). A unidade tem build e deploy próprios, num único artefato publicado no GitHub Pages (#22). Duas afirmações confirmam essa publicação (#23, #24).

A cadeia de composição que existe está em PHP, e não em JavaScript nem em configuração:
- **Código:** o tema-filho `chatbot` enfileira, como módulos ES, dois bundles de outras origens (#14, #15). As views do Akismet embutem, por iframe, telas de `tools.akismet.com` (#16, #17).
- **Relações:** daí saem três relações com destino fora do snapshot (#19, #20, #21), todas ambíguas, porque o tema ativo e os plugins ativos ficam no banco.
- **Histórico:** o banco versionado no commit do snapshot desfaz em parte essa dúvida. O `chatbot` é o tema ativo (#30), então os dois bundles são carregados pelo tema em uso. O Akismet está desativado (#31), então os iframes não são alcançados. As forças continuam as da 3.4, mas a leitura que sobra é que #19 e #20 são cargas reais de bundles externos, sem que o snapshot mostre o que eles fazem na página, e que #21 é uma tela administrativa de terceiros sem uso.

Há sinais que enganam. Nove linhas da mineração são eventos, iframes e testes de suporte de bibliotecas de terceiros (Bootstrap, sticky-sidebar, Colorbox, Akismet) (#1, #6-#13). Quatro são o custom element `x-year`, um utilitário de ano de copyright: duas no arquivo-modelo de um plugin (#2, #3) e duas no tema-filho (#4, #5). Nenhum deles liga unidades.

A documentação é o README do template, sem adaptação. Ele anuncia "a consumer of microfrontends" (#26), e os enfileiramentos dos bundles externos (#14, #15) confirmam essa ideia só em parte. O exemplo de PayPal (#27) e as "autonomous teams" (#28) ficam sem corroboração.

A composição que a classificação descreve (o formulário `<x-subscriberform>` de `lebleb03.github.io/Contact_form_UX308/`) estava no conteúdo de página do banco `wp-content/database/.ht.sqlite`. A normalização removeu esse banco do snapshot como binário. Nenhuma linha da 3.4 trata dele, e por isso ele não vira observação aqui.

## Observações

### 1. wp-content/themes/resume-kit/assets/js/bootstrap.js:4973

**Observação:** O comentário de cabeçalho `Bootstrap (v5.0.1): index.umd.js`, dentro do bundle do Bootstrap distribuído com o tema `resume-kit`.

**Interpretação:** É a assinatura de um arquivo de biblioteca, não a URL do bundle de outra unidade.

### 2. wp-content/mu-plugins/one-click-child-theme/templates/customElements.js:1; wp-content/mu-plugins/one-click-child-theme/one-click-child-theme.php:571-572

**Observação:** `class CopyrightYear extends HTMLElement`, num arquivo-modelo do plugin One Click Child Theme. O plugin só o copia para o tema-filho que gera (wp-content/mu-plugins/one-click-child-theme/one-click-child-theme.php:571-572).

**Interpretação:** É um custom element utilitário que não é carregado onde está e não participa da composição.

### 3. wp-content/mu-plugins/one-click-child-theme/templates/customElements.js:7

**Observação:** `customElements.define("x-year", CopyrightYear)`, no mesmo arquivo-modelo.

**Interpretação:** Registra o utilitário só no tema-filho gerado. Não é unidade nem mecanismo de composição.

### 4. wp-content/themes/chatbot/customElements.js:1; wp-content/themes/chatbot/customElements.js:2-4; wp-content/themes/chatbot/functions.php:13

**Observação:** `class CopyrightYear extends HTMLElement`, no tema-filho `chatbot`, que enfileira o arquivo. O elemento só escreve o ano corrente (wp-content/themes/chatbot/customElements.js:2-4).

**Interpretação:** É um custom element interno ao host, sem ligação a outra unidade.

### 5. wp-content/themes/chatbot/customElements.js:7

**Observação:** `customElements.define("x-year", CopyrightYear)`. A tag `<x-year>` não aparece em nenhum arquivo do snapshot.

**Interpretação:** O utilitário é registrado no host e não compõe outra unidade.

### 6. wp-content/themes/resume-kit/assets/js/bootstrap.js:290

**Observação:** `if (!document.documentElement.attachShadow)`, no utilitário `findShadowRoot` do bundle do Bootstrap.

**Interpretação:** É um teste de suporte da biblioteca, não um custom element de unidade.

### 7. wp-content/plugins/ecommerce-product-catalog/js/colorbox/jquery.colorbox.js:101

**Observação:** `document.createElement('iframe')`, em `createIframe` do lightbox jQuery Colorbox do plugin de catálogo.

**Interpretação:** O frame mostra o conteúdo passado ao lightbox, e não outra unidade frontend.

### 8. wp-content/plugins/akismet/_inc/akismet-frontend.js:20

**Observação:** `window.addEventListener( 'testPassive', null, opts )`, seguido do `removeEventListener` correspondente (wp-content/plugins/akismet/_inc/akismet-frontend.js:14-22).

**Interpretação:** É a detecção de suporte a listeners passivos, sem comunicação entre unidades.

### 9. wp-content/themes/pressbook/js/sticky-sidebar.js:612

**Observação:** `new CustomEvent(eventName, { detail: data })`, no helper interno `eventTrigger` da biblioteca sticky-sidebar do tema.

**Interpretação:** É um evento da própria biblioteca, dentro de uma só unidade.

### 10. wp-content/themes/pressbook/js/sticky-sidebar.js:617

**Observação:** `element.dispatchEvent(event)`, que dispara o evento criado na linha 612.

**Interpretação:** É um evento interno da biblioteca.

### 11. wp-content/themes/resume-kit/assets/js/bootstrap.js:201

**Observação:** `element.dispatchEvent(new Event(TRANSITION_END))`, em `triggerTransitionEnd` do Bootstrap.

**Interpretação:** É o evento de transição CSS da própria biblioteca.

### 12. wp-content/themes/resume-kit/assets/js/bootstrap.js:671

**Observação:** `evt = new CustomEvent(event, {`, no despachante de eventos interno do Bootstrap.

**Interpretação:** Cria o evento de um componente da biblioteca, não um canal entre unidades.

### 13. wp-content/themes/resume-kit/assets/js/bootstrap.js:694

**Observação:** `element.dispatchEvent(evt)`, que dispara o evento montado na linha 671.

**Interpretação:** É um evento interno da biblioteca.

### 14. wp-content/themes/chatbot/functions.php:14; wp-content/themes/chatbot/functions.php:6-7

**Observação:** `wp_enqueue_script_module('custom_module1',"https://lebleb03.github.io/Assignment_1_UX308/index.js")`, dentro de `theme_enqueue_styles`, ligada a `wp_enqueue_scripts`. O destino é outro repositório do mesmo autor, fora do snapshot. O tema-filho `chatbot` não é confirmado como tema ativo no snapshot.

**Interpretação:** Continuam plausíveis duas leituras: o host carrega nas suas páginas o bundle de outra unidade, ou o tema não está em uso e a carga não acontece.

### 15. wp-content/themes/chatbot/functions.php:15; wp-content/themes/chatbot/functions.php:7-16

**Observação:** `wp_enqueue_script_module('custom_module2',"https://rhildred.github.io/chatter/fab.js")`, na mesma função. O destino é de outro autor e de outra origem, fora do snapshot.

**Interpretação:** As mesmas duas leituras de #14: carga de um bundle externo pelo host ou carga que não acontece porque o tema não está ativo.

### 16. wp-content/plugins/akismet/views/stats.php:11; wp-content/plugins/akismet/class.akismet-admin.php:1114-1117; wp-content/plugins/akismet/class.akismet.php:1721-1725

**Observação:** `<iframe id="stats-iframe" src="https://tools.akismet.com/1.0/user-stats.php?…">`, na tela de estatísticas do Akismet. A cadeia vai do menu de administração até o `include` da view, mas a ativação do plugin não está no snapshot.

**Interpretação:** Continuam plausíveis duas leituras: o painel administrativo embute uma interface externa de terceiros, ou o plugin está inativo e a tela não é alcançada.

### 17. wp-content/plugins/akismet/views/config.php:44; wp-content/plugins/akismet/class.akismet-admin.php:1114-1120

**Observação:** `<iframe id="stats-iframe" … src="https://tools.akismet.com/1.0/snapshot.php?…">`, no gráfico-resumo da tela de configuração do Akismet, alcançado pelo ramo `else` de `display_page`.

**Interpretação:** As mesmas duas leituras de #16.

### 18. .; package.json:1-11; package.json:9; .github/workflows/main.yml:29-30

**Observação:** A raiz tem um `package.json` só com `wp-pwa` em `devDependencies`, um script `build` que chama `wp-pwa build UX308_Assignment2_2025` e um workflow que publica o resultado no `gh-pages`. Nenhuma entrada de aplicação está no snapshot, só o `wp-content/` de um site WordPress.

**Interpretação:** Continuam plausíveis duas leituras: a raiz é a unidade frontend do host (o site WordPress que a ferramenta monta e exporta), ou é só conteúdo e configuração para uma ferramenta externa, sem aplicação própria observável.

### 19. wp-content/themes/chatbot/functions.php:14

**Observação:** A raiz carrega, por script de módulo, `https://lebleb03.github.io/Assignment_1_UX308/index.js`. O destino não está no snapshot. A relação tem Ativa `Undetermined`.

**Interpretação:** É uma relação por script com destino externo. Continuam plausíveis duas leituras: a composição de uma unidade de outra origem nas páginas do host, ou uma carga que não acontece porque o tema não está ativo.

### 20. wp-content/themes/chatbot/functions.php:15

**Observação:** A raiz carrega, por script de módulo, `https://rhildred.github.io/chatter/fab.js`, de outro autor. O destino não está no snapshot. A relação tem Ativa `Undetermined`.

**Interpretação:** As mesmas duas leituras de #19, com destino de terceiros.

### 21. wp-content/plugins/akismet/views/stats.php:11; wp-content/plugins/akismet/views/config.php:44; wp-content/plugins/akismet/class.akismet-admin.php:1113-1120

**Observação:** As telas de administração do Akismet embutem, por iframe, páginas de `tools.akismet.com/1.0/`. O destino é um serviço de terceiros fora do snapshot. A relação tem Ativa `Undetermined`.

**Interpretação:** É uma relação page → embedded-frontend com destino externo. Continuam plausíveis duas leituras: o painel administrativo compõe uma interface de terceiros, ou o plugin está inativo e a relação não existe.

### 22. package.json:9; .github/workflows/main.yml:6-14; .github/workflows/main.yml:29-32

**Observação:** O script `build` gera o site estático do repositório. O workflow `CI`, disparado na `main`, roda o build e publica o resultado no `gh-pages` pela action `diy-pwa/npm-build-2-gh-pages@v1.11`. Não há versão no `package.json`.

**Interpretação:** O site tem fronteira de build e de deploy própria, num único artefato. Os destinos externos de #19, #20 e #21 não entram nele.

### 23. .github/workflows/main.yml:29

**Observação:** "run npm install, npm run build and publish to gh-pages".

**Interpretação:** Descreve o passo de build e publicação que o próprio workflow executa. A afirmação é corroborada.

### 24. README.md:11

**Observação:** "This will continuously deploy on gh-pages using the diy-pwa/npm-build-2-gh-pages@v1.11 plugin."

**Interpretação:** Descreve a publicação contínua do site no GitHub Pages. A afirmação é corroborada.

### 25. README.md:11

**Observação:** "You can also deploy on a cloud provider by running `npm run build`. Your static site will be in the `dist/` folder."

**Interpretação:** Descreve uma forma de deploy sem artefato no snapshot, e o `dist/` é ignorado pelo git. A afirmação fica sem corroboração.

### 26. README.md:13

**Observação:** "The idea of this is as a consumer of microfrontends."

**Interpretação:** Afirma que o site é um host que consome microfrontends. Os enfileiramentos de bundles externos no tema-filho (#14, #15) confirmam a ideia só em parte: nenhum artefato os chama de microfrontend, e o snapshot não confirma que eles estão ativos.

### 27. README.md:13

**Observação:** "There is an example microfrontend for paypal standard here.", com link para o repositório `diy-pwa/paypal-microfrontend`.

**Interpretação:** Aponta para um exemplo externo, herdado do template. Nenhum artefato do snapshot o usa nem o desmente. A afirmação fica sem corroboração.

### 28. README.md:15

**Observação:** "Have fun composing work from autonomous teams."

**Interpretação:** Afirma a composição de trabalho de equipes autônomas. Nenhum artefato mostra equipes distintas ou a evolução própria dos destinos externos. A afirmação fica sem corroboração.

### 29. d7866b4 2025-03-27 (README.md, package.json, .gitignore, .github/workflows/main.yml)

**Observação:** Os artefatos da raiz vêm do primeiro commit. O `.gitignore` ignora `dist` e `.wordpress` desde então, e nenhum caminho com esses nomes aparece no histórico. Depois do primeiro commit, o único caminho fora de `wp-content/` alterado é o `package.json`, em `57dac07`.

**Interpretação:** A entrada da aplicação nunca foi versionada: ela é montada pela ferramenta externa. O ponto é resolvido pelo snapshot.

### 30. 57dac07 2025-03-28 (wp-content/themes/chatbot); 52bc0e2 2025-03-28 (wp-content/themes/chatbot/functions.php); 436e204 2025-03-29 (wp-content/themes/chatbot/functions.php); c09cbbe 2025-04-03 (wp-content/database/.ht.sqlite)

**Observação:** O tema-filho `chatbot` é criado pelo autor em `57dac07`, e o `functions.php` muda em sete commits seguintes. A versão do snapshot é a mesma de `52bc0e2`. No banco do commit do snapshot, `wp_options` tem `stylesheet` = `chatbot`, `template` = `dark-mode` e `current_theme` = `chatbot`.

**Interpretação:** Delimitado a esse banco, o `chatbot` é o tema ativo e enfileira os dois bundles externos. O banco não mostra o que os bundles fazem na página nem se o site publicado foi gerado a partir dele. O ponto está esclarecido.

### 31. d7866b4 2025-03-27 (wp-content/plugins/akismet/views); c09cbbe 2025-04-03 (wp-content/database/.ht.sqlite)

**Observação:** As views do Akismet vêm do primeiro commit e não mudam até o snapshot. No banco do commit do snapshot, `active_plugins` lista só `ecommerce-product-catalog/ecommerce-product-catalog.php`.

**Interpretação:** Delimitado a esse banco, o Akismet está desativado, e as telas com os iframes para `tools.akismet.com` não são alcançadas. O plugin é cópia herdada do template. O ponto está esclarecido.

## Classificação

| # | Origem | Dimensão | Tipo | Abordagem | Evidência | Força | Relações |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.4 (wp-content/themes/resume-kit/assets/js/bootstrap.js:4973) | 3 código | código-fonte | — | contexto | fraca | — |
| 2 | 3.4.4 (wp-content/mu-plugins/one-click-child-theme/templates/customElements.js:1) | 3 código | código-fonte | web-components | tecnológica | fraca | — |
| 3 | 3.4.4 (wp-content/mu-plugins/one-click-child-theme/templates/customElements.js:7) | 3 código | código-fonte | web-components | tecnológica | fraca | — |
| 4 | 3.4.4 (wp-content/themes/chatbot/customElements.js:1) | 3 código | código-fonte | web-components | tecnológica | fraca | — |
| 5 | 3.4.4 (wp-content/themes/chatbot/customElements.js:7) | 3 código | código-fonte | web-components | tecnológica | fraca | — |
| 6 | 3.4.4 (wp-content/themes/resume-kit/assets/js/bootstrap.js:290) | 3 código | código-fonte | — | contexto | fraca | — |
| 7 | 3.4.4 (wp-content/plugins/ecommerce-product-catalog/js/colorbox/jquery.colorbox.js:101) | 3 código | código-fonte | — | contexto | fraca | — |
| 8 | 3.4.4 (wp-content/plugins/akismet/_inc/akismet-frontend.js:20) | 3 código | código-fonte | — | contexto | fraca | — |
| 9 | 3.4.4 (wp-content/themes/pressbook/js/sticky-sidebar.js:612) | 3 código | código-fonte | — | contexto | fraca | — |
| 10 | 3.4.4 (wp-content/themes/pressbook/js/sticky-sidebar.js:617) | 3 código | código-fonte | — | contexto | fraca | — |
| 11 | 3.4.4 (wp-content/themes/resume-kit/assets/js/bootstrap.js:201) | 3 código | código-fonte | — | contexto | fraca | — |
| 12 | 3.4.4 (wp-content/themes/resume-kit/assets/js/bootstrap.js:671) | 3 código | código-fonte | — | contexto | fraca | — |
| 13 | 3.4.4 (wp-content/themes/resume-kit/assets/js/bootstrap.js:694) | 3 código | código-fonte | — | contexto | fraca | — |
| 14 | 3.4.4 (wp-content/themes/chatbot/functions.php:14) | 3 código | código-fonte | script | arquitetural | ambígua | implementa #19 |
| 15 | 3.4.4 (wp-content/themes/chatbot/functions.php:15) | 3 código | código-fonte | script | arquitetural | ambígua | implementa #20 |
| 16 | 3.4.4 (wp-content/plugins/akismet/views/stats.php:11) | 3 código | código-fonte | iframe | arquitetural | ambígua | implementa #21 |
| 17 | 3.4.4 (wp-content/plugins/akismet/views/config.php:44) | 3 código | código-fonte | iframe | arquitetural | ambígua | implementa #21 |
| 18 | 3.4.3 (.) | 4 estrutura | diretório | — | arquitetural | ambígua | — |
| 19 | 3.4.5 #1 | 5 composição | código-fonte | script | arquitetural | ambígua | liga #18 |
| 20 | 3.4.5 #2 | 5 composição | código-fonte | script | arquitetural | ambígua | liga #18 |
| 21 | 3.4.5 #3 | 5 composição | código-fonte | iframe | arquitetural | ambígua | liga #18 |
| 22 | 3.4.6 #1 | 6 build-deploy | CI | — | arquitetural | moderada | publica #18 |
| 23 | 3.4.7 #1 | 7 documentação | comentário | — | arquitetural | fraca | corrobora #22 |
| 24 | 3.4.7 #2 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #22 |
| 25 | 3.4.7 #3 | 7 documentação | documentação | — | arquitetural | fraca | — |
| 26 | 3.4.7 #4 | 7 documentação | documentação | — | arquitetural | fraca | corrobora em parte #14; corrobora em parte #15 |
| 27 | 3.4.7 #5 | 7 documentação | documentação | — | contexto | fraca | — |
| 28 | 3.4.7 #6 | 7 documentação | documentação | — | arquitetural | fraca | — |
| 29 | 3.4.8 #1 | 8 histórico | histórico | — | arquitetural | fraca | explica #18 |
| 30 | 3.4.8 #2 | 8 histórico | histórico | script | arquitetural | fraca | explica #14; explica #15; explica #19; explica #20; explica #26 |
| 31 | 3.4.8 #3 | 8 histórico | histórico | iframe | arquitetural | fraca | explica #16; explica #17; explica #21 |

## Resumo

Observações: 31. Dimensões (tecnologia: 0, configuração: 0, código: 17, estrutura: 1, composição: 3, build-deploy: 1, documentação: 6, histórico: 3). Força (forte: 0, moderada: 1, fraca: 22, ambígua: 8). Evidência (tecnológica: 4, arquitetural: 17, contexto: 10).
