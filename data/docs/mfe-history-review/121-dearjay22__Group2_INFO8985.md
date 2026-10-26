---
schema: 1
id: 1108713604
full_name: dearjay22/Group2_INFO8985
commit: 9f8b0b7df3c6bcdb67eee8cb21cebde3ff2ce189
inputs:
  clone: data/samples/mfe-sample-001/repos/dearjay22__Group2_INFO8985
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 121 — dearjay22/Group2_INFO8985

## Leitura do repositório

O histórico até o snapshot tem 56 commits, 16 deles merges, de 2025-12-02 a 2025-12-08: de `095fa12` (2025-12-02, "Initial commit") a `9f8b0b7` (2025-12-08, "Revise README for Microservices E‑Commerce Project"), o snapshot. As duas aplicações frontend são introduzidas juntas em `ebce825` (2025-12-02, "Added Microfrontend App"), que cria todos os arquivos de `frontend/shell-app` e `frontend/products-mf`, inclusive os `App.js` e o `ProductList.js`; antes disso, `d32ef49` (2025-12-02, "add readme") cria um arquivo chamado `frontend`, removido em `54317c8` (2025-12-02, "updated folder strcuture"). Depois vêm os Dockerfiles em `b3e4f84` (2025-12-05, "updated the front end part with docker file and all the required data"), os `nginx.conf` em `5c59071` (2025-12-06), o `products.json` em `3b6d2f0` (2025-12-07, "Fix product endpoint") e a última mudança no frontend em `9f51b10` (2025-12-07, "Update package").

O clone não tem o conteúdo das versões antigas dos arquivos consultados: todas as leituras de `App.js`, `ProductList.js` e `docker-compose.yml` em commits anteriores falharam por objeto ausente. Para os pontos abaixo há só as mensagens, as listas de arquivos por commit e os identificadores dos objetos. Nenhum ponto foi resolvido pelo próprio snapshot.

## Pontos

| # | Ponto | Origem | Pergunta | Commits | Resultado |
|---|---|---|---|---|---|
| 1 | O iframe do shell aponta para a porta 3001, que só pelo Compose liga ao products-mf, e o comentário logo acima diz que a URL é a do API Gateway na porta 8080 | 3.4.5 #1; 3.4.7 #5 | estágios em conflito | ebce825 2025-12-02 Added Microfrontend App; b3e4f84 2025-12-05 updated the front end part with docker file and all the required data; 20fcc0c 2025-12-06 updated; 3b6d2f0 2025-12-07 Fix product endpoint; 15495fb 2025-12-07 Added K6 | inconclusivo |
| 2 | O README diz que os microfrontends funcionam com os backends, mas o products-mf usa um `products.json` local, e o `ProductList.js`, que chamaria o gateway, não é importado | 3.4.7 #4 | ativo ou abandonado | ebce825 2025-12-02 Added Microfrontend App; 20fcc0c 2025-12-06 updated; 3b6d2f0 2025-12-07 Fix product endpoint; 9f51b10 2025-12-07 Update package | inconclusivo |

## Observações

**1. O iframe do shell aponta para a porta 3001, que só pelo Compose liga ao products-mf, e o comentário logo acima diz que a URL é a do API Gateway na porta 8080.** O `frontend/shell-app/src/App.js` é criado em `ebce825` e muda em `b3e4f84`, `20fcc0c` e `3b6d2f0`; o objeto de `3b6d2f0` é o mesmo do snapshot, então o comentário da porta 8080 e a URL com a porta 3001 estão juntos ao menos desde esse commit. As versões de `ebce825`, `b3e4f84` e `20fcc0c` não estão disponíveis, e o histórico não mostra se alguma delas montava a URL do gateway. O `docker-compose.yml` muda pela última vez em `15495fb`, com o mesmo objeto do snapshot; as versões anteriores, inclusive a de `b3e4f84`, que é o commit em que o shell recebe o Dockerfile, também não estão disponíveis, e não dá para saber desde quando o products-mf está na porta 3001. A mensagem de `3b6d2f0` anuncia uma correção do "product endpoint", sem dizer se ela é a URL do iframe ou outra. Conclusão: o histórico não diz se o comentário é resto de um estágio em que o iframe apontava para o gateway.

**2. O README diz que os microfrontends funcionam com os backends, mas o products-mf usa um `products.json` local, e o `ProductList.js`, que chamaria o gateway, não é importado.** O `ProductList.js` é criado em `ebce825`, junto com o `App.js` do products-mf, e muda em `20fcc0c` e em `9f51b10`, o último commit que toca o frontend; o arquivo foi editado até o fim, e não esquecido desde a criação. O `products.json` é criado em `3b6d2f0`, que também altera o `App.js` do products-mf, e a mensagem anuncia uma correção do "product endpoint"; isso é compatível com a troca de uma chamada ao backend por dados locais, mas as versões antigas do `App.js` e do `ProductList.js` não estão disponíveis, e o histórico não mostra se o `App.js` já importou o `ProductList.js` ou chamou o gateway. Conclusão: o histórico não diz se a ligação ao backend foi abandonada ou nunca chegou a ser conectada.

## Comandos

```
docs/mfe-history-review/tools/hist.sh dearjay22__Group2_INFO8985 rev-list --count 9f8b0b7df3c6bcdb67eee8cb21cebde3ff2ce189
docs/mfe-history-review/tools/hist.sh dearjay22__Group2_INFO8985 rev-list --count --merges 9f8b0b7df3c6bcdb67eee8cb21cebde3ff2ce189
docs/mfe-history-review/tools/hist.sh dearjay22__Group2_INFO8985 log --reverse --format='%h %ad %s' --date=short 9f8b0b7df3c6bcdb67eee8cb21cebde3ff2ce189
docs/mfe-history-review/tools/hist.sh dearjay22__Group2_INFO8985 log --reverse --format='%h %ad %s' --date=short --name-status --no-renames 9f8b0b7df3c6bcdb67eee8cb21cebde3ff2ce189 -- frontend shell-app products-mf
docs/mfe-history-review/tools/hist.sh dearjay22__Group2_INFO8985 ls-tree ebce825 -- frontend/shell-app/src/App.js frontend/products-mf/src/App.js frontend/products-mf/src/ProductList.js
docs/mfe-history-review/tools/hist.sh dearjay22__Group2_INFO8985 ls-tree b3e4f84 -- frontend/shell-app/src/App.js frontend/products-mf/src/App.js frontend/products-mf/src/ProductList.js
docs/mfe-history-review/tools/hist.sh dearjay22__Group2_INFO8985 ls-tree 20fcc0c -- frontend/shell-app/src/App.js frontend/products-mf/src/App.js frontend/products-mf/src/ProductList.js
docs/mfe-history-review/tools/hist.sh dearjay22__Group2_INFO8985 ls-tree 3b6d2f0 -- frontend/shell-app/src/App.js frontend/products-mf/src/App.js frontend/products-mf/src/ProductList.js
docs/mfe-history-review/tools/hist.sh dearjay22__Group2_INFO8985 ls-tree 9f8b0b7df3c6bcdb67eee8cb21cebde3ff2ce189 -- frontend/shell-app/src/App.js frontend/products-mf/src/App.js frontend/products-mf/src/ProductList.js
docs/mfe-history-review/tools/hist.sh dearjay22__Group2_INFO8985 show --format='%h %ad %s' --date=short --name-status 73402bf
docs/mfe-history-review/tools/hist.sh dearjay22__Group2_INFO8985 show ebce825:frontend/shell-app/src/App.js   # falhou: objeto ausente (bad object)
docs/mfe-history-review/tools/hist.sh dearjay22__Group2_INFO8985 show b3e4f84:frontend/shell-app/src/App.js   # falhou: objeto ausente (bad object)
docs/mfe-history-review/tools/hist.sh dearjay22__Group2_INFO8985 show 20fcc0c:frontend/shell-app/src/App.js   # falhou: objeto ausente (bad object)
docs/mfe-history-review/tools/hist.sh dearjay22__Group2_INFO8985 show ebce825:frontend/products-mf/src/ProductList.js   # falhou: objeto ausente (bad object)
docs/mfe-history-review/tools/hist.sh dearjay22__Group2_INFO8985 show 20fcc0c:frontend/products-mf/src/ProductList.js   # falhou: objeto ausente (bad object)
docs/mfe-history-review/tools/hist.sh dearjay22__Group2_INFO8985 show ebce825:frontend/products-mf/src/App.js   # falhou: objeto ausente (bad object)
docs/mfe-history-review/tools/hist.sh dearjay22__Group2_INFO8985 show b3e4f84:frontend/products-mf/src/App.js   # falhou: objeto ausente (bad object)
docs/mfe-history-review/tools/hist.sh dearjay22__Group2_INFO8985 show 20fcc0c:frontend/products-mf/src/App.js   # falhou: objeto ausente (bad object)
docs/mfe-history-review/tools/hist.sh dearjay22__Group2_INFO8985 show 5c59071:frontend/products-mf/src/App.js   # falhou: objeto ausente (bad object)
docs/mfe-history-review/tools/hist.sh dearjay22__Group2_INFO8985 show 3b6d2f0:frontend/products-mf/src/App.js   # falhou: objeto ausente (bad object)
docs/mfe-history-review/tools/hist.sh dearjay22__Group2_INFO8985 log --format='%h %ad %s' --date=short 9f8b0b7df3c6bcdb67eee8cb21cebde3ff2ce189 -- frontend/shell-app/src/App.js
docs/mfe-history-review/tools/hist.sh dearjay22__Group2_INFO8985 log --format='%h %ad %s' --date=short 9f8b0b7df3c6bcdb67eee8cb21cebde3ff2ce189 -- frontend/products-mf/src/ProductList.js
docs/mfe-history-review/tools/hist.sh dearjay22__Group2_INFO8985 log --format='%h %ad %s' --date=short 9f8b0b7df3c6bcdb67eee8cb21cebde3ff2ce189 -- frontend/products-mf/src/App.js
docs/mfe-history-review/tools/hist.sh dearjay22__Group2_INFO8985 log --format='%h %ad %s' --date=short 9f8b0b7df3c6bcdb67eee8cb21cebde3ff2ce189 -- docker-compose.yml
docs/mfe-history-review/tools/hist.sh dearjay22__Group2_INFO8985 show --format='%h %ad %s' --date=short --name-status 24a61a0
docs/mfe-history-review/tools/hist.sh dearjay22__Group2_INFO8985 show --format='%h %ad %s' --date=short --name-status 3b6d2f0
docs/mfe-history-review/tools/hist.sh dearjay22__Group2_INFO8985 show --format='%h %ad %s' --date=short --name-status 9f51b10
docs/mfe-history-review/tools/hist.sh dearjay22__Group2_INFO8985 ls-tree b3e4f84 -- docker-compose.yml
docs/mfe-history-review/tools/hist.sh dearjay22__Group2_INFO8985 ls-tree 20fcc0c -- docker-compose.yml
docs/mfe-history-review/tools/hist.sh dearjay22__Group2_INFO8985 ls-tree 5c59071 -- docker-compose.yml
docs/mfe-history-review/tools/hist.sh dearjay22__Group2_INFO8985 ls-tree c976c69 -- docker-compose.yml
docs/mfe-history-review/tools/hist.sh dearjay22__Group2_INFO8985 ls-tree 15495fb -- docker-compose.yml
docs/mfe-history-review/tools/hist.sh dearjay22__Group2_INFO8985 ls-tree 9f8b0b7df3c6bcdb67eee8cb21cebde3ff2ce189 -- docker-compose.yml
docs/mfe-history-review/tools/hist.sh dearjay22__Group2_INFO8985 show b3e4f84:docker-compose.yml   # falhou: objeto ausente (bad object)
docs/mfe-history-review/tools/hist.sh dearjay22__Group2_INFO8985 show 5c59071:docker-compose.yml   # falhou: objeto ausente (bad object)
docs/mfe-history-review/tools/hist.sh dearjay22__Group2_INFO8985 show c976c69:docker-compose.yml   # falhou: objeto ausente (bad object)
```

## Resumo

Commits até o snapshot: 56 (2025-12-02 a 2025-12-08). Pontos: 2 (esclarecido: 0, inconclusivo: 2, resolvido pelo snapshot: 0).
