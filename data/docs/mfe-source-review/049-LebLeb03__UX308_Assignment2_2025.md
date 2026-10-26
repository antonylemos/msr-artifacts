---
schema: 1
id: 956247829
full_name: LebLeb03/UX308_Assignment2_2025
commit: c09cbbe990a83a84c0e22c6b794472cf61fc6bf7
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 049 — LebLeb03/UX308_Assignment2_2025

## Construções da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| src-bundle-url | wp-content/themes/resume-kit/assets/js/bootstrap.js:4973 | . | none | No | A linha é o comentário de cabeçalho `Bootstrap (v5.0.1): index.umd.js` dentro do bundle do Bootstrap distribuído com o tema (wp-content/themes/resume-kit/assets/js/bootstrap.js:4971-4976, seguido de `var index_umd = {` em :4977); é a assinatura do próprio arquivo de biblioteca, não a URL de um bundle de outra unidade. |
| src-custom-element | wp-content/mu-plugins/one-click-child-theme/templates/customElements.js:1 | . | custom-element | No | `class CopyrightYear extends HTMLElement` num arquivo-modelo do plugin One Click Child Theme: o plugin apenas o copia para o tema-filho que gera (wp-content/mu-plugins/one-click-child-theme/one-click-child-theme.php:571-572); nada no snapshot carrega o arquivo em `templates/`. |
| src-custom-element | wp-content/mu-plugins/one-click-child-theme/templates/customElements.js:7 | . | custom-element | No | `customElements.define("x-year", CopyrightYear)` no mesmo arquivo-modelo do plugin; só é copiado na geração do tema-filho (wp-content/mu-plugins/one-click-child-theme/one-click-child-theme.php:572) e não é carregado onde está. |
| src-custom-element | wp-content/themes/chatbot/customElements.js:1 | . | custom-element | No | `class CopyrightYear extends HTMLElement` no tema-filho `chatbot`, enfileirado por wp-content/themes/chatbot/functions.php:13; o elemento só escreve o ano corrente (wp-content/themes/chatbot/customElements.js:2-4) e é interno ao próprio site host, não outra unidade. |
| src-custom-element | wp-content/themes/chatbot/customElements.js:7 | . | custom-element | No | `customElements.define("x-year", CopyrightYear)` do tema-filho `chatbot`; elemento interno do host (utilitário de ano de copyright) e a tag `<x-year>` não aparece em nenhum arquivo do snapshot (`grep -rn "<x-"` sem resultado). |
| src-custom-element | wp-content/themes/resume-kit/assets/js/bootstrap.js:290 | . | none | No | `if (!document.documentElement.attachShadow)` é teste de suporte dentro do utilitário `findShadowRoot` do bundle do Bootstrap (wp-content/themes/resume-kit/assets/js/bootstrap.js:289-300); não empacota unidade alguma como custom element. |
| src-iframe | wp-content/plugins/ecommerce-product-catalog/js/colorbox/jquery.colorbox.js:101 | . | none | No | `document.createElement('iframe')` dentro de `createIframe` do lightbox jQuery Colorbox, biblioteca do plugin de catálogo (wp-content/plugins/ecommerce-product-catalog/js/colorbox/jquery.colorbox.js:100-112); o frame exibe o conteúdo passado ao lightbox, não outra unidade frontend. |
| src-cross-unit-communication | wp-content/plugins/akismet/_inc/akismet-frontend.js:20 | . | none | No | `window.addEventListener( 'testPassive', null, opts )` é detecção de suporte a listeners passivos, imediatamente seguida do `removeEventListener` correspondente (wp-content/plugins/akismet/_inc/akismet-frontend.js:14-22); não há comunicação entre unidades. |
| src-cross-unit-communication | wp-content/themes/pressbook/js/sticky-sidebar.js:612 | . | none | No | `new CustomEvent(eventName, { detail: data })` no helper interno `eventTrigger` da biblioteca sticky-sidebar do tema (wp-content/themes/pressbook/js/sticky-sidebar.js:609-618); o evento é da própria biblioteca, dentro de uma só unidade. |
| src-cross-unit-communication | wp-content/themes/pressbook/js/sticky-sidebar.js:617 | . | none | No | `element.dispatchEvent(event)` que dispara o evento criado em :612, no mesmo helper `eventTrigger` da biblioteca sticky-sidebar; evento interno da biblioteca. |
| src-cross-unit-communication | wp-content/themes/resume-kit/assets/js/bootstrap.js:201 | . | none | No | `element.dispatchEvent(new Event(TRANSITION_END))` em `triggerTransitionEnd` do bundle do Bootstrap (wp-content/themes/resume-kit/assets/js/bootstrap.js:200-202); evento de transição CSS da própria biblioteca. |
| src-cross-unit-communication | wp-content/themes/resume-kit/assets/js/bootstrap.js:671 | . | none | No | `evt = new CustomEvent(event, {` no despachante de eventos interno do Bootstrap (wp-content/themes/resume-kit/assets/js/bootstrap.js:667-674); cria o evento de componente da biblioteca, não um canal entre unidades. |
| src-cross-unit-communication | wp-content/themes/resume-kit/assets/js/bootstrap.js:694 | . | none | No | `element.dispatchEvent(evt)` que dispara o evento montado em :671, no mesmo despachante do Bootstrap (wp-content/themes/resume-kit/assets/js/bootstrap.js:692-695); evento interno da biblioteca. |

## Construções fora da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| manual | wp-content/themes/chatbot/functions.php:14 | . | script-loading | Undetermined | `wp_enqueue_script_module('custom_module1',"https://lebleb03.github.io/Assignment_1_UX308/index.js")` enfileira, como módulo ES, o bundle de outra origem (`Assignment_1_UX308`, outro repositório do mesmo autor, fora do snapshot), dentro de `theme_enqueue_styles` ligada a `wp_enqueue_scripts` em wp-content/themes/chatbot/functions.php:6-7. Fica `Undetermined` porque não dá para confirmar que o tema-filho `chatbot` (wp-content/themes/chatbot/style.css:2-5, filho de `dark-mode`) é o tema ativo: a opção fica no banco, que não está no snapshot. |
| manual | wp-content/themes/chatbot/functions.php:15 | . | script-loading | Undetermined | `wp_enqueue_script_module('custom_module2',"https://rhildred.github.io/chatter/fab.js")` enfileira o bundle `chatter/fab.js` de outra origem e de outro autor, na mesma função `theme_enqueue_styles` (wp-content/themes/chatbot/functions.php:7-16). `Undetermined` pelo mesmo motivo da linha :14: o tema ativo não é observável no snapshot. |
| manual | wp-content/plugins/akismet/views/stats.php:11 | . | embedding | Undetermined | `<iframe id="stats-iframe" src="https://tools.akismet.com/1.0/user-stats.php?blog=…&token=…">` embute na tela de administração a interface de estatísticas detalhadas servida por `tools.akismet.com`, unidade externa fora do snapshot. A cadeia de entrada chega à linha: `admin_menu` → `add_submenu_page(… 'Akismet_Admin', 'display_page')` (wp-content/plugins/akismet/class.akismet-admin.php:66,133) → `display_page` despacha para `display_stats_page` quando `view=stats` (class.akismet-admin.php:1114-1117) → `Akismet::view( 'stats' )` (class.akismet-admin.php:1175-1177) → `include` de `views/stats.php` (wp-content/plugins/akismet/class.akismet.php:1721-1725). `Undetermined` porque não dá para confirmar que o plugin está ativo: a lista de plugins ativos fica no banco, que não está no snapshot. |
| manual | wp-content/plugins/akismet/views/config.php:44 | . | embedding | Undetermined | `<iframe id="stats-iframe" … src="https://tools.akismet.com/1.0/snapshot.php?blog=…&token=…">` embute o gráfico-resumo da mesma interface externa de `tools.akismet.com` no bloco `akismet-new-snapshot__chart` da tela de configuração (wp-content/plugins/akismet/views/config.php:41-45). Mesma cadeia de entrada, pelo ramo `else` de `display_page` → `display_configuration_page` → `Akismet::view( 'config', … )` (wp-content/plugins/akismet/class.akismet-admin.php:1114-1120,1179-1277). `Undetermined` pelo mesmo motivo da linha de `stats.php`: a ativação do plugin não é observável no snapshot. |

## Resumo

Construções com composição: 0.

## Notas

- A mineração não enxerga nenhuma das quatro construções manuais porque `source` cobre só `**/*.{js,jsx,mjs,cjs,ts,tsx,vue,svelte,html,ejs}` (manifest.json, `config.artifactTypes.source`): `wp-content/themes/chatbot/functions.php` entra no `artifacts.csv` sem tipo (artifacts.csv:525) e não é varrido; o mesmo vale para `wp-content/plugins/akismet/views/stats.php` e `.../views/config.php`. Num site WordPress a carga de bundles remotos e o embutimento de interfaces externas passam por PHP (`wp_enqueue_script_module`, `<iframe>` em view), fora do alcance dos padrões `src-*`.
- As quatro linhas manuais apontam para unidades fora do snapshot e para outras origens (`lebleb03.github.io/Assignment_1_UX308`, `rhildred.github.io/chatter`, `tools.akismet.com`), diferentes da unidade citada pela classificação (`Contact_form_UX308`, `<x-subscriberform>`), cuja evidência está no conteúdo de página em `wp-content/database/.ht.sqlite` — removido do snapshot como binário, conforme a revisão estrutural. Por isso a composição descrita na classificação não aparece em nenhuma das tabelas.
- `Undetermined` nas quatro linhas segue a regra de usar `Undetermined` na dúvida entre `Yes` e `Undetermined`: nas duas de `functions.php` o enfileiramento é incondicional, mas a ativação do tema-filho `chatbot` depende de uma opção do banco que não está no snapshot; nas duas do Akismet a cadeia de entrada vai do menu de administração até o `include` da view, mas a ativação do plugin também depende do banco.
- Falso positivo recorrente de `src-cross-unit-communication` e `src-custom-element`: 9 das 13 linhas estão em bibliotecas de terceiros empacotadas com temas e plugins do WordPress (Bootstrap 5.0.1, sticky-sidebar, Colorbox, Akismet), e as outras 4 são o utilitário `x-year`, duas no arquivo-modelo do plugin One Click Child Theme e duas na cópia dele no tema-filho `chatbot`.
- Toda a unidade é um único diretório (`.`, `Undetermined` na revisão estrutural), então todas as linhas recebem `.`.
