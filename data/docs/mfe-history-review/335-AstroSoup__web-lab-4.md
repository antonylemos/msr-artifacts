---
schema: 1
id: 1105927418
full_name: AstroSoup/web-lab-4
commit: 2214561f8c9cb333f1849a0f1d04ec7ab36220cb
inputs:
  clone: data/samples/mfe-sample-001/repos/AstroSoup__web-lab-4
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 335 — AstroSoup/web-lab-4

## Leitura do repositório

O histórico alcançável até o snapshot tem 29 commits, de 2025-11-28 a 2025-12-08: começa em `4441231` (2025-11-28, “Initial commit”) e termina em `2214561` (2025-12-08, “cleanup x2.”). Os pontos vêm das duas unidades `Undetermined` da revisão estrutural: seus `index.html` apontam para `src/main.js`, mas esses arquivos estão vazios no snapshot. As dependências e as construções de composição estão confirmadas nas revisões anteriores, e não há afirmações documentais a esclarecer.

A consulta dos caminhos mostra a adição da entrada de remote-inputs em `53e46c0` (2025-12-05, “working frontend build.”) e da entrada de remote-results em `f5cb3ef` (2025-12-08, “Deploy configs for frontend.”). As árvores desses commits registram para cada entrada o mesmo objeto vazio encontrado no snapshot; o log dos caminhos não registra modificações posteriores. Isso esclarece a história desses arquivos: não há, nesses caminhos até o snapshot, uma entrada standalone antes funcional que tenha sido esvaziada. Não demonstra intenção nem abandono, nem altera os julgamentos estruturais. Os componentes dos dois remotes já têm primeira presença observável em `53e46c0`; isso não informa onde foram desenvolvidos antes de sua adição ao repositório. Não foi necessário consultar conteúdo histórico ausente: mensagens, estados dos caminhos e identificadores de objetos bastaram para os pontos delimitados.

## Pontos

| # | Ponto | Origem | Pergunta | Commits | Resultado |
|---|---|---|---|---|---|
| 1 | A entrada de remote-inputs está vazia: houve uma entrada standalone anterior neste caminho? | 3.4.3 (frontend/vite/remote-inputs/src/main.js, linha da unidade frontend/vite/remote-inputs) | ativo ou abandonado | 53e46c0, 2025-12-05, working frontend build.; 2214561, 2025-12-08, cleanup x2. | esclarecido |
| 2 | A entrada de remote-results está vazia: houve uma entrada standalone anterior neste caminho? | 3.4.3 (frontend/vite/remote-results/src/main.js, linha da unidade frontend/vite/remote-results) | ativo ou abandonado | f5cb3ef, 2025-12-08, Deploy configs for frontend.; 2214561, 2025-12-08, cleanup x2. | esclarecido |

## Observações

**1. Entrada de remote-inputs.** O snapshot confirma `src/main.js` com 0 bytes e a referência a ele em `frontend/vite/remote-inputs/index.html:11`. O log com estado dos caminhos registra a adição de ambos em `53e46c0` (2025-12-05, “working frontend build.”); depois só o index e a configuração Vite mudam, em `f5cb3ef` (2025-12-08, “Deploy configs for frontend.”). O `ls-tree` da adição e o do snapshot dão a `src/main.js` o mesmo objeto `e69de29bb2d1d6434b8b29ae775ad8c2e48c5391`, que corresponde ao arquivo vazio observado no snapshot. Assim, este arquivo foi adicionado vazio e permaneceu assim no histórico consultado; não há evidência de esvaziamento de uma entrada standalone anterior neste caminho. Isso não prova que a unidade foi abandonada: o componente exposto continua consumido pelo host, como registra a 3.4.5 #1. O resultado esclarece somente a permanência da entrada vazia, sem resolver a intenção de execução independente nem mudar o `Undetermined` da 3.4.3.

**2. Entrada de remote-results.** O snapshot também mostra 0 bytes em `src/main.js`, referenciado por `frontend/vite/remote-results/index.html:11`. A árvore de `53e46c0` já contém `ResultsContainer.vue` e `elements/Table.vue`, mas não a entrada `src/main.js`. O log registra a adição do index e dessa entrada em `f5cb3ef` (2025-12-08, “Deploy configs for frontend.”); a árvore desse commit e a do snapshot associam a entrada ao mesmo objeto vazio do ponto 1. Não há mudança posterior nesse caminho. Portanto, nos artefatos consultados, a entrada foi acrescentada já vazia, depois da primeira presença observável dos componentes, e não resulta da remoção de um bootstrap standalone nesse arquivo. A evidência não explica por que foi criada assim nem demonstra abandono; o consumo federado do componente permanece documentado na 3.4.5 #2. O `Undetermined` estrutural permanece como julgamento do snapshot.

## Comandos

A comparação abaixo foi executada antes e depois das consultas, com saída vazia e código 0 nas duas ocasiões:

```sh
LC_ALL=C docs/mfe-history-review/tools/fingerprint.sh | cmp - docs/mfe-history-review/tools/fingerprint-before.txt
```

```sh
docs/mfe-history-review/tools/hist.sh AstroSoup__web-lab-4 log --format='%h %ad %s' --date=short 2214561f8c9cb333f1849a0f1d04ec7ab36220cb
docs/mfe-history-review/tools/hist.sh AstroSoup__web-lab-4 log --format='%h %ad %s' --date=short --name-status --no-renames 2214561f8c9cb333f1849a0f1d04ec7ab36220cb -- frontend/vite/remote-inputs/src/main.js frontend/vite/remote-results/src/main.js frontend/vite/remote-inputs/index.html frontend/vite/remote-results/index.html frontend/vite/remote-inputs/vite.config.js frontend/vite/remote-results/vite.config.js frontend/vite/host/src/pages/MainPage.vue
docs/mfe-history-review/tools/hist.sh AstroSoup__web-lab-4 ls-tree -r 53e46c0 -- frontend/vite/remote-inputs/src/main.js frontend/vite/remote-results/src/main.js frontend/vite/remote-results/src frontend/vite/remote-inputs/src
docs/mfe-history-review/tools/hist.sh AstroSoup__web-lab-4 ls-tree -r 2214561f8c9cb333f1849a0f1d04ec7ab36220cb -- frontend/vite/remote-inputs/src/main.js frontend/vite/remote-results/src/main.js
docs/mfe-history-review/tools/hist.sh AstroSoup__web-lab-4 ls-tree -r f5cb3ef -- frontend/vite/remote-results/src/main.js
```

A primeira tentativa do segundo comando foi bloqueada pelo ambiente ao abrir `commands.log`, antes de executar Git; a repetição com acesso ao log foi bem-sucedida. Todas as revisões históricas consultadas são ancestrais do snapshot, identificadas no primeiro log. Não houve falhas por objeto ausente.

## Resumo

Commits até o snapshot: 29 (2025-11-28 a 2025-12-08). Pontos: 2 (esclarecido: 2, inconclusivo: 0, resolvido pelo snapshot: 0).
