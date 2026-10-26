---
schema: 1
id: 609925864
full_name: reza-talebii/travel-agency
url: https://github.com/reza-talebii/travel-agency
commit: 92756e2cf13da1a03cdcc16d03bcc6c3e0f6be05
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

# 180 — reza-talebii/travel-agency

## Contexto

Projeto full stack de agência de viagens: um frontend Next.js 13 (App Router) em `clients/main/` e uma API Node/Express em `server/` (`README.md:3–7`). O README lista “micro front” como recurso (`README.md:12`), e `@module-federation/nextjs-mf` está declarado no `package.json` do cliente (`clients/main/package.json:13`). Mas a configuração do Next não usa o plugin (`clients/main/next.config.js:1–8`) e só existe um cliente em `clients/`. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:181` registra rank 180, ID 609925864, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:181` registra a estratégia `terminology` e elegibilidade `unknown`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:5632` (`pass`) e `data/discovery/mfe-round-002/candidates.csv:5637` (`unknown`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna um hit por rodada, do endpoint `repositories` e com `path` vazio:

| Consulta (`q`) | Subconsulta | Consulta efetiva | Coleta 001 / 002 (UTC) |
|---|---|---|---|
| `terminology-topic-microfrontend`: `topic:microfrontend` | `terminology-topic-microfrontend` (sem partição) | `topic:microfrontend pushed:>=2025-04-01` | 2026-10-07T18:18:27.988Z / 2026-10-08T15:34:14.267Z |

Metadados do hit:
- descrição “…ull stack airline agency project with next js, typescript, nodejs”;
- tópicos `axios`, `figma`, `microfrontend`, `nextjs`, `nextjs13`, `nodejs`, `react`, `storybook`, `styled-components` e `typescript`;
- linguagem TypeScript, `fork: false`, tamanho 16.631;
- criação em 2023-03-05T16:42:49Z, push em 2026-06-08T16:22:57Z.

O acerto vem do tópico `microfrontend` declarado no repositório, não do README. No README a grafia relacionada é só “micro front” (`README.md:12`). A última alteração do README é o próprio SHA, `92756e2` (2026-06-08), anterior às coletas de outubro de 2026. O README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 273 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. Há `README.md`, `clients/main/` (único diretório em `clients/`, um app Next.js com `app/`, `components/`, `layout/`, `modules/`, `services/` etc.) e `server/` (Express com controllers, rotas e acesso a dados). | contrária |
| Configuração | `clients/main/package.json:13`: `@module-federation/nextjs-mf` ^6.1.3 declarado. `clients/main/next.config.js:1–8`: só `experimental.appDir`, sem `NextFederationPlugin`. `git grep` no SHA (exceto lockfiles) por `NextFederationPlugin`, `nextjs-mf`, `remoteEntry`, `federation` e `micro.?front` só acha `package.json:13` e `README.md:12`. É dependência declarada e não usada. | contrária |
| Código-fonte (fronteiras) | Os imports de `clients/main` ficam no próprio projeto; a busca por imports `../../../` não retorna nada. O design system vem de pacotes npm (`golobe-design-system`, `golobe-ui`, `clients/main/package.json:24–25`), sem unidade frontend referenciada por composição. | contexto |
| Documentação | `README.md:10–16`: recursos planejados ou implementados (“micro front”, “next13 app dir”, biblioteca de design system, multilanguage, storybook) e link para um repositório de design system. O projeto se declara “being developed” (`README.md:7`). | fraca |

## Autoria e histórico

Clone não raso. Há 54 commits em todos os refs, com 4 merges, do mesmo titular: “reza_talebi” (43), “reza talebi” (3) e a identidade noreply (8). A raiz é `c94af4c` (2023-03-05). O desenvolvimento do código é de 2023. Os três últimos commits do branch padrão (`f84419d`, `10792a7` e o SHA `92756e2`, de 2026-05 e 2026-06) só alteram o README; neles foram acrescentadas linhas de configuração de proxy sem relação com o projeto (`README.md:37–53`), que não foram reproduzidas aqui. São esses commits que mantêm o `pushed_at` recente. Os branches `arbitazh`, `bank-account`, `design-stysm`, `implemet-signUp`, `landing` e `server` não foram considerados. O `git log -S` sobre `nextjs-mf` não completou por blob ausente no clone parcial (`e43d057d…`), que não foi buscado; o clone ficou inalterado.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Uma única unidade frontend (`clients/main`); nenhuma configuração de composição referencia outras unidades. |
| Q2 | No | Não há segunda unidade frontend cuja independência possa ser avaliada; `server/` é backend. |
| Q3 | No | Não há host compondo unidades. |
| Q4 | No | O plugin de federação só está declarado (`clients/main/package.json:13`) e não é configurado (`next.config.js:1–8`): “A declared dependency alone is No”. |
| Q5 | No | Q1–Q4 são No: app Next.js com intenção declarada de micro-frontend não implementada. |

## Motivo

- `Non-MFE` pela regra “at least one question is No”. Corresponde a “MFE-related dependencies that are unused or experimental” e a “repositories mentioning micro-frontends without implementing them”.
- Há uma aplicação real, por isso `frontend_units: 1` e `single-unit`. `ui_technologies: [react, next]`, `build_tools: []` (Next encapsula o bundler). `repo_type: other`: projeto full stack em desenvolvimento (o README não o identifica como tutorial, exemplo ou prova de conceito, e a descrição anterior de "projeto pessoal de portfólio" não é sustentada pelas fontes citadas).
- Não é host incompleto, como em 097/103/104: não há nenhuma configuração de `remotes` nem consumo de módulo remoto a avaliar.
- Não há decisão aberta.

## Notas para análise

- **RQ1 (sinais enganosos):** tópico `microfrontend` e dependência `@module-federation/nextjs-mf` declarada sem uso. A entrada se dá pela consulta de tópico, não por conteúdo.
- **Protocolo (elegibilidade):** a elegibilidade vai de `pass` (001) a `unknown` (002), ao contrário do padrão mais comum, e a razão está nos dados: na rodada 002 a regra `recent-push` passa e `recent-human-commit` fica `unknown` por `activity_incomplete` (cobertura de `commit_history` pendente), isto é, coleta incompleta, e não incerteza arquitetural. O `pushed_at` recente se deve a edições de README sem relação com o projeto.
- **Protocolo (conteúdo):** o README do SHA contém strings de configuração de proxy acrescentadas em 2026, e os commits mostram que o README foi alterado, mas não demonstram quem inseriu o conteúdo nem por quê; a hipótese de uso indevido da conta é especulativa e não se afirma. Os trechos não foram copiados.
- **Contribuição da revisão independente (Lupa):** concordância com Non-MFE e Q1–Q5 No (uma aplicação Next.js em `clients/main` e um backend Express em `server`, sem segunda unidade, host ou mecanismo de composição; a dependência e o README de Module Federation são sinais de busca, não evidência de integração) e com `draft`. Divergências adotadas: `repo_type` passou de `example` para `other`, pela falta de evidência de exemplo; a razão do `unknown` na rodada 002 (`activity_incomplete`, verificada em `candidates.csv:5637`) foi registrada; e a hipótese de uso indevido da conta, a partir dos textos de proxy em `README.md:37–53`, foi qualificada como especulativa. A autoria completa por diretório fica limitada pelo clone parcial.
