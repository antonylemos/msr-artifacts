---
schema: 1
id: 1088828444
full_name: DATou-love/micro-frontEnd
commit: 8e52e7d4fee1bc193922a8bea0f5ede7a0cb9942
inputs:
  clone: data/samples/mfe-sample-001/repos/DATou-love__micro-frontEnd
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 299 — DATou-love/micro-frontEnd

## Leitura do repositório

O histórico até o snapshot tem um único commit, o próprio snapshot, sem merges: `8e52e7d` (2025-11-03, "主应用vue3，子应用vue2", "app principal Vue 3, sub-app Vue 2"). Ele adiciona de uma vez os 36 arquivos do repositório: o `.gitignore` da raiz, o host `main-vue3/` e a sub-app `sub-vue2/`. Tudo o que está no snapshot tem nesse commit a sua primeira presença observável; não há commit que introduza algum artefato em separado nem versão anterior de nenhum arquivo, e o histórico não mostra onde o código foi feito antes do primeiro commit. Nenhum caminho `sub-react16` aparece no histórico até o snapshot, nem como arquivo removido: a sub-app registrada no host com `//localhost:3000` (main-vue3/src/main.ts:17-22) nunca esteve neste repositório.

Os pontos vêm só da 3.4.7: as afirmações 7 e 11, `contradita`. A 3.4.2 não tem dependência sem uso (qiankun é `Yes`), a 3.4.3 não tem unidade `Undetermined`, a 3.4.4 não tem construção inativa, comentada ou `Undetermined` (as sete são `Yes`), a 3.4.5 não tem relação `Undetermined` (a `sub-react16` é destino fora do snapshot, com valores definidos) e a 3.4.6 tem deploy `não observado`, e não `Undetermined`. A dúvida sobre a montagem sob `strictStyleIsolation`, registrada desde a classificação, é de execução e não de histórico, e não virou ponto. O snapshot não resolve nenhum dos dois pontos.

## Pontos

| # | Ponto | Origem | Pergunta | Commits | Resultado |
|---|---|---|---|---|---|
| 1 | O comentário de `sub-vue2/public/index.html` chama de ponto de montagem da sub-app, que deve coincidir com o host, um `<div id="subapp-viewport">` que a sub-app não usa como alvo; ela monta em `#app` | 3.4.7 #7 | estágios em conflito | 8e52e7d 2025-11-03 主应用vue3，子应用vue2 | inconclusivo |
| 2 | O comentário do roteador da sub-app diz que a base é definida dinamicamente em `main.js`, mas a base é fixa em `/sub-vue2` e `main.js` só ajusta `__webpack_public_path__` | 3.4.7 #11 | estágios em conflito | 8e52e7d 2025-11-03 主应用vue3，子应用vue2 | inconclusivo |

## Observações

**1. Ponto de montagem em `sub-vue2/public/index.html`.** O histórico mostra só que `sub-vue2/public/index.html`, com o comentário da linha 15 e os dois `div` das linhas 16 e 17, chega no único commit junto com `sub-vue2/src/main.js` e `main-vue3/src/App.vue`, e que nenhum deles muda até o snapshot, que é esse mesmo commit. Não há versão anterior em que a sub-app montasse em `#subapp-viewport`, nem commit que mude o alvo de `render`. O histórico não diz se o `div` é resto de uma tentativa anterior de montagem, cópia do contêiner do host ou engano de quem escreveu o comentário. Inconclusivo; a contradição registrada na 3.4.7 fica como está.

**2. Base dinâmica do roteador.** `sub-vue2/src/router/index.js`, com o comentário da linha 9 e a base fixa da linha 12, e `sub-vue2/src/main.js`, que só atribui `__webpack_public_path__` (sub-vue2/src/main.js:20-23), chegam juntos no único commit e não têm outra versão até o snapshot; o mesmo vale para `sub-vue2/vue.config.js`, com o `publicPath` comentado (sub-vue2/vue.config.js:21-22). Não há versão de `main.js` que definisse a base do roteador e depois deixasse de defini-la. O histórico não distingue entre um estágio anterior ao primeiro commit, uma intenção nunca implementada e um comentário escrito por engano. Inconclusivo; a contradição registrada na 3.4.7 fica como está.

## Comandos

```
docs/mfe-history-review/tools/hist.sh DATou-love__micro-frontEnd rev-list --count 8e52e7d4fee1bc193922a8bea0f5ede7a0cb9942
docs/mfe-history-review/tools/hist.sh DATou-love__micro-frontEnd rev-list --count --merges 8e52e7d4fee1bc193922a8bea0f5ede7a0cb9942
docs/mfe-history-review/tools/hist.sh DATou-love__micro-frontEnd log --format='%h %ad %s' --date=short 8e52e7d4fee1bc193922a8bea0f5ede7a0cb9942
docs/mfe-history-review/tools/hist.sh DATou-love__micro-frontEnd show --name-status --format='%h %ad' --date=short 8e52e7d4fee1bc193922a8bea0f5ede7a0cb9942
docs/mfe-history-review/tools/hist.sh DATou-love__micro-frontEnd log --format='%h %ad' --date=short --name-status 8e52e7d4fee1bc193922a8bea0f5ede7a0cb9942 -- sub-vue2/public/index.html sub-vue2/src/router/index.js sub-vue2/src/main.js sub-vue2/vue.config.js
docs/mfe-history-review/tools/hist.sh DATou-love__micro-frontEnd log --format='%h %ad' --date=short --full-history 8e52e7d4fee1bc193922a8bea0f5ede7a0cb9942 -- sub-react16   # saída vazia
```

## Resumo

Commits até o snapshot: 1 (2025-11-03 a 2025-11-03). Pontos: 2 (esclarecido: 0, inconclusivo: 2, resolvido pelo snapshot: 0).
