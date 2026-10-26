---
schema: 1
id: 1362830676
full_name: wixhub/ecosystem
url: https://github.com/wixhub/ecosystem
commit: c056d727cfd5c7f51f6cd370c9d26496303fd9d7
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: production
approaches: []
ui_technologies: [angular]
build_tools: []
frontend_units: 8
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 095 — wixhub/ecosystem

## Contexto

MoveRDM reúne aplicações científicas para telemetria, curadoria e pesquisa de migração animal. O README denomina a coleção micro-frontends (`README.md:3`), mas a inspeção encontra aplicações Angular separadas e bibliotecas compartilhadas, sem host ou contrato que componha as aplicações entre si. `repo_type: production` registra a orientação a ferramentas de pesquisa e o portfólio com endereços de implantação (`README.md:25–45`), sem afirmar que os serviços publicados ou os builds foram executados/verificados.

O SHA foi conferido em `data/samples/mfe-sample-001/clones.csv:96`; o clone é `wixhub__ecosystem`. Inventário integral por `git ls-tree -r c056d727cfd5c7f51f6cd370c9d26496303fd9d7`: **500 arquivos regulares** (modo `100644`), **zero symlinks** e **zero gitlinks**. Não há `node_modules/` versionado nem submódulos. As aplicações estão sob o prefixo `apps/`, não na raiz do clone.

Há **oito alvos frontend próprios**: `bio-stream`, `data-curation`, `eco-spec`, `metadata-harvester`, `movebank-explorer`, `sensor-streams`, `spatial-temporal` e `zeo`. Todos têm `src/main.ts` próprio com bootstrap Angular. `zeo` é scaffold ainda mínimo, mas possui entrada e build de aplicação. `zeo-e2e` é suíte de testes, e `libs/config`, `libs/data-access`, `libs/styles` e `libs/ui` são bibliotecas; não entram na contagem de aplicações. `frontend_units: 8` registra esses alvos físicos; **não significa Q1 Yes**, porque falta relação de composição entre eles, conforme os precedentes 023/028.

## Proveniência na amostra

- `data/samples/mfe-sample-001/sample.csv:96` registra rank 95, id 1362830676, `strategies: terminology` e elegibilidade `pass`. O run de origem é `data/discovery/mfe-round-002` (`data/samples/mfe-sample-001/manifest.json:2–5`).
- `data/discovery/mfe-round-002/candidates.csv:36978` registra descrição sobre análise espacial, curadoria de telemetria, Angular e Nx, sem menção a micro-frontends; tópicos vazios; linguagem TypeScript; licença MIT; branch padrão `main`; criação em 2026-09-09 e último push em 2026-09-17. São metadados de descoberta, não confirmação de arquitetura.
- Consulta `sqlite3 -readonly` ao banco `data/discovery/mfe-round-002/discovery.sqlite`, com `hits JOIN queries ON hits.query_id = queries.query_id` e filtro `hits.repository_id = 1362830676`: hits em `terminology-micro-frontend-repositories` e `terminology-micro-frontends-repositories`, endpoint `repositories`, estratégia `terminology`, consultas respectivamente `"micro frontend" in:name,description,readme` e `"micro frontends" in:name,description,readme`. Ambos têm `path` vazio, sem linha de código atribuída.
- **Eliminação dos campos:** o nome `wixhub/ecosystem` e a descrição registrada não contêm os termos buscados, e os tópicos estão vazios. O README local contém a expressão temática em `README.md:3`; a busca textual no snapshot encontra essa menção apenas no README raiz. Isso aponta ao README como campo compatível observado, sem atribuir ao banco uma localização que ele não fornece nem supor equivalência entre o texto atual e todas as versões indexadas pelo GitHub. O nome do repositório não é evidência de MFE.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura / Código-fonte | As oito entradas executam `bootstrapApplication(App, appConfig)`: `apps/bio-stream/src/main.ts:1–5`, `apps/data-curation/src/main.ts:1–5`, `apps/eco-spec/src/main.ts:1–5`, `apps/metadata-harvester/src/main.ts:1–5`, `apps/movebank-explorer/src/main.ts:1–5`, `apps/sensor-streams/src/main.ts:1–5`, `apps/spatial-temporal/src/main.ts:1–5` e `apps/zeo/src/main.ts:1–5`. São alvos próprios, não conteúdos de slides, código gerado exibido ou dependências vendorizadas. Não se observa composição entre essas entradas. | contrária |
| Build/deploy | Os sete `angular.json` sob `apps/` apontam cada build para o `src/main.ts` da própria aplicação: `apps/bio-stream/angular.json:19–24`, `apps/data-curation/angular.json:19–24`, `apps/eco-spec/angular.json:19–24`, `apps/metadata-harvester/angular.json:19–24`, `apps/movebank-explorer/angular.json:19–24`, `apps/sensor-streams/angular.json:19–24`, `apps/spatial-temporal/angular.json:19–24`. O oitavo define build e saída próprios em `apps/zeo/project.json:9–24`. Entradas/builds distintos são observáveis, mas não uma aplicação composta. | contexto |
| Configuração / Tecnologia | Os builds usam `@angular/build:application` (`apps/bio-stream/angular.json:21`, `apps/zeo/project.json:10`). `nx.json:48–84` registra plugins de ferramentas, inclusive inferência de tarefas por `@nx/vite/plugin`; `package.json:32`, `:57` declara Nx/Vite e Vite. Não há arquivo de configuração de Vite/Webpack/Rspack nem hook que configure diretamente seu bundler. O plugin Nx e as dependências não bastam para atribuir `vite` a `build_tools`; permanece `[]`. Angular é confirmado nos imports e bootstraps dos fontes. | contexto |
| Composição (rotas locais) | `apps/bio-stream/src/app/app.routes.ts:1–13`, `apps/data-curation/src/app/app.routes.ts:1–13` e `apps/sensor-streams/src/app/app.routes.ts:1–13` importam componentes internos. `apps/metadata-harvester/src/app/app.routes.ts:1–11` liga Dashboard, IngestionWizard e DatasetExplorer do mesmo projeto. Não são rotas para outras aplicações do monorepo. | contrária |
| Composição (lazy loading e shell) | `apps/eco-spec/src/app/app.routes.ts:3–10` e `apps/movebank-explorer/src/app/app.routes.ts:3–11` carregam componentes por imports relativos locais. `apps/spatial-temporal/src/app/app.routes.ts:1–13` usa seu Shell interno. `apps/zeo/src/app/app.routes.ts:1–3` tem rotas vazias; `apps/zeo/src/app/app.ts:1–9` e `apps/zeo/src/app/app.html:1–2` mostram NxWelcome e router outlet, não um host das outras sete aplicações. | contrária |
| Código-fonte / Configuração (compartilhamento) | `tsconfig.base.json:17–21` resolve `@es/ui`, `@es/styles`, `@es/data-access` e `@es/config` para fontes de `libs/`. O Dashboard de curadoria importa serviço, Header/Footer compartilhados e componentes locais (`apps/data-curation/src/app/features/dashboard/dashboard.ts:1–15`). `libs/ui/src/index.ts:1–2` exporta Header/Footer; `libs/ui/project.json:6–15` define biblioteca empacotada, e `libs/data-access/project.json:4–22` define biblioteca de dados. Compartilhar componentes/serviços não monta os alvos de `apps/` entre si. | contrária |
| Código-fonte (postMessage) | `apps/eco-spec/src/app/core/services/builder.worker.ts:1–13` recebe parâmetros e devolve volume estimado/validade de armazenamento. É código de Web Worker de cálculo, sem interface frontend nem contrato entre aplicações. A busca por `new Worker`, `onmessage` e `postMessage` em `apps/` encontra somente esse `postMessage`; não se confirmou sua instanciação. | contexto |
| Documentação de arquitetura | `apps/metadata-harvester/ARCHITECTURE_ANALYSIS.md:3–15` descreve uma aplicação Angular e seu stack; `:19–45` organiza features de Dashboard/IngestionWizard. `apps/metadata-harvester/ARCHITECTURE.mmd:2–7`, `:54–56` representa App e as mesmas rotas locais. O diagrama de curadoria liga Angular Root, Router e Dashboard (`apps/data-curation/architecture-diagram.mmd:3–17`), não os outros alvos frontend. Não foram encontrados ADRs no inventário. | contrária |
| Documentação / Build/deploy | O portfólio lista demos distintas (`README.md:25–45`). A menção genérica a micro-frontends (`README.md:3`) e os links documentais não constituem contrato de integração. A seção de bibliotecas descreve modelos, serviços e utilitários (`README.md:47–55`), coerente com o compartilhamento observado. | fraca |
| Configuração / Código-fonte (busca negativa de composição) | No commit inteiro, em arquivos textuais e excluindo arquivos cujo caminho contém `lock`, procurados `ModuleFederation`, `module.federation`, `remoteEntry`, `loadRemote`, `single-spa`, `registerApplication`, `registerMicroApps`, `importmap`, `import-map`, `<iframe`, `srcDoc`, `exposes`, `remotes`, `qiankun`, `wujie`, `customElements` e `rewrites`. Nenhum mecanismo foi encontrado; o único resultado dessa busca é a palavra comum `exposes` em comentário de teste (`apps/metadata-harvester/src/app/core/services/metadata-api.service.spec.ts:34`), sem configuração de exposição. A busca por federação e micro-frontends localizou apenas `README.md:3`; `postMessage` foi verificado separadamente como Worker. | ausente |
| Estrutura / Configuração (busca negativa de host) | Procurados no inventário arquivos de configuração de federação, bundlers e host/root de composição; examinadas as oito entradas e oito tabelas de rotas. Não há configuração conectando os alvos nem exportação de lifecycles para host externo. Busca de imports de caminhos `apps/` nos fontes não encontrou importação entre aplicações; os imports compartilhados observados apontam a `libs/`. | ausente |

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Oito alvos físicos próprios, mas sem relação de composição: as rotas carregam features locais (`apps/metadata-harvester/src/app/app.routes.ts:1–11`, `apps/eco-spec/src/app/app.routes.ts:3–10`) e `zeo` não os hospeda (`apps/zeo/src/app/app.routes.ts:3`, `apps/zeo/src/app/app.html:1–2`). Aplica-se o precedente 023/028 para aplicações sem composição. |
| Q2 | No | Há builds próprios, mas não conjunto de unidades de uma aplicação composta nem unidade explicitamente preparada para host externo. Os builds apontam às próprias entradas (`apps/bio-stream/angular.json:19–24`, `apps/zeo/project.json:9–24`); os vínculos entre projetos observados são bibliotecas de fonte compartilhada (`tsconfig.base.json:17–21`). Pela convenção de Q1 No sem preparação externa, Q2 é No. |
| Q3 | No | Não há host/shell que carregue as oito aplicações. O Shell de spatial-temporal é componente interno (`apps/spatial-temporal/src/app/app.routes.ts:1–7`); `zeo` mostra apenas NxWelcome (`apps/zeo/src/app/app.html:1–2`). |
| Q4 | No | Buscas de composição sem mecanismo conectando os alvos. Imports relativos de features (`apps/movebank-explorer/src/app/app.routes.ts:3–8`) e Header/Footer compartilhados (`libs/ui/src/index.ts:1–2`) não são composição entre unidades frontend. |
| Q5 | No | Monorepo de aplicações sem composição explícita, apesar do rótulo documental (`README.md:3`). As rotas locais e o compartilhamento via bibliotecas (`tsconfig.base.json:17–21`) sustentam a exclusão. Q5 acompanha Q1–Q4. |

## Motivo

- Proposta `Non-MFE`: caso de exclusão de múltiplas aplicações frontend sem composição explícita. Um tema de domínio comum, Nx, bibliotecas e demos publicadas não estabelecem uma única aplicação composta.
- `frontend_units: 8` e `unit_organization: monorepo` descrevem os alvos próprios inventariados. Não contam `zeo-e2e`, bibliotecas de dados/configuração/UI/estilos nem o Worker. O número de aplicações não supera a ausência da relação exigida pelos precedentes 023/028.
- Não se aplica MFE-unit: não há exposição ou lifecycles que preparem uma das aplicações para host externo. Q2–Q4 ficam No, sem recorrer a Undetermined por simples ausência de um host presumido.
- Não há decisão sobre composição em build time a arbitrar: o que se integra via fonte são componentes e serviços de bibliotecas, sem composição de aplicações. Os links estão no portfólio documental; não existe contrato de navegação entre unidades que configure o caso aberto de composição por links. Não se usa o Worker como prova de integração por mensagens.

## Notas para análise

- **RQ1:** a expressão temática em `README.md:3` é o sinal encontrado por eliminação entre os campos de descoberta. Código/configuração contradizem sua leitura como MFE implementado. Nem o nome, o plugin Nx, as dependências ou as demos isoladas confirmam arquitetura.
- **Protocolo (famílias/templates):** buscas nas anotações por `wixhub`, `MoveRDM`, `bio-stream`, `eco-spec`, `metadata-harvester`, `data-curation`, `sensor-streams` e `spatial-temporal` não encontraram irmão já anotado. O README contém instruções de scaffold Nx (`README.md:59–103`), e `zeo` conserva NxWelcome; não se demonstrou template comum com candidato específico. Os precedentes 023/028 são analogia de critério, não família de código.
- **Histórico:** clone não raso (`git rev-parse --is-shallow-repository`: false); **260 commits alcançáveis** pelo SHA avaliado, contados por `git rev-list --count`, incluindo merges e históricos incorporados. O log filtrado por `README.md`/`nx.json` registra inicialização do workspace em `4542f66` (2026-09-10), merges de repositórios `wixhub/sensor-streams` em `7f3dfa6` e `wixhub/data-curation` em `7213ccf` (2026-09-11), e atualização do portfólio em `5bb8057` (2026-09-15). Isso explica históricos de apps anteriores à criação do repositório registrada nos metadados; não implica composição runtime. O commit fixado de 2026-09-17 trata de licença e documentação. O histórico completo tem 7 merges "merge main from git@github.com:wixhub/<app>.git" (sensor-streams `7f3dfa6`, bio-stream `20362fc`, data-curation `7213ccf`, eco-spec `a96d986`, movebank-explorer-web `f053d23`, metadata-harvester `6c52b79` e spatial-temporal `2185acd`) e 8 commits-raiz: `4542f66` (2026-09-10, "chore: initialize project", o workspace Nx) e 7 históricos importados, de 2026-08-09 a 2026-09-04. O monorepo é, portanto, a consolidação de 7 aplicações desenvolvidas como repositórios independentes, cada uma com demo própria (`README.md:25–45`), mais o scaffold `zeo`; isso reforça a exclusão de várias aplicações frontend sem composição e explica a data de criação (2026-09-09) posterior ao histórico (histórico lido somente leitura).
- **Protocolo (branches e limites):** apenas `main`, `origin/main` e `origin/HEAD`, todos no SHA fixado. Referências registradas sem completar o snapshot com outro branch. Inspeção estática, local e somente leitura; nenhuma rede, dependência instalada, aplicação, build ou teste executado. Diagramas Mermaid locais foram lidos como documentação; links de demos não foram acessados. Nenhuma decisão aberta identificada.
