---
schema: 1
id: 1009887363
full_name: dhiman1987/micro-frontend-demo
commit: cae01436907388ad75de4a33cfc2c7a5ae256406
inputs:
  clone: data/samples/mfe-sample-001/repos/dhiman1987__micro-frontend-demo
annotation:
  method: manual
  status: final
  date: 2026-10-21
---

# 043 — dhiman1987/micro-frontend-demo

## Leitura do repositório

O histórico até o snapshot tem 3 commits, sem merges. O shell, as três aplicações e o README já aparecem no primeiro commit observado, `8841396` (2025-06-28, "Initial commit"). O segundo, `54b84a0` (2025-06-28, "Updated readme"), altera só o README. O último, `cae0143` (2025-08-25, "remaining changes"), altera o `package.json` e o lockfile da `app3` e cria `app3/src/MyCounterLitElement.jsx`. Os demais arquivos das aplicações e do shell não mudam desde o primeiro commit.

## Pontos

| # | Ponto | Origem | Pergunta | Commits | Resultado |
|---|---|---|---|---|---|
| 1 | `lit` e `@lit/react` estão declaradas, e a variante Lit do contador não tem ponto de entrada | 3.4.2 (app3/package.json:13, 15); 3.4.4 (app3/src/MyCounterLitElement.jsx:7) | uso de dependência | cae0143 2025-08-25 remaining changes; 8841396 2025-06-28 Initial commit | esclarecido |
| 2 | O README promete "zero global style bleed", e o CSS do shell atinge a app1 e a app2 | 3.4.7 #7 | estágios em conflito | 8841396 2025-06-28 Initial commit; 54b84a0 2025-06-28 Updated readme | esclarecido |

## Observações

**1. `lit` e `@lit/react` estão declaradas, e a variante Lit do contador não tem ponto de entrada.** `MyCounterLitElement.jsx` é criado no último commit, `cae0143`, junto com a mudança no `package.json` da `app3`. A versão anterior do `package.json` não está disponível, e não dá para confirmar se as dependências Lit entraram nesse mesmo commit. Já os arquivos que definem a entrada e o build da `app3` (`vite.config.js`, `index.html`, `src/main.jsx` e `src/MyCounterElement.jsx`) não mudam desde o primeiro commit, e a variante Lit não existia antes de `cae0143`. Em nenhuma versão do histórico ela esteve ligada a um ponto de entrada. Foi acrescentada e não conectada, e não desconectada depois.

**2. O README promete "zero global style bleed", e o CSS do shell atinge a app1 e a app2.** `app1/app.js`, `app2/app.js`, `app-shell/index.html` e `app-shell/style.css` não mudam desde o primeiro commit. O README teve a última alteração em `54b84a0`, no mesmo dia. A promessa e o código que a contradiz convivem desde 2025-06-28: não são estágios diferentes.

## Comandos

```
docs/mfe-history-review/tools/hist.sh dhiman1987__micro-frontend-demo rev-list --count cae01436907388ad75de4a33cfc2c7a5ae256406
docs/mfe-history-review/tools/hist.sh dhiman1987__micro-frontend-demo rev-list --count --merges cae01436907388ad75de4a33cfc2c7a5ae256406
docs/mfe-history-review/tools/hist.sh dhiman1987__micro-frontend-demo log --reverse --format='%h %ad %s' --date=short cae01436907388ad75de4a33cfc2c7a5ae256406
docs/mfe-history-review/tools/hist.sh dhiman1987__micro-frontend-demo show --name-status --no-renames --format='== %h' 8841396
docs/mfe-history-review/tools/hist.sh dhiman1987__micro-frontend-demo show --name-status --no-renames --format='== %h' 54b84a0
docs/mfe-history-review/tools/hist.sh dhiman1987__micro-frontend-demo show --name-status --no-renames --format='== %h' cae0143
docs/mfe-history-review/tools/hist.sh dhiman1987__micro-frontend-demo show 8841396:app3/package.json   # falha: objeto ausente
docs/mfe-history-review/tools/hist.sh dhiman1987__micro-frontend-demo log --format='%h %ad' --date=short cae01436907388ad75de4a33cfc2c7a5ae256406 -- app3/vite.config.js
docs/mfe-history-review/tools/hist.sh dhiman1987__micro-frontend-demo log --format='%h %ad' --date=short cae01436907388ad75de4a33cfc2c7a5ae256406 -- app3/index.html
docs/mfe-history-review/tools/hist.sh dhiman1987__micro-frontend-demo log --format='%h %ad' --date=short cae01436907388ad75de4a33cfc2c7a5ae256406 -- app3/src/main.jsx
docs/mfe-history-review/tools/hist.sh dhiman1987__micro-frontend-demo log --format='%h %ad' --date=short cae01436907388ad75de4a33cfc2c7a5ae256406 -- app3/src/MyCounterElement.jsx
docs/mfe-history-review/tools/hist.sh dhiman1987__micro-frontend-demo log --format='%h %ad' --date=short cae01436907388ad75de4a33cfc2c7a5ae256406 -- app3/src/MyCounterLitElement.jsx
docs/mfe-history-review/tools/hist.sh dhiman1987__micro-frontend-demo log --format='%h %ad' --date=short cae01436907388ad75de4a33cfc2c7a5ae256406 -- app1/app.js
docs/mfe-history-review/tools/hist.sh dhiman1987__micro-frontend-demo log --format='%h %ad' --date=short cae01436907388ad75de4a33cfc2c7a5ae256406 -- app2/app.js
docs/mfe-history-review/tools/hist.sh dhiman1987__micro-frontend-demo log --format='%h %ad' --date=short cae01436907388ad75de4a33cfc2c7a5ae256406 -- app-shell/index.html
docs/mfe-history-review/tools/hist.sh dhiman1987__micro-frontend-demo log --format='%h %ad' --date=short cae01436907388ad75de4a33cfc2c7a5ae256406 -- app-shell/style.css
docs/mfe-history-review/tools/hist.sh dhiman1987__micro-frontend-demo log --format='%h %ad' --date=short cae01436907388ad75de4a33cfc2c7a5ae256406 -- README.md
```

## Resumo

Commits até o snapshot: 3 (2025-06-28 a 2025-08-25). Pontos: 2 (esclarecido: 2, inconclusivo: 0, resolvido pelo snapshot: 0).
