---
schema: 1
id: 869688095
full_name: betfinio/luro
url: https://github.com/betfinio/luro
commit: 017037cb834474a5a7e1f7f8d439e349910d43d7
classification: MFE-unit
checklist: { q1: no, q2: yes, q3: undetermined, q4: undetermined, q5: no }
repo_type: production
approaches: [module-federation]
ui_technologies: [react]
build_tools: [rsbuild]
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 269 — betfinio/luro

## Contexto

Jogo “Lucky Round” do ecossistema Betfin (`README.md:1`): uma unidade React com Rsbuild e Module Federation 2.0. Ela expõe a rota do jogo, estilos e i18n para um host externo (`rsbuild.config.ts:31–41`) e consome um remote de contexto compartilhado, `betfinio_context`, com hooks de query, utilitários, provider de contexto global, traduções e um `MockRoot` (`rsbuild.config.ts:34–36`; `src/routes/__root.tsx:2–3`). O host Betfin que monta a rota não está no repositório. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:270` registra rank 269, ID 869688095, status `cloned`, branch `dev` (a padrão) e o commit do front matter, que é o HEAD do clone e de `origin/dev`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede (o manifesto remoto não foi consultado).

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:270` registra a estratégia `technology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:10299` (`technology`, `unknown`) e `data/discovery/mfe-round-002/candidates.csv:10305` (`technology`, `pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna um hit por rodada, do endpoint `code`:

| Consulta (`q`) | Subconsulta | `path` | Coleta 001 / 002 (UTC) |
|---|---|---|---|
| `technology-module-federation-package-code`: `"@module-federation" filename:package.json` | `technology-module-federation-package-code#size:2000..2249` | `package.json` | 2026-10-07T19:59:44.705Z / 2026-10-08T15:42:41.920Z |

A consulta efetiva é `"@module-federation" filename:package.json size:2000..2249`. Os metadados do hit de código registram só descrição nula e `fork: false`.

O arquivo casado tem 2.190 bytes no SHA, dentro da faixa, e declara `@module-federation/enhanced` (`package.json:24`) e `@module-federation/rsbuild-plugin` (`package.json:55`). Ele foi alterado pela última vez em `d7fb2c3` (2026-02-10). O acerto não depende do README (`README.md:1`, só o título, sem os termos), alterado pela última vez em `cd044d6` (2024-10-08). Os dois e o SHA (2026-04-06) antecedem as coletas de outubro de 2026.

O mesmo dono tem outros candidatos nas rodadas (`betfinio/stones`, `roulette`, `predict`, `lottery` e `template`; `data/discovery/mfe-round-002/candidates.csv:9600`, `:9708`, `:10107`, `:11028`, `:34598`). Só `luro` está em `sample.csv`; os demais não foram inspecionados, e `betfinio_context` não aparece entre os candidatos.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 78 entradas, 77 arquivos regulares `100644` e 1 executável `100755` (`scripts/railway-build.sh`); zero symlinks e zero gitlinks. Um único projeto: `package.json`, `rsbuild.config.ts`, `src/` (rotas TanStack Router, componentes do jogo, ABIs, queries, traduções), scripts de build/deploy e workflows. `@mf-types/` (tipos gerados do remote) não está versionado. | contexto |
| Configuração (exposição) | `rsbuild.config.ts:31–41`: `pluginModuleFederation({ name: 'betfinio_luro', exposes: { './style': './src/style', './i18n': './src/i18n', './route': './src/routes/games/luro/$interval' }, manifest: true, … })`; `:48`: `shared` de react, react-dom, TanStack Router/Query, i18next, react-i18next e wagmi. `src/routes/games/luro/$interval.tsx:14–20`, `:22–63`: rota/página do jogo exposta. | forte |
| Configuração (consumo) | `rsbuild.config.ts:34–36`: `remotes: { betfinio_context: \`betfinio_context@${process.env.PUBLIC_CONTEXT_URL}/mf-manifest.json\` }`; `.env.example:11`: `PUBLIC_CONTEXT_URL`. `scripts/plugin-fetch-manifest.ts:64–103` e `rsbuild.config.ts:52–56`: no build, baixa assets expostos pelo remote para `@mf-types/source`. `tsconfig.json:17–19`: resolve tipos em `@mf-types`. | moderada |
| Código-fonte (consumo do remote) | Imports de `betfinio_context/…` em 8 arquivos de `src`: `lib/query`, `lib/utils`, `lib/helpers`, `lib/context`, `translations` e `components/MockRoot`. Por exemplo, `src/routes/__root.tsx:2–3`, `:9–17` (`GlobalContextProvider` e `MockRoot` envolvendo o `Outlet`) e `src/i18n.ts:1`, `:13–26` (`sharedLang`). O que se consome são provider, hooks, utilitários e traduções compartilhados. | ambígua |
| Código-fonte (execução isolada) | `src/index.tsx:1` → `src/bootstrap.tsx:7–13`: router próprio montado em `#root`; `__root.tsx` envolve a página com o `MockRoot` do contexto, ou seja, uma raiz simulada para rodar a unidade fora do host. | moderada |
| Código-fonte (fronteiras) | Busca ativa de imports relativos em `src`: só `../lib/*` e `../../lib/*` dentro do próprio projeto (por exemplo, `src/components/PlaceBet/PlaceBet.tsx:6–8`; `src/components/RoundMyInfo.tsx:6–7`). Nenhum import de código-fonte de outra unidade; o contexto entra só pelo módulo federado. | contexto |
| Build/deploy | `package.json:7`, `:11`: build Rsbuild e servidor estático próprio (`scripts/server.ts:6–22`); `railway.json:3–9` e `scripts/railway-build.sh:81–87`: build e deploy próprios na Railway; `.github/workflows/release.yml`. | forte |
| Composição | O host do ecossistema que monta `./route` não está no repositório (`README.md:1` só cita o ecossistema). | ausente |
| Tecnologia | `package.json:21–22`: `@betfinio/abi` e `@betfinio/components` como pacotes npm (35 imports de `@betfinio/components` em `src`), compartilhamento em build time paralelo ao remote de contexto. | contexto |

## Autoria e histórico

Clone não raso e parcial (`blob:none`). São 193 commits alcançáveis a partir do SHA (230 em todos os refs), 64 merges, de identidades pseudônimas do mesmo projeto, todas com e-mails `@proton.me`:
- `Monster`/`bf-monster` `<bf.monster@proton.me>`: 101 commits;
- `Plane` `<bf.plane@proton.me>`: 63;
- `bf-tower`: 16;
- `bf-gabagool`: 12;
- `BF san`: 1.

O committer `GitHub` aparece em 49 commits. A raiz é `19cc527` (2024-10-08, “Initial commit”) e o SHA é `017037c` (2026-04-06, “feat: enhance round resolution and betting logic”). Há branches remotos `prod/bet`, `feature/*` e outros, não considerados. `git rev-list --objects $SHA --missing=print` lista 572 objetos ausentes, nenhum na árvore do SHA. Nenhum blob histórico foi lido.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Leitura adotada: uma única unidade frontend. O remote `betfinio_context` fornece provider, hooks de query, utilitários, traduções e uma raiz simulada (`src/routes/__root.tsx:2–3`; `src/i18n.ts:1`), ou seja, compartilhamento de código, não uma unidade frontend composta. Ver “Ponto para revisão conjunta”. |
| Q2 | Yes (para a unidade) | Entry, build Rsbuild, servidor e deploy próprios (`src/index.tsx:1`; `package.json:7`, `:11`; `railway.json:3–9`). |
| Q3 | Undetermined | O host Betfin que monta a rota exposta não está no repositório. |
| Q4 | Undetermined | O lado exposto está configurado (`rsbuild.config.ts:37–41`, manifesto MF); o consumidor de `./route` não é observável. |
| Q5 | No | Unidade preparada para composição por um host externo não observável. |

## Motivo

- Proposta `MFE-unit` com `status: review`.
- **Exceção aplicada:** “a single frontend unit explicitly prepared to be composed by an external host (e.g., Module Federation `exposes`…), but the composing host is not observable”. A unidade expõe uma rota funcional do jogo (`./route`), mais `./style` e `./i18n`, com manifesto MF e `shared` de singletons. Mesmo vetor de 001/050/225.
- **Fator que exige revisão:** além do `exposes`, a unidade declara e efetivamente consome um remote (`betfinio_context`). Pela leitura literal de Q1 adotada em 150, essa referência contaria como unidade externa, o que impediria a exceção de unidade única.
- **Por que se adota a leitura de code sharing:** o que se consome são provider, hooks, utilitários, traduções e uma raiz simulada. Isso evoca o caso Non-MFE “Module Federation used only for code sharing”, ainda aberto em 089/100.
- **Diferente de 264:** aqui o remote é consumido.
- **Diferente de 037/102/258:** não há plataforma de terceiros; o host e o contexto pertencem ao mesmo ecossistema Betfin.
- `repo_type: production`: jogo on-chain com contratos, deploy na Railway, gestão de segredos por 1Password e branch `prod/bet`. `ui_technologies: [react]`, `build_tools: [rsbuild]`, `approaches: [module-federation]`.

## Notas para análise

- **RQ2:** Module Federation 2.0 com `@module-federation/rsbuild-plugin`, manifesto (`manifest: true`), tipos remotos (`dts.consumeTypes`) e um plugin próprio que baixa assets do remote no build (`scripts/plugin-fetch-manifest.ts`). O padrão é um remote de “contexto” compartilhado com provider global e `MockRoot` para desenvolvimento isolado das unidades de jogo.
- **RQ3:** dois canais de compartilhamento: em build time por pacotes npm (`@betfinio/components`, `@betfinio/abi`) e em runtime pelo remote `betfinio_context`.
- **Protocolo (famílias/multi-repo):** o ecossistema tem ao menos cinco outros repositórios de jogos ou template nas rodadas (`stones`, `roulette`, `predict`, `lottery`, `template`), fora da amostra. O host e o `betfinio_context` não foram identificados entre os candidatos. Uma análise de famílias poderia mudar Q3/Q4.

## Ponto para revisão conjunta

Decidir como tratar uma unidade com `exposes` (rota do jogo) que também consome, por `remotes`, um remote de contexto compartilhado (`betfinio_context`: provider, hooks, utilitários, traduções, `MockRoot`).

- **Leitura adotada:** o remote de contexto é compartilhamento de código, não unidade frontend. Ficam Q1 No, Q2 Yes, Q3 e Q4 Undetermined, Q5 No, e a classe `MFE-unit` (`frontend_units: 1`, `single-unit`), como em 001/050/225.
- **Alternativa A, leitura literal de Q1 como em 150:** `betfinio_context` conta como unidade externa referenciada (Q1 Yes, `frontend_units: 2`, `multi-repo`). A exceção de unidade única deixa de valer. Q3 e Q4 dependem de considerar a montagem do `MockRoot`/`GlobalContextProvider` em torno da página como participação na mesma aplicação:
  - se sim, Q3 e Q4 Yes, e a classe `MFE-implemented` dependeria de aceitar o contexto como unidade e não como code sharing (questão de 089/100);
  - se não, Q3 Undetermined e a classe `Uncertain`.
- **Alternativa B:** se o consumo do contexto for lido como “Module Federation used only for code sharing” e o lado exposto não for aceito como unidade para host externo, a classe seria `Non-MFE`. Esta leitura parece menos aderente, porque `./route` expõe uma página funcional.

Não se propõe regra nova. A decisão pode ser tomada junto com 089/100 (code sharing) e com a leitura de Q1 pendente em 150.
