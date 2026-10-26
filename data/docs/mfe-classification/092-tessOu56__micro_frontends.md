---
schema: 1
id: 939127087
full_name: tessOu56/micro_frontends
url: https://github.com/tessOu56/micro_frontends
commit: 7aa20b25af6f893cc96499dbace9875bfd349efc
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: example
approaches: []
ui_technologies: [react]
build_tools: [vite]
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 092 — tessOu56/micro_frontends

## Contexto

Laboratório com uma aplicação React em `apps/web3/` que importa um botão da biblioteca workspace `@my-org/ui`. O README identifica esse escopo e nega federação (`README.md:3–10`); a classificação se baseia também no código e na configuração, não nessa declaração isolada.

O SHA corresponde a `data/samples/mfe-sample-001/clones.csv:93`. O inventário completo por `git ls-tree -r 7aa20b25af6f893cc96499dbace9875bfd349efc` contém **2.486 entradas: 2.308 arquivos regulares ou executáveis, 177 symlinks (modo 120000, todos sob `node_modules/`, típicos de pnpm) e um gitlink**. Dessas, **2.453 entradas estão sob diretórios `node_modules/`**; fora deles há 32 blobs e o gitlink. A implementação frontend própria observada é uma, em `apps/web3/`. `packages/ui/` é biblioteca de um componente, e os pacotes vendorizados não são alvos adicionais. `frontend_units: 1` e `unit_organization: single-unit` descrevem os alvos frontend, embora a organização geral do repositório seja monorepo de aplicação e biblioteca.

O gitlink `apps/web3/apps/sso-ui` aponta para `e5bbee185dfcc659f37a98206f8e039f35edf961`; `.gitmodules:1–3` identifica o repositório externo `arwoosa/sso-ui`. Não se entrou nesse diretório, não se inicializou o submódulo nem se usou a rede. A ausência de integração no host foi avaliada nos arquivos próprios do snapshot, sem presumir o conteúdo do submódulo.

**Branches, somente para registro:** `main`, `origin/main` e `origin/HEAD` apontam ao SHA fixado; há também `origin/cursor/docs-readme-proof-w3` em `30a66e21aa235ffc78d33bb78db92bd2550a5fa7`, cujo conteúdo não fundamenta esta anotação. O clone não é raso e a contagem real de commits alcançáveis pelo SHA avaliado é **4**, conferida por `git rev-list --count`.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:93` registra `strategies: terminology;technology` e `eligibility_status: pass`. `data/samples/mfe-sample-001/manifest.json:2–5` identifica a origem como `data/discovery/mfe-round-002`. O banco dessa rodada foi consultado exclusivamente com `sqlite3 -readonly`.

Na tabela `hits`, filtrando `repository_id = 939127087` e relacionando `query_id` com `queries`, foram encontrados quatro registros. Todos são buscas de repositórios (`endpoint = repositories`), com `path` vazio, e não resultados de código que localizem um arquivo específico:

| query_id | strategy | Consulta registrada em `queries.q` |
|---|---|---|
| `technology-module-federation-repositories` | `technology` | `"module federation" in:name,description,readme` |
| `terminology-micro-frontend-repositories` | `terminology` | `"micro frontend" in:name,description,readme` |
| `terminology-micro-frontends-repositories` | `terminology` | `"micro frontends" in:name,description,readme` |
| `terminology-topic-microfrontends` | `terminology` | `topic:microfrontends` |

Fonte de auditoria: `data/discovery/mfe-round-002/discovery.sqlite`, tabelas `hits`/`queries`, identificadas pelas chaves acima; registros SQLite não possuem numeração de linha textual. Consulta reprodutível de leitura:

```sql
SELECT q.query_id, q.strategy, q.endpoint, q.q, h.path
FROM hits h JOIN queries q ON q.query_id = h.query_id
WHERE h.repository_id = 939127087
ORDER BY q.query_id, h.path;
```

Esses hits explicam as estratégias registradas, sem confirmar a tecnologia. O README contém a frase Module Federation em uma negação (`README.md:3`, `README.md:10`); os metadados da descoberta (momento da consulta, não do snapshot) explicam os acertos: a descrição é "Turbo + pnpm monorepo lab — shared React UI package consumed by a Vite host app (micro-frontend exploration)." e os tópicos incluem `microfrontends`, `monorepo`, `pnpm`, `react`, `turbo` e `vite` (`data/discovery/mfe-round-002/candidates.csv`, lido em modo somente leitura). O tópico gera o acerto de `terminology-topic-microfrontends`; "micro frontend(s)" vem da descrição e do nome do repositório (`micro_frontends`, `README.md:1`); e o acerto de `technology-module-federation-repositories` só pode vir da negação em `README.md:3` e `:10`, pois a descrição não contém o termo. É evidência concreta para RQ1: a estratégia de tecnologia foi disparada por uma negação explícita da tecnologia. A rodada 001 registra os mesmos acertos. Nada disso prova federação implementada.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura / Configuração | `pnpm-workspace.yaml:1–3` inclui `apps/*` e `packages/*`; `package.json:7–10` executa tarefas Turbo. A aplicação `web3` tem scripts Vite em `apps/web3/package.json:6–8`; o pacote UI declara `main: index.jsx` e apenas um script dev em `packages/ui/package.json:5–8`. Não há segundo alvo de aplicação próprio com entrada/build de UI. | contrária |
| Tecnologia / Código-fonte (entrada) | `apps/web3/index.html:9–10` fornece `#root` e carrega `src/index.jsx`. `apps/web3/src/index.jsx:1–8` importa React/ReactDOM e `Button` de `@my-org/ui`, define um componente App local e o monta. Não há import remoto, router externo ou carregamento do submódulo SSO. | contrária |
| Código-fonte (biblioteca compartilhada) | `packages/ui/index.jsx:1–3` exporta somente um botão estilizado. `apps/web3/package.json:13–16` declara a dependência `workspace:*`, e `apps/web3/src/index.jsx:1–5` a consome por import estático. É compartilhamento de componente de biblioteca no build da aplicação, sem unidade frontend separada demonstrada. | contrária |
| Configuração (Vite) | `apps/web3/vite.config.js:1–12` configura o plugin React, root e servidor na porta 5173. Não declara federação, remotes/exposes, import map ou montagem de outra aplicação. O bundler está explícito nesse arquivo, além dos scripts em `apps/web3/package.json:6–8`. | contrária |
| Estrutura / Composição (gitlink) | `.gitmodules:1–3` registra o submódulo SSO; ele é uma entrada Git de modo 160000, não fonte própria expandida. Procurado `sso-ui` no código/configuração próprios, só foi encontrado em `.gitmodules`. O README chama o submódulo de exploração (`README.md:10`). Nenhum consumidor conecta esse gitlink à aplicação observada. | contexto |
| Documentação | `README.md:3–10` delimita laboratório de host Vite e biblioteca, sem federação; `README.md:15–19` descreve as peças; `README.md:28` informa execução local sem deploy. O inventário não contém ADRs, diretório `docs/` ou outro documento/diagrama de arquitetura próprio. Não foram tratados os sucessores citados em `README.md:11` como unidades compostas neste snapshot. | contexto |
| Histórico | Quatro commits: `bf2c53f84d452b7d4ad469b460490ddb787faaeb` (2025-02-26, init), `d96562187949c9a962ffec89bb129c1939c5250b` (2025-03-07, git setting), `bccd80e021ca22f7098f2d8bfbb0984b365a259c` (2026-09-02, docs: add README — monorepo host + shared UI lab) e o SHA avaliado (2026-09-17, docs(readme): recruiter-facing GitHub audit Wave 3 stub (#1)). Comparados os objetos por `git ls-tree`: a entrada, o Vite config e o botão têm os mesmos blobs nos quatro commits (`apps/web3/src/index.jsx:1–8`, `apps/web3/vite.config.js:1–12`, `packages/ui/index.jsx:1–3`). O gitlink e `.gitmodules` surgem no segundo e permanecem iguais. Não se inferiu evolução arquitetural pelos títulos dos commits. | contexto |
| Tecnologia / Configuração / Código-fonte (busca negativa) | Em todos os arquivos próprios `.js`, `.jsx`, `.json`, `.html`, `.md`, `.yaml` e `.gitmodules`, excluídos `node_modules/`, `.turbo/`, lockfiles e o gitlink, procurados `ModuleFederation`, `module.federation`, `remoteEntry`, `exposes:`, `remotes:`, `single-spa`, `registerApplication`, `registerMicroApps`, `qiankun`, `wujie`, `customElements.define`, `importmap`, `import-map`, `postMessage`, `<iframe` e `srcDoc`. Só há as menções negativas a Module Federation no README, não configuração/código de composição. | ausente |
| Estrutura (busca negativa de unidades/preparação) | Procurados entradas HTML e manifests de aplicação fora de dependências e do gitlink: uma entrada HTML em `apps/web3/`; `packages/ui/` não tem HTML, mount/unmount, bootstrap de aplicação, configuração de remote ou build próprio de aplicação. O submódulo não é referenciado por configuração de composição, e os links de sucessores no README são documentação, sem contrato de integração. | ausente |

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Uma aplicação própria (`apps/web3/index.html:9–10`, `apps/web3/src/index.jsx:1–8`). O outro pacote é biblioteca de botão (`packages/ui/index.jsx:1–3`); o gitlink SSO não tem consumidor observável. Não há configuração que componha ou referencie duas unidades frontend. |
| Q2 | No | Não há conjunto de unidades frontend independentes nem unidade preparada para host externo. A aplicação possui build Vite (`apps/web3/package.json:6–8`), mas a biblioteca é importada estaticamente por `apps/web3/src/index.jsx:1` e declara apenas seu arquivo de componente em `packages/ui/package.json:5`. |
| Q3 | No | A árvore local apenas monta App e Button (`apps/web3/src/index.jsx:4–8`); não há host/shell que carregue outras aplicações. A denominação host no README não substitui esse critério. |
| Q4 | No | O Vite config só habilita React e servidor (`apps/web3/vite.config.js:4–11`); o consumo da biblioteca é import estático. Não foi encontrado mecanismo de composição ou contrato com SSO. |
| Q5 | No | Código e configuração demonstram aplicação convencional com biblioteca compartilhada (`apps/web3/src/index.jsx:1–8`, `packages/ui/index.jsx:1–3`), coerente com os limites documentados em `README.md:3–10`. Q5 acompanha Q1–Q4, sem override. |

## Motivo

- Proposta `Non-MFE`, Q1–Q5 No: um laboratório de aplicação com biblioteca compartilhada, sem implementação de composição entre unidades frontend.
- Não é MFE-unit: o único frontend observado não exporta lifecycles/módulos para um host externo. Q2–Q4 são No, sem inferir preparação a partir do nome do repositório ou da existência do gitlink.
- O caso não depende da decisão aberta de composição em build time: o pacote compartilhado é somente um componente Button, sem entrada de aplicação, contrato de montagem ou build próprio de unidade. Não se transforma toda dependência workspace em aplicação frontend. Tampouco há federação usada apenas como code sharing, como na dúvida de 089: neste candidato, não há federação implementada.
- A biblioteca e as dependências versionadas não contam em Q1/`frontend_units`. Os sucessores e o submódulo não têm relação de composição implementada observável; aplica-se a distinção dos precedentes 023/028 entre alvos/referências e uma aplicação composta. Não há iframe/link com contrato nem plugin de plataforma a revisar.
- `build_tools: [vite]` registra configuração explícita na aplicação; `ui_technologies: [react]` registra os imports e montagem observados. Turbo/pnpm organizam tarefas/pacotes e não são bundlers adicionais de unidades.

## Notas para análise

- **RQ1 (amostragem):** `sample.csv` registra as duas estratégias e os quatro hits do banco as detalham. Busca por tecnologia em metadados/README pode alcançar uma negação da tecnologia. A observação de código e configuração continua necessária.
- **RQ1 (inventário):** 2.453 entradas vendorizadas e o gitlink foram separados da implementação própria. Não se expandiu o submódulo, não se atribuiu seu conteúdo ao candidato e não se contaram dependências ou logs/cookies Turbo como unidades frontend.
- **Protocolo (famílias):** buscas nas anotações por `tessOu56` e `sso-ui` não encontraram irmãos já registrados. `README.md:11` identifica `nx-playground` e `ai-search-portal` como sucessores do próprio autor; não foram acessados e isso não demonstra arquitetura ou duplicação de template no candidato. O caso 089 é comparação de fronteira entre compartilhamento e composição, sem evidência de família compartilhada; aqui o compartilhamento estático de biblioteca é explícito e sem orquestração remota.
- **Protocolo (limites):** foram usados somente o commit fixado, árvores/metadados dos quatro commits ancestrais e registros locais de descoberta em leitura. Não se executaram instalação, build, app, testes ou comandos do submódulo, nem se usou a rede. A falta de inspeção do submódulo não impede classificar o host observado: não há referência a ele como unidade na configuração ou no código consumidor.
