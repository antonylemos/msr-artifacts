---
schema: 1
id: 969679126
full_name: Ba5ik7/seed-mfe-remote
commit: 3565dd875bd5bd89f14f88b1325e00aeb11cdf96
inputs:
  clone: data/samples/mfe-sample-001/repos/Ba5ik7__seed-mfe-remote
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 368 — Ba5ik7/seed-mfe-remote

## Leitura do repositório

Há dois commits até o snapshot, de 2025-04-19 a 2025-04-20. `b95ce7d` (2025-04-19, “initial commit”) registra a primeira presença observável dos arquivos da raiz, incluindo `angular.json`, `package.json` e README; não contém os projetos em `projects/`. `3565dd8` (2025-04-20, “INIT”), o snapshot, adiciona os projetos `demo` e `seed-mfe-remote`, incluindo suas configurações webpack, componentes e rotas, e altera os arquivos da raiz. O log com nomes e status permite situar a introdução desses caminhos; não informa onde o código foi elaborado antes de entrar neste histórico.

A configuração `remotes.seedMfeRemote` do demo e seus dois consumidores por URL foram adicionados no mesmo commit. O conteúdo dos três arquivos está disponível no clone e foi conferido: as chamadas já usam `remoteEntry` explícito, sem consultar o nome de `remotes`. Não há um estágio anterior desses arquivos no histórico observado. Isso esclarece a coexistência desde a introdução, sem demonstrar abandono, intenção ou uso anterior fora deste repositório. As demais revisões não deixam dependência, unidade, construção, relação, deploy ou afirmação documental indeterminados que exijam consulta histórica.

## Pontos

| # | Ponto | Origem | Pergunta | Commits | Resultado |
|---|---|---|---|---|---|
| 1 | A entrada `remotes.seedMfeRemote`, sem uso pelas chamadas por URL, pertence a um estágio anterior da composição? | 3.4.4 Notas (docs/mfe-source-review/368-Ba5ik7__seed-mfe-remote.md:42; projects/demo/webpack.config.js:5-7); 3.4.5 relação #1 e Observações (docs/mfe-composition-review/368-Ba5ik7__seed-mfe-remote.md:27, :39) | estágios em conflito | b95ce7d, 2025-04-19, initial commit; 3565dd8, 2025-04-20, INIT | esclarecido |

## Observações

**1. Declaração de remote e carregamento por URL.** O log completo até o snapshot mostra que `projects/demo/webpack.config.js`, `projects/demo/src/app/app.component.ts` e `projects/demo/src/app/app.routes.ts` foram adicionados em `3565dd8` (2025-04-20, “INIT”), sem versões anteriores nesses caminhos. O conteúdo consultado mostra `remotes.seedMfeRemote` na configuração (linhas 5-7) e, simultaneamente, `loadRemoteModule` com `type: 'module'`, `remoteEntry` explícito e `exposedModule: './RemoteWidget'` no componente (linhas 26-30) e na rota (linhas 8-12). Portanto, nos artefatos consultados, não há transição de um consumo pelo nome declarado para o consumo por URL: ambos já coexistem na introdução dos arquivos. O resultado se limita a essa constatação; não prova que a entrada tenha sido abandonada, planejada ou copiada. O julgamento do snapshot permanece o das revisões anteriores: a composição está ativa pelas chamadas por URL, e a entrada nominal não é usada por elas.

## Comandos

Executados a partir da raiz de `repo-miner`, com todas as consultas limitadas ao snapshot. A primeira tentativa do comando `log` foi impedida pela permissão de escrita no `commands.log`, antes de executar o Git; a repetição com a permissão necessária concluiu. Nenhuma consulta falhou por objeto ausente.

```sh
LC_ALL=C docs/mfe-history-review/tools/fingerprint.sh | cmp - docs/mfe-history-review/tools/fingerprint-before.txt
docs/mfe-history-review/tools/hist.sh Ba5ik7__seed-mfe-remote log --reverse --format='%H %ad %s' --date=short --name-status 3565dd875bd5bd89f14f88b1325e00aeb11cdf96
docs/mfe-history-review/tools/hist.sh Ba5ik7__seed-mfe-remote rev-list --count 3565dd875bd5bd89f14f88b1325e00aeb11cdf96
docs/mfe-history-review/tools/hist.sh Ba5ik7__seed-mfe-remote show 3565dd875bd5bd89f14f88b1325e00aeb11cdf96:projects/demo/webpack.config.js
docs/mfe-history-review/tools/hist.sh Ba5ik7__seed-mfe-remote show 3565dd875bd5bd89f14f88b1325e00aeb11cdf96:projects/demo/src/app/app.component.ts
docs/mfe-history-review/tools/hist.sh Ba5ik7__seed-mfe-remote show 3565dd875bd5bd89f14f88b1325e00aeb11cdf96:projects/demo/src/app/app.routes.ts
LC_ALL=C docs/mfe-history-review/tools/fingerprint.sh | cmp - docs/mfe-history-review/tools/fingerprint-before.txt
```

As comparações antes e depois das consultas terminaram com código 0, sem diferenças na impressão digital dos clones.

## Resumo

Commits até o snapshot: 2 (2025-04-19 a 2025-04-20). Pontos: 1 (esclarecido: 1, inconclusivo: 0, resolvido pelo snapshot: 0).
