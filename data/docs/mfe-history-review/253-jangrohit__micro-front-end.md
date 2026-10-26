---
schema: 1
id: 1176812762
full_name: jangrohit/micro-front-end
commit: c6c0dbc9fb78b8baab20e74394647ca40b521355
inputs:
  clone: data/samples/mfe-sample-001/repos/jangrohit__micro-front-end
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 253 — jangrohit/micro-front-end

## Leitura do repositório

O histórico até o snapshot tem 15 commits, de 2026-03-09 a 2026-09-27. O primeiro, `f107f7b` (2026-03-09, “initial commit”), adiciona em bloco os quatro diretórios de pacotes, incluindo os arquivos de composição de container e marketing. Essa é a primeira presença observável desses artefatos, sem evidência de onde foram desenvolvidos antes. As revisões 3.4.2 a 3.4.6 não deixam dependências, unidades, construções, relações ou deploy com resultado indeterminado que exija investigação histórica.

Os dois pontos vêm das afirmações contraditas na revisão documental. O histórico esclarece a ordem entre workflows e README: o workflow do container é adicionado em `5d05e98` (2026-09-27, “created git action for container”); o do marketing, em `e002f80` (2026-09-27, “update config”). Foi possível ler os dois workflows na versão de `e002f80`, já com build, publicação no S3 e invalidação de CloudFront. O README só é adicionado depois, no snapshot `c6c0dbc` (2026-09-27, “Create README.md”). Portanto, a frase que nega pipeline não documenta um estágio anterior à presença desses arquivos. A outra contradição, sobre roteadores aninhados, resolve-se pelo próprio snapshot, sem consulta histórica específica.

## Pontos

| # | Ponto | Origem | Pergunta | Commits | Resultado |
|---|---|---|---|---|---|
| 1 | O README nega a existência de pipeline de publicação, mas há dois workflows de deploy. | 3.4.6 (Leitura do repositório, contradição em README.md:104); 3.4.7 #22 | estágios em conflito | 5d05e98, 2026-09-27, created git action for container; e002f80, 2026-09-27, update config; c6c0dbc, 2026-09-27, Create README.md | esclarecido |
| 2 | O README interpreta os BrowserRouter do host e do remote como aninhados na mesma árvore de componentes. | 3.4.7 #23 | estágios em conflito | — | resolvido pelo snapshot |

## Observações

**1. Pipeline negado pelo README.** O log com nomes e estados dos arquivos registra a adição de `.github/workflows/container.yml` em `5d05e98` e de `.github/workflows/marketing.yml` em `e002f80`, ambos em 2026-09-27. A leitura dos dois arquivos em `e002f80` confirma `npm run build`, `aws s3 sync` para os prefixos próprios de container e marketing e invalidação de CloudFront. Nenhum commit posterior até o snapshot altera esses workflows; `c6c0dbc` apenas adiciona `README.md`, cujo texto em README.md:104 nega a existência do pipeline. Assim, os artefatos de publicação já existiam quando a afirmação apareceu, e não há no histórico consultado uma versão anterior do README que corresponda ao estágio sem workflows. Isso esclarece a cronologia da contradição, mas não a razão de sua escrita, uma possível origem externa ou se os jobs chegaram a executar. Não demonstra abandono dos workflows nem altera o deploy registrado na 3.4.6.

**2. Roteadores interpretados como aninhados.** O próprio snapshot distingue a árvore DOM da árvore React: packages/container/src/App.js:17-20 coloca o wrapper dentro do BrowserRouter do host, mas packages/marketing/src/bootstrap.js:5-7 monta `<App />` por uma chamada própria a `ReactDOM.render` no elemento recebido. O BrowserRouter de packages/marketing/src/App.js:14-19 pertence a essa raiz separada. Isso resolve a interpretação de README.md:108 sem precisar postular estágios distintos do código. O possível efeito dos dois roteadores no histórico do navegador não foi executado nem verificado; a conclusão se limita à separação das árvores de componentes já registrada na 3.4.7.

## Comandos

Comparações de integridade executadas antes e depois das consultas, ambas sem diferenças:

```sh
LC_ALL=C docs/mfe-history-review/tools/fingerprint.sh | cmp - docs/mfe-history-review/tools/fingerprint-before.txt
```

Consultas limitadas ao snapshot ou a seu ancestral `e002f80`:

```sh
docs/mfe-history-review/tools/hist.sh jangrohit__micro-front-end log --reverse --format='%h %cs %s' --name-status c6c0dbc9fb78b8baab20e74394647ca40b521355
docs/mfe-history-review/tools/hist.sh jangrohit__micro-front-end rev-list --count c6c0dbc9fb78b8baab20e74394647ca40b521355
docs/mfe-history-review/tools/hist.sh jangrohit__micro-front-end show e002f80:.github/workflows/container.yml e002f80:.github/workflows/marketing.yml
```

## Resumo

Commits até o snapshot: 15 (2026-03-09 a 2026-09-27). Pontos: 2 (esclarecido: 1, inconclusivo: 0, resolvido pelo snapshot: 1).
