---
schema: 1
id: 1175499187
full_name: LucasSCSilv/TestTask_Valor-Software_finance-tracker
url: https://github.com/LucasSCSilv/TestTask_Valor-Software_finance-tracker
commit: 4d31c68b3991d95f208f27b6ab210411c5b16567
classification: Uncertain
checklist: { q1: yes, q2: yes, q3: yes, q4: undetermined, q5: undetermined }
repo_type: example
approaches: [module-federation]
ui_technologies: [react]
build_tools: [vite]
frontend_units: 2
unit_organization: multi-repo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 201 — LucasSCSilv/TestTask_Valor-Software_finance-tracker

## Contexto

“FinTrack”, aplicação React + Vite + Supabase de finanças pessoais com login, dashboard, transações, receitas, orçamento e categorias (`README.md:1–5`; `src/App.jsx:43–55`). A rota `/reports` carrega um módulo federado externo: `lazy(() => import('finance_tracker_reports/reports'))`, com o comentário “Reports is loaded remotely from finance-tracker-reports via Module Federation. Zephyr resolves the URL automatically at runtime.” (`src/App.jsx:12–14`, `50`). A configuração de build no snapshot, porém, é a de um remote: `name: 'finance_tracker_reports'`, `exposes: { './Reports': './src/Reports.jsx' }`, sem `remotes` (`vite.config.js:6–16`). O arquivo exposto não existe no snapshot, e `package.json` também se chama `finance-tracker-reports` (`package.json:2`). O `package-lock.json` pertence a outro manifesto, `test-task-valor-software` (`package-lock.json:2`, `7–25`). O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:202` registra rank 201, ID 1175499187, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:202` registra a estratégia `technology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:26049` (`unknown`) e `data/discovery/mfe-round-002/candidates.csv:26056` (`pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna um hit por rodada, do endpoint `code`:

| Consulta (`q`) | Subconsulta / consulta efetiva | `path` | Coleta 001 / 002 (UTC) |
|---|---|---|---|
| `technology-module-federation-package-code`: `"@module-federation" filename:package.json` | `technology-module-federation-package-code#size:600..699` / `"@module-federation" filename:package.json size:600..699` | `package.json` | 2026-10-07T18:20:45.384Z / 2026-10-08T15:36:05.759Z |

O `package.json` tem 614 bytes no SHA, dentro da faixa, e contém `"@module-federation/vite": "^1.1.6"` (`package.json:18`). Foi adicionado em `d716676` (2026-03-08) e não foi alterado depois. Os metadados do hit de código não trazem descrição, tópicos nem datas. A entrada é só por código; o README não contém termos de MFE (só Zephyr Cloud, `README.md:5`, `13`, `103–110`). A última alteração do README é `bfab541` (2026-03-09), anterior às coletas de outubro de 2026.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 20 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. Um único projeto Vite (`index.html`, `src/` com `App.jsx`, `main.jsx`, `components/layout.jsx`, `context/AuthContext.jsx`, `lib/supabase.js` e seis páginas). Não há `src/Reports.jsx` nem outra aplicação. | contexto |
| Código-fonte (consumo) | `src/App.jsx:12–14`: import dinâmico do especificador federado `finance_tracker_reports/reports`. `:16–27`: `ReportsWrapper` passa `userId` ao componente remoto dentro de `Suspense`. `:50`: rota `/reports`. `src/components/layout.jsx:9`: item de navegação “Reports”. | moderada |
| Configuração (MF) | `vite.config.js:4`, `6–16`, `21`: `federation(mfConfig)` com `name: 'finance_tracker_reports'`, `filename: 'remoteEntry.js'`, `exposes './Reports' → './src/Reports.jsx'` e `shared` de `react`/`react-dom` singleton; `:3`, `22`: `withZephyr()`. Não há `remotes`. É a configuração do remote, não a do host que o consome. | ambígua |
| Configuração (coerência) | O arquivo exposto não existe no SHA. O especificador consumido (`/reports`) não coincide com a chave exposta (`./Reports`). O app consumidor tem o mesmo `name` do remote. `react-router-dom` é importado (`src/main.jsx:3`; `src/App.jsx:2`) mas não está em `package.json:10–24`; aparece só no lockfile de outro manifesto (`package-lock.json:15`), cuja entrada raiz (`:7–25`) também não lista `@module-federation/vite` (ele só aparece como pacote resolvido, `:1003`). Não há `zephyr:dependencies` nem outra declaração que diga onde está o remote. | ambígua |
| Código-fonte (fronteiras) | `git grep` por `../..`: nenhuma ocorrência; imports relativos só dentro de `src/`. Não há código da unidade de relatórios. | contexto |
| Busca | `git grep -i` no SHA (exceto lockfile) por `zephyr`, `federation`, `remote`, `micro.?front` e `Reports`: só as linhas citadas acima. | contexto |

## Autoria e histórico

Clone não raso; 6 commits, nenhum merge, todos de Lucas Silv `<lucasscsilv@outlook.com>`, de 2026-03-07 (`dbca30e`, “Initial commit”, só `README.md`) a 2026-03-09 (SHA `4d31c68`):
- `d716676` (2026-03-08, “commit”): adiciona o projeto inteiro e `.__mf__temp/finance_tracker_reports/localSharedImportMap.js`, artefato gerado pelo plugin de federação (o `.gitignore:6` ignora `__mf__temp/`, sem o ponto inicial);
- `a3a1150` (2026-03-08, “Update App.jsx”): altera `src/App.jsx`;
- `2fd0d56` e `bfab541` (2026-03-09): editam o README pela interface web;
- SHA `4d31c68` (2026-03-09): remove o diretório `.__mf__temp/finance_tracker_reports`.

O blob anterior de `src/App.jsx` (`d716676`, `46d4070`) e o de `localSharedImportMap.js` (`76a2f98`) estão ausentes no clone e não foram buscados; não se sabe o que `a3a1150` alterou. O artefato `__mf__temp` com nome `finance_tracker_reports` indica que esta configuração de remote foi executada localmente, mas o snapshot não contém a fonte exposta.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | Yes | O app referencia explicitamente uma unidade externa por especificador federado (`src/App.jsx:12–14`), como no host que referencia remote externo de 087. |
| Q2 | Yes | A unidade de relatórios é outro projeto (“finance-tracker-reports”, `src/App.jsx:12`), sem import de código-fonte; este repositório tem build próprio (`package.json:5–9`). |
| Q3 | Yes | O app monta o componente remoto na rota `/reports` (`src/App.jsx:16–27`, `50`). |
| Q4 | Undetermined | Há Module Federation configurado (`vite.config.js:6–16`, `21`), mas como remote, expondo arquivo inexistente e sem `remotes`; o consumo depende de resolução pelo Zephyr não declarada no repositório. Pelo critério, “a configuration whose actual use is unclear is Undetermined”. |
| Q5 | Undetermined | Nenhuma resposta No e Q4 Undetermined. |

## Motivo

- `Uncertain` pela regra “No question is No, but at least one is Undetermined”, com `status: review`.
- **Lado consumidor:** o código monta um remote externo por rota, como 087. Diferentemente de 087, a configuração do host não declara o remote; a resolução é atribuída ao Zephyr só em comentário (`src/App.jsx:13`). Faltam URL e variável de ambiente, o que é mais fraco que 145.
- **Lado configurado:** a configuração de MF é a do próprio remote de relatórios, com fonte exposta ausente. O snapshot parece misturar o host com a configuração copiada do projeto do remote (mesmo `name` em `vite.config.js:7` e `package.json:2`; lockfile de outro manifesto).
- **Campos:** `approaches: [module-federation]`, `ui_technologies: [react]`, `build_tools: [vite]`, `frontend_units: 2` (este app e o remote de relatórios externo), `unit_organization: multi-repo`. `repo_type: example`: tarefa de avaliação técnica, conforme o lockfile `test-task-valor-software` (`package-lock.json:2`), sem uso em produção documentado.

## Notas para análise

- **RQ2:** Module Federation em Vite com Zephyr Cloud, em que a resolução do remote fica a cargo da plataforma de deploy, sem declaração de `remotes` no repositório.
- **RQ1 (sinais enganosos):** o `@module-federation/vite` do `package.json` é real e está ligado no build, mas a configuração contradiz o papel do app no código.
- **Protocolo (busca):** entrada só por busca de código no `package.json`. A elegibilidade muda de `unknown` (001) para `pass` (002).
- **Protocolo (snapshot):** dois blobs históricos ausentes no clone parcial, não buscados.

## Decisão registrada

Mantido como `Uncertain`. O import federado e a montagem do componente remoto existem, mas a configuração disponível define este projeto como remote, expõe um arquivo ausente e não declara a origem do remoto consumido. A resolução pelo Zephyr é apenas comentada, sem configuração verificável no snapshot.
