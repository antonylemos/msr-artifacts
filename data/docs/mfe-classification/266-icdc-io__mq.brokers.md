---
schema: 1
id: 1213410215
full_name: icdc-io/mq.brokers
url: https://github.com/icdc-io/mq.brokers
commit: 87574f05c589403aaee7df91656b4c93f5132da7
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

# 266 — icdc-io/mq.brokers

## Contexto

Aplicação remota React + Rsbuild, com Module Federation, para gerir *brokers* de fila de mensagens. Expõe `./brokers` e consome componentes, hooks e store de um host chamado `container` (“Chrome Host application”, `README.md:1–6`, `45–49`). O README avisa que a aplicação “cannot run independently” (`README.md:47`). O host não está neste repositório. O nome do repositório e o da organização não são usados como evidência.

`data/samples/mfe-sample-001/clones.csv:267` registra rank 266, ID 1213410215, status `cloned`, branch `master` e o commit do front matter, que é o HEAD do clone e de `origin/master`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:267` registra as estratégias `terminology;technology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:28606` (`unknown`) e `data/discovery/mfe-round-002/candidates.csv:28612` (`pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos três hits em cada rodada, do endpoint `repositories`, com subconsulta `…#created:2026-04` e `path` vazio:

| Consulta (`q`) | Coleta 001 / 002 (UTC) |
|---|---|
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | 2026-10-07T20:52:29.002Z / 2026-10-08T15:42:17.890Z |
| `terminology-microfrontends-repositories`: `microfrontends in:name,description,readme` | 2026-10-07T22:12:31.008Z / 2026-10-08T15:49:40.260Z |
| `technology-module-federation-repositories`: `"module federation" in:name,description,readme` | 2026-10-07T23:25:04.169Z / 2026-10-08T16:17:43.049Z |

As consultas efetivas acrescentam `pushed:>=2025-04-01 created:2026-04-01..2026-04-30`.

Metadados do hit:
- descrição “mFE for Brokers app in MessageQueue service”, sem tópicos, linguagem JavaScript, `fork: false`, tamanho 528;
- criação no GitHub em 2026-04-17T10:54:38Z, push em 2026-07-07T07:38:24Z.

Grafias no README:
- “microfrontend”: `README.md:3` (“The **Brokers** microfrontend is part of the **Message Queue** application group.”); também `README.md:25`, como “Microfrontend integration”;
- “Microfrontends”: `README.md:35`, primeira coluna da tabela;
- “Module Federation”: `README.md:4`, `25` e `35`.

O arquivo `README.md` foi adicionado no commit inicial `e4f026e` (2024-04-23), sem conteúdo substantivo, e o conteúdo atual (com as menções a microfrontend e Module Federation) foi escrito em `846ceb3` (2025-11-04), sem mudança até o SHA. É anterior às coletas de outubro de 2026, portanto o README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 68 entradas, 67 arquivos regulares `100644` e 1 executável `100755` (`src/utils/search.js`); zero symlinks e zero gitlinks. Uma única aplicação: `package.json`, `rsbuild.config.mjs`, `modulefederation.config.js`, `public/i18n.json` e `src/` com páginas, componentes, queries e estilos. | contexto |
| Remoto (exposição) | `modulefederation.config.js:3–8`: `name: "mq_brokers"`, `filename: "remoteEntry.js"`, `exposes: { "./brokers": "./src/brokers.jsx" }`. `src/brokers.jsx:11–33`: componente com rotas internas (`<Routes>`), sem `BrowserRouter`, o que pressupõe roteamento externo. | forte |
| Consumo do host | `modulefederation.config.js:9–14`: remoto `container` em `host@http://localhost:8000/general.js` (desenvolvimento) ou `host@/general.js`. `:15–36`: `react`, `react-router-dom`, `react-i18next` e `@tanstack/react-query` como singletons. 30 arquivos de `src/` importam módulos `container/*`, como `container/Api`, `Button`, `Form`, `Loader` e `ReduxActions` (por exemplo, `src/pages/BrokersList.jsx:2–9`). | forte |
| Build | `rsbuild.config.mjs:1`, `22–33`: `ModuleFederationPlugin` de `@module-federation/enhanced/rspack` aplicado com `mfConfig(envMode)`; porta 8044 (`:12–14`). `package.json:20–23`, `29–35`: dependências e scripts Rsbuild. | forte |
| Código-fonte (fronteiras) | Os imports relativos ficam dentro de `src/`: o mais profundo é `../../`, a partir de `src/components/BrokerForm/`. Não há `../../../` nem caminhos fora do repositório. O que vem do host chega por `container/*` (federação), não por caminho de arquivo. | contexto |
| Documentação | `README.md:6`, `13`, `24`, `36–40`, `45–49`: integração no host, consumo de UI e hooks do host e impossibilidade de executar sozinho. | moderada |

## Autoria e histórico

Clone não raso:
- **Commits:** 45 em todos os refs, 14 deles merges, de 2024-04-23 (`e4f026e`, “Initial Commit”) a 2026-07-07 (SHA `87574f0`, “Merge branch 'dev' into 'master'”).
- **Autores:** nomes Dzmitry Valashchuk (19 commits, mais 12 registrados só pelo e-mail), Pavel Kazlou (12, em três grafias), Dzmitry Sakovich (1) e Daniil Satsura (1). Todos usam o mesmo domínio de e-mail corporativo.
- **Origem:** `package.json:7–8` aponta para um GitLab próprio e há `.gitlab-ci.yml` (Biome e Gitleaks). O histórico é anterior à criação no GitHub, o que é compatível com espelhamento.
- **Federação:** `modulefederation.config.js` existe desde `9c3e6d6` (2025-01-29).

Só há o branch `master`. Nenhum blob histórico foi lido. O clone é parcial (`blob:none`) e `git rev-list --objects $SHA --missing=print` enumera 189 objetos históricos ausentes; os arquivos do SHA foram lidos.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Uma única unidade frontend. O host `container` é referenciado (`modulefederation.config.js:9–14`), mas não está no repositório. |
| Q2 | Yes | Unidade com build próprio (Rsbuild + `ModuleFederationPlugin`) e `remoteEntry.js`; não há import por caminho de arquivo para fora do repositório. |
| Q3 | Undetermined | O host que compõe o remoto não é observável. |
| Q4 | Undetermined | A unidade está preparada para composição (`exposes`), mas a composição não é observável no snapshot. |
| Q5 | No | Vetor de exceção MFE-unit: só a unidade remota, sem o host. |

## Motivo

- `MFE-unit`: “repositories containing only a remote unit, without the composing host”, com `exposes` de Module Federation. Mesmo vetor dos finais 001 e 050.
- **Dependência do host:** o remoto também consome módulos expostos pelo host (`container/*`). É federação bidirecional, não compartilhamento de código-fonte como em 089/100, e não muda a classe.
- **Organização:** outros repositórios da mesma organização estão nas rodadas, entre eles `icdc-io/cloud.chrome` e vários `*.*` de serviços (`data/discovery/mfe-round-002/candidates.csv`). Só este está na amostra; os demais não foram inspecionados. Não é plataforma de terceiros (102/074/080): o host é da própria organização.
- **Campos:** `approaches: [module-federation]`, `ui_technologies: [react]`, `build_tools: [rsbuild]` (como em 029), `frontend_units: 1`, `unit_organization: single-unit`. `repo_type: production`: aplicação de serviço real, com CI, histórico de mais de dois anos e vários autores.
- Não há decisão aberta.

## Notas para análise

- **RQ2:** remoto Rsbuild com `@module-federation/enhanced/rspack` que expõe uma subárvore de rotas e consome do host a biblioteca de UI, o cliente de API, a store Redux e utilitários (`container/*`). A dependência é bidirecional entre host e remoto.
- **Protocolo (amostra):** a mesma organização tem 34 candidatos na rodada 002; só este entrou na amostra.
- **Protocolo (busca):** as três grafias estão literalmente no README. A elegibilidade muda de `unknown` (001) para `pass` (002).
- **Contribuição da revisão independente (Lupa):** concordância com MFE-unit e com o vetor No/Yes/Undetermined/Undetermined/No, `module-federation`, React/Rsbuild, uma unidade e `single-unit`, sem decisão aberta (`draft`). Correções adotadas: o arquivo `README.md` entrou em `e4f026e` e o conteúdo atual em `846ceb3`; o intervalo de `shared` é `modulefederation.config.js:15–36`; e a lista de objetos ausentes (189, verificada) substitui a afirmação de completude, ao contrário do relato do parecer, que dava o clone como completo. A revisora recomendou promover a final, mas a promoção cabe ao pesquisador.
