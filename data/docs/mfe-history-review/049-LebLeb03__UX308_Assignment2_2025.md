---
schema: 1
id: 956247829
full_name: LebLeb03/UX308_Assignment2_2025
commit: c09cbbe990a83a84c0e22c6b794472cf61fc6bf7
inputs:
  clone: data/samples/mfe-sample-001/repos/LebLeb03__UX308_Assignment2_2025
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 049 — LebLeb03/UX308_Assignment2_2025

## Leitura do repositório

O histórico até o snapshot tem 14 commits, de 2025-03-27 a 2025-04-03, sem merges. O primeiro, `d7866b4` (2025-03-27, "Initial commit"), já traz o site do template: `README.md`, `package.json`, `.gitignore`, o workflow `.github/workflows/main.yml`, o banco `wp-content/database/.ht.sqlite` e os temas e plugins de terceiros, entre eles o Akismet com as views citadas pelas revisões anteriores. Esses artefatos têm só primeira presença observável: o primeiro commit não diz de onde vieram. `README.md`, `.gitignore` e as views do Akismet não mudam depois dele.

O que o autor acrescenta começa no segundo commit, `57dac07` (2025-03-28, "added this"), que cria o tema-filho `chatbot` (`style.css`, `functions.php`, `customElements.js`) e altera o banco. Daí até `436e204` (2025-03-29, "added fab back"), sete commits alteram `wp-content/themes/chatbot/functions.php`; as mensagens anunciam trocas de "Order.js" por "Index" e testes com um "Fab". Os quatro últimos commits, de 2025-04-03 ("added contact", "added everything", "added Contact", "Just finishing up"), só alteram o banco.

O clone tem localmente o conteúdo das versões do snapshot, mas não o da maioria das versões antigas: das oito versões de `functions.php`, só a de `52bc0e2` está disponível, e ela é idêntica à do snapshot (mesmo objeto `718279d`). O banco, removido do snapshot normalizado como binário, está na árvore do commit do snapshot e pôde ser lido.

## Pontos

| # | Ponto | Origem | Pergunta | Commits | Resultado |
|---|---|---|---|---|---|
| 1 | O host `.` não tem entrada de aplicação no snapshot; o núcleo do WordPress vem da ferramenta externa `wp-pwa` | 3.4.3 (. `Undetermined`) | ativo ou abandonado | d7866b4 2025-03-27 Initial commit | resolvido pelo snapshot |
| 2 | Não se sabe se o tema-filho `chatbot`, que enfileira os dois bundles remotos, é o tema ativo | 3.4.4 (wp-content/themes/chatbot/functions.php:14, :15); 3.4.5 #1, #2; 3.4.7 #4 | ativo ou abandonado | 57dac07 2025-03-28 added this; 52bc0e2 2025-03-28 index not Index; 436e204 2025-03-29 added fab back; c09cbbe 2025-04-03 Just finishing up | esclarecido |
| 3 | Não se sabe se o plugin Akismet, cujas views embutem `tools.akismet.com` por iframe, está ativo | 3.4.4 (wp-content/plugins/akismet/views/stats.php:11; wp-content/plugins/akismet/views/config.php:44); 3.4.5 #3 | ativo ou abandonado | d7866b4 2025-03-27 Initial commit; c09cbbe 2025-04-03 Just finishing up | esclarecido |

## Observações

**1. O host `.` não tem entrada de aplicação no snapshot.** O próprio snapshot explica a ausência: os scripts do `package.json` são todos chamadas a `wp-pwa` (package.json:6-9), e o `.gitignore` ignora `dist` e `.wordpress` (.gitignore:3,5), onde ficam o site gerado e o WordPress montado pela ferramenta. O histórico confere: o `.gitignore` vem do primeiro commit e não muda, e, depois do primeiro commit, o único caminho fora de `wp-content/` alterado até o snapshot é o `package.json`, em `57dac07`; nenhum caminho com `.wordpress` ou `dist` aparece no histórico. A entrada nunca foi versionada, e não foi apagada. O ponto não muda a revisão estrutural: a unidade continua sem entrada observável no repositório.

**2. Não se sabe se o tema-filho `chatbot` é o tema ativo.** O tema não vem do template: é criado pelo autor em `57dac07` e o `functions.php` é alterado em sete commits seguintes. A versão do snapshot é a mesma de `52bc0e2` (objeto `718279d`), última alteração em `436e204`, cuja mensagem anuncia a volta do "fab"; as versões de `eb29f11` e `6724d46` estão ausentes do clone, então o que mudou nelas não pode ser lido. No banco versionado no commit do snapshot (`wp-content/database/.ht.sqlite`, lido por `show` e consultado numa cópia fora de `data/`, só para leitura), a tabela `wp_options` tem `stylesheet` = `chatbot`, `template` = `dark-mode` e `current_theme` = `chatbot`. Delimitado a esse banco, o `chatbot` é o tema ativo no snapshot, e o `functions.php` que enfileira os dois bundles remotos (wp-content/themes/chatbot/functions.php:14-15) é o do tema ativo. O banco não mostra se o site publicado pelo workflow foi gerado a partir dele, porque a ferramenta `wp-pwa` está fora do repositório, e não mostra o que os bundles fazem na página. As revisões anteriores ficam como estão.

**3. Não se sabe se o plugin Akismet está ativo.** As views do Akismet estão no primeiro commit, junto com os outros plugins do template, e nenhum commit até o snapshot as altera. No mesmo banco do commit do snapshot, `active_plugins` lista um único plugin, `ecommerce-product-catalog/ecommerce-product-catalog.php`; o Akismet não está entre os ativos. Delimitado a esse banco, as telas de administração com os iframes para `tools.akismet.com` (wp-content/plugins/akismet/views/stats.php:11; wp-content/plugins/akismet/views/config.php:44) não são alcançadas no snapshot: o plugin é cópia herdada do template, presente mas desativado. O banco não diz se ele chegou a ser ativado antes.

## Comandos

```
docs/mfe-history-review/tools/hist.sh LebLeb03__UX308_Assignment2_2025 rev-list --count c09cbbe990a83a84c0e22c6b794472cf61fc6bf7
docs/mfe-history-review/tools/hist.sh LebLeb03__UX308_Assignment2_2025 rev-list --count --merges c09cbbe990a83a84c0e22c6b794472cf61fc6bf7
docs/mfe-history-review/tools/hist.sh LebLeb03__UX308_Assignment2_2025 log --reverse --format='%h %ad %s' --date=short c09cbbe990a83a84c0e22c6b794472cf61fc6bf7
docs/mfe-history-review/tools/hist.sh LebLeb03__UX308_Assignment2_2025 log --format='== %h %ad %s' --date=short --name-status --no-renames c09cbbe990a83a84c0e22c6b794472cf61fc6bf7 -- wp-content/themes/chatbot wp-content/plugins/akismet/views wp-content/database
docs/mfe-history-review/tools/hist.sh LebLeb03__UX308_Assignment2_2025 log --format='== %h %ad %s' --date=short --name-status --no-renames c09cbbe990a83a84c0e22c6b794472cf61fc6bf7
docs/mfe-history-review/tools/hist.sh LebLeb03__UX308_Assignment2_2025 ls-tree 57dac07 -- wp-content/themes/chatbot/functions.php
docs/mfe-history-review/tools/hist.sh LebLeb03__UX308_Assignment2_2025 cat-file -e a2c795a2eca982741227232976f28136b109a696   # ausente
docs/mfe-history-review/tools/hist.sh LebLeb03__UX308_Assignment2_2025 ls-tree 2f649dd -- wp-content/themes/chatbot/functions.php
docs/mfe-history-review/tools/hist.sh LebLeb03__UX308_Assignment2_2025 cat-file -e dc27618f98752aa71bbf79e293566142b24e4d41   # ausente
docs/mfe-history-review/tools/hist.sh LebLeb03__UX308_Assignment2_2025 ls-tree 8fdf63f -- wp-content/themes/chatbot/functions.php
docs/mfe-history-review/tools/hist.sh LebLeb03__UX308_Assignment2_2025 cat-file -e 55403e8a5980a3902658cb742e893e98057ccc7e   # ausente
docs/mfe-history-review/tools/hist.sh LebLeb03__UX308_Assignment2_2025 ls-tree 29f42e0 -- wp-content/themes/chatbot/functions.php
docs/mfe-history-review/tools/hist.sh LebLeb03__UX308_Assignment2_2025 cat-file -e ef49b23315b1dc7cfd54037a9b32854cd867164f   # ausente
docs/mfe-history-review/tools/hist.sh LebLeb03__UX308_Assignment2_2025 ls-tree 52bc0e2 -- wp-content/themes/chatbot/functions.php
docs/mfe-history-review/tools/hist.sh LebLeb03__UX308_Assignment2_2025 cat-file -e 718279dbce7f825168857f8ffaa8f32c004760d1   # disponível
docs/mfe-history-review/tools/hist.sh LebLeb03__UX308_Assignment2_2025 ls-tree eb29f11 -- wp-content/themes/chatbot/functions.php
docs/mfe-history-review/tools/hist.sh LebLeb03__UX308_Assignment2_2025 cat-file -e d925b4fd88ff16bf58b4a2e54eab5455f6542e48   # ausente
docs/mfe-history-review/tools/hist.sh LebLeb03__UX308_Assignment2_2025 ls-tree 6724d46 -- wp-content/themes/chatbot/functions.php
docs/mfe-history-review/tools/hist.sh LebLeb03__UX308_Assignment2_2025 cat-file -e 27ef0863f9a70068ae8f2a5b6ada50dfb7370cae   # ausente
docs/mfe-history-review/tools/hist.sh LebLeb03__UX308_Assignment2_2025 ls-tree 436e204 -- wp-content/themes/chatbot/functions.php
docs/mfe-history-review/tools/hist.sh LebLeb03__UX308_Assignment2_2025 ls-tree c09cbbe990a83a84c0e22c6b794472cf61fc6bf7 -- wp-content/database/.ht.sqlite
docs/mfe-history-review/tools/hist.sh LebLeb03__UX308_Assignment2_2025 show c09cbbe990a83a84c0e22c6b794472cf61fc6bf7:wp-content/database/.ht.sqlite
docs/mfe-history-review/tools/hist.sh LebLeb03__UX308_Assignment2_2025 ls-tree c09cbbe990a83a84c0e22c6b794472cf61fc6bf7
docs/mfe-history-review/tools/hist.sh LebLeb03__UX308_Assignment2_2025 ls-tree c09cbbe990a83a84c0e22c6b794472cf61fc6bf7 -- wp-content/themes/ wp-content/plugins/
docs/mfe-history-review/tools/hist.sh LebLeb03__UX308_Assignment2_2025 ls-tree c09cbbe990a83a84c0e22c6b794472cf61fc6bf7 -- wp-content/themes/chatbot/functions.php
```

## Resumo

Commits até o snapshot: 14 (2025-03-27 a 2025-04-03). Pontos: 3 (esclarecido: 2, inconclusivo: 0, resolvido pelo snapshot: 1).
