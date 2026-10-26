---
schema: 1
id: 1016015339
full_name: raxsj/auth-mfe
url: https://github.com/raxsj/auth-mfe
commit: 8cbfd69064acc826225c0c2fc306f60642c765db
classification: Non-MFE
checklist: { q1: no, q2: yes, q3: undetermined, q4: undetermined, q5: no }
repo_type: production
approaches: []
ui_technologies: [react]
build_tools: []
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 365 — raxsj/auth-mfe

## Contexto

Cópia, com histórico, da aplicação `@edx/frontend-app-authn` (`package.json:2`), a MFE de autenticação da Open edX: “a micro-frontend application responsible for the login, registration and password reset functionality” (`README.rst:11`). É uma SPA React com `@edx/frontend-platform`. Uma das rotas, `EmbeddableRegistrationPage`, é feita para ser embutida numa página externa: ao concluir o registro, avisa o `window.parent` por `postMessage` (`src/register/components/EmbeddableRegistrationPage.jsx:114–117`).

O branch padrão do repositório é `embeddable-registration-form`. Os dois últimos commits, do titular `rax` e feitos na interface do GitHub, alteram só `src/MainApp.jsx` e comentam o import de `Logistration` e a rota de login com `#`, sintaxe que não é comentário válido em JSX (`src/MainApp.jsx:24`, `46–51`). O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:366` registra rank 365, ID 1016015339, status `cloned`, branch `embeddable-registration-form` e o commit do front matter, que é o HEAD do clone e de `origin/embeddable-registration-form`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:366` registra a estratégia `terminology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:16103` (`unknown`) e `data/discovery/mfe-round-002/candidates.csv:16107` (`pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos dois hits em cada rodada, do endpoint `repositories`, com subconsulta `…#created:2025-07` e `path` vazio:

| Consulta (`q`) | Coleta 001 / 002 (UTC) |
|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | 2026-10-07T22:23:25.993Z / 2026-10-08T15:55:00.383Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | 2026-10-07T22:55:12.654Z / 2026-10-08T16:06:06.142Z |

As consultas efetivas acrescentam `pushed:>=2025-04-01 created:2025-07-01..2025-07-31`.

Metadados do hit:
- descrição nula, sem tópicos, linguagem JavaScript, `fork: false`, tamanho 21.088;
- branch padrão `embeddable-registration-form`;
- criação em 2025-07-08T11:11:16Z, push em 2025-07-08T11:19:14Z.

Grafias no `README.rst`:
- “micro-frontend”: `README.rst:11` e `:53` (“The authentication micro-frontend also requires…”);
- “micro-frontends”: `README.rst:51` (“All micro-frontends have a shared set of required environment variables…”).

A última alteração do README é `54319c6` (2023-05-04), anterior às coletas de outubro de 2026. O README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 260 entradas, 250 arquivos regulares `100644` e 10 executáveis `100755` (dotfiles, `LICENSE` e alguns arquivos de `src/`); zero symlinks e zero gitlinks. Uma única aplicação (`src/`, `public/`, `webpack.prod.config.js` sobre `@edx/frontend-build`). | contexto |
| Unidade embutível | `src/MainApp.jsx:42–45`: rota `REGISTER_EMBEDDED_PAGE`, liberada só com o parâmetro `host` (`src/common-components/EmbeddedRegistrationRoute.jsx:13–22`). `EmbeddableRegistrationPage.jsx:114–117`: `window.parent.postMessage({ action: REDIRECT, … }, host)`. A página é feita para ser carregada por uma página hospedeira externa, que não está no repositório. | moderada |
| Plataforma | `README.rst:11–13`, `29`, `51`: MFE da Open edX, implantada com o Devstack e configurada por variáveis comuns a todas as MFEs da plataforma. | contexto |
| Alteração do titular | `68ee3f7` e o SHA `8cbfd69` (2025-07-08, “Update MainApp.jsx”, autor `rax`, committer `GitHub`) alteram só `src/MainApp.jsx`, deixando `#import …` e `# <Route …>` (`:24`, `46–51`), que não são comentários válidos em JSX. | contexto |
| Busca de mecanismos | `git grep` em `src/` por `<iframe`, `federation` e `remoteEntry`: nada. O único vínculo externo é o `postMessage` ao `parent`. | ausente |

## Autoria e histórico

Clone não raso:
- **Histórico do SHA:** 1.049 commits, 137 merges, de 2020-09-28 a 2025-07-08, quase todos de mantenedores e bots da Open edX/2U (Zainab Amir, renovate, Waheed Ahmed, Syed Sajjad Hussain Shah).
- **Refs:** 1.515 commits em todos os refs, com 38 branches remotos (`master`, `open-release/*`, `2u-main` etc.), não considerados.
- **Titular:** só os dois commits de `rax` em `src/MainApp.jsx`.

Nenhum blob histórico foi lido e não houve objeto ausente.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Uma única unidade frontend; a página hospedeira que embutiria o registro não está no repositório nem é referenciada por configuração de composição. |
| Q2 | Yes | A aplicação tem build e implantação próprios (`package.json`, `fedx-scripts`). |
| Q3 | Undetermined | A página é feita para ser embutida por um host externo (`postMessage` ao `parent`), mas esse host não é observável. |
| Q4 | Undetermined | O mecanismo seria a incorporação por iframe pela página externa, não configurada aqui. |
| Q5 | No | MFE da plataforma Open edX, de terceiros, copiada com alterações mínimas, como nos finais 037/010/035. |

## Motivo

- `Non-MFE` pelo vetor do final 037 (q1 no, q2 yes, q3/q4 undetermined, q5 no). A unidade pertence a um ecossistema de plataforma de terceiros (Open edX) e não a uma decomposição do autor do repositório.
- Também não seria `MFE-unit` comum: o “host externo” é o site da plataforma, e o mecanismo, iframe com `postMessage`, cai na decisão em aberto sobre iframe.
- **Comparação:** como 218 (cópia de pacote Open edX) e 348 (cópia da Learning MFE). Diferentemente de 348, aqui não há outra unidade referenciada pela aplicação.
- **Campos:**
  - `frontend_units: 1`, `unit_organization: single-unit`, `approaches: []`;
  - `ui_technologies: [react]`, `build_tools: []` (build encapsulado em `@edx/frontend-build`, como em 218);
  - `repo_type: production` (aplicação de produção da Open edX).
- Não há decisão aberta.

## Notas para análise

- **RQ2:** registro embutível com `postMessage` ao `parent` restrito ao `host` informado na URL, um padrão de integração da plataforma Open edX/2U.
- **Protocolo (amostra):** a mesma conta tem `raxsj/brand-digcomp` e `raxsj/edly-io-brand` nas rodadas, fora da amostra e não inspecionados. O branch padrão do repositório não é o principal do upstream.
- **Protocolo (busca):** as grafias estão literalmente no `README.rst`. A elegibilidade muda de `unknown` (001) para `pass` (002).
