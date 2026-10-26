---
schema: 1
id: 1041883313
full_name: irfanswr/react-microfrontend
commit: 00ca0bf8640b7015f760f377f76c971b11fdc95c
inputs:
  clone: data/samples/mfe-sample-001/repos/irfanswr__react-microfrontend
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 163 — irfanswr/react-microfrontend

## Leitura do repositório

O histórico até o snapshot tem um único commit, `00ca0bf` (2025-08-21, "initial"), que é o próprio snapshot, sem merges. Os três projetos, `parent-app`, `react-child-app` e `vue-child-app`, chegaram de uma vez: todos os arquivos consultados têm nele a sua primeira presença observável, e não há commit que os introduza nem versão anterior. O histórico não traz nenhuma informação além do snapshot: não mostra estágios anteriores, abandonos nem onde o código foi feito antes do primeiro commit, e por isso não distingue o que veio dos geradores (create-single-spa, Vue CLI) do que foi escrito para o projeto.

## Pontos

| # | Ponto | Origem | Pergunta | Commits | Resultado |
|---|---|---|---|---|---|
| 1 | `@types/systemjs` declarada e sem uso | 3.4.2 (parent-app/package.json:41) | uso de dependência | 00ca0bf 2025-08-21 initial | inconclusivo |
| 2 | `vue-cli-plugin-single-spa` declarado sem import, invocação ou configuração, e o formato do bundle Vue depende dele | 3.4.2 (vue-child-app/package.json:24); 3.4.4 (Notas) | uso de dependência | 00ca0bf 2025-08-21 initial | inconclusivo |
| 3 | A meta `import-map-overrides-domains` e as instruções sobre ela estão comentadas | 3.4.4 (parent-app/src/index.ejs:10, 11, 12) | ativo ou abandonado | 00ca0bf 2025-08-21 initial | inconclusivo |
| 4 | O import map de produção está comentado, e só o modo local liga as aplicações | 3.4.4 (Notas; parent-app/src/index.ejs:30) | ativo ou abandonado | 00ca0bf 2025-08-21 initial | inconclusivo |

## Observações

**1. `@types/systemjs` declarada e sem uso.** O `parent-app/package.json` chega com a declaração no único commit e não tem outra versão. O histórico não diz se o pacote chegou a ser usado antes do primeiro commit nem se veio apenas do gerador; continua sem uso no snapshot.

**2. `vue-cli-plugin-single-spa` declarado sem import, invocação ou configuração.** O `vue-child-app/package.json`, com o plugin em devDependencies, e o `vue-child-app/vue.config.js`, sem opções de saída, chegam juntos no único commit. Não há versão anterior de nenhum dos dois em que o plugin aparecesse configurado. O histórico não responde se o plugin é carregado pelo Vue CLI nem qual é o formato do bundle; a dúvida das revisões de dependências e de código-fonte fica como estava.

**3. A meta `import-map-overrides-domains` está comentada.** O `parent-app/src/index.ejs` chega com as linhas 10 a 12 já comentadas no único commit. Não dá para saber se a meta esteve ativa antes do primeiro commit ou se nunca foi descomentada.

**4. O import map de produção está comentado.** O mesmo `parent-app/src/index.ejs` chega no único commit com o mapa de produção comentado e o espaço reservado `src="/importmap.json"`, ao lado do mapa local. Não há versão em que o mapa de produção estivesse ativo nem commit que o comente. O histórico não diz se ele foi planejado e nunca conectado ou se é só o texto do gerador.

## Comandos

```
docs/mfe-history-review/tools/hist.sh irfanswr__react-microfrontend rev-list --count 00ca0bf8640b7015f760f377f76c971b11fdc95c
docs/mfe-history-review/tools/hist.sh irfanswr__react-microfrontend rev-list --count --merges 00ca0bf8640b7015f760f377f76c971b11fdc95c
docs/mfe-history-review/tools/hist.sh irfanswr__react-microfrontend log --reverse --format='%h %ad %s' --date=short 00ca0bf8640b7015f760f377f76c971b11fdc95c
docs/mfe-history-review/tools/hist.sh irfanswr__react-microfrontend log --format='%h %ad' --date=short 00ca0bf8640b7015f760f377f76c971b11fdc95c -- parent-app/package.json
docs/mfe-history-review/tools/hist.sh irfanswr__react-microfrontend log --format='%h %ad' --date=short 00ca0bf8640b7015f760f377f76c971b11fdc95c -- vue-child-app/package.json
docs/mfe-history-review/tools/hist.sh irfanswr__react-microfrontend log --format='%h %ad' --date=short 00ca0bf8640b7015f760f377f76c971b11fdc95c -- vue-child-app/vue.config.js
docs/mfe-history-review/tools/hist.sh irfanswr__react-microfrontend log --format='%h %ad' --date=short 00ca0bf8640b7015f760f377f76c971b11fdc95c -- parent-app/src/index.ejs
```

## Resumo

Commits até o snapshot: 1 (2025-08-21 a 2025-08-21). Pontos: 4 (esclarecido: 0, inconclusivo: 4, resolvido pelo snapshot: 0).
