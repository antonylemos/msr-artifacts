---
schema: 1
id: 956247829
full_name: LebLeb03/UX308_Assignment2_2025
commit: c09cbbe990a83a84c0e22c6b794472cf61fc6bf7
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

# 049 — LebLeb03/UX308_Assignment2_2025

## Leitura do repositório

Trabalho de disciplina (UX308) feito a partir do template `cd-wordpress`, que se apresenta como "a consumer of microfrontends" e convida a compor "work from autonomous teams" (README.md:13-15). O snapshot tem só o `wp-content/` de um site WordPress (temas, plugins, mu-plugins); o núcleo do WordPress e o build vêm da ferramenta externa `wp-pwa`. A única unidade é o diretório `.`, `Undetermined` na revisão estrutural, e ela é a origem de todas as relações. Nenhum destino está no snapshot.

A composição que a classificação descreve (o formulário `<x-subscriberform>` carregado de `lebleb03.github.io/Contact_form_UX308/`) estava no conteúdo de página gravado em `wp-content/database/.ht.sqlite`, que a normalização removeu como binário. Por isso ela não aparece na revisão de código-fonte e não vira relação aqui.

O que vira relação são as construções manuais da revisão de código-fonte, todas em PHP. O tema-filho `chatbot` ("For intergating chat bot", filho de `dark-mode`; wp-content/themes/chatbot/style.css:2-5) enfileira, como módulos ES, dois bundles de outras origens: o do repositório `Assignment_1_UX308` do mesmo autor e o `chatter/fab.js` de outro autor (wp-content/themes/chatbot/functions.php:14-15). O plugin Akismet embute, por `<iframe>`, a interface de estatísticas de `tools.akismet.com` nas suas telas de administração (wp-content/plugins/akismet/views/stats.php:11; wp-content/plugins/akismet/views/config.php:44). As três relações ficam com Ativa `Undetermined` porque o tema ativo e os plugins ativos são opções do banco, que não está no snapshot.

Não viram relação: o custom element `x-year` (`CopyrightYear`), utilitário de ano de copyright enfileirado pelo próprio tema-filho (wp-content/themes/chatbot/functions.php:13) e definido em wp-content/themes/chatbot/customElements.js:7, interno ao host; a cópia dele no arquivo-modelo do plugin One Click Child Theme; e os eventos e iframes de bibliotecas de terceiros (Bootstrap, sticky-sidebar, Colorbox), todos `No` na revisão de código-fonte.

## Relações

| # | Origem | Destino | Tipo | Direção | Mecanismo | No snapshot | Ativa | Configuração | Código |
|---|---|---|---|---|---|---|---|---|---|
| 1 | . | https://lebleb03.github.io/Assignment_1_UX308/index.js | other | origem → destino | script | No | Undetermined | — | wp-content/themes/chatbot/functions.php:14 |
| 2 | . | https://rhildred.github.io/chatter/fab.js | other | origem → destino | script | No | Undetermined | — | wp-content/themes/chatbot/functions.php:15 |
| 3 | . | tools.akismet.com | page → embedded-frontend | origem → destino | iframe | No | Undetermined | — | wp-content/plugins/akismet/views/stats.php:11; wp-content/plugins/akismet/views/config.php:44 |

## Observações

**1. . → https://lebleb03.github.io/Assignment_1_UX308/index.js.** `theme_enqueue_styles`, ligada a `wp_enqueue_scripts` (wp-content/themes/chatbot/functions.php:6-7), chama `wp_enqueue_script_module('custom_module1', "https://lebleb03.github.io/Assignment_1_UX308/index.js")` (wp-content/themes/chatbot/functions.php:14), que inclui o bundle de outra origem como módulo ES nas páginas do site. O destino é outro repositório do mesmo autor, sem correspondência no snapshot, e fica registrado pela URL. Tipo `other`: o host só carrega o bundle por script; não usa tag definida por ele, não o monta por API global e não importa módulos expostos, então nenhum dos tipos específicos se aplica, e o que o bundle faz na página não é observável. Ativa `Undetermined` porque a única linha de código é `Undetermined`: não se sabe se `chatbot` é o tema ativo.

**2. . → https://rhildred.github.io/chatter/fab.js.** Mesma função e mesmo mecanismo da relação 1: `wp_enqueue_script_module('custom_module2', "https://rhildred.github.io/chatter/fab.js")` (wp-content/themes/chatbot/functions.php:15). O destino é de outro autor e de outra origem, registrado pela URL. O nome do tema-filho ("For intergating chat bot"; wp-content/themes/chatbot/style.css:3) sugere que esse bundle é o chatbot, mas a forma como ele entra na página não é observável; daí o tipo `other`, como na relação 1. Ativa `Undetermined` pelo mesmo motivo.

**3. . → tools.akismet.com.** As duas telas de administração do Akismet embutem páginas de `tools.akismet.com/1.0/`: `user-stats.php` na tela de estatísticas (wp-content/plugins/akismet/views/stats.php:11) e `snapshot.php` no gráfico-resumo da tela de configuração (wp-content/plugins/akismet/views/config.php:44). As duas URLs são do mesmo serviço externo, por isso entram numa só relação, com o destino escrito pelo host que aparece nos dois artefatos. As duas views são alcançadas por `display_page` (wp-content/plugins/akismet/class.akismet-admin.php:1113-1120), que vem do menu de opções registrado pelo plugin (wp-content/plugins/akismet/class.akismet-admin.php:131-135). O destino é um serviço de terceiros, não do autor, e a relação está na área administrativa, não nas páginas públicas do site. Ativa `Undetermined` porque a ativação do plugin fica no banco.

## Resumo

Relações: 3 (other: 2, page → embedded-frontend: 1). Ativas: 0. Destino fora do snapshot: 3.
Unidades sem relação: nenhuma.
