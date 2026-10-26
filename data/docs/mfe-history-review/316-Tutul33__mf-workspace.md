---
schema: 1
id: 1098942873
full_name: Tutul33/mf-workspace
commit: eb6d1cc782f44fa05b6a6d83c23edf20487af9db
inputs:
  clone: data/samples/mfe-sample-001/repos/Tutul33__mf-workspace
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 316 — Tutul33/mf-workspace

## Leitura do repositório

O histórico até o snapshot tem 5 commits, todos em 2025-11-18. O primeiro, `1137709` ("initial commit"), registra os arquivos de workspace, sem os projetos. O segundo, `f038259` ("Commit"), adiciona os três projetos, suas configurações de federação, entradas e rotas, e modifica os manifestos e angular.json. As versões consultadas desse segundo commit já contêm o roteamento por URL direta para os dois remotos, o mapa divergente de inicialização do host e as alternativas de exposição comentadas. É a introdução desses arquivos no histórico disponível; isso não informa onde foram desenvolvidos antes.

Os três commits seguintes só acrescentam ou alteram documentação: `1a56f1c` ("Commit app") cria angular_20_microfrontend_app_guide.md; `53ab035` e `eb6d1cc` (ambos "Commit") alteram README.md. Não há uma etapa posterior de alteração do código das aplicações nesse intervalo. Todos os conteúdos históricos solicitados estavam disponíveis localmente. O histórico explica a permanência dos artefatos, sem mudar os julgamentos das revisões do snapshot nem demonstrar execução ou intenção de abandono.

## Pontos

| # | Ponto | Origem | Pergunta | Commits | Resultado |
|---|---|---|---|---|---|
| 1 | Dependência `@softarc/native-federation-node` declarada sem uso direto observado | 3.4.2 (package.json:30) | uso de dependência | f038259 2025-11-18 Commit | esclarecido |
| 2 | Mapa `customerApp` do host diverge das URLs usadas pelas rotas | 3.4.4 (projects/host-app/src/main.ts:3); 3.4.5 (Leitura do repositório); 3.4.7 (Leitura do repositório) | estágios em conflito | f038259 2025-11-18 Commit | esclarecido |
| 3 | Exposições alternativas de `./Component` estão comentadas nos dois remotos | 3.4.5 (Leitura do repositório: projects/customer-app/federation.config.js:8 e projects/orders-app/federation.config.js:8); 3.4.7 (Leitura do repositório) | ativo ou abandonado | f038259 2025-11-18 Commit | esclarecido |
| 4 | Árvore documentada inclui diretórios sem arquivos no inventário do snapshot | 3.4.7 #5 (README.md:213-251) | estágios em conflito | f038259 2025-11-18 Commit; eb6d1cc 2025-11-18 Commit | esclarecido |

## Observações

**1. Dependência declarada sem uso direto.** O package.json de `f038259` já declara `@softarc/native-federation-node`, como no snapshot. Os projetos são adicionados nesse commit e nenhum de seus arquivos muda depois; package.json também não muda nos três commits restantes. O main do host, suas rotas e os federation.config.js consultados nessa versão usam `@angular-architects/native-federation`. Assim, para os projetos e manifestos examinados, não há uma versão anterior com uso direto que depois tenha sido removido: a declaração já acompanha a primeira versão desses projetos, sem conexão direta observada. O histórico não explica por que o pacote foi declarado nem demonstra abandono. O `No` de 3.4.2 permanece.

**2. Mapa divergente do host.** Em `f038259`, projects/host-app/src/main.ts já registra `customerApp` em `http://localhost:4200/remoteEntry.json`, enquanto projects/host-app/src/app/app.routes.ts já carrega os remotos por URLs diretas nas portas 4301 e 4302. Ambos são criados juntos e não mudam depois. Portanto, nesses arquivos o mapa e o roteamento não são vestígios de duas versões sucessivas: coexistem desde a introdução no repositório. Não é possível concluir se o mapa foi copiado ou planejado para outro arranjo; não há transição observável de um mapa antes usado para um mapa abandonado.

**3. Exposições comentadas de componentes.** Os dois federation.config.js são criados em `f038259` já com `./Component` comentado e com `./CustomerRoutes` ou `./OrdersRoutes` ativo. Nenhum deles muda depois. A única versão registrada desses arquivos já tem essa forma, sem uma exposição de componente ativa que tenha sido desativada posteriormente. Isso esclarece a sequência disponível, mas não a intenção de manter as alternativas comentadas nem a origem anterior do código.

**4. Diretórios da árvore documentada.** O próprio snapshot explica parte da diferença: .gitignore:4,10,32 exclui dist, node_modules e o cache de .angular; angular.json:68,181,294 configura os caminhos public como assets. Para public, o histórico acrescenta evidência: `f038259` cria um favicon.ico em cada um dos três diretórios, e ls-tree no commit do snapshot ainda lista esses três arquivos. Esses caminhos existem na árvore Git do commit, embora seus arquivos não estejam no inventário adquirido usado pelas revisões anteriores. Não há remoção posterior desses assets no histórico até o snapshot. A diferença documental não demonstra uma configuração de assets abandonada nem uma etapa antiga removida. Isso explica o limite entre as fontes sem modificar a corroboração `parcial` de 3.4.7, baseada no snapshot adquirido.

## Comandos

```sh
docs/mfe-history-review/tools/hist.sh Tutul33__mf-workspace log --reverse --name-status --no-renames --format='%h %ad %s' --date=short eb6d1cc782f44fa05b6a6d83c23edf20487af9db
docs/mfe-history-review/tools/hist.sh Tutul33__mf-workspace rev-list --count eb6d1cc782f44fa05b6a6d83c23edf20487af9db
docs/mfe-history-review/tools/hist.sh Tutul33__mf-workspace show f038259:package.json
docs/mfe-history-review/tools/hist.sh Tutul33__mf-workspace show f038259:projects/host-app/src/main.ts
docs/mfe-history-review/tools/hist.sh Tutul33__mf-workspace show f038259:projects/customer-app/federation.config.js
docs/mfe-history-review/tools/hist.sh Tutul33__mf-workspace show f038259:projects/orders-app/federation.config.js
docs/mfe-history-review/tools/hist.sh Tutul33__mf-workspace show f038259:projects/host-app/src/app/app.routes.ts
docs/mfe-history-review/tools/hist.sh Tutul33__mf-workspace ls-tree -r --name-only eb6d1cc782f44fa05b6a6d83c23edf20487af9db -- projects/customer-app/public projects/host-app/public projects/orders-app/public
```

A primeira tentativa do comando log foi bloqueada ao gravar commands.log, antes de consultar o clone; a repetição autorizada concluiu. Não houve falha por objeto ausente. A comparação abaixo foi executada antes e depois das consultas, com igualdade em ambas:

```sh
LC_ALL=C docs/mfe-history-review/tools/fingerprint.sh | cmp - docs/mfe-history-review/tools/fingerprint-before.txt
```

## Resumo

Commits até o snapshot: 5 (2025-11-18 a 2025-11-18). Pontos: 4 (esclarecido: 4, inconclusivo: 0, resolvido pelo snapshot: 0).
