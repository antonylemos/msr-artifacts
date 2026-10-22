---
schema: 1
id: 1028839722
full_name: mrgleam/mf-tanstack-demo
commit: a7175973b0594cecfd32126b0bb65e71c627a6c3
inputs:
  clone: data/samples/mfe-sample-001/repos/mrgleam__mf-tanstack-demo
annotation:
  method: manual
  status: final
  date: 2026-10-21
---

# 045 — mrgleam/mf-tanstack-demo

## Leitura do repositório

O histórico até o snapshot tem 5 commits, de 2025-07-30 a 2025-08-01, sem merges.
- **`04bfb96` (2025-07-30, "first commit"):** primeiro registro observado do projeto.
- **Dois commits seguintes, no mesmo dia:** mexem na forma como o shell recebe as rotas do shop.
- **`75fe189` (2025-08-01):** a mensagem anuncia SSL e troca de portas no Kong.
- **`a717597` (2025-08-01, o snapshot):** cria `shell/src/moduleLoader.ts` e altera `shell/src/router.tsx`. A mensagem anuncia o carregador com cache e "retry logic" e a carga assíncrona dos módulos federados.

As versões anteriores do `router.tsx` não estão disponíveis (ex.: `1816f5b:shell/src/router.tsx` falha por objeto ausente).

## Pontos

| # | Ponto | Origem | Pergunta | Commits | Resultado |
|---|---|---|---|---|---|
| 1 | O shell lê `default.routes` do módulo remoto, e o shop só exporta `routes` por nome | 3.4.4 (shell/src/router.tsx:64); 3.4.7 #5 | estágios em conflito | 04bfb96 2025-07-30 first commit; 5633835 2025-07-30 Remove unused shopRoute definition from router.tsx and adjust shopRoutes import handling.; 1816f5b 2025-07-30 Add utility function to replace parent routes in router and update ShopRoutes import; a717597 2025-08-01 Add Module Federation Loader with caching and retry logic; enhance router to load federated modules asynchronously | inconclusivo |
| 2 | O carregador anuncia "retry logic", mas as tentativas aguardam a mesma promessa | 3.4.7 #7 | estágios em conflito | a717597 2025-08-01 Add Module Federation Loader with caching and retry logic; enhance router to load federated modules asynchronously | esclarecido |

## Observações

**1. O shell lê `default.routes` do módulo remoto, e o shop só exporta `routes` por nome.** `shop/src/routes/ShopRoutes.tsx` não muda desde o primeiro commit, e a versão desse commit, disponível no clone, já exporta `routes` e `shopRouter` só por nome. Do lado do shop, portanto, nunca houve export default. O `router.tsx` do shell mudou em quatro commits, o último deles o do snapshot, junto com a criação do carregador. As mensagens de `5633835` e `1816f5b` anunciam ajustes na forma de importar o `ShopRoutes`, mas as versões anteriores do `router.tsx` não estão disponíveis. Não dá para saber se uma versão anterior do shell lia o export nomeado e o desencontro surgiu em `a717597`.

**2. O carregador anuncia "retry logic", mas as tentativas aguardam a mesma promessa.** `shell/src/moduleLoader.ts` é criado em `a717597`, o commit do snapshot, e não tem outra versão no histórico. O laço de tentativas que reaguarda a mesma promessa é o da única versão do arquivo. A mensagem do commit e o comentário de abertura anunciam o "retry", e o código nunca refez a importação. Não há um estágio em que o retry tenha funcionado.

## Comandos

```
docs/mfe-history-review/tools/hist.sh mrgleam__mf-tanstack-demo rev-list --count a7175973b0594cecfd32126b0bb65e71c627a6c3
docs/mfe-history-review/tools/hist.sh mrgleam__mf-tanstack-demo rev-list --count --merges a7175973b0594cecfd32126b0bb65e71c627a6c3
docs/mfe-history-review/tools/hist.sh mrgleam__mf-tanstack-demo log --reverse --format='%h %ad %s' --date=short a7175973b0594cecfd32126b0bb65e71c627a6c3
docs/mfe-history-review/tools/hist.sh mrgleam__mf-tanstack-demo log --format='%h %ad' --date=short a7175973b0594cecfd32126b0bb65e71c627a6c3 -- shop/src/routes/ShopRoutes.tsx
docs/mfe-history-review/tools/hist.sh mrgleam__mf-tanstack-demo show 04bfb96:shop/src/routes/ShopRoutes.tsx
docs/mfe-history-review/tools/hist.sh mrgleam__mf-tanstack-demo log --format='%h %ad' --date=short a7175973b0594cecfd32126b0bb65e71c627a6c3 -- shell/src/router.tsx
docs/mfe-history-review/tools/hist.sh mrgleam__mf-tanstack-demo show 04bfb96:shell/src/router.tsx   # falha: objeto ausente
docs/mfe-history-review/tools/hist.sh mrgleam__mf-tanstack-demo show 5633835:shell/src/router.tsx   # falha: objeto ausente
docs/mfe-history-review/tools/hist.sh mrgleam__mf-tanstack-demo show 1816f5b:shell/src/router.tsx   # falha: objeto ausente
docs/mfe-history-review/tools/hist.sh mrgleam__mf-tanstack-demo log --format='%h %ad' --date=short a7175973b0594cecfd32126b0bb65e71c627a6c3 -- shell/src/moduleLoader.ts
docs/mfe-history-review/tools/hist.sh mrgleam__mf-tanstack-demo show --name-status --no-renames --format='== %h' a717597
```

## Resumo

Commits até o snapshot: 5 (2025-07-30 a 2025-08-01). Pontos: 2 (esclarecido: 1, inconclusivo: 1, resolvido pelo snapshot: 0).
