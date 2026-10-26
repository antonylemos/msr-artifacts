---
schema: 1
id: 1134094230
full_name: dmalancioiu/SOA-project
commit: a00d6436b4a6c4f28287e7e90ded084c1241fcf1
inputs:
  clone: data/samples/mfe-sample-001/repos/dmalancioiu__SOA-project
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 190 — dmalancioiu/SOA-project

## Leitura do repositório

O histórico até o snapshot tem 3 commits, nenhum merge, todos de 2026-01-14. `497d666` ("Initial
commit: Food Delivery Platform - Complete SOA Implementation") cria o repositório inteiro: backend,
infraestrutura, as quatro aplicações de `frontend/` e toda a documentação. A mensagem lista "4 React
micro frontends with Module Federation". Por isso, para quase tudo, o que se vê é a primeira presença
observável no primeiro commit, e não uma introdução: o histórico não diz onde esse código foi feito
antes. `3638c74` ("Add driver dashboard and delivery tracking features") cria
`frontend/user-dashboard/src/components/DriverDashboard.js` e `frontend/user-dashboard/src/services/deliveryService.js`
e altera, entre outros, `frontend/restaurant-catalog/src/components/MenuView.js`, `MenuItemCard.js`,
`frontend/user-dashboard/webpack.config.js` e `frontend/user-dashboard/package.json`. Segundo a
mensagem, o commit também "enhances module federation and dependency management for user-dashboard".
`a00d643` ("Change user and driver IDs from Long to String"), o commit do snapshot, cria
`frontend/shell-app/src/pages/CartPage.js` e altera `frontend/shell-app/src/App.js` e
`frontend/shell-app/src/components/Header.js`. A mensagem anuncia "Updated frontend to add CartPage,
route to /cart, and cart icon navigation in Header". Nenhum commit remove arquivo, e nenhum documento
muda depois do primeiro commit: `FRONTEND_IMPLEMENTATION.md`, `docs/ARCHITECTURE.md` e
`frontend/README.md` têm o mesmo objeto nos três commits.

O clone permite ver mensagens, arquivos tocados por commit (com `--no-renames`) e identificadores de
objetos. As versões de `497d666` dos arquivos que mudaram depois não estão disponíveis: `cat-file -e`
falhou por objeto ausente em `MenuView.js`, `frontend/shell-app/src/App.js`, `Header.js`,
`frontend/user-dashboard/webpack.config.js` e `frontend/user-dashboard/package.json`, e também em
`3638c74:frontend/shell-app/src/App.js`. Só estão disponíveis os objetos que são os mesmos do snapshot.
Nos arquivos que nunca mudaram, o conteúdo de todas as versões é o do snapshot. Nos outros, os pontos
se apoiam em mensagens, caminhos e identificadores.

Viram pontos as construções `Undetermined` da 3.4.4 (o evento `addToCart`, MenuView.js:56-57), a
relação `Undetermined` da 3.4.5 (#4) e as afirmações `contradita` da 3.4.7 (#5, #10, #15, #24, #26).
O evento, a relação e as afirmações #10 e #24 são a mesma dúvida e viram um ponto só. A 3.4.2 tem as
três dependências `Yes`, a 3.4.3 não tem unidade `Undetermined`, e a 3.4.6 não tem deploy
`Undetermined`. A ausência de lockfile anotada na 3.4.6 já é explicada pelos `.gitignore` das
aplicações e não foi tratada nas revisões como ambiguidade.

## Pontos

| # | Ponto | Origem | Pergunta | Commits | Resultado |
|---|---|---|---|---|---|
| 1 | O catálogo dispara o evento `addToCart` para o carrinho do shell, mas nada no snapshot escuta o evento, e a documentação diz que o item chega ao `CartContext`. | 3.4.4 (frontend/restaurant-catalog/src/components/MenuView.js:56); 3.4.4 (frontend/restaurant-catalog/src/components/MenuView.js:57); 3.4.5 #4; 3.4.7 #10; 3.4.7 #24 | ativo ou abandonado | 497d666 2026-01-14 Initial commit: Food Delivery Platform - Complete SOA Implementation; 3638c74 2026-01-14 Add driver dashboard and delivery tracking features; a00d643 2026-01-14 Change user and driver IDs from Long to String | inconclusivo |
| 2 | A documentação diz que o shell expõe `AuthContext`, `CartContext` e os serviços de API e WebSocket, mas a configuração do shell não tem `exposes`. | 3.4.7 #5 | estágios em conflito | 497d666 2026-01-14 Initial commit: Food Delivery Platform - Complete SOA Implementation | esclarecido |
| 3 | A documentação dá ao catálogo a gestão do carrinho e a colocação do pedido, que no snapshot ficam no shell. | 3.4.7 #15 | estágios em conflito | 497d666 2026-01-14 Initial commit: Food Delivery Platform - Complete SOA Implementation; 3638c74 2026-01-14 Add driver dashboard and delivery tracking features; a00d643 2026-01-14 Change user and driver IDs from Long to String | esclarecido |
| 4 | O comentário do `user-dashboard` diz que compartilhar `sockjs-client` e `@stomp/stompjs` evita conexões duplicadas, mas o painel de motorista abre a própria conexão e nenhuma outra unidade compartilha esses pacotes. | 3.4.7 #26 | estágios em conflito | 497d666 2026-01-14 Initial commit: Food Delivery Platform - Complete SOA Implementation; 3638c74 2026-01-14 Add driver dashboard and delivery tracking features | esclarecido |

## Observações

**1. Evento `addToCart` sem ouvinte.** `frontend/shell-app/src/context/CartContext.js` tem o mesmo
objeto (`9349ad3`) nos três commits. Como a versão do snapshot não registra ouvinte, o contexto do
carrinho nunca escutou o evento em nenhum commit. `MenuView.js` muda em `3638c74` (`1ac7895` →
`cdaf199`, o objeto do snapshot), mas a versão de `497d666` não está disponível. Por isso o histórico
não mostra se o disparo e o comentário "For now, we'll use window events" (MenuView.js:54-55) já
existiam no primeiro commit ou entraram depois. A mensagem de `3638c74` não fala do carrinho. Do lado
do shell, `App.js` e `Header.js` mudam em `a00d643`, e as versões anteriores não estão disponíveis.
A mensagem anuncia a página do carrinho, a rota `/cart` e o ícone no cabeçalho, sem citar o evento.
O histórico não exclui que um ouvinte tenha existido num desses arquivos e sido retirado. Conclusão,
delimitada aos caminhos: o `CartContext` nunca foi ouvinte, e nenhum arquivo do frontend foi removido.
Fica em aberto se o canal chegou a ter receptor, ou seja, se é um canal planejado e nunca ligado ou
um canal abandonado. Inconclusivo. As construções continuam `Undetermined`, e as afirmações continuam
`contradita`.

**2. "Exposed Services" do shell.** `frontend/shell-app/webpack.config.js` tem o mesmo objeto
(`f3567ea`) nos três commits, e `FRONTEND_IMPLEMENTATION.md` também (`0f2973f`). Os dois vêm de
`497d666` e nunca mudam. Como a configuração do snapshot não tem `exposes`
(frontend/shell-app/webpack.config.js:48-63), o shell não expôs módulos em nenhum commit. Conclusão,
delimitada a esses arquivos: a lista de serviços expostos (FRONTEND_IMPLEMENTATION.md:56-60) e a
configuração sem `exposes` são do mesmo estágio. A divergência não é resto de uma configuração
anterior nem uma documentação desatualizada por mudança posterior. O histórico não diz se a lista
era um plano. A afirmação continua `contradita`.

**3. Carrinho e pedido atribuídos ao catálogo.** `docs/ARCHITECTURE.md` tem o mesmo objeto
(`44e9aea`) nos três commits. O carrinho do shell, `CartContext.js`, também existe desde `497d666` e
nunca muda (observação 1). Logo, a atribuição da gestão do carrinho ao catálogo
(docs/ARCHITECTURE.md:267-274) e o carrinho no shell são do mesmo estágio. A colocação do pedido é
diferente. A página que envia o pedido, `frontend/shell-app/src/pages/CartPage.js`, é criada em
`a00d643`, o commit do snapshot, junto com a mudança de `App.js` e `Header.js`. Em `497d666` e
`3638c74`, as páginas do shell são só `HomePage.js`, `LoginPage.js` e `RegisterPage.js`. Nenhum
arquivo do catálogo foi criado com nome de carrinho ou pedido, e nenhum foi removido. `MenuView.js` e
`MenuItemCard.js` mudam em `3638c74`, e as versões de `497d666` não estão disponíveis, então o
histórico não mostra se o catálogo tinha alguma lógica de pedido antes. Conclusão, delimitada a esses
arquivos: a parte do carrinho é um conflito dentro do mesmo estágio, e a parte do pedido opõe o
documento do primeiro commit a uma página do shell criada depois, no último commit, sem que o
documento tenha sido atualizado. A afirmação continua `contradita`.

**4. `sockjs-client` e `@stomp/stompjs` compartilhados.** `frontend/user-dashboard/webpack.config.js`
muda em `3638c74` (`8786694` → `f22c2e0`, o objeto do snapshot, que tem o comentário em
frontend/user-dashboard/webpack.config.js:63). O mesmo commit cria `DriverDashboard.js` (`934bf5a`, o
objeto do snapshot) e altera o `package.json` da unidade (`6f746e3` → `828b075`). A mensagem anuncia
"real-time updates via WebSocket" e "enhances module federation and dependency management for
user-dashboard". A versão de `497d666` da configuração não está disponível, então o histórico não diz
se o comentário já existia antes. Mas o comentário e o painel que abre a própria conexão estão juntos
desde `3638c74` e não mudam até o snapshot. A configuração do shell (`f3567ea`) e a de
`order-tracking` não mudam depois de `497d666`, e nenhuma das duas compartilha esses pacotes no
snapshot, então nunca compartilharam. Conclusão, delimitada a esses arquivos: o comentário e o código
que o contradiz são do mesmo estágio (`3638c74`), e as outras unidades nunca acompanharam o
compartilhamento. A divergência não vem de uma mudança posterior que deixou o comentário para trás.
A afirmação continua `contradita`.

## Comandos

```
docs/mfe-history-review/tools/hist.sh dmalancioiu__SOA-project rev-list --count a00d6436b4a6c4f28287e7e90ded084c1241fcf1
docs/mfe-history-review/tools/hist.sh dmalancioiu__SOA-project rev-list --count --merges a00d6436b4a6c4f28287e7e90ded084c1241fcf1
docs/mfe-history-review/tools/hist.sh dmalancioiu__SOA-project log --format='%h %ad %s' --date=short --reverse --name-status --no-renames a00d6436b4a6c4f28287e7e90ded084c1241fcf1   # saída filtrada fora do clone: sem linhas tmpclaude-*
docs/mfe-history-review/tools/hist.sh dmalancioiu__SOA-project ls-tree -r 497d666 -- frontend/restaurant-catalog/src/components/MenuView.js frontend/restaurant-catalog/src/components/MenuItemCard.js frontend/shell-app/src/context/CartContext.js frontend/shell-app/src/App.js frontend/shell-app/src/components/Header.js frontend/shell-app/src/pages frontend/shell-app/webpack.config.js frontend/user-dashboard/webpack.config.js frontend/user-dashboard/package.json frontend/user-dashboard/src/components/DriverDashboard.js FRONTEND_IMPLEMENTATION.md docs/ARCHITECTURE.md frontend/README.md
docs/mfe-history-review/tools/hist.sh dmalancioiu__SOA-project ls-tree -r 3638c74 -- (mesmos caminhos)
docs/mfe-history-review/tools/hist.sh dmalancioiu__SOA-project ls-tree -r a00d6436b4a6c4f28287e7e90ded084c1241fcf1 -- (mesmos caminhos)
# os três ls-tree foram rodados duas vezes: na primeira, os caminhos chegaram ao git como um único argumento e não houve saída
docs/mfe-history-review/tools/hist.sh dmalancioiu__SOA-project cat-file -e 497d666:frontend/restaurant-catalog/src/components/MenuView.js   # falhou: objeto ausente
docs/mfe-history-review/tools/hist.sh dmalancioiu__SOA-project cat-file -e 497d666:frontend/user-dashboard/webpack.config.js   # falhou: objeto ausente
docs/mfe-history-review/tools/hist.sh dmalancioiu__SOA-project cat-file -e 497d666:frontend/shell-app/src/App.js   # falhou: objeto ausente
docs/mfe-history-review/tools/hist.sh dmalancioiu__SOA-project cat-file -e 497d666:frontend/shell-app/src/components/Header.js   # falhou: objeto ausente
docs/mfe-history-review/tools/hist.sh dmalancioiu__SOA-project cat-file -e 3638c74:frontend/shell-app/src/App.js   # falhou: objeto ausente
docs/mfe-history-review/tools/hist.sh dmalancioiu__SOA-project cat-file -e 497d666:frontend/user-dashboard/package.json   # falhou: objeto ausente
# os seis cat-file acima foram rodados duas vezes, com o mesmo resultado
docs/mfe-history-review/tools/hist.sh dmalancioiu__SOA-project cat-file -e a00d6436b4a6c4f28287e7e90ded084c1241fcf1ontend/shell-app/src/App.js   # recusado pelo script (revisão inválida, erro de digitação); não registrado
docs/mfe-history-review/tools/hist.sh dmalancioiu__SOA-project cat-file -e a00d6436b4a6c4f28287e7e90ded084c1241fcf1:frontend/shell-app/src/App.js   # objeto presente (controle)
docs/mfe-history-review/tools/hist.sh dmalancioiu__SOA-project cat-file -e 3638c74:frontend/user-dashboard/src/components/DriverDashboard.js   # objeto presente (mesmo objeto do snapshot)
docs/mfe-history-review/tools/hist.sh dmalancioiu__SOA-project log --format='%h %ad [%B]' --date=short a00d6436b4a6c4f28287e7e90ded084c1241fcf1
```

## Resumo

Commits até o snapshot: 3 (2026-01-14 a 2026-01-14). Pontos: 4 (esclarecido: 3, inconclusivo: 1, resolvido pelo snapshot: 0).
