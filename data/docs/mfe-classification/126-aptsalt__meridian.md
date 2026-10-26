---
schema: 1
id: 1277695813
full_name: aptsalt/meridian
url: https://github.com/aptsalt/meridian
commit: 2c6fbaa2112cc3ab55cf06786647be1c5aee4bc4
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: example
approaches: []
ui_technologies: [angular]
build_tools: []
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 126 — aptsalt/meridian

## Contexto

Demonstração Angular de assistente de políticas bancárias, com execução determinística no cliente e conteúdo sintético (`README.md:12–13`; `README.md:33–35`; `README.md:80–83`). A aplicação possui páginas locais e uma apresentação HTML. Página de arquitetura e slides descrevem uma arquitetura MFE, mas os registros de remote/host e os artefatos de federação descritos não estão implementados no snapshot.

Rank, ID e SHA conferidos em `data/samples/mfe-sample-001/clones.csv:127`, status `cloned`; HEAD coincide com o commit do front matter. Todo comando Git do clone usou `GIT_NO_LAZY_FETCH=1`, sem alterar o snapshot, instalar pacotes, executar aplicações ou consultar a rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:127` registra estratégia `terminology` e elegibilidade `pass`. A amostra deriva da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O candidato consta em `data/discovery/mfe-round-001/candidates.csv:32346`, com elegibilidade `unknown`, e `data/discovery/mfe-round-002/candidates.csv:32354`, com `pass`. Os metadados registram tópicos vazios, linguagem TypeScript, `fork: false`, criação em 2026-06-23T05:43:51Z e push em 2026-06-23T21:38:33Z. A descrição apresenta o copilot Angular/RAG/MCP/FAPI, sem as expressões pesquisadas de micro-frontends.

Consultas `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` de `data/discovery/mfe-round-001/discovery.sqlite` e `data/discovery/mfe-round-002/discovery.sqlite`, pelo ID 1277695813, registram:

| Consulta | Subconsulta | Consulta efetiva | Coleta 001 / 002 (UTC) |
|---|---|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | `terminology-micro-frontend-repositories#created:2026-06` | `"micro frontend" in:name,description,readme pushed:>=2025-04-01 created:2026-06-01..2026-06-30` | 2026-10-07T22:37:30.229Z / 2026-10-08T16:00:17.941Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | `terminology-micro-frontends-repositories#created:2026-06` | `"micro frontends" in:name,description,readme pushed:>=2025-04-01 created:2026-06-01..2026-06-30` | 2026-10-07T23:07:03.008Z / 2026-10-08T16:09:34.491Z |

Os hits têm `path` vazio e não informam campo/linha casada. Por eliminação, nome e descrição não fornecem as expressões e não há tópicos; o README contém a grafia próxima **“micro-frontends”** em `README.md:45` e **“micro-frontend ready”** em `README.md:78`. As consultas usam espaço; o texto observado usa hífen. Não se apresenta esse texto como ocorrência literal das frases com espaço nem se presume uma regra de normalização da busca; registram-se os hits e a evidência textual compatível disponível. O nome não foi usado como evidência arquitetural.

O README foi adicionado na raiz e atualizado em `e44f777`, 2026-06-23T01:45:05-04:00 (05:45:05Z), sem alteração posterior alcançável. Seu conteúdo no SHA é anterior às buscas de outubro de 2026, não posterior.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | Inventário integral por `git ls-tree -r`: 56 arquivos regulares `100644`, zero symlinks e zero gitlinks. Há uma árvore `src`, um manifesto, uma configuração Angular e saída compilada em `docs/`, além de apresentação HTML. Não há `node_modules` versionado, segundo projeto de aplicação, config de federação ou `remoteEntry` no inventário. A cópia publicada e os slides não são unidades próprias adicionais. | contrária |
| Configuração (alvo único) | `angular.json:8–24` define somente o projeto `meridian`, tipo application, builder `@angular/build:application` e entrada `src/main.ts`. `angular.json:60–70` serve o mesmo build. Não há builder de federação ou configuração de bundler específica das unidades. | contrária |
| Código-fonte (entrada) | `src/index.html:12–14` contém `app-root`; `src/main.ts:1–6` chama `bootstrapApplication(App, appConfig)`. `src/app/app.ts:5–11` usa RouterOutlet e o template do mesmo aplicativo. | contrária |
| Código-fonte (rotas) | `src/app/app.routes.ts:8–41` usa `loadComponent` com imports relativos locais para Console, Policies, Security, Guardrails e Architecture. `src/app/app.config.ts:23–33` registra essa lista e preloading no mesmo aplicativo. Lazy loading local não estabelece entradas/builds independentes. | contrária |
| Código-fonte (estado compartilhado) | `src/app/features/console/console.ts:9–11` importa CopilotEngine e modelos do `core` local; `src/app/features/policies/policies.ts:8–9` importa o corpus/modelos do mesmo `core`. `src/app/core/copilot-engine.ts:18–34` descreve execução local determinística e expõe um serviço raiz. A decomposição em features/serviços não configura unidades frontend autônomas. | contrária |
| Documentação em UI | `src/app/features/architecture/architecture.ts:27–38` diz “Module-Federation-ready”. `src/app/features/architecture/architecture.ts:229–256`, dentro do template HTML, descreve manifest, `advisor-copilot`, exposição `./CopilotPage`, `loadRemoteModule()` e Native Federation. São texto/código exibido em elementos `<code>`, não configuração executada ou chamada do carregador. | fraca |
| Documentação (slides) | `presentation.html:910–943` desenha host `bmo-portal`, remotes de pagamentos/empréstimos e advisor-copilot; `presentation.html:958–964` lista Webpack Module Federation, `@angular-architects/mfe`, loadRemoteModule e pacote de tipos. Nenhum desses nomes possui produtor/consumidor/config correspondente na árvore de implementação. A cópia `docs/presentation.html` tem o mesmo blob, não outra instância. | fraca |
| Configuração / Tecnologia (resolução) | `package.json:4–9` chama Angular CLI; `package.json:13–30` declara Angular e seu builder, sem pacote de federação. O lock resolve `@angular/core` 21.2.17 em `package-lock.json:522–524` e `@angular/build` 21.2.16 em `package-lock.json:326–328`; não contém chaves de pacote de federation, single-spa, qiankun ou wujie. O builder está declarado/resolvido, mas não se executou build. A CLI encapsula seu bundler, sem hook explícito. | contrária |
| Código-fonte (fronteiras) | Busca literal ativa `git grep -n -F -e '../../' -e '../../../'` em todos os TS de `src`: cinco ocorrências, em `src/app/features/console/agent-trace.ts:2`, `src/app/features/console/console.ts:9–11` e `src/app/features/policies/policies.ts:8–9`. Todas resolvem para `src/app/core`, não outro alvo. Não se afirmou independência a partir de amostra ou ausência de imports. | contexto |
| Tecnologia / Configuração / Composição (buscas) | Busca por `module.?federation`, `remoteEntry`, `registerApplication`, `single.?spa`, `qiankun`, `wujie`, `postMessage`, `iframe`, `customElements`, `import.?map` e `micro.?frontend`, excluindo lockfile e JS compilados, encontra declarações no README, slides e template de Architecture, sem mecanismo executável. Os configs e todas as rotas efetivas foram lidos. Inspeção dos JS publicados distingue strings desse template de chamadas de composição: o texto `loadRemoteModule` continua conteúdo renderizado; ocorrências de `registerApplication` no runtime Angular não são registro single-spa. | ausente |
| Documentação (propósito) | `README.md:33–35` declara execução mock no cliente; `README.md:80–83` identifica conteúdo sintético e demonstração de portfólio/entrevista. A autodescrição MFE não foi tomada como evidência suficiente sem ligação de unidades. | contexto |

## Autoria e histórico

Metadados de `git rev-list`: **7 commits, 0 merges e 1 commit-raiz**, raiz `4b8478d53a59475646e4f5dc296d1ecafe0c36b4`; clone não shallow. Autor/committer dos commits observados: aptsalt. A raiz ocorre em 2026-06-23T01:43:40-04:00 e introduz a aplicação; o SHA avaliado ocorre às 17:38:31-04:00 do mesmo dia, com mensagem de refinamento de design.

`git log --no-renames --name-status` foi consultado por `src/app`, `docs`, `presentation.html` e `README.md`. A aplicação é adicionada na raiz; `b7646cc`, `ce48368` e o SHA final modificam fontes de UI. `3060e5f` adiciona publicação `docs/`; os três commits finais também renovam artefatos publicados. A apresentação é adicionada na raiz e alterada por `1a04000`; o README é atualizado por `e44f777`.

A sequência mostra evolução local de fontes e publicação; não prova autoria original de cada trecho. Artefatos de scaffold Angular não foram contados como unidades vendorizadas, e não se identificou upstream de aplicação terceira nas evidências lidas. Não foram consultados blobs históricos; nenhum objeto ausente foi encontrado. Não se infere implementação histórica de federação a partir dos títulos dos commits.

Referências locais apenas para registro: `master`, `origin/master` e `origin/HEAD` apontam ao SHA avaliado. Não há outro branch na enumeração local. Documentação arquitetural observável está no README, slides e página Architecture, citados acima; não há ADR separado no inventário.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Uma aplicação Angular com entrada/build único (`angular.json:8–24`; `src/main.ts:1–6`). Remotes e host aparecem apenas como conteúdo dos slides/template (`presentation.html:910–943`; `src/app/features/architecture/architecture.ts:248–251`), sem referências de composição executável. |
| Q2 | No | As features não têm entradas/builds próprios; compartilham o projeto e o `core` local (`angular.json:19–24`; `src/app/features/console/console.ts:9–11`). Não existe unidade efetivamente preparada para host externo. |
| Q3 | No | O roteador carrega componentes locais da mesma aplicação (`src/app/app.routes.ts:8–41`), sem host/shell carregando unidades independentes. O diagrama MFE não é roteamento implementado. |
| Q4 | No | O builder é Angular CLI padrão (`angular.json:20–24`); não há configuração de remote/exposes/consumo. `loadRemoteModule` é mostrado como texto no template (`src/app/features/architecture/architecture.ts:248–251`), não executado. |
| Q5 | No | Q1–Q4 convergem: aplicação convencional com conteúdo sobre MFE e intenção de prontidão, sem instância implementada da arquitetura. |

## Motivo

- `Non-MFE` pelos casos de frontend convencional e menção a microfrontends sem implementação. Não se aplica `MFE-unit`: estar descrito como remote em slides não equivale a exposição/contrato/build preparados para composição. Q2–Q4 são No, não Undetermined.
- `frontend_units: 1` e `unit_organization: single-unit` contam a aplicação implementada. Chunks lazy, rotas, serviços, slides e cópia de publicação não são unidades adicionais. A demonstração é um alvo próprio real; não se reduz sua contagem a zero por ter conteúdo didático.
- `repo_type: example` decorre da declaração de showcase/portfólio (`README.md:12–13`; `README.md:80–83`). Angular é usado nos fontes e builder; `build_tools: []` porque não há configuração explícita de bundler além do encapsulado pela CLI. Não se anotam Webpack/Vite/esbuild apenas por sua menção nos slides ou dependências transitivas.
- Não há questão aberta de composição em build time, iframe ou links entre unidades; as referências MFE não ultrapassam conteúdo descritivo. Ausência de implementação não foi reescrita como imperfeição de uma cadeia existente.

## Notas para análise

- **Protocolo (família):** busca nas anotações por `aptsalt`, `meridian` e `Lumi pattern` não encontrou irmão já anotado. A origem de scaffold não demonstra cópia de um candidato específico.
- **Checklist:** paralelo com o final 023 quanto a MFE como conteúdo de slides e com 075/081/094/105 quanto à distinção de conteúdo/proposta e unidades materializadas. Aqui há uma aplicação materializada, mas a arquitetura MFE apresentada não foi implementada. Diferentemente de 076/084/096/106/109, não há cadeia configurada; diferentemente de 097/103/104, não há sequer config de federação a reparar; diferentemente de 089/100, não há federação usada para code sharing.
- **RQ1:** a página Architecture e a apresentação fazem afirmações fortes de remote, exposição e carregamento; o inventário, builder e imports locais são necessários para não confundir essas afirmações com mecanismos efetivos.
