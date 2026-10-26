---
schema: 1
id: 1376740344
full_name: masudursourav/The-Architect-s-Codex
url: https://github.com/masudursourav/The-Architect-s-Codex
commit: b8bca2f1bd65a01e5b63a056975aef3fcdfc5713
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: other
approaches: []
ui_technologies: [react, next]
build_tools: []
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 183 — masudursourav/The-Architect-s-Codex

## Contexto

“The Architect's Codex” (`README.md:1–9`): aplicação Next.js que funciona como livro interativo de system design, de frontend e backend. O conteúdo dos capítulos está em módulos de dados TypeScript (`src/data/*.ts`). Um desses capítulos trata de micro-frontends e traz, como string de exemplo, uma configuração de `ModuleFederationPlugin` (`src/data/frontendTopics.ts:1031–1080`). Não há composição de frontends: o repositório é uma única aplicação de conteúdo. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:184` registra rank 183, ID 1376740344, status `cloned`, branch `master` e o commit do front matter, que é o HEAD do clone e de `origin/master`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:184` registra a estratégia `technology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:37578` (`unknown`) e `data/discovery/mfe-round-002/candidates.csv:37610` (`pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna um hit por rodada, do endpoint `code`:

| Consulta (`q`) | Subconsulta | `path` | Coleta 001 / 002 (UTC) |
|---|---|---|---|
| `technology-module-federation-plugin-ts-code`: `ModuleFederationPlugin remotes extension:ts` | `…#size:>=10000` | `src/data/frontendTopics.ts` | 2026-10-07T22:40:54.148Z / 2026-10-08T16:19:55.118Z |

O arquivo casado tem 335.660 bytes no SHA, dentro da faixa. Contém `ModuleFederationPlugin` dentro do template literal de exemplo (`src/data/frontendTopics.ts:1068`; também `:2864`) e “remotes” em texto do capítulo (`:1132`, `1162`). Os metadados do hit de código não trazem descrição, tópicos nem datas. O acerto não depende do README, que não menciona micro-frontends nem Module Federation; ele vem do commit-raiz `e80e4e0` (2026-09-19) e não foi alterado depois, sendo anterior às coletas de outubro de 2026.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 34 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. Há um único projeto Next.js (App Router): `src/app/`, `src/components/` (navegação, `TopicView`, simuladores interativos), `src/data/` (conteúdo) e `next.config.ts`. | contrária |
| Configuração / Build | `next.config.ts:3–5`: configuração vazia. `package.json:5–21`: `next` 16.3.5, React 19.2.8, sem dependência de federação. | contrária |
| Conteúdo (sinal da busca) | `src/data/frontendTopics.ts:1031–1043`: tópico `microfrontends-design-systems`. `:1062–1080`: `codeSnippet` com legenda “Webpack Module Federation Configuration Example” e código de um `webpack.config.js` remoto como string. `:1097–1167`: estudos de caso e dicas de entrevista sobre micro-frontends. `:2864`, `2878`: menções em outro capítulo. É material didático exibido pela aplicação, não configuração do repositório. | fraca |
| Busca | `git grep` no SHA, em `src`, por `ModuleFederationPlugin`, `remotes` e `micro.?front`: só os textos de conteúdo acima. | ausente |

## Autoria e histórico

Clone não raso; 3 commits, nenhum merge, todos de Masudur Rahman Sourav `<it19025@mbstu.ac.bd>`: `e80e4e0` (2026-09-19, “complete guide”), `4d164d2` (2026-09-23, “zoom on diagram”) e o SHA `b8bca2f` (2026-09-25, “style updated”). Nenhum blob histórico foi lido e não houve objeto ausente.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Uma única aplicação frontend; nenhuma configuração de composição real. A configuração de federação é texto de capítulo. |
| Q2 | No | Não há segunda unidade cuja independência possa ser avaliada. |
| Q3 | No | Não há host compondo unidades. |
| Q4 | No | Nenhum mecanismo configurado (`next.config.ts:3–5`); `ModuleFederationPlugin` só existe dentro de string (`src/data/frontendTopics.ts:1068`). |
| Q5 | No | Q1–Q4 são No: aplicação de conteúdo sobre system design. |

## Motivo

- `Non-MFE` pela regra “at least one question is No”. Corresponde a “repositories mentioning micro-frontends without implementing them”.
- O sinal é conteúdo didático, como em 023: um exemplo de configuração MF embutido em dados de capítulo capta a busca de código. Há uma aplicação real, por isso `frontend_units: 1` e `single-unit`.
- `ui_technologies: [react, next]`, `build_tools: []` (Next encapsula o bundler). `repo_type: other`: livro digital interativo, sem caráter de exemplo de MFE, template ou biblioteca.
- Não há decisão aberta.

## Notas para análise

- **RQ1 (sinais enganosos):** a busca de código `ModuleFederationPlugin remotes extension:ts` casa com string de exemplo em arquivo de dados `.ts` de 335 KB. É um falso positivo de busca de código por conteúdo textual dentro de código-fonte.
- **Protocolo (busca):** entrada só por busca de código, na faixa `size:>=10000`. A elegibilidade muda de `unknown` (001) para `pass` (002).
- **Contribuição da revisão independente (Lupa):** concordância integral com Non-MFE e Q1–Q5 No; sem divergência nem decisão aberta (`draft`). A decisão se sustenta no conteúdo do commit (uma aplicação Next.js), e não apenas no README ou em palavras-chave. `repo_type: other` descreve uma referência interativa, e não um produto MFE, exemplo de MFE, template ou biblioteca; `build_tools: []` é coerente com a ausência de bundler de unidade explicitamente configurado.
